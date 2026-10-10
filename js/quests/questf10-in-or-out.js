/* ============================================================
   FINANCE QUEST 10 · In or out?   ★
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f10 (built 2026-10-10). The SIGN
   round, taught the way her class is now taught: the JUG form first
   (it is the kids' instinct, and it is right), then the TIDY step.

     · The account is a jug. Money that goes IN is plus: a deposit, and
       the loan itself. Money that comes OUT is minus: a withdrawal, and
       every repayment. A down payment never enters the account at all
       (no car, no sign; it comes off the price).
     · The JUG form: every amount moved to the meeting day and written on
       ONE side. A loan ends empty, so it equals 0:
         P(1 + 0,12/12)^36 − 8 000(1 + 0,12/12)^24 − 9 000 = 0
       Saving ends holding the total, so it equals A:
         14 000(1 + 0,08/4)^20 − 2 000(1 + 0,08/4)^8 = A
     · The TIDY form: move the minuses across, so the payments stand
       positive on the right (a withdrawal keeps its minus):
         P(1 + 0,12/12)^36 = 8 000(1 + 0,12/12)^24 + 9 000

   The meeting day is always the LAST T (the day of A, the day the loan
   is paid off), so every car is forward gear and an amount on that day
   has no car. Exponents are written worked out, years × k (^36), the
   way her worked examples write them.

   PICTURES (f9 style): the meeting-day flag, one rate road, leader lines,
   and the total drawn as "?" in its ring with its role letter (A at the
   end, P at T0). The one place the total is a KNOWN number (interestPaid,
   the loan she borrowed) it carries its role letter P. A withdrawal is
   drawn "−R2 000" in the money-out red (timeline spec node out: true).

   UNBREAKABLE TERMS (the f9 review-1 lesson): every TERM of an equation
   is one <span class="nowrap"> unit, its amount's thousands joined by a
   no-break space, so a line may break only between terms (at " + ",
   " − ", " = "). Every money amount goes through money().

   VOCABULARY: "the total" only, "meeting day", "car", "deposit" /
   "withdrawal" / "repayment", "down payment". Never "lump sum",
   "accumulated amount", LHS/RHS. Pronouns only, no first names.
   ONE equation, built completely; nothing is solved in stages and
   nothing is rounded mid-way.

   REVIEW 1 (2026-10-10, phone-width check). The "=" glues to the term
   BEFORE it, inside that term's unit ("P(…)^36 =", and a lone 0 or A
   rides along: "9 000 = 0", "…^8 = A"), so a broken line never starts
   with "="; in prose an operator glues to the word after it. A deposit
   stacked on the day of A gets its own leader (timeline stackLeaders).
   The refrain's closing line depends on the kind (a loan: payments
   positive on the right; saving: deposits plus, the withdrawal minus, A
   on the left). The first "car" in a solution says what a car is. The
   exponent is written "3 years × 12 times a year = 36". "half‑yearly"
   has a non-breaking hyphen, and no car is ever ^1 (every car moves at
   least 2 periods).

   A static round deals def.skills IN ORDER, one card per skill, so the
   ROUND list at the bottom IS the round (8 cards).
   ============================================================ */
import { mc, C, rng } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac, COMPOUNDING } from "../finlib.js";

const CON = "inOrOut";
/* the refrain: its closing line depends on the kind (f10 review 1) */
const REFRAIN_HEAD = "Deposits and the loan go IN. Withdrawals and repayments come OUT.";
export const REFRAIN = `${REFRAIN_HEAD} Tidy: payments positive on the right.`;                       // a loan
export const REFRAIN_SAVING = `${REFRAIN_HEAD} Tidy: deposits plus, the withdrawal minus, A on the left.`;
const refrain = loan => ({ s: loan ? REFRAIN : REFRAIN_SAVING });

const RATES = [6, 7, 8, 9, 10, 11, 12, 14, 15];                       // whole % only
const KS = COMPOUNDING.filter(c => [1, 2, 4, 12].includes(c.k)).map(c => c.k);
const HOW = k => (k === 2 ? "half‑yearly" : COMPOUNDING.find(c => c.k === k).label);   // a non-breaking hyphen (f10 review 1)
const DEP_AMTS = [3000, 4000, 5000, 6000, 8000, 10000, 12000, 14000, 15000, 20000];
const WD_AMTS = [500, 1000, 1500, 2000, 2500, 3000];
const REPAY_AMTS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500, 8000, 9000];
/* every amount on a timeline stays at 7 glyphs or fewer ("R20 000",
   "−R3 000") on n ≤ 5, and the one 2-dp loan stays under R10 000 on
   n ≤ 4: neighbouring labels never touch at 360 px */

const NB = " ";
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit (f9 review 1)
/* f10 review 1: the first time a solution says "car", it says what one is */
const CAR_IS = `a car is the ${nw("(1 + i)^n")} bracket that moves an amount to the meeting day`;
/* "3 years × 12 times a year = 36" (never a bare k). A line may break only
   before the "×" (an operator leads its piece) or after the "=" */
const yrs = y => `${y} year${y === 1 ? "" : "s"}`;
const perYear = k => `${k} time${k === 1 ? "" : "s"} a year`;
const carSum = (y, k) => `${yrs(y)} × ${k} = ${y * k}`;              // "2 years × 12 = 24"
const rands = (v, dp = 0) => rand(v, dp).replace(/ /g, NB);            // "R8 000", "R3 587,42"
const money = (v, dp = 0) => nw(rands(v, dp));                         // EVERY money amount in this round
const amt0 = v => rands(v, 0).slice(1);                                // "8 000", as it stands in an equation
const amt2 = v => rands(v, 2).slice(1);                                // "3 587,42"
const pa = r => `${r}%${NB}p.a.`;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const range = (lo, hi) => Array.from({ length: Math.max(0, hi - lo + 1) }, (_, j) => lo + j);
const person = () => pick([{ he: "she", his: "her" }, { he: "he", his: "his" }]);
const andList = xs => (xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const CAPTION = "T in years";

/* ---------- the one equation: terms, sides, equality ---------- */

/* a term: s = +1 (in) or −1 (out), c = the amount (a number) or "P" / "A" /
   "x", e = the car's exponent (0: no car), plus what it is (kind) and when (t) */
function car(sc, e) {
  if (!e) return "";
  const i = C(toFrac(sc.r)), base = sc.k === 1 ? `(1 + ${i})` : `(1 + ${i}/${sc.k})`;
  return e < 0 ? `${base}^(−${-e})` : `${base}^${e}`;
}
const coefText = c => (typeof c === "number" ? amt0(c) : c);
const termText = (sc, t) => coefText(t.c) + car(sc, t.e);
/* one side: each term ONE nowrap unit; a leading minus rides inside its
   term, the signs between terms stand alone (a line may break before one) */
const piecesOf = (sc, terms) => terms.map((t, j) => ({ lead: j === 0 ? "" : (t.s < 0 ? "−" : "+"), body: (j === 0 && t.s < 0 ? "−" : "") + termText(sc, t) }));
const piecesHtml = ps => ps.map(p => (p.lead ? `${p.lead} ${nw(p.body)}` : nw(p.body))).join(" ");
/* f10 review 1: the "=" glues to the term BEFORE it ("P(…)^36 =", so a
   broken line never starts with "="); a right side that is a lone 0 or A
   rides along whole ("9 000 = 0", "…^8 = A") */
function eqHtml(sc, q) {
  const L = piecesOf(sc, q.L), R = q.R.length ? piecesOf(sc, q.R) : [{ lead: "", body: "0" }];
  const head = L.slice(0, -1), last = L[L.length - 1];
  if (R.length === 1 && /^(0|A)$/.test(R[0].body)) return piecesHtml([...head, { ...last, body: `${last.body} = ${R[0].body}` }]);
  return `${piecesHtml([...head, { ...last, body: `${last.body} =` }])} ${piecesHtml(R)}`;
}

/* two equations are the SAME equation when left − right holds the same
   signed terms, or all of them negated (both sides swapped or × −1) */
const zeroForm = q => [...q.L.map(t => ({ ...t })), ...q.R.map(t => ({ ...t, s: -t.s }))];
const keyOf = ts => ts.map(t => `${t.s}|${t.c}|${t.e}`).sort().join(";");
const flip = ts => ts.map(t => ({ ...t, s: -t.s }));
const sameEq = (a, b) => { const za = zeroForm(a), zb = zeroForm(b); return keyOf(za) === keyOf(zb) || keyOf(za) === keyOf(flip(zb)); };
/* up to `want` decoys: never the correct equation (by meaning, not by
   string), never two that are the same equation */
function decoysOf(correct, cands, want = 3) {
  const out = [];
  for (const d of cands) {
    if (!d || sameEq(d, correct) || out.some(o => sameEq(o, d))) continue;
    out.push(d);
    if (out.length === want) break;
  }
  return out;
}

/* ---------- the scenes ---------- */

/* a loan: the total P at T0 (unknown), cnt repayments on T1..Tn; the loan is
   paid off at Tn, the meeting day. Half the time the last repayment is ON
   the meeting day (no car). */
/* f10 review 1: every car moves at least 2 periods, so no exponent is ever 1
   (annually, a payment one year before the meeting day is rolled again) */
const carsOk = sc => sc.pays.every(x => x.t === sc.n || (sc.n - x.t) * sc.k >= 2);
function reroll(make) {
  for (let tries = 0; tries < 100; tries++) { const sc = make(); if (carsOk(sc)) return sc; }
  const sc = make(); sc.k = 12; return sc;                               // never reached in practice
}
function loanScene(cnt) {
  return reroll(() => {
    const n = randInt(Math.max(2, cnt), 5), r = pick(RATES), k = pick(KS), p = person();
    const end = rng() < 0.5;
    const pool = shuffled(range(1, end ? n - 1 : n));
    const times = (end ? [n, ...pool.slice(0, cnt - 1)] : pool.slice(0, cnt)).sort((a, b) => a - b);
    const vals = shuffled(REPAY_AMTS).slice(0, cnt);
    return { loan: true, n, r, k, p, pays: times.map((t, j) => ({ t, v: vals[j], kind: "repay" })) };
  });
}

/* saving: dep deposits (1 or 2) and ONE withdrawal. The first deposit is at
   T0 or T1; the withdrawal comes strictly after it and strictly before the
   meeting day (so it always needs a car), and is smaller than that first
   deposit (there is money to take out). A later deposit may share the day
   of A (no car). The total A is at Tn, the meeting day. */
function saveScene(dep) {
  return reroll(() => {
    const n = randInt(3, 5), r = pick(RATES), k = pick(KS), p = person();
    const t0 = pick([0, 0, 1]);
    const tw = randInt(t0 + 1, n - 1);
    const rest = range(t0 + 1, n).filter(t => t !== tw);
    const times = [t0, ...shuffled(rest).slice(0, dep - 1)];
    const deps = shuffled(DEP_AMTS).slice(0, dep);
    const w = pick(WD_AMTS.filter(v => v < deps[0] && !deps.includes(v)));
    const pays = [...times.map((t, j) => ({ t, v: deps[j], kind: "dep" })), { t: tw, v: w, kind: "wd" }];
    pays.sort((a, b) => a.t - b.t);
    return { loan: false, n, r, k, p, pays };
  });
}

const IN_KINDS = new Set(["dep", "loan"]);
const termOf = (sc, x) => ({ s: IN_KINDS.has(x.kind) ? 1 : -1, c: x.v, e: (sc.n - x.t) * sc.k, kind: x.kind, t: x.t });
const loanTerm = sc => ({ s: 1, c: "P", e: sc.n * sc.k, kind: "loan", t: 0 });
const totalA = sc => ({ s: 1, c: "A", e: 0, kind: "total", t: sc.n });

/* the JUG form: everything on one side, = 0 (a loan) or = A (saving) */
const jugOf = sc => (sc.loan
  ? { L: [loanTerm(sc), ...sc.pays.map(x => termOf(sc, x))], R: [] }
  : { L: sc.pays.map(x => termOf(sc, x)), R: [totalA(sc)] });
/* the TIDY form: the total's term alone on the left, the payments on the
   right (a repayment turns positive; a withdrawal keeps its minus) */
const tidyOf = sc => (sc.loan
  ? { L: [loanTerm(sc)], R: sc.pays.map(x => ({ ...termOf(sc, x), s: 1 })) }
  : { L: [totalA(sc)], R: sc.pays.map(x => termOf(sc, x)) });

/* the timeline: the total FIRST (the bottom of a shared day's stack, right
   above its letter), the meeting day on the last T, one road */
function graphOf(sc, { meet = true, total = null } = {}) {
  const tot = total || (sc.loan ? { t: 0, label: "?", role: "P" } : { t: sc.n, label: "?", role: "A" });
  return {
    type: "timeline", n: sc.n, ...(meet ? { meet: sc.n } : {}),
    nodes: [tot, ...sc.pays.map(x => ({ t: x.t, amount: x.v, dp: 0, ...(x.kind === "wd" ? { out: true } : {}) }))],
    roads: [{ from: 0, to: sc.n, rate: `${sc.r}% p.a.`, k: sc.k }],
    leaders: true,
    stackLeaders: true,                 // f10 review 1: a deposit on the day of A reads as an amount, not a flag caption
  };
}

const rateText = sc => `${pa(sc.r)} compounded ${HOW(sc.k)}`;
const at = x => `${money(x.v)} at T${x.t}`;
function story(sc) {
  const { p } = sc;
  if (sc.loan) return `${cap(p.he)} borrows the total, P, at ${rateText(sc)}. ${cap(p.he)} pays back ${andList(sc.pays.map(at))}, and that pays off the loan.`;
  const deps = sc.pays.filter(x => x.kind === "dep"), wds = sc.pays.filter(x => x.kind === "wd");
  return `${cap(p.he)} saves at ${rateText(sc)}. ${cap(p.he)} deposits ${andList(deps.map(at))}, and withdraws ${andList(wds.map(at))}. ${cap(p.his)} savings grow into the total, A, at T${sc.n}.`;
}

/* ---------- the worked solutions ---------- */

const WHAT = { loan: "the loan", repay: "the repayment", dep: "the deposit", wd: "the withdrawal" };
/* one line per term: what it is, in or out, and its car */
function termLine(sc, t) {
  const io = t.s > 0 ? "goes IN, so plus" : "comes OUT, so minus";
  const who = t.kind === "loan" ? "The loan, P," : `${cap(WHAT[t.kind])} at T${t.t}, ${money(t.c)},`;
  return {
    s: `${who} ${io}: ${nw((t.s < 0 ? "−" : "+") + termText(sc, t))}`,
    r: t.e ? `a car from T${t.t} to T${sc.n}: ${carSum(sc.n - t.t, sc.k)}` : "no car: it already stands on the meeting day",
  };
}
/* the first line of a worked solution: the meeting day, what a car is, and
   the exponent the way the learner sees it, on the longest trip (the loan
   from T0, or the first deposit) */
function meetLine(sc) {
  const y = sc.loan ? sc.n : sc.n - Math.min(...sc.pays.filter(x => x.kind === "dep").map(x => x.t));
  return {
    s: `The meeting day is T${sc.n}. Every amount drives there in its car, in forward gear (${CAR_IS}).`,
    r: `${yrs(y)} × ${perYear(sc.k)} = ${y * sc.k}`,
  };
}
const tidyLine = sc => (sc.loan
  ? { s: `Tidy: move the minuses across: ${eqHtml(sc, tidyOf(sc))}`, r: "the payments stand positive on the right" }
  : { s: `Tidy: the total on its own: ${eqHtml(sc, tidyOf(sc))}`, r: "the withdrawal keeps its minus" });
/* the jug form's right side in words (an "=" never stands alone) */
const endLine = sc => (sc.loan
  ? { s: "The loan is paid off, so the jug ends empty: it equals 0." }
  : { s: "The jug ends holding the total: it equals A." });

/* ---------- the skills ---------- */

/* yesno, always YES: the jug form, every sign right (60% a loan, 40% saving) */
function jugCorrect() {
  const sc = rng() < 0.6 ? loanScene(randInt(2, 3)) : saveScene(randInt(1, 2));
  const jug = jugOf(sc);
  return {
    type: "yesno", concept: CON,
    prompt: `${story(sc)} The meeting day is T${sc.n}. ${cap(sc.p.he)} moves every amount there and writes it all on one side:<br>${eqHtml(sc, jug)}<br>Is this equation correct?`,
    yes: true,
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Check every sign. Does the amount go IN (plus) or come OUT (minus)?",
    answerLabel: "Yes: in is plus, out is minus, and every sign is right",
    solution: [meetLine(sc), ...jug.L.map(t => termLine(sc, t)), endLine(sc), tidyLine(sc), refrain(sc.loan)],
  };
}

/* yesno, always NO: the jug form with ONE sign slipped. A loan: a repayment
   added (3 in 4) or the loan subtracted; saving: the withdrawal added or a
   deposit subtracted (half each) */
function jugWrong() {
  const sc = rng() < 0.6 ? loanScene(randInt(2, 3)) : saveScene(randInt(1, 2));
  const jug = jugOf(sc);
  let idx;
  if (sc.loan) idx = rng() < 0.75 ? randInt(1, jug.L.length - 1) : 0;
  else {
    const wd = jug.L.findIndex(t => t.kind === "wd");
    idx = rng() < 0.5 ? wd : pick(jug.L.map((t, j) => j).filter(j => j !== wd));
  }
  const slip = jug.L[idx];
  const shown = { L: jug.L.map((t, j) => (j === idx ? { ...t, s: -t.s } : t)), R: jug.R };
  const need = slip.s > 0 ? "a plus, not a minus" : "a minus, not a plus";
  const who = slip.kind === "loan" ? "P is the loan. It goes IN" : `${money(slip.c)} at T${slip.t} is ${WHAT[slip.kind]}. It ${slip.s > 0 ? "goes IN" : "comes OUT"}`;
  return {
    type: "yesno", concept: CON,
    prompt: `${story(sc)} The meeting day is T${sc.n}. ${cap(sc.p.he)} moves every amount there and writes it all on one side:<br>${eqHtml(sc, shown)}<br>Is this equation correct?`,
    yes: false,
    graph: graphOf(sc), graphCap: CAPTION,
    hint: "Check every sign. Does the amount go IN (plus) or come OUT (minus)?",
    answerLabel: `No: ${slip.kind === "loan" ? "the loan, P," : `${WHAT[slip.kind]} at T${slip.t}`} needs ${need}`,
    solution: [
      { s: `The slip: ${who}, so it needs ${need}.`, r: slip.s > 0 ? "in is plus" : "out is minus" },
      { s: `The right jug form: ${eqHtml(sc, jug)}`, r: sc.loan ? "the loan is paid off: it equals 0" : "the jug ends holding the total: it equals A" },
      tidyLine(sc),
      refrain(sc.loan),
    ],
  };
}

/* mc: tidy the jug form of a loan. Decoys: a minus kept on every moved
   term, one term moved without changing its sign, a car dropped */
function tidy() {
  const sc = loanScene(2);
  const jug = jugOf(sc), right = tidyOf(sc);
  const R = right.R;
  const one = randInt(0, R.length - 1);
  const withCar = R.map((t, j) => j).filter(j => R[j].e);
  const drop = withCar.length ? pick(withCar) : null;
  const cands = [
    { L: right.L, R: R.map(t => ({ ...t, s: -1 })) },                                   // every minus kept
    { L: right.L, R: R.map((t, j) => (j === one ? { ...t, s: -1 } : t)) },              // one moved without its sign changing
    drop == null ? null : { L: right.L, R: R.map((t, j) => (j === drop ? { ...t, e: 0 } : t)) },   // a repayment's car dropped
    { L: [{ ...right.L[0], e: 0 }], R },                                                 // the loan's car dropped
    { L: right.L, R: R.map((t, j) => (j === 1 - one ? { ...t, s: -1 } : t)) },          // the other one kept its minus
  ];
  const wrongs = decoysOf(right, cands).map(d => eqHtml(sc, d));
  return mc(CON,
    `${story(sc)} The meeting day is T${sc.n}. The jug form:<br>${eqHtml(sc, jug)}<br>Tidy it: move the minuses across. Which line is the tidy form?`,
    eqHtml(sc, right), wrongs, {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: "A minus that crosses the equals sign turns into a plus. Every car stays where it is.",
      solution: [
        { s: `The jug form: ${eqHtml(sc, jug)}`, r: "the loan in (plus), the repayments out (minus)" },
        ...R.map((t, j) => ({ s: `${cap(WHAT[t.kind])} at T${t.t} crosses the equals sign: ${nw("−" + termText(sc, t))} becomes ${nw("+" + termText(sc, t))}`,
          r: (t.e ? "its car stays" : "no car: it stands on the meeting day") + (j === 0 ? ` (${CAR_IS})` : "") })),
        { s: `Tidy: ${eqHtml(sc, right)}`, r: "the payments stand positive on the right" },
        refrain(true),
      ],
    });
}

/* mc: saving with ONE withdrawal: A = deposits − withdrawal. Decoys: the
   withdrawal added, its exponent given a minus, its car dropped */
function withdrawal() {
  const sc = saveScene(randInt(1, 2));
  const right = tidyOf(sc);
  const w = right.R.findIndex(t => t.kind === "wd");
  const dep = right.R.findIndex(t => t.kind === "dep");
  const swap = f => ({ L: right.L, R: right.R.map((t, j) => (j === w ? f(t) : t)) });
  const cands = [
    swap(t => ({ ...t, s: 1 })),                                                         // the withdrawal added
    swap(t => ({ ...t, e: -t.e })),                                                      // reverse gear by mistake
    swap(t => ({ ...t, e: 0 })),                                                         // no car on the withdrawal
    { L: right.L, R: right.R.map((t, j) => (j === dep ? { ...t, s: -1 } : t)) },         // a deposit subtracted
  ];
  const wrongs = decoysOf(right, cands).map(d => eqHtml(sc, d));
  const W = right.R[w];
  return mc(CON,
    `${story(sc)} The meeting day is T${sc.n}, the day of A. Which equation gives A?`,
    eqHtml(sc, right), wrongs, {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: "A deposit goes IN (plus), a withdrawal comes OUT (minus). Each one drives to the meeting day in forward gear.",
      solution: [
        meetLine(sc),
        ...right.R.map(t => termLine(sc, t)),
        { s: `The withdrawal needs a car too: the ${money(W.c)} left the account at T${W.t}, so the interest it would have earned is gone as well.`, r: `forward gear, exponent ${W.e}` },
        { s: `The one equation: ${eqHtml(sc, right)}`, r: "the withdrawal keeps its minus" },
        refrain(false),
      ],
    });
}

/* mc: plain recall, one item per card */
const IN = "In: plus", OUT = "Out: minus", NEVER = "Neither: it never enters the account";
const WORDS = [
  { what: "A repayment on a loan", ans: OUT, loan: true, why: "A repayment pays the loan back. It comes OUT of the account: minus." },
  { what: "A deposit into savings", ans: IN, loan: false, why: "A deposit is money put into the account. It goes IN: plus." },
  { what: "A withdrawal from savings", ans: OUT, loan: false, why: "A withdrawal is money taken out of the account. It comes OUT: minus." },
  { what: "The loan itself (the amount borrowed)", ans: IN, loan: true, why: "The bank pays the loan into the account. It goes IN: plus." },
  { what: "A down payment on a fridge bought on hire purchase", ans: NEVER, loan: true,
    why: `A down payment is paid straight to the seller. It never enters the account: no car, no sign (${CAR_IS}). It comes off the price: loan = price − down payment.` },
];
function inOrOutWord() {
  const w = pick(WORDS);
  return mc(CON,
    `<b>${w.what}</b>: in or out?`,                                   // the item first (f10 review 1)
    w.ans, [IN, OUT, NEVER].filter(o => o !== w.ans), {
      hint: "Does the money go into the account, come out of it, or never touch it?",
      answerLabel: w.ans,
      solution: [{ s: w.why }, refrain(w.loan)],
    });
}

/* mc (money options): the interest on a loan = what was paid back − what
   was borrowed. The loan is the repayments moved back to T0 at the stated
   rate, to the cent, so the story is true and the answer is 2 dp. Decoys:
   the loan minus the payments (a negative), one payment minus the loan,
   the sum of the payments */
const FIX_INTEREST = () => ({ n: 3, r: 12, k: 12, p: { he: "she", his: "her" }, times: [1, 3], vals: [2300, 4200] });
function interestPaid() {
  let sc = null;
  for (let tries = 0; tries < 200 && !sc; tries++) {
    const n = randInt(2, 4), times = shuffled(range(1, n)).slice(0, 2).sort((a, b) => a - b);
    const c = { n, r: pick(RATES), k: pick(KS), p: person(), times, vals: shuffled(REPAY_AMTS).slice(0, 2) };
    const pv = c.vals.reduce((s, v, j) => s + v * Math.pow(1 + toFrac(c.r) / c.k, -c.times[j] * c.k), 0);
    const loanC = Math.round(pv * 100);
    if (loanC % 100 !== 0 && loanC < 1000000) sc = c;                    // cents in it, under R10 000
  }
  sc = sc || FIX_INTEREST();
  const pv = sc.vals.reduce((s, v, j) => s + v * Math.pow(1 + toFrac(sc.r) / sc.k, -sc.times[j] * sc.k), 0);
  const loanC = Math.round(pv * 100), paidC = (sc.vals[0] + sc.vals[1]) * 100, intC = paidC - loanC;
  const lab = cents => nw((cents < 0 ? "−" : "") + rands(Math.abs(cents) / 100, 2));
  const oneMinus = Math.max(...sc.vals) * 100 - loanC;                   // one payment minus the loan (only when positive)
  const pool = [-intC, oneMinus > 0 ? oneMinus : null, paidC, loanC, paidC + loanC].filter(v => v != null && v !== intC);
  const seen = new Set([intC]), wrongs = [];
  pool.forEach(v => { if (!seen.has(v) && wrongs.length < 3) { seen.add(v); wrongs.push(lab(v)); } });
  const loan = loanC / 100, { p } = sc;
  const pays = sc.vals.map((v, j) => ({ t: sc.times[j], v, kind: "repay" }));
  const g = graphOf({ loan: true, n: sc.n, r: sc.r, k: sc.k, pays }, { meet: false, total: { t: 0, amount: loan, dp: 2, role: "P" } });
  return mc(CON,
    `${cap(p.he)} borrowed ${money(loan, 2)} at ${pa(sc.r)} compounded ${HOW(sc.k)}. ${cap(p.he)} paid back ${andList(pays.map(at))}, and that paid off the loan. How much interest did ${p.he} pay?`,
    lab(intC), wrongs, {
      graph: g, graphCap: CAPTION,
      hint: "Interest = what was paid back − what was borrowed.",
      answerLabel: `${lab(intC)} of interest`,
      solution: [
        { s: `Paid back (OUT): ${nw(amt0(sc.vals[0]))} + ${nw(`${amt0(sc.vals[1])} = ${amt0(paidC / 100)}`)}`, r: "the repayments cover the loan AND its interest" },
        { s: `Borrowed (IN): ${nw(amt2(loan))}`, r: "no interest in the loan" },
        { s: `Interest = paid back − borrowed = ${nw(amt0(paidC / 100))} − ${nw(`${amt2(loan)} = ${rands(intC / 100, 2)}`)}` },
        refrain(true),
      ],
    });
}

/* mc: tidy a loan whose story has a down payment. Price = loan + down
   payment, so only the price − the down payment goes into the account.
   x is the last repayment, on the meeting day. Decoys: the price used as
   the loan, the down payment put into the account as a repayment, x
   kept as a minus */
const ITEMS = ["laptop", "motorbike", "fridge", "lounge suite", "TV", "bed"];
const PRICES = [8000, 9000, 10000, 12000, 15000, 18000, 20000, 24000];
const DOWNS = [1000, 1500, 2000, 2500, 3000, 4000, 5000];
function tidyLoan() {
  let sc = null;
  for (let tries = 0; tries < 200 && !sc; tries++) {
    const price = pick(PRICES), down = pick(DOWNS.filter(d => d * 4 <= price)), loan = price - down;
    const n = randInt(2, 4), r = pick(RATES), k = pick(KS), p = person();
    const cnt = n >= 3 && rng() < 0.4 ? 2 : 1;
    const times = shuffled(range(1, n - 1)).slice(0, cnt).sort((a, b) => a - b);
    const vals = shuffled(REPAY_AMTS.filter(v => v < loan / 2 && v !== down && v !== loan)).slice(0, cnt);
    const g = 1 + toFrac(r) / k;
    const x = loan * Math.pow(g, n * k) - vals.reduce((s, v, j) => s + v * Math.pow(g, (n - times[j]) * k), 0);
    const cars2 = times.every(t => (n - t) * k >= 2);                    // f10 review 1: no car is ever ^1
    if (vals.length === cnt && x > 500 && cars2) sc = { loan: true, n, r, k, p, price, down, ln: loan, item: pick(ITEMS), pays: times.map((t, j) => ({ t, v: vals[j], kind: "repay" })) };
  }
  sc = sc || { loan: true, n: 3, r: 12, k: 12, p: { he: "he", his: "his" }, price: 15000, down: 3000, ln: 12000, item: "laptop", pays: [{ t: 1, v: 5000, kind: "repay" }] };
  const { p, n } = sc, E = n * sc.k;
  const xT = { s: 1, c: "x", e: 0, kind: "repay", t: n };
  const pays = sc.pays.map(x => ({ ...termOf(sc, x), s: 1 }));
  const right = { L: [{ s: 1, c: sc.ln, e: E, kind: "loan", t: 0 }], R: [...pays, xT] };
  const cands = [
    { L: [{ s: 1, c: sc.price, e: E, kind: "loan", t: 0 }], R: right.R },                // the price used as the loan
    { L: right.L, R: [{ s: 1, c: sc.down, e: E, kind: "repay", t: 0 }, ...right.R] },    // the down payment put into the account
    { L: right.L, R: [...pays, { ...xT, s: -1 }] },                                       // x kept as a minus
    { L: [{ ...right.L[0], e: 0 }], R: right.R },                                         // the loan's car dropped
  ];
  const wrongs = decoysOf(right, cands).map(d => eqHtml(sc, d));
  const a = /^[aeiou]/i.test(sc.item) ? "an" : "a";
  return mc(CON,
    `${cap(p.he)} buys ${a} ${sc.item} for ${money(sc.price)}. ${cap(p.he)} pays a down payment of ${money(sc.down)} straight to the shop and borrows the rest at ${rateText(sc)}. ${cap(p.he)} pays back ${andList(sc.pays.map(at))}, and a last repayment, x, at T${n} pays off the loan. The meeting day is T${n}. Which line is the tidy form?`,
    eqHtml(sc, right), wrongs, {
      hint: "Price = loan + down payment. Only the loan goes into the account.",
      solution: [
        { s: `Price = loan + down payment, so the loan = ${nw(amt0(sc.price))} − ${nw(`${amt0(sc.down)} = ${amt0(sc.ln)}`)}`, r: `the down payment never enters the account: no car, no sign (${CAR_IS})` },
        { s: `The loan goes IN: ${nw(termText(sc, right.L[0]))}`, r: `a car from T0 to T${n}: ${carSum(n, sc.k)}` },
        ...pays.map(t => ({ s: `The repayment at T${t.t} comes OUT: ${nw(termText(sc, t))}`, r: `a car from T${t.t} to T${n}: ${carSum(n - t.t, sc.k)}` })),
        { s: "The last repayment, x, comes OUT too, on the meeting day", r: "no car" },
        { s: `Tidy: ${eqHtml(sc, right)}`, r: "the payments stand positive on the right" },
        refrain(true),
      ],
    });
}

/* mc: read the signs off the picture. Saving with 1 or 2 deposits and one
   withdrawal (drawn "−R…"); the prompt names no amount. Decoys: other sign
   patterns on the right (the withdrawal added, a deposit subtracted, all
   flipped) */
function signOnTimeline() {
  const sc = saveScene(randInt(1, 2));
  const right = tidyOf(sc), R = right.R;
  const w = R.findIndex(t => t.kind === "wd"), deps = R.map((t, j) => j).filter(j => j !== w);
  const signs = f => ({ L: right.L, R: R.map((t, j) => ({ ...t, s: f(j, t) })) });
  const d1 = pick(deps);
  const cands = [
    signs(() => 1),                                                    // the withdrawal added
    signs((j, t) => (j === d1 ? -1 : t.s)),                            // a deposit subtracted
    signs((j, t) => -t.s),                                             // every sign flipped
    signs((j, t) => (j === d1 ? -1 : j === w ? 1 : t.s)),              // a deposit and the withdrawal swapped
    ...deps.map(d => signs((j, t) => (j === d ? -1 : 1))),
  ];
  const wrongs = decoysOf(right, cands).map(d => eqHtml(sc, d));
  const { p } = sc;
  return mc(CON,
    `${cap(p.he)} saves at ${rateText(sc)}. On the timeline a plain amount is a deposit and an amount marked with a minus is a withdrawal. ${cap(p.his)} savings grow into the total, A, at T${sc.n}, the meeting day. Which equation matches the picture?`,
    eqHtml(sc, right), wrongs, {
      graph: graphOf(sc), graphCap: CAPTION,
      hint: "A plain amount is a deposit: plus. The amount marked − is a withdrawal: minus.",
      solution: [
        meetLine(sc),
        ...R.map(t => termLine(sc, t)),
        { s: `The one equation: ${eqHtml(sc, right)}`, r: "the total on its own on the left" },
        refrain(false),
      ],
    });
}

/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["jugCorrect", jugCorrect],           // card 1 · yes: the jug form is right
  ["jugWrong", jugWrong],               // card 2 · no: one sign slipped
  ["tidy", tidy],                       // card 3 · move the minuses across
  ["withdrawal", withdrawal],           // card 4 · saving with a withdrawal
  ["inOrOutWord", inOrOutWord],         // card 5 · recall: in, out, or neither
  ["interestPaid", interestPaid],       // card 6 · interest = paid back − borrowed
  ["tidyLoan", tidyLoan],               // card 7 · price = loan + down payment
  ["signOnTimeline", signOnTimeline],   // card 8 · read the signs off the picture
];

export const questF10 = {
  id: "f10",
  skills: ROUND.map(([id, gen]) => ({ id, concept: CON, gen })),
};
