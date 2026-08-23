/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill "special-sums"
   (SESSION F1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F1-gtrig-part1.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   SOURCE OF THE MATHS: METHODS-trig.md Part H (p26–p31) — Pythagoras
   with the given negative coordinate kept INSIDE the square and the
   radius "always positive bc it is the radius" (H1), the BOW TIE (H2),
   and above all her FIVE NUMBERED STEPS (H3):

     ① isolate the function  ② determine the quadrant  ③ sketch the
     diagram  ④ calculate the unknown side  ⑤ substitute

   Step ② is the teaching point, and it is done with a CROSS TICKED
   TWICE — one tick for the quadrants the ratio's sign allows, one for
   the quadrants the interval (or the second condition) allows. The
   quadrant with two ticks wins. Every memo below numbers those steps,
   because her five steps ARE the textbook method written in her order
   (sessions/F1-gtrig-part1.md).

   ARCHETYPES from the paper bank: survey/SURVEY-Topic-Banks.md §2's
   "ratio-in-terms-of" / sketch items (2025-Q5.1 "21sinθ + 7√2 = 0,
   θ ∈ (90°;270°)", 2026-Q1.2, 2026-Q9.1, 2025-Q8.1's point-on-the-arm)
   and SURVEY-Nov-P2.md archetype 3 beat (ii) — "given [ratio] = k and
   quadrant info, find [other ratio] using a sketch, no calculator" —
   which is the SECOND beat of the trig block every single year. Her own
   Test 3 Q2 (P(−5 ; 12), find sinθ · tan(180° − θ)) is the same mould.
   Every number here is fresh.

   ⚠️ THE SKETCH IS THE LEARNER'S JOB — THE QUESTION SIDE NEVER SHOWS
   THE TRIANGLE. Picking the quadrant IS the skill being drilled, and a
   figure that already sits in the right quadrant hands it over. The
   player draws a part's figure whenever that part has a
   `diagram.parts[<id>]` entry, in BOTH states, so the rule here is
   structural rather than a matter of remembering:

     (a) "Draw a sketch and determine the length of the third side"
         — NO diagram entry at all, so nothing is drawn on either state.
         The memo describes the quadrant and the (pyth) step in words.
     (b) (and (c) where there is one) "Hence, without a calculator,
         determine …" — carries an entry of the form
             { spec: { type:"quadtri", x, y, labels, theta:true } }
         with NO highlight sets, so the fully labelled triangle sits
         beside the part on BOTH states. By then the side is known, and
         the figure is doing the job a marker's own sketch does.

   That is why there is no `diagram.spec` default on any question in
   this file: a default would be inherited by nothing (part (a) has no
   entry), but leaving it out makes the "(a) draws nothing" rule
   impossible to break by accident.

   THE ENGINE: js/engine/quadrant-triangle.js through
   js/exam/quadtri-diagram.js. `x` and `y` are the REAL SIGNED legs, so
   verifyQuadTri can prove the far vertex is drawn in the quadrant the
   maths says, that both legs share one scale, and that every numeric
   label equals the length actually drawn. All four quadrants are always
   in frame, which is what lets a learner check their own sketch against
   it.

   LEVELS: q1–q3 level 1–2, q4 and q5 reach level 3 on their last part
   (a reduction folded into the substitution, and the masked identity
   read backwards). Nothing here is level 4 — the ★ questions live on
   the gtrig level-4 tile (session F2).
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
/* gt8 "Special sums" — pick the quadrant, the app draws the triangle,
   evaluate. Exactly this skill (js/config.js CHAPTERS → gtrig). */
const LOST = { chapter: CH, quest: "gt8" };

/* ---------------------------------------------------------------
   q1 — sin θ = −3/5 with cos θ > 0  →  FOURTH quadrant, (4 ; −3), r = 5.
   Deliberately the same equation as the tile's existing card
   (trig.rr.t2q1(b), which pairs it with tan θ > 0 and lands in III):
   same ratio, different second condition, different quadrant,
   different answer. That contrast is the whole argument for step ②.
     (a) x = 4          (b) tan θ · cos θ = −3/5  ( = sin θ )
   --------------------------------------------------------------- */
const Q1_TRI = { type: "quadtri", x: 4, y: -3, labels: { x: "4", y: "−3", r: "5" }, theta: true, w: 300, h: 300 };

const q1 = {
  id: "gtrig.sib.ss.q1",
  chapter: CH,
  topic: "special-sums",
  archetype: "special-sums-ratio-plus-sign-condition-evaluate-a-product",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  diagram: { parts: { b: { spec: Q1_TRI } } },
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;5 sin θ + 3 = 0&nbsp; and&nbsp; cos θ &gt; 0.<br><br>Draw a sketch and determine the length of the third side of your triangle.",
      },
      hint: {
        en: "Step ① never changes: get the ratio on its own. Then draw your cross and tick it twice — once for the quadrants where sin is negative, once for the quadrants where cos is positive. The quadrant that collects two ticks is the one you sketch in, and (pyth) finds the side that is missing.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Isolate the function:</b> &nbsp;5 sin θ = −3 &nbsp;⟹&nbsp; sin θ = −3/5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "② <b>Determine the quadrant.</b> Tick the cross twice: sin θ is negative in <b>III and IV</b>; cos θ is positive in <b>I and IV</b>. The quadrant with two ticks wins — <b>IV</b>." }, ticks: ["ca"] },
        { type: "step", text: { en: "③ <b>Sketch it</b> in the fourth quadrant, with &nbsp;y = −3&nbsp; and&nbsp; r = 5." } },
        { type: "step", text: { en: "④ <b>Calculate the unknown side:</b> &nbsp;x² = 5² − (−3)² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √16 &nbsp;⟹&nbsp; x = ±4" } },
        { type: "answer", text: { en: "In the fourth quadrant x is positive &nbsp;∴&nbsp; x = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: r never takes a minus — it is the radius, and a radius is a length. Only x and y carry the quadrant's signs.",
        } },
      ],
      esplain: {
        en: "Special sums run on five numbered steps, and step ② is where the whole teaching sits. Step ① is quick: 5 sin θ = −3, so sin θ = −3 over 5. Now draw the little cross and tick it twice, in two colours if that helps you see it. Sine is negative in III and IV. Cosine is positive in I and IV. The quadrant that collected two ticks wins, and that is IV. All Strippers Take Cash says the same thing round the bow tie, but the double tick is the reason the step exists — sin θ = −3 over 5 on its own fits two quadrants, and those two would hand you opposite answers. After that the sketch does the work: y = −3, r = 5, and (pyth) gives 4 for the side that is left. The quadrant tells you to write it as +4, because in IV the x is positive.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;tan θ · cos θ",
      },
      hint: {
        en: "Everything you need is on the sketch now. tan is y over x and cos is x over r — read the two straight off, signs and all, and multiply.",
      },
      memo: [
        { type: "step", text: { en: "⑤ <b>Substitute.</b> Read the ratios off the sketch: &nbsp;tan θ = y/x = −3/4" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos θ = x/r = 4/5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "tan θ · cos θ = (−3/4)(4/5) = −12/20 = −3/5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the answer came out as exactly sin θ, the thing you were given — and that is not luck. tan is sin over cos, so tan θ · cos θ is always sin θ. Treat it as a free check on your arithmetic.",
        } },
      ],
      esplain: {
        en: "Once the triangle is drawn, every ratio is two of its three numbers divided, and the calculator stays in your bag. tan θ is y over x, so −3 over 4. cos θ is x over r, so 4 over 5. Multiply them and the 4s cancel, leaving −3 over 5. Look at what that is: −3 over 5 is sin θ, the very thing you were given at the start. That is not luck. tan is sin over cos, so tan θ times cos θ is always sin θ, whatever the numbers are. Answers that fold back onto something you already know are a free check — if your product had come out as anything other than −3 over 5, you would know a sign had gone astray somewhere.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — tan θ = −5/12 with θ ∈ (90° ; 270°)  →  SECOND quadrant,
   (−12 ; 5), r = 13. A tan given as a fraction hides an extra
   decision — the minus could belong to y or to x — and the quadrant
   is what settles it.
     (a) r = 13         (b) sin θ + cos θ = −7/13
   The 5 and the 12 sit this way round (rather than −5 ; 12) because a
   TALL narrow triangle in quadrant II pushes the hypotenuse label
   straight onto the y-axis — seen on the rendered crop, invisible to
   verifyQuadTri. A wide one puts it clear. Same 5-12-13 triangle,
   readable picture.
   --------------------------------------------------------------- */
const Q2_TRI = { type: "quadtri", x: -12, y: 5, labels: { x: "−12", y: "5", r: "13" }, theta: true, w: 300, h: 300 };

const q2 = {
  id: "gtrig.sib.ss.q2",
  chapter: CH,
  topic: "special-sums",
  archetype: "special-sums-tan-given-with-an-interval-find-the-hypotenuse",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  diagram: { parts: { b: { spec: Q2_TRI } } },
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;tan θ = −5/12&nbsp; and&nbsp; θ ∈ (90° ; 270°).<br><br>Draw a sketch and determine the length of the hypotenuse of your triangle.",
      },
      hint: {
        en: "tan θ = y over x, so the minus could sit on either the top or the bottom. Let the quadrant decide which. Tick the cross twice — once for where tan is negative, once for the interval you were given.",
      },
      memo: [
        { type: "step", text: { en: "① The function is already on its own: &nbsp;tan θ = −5/12" } },
        { type: "step", text: { en: "② <b>Determine the quadrant.</b> Tick the cross twice: tan θ is negative in <b>II and IV</b>; θ ∈ (90° ; 270°) allows <b>II and III</b>. The double tick lands on <b>II</b>." }, ticks: ["s/f"] },
        { type: "step", text: { en: "③ <b>Sketch it</b> in the second quadrant. tan θ = y/x, and in II the x is negative while the y is positive &nbsp;∴&nbsp; x = −12&nbsp; and&nbsp; y = 5." }, ticks: ["ca"] },
        { type: "step", text: { en: "④ &nbsp;r² = (−12)² + 5² &nbsp;(pyth) &nbsp;⟹&nbsp; √r² = √169" } },
        { type: "answer", text: { en: "r = 13 &nbsp;— always positive, because it is the radius" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: tan θ = −5/12 does NOT automatically mean y = −5 and x = 12. The quadrant decides which of the two carries the minus — in II it is the x. Put it on the wrong one and every answer after it flips sign.",
        } },
      ],
      esplain: {
        en: "This one is given as a tan, and a tan hides an extra decision: tan θ is y over x, so the minus could belong to either the top or the bottom. That is exactly what the quadrant step settles. Tan is negative in II and IV. The interval from 90° to 270° allows II and III. Two ticks land on II, and in the second quadrant x is negative while y is positive — so y = 5 and x = −12, not the other way round. Then Pythagoras finds the hypotenuse: r² = (−12)² + 5², which is 169, so r = 13. Notice that r never takes a minus, because r is the radius and a radius is a length. Write the negative coordinate inside the square, the way she does, and you will not lose track of which one it was.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;sin θ + cos θ",
      },
      hint: {
        en: "Both ratios have the same r underneath, so once you have written them down the adding is easy. Read the signs off the sketch, not off the original equation.",
      },
      memo: [
        { type: "step", text: { en: "⑤ <b>Substitute.</b> Read both ratios off the sketch: &nbsp;sin θ = y/r = 5/13" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos θ = x/r = −12/13" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin θ + cos θ = 5/13 − 12/13 = −7/13" }, ticks: ["a"] },
      ],
      esplain: {
        en: "With the triangle drawn there is nothing left to decide — sin θ is y over r and cos θ is x over r, so the answers are 5 over 13 and −12 over 13. Adding them gives −7 over 13. Two habits keep this part clean. The first is reading each ratio off the picture rather than off the original equation, because the picture already has the signs built into it. The second is noticing that both ratios share the same r, so they share the same denominator all the way through — if your two fractions have different bottoms, something has gone wrong. And a quick sense check: in the second quadrant sine is positive and cosine is negative, and here the cosine is the bigger of the two in size, so a small NEGATIVE answer is exactly what you should expect.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A POINT ON THE TERMINAL ARM: P(−2 ; −3), THIRD quadrant,
   r = √13. The point does step ② for the learner, which is what makes
   this the gentlest card on the tile; the work moves into the surd and
   into her rationalising habit (Part 0.10 / p31).
     (a) OP = √13
     (b) sin θ = −3√13/13, cos θ = −2√13/13, tan θ = 3/2
   --------------------------------------------------------------- */
const Q3_TRI = { type: "quadtri", x: -2, y: -3, labels: { x: "−2", y: "−3", r: "√13" }, theta: true, w: 300, h: 300 };

const q3 = {
  id: "gtrig.sib.ss.q3",
  chapter: CH,
  topic: "special-sums",
  archetype: "special-sums-point-on-the-terminal-arm-three-ratios",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  diagram: { parts: { b: { spec: Q3_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>P(−2 ; −3) is a point on the terminal arm of θ.<br><br>Draw a sketch and determine the length of OP, leaving your answer in surd form.",
      },
      hint: {
        en: "A point does step ② for you — the two signs already say which quadrant you are in. From there it is (pyth) on the little triangle you drop down to the x-axis.",
      },
      memo: [
        { type: "step", text: { en: "The point tells you the quadrant straight away: both coordinates are negative, so P lies in the <b>third quadrant</b>, with &nbsp;x = −2&nbsp; and&nbsp; y = −3." } },
        { type: "step", text: { en: "OP² = (−2)² + (−3)² &nbsp;(pyth) &nbsp;⟹&nbsp; OP² = 4 + 9 = 13" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "OP = √13 &nbsp;— always positive, because it is the radius" }, ticks: ["a"] },
      ],
      esplain: {
        en: "When the question hands you a point instead of a ratio, step ② is already done for you — there is no sign reasoning to do at all, because the coordinates say where the point is. Both of P's coordinates are negative, so P is in the third quadrant, bottom left. From there it is plain Pythagoras on the little triangle you drop down to the x-axis: OP² = (−2)² + (−3)², which is 4 + 9 = 13, so OP is √13. Leave it as a surd; turning it into a decimal here would spoil every ratio that comes next. And OP is always positive, because it is the radius — the minus signs live on x and y only, never on the distance from the origin.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence, without using a calculator, determine the values of &nbsp;sin θ, &nbsp;cos θ&nbsp; and&nbsp; tan θ. Rationalise any surd in a denominator.",
      },
      hint: {
        en: "Three ratios, three pairs of numbers from the same sketch. Leave the surd in place while you write them down, then rationalise anything with a √ underneath the line.",
      },
      memo: [
        { type: "step", text: { en: "sin θ = y/r = −3/√13 = −3√13/13" }, ticks: ["ca"] },
        { type: "step", text: { en: "cos θ = x/r = −2/√13 = −2√13/13" }, ticks: ["ca"] },
        { type: "answer", text: { en: "tan θ = y/x = (−3)/(−2) = 3/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: two negatives divided give a positive, so tan θ comes out POSITIVE in the third quadrant — which is exactly what All Strippers Take Cash promises (T is the tan quadrant). If yours came out negative, check the signs on your sketch.",
        } },
      ],
      esplain: {
        en: "Three ratios, three pairs of numbers off the same sketch. sin θ is y over r, which is −3 over √13. cos θ is x over r, which is −2 over √13. tan θ is y over x, and two negatives divided give a positive, so it is 3 over 2. Then comes her one rule about surds: a special-sums answer gets rationalised, even though a special-angle value like 1 over √3 is left alone. Multiply top and bottom by √13 and −3 over √13 becomes −3√13 over 13. Last, use the wheel as a check. This is the third quadrant, T on All Strippers Take Cash, so tan should come out positive and the other two negative — and they do.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — 25 cos θ = −24 with θ ∈ (180° ; 360°)  →  THIRD quadrant,
   (−24 ; −7), r = 25. Three parts, so the last one can fold a
   REDUCTION into the substitution — her p31 b) shape.
     (a) y = −7
     (b) 24 tan θ − 25 sin θ = 7 + 7 = 14
     (c) 25 cos(180° + θ) + 25 sin(180° − θ) = 24 − 7 = 17
   The 7 and the 24 sit this way round (rather than −7 ; −24) for the
   same reason as q2: a tall narrow triangle puts the hypotenuse label
   on the y-axis. Same 7-24-25 triangle, readable picture.
   --------------------------------------------------------------- */
const Q4_TRI = { type: "quadtri", x: -24, y: -7, labels: { x: "−24", y: "−7", r: "25" }, theta: true, w: 300, h: 300 };

const q4 = {
  id: "gtrig.sib.ss.q4",
  chapter: CH,
  topic: "special-sums",
  archetype: "special-sums-ratio-with-an-interval-then-a-reduction-expression",
  paper: PAPER,
  lostQuest: LOST,
  marks: 9,
  diagram: { parts: { b: { spec: Q4_TRI }, c: { spec: Q4_TRI } } },
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;25 cos θ = −24&nbsp; and&nbsp; θ ∈ (180° ; 360°).<br><br>Draw a sketch and determine the length of the third side of your triangle.",
      },
      hint: {
        en: "Divide by 25 first, then tick the cross twice — once for where cos is negative, once for the interval. Keep the given negative coordinate inside the square when you do (pyth).",
      },
      memo: [
        { type: "step", text: { en: "① <b>Isolate the function:</b> &nbsp;cos θ = −24/25" }, ticks: ["s/f"] },
        { type: "step", text: { en: "② <b>Determine the quadrant.</b> Tick the cross twice: cos θ is negative in <b>II and III</b>; θ ∈ (180° ; 360°) allows <b>III and IV</b>. The double tick lands on <b>III</b>." }, ticks: ["ca"] },
        { type: "step", text: { en: "③ <b>Sketch it</b> in the third quadrant, with &nbsp;x = −24&nbsp; and&nbsp; r = 25." } },
        { type: "step", text: { en: "④ &nbsp;y² = 25² − (−24)² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √49 &nbsp;⟹&nbsp; y = ±7" } },
        { type: "answer", text: { en: "In the third quadrant y is negative &nbsp;∴&nbsp; y = −7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the given negative coordinate stays INSIDE the square — write 25² − (−24)², not 625 − 576 straight off. It costs one extra line and it keeps you honest about which number was negative.",
        } },
      ],
      esplain: {
        en: "Same five steps, bigger numbers. Step ①: divide by 25 to get cos θ on its own, giving −24 over 25. Step ②: tick the cross twice. Cosine is negative in II and III. The interval from 180° to 360° allows III and IV. The double tick lands on III. Step ③: sketch it bottom left, with x = −24 and r = 25. Step ④: Pythagoras, and write the negative coordinate inside the square the way she does — y² = 25² − (−24)² gives 49, so y is ±7, and the third quadrant picks the negative one. The ± line followed by a ∴ line is not decoration: it is where you show the marker that the quadrant, not the calculator, chose the sign.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;24 tan θ − 25 sin θ",
      },
      hint: {
        en: "Read tan and sin straight off the sketch, and look at the numbers sitting in front of them — 24 and 25 are there for a reason.",
      },
      memo: [
        { type: "step", text: { en: "⑤ <b>Substitute.</b> Read the ratios off the sketch: &nbsp;tan θ = y/x = (−7)/(−24) = 7/24" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin θ = y/r = −7/25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "24 tan θ − 25 sin θ = 24(7/24) − 25(−7/25) = 7 + 7 = 14" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Everything now comes off the picture. tan θ is y over x, and −7 over −24 is a positive 7 over 24, exactly as the third quadrant promised. sin θ is y over r, which is −7 over 25. Then substitute carefully: 24 times 7 over 24 is 7, and 25 times −7 over 25 is −7, so subtracting the second from the first gives 7 + 7 = 14. The numbers in front, 24 and 25, were chosen to cancel the denominators, and that is worth noticing — when the coefficient matches the bottom of the ratio, the arithmetic is about to be tidy, so a messy answer usually means a sign slipped somewhere.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;25 cos(180° + θ) + 25 sin(180° − θ)",
      },
      hint: {
        en: "Reduce both angles before you read anything off the sketch. And be careful with the second one: leaving sin θ unchanged does not make it positive.",
      },
      memo: [
        { type: "step", text: { en: "180° + θ lands in <b>T</b>, where only tan is positive, so cosine turns negative: &nbsp;cos(180° + θ) = −cos θ = 24/25" }, ticks: ["s/f"] },
        { type: "step", text: { en: "180° − θ lands in <b>S</b>, where sine is positive, so sine keeps its own value: &nbsp;sin(180° − θ) = sin θ = −7/25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "25(24/25) + 25(−7/25) = 24 − 7 = 17" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “sin(180° − θ) = sin θ” does not mean the answer is positive. The reduction leaves sin θ exactly as it was — and on this sketch sin θ was already negative.",
        } },
      ],
      esplain: {
        en: "Two reductions, and then the same picture as before. 180° + θ lands in T, where only tan survives, so cosine picks up a minus and cos(180° + θ) is −cos θ, which is a positive 24 over 25. 180° − θ lands in S, where sine survives, so sin(180° − θ) is simply sin θ — and sin θ is already −7 over 25 on this sketch. That is the sentence worth reading twice: the reduction did not make it positive, it left it exactly as it was, and it was negative to begin with. Multiply each by 25, add them, and you get 24 − 7 = 17. Reduce first, then read the sketch, and never try to do both on one line.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A REFLEX ANGLE FROM A POINT: M(4 ; −1), FOURTH quadrant,
   r = √17 (her p31 eg.4 shape — a point, θ reflex, then a reduction
   and the masked identity in reverse).
     (a) OM = √17
     (b) cos(180° − θ) = −cos θ = −4√17/17
     (c) 1 − sin²(180° + θ) = cos²(180° + θ) = [−cos θ]² = 16/17
   --------------------------------------------------------------- */
const Q5_TRI = { type: "quadtri", x: 4, y: -1, labels: { x: "4", y: "−1", r: "√17" }, theta: true, w: 300, h: 300 };

const q5 = {
  id: "gtrig.sib.ss.q5",
  chapter: CH,
  topic: "special-sums",
  archetype: "special-sums-reflex-angle-point-with-a-masked-identity",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  diagram: { parts: { b: { spec: Q5_TRI }, c: { spec: Q5_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>M(4 ; −1) is a point on the terminal arm of θ, where θ is a <b>reflex</b> angle measured anticlockwise from the positive x-axis.<br><br>Draw a sketch and determine the length of OM, leaving your answer in surd form.",
      },
      hint: {
        en: "Reflex just means θ has turned past 180°. Plot M first, see which quadrant it lands in, then use (pyth) on the triangle you drop down to the x-axis.",
      },
      memo: [
        { type: "step", text: { en: "M(4 ; −1) has a positive x and a negative y, so it sits in the <b>fourth quadrant</b> — which is what makes θ reflex: turning anticlockwise you pass 90°, 180° and 270° before you reach OM." } },
        { type: "step", text: { en: "OM² = 4² + (−1)² &nbsp;(pyth) &nbsp;⟹&nbsp; OM² = 16 + 1 = 17" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "OM = √17 &nbsp;— always positive, because it is the radius" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A reflex angle just means θ has turned more than halfway round. M sits in the fourth quadrant, so turning anticlockwise from the positive x-axis you sweep past 90°, past 180°, past 270° and only then reach OM — which puts θ somewhere between 270° and 360°. That is all the word reflex is telling you here, and it agrees with the quadrant the coordinates already gave you. The rest is Pythagoras on the little triangle dropped down to the x-axis: OM² = 4² + (−1)², which is 17, so OM is √17. Leave it as a surd, and keep it positive — the distance from the origin has no sign.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;cos(180° − θ)",
      },
      hint: {
        en: "One reduction, then one read-off. And remember her rule about surds: a special-sums answer gets rationalised.",
      },
      memo: [
        { type: "step", text: { en: "180° − θ lands in <b>S</b>, where only sine is positive, so cosine takes the minus: &nbsp;cos(180° − θ) = −cos θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Read cos θ off the sketch: &nbsp;cos θ = x/r = 4/√17" }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos(180° − θ) = −4/√17 = −4√17/17 &nbsp;(rationalised)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: special-ANGLE values are left as 1/√3 and 1/√2, but a special-SUMS answer gets rationalised — multiply top and bottom by √17 so nothing awkward is left under the line.",
        } },
      ],
      esplain: {
        en: "Two moves. First the reduction: 180° − θ lands in S, where only sine is positive, and cosine is not sine, so it takes the minus and cos(180° − θ) = −cos θ. Second, read cos θ off the sketch: it is x over r, which is 4 over √17. Put them together and you have −4 over √17. Then rationalise, because that is what she does with a special-sums answer even though she leaves a special-angle value like 1 over √3 alone. Multiply top and bottom by √17 and you get −4√17 over 17. It looks bigger, but it is the same number with nothing awkward left underneath the line.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence, without using a calculator, determine the value of &nbsp;1 − sin²(180° + θ)",
      },
      hint: {
        en: "Look at the shape of the expression before you reduce anything. 1 minus a sine squared is a masked identity waiting to happen.",
      },
      memo: [
        { type: "step", text: { en: "Start with the <b>masked identity</b>, read backwards: &nbsp;1 − sin²A = cos²A, &nbsp;so&nbsp; 1 − sin²(180° + θ) = cos²(180° + θ)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now reduce inside <b>block brackets</b> before squaring: &nbsp;cos(180° + θ) = −cos θ, &nbsp;so&nbsp; cos²(180° + θ) = [−cos θ]² = cos²θ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos²θ = [4/√17]² = 16/17" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: squaring kills the minus. [−cos θ]² is +cos²θ, never −cos²θ. That one sign is the whole difference between 16/17 and its negative.",
        } },
      ],
      esplain: {
        en: "Do not reduce first here — look at the shape of the expression instead. 1 minus a sine squared is one of her masked identities read backwards, so 1 − sin²(180° + θ) becomes cos²(180° + θ) before any reduction happens at all. That single move saves you most of the work. Now reduce inside block brackets: 180° + θ is in T, so cosine turns negative and you have that bracket squared. Squaring kills the minus, so it is plain cos²θ. Finally read cos θ off the sketch, 4 over √17, and square it: 16 over 17. Notice the answer needed no rationalising, because squaring the √17 turned it into an ordinary 17 all by itself.",
      },
    },
  ],
};

export const gtrigSpecialSumsSiblingQuestions = [q1, q2, q3, q4, q5];
