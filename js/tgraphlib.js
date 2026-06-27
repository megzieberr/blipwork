/* ============================================================
   TRIG-GRAPH MATHS  (Grade 11 Trig Graphs chapter)
   ------------------------------------------------------------
   Every answer the quests use is COMPUTED here — period,
   amplitude, range, number of cycles, asymptotes, key points,
   and the readable equation string. Nothing is hand-typed in
   the quest files. Decimal comma + a real minus sign throughout.

   A trig "curve" is a small spec the engine and these helpers
   share, written in the chapter's standard form:

     y = a · fn( b·(x − p) ) + q          fn ∈ {sin, cos, tan}

   stored as { fn, a, b, p, q } with x and p in DEGREES.
     a — amplitude / orientation (steepness for tan)
     b — horizontal stretch  (period = 360°/b, or 180°/b for tan)
     p — horizontal shift in degrees   (bracket is (x − p))
     q — vertical shift  (midline y = q)
   ============================================================ */
import { fmtComma } from "./check.js";
import { randInt, pick, shuffled } from "./ui.js";
export { randInt, pick, shuffled };

const D2R = Math.PI / 180;
export const sind = (d) => Math.sin(d * D2R);
export const cosd = (d) => Math.cos(d * D2R);
export const tand = (d) => Math.tan(d * D2R);

/* comma decimal + a true minus sign for display */
export const C = (v) => fmtComma(v);
export const neg = (s) => String(s).replace(/-/g, "−");
export const nstr = (v) => neg(fmtComma(v));

/* -------- evaluate any trig curve (degrees in) -------- */
export function makeTrig(cv) {
  const a = cv.a == null ? 1 : cv.a, b = cv.b == null ? 1 : cv.b, p = cv.p || 0, q = cv.q || 0;
  const base = cv.fn === "cos" ? cosd : cv.fn === "tan" ? tand : sind;
  return (x) => a * base(b * (x - p)) + q;
}

/* -------- the three headline properties -------- */
export function periodOf(cv) {
  const base = cv.fn === "tan" ? 180 : 360;
  return base / Math.abs(cv.b == null ? 1 : cv.b);
}
/* amplitude: |a| for sin/cos; tangent has none */
export function amplitudeOf(cv) {
  return cv.fn === "tan" ? null : Math.abs(cv.a == null ? 1 : cv.a);
}
/* range as {lo,hi} for sin/cos, or {real:true} for tan */
export function rangeOf(cv) {
  if (cv.fn === "tan") return { real: true };
  const A = amplitudeOf(cv), q = cv.q || 0;
  return { lo: q - A, hi: q + A };
}
/* number of complete cycles in [x0;x1] */
export function cyclesIn(cv, x0, x1) {
  return (x1 - x0) / periodOf(cv);
}

/* tan asymptotes inside [x0;x1]: where cos(b(x−p)) = 0,
   i.e. b(x−p) = 90 + 180k  →  x = p + (90 + 180k)/b */
export function tanAsymptotesIn(cv, x0, x1) {
  if (cv.fn !== "tan") return [];
  const b = Math.abs(cv.b == null ? 1 : cv.b), p = cv.p || 0;
  const out = [];
  // k range wide enough to cover the window
  const kLo = Math.floor((b * (x0 - p) - 90) / 180) - 1;
  const kHi = Math.ceil((b * (x1 - p) - 90) / 180) + 1;
  for (let k = kLo; k <= kHi; k++) {
    const x = p + (90 + 180 * k) / b;
    if (x > x0 + 1e-6 && x < x1 - 1e-6) out.push(Math.round(x * 1e6) / 1e6);
  }
  return out;
}

/* x-intercepts of a tan/sin curve inside [x0;x1] (where the numerator is 0).
   For sin: b(x−p)=180k ; for cos: b(x−p)=90+180k ; for tan: b(x−p)=180k. */
export function zerosIn(cv, x0, x1) {
  const b = Math.abs(cv.b == null ? 1 : cv.b), p = cv.p || 0, q = cv.q || 0;
  if (q !== 0 && cv.fn !== "tan") return [];          // shifted sin/cos may not cross 0 cleanly
  const phase = cv.fn === "cos" ? 90 : 0;
  const out = [];
  for (let k = -20; k <= 20; k++) {
    const x = p + (phase + 180 * k) / b;
    if (x >= x0 - 1e-6 && x <= x1 + 1e-6) out.push(Math.round(x * 1e6) / 1e6);
  }
  return out;
}

/* ============================================================
   READABLE EQUATION + property strings
   ============================================================ */
/* a coefficient in front of the function name */
export function coefStr(a) {
  if (a === 1) return "";
  if (a === -1) return "−";
  if (a === 0.5) return "½";
  if (a === -0.5) return "−½";
  return nstr(a);
}
/* the b inside the bracket ("3" in sin3x, "½" in cos½x, "" when b=1) */
export function bStr(b) {
  if (b === 1) return "";
  if (b === 0.5) return "½";
  return nstr(b);
}
/* the argument of the function: "3x", "x", "½x", "(x − 30°)", "2(x − 30°)" */
export function argStr(cv) {
  const b = cv.b == null ? 1 : cv.b, p = cv.p || 0;
  const bp = bStr(b);
  if (!p) return `${bp}x`;
  const pp = p > 0 ? `x − ${nstr(p)}°` : `x + ${nstr(-p)}°`;
  return b === 1 ? `(${pp})` : `${bp}(${pp})`;
}
/* the full equation as an HTML-safe string, e.g. "y = −3cos ½x + 1" */
export function eqStr(cv, name = "y") {
  const arg = argStr(cv);
  const sep = arg.startsWith("(") ? "" : " ";       // "cos(x − 30°)" but "cos 3x"
  let s = `${name} = ${coefStr(cv.a == null ? 1 : cv.a)}${cv.fn}${sep}${arg}`;
  const q = cv.q || 0;
  if (q) s += q > 0 ? ` + ${nstr(q)}` : ` − ${nstr(-q)}`;
  return s;
}

export function periodStr(cv) { return `${nstr(periodOf(cv))}°`; }
export function ampStr(cv) {
  if (cv.fn === "tan") return "undefined";
  const A = amplitudeOf(cv);
  return A === 0.5 ? "½" : nstr(A);
}
export function rangeStr(cv) {
  const r = rangeOf(cv);
  if (r.real) return "y ∈ ℝ";
  return intervalStr(r.lo, r.hi);
}
export function intervalStr(lo, hi) { return `y ∈ [${nstr(lo)} ; ${nstr(hi)}]`; }
/* a degree label with a comma decimal + real minus, e.g. "120°", "−45°" */
export const degLabel = (n) => `${nstr(n)}°`;

/* ============================================================
   FRESH, CLEAN RANDOM CURVES  (tidy integer features & answers)
   ============================================================ */
const AMPS = [1, 2, 3, 4];                 // sin/cos amplitudes that read cleanly
const BVALS = [1, 2, 3];                   // stretch factors
const TAN_B = [1, 2, 3];

/* a sin or cos with optional vertical shift; never a flat graph */
export function randSinCos(opts = {}) {
  const fn = opts.fn || pick(["sin", "cos"]);
  const a = opts.a != null ? opts.a : pick([...AMPS, -2, -3, -1]);
  const b = opts.b != null ? opts.b : pick(BVALS);
  const q = opts.q != null ? opts.q : (opts.noShift ? 0 : pick([0, 0, 1, -1, 2, -2]));
  const p = opts.p != null ? opts.p : 0;
  return { fn, a, b, p, q };
}
/* a tan graph */
export function randTan(opts = {}) {
  const a = opts.a != null ? opts.a : pick([1, 2, 3, -1, -2]);
  const b = opts.b != null ? opts.b : pick(TAN_B);
  const q = opts.q != null ? opts.q : (opts.noShift ? 0 : pick([0, 0, 1, -1]));
  const p = opts.p != null ? opts.p : 0;
  return { fn: "tan", a, b, p, q };
}
/* any of the three families */
export function randCurve(opts = {}) {
  return pick([
    () => randSinCos({ fn: "sin", ...opts }),
    () => randSinCos({ fn: "cos", ...opts }),
    () => randTan(opts),
  ])();
}

export const FN_NAME = { sin: "sine", cos: "cosine", tan: "tangent" };
