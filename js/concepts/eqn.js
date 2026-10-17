/* Concept cards: Equations & Inequalities (chapter id "eqn"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_EQN = {
  /* ===================== EQUATIONS & INEQUALITIES ===================== */
  eqStdForm: {
    title: L("Standard form & the calculator's EQN mode", "Standaardvorm & die sakrekenaar se EQN-modus"),
    body: L(`
      <p>Almost every quadratic starts the same way: take everything to ONE side so the other side is 0.</p>
      <div class="formula">ax² + bx + c = 0</div>
      <p><b>Calculator (EQN mode):</b> MODE → <b>5: EQN</b> → <b>3: aX² + bX + c = 0</b> (option 4 is the CUBIC — wrong one!) → type a, b and c <b>each with its own sign</b> → read the roots X₁ and X₂.</p>
      <p><b>Root → factor:</b> put the OPPOSITE sign in the bracket. A fraction root: the denominator multiplies the x, the numerator crosses over with the opposite sign.</p>
      <div class="eg">X₁ = ½ → (2x − 1). &nbsp; X₂ = −3 → (x + 3). &nbsp; So 2x² + 5x − 3 = (2x − 1)(x + 3).</div>`, `
      <p>Byna elke kwadratiese vergelyking begin dieselfde: bring alles na EEN kant sodat die ander kant 0 is.</p>
      <div class="formula">ax² + bx + c = 0</div>
      <p><b>Sakrekenaar (EQN-modus):</b> MODE → <b>5: EQN</b> → <b>3: aX² + bX + c = 0</b> (opsie 4 is die KUBIESE een, verkeerd!) → tik a, b en c in, <b>elkeen met sy eie teken</b> → lees die wortels X₁ en X₂ af.</p>
      <p><b>Wortel → faktor:</b> sit die TEENOORGESTELDE teken in die hakie. 'n Breukwortel: die noemer vermenigvuldig die x, die teller gaan oor met die teenoorgestelde teken.</p>
      <div class="eg">X₁ = ½ → (2x − 1). &nbsp; X₂ = −3 → (x + 3). &nbsp; Dus 2x² + 5x − 3 = (2x − 1)(x + 3).</div>`),
  },
  eqZeroProduct: {
    title: L("Brackets = 0: the zero-product rule", "Hakies = 0: die nulproduk-reël"),
    body: L(`
      <p>A product is 0 <b>only</b> when at least one of its factors is 0. So when brackets multiply to 0:</p>
      <ul>
        <li>It's already factorised — <b>don't multiply out</b>, and don't divide a factor away (that deletes an answer).</li>
        <li>Set <b>each bracket = 0</b> on its own and solve it.</li>
        <li>A lonely x in front is a factor too: x(x + 5) = 0 gives x = 0 as one of the answers.</li>
      </ul>
      <p><b>Warning:</b> the rule ONLY works against 0. (x − 3)(x + 2) = 6 may NOT be split up — lots of pairs multiply to 6. First rearrange so one side is 0.</p>
      <div class="eg">x(2x − 5)(−x + 2) = 0 → x = 0, or 2x = 5 so x = 5/2, or −x = −2 so x = 2.</div>`, `
      <p>'n Produk is <b>net</b> 0 as ten minste een van sy faktore 0 is. Dus, as hakies se produk 0 is:</p>
      <ul>
        <li>Dit is reeds gefaktoriseer: <b>moenie uitvermenigvuldig nie</b>, en moenie 'n faktor wegdeel nie (dit vee 'n antwoord uit).</li>
        <li>Stel <b>elke hakie = 0</b> apart en los dit op.</li>
        <li>'n Eensame x voor is ook 'n faktor: x(x + 5) = 0 gee x = 0 as een van die antwoorde.</li>
      </ul>
      <p><b>Pasop:</b> die reël werk NET teen 0. (x − 3)(x + 2) = 6 mag NIE opgedeel word nie: baie pare vermenigvuldig tot 6. Herrangskik eers sodat een kant 0 is.</p>
      <div class="eg">x(2x − 5)(−x + 2) = 0 → x = 0, of 2x = 5 dus x = 5/2, of −x = −2 dus x = 2.</div>`),
  },
  eqSpecialCases: {
    title: L("The special quadratics: no b, no c, x² = negative", "Spesiale kwadratiese vergelykings: geen b, geen c, x² = negatief"),
    body: L(`
      <ul>
        <li><b>No b (middle) term:</b> difference of squares, or square-root both sides — and KEEP the ±. x² − 4 = 0 → x = ±2.</li>
        <li><b>No c (constant) term:</b> take out the common factor. x² + 5x = 0 → x(x + 5) = 0 → x = 0 or x = −5. <b>Never divide by x</b> — that throws the x = 0 answer away.</li>
        <li><b>x² = a negative number:</b> no real solution — a square is never negative. x² + 5 = 0 → x² = −5 → no real solution.</li>
      </ul>`, `
      <ul>
        <li><b>Geen b (middelterm):</b> verskil van twee vierkante, of trek die vierkantswortel van albei kante, en HOU die ±. x² − 4 = 0 → x = ±2.</li>
        <li><b>Geen c (konstante term):</b> haal die gemene faktor uit. x² + 5x = 0 → x(x + 5) = 0 → x = 0 of x = −5. <b>Moet nooit deur x deel nie</b>: dit gooi die antwoord x = 0 weg.</li>
        <li><b>x² = 'n negatiewe getal:</b> geen reële oplossing, want 'n kwadraat is nooit negatief nie. x² + 5 = 0 → x² = −5 → geen reële oplossing.</li>
      </ul>`),
  },
  eqExpBrackets: {
    title: L("Exponent brackets: same base, and the impossible ones", "Eksponent-hakies: dieselfde grondtal, en die onmoontlikes"),
    body: L(`
      <p>When a bracket in factor form contains an exponent, set it = 0 and solve:</p>
      <ul>
        <li><b>Make the bases the same</b>, then equate the exponents: 3ˣ = √27 = √(3³) = 3^(3/2) → x = 3/2. And 3ˣ = 1 = 3⁰ → x = 0.</li>
        <li><b>A power with a positive base can never be negative:</b> 2ˣ = −4 has NO solution — that bracket contributes nothing.</li>
        <li><b>Rational exponents:</b> raise both sides to the reciprocal — and watch for ±. x^(2/3) = 16 means (∛x)² = 16, so ∛x = ±4, so x = ±64. The EVEN power on top hides the sign; an odd top keeps one answer.</li>
      </ul>
      <div class="eg">(x² − 5)(2ˣ − 16) = 0 → x = ±√5 (two answers) or 2ˣ = 2⁴ → x = 4. Three real solutions.</div>`, `
      <p>As 'n hakie in faktorvorm 'n eksponent bevat, stel dit = 0 en los op:</p>
      <ul>
        <li><b>Maak die grondtalle dieselfde</b>, stel dan die eksponente gelyk: 3ˣ = √27 = √(3³) = 3^(3/2) → x = 3/2. En 3ˣ = 1 = 3⁰ → x = 0.</li>
        <li><b>'n Mag met 'n positiewe grondtal kan nooit negatief wees nie:</b> 2ˣ = −4 het GEEN oplossing nie, daardie hakie dra niks by nie.</li>
        <li><b>Rasionale eksponente:</b> verhef albei kante tot die resiprook, en pasop vir ±. x^(2/3) = 16 beteken (∛x)² = 16, dus ∛x = ±4, dus x = ±64. Die EWE mag bo steek die teken weg; 'n onewe getal bo hou een antwoord.</li>
      </ul>
      <div class="eg">(x² − 5)(2ˣ − 16) = 0 → x = ±√5 (twee antwoorde) of 2ˣ = 2⁴ → x = 4. Drie reële oplossings.</div>`),
  },
  eqKMethod: {
    title: L("The k-method (a stand-in for a repeated bracket)", "Die k-metode ('n plaasvervanger vir 'n herhaalde hakie)"),
    body: L(`
      <p>Use it when the <b>same expression appears two or more times</b>.</p>
      <ol>
        <li>Let k = the repeated expression (the plain bracket, not its square).</li>
        <li>The equation becomes a simple quadratic in k — solve for k.</li>
        <li><b>You're not done!</b> Replace k with the bracket and solve each little equation for x.</li>
        <li>A restriction on the bracket (from a denominator) rides along on k — reject a k that breaks it (N.A.).</li>
      </ol>
      <p><b>How many answers?</b> The highest power tells you the most to expect: x² → 2, x³ → 3, x⁴ → 4 (equal roots count once).</p>
      <div class="eg">(x² − x)² − 8(x² − x) + 12 = 0 → k² − 8k + 12 = 0 → k = 6 or 2 → x² − x = 6 gives x = 3 or −2; x² − x = 2 gives x = 2 or −1.</div>`, `
      <p>Gebruik dit as <b>dieselfde uitdrukking twee of meer keer voorkom</b>.</p>
      <ol>
        <li>Stel k = die herhaalde uitdrukking (die gewone hakie, nie sy kwadraat nie).</li>
        <li>Die vergelyking word 'n eenvoudige kwadratiese vergelyking in k: los op vir k.</li>
        <li><b>Jy is nog nie klaar nie!</b> Vervang k met die hakie en los elke klein vergelyking op vir x.</li>
        <li>'n Beperking op die hakie (van 'n noemer) geld ook vir k: verwerp 'n k wat dit breek (n.v.t.).</li>
      </ol>
      <p><b>Hoeveel antwoorde?</b> Die hoogste mag sê hoeveel jy op die meeste kan verwag: x² → 2, x³ → 3, x⁴ → 4 (gelyke wortels tel een keer).</p>
      <div class="eg">(x² − x)² − 8(x² − x) + 12 = 0 → k² − 8k + 12 = 0 → k = 6 of 2 → x² − x = 6 gee x = 3 of −2; x² − x = 2 gee x = 2 of −1.</div>`),
  },
  eqFractions: {
    title: L("Fraction equations: factorise, LCD, clear", "Breukvergelykings: faktoriseer, KGV, breuke weg"),
    body: L(`
      <ol>
        <li><b>Factorise every numerator and denominator</b> first.</li>
        <li>Watch for the <b>negative twin</b>: 9 − x² = −(x² − 9). Take out the −1 so denominators match.</li>
        <li>Build the <b>LCD</b>: each different factor once, at its highest power.</li>
        <li>State the <b>restrictions</b> (denominator ≠ 0) BEFORE solving.</li>
        <li>Multiply <b>EVERY term</b> (both sides, including the lonely numbers) by the LCD — the fractions vanish.</li>
        <li>Solve, then <b>reject</b> any answer that equals a restriction (N.A.).</li>
      </ol>
      <div class="eg">10/x + 3x/(x − 2) = 7 (x ≠ 0; x ≠ 2) → 10(x − 2) + 3x² = 7x(x − 2) → x² − 6x + 5 = 0 → x = 5 or x = 1 (both allowed).</div>`, `
      <ol>
        <li><b>Faktoriseer elke teller en noemer</b> eers.</li>
        <li>Pasop vir die <b>negatiewe tweeling</b>: 9 − x² = −(x² − 9). Haal die −1 uit sodat die noemers ooreenstem.</li>
        <li>Bou die <b>KGV</b>: elke verskillende faktor een keer, met sy hoogste mag.</li>
        <li>Skryf die <b>beperkings</b> (noemer ≠ 0) neer VOORDAT jy oplos.</li>
        <li>Vermenigvuldig <b>ELKE term</b> (albei kante, ook die eensame getalle) met die KGV: die breuke verdwyn.</li>
        <li>Los op, en <b>verwerp</b> dan enige antwoord wat gelyk is aan 'n beperking (n.v.t.).</li>
      </ol>
      <div class="eg">10/x + 3x/(x − 2) = 7 (x ≠ 0; x ≠ 2) → 10(x − 2) + 3x² = 7x(x − 2) → x² − 6x + 5 = 0 → x = 5 of x = 1 (albei toegelaat).</div>`),
  },
  eqRestrictions: {
    title: L("Restrictions & N.A.", "Beperkings & n.v.t."),
    body: L(`
      <p>Any x that makes a denominator 0 is banned — division by 0 is <b>undefined</b> (the ghost under the bed).</p>
      <ul>
        <li>Find them by setting <b>each denominator = 0</b>.</li>
        <li>State them <b>before</b> you solve — they belong to the original equation.</li>
        <li>An answer that equals a restriction is rejected: mark it <b>N.A.</b> and keep only the valid one(s). The other answers survive — one rejection does not kill the rest.</li>
      </ul>`, `
      <p>Enige x wat 'n noemer 0 maak, is verbode: deling deur 0 is <b>onbepaald</b> (die spook onder die bed).</p>
      <ul>
        <li>Vind hulle deur <b>elke noemer = 0</b> te stel.</li>
        <li>Skryf hulle neer <b>voordat</b> jy oplos: hulle behoort aan die oorspronklike vergelyking.</li>
        <li>'n Antwoord wat gelyk is aan 'n beperking, word verwerp: merk dit <b>n.v.t.</b> en hou net die geldige een(e). Die ander antwoorde bly staan: een verwerping maak nie die res dood nie.</li>
      </ul>`),
  },
  eqPerfectSquare: {
    title: L("Perfect squares & completing the square", "Volkome vierkante & voltooiing van die vierkant"),
    body: L(`
      <p>A perfect square trinomial packs into one bracket squared. The sign inside <b>matches the middle term</b>: x² − 6x + 9 = (x − 3)².</p>
      <div class="formula">completing constant: c = (b/2)² &nbsp;… only when the coefficient of x² is 1!</div>
      <p>With a coefficient on x², <b>factor it out first</b>. Matching x² + bx + c = (x + k)²: 2k = b (sign included!) and c = k². For x² − 13x + c: k = −13/2 (negative!), c = 169/4.</p>
      <p><b>Solving by completing the square:</b></p>
      <ol>
        <li>No coefficient (and no negative) in front of x² — divide it away.</li>
        <li>Constant across to the right.</li>
        <li>Add (b/2)² to <b>both</b> sides.</li>
        <li>Pack the left into (x ± …)².</li>
        <li>√ both sides — <b>remember ±</b> — and finish.</li>
      </ol>
      <div class="eg">−x² + 10x − 22 = 0 → x² − 10x = −22 → +25 both sides → (x − 5)² = 3 → x = 5 ± √3.</div>`, `
      <p>'n Drieterm wat 'n volkome vierkant is, pak in een hakie, gekwadreer. Die teken binne <b>pas by die middelterm</b>: x² − 6x + 9 = (x − 3)².</p>
      <div class="formula">konstante om te voltooi: c = (b/2)² &nbsp;… net as die koëffisiënt van x² 1 is!</div>
      <p>Met 'n koëffisiënt by x², <b>haal dit eers uit</b>. Vergelyk x² + bx + c = (x + k)²: 2k = b (teken ingesluit!) en c = k². Vir x² − 13x + c: k = −13/2 (negatief!), c = 169/4.</p>
      <p><b>Oplos deur die vierkant te voltooi:</b></p>
      <ol>
        <li>Geen koëffisiënt (en geen negatief) voor x² nie: deel dit weg.</li>
        <li>Konstante oor na regs.</li>
        <li>Tel (b/2)² by <b>albei</b> kante.</li>
        <li>Pak die linkerkant in as (x ± …)².</li>
        <li>√ albei kante, <b>onthou ±</b>, en maak klaar.</li>
      </ol>
      <div class="eg">−x² + 10x − 22 = 0 → x² − 10x = −22 → +25 albei kante → (x − 5)² = 3 → x = 5 ± √3.</div>`),
  },
  eqTPForm: {
    title: L("Turning-point form: reading TP(p ; q)", "Draaipunt-vorm: DP(p ; q) aflees"),
    body: L(`
      <div class="formula">y = a(x − p)² + q &nbsp;→&nbsp; TP(p ; q)</div>
      <ul>
        <li><b>p flips:</b> read it with the OPPOSITE sign of what's in the bracket. (x + 4) → p = −4.</li>
        <li><b>q keeps its own sign</b> — never flip q. <span class="nowrap">… − 1 → q = −1</span>.</li>
        <li>In words: p is WHERE the turning point is (x-value), q is WHAT it is (y-value).</li>
        <li>a &gt; 0 → happy parabola (opens up) → the TP is a <b>minimum</b>. a &lt; 0 → sad → <b>maximum</b>.</li>
      </ul>
      <div class="eg">y = 2(x + 4)² − 1 → TP(−4 ; −1), a minimum. NOT (−4 ; 1)!</div>`, `
      <div class="formula">y = a(x − p)² + q &nbsp;→&nbsp; DP(p ; q)</div>
      <ul>
        <li><b>p draai om:</b> lees dit met die TEENOORGESTELDE teken van wat in die hakie staan. (x + 4) → p = −4.</li>
        <li><b>q hou sy eie teken</b>: draai q nooit om nie. <span class="nowrap">… − 1 → q = −1</span>.</li>
        <li>In woorde: p sê WAAR die draaipunt is (x-waarde), q sê WAT dit is (y-waarde).</li>
        <li>a &gt; 0 → happy parabool (oop na bo) → die DP is 'n <b>minimum</b>. a &lt; 0 → sad → <b>maksimum</b>.</li>
      </ul>
      <div class="eg">y = 2(x + 4)² − 1 → DP(−4 ; −1), 'n minimum. NIE (−4 ; 1) nie!</div>`),
  },
  eqFormula: {
    title: L("The quadratic formula", "Die kwadratiese formule"),
    body: L(`
      <div class="formula">x = ( −b ± √(b² − 4ac) ) / 2a</div>
      <ul>
        <li>Use it when the trinomial <b>won't factorise</b> (decimals asked = a big hint).</li>
        <li>Always write the <b>formula</b>, then the <b>substitution line</b> — a, b and c in brackets, <b>each with its own sign</b>. For x² − 2x − 1 = 0: a = 1, b = −2, c = −1 (not +1!).</li>
        <li>EQN mode may check the values, but the two written lines earn the marks.</li>
        <li>Round only the FINAL answers: two decimals, decimal comma (e.g. 2,41).</li>
      </ul>`, `
      <div class="formula">x = ( −b ± √(b² − 4ac) ) / 2a</div>
      <ul>
        <li>Gebruik dit as die drieterm <b>nie wil faktoriseer nie</b> (desimale gevra = 'n groot wenk).</li>
        <li>Skryf altyd die <b>formule</b>, dan die <b>reël met die vervanging</b>: a, b en c in hakies, <b>elkeen met sy eie teken</b>. Vir x² − 2x − 1 = 0: a = 1, b = −2, c = −1 (nie +1 nie!).</li>
        <li>EQN-modus kan die waardes toets, maar die twee geskrewe reëls verdien die punte.</li>
        <li>Rond net die FINALE antwoorde af: twee desimale, desimale komma (bv. 2,41).</li>
      </ul>`),
  },
  eqSimultaneous: {
    title: L("Simultaneous equations (substitution)", "Gelyktydige vergelykings (vervanging)"),
    body: L(`
      <ol>
        <li>Make one variable the subject of the <b>simpler (linear)</b> equation.</li>
        <li>Substitute that expression into the other equation.</li>
        <li>Solve the one-variable equation (with a quadratic you can get up to TWO x-values).</li>
        <li>Back-substitute each x into the linear subject to find its partner y.</li>
        <li>Write each solution as a <b>coordinate pair</b> (x ; y).</li>
      </ol>
      <div class="eg">3x + 2y = 3 and 2x − y = 9 → y = 2x − 9 → 3x + 2(2x − 9) = 3 → 7x = 21 → x = 3, y = −3 → (3 ; −3).</div>`, `
      <ol>
        <li>Maak een veranderlike die onderwerp van die <b>eenvoudiger (lineêre)</b> vergelyking.</li>
        <li>Vervang daardie uitdrukking in die ander vergelyking.</li>
        <li>Los die vergelyking met een veranderlike op (met 'n kwadratiese kan jy tot TWEE x-waardes kry).</li>
        <li>Vervang elke x terug in die lineêre vergelyking om sy maat, y, te kry.</li>
        <li>Skryf elke oplossing as 'n <b>koördinaatpaar</b> (x ; y).</li>
      </ol>
      <div class="eg">3x + 2y = 3 en 2x − y = 9 → y = 2x − 9 → 3x + 2(2x − 9) = 3 → 7x = 21 → x = 3, y = −3 → (3 ; −3).</div>`),
  },
  eqLinIneq: {
    title: L("Linear inequalities: when the sign flips", "Lineêre ongelykhede: wanneer die teken omdraai"),
    body: L(`
      <p><b>The key rule:</b> multiply or divide both sides by a NEGATIVE → switch the direction of the inequality sign. (Adding/subtracting never flips.)</p>
      <ul>
        <li>−6x &lt; 4 → divide by −6 and flip → x &gt; −2/3.</li>
        <li><b>Compound:</b> do every operation to ALL THREE parts. −5 ≤ 1 − 3x &lt; 10 → subtract 1 → divide by −3, flipping BOTH signs → 2 ≥ x &gt; −3, written naturally: −3 &lt; x ≤ 2.</li>
        <li><b>Number line:</b> open circle = not included (&lt;, &gt;); filled circle = included (≤, ≥).</li>
      </ul>`, `
      <p><b>Die sleutelreël:</b> vermenigvuldig albei kante met, of deel hulle deur, 'n NEGATIEF → draai die ongelykheidsteken om. (Optel/aftrek draai dit nooit om nie.)</p>
      <ul>
        <li>−6x &lt; 4 → deel deur −6 en draai om → x &gt; −2/3.</li>
        <li><b>Saamgesteld:</b> doen elke bewerking aan AL DRIE dele. −5 ≤ 1 − 3x &lt; 10 → trek 1 af → deel deur −3 en draai BEIDE tekens om → 2 ≥ x &gt; −3, natuurlik geskryf: −3 &lt; x ≤ 2.</li>
        <li><b>Getallelyn:</b> oop sirkel = nie ingesluit nie (&lt;, &gt;); gevulde sirkel = ingesluit (≤, ≥).</li>
      </ul>`),
  },
  eqQuadIneq: {
    title: L("Quadratic inequalities: CP and the bowl", "Kwadratiese ongelykhede: kritieke waardes en die bak"),
    body: L(`
      <p><b>Set-up:</b> everything to the left (0 right) → NO negative in front of x² (divide by −1 and flip) → factorise → <b>CP</b>: each factor = 0 → sketch the bowl (or calculator INEQ mode).</p>
      <ul>
        <li>Expression <b>&lt; 0</b> → below the axis → <b>inside the bowl</b>: a &lt; x &lt; b.</li>
        <li>Expression <b>&gt; 0</b> → above the axis → <b>to the left / right</b>: x &lt; a or x &gt; b. Two pieces join with <b>or</b>, never "and".</li>
        <li>≤ / ≥ keep the CPs in the answer.</li>
        <li><b>Look out for (4 − x):</b> it hides a −x². Take out −1 and FLIP: (x − 3)(4 − x) ≥ 0 → (x − 3)(x − 4) ≤ 0.</li>
        <li><b>A repeated bracket:</b> (x − 3)² &gt; 0 has one CP only → true everywhere except there → x ∈ ℝ, x ≠ 3.</li>
        <li><b>Brackets with a number on the right,</b> e.g. (x + 1)(x + 2) ≤ 20: the CPs are NOT −1 and −2! Multiply out, bring the 20 across, and factorise again.</li>
      </ul>`, `
      <p><b>Opstel:</b> alles na links (0 regs) → GEEN negatief voor x² nie (deel deur −1 en draai om) → faktoriseer → <b>kritieke waardes</b>: elke faktor = 0 → skets die bak (of die sakrekenaar se INEQ-modus).</p>
      <ul>
        <li>Uitdrukking <b>&lt; 0</b> → onder die as → <b>binne die bak</b>: a &lt; x &lt; b.</li>
        <li>Uitdrukking <b>&gt; 0</b> → bo die as → <b>links / regs</b>: x &lt; a of x &gt; b. Twee stukke word met <b>of</b> verbind, nooit "en" nie.</li>
        <li>≤ / ≥ hou die kritieke waardes in die antwoord.</li>
        <li><b>Pasop vir (4 − x):</b> dit steek 'n −x² weg. Haal −1 uit en DRAAI OM: (x − 3)(4 − x) ≥ 0 → (x − 3)(x − 4) ≤ 0.</li>
        <li><b>'n Herhaalde hakie:</b> (x − 3)² &gt; 0 het net een kritieke waarde → oral waar behalwe daar → x ∈ ℝ, x ≠ 3.</li>
        <li><b>Hakies met 'n getal regs,</b> bv. (x + 1)(x + 2) ≤ 20: die kritieke waardes is NIE −1 en −2 nie! Vermenigvuldig uit, bring die 20 oor, en faktoriseer weer.</li>
      </ul>`),
  },
  eqDiscriminant: {
    title: L("Nature of the roots: Δ = b² − 4ac", "Aard van die wortels: Δ = b² − 4ac"),
    body: L(`
      <p>Δ (delta) is the part under the root in the formula. Its sign tells you how the parabola meets the x-axis — without solving.</p>
      <ul>
        <li><b>Δ &lt; 0:</b> non-real roots — the graph never cuts the x-axis.</li>
        <li><b>Δ = 0:</b> real, rational, EQUAL roots — it touches once, at the TP.</li>
        <li><b>Δ &gt; 0, perfect square:</b> real, rational, unequal — cuts twice, nicely.</li>
        <li><b>Δ &gt; 0, not a perfect square:</b> real, irrational, unequal — cuts twice with surds.</li>
        <li><b>Δ ≥ 0:</b> real (equal or unequal together).</li>
      </ul>
      <p><b>The 3 question types:</b> ① work out Δ and classify. ② nature GIVEN → write the matching Δ condition and solve for the unknown. ③ PROVE the nature → complete the square on Δ, e.g. (p − 2)² + 4 ≥ 4 &gt; 0 always.</p>
      <p><b>Check parameter answers against the original equation</b> — a k that makes a denominator 0 (or kills the x² term) is rejected.</p>`, `
      <p>Δ (delta) is die deel onder die wortel in die formule. Sy teken sê vir jou hoe die parabool die x-as ontmoet, sonder om op te los.</p>
      <ul>
        <li><b>Δ &lt; 0:</b> nie-reële wortels. Die grafiek sny nooit die x-as nie.</li>
        <li><b>Δ = 0:</b> reële, rasionale, GELYKE wortels. Dit raak een keer, by die DP.</li>
        <li><b>Δ &gt; 0, volkome vierkant:</b> reëel, rasionaal, ongelyk. Sny twee keer, netjies.</li>
        <li><b>Δ &gt; 0, nie 'n volkome vierkant nie:</b> reëel, irrasionaal, ongelyk. Sny twee keer, met wortelvorme.</li>
        <li><b>Δ ≥ 0:</b> reëel (gelyk en ongelyk saam).</li>
      </ul>
      <p><b>Die 3 soorte vrae:</b> ① bereken Δ en klassifiseer. ② aard GEGEE → skryf die ooreenstemmende Δ-voorwaarde en los op vir die onbekende. ③ BEWYS die aard → voltooi die vierkant op Δ, bv. (p − 2)² + 4 ≥ 4 &gt; 0 altyd.</p>
      <p><b>Toets parameter-antwoorde teen die oorspronklike vergelyking</b>: 'n k wat 'n noemer 0 maak (of die x²-term uitwis), word verwerp.</p>`),
  },
  eqKnowDiff: {
    title: L("KNOW THE DIFFERENCE!!", "KEN DIE VERSKIL!!"),
    body: L(`
      <ul>
        <li><b>No solution</b> — the statement can NEVER be true. 3ˣ = −1 (a positive base can't go negative).</li>
        <li><b>Undefined</b> — a denominator equals 0 (the ghost under the bed). Find it: denominator = 0.</li>
        <li><b>Non-real</b> — a negative sits under a square root. √(−4). Find it: inside of the root &lt; 0.</li>
        <li><b>Not applicable (N.A.)</b> — a candidate answer is REJECTED: it breaks a restriction or fails the original surd equation.</li>
      </ul>
      <div class="eg">√(x + 3)/(x + 1): undefined at x = −1 (bottom = 0); non-real for x &lt; −3 (inside the root negative). Two different questions!</div>`, `
      <ul>
        <li><b>Geen oplossing</b>: die bewering kan NOOIT waar wees nie. 3ˣ = −1 ('n positiewe grondtal kan nie negatief word nie).</li>
        <li><b>Onbepaald</b>: 'n noemer is gelyk aan 0 (die spook onder die bed). Vind dit: noemer = 0.</li>
        <li><b>Nie-reëel</b>: 'n negatief sit onder 'n vierkantswortel. √(−4). Vind dit: binne die wortel &lt; 0.</li>
        <li><b>Nie van toepassing (n.v.t.)</b>: 'n moontlike antwoord word VERWERP, want dit breek 'n beperking of werk nie in die oorspronklike wortelvormvergelyking nie.</li>
      </ul>
      <div class="eg">√(x + 3)/(x + 1): onbepaald by x = −1 (onderkant = 0); nie-reëel vir x &lt; −3 (binne die wortel negatief). Twee verskillende vrae!</div>`),
  },
  /* eq9 "Two, one or no solution?" (2026-08-23) — her two handwritten
     pages on equations with rational exponents, boxes and all. The three
     rules below are her "Important Notes" box verbatim, examples
     included; the worked lines are her page 2. */
  eqSolutionCount: {
    title: L("Two, one or no solution?", "Twee, een of geen oplossing?"),
    body: L(`
      <p><b>Equations with rational exponents.</b> Multiply with the <b>reciprocal</b> of the exponent &mdash; switch numerator and denominator, so <span class="sfrac"><span class="sf-n">3</span><span class="sf-d">4</span></span> × <span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span> = 1 (cancels out) and x is left on its own.</p>
      <p>Before you solve anything, look at the fraction on top of the x and at the sign on the right. That alone tells you how many answers there are:</p>
      <ul>
        <li><b>Even numerator → ± answer.</b> x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">7</span></span></sup> = 5 — two solutions.</li>
        <li><b>Only odd numbers</b> in the numerator and the denominator → ✓ a <b>negative answer is allowed</b> 🙂. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">3</span></span></sup> = −2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9 — one solution.</li>
        <li><b>An even number</b> in the numerator <b>or</b> the denominator, with a negative on the right → ✗ <b>no solution</b> 🙁. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4.</li>
      </ul>
      <p>The reason, in one line: x<sup>odd/even</sup> and x<sup>even/odd</sup> <b>≠ a negative number</b>. Ask it of a real number and you can see it: √16 is 4, never −4 — an even root cannot be negative only.</p>
      <div class="formula">x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 4 &nbsp;→&nbsp; (<sup>3</sup>√(x²))³ = (4)³ &nbsp;→&nbsp; √(x²) = √64 &nbsp;→&nbsp; x = ±8</div>
      <div class="eg">And the three that go the other way.<br>Only odd numbers, so a negative answer is allowed:<br>x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9 → (<sup>7</sup>√(x⁵))⁷ = (−9)⁷ → <sup>5</sup>√(x⁵) = <sup>5</sup>√(−4 782 969) → x = −21,67<br>An even numerator with a negative — cannot happen:<br>x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4 → <sup>4</sup>√(x⁴) = <sup>4</sup>√(−64)<br>An even denominator with a negative — cannot happen:<br>x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 → <sup>2</sup>√(x¹) = −3 ✗</div>`, `
      <p><b>Vergelykings met rasionale eksponente.</b> Vermenigvuldig met die <b>resiprook</b> van die eksponent &mdash; ruil die teller en noemer om, sodat <span class="sfrac"><span class="sf-n">3</span><span class="sf-d">4</span></span> × <span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span> = 1 (dit kanselleer) en x alleen oorbly.</p>
      <p>Voordat jy enigiets oplos, kyk na die breuk bo-op die x en na die teken regs. Dit alleen sê vir jou hoeveel antwoorde daar is:</p>
      <ul>
        <li><b>Ewe teller → ± antwoord.</b> x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">7</span></span></sup> = 5: twee oplossings.</li>
        <li><b>Net onewe getalle</b> in die teller en die noemer → ✓ 'n <b>negatiewe antwoord is toegelaat</b> 🙂. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">3</span></span></sup> = −2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9: een oplossing.</li>
        <li><b>'n Ewe getal</b> in die teller <b>of</b> die noemer, met 'n negatief regs → ✗ <b>geen oplossing</b> 🙁. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4.</li>
      </ul>
      <p>Die rede, in een reël: x<sup>onewe/ewe</sup> en x<sup>ewe/onewe</sup> <b>≠ 'n negatiewe getal</b>. Probeer dit met 'n regte getal en jy sien dit: √16 is 4, nooit −4 nie. 'n Ewe wortel kan nie net negatief wees nie.</p>
      <div class="formula">x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 4 &nbsp;→&nbsp; (<sup>3</sup>√(x²))³ = (4)³ &nbsp;→&nbsp; √(x²) = √64 &nbsp;→&nbsp; x = ±8</div>
      <div class="eg">En die drie wat anders uitwerk.<br>Net onewe getalle, so 'n negatiewe antwoord is toegelaat:<br>x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9 → (<sup>7</sup>√(x⁵))⁷ = (−9)⁷ → <sup>5</sup>√(x⁵) = <sup>5</sup>√(−4 782 969) → x = −21,67<br>'n Ewe teller met 'n negatief, dit kan nie gebeur nie:<br>x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4 → <sup>4</sup>√(x⁴) = <sup>4</sup>√(−64)<br>'n Ewe noemer met 'n negatief, dit kan nie gebeur nie:<br>x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 → <sup>2</sup>√(x¹) = −3 ✗</div>`),
  },

};
