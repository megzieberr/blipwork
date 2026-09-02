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

const ACC = PAT[6];
const MINUS = "−";
const SUP = (body, ex) => `${body}<sup>${ex}</sup>`;

const SKILLS = {
  /* the ratio */
  ratio: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patGeometric",
      `Find the constant ratio r of <b>${list(seq)}</b>.`,
      r,
      { hint: "Divide any term by the term before it.",
        answerLabel: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`,
        solution: [
          { s: `r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, r: "divide by the term before" },
          { s: `Check: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, r: "the ratio is constant" },
        ] });
  },

  /* next term */
  nextTerm: () => {
    const { seq, r } = randGeo({ integerR: true });
    const last = seq[seq.length - 1];
    return calcQ("patGeometric",
      `What is the next term of <b>${list(seq)}</b>?`,
      last * r,
      { hint: `Multiply the last term by the ratio (${C(r)}).`,
        answerLabel: `${C(last)} × ${C(r)} = ${C(last * r)}.`,
        solution: [
          { s: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, r: "constant ratio" },
          { s: `next = last term × r = ${C(last)} × ${C(r)} = ${C(last * r)}` },
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
      SUP(`(${C(a1 * r)})`, `n ${MINUS} 1`),         // merged a and r (the trap)
      `${lead1}${SUP(C(r), "n")}`,                    // exponent n instead of n−1
      `${lead1}${SUP(C(r), `n + 1`)}`,               // exponent n+1
    ].filter((s) => s !== correct);
    return mc("patGeometric",
      `Find the general term Tₙ of <b>${list(seq)}</b>.`,
      correct, wrongs,
      { layout: "grid2",
        hint: "Tₙ = a·rⁿ⁻¹ with a = T₁ and r the ratio. Keep a and r separate.",
        answerLabel: `Tₙ = ${correct}.`,
        solution: [
          { s: `a = T₁ = ${C(a1)}`, r: "the first term" },
          { s: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, r: "constant ratio" },
          { s: `Tₙ = a·rⁿ⁻¹ = ${correct}`, r: "keep a and r apart — the power sits on r only" },
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
      `For <b>${list(seq)} ; …</b>, find T${C(k)}.`,
      geoTn(a1, r)(k),
      { allowNeg: false,
        hint: `Tₙ = a·rⁿ⁻¹ = ${C(a1)} × ${C(r)}^(${C(k)} − 1). Do the power first.`,
        answerLabel: `T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))} = ${C(geoTn(a1, r)(k))}.`,
        solution: [
          { s: `a = ${C(a1)} and r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}  →  Tₙ = ${geoStr(a1, r)}`, r: "Tₙ = a·rⁿ⁻¹" },
          { s: `T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", `${C(k)} ${MINUS} 1`)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))}` },
          { s: `T${C(k)} = ${C(a1)} × ${C(power)} = ${C(geoTn(a1, r)(k))}`, r: "power first, then multiply by a" },
        ] });
  },

  /* a dividing pattern → write r as a fraction */
  ratioAsFraction: () => {
    const { seq, r } = randGeo({ integerR: false });
    const div = Math.round(1 / r);
    const correct = ratioLabel(r);
    const wrongs = [C(div), `${MINUS}${ratioLabel(r)}`, C(2 * div)].filter((s) => s !== correct);
    return mc("patGeoCare",
      `In <b>${list(seq)}</b> each term is divided by ${C(div)}. Written as a multiplication, what is r?`,
      correct, wrongs,
      { hint: `Dividing by ${C(div)} is the same as multiplying by 1 over ${C(div)}.`,
        answerLabel: `r = ${correct} (multiply by one ${div === 2 ? "half" : "over " + C(div)}).`,
        solution: [
          { s: `Dividing by ${C(div)} is the same as multiplying by 1/${C(div)}`, r: "÷ a number = × its reciprocal" },
          { s: `Check: ${C(seq[0])} × 1/${C(div)} = ${C(seq[1])}  →  r = ${correct}` },
        ] });
  },

  /* don't merge a and r */
  dontMerge: () => {
    return yesnoQ("patGeoCare",
      "In Tₙ = a·rⁿ⁻¹, should you multiply a and r together <b>before</b> raising to the power?",
      false,
      { hint: "Order of operations: powers before multiplication. Do rⁿ⁻¹ first, THEN multiply by a.",
        answerLabel: "No — raise r to the power first, then multiply by a." });
  },

  /* mixed: classify any pattern */
  mixedClassify: () => {
    const which = pick(["arith", "quad", "geo"]);
    let seq;
    if (which === "arith") { const g = randArith(); seq = g.seq; }
    else if (which === "quad") { const g = randQuad(); seq = g.seq; }
    else { const g = randGeo({ integerR: true }); seq = g.seq; }
    const kind = classify(seq);
    const correct = classifyName[kind] || "none of these";
    const all = ["arithmetic (linear)", "quadratic", "geometric", "none of these"];
    /* the actual test the learner should run, on THIS rolled sequence */
    const fd = firstDiffs(seq);
    const sol = kind === "arithmetic"
      ? [{ s: `First differences: ${list(fd)}`, r: "next − previous" },
         { s: `They are all the same`, r: "constant 1st difference → arithmetic (linear)" }]
      : kind === "quadratic"
        ? [{ s: `First differences: ${list(fd)}`, r: "they change → not arithmetic" },
           { s: `Second differences: ${list(firstDiffs(fd))}`, r: "constant 2nd difference → quadratic" }]
        : [{ s: `The differences are not constant, so divide instead`, r: "next ÷ previous" },
           { s: `${C(seq[1])} ÷ ${C(seq[0])} = ${C(seq[1] / seq[0])} and ${C(seq[2])} ÷ ${C(seq[1])} = ${C(seq[2] / seq[1])}`, r: "same ratio → geometric" }];
    return mc("patClassify",
      `Classify the pattern <b>${list(seq)}</b>.`,
      correct, all.filter((k) => k !== correct),
      { hint: "Constant first difference → arithmetic. Constant second difference → quadratic. Constant ratio → geometric.",
        answerLabel: `It is ${correct}.`,
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
