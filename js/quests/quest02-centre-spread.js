/* ============================================================
   QUEST 2 · Ungrouped data — centre & spread
   Mean, mode, median, range; reading an ordered list; and the
   recall of which measures describe centre vs spread.
   ============================================================ */
import { randInt, pick, shuffled } from "../ui.js";
import { sum, mean, median, range } from "../statlib.js";
import { C, list, dataset, rawset, mcNum, mc } from "./_shared.js";
import { L } from "../lang.js";

/* ---------- which measure? (recall) ---------- */
function genMeasure() {
  const spread = [L("the range", "die omvang"), L("the interquartile range", "die interkwartielomvang"), L("the standard deviation", "die standaardafwyking")];
  const centre = [L("the mean", "die gemiddelde"), L("the median", "die mediaan"), L("the mode", "die modus")];
  const ask = pick(["spread", "centre"]);
  const correctPool = ask === "spread" ? spread : centre;
  const decoyPool = ask === "spread" ? centre : spread;
  const correct = pick(correctPool);
  return mc(L("mean", "mean"),
    L(`Which of these is a measure of <b>${ask === "spread" ? "spread (dispersion)" : "central tendency (centre)"}</b>?`, `Watter een hiervan is 'n maatstaf van <b>${ask === "spread" ? "spreiding" : "sentrale neiging (sentrum)"}</b>?`),
    correct, shuffled(decoyPool).slice(0, 3),
    { hint: ask === "spread" ? L("Spread tells you how scattered the data is.", "Spreiding sê vir jou hoe uitgesprei die data is.") : L("Centre tells you a typical or middle value.", "Sentrum gee vir jou 'n tipiese of middelste waarde."),
      solution: [{ s: L(`${correct} is a measure of ${ask === "spread" ? "spread" : "central tendency"}.`, `${correct} is 'n maatstaf van ${ask === "spread" ? "spreiding" : "sentrale neiging"}.`) }] });
}

/* ---------- mean (keypad) ---------- */
function genMean() {
  const n = randInt(5, 8);
  const data = rawset(n, 2, 20);
  const m = mean(data), dp = Number.isInteger(m) ? 0 : 1;
  const mR = Math.round(m * 10) / 10;   // shown to the same dp the keypad marks at
  return {
    type: "calc", concept: L("mean", "mean"), dp, expected: m, answerLabel: C(mR),
    prompt: L(`Calculate the <b>mean</b> of:<br><span class="num">${list(data)}</span>${dp ? "<br>(round to 1 decimal place)" : ""}`, `Bereken die <b>gemiddelde</b> van:<br><span class="num">${list(data)}</span>${dp ? "<br>(rond af tot 1 desimale plek)" : ""}`),
    hint: L("Add all the values, then divide by how many there are.", "Tel al die waardes op en deel dan deur hoeveel daar is."),
    solution: [{ s: L(`x̄ = Σx / n = ${sum(data)} / ${n} ${mR === m ? "=" : "≈"} ${C(mR)}`, `x̄ = Σx / n = ${sum(data)} / ${n} ${mR === m ? "=" : "≈"} ${C(mR)}`), r: L("mean", "mean") }],
  };
}

/* ---------- mean → total (reverse) ---------- */
function genTotal() {
  const n = randInt(5, 12), m = randInt(6, 20), total = m * n;
  return {
    type: "calc", concept: L("mean", "mean"), dp: 0, expected: total, answerLabel: `${total}`,
    prompt: L(`The mean of <b>${n}</b> values is <b>${m}</b>. Calculate the <b>sum</b> of the values (Σx).`, `Die gemiddelde van <b>${n}</b> waardes is <b>${m}</b>. Bereken die <b>som</b> van die waardes (Σx).`),
    hint: L("Rearrange x̄ = Σx / n into Σx = x̄ × n.", "Herskryf x̄ = Σx / n as Σx = x̄ × n."),
    solution: [{ s: L(`Σx = x̄ × n = ${m} × ${n} = ${total}`, `Σx = x̄ × n = ${m} × ${n} = ${total}`), r: L("mean", "mean") }],
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
    type: "mc", concept: L("mean", "mean"), layout: "grid2",
    prompt: L(`Find the <b>median</b> of:<br><span class="num">${list(data)}</span>`, `Vind die <b>mediaan</b> van:<br><span class="num">${list(data)}</span>`),
    options: mcNum(med, decoys),
    answerLabel: L(`median = ${C(med)}`, `mediaan = ${C(med)}`),
    hint: L("The data is already in order — the median is the middle value.", "Die data is reeds in volgorde: die mediaan is die middelste waarde."),
    solution: [{ s: L(`n = ${n}, middle position = ${(n + 1) / 2} → median = ${C(med)}`, `n = ${n}, middelste posisie = ${(n + 1) / 2} → mediaan = ${C(med)}`), r: L("median", "median") }],
  };
}

/* ---------- mode (read off) ---------- */
function genMode() {
  const base = dataset(randInt(4, 5), 2, 18);
  const m = pick(base);
  const arr = shuffled([...base, m, m]);
  return {
    type: "mc", concept: L("mean", "mean"), layout: "grid2",
    prompt: L(`Find the <b>mode</b> of:<br><span class="num">${list(arr)}</span>`, `Vind die <b>modus</b> van:<br><span class="num">${list(arr)}</span>`),
    options: mcNum(m, shuffled(base.filter(v => v !== m)).slice(0, 3)),
    answerLabel: L(`mode = ${m}`, `modus = ${m}`),
    hint: L("The mode is the value that appears most often.", "Die modus is die waarde wat die meeste voorkom."),
    solution: [{ s: L(`${m} appears most often → mode = ${m}`, `${m} kom die meeste voor → modus = ${m}`), r: L("mode", "mode") }],
  };
}

/* ---------- range (keypad) ---------- */
function genRange() {
  const data = dataset(randInt(5, 8), 3, 60);
  const r = range(data), mx = Math.max(...data), mn = Math.min(...data);
  return {
    type: "calc", concept: L("mean", "mean"), dp: 0, expected: r, answerLabel: `${r}`,
    prompt: L(`Calculate the <b>range</b> of:<br><span class="num">${list(data)}</span>`, `Bereken die <b>omvang</b> van:<br><span class="num">${list(data)}</span>`),
    hint: L("Range = largest value − smallest value.", "Omvang = grootste waarde − kleinste waarde."),
    solution: [{ s: L(`range = max − min = ${mx} − ${mn} = ${r}`, `omvang = maks − min = ${mx} − ${mn} = ${r}`), r: L("range", "range") }],
  };
}

export const quest02 = {
  id: "q2",
  skills: [
    { id: "measure", concept: L("mean", "mean"), gen: genMeasure },
    { id: L("mean", "mean"), concept: L("mean", "mean"), gen: genMean },
    { id: L("median", "median"), concept: L("mean", "mean"), gen: genMedian },
    { id: L("mode", "mode"), concept: L("mean", "mean"), gen: genMode },
    { id: L("range", "range"), concept: L("mean", "mean"), gen: genRange },
    { id: "total", concept: L("mean", "mean"), gen: genTotal },
  ],
};
