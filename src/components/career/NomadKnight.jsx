import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/lotties/NOMAD-TAIL-SWISH-ANIMATION.json";

function NomadKnight() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    return () => {
      animationRef.current?.destroy();
    };
  }, []);

  const handleHover = () => {
    animationRef.current?.goToAndPlay(0, true);
  };

  return (
    <div
      id="knight"
      className="nomad-knight"
      ref={containerRef}
      onMouseEnter={handleHover}
    />
  );
}

export default NomadKnight;
