/* ============================================================
   TRIG QUEST 6 · Area rule   ★ DIAGRAM
   Area = ½·b·c·sinÂ for a triangle (two sides + included angle),
   plus regular polygons and a composite (house) figure. All shapes
   are drawn to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, houseFigure, regularPolygonFigure, areaSetupStep, calcStep } from "./_trig.js";
import { areaSAS, regularPolygonArea, cosineRuleSide, sinD, cosD, fix, randInt, pick } from "../triglib.js";
import { L } from "../lang.js";

const ACC = "#0369a1";
const NOTE = "areaRule";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the four calculations are STEP CHAINS now,
   the round-2 treatment widened to the chapter. The two one-formula
   areas got a build step + the number; the polygon and the house —
   the two genuinely heavy ones — became the ladder their own worked
   solutions already described, one rung per answer. Question, figure
   and numbers unchanged; MCs and the yes/no untouched.
   ------------------------------------------------------------ */

const SKILLS = {
  /* triangle area from two sides + the included angle */
  triArea: () => {
    let b = 0, c = 0;
    do { b = randInt(6, 16); c = randInt(6, 16); } while (b === c);   // distinct chips
    const A = randInt(35, 130);
    const t = placeTri({ sides: { b, c }, angles: { A } }, ["A", "B", "C"], randInt(-20, 20));
    const area = areaSAS(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: L(`Calculate the <b>area</b> of the triangle (2 decimals).`, `Bereken die <b>oppervlakte</b> van die driehoek (2 desimale).`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`)],
        sides: [t.side("A", "C", String(b)), t.side("A", "B", String(c))] },
      steps: [
        areaSetupStep(String(b), String(c), `${A}°`,
          L("Two sides and the SINE of the angle between them.", "Twee sye en die SIN van die hoek tussen hulle.")),
        calcStep(L("Work out the <b>area</b> (2 decimals).", "Bereken die <b>oppervlakte</b> (2 desimale)."), area,
          L(`Area = ½ × ${b} × ${c} × sin ${A}°.`, `Oppervlakte = ½ × ${b} × ${c} × sin ${A}°.`), { dp: 2, tol: 0.015 }),
      ],
      expected: area, dp: 2, tol: 0.015,   // absorb the last-cent flip if a learner works with a 4-dp sine
      hint: L("Area = ½ × (side) × (side) × sin(angle between them).", "Oppervlakte = ½ × (sy) × (sy) × sin(hoek tussen hulle)."),
      answerLabel: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`),
      solution: [
        { s: L(`Area = ½ · ${b} · ${c} · sin ${A}°`, `Oppervlakte = ½ · ${b} · ${c} · sin ${A}°`), r: L("two sides + included angle", "twee sye + ingeslote hoek") },
        { s: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`) },
      ],
    };
  },

  /* word version — the sides come out of the sentence */
  triAreaWord: () => {
    let b = 0, c = 0;
    do { b = randInt(8, 20); c = randInt(8, 20); } while (b === c);   // distinct chips
    const A = randInt(35, 120);
    const area = areaSAS(b, c, A);
    return {
      type: "steps", concept: NOTE,
      prompt: L(`In △MNP, MN = ${c}, MP = ${b} and M̂ = ${A}°. Calculate the area of △MNP (2 decimals).`, `In △MNP is MN = ${c}, MP = ${b} en M̂ = ${A}°. Bereken die oppervlakte van △MNP (2 desimale).`),
      steps: [
        areaSetupStep(String(c), String(b), `${A}°`,
          L("M̂ sits between MN and MP — those two sides, and the sine of M̂.", "M̂ lê tussen MN en MP: daardie twee sye, en die sin van M̂.")),
        calcStep(L("Work out the <b>area</b> (2 decimals).", "Bereken die <b>oppervlakte</b> (2 desimale)."), area,
          L(`Area = ½ × ${c} × ${b} × sin ${A}°.`, `Oppervlakte = ½ × ${c} × ${b} × sin ${A}°.`), { dp: 2, tol: 0.015 }),
      ],
      expected: area, dp: 2, tol: 0.015,
      hint: L("M̂ is between the two given sides, so Area = ½·MN·MP·sinM̂.", "M̂ lê tussen die twee gegewe sye, dus Oppervlakte = ½·MN·MP·sinM̂."),
      answerLabel: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`),
      solution: [{ s: L(`Area = ½ · ${c} · ${b} · sin ${A}° = ${fix(area, 2)}`, `Oppervlakte = ½ · ${c} · ${b} · sin ${A}° = ${fix(area, 2)}`) }],
    };
  },

  /* regular polygon — the triangle method, one rung per answer */
  regularPolygon: () => {
    const n = pick([5, 6, 8]);
    const s = randInt(6, 14);
    const area = regularPolygonArea(n, s);
    const name = { 5: L("pentagon", "vyfhoek"), 6: L("hexagon", "seshoek"), 8: L("octagon", "agthoek") }[n];
    const apex = 360 / n;                      // 72 / 60 / 45 — integers for all three n
    const R = s / (2 * sinD(180 / n));         // circumradius (the equal legs)
    const triA = 0.5 * R * R * sinD(apex);     // one centre triangle
    return {
      type: "steps", concept: "areaPolygon",
      prompt: L(`Calculate the area of this regular <b>${name}</b> with side length ${s} (2 decimals).`, `Bereken die oppervlakte van hierdie reëlmatige <b>${name}</b> met sylengte ${s} (2 desimale).`),
      graph: regularPolygonFigure(n, s, ACC),
      steps: [
        calcStep(L(`Split it into ${n} equal triangles from the centre. What is each triangle's <b>centre angle</b> (whole number)?`, `Verdeel dit in ${n} gelyke driehoeke vanaf die middelpunt. Wat is elke driehoek se <b>middelpuntshoek</b> (heelgetal)?`),
          apex, L(`The ${n} triangles share the full 360° at the centre: 360° ÷ ${n}.`, `Die ${n} driehoeke deel die volle 360° by die middelpunt: 360° ÷ ${n}.`),
          { dp: 0, tol: 0.5, unit: "°" }),
        calcStep(L("Each triangle is isosceles, with two equal legs <b>R</b> out to the corners. Find R (2 decimals).", "Elke driehoek is gelykbenig, met twee gelyke bene <b>R</b> uit na die hoekpunte. Vind R (2 desimale)."),
          R, L(`Half a side over the sine of half the centre angle: R = (${s} ÷ 2) ÷ sin ${fix(180 / n, 1)}°.`, `Halwe sy oor die sin van die halwe middelpuntshoek: R = (${s} ÷ 2) ÷ sin ${fix(180 / n, 1)}°.`),
          { dp: 2, tol: 0.02 }),
        calcStep(L("The area of <b>one</b> triangle (2 decimals).", "Die oppervlakte van <b>een</b> driehoek (2 desimale)."),
          triA, L(`½ · R² · sin ${fix(apex, 0)}° — keep R unrounded on the calculator.`, `½ · R² · sin ${fix(apex, 0)}°: hou R onafgerond op die sakrekenaar.`),
          { dp: 2, tol: 0.1 }),
        calcStep(L(`All ${n} together — the <b>total area</b> (2 decimals).`, `Al ${n} saam: die <b>totale oppervlakte</b> (2 desimale).`),
          area, L(`${n} × one triangle. (Check: n·s² ÷ (4·tan(180°/n)) gives it in one step.)`, `${n} × een driehoek. (Kontrole: n·s² ÷ (4·tan(180°/n)) gee dit in een stap.)`),
          { dp: 2, tol: 0.5 }),
      ],
      expected: area, dp: 2, tol: 0.5,   // triangle-method answers drift if R is rounded — accept them
      hint: L(`Split it into ${n} equal triangles from the centre. Each has a centre angle of 360°/${n} = ${fix(360 / n, 0)}°.`, `Verdeel dit in ${n} gelyke driehoeke vanaf die middelpunt. Elkeen het 'n middelpuntshoek van 360°/${n} = ${fix(360 / n, 0)}°.`),
      answerLabel: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`),
      solution: [
        { s: L(`${n} isosceles triangles from the centre, each with apex angle 360°/${n} = ${fix(360 / n, 0)}°`, `${n} gelykbenige driehoeke vanaf die middelpunt, elk met tophoek 360°/${n} = ${fix(360 / n, 0)}°`) },
        { s: L(`equal legs R = (s/2) / sin(180°/${n}), then each triangle = ½·R²·sin ${fix(360 / n, 0)}°`, `gelyke bene R = (s/2) / sin(180°/${n}), dan elke driehoek = ½·R²·sin ${fix(360 / n, 0)}°`), r: L("keep R unrounded", "hou R onafgerond") },
        { s: L(`in one step: Area = n·s² / (4·tan(180°/n)) = ${n}·${s}² / (4·tan ${fix(180 / n, 1)}°)`, `in een stap: Oppervlakte = n·s² / (4·tan(180°/n)) = ${n}·${s}² / (4·tan ${fix(180 / n, 1)}°)`) },
        { s: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`) },
      ],
    };
  },

  /* composite "house" figure: rectangle + isosceles roof */
  houseArea: () => {
    const r = randInt(5, 9), theta = pick([100, 105, 110, 115, 120]), h = randInt(5, 9);
    const fig = houseFigure(r, theta, h, ACC);
    const base = 2 * r * sinD(theta / 2);
    const total = fig.areaWall + fig.areaRoof;
    return {
      type: "steps", concept: "areaQuad",
      prompt: L(`Find the total <b>area</b> of the figure (2 decimals): a rectangle below an isosceles-triangle roof.`, `Vind die totale <b>oppervlakte</b> van die figuur (2 desimale): 'n reghoek onder 'n gelykbenige driehoek as dak.`),
      graph: fig.graph,
      steps: [
        calcStep(L("First the roof's <b>base</b> — the cosine rule, with r twice (2 decimals).", "Eers die dak se <b>basis</b>: die cosinusreël, met r twee keer (2 desimale)."),
          base, L(`base² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°, then the square root.`, `basis² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°, dan die vierkantswortel.`),
          { dp: 2, tol: 0.015 }),
        calcStep(L(`The <b>rectangle</b>: base × ${h} (2 decimals).`, `Die <b>reghoek</b>: basis × ${h} (2 desimale).`),
          fig.areaWall, L("Keep the unrounded base if it is still on the calculator — the 2-decimal one is accepted too.", "Hou die onafgeronde basis as dit nog op die sakrekenaar is: die een met 2 desimale word ook aanvaar."),
          { dp: 2, tol: 0.06 }),
        calcStep(L("The <b>roof</b> (2 decimals).", "Die <b>dak</b> (2 desimale)."),
          fig.areaRoof, L(`½ · ${r}² · sin ${theta}°.`, `½ · ${r}² · sin ${theta}°.`), { dp: 2, tol: 0.015 }),
        calcStep(L("Add them — the <b>total area</b> (2 decimals).", "Tel hulle op: die <b>totale oppervlakte</b> (2 desimale)."),
          total, L("Rectangle + roof.", "Reghoek + dak."), { dp: 2, tol: 0.1 }),
      ],
      expected: total, dp: 2, tol: 0.1,   // matches the last step: a 2-dp base carried through is accepted
      hint: L("Roof area = ½·r²·sinθ. For the rectangle you first need its width — the roof's base, by the cosine rule.", "Dak se oppervlakte = ½·r²·sinθ. Vir die reghoek het jy eers sy breedte nodig: die dak se basis, met die cosinusreël."),
      answerLabel: L(`Area = ${fix(total, 2)} square units`, `Oppervlakte = ${fix(total, 2)} vierkante eenhede`),
      solution: [
        { s: L(`base² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°  →  base = ${fix(base, 2)}`, `basis² = ${r}² + ${r}² − 2(${r})(${r})·cos ${theta}°  →  basis = ${fix(base, 2)}`), r: L("cosine rule", "cosinusreël") },
        { s: L(`rectangle = base · ${h} = ${fix(fig.areaWall, 2)}`, `reghoek = basis · ${h} = ${fix(fig.areaWall, 2)}`), r: L("keep the unrounded base", "hou die onafgeronde basis") },
        { s: L(`roof = ½·${r}²·sin ${theta}° = ${fix(fig.areaRoof, 2)}`, `dak = ½·${r}²·sin ${theta}° = ${fix(fig.areaRoof, 2)}`) },
        { s: L(`total = ${fix(total, 2)} square units`, `totaal = ${fix(total, 2)} vierkante eenhede`) },
      ],
    };
  },

  /* the formula */
  areaFormula: () => mc(NOTE,
    L("The area rule for △ABC says Area = …", "Die oppervlakreël vir △ABC sê Oppervlakte = …"),
    L("½·b·c·sinÂ", "½·b·c·sinÂ"),
    [L("½·b·c·cosÂ", "½·b·c·cosÂ"), L("b·c·sinÂ", "b·c·sinÂ"), L("½·b·c·tanÂ", "½·b·c·tanÂ")],
    { hint: L("Half, two sides, and the SINE of the angle between them.", "Die helfte, twee sye, en die SIN van die hoek tussen hulle."),
      answerLabel: L("Area = ½·b·c·sinÂ — two sides and the sine of their included angle.", "Oppervlakte = ½·b·c·sinÂ: twee sye en die sin van hulle ingeslote hoek."),
      solution: [
        { s: L("Area of any triangle = ½ × base × height, so take b as the base", "Oppervlakte van enige driehoek = ½ × basis × hoogte, dus neem b as die basis") },
        { s: L("Drop the height from the top corner: h = c·sinÂ", "Laat die hoogte val van die boonste hoekpunt: h = c·sinÂ"), r: L("sinÂ = O/H in the little right triangle", "sinÂ = O/H in die klein reghoekige driehoek") },
        { s: L("Area = ½·b·h = ½·b·c·sinÂ", "Oppervlakte = ½·b·h = ½·b·c·sinÂ"), r: L("that is where the sine comes from — never cos, never tan", "daar kom die sin vandaan: nooit cos nie, nooit tan nie") },
      ] }),

  /* need the included angle */
  needIncluded: () => ({
    type: "yesno", concept: NOTE,
    prompt: L("You know two sides of a triangle but the given angle is <b>not</b> between them. Can you use the area rule directly?", "Jy ken twee sye van 'n driehoek, maar die gegewe hoek lê <b>nie</b> tussen hulle nie. Kan jy die oppervlakreël direk gebruik?"),
    yes: false,
    hint: L("The area rule needs the angle BETWEEN the two sides.", "Die oppervlakreël het die hoek TUSSEN die twee sye nodig."),
    answerLabel: L("No — the area rule needs the included angle. Find it first (e.g. via the sine/cosine rule).", "Nee: die oppervlakreël het die ingeslote hoek nodig. Vind dit eers (bv. met die sinus-/cosinusreël)."),
    solution: [{ s: L("Area rule needs the angle between the two sides; without it, solve for that angle first.", "Die oppervlakreël het die hoek tussen die twee sye nodig; sonder dit los jy eers vir daardie hoek op.") }],
  }),
};

export const questT6 = {
  id: "t6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "regularPolygon" ? "areaPolygon" : id === "houseArea" ? "areaQuad" : NOTE, gen,
  })),
};
