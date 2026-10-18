/* ============================================================
   TRIG QUEST 5 · Cosine rule — finding an ANGLE   ★ DIAGRAM
   All three sides (SSS) → any angle, acute or obtuse.
   cosÂ = (b² + c² − a²) / (2bc)   (not on the formula sheet!)
   ============================================================ */
import { mc } from "./_shared.js";
import { placeTri, cosineAngleSetupStep, calcStep } from "./_trig.js";
import { cosineRuleAngle, ang, fix, randInt, pick } from "../triglib.js";
import { L } from "../lang.js";

const ACC = "#0284c7";
const NOTE = "cosineRuleAngle";

/* ------------------------------------------------------------
   AUDIT DAY 2026-08-30 — both full calculations are STEP CHAINS now
   (build the rearranged rule → cos θ → θ), the round-2 treatment
   widened to the chapter. Question, diagram and numbers unchanged;
   MCs untouched.
   ------------------------------------------------------------ */

/* All three sides DISTINCT since the audit day — they are chips on the
   build step, and "which side is subtracted" only teaches when the
   three chips can be told apart. */
function genSSS() {
  let a, b, c;
  do { a = randInt(7, 16); b = randInt(7, 16); c = randInt(7, 16); }
  while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1 || a === b || a === c || b === c);
  return { a, b, c };
}

const SKILLS = {
  /* find a chosen angle from all three sides */
  findAngle: () => {
    const { a, b, c } = genSSS();
    const t = placeTri({ sides: { a, b, c } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-22, 22));
    const target = pick([L("A", "A"), L("B", "B"), L("C", "C")]);
    const opp = { A: a, B: b, C: c }[target];                 // side opposite the wanted angle
    const others = { A: [b, c], B: [a, c], C: [a, b] }[target];
    const val = cosineRuleAngle(opp, others[0], others[1]);
    const cosVal = (others[0] ** 2 + others[1] ** 2 - opp ** 2) / (2 * others[0] * others[1]);
    return {
      type: "steps", concept: NOTE,
      prompt: L(`Use the cosine rule to find <b>θ</b> (the angle at ${t.L(target)}), correct to 1 decimal.`, `Gebruik die cosinusreël om <b>θ</b> (die hoek by ${t.L(target)}) te vind, korrek tot 1 desimaal.`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle(target, "θ")],
        sides: [t.side(L("B", "B"), L("C", "C"), String(a)), t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c))] },
      steps: [
        cosineAngleSetupStep("θ", String(opp), String(others[0]), String(others[1]),
          L("The side OPPOSITE θ is the one subtracted on top; the two sides beside θ do everything else.", "Die sy TEENOOR θ word bo afgetrek; die twee sye langs θ doen al die res.")),
        calcStep(L("Work out the value of <b>cos θ</b> (4 decimals).", "Bereken die waarde van <b>cos θ</b> (4 desimale)."), cosVal,
          L(`cos θ = (${others[0]}² + ${others[1]}² − ${opp}²) ÷ (2 × ${others[0]} × ${others[1]}). A minus answer is allowed here.`, `cos θ = (${others[0]}² + ${others[1]}² − ${opp}²) ÷ (2 × ${others[0]} × ${others[1]}). 'n Negatiewe antwoord mag hier.`),
          { dp: 4, tol: 0.0015, allowNeg: true }),
        calcStep(L("Now find <b>θ</b> (1 decimal).", "Vind nou <b>θ</b> (1 desimaal)."), val,
          L("SHIFT cos that value and you have θ. If cos θ came out negative, θ is obtuse all by itself.", "Doen SHIFT cos op daardie waarde, en jy het θ. As cos θ negatief was, is θ vanself stomp."),
          { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: val, dp: 1, tol: 0.1,   // accept the neighbouring tenth from 4-dp cosine working
      hint: L("The side opposite θ is the one that gets subtracted: cosθ = (sum of the squares of the other two − opposite²)/(2·those two).", "Die sy teenoor θ word afgetrek: cosθ = (ander twee se kwadrate saam − teenoorstaande²)/(2·daardie twee)."),
      answerLabel: L(`θ = ${ang(val)}`, `θ = ${ang(val)}`),
      solution: [
        { s: L(`cos θ = (${others[0]}² + ${others[1]}² − ${opp}²) / (2·${others[0]}·${others[1]})`, `cos θ = (${others[0]}² + ${others[1]}² − ${opp}²) / (2·${others[0]}·${others[1]})`), r: L("rearranged cosine rule", "herrangskikte cosinusreël") },
        { s: L(`cos θ = ${fix(cosVal, 4)}`, `cos θ = ${fix(cosVal, 4)}`) },
        { s: L(`θ = ${ang(val)}`, `θ = ${ang(val)}`), r: val > 90 ? L("obtuse (cos was negative)", "stomp (cos was negatief)") : L("acute", "skerp") },
      ],
    };
  },

  /* deliberately obtuse */
  obtuseAngle: () => {
    let a = 0, b = 0;
    do { a = randInt(7, 12); b = randInt(7, 12); } while (a === b);   // distinct chips
    const lo = Math.ceil(Math.sqrt(a * a + b * b)) + 1, hi = a + b - 1;
    const c = randInt(Math.min(lo, hi), hi);                  // c² > a² + b² → Ĉ obtuse (and c > a, b)
    const t = placeTri({ sides: { a, b, c } }, [L("A", "A"), L("B", "B"), L("C", "C")], randInt(-18, 18));
    const val = cosineRuleAngle(c, a, b);                     // Ĉ, opposite c
    const cosVal = (a * a + b * b - c * c) / (2 * a * b);
    return {
      type: "steps", concept: NOTE,
      prompt: L(`Find the <b>obtuse</b> angle θ (at ${t.L("C")}), correct to 1 decimal. The diagram is to scale.`, `Vind die <b>stomp</b> hoek θ (by ${t.L("C")}), korrek tot 1 desimaal. Die diagram is op skaal.`),
      graph: { type: "triangle", accent: ACC, pts: t.pts, poly: t.poly,
        angles: [t.angle(L("C", "C"), "θ")],
        sides: [t.side(L("B", "B"), L("C", "C"), String(a)), t.side(L("A", "A"), L("C", "C"), String(b)), t.side(L("A", "A"), L("B", "B"), String(c))] },
      steps: [
        cosineAngleSetupStep("θ", String(c), String(a), String(b),
          L("θ is opposite the LONGEST side — that side is the one subtracted on top.", "θ is teenoor die LANGSTE sy: daardie sy word bo afgetrek.")),
        calcStep(L("Work out the value of <b>cos θ</b> (4 decimals).", "Bereken die waarde van <b>cos θ</b> (4 desimale)."), cosVal,
          L(`cos θ = (${a}² + ${b}² − ${c}²) ÷ (2 × ${a} × ${b}). It comes out negative — that is the point.`, `cos θ = (${a}² + ${b}² − ${c}²) ÷ (2 × ${a} × ${b}). Dit kom negatief uit: dit is juis die punt.`),
          { dp: 4, tol: 0.0015, allowNeg: true }),
        calcStep(L("Now find <b>θ</b> (1 decimal).", "Vind nou <b>θ</b> (1 desimaal)."), val,
          L("SHIFT cos that negative value — the calculator hands you the obtuse angle directly.", "Doen SHIFT cos op daardie negatiewe waarde: die sakrekenaar gee jou dadelik die stomp hoek."),
          { dp: 1, tol: 0.1, unit: "°" }),
      ],
      expected: val, dp: 1, tol: 0.1,
      hint: L("θ is opposite the longest side. cosθ comes out negative — your calculator gives the obtuse angle directly.", "θ is teenoor die langste sy. cosθ kom negatief uit: jou sakrekenaar gee dadelik die stomp hoek."),
      answerLabel: L(`θ = ${ang(val)}`, `θ = ${ang(val)}`),
      solution: [
        { s: L(`cos θ = (${a}² + ${b}² − ${c}²) / (2·${a}·${b})`, `cos θ = (${a}² + ${b}² − ${c}²) / (2·${a}·${b})`) },
        { s: L(`cos θ = ${fix(cosVal, 4)}`, `cos θ = ${fix(cosVal, 4)}`), r: L("negative → obtuse", "negatief → stomp") },
        { s: L(`θ = ${ang(val)}`, `θ = ${ang(val)}`) },
      ],
    };
  },

  /* the rearranged formula */
  rearrange: () => mc(NOTE,
    L("Rearranged to find an angle, the cosine rule says cosÂ = …", "Herrangskik om 'n hoek te vind, sê die cosinusreël cosÂ = …"),
    L("(b² + c² − a²) / (2bc)", "(b² + c² − a²) / (2bc)"),
    [L("(a² + c² − b²) / (2ac)", "(a² + c² − b²) / (2ac)"), L("(b² + c² + a²) / (2bc)", "(b² + c² + a²) / (2bc)"), L("(a² − b² − c²) / (2bc)", "(a² − b² − c²) / (2bc)")],
    { hint: L("The side opposite the angle you want (a, opposite Â) is the one subtracted on top.", "Die sy teenoor die hoek wat jy soek (a, teenoor Â) word bo afgetrek."),
      answerLabel: L("cosÂ = (b² + c² − a²)/(2bc) — opposite side a² is subtracted; 2bc uses the two sides next to Â.", "cosÂ = (b² + c² − a²)/(2bc): die teenoorstaande sy a² word afgetrek; 2bc gebruik die twee sye langs Â."),
      solution: [
        { s: L("Start from the side version: a² = b² + c² − 2bc·cosÂ", "Begin by die sy-weergawe: a² = b² + c² − 2bc·cosÂ") },
        { s: L("Move the cos term across and a² back: 2bc·cosÂ = b² + c² − a²", "Skuif die cos-term oor en a² terug: 2bc·cosÂ = b² + c² − a²"), r: L("the only negative term left is a²", "die enigste negatiewe term wat oorbly, is a²") },
        { s: L("Divide both sides by 2bc: cosÂ = (b² + c² − a²)/(2bc)", "Deel albei kante deur 2bc: cosÂ = (b² + c² − a²)/(2bc)") },
      ] }),

  /* which side is subtracted */
  oppositeSubtracted: () => mc(NOTE,
    L("In cosÂ = (b² + c² − a²)/(2bc), which side is a (the one being subtracted)?", "In cosÂ = (b² + c² − a²)/(2bc), watter sy is a (die een wat afgetrek word)?"),
    L("the side opposite Â", "die sy teenoor Â"),
    [L("the longest side", "die langste sy"), L("either side next to Â", "enige sy langs Â"), L("the shortest side", "die kortste sy")],
    { hint: L("a is opposite Â — its “friend”.", "a is teenoor Â: sy “vriend”."),
      answerLabel: L("a is the side opposite the angle you are finding; b and c are the two sides next to it.", "a is die sy teenoor die hoek wat jy soek; b en c is die twee sye langs hom."),
      solution: [
        { s: L("The bottom is 2bc, and b and c are the two sides that MEET at Â", "Onder staan 2bc, en b en c is die twee sye wat by Â BYMEKAARKOM"), r: L("the arms of the angle", "die bene van die hoek") },
        { s: L("That leaves only one side unaccounted for — the one across from Â", "Dan bly net een sy oor: die een oorkant Â") },
        { s: L("So a, the side opposite Â, is the one being subtracted on top", "Dus is a, die sy teenoor Â, die een wat bo afgetrek word"), r: L("same “friends” pairing as the sine rule", "dieselfde “vriende”-paring as die sinusreël") },
      ] }),
};

export const questT5 = {
  id: "t5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: NOTE, gen })),
};
