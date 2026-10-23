import Image from "next/image";
import logo from "../../public/brand/ever-logo.png";

/*
 * First-visit introduction layer. Static markup only: it is hidden unless the
 * boot script (lib/intro.ts) marks <html> with data-intro-state, and every
 * movement is CSS (app/intro.css). Without JavaScript it never appears.
 *
 * The drawing uses the hero photograph's own pixel space (1344 x 752), and its
 * box is sized exactly like the hero image, so on the homepage the outline
 * lands on the real pavilion when the section opens.
 */

// Survey points: roof tips and ridge, column bases, the foot of the steps.
const SURVEY_POINTS: [number, number][] = [
  [8, 422],
  [672, 403],
  [1326, 418],
  [75, 562],
  [1240, 562],
  [546, 600],
  [797, 600],
];

// Outline paths in drawing order, with the start time of each stroke.
const OUTLINE: { d: string; t: number; className?: string }[] = [
  // Roof slab: long low roof with drooping tips and the soffit line.
  { d: "M8 422 L64 403 H1288 L1326 418 L1322 424 L1240 446 H150 L8 428 Z", t: 0.28, className: "il-roof" },
  // Terrace floor.
  { d: "M70 562 H1250", t: 0.42 },
  // Screens, glazed opening and stone wall.
  { d: "M75 452 V562 M153 452 V562 M75 452 H153", t: 0.46 },
  { d: "M320 448 V562 M360 446 V562", t: 0.5 },
  { d: "M360 446 H490 V562", t: 0.52 },
  { d: "M557 448 V562 M785 448 V562", t: 0.56 },
  { d: "M850 562 V446 H982 V562", t: 0.58 },
  { d: "M1000 448 V562 M1025 448 V562", t: 0.6 },
  { d: "M1115 562 V446 M1240 446 V562", t: 0.62 },
  // Plinth and steps.
  { d: "M90 570 H560 M782 570 H1250 M90 600 H546 M797 600 H1100", t: 0.64 },
  { d: "M560 570 H782 M556 576 H786 M552 583 H790 M549 591 H794 M546 600 H797", t: 0.68 },
];

export default function IntroLoader() {
  return (
    // `hidden` keeps the layer out of the page even if the stylesheet fails;
    // intro.css overrides it only while the introduction plays.
    <div className="il" hidden>
      <p className="il-status sr-only" role="status">
        Loading Ever Design Group
      </p>

      {/* The section that is pulled apart: two sheets of paper meeting at the cut. */}
      <div className="il-panel il-top" aria-hidden="true" />
      <div className="il-panel il-bottom" aria-hidden="true" />

      <div className="il-art" aria-hidden="true">
        <div className="il-logo">
          <Image src={logo} alt="" fill sizes="140px" className="il-logo-image" />
        </div>

        <div className="il-stage">
          <svg className="il-svg" viewBox="0 0 1344 752" preserveAspectRatio="xMidYMid meet">
            {/* 1. Datum: the first line across the screen, at ground level. */}
            <path className="il-draw il-datum" pathLength={1} d="M0 612 H1344" />

            {/* 2. Construction marks: centre line, end guides and a dimension line. */}
            <g className="il-construction">
              <path className="il-guide" style={{ ["--t" as string]: "0.14s" }} d="M672 318 V650" />
              <path className="il-guide" style={{ ["--t" as string]: "0.2s" }} d="M75 372 V650" />
              <path className="il-guide" style={{ ["--t" as string]: "0.24s" }} d="M1240 372 V650" />
              <path className="il-dimension" d="M75 372 H1240 M75 364 V380 M1240 364 V380 M672 366 V378" />
            </g>

            {/* 3. Outline of the pavilion. */}
            <g className="il-outline">
              {OUTLINE.map((part) => (
                <path
                  key={part.d}
                  className={`il-draw ${part.className ?? ""}`}
                  style={{ ["--t" as string]: `${part.t}s` }}
                  pathLength={1}
                  d={part.d}
                />
              ))}
            </g>

            {SURVEY_POINTS.map(([x, y], index) => (
              <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
                <path
                  className="il-point"
                  style={{ ["--t" as string]: `${0.12 + index * 0.05}s` }}
                  d="M-7 0 H7 M0 -7 V7"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* 4. Lettering rising from behind the roofline, as in the hero. */}
        <div className="il-everclip">
          <span className="il-everpos">
            <span className="il-ever">ever</span>
          </span>
        </div>

        {/* 5. Plan. Design. Build. with an orange accent passing through. */}
        <p className="il-pdb">
          <span className="il-word" style={{ ["--t" as string]: "0.92s" }}>
            Plan.
          </span>{" "}
          <span className="il-word" style={{ ["--t" as string]: "1.06s" }}>
            Design.
          </span>{" "}
          <span className="il-word il-word-last" style={{ ["--t" as string]: "1.2s" }}>
            Build.
          </span>
        </p>
      </div>
    </div>
  );
}
