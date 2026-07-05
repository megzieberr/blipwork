/* ============================================================
   MEASUREMENT QUEST 3 · Open tops & bottoms   ★ DIAGRAM
   The chapter's signature trap: a cylinder closed both ends, open
   at the top, or open at the top AND bottom (a pipe) all share the
   curved side 2πrh — but you add a circle for each end that is
   CLOSED. The diagram shows the openings (solid lid vs hollow rim
   vs see-through tube); the learner reads it and picks the formula.
   ============================================================ */
import { mc } from "./_shared.js";
import { cylSaOptions, CYL_SA, CYL_SA_LABEL, figCylinder, figCylinderShape, pick } from "../measlib.js";

const ACC = "#65a30d";

/* Label-safe cylinder: on narrow OPEN cylinders the engine's "r" letter
   lands on the inner-rim ellipse (fixed label offsets, measured against
   solid-graph geometry — see the chapter review). Keep open cylinders wide
   enough; the tall-thin look stays available when closed. Still to scale. */
function safeCyl(open) {
  const g = pick([
    figCylinder(ACC, open),
    figCylinderShape(ACC, pick(["tall", "wide"]), open),
  ]);
  if (open === "none") { if (g.r === 2 && g.h >= 12) g.h = 11; return g; }
  const ok = (g.r === 3 && g.h <= 5) || (g.r === 4 && g.h <= 7) || (g.r === 5 && g.h <= 9) || (g.r === 6 && g.h <= 11);
  if (!ok) [g.r, g.h] = pick([[4, 7], [5, 7], [5, 8], [5, 9], [6, 9], [6, 10], [6, 11]]);
  return g;
}

function cylSA(open) {
  const { correct, wrongs } = cylSaOptions(open);
  const g = safeCyl(open);
  return mc("openSurfaces",
    "Look at the diagram. Which formula gives this cylinder's <b>total surface area</b>?",
    correct, wrongs,
    { graph: g, layout: "grid2",
      hint: "Start with the curved side 2πrh (always there). Then add one circle πr² for <i>each end that is closed</i> — a solid lid, not an open rim.",
      answerLabel: `It is ${CYL_SA_LABEL[open]} → SA = ${correct}.`,
      solution: [
        { s: "curved side = 2πrh", r: "always present" },
        { s: open === "none" ? "two closed ends → + 2πr²" : open === "top" ? "one closed end (bottom) → + πr²" : "no closed ends → add nothing" },
        { s: `SA = ${correct}` },
      ] });
}

const SKILLS = {
  closedCyl: () => cylSA("none"),
  openTopCyl: () => cylSA("top"),
  openBothCyl: () => cylSA("both"),

  /* read the lid: is the top circle counted? (sometimes it IS closed —
     the learner must actually look, not pattern-match "always no") */
  topCounted: () => {
    const open = pick(["none", "top", "both"]);
    const counted = open === "none";
    return {
      type: "yesno", concept: "openSurfaces",
      prompt: "Look at the top of this cylinder. Do you include the <b>top circle</b> in its surface area?",
      graph: safeCyl(open),
      yes: counted,
      hint: "A solid lid is a real surface to count; an open rim you can see into has no lid there to cover.",
      answerLabel: counted
        ? "Yes — the top is a closed lid, so its circle counts: + πr²."
        : "No — the top is open, so there is no top circle to include.",
      solution: [{ s: counted
        ? "Closed top (solid lid) → count its circle: + πr²."
        : "Open top → leave out πr² for the top; only count ends that are closed." }],
    };
  },

  /* a pipe: which surfaces? */
  pipeSurfaces: () => mc("openSurfaces",
    "This pipe is open at <b>both</b> ends. Which surface(s) make up its outer area?",
    "only the curved side → 2πrh",
    ["the curved side + both circles → 2πr² + 2πrh", "the curved side + one circle → πr² + 2πrh", "only the two circles → 2πr²"],
    { graph: safeCyl("both"),
      hint: "No lids at all — you can see straight through. So no circles are counted.",
      answerLabel: "Just the curved side, 2πrh — a pipe has no closed ends.",
      solution: [{ s: "0 closed ends → SA = 2πrh" }] }),

  /* open-top box (counting faces, no misleading image) */
  openBox: () => mc("openSurfaces",
    "A rectangular fish tank is open at the top (no lid). How many faces make up the glass surface?",
    "5 faces", ["6 faces", "4 faces", "5 faces and a circle"],
    { hint: "A closed box has 6 faces. Remove the lid and one face is gone.",
      answerLabel: "5 — the base and the 4 sides; the top (lid) is left out.",
      solution: [{ s: "6 faces − 1 missing lid = 5 faces." }] }),
};

export const questM3 = {
  id: "m3",
  skills: [
    { id: "closedCyl", concept: "openSurfaces", gen: SKILLS.closedCyl },
    { id: "openTopCyl", concept: "openSurfaces", gen: SKILLS.openTopCyl },
    { id: "openBothCyl", concept: "openSurfaces", gen: SKILLS.openBothCyl },
    { id: "topCounted", concept: "openSurfaces", gen: SKILLS.topCounted },
    { id: "pipeSurfaces", concept: "openSurfaces", gen: SKILLS.pipeSurfaces },
    { id: "openBox", concept: "openSurfaces", gen: SKILLS.openBox },
  ],
};
