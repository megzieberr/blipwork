/* ============================================================
   ANALYTICAL-GEOMETRY ENGINE  (Chapter 4)   ★ accuracy-critical
   ------------------------------------------------------------
   Draws points, line segments, full lines, triangles and the
   special lines (median / altitude / perpendicular bisector) on a
   Cartesian plane, GENUINELY TO SCALE. Unlike the function-graph
   engine (which uses independent sx, sy), this one uses ONE
   UNIFORM scale so a right angle LOOKS like a right angle and the
   angle-of-inclination arc matches the real slope of the line.

     px = ox + (x − xmin)·s        py = H − (oy + (y − ymin)·s)

   Because a single scale maps real units → pixels, verify() can
   prove the picture can't lie:
     • every NUMERIC length label shares the same pixels-per-unit,
     • every plotted point sits at its real coordinate,
     • any segment flagged ⊥ really is perpendicular,
     • an angle-of-inclination arc spans the line's true slope, and
     • a right-angle marker sits on a genuine 90° corner.

   spec: {
     type:"analytic",
     win:{ xmin, xmax, ymin, ymax },
     grid?:true,
     points?:[ { x, y, label?, id?, dot?, place? } ],
     segs?:[ { a:{x,y}, b:{x,y}, id?, kind?:"segment"|"line", dash?, tone?, label?, perp? } ],
     polys?:[ { pts:[{x,y}…], fill?, tone? } ],
     ticks?:[ { a:{x,y}, b:{x,y}, n? } ],            // equal-length tick marks
     rights?:[ { at:{x,y}, to1:{x,y}, to2:{x,y} } ], // right-angle square
     arcs?:[ { at:{x,y}, from:{x,y}, to:{x,y}, label?, expect?, r? } ], // angle arc (θ)
     w?, h?, accent?,
     tap?:{ mode:"point"|"seg", targets:[id], correctId }
   }
   ============================================================ */

const N = (v) => Math.round(v * 100) / 100;
const TONES = { a: "var(--fg-a)", b: "var(--fg-b)", c: "var(--fg-c)" };

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg ag ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const text = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

const sub = (Pt, Q) => ({ x: Pt.x - Q.x, y: Pt.y - Q.y });
const len = (v) => Math.hypot(v.x, v.y) || 1;
const unit = (v) => { const l = len(v); return { x: v.x / l, y: v.y / l }; };
const mid = (A, B) => ({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 });
function numOf(label) {
  if (label == null) return null;
  const s = String(label).replace("°", "").replace(",", ".").replace("−", "-").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/* window → ONE uniform scale + helpers */
export function computeAnalytic(spec) {
  const W = spec.w || 360, H = spec.h || 300, pad = 18;
  const { xmin, xmax, ymin, ymax } = spec.win;
  const s = Math.min((W - 2 * pad) / (xmax - xmin), (H - 2 * pad) / (ymax - ymin));
  const usedW = (xmax - xmin) * s, usedH = (ymax - ymin) * s;
  const ox = (W - usedW) / 2, oy = (H - usedH) / 2;
  const X = (x) => ox + (x - xmin) * s;
  const Y = (y) => H - (oy + (y - ymin) * s);
  return { W, H, s, ox, oy, X, Y, win: spec.win };
}

/* clip an infinite line through A,B to the window rectangle → two edge points */
function clipLine(A, B, win) {
  const { xmin, xmax, ymin, ymax } = win;
  const dx = B.x - A.x, dy = B.y - A.y;
  const ts = [];
  // parametrise P = A + t·d, find where it meets each border, keep those inside
  if (dx !== 0) { ts.push((xmin - A.x) / dx); ts.push((xmax - A.x) / dx); }
  if (dy !== 0) { ts.push((ymin - A.y) / dy); ts.push((ymax - A.y) / dy); }
  const inside = (t) => { const x = A.x + t * dx, y = A.y + t * dy; return x >= xmin - 1e-6 && x <= xmax + 1e-6 && y >= ymin - 1e-6 && y <= ymax + 1e-6; };
  const hits = ts.filter(inside).sort((p, q) => p - q);
  if (hits.length < 2) return null;
  const t0 = hits[0], t1 = hits[hits.length - 1];
  return [{ x: A.x + t0 * dx, y: A.y + t0 * dy }, { x: A.x + t1 * dx, y: A.y + t1 * dy }];
}

export function renderAnalytic(spec) {
  const g = computeAnalytic(spec), { W, H, X, Y, win } = g;
  const { xmin, xmax, ymin, ymax } = win;
  let out = "";

  // ---- light integer grid ----
  if (spec.grid) {
    let gl = "";
    for (let x = Math.ceil(xmin); x <= xmax; x++) gl += `<line class="ag-grid" x1="${N(X(x))}" y1="${N(Y(ymin))}" x2="${N(X(x))}" y2="${N(Y(ymax))}"/>`;
    for (let y = Math.ceil(ymin); y <= ymax; y++) gl += `<line class="ag-grid" x1="${N(X(xmin))}" y1="${N(Y(y))}" x2="${N(X(xmax))}" y2="${N(Y(y))}"/>`;
    out += gl;
  }

  // ---- axes with arrowheads + O ----
  const x0 = X(0), y0 = Y(0);
  const showY = xmin <= 0 && xmax >= 0, showX = ymin <= 0 && ymax >= 0;
  if (showX) {
    out += `<line class="ag-axis" x1="${N(X(xmin))}" y1="${N(y0)}" x2="${N(X(xmax))}" y2="${N(y0)}"/>`;
    out += `<path class="ag-arrow" d="M ${N(X(xmax))} ${N(y0)} l -7 -3.5 l 0 7 z"/>`;
    out += `<path class="ag-arrow" d="M ${N(X(xmin))} ${N(y0)} l 7 -3.5 l 0 7 z"/>`;
    out += text(X(xmax) - 4, y0 - 9, "x", "ag-axlab");
  }
  if (showY) {
    out += `<line class="ag-axis" x1="${N(x0)}" y1="${N(Y(ymin))}" x2="${N(x0)}" y2="${N(Y(ymax))}"/>`;
    out += `<path class="ag-arrow" d="M ${N(x0)} ${N(Y(ymax))} l -3.5 7 l 7 0 z"/>`;
    out += `<path class="ag-arrow" d="M ${N(x0)} ${N(Y(ymin))} l -3.5 -7 l 7 0 z"/>`;
    out += text(x0 + 9, Y(ymax) + 4, "y", "ag-axlab");
  }
  if (showX && showY) out += text(x0 - 9, y0 + 11, "O", "ag-axlab");

  // ---- filled polygons (triangle / quad outline) ----
  (spec.polys || []).forEach((poly) => {
    const d = poly.pts.map((p, i) => `${i ? "L" : "M"} ${N(X(p.x))} ${N(Y(p.y))}`).join(" ") + " Z";
    const fill = poly.fill ? `color-mix(in srgb, var(--accent) 12%, transparent)` : "rgba(255,255,255,.02)";
    out += `<path class="ag-poly" d="${d}" fill="${fill}"/>`;
  });

  // ---- segments / full lines ----
  (spec.segs || []).forEach((sg) => {
    let A = sg.a, B = sg.b, arrow = false;
    if (sg.kind === "line") { const c = clipLine(A, B, win); if (c) { A = c[0]; B = c[1]; arrow = true; } }
    const ax = X(A.x), ay = Y(A.y), bx = X(B.x), by = Y(B.y);
    const stroke = sg.tone ? TONES[sg.tone] : "var(--accent)";
    out += `<line class="ag-seg${sg.dash ? " dash" : ""}" x1="${N(ax)}" y1="${N(ay)}" x2="${N(bx)}" y2="${N(by)}" style="stroke:${stroke}"/>`;
    if (arrow) {
      const u = unit({ x: bx - ax, y: by - ay });
      out += `<path class="ag-arrow" d="M ${N(bx)} ${N(by)} l ${N(-u.x * 8 - u.y * 4)} ${N(-u.y * 8 + u.x * 4)} l ${N(u.y * 8)} ${N(-u.x * 8)} z" style="fill:${stroke}"/>`;
      out += `<path class="ag-arrow" d="M ${N(ax)} ${N(ay)} l ${N(u.x * 8 - u.y * 4)} ${N(u.y * 8 + u.x * 4)} l ${N(u.y * 8)} ${N(-u.x * 8)} z" style="fill:${stroke}"/>`;
    }
    if (sg.label != null) {
      const m = { x: (ax + bx) / 2, y: (ay + by) / 2 };
      const nrm = unit({ x: -(by - ay), y: bx - ax });
      out += text(m.x + nrm.x * 13, m.y + nrm.y * 13, sg.label, "ag-slab");
    }
  });

  // ---- equal-length tick marks (e.g. the two halves a midpoint makes) ----
  (spec.ticks || []).forEach((t) => {
    const A = { x: X(t.a.x), y: Y(t.a.y) }, B = { x: X(t.b.x), y: Y(t.b.y) }, m = mid(A, B);
    const dir = unit(sub(B, A)), nrm = { x: -dir.y, y: dir.x };
    const k = t.n || 1, gap = 4;
    for (let i = 0; i < k; i++) {
      const off = (i - (k - 1) / 2) * gap;
      const c = { x: m.x + dir.x * off, y: m.y + dir.y * off };
      out += `<line class="ag-tick" x1="${N(c.x - nrm.x * 5)}" y1="${N(c.y - nrm.y * 5)}" x2="${N(c.x + nrm.x * 5)}" y2="${N(c.y + nrm.y * 5)}"/>`;
    }
  });

  // ---- right-angle squares ----
  (spec.rights || []).forEach((rt) => {
    const V = { x: X(rt.at.x), y: Y(rt.at.y) };
    const u = unit(sub({ x: X(rt.to1.x), y: Y(rt.to1.y) }, V));
    const w = unit(sub({ x: X(rt.to2.x), y: Y(rt.to2.y) }, V));
    const s = 11;
    const c1 = { x: V.x + u.x * s, y: V.y + u.y * s };
    const c2 = { x: V.x + (u.x + w.x) * s, y: V.y + (u.y + w.y) * s };
    const c3 = { x: V.x + w.x * s, y: V.y + w.y * s };
    out += `<path class="ag-right" d="M ${N(c1.x)} ${N(c1.y)} L ${N(c2.x)} ${N(c2.y)} L ${N(c3.x)} ${N(c3.y)}" fill="none"/>`;
  });

  // ---- angle arcs (angle of inclination θ, drawn to the real slope) ----
  (spec.arcs || []).forEach((a) => {
    const Vx = a.at.x, Vy = a.at.y;
    const aFrom = Math.atan2(a.from.y - Vy, a.from.x - Vx);   // maths-space angles
    const aTo = Math.atan2(a.to.y - Vy, a.to.x - Vx);
    let span = aTo - aFrom; while (span < 0) span += 2 * Math.PI; while (span > 2 * Math.PI) span -= 2 * Math.PI;
    const rUnits = a.r != null ? a.r : 1.2;                   // arc radius in maths units
    const STEPS = 36;
    let d = "";
    for (let i = 0; i <= STEPS; i++) {
      const ang = aFrom + span * (i / STEPS);
      const px = X(Vx + Math.cos(ang) * rUnits), py = Y(Vy + Math.sin(ang) * rUnits);
      d += `${i ? "L" : "M"} ${N(px)} ${N(py)} `;
    }
    out += `<path class="ag-arc" d="${d.trim()}" fill="none"/>`;
    if (a.label != null) {
      const ang = aFrom + span / 2;
      const lx = X(Vx + Math.cos(ang) * (rUnits + 0.85)), ly = Y(Vy + Math.sin(ang) * (rUnits + 0.85));
      out += text(lx, ly, a.label, "ag-ang");
    }
  });

  // ---- plotted points + their coordinate labels ----
  (spec.points || []).forEach((p) => {
    const px = X(p.x), py = Y(p.y);
    if (p.dot !== false) out += `<circle class="ag-dot" cx="${N(px)}" cy="${N(py)}" r="3"/>`;
    if (p.label != null) {
      const pl = p.place || "auto";
      let dx = 9, dy = -9, anchor = "start";
      if (pl === "left") { dx = -9; anchor = "end"; }
      else if (pl === "right") { dx = 9; anchor = "start"; }
      else if (pl === "below") { dy = 12; dx = 0; anchor = "middle"; }
      else if (pl === "above") { dy = -12; dx = 0; anchor = "middle"; }
      else { // auto: push away from the origin so the label sits outside the figure
        dx = p.x >= 0 ? 8 : -8; anchor = p.x >= 0 ? "start" : "end"; dy = p.y >= 0 ? -9 : 12;
      }
      out += text(px + dx, py + dy, p.label, "ag-plab", anchor);
    }
  });

  return svgWrap(W, H, spec.accent, out, spec.tap ? "ag-tappable" : "");
}

/* ============================================================
   VERIFY — prove the drawing is honest.
   ============================================================ */
export function verifyAnalytic(spec, tol = { scale: 0.02, perp: 0.6, ang: 1.0 }) {
  const g = computeAnalytic(spec), { X, Y, s, win } = g, r = [];
  const { xmin, xmax, ymin, ymax } = win;

  // 1) window valid
  r.push({ label: "window is valid", ok: xmax > xmin && ymax > ymin });

  // 2) every plotted point sits at its real coordinate, inside the frame
  (spec.points || []).forEach((p) => {
    const inside = p.x >= xmin - 1e-9 && p.x <= xmax + 1e-9 && p.y >= ymin - 1e-9 && p.y <= ymax + 1e-9;
    r.push({ label: `point ${p.label || ptName(p)} is inside the frame`, ok: inside });
  });

  // 3) every NUMERIC length label shares the one pixels-per-unit (truly to scale)
  const ratios = [];
  (spec.segs || []).forEach((sg) => {
    const val = numOf(sg.label);
    if (val == null || val <= 0 || sg.kind === "line") return;
    const px = Math.hypot(X(sg.a.x) - X(sg.b.x), Y(sg.a.y) - Y(sg.b.y));
    ratios.push({ ppu: px / val });
  });
  if (ratios.length) {
    ratios.forEach((rt, i) => r.push({ label: `numeric length ${i} drawn at the engine scale`, ok: Math.abs(rt.ppu - s) / s <= tol.scale }));
  } else r.push({ label: "scale check (numeric lengths)", ok: true });

  // 4) any segment flagged perp:<otherIndex> really is perpendicular to it
  (spec.segs || []).forEach((sg, i) => {
    if (sg.perp == null) return;
    const o = spec.segs[sg.perp];
    if (!o) { r.push({ label: `seg ${i} names a real perpendicular partner`, ok: false }); return; }
    const m1 = slope(sg.a, sg.b), m2 = slope(o.a, o.b);
    const ok = (m1 === null && m2 === 0) || (m2 === null && m1 === 0) || (m1 !== null && m2 !== null && Math.abs(m1 * m2 + 1) <= tol.perp);
    r.push({ label: `seg ${i} is drawn perpendicular to seg ${sg.perp}`, ok });
  });

  // 5) angle arcs span the line's TRUE slope (numeric label/expect matches)
  (spec.arcs || []).forEach((a, i) => {
    const want = a.expect != null ? a.expect : numOf(a.label);
    if (want == null) return;
    let actual = (Math.atan2(a.to.y - a.at.y, a.to.x - a.at.x) - Math.atan2(a.from.y - a.at.y, a.from.x - a.at.x)) * 180 / Math.PI;
    while (actual < 0) actual += 360; while (actual >= 360) actual -= 360;
    r.push({ label: `arc ${i} spans ${actual.toFixed(1)}° ≈ ${want}°`, ok: Math.abs(actual - want) <= tol.ang });
  });

  // 6) right-angle markers sit on a genuine 90° corner
  (spec.rights || []).forEach((rt, i) => {
    const u = norm(sub(rt.to1, rt.at)), w = norm(sub(rt.to2, rt.at));
    const dot = u.x * w.x + u.y * w.y;
    r.push({ label: `right-angle marker ${i} is on a true 90° corner`, ok: Math.abs(dot) <= 0.04 });
  });

  // 7) equal-length ticks really mark equal lengths (in pairs)
  if ((spec.ticks || []).length >= 2) {
    const byN = {};
    spec.ticks.forEach((t) => { const k = t.n || 1; (byN[k] = byN[k] || []).push(Math.hypot(t.a.x - t.b.x, t.a.y - t.b.y)); });
    Object.entries(byN).forEach(([k, lens]) => {
      if (lens.length < 2) return;
      const ok = lens.every((L) => Math.abs(L - lens[0]) < 1e-6);
      r.push({ label: `tick group ${k} marks equal lengths`, ok });
    });
  }

  return r;
}

function ptName(p) { return `(${p.x};${p.y})`; }
function slope(A, B) { const dx = B.x - A.x; return dx === 0 ? null : (B.y - A.y) / dx; }
function norm(v) { const l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; }
