/* ============================================================
   QUADRANT-TRIANGLE ENGINE  (General Trig)   ★ accuracy-critical
   ------------------------------------------------------------
   Her "special sums" sketch (METHODS-trig H1/H3, p26–p31): axes,
   and a right triangle standing on the x-axis from the origin out
   to the point (x; y). The learner has to SEE which quadrant the
   triangle sits in, so all four quadrants are always drawn — the
   window is ±max(|x|,|y|)·1.25 each way, never cropped to the
   triangle.

   Real signed legs go in (x ≠ 0, y ≠ 0). The engine maps them with
   ONE uniform scale (same pixels-per-unit horizontally and
   vertically), which is what lets verifyQuadTri() prove the picture
   cannot lie: the far vertex really is in the stated quadrant, the
   two legs share one scale, and every NUMERIC label equals the
   length actually drawn.

   Only GIVEN values are numeric (her habit — you label what you
   know, the rest stay letters):
     labels:{ x?:"−3", y?:"−4", r?:"5" }   overrides, numeric strings
     letters:{ x:"x", y:"y", r:"r" }       fallbacks (round 10 uses t / 1)

   spec: {
     type:"quadtri", x, y,
     labels?, letters?,
     theta?:true,        arc from the +x axis anticlockwise to OT, labelled θ
     thetaLabel?:"θ",
     refAngle?:false,    small inner arc: the ACUTE angle at O
     refLabel?,
     w?, h?, accent?, title?
   }
   ============================================================ */

const N = v => Math.round(v * 100) / 100;
const DEF_LETTERS = { x: "x", y: "y", r: "r" };

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg qt ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
const text = (x, y, s, cls, anchor = "middle") =>
  `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;

/* "5" / "−3" / "8,2" → number ; "x" / "r" / "t" / "√5" → null */
function numOf(label) {
  if (label == null) return null;
  const s = String(label).replace(/[−–—]/g, "-").replace(",", ".").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function computeQuadTri(spec) {
  const W = spec.w || 300, H = spec.h || 300;
  const pad = 30;
  const x = spec.x, y = spec.y;
  // the window: the same number of units left/right/up/down, so the
  // learner can read the quadrant off the picture at a glance
  const M = Math.max(Math.abs(x), Math.abs(y)) * 1.25 || 1;
  // ONE scale for BOTH axes — the whole honesty guarantee rests on this
  const s = Math.min((W - 2 * pad) / (2 * M), (H - 2 * pad) / (2 * M));
  const ox = W / 2, oy = H / 2;
  const X = u => ox + u * s;
  const Y = v => oy - v * s;

  const O = { x: ox, y: oy };
  const F = { x: X(x), y: Y(0) };        // foot on the x-axis  (x; 0)
  const T = { x: X(x), y: Y(y) };        // the point           (x; y)

  const theta = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  const rUnits = Math.hypot(x, y);
  // Foreman review fix (2026-08-22): the arc was 20-38px and in quadrants
  // II-IV it swept straight through the triangle and over the side labels
  // (seen on the rendered sheet, invisible to verify()). Her p28 sketch has
  // a SMALL arc hugging O, so keep it well inside the shortest leg.
  const arcR = Math.min(22, Math.max(14, 0.22 * rUnits * s));
  const refR = Math.max(9, arcR - 7);

  return { type: "quadtri", W, H, M, s, ox, oy, X, Y, O, F, T, theta, rUnits, arcR, refR,
           quadrant: (x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3)),
           sideMids: {
             adj: { x: (O.x + F.x) / 2, y: (O.y + F.y) / 2 },
             opp: { x: (F.x + T.x) / 2, y: (F.y + T.y) / 2 },
             hyp: { x: (O.x + T.x) / 2, y: (O.y + T.y) / 2 },
           } };
}

/* the polar point on the θ arc, in pixels */
function arcPoint(g, degAngle, R) {
  const t = degAngle * Math.PI / 180;
  return { x: g.ox + R * Math.cos(t), y: g.oy - R * Math.sin(t) };
}

export function renderQuadTri(spec) {
  const g = computeQuadTri(spec);
  const { W, H, ox, oy, O, F, T } = g;
  const labels = spec.labels || {};
  const letters = { ...DEF_LETTERS, ...(spec.letters || {}) };
  const lab = k => (labels[k] != null ? String(labels[k]) : letters[k]);
  let out = "";

  // ---- axes (both, full span, arrowheads) + O ----
  out += `<line class="qt-axis" x1="10" y1="${N(oy)}" x2="${N(W - 10)}" y2="${N(oy)}"/>`;
  out += `<line class="qt-axis" x1="${N(ox)}" y1="${N(H - 10)}" x2="${N(ox)}" y2="10"/>`;
  out += `<path class="qt-arrow" d="M ${N(W - 10)} ${N(oy)} l -7 -3.5 l 0 7 z"/>`;
  out += `<path class="qt-arrow" d="M 10 ${N(oy)} l 7 -3.5 l 0 7 z"/>`;
  out += `<path class="qt-arrow" d="M ${N(ox)} 10 l -3.5 7 l 7 0 z"/>`;
  out += `<path class="qt-arrow" d="M ${N(ox)} ${N(H - 10)} l -3.5 -7 l 7 0 z"/>`;
  out += text(W - 14, oy - 11, "x", "qt-axlab");
  out += text(ox + 12, 16, "y", "qt-axlab");
  // "O" goes in the quadrant OPPOSITE the triangle, so it never sits on the
  // hypotenuse (foreman review fix, 2026-08-22 — it did, in III and IV).
  // …and outside the θ arc when there is one (second review fix, same day:
  // in a thin III/IV triangle the arc sweeps right over that corner).
  // Corner rule: of the three corners the triangle does NOT occupy, take the
  // one farthest (in angle) from BOTH the θ label (at θ/2) and the x-leg
  // label (just off the x-leg, on the side away from the triangle).
  {
    const R = spec.theta ? g.arcR + 8 : 13;
    const adist = (a, b) => { const d = Math.abs(((a - b) % 360 + 540) % 360 - 180); return d; };
    const thetaDir = spec.theta ? g.theta / 2 : null;
    const xlabDir = spec.x > 0 ? (spec.y > 0 ? 345 : 15) : (spec.y > 0 ? 195 : 165);
    const corners = [45, 135, 225, 315].filter(c => Math.floor(c / 90) + 1 !== g.quadrant);
    const best = corners.map(c => ({ c, d: Math.min(adist(c, xlabDir), thetaDir == null ? 999 : adist(c, thetaDir)) }))
      .sort((p, q) => q.d - p.d)[0].c;
    const op = arcPoint(g, best, R);
    out += text(op.x, op.y + 3, "O", "qt-axlab");
  }

  // ---- the θ arc, from the +x axis anticlockwise to the hypotenuse ----
  // (SVG y points down, so an anticlockwise maths turn is sweep-flag 0)
  if (spec.theta) {
    const R = g.arcR;
    const a0 = arcPoint(g, 0, R), a1 = arcPoint(g, g.theta, R);
    const big = g.theta > 180 ? 1 : 0;
    out += `<path class="qt-arc" d="M ${N(a0.x)} ${N(a0.y)} A ${N(R)} ${N(R)} 0 ${big} 0 ${N(a1.x)} ${N(a1.y)}" fill="none"/>`;
    const lp = arcPoint(g, g.theta / 2, R + 13);
    out += text(lp.x, lp.y, spec.thetaLabel || "θ", "qt-ang");
  }
  // ---- the acute reference angle at O (between the hypotenuse and the x-axis) ----
  if (spec.refAngle) {
    const R = g.refR;
    const axisDir = spec.x > 0 ? 0 : 180;
    const hypDir = g.theta;
    const from = arcPoint(g, axisDir, R), to = arcPoint(g, hypDir, R);
    // sweep chosen so the arc is the SHORT way round (the acute angle)
    let d = ((hypDir - axisDir) % 360 + 360) % 360;
    const sweep = d <= 180 ? 0 : 1;
    out += `<path class="qt-refarc" d="M ${N(from.x)} ${N(from.y)} A ${N(R)} ${N(R)} 0 0 ${sweep} ${N(to.x)} ${N(to.y)}" fill="none"/>`;
    if (spec.refLabel) {
      const midDir = axisDir + (d <= 180 ? d / 2 : -(360 - d) / 2);
      const lp = arcPoint(g, midDir, R + 14);
      out += text(lp.x, lp.y, spec.refLabel, "qt-ang");
    }
  }

  // ---- the right triangle O → F → T → O ----
  out += `<path class="qt-tri" d="M ${N(O.x)} ${N(O.y)} L ${N(F.x)} ${N(F.y)} L ${N(T.x)} ${N(T.y)} Z" fill="rgba(255,255,255,.03)"/>`;

  // ---- the right-angle mark at F ----
  const sx = Math.sign(O.x - F.x) || 1;         // towards O along the x-axis
  const sy = Math.sign(T.y - F.y) || 1;         // towards T along the vertical
  const m = 11;
  out += `<path class="qt-right" d="M ${N(F.x + sx * m)} ${N(F.y)} L ${N(F.x + sx * m)} ${N(F.y + sy * m)} L ${N(F.x)} ${N(F.y + sy * m)}" fill="none"/>`;

  // ---- the point (x; y) ----
  out += `<circle class="qt-dot" cx="${N(T.x)}" cy="${N(T.y)}" r="3.4"/>`;

  // ---- side labels: GIVEN numeric or the letter ----
  // adjacent (on the x-axis) — pushed AWAY from the triangle vertically
  // A SHORT leg (5-12-13 in quadrant III/IV, say) has its midpoint inside
  // the θ arc, so the label moves out to the FOOT end of the leg instead
  // (foreman review fix, 2026-08-22 — seen on the rendered sheet).
  const legPx = Math.abs(F.x - O.x);
  const xlabX = (spec.theta && legPx < g.arcR * 2 + 14) ? F.x - sx * 6 : (O.x + F.x) / 2;
  out += text(xlabX, F.y - sy * 14, lab("x"), "qt-slab");
  // opposite (the vertical leg) — pushed away from the origin horizontally.
  // The ANCHOR has to point away from the triangle too: a label sitting to
  // the left of the leg must END there ("end"), otherwise a long one like
  // "−12" runs back across the leg it is labelling.
  out += text(F.x - sx * 15, (F.y + T.y) / 2, lab("y"), "qt-slab", sx > 0 ? "end" : "start");
  // hypotenuse — pushed outward, away from the foot F
  const hm = { x: (O.x + T.x) / 2, y: (O.y + T.y) / 2 };
  // perpendicular to the hypotenuse, away from F, far enough that a long
  // label like √(p² + 1) clears the line (her review find, 2026-08-22)
  const hd = { x: T.x - O.x, y: T.y - O.y }, hl = Math.hypot(hd.x, hd.y) || 1;
  let hn = { x: -hd.y / hl, y: hd.x / hl };
  if (hn.x * (F.x - hm.x) + hn.y * (F.y - hm.y) > 0) hn = { x: -hn.x, y: -hn.y };
  const rChars = String(lab("r")).length;
  const rOff = (3.6 * rChars) * Math.abs(hn.x) + 7 * Math.abs(hn.y) + 8;
  out += text(hm.x + hn.x * rOff, hm.y + hn.y * rOff, lab("r"), "qt-slab");

  if (spec.title) out += text(W / 2, H - 6, spec.title, "qt-title");
  return svgWrap(W, H, spec.accent, out, spec.tap ? "qt-tappable" : "");
}

/* ============================================================
   VERIFY — prove this sketch cannot lie.
   ============================================================ */
export function verifyQuadTri(spec, tol = { pct: 0.01, ang: 0.5 }) {
  const g = computeQuadTri(spec), r = [];
  const { O, F, T } = g;
  const x = spec.x, y = spec.y;

  // 0) the spec is a real point off both axes
  r.push({ label: "legs are non-zero (the point is off both axes)", ok: Math.abs(x) > 1e-9 && Math.abs(y) > 1e-9 });

  // 1) the far vertex really lies in the stated quadrant, measured in PIXELS
  //    against the drawn origin (right of O = +x, above O = +y)
  const px = T.x - O.x, py = O.y - T.y;
  const drawnQ = px > 0 ? (py > 0 ? 1 : 4) : (py > 0 ? 2 : 3);
  r.push({ label: `point (${x};${y}) is drawn in quadrant ${g.quadrant}`, ok: drawnQ === g.quadrant });

  // 2) ONE uniform scale: pixels-per-unit on the x-leg == on the y-leg
  const ppuX = Math.abs(F.x - O.x) / Math.abs(x);
  const ppuY = Math.abs(T.y - F.y) / Math.abs(y);
  r.push({ label: `uniform scale (x-leg ${ppuX.toFixed(2)} px/unit = y-leg ${ppuY.toFixed(2)})`,
           ok: Math.abs(ppuX - ppuY) / Math.max(ppuX, ppuY) <= tol.pct });

  // 3) every NUMERIC label equals the length actually drawn (within 1%)
  const drawn = {
    x: Math.abs(F.x - O.x) / g.s,
    y: Math.abs(T.y - F.y) / g.s,
    r: Math.hypot(T.x - O.x, T.y - O.y) / g.s,
  };
  const truth = { x: Math.abs(x), y: Math.abs(y), r: Math.hypot(x, y) };
  ["x", "y", "r"].forEach(k => {
    const v = numOf((spec.labels || {})[k]);
    if (v == null) return;                                   // a letter — nothing to prove
    const want = truth[k];
    r.push({ label: `label ${k} = "${(spec.labels || {})[k]}" matches the drawn length ${drawn[k].toFixed(3)}`,
             ok: Math.abs(Math.abs(v) - drawn[k]) <= tol.pct * Math.max(1, want)
                 && Math.abs(Math.abs(v) - want) <= 1e-6 });
  });

  // 4) the right angle at the foot really measures 90° in pixels
  const u = { x: O.x - F.x, y: O.y - F.y }, w = { x: T.x - F.x, y: T.y - F.y };
  const dot = u.x * w.x + u.y * w.y;
  const ang = Math.acos(Math.max(-1, Math.min(1, dot / (Math.hypot(u.x, u.y) * Math.hypot(w.x, w.y))))) * 180 / Math.PI;
  r.push({ label: `right angle at (${x};0) measures ${ang.toFixed(2)}°`, ok: Math.abs(ang - 90) <= tol.ang });

  // 5) the θ arc ends on the hypotenuse's direction
  if (spec.theta) {
    const end = arcPoint(g, g.theta, g.arcR);
    const a = Math.atan2(O.y - end.y, end.x - O.x) * 180 / Math.PI;
    const b = Math.atan2(O.y - T.y, T.x - O.x) * 180 / Math.PI;
    const diff = Math.abs(((a - b + 540) % 360) - 180);
    r.push({ label: `θ arc ends on the hypotenuse (off by ${diff.toFixed(2)}°)`, ok: diff <= tol.ang });
  }

  // 6) the whole triangle fits inside the frame
  const inside = [O, F, T].every(P => P.x >= 0 && P.x <= g.W && P.y >= 0 && P.y <= g.H);
  r.push({ label: "the triangle fits inside the frame", ok: inside });

  return r;
}
