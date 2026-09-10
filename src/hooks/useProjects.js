import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import project1 from "../assets/img/project1.png";
import project2 from "../assets/img/project2.png";
import project3 from "../assets/img/project3.png";
import project4 from "../assets/img/project4.png";
import project5 from "../assets/img/project5.png";
import project6 from "../assets/img/project6.png";

const images = [project2, project1, project6, project5, project3, project4];

import darlocaShot1 from "../assets/img/case-studies/darloca-fleet-planner.png";
import darlocaShot2 from "../assets/img/case-studies/darloca-car-dammages.png";
import darlocaShot3 from "../assets/img/case-studies/darloca-dashboard.png";
import darlocaShot4 from "../assets/img/case-studies/darloca-gps.png";
import darlocaShot5 from "../assets/img/case-studies/darloca-contract.png";

import sportShot1 from "../assets/img/case-studies/infinite-sport-homepage.png";
import sportShot2 from "../assets/img/case-studies/infinite-sport-store.png";

import simoLimo1 from "../assets/img/case-studies/simolimo-homepage.png";
import simoLimo2 from "../assets/img/case-studies/simolimo-fleet.png";

import padelShot1 from "../assets/img/case-studies/infinite-padel-courts-configurator.png";
import padelShot2 from "../assets/img/case-studies/infinite-padel-courts-new-homepage.png";
import padelShot3 from "../assets/img/case-studies/infinite-padel-courts-mockup.png";

const screenshotsBySlug = {
  darloca: [
    darlocaShot1,
    darlocaShot2,
    darlocaShot3,
    darlocaShot4,
    darlocaShot5,
  ],
  padel: [padelShot1, padelShot2, padelShot3],
  simoLimo: [simoLimo1, simoLimo2],
  sport: [sportShot1, sportShot2],
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useProjects() {
  const { t } = useTranslation();
  const translatedProjects = t("projects.list", { returnObjects: true });

  return useMemo(
    () =>
      translatedProjects.map((project, index) => {
        const slug = project.slug || slugify(project.name);
        const sources = screenshotsBySlug[slug];

        return {
          ...project,
          mediaSrc: images[index],
          slug,
          // merge captions from translation.json with image imports here
          screenshots: project.screenshots?.map((shot, i) => ({
            ...shot,
            src: sources?.[i],
          })),
        };
      }),
    [translatedProjects],
  );
}
