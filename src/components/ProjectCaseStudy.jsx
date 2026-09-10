import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import ProjectLinks from "./projects/ProjectLinks";
import { useProjects } from "../hooks/useProjects";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectCaseStudy() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const projects = useProjects();
  const project = projects.find((p) => p.slug === slug);
  const rootRef = useRef(null);

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);

      if (typeof window.smoother !== "undefined") {
        window.smoother.scrollTop(0);
      }

      ScrollTrigger.refresh();

      setTimeout(() => {
        window.scrollTo(0, 0);
        if (typeof window.smoother !== "undefined") {
          window.smoother.scrollTop(0);
        }
      }, 100);
    };

    resetScroll();

    return () => {
      ScrollTrigger.refresh();
    };
  }, [slug]);

  useEffect(() => {
    if (!rootRef.current) return;
    const targets = rootRef.current.querySelectorAll(".case-study-reveal");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [project]);

  if (!project) {
    return (
      <section className="case-study case-study--missing">
        <h2 className="subtitle">
          {t("projects.notFound", "Project not found")}
        </h2>
        <Link to="/" className="project-cta project-cta--ghost">
          {t("projects.backToProjects", "Back to projects")}
        </Link>
      </section>
    );
  }

  const {
    name,
    tagline,
    mediaSrc,
    stack,
    studyText,
    challenge,
    solution,
    techGroups,
    features,
    journey,
    screenshots,
    status,
    links,
  } = project;

  return (
    <section className="case-study" ref={rootRef}>
      <Link to="/" className="case-study-back">
        {t("common.backHome", "Back to home")}
      </Link>

      <div className="case-study-hero">
        <span className="project-corner project-corner--tl" />
        <span className="project-corner project-corner--br" />
        <img src={mediaSrc} alt={name} />
      </div>

      <h1 className="case-study-title">{name}</h1>

      {stack?.length > 0 && (
        <ul className="project-stack">
          {stack.map((tech, i) => (
            <React.Fragment key={i}>
              <li key={i}>{tech}</li>
              {i < stack.length - 1 && <span>&#9737;</span>}
            </React.Fragment>
          ))}
        </ul>
      )}
      {tagline && <p className="case-study-tagline">{tagline}</p>}

      {studyText && <p className="case-study-text">{studyText}</p>}

      {(challenge || solution) && (
        <div className="case-study-split case-study-reveal">
          {challenge && (
            <div className="case-study-split-col">
              <h4>{t("projects.challenge", "The challenge")}</h4>
              <p>{challenge}</p>
            </div>
          )}
          {solution && (
            <div className="case-study-split-col">
              <h4>{t("projects.solution", "The approach")}</h4>
              <p>{solution}</p>
            </div>
          )}
        </div>
      )}

      {journey?.length > 0 && (
        <div className="case-study-block">
          <h3 className="case-study-block-title case-study-reveal">
            {t("projects.journey", "The journey")}
          </h3>
          <div className="case-study-journey-line">
            {journey.map((step, i) => (
              <div
                className="case-study-journey-step case-study-reveal"
                key={i}
              >
                <span className="case-study-journey-marker" />
                {step.label && (
                  <span className="case-study-journey-label">{step.label}</span>
                )}
                <h5>{step.title}</h5>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {techGroups?.length > 0 && (
        <div className="case-study-block">
          <h3 className="case-study-block-title case-study-reveal">
            {t("projects.underTheHood", "Under the hood")}
          </h3>
          <div className="case-study-tech-grid">
            {techGroups.map((group, i) => (
              <div className="case-study-tech-card case-study-reveal" key={i}>
                <span className="case-study-tech-card-corner" />
                <h5>{group.category}</h5>
                <ul>
                  {group.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {features?.length > 0 && (
        <div className="case-study-block">
          <h3 className="case-study-block-title case-study-reveal">
            {t("projects.keyFeatures", "What it does")}
          </h3>
          <div className="case-study-features">
            {features.map((feature, i) => (
              <div className="case-study-feature case-study-reveal" key={i}>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {screenshots?.length > 0 && (
        <div className="case-study-block">
          <h3 className="case-study-block-title case-study-reveal">
            {t("projects.gallery", "A closer look")}
          </h3>
          <div className="case-study-gallery">
            {screenshots.map((shot, i) => (
              <figure
                className="case-study-gallery-item case-study-reveal"
                key={i}
              >
                <span className="project-corner project-corner--tl" />
                {shot.src ? (
                  <img src={shot.src} alt={shot.caption} />
                ) : (
                  <div
                    className="case-study-gallery-placeholder"
                    aria-hidden="true"
                  />
                )}
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {status?.items?.length > 0 && (
        <div className="case-study-status case-study-reveal">
          {status.label && <h5>{status.label}</h5>}
          <ul>
            {status.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {links && (
        <>
          <h3 className="case-study-block-title">
            {t("projects.linkTitle", "Links")}
          </h3>
          <ul className="project-links case-study-links case-study-reveal">
            <ProjectLinks links={links} />
          </ul>
        </>
      )}
    </section>
  );
}

export default ProjectCaseStudy;
