/* ============================================================
   TRIG QUEST 7 · Mixed problems   ★ DIAGRAM
   Pick the right rule, combine steps, and handle the classics:
   shortest distance (perpendicular), area from three sides, and
   word problems. Everything to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, segStartClear } from "./_trig.js";
import {
  sineRuleSide, cosineRuleSide, cosineRuleAngle, areaSAS, areaSSS,
  footOfPerp, dist, sinD, fix, ang, randInt, pick,
} from "../triglib.js";

const ACC = "#075985";

const SKILLS = {
  /* one unknown — but which rule? randomly a sine-side, cosine-side or cosine-angle */
  solveUnknown: () => {
    const kind = pick(["sineSide", "cosSide", "cosAngle"]);
    if (kind === "sineSide") {
      const A = randInt(40, 80), B = randInt(40, 80), a = randInt(9, 18);
      const t = placeTri({ angles: { A, B }, sides: { a } }, ["A", "B", "C"], randInt(-20, 20));
      const x = sineRuleSide(a, A, B);
      return {
        type: "calc", concept: "mixedStrategy",
        prompt: "Find <b>x</b> (2 decimals). First decide which rule fits.",
        graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
          angles: [t.angle("A", `${A}°`), t.angle("B", `${B}°`)],
          sides: [t.side("B", "C", String(a)), t.side("A", "C", "x")] },
        expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip from 4-dp sines/cosines
        hint: "A side paired with its opposite angle → sine rule.",
        answerLabel: `x = ${fix(x, 2)} (sine rule)`,
        solution: [{ s: "two angles + a side → sine rule" }, { s: `x = ${a}·sin ${B}°/sin ${A}° = ${fix(x, 2)}` }],
      };
    }
    if (kind === "cosSide") {
      const b = randInt(7, 15), c = randInt(7, 15), A = randInt(40, 120);
      const t = placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-20, 20));
      const x = cosineRuleSide(b, c, A);
      return {
        type: "calc", concept: "mixedStrategy",
        prompt: "Find <b>x</b> (2 decimals). First decide which rule fits.",
        graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
          angles: [t.angle("A", `${A}°`)],
          sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c)), t.side("B", "C", "x")] },
        expected: x, dp: 2, tol: 0.015,
        hint: "Two sides + the angle between them → cosine rule.",
        answerLabel: `x = ${fix(x, 2)} (cosine rule)`,
        solution: [{ s: "two sides + included angle → cosine rule" }, { s: `x² = ${b}²+${c}²−2(${b})(${c})cos ${A}° → x = ${fix(x, 2)}` }],
      };
    }
    // cosAngle
    let a, b, c;
    do { a = randInt(7, 15); b = randInt(7, 15); c = randInt(7, 15); }
    while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
    const t = placeTri({ sides: { a, b, c } }, ["A", "B", "C"], randInt(-20, 20));
    const val = cosineRuleAngle(a, b, c);                     // Â, opposite a
    return {
      type: "calc", concept: "mixedStrategy",
      prompt: "Find <b>θ</b> (the angle at A), 1 decimal. First decide which rule fits.",
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", "θ")],
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      expected: val, dp: 1, tol: 0.1,
      hint: "All three sides, finding an angle → cosine rule (rearranged).",
      answerLabel: `θ = ${ang(val)} (cosine rule)`,
      solution: [{ s: "three sides → cosine rule for the angle" }, { s: `cosθ = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → θ = ${ang(val)}` }],
    };
  },

  /* shortest distance from a vertex to the opposite side (the perpendicular) */
  shortestDistance: () => {
    const A = randInt(50, 80), s = randInt(10, 16);
    const b = s, c = s + pick([-2, -1, 0, 1, 2]);            // near-isosceles → foot stays inside
    const t = placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-16, 16));
    const a = cosineRuleSide(b, c, A);                        // base BC
    const area = areaSAS(b, c, A);
    const h = 2 * area / a;                                   // perpendicular from A to BC
    const F = footOfPerp(t.pts[t.L("A")], t.pts[t.L("B")], t.pts[t.L("C")]);
    const pts = { ...t.pts, F };
    const graph = { type: "triangle", accent: ACC, pts, poly: t.poly,
      angles: [t.angle("A", `${A}°`), { at: "F", right: true, between: [t.L("A"), t.L("B")] }],
      sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c))] };
    // the altitude runs almost along the bisector here, so start the dash
    // just below the angle label instead of striking straight through it
    graph.pts = { ...pts, A0: segStartClear(graph, t.L("A"), "F") };
    graph.segs = [{ from: "A0", to: "F", dash: true }];
    return {
      type: "calc", concept: "shortestDistance",
      prompt: `Calculate the <b>shortest distance</b> from ${t.L("A")} to ${t.L("B")}${t.L("C")} (2 decimals).`,
      graph,
      expected: h, dp: 2, tol: 0.015,
      hint: "Shortest distance = the perpendicular height. Area = ½·base·height, so height = 2·Area / base.",
      answerLabel: `shortest distance = ${fix(h, 2)}`,
      solution: [
        { s: `Area = ½·${b}·${c}·sin ${A}° = ${fix(area, 2)}`, r: "area rule" },
        { s: `base ${t.L("B")}${t.L("C")} = ${fix(a, 2)}`, r: "cosine rule" },
        { s: `height = 2·Area / base = ${fix(h, 2)}`, r: "½·base·height" },
      ],
    };
  },

  /* area from all three sides (cosine for an angle, then area rule) */
  areaFromSSS: () => {
    let a, b, c;
    do { a = randInt(8, 16); b = randInt(8, 16); c = randInt(8, 16); }
    while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
    const t = placeTri({ sides: { a, b, c } }, ["A", "B", "C"], randInt(-18, 18));
    const A = cosineRuleAngle(a, b, c);
    const area = areaSSS(a, b, c);
    return {
      type: "calc", concept: "mixedStrategy",
      prompt: "Calculate the <b>area</b> of this triangle (2 decimals). You only have the three sides.",
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      expected: area, dp: 2, tol: 0.1,   // accept working that carries the 1-dp rounded angle
      hint: "First find an angle with the cosine rule, then use the area rule with the two sides around it.",
      answerLabel: `Area = ${fix(area, 2)} square units`,
      solution: [
        { s: `cos Â = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → Â = ${ang(A)}`, r: "cosine rule" },
        { s: `Area = ½·${b}·${c}·sin Â = ${fix(area, 2)}`, r: "area rule — keep Â unrounded" },
      ],
    };
  },

  /* word problem — distance via the cosine rule */
  contextCosine: () => {
    const b = randInt(40, 120), c = randInt(40, 120), A = randInt(40, 130);
    const dapart = cosineRuleSide(b, c, A);
    return {
      type: "calc", concept: "mixedStrategy",
      prompt: `Two hikers leave the same point along straight paths. One walks ${b} m, the other ${c} m, and the angle between their paths is ${A}°. How far apart are they (2 decimals)?`,
      expected: dapart, dp: 2, tol: 0.015,
      hint: "The two distances and the angle between them are SAS → cosine rule for the third side.",
      answerLabel: `${fix(dapart, 2)} m apart`,
      solution: [
        { s: `d² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°` },
        { s: `d = ${fix(dapart, 2)} m` },
      ],
    };
  },

  /* strategy: name the rule for a described situation */
  strategy: () => {
    const cases = [
      { p: "You know all three sides and want the biggest angle.", c: "Cosine rule" },
      { p: "You know two angles and one side and want another side.", c: "Sine rule" },
      { p: "You know two sides and the angle between them and want the area.", c: "Area rule" },
      { p: "You know two sides and the angle between them and want the third side.", c: "Cosine rule" },
    ];
    const k = pick(cases);
    return mc("mixedStrategy", k.p + " Which rule?", k.c,
      ["Sine rule", "Cosine rule", "Area rule"].filter(r => r !== k.c),
      { hint: "Side + opposite angle → sine. Included angle (or 3 sides) → cosine. Area from 2 sides + included angle → area rule.",
        answerLabel: `${k.c}.` });
  },
};

export const questT7 = {
  id: "t7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "shortestDistance" ? "shortestDistance" : "mixedStrategy", gen,
  })),
};
