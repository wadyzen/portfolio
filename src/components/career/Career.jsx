import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import star from "../../assets/img/star.svg";
import NomadKnight from "./NomadKnight";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Careers = () => {
  const { t } = useTranslation();
  const timelineData = t("career.timeline", { returnObjects: true });

  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const dotRefs = useRef([]);

  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    let scrollTriggerInstance = null;

    const updateActiveItems = () => {
      const fillHeight = fill.offsetHeight;
      const containerRect = container.getBoundingClientRect();

      const newActiveItems = [];

      dotRefs.current.forEach((dot, index) => {
        if (!dot) return;

        const dotRect = dot.getBoundingClientRect();
        const dotTopRelativeToContainer = dotRect.top - containerRect.top;

        let threshold = 10;
        if (index === 0 || index === dotRefs.current.length - 1) {
          threshold = 20;
        }

        if (dotTopRelativeToContainer <= fillHeight + threshold) {
          newActiveItems.push(index);
        }
      });

      setActiveItems(newActiveItems);
    };

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: updateActiveItems,
      onEnter: () => {
        setActiveItems([0]);
      },
      onLeave: () => {
        const allIndices = dotRefs.current.map((_, index) => index);
        setActiveItems(allIndices);
      },
      onLeaveBack: () => {
        setActiveItems([]);
      },
      onRefresh: updateActiveItems,
    });

    gsap.to(fill, {
      height: container.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Initial update
    updateActiveItems();

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  return (
    <section className="careers-section">
      <h2 className="subtitle">{t("career.subtitle")}</h2>
      <h3 className="timeline-title">{t("career.title")}</h3>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline">
          <div className="timeline-line"></div>
          <div className="timeline-fill-container">
            <div className="timeline-fill" ref={fillRef}></div>
          </div>

          <div className="timeline-columns">
            {timelineData.map((item, index) => (
              <div key={item.id} className="timeline-row">
                <div className="timeline-side left">
                  {index % 2 === 0 && (
                    <div
                      className={`timeline-card ${
                        activeItems.includes(index) ? "active" : ""
                      }`}
                    >
                      <div className="timeline-card-content">
                        <h3>{item.title}</h3>
                        <span className="timeline-date">{item.date}</span>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="timeline-center">
                  <div
                    className={`timeline-dot ${
                      activeItems.includes(index) ? "active" : ""
                    }`}
                    ref={(el) => (dotRefs.current[index] = el)}
                  ></div>
                </div>

                <div className="timeline-side right">
                  {index % 2 !== 0 && (
                    <div
                      className={`timeline-card ${
                        activeItems.includes(index) ? "active" : ""
                      }`}
                    >
                      <div className="timeline-card-content">
                        <h3>{item.title}</h3>
                        <span className="timeline-date">{item.date}</span>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="career-description">
        <div>
          <img src={star} alt="Moroccan star icon" />
          <p>{t("career.description")}</p>
        </div>
        <NomadKnight />
      </div>
    </section>
  );
};

export default Careers;
