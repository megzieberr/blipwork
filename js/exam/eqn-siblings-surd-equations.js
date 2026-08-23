/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the NEW
   tile "surd-equations" ("Surd equations (check the false root)").
   (EXAM-BUILD-DAY.md, 2026-08-23, the eqn tile map; wave 2, session C2.)
   ------------------------------------------------------------
   SIX cards, born from nothing. The paper bank is blunt about why this
   tile has to exist: GR11-IEB-PAPER-BANK.md archetype 2 —
   "the surd equation with a built-in extraneous root — in EVERY
   surveyed paper, 4–5 marks, always calculator-free". Her own 2025
   Test 1 has one too. Blipwork had exactly zero.

   HER METHOD IS METHODS-algebra.md A15 (her `EQ p41` summary box):
     1. isolate the √ on one side
     2. square both sides — brackets on BOTH sides
     3. watch the middle term: (x + 3)² = x² + 6x + 9
     4. solve what is left
     5. "ALWAYS test both answers!!" — her capitals, her two
        exclamation marks
     6. mark the failing root N.A. and write it with a struck equals,
        x ≠ 3
   The substitution test is a MARKED STEP, not an optional check
   (METHODS-algebra Part C, "credited steps a generator should always
   show"), so every memo here spends ticks on it — usually two of its
   four or five.

   WHAT THE SIX COVER, and why these six:
     q1  the shape at its simplest, then the classic with ONE false
         root — the archetype the bank says is in every paper
     q2  the one where BOTH roots survive, so "reject one" never
         becomes a reflex
     q3  the one where NEITHER survives: the answer is "no solution"
     q4  the one that must be ISOLATED first (√(x + 5) + x = 7)
     q5  a quadratic in √x — her k-method leads, isolate-and-square
         rides under OR (METHODS-algebra Flag F5, ruled by her
         2026-08-21: "ALWAYS show both")
     q6  a restriction stated up front, then "hence" — where a root
         obeys the restriction and STILL fails the check

   THE TRAP CARD RIDES ON EVERY CARD (the brief): squaring an equation
   can invent a root, so both answers go back into the ORIGINAL.

   lostQuest is exp/es8 — "No-solution & strategy", the Blipwork round
   whose own blurb reads "Exponential & surd equations: same base,
   common factor, let k, isolate-square-TEST, and every no-solution
   trap". It is the round that teaches this tile, and it lives in the
   Exponents & Surds chapter rather than this one; the schema allows a
   cross-chapter lostQuest and js/exam-play.js resolves it the same way.
   Every number here is fresh.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
/* The round that actually reteaches this skill — es8, in the Exponents
   & Surds chapter. See the header note above. */
const LOST = { chapter: "exp", quest: "es8" };

/* ---------------------------------------------------------------
   q1 — THE SHAPE, THEN THE CLASSIC.
   (a) √(x − 3) = 4 → x = 19
   (b) √(3x + 4) = x − 2 → x² − 7x = 0 → x = 0 (N.A.) or x = 7
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.se.q1",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-with-one-extraneous-root",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;√(x − 3) = 4",
      },
      hint: {
        en: "A square root is undone by squaring. Square BOTH sides — the whole of each side, brackets and all — and see what is left.",
      },
      memo: [
        { type: "step", text: { en: "The √ is already alone, so square both sides, brackets on both sides:" } },
        { type: "step", text: { en: "(√(x − 3))² = 4² &nbsp;&nbsp;⟹&nbsp;&nbsp; x − 3 = 16" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; x = 19" }, ticks: ["a"] },
        { type: "step", text: { en: "Test it in the ORIGINAL equation: &nbsp;√(19 − 3) = √16 = 4, and the right-hand side is 4. It works." } },
        { type: "trap", text: {
          en: "REMEMBER: squaring both sides can invent an answer that was never really there, so the test is never optional — not even on an easy one like this. Get into the habit here, where it costs you nothing, so it is automatic when it matters.",
        } },
      ],
      esplain: {
        en: "Squaring is the move that gets the x out from under the root. The root sign and the square undo each other, so the left side collapses to just what was inside, and the right side becomes sixteen. From there it is a one-step equation. The habit worth building is the last line: put your answer back into the equation you were given and check that both sides really do come out the same. Here nineteen minus three is sixteen, whose root is four, which matches. It feels unnecessary on a question this size, and that is exactly why it is the right place to practise it — on the harder ones the test is where the marks live.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(3x + 4) = x − 2",
      },
      hint: {
        en: "Square both sides, but remember what happens to the right-hand side: squaring &nbsp;x − 2&nbsp; is not &nbsp;x² − 4. There is a middle term. Then test BOTH answers in the original equation.",
      },
      memo: [
        { type: "step", text: { en: "The √ is alone, so square both sides — brackets on both sides:" } },
        { type: "step", text: { en: "3x + 4 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "collect everything on the side that keeps x² positive: &nbsp;&nbsp;0 = x² − 7x" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = x(x − 7) &nbsp;&nbsp;∴&nbsp; x = 0 &nbsp;or&nbsp; x = 7" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Now test both</b>, in the ORIGINAL equation:" } },
        { type: "answer", text: { en: "x = 0: &nbsp;√(3(0) + 4) = √4 = 2, &nbsp;but&nbsp; x − 2 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 0 &nbsp;&nbsp;N.A." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 7: &nbsp;√(3(7) + 4) = √25 = 5, &nbsp;and&nbsp; x − 2 = 5. &nbsp;&nbsp;5 = 5 &nbsp;&nbsp;∴&nbsp; x = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a squared equation can INVENT a root — check BOTH answers in the original. Squaring cannot tell +2 apart from −2, so it happily accepts an answer that makes the two sides opposite instead of equal. That is what happened to &nbsp;x = 0&nbsp; here, and it is why the rejected root is marked N.A. rather than crossed out in silence.",
        } },
      ],
      esplain: {
        en: "The left side of this equation is a square root, so it can never come out negative. The right side is x minus two, which is negative whenever x is smaller than two. So before any algebra you already know that any answer below two is going to be trouble. Squaring both sides is still the way forward, but squaring is careless: it treats two and negative two as the same thing, so it can let through an answer that makes the sides opposite rather than equal. That is exactly what zero does here — the root gives two, the other side gives negative two. Seven passes cleanly. Writing N.A. next to the failed one, with the struck equals, is how her memos show that you tested it and rejected it on purpose.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — BOTH ROOTS SURVIVE.
   √(7x − 20) = x − 2 → x² − 11x + 24 = 0 → x = 3 and x = 8, both keep.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.se.q2",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-where-both-roots-survive-the-test",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(7x − 20) = x − 2",
      },
      hint: {
        en: "Same routine: square both sides, collect everything on one side, factorise. Then test both answers — and do not assume one of them has to fail.",
      },
      memo: [
        { type: "step", text: { en: "The √ is alone, so square both sides:" } },
        { type: "step", text: { en: "7x − 20 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 11x + 24" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = (x − 3)(x − 8) &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;or&nbsp; x = 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 3: &nbsp;√(21 − 20) = √1 = 1, &nbsp;and&nbsp; x − 2 = 1. &nbsp;&nbsp;1 = 1 — it works." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 8: &nbsp;√(56 − 20) = √36 = 6, &nbsp;and&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6 — it works too. &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;or&nbsp; x = 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: two surviving answers is NOT a mistake. Squaring only <i>sometimes</i> invents a root, and there is no rule that says one answer must be thrown away. Test both, keep whatever passes — throwing away a perfectly good answer because “there is always a false one” costs the same mark as keeping a bad one.",
        } },
      ],
      esplain: {
        en: "Everything here runs exactly as it did on the question with a false root, right up to the last two lines. Square both sides, watch the middle term when x minus two is squared, bring everything over so the quadratic reads equals zero, and factorise. What is different is the outcome of the test. Both three and eight make the right-hand side positive, and a positive right-hand side is what a square root can actually match, so neither one is a fake. The reason to test anyway is that you cannot know which case you are in until you look. Some learners start rejecting the smaller root automatically because that is what happened last time; here that habit would throw away half the marks.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — NEITHER ROOT SURVIVES → NO SOLUTION.
   √(19 − 5x) = x − 5 → x² − 5x + 6 = 0 → x = 2 and x = 3, both N.A.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.se.q3",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-where-every-root-fails-the-test",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;√(19 − 5x) = x − 5",
      },
      hint: {
        en: "Work it the usual way. When you get to the test, look carefully at the sign of the right-hand side at each answer before you decide what to write.",
      },
      memo: [
        { type: "step", text: { en: "Square both sides:" } },
        { type: "step", text: { en: "19 − 5x = (x − 5)² = x² − 10x + 25" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 5x + 6" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = (x − 2)(x − 3) &nbsp;&nbsp;∴&nbsp; x = 2 &nbsp;or&nbsp; x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2: &nbsp;√(19 − 10) = √9 = 3, &nbsp;but&nbsp; x − 5 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ 2 &nbsp;&nbsp;N.A." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 3: &nbsp;√(19 − 15) = √4 = 2, &nbsp;but&nbsp; x − 5 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 3 &nbsp;&nbsp;N.A. &nbsp;&nbsp;Both fail &nbsp;∴&nbsp; the equation has <b>no solution</b>." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “no solution” is a real, complete, full-mark answer here — it is not a sign that you went wrong. What you must NOT do is hand in &nbsp;x = 2 or x = 3&nbsp; because the algebra produced them. Those two are what the SQUARED equation says; the original equation says neither of them works.",
        } },
      ],
      esplain: {
        en: "Look at the two sides before you start. The left is a square root, so it is never negative. The right is x minus five, which is negative for every x below five. So the only x that could possibly work has to be at least five — and the squaring produces two answers, two and three, both well under five. Neither can be right, and the tests confirm it: each time the root gives a positive number and the other side gives its negative. So both are marked N.A. and the equation has no solution. This is the case that teaches what the check is really for. Without it you would hand in two answers that the original equation flatly rejects.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — ISOLATE THE √ FIRST (A15 step 1).
   √(x + 5) + x = 7 → √(x + 5) = 7 − x → x² − 15x + 44 = 0
   → x = 4 (keep) or x = 11 (N.A.)
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.se.q4",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-that-must-be-isolated-before-squaring",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(x + 5) + x = 7",
      },
      hint: {
        en: "Do not square yet. Nothing may sit beside the root when you square — get the √ completely on its own first, then square.",
      },
      memo: [
        { type: "step", text: { en: "Isolate the √ first — nothing may be standing next to it when you square:" } },
        { type: "step", text: { en: "√(x + 5) = 7 − x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "square both sides: &nbsp;&nbsp;x + 5 = (7 − x)² = 49 − 14x + x²" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = x² − 15x + 44 = (x − 4)(x − 11) &nbsp;&nbsp;∴&nbsp; x = 4 &nbsp;or&nbsp; x = 11" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 4: &nbsp;√9 + 4 = 3 + 4 = 7 — it works." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 11: &nbsp;√16 + 11 = 4 + 11 = 15, &nbsp;and&nbsp; 15 ≠ 7 &nbsp;&nbsp;∴&nbsp; x ≠ 11 &nbsp;&nbsp;N.A. &nbsp;&nbsp;∴&nbsp; x = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(√(x + 5) + x)²&nbsp; is NOT &nbsp;(x + 5) + x². Squaring a SUM always produces a middle term, and squaring here without isolating first leaves you with a root still in the equation and a bigger mess than you started with. Isolate, then square.",
        } },
      ],
      esplain: {
        en: "The reason for isolating first is simple: squaring only cleans up a root when the root is the whole of that side. If the x is still sitting next to it, squaring gives you the square of a sum, which has three terms and still contains a root in the middle. So move the x across first. After that it is the usual routine — square, mind the middle term of seven minus x squared, collect everything into a quadratic, factorise, and test both answers in the equation you were given. Eleven is the invented one: it makes the left-hand side fifteen instead of seven, which happened because seven minus eleven is negative and squaring hid that. Four passes and is the answer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A QUADRATIC IN √x (her k-method leads; isolate-and-square
   rides under OR — METHODS-algebra Flag F5, her ruling 2026-08-21).
   2x − 5√x − 3 = 0 → 2K² − 5K − 3 = 0 → K = 3 (x = 9) or K = −1/2 (out)
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.se.q5",
  chapter: CH,
  topic: "surd-equations",
  archetype: "quadratic-in-root-x-with-an-impossible-k-branch",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;2x − 5√x − 3 = 0",
      },
      hint: {
        en: "Look at the shape rather than the letters: there is an x, a √x and a number. What do you get when you square √x? Give that thing a short name and the equation turns into one you have solved a hundred times.",
      },
      memo: [
        { type: "step", text: { en: "An x, a √x and a number — that is a quadratic in disguise, because (√x)² = x." } },
        { type: "step", text: { en: "let K = √x &nbsp;&nbsp;(then K² = x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2K² − 5K − 3 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(2K + 1)(K − 3) = 0 &nbsp;&nbsp;∴&nbsp; K = −1/2 &nbsp;or&nbsp; K = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "K = 3: &nbsp;√x = 3 &nbsp;&nbsp;∴&nbsp; x = 9" }, ticks: ["a"] },
        { type: "answer", text: { en: "K = −1/2: &nbsp;√x = −1/2 &nbsp;is impossible — a square root of a real number is never negative &nbsp;∴&nbsp; no solution from that branch" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — isolate and square (same marks): &nbsp;2x − 3 = 5√x &nbsp;⟹&nbsp; (2x − 3)² = (5√x)² &nbsp;⟹&nbsp; 4x² − 12x + 9 = 25x &nbsp;⟹&nbsp; 4x² − 37x + 9 = 0 &nbsp;⟹&nbsp; (4x − 1)(x − 9) = 0 &nbsp;⟹&nbsp; x = 1/4 or x = 9. Squaring can invent a root, so test both in the original: &nbsp;x = 1/4 gives 2(1/4) − 5(1/2) − 3 = −5, not 0 &nbsp;⟹&nbsp; N.A.; &nbsp;x = 9 gives 18 − 15 − 3 = 0 &nbsp;⟹&nbsp; keep." } },
        { type: "trap", text: {
          en: "REMEMBER: K is not the answer. You were asked for x, so every branch has to be walked back through &nbsp;√x = K. That walk back is where the second branch dies — and it dies with the words “<b>no solution</b>”, not “undefined” (that is for dividing by zero) and not “non-real” (that is for an even root of a negative).",
        } },
      ],
      esplain: {
        en: "The k-method works here because root x squared is just x, so the two x-shaped things in the equation are really one thing and its square. Call root x by the short name K and what is left is an ordinary trinomial you can factorise. Then comes the part that costs marks: K is not what the question asked for. Each K has to be turned back into an x through root x equals K. Three works and gives nine. Negative a half does not, because a square root never comes out negative, so that branch simply has no answer. Her other road — moving the root across and squaring — is equally correct and equally marked; it invents a fake root along the way, so it must finish with both answers tested.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — RESTRICTION UP FRONT, THEN "HENCE".
   (a) √(3x + 12) real ⟺ x ≥ −4
   (b) √(3x + 12) = x − 2 → x² − 7x − 8 = 0 → x = 8 (keep),
       x = −1 (obeys the restriction and STILL fails the check)
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.se.q6",
  chapter: CH,
  topic: "surd-equations",
  archetype: "restriction-first-then-a-root-that-obeys-it-but-still-fails",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;√(3x + 12)&nbsp; real?<br>Give your answer in the form &nbsp;x ≥ …",
      },
      hint: {
        en: "An even root of a negative number is non-real. So whatever is sitting under that root sign is not allowed to be negative — write that down as an inequality and solve it.",
      },
      memo: [
        { type: "step", text: { en: "A square root is only real when what is under it is not negative:" } },
        { type: "step", text: { en: "3x + 12 ≥ 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "3x ≥ −12 &nbsp;&nbsp;∴&nbsp; x ≥ −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: it is &nbsp;≥ 0, not &nbsp;&gt; 0. Zero is allowed under a root — √0 is 0, which is perfectly real. Only a NEGATIVE is out of bounds.",
        } },
      ],
      esplain: {
        en: "Nothing real, multiplied by itself, gives a negative answer, so a square root of a negative number does not exist among the numbers we work with — she calls that non-real. That means the expression under the root sign has to be zero or more, and writing that down gives an ordinary linear inequality. Solve it exactly like an equation: take the twelve across and divide by three. Since three is positive the inequality sign does not flip; it would only flip if you multiplied or divided by a negative. The answer, x is greater than or equal to negative four, describes every x for which this expression is even allowed to exist.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence solve for x: &nbsp;√(3x + 12) = x − 2",
      },
      hint: {
        en: "Square and solve as usual. When you test your two answers, check each one against BOTH things: the restriction from (a), and whether it really makes the two sides equal.",
      },
      memo: [
        { type: "step", text: { en: "Square both sides: &nbsp;&nbsp;3x + 12 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 7x − 8 = (x − 8)(x + 1) &nbsp;&nbsp;∴&nbsp; x = 8 &nbsp;or&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 8: &nbsp;8 ≥ −4, and &nbsp;√(24 + 12) = √36 = 6 &nbsp;while&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6 &nbsp;&nbsp;∴&nbsp; x = 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = −1: &nbsp;−1 ≥ −4, so it obeys (a) — but &nbsp;√(−3 + 12) = √9 = 3 &nbsp;while&nbsp; x − 2 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ −1 &nbsp;&nbsp;N.A." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: obeying the restriction is NOT the same as being a solution. The restriction from (a) only says the root exists at that x; it says nothing about whether the two sides are equal there. &nbsp;x = −1&nbsp; passes the first test and fails the second — which is exactly why the substitution check can never be skipped.",
        } },
      ],
      esplain: {
        en: "Part (a) told you where the left-hand side even exists: from negative four upwards. That is useful, but it is only half the story, because the right-hand side has its own demand. A square root is never negative, so x minus two has to be zero or more, meaning x must be at least two. Negative one clears the first hurdle and trips over the second. Eight clears both. This is worth noticing because a lot of learners treat the restriction as the check and stop there. The restriction rules out the impossible; the substitution test is what proves an answer is genuine. On this question you need both, and both carry marks.",
      },
    },
  ],
};

export const eqnSurdEquationsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
