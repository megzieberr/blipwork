/* ============================================================
   FINANCE QUEST 6 · Deposits & hire purchase
   The deposit, the amount still owed, and how hire purchase works.
   ============================================================ */
import { mc, mcNum, C, mcStep, calcStep } from "./_shared.js";
import { pick } from "../ui.js";
import { depositAmount, balanceAfterDeposit, simpleAmount, toFrac, rand } from "../finlib.js";
import { L } from "../lang.js";

const CL = "deposits";
const PRICES = [4000, 5000, 6000, 8000, 10000, 12000];
const PCTS = [10, 15, 20, 25];
const money0 = v => rand(v, 0).slice(1);   // "8 000" without the R

const SKILLS = {
  depositAmount: () => {
    const p = pick(PCTS), price = pick(PRICES), dep = depositAmount(toFrac(p), price);
    return {
      type: "calc", concept: CL, dp: 0,
      prompt: L(`A <b>${p}%</b> deposit is paid on an item priced <b>R${money0(price)}</b>. How much is the deposit (in rand)?`, `'n Deposito van <b>${p}%</b> word betaal op 'n item wat <b>R${money0(price)}</b> kos. Hoeveel is die deposito (in rand)?`),
      expected: dep,
      hint: L("Deposit = (% ÷ 100) × price.", "Deposito = (% ÷ 100) × prys."),
      answerLabel: L(`${p}% × R${money0(price)} = R${money0(dep)}`, `${p}% × R${money0(price)} = R${money0(dep)}`),
      solution: [{ s: `${C(toFrac(p))} × ${price} = ${dep}` }],
    };
  },

  amountOwed: () => {
    const p = pick(PCTS), price = pick(PRICES), owed = balanceAfterDeposit(toFrac(p), price);
    return {
      type: "calc", concept: CL, dp: 0,
      prompt: L(`After paying a <b>${p}%</b> deposit on <b>R${money0(price)}</b>, how much is still owed (in rand)?`, `Ná 'n deposito van <b>${p}%</b> op <b>R${money0(price)}</b>, hoeveel is nog uitstaande (in rand)?`),
      expected: owed,
      hint: L("Amount owed = price − deposit = ((100 − %) ÷ 100) × price.", "Uitstaande bedrag = prys − deposito = ((100 − %) ÷ 100) × prys."),
      answerLabel: L(`R${money0(price)} − R${money0(depositAmount(toFrac(p), price))} = R${money0(owed)}`, `R${money0(price)} − R${money0(depositAmount(toFrac(p), price))} = R${money0(owed)}`),
      solution: [
        { s: L(`Deposit = ${C(toFrac(p))} × ${price} = ${depositAmount(toFrac(p), price)}`, `Deposito = ${C(toFrac(p))} × ${price} = ${depositAmount(toFrac(p), price)}`) },
        { s: L(`Still owed = ${price} − ${depositAmount(toFrac(p), price)} = ${owed}`, `Nog uitstaande = ${price} − ${depositAmount(toFrac(p), price)} = ${owed}`) },
      ],
    };
  },

  percentOwed: () => {
    const p = pick(PCTS);
    return {
      type: "mc", concept: CL,
      prompt: L(`A <b>${p}%</b> deposit means the amount still owed is what <b>%</b> of the price?`, `'n Deposito van <b>${p}%</b> beteken die uitstaande bedrag is watter <b>%</b> van die prys?`),
      options: mcNum(100 - p, [p, 100, 100 + p]),
      hint: L("The deposit and the balance must add up to 100%.", "Die deposito en die saldo moet saam 100% wees."),
      answerLabel: `100% − ${p}% = ${100 - p}%`,
      solution: [
        { s: L(`The deposit and the balance together make up the whole price`, `Die deposito en die saldo maak saam die hele prys uit`), r: L("deposit % + balance % = 100%", "deposito % + saldo % = 100%") },
        { s: `100% − ${p}% = ${100 - p}%`, r: L("that is the part still owed", "dit is die deel wat nog uitstaande is") },
      ],
    };
  },

  depositInterest: () => ({
    type: "yesno", concept: CL,
    prompt: L("Does the <b>deposit</b> itself earn interest?", "Verdien die <b>deposito</b> self rente?"),
    yes: false,
    hint: L("A deposit is paid upfront — it is money you no longer owe.", "'n Deposito word vooraf betaal: dit is geld wat jy nie meer skuld nie."),
    answerLabel: L("No — a deposit earns no interest", "Nee: 'n deposito verdien geen rente nie"),
  }),

  interestOnWhat: () => mc(CL,
    L("In a hire-purchase deal, interest is charged on…", "By 'n huurkoopooreenkoms word rente gehef op…"),
    L("the amount still owed after the deposit", "die bedrag wat ná die deposito nog uitstaande is"),
    [L("the full price", "die volle prys"), L("the deposit only", "net die deposito"), L("nothing at all", "glad niks nie")],
    { hint: L("You only pay interest on what you still owe.", "Jy betaal net rente op wat jy nog skuld.") }),

  hpType: () => mc(CL,
    L("Hire purchase uses which type of interest?", "Watter soort rente gebruik huurkoop?"),
    L("Simple interest", "Enkelvoudige rente"),
    [L("Compound interest", "Saamgestelde rente"), L("Reducing-balance", "Verminderde saldo"), L("Effective interest", "Effektiewe rente")],
    { hint: L("Hire purchase is the simple-interest case: A = P(1 + i·n).", "Huurkoop is die geval van enkelvoudige rente: A = P(1 + i·n)."), answerLabel: L("Simple interest", "Enkelvoudige rente") }),

  /* steps, 2026-08-30 audit-day split (Session 2) — prompt, numbers and
     the worked `solution` are unchanged; the solution's own three lines
     became the answered chain. ⚠️ HER FINANCE METHOD RULE: `owed` is
     already exact whole rand by construction (see the comment below), so
     step 1 hands step 3 an unrounded intermediate — no mid-question
     rounding is introduced. tol 0.001 explicit on both calc steps (the
     default 0.015 is a trig allowance and would accept a wrong
     neighbouring rand here). */
  hpTotal: () => {
    const p = pick(PCTS), price = pick(PRICES), r = pick([10, 15, 20]), n = pick([2, 4]);
    /* these combos always give whole rand; round away float noise at source */
    const owed = Math.round(balanceAfterDeposit(toFrac(p), price));
    const A = Math.round(simpleAmount(owed, toFrac(r), n));
    return {
      type: "steps", concept: CL,
      prompt: L(`A fridge costs <b>R${money0(price)}</b>. A <b>${p}%</b> deposit is paid, and the balance is bought on hire purchase at <b>${r}% p.a. simple interest</b> for <b>${n} years</b>. How much is repaid on the balance in total (in rand, deposit not included)?`, `'n Yskas kos <b>R${money0(price)}</b>. 'n Deposito van <b>${p}%</b> word betaal, en die saldo word op huurkoop gekoop teen <b>${r}% p.j. enkelvoudige rente</b> vir <b>${n} jaar</b>. Hoeveel word altesaam op die saldo terugbetaal (in rand, sonder die deposito)?`),
      steps: [
        calcStep(L("First: the balance after the deposit (in rand).", "Eers: die saldo ná die deposito (in rand)."), owed,
          L("Interest is charged on what is still owed — balance = (100 − p)% × price.", "Rente word gehef op wat nog uitstaande is: saldo = (100 − p)% × prys."), { dp: 0, tol: 0.001 }),
        mcStep(L("Hire purchase: which formula applies to that balance?", "Huurkoop: watter formule geld vir daardie saldo?"),
          L("A = P(1 + i·n)", "A = P(1 + i·n)"),
          [L("A = P(1 + i)ⁿ", "A = P(1 + i)ⁿ"), L("A = P(1 − i·n)", "A = P(1 − i·n)"), L("A = P × i × n", "A = P × i × n")],
          L("Hire purchase is the simple-interest case.", "Huurkoop is die geval van enkelvoudige rente.")),
        calcStep(L("The total repaid on the balance (in rand).", "Die totaal wat op die saldo terugbetaal word (in rand)."), A,
          L(`A = ${owed}(1 + ${C(toFrac(r))} × ${n}) — one line on the calculator.`, `A = ${owed}(1 + ${C(toFrac(r))} × ${n}): een reël op die sakrekenaar.`), { dp: 0, tol: 0.001 }),
      ],
      expected: A, dp: 0,
      hint: L(`First find the balance after the deposit, then use A = P(1 + i·n) on that balance.`, `Kry eers die saldo ná die deposito, en gebruik dan A = P(1 + i·n) op daardie saldo.`),
      answerLabel: L(`A = R${money0(owed)}(1 + ${C(toFrac(r))}×${n}) = R${money0(A)}`, `A = R${money0(owed)}(1 + ${C(toFrac(r))}×${n}) = R${money0(A)}`),
      solution: [
        { s: L(`Balance = ${C(toFrac(100 - p))} × ${price} = ${owed}`, `Saldo = ${C(toFrac(100 - p))} × ${price} = ${owed}`), r: L("interest is charged on what is still owed", "rente word gehef op wat nog uitstaande is") },
        { s: L(`A = P(1 + i·n) = ${owed}(1 + ${C(toFrac(r))} × ${n})`, `A = P(1 + i·n) = ${owed}(1 + ${C(toFrac(r))} × ${n})`), r: L("hire purchase → simple interest", "huurkoop → enkelvoudige rente") },
        { s: L(`A = ${owed} × ${C(1 + toFrac(r) * n)} = ${A}`, `A = ${owed} × ${C(1 + toFrac(r) * n)} = ${A}`) },
      ],
    };
  },
};

export const questF6 = {
  id: "f6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
