/* ============================================================
   TRIG QUEST 6 · Area rule   ★ DIAGRAM
   Area = ½·b·c·sinÂ for a triangle (two sides + included angle),
   plus regular polygons and a composite (house) figure. All shapes
   are drawn to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, houseFigure, regularPolygonFigure } from "./_trig.js";
import { areaSAS, regularPolygonArea, cosineRuleSide, sinD, cosD, fix, randInt, pick } from "../triglib.js";

const ACC = "#0369a1";
const NOTE = "areaRule";

const SKILLS = {
  /* triangle area from two sides + the included angle */
  triArea: () => {
    const b = randInt(6, 16), c = randInt(6, 16), A = randInt(35, 130);
    const t = placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-20, 20));
    const area = areaSAS(b, c, A);
    return {
      type: "calc", concept: NOTE,
      prompt: `Calculate the <b>area</b> of the triangle (2 decimals).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      expected: area, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with a 4-dp sine
      hint: "Area = ½ × (side) × (side) × sin(angle between them).",
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [
        { s: `Area = ½ · ${b} · ${c} · sin ${A}°`, r: "two sides + included angle" },
        { s: `Area = ${fix(area, 2)} square units` },
      ],
    };
  },

  /* word version */
  triAreaWord: () => {
    const b = randInt(8, 20), c = randInt(8, 20), A = randInt(35, 120);
    const area = areaSAS(b, c, A);
    return {
      type: "calc", concept: NOTE,
      prompt: `In △MNP, MN = ${c}, MP = ${b} and M̂ = ${A}°. Calculate the area of △MNP (2 decimals).`,
      expected: area, dp: 2, tol: 0.015,
      hint: "M̂ is between the two given sides, so Area = ½·MN·MP·sinM̂.",
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [{ s: `Area = ½ · ${c} · ${b} · sin ${A}° = ${fix(area, 2)}` }],
    };
  },

  /* regular polygon */
  regularPolygon: () => {
    const n = pick([5, 6, 8]);
    const s = randInt(6, 14);
    const area = regularPolygonArea(n, s);
    const name = { 5: "pentagon", 6: "hexagon", 8: "octagon" }[n];
    return {
      type: "calc", concept: "areaPolygon",
      prompt: `Calculate the area of this regular <b>${name}</b> with side length ${s} (2 decimals).`,
      graph: regularPolygonFigure(n, s, ACC),
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
      type: "calc", concept: "areaQuad",
      prompt: `Find the total <b>area</b> of the figure (2 decimals): a rectangle below an isosceles-triangle roof.`,
      graph: fig.graph,
      expected: total, dp: 2, tol: 0.06,   // accept working that carries the 2-dp rounded base
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
      answerLabel: "Area = ½·b·c·sinÂ — two sides and the sine of their included angle." }),

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
