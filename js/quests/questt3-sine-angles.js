/* ============================================================
   TRIG QUEST 3 · Sine rule — ANGLES & the ambiguous case  ★ DIAGRAM
   Sines on top: sinÂ/a = sinB̂/b = sinĈ/c. Plus how many triangles
   two sides and a non-included angle can make, and the obtuse
   partner 180° − (acute).
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, sineAngleSetupStep, mcStep, calcStep } from "./_trig.js";
import { sineRuleAngle, ambiguousCase, sinD, fix, ang, randInt, pick } from "../triglib.js";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the two heavy calculations are STEP CHAINS
   now, the same treatment round 2 got on 2026-08-27. Her words then:
   "they build the equation step by step each time"; her words this
   week: the sine-rule work was "too intense too quick — split those
   intense questions up in smaller questions so the kids actually
   build the questions, not try to do everything in their head."
   Question, diagram and numbers are UNCHANGED — the worked `solution`
   each question already carried is what became the steps. The
   multiple-choice skills are untouched (round 2's standing ruling:
   "The multi-choice questions are perfect").
   ------------------------------------------------------------ */

const ACC = "#0ea5e9";
const NOTE = "sineRuleAngle";

const SKILLS = {
  /* find an angle, unambiguous because it is opposite the SHORTER side */
  findAngle: () => {
    let A, a, b, B;
    do {
      A = randInt(45, 80); a = randInt(13, 20);
      b = randInt(7, a - 3);                           // b < a → θ acute & unique
      B = sineRuleAngle(A, a, b);                      // θ, opposite b
    } while (B < 24);                                  // wedge wide enough for its θ label
    const t = placeTri({ angles: { A, B }, sides: { a } }, ["A", "B", "C"], randInt(-22, 22));
    const sinVal = b * sinD(A) / a;
    return {
      type: "steps", concept: NOTE,
      prompt: `Use the sine rule to find <b>θ</b> (the angle at B), correct to 1 decimal.`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", "θ")],
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b))] },
      steps: [
        /* b < a − 3 in the generator keeps the two side chips distinct */
        sineAngleSetupStep({ sin: "sin θ", side: String(b) }, { sin: `sin ${A}°`, side: String(a) }, [],
          `θ is opposite ${b}, and ${a} is opposite Â = ${A}°. Each sine sits over the side opposite its angle.`),
        mcStep("Now get <b>sin θ</b> on its own.",
          `sin θ = (${b} · sin ${A}°) / ${a}`,
          [`sin θ = (${a} · sin ${A}°) / ${b}`,
           `sin θ = ${b} / (${a} · sin ${A}°)`,
           `sin θ = (${b} · ${a}) / sin ${A}°`],
          `${b} is dividing sin θ, so it multiplies up to the other side.`),
        calcStep("Work out the value of <b>sin θ</b> (4 decimals).", sinVal,
          `sin θ = ${b} × sin ${A}° ÷ ${a}. This is not θ yet — it is sin θ.`, { dp: 4, tol: 0.0015 }),
        calcStep("Now find <b>θ</b> (1 decimal).", B,
          "θ = sin⁻¹ of that value — SHIFT sin on the calculator.", { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: B, dp: 1, tol: 0.1,   // accept the neighbouring tenth from 4-dp sine working
      hint: "θ is opposite b. Sines on top: sinθ/b = sinÂ/a, so sinθ = b·sinÂ/a.",
      answerLabel: `θ = ${ang(B)}`,
      solution: [
        { s: `sin θ / ${b} = sin ${A}° / ${a}`, r: "sines on top" },
        { s: `sin θ = ${b} · sin ${A}° / ${a} = ${fix(sinVal, 4)}` },
        { s: `θ = ${ang(B)}` },
      ],
    };
  },

  /* how many triangles can the SSA data make? */
  ambiguousCount: () => {
    // build each outcome on purpose
    const want = pick([0, 1, 2]);
    let A, a, b;
    for (let tries = 0; tries < 200; tries++) {
      A = randInt(20, 55); b = randInt(10, 20);
      const h = b * sinD(A);
      if (want === 0) a = randInt(3, Math.max(3, Math.floor(h) - 1));
      else if (want === 2) a = randInt(Math.ceil(h) + 1, b - 1);
      else a = b + randInt(1, 8);                       // a ≥ b → exactly 1
      if (a > 0 && ambiguousCase(A, a, b).count === want) break;
    }
    const res = ambiguousCase(A, a, b);
    const word = { 0: "no triangle", 1: "one triangle", 2: "two triangles" }[res.count];
    return mc("ambiguousCase",
      `Â = ${A}°, the side opposite Â is a = ${a}, and another side b = ${b}. How many triangles fit this data?`,
      word, ["no triangle", "one triangle", "two triangles"].filter(w => w !== word),
      { hint: "Compare a with h = b·sinÂ. a < h → none; a = h → one (right-angled); h < a < b → two; a ≥ b → one.",
        answerLabel: `h = b·sinÂ = ${fix(res.h, 2)}. Here ${res.count === 0 ? `a (${a}) < h` : res.count === 2 ? `h < a (${a}) < b (${b})` : `a (${a}) ≥ b (${b})`}, so ${word}.`,
        solution: [
          { s: `Drop the height from the top of side b: h = b·sinÂ = ${b}·sin${A}° = ${fix(res.h, 2)}`, r: "the shortest a could possibly be" },
          { s: `Now place a = ${a} against h = ${fix(res.h, 2)} and b = ${b}` },
          { s: res.count === 0
              ? `a = ${a} is shorter than h = ${fix(res.h, 2)}, so it never reaches the base`
              : res.count === 2
                ? `h = ${fix(res.h, 2)} &lt; a = ${a} &lt; b = ${b}, so a swings down and cuts the base twice`
                : `a = ${a} is at least as long as b = ${b}, so it can only reach past the foot on one side`,
            r: `∴ ${word}` },
        ] });
  },

  /* the full ambiguous calculation: sine rule for the acute angle, then 180° − it */
  ambiguousBoth: () => {
    let A, a, b, res;
    do {
      A = randInt(25, 50); b = randInt(12, 20);
      a = randInt(Math.ceil(b * sinD(A)) + 1, b - 1);   // h < a < b → two triangles
      res = ambiguousCase(A, a, b);
    } while (res.count !== 2);
    const obtuse = 180 - res.acute;
    return {
      type: "steps", concept: "ambiguousCase",
      prompt: `In △ABC, Â = ${A}°, a = ${a} (opposite Â) and b = ${b}. Two triangles are possible. Calculate the <b>obtuse</b> possibility of B̂ (1 decimal).`,
      steps: [
        /* the generator forces h < a < b, so a ≠ b — the side chips stay distinct */
        sineAngleSetupStep({ sin: "sin B̂", side: String(b) }, { sin: `sin ${A}°`, side: String(a) }, [],
          `B̂ is opposite b = ${b}, and the known Â = ${A}° is opposite a = ${a}.`),
        mcStep("Get <b>sin B̂</b> on its own.",
          `sin B̂ = (${b} · sin ${A}°) / ${a}`,
          [`sin B̂ = (${a} · sin ${A}°) / ${b}`,
           `sin B̂ = ${b} / (${a} · sin ${A}°)`,
           `sin B̂ = (${b} · ${a}) / sin ${A}°`],
          `${b} is dividing sin B̂, so it multiplies up to the other side.`),
        calcStep("First the <b>acute</b> possibility of B̂ (1 decimal).", res.acute,
          "sin⁻¹ always hands you the acute answer first.", { dp: 1, tol: 0.1, unit: "°" }),
        calcStep("Now the <b>obtuse</b> possibility (1 decimal).", obtuse,
          "The two possibilities are supplementary: 180° − the acute answer.", { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: obtuse, dp: 1, tol: 0.1,
      hint: "Sine rule first: sinB̂ = b·sinÂ/a gives the ACUTE B̂. The obtuse partner is 180° − (that angle).",
      answerLabel: `obtuse B̂ = ${ang(obtuse)}`,
      solution: [
        { s: `sin B̂ / ${b} = sin ${A}° / ${a}`, r: "sines on top" },
        { s: `sin B̂ = ${b} · sin ${A}° / ${a} = ${fix(b * sinD(A) / a, 4)}` },
        { s: `acute B̂ = ${ang(res.acute)}` },
        { s: `obtuse B̂ = 180° − ${ang(res.acute)} = ${ang(obtuse)}`, r: "supplementary pair" },
      ],
    };
  },

  /* the obtuse partner */
  obtusePartner: () => {
    const acute = randInt(28, 68) + pick([0, 0.2, 0.4, 0.6, 0.8]);
    const obtuse = 180 - acute;
    return {
      type: "calc", concept: "ambiguousCase",
      prompt: `In the ambiguous case the acute answer is B̂ = ${fix(acute, 1)}°. Give the <b>obtuse</b> possibility (1 decimal).`,
      expected: obtuse, dp: 1,
      hint: "The two possible angles are supplementary — they add to 180°.",
      answerLabel: `B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`,
      solution: [{ s: `obtuse B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`, r: "supplementary pair" }],
    };
  },

  /* which form: sines on top when you want an angle */
  whichForm: () => mc(NOTE,
    "When you are solving for an <b>angle</b>, the sine rule is best written with…",
    "the sines on top (sinÂ/a = sinB̂/b)",
    ["the sides on top (a/sinÂ = b/sinB̂)", "the angle sum first", "the cosine rule"],
    { hint: "Put the thing you want on top — here, the sine of the angle.",
      answerLabel: "Finding an angle → sines in the numerators: sinÂ/a = sinB̂/b = sinĈ/c.",
      solution: [
        { s: "You are solving for an ANGLE, so the sine you want goes on top" },
        { s: "sinÂ/a = sinB̂/b = sinĈ/c", r: "still the same rule, just turned upside down" },
        { s: "One multiply gives sinÂ, then shift-sin gives Â", r: "with the sine underneath you would flip first, which is where marks go" },
      ] }),

  /* when is it ambiguous? */
  ambiguousWhen: () => mc("ambiguousCase",
    "The ambiguous case (two possible triangles) can only happen when…",
    "you use the sine rule with two sides and a non-included angle",
    ["you use the cosine rule", "you know all three angles", "you use the area rule"],
    { hint: "Only the sine rule, and only with SSA (two sides + a non-included angle).",
      answerLabel: "Ambiguous case = sine rule + SSA. The cosine rule always gives a single answer.",
      solution: [
        { s: "sinθ has the same value at θ and at 180° − θ", r: "that is where the second triangle comes from" },
        { s: "So a sine-rule answer always has an obtuse partner you have to test" },
        { s: "cos does NOT do this — a cosine-rule angle comes out negative when it is obtuse", r: "so the cosine rule gives one answer only" },
      ] }),
};

export const questT3 = {
  id: "t3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "ambiguousCount" || id === "ambiguousBoth" || id === "obtusePartner" || id === "ambiguousWhen") ? "ambiguousCase" : NOTE, gen,
  })),
};
