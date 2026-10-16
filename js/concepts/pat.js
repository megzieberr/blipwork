/* Concept cards: Number Patterns (chapter id "pat"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_PAT = {
  /* ---------------- Number Patterns ---------------- */
  patClassify: {
    title: "Which kind of pattern?",
    body: `
      <p>Build the <b>difference pyramid</b>: write the terms, then the gaps between them (first differences), then the gaps of those (second differences).</p>
      <ul>
        <li><b>First difference constant</b> → <b>arithmetic</b> (linear). You add the same number each time.</li>
        <li><b>Second difference constant</b> → <b>quadratic</b>. The first differences change by the same amount.</li>
        <li><b>Constant ratio</b> (divide a term by the one before it) → <b>geometric</b>. You multiply by the same number each time.</li>
      </ul>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → first diffs +3, +3, +3 → arithmetic. 1 ; 4 ; 11 ; 22 → second diffs 4, 4 → quadratic. 6 ; 12 ; 24 → ×2 each time → geometric.</div>`,
  },
  patArithmetic: {
    title: "Arithmetic (linear) patterns",
    body: `
      <p>An arithmetic pattern has a <b>constant first difference</b> d — the same number added each step.</p>
      <div class="formula">d = T₂ − T₁ = T₃ − T₂ = …</div>
      <p>Find d by subtracting any term from the one after it.</p>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → d = 7 − 4 = 3.</div>`,
  },
  // Gr11 shortcut ONLY (her ruling 2026-08-23): a = constant difference, c = T₀.
  // The Gr12 a + (n − 1)d form is never shown to learners.
  patArithTerm: {
    title: "The general term of an arithmetic pattern",
    body: `
      <p>One formula:</p>
      <div class="formula">Tₙ = an + c &nbsp;&nbsp;(a = the constant difference, c = T₀)</div>
      <ol>
        <li><b>a</b> is the constant difference — so if the pattern goes up by 3 each time, the formula starts with <b>3n</b>.</li>
        <li><b>c</b> is T₀, the term that would sit <b>before</b> T₁. Take T₁ and step <b>backwards</b> one difference: c = T₁ − d.</li>
      </ol>
      <p>Once you have Tₙ: substitute n for any term; or set Tₙ equal to a value and solve for n to find <b>which</b> term it is.</p>
      <div class="eg">e.g. −1 ; 2 ; 5 ; 8 → the difference is 3, so start with 3n. Step back from T₁: −1 − 3 = −4, so c = −4 and Tₙ = 3n − 4. Then T₁₀ = 3(10) − 4 = 26.</div>`,
  },
  patQuadratic: {
    title: "Quadratic patterns → Tₙ = an² + bn + c",
    body: `
      <p>A quadratic pattern has a <b>constant second difference</b>. Build the pyramid, then work from the <b>bottom up</b> with three relationships:</p>
      <div class="formula">2a = second difference<br>3a + b = T₂ − T₁<br>a + b + c = T₁</div>
      <ol>
        <li>2a = second difference → solve for <b>a</b>.</li>
        <li>3a + b = T₂ − T₁ → put a in, solve for <b>b</b>.</li>
        <li>a + b + c = T₁ → put a, b in, solve for <b>c</b>.</li>
      </ol>
      <div class="eg">e.g. 1 ; 4 ; 11 ; 22 → 2nd diff 4 → a = 2; 3(2)+b = 3 → b = −3; 2−3+c = 1 → c = 2. Tₙ = 2n² − 3n + 2.</div>`,
  },
  patQuadUnknown: {
    title: "Finding a missing term",
    body: `
      <p>In a quadratic pattern the <b>second difference is constant</b> — use that to fill a gap.</p>
      <ol>
        <li>Write the first differences (some contain the unknown x).</li>
        <li>Form the two second differences from them.</li>
        <li>Set the two second differences <b>equal</b> (they must be the same) and solve for x.</li>
      </ol>
      <div class="eg">For T₁ ; T₂ ; x ; T₄ : (x − T₂) − (T₂ − T₁) = (T₄ − x) − (x − T₂), then solve for x.</div>`,
  },
  patMinMax: {
    title: "Minimum & maximum term",
    body: `
      <p>A quadratic pattern lies on a parabola, so it has a turning point — the smallest or largest term.</p>
      <ul>
        <li><b>a &gt; 0</b> → ‘happy’ parabola → the turning point is a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → ‘sad’ parabola → the turning point is a <b>maximum</b>.</li>
      </ul>
      <div class="formula">term number of the extreme: n = −b ÷ (2a)</div>
      <p>That n tells you <b>which</b> term is the extreme (it must be a natural number — round to the nearest if needed). Substitute it back into Tₙ for the extreme <b>value</b>.</p>`,
  },
  patConsecDiff: {
    title: "The gap between consecutive terms",
    body: `
      <p>The first differences of a quadratic pattern form their own <b>arithmetic</b> pattern:</p>
      <ul>
        <li>first term = T₂ − T₁ (the first gap),</li>
        <li>common difference = the constant <b>second difference</b>.</li>
      </ul>
      <p>So a question about a gap becomes a question about a term of that linear gap-pattern:</p>
      <div class="formula">gap between Tₖ and Tₖ₊₁ = the kth term of the gap-pattern<br>gapₙ = an + c &nbsp;&nbsp;(a = the second difference, c = gap₀ = first gap − a)</div>
      <div class="eg">−5 ; 0 ; 7 ; 16 ; 27 → gaps 5 ; 7 ; 9 ; 11 (linear, common difference 2). So a = 2, c = 5 − 2 = 3, and gapₙ = 2n + 3. The gap between T₁₀ and T₁₁ is 2(10) + 3 = 23.</div>`,
  },
  patGeometric: {
    title: "Geometric patterns → Tₙ = a·rⁿ⁻¹",
    body: `
      <p>A geometric pattern has a <b>constant ratio</b> r — multiply by the same number each step.</p>
      <div class="formula">r = T₂ ÷ T₁ = T₃ ÷ T₂ = …<br>Tₙ = a·rⁿ⁻¹ &nbsp;(a = T₁)</div>
      <div class="eg">e.g. 6 ; 12 ; 24 ; 48 → r = 2, a = 6, so Tₙ = 6·2ⁿ⁻¹. Then T₄ = 6·2³ = 48.</div>`,
  },
  patGeoCare: {
    title: "Two geometric traps",
    body: `
      <ul>
        <li><b>Dividing?</b> Write r as a <b>fraction</b>. If each term is divided by 2, then r = ½ (multiply by one half).</li>
        <li><b>Don’t merge a and r.</b> In a·rⁿ⁻¹ the power applies to <b>r only</b>. Do rⁿ⁻¹ first, then multiply by a — powers before multiplication.</li>
      </ul>
      <div class="eg">2·3ⁿ⁻¹ at n = 3 is 2·3² = 2·9 = 18, NOT (2·3)² = 36.</div>`,
  },

};
