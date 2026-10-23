import IntroScene from "./IntroScene";
import {
  COLUMN_BASE,
  COLUMNS,
  architect,
  beam,
  board,
  builder,
  details,
  groundContour,
  guides,
  plan,
  planX,
  roof,
  tree,
} from "./art";

/*
 * First-visit introduction layer: a six-second line drawing (architect →
 * builder → completed place → Plan. Design. Build.) that opens into the site.
 *
 * Static, server-rendered markup. It is `hidden` unless the boot script
 * (lib/intro.ts) marks <html> with data-intro-state, so it never appears
 * without JavaScript or when the stylesheet fails. IntroScene animates it.
 */
export default function IntroLoader() {
  return (
    <div className="il" hidden>
      <p className="il-status sr-only" role="status">
        Ever Design Group introduction
      </p>

      {/* The layer opens like a section being pulled apart. */}
      <div className="il-panel il-top" aria-hidden="true" />
      <div className="il-panel il-bottom" aria-hidden="true" />

      <div className="il-art" aria-hidden="true">
        <svg className="il-scene" viewBox="0 0 1344 752" preserveAspectRatio="xMidYMid meet">
          {/* Act 1 — the architect. */}
          <g data-act="architect">
            <path data-draw d={architect.ground} />
            <path data-draw d={architect.backLeg} />
            <path data-draw d={architect.frontLeg} />
            <path data-draw d={architect.torso} />
            <path data-draw d={architect.neck} />
            <circle data-draw cx={architect.head.cx} cy={architect.head.cy} r={architect.head.r} />
            <path data-draw className="il-board" d={board.face} />
            <path data-draw d={board.ledge} />
            <path data-draw d={board.stand} />
            <path data-draw d={architect.restingArm} />
            <path data-arm="architect" />
            <line data-pencil />
          </g>

          {/* The plan, which grows into the foundation. */}
          <rect data-plan x={plan.x} y={plan.y} width={plan.w} height={plan.h} />

          {/* One line per column: a tick on the plan, a base mark, then the column itself. */}
          {COLUMNS.map((x) => (
            <line key={x} data-column={x} x1={planX(x)} y1={plan.y} x2={planX(x)} y2={plan.y + 3} />
          ))}

          {/* Temporary construction marks. */}
          <g data-act="guides" className="il-guides">
            {COLUMNS.slice(0, -1).map((x) => (
              <line key={x} data-plumb x1={x} y1={COLUMN_BASE} x2={x} y2={COLUMN_BASE} />
            ))}
            <line
              data-level
              x1={guides.level.from}
              y1={guides.level.y}
              x2={guides.level.from}
              y2={guides.level.y}
            />
            {guides.crosses.map((p) => (
              <path key={p.x} data-cross d={`M${p.x - 7} ${p.y} H${p.x + 7} M${p.x} ${p.y - 7} V${p.y + 7}`} />
            ))}
          </g>

          {/* Act 2 — the builder. */}
          <g data-act="builder">
            <path data-draw d={builder.ground} />
            <g data-builder-body>
              <path data-draw d={builder.backLeg} />
              <path data-draw d={builder.frontLeg} />
              <path data-draw d={builder.torso} />
              <circle data-draw cx={builder.head.cx} cy={builder.head.cy} r={builder.head.r} />
              <path data-draw d={builder.hat} />
            </g>
            <path data-arm="builder-1" />
            <path data-arm="builder-2" />
          </g>
          <line data-raised x1={builder.pivot.x} y1={builder.pivot.y} x2={builder.pivot.x} y2={builder.pivot.y} />

          {/* Act 3 — the completed place. */}
          <path data-beam d={beam} />
          <path data-roof d={roof} />
          {details.map((d) => (
            <path key={d} data-detail d={d} />
          ))}
          <path data-contour d={groundContour} />
          <g data-tree>
            <path data-draw d={tree.trunk} />
            <path data-draw d={tree.branch} />
            <path data-draw className="il-canopy" d={tree.canopy} />
          </g>

          {/* The one orange accent: pencil tip, then the work as it is built. */}
          <circle data-accent className="il-accent" cx={plan.x} cy={plan.y} r={3} />
        </svg>

        <p className="il-pdb">
          <span data-word>Plan.</span> <span data-word>Design.</span> <span data-word>Build.</span>
          <span className="il-underline" data-underline />
        </p>
      </div>

      <button type="button" className="il-skip" data-intro-skip>
        Skip intro
      </button>

      <IntroScene />
    </div>
  );
}
