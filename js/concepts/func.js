/* Concept cards: Functions (chapter id "func"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_FUNC = {
  /* ---------------- Functions ---------------- */
  funcTypes: {
    title: "The four function families",
    body: `
      <p>Spot the family from the equation:</p>
      <ul>
        <li><b>Straight line</b> — just an x, no powers, no x on the bottom: y = ax + q.</li>
        <li><b>Parabola</b> — has an <b>x²</b> (or a bracket squared): y = ax² + bx + c. Shape ∪ or ∩, one turning point.</li>
        <li><b>Hyperbola</b> — x in the <b>denominator</b>: y = a/(x − p) + q. Two branches, two asymptotes.</li>
        <li><b>Exponential</b> — x in the <b>exponent</b>: y = a·b<sup>x − p</sup> + q. One horizontal asymptote, no turning point.</li>
      </ul>
      <p>Names for y: f(x), g(x), h(x). f(3) means “substitute x = 3 and read the y-value”.</p>`,
  },
  domainRange: {
    title: "Domain & range",
    body: `
      <p><b>Domain</b> = all the x-values the graph uses. <b>Range</b> = all the y-values.</p>
      <ul>
        <li><b>Line / parabola / exponential:</b> domain is x ∈ ℝ (every x works).</li>
        <li><b>Hyperbola:</b> domain x ∈ ℝ, x ≠ p (it skips the vertical asymptote).</li>
      </ul>
      <p>Range:</p>
      <ul>
        <li><b>Parabola:</b> y ≥ q (happy) or y ≤ q (sad), where q is the turning-point y.</li>
        <li><b>Hyperbola:</b> y ∈ ℝ, y ≠ q (skips the horizontal asymptote).</li>
        <li><b>Exponential:</b> y &gt; q (a &gt; 0) or y &lt; q (a &lt; 0).</li>
      </ul>`,
  },
  linearGraph: {
    title: "The straight line y = ax + q",
    body: `
      <p><b>a</b> is the gradient, <b>q</b> is the y-intercept.</p>
      <ul>
        <li>a &gt; 0 → increasing (slopes up); a &lt; 0 → decreasing (slopes down).</li>
        <li><b>y-intercept:</b> let x = 0 → it is just q, the point (0 ; q).</li>
        <li><b>x-intercept:</b> let y = 0 and solve for x.</li>
      </ul>
      <div class="eg">y = 2x − 6: y-intercept (0 ; −6); x-intercept where 0 = 2x − 6 → x = 3, point (3 ; 0).</div>`,
  },
  parabolaShape: {
    title: "The parabola — shape & turning point",
    body: `
      <p>Standard form y = ax² + bx + c; turning-point form y = a(x − p)² + q with turning point (p ; q).</p>
      <ul>
        <li><b>a &gt; 0</b> → “happy” ∪, opens up, has a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → “sad” ∩, opens down, has a <b>maximum</b>.</li>
        <li><b>Turning point x</b> = −b/(2a); substitute back for the y.</li>
        <li><b>Axis of symmetry</b> = the vertical line through the turning point, x = p.</li>
      </ul>`,
  },
  hyperbolaGraph: {
    title: "The hyperbola y = a/(x − p) + q",
    body: `
      <p>Two branches sitting around two asymptotes:</p>
      <ul>
        <li><b>Vertical asymptote:</b> x = p.</li>
        <li><b>Horizontal asymptote:</b> y = q.</li>
        <li><b>a &gt; 0</b> → branches top-right & bottom-left, each <b>decreasing</b>.</li>
        <li><b>a &lt; 0</b> → branches top-left & bottom-right, each <b>increasing</b>.</li>
      </ul>
      <p>The graph never touches its asymptotes — that is why x ≠ p and y ≠ q.</p>`,
  },
  exponentialGraph: {
    title: "The exponential y = a·b<sup>x − p</sup> + q",
    body: `
      <p>One horizontal asymptote and no turning point.</p>
      <ul>
        <li><b>Asymptote:</b> y = q (the graph flattens towards it).</li>
        <li><b>b &gt; 1</b> → growth (“taking off”, increasing). <b>0 &lt; b &lt; 1</b> → decay (“landing”, decreasing).</li>
        <li><b>a &gt; 0</b> → graph above the asymptote (range y &gt; q). <b>a &lt; 0</b> → below (y &lt; q).</li>
        <li><b>p</b> — the exponent is (x − p). Read p as the number after the sign, and the graph moves the <b>opposite</b> way: 2<sup>x − 3</sup> is 3 units to the <b>right</b>, and 2<sup>x + 3</sup> is 3 units to the <b>left</b>.</li>
      </ul>
      <p>In Grade 10 the exponential was y = a·bˣ + q. Grade 11 adds the p.</p>
      <div class="eg">A fraction base is a negative exponent: (½)ˣ = 2⁻ˣ.</div>`,
  },
  readGraph: {
    title: "Reading features off a graph",
    body: `
      <ul>
        <li><b>y-intercept:</b> where the graph crosses the y-axis (x = 0).</li>
        <li><b>x-intercept(s):</b> where it crosses the x-axis (y = 0).</li>
        <li><b>Turning point:</b> the lowest/highest point of a parabola — read both coordinates.</li>
        <li><b>Asymptotes:</b> the dashed lines the graph hugs but never touches.</li>
      </ul>
      <p>Follow a point straight down to the x-axis for its x-value, and straight across to the y-axis for its y-value.</p>`,
  },
  incDec: {
    title: "Increasing & decreasing",
    body: `
      <p>Read the graph <b>left to right</b>: going up = increasing, going down = decreasing.</p>
      <p>A parabola changes direction at its turning point x = p:</p>
      <ul>
        <li><b>Happy (∪):</b> decreasing for x &lt; p, increasing for x &gt; p.</li>
        <li><b>Sad (∩):</b> increasing for x &lt; p, decreasing for x &gt; p.</li>
      </ul>
      <p>A straight line is increasing everywhere (a &gt; 0) or decreasing everywhere (a &lt; 0).</p>`,
  },
  posNeg: {
    title: "Where a graph is positive or negative",
    body: `
      <p>“f(x)” is the <b>y-value</b>, so:</p>
      <ul>
        <li><b>f(x) &gt; 0</b> — the graph is <b>above</b> the x-axis.</li>
        <li><b>f(x) &lt; 0</b> — the graph is <b>below</b> the x-axis.</li>
      </ul>
      <p>The x-intercepts are the boundaries. For a parabola with intercepts a &lt; b:</p>
      <ul>
        <li><b>Happy:</b> above for x &lt; a or x &gt; b; below for a &lt; x &lt; b.</li>
        <li><b>Sad:</b> above for a &lt; x &lt; b; below for x &lt; a or x &gt; b.</li>
      </ul>
      <p>Always write x first, e.g. <i>−2 &lt; x &lt; 3</i>.</p>`,
  },
  ineqCombined: {
    title: "Product & quotient inequalities (signs)",
    body: `
      <p>It is all about <b>signs</b>:</p>
      <ul>
        <li><b>f(x)·g(x) &gt; 0</b> — same side of the x-axis (both above, or both below).</li>
        <li><b>f(x)·g(x) &lt; 0</b> — different sides (one above, one below).</li>
        <li><b>f(x)/g(x)</b> — same rule, but g(x) ≠ 0.</li>
        <li><b>x·f(x) &gt; 0</b> — x and the y-value have the <b>same</b> sign → quadrants 1 &amp; 3.</li>
        <li><b>x·f(x) &lt; 0</b> — different signs → quadrants 2 &amp; 4.</li>
      </ul>
      <p>When comparing two graphs (f &gt; g), the boundaries are the x-values of the <b>intersection</b> points.</p>`,
  },
  transformations: {
    title: "Transformations",
    body: `
      <p>Starting from f(x):</p>
      <ul>
        <li><b>Up/down:</b> f(x) + k (up), f(x) − k (down).</li>
        <li><b>Left/right (inside with x):</b> f(x + k) shifts <b>left</b>, f(x − k) shifts <b>right</b>.</li>
        <li><b>Reflection in the x-axis:</b> −f(x) (the y’s change sign).</li>
        <li><b>Reflection in the y-axis:</b> f(−x) (the x’s change sign).</li>
        <li><b>Vertical stretch:</b> k·f(x).</li>
      </ul>
      <p>A vertical shift moves a parabola’s turning point y and an asymptote y = q; x stays the same.</p>`,
  },
  intersections: {
    title: "Where two graphs meet",
    body: `
      <p>An <b>intersection</b> point lies on <b>both</b> graphs at once — read its coordinates off both axes.</p>
      <p>To compare graphs:</p>
      <ul>
        <li><b>f(x) &gt; g(x)</b> — where f is <b>above</b> g.</li>
        <li>The graphs swap over at their intersection points, so those x-values are the boundaries.</li>
      </ul>`,
  },
  natureRoots: {
    title: "Nature of the roots",
    body: `
      <p>The roots (x-intercepts) of a parabola depend on the discriminant Δ = b² − 4ac:</p>
      <ul>
        <li><b>Δ &gt; 0</b> — two real, unequal roots (cuts the x-axis twice).</li>
        <li><b>Δ = 0</b> — two equal roots (touches the x-axis once).</li>
        <li><b>Δ &lt; 0</b> — non-real roots (never reaches the x-axis).</li>
      </ul>
      <p><b>The y = k method:</b> for a happy parabola with turning-point value y₀, the line y = k meets it <b>twice</b> when k &gt; y₀, <b>once</b> when k = y₀, and <b>not at all</b> when k &lt; y₀.</p>`,
  },
  avgGradient: {
    title: "Average gradient",
    body: `
      <p>The average gradient between two points is the gradient of the straight line joining them.</p>
      <div class="formula">average gradient = (y₂ − y₁) / (x₂ − x₁)</div>
      <p>First substitute each x into the function to get its y-value, then use the formula.</p>
      <div class="eg">f(x) = x² − 4 between x = −1 and x = 3: points (−1 ; −3) and (3 ; 5) → (5 − (−3))/(3 − (−1)) = 2.</div>`,
  },
  maxLength: {
    title: "Maximum / minimum length between graphs",
    body: `
      <p>For a vertical line between two graphs:</p>
      <div class="formula">length = <span class="nowrap">(graph on top)</span> − <span class="nowrap">(graph below)</span></div>
      <p>If one is a parabola, that difference is itself a parabola. Find where it turns (x = −b/(2a)) and substitute back to get the biggest (or smallest) length.</p>
      <div class="eg">Keep the brackets when subtracting: g − f = −x + 9 − (x² − 2x + 3) = −x² + x + 6.</div>`,
  },

};
