/* ============================================================
   FINANCE QUEST 2 · Simple, compound & depreciation
   The conceptual differences (interest on the original vs the
   growing balance) and the two depreciation methods + graph shapes.
   ============================================================ */
import { mc } from "./_shared.js";

const SIM = "simpleCompound";
const DEP = "depreciation";

const SKILLS = {
  simpleBase: () => mc(SIM,
    "<b>Simple</b> interest is calculated on…",
    "the original amount P only",
    ["the growing balance each period", "the interest earned so far", "the final amount A"],
    { hint: "Simple interest uses the same P every period, so the interest never changes.", answerLabel: "Simple interest is on the original P only" }),

  compoundBase: () => mc(SIM,
    "<b>Compound</b> interest is calculated on…",
    "the growing balance each period",
    ["the original P only", "the deposit only", "the number of years"],
    { hint: "Compound interest earns “interest on interest”." }),

  growsFaster: () => mc(SIM,
    "On the same P and rate over many years, which earns <b>more</b>?",
    "Compound interest",
    ["Simple interest", "They are always exactly equal", "Whichever has the larger n only"],
    { hint: "Earning interest on interest pulls ahead over time.", answerLabel: "Compound interest grows faster" }),

  reducingWhich: () => mc(DEP,
    "A car loses <b>15% of its current value</b> each year. Which method is this?",
    "Reducing-balance:  A = P(1 − i)ⁿ",
    ["Linear:  A = P(1 − i·n)", "Compound growth:  A = P(1 + i)ⁿ", "Simple interest:  A = P(1 + i·n)"],
    { hint: "“Percentage of its current value” → reducing-balance." }),

  linearWhich: () => mc(DEP,
    "An asset loses the <b>same rand amount</b> every year. Which method is this?",
    "Linear (straight-line):  A = P(1 − i·n)",
    ["Reducing-balance:  A = P(1 − i)ⁿ", "Compound growth", "Effective interest"],
    { hint: "Equal rand amounts each year → a straight line → linear method." }),

  reducingGraph: () => mc(DEP,
    "On a value-vs-time graph, <b>reducing-balance</b> depreciation looks like…",
    "a curve that drops steeply, then flattens",
    ["a straight line sloping down", "a straight line sloping up", "an S-shaped curve that rises"],
    { hint: "Losing a % of a shrinking value means smaller drops each year — a flattening curve." }),

  linearGraph: () => mc(DEP,
    "On a value-vs-time graph, <b>linear</b> depreciation looks like…",
    "a straight line sloping down",
    ["a curve that flattens out", "a horizontal line", "a rising curve"],
    { hint: "The same drop every year plots as a straight line." }),

  depMeaning: () => mc(DEP,
    "Depreciation means…",
    "something loses value over time",
    ["something gains value over time", "interest is added twice a year", "a deposit is paid upfront"],
    { hint: "Cars, phones and machines depreciate — they are worth less as time passes." }),
};

export const questF2 = {
  id: "f2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("reducing") || id.startsWith("linear") || id.startsWith("dep") ? DEP : SIM, gen })),
};
