import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import sun from "./assets/img/sun.svg";
import moon from "./assets/img/moon.svg";
import About from "./components/About";
import Projects from "./components/projects/Projects";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import Career from "./components/career/Career";
import Contact from "./components/Contact";
import { useGoogleAnalytics } from "./hooks/analytics";
import SmoothScroll from "./utils/SmoothScroll";
import PageLoader from "./utils/PageLoader";

function App() {
  useGoogleAnalytics();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );
  const [isHiding, setIsHiding] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(isDarkMode ? moon : sun);
  const [currentAlt, setCurrentAlt] = useState(
    isDarkMode ? "Dark mode" : "Light mode",
  );

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsHiding(true);
    setTimeout(() => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      setCurrentIcon(newMode ? moon : sun);
      setCurrentAlt(newMode ? "Dark mode" : "Light mode");
      setIsHiding(false);
    }, 400);
  };

  return (
    <>
      <PageLoader isDarkMode={isDarkMode} />

      <SmoothScroll>
        <button
          className="mode-toggle"
          title={isDarkMode ? "Light mode" : "Dark mode"}
          onClick={handleToggle}
        >
          <div>
            <img
              src={currentIcon}
              alt={currentAlt}
              className={isHiding ? "hide" : ""}
            />
          </div>
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main>
                  <div
                    style={{
                      background: "var(--bg-color)",
                    }}
                  >
                    <About />
                    <Career />
                  </div>
                  <div style={{ background: "var(--sky)" }}>
                    <Projects isDarkMode={isDarkMode} />
                    <Contact />
                    <Footer />
                  </div>
                </main>
              </>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <main>
                <ProjectCaseStudy />
                <Footer />
              </main>
            }
          />
        </Routes>
      </SmoothScroll>
    </>
  );
}

export default App;
