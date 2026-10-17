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
import { L } from "../lang.js";

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
    const bases = [[L("B", "B"), L("C", "C"), L("A", "A")], [L("C", "C"), L("A", "A"), L("B", "B")], [L("A", "A"), L("B", "B"), L("C", "C")]]
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
      L("The area of a triangle is…", "Die oppervlakte van 'n driehoek is…"),
      L("½ × base × ⊥height", "½ × basis × ⊥hoogte"),
      [L("base × ⊥height", "basis × ⊥hoogte"), L("½ × base × slant side", "½ × basis × skuins sy"), L("base + ⊥height", "basis + ⊥hoogte")],
      { hint: L("Half the base times the PERPENDICULAR height (not a slanted side).", "Die helfte van die basis maal die LOODREGTE hoogte (nie 'n skuins sy nie)."),
        answerLabel: L("Area = ½ × base × ⊥height.", "Oppervlakte = ½ × basis × ⊥hoogte.") });
  },

  /* which side is the base the height is measured to */
  whichBase: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return mc("triangleArea",
      L(`The dashed line is the perpendicular height (drawn from <b>${t.apex}</b>). Which <b>side</b> is the base it is measured to?`, `Die stippellyn is die loodregte hoogte (vanaf <b>${t.apex}</b> geteken). Watter <b>sy</b> is die basis waarop dit gemeet word?`),
      L(`side ${t.baseId}`, `sy ${t.baseId}`), t.sideIds.filter((id) => id !== t.baseId).map((id) => L(`side ${id}`, `sy ${id}`)),
      { graph: t.spec,
        hint: L("The base is the side the dashed height makes a right angle with.", "Die basis is die sy waarmee die gestippelde hoogte 'n regte hoek maak."),
        answerLabel: L(`The base is side ${t.baseId}.`, `Die basis is sy ${t.baseId}.`) });
  },

  /* which line is the perpendicular height itself */
  whichHeight: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC });
    return mc("triangleArea",
      L("Which line is the <b>perpendicular height</b> (the altitude) of this triangle?", "Watter lyn is die <b>loodregte hoogte</b> (die hoogtelyn) van hierdie driehoek?"),
      L("the dashed line (with the right-angle mark)", "die stippellyn (met die regtehoekteken)"), t.sideIds.map((id) => L(`side ${id}`, `sy ${id}`)),
      { graph: t.spec,
        hint: L("It runs from a vertex and meets the opposite side at 90° — look for the right-angle mark.", "Dit loop van 'n hoekpunt af en tref die teenoorstaande sy teen 90°: soek die regtehoekteken."),
        answerLabel: L("The dashed segment with the right-angle mark is the perpendicular height.", "Die gestippelde lynstuk met die regtehoekteken is die loodregte hoogte.") });
  },

  /* what the height must do */
  heightMustBe: () => {
    return mc("triangleArea",
      L("The perpendicular height must…", "Die loodregte hoogte moet…"),
      L("make a right angle (90°) with the base", "'n regte hoek (90°) met die basis maak"),
      [L("be one of the three sides", "een van die drie sye wees"), L("be the longest side", "die langste sy wees"), L("join the two base corners", "die twee hoekpunte van die basis verbind")],
      { hint: L("‘Perpendicular’ height = a 90° drop onto the base from the opposite vertex.", "‘Loodregte’ hoogte = 'n 90°-val op die basis vanaf die teenoorstaande hoekpunt."),
        answerLabel: L("It meets the base at 90°.", "Dit tref die basis teen 90°.") });
  },

  /* altitude vs median */
  medianVsAltitude: () => {
    return mc("triangleArea",
      L("Which line is used as the <b>perpendicular height</b> — the median or the altitude?", "Watter lyn word as die <b>loodregte hoogte</b> gebruik: die swaartelyn of die hoogtelyn?"),
      L("the altitude (it meets the base at 90°)", "die hoogtelyn (dit tref die basis teen 90°)"),
      [L("the median (it goes to the midpoint)", "die swaartelyn (dit gaan na die middelpunt)"), L("either one", "enige een"), L("the longest side", "die langste sy")],
      { hint: L("Median → midpoint. Altitude → right angle. Height = altitude.", "Swaartelyn → middelpunt. Hoogtelyn → regte hoek. Hoogte = hoogtelyn."),
        answerLabel: L("The altitude (perpendicular to the base).", "Die hoogtelyn (loodreg op die basis).") });
  },

  /* the height comes from the opposite vertex */
  whichVertex: () => {
    const { P, base } = niceTriangle();
    const t = triangleAltitude(P, base, { accent: ACC, showAlt: false });
    return mc("triangleArea",
      L(`If side <b>${t.baseId}</b> is the base, which <b>vertex</b> must the perpendicular height be drawn from?`, `As sy <b>${t.baseId}</b> die basis is, vanaf watter <b>hoekpunt</b> moet die loodregte hoogte geteken word?`),
      t.apex, [L("A", "A"), L("B", "B"), L("C", "C")].filter((v) => v !== t.apex),
      { graph: t.spec,
        hint: L("The height drops from the corner OPPOSITE the base.", "Die hoogte val van die hoekpunt TEENOOR die basis af."),
        answerLabel: L(`From the opposite vertex, ${t.apex}.`, `Vanaf die teenoorstaande hoekpunt, ${t.apex}.`) });
  },

  /* is the height one of the sides? */
  notASide: () => {
    return yesnoQ("triangleArea",
      L("In a triangle that is <b>not</b> right-angled, is the perpendicular height ever one of the three sides?", "Is die loodregte hoogte in 'n driehoek wat <b>nie</b> reghoekig is nie, ooit een van die drie sye?"),
      false,
      { hint: L("A side can only BE the height if it meets the base at 90° — and that makes the triangle right-angled.", "'n Sy kan net die hoogte WEES as dit die basis teen 90° tref, en dan is die driehoek reghoekig."),
        answerLabel: L("No — you must draw a NEW segment (the altitude). Only in a right-angled triangle is a side already the height.", "Nee: jy moet 'n NUWE lynstuk teken (die hoogtelyn). Net in 'n reghoekige driehoek is 'n sy reeds die hoogte.") });
  },
};

export const questAg6 = {
  id: "ag6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "triangleArea", gen })),
};
