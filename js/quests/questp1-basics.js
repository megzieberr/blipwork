/* ============================================================
   PROBABILITY QUEST 1 · Chance & the scale
   Sample space, theoretical probability (fraction / decimal /
   percentage) and relative frequency. Every answer key is computed
   from the event set — never hand-typed.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { range1, odds, evens, multiplesOf, factorsOf, frac, dec, pctOf } from "../problib.js";
import { L } from "../lang.js";

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
      prompt: L(`A fair <b>${N}-sided</b> die is rolled once. How many outcomes are in the sample space, <b>n(S)</b>?`, `'n Regverdige <b>${N}-kantige</b> dobbelsteen word een keer gegooi. Hoeveel uitkomste is in die uitkomsruimte, <b>n(S)</b>?`),
      expected: N,
      hint: L("The sample space is every value the die could land on.", "Die uitkomsruimte is elke waarde waarop die dobbelsteen kan land."),
      answerLabel: L(`n(S) = ${N}`, `n(S) = ${N}`),
      solution: [{ s: L(`S = {1; 2; … ; ${N}}, so n(S) = ${N}.`, `S = {1; 2; … ; ${N}}, dus n(S) = ${N}.`) }],
    };
  },

  countOutcomes: () => {
    const N = pick([8, 10, 12]); const e = evt(N);
    return {
      type: "calc", concept: BASICS, dp: 0,
      prompt: L(`A fair ${N}-sided die is rolled. How many outcomes give <b>${e.desc}</b>? (that is n(E))`, `'n Regverdige ${N}-kantige dobbelsteen word gegooi. Hoeveel uitkomste gee <b>${e.desc}</b>? (dit is n(E))`),
      expected: e.set.length,
      hint: L("List the values that fit, then count them.", "Lys die waardes wat pas, en tel hulle dan."),
      answerLabel: L(`${e.desc} = {${e.set.join("; ")}}, so n(E) = ${e.set.length}`, `${e.desc} = {${e.set.join("; ")}}, dus n(E) = ${e.set.length}`),
      solution: [{ s: L(`The outcomes are {${e.set.join("; ")}} → n(E) = ${e.set.length}.`, `Die uitkomste is {${e.set.join("; ")}} → n(E) = ${e.set.length}.`) }],
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
      L(`A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a fraction in simplest form.`, `'n Regverdige ${N}-kantige dobbelsteen word gegooi. Skryf <b>P(${e.desc})</b> as 'n breuk in eenvoudigste vorm.`),
      f.str, wrongs,
      { hint: L("P(E) = n(E) / n(S). Then simplify.", "P(E) = n(E) / n(S). Vereenvoudig dan."),
        answerLabel: L(`P = ${n}/${N} = ${f.str}`, `P = ${n}/${N} = ${f.str}`),
        solution: [{ s: L(`n(E) = ${n}, n(S) = ${N}`, `n(E) = ${n}, n(S) = ${N}`) }, { s: L(`P = ${n}/${N} = ${f.str}`, `P = ${n}/${N} = ${f.str}`) }] });
  },

  probDecimal: () => {
    // keep the decimal EXACT at 2 places, so "P = n/N = 0,25" is a true equality
    let N, e;
    do { N = pick([8, 10, 12, 20]); e = evt(N); } while ((e.set.length * 100) % N !== 0);
    const v = e.set.length / N;
    return {
      type: "calc", concept: BASICS, dp: 2,
      prompt: L(`A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a decimal (2 places).`, `'n Regverdige ${N}-kantige dobbelsteen word gegooi. Skryf <b>P(${e.desc})</b> as 'n desimale getal (2 plekke).`),
      expected: v,
      hint: L("Work out n(E) / n(S), then divide it out.", "Skryf n(E) / n(S) en deel dit dan uit."),
      answerLabel: L(`P = ${e.set.length}/${N} = ${dec(v, 2)}`, `P = ${e.set.length}/${N} = ${dec(v, 2)}`),
      solution: [{ s: L(`P = ${e.set.length}/${N} = ${dec(v, 2)}`, `P = ${e.set.length}/${N} = ${dec(v, 2)}`) }],
    };
  },

  probPercent: () => {
    const N = pick([8, 10, 20]); const e = evt(N);
    const v = e.set.length / N;
    const pdp = Math.round(v * 1000) % 10 === 0 ? 0 : 1;   // eighths give e.g. 37,5%
    return {
      type: "calc", concept: BASICS, dp: pdp, unit: "%",
      prompt: L(`A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a percentage${pdp ? " (1 decimal place)" : ""}.`, `'n Regverdige ${N}-kantige dobbelsteen word gegooi. Skryf <b>P(${e.desc})</b> as 'n persentasie${pdp ? " (1 desimale plek)" : ""}.`),
      expected: v * 100,
      hint: L("Find P as a decimal, then × 100 for a percentage.", "Kry P as 'n desimale getal, en dan × 100 vir 'n persentasie."),
      answerLabel: L(`P = ${dec(v)} = ${pctOf(v, pdp)}`, `P = ${dec(v)} = ${pctOf(v, pdp)}`),
      solution: [{ s: L(`P = ${e.set.length}/${N} = ${dec(v)} = ${pctOf(v, pdp)}`, `P = ${e.set.length}/${N} = ${dec(v)} = ${pctOf(v, pdp)}`) }],
    };
  },

  relativeFrequency: () => {
    const total = pick([20, 25, 40, 50]); const hits = randInt(Math.round(total * 0.3), Math.round(total * 0.8));
    const v = hits / total; const thing = pick([L("heads", "kop"), L("a six", "'n ses"), L("red", "rooi"), L("a win", "'n wen")]);
    return {
      type: "calc", concept: REL, dp: 2,
      prompt: L(`An experiment is run <b>${total}</b> times and "${thing}" happens <b>${hits}</b> times. What is the <b>relative frequency</b> of "${thing}"? (decimal, 2 places)`, `'n Eksperiment word <b>${total}</b> keer uitgevoer en "${thing}" gebeur <b>${hits}</b> keer. Wat is die <b>relatiewe frekwensie</b> van "${thing}"? (desimaal, 2 plekke)`),
      expected: v,
      hint: L("relative frequency = times it happened ÷ total trials.", "relatiewe frekwensie = kere wat dit gebeur het ÷ totale aantal proewe."),
      answerLabel: `${hits}/${total} = ${dec(v, 2)}`,
      solution: [{ s: L(`relative frequency = ${hits} ÷ ${total} = ${dec(v, 2)}`, `relatiewe frekwensie = ${hits} ÷ ${total} = ${dec(v, 2)}`) }],
    };
  },

  theoryVsRel: () => mc(REL,
    L("Which one is worked out <b>before</b> doing any experiment — just from the possible outcomes?", "Watter een word <b>voor</b> enige eksperiment uitgewerk, net uit die moontlike uitkomste?"),
    L("theoretical probability", "teoretiese waarskynlikheid"),
    [L("relative frequency", "relatiewe frekwensie"), L("the relative frequency, always", "altyd die relatiewe frekwensie"), L("neither — both need data first", "geen van albei: albei het eers data nodig")],
    { hint: L("One is a prediction; the other is what actually happened.", "Een is 'n voorspelling; die ander is wat werklik gebeur het."),
      answerLabel: L("Theoretical probability is the prediction; relative frequency comes from real data.", "Teoretiese waarskynlikheid is die voorspelling; relatiewe frekwensie kom uit werklike data.") }),

  scaleSense: () => {
    const bad = pick(["1,4", "−0,2", L("120% (as a probability)", "120% (as 'n waarskynlikheid)"), "3/2"]);
    return mc(BASICS,
      L("A probability must lie between 0 and 1. Which of these <b>cannot</b> be a probability?", "'n Waarskynlikheid moet tussen 0 en 1 lê. Watter een hiervan kan <b>nie</b> 'n waarskynlikheid wees nie?"),
      bad,
      ["0", "0,5", "1"].filter(x => x !== bad).slice(0, 3),
      { hint: L("0 = impossible, 1 = certain. Nothing can be more likely than certain.", "0 = onmoontlik, 1 = seker. Niks kan meer waarskynlik as seker wees nie."),
        answerLabel: L(`${bad} is outside the 0–1 range, so it is impossible as a probability.`, `${bad} lê buite 0 tot 1, dus kan dit nie 'n waarskynlikheid wees nie.`) });
  },
};

export const questP1 = {
  id: "p1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "relativeFrequency" || id === "theoryVsRel" ? REL : BASICS, gen })),
};
