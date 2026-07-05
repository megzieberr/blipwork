/* ============================================================
   ANALYTICAL GEOMETRY · Q3 — Parallel & perpendicular  ★ TRAP
   ------------------------------------------------------------
   The gradient rules: parallel → equal gradients; perpendicular →
   gradients multiply to −1 (the negative reciprocal: switch and
   change the sign). Heavy on the classic perpendicular traps and
   on judging it straight off a to-scale diagram.
   ============================================================ */
import { mc } from "./_shared.js";
import { yesnoQ, winFor, AG } from "./_analytical.js";
import { gradFrac, isPerpendicular, gradFromStandard, pick } from "../analyticslib.js";

const ACC = AG[2];

/* a tidy gradient as small rise/run, never 0.
   noOne: skip |m| = 1 — for m = ±1 the "switched only" and "changed sign only"
   decoys collapse into the answer/original, leaving a 2-button question. */
function cleanGrad({ noOne = false } = {}) {
  const opts = [[1, 1], [2, 1], [3, 1], [1, 2], [2, 3], [3, 2], [3, 4], [1, 3], [4, 3], [1, 4]];
  const [rise, run] = pick(noOne ? opts.filter(([a, b]) => a !== b) : opts);
  return { dy: rise * pick([1, -1]), dx: run };
}
const mOf = (g) => g.dy / g.dx;

/* two full lines through the origin with the given gradients — endpoints at a
   FIXED distance from O so a steep rise/run can't blow the window up and
   shrink the picture (the lines are clipped to the window either way) */
function twoLines(g1, g2, perp) {
  const stretch = (d) => { const k = 6.5 / Math.hypot(d.x, d.y); return { x: d.x * k, y: d.y * k }; };
  const d1 = stretch({ x: g1.dx, y: g1.dy }), d2 = stretch({ x: g2.dx, y: g2.dy });
  const segs = [
    { a: { x: -d1.x, y: -d1.y }, b: { x: d1.x, y: d1.y }, kind: "line", id: "l1", tone: "a" },
    { a: { x: -d2.x, y: -d2.y }, b: { x: d2.x, y: d2.y }, kind: "line", id: "l2", tone: "b" },
  ];
  if (perp) segs[0].perp = 1;                          // verify will confirm the 90°
  return {
    type: "analytic", accent: ACC, grid: true,
    win: winFor([segs[0].a, segs[0].b, segs[1].a, segs[1].b], { min: 9 }),
    segs,
  };
}

const SKILLS = {
  /* parallel test from two gradients */
  parallelTest: () => {
    const g = cleanGrad(), same = pick([true, false]);
    const g2 = same ? { ...g } : cleanGrad();
    const yes = Math.abs(mOf(g) - mOf(g2)) < 1e-9;
    return yesnoQ("parallelPerp",
      `Two lines have gradients <b>${gradFrac(g.dy, g.dx).str}</b> and <b>${gradFrac(g2.dy, g2.dx).str}</b>. Are the lines <b>parallel</b>?`,
      yes,
      { hint: "Parallel lines have EQUAL gradients.",
        answerLabel: yes ? "Yes — equal gradients, so parallel." : "No — the gradients are different." });
  },

  /* perpendicular test from two gradients */
  perpTest: () => {
    const g = cleanGrad();
    const make = pick(["perp", "flip", "switch", "same"]);
    let g2;
    if (make === "perp") g2 = perpFrac(g);                  // true negative reciprocal
    else if (make === "flip") g2 = { dy: Math.abs(g.dy), dx: Math.abs(g.dx) };  // forgot the sign
    else if (make === "switch") g2 = { dy: -g.dy, dx: g.dx };                   // forgot to switch
    else g2 = { ...g };
    const yes = isPerpendicular(mOf(g), mOf(g2));
    return yesnoQ("parallelPerp",
      `Two lines have gradients <b>${gradFrac(g.dy, g.dx).str}</b> and <b>${gradFrac(g2.dy, g2.dx).str}</b>. Are the lines <b>perpendicular</b>?`,
      yes,
      { hint: "Perpendicular ⇔ the gradients multiply to −1 (switch the fraction AND change the sign).",
        answerLabel: yes ? "Yes — the gradients multiply to −1." : "No — multiply them: you don’t get −1." });
  },

  /* the negative reciprocal */
  perpGradient: () => {
    const g = cleanGrad({ noOne: true });
    const right = perpFrac(g);
    const correct = gradFrac(right.dy, right.dx).str;
    const decoys = [
      gradFrac(g.dx, g.dy).str,                 // switched but kept the sign
      gradFrac(-g.dy, g.dx).str,                // changed sign, didn’t switch
      gradFrac(g.dy, g.dx).str,                 // unchanged
    ];
    return mc("perpGradient",
      `A line has gradient <b>${gradFrac(g.dy, g.dx).str}</b>. The gradient <b>perpendicular</b> to it is…`,
      correct, decoys,
      { hint: "Negative reciprocal: turn the fraction upside-down AND flip the sign.",
        answerLabel: `Perpendicular gradient = ${correct}.` });
  },

  /* classify: parallel / perpendicular / neither */
  classify: () => {
    const g = cleanGrad();
    const make = pick(["par", "perp", "neither"]);
    const g2 = make === "par" ? { ...g } : make === "perp" ? perpFrac(g) : cleanGrad();
    const m1 = mOf(g), m2 = mOf(g2);
    const correct = Math.abs(m1 - m2) < 1e-9 ? "parallel" : isPerpendicular(m1, m2) ? "perpendicular" : "neither";
    return mc("parallelPerp",
      `Lines with gradients <b>${gradFrac(g.dy, g.dx).str}</b> and <b>${gradFrac(g2.dy, g2.dx).str}</b> are…`,
      correct, ["parallel", "perpendicular", "neither"].filter((x) => x !== correct),
      { hint: "Equal → parallel. Multiply to −1 → perpendicular. Otherwise neither.",
        answerLabel: `They are ${correct}.` });
  },

  /* judge perpendicular straight off a to-scale diagram */
  fromGraph: () => {
    const g = cleanGrad();
    const perp = pick([true, false]);
    const g2 = perp ? perpFrac(g) : (pick([true, false]) ? { dy: Math.abs(g.dy), dx: Math.abs(g.dx) } : cleanGrad());
    const really = isPerpendicular(mOf(g), mOf(g2));
    return yesnoQ("parallelPerp",
      "Are the two lines <b>perpendicular</b> (do they cross at a right angle)?",
      really,
      { graph: twoLines(g, g2, really),
        hint: "The picture is exactly to scale — a true right angle looks square.",
        answerLabel: really ? "Yes — they meet at 90°." : "No — they don’t meet at 90°." });
  },

  /* read a gradient from standard form */
  fromStandard: () => {
    let a, b;
    do { a = pick([1, 2, 3, 5, 7]) * pick([1, -1]); b = pick([2, 3, 4, 5]); }
    while (Math.abs(a) === b);                         // |a| = b makes m = ±1 and the decoys collapse to 2 buttons
    const m = gradFromStandard(a, b);                  // −a/b
    const correct = gradFrac(-a, b).str;
    return mc("perpGradient",
      `The line <b>${a < 0 ? "−" + Math.abs(a) : a}x + ${b}y = 0</b> can be written y = mx + c. Its gradient is…`,
      correct, [gradFrac(a, b).str, gradFrac(b, a).str, gradFrac(-b, a).str],
      { hint: `Make y the subject: ${b}y = ${-a < 0 ? "−" : ""}${Math.abs(a)}x, so m = −a/b.`,
        answerLabel: `Gradient = ${correct}.` });
  },

  /* the rule, stated */
  perpRule: () => {
    return mc("parallelPerp",
      "Two lines are <b>perpendicular</b> exactly when their gradients…",
      "multiply to give −1",
      ["are equal", "add up to 0", "are both positive"],
      { hint: "Parallel: equal gradients. Perpendicular: m₁ × m₂ = −1.",
        answerLabel: "m₁ × m₂ = −1." });
  },
};

/* the true negative-reciprocal as a rise/run pair: m = dy/dx → −dx/dy */
function perpFrac(g) { return { dy: -g.dx, dx: g.dy }; }

export const questAg3 = {
  id: "ag3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "perpGradient" || id === "fromStandard") ? "perpGradient" : "parallelPerp", gen,
  })),
};
