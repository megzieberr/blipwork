/* ============================================================
   NUMBER-PATTERNS ENGINE — the DIFFERENCE PYRAMID   ★ accuracy-critical
   ------------------------------------------------------------
   Draws the pyramid the chapter is built around:

        T₁    T₂    T₃    T₄          (the terms)
           d₁   d₁   d₁                (first differences)
              d₂   d₂                  (second differences)

   The terms sit on one evenly-spaced row; each difference cell
   hangs exactly between the two cells it comes from, joined by two
   connector lines, so the picture reads as "subtract the pair above
   me". The engine COMPUTES every difference itself from the terms,
   so a cell can never display a wrong number — and verify() proves
   it: each first-difference cell equals the gap of its two parents,
   each second-difference cell equals the gap of ITS two parents, and
   the term row is evenly spaced.

   spec: {
     type:"pattern",
     terms:[ n0, n1, … ],         // numbers; use null for an unknown term
     termLabels?:[ … ],           // override the text shown in a term cell (e.g. "x")
     showFirst?:bool,             // draw the first-difference row
     showSecond?:bool,            // draw the second-difference row (needs showFirst)
     accent?, w?, h?,
     tap?:{ targets:[cellId], correctId }   // cellId: "t0" | "d1_0" | "d2_0"
   }
   ============================================================ */
const N = (v) => Math.round(v * 100) / 100;
const MINUS = "−";
const finite = (x) => typeof x === "number" && Number.isFinite(x);

/* comma decimal, real minus */
function comma(v) {
  const s = (Math.round(v * 1e6) / 1e6).toString().replace(".", ",");
  return s.replace(/^-/, MINUS);
}
/* a difference shown with its sign so it reads as "+3" / "−2" */
function signed(v) { return (v < 0 ? MINUS : "+") + comma(Math.abs(v)); }
/* parse a cell's displayed text back to a number (for verify) */
function parseCell(s) { return Number(String(s).replace(MINUS, "-").replace("+", "").replace(",", ".")); }

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg np ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}

const PAD_X = 20, PAD_T = 16, GAP_X = 66, ROW = 46;
const TW = 48, TH = 30, DW = 42, DH = 24;     // term / difference cell sizes

export function computePattern(spec) {
  const terms = spec.terms || [];
  const m = terms.length;
  const labels = spec.termLabels || [];
  const known = terms.every(finite);
  const showFirst = !!spec.showFirst && known && m >= 2;
  const showSecond = !!spec.showSecond && showFirst && m >= 3;

  const fd = showFirst ? terms.slice(1).map((v, i) => v - terms[i]) : [];
  const sd = showSecond ? fd.slice(1).map((v, i) => v - fd[i]) : [];

  const cx0 = PAD_X + TW / 2;
  const termY = PAD_T + TH / 2;
  const xTerm = (i) => cx0 + i * GAP_X;
  const yRow = (r) => termY + r * ROW;          // r=0 terms, 1 first diff, 2 second diff

  const cells = [];
  terms.forEach((v, i) => {
    const text = labels[i] != null ? labels[i] : (finite(v) ? comma(v) : "?");
    cells.push({ id: "t" + i, kind: finite(v) ? "term" : "blank", cx: xTerm(i), cy: yRow(0), w: TW, h: TH, text, numeric: finite(v) });
  });
  fd.forEach((v, j) => cells.push({ id: "d1_" + j, kind: "d1", cx: (xTerm(j) + xTerm(j + 1)) / 2, cy: yRow(1), w: DW, h: DH, text: signed(v), numeric: true }));
  sd.forEach((v, j) => cells.push({ id: "d2_" + j, kind: "d2", cx: xTerm(j + 1), cy: yRow(2), w: DW, h: DH, text: signed(v), numeric: true }));

  // connector lines: each diff cell joins to its two parents (cell centres → cell centre)
  const links = [];
  const byId = Object.fromEntries(cells.map((c) => [c.id, c]));
  fd.forEach((_, j) => { links.push([byId["t" + j], byId["d1_" + j]]); links.push([byId["t" + (j + 1)], byId["d1_" + j]]); });
  sd.forEach((_, j) => { links.push([byId["d1_" + j], byId["d2_" + j]]); links.push([byId["d1_" + (j + 1)], byId["d2_" + j]]); });

  const rows = showSecond ? 3 : showFirst ? 2 : 1;
  const W = PAD_X * 2 + TW + (m - 1) * GAP_X;
  const H = PAD_T + TH / 2 + (rows - 1) * ROW + (rows === 1 ? TH / 2 : DH / 2) + 14;
  return { W, H, cells, links, byId, terms, fd, sd, showFirst, showSecond };
}

export function renderPattern(spec) {
  const g = computePattern(spec);
  let out = "";
  // connectors first (under the cells)
  g.links.forEach(([a, b]) => { out += `<line class="np-link" x1="${N(a.cx)}" y1="${N(a.cy + a.h / 2 - 2)}" x2="${N(b.cx)}" y2="${N(b.cy - b.h / 2 + 2)}"/>`; });
  // cells
  g.cells.forEach((c) => {
    const cls = c.kind === "term" ? "np-term" : c.kind === "blank" ? "np-blank" : c.kind === "d2" ? "np-d2" : "np-d1";
    out += `<g class="np-cell ${cls}">` +
      `<rect x="${N(c.cx - c.w / 2)}" y="${N(c.cy - c.h / 2)}" width="${c.w}" height="${c.h}" rx="7"/>` +
      `<text x="${N(c.cx)}" y="${N(c.cy)}" text-anchor="middle" dominant-baseline="central">${c.text}</text>` +
      `</g>`;
  });
  return svgWrap(g.W, g.H, spec.accent, out, spec.tap ? "np-tappable" : "");
}

/* ============================================================
   VERIFY — prove every displayed difference is the true gap.
   ============================================================ */
export function verifyPattern(spec, tol = 1e-6) {
  const g = computePattern(spec), r = [];
  const { terms, byId } = g;

  r.push({ label: "has at least two terms", ok: terms.length >= 2 });

  // 1) every first-difference cell equals terms[j+1] − terms[j]
  g.fd.forEach((v, j) => {
    const cell = byId["d1_" + j];
    const shown = parseCell(cell.text), real = terms[j + 1] - terms[j];
    r.push({ label: `d1_${j} shown ${cell.text} = T${j + 2}−T${j + 1}`, ok: Math.abs(shown - real) < tol });
  });
  // 2) every second-difference cell equals fd[j+1] − fd[j]
  g.sd.forEach((v, j) => {
    const cell = byId["d2_" + j];
    const shown = parseCell(cell.text), real = g.fd[j + 1] - g.fd[j];
    r.push({ label: `d2_${j} shown ${cell.text} = gap of the two first differences`, ok: Math.abs(shown - real) < tol });
  });
  // 3) the term row is evenly spaced (the pyramid only lines up if it is)
  const xs = terms.map((_, i) => byId["t" + i].cx);
  const gaps = xs.slice(1).map((x, i) => x - xs[i]);
  r.push({ label: "term row is evenly spaced", ok: gaps.length === 0 || gaps.every((d) => Math.abs(d - gaps[0]) < 0.01) });

  // 4) a tap target (if any) names a real cell
  if (spec.tap) {
    const ids = g.cells.map((c) => c.id);
    r.push({ label: `tap correctId "${spec.tap.correctId}" is a real cell`, ok: ids.includes(spec.tap.correctId) });
    if (spec.tap.targets) r.push({ label: "all tap targets are real cells", ok: spec.tap.targets.every((t) => ids.includes(t)) });
  }
  return r;
}
