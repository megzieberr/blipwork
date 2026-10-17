/* ============================================================
   QUEST 6 · Ogives (interpretation-led)
   Which point to plot, anchoring, cumulative frequency, modal
   class = steepest, and reading the median / quartiles /
   percentiles off the curve. Read-off answers are COMPUTED by the
   engine off the same smooth curve the learner sees (±2 tolerance).
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { ogiveAnswerAtCum, ogiveAnswerAtVal } from "../engine/stats-graph.js";
import { TOL } from "../config.js";
import { C, mc, freqTable, classInterval } from "./_shared.js";
import { L } from "../lang.js";

function ogiveClasses() {
  const start = pick([0, 10, 20, 30]);
  const k = pick([5, 6]);
  return Array.from({ length: k }, (_, i) => ({ lower: start + i * 10, upper: start + (i + 1) * 10, freq: randInt(3, 30) }));
}
function uniqueMax(classes) {
  const mx = Math.max(...classes.map(c => c.freq));
  if (classes.filter(c => c.freq === mx).length > 1) classes.find(c => c.freq === mx).freq += 1;
  return classes;
}
const totalFreq = classes => classes.reduce((s, c) => s + c.freq, 0);

function genWhichPoint() {
  const lo = pick([10, 20, 30, 40]), up = lo + 10;
  let cf;   // cf may not equal the upper boundary, or the swapped decoy = the answer
  do { cf = randInt(20, 120); } while (cf === up);
  return mc("ogivePlot",
    L(`For the class <b>${lo} &lt; x ≤ ${up}</b> with a cumulative frequency of <b>${cf}</b>, which point do you plot on the ogive?`, `Vir die klas <b>${lo} &lt; x ≤ ${up}</b> met 'n kumulatiewe frekwensie van <b>${cf}</b>, watter punt stip jy op die ogief?`),
    `(${up} ; ${cf})`, [`(${lo} ; ${cf})`, `(${(lo + up) / 2} ; ${cf})`, `(${cf} ; ${up})`],
    { hint: L("Plot at (upper boundary of the class ; cumulative frequency).", "Stip by (bogrens van die klas ; kumulatiewe frekwensie)."), layout: "grid2",
      solution: [{ s: L(`Plot (upper boundary ; cumulative frequency) = (${up} ; ${cf}).`, `Stip (bogrens ; kumulatiewe frekwensie) = (${up} ; ${cf}).`) }] });
}

function genAnchor() {
  const lo = pick([5, 10, 20]), up = lo + 10;
  return mc("ogivePlot",
    L(`An ogive’s first class is <b>${lo} &lt; x ≤ ${up}</b>. At which point is the curve anchored (started at height 0)?`, `'n Ogief se eerste klas is <b>${lo} &lt; x ≤ ${up}</b>. By watter punt is die kurwe geanker (begin by hoogte 0)?`),
    `(${lo} ; 0)`, [`(${up} ; 0)`, `(${lo} ; ${up})`, `(0 ; 0)`],
    { hint: L("Anchor at the LOWER boundary of the first class, at cumulative frequency 0.", "Anker by die ONDERGRENS van die eerste klas, by kumulatiewe frekwensie 0."), layout: "grid2",
      solution: [{ s: L(`Anchor at (lower boundary of the first class ; 0) = (${lo} ; 0).`, `Anker by (ondergrens van die eerste klas ; 0) = (${lo} ; 0).`) }] });
}

function genCumFreq() {
  const classes = ogiveClasses();
  const k = randInt(2, classes.length);
  const cum = classes.slice(0, k).reduce((s, c) => s + c.freq, 0);
  return {
    type: "calc", concept: "ogivePlot", dp: 0, expected: cum, answerLabel: `${cum}`,
    // total:false — when the last class is asked, the Total row would print the answer
    prompt: L(`${freqTable(classes, { notation: "lt", total: false })}What is the <b>cumulative frequency</b> up to and including the class ${classInterval(classes[k - 1], "lt")}?`, `${freqTable(classes, { notation: "lt", total: false })}Wat is die <b>kumulatiewe frekwensie</b> tot en met die klas ${classInterval(classes[k - 1], "lt")}?`),
    hint: L("Cumulative frequency is the running total of the frequencies.", "Kumulatiewe frekwensie is die lopende totaal van die frekwensies."),
    solution: [{ s: L(`Add the frequencies up to that class = ${cum}.`, `Tel die frekwensies tot en met daardie klas op = ${cum}.`), r: L("cumulative frequency", "kumulatiewe frekwensie") }],
  };
}

function genModalSteepest() {
  const classes = uniqueMax(ogiveClasses());
  const modal = classes.reduce((a, c) => (c.freq > a.freq ? c : a), classes[0]);
  const correct = classInterval(modal, "lt");
  const wrongs = shuffled(classes.filter(c => c !== modal)).slice(0, 3).map(c => classInterval(c, "lt"));
  return mc("classes",
    L("On the ogive, the modal class is the <b>steepest</b> part. Which class interval is it?", "Op die ogief is die modale klas die <b>steilste</b> deel. Watter klasinterval is dit?"),
    correct, wrongs,
    { graph: { type: "ogive", classes }, graphCap: L("cumulative frequency", "kumulatiewe frekwensie"), layout: "grid2",
      hint: L("The steepest rise = the biggest jump in cumulative frequency = the most data.", "Die steilste styging = die grootste sprong in kumulatiewe frekwensie = die meeste data."),
      solution: [{ s: L(`The steepest section is ${correct} — the class with the most values.`, `Die steilste deel is ${correct}: die klas met die meeste waardes.`) }] });
}

function genReadQuartile() {
  const classes = ogiveClasses(), n = totalFreq(classes);
  const which = pick([L("median", "median"), "q1", "q3"]);
  const level = which === L("median", "median") ? n / 2 : which === "q1" ? n / 4 : 3 * n / 4;
  const val = ogiveAnswerAtCum({ classes }, level);
  const name = { median: L("median", "median"), q1: L("lower quartile (Q1)", "onderste kwartiel (Q1)"), q3: L("upper quartile (Q3)", "boonste kwartiel (Q3)") }[which];
  const formula = which === L("median", "median") ? L("n/2", "n/2") : which === "q1" ? L("n/4", "n/4") : L("3n/4", "3n/4");
  return {
    type: "calc", concept: "ogiveRead", dp: 0, tol: TOL.graphRead,
    graph: { type: "ogive", classes }, graphCap: L("cumulative frequency", "kumulatiewe frekwensie"),
    prompt: L(`Use the ogive to read off the <b>${name}</b>. (n = ${n}.)`, `Gebruik die ogief om die <b>${name}</b> af te lees. (n = ${n}.)`),
    expected: val, answerLabel: `≈ ${Math.round(val)}`,
    hint: L(`Find position ${C(level)} on the cumulative axis, read across to the curve, then straight down.`, `Vind posisie ${C(level)} op die kumulatiewe as, lees oor na die kurwe en dan reguit af.`),
    solution: [{ s: L(`Position = ${formula} = ${C(level)}; read across to the curve and down → ≈ ${Math.round(val)}.`, `Posisie = ${formula} = ${C(level)}; lees oor na die kurwe en af → ≈ ${Math.round(val)}.`), r: L("read off the ogive", "lees van die ogief af") }],
  };
}

function genReadPercentile() {
  const classes = ogiveClasses(), n = totalFreq(classes);
  const p = pick([10, 20, 30, 40, 60, 70, 80, 90]);
  const level = n * p / 100;
  const val = ogiveAnswerAtCum({ classes }, level);
  return {
    type: "calc", concept: "ogiveRead", dp: 0, tol: TOL.graphRead,
    graph: { type: "ogive", classes }, graphCap: L("cumulative frequency", "kumulatiewe frekwensie"),
    prompt: L(`Use the ogive to read off the <b>${p}th percentile</b>. (n = ${n}.)`, `Gebruik die ogief om die <b>p-de persentiel (p = ${p})</b> af te lees. (n = ${n}.)`),
    expected: val, answerLabel: `≈ ${Math.round(val)}`,
    hint: L(`The ${p}th percentile is at position n × ${p}/100 = ${C(level)} on the cumulative axis.`, `Die p-de persentiel (p = ${p}) is by posisie n × ${p}/100 = ${C(level)} op die kumulatiewe as.`),
    solution: [{ s: L(`Position = n × ${p}/100 = ${C(level)}; read across and down → ≈ ${Math.round(val)}.`, `Posisie = n × ${p}/100 = ${C(level)}; lees oor en af → ≈ ${Math.round(val)}.`), r: L("percentile", "persentiel") }],
  };
}

function genValueAtMost() {
  const classes = ogiveClasses();
  const ci = pick(classes.slice(0, classes.length - 1));
  const X = ci.upper, cumAt = ogiveAnswerAtVal({ classes }, X);
  return {
    type: "calc", concept: "ogiveRead", dp: 0, tol: TOL.graphRead,
    graph: { type: "ogive", classes }, graphCap: L("cumulative frequency", "kumulatiewe frekwensie"),
    prompt: L(`Use the ogive: about how many data values are <b>at most ${X}</b>?`, `Gebruik die ogief: ongeveer hoeveel datawaardes is <b>hoogstens ${X}</b>?`),
    expected: cumAt, answerLabel: `≈ ${Math.round(cumAt)}`,
    hint: L(`Go up from ${X} on the horizontal axis to the curve, then across to the cumulative-frequency axis.`, `Gaan op van ${X} op die horisontale as na die kurwe, dan oor na die kumulatiewe-frekwensie-as.`),
    solution: [{ s: L(`Read up from ${X} to the curve, then across → ≈ ${Math.round(cumAt)}.`, `Lees op van ${X} na die kurwe, dan oor → ≈ ${Math.round(cumAt)}.`), r: L("read off the ogive", "lees van die ogief af") }],
  };
}

export const quest06 = {
  id: "q6",
  skills: [
    { id: "whichPoint", concept: "ogivePlot", gen: genWhichPoint },
    { id: "anchor", concept: "ogivePlot", gen: genAnchor },
    { id: "cumFreq", concept: "ogivePlot", gen: genCumFreq },
    { id: "modalSteepest", concept: "classes", gen: genModalSteepest },
    { id: "readQuartile", concept: "ogiveRead", gen: genReadQuartile },
    { id: "readPercentile", concept: "ogiveRead", gen: genReadPercentile },
    { id: "valueAtMost", concept: "ogiveRead", gen: genValueAtMost },
  ],
};
