/* ============================================================
   FINANCE QUEST 6 · Deposits & hire purchase
   The deposit, the amount still owed, and how hire purchase works.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { pick } from "../ui.js";
import { depositAmount, balanceAfterDeposit, toFrac, rand } from "../finlib.js";

const CL = "deposits";
const PRICES = [4000, 5000, 6000, 8000, 10000, 12000];
const PCTS = [10, 15, 20, 25];
const money0 = v => rand(v, 0).slice(1);   // "8 000" without the R

const SKILLS = {
  depositAmount: () => {
    const p = pick(PCTS), price = pick(PRICES), dep = depositAmount(toFrac(p), price);
    return {
      type: "calc", concept: CL, dp: 0,
      prompt: `A <b>${p}%</b> deposit is paid on an item priced <b>R${money0(price)}</b>. How much is the deposit (in rand)?`,
      expected: dep,
      hint: "Deposit = (% ÷ 100) × price.",
      answerLabel: `${p}% × R${money0(price)} = R${money0(dep)}`,
      solution: [{ s: `${C(toFrac(p))} × ${price} = ${dep}` }],
    };
  },

  amountOwed: () => {
    const p = pick(PCTS), price = pick(PRICES), owed = balanceAfterDeposit(toFrac(p), price);
    return {
      type: "calc", concept: CL, dp: 0,
      prompt: `After paying a <b>${p}%</b> deposit on <b>R${money0(price)}</b>, how much is still owed (in rand)?`,
      expected: owed,
      hint: "Amount owed = price − deposit = ((100 − %) ÷ 100) × price.",
      answerLabel: `R${money0(price)} − R${money0(depositAmount(toFrac(p), price))} = R${money0(owed)}`,
    };
  },

  percentOwed: () => {
    const p = pick(PCTS);
    return {
      type: "mc", concept: CL,
      prompt: `A <b>${p}%</b> deposit means the amount still owed is what <b>%</b> of the price?`,
      options: mcNum(100 - p, [p, 100, 100 + p]),
      hint: "The deposit and the balance must add up to 100%.",
      answerLabel: `100% − ${p}% = ${100 - p}%`,
    };
  },

  depositInterest: () => ({
    type: "yesno", concept: CL,
    prompt: "Does the <b>deposit</b> itself earn interest?",
    yes: false,
    hint: "A deposit is paid upfront — it is money you no longer owe.",
    answerLabel: "No — a deposit earns no interest",
  }),

  interestOnWhat: () => mc(CL,
    "In a hire-purchase deal, interest is charged on…",
    "the amount still owed after the deposit",
    ["the full price", "the deposit only", "nothing at all"],
    { hint: "You only pay interest on what you still owe." }),

  hpType: () => mc(CL,
    "Hire purchase uses which type of interest?",
    "Simple interest",
    ["Compound interest", "Reducing-balance", "Effective interest"],
    { hint: "Hire purchase is the simple-interest case: A = P(1 + i·n).", answerLabel: "Simple interest" }),
};

export const questF6 = {
  id: "f6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
