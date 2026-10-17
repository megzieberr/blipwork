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
import { L } from "../lang.js";

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
  if (open === L("none", "none")) { if (g.r === 2 && g.h >= 12) g.h = 11; return g; }
  const ok = (g.r === 3 && g.h <= 5) || (g.r === 4 && g.h <= 7) || (g.r === 5 && g.h <= 9) || (g.r === 6 && g.h <= 11);
  if (!ok) [g.r, g.h] = pick([[4, 7], [5, 7], [5, 8], [5, 9], [6, 9], [6, 10], [6, 11]]);
  return g;
}

function cylSA(open) {
  const { correct, wrongs } = cylSaOptions(open);
  const g = safeCyl(open);
  return mc("openSurfaces",
    L("Look at the diagram. Which formula gives this cylinder's <b>total surface area</b>?", "Kyk na die diagram. Watter formule gee hierdie silinder se <b>totale buite-oppervlakte</b>?"),
    correct, wrongs,
    { graph: g, layout: "grid2",
      hint: L("Start with the curved side 2πrh (always there). Then add one circle πr² for <i>each end that is closed</i> — a solid lid, not an open rim.", "Begin met die geboë sy 2πrh (altyd daar). Tel dan een sirkel πr² by vir <i>elke geslote ent</i>: 'n vaste deksel, nie 'n oop rand nie."),
      answerLabel: L(`It is ${CYL_SA_LABEL[open]} → SA = ${correct}.`, `Dit is ${CYL_SA_LABEL[open]} → SA = ${correct}.`),
      solution: [
        { s: L("curved side = 2πrh", "geboë sy = 2πrh"), r: L("always present", "altyd daar") },
        { s: open === L("none", "none") ? L("two closed ends → + 2πr²", "twee geslote ente → + 2πr²") : open === L("top", "top") ? L("one closed end (bottom) → + πr²", "een geslote ent (onder) → + πr²") : L("no closed ends → add nothing", "geen geslote ente → tel niks by") },
        { s: L(`SA = ${correct}`, `SA = ${correct}`) },
      ] });
}

const SKILLS = {
  closedCyl: () => cylSA(L("none", "none")),
  openTopCyl: () => cylSA(L("top", "top")),
  openBothCyl: () => cylSA(L("both", "both")),

  /* read the lid: is the top circle counted? (sometimes it IS closed —
     the learner must actually look, not pattern-match "always no") */
  topCounted: () => {
    const open = pick([L("none", "none"), L("top", "top"), L("both", "both")]);
    const counted = open === L("none", "none");
    return {
      type: "yesno", concept: "openSurfaces",
      prompt: L("Look at the top of this cylinder. Do you include the <b>top circle</b> in its surface area?", "Kyk na die bokant van hierdie silinder. Tel jy die <b>boonste sirkel</b> by sy buite-oppervlakte?"),
      graph: safeCyl(open),
      yes: counted,
      hint: L("A solid lid is a real surface to count; an open rim you can see into has no lid there to cover.", "'n Vaste deksel is 'n regte vlak wat tel; 'n oop rand waar jy kan inkyk, het geen deksel nie."),
      answerLabel: counted
        ? L("Yes — the top is a closed lid, so its circle counts: + πr².", "Ja, die bokant is 'n geslote deksel, so sy sirkel tel: + πr².")
        : L("No — the top is open, so there is no top circle to include.", "Nee, die bokant is oop, so daar is geen boonste sirkel om by te tel nie."),
      solution: [{ s: counted
        ? L("Closed top (solid lid) → count its circle: + πr².", "Geslote bokant (vaste deksel) → tel sy sirkel: + πr².")
        : L("Open top → leave out πr² for the top; only count ends that are closed.", "Oop bokant → los πr² vir die bokant uit; tel net die geslote ente.") }],
    };
  },

  /* a pipe: which surfaces? */
  pipeSurfaces: () => mc("openSurfaces",
    L("This pipe is open at <b>both</b> ends. Which surface(s) make up its outer area?", "Hierdie pyp is aan <b>albei</b> ente oop. Watter vlak(ke) vorm sy buite-oppervlakte?"),
    L("only the curved side → 2πrh", "net die geboë sy → 2πrh"),
    [L("the curved side + both circles → 2πr² + 2πrh", "die geboë sy + albei sirkels → 2πr² + 2πrh"), L("the curved side + one circle → πr² + 2πrh", "die geboë sy + een sirkel → πr² + 2πrh"), L("only the two circles → 2πr²", "net die twee sirkels → 2πr²")],
    { graph: safeCyl(L("both", "both")),
      hint: L("No lids at all — you can see straight through. So no circles are counted.", "Glad geen deksels nie: jy kan reg deur kyk. Dus tel geen sirkels nie."),
      answerLabel: L("Just the curved side, 2πrh — a pipe has no closed ends.", "Net die geboë sy, 2πrh: 'n pyp het geen geslote ente nie."),
      solution: [{ s: L("0 closed ends → SA = 2πrh", "0 geslote ente → SA = 2πrh") }] }),

  /* open-top box (counting faces, no misleading image) */
  openBox: () => mc("openSurfaces",
    L("A rectangular fish tank is open at the top (no lid). How many faces make up the glass surface?", "'n Reghoekige vistenk is bo oop (geen deksel nie). Hoeveel vlakke vorm die glasoppervlak?"),
    L("5 faces", "5 vlakke"), [L("6 faces", "6 vlakke"), L("4 faces", "4 vlakke"), L("5 faces and a circle", "5 vlakke en 'n sirkel")],
    { hint: L("A closed box has 6 faces. Remove the lid and one face is gone.", "'n Geslote boks het 6 vlakke. Haal die deksel af en een vlak is weg."),
      answerLabel: L("5 — the base and the 4 sides; the top (lid) is left out.", "5: die basis en die 4 sye; die bokant (deksel) word uitgelaat."),
      solution: [{ s: L("6 faces − 1 missing lid = 5 faces.", "6 vlakke − 1 ontbrekende deksel = 5 vlakke.") }] }),
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
