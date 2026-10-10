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

   Coverage: all 25 f1–f7 skills that roll a number, plus f8's five
   tap-the-total skills and all eight f9 car skills (2026-10-10, each
   re-derived from the drawn meeting day, roads and amounts and the rates
   in the prompt), and all eight f10 sign skills (2026-10-10: every
   equation parsed term by term and compared with the one the picture and
   the story give; the interest recomputed from the displayed numbers;
   the recall card against a table written out here). The rest are pure fixed-fact recall
   (no numbers to recompute) and are covered by the generic shape /
   self-consistency / decoy checks in the harnesses.
   ============================================================ */
import {
  toFrac, COMPOUNDING, ratePerPeriod, periodCount, compoundAmount, moveMoney,
  simpleAmount, depositAmount, balanceAfterDeposit, effFromNom,
} from "../finlib.js";
import { fmtComma } from "../check.js";
import { computeTimeline, renderTimeline, verifyTimeline, PHONE_360, TAP_MIN } from "../engine/timeline-graph.js";

const C = v => fmtComma(v);
export const near = (a, b, tol = 1e-6) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;

/* ---------- tiny parsers over a question's own text ---------- */

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
export function freqIn(prompt) { return BY_LEN.find(o => String(prompt).includes(o.label)) || null; }
export function freqByLabel(label) { return COMPOUNDING.find(o => o.label === label) || null; }
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
  if (spec.meet != null || roadSpec) {
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
    sleads.forEach(pl => {
      const pts = String(pl.getAttribute("points")).trim().split(/\s+/).map(p => p.split(",").map(Number));
      const end = pts[pts.length - 1];
      if (pts.length < 2 || Math.abs(end[0] - g.xAt(Math.round((end[0] - g.xAt(0)) / gap))) > 0.5 || !(end[1] < g.cy - 6)) out.push("a stacked amount's leader does not end on a tick");
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
    return correctLabel(q) === `${P}(1 + ${C(toFrac(annual))}/${o.k})^(${years}×${o.k})`;
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
    // 2026-08-23) — the thousands space is dropped before parsing
    const m = String(q.prompt).match(/value at <b>T(\d+)<\/b> of <b>R([\d ]+)<\/b> invested at T0 \(i = ([\d,]+)\)/);
    if (!m) return false;
    const k = Number(m[1]), P = Number(m[2].replace(/ /g, "")), i = m[3];
    return correctLabel(q) === `${P}(1 + ${i})^${k}` && q.graph.n === k;
  },
  /* the only CARE skill: both routes are re-derived from the question's
     OWN two amounts (the rate is recovered from P, A and T), and the
     yes/no is re-decided from that arithmetic — never from the wording. */
  "f5.anyPoint": q => {
    const [P, A] = rands(q.prompt);
    if (!Number.isFinite(P) || !Number.isFinite(A) || P <= 0) return false;
    const mSame = String(q.prompt).match(/Moving <b>forward (\d+)<\/b> from T0 and moving <b>back (\d+)<\/b> from T(\d+) give (the <b>same<\/b> value|<b>different<\/b> values) at T(\d+)\./);
    const mPlus = String(q.prompt).match(/at T(\d+)\. To move the T(\d+) amount <b>back<\/b> to T(\d+), you multiply by \(1 \+ i\)\^<b>\+(\d+)<\/b>\./);
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
    const m = String(q.prompt).match(/<b>R([\d\s  ]+)<\/b> grows at ([\d,]+)% p\.a\. compounded <b>([^<]+)<\/b> for (\d+) years, then at ([\d,]+)% p\.a\. compounded <b>([^<]+)<\/b> for (\d+) years/);
    if (!m) return false;
    const P = Number(m[1].replace(/[\s  ]/g, ""));
    const r1 = Number(m[2].replace(",", ".")), o1 = freqByLabel(m[3]), y1 = Number(m[4]);
    const r2 = Number(m[5].replace(",", ".")), o2 = freqByLabel(m[6]), y2 = Number(m[7]);
    if (!o1 || !o2) return false;
    if (!String(q.prompt).includes(`end of the ${y1 + y2} years`)) return false;
    const want = `${P}(1 + ${C(toFrac(r1))}/${o1.k})^(${y1}×${o1.k})(1 + ${C(toFrac(r2))}/${o2.k})^(${y2}×${o2.k})`;
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

  /* ---- f8 (2026-10-10): tap the total ---- */
  "f8.tapSavings": q => f8TapCheck(q, "savings"),
  "f8.tapLoan": q => f8TapCheck(q, "loan"),
  "f8.tapSameDay": q => f8TapCheck(q, "sameDay"),
  "f8.tapLoanBigRepay": q => f8TapCheck(q, "bigRepay"),
  "f8.tapUnknownX": q => f8TapCheck(q, "x"),

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
      return L.k === 1 ? `(1 + ${i})^${m ? `(−${L.years})` : L.years}` : `(1 + ${i}/${L.k})^(${m}${L.years}×${L.k})`;
    };
    const flat = x => String(x).replace(/<[^>]+>/g, "").replace(/\s+/g, "");   // f9 review 1: terms are <span class="nowrap"> units now
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

  /* ---- f10 (2026-10-10): in or out? (the one equation's signs) ---- */
  "f10.jugCorrect": q => f10JugCheck(q, false),
  "f10.jugWrong": q => f10JugCheck(q, true),
  "f10.tidy": q => {
    const s = f10Scene(q);
    if (!s || s.saving || s.known) return false;
    const jug = f10ParseEq(f10PromptEq(q), f10Rate(s));
    if (!jug || !f10JugShape(jug, s) || !f10Equiv(jug, f10Expect(s))) return false;   // the jug form shown is right…
    return f10McCheck(q, s, f10Expect(s), { c: "P", e: s.n * s.k }, f10Allowed(s));  // …and the tidy option is the same equation
  },
  "f10.withdrawal": q => {
    const s = f10Scene(q);
    return !!s && s.saving && !s.known && f10McCheck(q, s, f10Expect(s), { c: "A", e: 0 }, f10Allowed(s));
  },
  "f10.signOnTimeline": q => {
    const s = f10Scene(q);
    return !!s && s.saving && !s.known && !/R\d/.test(String(q.prompt).replace(/<[^>]+>/g, ""))   // the picture alone carries the amounts
      && f10McCheck(q, s, f10Expect(s), { c: "A", e: 0 }, f10Allowed(s));
  },
  "f10.inOrOutWord": q => {
    /* written out here on purpose, not imported from the module */
    const m = String(q.prompt).match(/<b>([^<]+)<\/b>/);
    if (!m || q.type !== "mc" || q.options.length !== 3) return false;
    const item = m[1];
    const want = /down payment/i.test(item) ? "Neither: it never enters the account"
      : /repayment|withdrawal/i.test(item) ? "Out: minus"
      : /deposit|loan itself/i.test(item) ? "In: plus" : null;
    return !!want && correctLabel(q) === want;
  },
  "f10.interestPaid": q => {
    const p = String(q.prompt);
    const m = p.match(/borrowed <span class="nowrap">R([\d ]+,\d\d)<\/span> at (\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)\./);
    const pays = [...p.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
    if (!m || pays.length !== 2 || q.type !== "mc") return false;
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
  "f10.tidyLoan": q => {
    const p = String(q.prompt);
    const price = p.match(/ for <span class="nowrap">R([\d ]+)<\/span>/), down = p.match(/down payment of <span class="nowrap">R([\d ]+)<\/span>/);
    const said = [...p.matchAll(/(\d+)%\s?p\.a\. compounded (annually|half[-‑]yearly|quarterly|monthly)/g)];
    const xm = p.match(/a last repayment, x, at T(\d+)/), mm = p.match(/The meeting day is T(\d+)\./);
    const pays = [...p.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
    if (!price || !down || said.length !== 1 || !xm || !mm || !pays.length || q.graph) return false;
    const n = Number(mm[1]), r = Number(said[0][1]), k = F9_K[f10Word(said[0][2])];
    const P = f10Num(price[1]), D = f10Num(down[1]), loan = P - D;               // price = loan + down payment
    if (Number(xm[1]) !== n || !(D > 0 && loan > 0) || pays.some(x => !(x.t > 0 && x.t < n))) return false;
    const s = { saving: false, n, r, k, pays: pays.map(x => ({ ...x, out: false })) };
    const expect = [{ s: 1, c: loan, e: n * k }, ...pays.map(x => ({ s: -1, c: x.v, e: (n - x.t) * k })), { s: -1, c: "x", e: 0 }];
    return f10McCheck(q, s, expect, { c: loan, e: n * k }, new Set([P, D, loan, "x", ...pays.map(x => x.v)]));
  },
};

/* ============================================================
   f10 · "In or out?" — the one equation, read back from what is shown.
     · EVERY equation (the prompt's jug form, each option, the worked
       tidy line) must PARSE: each term one <span class="nowrap"> unit
       (amount with no-break thousands, or P / A / x, then at most one
       car "(1 + 0,12/12)^36" or "^(−36)" at the story's own rate),
       terms joined only by " + " / " − ", exactly one "=", a right side
       may be a lone 0, a leading minus only on a side's first term, and
       the brackets balance. A slip here returns null and the check fails.
     · f10 review 1: the "=" glues to the term BEFORE it, inside that
       term's unit ("P(…)^36 =", and a lone 0 or A rides along too:
       "9 000 = 0", "…^8 = A"), so a broken line never starts with "=".
       An "=" standing on its own between units does not parse.
     · the scene comes from the picture: the total ("?" with its letter,
       A at the end for saving, P at T0 for a loan; or the known loan with
       its P), the payments, the ONE withdrawal drawn out (saving only,
       after a deposit, before the meeting day), one road whose rate is the
       prompt's, and the story's "R… at T…" mentions match the nodes.
     · the expected equation: the loan and every deposit IN (+), every
       repayment and withdrawal OUT (−), each with its car to the meeting
       day (the last T): exponent (n − t) × k; the total A on the other side.
     · two equations are the same when left − right holds the same signed
       terms, or all of them negated (the jug form and its tidy form are
       the same terms with the moved signs flipped).
   ============================================================ */
const f10Num = s => Number(String(s).replace(/[\s  ]/g, "").replace(",", "."));
/* "R2 912,58" / "−R2 912,58" (tags stripped) → cents; NaN if not money */
function f10Cents(label) {
  const t = String(label).replace(/<[^>]+>/g, "");
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
  const s = String(html).replace(/<span class="nowrap">([^<]*)<\/span>/g, (m, inner) => {
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
export function f10Equiv(eq, zero) {
  const a = f10Key(f10Zero(eq));
  return a === f10Key(zero) || a === f10Key(zero.map(t => ({ ...t, s: -t.s })));
}
/* the equation shown in a jug-card prompt: the line between the two <br>s */
function f10PromptEq(q) { const parts = String(q.prompt).split("<br>"); return parts.length === 3 ? parts[1] : null; }
/* the equation at the end of a worked line ("Tidy: …: EQ") */
function f10SolEq(q, start) {
  const st = (q.solution || []).find(x => String(x.s).startsWith(start));
  return st ? String(st.s).slice(String(st.s).lastIndexOf(": ") + 2) : null;
}
export function f10Scene(q) {
  const g = q && q.graph;
  if (!g || g.type !== "timeline" || !Array.isArray(g.nodes) || !Array.isArray(g.roads) || g.roads.length !== 1) return null;
  if (g.meet !== g.n) return null;                                          // the meeting day is the last T
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
    if (outs.length !== 1) return null;
    const w = outs[0];
    if (!(w.t > 0 && w.t < g.n && pays.some(x => !x.out && x.t < w.t))) return null;   // after a deposit, before the meeting day
  } else if (outs.length || pays.some(x => x.t === 0)) return null;
  /* the story, where it names amounts, names exactly the drawn ones */
  const said2 = [...prompt.matchAll(/<span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)].map(x => ({ v: f10Num(x[1]), t: Number(x[2]) }));
  if (said2.length && (said2.length !== pays.length || !said2.every(x => pays.some(nd => nd.amount === x.v && nd.t === x.t)))) return null;
  const wd = [...prompt.matchAll(/withdraws <span class="nowrap">R([\d ]+)<\/span> at T(\d+)/g)];
  if (wd.length && (wd.length !== 1 || f10Num(wd[0][1]) !== outs[0].amount || Number(wd[0][2]) !== outs[0].t)) return null;
  return { saving, known, n: g.n, meet: g.meet, r, k, pays: pays.map(x => ({ t: x.t, v: x.amount, out: !!x.out })) };
}
/* left − right of the right equation, with the meeting day on the last T */
function f10Expect(s) {
  const e = t => (s.n - t) * s.k;
  return s.saving
    ? [...s.pays.map(x => ({ s: x.out ? -1 : 1, c: x.v, e: e(x.t) })), { s: -1, c: "A", e: 0 }]
    : [{ s: 1, c: "P", e: e(0) }, ...s.pays.map(x => ({ s: -1, c: x.v, e: e(x.t) }))];
}
const f10Allowed = s => new Set([s.saving ? "A" : "P", ...s.pays.map(x => x.v)]);
/* the jug form's shape: a loan's side starts with +P and equals 0; saving equals A alone */
function f10JugShape(eq, s) {
  return s.saving
    ? eq.R.length === 1 && eq.R[0].c === "A" && eq.R[0].s === 1 && eq.R[0].e === 0 && eq.L.length === s.pays.length
    : eq.R.length === 0 && eq.L.length === s.pays.length + 1;
}
/* the tidy form's shape: the total's term alone on the left, every payment
   positive on the right except a withdrawal, which keeps its minus */
function f10TidyShape(eq, lead, outs) {
  return eq.L.length === 1 && eq.L[0].s === 1 && eq.L[0].c === lead.c && eq.L[0].e === lead.e
    && eq.R.every(t => t.s === (outs.has(t.c) ? -1 : 1));
}
/* an mc of equations: every option parses (at the story's rate, with only
   the story's terms), exactly one option is the right equation, it is
   marked correct and is in the tidy form, and no two options are the same
   equation */
function f10McCheck(q, s, expect, lead, allowed) {
  if (q.type !== "mc" || !Array.isArray(q.options) || q.options.length !== 4) return false;
  const parsed = q.options.map(o => ({ o, eq: f10ParseEq(o.label, f10Rate(s)) }));
  if (parsed.some(p => !p.eq || [...p.eq.L, ...p.eq.R].some(t => !allowed.has(t.c)))) return false;
  const right = parsed.filter(p => f10Equiv(p.eq, expect));
  if (right.length !== 1 || !right[0].o.correct) return false;
  if (!f10TidyShape(right[0].eq, lead, new Set(s.pays.filter(x => x.out).map(x => x.v)))) return false;
  for (let i = 0; i < parsed.length; i++)
    for (let j = i + 1; j < parsed.length; j++) if (f10Equiv(parsed[i].eq, f10Zero(parsed[j].eq))) return false;
  return true;
}
/* the yes/no jug cards: the shown jug form is right (jugCorrect) or has
   EXACTLY ONE sign slipped (jugWrong); q.yes must say which; the worked
   right jug form and tidy line are the right equation, in shape */
function f10JugCheck(q, wrong) {
  const s = f10Scene(q);
  if (!s || s.known || q.type !== "yesno" || s.meet !== s.n) return false;
  const iT = f10Rate(s), expect = f10Expect(s);
  const shown = f10ParseEq(f10PromptEq(q), iT);
  if (!shown || !f10JugShape(shown, s)) return false;
  const ok = f10Equiv(shown, expect);
  if (q.yes !== ok) return false;
  if (wrong) {
    /* same terms, exactly one sign different (orientation: the side with the payments, minus the other) */
    const z = f10Zero(shown), want = expect;
    const strip = ts => ts.map(t => `${t.c}|${t.e}`).sort().join(";");
    if (strip(z) !== strip(want)) return false;
    const diff = z.filter(t => !want.some(w => w.c === t.c && w.e === t.e && w.s === t.s)).length;
    if (diff !== 1) return false;
    const fixed = f10ParseEq(f10SolEq(q, "The right jug form"), iT);
    if (!fixed || !f10JugShape(fixed, s) || !f10Equiv(fixed, expect)) return false;
  }
  const tidy = f10ParseEq(f10SolEq(q, "Tidy"), iT);
  const lead = s.saving ? { c: "A", e: 0 } : { c: "P", e: s.n * s.k };
  return !!tidy && f10Equiv(tidy, expect) && f10TidyShape(tidy, lead, new Set(s.pays.filter(x => x.out).map(x => x.v)));
}
/* every equation a learner reads on an f10 card (prompt, options, worked
   lines) parsed, for the harness's f10 block: [{ where, ok }] */
export function f10EquationsOf(q) {
  const out = [];
  /* f10 review 1: the "=" now sits INSIDE a unit, so an equation is any
     line that holds a nowrap unit and an "=" (a bare one fails the parse) */
  const looks = h => /<span class="nowrap">[^<]*<\/span>/.test(String(h)) && /=/.test(String(h).replace(/<[^>]+>/g, ""));
  const pe = f10PromptEq(q);
  if (pe != null && looks(pe)) out.push({ where: "prompt", ok: !!f10ParseEq(pe) });
  (q.options || []).forEach((o, j) => { if (looks(o.label)) out.push({ where: `option ${j + 1}`, ok: !!f10ParseEq(o.label) }); });
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
  const said = [...prompt.matchAll(/(\d+)%\s?p\.a\. compounded (annually|half-yearly|quarterly|monthly)/g)];
  let ratesShown = false;
  if (said.length) {
    if (said.length !== roads.length || said.some((m, j) => Number(m[1]) !== roads[j].rate)) return null;
    said.forEach((m, j) => { roads[j].k = F9_K[m[2]]; });
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
   f8 · "Which one is the total?" — the tap target, re-derived.
   Reads ONLY what the learner sees: the story in the prompt (saving or a
   loan), the rate in the prompt, and the amount labels the engine draws.
     · the marked target is a real amount (never x), and it sits where the
       total belongs: at the END for saving, at T0 for a loan;
     · no two amounts on the line are equal;
     · with no x on the line, the marked amount is the ONLY amount that
       equals every other amount moved to its date at the stated rate
       (rounded to the rand), so it is the one they all add up to and
       every payment node is ruled out by arithmetic, not by position;
     · with x on the line, the x that the total implies is a positive
       whole number of hundreds (to within the total's rounding), so the
       total was built from real payments;
     · the per-skill shape: one amount at the end (savings), two at the
       end (same day), the loan bigger than every repayment (loan), some
       repayment bigger than the loan (bigRepay), x strictly in the middle.
   ============================================================ */
function f8TapCheck(q, kind) {
  if (q.type !== "tap" || !q.graph || !q.graph.tapLabels || !q.tap) return false;
  const g = computeTimeline(q.graph);
  const [r] = pcts(q.prompt);
  const saving = /\bsaves?\b|savings/.test(q.prompt), loan = /borrows|\bloan\b|pays off/.test(q.prompt);
  if (!Number.isFinite(r) || saving === loan) return false;                 // exactly one story
  const i = toFrac(r);
  const items = g.labels.map(lb => ({ id: lb.id, t: lb.t, text: lb.text, v: lb.text === "x" ? NaN : numOf(lb.text.replace(/^R/, "")) }));
  const ids = items.map(it => it.id);
  const targets = q.tap.targets || [];
  if (targets.length !== ids.length || !ids.every(id => targets.includes(id))) return false;   // every amount is tappable
  const pick = items.find(it => it.id === q.tap.correctId);
  if (!pick || !Number.isFinite(pick.v)) return false;                      // the total is a known amount, never x
  const home = saving ? g.n : 0;
  if (pick.t !== home) return false;                                        // saving: the end; a loan: the start
  const xs = items.filter(it => it.text === "x");
  const known = items.filter(it => Number.isFinite(it.v));
  if (known.length + xs.length !== items.length || xs.length > 1) return false;
  if (new Set(known.map(it => it.v)).size !== known.length) return false;   // no two amounts equal
  const movedTo = (it, o) => o.v * Math.pow(1 + i, it.t - o.t);
  if (!xs.length) {
    const sumOthers = it => items.filter(o => o !== it).reduce((s, o) => s + movedTo(it, o), 0);
    const fits = known.filter(it => Math.abs(sumOthers(it) - it.v) <= 0.5 + 1e-6);
    if (fits.length !== 1 || fits[0] !== pick) return false;
  } else {
    const x = xs[0];
    const rest = known.filter(o => o !== pick).reduce((s, o) => s + movedTo(pick, o), 0);
    const xAtTotal = pick.v - rest;                                          // x moved to the total's date
    const xVal = xAtTotal * Math.pow(1 + i, x.t - pick.t);                   // …and back to x's own date
    const slack = 0.5 * Math.pow(1 + i, Math.abs(x.t - pick.t)) + 1e-6;     // the total's rounding, carried over
    if (!(xVal > 0) || Math.abs(xVal - Math.round(xVal / 100) * 100) > slack) return false;
  }
  const atHome = items.filter(it => it.t === home).length;
  if (kind === "savings") return saving && !xs.length && atHome === 1;
  if (kind === "sameDay") return saving && !xs.length && atHome === 2;
  if (kind === "loan") return loan && !xs.length && known.every(it => it === pick || it.v < pick.v);
  if (kind === "bigRepay") return loan && !xs.length && known.some(it => it !== pick && it.v > pick.v);
  if (kind === "x") return xs.length === 1 && xs[0].t > 0 && xs[0].t < g.n && atHome === 1;
  return false;
}

/* the skills with no rolled numbers — nothing to recompute (they are
   the same 26 listed as PURE_RECALL in js/quests/dice-finance.js) */
export const RECOMPUTE_IDS = Object.keys(RECOMPUTE);
