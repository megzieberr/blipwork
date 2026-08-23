/* ============================================================
   EXAM FOCUS — Algebraic Expressions · SIBLING CARDS for the tile
   "factorise-basics" (Factorise: common factor, squares, trinomials).
   (EXAM-BUILD-DAY.md, 2026-08-23, wave 1, session A.)
   ------------------------------------------------------------
   SIX cards, easiest first, levels 1 → 3. No level-4 part anywhere —
   the ★ questions live on the chapter's `level-4` tile.

   WHAT THE SIX COVER (the brief's list):
     q1  common factor, including a NEGATIVE common factor
     q2  difference of two squares, including 4x² − 9y²
     q3  a common BRACKET, including the (3 − y) = −(y − 3) flip
     q4  trinomials with a = 1, and one that needs a common factor
         taken out FIRST
     q5  difference of two squares where the “squares” are brackets —
         the (x + 1)² − 4 shape
     q6  trinomials with a ≠ 1 — the textbook split-the-middle-term
         method, with the trial-and-error route shown under OR

   METHOD. Her own notes (METHODS-algebra.md) do not cover Grade 10
   factorising — its Part E says so — so the method here is the
   ordinary CAPS Grade 10 textbook one, written to her house rules from
   Part 0 of that file (the ∴ habit, real minus, decimal comma, marks
   for the written steps) and her Part C marking cue that where two
   routes exist BOTH are shown, side by side under OR, with neither
   called wrong. Every number is fresh.

   ARCHETYPES from Desktop\Eksamen Vraestelle\Gr11 IEB Nov —
   GR11-IEB-PAPER-BANK.md and survey\SURVEY-Her-2025-Assessments.md.
   The SAG's own Grade 10 Term 1 list (Appendix H, curriculum
   statement 5) is the coverage checklist: Grade 9 types, trinomials,
   grouping in pairs, sum and difference of two cubes. The last two
   live on the `factorise-advanced` tile.

   NO DIAGRAMS. lostQuest is the documented exam-only placeholder —
   algx owns no drill rounds, so no "I'm lost" button ever renders
   (see js/exam/algx-siblings-expand.js's header for the mechanism).
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

/* ---------------------------------------------------------------
   q1 — COMMON FACTOR, one of them negative.
   (a) 12x³y − 18x²y² = 6x²y(2x − 3y)
   (b) −5a² − 20a     = −5a(a + 4)
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.sib.fb.q1",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-highest-common-factor-including-a-negative-common-factor",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>12x³y − 18x²y²",
      },
      hint: {
        en: "Go hunting three times: the biggest number that divides into both, then the most x's both terms have, then the most y's both terms have. Take all three out together.",
      },
      memo: [
        { type: "step", text: { en: "Biggest number into 12 and 18: &nbsp;6. &nbsp;Smallest power of x in both: &nbsp;x². &nbsp;Smallest power of y in both: &nbsp;y. &nbsp;So the highest common factor is <b>6x²y</b>." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 6x²y(2x − 3y)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “fully” means the biggest common factor, not just any common factor. 2x²y(6x − 9y) is not wrong arithmetic, but it is not finished — there is still a 3 sitting inside the bracket.",
        } },
      ],
      esplain: {
        en: "Taking out a common factor is just undoing the distributive law, so the check is easy: multiply your answer back out and you must land exactly where you started. Hunt for the factor in three separate passes so nothing gets missed. First the numbers — the biggest one that divides into both 12 and 18 is 6. Then the x's — one term has three, the other has two, so two is all they share. Then the y's — one has one, the other has two, so one is all they share. Whatever is left of each term goes inside the bracket. If the bracket still has something in common when you look at it again, you did not take out enough.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "−5a² − 20a",
      },
      hint: {
        en: "Both terms are negative, so take the minus out with the rest of the factor. Then check every sign inside the bracket — they all change.",
      },
      memo: [
        { type: "step", text: { en: "Both terms are negative, so take out &nbsp;−5a&nbsp; and let the signs inside flip." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; −5a(a + 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: −20a divided by −5a is +4, not −4. When the minus comes out, every sign inside the bracket swaps. Multiply back to check: −5a × a = −5a² and −5a × 4 = −20a. Correct.",
        } },
      ],
      esplain: {
        en: "You are allowed to take out a negative common factor, and here it is the tidier choice because it leaves the a² with a plus in front of it, which makes everything afterwards easier to read. The rule to hold on to is that dividing a negative by a negative gives a positive. So −5a² divided by −5a is +a, and −20a divided by −5a is +4. Both signs inside the bracket end up positive even though both terms started negative. Whenever a sign flip makes you nervous, do the one-line check: multiply your answer back out. It takes five seconds and it settles the question completely.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — DIFFERENCE OF TWO SQUARES.
   (a) 4x² − 9y² = (2x − 3y)(2x + 3y)
   (b) 1 − 64t²  = (1 − 8t)(1 + 8t)
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.sib.fb.q2",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-difference-of-two-squares-two-variables",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>4x² − 9y²",
      },
      hint: {
        en: "Two terms, both perfect squares, with a minus between them. Ask what squares to give 4x², and what squares to give 9y².",
      },
      memo: [
        { type: "step", text: { en: "Both terms are perfect squares with a minus between them: &nbsp;4x² = (2x)²&nbsp; and&nbsp; 9y² = (3y)². &nbsp;So &nbsp;a² − b² = (a − b)(a + b)." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (2x − 3y)(2x + 3y)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: it only works with a MINUS between the two squares. 4x² + 9y² does not factorise at all in Grade 10 — a sum of two squares has no brackets to find.",
        } },
      ],
      esplain: {
        en: "This is the fastest factorising there is, and it is worth training your eye to spot it. Three things have to be true: exactly two terms, both of them perfect squares, and a minus sign between them. If all three hold, write down two brackets that are twins except for the middle sign, and inside them put whatever squares to give each term. Here the square root of 4x² is 2x, because 2 times 2 is 4 and x times x is x². The square root of 9y² is 3y for the same reason. Watch that you take the root of the whole term including the number, not just of the letter — a very common half-mark loss.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "1 − 64t²",
      },
      hint: {
        en: "One is a perfect square too — it is one squared. Keep the terms in the order they are written so the signs land where they belong.",
      },
      memo: [
        { type: "step", text: { en: "1 = 1²&nbsp; and&nbsp; 64t² = (8t)², &nbsp;so this is again &nbsp;a² − b²&nbsp; with a = 1 and b = 8t." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (1 − 8t)(1 + 8t)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A plain 1 counts as a perfect square, because 1 times 1 is 1 — and so do 4, 9, 16, 25 and every other square number. That is the only trick here. Once you have named the two squares as 1 and 8t, the brackets write themselves. Keep them in the order the question gave you: 1 first, 8t second. You may also write it as (1 + 8t)(1 − 8t), because multiplying is the same either way round, and a marker will accept both. What you may not do is turn it into (8t − 1)(8t + 1) — that would be the negative of the right answer, since it expands to 64t² − 1 instead.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A COMMON BRACKET, with the (3 − y) = −(y − 3) flip.
   (a) 3x(x − 4) + 7(x − 4)  = (x − 4)(3x + 7)
   (b) 2a(y − 3) − 5(3 − y)  = (y − 3)(2a + 5)
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.sib.fb.q3",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-common-bracket-with-a-reversed-twin-bracket",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>3x(x − 4) + 7(x − 4)",
      },
      hint: {
        en: "A whole bracket can be a common factor, exactly like a number or a letter. Cover up (x − 4) with your finger and see what is left standing next to it.",
      },
      memo: [
        { type: "step", text: { en: "Both terms carry the same bracket (x − 4), so the whole bracket comes out as the common factor." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x − 4)(3x + 7)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The word factor does not only mean a number or a letter — it means anything that both terms are being multiplied by. Here both terms are being multiplied by the bracket (x − 4), so that bracket is a common factor and it can be pulled out to the front just like a 6 or an x would be. What is left behind is whatever was standing next to it in each term: 3x from the first, and +7 from the second, and those two go together in the second bracket. If it helps, temporarily call the bracket K. Then the expression reads 3xK + 7K, which is obviously K(3x + 7), and you swap the bracket back in at the end.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "2a(y − 3) − 5(3 − y)",
      },
      hint: {
        en: "The two brackets are back to front versions of each other. Turning one round costs you a minus sign — and there is already a minus outside waiting to absorb it.",
      },
      memo: [
        { type: "step", text: { en: "(3 − y) is the reverse of (y − 3), and reversing a bracket costs a minus: &nbsp;(3 − y) = −(y − 3)." }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2a(y − 3) − 5 · [−(y − 3)] = 2a(y − 3) + 5(y − 3)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (y − 3)(2a + 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: two minuses meet here and make a plus. −5 × −(y − 3) is +5(y − 3), so the second bracket ends up as (2a + 5), not (2a − 5). Check by expanding: (y − 3)(2a + 5) = 2ay − 6a + 5y − 15, which is exactly what you started with.",
        } },
      ],
      esplain: {
        en: "Two brackets that hold the same letters in the opposite order are not the same, but they are only a minus sign apart. Test it with numbers: put y equal to 10 and (y − 3) is 7 while (3 − y) is −7. Same size, opposite sign. So you may rewrite either one as minus the other, and that is what unlocks the question — once both brackets read (y − 3), they are a genuine common factor. The place marks go missing is the sign bookkeeping, because the flip introduces a minus while there is already a minus sitting in front of the 5. Two minuses multiply to a plus. Write that middle line out in full rather than doing it in your head.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — TRINOMIALS WITH a = 1, and one needing a common factor first.
   (a) x² − 7x + 12   = (x − 3)(x − 4)
   (b) 3x² − 12x − 63 = 3(x − 7)(x + 3)
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.sib.fb.q4",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-trinomial-a-equals-one-and-common-factor-first",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>x² − 7x + 12",
      },
      hint: {
        en: "You need two numbers that multiply to give the last number and add to give the middle number. The last number is positive and the middle one is negative — so what must both signs be?",
      },
      memo: [
        { type: "step", text: { en: "Two numbers with a <b>product</b> of +12 and a <b>sum</b> of −7: &nbsp;−3 and −4." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x − 3)(x − 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a positive last term with a negative middle term means BOTH numbers are negative. −3 and −4 multiply to +12 and add to −7; +3 and +4 multiply to +12 but add to +7, which is the wrong middle term.",
        } },
      ],
      esplain: {
        en: "When the x² has nothing in front of it, both brackets start with a plain x, and the only decision left is what two numbers to put in them. Those two numbers have to do two jobs at once: multiply to the last number and add to the middle one. Reading the signs first narrows the search a lot. A positive product means the two numbers have the same sign as each other. A negative sum then tells you that sign is negative. So you are only looking at negative pairs that multiply to twelve: −1 and −12, −2 and −6, −3 and −4. The last pair adds to −7. Always check by expanding the middle term back out.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "3x² − 12x − 63",
      },
      hint: {
        en: "Before you look for two numbers, look at all three terms and ask whether something divides into every one of them. Doing that first turns a nasty trinomial into an easy one.",
      },
      memo: [
        { type: "step", text: { en: "3 divides into all three terms, so take it out FIRST: &nbsp;= 3(x² − 4x − 21)" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now two numbers with a product of −21 and a sum of −4: &nbsp;−7 and +3." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 3(x − 7)(x + 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the 3 does not disappear once it is outside. A final answer of (x − 7)(x + 3) is worth less than half, because it is only a third of the expression you were given.",
        } },
      ],
      esplain: {
        en: "The first move in every factorising question is the same: look for a common factor in all the terms before you do anything clever. Here 3 goes into 3, into 12 and into 63, so out it comes, and what is left inside is a trinomial with a plain x², which you already know how to handle. Skipping this step is not fatal but it makes the work far harder, because you would be hunting for a pair of numbers multiplying to −189. Once the 3 is parked outside, find the pair for the easy trinomial: product −21, sum −4, so −7 and +3. Then write the 3 back in front of your two brackets. It is part of the answer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — DIFFERENCE OF TWO SQUARES WHERE THE SQUARES ARE BRACKETS.
   (a) (x + 1)² − 4          = (x − 1)(x + 3)
   (b) (2a − 3)² − (a + 5)²  = (a − 8)(3a + 2)
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.sib.fb.q5",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-difference-of-two-squares-with-bracketed-terms",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Factorise the following fully.<br><br>(x + 1)² − 4",
      },
      hint: {
        en: "It is still two squares with a minus between them — one of them just happens to be a bracket. Treat the whole bracket as your first term and do not expand anything.",
      },
      memo: [
        { type: "step", text: { en: "Two squares with a minus between: &nbsp;a = (x + 1)&nbsp; and&nbsp; b = 2. &nbsp;So &nbsp;a² − b² = (a − b)(a + b)." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; ((x + 1) − 2)((x + 1) + 2) = (x − 1)(x + 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: tidy each bracket at the end. Leaving the answer as ((x + 1) − 2)((x + 1) + 2) is not fully factorised — “fully” includes simplifying what is inside.",
        } },
      ],
      esplain: {
        en: "You do not have to expand the bracket, and you will lose time and probably a sign if you do. The difference-of-squares shape does not care what the two squared things are — a number, a letter, or a whole bracket. Here the first square is (x + 1) and the second is 2, because 4 is 2 squared. So the answer is the two of them subtracted in one bracket and added in the other. Then, and only then, tidy up: x plus one minus two is x minus one, and x plus one plus two is x plus three. Expanding first would have given x² + 2x − 3, which factorises to the same thing — but the long way round.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "(2a − 3)² − (a + 5)²",
      },
      hint: {
        en: "Both squares are brackets this time. Write the two new brackets first, being very careful with the minus in front of the second one, and only then simplify inside each.",
      },
      memo: [
        { type: "step", text: { en: "Difference of two squares with &nbsp;A = (2a − 3)&nbsp; and&nbsp; B = (a + 5): &nbsp;A² − B² = (A − B)(A + B)." }, ticks: ["s/f"] },
        { type: "step", text: { en: "= [(2a − 3) − (a + 5)] · [(2a − 3) + (a + 5)]" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (a − 8)(3a + 2)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: in the first new bracket the minus reaches the whole of (a + 5), so it becomes 2a − 3 − a − 5 = a − 8. Writing 2a − 3 − a + 5 = a + 2 is the slip this question is built to catch.",
        } },
      ],
      esplain: {
        en: "This looks alarming and is actually the same two-line job as before, provided you keep the brackets whole. Call the first square A and the second one B, write down (A minus B) times (A plus B), and only then put the real brackets back in. The difficult bracket is the subtraction one, because a minus sitting in front of a bracket has to reach every term inside it: minus (a plus 5) is minus a minus 5. Do that carefully and you get a − 8. The addition bracket is easy, since nothing changes sign: 2a plus a is 3a, and minus 3 plus 5 is plus 2. Multiplying both answers back out is a good check if you have time.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — TRINOMIALS WITH a ≠ 1 (split the middle term, trial under OR).
   (a) 6x² − 17x + 5 = (2x − 5)(3x − 1)     [30 → −15 and −2]
   (b) 8x² + 2x − 15 = (2x + 3)(4x − 5)     [−120 → +12 and −10]
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.sib.fb.q6",
  chapter: CH,
  topic: "factorise-basics",
  archetype: "gr10-trinomial-a-not-one-split-the-middle-term",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "Factorise the following fully.<br><br>6x² − 17x + 5",
      },
      hint: {
        en: "Multiply the number in front of x² by the last number. Then find two numbers that multiply to give THAT, and still add to give the middle number — and use them to split the middle term into two.",
      },
      memo: [
        { type: "step", text: { en: "Multiply the first and last numbers: &nbsp;6 × 5 = 30. &nbsp;Now two numbers with a product of +30 and a sum of −17: &nbsp;−15 and −2." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Split the middle term and group in pairs: &nbsp;6x² − 15x − 2x + 5 = 3x(2x − 5) − 1(2x − 5)" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>OR</b> — by trial (same marks). The x² term must come from 2x × 3x or 6x × x, and the +5 from two negatives. Try (2x − 5)(3x − 1) — the middle term is −2x − 15x = −17x. ✔ That is the pair." } },
        { type: "answer", text: { en: "∴&nbsp; (2x − 5)(3x − 1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the −1 in the second group is easy to lose. 6x² − 15x − 2x + 5 groups as 3x(2x − 5) − 1(2x − 5) — writing just −(2x − 5) with nothing in front leaves you with (2x − 5)(3x) and a missing term.",
        } },
      ],
      esplain: {
        en: "When there is a number in front of the x², the two-numbers trick still works, but you have to change what you multiply to. Instead of the last number on its own, use the first number times the last number — here six times five, which is thirty. Then find a pair that multiplies to thirty and adds to the middle number, minus seventeen. Since the product is positive and the sum negative, both are negative: minus fifteen and minus two. Now use them to split the middle term into two pieces, so you have four terms instead of three, and factorise in pairs. The two pairs must leave the SAME bracket behind — if they do not, you split it the wrong way round, so try again.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "8x² + 2x − 15",
      },
      hint: {
        en: "Same method. The number you are aiming at is 8 × (−15), and it is negative — so the two numbers you are hunting have opposite signs, and the bigger one carries the sign of the middle term.",
      },
      memo: [
        { type: "step", text: { en: "8 × (−15) = −120. &nbsp;Two numbers with a product of −120 and a sum of +2: &nbsp;+12 and −10." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Split and group: &nbsp;8x² + 12x − 10x − 15 = 4x(2x + 3) − 5(2x + 3)" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>OR</b> — by trial (same marks). Try (2x + 3)(4x − 5) — the middle term is −10x + 12x = +2x. ✔" } },
        { type: "answer", text: { en: "∴&nbsp; (2x + 3)(4x − 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the order you write the split in does not matter. 8x² − 10x + 12x − 15 groups as 2x(4x − 5) + 3(4x − 5) and gives exactly the same two brackets — so if one grouping looks ugly, swap the two middle terms round and try again.",
        } },
      ],
      esplain: {
        en: "A negative product tells you the two numbers have opposite signs, which halves the hunting. You want a pair multiplying to a hundred and twenty, one plus and one minus, whose difference is two: twelve and ten do it, and since the sum must be positive the bigger one is the positive one. Split the middle term into plus twelve x and minus ten x, then factorise the first two terms and the last two terms separately. The bracket that falls out of both pairs is the one that goes on the outside; whatever is left in front of each pair goes in the other bracket. Both ways of ordering the split give the same answer, so if your two pairs disagree, check your arithmetic rather than the method.",
      },
    },
  ],
};

export const algxFactoriseBasicsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
