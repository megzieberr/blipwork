/* ============================================================
   FINANCE QUEST 12 · Build the timeline   ★
   ------------------------------------------------------------
   FINANCE-PLAYTEST-2026-10-11-PLAN.md §4 (her design 11 Oct 11:39, her
   order 11:47). The exam hands them WORDS, nothing else; words, then the
   timeline, then the equation is the order they must work in, so the
   rounds go the same way: f8 finds the jug in the words, f9 to f11 the
   cars and the meeting day, f12 builds the whole timeline by taps, and
   f13 writes the one equation off it. This round is the capstone of f8
   to f11 and the step before the equation.

   ONE CARD = f13's paragraph (no timeline yet), then her five picks as a
   steps chain. Input law: never type words, so every pick is a tap.
     1 How far does the timeline go?        mc: the last T, four T's
     2 Where does the interest rate change?  mc: three T's and "no change"
     3 Which rate goes on which road?        tokenpad FRAME mode: one slot per
                                             road, ["☐"] or ["☐", "then", "☐"];
                                             the chips are the rates as the
                                             roads draw them ("8% p.a."), plus
                                             one decoy rate
     4 Where does the total (the jug) go?    mc: T0 or the last T
     5 Where does each coin go?              one mc per deposit / withdrawal /
                                             repayment, in the paragraph's order;
                                             the x or P coin is still a coin
   A down-payment card ends on one more coin question, the down payment,
   whose answer is "nowhere: it never enters the account" (f10's taught
   form and its words): see DOWN PAYMENT below.

   EVERY PICTURE IS THE CORRECT STATE SO FAR. A step carries its own graph
   (js/questions.js draws it the moment the step is reached), and that
   graph is the timeline as it stands after the step before it was
   answered RIGHT, whatever was tapped: a slip in step 2 never poisons step
   5. A step whose state would draw the very same picture as the one just
   above it carries none (the rates step: until its rates land, the roads
   have no colour, so its picture is step 2's bare axis). The last coin's
   feedback side (step.graphAfter) draws the finished timeline. Every one
   is drawn at the full card width (step.graphWide, js/questions.js), the
   size of f13's own timeline, not the 280-px cap of a step's triangle. In
   order:
     after step 1   the bare axis T0..Tn, no roads, no amounts
     after step 3   the roads in their colours (.tl-road-j), a rate under each
     after step 4   the total in its ring with its letter, and the meeting-day
                    flag on its day (f13's drawing carries the flag there:
                    the day of A for saving, T0 for a loan)
     after a coin   that coin on its T (a withdrawal drawn "−R2 000"; a coin
                    on the jug's own day stacks above it, the engine's stack)
   The finished picture IS f13's: f13GraphOf(scene), the spec f13 draws on
   its own cards, and every earlier picture is that spec with the later
   parts left out (stageOf). verify-finance asserts both, and that the
   finished one deep-equals the timeline of the f13 card rolled from the
   same seed.

   NO SECOND TIMELINE MODEL. The scenes are f13's own (F13_SCENES: the
   seven bank families, rolled numbers, the ten textbook names), the
   paragraph is f13's (f13Story), the drawing is f13's (f13GraphOf). A
   card's first rng call is its scene's, so the same seed deals the same
   scene in both rounds.

   DOWN PAYMENT. Her design sketch put the down payment on the loan's day,
   stacked on P. f13's drawing has no down payment on it (and f10's taught
   form: "A down payment never enters the account: no car, no place in the
   equation"), and this round must finish on f13's drawing, so the down
   payment is asked as its own coin question with "nowhere: it never
   enters the account" as the answer, and T0 as the tempting slip (its
   miss sentence: paid on day one, but straight to the shop). Flagged to
   the foreman in the worker report: one step to change if she rules it
   onto T0.

   FEEDBACK. Each step is marked on its own (first answer counts, retries
   are practice: js/questions.js). Every option a learner can miss on
   carries a `why` that names what the tapped thing IS ("T5 is the day of
   the R4 000 deposit.", "T84 counts months: this timeline counts years."),
   never the word for a bad answer.

   VOCABULARY: "the total", "the jug", "coin", "road"; "meeting day" only
   for the flag, the way f9 uses it. Never "lump sum", "car" (no car rides
   in this round), and never the words f6 uses for a simple-interest
   purchase. Money, "p.a." and "N years" are each one unbreakable unit with
   a literal U+00A0 inside; no exponent is shown anywhere in this round.
   ============================================================ */
import { pick, shuffled } from "../ui.js";
import { rand } from "../finlib.js";
import { F13_SCENES, f13Story, f13GraphOf } from "./questf13-one-equation.js";

const CON = "buildTimeline";
export const REFRAIN = "Words first. Then the timeline. Then the one equation.";
const CAPTION = "T in years";
const SLOT = "☐";                                 // a frame box (js/tokenpad.js SLOT)
const THIN = " ";                                 // U+2009: the token pad joins its chips with a thin space
const NB = " ";                                   // U+00A0: the literal no-break space inside every unit
const NOWHERE = "nowhere: it never enters the account";   // f10's own words
const NO_CHANGE = "no change";
const RATES = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20];   // f13's rates: a decoy chip comes from here
const HOW = { 1: "annually", 2: "half‑yearly", 4: "quarterly", 12: "monthly" };   // a non-breaking hyphen (U+2011)
const PER = { 2: "half‑years", 4: "quarters", 12: "months" };

/* ---------- words ---------- */
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit
const money = v => nw(rand(v, 0).replace(/ /g, NB));                   // "R8 000"
const rateChip = r => `${r}%${NB}p.a.`;                                // a chip: the rate as its road draws it
const paU = r => nw(rateChip(r));
const years = y => nw(`${y}${NB}year${y === 1 ? "" : "s"}`);
const when = t => (t === 0 ? "now" : `after ${years(t)}`);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const T = t => `T${t}`;
const KIND = { dep: "deposit", wd: "withdrawal", repay: "repayment" };
/* "R3 000 deposit", "deposit x" (the unknown coin is still a coin) */
const coinName = x => (typeof x.v === "number" ? `${money(x.v)} ${KIND[x.kind]}` : `${KIND[x.kind]} ${x.v}`);

/* what a T IS on this scene, for a miss sentence: the jug's day, a coin's
   day, where the rate changes, else just how far from now it is */
function whatAt(sc, t, { jug = true, skip = null } = {}) {
  const bits = [];
  if (jug && t === sc.total.t) bits.push("the jug's day");
  sc.pays.filter(x => x.t === t && x !== skip).forEach(x => bits.push(`the day of the ${coinName(x)}`));
  if (sc.roads.length === 2 && t === sc.roads[0].to) bits.push("where the rate changes");
  if (bits.length) return bits.join(" and ");
  return t === 0 ? "now" : `${years(t)} from now`;
}

/* ---------- the pictures: f13's drawing, with the later parts left out ---------- */
/* nodes[0] of f13's spec is the total (graphOf puts it first, the bottom of
   a shared day's stack); nodes[1..] are the coins in the scene's order */
export function stageOf(final, { roads = false, jug = false, coins = 0 } = {}) {
  const out = {};
  Object.keys(final).forEach(k => {
    if ((k === "meet" && !jug) || (k === "roads" && !roads)) return;
    out[k] = k === "nodes" ? final.nodes.filter((nd, j) => (j === 0 ? jug : j <= coins)) : final[k];
  });
  return out;
}

/* ---------- the five steps ---------- */
const opt = (label, correct, why) => ({ label, correct, ...(why ? { why } : {}) });
const tOptions = (ts, right, whyOf) => [...ts].sort((a, b) => a - b).map(t => opt(T(t), t === right, t === right ? null : whyOf(t)));
/* up to k distinct T's from the groups, in group order, each group shuffled */
function take(groups, k, not) {
  const out = [];
  groups.forEach(g => shuffled([...new Set(g)]).forEach(t => { if (out.length < k && !not.includes(t) && !out.includes(t)) out.push(t); }));
  return out;
}

/* 1 · how far: the last T. One option is always PAST the end (a year too
   far, or the periods counted instead of the years), so "the biggest T on
   offer" is never a way to the answer */
function farStep(sc) {
  const n = sc.n, k = (sc.roads.find(r => r.k > 1) || {}).k;
  const past = pick([n + 1, ...(k ? [n * k] : [])]);
  const inside = [n - 1, ...sc.pays.map(x => x.t), ...(sc.roads.length === 2 ? [sc.roads[0].to] : []), n + 1];
  const near = take([inside, [n - 2, n + 2]], 2, [0, n, past]);
  const why = t => (k && t === n * k && t !== n + 1 ? `${T(t)} counts ${PER[k]}: this timeline counts years.`
    : t > n ? `${T(t)} is past the end: nothing in the words happens ${when(t)}.`
    : `${T(t)} is ${whatAt(sc, t, { jug: false })}, not the last day the words name.`);
  return {
    kind: "mc", layout: "grid2",
    prompt: `How far does the timeline go?<br><span class="muted small">Pick the last T.</span>`,
    options: tOptions([n, past, ...near], n, why),
    hint: "The last day the words name is the end of the timeline. Count in years from now: now is T0.",
  };
}

/* 2 · where the rate changes: three T's and "no change", always offered */
function changeStep(sc) {
  const n = sc.n, two = sc.roads.length === 2, c = two ? sc.roads[0].to : null;
  const inner = Array.from({ length: n - 1 }, (_, j) => j + 1);           // T1..T(n−1): a rate only changes inside the line
  const coinTs = sc.pays.map(x => x.t).filter(t => t > 0 && t < n);
  const ts = two ? [c, ...take([[...coinTs, c - 1, c + 1], inner], 2, [c])] : take([coinTs, inner], 3, []);
  const coinOn = t => sc.pays.some(x => x.t === t);
  const why = t => (two
    ? (coinOn(t) ? `${T(t)} is ${whatAt(sc, t, { jug: false })}: a coin, not a rate change.`
      : `${T(t)} is ${years(t)} from now. The rate sentence says how long the first rate lasts.`)
    : `${coinOn(t) ? `${T(t)} is ${whatAt(sc, t, { jug: false })}: a coin, not a rate change. ` : ""}The words give ONE rate for the whole time: nothing changes at ${T(t)}.`);
  return {
    kind: "mc", layout: "grid2",
    prompt: "Where does the interest rate change?",
    options: [...tOptions(ts, c, why), opt(NO_CHANGE, !two, two ? "The words give TWO rates: the rate does change." : null)],
    hint: "Read the rate sentence. The first rate lasts the years it names, counted from T0. One rate for the whole time: no change.",
  };
}

/* 3 · which rate on which road: fill the roads in order, from T0 */
function ratesStep(sc) {
  const two = sc.roads.length === 2, chips = sc.roads.map(r => rateChip(r.r));
  const used = sc.roads.map(r => r.r), c = sc.roads[0].to;
  return {
    kind: "tokenpad",
    prompt: two ? `Which rate goes on which road?<br><span class="muted small">Two roads: T0 to ${T(c)}, then ${T(c)} to ${T(sc.n)}.</span>`
      : `Which rate goes on which road?<br><span class="muted small">One road: T0 to ${T(sc.n)}.</span>`,
    keys: shuffled([...chips, rateChip(pick(RATES.filter(r => !used.includes(r))))]),
    frame: two ? [SLOT, "then", SLOT] : [SLOT],
    expected: chips.join(THIN),
    hint: two ? "The first road wears the rate the words give for the first years; the second road wears the rate after the change."
      : "One rate for the whole time: the one the words give.",
  };
}

/* 4 · where the jug goes (f8's words) */
function jugStep(sc) {
  const loan = sc.kind === "loan", n = sc.n;
  return {
    kind: "mc", layout: "grid2",
    prompt: "Where does the total (the jug) go?",
    options: [
      opt("T0", loan, loan ? null : "Savings fill the jug coin by coin: it is full at the END."),
      opt(T(n), !loan, loan ? "The bank hands you the full jug at the START: a loan's jug sits on the loan's own day." : null),
    ],
    hint: "Savings: you fill the jug, so it sits at the end. A loan: the bank hands you the jug at the start.",
  };
}

/* 5 · each coin on its T, in the paragraph's order */
function coinStep(sc, x, first) {
  const n = sc.n, c = sc.roads.length === 2 ? sc.roads[0].to : null;
  const all = Array.from({ length: n + 1 }, (_, j) => j);
  const others = sc.pays.filter(y => y !== x).map(y => y.t);
  const ts = [x.t, ...take([[...others, ...(c != null ? [c] : [])], [0, n, x.t - 1, x.t + 1].filter(t => t >= 0 && t <= n), all], 3, [x.t])];
  return {
    kind: "mc", layout: "grid2",
    prompt: `${first ? "Where does each coin go?<br>" : ""}${cap(coinName(x))}: which T?`,
    options: tOptions(ts, x.t, t => `${T(t)} is ${whatAt(sc, t, { skip: x })}.`),
    hint: "Find the coin's day in the words: now is T0, and “after so many years” is that many T's on from T0.",
  };
}

/* the down payment: a coin paid on day one, straight to the shop. It never
   enters the account, so f13's drawing (and f10's taught form) has no place
   for it */
function downStep(sc) {
  const n = sc.n, reps = sc.pays.map(x => x.t);
  const why = t => (t === 0 ? "Paid on day one, but straight to the shop: it never enters the account, so the loan’s timeline has no place for it."
    : `${T(t)} is ${whatAt(sc, t)}. The down payment is paid straight to the shop.`);
  return {
    kind: "mc",
    prompt: `${money(sc.down)} down payment: which T?`,
    options: [...tOptions([0, ...take([reps, [n]], 2, [0])], -1, why), opt(NOWHERE, true)],
    hint: `A down payment is paid straight to the shop: it never enters the account. It comes off the price: ${nw("loan = price − down payment")}.`,
  };
}

/* ---------- one card ---------- */
export function f12Card(sc) {
  const final = f13GraphOf(sc);
  const n = sc.n, two = sc.roads.length === 2, c = two ? sc.roads[0].to : null, loan = sc.kind === "loan";
  const coins = sc.pays;
  const steps = [farStep(sc), changeStep(sc), ratesStep(sc), jugStep(sc), ...coins.map((x, j) => coinStep(sc, x, j === 0))];
  if (sc.down != null) steps.push(downStep(sc));
  /* the picture each step opens on: the correct state after the step before */
  const after = [
    null,                                                     // step 1 opens on the paragraph alone
    stageOf(final),                                           // after "how far": the bare axis
    stageOf(final),                                           // after "where it changes": no colour yet, the same picture
    stageOf(final, { roads: true }),                          // after the rates: the roads
    ...coins.map((x, j) => stageOf(final, { roads: true, jug: true, coins: j })),
  ];
  if (sc.down != null) after.push(final);
  let shown = null;
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  steps.forEach((st, i) => {
    if (after[i] && !same(after[i], shown)) { Object.assign(st, { graph: after[i], graphCap: CAPTION, graphWide: true }); shown = after[i]; }
  });
  /* the finished drawing on the feedback side of the last coin (a down-payment
     card already shows it above its last question) */
  if (!same(final, shown)) Object.assign(steps[steps.length - 1], { graphAfter: final, graphAfterCap: CAPTION, graphWide: true });

  const role = sc.total.role;
  const jugWord = sc.total.value != null ? `the jug, ${role} = ${money(sc.total.value)}` : `the jug, ${role}`;
  const coinLine = x => ({
    s: `${cap(coinName(x))}: ${T(x.t)}`,
    r: `${when(x.t)}${x.kind === "wd" ? "; a coin going out, drawn with its minus" : typeof x.v === "number" ? "" : `; ${x.v} is still a coin, on its day`}`,
  });
  const solution = [
    { s: `The timeline runs from T0 to ${T(n)}.`, r: `the last day the words name: ${when(n)}` },
    two ? { s: `The rate changes at ${T(c)}.`, r: `the first rate lasts the first ${years(c)}` } : { s: "The rate never changes.", r: "the words give one rate for the whole time" },
    two
      ? { s: `Road 1, T0 to ${T(c)}: ${paU(sc.roads[0].r)} compounded ${HOW[sc.roads[0].k]}. Road 2, ${T(c)} to ${T(n)}: ${paU(sc.roads[1].r)} compounded ${HOW[sc.roads[1].k]}.`, r: "each road one rate, in its own colour" }
      : { s: `One road, T0 to ${T(n)}: ${paU(sc.roads[0].r)} compounded ${HOW[sc.roads[0].k]}.`, r: "one rate, one colour" },
    { s: `${cap(jugWord)}, sits at ${T(sc.total.t)}${loan ? ", the day of the loan" : ", the end"}.`, r: loan ? "the bank hands over the full jug at the start; its day is the meeting day (the flag)" : "savings fill the jug coin by coin; its day is the meeting day (the flag)" },
    ...coins.map(coinLine),
  ];
  if (sc.down != null) solution.push({ s: `The ${money(sc.down)} down payment: nowhere on the timeline.`, r: "paid straight to the shop, it never enters the account; it comes off the price" });
  solution.push({ s: REFRAIN });
  return {
    type: "steps", concept: CON,
    prompt: `${f13Story(sc)}<br><span class="muted small">Build its timeline first, tap by tap. No equation yet.</span>`,
    steps,
    hint: "How far, where the rate changes, which rate on which road, where the jug goes, where each coin goes.",
    answerLabel: `T0 to ${T(n)}; ${two ? `the rate changes at ${T(c)}` : "no rate change"}; ${jugWord}, at ${T(sc.total.t)}; ${coins.map(x => `${coinName(x)} at ${T(x.t)}`).join(", ")}${sc.down != null ? `; the ${money(sc.down)} down payment: nowhere` : ""}.`,
    solution,
  };
}

/* ---------- the round, in dealing order (8 cards) ---------- */
const ROUND = [
  ["twoDeposits", "twoDeposits"],                 // card 1 · Brenda's two deposits, or Mvelo's three (the last stacks on A's day)
  ["loanTwoRepayments", "loanTwoRepayments"],     // card 2 · a loan, the jug at T0
  ["withdrawal", "withdrawal"],                   // card 3 · one rate: "no change"; a coin going out
  ["hirePurchase", "hirePurchase"],               // card 4 · a loan with a down payment: nowhere on the timeline
  ["mixed", "mixed"],                             // card 5 · two deposits and a withdrawal
  ["targetAmount", "targetAmount"],               // card 6 · a known total; the deposit P is the coin
  ["loanAgain", "loanTwoRepayments"],             // card 7 · a loan again
  ["unknownPayment", "unknownPayment"],           // card 8 · x is still a coin; the last deposit stacks on A's day
];

export const questF12 = {
  id: "f12",
  skills: ROUND.map(([id, fam]) => ({ id, concept: CON, gen: () => f12Card(F13_SCENES[fam]()) })),
};
