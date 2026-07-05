/* Shared trig-quest helpers: turn solved triangle geometry into a
   to-scale diagram spec, plus builders for the composite figures
   (house/pentagon) and regular polygons used by the Area-rule quest.
   Rule we keep everywhere: only GIVEN (exact) measurements get a
   numeric label; unknowns are letters (x / y / θ) — so the engine's
   to-scale checks only ever see exact values. */
import { solveTriangle, rotatePts, sinD, cosD } from "../triglib.js";
import { computeTriangle } from "../engine/triangle-graph.js";

/* Solve + place a triangle, bound to display letters.
   given:  { sides:{a,b,c}, angles:{A,B,C} }   (side a is opposite A …)
   letters:[Aname,Bname,Cname]   rotate: degrees to spin the picture   */
export function placeTri(given, letters = ["A", "B", "C"], rotate = 0) {
  const sol = solveTriangle(given);
  const pts = rotate ? rotatePts(sol.pts, rotate) : sol.pts;
  const map = { A: letters[0], B: letters[1], C: letters[2] };
  const P = {}; ["A", "B", "C"].forEach(k => P[map[k]] = pts[k]);
  return {
    pts: P,
    poly: [map.A, map.B, map.C],
    map,
    sides: sol.sides,         // {a,b,c}
    angles: sol.angles,       // {A,B,C}
    side(g1, g2, label) { return { from: map[g1], to: map[g2], label }; },
    angle(g, label, opts = {}) { return { at: map[g], label, ...opts }; },
    L(g) { return map[g]; },
  };
}

/* Start point for a cevian drawn from vertex `from` towards `to`,
   nudged `px` PIXELS down the segment (converted to real units via the
   engine's own scale) so a dashed altitude never strikes through the
   angle label the engine hangs ≈27px out from the vertex.
   `spec` must already hold its final pts/poly (the nudged point lies on
   the segment, so adding it afterwards cannot change the fitted scale). */
export function segStartClear(spec, from, to, px = 40) {
  const g = computeTriangle(spec);
  const F = spec.pts[from], T = spec.pts[to];
  const L = Math.hypot(T.x - F.x, T.y - F.y) || 1e-6;
  const k = Math.min(0.45, px / (g.scale * L));
  return { x: F.x + (T.x - F.x) * k, y: F.y + (T.y - F.y) * k };
}

/* A "house" pentagon (rectangle + isosceles roof) — the Area-rule
   composite figure. roof side r, apex angle θ, wall height h.
   Returns { spec-ready pieces, area, w }. */
export function houseFigure(r, theta, h, accent) {
  const half = r * sinD(theta / 2);     // half the base
  const rh = r * cosD(theta / 2);       // roof height
  const w = 2 * half;
  const pts = {
    H: { x: 0, y: 0 }, J: { x: w, y: 0 },
    K: { x: w, y: h }, L: { x: w / 2, y: h + rh }, G: { x: 0, y: h },
  };
  return {
    graph: {
      type: "triangle", accent, w: 360, h: 240,
      pts, poly: ["H", "J", "K", "L", "G"],
      sides: [
        { from: "G", to: "L", label: String(r) },
        { from: "L", to: "K", label: String(r) },
        { from: "H", to: "G", label: String(h) },
        { from: "J", to: "K", label: String(h) },
      ],
      angles: [
        { at: "L", label: `${theta}°` },
        { at: "H", right: true }, { at: "J", right: true },
      ],
    },
    w,
    areaRoof: 0.5 * r * r * sinD(theta),
    areaWall: w * h,
  };
}

/* A regular n-gon with side s, drawn to scale (one flat side at the
   bottom). Labels two adjacent sides with s. */
export function regularPolygonFigure(n, s, accent) {
  const R = s / (2 * sinD(180 / n));        // circumradius
  const start = -90 - 180 / n;              // orient a flat side at the bottom
  const names = "ABCDEFGHIJ".slice(0, n).split("");
  const pts = {};
  names.forEach((nm, i) => {
    const a = (start + i * 360 / n) * Math.PI / 180;
    pts[nm] = { x: R * Math.cos(a), y: R * Math.sin(a) };
  });
  return {
    type: "triangle", accent, w: 320, h: 260,
    pts, poly: names,
    sides: [
      { from: names[0], to: names[1], label: String(s) },
      { from: names[1], to: names[2], label: String(s) },
    ],
  };
}
