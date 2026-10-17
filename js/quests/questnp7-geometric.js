/* ============================================================
   NUMBER PATTERNS · Q7 — Geometric patterns (+ a mixed check)
   ------------------------------------------------------------
   Constant RATIO r. General term Tₙ = a·rⁿ⁻¹ (a = T₁). Two traps:
   write a dividing pattern's ratio as a FRACTION, and never merge
   a and r — the power applies to r only (powers before ×).
   ============================================================ */
import { mc } from "./_shared.js";
import { calcQ, yesnoQ, PAT } from "./_patterns.js";
import {
  randGeo, geoSeq, geoTn, geoStr, ratioLabel, classify, classifyName, firstDiffs,
  randArith, randQuad, arithSeq, quadSeq, list, C, pick, randInt,
} from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[6];
const MINUS = "−";
const SUP = (body, ex) => `${body}<sup>${ex}</sup>`;

const SKILLS = {
  /* the ratio */
  ratio: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patGeometric",
      L(`Find the constant ratio r of <b>${list(seq)}</b>.`, `Vind die konstante verhouding r van <b>${list(seq)}</b>.`),
      r,
      { hint: L("Divide any term by the term before it.", "Deel enige term deur die vorige term."),
        answerLabel: L(`r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`, `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`),
        solution: [
          { s: L(`r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, `r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`), r: L("divide by the term before", "deel deur die vorige term") },
          { s: L(`Check: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, `Kontroleer: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`), r: L("the ratio is constant", "die verhouding is konstant") },
        ] });
  },

  /* next term */
  nextTerm: () => {
    const { seq, r } = randGeo({ integerR: true });
    const last = seq[seq.length - 1];
    return calcQ("patGeometric",
      L(`What is the next term of <b>${list(seq)}</b>?`, `Wat is die volgende term van <b>${list(seq)}</b>?`),
      last * r,
      { hint: L(`Multiply the last term by the ratio (${C(r)}).`, `Vermenigvuldig die laaste term met die verhouding (${C(r)}).`),
        answerLabel: `${C(last)} × ${C(r)} = ${C(last * r)}.`,
        solution: [
          { s: L(`r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`), r: L("constant ratio", "konstante verhouding") },
          { s: L(`next = last term × r = ${C(last)} × ${C(r)} = ${C(last * r)}`, `volgende = laaste term × r = ${C(last)} × ${C(r)} = ${C(last * r)}`) },
        ] });
  },

  /* choose the general term */
  generalTerm: () => {
    // a1 ≥ 2: with a1 = 1 the "merged a·r" trap (a·r)ⁿ⁻¹ would EQUAL a·rⁿ⁻¹,
    // making a wrong button mathematically correct.
    const a1 = pick([2, 3, 4, 5]);
    const r = pick([2, 3]);
    const seq = geoSeq(a1, r, 4);
    const correct = geoStr(a1, r);
    const lead1 = `${C(a1)} · `;
    const wrongs = [
      SUP(`(${C(a1 * r)})`, L(`n ${MINUS} 1`, `n ${MINUS} 1`)),         // merged a and r (the trap)
      `${lead1}${SUP(C(r), L("n", "n"))}`,                    // exponent n instead of n−1
      `${lead1}${SUP(C(r), L(`n + 1`, `n + 1`))}`,               // exponent n+1
    ].filter((s) => s !== correct);
    return mc("patGeometric",
      L(`Find the general term Tₙ of <b>${list(seq)}</b>.`, `Vind die algemene term Tₙ van <b>${list(seq)}</b>.`),
      correct, wrongs,
      { layout: "grid2",
        hint: L("Tₙ = a·rⁿ⁻¹ with a = T₁ and r the ratio. Keep a and r separate.", "Tₙ = a·rⁿ⁻¹ met a = T₁ en r die verhouding. Hou a en r apart."),
        answerLabel: L(`Tₙ = ${correct}.`, `Tₙ = ${correct}.`),
        solution: [
          { s: L(`a = T₁ = ${C(a1)}`, `a = T₁ = ${C(a1)}`), r: L("the first term", "die eerste term") },
          { s: L(`r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`), r: L("constant ratio", "konstante verhouding") },
          { s: L(`Tₙ = a·rⁿ⁻¹ = ${correct}`, `Tₙ = a·rⁿ⁻¹ = ${correct}`), r: L("keep a and r apart — the power sits on r only", "hou a en r apart: die mag hoort net by r") },
        ] });
  },

  /* a specific term */
  nthTerm: () => {
    const a1 = pick([1, 2, 3]);
    const r = pick([2, 3]);
    const k = r === 3 ? pick([5, 6]) : pick([6, 7, 8]);
    const seq = geoSeq(a1, r, 4);
    const power = Math.pow(r, k - 1);
    return calcQ("patGeometric",
      L(`For <b>${list(seq)} ; …</b>, find T${C(k)}.`, `Vir <b>${list(seq)} ; …</b>: vind T${C(k)}.`),
      geoTn(a1, r)(k),
      { allowNeg: false,
        hint: L(`Tₙ = a·rⁿ⁻¹ = ${C(a1)} × ${C(r)}^(${C(k)} − 1). Do the power first.`, `Tₙ = a·rⁿ⁻¹ = ${C(a1)} × ${C(r)}^(${C(k)} − 1). Werk eers die mag uit.`),
        answerLabel: L(`T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))} = ${C(geoTn(a1, r)(k))}.`, `T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))} = ${C(geoTn(a1, r)(k))}.`),
        solution: [
          { s: L(`a = ${C(a1)} and r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}  →  Tₙ = ${geoStr(a1, r)}`, `a = ${C(a1)} en r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}  →  Tₙ = ${geoStr(a1, r)}`), r: L("Tₙ = a·rⁿ⁻¹", "Tₙ = a·rⁿ⁻¹") },
          { s: L(`T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", `${C(k)} ${MINUS} 1`)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))}`, `T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", `${C(k)} ${MINUS} 1`)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))}`) },
          { s: L(`T${C(k)} = ${C(a1)} × ${C(power)} = ${C(geoTn(a1, r)(k))}`, `T${C(k)} = ${C(a1)} × ${C(power)} = ${C(geoTn(a1, r)(k))}`), r: L("power first, then multiply by a", "eers die mag, vermenigvuldig dan met a") },
        ] });
  },

  /* a dividing pattern → write r as a fraction */
  ratioAsFraction: () => {
    const { seq, r } = randGeo({ integerR: false });
    const div = Math.round(1 / r);
    const correct = ratioLabel(r);
    const wrongs = [C(div), `${MINUS}${ratioLabel(r)}`, C(2 * div)].filter((s) => s !== correct);
    return mc("patGeoCare",
      L(`In <b>${list(seq)}</b> each term is divided by ${C(div)}. Written as a multiplication, what is r?`, `In <b>${list(seq)}</b> word elke term deur ${C(div)} gedeel. Wat is r, geskryf as 'n vermenigvuldiging?`),
      correct, wrongs,
      { hint: L(`Dividing by ${C(div)} is the same as multiplying by 1 over ${C(div)}.`, `Om deur ${C(div)} te deel, is dieselfde as om met 1/${C(div)} te vermenigvuldig.`),
        answerLabel: L(`r = ${correct} (multiply by one ${div === 2 ? "half" : "over " + C(div)}).`, `r = ${correct} (vermenigvuldig met ${div === 2 ? "'n half" : "1/" + C(div)}).`),
        solution: [
          { s: L(`Dividing by ${C(div)} is the same as multiplying by 1/${C(div)}`, `Om deur ${C(div)} te deel, is dieselfde as om met 1/${C(div)} te vermenigvuldig`), r: L("÷ a number = × its reciprocal", "÷ 'n getal = × sy resiprook") },
          { s: L(`Check: ${C(seq[0])} × 1/${C(div)} = ${C(seq[1])}  →  r = ${correct}`, `Kontroleer: ${C(seq[0])} × 1/${C(div)} = ${C(seq[1])}  →  r = ${correct}`) },
        ] });
  },

  /* don't merge a and r */
  dontMerge: () => {
    return yesnoQ("patGeoCare",
      L("In Tₙ = a·rⁿ⁻¹, should you multiply a and r together <b>before</b> raising to the power?", "In Tₙ = a·rⁿ⁻¹, moet jy a en r met mekaar vermenigvuldig <b>voordat</b> jy tot die mag verhef?"),
      false,
      { hint: L("Order of operations: powers before multiplication. Do rⁿ⁻¹ first, THEN multiply by a.", "Volgorde van bewerkings: magte voor vermenigvuldiging. Werk eers rⁿ⁻¹ uit, vermenigvuldig DAN met a."),
        answerLabel: L("No — raise r to the power first, then multiply by a.", "Nee: verhef r eers tot die mag, vermenigvuldig dan met a.") });
  },

  /* mixed: classify any pattern */
  mixedClassify: () => {
    const which = pick(["arith", "quad", "geo"]);
    let seq;
    if (which === "arith") { const g = randArith(); seq = g.seq; }
    else if (which === "quad") { const g = randQuad(); seq = g.seq; }
    else { const g = randGeo({ integerR: true }); seq = g.seq; }
    const kind = classify(seq);
    const correct = classifyName[kind] || L("none of these", "geen van hierdie");
    const all = [L("arithmetic (linear)", "rekenkundig (lineêr)"), L("quadratic", "quadratic"), L("geometric", "meetkundig"), L("none of these", "geen van hierdie")];
    /* the actual test the learner should run, on THIS rolled sequence */
    const fd = firstDiffs(seq);
    const sol = kind === "arithmetic"
      ? [{ s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("next − previous", "volgende − vorige") },
         { s: L(`They are all the same`, `Hulle is almal dieselfde`), r: L("constant 1st difference → arithmetic (linear)", "konstante 1ste verskil → rekenkundig (lineêr)") }]
      : kind === L("quadratic", "quadratic")
        ? [{ s: L(`First differences: ${list(fd)}`, `Eerste verskille: ${list(fd)}`), r: L("they change → not arithmetic", "hulle verander → nie rekenkundig nie") },
           { s: L(`Second differences: ${list(firstDiffs(fd))}`, `Tweede verskille: ${list(firstDiffs(fd))}`), r: L("constant 2nd difference → quadratic", "konstante 2de verskil → kwadraties") }]
        : [{ s: L(`The differences are not constant, so divide instead`, `Die verskille is nie konstant nie, deel dus eerder`), r: L("next ÷ previous", "volgende ÷ vorige") },
           { s: L(`${C(seq[1])} ÷ ${C(seq[0])} = ${C(seq[1] / seq[0])} and ${C(seq[2])} ÷ ${C(seq[1])} = ${C(seq[2] / seq[1])}`, `${C(seq[1])} ÷ ${C(seq[0])} = ${C(seq[1] / seq[0])} en ${C(seq[2])} ÷ ${C(seq[1])} = ${C(seq[2] / seq[1])}`), r: L("same ratio → geometric", "dieselfde verhouding → meetkundig") }];
    return mc("patClassify",
      L(`Classify the pattern <b>${list(seq)}</b>.`, `Klassifiseer die patroon <b>${list(seq)}</b>.`),
      correct, all.filter((k) => k !== correct),
      { hint: L("Constant first difference → arithmetic. Constant second difference → quadratic. Constant ratio → geometric.", "Konstante eerste verskil → rekenkundig. Konstante tweede verskil → kwadraties. Konstante verhouding → meetkundig."),
        answerLabel: L(`It is ${correct}.`, `Dit is ${correct}.`),
        solution: sol });
  },
};

export const questNp7 = {
  id: "np7",
  skills: [
    { id: "ratio", concept: "patGeometric", gen: SKILLS.ratio },
    { id: "nextTerm", concept: "patGeometric", gen: SKILLS.nextTerm },
    { id: "generalTerm", concept: "patGeometric", gen: SKILLS.generalTerm },
    { id: "nthTerm", concept: "patGeometric", gen: SKILLS.nthTerm },
    { id: "ratioAsFraction", concept: "patGeoCare", gen: SKILLS.ratioAsFraction },
    { id: "dontMerge", concept: "patGeoCare", gen: SKILLS.dontMerge },
    { id: "mixedClassify", concept: "patClassify", gen: SKILLS.mixedClassify },
  ],
};
