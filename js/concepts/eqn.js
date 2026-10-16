/* Concept cards: Equations & Inequalities (chapter id "eqn"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_EQN = {
  /* ===================== EQUATIONS & INEQUALITIES ===================== */
  eqStdForm: {
    title: "Standard form & the calculator's EQN mode",
    body: `
      <p>Almost every quadratic starts the same way: take everything to ONE side so the other side is 0.</p>
      <div class="formula">ax² + bx + c = 0</div>
      <p><b>Calculator (EQN mode):</b> MODE → <b>5: EQN</b> → <b>3: aX² + bX + c = 0</b> (option 4 is the CUBIC — wrong one!) → type a, b and c <b>each with its own sign</b> → read the roots X₁ and X₂.</p>
      <p><b>Root → factor:</b> put the OPPOSITE sign in the bracket. A fraction root: the denominator multiplies the x, the numerator crosses over with the opposite sign.</p>
      <div class="eg">X₁ = ½ → (2x − 1). &nbsp; X₂ = −3 → (x + 3). &nbsp; So 2x² + 5x − 3 = (2x − 1)(x + 3).</div>`,
  },
  eqZeroProduct: {
    title: "Brackets = 0: the zero-product rule",
    body: `
      <p>A product is 0 <b>only</b> when at least one of its factors is 0. So when brackets multiply to 0:</p>
      <ul>
        <li>It's already factorised — <b>don't multiply out</b>, and don't divide a factor away (that deletes an answer).</li>
        <li>Set <b>each bracket = 0</b> on its own and solve it.</li>
        <li>A lonely x in front is a factor too: x(x + 5) = 0 gives x = 0 as one of the answers.</li>
      </ul>
      <p><b>Warning:</b> the rule ONLY works against 0. (x − 3)(x + 2) = 6 may NOT be split up — lots of pairs multiply to 6. First rearrange so one side is 0.</p>
      <div class="eg">x(2x − 5)(−x + 2) = 0 → x = 0, or 2x = 5 so x = 5/2, or −x = −2 so x = 2.</div>`,
  },
  eqSpecialCases: {
    title: "The special quadratics: no b, no c, x² = negative",
    body: `
      <ul>
        <li><b>No b (middle) term:</b> difference of squares, or square-root both sides — and KEEP the ±. x² − 4 = 0 → x = ±2.</li>
        <li><b>No c (constant) term:</b> take out the common factor. x² + 5x = 0 → x(x + 5) = 0 → x = 0 or x = −5. <b>Never divide by x</b> — that throws the x = 0 answer away.</li>
        <li><b>x² = a negative number:</b> no real solution — a square is never negative. x² + 5 = 0 → x² = −5 → no real solution.</li>
      </ul>`,
  },
  eqExpBrackets: {
    title: "Exponent brackets: same base, and the impossible ones",
    body: `
      <p>When a bracket in factor form contains an exponent, set it = 0 and solve:</p>
      <ul>
        <li><b>Make the bases the same</b>, then equate the exponents: 3ˣ = √27 = √(3³) = 3^(3/2) → x = 3/2. And 3ˣ = 1 = 3⁰ → x = 0.</li>
        <li><b>A power with a positive base can never be negative:</b> 2ˣ = −4 has NO solution — that bracket contributes nothing.</li>
        <li><b>Rational exponents:</b> raise both sides to the reciprocal — and watch for ±. x^(2/3) = 16 means (∛x)² = 16, so ∛x = ±4, so x = ±64. The EVEN power on top hides the sign; an odd top keeps one answer.</li>
      </ul>
      <div class="eg">(x² − 5)(2ˣ − 16) = 0 → x = ±√5 (two answers) or 2ˣ = 2⁴ → x = 4. Three real solutions.</div>`,
  },
  eqKMethod: {
    title: "The k-method (a stand-in for a repeated bracket)",
    body: `
      <p>Use it when the <b>same expression appears two or more times</b>.</p>
      <ol>
        <li>Let k = the repeated expression (the plain bracket, not its square).</li>
        <li>The equation becomes a simple quadratic in k — solve for k.</li>
        <li><b>You're not done!</b> Replace k with the bracket and solve each little equation for x.</li>
        <li>A restriction on the bracket (from a denominator) rides along on k — reject a k that breaks it (N.A.).</li>
      </ol>
      <p><b>How many answers?</b> The highest power tells you the most to expect: x² → 2, x³ → 3, x⁴ → 4 (equal roots count once).</p>
      <div class="eg">(x² − x)² − 8(x² − x) + 12 = 0 → k² − 8k + 12 = 0 → k = 6 or 2 → x² − x = 6 gives x = 3 or −2; x² − x = 2 gives x = 2 or −1.</div>`,
  },
  eqFractions: {
    title: "Fraction equations: factorise, LCD, clear",
    body: `
      <ol>
        <li><b>Factorise every numerator and denominator</b> first.</li>
        <li>Watch for the <b>negative twin</b>: 9 − x² = −(x² − 9). Take out the −1 so denominators match.</li>
        <li>Build the <b>LCD</b>: each different factor once, at its highest power.</li>
        <li>State the <b>restrictions</b> (denominator ≠ 0) BEFORE solving.</li>
        <li>Multiply <b>EVERY term</b> (both sides, including the lonely numbers) by the LCD — the fractions vanish.</li>
        <li>Solve, then <b>reject</b> any answer that equals a restriction (N.A.).</li>
      </ol>
      <div class="eg">10/x + 3x/(x − 2) = 7 (x ≠ 0; x ≠ 2) → 10(x − 2) + 3x² = 7x(x − 2) → x² − 6x + 5 = 0 → x = 5 or x = 1 (both allowed).</div>`,
  },
  eqRestrictions: {
    title: "Restrictions & N.A.",
    body: `
      <p>Any x that makes a denominator 0 is banned — division by 0 is <b>undefined</b> (the ghost under the bed).</p>
      <ul>
        <li>Find them by setting <b>each denominator = 0</b>.</li>
        <li>State them <b>before</b> you solve — they belong to the original equation.</li>
        <li>An answer that equals a restriction is rejected: mark it <b>N.A.</b> and keep only the valid one(s). The other answers survive — one rejection does not kill the rest.</li>
      </ul>`,
  },
  eqPerfectSquare: {
    title: "Perfect squares & completing the square",
    body: `
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
      <div class="eg">−x² + 10x − 22 = 0 → x² − 10x = −22 → +25 both sides → (x − 5)² = 3 → x = 5 ± √3.</div>`,
  },
  eqTPForm: {
    title: "Turning-point form: reading TP(p ; q)",
    body: `
      <div class="formula">y = a(x − p)² + q &nbsp;→&nbsp; TP(p ; q)</div>
      <ul>
        <li><b>p flips:</b> read it with the OPPOSITE sign of what's in the bracket. (x + 4) → p = −4.</li>
        <li><b>q keeps its own sign</b> — never flip q. <span class="nowrap">… − 1 → q = −1</span>.</li>
        <li>In words: p is WHERE the turning point is (x-value), q is WHAT it is (y-value).</li>
        <li>a &gt; 0 → happy parabola (opens up) → the TP is a <b>minimum</b>. a &lt; 0 → sad → <b>maximum</b>.</li>
      </ul>
      <div class="eg">y = 2(x + 4)² − 1 → TP(−4 ; −1), a minimum. NOT (−4 ; 1)!</div>`,
  },
  eqFormula: {
    title: "The quadratic formula",
    body: `
      <div class="formula">x = ( −b ± √(b² − 4ac) ) / 2a</div>
      <ul>
        <li>Use it when the trinomial <b>won't factorise</b> (decimals asked = a big hint).</li>
        <li>Always write the <b>formula</b>, then the <b>substitution line</b> — a, b and c in brackets, <b>each with its own sign</b>. For x² − 2x − 1 = 0: a = 1, b = −2, c = −1 (not +1!).</li>
        <li>EQN mode may check the values, but the two written lines earn the marks.</li>
        <li>Round only the FINAL answers: two decimals, decimal comma (e.g. 2,41).</li>
      </ul>`,
  },
  eqSimultaneous: {
    title: "Simultaneous equations (substitution)",
    body: `
      <ol>
        <li>Make one variable the subject of the <b>simpler (linear)</b> equation.</li>
        <li>Substitute that expression into the other equation.</li>
        <li>Solve the one-variable equation (with a quadratic you can get up to TWO x-values).</li>
        <li>Back-substitute each x into the linear subject to find its partner y.</li>
        <li>Write each solution as a <b>coordinate pair</b> (x ; y).</li>
      </ol>
      <div class="eg">3x + 2y = 3 and 2x − y = 9 → y = 2x − 9 → 3x + 2(2x − 9) = 3 → 7x = 21 → x = 3, y = −3 → (3 ; −3).</div>`,
  },
  eqLinIneq: {
    title: "Linear inequalities: when the sign flips",
    body: `
      <p><b>The key rule:</b> multiply or divide both sides by a NEGATIVE → switch the direction of the inequality sign. (Adding/subtracting never flips.)</p>
      <ul>
        <li>−6x &lt; 4 → divide by −6 and flip → x &gt; −2/3.</li>
        <li><b>Compound:</b> do every operation to ALL THREE parts. −5 ≤ 1 − 3x &lt; 10 → subtract 1 → divide by −3, flipping BOTH signs → 2 ≥ x &gt; −3, written naturally: −3 &lt; x ≤ 2.</li>
        <li><b>Number line:</b> open circle = not included (&lt;, &gt;); filled circle = included (≤, ≥).</li>
      </ul>`,
  },
  eqQuadIneq: {
    title: "Quadratic inequalities: CP and the bowl",
    body: `
      <p><b>Set-up:</b> everything to the left (0 right) → NO negative in front of x² (divide by −1 and flip) → factorise → <b>CP</b>: each factor = 0 → sketch the bowl (or calculator INEQ mode).</p>
      <ul>
        <li>Expression <b>&lt; 0</b> → below the axis → <b>inside the bowl</b>: a &lt; x &lt; b.</li>
        <li>Expression <b>&gt; 0</b> → above the axis → <b>to the left / right</b>: x &lt; a or x &gt; b. Two pieces join with <b>or</b>, never "and".</li>
        <li>≤ / ≥ keep the CPs in the answer.</li>
        <li><b>Look out for (4 − x):</b> it hides a −x². Take out −1 and FLIP: (x − 3)(4 − x) ≥ 0 → (x − 3)(x − 4) ≤ 0.</li>
        <li><b>A repeated bracket:</b> (x − 3)² &gt; 0 has one CP only → true everywhere except there → x ∈ ℝ, x ≠ 3.</li>
        <li><b>Brackets with a number on the right,</b> e.g. (x + 1)(x + 2) ≤ 20: the CPs are NOT −1 and −2! Multiply out, bring the 20 across, and factorise again.</li>
      </ul>`,
  },
  eqDiscriminant: {
    title: "Nature of the roots: Δ = b² − 4ac",
    body: `
      <p>Δ (delta) is the part under the root in the formula. Its sign tells you how the parabola meets the x-axis — without solving.</p>
      <ul>
        <li><b>Δ &lt; 0:</b> non-real roots — the graph never cuts the x-axis.</li>
        <li><b>Δ = 0:</b> real, rational, EQUAL roots — it touches once, at the TP.</li>
        <li><b>Δ &gt; 0, perfect square:</b> real, rational, unequal — cuts twice, nicely.</li>
        <li><b>Δ &gt; 0, not a perfect square:</b> real, irrational, unequal — cuts twice with surds.</li>
        <li><b>Δ ≥ 0:</b> real (equal or unequal together).</li>
      </ul>
      <p><b>The 3 question types:</b> ① work out Δ and classify. ② nature GIVEN → write the matching Δ condition and solve for the unknown. ③ PROVE the nature → complete the square on Δ, e.g. (p − 2)² + 4 ≥ 4 &gt; 0 always.</p>
      <p><b>Check parameter answers against the original equation</b> — a k that makes a denominator 0 (or kills the x² term) is rejected.</p>`,
  },
  eqKnowDiff: {
    title: "KNOW THE DIFFERENCE!!",
    body: `
      <ul>
        <li><b>No solution</b> — the statement can NEVER be true. 3ˣ = −1 (a positive base can't go negative).</li>
        <li><b>Undefined</b> — a denominator equals 0 (the ghost under the bed). Find it: denominator = 0.</li>
        <li><b>Non-real</b> — a negative sits under a square root. √(−4). Find it: inside of the root &lt; 0.</li>
        <li><b>Not applicable (N.A.)</b> — a candidate answer is REJECTED: it breaks a restriction or fails the original surd equation.</li>
      </ul>
      <div class="eg">√(x + 3)/(x + 1): undefined at x = −1 (bottom = 0); non-real for x &lt; −3 (inside the root negative). Two different questions!</div>`,
  },
  /* eq9 "Two, one or no solution?" (2026-08-23) — her two handwritten
     pages on equations with rational exponents, boxes and all. The three
     rules below are her "Important Notes" box verbatim, examples
     included; the worked lines are her page 2. */
  eqSolutionCount: {
    title: "Two, one or no solution?",
    body: `
      <p><b>Equations with rational exponents.</b> Multiply with the <b>reciprocal</b> of the exponent &mdash; switch numerator and denominator, so <span class="sfrac"><span class="sf-n">3</span><span class="sf-d">4</span></span> × <span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span> = 1 (cancels out) and x is left on its own.</p>
      <p>Before you solve anything, look at the fraction on top of the x and at the sign on the right. That alone tells you how many answers there are:</p>
      <ul>
        <li><b>Even numerator → ± answer.</b> x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">7</span></span></sup> = 5 — two solutions.</li>
        <li><b>Only odd numbers</b> in the numerator and the denominator → ✓ a <b>negative answer is allowed</b> 🙂. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">3</span></span></sup> = −2 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9 — one solution.</li>
        <li><b>An even number</b> in the numerator <b>or</b> the denominator, with a negative on the right → ✗ <b>no solution</b> 🙁. x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 &nbsp;/&nbsp; x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4.</li>
      </ul>
      <p>The reason, in one line: x<sup>odd/even</sup> and x<sup>even/odd</sup> <b>≠ a negative number</b>. Ask it of a real number and you can see it: √16 is 4, never −4 — an even root cannot be negative only.</p>
      <div class="formula">x<sup><span class="sfrac"><span class="sf-n">2</span><span class="sf-d">3</span></span></sup> = 4 &nbsp;→&nbsp; (<sup>3</sup>√(x²))³ = (4)³ &nbsp;→&nbsp; √(x²) = √64 &nbsp;→&nbsp; x = ±8</div>
      <div class="eg">And the three that go the other way.<br>Only odd numbers, so a negative answer is allowed:<br>x<sup><span class="sfrac"><span class="sf-n">5</span><span class="sf-d">7</span></span></sup> = −9 → (<sup>7</sup>√(x⁵))⁷ = (−9)⁷ → <sup>5</sup>√(x⁵) = <sup>5</sup>√(−4 782 969) → x = −21,67<br>An even numerator with a negative — cannot happen:<br>x<sup><span class="sfrac"><span class="sf-n">4</span><span class="sf-d">3</span></span></sup> = −4 → <sup>4</sup>√(x⁴) = <sup>4</sup>√(−64)<br>An even denominator with a negative — cannot happen:<br>x<sup><span class="sfrac"><span class="sf-n">1</span><span class="sf-d">2</span></span></sup> = −3 → <sup>2</sup>√(x¹) = −3 ✗</div>`,
  },

};
