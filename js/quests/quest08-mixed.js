/* ============================================================
   QUEST 8 · Mixed exam favourites
   Comparing two box plots, the effect of adding a constant to
   every value (centre shifts, spread doesn't), and a couple of
   the harder "find the unknown" ones.
   ============================================================ */
import { randInt, pick } from "../ui.js";
import { C, mc, rng } from "./_shared.js";
import { L } from "../lang.js";

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
    { name: L("mean", "gemiddelde"), up: true }, { name: L("median", "mediaan"), up: true },
    { name: L("range", "omvang"), up: false }, { name: L("interquartile range (IQR)", "interkwartielomvang"), up: false },
    { name: L("standard deviation", "standaardafwyking"), up: false }, { name: L("variance", "variansie"), up: false },
  ];
  const m = pick(measures);
  const correct = m.up ? L(`It increases by ${k}`, `Dit vermeerder met ${k}`) : L("It stays the same", "Dit bly dieselfde");
  const wrongs = m.up
    ? [L("It stays the same", "Dit bly dieselfde"), L(`It decreases by ${k}`, `Dit verminder met ${k}`), L(`It is multiplied by ${k}`, `Dit word met ${k} vermenigvuldig`)]
    : [L(`It increases by ${k}`, `Dit vermeerder met ${k}`), L(`It is multiplied by ${k}`, `Dit word met ${k} vermenigvuldig`), L(`It decreases by ${k}`, `Dit verminder met ${k}`)];
  return mc("effect",
    L(`Every value in a data set is increased by <b>${k}</b>. What happens to the <b>${m.name}</b>?`, `Elke waarde in 'n datastel word met <b>${k}</b> vermeerder. Wat gebeur met die <b>${m.name}</b>?`),
    correct, wrongs,
    { hint: L("Adding the same number to every value shifts the centre but not the spread.", "As jy dieselfde getal by elke waarde tel, skuif die sentrum, maar nie die spreiding nie."),
      solution: [{ s: m.up ? L(`The ${m.name} shifts up by ${k}.`, `Die ${m.name} skuif ${k} op.`) : L(`Spread is unchanged — the ${m.name} stays the same.`, `Die spreiding verander nie: die ${m.name} bly dieselfde.`) }] });
}

/* ---------- effect on the mean (value) ---------- */
function genEffectMean() {
  const M = randInt(20, 60), k = randInt(2, 9), add = rng() < 0.6;
  const exp = add ? M + k : M - k;
  return {
    type: "calc", concept: "effect", dp: 0, allowNeg: true, expected: exp, answerLabel: `${exp}`,
    prompt: L(`The mean of a data set is <b>${M}</b>. If <b>${k}</b> is ${add ? "added to" : "subtracted from"} every value, what is the new mean?`, `Die gemiddelde van 'n datastel is <b>${M}</b>. As <b>${k}</b> ${add ? "by elke waarde opgetel" : "van elke waarde afgetrek"} word, wat is die nuwe gemiddelde?`),
    hint: L("The mean shifts by the same amount you add to (or subtract from) every value.", "Die gemiddelde skuif met dieselfde hoeveelheid wat jy by elke waarde tel (of van elke waarde aftrek)."),
    solution: [{ s: L(`new mean = ${M} ${add ? "+" : "−"} ${k} = ${exp}`, `nuwe gemiddelde = ${M} ${add ? "+" : "−"} ${k} = ${exp}`), r: L("effect on the mean", "effek op die gemiddelde") }],
  };
}

/* ---------- effect on σ (unchanged) ---------- */
function genSdShifted() {
  const sd = randInt(25, 80) / 10, k = randInt(2, 9);
  return mc("effect",
    L(`A data set has standard deviation σ = <b>${C(sd)}</b>. Every value is increased by <b>${k}</b>. What is the new standard deviation?`, `'n Datastel het standaardafwyking σ = <b>${C(sd)}</b>. Elke waarde word met <b>${k}</b> vermeerder. Wat is die nuwe standaardafwyking?`),
    C(sd), [C(sd + k), C(Math.round(sd * k * 10) / 10), C(Math.max(0, sd - k))],   // decoys: shifted, multiplied, shrunk
    { hint: L("Shifting every value sideways does not change how spread out the data is.", "As jy elke waarde links of regs skuif, verander dit nie hoe uitgesprei die data is nie."),
      solution: [{ s: L(`Adding a constant leaves the spread unchanged → σ stays ${C(sd)}.`, `'n Konstante bytel laat die spreiding onveranderd → σ bly ${C(sd)}.`) }] });
}

/* ---------- compare two box plots: median ---------- */
function genCompareMedian() {
  let a, b;
  do { a = randBox(); b = randBox(); } while (a.med === b.med);
  const axis = boxAxis(Math.max(a.max, b.max));
  const correct = a.med > b.med ? L("Set A", "Set A") : L("Set B", "Set B");
  return mc("compareBox", L("Which set has the <b>higher median</b>?", "Watter stel het die <b>hoër mediaan</b>?"),
    correct, [correct === L("Set A", "Set A") ? L("Set B", "Set B") : L("Set A", "Set A"), L("They are equal", "Hulle is gelyk")],
    { graphs: [
        { label: L("Set A", "Set A"), spec: { type: "box", five: a, axis, showValues: true } },
        { label: L("Set B", "Set B"), spec: { type: "box", five: b, axis, showValues: true } },
      ],
      hint: L("The median is the line inside each box — which sits further right?", "Die mediaan is die lyn binne elke mond: watter een lê verder regs?"),
      solution: [{ s: L(`${correct} has its median line further along the scale.`, `${correct} se mediaanlyn lê verder langs die skaal.`) }] });
}

/* ---------- compare two box plots: spread ---------- */
function genCompareSpread() {
  let a, b;
  do { a = randBox(); b = randBox(); } while (rangeOf(a) === rangeOf(b));
  const axis = boxAxis(Math.max(a.max, b.max));
  const correct = rangeOf(a) > rangeOf(b) ? L("Set A", "Set A") : L("Set B", "Set B");
  return mc("compareBox", L("Which set is <b>more spread out</b> (larger range)?", "Watter stel is <b>meer uitgesprei</b> (groter omvang)?"),
    correct, [correct === L("Set A", "Set A") ? L("Set B", "Set B") : L("Set A", "Set A"), L("They are equally spread", "Hulle is ewe uitgesprei")],
    { graphs: [
        { label: L("Set A", "Set A"), spec: { type: "box", five: a, axis, showValues: true } },
        { label: L("Set B", "Set B"), spec: { type: "box", five: b, axis, showValues: true } },
      ],
      hint: L("Range = distance from the left whisker end to the right whisker end.", "Omvang = afstand van die punt van die linkersnor tot die punt van die regtersnor."),
      solution: [{ s: L(`${correct} stretches further from minimum to maximum → larger range.`, `${correct} strek verder van minimum tot maksimum → groter omvang.`) }] });
}

/* ---------- find an unknown quartile from the IQR ---------- */
function genFindUnknown() {
  const iqrV = randInt(8, 24), which = pick(["q3", "q1"]);
  if (which === "q3") {
    const q1 = randInt(15, 40), q3 = q1 + iqrV;
    return {
      type: "calc", concept: "iqr", dp: 0, expected: q3, answerLabel: `${q3}`,
      prompt: L(`A data set has an IQR of <b>${iqrV}</b> and <b>Q1 = ${q1}</b>. Find <b>Q3</b>.`, `'n Datastel het 'n interkwartielomvang van <b>${iqrV}</b> en <b>Q1 = ${q1}</b>. Vind <b>Q3</b>.`),
      hint: L("IQR = Q3 − Q1, so Q3 = Q1 + IQR.", "Interkwartielomvang = Q3 − Q1, dus Q3 = Q1 + interkwartielomvang."),
      solution: [{ s: L(`Q3 = Q1 + IQR = ${q1} + ${iqrV} = ${q3}`, `Q3 = Q1 + interkwartielomvang = ${q1} + ${iqrV} = ${q3}`), r: L("interquartile range", "interkwartielomvang") }],
    };
  }
  const q3 = randInt(35, 60), q1 = q3 - iqrV;
  return {
    type: "calc", concept: "iqr", dp: 0, expected: q1, answerLabel: `${q1}`,
    prompt: L(`A data set has an IQR of <b>${iqrV}</b> and <b>Q3 = ${q3}</b>. Find <b>Q1</b>.`, `'n Datastel het 'n interkwartielomvang van <b>${iqrV}</b> en <b>Q3 = ${q3}</b>. Vind <b>Q1</b>.`),
    hint: L("IQR = Q3 − Q1, so Q1 = Q3 − IQR.", "Interkwartielomvang = Q3 − Q1, dus Q1 = Q3 − interkwartielomvang."),
    solution: [{ s: L(`Q1 = Q3 − IQR = ${q3} − ${iqrV} = ${q1}`, `Q1 = Q3 − interkwartielomvang = ${q3} − ${iqrV} = ${q1}`), r: L("interquartile range", "interkwartielomvang") }],
  };
}

/* ---------- variance unchanged after a shift ---------- */
function genVarShift() {
  const sd = randInt(2, 8), v = sd * sd, k = randInt(2, 9);
  return {
    type: "calc", concept: "effect", dp: 0, expected: v, answerLabel: `${v}`,
    prompt: L(`A data set has variance <b>${v}</b>. Every value is increased by <b>${k}</b>. What is the new variance?`, `'n Datastel het variansie <b>${v}</b>. Elke waarde word met <b>${k}</b> vermeerder. Wat is die nuwe variansie?`),
    hint: L("Adding a constant doesn’t change the spread — so the variance is unchanged.", "'n Konstante bytel verander nie die spreiding nie, dus bly die variansie onveranderd."),
    solution: [{ s: L(`Adding a constant leaves the spread unchanged → variance stays ${v}.`, `'n Konstante bytel laat die spreiding onveranderd → variansie bly ${v}.`), r: L("effect on spread", "effek op spreiding") }],
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
