/* Concept cards: 2D Trigonometry (chapter id "trig"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_TRIG = {
  /* ---------- 2D Trigonometry ---------- */
  trigChooseRule: {
    title: "Which rule do I use?",
    body: `
      <p>Match what you are <b>given</b> to the rule:</p>
      <ul>
        <li><b>Sine rule</b> — a side together with the angle <b>opposite</b> it (two angles & a side, or two sides & a non-included angle).</li>
        <li><b>Cosine rule</b> — two sides and the angle <b>between</b> them (find the third side), or <b>all three sides</b> (find an angle).</li>
        <li><b>Area rule</b> — two sides and the <b>included</b> angle (find the area).</li>
      </ul>
      <div class="formula">side+opposite angle → sine · included angle / 3 sides → cosine · 2 sides + included angle → area</div>`,
  },
  labelling: {
    title: "Labelling — sides and their “friends”",
    body: `
      <p>Angles get <b>capital</b> letters (Â, B̂, Ĉ); sides get <b>lower-case</b> letters (a, b, c).</p>
      <p>Each side is named after the angle <b>opposite</b> it — they are “friends” looking across the triangle: side <b>a</b> is opposite <b>Â</b>.</p>
      <ul>
        <li>The <b>biggest</b> angle is opposite the <b>longest</b> side.</li>
        <li>The <b>smallest</b> angle is opposite the <b>shortest</b> side.</li>
      </ul>
      <div class="eg">Never judge sizes by eye — a sketch is not to scale.</div>`,
  },
  sineRuleSide: {
    title: "Sine rule — finding a side",
    body: `
      <p>Use it when you have a side paired with its opposite angle. Put the <b>sides on top</b>:</p>
      <div class="formula">a/sinÂ = b/sinB̂ = c/sinĈ</div>
      <p>Write only the two ratios you need, then cross-multiply.</p>
      <div class="eg">e.g. x opposite 50°, with 12 opposite 40°:  x/sin50° = 12/sin40°  →  x = 12·sin50°/sin40°.</div>`,
  },
  sineRuleAngle: {
    title: "Sine rule — finding an angle",
    body: `
      <p>Flip the rule so the <b>sines are on top</b>:</p>
      <div class="formula">sinÂ/a = sinB̂/b = sinĈ/c</div>
      <p>Solve for the sine, then SHIFT sin that value to get the angle.</p>
      <div class="eg">e.g. sinθ/9 = sin50°/13  →  sinθ = 9·sin50°/13 = 0,5303  →  <span class="nowrap">SHIFT sin (0,5303)</span> → θ = 32,0°.</div>`,
  },
  ambiguousCase: {
    title: "The ambiguous case",
    body: `
      <p>Only with the <b>sine rule</b>, and only with two sides and a <b>non-included</b> angle (SSA). Sometimes <b>two</b> triangles fit.</p>
      <p>Compare the side <b>a</b> opposite the known angle Â with <b>h = b·sinÂ</b>:</p>
      <ul>
        <li>a &lt; h → <b>no</b> triangle</li>
        <li>a = h → <b>one</b> triangle (right-angled)</li>
        <li>h &lt; a &lt; b → <b>two</b> triangles (acute and obtuse)</li>
        <li>a ≥ b → <b>one</b> triangle</li>
      </ul>
      <div class="formula">obtuse angle = 180° − (acute angle)</div>`,
  },
  cosineRuleSide: {
    title: "Cosine rule — finding a side",
    body: `
      <p>Use it with two sides and the <b>included</b> angle (the angle between them).</p>
      <div class="formula">a² = b² + c² − 2bc·cosÂ</div>
      <p>(side you want)² = (sum of the other two squared) − 2 × (those two) × cos(angle between them). Work out the right side, then square-root.</p>`,
  },
  cosineRuleAngle: {
    title: "Cosine rule — finding an angle",
    body: `
      <p>Use it when you know <b>all three sides</b>. Rearranged so the cosine is the subject:</p>
      <div class="formula">cosÂ = (b² + c² − a²) / (2bc)</div>
      <p>The side <b>opposite</b> the angle you want is the one subtracted on top. Work out cos of the angle first, then SHIFT cos that value — and if cos came out <b>negative</b>, the calculator hands you the <b>obtuse</b> angle on its own.</p>
      <div class="eg">This SSS form is <b>not</b> on the formula sheet — memorise it.</div>`,
  },
  areaRule: {
    title: "Area rule",
    body: `
      <p>Use two sides and the angle <b>included</b> between them:</p>
      <div class="formula">Area = ½·b·c·sinÂ</div>
      <p>If the angle you have is not between the two sides, find the included angle first (sine or cosine rule).</p>`,
  },
  areaPolygon: {
    title: "Area of a regular polygon",
    body: `
      <p>Split a regular n-gon into <b>n equal triangles</b> from the centre. Each centre angle is 360°/n.</p>
      <div class="formula">Area = n·s² / (4·tan(180°/n))</div>
      <div class="eg">e.g. a regular octagon (n = 8) with side 10:  Area = 8·10² / (4·tan22,5°).</div>`,
  },
  areaQuad: {
    title: "Area of a composite shape",
    body: `
      <p>Break the figure into triangles (and rectangles) whose areas you can find, then <b>add them up</b>.</p>
      <p>If you need a missing length first — like the base shared by two parts — get it from the <b>cosine rule</b>, then apply the area rule or length × breadth.</p>`,
  },
  shortestDistance: {
    title: "Shortest distance to a line",
    body: `
      <p>The shortest distance from a point to a side is the <b>perpendicular</b> height to that side.</p>
      <p>Find the triangle's area, then turn the area formula around:</p>
      <div class="formula">Area = ½·base·height<br>→ height = 2·Area / base</div>`,
  },
  mixedStrategy: {
    title: "Working through a problem",
    body: `
      <p>Three questions, in order:</p>
      <ol>
        <li><b>What am I given?</b> Label the sides and angles (friends).</li>
        <li><b>Which rule fits?</b> Side+opposite angle → sine; included angle or 3 sides → cosine; area from 2 sides + included angle → area rule.</li>
        <li><b>Do I need a stepping stone?</b> Often find one missing angle or side first, then the thing asked.</li>
      </ol>`,
  },

};
