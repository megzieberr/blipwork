/* ============================================================
   Shared Functions-quest helpers — turn chosen equations into
   to-scale graph specs for the function-graph engine, choose a
   sensible integer window, and label the standard features.
   Rule kept everywhere: a labelled POINT always names the curve
   it sits on (point.on = curve index) so verify() can prove the
   label is honest.
   ============================================================ */
import {
  makeFn, paraTP, paraRoots, paraYInt, lineXInt, lineYInt,
  hypYInt, hypXInt, parabolaFromRoots, ptStr, C,
} from "../funclib.js";
import { randInt, pick } from "../ui.js";

const nz = (lo, hi) => { let v = 0; while (v === 0) v = randInt(lo, hi); return v; };

/* clean, fresh random curves (integer features → tidy graphs & answers) */
export function randLine() { return { kind: "line", a: nz(-3, 3), q: randInt(-4, 4) }; }
export function randParabola() {                        // from two integer roots → integer a,b,c
  const a = pick([1, 1, -1, -1, 2, -2]);
  let r1 = randInt(-4, 3), r2 = randInt(-3, 4);
  if (r2 <= r1) r2 = r1 + randInt(1, 4);
  return parabolaFromRoots(a, r1, r2);
}
export function randHyperbola() {
  return { kind: "hyperbola", a: nz(-4, 4), p: randInt(-3, 3), q: randInt(-3, 3) };
}
export function randExp() {
  const b = pick([2, 3, 0.5]);
  return { kind: "exp", a: pick([1, 1, 2, -1]), b, p: 0, q: randInt(-3, 3) };
}
export const randCurveOf = { line: randLine, parabola: randParabola, hyperbola: randHyperbola, exp: randExp };
export const FAMILY = {
  line: "Straight line", parabola: "Parabola", hyperbola: "Hyperbola", exp: "Exponential graph",
};

/* three DISTINCT decoy points around a correct (x, y) — the classic mistakes
   (swap, sign flips) first, then small offsets as guaranteed-distinct fallback
   so the answer is always exactly one of ≥3 different options. */
export function ptDecoys(x, y) {
  const cand = [[y, x], [x, -y], [-x, y], [-x, -y], [x + 1, y], [x, y + 1], [y, -x]];
  const seen = new Set([`${x},${y}`]); const out = [];
  for (const [a, b] of cand) {
    const k = `${a},${b}`;
    if (!seen.has(k)) { seen.add(k); out.push(ptStr(a, b)); }
    if (out.length >= 3) break;
  }
  return out;
}

/* an integer window that encloses the given feature points AND the origin,
   with padding and a minimum span so the picture is never cramped. */
export function winFor(pts, { pad = 1, minX = 8, minY = 8 } = {}) {
  const xs = [0, ...pts.map((p) => p.x)], ys = [0, ...pts.map((p) => p.y)];
  let xmin = Math.floor(Math.min(...xs)) - pad, xmax = Math.ceil(Math.max(...xs)) + pad;
  let ymin = Math.floor(Math.min(...ys)) - pad, ymax = Math.ceil(Math.max(...ys)) + pad;
  const grow = (lo, hi, min) => {
    let span = hi - lo;
    while (span < min) { lo -= 1; hi += 1; span = hi - lo; }
    return [lo, hi];
  };
  [xmin, xmax] = grow(xmin, xmax, minX);
  [ymin, ymax] = grow(ymin, ymax, minY);
  return { xmin, xmax, ymin, ymax };
}

/* label "(2 ; 0)" but compact for an axis intercept */
const lab = (x, y) => `(${C(x)} ; ${C(y)})`;

/* ---- single-curve graphs with their standard labelled features ---- */

export function lineGraph(cv, { accent, showInts = true, label } = {}) {
  const xi = lineXInt(cv), yi = lineYInt(cv);
  const pts = [];
  if (showInts && xi != null) pts.push({ x: xi, y: 0 });
  pts.push({ x: 0, y: yi });
  const win = winFor(pts);
  const points = [];
  if (showInts && xi != null && xi !== 0) points.push({ x: xi, y: 0, on: 0, label: lab(xi, 0) });
  points.push({ x: 0, y: yi, on: 0, label: lab(0, yi) });
  return {
    spec: { type: "function", accent, grid: true, win, curves: [{ ...cv, label, labelAt: label ? win.xmax - 1.5 : undefined }], points },
    xi, yi,
  };
}

export function parabolaGraph(cv, { accent, label, showTP = true, showRoots = true, showY = true } = {}) {
  const tp = paraTP(cv), roots = paraRoots(cv), yi = paraYInt(cv);
  const feat = [tp, { x: 0, y: yi }, ...roots.map((r) => ({ x: r, y: 0 }))];
  const win = winFor(feat);
  const points = [];
  if (showRoots) roots.forEach((r) => { if (Math.abs(r) > 1e-6) points.push({ x: r, y: 0, on: 0, label: lab(Math.round(r * 100) / 100, 0) }); });
  if (showTP) points.push({ x: tp.x, y: tp.y, on: 0, label: lab(Math.round(tp.x * 100) / 100, Math.round(tp.y * 100) / 100), ly: cv.a > 0 ? undefined : undefined });
  if (showY && Math.abs(yi) > 1e-6 && Math.abs(tp.x) > 0.4) points.push({ x: 0, y: yi, on: 0, label: lab(0, yi) });
  return {
    spec: { type: "function", accent, grid: true, win, curves: [{ ...cv, label, labelAt: label ? (cv.a > 0 ? win.xmax - 1.2 : win.xmin + 1.2) : undefined }], points },
    tp, roots, yi,
  };
}

export function hyperbolaGraph(cv, { accent, label, showAsym = true, showInts = true } = {}) {
  const yi = hypYInt(cv), xi = hypXInt(cv);
  const feat = [{ x: cv.p, y: cv.q }];
  if (xi != null) feat.push({ x: xi, y: 0 });
  if (yi != null) feat.push({ x: 0, y: yi });
  feat.push({ x: cv.p + 2, y: cv.a / 2 + cv.q }, { x: cv.p - 2, y: -cv.a / 2 + cv.q });
  const win = winFor(feat, { pad: 1 });
  const points = [];
  if (showInts && xi != null && xi >= win.xmin && xi <= win.xmax) points.push({ x: xi, y: 0, on: 0, label: lab(Math.round(xi * 100) / 100, 0) });
  if (showInts && yi != null && yi >= win.ymin && yi <= win.ymax) points.push({ x: 0, y: yi, on: 0, label: lab(0, Math.round(yi * 100) / 100) });
  return {
    spec: {
      type: "function", accent, grid: true, win, curves: [{ ...cv, label, labelAt: label ? cv.p + 2.2 : undefined }],
      asymptotes: showAsym ? [{ x: cv.p, of: 0 }, { y: cv.q, of: 0 }] : [], points,
    },
    yi, xi,
  };
}

export function expGraph(cv, { accent, label, showAsym = true, showY = true } = {}) {
  const f = makeFn(cv), yi = f(0);
  const feat = [{ x: 0, y: yi }, { x: 2, y: f(2) }, { x: -2, y: f(-2) }, { x: cv.p || 0, y: cv.q }];
  const win = winFor(feat, { pad: 1 });
  const points = [];
  if (showY && yi >= win.ymin && yi <= win.ymax) points.push({ x: 0, y: yi, on: 0, label: lab(0, Math.round(yi * 100) / 100) });
  return {
    spec: {
      type: "function", accent, grid: true, win, curves: [{ ...cv, label, labelAt: label ? (cv.b > 1 ? 1.6 : -1.6) : undefined }],
      asymptotes: showAsym ? [{ y: cv.q, of: 0 }] : [], points,
    },
    yi,
  };
}
