/* ============================================================
   MEASUREMENT QUEST 5 · Mixed: read it & pick the formula   ★ DIAGRAM
   Everything together — name/volume/surface-area across all solids,
   the open-end cases, plus the exam favourite: scale every length by
   k and area grows ×k², volume ×k³.
   ============================================================ */
import { mc } from "./_shared.js";
import {
  SOLID, VOL_WRONG, SA_WRONG, wrongs, cylSaOptions, CYL_SA_LABEL,
  figCube, figPrism, figTriPrism, figCylinder, figCone, figPyramid, figSphere, figHemisphere,
  pick, shuffled,
} from "../measlib.js";

const ACC = "#65a30d";
const FIG = {
  cube: figCube, prism: figPrism, triPrism: figTriPrism, cylinder: a => figCylinder(a, "none"),
  cone: figCone, pyramid: figPyramid, sphere: figSphere, hemisphere: figHemisphere,
};
const NAMES = Object.keys(SOLID).map(k => SOLID[k].name);

const SKILLS = {
  /* name any solid */
  mixName: () => {
    const key = pick(Object.keys(SOLID));
    const correct = SOLID[key].name;
    return mc("measNaming", "Name this solid.", correct,
      shuffled(NAMES.filter(n => n !== correct)).slice(0, 3),
      { graph: FIG[key](ACC),
        hint: "Flat faces only → prism or pyramid. A curved face → cylinder, cone, sphere or hemisphere.",
        answerLabel: `A ${correct}.`, solution: [{ s: correct }] });
  },

  /* volume formula, any solid */
  mixVolume: () => {
    const key = pick(Object.keys(SOLID));
    const s = SOLID[key];
    return mc("volFormula", `Pick the <b>volume</b> formula for this ${s.name}.`,
      s.vol, wrongs(VOL_WRONG[key], s.vol),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: "Prisms/cylinder: base × height. Cone/pyramid: ⅓ of that. Sphere 4/3·πr³, hemisphere half of it.",
        answerLabel: `V = ${s.vol}.`, solution: [{ s: `V = ${s.vol}`, r: s.name }] });
  },

  /* surface-area formula, any solid */
  mixSA: () => {
    const key = pick(["cube", "prism", "triPrism", "cylinder", "cone", "sphere", "hemisphere"]);
    const s = SOLID[key];
    return mc("saFormula", `Pick the <b>total surface area</b> formula for this closed ${s.name}.`,
      s.sa, wrongs(SA_WRONG[key], s.sa),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: "Add every outside face. Curved sides unroll into rectangles; round ends are circles.",
        answerLabel: `SA = ${s.sa}.`, solution: [{ s: `SA = ${s.sa}`, r: s.name }] });
  },

  /* open vs closed cylinder */
  mixOpen: () => {
    const open = pick(["none", "top", "both"]);
    const { correct, wrongs: w } = cylSaOptions(open);
    return mc("openSurfaces", "Read the diagram — which surface-area formula fits this cylinder?",
      correct, w,
      { graph: figCylinder(ACC, open), layout: "grid2",
        hint: "Curved side 2πrh always; add πr² for each CLOSED end.",
        answerLabel: `${CYL_SA_LABEL[open]} → ${correct}.`,
        solution: [{ s: `${CYL_SA_LABEL[open]} → SA = ${correct}` }] });
  },

  /* scaling effect on volume (×k³) */
  scaleVolume: () => {
    const k = pick([2, 3]);
    const ans = k ** 3;
    return mc("scaleFactor",
      `Every dimension of a solid is multiplied by ${k}. Its <b>volume</b> becomes how many times as big?`,
      `×${ans}`, [`×${k}`, `×${k * k}`, `×${k * k + k}`],
      { hint: "Volume uses three lengths, so it scales by k × k × k = k³.",
        answerLabel: `×${ans} — volume scales by k³ = ${k}³ = ${ans}.`,
        solution: [{ s: `k³ = ${k}³ = ${ans}` }] });
  },

  /* scaling effect on surface area (×k²) */
  scaleArea: () => {
    const k = pick([2, 3]);
    const ans = k ** 2;
    return mc("scaleFactor",
      `Every dimension of a solid is multiplied by ${k}. Its <b>surface area</b> becomes how many times as big?`,
      `×${ans}`, [`×${k}`, `×${k ** 3}`, `×${k * k + 1}`],
      { hint: "Area uses two lengths, so it scales by k × k = k².",
        answerLabel: `×${ans} — surface area scales by k² = ${k}² = ${ans}.`,
        solution: [{ s: `k² = ${k}² = ${ans}` }] });
  },
};

export const questM5 = {
  id: "m5",
  skills: [
    { id: "mixName", concept: "measNaming", gen: SKILLS.mixName },
    { id: "mixVolume", concept: "volFormula", gen: SKILLS.mixVolume },
    { id: "mixSA", concept: "saFormula", gen: SKILLS.mixSA },
    { id: "mixOpen", concept: "openSurfaces", gen: SKILLS.mixOpen },
    { id: "scaleVolume", concept: "scaleFactor", gen: SKILLS.scaleVolume },
    { id: "scaleArea", concept: "scaleFactor", gen: SKILLS.scaleArea },
  ],
};
