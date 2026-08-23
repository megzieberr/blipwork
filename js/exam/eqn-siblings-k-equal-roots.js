/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "k-equal-roots" (Find k for equal roots).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHY FOUR AND NOT THREE. The tile held three cards, but one of them —
   eqn.fr.q1(d), the fraction equation that turns into an equal-roots
   question in k — is a LEVEL 4 part, and her ruling 5 (2026-08-23)
   keeps ★ parts off the normal tiles. That card moves to the chapter's
   Level 4 tile (see js/exam/cards-eqn.js), so this tile starts today at
   two and needs four.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.nor.q2(d)  x(x − 4) = k — k stands where the CONSTANT was,
       Δ = 16 + 4k, one value of k and its equal root;
     · eqn.nor.q3(a)  2x² − 4x + k = 0 — k is the plain constant again,
       Δ = 16 − 8k.
   Both are "k is the c, set Δ = 0, solve a LINEAR equation in k". The
   four below are the four moves that were missing:
     q1  the same easy shape but ending on the EQUAL ROOT itself, so
         the tile has a genuine level-1 way in;
     q2  k in TWO coefficients at once, so Δ = 0 is a QUADRATIC in k and
         there are TWO answers, each with its own equal root;
     q3  the equal-roots question in disguise — "for which k does the
         LINE touch the PARABOLA", where nothing in the wording says
         equal roots at all;
     q4  k inside b, so Δ = 0 gives k² = 144 and the answer carries a ±.

   METHOD: METHODS-algebra.md, hers verbatim — B12(a) (build Δ in terms
   of k, then set it to zero; equal roots is Δ = 0 EXACTLY, one value or
   a few, never a range); B11's table; B1 for factorising the quadratic
   in k; F2's ruling that ± appears when you SOLVE, never when you
   simplify; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's nature-of-roots ladder;
   SURVEY-Nov-P1.md Nov 2023 Q1(b) "find k so the roots are equal, where
   the ± carries its own mark" and Nov 2022 Q1(d); SURVEY-Her-2025-
   Assessments.md Test 1 Q4 and Test 6 Q5's tangency-condition question.
   Fresh equations and fresh numbers throughout.

   LEVELS: 1, 3, 3, 2. NOTHING here is level 4. NO DIAGRAM — q3 talks
   about a line and a parabola, but it is solved entirely by algebra and
   the mark scheme never depends on a picture; the sketch is described
   in words in the memo instead.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq8" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN.  x² + 8x + k = 0 has equal roots when Δ = 0:
   64 − 4k = 0 → k = 16, and the equal root is x = −b/(2a) = −4.
   (Check: x² + 8x + 16 = (x + 4)².)
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.ker.q1",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "delta-zero-for-k-in-the-constant-then-the-equal-root",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Given: &nbsp;x² + 8x + k = 0, &nbsp;where k is a real number.<br><br>Determine the value of k for which this equation has equal roots.",
      },
      hint: {
        en: "Equal roots always mean one thing about the discriminant. Write Δ down with k standing in the c slot, then set that expression equal to exactly zero and solve for k.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 8 ; &nbsp;c = k &nbsp;&nbsp;∴&nbsp; Δ = b² − 4ac = 8² − 4(1)(k) = 64 − 4k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;64 − 4k = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 16" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Swapping a number for a letter does not change the method at all — Δ is still b squared minus four a c, it just comes out as a small expression instead of a single number. The one thing you have to hold on to is what “equal roots” means. It means the two roots have landed on top of each other, which happens only when the plus-or-minus in the formula has nothing to add or subtract, which happens only when Δ is exactly zero. Not nearly zero, not less than zero — exactly. So you set the expression equal to zero and solve an ordinary little equation for k. Sixty-four take away four k is zero, so four k is sixty-four, so k is sixteen.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down the equal root of the equation.",
      },
      hint: {
        en: "With Δ = 0 the ± part of the quadratic formula disappears, because there is nothing left to add or take away. What is left of the formula?",
      },
      memo: [
        { type: "step", text: { en: "With Δ = 0 the ± disappears, so the one root left standing is &nbsp;x = −b/(2a)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −8/2 = −4 &nbsp;&nbsp;∴ the equal root is x = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: k = 16 is NOT the root — it is the number that makes the equation have equal roots. The root is the x-value. Check it if you like: with k = 16 the equation is x² + 8x + 16 = 0, which factorises to (x + 4)², so x = −4, twice.",
        } },
      ],
      esplain: {
        en: "The quadratic formula has two halves: minus b over two a, and then plus or minus the root of Δ over two a. When Δ is zero the second half vanishes completely, so only the first half survives — and that is why an equal root is always just minus b over two a. It is also the x-value of the turning point, which makes sense: equal roots mean the parabola is resting on the x-axis at exactly one point, and the only point where a parabola touches without crossing is its turning point. Two things to keep apart in your answer: k is the value that makes it happen, and x is where it happens. The question here asks for x.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — k IN TWO COEFFICIENTS: Δ = 0 becomes a QUADRATIC in k.
   x² + 2kx + (3k + 4) = 0 · Δ = 4k² − 12k − 16 = 4(k − 4)(k + 1)
   → k = 4 or k = −1, with equal roots x = −k = −4 and x = 1.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.ker.q2",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "k-in-two-coefficients-quadratic-in-k-two-answers",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + 2kx + (3k + 4) = 0, &nbsp;where k is a real number.<br><br>Show that &nbsp;Δ = 4k² − 12k − 16.",
      },
      hint: {
        en: "Write a, b and c down before you touch the formula, and take the WHOLE of 3k + 4 as c, bracket and all. Then square the b carefully — the 2 gets squared too.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 2k ; &nbsp;c = 3k + 4" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (2k)² − 4(1)(3k + 4)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(2k)² = 4k², &nbsp;and &nbsp;−4(3k + 4) = −12k − 16" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ = 4k² − 12k − 16" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2k)² is 4k², not 2k². The bracket means the 2 is squared as well as the k. And the −4 has to reach BOTH terms of 3k + 4, so it is −12k − 16, not −12k + 4.",
        } },
      ],
      esplain: {
        en: "Nothing new is happening here — it is the same substitution you have done all year, except b and c are little expressions instead of plain numbers. Two habits keep it safe. First, write a, b and c on their own line before going near the formula, so you can see that c is the whole bracket rather than just the 3k. Second, keep the brackets on while you square and while you multiply, because that is where the marks quietly leak away. Squaring 2k means squaring both the 2 and the k, and multiplying minus four into a two-term bracket means both terms change. What you end up with is a quadratic expression in k, and the shape of that expression is the whole point of the next part.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the equation has equal roots.",
      },
      hint: {
        en: "Equal roots still means Δ = 0 — but this time setting it to zero gives you a quadratic in k, not a linear one. Look for a common factor first, then factorise what is left.",
      },
      memo: [
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;4k² − 12k − 16 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide right through by 4: &nbsp;k² − 3k − 4 = 0 &nbsp;⟹&nbsp; (k − 4)(k + 1) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 4 &nbsp;&nbsp;or&nbsp;&nbsp; k = −1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “equal roots” is still Δ = 0 EXACTLY — but Δ = 0 is only a single-answer question when Δ is linear in k. Here Δ is quadratic in k, so there are TWO values of k that do the job, and both of them are part of the answer.",
        } },
      ],
      esplain: {
        en: "This is the card where the equal-roots rule stops being a recipe and starts being a real question. The rule itself has not moved: equal roots still means the discriminant is exactly zero. What has changed is what that sentence gives you. Because k appeared in two places in the original equation, Δ came out with a k squared in it — so setting it to zero is solving an ordinary quadratic, and an ordinary quadratic has two solutions. Take the common factor of four out first; it makes the trinomial small and friendly. Then two numbers that multiply to minus four and add to minus three are minus four and plus one. Both answers count, and each one produces a completely different equation with its own equal root.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "For each of your values of k, write down the equal root of the equation.",
      },
      hint: {
        en: "Use x = −b/(2a) again, but leave k in it first — that gives you one short expression you can use twice.",
      },
      memo: [
        { type: "step", text: { en: "The equal root is &nbsp;x = −b/(2a) = −2k/2 = −k" }, ticks: ["ca"] },
        { type: "answer", text: { en: "k = 4 &nbsp;gives&nbsp; x = −4 &nbsp;&nbsp;(x² + 8x + 16 = 0)&nbsp;&nbsp;·&nbsp;&nbsp; k = −1 &nbsp;gives&nbsp; x = 1 &nbsp;&nbsp;(x² − 2x + 1 = 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Because b is 2k, minus b over two a tidies up beautifully: minus two k over two is just minus k. So the equal root is always the opposite of whatever k turns out to be, and one line of work covers both answers instead of two separate calculations. It is worth writing the two finished equations out beside the roots, as the answer line does. With k equal to four the equation becomes x squared plus eight x plus sixteen, which is x plus four all squared. With k equal to minus one it becomes x squared minus two x plus one, which is x minus one all squared. Both are perfect squares, and a perfect square is exactly what equal roots look like when you factorise them.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EQUAL ROOTS IN DISGUISE: the line that TOUCHES the parabola.
   y = kx + 1 and y = x² + 3x + 5 meet where x² + (3 − k)x + 4 = 0.
   Tangent ⟹ one point ⟹ Δ = 0: (3 − k)² = 16 → k = −1 or k = 7.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.ker.q3",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "line-tangent-to-parabola-hidden-equal-roots-condition",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The line &nbsp;y = kx + 1&nbsp; and the parabola &nbsp;y = x² + 3x + 5&nbsp; are drawn on the same set of axes.<br><br>Show that the x-coordinate of any point where they meet satisfies &nbsp;x² + (3 − k)x + 4 = 0.",
      },
      hint: {
        en: "At a point where two graphs meet, they share the same x AND the same y. So put the two right-hand sides equal to each other and bring everything to one side.",
      },
      memo: [
        { type: "step", text: { en: "Where the graphs meet, the two y-values are the same, so put the two expressions equal:" } },
        { type: "step", text: { en: "x² + 3x + 5 = kx + 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Everything to the left: &nbsp;x² + 3x − kx + 5 − 1 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The two x terms share an x, so take it out: &nbsp;x² + (3 − k)x + 4 = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two graphs meeting is not a new idea dressed up as one — it is the ordinary “solve them together” move. A point that is on both graphs has one x and one y, so whatever the line says y is must equal whatever the parabola says y is. Setting the two expressions equal turns a picture question into an equation question in a single line. After that it is bookkeeping: take everything to the left so the equation reads equals zero, and notice that 3x and −kx are both x terms, so they collect into one bracket. What you are left with looks like an ordinary quadratic with a slightly odd b — and that odd b is where all the information about the line is hiding.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the line is a <b>tangent</b> to the parabola.",
      },
      hint: {
        en: "A tangent touches a curve at exactly ONE point. How many solutions does that mean the equation in (a) has — and what does that say about its discriminant?",
      },
      memo: [
        { type: "step", text: { en: "A tangent touches the parabola at exactly <b>one</b> point, so the equation in (a) has <b>equal roots</b> &nbsp;⟹&nbsp; Δ = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = (3 − k)² − 4(1)(4) = 0 &nbsp;⟹&nbsp; (3 − k)² = 16" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take the square root of both sides — and because you are <b>solving</b>, the ± appears: &nbsp;3 − k = ±4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3 − k = 4 &nbsp;gives&nbsp; k = −1, &nbsp;and&nbsp; 3 − k = −4 &nbsp;gives&nbsp; k = 7 &nbsp;&nbsp;∴ k = −1 &nbsp;or&nbsp; k = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the word “equal roots” never appears in this question — “tangent” and “touches at one point” are how a paper says it. And the ± is worth its own mark, so both values of k have to be handed in. Losing the negative branch here loses half the answer.",
        } },
      ],
      esplain: {
        en: "The whole difficulty of this question is spotting what is being asked, and once you see it there is no new maths at all. A line can miss a parabola, cut through it twice, or touch it once. Those three pictures are exactly the three discriminant cases of the equation you built in part (a): no real roots, two real roots, or equal roots. Touching once is the middle case, so Δ has to be zero. From there it is arithmetic. The bracket squared equals sixteen, and when you take the square root of both sides to SOLVE, both the plus and the minus branch count — four squared is sixteen and so is minus four squared. That hands you two lines, one sloping down and one sloping up, each resting against the parabola at a single point.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — k INSIDE b, so Δ = 0 gives k² = 144 and the answer carries ±.
   3x² − kx + 12 = 0 · Δ = k² − 144 = 0 → k = ±12.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.ker.q4",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "k-inside-b-delta-zero-gives-plus-minus-answer",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the value(s) of k for which &nbsp;3x² − kx + 12 = 0&nbsp; has two equal roots.",
      },
      hint: {
        en: "This time k sits where b usually is, so it gets squared. Set Δ = 0 and remember that a square root taken while SOLVING has two branches.",
      },
      memo: [
        { type: "step", text: { en: "a = 3 ; &nbsp;b = −k ; &nbsp;c = 12 &nbsp;&nbsp;∴&nbsp; Δ = (−k)² − 4(3)(12) = k² − 144" }, ticks: ["s/f"] },
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;k² − 144 = 0 &nbsp;⟹&nbsp; k² = 144" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 12 &nbsp;&nbsp;or&nbsp;&nbsp; k = −12" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (−k)² is k², not −k². Squaring kills the minus sign. And k² = 144 has TWO answers — a ± appears whenever you SOLVE by taking an even root, even though √144 on its own is simply 12.",
        } },
      ],
      esplain: {
        en: "When k lands in the b slot it gets squared, and that changes the shape of the answer. Everything up to the last line is the usual routine: substitute, keeping the minus k inside its own brackets, and notice that squaring it makes the minus disappear. Setting Δ to zero then leaves k squared equal to one hundred and forty-four. Here is the moment worth being careful about. Twelve squared is one hundred and forty-four, and so is minus twelve squared, so both are genuine answers. That is the difference her notes draw between simplifying and solving: the root sign on its own means the positive one, but an equation with a squared unknown has two solutions and both belong in your answer. Two different equations, each with its own equal root.",
      },
    },
  ],
};

export const eqnKEqualRootsSiblingQuestions = [q1, q2, q3, q4];
