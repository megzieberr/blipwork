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
   tap-the-total skills (2026-10-10). The rest are pure fixed-fact recall
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
  texts.forEach((el, i) => {
    let bb;
    try { bb = el.getBBox(); } catch { return; }
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
};

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
