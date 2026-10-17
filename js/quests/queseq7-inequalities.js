/* ============================================================
   EQUATIONS & INEQUALITIES · Q7 — Inequalities: flip & the bowl
   ------------------------------------------------------------
   Linear: switch the sign when ×/÷ by a negative, compound
   inequalities, open vs filled circles. Quadratic: the set-up
   rules, CP from = 0, and reading the answer off a TO-SCALE
   shaded parabola — inside the bowl vs to the left/right —
   plus the (4 − x) hidden-negative and (x − 3)² special cases.
   ============================================================ */
import {
  mc, ynQ, pick, randInt, C, frac,
  randRoots, factorStr, bowlGraph, ineqBetween, ineqOutside,
} from "./_eq.js";
import { L } from "../lang.js";

const LIN = "eqLinIneq";
const QUA = "eqQuadIneq";

const SKILLS = {
  /* when does the sign switch? */
  flipWhen: () => {
    const items = [
      { q: L("When solving an inequality, WHEN must you switch the direction of the sign?", "As jy 'n ongelykheid oplos, WANNEER moet jy die rigting van die teken omdraai?"), correct: L("When you multiply or divide both sides by a NEGATIVE number", "As jy albei kante met 'n NEGATIEWE getal vermenigvuldig of deel"), wrongs: [L("Whenever you move a term across", "Elke keer as jy 'n term oorbring"), L("When you add a negative number to both sides", "As jy 'n negatiewe getal by albei kante tel"), L("Every time there is a fraction", "Elke keer as daar 'n breuk is")], ans: L("Only × or ÷ by a negative flips the sign. Adding/subtracting anything, or ×/÷ by a positive, leaves the sign alone.", "Net × of ÷ met 'n negatief draai die teken om. Enigiets optel/aftrek, of ×/÷ met 'n positief, laat die teken net so."),
        sol: [{ s: L("Start from something true: 2 &lt; 5", "Begin by iets wat waar is: 2 &lt; 5") },
              { s: L("Multiply both sides by −1: −2 and −5. On the number line −2 sits to the RIGHT of −5, so now −2 > −5", "Vermenigvuldig albei kante met −1: −2 en −5. Op die getallelyn lê −2 REGS van −5, dus nou −2 > −5") },
              { s: L("The order really did reverse, so the sign must reverse with it", "Die volgorde het regtig omgedraai, dus moet die teken saam omdraai"), r: L("adding or subtracting slides both sides equally and changes no order", "optel of aftrek skuif albei kante ewe ver en verander geen volgorde nie") }] },
      { q: L("You divide both sides of <b>6x &lt; 18</b> by 6. Does the sign flip?", "Jy deel albei kante van <b>6x &lt; 18</b> deur 6. Draai die teken om?"), correct: L("No — dividing by a POSITIVE number never flips the sign", "Nee: deel deur 'n POSITIEWE getal draai nooit die teken om nie"), wrongs: [L("Yes — dividing always flips", "Ja: deel draai altyd om"), L("Yes — 18 is bigger than 6", "Ja: 18 is groter as 6"), L("Only if x is negative", "Net as x negatief is")], ans: L("6 is positive, so nothing flips: x < 3. The flip is reserved for × or ÷ by a NEGATIVE.", "6 is positief, dus draai niks om nie: x < 3. Die omdraai is net vir × of ÷ met 'n NEGATIEF."),
        sol: [{ s: L("Ask only one thing: is the number you are dividing by negative?", "Vra net een ding: is die getal waardeur jy deel negatief?") },
              { s: L("6 is positive, so the order of the two sides is untouched", "6 is positief, dus bly die volgorde van die twee kante onveranderd") },
              { s: L("6x &lt; 18  →  x &lt; 3, sign unchanged", "6x &lt; 18  →  x &lt; 3, teken onveranderd"), r: L("the size of the number makes no difference — only its sign does", "die grootte van die getal maak geen verskil nie, net sy teken") }] },
      ynQ(LIN,
        L("Subtracting 9x from both sides of an inequality flips the sign. True?", "As jy 9x van albei kante van 'n ongelykheid aftrek, draai die teken om. Waar?"),
        false,
        { hint: L("Adding or subtracting never flips.", "Optel of aftrek draai nooit om nie."),
          answerLabel: L("False — moving terms across (adding/subtracting) never flips the sign. Only MULTIPLYING or DIVIDING by a negative does.", "Onwaar: terme oorbring (optel/aftrek) draai nooit die teken om nie. Net VERMENIGVULDIG of DEEL met 'n negatief doen dit."),
          solution: [
            { s: L("Subtracting the same thing from both sides slides both of them the same distance along the number line", "As jy dieselfde ding van albei kante aftrek, skuif albei ewe ver langs die getallelyn") },
            { s: L("Sliding both by the same amount cannot change which one is bigger", "As albei ewe ver skuif, kan dit nie verander watter een groter is nie") },
            { s: L("∴ false — only × or ÷ by a NEGATIVE reverses the order, and so the sign", "∴ onwaar: net × of ÷ met 'n NEGATIEF keer die volgorde om, en dus die teken") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(LIN, it.q, it.correct, it.wrongs,
      { hint: L("× or ÷ with a negative = switch direction.", "× of ÷ met 'n negatief = draai die rigting om."), answerLabel: it.ans, solution: it.sol });
  },

  /* apply the flip — fresh numbers */
  flipApply: () => {
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    let a = randInt(2, 6), bb = randInt(1, 9);
    while (gcd(a, bb) !== 1) bb = randInt(1, 9);        // the fraction −b/a arrives already simplified
    const prompt = L(`Solve for x: <b>−${C(a)}x &lt; ${C(bb)}</b>`, `Los op vir x: <b>−${C(a)}x &lt; ${C(bb)}</b>`);
    const correct = L(`x > −${frac(bb, a)}`, `x > −${frac(bb, a)}`);
    const wrongs = [
      L(`x &lt; −${frac(bb, a)}`, `x &lt; −${frac(bb, a)}`),
      L(`x > ${frac(bb, a)}`, `x > ${frac(bb, a)}`),
      L(`x &lt; ${frac(bb, a)}`, `x &lt; ${frac(bb, a)}`),
    ];
    return mc(LIN, prompt, correct, wrongs,
      { hint: L("Divide both sides by the NEGATIVE coefficient — and switch the sign as you do.", "Deel albei kante deur die NEGATIEWE koëffisiënt, en draai die teken om terwyl jy dit doen."),
        answerLabel: L(`Divide by −${C(a)} and flip: x > −${frac(bb, a)}.`, `Deel deur −${C(a)} en draai om: x > −${frac(bb, a)}.`),
        solution: [
          { s: L(`To get x alone you must divide both sides by −${C(a)}`, `Om x alleen te kry, moet jy albei kante deur −${C(a)} deel`) },
          { s: L(`That divisor is NEGATIVE, so the sign switches direction as you divide`, `Daardie deler is NEGATIEF, dus draai die teken se rigting om terwyl jy deel`), r: L("&lt; becomes >", "&lt; word >") },
          { s: L(`x > −${frac(bb, a)}`, `x > −${frac(bb, a)}`), r: L("x on the left, and the fraction is already in lowest terms", "x aan die linkerkant, en die breuk is reeds in sy eenvoudigste vorm") },
        ] });
  },

  /* compound inequality */
  compound: () => {
    const items = [
      { q: L("Solve <b>−5 ≤ 1 − 3x &lt; 10</b>. After subtracting 1 from ALL THREE parts you divide by −3. What happens?", "Los op: <b>−5 ≤ 1 − 3x &lt; 10</b>. Nadat jy 1 van AL DRIE dele afgetrek het, deel jy deur −3. Wat gebeur?"), correct: L("BOTH inequality signs flip: 2 ≥ x > −3", "ALBEI ongelykheidstekens draai om: 2 ≥ x > −3"), wrongs: [L("Only the left sign flips", "Net die linkerteken draai om"), L("Nothing flips — division is by 3", "Niks draai om nie: jy deel deur 3"), L("The middle and right swap places", "Die middel en regs ruil plek")], ans: L("Dividing all three parts by −3 flips BOTH signs: −6 ≤ −3x < 9 becomes 2 ≥ x > −3, i.e. −3 < x ≤ 2.", "As jy al drie dele deur −3 deel, draai ALBEI tekens om: −6 ≤ −3x < 9 word 2 ≥ x > −3, d.w.s. −3 < x ≤ 2.") },
      { q: L("You end a compound inequality with <b>2 ≥ x > −3</b>. How should the final answer be written?", "Jy eindig 'n saamgestelde ongelykheid met <b>2 ≥ x > −3</b>. Hoe moet die finale antwoord geskryf word?"), correct: L("−3 &lt; x ≤ 2 (natural left-to-right order)", "−3 &lt; x ≤ 2 (natuurlike volgorde, links na regs)"), wrongs: [L("2 ≥ x > −3 is already the final form", "2 ≥ x > −3 is reeds die finale vorm"), L("x ≤ 2 or x > −3", "x ≤ 2 of x > −3"), L("−3 > x ≥ 2", "−3 > x ≥ 2")], ans: L("Rewrite in natural number-line order, small to large: −3 < x ≤ 2.", "Herskryf in die getallelyn se natuurlike volgorde, klein na groot: −3 < x ≤ 2.") },
      ynQ(LIN,
        L("In a compound inequality like −5 ≤ 1 − 3x < 10, every operation must be done to ALL THREE parts. True?", "In 'n saamgestelde ongelykheid soos −5 ≤ 1 − 3x < 10 moet elke bewerking op AL DRIE dele gedoen word. Waar?"),
        true,
        { hint: L("It's a sandwich — all three layers move together.", "Dis 'n toebroodjie: al drie lae beweeg saam."),
          answerLabel: L("True — subtract the 1 from all three parts, divide all three by −3 (flipping both signs).", "Waar: trek die 1 van al drie dele af, deel al drie deur −3 (en draai albei tekens om).") }),
    ];
    const it = pick(items);
    return it.type ? it : mc(LIN, it.q, it.correct, it.wrongs,
      { hint: L("All three parts together; ÷ by negative flips BOTH signs; finish in natural order.", "Al drie dele saam; ÷ deur 'n negatief draai ALBEI tekens om; eindig in natuurlike volgorde."), answerLabel: it.ans });
  },

  /* number line circles */
  circles: () => {
    const items = [
      { q: L("On a number line, what does an OPEN circle at an endpoint mean?", "Wat beteken 'n OOP sirkel by 'n eindpunt op 'n getallelyn?"), correct: L("The endpoint is NOT included (&lt; or >)", "Die eindpunt is NIE ingesluit nie (&lt; of >)"), wrongs: [L("The endpoint is included (≤ or ≥)", "Die eindpunt is ingesluit (≤ of ≥)"), L("The answer is undefined there", "Die antwoord is daar onbepaald"), L("The graph continues forever", "Die grafiek gaan vir altyd aan")], ans: L("Open circle = not included (strict < or >). Filled circle = included (≤ or ≥).", "Oop sirkel = nie ingesluit nie (streng < of >). Gevulde sirkel = ingesluit (≤ of ≥)."),
        sol: [{ s: L("The circle's job is to say whether the endpoint itself is part of the answer", "Die sirkel se werk is om te sê of die eindpunt self deel van die antwoord is") },
              { s: L("A strict sign (&lt; or >) means x gets as close as it likes but never lands there", "'n Streng teken (&lt; of >) beteken x kom so naby as wat hy wil, maar land nooit daar nie") },
              { s: L("So the circle is drawn hollow — open", "Dus word die sirkel hol geteken: oop"), r: L("≤ or ≥ would fill it in", "≤ of ≥ sou dit invul") }] },
      { q: L("Which endpoints does <b>−3 &lt; x ≤ 2</b> put on the number line?", "Watter eindpunte sit <b>−3 &lt; x ≤ 2</b> op die getallelyn?"), correct: L("Open circle at −3, filled circle at 2", "Oop sirkel by −3, gevulde sirkel by 2"), wrongs: [L("Filled circle at −3, open circle at 2", "Gevulde sirkel by −3, oop sirkel by 2"), L("Open circles at both", "Oop sirkels by albei"), L("Filled circles at both", "Gevulde sirkels by albei")], ans: L("< at −3 → open (not included); ≤ at 2 → filled (included).", "< by −3 → oop (nie ingesluit nie); ≤ by 2 → gevul (ingesluit)."),
        sol: [{ s: L("Take the two ends one at a time", "Vat die twee ente een vir een") },
              { s: L("At −3 the sign is &lt;, strict, so −3 itself is not allowed — open circle", "By −3 is die teken &lt;, streng, dus is −3 self nie toegelaat nie: oop sirkel") },
              { s: L("At 2 the sign is ≤, so 2 IS allowed — filled circle", "By 2 is die teken ≤, dus IS 2 toegelaat: gevulde sirkel"), r: L("then shade the stretch between them", "kleur dan die stuk tussen hulle in") }] },
    ];
    const it = pick(items);
    return mc(LIN, it.q, it.correct, it.wrongs,
      { hint: L("Strict sign → open circle. 'Or equal' sign → filled circle.", "Streng teken → oop sirkel. 'Of gelyk aan'-teken → gevulde sirkel."), answerLabel: it.ans, solution: it.sol });
  },

  /* quadratic inequality set-up */
  setup: () => {
    const items = [
      { q: L("Setting up a QUADRATIC inequality before sketching the bowl — which list is right?", "Jy stel 'n KWADRATIESE ongelykheid op voordat jy die bak skets: watter lys is reg?"), correct: L("Everything to the left (0 on the right); no negative in front of x²; CP from = 0", "Alles na links (0 regs); geen negatief voor x² nie; kritieke waardes uit = 0"), wrongs: [L("Everything to the right; negative x² is fine; CP from < 0", "Alles na regs; negatiewe x² is reg; kritieke waardes uit < 0"), L("Divide by x first; then factorise; CP from = 0", "Deel eers deur x; faktoriseer dan; kritieke waardes uit = 0"), L("Sketch first, factorise afterwards", "Skets eers, faktoriseer daarna")], ans: L("The routine: 0 on the right → kill any negative in front of x² (divide by −1 and FLIP) → factorise → CP: each factor = 0 → sketch/calculator.", "Die roetine: 0 regs → raak ontslae van enige negatief voor x² (deel deur −1 en DRAAI OM) → faktoriseer → kritieke waardes: elke faktor = 0 → skets/sakrekenaar."),
        sol: [{ s: L("① Take everything to the left so 0 sits on the right", "① Bring alles na links sodat 0 regs staan"), r: L("the bowl picture is about where the curve is above or below the axis", "die bak-prentjie gaan oor waar die kurwe bo of onder die as is") },
              { s: L("② No negative in front of x²: divide it away and change the direction of the sign", "② Geen negatief voor x² nie: deel dit weg en draai die rigting van die teken om") },
              { s: L("③ Factorise, then ④ CP must be =: set each factor equal to 0", "③ Faktoriseer, dan ④ kritieke waardes moet = wees: stel elke faktor gelyk aan 0") },
              { s: L("Only then sketch the bowl and read the region off it", "Skets eers dan die bak en lees die gebied daarvan af"), r: L("her TIP Chips checklist, in that order", "haar TIP Chips-kontrolelys, in daardie volgorde") }] },
      { q: L("Where do the critical points (CP) of a quadratic inequality come from?", "Waar kom die kritieke waardes van 'n kwadratiese ongelykheid vandaan?"), correct: L("Setting each factor equal to 0 — an EQUATION, even though the question is an inequality", "Stel elke faktor gelyk aan 0: 'n VERGELYKING, al is die vraag 'n ongelykheid"), wrongs: [L("Setting each factor &lt; 0", "Stel elke faktor &lt; 0"), L("The turning point of the parabola", "Die draaipunt van die parabool"), L("The y-intercept", "Die y-afsnit")], ans: L("CP come from factor = 0. The inequality only decides WHICH region between/outside the CPs you keep.", "Kritieke waardes kom uit faktor = 0. Die ongelykheid besluit net WATTER gebied tussen/buite hulle jy hou."),
        sol: [{ s: L("The critical points are where the curve actually crosses the x-axis", "Die kritieke waardes is waar die kurwe werklik die x-as sny") },
              { s: L("Crossing means the value is 0, so each factor is set = 0 — an equation, even though the question is an inequality", "Sny beteken die waarde is 0, dus word elke faktor = 0 gestel: 'n vergelyking, al is die vraag 'n ongelykheid") },
              { s: L("The inequality sign has a different job: it decides which side of those points you shade", "Die ongelykheidsteken het 'n ander werk: dit besluit aan watter kant van daardie punte jy inkleur"), r: L("CP must be =", "kritieke waardes moet = wees") }] },
      ynQ(QUA,
        L("There is a negative in front of x². You divide every term by −1 — does the inequality sign flip?", "Daar is 'n negatief voor x². Jy deel elke term deur −1: draai die ongelykheidsteken om?"),
        true,
        { hint: L("÷ by a negative…", "÷ deur 'n negatief…"),
          answerLabel: L("Yes — dividing by −1 flips the sign: −x² + 3x − 2 ≥ 0 becomes x² − 3x + 2 ≤ 0.", "Ja: deel deur −1 draai die teken om, −x² + 3x − 2 ≥ 0 word x² − 3x + 2 ≤ 0."),
          solution: [
            { s: L("−1 is a negative number, and dividing by a negative always reverses the order", "−1 is 'n negatiewe getal, en deel deur 'n negatief keer altyd die volgorde om") },
            { s: L("Every term goes through it, including the 0 on the right", "Elke term gaan daardeur, ook die 0 aan die regterkant"), r: L("0 ÷ −1 is still 0", "0 ÷ −1 is steeds 0") },
            { s: L("−x² + 3x − 2 ≥ 0 becomes x² − 3x + 2 ≤ 0", "−x² + 3x − 2 ≥ 0 word x² − 3x + 2 ≤ 0"), r: L("∴ yes, it flips — the whole point of dividing the negative away", "∴ ja, dit draai om: dis juis hoekom jy die negatief wegdeel") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: L("Left side, positive x², CP = 0, then sketch.", "Linkerkant, positiewe x², kritieke waardes = 0, dan skets."), answerLabel: it.ans, solution: it.sol });
  },

  /* ★ read the answer off the sketch — INSIDE the bowl */
  readInside: () => {
    const [r1, r2] = randRoots();
    const strict = pick([true, false]);
    const sign = strict ? "&lt;" : "≤";
    const correct = strict ? ineqBetween(r1, r2) : L(`${C(r1)} ≤ x ≤ ${C(r2)}`, `${C(r1)} ≤ x ≤ ${C(r2)}`);
    const wrongs = [
      strict ? ineqOutside(r1, r2) : L(`x ≤ ${C(r1)} or x ≥ ${C(r2)}`, `x ≤ ${C(r1)} of x ≥ ${C(r2)}`),
      strict ? L(`${C(r1)} ≤ x ≤ ${C(r2)}`, `${C(r1)} ≤ x ≤ ${C(r2)}`) : ineqBetween(r1, r2),
      strict ? L(`x &lt; ${C(r2)} only`, `net x &lt; ${C(r2)}`) : L(`x ≤ ${C(r2)} only`, `net x ≤ ${C(r2)}`),
    ];
    return mc(QUA,
      L(`<b>${factorStr(r1, r2)} ${sign} 0</b>. The sketch shades the solution. Read it off.`, `<b>${factorStr(r1, r2)} ${sign} 0</b>. Die skets kleur die oplossing in. Lees dit af.`),
      correct, wrongs,
      { hint: L(`The expression must be ${strict ? "NEGATIVE" : "negative or 0"} — the bowl dips below the axis BETWEEN its critical points.`, `Die uitdrukking moet ${strict ? "NEGATIEF" : "negatief of 0"} wees: die bak sak TUSSEN sy kritieke waardes onder die as in.`),
        answerLabel: L(`Below the axis = inside the bowl: ${correct}${strict ? "" : " (≤ keeps the critical points in)"}.`, `Onder die as = binne die bak: ${correct}${strict ? "" : " (≤ hou die kritieke waardes in)"}.`),
        solution: [
          { s: L(`CP: set each bracket = 0  →  x = ${C(r1)} or x = ${C(r2)}`, `Kritieke waardes: stel elke hakie = 0  →  x = ${C(r1)} of x = ${C(r2)}`) },
          { s: L(`The sign is ${sign} 0, so you want the parts where the bowl sits BELOW the axis`, `Die teken is ${sign} 0, dus soek jy die dele waar die bak ONDER die as lê`) },
          { s: L(`A happy bowl only dips below between its two critical points`, `'n Happy bak sak net tussen sy twee kritieke waardes onder die as in`), r: L("her words: inside of bowl — x lies between", "haar woorde: binne die bak, x lê tussen") },
          { s: `∴ ${correct}`, r: strict ? L("strict signs, so the critical points themselves are out", "streng tekens, dus is die kritieke waardes self uit") : L("≤ keeps the critical points in", "≤ hou die kritieke waardes in") },
        ],
        graph: bowlGraph(r1, r2, "inside") });
  },

  /* ★ read the answer off the sketch — OUTSIDE (left/right) */
  readOutside: () => {
    const [r1, r2] = randRoots();
    const strict = pick([true, false]);
    const sign = strict ? ">" : "≥";
    const correct = strict ? ineqOutside(r1, r2) : L(`x ≤ ${C(r1)} or x ≥ ${C(r2)}`, `x ≤ ${C(r1)} of x ≥ ${C(r2)}`);
    const wrongs = [
      strict ? ineqBetween(r1, r2) : L(`${C(r1)} ≤ x ≤ ${C(r2)}`, `${C(r1)} ≤ x ≤ ${C(r2)}`),
      L(`x ${strict ? "&lt;" : "≤"} ${C(r1)} AND x ${strict ? ">" : "≥"} ${C(r2)}`, `x ${strict ? "&lt;" : "≤"} ${C(r1)} EN x ${strict ? ">" : "≥"} ${C(r2)}`),
      strict ? L(`x > ${C(r2)} only`, `net x > ${C(r2)}`) : L(`x ≥ ${C(r2)} only`, `net x ≥ ${C(r2)}`),
    ];
    return mc(QUA,
      L(`<b>${factorStr(r1, r2)} ${sign} 0</b>. The sketch shades the solution. Read it off.`, `<b>${factorStr(r1, r2)} ${sign} 0</b>. Die skets kleur die oplossing in. Lees dit af.`),
      correct, wrongs,
      { hint: L("Positive = ABOVE the axis — the two arms to the left and right of the bowl. Two pieces need the word OR.", "Positief = BO die as: die twee arms links en regs van die bak. Twee stukke het die woord OF nodig."),
        answerLabel: L(`Above the axis = outside the CPs: ${correct}. Two separate pieces MUST be joined with "or" — no x can be in both at once, so "and" is impossible.`, `Bo die as = buite die kritieke waardes: ${correct}. Twee aparte stukke MOET met "of" verbind word: geen x kan tegelyk in albei wees nie, dus is "en" onmoontlik.`),
        solution: [
          { s: L(`CP: set each bracket = 0  →  x = ${C(r1)} or x = ${C(r2)}`, `Kritieke waardes: stel elke hakie = 0  →  x = ${C(r1)} of x = ${C(r2)}`) },
          { s: L(`The sign is ${sign} 0, so you want the parts where the bowl sits ABOVE the axis`, `Die teken is ${sign} 0, dus soek jy die dele waar die bak BO die as lê`) },
          { s: L(`That is both arms — to the LEFT of ${C(r1)} and to the RIGHT of ${C(r2)}`, `Dit is albei arms: LINKS van ${C(r1)} en REGS van ${C(r2)}`), r: L("her words: outside of bowl; &lt; points left, > points right", "haar woorde: buite die bak; &lt; wys links, > wys regs") },
          { s: `∴ ${correct}`, r: L("two separate stretches, so they are joined with “or”, never “and”", "twee aparte stukke, dus word hulle met “of” verbind, nooit “en” nie") },
        ],
        graph: bowlGraph(r1, r2, "outside") });
  },

  /* "or", never "and" */
  orNotAnd: () => {
    const items = [
      ynQ(QUA,
        L("A two-piece answer may be written “x ≤ 0 <b>and</b> x ≥ 6”. True?", "'n Antwoord in twee stukke mag as “x ≤ 0 <b>en</b> x ≥ 6” geskryf word. Waar?"),
        false,
        { hint: L("Can one x be in both pieces at the same time?", "Kan een x tegelyk in albei stukke wees?"),
          answerLabel: L("False — no number is ≤ 0 AND ≥ 6 at once. Two separate pieces are joined with OR: x ≤ 0 or x ≥ 6.", "Onwaar: geen getal is tegelyk ≤ 0 EN ≥ 6 nie. Twee aparte stukke word met OF verbind: x ≤ 0 of x ≥ 6."),
          solution: [
            { s: L("“And” means one single x would have to satisfy both pieces at the same moment", "“En” beteken een enkele x sou albei stukke op dieselfde oomblik moes bevredig") },
            { s: L("Try to find one: it would have to be 0 or below AND 6 or above — no such number exists", "Probeer een kry: dit sou 0 of laer EN 6 of hoër moes wees, en so 'n getal bestaan nie") },
            { s: L("∴ false — write x ≤ 0 or x ≥ 6", "∴ onwaar: skryf x ≤ 0 of x ≥ 6"), r: L("her ruling: never leave it in the calculator's semicolon form", "haar reël: los dit nooit in die sakrekenaar se kommapunt-vorm nie") },
          ] }),
      { q: L("Why must a two-piece solution use <b>or</b> instead of <b>and</b>?", "Hoekom moet 'n oplossing in twee stukke <b>of</b> gebruik in plaas van <b>en</b>?"), correct: L("No single x can satisfy both pieces at once — each x lives in ONE piece", "Geen enkele x kan albei stukke tegelyk bevredig nie: elke x woon in EEN stuk"), wrongs: [L("'And' is just slang for 'or' here", "'En' is hier net slengtaal vir 'of'"), L("Because the pieces overlap", "Omdat die stukke oorvleuel"), L("It's tradition with no reason", "Dis tradisie sonder 'n rede")], ans: L("'And' means both at the same time — impossible for x ≤ 0 and x ≥ 6. Each solution sits in one piece OR the other.", "'En' beteken albei tegelyk: onmoontlik vir x ≤ 0 en x ≥ 6. Elke oplossing lê in die een stuk OF die ander."),
        sol: [{ s: L("Picture the two shaded arms on the number line — they never touch", "Sien die twee ingekleurde arms op die getallelyn: hulle raak nooit nie") },
              { s: L("Any single x you pick lands in one arm or the other, never in both", "Enige x wat jy kies, land in die een arm of die ander, nooit in albei nie") },
              { s: L("“And” would demand both at once, which is impossible, so the joining word is OR", "“En” sou albei tegelyk eis, wat onmoontlik is, dus is die verbindingswoord OF") }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: L("Two pieces → OR.", "Twee stukke → OF."), answerLabel: it.ans, solution: it.sol });
  },

  /* the (4 − x) hidden negative */
  hiddenNeg: () => {
    const r = randInt(2, 5), s = r + randInt(1, 4);
    const items = [
      { q: L(`<b>(x − ${C(r)})(${C(s)} − x) ≥ 0</b>. What is hiding in the second bracket?`, `<b>(x − ${C(r)})(${C(s)} − x) ≥ 0</b>. Wat skuil in die tweede hakie?`), correct: L(`A negative x² — rewrite (${C(s)} − x) as −(x − ${C(s)}), so the inequality FLIPS to (x − ${C(r)})(x − ${C(s)}) ≤ 0`, `'n Negatiewe x²: herskryf (${C(s)} − x) as −(x − ${C(s)}), dus DRAAI die ongelykheid OM na (x − ${C(r)})(x − ${C(s)}) ≤ 0`), wrongs: [L("Nothing — factorised form is ready for CPs as is", "Niks: die gefaktoriseerde vorm is reg vir kritieke waardes soos dit is"), L(`The bracket just means x = ${C(s)} is a CP, sign unchanged`, `Die hakie beteken net x = ${C(s)} is 'n kritieke waarde, teken onveranderd`), L("A fraction that must be cleared first", "'n Breuk wat eers weggewerk moet word")], ans: L(`(${C(s)} − x) expanded gives −x². Take out the −1 (and flip!): (x − ${C(r)})(x − ${C(s)}) ≤ 0, giving ${C(r)} ≤ x ≤ ${C(s)}.`, `(${C(s)} − x) uitgebrei gee −x². Haal die −1 uit (en draai om!): (x − ${C(r)})(x − ${C(s)}) ≤ 0, wat ${C(r)} ≤ x ≤ ${C(s)} gee.`),
        sol: [{ s: L(`Multiply out in pencil: x·(−x) gives −x², so there IS a negative in front of the square`, `Vermenigvuldig uit in potlood: x·(−x) gee −x², dus IS daar 'n negatief voor die kwadraat`) },
              { s: L(`Take −1 out of the second bracket: (${C(s)} − x) = −(x − ${C(s)})`, `Haal −1 uit die tweede hakie: (${C(s)} − x) = −(x − ${C(s)})`) },
              { s: L(`That −1 divides away and FLIPS the sign: (x − ${C(r)})(x − ${C(s)}) ≤ 0`, `Daardie −1 word weggedeel en DRAAI die teken OM: (x − ${C(r)})(x − ${C(s)}) ≤ 0`) },
              { s: L(`CP x = ${C(r)} and x = ${C(s)}, inside the bowl: ${C(r)} ≤ x ≤ ${C(s)}`, `Kritieke waardes x = ${C(r)} en x = ${C(s)}, binne die bak: ${C(r)} ≤ x ≤ ${C(s)}`) }] },
      ynQ(QUA,
        L(`A bracket like (${C(s)} − x) can be used directly for the bowl sketch without any adjustment. True?`, `'n Hakie soos (${C(s)} − x) kan sonder enige aanpassing reguit vir die bak-skets gebruik word. Waar?`),
        false,
        { hint: L("Multiply the brackets out in pencil — what is the coefficient of x²?", "Vermenigvuldig die hakies in potlood uit: wat is die koëffisiënt van x²?"),
          answerLabel: L(`False — (${C(s)} − x) hides a NEGATIVE x², and the bowl method needs a positive one. Take −1 out of that bracket and flip the inequality sign.`, `Onwaar: (${C(s)} − x) steek 'n NEGATIEWE x² weg, en die bak-metode het 'n positiewe een nodig. Haal −1 uit daardie hakie en draai die ongelykheidsteken om.`),
          solution: [
            { s: L(`Check the x² coefficient before sketching anything: an x times the −x in (${C(s)} − x) gives −x²`, `Kyk na die koëffisiënt van x² voordat jy iets skets: 'n x maal die −x in (${C(s)} − x) gee −x²`) },
            { s: L(`A negative x² is a SAD parabola, and the bowl reading assumes a happy one`, `'n Negatiewe x² is 'n SAD parabool, en die bak-aflees aanvaar 'n happy een`) },
            { s: L(`∴ false — take the −1 out first: (${C(s)} − x) = −(x − ${C(s)}), and flip the sign as it goes`, `∴ onwaar: haal eers die −1 uit, (${C(s)} − x) = −(x − ${C(s)}), en draai die teken om terwyl dit uitgaan`) },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: L("(a − x) hides −x². Take out −1 and flip.", "(a − x) steek −x² weg. Haal −1 uit en draai om."), answerLabel: it.ans, solution: it.sol });
  },

  /* brackets that are NOT against 0 — expand first, factorise again */
  expandFirst: () => {
    const items = [
      { q: L("<b>(x + 1)(x + 2) ≤ 20</b>. The left side is already in brackets. May you take the critical points straight from them?", "<b>(x + 1)(x + 2) ≤ 20</b>. Die linkerkant is reeds in hakies. Mag jy die kritieke waardes reguit daaruit haal?"), correct: L("No — the brackets equal 20, not 0. Multiply out, bring the 20 across, factorise AGAIN", "Nee: die hakies is gelyk aan 20, nie 0 nie. Vermenigvuldig uit, bring die 20 oor, faktoriseer WEER"), wrongs: [L("Yes — the CPs are x = −1 and x = −2", "Ja: die kritieke waardes is x = −1 en x = −2"), L("Yes, as long as you flip the inequality sign first", "Ja, solank jy eers die ongelykheidsteken omdraai"), L("No — first divide both sides by (x + 1)", "Nee: deel eers albei kante deur (x + 1)")], ans: L("Brackets only speak against 0. Expand: x² + 3x + 2 ≤ 20 → x² + 3x − 18 ≤ 0 → (x + 6)(x − 3) ≤ 0 → −6 ≤ x ≤ 3. (Notice −1 and −2 appear nowhere in the real answer!)", "Hakies praat net teenoor 0. Brei uit: x² + 3x + 2 ≤ 20 → x² + 3x − 18 ≤ 0 → (x + 6)(x − 3) ≤ 0 → −6 ≤ x ≤ 3. (Let op: −1 en −2 kom nêrens in die regte antwoord voor nie!)") },
      { q: L("When brackets multiply to something OTHER than 0 (like … ≤ 20), what is the routine?", "As hakies tot iets ANDERS as 0 vermenigvuldig (soos … ≤ 20), wat is die roetine?"), correct: L("Expand, bring everything to the left so 0 sits on the right, then factorise the NEW trinomial", "Brei uit, bring alles na links sodat 0 regs staan, faktoriseer dan die NUWE drieterm"), wrongs: [L("Read the CPs off the brackets as they stand", "Lees die kritieke waardes van die hakies af soos hulle staan"), L("Set each bracket ≤ 20 on its own", "Stel elke hakie op sy eie ≤ 20"), L("Divide both sides by one of the brackets", "Deel albei kante deur een van die hakies")], ans: L("Same discipline as equations: the zero-product idea (and the bowl's CPs) only work against 0. Expand → 0 on the right → factorise again → CPs → sketch.", "Dieselfde dissipline as by vergelykings: die nulproduk-idee (en die bak se kritieke waardes) werk net teenoor 0. Brei uit → 0 regs → faktoriseer weer → kritieke waardes → skets.") },
      ynQ(QUA,
        L("For <b>(x + 1)(x + 2) ≤ 20</b> a learner writes “x + 1 ≤ 20 or x + 2 ≤ 20”. Is that method legal?", "Vir <b>(x + 1)(x + 2) ≤ 20</b> skryf 'n leerder “x + 1 ≤ 20 of x + 2 ≤ 20”. Is daardie metode wettig?"),
        false,
        { hint: L("Does splitting a product over its factors work against 20?", "Werk dit om 'n produk oor sy faktore op te breek teenoor 20?"),
          answerLabel: L("No — splitting up brackets is only legal against 0 (zero-product rule). Expand and rearrange: x² + 3x − 18 ≤ 0 → (x + 6)(x − 3) ≤ 0 → −6 ≤ x ≤ 3.", "Nee: hakies opbreek is net wettig teenoor 0 (nulproduk-reël). Brei uit en herrangskik: x² + 3x − 18 ≤ 0 → (x + 6)(x − 3) ≤ 0 → −6 ≤ x ≤ 3.") }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: L("Brackets = 20 is NOT brackets = 0. Expand, rearrange to 0, factorise again.", "Hakies = 20 is NIE hakies = 0 nie. Brei uit, herrangskik na 0, faktoriseer weer."), answerLabel: it.ans });
  },

  /* fractions inside an inequality — the square denominator & the restriction */
  fracIneq: () => {
    const m = randInt(2, 5);
    const items = [
      { q: L(`Why may <b>(${C(m * m)} − x²)/x² ≥ 0</b> be read straight off the NUMERATOR (${C(m * m)} − x² ≥ 0)?`, `Hoekom mag <b>(${C(m * m)} − x²)/x² ≥ 0</b> reguit van die TELLER (${C(m * m)} − x² ≥ 0) afgelees word?`), correct: L("x² is positive for every x ≠ 0, so the fraction's sign IS the numerator's sign", "x² is positief vir elke x ≠ 0, dus IS die breuk se teken die teller se teken"), wrongs: [L("The denominator always cancels the numerator", "Die noemer kanselleer altyd die teller"), L("Fractions in inequalities may always be ignored", "Breuke in ongelykhede mag altyd geïgnoreer word"), L("Because the numerator is bigger", "Omdat die teller groter is")], ans: L(`A square denominator is positive for every non-zero x, so dividing by it never changes the sign. Solve ${C(m * m)} − x² ≥ 0 — but CARRY x ≠ 0 into the final answer.`, `'n Kwadraat-noemer is positief vir elke x ≠ 0, dus verander deel daardeur nooit die teken nie. Los ${C(m * m)} − x² ≥ 0 op, maar DRA x ≠ 0 oor na die finale antwoord.`),
        sol: [{ s: L("Dividing only flips an inequality when the divisor is NEGATIVE", "Deel draai 'n ongelykheid net om as die deler NEGATIEF is") },
              { s: L("x² is a square, so it is positive for every x except 0 — it can never be negative", "x² is 'n kwadraat, dus is dit positief vir elke x behalwe 0: dit kan nooit negatief wees nie") },
              { s: L(`So the sign of the whole fraction is the sign of the top: solve ${C(m * m)} − x² ≥ 0`, `Dus is die teken van die hele breuk die teken van die bokant: los ${C(m * m)} − x² ≥ 0 op`) },
              { s: L("Then carry x ≠ 0 into the answer after a semicolon", "Dra dan x ≠ 0 oor na die antwoord, ná 'n kommapunt"), r: L("the denominator's restriction never disappears", "die noemer se beperking verdwyn nooit nie") }] },
      { q: L("An inequality has x in a DENOMINATOR. What must ride along into the final answer?", "'n Ongelykheid het x in 'n NOEMER. Wat moet saamry na die finale antwoord?"), correct: L("The restriction (e.g. x ≠ 0) — even if the rest of the interval includes it", "Die beperking (bv. x ≠ 0), selfs as die res van die interval dit insluit"), wrongs: [L("Nothing — restrictions are only for equations", "Niks: beperkings is net vir vergelykings"), L("A ± sign", "'n ±-teken"), L("The LCD", "Die KGV")], ans: L("A denominator's restriction belongs to the original inequality, so the final answer must exclude it: e.g. −3 ≤ x ≤ 3 with x ≠ 0.", "'n Noemer se beperking behoort aan die oorspronklike ongelykheid, dus moet die finale antwoord dit uitsluit: bv. −3 ≤ x ≤ 3 met x ≠ 0."),
        sol: [{ s: L("The banned value comes from the ORIGINAL inequality, before any working", "Die verbode waarde kom uit die OORSPRONKLIKE ongelykheid, voor enige bewerking") },
              { s: L("Clearing or simplifying the fraction hides the denominator, but it does not un-ban that x", "As jy die breuk wegwerk of vereenvoudig, verdwyn die noemer, maar daardie x bly verbode") },
              { s: L("So the restriction is written after a semicolon: −3 ≤ x ≤ 3 ; x ≠ 0", "Dus word die beperking ná 'n kommapunt geskryf: −3 ≤ x ≤ 3 ; x ≠ 0"), r: L("even when the interval would otherwise swallow it", "selfs as die interval dit andersins sou insluk") }] },
      ynQ(QUA,
        L("A factor that appears in BOTH the numerator and the denominator simplifies away (it equals 1 for any non-zero value). True?", "'n Faktor wat in BEIDE die teller en die noemer voorkom, vereenvoudig weg (dit is 1 vir enige waarde behalwe 0). Waar?"),
        true,
        { hint: L("Anything non-zero over itself is 1.", "Enigiets (nie nul nie) gedeel deur homself is 1."),
          answerLabel: L("True — e.g. (x³ − 2x² − 3x)/x simplifies to x² − 2x − 3 for x ≠ 0. Simplify first, keep the restriction.", "Waar: bv. (x³ − 2x² − 3x)/x vereenvoudig na x² − 2x − 3 vir x ≠ 0. Vereenvoudig eers, hou die beperking."),
          solution: [
            { s: L("A factor that multiplies the WHOLE top and the WHOLE bottom is the same thing over itself, which is 1", "'n Faktor wat die HELE bokant en die HELE onderkant vermenigvuldig, is dieselfde ding oor homself, en dit is 1") },
            { s: L("(x³ − 2x² − 3x)/x = x(x² − 2x − 3)/x = x² − 2x − 3", "(x³ − 2x² − 3x)/x = x(x² − 2x − 3)/x = x² − 2x − 3"), r: L("the + and − are caged in the bracket first", "die + en − is eers in die hakie toegesluit") },
            { s: L("∴ true — but the x ≠ 0 that made it legal stays in the final answer", "∴ waar, maar die x ≠ 0 wat dit wettig gemaak het, bly in die finale antwoord") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: L("A square denominator can't change the sign; a denominator's restriction always survives.", "'n Kwadraat-noemer kan nie die teken verander nie; 'n noemer se beperking oorleef altyd."), answerLabel: it.ans, solution: it.sol });
  },

  /* the repeated factor / perfect square special case */
  perfectSquareIneq: () => {
    const r = randInt(1, 6) * pick([1, -1]);
    const br = r >= 0 ? L(`(x − ${C(r)})`, `(x − ${C(r)})`) : L(`(x + ${C(-r)})`, `(x + ${C(-r)})`);
    const prompt = L(`Solve <b>${br}² > 0</b>.`, `Los op: <b>${br}² > 0</b>.`);
    const correct = L(`x ∈ ℝ, x ≠ ${C(r)}`, `x ∈ ℝ, x ≠ ${C(r)}`);
    const wrongs = [
      L(`x > ${C(r)}`, `x > ${C(r)}`),
      L("No solution — a square can't be positive", "Geen oplossing: 'n kwadraat kan nie positief wees nie"),
      L(`x ∈ ℝ (every x works, including ${C(r)})`, `x ∈ ℝ (elke x werk, ook ${C(r)})`),
    ];
    return mc(QUA, prompt, correct, wrongs,
      { hint: L("A square is 0 or positive. Where is it exactly 0?", "'n Kwadraat is 0 of positief. Waar is dit presies 0?"),
        answerLabel: L(`${br}² is positive EVERYWHERE except at its one critical point x = ${C(r)}, where it is 0 (and 0 > 0 is false). So x ∈ ℝ, x ≠ ${C(r)}. Compare: two DIFFERENT brackets would give two CPs and an outside answer.`, `${br}² is OORAL positief behalwe by sy een kritieke waarde x = ${C(r)}, waar dit 0 is (en 0 > 0 is onwaar). Dus x ∈ ℝ, x ≠ ${C(r)}. Vergelyk: twee VERSKILLENDE hakies sou twee kritieke waardes en 'n buite-antwoord gee.`),
        solution: [
          { s: L(`Both brackets are the same, so there is only ONE critical point: x = ${C(r)}`, `Albei hakies is dieselfde, dus is daar net EEN kritieke waarde: x = ${C(r)}`) },
          { s: L(`A square is never negative, so ${br}² is positive for every other x`, `'n Kwadraat is nooit negatief nie, dus is ${br}² positief vir elke ander x`) },
          { s: L(`At x = ${C(r)} it is exactly 0, and 0 > 0 is false`, `By x = ${C(r)} is dit presies 0, en 0 > 0 is onwaar`), r: L("so that single point is thrown out", "dus word daardie enkele punt uitgegooi") },
          { s: L(`∴ x ∈ ℝ, x ≠ ${C(r)}`, `∴ x ∈ ℝ, x ≠ ${C(r)}`), r: L("the restriction rides after a semicolon", "die beperking volg ná 'n kommapunt") },
        ] });
  },
};

export const questEq7 = {
  id: "eq7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["flipWhen", "flipApply", "compound", "circles"].includes(id) ? LIN : QUA,
    gen,
  })),
};
