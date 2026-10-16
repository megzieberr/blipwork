/* Concept cards: Analytical Geometry (chapter id "analytical"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_ANALYTICAL = {
  /* ---------- Analytical Geometry ---------- */
  whichFormula: {
    title: "Which formula — and what its answer looks like",
    body: `
      <p>Three formulas do three different jobs. Ask yourself what you’re after:</p>
      <ul>
        <li><b>Distance</b> → a <b>length</b> (one positive number): AB = √[(x<sub>B</sub>−x<sub>A</sub>)² + (y<sub>B</sub>−y<sub>A</sub>)²]</li>
        <li><b>Midpoint</b> → a <b>coordinate</b> (x ; y): M = ( (x<sub>A</sub>+x<sub>B</sub>)/2 ; (y<sub>A</sub>+y<sub>B</sub>)/2 )</li>
        <li><b>Gradient</b> → a <b>slope number</b>: m = (y<sub>B</sub>−y<sub>A</sub>)/(x<sub>B</sub>−x<sub>A</sub>)</li>
      </ul>
      <p>Small <b>m</b> = gradient. Capital <b>M</b> = midpoint. Keep the points in the SAME order: top and bottom in the gradient formula, and in BOTH brackets of the distance formula.</p>`,
  },
  gradientSign: {
    title: "The sign of a gradient",
    body: `
      <p>Gradient = rise ÷ run. Read the line from <b>left to right</b>:</p>
      <ul>
        <li><b>Positive</b> — the line goes <b>up</b> ↗ (increasing).</li>
        <li><b>Negative</b> — the line goes <b>down</b> ↘ (decreasing).</li>
      </ul>
      <p>Steepness is the <b>size</b> of the gradient (ignore the sign): a gradient of −4 is steeper than one of 2.</p>`,
  },
  specialLines: {
    title: "Horizontal & vertical lines",
    body: `
      <p>The two lines learners mix up:</p>
      <ul>
        <li><b>Horizontal</b> line — no rise, only run → gradient = <b>0</b> (e.g. 0 ÷ 6 = 0).</li>
        <li><b>Vertical</b> line — no run → you’d divide by 0, so the gradient is <b>undefined</b>.</li>
      </ul>
      <div class="eg">Flat = zero. Straight up = undefined.</div>`,
  },
  parallelPerp: {
    title: "Parallel & perpendicular (the gradient rules)",
    body: `
      <p>Compare the gradients:</p>
      <div class="formula">Parallel:  m<sub>1</sub> = m<sub>2</sub><br>Perpendicular:  m<sub>1</sub> × m<sub>2</sub> = −1</div>
      <p>So perpendicular lines have gradients that are <b>negative reciprocals</b> of each other.</p>
      <div class="eg">e.g. m = 2/3 → the perpendicular gradient is −3/2 (flip it over, change the sign). Check: 2/3 × −3/2 = −1. ✓</div>`,
  },
  perpGradient: {
    title: "The negative reciprocal",
    body: `
      <p>To get the gradient <b>perpendicular</b> to a given one: <b>switch</b> the top and bottom of the fraction, then <b>change the sign</b>.</p>
      <ul>
        <li>m = 2/3 → −3/2</li>
        <li>m = −4 = −4/1 → +1/4</li>
      </ul>
      <p>Reading a gradient from <b>ax + by = 0</b>: make y the subject (y = mx + c); the gradient is <b>−a/b</b>.</p>`,
  },
  angleInclination: {
    title: "Angle of inclination",
    body: `
      <p>θ is the angle the line makes with the <b>positive x-axis</b>, measured anti-clockwise, and</p>
      <div class="formula">tan θ = m</div>
      <ul>
        <li><b>Positive</b> gradient → θ is <b>acute</b>: SHIFT tan the gradient and that IS θ.</li>
        <li><b>Negative</b> gradient → θ is <b>obtuse</b>: SHIFT tan the gradient <b>without</b> its minus, then θ = 180° − that.</li>
      </ul>
      <p><b>Do not</b> put the negative gradient into the calculator with its minus in — drop the sign, get the acute reference angle, then take 180° − that.</p>
      <div class="eg">e.g. m = −4/5 → tan θ = −4/5, and <span class="nowrap">SHIFT tan (4/5)</span> = 38,66°, so θ = 180° − 38,66° = 141,34°.</div>`,
  },
  perpBisector: {
    title: "Perpendicular bisector",
    body: `
      <p>The perpendicular bisector of AB does <b>two</b> things at once:</p>
      <ul>
        <li>it passes through the <b>midpoint</b> of AB, and</li>
        <li>it is <b>perpendicular</b> to AB (crosses it at 90°).</li>
      </ul>
      <p>So its gradient is the <b>negative reciprocal</b> of AB’s gradient, and it goes through M, the midpoint. Every point on it is the same distance from A as from B.</p>`,
  },
  triangleArea: {
    title: "Area of a triangle — base & ⊥height",
    body: `
      <div class="formula">Area = ½ × base × ⊥height</div>
      <p>Pick any side as the <b>base</b>. The <b>perpendicular height</b> (the altitude) is then drawn from the <b>opposite vertex</b>, meeting that base at <b>90°</b>.</p>
      <ul>
        <li>An <b>altitude</b> makes a right angle with the base — that’s the height.</li>
        <li>A <b>median</b> goes to the midpoint — that is <b>not</b> the height.</li>
      </ul>
      <p>Except in a right-angled triangle, the height is a NEW segment inside the triangle, not one of the sides.</p>`,
  },
  proofWords: {
    title: "Lines in a triangle & ‘prove that…’",
    body: `
      <ul>
        <li><b>Median</b> — vertex to the <b>midpoint</b> of the opposite side.</li>
        <li><b>Altitude</b> — vertex, <b>perpendicular</b> to the opposite side (the height).</li>
        <li><b>Perpendicular bisector</b> — through a side’s <b>midpoint</b> AND perpendicular to it.</li>
      </ul>
      <p>To prove things, show:</p>
      <div class="formula">∥ : m<sub>AB</sub> = m<sub>CD</sub><br>⊥ : m<sub>AB</sub> × m<sub>CD</sub> = −1<br>collinear : m<sub>AB</sub> = m<sub>BC</sub><br>parallelogram : diagonals share a midpoint</div>`,
  },

};
