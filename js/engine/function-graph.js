/* ============================================================
   FUNCTION-GRAPH ENGINE  (Functions chapter)   ★ accuracy-critical
   ------------------------------------------------------------
   Plots straight lines, parabolas, hyperbolas and exponentials
   on a Cartesian plane, GENUINELY TO SCALE. The quest hands in
   the real equations plus a maths window {xmin,xmax,ymin,ymax};
   this engine fits that window to the viewBox with ONE affine map
     px = padL + (x − xmin)·sx       py = H − padB − (y − ymin)·sy
   so EVERY feature — curve, intercept, turning point, intersection,
   asymptote — is placed by the same transform.

   Because of that single map, verify() can prove the picture can't
   lie: every labelled point that names a curve really lies on that
   curve, and every asymptote sits where the equation says.

   spec: {
     type:"function",
     win:{ xmin, xmax, ymin, ymax },
     curves:[ { kind, …params, tone?:"a"|"b"|"c", dash?, label?, labelAt? } ],
     points?:[ { x, y, label?, on?, open?, dashTo?:"x"|"y"|"both" } ],
     asymptotes?:[ { x?, y?, of?, label? } ],  // dashed asymptote lines; `label`
                                              // (e.g. "x = −2") draws the muted
                                              // caption beside the line
     vlines?:[ { x, label? } ],           // dashed vertical boundary lines (an
                                          // inequality cut, an axis of symmetry);
                                          // `label` ("x = 3") is captioned exactly
                                          // like a vertical asymptote's
     shades?:[ { x0, x1 } ],              // translucent vertical band (an x-interval)
     segment?:{ x, fromCurve, toCurve, label? },   // vertical segment between two curves
     grid?:true, w?, h?, accent?,
     tap?:{ mode, targets, correctId }
   }

   LABEL PLACEMENT (rewritten 2026-08-22, SESSION 1b; axis letters
   folded in SESSION 2a-FIX the same day). EVERY piece of text on the
   picture — the axis letters x / y / O, the asymptote and boundary-line
   captions, the curve names, and the coordinate labels — goes through
   ONE placer, so nothing can land on anything else. The placer knows
   about THREE kinds of obstacle:
     · the curves themselves (sampled into pixel points);
     · the x- and y-axis lines, the asymptote lines, the inequality
       boundary lines and the PQ-style segment (also sampled) — this is
       what stops "(−1 ; 0)" being drawn straight through the y-axis;
     · every label already placed.
   Placement order is most-constrained-first: the axis letters (each
   belongs to one arrow tip), then asymptote/boundary captions (they
   must sit beside their own line), then curve names (they must sit on
   their own curve's normal), then the coordinate labels (which have
   eight slots around their dot and so can always flow around the rest).
   Each stroke sample carries a `src` tag so ONE placement can ignore
   ONE stroke: the x letter is meant to sit beside the x-axis, so it
   ignores that axis while still dodging every curve. Before this the
   three letters sat at fixed spots and a curve rising through the top
   of the window near the y-axis was drawn straight over the y.
   ============================================================ */
import { makeFn } from "../funclib.js";

const N = (v) => Math.round(v * 100) / 100;
const TONES = { a: "var(--fg-a)", b: "var(--fg-b)", c: "var(--fg-c)" };

/* Text metrics, per CSS class (css/styles.css .fg-plab / .fg-flab / .fg-alab).
   Deliberately GENEROUS — measured in the browser (2026-08-22) the real
   per-character widths are 4,9 / 9,6 / 5,5 px and the real heights 14 / 17 / 14,
   but a label also carries a 3,5 px halo and the app's web font may load wider
   than the fallback, so every box is over-estimated rather than under. */
const PLAB = { cw: 6.5, h: 17 };     // coordinate labels — 10,5px bold
const FLAB = { cw: 9.5, h: 21 };     // curve names        — 13px bold italic
const ALAB = { cw: 6.5, h: 18 };     // asymptote captions — 10,5px italic

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg fg ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const text = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

/* resolve the window → affine transform + helpers */
export function computeFunction(spec) {
  const W = spec.w || 360, H = spec.h || 300;
  const padL = 16, padR = 16, padT = 14, padB = 16;
  const { xmin, xmax, ymin, ymax } = spec.win;
  const sx = (W - padL - padR) / (xmax - xmin);
  const sy = (H - padT - padB) / (ymax - ymin);
  const X = (x) => padL + (x - xmin) * sx;
  const Y = (y) => H - padB - (y - ymin) * sy;
  return { W, H, sx, sy, X, Y, win: spec.win, padL, padR, padT, padB };
}

/* sample one curve into clipped polyline segments (breaks at the hyperbola
   asymptote and whenever the curve leaves the vertical window, so we never
   draw a false near-vertical connector) */
function curvePaths(cv, g) {
  const f = makeFn(cv);
  const { xmin, xmax, ymin, ymax } = g.win;
  const span = ymax - ymin, lo = ymin - span * 0.6, hi = ymax + span * 0.6;
  const breaks = cv.kind === "hyperbola" ? [cv.p] : [];
  const segs = [];
  let cur = [];
  const STEPS = 360, dx = (xmax - xmin) / STEPS;
  let prevY = null;
  for (let i = 0; i <= STEPS; i++) {
    const x = xmin + i * dx;
    if (breaks.some((b) => Math.abs(x - b) < dx * 0.5)) { if (cur.length > 1) segs.push(cur); cur = []; prevY = null; continue; }
    const y = f(x);
    if (!Number.isFinite(y) || y < lo || y > hi) { if (cur.length > 1) segs.push(cur); cur = []; prevY = null; continue; }
    cur.push([g.X(x), g.Y(Math.max(ymin - span * 0.55, Math.min(ymax + span * 0.55, y)))]);
    prevY = y;
  }
  if (cur.length > 1) segs.push(cur);
  return segs.map((s) => "M " + s.map(([px, py]) => `${N(px)} ${N(py)}`).join(" L "));
}

export function renderFunction(spec) {
  const g = computeFunction(spec);
  const { W, H, X, Y, win } = g;
  const { xmin, xmax, ymin, ymax } = win;
  let out = "";

  // ---- light integer grid ----
  if (spec.grid) {
    let gl = "";
    for (let x = Math.ceil(xmin); x <= xmax; x++) gl += `<line class="fg-grid" x1="${N(X(x))}" y1="${N(Y(ymin))}" x2="${N(X(x))}" y2="${N(Y(ymax))}"/>`;
    for (let y = Math.ceil(ymin); y <= ymax; y++) gl += `<line class="fg-grid" x1="${N(X(xmin))}" y1="${N(Y(y))}" x2="${N(X(xmax))}" y2="${N(Y(y))}"/>`;
    out += gl;
  }

  // ---- shaded vertical bands (inequality x-interval) ----
  (spec.shades || []).forEach((s) => {
    const x0 = Math.max(s.x0, xmin), x1 = Math.min(s.x1, xmax);
    out += `<rect class="fg-shade" x="${N(X(x0))}" y="${N(Y(ymax))}" width="${N(X(x1) - X(x0))}" height="${N(Y(ymin) - Y(ymax))}"/>`;
  });

  // ---- asymptotes (dashed) ----
  (spec.asymptotes || []).forEach((a) => {
    if (a.x !== undefined) out += `<line class="fg-asym" x1="${N(X(a.x))}" y1="${N(Y(ymin))}" x2="${N(X(a.x))}" y2="${N(Y(ymax))}"/>`;
    if (a.y !== undefined) out += `<line class="fg-asym" x1="${N(X(xmin))}" y1="${N(Y(a.y))}" x2="${N(X(xmax))}" y2="${N(Y(a.y))}"/>`;
  });

  // ---- axes with arrowheads (the x / y / O LETTERS are placed at the end,
  //      through the same placer as every other piece of text) ----
  const x0px = X(0), y0px = Y(0);
  const showY = xmin <= 0 && xmax >= 0, showX = ymin <= 0 && ymax >= 0;
  if (showX) {
    out += `<line class="fg-axis" x1="${N(X(xmin))}" y1="${N(y0px)}" x2="${N(X(xmax))}" y2="${N(y0px)}"/>`;
    out += `<path class="fg-arrow" d="M ${N(X(xmax))} ${N(y0px)} l -7 -3.5 l 0 7 z"/>`;
    out += `<path class="fg-arrow" d="M ${N(X(xmin))} ${N(y0px)} l 7 -3.5 l 0 7 z"/>`;
  }
  if (showY) {
    out += `<line class="fg-axis" x1="${N(x0px)}" y1="${N(Y(ymin))}" x2="${N(x0px)}" y2="${N(Y(ymax))}"/>`;
    out += `<path class="fg-arrow" d="M ${N(x0px)} ${N(Y(ymax))} l -3.5 7 l 7 0 z"/>`;
    out += `<path class="fg-arrow" d="M ${N(x0px)} ${N(Y(ymin))} l -3.5 -7 l 7 0 z"/>`;
  }

  // ---- the curves (paths only — their NAMES are placed at the end) ----
  (spec.curves || []).forEach((cv) => {
    const stroke = cv.tone ? TONES[cv.tone] : "var(--accent)";
    curvePaths(cv, g).forEach((d) => {
      out += `<path class="fg-curve${cv.dash ? " dash" : ""}" d="${d}" style="stroke:${stroke}"/>`;
    });
  });

  // ---- vertical boundary lines (inequalities) ----
  (spec.vlines || []).forEach((v) => {
    out += `<line class="fg-vline" x1="${N(X(v.x))}" y1="${N(Y(ymin))}" x2="${N(X(v.x))}" y2="${N(Y(ymax))}"/>`;
  });

  // ---- a vertical segment between two curves (max/min length) ----
  let segLabel = null;
  if (spec.segment) {
    const s = spec.segment, f = makeFn(spec.curves[s.fromCurve]), h = makeFn(spec.curves[s.toCurve]);
    const yA = f(s.x), yB = h(s.x);
    out += `<line class="fg-seg" x1="${N(X(s.x))}" y1="${N(Y(yA))}" x2="${N(X(s.x))}" y2="${N(Y(yB))}"/>`;
    out += `<circle class="fg-dot" cx="${N(X(s.x))}" cy="${N(Y(yA))}" r="2.6"/>`;
    out += `<circle class="fg-dot" cx="${N(X(s.x))}" cy="${N(Y(yB))}" r="2.6"/>`;
    if (s.label) segLabel = { px: X(s.x), py: (Y(yA) + Y(yB)) / 2, label: String(s.label) };
  }

  // ---- marked points (intercepts / TP / intersections) ----
  // dots + drop-lines first; the labels go through the shared placer below.
  const labelReqs = [];
  (spec.points || []).forEach((p) => {
    const px = X(p.x), py = Y(p.y);
    if (p.dashTo === "x" || p.dashTo === "both") out += `<line class="fg-drop" x1="${N(px)}" y1="${N(py)}" x2="${N(px)}" y2="${N(Y(0))}"/>`;
    if (p.dashTo === "y" || p.dashTo === "both") out += `<line class="fg-drop" x1="${N(px)}" y1="${N(py)}" x2="${N(X(0))}" y2="${N(py)}"/>`;
    out += `<circle class="fg-dot${p.open ? " open" : ""}" cx="${N(px)}" cy="${N(py)}" r="3.2"/>`;
    if (p.label != null) labelReqs.push({ px, py, label: String(p.label), place: p.place });
  });

  // ---- ALL the text, one placer, most-constrained first ----
  const P = makePlacer(spec, g, []);
  out += placeAxisLetters(spec, g, P, { showX, showY });
  out += placeAsymptoteLabels(spec, g, P);
  out += placeCurveNames(spec, g, P);
  if (segLabel) out += placeSegmentLabel(segLabel, g, P);
  out += placePointLabels(labelReqs, g, P);

  return svgWrap(W, H, spec.accent, out, spec.tap ? "fg-tappable" : "");
}

/* ----------------------------------------------------------------
   THE PLACER — one shared obstacle model for every label.
   ---------------------------------------------------------------- */

/* How bad it is for a label to sit over each kind of stroke. Nothing may sit
   over a SOLID line if any candidate slot avoids it; a dashed guide line is
   the one a haloed label can live with when the picture leaves no clean slot. */
const WEIGHT = { curve: 4, axis: 4, segment: 3, dashed: 1 };

/* sample a straight pixel run into obstacle points (one every ~4 px).
   `src` tags WHICH stroke the point belongs to, so a placement can ignore
   one particular stroke — the x letter is SUPPOSED to sit beside the
   x-axis arrow, so it must not count its own axis as an obstacle. */
function samplePx(x1, y1, x2, y2, out, w = 1, src = "other", step = 4) {
  if (![x1, y1, x2, y2].every(Number.isFinite)) return;
  const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step));
  for (let i = 0; i <= n; i++) out.push({ x: x1 + ((x2 - x1) * i) / n, y: y1 + ((y2 - y1) * i) / n, w, src });
}

/* every stroke a label must stay off: the curves, both axes, the asymptote
   lines, the inequality boundary lines, and the PQ-style segment. */
function obstaclePoints(spec, g) {
  const { X, Y, win } = g;
  const { xmin, xmax, ymin, ymax } = win;
  const pts = [];

  (spec.curves || []).forEach((cv) => {
    const f = makeFn(cv), STEPS = 240, dx = (xmax - xmin) / STEPS;
    for (let i = 0; i <= STEPS; i++) {
      const x = xmin + i * dx;
      if (cv.kind === "hyperbola" && Math.abs(x - cv.p) < dx) continue;
      const y = f(x);
      if (!Number.isFinite(y) || y < ymin || y > ymax) continue;
      /* a DASHED curve (a drawn axis of symmetry, a tangent, a family
         boundary) is a GUIDE line, so it ranks like one: a haloed label may
         live on it when the picture leaves no clean slot, exactly as it may
         on an asymptote. It still blocks any slot that could be fully clear. */
      pts.push({ x: X(x), y: Y(y), w: cv.dash ? WEIGHT.dashed : WEIGHT.curve, src: "curve" });
    }
  });

  if (ymin <= 0 && ymax >= 0) samplePx(X(xmin), Y(0), X(xmax), Y(0), pts, WEIGHT.axis, "xaxis");   // x-axis
  if (xmin <= 0 && xmax >= 0) samplePx(X(0), Y(ymin), X(0), Y(ymax), pts, WEIGHT.axis, "yaxis");   // y-axis

  (spec.asymptotes || []).forEach((a) => {
    if (a.x !== undefined) samplePx(X(a.x), Y(ymin), X(a.x), Y(ymax), pts, WEIGHT.dashed, "asym");
    if (a.y !== undefined) samplePx(X(xmin), Y(a.y), X(xmax), Y(a.y), pts, WEIGHT.dashed, "asym");
  });
  (spec.vlines || []).forEach((v) => samplePx(X(v.x), Y(ymin), X(v.x), Y(ymax), pts, WEIGHT.dashed, "vline"));

  if (spec.segment && spec.curves) {
    const s = spec.segment, a = spec.curves[s.fromCurve], b = spec.curves[s.toCurve];
    if (a && b) samplePx(X(s.x), Y(makeFn(a)(s.x)), X(s.x), Y(makeFn(b)(s.x)), pts, WEIGHT.segment, "segment");
  }

  return pts.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

const PAD = 2;   // slack around a label box (the text has a halo)

function makePlacer(spec, g, obstacles = []) {
  const { W, H } = g;
  const strokes = obstaclePoints(spec, g);
  const placed = obstacles.slice();
  const inFrame = (b) => b[0] >= 2 && b[2] <= W - 2 && b[1] >= 2 && b[3] <= H - 2;
  const olArea = (b, q) => Math.max(0, Math.min(b[2], q[2]) - Math.max(b[0], q[0])) * Math.max(0, Math.min(b[3], q[3]) - Math.max(b[1], q[1]));
  const overBoxes = (b) => placed.some((q) => !(b[2] < q[0] || b[0] > q[2] || b[3] < q[1] || b[1] > q[3]));
  const inBox = (p, b) => p.x >= b[0] - PAD && p.x <= b[2] + PAD && p.y >= b[1] - PAD && p.y <= b[3] + PAD;
  /* `ig` (optional) is a Set of stroke `src` tags this particular placement is
     allowed to sit on — only the axis letters use it, each ignoring its OWN
     axis (an x that dodged the x-axis would have nowhere left to go). */
  const overStroke = (b, ig) => strokes.some((p) => (!ig || !ig.has(p.src)) && inBox(p, b));
  const hits = (b, ig) => strokes.reduce((n, p) => n + ((!ig || !ig.has(p.src)) && inBox(p, b) ? p.w : 0), 0);
  const score = (b, ig) => placed.reduce((s, q) => s + olArea(b, q), 0) + (inFrame(b) ? 0 : 1e5) + hits(b, ig) * 4;
  /* 1) the first candidate that is fully clear (in frame, off every stroke, off
        every label already placed);
     2) failing that, of the candidates that are in frame and off the other
        labels, the one the FEWEST strokes run through — ties keep the earlier
        (more preferred) slot;
     3) failing even that, the least-bad in-frame candidate. */
  const leastCrossed = (list, ig) => {
    let best = null, bestN = Infinity;
    list.forEach((c) => { const n = hits(c.box, ig); if (n < bestN) { best = c; bestN = n; } });
    return best;
  };
  const choose = (cands, ig) =>
    cands.find((c) => inFrame(c.box) && !overStroke(c.box, ig) && !overBoxes(c.box)) ||
    leastCrossed(cands.filter((c) => inFrame(c.box) && !overBoxes(c.box)), ig) ||
    cands.slice().sort((a, b) => score(a.box, ig) - score(b.box, ig))[0];
  return { inFrame, overBoxes, overStroke, leastCrossed, score, choose, claim: (b) => placed.push(b) };
}

/* centred box helper */
const cbox = (cx, cy, w, h) => [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
const mid = (cx, cy, w, h) => ({ cx, cy, box: cbox(cx, cy, w, h) });

/* ---- 0. the axis letters x / y / O ------------------------------
   (SESSION 2a-FIX, 2026-08-22.) These used to be drawn at fixed spots
   and merely REGISTERED as obstacles, so a curve rising through the
   top of the window near the y-axis was drawn straight over the y.
   They now go through the same placer as everything else, FIRST —
   they are the most constrained text on the picture, since each one
   belongs to one arrow tip.
     y : right of the tip, then left of it, then a little lower on
         each side;
     x : above the tip, then below it, then the same two slid left;
     O : the four quadrant corners of the origin.
   Each letter ignores its OWN axis as an obstacle (it is meant to sit
   beside that line) but must still be in frame and clear of curves,
   asymptotes, boundary lines and every other label. */
const AX_IGNORE = { x: new Set(["xaxis"]), y: new Set(["yaxis"]), O: new Set(["xaxis", "yaxis"]) };
function placeAxisLetters(spec, g, P, { showX, showY }) {
  const { X, Y, win } = g;
  const x0px = X(0), y0px = Y(0);
  const LW = 15, LH = 17;
  let out = "";
  const put = (letter, cands) => {
    const c = P.choose(cands, AX_IGNORE[letter]);
    P.claim(c.box);
    out += text(c.cx, c.cy, letter, "fg-axlab");
  };

  if (showY) {
    const top = Y(win.ymax), cands = [];
    [4, 18, 32, 48].forEach((d) => {
      cands.push(mid(x0px + 9, top + d, LW, LH));   // right of the tip
      cands.push(mid(x0px - 9, top + d, LW, LH));   // left of it
    });
    put("y", cands);
  }
  if (showX) {
    const right = X(win.xmax), cands = [];
    [4, 18, 32].forEach((dx) => {
      cands.push(mid(right - dx, y0px - 9, LW, LH));   // above the tip
      cands.push(mid(right - dx, y0px + 13, LW, LH));  // below it
    });
    put("x", cands);
  }
  if (showX && showY) {
    const cands = [
      mid(x0px - 8, y0px + 10, LW, LH),   // the four quadrant corners of O
      mid(x0px + 8, y0px + 10, LW, LH),
      mid(x0px - 8, y0px - 10, LW, LH),
      mid(x0px + 8, y0px - 10, LW, LH),
    ];
    put("O", cands);
  }
  return out;
}

/* ---- 1. asymptote (and boundary-line) captions ------------------
   A VERTICAL asymptote's caption sits near the TOP of its line, just
   to the RIGHT of it (left if that falls out of frame or is blocked),
   sliding down the line if both sides are busy.
   A HORIZONTAL asymptote's caption sits near the RIGHT end of its
   line, just ABOVE it (below if blocked), sliding left if both are.
   A `vlines` entry (an inequality boundary / an axis of symmetry) with
   a `label` is captioned EXACTLY like a vertical asymptote — same
   slots, same style — added SESSION 2a-FIX so a revealed answer line
   can say what it is.
   ---------------------------------------------------------------- */
function placeAsymptoteLabels(spec, g, P) {
  const { X, Y, win } = g;
  let out = "";
  const lines = (spec.asymptotes || []).concat((spec.vlines || []).filter((v) => v && v.label != null));
  lines.forEach((a) => {
    if (a.label == null) return;
    const s = String(a.label);
    const w = s.length * ALAB.cw + 6, h = ALAB.h;
    const cands = [];
    if (a.x !== undefined) {
      /* ALL the right-hand slots first, then all the left-hand ones — never
         interleaved (SESSION 2a-FIX). Two vertical lines close together used
         to end up with one caption on each other's side, stacked in the gap
         between them, so neither said which line it belonged to. Sliding a
         caption DOWN its own line always reads; swapping its side does not.
         Eight rungs, because an exponential or a hyperbola branch can hug one
         side of a line for most of the window's height. */
      const lx = X(a.x), top = Y(win.ymax);
      const RUNGS = [11, 28, 45, 62, 79, 96, 113, 130];
      RUNGS.forEach((d) => cands.push(mid(lx + 6 + w / 2, top + d, w, h)));   // right of the line
      RUNGS.forEach((d) => cands.push(mid(lx - 6 - w / 2, top + d, w, h)));   // left of it
    } else if (a.y !== undefined) {
      /* Above-or-below alternating, sliding LEFT along the line. Seven rungs
         reach the far end of the plot, which is what a graph that hugs its own
         horizontal asymptote (every exponential) needs: near the right there is
         no clear air above the line and the x-axis is often just below it. */
      const ly = Y(a.y), right = X(win.xmax);
      [0, 46, 92, 138, 184, 230, 276].forEach((d) => {
        cands.push(mid(right - 4 - w / 2 - d, ly - 11, w, h));   // above the line
        cands.push(mid(right - 4 - w / 2 - d, ly + 11, w, h));   // below it
      });
    } else return;
    const c = P.choose(cands);
    P.claim(c.box);
    out += text(c.cx, c.cy, s, "fg-alab");
  });
  return out;
}

/* ---- 2. curve names --------------------------------------------
   The name is set on the curve's NORMAL (perpendicular) at `labelAt`,
   just far enough off the curve that its own box clears the curve (see
   clearOf below — 13 px for a single letter, ~43 px for a full equation
   on a 45° line), on the side that points UP the page (for a
   near-vertical curve, the side that points RIGHT). If that side is
   out of frame or busy, the other side is tried, then the same two 7
   and 14 px further out. Last resort is the engine's old fixed (+10, −6).
   ---------------------------------------------------------------- */
function placeCurveNames(spec, g, P) {
  const { X, Y, win } = g;
  let out = "";
  (spec.curves || []).forEach((cv) => {
    if (!cv.label || cv.labelAt === undefined) return;
    const f = makeFn(cv), lx = cv.labelAt, ly = f(lx);
    if (!Number.isFinite(ly) || ly < win.ymin || ly > win.ymax) return;
    const px = X(lx), py = Y(ly);
    const s = String(cv.label);
    const w = Math.max(s.length * FLAB.cw, 11) + 6, h = FLAB.h;

    // tangent → the two unit normals, in PIXEL space
    const hx = Math.max(1e-6, (win.xmax - win.xmin) / 4000);
    let m = (f(lx + hx) - f(lx - hx)) / (2 * hx);
    if (!Number.isFinite(m)) m = 0;
    // the label goes on the side of the curve that points UP the page; for a
    // near-vertical curve (a hyperbola branch hugging its asymptote) "up" is
    // meaningless, so it goes on the side pointing RIGHT.
    const preferred = (n) => (Math.abs(n.y) < 0.3 ? n.x > 0 : n.y < 0);

    /* candidates: both normals at 13 / 20 / 27 px, and — if the picture is so
       busy that none of those is clean — the same fan taken a short way along
       the curve either side of labelAt (±4 % and ±8 % of the window width), so
       a name pinned against an axis can step aside instead of sitting on it. */
    /* How far along the normal the label's CENTRE has to sit before its box
       stops touching the curve: for an axis-aligned box of half-width a and
       half-height b, the box clears a line with unit normal n once the centre
       is further than a·|nx| + b·|ny| from it. A one-letter name (a ≈ 8) needs
       ~13 px whatever the slope — the old fixed number — but a NAMED LINE like
       "y = −x − 1" is 50 px half-wide, and on a 45° line it needs 43. That is
       why every long name used to be drawn with its own line ruled through it
       (SESSION 2a-FIX). */
    const clearOf = (n) => Math.max(13, (w / 2) * Math.abs(n.x) + (h / 2) * Math.abs(n.y) + 3);
    const cands = [];
    const fan = (ax, ay, tan) => {
      let ntx = g.sx, nty = -g.sy * tan;
      const nl = Math.hypot(ntx, nty) || 1; ntx /= nl; nty /= nl;
      const a1 = { x: -nty, y: ntx }, a2 = { x: nty, y: -ntx };
      const ss = preferred(a1) ? [a1, a2] : [a2, a1];
      [0, 7, 14].forEach((k) => ss.forEach((n) => {
        const d = clearOf(n) + k;
        cands.push(mid(ax + n.x * d, ay + n.y * d, w, h));
      }));
    };
    fan(px, py, m);
    const span = win.xmax - win.xmin;
    [0.04, -0.04, 0.08, -0.08].forEach((k) => {
      const sx2 = lx + k * span, sy2 = f(sx2);
      if (!Number.isFinite(sy2) || sy2 < win.ymin || sy2 > win.ymax) return;
      if (sx2 < win.xmin || sx2 > win.xmax) return;
      // never hop across a hyperbola's vertical asymptote onto the other branch
      if (cv.kind === "hyperbola" && Math.sign(sx2 - cv.p) !== Math.sign(lx - cv.p)) return;
      let m2 = (f(sx2 + hx) - f(sx2 - hx)) / (2 * hx);
      if (!Number.isFinite(m2)) m2 = 0;
      fan(X(sx2), Y(sy2), m2);
    });
    cands.push(mid(px + 10, py - 6, w, h));               // the engine's old offset
    const c = P.choose(cands);
    P.claim(c.box);
    const stroke = cv.tone ? TONES[cv.tone] : "var(--accent)";
    out += `<text class="fg-flab" x="${N(c.cx)}" y="${N(c.cy)}" text-anchor="middle" dominant-baseline="middle" style="fill:${stroke}">${s}</text>`;
  });
  return out;
}

/* ---- 3. the PQ-style segment's own name ------------------------- */
function placeSegmentLabel(req, g, P) {
  const s = req.label, w = Math.max(s.length * FLAB.cw, 11) + 6, h = FLAB.h;
  const cands = [];
  [8, 20, 32].forEach((d) => {
    cands.push(mid(req.px + d + w / 2, req.py, w, h));
    cands.push(mid(req.px - d - w / 2, req.py, w, h));
  });
  const c = P.choose(cands);
  P.claim(c.box);
  return text(c.cx, c.cy, s, "fg-flab");
}

/* ---- 4. coordinate labels --------------------------------------
   Each label tries a ring of eight slots around its dot and takes the
   first that stays in frame, off every stroke (curves, axes,
   asymptotes, boundary lines, the segment) and off every label placed
   before it.
   ---------------------------------------------------------------- */
function placePointLabels(reqs, g, P) {
  if (!reqs.length) return "";
  const CW = PLAB.cw, CH = PLAB.h, GAP = 8;
  const slot = (px, py, w) => ({
    above:      { x: px, y: py - 13, a: "middle", bx: px - w / 2 },
    aboveRight: { x: px + GAP, y: py - 13, a: "start", bx: px + GAP },
    aboveLeft:  { x: px - GAP, y: py - 13, a: "end", bx: px - GAP - w },
    right:      { x: px + GAP, y: py, a: "start", bx: px + GAP },
    left:       { x: px - GAP, y: py, a: "end", bx: px - GAP - w },
    below:      { x: px, y: py + 14, a: "middle", bx: px - w / 2 },
    belowRight: { x: px + GAP, y: py + 14, a: "start", bx: px + GAP },
    belowLeft:  { x: px - GAP, y: py + 14, a: "end", bx: px - GAP - w },
  });
  const DEFAULT = ["above", "aboveRight", "aboveLeft", "right", "left", "below", "belowRight", "belowLeft"];
  const withBox = (s, w) => ({ ...s, box: [s.bx, s.y - CH / 2, s.bx + w, s.y + CH / 2] });

  // a point with a placement preference (e.g. a turning point → "above") is laid
  // down first so it claims its spot before the other labels flow around it.
  const ordered = reqs.map((r, i) => ({ r, i })).sort((a, b) => (b.r.place ? 1 : 0) - (a.r.place ? 1 : 0));
  const drawn = new Array(reqs.length);
  ordered.forEach(({ r, i }) => {
    const w = r.label.length * CW, m = slot(r.px, r.py, w);
    const order = r.place && m[r.place] ? [r.place, ...DEFAULT.filter((k) => k !== r.place)] : DEFAULT;
    const opts = order.map((k) => withBox(m[k], w));
    /* An explicit preference (a turning point → "above") is honoured FIRST, and
       the two diagonals on the same side count as "on that side". But it is a
       preference, not a licence: SESSION 1b's order is
         1. a slot on the preferred side that is fully clear;
         2. failing that, ANY of the eight slots that is fully clear — a
            turning point in a narrow cup gets its coordinate written under the
            vertex rather than sliced in half by the parabola's own arms;
         3. failing that, the preferred side again, taking the least-crossed
            slot (the halo keeps it readable);
         4. failing even that, the placer's own fallback.
       Before this, step 2 did not exist and a wide TP coordinate was routinely
       drawn straight through the curve or the y-axis. */
    let chosen;
    if (r.place) {
      const prefKeys = r.place === "above" ? ["above", "aboveRight", "aboveLeft"]
        : r.place === "below" ? ["below", "belowRight", "belowLeft"] : [r.place];
      const prefOpts = prefKeys.filter((k) => m[k]).map((k) => withBox(m[k], w));
      const clear = (o) => P.inFrame(o.box) && !P.overStroke(o.box) && !P.overBoxes(o.box);
      chosen = prefOpts.find(clear) || opts.find(clear) ||
               P.leastCrossed(prefOpts.filter((o) => P.inFrame(o.box) && !P.overBoxes(o.box)));
    }
    chosen = chosen || P.choose(opts);
    P.claim(chosen.box);
    drawn[i] = text(chosen.x, chosen.y, r.label, "fg-plab", chosen.a);
  });
  return drawn.join("");
}

/* ============================================================
   VERIFY — prove the drawing is honest.
   ============================================================ */

/* How far inside the window a LABELLED point must sit, in maths units,
   on every side. A point sitting exactly on an edge has nowhere to put
   its coordinate label and collides with the axis arrowheads / the x
   and y letters that live in the corners.

   WHY UNITS AND NOT PIXELS: a pixel rule reads better in principle, but
   measured against the live Functions chapter (40 000 generations of
   the four quest graph builders) the tightest real margin is 7,9 px —
   a tall parabola window is 34 units deep, so js/quests/_func.js's
   one-unit padding is only 7,9 px there. A 12 px rule would fail
   honest, already-shipped figures. 0,5 units is comfortably inside
   what winFor() always produces (worst case 1,0 unit) and still catches
   a hand-written exam spec that puts a label on the frame edge. */
const EDGE_MARGIN = 0.5;

export function verifyFunction(spec, tol = { onCurve: 0.02, asym: 1e-6 }) {
  const g = computeFunction(spec), r = [];
  const { xmin, xmax, ymin, ymax } = spec.win;

  // 1) window is valid
  r.push({ label: "window is valid (xmax>xmin, ymax>ymin)", ok: xmax > xmin && ymax > ymin });

  // 2) every curve is actually visible (≥2 in-window sample points)
  (spec.curves || []).forEach((cv, i) => {
    const segs = curvePaths(cv, g);
    const pts = segs.reduce((n, d) => n + (d.match(/L/g) || []).length + 1, 0);
    r.push({ label: `curve ${i} (${cv.kind}) is visible in the window`, ok: pts >= 2 });
  });

  // 3) every labelled point that names a curve really lies on that curve
  (spec.points || []).forEach((p) => {
    if (p.on == null) return;
    const idxs = Array.isArray(p.on) ? p.on : [p.on];
    idxs.forEach((i) => {
      const f = makeFn(spec.curves[i]);
      const y = f(p.x);
      const ok = Number.isFinite(y) && Math.abs(y - p.y) <= tol.onCurve * Math.max(1, Math.abs(p.y), ymax - ymin);
      r.push({ label: `point ${p.label || "(" + p.x + ";" + p.y + ")"} lies on curve ${i}`, ok });
    });
    // point inside the frame
    r.push({ label: `point ${p.label || ""} sits inside the frame`, ok: p.x >= xmin - 1e-9 && p.x <= xmax + 1e-9 && p.y >= ymin - 1e-9 && p.y <= ymax + 1e-9 });
  });

  // 3b) a LABELLED point needs room for its label — no sitting on the frame edge
  (spec.points || []).forEach((p) => {
    if (p.label == null) return;
    const gap = Math.min(p.x - xmin, xmax - p.x, p.y - ymin, ymax - p.y);
    r.push({
      label: `labelled point ${p.label} sits at least ${String(EDGE_MARGIN).replace(".", ",")} units inside the window (it is ${String(Math.round(gap * 100) / 100).replace(".", ",")} from the nearest edge — widen win)`,
      ok: gap >= EDGE_MARGIN - 1e-9,
    });
  });

  // 4) declared asymptotes match the curve they belong to
  (spec.asymptotes || []).forEach((a) => {
    if (a.of == null) return;
    const cv = spec.curves[a.of];
    if (a.x !== undefined) r.push({ label: `vertical asymptote x=${a.x} matches curve ${a.of}`, ok: cv.kind === "hyperbola" && Math.abs(cv.p - a.x) <= tol.asym });
    if (a.y !== undefined) r.push({ label: `horizontal asymptote y=${a.y} matches curve ${a.of}`, ok: Math.abs(cv.q - a.y) <= tol.asym });
  });

  // 5) a vertical segment's endpoints sit on the two named curves (structural — always true via one map)
  if (spec.segment) {
    const s = spec.segment;
    r.push({ label: "segment spans two real curves", ok: !!spec.curves[s.fromCurve] && !!spec.curves[s.toCurve] && s.fromCurve !== s.toCurve });
  }

  return r;
}
