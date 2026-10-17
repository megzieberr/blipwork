/* ============================================================
   QUEST 5 · Grouped data
   Estimated mean via the fx table, midpoints, modal class, median
   class, and the frequency-on calculator method. Uses the a ≤ x < b
   notation the grouped-mean material uses.
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { groupedMean, modalClass, medianClass, midpoint } from "../statlib.js";
import { C, mc, freqTable, classInterval } from "./_shared.js";
import { L } from "../lang.js";

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
    prompt: L(`${freqTable(classes, { total: false })}What is <b>n</b> (the total frequency, Σf)?`, `${freqTable(classes, { total: false })}Wat is <b>n</b> (die totale frekwensie, Σf)?`),
    hint: L("Add up the frequency column.", "Tel die frekwensiekolom op."),
    solution: [{ s: L(`n = Σf = ${classes.map(c => c.freq).join(" + ")} = ${n}`, `n = Σf = ${classes.map(c => c.freq).join(" + ")} = ${n}`), r: L("total frequency", "totale frekwensie") }],
  };
}

function genMidpoint() {
  const lo = pick([10, 20, 30, 40, 50]), up = lo + 10, mid = (lo + up) / 2;
  return {
    type: "calc", concept: "groupedMean", dp: 0, expected: mid, answerLabel: `${mid}`,
    prompt: L(`What is the <b>midpoint</b> of the class <b>${lo} ≤ x &lt; ${up}</b>?`, `Wat is die <b>middelpunt</b> van die klas <b>${lo} ≤ x &lt; ${up}</b>?`),
    hint: L("Midpoint = (lower + upper) ÷ 2.", "Middelpunt = (ondergrens + bogrens) ÷ 2."),
    solution: [{ s: L(`x = (${lo} + ${up}) / 2 = ${mid}`, `x = (${lo} + ${up}) / 2 = ${mid}`), r: L("midpoint", "midpoint") }],
  };
}

function genFx() {
  const lo = pick([20, 30, 40, 50, 60]), up = lo + 10, mid = (lo + up) / 2, f = randInt(4, 22), fx = f * mid;
  return {
    type: "calc", concept: "groupedMean", dp: 0, expected: fx, answerLabel: `${fx}`,
    prompt: L(`For the class <b>${lo} ≤ x &lt; ${up}</b> with frequency <b>${f}</b>, calculate <b>f × x</b> (frequency × midpoint).`, `Vir die klas <b>${lo} ≤ x &lt; ${up}</b> met frekwensie <b>${f}</b>, bereken <b>f × x</b> (frekwensie × middelpunt).`),
    hint: L("First find the midpoint x = (lower + upper)/2, then multiply by the frequency.", "Vind eers die middelpunt x = (ondergrens + bogrens)/2 en vermenigvuldig dan met die frekwensie."),
    solution: [{ s: L(`x = ${mid}, so f × x = ${f} × ${mid} = ${fx}`, `x = ${mid}, dus f × x = ${f} × ${mid} = ${fx}`), r: L("f × midpoint", "f × middelpunt") }],
  };
}

function genEstMean() {
  const classes = groupedSet();
  const { mean, fx, n } = groupedMean(classes);
  return {
    type: "calc", concept: "groupedMean", dp: 2, expected: mean, answerLabel: `≈ ${C(Math.round(mean * 100) / 100)}`,
    prompt: L(`${freqTable(classes, { mid: true })}Calculate the <b>estimated mean</b> (to 2 decimal places).`, `${freqTable(classes, { mid: true })}Bereken die <b>geskatte gemiddelde</b> (tot 2 desimale plekke).`),
    hint: L("Estimated mean = Σ(f × x) / n. Use each class midpoint x.", "Geskatte gemiddelde = Σ(f × x) / n. Gebruik elke klas se middelpunt x."),
    solution: [
      { s: L(`Σ(f × x) = ${fx}`, `Σ(f × x) = ${fx}`), r: L("using midpoints", "met middelpunte") },
      { s: L(`x̄ = Σfx / n = ${fx} / ${n} = ${C(Math.round(mean * 100) / 100)}`, `x̄ = Σfx / n = ${fx} / ${n} = ${C(Math.round(mean * 100) / 100)}`), r: L("estimated mean", "geskatte gemiddelde") },
    ],
  };
}

function genModalClass() {
  const classes = uniqueMax(groupedSet());
  const modal = modalClass(classes);
  const correct = classInterval(modal);
  const wrongs = shuffled(classes.filter(c => c !== modal)).slice(0, 3).map(c => classInterval(c));
  return mc("classes",
    L(`${freqTable(classes)}Which is the <b>modal class</b>?`, `${freqTable(classes)}Watter een is die <b>modale klas</b>?`),
    correct, wrongs,
    { layout: "grid2", hint: L("The modal class has the highest frequency.", "Die modale klas het die hoogste frekwensie."),
      solution: [{ s: L(`${correct} has the highest frequency → modal class.`, `${correct} het die hoogste frekwensie → modale klas.`) }] });
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
    L(`${freqTable(classes, { cum: true })}The median is at position n/2 = <b>${C(pos)}</b>. Which is the <b>median class</b>?`, `${freqTable(classes, { cum: true })}Die mediaan is by posisie n/2 = <b>${C(pos)}</b>. Watter een is die <b>mediaanklas</b>?`),
    correct, wrongs,
    { layout: "grid2", hint: L("Build up the cumulative frequency until you pass position n/2.", "Bou die kumulatiewe frekwensie op totdat jy by posisie n/2 verbygaan."),
      solution: [{ s: L(`Position ${C(pos)} falls in ${correct} (where the cumulative frequency first reaches it).`, `Posisie ${C(pos)} val in ${correct} (waar die kumulatiewe frekwensie dit eerste bereik).`) }] });
}

function genCalcMethod() {
  return mc("groupedMean",
    L("To get the estimated mean on the calculator with <b>frequency ON</b>, what do you enter into the two columns?", "Om die geskatte gemiddelde op die sakrekenaar te kry met <b>frekwensie ON</b>, wat voer jy in die twee kolomme in?"),
    L("The midpoints in X and the frequencies in FREQ", "Die middelpunte in X en die frekwensies in FREQ"),
    [L("The frequencies in X and the midpoints in FREQ", "Die frekwensies in X en die middelpunte in FREQ"), L("The class boundaries in X and the totals in FREQ", "Die klasgrense in X en die totale in FREQ"), L("The cumulative frequencies in FREQ", "Die kumulatiewe frekwensies in FREQ")],
    { hint: L("Each class is represented by its midpoint, occurring f times.", "Elke klas word deur sy middelpunt voorgestel, wat f keer voorkom."),
      solution: [{ s: L("Midpoints go in the X column, frequencies in the FREQ column, then read x̄ (Var → 2).", "Middelpunte gaan in die X-kolom, frekwensies in die FREQ-kolom; lees dan x̄ af (Var → 2).") }] });
}

export const quest05 = {
  id: "q5",
  skills: [
    { id: "total", concept: "groupedMean", gen: genTotal },
    { id: L("midpoint", "midpoint"), concept: "groupedMean", gen: genMidpoint },
    { id: "fx", concept: "groupedMean", gen: genFx },
    { id: "estMean", concept: "groupedMean", gen: genEstMean },
    { id: "modalClass", concept: "classes", gen: genModalClass },
    { id: "medianClass", concept: "classes", gen: genMedianClass },
    { id: "calcMethod", concept: "groupedMean", gen: genCalcMethod },
  ],
};
