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

   Coverage: all 25 Finance skills that roll a number. The other 26 are
   pure fixed-fact recall (no numbers to recompute) and are covered by
   the generic shape / self-consistency / decoy checks in the harnesses.
   ============================================================ */
import {
  toFrac, COMPOUNDING, ratePerPeriod, periodCount, compoundAmount, moveMoney,
  simpleAmount, depositAmount, balanceAfterDeposit, effFromNom,
} from "../finlib.js";
import { fmtComma } from "../check.js";
import { computeTimeline, renderTimeline, verifyTimeline } from "../engine/timeline-graph.js";

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
  const labelled = g.nodes.filter(n => n.amountLabel != null);
  const texts = [...svg.querySelectorAll("text.tl-amt")];
  if (texts.length !== labelled.length) return [`${texts.length} amount labels drawn for ${labelled.length} labelled nodes`];
  texts.forEach((el, i) => {
    let bb;
    try { bb = el.getBBox(); } catch { return; }
    const node = labelled[i];
    if (bb.x < -0.5 || bb.x + bb.width > g.W + 0.5) out.push(`amount "${el.textContent}" runs outside the ${g.W}-wide viewBox`);
    const centre = bb.x + bb.width / 2;
    if (Math.abs(centre - node.x) > gap * 0.6) out.push(`amount "${el.textContent}" sits ${Math.round(Math.abs(centre - node.x))}px off its own node (T${node.t})`);
  });
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
};

/* the skills with no rolled numbers — nothing to recompute (they are
   the same 26 listed as PURE_RECALL in js/quests/dice-finance.js) */
export const RECOMPUTE_IDS = Object.keys(RECOMPUTE);
