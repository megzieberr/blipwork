/* Concept cards: Exponents & Surds (chapter id "exp"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_EXP = {
  /* ===================== EXPONENTS & SURDS ===================== */
  expLaws: {
    title: "The exponent laws",
    body: `
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
      <div class="eg">e.g. (2x³)² = 4x⁶ — the 2 is squared too. And 3⁻² = 1/3² = 1/9 (positive!).</div>`,
  },
  expTraps: {
    title: "The classic exponent traps",
    body: `
      <ul>
        <li><b>The base never changes.</b> 2³ · 2² = 2⁵, NOT 4⁵.</li>
        <li><b>x⁰ = 1, not 0.</b></li>
        <li><b>A negative exponent is not a negative number.</b> x⁻² = 1/x², which is positive.</li>
        <li><b>The exponent hits everything in the bracket.</b> (3x³)² = 9x⁶ — square the 3 too.</li>
        <li><b>You cannot split a power of a sum.</b> (x + y)² ≠ x² + y².</li>
        <li><b>Different bases can’t be combined.</b> xᵃ · yᵇ stays as it is.</li>
      </ul>
      <div class="eg">Check yourself: 5⁶ ÷ 5⁴ = 5² ✓ (same base, subtract). 5⁶ ÷ 4⁴ — can’t simplify, different bases.</div>`,
  },
  simplifySteps: {
    title: "Simplifying: what to do first",
    body: `
      <p>The method depends on whether terms are <b>multiplied/divided</b> or <b>added/subtracted</b>.</p>
      <ol>
        <li><b>Always first:</b> rewrite every base as a <b>product of prime factors</b> (8 = 2³, 9 = 3², 72 = 2³·3²).</li>
        <li><b>Only × and ÷ (one big term):</b> multiply brackets out, then add/subtract the exponents of the same base, then simplify.</li>
        <li><b>A + or − between terms:</b> you may NOT just add exponents — you must <b>factorise</b> (usually take out a common factor) first.</li>
      </ol>
      <p><b>Cancelling rule:</b> you can only cancel a factor that divides the <b>whole</b> top and <b>whole</b> bottom — i.e. it’s caged in brackets as a common factor. Never cancel a single term out of a sum.</p>
      <div class="eg">2ˣ + 2ˣ = 2·2ˣ (just like x + x = 2x) — adding LIKE powers behaves like adding like terms.</div>`,
  },
  divorceTypes: {
    title: "Which factorising (“divorce”) is it?",
    body: `
      <p>When there is a <b>+</b> or <b>−</b> between exponential terms you split (“divorce”) the powers, then factorise. Count the terms and look at the shape:</p>
      <ul>
        <li><b>Common factor</b> — every term shares a power, e.g. 3ˣ⁺² − 3ˣ. Take out the smallest power (3ˣ).</li>
        <li><b>Difference of squares</b> — two terms, a subtraction, both perfect squares, e.g. 2²ˣ − 9. Let k = 2ˣ → k² − 9 = (k−3)(k+3).</li>
        <li><b>Trinomial</b> — three terms, e.g. 3²ˣ − 3ˣ − 6. Let k = 3ˣ → k² − k − 6.</li>
        <li><b>Grouping</b> — four terms in two matching pairs, e.g. a·2ˣ + a + 2ˣ + 1. Group and take out a common bracket.</li>
      </ul>
      <p>The substitution <b>let k = (the base)ˣ</b> turns a difference-of-squares or trinomial into an ordinary quadratic.</p>
      <p>Roots work the same way: for x − √x − 6, <b>let k = √x</b> (the smaller power — the other term is then k²).</p>
      <div class="eg">After factorising, remember (the base)ˣ can never be negative or zero — a root like 2ˣ = −4 is rejected.</div>`,
  },
  surdLaws: {
    title: "Surd laws (and the big no-no)",
    body: `
      <p>A surd is a root written with the radical sign. The index sits on the root; powers inside convert to a fraction.</p>
      <div class="formula">ⁿ√(xᵃ) = x^(a/n) &nbsp;— inside power on TOP, index on the BOTTOM<br>
        √a·√b = √(ab) &nbsp;·&nbsp; √a ÷ √b = √(a/b) &nbsp;(same root; a, b ≥ 0)</div>
      <ul>
        <li><b>Like surds add like terms:</b> 5√x − 2√x = 3√x; √x + √x = 2√x.</li>
        <li><b>BIG NO-NO:</b> √a + √b ≠ √(a+b). You cannot add the insides.</li>
      </ul>
      <div class="eg">√(x⁴) = x^(4/2) = x². And ³√(y⁶) = y^(6/3) = y².</div>`,
  },
  surdSigns: {
    title: "Signs, non-real roots & two answers",
    body: `
      <ul>
        <li><b>(−x)^even = positive</b>; (−x)^odd = negative. So (−5)² = 25 but (−5)³ = −125.</li>
        <li><b>even√(negative) = non-real</b> (e.g. √(−4) has no real value). odd√(negative) is fine and negative (³√(−8) = −2).</li>
        <li><b>Even root of a positive → two answers.</b> Solving x² = 9 gives x = ±3. (The symbol √9 on its own means the positive root, 3; the ± appears when you take the root of both sides of an equation.)</li>
      </ul>
      <div class="eg">x² = 25 → x = ±5. But √(−25) is non-real, so it has no real answer.</div>`,
  },
  conjugates: {
    title: "The conjugate",
    body: `
      <p>The <b>conjugate</b> of a two-term surd is the same two terms with the <b>middle sign flipped</b>.</p>
      <div class="formula">conjugate of (√a + b) is (√a − b)<br>conjugate of (√a − √b) is (√a + √b)</div>
      <p>Why it’s useful: a surd times its conjugate is a <b>difference of squares</b>, so the root disappears:</p>
      <div class="formula">(√a + b)(√a − b) = (√a)² − b² = a − b²</div>
      <div class="eg">(√2 + 1)(√2 − 1) = 2 − 1 = 1. No surd left.</div>`,
  },
  rationalise: {
    title: "Rationalising the denominator",
    body: `
      <p>Rationalising means clearing the surd out of the bottom. Multiply top and bottom by the same thing — that’s just multiplying by <b>1</b>, so the value doesn’t change.</p>
      <ul>
        <li><b>One term on the bottom:</b> multiply by (that surd)/(that surd). e.g. 1/√3 × √3/√3 = √3/3.</li>
        <li><b>Two terms on the bottom:</b> multiply by the <b>conjugate</b> over itself. The bottom becomes a difference of squares with no surd.</li>
      </ul>
      <p>An answer is often written in the form <b>a + b√c</b>, where a and b are the rational and surd parts you read off at the end.</p>
      <div class="eg">2/(1+√3) × (1−√3)/(1−√3) = 2(1−√3)/(1−3) = 2(1−√3)/(−2) = √3 − 1.</div>`,
  },
  ratExpEq: {
    title: "Equations with rational exponents",
    body: `
      <p>To solve x^(p/q) = k, raise <b>both sides</b> to the reciprocal q/p (the exponents then cancel: (p/q)·(q/p) = 1).</p>
      <p>Whether the answer is ±, a single value, or none, depends on the fraction (in lowest terms):</p>
      <ul>
        <li><b>Numerator (top) even, k positive → ± two answers.</b> x^(2/3) = 4 → x = ±8.</li>
        <li><b>Top and bottom both odd → one answer, and a negative is allowed.</b> x^(3/5) = −2 → x = (−2)^(5/3), real and negative.</li>
        <li><b>No real solution</b> when you’d need an <b>even root of a negative</b> (even bottom, k negative) or an <b>even power equal to a negative</b> (even top, k negative). x^(1/2) = −5 and x^(2/5) = −4 both have no solution.</li>
      </ul>`,
  },
  expEqStrategy: {
    title: "Exponential equations: the strategy",
    body: `
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
      </ul>`,
  },
  surdEq: {
    title: "Surd equations: isolate, square, TEST",
    body: `
      <ol>
        <li><b>Isolate the root</b> — get √(…) alone on one side.</li>
        <li><b>Square both sides</b> (show the step). Squaring undoes the root.</li>
        <li><b>ALWAYS test both answers</b> in the original equation — squaring can create <b>extraneous</b> answers that don’t really work.</li>
      </ol>
      <p>Two quick no-solution checks: a root can never equal a negative (√(x−1) = −3 → no solution), and √x is only defined for x ≥ 0.</p>
      <div class="eg">√(2 − 7x) = −2x → square → 2 − 7x = 4x²; solve, then reject any answer that makes the original root negative.</div>`,
  },

};
