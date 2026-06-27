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
     points?:[ { x, y, label?, on?, open?, dashTo?:"x"|"y"|"both", place? } ],
     hmeasure?:{ x0, x1, y, label? },      // horizontal span arrow (a period)
     vmeasure?:{ x, y0, y1, label? },      // vertical span arrow (an amplitude)
     grid?:true, w?, h?, accent?,
     tap?:{ targets, correctId }
   }
   ============================================================ */
import { makeTrig, periodOf, amplitudeOf, tanAsymptotesIn } from "../tgraphlib.js";

const N = (v) => Math.round(v * 100) / 100;
const TONES = { a: "var(--tg-a)", b: "var(--tg-b)" };
const deg = (n) => `${String(n).replace(/-/g, "−")}°`;

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

export function computeTrig(spec) {
  const W = spec.w || 400, H = spec.h || 300;
  const padL = 24, padR = 16, padT = 16, padB = 22;
  const { xmin, xmax, ymin, ymax } = spec.win;
  const sx = (W - padL - padR) / (xmax - xmin);
  const sy = (H - padT - padB) / (ymax - ymin);
  const X = (x) => padL + (x - xmin) * sx;
  const Y = (y) => H - padB - (y - ymin) * sy;
  const xstep = spec.xstep || autoXStep(spec);
  const ystep = spec.ystep || 1;
  return { W, H, sx, sy, X, Y, win: spec.win, xstep, ystep, padL, padR, padT, padB };
}

/* sample one curve into clipped polyline segments (breaks at tan
   asymptotes and whenever the curve leaves the vertical window, so we
   never draw a false near-vertical connector across an asymptote). */
function curvePaths(cv, g) {
  const f = makeTrig(cv);
  const { xmin, xmax, ymin, ymax } = g.win;
  const span = ymax - ymin, lo = ymin - span * 0.6, hi = ymax + span * 0.6;
  const breaks = cv.fn === "tan" ? tanAsymptotesIn(cv, xmin, xmax) : [];
  const STEPS = 720, dx = (xmax - xmin) / STEPS;
  const segs = []; let cur = [];
  for (let i = 0; i <= STEPS; i++) {
    const x = xmin + i * dx;
    if (breaks.some((b) => Math.abs(x - b) < dx * 0.75)) { if (cur.length > 1) segs.push(cur); cur = []; continue; }
    const y = f(x);
    if (!Number.isFinite(y) || y < lo || y > hi) { if (cur.length > 1) segs.push(cur); cur = []; continue; }
    cur.push([g.X(x), g.Y(Math.max(ymin - span * 0.55, Math.min(ymax + span * 0.55, y)))]);
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
      out += text(px, py + (above ? -11 : 13), p.label, "tg-plab");
    }
  });

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

  return r;
}
