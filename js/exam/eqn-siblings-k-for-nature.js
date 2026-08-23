/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "k-for-nature" (Values of k for a given nature).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FIVE new cards, taking the tile from one to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.nor.q3(b)(c) — 2x² − 4x + k = 0, where Δ = 16 − 8k is LINEAR
       in k: "real and unequal" gives k &lt; 2, and "non-real" is then read
       off as the leftover, k &gt; 2, without touching Δ again.
   That card owns the linear-Δ ladder and the leftover argument. The
   five below are the five rungs the tile was missing:
     q1  the plainest possible "for which k are the roots REAL" — Δ ≥ 0,
       one sign flip, so the tile has a genuine level-1 way in;
     q2  "non-real", where the answer is a FRACTION rather than a whole
       number, so the boundary cannot be guessed;
     q3  Δ is QUADRATIC in k, so finding "non-real" means solving a
       quadratic INEQUALITY in k — her B8 TIP Chips method, and the
       answer is the INSIDE of the bowl;
     q4  "two distinct real roots", then the same range filtered down to
       the NATURAL NUMBERS in it;
     q5  k in b AND in c, Δ quadratic again, and this time the answer is
       the OUTSIDE of the bowl — two arms joined by "or".

   METHOD: METHODS-algebra.md, hers verbatim — B12(a) (set up an
   inequality in k and solve it); B7 (the sign flips on × or ÷ by a
   negative); B8 "TIP Chips" for q3 and q5 (everything to the left, no
   negative in front of k², factorise, CP must be "=", then read the
   answer off the sketch as inside/outside of the bowl — never a sign
   table, never interval notation, and the calculator's semicolon form
   is rewritten with "or" and the letter on the left); B11's table for
   which sign of Δ each nature needs; §0.1's decimal comma.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's nature-of-roots ladder
   ("non-real-range" rung); SURVEY-Her-2025-Assessments.md Test 1 Q4
   ("for which t will the roots be non-real"); SURVEY-Nov-P1.md Nov 2021
   Q1 "for which real k does … have real roots". Fresh numbers.

   LEVELS: 1, 2, 3, 2, 3 — one L1, two L2 and three L3 across the whole
   tile once the existing card is counted. NOTHING here is level 4.
   NO DIAGRAM: the bowl sketch that q3 and q5 lean on is carried IN
   WORDS inside the memo, exactly as the two seeded inequality questions
   already do; no mark depends on the picture being drawn.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq8" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN.  x² − 6x + k = 0 has REAL roots when Δ ≥ 0:
   36 − 4k ≥ 0 → −4k ≥ −36 → k ≤ 9 (the sign flips).
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.kfn.q1",
  chapter: CH,
  topic: "k-for-nature",
  archetype: "real-roots-linear-inequality-in-k-with-a-sign-flip",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine the values of k for which the roots of &nbsp;x² − 6x + k = 0&nbsp; are real.",
      },
      hint: {
        en: "“Real” is a statement about the SIGN of Δ, not its value — real roots need Δ to be zero or bigger. Write Δ in terms of k, then solve an inequality instead of an equation.",
      },
      memo: [
        { type: "step", text: { en: "Real roots need &nbsp;Δ ≥ 0. &nbsp;&nbsp;a = 1 ; b = −6 ; c = k &nbsp;&nbsp;∴&nbsp; Δ = (−6)² − 4(1)(k) = 36 − 4k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "36 − 4k ≥ 0 &nbsp;⟹&nbsp; −4k ≥ −36" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k ≤ 9 &nbsp;&nbsp;(dividing by a negative turns the sign around)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: dividing both sides by −4 FLIPS the inequality sign — k ≤ 9, not k ≥ 9. Test it if you are unsure: k = 0 gives Δ = 36, real roots ✓, and 0 really is less than 9.",
        } },
      ],
      esplain: {
        en: "There are only three natures a quadratic can have, and each one is a statement about the sign of Δ rather than its size. Real means Δ is zero or above; non-real means Δ is below zero; equal is the single point where Δ is exactly zero. So “for which k are the roots real” is asking you to solve an inequality, not an equation, and the only new thing to watch is the flip. When you divide both sides of an inequality by a negative number, every number changes places on the number line, so the sign has to turn around with them. Two is smaller than five, but minus two is bigger than minus five. That is the whole reason for the rule.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — NON-REAL, with a FRACTION boundary.
   2x² + 5x + k = 0 · Δ = 25 − 8k &lt; 0 → k &gt; 25/8 = 3,125.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.kfn.q2",
  chapter: CH,
  topic: "k-for-nature",
  archetype: "non-real-linear-inequality-in-k-with-a-fraction-boundary",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the values of k for which the roots of &nbsp;2x² + 5x + k = 0&nbsp; are non-real.",
      },
      hint: {
        en: "Non-real means Δ is strictly below zero. Watch the a — it is 2 here, not 1, so it goes into the 4ac term.",
      },
      memo: [
        { type: "step", text: { en: "Non-real roots need &nbsp;Δ &lt; 0. &nbsp;&nbsp;a = 2 ; b = 5 ; c = k &nbsp;&nbsp;∴&nbsp; Δ = 5² − 4(2)(k) = 25 − 8k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "25 − 8k &lt; 0 &nbsp;⟹&nbsp; −8k &lt; −25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &gt; 25/8 &nbsp;&nbsp;(= 3,125) &nbsp;— the sign turned around when both sides were divided by −8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a = 2, so 4ac is 8k and not 4k. Using a = 1 out of habit gives k &gt; 25/4, which is a whole different boundary. Read a, b and c off the equation every single time.",
        } },
      ],
      esplain: {
        en: "Non-real is the case where the discriminant drops below zero, because a root is a square root of Δ and no real number squares to something negative. So the condition is Δ less than zero, strictly — the boundary itself is not included, since Δ exactly zero would give real, equal roots. The arithmetic here has two places to be careful. First, a is two, so the four a c term is eight k rather than four k. Second, dividing by minus eight flips the sign. The boundary comes out as a fraction, twenty-five over eight, and that is a perfectly good final answer; the decimal three comma one two five is there if you want to picture it, but the fraction is exact and exact is better.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — Δ QUADRATIC IN k: a quadratic INEQUALITY, inside the bowl.
   x² + kx + (2k + 5) = 0 · Δ = k² − 8k − 20 = (k − 10)(k + 2)
   Non-real: Δ &lt; 0 → −2 &lt; k &lt; 10.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.kfn.q3",
  chapter: CH,
  topic: "k-for-nature",
  archetype: "quadratic-inequality-in-k-for-non-real-roots-inside-the-bowl",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + kx + (2k + 5) = 0, &nbsp;where k is a real number.<br><br>Show that &nbsp;Δ = k² − 8k − 20.",
      },
      hint: {
        en: "Take the whole of 2k + 5 as c, bracket and all, and let the −4 reach both of its terms.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = k ; &nbsp;c = 2k + 5" } },
        { type: "step", text: { en: "Δ = b² − 4ac = k² − 4(1)(2k + 5)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= k² − (8k + 20)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ = k² − 8k − 20" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The substitution is ordinary; the interesting part is what comes out. Because k sits in the b slot as well as inside the c, squaring b produces a k squared term and the four a c term produces a k term — so Δ is not a straight line in k any more, it is a parabola in k. That changes the shape of every question that follows, because asking where a parabola is below zero is a different job from asking where a straight line is. Keep the brackets around 2k + 5 while the minus four goes in, so that both the eight k and the twenty come out negative. Losing the second sign there is the single most common way this question goes wrong.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the roots of the equation are non-real.",
      },
      hint: {
        en: "Non-real needs Δ &lt; 0, and Δ is a quadratic now — so this is a quadratic inequality, in k instead of x. Everything on the left, factorise, find the CP, then read the answer off the bowl.",
      },
      memo: [
        { type: "step", text: { en: "Non-real roots need &nbsp;Δ &lt; 0: &nbsp;&nbsp;k² − 8k − 20 &lt; 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Everything is already on the left and there is no negative in front of the k², so factorise: &nbsp;(k − 10)(k + 2) &lt; 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "CP: &nbsp;k − 10 = 0 &nbsp;or&nbsp; k + 2 = 0 &nbsp;⟹&nbsp; k = 10 &nbsp;or&nbsp; k = −2" }, ticks: ["ca"] },
        { type: "step", text: { en: "Sketch it as a <b>happy</b> parabola in k, cutting the k-axis at −2 and at 10. &lt; 0 means below the axis — the <b>inside of the bowl</b>." } },
        { type: "answer", text: { en: "∴ −2 &lt; k &lt; 10" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bowl you are sketching is a picture of Δ against k, NOT of the original equation against x. The critical points −2 and 10 are values of k, not roots of the equation — at k = −2 the equation is x² − 2x + 1 = 0, whose root is x = 1.",
        } },
      ],
      esplain: {
        en: "Two different quadratics are living in this question and keeping them apart is the whole skill. The first is the equation you were given, whose unknown is x. The second is the discriminant, whose unknown is k — and it is that second one you are now sketching. Everything her TIP Chips checklist says still applies, just with k where x usually goes: get it all on the left, check there is no minus in front of the squared term, factorise, and set each bracket equal to zero to find the critical points. Because the k squared is positive, the picture is a happy parabola crossing at minus two and ten, and a happy parabola only dips below the axis between its two crossings. Below zero therefore means between them: the inside of the bowl.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — "TWO DISTINCT REAL ROOTS", then the NATURAL NUMBERS in the range.
   x² − 4x + (k − 1) = 0 · Δ = 20 − 4k &gt; 0 → k &lt; 5 → ℕ: 1 ; 2 ; 3 ; 4.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.kfn.q4",
  chapter: CH,
  topic: "k-for-nature",
  archetype: "two-distinct-real-roots-then-list-the-natural-numbers",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² − 4x + (k − 1) = 0, &nbsp;where k is a real number.<br><br>Determine the values of k for which the equation has two distinct real roots.",
      },
      hint: {
        en: "“Two distinct real roots” is exam wording for real and unequal — which is Δ bigger than zero, not Δ bigger than or equal to zero.",
      },
      memo: [
        { type: "step", text: { en: "Two distinct real roots need &nbsp;Δ &gt; 0. &nbsp;&nbsp;Δ = (−4)² − 4(1)(k − 1) = 16 − 4k + 4 = 20 − 4k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "20 − 4k &gt; 0 &nbsp;⟹&nbsp; −4k &gt; −20" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &lt; 5 &nbsp;&nbsp;(dividing by a negative turns the sign around)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “distinct” rules out the boundary. At k = 5, Δ = 0 and the roots are real but EQUAL, so 5 itself is not part of the answer — that is why the sign is &lt; and not ≤.",
        } },
      ],
      esplain: {
        en: "Exam papers have several ways of saying the same thing, and “two distinct real roots” is one of them. Distinct means different from each other, so this is real and unequal, which is the strictly-bigger-than-zero case. The word matters, because it decides whether the boundary belongs in your answer. Watch the c as well: it is the whole of k minus one, so minus four times it gives minus four k plus four, and that plus four joins the sixteen to make twenty. Then it is the usual flip at the end. As a check, feed a value back in. With k equal to four the equation becomes x squared minus four x plus three, which factorises to x minus one times x minus three — two different roots, exactly as promised.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down all the natural-number values of k for which the roots are real and unequal.",
      },
      hint: {
        en: "The natural numbers are the counting numbers. Which of them are smaller than the boundary you found in (a)?",
      },
      memo: [
        { type: "step", text: { en: "The natural numbers are &nbsp;1 ; 2 ; 3 ; 4 ; 5 ; … &nbsp;and they must satisfy &nbsp;k &lt; 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 1 ; &nbsp;2 ; &nbsp;3 ; &nbsp;4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: ℕ starts at 1, so 0 and every negative number are out even though they satisfy k &lt; 5. And 5 is out too, because at k = 5 the roots stop being unequal. Read the number set AND the inequality — the question is testing both.",
        } },
      ],
      esplain: {
        en: "This part looks like an afterthought and it is really a second question hiding behind the first. Part (a) gave you a whole stretch of the number line; this part asks which members of one particular set of numbers live inside that stretch. The natural numbers are the counting numbers, starting at one and going up in ones, so the candidates are one, two, three, four, five and onwards. The condition cuts them off below five, and five itself is excluded because the inequality is strict. That leaves four values. It is worth reading your own answer back against the question wording — “natural number” and “real and unequal” are two separate filters, and dropping either one costs a mark.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — k IN b AND IN c, and the answer is the OUTSIDE of the bowl.
   x² + (k − 2)x + (k + 1) = 0 · Δ = k² − 8k = k(k − 8)
   Real: Δ ≥ 0 → k ≤ 0 or k ≥ 8.
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.kfn.q5",
  chapter: CH,
  topic: "k-for-nature",
  archetype: "k-in-b-and-c-real-roots-outside-the-bowl",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + (k − 2)x + (k + 1) = 0, &nbsp;where k is a real number.<br><br>Show that &nbsp;Δ = k² − 8k.",
      },
      hint: {
        en: "b is a whole bracket here, so squaring it needs the middle term: (k − 2)² = k² − 4k + 4. Then take the whole of k + 1 as c.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = k − 2 ; &nbsp;c = k + 1 &nbsp;&nbsp;∴&nbsp; Δ = (k − 2)² − 4(1)(k + 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= k² − 4k + 4 − 4k − 4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "the +4 and the −4 cancel &nbsp;&nbsp;∴ Δ = k² − 8k" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the middle term. (k − 2)² is k² − 4k + 4, not k² + 4. Squaring a bracket means multiplying it by itself, and the two “outside–inside” products are what give the −4k.",
        } },
      ],
      esplain: {
        en: "This is the busiest substitution on the tile, because k appears twice and both appearances have to be handled with brackets. Squaring b is the first job, and a squared bracket always has three terms: the first thing squared, twice the product of the two things, and the last thing squared. That gives k squared minus four k plus four. Then minus four times the bracket k plus one gives minus four k minus four. Line the two up and the plus four and minus four wipe each other out, leaving something surprisingly tidy. That tidiness is not luck — the numbers were chosen so the constant vanishes, which is what makes the next part factorise with a common factor rather than a trinomial.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the roots of the equation are real.",
      },
      hint: {
        en: "Real needs Δ ≥ 0, and Δ has no constant term — so a common factor comes out instead of a trinomial. Find the CP, then decide which part of the bowl you want.",
      },
      memo: [
        { type: "step", text: { en: "Real roots need &nbsp;Δ ≥ 0: &nbsp;&nbsp;k² − 8k ≥ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Common factor: &nbsp;k(k − 8) ≥ 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "CP: &nbsp;k = 0 &nbsp;or&nbsp; k − 8 = 0 &nbsp;⟹&nbsp; k = 0 &nbsp;or&nbsp; k = 8" }, ticks: ["ca"] },
        { type: "step", text: { en: "Sketch it as a <b>happy</b> parabola in k, cutting the k-axis at 0 and at 8. ≥ 0 means on or above the axis — the <b>outside of the bowl</b>, both arms." } },
        { type: "answer", text: { en: "∴ k ≤ 0 &nbsp;&nbsp;or&nbsp;&nbsp; k ≥ 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER her rule about writing it down: never hand in the calculator's form “k ≤ 0 ; 8 ≤ k”. Rewrite it with k on the left in both pieces and the word <b>or</b> between them, because the answer really is two separate stretches of the number line.",
        } },
      ],
      esplain: {
        en: "Compare this with the non-real card and the pair teaches the whole method. There the sign was less than zero and the answer was the dip between the two crossings; here the sign is greater than or equal to zero and the answer is everything else — the two arms that climb away on either side. Both come from the same picture, so once the critical points are down, choosing the right region is just a matter of looking. Two details earn marks. The equals-sign is included, because Δ exactly zero still counts as real (equal roots are real roots). And the answer is written as two pieces joined by “or”, with k on the left both times, which is her ruling about never handing in the calculator's semicolon version.",
      },
    },
  ],
};

export const eqnKForNatureSiblingQuestions = [q1, q2, q3, q4, q5];
