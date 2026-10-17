/* ============================================================
   EXPONENTS & SURDS · Q5 — Surd laws & traps
   ------------------------------------------------------------
   Same-root × and ÷, the BIG NO-NO (√a + √b ≠ √(a+b)), like
   surds, the inside/outside fraction rule, and the sign rules
   (non-real even roots, ± two answers).

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule):
   the three CARE skills of DICE-AUDIT §11 (likeSurds, insideOutside,
   twoAnswers) now roll their numbers instead of picking between two
   or three fixed instances. Wording, mechanic and every decoy FAMILY
   are unchanged — each wrong option is still the same misconception,
   recomputed from the same roll (added the insides, multiplied the
   coefficients, added the root indices, forgot the ±, …).
   multiplyDivide / bigNoNo / signRules were CLEAN (fully symbolic)
   and are untouched.
   ============================================================ */
import { mc, ynQ, pick, shuffled, randInt, usup, upw } from "./_exp.js";
import { L } from "../lang.js";

const LAW = "surdLaws";
const SIGN = "surdSigns";
const VARS = [L("x", "x"), L("y", "y"), L("a", "a"), L("m", "m")];

const SKILLS = {
  /* multiply / divide same root */
  multiplyDivide: () => {
    const items = [
      { q: L("Simplify <b>√a · √b</b> (same root; a, b ≥ 0).", "Vereenvoudig <b>√a · √b</b> (dieselfde wortel; a, b ≥ 0)."), correct: L("√(ab)", "√(ab)"), wrongs: [L("√(a+b)", "√(a+b)"), L("ab", "ab"), L("√a + √b", "√a + √b")], ans: L("Same root: multiply the insides — √a·√b = √(ab).", "Dieselfde wortel, dus vermenigvuldig die dele binne-in: √a·√b = √(ab)."),
        sol: [{ s: L("Surd law ①: × and ÷ may go under the SAME root", "Wortelvormwet ①: × en ÷ mag onder DIESELFDE wortel gaan") },
              { s: L("√a · √b = √(a × b) = √(ab)", "√a · √b = √(a × b) = √(ab)") },
              { s: L("Check it on numbers: √4 · √9 = 2 × 3 = 6, and √36 = 6", "Toets dit met getalle: √4 · √9 = 2 × 3 = 6, en √36 = 6"), r: L("the root sign does not disappear — the answer is still a surd", "die wortelteken verdwyn nie: die antwoord is steeds 'n wortelvorm") }] },
      { q: L("Simplify <b>√a ÷ √b</b> (same root; a ≥ 0, b &gt; 0).", "Vereenvoudig <b>√a ÷ √b</b> (dieselfde wortel; a ≥ 0, b &gt; 0)."), correct: L("√(a/b)", "√(a/b)"), wrongs: [L("√(a−b)", "√(a−b)"), L("a/b", "a/b"), L("√a − √b", "√a − √b")], ans: L("Same root: divide the insides — √a ÷ √b = √(a/b).", "Dieselfde wortel, dus deel die dele binne-in: √a ÷ √b = √(a/b)."),
        sol: [{ s: L("Surd law ①: × and ÷ may go under the SAME root", "Wortelvormwet ①: × en ÷ mag onder DIESELFDE wortel gaan") },
              { s: L("√a ÷ √b = √(a ÷ b) = √(a/b)", "√a ÷ √b = √(a ÷ b) = √(a/b)") },
              { s: L("Check it on numbers: √36 ÷ √4 = 6 ÷ 2 = 3, and √9 = 3", "Toets dit met getalle: √36 ÷ √4 = 6 ÷ 2 = 3, en √9 = 3"), r: L("the root stays — this is not a/b", "die wortel bly: dit is nie a/b nie") }] },
    ];
    const it = pick(items);
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: L("Same root → you may combine the insides under one root for × and ÷.", "Dieselfde wortel → by × en ÷ mag jy die dele binne-in onder een wortel saamvoeg."), answerLabel: it.ans, solution: it.sol });
  },

  /* the BIG NO-NO */
  bigNoNo: () => ynQ(LAW,
    L("Is this correct?<br><b>√a + √b = √(a + b)</b>", "Is dit korrek?<br><b>√a + √b = √(a + b)</b>"),
    false,
    { hint: L("Try numbers: √9 + √16 = 3 + 4 = 7, but √25 = 5.", "Probeer getalle: √9 + √16 = 3 + 4 = 7, maar √25 = 5."),
      answerLabel: L("No — the BIG NO-NO. You can never add the insides of two surds. √a + √b stays as it is.", "Nee: die GROOT NEE-NEE. Jy kan nooit die dele binne-in twee wortelvorme optel nie. √a + √b bly soos dit is."),
      solution: [
        { s: L("Test it with numbers you can work out: let a = 9 and b = 16", "Toets dit met getalle wat jy kan uitwerk: stel a = 9 en b = 16") },
        { s: L("√9 + √16 = 3 + 4 = 7, but √(9 + 16) = √25 = 5", "√9 + √16 = 3 + 4 = 7, maar √(9 + 16) = √25 = 5"), r: L("7 ≠ 5, so the statement is false", "7 ≠ 5, dus is die bewering onwaar") },
        { s: L("Surds combine under one root for × and ÷ only, never for + or −", "Wortelvorme kom net by × en ÷ onder een wortel saam, nooit by + of − nie"), r: L("her BIG NO-NO — √a + √b just stays as it is", "haar GROOT NEE-NEE: √a + √b bly net soos dit is") },
      ] }),

  /* like surds add */
  likeSurds: () => {
    const items = [
      /* a√v − b√v.  Guards: b ≥ 2 so the QUESTION never reads "1√v", and
         a − b ≥ 2 so the ANSWER never does either (PNG review, 2026-08-23:
         a roll of 8√a − 1√a is bad maths writing even though it is true). */
      () => {
        const v = pick(VARS);
        let a, b;
        do { a = randInt(4, 9); b = randInt(2, 6); } while (a - b < 2);
        return {
          q: L(`Simplify <b>${a}√${v} − ${b}√${v}</b>.`, `Vereenvoudig <b>${a}√${v} − ${b}√${v}</b>.`), correct: `${a - b}√${v}`,
          wrongs: [`${a - b}√(2${v})`, `${a + b}√${v}`, `${a - b}${v}`],
          ans: L(`Like surds add like terms: ${a}√${v} − ${b}√${v} = ${a - b}√${v}.`, `Gelyksoortige wortelvorme tel op soos gelyksoortige terme: ${a}√${v} − ${b}√${v} = ${a - b}√${v}.`),
          sol: [
            { s: L(`Both terms carry the same surd, √${v}`, `Albei terme dra dieselfde wortelvorm, √${v}`), r: L("surd law ②: + and − need the same root AND the same inside", "wortelvormwet ②: + en − het dieselfde wortel EN dieselfde getal binne-in nodig") },
            { s: L(`So only the numbers in front change: ${a} − ${b} = ${a - b}`, `Dus verander net die getalle voor: ${a} − ${b} = ${a - b}`) },
            { s: `∴ ${a - b}√${v}`, r: L(`the √${v} is carried through untouched — it never becomes ${v} or √(2${v})`, `die √${v} gaan onaangeraak deur: dit word nooit ${v} of √(2${v}) nie`) },
          ],
        };
      },
      /* √v + √v — the "just like x + x = 2x" case, so the coefficients
         stay 1 (that IS the teaching point); only the letter rolls. */
      () => {
        const v = pick(VARS);
        return {
          q: L(`Simplify <b>√${v} + √${v}</b>.`, `Vereenvoudig <b>√${v} + √${v}</b>.`), correct: `2√${v}`,
          wrongs: [`√(2${v})`, `2${v}`, `√${v}²`],
          ans: L(`Two of the same surd: √${v} + √${v} = 2√${v} (just like ${v} + ${v} = 2${v}).`, `Twee van dieselfde wortelvorm: √${v} + √${v} = 2√${v} (net soos ${v} + ${v} = 2${v}).`),
          sol: [
            { s: L(`Write the invisible coefficients in: 1√${v} + 1√${v}`, `Skryf die onsigbare koëffisiënte in: 1√${v} + 1√${v}`), r: L("keeping the 1 visible is the scaffold", "om die 1 sigbaar te hou, is die steierwerk") },
            { s: L(`Same root and same inside, so only the front numbers add: 1 + 1 = 2`, `Dieselfde wortel en dieselfde getal binne-in, dus tel net die getalle voor op: 1 + 1 = 2`) },
            { s: `∴ 2√${v}`, r: L(`exactly like ${v} + ${v} = 2${v} — the inside never doubles`, `presies soos ${v} + ${v} = 2${v}: die getal binne-in verdubbel nooit nie`) },
          ],
        };
      },
      /* a·ⁿ√r + b·ⁿ√r.  Guard a·b ≠ a+b so the "multiplied the
         coefficients" decoy can never equal the correct answer. */
      () => {
        let a, b;
        do { a = randInt(2, 6); b = randInt(2, 6); } while (a * b === a + b);
        const n = pick([3, 4]), r = randInt(2, 7);
        return {
          q: L(`Simplify <b>${a}·${usup(n)}√${r} + ${b}·${usup(n)}√${r}</b>.`, `Vereenvoudig <b>${a}·${usup(n)}√${r} + ${b}·${usup(n)}√${r}</b>.`), correct: `${a + b}·${usup(n)}√${r}`,
          wrongs: [`${a + b}·${usup(n)}√${2 * r}`, `${a * b}·${usup(n)}√${r}`, `${a + b}·${usup(2 * n)}√${r}`],
          ans: L(`Same surd (${usup(n)}√${r}), so add the coefficients: ${a} + ${b} = ${a + b} → ${a + b}·${usup(n)}√${r}.`, `Dieselfde wortelvorm (${usup(n)}√${r}), dus tel die koëffisiënte op: ${a} + ${b} = ${a + b} → ${a + b}·${usup(n)}√${r}.`),
          sol: [
            { s: L(`Both terms are the same surd, ${usup(n)}√${r} — same root index ${n}, same inside ${r}`, `Albei terme is dieselfde wortelvorm, ${usup(n)}√${r}: dieselfde wortelindeks ${n}, dieselfde getal binne-in ${r}`), r: L("so they are like terms", "dus is hulle gelyksoortige terme") },
            { s: L(`Add only the numbers in front: ${a} + ${b} = ${a + b}`, `Tel net die getalle voor op: ${a} + ${b} = ${a + b}`) },
            { s: `∴ ${a + b}·${usup(n)}√${r}`, r: L(`the inside stays ${r} and the root stays ${n} — neither of them adds`, `die getal binne-in bly ${r} en die wortel bly ${n}: nie een van hulle tel op nie`) },
          ],
        };
      },
    ];
    const it = pick(items)();
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: L("Only surds with the SAME root and SAME inside can be added — combine the numbers in front.", "Net wortelvorme met DIESELFDE wortel en DIESELFDE getal binne-in kan opgetel word: tel die getalle voor op."), answerLabel: it.ans, solution: it.sol });
  },

  /* inside power → top, root → bottom */
  insideOutside: () => {
    /* the generic (rule-recall) item — unchanged, it was already CLEAN */
    const generic = () => ({
      q: L("Where does the <b>inside power</b> go when you write ⁿ√(xᵃ) = x^(?/?)?", "Waarheen gaan die <b>binnemag</b> as jy ⁿ√(xᵃ) = x^(?/?) skryf?"), correct: L("On the top (numerator)", "Bo (teller)"),
      wrongs: [L("On the bottom (denominator)", "Onder (noemer)"), L("It disappears", "Dit verdwyn"), L("It stays inside", "Dit bly binne-in")],
      ans: L("Inside power → top; root index → bottom: ⁿ√(xᵃ) = x^(a/n).", "Binnemag → bo; wortelindeks → onder: ⁿ√(xᵃ) = x^(a/n)."),
      sol: [
        { s: L("Her conversion hook: inside √ = top of the fraction; outside √ = bottom of the fraction", "Haar omskakeltruuk: binne √ = bo in die breuk; buite √ = onder in die breuk") },
        { s: L("The a is written inside the root, so it goes on top", "Die a staan binne die wortel, dus gaan dit bo") },
        { s: L("∴ ⁿ√(xᵃ) = x^(a/n)", "∴ ⁿ√(xᵃ) = x^(a/n)"), r: L("check it on √(x²) = x^(2/2) = x", "toets dit op √(x²) = x^(2/2) = x") },
      ],
    });
    /* ONE template now covers both concrete items (√(x⁴) and ³√(y⁶)):
       index n ∈ {2,3}, inside power a = n·k so the answer is exact.
       Decoys are the three mistakes the fixed items used — forgot the
       root (xᵃ), multiplied instead of divided (x^(a·n)), added (x^(a+n)).
       k ≥ 2 and n ≥ 2 keep all four labels distinct. */
    const powerItem = () => {
      const v = pick(VARS), n = pick([2, 3]), k = randInt(2, 4), a = n * k;
      const idx = n === 2 ? "" : usup(n);
      return {
        q: L(`Simplify <b>${idx}√(${upw(v, a)})</b>.`, `Vereenvoudig <b>${idx}√(${upw(v, a)})</b>.`), correct: upw(v, k),
        wrongs: [upw(v, a), upw(v, a * n), upw(v, a + n)],
        ans: `${idx}√(${upw(v, a)}) = ${v}^(${a}/${n}) = ${upw(v, k)}.`,
        sol: [
          { s: L(`Turn the root into a fractional exponent: inside power on top, root index underneath`, `Maak van die wortel 'n breukeksponent: binnemag bo, wortelindeks onder`) },
          { s: `${idx}√(${upw(v, a)}) = ${v}^(${a}/${n})`, r: L(`the root here is ${n}`, `die wortel hier is ${n}`) },
          { s: L(`${a} ÷ ${n} = ${k}, so the answer is ${upw(v, k)}`, `${a} ÷ ${n} = ${k}, dus is die antwoord ${upw(v, k)}`), r: L("divide the exponents — never multiply or add them", "deel die eksponente: moet hulle nooit vermenigvuldig of optel nie") },
        ],
      };
    };
    /* the generic item stays 1-in-3, exactly as in the fixed 3-item bank */
    const it = pick([generic, powerItem, powerItem])();
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: L("Inside the root → on top of the fraction; the root index → on the bottom.", "Binne die wortel → bo in die breuk; die wortelindeks → onder."), answerLabel: it.ans, solution: it.sol });
  },

  /* sign / non-real */
  signRules: () => {
    const items = [
      { q: L("A <b>negative</b> number is raised to an <b>even</b> power (e.g. (−5)²). The result is:", "'n <b>Negatiewe</b> getal word tot 'n <b>ewe</b> mag verhef (bv. (−5)²). Die resultaat is:"), correct: L("Positive", "Positief"), wrongs: [L("Negative", "Negatief"), L("Zero", "Nul"), L("Non-real", "Nie-reëel")], ans: L("An even power of a negative is positive: (−5)² = 25.", "'n Ewe mag van 'n negatiewe getal is positief: (−5)² = 25."),
        sol: [{ s: L("Write it out: (−5)² = (−5)(−5)", "Skryf dit uit: (−5)² = (−5)(−5)") },
              { s: L("The two minuses pair up and cancel, giving +25", "Die twee minusse vorm 'n paar en kanselleer, en jy kry +25"), r: L("an even power means every minus finds a partner", "'n ewe mag beteken elke minus kry 'n maat") },
              { s: L("∴ positive", "∴ positief") }] },
      { q: L("A <b>negative</b> number is raised to an <b>odd</b> power (e.g. (−5)³). The result is:", "'n <b>Negatiewe</b> getal word tot 'n <b>onewe</b> mag verhef (bv. (−5)³). Die resultaat is:"), correct: L("Negative", "Negatief"), wrongs: [L("Positive", "Positief"), L("Zero", "Nul"), L("Non-real", "Nie-reëel")], ans: L("An odd power of a negative is negative: (−5)³ = −125.", "'n Onewe mag van 'n negatiewe getal is negatief: (−5)³ = −125."),
        sol: [{ s: L("Write it out: (−5)³ = (−5)(−5)(−5)", "Skryf dit uit: (−5)³ = (−5)(−5)(−5)") },
              { s: L("The first two minuses cancel to +25, and the last one is left over: 25 × (−5) = −125", "Die eerste twee minusse kanselleer tot +25, en die laaste een bly oor: 25 × (−5) = −125"), r: L("an odd power always leaves one minus without a partner", "'n onewe mag laat altyd een minus sonder 'n maat") },
              { s: L("∴ negative", "∴ negatief") }] },
      { q: L("What kind of value is <b>√(−4)</b> (an even root of a negative)?", "Watter soort waarde is <b>√(−4)</b> ('n ewe wortel van 'n negatiewe getal)?"), correct: L("Non-real", "Nie-reëel"), wrongs: [L("Positive", "Positief"), L("Negative", "Negatief"), L("Zero", "Nul")], ans: L("An even root of a negative number is non-real.", "'n Ewe wortel van 'n negatiewe getal is nie-reëel."),
        sol: [{ s: L("√(−4) asks: what number, squared, gives −4?", "√(−4) vra: watter getal, gekwadreer, gee −4?") },
              { s: L("2² = 4 and (−2)² = 4 — squaring kills the minus every time, so nothing real squares to a negative", "2² = 4 en (−2)² = 4: kwadrering vee die minus elke keer uit, dus gee geen reële getal gekwadreer 'n negatiewe getal nie") },
              { s: L("∴ non-real", "∴ nie-reëel"), r: L("her word for this one: non-real, not “no solution”", "haar woord hiervoor: nie-reëel, nie “geen oplossing” nie") }] },
      { q: L("What is <b>³√(−8)</b> (an odd root of a negative)?", "Wat is <b>³√(−8)</b> ('n onewe wortel van 'n negatiewe getal)?"), correct: L("−2 (real and negative)", "−2 (reëel en negatief)"), wrongs: [L("Non-real", "Nie-reëel"), "+2", "±2"], ans: L("An odd root of a negative is real and negative: ³√(−8) = −2.", "'n Onewe wortel van 'n negatiewe getal is reëel en negatief: ³√(−8) = −2."),
        sol: [{ s: L("³√(−8) asks: what number, cubed, gives −8?", "³√(−8) vra: watter getal, tot die derde mag verhef, gee −8?") },
              { s: "(−2)³ = (−2)(−2)(−2) = −8", r: L("an odd power keeps the minus, so an odd root is allowed to be negative", "'n onewe mag hou die minus, dus mag 'n onewe wortel negatief wees") },
              { s: L("∴ −2, which is real", "∴ −2, en dit is reëel"), r: L("this is where an odd root differs from an even one", "hier verskil 'n onewe wortel van 'n ewe een") }] },
    ];
    const it = pick(items);
    return mc(SIGN, it.q, it.correct, it.wrongs, { hint: L("Even power/root behaves differently from odd; even root of a negative is non-real.", "'n Ewe mag/wortel werk anders as 'n onewe een; 'n ewe wortel van 'n negatiewe getal is nie-reëel."), answerLabel: it.ans, solution: it.sol });
  },

  /* two answers from an even root of a positive (in an equation).
     r ≥ 2 keeps the "√r" decoy from collapsing to r (√1 = 1). The four
     misconceptions are exactly the ones the two fixed items used —
     three are dealt per roll, so both original option sets occur. */
  twoAnswers: () => {
    const r = randInt(2, 12), k = r * r;
    const wrongs = shuffled([L(`x = ${r} only`, `net x = ${r}`), L(`x = −${r} only`, `net x = −${r}`), L(`x = ±√${r}`, `x = ±√${r}`), L("no real solution", "geen reële oplossing nie")]).slice(0, 3);
    const ans = pick([
      L(`Taking the square root of both sides gives x = ±${r} (two answers).`, `Die vierkantswortel van albei kante gee x = ±${r} (twee antwoorde).`),
      L(`x = ±${r} — an even root of a positive gives two answers.`, `x = ±${r}: 'n ewe wortel van 'n positiewe getal gee twee antwoorde.`),
    ]);
    return mc(SIGN, L(`Solve <b>x² = ${k}</b>.`, `Los <b>x² = ${k}</b> op.`), L(`x = ±${r}`, `x = ±${r}`), wrongs,
      { hint: L("When you square-root both sides of an equation, remember the ± (both signs work).", "As jy die vierkantswortel van albei kante van 'n vergelyking trek, onthou die ± (albei tekens werk)."), answerLabel: ans,
        solution: [
          { s: L(`x² = ${k}, so take the square root of BOTH sides`, `x² = ${k}, dus trek die vierkantswortel van ALBEI kante`) },
          { s: L(`x = ±√${k} = ±${r}`, `x = ±√${k} = ±${r}`), r: L("the ± appears the moment an even root is taken", "die ± verskyn sodra 'n ewe wortel getrek word") },
          { s: L(`Both really work: (${r})² = ${k} and (−${r})² = ${k}`, `Albei werk regtig: (${r})² = ${k} en (−${r})² = ${k}`), r: L("this is an equation, so it has two solutions", "dit is 'n vergelyking, dus het dit twee oplossings") },
        ] });
  },
};

export const questEs5 = {
  id: "es5",
  skills: [
    { id: "multiplyDivide", concept: LAW, gen: SKILLS.multiplyDivide },
    { id: "bigNoNo", concept: LAW, gen: SKILLS.bigNoNo },
    { id: "likeSurds", concept: LAW, gen: SKILLS.likeSurds },
    { id: "insideOutside", concept: LAW, gen: SKILLS.insideOutside },
    { id: "signRules", concept: SIGN, gen: SKILLS.signRules },
    { id: "twoAnswers", concept: SIGN, gen: SKILLS.twoAnswers },
  ],
};
