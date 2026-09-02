/* ============================================================
   TRIG QUEST 1 · Which rule fits?   ★ DIAGRAM
   Labelling "friends" (side opposite its angle), and choosing the
   sine / cosine / area rule from what you are given. Every triangle
   is drawn to scale by the triangle engine.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri } from "./_trig.js";
import { randInt, pick } from "../triglib.js";

const ACC = "#0ea5e9";

/* a random valid triangle in each given-case, returned solved */
function genAAS() { const A = randInt(35, 75), B = randInt(35, 75); return placeTri({ angles: { A, B }, sides: { a: randInt(8, 18) } }, ["A", "B", "C"], randInt(-25, 25)); }
function genSAS() { return placeTri({ sides: { b: randInt(6, 14), c: randInt(6, 14) }, angles: { A: randInt(40, 115) } }, ["A", "B", "C"], randInt(-25, 25)); }
function genSSS() {
  let a, b, c;
  do { a = randInt(7, 14); b = randInt(7, 14); c = randInt(7, 14); }
  while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
  return placeTri({ sides: { a, b, c } }, ["A", "B", "C"], randInt(-25, 25));
}

const SKILLS = {
  /* choose the rule from the given case */
  ruleForCase: () => {
    const cases = [
      { kind: "AAS", t: genAAS(), correct: "Sine rule", why: "You have two angles and a side — sine rule.",
        build: t => ({ angles: [t.angle("A", `${Math.round(t.angles.A)}°`), t.angle("B", `${Math.round(t.angles.B)}°`)], sides: [t.side("B", "C", String(Math.round(t.sides.a)))] }),
        sol: t => [
          { s: `Given: Â = ${Math.round(t.angles.A)}°, B̂ = ${Math.round(t.angles.B)}° and the side a = ${Math.round(t.sides.a)}`, r: "write down what you have first" },
          { s: `a sits opposite Â, so a and Â are a matched pair`, r: "a side with the angle facing it" },
          { s: `A matched pair is exactly what the sine rule needs: a/sinÂ = b/sinB̂` },
        ],
        prompt: "Two angles and a side are known and you must find another side. Which rule?" },
      { kind: "SAS", t: genSAS(), correct: "Cosine rule", why: "Two sides and the angle between them, finding the third side — cosine rule.",
        build: t => ({ angles: [t.angle("A", `${Math.round(t.angles.A)}°`)], sides: [t.side("A", "B", String(Math.round(t.sides.c))), t.side("A", "C", String(Math.round(t.sides.b)))] }),
        sol: t => [
          { s: `Given: b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} and Â = ${Math.round(t.angles.A)}° between them` },
          { s: `Â is BETWEEN the two known sides, so no side is paired with a known opposite angle`, r: "the sine rule cannot start" },
          { s: `a² = b² + c² − 2bc·cosÂ = ${Math.round(t.sides.b)}² + ${Math.round(t.sides.c)}² − 2(${Math.round(t.sides.b)})(${Math.round(t.sides.c)})cos${Math.round(t.angles.A)}°` },
        ],
        prompt: "Two sides and the angle between them are known; find the third side. Which rule?" },
      { kind: "SSS", t: genSSS(), correct: "Cosine rule", why: "All three sides known, finding an angle — cosine rule (rearranged).",
        build: t => ({ sides: [t.side("B", "C", String(Math.round(t.sides.a))), t.side("A", "C", String(Math.round(t.sides.b))), t.side("A", "B", String(Math.round(t.sides.c)))] }),
        sol: t => [
          { s: `Given: a = ${Math.round(t.sides.a)}, b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} — three sides and not one angle` },
          { s: `The sine rule needs an angle to start with, and there is none`, r: "so it is out" },
          { s: `cosÂ = (b² + c² − a²)/(2bc)`, r: "the cosine rule rearranged to give an angle" },
        ],
        prompt: "All three sides are known and you must find an angle. Which rule?" },
      { kind: "AREA", t: genSAS(), correct: "Area rule", why: "Two sides and the included angle, finding the AREA — area rule.",
        build: t => ({ angles: [t.angle("A", `${Math.round(t.angles.A)}°`)], sides: [t.side("A", "B", String(Math.round(t.sides.c))), t.side("A", "C", String(Math.round(t.sides.b)))] }),
        sol: t => [
          { s: `The question wants the AREA, not a side or an angle`, r: "that already picks the rule" },
          { s: `Area = ½·b·c·sinÂ needs two sides and the angle between them` },
          { s: `You have b = ${Math.round(t.sides.b)}, c = ${Math.round(t.sides.c)} and Â = ${Math.round(t.angles.A)}° between them, so it fits straight away` },
        ],
        prompt: "Two sides and the angle between them are known; find the AREA. Which rule?" },
    ];
    const c = pick(cases);
    const parts = c.build(c.t);
    return mc("trigChooseRule", c.prompt, c.correct,
      ["Sine rule", "Cosine rule", "Area rule"].filter(r => r !== c.correct),
      { graph: { type: "triangle", accent: ACC, pts: c.t.pts, poly: c.t.poly, ...parts },
        hint: "Sine rule pairs a side with its opposite angle. Cosine rule needs an included angle (or all 3 sides). Area rule finds area from 2 sides + included angle.",
        answerLabel: c.why,
        solution: c.sol(c.t) });
  },

  /* the "friends" idea: a side is named after the angle opposite it */
  oppositeSide: () => {
    const t = genSSS();
    const target = pick(["A", "B", "C"]);
    const opp = { A: "BC", B: "CA", C: "AB" }[target];      // side opposite the chosen vertex
    // build a sideMid key that matches the outline order A→B→C
    const key = { BC: "BC", CA: "CA", AB: "AB" }[opp];
    const touching = ["AB", "BC", "CA"].filter(s => s.includes(target));   // the two sides that meet AT the vertex
    return {
      type: "tap", concept: "labelling",
      prompt: `Tap the side that is <b>opposite ${target}̂</b> (its “friend”).`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly, tap: { mode: "side", correctId: key } },
      tap: { mode: "side", correctId: key, targets: ["AB", "BC", "CA"] },
      tapHint: `Look straight across the triangle from vertex ${target} to the side facing it.`,
      hint: "Each side is named after the angle it faces across the triangle.",
      answerLabel: `The side opposite ${target}̂ is ${opp.split("").join("")} — they are “friends”.`,
      solution: [
        { s: `${touching[0]} and ${touching[1]} both touch corner ${target}̂`, r: "those are the sides NEXT to the angle" },
        { s: `${opp} is the one left over, straight across the triangle from ${target}̂`, r: `so ${opp} is opposite ${target}̂ — its “friend”` },
      ],
    };
  },

  /* biggest angle is opposite the longest side */
  biggestAngle: () => {
    let t, sorted;                                       // one side must be STRICTLY longest,
    do {                                                 // or "the biggest angle" would be a tie
      t = genSSS();
      sorted = [t.sides.a, t.sides.b, t.sides.c].map(Math.round).sort((x, y) => y - x);
    } while (sorted[0] === sorted[1]);
    const s = t.sides;                                   // a opp A, b opp B, c opp C
    const longest = (["A", "B", "C"]).reduce((m, k) => (s[k.toLowerCase()] > s[m.toLowerCase()] ? k : m), "A");
    return mc("labelling",
      "The biggest angle always sits opposite the <b>longest</b> side. Using the side lengths shown, which angle is the biggest?",
      `${longest}̂`,
      ["A", "B", "C"].filter(k => k !== longest).map(k => `${k}̂`),
      { graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        sides: [t.side("B", "C", String(Math.round(s.a))), t.side("A", "C", String(Math.round(s.b))), t.side("A", "B", String(Math.round(s.c)))] },
        hint: "Find the longest side, then name the angle facing it.",
        answerLabel: `The longest side is opposite ${longest}̂, so ${longest}̂ is the biggest angle.`,
        solution: [
          { s: `Sides: a = ${Math.round(s.a)}, b = ${Math.round(s.b)}, c = ${Math.round(s.c)}`, r: "a faces Â, b faces B̂, c faces Ĉ" },
          { s: `The longest of the three is ${Math.round(s[longest.toLowerCase()])}, which is side ${longest.toLowerCase()}` },
          { s: `Side ${longest.toLowerCase()} sits opposite ${longest}̂, so ${longest}̂ is the biggest angle`, r: "biggest angle faces the longest side" },
        ] });
  },

  /* recognise the cosine "find a side" trigger */
  cosineTrigger: () => mc("trigChooseRule",
    "You know two sides and the angle <b>between</b> them, and want the third side. Which rule?",
    "Cosine rule", ["Sine rule", "Area rule"],
    { hint: "Sine rule always needs a side paired with its OPPOSITE angle. Here the angle is between the two sides.",
      answerLabel: "Two sides + the included angle → cosine rule: a² = b² + c² − 2bc·cosA.",
      solution: [
        { s: "Try the sine rule first: it needs a side paired with the angle OPPOSITE it" },
        { s: "Here the known angle lies BETWEEN the two known sides, so there is no such pair", r: "sine rule cannot start" },
        { s: "a² = b² + c² − 2bc·cosA is built for exactly this set-up", r: "two sides and the angle between them" },
      ] }),

  /* recognise the area-rule trigger */
  areaTrigger: () => mc("trigChooseRule",
    "Which information lets you use the <b>area rule</b> straight away?",
    "Two sides and the angle between them",
    ["All three angles", "Two angles and a side", "All three sides"],
    { hint: "Area = ½ × (side) × (side) × sin(included angle).",
      answerLabel: "Area rule needs two sides and the INCLUDED angle: Area = ½·b·c·sinA.",
      solution: [
        { s: "Read the formula itself: Area = ½·b·c·sinA" },
        { s: "It asks for two side lengths (b and c) and the sine of A, the angle sitting between them", r: "so that is the information it needs" },
      ] }),

  /* SSA = the ambiguous trigger */
  ssaTrigger: () => mc("trigChooseRule",
    "You are given two sides and an angle that is <b>not</b> between them. Which rule applies (and what must you watch for)?",
    "Sine rule — the ambiguous case",
    ["Cosine rule — always one answer", "Area rule", "Sine rule — never ambiguous"],
    { hint: "An angle opposite a known side points to the sine rule; two sides + non-included angle can give two triangles.",
      answerLabel: "Two sides + a non-included angle → sine rule, and it may give TWO possible triangles (ambiguous case).",
      solution: [
        { s: "The angle is opposite one of the two known sides, so you DO have a side–angle pair", r: "that points at the sine rule" },
        { s: "But the second side can swing down and meet the base in two different places" },
        { s: "So: sine rule, then check h = b·sinA against a — if h &lt; a &lt; b, two triangles fit", r: "the ambiguous case" },
      ] }),
};

export const questT1 = {
  id: "t1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "oppositeSide" || id === "biggestAngle") ? "labelling" : "trigChooseRule", gen,
  })),
};
