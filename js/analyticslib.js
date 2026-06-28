/* ============================================================
   ANALYTICAL GEOMETRY MATHS  (Grade 11, Chapter 4)
   ------------------------------------------------------------
   Every answer the quests use is COMPUTED here — gradient,
   distance, midpoint, the angle of inclination (with the acute /
   obtuse 180° rule), the parallel & perpendicular tests, the
   negative-reciprocal gradient, the gradient of a line in
   standard form, and the foot of a perpendicular. Nothing is
   hand-typed in the quest files. Decimal comma throughout, with
   a true minus sign for display (school convention).

   A "point" is just { x, y }. A "gradient" is a number, or null
   when the line is vertical (gradient undefined).
   ============================================================ */
import { randInt, pick, shuffled } from "./ui.js";
import { fmtComma } from "./check.js";

export const C = (v) => fmtComma(v);
export const Cdp = (v, dp) => fmtComma(v, dp);
export { randInt, pick, shuffled };

/* a true minus sign for display */
export const neg = (s) => String(s).replace(/-/g, "−");
/* an ordered pair "(2 ; −3)" with comma decimals + real minus */
export const ptStr = (P) => `(${C(P.x)} ; ${C(P.y)})`;
export const P = (x, y) => ({ x, y });

export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

/* -------- the three core formulas -------- */
export function distance(A, B) { return Math.hypot(B.x - A.x, B.y - A.y); }
export function midpoint(A, B) { return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }; }
/* gradient = Δy/Δx ; null means a vertical line (undefined gradient) */
export function gradient(A, B) {
  const dx = B.x - A.x;
  if (dx === 0) return null;
  return (B.y - A.y) / dx;
}

/* -------- gradient as a tidy fraction (rise over run) -------- */
/* returns a reduced { n, d, str } for Δy/Δx, real minus, "/" slash.
   Vertical → str "undefined"; horizontal → "0". */
export function gradFrac(dy, dx) {
  if (dx === 0) return { n: dy, d: 0, str: "undefined", vertical: true };
  if (dy === 0) return { n: 0, d: 1, str: "0" };
  const sign = dy * dx < 0 ? "−" : "";
  let n = Math.abs(dy), d = Math.abs(dx);
  const g = gcd(n, d); n /= g; d /= g;
  return { n: sign + n, d, str: d === 1 ? `${sign}${n}` : `${sign}${n}/${d}` };
}
/* gradient of segment AB as a fraction string */
export function gradFracOf(A, B) { return gradFrac(B.y - A.y, B.x - A.x); }

/* the perpendicular gradient = negative reciprocal (switch + change sign).
   input/return as a fraction over rise/run so it stays exact. */
export function perpGradFrac(dy, dx) {
  // m = dy/dx → perpendicular = −dx/dy
  return gradFrac(-dx, dy);
}

/* -------- parallel / perpendicular tests -------- */
export const isParallel = (m1, m2) => (m1 === null && m2 === null) || (m1 !== null && m2 !== null && Math.abs(m1 - m2) < 1e-9);
export function isPerpendicular(m1, m2) {
  if (m1 === null) return m2 === 0;            // vertical ⊥ horizontal
  if (m2 === null) return m1 === 0;
  return Math.abs(m1 * m2 + 1) < 1e-9;
}

/* gradient of a line written ax + by + c = 0  →  −a/b (null if b = 0) */
export function gradFromStandard(a, b) { return b === 0 ? null : -a / b; }

/* -------- angle of inclination -------- */
/* θ in degrees, measured anti-clockwise from the positive x-axis, 0 ≤ θ < 180.
   vertical line → 90°. */
export function inclination(m) {
  if (m === null) return 90;
  let t = Math.atan(m) * 180 / Math.PI;
  if (t < 0) t += 180;                          // negative gradient → obtuse
  return t;
}
/* the reference angle a learner reads off the calculator: tan⁻¹(|m|), acute */
export function refAngle(m) {
  if (m === null) return 90;
  return Math.atan(Math.abs(m)) * 180 / Math.PI;
}
export const isAcute = (m) => m !== null && m > 0;
export const isObtuse = (m) => m !== null && m < 0;

/* -------- foot of the perpendicular from P to line AB (for an altitude) -------- */
export function footOfPerp(Pt, A, B) {
  const dx = B.x - A.x, dy = B.y - A.y;
  const t = ((Pt.x - A.x) * dx + (Pt.y - A.y) * dy) / (dx * dx + dy * dy);
  return { x: A.x + t * dx, y: A.y + t * dy };
}

/* signed area ×2 of triangle ABC (to test non-degenerate / winding) */
export function area2(A, B, C2) { return (B.x - A.x) * (C2.y - A.y) - (C2.x - A.x) * (B.y - A.y); }
export function triArea(A, B, C2) { return Math.abs(area2(A, B, C2)) / 2; }

/* ============================================================
   CLEAN GENERATORS — fresh numbers that stay tidy
   ============================================================ */
const nz = (lo, hi) => { let v = 0; while (v === 0) v = randInt(lo, hi); return v; };

/* a random integer point in a range */
export function randPoint(lo = -6, hi = 6) { return { x: randInt(lo, hi), y: randInt(lo, hi) }; }

/* two distinct integer points far enough apart to draw cleanly */
export function randSegment(lo = -6, hi = 6, minSep = 3) {
  let A, B;
  do { A = randPoint(lo, hi); B = randPoint(lo, hi); }
  while (Math.abs(A.x - B.x) < 1 || distance(A, B) < minSep);   // avoid vertical & tiny
  return { A, B };
}

/* a clean gradient as small rise/run (run ≠ 0) with a chosen sign */
export function cleanGrad({ negative = null } = {}) {
  const runs = [1, 1, 2, 2, 3, 4], rises = [1, 2, 3, 1, 2, 4];
  let run = pick(runs), rise = pick(rises);
  const g = gcd(rise, run); rise /= g; run /= g;
  let sign = negative === null ? pick([1, -1]) : (negative ? -1 : 1);
  return { dy: sign * rise, dx: run };           // gradient = dy/dx
}

/* the special-line gradients */
export const HORIZONTAL = { m: 0, name: "horizontal" };
export const VERTICAL = { m: null, name: "vertical" };

/* the angle-of-inclination cases the workbook uses: clean & exact where it
   can be, otherwise a rounded value the calculator gives. Returns enough to
   build either an "acute/obtuse" question or a value question. */
export function inclinationCase({ negative = null } = {}) {
  // tidy exact angles (45/135) plus a few that need rounding (drills the trap)
  const exact = [
    { dy: 1, dx: 1, theta: 45 }, { dy: -1, dx: 1, theta: 135 },
  ];
  const rounded = [
    { dy: 4, dx: 5 }, { dy: 3, dx: 4 }, { dy: 2, dx: 5 }, { dy: 5, dx: 3 },
    { dy: 7, dx: 6 }, { dy: 3, dx: 7 }, { dy: 5, dx: 2 }, { dy: 4, dx: 3 },
  ];
  let c;
  if (pick([true, false]) && negative === null) c = pick(exact);
  else { const r = pick(rounded); c = { dy: r.dy, dx: r.dx }; }
  if (negative !== null) c = { ...c, dy: Math.abs(c.dy) * (negative ? -1 : 1) };
  const m = c.dy / c.dx;
  return {
    dy: c.dy, dx: c.dx, m,
    ref: refAngle(m),                 // acute reference tan⁻¹(|m|)
    theta: c.theta != null ? c.theta : inclination(m),
    negative: m < 0,
  };
}
