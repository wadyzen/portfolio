import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const isTouch = matchMedia("(hover: none) and (pointer: coarse)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isTouch ? 0 : 2,
      effects: true,
      normalizeScroll: !isTouch,
      smoothTouch: false,
    });

    window.smoother = smoother;

    return () => {
      if (window.smoother) {
        window.smoother.kill();
        delete window.smoother;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
