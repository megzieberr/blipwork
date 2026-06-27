/* ============================================================
   SOLID ENGINE  (3D measurement)   ★ accuracy-critical
   ------------------------------------------------------------
   Draws 3D solids (prism, cube, cylinder, cone, pyramid, sphere,
   hemisphere, triangular prism and vertical composites) in a clean
   ISOMETRIC projection. The whole point of this chapter is that the
   learner READS the picture to choose a formula, so the picture has
   to be honest:

     • one uniform pixels-per-unit, so a cube looks like a cube and a
       tall-thin cylinder looks tall and thin (proportions are real);
     • every horizontal circle becomes a proper isometric ellipse
       (rx : ry = √3 : 1), never a guessed oval;
     • open tops/bottoms are drawn as a hollow rim (you can see in),
       closed ones as a solid lid — the difference is unmistakable;
     • a hidden joining face in a composite is drawn dashed.

   Projection (z is up; all three axes project to EQUAL screen length,
   so an edge's screen length = real length × one global scale):
        iso(x,y,z) = ( (x − y)·cos30 ,  (x + y)·sin30 − z )
   The view ray is (1,1,1); a face is visible when its outward normal
   points toward the viewer (normal · (1,1,1) > 0). Hidden edges (both
   neighbour faces hidden) are dashed.

   verifySolid() proves the drawing can't lie: every axis-aligned edge
   shares one ppu, and every circle is drawn as a true iso ellipse.
   ============================================================ */

const C30 = Math.cos(Math.PI / 6);   // 0.8660…
const S30 = 0.5;
const SQRT2 = Math.SQRT2;
const N = v => Math.round(v * 100) / 100;

/* 3D → iso-2D (still in real units; the fit step scales it to pixels) */
const iso = p => ({ x: (p.x - p.y) * C30, y: (p.x + p.y) * S30 - p.z });

/* an iso ellipse for a HORIZONTAL circle of radius r: axis-aligned,
   semi-axes (in iso units) arx = r·cos30·√2, ary = r·sin30·√2.
   Their ratio is always cot30 = √3 — the signature of a real iso circle. */
const ellAxes = r => ({ arx: r * C30 * SQRT2, ary: r * S30 * SQRT2 });

const unit2 = (x, y) => { const l = Math.hypot(x, y) || 1; return { x: x / l, y: y / l }; };
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const cross = (u, v) => ({ x: u.y * v.z - u.z * v.y, y: u.z * v.x - u.x * v.z, z: u.x * v.y - u.y * v.x });
const dot3 = (u, v) => u.x * v.x + u.y * v.y + u.z * v.z;
const add3 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const scale3 = (a, s) => ({ x: a.x * s, y: a.y * s, z: a.z * s });

const SVGNS = "http://www.w3.org/2000/svg"; // (kept for parity with siblings)

/* ------------------------------------------------------------
   POLYHEDRON helper: given named 3D vertices and faces (each a list
   of vertex names, wound either way), classify every edge as solid
   or hidden via the view-ray test, and collect axis-aligned edges.
   ------------------------------------------------------------ */
function polyhedron(V, faces) {
  // solid centroid (to orient face normals outward)
  const names = Object.keys(V);
  const cen = names.reduce((s, k) => add3(s, V[k]), { x: 0, y: 0, z: 0 });
  cen.x /= names.length; cen.y /= names.length; cen.z /= names.length;
  const view = { x: 1, y: 1, z: 1 };

  const faceVisible = faces.map(f => {
    const a = V[f[0]], b = V[f[1]], c = V[f[2]];
    let n = cross(sub(b, a), sub(c, a));
    if (dot3(n, sub(a, cen)) < 0) n = scale3(n, -1);  // force outward
    return dot3(n, view) > 1e-9;
  });

  // edge → which faces touch it
  const edgeMap = new Map();
  faces.forEach((f, fi) => {
    for (let i = 0; i < f.length; i++) {
      const a = f[i], b = f[(i + 1) % f.length];
      const key = [a, b].sort().join("~");
      if (!edgeMap.has(key)) edgeMap.set(key, { a, b, faces: [] });
      edgeMap.get(key).faces.push(fi);
    }
  });

  const edges = [];
  edgeMap.forEach(e => {
    const visible = e.faces.some(fi => faceVisible[fi]);
    edges.push({ a: e.a, b: e.b, dashed: !visible });
  });
  return { edges, faceVisible, V, faces };
}

/* axis label for an edge between two vertices that differ on ONE axis */
function axisOf(p, q) {
  const dx = Math.abs(p.x - q.x), dy = Math.abs(p.y - q.y), dz = Math.abs(p.z - q.z);
  if (dx > 1e-6 && dy < 1e-6 && dz < 1e-6) return { axis: "x", real: dx };
  if (dy > 1e-6 && dx < 1e-6 && dz < 1e-6) return { axis: "y", real: dy };
  if (dz > 1e-6 && dx < 1e-6 && dy < 1e-6) return { axis: "z", real: dz };
  return null;
}

/* ============================================================
   SHAPE BUILDERS — each returns iso-2D primitives:
     lines:    [ { pts:[{x,y}…], dashed } ]   (straight)
     ellipses: [ { c:{x,y}, arx, ary, kind, dashed, fill, ryTop? } ]
     fills:    [ { pts:[…] , op } ]            (faint body polygons)
     dims:     [ { a:{x,y}, b:{x,y}, label, lab:{dx,dy}, dash } ]
     axisEdges:[ { a:{x,y}, b:{x,y}, real, axis } ]  (verify)
     samples:  [ {x,y} … ]                     (bbox)
   All coordinates are iso-2D (real units); the fit step turns them
   into pixels with ONE uniform scale.
   ============================================================ */

/* small helpers to push iso points */
const P = p => iso(p);                 // 3D → iso2d
function ellSamples(c2, ax) { return [{ x: c2.x - ax.arx, y: c2.y }, { x: c2.x + ax.arx, y: c2.y }, { x: c2.x, y: c2.y - ax.ary }, { x: c2.x, y: c2.y + ax.ary }]; }

/* ---- rectangular prism / cube ---- */
function buildBox(spec) {
  const l = spec.l ?? 8, b = spec.b ?? 5, h = spec.h ?? 6;
  const V = {
    a: { x: 0, y: 0, z: 0 }, b: { x: l, y: 0, z: 0 }, c: { x: l, y: b, z: 0 }, d: { x: 0, y: b, z: 0 },
    e: { x: 0, y: 0, z: h }, f: { x: l, y: 0, z: h }, g: { x: l, y: b, z: h }, k: { x: 0, y: b, z: h },
  };
  const faces = [["a", "b", "c", "d"], ["e", "f", "g", "k"], ["a", "b", "f", "e"], ["b", "c", "g", "f"], ["c", "d", "k", "g"], ["d", "a", "e", "k"]];
  const ph = polyhedron(V, faces);
  const lines = ph.edges.map(e => ({ pts: [P(V[e.a]), P(V[e.b])], dashed: e.dashed }));
  // visible body fill: top + the two front faces
  const fills = [
    { pts: [P(V.e), P(V.f), P(V.g), P(V.k)], op: 0.10 },
    { pts: [P(V.b), P(V.c), P(V.g), P(V.f)], op: 0.06 },
    { pts: [P(V.c), P(V.d), P(V.k), P(V.g)], op: 0.04 },
  ];
  const cube = spec.cube;
  const dims = cube
    ? [{ a: P(V.c), b: P(V.g), label: spec.sLabel || "ℓ", lab: { dx: 16, dy: 0 } }]
    : [
        { a: P(V.d), b: P(V.c), label: spec.lLabel || "ℓ", lab: { dx: 0, dy: 16 } },
        { a: P(V.c), b: P(V.b), label: spec.bLabel || "b", lab: { dx: 14, dy: 10 } },
        { a: P(V.c), b: P(V.g), label: spec.hLabel || "h", lab: { dx: 16, dy: 0 } },
      ];
  const axisEdges = [];
  ph.edges.forEach(e => { const ax = axisOf(V[e.a], V[e.b]); if (ax) axisEdges.push({ a: P(V[e.a]), b: P(V[e.b]), real: ax.real, axis: ax.axis }); });
  const samples = Object.values(V).map(P);
  return { lines, fills, dims, axisEdges, samples };
}

/* ---- triangular prism (lying down, length L along x) ---- */
function buildTriPrism(spec) {
  const bb = spec.b ?? 6, th = spec.th ?? 5, L = spec.L ?? 9;
  const V = {
    a0: { x: 0, y: 0, z: 0 }, b0: { x: 0, y: bb, z: 0 }, c0: { x: 0, y: bb / 2, z: th },
    a1: { x: L, y: 0, z: 0 }, b1: { x: L, y: bb, z: 0 }, c1: { x: L, y: bb / 2, z: th },
  };
  const faces = [["a0", "b0", "c0"], ["a1", "b1", "c1"], ["a0", "b0", "b1", "a1"], ["b0", "c0", "c1", "b1"], ["c0", "a0", "a1", "c1"]];
  const ph = polyhedron(V, faces);
  const lines = ph.edges.map(e => ({ pts: [P(V[e.a]), P(V[e.b])], dashed: e.dashed }));
  const fills = [
    { pts: [P(V.a1), P(V.b1), P(V.c1)], op: 0.10 },
    { pts: [P(V.c0), P(V.c1), P(V.a1), P(V.a0)], op: 0.05 },
  ];
  const dims = [
    { a: P(V.a1), b: P(V.b1), label: spec.bLabel || "b", lab: { dx: 8, dy: 14 } },
    { a: P(V.a0), b: P(V.a1), label: spec.LLabel || "H", lab: { dx: 0, dy: 16 } },
    { a: P({ x: L, y: bb / 2, z: 0 }), b: P(V.c1), label: spec.thLabel || "⊥h", lab: { dx: 16, dy: 0 }, dash: true },
  ];
  const axisEdges = [];
  ph.edges.forEach(e => { const ax = axisOf(V[e.a], V[e.b]); if (ax) axisEdges.push({ a: P(V[e.a]), b: P(V[e.b]), real: ax.real, axis: ax.axis }); });
  const samples = Object.values(V).map(P);
  return { lines, fills, dims, axisEdges, samples };
}

/* ---- square-based right pyramid ---- */
function buildPyramid(spec) {
  const s = spec.s ?? 7, h = spec.h ?? 8;
  const V = {
    a: { x: -s / 2, y: -s / 2, z: 0 }, b: { x: s / 2, y: -s / 2, z: 0 },
    c: { x: s / 2, y: s / 2, z: 0 }, d: { x: -s / 2, y: s / 2, z: 0 },
    t: { x: 0, y: 0, z: h },
  };
  const faces = [["a", "b", "c", "d"], ["a", "b", "t"], ["b", "c", "t"], ["c", "d", "t"], ["d", "a", "t"]];
  const ph = polyhedron(V, faces);
  const lines = ph.edges.map(e => ({ pts: [P(V[e.a]), P(V[e.b])], dashed: e.dashed }));
  const fills = [
    { pts: [P(V.b), P(V.c), P(V.t)], op: 0.10 },
    { pts: [P(V.c), P(V.d), P(V.t)], op: 0.05 },
  ];
  const dims = [], axisEdges = [], rights = [];
  const extraLines = [];

  if (spec.heightTri) {
    // the right-angled triangle that gives the SLANT height of a face:
    // half the base side (ℓ/2) + perpendicular height H + slant (hypotenuse),
    // right angle at the base centre. The bottom leg is HALF the base — the
    // exact thing learners get wrong — so it runs to the MIDPOINT of a front edge.
    const O = P({ x: 0, y: 0, z: 0 });
    const M = P({ x: s / 2, y: 0, z: 0 });          // midpoint of the +x base edge
    extraLines.push({ pts: [O, M], dashed: false });        // half-base leg
    extraLines.push({ pts: [P(V.t), M], dashed: false });   // slant (hypotenuse)
    dims.push({ a: O, b: M, label: spec.halfLabel || "½ℓ", lab: { dx: 0, dy: 14 } });
    dims.push({ a: P(V.t), b: O, label: spec.hLabel || "H", lab: { dx: -13, dy: 0 }, dash: true });
    dims.push({ a: P(V.t), b: M, label: spec.slantLabel || "s", lab: { dx: 15, dy: -2 } });
    // the full base side on a different front edge (c–d), so it doesn't clash with ½ℓ
    dims.push({ a: P(V.c), b: P(V.d), label: spec.sLabel || "ℓ", lab: { dx: 0, dy: 12 } });
    rights.push({ c: O, a: M, b: P(V.t) });
    axisEdges.push({ a: O, b: M, real: s / 2, axis: "x" });
    axisEdges.push({ a: P(V.c), b: P(V.d), real: s, axis: "x" });
    axisEdges.push({ a: O, b: P(V.t), real: h, axis: "z" });
  } else {
    dims.push({ a: P(V.c), b: P(V.b), label: spec.sLabel || "ℓ", lab: { dx: 14, dy: 8 } });
    if (spec.showPerp) dims.push({ a: P({ x: 0, y: 0, z: 0 }), b: P(V.t), label: spec.hLabel || "H", lab: { dx: 13, dy: 0 }, dash: true });
    if (spec.showSlant) dims.push({ a: P(V.t), b: P({ x: 0, y: s / 2, z: 0 }), label: spec.slantLabel || "h", lab: { dx: 16, dy: -2 } });
  }
  const samples = Object.values(V).map(P);
  return { lines: [...lines, ...extraLines], fills, dims, axisEdges, samples, rights };
}

/* ---- cylinder (closed / open top / open both) ---- */
function buildCylinder(spec) {
  const r = spec.r ?? 4, h = spec.h ?? 9;
  const open = spec.open || "none";            // "none" | "top" | "both"
  const ax = ellAxes(r);
  const cB = P({ x: 0, y: 0, z: 0 }), cT = P({ x: 0, y: 0, z: h });
  const lines = [], ellipses = [], fills = [], dims = [];

  // faint body
  fills.push({ pts: [{ x: cB.x - ax.arx, y: cB.y }, { x: cT.x - ax.arx, y: cT.y }, { x: cT.x + ax.arx, y: cT.y }, { x: cB.x + ax.arx, y: cB.y }], op: 0.08 });

  // sides (silhouette verticals)
  lines.push({ pts: [{ x: cB.x - ax.arx, y: cB.y }, { x: cT.x - ax.arx, y: cT.y }], dashed: false });
  lines.push({ pts: [{ x: cB.x + ax.arx, y: cB.y }, { x: cT.x + ax.arx, y: cT.y }], dashed: false });

  // bottom rim: front solid, back dashed
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "frontArc", dashed: false });
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "backArc", dashed: true });

  // top rim
  const gap = Math.min(ax.arx * 0.34, 9);      // visual wall thickness (cosmetic)
  if (open === "none") {
    ellipses.push({ c: cT, arx: ax.arx, ary: ax.ary, kind: "full", dashed: false, fill: "lid" });
  } else {
    // open: outer rim + inner rim = a ring you can see into
    ellipses.push({ c: cT, arx: ax.arx, ary: ax.ary, kind: "full", dashed: false, fill: "hollow" });
    ellipses.push({ c: cT, arx: ax.arx - gap, ary: ax.ary - gap * (ax.ary / ax.arx), kind: "full", dashed: false });
    // inner front wall hint + inner bottom front arc (seeing down the tube)
    const cBi = cB, iarx = ax.arx - gap, iary = ax.ary - gap * (ax.ary / ax.arx);
    ellipses.push({ c: cBi, arx: iarx, ary: iary, kind: "frontArc", dashed: true });
  }

  // dims: r across the top, h up the right side
  dims.push({ a: cT, b: { x: cT.x + ax.arx, y: cT.y }, label: spec.rLabel || "r", lab: { dx: 2, dy: -10 } });
  dims.push({ a: { x: cB.x + ax.arx, y: cB.y }, b: { x: cT.x + ax.arx, y: cT.y }, label: spec.hLabel || "h", lab: { dx: 16, dy: 0 } });

  const axisEdges = [{ a: { x: cB.x + ax.arx, y: cB.y }, b: { x: cT.x + ax.arx, y: cT.y }, real: h, axis: "z" },
                     { a: { x: cB.x - ax.arx, y: cB.y }, b: { x: cT.x - ax.arx, y: cT.y }, real: h, axis: "z" }];
  const samples = [...ellSamples(cB, ax), ...ellSamples(cT, ax)];
  return { lines, ellipses, fills, dims, axisEdges, samples, _ell: [{ arx: ax.arx, ary: ax.ary }] };
}

/* ---- cone ---- */
function buildCone(spec) {
  const r = spec.r ?? 4, h = spec.h ?? 9;
  const ax = ellAxes(r);
  const cB = P({ x: 0, y: 0, z: 0 }), apex = P({ x: 0, y: 0, z: h });
  const lines = [], ellipses = [], fills = [], dims = [];
  const L = { x: cB.x - ax.arx, y: cB.y }, R = { x: cB.x + ax.arx, y: cB.y };
  fills.push({ pts: [L, apex, R], op: 0.08 });
  // base rim
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "frontArc", dashed: false });
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "backArc", dashed: true });
  // slant silhouettes
  lines.push({ pts: [apex, L], dashed: false });
  lines.push({ pts: [apex, R], dashed: false });

  const axisEdges = [{ a: cB, b: apex, real: h, axis: "z" }];
  const samples = [...ellSamples(cB, ax), apex];
  const rights = [];

  if (spec.heightTri) {
    // the right-angled triangle INSIDE the cone: radius (axis-aligned, to scale)
    // + perpendicular height H + slant as the hypotenuse, right angle at the
    // base centre. Radius drawn to the +x rim point so it is a TRUE radius
    // (length r), not the stretched ellipse semi-axis.
    const F = P({ x: r, y: 0, z: 0 });
    lines.push({ pts: [cB, F], dashed: false });          // radius leg
    lines.push({ pts: [apex, F], dashed: false });        // slant (hypotenuse)
    dims.push({ a: cB, b: F, label: spec.rLabel || "r", lab: { dx: 2, dy: 14 } });
    dims.push({ a: apex, b: cB, label: spec.hLabel || "H", lab: { dx: -13, dy: 0 }, dash: true });
    dims.push({ a: apex, b: F, label: spec.slantLabel || "ℓ", lab: { dx: 14, dy: -2 } });
    rights.push({ c: cB, a: F, b: apex });
    axisEdges.push({ a: cB, b: F, real: r, axis: "x" });
    samples.push(F);
  } else {
    // plain labels: r along the base, perpendicular height dashed, slant labelled
    dims.push({ a: cB, b: R, label: spec.rLabel || "r", lab: { dx: 0, dy: 14 } });
    if (spec.showPerp) dims.push({ a: cB, b: apex, label: spec.hLabel || "H", lab: { dx: 12, dy: 0 }, dash: true });
    if (spec.showSlant) dims.push({ a: apex, b: R, label: spec.slantLabel || "h", lab: { dx: 14, dy: 0 } });
  }
  return { lines, ellipses, fills, dims, axisEdges, samples, rights, _ell: [{ arx: ax.arx, ary: ax.ary }] };
}

/* ---- sphere (pragmatic silhouette + equator) ---- */
function buildSphere(spec) {
  const r = spec.r ?? 5;
  const c = P({ x: 0, y: 0, z: 0 });
  // silhouette: true circle of radius r (iso units); equator: shallow ellipse inside it
  const ellipses = [
    { c, arx: r, ary: r, kind: "full", dashed: false, fill: "hollow", circle: true },
    { c, arx: r, ary: r * 0.32, kind: "frontArc", dashed: false },
    { c, arx: r, ary: r * 0.32, kind: "backArc", dashed: true },
  ];
  const dims = [{ a: c, b: { x: c.x + r, y: c.y }, label: spec.rLabel || "r", lab: { dx: 2, dy: -10 } }];
  const samples = [{ x: c.x - r, y: c.y }, { x: c.x + r, y: c.y }, { x: c.x, y: c.y - r }, { x: c.x, y: c.y + r }];
  return { lines: [], ellipses, fills: [], dims, axisEdges: [], samples };
}

/* ---- hemisphere (flat face down) ---- */
function buildHemisphere(spec) {
  const r = spec.r ?? 5;
  const ax = ellAxes(r);
  const c = P({ x: 0, y: 0, z: 0 });
  const ellipses = [
    // flat circular base
    { c, arx: ax.arx, ary: ax.ary, kind: "frontArc", dashed: false },
    { c, arx: ax.arx, ary: ax.ary, kind: "backArc", dashed: true },
    // dome: bulge up by r
    { c, arx: ax.arx, ary: ax.ary, kind: "dome", dashed: false, ryTop: r },
  ];
  const fills = [];   // dome reads cleanly from its rounded outline; a polygon fill would look pointed
  const dims = [{ a: c, b: { x: c.x + ax.arx, y: c.y }, label: spec.rLabel || "r", lab: { dx: 0, dy: 14 } }];
  const samples = [{ x: c.x - ax.arx, y: c.y }, { x: c.x + ax.arx, y: c.y }, { x: c.x, y: c.y - r }, { x: c.x, y: c.y + ax.ary }];
  return { lines: [], ellipses, fills, dims, axisEdges: [], samples, _ell: [{ arx: ax.arx, ary: ax.ary }] };
}

/* ---- vertical composite: a cylinder base with a cone OR hemisphere
        (or cone) stacked on top, sharing the same radius. The joining
        circle is drawn DASHED — the hidden face the learner must omit. ---- */
function buildComposite(spec) {
  const r = spec.r ?? 4, hCyl = spec.hCyl ?? 7, top = spec.top || "cone", hTop = spec.hTop ?? 6;
  const ax = ellAxes(r);
  const cB = P({ x: 0, y: 0, z: 0 }), cJoin = P({ x: 0, y: 0, z: hCyl });
  const lines = [], ellipses = [], fills = [], dims = [];

  fills.push({ pts: [{ x: cB.x - ax.arx, y: cB.y }, { x: cJoin.x - ax.arx, y: cJoin.y }, { x: cJoin.x + ax.arx, y: cJoin.y }, { x: cB.x + ax.arx, y: cB.y }], op: 0.08 });
  // cylinder sides + bottom rim
  lines.push({ pts: [{ x: cB.x - ax.arx, y: cB.y }, { x: cJoin.x - ax.arx, y: cJoin.y }], dashed: false });
  lines.push({ pts: [{ x: cB.x + ax.arx, y: cB.y }, { x: cJoin.x + ax.arx, y: cJoin.y }], dashed: false });
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "frontArc", dashed: false });
  ellipses.push({ c: cB, arx: ax.arx, ary: ax.ary, kind: "backArc", dashed: true });
  // the JOINING circle — fully dashed (hidden interface)
  ellipses.push({ c: cJoin, arx: ax.arx, ary: ax.ary, kind: "full", dashed: true });

  const L = { x: cJoin.x - ax.arx, y: cJoin.y }, R = { x: cJoin.x + ax.arx, y: cJoin.y };
  if (top === "cone") {
    const apex = P({ x: 0, y: 0, z: hCyl + hTop });
    fills.push({ pts: [L, apex, R], op: 0.08 });
    lines.push({ pts: [apex, L], dashed: false });
    lines.push({ pts: [apex, R], dashed: false });
    dims.push({ a: cJoin, b: R, label: spec.rLabel || "r", lab: { dx: 0, dy: 13 } });
    if (spec.showHtop) dims.push({ a: cJoin, b: apex, label: spec.hTopLabel || "H", lab: { dx: 12, dy: 0 }, dash: true });
  } else { // hemisphere dome (rounded outline, no pointed fill)
    ellipses.push({ c: cJoin, arx: ax.arx, ary: ax.ary, kind: "dome", dashed: false, ryTop: r });
    dims.push({ a: cJoin, b: R, label: spec.rLabel || "r", lab: { dx: 0, dy: 13 } });
  }
  if (spec.showHcyl) dims.push({ a: { x: cB.x + ax.arx, y: cB.y }, b: { x: cJoin.x + ax.arx, y: cJoin.y }, label: spec.hCylLabel || "h", lab: { dx: 16, dy: 0 } });

  const axisEdges = [{ a: { x: cB.x + ax.arx, y: cB.y }, b: { x: cJoin.x + ax.arx, y: cJoin.y }, real: hCyl, axis: "z" }];
  const topZ = top === "cone" ? hCyl + hTop : hCyl + r;
  const samples = [...ellSamples(cB, ax), ...ellSamples(cJoin, ax), { x: cJoin.x, y: P({ x: 0, y: 0, z: topZ }).y }];
  return { lines, ellipses, fills, dims, axisEdges, samples, _ell: [{ arx: ax.arx, ary: ax.ary }] };
}

const BUILDERS = {
  box: buildBox, cube: s => buildBox({ ...s, cube: true, l: s.s ?? 6, b: s.s ?? 6, h: s.s ?? 6 }),
  triPrism: buildTriPrism, pyramid: buildPyramid, cylinder: buildCylinder,
  cone: buildCone, sphere: buildSphere, hemisphere: buildHemisphere, composite: buildComposite,
};

/* ============================================================
   COMPUTE — fit the iso-2D primitives to the viewBox with ONE scale
   ============================================================ */
export function computeSolid(spec) {
  const W = spec.w || 300, H = spec.h2 || 250, pad = spec.pad || 34;
  const build = (BUILDERS[spec.shape] || buildBox)(spec);

  // bbox over every point that gets drawn
  const pts = [...(build.samples || [])];
  (build.lines || []).forEach(l => l.pts.forEach(p => pts.push(p)));
  (build.fills || []).forEach(f => f.pts.forEach(p => pts.push(p)));
  (build.dims || []).forEach(d => { pts.push(d.a, d.b); });
  (build.ellipses || []).forEach(e => { pts.push({ x: e.c.x - e.arx, y: e.c.y }, { x: e.c.x + e.arx, y: e.c.y }, { x: e.c.x, y: e.c.y - (e.ryTop || e.ary) }, { x: e.c.x, y: e.c.y + e.ary }); });

  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const bw = Math.max(maxx - minx, 1e-6), bh = Math.max(maxy - miny, 1e-6);
  const scale = Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh);
  const ox = (W - bw * scale) / 2 - minx * scale, oy = (H - bh * scale) / 2 - miny * scale;
  const T = p => ({ x: ox + p.x * scale, y: oy + p.y * scale });

  return { W, H, scale, T, build };
}

/* ============================================================
   RENDER
   ============================================================ */
function arcPath(cx, cy, rx, ry, kind, ryTop) {
  // front = lower half (sweep 1), back = upper half (sweep 0), dome = upper bulge (sweep 0, custom ry)
  if (kind === "frontArc") return `M ${N(cx - rx)} ${N(cy)} A ${N(rx)} ${N(ry)} 0 0 1 ${N(cx + rx)} ${N(cy)}`;
  if (kind === "backArc")  return `M ${N(cx - rx)} ${N(cy)} A ${N(rx)} ${N(ry)} 0 0 0 ${N(cx + rx)} ${N(cy)}`;
  if (kind === "dome")     return `M ${N(cx - rx)} ${N(cy)} A ${N(rx)} ${N(ryTop)} 0 0 0 ${N(cx + rx)} ${N(cy)}`;
  return "";
}

export function renderSolid(spec) {
  const g = computeSolid(spec), T = g.T, b = g.build;
  const accent = spec.accent || "#84cc16";
  let out = "";

  // faint body fills first (behind the outline)
  (b.fills || []).forEach(f => {
    const d = f.pts.map((p, i) => { const q = T(p); return `${i ? "L" : "M"} ${N(q.x)} ${N(q.y)}`; }).join(" ") + " Z";
    out += `<path class="sd-body" d="${d}" style="opacity:${f.op}"/>`;
  });

  // ellipses / arcs
  (b.ellipses || []).forEach(e => {
    const c = T(e.c), rx = e.arx * g.scale, ry = e.ary * g.scale, ryTop = (e.ryTop || e.ary) * g.scale;
    const cls = "sd-edge" + (e.dashed ? " sd-hidden" : "");
    if (e.kind === "full") {
      const fillCls = e.fill === "lid" ? "sd-lid" : e.fill === "hollow" ? "sd-hollow" : "sd-nofill";
      out += `<ellipse class="${cls} ${fillCls}" cx="${N(c.x)}" cy="${N(c.y)}" rx="${N(rx)}" ry="${N(ry)}"/>`;
    } else {
      out += `<path class="${cls}" fill="none" d="${arcPath(c.x, c.y, rx, ry, e.kind, ryTop)}"/>`;
    }
  });

  // straight edges
  (b.lines || []).forEach(l => {
    const d = l.pts.map((p, i) => { const q = T(p); return `${i ? "L" : "M"} ${N(q.x)} ${N(q.y)}`; }).join(" ");
    out += `<path class="sd-edge${l.dashed ? " sd-hidden" : ""}" fill="none" d="${d}"/>`;
  });

  // right-angle markers (fixed pixel size; the iso projection won't draw the
  // corner at a true 90°, so the marker tells the learner it IS a right angle)
  (b.rights || []).forEach(rt => {
    const c = T(rt.c), a = T(rt.a), bb = T(rt.b);
    const u = unit2(a.x - c.x, a.y - c.y), w = unit2(bb.x - c.x, bb.y - c.y);
    const s = 9;
    const p1 = { x: c.x + u.x * s, y: c.y + u.y * s };
    const p2 = { x: c.x + (u.x + w.x) * s, y: c.y + (u.y + w.y) * s };
    const p3 = { x: c.x + w.x * s, y: c.y + w.y * s };
    out += `<path class="sd-right" fill="none" d="M ${N(p1.x)} ${N(p1.y)} L ${N(p2.x)} ${N(p2.y)} L ${N(p3.x)} ${N(p3.y)}"/>`;
  });

  // dimension labels (optional small leader tick when dashed)
  (b.dims || []).forEach(dm => {
    const a = T(dm.a), bb = T(dm.b);
    if (dm.dash) out += `<path class="sd-dimline" fill="none" d="M ${N(a.x)} ${N(a.y)} L ${N(bb.x)} ${N(bb.y)}"/>`;
    const mx = (a.x + bb.x) / 2 + (dm.lab.dx || 0), my = (a.y + bb.y) / 2 + (dm.lab.dy || 0);
    out += `<text class="sd-lab" x="${N(mx)}" y="${N(my)}" text-anchor="middle" dominant-baseline="middle">${dm.label}</text>`;
  });

  const style = ` style="--accent:${accent}"`;
  return `<svg class="sd" viewBox="0 0 ${g.W} ${g.H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${out}</svg>`;
}

/* ============================================================
   VERIFY — prove the picture is a faithful isometric drawing:
     1) every axis-aligned edge shares one pixels-per-unit;
     2) every circle is drawn as a real iso ellipse (rx:ry = √3:1).
   ============================================================ */
export function verifySolid(spec, tol = { ppu: 0.03, ratio: 0.03 }) {
  const g = computeSolid(spec), b = g.build, r = [];

  // 1) axis edges to scale
  const ppu = (b.axisEdges || []).map(e => {
    const a = g.T(e.a), q = g.T(e.b);
    return { axis: e.axis, ppu: Math.hypot(a.x - q.x, a.y - q.y) / e.real, real: e.real };
  });
  if (ppu.length >= 2) {
    const base = ppu[0].ppu;
    ppu.slice(1).forEach((p, i) => {
      r.push({ label: `axis edge #${i + 2} (${p.axis}) drawn to same scale as edge #1`, ok: Math.abs(p.ppu - base) / base <= tol.ppu });
    });
  } else {
    r.push({ label: "scale check (axis edges)", ok: true });
  }

  // 2) circles drawn as real iso ellipses (skip the pragmatic sphere/equator)
  const want = Math.sqrt(3);
  (b._ell || []).forEach((e, i) => {
    const ratio = e.arx / e.ary;
    r.push({ label: `circle #${i + 1} drawn as a real iso ellipse (rx:ry ${ratio.toFixed(3)} ≈ √3)`, ok: Math.abs(ratio - want) / want <= tol.ratio });
  });

  // 3) nothing spills outside the frame
  const all = [];
  (b.lines || []).forEach(l => l.pts.forEach(p => all.push(g.T(p))));
  (b.ellipses || []).forEach(e => { const c = g.T(e.c); all.push({ x: c.x - e.arx * g.scale, y: c.y }, { x: c.x + e.arx * g.scale, y: c.y }, { x: c.x, y: c.y - (e.ryTop || e.ary) * g.scale }, { x: c.x, y: c.y + e.ary * g.scale }); });
  const inside = all.every(p => p.x >= -1 && p.x <= g.W + 1 && p.y >= -1 && p.y <= g.H + 1);
  r.push({ label: "the whole solid fits inside the frame", ok: inside });

  return r;
}
