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
    const { seq } = randArith();
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "arithmetic (linear)", wrongsFor("arithmetic (linear)"),
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Find the FIRST differences yourself. If they are all the same, it is arithmetic.",
        answerLabel: "Arithmetic — the first difference is constant." });
  },

  /* quadratic → classify (show the full pyramid) */
  classifyQuad: () => {
    const { seq } = randQuad();
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "quadratic", wrongsFor("quadratic"),
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Work out the first differences — they change. Their differences (the second differences) are constant → quadratic.",
        answerLabel: "Quadratic — the second difference is constant." });
  },

  /* geometric → classify (it's a ratio, not a difference) */
  classifyGeo: () => {
    const { seq, r } = randGeo({ integerR: true });
    return mc("patClassify",
      `Look at the pattern:<br><b>${list(seq)}</b><br>What kind of pattern is it?`,
      "geometric", wrongsFor("geometric"),
      { hint: `Divide each term by the one before it (${C(seq[1])} ÷ ${C(seq[0])} = …). A constant ratio means geometric.`,
        answerLabel: `Geometric — you multiply by ${C(r)} each time.` });
  },

  /* which row is the constant one? */
  whichConstant: () => {
    const { seq } = randQuad();
    return mc("patClassify",
      `For the quadratic pattern <b>${list(seq)}</b>, which differences are constant?`,
      "the second differences",
      ["the first differences", "the terms themselves", "none of them"],
      { graph: pyramid(seq, { accent: ACC }),
        hint: "Work out the first differences (they change), then their differences (those stay the same).",
        answerLabel: "The second differences are constant." });
  },

  /* read the common first difference */
  commonDiff: () => {
    const { seq, d } = randArith();
    return calcQ("patClassify",
      `What is the constant first difference of <b>${list(seq)}</b>?`,
      d,
      { graph: pyramid(seq, { showFirst: true, blankFirst: true, accent: ACC }),
        hint: "Subtract any term from the one after it (next − previous).",
        answerLabel: `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.` });
  },

  /* read a specific first difference off the pyramid (tap) */
  tapFirstDiff: () => {
    const { seq } = randQuad({ len: 4 });
    return tapQ("patClassify",
      "Tap the <b>first difference between T₂ and T₃</b> (the middle of the top difference row).",
      pyramid(seq, { showFirst: true, accent: ACC }),
      { targets: ["d1_0", "d1_1", "d1_2"], correctId: "d1_1" },
      { tapHint: "First differences sit between two terms. The one between the 2nd and 3rd terms is the middle cell.",
        answerLabel: `It is ${C(seq[2])} − ${P(seq[1])} = ${C(seq[2] - seq[1])}.` });
  },

  /* read the ratio of a geometric pattern */
  ratioOf: () => {
    const { seq, r } = randGeo({ integerR: true });
    return calcQ("patClassify",
      `By what do you multiply to move along <b>${list(seq)}</b>?`,
      r,
      { hint: "Divide a term by the one before it.",
        answerLabel: `r = ${C(seq[1])} ÷ ${C(seq[0])} = ${C(r)}.` });
  },
};

export const questNp1 = {
  id: "np1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patClassify", gen })),
};
