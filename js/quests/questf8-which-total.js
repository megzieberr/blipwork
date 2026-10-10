/* ============================================================
   FINANCE QUEST 8 · Which one is the total?   ★
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f8 (built 2026-10-10). The class
   fell over at "which amount is the total?" as soon as a timeline
   carried more than one amount. Each tap card shows a timeline with
   3 or 4 amounts and the learner taps the one all the others add up
   to: A at the END for saving, the loan at T0 for a loan (a loan
   starts big and gets paid down). The traps are the real confusions:
   a deposit on the SAME day as the total, a repayment BIGGER than the
   loan, and an unknown payment x in the middle. Recall cards (yes/no,
   mc) sit between the taps.

   THE TAP TARGET IS THE MONEY LABEL, not the tick, because two amounts
   can share one T. The spec sets `tapLabels`, every amount carries an
   id, and q.tap = { targets: [ids], correctId } (engine:
   js/engine/timeline-graph.js; hit code: addTimelineLabelHits in
   js/questions.js). The nodes carry NO role letters: an "A" or a "P"
   above the total would hand the answer over.

   HONEST NUMBERS. Payments are whole rand from a bank; the total is
   computed from them at the stated rate (finlib moveMoney) and rounded
   to the rand, so it really is what they add up to. No two amounts on a
   line are equal. verify-finance.html re-derives the target from the
   drawn labels alone (js/quests/_finance-check.js, f8TapCheck).

   VOCABULARY PHASING (her ruling, the plan's vocabulary table): the
   first 3 cards of a round say "lumpsum (the total)", cards 4 to 6 say
   "the total (lumpsum)", and from card 7 on only "the total". A static
   round deals def.skills IN ORDER, one card per skill (js/play.js
   renderPlay: skills[st.i]), and "Try a similar one" re-rolls the SAME
   skill, so a card's position in the round IS its skill's index in the
   list below. The phrase is bound to that index when the skill list is
   built: gen() stays pure (the harness's 200 calls in a row cannot
   drift it) and js/play.js needed no change. Never "lump sum" as two
   words, never "accumulated amount".
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac, moveMoney } from "../finlib.js";

const TOTAL = "theTotal";

/* the three phases of the word, in round order */
export const TOTAL_WORDS = ["the lumpsum (the total)", "the total (lumpsum)", "the total"];
/* the phrase a card at 0-based position `pos` in the round uses */
export const totalWordAt = pos => TOTAL_WORDS[pos < 3 ? 0 : pos < 6 ? 1 : 2];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const RATES = [6, 7, 8, 9, 10, 11, 12, 14, 15];
const SAVE_AMTS = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000];
const REPAY_AMTS = [1500, 2000, 2300, 2500, 3000, 3500, 4000, 4200, 5000, 6000];
const SMALL_REPAY = [800, 1000, 1200, 1500, 1800, 2000];
const BIG_REPAY = [3500, 4000, 4200, 4500, 5000, 6000, 7500];
const MAX_LABEL = 100000;              // every amount stays under R100 000: 7 glyphs, fits beside a neighbour at n = 6

const R0 = v => rand(v, 0);            // "R6 292": whole rand, the way f5 prints an amount
const andList = a => a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
const distinct = vals => new Set(vals).size === vals.length;
/* k distinct whole T values from lo..hi, in time order */
const timesIn = (lo, hi, k) => shuffled(Array.from({ length: hi - lo + 1 }, (_, j) => lo + j)).slice(0, k).sort((a, b) => a - b);
const person = () => pick([{ he: "she", his: "her" }, { he: "he", his: "his" }]);
/* the value of the payments at date `at`: each one moved (1 + i)^(at − t) */
const valueAt = (pays, i, at) => pays.reduce((s, p) => s + moveMoney(p.v, i, at - p.t), 0);

const saveStory = (p, r) => pick([
  `${cap(p.he)} saves in an account that pays ${r}% p.a., compounded annually.`,
  `${cap(p.he)} saves money at ${r}% p.a., compounded annually.`,
  `${cap(p.he)} puts money into a savings account at ${r}% p.a., compounded annually.`,
]);
const loanStory = (p, r) => pick([
  `${cap(p.he)} borrows money at ${r}% p.a., compounded annually, and pays it back.`,
  `${cap(p.he)} pays off a car: the loan is at ${r}% p.a., compounded annually.`,
  `${cap(p.he)} takes out a loan at ${r}% p.a., compounded annually, and pays it back in parts.`,
]);

/* ---------- the tap card ---------- */

const IDS = ["a", "b", "c", "d", "e", "f"];
/* amounts: [{ t, v } | { t, x: true }] in time order; two on one t stack,
   the first one lowest. Ids are handed out in a shuffled order so the
   total's id says nothing. */
function timeline(n, amounts) {
  const ids = shuffled(IDS).slice(0, amounts.length);
  const nodes = amounts.map((a, k) => a.x
    ? { t: a.t, label: "x", id: ids[k] }
    : { t: a.t, amount: a.v, dp: 0, id: ids[k] });
  return { graph: { type: "timeline", n, nodes, tapLabels: true }, ids };
}

function tapCard(w, { story, n, amounts, total, hint, here }) {
  const { graph, ids } = timeline(n, amounts);
  return {
    type: "tap", concept: TOTAL,
    prompt: `${story} Tap <b>${w}</b>: the amount all the other amounts add up to.`,
    graph, graphCap: "T in years",
    tap: { targets: ids.slice(), correctId: ids[amounts.indexOf(total)] },
    tapHint: "Tap one of the amounts above the line.",
    hint,
    answerLabel: `${R0(total.v)} at T${total.t} is ${w}`,
    solution: [
      { s: `${cap(w)} is the one that is not a payment.` },
      { s: "For saving it sits at the end; for a loan it sits at the start.", r: "a loan starts big and gets paid down" },
      ...here,
    ],
  };
}

/* roll(), make(w, pars) → card | null, FIX: a hand-checked set of pars that
   make() always accepts. The loop almost always lands on its first or
   second roll; the FIX is only a guarantee that gen() can never hang. */
const rolled = (w, roll, make, FIX) => {
  for (let tries = 0; tries < 400; tries++) { const c = make(w, roll()); if (c) return c; }
  return make(w, FIX);
};

/* ① savings: 2 or 3 deposits before the end, the total at the end */
function tapSavings(w) {
  const roll = () => {
    const n = randInt(3, 6), k = randInt(2, 3);
    return { p: person(), r: pick(RATES), n, times: timesIn(0, n - 1, k), vals: shuffled(SAVE_AMTS).slice(0, k), story: pick([0, 1, 2]) };
  };
  const make = (w, { p, r, n, times, vals }) => {
    const i = toFrac(r);
    const deps = times.map((t, j) => ({ t, v: vals[j] }));
    const A = { t: n, v: Math.round(valueAt(deps, i, n)) };
    if (A.v >= MAX_LABEL || !distinct([...vals, A.v])) return null;
    return tapCard(w, {
      story: saveStory(p, r), n, amounts: [...deps, A], total: A,
      hint: `Saving: the deposits grow into ${w}. Where on the line does that leave it?`,
      here: [{ s: `${cap(p.he)} saves, so it is ${R0(A.v)} at T${n}, the end.`, r: `the deposits ${andList(deps.map(d => R0(d.v)))} grow into it` }],
    });
  };
  return rolled(w, roll, make, { p: { he: "she", his: "her" }, r: 10, n: 3, times: [0, 1], vals: [2000, 3000] });
}

/* ② a loan at T0, 2 or 3 repayments later, the loan bigger than each one */
function tapLoan(w) {
  const roll = () => {
    const n = randInt(3, 6), k = randInt(2, 3);
    return { p: person(), r: pick(RATES), n, times: timesIn(1, n, k), vals: shuffled(REPAY_AMTS).slice(0, k) };
  };
  const make = (w, { p, r, n, times, vals }) => {
    const i = toFrac(r);
    const pays = times.map((t, j) => ({ t, v: vals[j] }));
    const P = { t: 0, v: Math.round(valueAt(pays, i, 0)) };
    if (P.v >= MAX_LABEL || !(P.v > Math.max(...vals)) || !distinct([...vals, P.v])) return null;
    return tapCard(w, {
      story: loanStory(p, r), n, amounts: [P, ...pays], total: P,
      hint: `A loan: ${w} is the amount borrowed. When was the money borrowed?`,
      here: [{ s: `${cap(p.he)} borrows, so it is ${R0(P.v)} at T0, the start.`, r: `the repayments ${andList(pays.map(d => R0(d.v)))} pay it down` }],
    });
  };
  return rolled(w, roll, make, { p: { he: "he", his: "his" }, r: 10, n: 3, times: [1, 3], vals: [2200, 3993] });
}

/* ③ savings with a deposit on the SAME day as the total: two labels
   stacked on the last node, in a random order */
function tapSameDay(w) {
  const roll = () => {
    const n = randInt(3, 6), k = randInt(1, 2);
    return { p: person(), r: pick(RATES), n, times: timesIn(0, n - 1, k), vals: shuffled(SAVE_AMTS).slice(0, k + 1), totalOnTop: pick([true, false]) };
  };
  const make = (w, { p, r, n, times, vals, totalOnTop }) => {
    const i = toFrac(r);
    const early = times.map((t, j) => ({ t, v: vals[j] }));
    const same = { t: n, v: vals[times.length] };
    const A = { t: n, v: Math.round(valueAt([...early, same], i, n)) };
    if (A.v >= MAX_LABEL || !distinct([...vals, A.v])) return null;
    return tapCard(w, {
      story: `${saveStory(p, r)} ${cap(p.his)} last deposit is on the day ${p.he} checks the account.`,
      n, amounts: [...early, ...(totalOnTop ? [same, A] : [A, same])], total: A,
      hint: "Two amounts sit on the last day. One of them is a deposit, and a deposit is a payment.",
      here: [
        { s: `T${n} holds two amounts: ${R0(same.v)} is ${p.his} last deposit, a payment.` },
        { s: `${R0(A.v)} is ${w}.`, r: `${andList([...early, same].map(d => R0(d.v)))} all add up to it` },
      ],
    });
  };
  return rolled(w, roll, make, { p: { he: "she", his: "her" }, r: 10, n: 3, times: [0], vals: [2000, 5000], totalOnTop: true });
}

/* ④ a loan where one repayment is BIGGER than the loan itself (the
   repayments carry the interest): the biggest number is not the total */
function tapLoanBigRepay(w) {
  const roll = () => {
    const n = randInt(4, 6), k = randInt(1, 2);
    return { p: person(), r: pick([10, 11, 12, 14, 15]), n, times: timesIn(1, n - 1, k), vals: shuffled(SMALL_REPAY).slice(0, k), big: pick(BIG_REPAY) };
  };
  const make = (w, { p, r, n, times, vals, big }) => {
    const i = toFrac(r);
    const pays = [...times.map((t, j) => ({ t, v: vals[j] })), { t: n, v: big }];
    const P = { t: 0, v: Math.round(valueAt(pays, i, 0)) };
    if (P.v >= MAX_LABEL || !(big > P.v) || !distinct([...vals, big, P.v])) return null;
    return tapCard(w, {
      story: loanStory(p, r), n, amounts: [P, ...pays], total: P,
      hint: `The biggest number is not always ${w}. Where does it sit for a loan?`,
      here: [
        { s: `${R0(big)} is bigger than the loan, but it is a repayment.`, r: "the repayments carry the interest" },
        { s: `${cap(p.he)} borrows, so it is ${R0(P.v)} at T0, the start.` },
      ],
    });
  };
  return rolled(w, roll, make, { p: { he: "she", his: "her" }, r: 12, n: 5, times: [1], vals: [1000], big: 4200 });
}

/* ⑤ an unknown payment x in the middle (savings or a loan). x's real
   value is rolled and hidden; the total is built from it honestly. */
function tapUnknownX(w) {
  const roll = () => {
    const n = randInt(3, 6), tx = randInt(1, n - 1), k = randInt(1, 2), saving = pick([true, false]);
    const free = saving
      ? Array.from({ length: n }, (_, t) => t).filter(t => t !== tx)              // T0..T(n−1), not x's T
      : Array.from({ length: n }, (_, t) => t + 1).filter(t => t !== tx);         // T1..Tn, not x's T
    const bank = saving ? SAVE_AMTS : REPAY_AMTS;
    const vals = shuffled(bank).slice(0, k + 1);                                 // the last one is x's hidden value
    return { p: person(), r: pick(RATES), n, tx, saving, times: shuffled(free).slice(0, k).sort((a, b) => a - b), vals };
  };
  const make = (w, { p, r, n, tx, saving, times, vals }) => {
    const i = toFrac(r);
    const known = times.map((t, j) => ({ t, v: vals[j] }));
    const xHidden = { t: tx, v: vals[known.length] };
    const pays = [...known, { t: tx, x: true }].sort((a, b) => a.t - b.t);
    const total = { t: saving ? n : 0, v: Math.round(valueAt([...known, xHidden], i, saving ? n : 0)) };
    if (total.v >= MAX_LABEL || !distinct([...known.map(d => d.v), total.v])) return null;
    const what = saving ? "deposit" : "repayment";
    return tapCard(w, {
      story: `${saving ? saveStory(p, r) : loanStory(p, r)} One ${what}, x, is not known yet.`,
      n, amounts: saving ? [...pays, total] : [total, ...pays], total,
      hint: `x is a ${what} you would solve for later. ${cap(w)} is a different amount.`,
      here: [
        { s: `x is one of the ${what}s: a payment, so never ${w}.`, r: "you would solve for x later" },
        { s: saving ? `${cap(p.he)} saves, so it is ${R0(total.v)} at T${n}, the end.` : `${cap(p.he)} borrows, so it is ${R0(total.v)} at T0, the start.` },
      ],
    });
  };
  return rolled(w, roll, make, { p: { he: "he", his: "his" }, r: 10, n: 3, tx: 1, saving: true, times: [0], vals: [2000, 3000] });
}

/* ---------- the recall cards ---------- */

const yesno = (prompt, yes, hint, answerLabel, solution) =>
  ({ type: "yesno", concept: TOTAL, prompt, yes, hint, answerLabel, solution });

/* is the total a payment? (no) / do the payments add up to it? (yes) */
function recallPayments(w) {
  const v = pick(["payment", "deposit", "addUp"]);
  if (v === "addUp") return yesno(
    `Move every payment to the date of ${w}. Do the payments then add up to it?`, true,
    `${cap(w)} is the amount all the payments add up to.`,
    `Yes: that is what ${w} is`,
    [{ s: `Yes. ${cap(w)} is the amount all the payments add up to.`, r: "each payment moved to that date first" }]);
  const p = person();
  return yesno(
    v === "payment" ? `Is ${w} one of the payments?` : `${cap(p.he)} saves a little every year. Is ${w} one of ${p.his} deposits?`, false,
    `${cap(w)} is what the payments add up to.`,
    `No: ${w} is never a payment`,
    [{ s: `No. The payments all add up to ${w}; it is never one of them.`, r: "deposits and repayments are the payments" }]);
}

/* does P carry interest? (no) / do the repayments? (yes) */
function recallInterest() {
  return pick([true, false])
    ? yesno("Someone borrows money. Does the loan amount (P) already include the interest?", false,
      "P is what was borrowed on the first day.",
      "No: P is only the amount borrowed",
      [{ s: "No. P is the amount borrowed on day one, before any interest.", r: "the interest builds up as time passes" }])
    : yesno("Do the repayments on a loan include the interest?", true,
      "The repayments must pay back the loan and the interest on it.",
      "Yes: they pay back the loan and its interest",
      [{ s: "Yes. The repayments pay back the loan AND its interest.", r: "so together they come to more than P" }]);
}

/* where does the total sit? loan → T0, saving → the end */
const WHERE = ["At the start (T0)", "At the end (the last T)", "Wherever the biggest amount is", "In the middle"];
function recallWhere(w) {
  const loan = pick([true, false]);
  const correct = loan ? WHERE[0] : WHERE[1];
  return mc(TOTAL,
    loan ? `For a loan, where does ${w} sit on the timeline?` : `For saving, where does ${w} sit on the timeline?`,
    correct, WHERE.filter(o => o !== correct),
    { hint: loan ? "A loan starts big and gets paid down." : `The deposits grow into ${w}.`,
      solution: loan
        ? [{ s: "At the start (T0): it is the amount borrowed.", r: "a loan starts big and gets paid down" }]
        : [{ s: "At the end: the deposits grow into it.", r: "it is never a payment" }] });
}

/* ---------- the round, in dealing order (the phase follows the index) ---------- */
const ROUND = [
  ["tapSavings", tapSavings],             // card 1  · lumpsum (the total)
  ["recallPayments", recallPayments],     // card 2
  ["tapLoan", tapLoan],                   // card 3
  ["tapSameDay", tapSameDay],             // card 4  · the total (lumpsum)
  ["recallInterest", recallInterest],     // card 5
  ["tapLoanBigRepay", tapLoanBigRepay],   // card 6
  ["recallWhere", recallWhere],           // card 7  · the total
  ["tapUnknownX", tapUnknownX],           // card 8
];

export const questF8 = {
  id: "f8",
  skills: ROUND.map(([id, make], pos) => ({ id, concept: TOTAL, gen: () => make(totalWordAt(pos)) })),
};
