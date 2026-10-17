/* ============================================================
   MEASUREMENT QUEST 2 · Slant vs perpendicular height   ★ DIAGRAM
   The classic trap on cones & pyramids: the VOLUME uses the
   perpendicular height H, the slanted FACE area uses the slant
   height h. Read which is which off the picture (both are drawn,
   H dashed straight down the middle, h along the slanted face).
   ============================================================ */
import { mc } from "./_shared.js";
import { figCone, figPyramid, pick } from "../measlib.js";
import { L } from "../lang.js";

const ACC = "#65a30d";
/* both heights drawn; squat proportions put the "H"/"h" letters on the back
   rim or a hidden edge (engine label offsets are fixed — see the chapter
   review), so nudge just those. Still to scale. */
const bothCone = () => {
  const g = figCone(ACC, { showPerp: true, showSlant: true });
  if (g.r === 5 && g.h === 7) g.h = 8;
  else if (g.r === 6 && g.h <= 8) g.h = 9;
  return g;
};
const bothPyr = () => {
  const g = figPyramid(ACC, { showPerp: true, showSlant: true });
  if (g.h === g.s + 1) g.h += 1;
  else if (g.s === 8 && g.h === 7) g.h = 8;
  return g;
};

const SKILLS = {
  /* volume uses the PERPENDICULAR height */
  volUsesPerp: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const shape = cone ? L("cone", "keël") : L("pyramid", "piramide");
    const vol = cone ? L("⅓πr²H", "⅓πr²H") : L("⅓ℓ²H", "⅓ℓ²H");
    return mc("slantPerp",
      L(`For the <b>volume</b> of this ${shape} (${vol}), which height do you use?`, `Watter hoogte gebruik jy vir die <b>volume</b> van hierdie ${shape} (${vol})?`),
      L("H — the perpendicular height", "H: die loodregte hoogte"),
      [L("h — the slant height", "h: die skuinshoogte"), cone ? L("neither; you use the radius r", "geeneen; jy gebruik die radius r") : L("neither; you use the base side ℓ", "geeneen; jy gebruik die basissy ℓ"), L("you may use either one", "jy mag enige een gebruik")],
      { graph: g,
        hint: L("Volume is about how much fills the inside, so you need the true straight-up height H, not the longer slanted one.", "Volume gaan oor hoeveel die binnekant vul, so jy het die ware regop hoogte H nodig, nie die langer skuins een nie."),
        answerLabel: L("The perpendicular height H — it runs straight from the apex down to the centre of the base.", "Die loodregte hoogte H: dit loop reguit van die toppunt af na die middelpunt van die basis."),
        solution: [{ s: L(`V = ${vol} uses the perpendicular height H (the dashed line down the middle).`, `V = ${vol} gebruik die loodregte hoogte H (die stippellyn in die middel af).`) }] });
  },

  /* the slanted FACE area uses the SLANT height */
  saUsesSlant: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const shape = cone ? L("cone", "keël") : L("pyramid", "piramide");
    const face = cone ? L("curved surface (πrh)", "geboë vlak (πrh)") : L("triangular side faces (½·p·h)", "driehoekige syvlakke (½·p·h)");
    return mc("slantPerp",
      L(`For the <b>${face}</b> of this ${shape}, which height do you use?`, `Watter hoogte gebruik jy vir die <b>${face}</b> van hierdie ${shape}?`),
      L("h — the slant height", "h: die skuinshoogte"),
      [L("H — the perpendicular height", "H: die loodregte hoogte"), cone ? L("the radius r", "die radius r") : L("the base side ℓ", "die basissy ℓ"), L("you may use either one", "jy mag enige een gebruik")],
      { graph: g,
        hint: L("The slanted face lies along the slope, so its area needs the length measured along that slope — the slant height h.", "Die skuins vlak lê langs die helling, so sy oppervlakte het die lengte langs daardie helling nodig: die skuinshoogte h."),
        answerLabel: L("The slant height h — it runs along the sloping face, from the apex to the edge of the base.", "Die skuinshoogte h: dit loop langs die skuins vlak, van die toppunt tot by die rand van die basis."),
        solution: [{ s: L(`The sloping face is measured with the slant height h, not the perpendicular H.`, `Die skuins vlak word met die skuinshoogte h gemeet, nie met die loodregte H nie.`) }] });
  },

  /* identify the slant height on the picture */
  whichIsSlant: () => {
    const cone = pick([true, false]);
    const g = cone ? bothCone() : bothPyr();
    const desc = cone
      ? L("from the apex, down the sloping side, to the rim of the base", "van die toppunt, teen die skuins sy af, tot by die rand van die basis")
      : L("from the apex, down the middle of a triangular face, to a base edge", "van die toppunt, in die middel van 'n driehoekige vlak af, tot by 'n basisrand");
    return mc("slantPerp",
      L("On this diagram, which length is the <b>slant height h</b>?", "Watter lengte op hierdie diagram is die <b>skuinshoogte h</b>?"),
      L(`the slanted line ${desc}`, `die skuins lyn ${desc}`),
      [L("the dashed line straight down the middle", "die stippellyn reguit in die middel af"), L("the line across the base (the radius / side)", "die lyn oor die basis (die radius / sy)"), L("the longest edge of the whole solid", "die langste rand van die hele liggaam")],
      { graph: g,
        hint: L("h is the one drawn along the slope; the dashed straight-down line is the perpendicular height H.", "h is die een wat langs die helling geteken is; die stippellyn reguit af is die loodregte hoogte H."),
        answerLabel: L(`The slant height h is the slanting line ${desc}.`, `Die skuinshoogte h is die skuins lyn ${desc}.`),
        solution: [{ s: L("h = slant (along the face); H = perpendicular (dashed, straight down).", "h = skuins (langs die vlak); H = loodreg (stippel, reguit af).") }] });
  },

  /* which is bigger? (slant is the hypotenuse) */
  slantBigger: () => ({
    type: "yesno", concept: "slantPerp",
    prompt: L("Is the slant height h always <b>longer</b> than the perpendicular height H?", "Is die skuinshoogte h altyd <b>langer</b> as die loodregte hoogte H?"),
    graph: bothCone(),
    yes: true,
    hint: L("h, H and the radius form a right-angled triangle with h as the hypotenuse (h² = H² + r²).", "h, H en die radius vorm 'n reghoekige driehoek met h as die skuinssy (h² = H² + r²)."),
    answerLabel: L("Yes — h is the hypotenuse of the right triangle h² = H² + r², so h > H.", "Ja: h is die skuinssy van die reghoekige driehoek h² = H² + r², so h > H."),
    solution: [{ s: L("h² = H² + r²  →  h is the hypotenuse, so it is the longest of the three.", "h² = H² + r²  →  h is die skuinssy, so dit is die langste van die drie.") }],
  }),

  /* units: area vs volume */
  units: () => {
    const vol = pick([true, false]);
    return mc("saVsVol",
      vol
        ? L("All lengths on a solid are in <b>cm</b>. Its <b>volume</b> is measured in …", "Al die lengtes op 'n liggaam is in <b>cm</b>. Sy <b>volume</b> word gemeet in …")
        : L("All lengths on a solid are in <b>cm</b>. Its <b>surface area</b> is measured in …", "Al die lengtes op 'n liggaam is in <b>cm</b>. Sy <b>buite-oppervlakte</b> word gemeet in …"),
      vol ? L("cm³ (cubic)", "cm³ (kubiek)") : L("cm² (square)", "cm² (vierkant)"),
      vol ? [L("cm² (square)", "cm² (vierkant)"), L("cm (just cm)", "cm (net cm)"), L("cm⁴", "cm⁴")] : [L("cm³ (cubic)", "cm³ (kubiek)"), L("cm (just cm)", "cm (net cm)"), L("cm⁴", "cm⁴")],
      { hint: L("Area covers a flat region (length × length → squared); volume fills space (length × length × length → cubed).", "Oppervlakte bedek 'n plat gebied (lengte × lengte → kwadraat); volume vul ruimte (lengte × lengte × lengte → derde mag)."),
        answerLabel: vol ? L("Volume is a cubic measure → cm³.", "Volume is 'n kubieke maat → cm³.") : L("Surface area is a square measure → cm².", "Buite-oppervlakte is 'n vierkante maat → cm²."),
        solution: [{ s: vol ? L("length³ → cm³", "lengte³ → cm³") : L("length² → cm²", "lengte² → cm²") }] });
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
