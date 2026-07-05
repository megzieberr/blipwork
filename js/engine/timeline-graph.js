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
     nodes:[ {t, amount?|label?, role?} ],      // labels above a node; role "P"|"A"|""
     arc?:{ from, to, label?, dir? },           // a single curved arrow from→to
     title?, w?, h?,
     tap?:{ targets:[t...], correctId:t }       // optional tap-a-node question
   }
   Colours come from CSS (.tl-*); the per-quest accent is the --accent
   CSS var inherited from the screen.
   ============================================================ */
import { rand } from "../finlib.js";

const N = v => Math.round(v * 10) / 10;

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg tl ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const line = (x1, y1, x2, y2, cls) => `<line class="${cls}" x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}"/>`;
const text = (x, y, s, cls, anchor = "middle") => `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}">${s}</text>`;

export function computeTimeline(spec) {
  const n = spec.n;
  const W = spec.w || 360, H = spec.h || 132;
  const L = 26, R = 26;
  const cy = H - 46;                         // axis baseline, leaving room for T-labels below
  const span = (W - L - R);
  const xAt = t => L + (n === 0 ? 0 : (t / n) * span);
  const nodes = [];
  for (let t = 0; t <= n; t++) nodes.push({ t, x: xAt(t), label: `T${t}` });
  // decorate nodes that carry an amount/role
  (spec.nodes || []).forEach(d => {
    const node = nodes[d.t];
    if (!node) return;
    node.amount = d.amount;
    node.amountLabel = d.label != null ? d.label : (d.amount != null ? rand(d.amount, d.dp ?? 2) : null);
    node.role = d.role || "";
  });
  return { type: "timeline", n, W, H, L, R, cy, xAt, nodes };
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
    if (node.amountLabel) {
      // clamp the centred label into the viewBox (end nodes can carry labels wider than the margin)
      const half = String(node.amountLabel).length * 0.5 * 6.3;   // ≈0.6 × 10.5px per glyph
      const lx = Math.max(half + 2, Math.min(g.W - half - 2, node.x));
      out += text(lx, g.cy - 38, node.amountLabel, "tl-amt");
    }
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
  return svgWrap(g.W, g.H, spec.accent, out, spec.tap ? "tl-tappable" : "");
}

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
  return r;
}
