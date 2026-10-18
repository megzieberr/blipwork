/* Concept cards: Exponents & Surds (chapter id "exp"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_EXP = {
  /* ===================== EXPONENTS & SURDS ===================== */
  expLaws: {
    title: L("The exponent laws", "Die eksponentwette"),
    body: L(`
      <p>Every law is just bookkeeping on the exponents. They only work when the <b>bases are the same</b>.</p>
      <div class="formula">xᵃ·xᵇ = xᵃ⁺ᵇ &nbsp;(multiply → ADD)<br>
        xᵃ ÷ xᵇ = xᵃ⁻ᵇ &nbsp;(divide → SUBTRACT)<br>
        (xᵃ)ᵇ = xᵃᵇ &nbsp;(power of a power → MULTIPLY)<br>
        (xy)ᵃ = xᵃyᵃ &nbsp;·&nbsp; (x/y)ᵃ = xᵃ/yᵃ</div>
      <ul>
        <li><b>x⁰ = 1</b> (anything non-zero to the zero is 1). So 7x⁰ = 7·1 = 7.</li>
        <li><b>x⁻ᵃ = 1/xᵃ</b> — a negative exponent means “flip it”, not “make it negative”.</li>
        <li><b>(x/y)⁻ᵃ = (y/x)ᵃ</b> — flip the fraction, drop the sign.</li>
      </ul>
      <div class="eg">e.g. (2x³)² = 4x⁶ — the 2 is squared too. And 3⁻² = 1/3² = 1/9 (positive!).</div>`, `
      <p>Elke wet is net boekhouding met die eksponente. Hulle werk net as die <b>grondtalle dieselfde is</b>.</p>
      <div class="formula">xᵃ·xᵇ = xᵃ⁺ᵇ &nbsp;(vermenigvuldig → TEL OP)<br>
        xᵃ ÷ xᵇ = xᵃ⁻ᵇ &nbsp;(deel → TREK AF)<br>
        (xᵃ)ᵇ = xᵃᵇ &nbsp;(mag van 'n mag → VERMENIGVULDIG)<br>
        (xy)ᵃ = xᵃyᵃ &nbsp;·&nbsp; (x/y)ᵃ = xᵃ/yᵃ</div>
      <ul>
        <li><b>x⁰ = 1</b> (enigiets behalwe nul, tot die mag nul, is 1). Dus 7x⁰ = 7·1 = 7.</li>
        <li><b>x⁻ᵃ = 1/xᵃ</b>: 'n negatiewe eksponent beteken “draai dit om”, nie “maak dit negatief” nie.</li>
        <li><b>(x/y)⁻ᵃ = (y/x)ᵃ</b>: draai die breuk om, laat die teken weg.</li>
      </ul>
      <div class="eg">bv. (2x³)² = 4x⁶: die 2 word ook gekwadreer. En 3⁻² = 1/3² = 1/9 (positief!).</div>`),
  },
  expTraps: {
    title: L("The classic exponent traps", "Die klassieke eksponentslaggate"),
    body: L(`
      <ul>
        <li><b>The base never changes.</b> 2³ · 2² = 2⁵, NOT 4⁵.</li>
        <li><b>x⁰ = 1, not 0.</b></li>
        <li><b>A negative exponent is not a negative number.</b> x⁻² = 1/x², which is positive.</li>
        <li><b>The exponent hits everything in the bracket.</b> (3x³)² = 9x⁶ — square the 3 too.</li>
        <li><b>You cannot split a power of a sum.</b> (x + y)² ≠ x² + y².</li>
        <li><b>Different bases can’t be combined.</b> xᵃ · yᵇ stays as it is.</li>
      </ul>
      <div class="eg">Check yourself: 5⁶ ÷ 5⁴ = 5² ✓ (same base, subtract). 5⁶ ÷ 4⁴ — can’t simplify, different bases.</div>`, `
      <ul>
        <li><b>Die grondtal verander nooit.</b> 2³ · 2² = 2⁵, NIE 4⁵ nie.</li>
        <li><b>x⁰ = 1, nie 0 nie.</b></li>
        <li><b>'n Negatiewe eksponent is nie 'n negatiewe getal nie.</b> x⁻² = 1/x², en dit is positief.</li>
        <li><b>Die eksponent tref alles in die hakie.</b> (3x³)² = 9x⁶: kwadreer die 3 ook.</li>
        <li><b>Jy kan nie 'n mag van 'n som opbreek nie.</b> (x + y)² ≠ x² + y².</li>
        <li><b>Verskillende grondtalle kan nie saamgevoeg word nie.</b> xᵃ · yᵇ bly soos dit is.</li>
      </ul>
      <div class="eg">Toets jouself: 5⁶ ÷ 5⁴ = 5² ✓ (dieselfde grondtal, trek af). 5⁶ ÷ 4⁴: kan nie vereenvoudig nie, verskillende grondtalle.</div>`),
  },
  simplifySteps: {
    title: L("Simplifying: what to do first", "Vereenvoudig: wat kom eerste"),
    body: L(`
      <p>The method depends on whether terms are <b>multiplied/divided</b> or <b>added/subtracted</b>.</p>
      <ol>
        <li><b>Always first:</b> rewrite every base as a <b>product of prime factors</b> (8 = 2³, 9 = 3², 72 = 2³·3²).</li>
        <li><b>Only × and ÷ (one big term):</b> multiply brackets out, then add/subtract the exponents of the same base, then simplify.</li>
        <li><b>A + or − between terms:</b> you may NOT just add exponents — you must <b>factorise</b> (usually take out a common factor) first.</li>
      </ol>
      <p><b>Cancelling rule:</b> you can only cancel a factor that divides the <b>whole</b> top and <b>whole</b> bottom — i.e. it’s caged in brackets as a common factor. Never cancel a single term out of a sum.</p>
      <div class="eg">2ˣ + 2ˣ = 2·2ˣ (just like x + x = 2x) — adding LIKE powers behaves like adding like terms.</div>`, `
      <p>Die metode hang daarvan af of terme <b>vermenigvuldig/gedeel</b> of <b>opgetel/afgetrek</b> word.</p>
      <ol>
        <li><b>Altyd eerste:</b> skryf elke grondtal as 'n <b>produk van priemfaktore</b> (8 = 2³, 9 = 3², 72 = 2³·3²).</li>
        <li><b>Net × en ÷ (een groot term):</b> vermenigvuldig hakies uit, tel dan die eksponente van dieselfde grondtal op of trek hulle af, en vereenvoudig.</li>
        <li><b>'n + of − tussen terme:</b> jy mag NIE net eksponente optel nie, jy moet eers <b>faktoriseer</b> (gewoonlik 'n gemene faktor uithaal).</li>
      </ol>
      <p><b>Kanselleerreël:</b> jy kan net 'n faktor kanselleer wat die <b>hele</b> teller en die <b>hele</b> noemer deel, d.w.s. dit sit as 'n gemene faktor in hakies vasgekeer. Kanselleer nooit 'n enkele term uit 'n som nie.</p>
      <div class="eg">2ˣ + 2ˣ = 2·2ˣ (net soos x + x = 2x): GELYKSOORTIGE magte tel op soos gelyksoortige terme.</div>`),
  },
  divorceTypes: {
    title: L("Which factorising (“divorce”) is it?", "Watter faktorisering (“egskeiding”) is dit?"),
    body: L(`
      <p>When there is a <b>+</b> or <b>−</b> between exponential terms you split (“divorce”) the powers, then factorise. Count the terms and look at the shape:</p>
      <ul>
        <li><b>Common factor</b> — every term shares a power, e.g. 3ˣ⁺² − 3ˣ. Take out the smallest power (3ˣ).</li>
        <li><b>Difference of squares</b> — two terms, a subtraction, both perfect squares, e.g. 2²ˣ − 9. Let k = 2ˣ → k² − 9 = (k−3)(k+3).</li>
        <li><b>Trinomial</b> — three terms, e.g. 3²ˣ − 3ˣ − 6. Let k = 3ˣ → k² − k − 6.</li>
        <li><b>Grouping</b> — four terms in two matching pairs, e.g. a·2ˣ + a + 2ˣ + 1. Group and take out a common bracket.</li>
      </ul>
      <p>The substitution <b>let k = (the base)ˣ</b> turns a difference-of-squares or trinomial into an ordinary quadratic.</p>
      <p>Roots work the same way: for x − √x − 6, <b>let k = √x</b> (the smaller power — the other term is then k²).</p>
      <div class="eg">After factorising, remember (the base)ˣ can never be negative or zero — a root like 2ˣ = −4 is rejected.</div>`, `
      <p>As daar 'n <b>+</b> of <b>−</b> tussen eksponensiële terme staan, skei (“egskeiding”) jy die magte en faktoriseer dan. Tel die terme en kyk na die vorm:</p>
      <ul>
        <li><b>Gemene faktor</b>: elke term deel 'n mag, bv. 3ˣ⁺² − 3ˣ. Haal die kleinste mag uit (3ˣ).</li>
        <li><b>Verskil van twee vierkante</b>: twee terme, 'n aftrekking, albei volkome vierkante, bv. 2²ˣ − 9. Stel k = 2ˣ → k² − 9 = (k−3)(k+3).</li>
        <li><b>Drieterm</b>: drie terme, bv. 3²ˣ − 3ˣ − 6. Stel k = 3ˣ → k² − k − 6.</li>
        <li><b>Groepering</b>: vier terme in twee pare wat pas, bv. a·2ˣ + a + 2ˣ + 1. Groepeer en haal 'n gemene hakie uit.</li>
      </ul>
      <p>Die vervanging <b>stel k = (die grondtal)ˣ</b> maak van 'n verskil van twee vierkante of 'n drieterm 'n gewone kwadratiese uitdrukking.</p>
      <p>Wortels werk net so: vir x − √x − 6, <b>stel k = √x</b> (die kleiner mag; die ander term is dan k²).</p>
      <div class="eg">Onthou ná faktorisering: (die grondtal)ˣ kan nooit negatief of nul wees nie, so 'n wortel soos 2ˣ = −4 word verwerp.</div>`),
  },
  surdLaws: {
    title: L("Surd laws (and the big no-no)", "Wortelvormwette (en die groot nee-nee)"),
    body: L(`
      <p>A surd is a root written with the radical sign. The index sits on the root; powers inside convert to a fraction.</p>
      <div class="formula">ⁿ√(xᵃ) = x^(a/n) &nbsp;— inside power on TOP, index on the BOTTOM<br>
        √a·√b = √(ab) &nbsp;·&nbsp; √a ÷ √b = √(a/b) &nbsp;(same root; a ≥ 0, b ≥ 0 for ×, b &gt; 0 for ÷)</div>
      <ul>
        <li><b>Like surds add like terms:</b> 5√x − 2√x = 3√x; √x + √x = 2√x.</li>
        <li><b>BIG NO-NO:</b> √a + √b ≠ √(a+b). You cannot add the insides.</li>
      </ul>
      <div class="eg">√(x⁴) = x^(4/2) = x². And ³√(y⁶) = y^(6/3) = y².</div>`, `
      <p>'n Wortelvorm is 'n wortel wat met die wortelteken geskryf word. Die indeks sit op die wortel; magte binne-in word 'n breuk.</p>
      <div class="formula">ⁿ√(xᵃ) = x^(a/n) &nbsp;(binnemag BO, indeks ONDER)<br>
        √a·√b = √(ab) &nbsp;·&nbsp; √a ÷ √b = √(a/b) &nbsp;(dieselfde wortel; a ≥ 0, b ≥ 0 vir ×, b &gt; 0 vir ÷)</div>
      <ul>
        <li><b>Gelyksoortige wortelvorme tel op soos gelyksoortige terme:</b> 5√x − 2√x = 3√x; √x + √x = 2√x.</li>
        <li><b>GROOT NEE-NEE:</b> √a + √b ≠ √(a+b). Jy kan nie die dele binne-in optel nie.</li>
      </ul>
      <div class="eg">√(x⁴) = x^(4/2) = x². En ³√(y⁶) = y^(6/3) = y².</div>`),
  },
  surdSigns: {
    title: L("Signs, non-real roots & two answers", "Tekens, nie-reële wortels & twee antwoorde"),
    body: L(`
      <ul>
        <li><b>(−x)^even = positive</b>; (−x)^odd = negative. So (−5)² = 25 but (−5)³ = −125.</li>
        <li><b>even√(negative) = non-real</b> (e.g. √(−4) has no real value). odd√(negative) is fine and negative (³√(−8) = −2).</li>
        <li><b>Even root of a positive → two answers.</b> Solving x² = 9 gives x = ±3. (The symbol √9 on its own means the positive root, 3; the ± appears when you take the root of both sides of an equation.)</li>
      </ul>
      <div class="eg">x² = 25 → x = ±5. But √(−25) is non-real, so it has no real answer.</div>`, `
      <ul>
        <li><b>(−x)^ewe = positief</b>; (−x)^onewe = negatief. Dus (−5)² = 25, maar (−5)³ = −125.</li>
        <li><b>ewe√(negatief) = nie-reëel</b> (bv. √(−4) het geen reële waarde nie). onewe√(negatief) is in orde en negatief (³√(−8) = −2).</li>
        <li><b>'n Ewe wortel van 'n positiewe getal → twee antwoorde.</b> Los x² = 9 op: x = ±3. (Die simbool √9 op sy eie beteken die positiewe wortel, 3; die ± verskyn wanneer jy die wortel van albei kante van 'n vergelyking trek.)</li>
      </ul>
      <div class="eg">x² = 25 → x = ±5. Maar √(−25) is nie-reëel, so dit het geen reële antwoord nie.</div>`),
  },
  conjugates: {
    title: L("The conjugate", "Die toegevoegde wortelvorm"),
    body: L(`
      <p>The <b>conjugate</b> of a two-term surd is the same two terms with the <b>middle sign flipped</b>.</p>
      <div class="formula">conjugate of (√a + b) is (√a − b)<br>conjugate of (√a − √b) is (√a + √b)</div>
      <p>Why it’s useful: a surd times its conjugate is a <b>difference of squares</b>, so the root disappears:</p>
      <div class="formula">(√a + b)(√a − b) = (√a)² − b² = a − b²</div>
      <div class="eg">(√2 + 1)(√2 − 1) = 2 − 1 = 1. No surd left.</div>`, `
      <p>Die <b>toegevoegde wortelvorm</b> van 'n wortelvorm met twee terme is dieselfde twee terme met die <b>middelste teken omgedraai</b>.</p>
      <div class="formula">toegevoegde van (√a + b) is (√a − b)<br>toegevoegde van (√a − √b) is (√a + √b)</div>
      <p>Hoekom dit handig is: 'n wortelvorm maal sy toegevoegde is 'n <b>verskil van twee vierkante</b>, so die wortel verdwyn:</p>
      <div class="formula">(√a + b)(√a − b) = (√a)² − b² = a − b²</div>
      <div class="eg">(√2 + 1)(√2 − 1) = 2 − 1 = 1. Geen wortelvorm oor nie.</div>`),
  },
  rationalise: {
    title: L("Rationalising the denominator", "Rasionaliseer die noemer"),
    body: L(`
      <p>Rationalising means clearing the surd out of the bottom. Multiply top and bottom by the same thing — that’s just multiplying by <b>1</b>, so the value doesn’t change.</p>
      <ul>
        <li><b>One term on the bottom:</b> multiply by (that surd)/(that surd). e.g. 1/√3 × √3/√3 = √3/3.</li>
        <li><b>Two terms on the bottom:</b> multiply by the <b>conjugate</b> over itself. The bottom becomes a difference of squares with no surd.</li>
      </ul>
      <p>An answer is often written in the form <b>a + b√c</b>, where a and b are the rational and surd parts you read off at the end.</p>
      <div class="eg">2/(1+√3) × (1−√3)/(1−√3) = 2(1−√3)/(1−3) = 2(1−√3)/(−2) = √3 − 1.</div>`, `
      <p>Om te rasionaliseer, kry jy die wortelvorm uit die noemer. Vermenigvuldig bo en onder met dieselfde ding: dit is net vermenigvuldig met <b>1</b>, so die waarde verander nie.</p>
      <ul>
        <li><b>Een term onder:</b> vermenigvuldig met (daardie wortelvorm)/(daardie wortelvorm). bv. 1/√3 × √3/√3 = √3/3.</li>
        <li><b>Twee terme onder:</b> vermenigvuldig met die <b>toegevoegde</b> oor homself. Die noemer word 'n verskil van twee vierkante sonder 'n wortelvorm.</li>
      </ul>
      <p>'n Antwoord word dikwels in die vorm <b>a + b√c</b> geskryf, waar a en b die rasionale deel en die wortelvormdeel is wat jy aan die einde aflees.</p>
      <div class="eg">2/(1+√3) × (1−√3)/(1−√3) = 2(1−√3)/(1−3) = 2(1−√3)/(−2) = √3 − 1.</div>`),
  },
  ratExpEq: {
    title: L("Equations with rational exponents", "Vergelykings met rasionale eksponente"),
    body: L(`
      <p>To solve x^(p/q) = k, raise <b>both sides</b> to the reciprocal q/p (the exponents then cancel: (p/q)·(q/p) = 1).</p>
      <p>Whether the answer is ±, a single value, or none, depends on the fraction (in lowest terms):</p>
      <ul>
        <li><b>Numerator (top) even, k positive → ± two answers.</b> x^(2/3) = 4 → x = ±8.</li>
        <li><b>Top and bottom both odd → one answer, and a negative is allowed.</b> x^(3/5) = −2 → x = (−2)^(5/3), real and negative.</li>
        <li><b>Bottom (denominator) even, k positive → one positive answer.</b> x^(3/2) = 8 → x = 4.</li>
        <li><b>No real solution</b> when you’d need an <b>even root of a negative</b> (even bottom, k negative) or an <b>even power equal to a negative</b> (even top, k negative). x^(1/2) = −5 and x^(2/5) = −4 both have no solution.</li>
      </ul>`, `
      <p>Om x^(p/q) = k op te los, verhef <b>albei kante</b> tot die resiprook q/p (die eksponente kanselleer dan: (p/q)·(q/p) = 1).</p>
      <p>Of die antwoord ± is, een waarde, of geen, hang af van die breuk (in eenvoudigste vorm):</p>
      <ul>
        <li><b>Teller (bo) ewe, k positief → ± twee antwoorde.</b> x^(2/3) = 4 → x = ±8.</li>
        <li><b>Bo en onder albei onewe → een antwoord, en 'n negatiewe antwoord mag.</b> x^(3/5) = −2 → x = (−2)^(5/3), reëel en negatief.</li>
        <li><b>Onder (noemer) ewe, k positief → een positiewe antwoord.</b> x^(3/2) = 8 → x = 4.</li>
        <li><b>Geen reële oplossing</b> as jy 'n <b>ewe wortel van 'n negatiewe getal</b> (onder ewe, k negatief) of 'n <b>ewe mag gelyk aan 'n negatiewe getal</b> (bo ewe, k negatief) nodig het. x^(1/2) = −5 en x^(2/5) = −4 het albei geen oplossing nie.</li>
      </ul>`),
  },
  expEqStrategy: {
    title: L("Exponential equations: the strategy", "Eksponensiële vergelykings: die strategie"),
    body: L(`
      <p><b>One term each side</b> (like 5ˣ = 25): rewrite both as the same base, then “make the bases the same so the guns are equal, shoot each other (the bases fall away), and equate the exponents”.</p>
      <div class="formula">5ˣ = 25 → 5ˣ = 5² → x = 2</div>
      <p><b>A + or − (two or more terms):</b> factorise.</p>
      <ul>
        <li><b>Common-factor type:</b> take out the smallest power.</li>
        <li><b>Trinomial type:</b> <b>let k = (base)ˣ</b>, solve the quadratic, then go back.</li>
      </ul>
      <p><b>No solution warnings:</b></p>
      <ul>
        <li>A positive base can <b>never</b> give a negative answer: 3ˣ = −9 has no solution.</li>
        <li>If the substitution gives k = a negative number, reject it — (base)ˣ can’t be negative. Only the positive root survives.</li>
      </ul>`, `
      <p><b>Een term aan elke kant</b> (soos 5ˣ = 25): skryf albei met dieselfde grondtal, dan “maak die grondtalle dieselfde sodat die gewere gelyk is, hulle skiet mekaar (die grondtalle val weg), en stel die eksponente gelyk”.</p>
      <div class="formula">5ˣ = 25 → 5ˣ = 5² → x = 2</div>
      <p><b>'n + of − (twee of meer terme):</b> faktoriseer.</p>
      <ul>
        <li><b>Gemene-faktor-tipe:</b> haal die kleinste mag uit.</li>
        <li><b>Drieterm-tipe:</b> <b>stel k = (grondtal)ˣ</b>, los die kwadratiese vergelyking op, en gaan dan terug.</li>
      </ul>
      <p><b>Waarskuwings vir geen oplossing:</b></p>
      <ul>
        <li>'n Positiewe grondtal kan <b>nooit</b> 'n negatiewe antwoord gee nie: 3ˣ = −9 het geen oplossing nie.</li>
        <li>As die vervanging k = 'n negatiewe getal gee, verwerp dit: (grondtal)ˣ kan nie negatief wees nie. Net die positiewe wortel bly oor.</li>
      </ul>`),
  },
  surdEq: {
    title: L("Surd equations: isolate, square, TEST", "Wortelvormvergelykings: isoleer, kwadreer, TOETS"),
    body: L(`
      <ol>
        <li><b>Isolate the root</b> — get √(…) alone on one side.</li>
        <li><b>Square both sides</b> (show the step). Squaring undoes the root.</li>
        <li><b>ALWAYS test both answers</b> in the original equation — squaring can create <b>extraneous</b> answers that don’t really work.</li>
      </ol>
      <p>Two quick no-solution checks: a root can never equal a negative (√(x−1) = −3 → no solution), and √x is only defined for x ≥ 0.</p>
      <div class="eg">√(2 − 7x) = −2x → square → 2 − 7x = 4x²; solve, then test both: reject any answer that makes −2x negative (a root can never equal a negative). Here x = −2 works and x = ¼ is rejected.</div>`, `
      <ol>
        <li><b>Isoleer die wortel</b>: kry √(…) alleen aan een kant.</li>
        <li><b>Kwadreer albei kante</b> (wys die stap). Kwadrering maak die wortel ongedaan.</li>
        <li><b>Toets ALTYD albei antwoorde</b> in die oorspronklike vergelyking: kwadrering kan <b>ekstra</b> antwoorde skep wat nie regtig werk nie.</li>
      </ol>
      <p>Twee vinnige toetse vir geen oplossing: 'n wortel kan nooit gelyk wees aan 'n negatiewe getal nie (√(x−1) = −3 → geen oplossing), en √x bestaan net vir x ≥ 0.</p>
      <div class="eg">√(2 − 7x) = −2x → kwadreer → 2 − 7x = 4x²; los op en toets albei: verwerp enige antwoord wat −2x negatief maak ('n wortel kan nooit gelyk wees aan 'n negatiewe getal nie). Hier werk x = −2 en x = ¼ word verwerp.</div>`),
  },

};
