/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "inequalities".
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   TWO new cards, taking the tile back to six.

   WHY TWO AND NOT ONE. The tile held five cards, but one of them —
   eqn.ineq.q2(d), "the solution of x² + bx + c ≤ 0 is −2 ≤ x ≤ 5, find
   b and c" — is a LEVEL 4 part, and her ruling 5 (2026-08-23) keeps ★
   parts off the normal tiles. That card moves to the chapter's Level 4
   tile (see js/exam/cards-eqn.js), so this tile starts today at four.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.ineq.q2(a)  −3x + 7 &gt; 19 — a LINEAR one, flipped by dividing
       by a negative;
     · eqn.ineq.q2(b)  2x² + 5x &lt; 3 — unfactorised, positive leading
       coefficient, answer INSIDE the bowl;
     · eqn.ineq.t1q3(a)  (x + 1)(5 − x) ≥ 0 — already factorised, with a
       −x² hiding in the second bracket, so the bracket-flip is the whole
       question; answer inside the bowl again;
     · eqn.ineq.q2(c)  (x − 1)/x² ≤ 0 — a fraction whose denominator is a
       guaranteed-positive square, so it is simply dropped.
   The two below are the two that were missing:
     q1  the plainest quadratic inequality there is — already factorised,
       no flip, nothing to rearrange — so the tile has a genuine level-1
       way in (every card on it was level 2 or 3);
     q2  a RATIONAL inequality, where the denominator CAN change sign, so
       it may never be multiplied out: her B9 route instead — everything
       to the left, one fraction, then multiply by the SQUARE of the
       denominator, which is always positive. This is the shape her own
       Test 6 Q1 opens with and the tile had nothing like it.

   METHOD: METHODS-algebra.md, hers verbatim — B8 "TIP Chips"
   (everything to the left · no negative in front of x² · factorise ·
   CP must be "=" · then read the answer off the sketch as inside or
   outside of the bowl); B9 (never cross-multiply an inequality whose
   denominator can change sign; a guaranteed-positive square is safe;
   restrictions ride after a semicolon); B10 for "undefined" meaning a
   zero denominator; her highlighted EQ p31 ruling — never hand in the
   calculator's semicolon form, rewrite it with x on the left and the
   word "or"; §0.2 the ∴ habit.

   ⚠️ NOTE FOR THE FOREMAN: the brief also asked for one card whose
   answer is written in INTERVAL NOTATION. That is not built, and
   deliberately so — METHODS-algebra.md B8 lists interval notation under
   "Never do", and Part E lists "Interval / set-builder notation as an
   answer format" among the skills her notes do NOT cover, with the
   standing instruction not to invent a method for those. Every answer
   here therefore uses her form: x on the left, "or" between two pieces,
   restrictions after a semicolon.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block (surds, exponential equations, inequalities)";
   SURVEY-Her-2025-Assessments.md Test 6 Q1 (a rational inequality in
   "≤" form opens that paper); SURVEY-Nov-P1.md Nov 2023 Q1(a)(3) and
   Nov 2022 Q3(a). Fresh numbers.

   LEVELS: 1 and 3 — which lands the whole tile on two L1, two L2 and
   two L3. NOTHING here is level 4. NO DIAGRAM: the hatched-bowl sketch
   is carried in words inside the memo, exactly as the four existing
   cards already do; no mark depends on the picture being drawn.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq7" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN: already factorised, no flip, inside the bowl.
   (x + 6)(x − 1) &lt; 0 · CP −6 and 1 → −6 &lt; x &lt; 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.ineq.q1",
  chapter: CH,
  topic: "inequalities",
  archetype: "already-factorised-quadratic-inequality-inside-the-bowl",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;(x + 6)(x − 1) &lt; 0",
      },
      hint: {
        en: "Check the TIP Chips list first: everything is already on the left, and multiplying the brackets out would give a positive x², so nothing has to be flipped. Go straight to the critical points, then sketch.",
      },
      memo: [
        { type: "step", text: { en: "Everything is already on the left, and there is no negative in front of the x², so nothing needs flipping." } },
        { type: "step", text: { en: "CP: &nbsp;x + 6 = 0 &nbsp;or&nbsp; x − 1 = 0 &nbsp;⟹&nbsp; x = −6 &nbsp;or&nbsp; x = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "It is a <b>happy</b> parabola cutting the x-axis at −6 and at 1, and &lt; 0 means below the axis — the <b>inside of the bowl</b>." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ −6 &lt; x &lt; 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x + 6)(x − 1) &lt; 0 does <b>not</b> mean x + 6 &lt; 0 <i>and</i> x − 1 &lt; 0. Two numbers whose product is negative do not both have to be negative — one of them is, and that is exactly what the sketch shows you.",
        } },
      ],
      esplain: {
        en: "The two brackets are not two little inequalities to solve separately — together they are one parabola, and the question is which stretch of it lies below the x-axis. That is why the sketch does all the work. The critical points are simply where each bracket is zero, which is where the curve crosses the axis, and crossings are the only places the sign can change. Because the x squared term would be positive if you multiplied out, the parabola is happy, and a happy parabola dips below the axis only in the dip between its two crossings. So “less than zero” is the piece between them. Write it with the smaller number on the left, exactly as the two values sit on a number line.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A RATIONAL INEQUALITY (her Test 6 Q1 shape).
   3/(x − 2) ≤ 1  ·  everything to the left  ·  (5 − x)/(x − 2) ≤ 0
   ·  ×(−1) flips  ·  (x − 5)/(x − 2) ≥ 0  ·  ×(x − 2)², always positive
   ·  (x − 5)(x − 2) ≥ 0  ·  CP 2 and 5, outside the bowl
   →  x &lt; 2 or x ≥ 5  (x = 2 is undefined, so it is left out).
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.ineq.q2",
  chapter: CH,
  topic: "inequalities",
  archetype: "rational-inequality-never-multiply-by-a-sign-changing-denominator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the value of x for which the expression &nbsp;3/(x − 2)&nbsp; is undefined.",
      },
      hint: {
        en: "A fraction breaks in one place only: where its denominator is zero. Set the denominator equal to zero and solve.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is undefined where its denominator is zero: &nbsp;x − 2 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 2 &nbsp;— this value can never be part of any answer" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Dividing by zero is the one thing arithmetic simply refuses to do, so before you touch a fraction inequality you say out loud which x-value would break it. Here the denominator is x minus two, which is zero when x is two, so two is the forbidden value. Her word for what happens there is undefined — not “no solution”, which is for a positive base that cannot reach a negative value, and not “non-real”, which is for an even root of a negative number. Getting that word right matters, and so does writing the value down before you start solving, because at the end it has to be taken out of the answer whether or not it wanted to be in it.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "Hence solve for x: &nbsp;3/(x − 2) ≤ 1",
      },
      hint: {
        en: "Do NOT multiply both sides by x − 2 — you have no idea whether it is positive or negative, so you would not know whether to flip the sign. Take everything to the left and make it one single fraction instead.",
      },
      memo: [
        { type: "step", text: { en: "Never multiply an inequality by x − 2: it can be positive or negative, so you would not know whether to turn the sign around. Take everything to the LEFT instead and make it one fraction." } },
        { type: "step", text: { en: "3/(x − 2) − 1 ≤ 0 &nbsp;⟹&nbsp; (3 − x + 2)/(x − 2) ≤ 0 &nbsp;⟹&nbsp; (5 − x)/(x − 2) ≤ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "There is a hidden −x² in that numerator, so multiply the whole inequality by −1 and <b>turn the sign around</b>: &nbsp;(x − 5)/(x − 2) ≥ 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 2)² is a square, so it is positive for every x ≠ 2 and can never flip the sign — multiply both sides by it: &nbsp;(x − 5)(x − 2) ≥ 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "CP: &nbsp;x = 5 &nbsp;or&nbsp; x = 2. &nbsp;A <b>happy</b> parabola cutting the x-axis at 2 and at 5, and ≥ 0 means on or above the axis — the <b>outside of the bowl</b>." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x &lt; 2 &nbsp;&nbsp;or&nbsp;&nbsp; x ≥ 5 &nbsp;&nbsp;— x = 2 is left out, because from (a) the fraction is undefined there" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the one point that is NOT in the answer. The critical point x = 2 came from a DENOMINATOR, so it can never be included, no matter how friendly the ≤ sign looks — that piece is x &lt; 2, with a strict sign. The other critical point, x = 5, came from a numerator, so there the ≥ really does include it: at x = 5 the left-hand side is 3/3 = 1, and 1 ≤ 1 is true.",
        } },
      ],
      esplain: {
        en: "The rule that makes this question safe is a rule about not doing something. You may not multiply both sides by x minus two, because you do not know its sign, and multiplying an inequality by a negative turns the sign around while multiplying by a positive does not. So instead you take everything to the left and squash it into one fraction, which changes the question into “where is this fraction negative or zero”. From there two safe moves finish it. Multiplying by minus one straightens out the hidden minus x squared and flips the sign once, deliberately. Multiplying by the denominator squared is always safe, because a square is never negative, and it turns the fraction into an ordinary product you can sketch. The last step is remembering that the forbidden value from part (a) stays forbidden.",
      },
    },
  ],
};

export const eqnInequalitiesSiblingQuestions = [q1, q2];
