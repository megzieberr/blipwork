/* ============================================================
   EXPONENTS & SURDS · Q4 — Which "divorce" (factorising type)?
   ------------------------------------------------------------
   Given an exponential expression with a + or − in it, decide:
   common factor / difference of squares / trinomial / grouping,
   plus the "let k = baseˣ" substitution and the baseˣ > 0
   restriction.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";
import { L } from "../lang.js";

const CON = "divorceTypes";
const TYPES = [L("Common factor", "Gemene faktor"), L("Difference of squares", "Verskil van twee vierkante"), L("Trinomial", "Drieterm"), L("Grouping", "Groepering")];
const wrongsFor = (t) => TYPES.filter((x) => x !== t);

/* each item: an expression and its true factorising type */
const POOL = [
  { e: L("3ˣ⁺² − 3ˣ", "3ˣ⁺² − 3ˣ"), t: L("Common factor", "Gemene faktor"), why: L("Two terms that both contain 3ˣ → take out the common factor 3ˣ.", "Twee terme wat albei 3ˣ bevat → haal die gemene faktor 3ˣ uit.") },
  { e: L("2ˣ⁺¹ + 2ˣ", "2ˣ⁺¹ + 2ˣ"), t: L("Common factor", "Gemene faktor"), why: L("Both terms contain 2ˣ → take out 2ˣ: 2ˣ(2 + 1).", "Albei terme bevat 2ˣ → haal 2ˣ uit: 2ˣ(2 + 1).") },
  { e: L("5ˣ⁺¹ − 5ˣ⁻¹", "5ˣ⁺¹ − 5ˣ⁻¹"), t: L("Common factor", "Gemene faktor"), why: L("Both contain a power of 5 → take out the smallest, 5ˣ⁻¹.", "Albei bevat 'n mag van 5 → haal die kleinste uit, 5ˣ⁻¹.") },
  { e: L("7·2ˣ + 2ˣ⁺¹", "7·2ˣ + 2ˣ⁺¹"), t: L("Common factor", "Gemene faktor"), why: L("Both terms contain 2ˣ → factor it out.", "Albei terme bevat 2ˣ → haal dit uit.") },

  { e: L("2²ˣ − 9", "2²ˣ − 9"), t: L("Difference of squares", "Verskil van twee vierkante"), why: L("Two terms, a subtraction, both squares: (2ˣ)² − 3². Let k = 2ˣ → k² − 9.", "Twee terme, 'n aftrekking, albei vierkante: (2ˣ)² − 3². Stel k = 2ˣ → k² − 9.") },
  { e: L("9ˣ − 16", "9ˣ − 16"), t: L("Difference of squares", "Verskil van twee vierkante"), why: L("9ˣ = (3ˣ)² and 16 = 4², a subtraction of two squares. Let k = 3ˣ → k² − 16.", "9ˣ = (3ˣ)² en 16 = 4², 'n aftrekking van twee vierkante. Stel k = 3ˣ → k² − 16.") },
  { e: L("25 − 4ˣ", "25 − 4ˣ"), t: L("Difference of squares", "Verskil van twee vierkante"), why: L("5² − (2ˣ)², a difference of two squares. Let k = 2ˣ → 25 − k².", "5² − (2ˣ)², 'n verskil van twee vierkante. Stel k = 2ˣ → 25 − k².") },

  { e: L("3²ˣ − 3ˣ − 6", "3²ˣ − 3ˣ − 6"), t: L("Trinomial", "Drieterm"), why: L("Three terms with (3ˣ)², 3ˣ and a constant. Let k = 3ˣ → k² − k − 6.", "Drie terme met (3ˣ)², 3ˣ en 'n konstante. Stel k = 3ˣ → k² − k − 6.") },
  { e: L("2²ˣ − 5·2ˣ + 4", "2²ˣ − 5·2ˣ + 4"), t: L("Trinomial", "Drieterm"), why: L("Three terms in 2ˣ. Let k = 2ˣ → k² − 5k + 4.", "Drie terme in 2ˣ. Stel k = 2ˣ → k² − 5k + 4.") },
  { e: L("9ˣ + 3ˣ − 12", "9ˣ + 3ˣ − 12"), t: L("Trinomial", "Drieterm"), why: L("9ˣ = (3ˣ)², so it’s k² + k − 12 with k = 3ˣ.", "9ˣ = (3ˣ)², dus is dit k² + k − 12 met k = 3ˣ.") },

  { e: L("a·2ˣ + a + 2ˣ + 1", "a·2ˣ + a + 2ˣ + 1"), t: L("Grouping", "Groepering"), why: L("Four terms in two pairs: a(2ˣ+1) + (2ˣ+1) = (a+1)(2ˣ+1).", "Vier terme in twee pare: a(2ˣ+1) + (2ˣ+1) = (a+1)(2ˣ+1).") },
  { e: L("x·3ˣ + 3ˣ + 2x + 2", "x·3ˣ + 3ˣ + 2x + 2"), t: L("Grouping", "Groepering"), why: L("Four terms: 3ˣ(x+1) + 2(x+1) = (3ˣ+2)(x+1).", "Vier terme: 3ˣ(x+1) + 2(x+1) = (3ˣ+2)(x+1).") },
  { e: L("p·5ˣ − 5ˣ + p − 1", "p·5ˣ − 5ˣ + p − 1"), t: L("Grouping", "Groepering"), why: L("Four terms: 5ˣ(p−1) + (p−1) = (5ˣ+1)(p−1).", "Vier terme: 5ˣ(p−1) + (p−1) = (5ˣ+1)(p−1).") },
];

const SKILLS = {
  classify1: () => { const it = pick(POOL); return mc(CON, L(`Which factorising method fits?<br><b>${it.e}</b>`, `Watter faktoriseringsmetode pas?<br><b>${it.e}</b>`), it.t, wrongsFor(it.t), { hint: L("Count the terms; look for a common power, two squares, three terms, or two pairs.", "Tel die terme; soek 'n gemene mag, twee vierkante, drie terme of twee pare."), answerLabel: it.why }); },
  classify2: () => { const it = pick(POOL); return mc(CON, L(`Which factorising method fits?<br><b>${it.e}</b>`, `Watter faktoriseringsmetode pas?<br><b>${it.e}</b>`), it.t, wrongsFor(it.t), { hint: L("2 squares & a minus = difference of squares · 3 terms = trinomial · shared power = common factor · 4 terms = grouping.", "2 vierkante & 'n minus = verskil van twee vierkante · 3 terme = drieterm · gedeelde mag = gemene faktor · 4 terme = groepering."), answerLabel: it.why }); },
  classify3: () => { const it = pick(POOL); return mc(CON, L(`Which factorising method fits?<br><b>${it.e}</b>`, `Watter faktoriseringsmetode pas?<br><b>${it.e}</b>`), it.t, wrongsFor(it.t), { hint: L("Remember 4ˣ = (2ˣ)² and 9ˣ = (3ˣ)² — that often reveals a square.", "Onthou 4ˣ = (2ˣ)² en 9ˣ = (3ˣ)²: dit wys dikwels 'n vierkant."), answerLabel: it.why }); },

  /* the substitution */
  substitution: () => {
    const items = [
      { e: L("2²ˣ − 5·2ˣ + 4", "2²ˣ − 5·2ˣ + 4"), k: L("Let k = 2ˣ", "Stel k = 2ˣ"), wrongs: [L("Let k = 2²ˣ", "Stel k = 2²ˣ"), L("Let k = x", "Stel k = x"), L("Let k = 4", "Stel k = 4")], ans: L("Let k = 2ˣ; then 2²ˣ = k², giving k² − 5k + 4.", "Stel k = 2ˣ; dan is 2²ˣ = k², en jy kry k² − 5k + 4.") },
      { e: L("9ˣ + 3ˣ − 12", "9ˣ + 3ˣ − 12"), k: L("Let k = 3ˣ", "Stel k = 3ˣ"), wrongs: [L("Let k = 9ˣ", "Stel k = 9ˣ"), L("Let k = 9", "Stel k = 9"), L("Let k = x", "Stel k = x")], ans: L("9ˣ = (3ˣ)², so let k = 3ˣ → k² + k − 12.", "9ˣ = (3ˣ)², dus stel k = 3ˣ → k² + k − 12.") },
      { e: L("3²ˣ − 3ˣ − 6", "3²ˣ − 3ˣ − 6"), k: L("Let k = 3ˣ", "Stel k = 3ˣ"), wrongs: [L("Let k = 3²ˣ", "Stel k = 3²ˣ"), L("Let k = 6", "Stel k = 6"), L("Let k = x", "Stel k = x")], ans: L("Let k = 3ˣ; 3²ˣ = k², giving k² − k − 6.", "Stel k = 3ˣ; 3²ˣ = k², en jy kry k² − k − 6.") },
      { e: L("x − √x − 6", "x − √x − 6"), k: L("Let k = √x", "Stel k = √x"), wrongs: [L("Let k = x", "Stel k = x"), L("Let k = x²", "Stel k = x²"), L("Let k = 6", "Stel k = 6")], ans: L("x = (√x)², so let k = √x → k² − k − 6. (Remember √x = k can never be negative when you solve.)", "x = (√x)², dus stel k = √x → k² − k − 6. (Onthou: √x = k kan nooit negatief wees wanneer jy oplos nie.)") },
      { e: L("√x + ⁴√x − 2", "√x + ⁴√x − 2"), k: L("Let k = ⁴√x", "Stel k = ⁴√x"), wrongs: [L("Let k = √x", "Stel k = √x"), L("Let k = x", "Stel k = x"), L("Let k = 2", "Stel k = 2")], ans: L("√x = (⁴√x)², so let k = ⁴√x → k² + k − 2.", "√x = (⁴√x)², dus stel k = ⁴√x → k² + k − 2.") },
    ];
    const it = pick(items);
    return mc(CON, L(`Which substitution turns <b>${it.e}</b> into an ordinary quadratic?`, `Watter vervanging maak van <b>${it.e}</b> 'n gewone kwadratiese uitdrukking?`), it.k, it.wrongs, { hint: L("Let k be the SMALLER power — the other term must be its square, k². (For baseˣ shapes, k = baseˣ.)", "Stel k gelyk aan die KLEINER mag: die ander term moet sy kwadraat, k², wees. (Vir grondtalˣ-vorme is k = grondtalˣ.)"), answerLabel: it.ans });
  },

  /* the restriction after factorising */
  restriction: () => ynQ(CON,
    L("After a trinomial gives roots like <b>k = 4</b> or <b>k = −9</b> (with k = 3ˣ), you keep <b>both</b> roots. True or false?", "Nadat 'n drieterm wortels soos <b>k = 4</b> of <b>k = −9</b> gee (met k = 3ˣ), hou jy <b>albei</b> wortels. Waar of onwaar?"),
    false,
    { hint: L("Can 3ˣ ever be a negative number?", "Kan 3ˣ ooit 'n negatiewe getal wees?"), answerLabel: L("False — 3ˣ is always positive, so k = −9 is rejected; only k = 4 (3ˣ = 4) gives a solution.", "Onwaar: 3ˣ is altyd positief, dus word k = −9 verwerp; net k = 4 (3ˣ = 4) gee 'n oplossing."),
      solution: [
        { s: L("Always substitute back: k = 3ˣ, so the two branches read 3ˣ = 4 and 3ˣ = −9", "Vervang altyd terug: k = 3ˣ, dus lees die twee gevalle 3ˣ = 4 en 3ˣ = −9") },
        { s: L("3 is a positive base, and a positive base can never reach a negative value", "3 is 'n positiewe grondtal, en 'n positiewe grondtal kan nooit 'n negatiewe waarde bereik nie"), r: L("3ˣ ≠ −9 ∴ no solution on that branch", "3ˣ ≠ −9 ∴ geen oplossing in daardie geval nie") },
        { s: L("∴ false — only k = 4 survives, and stopping at k would lose the mark anyway", "∴ onwaar: net k = 4 bly oor, en as jy by k stop, verloor jy in elk geval die punt") },
      ] }),

  /* number of terms → method */
  byShape: () => {
    const items = [
      { q: L("An expression has <b>three terms</b> (a squared power, a single power and a constant). Which method?", "'n Uitdrukking het <b>drie terme</b> ('n gekwadreerde mag, 'n enkele mag en 'n konstante). Watter metode?"), correct: L("Trinomial", "Drieterm"), wrongs: [L("Difference of squares", "Verskil van twee vierkante"), L("Common factor", "Gemene faktor"), L("Grouping", "Groepering")], ans: L("Three terms in one power → trinomial (let k = baseˣ).", "Drie terme in een mag → drieterm (stel k = grondtalˣ)."),
        sol: [{ s: L("Count the terms first — three of them, and one is the square of another", "Tel eers die terme: drie, en een is die kwadraat van 'n ander") },
              { s: L("That is the K², K, constant shape, so let K = baseˣ", "Dit is die vorm K², K, konstante, dus stel K = grondtalˣ") },
              { s: L("It becomes an ordinary quadratic in K, which factorises into two brackets", "Dit word 'n gewone kwadratiese uitdrukking in K, wat in twee hakies faktoriseer"), r: L("and always substitute back at the end", "en vervang altyd aan die einde terug") }] },
      { q: L("An expression has <b>two terms</b>, a subtraction, and both are perfect squares. Which method?", "'n Uitdrukking het <b>twee terme</b>, 'n aftrekking, en albei is volkome vierkante. Watter metode?"), correct: L("Difference of squares", "Verskil van twee vierkante"), wrongs: [L("Trinomial", "Drieterm"), L("Common factor", "Gemene faktor"), L("Grouping", "Groepering")], ans: L("Two squares with a minus → difference of squares.", "Twee vierkante met 'n minus → verskil van twee vierkante."),
        sol: [{ s: L("Count the terms — two of them, joined by a minus", "Tel die terme: twee, met 'n minus tussen hulle") },
              { s: L("Both are perfect squares, so it fits a² − b² = (a − b)(a + b)", "Albei is volkome vierkante, dus pas dit a² − b² = (a − b)(a + b)"), r: L("her “diff in □'s”", "haar “verskil van □'e”") },
              { s: L("With a plus between them it would not factorise at all", "Met 'n plus tussen hulle sou dit glad nie faktoriseer nie"), r: L("the minus is what makes it work", "die minus laat dit werk") }] },
      { q: L("An expression has <b>four terms</b> that split into two matching pairs. Which method?", "'n Uitdrukking het <b>vier terme</b> wat in twee passende pare verdeel. Watter metode?"), correct: L("Grouping", "Groepering"), wrongs: [L("Trinomial", "Drieterm"), L("Difference of squares", "Verskil van twee vierkante"), L("Common factor", "Gemene faktor")], ans: L("Four terms in two pairs → grouping.", "Vier terme in twee pare → groepering."),
        sol: [{ s: L("Count the terms — four, which is too many for a trinomial", "Tel die terme: vier, en dit is te veel vir 'n drieterm") },
              { s: L("Take a common factor out of the first pair and out of the second pair", "Haal 'n gemene faktor uit die eerste paar en uit die tweede paar") },
              { s: L("If the same bracket is left over in both, that bracket comes out as one factor", "As dieselfde hakie in albei oorbly, kom daardie hakie uit as een faktor"), r: L("that leftover bracket matching is the point of grouping", "dat die oorblywende hakies ooreenstem, is die hele punt van groepering") }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: L("The number of terms and their shape pick the method.", "Die aantal terme en hul vorm kies die metode."), answerLabel: it.ans, solution: it.sol });
  },
};

export const questEs4 = {
  id: "es4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
