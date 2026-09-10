import { useTranslation } from "react-i18next";
import github from "../../assets/img/github.svg";
import linkIcon from "../../assets/img/link.svg";
import study from "../../assets/img/school.svg";

export default function ProjectLinks({ links }) {
  const { t } = useTranslation();
  const linkIcons = {
    github: { icon: github, label: "GitHub" },
    live: { icon: linkIcon, label: t("projects.liveDemo") },
    caseStudy: { icon: study, label: "Case Study" },
  };

  if (links.text)
    return (
      <>
        <li>{links.text}</li>
      </>
    );

  return (
    <>
      {Object.entries(links).map(([key, value]) => {
        const linkData = linkIcons[key];
        if (!linkData) return null;

        return (
          <li key={key}>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={key}
            >
              <img src={linkData.icon} alt={`${linkData.label} icon`} />
              {linkData.label}
            </a>
          </li>
        );
      })}
    </>
  );
}
