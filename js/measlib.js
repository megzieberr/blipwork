/* ============================================================
   MEASLIB — Grade 11 Measurement (surface area & volume)
   ------------------------------------------------------------
   This chapter is about CHOOSING the right formula by READING the
   diagram — especially the cases that catch learners: cylinders
   open at the top (or top AND bottom), composite solids with a
   hidden joining face, and slant- vs perpendicular height.

   So the library is mostly formula STRINGS, distractor pools, and
   to-scale figure specs for the solid engine. Notation matches the
   chapter's formula page exactly:
     • r radius · h SLANT height (cone/pyramid) · H PERPENDICULAR
       height · ℓ length / square-base side · b breadth · ⊥h the
       triangle's perpendicular height in a triangular prism.
   π is never evaluated here — there are (by design) no π arithmetic
   answers to round, so the "use 3,14 or the π key" question never
   bites. The skill is the formula, read off the picture.
   ============================================================ */
import { randInt, pick, shuffled } from "./ui.js";

/* ---- the correct formulas, in the chapter's own notation ---- */
export const SOLID = {
  cube:       { name: "cube",                 vol: "ℓ³",            sa: "6ℓ²" },
  prism:      { name: "rectangular prism",    vol: "ℓ · b · h",    sa: "2(ℓb + ℓh + bh)" },
  triPrism:   { name: "triangular prism",     vol: "½ · b · ⊥h · H", sa: "b·⊥h + H(a + b + c)" },
  cylinder:   { name: "cylinder",             vol: "πr²h",         sa: "2πr² + 2πrh" },     // closed
  cone:       { name: "cone",                 vol: "⅓πr²H",        sa: "πr² + πrh" },        // h = slant, H = perp
  pyramid:    { name: "square-based pyramid", vol: "⅓ℓ²H",         sa: "ℓ² + 2ℓh" },         // h = slant, H = perp
  sphere:     { name: "sphere",               vol: "4/3·πr³",      sa: "4πr²" },
  hemisphere: { name: "hemisphere",           vol: "⅔πr³",         sa: "3πr²" },             // flat face exposed
};

/* surface-area of a cylinder by which ends are open (the chapter's
   three cases) */
export const CYL_SA = {
  none: "2πr² + 2πrh",   // closed both ends
  top:  "πr² + 2πrh",    // open top  → one circle + curved side
  both: "2πrh",          // open top & bottom (pipe) → curved side only
};
export const CYL_SA_LABEL = {
  none: "closed (both ends)",
  top:  "open at the top",
  both: "open at the top and bottom",
};

/* distractor pools — plausible-but-wrong formulas, kept distinct from
   every correct answer they sit beside */
export const VOL_WRONG = {
  cube:       ["6ℓ²", "ℓ²", "3ℓ³"],
  prism:      ["2(ℓb + ℓh + bh)", "ℓ + b + h", "½ℓbh"],
  triPrism:   ["b · ⊥h · H", "½ · b · H", "b·⊥h + H(a + b + c)"],
  cylinder:   ["2πr²h", "πrh", "⅓πr²h", "2πrh"],
  cone:       ["πr²H", "⅓πr²h", "⅓πrH²", "πr²h"],          // forgot ⅓ / used slant / etc.
  pyramid:    ["ℓ²H", "⅓ℓ²h", "ℓ² + 2ℓh", "⅓ℓH²"],
  sphere:     ["4πr²", "4/3·πr²", "πr³", "⅔πr³"],
  hemisphere: ["3πr²", "4/3·πr³", "⅓πr³", "2πr³"],
};
export const SA_WRONG = {
  cube:       ["ℓ³", "4ℓ²", "6ℓ"],
  prism:      ["ℓ · b · h", "ℓb + ℓh + bh", "2(ℓ + b + h)"],
  triPrism:   ["½ · b · ⊥h · H", "b·⊥h + (a + b + c)", "H(a + b + c)"],
  cylinder:   ["πr² + 2πrh", "2πrh", "2πr² + πrh", "πr²h"],
  cone:       ["πr² + 2πrh", "2πr² + πrh", "πr²H", "⅓πr²H"],
  pyramid:    ["2ℓ² + 2ℓh", "ℓ² + ℓh", "⅓ℓ²H", "4ℓh"],
  sphere:     ["4/3·πr³", "2πr²", "πr²", "4πr"],
  hemisphere: ["2πr²", "4πr²", "⅔πr³", "πr²"],
};

/* the cylinder-SA distractor set always offers the OTHER two cases
   plus a no-circle / wrong option, so the learner must read the lid */
export function cylSaOptions(open) {
  const correct = CYL_SA[open];
  const others = Object.values(CYL_SA).filter(f => f !== correct);
  const extra = "2πr² + πrh";
  const wrongs = shuffled([...others, extra]).slice(0, 3);
  return { correct, wrongs };
}

/* pick `n` distinct wrong formulas from a pool, never equal to `correct` */
export function wrongs(pool, correct, n = 3) {
  const seen = new Set([correct]);
  const out = [];
  for (const w of shuffled(pool)) { if (!seen.has(w)) { seen.add(w); out.push(w); } if (out.length >= n) break; }
  return out;
}

/* ============================================================
   FIGURE BUILDERS → to-scale specs for the solid engine. Random
   (but sensible) proportions; labels are letters, matching the
   formulas above. accent is passed in by the quest.
   ============================================================ */
export function figCube(acc)  { return { type: "solid", shape: "cube", accent: acc, s: randInt(5, 8) }; }
export function figPrism(acc) { return { type: "solid", shape: "box", accent: acc, l: randInt(7, 10), b: randInt(4, 6), h: randInt(5, 8) }; }
export function figTriPrism(acc) { return { type: "solid", shape: "triPrism", accent: acc, b: randInt(5, 7), th: randInt(4, 6), L: randInt(8, 11) }; }
export function figCylinder(acc, open = "none") { return { type: "solid", shape: "cylinder", accent: acc, r: randInt(3, 5), h: randInt(7, 11), open }; }
export function figCone(acc, opts = {}) { return { type: "solid", shape: "cone", accent: acc, r: randInt(4, 6), h: randInt(7, 10), ...opts }; }
export function figPyramid(acc, opts = {}) { return { type: "solid", shape: "pyramid", accent: acc, s: randInt(6, 8), h: randInt(7, 10), ...opts }; }
export function figSphere(acc) { return { type: "solid", shape: "sphere", accent: acc, r: randInt(4, 6) }; }
export function figHemisphere(acc) { return { type: "solid", shape: "hemisphere", accent: acc, r: randInt(4, 6) }; }
export function figComposite(acc, top = "cone", opts = {}) {
  return { type: "solid", shape: "composite", accent: acc, r: randInt(3, 5), hCyl: randInt(6, 9), top, hTop: randInt(5, 8), ...opts };
}

/* ============================================================
   PERPENDICULAR-HEIGHT (Pythagoras) — cone & pyramid
   ------------------------------------------------------------
   The slant/perpendicular-height confusion. Both solids hide a
   right-angled triangle:
     • cone:    h² = H² + r²        (bottom leg = the FULL radius r)
     • pyramid: h² = H² + (ℓ/2)²    (bottom leg = HALF the base ℓ/2)
   where h = slant (hypotenuse), H = perpendicular height. We use
   whole-number Pythagorean triples so the answers stay clean (no π,
   no ugly surds). figConeHeight / figPyramidHeight draw the solid
   WITH that triangle and a right-angle marker (engine heightTri).
   ============================================================ */
export const HEIGHT_TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20]];

/* a triple as a cone {r, H, slant}; randomly choose which leg is the radius */
export function coneTriple() {
  const t = pick(HEIGHT_TRIPLES), sw = Math.random() < 0.5;
  return { r: sw ? t[1] : t[0], H: sw ? t[0] : t[1], slant: t[2] };
}
/* a triple as a square pyramid {half, s, H, slant}; half-base ≤ 8 keeps ℓ sensible */
export function pyramidTriple() {
  const t = pick(HEIGHT_TRIPLES.filter(t => t[0] <= 8));
  return { half: t[0], s: 2 * t[0], H: t[1], slant: t[2] };
}

/* cone figure with the internal right triangle. unknown: "H" | "slant" | null
   (null + letters=true → plain letters r/H/h for concept questions). */
export function figConeHeight(acc, t, unknown, letters = false) {
  const base = { type: "solid", shape: "cone", accent: acc, r: t.r, h: t.H, heightTri: true };
  if (letters) return { ...base, rLabel: "r", hLabel: "H", slantLabel: "h" };
  return { ...base,
    rLabel: `r = ${t.r}`,
    hLabel: unknown === "H" ? "H = ?" : `H = ${t.H}`,
    slantLabel: unknown === "slant" ? "h = ?" : `h = ${t.slant}` };
}
export function figPyramidHeight(acc, t, unknown, letters = false) {
  const base = { type: "solid", shape: "pyramid", accent: acc, s: t.s, h: t.H, heightTri: true, halfLabel: "½ℓ" };
  if (letters) return { ...base, sLabel: "ℓ", hLabel: "H", slantLabel: "h" };
  return { ...base,
    sLabel: `ℓ = ${t.s}`,
    hLabel: unknown === "H" ? "H = ?" : `H = ${t.H}`,
    slantLabel: unknown === "slant" ? "h = ?" : `h = ${t.slant}` };
}

/* a tall-thin vs short-wide cylinder, for "to scale" emphasis */
export function figCylinderShape(acc, kind, open = "none") {
  return kind === "tall"
    ? { type: "solid", shape: "cylinder", accent: acc, r: randInt(2, 3), h: randInt(11, 13), open }
    : { type: "solid", shape: "cylinder", accent: acc, r: randInt(5, 6), h: randInt(4, 5), open };
}

export { randInt, pick, shuffled };
