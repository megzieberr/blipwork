/* ============================================================
   TRIG QUEST 4 · Cosine rule — finding a SIDE   ★ DIAGRAM
   Two sides and the INCLUDED angle (SAS) → the third side.
   a² = b² + c² − 2bc·cosÂ
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri } from "./_trig.js";
import { cosineRuleSide, cosD, fix, randInt, pick } from "../triglib.js";

const ACC = "#0d8fce";
const NOTE = "cosineRuleSide";

/* SAS triangle: two sides b, c and the included angle Â between them */
function genSAS() {
  const b = randInt(6, 16), c = randInt(6, 16), A = randInt(35, 130);
  return placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-22, 22));
}

const SKILLS = {
  /* find the side opposite the given included angle */
  findSide: () => {
    const t = genSAS();
    const A = Math.round(t.angles.A), b = t.sides.b, c = t.sides.c;
    const x = cosineRuleSide(b, c, A);                  // side a, opposite Â
    return {
      type: "calc", concept: NOTE,
      prompt: `Use the cosine rule to find <b>x</b> (correct to 2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c)), t.side("B", "C", "x")] },
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

  /* word version, no diagram */
  wordSide: () => {
    const b = randInt(8, 18), c = randInt(8, 18), A = randInt(40, 125);
    const a = cosineRuleSide(b, c, A);
    return {
      type: "calc", concept: NOTE,
      prompt: `In △ABC, b = ${b}, c = ${c} and Â = ${A}°. Calculate <b>a</b> (2 decimals).`,
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
      answerLabel: "Cosine rule needs the INCLUDED angle — the one between the two known sides." }),

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
        answerLabel: `x² = ${b}² + ${c}² − 2(${b})(${c})·cos${A}° — sum of squares minus the 2bc·cos term.` });
  },
};

export const questT4 = {
  id: "t4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
