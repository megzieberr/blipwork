/* ============================================================
   EXPONENTS & SURDS · Q8 — No-solution & equation strategy
   ------------------------------------------------------------
   Exponential equations (same-base, common-factor, trinomial,
   "positive base ≠ negative") and surd equations (isolate,
   square, ALWAYS test) — and every place a "no solution" hides.

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule).
   DICE-AUDIT §11 marked four skills CARE (sameBase, positiveBase,
   rejectK, surdIsolate): each was ONE fixed worked example on a very
   simple pattern. All four now roll their numbers and recompute both
   the answer text and the decoys. The wording, the mechanic and the
   misconception behind every wrong option are unchanged — e.g.
   surdIsolate's decoys are still "squared it anyway", "the root's own
   zero point" and "subtracted instead". whichMethod stays STATIC (a
   hand-authored 3-item worked-expression bank), and alwaysTest /
   surdDomain were CLEAN pure recall — all three are untouched.
   ============================================================ */
import { mc, ynQ, pick, randInt, upw, sgn } from "./_exp.js";
import { L } from "../lang.js";

const EXPQ = "expEqStrategy";
const SURDQ = "surdEq";

const SKILLS = {
  /* same-base strategy */
  sameBase: () => {
    const b = randInt(2, 6), n = randInt(2, 4), v = Math.pow(b, n);
    return mc(EXPQ,
      L(`To solve <b>${upw(b, "x")} = ${v}</b>, what is the plan?`, `Om <b>${upw(b, "x")} = ${v}</b> op te los, wat is die plan?`),
      L("Write both sides with the same base, then equate the exponents", "Skryf albei kante met dieselfde grondtal en stel dan die eksponente gelyk"),
      [L("Take the square root of both sides", "Trek die vierkantswortel van albei kante"), L("Divide both sides by x", "Deel albei kante deur x"), L(`Subtract ${v} from both sides`, `Trek ${v} van albei kante af`)],
      { hint: L("Make the “guns” (bases) the same; once they match, the bases fall away and the exponents are equal.", "Maak die “gewere” (grondtalle) dieselfde; sodra hulle ooreenstem, val die grondtalle weg en is die eksponente gelyk."),
        answerLabel: L(`${upw(b, "x")} = ${upw(b, n)} → equate the exponents → x = ${n}.`, `${upw(b, "x")} = ${upw(b, n)} → stel die eksponente gelyk → x = ${n}.`),
        solution: [
          { s: L(`Write ${v} as a power of the same base: ${v} = ${upw(b, n)}`, `Skryf ${v} as 'n mag van dieselfde grondtal: ${v} = ${upw(b, n)}`), r: L("prime factors first", "eers priemfaktore") },
          { s: L(`Now it reads ${upw(b, "x")} = ${upw(b, n)} — the guns are equal, so they shoot each other`, `Nou lees dit ${upw(b, "x")} = ${upw(b, n)}: die gewere is gelyk, dus skiet hulle mekaar`) },
          { s: L(`The helmets fall to the ground: x = ${n}`, `Die helms val op die grond: x = ${n}`), r: L("same bases → equate the exponents", "dieselfde grondtalle → stel die eksponente gelyk") },
        ] });
  },

  /* positive base can't be negative.  Decoys are the same three the
     fixed items used: the exponent you get if you ignore the minus, its
     negative, and one more. */
  positiveBase: () => {
    const b = randInt(2, 6), n = randInt(2, 4), v = Math.pow(b, n);
    return mc(EXPQ, L(`Solve <b>${upw(b, "x")} = −${v}</b>.`, `Los <b>${upw(b, "x")} = −${v}</b> op.`), L("No solution", "Geen oplossing"),
      [L(`x = ${n}`, `x = ${n}`), L(`x = −${n}`, `x = −${n}`), L(`x = ${n + 1}`, `x = ${n + 1}`)],
      { hint: L("What values can a positive base raised to a power take? Can it ever be negative?", "Watter waardes kan 'n positiewe grondtal tot 'n mag verhef aanneem? Kan dit ooit negatief wees?"),
        answerLabel: L(`No solution — a positive base (${upw(b, "x")}) is always positive, so it can never equal −${v}.`, `Geen oplossing: 'n positiewe grondtal (${upw(b, "x")}) is altyd positief, dus kan dit nooit gelyk wees aan −${v} nie.`),
        solution: [
          { s: L(`Look at the left side on its own: ${b} is a positive base`, `Kyk na die linkerkant op sy eie: ${b} is 'n positiewe grondtal`) },
          { s: L(`A positive base gives a positive answer for EVERY x — a big x makes it huge, a negative x makes it a small fraction, but it never turns negative`, `'n Positiewe grondtal gee 'n positiewe antwoord vir ELKE x: 'n groot x maak dit reusagtig, 'n negatiewe x maak dit 'n klein breuk, maar dit word nooit negatief nie`) },
          { s: L(`${upw(b, "x")} ≠ −${v} ∴ no solution`, `${upw(b, "x")} ≠ −${v} ∴ geen oplossing`), r: L("her word for this one: no solution — not undefined, not non-real", "haar woord hiervoor: geen oplossing, nie onbepaald of nie-reëel nie") },
        ] });
  },

  /* method for multi-term exponential */
  whichMethod: () => {
    const items = [
      { e: L("2ˣ⁺¹ + 2ˣ = 192", "2ˣ⁺¹ + 2ˣ = 192"), correct: L("Common factor (take out 2ˣ)", "Gemene faktor (haal 2ˣ uit)"), wrongs: [L("Difference of squares", "Verskil van twee vierkante"), L("Equate the exponents directly", "Stel die eksponente dadelik gelyk"), L("Square both sides", "Kwadreer albei kante")], ans: L("Both terms contain 2ˣ → 2ˣ(2 + 1) = 192.", "Albei terme bevat 2ˣ → 2ˣ(2 + 1) = 192."),
        sol: [{ s: L("There is a + between the terms, so no law fires yet — it has to be factorised", "Daar is 'n + tussen die terme, dus tree nog geen wet in nie: dit moet gefaktoriseer word") },
              { s: L("Divorce the first power: 2ˣ⁺¹ = 2ˣ·2¹", "Skei die eerste mag: 2ˣ⁺¹ = 2ˣ·2¹"), r: L("split x^(a+b) into xᵃ·xᵇ", "breek x^(a+b) op in xᵃ·xᵇ") },
              { s: L("Both terms now carry 2ˣ, so take it out: 2ˣ(2 + 1) = 192", "Albei terme dra nou 2ˣ, dus haal dit uit: 2ˣ(2 + 1) = 192"), r: L("common factor — always the base with the variable exponent", "gemene faktor: altyd die grondtal met die veranderlike eksponent") }] },
      { e: L("3²ˣ + 6·3ˣ − 27 = 0", "3²ˣ + 6·3ˣ − 27 = 0"), correct: L("Let K = 3ˣ (trinomial)", "Stel K = 3ˣ (drieterm)"), wrongs: [L("Common factor of 27", "Gemene faktor van 27"), L("Equate the exponents directly", "Stel die eksponente dadelik gelyk"), L("Square both sides", "Kwadreer albei kante")], ans: L("Three terms in 3ˣ → let K = 3ˣ → K² + 6K − 27 = 0.", "Drie terme in 3ˣ → stel K = 3ˣ → K² + 6K − 27 = 0."),
        sol: [{ s: L("Count the terms: three of them, and 3²ˣ is the square of 3ˣ", "Tel die terme: daar is drie, en 3²ˣ is die kwadraat van 3ˣ") },
              { s: L("That is the K², K, constant shape — so let K = 3ˣ", "Dit is die vorm K², K, konstante, dus stel K = 3ˣ") },
              { s: L("It becomes K² + 6K − 27 = 0, an ordinary trinomial", "Dit word K² + 6K − 27 = 0, 'n gewone drieterm"), r: L("factorise it, then always substitute back to x", "faktoriseer dit, en vervang dan altyd terug na x") }] },
      { e: L("2²ˣ⁺² − 5·2ˣ + 1 = 0", "2²ˣ⁺² − 5·2ˣ + 1 = 0"), correct: L("Let K = 2ˣ (trinomial)", "Stel K = 2ˣ (drieterm)"), wrongs: [L("Common factor of 1", "Gemene faktor van 1"), L("Equate the exponents directly", "Stel die eksponente dadelik gelyk"), L("Difference of squares", "Verskil van twee vierkante")], ans: L("Rewrite as 4·2²ˣ − 5·2ˣ + 1; let K = 2ˣ → 4K² − 5K + 1 = 0.", "Herskryf as 4·2²ˣ − 5·2ˣ + 1; stel K = 2ˣ → 4K² − 5K + 1 = 0."),
        sol: [{ s: L("Divorce the + 2 out of the exponent first: 2²ˣ⁺² = 2²ˣ·2² = 4·2²ˣ", "Skei eers die + 2 uit die eksponent: 2²ˣ⁺² = 2²ˣ·2² = 4·2²ˣ") },
              { s: L("The three terms are now 4·2²ˣ − 5·2ˣ + 1, and 2²ˣ is the square of 2ˣ", "Die drie terme is nou 4·2²ˣ − 5·2ˣ + 1, en 2²ˣ is die kwadraat van 2ˣ") },
              { s: L("let K = 2ˣ → 4K² − 5K + 1 = 0", "stel K = 2ˣ → 4K² − 5K + 1 = 0"), r: L("a trinomial in K, then substitute back", "'n drieterm in K, vervang dan terug") }] },
    ];
    const it = pick(items);
    return mc(EXPQ, L(`Which method solves <b>${it.e}</b>?`, `Watter metode los <b>${it.e}</b> op?`), it.correct, it.wrongs,
      { hint: L("A + or − between terms means factorise: common factor (shared power) or trinomial (let K = baseˣ).", "'n + of − tussen terme beteken faktoriseer: gemene faktor (gedeelde mag) of drieterm (stel K = grondtalˣ)."), answerLabel: it.ans, solution: it.sol });
  },

  /* reject a negative k */
  rejectK: () => {
    const b = randInt(2, 5);
    let r, s;
    do { r = randInt(2, 9); s = randInt(2, 9); } while (r === s);
    return ynQ(EXPQ,
      L(`Solving a trinomial gives <b>k = ${r}</b> or <b>k = −${s}</b>, where k = ${upw(b, "x")}. Both give a value of x. True or false?`, `Jy los 'n drieterm op en kry <b>k = ${r}</b> of <b>k = −${s}</b>, waar k = ${upw(b, "x")}. Albei gee 'n waarde vir x. Waar of onwaar?`),
      false,
      { hint: L(`Can ${upw(b, "x")} equal a negative number?`, `Kan ${upw(b, "x")} gelyk wees aan 'n negatiewe getal?`),
        answerLabel: L(`False — ${upw(b, "x")} is always positive, so k = −${s} is rejected. Only ${upw(b, "x")} = ${r} gives a solution.`, `Onwaar: ${upw(b, "x")} is altyd positief, dus word k = −${s} verwerp. Net ${upw(b, "x")} = ${r} gee 'n oplossing.`),
        solution: [
          { s: L(`Substitute back — stopping at k loses the mark. The two branches read ${upw(b, "x")} = ${r} and ${upw(b, "x")} = −${s}`, `Vervang terug: as jy by k stop, verloor jy die punt. Die twee gevalle lees ${upw(b, "x")} = ${r} en ${upw(b, "x")} = −${s}`) },
          { s: L(`${b} is a positive base, so ${upw(b, "x")} can never come out negative`, `${b} is 'n positiewe grondtal, dus kan ${upw(b, "x")} nooit negatief uitkom nie`), r: L(`${upw(b, "x")} ≠ −${s} ∴ no solution on that branch`, `${upw(b, "x")} ≠ −${s} ∴ geen oplossing in daardie geval nie`) },
          { s: L(`∴ false — only ${upw(b, "x")} = ${r} survives`, `∴ onwaar: net ${upw(b, "x")} = ${r} bly oor`) },
        ] });
  },

  /* surd: isolate first → no solution */
  surdIsolate: () => {
    const c = randInt(1, 9), d = randInt(2, 9);
    return mc(SURDQ,
      L(`Solve <b>√(x − ${c}) + ${d} = 0</b>. What happens?`, `Los <b>√(x − ${c}) + ${d} = 0</b> op. Wat gebeur?`),
      L(`Isolate the root → √(x − ${c}) = −${d} → no solution (a root can’t be negative)`, `Isoleer die wortel → √(x − ${c}) = −${d} → geen oplossing ('n wortel kan nie negatief wees nie)`),
      [L(`Square both sides to get x − ${c} = ${d * d}, so x = ${c + d * d}`, `Kwadreer albei kante en kry x − ${c} = ${d * d}, dus x = ${c + d * d}`), L(`x = ${c}`, `x = ${c}`), L(`x = ${sgn(c - d * d)}`, `x = ${sgn(c - d * d)}`)],
      { hint: L("Get the root alone first, then look at the sign on the other side.", "Kry eers die wortel alleen, kyk dan na die teken aan die ander kant."),
        answerLabel: L(`√(x − ${c}) = −${d} is impossible (a square root is never negative) → no solution.`, `√(x − ${c}) = −${d} is onmoontlik ('n vierkantswortel is nooit negatief nie) → geen oplossing.`),
        solution: [
          { s: L(`Isolate the root first — always: √(x − ${c}) = −${d}`, `Isoleer eers die wortel, altyd: √(x − ${c}) = −${d}`) },
          { s: L("Now look at the sign BEFORE squaring anything: a square-root sign never gives a negative answer", "Kyk nou na die teken VOORDAT jy iets kwadreer: 'n vierkantswortelteken gee nooit 'n negatiewe antwoord nie") },
          { s: L("∴ no solution", "∴ geen oplossing"), r: L("square first and you get a false answer that the test then has to throw out", "kwadreer eerste en jy kry 'n vals antwoord wat die toets dan moet uitgooi") },
        ] });
  },

  /* always test */
  alwaysTest: () => mc(SURDQ,
    L("After squaring both sides of a surd equation, what must you <b>always</b> do?", "Wat moet jy <b>altyd</b> doen nadat jy albei kante van 'n wortelvormvergelyking gekwadreer het?"),
    L("Test every answer in the original equation and reject the extraneous ones", "Toets elke antwoord in die oorspronklike vergelyking en verwerp die vals antwoorde"),
    [L("Square the answers again", "Kwadreer die antwoorde weer"), L("Add the two answers together", "Tel die twee antwoorde bymekaar"), L("Take the square root of the answers", "Trek die vierkantswortel van die antwoorde")],
    { hint: L("Squaring can introduce answers that don’t actually fit the original.", "Kwadrering kan antwoorde inbring wat nie eintlik in die oorspronklike pas nie."),
      answerLabel: L("Always substitute back into the original — squaring can create extraneous (false) answers.", "Vervang altyd terug in die oorspronklike: kwadrering kan vals antwoorde skep."),
      solution: [
        { s: L("Squaring hides signs: 3 ≠ −3, but 3² = (−3)²", "Kwadrering versteek tekens: 3 ≠ −3, maar 3² = (−3)²"), r: L("so a squared equation can pick up answers the original never had", "dus kan 'n gekwadreerde vergelyking antwoorde optel wat die oorspronklike nooit gehad het nie") },
        { s: L("Put each answer back into the ORIGINAL equation and work out both sides", "Sit elke antwoord terug in die OORSPRONKLIKE vergelyking en werk albei kante uit") },
        { s: L("Join them with = if it checks, and mark the failing one N.A. with a struck ≠", "Verbind hulle met = as dit klop, en merk die een wat misluk n.v.t. met 'n deurgestreepte ≠"), r: L("her words: ALWAYS test both answers!! — it is a marked step, not an optional check", "haar woorde: toets ALTYD albei antwoorde!! Dit is 'n stap wat punte kry, nie 'n opsionele kontrole nie") },
      ] }),

  /* domain of √x */
  surdDomain: () => mc(SURDQ,
    L("For what values of x is <b>√x</b> a real number?", "Vir watter waardes van x is <b>√x</b> 'n reële getal?"),
    L("x ≥ 0", "x ≥ 0"),
    [L("x &gt; 0 only", "net x &gt; 0"), L("x ≤ 0", "x ≤ 0"), L("all real x", "alle reële x")],
    { hint: L("You can take the square root of 0 and of positives, but not of negatives.", "Jy kan die vierkantswortel van 0 en van positiewe getalle trek, maar nie van negatiewe getalle nie."),
      answerLabel: L("√x is real for x ≥ 0 (including 0); a negative inside an even root is non-real.", "√x is reëel vir x ≥ 0 (0 ingesluit); 'n negatiewe getal binne 'n ewe wortel is nie-reëel."),
      solution: [
        { s: L("√x asks for the number that squares back to x", "√x vra vir die getal wat gekwadreer weer x gee") },
        { s: L("Squaring any real number gives 0 or a positive, so a negative x has no real root", "Enige reële getal gekwadreer gee 0 of 'n positiewe getal, dus het 'n negatiewe x geen reële wortel nie"), r: L("non-real", "nie-reëel") },
        { s: L("x = 0 works, because √0 = 0", "x = 0 werk, want √0 = 0"), r: L("∴ x ≥ 0, with the 0 included — not x > 0", "∴ x ≥ 0, met die 0 ingesluit, nie x > 0 nie") },
      ] }),
};

export const questEs8 = {
  id: "es8",
  skills: [
    { id: "sameBase", concept: EXPQ, gen: SKILLS.sameBase },
    { id: "positiveBase", concept: EXPQ, gen: SKILLS.positiveBase },
    { id: "whichMethod", concept: EXPQ, gen: SKILLS.whichMethod },
    { id: "rejectK", concept: EXPQ, gen: SKILLS.rejectK },
    { id: "surdIsolate", concept: SURDQ, gen: SKILLS.surdIsolate },
    { id: "alwaysTest", concept: SURDQ, gen: SKILLS.alwaysTest },
    { id: "surdDomain", concept: SURDQ, gen: SKILLS.surdDomain },
  ],
};
