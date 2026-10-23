/*
 * Line artwork for the introduction, in the hero photograph's pixel space
 * (1344 x 752, ground at y 612). The completed pavilion traces the hero
 * building, so on the homepage the drawing lands on the real photograph.
 * Figures are drawn at a slightly heroic scale; they never share the frame
 * with the finished building.
 */

export const WORLD = { width: 1344, height: 752, ground: 612 };

export type Point = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };

/* ---------- Act 1: the architect at a drafting board ---------- */

export const architect = {
  ground: "M556 612 H716",
  backLeg: "M598 566 L593 589 L591 612 L599 612",
  frontLeg: "M598 566 L606 588 L609 612 L617 612",
  torso: "M598 566 Q604 544 622 527",
  neck: "M622 527 L626 522",
  head: { cx: 631, cy: 515, r: 7 },
  restingArm: "M621 529 Q627 541 636 547 L644 548",
  /** Shoulder of the drawing arm; the arm is solved each frame towards the pencil. */
  shoulder: { x: 623, y: 528 } as Point,
  upperArm: 18,
  forearm: 18,
  /** Hand position relative to the pencil tip. */
  pencilOffset: { x: -4.5, y: -8 } as Point,
};

export const board = {
  face: "M628 530 L684 524 L686 558 L630 564 Z",
  ledge: "M626 567 L689 560",
  stand: "M657 562 V598 M657 598 L640 612 M657 598 L674 612",
};

/** The plan the architect draws on the board... */
export const plan: Rect = { x: 640, y: 535, w: 28, h: 12 };
/** ...becomes the foundation band of the pavilion. */
export const foundation: Rect = { x: 90, y: 570, w: 1160, h: 30 };

/** Column lines of the finished pavilion (x), rising from the foundation to the beam. */
export const COLUMNS = [153, 360, 490, 557, 785, 850, 982, 1115, 1240];
export const COLUMN_BASE = foundation.y;
export const BEAM_Y = 446;

/** Where each column sits on the plan, so the plan's ticks become the column bases. */
export const planX = (x: number) => plan.x + ((x - foundation.x) / foundation.w) * plan.w;

/** The pencil's route: around the plan (matching how a rect is drawn), then along the ticks. */
export const pencilRoute = `M${plan.x} ${plan.y} H${plan.x + plan.w} V${plan.y + plan.h} H${plan.x} Z`;

/* ---------- Act 2: the builder raises the first column ---------- */

export const builder = {
  ground: "M1196 612 H1344",
  backLeg: "M1290 566 L1297 589 L1300 612 L1292 612",
  frontLeg: "M1290 566 L1284 589 L1282 612 L1274 612",
  torso: "M1290 566 L1287 529",
  head: { cx: 1285, cy: 520, r: 7 },
  hat: "M1276 518 Q1285 505 1294 518 M1273 519 H1296",
  shoulder: { x: 1287, y: 531 } as Point,
  upperArm: 17,
  forearm: 17,
  /** The column the builder sets upright, pivoting on its base. */
  pivot: { x: 1240, y: COLUMN_BASE } as Point,
  columnLength: COLUMN_BASE - BEAM_Y,
  /** Grip points along the column, from its base. */
  grips: [52, 38],
  /** Lean of the column before it is raised (degrees from vertical, towards the builder). */
  startLean: 50,
};

/** Temporary construction marks: plumb lines at each column and a level line for the beam. */
export const guides = {
  plumbTop: 432,
  /** Level line for the beam, run out from the builder's end. */
  level: { from: 1270, to: 70, y: BEAM_Y },
  crosses: [
    { x: foundation.x, y: foundation.y },
    { x: foundation.x + foundation.w, y: foundation.y },
  ] as Point[],
};

/* ---------- Act 3: the completed place ---------- */

/** Beam, drawn right to left as the structure connects. */
export const beam = `M1240 ${BEAM_Y} H150`;
/** Roof slab, starting where the beam ends so the accent can follow it round. */
export const roof = `M150 ${BEAM_Y} L8 428 L8 422 L64 403 H1288 L1326 418 L1322 424 L1240 ${BEAM_Y} Z`;

export const details = [
  // Timber screens.
  "M360 562 V446 M490 446 V562 M360 562 H490",
  "M850 562 V446 M982 446 V562 M850 562 H982",
  // Glazed opening.
  "M557 562 H785",
  // Steps cut into the foundation.
  "M560 576 H782 M556 583 H786 M552 591 H790",
];

export const groundContour = "M0 614 C 180 610 320 616 520 613 S 900 610 1100 614 S 1290 612 1344 609";

/** One restrained landscape element: the small tree in front of the pavilion. */
export const tree = {
  trunk: "M262 612 C 264 580 259 548 268 521",
  branch: "M266 548 C 277 539 287 533 296 529",
  canopy:
    "M268 520 C 228 524 214 494 232 478 C 226 452 258 440 274 452 C 292 432 326 446 320 470 C 340 484 326 512 304 510 C 294 524 278 524 268 520 Z",
};

/* ---------- Camera frames (world rectangles to keep in view) ---------- */

export const FRAMES = {
  architect: { x: 572, y: 498, w: 130, h: 118 } as Rect,
  foundation: { x: 60, y: 430, w: 1240, h: 200 } as Rect,
  builder: { x: 1120, y: 418, w: 224, h: 204 } as Rect,
  place: { x: 0, y: 392, w: 1344, h: 232 } as Rect,
};
