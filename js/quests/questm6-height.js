/* ============================================================
   MEASUREMENT QUEST 6 · Find the perpendicular height   ★ DIAGRAM
   The slant-vs-perpendicular confusion, head on. Every solid is
   drawn WITH its hidden right-angled triangle and a right-angle
   marker, so the learner can see which length is which:
     • cone:    h² = H² + r²        bottom leg = the FULL radius
     • pyramid: h² = H² + (ℓ/2)²    bottom leg = HALF the base
   h = slant (hypotenuse), H = perpendicular height. Whole-number
   triples → clean answers, no π.
   ============================================================ */
import { mc } from "./_shared.js";
import { coneTriple, pyramidTriple, figConeHeight, figPyramidHeight } from "../measlib.js";

const ACC = "#4d7c0f";
const sq = n => n * n;

/* Drawing-safe triples: the engine's fixed label offsets put "H"/"h" ON the
   dashed back rim (k·[3,4,5] tall cones, where H ≈ 1,41r so the rim passes
   through the middle of the H line) or on the silhouette (very narrow
   cones). Wide cones always draw clean; the tall 8-15-17 draws clean in a
   slightly taller frame. Verified against solid-graph geometry — review. */
function safeConeTriple() {
  for (;;) { const t = coneTriple(); if (t.r > t.H || (t.r === 8 && t.H === 15)) return t; }
}
function coneFig(t, unknown, letters = false) {
  const g = figConeHeight(ACC, t, unknown, letters);
  if (t.H > t.r) g.h2 = 300;                                   // tall cone → taller frame
  else if (unknown === "H" && t.slant >= 2 * t.H) g.w = 360;   // very wide cone → wider frame
  return g;
}
/* the 16-base pyramid projects a base corner onto the middle of the H line —
   its labels always sit on hidden edges, so skip that one triple */
function safePyramidTriple() {
  for (;;) { const t = pyramidTriple(); if (t.half < 8) return t; }
}

const SKILLS = {
  /* cone: given r and slant h, find the perpendicular height H */
  coneFindH: () => {
    const t = safeConeTriple();
    return {
      type: "calc", concept: "findHeight",
      prompt: "Calculate the <b>perpendicular height H</b> of this cone.",
      graph: coneFig(t, "H"),
      expected: t.H, dp: 0,
      hint: "r, H and the slant h make a right-angled triangle with the slant as the hypotenuse: h² = H² + r². So H = √(h² − r²).",
      answerLabel: `H = √(${t.slant}² − ${t.r}²) = √${sq(t.slant) - sq(t.r)} = ${t.H}`,
      solution: [
        { s: "h² = H² + r²  →  H² = h² − r²", r: "the slant is the hypotenuse" },
        { s: `H² = ${t.slant}² − ${t.r}² = ${sq(t.slant)} − ${sq(t.r)} = ${sq(t.slant) - sq(t.r)}` },
        { s: `H = √${sq(t.slant) - sq(t.r)} = ${t.H}` },
      ],
    };
  },

  /* cone: given r and H, find the slant height h */
  coneFindSlant: () => {
    const t = safeConeTriple();
    return {
      type: "calc", concept: "findHeight",
      prompt: "Calculate the <b>slant height h</b> of this cone.",
      graph: coneFig(t, "slant"),
      expected: t.slant, dp: 0,
      hint: "The slant is the hypotenuse, so it sits alone: h² = H² + r², giving h = √(H² + r²).",
      answerLabel: `h = √(${t.H}² + ${t.r}²) = √${sq(t.H) + sq(t.r)} = ${t.slant}`,
      solution: [
        { s: "h² = H² + r²", r: "Pythagoras" },
        { s: `h² = ${t.H}² + ${t.r}² = ${sq(t.H)} + ${sq(t.r)} = ${sq(t.H) + sq(t.r)}` },
        { s: `h = √${sq(t.H) + sq(t.r)} = ${t.slant}` },
      ],
    };
  },

  /* pyramid: given base ℓ and slant h, find H — the trap is using HALF the base */
  pyramidFindH: () => {
    const t = safePyramidTriple();
    return {
      type: "calc", concept: "findHeight",
      prompt: "Calculate the <b>perpendicular height H</b> of this square-based pyramid.",
      graph: figPyramidHeight(ACC, t, "H"),
      expected: t.H, dp: 0,
      hint: "The slant h, the height H and HALF the base (ℓ/2) form a right triangle: h² = H² + (ℓ/2)². Use HALF the base, not the whole side!",
      answerLabel: `½ℓ = ${t.half}, so H = √(${t.slant}² − ${t.half}²) = √${sq(t.slant) - sq(t.half)} = ${t.H}`,
      solution: [
        { s: `half the base: ℓ/2 = ${t.s} ÷ 2 = ${t.half}`, r: "the bottom leg is HALF the base" },
        { s: `h² = H² + (ℓ/2)²  →  H² = ${t.slant}² − ${t.half}² = ${sq(t.slant) - sq(t.half)}` },
        { s: `H = √${sq(t.slant) - sq(t.half)} = ${t.H}` },
      ],
    };
  },

  /* the cone relationship */
  coneRelation: () => mc("findHeight",
    "For a cone, how are the radius r, perpendicular height H and slant height h related?",
    "h² = H² + r²", ["H² = h² + r²", "h² = H² − r²", "h = H + r"],
    { graph: coneFig(safeConeTriple(), null, true), layout: "grid2",
      hint: "The slant h is the longest side (opposite the right angle), so it sits alone as the c in a² + b² = c².",
      answerLabel: "h² = H² + r² — the slant is the hypotenuse.",
      solution: [{ s: "legs r and H, hypotenuse h → h² = H² + r²" }] }),

  /* the pyramid trap: which is the bottom leg */
  pyramidWhichLeg: () => mc("findHeight",
    "To find a square pyramid's perpendicular height from the slant height of a face, what is the <b>bottom</b> of the right-angled triangle?",
    "half the base side (½ℓ)", ["the full base side (ℓ)", "the diagonal of the base", "the slant height (h)"],
    { graph: figPyramidHeight(ACC, safePyramidTriple(), null, true),
      hint: "The slant runs to the MIDDLE of a base edge, so the bottom leg only reaches halfway across — ½ℓ.",
      answerLabel: "Half the base side, ½ℓ — the slant meets the base at the midpoint of an edge.",
      solution: [{ s: "h² = H² + (ℓ/2)²  →  bottom leg is ½ℓ, not the whole ℓ" }] }),

  /* the slant is the hypotenuse */
  hypIs: () => ({
    type: "yesno", concept: "findHeight",
    prompt: "In the right-angled triangle inside this solid, is the <b>slant height</b> the hypotenuse (the longest side)?",
    graph: coneFig(safeConeTriple(), null, true),
    yes: true,
    hint: "The right angle sits between the radius and the perpendicular height, so the side opposite it is the slant.",
    answerLabel: "Yes — the slant is opposite the right angle, so it is the hypotenuse and the longest of the three.",
    solution: [{ s: "right angle between r and H → slant is the hypotenuse, so slant > H and slant > r" }],
  }),
};

export const questM6 = {
  id: "m6",
  skills: [
    { id: "coneFindH", concept: "findHeight", gen: SKILLS.coneFindH },
    { id: "pyramidFindH", concept: "findHeight", gen: SKILLS.pyramidFindH },
    { id: "coneFindSlant", concept: "findHeight", gen: SKILLS.coneFindSlant },
    { id: "coneRelation", concept: "findHeight", gen: SKILLS.coneRelation },
    { id: "pyramidWhichLeg", concept: "findHeight", gen: SKILLS.pyramidWhichLeg },
    { id: "hypIs", concept: "findHeight", gen: SKILLS.hypIs },
  ],
};
