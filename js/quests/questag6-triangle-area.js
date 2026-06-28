/* ============================================================
   ANALYTICAL GEOMETRY · Q6 — Area of a triangle  ★★ TRAP
   ------------------------------------------------------------
   Area = ½ × base × ⊥height. The struggle isn't the formula — it's
   reading the diagram: which side is the base, and which segment is
   the PERPENDICULAR height (the altitude, at 90° to that base, from
   the opposite vertex). Tap the right parts; tell altitude from
   median. The altitude in every diagram is drawn truly perpendicular.
   ============================================================ */
import { mc } from "./_shared.js";
import { tapQ, yesnoQ, triangleAltitude, winFor, AG } from "./_analytical.js";
import { triArea, randPoint, pick } from "../analyticslib.js";

const ACC = AG[5];

/* foot parameter t of the perpendicular from apex onto base b1→b2 (0..1 inside) */
function footT(apex, b1, b2) {
  const dx = b2.x - b1.x, dy = b2.y - b1.y;
  return ((apex.x - b1.x) * dx + (apex.y - b1.y) * dy) / (dx * dx + dy * dy);
}
/* a fat-enough integer triangle + a base whose altitude foot lands inside it */
function niceTriangle() {
  for (let i = 0; i < 300; i++) {
    const A = randPoint(-5, 5), B = randPoint(-5, 5), C = randPoint(-5, 5);
    if (triArea(A, B, C) < 7) continue;
    const P = { A, B, C };
    const bases = [["B", "C", "A"], ["C", "A", "B"], ["A", "B", "C"]]
      .filter(([b1, b2, ap]) => { const t = footT(P[ap], P[b1], P[b2]); return t > 0.2 && t < 0.8; });
    if (bases.length) { const [b1, b2] = pick(bases); return { P, base: `${b1}${b2}` }; }
  }
  return { P: { A: { x: -3, y: -1 }, B: { x: 4, y: -1 }, C: { x: 1, y: 4 } }, base: "AB" };
}

const SKILLS = {
  /* the formula */
  formula: () => {
    return mc("triangleArea",
      "The area of a triangle is…",
      "½ × base × ⊥height",
      ["base × ⊥height", "½ × base × slant side", "base + ⊥height"],
      { hint: "Half the base times the PERPENDICULAR height (not a slanted side).",
        answerLabel: "Area = ½ × base × ⊥height." });
  },

  /* tap the base the height is measured to */
  tapBase: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return tapQ("triangleArea",
      `The dashed line is the perpendicular height (drawn from <b>${t.apex}</b>). Tap the <b>base</b> it is measured to.`,
      t.spec, { mode: "seg", targets: t.sideIds, correctId: t.baseId },
      { tapHint: "The base is the side the dashed height makes a right angle with.",
        answerLabel: `The base is side ${t.baseId}.` });
  },

  /* tap the perpendicular height itself */
  tapHeight: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return tapQ("triangleArea",
      "Tap the <b>perpendicular height</b> (the altitude) of this triangle.",
      t.spec, { mode: "seg", targets: [...t.sideIds, "alt"], correctId: "alt" },
      { tapHint: "It runs from a vertex and meets the opposite side at 90° (look for the right-angle mark).",
        answerLabel: "The dashed segment with the right-angle mark is the perpendicular height." });
  },

  /* what the height must do */
  heightMustBe: () => {
    return mc("triangleArea",
      "The perpendicular height must…",
      "make a right angle (90°) with the base",
      ["be one of the three sides", "be the longest side", "join the two base corners"],
      { hint: "‘Perpendicular’ height = a 90° drop onto the base from the opposite vertex.",
        answerLabel: "It meets the base at 90°." });
  },

  /* altitude vs median */
  medianVsAltitude: () => {
    return mc("triangleArea",
      "Which line is used as the <b>perpendicular height</b> — the median or the altitude?",
      "the altitude (it meets the base at 90°)",
      ["the median (it goes to the midpoint)", "either one", "the longest side"],
      { hint: "Median → midpoint. Altitude → right angle. Height = altitude.",
        answerLabel: "The altitude (perpendicular to the base)." });
  },

  /* the height comes from the opposite vertex (tap it) */
  whichVertex: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC, showAlt: false });
    return tapQ("triangleArea",
      `If side <b>${t.baseId}</b> is the base, tap the <b>vertex</b> the perpendicular height must be drawn from.`,
      t.spec, { mode: "point", targets: ["A", "B", "C"], correctId: t.apex },
      { tapHint: "The height drops from the corner OPPOSITE the base.",
        answerLabel: `From the opposite vertex, ${t.apex}.` });
  },

  /* is the height one of the sides? */
  notASide: () => {
    return yesnoQ("triangleArea",
      "In a triangle that is <b>not</b> right-angled, is the perpendicular height usually one of the three sides?",
      false,
      { hint: "Usually you must drop a NEW segment (the altitude) inside the triangle. Only in a right-angled triangle is a side already the height.",
        answerLabel: "No — you usually draw the altitude; it isn’t one of the sides." });
  },
};

export const questAg6 = {
  id: "ag6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "triangleArea", gen })),
};
