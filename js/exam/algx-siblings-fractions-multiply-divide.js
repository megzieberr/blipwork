/* ============================================================
   EXAM FOCUS — Algebraic Expressions · SIBLING CARDS for the tile
   "fractions-multiply-divide" (Algebraic fractions: × and ÷).
   (EXAM-BUILD-DAY.md, 2026-08-23, wave 1, session A.)
   ------------------------------------------------------------
   SIX cards, easiest first, levels 1 → 3. No level-4 part anywhere.

   WHAT THE SIX COVER (the brief's list):
     q1  simplify ONE fraction by factorising top and bottom
     q2  the same, with a common factor on top and a trinomial below
     q3  MULTIPLY two fractions
     q4  DIVIDE by a fraction — her KFC
     q5  the (a − b) = −(b − a) twist
     q6  a divide that needs the twist as well

   EVERY CARD ASKS FOR THE RESTRICTIONS FIRST. That is not decoration:
   her marking cue (METHODS-algebra.md Part B2 and Part C) is that the
   `limits` line — the `x ≠ …` — is written BEFORE anything is
   cancelled, because once a factor has been cancelled away the value
   that broke it is invisible and the mark is gone. So on every card
   here part (a) is the restriction and part (b) is the simplification,
   in that order.

   HER WORDS, used deliberately (METHODS-algebra.md):
     · **undefined** — her word for a denominator equal to zero, and
       the right one of her four "no answer" words here (Part 0.3);
     · **caged** — inside brackets, and therefore safe to cancel
       (Part A3). A `+` or `−` may only be cancelled once it is caged;
     · **KFC** — Keep, Flip, Change, her name for dividing by a
       fraction (Part A6);
     · **limits** — her English word for the restrictions.

   The METHOD itself is the ordinary CAPS Grade 10 one — the SAG's
   Grade 10 Term 1 item 6, "simplification of algebraic fractions using
   factorisation". Every number is fresh.

   NO DIAGRAMS. lostQuest is the documented exam-only placeholder (see
   js/exam/algx-siblings-expand.js's header for the mechanism).
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

/* A pre-built stacked fraction — fracHtml (js/ui.js) leaves an existing
   .sfrac alone, which is what keeps a two-bracket numerator whole over
   the bar instead of only its last bracket. */
const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — SIMPLIFY ONE FRACTION.  (x² − 25)/(x + 5) = x − 5,  x ≠ −5
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.sib.fmd.q1",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-simplify-a-single-algebraic-fraction-with-restrictions",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: `Consider the expression &nbsp;${sf("x² − 25", "x + 5")}<br><br>Write down the value of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "A fraction is undefined when its bottom is zero — nothing else can break it. So put the denominator equal to zero and solve.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is <b>undefined</b> when the denominator is zero, so set &nbsp;x + 5 = 0." } },
        { type: "answer", text: { en: "∴&nbsp; x = −5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Dividing by zero is the one thing arithmetic will not do, so any value of x that makes the bottom of a fraction zero has to be thrown out. That is what undefined means — it is not that the answer is big or small, it is that there is no answer at all. Finding it is quick: take the denominator on its own, put it equal to zero, and solve. Here x plus five is zero when x is minus five. Notice you look only at the bottom. It does not matter what the top does at x equals minus five; a zero on top is perfectly fine and just makes the fraction zero.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "Factorise the top first. Then look for a bracket that appears on the top and on the bottom — that is the only kind of thing you are allowed to cancel.",
      },
      memo: [
        { type: "step", text: { en: `Factorise the top — it is a difference of two squares: &nbsp;= ${sf("(x − 5)(x + 5)", "x + 5")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: "The bracket (x + 5) cancels &nbsp;∴&nbsp; x − 5&nbsp;&nbsp;&nbsp;(x ≠ −5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: you may only cancel FACTORS, never terms. In x² − 25 over x + 5 you cannot cross out the x with the x, or the 25 with the 5 — the + and − must be <b>caged</b> inside brackets first, and that is exactly what factorising does.",
        } },
      ],
      esplain: {
        en: "Cancelling is really just dividing top and bottom by the same thing, and you can only divide by something that is multiplying — never by something that is being added or subtracted. That is why factorising comes first: it turns a sum into a product, and only then is cancelling legal. Once the top is written as x minus five times x plus five, the bracket x plus five is sitting on both floors, so it divides out and leaves a 1. What is left is x minus five. Keep the restriction with the answer if there is room; the simplified form works at x equals minus five but the original one never did, so they are not quite the same expression.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — COMMON FACTOR ON TOP, TRINOMIAL BELOW.
   (2x + 6)/(x² + 5x + 6) = 2/(x + 2),  x ≠ −2, x ≠ −3
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.sib.fmd.q2",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-simplify-fraction-common-factor-over-trinomial",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `Consider the expression &nbsp;${sf("2x + 6", "x² + 5x + 6")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Factorise the denominator first — a trinomial with two brackets can be zero in two different ways, so expect two answers.",
      },
      memo: [
        { type: "step", text: { en: "Factorise the denominator: &nbsp;x² + 5x + 6 = (x + 2)(x + 3)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "A product is zero when either bracket is zero &nbsp;∴&nbsp; x = −2&nbsp; or&nbsp; x = −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: two brackets means two forbidden values. Writing only one of them is half an answer — and both of them still count even though one of the brackets is about to cancel away.",
        } },
      ],
      esplain: {
        en: "You cannot read the forbidden values off a trinomial by looking at it, so the first job is always to factorise the bottom. Two numbers with product six and sum five are two and three, so the denominator is x plus two times x plus three. Now the question is simple: when is a product zero? Whenever any one of its factors is zero. So the fraction breaks at x equals minus two and again at x equals minus three, and both must be written down. Do this before you simplify anything, because in a moment the x plus three bracket is going to cancel and disappear — but the value that broke it is still forbidden in the original expression.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "The top has a common factor waiting to come out. Once both floors are written as products, look for a matching bracket.",
      },
      memo: [
        { type: "step", text: { en: `Take out the common factor on top: &nbsp;= ${sf("2(x + 3)", "(x + 2)(x + 3)")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `The bracket (x + 3) cancels &nbsp;∴&nbsp; ${sf("2", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2, x ≠ −3)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: when the whole top cancels away you are left with the 2, not with nothing. A cancelled factor leaves a 1 behind, so 2(x + 3) over (x + 2)(x + 3) becomes 2 over (x + 2) — never just 1 over (x + 2).",
        } },
      ],
      esplain: {
        en: "Factorise both floors before you touch anything. On top, 2 divides into both terms, leaving x plus three. On the bottom you already have x plus two times x plus three. The bracket x plus three now appears on both floors, so it divides out. What people lose here is the 2. Cancelling x plus three does not remove the 2 — it was multiplying, so it stays. Think of six over nine: cancelling the three leaves two over three, not one over three. The same logic holds with brackets. If you are ever unsure, put an easy number in, like x equals one, and check the original and your answer give the same value.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — MULTIPLY TWO FRACTIONS.
   (x² − 4)/(3x + 9) × (x² + 6x + 9)/(x² + 2x) = ((x − 2)(x + 3))/(3x)
   restrictions x ≠ −3, x ≠ 0, x ≠ −2
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.sib.fmd.q3",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-multiply-two-algebraic-fractions",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Consider the expression &nbsp;${sf("x² − 4", "3x + 9")} &nbsp;×&nbsp; ${sf("x² + 6x + 9", "x² + 2x")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Both bottoms count, not just the second one. Factorise each denominator and set every bracket equal to zero.",
      },
      memo: [
        { type: "step", text: { en: "Factorise BOTH denominators: &nbsp;3x + 9 = 3(x + 3)&nbsp; and&nbsp; x² + 2x = x(x + 2)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = −3, &nbsp;x = 0&nbsp; and&nbsp; x = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: x(x + 2) gives TWO forbidden values, not one. A lone x on the bottom is a factor like any other, so x = 0 is just as forbidden as x = −2.",
        } },
      ],
      esplain: {
        en: "When two fractions are multiplied, both of them have to exist before you can start, so every denominator in sight is a source of forbidden values. Factorise them one at a time. Three x plus nine has a common factor of three, leaving x plus three, so x cannot be minus three. The 3 itself is a plain number and can never be zero, so it contributes nothing. The second denominator, x squared plus two x, has a common factor of x, leaving x plus two, so x cannot be zero and cannot be minus two. Three forbidden values altogether, and all three belong to the original expression, before any cancelling.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "Factorise every top and every bottom first — four factorisations in all — and only then start cancelling. Anything on any top may cancel with anything on any bottom.",
      },
      memo: [
        { type: "step", text: { en: `Factorise everything first: &nbsp;= ${sf("(x − 2)(x + 2)", "3(x + 3)")} &nbsp;×&nbsp; ${sf("(x + 3)(x + 3)", "x(x + 2)")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now cancel across the whole product: &nbsp;the (x + 2) on the first top goes with the (x + 2) on the second bottom, and ONE of the (x + 3) brackets on the second top goes with the (x + 3) on the first bottom." }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("(x − 2)(x + 3)", "3x")}&nbsp;&nbsp;&nbsp;(x ≠ −3, x ≠ 0, x ≠ −2)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: when you multiply, everything on the top is multiplying everything on the top. So a bracket on the FIRST top may cancel with a bracket on the SECOND bottom — you are not stuck cancelling inside one fraction.",
        } },
      ],
      esplain: {
        en: "Multiplying fractions is the friendly operation: tops go with tops, bottoms go with bottoms, and nothing has to match up first. So the real work is factorising all four expressions, and then the cancelling is just crossing off pairs. Because it is all one big product, a bracket on the first top is free to cancel with a bracket on the second bottom. Notice that x plus three appears twice on the second top, so only one of them cancels and one survives into the answer. What is left is x minus two times x plus three on top and three x on the bottom, and there is nothing common between those, so it is finished.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — DIVIDE BY A FRACTION (her KFC).
   (x² − 16)/(x² − x − 6) ÷ (x + 4)/(x − 3) = (x − 4)/(x + 2)
   restrictions x ≠ 3, x ≠ −2, x ≠ −4
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.sib.fmd.q4",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-divide-by-an-algebraic-fraction-keep-flip-change",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Consider the expression &nbsp;${sf("x² − 16", "x² − x − 6")} &nbsp;÷&nbsp; ${sf("x + 4", "x − 3")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Two bottoms to check, and one extra thing: you are dividing by the second fraction, so that fraction itself may not be zero either.",
      },
      memo: [
        { type: "step", text: { en: "Denominators: &nbsp;x² − x − 6 = (x − 3)(x + 2) &nbsp;⟹&nbsp; x = 3&nbsp; or&nbsp; x = −2; &nbsp;and&nbsp; x − 3 = 0 &nbsp;⟹&nbsp; x = 3 again." }, ticks: ["ca"] },
        { type: "answer", text: { en: "You may not divide BY zero either, so x + 4 ≠ 0 &nbsp;∴&nbsp; x = 3, &nbsp;x = −2&nbsp; and&nbsp; x = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for the hidden one. In a division, the NUMERATOR of the second fraction also lands on a bottom the moment you flip it — so x + 4 = 0 is forbidden too, even though x + 4 starts life on a top.",
        } },
      ],
      esplain: {
        en: "Division questions hide an extra forbidden value and examiners love it. Start with the obvious two: the first fraction's denominator factorises into x minus three times x plus two, so three and minus two are out; and the second fraction's denominator is x minus three, which repeats one you already have. Now the sneaky one. Dividing by something means multiplying by its upside-down version, so x plus four is about to move to the bottom. Anything that is going to sit on a bottom must not be zero, so minus four is forbidden as well. Say it as a rule: in a division, check the divisor's top too.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "Dividing by a fraction is KFC — Keep the first one, Flip the second one, Change the ÷ to a ×. Do that before you factorise anything, then treat it as an ordinary multiplication.",
      },
      memo: [
        { type: "step", text: { en: `<b>KFC</b> — Keep, Flip, Change: &nbsp;= ${sf("x² − 16", "x² − x − 6")} &nbsp;×&nbsp; ${sf("x − 3", "x + 4")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: `Factorise: &nbsp;= ${sf("(x − 4)(x + 4)", "(x − 3)(x + 2)")} &nbsp;×&nbsp; ${sf("x − 3", "x + 4")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `(x + 4) and (x − 3) both cancel &nbsp;∴&nbsp; ${sf("x − 4", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ 3, x ≠ −2, x ≠ −4)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: flip the SECOND fraction only. Flipping both, or flipping the first one, changes the value completely — and never start cancelling while the ÷ is still there, because cancelling across a division sign is not allowed.",
        } },
      ],
      esplain: {
        en: "There is only one new idea in dividing fractions and it has a name: KFC. Keep the first fraction exactly as it is, Flip the second one upside down, and Change the divide sign into a multiply. After that you are doing the multiplication question you already know. Do the flip before you factorise, so you never have to think about a division sign again — and never cancel while the divide sign is still on the page, because top and bottom mean different things on the two sides of it. Once flipped, factorise all four expressions, cross off the matching brackets, and read off what is left.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE (a − b) = −(b − a) TWIST.
   (3 − x)/(x² − 9) = −1/(x + 3),  x ≠ 3, x ≠ −3
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.sib.fmd.q5",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-simplify-with-a-reversed-bracket-in-the-numerator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `Consider the expression &nbsp;${sf("3 − x", "x² − 9")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Only the bottom decides. It is a difference of two squares, so it has two brackets and therefore two forbidden values.",
      },
      memo: [
        { type: "step", text: { en: "x² − 9 = (x − 3)(x + 3)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 3&nbsp; or&nbsp; x = −3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The top of a fraction is allowed to be zero, so ignore it completely when you are hunting for forbidden values — look only at the bottom. Here the bottom is a difference of two squares, which factorises into x minus three times x plus three, and a product is zero the moment either factor is zero. So three and minus three are both out. It is worth noticing that the top happens to be zero at x equals three as well. That does not rescue anything: zero divided by zero is still undefined, and three stays forbidden.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "Look at the top and at the first bracket on the bottom. They hold the same two things in the opposite order — and turning a bracket round costs exactly one minus sign.",
      },
      memo: [
        { type: "step", text: { en: `Factorise the bottom: &nbsp;= ${sf("3 − x", "(x − 3)(x + 3)")}` } },
        { type: "step", text: { en: "The top is the reverse of (x − 3), and reversing a bracket costs a minus: &nbsp;3 − x = −(x − 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: `= ${sf("−(x − 3)", "(x − 3)(x + 3)")}&nbsp;&nbsp; and now (x − 3) cancels` }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; ${sf("−1", "x + 3")}&nbsp;&nbsp;&nbsp;(x ≠ 3, x ≠ −3)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: cancelling (3 − x) against (x − 3) as though they were the same gives +1 over (x + 3) — the right shape with the wrong sign, and no marks. They are opposites, so cancelling them leaves −1, not 1.",
        } },
      ],
      esplain: {
        en: "Two brackets holding the same letters in the opposite order are not equal, but they are only a minus apart. Test it: at x equals ten, three minus x is minus seven and x minus three is plus seven. So you may swap either one for minus the other, and doing that is what makes the cancelling legal here. Rewrite three minus x as minus the bracket x minus three, and now that bracket appears on both floors and divides out — leaving the minus sign behind, because the minus was never part of the bracket. That stray minus is the whole question. An answer of one over x plus three is the same size but the wrong sign.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — A DIVIDE THAT ALSO NEEDS THE TWIST.
   (2x² − 8)/(x² + x − 6) ÷ (4 − 2x)/(x + 3) = −(x + 2)/(x − 2)
   restrictions x ≠ −3, x ≠ 2
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.sib.fmd.q6",
  chapter: CH,
  topic: "fractions-multiply-divide",
  archetype: "gr10-divide-with-a-reversed-bracket-and-a-common-factor",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Consider the expression &nbsp;${sf("2x² − 8", "x² + x − 6")} &nbsp;÷&nbsp; ${sf("4 − 2x", "x + 3")}<br><br>Write down the values of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Check both denominators, and then remember the divide sign: the top of the second fraction is about to become a bottom, so it may not be zero either.",
      },
      memo: [
        { type: "step", text: { en: "Denominators: &nbsp;x² + x − 6 = (x + 3)(x − 2) &nbsp;⟹&nbsp; x = −3&nbsp; or&nbsp; x = 2; &nbsp;and&nbsp; x + 3 = 0 &nbsp;⟹&nbsp; x = −3 again." }, ticks: ["ca"] },
        { type: "answer", text: { en: "Dividing by zero is not allowed either, so 4 − 2x ≠ 0 &nbsp;⟹&nbsp; x ≠ 2 &nbsp;∴&nbsp; x = −3&nbsp; or&nbsp; x = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Three separate places can break this expression and two of them land on the same value, which is why the final list is short. The first fraction's bottom factorises into x plus three times x minus two, so minus three and two are out. The second fraction's bottom is x plus three, which repeats minus three. Then the divisor check: four minus two x must not be zero, and it is zero at x equals two, which repeats the other one. So the answer is just minus three and two — but you have to look at all three places to know that nothing new turned up.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify the expression.",
      },
      hint: {
        en: "KFC first, then factorise everything — including a common factor out of 4 − 2x. One of the brackets you get will be back to front, and turning it round costs a minus.",
      },
      memo: [
        { type: "step", text: { en: `<b>KFC</b> — Keep, Flip, Change: &nbsp;= ${sf("2x² − 8", "x² + x − 6")} &nbsp;×&nbsp; ${sf("x + 3", "4 − 2x")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: `Factorise everything: &nbsp;2x² − 8 = 2(x − 2)(x + 2), &nbsp;x² + x − 6 = (x + 3)(x − 2), &nbsp;4 − 2x = 2(2 − x)` }, ticks: ["ca"] },
        { type: "step", text: { en: `(2 − x) is the reverse of (x − 2), so &nbsp;2(2 − x) = −2(x − 2), &nbsp;giving &nbsp;${sf("2(x − 2)(x + 2)", "(x + 3)(x − 2)")} &nbsp;×&nbsp; ${sf("x + 3", "−2(x − 2)")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: `The 2s cancel, both (x + 3) cancel, and two of the three (x − 2) cancel &nbsp;∴&nbsp; ${sf("−(x + 2)", "x − 2")}&nbsp;&nbsp;&nbsp;(x ≠ −3, x ≠ 2)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: take the 2 out of 4 − 2x BEFORE you turn the bracket round, otherwise the minus and the 2 get tangled. And there are three (x − 2) brackets in play — two on top and one on the bottom — so one of them survives into the answer.",
        } },
      ],
      esplain: {
        en: "This is every idea on the tile in one question, so do them strictly in order and it stays calm. First KFC: keep, flip, change, so the divide becomes a multiply. Second, factorise every single top and bottom, including taking the 2 out of four minus two x. Third, deal with the back-to-front bracket: two minus x is minus the bracket x minus two, and that minus now belongs to the whole expression. Fourth, cancel. The x plus three brackets go, and two of the three x minus two brackets go, leaving one on the bottom. The 2 on top cancels with the 2 on the bottom. What survives is minus x plus two over x minus two.",
      },
    },
  ],
};

export const algxFractionsMultiplyDivideSiblingQuestions = [q1, q2, q3, q4, q5, q6];
