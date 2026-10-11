/* ============================================================
   FINANCE — independent recompute helpers for the harnesses
   (verify-finance.html and verify-dice-finance.html). Session F,
   2026-08-23. NOT imported by the app — harness code only.
   ------------------------------------------------------------
   Everything here reads a finished question through its OWN rendered
   prompt / graph / options — never the generator's internal variables
   — and re-derives the answer with js/finlib.js. That is what makes it
   independent: if a quest module's arithmetic ever drifted from what it
   actually SHOWS the learner, these checks fail.

   Coverage: all 25 f1–f7 skills that roll a number, plus all eight f8
   jug cards (2026-10-11: each read back from its own words, the one jug
   sentence or phrase, savings or loan, the jug's day and its feedback
   timeline) and all eight f9 car skills (2026-10-10, each
   re-derived from the drawn meeting day, roads and amounts and the rates
   in the prompt), and all eight f10 sign skills (2026-10-10; the TAUGHT form only since
   2026-10-11: every equation parsed term by term and compared with the one
   the picture and the story give, each steps card's sign per step and form
   so far, the yes/no card's one slip; the interest recomputed from the
   displayed numbers; the recall card against a table written out here), and all eight f13 (was f12) one-equation
   cards (2026-10-10: the story read back, every option parsed, the decoys
   classified, the answer recomputed), and all eight f11 meeting-day cards
   (2026-10-10: the car count of every candidate day recomputed from the
   drawn amounts, their T's and the rate-change T; the marked day the one
   and only day with the fewest). The rest are pure fixed-fact recall
   (no numbers to recompute) and are covered by the generic shape /
   self-consistency / decoy checks in the harnesses.
   ============================================================ */
import {
  toFrac, COMPOUNDING, ratePerPeriod, periodCount, compoundAmount, moveMoney,
  simpleAmount, depositAmount, balanceAfterDeposit, effFromNom, pow,
} from "../finlib.js";
import { fmtComma } from "../check.js";
import { computeTimeline, renderTimeline, verifyTimeline, PHONE_360, TAP_MIN, RING_MIN_PX, LABEL_MIN_PX } from "../engine/timeline-graph.js";

const C = v => fmtComma(v);
export const near = (a, b, tol = 1e-6) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;

/* ---------- tiny parsers over a question's own text ---------- */

/* Fix A (2026-10-11): every exponent a learner reads is a real superscript
   now, built by finlib's pow(): "(1 + 0,12/12)<sup>36</sup>". The parsers
   below were written for the caret form, so a label is first written back
   to it, and then read exactly as before: <sup>36</sup> → ^36, and an
   exponent that starts with a minus or holds a × goes in brackets, the way
   the rounds used to print it: <sup>−36</sup> → ^(−36), <sup>3×4</sup> →
   ^(3×4). Only a bare <sup> (never a class="sf-exp" fraction exponent).
   Fix B (2026-10-11): an f13 car wears its road's colour, <span
   class="eq-road-j">…</span> around the whole car; that paint is taken off
   first (only that span, never another), so every parser reads the car
   exactly as before. f13Colours below checks the paint itself. */
export const unsup = html => String(html == null ? "" : html)
  .replace(/<span class="eq-road-\d">([\s\S]*?)<\/span>/g, "$1")
  .replace(/<sup>([\s\S]*?)<\/sup>/g, (m, x) => (/^−|×/.test(x) ? `^(${x})` : `^${x}`));

/* Fix A review (2026-10-11): f5's option labels print the amount the way its
   prompt does, "2 000(1 + …)", with a NO-BREAK thousands space, the whole
   amount-and-brackets one nowrap unit (the f9/f13 house shape). Written out
   here, not imported from the round, so a slip there cannot pass itself */
const grp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");   // 20000 → "20 000" (U+00A0)
const nwUnit = s => `<span class="nowrap">${s}</span>`;

/* "0,075" / "−3" / "2 100,34" → number (NaN if not purely numeric) */
export function numOf(label) {
  const cleaned = String(label).trim().replace(/[−]/g, "-").replace(/[\s  ]/g, "").replace(",", ".");
  return /^-?\d+(\.\d+)?$/.test(cleaned) ? Number(cleaned) : NaN;
}
export function correctOption(q) { return Array.isArray(q.options) ? q.options.find(o => o.correct) : null; }
export function correctLabel(q) { const c = correctOption(q); return c ? String(c.label) : null; }
export function correctNum(q) { const l = correctLabel(q); return l == null ? NaN : numOf(l); }

/* every percentage in the prompt, in order: "12% p.a." → 12 */
export function pcts(prompt) {
  return [...String(prompt).matchAll(/(\d+(?:,\d+)?)\s*%/g)].map(m => Number(m[1].replace(",", ".")));
}
/* every Rand amount in the prompt, in order (space thousands, comma decimal) */
export function rands(prompt) {
  return [...String(prompt).matchAll(/R(\d[\d\s  ]*(?:,\d+)?)/g)]
    .map(m => Number(m[1].replace(/[\s  ]/g, "").replace(",", ".")));
}
/* every T-index in the prompt, in order: "from T0 to T5" → [0, 5] */
export function tIndices(prompt) {
  return [...String(prompt).matchAll(/T(\d+)/g)].map(m => Number(m[1]));
}
/* the compounding option named in the prompt (longest label first, so
   "semi-annually (half-yearly)" is never mistaken for "annually") */
const BY_LEN = [...COMPOUNDING].sort((a, b) => b.label.length - a.label.length);
/* a no-break hyphen (U+2011, the Fix A review's "semi‑annually (half‑yearly)") reads as the label's hyphen */
const hyph = s => String(s).replace(/\u2011/g, "-");
export function freqIn(prompt) { const p = hyph(prompt); return BY_LEN.find(o => p.includes(o.label)) || null; }
export function freqByLabel(label) { return COMPOUNDING.find(o => o.label === hyph(label)) || null; }
/* "<b>3 years</b>" → 3 */
export function yearsIn(prompt) {
  const m = String(prompt).match(/(\d+)\s*years?/);
  return m ? Number(m[1]) : NaN;
}

/* ---------- graph honesty ---------- */

/* verifyTimeline on q.graph (and q.graphs, if a skill ever grows one) */
export function graphIssues(q) {
  const out = [];
  const check = (g, tag) => {
    if (!g) return;
    if (g.type !== "timeline") { out.push(`${tag}: unknown graph type "${g.type}"`); return; }
    verifyTimeline(g).forEach(r => { if (!r.ok) out.push(`${tag}: ${r.label}`); });
  };
  check(q.graph, "graph");
  if (Array.isArray(q.graphs)) q.graphs.forEach((g, i) => check(g.spec || g, `graphs[${i}]`));
  return out;
}

/* Can the engine actually LABEL these amounts at phone width? Renders
   the timeline into a live host element and measures each amount label's
   real box: it must sit inside the viewBox and stay over its own node
   (the render clamps wide labels inwards, which can drag a label off the
   tick it belongs to). This is the check behind questf5's "dp 0 — the
   full R2 100,34 is wider than the engine's edge margin" note. */
export function labelFitIssues(spec, host) {
  if (!spec || spec.type !== "timeline") return [];
  const out = [];
  host.innerHTML = renderTimeline(spec);
  const svg = host.querySelector("svg");
  if (!svg) return ["timeline did not render"];
  const g = computeTimeline(spec);
  const gap = g.n > 0 ? (g.xAt(1) - g.xAt(0)) : g.W;
  /* one entry per drawn amount label, in draw order (2026-10-10, f8: a node
     can now carry TWO stacked labels, so labels are counted, not nodes) */
  const labelled = g.labels;
  const texts = [...svg.querySelectorAll("text.tl-amt")];
  if (texts.length !== labelled.length) return [`${texts.length} amount labels drawn for ${labelled.length} labels in the spec`];
  const boxes = [];
  /* f9 review 1 (2026-10-10): the total ("?" with a role letter) is drawn
     inside a ring, <g class="tl-qmark"><circle class="tl-qring"/><text/></g>.
     Its measured box is the text AND the ring (stroke included), and the
     ring must sit centred on its "?" */
  const ringOf = el => (el.parentNode && el.parentNode.matches && el.parentNode.matches("g.tl-qmark")) ? el.parentNode.querySelector("circle.tl-qring") : null;
  texts.forEach((el, i) => {
    let bb;
    try { bb = el.getBBox(); } catch { return; }
    const ring = ringOf(el);
    if (ring) {
      let rb; try { rb = ring.getBBox(); } catch { rb = null; }
      if (!rb) out.push(`the ring around "${el.textContent}" did not render`);
      else {
        const sw = parseFloat(getComputedStyle(ring).strokeWidth) / 2 || 0;
        const tc = { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 }, rc = { x: rb.x + rb.width / 2, y: rb.y + rb.height / 2 };
        if (Math.abs(tc.x - rc.x) > 1 || Math.abs(tc.y - rc.y) > 1.5) out.push(`the ring is not centred on its "${el.textContent}"`);
        const x0 = Math.min(bb.x, rb.x - sw), y0 = Math.min(bb.y, rb.y - sw);
        bb = { x: x0, y: y0, width: Math.max(bb.x + bb.width, rb.x + rb.width + sw) - x0, height: Math.max(bb.y + bb.height, rb.y + rb.height + sw) - y0 };
      }
    }
    const lb = labelled[i];
    boxes.push({ lb, bb, text: el.textContent });
    if (bb.x < -0.5 || bb.x + bb.width > g.W + 0.5) out.push(`amount "${el.textContent}" runs outside the ${g.W}-wide viewBox`);
    if (bb.y < -0.5 || bb.y + bb.height > g.H + 0.5) out.push(`amount "${el.textContent}" runs outside the ${g.H}-high viewBox`);
    const centre = bb.x + bb.width / 2;
    if (Math.abs(centre - lb.nodeX) > gap * 0.6) out.push(`amount "${el.textContent}" sits ${Math.round(Math.abs(centre - lb.nodeX))}px off its own node (T${lb.t})`);
  });
  /* no two REAL label boxes overlap: neighbours on the line, or the two
     amounts stacked on one node (f8's same-day deposit and its total) */
  const hits = (a, b, m) => a.x < b.x + b.width - m && b.x < a.x + a.width - m && a.y < b.y + b.height - m && b.y < a.y + a.height - m;
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++)
      if (hits(boxes[i].bb, boxes[j].bb, 0.5)) out.push(`amounts "${boxes[i].text}" and "${boxes[j].text}" overlap`);
  /* f11 review 1 (2026-10-10): EVERY timeline, not just f8's tap boxes: any two
     drawn amounts keep LABEL_MIN_PX of air at a 360-px phone (the ring's own
     air is measured below, against RING_MIN_PX) */
  for (let i = 0; i < boxes.length; i++)
    for (let j = i + 1; j < boxes.length; j++) {
      if (boxes[i].lb.ring || boxes[j].lb.ring) continue;
      const a = boxes[i].bb, b = boxes[j].bb;
      const air = Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width), a.y - (b.y + b.height), b.y - (a.y + a.height));
      if (air * PHONE_360 < LABEL_MIN_PX - 0.01) out.push(`amounts "${boxes[i].text}" and "${boxes[j].text}" are ${Math.round(air * PHONE_360 * 10) / 10} px apart at 360 (under ${LABEL_MIN_PX})`);
    }
  /* f12 review 1 (2026-10-10): the total's ring, its REAL box with the stroke
     (measured above), keeps RING_MIN_PX of air at a 360-px phone from every
     other drawn label: each amount, a role letter on another day (its own
     letter sits right under it by design), the T labels, the road rates and
     the words "meeting day" */
  boxes.filter(b => b.lb.ring).forEach(rb => {
    const bbOf = el => { try { return el.getBBox(); } catch { return null; } };
    const others = [
      ...boxes.filter(o => o !== rb).map(o => ({ what: `amount "${o.text}"`, bb: o.bb })),
      ...[...svg.querySelectorAll("text.tl-role")].filter(el => Math.abs(Number(el.getAttribute("x")) - rb.lb.nodeX) > 0.5).map(el => ({ what: `role letter ${el.textContent}`, bb: bbOf(el) })),
      ...[...svg.querySelectorAll("text.tl-tlab, text.tl-roadlab, text.tl-meet")].map(el => ({ what: `"${el.textContent}"`, bb: bbOf(el) })),
    ].filter(o => o.bb);
    others.forEach(o => {
      const a = rb.bb, b = o.bb;
      const air = Math.max(a.x - (b.x + b.width), b.x - (a.x + a.width), a.y - (b.y + b.height), b.y - (a.y + a.height));
      if (air * PHONE_360 < RING_MIN_PX - 0.01) out.push(`the ring around "${rb.text}" is ${Math.round(air * PHONE_360 * 10) / 10} px from ${o.what} at 360 (under ${RING_MIN_PX})`);
    });
  });
  /* f10 (2026-10-10): a withdrawal (spec node out: true) is its own label,
     "−R2 000", in .tl-out; its real box, minus included, was measured
     above like every amount (inside the frame, over its node, no overlap) */
  const outSpec = (spec.nodes || []).filter(d => d.out && d.amount != null && d.label == null).length;
  const outEls = [...svg.querySelectorAll("text.tl-amt.tl-out")];
  if (outEls.length !== outSpec) out.push(`${outEls.length} withdrawal labels drawn for ${outSpec} in the spec`);
  outEls.forEach(el => { if (!/^−R\d/.test(el.textContent)) out.push(`withdrawal "${el.textContent}" is not drawn with its minus in front`); });
  /* tappable labels (spec.tapLabels): each label's real box sits inside its
     OWN hit box, and its centre inside no other label's box, so the place a
     learner aims at is always the amount they meant */
  if (spec.tapLabels) {
    const inBox = (x, y, h) => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h;
    boxes.forEach(({ lb, bb, text }) => {
      const h = lb.hit;
      if (!h) { out.push(`amount "${text}" has no hit box`); return; }
      if (bb.x < h.x - 1 || bb.x + bb.width > h.x + h.w + 1 || bb.y < h.y - 1 || bb.y + bb.height > h.y + h.h + 1)
        out.push(`amount "${text}" spills out of its own hit box`);
      const cx = bb.x + bb.width / 2, cyy = bb.y + bb.height / 2;
      boxes.forEach(o => { if (o.lb !== lb && o.lb.hit && inBox(cx, cyy, o.lb.hit)) out.push(`amount "${text}" sits inside the hit box of "${o.text}"`); });
    });
    /* f8 review 1 (2026-10-10): draw the hit boxes the way the app does
       (js/questions.js addTimelineLabelHits) and measure the drawn rects,
       scaled to a 360-px phone: every box at least TAP_MIN.h px tall, any
       two boxes at least TAP_MIN.air px apart, and the boxes of a stack
       lined up (same left and right edges, same height) */
    const NS = "http://www.w3.org/2000/svg";
    const rects = boxes.filter(b => b.lb.hit).map(({ lb, text }) => {
      const r = document.createElementNS(NS, "rect");
      [["x", lb.hit.x], ["y", lb.hit.y], ["width", lb.hit.w], ["height", lb.hit.h]].forEach(([k, v]) => r.setAttribute(k, v));
      svg.appendChild(r);
      let bb; try { bb = r.getBBox(); } catch { return null; }
      return { lb, text, x0: bb.x * PHONE_360, x1: (bb.x + bb.width) * PHONE_360, y0: bb.y * PHONE_360, y1: (bb.y + bb.height) * PHONE_360 };
    }).filter(Boolean);
    const px = v => Math.round(v * 10) / 10;
    rects.forEach(a => { if (a.y1 - a.y0 < TAP_MIN.h - 0.01) out.push(`hit box of "${a.text}" only ${px(a.y1 - a.y0)} px tall at 360`); });
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i], b = rects[j];
        const air = Math.max(a.x0 - b.x1, b.x0 - a.x1, a.y0 - b.y1, b.y0 - a.y1);
        if (air < TAP_MIN.air - 0.01) out.push(`hit boxes of "${a.text}" and "${b.text}" only ${px(air)} px apart at 360`);
        if (a.lb.t === b.lb.t && (Math.abs(a.x0 - b.x0) > 0.05 || Math.abs(a.x1 - b.x1) > 0.05 || Math.abs((a.y1 - a.y0) - (b.y1 - b.y0)) > 0.05))
          out.push(`stacked hit boxes of "${a.text}" and "${b.text}" do not line up`);
      }
  }
  /* f9 (2026-10-10): the meeting-day flag and the rate roads, measured the
     same way as the amounts: real boxes inside the frame, the pole on its
     own T, each road's rate under its OWN road, and none of the flag, its
     words, its pole or a road label touching an amount, a role letter, a
     T label or each other (the pennant hangs on its pole by design) */
  const roadSpec = Array.isArray(spec.roads) && spec.roads.length;
  /* f11 review 1: a staggered amount draws a leader on ANY timeline, so the
     leader checks below run whenever a leader is drawn */
  if (spec.meet != null || roadSpec || g.leaders.length || (g.stackLeaders || []).length) {
    const bbOf = el => { try { const b = el.getBBox(); return { x: b.x, y: b.y, width: b.width, height: b.height }; } catch { return null; } };
    const all = (sel, what) => [...svg.querySelectorAll(sel)].map(el => ({ what: `${what} "${el.textContent}"`, bb: bbOf(el) })).filter(o => o.bb);
    const fixed = [...boxes.map(b => ({ what: `amount "${b.text}"`, bb: b.bb })), ...all("text.tl-tlab", "T label"), ...all("text.tl-role", "role letter")];
    const extra = [];
    if (spec.meet != null) {
      const words = svg.querySelector("text.tl-meet"), flag = svg.querySelector("path.tl-flag"), pole = svg.querySelector("line.tl-pole");
      if (!words || !flag || !pole) out.push("the meeting-day flag did not render");
      else {
        if (Math.abs(Number(pole.getAttribute("x1")) - g.xAt(spec.meet)) > 0.5) out.push(`the flag pole does not stand on T${spec.meet}`);
        const pb = bbOf(pole);
        extra.push({ what: `"${words.textContent}"`, bb: bbOf(words), kind: "words" }, { what: "the flag", bb: bbOf(flag), kind: "flag" });
        if (pb) extra.push({ what: "the flag pole", bb: { x: pb.x - 0.7, y: pb.y, width: 1.4, height: pb.height }, kind: "pole" });
      }
    }
    const roadEls = [...svg.querySelectorAll("text.tl-roadlab")];
    if (roadEls.length !== g.roads.length) out.push(`${roadEls.length} road labels drawn for ${g.roads.length} roads`);
    roadEls.forEach((el, j) => {
      const bb = bbOf(el), rd = g.roads[j];
      if (!bb || !rd) return;
      /* its centre over its own road, its ink on its own road or in the empty
         margin past an end of the line (f9 review 1: a rate slides off the
         flagged T label, into that margin when its road is short) */
      const lo = rd.from === 0 ? 0 : rd.x0, hi = rd.to === g.n ? g.W : rd.x1, cx = bb.x + bb.width / 2;
      if (bb.x < lo - 0.5 || bb.x + bb.width > hi + 0.5 || cx < rd.x0 - 0.5 || cx > rd.x1 + 0.5) out.push(`road label "${el.textContent}" is not under its own road (T${rd.from}–T${rd.to})`);
      /* f9 review 1: never directly under the flagged meeting-day T label (real boxes, 2 units of air) */
      const tm = svg.querySelector("text.tl-tmeet"), tb = tm && bbOf(tm);
      if (tb && bb.x < tb.x + tb.width + 2 && tb.x - 2 < bb.x + bb.width) out.push(`road label "${el.textContent}" sits under the flagged ${tm.textContent}`);
      extra.push({ what: `road label "${el.textContent}"`, bb, kind: "road" });
    });
    /* f9 review 1: each leader line (a thin line from a lone amount down to
       its tick) crosses no amount, T label, role letter, road rate or flag */
    [...svg.querySelectorAll("line.tl-lead")].forEach(l => {
      const lb = bbOf(l);
      if (!lb) return;
      const b = { x: lb.x - 0.5, y: lb.y, width: lb.width + 1, height: lb.height };
      if (Math.abs(Number(l.getAttribute("x2")) - g.xAt(Math.round((Number(l.getAttribute("x2")) - g.xAt(0)) / gap))) > 0.5) out.push("a leader line does not end on a tick");
      [...fixed, ...extra].filter(o => o.bb).forEach(o => { if (hits(b, o.bb, 0)) out.push(`a leader line crosses ${o.what}`); });
    });
    /* f10 review 1 (spec.stackLeaders): a stacked amount's leader runs down
       beside the stack and in to its tick; it ends on a tick, and no stretch
       of it crosses an amount (the "?" ring is part of its amount's box), a
       role letter, a T label, a road rate, the flag, its words or its pole */
    const sleads = [...svg.querySelectorAll("polyline.tl-slead")];
    if (sleads.length !== (g.stackLeaders || []).length) out.push(`${sleads.length} stack leaders drawn for ${(g.stackLeaders || []).length} stacked amounts`);
    sleads.forEach((pl, k) => {
      const pts = String(pl.getAttribute("points")).trim().split(/\s+/).map(p => p.split(",").map(Number));
      const end = pts[pts.length - 1];
      if (pts.length < 2 || Math.abs(end[0] - g.xAt(Math.round((end[0] - g.xAt(0)) / gap))) > 0.5 || !(end[1] < g.cy - 6)) out.push("a stacked amount's leader does not end on a tick");
      /* f11 review 1: it drops straight from the middle of its own amount's
         drawn box (one bend at most), and that amount keeps RING_MIN_PX of air
         at 360 from a ring under it (measured with the ring above) */
      const sl = (g.stackLeaders || [])[k], own = sl && boxes.find(b => b.lb === g.nodes[sl.t].labels[sl.j]);
      if (own && (Math.abs(pts[0][0] - (own.bb.x + own.bb.width / 2)) > 1 || pts.length > 3 || (pts.length > 2 && Math.abs(pts[1][0] - pts[0][0]) > 0.5)))
        out.push(`the leader of "${own.text}" does not drop straight from its middle`);
      for (let i = 1; i < pts.length; i++) {
        const [a, c] = [pts[i - 1], pts[i]];
        const b = { x: Math.min(a[0], c[0]) - 0.5, y: Math.min(a[1], c[1]), width: Math.abs(a[0] - c[0]) + 1, height: Math.abs(a[1] - c[1]) };
        [...fixed, ...extra].filter(o => o.bb).forEach(o => { if (hits(b, o.bb, 0)) out.push(`a stacked amount's leader crosses ${o.what}`); });
      }
    });
    extra.filter(e => e.bb).forEach((e, i, arr) => {
      if (e.bb.x < -0.5 || e.bb.x + e.bb.width > g.W + 0.5 || e.bb.y < -0.5 || e.bb.y + e.bb.height > g.H + 0.5) out.push(`${e.what} runs outside the frame`);
      fixed.forEach(f => { if (hits(e.bb, f.bb, 0.5)) out.push(`${e.what} touches ${f.what}`); });
      arr.slice(i + 1).forEach(o => {
        const pair = [e.kind, o.kind].sort().join("+");
        if (pair === "flag+pole") return;                                    // the pennant hangs on its pole
        if (hits(e.bb, o.bb, 0.5)) out.push(`${e.what} touches ${o.what}`);
      });
    });
  }
  return out;
}

/* ============================================================
   RECOMPUTE — one entry per skill that rolls a number (25 of 51).
   Each returns true only when the question's own displayed numbers,
   fed back through finlib, reproduce the answer it marks correct.
   A parse failure returns false on purpose: a silently-skipped check
   is worse than a loud one.
   ============================================================ */
export const RECOMPUTE = {
  /* ---- f1 ---- */
  "f1.pctToFrac": q => {
    const [p] = pcts(q.prompt);
    return Number.isFinite(p) && near(toFrac(p), correctNum(q));
  },

  /* ---- f3 ---- */
  "f3.timesPerYear": q => {
    const o = freqIn(q.prompt);
    return !!o && correctNum(q) === o.k;
  },
  "f3.ratePerPeriod": q => {
    const [annual] = pcts(q.prompt), o = freqIn(q.prompt);
    return !!o && Number.isFinite(annual) && near(ratePerPeriod(toFrac(annual), o.k), correctNum(q));
  },
  "f3.exponent": q => {
    const o = freqIn(q.prompt), years = yearsIn(q.prompt);
    return !!o && Number.isFinite(years) && periodCount(years, o.k) === correctNum(q);
  },
  "f3.fullSetup": q => {
    const [P] = rands(q.prompt), [annual] = pcts(q.prompt), o = freqIn(q.prompt), years = yearsIn(q.prompt);
    if (!o || !Number.isFinite(P) || !Number.isFinite(annual) || !Number.isFinite(years)) return false;
    return correctLabel(q) === `${P}${pow(`(1 + ${C(toFrac(annual))}/${o.k})`, `${years}×${o.k}`)}`;
  },
  "f3.monthlyRate": q => {
    const [annual] = pcts(q.prompt);
    return Number.isFinite(annual) && near(ratePerPeriod(toFrac(annual), 12), correctNum(q));
  },

  /* ---- f4 ---- */
  "f4.countForward": q => {
    const [a, b] = tIndices(q.prompt);
    return a === 0 && Number.isFinite(b) && q.expected === b - a
      && q.graph.n === b && q.graph.arc.from === 0 && q.graph.arc.to === b;
  },
  "f4.countBetween": q => {
    const [a, b] = tIndices(q.prompt);
    return Number.isFinite(a) && b > a && q.expected === b - a && q.graph.n === b;
  },
  "f4.countBackward": q => {
    const [b, a] = tIndices(q.prompt);
    return Number.isFinite(a) && b > a && q.expected === b - a
      && q.graph.arc.from === b && q.graph.arc.to === a && q.graph.arc.dir === "back";
  },
  "f4.directionForward": q => {
    const [a, b] = tIndices(q.prompt);
    return b > a && correctLabel(q) === "multiply by (1 + i)";
  },
  "f4.directionBackward": q => {
    const [b, a] = tIndices(q.prompt);
    return b > a && correctLabel(q) === "divide by (1 + i)";
  },
  "f4.tapTarget": q => {
    const m = String(q.prompt).match(/<b>(\d+) periods<\/b>/);
    const [P] = rands(q.prompt);
    if (!m || !Number.isFinite(P)) return false;
    const k = Number(m[1]);
    const node = q.graph.nodes.find(n => n.t === 0);
    return q.tap.correctId === k && q.tap.targets.includes(k) && k <= q.graph.n && !!node && node.amount === P;
  },

  /* ---- f5 ---- */
  "f5.exponentForward": q => {
    const [zero, k] = tIndices(q.prompt);
    return zero === 0 && Number.isFinite(k) && correctLabel(q) === `+${k}` && q.graph.n === k;
  },
  "f5.exponentBackward": q => {
    const [b, a] = tIndices(q.prompt);
    return b > a && correctLabel(q) === `−${b - a}` && q.graph.n === b;
  },
  "f5.expression": q => {
    // the amount prints as "R2 000" (finlib rand(P, 0), foreman review fix
    // 2026-08-23) — the thousands space is dropped before parsing. Since the
    // Fix A review (11 Oct) that space is a no-break one and the amount is
    // ONE nowrap unit, in the prompt AND in the option label (C2: the label
    // carries the same thousands space the prompt does)
    const m = String(q.prompt).match(/value at <b>T(\d+)<\/b> of <span class="nowrap"><b>R([\d\s]+)<\/b><\/span> invested at T0 \(i = ([\d,]+)\)/);
    if (!m) return false;
    const k = Number(m[1]), P = Number(m[2].replace(/\s/g, "")), i = m[3];
    return correctLabel(q) === nwUnit(`${grp(P)}${pow(`(1 + ${i})`, k)}`) && q.graph.n === k;
  },
  /* the only CARE skill: both routes are re-derived from the question's
     OWN two amounts (the rate is recovered from P, A and T), and the
     yes/no is re-decided from that arithmetic — never from the wording. */
  "f5.anyPoint": q => {
    const [P, A] = rands(q.prompt);
    if (!Number.isFinite(P) || !Number.isFinite(A) || P <= 0) return false;
    const mSame = String(q.prompt).match(/Moving <b>forward (\d+)<\/b> from T0 and moving <b>back (\d+)<\/b> from T(\d+) give (the <b>same<\/b> value|<b>different<\/b> values) at T(\d+)\./);
    const mPlus = unsup(q.prompt).match(/at T(\d+)\. To move the T(\d+) amount <b>back<\/b> to T(\d+), you multiply by \(1 \+ i\)\^<b>\+(\d+)<\/b>\./);
    let T, k, back, claim;
    if (mSame) {
      k = Number(mSame[1]); back = Number(mSame[2]); T = Number(mSame[3]);
      claim = mSame[4].includes("same") ? "same" : "different";
      if (Number(mSame[5]) !== k) return false;                 // the sentence must land on Tk
    } else if (mPlus) {
      T = Number(mPlus[1]); back = Number(mPlus[4]); k = Number(mPlus[3]);
      if (Number(mPlus[2]) !== T) return false;
      claim = "plusExp";
    } else return false;
    if (!(k >= 1 && k < T) || k + back !== T) return false;      // forward k + back (T−k) must span the line
    const i = Math.pow(A / P, 1 / T) - 1;                        // rate recovered from the question's own amounts
    if (!(i > 0)) return false;
    const fwd = compoundAmount(P, i, k);                         // route 1
    const bck = moveMoney(A, i, -back);                          // route 2
    const wrongBack = moveMoney(A, i, back);                     // the misconception
    const agree = Math.abs(fwd - bck) <= 1e-6 * Math.max(1, fwd);
    const wrongAgrees = Math.abs(fwd - wrongBack) <= 1e-6 * Math.max(1, fwd);
    const want = claim === "plusExp" ? wrongAgrees : (claim === "same" ? agree : !agree);
    if (q.yes !== want) return false;
    const g = q.graph;
    const n0 = g.nodes.find(n => n.t === 0), nk = g.nodes.find(n => n.t === k), nT = g.nodes.find(n => n.t === T);
    return g.n === T && !!n0 && n0.amount === P && !!nk && nk.label === "?" && !!nT && near(nT.amount, A, 0.005);
  },
  "f5.rateChangeBrackets": q => {
    const years = [...String(q.prompt).matchAll(/<b>(\d+) years<\/b>/g)].map(m => Number(m[1]));
    return years.length === 2 && correctNum(q) === 2;
  },
  "f5.rateChangeSegment": q => {
    const o = freqIn(q.prompt), years = yearsIn(q.prompt);
    return !!o && Number.isFinite(years) && periodCount(years, o.k) === correctNum(q);
  },
  "f5.rateChangeExpr": q => {
    const m = String(q.prompt).match(/<span class="nowrap"><b>R([\d\s  ]+)<\/b><\/span> grows at <span class="nowrap">([\d,]+)%\sp\.a\.<\/span> compounded <b>([^<]+)<\/b> for (\d+) years, then at <span class="nowrap">([\d,]+)%\sp\.a\.<\/span> compounded <b>([^<]+)<\/b> for (\d+) years/);
    if (!m) return false;
    const P = Number(m[1].replace(/[\s  ]/g, ""));
    const r1 = Number(m[2].replace(",", ".")), o1 = freqByLabel(m[3]), y1 = Number(m[4]);
    const r2 = Number(m[5].replace(",", ".")), o2 = freqByLabel(m[6]), y2 = Number(m[7]);
    if (!o1 || !o2) return false;
    if (!String(q.prompt).includes(`end of the ${y1 + y2} years`)) return false;
    const want = nwUnit(`${grp(P)}${pow(`(1 + ${C(toFrac(r1))}/${o1.k})`, `${y1}×${o1.k}`)}${pow(`(1 + ${C(toFrac(r2))}/${o2.k})`, `${y2}×${o2.k}`)}`);
    return correctLabel(q) === want && q.graph.n === y1 + y2;
  },

  /* ---- f6 ---- */
  "f6.depositAmount": q => {
    const [p] = pcts(q.prompt), [price] = rands(q.prompt);
    return Number.isFinite(p) && Number.isFinite(price) && near(depositAmount(toFrac(p), price), q.expected, 1e-6);
  },
  "f6.amountOwed": q => {
    const [p] = pcts(q.prompt), [price] = rands(q.prompt);
    return Number.isFinite(p) && Number.isFinite(price) && near(balanceAfterDeposit(toFrac(p), price), q.expected, 1e-6);
  },
  "f6.percentOwed": q => {
    const [p] = pcts(q.prompt);
    return Number.isFinite(p) && correctNum(q) === 100 - p;
  },
  "f6.hpTotal": q => {
    const [price] = rands(q.prompt), [p, r] = pcts(q.prompt), n = yearsIn(q.prompt);
    if (![price, p, r, n].every(Number.isFinite)) return false;
    const owed = Math.round(balanceAfterDeposit(toFrac(p), price));
    return near(Math.round(simpleAmount(owed, toFrac(r), n)), q.expected, 1e-9);
  },

  /* ---- f7 ---- */
  "f7.effCalc": q => {
    const [nom] = pcts(q.prompt), o = freqIn(q.prompt);
    return !!o && Number.isFinite(nom) && q.dp === 2 && near(effFromNom(toFrac(nom), o.k) * 100, q.expected, 1e-9);
  },
  "f7.whichGrowsMore": q => {
    const p = pcts(q.prompt);
    if (p.length < 2 || p[0] !== p[1]) return false;            // both sides must quote the SAME nominal rate
    const i = toFrac(p[0]);
    return effFromNom(i, 12) > effFromNom(i, 1) && correctLabel(q) === "Compounded monthly";
  },

  /* ---- f8 (the jug round, 2026-10-11): every card read back from its own
     words (f8Diagnose, below): the one jug chip, savings or loan, the jug's
     day, the feedback timeline; the recall cards' one jug among three coins.
     Card 1 alone opens on the discovery slide (f8RevealIssue): its flag */
  "f8.jugTwoDeposits": q => f8Diagnose(q, true) === null,
  "f8.recallSaving": q => f8Diagnose(q) === null,
  "f8.jugLoan": q => f8Diagnose(q) === null,
  "f8.jugWithdrawal": q => f8Diagnose(q) === null,
  "f8.recallLoan": q => f8Diagnose(q) === null,
  "f8.jugHirePurchase": q => f8Diagnose(q) === null,
  "f8.jugTargetOrSameDay": q => f8Diagnose(q) === null,
  "f8.recallMixed": q => f8Diagnose(q) === null,

  /* ---- f9 (2026-10-10): car or no car ---- */
  "f9.needsCar": q => {
    const s = f9Scene(q);
    return !!s && q.type === "yesno" && q.yes === (s.at !== s.meet);
  },
  "f9.gear": q => {
    const s = f9Scene(q), l = correctLabel(q);
    if (!s || q.type !== "mc" || !l || q.options.length !== 3) return false;
    const dir = Math.sign(s.meet - s.at);
    return dir > 0 ? /^Forward gear \(×\)/.test(l) : dir < 0 ? /^Reverse gear \(÷\)/.test(l) : /^No car/.test(l);
  },
  "f9.onTheDay": q => {
    const s = f9Scene(q);
    if (!s || s.at !== s.meet) return false;
    return q.type === "yesno" ? q.yes === false : /^No car/.test(correctLabel(q) || "");
  },
  "f9.exponent": q => {
    const s = f9Scene(q), t = s && f9Trip(s);
    if (!t || !s.ratesShown || t.legs.length !== 1) return false;
    const L = t.legs[0];
    return correctNum(q) === t.dir * L.years * L.k;
  },
  "f9.roads": q => {
    const s = f9Scene(q), t = s && f9Trip(s);
    if (!t || s.roads.length !== 2 || !t.legs.length) return false;
    const want = t.legs.length === 1 ? `The ${t.legs[0].rate}% road only` : `The ${t.legs[0].rate}% road, then the ${t.legs[1].rate}% road`;
    return correctLabel(q) === want;
  },
  "f9.twoCars": q => {
    const s = f9Scene(q), t = s && f9Trip(s);
    if (!t || !s.ratesShown || t.legs.length !== 2) return false;
    const amt = String(s.v).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const car = L => {
      const i = C(toFrac(L.rate)), m = t.dir < 0 ? "−" : "";
      return L.k === 1 ? pow(`(1 + ${i})`, `${m}${L.years}`) : pow(`(1 + ${i}/${L.k})`, `${m}${L.years}×${L.k}`);
    };
    /* f9 review 1: terms are <span class="nowrap"> units now; Fix A: the sup
       is written back to its caret first, so where the exponent sits still counts */
    const flat = x => unsup(x).replace(/<[^>]+>/g, "").replace(/\s+/g, "");
    return flat(correctLabel(q) || "") === flat(amt + t.legs.map(car).join(""));
  },
  "f9.roadExponent": q => {
    const s = f9Scene(q), t = s && f9Trip(s);
    const m = String(q.prompt).match(/On the <b>(\d+)% road<\/b>/);
    if (!t || !m || !s.ratesShown || t.legs.length !== 2) return false;
    const L = t.legs.find(l => l.rate === Number(m[1]));
    return !!L && correctNum(q) === t.dir * L.years * L.k;
  },
  "f9.carCount": q => {
    const s = f9Scene(q), t = s && f9Trip(s);
    return !!t && correctNum(q) === t.legs.length;
  },

  /* ---- f10 (2026-10-10; the TAUGHT form only since 2026-10-11): in or out? ---- */
  /* the steps cards: every step's amount, options, right sign and form so
     far, rebuilt from the picture; the yes/no card: the shown line is the
     taught form, or wrong by exactly ONE slip that the answer names */
  "f10.inOrOutSaving": q => f10Clean(q) && f10StepsCheck(q, false),
  "f10.inOrOutLoan": q => f10Clean(q) && f10StepsCheck(q, true),
  "f10.equationYesNo": q => f10Clean(q) && f10YesNoCheck(q),
  "f10.withdrawal": q => {
    const s = f10Scene(q);
    return f10Clean(q) && !!s && s.saving && !s.known && s.outs === 1 && f10McCheck(q, s, f10Expect(s), f10Lead(s), f10Allowed(s));
  },
  "f10.signOnTimeline": q => {
    const s = f10Scene(q);
    return f10Clean(q) && !!s && s.saving && !s.known && s.outs === 1 && !/R\d/.test(String(q.prompt).replace(/<[^>]+>/g, ""))   // the picture alone carries the amounts
      && f10McCheck(q, s, f10Expect(s), f10Lead(s), f10Allowed(s));
  },
  "f10.inOrOutWord": q => {
    /* written out here on purpose, not imported from the module: where each
       item stands in the taught equation */
    const m = String(q.prompt).match(/^<b>([^<]+)<\/b>: where does it go in the equation\?$/);
    if (!f10Clean(q) || !m || q.type !== "mc" || q.options.length !== 4) return false;
    if (q.options.map(o => String(o.label)).sort().join("|") !== [...F10_WHERE, F10_NOWHERE].sort().join("|")) return false;
    const item = m[1];
    const want = /down payment/i.test(item) ? F10_NOWHERE
      : /withdrawal/i.test(item) ? "− on the right"
      : /deposit|repayment/i.test(item) ? "+ on the right"
      : /loan itself|the total/i.test(item) ? "alone on the left" : null;
    return !!want && correctLabel(q) === want;
  },
  "f10.interestPaid": q => {
    const p = String(q.prompt);
    const m = p.match(/borrowed <span class="nowrap">R([\d ]+,\d\d)<\/span> at (\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)\./);
    const pays = [...p.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
    if (!f10Clean(q) || !m || pays.length !== 2 || q.type !== "mc") return false;
    const loan = f10Num(m[1]), r = Number(m[2]), k = F9_K[f10Word(m[3])];
    /* the story is true: those repayments, moved back to T0 at the stated rate, are that loan to the cent */
    const pv = pays.reduce((s, x) => s + x.v * Math.pow(1 + toFrac(r) / k, -x.t * k), 0);
    if (!(Math.abs(pv - loan) <= 0.005 + 1e-9)) return false;
    /* the picture agrees: the loan at T0 carrying its letter P, the repayments where the story puts them */
    const g = q.graph;
    if (!g || !Array.isArray(g.nodes)) return false;
    const tot = g.nodes.filter(nd => nd.role);
    if (tot.length !== 1 || tot[0].role !== "P" || tot[0].t !== 0 || !near(tot[0].amount, loan, 1e-9)) return false;
    const others = g.nodes.filter(nd => !nd.role);
    if (others.length !== 2 || !pays.every(x => others.some(nd => nd.amount === x.v && nd.t === x.t))) return false;
    /* interest = paid back − borrowed, to the cent; no decoy equals it by value */
    const want = Math.round((pays[0].v + pays[1].v) * 100) - Math.round(loan * 100);
    const cents = q.options.map(o => f10Cents(o.label));
    if (!cents.every(Number.isFinite) || new Set(cents).size !== cents.length) return false;
    const c = correctOption(q);
    return !!c && f10Cents(c.label) === want;
  },
  "f10.hirePurchasePrice": q => {
    /* price = loan + down payment; the meeting day is T0, so the KNOWN loan
       stands alone on the left and x (the last repayment, at Tn) drives back too */
    const p = String(q.prompt);
    const price = p.match(/ for <span class="nowrap">R([\d ]+)<\/span>/), down = p.match(/down payment of <span class="nowrap">R([\d ]+)<\/span>/);
    const said = [...p.matchAll(/(\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)/g)];
    const xm = p.match(/a last repayment, x, at T(\d+)/);
    const pays = [...p.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
    if (!f10Clean(q) || !price || !down || said.length !== 1 || !xm || !/The meeting day is T0, the day of the loan\./.test(p) || !pays.length || q.graph) return false;
    const n = Number(xm[1]), r = Number(said[0][1]), k = F9_K[f10Word(said[0][2])];
    const P = f10Num(price[1]), D = f10Num(down[1]), loan = P - D;               // price = loan + down payment
    if (!(D > 0 && loan > 0) || pays.some(x => !(x.t > 0 && x.t < n) || x.t * k < 2)) return false;   // no car is ever ^−1
    const s = { saving: false, n, meet: 0, r, k, pays: pays.map(x => ({ ...x, out: false })) };
    const expect = [{ s: 1, c: loan, e: 0 }, ...pays.map(x => ({ s: -1, c: x.v, e: -x.t * k })), { s: -1, c: "x", e: -n * k }];
    return f10McCheck(q, s, expect, { c: loan, e: 0 }, new Set([P, D, loan, "x", ...pays.map(x => x.v)]));
  },

  /* ---- f13 (2026-10-10; was f12 until 2026-10-11): build the one equation (the exam shape) ---- */
  /* the story read back, every option parsed, the right one rebuilt, the
     three decoys one plan slip each, the answer and the price recomputed
     through finlib, the timeline (cards 1 to 3) against the story */
  "f13.twoDeposits": q => f13Diagnose(q, "twoDeposits") === null,
  "f13.withdrawal": q => f13Diagnose(q, "withdrawal") === null,
  "f13.loanTwoRepayments": q => f13Diagnose(q, "loanTwoRepayments") === null,
  "f13.mixed": q => f13Diagnose(q, "mixed") === null,
  "f13.targetAmount": q => f13Diagnose(q, "targetAmount") === null,
  "f13.loanAgain": q => f13Diagnose(q, "loanTwoRepayments") === null,
  "f13.hirePurchase": q => f13Diagnose(q, "hirePurchase") === null,
  "f13.unknownPayment": q => f13Diagnose(q, "unknownPayment") === null,

  /* ---- f11 (2026-10-10): pick the meeting day ---- */
  /* the car count of each candidate day recomputed from the drawn amounts,
     their T's and the rate-change T (on the day 0, across the change 2,
     else 1; the total counts too), the story read back against the roads */
  "f11.whereStands": q => f11Diagnose(q, "whereStands") === null,
  "f11.colourChange": q => f11Diagnose(q, "colourChange") === null,
  "f11.carCountAt": q => f11Diagnose(q, "carCountAt") === null,
  "f11.fewestCars": q => f11Diagnose(q, "fewestCars") === null,
  "f11.bestReason": q => f11Diagnose(q, "bestReason") === null,
  "f11.carCountAgain": q => f11Diagnose(q, "carCountAgain") === null,
  "f11.sameAnswer": q => f11Diagnose(q, "sameAnswer") === null,
  "f11.fewestAgain": q => f11Diagnose(q, "fewestCars") === null,
};

/* ============================================================
   f11 · "Pick the meeting day" — every count re-derived from the picture.
     · the scene: NO meeting-day flag (the learner picks the day), 4 to 8
       years, one or two roads each at least 2 years and each "N% p.a.",
       the rate really changing; the prompt names one "N% p.a. compounded
       …" per road in road order, and a second road starts where it says
       ("from T3 the rate is …"); saving or a loan in words, matching the
       total's letter;
     · HER RULING: the total is "?" with its role letter (A at the end, P
       at T0), the bottom label of a shared day; 2 or 3 payments, distinct
       whole rand on distinct days; a loan's last repayment at the end and
       none on T0;
     · THE COUNT, written out here, not imported: for a meeting day D an
       amount on D needs 0 cars, one whose T and D lie on either side of
       the rate change (strictly) needs 2, any other 1; every amount on the
       line counts, the total too;
     · fewestCars: 3 or 4 T options, the end day among them; every option's
       note is ITS count ("2 cars"); the marked day needs the fewest of ANY
       day on the line, and it is the only day that does (the tie rule);
     · carCountAt: the marked number is the count for the asked day, and
       carCountAgain's day makes some amount cross the change;
     · whereStands: the asked day holds 0 or 1 amounts, and the marked
       option names it (a payment's rand, "The total, A", or "Nothing");
     · colourChange: the marked T is the rate change, T0 and the end are
       decoys; sameAnswer: "no", two different days on the line;
     · bestReason: the asked day is a middle day with the fewest cars, the
       biggest payment does not stand there, and the marked reason is the
       true one (an amount stands there, the road changes colour there, or
       both).
   f11Diagnose returns null when all of that holds, else the first reason.
   ============================================================ */
const f11Text = x => String(x == null ? "" : x).replace(/<[^>]+>/g, "").replace(/[  ]/g, " ").replace(/‑/g, "-").trim();
const f11Cars = (t, D, c) => (t === D ? 0 : c != null && Math.min(t, D) < c && c < Math.max(t, D) ? 2 : 1);
const f11Count = (s, D) => s.items.reduce((a, it) => a + f11Cars(it.t, D, s.c), 0);
const f11T = label => { const m = f11Text(label).match(/^T(\d+)$/); return m ? Number(m[1]) : NaN; };
const f11Rand = label => { const m = f11Text(label).match(/^R(\d{1,3}(?: \d{3})*)$/); return m ? Number(m[1].replace(/ /g, "")) : NaN; };
/* "2 cars" → 2, "1 car" → 1 (the plural has to agree) */
function f11Note(note) {
  const m = f11Text(note).match(/^(\d+) (cars?)$/);
  return m && (m[1] === "1") === (m[2] === "car") ? Number(m[1]) : NaN;
}
export function f11Scene(q) {
  const g = q && q.graph;
  if (!g || g.type !== "timeline" || g.meet != null) return null;
  if (!Number.isInteger(g.n) || g.n < 4 || g.n > 8 || !Array.isArray(g.nodes) || !Array.isArray(g.roads)) return null;
  const roles = g.nodes.filter(nd => nd.role);
  if (roles.length !== 1) return null;
  const tot = roles[0];
  if (tot.label !== "?" || tot.amount != null) return null;
  if (!((tot.role === "A" && tot.t === g.n) || (tot.role === "P" && tot.t === 0))) return null;
  if (g.nodes.find(nd => nd.t === tot.t) !== tot) return null;                         // the bottom of its day's stack
  const pays = g.nodes.filter(nd => nd !== tot);
  if (pays.length < 2 || pays.length > 3) return null;
  if (!pays.every(nd => Number.isInteger(nd.amount) && nd.amount > 0 && nd.label == null && !nd.out && Number.isInteger(nd.t) && nd.t >= 0 && nd.t <= g.n)) return null;
  if (new Set(pays.map(p => p.amount)).size !== pays.length || new Set(pays.map(p => p.t)).size !== pays.length) return null;
  if (tot.role === "P" && (pays.some(p => p.t === 0) || !pays.some(p => p.t === g.n))) return null;
  if (g.roads.length < 1 || g.roads.length > 2) return null;
  const roads = g.roads.map(r => { const m = String(r.rate).match(/^(\d+)% p\.a\.$/); return m ? { from: r.from, to: r.to, rate: Number(m[1]) } : null; });
  if (roads.some(r => !r) || roads[0].from !== 0 || roads[roads.length - 1].to !== g.n) return null;
  if (roads.some((r, j) => r.to - r.from < 2 || (j > 0 && (r.from !== roads[j - 1].to || r.rate === roads[j - 1].rate)))) return null;
  const words = f11Text(q.prompt);
  const said = [...words.matchAll(/(\d+)% p\.a\. compounded (annually|half-yearly|quarterly|monthly)/g)];
  if (said.length !== roads.length || said.some((m, j) => Number(m[1]) !== roads[j].rate)) return null;
  if (roads.length === 2) {
    const ch = words.match(/from T(\d+) the rate is/);
    if (!ch || Number(ch[1]) !== roads[1].from) return null;
  }
  /* the story's own first sentence: "She saves at …" or "He borrows the total, P, at …" */
  const saving = /^(?:She|He) saves at /.test(words), loan = /^(?:She|He) borrows the total, P, at /.test(words);
  if (saving === loan || saving !== (tot.role === "A")) return null;
  const items = [{ t: tot.t, total: true }, ...pays.map(p => ({ t: p.t, v: p.amount }))];
  return { n: g.n, c: roads.length === 2 ? roads[1].from : null, roads, items, role: tot.role, words };
}
export function f11Diagnose(q, skill) {
  const s = f11Scene(q);
  if (!s) return "the scene does not read back (timeline, roads, rates, the total, the story)";
  const counts = Array.from({ length: s.n + 1 }, (_, D) => f11Count(s, D));
  const min = Math.min(...counts);
  const asked = re => { const m = s.words.match(re); const D = m ? Number(m[1]) : NaN; return D >= 0 && D <= s.n ? D : NaN; };
  if (skill === "sameAnswer") {
    if (q.type !== "yesno" || q.yes !== false) return "the answer is not \"no\"";
    const m = s.words.match(/meet at T(\d+) instead of T(\d+), does the final answer for ([AP]) change\?/);
    if (!m || m[1] === m[2] || Number(m[1]) > s.n || Number(m[2]) > s.n || m[3] !== s.role) return "not two different days on the line, or the wrong letter";
    return null;
  }
  const opts = q.options || [], right = opts.filter(o => o.correct);
  if (q.type !== "mc" || right.length !== 1) return "not an mc with exactly one right option";
  if (skill === "fewestCars") {
    const ts = opts.map(o => f11T(o.label));
    if (opts.length < 3 || opts.length > 4) return `${opts.length} options (want 3 or 4)`;
    if (ts.some(t => !(t >= 0 && t <= s.n)) || new Set(ts).size !== ts.length) return "an option is not a T on the line";
    if (!ts.includes(s.n)) return "the end day is not an option";
    const off = opts.find(o => f11Note(o.note) !== counts[f11T(o.label)]);
    if (off) return `the note on ${f11Text(off.label)} ("${f11Text(off.note)}") is not its count (${counts[f11T(off.label)]})`;
    const best = f11T(right[0].label);
    if (counts[best] !== min) return `the marked day needs ${counts[best]} cars, the fewest is ${min}`;
    if (counts.filter(k => k === min).length !== 1) return "two days tie for the fewest (the tie rule: one day only)";
    return null;
  }
  if (skill === "carCountAt" || skill === "carCountAgain") {
    const D = asked(/If we meet at T(\d+), how many cars are needed altogether\?/);
    if (!Number.isInteger(D)) return "no meeting day in the question";
    if (numOf(right[0].label) !== counts[D]) return `the marked count is ${f11Text(right[0].label)}, the count is ${counts[D]}`;
    if (skill === "carCountAgain" && !s.items.some(it => f11Cars(it.t, D, s.c) === 2)) return "no amount crosses the colour change";
    return null;
  }
  if (skill === "whereStands") {
    const D = asked(/Which amount is already standing on T(\d+)\?/);
    if (!Number.isInteger(D)) return "no day in the question";
    const at = s.items.filter(it => it.t === D);
    if (at.length > 1) return "it asks about a shared day";
    const lab = f11Text(right[0].label), labs = opts.map(o => f11Text(o.label));
    const NONE = `Nothing: no amount stands on T${D}`, TOTAL = `The total, ${s.role}`;
    const ok = !at.length ? lab === NONE : at[0].total ? lab === TOTAL : f11Rand(lab) === at[0].v;
    if (!ok) return `the marked option "${lab}" is not what stands on T${D}`;
    if (!s.items.every(it => it.total || labs.some(l => f11Rand(l) === it.v)) || !labs.includes(TOTAL) || !labs.includes(NONE)) return "not every amount (and the total, and nothing) is offered";
    return null;
  }
  if (skill === "colourChange") {
    if (s.c == null) return "one road: the colour never changes";
    if (f11T(right[0].label) !== s.c) return `the marked T is not the rate change T${s.c}`;
    const ts = opts.map(o => f11T(o.label));
    if (!ts.includes(0) || !ts.includes(s.n)) return "T0 and the end are not both decoys";
    return null;
  }
  if (skill === "bestReason") {
    const D = asked(/Why is T(\d+) a good meeting day here\?/);
    if (!(D > 0 && D < s.n)) return "the day is T0, the end, or off the line";
    if (counts[D] !== min) return `T${D} needs ${counts[D]} cars, the fewest is ${min}`;
    const at = s.items.filter(it => it.t === D), big = Math.max(...s.items.filter(it => !it.total).map(it => it.v));
    if (at.some(it => it.v === big)) return "the biggest payment stands there, so a decoy is true";
    const stands = at.length > 0, colour = s.c === D;
    if (!stands && !colour) return "neither reason holds";
    const want = stands && colour ? /^Both: / : stands ? /^An amount already stands there/ : /^The road changes colour there/;
    if (!want.test(f11Text(right[0].label))) return `the marked reason "${f11Text(right[0].label)}" is not the true one`;
    const labs = opts.map(o => f11Text(o.label));
    if (!labs.some(l => /^It is the end/.test(l)) || !labs.some(l => /^The biggest amount/.test(l))) return "the two plan decoys are not offered";
    return null;
  }
  return `unknown f11 skill "${skill}"`;
}

/* ============================================================
   f10 · "In or out?" — the one equation, read back from what is shown.
   Since 2026-10-11 the round keeps the TAUGHT form only: the total alone
   on the left, the payments on the right (her ruling; the one-sided form
   of the 10 Oct build is parked in briefs/finance-2/ARCHIVE-f10-jug-form-2027.md).
     · EVERY equation (a yes/no card's shown line, each option, a steps
       card's form so far with its ☐ filled by the right sign, its answer,
       the worked "one equation" line) must PARSE: each term one
       <span class="nowrap"> unit (amount with no-break thousands, or
       P / A / x, then at most one car "(1 + 0,12/12)^36" or "^(−36)" at the
       story's own rate), terms joined only by " + " / " − ", exactly one
       "=", a leading minus only on a side's first term, and the brackets
       balance. A slip here returns null and the check fails.
     · the "=" never stands alone: a single-letter left side rides with the
       first right-hand term inside ONE unit ("A = 5 000(…)^20"), any other
       left side carries it inside its last unit ("9 000 ="). An "=" on its
       own between units does not parse.
     · the scene comes from the picture: the total ("?" with its letter,
       A at the end for saving, P at T0 for a loan), the payments, at most
       ONE withdrawal drawn out (saving only, after a deposit, before the day
       of A), one road whose rate is the prompt's, the meeting day on the
       total's OWN day (the day of A; T0 for a loan, so every repayment
       drives back in reverse gear), and the story's "R… at T…" mentions
       match the nodes.
     · the expected equation: the total alone on the left with no car;
       every deposit and repayment plus, every withdrawal minus, each with
       its car to the meeting day: exponent (meeting day − t) × k.
     · two equations are the same when left − right holds the same signed
       terms, or all of them negated; they are the same BY VALUE when, on
       top of that, every exponent is shifted by one constant (both sides
       × one car). No two options may be the same by value: a decoy that is
       the right equation in disguise would mark a right learner wrong
       (gotcha 4).
     · no learner text says "tidy", "= 0", "lump sum" / "lumpsum" or "jug
       form" (her 11 Oct ruling).
   ============================================================ */
const f10Num = s => Number(String(s).replace(/[\s  ]/g, "").replace(",", "."));
/* "R2 912,58" / "−R2 912,58" (tags stripped) → cents; NaN if not money */
function f10Cents(label) {
  const t = unsup(label).replace(/<[^>]+>/g, "");                         // Fix A: a sup is never silently dropped
  const m = t.match(/^(−?)R(\d{1,3}(?: \d{3})*,\d\d)$/);
  return m ? (m[1] ? -1 : 1) * Math.round(f10Num(m[2]) * 100) : NaN;
}
const f10Rate = s => (s.k === 1 ? C(toFrac(s.r)) : `${C(toFrac(s.r))}/${s.k}`);
/* f10 review 1: "half‑yearly" is written with a non-breaking hyphen (U+2011) */
const f10Word = w => String(w).replace("‑", "-");
const F10_TERM = /^(−)?(\d{1,3}(?: \d{3})*|P|A|x)(?:\(1 \+ (0,\d+(?:\/\d+)?)\)\^(\d+|\(−\d+\)))?$/;
export function f10ParseEq(html, iText = null) {
  if (html == null) return null;
  const units = [];
  const unit = inner => { units.push(inner); return ` #${units.length - 1} `; };
  /* f10 review 1: a unit "TERM =" or "TERM = RIGHT" (RIGHT a lone 0 or a
     term) holds the equals sign; it becomes the tokens TERM, "=g", RIGHT */
  /* Fix A: each car's <sup> back to its caret first, then parsed as before */
  const s = unsup(html).replace(/<span class="nowrap">([^<]*)<\/span>/g, (m, inner) => {
    const k = inner.indexOf(" =");
    if (k < 0) return inner.includes("=") ? " ! " : unit(inner);           // "=" leading a unit: free to start a line
    const rest = inner.slice(k + 2);
    if (rest.includes("=") || (rest && !rest.startsWith(" "))) return " ! ";
    return unit(inner.slice(0, k)) + " =g " + (rest.trim() ? unit(rest.trim()) : "");
  });
  if (/[<>]/.test(s)) return null;                                         // a term that is not its own unbreakable unit
  const toks = s.trim().split(/ +/).filter(Boolean);
  const sides = [[], []];
  let side = 0, want = "operand", sign = 1;
  for (let j = 0; j < toks.length; j++) {
    const tk = toks[j];
    if (want === "operand") {
      const m = /^#(\d+)$/.exec(tk);
      if (!m) return null;
      const body = units[Number(m[1])];
      if (body === "0") {                                                  // a right side that is a lone 0, last
        if (side !== 1 || sides[1].length || sign !== 1 || j !== toks.length - 1) return null;
        want = "zero"; continue;
      }
      let depth = 0;
      for (const ch of body) { depth += ch === "(" ? 1 : ch === ")" ? -1 : 0; if (depth < 0) return null; }
      if (depth !== 0) return null;                                        // brackets balance
      const tm = F10_TERM.exec(body);
      if (!tm) return null;
      if (tm[1] && (sides[side].length || sign !== 1)) return null;       // a leading minus only on a side's first term
      if (tm[3] != null && iText != null && tm[3] !== iText) return null; // every car at the story's own rate
      const c = /^\d/.test(tm[2]) ? Number(tm[2].replace(/ /g, "")) : tm[2];
      const e = tm[4] == null ? 0 : tm[4].startsWith("(") ? -Number(tm[4].slice(2, -1)) : Number(tm[4]);
      if (tm[4] != null && !(Number.isInteger(e) && e !== 0)) return null;
      sides[side].push({ s: sign * (tm[1] ? -1 : 1), c, e });
      sign = 1; want = "op";
    } else if ((tk === "+" || tk === "−") && want === "op") { sign = tk === "+" ? 1 : -1; want = "operand"; }
    else if (tk === "=g" && side === 0 && want === "op") { side = 1; want = "operand"; sign = 1; }
    else return null;                                                      // a bare "=" between units never parses
  }
  if (side !== 1 || want === "operand") return null;
  return { L: sides[0], R: sides[1] };
}
const f10Key = ts => ts.map(t => `${t.s}|${t.c}|${t.e}`).sort().join(";");
const f10Zero = eq => [...eq.L, ...eq.R.map(t => ({ ...t, s: -t.s }))];
const f10Flip = ts => ts.map(t => ({ ...t, s: -t.s }));
export function f10Equiv(eq, zero) {
  const a = f10Key(f10Zero(eq));
  return a === f10Key(zero) || a === f10Key(f10Flip(zero));
}
/* the same equation BY VALUE: the same signed terms (or all negated), each
   exponent shifted by ONE constant d (both sides × the car ^d). With d = 0
   this is f10Equiv. Terms are matched by their amount or letter (each one
   appears once in an f10 equation) */
export function f10ByValue(a, b) {
  const za = f10Zero(a), zb = f10Zero(b);
  if (za.length !== zb.length) return false;
  const byC = new Map(zb.map(t => [String(t.c), t]));
  if (byC.size !== zb.length || new Set(za.map(t => String(t.c))).size !== za.length)
    return f10Key(za) === f10Key(zb) || f10Key(za) === f10Key(f10Flip(zb));
  let d = null, f = null;
  for (const t of za) {
    const u = byC.get(String(t.c));
    if (!u) return false;
    const dd = u.e - t.e, ff = u.s === t.s ? 1 : -1;
    if (d === null) { d = dd; f = ff; } else if (dd !== d || ff !== f) return false;
  }
  return true;
}
/* the equation shown in a yes/no prompt: the line between the two <br>s */
function f10PromptEq(q) { const parts = String(q.prompt).split("<br>"); return parts.length === 3 ? parts[1] : null; }
/* the equation at the end of a worked line ("The one equation: …") */
function f10SolEq(q, start) {
  const st = (q.solution || []).find(x => String(x.s).startsWith(start));
  return st ? String(st.s).slice(String(st.s).lastIndexOf(": ") + 2) : null;
}
export function f10Scene(q) {
  const g = q && q.graph;
  if (!g || g.type !== "timeline" || !Array.isArray(g.nodes) || !Array.isArray(g.roads) || g.roads.length !== 1) return null;
  const prompt = String(q.prompt);
  const said = [...prompt.matchAll(/(\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)/g)];
  if (said.length !== 1) return null;
  const r = Number(said[0][1]), k = F9_K[f10Word(said[0][2])];
  const road = g.roads[0], rm = String(road.rate).match(/^(\d+)% p\.a\.$/);
  if (!rm || Number(rm[1]) !== r || road.from !== 0 || road.to !== g.n) return null;
  const roles = g.nodes.filter(nd => nd.role);
  if (roles.length !== 1) return null;
  const tot = roles[0], saving = tot.role === "A";
  if (!((saving && tot.t === g.n) || (tot.role === "P" && tot.t === 0))) return null;
  if (g.meet !== tot.t) return null;                                        // the meeting day is the total's own day
  if (g.nodes.find(nd => nd.t === tot.t) !== tot) return null;            // the bottom of its day's stack, right above its letter
  /* HER RULING: the total is never a bare money label: "?" with its letter, or a known loan WITH its letter */
  const known = tot.label == null && Number.isFinite(tot.amount);
  if (!known && !(tot.label === "?" && tot.amount == null)) return null;
  if (known && saving) return null;
  const pays = g.nodes.filter(nd => nd !== tot);
  if (!pays.every(nd => Number.isInteger(nd.amount) && nd.amount > 0 && Number.isInteger(nd.t) && nd.t >= 0 && nd.t <= g.n && nd.label == null && !nd.role)) return null;
  if (new Set(pays.map(x => x.amount)).size !== pays.length || new Set(pays.map(x => x.t)).size !== pays.length) return null;
  const outs = pays.filter(x => x.out);
  if (saving) {
    if (outs.length > 1 || !pays.some(x => !x.out)) return null;            // at most one withdrawal, at least one deposit
    const w = outs[0];
    if (w && !(w.t > 0 && w.t < g.n && pays.some(x => !x.out && x.t < w.t))) return null;   // after a deposit, before the day of A
  } else if (outs.length || pays.some(x => x.t === 0)) return null;
  /* the story, where it names amounts, names exactly the drawn ones */
  const said2 = [...prompt.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
  if (said2.length && (said2.length !== pays.length || !said2.every(x => pays.some(nd => nd.amount === x.v && nd.t === x.t)))) return null;
  const wd = [...prompt.matchAll(/withdraws <span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)];
  if (wd.length && (wd.length !== 1 || !outs.length || f10Num(wd[0][1]) !== outs[0].amount || Number(wd[0][2]) !== outs[0].t)) return null;
  return { saving, known, n: g.n, meet: g.meet, r, k, outs: outs.length, pays: pays.map(x => ({ t: x.t, v: x.amount, out: !!x.out })) };
}
/* left − right of the right equation: the total alone, every payment in
   its car to the meeting day, exponent (meeting day − t) × k */
function f10Expect(s) {
  const e = t => (s.meet - t) * s.k;
  return s.saving
    ? [...s.pays.map(x => ({ s: x.out ? -1 : 1, c: x.v, e: e(x.t) })), { s: -1, c: "A", e: 0 }]
    : [{ s: 1, c: "P", e: 0 }, ...s.pays.map(x => ({ s: -1, c: x.v, e: e(x.t) }))];
}
const f10Lead = s => ({ c: s.saving ? "A" : "P", e: 0 });
const f10Outs = s => new Set(s.pays.filter(x => x.out).map(x => x.v));
const f10Allowed = s => new Set([s.saving ? "A" : "P", ...s.pays.map(x => x.v)]);
/* the right equation itself, in time order */
const f10Right = s => ({ L: [{ s: 1, ...f10Lead(s) }], R: s.pays.slice().sort((a, b) => a.t - b.t).map(x => ({ s: x.out ? -1 : 1, c: x.v, e: (s.meet - x.t) * s.k })) });
/* the taught form's shape: the total's term alone on the left, every
   payment positive on the right except a withdrawal, which is minus */
function f10TaughtShape(eq, lead, outs) {
  return eq.L.length === 1 && eq.L[0].s === 1 && eq.L[0].c === lead.c && eq.L[0].e === lead.e
    && eq.R.every(t => t.s === (outs.has(t.c) ? -1 : 1));
}
/* an mc of equations: every option parses (at the story's rate, with only
   the story's terms), exactly one option is the right equation, it is
   marked correct and is in the taught form, and no two options are the
   same equation, not even by value */
function f10McCheck(q, s, expect, lead, allowed) {
  if (q.type !== "mc" || !Array.isArray(q.options) || q.options.length !== 4) return false;
  const parsed = q.options.map(o => ({ o, eq: f10ParseEq(o.label, f10Rate(s)) }));
  if (parsed.some(p => !p.eq || [...p.eq.L, ...p.eq.R].some(t => !allowed.has(t.c)))) return false;
  const right = parsed.filter(p => f10Equiv(p.eq, expect));
  if (right.length !== 1 || !right[0].o.correct) return false;
  if (!f10TaughtShape(right[0].eq, lead, f10Outs(s))) return false;
  for (let i = 0; i < parsed.length; i++)
    for (let j = i + 1; j < parsed.length; j++) if (f10ByValue(parsed[i].eq, parsed[j].eq)) return false;
  return true;
}

/* the steps cards (inOrOutSaving, inOrOutLoan): the ☐ of a step's form so
   far, filled with a sign, so the form parses like any other equation. The
   slot rides in its amount's unit ("☐ 3 000(…)^8", or "A = ☐ 5 000(…)^20"
   when it is the first term) */
export function f10FillSlot(html, sign) {
  const neg = sign < 0;
  return unsup(html)
    .replace(/<span class="nowrap">([AP] = )☐ ([^<]*)<\/span>/, (m, g, b) => `<span class="nowrap">${g}${neg ? "−" : ""}${b}</span>`)
    .replace(/<span class="nowrap">☐ ([^<]*)<\/span>/, (m, b) => `${neg ? "−" : "+"} <span class="nowrap">${b}</span>`);
}
/* written out here on purpose, not imported from the module */
const F10_IN = "+ (in)", F10_OUT = "− (out)";
const F10_WHERE = ["+ on the right", "− on the right", "alone on the left"];
const F10_NOWHERE = "nowhere: it never enters the account";
/* a steps card: one mc step per drawn amount, in time order. Step j names
   that amount first ("R3 000 at T2: in or out?"), offers exactly the two
   (saving) or three (loan) options, marks the right one (a deposit in, a
   withdrawal out; a repayment + on the right), and shows the taught form
   so far: the total alone on the left, the j amounts before it with their
   right signs and cars, then ONE ☐ and this amount in its car. The answer
   and the worked "one equation" line are the finished taught form */
function f10StepsCheck(q, loan) {
  const s = f10Scene(q);
  if (!s || s.known || s.saving === loan || q.type !== "steps" || !Array.isArray(q.steps)) return false;
  const pays = s.pays.slice().sort((a, b) => a.t - b.t);
  if (q.steps.length !== pays.length || pays.length < 2 || pays.length > (loan ? 2 : 3)) return false;
  if (!new RegExp(`The meeting day is T${s.meet}, ${loan ? "the day of the loan" : "the day of A"}\\.`).test(String(q.prompt))) return false;
  const iT = f10Rate(s), lead = f10Lead(s), right = f10Right(s);
  for (let j = 0; j < pays.length; j++) {
    const st = q.steps[j], x = pays[j], t = right.R[j];
    if (!st || st.kind !== "mc" || !st.hint || !Array.isArray(st.options)) return false;
    const want = loan ? F10_WHERE : [F10_IN, F10_OUT];
    if (st.options.map(o => String(o.label)).sort().join("|") !== want.slice().sort().join("|")) return false;
    const ok = st.options.filter(o => o.correct);
    if (ok.length !== 1 || ok[0].label !== (loan ? "+ on the right" : x.out ? F10_OUT : F10_IN)) return false;
    const m = String(st.prompt).match(/^<b><span class="nowrap">R([\d ]+)<\/span> at T(\d+)<\/b>: (in or out|where does it go)\?<br>([\s\S]+)$/);
    if (!m || f10Num(m[1]) !== x.v || Number(m[2]) !== x.t || m[3] !== (loan ? "where does it go" : "in or out")) return false;
    if ((m[4].match(/☐/g) || []).length !== 1) return false;
    const eq = f10ParseEq(f10FillSlot(m[4], t.s), iT);
    if (!eq || eq.L.length !== 1 || eq.L[0].c !== lead.c || eq.L[0].e !== 0 || eq.L[0].s !== 1) return false;
    if (eq.R.length !== j + 1 || !eq.R.every((u, i) => u.s === right.R[i].s && u.c === right.R[i].c && u.e === right.R[i].e)) return false;
  }
  const expect = f10Expect(s), outs = f10Outs(s);
  const fin = f10ParseEq(q.answerLabel, iT), sol = f10ParseEq(f10SolEq(q, "The one equation"), iT);
  return !!fin && !!sol && [fin, sol].every(eq => f10Equiv(eq, expect) && f10TaughtShape(eq, lead, outs));
}
/* the yes/no card: the shown line is the taught form (q.yes), or wrong by
   EXACTLY ONE slip, and really wrong (not the right equation by value):
     · the withdrawal written plus, everything else as taught; or
     · one payment written on the total's side with the sign it has on the
       right, the rest as taught, the right side still starting plus.
   The answer names the slip; the worked line is the right equation */
function f10YesNoCheck(q) {
  const s = f10Scene(q);
  if (!s || s.known || q.type !== "yesno" || typeof q.yes !== "boolean") return false;
  const iT = f10Rate(s), expect = f10Expect(s), lead = f10Lead(s), outs = f10Outs(s), right = f10Right(s);
  const shown = f10ParseEq(f10PromptEq(q), iT);
  if (!shown || [...shown.L, ...shown.R].some(t => !f10Allowed(s).has(t.c))) return false;
  const ok = f10Equiv(shown, expect) && f10TaughtShape(shown, lead, outs);
  if (q.yes !== ok) return false;
  const fixed = f10ParseEq(f10SolEq(q, ok ? "The one equation" : "The right equation"), iT);
  if (!fixed || !f10Equiv(fixed, expect) || !f10TaughtShape(fixed, lead, outs)) return false;
  const lab = String(q.answerLabel);
  if (ok) return /^Yes: /.test(lab);
  if (f10ByValue(shown, right)) return false;                              // really wrong, not just rearranged
  const key = t => `${t.c}|${t.e}`;
  const wantR = new Map(right.R.map(t => [key(t), t]));
  const leadOk = t => t.c === lead.c && t.e === 0 && t.s === 1;
  if (shown.L.length === 1) {
    /* slip 1: the withdrawal's sign flipped */
    if (!leadOk(shown.L[0]) || shown.R.length !== right.R.length || !shown.R.every(t => wantR.has(key(t)))) return false;
    const diff = shown.R.filter(t => wantR.get(key(t)).s !== t.s);
    if (diff.length !== 1 || !outs.has(diff[0].c) || diff[0].s !== 1) return false;
    const x = s.pays.find(p => p.v === diff[0].c);
    return lab.startsWith(`No: the withdrawal at T${x.t} needs a minus`);
  }
  /* slip 2: one payment on the total's side, keeping the sign it has on the right */
  if (shown.L.length !== 2 || !leadOk(shown.L[0]) || shown.R.length !== right.R.length - 1) return false;
  const M = shown.L[1], m = wantR.get(key(M));
  if (!m || m.s !== M.s || !shown.R.length || shown.R[0].s !== 1) return false;
  if (!shown.R.every(t => key(t) !== key(M) && wantR.has(key(t)) && wantR.get(key(t)).s === t.s)) return false;
  const x = s.pays.find(p => p.v === M.c);
  const word = x.out ? "withdrawal" : s.saving ? "deposit" : "repayment";
  return lab.startsWith(`No: the ${word} at T${x.t} is written on ${lead.c}'s side: only the total stands alone on the left`);
}
/* every text a learner can read on an f10 card */
export function f10LearnerTexts(q) {
  const steps = q.steps || [];
  return [q.prompt, q.hint, q.answerLabel, ...(q.options || []).map(o => o.label),
    ...steps.flatMap(x => [x.prompt, x.hint, ...(x.options || []).map(o => o.label)]),
    ...(q.solution || []).flatMap(x => [x.s, x.r])].filter(x => x != null).map(String);
}
/* her 11 Oct ruling: this year's f10 never says these (the one-sided form
   and its moving step are parked for 2027) */
const F10_BANNED = [[/tidy/i, "tidy"], [/=\s*0(?![\d,])/, "= 0"], [/lump\s?sum/i, "lump sum"], [/jug form/i, "jug form"]];
export function f10Banned(q) {
  const t = unsup(f10LearnerTexts(q).join(" | ")).replace(/<[^>]+>/g, "");
  return F10_BANNED.filter(([re]) => re.test(t)).map(([, w]) => w);
}
const f10Clean = q => f10Banned(q).length === 0;
/* every equation a learner reads on an f10 card (prompt, options, a steps
   card's forms with the ☐ filled by the marked sign, its answer, worked
   lines) parsed, for the harness's f10 block: [{ where, ok }] */
export function f10EquationsOf(q) {
  const out = [];
  /* f10 review 1: the "=" sits INSIDE a unit, so an equation is any line
     that holds a nowrap unit and an "=" (a bare one fails the parse) */
  const looks = h => /<span class="nowrap">[^<]*<\/span>/.test(unsup(h)) && /=/.test(unsup(h).replace(/<[^>]+>/g, ""));   // Fix A: sups back to carets first
  const pe = f10PromptEq(q);
  if (pe != null && looks(pe)) out.push({ where: "prompt", ok: !!f10ParseEq(pe) });
  (q.options || []).forEach((o, j) => { if (looks(o.label)) out.push({ where: `option ${j + 1}`, ok: !!f10ParseEq(o.label) }); });
  (q.steps || []).forEach((st, j) => {
    const parts = String(st.prompt).split("<br>"), form = parts[parts.length - 1];
    const c = (st.options || []).find(o => o.correct);
    if (parts.length === 2 && looks(form)) out.push({ where: `step ${j + 1}`, ok: !!c && (form.match(/☐/g) || []).length === 1 && !!f10ParseEq(f10FillSlot(form, /^−/.test(String(c.label)) ? -1 : 1)) });
  });
  if (q.type === "steps" && looks(q.answerLabel)) out.push({ where: "answer", ok: !!f10ParseEq(q.answerLabel) });
  (q.solution || []).forEach((st, j) => {
    const s = String(st.s), i = s.lastIndexOf(": ");
    if (i >= 0 && looks(s.slice(i + 2)) && !/Interest|loan =/.test(s)) out.push({ where: `worked line ${j + 1}`, ok: !!f10ParseEq(s.slice(i + 2)) });
  });
  return out;
}

/* ============================================================
   f9 · "Car or no car?" — the scene, read back from what is drawn.
     · the named amount is the ONE bold rand in the prompt, and it is
       drawn on exactly one node;
     · the meeting day is the flag (spec.meet), a node on the line;
     · the roads cover the whole line in order, each "N% p.a."; when the
       prompt states the rates, it states one "N% p.a. compounded …" per
       road in road order, and a second road starts where the prompt says
       ("from T3 the rate is …"); k comes from those words;
     · HER RULING: the total is never a bare money label. Exactly one
       entry carries a role, it is drawn "?", A sits at the end and P at
       T0, and on a shared day (the last deposit on the day of A) it is
       the BOTTOM label, right above its letter. A loan never has a
       repayment on T0. Payments are distinct whole rand.
   Any failure returns null, and every f9 recompute then fails loudly.
   ============================================================ */
const F9_K = { annually: 1, "half-yearly": 2, quarterly: 4, monthly: 12 };
function f9Scene(q) {
  const g = q && q.graph;
  if (!g || g.type !== "timeline" || !Number.isInteger(g.meet) || g.meet < 0 || g.meet > g.n) return null;
  if (!Array.isArray(g.roads) || g.roads.length < 1 || g.roads.length > 2 || !Array.isArray(g.nodes)) return null;
  const prompt = String(q.prompt);
  const named = [...prompt.matchAll(/<b>R(\d[\d\s]*)<\/b>/g)].map(m => Number(m[1].replace(/\s/g, "")));
  if (named.length !== 1) return null;
  const v = named[0], on = g.nodes.filter(nd => nd.amount === v);
  if (on.length !== 1) return null;
  const roleNodes = g.nodes.filter(nd => nd.role);
  if (roleNodes.length !== 1) return null;
  const tot = roleNodes[0];
  if (tot.label !== "?" || tot.amount != null) return null;
  if (!((tot.role === "A" && tot.t === g.n) || (tot.role === "P" && tot.t === 0))) return null;
  if (g.nodes.find(nd => nd.t === tot.t) !== tot) return null;                // bottom of its day's stack
  const pays = g.nodes.filter(nd => nd !== tot);
  if (!pays.every(nd => Number.isInteger(nd.amount) && nd.amount > 0 && Number.isInteger(nd.t) && nd.t >= 0 && nd.t <= g.n)) return null;
  if (new Set(pays.map(p => p.amount)).size !== pays.length || new Set(pays.map(p => p.t)).size !== pays.length) return null;
  if (tot.role === "P" && pays.some(p => p.t === 0)) return null;
  const roads = g.roads.map(r => {
    const m = String(r.rate).match(/^(\d+)% p\.a\.$/);
    return m ? { from: r.from, to: r.to, rate: Number(m[1]), k: null } : null;
  });
  if (roads.some(r => !r) || roads[0].from !== 0 || roads[roads.length - 1].to !== g.n) return null;
  if (roads.some((r, j) => j > 0 && (r.from !== roads[j - 1].to || r.rate === roads[j - 1].rate))) return null;
  const said = [...prompt.matchAll(/(\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)/g)];   // f9's HOW writes a no-break hyphen since the Fix A review
  let ratesShown = false;
  if (said.length) {
    if (said.length !== roads.length || said.some((m, j) => Number(m[1]) !== roads[j].rate)) return null;
    said.forEach((m, j) => { roads[j].k = F9_K[f10Word(m[2])]; });
    if (roads.length === 2) {
      const ch = prompt.match(/from T(\d+) the rate is/);
      if (!ch || Number(ch[1]) !== roads[1].from) return null;
    }
    ratesShown = true;
  }
  return { v, at: on[0].t, meet: g.meet, n: g.n, roads, ratesShown };
}
/* the trip to the meeting day: its direction and the years on each road it
   drives over, in travel order (reverse gear meets the later road first) */
function f9Trip(s) {
  const dir = Math.sign(s.meet - s.at), lo = Math.min(s.at, s.meet), hi = Math.max(s.at, s.meet);
  const legs = [];
  s.roads.forEach(r => { const years = Math.min(hi, r.to) - Math.max(lo, r.from); if (years > 0) legs.push({ rate: r.rate, k: r.k, years }); });
  if (dir < 0) legs.reverse();
  return { dir, legs };
}

/* ============================================================
   f8 · "Which one is the total?" (THE JUG round, rebuilt 2026-10-11),
   every card read back from its own words. Her rulings: the total is
   the jug, a STATE (has / borrows / wants to have / owes); the coins
   are ACTIONS (deposits / withdraws / pays); a rate-and-time sentence
   is neither. Written here, not imported, so a slip in the module's
   own tables cannot pass itself.
     · a paragraph card is a steps chain of three mc steps. Step 1:
       3 to 5 sentence chips, each read as jug / coin / rate from its
       own words alone; exactly ONE jug, the one marked correct, a state
       sentence; every other chip a coin or a rate-and-time sentence,
       each with a pill (note) and a miss sentence (why) that names its
       kind ("That is a coin…", "…a rate-and-time sentence…").
     · step 2 "Savings or loan?" agrees with the paragraph: a loan when
       the jug sentence borrows or owes (hire purchase too: a down
       payment, never the word "deposit" on that card), else savings.
     · step 3 offers exactly T0 and T<n>, n the last year the paragraph
       names; the jug sits at T0 for a loan, at T<n> for saving. Its
       feedback timeline (step.graphAfter) has ONE node, the "?" with
       its role letter (P at T0, A at T<n>), no amount, no tapLabels,
       and passes the engine's own verify. No other timeline anywhere.
     · one textbook name per paragraph, from the class bank's ten.
     · a recall card: four distinct phrases with four distinct amounts,
       exactly one jug (the correct one), three coins, each with a note.
     · every text a learner can read (prompt, hints, chips, notes, whys,
       answer, worked lines, the discovery frames) never says "A value",
       "final answer" or "wrong", has no em-dash, no HTML entity, no
       caret; every money amount, "p.a." and "N years" is one
       unbreakable unit with a literal U+00A0 inside; "half‑yearly"
       keeps its non-breaking hyphen. None says "lump" EXCEPT frame 1
       of card 1's discovery slide.
     · the discovery slide (her notes, 11 Oct 16:54 and 16:56): card 1
       and only card 1 carries reveal frames, exactly three, revealMode
       "replace", one jug each, in the order empty, savings, loan. The
       textbook's word is phased out, not dropped cold: frame 1 MUST say
       "the total (the lumpsum)" and "we just call it the total";
       frames 2 and 3 never say "lump".
   f8Diagnose(q, first) returns null when all of that holds, else the
   first reason; first is true for card 1 (jugTwoDeposits) only.
   ============================================================ */
const F8_NAMES = ["Brenda", "Mvelo", "Bradley", "Jason", "Mandy", "Brian", "Stephanie", "Bob", "Arnold", "David"];
const F8_NOT_NAMES = new Set(["He", "She", "How", "The", "What", "On"]);     // words that open a sentence
const f8Plain = h => unsup(h).replace(/<[^>]+>/g, "").replace(/[  ]/g, " ").replace(/‑/g, "-").replace(/\s+/g, " ").trim();
const F8_ACTION = /\b(deposits?|withdraws|pays|repays)\b|\btakes\b.*\bout\b/i;
const F8_STATE = /\b(borrows|owes|has|have)\b|\bhow much is in\b/i;
/* jug / coin / rate from a sentence's own words, "?" when it reads as none or both */
export function f8KindOf(html) {
  const t = f8Plain(html), act = F8_ACTION.test(t), st = F8_STATE.test(t);
  if (st && !act) return "jug";
  if (act && !st) return "coin";
  if (!act && !st && /\d+% p\.a\./.test(t) && !/R\d/.test(t)) return "rate";
  return "?";
}
const f8Count = (s, re) => (String(s).match(re) || []).length;
export function f8LearnerTexts(q) {
  const steps = q.steps || [];
  return [q.prompt, q.hint, q.answerLabel,
    ...(q.options || []).flatMap(o => [o.label, o.note, o.why]),
    ...steps.flatMap(st => [st.prompt, st.hint, st.graphAfterCap, ...(st.options || []).flatMap(o => [o.label, o.note, o.why])]),
    ...(q.solution || []).flatMap(x => [x.s, x.r])].filter(x => x != null && x !== "").map(String);
}
/* lumpOk: card 1's discovery frames, checked for the word by f8RevealIssue */
function f8TextIssue(t, lumpOk = false) {
  const p = f8Plain(t);
  if (!lumpOk && /lump/i.test(p)) return `says "lump": ${p.slice(0, 60)}`;
  if (/\bA value\b/i.test(p)) return `says "A value": ${p.slice(0, 60)}`;
  if (/final answer/i.test(p)) return `says "final answer": ${p.slice(0, 60)}`;
  if (/wrong/i.test(p)) return `says "wrong": ${p.slice(0, 60)}`;
  if (/—/.test(t)) return `an em-dash: ${p.slice(0, 60)}`;
  if (/&(?:[a-z]+|#\d+);/i.test(t)) return `an HTML entity: ${p.slice(0, 60)}`;
  if (/half-yearly/.test(t)) return "half-yearly with a breakable hyphen";
  if (p.includes("^")) return `a caret: ${p.slice(0, 60)}`;
  if (f8Count(p, /R\d/g) !== f8Count(t, /<span class="nowrap">R\d{1,3}(?: \d{3})*<\/span>/g)) return `a money amount outside its unbreakable unit: ${p.slice(0, 60)}`;
  if (f8Count(p, /p\.a\./g) !== f8Count(t, /<span class="nowrap">\d+% p\.a\.<\/span>/g)) return `"p.a." outside its unit: ${p.slice(0, 60)}`;
  if (f8Count(p, /\b\d+ years?\b/g) !== f8Count(t, /<span class="nowrap">\d+ years?<\/span>/g)) return `a number of years outside its unit: ${p.slice(0, 60)}`;
  return null;
}
function f8NameIssue(texts, wantOne) {
  const caps = texts.flatMap(t => f8Plain(t).match(/\b[A-Z][a-z’']+\b/g) || []).filter(w => !F8_NOT_NAMES.has(w));
  const odd = caps.filter(w => !F8_NAMES.includes(w));
  if (odd.length) return `"${odd[0]}" is not a textbook name`;
  const named = new Set(caps);
  if (wantOne && named.size !== 1) return `${named.size} names on one paragraph (want 1)`;
  if (!wantOne && named.size) return "a name on a recall card";
  return null;
}
function f8ParagraphIssue(q) {
  const steps = q.steps || [];
  if (steps.length !== 3 || steps.some(st => st.kind !== "mc")) return "not a chain of three mc steps";
  if (q.graph || q.graphs || steps.some(st => st.graph)) return "a timeline before the words (only step 3's feedback may draw one)";
  const [s1, s2, s3] = steps;
  const chips = s1.options || [];
  if (chips.length < 3 || chips.length > 5) return `${chips.length} sentence chips (want 3 to 5)`;
  const kinds = chips.map(o => f8KindOf(o.label));
  const bad = kinds.indexOf("?");
  if (bad >= 0) return `a chip that is neither the jug, a coin nor rate and time: ${f8Plain(chips[bad].label)}`;
  if (kinds.filter(k => k === "jug").length !== 1) return `${kinds.filter(k => k === "jug").length} jug sentences`;
  const jug = chips[kinds.indexOf("jug")];
  if (!jug.correct || chips.filter(o => o.correct).length !== 1) return "the chip marked correct is not the one jug sentence";
  for (let j = 0; j < chips.length; j++) {
    const o = chips[j];
    if (!o.note) return "a chip without its kind pill";
    if (kinds[j] === "coin" && !(/^That is a coin/.test(o.why || "") && /coin/.test(o.note))) return `a coin chip whose miss does not say it is a coin: ${f8Plain(o.label)}`;
    if (kinds[j] === "rate" && !(/rate-and-time sentence, not an amount/.test(o.why || "") && /rate/.test(o.note))) return "a rate chip whose miss does not say rate and time";
    if (kinds[j] === "jug" && !/jug/.test(o.note)) return "the jug chip's pill does not say jug";
  }
  const words = chips.map(o => f8Plain(o.label)).join(" ");
  const loan = /\b(borrows|owes)\b/i.test(f8Plain(jug.label));
  if (!loan && !/\baccount\b/.test(words)) return "a saving that never names the account";
  if (/down payment/.test(words) && (!loan || /\bdeposit/i.test(words))) return 'hire purchase: not a loan, or "deposit" said for the down payment';
  const l2 = (s2.options || []).map(o => String(o.label));
  if (l2.length !== 2 || !l2.includes("Savings") || !l2.includes("Loan")) return `step 2 options ${l2.join(" / ")}`;
  if (String((s2.options.find(o => o.correct) || {}).label) !== (loan ? "Loan" : "Savings")) return "step 2: savings/loan does not agree with the paragraph";
  const yrs = [...words.matchAll(/\b(\d+) years?\b/g)].map(m => Number(m[1]));
  const n = Math.max(...yrs);
  if (!yrs.length || !(n >= 1)) return "no year named in the paragraph";
  const l3 = (s3.options || []).map(o => String(o.label));
  if (l3.length !== 2 || !l3.includes("T0") || !l3.includes(`T${n}`)) return `step 3 options ${l3.join(" / ")} (the paragraph ends at T${n})`;
  if (String((s3.options.find(o => o.correct) || {}).label) !== (loan ? "T0" : `T${n}`)) return "step 3: the jug's day is not T0 for a loan / the end for saving";
  const g = s3.graphAfter;
  if (!g || g.type !== "timeline" || g.n !== n) return "step 3 has no timeline T0..Tn on its feedback side";
  if (g.tapLabels || g.tap) return "the timeline has tap targets";
  if (!Array.isArray(g.nodes) || g.nodes.length !== 1) return `the timeline places ${(g.nodes || []).length} nodes (want the jug alone)`;
  const nd = g.nodes[0];
  if (nd.label !== "?" || nd.amount != null || nd.role !== (loan ? "P" : "A") || nd.t !== (loan ? 0 : n)) return "the timeline's node is not the \"?\" with its role letter on the jug's day";
  const vt = verifyTimeline(g).find(c => !c.ok);
  if (vt) return `timeline verify: ${vt.label}`;
  return f8NameIssue(chips.map(o => o.label), true);
}
function f8RecallIssue(q) {
  const opts = q.options || [];
  if (!/jug/.test(String(q.prompt))) return "the recall prompt does not ask for the jug";
  if (opts.length !== 4) return `${opts.length} phrases (want 4)`;
  const labels = opts.map(o => String(o.label));
  if (new Set(labels).size !== 4) return "two phrases alike";
  const amts = labels.map(l => (f8Plain(l).match(/R\d[\d ]*/) || [""])[0].trim());
  if (new Set(amts).size !== 4 || amts.some(a => !a)) return "the four amounts are not four distinct amounts";
  const kinds = labels.map(f8KindOf);
  if (kinds.filter(k => k === "jug").length !== 1 || kinds.filter(k => k === "coin").length !== 3) return `kinds ${kinds.join(",")} (want one jug and three coins)`;
  const jug = opts[kinds.indexOf("jug")];
  if (!jug.correct || opts.filter(o => o.correct).length !== 1) return "the phrase marked correct is not the jug";
  if (opts.some((o, j) => !o.note || !(kinds[j] === "jug" ? /jug/ : /coin/).test(o.note))) return "a phrase without a pill naming its kind";
  return f8NameIssue(labels, false);
}
/* card 1's discovery slide; every other card carries no frames at all */
function f8RevealIssue(q, first) {
  const frames = Array.isArray(q.reveal) ? q.reveal : [];
  if (!first) return frames.length || q.revealMode != null ? "reveal frames on a card other than card 1" : null;
  if (frames.length !== 3) return `${frames.length} discovery frames on card 1 (want 3)`;
  if (q.revealMode !== "replace") return `card 1's frames stack (revealMode ${q.revealMode}), want "replace": one jug at a time`;
  for (const f of frames) { const why = f8TextIssue(String(f), true); if (why) return `discovery frame: ${why}`; }
  const jugs = frames.map(f => f8Count(f, /class="jug /g));
  if (jugs.some(k => k !== 1)) return `the discovery frames draw ${jugs.join("/")} jugs (want one each)`;
  const modes = frames.map(f => (/class="jug-discover jd-(\w+)"/.exec(f) || [])[1]).join(",");
  if (modes !== "empty,save,loan") return `the discovery frames run ${modes} (want empty,save,loan)`;
  const [p1, p2, p3] = frames.map(f8Plain);
  if (!/the total \(the lumpsum\)/i.test(p1)) return 'frame 1 does not say "the total (the lumpsum)"';
  if (!/we just call it the total/i.test(p1)) return 'frame 1 does not say "we just call it the total"';
  if (/lump/i.test(p2) || /lump/i.test(p3)) return 'frame 2 or 3 says "lump"';
  return null;
}
export function f8Diagnose(q, first = false) {
  for (const t of f8LearnerTexts(q)) { const why = f8TextIssue(t); if (why) return why; }
  const rv = f8RevealIssue(q, first);
  if (rv) return rv;
  if (q.type === "mc") return f8RecallIssue(q);
  if (q.type === "steps") return f8ParagraphIssue(q);
  return `type "${q.type}" (want steps or mc)`;
}

/* ============================================================
   f13 · "Build the one equation" — the exam shape, read back from what
   is shown. Written 2026-10-10 alongside the round; it knows nothing of
   the module's variables.
     · the SCENE comes from the word question alone: the textbook name,
       saving ("savings account") or a loan ("borrows"), every
       "R… now" / "R… after N years" (a "withdraws" in front makes it a
       withdrawal; on a loan they are repayments), "an amount x after N
       years", Bob's "How much, P, must he deposit now?", a known total
       ("wants R… in … after N years"), the down payment, and one or two
       "N% p.a. compounded …" (a second one starts "for the first N
       years"). n is the last T named; the meeting day (step 1's prompt)
       must be the day of A for saving and T0 for a loan.
     · EVERY equation parses (f13ParseEq, f10's conventions): each term
       its own <span class="nowrap"> units, the amount with its first car
       "(1 + 0,12/12)^36" / "^(−36)" and a second car as its own unit
       right after it (f9's wrapping: a two-car term is wider than a
       360-px option), every car at one of the story's road rates, terms
       joined only by " + " / " − ", the "=" glued inside the left term's
       last unit, a leading minus only on a side's first term, brackets
       balanced.
     · the RIGHT equation is rebuilt here: the total alone on the left;
       every payment on the right, deposits and repayments plus, a
       withdrawal minus, each with one car per road it drives over to the
       meeting day (exponent ± years × k), no car on the meeting day. The
       option marked correct must be exactly that (same terms, same sides).
     · the three decoys are each ONE slip from it, one of each kind: SIGN
       (the withdrawal; with none, a repayment on a loan, a deposit on
       saving), CAR (a car on the payment standing on the meeting day, or
       on the total when no payment stands there), GEAR (one amount's
       exponents all sign-flipped).
     · the ANSWER: finlib from the story's numbers (the unknown on the left
       is the sum; a known total solves for its one unknown payment), the
       price = loan + down payment, step by step and as q.expected.
     · a timeline, when drawn, says exactly what the story says: the flag
       on the meeting day, the roads and rates, the total "?" in its ring
       with its letter (a known total its amount WITH its letter), each
       payment where the story puts it, the withdrawal drawn out.
   f13Diagnose returns null when all of that holds, else the first reason.
   ============================================================ */
const F13_NAMES = ["Brenda", "Bradley", "Jason", "Brian", "Mandy", "Bob", "Stephanie", "Arnold", "David", "Mvelo"];
const F13_CAR = /\(1 \+ (0,\d+(?:\/\d+)?)\)\^(\d+|\(−\d+\))/g;
const F13_TERM = /^(−)?(\d{1,3}(?: \d{3})*|P|A|x)((?:\(1 \+ 0,\d+(?:\/\d+)?\)\^(?:\d+|\(−\d+\)))*)$/;
const F13_CARS_ONLY = /^(?:\(1 \+ 0,\d+(?:\/\d+)?\)\^(?:\d+|\(−\d+\)))+$/;
const F13_MONEY = "<span class=\"nowrap\">R(\\d{1,3}(?:\\u00A0\\d{3})*)<\\/span>";
const f13CarsOf = text => [...String(text).matchAll(F13_CAR)].map(c => ({ i: c[1], e: c[2].startsWith("(") ? -Number(c[2].slice(2, -1)) : Number(c[2]) }));
const f13Num = s => Number(String(s).replace(/[\s  ]/g, ""));
const f13Rate = (r, k) => (k === 1 ? C(toFrac(r)) : `${C(toFrac(r))}/${k}`);
/* f12 review 1 (2026-10-10): an equation wears ONE wrapper, <span
   class="f13-eq"> (a size smaller); a two-car term is ONE unit, its two cars
   a space apart; a single-letter left side rides with the first right-hand
   term ("A = 5 500(…)"); and a term too wide for a 360-px option is cut
   before its second car, which then reads "× (1 + …)^n". A second car in a
   unit of its own WITHOUT the "×" no longer parses: it read like a new term */
const F13_CUT = /^×[\s ]/;
const f13Joined = b => String(b).replace(/(\^(?:\d+|\(−\d+\))) (?=\(1 \+)/g, "$1");   // the space between two cars of one unit
export function f13ParseEq(html, iTexts = null) {
  if (html == null) return null;
  const units = [];
  const unit = inner => { units.push(inner); return ` #${units.length - 1} `; };
  /* Fix A: each car's <sup> back to its caret first, then parsed as before */
  const s = unsup(html).replace(/^<span class="f13-eq">([\s\S]*)<\/span>$/, "$1").replace(/<span class="nowrap">([^<]*)<\/span>/g, (m, inner) => {
    const k = inner.indexOf(" =");
    if (k < 0) return inner.includes("=") ? " ! " : unit(inner);
    const rest = inner.slice(k + 2).trim();
    if (!rest) return unit(inner.slice(0, k)) + " =g ";
    /* only a single-letter left side (A, P) rides with the first right-hand term */
    return /^[AP]$/.test(inner.slice(0, k)) && !rest.includes("=") ? `${unit(inner.slice(0, k))} =g ${unit(rest)}` : " ! ";
  });
  if (/[<>]/.test(s)) return null;                                         // a term that is not its own unit
  const toks = s.trim().split(/ +/).filter(Boolean);
  const sides = [[], []];
  let side = 0, want = "operand", sign = 1;
  for (const tk of toks) {
    if (want === "operand") {
      const m = /^#(\d+)$/.exec(tk);
      if (!m) return null;
      const body = f13Joined(units[Number(m[1])]);
      let depth = 0;
      for (const ch of body) { depth += ch === "(" ? 1 : ch === ")" ? -1 : 0; if (depth < 0) return null; }
      if (depth !== 0) return null;
      const tm = F13_TERM.exec(body);
      if (!tm) return null;
      if (tm[1] && (sides[side].length || sign !== 1)) return null;
      const cars = f13CarsOf(tm[3]);
      if (cars.some(c => !(Number.isInteger(c.e) && c.e !== 0))) return null;
      if (iTexts && cars.some(c => !iTexts.includes(c.i))) return null;  // every car at one of the story's rates
      sides[side].push({ s: sign * (tm[1] ? -1 : 1), c: /^\d/.test(tm[2]) ? f13Num(tm[2]) : tm[2], cars });
      sign = 1; want = "op";
    } else if (/^#\d+$/.test(tk) && F13_CUT.test(units[Number(tk.slice(1))]) && F13_CARS_ONLY.test(units[Number(tk.slice(1))].replace(F13_CUT, ""))) {
      /* a cut term's second car, "× (1 + …)^n", rides on the term right before it */
      const cars = f13CarsOf(units[Number(tk.slice(1))]), last = sides[side][sides[side].length - 1];
      if (!last || cars.some(c => !(Number.isInteger(c.e) && c.e !== 0)) || (iTexts && cars.some(c => !iTexts.includes(c.i)))) return null;
      last.cars.push(...cars);
    } else if ((tk === "+" || tk === "−") && want === "op") { sign = tk === "+" ? 1 : -1; want = "operand"; }
    else if (tk === "=g" && side === 0 && want === "op") { side = 1; want = "operand"; sign = 1; }
    else return null;                                                      // a bare "=" never parses
  }
  if (side !== 1 || want === "operand" || sides[0].length !== 1) return null;
  return { L: sides[0], R: sides[1] };
}
/* Fix B (2026-10-11, her ruling 11:47): every car of an f13 equation wears
   the colour of its ROAD, <span class="eq-road-j">(1 + i)<sup>e</sup></span>,
   j the index of the road whose rate the car carries (iTexts, in the story's
   road order: the timeline engine's .tl-road-j, j % 3). The paint holds the
   whole car with its sup and nothing else, sits inside the term's nowrap unit,
   and no car goes unpainted. Returns each car's colour in reading order, or
   null when any of that fails */
const F13_PAINT = /<span class="eq-road-(\d)">([\s\S]*?)<\/span>/g;
const F13_PAINTED_CAR = /^\(1 \+ (0,\d+(?:\/\d+)?)\)<sup>(?:\d+|−\d+)<\/sup>$/;
const F13_NOWRAP_UNIT = /<span class="nowrap">(?:[^<]|<(?!\/?span\b)|<span class="eq-road-\d">(?:[^<]|<(?!\/?span\b))*<\/span>)*<\/span>/g;
export function f13Colours(html, iTexts) {
  const h = String(html == null ? "" : html), js = [];
  for (const m of h.matchAll(F13_PAINT)) {
    const c = F13_PAINTED_CAR.exec(m[2]);
    if (!c || iTexts.indexOf(c[1]) < 0 || iTexts.indexOf(c[1]) % 3 !== Number(m[1])) return null;
    js.push(Number(m[1]));
  }
  if (h.replace(F13_NOWRAP_UNIT, "").includes("eq-road")) return null;   // paint outside a term's unit
  return [...unsup(h).matchAll(F13_CAR)].length === js.length ? js : null;
}
/* the four options of an f13 card with each one's colours, read against the
   story's own roads: [{ correct, cols: [j, …] }], or null if one is not
   painted by the rule (verify-finance's "colour is never a hint" check) */
export function f13OptionColours(q) {
  const s = f13Scene(q);
  if (!s) return null;
  const iTexts = s.roads.map(r => f13Rate(r.r, r.k));
  const out = ((q.steps && q.steps[0] && q.steps[0].options) || []).map(o => ({ correct: !!o.correct, cols: f13Colours(o.label, iTexts) }));
  return out.some(o => !o.cols) ? null : out;
}
const f13CarKey = t => t.cars.map(c => `${c.i}^${c.e}`).join("*");
const f13Key = t => `${t.s}|${t.c}|${f13CarKey(t)}`;
const f13Same = (a, b) => a.L.length === b.L.length && a.L.every((t, j) => f13Key(t) === f13Key(b.L[j]))
  && a.R.length === b.R.length && a.R.map(f13Key).sort().join(";") === b.R.map(f13Key).sort().join(";");

/* the scene, from the word question alone (no meeting day: f13Scene below
   reads that off step 1's prompt). Split out 2026-10-11 so f12 "Build the
   timeline", which deals f13's own paragraphs, is read back by the very
   same reader; f13Scene returns exactly what it always did */
export function f13Words(prompt) {
  /* f12 review 1: "2 years", "8% p.a." are units of their own now; only a money unit stays wrapped here */
  const p = String(prompt || "").replace(/<span class="nowrap">(?!R\d)([^<]*)<\/span>/g, "$1");
  const name = (p.match(/^([A-Z][a-z]+) /) || [])[1];
  if (!F13_NAMES.includes(name)) return null;
  const loan = /\bborrows\b/.test(p), save = /savings account/.test(p);
  if (loan === save) return null;
  const said = [...p.matchAll(/(\d+)% p\.a\. compounded (annually|half‑yearly|quarterly|monthly)/g)].map(m => ({ r: Number(m[1]), k: F9_K[f10Word(m[2])] }));
  if (said.length < 1 || said.length > 2) return null;
  /* "5 years" carries f10's no-break space; \s takes it */
  const n = Math.max(...[...p.matchAll(/after (\d+)\syears?/g)].map(m => Number(m[1])));
  if (!(n >= 2)) return null;
  let roads = [{ from: 0, to: n, ...said[0] }];
  if (said.length === 2) {
    const c = p.match(/ for the first (\d+)\syears?, then /);
    if (!c || !(Number(c[1]) > 0 && Number(c[1]) < n)) return null;
    roads = [{ from: 0, to: Number(c[1]), ...said[0] }, { from: Number(c[1]), to: n, ...said[1] }];
  }
  const pays = [...p.matchAll(new RegExp(`(withdraws )?${F13_MONEY} (now|after (\\d+)\\syears?)`, "g"))]
    .map(m => ({ v: f13Num(m[2]), t: m[3] === "now" ? 0 : Number(m[4]), kind: m[1] ? "wd" : loan ? "repay" : "dep" }));
  const xm = p.match(/an amount x (now|after (\d+)\syears?)/);
  if (xm) pays.push({ v: "x", t: xm[1] === "now" ? 0 : Number(xm[2]), kind: "dep" });
  if (/How much, P, must (?:he|she) deposit now\?/.test(p)) pays.push({ v: "P", t: 0, kind: "dep" });
  pays.sort((a, b) => a.t - b.t);
  const kn = p.match(new RegExp(`wants ${F13_MONEY} in (?:a savings account|the account) after (\\d+)\\syears?`));
  if (kn && (loan || Number(kn[2]) !== n)) return null;
  const dm = p.match(new RegExp(`down payment of ${F13_MONEY} straight to the shop`));
  const im = p.match(/the price of the ([a-zA-Z ]+)\.$/);
  const total = loan ? { t: 0, c: "P", known: false, role: "P" } : kn ? { t: n, c: f13Num(kn[1]), known: true, role: "A" } : { t: n, c: "A", known: false, role: "A" };
  const unknowns = pays.filter(x => typeof x.v !== "number");
  if (total.known ? unknowns.length !== 1 : unknowns.length !== 0) return null;   // exactly one unknown on the card
  return { name, loan, n, roads, pays, total, down: dm ? f13Num(dm[1]) : null, item: im ? im[1] : null, unknown: loan ? "P" : total.known ? unknowns[0].v : "A" };
}
/* the scene, from the word question and step 1's prompt only */
export function f13Scene(q) {
  const w = f13Words(q && q.prompt);
  if (!w) return null;
  const { name, loan, n, roads, pays, total, down, item, unknown } = w;
  const mm = String((q.steps && q.steps[0] && q.steps[0].prompt) || "").match(/^The meeting day is T(\d+), (the day of A|the day of the loan)\./);
  if (!mm) return null;
  const meet = Number(mm[1]);
  if (meet !== (loan ? 0 : n) || mm[2] !== (loan ? "the day of the loan" : "the day of A")) return null;
  return { name, loan, n, meet, roads, pays, total, down, item, unknown };
}
/* one car per road an amount drives over to the meeting day, travel order */
function f13Cars(s, t) {
  const m = s.meet, dir = Math.sign(m - t), lo = Math.min(t, m), hi = Math.max(t, m);
  let legs = s.roads.map(r => ({ r, years: Math.min(hi, r.to) - Math.max(lo, r.from) })).filter(l => l.years > 0);
  if (dir < 0) legs = legs.reverse();
  return legs.map(l => ({ i: f13Rate(l.r.r, l.r.k), e: dir * l.years * l.r.k, r: l.r.r, k: l.r.k }));
}
const f13Expect = s => ({
  L: [{ s: 1, c: s.total.c, cars: [] }],
  R: s.pays.map(x => ({ s: x.kind === "wd" ? -1 : 1, c: x.v, cars: f13Cars(s, x.t) })),
});
const f13Grow = (v, cars) => cars.reduce((a, c) => moveMoney(a, toFrac(c.r) / c.k, c.e), v);
/* the unknown's value, from the story's numbers */
function f13Value(s) {
  const R = f13Expect(s).R;
  const known = R.filter(t => typeof t.c === "number").reduce((a, t) => a + t.s * f13Grow(t.c, t.cars), 0);
  if (!s.total.known) return known;
  const u = R.find(t => typeof t.c !== "number");
  return (s.total.c - known) / f13Grow(1, u.cars);
}
/* which ONE slip turns the right equation into this decoy (null: not one of the plan's) */
function f13Slip(right, d, s) {
  if (d.L.length !== 1 || d.R.length !== right.R.length) return null;
  const pairs = [[right.L[0], d.L[0], "L"], ...right.R.map((t, j) => [t, d.R[j], "R"])];
  const diff = pairs.filter(([a, b]) => f13Key(a) !== f13Key(b));
  if (diff.length !== 1) return null;
  const [a, b, side] = diff[0];
  if (a.c !== b.c) return null;
  const pay = s.pays.find(x => x.v === a.c);
  if (a.s === -b.s && f13CarKey(a) === f13CarKey(b) && side === "R" && pay) {
    const wd = s.pays.some(x => x.kind === "wd");
    if (wd ? pay.kind === "wd" : pay.kind === (s.loan ? "repay" : "dep")) return "sign";
    return null;
  }
  if (a.s === b.s && !a.cars.length && b.cars.length) {
    const onDay = s.pays.some(x => x.t === s.meet);
    if (side === "R" ? (pay && pay.t === s.meet) : !onDay) return "car";
    return null;
  }
  if (a.s === b.s && a.cars.length && a.cars.length === b.cars.length && a.cars.every((c, j) => c.i === b.cars[j].i && c.e === -b.cars[j].e)) return "gear";
  return null;
}
/* the timeline says what the story says */
function f13GraphIssue(g, s) {
  if (g.type !== "timeline" || g.n !== s.n || g.meet !== s.meet) return "timeline: wrong n or meeting day";
  if (!Array.isArray(g.roads) || g.roads.length !== s.roads.length
    || !g.roads.every((r, j) => r.from === s.roads[j].from && r.to === s.roads[j].to && r.rate === `${s.roads[j].r}% p.a.`)) return "timeline: the roads are not the story's";
  const roles = (g.nodes || []).filter(nd => nd.role);
  if (roles.length !== 1) return "timeline: not exactly one total";
  const tot = roles[0];
  if (tot.role !== s.total.role || tot.t !== s.total.t) return "timeline: the total is not where it belongs";
  if (g.nodes.find(nd => nd.t === tot.t) !== tot) return "timeline: the total is not the bottom of its day's stack";
  if (s.total.known ? !(tot.amount === s.total.c && tot.label == null) : !(tot.label === "?" && tot.amount == null)) return "timeline: the total is a bare money label or not \"?\"";
  const pays = g.nodes.filter(nd => nd !== tot);
  if (pays.length !== s.pays.length) return "timeline: wrong number of payments";
  const okPay = s.pays.every(x => pays.some(nd => nd.t === x.t && (typeof x.v === "number"
    ? nd.amount === x.v && nd.label == null && !!nd.out === (x.kind === "wd")
    : nd.label === x.v && nd.amount == null)));
  return okPay ? null : "timeline: a payment is not where the story puts it";
}
// was f12Diagnose until 2026-10-11 (the round is f13 now; f12 = Build the timeline)
export function f13Diagnose(q, fam = null) {
  if (!q || q.type !== "steps" || !Array.isArray(q.steps)) return "not a steps chain";
  const s = f13Scene(q);
  if (!s) return "the story does not read back";
  const iTexts = s.roads.map(r => f13Rate(r.r, r.k));
  const [s1, s2, s3] = q.steps;
  if (q.steps.length !== (s.down != null ? 3 : 2)) return `${q.steps.length} steps`;
  if (!s1 || s1.kind !== "mc" || s1.options.length !== 4) return "step 1 is not a four-option mc";
  if (new Set(s1.options.map(o => o.label)).size !== 4) return "two options coincide";
  const parsed = s1.options.map(o => ({ o, eq: f13ParseEq(o.label, iTexts) }));
  if (parsed.some(x => !x.eq)) return "an option does not parse";
  /* Fix B: every car on the card (the options, every worked line) in its road's colour */
  if (s1.options.some(o => !f13Colours(o.label, iTexts))) return "an option's car not in its road's colour";
  if ((q.solution || []).some(x => !f13Colours(x.s, iTexts) || !f13Colours(x.r, iTexts))) return "a worked line's car not in its road's colour";
  const want = f13Expect(s);
  const allowed = new Set([s.total.c, ...s.pays.map(x => x.v)]);
  if (parsed.some(x => [...x.eq.L, ...x.eq.R].some(t => !allowed.has(t.c)))) return "an option holds a term the story does not";
  const rights = parsed.filter(x => f13Same(x.eq, want));
  if (rights.length !== 1 || !rights[0].o.correct || parsed.filter(x => x.o.correct).length !== 1) return "the right equation is not the one marked correct";
  const slips = parsed.filter(x => x !== rights[0]).map(x => f13Slip(rights[0].eq, x.eq, s)).sort().join(",");
  if (slips !== "car,gear,sign") return `the decoys are not one sign, one car and one gear slip (${slips})`;
  const v = f13Value(s);
  if (!(Number.isFinite(v) && v > 0)) return "the answer is not positive";
  if (s.loan && !(v < s.pays.reduce((a, x) => a + x.v, 0))) return "the loan is not smaller than its repayments";
  const near2 = (a, b) => Number.isFinite(a) && Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));
  if (!s2 || s2.kind !== "calc" || s2.dp !== 2 || !(s2.tol <= 0.001) || !near2(s2.expected, v)) return "step 2 is not the answer to 2 dp";
  const last = s.down != null ? v + s.down : v;
  if (s.down != null && (!s3 || s3.kind !== "calc" || s3.dp !== 2 || !(s3.tol <= 0.001) || !near2(s3.expected, last))) return "step 3 is not loan + down payment";
  if (!near2(q.expected, last) || q.dp !== 2) return "q.expected is not the chain's answer";
  /* the keypad lets in 6 digits unless a step asks for more (js/keypad.js maxDigits) */
  const digits = x => x.toFixed(2).replace(".", "").replace(/^0+(?=\d)/, "").length;
  if (q.steps.slice(1).some(st => digits(st.expected) > (st.maxDigits ?? 6))) return "an answer longer than its keypad lets in";
  if (q.graph && f13GraphIssue(q.graph, s)) return f13GraphIssue(q.graph, s);
  /* the family's bank shape */
  const deps = s.pays.filter(x => x.kind === "dep"), wds = s.pays.filter(x => x.kind === "wd"), reps = s.pays.filter(x => x.kind === "repay");
  const two = s.roads.length === 2;
  const SHAPE = {
    twoDeposits: () => !s.loan && !s.total.known && two && !wds.length && (deps.length === 2 || (deps.length === 3 && deps[2].t === s.n)) && deps[0].t === 0,
    withdrawal: () => !s.loan && !s.total.known && !two && deps.length === 1 && deps[0].t === 0 && wds.length === 1 && wds[0].t > 0 && wds[0].t < s.n,
    mixed: () => !s.loan && !s.total.known && two && deps.length === 2 && deps[0].t === 0 && wds.length === 1 && wds[0].t > deps[1].t && wds[0].t < s.n,
    loanTwoRepayments: () => s.loan && s.down == null && two && reps.length === 2 && reps[1].t === s.n && reps[0].t > 0,
    targetAmount: () => !s.loan && s.total.known && two && s.pays.length === 1 && s.pays[0].v === "P" && s.pays[0].t === 0,
    hirePurchase: () => s.loan && s.down > 0 && !!s.item && two && reps.length === 2 && reps[1].t === s.n && reps[0].t > 0,
    unknownPayment: () => !s.loan && s.total.known && two && deps.length === 3 && typeof deps[0].v === "number" && deps[0].t === 0
      && deps[1].v === "x" && deps[1].t > 0 && deps[1].t < s.n && typeof deps[2].v === "number" && deps[2].t === s.n,
  };
  if (fam && !(SHAPE[fam] && SHAPE[fam]())) return `not the ${fam} shape`;
  return null;
}
/* every equation a learner reads on an f13 card (the four options, the
   worked "The one equation:" line), parsed: [{ where, ok }] */
export function f13EquationsOf(q) {
  const out = [];
  ((q.steps && q.steps[0] && q.steps[0].options) || []).forEach((o, j) => out.push({ where: `option ${j + 1}`, ok: !!f13ParseEq(o.label) }));
  (q.solution || []).forEach((st, j) => {
    const t = String(st.s);
    if (t.startsWith("The one equation: ")) out.push({ where: `worked line ${j + 1}`, ok: !!f13ParseEq(t.slice("The one equation: ".length)) });
  });
  return out;
}

/* the skills with no rolled numbers — nothing to recompute (they are
   the same 26 listed as PURE_RECALL in js/quests/dice-finance.js) */
export const RECOMPUTE_IDS = Object.keys(RECOMPUTE);
