/* ============================================================
   TRIG QUEST 5 · Cosine rule — finding an ANGLE   ★ DIAGRAM
   All three sides (SSS) → any angle, acute or obtuse.
   cosÂ = (b² + c² − a²) / (2bc)   (not on the formula sheet!)
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri } from "./_trig.js";
import { cosineRuleAngle, ang, fix, randInt, pick } from "../triglib.js";

const ACC = "#0284c7";
const NOTE = "cosineRuleAngle";

function genSSS() {
  let a, b, c;
  do { a = randInt(7, 16); b = randInt(7, 16); c = randInt(7, 16); }
  while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
  return { a, b, c };
}

const SKILLS = {
  /* find a chosen angle from all three sides */
  findAngle: () => {
    const { a, b, c } = genSSS();
    const t = placeTri({ sides: { a, b, c } }, ["A", "B", "C"], randInt(-22, 22));
    const target = pick(["A", "B", "C"]);
    const opp = { A: a, B: b, C: c }[target];                 // side opposite the wanted angle
    const others = { A: [b, c], B: [a, c], C: [a, b] }[target];
    const val = cosineRuleAngle(opp, others[0], others[1]);
    return {
      type: "calc", concept: NOTE,
      prompt: `Use the cosine rule to find <b>θ</b> (the angle at ${t.L(target)}), correct to 1 decimal.`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle(target, "θ")],
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      expected: val, dp: 1, tol: 0.1,   // accept the neighbouring tenth from 4-dp cosine working
      hint: "The side opposite θ is the one that gets subtracted: cosθ = (sum of the other two squared − opposite²)/(2·those two).",
      answerLabel: `θ = ${ang(val)}`,
      solution: [
        { s: `cos θ = (${others[0]}² + ${others[1]}² − ${opp}²) / (2·${others[0]}·${others[1]})`, r: "rearranged cosine rule" },
        { s: `cos θ = ${fix((others[0] ** 2 + others[1] ** 2 - opp ** 2) / (2 * others[0] * others[1]), 4)}` },
        { s: `θ = ${ang(val)}`, r: val > 90 ? "obtuse (cos was negative)" : "acute" },
      ],
    };
  },

  /* deliberately obtuse */
  obtuseAngle: () => {
    const a = randInt(7, 12), b = randInt(7, 12);
    const lo = Math.ceil(Math.sqrt(a * a + b * b)) + 1, hi = a + b - 1;
    const c = randInt(Math.min(lo, hi), hi);                  // c² > a² + b² → Ĉ obtuse
    const t = placeTri({ sides: { a, b, c } }, ["A", "B", "C"], randInt(-18, 18));
    const val = cosineRuleAngle(c, a, b);                     // Ĉ, opposite c
    return {
      type: "calc", concept: NOTE,
      prompt: `Find the <b>obtuse</b> angle θ (at ${t.L("C")}), correct to 1 decimal. The diagram is to scale.`,
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("C", "θ")],
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      expected: val, dp: 1, tol: 0.1,
      hint: "θ is opposite the longest side. cosθ comes out negative — your calculator gives the obtuse angle directly.",
      answerLabel: `θ = ${ang(val)}`,
      solution: [
        { s: `cos θ = (${a}² + ${b}² − ${c}²) / (2·${a}·${b})` },
        { s: `cos θ = ${fix((a * a + b * b - c * c) / (2 * a * b), 4)}`, r: "negative → obtuse" },
        { s: `θ = ${ang(val)}` },
      ],
    };
  },

  /* the rearranged formula */
  rearrange: () => mc(NOTE,
    "Rearranged to find an angle, the cosine rule says cosÂ = …",
    "(b² + c² − a²) / (2bc)",
    ["(a² + c² − b²) / (2ac)", "(b² + c² + a²) / (2bc)", "(a² − b² − c²) / (2bc)"],
    { hint: "The side opposite the angle you want (a, opposite Â) is the one subtracted on top.",
      answerLabel: "cosÂ = (b² + c² − a²)/(2bc) — opposite side a² is subtracted; 2bc uses the two sides next to Â." }),

  /* which side is subtracted */
  oppositeSubtracted: () => mc(NOTE,
    "In cosÂ = (b² + c² − a²)/(2bc), which side is a (the one being subtracted)?",
    "the side opposite Â",
    ["the longest side", "either side next to Â", "the shortest side"],
    { hint: "a is opposite Â — its “friend”.",
      answerLabel: "a is the side opposite the angle you are finding; b and c are the two sides next to it." }),
};

export const questT5 = {
  id: "t5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
