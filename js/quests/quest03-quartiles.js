/* ============================================================
   QUEST 3 · Quartiles, box-and-whisker, outliers
   ------------------------------------------------------------
   Each skill.gen() returns a FRESH question (new numbers every
   call) so a wrong answer is followed by a genuine sibling, not a
   repeat. All answers come from statlib, so the key is always
   correct. Original content — nothing copied from the planning PDFs.
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { fmtComma } from "../check.js";
import { TOL } from "../config.js";
import { rng } from "../rng.js";
import { SLOT } from "../tokenpad.js";
import { calcStep } from "./_shared.js";
import {
  sortAsc, quartilePos, quartileValue, iqr, outlierBounds, percentilePos, roundNote,
} from "../statlib.js";

const C = v => fmtComma(v);                 // comma-formatted display
const list = a => a.join("  ;  ");          // ordered-list display

/* distinct, ordered integer data set of length n in [lo,hi] */
function dataset(n, lo, hi) {
  const s = new Set();
  while (s.size < n) s.add(randInt(lo, hi));
  return sortAsc([...s]);
}
/* build 4 unique numeric MC options around a correct value */
function mcNum(correct, decoys) {
  const seen = new Set([C(correct)]);
  const opts = [{ label: C(correct), correct: true }];
  for (const d of decoys) {
    if (!Number.isFinite(d)) continue;
    const l = C(d);
    if (!seen.has(l)) { seen.add(l); opts.push({ label: l, correct: false }); }
    if (opts.length >= 4) break;
  }
  return shuffled(opts);
}

/* chip-shuffle + thin-space join for the outlier-boundary build step
   (Task 1, 2026-08-30 audit-day split) — same shape as _trig.js's
   shuffleChips/joinThin, kept local here rather than imported from a
   trig-specific helper file. rng(), NOT Math.random, so a dice round's
   seeded regeneration reproduces the SAME chip order on resume. */
function shuffleChips(xs) {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/* U+2009 THIN SPACE — the tokenpad's own join separator (js/tokenpad.js's
   THIN const / _trig.js's joinThin note): normalizeTokens strips it
   before marking, so it is display-and-separation only, never marked. */
const joinThin = xs => xs.join(" ");

const QLABEL = { q1: "Q1 (the lower quartile)", q2: "the median (Q2)", q3: "Q3 (the upper quartile)" };
const QFORMULA = { q1: "(n + 1)/4", q2: "(n + 1)/2", q3: "3(n + 1)/4" };
function posExpr(n, which) {
  return which === "q1" ? `(${n} + 1)/4` : which === "q2" ? `(${n} + 1)/2` : `3(${n} + 1)/4`;
}

/* ---------- 1 · quartile position (formula) ---------- */
function genPos() {
  const n = randInt(7, 16);
  const which = pick(["q1", "q2", "q3"]);
  const correct = quartilePos(n, which);
  const noPlus = which === "q1" ? n / 4 : which === "q2" ? n / 2 : 3 * n / 4;   // forgot the +1
  const wrongDiv = which === "q2" ? (n + 1) / 4 : (n + 1) / 2;                  // wrong divisor
  return {
    type: "mc", concept: "quartiles",
    prompt: `A data set has <b>${n}</b> values arranged in order. What is the <b>position</b> of ${QLABEL[which]}?`,
    options: mcNum(correct, [noPlus, wrongDiv, correct + 1, n + 1]),
    answerLabel: `position ${C(correct)}`,
    hint: "Use the position formula — it’s a fraction of (n + 1), not of n.",
    solution: [{ s: `position of ${which.toUpperCase()} = ${QFORMULA[which]} = ${posExpr(n, which)} = ${C(correct)}`, r: "quartile position" }],
  };
}

/* ---------- 2 · read a quartile value from an ordered list ---------- */
function genValue() {
  const n = pick([7, 9, 11]);
  const data = dataset(n, 4, 60);
  const which = pick(["q1", "q2", "q3"]);
  const pos = quartilePos(n, which);
  const val = quartileValue(data, which);
  /* misconception decoys: the rounding rule applied wrong (a neighbour of the
     true spot, or the average of the wrong pair) and the other two quartiles —
     so a ,5 answer isn't the only decimal on the buttons. Random data values
     back-fill so there are always 4 buttons. */
  const fl = Math.floor(pos), fr = pos - fl;
  const near = [];
  if (Math.abs(fr - 0.5) < 1e-6) near.push(data[fl - 1], data[fl], (data[fl - 2] + data[fl - 1]) / 2, (data[fl] + data[fl + 1]) / 2);
  else if (Math.abs(fr - 0.25) < 1e-6) near.push(data[fl], (data[fl - 1] + data[fl]) / 2);
  else if (Math.abs(fr - 0.75) < 1e-6) near.push(data[fl - 1], (data[fl - 1] + data[fl]) / 2);
  else near.push(data[fl - 2], data[fl]);
  const otherQ = ["q1", "q2", "q3"].filter(w => w !== which).map(w => quartileValue(data, w));
  const decoys = [
    ...shuffled([...near.filter(Number.isFinite), ...otherQ]),
    ...shuffled(data.filter(v => C(v) !== C(val))),
  ];
  return {
    type: "mc", concept: "quartiles", layout: "grid2",
    prompt: `An ordered data set:<br><span class="num">${list(data)}</span><br>Find ${QLABEL[which]}.`,
    options: mcNum(val, decoys),
    answerLabel: `${which.toUpperCase()} = ${C(val)}`,
    hint: "Find the position first, apply the rounding rule, then count to that spot in the list.",
    solution: [
      { s: `position of ${which.toUpperCase()} = ${QFORMULA[which]} = ${C(pos)}`, r: "quartile position" },
      { s: roundNote(pos) },
      { s: `${which.toUpperCase()} = ${C(val)}` },
    ],
  };
}

/* ---------- 3 · IQR from given quartiles ---------- */
function genIqr() {
  const q1 = randInt(12, 45), q3 = q1 + randInt(7, 28);
  const ans = q3 - q1;
  return {
    type: "calc", concept: "iqr", dp: 0,
    prompt: `For a data set, <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the interquartile range (IQR).`,
    expected: ans, answerLabel: `${ans}`,
    hint: "The IQR is the spread of the middle half — subtract the lower quartile from the upper.",
    solution: [{ s: `IQR = Q3 − Q1 = ${q3} − ${q1} = ${ans}`, r: "interquartile range" }],
  };
}

/* ---------- 4 · IQR from an ordered list (multi-step) ---------- */
function genIqrFromList() {
  const n = pick([7, 11]);
  const data = dataset(n, 5, 70);
  const q1 = quartileValue(data, "q1"), q3 = quartileValue(data, "q3"), ans = q3 - q1;
  return {
    type: "calc", concept: "iqr", dp: (Number.isInteger(ans) ? 0 : 1),
    prompt: `An ordered data set:<br><span class="num">${list(data)}</span><br>Calculate the IQR.`,
    expected: ans, answerLabel: `IQR = ${C(ans)}`,
    hint: "Find Q1 and Q3 from the list first, then IQR = Q3 − Q1.",
    solution: [
      { s: `Q1 = ${C(q1)} and Q3 = ${C(q3)}`, r: "quartiles" },
      { s: `IQR = Q3 − Q1 = ${C(q3)} − ${C(q1)} = ${C(ans)}`, r: "interquartile range" },
    ],
  };
}

/* ---------- 4b · semi-quartile range ---------- */
function genSemiIqr() {
  const q1 = randInt(12, 45), q3 = q1 + 2 * randInt(4, 14);   // even IQR → whole-number answer
  const iqrV = q3 - q1, ans = iqrV / 2;
  return {
    type: "calc", concept: "iqr", dp: 0,
    prompt: `For a data set, <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the <b>semi-quartile range</b>.`,
    expected: ans, answerLabel: `${ans}`,
    hint: "The semi-quartile range is HALF the interquartile range: (Q3 − Q1) ÷ 2.",
    solution: [
      { s: `IQR = Q3 − Q1 = ${q3} − ${q1} = ${iqrV}`, r: "interquartile range" },
      { s: `semi-quartile range = IQR / 2 = ${iqrV} / 2 = ${ans}`, r: "semi-quartile range" },
    ],
  };
}

/* a tidy five-number summary for box-plot questions */
function fiveSummary() {
  const min = randInt(3, 14);
  const q1 = min + randInt(8, 16);
  const med = q1 + randInt(6, 15);
  const q3 = med + randInt(6, 15);
  const max = q3 + randInt(8, 16);
  return { min, q1, med, q3, max };
}
function boxAxis(max) {
  const step = 10;
  const axisMax = Math.ceil((max + 6) / step) * step;
  return { min: 0, max: axisMax, step };
}

/* ---------- 5 · read a value off a box-and-whisker plot ---------- */
function genReadBox() {
  const five = fiveSummary();
  const which = pick(["median", "q1", "q3", "min", "max"]);
  const map = { median: five.med, q1: five.q1, q3: five.q3, min: five.min, max: five.max };
  const name = { median: "median", q1: "lower quartile (Q1)", q3: "upper quartile (Q3)", min: "minimum", max: "maximum" }[which];
  const where = {
    median: "the line inside the box", q1: "the left edge of the box",
    q3: "the right edge of the box", min: "the left whisker end", max: "the right whisker end",
  }[which];
  return {
    type: "calc", concept: "boxplot", dp: 0, tol: TOL.graphRead, unit: "",
    graph: { type: "box", five, axis: boxAxis(five.max), showValues: false },
    graphCap: "read the value off the number line",
    prompt: `Read the <b>${name}</b> off the box-and-whisker plot.`,
    expected: map[which], answerLabel: `≈ ${map[which]}`,
    hint: `Look at ${where}, then read straight down to the number line.`,
    solution: [{ s: `The ${name} is ${where} — read it off as ≈ ${map[which]}.` }],
  };
}

/* ---------- 6 · tap a part of the box plot ---------- */
function genTapBox() {
  const five = fiveSummary();
  const target = pick([
    { id: "box", q: "Tap the part of the plot that shows the <b>interquartile range</b>.", a: "the box — from Q1 to Q3" },
    { id: "median", q: "Tap the <b>median</b>.", a: "the line inside the box" },
    { id: "whiskerL", q: "Tap the section holding the <b>lowest 25%</b> of the data.", a: "the left whisker (minimum → Q1)" },
    { id: "whiskerR", q: "Tap the section holding the <b>highest 25%</b> of the data.", a: "the right whisker (Q3 → maximum)" },
  ]);
  return {
    type: "tap", concept: "boxplot",
    graph: { type: "box", five, axis: boxAxis(five.max), showValues: true },
    tap: { targets: ["whiskerL", "box", "median", "whiskerR"], correctId: target.id },
    prompt: target.q,
    tapHint: "Tap the matching part of the box-and-whisker plot.",
    answerLabel: target.a,
    hint: "The box is Q1→Q3 (the IQR); the line inside is the median; each whisker is a 25% tail.",
    solution: [{ s: `That is ${target.a}. Each of the four sections holds about 25% of the data.` }],
  };
}

/* ---------- 7 · outlier boundary (steps, 2026-08-30 audit-day split) ----------
   Was one calc box for a 2-line working; now a build-the-formula
   tokenpad step sits between the IQR and the final number, so the
   learner picks WHICH quartile and WHICH sign, not just types a
   result. No mirror accept here — the choice IS the skill, unlike the
   trig chapter's symmetric sine-rule fills. */
function genOutBound() {
  let q1, q3, range, lower, upper;
  for (let tries = 0; tries < 200; tries++) {
    q1 = randInt(14, 40); q3 = q1 + randInt(8, 24);
    ({ iqr: range, lower, upper } = outlierBounds(q1, q3));
    if (q1 !== range && q3 !== range && q1 !== q3) break;   // three DISTINCT chips (q1≠q3 always true; kept as a floor)
  }
  const which = pick(["lower", "upper"]);
  const ans = which === "lower" ? lower : upper;
  const dp = Number.isInteger(ans) ? 0 : 1;
  const boundaryVal = which === "lower" ? q1 : q3;
  return {
    type: "steps", concept: "outliers",
    prompt: `A data set has <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the <b>${which} boundary</b> for outliers.`,
    steps: [
      calcStep("First the IQR.", range, "IQR = Q3 − Q1", { dp: 0 }),
      {
        kind: "tokenpad",
        prompt: "Build the boundary. Tap a piece to drop it into the next box.",
        frame: ["boundary", "=", SLOT, which === "lower" ? "−" : "+", "1,5", "×", SLOT],
        keys: shuffleChips([String(q1), String(q3), String(range)]),
        expected: joinThin([String(boundaryVal), String(range)]),
        hint: "Below Q1 for the lower boundary, above Q3 for the upper — always 1,5 × IQR.",
      },
      calcStep(dp === 1 ? "Now calculate the boundary itself (1 decimal)." : "Now calculate the boundary itself.", ans,
        which === "lower"
          ? `lower = Q1 − 1,5 × IQR = ${q1} − 1,5 × ${range}.`
          : `upper = Q3 + 1,5 × IQR = ${q3} + 1,5 × ${range}.`,
        { dp, allowNeg: true, tol: 0.001 }),
    ],
    expected: ans, dp, allowNeg: true,
    answerLabel: C(ans),
    hint: "Find the IQR first, then go 1,5 × IQR beyond the quartile (below Q1, or above Q3).",
    solution: [
      { s: `IQR = Q3 − Q1 = ${q3} − ${q1} = ${range}`, r: "interquartile range" },
      which === "lower"
        ? { s: `lower = Q1 − 1,5 × IQR = ${q1} − 1,5 × ${range} = ${C(lower)}`, r: "lower boundary" }
        : { s: `upper = Q3 + 1,5 × IQR = ${q3} + 1,5 × ${range} = ${C(upper)}`, r: "upper boundary" },
    ],
  };
}

/* ---------- 8 · is a value an outlier? ---------- */
function genIsOutlier() {
  const q1 = randInt(15, 40), q3 = q1 + randInt(8, 22);
  const { iqr: range, lower, upper } = outlierBounds(q1, q3);
  let x, isOut;
  if (rng() < 0.5) {
    isOut = true;
    x = rng() < 0.5 ? Math.round(lower) - randInt(1, 6) : Math.round(upper) + randInt(1, 6);
  } else {
    isOut = false;
    x = randInt(Math.ceil(lower) + 2, Math.floor(upper) - 2);
  }
  return {
    type: "yesno", concept: "outliers", yes: isOut,
    prompt: `A data set has <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Is the value <b>${x}</b> an outlier?`,
    answerLabel: isOut ? "Yes — it lies outside the boundaries" : "No — it lies within the boundaries",
    hint: "Find the boundaries Q1 − 1,5×IQR and Q3 + 1,5×IQR. A value beyond them is an outlier.",
    solution: [
      { s: `IQR = ${q3} − ${q1} = ${range}`, r: "IQR" },
      { s: `lower = ${C(lower)} and upper = ${C(upper)}`, r: "boundaries" },
      { s: `${x} lies ${isOut ? "outside" : "inside"} [${C(lower)} ; ${C(upper)}] → ${isOut ? "an outlier" : "not an outlier"}` },
    ],
  };
}

/* ---------- 9 · percentile position ---------- */
function genPercentile() {
  const n = randInt(9, 24);
  const p = pick([10, 20, 30, 40, 60, 70, 80, 90]);
  const ans = percentilePos(n, p);
  return {
    type: "calc", concept: "percentile", dp: (Number.isInteger(ans) ? 0 : 1),
    prompt: `A data set has <b>${n}</b> values in order. Calculate the <b>position</b> of the ${p}th percentile.`,
    expected: ans, answerLabel: `position ${C(ans)}`,
    hint: "Use position = (n + 1) × p/100.",
    solution: [{ s: `position = (n + 1) × ${p}/100 = ${n + 1} × ${C(p / 100)} = ${C(ans)}`, r: "percentile position" }],
  };
}

export const quest03 = {
  id: "q3",
  skills: [
    { id: "pos", concept: "quartiles", gen: genPos },
    { id: "value", concept: "quartiles", gen: genValue },
    { id: "iqr", concept: "iqr", gen: genIqr },
    { id: "iqrList", concept: "iqr", gen: genIqrFromList },
    { id: "semiIqr", concept: "iqr", gen: genSemiIqr },
    { id: "readBox", concept: "boxplot", gen: genReadBox },
    { id: "tapBox", concept: "boxplot", gen: genTapBox },
    { id: "outBound", concept: "outliers", gen: genOutBound },
    { id: "isOutlier", concept: "outliers", gen: genIsOutlier },
    { id: "percentile", concept: "percentile", gen: genPercentile },
  ],
};
