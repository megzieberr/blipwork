/* ============================================================
   ANALYTICAL GEOMETRY · Q7 — Putting it together + proof words
   ------------------------------------------------------------
   The vocabulary the exam reasons in: median / altitude /
   perpendicular bisector, and the "to prove …, show …" table
   (parallel, perpendicular, collinear, parallelogram). Plus
   which formula does which job on a circle. Diagram-backed where
   it helps you tell a median from an altitude.
   ============================================================ */
import { mc } from "./_shared.js";
import { tapQ, triangleAltitude, winFor, AG } from "./_analytical.js";
import { midpoint, triArea, randPoint, pick } from "../analyticslib.js";

const ACC = AG[6];

/* a median diagram: apex → midpoint of the base, with equal-half ticks */
function medianDiagram(P, base) {
  const [b1, b2] = base.split("");
  const apex = ["A", "B", "C"].find((k) => k !== b1 && k !== b2);
  const M = midpoint(P[b1], P[b2]);
  return {
    type: "analytic", accent: ACC, grid: true,
    win: winFor(["A", "B", "C"].map((k) => P[k]), { min: 9 }),
    polys: [{ pts: [P[b1], P[b2], P[apex]], fill: true }],
    segs: [
      { a: P[b1], b: P[b2] }, { a: P[b2], b: P[apex] }, { a: P[apex], b: P[b1] },
      { a: P[apex], b: M, dash: true, tone: "b" },
    ],
    ticks: [{ a: P[b1], b: M, n: 1 }, { a: M, b: P[b2], n: 1 }],
    points: ["A", "B", "C"].map((k) => ({ x: P[k].x, y: P[k].y, label: k, place: "auto" })),
  };
}
function niceTri() {
  for (let i = 0; i < 200; i++) {
    const A = randPoint(-5, 5), B = randPoint(-5, 5), C = randPoint(-5, 5);
    if (triArea(A, B, C) >= 7) return { P: { A, B, C }, base: pick(["AB", "BC", "CA"]) };
  }
  return { P: { A: { x: -3, y: -1 }, B: { x: 4, y: -1 }, C: { x: 1, y: 4 } }, base: "AB" };
}

const SKILLS = {
  /* name the special line from its description */
  lineNames: () => {
    const cases = [
      { p: "A line from a vertex to the <b>midpoint</b> of the opposite side is a…", c: "median", w: ["altitude", "perpendicular bisector"] },
      { p: "A line from a vertex, <b>perpendicular</b> to the opposite side, is an…", c: "altitude", w: ["median", "perpendicular bisector"] },
      { p: "A line through the <b>midpoint</b> of a segment AND <b>perpendicular</b> to it is a…", c: "perpendicular bisector", w: ["median", "altitude"] },
    ];
    const k = pick(cases);
    return mc("proofWords", k.p, k.c, k.w,
      { hint: "Median → midpoint. Altitude → right angle. Perpendicular bisector → midpoint AND right angle.",
        answerLabel: k.c });
  },

  /* identify the dashed line on a diagram: median vs altitude */
  identifyLine: () => {
    const { P, base } = niceTri();
    const isAlt = pick([true, false]);
    const spec = isAlt ? triangleAltitude(P, base, { accent: ACC }).spec : medianDiagram(P, base);
    return mc("proofWords",
      "What is the dashed line inside the triangle?",
      isAlt ? "an altitude (it meets the side at 90°)" : "a median (it goes to the midpoint)",
      isAlt ? ["a median (it goes to the midpoint)", "a perpendicular bisector"] : ["an altitude (it meets the side at 90°)", "a side of the triangle"],
      { graph: spec,
        hint: "Right-angle mark → altitude. Equal tick marks (equal halves) → median.",
        answerLabel: isAlt ? "An altitude — note the right-angle mark." : "A median — note the equal halves." });
  },

  /* prove parallel */
  proveParallel: () => {
    return mc("proofWords",
      "To prove <b>AB ∥ CD</b> (parallel), you show…",
      "m<sub>AB</sub> = m<sub>CD</sub> (equal gradients)",
      ["m<sub>AB</sub> × m<sub>CD</sub> = −1", "AB = CD (equal lengths)", "they share a midpoint"],
      { hint: "Parallel lines have EQUAL gradients.", answerLabel: "Equal gradients: m_AB = m_CD." });
  },

  /* prove perpendicular */
  provePerp: () => {
    return mc("proofWords",
      "To prove <b>AB ⊥ CD</b> (perpendicular), you show…",
      "m<sub>AB</sub> × m<sub>CD</sub> = −1",
      ["m<sub>AB</sub> = m<sub>CD</sub>", "AB = CD", "they have the same midpoint"],
      { hint: "Perpendicular gradients multiply to −1.", answerLabel: "m_AB × m_CD = −1." });
  },

  /* prove collinear */
  proveCollinear: () => {
    return mc("proofWords",
      "To prove A, B and C are <b>collinear</b> (on one straight line), you show…",
      "m<sub>AB</sub> = m<sub>BC</sub> (same gradient, shared point B)",
      ["m<sub>AB</sub> × m<sub>BC</sub> = −1", "AB = BC", "B is the midpoint of AC"],
      { hint: "Same straight line → the little segments have the SAME gradient.",
        answerLabel: "m_AB = m_BC (they share point B)." });
  },

  /* prove parallelogram (diagonal method) */
  proveParallelogram: () => {
    return mc("proofWords",
      "To prove a quadrilateral is a <b>parallelogram</b> using the diagonals, you show…",
      "the diagonals bisect each other (same midpoint)",
      ["the diagonals are equal in length", "the diagonals are perpendicular", "all four sides are equal"],
      { hint: "Diagonals of a parallelogram share a midpoint — they bisect each other.",
        answerLabel: "The diagonals have the same midpoint." });
  },

  /* circle jobs */
  circleFormulas: () => {
    const ask = pick([
      { p: "The <b>centre</b> of a circle is the … of a diameter.", c: "midpoint", w: ["gradient", "length", "distance"] },
      { p: "To find the length of the <b>radius</b>, you use the … formula.", c: "distance", w: ["midpoint", "gradient", "area"] },
    ]);
    return mc("proofWords", ask.p, ask.c, ask.w,
      { hint: "Centre = midpoint of a diameter. Radius is a length → distance formula.", answerLabel: ask.c });
  },
};

export const questAg7 = {
  id: "ag7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "proofWords", gen })),
};
