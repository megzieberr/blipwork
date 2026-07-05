/* ============================================================
   FINANCE QUEST 1 · Words & formulas
   Theory recall: what the symbols mean, % → i, and which formula
   fits which situation. All multiple-choice; options shuffle.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac } from "../finlib.js";

const CL = "finFormulas";

const SKILLS = {
  symP: () => mc(CL,
    "In <b>A = P(1 + i)ⁿ</b>, what does <b>P</b> stand for?",
    "The starting (principal) amount",
    ["The end amount", "The interest rate", "The number of years"],
    { hint: "P is where the money starts; A is where it ends up.", answerLabel: "P = the principal (starting) amount" }),

  symA: () => mc(CL,
    "In <b>A = P(1 + i)ⁿ</b>, what does <b>A</b> stand for?",
    "The accumulated (end) amount",
    ["The starting amount", "The annual rate", "The number of payments"],
    { hint: "A is the amount you end with after the interest has been added." }),

  pctToFrac: () => {
    const p = pick([6, 7.5, 8, 9.5, 12, 15]);
    const i = toFrac(p);
    return {
      type: "mc", concept: CL,
      prompt: `Written as the value of <b>i</b> used in the formula, ${C(p)}% is…`,
      options: mcNum(i, [p, i * 10, i / 10]),
      answerLabel: `${C(p)}% = ${C(i)}`,
      hint: "Turn a percentage into i by dividing by 100.",
      solution: [{ s: `${C(p)} ÷ 100 = ${C(i)}` }],
    };
  },

  whichSimple: () => mc(CL,
    "Which situation uses <b>simple</b> interest?",
    "A hire-purchase agreement",
    ["Money growing in a savings account", "Inflation on food prices", "A population growing each year"],
    { hint: "Simple interest is the hire-purchase one.", answerLabel: "Hire purchase → simple interest" }),

  whichCompoundScenario: () => mc(CL,
    "Which of these is worked out with <b>compound</b> interest?",
    "Money growing in a savings account",
    ["A hire-purchase agreement", "A once-off deposit paid upfront", "An asset losing the same rand amount each year"],
    { hint: "Savings, inflation and population growth all use compound interest." }),

  pickCompoundFormula: () => mc(CL,
    "Which formula gives the value of a <b>savings</b> account after n years?",
    "A = P(1 + i)ⁿ",
    ["A = P(1 + i·n)", "A = P(1 − i)ⁿ", "A = P(1 − i·n)"],
    { hint: "Savings grow by compound interest.", answerLabel: "A = P(1 + i)ⁿ (compound interest)" }),

  whatN: () => mc(CL,
    "In this chapter, what does <b>n</b> count?",
    "The number of compounding periods",
    ["The number of payments", "The interest rate", "The number of rand"],
    { hint: "n is how many times interest is added over the whole term." }),

  inflationType: () => mc(CL,
    "Inflation is treated as which kind of interest?",
    "Compound interest, compounded yearly",
    ["Simple interest", "Reducing-balance depreciation", "It earns no interest"],
    { hint: "Prices grow on the new price each year — that is compound growth." }),
};

export const questF1 = {
  id: "f1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
