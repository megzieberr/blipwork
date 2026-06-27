/* ============================================================
   MEASUREMENT QUEST 1 · Name it & its formula   ★ DIAGRAM
   Read a to-scale solid; name it and pick its volume / surface-area
   formula. Foundation for the whole chapter — the picture, not the
   words, tells you which formula fits.
   ============================================================ */
import { mc } from "./_shared.js";
import {
  SOLID, VOL_WRONG, SA_WRONG, wrongs,
  figCube, figPrism, figTriPrism, figCylinder, figCone, figPyramid, figSphere, figHemisphere,
  pick, shuffled,
} from "../measlib.js";

const ACC = "#65a30d";

/* a solid key → its to-scale figure (closed, plain letter labels) */
const FIG = {
  cube: figCube, prism: figPrism, triPrism: figTriPrism, cylinder: a => figCylinder(a, "none"),
  cone: figCone, pyramid: figPyramid, sphere: figSphere, hemisphere: figHemisphere,
};
const NAMES = Object.keys(SOLID).map(k => SOLID[k].name);

const SKILLS = {
  /* name the solid you can see */
  nameSolid: () => {
    const key = pick(Object.keys(SOLID));
    const correct = SOLID[key].name;
    const wrong = shuffled(NAMES.filter(n => n !== correct)).slice(0, 3);
    return mc("measNaming",
      "What solid is this?",
      correct, wrong,
      { graph: FIG[key](ACC),
        hint: "Look at the faces: flat polygons make a prism/pyramid; a curved face means a cylinder, cone or sphere.",
        answerLabel: `This is a ${correct}.`,
        solution: [{ s: `A ${correct} — read it off the faces and the cross-section.` }] });
  },

  /* choose the VOLUME formula */
  volFormula: () => {
    const key = pick(["cube", "prism", "cylinder", "cone", "pyramid", "sphere"]);
    const s = SOLID[key];
    return mc("volFormula",
      `Which is the correct <b>volume</b> formula for this ${s.name}?`,
      s.vol, wrongs(VOL_WRONG[key], s.vol),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: "Volume fills the inside (cubic units). Prisms & cylinders: base area × height. Cones & pyramids: a third of that.",
        answerLabel: `Volume of a ${s.name} = ${s.vol}.`,
        solution: [{ s: `V = ${s.vol}`, r: s.name }] });
  },

  /* choose the (total, closed) SURFACE AREA formula */
  saFormula: () => {
    const key = pick(["cube", "prism", "cylinder", "cone", "sphere"]);
    const s = SOLID[key];
    return mc("saFormula",
      `Which is the correct <b>total surface area</b> formula for this closed ${s.name}?`,
      s.sa, wrongs(SA_WRONG[key], s.sa),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: "Surface area adds up every outside face (square units). Curved faces unroll: a cylinder's side becomes a 2πr × h rectangle.",
        answerLabel: `Total surface area of a closed ${s.name} = ${s.sa}.`,
        solution: [{ s: `SA = ${s.sa}`, r: s.name }] });
  },

  /* prisms & cylinders: V = base area × height */
  baseTimesHeight: () => ({
    type: "yesno", concept: "volFormula",
    prompt: "For <b>any</b> prism or a cylinder, is the volume always (area of the base) × (perpendicular height)?",
    graph: pick([figPrism, figTriPrism, a => figCylinder(a, "none")])(ACC),
    yes: true,
    hint: "A prism keeps the same cross-section all the way up, so you just stack the base area through the height.",
    answerLabel: "Yes — for a prism or cylinder, V = base area × height.",
    solution: [{ s: "Same cross-section all the way up → V = A_base × H." }],
  }),

  /* the one-third family */
  thirdFamily: () => mc("thirdFamily",
    "A cone holds how much of a cylinder that has the <b>same base and height</b>?",
    "one third (⅓)", ["one half (½)", "two thirds (⅔)", "the same amount"],
    { graph: figCone(ACC, { showPerp: true }),
      hint: "Cones and pyramids are the ‘pointy’ third — V = ⅓ × (matching prism or cylinder).",
      answerLabel: "⅓ — a cone is ⅓ of the cylinder with the same base and height, so V = ⅓πr²H.",
      solution: [{ s: "V(cone) = ⅓ × V(cylinder) = ⅓πr²H" }] }),
};

export const questM1 = {
  id: "m1",
  skills: [
    { id: "nameSolid", concept: "measNaming", gen: SKILLS.nameSolid },
    { id: "volFormula", concept: "volFormula", gen: SKILLS.volFormula },
    { id: "saFormula", concept: "saFormula", gen: SKILLS.saFormula },
    { id: "baseTimesHeight", concept: "volFormula", gen: SKILLS.baseTimesHeight },
    { id: "thirdFamily", concept: "thirdFamily", gen: SKILLS.thirdFamily },
  ],
};
