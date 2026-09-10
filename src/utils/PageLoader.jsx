import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import sun from "../assets/img/sun.svg";
import moon from "../assets/img/moon.svg";

export default function PageLoader({ isDarkMode }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const prefersReduced = useReducedMotion();
  const lastPathRef = useRef(location.pathname);

  useLayoutEffect(() => {
    // Only trigger when the pathname actually changes from the last one we saw.
    if (lastPathRef.current === location.pathname) return;
    lastPathRef.current = location.pathname;

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-loader"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="page-loader-glow" />
          <motion.img
            key={isDarkMode ? "moon" : "sun"}
            src={isDarkMode ? moon : sun}
            alt={isDarkMode ? "Dark mode" : "Light mode"}
            className="page-loader-icon"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{
              rotate: prefersReduced ? 0 : 360,
              scale: 1,
              opacity: 1,
              transition: {
                rotate: prefersReduced
                  ? { duration: 0 }
                  : { duration: 2.2, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.5, ease: "easeOut" },
              },
            }}
            exit={{
              scale: 0.4,
              opacity: 0,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
