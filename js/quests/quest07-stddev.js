/* ============================================================
   QUEST 7 · Standard deviation & variance
   What σ measures, the calculator value to use, variance = σ²,
   counting values within one σ of the mean, and comparing the
   consistency of two data sets.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { mean, stdDev, sortAsc } from "../statlib.js";
import { C, list, rawset, mc } from "./_shared.js";

function genMeaning() {
  return mc("stddev",
    "What does the <b>standard deviation</b> measure?",
    "How spread out the data is around the mean",
    ["The middle value of the data", "The most common value", "The total of all the values"],
    { hint: "A bigger σ means more spread; a smaller σ means more consistent." });
}

function genCalcKey() {
  return mc("stddev",
    "The Var menu reads <span class=\"num\">1:n  2:x̄  3:σx  4:sx</span>. Which do you use for the <b>standard deviation</b>?",
    "3 (σx)", ["4 (sx)", "2 (x̄)", "1 (n)"],
    { hint: "Use the population standard deviation σx — option 3.", answerLabel: "3 (σx) — the population standard deviation" });
}

function genVarFromSd() {
  const sd = randInt(2, 12), v = sd * sd;
  return {
    type: "calc", concept: "variance", dp: 0, expected: v, answerLabel: `${v}`,
    prompt: `A data set has standard deviation σ = <b>${sd}</b>. Calculate the <b>variance</b>.`,
    hint: "Variance is the standard deviation squared.",
    solution: [{ s: `variance = σ² = ${sd}² = ${v}`, r: "variance" }],
  };
}

function genSdFromVar() {
  const sd = randInt(2, 12), v = sd * sd;
  return {
    type: "calc", concept: "variance", dp: 0, expected: sd, answerLabel: `${sd}`,
    prompt: `A data set has variance <b>${v}</b>. Calculate the <b>standard deviation</b>.`,
    hint: "Standard deviation is the square root of the variance.",
    solution: [{ s: `σ = √variance = √${v} = ${sd}`, r: "standard deviation" }],
  };
}

function genBoundary() {
  const m = randInt(20, 60), sd = randInt(3, 12), which = pick(["lower", "upper"]);
  const exp = which === "lower" ? m - sd : m + sd;
  return {
    type: "calc", concept: "withinSD", dp: 0, allowNeg: true, expected: exp, answerLabel: `${exp}`,
    prompt: `A data set has mean x̄ = <b>${m}</b> and standard deviation σ = <b>${sd}</b>. Calculate the <b>${which} boundary</b> (one σ ${which === "lower" ? "below" : "above"} the mean).`,
    hint: which === "lower" ? "lower = x̄ − σ." : "upper = x̄ + σ.",
    solution: [{ s: which === "lower" ? `lower = x̄ − σ = ${m} − ${sd} = ${exp}` : `upper = x̄ + σ = ${m} + ${sd} = ${exp}`, r: `${which} boundary` }],
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
    prompt: `A data set:<br><span class="num">${list(data)}</span><br>Here x̄ ≈ ${C(mR)} and σ ≈ ${C(sdR)}. How many values lie <b>within one standard deviation</b> of the mean?`,
    hint: "Work out x̄ − σ and x̄ + σ, then count the values between them.",
    solution: [
      { s: `lower = x̄ − σ ≈ ${C(Math.round((mR - sdR) * 10) / 10)};  upper = x̄ + σ ≈ ${C(Math.round((mR + sdR) * 10) / 10)}`, r: "boundaries" },
      { s: `Count the values inside that interval → ${count}.` },
    ],
  };
}

function genConsistency() {
  let a, b;
  do { a = randInt(25, 60) / 10; b = randInt(25, 60) / 10; } while (Math.abs(a - b) < 0.8);
  const better = a < b ? "Set P" : "Set Q";
  const worse = a < b ? "Set Q" : "Set P";
  return mc("stddev",
    `Set P has σ = <b>${C(a)}</b> and Set Q has σ = <b>${C(b)}</b>. Which set is <b>more consistent</b>?`,
    better, [worse, "They are equally consistent"],
    { hint: "More consistent = less spread = the SMALLER standard deviation.",
      solution: [{ s: `${better} has the smaller σ, so its data is more consistent.` }] });
}

export const quest07 = {
  id: "q7",
  skills: [
    { id: "meaning", concept: "stddev", gen: genMeaning },
    { id: "calcKey", concept: "stddev", gen: genCalcKey },
    { id: "varFromSd", concept: "variance", gen: genVarFromSd },
    { id: "sdFromVar", concept: "variance", gen: genSdFromVar },
    { id: "boundary", concept: "withinSD", gen: genBoundary },
    { id: "within", concept: "withinSD", gen: genWithin },
    { id: "consistency", concept: "stddev", gen: genConsistency },
  ],
};
