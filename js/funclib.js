/* ============================================================
   FUNCTION MATHS  (Grade 11 Functions chapter)
   ------------------------------------------------------------
   Every answer the quests use is COMPUTED here — intercepts,
   turning points, asymptotes, intersections, domain/range,
   the discriminant, average gradient. Nothing is hand-typed in
   the quest files. Decimal comma throughout (school convention).

   A "curve" is a small spec the engine and these helpers share:
     line:      { kind:"line", a, q }              y = a·x + q
     parabola:  { kind:"parabola", a, b, c }       y = a·x² + b·x + c
                { kind:"parabola", a, p, q }        y = a(x − p)² + q   (TP form)
     hyperbola: { kind:"hyperbola", a, p, q }      y = a/(x − p) + q
     exp:       { kind:"exp", a, b, p, q }         y = a·bˣ⁻ᵖ + q
   ============================================================ */
import { randInt, pick, shuffled } from "./ui.js";
import { fmtComma } from "./check.js";

export const C = (v) => fmtComma(v);
export { randInt, pick, shuffled };

/* trim a float to a tidy number, comma decimal */
export function fix(n, dp = 2) { return fmtComma(Math.round(n * 10 ** dp) / 10 ** dp, dp); }
/* an ordered pair "(2 ; −3)" with comma decimals and a true minus sign */
export function ptStr(x, y) { return `(${C(x)} ; ${C(y)})`; }
/* a real minus sign for display */
export const neg = (s) => String(s).replace(/-/g, "−");

/* -------- evaluate any curve -------- */
export function makeFn(cv) {
  switch (cv.kind) {
    case "line": return (x) => cv.a * x + cv.q;
    case "parabola":
      return cv.p !== undefined
        ? (x) => cv.a * (x - cv.p) ** 2 + cv.q
        : (x) => cv.a * x * x + cv.b * x + cv.c;
    case "hyperbola": return (x) => cv.a / (x - cv.p) + cv.q;
    case "exp": return (x) => cv.a * Math.pow(cv.b, x - (cv.p || 0)) + cv.q;
    default: return () => NaN;
  }
}

/* ============================================================
   LINEAR
   ============================================================ */
export const lineFromGrad = (a, q) => ({ kind: "line", a, q });
export function lineThrough(p1, p2) {
  const a = (p2.y - p1.y) / (p2.x - p1.x);
  return { kind: "line", a, q: p1.y - a * p1.x };
}
export const lineYInt = (cv) => cv.q;
export const lineXInt = (cv) => (cv.a === 0 ? null : -cv.q / cv.a);

/* ============================================================
   PARABOLA
   ============================================================ */
/* y = a(x − r1)(x − r2) expanded to standard form (clean integer intercepts) */
export function parabolaFromRoots(a, r1, r2) {
  return { kind: "parabola", a, b: -a * (r1 + r2), c: a * r1 * r2 };
}
/* y = a(x − p)² + q expanded to standard form */
export function parabolaFromTP(a, p, q) {
  return { kind: "parabola", a, b: -2 * a * p, c: a * p * p + q };
}
export function paraStd(cv) {                          // {a,b,c} for any parabola
  if (cv.p !== undefined) { const e = parabolaFromTP(cv.a, cv.p, cv.q); return { a: e.a, b: e.b, c: e.c }; }
  return { a: cv.a, b: cv.b, c: cv.c };
}
export function paraTP(cv) {
  const { a, b, c } = paraStd(cv);
  const x = -b / (2 * a);
  return { x, y: a * x * x + b * x + c };
}
export const paraYInt = (cv) => paraStd(cv).c;
export function paraDisc(cv) { const { a, b, c } = paraStd(cv); return b * b - 4 * a * c; }
export function paraRoots(cv) {
  const { a, b, c } = paraStd(cv), d = b * b - 4 * a * c;
  if (d < 0) return [];
  const s = Math.sqrt(d);
  const r = [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((u, v) => u - v);
  return d === 0 ? [r[0]] : r;
}
/* tidy "y = a(x − p)² + q" string */
export function paraTPString(cv) {
  const { x: p, y: q } = paraTP(cv), a = paraStd(cv).a;
  const af = a === 1 ? "" : a === -1 ? "−" : C(a);
  const inner = p === 0 ? "x" : p > 0 ? `(x − ${C(p)})` : `(x + ${C(-p)})`;
  const sq = p === 0 ? "x²" : `${inner}²`;
  const tail = q === 0 ? "" : q > 0 ? ` + ${C(q)}` : ` − ${C(-q)}`;
  return `y = ${af}${sq}${tail}`;
}

/* ============================================================
   HYPERBOLA   y = a/(x − p) + q
   ============================================================ */
export const hypAsymX = (cv) => cv.p;
export const hypAsymY = (cv) => cv.q;
export const hypYInt = (cv) => (cv.p === 0 ? null : cv.a / (0 - cv.p) + cv.q);
export const hypXInt = (cv) => (cv.q === 0 ? null : cv.p - cv.a / cv.q);

/* ============================================================
   EXPONENTIAL   y = a·bˣ⁻ᵖ + q
   ============================================================ */
export const expAsymY = (cv) => cv.q;
export const expYInt = (cv) => cv.a * Math.pow(cv.b, -(cv.p || 0)) + cv.q;
export const expGrows = (cv) => cv.b > 1;             // taking off vs landing

/* ============================================================
   DOMAIN / RANGE strings (CAPS notation)
   ============================================================ */
export function domainStr(cv) {
  if (cv.kind === "hyperbola") return `x ∈ ℝ, x ≠ ${C(cv.p)}`;
  return "x ∈ ℝ";
}
export function rangeStr(cv) {
  if (cv.kind === "parabola") {
    const { y: q } = paraTP(cv), a = paraStd(cv).a;
    return a > 0 ? `y ≥ ${C(q)}` : `y ≤ ${C(q)}`;
  }
  if (cv.kind === "hyperbola") return `y ∈ ℝ, y ≠ ${C(cv.q)}`;
  if (cv.kind === "exp") return cv.a > 0 ? `y > ${C(cv.q)}` : `y < ${C(cv.q)}`;
  return "y ∈ ℝ";
}

/* ============================================================
   INTERSECTIONS  (numeric, robust for any pair of curves)
   Scans the window for sign changes of f − g and refines.
   Returns x-values (sorted), de-duplicated.
   ============================================================ */
export function intersections(cvA, cvB, xmin, xmax, step = 0.02) {
  const f = makeFn(cvA), g = makeFn(cvB), xs = [];
  const skip = (x) => (cvA.kind === "hyperbola" && Math.abs(x - cvA.p) < 1e-6) ||
                      (cvB.kind === "hyperbola" && Math.abs(x - cvB.p) < 1e-6);
  let px = xmin, pv = f(px) - g(px);
  for (let x = xmin + step; x <= xmax + 1e-9; x += step) {
    if (skip(x) || skip(px)) { px = x; pv = f(x) - g(x); continue; }
    const v = f(x) - g(x);
    if (Number.isFinite(pv) && Number.isFinite(v) && (pv === 0 || pv * v < 0)) {
      let lo = px, hi = x;
      for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2, vm = f(m) - g(m); if (pv * vm <= 0) hi = m; else { lo = m; pv = vm; } }
      xs.push((lo + hi) / 2);
    }
    px = x; pv = v;
  }
  // de-dup near-equal roots
  const out = [];
  xs.sort((a, b) => a - b).forEach((x) => { if (!out.length || Math.abs(x - out[out.length - 1]) > 1e-3) out.push(x); });
  return out;
}

/* ============================================================
   AVERAGE GRADIENT between x1 and x2 on a curve
   ============================================================ */
export function avgGradient(cv, x1, x2) {
  const f = makeFn(cv);
  return (f(x2) - f(x1)) / (x2 - x1);
}

/* ============================================================
   EQUATION → display string (decimal comma, real minus signs)
   ============================================================ */
const term = (coef, varStr) => {
  if (coef === 0) return "";
  const a = Math.abs(coef);
  const co = a === 1 && varStr ? "" : C(a);
  return (coef < 0 ? "−" : "+") + " " + co + varStr;
};
const lead = (coef, varStr) => {                       // leading term (no leading +)
  if (coef === 0) return "0";
  const a = Math.abs(coef), co = a === 1 && varStr ? "" : C(a);
  return (coef < 0 ? "−" : "") + co + varStr;
};
export function eqStr(cv, name = "y") {
  if (cv.kind === "line") {
    const t = `${lead(cv.a, "x")}${cv.q ? " " + term(cv.q, "") : ""}`;
    return `${name} = ${cv.a === 0 ? C(cv.q) : t}`.trim();
  }
  if (cv.kind === "parabola") {
    const { a, b, c } = paraStd(cv);
    let s = `${name} = ${lead(a, "x²")}`;
    if (b) s += ` ${term(b, "x")}`;
    if (c) s += ` ${term(c, "")}`;
    return s;
  }
  if (cv.kind === "hyperbola") {
    const denom = cv.p === 0 ? "x" : cv.p > 0 ? `x − ${C(cv.p)}` : `x + ${C(-cv.p)}`;
    const tail = cv.q === 0 ? "" : cv.q > 0 ? ` + ${C(cv.q)}` : ` − ${C(-cv.q)}`;
    return `${name} = ${neg(C(cv.a))}/(${denom})${tail}`;
  }
  if (cv.kind === "exp") {
    const ex = !cv.p ? "x" : cv.p > 0 ? `x − ${C(cv.p)}` : `x + ${C(-cv.p)}`;
    const tail = cv.q === 0 ? "" : cv.q > 0 ? ` + ${C(cv.q)}` : ` − ${C(-cv.q)}`;
    const base = Number.isInteger(cv.b) ? C(cv.b) : `(${C(cv.b)})`;
    const co = cv.a === 1 ? "" : cv.a === -1 ? "−" : C(cv.a) + "·";
    return `${name} = ${co}${base}^(${ex})${tail}`;
  }
  return `${name} = ?`;
}

/* ============================================================
   INTERVAL helpers for inequality answers (graph reading)
   Build the tidy "x < a", "a < x < b", "x < a or x > b" strings.
   ============================================================ */
export const ineqLess = (x) => `x &lt; ${C(x)}`;        // x < a
export const ineqGreater = (x) => `x > ${C(x)}`;       // x > a
export const ineqBetween = (a, b) => `${C(a)} &lt; x &lt; ${C(b)}`;
export const ineqOutside = (a, b) => `x &lt; ${C(a)} or x > ${C(b)}`;
