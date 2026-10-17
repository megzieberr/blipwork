/* ============================================================
   TRIG QUEST 7 · Mixed problems   ★ DIAGRAM
   Pick the right rule, combine steps, and handle the classics:
   shortest distance (perpendicular), area from three sides, and
   word problems. Everything to scale.
   ============================================================ */
import { mc } from "./_shared.js";
import {
  placeTri, segStartClear, sineSetupStep, cosineSideSetupStep,
  cosineAngleSetupStep, mcStep, calcStep,
} from "./_trig.js";
import {
  sineRuleSide, cosineRuleSide, cosineRuleAngle, areaSAS, areaSSS,
  footOfPerp, dist, sinD, fix, ang, randInt, pick,
} from "../triglib.js";
import { L } from "../lang.js";

const ACC = "#075985";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the calculations are STEP CHAINS now, the
   round-2 treatment widened to the chapter. This round is SYNTHESIS,
   so its chains open on the round's own question — WHICH rule? — then
   build the set-up, then the number; the multi-stage classics
   (shortest distance, area from three sides) walk their own worked
   solutions one answered rung at a time. Question, figure and numbers
   unchanged; the strategy MC untouched.
   ------------------------------------------------------------ */

/* the same which-rule opener for every solveUnknown variant */
const whichRuleStep = (correct, hint) =>
  mcStep(L("First: which rule fits?", "Eers: watter reël pas?"), correct,
    [L("Sine rule", "Sinusreël"), L("Cosine rule", "Cosinusreël"), L("Area rule", "Oppervlakreël")].filter(r => r !== correct), hint);

const SKILLS = {
  /* one unknown — but which rule? randomly a sine-side, cosine-side or cosine-angle */
  solveUnknown: () => {
    const kind = pick(["sineSide", "cosSide", "cosAngle"]);
    if (kind === "sineSide") {
      /* three distinct angles, same reasons as t2's genAAS: the third
         angle is the decoy chip, and equal angles would double a chip */
      let A = 0, B = 0;
      for (let tries = 0; tries < 60; tries++) {
        A = randInt(40, 80); B = randInt(40, 80);
        const C3 = 180 - A - B;
        if (A !== B && C3 !== A && C3 !== B && C3 >= 20) break;
      }
      const C3 = 180 - A - B;
      const a = randInt(9, 18);
      const t = placeTri({ angles: { A, B }, sides: { a } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-20, 20));
      const x = sineRuleSide(a, A, B);
      return {
        type: "steps", concept: "mixedStrategy",
        prompt: L("Find <b>x</b> (2 decimals). First decide which rule fits.", "Vind <b>x</b> (2 desimale). Besluit eers watter reël pas."),
        graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
          angles: [t.angle(L("A", "A"), `${A}°`), t.angle(L("B", "B"), `${B}°`)],
          sides: [t.side(L("B", "B"), L("C", "C"), String(a)), t.side(L("A", "A"), L("C", "C"), "x")] },
        steps: [
          whichRuleStep(L("Sine rule", "Sinusreël"), L("A side paired with the angle opposite it → sine rule.", "'n Sy gepaar met die hoek teenoor hom → sinusreël.")),
          sineSetupStep({ side: "x", sin: `sin ${B}°` }, { side: String(a), sin: `sin ${A}°` },
            [`sin ${C3}°`],
            L(`x is opposite B̂ = ${B}°, and ${a} is opposite Â = ${A}°.`, `x is teenoor B̂ = ${B}°, en ${a} is teenoor Â = ${A}°.`)),
          calcStep(L("Work out <b>x</b> (2 decimals).", "Bereken <b>x</b> (2 desimale)."), x,
            L(`x = ${a} × sin ${B}° ÷ sin ${A}°. Calculator in DEG.`, `x = ${a} × sin ${B}° ÷ sin ${A}°. Sakrekenaar in DEG.`), { dp: 2, tol: 0.015 }),
        ],
        expected: x, dp: 2, tol: 0.015,   // absorb the last-cent flip from 4-dp sines/cosines
        hint: L("A side paired with its opposite angle → sine rule.", "'n Sy gepaar met sy teenoorstaande hoek → sinusreël."),
        answerLabel: L(`x = ${fix(x, 2)} (sine rule)`, `x = ${fix(x, 2)} (sinusreël)`),
        solution: [{ s: L("two angles + a side → sine rule", "twee hoeke + 'n sy → sinusreël") }, { s: L(`x = ${a}·sin ${B}°/sin ${A}° = ${fix(x, 2)}`, `x = ${a}·sin ${B}°/sin ${A}° = ${fix(x, 2)}`) }],
      };
    }
    if (kind === "cosSide") {
      let b = 0, c = 0;
      do { b = randInt(7, 15); c = randInt(7, 15); } while (b === c);   // distinct chips
      const A = randInt(40, 120);
      const t = placeTri({ sides: { b, c }, angles: { A } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-20, 20));
      const x = cosineRuleSide(b, c, A);
      return {
        type: "steps", concept: "mixedStrategy",
        prompt: L("Find <b>x</b> (2 decimals). First decide which rule fits.", "Vind <b>x</b> (2 desimale). Besluit eers watter reël pas."),
        graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
          angles: [t.angle(L("A", "A"), `${A}°`)],
          sides: [t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c)), t.side(L("B", "B"), L("C", "C"), "x")] },
        steps: [
          whichRuleStep(L("Cosine rule", "Cosinusreël"), L("Two sides and the angle BETWEEN them → cosine rule.", "Twee sye en die hoek TUSSEN hulle → cosinusreël.")),
          cosineSideSetupStep("x", String(b), String(c), `${A}°`,
            L("The known sides fill the squares and the product; the included angle rides with cos.", "Die bekende sye vul die kwadrate en die produk; die ingeslote hoek hoort by cos.")),
          calcStep(L("Work out <b>x</b> (2 decimals).", "Bereken <b>x</b> (2 desimale)."), x,
            L("x² first, then the square root.", "Eers x², dan die vierkantswortel."), { dp: 2, tol: 0.015 }),
        ],
        expected: x, dp: 2, tol: 0.015,
        hint: L("Two sides + the angle between them → cosine rule.", "Twee sye + die hoek tussen hulle → cosinusreël."),
        answerLabel: L(`x = ${fix(x, 2)} (cosine rule)`, `x = ${fix(x, 2)} (cosinusreël)`),
        solution: [{ s: L("two sides + included angle → cosine rule", "twee sye + ingeslote hoek → cosinusreël") }, { s: L(`x² = ${b}²+${c}²−2(${b})(${c})cos ${A}° → x = ${fix(x, 2)}`, `x² = ${b}²+${c}²−2(${b})(${c})cos ${A}° → x = ${fix(x, 2)}`) }],
      };
    }
    // cosAngle
    let a, b, c;
    do { a = randInt(7, 15); b = randInt(7, 15); c = randInt(7, 15); }
    while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1 || a === b || a === c || b === c);   // distinct chips
    const t = placeTri({ sides: { a, b, c } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-20, 20));
    const val = cosineRuleAngle(a, b, c);                     // Â, opposite a
    return {
      type: "steps", concept: "mixedStrategy",
      prompt: L("Find <b>θ</b> (the angle at A), 1 decimal. First decide which rule fits.", "Vind <b>θ</b> (die hoek by A), 1 desimaal. Besluit eers watter reël pas."),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle(L("A", "A"), "θ")],
        sides: [t.side(L("B", "B"), L("C", "C"), String(a)), t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c))] },
      steps: [
        whichRuleStep(L("Cosine rule", "Cosinusreël"), L("All three sides, hunting an angle → the rearranged cosine rule.", "Al drie sye, op soek na 'n hoek → die herrangskikte cosinusreël.")),
        cosineAngleSetupStep("θ", String(a), String(b), String(c),
          L("θ is at A, so its OPPOSITE side is the one subtracted on top.", "θ is by A, dus word sy TEENOORSTAANDE sy bo afgetrek.")),
        calcStep(L("Work out <b>θ</b> (1 decimal).", "Bereken <b>θ</b> (1 desimaal)."), val,
          L("cos θ first, then SHIFT cos it.", "Eers cos θ, dan SHIFT cos daarop."), { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: val, dp: 1, tol: 0.1,
      hint: L("All three sides, finding an angle → cosine rule (rearranged).", "Al drie sye, 'n hoek gesoek → cosinusreël (herrangskik)."),
      answerLabel: L(`θ = ${ang(val)} (cosine rule)`, `θ = ${ang(val)} (cosinusreël)`),
      solution: [{ s: L("three sides → cosine rule for the angle", "drie sye → cosinusreël vir die hoek") }, { s: L(`cosθ = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → θ = ${ang(val)}`, `cosθ = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → θ = ${ang(val)}`) }],
    };
  },

  /* shortest distance from a vertex to the opposite side (the perpendicular) */
  shortestDistance: () => {
    const A = randInt(50, 80), s = randInt(10, 16);
    const b = s, c = s + pick([-2, -1, 0, 1, 2]);            // near-isosceles → foot stays inside
    const t = placeTri({ sides: { b, c }, angles: { A } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-16, 16));
    const a = cosineRuleSide(b, c, A);                        // base BC
    const area = areaSAS(b, c, A);
    const h = 2 * area / a;                                   // perpendicular from A to BC
    const F = footOfPerp(t.pts[t.L(L("A", "A"))], t.pts[t.L(L("B", "B"))], t.pts[t.L(L("C", "C"))]);
    const pts = { ...t.pts, F };
    const graph = { type: "triangle", accent: ACC, pts, poly: t.poly,
      angles: [t.angle(L("A", "A"), `${A}°`), { at: "F", right: true, between: [t.L(L("A", "A")), t.L(L("B", "B"))] }],
      sides: [t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c))] };
    // the altitude runs almost along the bisector here, so start the dash
    // just below the angle label instead of striking straight through it
    graph.pts = { ...pts, A0: segStartClear(graph, t.L(L("A", "A")), "F") };
    graph.segs = [{ from: "A0", to: "F", dash: true }];
    return {
      type: "steps", concept: "shortestDistance",
      prompt: L(`Calculate the <b>shortest distance</b> from ${t.L("A")} to ${t.L("B")}${t.L("C")} (2 decimals).`, `Bereken die <b>kortste afstand</b> van ${t.L("A")} na ${t.L("B")}${t.L("C")} (2 desimale).`),
      graph,
      steps: [
        calcStep(L("Step 1 — the <b>area</b> of the triangle (2 decimals).", "Stap 1: die <b>oppervlakte</b> van die driehoek (2 desimale)."), area,
          L(`Area = ½ · ${b} · ${c} · sin ${A}°.`, `Oppervlakte = ½ · ${b} · ${c} · sin ${A}°.`), { dp: 2, tol: 0.015 }),
        calcStep(L(`Step 2 — the base ${t.L("B")}${t.L("C")}, by the cosine rule (2 decimals).`, `Stap 2: die basis ${t.L("B")}${t.L("C")}, met die cosinusreël (2 desimale).`), a,
          L(`${t.L("B")}${t.L("C")}² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°, then the square root.`, `${t.L("B")}${t.L("C")}² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°, dan die vierkantswortel.`),
          { dp: 2, tol: 0.015 }),
        calcStep(L("Step 3 — the <b>shortest distance</b> (2 decimals).", "Stap 3: die <b>kortste afstand</b> (2 desimale)."), h,
          L("Area = ½ · base · height, so height = 2·Area ÷ base. The dashed line IS that height.", "Oppervlakte = ½ · basis · hoogte, dus hoogte = 2·Oppervlakte ÷ basis. Die stippellyn IS daardie hoogte."),
          { dp: 2, tol: 0.03 }),
      ],
      expected: h, dp: 2, tol: 0.03,   // matches the last step: 2-dp Area and base carried through are accepted
      hint: L("Shortest distance = the perpendicular height. Area = ½·base·height, so height = 2·Area / base.", "Kortste afstand = die loodregte hoogte. Oppervlakte = ½·basis·hoogte, dus hoogte = 2·Oppervlakte / basis."),
      answerLabel: L(`shortest distance = ${fix(h, 2)}`, `kortste afstand = ${fix(h, 2)}`),
      solution: [
        { s: L(`Area = ½·${b}·${c}·sin ${A}° = ${fix(area, 2)}`, `Oppervlakte = ½·${b}·${c}·sin ${A}° = ${fix(area, 2)}`), r: L("area rule", "oppervlakreël") },
        { s: L(`base ${t.L("B")}${t.L("C")} = ${fix(a, 2)}`, `basis ${t.L("B")}${t.L("C")} = ${fix(a, 2)}`), r: L("cosine rule", "cosinusreël") },
        { s: L(`height = 2·Area / base = ${fix(h, 2)}`, `hoogte = 2·Oppervlakte / basis = ${fix(h, 2)}`), r: L("½·base·height", "½·basis·hoogte") },
      ],
    };
  },

  /* area from all three sides (cosine for an angle, then area rule) */
  areaFromSSS: () => {
    let a, b, c;
    do { a = randInt(8, 16); b = randInt(8, 16); c = randInt(8, 16); }
    while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1 || a === b || a === c || b === c);   // distinct chips
    const t = placeTri({ sides: { a, b, c } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-18, 18));
    const A = cosineRuleAngle(a, b, c);
    const area = areaSSS(a, b, c);
    return {
      type: "steps", concept: "mixedStrategy",
      prompt: L("Calculate the <b>area</b> of this triangle (2 decimals). You only have the three sides.", "Bereken die <b>oppervlakte</b> van hierdie driehoek (2 desimale). Jy het net die drie sye."),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        sides: [t.side(L("B", "B"), L("C", "C"), String(a)), t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c))] },
      steps: [
        cosineAngleSetupStep("Â", String(a), String(b), String(c),
          L("No angle in sight, so make one: Â's opposite side is subtracted on top, the two beside it do the rest.", "Geen hoek in sig nie, dus maak een: Â se teenoorstaande sy word bo afgetrek, die twee langs hom doen die res.")),
        calcStep(L("Find <b>Â</b> (1 decimal).", "Vind <b>Â</b> (1 desimaal)."), A,
          L("cos Â first, then SHIFT cos it.", "Eers cos Â, dan SHIFT cos daarop."), { dp: 1, tol: 0.1, unit: "°" }),
        calcStep(L("Now the <b>area</b> (2 decimals).", "Nou die <b>oppervlakte</b> (2 desimale)."), area,
          L(`Area = ½ · ${b} · ${c} · sin Â — the two sides AROUND Â, and keep Â unrounded.`, `Oppervlakte = ½ · ${b} · ${c} · sin Â: die twee sye OM Â, en hou Â onafgerond.`),
          { dp: 2, tol: 0.1 }),
      ],
      expected: area, dp: 2, tol: 0.1,   // accept working that carries the 1-dp rounded angle
      hint: L("First find an angle with the cosine rule, then use the area rule with the two sides around it.", "Vind eers 'n hoek met die cosinusreël, gebruik dan die oppervlakreël met die twee sye om hom."),
      answerLabel: L(`Area = ${fix(area, 2)} square units`, `Oppervlakte = ${fix(area, 2)} vierkante eenhede`),
      solution: [
        { s: L(`cos Â = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → Â = ${ang(A)}`, `cos Â = (${b}²+${c}²−${a}²)/(2·${b}·${c}) → Â = ${ang(A)}`), r: L("cosine rule", "cosinusreël") },
        { s: L(`Area = ½·${b}·${c}·sin Â = ${fix(area, 2)}`, `Oppervlakte = ½·${b}·${c}·sin Â = ${fix(area, 2)}`), r: L("area rule — keep Â unrounded", "oppervlakreël: hou Â onafgerond") },
      ],
    };
  },

  /* word problem — distance via the cosine rule */
  contextCosine: () => {
    /* ⚠️ the distances must also differ from the ANGLE's number: the ranges
       overlap (40–120 vs 40–130), the three values are chips on the build
       step, and normalizeTokens strips the ° sign — so a "93" side chip and
       a "93°" angle chip would MARK as the same token and a child putting
       the side where the angle goes would be told they are right. */
    const A = randInt(40, 130);
    let b = 0, c = 0;
    do { b = randInt(40, 120); c = randInt(40, 120); } while (b === c || b === A || c === A);
    const dapart = cosineRuleSide(b, c, A);
    return {
      type: "steps", concept: "mixedStrategy",
      prompt: L(`Two hikers leave the same point along straight paths. One walks ${b} m, the other ${c} m, and the angle between their paths is ${A}°. How far apart are they (2 decimals)?`, `Twee stappers vertrek van dieselfde punt langs reguit paaie. Een stap ${b} m, die ander ${c} m, en die hoek tussen hulle paaie is ${A}°. Hoe ver is hulle van mekaar af (2 desimale)?`),
      steps: [
        whichRuleStep(L("Cosine rule", "Cosinusreël"), L("Two distances and the angle between them — that is SAS.", "Twee afstande en die hoek tussen hulle: dit is SHS.")),
        cosineSideSetupStep("d", String(b), String(c), `${A}°`,
          L("The two walked distances fill the squares and the product; the angle between the paths rides with cos.", "Die twee afstande wat gestap is, vul die kwadrate en die produk; die hoek tussen die paaie hoort by cos.")),
        calcStep(L("How far apart are they (2 decimals)?", "Hoe ver is hulle van mekaar af (2 desimale)?"), dapart,
          L("d² first, then the square root.", "Eers d², dan die vierkantswortel."), { dp: 2, tol: 0.015 }),
      ],
      expected: dapart, dp: 2, tol: 0.015,
      hint: L("The two distances and the angle between them are SAS → cosine rule for the third side.", "Die twee afstande en die hoek tussen hulle is SHS → cosinusreël vir die derde sy."),
      answerLabel: L(`${fix(dapart, 2)} m apart`, `${fix(dapart, 2)} m van mekaar af`),
      solution: [
        { s: L(`d² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`, `d² = ${b}² + ${c}² − 2(${b})(${c})·cos ${A}°`) },
        { s: L(`d = ${fix(dapart, 2)} m`, `d = ${fix(dapart, 2)} m`) },
      ],
    };
  },

  /* strategy: name the rule for a described situation */
  strategy: () => {
    const cases = [
      { p: L("You know all three sides and want the biggest angle.", "Jy ken al drie sye en wil die grootste hoek hê."), c: L("Cosine rule", "Cosinusreël"),
        sol: [
          { s: L("Three sides given, no angle at all", "Drie sye gegee, glad geen hoek nie"), r: L("the sine rule needs an angle to start", "die sinusreël het 'n hoek nodig om te begin") },
          { s: L("cosÂ = (b² + c² − a²)/(2bc) works from sides only", "cosÂ = (b² + c² − a²)/(2bc) werk met net sye") },
          { s: L("Put the LONGEST side in the a slot", "Sit die LANGSTE sy in die a-plek"), r: L("the biggest angle faces the longest side", "die grootste hoek is oorkant die langste sy") },
        ] },
      { p: L("You know two angles and one side and want another side.", "Jy ken twee hoeke en een sy en wil nog 'n sy hê."), c: L("Sine rule", "Sinusreël"),
        sol: [
          { s: L("Two angles and a side: the third angle is 180° − the other two, so every angle is known", "Twee hoeke en 'n sy: die derde hoek is 180° − die ander twee, dus is elke hoek bekend") },
          { s: L("That gives a side paired with the angle opposite it", "Dit gee 'n sy gepaar met die hoek teenoor hom"), r: L("friends — exactly what the sine rule needs", "vriende: presies wat die sinusreël nodig het") },
          { s: L("Solving for a side, so sides on top: a/sinÂ = b/sinB̂", "Jy los vir 'n sy op, dus sye bo: a/sinÂ = b/sinB̂") },
        ] },
      { p: L("You know two sides and the angle between them and want the area.", "Jy ken twee sye en die hoek tussen hulle en wil die oppervlakte hê."), c: L("Area rule", "Oppervlakreël"),
        sol: [
          { s: L("The question asks for AREA, which rules out the sine and cosine rules straight away", "Die vraag vra OPPERVLAKTE, en dit skakel die sinus- en cosinusreël dadelik uit") },
          { s: L("Area = ½·b·c·sinÂ needs two sides and the angle between them", "Oppervlakte = ½·b·c·sinÂ het twee sye en die hoek tussen hulle nodig") },
          { s: L("That is exactly what you were given, so it goes straight in", "Dit is presies wat jy gekry het, dus gaan dit reguit in") },
        ] },
      { p: L("You know two sides and the angle between them and want the third side.", "Jy ken twee sye en die hoek tussen hulle en wil die derde sy hê."), c: L("Cosine rule", "Cosinusreël"),
        sol: [
          { s: L("The angle sits BETWEEN the two known sides, so no side is paired with a known opposite angle", "Die hoek lê TUSSEN die twee bekende sye, dus is geen sy met 'n bekende teenoorstaande hoek gepaar nie") },
          { s: L("No pair means the sine rule cannot start", "Geen paar beteken die sinusreël kan nie begin nie") },
          { s: L("a² = b² + c² − 2bc·cosÂ is built for two sides plus the angle between them", "a² = b² + c² − 2bc·cosÂ is gebou vir twee sye plus die hoek tussen hulle") },
        ] },
    ];
    const k = pick(cases);
    return mc("mixedStrategy", k.p + L(" Which rule?", " Watter reël?"), k.c,
      [L("Sine rule", "Sinusreël"), L("Cosine rule", "Cosinusreël"), L("Area rule", "Oppervlakreël")].filter(r => r !== k.c),
      { hint: L("Side + opposite angle → sine. Included angle (or 3 sides) → cosine. Area from 2 sides + included angle → area rule.", "Sy + teenoorstaande hoek → sinus. Ingeslote hoek (of 3 sye) → cosinus. Oppervlakte uit 2 sye + ingeslote hoek → oppervlakreël."),
        answerLabel: `${k.c}.`,
        solution: k.sol });
  },
};

export const questT7 = {
  id: "t7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: id === "shortestDistance" ? "shortestDistance" : "mixedStrategy", gen,
  })),
};
