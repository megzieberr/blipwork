/* ============================================================
   Shared Analytical-Geometry helpers — turn point sets into
   to-scale specs for the analytical-graph engine, choose a
   sensible integer window, and build the three diagrams the
   chapter leans on: the angle-of-inclination line, the triangle
   with a true altitude (base + ⊥height), and a segment with a
   candidate perpendicular bisector. Everything the diagrams
   assert is provable by the engine's verify().
   ============================================================ */
import {
  midpoint, footOfPerp, gradient, inclination, distance, ptStr, C,
} from "../analyticslib.js";
import { shuffled } from "../ui.js";

/* Letter a set of line segments (A, B, …) for "which line?" multiple-choice —
   easier on a phone than tapping a line that crosses another near the origin.
   Each line gets its letter drawn near its UPPER end (clear of the crossing),
   in a random order, and we return a map from each line's id to its letter. */
export function letterLines(segs, letters = ["A", "B", "C", "D"]) {
  const map = {};
  shuffled(segs.map((_, i) => i)).forEach((idx, k) => {
    const sg = segs[idx], L = letters[k];
    map[sg.id] = L;
    const c = { x: (sg.a.x + sg.b.x) / 2, y: (sg.a.y + sg.b.y) / 2 };
    const end = sg.a.y >= sg.b.y ? sg.a : sg.b;          // the higher endpoint
    sg.label = L;
    sg.labelPt = { x: c.x + (end.x - c.x) * 0.8, y: c.y + (end.y - c.y) * 0.8 };
  });
  return map;
}

/* the seven orange shades (matches AG_SHADES in config) */
export const AG = ["#fdba74", "#fb923c", "#f97316", "#ea6a0c", "#dd5c0a", "#c2480a", "#9a3412"];

/* an integer window that encloses the given points AND the origin,
   padded, with a minimum span so the picture is never cramped. */
export function winFor(pts, { pad = 1, min = 9 } = {}) {
  const xs = [0, ...pts.map((p) => p.x)], ys = [0, ...pts.map((p) => p.y)];
  let xmin = Math.floor(Math.min(...xs)) - pad, xmax = Math.ceil(Math.max(...xs)) + pad;
  let ymin = Math.floor(Math.min(...ys)) - pad, ymax = Math.ceil(Math.max(...ys)) + pad;
  const grow = (lo, hi) => { while (hi - lo < min) { lo -= 1; hi += 1; } return [lo, hi]; };
  [xmin, xmax] = grow(xmin, xmax);
  [ymin, ymax] = grow(ymin, ymax);
  return { xmin, xmax, ymin, ymax };
}

export const labelPt = (P, name) => `${name}${ptStr(P)}`;

/* ---- tiny question-object builders (tap / yesno) so the quests stay terse ---- */
export function tapQ(concept, prompt, graph, tap, opts = {}) {
  graph.tap = tap;                                   // marks the svg tappable in render
  return {
    type: "tap", concept, prompt, graph, tap, tapHint: opts.tapHint,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}
export function yesnoQ(concept, prompt, yes, opts = {}) {
  return {
    type: "yesno", concept, prompt, yes, graph: opts.graph,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}

/* ---- angle of inclination: a full line through the origin, with the θ arc
   drawn at the x-axis to the line's REAL slope (acute up-right, obtuse up-left). */
export function inclinationDiagram(dy, dx, { accent = AG[3], showTheta = true, label = "θ" } = {}) {
  const m = dy / dx;
  // the line's UPWARD ray (positive y component) — that is the side θ opens to
  let ux = dx, uy = dy;
  if (uy < 0) { ux = -ux; uy = -uy; }
  // a couple of points along the line, both directions, for a tidy window
  const far = 4;
  const A = { x: ux * far, y: uy * far }, B = { x: -ux * far, y: -uy * far };
  const win = winFor([A, B, { x: 3, y: 0 }, { x: -3, y: 0 }], { pad: 1, min: 9 });
  const theta = inclination(m);
  const spec = {
    type: "analytic", accent, grid: true, win,
    segs: [{ a: A, b: B, kind: "line", id: "line" }],
    points: [{ x: 0, y: 0, dot: true, label: "" }],
    arcs: showTheta ? [{
      at: { x: 0, y: 0 }, from: { x: 1, y: 0 }, to: { x: ux, y: uy },
      label, expect: theta, r: 1.3,
    }] : [],
  };
  return { spec, m, theta, win };
}

/* ---- triangle with a real altitude: base = side `base` (two vertex names),
   apex = the third vertex; the altitude drops from the apex to the foot on the
   base, drawn dashed with a right-angle marker. Side segs + the altitude all
   carry ids so they can be tapped. */
export function triangleAltitude(P, base, { accent = AG[3], showAlt = true } = {}) {
  const names = Object.keys(P);
  const [b1, b2] = base.split("");
  const apex = names.find((k) => k !== b1 && k !== b2);
  const foot = footOfPerp(P[apex], P[b1], P[b2]);
  const sideIds = [`${b1}${b2}`, `${b2}${apex}`, `${apex}${b1}`];
  const segs = [
    { a: P[b1], b: P[b2], id: `${b1}${b2}` },
    { a: P[b2], b: P[apex], id: `${b2}${apex}` },
    { a: P[apex], b: P[b1], id: `${apex}${b1}` },
  ];
  if (showAlt) segs.push({ a: P[apex], b: foot, id: "alt", dash: true, tone: "b", perp: 0 });
  const spec = {
    type: "analytic", accent, grid: true,
    win: winFor(names.map((k) => P[k]).concat([foot]), { pad: 1, min: 9 }),
    polys: [{ pts: [P[b1], P[b2], P[apex]], fill: true }],
    segs,
    points: names.map((k) => ({ x: P[k].x, y: P[k].y, id: k, label: k, place: "auto" })),
    rights: showAlt ? [{ at: foot, to1: P[apex], to2: P[b1] }] : [],
  };
  return { spec, apex, base, foot, sideIds, baseId: `${b1}${b2}`, altId: "alt" };
}

/* ---- a segment AB with ONE candidate line through it. flags decide whether
   the candidate truly passes through the midpoint and/or is perpendicular, so
   the diagram can pose "is THIS the perpendicular bisector?" honestly. */
export function bisectorCandidate(A, B, { accent = AG[3], throughMid = true, perpendicular = true, len = 3.2, marks = true } = {}) {
  const M = midpoint(A, B);
  // direction of the candidate line
  const d = { x: B.x - A.x, y: B.y - A.y };
  let dir = perpendicular ? { x: -d.y, y: d.x } : { x: -d.y + d.x * 0.7, y: d.x + d.y * 0.7 };
  const l = Math.hypot(dir.x, dir.y) || 1; dir = { x: dir.x / l, y: dir.y / l };
  // pivot: the midpoint, or a point shifted along AB (so it misses the midpoint)
  const pivot = throughMid ? M : { x: M.x + d.x * 0.32, y: M.y + d.y * 0.32 };
  const c1 = { x: pivot.x - dir.x * len, y: pivot.y - dir.y * len };
  const c2 = { x: pivot.x + dir.x * len, y: pivot.y + dir.y * len };
  const segs = [
    { a: A, b: B, id: "AB", tone: "a" },
    { a: c1, b: c2, id: "cand", kind: "line", tone: "b" },
  ];
  const spec = {
    type: "analytic", accent, grid: true,
    win: winFor([A, B, c1, c2], { pad: 1, min: 9 }),
    segs,
    points: [
      { x: A.x, y: A.y, label: "A", place: "auto" },
      { x: B.x, y: B.y, label: "B", place: "auto" },
    ],
    // optional helper marks (the two equal halves + the right angle). Turn OFF
    // for a "spot it by eye" test; the picture is to scale either way.
    ticks: marks && throughMid ? [{ a: A, b: M, n: 1 }, { a: M, b: B, n: 1 }] : [],
    rights: marks && perpendicular && throughMid ? [{ at: M, to1: B, to2: c2 }] : [],
  };
  const isBisector = throughMid && perpendicular;
  return { spec, M, isBisector };
}
