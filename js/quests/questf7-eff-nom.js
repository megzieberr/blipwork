/* ============================================================
   FINANCE QUEST 7 · Effective vs nominal rates
   What each rate means, that both are compound, and the structure
   of the conversion formula.
   ============================================================ */
import { mc, C } from "./_shared.js";
import { pick } from "../ui.js";
import { toFrac, effFromNom, COMPOUNDING } from "../finlib.js";

const CL = "effNom";
/* the frequencies worth converting (k > 1) */
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k));

const SKILLS = {
  effectiveAnnual: () => mc(CL,
    "An <b>effective</b> interest rate is always quoted…",
    "annually (per year)",
    ["monthly", "with a compounding frequency", "daily"],
    { hint: "Effective = the true growth over one whole year.", answerLabel: "Effective rates are annual" }),

  nominalFreq: () => mc(CL,
    "A <b>nominal</b> interest rate is quoted…",
    "with a compounding frequency (e.g. monthly)",
    ["always with no time period", "only ever annually", "as a rand amount"],
    { hint: "“18% p.a. compounded monthly” is a nominal rate — it names the frequency." }),

  bothCompound: () => mc(CL,
    "Effective and nominal rates are both types of…",
    "compound interest",
    ["simple interest", "depreciation", "deposits"],
    { hint: "Both describe compound growth, just quoted differently.", answerLabel: "Both are compound interest" }),

  conversionFormula: () => mc(CL,
    "Which formula converts a <b>nominal</b> rate to an <b>effective</b> rate?",
    "1 + i_eff = (1 + i_nom/n)ⁿ",
    ["i_eff = i_nom × n", "1 + i_eff = (1 + i_nom·n)ⁿ", "i_eff = (1 + i_nom)/n"],
    { hint: "Divide the nominal rate by n inside the bracket, raise to the power n.", answerLabel: "1 + i_eff = (1 + i_nom/n)ⁿ" }),

  nMeaning: () => mc(CL,
    "In <b>1 + i_eff = (1 + i_nom/n)ⁿ</b>, what is <b>n</b>?",
    "the number of compounding periods per year",
    ["the number of years", "the principal amount", "the effective rate"],
    { hint: "For monthly compounding n = 12; quarterly n = 4." }),

  whyConvert: () => mc(CL,
    "Why convert rates to their <b>effective</b> form?",
    "To fairly compare rates that compound at different frequencies",
    ["To make the rate bigger", "To turn compound into simple interest", "To avoid using a calculator"],
    { hint: "Two nominal rates with different frequencies can't be compared directly." }),

  whichGrowsMore: () => mc(CL,
    "10% p.a. compounded <b>monthly</b> vs 10% p.a. compounded <b>annually</b> — which has the higher <b>effective</b> rate?",
    "Compounded monthly",
    ["Compounded annually", "They are exactly equal", "It depends on the principal"],
    { hint: "More frequent compounding earns slightly more over a year.", answerLabel: "More frequent compounding → higher effective rate" }),

  effCalc: () => {
    const o = pick(OPTS), nom = pick([8, 10, 12, 18]);
    const eff = effFromNom(toFrac(nom), o.k) * 100;
    const effC = eff.toFixed(2).replace(".", ",");   // always 2 dp, comma decimal
    return {
      type: "calc", concept: CL, dp: 2,
      prompt: `Convert <b>${C(nom)}% p.a. compounded ${o.label}</b> to an <b>effective annual rate</b>. Give your answer as a %, to 2 decimal places.`,
      expected: eff,
      hint: `Use 1 + i_eff = (1 + i_nom/n)ⁿ with n = ${o.k}, then × 100 for a %.`,
      answerLabel: `i_eff ≈ ${effC}%`,
      solution: [
        { s: `1 + i_eff = (1 + ${C(toFrac(nom))}/${o.k})^${o.k}`, r: `n = ${o.k} because interest is added ${o.k} times a year` },
        { s: `i_eff = (1 + ${C(toFrac(nom) / o.k)})^${o.k} − 1` },
        { s: `i_eff ≈ ${effC}%`, r: "× 100 to write it as a percentage" },
      ],
    };
  },
};

export const questF7 = {
  id: "f7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
