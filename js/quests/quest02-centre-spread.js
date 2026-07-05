/* ============================================================
   QUEST 2 · Ungrouped data — centre & spread
   Mean, mode, median, range; reading an ordered list; and the
   recall of which measures describe centre vs spread.
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { sum, mean, median, range } from "../statlib.js";
import { C, list, dataset, rawset, mcNum, mc } from "./_shared.js";

/* ---------- which measure? (recall) ---------- */
function genMeasure() {
  const spread = ["the range", "the interquartile range", "the standard deviation"];
  const centre = ["the mean", "the median", "the mode"];
  const ask = pick(["spread", "centre"]);
  const correctPool = ask === "spread" ? spread : centre;
  const decoyPool = ask === "spread" ? centre : spread;
  const correct = pick(correctPool);
  return mc("mean",
    `Which of these is a measure of <b>${ask === "spread" ? "spread (dispersion)" : "central tendency (centre)"}</b>?`,
    correct, shuffled(decoyPool).slice(0, 3),
    { hint: ask === "spread" ? "Spread tells you how scattered the data is." : "Centre tells you a typical or middle value.",
      solution: [{ s: `${correct} is a measure of ${ask === "spread" ? "spread" : "central tendency"}.` }] });
}

/* ---------- mean (keypad) ---------- */
function genMean() {
  const n = randInt(5, 8);
  const data = rawset(n, 2, 20);
  const m = mean(data), dp = Number.isInteger(m) ? 0 : 1;
  const mR = Math.round(m * 10) / 10;   // shown to the same dp the keypad marks at
  return {
    type: "calc", concept: "mean", dp, expected: m, answerLabel: C(mR),
    prompt: `Calculate the <b>mean</b> of:<br><span class="num">${list(data)}</span>${dp ? "<br>(round to 1 decimal place)" : ""}`,
    hint: "Add all the values, then divide by how many there are.",
    solution: [{ s: `x̄ = Σx / n = ${sum(data)} / ${n} ${mR === m ? "=" : "≈"} ${C(mR)}`, r: "mean" }],
  };
}

/* ---------- mean → total (reverse) ---------- */
function genTotal() {
  const n = randInt(5, 12), m = randInt(6, 20), total = m * n;
  return {
    type: "calc", concept: "mean", dp: 0, expected: total, answerLabel: `${total}`,
    prompt: `The mean of <b>${n}</b> values is <b>${m}</b>. Calculate the <b>sum</b> of the values (Σx).`,
    hint: "Rearrange x̄ = Σx / n into Σx = x̄ × n.",
    solution: [{ s: `Σx = x̄ × n = ${m} × ${n} = ${total}`, r: "mean" }],
  };
}

/* ---------- median (read off) ---------- */
function genMedian() {
  const n = pick([5, 7, 9]);
  const data = dataset(n, 3, 45);
  const med = median(data);
  const mid = (n - 1) / 2;   // lead with the median's neighbours (a miscount by one), then other values
  const decoys = [...shuffled([data[mid - 1], data[mid + 1]]), ...shuffled(data.filter(v => v !== med))];
  return {
    type: "mc", concept: "mean", layout: "grid2",
    prompt: `Find the <b>median</b> of:<br><span class="num">${list(data)}</span>`,
    options: mcNum(med, decoys),
    answerLabel: `median = ${C(med)}`,
    hint: "The data is already in order — the median is the middle value.",
    solution: [{ s: `n = ${n}, middle position = ${(n + 1) / 2} → median = ${C(med)}`, r: "median" }],
  };
}

/* ---------- mode (read off) ---------- */
function genMode() {
  const base = dataset(randInt(4, 5), 2, 18);
  const m = pick(base);
  const arr = shuffled([...base, m, m]);
  return {
    type: "mc", concept: "mean", layout: "grid2",
    prompt: `Find the <b>mode</b> of:<br><span class="num">${list(arr)}</span>`,
    options: mcNum(m, shuffled(base.filter(v => v !== m)).slice(0, 3)),
    answerLabel: `mode = ${m}`,
    hint: "The mode is the value that appears most often.",
    solution: [{ s: `${m} appears most often → mode = ${m}`, r: "mode" }],
  };
}

/* ---------- range (keypad) ---------- */
function genRange() {
  const data = dataset(randInt(5, 8), 3, 60);
  const r = range(data), mx = Math.max(...data), mn = Math.min(...data);
  return {
    type: "calc", concept: "mean", dp: 0, expected: r, answerLabel: `${r}`,
    prompt: `Calculate the <b>range</b> of:<br><span class="num">${list(data)}</span>`,
    hint: "Range = largest value − smallest value.",
    solution: [{ s: `range = max − min = ${mx} − ${mn} = ${r}`, r: "range" }],
  };
}

export const quest02 = {
  id: "q2",
  skills: [
    { id: "measure", concept: "mean", gen: genMeasure },
    { id: "mean", concept: "mean", gen: genMean },
    { id: "median", concept: "mean", gen: genMedian },
    { id: "mode", concept: "mean", gen: genMode },
    { id: "range", concept: "mean", gen: genRange },
    { id: "total", concept: "mean", gen: genTotal },
  ],
};
