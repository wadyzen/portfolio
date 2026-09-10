import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/lotties/Walking_Nomads.json";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FooterWaves from "./FooterWaves";

gsap.registerPlugin(ScrollToPlugin);

function Footer() {
  const container = useRef(null);
  const animRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animRef.current.play();
      } else {
        animRef.current.pause();
      }
    });

    observer.observe(container.current);

    return () => {
      observer.disconnect();
      animRef.current.destroy();
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);

    if (window.smoother) {
      window.smoother.scrollTo(0, true);
    }
  };

  return (
    <>
      <div className="footer-scenery">
        <FooterWaves />
        <div className="footer-nomads">
          <div
            className="nomads_image desktop"
            ref={container}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <footer>
        <span>WadyZen &copy; {new Date().getFullYear()}</span>
        <button
          title={
            i18n.language === "en" ? "Change language" : "Changer la langue"
          }
          onClick={() => {
            toggleLanguage();
          }}
          className="lang-toggle"
        >
          {i18n.language === "en" ? "FR" : "EN"}
        </button>
      </footer>
    </>
  );
}

export default Footer;
