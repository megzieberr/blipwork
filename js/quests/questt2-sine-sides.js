/* ============================================================
   TRIG QUEST 2 · Sine rule — finding a SIDE   ★ DIAGRAM
   Two angles and a side (AAS) → a missing side. Side on top:
   a/sinÂ = b/sinB̂ = c/sinĈ. Diagrams are to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri } from "./_trig.js";
import { sineRuleSide, fix, ang, randInt, pick } from "../triglib.js";

const ACC = "#38bdf8";
const NOTE = "sineRuleSide";

/* a valid AAS triangle: pick two angles + the side opposite the first */
function genAAS() {
  const A = randInt(35, 80), B = randInt(35, 80);
  const a = randInt(8, 20);
  return placeTri({ angles: { A, B }, sides: { a } }, ["A", "B", "C"], randInt(-22, 22));
}

const SKILLS = {
  /* find side b (opposite B̂), with the diagram to scale */
  findSide: () => {
    const t = genAAS();
    const A = Math.round(t.angles.A), B = Math.round(t.angles.B);
    // recompute the exact values from the rounded angles shown, so the answer matches the picture
    const x = sineRuleSide(t.sides.a, t.angles.A, t.angles.B);   // side b, opposite B̂
    return {
      type: "calc", concept: NOTE,
      prompt: `Use the sine rule to find <b>x</b> (correct to 2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", `${B}°`)],
        sides: [t.side("B", "C", fix(t.sides.a, 0)), t.side("A", "C", "x")] },
      expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with 4-dp sines
      hint: "x is opposite B̂. Pair it with the side you know and its opposite angle: x/sinB̂ = a/sinÂ.",
      answerLabel: `x = ${fix(x, 2)}`,
      solution: [
        { s: "x is opposite B̂; the known side is opposite Â.", r: "pick the friends" },
        { s: `x / sin ${B}° = ${fix(t.sides.a, 0)} / sin ${A}°` },
        { s: `x = ${fix(t.sides.a, 0)} · sin ${B}° / sin ${A}°` },
        { s: `x = ${fix(x, 2)}`, r: "side on top" },
      ],
    };
  },

  /* find the third side after the third angle — needs Ĉ = 180 − Â − B̂ */
  findThirdSide: () => {
    const t = genAAS();
    const A = Math.round(t.angles.A), B = Math.round(t.angles.B), Cc = 180 - A - B;
    const x = sineRuleSide(t.sides.a, t.angles.A, t.angles.C);   // side c, opposite Ĉ
    return {
      type: "calc", concept: NOTE,
      prompt: `Find <b>x</b> (the side opposite Ĉ), correct to 2 decimals. You will need Ĉ first.`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", `${B}°`)],
        sides: [t.side("B", "C", fix(t.sides.a, 0)), t.side("A", "B", "x")] },
      expected: x, dp: 2, tol: 0.015,
      hint: "First Ĉ = 180° − Â − B̂. Then x/sinĈ = a/sinÂ.",
      answerLabel: `x = ${fix(x, 2)}`,
      solution: [
        { s: `Ĉ = 180° − ${A}° − ${B}° = ${Cc}°`, r: "angle sum" },
        { s: `x / sin ${Cc}° = ${fix(t.sides.a, 0)} / sin ${A}°` },
        { s: `x = ${fix(t.sides.a, 0)} · sin ${Cc}° / sin ${A}°` },
        { s: `x = ${fix(x, 2)}` },
      ],
    };
  },

  /* word problem, no diagram — read the friends from the text */
  wordSide: () => {
    const A = randInt(40, 70), C = randInt(40, 70), b = randInt(10, 24);
    const B = 180 - A - C;
    const a = sineRuleSide(b, B, A);     // side a opposite Â, known side b opposite B̂
    return {
      type: "calc", concept: NOTE,
      prompt: `In △ABC, Â = ${A}°, Ĉ = ${C}° and b = ${b}. Calculate <b>a</b> (2 decimals).`,
      expected: a, dp: 2, tol: 0.015,
      hint: "B̂ = 180° − Â − Ĉ. Then a/sinÂ = b/sinB̂.",
      answerLabel: `a = ${fix(a, 2)}`,
      solution: [
        { s: `B̂ = 180° − ${A}° − ${C}° = ${B}°` },
        { s: `a / sin ${A}° = ${b} / sin ${B}°` },
        { s: `a = ${b} · sin ${A}° / sin ${B}° = ${fix(a, 2)}` },
      ],
    };
  },

  /* which form: sides on top when you want a side */
  whichForm: () => mc(NOTE,
    "When you are solving for a <b>side</b>, the sine rule should be written with…",
    "the sides on top (a/sinÂ = b/sinB̂)",
    ["the sines on top (sinÂ/a = sinB̂/b)", "everything multiplied", "the angles added first"],
    { hint: "Put the thing you are solving for on top.",
      answerLabel: "Finding a side → sides in the numerators: a/sinÂ = b/sinB̂ = c/sinĈ." }),

  /* pick the correct ratio set-up */
  setupRatio: () => {
    const A = randInt(40, 70); let B = randInt(40, 70);
    while (B === A) B = randInt(40, 70);                 // keep the options distinct
    const a = randInt(9, 18);
    const correct = `x / sin ${B}° = ${a} / sin ${A}°`;
    return mc(NOTE,
      `x is opposite B̂ = ${B}°. The known side ${a} is opposite Â = ${A}°. Which set-up is correct?`,
      correct,
      [`x / sin ${A}° = ${a} / sin ${B}°`, `x · sin ${B}° = ${a} · sin ${A}°`, `sin ${B}° / x = ${a} / sin ${A}°`],
      { hint: "Each side sits over the sine of the angle opposite it.",
        answerLabel: `x is opposite ${B}°, so x/sin${B}° = ${a}/sin${A}°.` });
  },
};

export const questT2 = {
  id: "t2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
