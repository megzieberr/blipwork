/* ============================================================
   MEASUREMENT QUEST 2 · Slant vs perpendicular height   ★ DIAGRAM
   The classic trap on cones & pyramids: the VOLUME uses the
   perpendicular height H, the slanted FACE area uses the slant
   height h. Read which is which off the picture (both are drawn,
   H dashed straight down the middle, h along the slanted face).
   ============================================================ */
import { mc } from "./_shared.js";
import { figCone, figPyramid, pick } from "../measlib.js";

const ACC = "#65a30d";
const bothCone = () => figCone(ACC, { showPerp: true, showSlant: true });
const bothPyr = () => figPyramid(ACC, { showPerp: true, showSlant: true });

const SKILLS = {
  /* volume uses the PERPENDICULAR height */
  volUsesPerp: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const shape = cone ? "cone" : "pyramid";
    const vol = cone ? "⅓πr²H" : "⅓ℓ²H";
    return mc("slantPerp",
      `For the <b>volume</b> of this ${shape} (${vol}), which height do you use?`,
      "H — the perpendicular height", ["h — the slant height", "neither; you use the radius", "you may use either one"],
      { graph: g,
        hint: "Volume is about how much fills the inside, so you need the true straight-up height H, not the longer slanted one.",
        answerLabel: "The perpendicular height H — it runs straight from the apex down to the centre of the base.",
        solution: [{ s: `V = ${vol} uses the perpendicular height H (the dashed line down the middle).` }] });
  },

  /* the slanted FACE area uses the SLANT height */
  saUsesSlant: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const shape = cone ? "cone" : "pyramid";
    const face = cone ? "curved surface (πrh)" : "triangular side faces (½·p·h)";
    return mc("slantPerp",
      `For the <b>${face}</b> of this ${shape}, which height do you use?`,
      "h — the slant height", ["H — the perpendicular height", "the radius r", "the base side ℓ"],
      { graph: g,
        hint: "The slanted face lies along the slope, so its area needs the length measured along that slope — the slant height h.",
        answerLabel: "The slant height h — it runs along the sloping face, from the apex to the edge of the base.",
        solution: [{ s: `The sloping face is measured with the slant height h, not the perpendicular H.` }] });
  },

  /* identify the slant height on the picture */
  whichIsSlant: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const desc = cone
      ? "from the apex, down the sloping side, to the rim of the base"
      : "from the apex, down the middle of a triangular face, to a base edge";
    return mc("slantPerp",
      "On this diagram, which length is the <b>slant height h</b>?",
      `the slanted line ${desc}`,
      ["the dashed line straight down the middle", "the line across the base (the radius / side)", "the longest edge of the whole solid"],
      { graph: g,
        hint: "h is the one drawn along the slope; the dashed straight-down line is the perpendicular height H.",
        answerLabel: `The slant height h is the slanting line ${desc}.`,
        solution: [{ s: "h = slant (along the face); H = perpendicular (dashed, straight down)." }] });
  },

  /* which is bigger? (slant is the hypotenuse) */
  slantBigger: () => ({
    type: "yesno", concept: "slantPerp",
    prompt: "Is the slant height h always <b>longer</b> than the perpendicular height H?",
    graph: bothCone(),
    yes: true,
    hint: "h, H and the radius form a right-angled triangle with h as the hypotenuse (h² = H² + r²).",
    answerLabel: "Yes — h is the hypotenuse of the right triangle h² = H² + r², so h > H.",
    solution: [{ s: "h² = H² + r²  →  h is the hypotenuse, so it is the longest of the three." }],
  }),

  /* units: area vs volume */
  units: () => {
    const vol = pick([true, false]);
    return mc("saVsVol",
      vol
        ? "All lengths on a solid are in <b>cm</b>. Its <b>volume</b> is measured in …"
        : "All lengths on a solid are in <b>cm</b>. Its <b>surface area</b> is measured in …",
      vol ? "cm³ (cubic)" : "cm² (square)",
      vol ? ["cm² (square)", "cm (just cm)", "cm⁴"] : ["cm³ (cubic)", "cm (just cm)", "cm⁴"],
      { hint: "Area covers a flat region (length × length → squared); volume fills space (length × length × length → cubed).",
        answerLabel: vol ? "Volume is a cubic measure → cm³." : "Surface area is a square measure → cm².",
        solution: [{ s: vol ? "length³ → cm³" : "length² → cm²" }] });
  },
};

export const questM2 = {
  id: "m2",
  skills: [
    { id: "volUsesPerp", concept: "slantPerp", gen: SKILLS.volUsesPerp },
    { id: "saUsesSlant", concept: "slantPerp", gen: SKILLS.saUsesSlant },
    { id: "whichIsSlant", concept: "slantPerp", gen: SKILLS.whichIsSlant },
    { id: "slantBigger", concept: "slantPerp", gen: SKILLS.slantBigger },
    { id: "units", concept: "saVsVol", gen: SKILLS.units },
  ],
};
