/* ============================================================
   QUEST 8 · Mixed exam favourites
   Comparing two box plots, the effect of adding a constant to
   every value (centre shifts, spread doesn't), and a couple of
   the harder "find the unknown" ones.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { C, mc } from "./_shared.js";

const boxAxis = max => { const step = 10, m = Math.ceil((max + 6) / step) * step; return { min: 0, max: m, step }; };
function randBox() {
  const min = randInt(5, 25), q1 = min + randInt(6, 14), med = q1 + randInt(5, 12), q3 = med + randInt(5, 12), max = q3 + randInt(6, 16);
  return { min, q1, med, q3, max };
}
const rangeOf = b => b.max - b.min;

/* ---------- effect of adding a constant (qualitative) ---------- */
function genEffectChange() {
  const k = randInt(2, 9);
  const measures = [
    { name: "mean", up: true }, { name: "median", up: true },
    { name: "range", up: false }, { name: "interquartile range (IQR)", up: false },
    { name: "standard deviation", up: false }, { name: "variance", up: false },
  ];
  const m = pick(measures);
  const correct = m.up ? `It increases by ${k}` : "It stays the same";
  const wrongs = m.up
    ? ["It stays the same", `It decreases by ${k}`, `It is multiplied by ${k}`]
    : [`It increases by ${k}`, `It is multiplied by ${k}`, `It decreases by ${k}`];
  return mc("effect",
    `Every value in a data set is increased by <b>${k}</b>. What happens to the <b>${m.name}</b>?`,
    correct, wrongs,
    { hint: "Adding the same number to every value shifts the centre but not the spread.",
      solution: [{ s: m.up ? `The ${m.name} shifts up by ${k}.` : `Spread is unchanged — the ${m.name} stays the same.` }] });
}

/* ---------- effect on the mean (value) ---------- */
function genEffectMean() {
  const M = randInt(20, 60), k = randInt(2, 9), add = Math.random() < 0.6;
  const exp = add ? M + k : M - k;
  return {
    type: "calc", concept: "effect", dp: 0, allowNeg: true, expected: exp, answerLabel: `${exp}`,
    prompt: `The mean of a data set is <b>${M}</b>. If <b>${k}</b> is ${add ? "added to" : "subtracted from"} every value, what is the new mean?`,
    hint: "The mean shifts by the same amount you add to (or subtract from) every value.",
    solution: [{ s: `new mean = ${M} ${add ? "+" : "−"} ${k} = ${exp}`, r: "effect on the mean" }],
  };
}

/* ---------- effect on σ (unchanged) ---------- */
function genSdShifted() {
  const sd = randInt(25, 80) / 10, k = randInt(2, 9);
  return mc("effect",
    `A data set has standard deviation σ = <b>${C(sd)}</b>. Every value is increased by <b>${k}</b>. What is the new standard deviation?`,
    C(sd), [C(sd + k), C(Math.round(sd * k * 10) / 10), C(Math.max(0, sd - k))],   // decoys: shifted, multiplied, shrunk
    { hint: "Shifting every value sideways does not change how spread out the data is.",
      solution: [{ s: `Adding a constant leaves the spread unchanged → σ stays ${C(sd)}.` }] });
}

/* ---------- compare two box plots: median ---------- */
function genCompareMedian() {
  let a, b;
  do { a = randBox(); b = randBox(); } while (a.med === b.med);
  const axis = boxAxis(Math.max(a.max, b.max));
  const correct = a.med > b.med ? "Set A" : "Set B";
  return mc("compareBox", "Which set has the <b>higher median</b>?",
    correct, [correct === "Set A" ? "Set B" : "Set A", "They are equal"],
    { graphs: [
        { label: "Set A", spec: { type: "box", five: a, axis, showValues: true } },
        { label: "Set B", spec: { type: "box", five: b, axis, showValues: true } },
      ],
      hint: "The median is the line inside each box — which sits further right?",
      solution: [{ s: `${correct} has its median line further along the scale.` }] });
}

/* ---------- compare two box plots: spread ---------- */
function genCompareSpread() {
  let a, b;
  do { a = randBox(); b = randBox(); } while (rangeOf(a) === rangeOf(b));
  const axis = boxAxis(Math.max(a.max, b.max));
  const correct = rangeOf(a) > rangeOf(b) ? "Set A" : "Set B";
  return mc("compareBox", "Which set is <b>more spread out</b> (larger range)?",
    correct, [correct === "Set A" ? "Set B" : "Set A", "They are equally spread"],
    { graphs: [
        { label: "Set A", spec: { type: "box", five: a, axis, showValues: true } },
        { label: "Set B", spec: { type: "box", five: b, axis, showValues: true } },
      ],
      hint: "Range = distance from the left whisker end to the right whisker end.",
      solution: [{ s: `${correct} stretches further from minimum to maximum → larger range.` }] });
}

/* ---------- find an unknown quartile from the IQR ---------- */
function genFindUnknown() {
  const iqrV = randInt(8, 24), which = pick(["q3", "q1"]);
  if (which === "q3") {
    const q1 = randInt(15, 40), q3 = q1 + iqrV;
    return {
      type: "calc", concept: "iqr", dp: 0, expected: q3, answerLabel: `${q3}`,
      prompt: `A data set has an IQR of <b>${iqrV}</b> and <b>Q1 = ${q1}</b>. Find <b>Q3</b>.`,
      hint: "IQR = Q3 − Q1, so Q3 = Q1 + IQR.",
      solution: [{ s: `Q3 = Q1 + IQR = ${q1} + ${iqrV} = ${q3}`, r: "interquartile range" }],
    };
  }
  const q3 = randInt(35, 60), q1 = q3 - iqrV;
  return {
    type: "calc", concept: "iqr", dp: 0, expected: q1, answerLabel: `${q1}`,
    prompt: `A data set has an IQR of <b>${iqrV}</b> and <b>Q3 = ${q3}</b>. Find <b>Q1</b>.`,
    hint: "IQR = Q3 − Q1, so Q1 = Q3 − IQR.",
    solution: [{ s: `Q1 = Q3 − IQR = ${q3} − ${iqrV} = ${q1}`, r: "interquartile range" }],
  };
}

/* ---------- variance unchanged after a shift ---------- */
function genVarShift() {
  const sd = randInt(2, 8), v = sd * sd, k = randInt(2, 9);
  return {
    type: "calc", concept: "effect", dp: 0, expected: v, answerLabel: `${v}`,
    prompt: `A data set has variance <b>${v}</b>. Every value is increased by <b>${k}</b>. What is the new variance?`,
    hint: "Adding a constant doesn’t change the spread — so the variance is unchanged.",
    solution: [{ s: `Adding a constant leaves the spread unchanged → variance stays ${v}.`, r: "effect on spread" }],
  };
}

export const quest08 = {
  id: "q8",
  skills: [
    { id: "effectChange", concept: "effect", gen: genEffectChange },
    { id: "effectMean", concept: "effect", gen: genEffectMean },
    { id: "sdShifted", concept: "effect", gen: genSdShifted },
    { id: "compareMedian", concept: "compareBox", gen: genCompareMedian },
    { id: "compareSpread", concept: "compareBox", gen: genCompareSpread },
    { id: "findUnknown", concept: "iqr", gen: genFindUnknown },
    { id: "varShift", concept: "effect", gen: genVarShift },
  ],
};
