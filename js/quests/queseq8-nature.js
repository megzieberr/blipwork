/* ============================================================
   EQUATIONS & INEQUALITIES · Q8 — Nature of roots & KNOW THE DIFFERENCE
   ------------------------------------------------------------
   Δ = b² − 4ac, matching the three parabola pictures to the
   sign of Δ, the rational/irrational split, the three question
   types, the (p − 2)² + 4 proof trick, the rejected k = 0, and
   the vocabulary panel: no solution / undefined / non-real / N.A.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, deltaGraph } from "./_eq.js";
import { L } from "../lang.js";

const DIS = "eqDiscriminant";
const DIF = "eqKnowDiff";

const SKILLS = {
  /* what Δ is and where it lives */
  whatDelta: () => {
    const items = [
      { q: L("What is the <b>discriminant</b> Δ?", "Wat is die <b>diskriminant</b> Δ?"), correct: L("Δ = b² − 4ac", "Δ = b² − 4ac"), wrongs: [L("Δ = b² + 4ac", "Δ = b² + 4ac"), L("Δ = √(b² − 4ac)", "Δ = √(b² − 4ac)"), L("Δ = −b / 2a", "Δ = −b / 2a")], ans: L("Δ = b² − 4ac — the part UNDER the root in the quadratic formula (without the root itself).", "Δ = b² − 4ac: die deel ONDER die wortelteken in die kwadratiese formule (sonder die wortelteken self)."),
        sol: [{ s: L("Look at the formula: x = (−b ± √(b² − 4ac)) / 2a", "Kyk na die formule: x = (−b ± √(b² − 4ac)) / 2a") },
              { s: L("Δ is the piece sitting UNDER the root, on its own: b² − 4ac", "Δ is die stuk wat ONDER die wortelteken sit, op sy eie: b² − 4ac"), r: L("the root sign is not part of Δ", "die wortelteken is nie deel van Δ nie") },
              { s: L("It is a MINUS 4ac — a plus there could never come out negative, and the whole point of Δ is that it can", "Dit is MINUS 4ac: met 'n plus daar kan dit nooit negatief uitkom nie, en die hele punt van Δ is dat dit kan") }] },
      { q: L("Where does Δ live inside the quadratic formula?", "Waar woon Δ in die kwadratiese formule?"), correct: L("Under the square root", "Onder die vierkantswortel"), wrongs: [L("In the denominator", "In die noemer"), L("In front of the ±", "Voor die ±"), L("It isn't in the formula", "Dit is nie in die formule nie")], ans: L("x = (−b ± √Δ)/2a with Δ = b² − 4ac. Its sign decides whether the root (and so the answers) exist.", "x = (−b ± √Δ)/2a met Δ = b² − 4ac. Sy teken besluit of die wortel (en dus die antwoorde) bestaan."),
        sol: [{ s: L("Write the formula with Δ in it: x = (−b ± √Δ) / 2a", "Skryf die formule met Δ daarin: x = (−b ± √Δ) / 2a") },
              { s: L("Δ sits under the square root, which is why its SIGN matters so much", "Δ sit onder die vierkantswortel, en daarom is sy TEKEN so belangrik") },
              { s: L("Negative under the root → non-real; zero → the ± adds nothing; positive → two different answers", "Negatief onder die wortel → nie-reëel; nul → die ± voeg niks by nie; positief → twee verskillende antwoorde") }] },
      { q: L("What do the ROOTS of a quadratic look like on its graph?", "Hoe lyk die WORTELS van 'n kwadratiese vergelyking op die grafiek?"), correct: L("The x-intercepts — where the parabola cuts the x-axis", "Die x-afsnitte: waar die parabool die x-as sny"), wrongs: [L("The turning point", "Die draaipunt"), L("The y-intercept", "Die y-afsnit"), L("The axis of symmetry", "Die simmetrie-as")], ans: L("Roots = x-intercepts. That's why Δ (which counts the real roots) tells you how the parabola meets the x-axis.", "Wortels = x-afsnitte. Daarom sê Δ (wat die reële wortels tel) vir jou hoe die parabool die x-as ontmoet."),
        sol: [{ s: L("A root is an x that makes the expression equal 0", "'n Wortel is 'n x wat die uitdrukking gelyk aan 0 maak") },
              { s: L("On the graph, y = 0 IS the x-axis", "Op die grafiek IS y = 0 die x-as"), r: L("her heading: nature of roots ↳ where the graph intersects the x-axis", "haar opskrif: aard van die wortels ↳ waar die grafiek die x-as sny") },
              { s: L("So the roots are exactly the x-intercepts, and counting them counts the crossings", "Dus is die wortels presies die x-afsnitte, en as jy hulle tel, tel jy die snypunte") }] },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: L("Δ is the b² − 4ac sitting under the root.", "Δ is die b² − 4ac wat onder die wortel sit."), answerLabel: it.ans, solution: it.sol });
  },

  /* ★ match the picture to Δ */
  matchGraph: () => {
    const kind = pick(["two", "touch", "none"]);
    const correct =
      kind === "two" ? L("Δ > 0 — two real, unequal roots", "Δ > 0: twee reële, ongelyke wortels") :
      kind === "touch" ? L("Δ = 0 — real, equal roots (it touches at the TP)", "Δ = 0: reële, gelyke wortels (raak by die DP)") :
      L("Δ < 0 — non-real roots", "Δ < 0: nie-reële wortels");
    const all = [
      L("Δ > 0 — two real, unequal roots", "Δ > 0: twee reële, ongelyke wortels"),
      L("Δ = 0 — real, equal roots (it touches at the TP)", "Δ = 0: reële, gelyke wortels (raak by die DP)"),
      L("Δ < 0 — non-real roots", "Δ < 0: nie-reële wortels"),
      L("Δ ≥ 0 — nothing can be said", "Δ ≥ 0: niks kan gesê word nie"),
    ];
    const wrongs = all.filter((s) => s !== correct);
    return mc(DIS, L("The sketch shows how this parabola meets the x-axis. What does it tell you about Δ and the roots?", "Die skets wys hoe hierdie parabool die x-as ontmoet. Wat sê dit vir jou oor Δ en die wortels?"),
      correct, wrongs,
      { hint: L("Cuts twice → Δ > 0. Touches once → Δ = 0. Floats clear → Δ < 0.", "Sny twee keer → Δ > 0. Raak een keer → Δ = 0. Bly weg → Δ < 0."),
        answerLabel: kind === "two"
          ? L("It CUTS the x-axis at two points → two real, unequal roots → Δ > 0.", "Dit SNY die x-as by twee punte → twee reële, ongelyke wortels → Δ > 0.")
          : kind === "touch"
            ? L("It TOUCHES the x-axis at exactly one point (the turning point) → real, equal roots → Δ = 0.", "Dit RAAK die x-as by presies een punt (die draaipunt) → reële, gelyke wortels → Δ = 0.")
            : L("It never reaches the x-axis → no x-intercepts → non-real roots → Δ < 0.", "Dit bereik nooit die x-as nie → geen x-afsnitte nie → nie-reële wortels → Δ < 0."),
        solution: [
          { s: L("Count the x-intercepts on the sketch — the roots ARE the crossings", "Tel die x-afsnitte op die skets: die wortels IS die snypunte") },
          { s: kind === "two"
              ? L("It cuts clean through the axis in two places, so there are two different real roots", "Dit sny skoon deur die as op twee plekke, dus is daar twee verskillende reële wortels")
              : kind === "touch"
                ? L("It just kisses the axis at one point, its turning point — the two roots have landed on top of each other", "Dit soen net die as by een punt, sy draaipunt: die twee wortels het bo-op mekaar geland")
                : L("It never reaches the axis at all, so no real x makes it 0", "Dit bereik glad nie die as nie, dus maak geen reële x dit 0 nie") },
          { s: kind === "two"
              ? L("Two different answers need a real, non-zero ± , so Δ > 0", "Twee verskillende antwoorde vra 'n reële ± wat nie nul is nie, dus Δ > 0")
              : kind === "touch"
                ? L("The ± must be adding nothing, so Δ = 0 — real, rational, EQUAL", "Die ± voeg niks by nie, dus Δ = 0: reëel, rasionaal, GELYK")
                : L("That means a negative under the root: Δ < 0 — non-real / imaginary", "Dit beteken 'n negatief onder die wortel: Δ < 0, nie-reëel / imaginêr"),
            r: L("her Δ table, read backwards from the picture", "haar Δ-tabel, agteruit gelees vanaf die prentjie") },
        ],
        graph: deltaGraph(kind) });
  },

  /* classify a computed Δ value
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "5 concrete
     Δ values — clearly parametrisable (roll a Δ, derive category)"). The Δ
     is rolled, its category DERIVED from it (never stored beside it), and
     the wrong options are the other three categories — so picture and key
     cannot disagree. The four category strings are her EQ p43 table
     wordings (METHODS-algebra B11), unchanged. Guards: the perfect-square
     branch is built as k² so it really is one, and the non-square branch
     re-rolls until √Δ is irrational. */
  classify: () => {
    const cat = pick(["perfect", "nonPerfect", "zero", "negative"]);
    let d, why;
    if (cat === "perfect") {
      const k = randInt(2, 14); d = k * k;
      why = L(`${C(d)} > 0 AND ${C(d)} = ${C(k)}² is a perfect square → rational, and unequal because Δ ≠ 0.`, `${C(d)} > 0 EN ${C(d)} = ${C(k)}² is 'n volkome vierkant → rasionaal, en ongelyk omdat Δ ≠ 0.`);
    } else if (cat === "nonPerfect") {
      d = randInt(2, 99);
      while (Number.isInteger(Math.sqrt(d))) d = randInt(2, 99);   // must NOT be a perfect square
      why = L(`${C(d)} > 0 but ${C(d)} is NOT a perfect square → the roots keep a surd: real, irrational, unequal.`, `${C(d)} > 0 maar ${C(d)} is NIE 'n volkome vierkant nie → die wortels hou 'n wortelvorm: reëel, irrasionaal, ongelyk.`);
    } else if (cat === "zero") {
      d = 0;
      why = L("Δ = 0 → the ± adds nothing: one repeated rational root (the parabola touches the axis).", "Δ = 0 → die ± voeg niks by nie: een herhaalde rasionale wortel (die parabool raak die as).");
    } else {
      d = -randInt(3, 99);
      why = L("Δ < 0 → a negative under the root → non-real roots.", "Δ < 0 → 'n negatief onder die wortel → nie-reële wortels.");
    }
    const correct = cat === "negative" ? L("Non-real", "Nie-reëel")
      : cat === "zero" ? L("Real, rational, equal", "Reëel, rasionaal, gelyk")
        : cat === "perfect" ? L("Real, rational, unequal", "Reëel, rasionaal, ongelyk") : L("Real, irrational, unequal", "Reëel, irrasionaal, ongelyk");
    const ALL = [L("Real, rational, unequal", "Reëel, rasionaal, ongelyk"), L("Real, irrational, unequal", "Reëel, irrasionaal, ongelyk"), L("Real, rational, equal", "Reëel, rasionaal, gelyk"), L("Non-real", "Nie-reëel")];
    return mc(DIS, L(`You work out <b>Δ = ${C(d)}</b>. What is the nature of the roots?`, `Jy bereken <b>Δ = ${C(d)}</b>. Wat is die aard van die wortels?`),
      correct, ALL.filter((s) => s !== correct),
      { hint: L("Sign first (≥ 0 real, < 0 non-real), then perfect square → rational, then 0 → equal.", "Eers die teken (≥ 0 reëel, < 0 nie-reëel), dan volkome vierkant → rasionaal, dan 0 → gelyk."),
        answerLabel: why,
        solution: [
          { s: L(`Question 1 — what is the SIGN of Δ? Here Δ = ${C(d)}, which is ${d < 0 ? "negative" : d === 0 ? "zero" : "positive"}`, `Vraag 1: wat is die TEKEN van Δ? Hier is Δ = ${C(d)}, wat ${d < 0 ? "negatief" : d === 0 ? "nul" : "positief"} is`),
            r: d < 0 ? L("a negative under the root → stop here, the roots are non-real", "'n negatief onder die wortel → stop hier, die wortels is nie-reëel") : L("so the roots are real", "dus is die wortels reëel") },
          ...(d < 0 ? [] : [{ s: d === 0
              ? L("Question 2 — is Δ zero? It is, so the ± adds nothing and the two roots collapse into one", "Vraag 2: is Δ nul? Ja, dus voeg die ± niks by nie en die twee wortels val saam in een")
              : L(`Question 2 — is Δ a perfect square? ${C(d)} ${cat === "perfect" ? "is" : "is NOT"} one`, `Vraag 2: is Δ 'n volkome vierkant? ${C(d)} ${cat === "perfect" ? "is een" : "is NIE een nie"}`),
            r: d === 0 ? L("equal roots — the parabola touches the axis at its turning point", "gelyke wortels: die parabool raak die as by sy draaipunt")
                       : (cat === "perfect" ? L("so the root comes out whole: rational", "dus kom die wortel heel uit: rasionaal") : L("so a surd survives: irrational", "dus bly 'n wortelvorm oor: irrasionaal")) }]),
          { s: `∴ ${correct}`, r: L("her exact wording from the Δ table", "haar presiese woorde uit die Δ-tabel") },
        ] });
  },

  /* nature given → which condition to write */
  conditions: () => {
    const items = [
      { want: L("EQUAL roots", "GELYKE wortels"), correct: L("Δ = 0", "Δ = 0"), wrongs: [L("Δ < 0", "Δ < 0"), L("Δ ≥ 0", "Δ ≥ 0"), L("Δ > 0", "Δ > 0")] },
      { want: L("NON-REAL roots", "NIE-REËLE wortels"), correct: L("Δ < 0", "Δ < 0"), wrongs: [L("Δ = 0", "Δ = 0"), L("Δ > 0", "Δ > 0"), L("Δ ≤ 0", "Δ ≤ 0")] },
      { want: L("REAL roots", "REËLE wortels"), correct: L("Δ ≥ 0", "Δ ≥ 0"), wrongs: [L("Δ > 0", "Δ > 0"), L("Δ = 0", "Δ = 0"), L("Δ < 0", "Δ < 0")] },
      { want: L("real, RATIONAL and UNEQUAL roots", "reële, RASIONALE en ONGELYKE wortels"), correct: L("Δ > 0 and Δ a perfect square", "Δ > 0 en Δ 'n volkome vierkant"), wrongs: [L("Δ > 0 only", "Net Δ > 0"), L("Δ ≥ 0", "Δ ≥ 0"), L("Δ = 0", "Δ = 0")] },
      { want: L("two real, UNEQUAL roots", "twee reële, ONGELYKE wortels"), correct: L("Δ > 0", "Δ > 0"), wrongs: [L("Δ ≥ 0", "Δ ≥ 0"), L("Δ = 0", "Δ = 0"), L("Δ ≠ 0", "Δ ≠ 0")] },
    ];
    const it = pick(items);
    return mc(DIS, L(`The question says the roots must be <b>${it.want}</b>. Which condition do you write down?`, `Die vraag sê die wortels moet <b>${it.want}</b> wees. Watter voorwaarde skryf jy neer?`),
      it.correct, it.wrongs,
      { hint: L("Translate the words into a Δ statement FIRST, then solve it for the unknown.", "Vertaal die woorde EERS in 'n Δ-bewering, los dit dan op vir die onbekende."),
        answerLabel: L(`${it.want} → ${it.correct}. Then substitute a, b and c (with the parameter) and solve.`, `${it.want} → ${it.correct}. Vervang dan a, b en c (met die parameter) en los op.`),
        solution: [
          { s: L(`Turn the words into a Δ statement before touching any algebra: ${it.want} → ${it.correct}`, `Maak die woorde 'n Δ-bewering voordat jy aan enige algebra raak: ${it.want} → ${it.correct}`) },
          { s: L("Then write Δ = b² − 4ac, substituting a, b and c with the parameter still in them", "Skryf dan Δ = b² − 4ac en vervang a, b en c met die parameter nog daarin") },
          { s: L(`Set that expression ${it.correct.includes("perfect") ? "greater than 0 (and check for a perfect square)" : it.correct.replace("Δ ", "")} and solve for the unknown`, `Stel daardie uitdrukking ${it.correct.includes("perfect") ? "groter as 0 (en kyk vir 'n volkome vierkant)" : it.correct.replace("Δ ", "")} en los op vir die onbekende`),
            r: L("if you divide by a negative on the way, the inequality sign flips", "as jy op pad deur 'n negatief deel, draai die ongelykheidsteken om") },
        ] });
  },

  /* the three question types (their notes' framing) */
  threeTypes: () => {
    const items = [
      { stem: L("“Determine the nature of the roots of 3x² − x + 4 = 0 WITHOUT solving.”", "“Bepaal die aard van die wortels van 3x² − x + 4 = 0 SONDER om op te los.”"), correct: L("Type 1: work out Δ and classify it with the table", "Tipe 1: bereken Δ en klassifiseer dit met die tabel"), wrongs: [L("Type 2: set up a condition and solve for the unknown", "Tipe 2: stel 'n voorwaarde op en los op vir die onbekende"), L("Type 3: prove Δ always has a certain sign", "Tipe 3: bewys Δ het altyd 'n sekere teken"), L("None — it must be solved fully", "Geeneen: dit moet volledig opgelos word")] },
      { stem: L("“For which values of h will 3x² − 2hx + 3 = 0 have non-real roots?”", "“Vir watter waardes van h sal 3x² − 2hx + 3 = 0 nie-reële wortels hê?”"), correct: L("Type 2: write the condition (Δ < 0) and solve it for h", "Tipe 2: skryf die voorwaarde (Δ < 0) en los dit op vir h"), wrongs: [L("Type 1: work out Δ as a number and classify", "Tipe 1: bereken Δ as 'n getal en klassifiseer"), L("Type 3: prove Δ is always negative", "Tipe 3: bewys Δ is altyd negatief"), L("Solve the quadratic with the formula", "Los die kwadratiese vergelyking met die formule op")] },
      { stem: L("“Show that x² − px + p = 2 has two real, unequal roots for ALL p.”", "“Toon aan dat x² − px + p = 2 twee reële, ongelyke wortels het vir ALLE p.”"), correct: L("Type 3: work out Δ in terms of p and show it is ALWAYS positive", "Tipe 3: bereken Δ in terme van p en toon aan dit is ALTYD positief"), wrongs: [L("Type 2: solve Δ > 0 for a few values of p", "Tipe 2: los Δ > 0 op vir 'n paar waardes van p"), L("Type 1: pick p = 1 and classify", "Tipe 1: kies p = 1 en klassifiseer"), L("Impossible — p is unknown", "Onmoontlik: p is onbekend")] },
    ];
    const it = pick(items);
    return mc(DIS, L(`Which type of nature-of-roots question is this?<br>${it.stem}`, `Watter tipe vraag oor die aard van die wortels is dit?<br>${it.stem}`), it.correct, it.wrongs,
      { hint: L("1: classify a number. 2: nature given, find the variable. 3: prove it for every value.", "1: klassifiseer 'n getal. 2: aard gegee, vind die veranderlike. 3: bewys dit vir elke waarde."),
        answerLabel: it.correct });
  },

  /* the proof trick: complete the square on Δ */
  proveTrick: () => {
    const items = [
      { q: L("In a Type-3 proof you reach <b>Δ = (p − 2)² + 4</b>. Why is Δ ALWAYS positive?", "In 'n Tipe 3-bewys kry jy <b>Δ = (p − 2)² + 4</b>. Hoekom is Δ ALTYD positief?"), correct: L("A square is never negative, and adding 4 lifts it to at least 4 — above 0 for every p", "'n Kwadraat is nooit negatief nie, en 4 bytel lig dit tot minstens 4: bo 0 vir elke p"), wrongs: [L("Because p must be positive", "Omdat p positief moet wees"), L("Because Δ has a bracket in it", "Omdat Δ 'n hakie in het"), L("It isn't — at p = 2 it fails", "Dit is nie: by p = 2 faal dit")], ans: L("(p − 2)² ≥ 0 for every p, so Δ ≥ 4 > 0 always. (At p = 2, Δ = 4 — still positive.) That proves real, unequal roots for ALL p.", "(p − 2)² ≥ 0 vir elke p, dus Δ ≥ 4 > 0 altyd. (By p = 2 is Δ = 4: steeds positief.) Dit bewys reële, ongelyke wortels vir ALLE p.") },
      { q: L("You reach <b>Δ = 169m²</b> and m ≠ 0. What is the nature of the roots?", "Jy kry <b>Δ = 169m²</b> en m ≠ 0. Wat is die aard van die wortels?"), correct: L("Real, rational and unequal — 169m² = (13m)² is a positive perfect square", "Reëel, rasionaal en ongelyk: 169m² = (13m)² is 'n positiewe volkome vierkant"), wrongs: [L("Real and irrational — there's an m in it", "Reëel en irrasionaal: daar is 'n m in"), L("Non-real — m could be negative", "Nie-reëel: m kan negatief wees"), L("Equal — squares mean equal roots", "Gelyk: kwadrate beteken gelyke wortels")], ans: L("169m² = (13m)², a perfect square → rational. And for m ≠ 0 it is strictly positive → unequal. (m negative doesn't matter: m² is positive.)", "169m² = (13m)², 'n volkome vierkant → rasionaal. En vir m ≠ 0 is dit streng positief → ongelyk. (m negatief maak nie saak nie: m² is positief.)") },
      { q: L("To PROVE Δ is always positive when Δ = p² − 4p + 8, what is the standard move?", "Om te BEWYS dat Δ altyd positief is as Δ = p² − 4p + 8, wat is die standaardstap?"), correct: L("Complete the square on Δ: p² − 4p + 8 = (p − 2)² + 4", "Voltooi die vierkant op Δ: p² − 4p + 8 = (p − 2)² + 4"), wrongs: [L("Substitute p = 0, 1, 2 and check each", "Vervang p = 0, 1, 2 en kontroleer elkeen"), L("Factorise Δ into two brackets", "Faktoriseer Δ in twee hakies"), L("Divide Δ by p", "Deel Δ deur p")], ans: L("Testing a few p-values proves nothing about ALL p. Complete the square: (p − 2)² + 4 ≥ 4 > 0 for every p.", "'n Paar p-waardes toets bewys niks oor ALLE p nie. Voltooi die vierkant: (p − 2)² + 4 ≥ 4 > 0 vir elke p.") },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: L("A square is ≥ 0; a square plus a positive number is > 0. That works for EVERY value.", "'n Kwadraat is ≥ 0; 'n kwadraat plus 'n positiewe getal is > 0. Dit werk vir ELKE waarde."), answerLabel: it.ans });
  },

  /* the rejected parameter value (workbook's k = 0 error)
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     worked example (k(k+8)=0) — parametrisable with real effort"). The
     factorised Δ = 0 line rolls its constant and its sign; the surviving
     root is derived from it (k(k + m) = 0 → k = −m; k(k − m) = 0 → k = m),
     so the rejected value is always 0 and the teaching point — a
     restriction from the ORIGINAL equation outranks the algebra — is
     exactly the same on every roll. The yes/no item has no numbers. */
  rejectParam: () => {
    if (pick([true, false])) {
      return ynQ(DIS,
        L("A parameter value that makes the original equation's denominator 0 must still be kept if the algebra produced it. True?", "'n Parameterwaarde wat die oorspronklike vergelyking se noemer 0 maak, moet steeds gehou word as die algebra dit opgelewer het. Waar?"),
        false,
        { hint: L("Restrictions outrank algebra.", "Beperkings troef algebra."),
          answerLabel: L("False — restrictions from the ORIGINAL equation stand. A value that breaks them is rejected (N.A.), exactly like a rejected x.", "Onwaar: beperkings uit die OORSPRONKLIKE vergelyking staan. 'n Waarde wat hulle breek, word verwerp (n.v.t.), presies soos 'n verwerpte x."),
          solution: [
            { s: L("The restriction comes from the ORIGINAL equation, before any working started", "Die beperking kom uit die OORSPRONKLIKE vergelyking, voordat enige bewerking begin het") },
            { s: L("The algebra cannot un-ban a value — it only shows which values would have solved the changed equation", "Die algebra kan nie 'n verbode waarde toelaat nie: dit wys net watter waardes die veranderde vergelyking sou oplos") },
            { s: L("∴ false — a parameter that breaks a restriction is rejected as N.A., exactly like a rejected x", "∴ onwaar: 'n parameter wat 'n beperking breek, word as n.v.t. verwerp, presies soos 'n verwerpte x") },
          ] });
    }
    const m = randInt(2, 12), s = pick([1, -1]);
    const other = -m * s;                                   // k(k + m) = 0 → k = −m ; k(k − m) = 0 → k = m
    const inner = s > 0 ? L(`k + ${C(m)}`, `k + ${C(m)}`) : L(`k − ${C(m)}`, `k − ${C(m)}`);
    return mc(DIS,
      L(`Equal roots demand Δ = 0, which gives <b>k(${inner}) = 0</b>, so k = 0 or k = ${C(other)}. But the ORIGINAL equation had kx in a denominator. Final answer?`, `Gelyke wortels vra Δ = 0, wat <b>k(${inner}) = 0</b> gee, dus k = 0 of k = ${C(other)}. Maar die OORSPRONKLIKE vergelyking het kx in 'n noemer gehad. Finale antwoord?`),
      L(`k = ${C(other)} only — reject k = 0`, `Net k = ${C(other)}: verwerp k = 0`),
      [L(`k = 0 or k = ${C(other)}, both count`, `k = 0 of k = ${C(other)}, albei tel`), L("k = 0 only", "Net k = 0"), L("No valid k exists", "Geen geldige k bestaan nie")],
      { hint: L("Check every parameter answer against the original equation's restrictions.", "Toets elke parameter-antwoord teen die oorspronklike vergelyking se beperkings."),
        answerLabel: L(`kx in a denominator means k ≠ 0 from the start (and at k = 0 the equation isn't even a quadratic). Reject k = 0: the answer is k = ${C(other)} only.`, `kx in 'n noemer beteken k ≠ 0 van die begin af (en by k = 0 is die vergelyking nie eens kwadraties nie). Verwerp k = 0: die antwoord is net k = ${C(other)}.`),
        solution: [
          { s: L(`The algebra gives two candidates: k = 0 or k = ${C(other)}`, `Die algebra gee twee kandidate: k = 0 of k = ${C(other)}`) },
          { s: L("Now check them against the original equation: kx sat in a denominator, so k ≠ 0 from the very start", "Toets hulle nou teen die oorspronklike vergelyking: kx was in 'n noemer, dus k ≠ 0 van die heel begin af") },
          { s: L("k = 0 breaks that restriction, so it is N.A.", "k = 0 breek daardie beperking, dus is dit n.v.t."), r: L("at k = 0 the equation is not even a quadratic any more", "by k = 0 is die vergelyking nie eens meer kwadraties nie") },
          { s: L(`∴ k = ${C(other)} only`, `∴ net k = ${C(other)}`) },
        ] });
  },

  /* KNOW THE DIFFERENCE — the four words */
  knowDiff: () => {
    const items = [
      { case: L(`<b>3ˣ = −1</b>`, `<b>3ˣ = −1</b>`), correct: L("No solution", "Geen oplossing"), wrongs: [L("Undefined", "Onbepaald"), L("Non-real", "Nie-reëel"), L("Not applicable (N.A.)", "Nie van toepassing (n.v.t.)")], why: L("A power with a positive base can never be negative — the statement can NEVER be true: no solution.", "'n Mag met 'n positiewe grondtal kan nooit negatief wees nie, dus kan die bewering NOOIT waar wees nie: geen oplossing.") },
      { case: L(`<b>x ÷ 0</b> (a denominator equal to 0)`, `<b>x ÷ 0</b> ('n noemer gelyk aan 0)`), correct: L("Undefined", "Onbepaald"), wrongs: [L("No solution", "Geen oplossing"), L("Non-real", "Nie-reëel"), L("Not applicable (N.A.)", "Nie van toepassing (n.v.t.)")], why: L("Division by 0 is undefined — the ghost under the bed. Find it by setting the denominator = 0.", "Deling deur 0 is onbepaald: die spook onder die bed. Vind dit deur die noemer = 0 te stel.") },
      { case: `<b>√(−4)</b>`, correct: L("Non-real", "Nie-reëel"), wrongs: [L("Undefined", "Onbepaald"), L("No solution", "Geen oplossing"), L("Not applicable (N.A.)", "Nie van toepassing (n.v.t.)")], why: L("A negative under an even root has no real value → non-real. Find it by setting the inside of the root < 0.", "'n Negatief onder 'n ewe wortel het geen reële waarde nie → nie-reëel. Vind dit deur die binnekant van die wortel < 0 te stel.") },
      { case: L("An answer from a surd equation that FAILS the test in the original equation", "'n Antwoord van 'n wortelvormvergelyking wat die toets in die oorspronklike vergelyking DRUIP"), correct: L("Not applicable (N.A.)", "Nie van toepassing (n.v.t.)"), wrongs: [L("Undefined", "Onbepaald"), L("Non-real", "Nie-reëel"), L("No solution", "Geen oplossing")], why: L("Squaring can invent extra answers. A candidate that fails the original equation is rejected: N.A.", "Kwadreer kan ekstra antwoorde uitdink. 'n Kandidaat wat nie in die oorspronklike vergelyking werk nie, word verwerp: n.v.t.") },
      { case: L("An answer that equals one of the fraction equation's restrictions", "'n Antwoord wat gelyk is aan een van die breukvergelyking se beperkings"), correct: L("Not applicable (N.A.)", "Nie van toepassing (n.v.t.)"), wrongs: [L("Undefined", "Onbepaald"), L("Non-real", "Nie-reëel"), L("No solution", "Geen oplossing")], why: L("The value itself is rejected — mark it N.A. and keep only the valid answer(s).", "Die waarde self word verwerp: merk dit n.v.t. en hou net die geldige antwoord(e).") },
    ];
    const it = pick(items);
    return mc(DIF, L(`KNOW THE DIFFERENCE: which word describes this?<br>${it.case}`, `KEN DIE VERSKIL: watter woord beskryf dit?<br>${it.case}`), it.correct, it.wrongs,
      { hint: L("No solution = never true. Undefined = denominator 0. Non-real = negative under √. N.A. = a rejected candidate answer.", "Geen oplossing = nooit waar nie. Onbepaald = noemer 0. Nie-reëel = negatief onder √. n.v.t. = 'n verwerpte kandidaat-antwoord."),
        answerLabel: it.why,
        solution: [
          { s: L("Run the four words in order and see which one this case actually fits", "Gaan die vier woorde in volgorde deur en kyk watter een regtig by hierdie geval pas") },
          { s: L("No solution = the statement can never be true · undefined = a denominator hits 0 · non-real = a negative sits under an even root · N.A. = a candidate answer that fails the original", "Geen oplossing = die bewering kan nooit waar wees nie · onbepaald = 'n noemer word 0 · nie-reëel = 'n negatief sit onder 'n ewe wortel · n.v.t. = 'n kandidaat-antwoord wat nie in die oorspronklike werk nie") },
          { s: it.why, r: L("the four are not interchangeable — she gives this its own titled box", "die vier is nie uitruilbaar nie: sy gee dit sy eie blokkie met 'n opskrif") },
        ] });
  },

  /* undefined vs non-real on one expression — fresh numbers */
  whereUndefined: () => {
    const m = randInt(1, 6);
    let n = randInt(1, 6); if (n === m) n = m + 1;   // distinct numbers keep every option unambiguous
    const ask = pick(["undef", "nonreal"]);
    const expr = L(`√(x + ${C(n)}) / (x + ${C(m)})`, `√(x + ${C(n)}) / (x + ${C(m)})`);
    if (ask === "undef") {
      return mc(DIF, L(`For which x is <b>${expr}</b> UNDEFINED?`, `Vir watter x is <b>${expr}</b> ONBEPAALD?`),
        L(`x = −${C(m)} (the denominator becomes 0)`, `x = −${C(m)} (die noemer word 0)`),
        [L(`x &lt; −${C(n)} (inside of the root negative)`, `x &lt; −${C(n)} (binnekant van die wortel negatief)`), L(`x = −${C(n)}`, `x = −${C(n)}`), L(`x = ${C(m)}`, `x = ${C(m)}`)],
        { hint: L("Undefined is about the BOTTOM: set the denominator equal to 0.", "Onbepaald gaan oor die ONDERKANT: stel die noemer gelyk aan 0."),
          answerLabel: L(`Undefined = denominator 0: x + ${C(m)} = 0 → x = −${C(m)}. (x < −${C(n)} is where it's NON-real — a different question!)`, `Onbepaald = noemer 0: x + ${C(m)} = 0 → x = −${C(m)}. (x < −${C(n)} is waar dit NIE-REËEL is: 'n ander vraag!)`),
          solution: [
            { s: L("Undefined has one cause only: dividing by 0 — the ghost under the bed", "Onbepaald het net een oorsaak: deel deur 0, die spook onder die bed") },
            { s: L(`So look at the BOTTOM and set it to 0: x + ${C(m)} = 0`, `Kyk dus na die ONDERKANT en stel dit gelyk aan 0: x + ${C(m)} = 0`) },
            { s: L(`x = −${C(m)}`, `x = −${C(m)}`), r: L(`the root is a different question — that one gives NON-real, at x &lt; −${C(n)}`, `die wortel is 'n ander vraag: daardie een gee NIE-REËEL, by x &lt; −${C(n)}`) },
          ] });
    }
    return mc(DIF, L(`For which x is <b>${expr}</b> NON-REAL?`, `Vir watter x is <b>${expr}</b> NIE-REËEL?`),
      L(`x &lt; −${C(n)} (the inside of the root is negative)`, `x &lt; −${C(n)} (die binnekant van die wortel is negatief)`),
      [L(`x = −${C(m)} (denominator 0)`, `x = −${C(m)} (noemer 0)`), L(`x > −${C(n)}`, `x > −${C(n)}`), L(`x = −${C(n)}`, `x = −${C(n)}`)],
      { hint: L("Non-real is about the ROOT: set what's under it less than 0.", "Nie-reëel gaan oor die WORTEL: stel wat daaronder is kleiner as 0."),
        answerLabel: L(`Non-real = negative inside the root: x + ${C(n)} < 0 → x < −${C(n)}. (x = −${C(m)} is where it's UNDEFINED — a different question!)`, `Nie-reëel = negatief binne die wortel: x + ${C(n)} < 0 → x < −${C(n)}. (x = −${C(m)} is waar dit ONBEPAALD is: 'n ander vraag!)`),
        solution: [
          { s: L("Non-real has one cause only: a negative sitting under an even root", "Nie-reëel het net een oorsaak: 'n negatief wat onder 'n ewe wortel sit") },
          { s: L(`So look INSIDE the root and make it negative: x + ${C(n)} &lt; 0`, `Kyk dus BINNE die wortel en maak dit negatief: x + ${C(n)} &lt; 0`) },
          { s: L(`x &lt; −${C(n)}`, `x &lt; −${C(n)}`), r: L(`the denominator is a different question — that one gives UNDEFINED, at x = −${C(m)}`, `die noemer is 'n ander vraag: daardie een gee ONBEPAALD, by x = −${C(m)}`) },
        ] });
  },
};

export const questEq8 = {
  id: "eq8",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["knowDiff", "whereUndefined"].includes(id) ? DIF : DIS,
    gen,
  })),
};
