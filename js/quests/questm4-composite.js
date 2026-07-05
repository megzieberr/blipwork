/* ============================================================
   MEASUREMENT QUEST 4 · Composite (compound) solids   ★ DIAGRAM
   Two solids joined: add the volumes, but for surface area LEAVE
   OUT the face where they meet (it is hidden inside). The diagram
   draws that joining circle dashed — the face you must NOT count.
   ============================================================ */
import { mc } from "./_shared.js";
import { figComposite, pick } from "../measlib.js";

const ACC = "#65a30d";
/* silo: nudge proportions where the cone-height "H" letter lands on the
   dashed joining rim (fixed engine label offsets — see the chapter review) */
const silo = (o = {}) => {
  const g = figComposite(ACC, "cone", { showHcyl: true, showHtop: true, ...o });
  if (g.r === 4 && g.hTop <= 6) g.hTop = pick([7, 8]);
  else if (g.r === 5 && g.hTop === 7) g.hTop = 8;
  return g;
};
const dome = (o = {}) => figComposite(ACC, "hemi", { showHcyl: true, ...o });

const SKILLS = {
  /* the hidden joining face */
  hiddenFace: () => {
    const g = pick([silo, dome])();
    const topName = g.top === "cone" ? "cone" : "hemisphere";
    return {
      type: "yesno", concept: "compositeSolids",
      prompt: `For the <b>total surface area</b>, do you include the dashed circle where the ${topName} sits on the cylinder?`,
      graph: g,
      yes: false,
      hint: "That circle is sealed inside the solid — no one could paint it. Joined faces are left out.",
      answerLabel: "No — the joining face is hidden inside, so it is not part of the outer surface.",
      solution: [{ s: "Two solids joined → add the outer surfaces, omit the shared (hidden) face." }],
    };
  },

  /* volume of a cylinder + cone (silo) */
  volSilo: () => mc("compositeSolids",
    "What is the <b>total volume</b> of this silo (a cylinder with a cone on top)?",
    "πr²h + ⅓πr²H",
    ["πr²h + πr²H", "⅓πr²h + ⅓πr²H", "πr²h − ⅓πr²H"],
    { graph: silo(), layout: "grid2",
      hint: "Add the two parts: cylinder (πr²h) plus cone (⅓πr²H). h is the cylinder height, H the cone height.",
      answerLabel: "Add the parts: cylinder πr²h + cone ⅓πr²H.",
      solution: [
        { s: "cylinder = πr²h" }, { s: "cone = ⅓πr²H" }, { s: "total = πr²h + ⅓πr²H" },
      ] }),

  /* volume of a cylinder + hemisphere (domed tank) */
  volDome: () => mc("compositeSolids",
    "What is the <b>total volume</b> of this tank (a cylinder with a hemisphere on top)?",
    "πr²h + ⅔πr³",
    ["πr²h + 4/3·πr³", "πr²h + ⅓πr³", "πr²h + 2πr³"],
    { graph: dome(), layout: "grid2",
      hint: "A hemisphere is HALF a sphere, so ½ × 4/3·πr³ = ⅔πr³. Add it to the cylinder πr²h.",
      answerLabel: "Cylinder πr²h + hemisphere ⅔πr³.",
      solution: [
        { s: "hemisphere = ½ × 4/3·πr³ = ⅔πr³" }, { s: "total = πr²h + ⅔πr³" },
      ] }),

  /* which surfaces make the silo's outer area */
  saPieces: () => mc("compositeSolids",
    "Which surfaces add up to the <b>total surface area</b> of this silo (closed flat bottom, cone on top)?",
    "bottom circle + cylinder's curved side + cone's slanted surface",
    ["bottom circle + cylinder's curved side + cone's slanted surface + the join circle",
     "two circles + cylinder's curved side + cone's slanted surface",
     "cylinder's curved side + cone's slanted surface only"],
    { graph: silo(),
      hint: "Count every OUTSIDE face: the base, the wrapping cylinder wall, the cone's slope. The circle where they join is hidden.",
      answerLabel: "Base circle + cylinder side + cone slant. The cylinder's top is covered by the cone, so it is left out.",
      solution: [{ s: "outer faces only: πr² (base) + 2πrh (cylinder side) + πr·(slant) (cone)" }] }),

  /* add the volumes */
  addVolumes: () => ({
    type: "yesno", concept: "compositeSolids",
    prompt: "To find the volume of a composite solid, do you <b>add</b> the volumes of its parts?",
    graph: pick([silo, dome])(),
    yes: true,
    hint: "Volume is just how much space is filled, so the parts simply add up — nothing is hidden for volume.",
    answerLabel: "Yes — total volume = sum of the parts' volumes.",
    solution: [{ s: "V(total) = V(part 1) + V(part 2)" }],
  }),
};

export const questM4 = {
  id: "m4",
  skills: [
    { id: "hiddenFace", concept: "compositeSolids", gen: SKILLS.hiddenFace },
    { id: "volSilo", concept: "compositeSolids", gen: SKILLS.volSilo },
    { id: "volDome", concept: "compositeSolids", gen: SKILLS.volDome },
    { id: "saPieces", concept: "compositeSolids", gen: SKILLS.saPieces },
    { id: "addVolumes", concept: "compositeSolids", gen: SKILLS.addVolumes },
  ],
};
