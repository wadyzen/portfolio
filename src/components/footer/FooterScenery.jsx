function DuneRow() {
  const dune = (
    <path d="M0 40 C 60 10, 140 10, 200 40 C 260 70, 340 70, 400 40 L 400 100 L 0 100 Z" />
  );
  return (
    <svg
      className="scenery-strip scenery-dunes"
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
    >
      <g transform="translate(0,0)">{dune}</g>
      <g transform="translate(400,0)">{dune}</g>
    </svg>
  );
}

function PalmRow() {
  const palm = (
    <g>
      <rect x="18" y="40" width="4" height="35" />
      <path d="M20 40 C 5 30, -5 20, 0 8 C 10 18, 18 28, 20 40 Z" />
      <path d="M20 40 C 35 30, 45 20, 40 8 C 30 18, 22 28, 20 40 Z" />
      <path d="M20 40 C 10 25, 8 15, 20 5 C 22 18, 22 28, 20 40 Z" />
    </g>
  );
  return (
    <svg
      className="scenery-strip scenery-palms"
      viewBox="0 0 300 75"
      preserveAspectRatio="none"
    >
      <g transform="translate(20,0)">{palm}</g>
      <g transform="translate(110,0)">{palm}</g>
      <g transform="translate(200,0)">{palm}</g>
      <g transform="translate(320,0)">{palm}</g>
      <g transform="translate(410,0)">{palm}</g>
      <g transform="translate(500,0)">{palm}</g>
    </svg>
  );
}

export default function FooterScenery() {
  return (
    <div className="footer-scenery" aria-hidden="true">
      <DuneRow />
      <PalmRow />
    </div>
  );
}
