/* ============================================================
   ANALYTICAL GEOMETRY · Q7 — Putting it together + proof words
   ------------------------------------------------------------
   The vocabulary the exam reasons in: median / altitude /
   perpendicular bisector, and the "to prove …, show …" table
   (parallel, perpendicular, collinear, parallelogram). Plus
   which formula does which job on a circle. Diagram-backed where
   it helps you tell a median from an altitude.
   ============================================================ */
import { mc } from "./_shared.js";
import { triangleAltitude, winFor, layoutPointLabels, AG } from "./_analytical.js";
import { midpoint, footOfPerp, triArea, randPoint, pick } from "../analyticslib.js";
import { L } from "../lang.js";

const ACC = AG[6];

/* a median diagram: apex → midpoint of the base, with equal-half ticks */
function medianDiagram(P, base) {
  const [b1, b2] = base.split("");
  const apex = ["A", "B", "C"].find((k) => k !== b1 && k !== b2);
  const M = midpoint(P[b1], P[b2]);
  return layoutPointLabels({
    type: "analytic", accent: ACC, grid: true,
    win: winFor(["A", "B", "C"].map((k) => P[k]), { min: 9 }),
    polys: [{ pts: [P[b1], P[b2], P[apex]], fill: true }],
    segs: [
      { a: P[b1], b: P[b2] }, { a: P[b2], b: P[apex] }, { a: P[apex], b: P[b1] },
      { a: P[apex], b: M, dash: true, tone: "b" },
    ],
    ticks: [{ a: P[b1], b: M, n: 1 }, { a: M, b: P[b2], n: 1 }],
    points: ["A", "B", "C"].map((k) => ({ x: P[k].x, y: P[k].y, label: k, place: "auto" })),
  });
}
/* |cos of the angle| between directions u and v (0 = perpendicular, 1 = parallel) */
function absCos(u, v) {
  return Math.abs(u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
}
/* a triangle where median and altitude from the apex are CLEARLY different:
   the altitude's foot lands well inside the base, well away from the midpoint,
   and the median is nowhere near perpendicular — otherwise "median or
   altitude?" is ambiguous (in an isosceles triangle they coincide!) */
function niceTri() {
  for (let i = 0; i < 400; i++) {
    const A = randPoint(-5, 5), B = randPoint(-5, 5), C = randPoint(-5, 5);
    if (triArea(A, B, C) < 7) continue;
    const P = { A, B, C };
    const bases = ["AB", "BC", "CA"].filter((base) => {
      const [b1, b2] = base.split("");
      const apex = ["A", "B", "C"].find((k) => k !== b1 && k !== b2);
      const foot = footOfPerp(P[apex], P[b1], P[b2]);
      const M = midpoint(P[b1], P[b2]);
      const side = { x: P[b2].x - P[b1].x, y: P[b2].y - P[b1].y };
      const sideLen = Math.hypot(side.x, side.y);
      const t = ((foot.x - P[b1].x) * side.x + (foot.y - P[b1].y) * side.y) / (sideLen * sideLen);
      if (t <= 0.2 || t >= 0.8) return false;                          // altitude foot inside the base
      if (Math.hypot(foot.x - M.x, foot.y - M.y) < 0.8) return false;  // foot not near the midpoint
      const med = { x: M.x - P[apex].x, y: M.y - P[apex].y };
      return absCos(side, med) >= 0.25;                                // median ≥ ~15° off perpendicular
    });
    if (bases.length) return { P: { A, B, C }, base: pick(bases) };
  }
  return { P: { A: { x: -3, y: -1 }, B: { x: 4, y: -1 }, C: { x: 2, y: 4 } }, base: "AB" };
}

const SKILLS = {
  /* name the special line from its description */
  lineNames: () => {
    const cases = [
      { p: L("A line from a vertex to the <b>midpoint</b> of the opposite side is a…", "'n Lyn van 'n hoekpunt na die <b>middelpunt</b> van die teenoorstaande sy is 'n…"), c: L("median", "swaartelyn"), w: [L("altitude", "hoogtelyn"), L("perpendicular bisector", "middelloodlyn")] },
      { p: L("A line from a vertex, <b>perpendicular</b> to the opposite side, is an…", "'n Lyn van 'n hoekpunt af, <b>loodreg</b> op die teenoorstaande sy, is 'n…"), c: L("altitude", "hoogtelyn"), w: [L("median", "swaartelyn"), L("perpendicular bisector", "middelloodlyn")] },
      { p: L("A line through the <b>midpoint</b> of a segment AND <b>perpendicular</b> to it is a…", "'n Lyn deur die <b>middelpunt</b> van 'n lynstuk EN <b>loodreg</b> daarop, is 'n…"), c: L("perpendicular bisector", "middelloodlyn"), w: [L("median", "swaartelyn"), L("altitude", "hoogtelyn")] },
    ];
    const k = pick(cases);
    return mc("proofWords", k.p, k.c, k.w,
      { hint: L("Median → midpoint. Altitude → right angle. Perpendicular bisector → midpoint AND right angle.", "Swaartelyn → middelpunt. Hoogtelyn → regte hoek. Middelloodlyn → middelpunt EN regte hoek."),
        answerLabel: k.c });
  },

  /* identify the dashed line on a diagram: median vs altitude */
  identifyLine: () => {
    const { P, base } = niceTri();
    const isAlt = pick([true, false]);
    const spec = isAlt ? triangleAltitude(P, base, { accent: ACC }).spec : medianDiagram(P, base);
    return mc("proofWords",
      L("What is the dashed line inside the triangle?", "Wat is die stippellyn binne die driehoek?"),
      isAlt ? L("an altitude (it meets the side at 90°)", "'n hoogtelyn (dit tref die sy teen 90°)") : L("a median (it goes to the midpoint)", "'n swaartelyn (dit gaan na die middelpunt)"),
      isAlt ? [L("a median (it goes to the midpoint)", "'n swaartelyn (dit gaan na die middelpunt)"), L("a perpendicular bisector", "'n middelloodlyn")] : [L("an altitude (it meets the side at 90°)", "'n hoogtelyn (dit tref die sy teen 90°)"), L("a side of the triangle", "'n sy van die driehoek")],
      { graph: spec,
        hint: L("Right-angle mark → altitude. Equal tick marks (equal halves) → median.", "Regtehoekteken → hoogtelyn. Gelyke strepies (gelyke helftes) → swaartelyn."),
        answerLabel: isAlt ? L("An altitude — note the right-angle mark.", "'n Hoogtelyn: let op die regtehoekteken.") : L("A median — note the equal halves.", "'n Swaartelyn: let op die gelyke helftes.") });
  },

  /* prove parallel */
  proveParallel: () => {
    return mc("proofWords",
      L("To prove <b>AB ∥ CD</b> (parallel), you show…", "Om <b>AB ∥ CD</b> (ewewydig) te bewys, toon jy aan…"),
      L("m<sub>AB</sub> = m<sub>CD</sub> (equal gradients)", "m<sub>AB</sub> = m<sub>CD</sub> (gelyke gradiënte)"),
      [L("m<sub>AB</sub> × m<sub>CD</sub> = −1", "m<sub>AB</sub> × m<sub>CD</sub> = −1"), L("AB = CD (equal lengths)", "AB = CD (gelyke lengtes)"), L("they share a midpoint", "hulle deel 'n middelpunt")],
      { hint: L("Parallel lines have EQUAL gradients.", "Ewewydige lyne het GELYKE gradiënte."), answerLabel: L("Equal gradients: m_AB = m_CD.", "Gelyke gradiënte: m_AB = m_CD.") });
  },

  /* prove perpendicular */
  provePerp: () => {
    return mc("proofWords",
      L("To prove <b>AB ⊥ CD</b> (perpendicular), you show…", "Om <b>AB ⊥ CD</b> (loodreg) te bewys, toon jy aan…"),
      L("m<sub>AB</sub> × m<sub>CD</sub> = −1", "m<sub>AB</sub> × m<sub>CD</sub> = −1"),
      [L("m<sub>AB</sub> = m<sub>CD</sub>", "m<sub>AB</sub> = m<sub>CD</sub>"), L("AB = CD", "AB = CD"), L("they have the same midpoint", "hulle het dieselfde middelpunt")],
      { hint: L("Perpendicular gradients multiply to −1.", "Loodregte gradiënte se produk is −1."), answerLabel: L("m_AB × m_CD = −1.", "m_AB × m_CD = −1.") });
  },

  /* prove collinear */
  proveCollinear: () => {
    return mc("proofWords",
      L("To prove A, B and C are <b>collinear</b> (on one straight line), you show…", "Om te bewys dat A, B en C <b>saamlynig</b> is (op een reguit lyn), toon jy aan…"),
      L("m<sub>AB</sub> = m<sub>BC</sub> (same gradient, shared point B)", "m<sub>AB</sub> = m<sub>BC</sub> (dieselfde gradiënt, gedeelde punt B)"),
      [L("m<sub>AB</sub> × m<sub>BC</sub> = −1", "m<sub>AB</sub> × m<sub>BC</sub> = −1"), L("AB = BC", "AB = BC"), L("B is the midpoint of AC", "B is die middelpunt van AC")],
      { hint: L("Same straight line → the little segments have the SAME gradient.", "Dieselfde reguit lyn → die stukkies het DIESELFDE gradiënt."),
        answerLabel: L("m_AB = m_BC (they share point B).", "m_AB = m_BC (hulle deel punt B).") });
  },

  /* prove parallelogram (diagonal method) */
  proveParallelogram: () => {
    return mc("proofWords",
      L("To prove a quadrilateral is a <b>parallelogram</b> using the diagonals, you show…", "Om met die hoeklyne te bewys dat 'n vierhoek 'n <b>parallelogram</b> is, toon jy aan…"),
      L("the diagonals bisect each other (same midpoint)", "die hoeklyne halveer mekaar (dieselfde middelpunt)"),
      [L("the diagonals are equal in length", "die hoeklyne is ewe lank"), L("the diagonals are perpendicular", "die hoeklyne is loodreg"), L("all four sides are equal", "al vier sye is gelyk")],
      { hint: L("Diagonals of a parallelogram share a midpoint — they bisect each other.", "'n Parallelogram se hoeklyne deel 'n middelpunt: hulle halveer mekaar."),
        answerLabel: L("The diagonals have the same midpoint.", "Die hoeklyne het dieselfde middelpunt.") });
  },

  /* circle jobs */
  circleFormulas: () => {
    const ask = pick([
      { p: L("The <b>centre</b> of a circle is the … of a diameter.", "Die <b>middelpunt</b> van 'n sirkel is die … van 'n middellyn."), c: L("midpoint", "middelpunt"), w: [L("gradient", "gradiënt"), L("length", "lengte"), L("distance", "afstand")] },
      { p: L("To find the length of the <b>radius</b>, you use the … formula.", "Om die lengte van die <b>radius</b> te kry, gebruik jy die formule vir…"), c: L("distance", "afstand"), w: [L("midpoint", "middelpunt"), L("gradient", "gradiënt"), L("area", "oppervlakte")] },
    ]);
    return mc("proofWords", ask.p, ask.c, ask.w,
      { hint: L("Centre = midpoint of a diameter. Radius is a length → distance formula.", "Sirkel se middelpunt = middelpunt van 'n middellyn. Radius is 'n lengte → afstandsformule."), answerLabel: ask.c });
  },
};

export const questAg7 = {
  id: "ag7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "proofWords", gen })),
};
