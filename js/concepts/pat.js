/* Concept cards: Number Patterns (chapter id "pat"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_PAT = {
  /* ---------------- Number Patterns ---------------- */
  patClassify: {
    title: L("Which kind of pattern?", "Watter soort patroon?"),
    body: L(`
      <p>Build the <b>difference pyramid</b>: write the terms, then the gaps between them (first differences), then the gaps of those (second differences).</p>
      <ul>
        <li><b>First difference constant</b> → <b>arithmetic</b> (linear). You add the same number each time.</li>
        <li><b>Second difference constant</b> → <b>quadratic</b>. The first differences change by the same amount.</li>
        <li><b>Constant ratio</b> (divide a term by the one before it) → <b>geometric</b>. You multiply by the same number each time.</li>
      </ul>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → first diffs +3, +3, +3 → arithmetic. 1 ; 4 ; 11 ; 22 → second diffs 4, 4 → quadratic. 6 ; 12 ; 24 → ×2 each time → geometric.</div>`, `
      <p>Bou die <b>verskilpiramide</b>: skryf die terme neer, dan die gapings tussen hulle (eerste verskille), dan die gapings tussen dié (tweede verskille).</p>
      <ul>
        <li><b>Eerste verskil konstant</b> → <b>rekenkundig</b> (lineêr). Jy tel elke keer dieselfde getal by.</li>
        <li><b>Tweede verskil konstant</b> → <b>kwadraties</b>. Die eerste verskille verander elke keer met dieselfde hoeveelheid.</li>
        <li><b>Konstante verhouding</b> (deel 'n term deur die vorige een) → <b>meetkundig</b>. Jy vermenigvuldig elke keer met dieselfde getal.</li>
      </ul>
      <div class="eg">bv. 4 ; 7 ; 10 ; 13 → eerste verskille +3, +3, +3 → rekenkundig. 1 ; 4 ; 11 ; 22 → tweede verskille 4, 4 → kwadraties. 6 ; 12 ; 24 → elke keer ×2 → meetkundig.</div>`),
  },
  patArithmetic: {
    title: L("Arithmetic (linear) patterns", "Rekenkundige (lineêre) patrone"),
    body: L(`
      <p>An arithmetic pattern has a <b>constant first difference</b> d — the same number added each step.</p>
      <div class="formula">d = T₂ − T₁ = T₃ − T₂ = …</div>
      <p>Find d by subtracting any term from the one after it.</p>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → d = 7 − 4 = 3.</div>`, `
      <p>'n Rekenkundige patroon het 'n <b>konstante eerste verskil</b> d: elke stap word dieselfde getal bygetel.</p>
      <div class="formula">d = T₂ − T₁ = T₃ − T₂ = …</div>
      <p>Vind d: trek enige term af van die term ná hom.</p>
      <div class="eg">bv. 4 ; 7 ; 10 ; 13 → d = 7 − 4 = 3.</div>`),
  },
  // Gr11 shortcut ONLY (her ruling 2026-08-23): a = constant difference, c = T₀.
  // The Gr12 a + (n − 1)d form is never shown to learners.
  patArithTerm: {
    title: L("The general term of an arithmetic pattern", "Die algemene term van 'n rekenkundige patroon"),
    body: L(`
      <p>One formula:</p>
      <div class="formula">Tₙ = an + c &nbsp;&nbsp;(a = the constant difference, c = T₀)</div>
      <ol>
        <li><b>a</b> is the constant difference — so if the pattern goes up by 3 each time, the formula starts with <b>3n</b>.</li>
        <li><b>c</b> is T₀, the term that would sit <b>before</b> T₁. Take T₁ and step <b>backwards</b> one difference: c = T₁ − d.</li>
      </ol>
      <p>Once you have Tₙ: substitute n for any term; or set Tₙ equal to a value and solve for n to find <b>which</b> term it is.</p>
      <div class="eg">e.g. −1 ; 2 ; 5 ; 8 → the difference is 3, so start with 3n. Step back from T₁: −1 − 3 = −4, so c = −4 and Tₙ = 3n − 4. Then T₁₀ = 3(10) − 4 = 26.</div>`, `
      <p>Een formule:</p>
      <div class="formula">Tₙ = an + c &nbsp;&nbsp;(a = die konstante verskil, c = T₀)</div>
      <ol>
        <li><b>a</b> is die konstante verskil, dus as die patroon elke keer met 3 styg, begin die formule met <b>3n</b>.</li>
        <li><b>c</b> is T₀, die term wat <b>voor</b> T₁ sou staan. Neem T₁ en stap een verskil <b>terug</b>: c = T₁ − d.</li>
      </ol>
      <p>Sodra jy Tₙ het: vervang n om enige term te kry; of stel Tₙ gelyk aan 'n waarde en los op vir n om te vind <b>watter</b> term dit is.</p>
      <div class="eg">bv. −1 ; 2 ; 5 ; 8 → die verskil is 3, dus begin met 3n. Stap terug van T₁: −1 − 3 = −4, dus c = −4 en Tₙ = 3n − 4. Dan is T₁₀ = 3(10) − 4 = 26.</div>`),
  },
  patQuadratic: {
    title: L("Quadratic patterns → Tₙ = an² + bn + c", "Kwadratiese patrone → Tₙ = an² + bn + c"),
    body: L(`
      <p>A quadratic pattern has a <b>constant second difference</b>. Build the pyramid, then work from the <b>bottom up</b> with three relationships:</p>
      <div class="formula">2a = second difference<br>3a + b = T₂ − T₁<br>a + b + c = T₁</div>
      <ol>
        <li>2a = second difference → solve for <b>a</b>.</li>
        <li>3a + b = T₂ − T₁ → put a in, solve for <b>b</b>.</li>
        <li>a + b + c = T₁ → put a, b in, solve for <b>c</b>.</li>
      </ol>
      <div class="eg">e.g. 1 ; 4 ; 11 ; 22 → 2nd diff 4 → a = 2; 3(2)+b = 3 → b = −3; 2−3+c = 1 → c = 2. Tₙ = 2n² − 3n + 2.</div>`, `
      <p>'n Kwadratiese patroon het 'n <b>konstante tweede verskil</b>. Bou die piramide en werk dan van <b>onder na bo</b> met drie vergelykings:</p>
      <div class="formula">2a = tweede verskil<br>3a + b = T₂ − T₁<br>a + b + c = T₁</div>
      <ol>
        <li>2a = tweede verskil → los op vir <b>a</b>.</li>
        <li>3a + b = T₂ − T₁ → sit a in, los op vir <b>b</b>.</li>
        <li>a + b + c = T₁ → sit a, b in, los op vir <b>c</b>.</li>
      </ol>
      <div class="eg">bv. 1 ; 4 ; 11 ; 22 → 2de verskil 4 → a = 2; 3(2)+b = 3 → b = −3; 2−3+c = 1 → c = 2. Tₙ = 2n² − 3n + 2.</div>`),
  },
  patQuadUnknown: {
    title: L("Finding a missing term", "Vind 'n ontbrekende term"),
    body: L(`
      <p>In a quadratic pattern the <b>second difference is constant</b> — use that to fill a gap.</p>
      <ol>
        <li>Write the first differences (some contain the unknown x).</li>
        <li>Form the two second differences from them.</li>
        <li>Set the two second differences <b>equal</b> (they must be the same) and solve for x.</li>
      </ol>
      <div class="eg">For T₁ ; T₂ ; x ; T₄ : (x − T₂) − (T₂ − T₁) = (T₄ − x) − (x − T₂), then solve for x.</div>`, `
      <p>In 'n kwadratiese patroon is die <b>tweede verskil konstant</b>: gebruik dit om 'n gaping te vul.</p>
      <ol>
        <li>Skryf die eerste verskille neer (sommige bevat die onbekende x).</li>
        <li>Vorm die twee tweede verskille daaruit.</li>
        <li>Stel die twee tweede verskille <b>gelyk</b> (hulle moet dieselfde wees) en los op vir x.</li>
      </ol>
      <div class="eg">Vir T₁ ; T₂ ; x ; T₄ : (x − T₂) − (T₂ − T₁) = (T₄ − x) − (x − T₂), los dan op vir x.</div>`),
  },
  patMinMax: {
    title: L("Minimum & maximum term", "Minimum- & maksimumterm"),
    body: L(`
      <p>A quadratic pattern lies on a parabola, so it has a turning point — the smallest or largest term.</p>
      <ul>
        <li><b>a &gt; 0</b> → ‘happy’ parabola → the turning point is a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → ‘sad’ parabola → the turning point is a <b>maximum</b>.</li>
      </ul>
      <div class="formula">term number of the extreme: n = −b ÷ (2a)</div>
      <p>That n tells you <b>which</b> term is the extreme (it must be a natural number — round to the nearest if needed). Substitute it back into Tₙ for the extreme <b>value</b>.</p>`, `
      <p>'n Kwadratiese patroon lê op 'n parabool, dus het dit 'n draaipunt: die kleinste of grootste term.</p>
      <ul>
        <li><b>a &gt; 0</b> → ‘happy’ parabool → die draaipunt is 'n <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → ‘sad’ parabool → die draaipunt is 'n <b>maksimum</b>.</li>
      </ul>
      <div class="formula">termnommer van die uiterste: n = −b ÷ (2a)</div>
      <p>Daardie n sê vir jou <b>watter</b> term die uiterste is (dit moet 'n natuurlike getal wees: rond af na die naaste een indien nodig). Vervang dit terug in Tₙ om die uiterste <b>waarde</b> te kry.</p>`),
  },
  patConsecDiff: {
    title: L("The gap between consecutive terms", "Die gaping tussen opeenvolgende terme"),
    body: L(`
      <p>The first differences of a quadratic pattern form their own <b>arithmetic</b> pattern:</p>
      <ul>
        <li>first term = T₂ − T₁ (the first gap),</li>
        <li>common difference = the constant <b>second difference</b>.</li>
      </ul>
      <p>So a question about a gap becomes a question about a term of that linear gap-pattern:</p>
      <div class="formula">gap between Tₖ and Tₖ₊₁ = the kth term of the gap-pattern<br>gapₙ = an + c &nbsp;&nbsp;(a = the second difference, c = gap₀ = first gap − a)</div>
      <div class="eg">−5 ; 0 ; 7 ; 16 ; 27 → gaps 5 ; 7 ; 9 ; 11 (linear, common difference 2). So a = 2, c = 5 − 2 = 3, and gapₙ = 2n + 3. The gap between T₁₀ and T₁₁ is 2(10) + 3 = 23.</div>`, `
      <p>Die eerste verskille van 'n kwadratiese patroon vorm hul eie <b>rekenkundige</b> patroon:</p>
      <ul>
        <li>eerste term = T₂ − T₁ (die eerste gaping),</li>
        <li>gemeenskaplike verskil = die konstante <b>tweede verskil</b>.</li>
      </ul>
      <p>Dus word 'n vraag oor 'n gaping 'n vraag oor 'n term van daardie lineêre gaping-patroon:</p>
      <div class="formula">gaping tussen Tₖ en Tₖ₊₁ = die k-de term van die gaping-patroon<br>gapingₙ = an + c &nbsp;&nbsp;(a = die tweede verskil, c = gaping₀ = eerste gaping − a)</div>
      <div class="eg">−5 ; 0 ; 7 ; 16 ; 27 → gapings 5 ; 7 ; 9 ; 11 (lineêr, gemeenskaplike verskil 2). Dus a = 2, c = 5 − 2 = 3, en gapingₙ = 2n + 3. Die gaping tussen T₁₀ en T₁₁ is 2(10) + 3 = 23.</div>`),
  },
  patGeometric: {
    title: L("Geometric patterns → Tₙ = a·rⁿ⁻¹", "Meetkundige patrone → Tₙ = a·rⁿ⁻¹"),
    body: L(`
      <p>A geometric pattern has a <b>constant ratio</b> r — multiply by the same number each step.</p>
      <div class="formula">r = T₂ ÷ T₁ = T₃ ÷ T₂ = …<br>Tₙ = a·rⁿ⁻¹ &nbsp;(a = T₁)</div>
      <div class="eg">e.g. 6 ; 12 ; 24 ; 48 → r = 2, a = 6, so Tₙ = 6·2ⁿ⁻¹. Then T₄ = 6·2³ = 48.</div>`, `
      <p>'n Meetkundige patroon het 'n <b>konstante verhouding</b> r: vermenigvuldig elke stap met dieselfde getal.</p>
      <div class="formula">r = T₂ ÷ T₁ = T₃ ÷ T₂ = …<br>Tₙ = a·rⁿ⁻¹ &nbsp;(a = T₁)</div>
      <div class="eg">bv. 6 ; 12 ; 24 ; 48 → r = 2, a = 6, dus Tₙ = 6·2ⁿ⁻¹. Dan is T₄ = 6·2³ = 48.</div>`),
  },
  patGeoCare: {
    title: L("Two geometric traps", "Twee meetkundige slaggate"),
    body: L(`
      <ul>
        <li><b>Dividing?</b> Write r as a <b>fraction</b>. If each term is divided by 2, then r = ½ (multiply by one half).</li>
        <li><b>Don’t merge a and r.</b> In a·rⁿ⁻¹ the power applies to <b>r only</b>. Do rⁿ⁻¹ first, then multiply by a — powers before multiplication.</li>
      </ul>
      <div class="eg">2·3ⁿ⁻¹ at n = 3 is 2·3² = 2·9 = 18, NOT (2·3)² = 36.</div>`, `
      <ul>
        <li><b>Deel jy?</b> Skryf r as 'n <b>breuk</b>. As elke term deur 2 gedeel word, is r = ½ (vermenigvuldig met 'n half).</li>
        <li><b>Moenie a en r saamvoeg nie.</b> In a·rⁿ⁻¹ geld die eksponent <b>net vir r</b>. Werk rⁿ⁻¹ eers uit, vermenigvuldig dan met a: magte kom voor vermenigvuldiging.</li>
      </ul>
      <div class="eg">2·3ⁿ⁻¹ by n = 3 is 2·3² = 2·9 = 18, NIE (2·3)² = 36 nie.</div>`),
  },

};
