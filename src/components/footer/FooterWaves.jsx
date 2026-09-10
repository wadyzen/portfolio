function WaveLayer({ id, path, className }) {
  return (
    <div className={`footer-wave-track ${className}`} id={id}>
      <svg
        viewBox="0 0 900 120"
        preserveAspectRatio="none"
        className="footer-wave-svg"
      >
        <path d={path} />
      </svg>
      <svg
        viewBox="0 0 900 120"
        preserveAspectRatio="none"
        className="footer-wave-svg"
      >
        <path d={path} />
      </svg>
    </div>
  );
}

// Baseline 80, amplitude 10, period 300 (3 repeats across the 900 width)
const BACK_PATH =
  "M0,80 C50,70 100,70 150,80 C200,90 250,90 300,80 C350,70 400,70 450,80 C500,90 550,90 600,80 C650,70 700,70 750,80 C800,90 850,90 900,80 L900,120 L0,120 Z";

// Baseline 95, amplitude 8, period 300, phase-shifted (dips first) for variety
const MIDDLE_PATH =
  "M0,95 C50,105 100,105 150,95 C200,85 250,85 300,95 C350,105 400,105 450,95 C500,85 550,85 600,95 C650,105 700,105 750,95 C800,85 850,85 900,95 L900,120 L0,120 Z";

// Baseline 107, amplitude 4, period 450 (2 repeats), gentlest layer
const FRONT_PATH =
  "M0,107 C75,103 150,103 225,107 C300,111 375,111 450,107 C525,103 600,103 675,107 C750,111 825,111 900,107 L900,120 L0,120 Z";

export default function FooterWaves() {
  return (
    <div className="footer-waves">
      <WaveLayer
        id="footer-wave-back"
        className="footer-wave-back"
        path={BACK_PATH}
      />
      <WaveLayer
        id="footer-wave-middle"
        className="footer-wave-middle"
        path={MIDDLE_PATH}
      />
      <WaveLayer
        id="footer-wave-front"
        className="footer-wave-front"
        path={FRONT_PATH}
      />
    </div>
  );
}
