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
import { L } from "../lang.js";

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

const QLABEL = { q1: L("Q1 (the lower quartile)", "Q1 (die onderste kwartiel)"), q2: L("the median (Q2)", "die mediaan (Q2)"), q3: L("Q3 (the upper quartile)", "Q3 (die boonste kwartiel)") };
const QFORMULA = { q1: L("(n + 1)/4", "(n + 1)/4"), q2: L("(n + 1)/2", "(n + 1)/2"), q3: L("3(n + 1)/4", "3(n + 1)/4") };
function posExpr(n, which) {
  return which === L("q1", "q1") ? `(${n} + 1)/4` : which === L("q2", "q2") ? `(${n} + 1)/2` : `3(${n} + 1)/4`;
}

/* ---------- 1 · quartile position (formula) ---------- */
function genPos() {
  const n = randInt(7, 16);
  const which = pick([L("q1", "q1"), L("q2", "q2"), L("q3", "q3")]);
  const correct = quartilePos(n, which);
  const noPlus = which === L("q1", "q1") ? n / 4 : which === L("q2", "q2") ? n / 2 : 3 * n / 4;   // forgot the +1
  const wrongDiv = which === L("q2", "q2") ? (n + 1) / 4 : (n + 1) / 2;                  // wrong divisor
  return {
    type: "mc", concept: L("quartiles", "quartiles"),
    prompt: L(`A data set has <b>${n}</b> values arranged in order. What is the <b>position</b> of ${QLABEL[which]}?`, `'n Datastel het <b>${n}</b> waardes in volgorde. Wat is die <b>posisie</b> van ${QLABEL[which]}?`),
    options: mcNum(correct, [noPlus, wrongDiv, correct + 1, n + 1]),
    answerLabel: L(`position ${C(correct)}`, `posisie ${C(correct)}`),
    hint: L("Use the position formula — it’s a fraction of (n + 1), not of n.", "Gebruik die posisieformule: dit is 'n breuk van (n + 1), nie van n nie."),
    solution: [{ s: L(`position of ${which.toUpperCase()} = ${QFORMULA[which]} = ${posExpr(n, which)} = ${C(correct)}`, `posisie van ${which.toUpperCase()} = ${QFORMULA[which]} = ${posExpr(n, which)} = ${C(correct)}`), r: L("quartile position", "kwartielposisie") }],
  };
}

/* ---------- 2 · read a quartile value from an ordered list ---------- */
function genValue() {
  const n = pick([7, 9, 11]);
  const data = dataset(n, 4, 60);
  const which = pick([L("q1", "q1"), L("q2", "q2"), L("q3", "q3")]);
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
  const otherQ = [L("q1", "q1"), L("q2", "q2"), L("q3", "q3")].filter(w => w !== which).map(w => quartileValue(data, w));
  const decoys = [
    ...shuffled([...near.filter(Number.isFinite), ...otherQ]),
    ...shuffled(data.filter(v => C(v) !== C(val))),
  ];
  return {
    type: "mc", concept: L("quartiles", "quartiles"), layout: "grid2",
    prompt: L(`An ordered data set:<br><span class="num">${list(data)}</span><br>Find ${QLABEL[which]}.`, `'n Gerangskikte datastel:<br><span class="num">${list(data)}</span><br>Vind ${QLABEL[which]}.`),
    options: mcNum(val, decoys),
    answerLabel: `${which.toUpperCase()} = ${C(val)}`,
    hint: L("Find the position first, apply the rounding rule, then count to that spot in the list.", "Vind eers die posisie, pas die afrondingsreël toe en tel dan tot by daardie plek in die lys."),
    solution: [
      { s: L(`position of ${which.toUpperCase()} = ${QFORMULA[which]} = ${C(pos)}`, `posisie van ${which.toUpperCase()} = ${QFORMULA[which]} = ${C(pos)}`), r: L("quartile position", "kwartielposisie") },
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
    prompt: L(`For a data set, <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the interquartile range (IQR).`, `Vir 'n datastel is <b>Q1 = ${q1}</b> en <b>Q3 = ${q3}</b>. Bereken die interkwartielomvang.`),
    expected: ans, answerLabel: `${ans}`,
    hint: L("The IQR is the spread of the middle half — subtract the lower quartile from the upper.", "Die interkwartielomvang is die spreiding van die middelste helfte: trek die onderste kwartiel van die boonste af."),
    solution: [{ s: L(`IQR = Q3 − Q1 = ${q3} − ${q1} = ${ans}`, `interkwartielomvang = Q3 − Q1 = ${q3} − ${q1} = ${ans}`), r: L("interquartile range", "interkwartielomvang") }],
  };
}

/* ---------- 4 · IQR from an ordered list (multi-step) ---------- */
function genIqrFromList() {
  const n = pick([7, 11]);
  const data = dataset(n, 5, 70);
  const q1 = quartileValue(data, L("q1", "q1")), q3 = quartileValue(data, L("q3", "q3")), ans = q3 - q1;
  return {
    type: "calc", concept: "iqr", dp: (Number.isInteger(ans) ? 0 : 1),
    prompt: L(`An ordered data set:<br><span class="num">${list(data)}</span><br>Calculate the IQR.`, `'n Gerangskikte datastel:<br><span class="num">${list(data)}</span><br>Bereken die interkwartielomvang.`),
    expected: ans, answerLabel: L(`IQR = ${C(ans)}`, `interkwartielomvang = ${C(ans)}`),
    hint: L("Find Q1 and Q3 from the list first, then IQR = Q3 − Q1.", "Vind eers Q1 en Q3 uit die lys, dan interkwartielomvang = Q3 − Q1."),
    solution: [
      { s: L(`Q1 = ${C(q1)} and Q3 = ${C(q3)}`, `Q1 = ${C(q1)} en Q3 = ${C(q3)}`), r: L("quartiles", "quartiles") },
      { s: L(`IQR = Q3 − Q1 = ${C(q3)} − ${C(q1)} = ${C(ans)}`, `interkwartielomvang = Q3 − Q1 = ${C(q3)} − ${C(q1)} = ${C(ans)}`), r: L("interquartile range", "interkwartielomvang") },
    ],
  };
}

/* ---------- 4b · semi-quartile range ---------- */
function genSemiIqr() {
  const q1 = randInt(12, 45), q3 = q1 + 2 * randInt(4, 14);   // even IQR → whole-number answer
  const iqrV = q3 - q1, ans = iqrV / 2;
  return {
    type: "calc", concept: "iqr", dp: 0,
    prompt: L(`For a data set, <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the <b>semi-quartile range</b>.`, `Vir 'n datastel is <b>Q1 = ${q1}</b> en <b>Q3 = ${q3}</b>. Bereken die <b>semi-interkwartielomvang</b>.`),
    expected: ans, answerLabel: `${ans}`,
    hint: L("The semi-quartile range is HALF the interquartile range: (Q3 − Q1) ÷ 2.", "Die semi-interkwartielomvang is die HELFTE van die interkwartielomvang: (Q3 − Q1) ÷ 2."),
    solution: [
      { s: L(`IQR = Q3 − Q1 = ${q3} − ${q1} = ${iqrV}`, `interkwartielomvang = Q3 − Q1 = ${q3} − ${q1} = ${iqrV}`), r: L("interquartile range", "interkwartielomvang") },
      { s: L(`semi-quartile range = IQR / 2 = ${iqrV} / 2 = ${ans}`, `semi-interkwartielomvang = interkwartielomvang / 2 = ${iqrV} / 2 = ${ans}`), r: L("semi-quartile range", "semi-interkwartielomvang") },
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
  const which = pick([L("median", "median"), L("q1", "q1"), L("q3", "q3"), L("min", "min"), L("max", "max")]);
  const map = { median: five.med, q1: five.q1, q3: five.q3, min: five.min, max: five.max };
  const name = { median: L("median", "median"), q1: L("lower quartile (Q1)", "onderste kwartiel (Q1)"), q3: L("upper quartile (Q3)", "boonste kwartiel (Q3)"), min: L("minimum", "minimum"), max: L("maximum", "maksimum") }[which];
  const where = {
    median: L("the line inside the box", "die lyn binne die mond"), q1: L("the left edge of the box", "die linkerkant van die mond"),
    q3: L("the right edge of the box", "die regterkant van die mond"), min: L("the left whisker end", "die punt van die linkersnor"), max: L("the right whisker end", "die punt van die regtersnor"),
  }[which];
  return {
    type: "calc", concept: "boxplot", dp: 0, tol: TOL.graphRead, unit: "",
    graph: { type: "box", five, axis: boxAxis(five.max), showValues: false },
    graphCap: L("read the value off the number line", "lees die waarde van die getallelyn af"),
    prompt: L(`Read the <b>${name}</b> off the box-and-whisker plot.`, `Lees die <b>${name}</b> van die mond-en-snor-diagram af.`),
    expected: map[which], answerLabel: `≈ ${map[which]}`,
    hint: L(`Look at ${where}, then read straight down to the number line.`, `Kyk na ${where} en lees dan reguit af na die getallelyn.`),
    solution: [{ s: L(`The ${name} is ${where} — read it off as ≈ ${map[which]}.`, `Die ${name} is ${where}: lees dit af as ≈ ${map[which]}.`) }],
  };
}

/* ---------- 6 · tap a part of the box plot ---------- */
function genTapBox() {
  const five = fiveSummary();
  const target = pick([
    { id: "box", q: L("Tap the part of the plot that shows the <b>interquartile range</b>.", "Klik op die deel van die diagram wat die <b>interkwartielomvang</b> wys."), a: L("the box — from Q1 to Q3", "die mond, van Q1 tot Q3") },
    { id: L("median", "median"), q: L("Tap the <b>median</b>.", "Klik op die <b>mediaan</b>."), a: L("the line inside the box", "die lyn binne die mond") },
    { id: "whiskerL", q: L("Tap the section holding the <b>lowest 25%</b> of the data.", "Klik op die deel met die <b>laagste 25%</b> van die data."), a: L("the left whisker (minimum → Q1)", "die linkersnor (minimum → Q1)") },
    { id: "whiskerR", q: L("Tap the section holding the <b>highest 25%</b> of the data.", "Klik op die deel met die <b>hoogste 25%</b> van die data."), a: L("the right whisker (Q3 → maximum)", "die regtersnor (Q3 → maksimum)") },
  ]);
  return {
    type: "tap", concept: "boxplot",
    graph: { type: "box", five, axis: boxAxis(five.max), showValues: true },
    tap: { targets: ["whiskerL", "box", L("median", "median"), "whiskerR"], correctId: target.id },
    prompt: target.q,
    tapHint: L("Tap the matching part of the box-and-whisker plot.", "Klik op die regte deel van die mond-en-snor-diagram."),
    answerLabel: target.a,
    hint: L("The box is Q1→Q3 (the IQR); the line inside is the median; each whisker is a 25% tail.", "Die mond is Q1→Q3 (die interkwartielomvang); die lyn binne is die mediaan; elke snor is 'n 25%-stert."),
    solution: [{ s: L(`That is ${target.a}. Each of the four sections holds about 25% of the data.`, `Dit is ${target.a}. Elk van die vier dele bevat sowat 25% van die data.`) }],
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
  const isLower = pick([true, false]);   // the data (same draw as the old pick of two words)
  const which = isLower ? L("lower", "onder") : L("upper", "bo");   // what the learner reads (T93B split)
  const ans = isLower ? lower : upper;
  const dp = Number.isInteger(ans) ? 0 : 1;
  const boundaryVal = isLower ? q1 : q3;
  return {
    type: "steps", concept: "outliers",
    prompt: L(`A data set has <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Calculate the <b>${which} boundary</b> for outliers.`, `'n Datastel het <b>Q1 = ${q1}</b> en <b>Q3 = ${q3}</b>. Bereken die <b>${which}grens</b> vir uitskieters.`),
    steps: [
      calcStep(L("First the IQR.", "Eers die interkwartielomvang."), range, L("IQR = Q3 − Q1", "Interkwartielomvang = Q3 − Q1"), { dp: 0 }),
      {
        kind: "tokenpad",
        prompt: L("Build the boundary. Tap a piece to drop it into the next box.", "Bou die grens. Klik op 'n stuk om dit in die volgende blokkie te plaas."),
        frame: [L("boundary", "grens"), "=", SLOT, isLower ? "−" : "+", "1,5", "×", SLOT],
        keys: shuffleChips([String(q1), String(q3), String(range)]),
        expected: joinThin([String(boundaryVal), String(range)]),
        hint: L("Below Q1 for the lower boundary, above Q3 for the upper — always 1,5 × IQR.", "Onder Q1 vir die ondergrens, bo Q3 vir die bogrens: altyd 1,5 × interkwartielomvang."),
      },
      calcStep(dp === 1 ? L("Now calculate the boundary itself (1 decimal).", "Bereken nou die grens self (1 desimale plek).") : L("Now calculate the boundary itself.", "Bereken nou die grens self."), ans,
        isLower
          ? L(`lower = Q1 − 1,5 × IQR = ${q1} − 1,5 × ${range}.`, `ondergrens = Q1 − 1,5 × interkwartielomvang = ${q1} − 1,5 × ${range}.`)
          : L(`upper = Q3 + 1,5 × IQR = ${q3} + 1,5 × ${range}.`, `bogrens = Q3 + 1,5 × interkwartielomvang = ${q3} + 1,5 × ${range}.`),
        { dp, allowNeg: true, tol: 0.001 }),
    ],
    expected: ans, dp, allowNeg: true,
    answerLabel: C(ans),
    hint: L("Find the IQR first, then go 1,5 × IQR beyond the quartile (below Q1, or above Q3).", "Vind eers die interkwartielomvang en gaan dan 1,5 × interkwartielomvang verby die kwartiel (onder Q1, of bo Q3)."),
    solution: [
      { s: L(`IQR = Q3 − Q1 = ${q3} − ${q1} = ${range}`, `interkwartielomvang = Q3 − Q1 = ${q3} − ${q1} = ${range}`), r: L("interquartile range", "interkwartielomvang") },
      isLower
        ? { s: L(`lower = Q1 − 1,5 × IQR = ${q1} − 1,5 × ${range} = ${C(lower)}`, `ondergrens = Q1 − 1,5 × interkwartielomvang = ${q1} − 1,5 × ${range} = ${C(lower)}`), r: L("lower boundary", "ondergrens") }
        : { s: L(`upper = Q3 + 1,5 × IQR = ${q3} + 1,5 × ${range} = ${C(upper)}`, `bogrens = Q3 + 1,5 × interkwartielomvang = ${q3} + 1,5 × ${range} = ${C(upper)}`), r: L("upper boundary", "bogrens") },
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
    prompt: L(`A data set has <b>Q1 = ${q1}</b> and <b>Q3 = ${q3}</b>. Is the value <b>${x}</b> an outlier?`, `'n Datastel het <b>Q1 = ${q1}</b> en <b>Q3 = ${q3}</b>. Is die waarde <b>${x}</b> 'n uitskieter?`),
    answerLabel: isOut ? L("Yes — it lies outside the boundaries", "Ja, dit lê buite die grense") : L("No — it lies within the boundaries", "Nee, dit lê binne die grense"),
    hint: L("Find the boundaries Q1 − 1,5×IQR and Q3 + 1,5×IQR. A value beyond them is an outlier.", "Vind die grense Q1 − 1,5×interkwartielomvang en Q3 + 1,5×interkwartielomvang. 'n Waarde buite hulle is 'n uitskieter."),
    solution: [
      { s: L(`IQR = ${q3} − ${q1} = ${range}`, `interkwartielomvang = ${q3} − ${q1} = ${range}`), r: L("IQR", "interkwartielomvang") },
      { s: L(`lower = ${C(lower)} and upper = ${C(upper)}`, `ondergrens = ${C(lower)} en bogrens = ${C(upper)}`), r: L("boundaries", "grense") },
      { s: L(`${x} lies ${isOut ? "outside" : "inside"} [${C(lower)} ; ${C(upper)}] → ${isOut ? "an outlier" : "not an outlier"}`, `${x} lê ${isOut ? "buite" : "binne"} [${C(lower)} ; ${C(upper)}] → ${isOut ? "'n uitskieter" : "nie 'n uitskieter nie"}`) },
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
    prompt: L(`A data set has <b>${n}</b> values in order. Calculate the <b>position</b> of the ${p}th percentile.`, `'n Datastel het <b>${n}</b> waardes in volgorde. Bereken die <b>posisie</b> van die p-de persentiel met p = ${p}.`),
    expected: ans, answerLabel: L(`position ${C(ans)}`, `posisie ${C(ans)}`),
    hint: L("Use position = (n + 1) × p/100.", "Gebruik posisie = (n + 1) × p/100."),
    solution: [{ s: L(`position = (n + 1) × ${p}/100 = ${n + 1} × ${C(p / 100)} = ${C(ans)}`, `posisie = (n + 1) × ${p}/100 = ${n + 1} × ${C(p / 100)} = ${C(ans)}`), r: L("percentile position", "persentielposisie") }],
  };
}

export const quest03 = {
  id: L("q3", "q3"),
  skills: [
    { id: "pos", concept: L("quartiles", "quartiles"), gen: genPos },
    { id: "value", concept: L("quartiles", "quartiles"), gen: genValue },
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
