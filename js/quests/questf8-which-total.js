/* ============================================================
   FINANCE QUEST 8 · Which one is the total?   ★  (THE JUG round)
   ------------------------------------------------------------
   Rebuilt 2026-10-11 (FINANCE-PLAYTEST-2026-10-11-PLAN.md §3, her
   "absolutely perfect" on the mock-up, 12:02). The 10 Oct round had the
   learner tap a money label on a timeline; it drew the total as one more
   bare amount among the payments, the class's exact confusion. That round
   is archived in briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md.

   HER RULINGS (11 Oct 11:54 to 12:02)
     · The textbooks' word for the total literally means ONE PAYMENT, so the
       class heard "a payment" every time. The word is retired: the app says
       "the total". (16:54: phased out, not dropped cold. Frame 1 of card 1's
       discovery slide and the 📖 library card say it once in brackets and
       say it IS the total; nowhere else in the round.)
     · The total is the ONE amount that is worth the same as ALL the
       payments together, once they are all on the same day.
     · Payments are coins, the total is the jug. Savings: you fill the jug;
       the jug at the END is the total (A). A loan: the bank hands you a full
       jug at the START; that jug is the total (P); you pay it back coin by
       coin. A withdrawal is a coin going out. The jug can end up smaller
       than a coin: it is still the jug.
     · In the words, the jug is the "has / borrows / wants to have / owes"
       sentence (a STATE); the coins are the "pays / deposits / withdraws"
       sentences (ACTIONS). Rate-and-time sentences are neither.
     · Words FIRST, the timeline only after: f8 never asks for a tap on a
       timeline. The only timeline in the round is the feedback of the
       "T0 or the end?" step: the "?" in its ring with its role letter,
       NO coins placed (the f12 round places them).

   THE ROUND (8 cards, every tap an mc, so the harness and
   tools/shoot_round.py can drive it):
     1 jugTwoDeposits     paragraph: a saving with two deposits, opened by
                          the DISCOVERY slide (q.reveal, three frames, below)
     2 recallSaving       "Which of these is the jug?" (four short phrases)
     3 jugLoan            paragraph: a loan with two repayments
     4 jugWithdrawal      paragraph: a saving with a withdrawal
     5 recallLoan         "Which of these is the jug?"
     6 jugHirePurchase    paragraph: hire purchase with a down payment
     7 jugTargetOrSameDay paragraph: a target amount ("wants to have") or a
                          loan with a repayment on the loan's own day (a coin
                          toss per roll, so gen() stays pure and seedable)
     8 recallMixed        "Which of these is the jug?"
   A paragraph card is a steps chain of three mc steps: (1) "Tap the
   sentence that is the jug." (the paragraph cut into 3 to 5 sentence
   chips, exactly one the jug), (2) "Savings or loan?", (3) "Does the jug
   sit at T0 or at the end?", whose feedback side draws the timeline
   (step.graphAfter, js/questions.js).

   FEEDBACK. A miss always says which KIND of thing was tapped ("That is
   a coin: money going in on its day." / "That is a rate-and-time
   sentence, not an amount."), never the word for a bad answer: every
   chip and phrase carries a `why` (the step's hint box) and a `note`
   (a pill, on the tapped chip at once and on every chip once the step
   is done; the recall cards use f11's option notes).

   HONEST WORDS. Every paragraph has exactly ONE unknown, the way an exam
   question does (A, P, or one payment x), so its numbers never contradict
   each other, and the unknown x is always a positive amount at the
   paragraph's own rate (checked when the paragraph is rolled). Textbook
   names only (public repo): the ten of f13's class bank. Money, "p.a."
   and "5 years" are each one unbreakable unit with a literal U+00A0
   inside; "half‑yearly" keeps its non-breaking hyphen. No exponent is
   ever shown in this round.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac } from "../finlib.js";
import { jugDiscover } from "../concepts.js";
import { L } from "../lang.js";

const TOTAL = "theTotal";

/* The 10 Oct round phased its word by card position; the jug round says
   "the total" on every card. The per-position hook stays (a static round
   deals def.skills IN ORDER, so a card's position is its skill's index,
   js/play.js renderPlay): it is how card 1 knows to open on the discovery slide. */
export const totalWordAt = () => L("the total", "die totaal");

/* ---------- words and numbers ---------- */
const NB = " ";
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit
const money = v => nw(rand(v, 0).replace(/ /g, NB));                   // "R8 000", the space a literal U+00A0
const paU = r => nw(L(`${r}%${NB}p.a.`, `${r}%${NB}p.j.`));
const years = y => nw(L(`${y}${NB}year${y === 1 ? "" : "s"}`, `${y}${NB}jaar${y === 1 ? "" : ""}`));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const HOW = { 1: L("annually", "jaarliks"), 2: L("half‑yearly", "halfjaarliks"), 4: L("quarterly", "kwartaalliks"), 12: L("monthly", "maandeliks") };   // a non-breaking hyphen
const RATES = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18];
const KS = [1, 2, 4, 12];
const step500 = (lo, hi) => 500 * randInt(Math.ceil(lo / 500), Math.floor(hi / 500));
const grow = (v, r, k, yrs) => v * Math.pow(1 + toFrac(r) / k, k * yrs);

/* the ten textbook names of the class bank (f13) and their pronouns;
   Mvelo is named again rather than given a pronoun */
const SHE = { he: L("she", "sy"), his: L("her", "haar") }, HE = { he: L("he", "hy"), his: L("his", "sy") };
const WHO = {
  Brenda: SHE, Mvelo: { he: "Mvelo", his: L("Mvelo’s", "Mvelo se") }, Bradley: HE, Jason: HE, Mandy: SHE,
  Brian: HE, Stephanie: SHE, Bob: HE, Arnold: HE, David: HE,
};
export const F8_NAMES = Object.keys(WHO);
const ITEMS = [L("lounge suite", "sitkamerstel"), L("motorbike", "motorfiets"), L("laptop", "skootrekenaar"), L("fridge", "yskas"), L("TV", "TV"), L("bed", "bed")];   // never "car": f9 to f13's car is the bracket

/* ---------- card 1 opens on a DISCOVERY slide (her notes, 11 Oct 16:54, 16:56) ----------
   "Make the first slide just the jug": three frames, one jug at a time
   (q.revealMode "replace"; js/questions.js keeps the sentence chips hidden
   until the third frame is up, and its "Next ▸" is the tap). Frame 1 is the
   empty jug, and the ONLY place in the round (with the 📖 library card) that
   says the textbook's word: in brackets once, then "that is the total, from
   now on we just call it the total". Frame 2: savings fill the jug coin by
   coin, the total at the END. Frame 3: a loan, the bank hands over the full
   jug at the START and the coins drain it. The picture is jugDiscover in
   js/concepts.js. NB keeps "the total", "the jug", "full jug", "the END" and
   "the START" on one line. */
const DISCOVER = [
  jugDiscover(L("empty", "empty")) + `<div class="jd-cap">`
    + L(`<p>Payments are <b>coins</b>. The${NB}total (the${NB}lumpsum) is <b>the${NB}jug</b>.</p>`, `<p>Paaiemente is <b>munte</b>. Die${NB}totaal (die${NB}enkelbedrag) is <b>die${NB}beker</b>.</p>`)
    + L(`<p>Your textbook says “lump sum”. That is the${NB}total we are talking about. From now on we just call it the${NB}total.</p>`, `<p>Jou handboek sê “enkelbedrag”. Dit is die${NB}totaal waarvan ons praat. Van nou af noem ons dit net die${NB}totaal.</p>`)
    + L(`<p class="muted small">Tap Next to see where the jug sits.</p></div>`, `<p class="muted small">Klik op Next om te sien waar die beker staan.</p></div>`),
  jugDiscover(L("save", "save")) + `<div class="jd-cap">`
    + L(`<p><b>Savings:</b> you fill the jug coin by coin. The${NB}total sits at <b>the${NB}END</b>.</p></div>`, `<p><b>Spaar:</b> jy vul die beker munt vir munt. Die${NB}totaal staan aan <b>die${NB}EINDE</b>.</p></div>`),
  jugDiscover(L("loan", "loan")) + `<div class="jd-cap">`
    + L(`<p><b>A loan:</b> the bank hands you the full${NB}jug at <b>the${NB}START</b>. The${NB}total sits at the beginning, and your coins pay it back.</p></div>`, `<p><b>'n Lening:</b> die bank gee jou die volle${NB}beker aan <b>die${NB}BEGIN</b>. Die${NB}totaal staan aan die begin, en jou munte betaal dit terug.</p></div>`),
];
/* Frame 3 stays up for the whole card (replace mode), but card 1's own story
   is always savings: so once the loan has drained, its caption fades to the
   neutral reminder (11 Oct, from the phone checker's report). The jug stays
   as it ended, empty. */
const REMIND = `<p>Payments are <b>coins</b>. The${NB}total is <b>the${NB}jug</b>.</p>`;
function remindAfterDrain(jd) {
  const frame = jd.isConnected && jd.dataset.remind !== "done" ? jd.closest(".reveal-frame") : null;
  const cap = frame ? frame.querySelector(".jd-cap") : null;
  if (!cap) return;
  jd.dataset.remind = "done";
  cap.style.minHeight = cap.offsetHeight + "px";   // the chips below never jump under a finger
  cap.innerHTML = REMIND;
  cap.classList.add("jd-remind");        // the ~300 ms fade, css/styles.css
}
/* her "they tap": a tap on the slide's jug does what "Next ▸" does. One
   delegated listener, added once when this module first loads; no engine
   change (the button is the reveal box's sibling, gone on the last frame).
   The same block swaps frame 3's caption: on the loan level's animationend
   (frames 1 and 2 never match), or 6 s after frame 3 came up (reduced
   motion, or a missed event); frame 3 only ever comes up by a click, on
   Next or on the jug, so the click listener arms the timer.
   Node imports of the round (the harnesses) have no document. */
if (typeof document !== "undefined" && !globalThis.__f8JugTap) {
  globalThis.__f8JugTap = true;
  document.addEventListener("click", e => {
    const jug = e.target instanceof Element ? e.target.closest(".q-reveal .jug-discover") : null;
    const next = jug ? jug.closest(".q-reveal").parentElement.querySelector(":scope > .reveal-next") : null;
    if (next) next.click();
    document.querySelectorAll(".q-reveal .jd-loan:not([data-remind])").forEach(jd => {
      jd.dataset.remind = "armed";
      setTimeout(() => remindAfterDrain(jd), 6000);
    });
  });
  document.addEventListener("animationend", e => {
    const jd = e.target instanceof Element && e.target.matches(".q-reveal .jd-loan .jug-lvl") ? e.target.closest(".jd-loan") : null;
    if (jd) remindAfterDrain(jd);
  });
}

/* ---------- the kinds of sentence ----------
   note: the pill a chip wears once it is answered; why: what a miss on it
   says; sol: its line in the worked solution */
const KIND = {
  jug:   { note: L("the jug", "die beker"), sol: L("the jug: what someone has, borrows or wants to have, the ONE total", "die beker: wat iemand het, leen of wil hê, die EEN totaal") },
  in:    { note: L("a coin: in", "'n munt: in"), why: L("That is a coin: money going in on its day.", "Dit is 'n munt: geld wat op sy dag ingaan."), sol: L("a coin: money going in on its day", "'n munt: geld wat op sy dag ingaan") },
  out:   { note: L("a coin: out", "'n munt: uit"), why: L("That is a coin: money coming out on its day.", "Dit is 'n munt: geld wat op sy dag uitkom."), sol: L("a coin: money coming out on its day", "'n munt: geld wat op sy dag uitkom") },
  repay: { note: L("a coin: repayment", "'n munt: terugbetaling"), why: L("That is a coin: a repayment, money going back to the bank on its day.", "Dit is 'n munt: 'n terugbetaling, geld wat op sy dag terug na die bank gaan."), sol: L("a coin: a repayment going back to the bank on its day", "'n munt: 'n terugbetaling wat op sy dag terug na die bank gaan") },
  down:  { note: L("a coin: down payment", "'n munt: aanbetaling"), why: L("That is a coin: the down payment, paid on day one straight to the shop.", "Dit is 'n munt: die aanbetaling, op dag een reguit aan die winkel betaal."), sol: L("a coin: the down payment, paid on day one straight to the shop", "'n munt: die aanbetaling, op dag een reguit aan die winkel betaal") },
  rate:  { note: L("rate and time", "koers en tyd"), why: L("That is a rate-and-time sentence, not an amount.", "Dit is 'n sin oor koers en tyd, nie 'n bedrag nie."), sol: L("rate and time: not an amount", "koers en tyd: nie 'n bedrag nie") },
};
const DEFINITION = L("The total is the ONE amount worth the same as ALL the payments together, once they are all on the same day.", "Die totaal is die EEN bedrag wat net soveel werd is as AL die paaiemente saam, sodra hulle almal op dieselfde dag is.");
const JUG_HINT = L("The jug is what someone HAS, BORROWS or WANTS TO HAVE. Coins are what they DO: deposit, withdraw, pay.", "Die beker is wat iemand HET, LEEN of WIL HÊ. Munte is wat hulle DOEN: deponeer, onttrek, betaal.");

/* a sentence: { kind, say(who) } where who = { S, s }: the subject at the
   start of a sentence and in the middle of one. The FIRST sentence that names
   someone gets the name; every later one the pronoun. A rate sentence names
   nobody. */
const sen = (kind, say) => ({ kind, say });
function tell(order, name) {
  const p = WHO[name];
  let named = false;
  return order.map(x => {
    const who = named ? { S: cap(p.he), s: p.he, his: p.his } : { S: name, s: name, his: p.his };
    const text = x.say(who);
    if (text.includes(name) || /\b(he|she|his|her)\b/i.test(text)) named = true;
    return { kind: x.kind, text };
  });
}

const rateSen = (r, k, loan) => sen("rate", () => pick(loan
  ? [L(`The bank charges ${paU(r)}, compounded ${HOW[k]}.`, `Die bank vra rente teen ${paU(r)}, ${HOW[k]} saamgestel.`), L(`The interest rate is ${paU(r)}, compounded ${HOW[k]}.`, `Die rentekoers is ${paU(r)}, ${HOW[k]} saamgestel.`)]
  : [L(`The account earns interest at ${paU(r)}, compounded ${HOW[k]}.`, `Die rekening verdien rente teen ${paU(r)}, ${HOW[k]} saamgestel.`), L(`The interest rate is ${paU(r)}, compounded ${HOW[k]}.`, `Die rentekoers is ${paU(r)}, ${HOW[k]} saamgestel.`)]));

/* ---------- the paragraph card ---------- */
function paragraphCard(pos, { name, loan, hp = false, n, order }) {
  const chips = tell(order, name);
  const jugAt = loan ? 0 : n, role = loan ? L("P", "P") : L("A", "A");
  const jugChip = chips.find(c => c.kind === "jug");
  /* steps 2 and 3 are two short side-by-side buttons: no pill (it would not fit
     half a 360-px row), only the miss sentence */
  const opt = (label, correct, note, why) => ({ label, correct, ...(note ? { note } : {}), ...(why ? { why } : {}) });

  const step1 = {
    kind: "mc",
    prompt: L(`Tap the sentence that is the jug.<br><span class="muted small">One of them is the total; the others are coins, or the rate and the time.</span>`, `Klik op die sin wat die beker is.<br><span class="muted small">Een daarvan is die totaal; die ander is munte, of die koers en die tyd.</span>`),
    options: chips.map(c => opt(c.text, c.kind === "jug", KIND[c.kind].note, KIND[c.kind].why)),
    hint: JUG_HINT,
  };
  const step2 = {
    kind: "mc", layout: "grid2",
    prompt: L("Savings or loan?", "Spaar of lening?"),
    options: shuffled([
      opt(L("Savings", "Spaar"), !loan, null,
        loan ? (hp ? L("Hire purchase is a loan: the down payment goes to the shop and the rest is borrowed.", "Huurkoop is 'n lening: die aanbetaling gaan na die winkel en die res word geleen.") : L("Somebody borrows here: the bank hands over the full jug, and the coins pay it back.", "Iemand leen hier: die bank gee die volle beker oor, en die munte betaal dit terug.")) : null),
      opt(L("Loan", "Lening"), loan, null,
        loan ? null : L("Nobody borrows here: the coins go into a savings account and fill the jug.", "Niemand leen hier nie: die munte gaan in 'n spaarrekening en vul die beker.")),
    ]),
    hint: L("Is someone filling an account, or did the bank hand money over? Hire purchase counts as a loan with a down payment.", "Vul iemand 'n rekening, of het die bank geld oorhandig? Huurkoop tel as 'n lening met 'n aanbetaling."),
  };
  const step3 = {
    kind: "mc", layout: "grid2",
    prompt: L("Does the jug sit at T0 or at the end?", "Staan die beker by T0 of aan die einde?"),
    options: [
      opt(L("T0", "T0"), loan, null,
        loan ? null : L("Savings fill the jug coin by coin: it is full at the END.", "Spaargeld vul die beker munt vir munt: dit is vol aan die EINDE.")),
      opt(L(`T${n}`, `T${n}`), !loan, null,
        loan ? L("The bank hands you the full jug at the START: the loan is the jug at T0.", "Die bank gee jou die volle beker aan die BEGIN: die lening is die beker by T0.") : null),
    ],
    hint: L("Savings: you fill the jug, so it sits at the end. A loan: the bank hands you the jug at the start.", "Spaar: jy vul die beker, so dit staan aan die einde. 'n Lening: die bank gee jou die beker aan die begin."),
    /* the feedback side: the jug on the timeline, "?" in its ring with its
       letter, no coins yet (js/questions.js draws it once the step is done) */
    graphAfter: { type: "timeline", n, nodes: [{ t: jugAt, label: "?", role }] },
    graphAfterCap: L("T in years", "T in jare"),
  };

  const kindWord = loan ? (hp ? L("Hire purchase is a loan", "Huurkoop is 'n lening") : L("A loan", "'n Lening")) : L("Savings", "Spaar");
  const where = loan ? L("T0, the start", "T0, die begin") : L(`T${n}, the end`, `T${n}, die einde`);
  return {
    type: "steps", concept: TOTAL,
    prompt: pos === 0 ? L("First the idea. Then a finance question, cut into its sentences.", "Eers die idee. Dan 'n vraag oor finansies, in sy sinne opgesny.") : L("A finance question, cut into its sentences.", "'n Vraag oor finansies, in sy sinne opgesny."),
    ...(pos === 0 ? { reveal: DISCOVER.slice(), revealMode: "replace" } : {}),
    steps: [step1, step2, step3],
    hint: L("Find the jug in the words first: what someone has, borrows or wants to have.", "Vind eers die beker in die woorde: wat iemand het, leen of wil hê."),
    answerLabel: L(`The jug: “${jugChip.text}” ${kindWord}, so the jug is ${role}, at ${where}.`, `Die beker: “${jugChip.text}” ${kindWord}, so die beker is ${role}, by ${where}.`),
    solution: [
      ...chips.map(ch => ({ s: ch.text, r: KIND[ch.kind].sol })),
      { s: loan ? L(`${kindWord}: the bank hands over the full jug at the start, so the jug is P, at T0.`, `${kindWord}: die bank gee die volle beker aan die begin oor, so die beker is P, by T0.`)
                : L(`Savings: the coins fill the jug, so the jug is A, at the end, T${n}.`, `Spaar: die munte vul die beker, so die beker is A, aan die einde, T${n}.`) },
      { s: DEFINITION },
    ],
  };
}

/* roll(), make(pars) → card | null, FIX: hand-checked pars make() always
   accepts. The loop lands on its first roll almost always; the FIX only
   guarantees gen() can never hang. */
const rolled = (roll, make, FIX) => {
  for (let tries = 0; tries < 300; tries++) { const c = make(roll()); if (c) return c; }
  return make(FIX);
};
const names = () => pick(F8_NAMES);

/* ① a saving with two deposits; the jug is the question "how much after n years" */
function jugTwoDeposits(pos) {
  const roll = () => {
    const n = randInt(4, 8), d1 = step500(2000, 15000);
    return { name: names(), n, r: pick(RATES), k: pick(KS), d1, d2: step500(1000, 12000), t2: randInt(1, n - 1), shape: randInt(0, 3), ask: randInt(0, 2) };
  };
  const make = ({ name, n, r, k, d1, d2, t2, shape, ask }) => {
    if (d1 === d2) return null;
    const in1 = sen(L("in", "in"), w => L(`${w.S} deposits ${money(d1)} into a savings account now.`, `${w.S} deponeer nou ${money(d1)} in 'n spaarrekening.`));
    const in1b = sen(L("in", "in"), w => L(`${w.S} deposits ${money(d1)} into the account now.`, `${w.S} deponeer nou ${money(d1)} in die rekening.`));
    const in2 = sen(L("in", "in"), w => L(`${w.S} deposits another ${money(d2)} after ${years(t2)}.`, `${w.S} deponeer nog ${money(d2)} ná ${years(t2)}.`));
    const rate = rateSen(r, k, false);
    const jugEnd = sen("jug", w => [
      L(`How much will ${w.s} have in the account after ${years(n)}?`, `Hoeveel sal ${w.s} ná ${years(n)} in die rekening hê?`),
      L(`${w.S} wants to know how much is in the account after ${years(n)}.`, `${w.S} wil weet hoeveel ná ${years(n)} in die rekening is.`),
      L(`What amount will ${w.s} have in the account after ${years(n)}?`, `Watter bedrag sal ${w.s} ná ${years(n)} in die rekening hê?`)][ask]);
    const jugFirst = sen("jug", w => L(`${w.S} wants to know how much ${w.s === name ? WHO[name].he : w.s} will have in a savings account after ${years(n)}.`, `${w.S} wil weet hoeveel ${w.s === name ? WHO[name].he : w.s} ná ${years(n)} in 'n spaarrekening sal hê.`));
    const order = [[in1, in2, rate, jugEnd], [in1, rate, in2, jugEnd], [rate, in1, in2, jugEnd], [jugFirst, in1b, in2, rate]][shape];
    return paragraphCard(pos, { name, loan: false, n, order });
  };
  return rolled(roll, make, { name: "Brian", n: 5, r: 10, k: 1, d1: 5000, d2: 3000, t2: 2, shape: 0, ask: 0 });
}

/* ② a loan with two repayments: P known and the last repayment x, or P
   unknown ("an amount, P") and both repayments known */
function jugLoan(pos) {
  const roll = () => {
    const n = randInt(3, 7), P = step500(20000, 150000);
    return { name: names(), n, r: pick(RATES), k: pick(KS), P, r1: step500(P * 0.15, P * 0.5), r2: step500(P * 0.3, P * 0.8), t1: randInt(1, n - 1), unknownP: pick([false, false, true]), shape: randInt(0, 2) };
  };
  const make = ({ name, n, r, k, P, r1, r2, t1, unknownP, shape }) => {
    if (r1 === r2) return null;
    const jug = unknownP
      ? sen("jug", w => L(`${w.S} borrows an amount, P, from the bank now.`, `${w.S} leen nou 'n bedrag, P, by die bank.`))
      : sen("jug", w => pick([L(`${w.S} borrows ${money(P)} from the bank now.`, `${w.S} leen nou ${money(P)} by die bank.`), L(`${w.S} borrows ${money(P)} from a bank to start a business.`, `${w.S} leen ${money(P)} by 'n bank om 'n besigheid te begin.`)]));
    const rep1 = sen("repay", w => pick([L(`${w.S} pays back ${money(r1)} after ${years(t1)}.`, `${w.S} betaal ${money(r1)} ná ${years(t1)} terug.`), L(`${w.S} repays ${money(r1)} after ${years(t1)}.`, `${w.S} betaal ${money(r1)} terug ná ${years(t1)}.`)]));
    const rep2 = unknownP
      ? sen("repay", w => L(`${w.S} pays back ${money(r2)} after ${years(n)}.`, `${w.S} betaal ${money(r2)} ná ${years(n)} terug.`))
      : sen("repay", w => L(`${w.S} pays back the rest, an amount x, after ${years(n)}.`, `${w.S} betaal die res, 'n bedrag x, ná ${years(n)} terug.`));
    /* honest: with P known, x is what is left of P after r1, grown to T n: positive */
    if (!unknownP && !(grow(P, r, k, t1) > r1)) return null;
    const rate = rateSen(r, k, true);
    const order = [[jug, rep1, rep2, rate], [jug, rate, rep1, rep2], [rate, jug, rep1, rep2]][shape];
    return paragraphCard(pos, { name, loan: true, n, order });
  };
  return rolled(roll, make, { name: "Jason", n: 5, r: 12, k: 12, P: 80000, r1: 25000, r2: 40000, t1: 2, unknownP: false, shape: 0 });
}

/* ③ a saving with a withdrawal (and sometimes one more deposit) */
function jugWithdrawal(pos) {
  const roll = () => {
    const n = randInt(4, 8), d1 = step500(8000, 30000);
    const [tw, td] = shuffled(Array.from({ length: n - 1 }, (_, j) => j + 1)).slice(0, 2);
    return { name: names(), n, r: pick(RATES), k: pick(KS), d1, w: step500(1000, d1 * 0.4), d2: pick([null, step500(2000, 10000)]), tw, td, rateAt: randInt(0, 2), ask: randInt(0, 2) };
  };
  const make = ({ name, n, r, k, d1, w, d2, tw, td, rateAt, ask }) => {
    if (w === d1 || w === d2 || d1 === d2) return null;
    const first = ask === 2;                                          // the jug can open the paragraph too
    const in1 = sen(L("in", "in"), s => L(`${s.S} deposits ${money(d1)} into ${first ? "the" : "a savings"} account now.`, `${s.S} deponeer nou ${money(d1)} in ${first ? "die " : "'n spaar"}rekening.`));
    const out = sen(L("out", "out"), s => pick([L(`${s.S} withdraws ${money(w)} after ${years(tw)}.`, `${s.S} onttrek ${money(w)} ná ${years(tw)}.`), L(`${s.S} takes ${money(w)} out of the account after ${years(tw)}.`, `${s.S} haal ${money(w)} ná ${years(tw)} uit die rekening.`)]));
    const in2 = d2 ? sen(L("in", "in"), s => L(`${s.S} deposits another ${money(d2)} after ${years(td)}.`, `${s.S} deponeer nog ${money(d2)} ná ${years(td)}.`)) : null;
    const coins = [in1, ...[{ t: tw, x: out }, ...(in2 ? [{ t: td, x: in2 }] : [])].sort((a, b) => a.t - b.t).map(c => c.x)];
    const rate = rateSen(r, k, false);
    const jug = sen("jug", s => [
      L(`How much will ${s.s} have in the account after ${years(n)}?`, `Hoeveel sal ${s.s} ná ${years(n)} in die rekening hê?`),
      L(`${s.S} wants to know how much is in the account after ${years(n)}.`, `${s.S} wil weet hoeveel ná ${years(n)} in die rekening is.`),
      L(`${s.S} wants to know how much ${WHO[name].he} will have in a savings account after ${years(n)}.`, `${s.S} wil weet hoeveel ${WHO[name].he} ná ${years(n)} in 'n spaarrekening sal hê.`)][ask]);
    const body = coins.slice();
    body.splice(Math.min(rateAt + 1, body.length), 0, rate);          // the rate after the first deposit, or later
    return paragraphCard(pos, { name, loan: false, n, order: first ? [jug, ...body] : [...body, jug] });
  };
  return rolled(roll, make, { name: "Stephanie", n: 6, r: 8, k: 4, d1: 12000, w: 3000, d2: null, tw: 2, td: 4, rateAt: 0, ask: 0 });
}

/* ④ hire purchase: a down payment straight to the shop (a coin, "down
   payment", never "deposit"), the rest borrowed (the jug), two repayments */
function jugHirePurchase(pos) {
  const roll = () => {
    const n = randInt(2, 5), price = step500(8000, 40000);
    return { name: names(), item: pick(ITEMS), n, r: pick(RATES), k: pick(KS), price, down: step500(price * 0.1, price * 0.25), r1: step500(price * 0.2, price * 0.4), t1: randInt(1, n - 1), statedLoan: pick([true, false]), split: pick([true, false]), rateFirst: pick([true, false, false]) };
  };
  const make = ({ name, item, n, r, k, price, down, r1, t1, statedLoan, split, rateFirst }) => {
    const loan = price - down;
    if (!(down > 0 && loan > 0) || !(grow(loan, r, k, t1) > r1)) return null;      // honest: x, the last repayment, is positive
    const a = /^[aeiou]/i.test(item) ? L("an", "'n") : L("a", "'n");
    const downS = sen(L("down", "down"), s => L(`${s.S} buys ${a} ${item} for ${money(price)} and pays a down payment of ${money(down)} straight to the shop.`, `${s.S} koop ${a} ${item} vir ${money(price)} en betaal 'n aanbetaling van ${money(down)} reguit aan die winkel.`));
    const jug = sen("jug", s => statedLoan ? L(`${s.S} borrows the rest, ${money(loan)}, from the bank.`, `${s.S} leen die res, ${money(loan)}, by die bank.`) : L(`${s.S} borrows the rest of the price from the bank.`, `${s.S} leen die res van die prys by die bank.`));
    const reps = split
      ? [sen("repay", s => L(`${s.S} pays back ${money(r1)} after ${years(t1)}.`, `${s.S} betaal ${money(r1)} ná ${years(t1)} terug.`)), sen("repay", s => L(`${s.S} pays the rest, an amount x, after ${years(n)}.`, `${s.S} betaal die res, 'n bedrag x, ná ${years(n)}.`))]
      : [sen("repay", s => L(`${s.S} pays the loan back with two repayments: ${money(r1)} after ${years(t1)} and an amount x after ${years(n)}.`, `${s.S} betaal die lening terug met twee terugbetalings: ${money(r1)} ná ${years(t1)} en 'n bedrag x ná ${years(n)}.`))];
    const rate = rateSen(r, k, true);
    const order = rateFirst ? [rate, downS, jug, ...reps] : [downS, jug, ...reps, rate];
    return paragraphCard(pos, { name, loan: true, hp: true, n, order });
  };
  return rolled(roll, make, { name: "Brenda", item: L("lounge suite", "sitkamerstel"), n: 3, r: 14, k: 12, price: 18000, down: 3000, r1: 6000, t1: 1, statedLoan: true, split: true, rateFirst: false });
}

/* ⑤ a target amount ("wants to have", the jug, known) with one unknown
   deposit, OR a loan with a repayment on the loan's own day (a payment MAY
   land on the total's day: fine in words). A coin toss per roll. */
function jugTargetOrSameDay(pos) {
  return pick([true, false]) ? jugTarget(pos) : jugSameDay(pos);
}
function jugTarget(pos) {
  const roll = () => {
    const n = randInt(4, 8), T = 5000 * randInt(6, 30);
    return { name: names(), n, r: pick(RATES), k: pick(KS), T, d: step500(T * 0.1, T * 0.35), t2: randInt(1, n - 1), askNow: pick([true, false]), jugFirst: pick([true, true, false]) };
  };
  const make = ({ name, n, r, k, T, d, t2, askNow, jugFirst }) => {
    /* honest: the unknown deposit is positive. askNow: the known deposit is
       at t2 and the question asks for the one now; else the known one is now
       and x comes at t2 */
    const known = askNow ? grow(d, r, k, n - t2) : grow(d, r, k, n);
    if (!(known < T * 0.8)) return null;
    const jug = sen("jug", s => L(`${s.S} wants to have ${money(T)} in a savings account after ${years(n)}.`, `${s.S} wil ${money(T)} ná ${years(n)} in 'n spaarrekening hê.`));
    const rate = rateSen(r, k, false);
    if (askNow) {
      const inK = sen(L("in", "in"), s => L(`${s.S} will also deposit ${money(d)} after ${years(t2)}.`, `${s.S} sal ook ${money(d)} ná ${years(t2)} deponeer.`));
      const ask = sen(L("in", "in"), s => L(`How much must ${s.s} deposit now?`, `Hoeveel moet ${s.s} nou deponeer?`));
      return paragraphCard(pos, { name, loan: false, n, order: [jug, inK, rate, ask] });
    }
    const in1 = sen(L("in", "in"), s => L(`${s.S} deposits ${money(d)} now.`, `${s.S} deponeer nou ${money(d)}.`));
    const inX = sen(L("in", "in"), s => pick([L(`${s.S} deposits an amount x after ${years(t2)}.`, `${s.S} deponeer 'n bedrag x ná ${years(t2)}.`), L(`${s.S} will deposit one more amount, x, after ${years(t2)}.`, `${s.S} sal nog een bedrag, x, ná ${years(t2)} deponeer.`)]));
    return paragraphCard(pos, { name, loan: false, n, order: jugFirst ? [jug, in1, inX, rate] : [in1, inX, rate, jug] });
  };
  return rolled(roll, make, { name: "Mandy", n: 6, r: 9, k: 4, T: 60000, d: 15000, t2: 3, askNow: false, jugFirst: true });
}
function jugSameDay(pos) {
  const roll = () => {
    const n = randInt(3, 7), P = step500(20000, 120000);
    return { name: names(), n, r: pick(RATES), k: pick(KS), P, r0: step500(P * 0.05, P * 0.2), r1: step500(P * 0.15, P * 0.4), t1: randInt(1, n - 1), shape: randInt(0, 1) };
  };
  const make = ({ name, n, r, k, P, r0, r1, t1, shape }) => {
    if (r0 === r1 || !(grow(P - r0, r, k, t1) > r1)) return null;      // honest: x is positive
    const jug = sen("jug", s => L(`${s.S} borrows ${money(P)} from the bank.`, `${s.S} leen ${money(P)} by die bank.`));
    const same = sen("repay", s => pick([L(`${s.S} pays back ${money(r0)} on the same day.`, `${s.S} betaal ${money(r0)} op dieselfde dag terug.`), L(`On the day of the loan ${s.s} pays back ${money(r0)}.`, `Op die dag van die lening betaal ${s.s} ${money(r0)} terug.`)]));
    const rep1 = sen("repay", s => L(`${s.S} pays back ${money(r1)} after ${years(t1)}.`, `${s.S} betaal ${money(r1)} ná ${years(t1)} terug.`));
    const repX = sen("repay", s => L(`${s.S} pays the rest, an amount x, after ${years(n)}.`, `${s.S} betaal die res, 'n bedrag x, ná ${years(n)}.`));
    const rate = rateSen(r, k, true);
    /* "on the same day" right after the loan, so the day it means is plain */
    const order = [[jug, same, rep1, repX, rate], [rate, jug, same, rep1, repX]][shape];
    return paragraphCard(pos, { name, loan: true, n, order });
  };
  return rolled(roll, make, { name: "David", n: 4, r: 11, k: 2, P: 40000, r0: 5000, r1: 12000, t1: 2, shape: 0 });
}

/* ---------- the recall card: "Which of these is the jug?" ----------
   FOUR short phrases, one jug (a state), three coins (actions), each with
   fresh numbers; mc() shuffles, so the jug lands in a different slot */
const someone = () => pick([L("she", "sy"), L("he", "hy")]);
/* S7 (2026-10-17): every draw sits in a const just above its phrase, made
   in the order the phrase used to make it (who, then the amount, then the
   year or T), so the words hold no draw and an L(en, af) twin of a phrase
   draws once for both sides. Same words, same odds, same cards */
const JUGS = {
  has: () => { const who = someone(), v = step500(10000, 90000), y = randInt(3, 8); return L(`${who} has ${money(v)} in the account after ${years(y)}`, `${who} het ${money(v)} ná ${years(y)} in die rekening`); },
  wants: () => { const who = someone(), v = 5000 * randInt(4, 30), y = randInt(3, 8); return L(`${who} wants to have ${money(v)} after ${years(y)}`, `${who} wil ${money(v)} ná ${years(y)} hê`); },
  borrows: () => { const who = someone(), v = 5000 * randInt(4, 30); return L(`${who} borrows ${money(v)}`, `${who} leen ${money(v)}`); },
  owes: () => { const who = someone(), v = step500(10000, 90000); return L(`${who} owes the bank ${money(v)} now`, `${who} skuld die bank nou ${money(v)}`); },
};
const COINS = {
  in: () => { const who = someone(), v = step500(1000, 9000); return { kind: L("in", "in"), text: L(`${who} deposits ${money(v)}`, `${who} deponeer ${money(v)}`) }; },
  out: () => { const who = someone(), v = step500(1000, 9000); return { kind: L("out", "out"), text: L(`${who} withdraws ${money(v)}`, `${who} onttrek ${money(v)}`) }; },
  payAt: () => { const who = someone(), v = step500(2000, 9000), t = randInt(1, 6); return { kind: "repay", text: L(`${who} pays ${money(v)} at T${t}`, `${who} betaal ${money(v)} by T${t}`) }; },
  payBack: () => { const who = someone(), v = step500(2000, 9000), y = randInt(1, 6); return { kind: "repay", text: L(`${who} pays back ${money(v)} after ${years(y)}`, `${who} betaal ${money(v)} ná ${years(y)} terug`) }; },
  down: () => { const who = someone(), v = step500(1000, 6000); return { kind: L("down", "down"), text: L(`${who} pays a down payment of ${money(v)}`, `${who} betaal 'n aanbetaling van ${money(v)}`) }; },
};
const RECALL = {
  recallSaving: { jugs: ["has", "wants"], coins: [L("in", "in"), L("out", "out"), L("payAt", "payAt")] },
  recallLoan: { jugs: ["borrows", "owes"], coins: [L("payBack", "payBack"), L("payAt", "payAt"), L("down", "down"), L("in", "in")] },
  recallMixed: { jugs: ["has", "wants", "borrows", "owes"], coins: [L("in", "in"), L("out", "out"), L("payAt", "payAt"), L("payBack", "payBack"), L("down", "down")] },
};
function recallCard(which) {
  const spec = RECALL[which];
  for (let tries = 0; tries < 50; tries++) {
    const jug = JUGS[pick(spec.jugs)]();
    const coins = shuffled(spec.coins).slice(0, 3).map(c => COINS[c]());
    const labels = [jug, ...coins.map(c => c.text)];
    const amounts = labels.map(l => (l.match(/R\d[\d ]*/) || [""])[0]);
    if (new Set(labels).size !== 4 || new Set(amounts).size !== 4) continue;     // four distinct phrases, four distinct amounts
    const q = mc(TOTAL, L("Which of these is the jug?", "Watter een hiervan is die beker?"), jug, coins.map(c => c.text), {
      hint: JUG_HINT,
      answerLabel: L(`“${jug}” is the jug: the ONE total`, `“${jug}” is die beker: die EEN totaal`),
      solution: [
        { s: jug, r: KIND.jug.sol },
        ...coins.map(c => ({ s: c.text, r: KIND[c.kind].sol })),
        { s: DEFINITION },
      ],
    });
    const byLabel = new Map([[jug, "jug"], ...coins.map(c => [c.text, c.kind])]);
    q.options = q.options.map(o => ({ ...o, note: KIND[byLabel.get(o.label)].note }));
    return q;
  }
  throw new Error("f8 recall: no four distinct phrases in 50 rolls");      // never reached: the banks are wide
}

/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["jugTwoDeposits", jugTwoDeposits],          // card 1 · the discovery slide on top
  ["recallSaving", () => recallCard("recallSaving")],
  ["jugLoan", jugLoan],
  ["jugWithdrawal", jugWithdrawal],
  ["recallLoan", () => recallCard("recallLoan")],
  ["jugHirePurchase", jugHirePurchase],
  ["jugTargetOrSameDay", jugTargetOrSameDay],
  ["recallMixed", () => recallCard("recallMixed")],
];

export const questF8 = {
  id: "f8",
  skills: ROUND.map(([id, make], pos) => ({ id, concept: TOTAL, gen: () => make(pos) })),
};
