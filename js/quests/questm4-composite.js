/* ============================================================
   MEASUREMENT QUEST 4 · Composite (compound) solids   ★ DIAGRAM
   Two solids joined: add the volumes, but for surface area LEAVE
   OUT the face where they meet (it is hidden inside). The diagram
   draws that joining circle dashed — the face you must NOT count.
   ============================================================ */
import { mc } from "./_shared.js";
import { figComposite, pick } from "../measlib.js";
import { L } from "../lang.js";

const ACC = "#65a30d";
/* silo: nudge proportions where the cone-height "H" letter lands on the
   dashed joining rim (fixed engine label offsets — see the chapter review) */
const silo = (o = {}) => {
  const g = figComposite(ACC, L("cone", "cone"), { showHcyl: true, showHtop: true, ...o });
  if (g.r === 4 && g.hTop <= 6) g.hTop = pick([7, 8]);
  else if (g.r === 5 && g.hTop === 7) g.hTop = 8;
  return g;
};
const dome = (o = {}) => figComposite(ACC, "hemi", { showHcyl: true, ...o });

const SKILLS = {
  /* the hidden joining face */
  hiddenFace: () => {
    const g = pick([silo, dome])();
    const topName = L(`${g.top === "cone" ? "cone" : "hemisphere"}`, `${g.top === "cone" ? "keël" : "halfsfeer"}`);   // g.top is data ("cone"); the learner reads topName
    return {
      type: "yesno", concept: "compositeSolids",
      prompt: L(`For the <b>total surface area</b>, do you include the dashed circle where the ${topName} sits on the cylinder?`, `Tel jy vir die <b>totale buite-oppervlakte</b> die gestippelde sirkel by waar die ${topName} op die silinder sit?`),
      graph: g,
      yes: false,
      hint: L("That circle is sealed inside the solid — no one could paint it. Joined faces are left out.", "Daardie sirkel is binne-in die liggaam toegemaak: niemand kan dit verf nie. Raakvlakke word uitgelaat."),
      answerLabel: L("No — the joining face is hidden inside, so it is not part of the outer surface.", "Nee, die raakvlak is binne versteek, so dit is nie deel van die buite-oppervlakte nie."),
      solution: [{ s: L("Two solids joined → add the outer surfaces, omit the shared (hidden) face.", "Twee liggame aanmekaar → tel die buitenste vlakke op, los die gedeelde (versteekte) vlak uit.") }],
    };
  },

  /* volume of a cylinder + cone (silo) */
  volSilo: () => mc("compositeSolids",
    L("What is the <b>total volume</b> of this silo (a cylinder with a cone on top)?", "Wat is die <b>totale volume</b> van hierdie silo ('n silinder met 'n keël bo-op)?"),
    L("πr²h + ⅓πr²H", "πr²h + ⅓πr²H"),
    [L("πr²h + πr²H", "πr²h + πr²H"), L("⅓πr²h + ⅓πr²H", "⅓πr²h + ⅓πr²H"), L("πr²h − ⅓πr²H", "πr²h − ⅓πr²H")],
    { graph: silo(), layout: "grid2",
      hint: L("Add the two parts: cylinder (πr²h) plus cone (⅓πr²H). h is the cylinder height, H the cone height.", "Tel die twee dele op: silinder (πr²h) plus keël (⅓πr²H). h is die silinder se hoogte, H die keël se hoogte."),
      answerLabel: L("Add the parts: cylinder πr²h + cone ⅓πr²H.", "Tel die dele op: silinder πr²h + keël ⅓πr²H."),
      solution: [
        { s: L("cylinder = πr²h", "silinder = πr²h") }, { s: L("cone = ⅓πr²H", "keël = ⅓πr²H") }, { s: L("total = πr²h + ⅓πr²H", "totaal = πr²h + ⅓πr²H") },
      ] }),

  /* volume of a cylinder + hemisphere (domed tank) */
  volDome: () => mc("compositeSolids",
    L("What is the <b>total volume</b> of this tank (a cylinder with a hemisphere on top)?", "Wat is die <b>totale volume</b> van hierdie tenk ('n silinder met 'n halfsfeer bo-op)?"),
    L("πr²h + ⅔πr³", "πr²h + ⅔πr³"),
    [L("πr²h + 4/3·πr³", "πr²h + 4/3·πr³"), L("πr²h + ⅓πr³", "πr²h + ⅓πr³"), L("πr²h + 2πr³", "πr²h + 2πr³")],
    { graph: dome(), layout: "grid2",
      hint: L("A hemisphere is HALF a sphere, so ½ × 4/3·πr³ = ⅔πr³. Add it to the cylinder πr²h.", "'n Halfsfeer is 'n HALWE sfeer, so ½ × 4/3·πr³ = ⅔πr³. Tel dit by die silinder πr²h."),
      answerLabel: L("Cylinder πr²h + hemisphere ⅔πr³.", "Silinder πr²h + halfsfeer ⅔πr³."),
      solution: [
        { s: L("hemisphere = ½ × 4/3·πr³ = ⅔πr³", "halfsfeer = ½ × 4/3·πr³ = ⅔πr³") }, { s: L("total = πr²h + ⅔πr³", "totaal = πr²h + ⅔πr³") },
      ] }),

  /* which surfaces make the silo's outer area */
  saPieces: () => mc("compositeSolids",
    L("Which surfaces add up to the <b>total surface area</b> of this silo (closed flat bottom, cone on top)?", "Watter vlakke tel op tot die <b>totale buite-oppervlakte</b> van hierdie silo (geslote plat bodem, keël bo-op)?"),
    L("bottom circle + cylinder's curved side + cone's slanted surface", "onderste sirkel + silinder se geboë sy + keël se skuins vlak"),
    [L("bottom circle + cylinder's curved side + cone's slanted surface + the join circle", "onderste sirkel + silinder se geboë sy + keël se skuins vlak + die raakvlak"),
     L("two circles + cylinder's curved side + cone's slanted surface", "twee sirkels + silinder se geboë sy + keël se skuins vlak"),
     L("cylinder's curved side + cone's slanted surface only", "net silinder se geboë sy + keël se skuins vlak")],
    { graph: silo(),
      hint: L("Count every OUTSIDE face: the base, the wrapping cylinder wall, the cone's slope. The circle where they join is hidden.", "Tel elke BUITENSTE vlak: die basis, die silinderwand rondom, die keël se helling. Die sirkel waar hulle aanmekaar sit, is versteek."),
      answerLabel: L("Base circle + cylinder side + cone slant. The cylinder's top is covered by the cone, so it is left out.", "Basissirkel + silindersy + keël se skuins vlak. Die keël bedek die silinder se bokant, so dit word uitgelaat."),
      solution: [{ s: L("outer faces only: πr² (base) + 2πrh (cylinder side) + πr·(slant) (cone)", "net buitenste vlakke: πr² (basis) + 2πrh (silindersy) + πr·(skuins) (keël)") }] }),

  /* add the volumes */
  addVolumes: () => ({
    type: "yesno", concept: "compositeSolids",
    prompt: L("To find the volume of a composite solid, do you <b>add</b> the volumes of its parts?", "Kry jy die volume van 'n saamgestelde liggaam deur die volumes van sy dele <b>op te tel</b>?"),
    graph: pick([silo, dome])(),
    yes: true,
    hint: L("Volume is just how much space is filled, so the parts simply add up — nothing is hidden for volume.", "Volume is net hoeveel ruimte gevul is, so die dele tel eenvoudig op: niks is versteek vir volume nie."),
    answerLabel: L("Yes — total volume = sum of the parts' volumes.", "Ja: totale volume = som van die dele se volumes."),
    solution: [{ s: L("V(total) = V(part 1) + V(part 2)", "V(totaal) = V(deel 1) + V(deel 2)") }],
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
