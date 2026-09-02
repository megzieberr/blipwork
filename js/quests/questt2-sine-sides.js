/* ============================================================
   TRIG QUEST 2 · Sine rule — finding a SIDE   ★ DIAGRAM
   Two angles and a side (AAS) → a missing side. Side on top:
   a/sinÂ = b/sinB̂ = c/sinĈ. Diagrams are to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, sineSetupStep, mcStep, calcStep } from "./_trig.js";
import { sineRuleSide, fix, ang, randInt, pick } from "../triglib.js";

const ACC = "#38bdf8";
const NOTE = "sineRuleSide";

/* ------------------------------------------------------------
   HER 2026-08-27 CHANGE — the three "here is a triangle, type the
   answer" questions are now STEP CHAINS.

   Her words: "It simply gives the triangle, and then the kids need to
   do ALL the steps and just type in the final answer… I think we
   should change it so that they build the equation step by step each
   time". Round 2 was the live homework at the time and only 2 of the
   class had finished it; that is the reason she gave for changing it.

   THE QUESTION, THE TRIANGLE AND THE NUMBERS ARE UNCHANGED — her
   instruction was explicit: "The question and diagram stays exactly
   the same, we just add extra steps". Every chain below is the
   question's OWN `solution` list, which already read
       pick the friends → set up → rearrange → compute
   turned from something shown afterwards into something answered.

   The two multiple-choice skills (whichForm, setupRatio) are NOT
   touched — "The multi-choice questions are perfect".

   Shape: [angle first, where needed] → BUILD the set-up (frame pad)
   → pick the rearranged form (mc) → type the number (calc).
   A wrong step shows that step's hint and lets them retry; the chain
   still finishes, marked "✓ after a retry" rather than a red cross.
   ------------------------------------------------------------ */

/* the "now make x the subject" step — same three distractors every
   time, because they are the three things that actually go wrong:
   the two sines swapped, dividing by both, and flipping the fraction */
/* ⚠️ THE KNOWN SIDE GOES INSIDE THE NUMERATOR, bracketed — her correction
   on seeing it on her phone, 2026-08-27: "we put the 16 on top of the
   fraction, in the numerator, next to the sin".

   Unbracketed, `16 · sin 68° / sin 59°` renders as 16 multiplying a fraction,
   because the formula renderer takes only the token immediately before the
   slash as the numerator. Same value, but not how she teaches it and not how
   it is written in an exam. The brackets make the whole of `16 · sin 68°` the
   numerator; the renderer already absorbs a bracketed group (that is how the
   `16 / (sin · sin)` distractor has always drawn correctly). */
function rearrangeStep(known, sinTop, sinBottom, hint) {
  const right = `x = (${known} · ${sinTop}) / ${sinBottom}`;
  return mcStep(
    "Now make <b>x</b> the subject.",
    right,
    [`x = (${known} · ${sinBottom}) / ${sinTop}`,
     `x = ${known} / (${sinTop} · ${sinBottom})`,
     `x = ${sinTop} / (${known} · ${sinBottom})`],
    hint);
}

/* mcStep/calcStep started life as this file's local helpers (round 2 was
   the first step-chain round in the chapter). The 2026-08-30 audit day
   widened chains to t3–t7, so the one definition now lives in _trig.js —
   identical shapes, imported above. */

/* a valid AAS triangle whose THREE ANGLES ARE ALL DIFFERENT.
   ⚠️ Two equal angles break the chain in two separate ways, and
   verify-t2-steps.mjs caught the second one:
     · the third angle is the DECOY chip on the build step, so Ĉ = Â
       would put the same chip on the pad twice;
     · worse, Â = B̂ makes sin B̂ / sin Â equal 1, so the "sines swapped"
       distractor on the rearrange step becomes CHARACTER-FOR-CHARACTER
       the correct answer — two identical options, one marked wrong.
       A child tapping the right maths and being told no.
   Bounded retries; the helpers dedupe underneath as a second net. */
function genAAS() {
  let A = 0, B = 0;
  for (let tries = 0; tries < 60; tries++) {
    A = randInt(35, 80); B = randInt(35, 80);
    const C = 180 - A - B;
    if (A !== B && C !== A && C !== B && C >= 20) break;
  }
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
    const aTxt = fix(t.sides.a, 0), C3 = 180 - A - B;
    return {
      type: "steps", concept: NOTE,
      prompt: `Use the sine rule to find <b>x</b> (correct to 2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", `${B}°`)],
        sides: [t.side("B", "C", fix(t.sides.a, 0)), t.side("A", "C", "x")] },
      steps: [
        /* the third angle rides along as a decoy chip: it is on the picture
           by implication and picking it is the honest mistake to make */
        sineSetupStep({ side: "x", sin: `sin ${B}°` }, { side: aTxt, sin: `sin ${A}°` },
          [`sin ${C3}°`],
          `x is opposite B̂ = ${B}°, and ${aTxt} is opposite Â = ${A}°. Each side sits over the sine of the angle opposite it.`),
        rearrangeStep(aTxt, `sin ${B}°`, `sin ${A}°`,
          "Multiply both sides by sin B̂ — it is dividing x, so it moves up to the other side."),
        calcStep("Now work it out (2 decimals).", x,
          `x = ${aTxt} × sin ${B}° ÷ sin ${A}°. Check your calculator is in DEG.`),
      ],
      expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with 4-dp sines
      hint: "x is opposite B̂. Pair it with the side you know and its opposite angle: x/sinB̂ = a/sinÂ.",
      answerLabel: `x = ${fix(x, 2)}`,
      solution: [
        { s: "x is opposite B̂; the known side is opposite Â.", r: "pick the friends" },
        { s: `x / sin ${B}° = ${fix(t.sides.a, 0)} / sin ${A}°` },
        { s: `x = (${fix(t.sides.a, 0)} · sin ${B}°) / sin ${A}°` },
        { s: `x = ${fix(x, 2)}`, r: "side on top" },
      ],
    };
  },

  /* find the third side after the third angle — needs Ĉ = 180 − Â − B̂ */
  findThirdSide: () => {
    const t = genAAS();
    const A = Math.round(t.angles.A), B = Math.round(t.angles.B), Cc = 180 - A - B;
    const x = sineRuleSide(t.sides.a, t.angles.A, t.angles.C);   // side c, opposite Ĉ
    const aTxt2 = fix(t.sides.a, 0);
    return {
      type: "steps", concept: NOTE,
      prompt: `Find <b>x</b> (the side opposite Ĉ), correct to 2 decimals. You will need Ĉ first.`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", `${B}°`)],
        sides: [t.side("B", "C", fix(t.sides.a, 0)), t.side("A", "B", "x")] },
      steps: [
        /* Ĉ is not on the picture, so it is EARNED before it can be used —
           the chip set below offers sin Ĉ only after this step has run */
        calcStep("First find Ĉ.", Cc, `The three angles add to 180°: Ĉ = 180° − ${A}° − ${B}°.`,
          { dp: 0, tol: 0.5, unit: "°" }),
        sineSetupStep({ side: "x", sin: `sin ${Cc}°` }, { side: aTxt2, sin: `sin ${A}°` },
          [`sin ${B}°`],
          `x is opposite Ĉ = ${Cc}°, and ${aTxt2} is opposite Â = ${A}°. B̂ is not one of x's friends here.`),
        rearrangeStep(aTxt2, `sin ${Cc}°`, `sin ${A}°`,
          "sin Ĉ is dividing x, so multiply both sides by it."),
        calcStep("Now work it out (2 decimals).", x,
          `x = ${aTxt2} × sin ${Cc}° ÷ sin ${A}°. Calculator in DEG.`),
      ],
      expected: x, dp: 2, tol: 0.015,
      hint: "First Ĉ = 180° − Â − B̂. Then x/sinĈ = a/sinÂ.",
      answerLabel: `x = ${fix(x, 2)}`,
      solution: [
        { s: `Ĉ = 180° − ${A}° − ${B}° = ${Cc}°`, r: "angle sum" },
        { s: `x / sin ${Cc}° = ${fix(t.sides.a, 0)} / sin ${A}°` },
        { s: `x = (${fix(t.sides.a, 0)} · sin ${Cc}°) / sin ${A}°` },
        { s: `x = ${fix(x, 2)}` },
      ],
    };
  },

  /* word problem, no diagram — read the friends from the text */
  wordSide: () => {
    let A = 0, C = 0;
    for (let tries = 0; tries < 60; tries++) {   // three distinct angles, same reasons as genAAS
      A = randInt(40, 70); C = randInt(40, 70);
      const Bb = 180 - A - C;
      if (A !== C && Bb !== A && Bb !== C) break;
    }
    const b = randInt(10, 24);
    const B = 180 - A - C;
    const a = sineRuleSide(b, B, A);     // side a opposite Â, known side b opposite B̂
    return {
      type: "steps", concept: NOTE,
      prompt: `In △ABC, Â = ${A}°, Ĉ = ${C}° and b = ${b}. Calculate <b>a</b> (2 decimals).`,
      steps: [
        calcStep("First find B̂.", B, `The three angles add to 180°: B̂ = 180° − ${A}° − ${C}°.`,
          { dp: 0, tol: 0.5, unit: "°" }),
        /* no diagram on this one — the friends have to be read out of the
           sentence, which is the whole point of the word-problem skill */
        sineSetupStep({ side: "a", sin: `sin ${A}°` }, { side: String(b), sin: `sin ${B}°` },
          [`sin ${C}°`],
          `a is opposite Â = ${A}°, and b = ${b} is opposite B̂ = ${B}°.`),
        mcStep("Now make <b>a</b> the subject.",
          `a = (${b} · sin ${A}°) / sin ${B}°`,          // bracketed: her notation
          [`a = (${b} · sin ${B}°) / sin ${A}°`,
           `a = ${b} / (sin ${A}° · sin ${B}°)`,
           `a = sin ${A}° / (${b} · sin ${B}°)`],
          "sin B̂ is dividing a, so multiply both sides by it."),
        calcStep("Now work it out (2 decimals).", a,
          `a = ${b} × sin ${A}° ÷ sin ${B}°. Calculator in DEG.`),
      ],
      expected: a, dp: 2, tol: 0.015,
      hint: "B̂ = 180° − Â − Ĉ. Then a/sinÂ = b/sinB̂.",
      answerLabel: `a = ${fix(a, 2)}`,
      solution: [
        { s: `B̂ = 180° − ${A}° − ${C}° = ${B}°` },
        { s: `a / sin ${A}° = ${b} / sin ${B}°` },
        { s: `a = (${b} · sin ${A}°) / sin ${B}° = ${fix(a, 2)}` },
      ],
    };
  },

  /* which form: sides on top when you want a side */
  whichForm: () => mc(NOTE,
    "When you are solving for a <b>side</b>, the sine rule should be written with…",
    "the sides on top (a/sinÂ = b/sinB̂)",
    ["the sines on top (sinÂ/a = sinB̂/b)", "everything multiplied", "the angles added first"],
    { hint: "Put the thing you are solving for on top.",
      answerLabel: "Finding a side → sides in the numerators: a/sinÂ = b/sinB̂ = c/sinĈ.",
      solution: [
        { s: "You are solving for a SIDE, so put the side you want on top" },
        { s: "a/sinÂ = b/sinB̂ = c/sinĈ", r: "each side over the sine of the angle facing it" },
        { s: "Then one multiply frees x", r: "with x underneath you would have to flip the fraction first" },
      ] }),

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
        answerLabel: `x is opposite ${B}°, so x/sin${B}° = ${a}/sin${A}°.`,
        solution: [
          { s: `Pair each side with the angle it faces: x with ${B}°, and ${a} with ${A}°`, r: "friends" },
          { s: `Solving for a side, so sides on top: x/sin${B}° = ${a}/sin${A}°` },
          { s: `Check the pairing before you press anything`, r: `x under sin${A}° would pair x with the wrong angle` },
        ] });
  },
};

export const questT2 = {
  id: "t2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
