/* ============================================================
   TRIANGLE ENGINE  (2D trigonometry)   ★ accuracy-critical
   ------------------------------------------------------------
   Draws a labelled triangle (or quadrilateral / regular polygon)
   that is GENUINELY TO SCALE. The quest hands in the real (x, y)
   vertices computed by triglib's solver; this engine only fits
   them to the viewBox with ONE uniform scale (so every angle and
   every length-ratio is preserved) and hangs the labels.

   Because a single scale maps real units → pixels, verify() can
   prove the drawing can't lie:
     • every NUMERIC side label shares the same pixels-per-unit, and
     • every NUMERIC angle label equals the angle actually drawn.

   Labels themselves stay upright and horizontal (like the
   workbook); only the triangle is free to rotate.

   spec: {
     type:"triangle",
     pts:{ A:{x,y}, B:{x,y}, ... },           // REAL coords (any scale/rotation)
     poly:["A","B","C"],                        // closed outline order
     sides?:[ {from,to,label} ],                // edge labels (numeric or "x"/"θ")
     angles?:[ {at,label?,right?,between?:[p,q]} ],
     ticks?:[ {from,to,n?} ],                   // equal-length tick marks
     segs?:[ {from,to,label?,dash?} ],          // cevian / diagonal / altitude
     w?, h?, accent?,
     tap?:{ mode:"vertex"|"side", targets:[id], correctId }
   }
   ============================================================ */

const N = v => Math.round(v * 100) / 100;
const SVGNS = "http://www.w3.org/2000/svg";

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg t2 ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const text = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

/* "13" / "8,2" / "40°" / "76,1°"  → number ;  "x" / "θ" / "y" → null */
function numOf(label) {
  if (label == null) return null;
  const s = String(label).replace("°", "").replace(",", ".").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
const sub = (P, Q) => ({ x: P.x - Q.x, y: P.y - Q.y });
const len = v => Math.hypot(v.x, v.y) || 1;
const unit = v => { const l = len(v); return { x: v.x / l, y: v.y / l }; };
const mid = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });

/* interior angle (degrees) at V between the rays V→P and V→Q */
function angleAt(V, P, Q) {
  const u = unit(sub(P, V)), w = unit(sub(Q, V));
  return Math.acos(Math.max(-1, Math.min(1, u.x * w.x + u.y * w.y))) * 180 / Math.PI;
}

export function computeTriangle(spec) {
  const W = spec.w || 360, H = spec.h || 240, pad = 34;
  const poly = spec.poly || Object.keys(spec.pts);
  const names = Object.keys(spec.pts);

  // bounding box of every real point, then ONE uniform scale to fit
  const xs = names.map(k => spec.pts[k].x), ys = names.map(k => spec.pts[k].y);
  const minx = Math.min(...xs), maxx = Math.max(...xs);
  const miny = Math.min(...ys), maxy = Math.max(...ys);
  const bw = Math.max(maxx - minx, 1e-6), bh = Math.max(maxy - miny, 1e-6);
  const scale = Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh);
  const ox = (W - bw * scale) / 2, oy = (H - bh * scale) / 2;

  // real → pixel (flip y: SVG y grows downward, maths y grows up)
  const P = {};
  names.forEach(k => {
    P[k] = { x: ox + (spec.pts[k].x - minx) * scale, y: H - (oy + (spec.pts[k].y - miny) * scale) };
  });

  // centroid of the OUTLINE (defines "outward" for labels)
  const cx = poly.reduce((s, k) => s + P[k].x, 0) / poly.length;
  const cy = poly.reduce((s, k) => s + P[k].y, 0) / poly.length;

  // side midpoints (for tap-a-side and label placement)
  const sideMids = {};
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    sideMids[`${a}${b}`] = mid(P[a], P[b]);
  }
  return { type: "triangle", W, H, P, poly, cx, cy, scale, sideMids };
}

/* the two outline neighbours of vertex `name` */
function neighbours(poly, name) {
  const i = poly.indexOf(name);
  return [poly[(i - 1 + poly.length) % poly.length], poly[(i + 1) % poly.length]];
}

export function renderTriangle(spec) {
  const g = computeTriangle(spec), P = g.P;
  let out = "";

  // ---- outline ----
  const dPoly = g.poly.map((k, i) => `${i ? "L" : "M"} ${N(P[k].x)} ${N(P[k].y)}`).join(" ") + " Z";
  out += `<path class="t2-edge" d="${dPoly}" fill="rgba(255,255,255,.02)"/>`;

  // ---- extra segments (cevian / diagonal / altitude) ----
  (spec.segs || []).forEach(s => {
    const A = P[s.from], B = P[s.to];
    out += `<line class="t2-seg${s.dash ? " dash" : ""}" x1="${N(A.x)}" y1="${N(A.y)}" x2="${N(B.x)}" y2="${N(B.y)}"/>`;
    if (s.label != null) {
      const m = mid(A, B), n = unit(sub(m, { x: g.cx, y: g.cy }));
      out += text(m.x + n.x * 13, m.y + n.y * 13, s.label, "t2-slab");
    }
  });

  // ---- equal-length ticks ----
  (spec.ticks || []).forEach(t => {
    const A = P[t.from], B = P[t.to], m = mid(A, B);
    const dir = unit(sub(B, A)), nrm = { x: -dir.y, y: dir.x };
    const k = t.n || 1, gap = 4;
    for (let i = 0; i < k; i++) {
      const off = (i - (k - 1) / 2) * gap;
      const c = { x: m.x + dir.x * off, y: m.y + dir.y * off };
      out += `<line class="t2-tick" x1="${N(c.x - nrm.x * 5)}" y1="${N(c.y - nrm.y * 5)}" x2="${N(c.x + nrm.x * 5)}" y2="${N(c.y + nrm.y * 5)}"/>`;
    }
  });

  // ---- angle marks + labels ----
  (spec.angles || []).forEach(a => {
    const V = P[a.at];
    const [p, q] = a.between ? a.between : neighbours(g.poly, a.at);
    const u = unit(sub(P[p], V)), w = unit(sub(P[q], V));
    const bis = unit({ x: u.x + w.x, y: u.y + w.y });
    if (a.right) {
      // right-angle square
      const s = 12;
      const c1 = { x: V.x + u.x * s, y: V.y + u.y * s };
      const c3 = { x: V.x + w.x * s, y: V.y + w.y * s };
      const c2 = { x: V.x + (u.x + w.x) * s, y: V.y + (u.y + w.y) * s };
      out += `<path class="t2-right" d="M ${N(c1.x)} ${N(c1.y)} L ${N(c2.x)} ${N(c2.y)} L ${N(c3.x)} ${N(c3.y)}" fill="none"/>`;
    } else {
      // small interior arc
      const r = 16;
      const s0 = { x: V.x + u.x * r, y: V.y + u.y * r }, s1 = { x: V.x + w.x * r, y: V.y + w.y * r };
      const big = angleAt(V, P[p], P[q]) > 180 ? 1 : 0;
      // sweep direction: from u to w going through the bisector (interior)
      const cross = u.x * w.y - u.y * w.x;
      const sweep = cross < 0 ? 1 : 0;
      out += `<path class="t2-arc" d="M ${N(s0.x)} ${N(s0.y)} A ${r} ${r} 0 ${big} ${sweep} ${N(s1.x)} ${N(s1.y)}" fill="none"/>`;
    }
    if (a.label != null) {
      // Her phone review (2026-08-22): "45°" at a sharp vertex sat on the sides.
      // A label fits INSIDE the angle only where the wedge is wide enough for
      // it: at distance d along the bisector the wedge is 2·d·tan(α/2) wide.
      // Long labels at sharp angles go OUTSIDE the vertex instead.
      const chars = String(a.label).replace(/<[^>]+>/g, "").length;
      const halfW = 3.6 * chars + 2;
      const alpha = a.right ? 90 : angleAt(V, P[p], P[q]);
      const need = halfW / Math.tan((alpha / 2) * Math.PI / 180) + 12;
      const off = a.right ? 24 : Math.max(27, need);
      if (off <= 46) out += text(V.x + bis.x * off, V.y + bis.y * off, a.label, "t2-ang");
      else {
        // outside the vertex — but the vertex may sit on the frame edge, so fall
        // back to BESIDE it (away from the triangle's centroid) when there is no
        // room behind it (her find: the "90° − θ" label vanished off the top)
        // Foreman review fix, 2026-08-23 (the dice build's trig session
        // measured it: 23% of t2.findSide rolls printed "40°" on top of "A").
        // The vertex LETTER sits 16 px out from the vertex, away from the
        // centroid — at a sharp vertex that is the same direction as "behind
        // it", so a label parked at halfW + 10 landed on the letter. With
        // names shown, the label now goes PAST the letter (16 + 9 clear, then
        // its own half-width). With hideNames (every General Trig figure) the
        // offset is exactly what it was, so those approved pictures do not move.
        const behind = spec.hideNames ? halfW + 10 : halfW + 25;
        let lx = V.x - bis.x * behind, ly = V.y - bis.y * behind;
        if (ly < 12 || ly > g.H - 12 || lx < halfW || lx > g.W - halfW) {
          const side = V.x >= g.cx ? 1 : -1;
          lx = V.x + side * (halfW + 12); ly = Math.min(g.H - 12, Math.max(12, V.y + 6));
          // names shown: "beside it" is where the vertex letter already is
          // (same review fix as above) — drop the label a line BELOW the
          // letter, or above it when the vertex sits on the bottom edge.
          if (!spec.hideNames) ly = V.y + 22 <= g.H - 10 ? V.y + 22 : V.y - 14;
        }
        out += text(lx, ly, a.label, "t2-ang");
      }
    }
  });

  // ---- side labels (midpoint, pushed outward) ----
  (spec.sides || []).forEach(s => {
    const A = P[s.from], B = P[s.to], m = mid(A, B);
    // push along the side's TRUE perpendicular (away from the centroid), far
    // enough that a horizontal label of this width clears the line — her
    // review find: "√2" and "√(p² + 1)" were drawn across their own sides.
    const d = unit(sub(B, A));
    let n = { x: -d.y, y: d.x };
    const toC = sub({ x: g.cx, y: g.cy }, m);
    if (n.x * toC.x + n.y * toC.y > 0) n = { x: -n.x, y: -n.y };
    const chars = String(s.label).replace(/<[^>]+>/g, "").length;
    const off = (3.6 * chars) * Math.abs(n.x) + 7 * Math.abs(n.y) + 8;
    out += text(m.x + n.x * off, m.y + n.y * off, s.label, "t2-slab");
  });

  // ---- vertex labels (pushed outward) ----
  // spec.hideNames: skip the vertex letters (General Trig's two special
  // triangles are drawn exactly as on her page — sides and angles only).
  g.poly.forEach(k => {
    const v = P[k], n = unit(sub(v, { x: g.cx, y: g.cy }));
    if (!spec.hideNames) out += text(v.x + n.x * 16, v.y + n.y * 16, k, "t2-vert");
    out += `<circle class="t2-dot" cx="${N(v.x)}" cy="${N(v.y)}" r="2.2"/>`;
  });

  if (spec.title) out += text(g.W / 2, g.H - 6, spec.title, "t2-title");
  return svgWrap(g.W, g.H, spec.accent, out, spec.tap ? "t2-tappable" : "");
}

export function verifyTriangle(spec, tol = { scale: 0.04, ang: 1.2 }) {
  const g = computeTriangle(spec), P = g.P, r = [];

  // 1) outline is a non-degenerate polygon (positive area)
  let area2 = 0;
  for (let i = 0; i < g.poly.length; i++) {
    const a = P[g.poly[i]], b = P[g.poly[(i + 1) % g.poly.length]];
    area2 += a.x * b.y - b.x * a.y;
  }
  r.push({ label: "outline is a real (non-degenerate) polygon", ok: Math.abs(area2) > 5 });

  // 2) every outline vertex sits inside the frame
  const inBounds = g.poly.every(k => P[k].x >= 0 && P[k].x <= g.W && P[k].y >= 0 && P[k].y <= g.H);
  r.push({ label: "all vertices fit inside the frame", ok: inBounds });

  // 3) every NUMERIC side label shares one pixels-per-unit (truly to scale)
  const ratios = [];
  (spec.sides || []).forEach(s => {
    const val = numOf(s.label);
    if (val == null || val <= 0) return;
    const px = Math.hypot(P[s.from].x - P[s.to].x, P[s.from].y - P[s.to].y);
    ratios.push({ id: `${s.from}${s.to}`, ppu: px / val });
  });
  if (ratios.length >= 2) {
    const base = ratios[0].ppu;
    ratios.slice(1).forEach(rt => {
      r.push({ label: `side ${rt.id} drawn to the same scale as ${ratios[0].id}`, ok: Math.abs(rt.ppu - base) / base <= tol.scale });
    });
  } else {
    r.push({ label: "scale check (numeric sides)", ok: true });
  }

  // 4) every NUMERIC angle label equals the angle actually drawn
  (spec.angles || []).forEach(a => {
    const val = numOf(a.label);
    if (val == null) return;
    const [p, q] = a.between ? a.between : neighbours(g.poly, a.at);
    const actual = angleAt(P[a.at], P[p], P[q]);
    r.push({ label: `angle at ${a.at} drawn ${actual.toFixed(1)}° ≈ label ${val}°`, ok: Math.abs(actual - val) <= tol.ang });
  });

  return r;
}
