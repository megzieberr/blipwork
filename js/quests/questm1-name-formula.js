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
import { L } from "../lang.js";

const ACC = "#65a30d";

/* Label-safe figure tweaks: the solid engine places its dimension letters
   at fixed pixel offsets, and a few proportions land a letter ON an edge
   (measured against solid-graph geometry — see the chapter review). Nudge
   just those proportions; everything stays to scale. */
const figPrismSafe = a => { const g = figPrism(a); if (g.h === g.b + 3) g.h -= 1; return g; };  // "h" off the hidden base edge
const figTriPrismSafe = a => {
  const g = figTriPrism(a);
  [g.b, g.th] = pick([[5, 5], [6, 4], [7, 4], [6, 6], [7, 5]]);          // "⊥h"/"H" clear of the sloping faces
  if (g.L === 9 && g.b + g.th === 12) g.L = 10;
  if (g.L === 8 && g.b === 7 && g.th === 4) g.L = 9;
  return g;
};
const figConePerp = a => { const g = figCone(a, { showPerp: true }); if ((g.r === 5 && g.h === 7) || (g.r === 6 && g.h === 8)) g.h += 2; return g; };  // "H" off the back rim

/* a solid key → its to-scale figure (closed, plain letter labels) */
const FIG = {
  cube: figCube, prism: figPrismSafe, triPrism: figTriPrismSafe, cylinder: a => figCylinder(a, "none"),
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
      L("What solid is this?", "Watter liggaam is dit?"),
      correct, wrong,
      { graph: FIG[key](ACC),
        hint: L("Look at the faces: flat polygons make a prism/pyramid; a curved face means a cylinder, cone or sphere.", "Kyk na die vlakke: plat veelhoeke maak 'n prisma/piramide; 'n geboë vlak beteken 'n silinder, keël of sfeer."),
        answerLabel: L(`This is a ${correct}.`, `Dit is 'n ${correct}.`),
        solution: [{ s: L(`A ${correct} — read it off the faces and the cross-section.`, `'n ${correct}: lees dit af van die vlakke en die dwarssnit.`) }] });
  },

  /* choose the VOLUME formula */
  volFormula: () => {
    const key = pick(["cube", "prism", "cylinder", "cone", "pyramid", "sphere"]);
    const s = SOLID[key];
    return mc("volFormula",
      L(`Which is the correct <b>volume</b> formula for this ${s.name}?`, `Watter formule gee die <b>volume</b> van hierdie ${s.name}?`),
      s.vol, wrongs(VOL_WRONG[key], s.vol),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: L("Volume fills the inside (cubic units). Prisms & cylinders: base area × height. Cones & pyramids: a third of that.", "Volume vul die binnekant (kubieke eenhede). Prismas & silinders: basisoppervlakte × hoogte. Keëls & piramides: 'n derde daarvan."),
        answerLabel: L(`Volume of a ${s.name} = ${s.vol}.`, `Volume van 'n ${s.name} = ${s.vol}.`),
        solution: [{ s: L(`V = ${s.vol}`, `V = ${s.vol}`), r: s.name }] });
  },

  /* choose the (total, closed) SURFACE AREA formula */
  saFormula: () => {
    const key = pick(["cube", "prism", "cylinder", "cone", "sphere"]);
    const s = SOLID[key];
    return mc("saFormula",
      L(`Which is the correct <b>total surface area</b> formula for this closed ${s.name}?`, `Watter formule gee die <b>totale buite-oppervlakte</b> van hierdie geslote ${s.name}?`),
      s.sa, wrongs(SA_WRONG[key], s.sa),
      { graph: FIG[key](ACC), layout: "grid2",
        hint: L("Surface area adds up every outside face (square units). Curved faces unroll: a cylinder's side becomes a 2πr × h rectangle.", "Buite-oppervlakte tel elke buitenste vlak op (vierkante eenhede). Geboë vlakke rol oop: 'n silinder se sy word 'n reghoek van 2πr × h."),
        answerLabel: L(`Total surface area of a closed ${s.name} = ${s.sa}.`, `Totale buite-oppervlakte van 'n geslote ${s.name} = ${s.sa}.`),
        solution: [{ s: L(`SA = ${s.sa}`, `SA = ${s.sa}`), r: s.name }] });
  },

  /* prisms & cylinders: V = base area × height */
  baseTimesHeight: () => ({
    type: "yesno", concept: "volFormula",
    prompt: L("For <b>any</b> prism or a cylinder, is the volume always (area of the base) × (perpendicular height)?", "Is die volume van <b>enige</b> prisma of silinder altyd (oppervlakte van die basis) × (loodregte hoogte)?"),
    graph: pick([figPrismSafe, figTriPrismSafe, a => figCylinder(a, "none")])(ACC),
    yes: true,
    hint: L("A prism keeps the same cross-section all the way up, so you just stack the base area through the height.", "'n Prisma hou dieselfde dwarssnit tot bo, so jy stapel net die basisoppervlakte deur die hele hoogte."),
    answerLabel: L("Yes — for a prism or cylinder, V = base area × height.", "Ja: vir 'n prisma of silinder is V = basisoppervlakte × hoogte."),
    solution: [{ s: L("Same cross-section all the way up → V = A_base × H.", "Dieselfde dwarssnit tot bo → V = A_basis × H.") }],
  }),

  /* the one-third family */
  thirdFamily: () => mc("thirdFamily",
    L("A cone holds how much of a cylinder that has the <b>same base and height</b>?", "Hoeveel van 'n silinder met <b>dieselfde basis en hoogte</b> hou 'n keël?"),
    L("one third (⅓)", "een derde (⅓)"), [L("one half (½)", "een helfte (½)"), L("two thirds (⅔)", "twee derdes (⅔)"), L("the same amount", "ewe veel")],
    { graph: figConePerp(ACC),
      hint: L("Cones and pyramids are the ‘pointy’ third — V = ⅓ × (matching prism or cylinder).", "Keëls en piramides is die ‘puntige’ derde: V = ⅓ × (bypassende prisma of silinder)."),
      answerLabel: L("⅓ — a cone is ⅓ of the cylinder with the same base and height, so V = ⅓πr²H.", "⅓: 'n keël is ⅓ van die silinder met dieselfde basis en hoogte, so V = ⅓πr²H."),
      solution: [{ s: L("V(cone) = ⅓ × V(cylinder) = ⅓πr²H", "V(keël) = ⅓ × V(silinder) = ⅓πr²H") }] }),
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
