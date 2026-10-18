/* ============================================================
   GENERAL TRIG · gt1 — Introduction (discovery)
   ------------------------------------------------------------
   METHODS-trig.md Part A (p02–p04). Discovery round: XP pays the
   first time through only (xpOnce, below — the play.js hook is
   already built, this quest just sets the flag). Seven beats, her
   order: the word → ratios need a right triangle → O/A/H follow θ
   → SOHCAHTOA → where the ratios come from (the circle) → what
   each one means → the one check that matters (a ratio means
   nothing without its angle).
   ============================================================ */
import { mc, ynQ, pick, rightTriangleThetaSpec, circleFrame } from "./_gtrig.js";
import { L } from "../lang.js";

const CON = "gtrigIntro";

function reveal(q, frames, mode) { q.reveal = frames; if (mode) q.revealMode = mode; return q; }

const WORD_FRAMES = [
  L(`<div style="font-size:16px"><b style="color:var(--accent)">tri</b>gonometry &nbsp;→&nbsp; <b>three</b></div>`, `<div style="font-size:16px"><b style="color:var(--accent)">tri</b>gonometrie &nbsp;→&nbsp; <b>drie</b></div>`),
  L(`<div style="font-size:16px">tri<b style="color:var(--accent)">gono</b>metry &nbsp;→&nbsp; <b>angled</b></div>`, `<div style="font-size:16px">tri<b style="color:var(--accent)">gono</b>metrie &nbsp;→&nbsp; <b>hoekig</b></div>`),
  L(`<div style="font-size:16px">trigono<b style="color:var(--accent)">metry</b> &nbsp;→&nbsp; <b>measurement</b></div>`, `<div style="font-size:16px">trigono<b style="color:var(--accent)">metrie</b> &nbsp;→&nbsp; <b>meting</b></div>`),
];

const SOHCAHTOA_FRAMES = [
  L(`<div style="border-left:4px solid #3aa0ff;padding-left:10px"><b>SOH</b> — Sine · Opposite · Hypotenuse<br>sin θ = O/H</div>`, `<div style="border-left:4px solid #3aa0ff;padding-left:10px"><b>SOH</b>: sin · teenoorstaande (O) · skuinssy (H)<br>sin θ = O/H</div>`),
  L(`<div style="border-left:4px solid #8b5cf6;padding-left:10px"><b>CAH</b> — Cosine · Adjacent · Hypotenuse<br>cos θ = A/H</div>`, `<div style="border-left:4px solid #8b5cf6;padding-left:10px"><b>CAH</b>: cos · aangrensende (A) · skuinssy (H)<br>cos θ = A/H</div>`),
  L(`<div style="border-left:4px solid #22c55e;padding-left:10px"><b>TOA</b> — Tangent · Opposite · Adjacent<br>tan θ = O/A</div>`, `<div style="border-left:4px solid #22c55e;padding-left:10px"><b>TOA</b>: tan · teenoorstaande (O) · aangrensende (A)<br>tan θ = O/A</div>`),
];

const CIRCLE_DEGS = [20, 50, 75, 110];
const CIRCLE_FRAMES = CIRCLE_DEGS.map(d =>
  `${circleFrame(d)}${L(`<div class="muted small" style="margin-top:6px">As the point moves along the circle (now at θ = ${d}°) the radius stays the same — but θ, the x-coordinate and the y-coordinate all change.</div>`, `<div class="muted small" style="margin-top:6px">Soos die punt langs die sirkel beweeg (nou by θ = ${d}°), bly die radius dieselfde, maar θ, die x-koördinaat en die y-koördinaat verander almal.</div>`)}`);

const SKILLS = {
  /* A1 — the word */
  theWord: () => reveal(
    mc(CON, L("So trigonometry is the study of…", "Trigonometrie is dus die studie van…"),
      L("angles and the angle relationships of triangles", "hoeke en die hoekverwantskappe van driehoeke"),
      [L("circles and their radii", "sirkels en hul radii"), L("the areas of triangles only", "net die oppervlaktes van driehoeke"), L("the sides of a right triangle, never the angles", "die sye van 'n reghoekige driehoek, nooit die hoeke nie")],
      { hint: L("Put the three pieces together: three · angled · measurement.", "Sit die drie stukke saam: drie · hoekig · meting."),
        answerLabel: L("tri (three) + gono (angled) + metry (measurement) = the study of angles and of the angular relationships of triangles.", "tri (drie) + gono (hoekig) + metrie (meting) = die studie van hoeke en van die hoekverwantskappe van driehoeke.") }),
    WORD_FRAMES),

  /* A2 — ratios need a right triangle */
  rightTriangleOnly: () => ynQ(CON,
    L("Trig ratios (SOHCAHTOA) can only be used with right triangles. True or false?", "Trig-verhoudings (SOHCAHTOA) kan net in reghoekige driehoeke gebruik word. Waar of onwaar?"), true,
    { hint: L("The boxed rule from class: ratios can ONLY be used with right triangles.", "Die reël in die blokkie uit die klas: verhoudings kan NET in reghoekige driehoeke gebruik word."), answerLabel: L("True — SOHCAHTOA only works inside a right triangle.", "Waar: SOHCAHTOA werk net binne 'n reghoekige driehoek.") }),

  /* A2 — O/A/H follow θ, tapped on a to-scale (unlabelled) triangle */
  tapSide: () => {
    const { spec, ids } = rightTriangleThetaSpec();
    const which = pick(["opp", "adj", "hyp"]);
    const prompts = { opp: L("Tap the side that is OPPOSITE θ.", "Klik op die sy wat TEENOOR θ lê."), adj: L("Tap the side that is ADJACENT to θ.", "Klik op die sy wat AANGRENSEND aan θ is."), hyp: L("Tap the HYPOTENUSE.", "Klik op die SKUINSSY.") };
    const nudge = { opp: L("Opposite = the side “across from” θ.", "Teenoorstaande = die sy “oorkant” θ."), adj: L("Adjacent = the side “next to” θ (not the hypotenuse).", "Aangrensende = die sy “langs” θ (nie die skuinssy nie)."), hyp: L("The hypotenuse is “across from” the right angle.", "Die skuinssy is “oorkant” die regte hoek.") };
    const answerLabel = {
      opp: L("Opposite θ is the side straight across from it.", "Teenoor θ is die sy reg oorkant hom."),
      adj: L("Adjacent to θ is the side that touches θ but isn't the hypotenuse.", "Aangrensend aan θ is die sy wat θ raak, maar nie die skuinssy is nie."),
      hyp: L("The hypotenuse is across from the right angle — the longest side, and it never touches it.", "Die skuinssy is oorkant die regte hoek: die langste sy, en dit raak die regte hoek nooit nie."),
    };
    spec.tap = { correctId: ids[which] };
    return {
      type: "tap", concept: CON,
      prompt: prompts[which],
      graph: spec,
      tap: { mode: "side", correctId: ids[which], targets: [ids.adj, ids.opp, ids.hyp] },
      tapHint: nudge[which],
      hint: L("Opposite = across from θ; adjacent = next to θ; hypotenuse = across from the right angle.", "Teenoorstaande = oorkant θ; aangrensende = langs θ; skuinssy = oorkant die regte hoek."),
      answerLabel: answerLabel[which],
    };
  },

  /* A3 — SOHCAHTOA cards, then pick the ratio (cycles sin/cos/tan) */
  sohcahtoa: () => {
    const items = {
      sin: { ratio: L("O/H", "O/H"), wrongs: [L("A/H", "A/H"), L("O/A", "O/A"), L("H/A", "H/A")] },
      cos: { ratio: L("A/H", "A/H"), wrongs: [L("O/H", "O/H"), L("O/A", "O/A"), L("H/A", "H/A")] },
      tan: { ratio: L("O/A", "O/A"), wrongs: [L("O/H", "O/H"), L("A/H", "A/H"), L("H/A", "H/A")] },
    };
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const it = items[fn];
    return reveal(
      mc(CON, L(`${fn} θ = ?`, `${fn} θ = ?`), it.ratio, it.wrongs,
        { hint: L("SOH · CAH · TOA — sine is O/H, cosine is A/H, tangent is O/A.", "SOH · CAH · TOA: sin is O/H, cos is A/H, tan is O/A."), answerLabel: L(`${fn} θ = ${it.ratio} (SOH-CAH-TOA).`, `${fn} θ = ${it.ratio} (SOH-CAH-TOA).`) }),
      SOHCAHTOA_FRAMES);
  },

  /* A4 — the discovery beat: where the ratios come from */
  whereFrom: () => reveal(
    mc(CON, L("What stays the same as the point moves round the circle?", "Wat bly dieselfde terwyl die punt om die sirkel skuif?"),
      L("the radius r", "die radius r"), [L("the x-coordinate", "die x-koördinaat"), L("the y-coordinate", "die y-koördinaat"), L("the size of θ", "die grootte van θ")],
      { hint: L("Everything changes except one thing — the length from the centre to the point.", "Alles verander behalwe een ding: die lengte van die middelpunt na die punt."),
        answerLabel: L("The radius r stays the same — only θ, x and y change. That's why a ratio needs its angle: fix r, move the point, watch x and y.", "Die radius r bly dieselfde: net θ, x en y verander. Daarom het 'n verhouding sy hoek nodig: hou r vas, skuif die punt, kyk na x en y.") }),
    CIRCLE_FRAMES, "replace"),

  /* A5 — what each ratio MEANS (pool: 3 mc + her tan closing line as a yesno) */
  whatItMeans: () => pick([
    () => mc(CON, L("sin θ = ?", "sin θ = ?"), L("y/r", "y/r"), [L("x/r", "x/r"), L("y/x", "y/x"), L("r/y", "r/y")],
      { hint: L("sin is the y-coordinate over the radius.", "sin is die y-koördinaat oor die radius."), answerLabel: L("sin θ = y/r — how the y-coordinate changes as θ changes (r stays the same).", "sin θ = y/r: hoe die y-koördinaat verander soos θ verander (r bly dieselfde).") }),
    () => mc(CON, L("cos θ = ?", "cos θ = ?"), L("x/r", "x/r"), [L("y/r", "y/r"), L("y/x", "y/x"), L("r/x", "r/x")],
      { hint: L("cos is the x-coordinate over the radius.", "cos is die x-koördinaat oor die radius."), answerLabel: L("cos θ = x/r — how the x-coordinate changes as θ changes.", "cos θ = x/r: hoe die x-koördinaat verander soos θ verander.") }),
    () => mc(CON, L("tan θ = ?", "tan θ = ?"), L("y/x", "y/x"), [L("x/r", "x/r"), L("y/r", "y/r"), L("r/y", "r/y")],
      { hint: L("tan compares the y- and x-coordinates directly — no r involved.", "tan vergelyk die y- en x-koördinate direk: geen r nie."), answerLabel: L("tan θ = y/x = sin θ / cos θ.", "tan θ = y/x = sin θ / cos θ.") }),
    () => ynQ(CON, L("On the circle (r fixed): as the x-value gets bigger, the y-value gets smaller — and the other way round. True or false?", "Op die sirkel (r vas): soos die x-waarde groter word, word die y-waarde kleiner, en andersom. Waar of onwaar?"), true,
      { hint: L("Think of the point on the circle: r is fixed, so when x grows, y has to shrink.", "Dink aan die punt op die sirkel: r is vas, dus as x groei, moet y krimp."), answerLabel: L("True — as x grows, y shrinks (and back). That's exactly what tan θ = y/x is tracking.", "Waar: soos x groei, krimp y (en andersom). Dit is presies wat tan θ = y/x dophou.") }),
  ])(),

  /* the check that matters */
  ratioAlone: () => mc(CON,
    L(`Blip says: “the sine is 0,6.” What does that number tell you on its own?`, `Blip sê: “die sin is 0,6.” Wat sê daardie getal op sy eie vir jou?`),
    L("Nothing until you know the angle — a ratio only means something for its θ", "Niks totdat jy die hoek ken nie: 'n verhouding beteken net iets vir sy θ"),
    [L("The triangle's height is 0,6", "Die driehoek se hoogte is 0,6"), L("θ = 0,6°", "θ = 0,6°"), L("r = 0,6", "r = 0,6")],
    { hint: L("A ratio is a relationship, not a length or an angle by itself.", "'n Verhouding is 'n verwantskap, nie 'n lengte of 'n hoek op sy eie nie."),
      answerLabel: L("Fix the radius, move the point, watch x and y — the ratio IS the angle. On its own, 0,6 means nothing.", "Hou die radius vas, skuif die punt, kyk na x en y: die verhouding IS die hoek. Op sy eie beteken 0,6 niks.") }),
};

export const questGt1 = {
  id: "gt1",
  stackFractions: true,
  // xpOnce REMOVED 2026-08-22 evening — her ruling: the questions rotate every
  // play, so the discovery rounds pay like any other round (full first time, 25% on replay).
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
