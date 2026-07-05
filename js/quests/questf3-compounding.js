/* ============================================================
   FINANCE QUEST 3 · Compounding periods
   Setting up i/k and n·k for half-yearly, quarterly, monthly, …
   Theory/setup only — not a full solve.
   ============================================================ */
import { mc, mcNum, C } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { toFrac, COMPOUNDING } from "../finlib.js";

const CL = "compounding";
/* the meaningful (k>1) options for rate/exponent setup */
const OPTS = COMPOUNDING.filter(c => [2, 4, 12].includes(c.k));

const SKILLS = {
  timesPerYear: () => {
    const o = pick(COMPOUNDING.filter(c => c.k <= 12));
    return {
      type: "mc", concept: CL,
      prompt: `How many times a year is interest added when it is compounded <b>${o.label}</b>?`,
      options: mcNum(o.k, [o.k === 12 ? 6 : 12, o.k === 1 ? 2 : 1, o.k * 2, o.k + 3]),
      answerLabel: `${o.label} → ${o.k} time${o.k > 1 ? "s" : ""} a year`,
      hint: "Annually 1, half-yearly 2, quarterly 4, monthly 12.",
    };
  },

  ratePerPeriod: () => {
    const o = pick(OPTS), annual = pick([6, 9, 12, 18, 15]);   // all divide exactly by 2, 4 and 12 — no rounded rate labels
    const i = toFrac(annual) / o.k;
    return {
      type: "mc", concept: CL,
      prompt: `${C(annual)}% p.a. compounded <b>${o.label}</b>. What is the rate <b>per period</b> (i)?`,
      options: mcNum(i, [toFrac(annual), toFrac(annual) * o.k, toFrac(annual) / (o.k === 12 ? 4 : 12)]),
      answerLabel: `i = ${C(annual)}% ÷ ${o.k} = ${C(i)}`,
      hint: "Divide the annual rate (as a fraction) by the number of times per year.",
      solution: [{ s: `${C(toFrac(annual))} ÷ ${o.k} = ${C(i)}` }],
    };
  },

  exponent: () => {
    const o = pick(OPTS), years = randInt(2, 6);
    const e = years * o.k;
    return {
      type: "mc", concept: CL,
      prompt: `Compounded <b>${o.label}</b> for <b>${years} years</b>. What is the exponent (power)?`,
      options: mcNum(e, [years, o.k, years + o.k, e + 1, e * 2]),   // backstops: when years = k, the first two collide AND years+k = years×k = e
      answerLabel: `${years} × ${o.k} = ${e}`,
      hint: "Exponent = years × times-per-year.",
      solution: [{ s: `${years} years × ${o.k} per year = ${e}` }],
    };
  },

  fullSetup: () => {
    const o = pick(OPTS), annual = pick([8, 12, 18]), years = randInt(2, 5), P = pick([5000, 8000, 10000]);
    const i = C(toFrac(annual)), e = years * o.k;
    return mc(CL,
      `Choose the correct setup for <b>R${P.toLocaleString("en-ZA").replace(/,/g, " ")}</b> at ${C(annual)}% p.a. compounded <b>${o.label}</b> for ${years} years.`,
      `${P}(1 + ${i}/${o.k})^(${years}×${o.k})`,
      [`${P}(1 + ${i})^${years}`, `${P}(1 + ${i}×${o.k})^${years}`, `${P}(1 + ${i}/${years})^(${o.k})`],
      { hint: "Divide the rate by k inside the bracket; multiply years by k in the power.", answerLabel: `${P}(1 + ${i}/${o.k})^(${years}×${o.k})` });
  },

  monthlyRate: () => {
    const annual = pick([12, 18, 24, 9, 15]);
    const i = toFrac(annual) / 12;
    return {
      type: "mc", concept: CL,
      prompt: `${C(annual)}% p.a. compounded <b>monthly</b>. What is i per month?`,
      options: mcNum(i, [toFrac(annual), toFrac(annual) / 4, toFrac(annual) * 12]),
      answerLabel: `${C(annual)}% ÷ 12 = ${C(i)}`,
      hint: "Monthly means 12 times a year, so divide by 12.",
    };
  },

  whyDivide: () => mc(CL,
    "Why do we divide the annual rate by 12 for <b>monthly</b> compounding?",
    "Because interest is added 12 times a year, each time a twelfth of the annual rate",
    ["Because there are 12 months in the question", "Because 12 is the number of years", "Because the rate must always be a whole number"],
    { hint: "The yearly rate is shared out over the 12 times it is added." }),
};

export const questF3 = {
  id: "f3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CL, gen })),
};
