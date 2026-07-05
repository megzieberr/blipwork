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
import { computeAnalytic } from "../engine/analytical-graph.js";
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

/* ---- point-label layout: pick above/below/left/right for every labelled
   point so the text stays inside the frame and off the drawn lines.
   Mirrors the engine's own offsets (±12 above/below, ±9 left/right at
   10.5px font) and scores each spot: out-of-frame is worst, then sitting
   on a segment, then clashing with an already-placed label. ---- */
function clipToWin(A, B, win) {
  const { xmin, xmax, ymin, ymax } = win;
  const dx = B.x - A.x, dy = B.y - A.y, ts = [];
  if (dx !== 0) { ts.push((xmin - A.x) / dx, (xmax - A.x) / dx); }
  if (dy !== 0) { ts.push((ymin - A.y) / dy, (ymax - A.y) / dy); }
  const inside = (t) => { const x = A.x + t * dx, y = A.y + t * dy; return x >= xmin - 1e-6 && x <= xmax + 1e-6 && y >= ymin - 1e-6 && y <= ymax + 1e-6; };
  const hits = ts.filter(inside).sort((p, q) => p - q);
  if (hits.length < 2) return null;
  return [{ x: A.x + hits[0] * dx, y: A.y + hits[0] * dy }, { x: A.x + hits[hits.length - 1] * dx, y: A.y + hits[hits.length - 1] * dy }];
}
function segHitsBox(a, b, box) {
  const x0 = box.x + 1, y0 = box.y + 1, x1 = box.x + box.w - 1, y1 = box.y + box.h - 1;
  if (x1 <= x0 || y1 <= y0) return false;
  for (let t = 0; t <= 1; t += 0.02) {
    const x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) return true;
  }
  return false;
}
export function layoutPointLabels(spec) {
  const g = computeAnalytic(spec), { X, Y, W, H } = g;
  const obstacles = [];
  (spec.segs || []).forEach((sg) => {
    let A = sg.a, B = sg.b;
    if (sg.kind === "line") { const c = clipToWin(A, B, spec.win); if (!c) return; [A, B] = c; }
    obstacles.push([{ x: X(A.x), y: Y(A.y) }, { x: X(B.x), y: Y(B.y) }]);
  });
  (spec.polys || []).forEach((poly) => poly.pts.forEach((p, i) => {
    const q = poly.pts[(i + 1) % poly.pts.length];
    obstacles.push([{ x: X(p.x), y: Y(p.y) }, { x: X(q.x), y: Y(q.y) }]);
  }));
  const placedBoxes = [];
  const fs = 10.5, lh = fs * 1.1;
  (spec.points || []).forEach((p) => {
    if (p.label == null || p.label === "") return;
    const px = X(p.x), py = Y(p.y), w = 0.62 * fs * String(p.label).length;
    let best = null, bestScore = -Infinity;
    for (const pl of ["above", "below", "right", "left"]) {
      let cx, cy;
      if (pl === "above") { cx = px; cy = py - 12; }
      else if (pl === "below") { cx = px; cy = py + 12; }
      else if (pl === "left") { cx = px - 9 - w / 2; cy = py - 9; }
      else { cx = px + 9 + w / 2; cy = py - 9; }
      const box = { x: cx - w / 2, y: cy - lh / 2, w, h: lh };
      let score = 0;
      if (box.x < 2 || box.y < 2 || box.x + box.w > W - 2 || box.y + box.h > H - 2) score -= 100;
      for (const [a, b] of obstacles) if (segHitsBox(a, b, box)) score -= 10;
      for (const other of placedBoxes)
        if (box.x < other.x + other.w && other.x < box.x + box.w && box.y < other.y + other.h && other.y < box.y + box.h) score -= 10;
      if (score > bestScore) { bestScore = score; best = { pl, box }; }
    }
    p.place = best.pl;
    placedBoxes.push(best.box);
  });
  return spec;
}

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
  // two points along the line at a FIXED distance from O, so the window stays
  // compact whatever the rise/run — otherwise a 7/6 slope blows the window up
  // to ±28 and the θ arc shrinks to a few pixels.
  const far = 6.5 / Math.hypot(ux, uy);
  const A = { x: ux * far, y: uy * far }, B = { x: -ux * far, y: -uy * far };
  const win = winFor([A, B, { x: 3, y: 0 }, { x: -3, y: 0 }], { pad: 1, min: 9 });
  const theta = inclination(m);
  const spec = {
    type: "analytic", accent, grid: true, win,
    segs: [{ a: A, b: B, kind: "line", id: "line" }],
    points: [{ x: 0, y: 0, dot: true }],
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
  layoutPointLabels(spec);
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
  layoutPointLabels(spec);
  const isBisector = throughMid && perpendicular;
  return { spec, M, isBisector };
}
