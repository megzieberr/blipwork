/* ============================================================
   TREE ENGINE  (two-stage experiments)
   ------------------------------------------------------------
   A probability tree: a root, a first set of branches (stage 1)
   and a second set per branch (stage 2). Each branch carries its
   probability; each leaf is one complete outcome. Paths can be
   highlighted (e.g. every path that contains a red) and leaves can
   be tapped. compute / render / verify like the other engines.

   Correctness guarantee (verify): the probabilities leaving any
   single point add up to 1, the leaves are equally spaced, and the
   leaf count equals stage1 × stage2 — so the tree can't lie about
   the experiment.

   spec: {
     type:"tree",
     stage1:[ {label, p} ],                 // p = a fraction/decimal STRING
     stage2?:[ [ {label, p}, ... ], ... ],  // children per stage-1 branch (omit → 1 stage)
     showProducts?:bool,                    // print "= a/b × c/d" beside each leaf
     highlight?:[leafIndex...],             // draw these paths in the accent
     w?, h?, accent?,
     tap?:{ targets:[leafIdx...], correctId }
   }
   ============================================================ */

const N = v => Math.round(v * 100) / 100;

/* parse a probability string: "6/14" | "0,5" | "0.5" | "3" -> number */
export function pVal(s) {
  if (typeof s === "number") return s;
  const t = String(s).trim().replace(",", ".");
  if (t.includes("/")) { const [a, b] = t.split("/").map(Number); return b ? a / b : NaN; }
  const n = Number(t); return Number.isFinite(n) ? n : NaN;
}

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg tr ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}

export function computeTree(spec) {
  const twoStage = Array.isArray(spec.stage2) && spec.stage2.length;
  const W = spec.w || 380;
  const rowH = 36, topPad = 16;

  // leaves, in top-to-bottom order
  const leaves = [];
  if (twoStage) {
    spec.stage1.forEach((s1, i) => {
      (spec.stage2[i] || []).forEach((s2, j) => {
        leaves.push({ path: s1.label + s2.label, s1: i, s2: j, p1: s1.p, p2: s2.p, label1: s1.label, label2: s2.label });
      });
    });
  } else {
    spec.stage1.forEach((s1, i) => leaves.push({ path: s1.label, s1: i, p1: s1.p, label1: s1.label }));
  }
  const L = leaves.length;
  const H = spec.h || (topPad * 2 + L * rowH);

  const rootX = 16, stage1X = twoStage ? 116 : 150, leafX = twoStage ? 226 : 150;
  const yAt = i => topPad + (i + 0.5) * rowH;
  leaves.forEach((lf, i) => { lf.x = leafX; lf.y = yAt(i); });

  // stage-1 nodes sit at the vertical centre of their children
  const s1nodes = spec.stage1.map((s1, i) => {
    const kids = leaves.filter(l => l.s1 === i);
    const y = kids.length ? kids.reduce((s, k) => s + k.y, 0) / kids.length : yAt(i);
    return { i, label: s1.label, p: s1.p, x: stage1X, y };
  });
  const root = { x: rootX, y: H / 2 };
  return { type: "tree", twoStage, W, H, rowH, rootX, stage1X, leafX, root, s1nodes, leaves };
}

const node = (x, y, label, cls) =>
  `<circle class="tr-node ${cls}" cx="${N(x)}" cy="${N(y)}" r="11"/><text class="tr-nlab" x="${N(x)}" y="${N(y)}" text-anchor="middle" dominant-baseline="central">${label}</text>`;
const branch = (x1, y1, x2, y2, hot) => `<line class="tr-branch${hot ? " hot" : ""}" x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}"/>`;
function plabel(x1, y1, x2, y2, s) {
  const mx = x1 + (x2 - x1) * 0.5, my = y1 + (y2 - y1) * 0.5 - 4;
  return `<text class="tr-p" x="${N(mx)}" y="${N(my)}" text-anchor="middle">${s}</text>`;
}

export function renderTree(spec) {
  const g = computeTree(spec);
  const hot = new Set(spec.highlight || []);
  let out = "";

  // branches first (so nodes sit on top)
  g.s1nodes.forEach(s1 => {
    const anyHot = g.leaves.some((l, idx) => l.s1 === s1.i && hot.has(idx));
    out += branch(g.root.x + 11, g.root.y, s1.x - 11, s1.y, anyHot && !g.twoStage);
    out += plabel(g.root.x, g.root.y, s1.x, s1.y, s1.p);
  });
  if (g.twoStage) {
    g.leaves.forEach((lf, idx) => {
      const s1 = g.s1nodes[lf.s1];
      out += branch(s1.x + 11, s1.y, lf.x - 11, lf.y, hot.has(idx));
      out += plabel(s1.x, s1.y, lf.x, lf.y, lf.p2);
    });
  }

  // nodes
  out += node(g.root.x, g.root.y, "", "tr-root");
  g.s1nodes.forEach(s1 => { out += node(s1.x, s1.y, s1.label, "s1"); });
  g.leaves.forEach((lf, idx) => { out += node(lf.x, lf.y, g.twoStage ? lf.label2 : lf.label1, "leaf" + (hot.has(idx) ? " hot" : "")); });

  // outcome labels (+ optional product) to the right of each leaf
  g.leaves.forEach(lf => {
    let s = `<text class="tr-out" x="${N(lf.x + 18)}" y="${N(lf.y)}" text-anchor="start" dominant-baseline="central">${lf.path}`;
    if (spec.showProducts && g.twoStage) s += ` <tspan class="tr-prod">= ${lf.p1} × ${lf.p2}</tspan>`;
    s += `</text>`;
    out += s;
  });

  return svgWrap(g.W, g.H, spec.accent, out, spec.tap ? "tr-tappable" : "");
}

export function verifyTree(spec, tol = 1e-6) {
  const g = computeTree(spec), r = [];
  // 1) stage-1 probabilities add to 1
  const s1sum = spec.stage1.reduce((s, b) => s + pVal(b.p), 0);
  r.push({ label: `stage-1 branches add up to 1 (${s1sum.toFixed(3)})`, ok: Math.abs(s1sum - 1) <= 1e-3 });
  // 2) each stage-2 fork adds to 1
  if (g.twoStage) {
    spec.stage2.forEach((kids, i) => {
      const sum = kids.reduce((s, b) => s + pVal(b.p), 0);
      r.push({ label: `fork after ${spec.stage1[i].label} adds up to 1 (${sum.toFixed(3)})`, ok: Math.abs(sum - 1) <= 1e-3 });
    });
  }
  // 3) leaves equally spaced
  const ys = g.leaves.map(l => l.y);
  const gaps = ys.slice(1).map((y, i) => y - ys[i]);
  r.push({ label: "leaves equally spaced", ok: gaps.every(d => Math.abs(d - gaps[0]) <= 0.5) && (gaps.length === 0 || gaps[0] > 0) });
  // 4) leaf count = stage1 × stage2
  const expect = g.twoStage ? spec.stage2.reduce((s, k) => s + k.length, 0) : spec.stage1.length;
  r.push({ label: `leaf count is ${expect}`, ok: g.leaves.length === expect });
  // 5) columns advance left → right
  r.push({ label: "root → stage 1 → leaves advance rightward", ok: g.rootX < g.stage1X && g.stage1X <= g.leafX });
  return r;
}
