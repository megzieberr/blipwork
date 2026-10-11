/* ============================================================
   FINANCE QUEST 10 · In or out?   ★
   ------------------------------------------------------------
   FINANCE-ROUNDS-2-PLAN.md, round f10 (built 2026-10-10). The SIGN
   round. Since 2026-10-11 (her play-test ruling, 11:29 and 11:35) it
   keeps the TAUGHT form only: the total alone on the left, the
   payments on the right. (The 10 Oct build taught a one-sided form
   first and a step that turned it into this one; that design is parked
   for her 2027 class, after a discovery lesson, in
   briefs/finance-2/ARCHIVE-f10-jug-form-2027.md. Git keeps the code.)

     · Saving: A = deposits with their cars − withdrawals with their cars.
       A deposit goes IN (plus), a withdrawal comes OUT (minus):
         A = 14 000(1 + 0,08/4)^20 − 2 000(1 + 0,08/4)^8
     · A loan: P = the repayments with their cars, every one plus:
         P = 8 000(1 + 0,12/12)^−12 + 9 000(1 + 0,12/12)^−36
     · A down payment never enters the account: no car, no place in the
       equation; it comes off the price (loan = price − down payment).

   THE MEETING DAY is the total's own day, her method (as f13 does it):
   the day of A for saving (every car forward gear, an amount on that
   day has no car), T0 for a loan (every car reverse gear, a negative
   exponent). So the total never has a car: it stands alone. Exponents
   are written worked out, years × k (^36, ^−12), through finlib's pow().

   PICTURES (f9 style): the meeting-day flag, one rate road, leader lines,
   and the total drawn as "?" in its ring with its role letter (A at the
   end, P at T0). The one place the total is a KNOWN number (interestPaid,
   the loan she borrowed) it carries its role letter P. A withdrawal is
   drawn "−R2 000" in the money-out red (timeline spec node out: true).

   UNBREAKABLE TERMS (the f9 review-1 lesson): every TERM of an equation
   is one <span class="nowrap"> unit, its amount's thousands joined by a
   no-break space, so a line may break only between terms. A left side
   that is a single letter rides with the first right-hand term
   ("A = 5 000(…)", f13's rule since its review 1), anything else keeps
   the "=" glued to the term BEFORE it ("9 000 ="), so a broken line never
   starts or ends on "=". The empty slot of a steps card, "☐", is glued to
   its amount the same way. Every money amount goes through money().

   VOCABULARY: "the total" only, "meeting day", "car", "deposit" /
   "withdrawal" / "repayment", "down payment". Never "lump sum",
   "accumulated amount", LHS/RHS, and never the one-sided "… = 0" form or
   its moving step. Pronouns only, no first names. ONE equation, built
   completely; nothing is solved in stages and nothing is rounded mid-way.

   REVIEW 1 (2026-10-10, phone-width check), still in force: a deposit
   stacked on the day of A gets its own leader (timeline stackLeaders);
   the refrain's closing line depends on the kind; the first "car" in a
   solution says what a car is; the exponent is written "3 years × 12
   times a year = 36"; "half‑yearly" has a non-breaking hyphen, and no
   car is ever ^1 (every car moves at least 2 periods).

   A static round deals def.skills IN ORDER, one card per skill, so the
   ROUND list at the bottom IS the round (8 cards). Cards 1 and 2 are
   steps chains of mc only (one step per amount), with no typed number:
   the round is about signs, and the input law allows mc.
   ============================================================ */
import { mc, mcStep, C, rng } from "./_shared.js";
import { randInt, pick, shuffled } from "../ui.js";
import { rand, toFrac, COMPOUNDING, pow } from "../finlib.js";

const CON = "inOrOut";
/* the refrain: its closing line depends on the kind (f10 review 1; the
   taught form since 2026-10-11) */
export const REFRAIN = "Repayments stand plus on the right. The loan is the total, P: it stands alone on the left.";   // a loan
export const REFRAIN_SAVING = "Deposits go IN: plus. Withdrawals come OUT: minus. The total, A, stands alone on the left.";
const refrain = loan => ({ s: loan ? REFRAIN : REFRAIN_SAVING });

const RATES = [6, 7, 8, 9, 10, 11, 12, 14, 15];                       // whole % only
const KS = COMPOUNDING.filter(c => [1, 2, 4, 12].includes(c.k)).map(c => c.k);
const HOW = k => (k === 2 ? "half‑yearly" : COMPOUNDING.find(c => c.k === k).label);   // a non-breaking hyphen (f10 review 1)
const DEP_AMTS = [3000, 4000, 5000, 6000, 8000, 10000, 12000, 14000, 15000, 20000];
const WD_AMTS = [500, 1000, 1500, 2000, 2500, 3000];
const REPAY_AMTS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500, 8000, 9000];
const ITEMS = ["laptop", "motorbike", "fridge", "lounge suite", "TV", "bed"];
const DOWNS = [1000, 1500, 2000, 2500, 3000, 4000, 5000];
/* every amount on a timeline stays at 7 glyphs or fewer ("R20 000",
   "−R3 000") on n ≤ 5, and the one 2-dp loan stays under R10 000 on
   n ≤ 4: neighbouring labels never touch at 360 px */

const NB = " ";                                                 // a LITERAL no-break space in the text (never the entity)
const nw = s => `<span class="nowrap">${s}</span>`;                    // ONE unbreakable unit (f9 review 1)
const SLOT = "☐";                                                     // the sign still to choose (cards 1 and 2)
/* f10 review 1: the first time a solution says "car", it says what one is.
   Never inside brackets: formulaHtml split "(" from "a car is" at 360 px */
const CAR_IS = `a car is the ${nw(pow("(1 + i)", "n"))} bracket that moves an amount to the meeting day`;
/* "3 years × 12 times a year = 36" (never a bare k). A line may break only
   before the "×" (an operator leads its piece) or after the "=" */
const yrs = y => `${y} year${y === 1 ? "" : "s"}`;
const perYear = k => `${k} time${k === 1 ? "" : "s"} a year`;
const carSum = (y, k) => `${yrs(y)} × ${k} = ${y * k}`;              // "2 years × 12 = 24"
const rands = (v, dp = 0) => rand(v, dp).replace(/ /g, NB);            // "R8 000", "R3 587,42"
const money = (v, dp = 0) => nw(rands(v, dp));                         // EVERY money amount in this round
const amt0 = v => rands(v, 0).slice(1);                                // "8 000", as it stands in an equation
const amt2 = v => rands(v, 2).slice(1);                                // "3 587,42"
const pa = r => `${r}%${NB}p.a.`;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const range = (lo, hi) => Array.from({ length: Math.max(0, hi - lo + 1) }, (_, j) => lo + j);
const person = () => pick([{ he: "she", his: "her" }, { he: "he", his: "his" }]);
const andList = xs => (xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const article = w => (/^[aeiou]/i.test(w) ? "an" : "a");
const CAPTION = "T in years";

/* ---------- the one equation: terms, sides, equality ---------- */

/* a term: s = +1 / −1, c = the amount (a number) or "P" / "A" / "x",
   e = the car's exponent (0: no car), plus what it is (kind) and when (t) */
function car(sc, e) {
  if (!e) return "";
  const i = C(toFrac(sc.r)), base = sc.k === 1 ? `(1 + ${i})` : `(1 + ${i}/${sc.k})`;
  return e < 0 ? pow(base, `−${-e}`) : pow(base, e);                     // Fix A: a real superscript
}
const coefText = c => (typeof c === "number" ? amt0(c) : c);
const termText = (sc, t) => coefText(t.c) + car(sc, t.e);
/* a left side that is ONE bare letter (A, or the loan P) rides with the
   first right-hand term: "A = 5 000(…)" (f13 review 1) */
const bareLeft = q => q.L.length === 1 && !q.L[0].e && typeof q.L[0].c === "string" && q.L[0].s > 0;
/* the right side: each term ONE nowrap unit; a leading minus rides inside
   its term, the signs between terms stand alone; glue rides in front of
   the first term. slot (cards 1 and 2): one more term, its sign still a ☐ */
function rightHtml(sc, terms, glue = "", slot = null) {
  const parts = terms.map((t, j) => (j === 0 ? nw(glue + (t.s < 0 ? "−" : "") + termText(sc, t)) : `${t.s < 0 ? "−" : "+"} ${nw(termText(sc, t))}`));
  if (slot) parts.push(nw(`${terms.length ? "" : glue}${SLOT}${NB}${termText(sc, slot)}`));
  return parts.join(" ");
}
/* the whole equation. A bare-letter left rides with the first right-hand
   term; any other left keeps the "=" glued to its LAST term (f10 review 1),
   so a broken line never starts with "=" */
function eqHtml(sc, q, slot = null) {
  if (bareLeft(q)) return rightHtml(sc, q.R, `${q.L[0].c} = `, slot);
  const L = q.L.map((t, j) => ({ lead: j === 0 ? "" : (t.s < 0 ? "−" : "+"), body: (j === 0 && t.s < 0 ? "−" : "") + termText(sc, t) }));
  L[L.length - 1].body += " =";
  return `${L.map(p => (p.lead ? `${p.lead} ${nw(p.body)}` : nw(p.body))).join(" ")} ${rightHtml(sc, q.R, "", slot)}`;
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

/* f10 review 1: every car moves at least 2 periods, so no exponent is ever
   1 or −1 (an amount one period from the meeting day is rolled again) */
const carsOk = sc => sc.pays.every(x => x.t === sc.meet || Math.abs(sc.meet - x.t) * sc.k >= 2);
function reroll(make) {
  for (let tries = 0; tries < 100; tries++) { const sc = make(); if (carsOk(sc)) return sc; }
  const sc = make(); sc.k = 12; return sc;                               // never reached in practice
}

/* a loan: the total P at T0 (unknown), cnt repayments, the last one at Tn
   pays it off; the meeting day is T0, so every repayment drives back in
   reverse gear. hp: bought on credit, with a down payment straight to the
   shop (it never enters the account, so it is never drawn) */
function loanScene({ cnt = 2, hp = false } = {}) {
  return reroll(() => {
    const n = randInt(Math.max(2, cnt), 5), r = pick(RATES), k = pick(KS), p = person();
    const times = [...shuffled(range(1, n - 1)).slice(0, cnt - 1), n].sort((a, b) => a - b);
    const vals = shuffled(REPAY_AMTS).slice(0, cnt);
    const sc = { loan: true, n, meet: 0, r, k, p, pays: times.map((t, j) => ({ t, v: vals[j], kind: "repay" })) };
    if (hp) { sc.item = pick(ITEMS); sc.down = pick(DOWNS.filter(d => !vals.includes(d))); }
    return sc;
  });
}

/* saving: dep deposits and, with wd, ONE withdrawal. The first deposit is
   at T0 or T1; the withdrawal comes strictly after it and strictly before
   the day of A (so it always needs a car), and is smaller than that first
   deposit (there is money to take out). A later deposit may share the day
   of A (no car). The total A is at Tn, the meeting day. */
function saveScene({ dep = 1, wd = true } = {}) {
  return reroll(() => {
    const n = randInt(3, 5), r = pick(RATES), k = pick(KS), p = person();
    const t0 = pick([0, 0, 1]);
    const tw = wd ? randInt(t0 + 1, n - 1) : null;
    const rest = range(t0 + 1, n).filter(t => t !== tw);
    const times = [t0, ...shuffled(rest).slice(0, dep - 1)];
    const deps = shuffled(DEP_AMTS).slice(0, dep);
    const pays = times.map((t, j) => ({ t, v: deps[j], kind: "dep" }));
    if (wd) pays.push({ t: tw, v: pick(WD_AMTS.filter(v => v < deps[0] && !deps.includes(v))), kind: "wd" });
    pays.sort((a, b) => a.t - b.t);
    return { loan: false, n, meet: n, r, k, p, pays };
  });
}

/* every payment drives to the meeting day: exponent (meet − t) × k */
const termOf = (sc, x) => ({ s: x.kind === "wd" ? -1 : 1, c: x.v, e: (sc.meet - x.t) * sc.k, kind: x.kind, t: x.t });
const totalOf = sc => ({ s: 1, c: sc.loan ? "P" : "A", e: 0, kind: "total", t: sc.meet });
/* THE taught form: the total alone on the left, the payments on the right
   (a deposit or a repayment plus, a withdrawal minus), in time order */
const taughtOf = sc => ({ L: [totalOf(sc)], R: sc.pays.map(x => termOf(sc, x)) });

/* the timeline: the total FIRST (the bottom of a shared day's stack, right
   above its letter), the meeting day on the total's day, one road */
function graphOf(sc, { meet = true, total = null } = {}) {
  const tot = total || (sc.loan ? { t: 0, label: "?", role: "P" } : { t: sc.n, label: "?", role: "A" });
  return {
    type: "timeline", n: sc.n, ...(meet ? { meet: sc.meet } : {}),
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
  if (sc.loan && sc.item) return `${cap(p.he)} buys ${article(sc.item)} ${sc.item}. ${cap(p.he)} pays a down payment of ${money(sc.down)} straight to the shop and borrows the rest, the total P, at ${rateText(sc)}. ${cap(p.he)} pays back ${andList(sc.pays.map(at))}, and that pays off the loan.`;
  if (sc.loan) return `${cap(p.he)} borrows the total, P, at ${rateText(sc)}. ${cap(p.he)} pays back ${andList(sc.pays.map(at))}, and that pays off the loan.`;
  const deps = sc.pays.filter(x => x.kind === "dep"), wds = sc.pays.filter(x => x.kind === "wd");
  return `${cap(p.he)} saves at ${rateText(sc)}. ${cap(p.he)} deposits ${andList(deps.map(at))}${wds.length ? `, and withdraws ${andList(wds.map(at))}` : ""}. ${cap(p.his)} savings grow into the total, A, at T${sc.n}.`;
}
const dayOf = sc => (sc.loan ? "the day of the loan" : "the day of A");

/* ---------- the worked solutions ---------- */

const WHAT = { repay: "the repayment", dep: "the deposit", wd: "the withdrawal" };
/* where a car drives: forward to the day of A, or back to T0 */
function carNote(sc, t) {
  if (!t.e) return "no car: it already stands on the meeting day";
  return t.e > 0
    ? `a car from T${t.t} to T${sc.meet}: ${carSum(sc.meet - t.t, sc.k)}`
    : `a car back from T${t.t} to T0: ${carSum(t.t, sc.k)}, written ${nw(`−${-t.e}`)}`;
}
/* one line per payment: what it is, its sign, its car */
function termLine(sc, t) {
  const io = t.kind === "wd" ? "comes OUT, so minus" : t.kind === "repay" ? "stands plus on the right" : "goes IN, so plus";
  return { s: `${cap(WHAT[t.kind])} at T${t.t}, ${money(t.c)}, ${io}: ${nw((t.s < 0 ? "−" : "+") + termText(sc, t))}`, r: carNote(sc, t) };
}
/* the first line of a worked solution: the meeting day, what a car is, and
   the exponent the way the learner sees it, on the longest trip */
function meetLine(sc) {
  if (sc.loan) return {
    s: `The meeting day is T0, the day of the loan, so P stands there alone. Every repayment drives back there in its car, in reverse gear. ${cap(CAR_IS)}.`,
    r: `${yrs(sc.n)} × ${perYear(sc.k)} = ${sc.n * sc.k}, written ${nw(`−${sc.n * sc.k}`)}`,
  };
  const y = sc.n - Math.min(...sc.pays.map(x => x.t));
  return {
    s: `The meeting day is T${sc.n}, the day of A, so A stands there alone. Every amount drives there in its car, in forward gear. ${cap(CAR_IS)}.`,
    r: `${yrs(y)} × ${perYear(sc.k)} = ${y * sc.k}`,
  };
}
const oneLine = (sc, q, r = null) => ({
  s: `The one equation: ${eqHtml(sc, q)}`,
  r: r || (sc.loan ? "the loan, P, alone on the left; the repayments plus on the right" : "the total, A, alone on the left; a deposit plus, a withdrawal minus"),
});
const downLine = sc => ({ s: `The down payment of ${money(sc.down)} never enters the account: it is paid straight to the shop, so it has no place in the equation.`, r: "it comes off the price: loan = price − down payment" });

/* ---------- the skills ---------- */

/* steps, mc only: a saving with 2 or 3 amounts (one withdrawal in about
   half the rolls), ONE step per amount in time order, "+ (in)" or
   "− (out)". Each step shows the taught form so far with this amount's
   sign still a ☐; the answer is the finished equation */
const IN_OPT = "+ (in)", OUT_OPT = "− (out)";
function inOrOutSaving() {
  const wd = rng() < 0.5, cnt = randInt(2, 3);
  const sc = saveScene({ dep: wd ? cnt - 1 : cnt, wd });
  const eq = taughtOf(sc), R = eq.R;
  const steps = R.map((t, j) => mcStep(
    `<b>${at(sc.pays[j])}</b>: in or out?<br>${eqHtml(sc, { L: eq.L, R: R.slice(0, j) }, t)}`,
    t.s > 0 ? IN_OPT : OUT_OPT, [t.s > 0 ? OUT_OPT : IN_OPT],
    "A deposit goes IN: plus. A withdrawal comes OUT: minus. On the timeline a withdrawal is drawn with its minus."));
  return {
    type: "steps", concept: CON,
    prompt: `${story(sc)} The meeting day is T${sc.n}, the day of A. Every amount drives there in its car, and A stands alone on the left. Give each amount its sign.`,
    steps, graph: graphOf(sc), graphCap: CAPTION,
    hint: "A deposit goes IN: plus. A withdrawal comes OUT: minus. The total, A, stands alone on the left.",
    answerLabel: eqHtml(sc, eq),
    solution: [meetLine(sc), ...R.map(t => termLine(sc, t)), oneLine(sc, eq), refrain(false)],
  };
}

/* steps, mc only: a loan with 2 repayments (bought on credit with a down
   payment in some rolls), ONE step per repayment: "+ on the right" (right),
   "− on the right" or "alone on the left". The form shown has P alone on
   the left. A step has one hint, shown on any wrong pick, so it answers
   both wrong options ("alone on the left": that is a coin) */
const PLUS_R = "+ on the right", MINUS_R = "− on the right", ALONE_L = "alone on the left";
function inOrOutLoan() {
  const sc = loanScene({ cnt: 2, hp: rng() < 0.4 });
  const eq = taughtOf(sc), R = eq.R;
  const steps = R.map((t, j) => mcStep(
    `<b>${at(sc.pays[j])}</b>: where does it go?<br>${eqHtml(sc, { L: eq.L, R: R.slice(0, j) }, t)}`,
    PLUS_R, [MINUS_R, ALONE_L],
    "A repayment stands plus on the right, as taught. Alone on the left? That is a coin: only the total stands alone."));
  return {
    type: "steps", concept: CON,
    prompt: `${story(sc)} The meeting day is T0, the day of the loan. Every repayment drives back there in its car, and P stands alone on the left. Where does each repayment go?`,
    steps, graph: graphOf(sc), graphCap: CAPTION,
    hint: "The loan, P, is the total: it stands alone on the left. Every repayment goes plus on the right.",
    answerLabel: eqHtml(sc, eq),
    solution: [meetLine(sc), ...(sc.item ? [downLine(sc)] : []), ...R.map(t => termLine(sc, t)), oneLine(sc, eq), refrain(true)],
  };
}

/* yesno: "Is this equation correct?" in the taught form only, saving and a
   loan in turn. Half the rolls are right; a wrong one has exactly ONE
   slip: the withdrawal's sign flipped (+), or a payment written on the
   total's side with the sign it had on the right (so the equation is
   really wrong, not just rearranged). The answer names the slip.
   The turn counter lives here, so "saving, loan, saving, …" holds across
   rolls; the first turn is rolled */
let ynTurn = null;
function equationYesNo() {
  if (ynTurn == null) ynTurn = rng() < 0.5 ? 0 : 1;
  const loan = ynTurn++ % 2 === 1;
  const sc = loan ? loanScene({ cnt: randInt(2, 3) })
    : rng() < 0.6 ? saveScene({ dep: randInt(1, 2), wd: true }) : saveScene({ dep: randInt(2, 3), wd: false });
  const right = taughtOf(sc), R = right.R, P = right.L[0];
  const He = cap(sc.p.he);
  const ask = shown => `${story(sc)} The meeting day is T${sc.meet}, ${dayOf(sc)}. ${He} writes:<br>${eqHtml(sc, shown)}<br>Is this equation correct?`;
  const hint = "The total stands alone on the left. On the right: a deposit or a repayment plus, a withdrawal minus.";
  if (rng() < 0.5) {
    return {
      type: "yesno", concept: CON, prompt: ask(right), yes: true,
      graph: graphOf(sc), graphCap: CAPTION, hint,
      answerLabel: "Yes: the total alone on the left, and every sign is right",
      solution: [meetLine(sc), ...R.map(t => termLine(sc, t)), oneLine(sc, right), refrain(sc.loan)],
    };
  }
  const w = R.findIndex(t => t.kind === "wd");
  let shown, label, slip;
  if (w >= 0 && rng() < 0.5) {
    const W = R[w];
    shown = { L: right.L, R: R.map((t, j) => (j === w ? { ...t, s: 1 } : t)) };
    label = `No: the withdrawal at T${W.t} needs a minus: it comes OUT`;
    slip = { s: `The slip: ${money(W.c)} at T${W.t} is the withdrawal. It comes OUT, so it needs a minus.`, r: "out is minus" };
  } else {
    const j = randInt(1, R.length - 1), M = R[j];                       // never the first, so the right side starts plus
    shown = { L: [P, M], R: R.filter((_, i) => i !== j) };
    label = `No: ${WHAT[M.kind]} at T${M.t} is written on ${P.c}'s side: only the total stands alone on the left`;
    slip = { s: `The slip: ${money(M.c)} at T${M.t} is ${WHAT[M.kind]}, a payment, but it is written on the left with ${P.c}.`, r: "only the total stands alone on the left" };
  }
  return {
    type: "yesno", concept: CON, prompt: ask(shown), yes: false,
    graph: graphOf(sc), graphCap: CAPTION, hint,
    answerLabel: label,
    solution: [slip, { s: `The right equation: ${eqHtml(sc, right)}`, r: oneLine(sc, right).r }, refrain(sc.loan)],
  };
}

/* mc: saving with ONE withdrawal: A = deposits − withdrawal. Decoys: the
   withdrawal added, its exponent given a minus, its car dropped */
function withdrawal() {
  const sc = saveScene({ dep: randInt(1, 2), wd: true });
  const right = taughtOf(sc);
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
        oneLine(sc, right),
        refrain(false),
      ],
    });
}

/* mc: plain recall, one item per card: where does it go in the one
   equation? (the taught form: the total alone on the left) */
const NOWHERE = "nowhere: it never enters the account";
const WORDS = [
  { what: "A deposit into savings", ans: PLUS_R, loan: false, why: "A deposit is money put into the account. It goes IN: plus on the right." },
  { what: "A withdrawal from savings", ans: MINUS_R, loan: false, why: "A withdrawal is money taken out of the account. It comes OUT: minus on the right." },
  { what: "The total, A, that savings grow into", ans: ALONE_L, loan: false, why: "A is the total. The total stands alone on the left: A = …" },
  { what: "A repayment on a loan", ans: PLUS_R, loan: true, why: "A repayment pays the loan back. In the equation it stands plus on the right: P = …" },
  { what: "The loan itself (the amount borrowed)", ans: ALONE_L, loan: true, why: "The loan is the total, P. The total stands alone on the left: P = …" },
  { what: "A down payment on a fridge bought on hire purchase", ans: NOWHERE, loan: true,
    why: `A down payment is paid straight to the seller. It never enters the account: no car, no place in the equation. ${cap(CAR_IS)}. It comes off the price: loan = price − down payment.` },
];
function inOrOutWord() {
  const w = pick(WORDS);
  return mc(CON,
    `<b>${w.what}</b>: where does it go in the equation?`,      // the item first (f10 review 1)
    w.ans, [PLUS_R, MINUS_R, ALONE_L, NOWHERE].filter(o => o !== w.ans), {
      hint: "The total stands alone on the left. On the right: plus for money in and for a repayment, minus for money out.",
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
  const g = graphOf({ loan: true, n: sc.n, meet: 0, r: sc.r, k: sc.k, pays }, { meet: false, total: { t: 0, amount: loan, dp: 2, role: "P" } });
  return mc(CON,
    `${cap(p.he)} borrowed ${money(loan, 2)} at ${pa(sc.r)} compounded ${HOW(sc.k)}. ${cap(p.he)} paid back ${andList(pays.map(at))}, and that paid off the loan. How much interest did ${p.he} pay?`,
    lab(intC), wrongs, {
      graph: g, graphCap: CAPTION,
      hint: "Interest = what was paid back − what was borrowed.",
      answerLabel: `${lab(intC)} of interest`,
      solution: [
        { s: `Paid back (OUT): ${nw(amt0(sc.vals[0]))} + ${nw(`${amt0(sc.vals[1])} = ${amt0(paidC / 100)}`)}`, r: "the repayments cover the loan AND its interest" },
        { s: `Borrowed (IN): ${nw(amt2(loan))}`, r: "no interest in the loan" },
        { s: `Interest = paid back − borrowed = ${nw(amt0(paidC / 100))} − ${nw(`${amt2(loan)} = ${rands(intC / 100, 2)}`)}` },
        refrain(true),
      ],
    });
}

/* mc: a loan whose story has a down payment and a price. Price = loan +
   down payment, so only the price − the down payment is the total. The
   meeting day is T0, so the KNOWN loan stands alone on the left and every
   repayment drives back, x (the last one, at Tn) too. Decoys: the price
   used as the loan, the down payment written in as a repayment, x written
   minus, x in forward gear */
const PRICES = [8000, 9000, 10000, 12000, 15000, 18000, 20000, 24000];
function hirePurchasePrice() {
  let sc = null;
  for (let tries = 0; tries < 200 && !sc; tries++) {
    const price = pick(PRICES), down = pick(DOWNS.filter(d => d * 4 <= price)), loan = price - down;
    const n = randInt(2, 4), r = pick(RATES), k = pick(KS), p = person();
    const cnt = n >= 3 && rng() < 0.4 ? 2 : 1;
    const times = shuffled(range(1, n - 1)).slice(0, cnt).sort((a, b) => a - b);
    const vals = shuffled(REPAY_AMTS.filter(v => v < loan / 2 && v !== down && v !== loan)).slice(0, cnt);
    const g = 1 + toFrac(r) / k;
    const x = loan * Math.pow(g, n * k) - vals.reduce((s, v, j) => s + v * Math.pow(g, (n - times[j]) * k), 0);
    const cars2 = times.every(t => t * k >= 2);                          // f10 review 1: no car is ever ^−1
    if (vals.length === cnt && x > 500 && cars2) sc = { loan: true, n, meet: 0, r, k, p, price, down, ln: loan, item: pick(ITEMS), pays: times.map((t, j) => ({ t, v: vals[j], kind: "repay" })) };
  }
  sc = sc || { loan: true, n: 3, meet: 0, r: 12, k: 12, p: { he: "he", his: "his" }, price: 15000, down: 3000, ln: 12000, item: "laptop", pays: [{ t: 1, v: 5000, kind: "repay" }] };
  const { p, n } = sc, E = n * sc.k;
  const xT = { s: 1, c: "x", e: -E, kind: "repay", t: n };
  const pays = sc.pays.map(x => termOf(sc, x));
  const right = { L: [{ s: 1, c: sc.ln, e: 0, kind: "total", t: 0 }], R: [...pays, xT] };
  const cands = [
    { L: [{ ...right.L[0], c: sc.price }], R: right.R },                                  // the price used as the loan
    { L: right.L, R: [{ s: 1, c: sc.down, e: 0, kind: "repay", t: 0 }, ...right.R] },    // the down payment written in as a repayment
    { L: right.L, R: [...pays, { ...xT, s: -1 }] },                                       // x written minus
    { L: right.L, R: [...pays, { ...xT, e: E }] },                                        // x in forward gear
  ];
  const wrongs = decoysOf(right, shuffled(cands)).map(d => eqHtml(sc, d));   // any three of the four slips
  return mc(CON,
    `${cap(p.he)} buys ${article(sc.item)} ${sc.item} for ${money(sc.price)}. ${cap(p.he)} pays a down payment of ${money(sc.down)} straight to the shop and borrows the rest at ${rateText(sc)}. ${cap(p.he)} pays back ${andList(sc.pays.map(at))}, and a last repayment, x, at T${n} pays off the loan. The meeting day is T0, the day of the loan. Which equation is right?`,
    eqHtml(sc, right), wrongs, {
      hint: "Price = loan + down payment. Only the loan is the total: it stands alone on the left.",
      solution: [
        { s: `Price = loan + down payment, so the loan = ${nw(amt0(sc.price))} − ${nw(`${amt0(sc.down)} = ${amt0(sc.ln)}`)}`, r: `the down payment never enters the account, so it gets no car; ${CAR_IS}` },
        { s: `The loan is the total. It stands alone on the left, on the meeting day, with no car: ${nw(amt0(sc.ln))}`, r: "the meeting day is T0, the day of the loan" },
        ...pays.map(t => ({ s: `The repayment at T${t.t} stands plus on the right: ${nw(termText(sc, t))}`, r: carNote(sc, t) })),
        { s: `The last repayment, x, stands plus on the right too: ${nw(termText(sc, xT))}`, r: carNote(sc, xT) },
        oneLine(sc, right, `the loan, ${nw(amt0(sc.ln))}, alone on the left; the repayments plus on the right`),
        refrain(true),
      ],
    });
}

/* mc: read the signs off the picture. Saving with 1 or 2 deposits and one
   withdrawal (drawn "−R…"); the prompt names no amount. Decoys: other sign
   patterns on the right (the withdrawal added, a deposit subtracted, all
   flipped) */
function signOnTimeline() {
  const sc = saveScene({ dep: randInt(1, 2), wd: true });
  const right = taughtOf(sc), R = right.R;
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
        oneLine(sc, right),
        refrain(false),
      ],
    });
}

/* ---------- the round, in dealing order ---------- */
const ROUND = [
  ["inOrOutSaving", inOrOutSaving],         // card 1 · steps: each saving amount in (+) or out (−)
  ["inOrOutLoan", inOrOutLoan],             // card 2 · steps: each repayment + on the right
  ["equationYesNo", equationYesNo],         // card 3 · yes/no: the taught form, or ONE slip
  ["withdrawal", withdrawal],               // card 4 · saving with a withdrawal
  ["inOrOutWord", inOrOutWord],             // card 5 · recall: where does it go?
  ["interestPaid", interestPaid],           // card 6 · interest = paid back − borrowed
  ["hirePurchasePrice", hirePurchasePrice], // card 7 · price = loan + down payment
  ["signOnTimeline", signOnTimeline],       // card 8 · read the signs off the picture
];

export const questF10 = {
  id: "f10",
  skills: ROUND.map(([id, gen]) => ({ id, concept: CON, gen })),
};
