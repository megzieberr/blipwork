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
import { yesnoQ, triangleAltitude, winFor, AG } from "./_analytical.js";
import { triArea, randPoint, pick } from "../analyticslib.js";

const ACC = AG[5];

/* foot parameter t of the perpendicular from apex onto base b1→b2 (0..1 inside) */
function footT(apex, b1, b2) {
  const dx = b2.x - b1.x, dy = b2.y - b1.y;
  return ((apex.x - b1.x) * dx + (apex.y - b1.y) * dy) / (dx * dx + dy * dy);
}
/* |cos of the angle| between directions u and v (0 = perpendicular, 1 = parallel) */
function absCos(u, v) {
  return Math.abs(u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
}
/* a fat-enough integer triangle + a base whose altitude foot lands inside it,
   where the altitude is CLEARLY not perpendicular to either other side (so no
   "which side is the base?" decoy can be defended by eye) */
function niceTriangle() {
  for (let i = 0; i < 300; i++) {
    const A = randPoint(-5, 5), B = randPoint(-5, 5), C = randPoint(-5, 5);
    if (triArea(A, B, C) < 7) continue;
    const P = { A, B, C };
    const bases = [["B", "C", "A"], ["C", "A", "B"], ["A", "B", "C"]]
      .filter(([b1, b2, ap]) => {
        const t = footT(P[ap], P[b1], P[b2]);
        if (t <= 0.2 || t >= 0.8) return false;
        // the altitude ⊥ another side ⇔ that side ∥ the base — keep the
        // other two sides at least ~14° away from parallel to the base
        const base = { x: P[b2].x - P[b1].x, y: P[b2].y - P[b1].y };
        const s1 = { x: P[ap].x - P[b1].x, y: P[ap].y - P[b1].y };
        const s2 = { x: P[ap].x - P[b2].x, y: P[ap].y - P[b2].y };
        return absCos(base, s1) < 0.97 && absCos(base, s2) < 0.97;
      });
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

  /* which side is the base the height is measured to */
  whichBase: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return mc("triangleArea",
      `The dashed line is the perpendicular height (drawn from <b>${t.apex}</b>). Which <b>side</b> is the base it is measured to?`,
      `side ${t.baseId}`, t.sideIds.filter((id) => id !== t.baseId).map((id) => `side ${id}`),
      { graph: t.spec,
        hint: "The base is the side the dashed height makes a right angle with.",
        answerLabel: `The base is side ${t.baseId}.` });
  },

  /* which line is the perpendicular height itself */
  whichHeight: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return mc("triangleArea",
      "Which line is the <b>perpendicular height</b> (the altitude) of this triangle?",
      "the dashed line (with the right-angle mark)", t.sideIds.map((id) => `side ${id}`),
      { graph: t.spec,
        hint: "It runs from a vertex and meets the opposite side at 90° — look for the right-angle mark.",
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

  /* the height comes from the opposite vertex */
  whichVertex: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC, showAlt: false });
    return mc("triangleArea",
      `If side <b>${t.baseId}</b> is the base, which <b>vertex</b> must the perpendicular height be drawn from?`,
      t.apex, ["A", "B", "C"].filter((v) => v !== t.apex),
      { graph: t.spec,
        hint: "The height drops from the corner OPPOSITE the base.",
        answerLabel: `From the opposite vertex, ${t.apex}.` });
  },

  /* is the height one of the sides? */
  notASide: () => {
    return yesnoQ("triangleArea",
      "In a triangle that is <b>not</b> right-angled, is the perpendicular height ever one of the three sides?",
      false,
      { hint: "A side can only BE the height if it meets the base at 90° — and that makes the triangle right-angled.",
        answerLabel: "No — you must draw a NEW segment (the altitude). Only in a right-angled triangle is a side already the height." });
  },
};

export const questAg6 = {
  id: "ag6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "triangleArea", gen })),
};
