/* ============================================================
   TRIG QUEST 6 · Area rule   ★ DIAGRAM
   Area = ½·b·c·sinÂ for a triangle (two sides + included angle),
   plus regular polygons and a composite (house) figure. All shapes
   are drawn to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, houseFigure, regularPolygonFigure, areaSetupStep, calcStep } from "./_trig.js";
import { areaSAS, regularPolygonArea, cosineRuleSide, sinD, cosD, fix, randInt, pick } from "../triglib.js";

const ACC = "#0369a1";
const NOTE = "areaRule";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the four calculations are STEP CHAINS now,
   the round-2 treatment widened to the chapter. The two one-formula
   areas got a build step + the number; the polygon and the house —
   the two genuinely heavy ones — became the ladder their own worked
   solutions already described, one rung per answer. Question, figure
   and numbers unchanged; MCs and the yes/no untouched.
   ------------------------------------------------------------ */

const SKILLS = {
  /* triangle area from two sides + the included angle */
  triArea: () => {
    let b = 0, c = 0;
    do { b = randInt(6, 16); c = randInt(6, 16); } while (b === c);   // distinct chips
    const A = randInt(35, 130);
    const t = placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-20, 20));
    const area = areaSAS(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: `Calculate the <b>area</b> of the triangle (2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      steps: [
        areaSetupStep(String(b), String(c), `${A}°`,
          "Two sides and the SINE of the angle between them."),
        calcStep("Work out the <b>area</b> (2 decimals).", area,
          `Area = ½ × ${b} × ${c} × sin ${A}°.`, { dp: 2, tol: 0.015 }),
      ],
      expected: area, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with a 4-dp sine
      hint: "Area = ½ × (side) × (side) × sin(angle between them).",
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [
        { s: `Area = ½ · ${b} · ${c} · sin ${A}°`, r: "two sides + included angle" },
        { s: `Area = ${fix(area, 2)} square units` },
      ],
    };
  },

  /* word version — the sides come out of the sentence */
  triAreaWord: () => {
    let b = 0, c = 0;
    do { b = randInt(8, 20); c = randInt(8, 20); } while (b === c);   // distinct chips
    const A = randInt(35, 120);
    const area = areaSAS(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: `In △MNP, MN = ${c}, MP = ${b} and M̂ = ${A}°. Calculate the area of △MNP (2 decimals).`,
      steps: [
        areaSetupStep(String(c), String(b), `${A}°`,
          "M̂ sits between MN and MP — those two sides, and the sine of M̂."),
        calcStep("Work out the <b>area</b> (2 decimals).", area,
          `Area = ½ × ${c} × ${b} × sin ${A}°.`, { dp: 2, tol: 0.015 }),
      ],
      expected: area, dp: 2, tol: 0.015,
      hint: "M̂ is between the two given sides, so Area = ½·MN·MP·sinM̂.",
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [{ s: `Area = ½ · ${c} · ${b} · sin ${A}° = ${fix(area, 2)}` }],
    };
  },

  /* regular polygon — the triangle method, one rung per answer */
  regularPolygon: () => {
    const n = pick([5, 6, 8]);
    const s = randInt(6, 14);
    const area = regularPolygonArea(n, s);
    const name = { 5: "pentagon", 6: "hexagon", 8: "octagon" }[n];
    const apex = 360 / n;                      // 72 / 60 / 45 — integers for all three n
    const R = s / (2 * sinD(180 / n));         // circumradius (the equal legs)
    const triA = 0.5 * R * R * sinD(apex);     // one centre triangle
    return {
      type: "steps", concept: "areaPolygon",
      prompt: `Calculate the area of this regular <b>${name}</b> with side length ${s} (2 decimals).`,
      graph: regularPolygonFigure(n, s, ACC),
      steps: [
        calcStep(`Split it into ${n} equal triangles from the centre. What is each triangle's <b>centre angle</b> (whole number)?`,
          apex, `The ${n} triangles share the full 360° at the centre: 360° ÷ ${n}.`,
          { dp: 0, tol: 0.5, unit: "°" }),
        calcStep("Each triangle is isosceles, with two equal legs <b>R</b> out to the corners. Find R (2 decimals).",
          R, `Half a side over the sine of half the centre angle: R = (${s} ÷ 2) ÷ sin ${fix(180 / n, 1)}°.`,
          { dp: 2, tol: 0.02 }),
        calcStep("The area of <b>one</b> triangle (2 decimals).",
          triA, `½ · R² · sin ${fix(apex, 0)}° — keep R unrounded on the calculator.`,
          { dp: 2, tol: 0.1 }),
        calcStep(`All ${n} together — the <b>total area</b> (2 decimals).`,
          area, `${n} × one triangle. (Check: n·s² ÷ (4·tan(180°/n)) gives it in one step.)`,
          { dp: 2, tol: 0.5 }),
      ],
      expected: area, dp: 2, tol: 0.5,   // triangle-method answers drift if R is rounded — accept them
      hint: `Split it into ${n} equal triangles from the centre. Each has a centre angle of 360°/${n} = ${fix(360 / n, 0)}°.`,
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [
        { s: `${n} isosceles triangles from the centre, each with apex angle 360°/${n} = ${fix(360 / n, 0)}°` },
        { s: `equal legs R = (s/2) / sin(180°/${n}), then each triangle = ½·R²·sin ${fix(360 / n, 0)}°`, r: "keep R unrounded" },
        { s: `in one step: Area = n·s² / (4·tan(180°/n)) = ${n}·${s}² / (4·tan ${fix(180 / n, 1)}°)` },
        { s: `Area = ${fix(area, 2)} square units` },
      ],
    };
  },

  /* composite "house" figure: rectangle + isosceles roof */
  houseArea: () => {
    const r = randInt(5, 9), theta = pick([100, 105, 110, 115, 120]), h = randInt(5, 9);
    const fig = houseFigure(r, theta, h, ACC);
    const base = 2 * r * sinD(theta / 2);
    const total = fig.areaWall + fig.areaRoof;
    return {
      type: "steps", concept: "areaQuad",
      prompt: `Find the total <b>area</b> of the figure (2 decimals): a rectangle below an isosceles-triangle roof.`,
      graph: fig.graph,
      steps: [
        calcStep("First the roof's <b>base</b> — the cosine rule, with r twice (2 decimals).",
          base, `base² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°, then the square root.`,
          { dp: 2, tol: 0.015 }),
        calcStep(`The <b>rectangle</b>: base × ${h} (2 decimals).`,
          fig.areaWall, "Keep the unrounded base if it is still on the calculator — the 2-decimal one is accepted too.",
          { dp: 2, tol: 0.06 }),
        calcStep("The <b>roof</b> (2 decimals).",
          fig.areaRoof, `½ · ${r}² · sin ${theta}°.`, { dp: 2, tol: 0.015 }),
        calcStep("Add them — the <b>total area</b> (2 decimals).",
          total, "Rectangle + roof.", { dp: 2, tol: 0.1 }),
      ],
      expected: total, dp: 2, tol: 0.1,   // matches the last step: a 2-dp base carried through is accepted
      hint: "Roof area = ½·r²·sinθ. For the rectangle you first need its width — the roof's base, by the cosine rule.",
      answerLabel: `Area = ${fix(total, 2)} square units`,
      solution: [
        { s: `base² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°  →  base = ${fix(base, 2)}`, r: "cosine rule" },
        { s: `rectangle = base · ${h} = ${fix(fig.areaWall, 2)}`, r: "keep the unrounded base" },
        { s: `roof = ½·${r}²·sin ${theta}° = ${fix(fig.areaRoof, 2)}` },
        { s: `total = ${fix(total, 2)} square units` },
      ],
    };
  },

  /* the formula */
  areaFormula: () => mc(NOTE,
    "The area rule for △ABC says Area = …",
    "½·b·c·sinÂ",
    ["½·b·c·cosÂ", "b·c·sinÂ", "½·b·c·tanÂ"],
    { hint: "Half, two sides, and the SINE of the angle between them.",
      answerLabel: "Area = ½·b·c·sinÂ — two sides and the sine of their included angle.",
      solution: [
        { s: "Area of any triangle = ½ × base × height, so take b as the base" },
        { s: "Drop the height from the top corner: h = c·sinÂ", r: "sinÂ = O/H in the little right triangle" },
        { s: "Area = ½·b·h = ½·b·c·sinÂ", r: "that is where the sine comes from — never cos, never tan" },
      ] }),

  /* need the included angle */
  needIncluded: () => ({
    type: "yesno", concept: NOTE,
    prompt: "You know two sides of a triangle but the given angle is <b>not</b> between them. Can you use the area rule directly?",
    yes: false,
    hint: "The area rule needs the angle BETWEEN the two sides.",
    answerLabel: "No — the area rule needs the included angle. Find it first (e.g. via the sine/cosine rule).",
    solution: [{ s: "Area rule needs the angle between the two sides; without it, solve for that angle first." }],
  }),
};

export const questT6 = {
  id: "t6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "regularPolygon" ? "areaPolygon" : id === "houseArea" ? "areaQuad" : NOTE, gen,
  })),
};
