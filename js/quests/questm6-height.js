/* ============================================================
   MEASUREMENT QUEST 6 · Find the perpendicular height   ★ DIAGRAM
   The slant-vs-perpendicular confusion, head on. Every solid is
   drawn WITH its hidden right-angled triangle and a right-angle
   marker, so the learner can see which length is which:
     • cone:    h² = H² + r²        bottom leg = the FULL radius
     • pyramid: h² = H² + (ℓ/2)²    bottom leg = HALF the base
   h = slant (hypotenuse), H = perpendicular height. Whole-number
   triples → clean answers, no π.
   ============================================================ */
import { mc, calcStep } from "./_shared.js";
import { coneTriple, pyramidTriple, figConeHeight, figPyramidHeight } from "../measlib.js";
/* rng, NOT Math.random — chip shuffles must run under js/rng.js so a dice
   round's seeded regeneration reproduces the SAME order (see _trig.js's
   own note; the same law applies to every tokenpad chip shuffle). */
import { rng } from "../rng.js";
/* SLOT is the tokenpad's own "box to fill" marker — imported rather than
   re-typed so a glyph change can never leave this frame drawing a
   character the pad no longer recognises. */
import { SLOT } from "../tokenpad.js";
import { L } from "../lang.js";

const ACC = "#4d7c0f";
const sq = n => n * n;

/* ============================================================
   AUDIT DAY 2026-08-30 (Session 3, split 3) — the step-chain
   treatment 2D Trig got widens to this quest's three calc skills.
   Prompt/graph/numbers are unchanged; the worked `solution` each
   skill already carried is what became the answered steps.

   Tiny local tokenpad builder — the shape copied from _trig.js's
   cosineSideSetupStep family (dedupe chips, shuffle under rng(),
   join with the pad's own thin space). This chapter's frames are
   plain Pythagoras: LHS² = ☐² ± ☐², so one builder covers all three
   skills; `mirror` accepts the swapped fill when the operation is
   addition (commutes) and is left off when it is subtraction (the
   ORDER is the trap being taught, e.g. coneFindH / pyramidFindH). */
function chipsOf(list) {
  const chips = [];
  for (const c of list) { if (c != null && c !== "" && !chips.includes(c)) chips.push(c); }
  return chips;
}
function shuffleChips(xs) {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/* U+2009 THIN SPACE — the SAME separator the pad itself joins with
   (steps-check.js's normalizeTokens strips it before marking, so it is
   never marked — display/split only). Written as the escape, never a
   bare glyph, so it stays visible in a diff. */
const joinThin = xs => xs.join("\u2009");

function heightStep(prompt, frame, chips, fillOrder, hint, mirror = false) {
  const fill = fillOrder.map(String);
  return {
    kind: "tokenpad",
    prompt,
    frame,
    keys: shuffleChips(chipsOf(chips.map(String))),
    expected: joinThin(fill),
    alsoAccept: mirror ? [joinThin(fill.slice().reverse())] : [],
    hint,
  };
}

/* Drawing-safe triples: the engine's fixed label offsets put "H"/"h" ON the
   dashed back rim (k·[3,4,5] tall cones, where H ≈ 1,41r so the rim passes
   through the middle of the H line) or on the silhouette (very narrow
   cones). Wide cones always draw clean; the tall 8-15-17 draws clean in a
   slightly taller frame. Verified against solid-graph geometry — review. */
function safeConeTriple() {
  for (;;) { const t = coneTriple(); if (t.r > t.H || (t.r === 8 && t.H === 15)) return t; }
}
function coneFig(t, unknown, letters = false) {
  const g = figConeHeight(ACC, t, unknown, letters);
  if (t.H > t.r) g.h2 = 300;                                   // tall cone → taller frame
  else if (unknown === "H" && t.slant >= 2 * t.H) g.w = 360;   // very wide cone → wider frame
  return g;
}
/* the 16-base pyramid projects a base corner onto the middle of the H line —
   its labels always sit on hidden edges, so skip that one triple */
function safePyramidTriple() {
  for (;;) { const t = pyramidTriple(); if (t.half < 8) return t; }
}

const SKILLS = {
  /* cone: given r and slant h, find the perpendicular height H */
  coneFindH: () => {
    let t = safeConeTriple();
    // ⚠️ chip-distinctness guard: r and slant are always different values in
    // every HEIGHT_TRIPLES entry, but a bounded regenerate loop is the safety
    // net under that fact rather than a fact this code silently assumes.
    for (let tries = 0; tries < 20 && t.slant === t.r; tries++) t = safeConeTriple();
    return {
      type: "steps", concept: "findHeight",
      prompt: L("Calculate the <b>perpendicular height H</b> of this cone.", "Bereken die <b>loodregte hoogte H</b> van hierdie keël."),
      graph: coneFig(t, "H"),
      steps: [
        heightStep(L("Build the rearranged equation for H². Tap a piece to drop it into the next box.", "Bou die herrangskikte vergelyking vir H². Klik op 'n stuk om dit in die volgende blokkie te plaas."),
          ["H²", "=", SLOT, "²", "−", SLOT, "²"],
          [t.slant, t.r], [t.slant, t.r],
          L("The slant is the hypotenuse, so it goes first and stands alone.", "Die skuinshoogte is die skuinssy, so dit kom eerste en staan alleen.")),
        calcStep(L("H² = ?", "H² = ?"), sq(t.slant) - sq(t.r),
          L("Square the slant, square r, then subtract.", "Kwadreer die skuinshoogte, kwadreer r, trek dan af."), { dp: 0, tol: 0.001 }),
        calcStep(L("H = ?", "H = ?"), t.H,
          L("Take the square root.", "Neem die vierkantswortel."), { dp: 0, tol: 0.001 }),
      ],
      expected: t.H, dp: 0,
      hint: L("r, H and the slant h make a right-angled triangle with the slant as the hypotenuse: h² = H² + r². So H = √(h² − r²).", "r, H en die skuinshoogte h vorm 'n reghoekige driehoek met die skuinshoogte as die skuinssy: h² = H² + r². Dus H = √(h² − r²)."),
      answerLabel: L(`H = √(${t.slant}² − ${t.r}²) = √${sq(t.slant) - sq(t.r)} = ${t.H}`, `H = √(${t.slant}² − ${t.r}²) = √${sq(t.slant) - sq(t.r)} = ${t.H}`),
      solution: [
        { s: L("h² = H² + r²  →  H² = h² − r²", "h² = H² + r²  →  H² = h² − r²"), r: L("the slant is the hypotenuse", "die skuinshoogte is die skuinssy") },
        { s: L(`H² = ${t.slant}² − ${t.r}² = ${sq(t.slant)} − ${sq(t.r)} = ${sq(t.slant) - sq(t.r)}`, `H² = ${t.slant}² − ${t.r}² = ${sq(t.slant)} − ${sq(t.r)} = ${sq(t.slant) - sq(t.r)}`) },
        { s: L(`H = √${sq(t.slant) - sq(t.r)} = ${t.H}`, `H = √${sq(t.slant) - sq(t.r)} = ${t.H}`) },
      ],
    };
  },

  /* cone: given r and H, find the slant height h */
  coneFindSlant: () => {
    let t = safeConeTriple();
    for (let tries = 0; tries < 20 && t.H === t.r; tries++) t = safeConeTriple();
    return {
      type: "steps", concept: "findHeight",
      prompt: L("Calculate the <b>slant height h</b> of this cone.", "Bereken die <b>skuinshoogte h</b> van hierdie keël."),
      graph: coneFig(t, "slant"),
      steps: [
        heightStep(L("Build the Pythagoras equation for h². Tap a piece to drop it into the next box.", "Bou die Pythagoras-vergelyking vir h². Klik op 'n stuk om dit in die volgende blokkie te plaas."),
          ["h²", "=", SLOT, "²", "+", SLOT, "²"],
          [t.H, t.r], [t.H, t.r],
          L("Addition commutes — H² and r² can go in either box.", "By optel maak die volgorde nie saak nie: H² en r² kan in enige blokkie gaan."), true),
        calcStep(L("h² = ?", "h² = ?"), sq(t.H) + sq(t.r),
          L("Square H, square r, then add.", "Kwadreer H, kwadreer r, tel dan op."), { dp: 0, tol: 0.001 }),
        calcStep(L("h = ?", "h = ?"), t.slant,
          L("Take the square root.", "Neem die vierkantswortel."), { dp: 0, tol: 0.001 }),
      ],
      expected: t.slant, dp: 0,
      hint: L("The slant is the hypotenuse, so it sits alone: h² = H² + r², giving h = √(H² + r²).", "Die skuinshoogte is die skuinssy, so dit staan alleen: h² = H² + r², wat h = √(H² + r²) gee."),
      answerLabel: L(`h = √(${t.H}² + ${t.r}²) = √${sq(t.H) + sq(t.r)} = ${t.slant}`, `h = √(${t.H}² + ${t.r}²) = √${sq(t.H) + sq(t.r)} = ${t.slant}`),
      solution: [
        { s: L("h² = H² + r²", "h² = H² + r²"), r: L("Pythagoras", "Pythagoras") },
        { s: L(`h² = ${t.H}² + ${t.r}² = ${sq(t.H)} + ${sq(t.r)} = ${sq(t.H) + sq(t.r)}`, `h² = ${t.H}² + ${t.r}² = ${sq(t.H)} + ${sq(t.r)} = ${sq(t.H) + sq(t.r)}`) },
        { s: L(`h = √${sq(t.H) + sq(t.r)} = ${t.slant}`, `h = √${sq(t.H) + sq(t.r)} = ${t.slant}`) },
      ],
    };
  },

  /* pyramid: given base ℓ and slant h, find H — the trap is using HALF the base */
  pyramidFindH: () => {
    let t = safePyramidTriple();
    // chip-distinctness guard: safePyramidTriple() already keeps half/s/slant
    // apart in every currently-reachable triple, but the loop is the safety
    // net a future triple table change should not have to rediscover.
    for (let tries = 0; tries < 20 && new Set([t.slant, t.half, t.s]).size !== 3; tries++) t = safePyramidTriple();
    return {
      type: "steps", concept: "findHeight",
      prompt: L("Calculate the <b>perpendicular height H</b> of this square-based pyramid.", "Bereken die <b>loodregte hoogte H</b> van hierdie piramide met 'n vierkantige basis."),
      graph: figPyramidHeight(ACC, t, "H"),
      steps: [
        calcStep(L("First: half the base.", "Eers: die helfte van die basis."), t.half,
          L("Divide the full base ℓ by 2.", "Deel die hele basis ℓ deur 2."), { dp: 0, tol: 0.001 }),
        heightStep(L("Build the equation for H², using HALF the base you just found. Tap a piece to drop it into the next box.", "Bou die vergelyking vir H² met die HALWE basis wat jy pas gekry het. Klik op 'n stuk om dit in die volgende blokkie te plaas."),
          ["H²", "=", SLOT, "²", "−", SLOT, "²"],
          [t.slant, t.half, t.s], [t.slant, t.half],
          L("The slant is the hypotenuse. The bottom leg is HALF the base — the whole base is on the pad to tempt you.", "Die skuinshoogte is die skuinssy. Die onderste sy is die HALWE basis: die hele basis is ook daar om jou te flous.")),
        calcStep(L("H² = ?", "H² = ?"), sq(t.slant) - sq(t.half),
          L("Square the slant, square half the base, then subtract.", "Kwadreer die skuinshoogte, kwadreer die halwe basis, trek dan af."), { dp: 0, tol: 0.001 }),
        calcStep(L("H = ?", "H = ?"), t.H,
          L("Take the square root.", "Neem die vierkantswortel."), { dp: 0, tol: 0.001 }),
      ],
      expected: t.H, dp: 0,
      hint: L("The slant h, the height H and HALF the base (ℓ/2) form a right triangle: h² = H² + (ℓ/2)². Use HALF the base, not the whole side!", "Die skuinshoogte h, die hoogte H en die HALWE basis (ℓ/2) vorm 'n reghoekige driehoek: h² = H² + (ℓ/2)². Gebruik die HALWE basis, nie die hele sy nie!"),
      answerLabel: L(`½ℓ = ${t.half}, so H = √(${t.slant}² − ${t.half}²) = √${sq(t.slant) - sq(t.half)} = ${t.H}`, `½ℓ = ${t.half}, dus H = √(${t.slant}² − ${t.half}²) = √${sq(t.slant) - sq(t.half)} = ${t.H}`),
      solution: [
        { s: L(`half the base: ℓ/2 = ${t.s} ÷ 2 = ${t.half}`, `halwe basis: ℓ/2 = ${t.s} ÷ 2 = ${t.half}`), r: L("the bottom leg is HALF the base", "die onderste sy is die HALWE basis") },
        { s: L(`h² = H² + (ℓ/2)²  →  H² = ${t.slant}² − ${t.half}² = ${sq(t.slant) - sq(t.half)}`, `h² = H² + (ℓ/2)²  →  H² = ${t.slant}² − ${t.half}² = ${sq(t.slant) - sq(t.half)}`) },
        { s: L(`H = √${sq(t.slant) - sq(t.half)} = ${t.H}`, `H = √${sq(t.slant) - sq(t.half)} = ${t.H}`) },
      ],
    };
  },

  /* the cone relationship */
  coneRelation: () => mc("findHeight",
    L("For a cone, how are the radius r, perpendicular height H and slant height h related?", "Hoe hang die radius r, loodregte hoogte H en skuinshoogte h van 'n keël saam?"),
    L("h² = H² + r²", "h² = H² + r²"), [L("H² = h² + r²", "H² = h² + r²"), L("h² = H² − r²", "h² = H² − r²"), L("h = H + r", "h = H + r")],
    { graph: coneFig(safeConeTriple(), null, true), layout: "grid2",
      hint: L("The slant h is the longest side (opposite the right angle), so it sits alone as the c in a² + b² = c².", "Die skuinshoogte h is die langste sy (teenoor die regte hoek), so dit staan alleen as die c in a² + b² = c²."),
      answerLabel: L("h² = H² + r² — the slant is the hypotenuse.", "h² = H² + r²: die skuinshoogte is die skuinssy."),
      solution: [{ s: L("legs r and H, hypotenuse h → h² = H² + r²", "sye r en H, skuinssy h → h² = H² + r²") }] }),

  /* the pyramid trap: which is the bottom leg */
  pyramidWhichLeg: () => mc("findHeight",
    L("To find a square pyramid's perpendicular height from the slant height of a face, what is the <b>bottom</b> of the right-angled triangle?", "Om 'n vierkantige piramide se loodregte hoogte uit 'n vlak se skuinshoogte te kry: wat is die <b>onderste sy</b> van die reghoekige driehoek?"),
    L("half the base side (½ℓ)", "die helfte van die basissy (½ℓ)"), [L("the full base side (ℓ)", "die hele basissy (ℓ)"), L("the diagonal of the base", "die hoeklyn van die basis"), L("the slant height (h)", "die skuinshoogte (h)")],
    { graph: figPyramidHeight(ACC, safePyramidTriple(), null, true),
      hint: L("The slant runs to the MIDDLE of a base edge, so the bottom leg only reaches halfway across — ½ℓ.", "Die skuinshoogte loop na die MIDDEL van 'n basisrand, so die onderste sy strek net halfpad oor: ½ℓ."),
      answerLabel: L("Half the base side, ½ℓ — the slant meets the base at the midpoint of an edge.", "Die helfte van die basissy, ½ℓ: die skuinshoogte tref die basis by die middelpunt van 'n rand."),
      solution: [{ s: L("h² = H² + (ℓ/2)²  →  bottom leg is ½ℓ, not the whole ℓ", "h² = H² + (ℓ/2)²  →  onderste sy is ½ℓ, nie die hele ℓ nie") }] }),

  /* the slant is the hypotenuse */
  hypIs: () => ({
    type: "yesno", concept: "findHeight",
    prompt: L("In the right-angled triangle inside this solid, is the <b>slant height</b> the hypotenuse (the longest side)?", "Is die <b>skuinshoogte</b> in die reghoekige driehoek binne hierdie liggaam die skuinssy (die langste sy)?"),
    graph: coneFig(safeConeTriple(), null, true),
    yes: true,
    hint: L("The right angle sits between the radius and the perpendicular height, so the side opposite it is the slant.", "Die regte hoek lê tussen die radius en die loodregte hoogte, so die sy teenoor die regte hoek is die skuinshoogte."),
    answerLabel: L("Yes — the slant is opposite the right angle, so it is the hypotenuse and the longest of the three.", "Ja: die skuinshoogte is teenoor die regte hoek, so dit is die skuinssy en die langste van die drie."),
    solution: [{ s: L("right angle between r and H → slant is the hypotenuse, so slant > H and slant > r", "regte hoek tussen r en H → skuinshoogte is die skuinssy, so skuinshoogte > H en skuinshoogte > r") }],
  }),
};

export const questM6 = {
  id: "m6",
  skills: [
    { id: "coneFindH", concept: "findHeight", gen: SKILLS.coneFindH },
    { id: "pyramidFindH", concept: "findHeight", gen: SKILLS.pyramidFindH },
    { id: "coneFindSlant", concept: "findHeight", gen: SKILLS.coneFindSlant },
    { id: "coneRelation", concept: "findHeight", gen: SKILLS.coneRelation },
    { id: "pyramidWhichLeg", concept: "findHeight", gen: SKILLS.pyramidWhichLeg },
    { id: "hypIs", concept: "findHeight", gen: SKILLS.hypIs },
  ],
};
