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

/* ============================================================
   GENERAL TRIG (chapter `gtrig`) — pure helpers
   ------------------------------------------------------------
   Added 2026-08-22 for her 13 General-Trig drill rounds. Everything
   below is PURE: degrees in, degrees/numbers out, no DOM, no
   randomness. The maths follows METHODS-trig.md (her digest of her
   own pages) rather than a generic textbook, because the ROUNDS
   drill her wording:
     • Part B  — ASTC: A① S② T③ C④ (All Strippers Take Cash)
     • Part E2 — her three steps: quadrant → formula → sign
     • Part E5 — her ROTATION thresholds (> 360 take 360 off,
                 < −90 add 360 on). The −90 is deliberate (flag F10):
                 sin(−30) and cos(−40) are read straight off the wheel.
     • Part D2 — the co-function wheel, including THE TRAP
                 cos(90 + θ) = −sinθ
     • Part C3 — the O-A-H table, values left UNRATIONALISED (F12)
     • Part 0.6 / L2 — reference angles come from the POSITIVE value
     • Part L1 / D8 — the boundary values (sinθ = 0, cosθ = 0 …) follow
                 HER pages, not the graph a computer would draw
   ============================================================ */

export const atanD = v => deg(Math.atan(v));

/* the real minus sign (U+2212) — never a hyphen in anything a learner sees */
const MINUS = "−";

/* "−30°" / "0°" / "12,5°" — real minus, decimal comma (house rules) */
export function fmtDeg(n) {
  if (n == null || !Number.isFinite(n)) return "";
  return fmtComma(n).replace(/-/g, MINUS) + "°";
}

/* Which quadrant does an angle land in? 1–4 (her ①②③④).
   A QUADRANTAL angle (0/90/180/270 after wrapping) belongs to no
   quadrant, so it returns null — the caller must handle it with
   boundaryCase() / her "read it off the graph" habit (Part C4). */
export function quadrantOf(angle) {
  if (!Number.isFinite(angle)) return null;
  const a = ((angle % 360) + 360) % 360;
  if (Math.abs(a % 90) < 1e-9) return null;
  return Math.floor(a / 90) + 1;
}

/* ASTC: the sign a ratio carries in a quadrant.
   ① All +   ② only Sin +   ③ only Tan +   ④ only Cos +   */
export function astcSign(fn, quadrant) {
  const table = {
    sin: { 1: 1, 2: 1, 3: -1, 4: -1 },
    cos: { 1: 1, 2: -1, 3: -1, 4: 1 },
    tan: { 1: 1, 2: -1, 3: 1, 4: -1 },
  };
  const row = table[fn];
  if (!row || row[quadrant] === undefined) return null;
  return row[quadrant];
}

/* ROTATIONS (p09, her thresholds — flag F10).
   Returns the rotated angle PLUS the list of turns, one entry per
   360°, because she writes them one per turn above the angle:
     tan1080  [−360 −360 −360]  = tan0°
   (that worked example is why the "too big" test is >= 360, not
   > 360 — 360° itself gets a turn taken off so it lands on 0°.)
     sin(−600) [+360 +360] = sin120° */
export function rotate(angle) {
  let a = angle;
  const turns = [];
  let guard = 0;
  while (a >= 360 && guard++ < 200) { a -= 360; turns.push(MINUS + "360"); }
  while (a < -90 && guard++ < 200) { a += 360; turns.push("+360"); }
  return { angle: a, turns };
}

/* REDUCTION (Part E). Rewrites any angle as ± ratio of an ACUTE angle.
   { rotated, turns, quadrant, form, ref, sign, fn2, value }
     rotated — after her rotation rule, so always in [−90; 360)
     form    — "θ" | "180−" | "180+" | "360−" | "−θ"  (p08 / p13 wheels)
     ref     — the acute reference angle (always positive)
     sign    — ±1, from ASTC
     fn2     — the ratio it stays (reductions never swap the ratio;
               that is the CO-FUNCTION job, see cofunction())
     value   — fn(angle) numerically (null where tan is undefined)
   The contract that makes it safe:  sign · fn(ref) === fn(angle). */
export function reduce(fn, angle) {
  const rot = rotate(angle);
  const r = rot.angle;
  const undef = fn === "tan" && Math.abs((((r % 180) + 180) % 180) - 90) < 1e-9;
  const value = undef ? null
    : (fn === "sin" ? sinD(angle) : fn === "cos" ? cosD(angle) : tanD(angle));
  const base = { rotated: r, turns: rot.turns, quadrant: quadrantOf(r), fn2: fn, value };

  // quadrantal (0 / 90 / 180 / 270): no quadrant, no reduction — she reads
  // these off the little graphs (p25 "read from graph or type into calculator")
  if (Math.abs((((r % 90) + 90) % 90)) < 1e-9) {
    // the one quadrantal angle that still needs a sign is −90° (sin(−90) = −1):
    // her wheel reads it as a C-quadrant "−θ" form, so treat it that way.
    if (r < 0) return { ...base, form: MINUS + "θ", ref: -r, sign: astcSign(fn, 4) };
    return { ...base, form: "θ", ref: r, sign: 1 };
  }
  if (r < 0) return { ...base, form: MINUS + "θ", ref: -r, sign: astcSign(fn, 4) };   // p13: −θ is a C angle
  if (r < 90) return { ...base, form: "θ", ref: r, sign: 1 };
  if (r < 180) return { ...base, form: "180" + MINUS, ref: 180 - r, sign: astcSign(fn, 2) };
  if (r < 270) return { ...base, form: "180+", ref: r - 180, sign: astcSign(fn, 3) };
  return { ...base, form: "360" + MINUS, ref: 360 - r, sign: astcSign(fn, 4) };
}

/* CO-FUNCTIONS (Part D2/D3/D4). The ratio SWAPS; the sign comes from
   the quadrant the form lands in.
     "90−"  is an A angle  → everything positive, ratio swaps
     "90+"  is an S angle  → sin(90+θ) = +cosθ  but  cos(90+θ) = −sinθ  ⚠️ THE TRAP
     "θ−90" (p24 ⑤)        → sin(θ−90) = −cosθ  ·  cos(θ−90) = sinθ
   tan is included for completeness (it becomes cot); her rounds only
   ever ask sin and cos. Both the real-minus and the ASCII-hyphen
   spelling of a form are accepted, so callers can't trip on the glyph. */
export function cofunction(fn, form) {
  const swap = { sin: "cos", cos: "sin", tan: "cot" };
  const fn2 = swap[fn];
  if (!fn2) return null;
  const f = String(form).replace(/-/g, MINUS).replace(/[xX]/g, "θ");
  if (f === "90" + MINUS) return { sign: 1, fn2 };
  if (f === "90+") return { sign: fn === "sin" ? 1 : -1, fn2 };
  if (f === "θ" + MINUS + "90") return { sign: fn === "cos" ? 1 : -1, fn2 };
  return null;
}

/* SPECIAL ANGLES (Part C3) — read off her O-A-H table, left
   UNRATIONALISED exactly as she writes them (1/√3, 1/√2 — flag F12),
   plus the quadrantal values she reads off the little graphs (C4).
     specialExact("tan", 30) → { text: "1/√3", value: 0.5773… }
     specialExact("tan", 90) → { text: "undefined", value: null }   */
export function specialExact(fn, angle) {
  const T = {
    0:   { sin: ["0", 0],          cos: ["1", 1],          tan: ["0", 0] },
    30:  { sin: ["1/2", 0.5],      cos: ["√3/2", null],    tan: ["1/√3", null] },
    45:  { sin: ["1/√2", null],    cos: ["1/√2", null],    tan: ["1", 1] },
    60:  { sin: ["√3/2", null],    cos: ["1/2", 0.5],      tan: ["√3", null] },
    90:  { sin: ["1", 1],          cos: ["0", 0],          tan: ["undefined", null] },
    180: { sin: ["0", 0],          cos: [MINUS + "1", -1], tan: ["0", 0] },
    270: { sin: [MINUS + "1", -1], cos: ["0", 0],          tan: ["undefined", null] },
    360: { sin: ["0", 0],          cos: ["1", 1],          tan: ["0", 0] },
  };
  const row = T[angle];
  if (!row || !row[fn]) return null;
  const [text, exact] = row[fn];
  if (text === "undefined") return { text: "undefined", value: null };
  // the numeric value is COMPUTED (never hand-typed) — the table only
  // supplies the way she WRITES it
  const value = exact !== null ? exact
    : (fn === "sin" ? sinD(angle) : fn === "cos" ? cosD(angle) : tanD(angle));
  return { text, value };
}

/* REFERENCE ANGLE from a ratio's value (Part 0.6 / L2 — p44 ①
   "don't type − into calculator"): always taken from the SIZE of the
   number, never from the calculator's negative inverse.
   Out-of-range sin/cos values (|v| > 1) → null, which is her
   "∴ no solution" (Part 0.5). */
export function refAngle(fn, value) {
  if (!Number.isFinite(value)) return null;
  const v = Math.abs(value);
  if (fn === "tan") return atanD(v);
  if (v > 1 + 1e-12) return null;
  return fn === "sin" ? asinD(v) : fn === "cos" ? acosD(v) : null;
}

/* Which quadrants does a ratio of that SIGN live in? (the tick cross)
   sin+ → [1,2] · cos− → [2,3] · tan+ → [1,3] …
   NON-ZERO general case only. For value ∈ {−1, 0, 1} use boundaryCase(). */
export function solutionQuadrants(fn, sign) {
  const s = sign >= 0 ? 1 : -1;
  return [1, 2, 3, 4].filter(q => astcSign(fn, q) === s);
}

/* The BOUNDARY values, straight off her pages (digest D8) — NOT off a
   graph a computer would draw. She still writes a ref ∠ and quadrant
   lines for these:
     sinθ = 0  → ref 0°,  quadrants I, II   (p53)
     sinθ = 1  → ref 90°, quadrant  I
     sinθ = −1 → ref 90°, quadrant  III     (p59)
     cosθ = 0  → ref 90°, quadrant  I only  (p62)
     cosθ = 1  → ref 0°,  quadrant  I
     cosθ = −1 → ref 0°,  quadrant  II      (p54)
   Anything else (and every tan value — tan has no boundary case in her
   notes) → null, so the caller falls through to the general case. */
export function boundaryCase(fn, value) {
  if (fn !== "sin" && fn !== "cos") return null;
  if (value !== -1 && value !== 0 && value !== 1) return null;
  // HER RULING 2026-08-22 evening (overrides the earlier page-by-page reading):
  // a boundary value follows the plain sign rule — "1 is positive, and cos is
  // positive in quadrant 1 and 4, so both need to be ticked". So ±1 ticks the
  // ASTC pair; 0 keeps her p53 habit (ref 0, the two positive quadrants).
  const table = {
    sin: { "0": { ref: 0, quadrants: [1, 2] }, "1": { ref: 90, quadrants: [1, 2] }, "-1": { ref: 90, quadrants: [3, 4] } },
    cos: { "0": { ref: 90, quadrants: [1, 4] }, "1": { ref: 0, quadrants: [1, 4] }, "-1": { ref: 0, quadrants: [2, 3] } },
  };
  const hit = table[fn][String(value)];
  return hit ? { ref: hit.ref, quadrants: hit.quadrants.slice() } : null;
}

/* PYTHAGORAS on the Cartesian plane (Part H1, p26).
   Two of { x, y, r } in, the third out — with its SIGN taken from the
   quadrant, exactly as her `±` line then `∴` line does. r is ALWAYS
   positive ("always positive bc it is the radius").
     pythSide({ x: −3, y: −4 })                → { r: 5 }
     pythSide({ x: −12, r: 13, quadrant: 2 })  → { y: 5 }
     pythSide({ y: −3, r: 5, quadrant: 4 })    → { x: 4 }
   `which` ("x" | "y" | "r") is optional — omit it and the missing one
   is worked out. With no quadrant given the magnitude comes back
   positive (her `±` line, before the `∴` picks the sign). */
export function pythSide(known = {}, which = null) {
  const has = k => known[k] != null && Number.isFinite(known[k]);
  const want = which || (!has("r") ? "r" : !has("x") ? "x" : !has("y") ? "y" : null);
  if (want === "r") {
    if (!has("x") || !has("y")) return null;
    return { r: Math.hypot(known.x, known.y) };
  }
  if (want !== "x" && want !== "y") return null;
  const other = want === "x" ? "y" : "x";
  if (!has("r") || !has(other)) return null;
  const mag = Math.sqrt(Math.max(0, known.r * known.r - known[other] * known[other]));
  const q = known.quadrant;
  let sign = 1;
  if (q === 2) sign = want === "x" ? -1 : 1;
  else if (q === 3) sign = -1;
  else if (q === 4) sign = want === "x" ? 1 : -1;
  return { [want]: mag * sign };
}
