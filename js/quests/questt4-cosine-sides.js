/* ============================================================
   TRIG QUEST 4 · Cosine rule — finding a SIDE   ★ DIAGRAM
   Two sides and the INCLUDED angle (SAS) → the third side.
   a² = b² + c² − 2bc·cosÂ
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, cosineSideSetupStep, calcStep } from "./_trig.js";
import { cosineRuleSide, cosD, fix, randInt, pick } from "../triglib.js";

const ACC = "#0d8fce";
const NOTE = "cosineRuleSide";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the two full calculations are STEP CHAINS
   now (build the substituted rule → x² → √), the round-2 treatment
   widened to the chapter: "split those intense questions up in
   smaller questions so the kids actually build the questions."
   Question, diagram and numbers unchanged; MCs untouched.
   ------------------------------------------------------------ */

/* SAS triangle: two sides b, c and the included angle Â between them.
   b ≠ c since the audit day — the two sides are chips on the build
   step, and two identical chips are confusing, not harder. */
function genSAS() {
  let b = 0, c = 0;
  do { b = randInt(6, 16); c = randInt(6, 16); } while (b === c);
  const A = randInt(35, 130);
  return placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-22, 22));
}

const SKILLS = {
  /* find the side opposite the given included angle */
  findSide: () => {
    const t = genSAS();
    const A = Math.round(t.angles.A), b = t.sides.b, c = t.sides.c;
    const x = cosineRuleSide(b, c, A);                  // side a, opposite Â
    return {
      type: "steps", concept: NOTE,
      prompt: `Use the cosine rule to find <b>x</b> (correct to 2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c)), t.side("B", "C", "x")] },
      steps: [
        cosineSideSetupStep("x", String(b), String(c), `${A}°`,
          "The two sides you know fill the squares AND the 2·…·… product; the included angle rides with cos."),
        calcStep("Work out <b>x²</b> first (2 decimals).", x * x,
          `x² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}° — type the whole right-hand side in one go.`,
          { dp: 2, tol: 0.05 }),
        calcStep("Now <b>x</b> (2 decimals).", x,
          "x = √(that number). x² is not the answer yet.", { dp: 2, tol: 0.015 }),
      ],
      expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with a 4-dp cosine
      hint: "x is opposite the known angle. x² = b² + c² − 2bc·cos(angle).",
      answerLabel: `x = ${fix(x, 2)}`,
      solution: [
        { s: `x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`, r: "cosine rule" },
        { s: `x² = ${fix(b * b + c * c, 0)} − ${fix(2 * b * c, 0)}·cos ${A}° = ${fix(x * x, 2)}` },
        { s: `x = ${fix(x, 2)}`, r: "take the square root" },
      ],
    };
  },

  /* word version, no diagram — the sides come out of the sentence */
  wordSide: () => {
    let b = 0, c = 0;
    do { b = randInt(8, 18); c = randInt(8, 18); } while (b === c);   // distinct chips
    const A = randInt(40, 125);
    const a = cosineRuleSide(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: `In △ABC, b = ${b}, c = ${c} and Â = ${A}°. Calculate <b>a</b> (2 decimals).`,
      steps: [
        cosineSideSetupStep("a", String(b), String(c), `${A}°`,
          `Â sits between b and c, so a is opposite it — b and c fill the squares and the product.`),
        calcStep("Work out <b>a²</b> first (2 decimals).", a * a,
          `a² = ${b}² + ${c}² − ${2 * b * c}·cos ${A}° — the whole right-hand side in one go.`,
          { dp: 2, tol: 0.05 }),
        calcStep("Now <b>a</b> (2 decimals).", a,
          "a = √(that number).", { dp: 2, tol: 0.015 }),
      ],
      expected: a, dp: 2, tol: 0.015,
      hint: "Â sits between b and c, so a is opposite it: a² = b² + c² − 2bc·cosÂ.",
      answerLabel: `a = ${fix(a, 2)}`,
      solution: [
        { s: `a² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°` },
        { s: `a² = ${fix(b * b + c * c - 2 * b * c * cosD(A), 2)}` },
        { s: `a = ${fix(a, 2)}` },
      ],
    };
  },

  /* the included-angle idea */
  includedAngle: () => mc(NOTE,
    "To use the cosine rule to find a side, the known angle must be…",
    "between the two known sides (the included angle)",
    ["opposite a known side", "the biggest angle", "any angle you like"],
    { hint: "The − 2bc·cosA term only works when A is the angle between b and c.",
      answerLabel: "Cosine rule needs the INCLUDED angle — the one between the two known sides.",
      solution: [
        { s: "Look at what the − 2bc·cosA term is made of: the two sides b and c, and the angle A" },
        { s: "In the rule, b and c are the two arms that MEET at A", r: "that is the only way the term is built" },
        { s: "So the known angle has to sit between the two known sides", r: "an angle somewhere else does not fit the formula" },
      ] }),

  /* pick the correct formula for the labelled unknown */
  whichFormula: () => {
    const A = randInt(40, 120), b = randInt(6, 14), c = randInt(6, 14);
    return mc(NOTE,
      `x is opposite Â = ${A}°, with the two sides ${b} and ${c} meeting at Â. Which formula is correct?`,
      `x² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`,
      [`x² = ${b}² + ${c}² + 2(${b})(${c})·cos ${A}°`,
       `x² = ${b}² − ${c}² − 2(${b})(${c})·cos ${A}°`,
       `x = ${b} + ${c} − 2(${b})(${c})·cos ${A}°`],
      { hint: "It is a MINUS in the middle, and you square first (x², not x).",
        answerLabel: `x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}° — sum of squares minus the 2bc·cos term.`,
        solution: [
          { s: `x is opposite Â, and the two sides ${b} and ${c} meet at Â`, r: "so x plays the part of a, and the sides are b and c" },
          { s: `a² = b² + c² − 2bc·cosÂ`, r: "write the rule before any numbers go in" },
          { s: `x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}°`, r: "plus between the squares, MINUS in front of the 2bc term" },
        ] });
  },
};

export const questT4 = {
  id: "t4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
