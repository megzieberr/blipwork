/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "fraction-equations" (Fraction equations with restrictions).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.fr.q1(a–c)  x/(x − 2) + 2/(x + 1) = 6/(x² − x − 2) — factorise
       a TRINOMIAL denominator, LCD, and one root (x = 2) really does
       land on a limit and has to be thrown away;
     · eqn.km.t1q2(b)  4/(x − 2) + x/(x + 2) = 23/(x² − 4) — a DIFFERENCE
       OF SQUARES denominator, and both roots survive the check.
   Both are three-term equations that clear to a quadratic. The four
   below are the four moves the tile was missing:
     q1  the simplest possible one — a bare x under the line, clearing to
       a LINEAR equation — so the tile has a genuine level-1 way in;
     q2  the NEGATIVE TWIN: 2 − x is −(x − 2), so one fraction has to be
       turned around before the denominators match at all;
     q3  every root dies. The equation clears perfectly, gives x = 3, and
       3 is a limit — so the honest answer is that there is NO solution;
     q4  one fraction on each side, where the x² terms CANCEL and what is
       left is linear.

   METHOD: METHODS-algebra.md, hers verbatim — B2: factorise every
   denominator FIRST · write LCD and the limits line BEFORE solving · a
   whole number gets denominator 1 · multiply each term up to the LCD so
   the denominators cancel · solve · then check every root against the
   limits. Her negative-denominator move (3 − x = −(x − 3), highlighted
   in colour on her page) is the whole of q2. Her ruling that a
   three-term fraction equation is never cross-multiplied is quoted in
   q4's trap, where the two-term case is the exception. §0.2 the ∴ habit;
   §0.3's "undefined" for a zero denominator.

   ARCHETYPE: the fraction-equation-with-limits shape that runs through
   the whole bank — SURVEY-June.md June 2018 P1 Q1(b) and June 2019 P1
   Q1(d); SURVEY-Her-2025-Assessments.md Test 1 Q2 and Test 6 Q1; her
   own Sept T1 Q2(b). Fresh denominators and fresh numbers throughout.

   LEVELS: 1, 2, 3, 2. NOTHING here is level 4. NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq4" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN: a bare x under the line, clearing to a linear
   equation.  3/x + 1/2 = 2  (x ≠ 0)  →  6 + x = 4x  →  x = 2.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.fe.q1",
  chapter: CH,
  topic: "fraction-equations",
  archetype: "simple-fraction-equation-clearing-to-a-linear-equation",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "Given: &nbsp;3/x + 1/2 = 2<br><br>Write down the limit — the value x is not allowed to take.",
      },
      hint: {
        en: "Look at the denominators. One of them is a plain 2, which can never be zero — the other one is the whole question.",
      },
      memo: [
        { type: "answer", text: { en: "The denominator x may not be zero &nbsp;&nbsp;∴ x ≠ 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The limits line is the first thing on the page, before any solving happens, and it is a mark of its own in every one of her memos. It comes from the denominators and nowhere else: any value of x that would make a denominator zero has to be ruled out, because dividing by zero is undefined. Here there are two denominators. The 2 is a plain number and can never be zero, so it contributes nothing. The x can be zero, so it does — x may not be zero. Write it at the top of your page now, even when it looks obvious, because at the end you have to check your answer against it.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Solve for x.",
      },
      hint: {
        en: "The LCD is the smallest thing both denominators divide into — here that is 2x. Multiply EVERY term by it, including the 2 on the right, which secretly has a denominator of 1.",
      },
      memo: [
        { type: "step", text: { en: "LCD = 2x &nbsp;&nbsp;·&nbsp;&nbsp; limits: x ≠ 0. &nbsp;Multiply every term by 2x; the denominators cancel and only the numerators are left." } },
        { type: "step", text: { en: "6 + x = 4x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "6 = 3x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 2 &nbsp;— and 2 is not a limit, so it stands" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the 2 on the right-hand side gets multiplied by the LCD too. It has an invisible denominator of 1, so 2 × 2x = 4x. Multiplying only the fractions away leaves 6 + x = 2, which is a different equation and a wrong answer.",
        } },
      ],
      esplain: {
        en: "Multiplying by the LCD is legal because every single term on both sides gets the same treatment, so the balance never tips — and it is worth doing because fractions turn into an ordinary equation you already know how to solve. The piece people forget is the whole number. A 2 on its own is really 2 over 1, so it gets multiplied by the LCD exactly like the fractions do. Work through the three terms one at a time: 3 over x times 2x leaves 6, 1 over 2 times 2x leaves x, and 2 times 2x is 4x. Then it is a two-line linear equation, and the answer gets checked against the limits before it is written down.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE NEGATIVE TWIN.  5/(x − 2) + 3/(2 − x) = x − 3, x ≠ 2.
   3/(2 − x) = −3/(x − 2), so the LHS is 2/(x − 2); LCD (x − 2) gives
   2 = (x − 3)(x − 2) → x² − 5x + 4 = 0 → x = 1 or x = 4, both valid.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.fe.q2",
  chapter: CH,
  topic: "fraction-equations",
  archetype: "negative-twin-denominator-then-clear-to-a-quadratic",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Given: &nbsp;5/(x − 2) + 3/(2 − x) = x − 3<br><br>Show that &nbsp;3/(2 − x)&nbsp; can be written as &nbsp;−3/(x − 2), &nbsp;and write down the limit.",
      },
      hint: {
        en: "The two denominators look different and are really the same thing back to front. Take a −1 out of 2 − x and see what is left inside the bracket.",
      },
      memo: [
        { type: "step", text: { en: "2 − x = −(x − 2), &nbsp;so &nbsp;3/(2 − x) = 3/(−(x − 2)) = −3/(x − 2)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "Both denominators are now x − 2, which may not be zero &nbsp;&nbsp;∴ x ≠ 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 2 − x is NOT the same as x − 2 — it is the negative of it. Taking the −1 out and carrying it up into the numerator is where the sign is won or lost, and it is the step she highlights in colour on her own page.",
        } },
      ],
      esplain: {
        en: "Two denominators that are each other back to front are the same denominator wearing a minus sign. Two minus x equals minus one times x minus two, so a fraction with two minus x underneath is the same as minus that fraction with x minus two underneath. Doing that swap first is what makes the whole question easy, because now both fractions share one denominator and there is nothing to build an LCD out of. It also means there is only one forbidden value, not two: x may not be two, and that single limit covers both fractions. If you skip the swap and treat them as different denominators, you end up multiplying by something twice as big and fighting signs all the way down.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Hence solve for x.",
      },
      hint: {
        en: "With both denominators the same, the left-hand side collapses into one fraction. Then multiply both sides by that denominator and solve the quadratic that appears.",
      },
      memo: [
        { type: "step", text: { en: "Using the negative twin from (a): &nbsp;5/(x − 2) − 3/(x − 2) = 2/(x − 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LCD = x − 2 &nbsp;&nbsp;·&nbsp;&nbsp; limits: x ≠ 2 &nbsp;&nbsp;⟹&nbsp;&nbsp; 2 = (x − 3)(x − 2)" }, ticks: ["ca"] },
        { type: "step", text: { en: "2 = x² − 5x + 6 &nbsp;⟹&nbsp; x² − 5x + 4 = 0 &nbsp;⟹&nbsp; (x − 1)(x − 4) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 1 &nbsp;&nbsp;or&nbsp;&nbsp; x = 4 &nbsp;— neither one is the limit x = 2, so both stand" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER to check BOTH answers against the limit, not just the one that looks suspicious. Here both survive — but the checking line is a mark whether or not it changes the answer, and leaving it out is the most common way to lose the last mark on this kind of question.",
        } },
      ],
      esplain: {
        en: "Once the two fractions share a denominator, five of them take away three of them leaves two of them — the same as five sevenths minus three sevenths being two sevenths. That single fraction is much easier to work with than the pair. Multiplying both sides by x minus two clears it, and the right-hand side, which had no denominator, picks the bracket up. Multiplying out gives a quadratic, and a quadratic that factorises gives two roots. The last line is the one the mark scheme cares about: both roots have to be held up against the limit before they are handed in. Neither of them is two, so both are genuine solutions of the equation you were actually given.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EVERY ROOT DIES.  1/(x + 3) + 1/(x − 3) = 6/(x² − 9)
   LCD (x + 3)(x − 3), limits x ≠ ±3 → (x − 3) + (x + 3) = 6 → x = 3,
   which is a limit → the equation has NO solution.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.fe.q3",
  chapter: CH,
  topic: "fraction-equations",
  archetype: "fraction-equation-whose-only-root-is-a-forbidden-value",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Given: &nbsp;1/(x + 3) + 1/(x − 3) = 6/(x² − 9)<br><br>Factorise &nbsp;x² − 9, &nbsp;and hence write down the limits.",
      },
      hint: {
        en: "x² − 9 is a difference of squares. Once it is in brackets, the forbidden values are whatever would make any denominator equal zero.",
      },
      memo: [
        { type: "step", text: { en: "x² − 9 is a difference of squares: &nbsp;x² − 9 = (x + 3)(x − 3)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "limits: &nbsp;x ≠ −3 ; &nbsp;x ≠ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the limits come from EVERY denominator, not only the big one. Here x + 3 and x − 3 each appear on their own as well, and they give the same two values — which is the clue that the third denominator is just those two multiplied together.",
        } },
      ],
      esplain: {
        en: "Factorising the messiest denominator does two jobs at once. It shows you the forbidden values, because a product is zero exactly when one of its brackets is zero, so this fraction breaks at three and at minus three. And it hands you the LCD for free, because those same two brackets are already sitting under the other two fractions. That is not a coincidence — questions are built this way on purpose, so that the difference of squares is the piece of Grade 10 work that unlocks the rest. Write the limits down at the top of your page now; on this particular question they are going to matter more than usual.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Solve for x, and state clearly what your answer means.",
      },
      hint: {
        en: "The denominators are already factorised, so the LCD is just the two brackets multiplied. Multiply everything by it — and then hold whatever you get up against your limits line before you write it down.",
      },
      memo: [
        { type: "step", text: { en: "LCD = (x + 3)(x − 3) &nbsp;&nbsp;·&nbsp;&nbsp; limits: x ≠ −3 ; x ≠ 3. &nbsp;Multiply every term by the LCD; the denominators cancel and only the numerators are left." } },
        { type: "step", text: { en: "(x − 3) + (x + 3) = 6" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2x = 6 &nbsp;⟹&nbsp; x = 3" }, ticks: ["ca"] },
        { type: "step", text: { en: "But x = 3 is a limit — it makes x − 3 and x² − 9 equal to zero, so it must be thrown away" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ the equation has NO solution — its only root is a forbidden value" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: x = 3 solves the tidied-up equation perfectly, and it is still not an answer. Put it back into the equation you were GIVEN and the second fraction reads 1 divided by 0 — undefined. That is exactly why the limits line goes down first: the tidied-up equation has forgotten a rule that the original one never dropped.",
        } },
      ],
      esplain: {
        en: "This is the card that shows why the limits line is not a polite formality. Multiplying by the LCD is a legal move, but the equation you are left with is not quite the same animal as the one you started with — it has forgotten that x could never be three. So it happily offers three back to you as an answer, and it is your job to refuse it. Once that root is thrown away there is nothing left, and that is a complete and correct answer: this equation has no solution. Say it in words rather than leaving the page blank. And notice the difference between the two ideas: x equals three is not a wrong root, it is a value where the equation does not exist at all.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — ONE FRACTION EACH SIDE, and the x² terms CANCEL.
   (x + 4)/(x − 1) = (x + 2)/(x − 2), x ≠ 1, x ≠ 2
   → (x + 4)(x − 2) = (x + 2)(x − 1) → 2x − 8 = x − 2 → x = 6.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.fe.q4",
  chapter: CH,
  topic: "fraction-equations",
  archetype: "one-fraction-each-side-where-the-squared-terms-cancel",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Given: &nbsp;(x + 4)/(x − 1) = (x + 2)/(x − 2)<br><br>Write down the limits.",
      },
      hint: {
        en: "Each side has its own denominator, and each one gives its own forbidden value.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is undefined where its denominator is zero: &nbsp;x − 1 = 0 &nbsp;or&nbsp; x − 2 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "limits: &nbsp;x ≠ 1 ; &nbsp;x ≠ 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "There are two denominators here and neither of them is more important than the other, so both give a limit. It is worth saying why this line exists at all rather than treating it as a ritual. The equation you are about to write down, once the fractions are gone, will be a perfectly ordinary one, and it has no memory of where the original was broken. The limits line is that memory, written on your own page. Two forbidden values, one and two, and they get held up against your answer at the very end.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Solve for x.",
      },
      hint: {
        en: "The LCD is the two denominators multiplied together. Multiply both sides by it, expand carefully, and then look at the two x² terms.",
      },
      memo: [
        { type: "step", text: { en: "LCD = (x − 1)(x − 2) &nbsp;&nbsp;·&nbsp;&nbsp; limits: x ≠ 1 ; x ≠ 2. &nbsp;Multiply both sides by the LCD; each denominator cancels against its own bracket." } },
        { type: "step", text: { en: "(x + 4)(x − 2) = (x + 2)(x − 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² + 2x − 8 = x² + x − 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "The x² terms are the same on both sides, so they cancel: &nbsp;2x − 8 = x − 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 6 &nbsp;— and 6 is not a limit, so it stands" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a fraction equation with exactly ONE fraction on each side may be cross-multiplied, and that is what the LCD step comes to here. The moment there are THREE terms, cross-multiplying stops working and the LCD is the only safe road — which is why her method always writes the LCD line, whatever the shape.",
        } },
      ],
      esplain: {
        en: "Multiplying both sides by the two denominators is what the phrase “cross-multiply” really means, and it is safe here because there is one fraction on each side and nothing else. Expand both products carefully — each bracket has two terms, so there are four little products a side. Then comes the pleasant surprise: both sides have an x squared and it is exactly the same size, so subtracting it from both sides makes it disappear. What was starting to look like a quadratic collapses into a two-line linear equation. One answer, not two, and it clears both limits, so it stands. If the x squared terms had not matched you would have carried on with an ordinary quadratic instead — either way, nothing about the method changes.",
      },
    },
  ],
};

export const eqnFractionEquationsSiblingQuestions = [q1, q2, q3, q4];
