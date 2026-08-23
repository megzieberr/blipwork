/* ============================================================
   TRIG-GRAPH ENGINE  (Trig Graphs chapter)   ★ accuracy-critical
   ------------------------------------------------------------
   Plots sine, cosine and tangent graphs on a DEGREE-axis plane,
   GENUINELY TO SCALE. The quest hands in real equations plus a
   window {xmin,xmax,ymin,ymax} (x in degrees); this engine fits
   that window to the viewBox with ONE affine map
     px = padL + (x − xmin)·sx        py = H − padB − (y − ymin)·sy
   so EVERY feature — curve, peak, trough, asymptote, marked point,
   period/amplitude measure — is placed by the same transform.

   Because of that single map, verify() can prove the picture can't
   lie:  the plotted curve actually reaches q±a (amplitude & midline
   honest), one period really spans 360°/b (or 180°/b) of pixels,
   tan asymptotes sit exactly where cos(b(x−p)) = 0, and every
   labelled point that names a curve really lies on it.

   spec: {
     type:"trigg",
     win:{ xmin, xmax, ymin, ymax },      // x in DEGREES
     xstep?, ystep?,                       // tick spacing (auto if omitted)
     curves:[ { fn, a, b, p, q, tone?:"a"|"b", dash?, label?, labelAt? } ],
     showAsym?:true,                       // auto dashed verticals for tan curves
     midline?:{ y },                       // dashed horizontal y = q
     shades?:[ { x0, x1 } ],               // translucent band over an x-interval
     vlines?:[ { x, label? } ],            // dashed vertical boundary; `label`
                                           // is captioned in the band UNDER
                                           // the picture, not beside the line
     hlines?:[ { y, label? } ],            // dashed horizontal boundary; `label`
                                           // is captioned beside its own line
     points?:[ { x, y, label?, on?, open?, dashTo?:"x"|"y"|"both", place? } ],
     hmeasure?:{ x0, x1, y, label? },      // horizontal span arrow (a period)
     vmeasure?:{ x, y0, y1, label? },      // vertical span arrow (an amplitude)
     grid?:true, w?, h?, accent?,
     tap?:{ targets, correctId }
   }

   SHADES / VLINES / HLINES were added 2026-08-23 (EXAM-BUILD-DAY.md,
   session 0 plumbing) for Exam Focus's Trig Graphs cards — an
   inequality answer wants a shaded strip, and a revealed boundary or an
   axis of symmetry wants a captioned dashed line, exactly as
   js/engine/function-graph.js already draws them. STRICTLY ADDITIVE: a
   spec that carries none of the three renders byte-for-byte what it
   rendered before, so every live tg1–tg7 round is untouched.

   VERTICAL-LINE CAPTIONS LIVE UNDER THE PICTURE (2026-08-23, later the
   same day — her live review of the Exam Focus sketches: "put the x = 2
   labels BELOW the vertical lines and not on the sketch itself, it
   looks very cluttered"). A `vlines[].label` (and a vertical
   `asymptotes[].label`, should a spec ever hand one in) is drawn in a
   CAPTION BAND in the bottom padding: horizontally centred on its own
   line, clamped inside the frame, staggered onto a second row when two
   lines sit too close for their captions to share one. computeTrig
   GROWS padB by one row per caption row, BELOW the x-tick labels — the
   two live in different bands, the ticks hugging the axis and the
   captions hugging the frame's bottom edge — so they can never collide,
   not even when the x-axis itself is the bottom of the window.
   HORIZONTAL captions ("y = 3") are untouched. The same rule, the same
   constants and the same verify check as function-graph.js, because the
   two engines' figures have to read as one house.
   ============================================================ */
import { makeTrig, periodOf, amplitudeOf, tanAsymptotesIn } from "../tgraphlib.js";

const N = (v) => Math.round(v * 100) / 100;
const TONES = { a: "var(--tg-a)", b: "var(--tg-b)" };
const deg = (n) => `${String(n).replace(/-/g, "−")}°`;
/* Every caption this engine prints goes through here first: a hyphen
   typed in an author's label becomes the REAL minus (−, U+2212), the
   repo's standing rule for anything a learner reads (CLAUDE.md gotcha
   #5). Same normalisation the y-tick labels above already do — done in
   one place so a boundary line captioned "x = -45°" can never ship. */
const minus = (s) => String(s).replace(/-/g, "−");

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg tg ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const text = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

/* a "nice" x-tick step that splits the window into ~4–9 marks and,
   where possible, divides the curves' period so peaks land on ticks. */
function autoXStep(spec) {
  const { xmin, xmax } = spec.win, span = xmax - xmin;
  const periods = (spec.curves || []).map(periodOf);
  const cand = [15, 30, 45, 60, 90, 120, 180, 360];
  const divides = (s) => periods.every((P) => Math.abs(P / s - Math.round(P / s)) < 1e-6);
  // prefer a step that divides every period and yields 4–9 ticks
  const good = cand.filter((s) => span / s >= 3.5 && span / s <= 10 && divides(s));
  if (good.length) return good[Math.floor(good.length / 2)];
  const ok = cand.filter((s) => span / s >= 3.5 && span / s <= 10);
  if (ok.length) return ok[0];
  return Math.round(span / 6);
}

/* ----------------------------------------------------------------
   THE CAPTION BAND — where every "x = 90°" now lives.
   ----------------------------------------------------------------
   Deliberately the same numbers as js/engine/function-graph.js's own
   band (.tg-alab and .fg-alab are the same 10,5px italic), so a trig
   figure and a function figure sitting on the same Exam Focus card
   caption their vertical lines at exactly the same height.
   ---------------------------------------------------------------- */
const CAP_CW = 6.5, CAP_H = 18;   // .tg-alab metrics, generously over-estimated
const CAP_ROW = CAP_H + 1;        // one caption row, top to top
const CAP_EDGE = 2;               // clear air under the bottom row
const CAP_GAP = 6;                // clear air between two captions on a row
const BASE_PAD_B = 22;            // the bottom padding when there are no captions

/* every caption that NAMES A VERTICAL LINE, in draw order */
function verticalCaptions(spec) {
  const caps = [];
  (spec.asymptotes || []).forEach((a) => {
    if (a && a.x !== undefined && a.label != null) caps.push({ x: a.x, label: minus(a.label) });
  });
  (spec.vlines || []).forEach((v) => {
    if (v && v.x !== undefined && v.label != null) caps.push({ x: v.x, label: minus(v.label) });
  });
  return caps;
}

/* Lay them out in the band. HORIZONTAL geometry only (W, padL/padR and
   the window's degree range) — nothing here depends on padB, which is
   what lets the result decide how tall padB has to be. Rows fill left to
   right, first-free-row: row 0 is the row nearest the picture. */
export function captionLayout(spec) {
  const caps = verticalCaptions(spec);
  if (!caps.length) return { rows: 0, items: [] };
  const W = spec.w || 400, padL = 24, padR = 16;
  const { xmin, xmax } = spec.win;
  const sx = (W - padL - padR) / (xmax - xmin);
  const items = caps.map((c) => {
    const w = c.label.length * CAP_CW + 6;
    const lx = padL + (c.x - xmin) * sx;
    const lo = 2 + w / 2, hi = W - 2 - w / 2;
    const cx = hi < lo ? W / 2 : Math.min(hi, Math.max(lo, lx));   // never off an edge
    return { x: c.x, label: c.label, w, lx, cx, row: 0 };
  });
  const rows = [];
  items.slice().sort((a, b) => a.cx - b.cx).forEach((it) => {
    let r = 0;
    while (r < 8) {
      if (!rows[r]) rows[r] = [];
      if (!rows[r].some((o) => Math.abs(o.cx - it.cx) < (o.w + it.w) / 2 + CAP_GAP)) break;
      r++;
    }
    if (!rows[r]) rows[r] = [];
    rows[r].push(it);
    it.row = r;
  });
  return { rows: rows.length, items };
}

/* the band's boxes, in pixels — ONE source of truth, so what render()
   draws and what verify() measures can never drift apart. */
function captionBoxes(g) {
  const { H, capL } = g;
  if (!capL || !capL.items.length) return [];
  return capL.items.map((it) => {
    const cy = H - CAP_EDGE - CAP_ROW / 2 - (capL.rows - 1 - it.row) * CAP_ROW;
    return { ...it, cy, box: [it.cx - it.w / 2, cy - CAP_H / 2, it.cx + it.w / 2, cy + CAP_H / 2] };
  });
}

export function computeTrig(spec) {
  const W = spec.w || 400, H = spec.h || 300;
  const capL = captionLayout(spec);
  /* The ONLY thing that grows the bottom padding: one row per row of
     vertical-line captions. A spec with none keeps padB === 22, so every
     live tg1–tg7 / gt8 / gt10 round — none of which captions a vertical
     line — renders byte-for-byte what it rendered before. */
  const padL = 24, padR = 16, padT = 16, padB = BASE_PAD_B + capL.rows * CAP_ROW;
  const { xmin, xmax, ymin, ymax } = spec.win;
  const sx = (W - padL - padR) / (xmax - xmin);
  const sy = (H - padT - padB) / (ymax - ymin);
  const X = (x) => padL + (x - xmin) * sx;
  const Y = (y) => H - padB - (y - ymin) * sy;
  const xstep = spec.xstep || autoXStep(spec);
  const ystep = spec.ystep || 1;
  return { W, H, sx, sy, X, Y, win: spec.win, xstep, ystep, padL, padR, padT, padB, capL };
}

/* sample one curve into clipped polyline segments (breaks at tan
   asymptotes and whenever the curve leaves the vertical window, so we
   never draw a false near-vertical connector across an asymptote). */
function curvePaths(cv, g) {
  const f = makeTrig(cv);
  const { xmin, xmax, ymin, ymax } = g.win;
  const span = ymax - ymin;
  /* How far BELOW the window a curve may be drawn — the same rule, and the
     same reason, as js/engine/function-graph.js's curvePaths: normally a
     good slice of the window so a tan branch visibly runs off the picture,
     but capped to the plain part of the bottom padding the moment a CAPTION
     BAND exists, so no caption can have a curve ruled through it. With no
     band the two numbers are this engine's originals, unchanged. */
  const capRows = (g.capL && g.capL.rows) || 0;
  const under = capRows
    ? Math.min(span * 0.55, Math.max(2, BASE_PAD_B - CAP_EDGE - 2) / g.sy)
    : span * 0.55;
  const lo = capRows ? ymin - under - span * 0.05 : ymin - span * 0.6;
  const hi = ymax + span * 0.6;
  const breaks = cv.fn === "tan" ? tanAsymptotesIn(cv, xmin, xmax) : [];
  const STEPS = 720, dx = (xmax - xmin) / STEPS;
  const segs = []; let cur = [];
  for (let i = 0; i <= STEPS; i++) {
    const x = xmin + i * dx;
    if (breaks.some((b) => Math.abs(x - b) < dx * 0.75)) { if (cur.length > 1) segs.push(cur); cur = []; continue; }
    const y = f(x);
    if (!Number.isFinite(y) || y < lo || y > hi) { if (cur.length > 1) segs.push(cur); cur = []; continue; }
    cur.push([g.X(x), g.Y(Math.max(ymin - under, Math.min(ymax + span * 0.55, y)))]);
  }
  if (cur.length > 1) segs.push(cur);
  return segs.map((s) => "M " + s.map(([px, py]) => `${N(px)} ${N(py)}`).join(" L "));
}

/* all tan asymptotes across every tan curve, within the window */
function allAsymptotes(spec) {
  const { xmin, xmax } = spec.win;
  const xs = [];
  (spec.curves || []).forEach((cv) => { if (cv.fn === "tan") tanAsymptotesIn(cv, xmin, xmax).forEach((x) => xs.push(x)); });
  (spec.asymptotes || []).forEach((a) => { if (a.x !== undefined) xs.push(a.x); });
  return [...new Set(xs.map((x) => Math.round(x * 1e4) / 1e4))];
}

export function renderTrig(spec) {
  const g = computeTrig(spec);
  const { W, H, X, Y, win, xstep, ystep } = g;
  const { xmin, xmax, ymin, ymax } = win;
  let out = "";

  // ---- quadrant bands (General Trig round 2) ----
  // Light rects UNDER everything else, positioned by the very same X()
  // transform the curves use — so a band can never drift off the 90°
  // it claims to shade. Her p05 colours (①yellow ②blue ③green ④pink)
  // are passed in per band; the engine only places them.
  (spec.bands || []).forEach((b) => {
    const xa = X(Math.max(xmin, Math.min(b.x0, b.x1)));
    const xb = X(Math.min(xmax, Math.max(b.x0, b.x1)));
    if (!(xb > xa)) return;
    out += `<rect class="tg-band" x="${N(xa)}" y="${N(Y(ymax))}" width="${N(xb - xa)}" height="${N(Y(ymin) - Y(ymax))}" style="fill:${b.fill || "var(--accent)"}"/>`;
  });

  // ---- shaded x-interval bands (an inequality answer) ----
  // UNDER the curves, and under the grid, so the picture reads as "this
  // stretch of the x-axis", never as something drawn on top of the
  // graph. Clipped to the window, and placed by the very same X()/Y()
  // transform every curve uses, so a band can never claim a stretch it
  // does not cover. (Added 2026-08-23 — mirrors function-graph's
  // .fg-shade exactly, her cut-line-and-paint method made visible.)
  (spec.shades || []).forEach((sh) => {
    const x0 = Math.max(Math.min(sh.x0, sh.x1), xmin), x1 = Math.min(Math.max(sh.x0, sh.x1), xmax);
    if (!(x1 > x0)) return;
    out += `<rect class="tg-shade" x="${N(X(x0))}" y="${N(Y(ymax))}" width="${N(X(x1) - X(x0))}" height="${N(Y(ymin) - Y(ymax))}"/>`;
  });

  // ---- light grid ----
  if (spec.grid) {
    let gl = "";
    for (let x = Math.ceil(xmin / xstep) * xstep; x <= xmax + 1e-6; x += xstep)
      gl += `<line class="tg-grid" x1="${N(X(x))}" y1="${N(Y(ymax))}" x2="${N(X(x))}" y2="${N(Y(ymin))}"/>`;
    for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax + 1e-6; y += ystep)
      gl += `<line class="tg-grid" x1="${N(X(xmin))}" y1="${N(Y(y))}" x2="${N(X(xmax))}" y2="${N(Y(y))}"/>`;
    out += gl;
  }

  // ---- midline (dashed y = q) ----
  if (spec.midline && spec.midline.y !== undefined)
    out += `<line class="tg-mid" x1="${N(X(xmin))}" y1="${N(Y(spec.midline.y))}" x2="${N(X(xmax))}" y2="${N(Y(spec.midline.y))}"/>`;

  // ---- tan asymptotes (dashed verticals) ----
  if (spec.showAsym !== false) allAsymptotes(spec).forEach((x) => {
    if (x > xmin && x < xmax) out += `<line class="tg-asym" x1="${N(X(x))}" y1="${N(Y(ymax))}" x2="${N(X(x))}" y2="${N(Y(ymin))}"/>`;
  });

  // ---- axes with arrowheads + O ----
  const y0px = Y(0), x0px = X(0);
  const showX = ymin <= 0 && ymax >= 0, showY = xmin <= 0 && xmax >= 0;
  const axisY = showX ? y0px : Y(ymin);           // where x-tick labels live
  if (showX) {
    out += `<line class="tg-axis" x1="${N(X(xmin))}" y1="${N(y0px)}" x2="${N(X(xmax))}" y2="${N(y0px)}"/>`;
    out += `<path class="tg-arrow" d="M ${N(X(xmax))} ${N(y0px)} l -7 -3.5 l 0 7 z"/>`;
    out += `<path class="tg-arrow" d="M ${N(X(xmin))} ${N(y0px)} l 7 -3.5 l 0 7 z"/>`;
    out += text(X(xmax) - 3, y0px - 9, "x", "tg-axlab");
  }
  if (showY) {
    out += `<line class="tg-axis" x1="${N(x0px)}" y1="${N(Y(ymin))}" x2="${N(x0px)}" y2="${N(Y(ymax))}"/>`;
    out += `<path class="tg-arrow" d="M ${N(x0px)} ${N(Y(ymax))} l -3.5 7 l 7 0 z"/>`;
    out += `<path class="tg-arrow" d="M ${N(x0px)} ${N(Y(ymin))} l -3.5 -7 l 7 0 z"/>`;
    out += text(x0px + 9, Y(ymax) + 4, "y", "tg-axlab");
  }

  // ---- x ticks + degree labels ----
  for (let x = Math.ceil(xmin / xstep) * xstep; x <= xmax + 1e-6; x += xstep) {
    const xr = Math.round(x);
    if (xr === 0) continue;
    out += `<line class="tg-tick" x1="${N(X(x))}" y1="${N(axisY - 3)}" x2="${N(X(x))}" y2="${N(axisY + 3)}"/>`;
    out += text(X(x), axisY + 11, deg(xr), "tg-tlab");
  }
  // ---- y ticks + integer labels ----
  for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax + 1e-6; y += ystep) {
    const yr = Math.round(y * 100) / 100;
    if (Math.abs(yr) < 1e-9) continue;
    const lx = showY ? x0px - 6 : X(xmin) + 2;
    out += `<line class="tg-tick" x1="${N((showY ? x0px : X(xmin)) - 3)}" y1="${N(Y(y))}" x2="${N((showY ? x0px : X(xmin)) + 3)}" y2="${N(Y(y))}"/>`;
    out += text(lx, Y(y), String(yr).replace(/-/g, "−").replace(".", ","), "tg-tlab", "end");
  }
  if (showX && showY) out += text(x0px - 7, y0px + 10, "O", "tg-axlab");

  // ---- the curves ----
  (spec.curves || []).forEach((cv) => {
    const stroke = cv.tone ? TONES[cv.tone] : "var(--accent)";
    curvePaths(cv, g).forEach((d) => { out += `<path class="tg-curve${cv.dash ? " dash" : ""}" d="${d}" style="stroke:${stroke}"/>`; });
    if (cv.label && cv.labelAt !== undefined) {
      const f = makeTrig(cv), lx = cv.labelAt, ly = f(lx);
      if (Number.isFinite(ly) && ly >= ymin && ly <= ymax)
        out += `<text class="tg-flab" x="${N(X(lx) + 10)}" y="${N(Y(ly) - 7)}" text-anchor="middle" dominant-baseline="middle" style="fill:${stroke}">${cv.label}</text>`;
    }
  });

  // ---- dashed boundary lines + their captions (2026-08-23) ----
  // Drawn AFTER the curves, like function-graph's own vlines, so a
  // boundary the reveal is pointing at is not hidden under a graph.
  // A VERTICAL line's caption is NOT drawn here: it goes in the caption
  // band under the picture (see captionLayout above), because a caption
  // sitting beside its own line in the middle of the sketch is what she
  // called "very cluttered". A HORIZONTAL one still captions near the
  // RIGHT end, just above its line — a fixed slot, which is all this
  // engine needs: a trig question carries one or two of these, not eight.
  (spec.vlines || []).forEach((v) => {
    if (!(v.x >= xmin && v.x <= xmax)) return;
    out += `<line class="tg-vline" x1="${N(X(v.x))}" y1="${N(Y(ymin))}" x2="${N(X(v.x))}" y2="${N(Y(ymax))}"/>`;
  });
  (spec.hlines || []).forEach((h) => {
    if (!(h.y >= ymin && h.y <= ymax)) return;
    out += `<line class="tg-hline" x1="${N(X(xmin))}" y1="${N(Y(h.y))}" x2="${N(X(xmax))}" y2="${N(Y(h.y))}"/>`;
    if (h.label != null) out += text(X(xmax) - 4, Y(h.y) - 9, minus(h.label), "tg-alab", "end");
  });

  // ---- a horizontal span arrow (one period) ----
  if (spec.hmeasure) {
    const m = spec.hmeasure, yA = Y(m.y), xA = X(m.x0), xB = X(m.x1);
    out += `<line class="tg-measure" x1="${N(xA)}" y1="${N(yA)}" x2="${N(xB)}" y2="${N(yA)}"/>`;
    out += `<path class="tg-arrow tg-mar" d="M ${N(xA)} ${N(yA)} l 7 -3.5 l 0 7 z"/>`;
    out += `<path class="tg-arrow tg-mar" d="M ${N(xB)} ${N(yA)} l -7 -3.5 l 0 7 z"/>`;
    out += `<line class="tg-measure" x1="${N(xA)}" y1="${N(yA - 5)}" x2="${N(xA)}" y2="${N(yA + 5)}"/>`;
    out += `<line class="tg-measure" x1="${N(xB)}" y1="${N(yA - 5)}" x2="${N(xB)}" y2="${N(yA + 5)}"/>`;
    if (m.label) out += text((xA + xB) / 2, yA - 9, m.label, "tg-mlab");
  }
  // ---- a vertical span arrow (an amplitude / max-min) ----
  if (spec.vmeasure) {
    const m = spec.vmeasure, xA = X(m.x), yA = Y(m.y0), yB = Y(m.y1);
    out += `<line class="tg-measure" x1="${N(xA)}" y1="${N(yA)}" x2="${N(xA)}" y2="${N(yB)}"/>`;
    out += `<path class="tg-arrow tg-mar" d="M ${N(xA)} ${N(yA)} l -3.5 -7 l 7 0 z"/>`;
    out += `<path class="tg-arrow tg-mar" d="M ${N(xA)} ${N(yB)} l -3.5 7 l 7 0 z"/>`;
    if (m.label) out += text(xA + 12, (yA + yB) / 2, m.label, "tg-mlab", "start");
  }

  // ---- marked points (peaks / troughs / intersections) ----
  (spec.points || []).forEach((p) => {
    const px = X(p.x), py = Y(p.y);
    if (p.dashTo === "x" || p.dashTo === "both") out += `<line class="tg-drop" x1="${N(px)}" y1="${N(py)}" x2="${N(px)}" y2="${N(showX ? y0px : Y(ymin))}"/>`;
    if (p.dashTo === "y" || p.dashTo === "both") out += `<line class="tg-drop" x1="${N(px)}" y1="${N(py)}" x2="${N(showY ? x0px : X(xmin))}" y2="${N(py)}"/>`;
    out += `<circle class="tg-dot${p.open ? " open" : ""}" cx="${N(px)}" cy="${N(py)}" r="3.2"/>`;
    if (p.label != null) {
      const above = p.place ? p.place === "above" : py > H / 2;
      /* A "below" label on a point sitting on the window's own bottom edge
         would be written into the caption band. This engine has no placer to
         dodge with, so it flips such a label to the other side of its dot —
         the band belongs to the captions and to nothing else. */
      const bandTop = g.capL.rows ? H - CAP_EDGE - g.capL.rows * CAP_ROW : Infinity;
      const ly = !above && py + 13 + CAP_H / 2 > bandTop ? py - 11 : py + (above ? -11 : 13);
      out += text(px, ly, p.label, "tg-plab");
    }
  });

  // ---- the caption band: every vertical line's name, under the picture ----
  captionBoxes(g).forEach((c) => { out += text(c.cx, c.cy, c.label, "tg-alab"); });

  return svgWrap(W, H, spec.accent, out, spec.tap ? "tg-tappable" : "");
}

/* ============================================================
   VERIFY — prove the drawing is honest & to scale.
   ============================================================ */
export function verifyTrig(spec, tol = { onCurve: 0.03 }) {
  const g = computeTrig(spec), r = [];
  const { xmin, xmax, ymin, ymax } = spec.win;
  const { X, Y, sx, sy } = g;

  // 1) window valid
  r.push({ label: "window is valid (xmax>xmin, ymax>ymin)", ok: xmax > xmin && ymax > ymin });

  // 2) one affine map: pixel spacing is linear in x and in y (can't secretly bend)
  r.push({ label: "x-axis is linear (one pixels-per-degree)", ok: Math.abs((X(xmin + 100) - X(xmin)) - 100 * sx) < 1e-6 });
  r.push({ label: "y-axis is linear (one pixels-per-unit)", ok: Math.abs((Y(ymin) - Y(ymin + 1)) - sy) < 1e-6 });

  // 3) every curve is visible (≥2 in-window sample points)
  (spec.curves || []).forEach((cv, i) => {
    const pts = curvePaths(cv, g).reduce((n, d) => n + (d.match(/L/g) || []).length + 1, 0);
    r.push({ label: `curve ${i} (${cv.fn}) is visible in the window`, ok: pts >= 2 });
  });

  // 4) sin/cos curves really reach q±a within the window (amplitude & midline honest);
  //    tan curves blow up at exactly their asymptotes (asymptotes honest).
  (spec.curves || []).forEach((cv, i) => {
    const f = makeTrig(cv);
    if (cv.fn === "tan") {
      const asy = tanAsymptotesIn(cv, xmin, xmax);
      const span = xmax - xmin;
      const okAsy = asy.length === 0 || asy.every((x) => {
        const e = span * 1e-4;
        return Math.abs(f(x - e)) > 50 && Math.abs(f(x + e)) > 50;     // shoots to ±∞ either side
      });
      r.push({ label: `curve ${i} (tan) blows up at its asymptotes`, ok: okAsy });
    } else {
      const A = amplitudeOf(cv), q = cv.q || 0, P = periodOf(cv);
      if (xmax - xmin >= P - 1e-6) {                                   // a full period is on screen
        let mn = Infinity, mx = -Infinity;
        for (let x = xmin; x <= xmax; x += P / 720) { const y = f(x); if (y < mn) mn = y; if (y > mx) mx = y; }
        const ok = Math.abs(mx - (q + A)) <= tol.onCurve * Math.max(1, A) && Math.abs(mn - (q - A)) <= tol.onCurve * Math.max(1, A);
        r.push({ label: `curve ${i} (${cv.fn}) reaches q±a = [${q - A};${q + A}] to scale`, ok });
      }
    }
  });

  // 5) every labelled point that names a curve really lies on that curve
  (spec.points || []).forEach((p) => {
    if (p.on == null) return;
    (Array.isArray(p.on) ? p.on : [p.on]).forEach((i) => {
      const y = makeTrig(spec.curves[i])(p.x);
      const ok = Number.isFinite(y) && Math.abs(y - p.y) <= tol.onCurve * Math.max(1, ymax - ymin);
      r.push({ label: `point ${p.label || "(" + p.x + ";" + p.y + ")"} lies on curve ${i}`, ok });
    });
    r.push({ label: `point ${p.label || ""} sits inside the frame`, ok: p.x >= xmin - 1e-9 && p.x <= xmax + 1e-9 && p.y >= ymin - 1e-9 && p.y <= ymax + 1e-9 });
  });

  // 5b) every shaded band and every boundary line lies INSIDE the window
  //     (2026-08-23). A band clipped by the frame, or a dashed "x = 150°"
  //     drawn off the right edge, is a figure quietly telling a lie about
  //     where the answer is — the same class of fault the point-in-frame
  //     check above catches for points.
  (spec.shades || []).forEach((sh, i) => {
    r.push({ label: `shade ${i} [${sh.x0};${sh.x1}] has a real width (x1 > x0)`, ok: sh.x1 > sh.x0 });
    r.push({ label: `shade ${i} [${sh.x0};${sh.x1}] lies inside the window [${xmin};${xmax}]`,
             ok: sh.x0 >= xmin - 1e-9 && sh.x1 <= xmax + 1e-9 });
  });
  (spec.vlines || []).forEach((v, i) => {
    r.push({ label: `vline ${i} (x = ${v.x}${v.label ? `, "${v.label}"` : ""}) lies inside the window [${xmin};${xmax}]`,
             ok: v.x >= xmin - 1e-9 && v.x <= xmax + 1e-9 });
  });
  (spec.hlines || []).forEach((h, i) => {
    r.push({ label: `hline ${i} (y = ${h.y}${h.label ? `, "${h.label}"` : ""}) lies inside the window [${ymin};${ymax}]`,
             ok: h.y >= ymin - 1e-9 && h.y <= ymax + 1e-9 });
  });

  // 6) a horizontal "period" measure really spans one (or n) whole periods of curve 0
  if (spec.hmeasure && (spec.curves || [])[0]) {
    const P = periodOf(spec.curves[0]), w = spec.hmeasure.x1 - spec.hmeasure.x0;
    r.push({ label: "period measure spans a whole number of periods", ok: Math.abs(w / P - Math.round(w / P)) < 1e-6 && w > 0 });
  }
  // 7) a vertical "amplitude" measure really spans 2·a of curve 0
  if (spec.vmeasure && (spec.curves || [])[0]) {
    const A = amplitudeOf(spec.curves[0]), h = Math.abs(spec.vmeasure.y1 - spec.vmeasure.y0);
    r.push({ label: "amplitude measure spans peak-to-trough (2a)", ok: A != null && Math.abs(h - 2 * A) < 1e-6 });
  }

  /* 8) every VERTICAL-LINE caption sits BELOW the plot area and inside the
        frame (2026-08-23) — the same three measurements verifyFunction
        makes, so the rule cannot quietly hold in one engine and lapse in
        the other: top edge at or below the plot's bottom edge, box inside
        the frame on all four sides, and no caption touching another. */
  const caps = captionBoxes(g);
  const plotBottom = g.H - g.padB;
  caps.forEach((c) => {
    r.push({
      label: `vertical caption "${c.label}" sits below the plot area (band starts at the picture's bottom edge)`,
      ok: c.box[1] >= plotBottom - 1e-9,
    });
    r.push({
      label: `vertical caption "${c.label}" is fully inside the frame`,
      ok: c.box[0] >= 1 && c.box[2] <= g.W - 1 && c.box[1] >= 1 && c.box[3] <= g.H - 1,
    });
  });
  caps.forEach((c, i) => caps.slice(i + 1).forEach((d) => {
    const clash = !(c.box[2] <= d.box[0] || d.box[2] <= c.box[0] || c.box[3] <= d.box[1] || d.box[3] <= c.box[1]);
    r.push({ label: `vertical captions "${c.label}" and "${d.label}" do not overlap`, ok: !clash });
  }));
  /* and the band really is EMPTY: a tan branch may run past the window's
     bottom edge, but not into the caption row. Measured off the drawn
     path, not assumed from the padding sums. */
  if (caps.length) {
    const bandTop = Math.min(...caps.map((c) => c.box[1]));
    let deepest = -Infinity;
    (spec.curves || []).forEach((cv) => curvePaths(cv, g).forEach((d) => {
      const nums = d.match(/-?\d+(?:[.,]\d+)?/g) || [];
      for (let i = 1; i < nums.length; i += 2) deepest = Math.max(deepest, parseFloat(nums[i]));
    }));
    r.push({ label: "no curve is drawn into the caption band", ok: !(deepest > bandTop) });
  }

  return r;
}
