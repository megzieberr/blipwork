/* ============================================================
   TRIG QUEST 3 · Sine rule — ANGLES & the ambiguous case  ★ DIAGRAM
   Sines on top: sinÂ/a = sinB̂/b = sinĈ/c. Plus how many triangles
   two sides and a non-included angle can make, and the obtuse
   partner 180° − (acute).
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, sineAngleSetupStep, mcStep, calcStep } from "./_trig.js";
import { sineRuleAngle, ambiguousCase, sinD, fix, ang, randInt, pick } from "../triglib.js";
import { L } from "../lang.js";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — the two heavy calculations are STEP CHAINS
   now, the same treatment round 2 got on 2026-08-27. Her words then:
   "they build the equation step by step each time"; her words this
   week: the sine-rule work was "too intense too quick — split those
   intense questions up in smaller questions so the kids actually
   build the questions, not try to do everything in their head."
   Question, diagram and numbers are UNCHANGED — the worked `solution`
   each question already carried is what became the steps. The
   multiple-choice skills are untouched (round 2's standing ruling:
   "The multi-choice questions are perfect").
   ------------------------------------------------------------ */

const ACC = "#0ea5e9";
const NOTE = "sineRuleAngle";

const SKILLS = {
  /* find an angle, unambiguous because it is opposite the SHORTER side */
  findAngle: () => {
    let A, a, b, B;
    do {
      A = randInt(45, 80); a = randInt(13, 20);
      b = randInt(7, a - 3);                           // b < a → θ acute & unique
      B = sineRuleAngle(A, a, b);                      // θ, opposite b
    } while (B < 24);                                  // wedge wide enough for its θ label
    const t = placeTri({ angles: { A, B }, sides: { a } }, ["A", "B", "C"], randInt(-22, 22));
    const sinVal = b * sinD(A) / a;
    return {
      type: "steps", concept: NOTE,
      prompt: L(`Use the sine rule to find <b>θ</b> (the angle at B), correct to 1 decimal.`, `Gebruik die sinusreël om <b>θ</b> (die hoek by B) te vind, korrek tot 1 desimaal.`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle("A", `${A}°`), t.angle("B", "θ")],
        sides: [t.side("B", "C", String(a)), t.side("A", "C", String(b))] },
      steps: [
        /* b < a − 3 in the generator keeps the two side chips distinct */
        sineAngleSetupStep({ sin: "sin θ", side: String(b) }, { sin: `sin ${A}°`, side: String(a) }, [],
          L(`θ is opposite ${b}, and ${a} is opposite Â = ${A}°. Each sine sits over the side opposite its angle.`, `θ is teenoor ${b}, en ${a} is teenoor Â = ${A}°. Elke sin staan bo die sy teenoor sy hoek.`)),
        mcStep(L("Now get <b>sin θ</b> on its own.", "Kry nou <b>sin θ</b> alleen."),
          L(`sin θ = (${b} · sin ${A}°) / ${a}`, `sin θ = (${b} · sin ${A}°) / ${a}`),
          [L(`sin θ = (${a} · sin ${A}°) / ${b}`, `sin θ = (${a} · sin ${A}°) / ${b}`),
           L(`sin θ = ${b} / (${a} · sin ${A}°)`, `sin θ = ${b} / (${a} · sin ${A}°)`),
           L(`sin θ = (${b} · ${a}) / sin ${A}°`, `sin θ = (${b} · ${a}) / sin ${A}°`)],
          L(`${b} is dividing sin θ, so it multiplies up to the other side.`, `${b} deel sin θ, dus vermenigvuldig dit aan die ander kant.`)),
        calcStep(L("Work out the value of <b>sin θ</b> (4 decimals).", "Bereken die waarde van <b>sin θ</b> (4 desimale)."), sinVal,
          L(`sin θ = ${b} × sin ${A}° ÷ ${a}. This is not θ yet — it is sin θ.`, `sin θ = ${b} × sin ${A}° ÷ ${a}. Dit is nog nie θ nie: dit is sin θ.`), { dp: 4, tol: 0.0015 }),
        calcStep(L("Now find <b>θ</b> (1 decimal).", "Vind nou <b>θ</b> (1 desimaal)."), B,
          L("SHIFT sin that value on the calculator and you have θ.", "Doen SHIFT sin op daardie waarde op die sakrekenaar, en jy het θ."), { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: B, dp: 1, tol: 0.1,   // accept the neighbouring tenth from 4-dp sine working
      hint: L("θ is opposite b. Sines on top: sinθ/b = sinÂ/a, so sinθ = b·sinÂ/a.", "θ is teenoor b. Sin-terme bo: sinθ/b = sinÂ/a, dus sinθ = b·sinÂ/a."),
      answerLabel: L(`θ = ${ang(B)}`, `θ = ${ang(B)}`),
      solution: [
        { s: L(`sin θ / ${b} = sin ${A}° / ${a}`, `sin θ / ${b} = sin ${A}° / ${a}`), r: L("sines on top", "sin-terme bo") },
        { s: L(`sin θ = ${b} · sin ${A}° / ${a} = ${fix(sinVal, 4)}`, `sin θ = ${b} · sin ${A}° / ${a} = ${fix(sinVal, 4)}`) },
        { s: L(`θ = ${ang(B)}`, `θ = ${ang(B)}`) },
      ],
    };
  },

  /* how many triangles can the SSA data make? */
  ambiguousCount: () => {
    // build each outcome on purpose
    const want = pick([0, 1, 2]);
    let A, a, b;
    for (let tries = 0; tries < 200; tries++) {
      A = randInt(20, 55); b = randInt(10, 20);
      const h = b * sinD(A);
      if (want === 0) a = randInt(3, Math.max(3, Math.floor(h) - 1));
      else if (want === 2) a = randInt(Math.ceil(h) + 1, b - 1);
      else a = b + randInt(1, 8);                       // a ≥ b → exactly 1
      if (a > 0 && ambiguousCase(A, a, b).count === want) break;
    }
    const res = ambiguousCase(A, a, b);
    const word = { 0: L("no triangle", "geen driehoek"), 1: L("one triangle", "een driehoek"), 2: L("two triangles", "twee driehoeke") }[res.count];
    return mc("ambiguousCase",
      L(`Â = ${A}°, the side opposite Â is a = ${a}, and another side b = ${b}. How many triangles fit this data?`, `Â = ${A}°, die sy teenoor Â is a = ${a}, en nog 'n sy is b = ${b}. Hoeveel driehoeke pas by hierdie gegewens?`),
      word, [L("no triangle", "geen driehoek"), L("one triangle", "een driehoek"), L("two triangles", "twee driehoeke")].filter(w => w !== word),
      { hint: L("Compare a with h = b·sinÂ. a < h → none; a = h → one (right-angled); h < a < b → two; a ≥ b → one.", "Vergelyk a met h = b·sinÂ. a < h → geen; a = h → een (reghoekig); h < a < b → twee; a ≥ b → een."),
        answerLabel: L(`h = b·sinÂ = ${fix(res.h, 2)}. Here ${res.count === 0 ? `a (${a}) < h` : res.count === 2 ? `h < a (${a}) < b (${b})` : `a (${a}) ≥ b (${b})`}, so ${word}.`, `h = b·sinÂ = ${fix(res.h, 2)}. Hier is ${res.count === 0 ? `a (${a}) < h` : res.count === 2 ? `h < a (${a}) < b (${b})` : `a (${a}) ≥ b (${b})`}, dus ${word}.`),
        solution: [
          { s: L(`Drop the height from the top of side b: h = b·sinÂ = ${b}·sin${A}° = ${fix(res.h, 2)}`, `Laat die hoogte val van die bopunt van sy b: h = b·sinÂ = ${b}·sin${A}° = ${fix(res.h, 2)}`), r: L("the shortest a could possibly be", "die kortste wat a kan wees") },
          { s: L(`Now place a = ${a} against h = ${fix(res.h, 2)} and b = ${b}`, `Vergelyk nou a = ${a} met h = ${fix(res.h, 2)} en b = ${b}`) },
          { s: res.count === 0
              ? L(`a = ${a} is shorter than h = ${fix(res.h, 2)}, so it never reaches the base`, `a = ${a} is korter as h = ${fix(res.h, 2)}, dus bereik dit nooit die basis nie`)
              : res.count === 2
                ? L(`h = ${fix(res.h, 2)} &lt; a = ${a} &lt; b = ${b}, so a swings down and cuts the base twice`, `h = ${fix(res.h, 2)} &lt; a = ${a} &lt; b = ${b}, dus swaai a af en sny die basis twee keer`)
                : L(`a = ${a} is at least as long as b = ${b}, so it can only reach past the foot on one side`, `a = ${a} is ten minste so lank soos b = ${b}, dus kan dit net aan een kant verby die voetpunt reik`),
            r: `∴ ${word}` },
        ] });
  },

  /* the full ambiguous calculation: sine rule for the acute angle, then 180° − it */
  ambiguousBoth: () => {
    let A, a, b, res;
    do {
      A = randInt(25, 50); b = randInt(12, 20);
      a = randInt(Math.ceil(b * sinD(A)) + 1, b - 1);   // h < a < b → two triangles
      res = ambiguousCase(A, a, b);
    } while (res.count !== 2);
    const obtuse = 180 - res.acute;
    return {
      type: "steps", concept: "ambiguousCase",
      prompt: L(`In △ABC, Â = ${A}°, a = ${a} (opposite Â) and b = ${b}. Two triangles are possible. Calculate the <b>obtuse</b> possibility of B̂ (1 decimal).`, `In △ABC is Â = ${A}°, a = ${a} (teenoor Â) en b = ${b}. Twee driehoeke is moontlik. Bereken die <b>stomp</b> moontlikheid vir B̂ (1 desimaal).`),
      steps: [
        /* the generator forces h < a < b, so a ≠ b — the side chips stay distinct */
        sineAngleSetupStep({ sin: "sin B̂", side: String(b) }, { sin: `sin ${A}°`, side: String(a) }, [],
          L(`B̂ is opposite b = ${b}, and the known Â = ${A}° is opposite a = ${a}.`, `B̂ is teenoor b = ${b}, en die bekende Â = ${A}° is teenoor a = ${a}.`)),
        mcStep(L("Get <b>sin B̂</b> on its own.", "Kry <b>sin B̂</b> alleen."),
          L(`sin B̂ = (${b} · sin ${A}°) / ${a}`, `sin B̂ = (${b} · sin ${A}°) / ${a}`),
          [L(`sin B̂ = (${a} · sin ${A}°) / ${b}`, `sin B̂ = (${a} · sin ${A}°) / ${b}`),
           L(`sin B̂ = ${b} / (${a} · sin ${A}°)`, `sin B̂ = ${b} / (${a} · sin ${A}°)`),
           L(`sin B̂ = (${b} · ${a}) / sin ${A}°`, `sin B̂ = (${b} · ${a}) / sin ${A}°`)],
          L(`${b} is dividing sin B̂, so it multiplies up to the other side.`, `${b} deel sin B̂, dus vermenigvuldig dit aan die ander kant.`)),
        calcStep(L("First the <b>acute</b> possibility of B̂ (1 decimal).", "Eers die <b>skerp</b> moontlikheid vir B̂ (1 desimaal)."), res.acute,
          L("SHIFT sin always hands you the acute answer first.", "SHIFT sin gee jou altyd eers die skerp antwoord."), { dp: 1, tol: 0.1, unit: "°" }),
        calcStep(L("Now the <b>obtuse</b> possibility (1 decimal).", "Nou die <b>stomp</b> moontlikheid (1 desimaal)."), obtuse,
          L("The two possibilities are supplementary: 180° − the acute answer.", "Die twee moontlikhede is supplementêr: 180° − die skerp antwoord."), { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: obtuse, dp: 1, tol: 0.1,
      hint: L("Sine rule first: sinB̂ = b·sinÂ/a gives the ACUTE B̂. The obtuse partner is 180° − (that angle).", "Eers die sinusreël: sinB̂ = b·sinÂ/a gee die SKERP B̂. Die stomp maat is 180° − (daardie hoek)."),
      answerLabel: L(`obtuse B̂ = ${ang(obtuse)}`, `stomp B̂ = ${ang(obtuse)}`),
      solution: [
        { s: L(`sin B̂ / ${b} = sin ${A}° / ${a}`, `sin B̂ / ${b} = sin ${A}° / ${a}`), r: L("sines on top", "sin-terme bo") },
        { s: L(`sin B̂ = ${b} · sin ${A}° / ${a} = ${fix(b * sinD(A) / a, 4)}`, `sin B̂ = ${b} · sin ${A}° / ${a} = ${fix(b * sinD(A) / a, 4)}`) },
        { s: L(`acute B̂ = ${ang(res.acute)}`, `skerp B̂ = ${ang(res.acute)}`) },
        { s: L(`obtuse B̂ = 180° − ${ang(res.acute)} = ${ang(obtuse)}`, `stomp B̂ = 180° − ${ang(res.acute)} = ${ang(obtuse)}`), r: L("supplementary pair", "supplementêre paar") },
      ],
    };
  },

  /* the obtuse partner */
  obtusePartner: () => {
    const acute = randInt(28, 68) + pick([0, 0.2, 0.4, 0.6, 0.8]);
    const obtuse = 180 - acute;
    return {
      type: "calc", concept: "ambiguousCase",
      prompt: L(`In the ambiguous case the acute answer is B̂ = ${fix(acute, 1)}°. Give the <b>obtuse</b> possibility (1 decimal).`, `In die dubbelsinnige geval is die skerp antwoord B̂ = ${fix(acute, 1)}°. Gee die <b>stomp</b> moontlikheid (1 desimaal).`),
      expected: obtuse, dp: 1,
      hint: L("The two possible angles are supplementary — they add to 180°.", "Die twee moontlike hoeke is supplementêr: hulle tel op tot 180°."),
      answerLabel: L(`B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`, `B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`),
      solution: [{ s: L(`obtuse B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`, `stomp B̂ = 180° − ${fix(acute, 1)}° = ${fix(obtuse, 1)}°`), r: L("supplementary pair", "supplementêre paar") }],
    };
  },

  /* which form: sines on top when you want an angle */
  whichForm: () => mc(NOTE,
    L("When you are solving for an <b>angle</b>, the sine rule is best written with…", "As jy vir 'n <b>hoek</b> oplos, skryf jy die sinusreël die beste met…"),
    L("the sines on top (sinÂ/a = sinB̂/b)", "die sin-terme bo (sinÂ/a = sinB̂/b)"),
    [L("the sides on top (a/sinÂ = b/sinB̂)", "die sye bo (a/sinÂ = b/sinB̂)"), L("the angle sum first", "eers die hoekesom"), L("the cosine rule", "die cosinusreël")],
    { hint: L("Put the thing you want on top — here, the sine of the angle.", "Sit dit wat jy soek bo: hier die sin van die hoek."),
      answerLabel: L("Finding an angle → sines in the numerators: sinÂ/a = sinB̂/b = sinĈ/c.", "'n Hoek gesoek → sin-terme in die tellers: sinÂ/a = sinB̂/b = sinĈ/c."),
      solution: [
        { s: L("You are solving for an ANGLE, so the sine you want goes on top", "Jy los vir 'n HOEK op, dus gaan die sin wat jy soek bo") },
        { s: L("sinÂ/a = sinB̂/b = sinĈ/c", "sinÂ/a = sinB̂/b = sinĈ/c"), r: L("still the same rule, just turned upside down", "steeds dieselfde reël, net onderstebo") },
        { s: L("One multiply gives sinÂ, then shift-sin gives Â", "Een vermenigvuldiging gee sinÂ, dan gee SHIFT sin vir jou Â"), r: L("with the sine underneath you would flip first, which is where marks go", "met die sin onder sou jy eers moes omdraai, en daar gaan punte verlore") },
      ] }),

  /* when is it ambiguous? */
  ambiguousWhen: () => mc("ambiguousCase",
    L("The ambiguous case (two possible triangles) can only happen when…", "Die dubbelsinnige geval (twee moontlike driehoeke) kan net gebeur as…"),
    L("you use the sine rule with two sides and a non-included angle", "jy die sinusreël gebruik met twee sye en 'n nie-ingeslote hoek"),
    [L("you use the cosine rule", "jy die cosinusreël gebruik"), L("you know all three angles", "jy al drie hoeke ken"), L("you use the area rule", "jy die oppervlakreël gebruik")],
    { hint: L("Only the sine rule, and only with SSA (two sides + a non-included angle).", "Net die sinusreël, en net met SSH (twee sye + 'n nie-ingeslote hoek)."),
      answerLabel: L("Ambiguous case = sine rule + SSA. The cosine rule always gives a single answer.", "Dubbelsinnige geval = sinusreël + SSH. Die cosinusreël gee altyd net een antwoord."),
      solution: [
        { s: L("sinθ has the same value at θ and at 180° − θ", "sinθ het dieselfde waarde by θ en by 180° − θ"), r: L("that is where the second triangle comes from", "daar kom die tweede driehoek vandaan") },
        { s: L("So a sine-rule answer always has an obtuse partner you have to test", "Dus het 'n sinusreël-antwoord altyd 'n stomp maat wat jy moet toets") },
        { s: L("cos does NOT do this — a cosine-rule angle comes out negative when it is obtuse", "cos doen dit NIE: by die cosinusreël kom cos negatief uit as die hoek stomp is"), r: L("so the cosine rule gives one answer only", "dus gee die cosinusreël net een antwoord") },
      ] }),
};

export const questT3 = {
  id: "t3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id, concept: (id === "ambiguousCount" || id === "ambiguousBoth" || id === "obtusePartner" || id === "ambiguousWhen") ? "ambiguousCase" : NOTE, gen,
  })),
};
