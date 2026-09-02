/* ============================================================
   NUMBER PATTERNS · Q1 — Spot the pattern
   ------------------------------------------------------------
   Build the difference pyramid (or look at the ratio) and decide:
   arithmetic (constant FIRST difference), quadratic (constant
   SECOND difference) or geometric (constant RATIO).
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, tapQ, calcQ, PAT, P } from "./_patterns.js";
import {
  randArith, randQuad, randGeo, classify, classifyName, firstDiffs, geoRatio,
  list, C, pick,
} from "../patternlib.js";

const ACC = PAT[0];
const KINDS = ["arithmetic (linear)", "quadratic", "geometric", "none of these"];
const wrongsFor = (correct) => KINDS.filter((k) => k !== correct);

const SKILLS = {
  /* arithmetic → classify */
  classifyArith: () => {
    const { seq, d } = randArith();
    const fd = firstDiffs(seq);
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "arithmetic (linear)", wrongsFor("arithmetic (linear)"),
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Find the FIRST differences yourself. If they are all the same, it is arithmetic.",
        answerLabel: "Arithmetic — the first difference is constant.",
        solution: [
          { s: `First differences: ${list(fd)}`, r: "next − previous" },
          { s: `Every one is ${C(d)}, so the first difference is constant`, r: "constant 1st difference → arithmetic" },
        ] });
  },

  /* quadratic → classify (show the full pyramid) */
  classifyQuad: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = firstDiffs(fd);
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "quadratic", wrongsFor("quadratic"),
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Work out the first differences — they change. Their differences (the second differences) are constant → quadratic.",
        answerLabel: "Quadratic — the second difference is constant.",
        solution: [
          { s: `First differences: ${list(fd)}`, r: "they change, so not arithmetic" },
          { s: `Second differences: ${list(sd)}`, r: "constant 2nd difference → quadratic" },
        ] });
  },

  /* geometric → classify (it's a ratio, not a difference) */
  classifyGeo: () => {
    const { seq, r } = randGeo({ integerR: true });
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "geometric", wrongsFor("geometric"),
      { hint: `Divide each term by the one before it (${C(seq[1])} ÷ ${C(seq[0])} = …). A constant ratio means geometric.`,
        answerLabel: `Geometric — you multiply by ${C(r)} each time.`,
        solution: [
          { s: `The differences are not constant, so divide instead`, r: "next ÷ previous" },
          { s: `${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)} and ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, r: "same ratio each time → geometric" },
        ] });
  },

  /* which row is the constant one? */
  whichConstant: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = firstDiffs(fd);
    return mc("patClassify",
      `For the quadratic pattern <b>${list(seq)}</b>, which differences are constant?`,
      "the second differences",
      ["the first differences", "the terms themselves", "none of them"],
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Work out the first differences (they change), then their differences (those stay the same).",
        answerLabel: "The second differences are constant.",
        solution: [
          { s: `First differences: ${list(fd)}`, r: "not all the same" },
          { s: `Second differences: ${list(sd)}`, r: "all the same → this is the constant row" },
        ] });
  },

  /* read the common first difference */
  commonDiff: () => {
    const { seq, d } = randArith();
    return calcQ("patClassify",
      `What is the constant first difference of <b>${list(seq)}</b>?`,
      d,
      { graph: pyramid(seq, { showFirst: true, blankFirst: true, accent: ACC }),
        hint: "Subtract any term from the one after it (next − previous).",
        answerLabel: `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.`,
        solution: [
          { s: `d = T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`, r: "next − previous" },
          { s: `Check: T₃ − T₂ = ${C(seq[2])} − ${P(seq[1])} = ${C(d)}`, r: "same, so the difference is constant" },
        ] });
  },

  /* read a specific first difference off the pyramid (tap) */
  tapFirstDiff: () => {
    const { seq } = randQuad({ len: 4 });
    return tapQ("patClassify",
      "Tap the <b>first difference between T₂ and T₃</b> (the middle of the top difference row).",
      pyramid(seq, { showFirst: true, accent: ACC }),
      { targets: ["d1_0", "d1_1", "d1_2"], correctId: "d1_1" },
      { tapHint: "First differences sit between two terms. The one between the 2nd and 3rd terms is the middle cell.",
        hint: "Look at the top difference row: its middle cell sits between T₂ and T₃.",
        answerLabel: `It is ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}.`,
        solution: [
          { s: `A first difference sits between two terms`, r: `${seq.length} terms → ${seq.length - 1} cells in the row` },
          { s: `Between T₂ and T₃: ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}`, r: "the middle cell" },
        ] });
  },

  /* read the ratio of a geometric pattern */
  ratioOf: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patClassify",
      `By what do you multiply to move along <b>${list(seq)}</b>?`,
      r,
      { hint: "Divide a term by the one before it.",
        answerLabel: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.`,
        solution: [
          { s: `r = T₂ ÷ T₁ = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}`, r: "divide by the term before" },
          { s: `Check: ${C(seq[2])} ÷ ${C(seq[1])} = ${C(r)}`, r: "the ratio is constant" },
        ] });
  },
};

export const questNp1 = {
  id: "np1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patClassify", gen })),
};
