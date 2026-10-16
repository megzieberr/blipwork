/* Concept cards: Trig Graphs (chapter id "tgraph"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_TGRAPH = {
  /* ---- Trig Graphs (Chapter 6) ---- */
  trigParents: {
    title: "The three parent graphs",
    body: `
      <p>Three shapes to know by heart (for x from 0° to 360°):</p>
      <ul>
        <li><b>y = sin x</b> — starts at 0, peak +1 at 90°, back to 0 at 180°, low −1 at 270°.</li>
        <li><b>y = cos x</b> — starts at its peak +1 at 0°, 0 at 90°, low −1 at 180°. Cosine is sine shifted 90° left.</li>
        <li><b>y = tan x</b> — climbs through 0 at 0°, 180° and 360°, with vertical <b>asymptotes</b> at 90° and 270°.</li>
      </ul>
      <p>Sine and cosine are "identical twins": same amplitude (1), same period (360°), same range [−1 ; 1].</p>`,
  },
  trigParams: {
    title: "What a, b and q do",
    body: `
      <p>Every graph is written as <b>y = a·sin b(x − p) + q</b> — cos and tan use the same form:</p>
      <ul>
        <li><b>a</b> — sets the amplitude: its <b>size</b> |a| is the height from the midline to a peak. A <b>negative a</b> flips the graph upside-down.</li>
        <li><b>b</b> — squashes the graph sideways: a bigger b means more cycles (a shorter graph).</li>
        <li><b>q</b> — slides the whole graph up (q &gt; 0) or down (q &lt; 0). The midline becomes y = q.</li>
      </ul>
      <div class="eg">y = 2sin x is twice as tall as sin x; y = −sin x is sin x flipped; y = sin x + 3 sits 3 units higher.</div>`,
  },
  trigPeriod: {
    title: "Period",
    body: `
      <p>The <b>period</b> is the length of <b>one full cycle</b> (one complete wave).</p>
      <div class="formula">sin &amp; cos: period = 360° ÷ b   ·   tan: period = 180° ÷ b</div>
      <p>A larger b gives a shorter graph (more cycles squeezed into 360°); a smaller b gives a longer graph.</p>
      <div class="eg">y = cos 3x → 360° ÷ 3 = 120°.  y = tan 2x → 180° ÷ 2 = 90°.  y = sin ½x → 360° ÷ ½ = 720°.</div>`,
  },
  trigAmplitude: {
    title: "Amplitude",
    body: `
      <p>The <b>amplitude</b> is the height from the midline up to a peak — always positive.</p>
      <div class="formula">amplitude = |a| = (y max − y min) ÷ 2</div>
      <p>The sign of a only flips the graph; it does not change the amplitude. <b>Tangent has no amplitude</b> (it has no maximum or minimum) — its amplitude is undefined.</p>
      <div class="eg">y = −3cos x → amplitude 3.  y = ½sin x → amplitude ½.  y = tan 2x → undefined.</div>`,
  },
  trigRange: {
    title: "Range",
    body: `
      <p>The <b>range</b> is the set of y-values the graph reaches.</p>
      <div class="formula">sin &amp; cos: from (q − amplitude) up to (q + amplitude)   ·   tan: y ∈ ℝ</div>
      <p>Start with the midline y = q, then go one amplitude down and one amplitude up. Tangent reaches every real value, so its range is always ℝ.</p>
      <div class="eg">y = 2sin x − 1 → midline −1, amplitude 2 → range [−3 ; 1].  y = tan x + 5 → y ∈ ℝ.</div>`,
  },
  trigCycles: {
    title: "How many cycles (curves)",
    body: `
      <p>The number of complete cycles over an interval is the interval length divided by the period.</p>
      <div class="formula">number of cycles = interval length ÷ period</div>
      <p>Over a 360° interval this is just equal to b (since period = 360° ÷ b).</p>
      <div class="eg">y = sin 2x on [0° ; 360°] → 360 ÷ 180 = 2 cycles.  y = cos 3x → 3 cycles.</div>`,
  },
  trigShifts: {
    title: "Horizontal & vertical shifts",
    body: `
      <p><b>Vertical (q):</b> q &gt; 0 shifts up, q &lt; 0 shifts down — the midline moves to y = q.</p>
      <p><b>Horizontal (p):</b> the bracket is (x − p). Read p as the number after the sign, and the graph moves the <b>opposite</b> way:</p>
      <ul>
        <li>sin(x − 30°) → shifts 30° to the <b>right</b>.</li>
        <li>sin(x + 30°) → shifts 30° to the <b>left</b>.</li>
      </ul>
      <p>If b ≠ 1, factor it out first: sin(2x − 60°) = sin 2(x − 30°), so the real shift is 30°, not 60°.</p>`,
  },
  tanGraph: {
    title: "The tangent graph",
    body: `
      <p>tan x = sin x ÷ cos x, so:</p>
      <ul>
        <li><b>x-intercepts</b> where the top is zero: sin x = 0 (at 0°, 180°, 360°, …).</li>
        <li><b>Asymptotes</b> where the bottom is zero: cos x = 0 (at 90°, 270°, …) — the graph is undefined there.</li>
      </ul>
      <div class="formula">period = 180°   ·   asymptotes are 180° apart   ·   range y ∈ ℝ</div>
      <p>It has no amplitude — there is no highest or lowest point.</p>`,
  },
  tanAValue: {
    title: "Finding a for a tan graph",
    body: `
      <p>A tan graph has no max or min, so use two reference points <b>45° on either side</b> of an inflection point (where a branch crosses its midline).</p>
      <div class="formula">a = ("y at +45°" − "y at −45°") ÷ 2</div>
      <p>This works because tan 45° = 1 and tan(−45°) = −1, so 45° from the centre the graph sits one a above (or below) the midline.</p>
      <div class="eg">If the references are 3 and −1, then a = (3 − (−1)) ÷ 2 = 2.</div>`,
  },
  findTrigEquation: {
    title: "Finding the equation from a graph",
    body: `
      <p>Compare the graph with the parent (sin, cos or tan) and read off, in turn:</p>
      <ul>
        <li><b>a</b> — amplitude = (y max − y min) ÷ 2; make it negative if the graph is flipped.</li>
        <li><b>q</b> — the midline: q = (y max + y min) ÷ 2.</li>
        <li><b>b</b> — from the period: b = 360° ÷ period (use 180° for tan).</li>
        <li><b>p</b> — how far it has shifted left or right.</li>
      </ul>
      <p>Then write y = a·sin b(x − p) + q.</p>`,
  },
  trigTogether: {
    title: "Two graphs together",
    body: `
      <p>When two trig graphs share a set of axes:</p>
      <ul>
        <li><b>Intersections</b> are the x-values where f(x) = g(x) — read them where the curves cross.</li>
        <li><b>f(x) &gt; g(x)</b> wherever the f-curve is <b>above</b> the g-curve.</li>
        <li><b>f(x) &gt; 0</b> wherever the curve is above the x-axis (between its x-intercepts).</li>
      </ul>
      <p>Always work within the interval the question gives you.</p>`,
  },

};
