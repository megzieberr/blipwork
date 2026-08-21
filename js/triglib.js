/* ============================================================
   TRIGLIB — computed 2D-trigonometry maths
   ------------------------------------------------------------
   Every answer the trig chapter shows is DERIVED here, never
   hand-typed: sine rule (side & angle), cosine rule (side &
   angle, including obtuse), area rule, the ambiguous case, the
   area of a regular polygon, and a coordinate solver that turns
   a triangle's real measurements into to-scale (x, y) vertices
   for the diagram engine. South-African convention: comma
   decimal, angles in degrees.
   ============================================================ */
import { fmtComma, roundTo } from "./check.js";
import { randInt, pick } from "./ui.js";
import { rng } from "./rng.js";

/* ---- degree-based trig (the calculator and CAPS work in degrees) ---- */
export const rad = d => d * Math.PI / 180;
export const deg = r => r * 180 / Math.PI;
export const sinD = d => Math.sin(rad(d));
export const cosD = d => Math.cos(rad(d));
export const tanD = d => Math.tan(rad(d));
export const asinD = v => deg(Math.asin(Math.max(-1, Math.min(1, v))));
export const acosD = v => deg(Math.acos(Math.max(-1, Math.min(1, v))));

/* ---- formatting ---- */
export const C = v => fmtComma(v);                       // free precision, comma decimal
export const fix = (v, dp = 2) => fmtComma(roundTo(v, dp), dp);   // forced dp, comma decimal
export const ang = (v, dp = 1) => `${fix(v, dp)}°`;       // angle with the degree sign

/* random helpers (vary by quest run) */
export { randInt, pick };
export const randf = (lo, hi, dp = 1) => roundTo(lo + rng() * (hi - lo), dp);

/* ============================================================
   THE RULES
   ============================================================ */

/* Sine rule — find a SIDE.  side opposite wantAngle, given a known
   side and the angle opposite it.   want / sin(want°) = known / sin(known°) */
export function sineRuleSide(knownSide, knownAngle, wantAngle) {
  return knownSide * sinD(wantAngle) / sinD(knownAngle);
}

/* Sine rule — find an ANGLE.  sin(want)/wantSide = sin(known)/knownSide.
   Returns the ACUTE solution (0–90 or up to 180 from asin). */
export function sineRuleAngle(knownAngle, knownSide, wantSide) {
  return asinD(wantSide * sinD(knownAngle) / knownSide);
}

/* Cosine rule — find the SIDE a opposite angle A, given the two
   sides b, c that include A.   a² = b² + c² − 2bc·cosA */
export function cosineRuleSide(b, c, A) {
  return Math.sqrt(b * b + c * c - 2 * b * c * cosD(A));
}

/* Cosine rule — find the ANGLE A opposite side a, from all three
   sides.   cosA = (b² + c² − a²) / (2bc).   Handles obtuse (acos
   returns up to 180°). */
export function cosineRuleAngle(a, b, c) {
  return acosD((b * b + c * c - a * a) / (2 * b * c));
}

/* Area rule — two sides and the INCLUDED angle.  ½·b·c·sinA */
export function areaSAS(b, c, A) {
  return 0.5 * b * c * sinD(A);
}

/* Area of a triangle from all three sides (Heron) — used to cross-check. */
export function areaSSS(a, b, c) {
  const s = (a + b + c) / 2;
  return Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
}

/* Area of a REGULAR n-gon with side length s.   n·s² / (4·tan(180/n)) */
export function regularPolygonArea(n, s) {
  return n * s * s / (4 * tanD(180 / n));
}

/* ------------------------------------------------------------
   The AMBIGUOUS CASE.  Given angle A, the side a opposite it, and a
   second side b (the SSA / ASS data), how many triangles fit?
     h = b·sinA  (the altitude from C to AB)
       a <  h          → 0 triangles (a can't reach the base)
       a == h          → 1 (right-angled, the unknown angle is 90°)
       h <  a <  b     → 2 (acute & obtuse both valid)
       a >= b          → 1 (only the acute solution)
   Returns { count, acute, obtuse|null } for the unknown angle B
   opposite the side b. ------------------------------------------------------------ */
export function ambiguousCase(A, a, b) {
  const h = b * sinD(A);
  let count;
  if (a < h - 1e-9) count = 0;
  else if (Math.abs(a - h) <= 1e-9) count = 1;
  else if (a < b - 1e-9) count = 2;
  else count = 1;
  const acute = a > 0 ? asinD(b * sinD(A) / a) : null;     // sinB = b·sinA / a
  const obtuse = (count === 2) ? 180 - acute : null;
  return { count, h, acute, obtuse };
}

/* ============================================================
   COORDINATE SOLVER  → to-scale vertices for the diagram engine
   ------------------------------------------------------------
   Sides a, b, c are OPPOSITE angles A, B, C (the "friends" rule).
   We place B at the origin and C on the positive x-axis (so
   BC = a), then locate A by its distances to B (=c) and C (=b).
   The returned coordinates are in REAL units, so the engine can
   verify the picture is to scale straight from them.
   ============================================================ */
export function triCoords(a, b, c) {
  const B = { x: 0, y: 0 };
  const Cv = { x: a, y: 0 };
  const Ax = (c * c - b * b + a * a) / (2 * a);
  const Ay = Math.sqrt(Math.max(0, c * c - Ax * Ax));
  return { A: { x: Ax, y: Ay }, B, C: Cv };
}

/* Solve a full triangle from a partial spec, then return real
   coordinates keyed by the chosen vertex names.
   spec: { sides?:{a,b,c}, angles?:{A,B,C} } where a is opposite A.
   At least enough to determine the triangle (AAS/ASA, SAS, SSS).
   Returns { sides:{a,b,c}, angles:{A,B,C}, pts:{A,B,C} (coords) }. */
export function solveTriangle({ sides = {}, angles = {} }) {
  let { a, b, c } = sides;
  let { A, B, C } = angles;

  // fill the third angle if two are known
  const known = [A, B, C].filter(v => v != null).length;
  if (known === 2) {
    if (A == null) A = 180 - B - C;
    else if (B == null) B = 180 - A - C;
    else C = 180 - A - B;
  }

  // AAS / ASA — all three angles + one side → sine rule for the rest
  if (A != null && B != null && C != null) {
    const ref = a != null ? { s: a, ang: A } : b != null ? { s: b, ang: B } : { s: c, ang: C };
    const k = ref.s / sinD(ref.ang);
    if (a == null) a = k * sinD(A);
    if (b == null) b = k * sinD(B);
    if (c == null) c = k * sinD(C);
  } else {
    // SAS / SSS — derive the missing side/angles via cosine rule
    if (a == null && A != null && b != null && c != null) a = cosineRuleSide(b, c, A);
    if (b == null && B != null && a != null && c != null) b = cosineRuleSide(a, c, B);
    if (c == null && C != null && a != null && b != null) c = cosineRuleSide(a, b, C);
    A = cosineRuleAngle(a, b, c);
    B = cosineRuleAngle(b, a, c);
    C = cosineRuleAngle(c, a, b);
  }

  return { sides: { a, b, c }, angles: { A, B, C }, pts: triCoords(a, b, c) };
}

/* rotate a set of named points about their centroid (gives the
   diagram a natural, "not axis-aligned" look like the workbook). */
export function rotatePts(pts, degAngle) {
  const keys = Object.keys(pts);
  const cx = keys.reduce((s, k) => s + pts[k].x, 0) / keys.length;
  const cy = keys.reduce((s, k) => s + pts[k].y, 0) / keys.length;
  const t = rad(degAngle), co = Math.cos(t), si = Math.sin(t);
  const out = {};
  keys.forEach(k => {
    const dx = pts[k].x - cx, dy = pts[k].y - cy;
    out[k] = { x: cx + dx * co - dy * si, y: cy + dx * si + dy * co };
  });
  return out;
}

/* foot of the perpendicular from point P onto the line through Q,R
   (used for "shortest distance" / altitude diagrams). */
export function footOfPerp(P, Q, R) {
  const dx = R.x - Q.x, dy = R.y - Q.y;
  const t = ((P.x - Q.x) * dx + (P.y - Q.y) * dy) / (dx * dx + dy * dy);
  return { x: Q.x + t * dx, y: Q.y + t * dy };
}

export const dist = (P, Q) => Math.hypot(P.x - Q.x, P.y - Q.y);
