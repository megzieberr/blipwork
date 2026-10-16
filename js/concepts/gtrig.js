/* Concept cards: General Trig (chapter id "gtrig"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_GTRIG = {
  /* ---- GENERAL TRIG (chapter gtrig, stage 2, 2026-08-22) ---- */
  gtrigIntro: {
    fractions: true,
    title: "Trigonometry: where the ratios come from",
    body: `
      <p><b>tri</b>gonometry → <b>three</b> · trigo<b>no</b>metry → <b>angled</b> · trigono<b>metry</b> → <b>measurement</b> — the study of angles and of the angular relationships of triangles.</p>
      <p>SOHCAHTOA only works in a <b>right</b> triangle. <b>Opposite</b> = across from θ. <b>Adjacent</b> = next to θ. <b>Hypotenuse</b> = across from the right angle.</p>
      <div class="formula">sin θ = O/H = y/r &nbsp;·&nbsp; cos θ = A/H = x/r &nbsp;·&nbsp; tan θ = O/A = y/x</div>
      <p>Picture a point moving round a circle: the <b>radius stays the same</b>, but θ, the x-coordinate and the y-coordinate all change. A ratio on its own means nothing — it only means something once you know its θ.</p>
      <div class="eg">"The sine is 0,6" tells you nothing alone. Fix r, move the point, watch x and y — the ratio IS the angle.</div>`,
  },
  gtrigAstc: {
    fractions: true,
    title: "The Cartesian plane: All Strippers Take Cash",
    body: `
      <p>Going anticlockwise from quadrant ①: <b>A</b>ll positive · <b>S</b>trippers (sin only) · <b>T</b>ake (tan only) · <b>C</b>ash (cos only).</p>
      <table class="q-table"><tr><th></th><th>①</th><th>②</th><th>③</th><th>④</th></tr>
        <tr><td>sin θ</td><td>+</td><td>+</td><td>−</td><td>−</td></tr>
        <tr><td>cos θ</td><td>+</td><td>−</td><td>−</td><td>+</td></tr>
        <tr><td>tan θ</td><td>+</td><td>−</td><td>+</td><td>−</td></tr></table>
      <p>Why: cos θ = x/r and sin θ = y/r, and <b>r is always positive</b> (it's the radius) — so the sign is decided by x or y alone, never by r.</p>
      <div class="eg">Quadrant ②: x is negative, y is positive, r is always positive → sin θ = y/r is +, cos θ = x/r is −.</div>`,
  },
  gtrigSpecial: {
    fractions: true,
    title: "Special angles: the two triangles + Oats Are Healthy",
    body: `
      <p>Cut a <b>square</b> corner to corner → the 45-45-90 triangle (sides 1, 1, √2). Cut an <b>equilateral triangle</b> straight down the middle → the 30-60-90 triangle (sides 1, √3, 2).</p>
      <p><b>Oats Are Healthy</b> — the table, built in order: O · A · H down the side, 30° · 45° · 60° across the top:</p>
      <table class="q-table"><tr><th></th><th>30°</th><th>45°</th><th>60°</th></tr>
        <tr><td>O</td><td>1</td><td>1</td><td>√3</td></tr>
        <tr><td>A</td><td>√3</td><td>1</td><td>1</td></tr>
        <tr><td>H</td><td>2</td><td>√2</td><td>2</td></tr></table>
      <p>Values stay <b>unrationalised</b> (tan 30° = 1/√3, not √3/3). Quadrantal angles (0°, 90°, 180°, 270°) are read straight off the graph or the calculator, never memorised.</p>
      <p><b>Masked identities:</b> from sin²θ + cos²θ = 1 → sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ. Reciprocals — "look at the 3rd letter": cosec → sin, sec → cos, cot → tan.</p>
      <div class="eg">tan 30° = O/A = 1/√3. sin 60° = √3/2. cos 90° = 0 (read off the graph).</div>`,
  },

  /* ---- GENERAL TRIG (chapter gtrig, stage 3, 2026-08-22) ---- */
  gtrigCofunction: {
    fractions: true,
    title: "Co-functions: converting between sin and cos",
    body: `
      <p>Draw a right triangle's two acute angles two ways: θ at one corner, <b>90° − θ</b> at the other. They share the SAME sides — just different names for opposite/adjacent — so:</p>
      <div class="formula">sin θ = cos(90° − θ) &nbsp;·&nbsp; cos θ = sin(90° − θ)</div>
      <p><b>90° − θ</b> is quadrant A — everything positive. <b>90° + θ</b> has crossed into quadrant S — only sine stays positive. That's the trap:</p>
      <div class="formula">cos(90° + θ) = −sin θ</div>
      <p>Cosine is not sine, so cos(90° + θ) is negative. (Contrast: sin(90° + θ) = +cos θ — sine is fine there.)</p>
      <p>Negative co-functions (further from the origin, same idea):</p>
      <div class="formula">sin(θ − 90°) = −cos θ &nbsp;·&nbsp; cos(θ − 90°) = sin θ</div>
      <div class="eg">sin 40° = cos 50°. cos 120° = cos(90° + 30°) = −sin 30°.</div>`,
  },
  gtrigReduce: {
    fractions: true,
    title: "Reductions: rewriting angles as acute angles",
    body: `
      <p><b>Reductions = rewriting any angle as ± an acute angle.</b> Every angle repeats every 360°, and every reduced ratio has the same size as the acute one it came from — the sign is the only thing that can change.</p>
      <p>Three steps, in order:</p>
      <div class="formula">① quadrant &nbsp;→&nbsp; ② reduction formula &nbsp;→&nbsp; ③ sign (All Strippers Take Cash)</div>
      <table class="q-table"><tr><th></th><th>positive</th><th>negative</th></tr>
        <tr><td>S ②</td><td>180° − θ</td><td>−180° − θ</td></tr>
        <tr><td>T ③</td><td>180° + θ</td><td>θ − 180°</td></tr>
        <tr><td>C ④</td><td>360° − θ</td><td>−θ &nbsp;/&nbsp; −360° − θ</td></tr>
        <tr><td>A ①</td><td>θ &nbsp;/&nbsp; 360° + θ</td><td>θ − 360°</td></tr></table>
      <p>An angle in (−90°, 0°) is a C-angle straight off the wheel — form −θ, <b>no rotation</b>. Anything past a full turn (past 360°, or below −90°) gets ONE extra first step: add or take off 360°.</p>
      <p>A reduction never swaps the ratio (sin stays sin) — only a co-function does that.</p>
      <div class="eg">sin 210° = sin(180° + 30°) = −sin 30°. sin 510° = [−360°] sin 150° = sin(180° − 30°) = sin 30°.</div>`,
  },
  gtrigTipChips: {
    fractions: true,
    title: "Reductions TIP Chips",
    body: `
      <p>Five checks to run before you commit to an answer:</p>
      <ol>
        <li><b>①</b> positive angle over 360°? → minus 360°. <span class="muted">sin 520° = sin 160°</span></li>
        <li><b>②</b> negative angle under −90°? → add 360°. <span class="muted">sin(−120°) = sin 240°</span> (but an angle above −90° needs NO rotation at all)</li>
        <li><b>③</b> squaring a reduced function? → reduce INSIDE block brackets first, then square: the minus dies. <span class="muted">sin²210° = [−sin 30°]² = sin²30°, positive</span></li>
        <li><b>④</b> the co-functions trap: <span class="muted">cos(90° + θ) = −sin θ</span></li>
        <li><b>⑤</b> co-functions with negative angles: <span class="muted">sin(θ − 90°) = −cos θ &nbsp;·&nbsp; cos(θ − 90°) = sin θ</span></li>
      </ol>
      <p>Positive angles turn anti-clockwise; negative angles turn clockwise; co-functions convert between sin and cos.</p>
      <div class="eg">"but why?" for Chip ⑤: let K = 90° − θ, so θ − 90° = −K, which sits in quadrant IV — where cos survives and sin flips.</div>`,
  },
  gtrigReduceVar: {
    fractions: true,
    title: "Reductions with a variable",
    body: `
      <p>Same machine as a numerical reduction — quadrant, formula, sign — but the value is left as the letter (x, θ, α…) instead of a number, so there's nothing to calculate.</p>
      <p>Reduce every factor in place, keep the minus signs visible in brackets, then cancel:</p>
      <div class="formula">cos(180° + θ) &nbsp;=&nbsp; −cos θ &nbsp;&nbsp;·&nbsp;&nbsp; tan(θ − 180°) &nbsp;=&nbsp; +tan θ</div>
      <p>A plain reduction NEVER swaps the ratio — sin stays sin, cos stays cos, tan stays tan. Only the three co-function forms (90° − θ, 90° + θ, θ − 90°) convert between sin and cos.</p>
      <div class="eg">tan(180° + θ) · sin(360° − θ) / tan(360° − θ) = tan θ · (−sin θ) / (−tan θ) = sin θ.</div>`,
  },

  /* ---- GENERAL TRIG (chapter gtrig, stage 4, 2026-08-22) ---- */
  gtrigSpecialSums: {
    fractions: true,
    title: "Special sums: the five steps",
    body: `
      <p>You are given ONE ratio and ONE interval, and asked to work out the value of some expression. Five steps, in this order:</p>
      <div class="formula">① isolate the function &nbsp;·&nbsp; ② determine the quadrant &nbsp;·&nbsp; ③ sketch the diagram &nbsp;·&nbsp; ④ calculate the unknown side &nbsp;·&nbsp; ⑤ substitute</div>
      <p><b>Step ② is where the marks are.</b> Two things were given, so you tick TWICE on one cross, in two different colours:</p>
      <ul>
        <li>one colour for the quadrants the <b>ratio's sign</b> allows (All Strippers Take Cash)</li>
        <li>a second colour for the quadrants the <b>interval</b> allows</li>
      </ul>
      <p>The quadrant with <b>two ticks</b> is the one you sketch in. That overlap is the whole idea.</p>
      <p>Then Pythagoras for the missing side — and two habits that make it read as yours:</p>
      <div class="formula">y² = 13² − (−12)² &nbsp;&nbsp;(pyth)<br>y = ±5 &nbsp;→&nbsp; ∴ y = 5</div>
      <p>The given negative stays <b>inside</b> the square, and the ± line is followed by a ∴ line that picks the sign off the quadrant. <b>r is always positive bc it is the radius</b> — it never takes the minus.</p>
      <div class="eg">3 tan θ − 4 = 0 with θ ∈ (180°; 360°). tan is + in ① and ③; the interval gives ③ and ④ → ③. Sketch x = −3, y = −4, r = 5. Then 25 sin²θ − 5 cos θ = 25(−4/5)² − 5(−3/5) = 16 + 3 = 19.</div>`,
  },
  gtrigIdentities: {
    fractions: true,
    title: "Identities: what to do next",
    body: `
      <p><b>When in doubt, go LEFT.</b> You work the left-hand side, top to bottom, until it turns into the right-hand side — and you close with <b>= RHS</b>. Never squeeze both sides towards the middle.</p>
      <p>There are only four moves, and every question is one of them:</p>
      <ul>
        <li><b>fractions</b> → find the LCD (every different bottom, multiplied together)</li>
        <li><b>a bracket squared / two brackets</b> → multiply out (products)</li>
        <li><b>a common factor</b> → take it out</li>
        <li><b>a division by a fraction</b> → flip it and multiply</li>
      </ul>
      <p>And two things you keep in your pocket:</p>
      <div class="formula">tan θ = sin θ/cos θ &nbsp;&nbsp;·&nbsp;&nbsp; sin²θ + cos²θ = 1</div>
      <p>The <b>masked identities</b> are that second one rearranged: sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ. A 1 with nothing under it gets a denominator of 1 before it can join a fraction.</p>
      <div class="eg">1/cos²θ − 1 = 1/cos²θ − 1/1 = (1 − cos²θ)/cos²θ = sin²θ/cos²θ = tan²θ.</div>`,
  },
  gtrigSuperSpecial: {
    fractions: true,
    title: "Super special sums: the flamingo & the short-cut",
    body: `
      <p>You are told something like <b>cos 20° = t</b> and asked for everything else in terms of t. A bare value cannot be read off a triangle — so stand it on a 1. That is the <b>flamingo</b>:</p>
      <div class="formula">cos 20° = t = t/1 = a/h</div>
      <p>Now t is the adjacent side, 1 is the hypotenuse, and the triangle draws itself in the first quadrant. Pythagoras finds the third side, and then you just read the answers off the picture.</p>
      <p>The <b>Short-cut</b> — three ready-made triangles:</p>
      <table class="q-table"><tr><th>given</th><th>adjacent</th><th>opposite</th><th>hypotenuse</th></tr>
        <tr><td>tan θ = t</td><td>1</td><td>t</td><td>√(t² + 1)</td></tr>
        <tr><td>sin θ = t</td><td>√(1 − t²)</td><td>t</td><td>1</td></tr>
        <tr><td>cos θ = 1/t</td><td>1</td><td>√(t² − 1)</td><td>t</td></tr></table>
      <p><b>√(1 − t²) or √(t² − 1)?</b> Pythagoras decides: the HYPOTENUSE squared is the one that gets the plus, so the missing leg is (hypotenuse)² − (other leg)². If the 1 is the hypotenuse you get √(1 − t²); if the letter is the hypotenuse you get √(t² − 1).</p>
      <p>If the question asks about a different angle, <b>reduce it to the acute one first</b>, then read it off.</p>
      <div class="eg">cos 20° = t. Then sin 20° = √(1 − t²), tan 20° = √(1 − t²)/t, and cos 160° = −cos 20° = −t.</div>`,
  },
  gtrigSixTypes: {
    fractions: true,
    title: "General solution: the six types",
    body: `
      <p>Before you solve anything, name the type. There are six, and they are always in this order:</p>
      <ul>
        <li><b>① function alone</b> — one ratio, one number. Isolate it, then ref ∠ and quadrants. <span class="muted">(don't type − into the calculator)</span></li>
        <li><b>② same angles</b> — sin and cos with the SAME angle. Divide every term by cos and it becomes one tan. <span class="muted">also: divide by cos (tan θ)</span></li>
        <li><b>③ common factor</b> — take the factor out, then each bracket separately = 0. <span class="muted">take 0 as +</span></li>
        <li><b>④ grouping</b> — four terms. Group them in pairs; the brackets left over must come out the same.</li>
        <li><b>⑤ trinomial</b> — three terms, one function squared and one not. K-method; if the middle term is a different function, a masked identity first. <span class="muted">also: trinomial with a masked identity</span></li>
        <li><b>⑥ co-functions</b> — sin and cos with DIFFERENT angles. Make both sides the same function, then match the brackets. <span class="muted">no ref. ∠ · also: make both cos</span></li>
      </ul>
      <p>If a factor asks a sine or cosine for something outside [−1 ; 1], write <b>∴ no solution</b> — not "undefined", not "no real solution".</p>
      <div class="eg">2 sin²x + 5 sin x − 3 = 0 is ⑤. Let K = sin x → 2K² + 5K − 3 = 0 → (2K − 1)(K + 3) = 0 → sin x = 1/2, or sin x = −3 which has no solution.</div>`,
  },
  gtrigLastSteps: {
    fractions: true,
    title: "General solution: the last two decisions",
    body: `
      <p>Once the ratio is on its own, everything comes down to two things: <b>which quadrants</b>, and <b>what the reference angle is</b>.</p>
      <p><b>The cross.</b> A vertical line and a horizontal line, with a ✓ in each quadrant you are using — top-right is I, top-left is II, bottom-left is III, bottom-right is IV. The sign of the value picks the pair (All Strippers Take Cash).</p>
      <p><b>The reference angle comes from the POSITIVE value.</b> Don't type − into the calculator. The minus already did its job when it chose the quadrants; only the size of the number is left.</p>
      <div class="formula">cos θ = −2/5 &nbsp;→&nbsp; ✓ in II and III &nbsp;·&nbsp; ref. ∠ = 66,42°</div>
      <p><b>tan gets ONE line.</b> tan repeats every 180°, so the second quadrant line adds nothing — a waste of time.</p>
      <p><b>Boundary values follow the same sign rule</b> — All Strippers Take Cash: cos θ = 1 → cos is positive → tick I and IV, ref ∠ = 0 · sin θ = −1 → sin is negative → tick III and IV, ref ∠ = 90° · cos θ = −1 → tick II and III, ref ∠ = 0 · sin θ = 0 → ref ∠ = 0, tick I and II.</p>
      <p><b>Co-functions have NO reference angle at all.</b> Two different angles means there is nothing to take an inverse of — you make both sides the same function and match the brackets instead.</p>
      <div class="eg">sin x = 1/2 → ✓ in I and II, ref ∠ = 30°. But sin(x + 80°) = sin 2x → no reference angle.</div>`,
  },
  gtrigUndefined: {
    fractions: true,
    title: "Undefined values",
    body: `
      <p><b>Undefined ↳ denominator = 0.</b> A fraction breaks when its bottom is nothing at all, so the question is only ever "what is on the bottom?"</p>
      <p>The routine:</p>
      <ol>
        <li>list <b>every</b> denominator — on both sides of the equation</li>
        <li>set each one <b>= 0</b></li>
        <li>solve each one as an ordinary <b>general solution</b></li>
        <li>read the interval off the list</li>
      </ol>
      <p>Two things people get wrong. <b>Numerators do not count</b> — a top of zero is a perfectly ordinary answer. And <b>tan does not get its own line</b>: tan x is sin x over cos x, so its cos x is already on your list.</p>
      <div class="eg">tan x + cos x/(1 + sin x) = 1/cos x → the denominators are 1 + sin x and cos x. So 1 + sin x = 0 (sin x = −1, ref ∠ = 90°, III and IV) or cos x = 0 (ref ∠ = 90°, I and IV). On (−180°; 180°) that gives x ∈ {−90°; 90°}.</div>`,
  },
};
