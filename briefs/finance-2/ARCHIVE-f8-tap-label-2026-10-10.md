# f8 tap-the-label round: built 10 Oct 2026, replaced by the jug round 11 Oct 2026

Why it was rejected (her play, 10 Oct 19:10): every card drew the total as a bare money amount among the
payments on the timeline, and the learner tapped one money label out of three or four. That is the class's
exact confusion (the total looks like just another payment), so the round practised the mistake instead of
curing it. The 11 Oct redesign makes total and payment two different KINDS of thing first: payments are
coins, the total is the jug, found in the WORDS before any timeline (FINANCE-PLAYTEST-2026-10-11-PLAN.md §3).

Where it lived: round f8 "Which one is the total?" in Blipwork (maths-homework-quest), built in commit
`66498aa` (10 Oct, "tap the money label, stacked same-day labels") and reviewed in commit `12018be`
(10 Oct, "stacked tap boxes get air, no-break p.a. and money, saving/loan asides"). The module below is
`git show 12018be:js/quests/questf8-which-total.js` verbatim (no later commit touched it). The harness
check that went with it is `f8TapCheck` in `git show 12018be:js/quests/_finance-check.js`, and the tap
plumbing it used (timeline `tapLabels`, `addTimelineLabelHits` in js/questions.js, the engine's stacked
labels and tap boxes) stays in the code: f9 to f13 still use the stacking.

Config blurb of the old round: "Savings or a loan: tap the amount all the others add up to."

## The eight cards, in dealing order (with the old vocabulary phasing)

| card | skill | kind | learner wording (the prompt, with w = the phase word) |
|---|---|---|---|
| 1 | `tapSavings` | tap a money label | "{saving story} Tap **lumpsum (the total)**: the amount all the other amounts add up to." |
| 2 | `recallPayments` | yes/no | "Is the lumpsum (the total) one of the payments?" / "...Is it one of her deposits?" / "Move every payment to the date of ... Do the payments then add up to it?" |
| 3 | `tapLoan` | tap a money label | "{loan story} Tap ..." (the loan at T0, bigger than each repayment) |
| 4 | `tapSameDay` | tap a money label | "{saving story} Her last deposit is on the day she checks the account. Tap **the total (lumpsum)**: ..." (two labels stacked on the last T) |
| 5 | `recallInterest` | yes/no | "Someone borrows money. Does the loan amount (P) already include the interest?" / "Do the repayments on a loan include the interest?" |
| 6 | `tapLoanBigRepay` | tap a money label | "{loan story} Tap ..." (one repayment bigger than the loan) |
| 7 | `recallWhere` | mc | "For a loan / For saving, where does the total sit on the timeline?" (At the start (T0) / At the end (the last T) / Wherever the biggest amount is / In the middle) |
| 8 | `tapUnknownX` | tap a money label | "{story} One deposit/repayment, x, is not known yet. Tap ..." |

## The module, verbatim (`12018be`)

```js
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
  `${cap(p.he)} saves in an account that pays ${r}%\u00A0p.a., compounded annually.`,
  `${cap(p.he)} saves money at ${r}%\u00A0p.a., compounded annually.`,
  `${cap(p.he)} puts money into a savings account at ${r}%\u00A0p.a., compounded annually.`,
]);
const loanStory = (p, r) => pick([
  `${cap(p.he)} borrows money at ${r}%\u00A0p.a., compounded annually, and pays it back.`,
  `${cap(p.he)} pays off a car: the loan is at ${r}%\u00A0p.a., compounded annually.`,
  `${cap(p.he)} takes out a loan at ${r}%\u00A0p.a., compounded annually, and pays it back in parts.`,
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

function tapCard(w, { story, saving, n, amounts, total, hint, here }) {
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
      { s: "For saving it sits at the end; for a loan it sits at the start.", r: saving ? "the deposits grow into it" : "a loan starts big and gets paid down" },
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
      story: saveStory(p, r), saving: true, n, amounts: [...deps, A], total: A,
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
      story: loanStory(p, r), saving: false, n, amounts: [P, ...pays], total: P,
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
      story: `${saveStory(p, r)} ${cap(p.his)} last deposit is on the day ${p.he} checks the account.`, saving: true,
      n, amounts: [...early, ...(totalOnTop ? [same, A] : [A, same])], total: A,
      hint: "Two amounts sit on the last day. One of them is a deposit, and a deposit is a payment.",
      here: [
        { s: `T${n} holds two amounts: ${R0(same.v)} is ${p.his} last deposit, a payment.` },
        { s: `${R0(A.v)} is ${w}.`, r: `the deposits ${andList([...early, same].map(d => R0(d.v)))} grow into it` },
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
      story: loanStory(p, r), saving: false, n, amounts: [P, ...pays], total: P,
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
      story: `${saving ? saveStory(p, r) : loanStory(p, r)} One ${what}, x, is not known yet.`, saving,
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
```

## The old concept card (`theTotal` in js/concepts.js, as it stood at 73c89c2)

Written in `66498aa`; `12018be` put thin no-break spaces into the money, and the f9/f10 reviews
(`c6f5cec`, `7ecefa2`, `cf85183`) wrapped each amount in a `nowrap` span. This is the last live text.

```js
  /* f8 "Which one is the total?" (2026-10-10). Uses the MIDDLE wording of
     the round's vocabulary phasing, "the total (lumpsum)" (FINANCE-ROUNDS-2-PLAN.md). */
  theTotal: {
    title: "The total (lumpsum)",
    body: `
      <p><b>The total (lumpsum)</b> is the amount all the payments add up to, once each payment is moved (with its interest) to the total's date. It is <b>never one of the payments</b>.</p>
      <ul>
        <li><b>Saving:</b> the deposits grow into the total, so it sits at the <b>end</b>.</li>
        <li><b>A loan:</b> the total is the amount borrowed, so it sits at the <b>start</b> (T0). A loan starts big and gets paid down.</li>
      </ul>
      <p>The loan amount <b>P has no interest in it</b>. The repayments pay back the loan <b>and</b> its interest, so together they come to more than P, and one repayment can even be bigger than P.</p>
      <p>Two amounts on the same day? Only one of them is the total. The other is a payment made on that day.</p>
      <div class="eg">Saving at 10% p.a.: <span class="nowrap">R2 000</span> at T0 and <span class="nowrap">R3 000</span> at T1 grow into <span class="nowrap">R6 292</span> at T3. The total is <span class="nowrap">R6 292</span>, at the end.</div>
      <div class="eg">A loan at 10% p.a.: he borrows <span class="nowrap">R5 000</span> at T0 and pays back <span class="nowrap">R2 200</span> at T1 and <span class="nowrap">R3 993</span> at T3. The total is <span class="nowrap">R5 000</span>, at the start.</div>`,
  },
  /* f9 "Car or no car?" (2026-10-10). This round says only "the total". */
```
