/* ============================================================
   TIMELINE ENGINE  (time value of money)
   ------------------------------------------------------------
   A to-scale financial timeline: equally-spaced nodes T0..Tn, an
   amount placed on a node, and optional arrows showing a move
   (forward = ×(1+i), backward = ÷(1+i)). Like the stats engine it
   exposes compute / render / verify, and every node sits at a
   position derived from ONE linear scale, so the picture can't lie
   about how many periods lie between two points.

   spec: {
     type:"timeline", n,                       // nodes T0..Tn
     nodes:[ {t, amount?|label?, dp?, role?, id?} ],
                                                // labels above a node; role "P"|"A"|"".
                                                // TWO entries may share one t (f8's
                                                // same-day deposit and total): their
                                                // labels STACK upwards, never overlapping.
     arc?:{ from, to, label?, dir? },           // a single curved arrow from→to
     title?, w?, h?,
     tap?:{ targets:[t...], correctId:t },      // optional tap-a-node question
     tapLabels?: true                           // f8 (2026-10-10): the learner taps an
                                                // AMOUNT, not a tick. Every amount label
                                                // gets a hit box (geo.labels[k].hit), keyed
                                                // by its entry's `id`; the question's
                                                // q.tap = { targets:[ids], correctId:id }.
   }
   Colours come from CSS (.tl-*); the per-quest accent is the --accent
   CSS var inherited from the screen.

   STACKING (2026-10-10, f8). A node carrying k amount labels draws them
   STACK units apart, bottom one at the old height (cy − 38), and the
   frame grows by (k − 1)·STACK at the top so the highest label lands
   exactly where a single label always sat. A spec with no shared t
   (every round before f8) computes byte-for-byte the old geometry.
   ============================================================ */
import { rand } from "../finlib.js";

const N = v => Math.round(v * 10) / 10;
const STACK = 22;            // vertical gap between two amount labels stacked on one node
const GLYPH = 6.3;           // ≈0.6 × 10.5px per glyph: the width estimate the clamp has always used
/* the estimated ink box of an amount label around its baseline (10.5px bold) */
const INK_UP = 9, INK_DOWN = 3;

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg tl ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const line = (x1, y1, x2, y2, cls) => `<line class="${cls}" x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}"/>`;
const text = (x, y, s, cls, anchor = "middle") => `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}">${s}</text>`;

/* how many amount labels the busiest node carries */
function maxStack(spec) {
  const per = new Map();
  (spec.nodes || []).forEach(d => {
    if (d.label == null && d.amount == null) return;
    if (!(d.t >= 0 && d.t <= spec.n)) return;
    per.set(d.t, (per.get(d.t) || 0) + 1);
  });
  return Math.max(1, ...per.values());
}

export function computeTimeline(spec) {
  const n = spec.n;
  const extra = (maxStack(spec) - 1) * STACK;
  const W = spec.w || 360, H = (spec.h || 132) + extra;
  const L = 26, R = 26;
  const cy = H - 46;                         // axis baseline, leaving room for T-labels below
  const span = (W - L - R);
  const xAt = t => L + (n === 0 ? 0 : (t / n) * span);
  const gap = n > 0 ? span / n : span;
  const nodes = [];
  for (let t = 0; t <= n; t++) nodes.push({ t, x: xAt(t), label: `T${t}`, labels: [] });
  // decorate nodes that carry an amount/role. node.amount / amountLabel /
  // role keep their old meaning (the node's FIRST entry); every entry's
  // label also lands in node.labels, in spec order, bottom of the stack first.
  (spec.nodes || []).forEach(d => {
    const node = nodes[d.t];
    if (!node) return;
    const amountLabel = d.label != null ? d.label : (d.amount != null ? rand(d.amount, d.dp ?? 2) : null);
    if (!node.decorated) {
      node.decorated = true;
      node.amount = d.amount;
      node.amountLabel = amountLabel;
    }
    node.role = node.role || d.role || "";
    if (amountLabel != null) node.labels.push({ d, text: String(amountLabel) });
  });
  // one entry per drawn amount label, in draw order (node by node, bottom up)
  const labels = [];
  nodes.forEach(node => {
    node.labels = node.labels.map(({ d, text: s }, j, arr) => {
      const w = s.length * GLYPH, half = w / 2;
      // clamp the centred label into the viewBox (end nodes can carry labels wider than the margin)
      const x = Math.max(half + 2, Math.min(W - half - 2, node.x));
      const lb = {
        id: d.id != null ? String(d.id) : `${node.t}.${j}`,
        t: node.t, j, levels: arr.length, nodeX: node.x,
        x, y: cy - 38 - j * STACK, w, text: s, amount: d.amount,
      };
      labels.push(lb);
      return lb;
    });
  });
  // hit boxes for tappable amount labels: as wide as the label plus a margin
  // (never past half-way to the next node), the bottom label of a stack
  // reaching down to just above its tick, the top one reaching up a little.
  if (spec.tapLabels) {
    const halfCap = gap / 2 - 1.5;
    labels.forEach(lb => {
      const half = Math.min(halfCap, Math.max(lb.w / 2 + 6, 18));
      const x0 = Math.max(1, lb.x - half), x1 = Math.min(W - 1, lb.x + half);
      const bottom = lb.j === 0 ? cy - 8 : lb.y + (STACK - 16);
      const top = lb.j === lb.levels - 1 ? Math.max(2, lb.y - 26) : lb.y - 16;
      lb.hit = { x: x0, y: top, w: x1 - x0, h: bottom - top };
    });
  }
  return { type: "timeline", n, W, H, L, R, cy, xAt, gap, nodes, labels };
}

export function renderTimeline(spec) {
  const g = computeTimeline(spec);
  let out = "";

  // baseline + end caps
  out += line(g.xAt(0), g.cy, g.xAt(g.n), g.cy, "tl-axis");

  // ticks + T-labels + node decorations
  g.nodes.forEach(node => {
    out += line(node.x, g.cy - 6, node.x, g.cy + 6, "tl-tick");
    out += text(node.x, g.cy + 20, node.label, "tl-tlab");
    if (node.role) out += text(node.x, g.cy - 24, node.role, "tl-role");
    node.labels.forEach(lb => { out += text(lb.x, lb.y, lb.text, "tl-amt"); });
  });

  // optional arc (a curved arrow from→to)
  if (spec.arc) {
    const a = spec.arc;
    const x1 = g.xAt(a.from), x2 = g.xAt(a.to);
    const dir = a.dir || (a.to >= a.from ? "fwd" : "back");
    const top = g.cy - 54;                                  // arc apex height
    const cxm = (x1 + x2) / 2;
    // quadratic arc above the line
    out += `<path class="tl-arc" d="M ${N(x1)} ${N(g.cy - 12)} Q ${N(cxm)} ${N(top)} ${N(x2)} ${N(g.cy - 12)}" fill="none"/>`;
    // arrowhead at the destination, pointing in the travel direction
    const ax = x2, ay = g.cy - 12, s = 6;
    const tipDx = dir === "back" ? -1 : 1;
    out += `<path class="tl-arrow" d="M ${N(ax)} ${N(ay)} L ${N(ax - tipDx * s)} ${N(ay - s)} L ${N(ax - tipDx * s)} ${N(ay + s - 4)} Z"/>`;
    if (a.label) out += text(cxm, top - 4, a.label, "tl-arclab");
  }

  if (spec.title) out += text(g.W / 2, g.H - 6, spec.title, "tl-title");
  return svgWrap(g.W, g.H, spec.accent, out, (spec.tap || spec.tapLabels) ? "tl-tappable" : "");
}

/* the estimated ink box of one amount label (verify's model of it) */
export function labelInk(lb) {
  return { x0: lb.x - lb.w / 2, x1: lb.x + lb.w / 2, y0: lb.y - INK_UP, y1: lb.y + INK_DOWN };
}
const overlaps = (a, b, m = 0) => a.x0 < b.x1 - m && b.x0 < a.x1 - m && a.y0 < b.y1 - m && b.y0 < a.y1 - m;
const boxOf = h => ({ x0: h.x, x1: h.x + h.w, y0: h.y, y1: h.y + h.h });

export function verifyTimeline(spec, tol = 0.5) {
  const g = computeTimeline(spec), r = [];
  // 1) correct number of nodes
  r.push({ label: `${g.n + 1} nodes drawn (T0..T${g.n})`, ok: g.nodes.length === g.n + 1 });
  // 2) nodes are EQUALLY spaced (to scale) — every gap matches the first
  const gaps = [];
  for (let i = 1; i < g.nodes.length; i++) gaps.push(g.nodes[i].x - g.nodes[i - 1].x);
  const even = gaps.every(d => Math.abs(d - gaps[0]) <= tol);
  r.push({ label: "all periods equally spaced", ok: even && gaps[0] > 0 });
  // 3) node index reads back from its pixel via the same scale
  g.nodes.forEach(node => {
    const back = g.n * (node.x - g.xAt(0)) / (g.xAt(g.n) - g.xAt(0));
    r.push({ label: `${node.label} reads back as T${Math.round(back)}`, ok: Math.abs(back - node.t) <= tol });
  });
  // 4) arc endpoints are in range and the arrow points the stated way
  if (spec.arc) {
    const a = spec.arc;
    const inRange = a.from >= 0 && a.from <= g.n && a.to >= 0 && a.to <= g.n;
    const dir = a.dir || (a.to >= a.from ? "fwd" : "back");
    const dirOk = (dir === "fwd" && a.to >= a.from) || (dir === "back" && a.to <= a.from);
    r.push({ label: `arc T${a.from}→T${a.to} in range and points ${dir}`, ok: inRange && dirOk });
  }
  // 5) no two amount labels overlap — neighbours on the line, or two
  //    amounts stacked on one node (f8's same-day deposit and total)
  if (g.labels.length > 1) {
    const clash = [];
    for (let i = 0; i < g.labels.length; i++)
      for (let j = i + 1; j < g.labels.length; j++)
        if (overlaps(labelInk(g.labels[i]), labelInk(g.labels[j]), 0.5)) clash.push(`"${g.labels[i].text}" × "${g.labels[j].text}"`);
    const stacked = g.nodes.filter(nd => nd.labels.length > 1).map(nd => `T${nd.t}`);
    r.push({ label: `${g.labels.length} amount labels, none overlapping${stacked.length ? ` (stacked on ${stacked.join(", ")})` : ""}${clash.length ? ": " + clash.join("; ") : ""}`, ok: clash.length === 0 });
  }
  // 6) tappable labels: every label has a unique id and a hit box that sits
  //    in the frame, holds its own label, is big enough for a finger, and
  //    never overlaps another label's box (so a tap is never ambiguous)
  if (spec.tapLabels) {
    const ids = g.labels.map(lb => lb.id);
    r.push({ label: `${ids.length} tappable amount labels, ids unique`, ok: ids.length > 0 && new Set(ids).size === ids.length });
    const bad = [];
    g.labels.forEach(lb => {
      const h = lb.hit;
      if (!h) { bad.push(`"${lb.text}" has no hit box`); return; }
      const hb = boxOf(h), ink = labelInk(lb);
      if (hb.x0 < -tol || hb.x1 > g.W + tol || hb.y0 < -tol || hb.y1 > g.H + tol) bad.push(`"${lb.text}" hit box leaves the frame`);
      if (!(hb.x0 <= ink.x0 + tol && hb.x1 >= ink.x1 - tol && hb.y0 <= ink.y0 + tol && hb.y1 >= ink.y1 - tol)) bad.push(`"${lb.text}" hit box does not hold its label`);
      if (h.w < 28 || h.h < 18) bad.push(`"${lb.text}" hit box only ${N(h.w)}×${N(h.h)}`);
    });
    for (let i = 0; i < g.labels.length; i++)
      for (let j = i + 1; j < g.labels.length; j++) {
        const a = g.labels[i].hit, b = g.labels[j].hit;
        if (a && b && overlaps(boxOf(a), boxOf(b), 0.01)) bad.push(`hit boxes of "${g.labels[i].text}" and "${g.labels[j].text}" overlap`);
      }
    r.push({ label: `every amount label has its own finger-sized hit box${bad.length ? ": " + bad.join("; ") : ""}`, ok: bad.length === 0 });
  }
  return r;
}
