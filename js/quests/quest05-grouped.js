/* ============================================================
   QUEST 5 · Grouped data
   Estimated mean via the fx table, midpoints, modal class, median
   class, and the frequency-on calculator method. Uses the a ≤ x < b
   notation the grouped-mean material uses.
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { groupedMean, modalClass, medianClass, midpoint } from "../statlib.js";
import { C, mc, freqTable, classInterval } from "./_shared.js";

function groupedSet() {
  const start = pick([0, 10, 20, 30]);
  const k = pick([5, 6]);
  return Array.from({ length: k }, (_, i) => ({ lower: start + i * 10, upper: start + (i + 1) * 10, freq: randInt(2, 28) }));
}
function uniqueMax(classes) {
  const mx = Math.max(...classes.map(c => c.freq));
  if (classes.filter(c => c.freq === mx).length > 1) classes.find(c => c.freq === mx).freq += 1;
  return classes;
}
const totalFreq = classes => classes.reduce((s, c) => s + c.freq, 0);

function genTotal() {
  const classes = groupedSet(), n = totalFreq(classes);
  return {
    type: "calc", concept: "groupedMean", dp: 0, expected: n, answerLabel: `${n}`,
    // total:false — the Total row would print the answer
    prompt: `${freqTable(classes, { total: false })}What is <b>n</b> (the total frequency, Σf)?`,
    hint: "Add up the frequency column.",
    solution: [{ s: `n = Σf = ${classes.map(c => c.freq).join(" + ")} = ${n}`, r: "total frequency" }],
  };
}

function genMidpoint() {
  const lo = pick([10, 20, 30, 40, 50]), up = lo + 10, mid = (lo + up) / 2;
  return {
    type: "calc", concept: "groupedMean", dp: 0, expected: mid, answerLabel: `${mid}`,
    prompt: `What is the <b>midpoint</b> of the class <b>${lo} ≤ x &lt; ${up}</b>?`,
    hint: "Midpoint = (lower + upper) ÷ 2.",
    solution: [{ s: `x = (${lo} + ${up}) / 2 = ${mid}`, r: "midpoint" }],
  };
}

function genFx() {
  const lo = pick([20, 30, 40, 50, 60]), up = lo + 10, mid = (lo + up) / 2, f = randInt(4, 22), fx = f * mid;
  return {
    type: "calc", concept: "groupedMean", dp: 0, expected: fx, answerLabel: `${fx}`,
    prompt: `For the class <b>${lo} ≤ x &lt; ${up}</b> with frequency <b>${f}</b>, calculate <b>f × x</b> (frequency × midpoint).`,
    hint: "First find the midpoint x = (lower + upper)/2, then multiply by the frequency.",
    solution: [{ s: `x = ${mid}, so f × x = ${f} × ${mid} = ${fx}`, r: "f × midpoint" }],
  };
}

function genEstMean() {
  const classes = groupedSet();
  const { mean, fx, n } = groupedMean(classes);
  return {
    type: "calc", concept: "groupedMean", dp: 2, expected: mean, answerLabel: `≈ ${C(Math.round(mean * 100) / 100)}`,
    prompt: `${freqTable(classes, { mid: true })}Calculate the <b>estimated mean</b> (to 2 decimal places).`,
    hint: "Estimated mean = Σ(f × x) / n. Use each class midpoint x.",
    solution: [
      { s: `Σ(f × x) = ${fx}`, r: "using midpoints" },
      { s: `x̄ = Σfx / n = ${fx} / ${n} = ${C(Math.round(mean * 100) / 100)}`, r: "estimated mean" },
    ],
  };
}

function genModalClass() {
  const classes = uniqueMax(groupedSet());
  const modal = modalClass(classes);
  const correct = classInterval(modal);
  const wrongs = shuffled(classes.filter(c => c !== modal)).slice(0, 3).map(c => classInterval(c));
  return mc("classes",
    `${freqTable(classes)}Which is the <b>modal class</b>?`,
    correct, wrongs,
    { layout: "grid2", hint: "The modal class has the highest frequency.",
      solution: [{ s: `${correct} has the highest frequency → modal class.` }] });
}

/* true if the running total lands EXACTLY on n/2 at an internal class
   boundary — the median class would then be arguable either side, so re-roll */
function hitsHalfBoundary(classes) {
  let c = 0;
  const tot = totalFreq(classes);
  return classes.slice(0, -1).some(cl => (c += cl.freq) * 2 === tot);
}

function genMedianClass() {
  let classes = groupedSet();
  while (hitsHalfBoundary(classes)) classes = groupedSet();
  const n = totalFreq(classes), pos = n / 2;
  const mClass = medianClass(classes);
  const correct = classInterval(mClass);
  const wrongs = shuffled(classes.filter(c => c !== mClass)).slice(0, 3).map(c => classInterval(c));
  return mc("classes",
    `${freqTable(classes, { cum: true })}The median is at position n/2 = <b>${C(pos)}</b>. Which is the <b>median class</b>?`,
    correct, wrongs,
    { layout: "grid2", hint: "Build up the cumulative frequency until you pass position n/2.",
      solution: [{ s: `Position ${C(pos)} falls in ${correct} (where the cumulative frequency first reaches it).` }] });
}

function genCalcMethod() {
  return mc("groupedMean",
    "To get the estimated mean on the calculator with <b>frequency ON</b>, what do you enter into the two columns?",
    "The midpoints in X and the frequencies in FREQ",
    ["The frequencies in X and the midpoints in FREQ", "The class boundaries in X and the totals in FREQ", "The cumulative frequencies in FREQ"],
    { hint: "Each class is represented by its midpoint, occurring f times.",
      solution: [{ s: "Midpoints go in the X column, frequencies in the FREQ column, then read x̄ (Var → 2)." }] });
}

export const quest05 = {
  id: "q5",
  skills: [
    { id: "total", concept: "groupedMean", gen: genTotal },
    { id: "midpoint", concept: "groupedMean", gen: genMidpoint },
    { id: "fx", concept: "groupedMean", gen: genFx },
    { id: "estMean", concept: "groupedMean", gen: genEstMean },
    { id: "modalClass", concept: "classes", gen: genModalClass },
    { id: "medianClass", concept: "classes", gen: genMedianClass },
    { id: "calcMethod", concept: "groupedMean", gen: genCalcMethod },
  ],
};
