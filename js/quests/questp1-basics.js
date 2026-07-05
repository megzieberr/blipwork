/* ============================================================
   PROBABILITY QUEST 1 · Chance & the scale
   Sample space, theoretical probability (fraction / decimal /
   percentage) and relative frequency. Every answer key is computed
   from the event set — never hand-typed.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { range1, odds, evens, multiplesOf, factorsOf, frac, dec, pctOf } from "../problib.js";

const BASICS = "probBasics";
const REL = "relFreq";

/* an event on a fair N-sided die: returns {desc, set} */
function evt(N) {
  const opts = [
    () => ({ desc: "an odd number", set: odds(N) }),
    () => ({ desc: "an even number", set: evens(N) }),
    () => { const m = pick([2, 3, 4]); return { desc: `a multiple of ${m}`, set: multiplesOf(m, N) }; },
    () => ({ desc: `a factor of ${N}`, set: factorsOf(N) }),
    () => { const k = randInt(2, N - 2); return { desc: `greater than ${k}`, set: range1(N).filter(x => x > k) }; },
    () => { const k = randInt(3, N - 1); return { desc: `at most ${k}`, set: range1(N).filter(x => x <= k) }; },
  ];
  let e; do { e = pick(opts)(); } while (e.set.length === 0 || e.set.length === N);
  return e;
}

const SKILLS = {
  sampleSpace: () => {
    const N = pick([6, 8, 10, 12]);
    return {
      type: "calc", concept: BASICS, dp: 0,
      prompt: `A fair <b>${N}-sided</b> die is rolled once. How many outcomes are in the sample space, <b>n(S)</b>?`,
      expected: N,
      hint: "The sample space is every value the die could land on.",
      answerLabel: `n(S) = ${N}`,
      solution: [{ s: `S = {1; 2; … ; ${N}}, so n(S) = ${N}.` }],
    };
  },

  countOutcomes: () => {
    const N = pick([8, 10, 12]); const e = evt(N);
    return {
      type: "calc", concept: BASICS, dp: 0,
      prompt: `A fair ${N}-sided die is rolled. How many outcomes give <b>${e.desc}</b>? (that is n(E))`,
      expected: e.set.length,
      hint: "List the values that fit, then count them.",
      answerLabel: `${e.desc} = {${e.set.join("; ")}}, so n(E) = ${e.set.length}`,
      solution: [{ s: `The outcomes are {${e.set.join("; ")}} → n(E) = ${e.set.length}.` }],
    };
  },

  probFraction: () => {
    const N = pick([6, 8, 10, 12]); const e = evt(N);
    const n = e.set.length;
    const f = frac(n, N);
    // each decoy is a specific slip — and never numerically equal to the answer
    const cands = [
      frac(N - n, N),                                    // counted the complement
      { str: `${N}/${n}`, val: N / n },                  // inverted: n(S)/n(E)
      frac(n, N - 1),                                    // wrong denominator (left an outcome out)
      frac(n, N - n),                                    // part-to-part “odds”, not a probability
    ];
    const seen = new Set([f.str]); const wrongs = [];
    for (const c of cands) {
      if (Math.abs(c.val - f.val) < 1e-9 || seen.has(c.str)) continue;
      seen.add(c.str); wrongs.push(c.str);
      if (wrongs.length === 3) break;
    }
    return mc(BASICS,
      `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a fraction in simplest form.`,
      f.str, wrongs,
      { hint: "P(E) = n(E) / n(S). Then simplify.",
        answerLabel: `P = ${n}/${N} = ${f.str}`,
        solution: [{ s: `n(E) = ${n}, n(S) = ${N}` }, { s: `P = ${n}/${N} = ${f.str}` }] });
  },

  probDecimal: () => {
    // keep the decimal EXACT at 2 places, so "P = n/N = 0,25" is a true equality
    let N, e;
    do { N = pick([8, 10, 12, 20]); e = evt(N); } while ((e.set.length * 100) % N !== 0);
    const v = e.set.length / N;
    return {
      type: "calc", concept: BASICS, dp: 2,
      prompt: `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a decimal (2 places).`,
      expected: v,
      hint: "Work out n(E) / n(S), then divide it out.",
      answerLabel: `P = ${e.set.length}/${N} = ${dec(v, 2)}`,
      solution: [{ s: `P = ${e.set.length}/${N} = ${dec(v, 2)}` }],
    };
  },

  probPercent: () => {
    const N = pick([8, 10, 20]); const e = evt(N);
    const v = e.set.length / N;
    const pdp = Math.round(v * 1000) % 10 === 0 ? 0 : 1;   // eighths give e.g. 37,5%
    return {
      type: "calc", concept: BASICS, dp: pdp, unit: "%",
      prompt: `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a percentage${pdp ? " (1 decimal place)" : ""}.`,
      expected: v * 100,
      hint: "Find P as a decimal, then × 100 for a percentage.",
      answerLabel: `P = ${dec(v)} = ${pctOf(v, pdp)}`,
      solution: [{ s: `P = ${e.set.length}/${N} = ${dec(v)} = ${pctOf(v, pdp)}` }],
    };
  },

  relativeFrequency: () => {
    const total = pick([20, 25, 40, 50]); const hits = randInt(Math.round(total * 0.3), Math.round(total * 0.8));
    const v = hits / total; const thing = pick(["heads", "a six", "red", "a win"]);
    return {
      type: "calc", concept: REL, dp: 2,
      prompt: `An experiment is run <b>${total}</b> times and "${thing}" happens <b>${hits}</b> times. What is the <b>relative frequency</b> of "${thing}"? (decimal, 2 places)`,
      expected: v,
      hint: "relative frequency = times it happened ÷ total trials.",
      answerLabel: `${hits}/${total} = ${dec(v, 2)}`,
      solution: [{ s: `relative frequency = ${hits} ÷ ${total} = ${dec(v, 2)}` }],
    };
  },

  theoryVsRel: () => mc(REL,
    "Which one is worked out <b>before</b> doing any experiment — just from the possible outcomes?",
    "theoretical probability",
    ["relative frequency", "the relative frequency, always", "neither — both need data first"],
    { hint: "One is a prediction; the other is what actually happened.",
      answerLabel: "Theoretical probability is the prediction; relative frequency comes from real data." }),

  scaleSense: () => {
    const bad = pick(["1,4", "−0,2", "120% (as a probability)", "3/2"]);
    return mc(BASICS,
      "A probability must lie between 0 and 1. Which of these <b>cannot</b> be a probability?",
      bad,
      ["0", "0,5", "1"].filter(x => x !== bad).slice(0, 3),
      { hint: "0 = impossible, 1 = certain. Nothing can be more likely than certain.",
        answerLabel: `${bad} is outside the 0–1 range, so it is impossible as a probability.` });
  },
};

export const questP1 = {
  id: "p1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "relativeFrequency" || id === "theoryVsRel" ? REL : BASICS, gen })),
};
