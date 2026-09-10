import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectLinks from "./ProjectLinks";
import { useTranslation } from "react-i18next";
import SandDivider from "../../utils/SandDivider";
import { useProjects } from "../../hooks/useProjects";

function Projects() {
  const { t } = useTranslation();
  const projects = useProjects();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <SandDivider />

      <section id="projects">
        <h2 className="subtitle">{t("projects.subtitle")}</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div
              className={`project ${hoveredIndex === index ? "active" : ""}`}
              key={project.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-frame">
                <span className="project-corner project-corner--tl" />
                <span className="project-corner project-corner--br" />
                <img src={project.mediaSrc} alt={project.name} />
              </div>

              <div className="modal-details">
                <h3>{project.name}</h3>
                <ul className="project-stack">
                  {project.stack.map((tech, i) => (
                    <React.Fragment key={i}>
                      <li>{tech}</li>
                      {i < project.stack.length - 1 && <span>&#9737;</span>}
                    </React.Fragment>
                  ))}
                </ul>
                <p>{project.text}</p>

                <div className="project-actions">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="project-cta"
                  >
                    {t("projects.viewCaseStudy", "View Case Study")}
                  </Link>
                  <ul className="project-links">
                    <ProjectLinks links={project.links} />
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
