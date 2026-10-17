/* ============================================================
   QUEST 7 · Standard deviation & variance
   What σ measures, the calculator value to use, variance = σ²,
   counting values within one σ of the mean, and comparing the
   consistency of two data sets.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { mean, stdDev, sortAsc } from "../statlib.js";
import { C, list, rawset, mc } from "./_shared.js";
import { L } from "../lang.js";

function genMeaning() {
  return mc("stddev",
    L("What does the <b>standard deviation</b> measure?", "Wat meet die <b>standaardafwyking</b>?"),
    L("How spread out the data is around the mean", "Hoe uitgesprei die data om die gemiddelde is"),
    [L("The middle value of the data", "Die middelste waarde van die data"), L("The most common value", "Die waarde wat die meeste voorkom"), L("The total of all the values", "Die totaal van al die waardes")],
    { hint: L("A bigger σ means more spread; a smaller σ means more consistent.", "'n Groter σ beteken meer spreiding; 'n kleiner σ beteken meer konsekwent.") });
}

function genCalcKey() {
  return mc("stddev",
    L("The Var menu reads <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Which do you use for the <b>standard deviation</b>?", "Die Var-kieslys wys <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Watter een gebruik jy vir die <b>standaardafwyking</b>?"),
    L("3 (σx)", "3 (σx)"), [L("4 (sx)", "4 (sx)"), L("2 (x̄)", "2 (x̄)"), L("1 (n)", "1 (n)")],
    { hint: L("Use the population standard deviation σx — option 3.", "Gebruik die populasie-standaardafwyking σx: opsie 3."), answerLabel: L("3 (σx) — the population standard deviation", "3 (σx): die populasie-standaardafwyking") });
}

function genVarFromSd() {
  const sd = randInt(2, 12), v = sd * sd;
  return {
    type: "calc", concept: L("variance", "variance"), dp: 0, expected: v, answerLabel: `${v}`,
    prompt: L(`A data set has standard deviation σ = <b>${sd}</b>. Calculate the <b>variance</b>.`, `'n Datastel het standaardafwyking σ = <b>${sd}</b>. Bereken die <b>variansie</b>.`),
    hint: L("Variance is the standard deviation squared.", "Variansie is die standaardafwyking gekwadreer."),
    solution: [{ s: L(`variance = σ² = ${sd}² = ${v}`, `variansie = σ² = ${sd}² = ${v}`), r: L("variance", "variance") }],
  };
}

function genSdFromVar() {
  const sd = randInt(2, 12), v = sd * sd;
  return {
    type: "calc", concept: L("variance", "variance"), dp: 0, expected: sd, answerLabel: `${sd}`,
    prompt: L(`A data set has variance <b>${v}</b>. Calculate the <b>standard deviation</b>.`, `'n Datastel het variansie <b>${v}</b>. Bereken die <b>standaardafwyking</b>.`),
    hint: L("Standard deviation is the square root of the variance.", "Standaardafwyking is die vierkantswortel van die variansie."),
    solution: [{ s: L(`σ = √variance = √${v} = ${sd}`, `σ = √variansie = √${v} = ${sd}`), r: L("standard deviation", "standaardafwyking") }],
  };
}

function genBoundary() {
  const m = randInt(20, 60), sd = randInt(3, 12), which = pick([L("lower", "lower"), L("upper", "upper")]);
  const exp = which === L("lower", "lower") ? m - sd : m + sd;
  return {
    type: "calc", concept: "withinSD", dp: 0, allowNeg: true, expected: exp, answerLabel: `${exp}`,
    prompt: L(`A data set has mean x̄ = <b>${m}</b> and standard deviation σ = <b>${sd}</b>. Calculate the <b>${which} boundary</b> (one σ ${which === "lower" ? "below" : "above"} the mean).`, `'n Datastel het gemiddelde x̄ = <b>${m}</b> en standaardafwyking σ = <b>${sd}</b>. Bereken die <b>${which}-grens</b> (een σ ${which === "lower" ? "onder" : "bo"} die gemiddelde).`),
    hint: which === L("lower", "lower") ? L("lower = x̄ − σ.", "ondergrens = x̄ − σ.") : L("upper = x̄ + σ.", "bogrens = x̄ + σ."),
    solution: [{ s: which === L("lower", "lower") ? L(`lower = x̄ − σ = ${m} − ${sd} = ${exp}`, `ondergrens = x̄ − σ = ${m} − ${sd} = ${exp}`) : L(`upper = x̄ + σ = ${m} + ${sd} = ${exp}`, `bogrens = x̄ + σ = ${m} + ${sd} = ${exp}`), r: L(`${which} boundary`, `${which}-grens`) }],
  };
}

function genWithin() {
  let data, m, sd, lo, hi, count, countR, mR, sdR, tries = 0;
  do {
    data = sortAsc(rawset(randInt(6, 9), 10, 30));
    m = mean(data); sd = stdDev(data); lo = m - sd; hi = m + sd;
    count = data.filter(x => x >= lo - 1e-9 && x <= hi + 1e-9).length;
    // the learner works from the DISPLAYED rounded x̄ and σ — the count must agree
    mR = Math.round(m * 10) / 10; sdR = Math.round(sd * 10) / 10;
    countR = data.filter(x => x >= mR - sdR - 1e-9 && x <= mR + sdR + 1e-9).length;
    tries++;
  } while (tries < 60 && (count !== countR || data.some(x => Math.abs(x - lo) < 0.8 || Math.abs(x - hi) < 0.8)));
  return {
    type: "calc", concept: "withinSD", dp: 0, expected: count, answerLabel: `${count}`,
    prompt: L(`A data set:<br><span class="num">${list(data)}</span><br>Here x̄ ≈ ${C(mR)} and σ ≈ ${C(sdR)}. How many values lie <b>within one standard deviation</b> of the mean?`, `'n Datastel:<br><span class="num">${list(data)}</span><br>Hier is x̄ ≈ ${C(mR)} en σ ≈ ${C(sdR)}. Hoeveel waardes lê <b>binne een standaardafwyking</b> van die gemiddelde?`),
    hint: L("Work out x̄ − σ and x̄ + σ, then count the values between them.", "Werk x̄ − σ en x̄ + σ uit en tel dan die waardes tussen hulle."),
    solution: [
      { s: L(`lower = x̄ − σ ≈ ${C(Math.round((mR - sdR) * 10) / 10)};  upper = x̄ + σ ≈ ${C(Math.round((mR + sdR) * 10) / 10)}`, `ondergrens = x̄ − σ ≈ ${C(Math.round((mR - sdR) * 10) / 10)};  bogrens = x̄ + σ ≈ ${C(Math.round((mR + sdR) * 10) / 10)}`), r: L("boundaries", "grense") },
      { s: L(`Count the values inside that interval → ${count}.`, `Tel die waardes binne daardie interval → ${count}.`) },
    ],
  };
}

function genConsistency() {
  let a, b;
  do { a = randInt(25, 60) / 10; b = randInt(25, 60) / 10; } while (Math.abs(a - b) < 0.8);
  const better = a < b ? L("Set P", "Stel P") : L("Set Q", "Stel Q");
  const worse = a < b ? L("Set Q", "Stel Q") : L("Set P", "Stel P");
  return mc("stddev",
    L(`Set P has σ = <b>${C(a)}</b> and Set Q has σ = <b>${C(b)}</b>. Which set is <b>more consistent</b>?`, `Stel P het σ = <b>${C(a)}</b> en Stel Q het σ = <b>${C(b)}</b>. Watter stel is <b>meer konsekwent</b>?`),
    better, [worse, L("They are equally consistent", "Hulle is ewe konsekwent")],
    { hint: L("More consistent = less spread = the SMALLER standard deviation.", "Meer konsekwent = minder spreiding = die KLEINER standaardafwyking."),
      solution: [{ s: L(`${better} has the smaller σ, so its data is more consistent.`, `${better} het die kleiner σ, dus is sy data meer konsekwent.`) }] });
}

export const quest07 = {
  id: "q7",
  skills: [
    { id: "meaning", concept: "stddev", gen: genMeaning },
    { id: "calcKey", concept: "stddev", gen: genCalcKey },
    { id: "varFromSd", concept: L("variance", "variance"), gen: genVarFromSd },
    { id: "sdFromVar", concept: L("variance", "variance"), gen: genSdFromVar },
    { id: "boundary", concept: "withinSD", gen: genBoundary },
    { id: "within", concept: "withinSD", gen: genWithin },
    { id: "consistency", concept: "stddev", gen: genConsistency },
  ],
};
