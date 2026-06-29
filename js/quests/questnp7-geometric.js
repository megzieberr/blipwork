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
  randGeo, geoSeq, geoTn, geoStr, ratioLabel, classify, classifyName,
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
        answerLabel: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.` });
  },

  /* next term */
  nextTerm: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patGeometric",
      `What is the next term of <b>${list(seq)}</b>?`,
      seq[seq.length - 1] * r,
      { hint: `Multiply the last term by the ratio (${C(r)}).`,
        answerLabel: `${C(seq[seq.length - 1])} × ${C(r)} = ${C(seq[seq.length - 1] * r)}.` });
  },

  /* choose the general term */
  generalTerm: () => {
    const a1 = pick([1, 2, 3, 4, 5]);
    const r = pick([2, 3]);
    const seq = geoSeq(a1, r, 4);
    const correct = geoStr(a1, r);
    const lead1 = a1 === 1 ? "" : `${C(a1)} · `;
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
        answerLabel: `Tₙ = ${correct}.` });
  },

  /* a specific term */
  nthTerm: () => {
    const a1 = pick([1, 2, 3]);
    const r = pick([2, 3]);
    const k = r === 3 ? pick([5, 6]) : pick([6, 7, 8]);
    const seq = geoSeq(a1, r, 4);
    return calcQ("patGeometric",
      `For <b>${list(seq)} ; …</b>, find T${C(k)}.`,
      geoTn(a1, r)(k),
      { allowNeg: false,
        hint: `Tₙ = a·rⁿ⁻¹ = ${C(a1)} × ${C(r)}^(${C(k)} − 1). Do the power first.`,
        answerLabel: `T${C(k)} = ${C(a1)} × ${C(r)}${SUP("", C(k - 1))} = ${C(geoTn(a1, r)(k))}.` });
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
        answerLabel: `r = ${correct} (multiply by one ${div === 2 ? "half" : "over " + C(div)}).` });
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
    return mc("patClassify",
      `Classify the pattern <b>${list(seq)}</b>.`,
      correct, all.filter((k) => k !== correct),
      { hint: "Constant first difference → arithmetic. Constant second difference → quadratic. Constant ratio → geometric.",
        answerLabel: `It is ${correct}.` });
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
