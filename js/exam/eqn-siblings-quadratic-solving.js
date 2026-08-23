/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the NEW
   tile "quadratic-solving" ("Solve quadratic equations").
   (EXAM-BUILD-DAY.md, 2026-08-23, the eqn tile map; wave 2, session C2.)
   ------------------------------------------------------------
   SIX cards, born from nothing — the chapter had nine seeded questions
   and not one of them simply SOLVED a quadratic. Every k-question,
   every Δ-question and every fraction equation in this chapter already
   assumes the learner can factorise, use the formula and complete the
   square; this tile is where that assumption gets drilled.

   THE ROUTING TABLE IS THE SPINE (METHODS-algebra.md Part B0, her
   `EQ p41` summary page): for an x² shape — everything to the left = 0,
   then factorise · quadratic formula · complete the square, and her
   ruling rides with it, "complete the square only if asked". So the two
   completing-the-square parts here ASK for it in so many words, and
   nothing else on the tile completes a square that would factorise.

   WHAT THE SIX COVER, and why these six:
     q1  the two plain roads — common factor, then trinomial (B1)
     q2  the bracket that is NOT equal to zero: (2x + 3)(x − 1) = 12,
         which has to be multiplied out and re-collected first (B1,
         her Test 1 Q2 archetype, fresh numbers)
     q3  the quadratic formula to TWO decimals — her B5 rules: always
         write the formula, always show the substitution line, always
         round to 2 decimals — plus the Δ < 0 case and the right words
         for it (B10 / her four "no answer" words, Part 0.3)
     q4  completing the square to SOLVE, a = 1 and then a ≠ 1 (B4,
         including her "an equation adds to BOTH sides" distinction)
     q5  "product = 0" wearing a disguise: (2ˣ − 8)(x² − 5) = 0, where
         one bracket is exponential and the other is a surd (B1's
         mixed-bracket example, fresh)
     q6  the SAG's number-system item — solve, then keep only the
         answers that live in ℚ, then only those in ℕ

   METHOD + VOICE: METHODS-algebra.md throughout — her ∴ habit, real
   minus, decimal comma, "±  only when SOLVING" (Flag F2, ruled), and
   the four no-answer words kept apart (Part 0.3, Flag F1 ruled:
   3ˣ = −1 is "no solution", a negative under an even root is
   "non-real", a zero denominator is "undefined", a failed surd-equation
   root is N.A.). Every number here is fresh.

   NO DIAGRAMS — this tile is pure algebra. lostQuest is eq1 (standard
   form & brackets = 0), eq5 (perfect squares) or eq6 (the formula),
   card by card, per sessions/C2-eqn-new-tiles.md.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";

/* A pre-built stacked fraction, for the shapes fracHtml (js/ui.js)
   cannot reach on its own — the quadratic formula's substitution line
   nests brackets two deep, so it is written stacked here rather than
   left as a slash on the page (verify-exam-fractions.mjs). */
const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — THE TWO PLAIN ROADS (B1).
   (a) 3x² − 12x = 0 → 3x(x − 4) = 0 → x = 0 or x = 4
   (b) x² − 3x − 40 = 0 → (x − 8)(x + 5) = 0 → x = 8 or x = −5
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.qs.q1",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "solve-quadratic-common-factor-then-trinomial",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq1" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;3x² − 12x = 0",
      },
      hint: {
        en: "Everything is already on the left and it already says &nbsp;= 0. Look for what both terms share before you reach for anything cleverer.",
      },
      memo: [
        { type: "step", text: { en: "Both terms have 3x in them, so take 3x out as a common factor:" } },
        { type: "step", text: { en: "3x(x − 4) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 0 &nbsp;&nbsp;or&nbsp;&nbsp; x = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never divide both sides by x to “tidy up”. Dividing by x throws the answer &nbsp;x = 0&nbsp; straight in the bin, and that is half the question gone. Factorise instead — x stays in the working where you can see it.",
        } },
      ],
      esplain: {
        en: "A product is zero only when one of the things being multiplied is zero. That one fact is what every quadratic method is built on, and it is why the first job is always to get everything onto one side with a zero on the other. Here the left side is already there, and both terms share 3x, so pulling 3x out turns the equation into two things multiplied together. Now the fact does its work: either the 3x is zero, which needs x to be zero, or the bracket is zero, which needs x to be 4. Two factors, two answers. The temptation is to cancel the x off both sides because it looks like it is in the way. It is not in the way — it is one of the answers.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;x² − 3x − 40 = 0",
      },
      hint: {
        en: "You need two numbers that MULTIPLY to give −40 and ADD to give −3. Since they multiply to a negative, one of them is negative and the other is positive.",
      },
      memo: [
        { type: "step", text: { en: "Two numbers that multiply to −40 and add to −3: &nbsp;−8 and +5." } },
        { type: "step", text: { en: "(x − 8)(x + 5) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 8 &nbsp;&nbsp;or&nbsp;&nbsp; x = −5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the signs flip on the way out of the brackets. The bracket &nbsp;(x − 8)&nbsp; gives &nbsp;x = 8, and &nbsp;(x + 5)&nbsp; gives &nbsp;x = −5. Copying the signs straight out of the brackets is the single most common slip on this question.",
        } },
      ],
      esplain: {
        en: "Factorising a trinomial is a small guessing game with two rules. The two numbers you are hunting must multiply to give the last number and add to give the middle one. Because the last number here is negative, the two numbers have opposite signs, and because they add to a small negative, the bigger of the two is the negative one. That points straight at negative eight and positive five: they multiply to negative forty and add to negative three. Write the brackets, then set each one equal to zero. The last step is the one that costs marks — each bracket gives the value of x that makes it zero, which is the opposite of the number you can see inside it.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE BRACKET THAT IS NOT ZERO (B1; her Test 1 Q2 archetype,
   fresh numbers).
   (2x + 3)(x − 1) = 12 → 2x² + x − 15 = 0 → (2x − 5)(x + 3) = 0
   → x = 5/2 or x = −3
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.qs.q2",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "product-equals-a-number-so-standard-form-first",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq1" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;(2x + 3)(x − 1) = 12",
      },
      hint: {
        en: "The brackets are already there, but look at the right-hand side before you use them. What number does a “each bracket = …” argument need on the right, and is it there?",
      },
      memo: [
        { type: "step", text: { en: "The right-hand side is 12, not 0, so the brackets tell you nothing yet. Multiply out first:" } },
        { type: "step", text: { en: "2x² − 2x + 3x − 3 = 12" }, ticks: ["ca"] },
        { type: "step", text: { en: "everything to the left, &nbsp;= 0: &nbsp;&nbsp;2x² + x − 15 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(2x − 5)(x + 3) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 5/2 &nbsp;&nbsp;or&nbsp;&nbsp; x = −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(2x + 3)(x − 1) = 12&nbsp; does NOT mean &nbsp;2x + 3 = 12&nbsp; or &nbsp;x − 1 = 12. “Each bracket on its own” only works against ZERO, because zero is the only number with the property that a product can reach it only through one of its factors. 12 can be reached as 3 × 4, or 6 × 2, or a hundred other ways.",
        } },
      ],
      esplain: {
        en: "This question looks finished before it starts, and that is the trap. Brackets multiplied together only hand you the answers when the other side is zero, because zero is special: the only way to multiply two things and land on zero is for one of them to be zero already. Twelve is not special at all. So the brackets have to come apart again. Multiply them out, carry the twelve across so the right-hand side becomes zero, collect the middle terms, and only then factorise the new trinomial. The answers change completely along the way, which is the proof that the shortcut was never allowed. One of them is a fraction, and that is perfectly normal — she writes it as a stacked fraction rather than a decimal.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE QUADRATIC FORMULA (B5), and the Δ < 0 words (Part 0.3).
   (a) 3x² − 7x − 3 = 0 → x = (7 ± √85)/6 ≈ 2,70 or −0,37
   (b) 2x² − 3x + 5 = 0 → √(9 − 40) = √(−31) → non-real, no real solution
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.qs.q3",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "quadratic-formula-to-two-decimals-then-the-non-real-case",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq6" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;3x² − 7x − 3 = 0.<br>Give your answers correct to TWO decimal places.",
      },
      hint: {
        en: "Try to factorise for ten seconds; when nothing multiplies to −9 and adds to −7, stop and reach for the formula. Write the formula down first, then the substitution line — both of them carry marks.",
      },
      memo: [
        { type: "step", text: { en: "The trinomial does not factorise, so use the formula. Write a, b and c under the equation: &nbsp;a = 3, &nbsp;b = −7, &nbsp;c = −3." } },
        { type: "step", text: { en: `x = ${sf("−b ± √(b² − 4ac)", "2a")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: `x = ${sf("−(−7) ± √((−7)² − 4(3)(−3))", "2(3)")} = ${sf("7 ± √85", "6")}` }, ticks: ["s/f"] },
        { type: "answer", text: { en: `x = ${sf("7 + √85", "6")} ≈ 2,70` }, ticks: ["a"] },
        { type: "answer", text: { en: `x = ${sf("7 − √85", "6")} ≈ −0,37` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: every negative goes into the formula inside its own brackets. &nbsp;−(−7)&nbsp; is +7, and &nbsp;(−7)²&nbsp; is +49, but &nbsp;−7²&nbsp; typed into a calculator is −49. And round only at the very end — 2 decimals, with a comma.",
        } },
      ],
      esplain: {
        en: "The formula is the road for a trinomial that refuses to factorise, and it earns its marks on the written lines, not on the answer. So write the formula out even though you know it, then write the substitution line with every negative wearing its own brackets. That habit is what stops the sign errors: minus a minus seven is plus seven, and minus seven all squared is plus forty-nine. Under the root you get eighty-five, which is not a perfect square, so the roots are real and irrational. Keep the exact surd form on the line above, then write the rounded values underneath it — two decimals, with a comma, the way she marks it. Rounding early and then carrying the rounded number onward is where the second answer usually drifts.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;2x² − 3x + 5 = 0",
      },
      hint: {
        en: "Start the formula as usual and look hard at what lands under the root sign before you carry on.",
      },
      memo: [
        { type: "step", text: { en: `a = 2, &nbsp;b = −3, &nbsp;c = 5: &nbsp;&nbsp;x = ${sf("−(−3) ± √((−3)² − 4(2)(5))", "2(2)")} = ${sf("3 ± √(9 − 40)", "4")} = ${sf("3 ± √(−31)", "4")}` }, ticks: ["s/f"] },
        { type: "answer", text: { en: "√(−31) is an even root of a negative number, which is non-real &nbsp;∴&nbsp; the equation has no real solution" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER which word belongs here. A negative under an even root is <b>non-real</b> — you write “no real solution”. <b>Undefined</b> is only ever for a denominator of zero. <b>No solution</b> is for something like &nbsp;3ˣ = −1, where a positive base simply cannot reach a negative value. <b>N.A.</b> is for a surd-equation answer that fails its own check. Four different situations, four different words.",
        } },
      ],
      esplain: {
        en: "Everything under the root sign decides the whole story before you finish the sum. Here it comes to nine minus forty, which is negative thirty one, and no real number multiplied by itself gives a negative. So there is nothing to take the root of, and the equation has no real solution. On a sketch this is the parabola that floats clear of the x-axis and never cuts it, which is exactly what “no real roots” means in a picture. Two things earn the marks: showing the substitution so the marker can see where the negative came from, and naming the situation in the right words. Say non-real, or no real solution. Do not say undefined — that word is reserved for dividing by zero.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — COMPLETING THE SQUARE TO SOLVE (B4). Both parts ASK for it,
   which is what her B0 ruling requires ("only if asked"), and neither
   trinomial factorises (Δ = 76 both times).
   (a) x² + 8x − 3 = 0 → (x + 4)² = 19 → x = −4 ± √19
   (b) 2x² − 10x + 3 = 0 → (x − 5/2)² = 19/4 → x = (5 ± √19)/2
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.qs.q4",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "complete-the-square-to-solve-a-equals-one-then-a-not-one",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq5" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Solve for x by completing the square: &nbsp;x² + 8x − 3 = 0.<br>Leave your answer in surd form.",
      },
      hint: {
        en: "Move the loose number across first so the x-terms are alone. Then work out half of the 8, square it, and add that to BOTH sides — this is an equation, not an expression.",
      },
      memo: [
        { type: "step", text: { en: "Take the constant across: &nbsp;&nbsp;x² + 8x = 3" } },
        { type: "step", text: { en: "b/2 = 8/2 = 4, so add 4² to <b>both</b> sides: &nbsp;&nbsp;x² + 8x + 4² = 3 + 4²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x + 4)² = 19" }, ticks: ["ca"] },
        { type: "step", text: { en: "√((x + 4)²) = ±√19 &nbsp;&nbsp;⟹&nbsp;&nbsp; x + 4 = ±√19" } },
        { type: "answer", text: { en: "∴&nbsp; x = −4 ± √19" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the &nbsp;±&nbsp; is not decoration. Rooting both sides gives two answers, and dropping the minus branch loses one of them. The &nbsp;±&nbsp; belongs on the number side, not on the bracket side.",
        } },
      ],
      esplain: {
        en: "Completing the square is a way of forcing a perfect square to appear. On the left you have x squared plus eight x, and the perfect square that starts like that is x plus four all squared — because half of eight is four. The catch is that x plus four all squared also carries a sixteen you never asked for, so you add sixteen deliberately to make the square real, and because this is an equation you add the same sixteen to the other side to keep it balanced. Now the left is one neat bracket squared and the right is a plain number, so rooting both sides finishes the job. Nineteen is not a perfect square, so the answer stays in surd form with the plus-or-minus kept together on one line.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Solve for x by completing the square: &nbsp;2x² − 10x + 3 = 0.<br>Leave your answer in surd form.",
      },
      hint: {
        en: "The a in front of x² is not 1, and completing the square only works when it is. Divide EVERY term by 2 first — including the 3 — and accept the fraction that appears.",
      },
      memo: [
        { type: "step", text: { en: "a ≠ 1, so divide every term by 2 first:" } },
        { type: "step", text: { en: "x² − 5x + 3/2 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "take the constant across, then b/2 = −5/2, so add (5/2)² = 25/4 to both sides:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − 5x + 25/4 = −3/2 + 25/4 = 19/4" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 5/2)² = 19/4 &nbsp;&nbsp;⟹&nbsp;&nbsp; x − 5/2 = ± √19/2" } },
        { type: "answer", text: { en: "∴&nbsp; x = (5 ± √19)/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT for two things. First, dividing by 2 has to reach the CONSTANT as well — leaving the 3 alone is the classic wreck. Second, an <b>equation</b> gets (b/2)² added to BOTH sides; an <b>expression</b> (one with no &nbsp;=&nbsp; sign) gets it added AND subtracted on the same side, because there is no other side to balance against.",
        } },
      ],
      esplain: {
        en: "Completing the square needs a bare x squared at the front, so the very first move is to divide the whole equation by two. Every term goes, the constant included, and the three becomes three over two. Fractions are not a sign that something went wrong here — they are normal. From there it is the same routine as before: half of negative five is negative five over two, squaring that gives twenty five over four, and adding it to both sides builds the perfect square on the left. On the right, negative three over two plus twenty five over four comes to nineteen over four. Rooting both sides gives root nineteen over two, and adding five over two back leaves the two answers sitting neatly over a single denominator of two.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — "PRODUCT = 0" IN DISGUISE (B1's mixed-bracket example, fresh).
   (2ˣ − 8)(x² − 5) = 0 → x = 3 (same base) or x = ±√5
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.qs.q5",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "zero-product-with-an-exponential-and-a-surd-bracket",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq1" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;(2<sup>x</sup> − 8)(x² − 5) = 0",
      },
      hint: {
        en: "Do not multiply these two brackets together — they are already exactly where you want them. Take one bracket at a time, and notice that the two brackets need two completely different methods.",
      },
      memo: [
        { type: "step", text: { en: "The right-hand side is 0, so a product can only be zero if one of its factors is zero. Take the brackets one at a time:" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2<sup>x</sup> − 8 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; 2<sup>x</sup> = 8 = 2³ &nbsp;&nbsp;— same base, so the exponents must be equal" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 3" }, ticks: ["a"] },
        { type: "step", text: { en: "x² − 5 = 0 &nbsp;&nbsp;⟹&nbsp;&nbsp; x² = 5" } },
        { type: "answer", text: { en: "∴&nbsp; x = ±√5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;x² = 5&nbsp; has TWO answers, because you are SOLVING — both √5 and −√5 square to 5. (When you are only SIMPLIFYING, √25 is just 5, with no ±. The ± comes from the equation having two solutions, never from the root sign itself.)",
        } },
      ],
      esplain: {
        en: "A question like this rewards reading the shape before doing anything. Two brackets multiplied together, and a zero on the right: that is the friendliest form a question ever arrives in, so leave the brackets exactly as they are. Then treat each one as its own little equation. The first is exponential, so write eight as two cubed; once both sides are powers of the same base, the exponents themselves must match, which gives x equal to three. The second is a plain surd equation in disguise, giving x squared equal to five and therefore two answers, positive and negative root five. Three answers in total. The only real danger is multiplying the brackets out, which turns a two-line question into an unsolvable mess.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE NUMBER-SYSTEM ITEM (the SAG's own shape, fresh coefficients).
   (3x² − 5x − 2)(x² − 7) = 0 → over ℝ: x = −1/3, 2, √7, −√7
     ℚ: x = −1/3 or 2      ℕ: x = 2
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.qs.q6",
  chapter: CH,
  topic: "quadratic-solving",
  archetype: "zero-product-then-restrict-the-solution-set-by-number-system",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "eq1" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Given: &nbsp;(3x² − 5x − 2)(x² − 7) = 0<br><br>Solve for x if &nbsp;x ∈ ℝ.",
      },
      hint: {
        en: "The second bracket is already ready to go. The first one is a trinomial hiding inside a bracket — factorise it, and you will have three factors instead of two.",
      },
      memo: [
        { type: "step", text: { en: "Factorise the trinomial inside the first bracket:" } },
        { type: "step", text: { en: "(3x + 1)(x − 2)(x² − 7) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "3x + 1 = 0 &nbsp;&nbsp;or&nbsp;&nbsp; x − 2 = 0 &nbsp;&nbsp;or&nbsp;&nbsp; x² = 7" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; x = −1/3 &nbsp;&nbsp;or&nbsp;&nbsp; x = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "∴&nbsp; x = √7 &nbsp;&nbsp;or&nbsp;&nbsp; x = −√7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;x ∈ ℝ&nbsp; means “x is a real number”, so nothing is thrown away here — all four answers count. ℝ is the widest net in this question, not a restriction.",
        } },
      ],
      esplain: {
        en: "Three factors, three little equations, four answers. The first bracket is a trinomial, so factorise it before you do anything else: you need two numbers whose product with the three in front works out to negative two and whose middle terms collect to negative five x, which gives three x plus one times x minus two. Now every factor gets its turn. Three x plus one gives negative one third. X minus two gives two. And x squared equals seven gives both root seven and negative root seven, because you are solving rather than simplifying. Since the question says x is a real number, every one of the four survives. Write them all down — a missing answer is a missing mark even when the working is perfect.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence write down the solutions of the same equation if<br>(i) &nbsp;x ∈ ℚ &nbsp;&nbsp;and &nbsp;&nbsp;(ii) &nbsp;x ∈ ℕ.",
      },
      hint: {
        en: "You do not redo any algebra here. Go back to your four answers and ask, one at a time, whether each one is allowed to live in that number system.",
      },
      memo: [
        { type: "step", text: { en: "ℚ is the RATIONAL numbers — everything that can be written as one integer over another. √7 and −√7 cannot, so they fall away." } },
        { type: "answer", text: { en: "(i) &nbsp;x = −1/3 &nbsp;&nbsp;or&nbsp;&nbsp; x = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "ℕ is the NATURAL (counting) numbers 1, 2, 3, … — so −1/3 falls away too." } },
        { type: "answer", text: { en: "(ii) &nbsp;x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the number system named in the question is an instruction about which answers you are allowed to KEEP, never about how to do the algebra. Solve the whole thing first, then filter. Filtering first is how learners end up “proving” an equation has no answers.",
        } },
      ],
      esplain: {
        en: "The maths is finished; this part is a sorting job. Rational numbers are the ones that can be written as a fraction of two whole numbers, which negative one third obviously is, and two is as well, since two is two over one. Root seven cannot be written that way at all, so it is irrational and it leaves. Natural numbers are stricter still: they are the counting numbers, one, two, three and onwards, so a negative fraction has no place among them and only two survives. Notice the pattern — each system is a smaller net than the one before, so the list of answers can only ever get shorter as the question tightens, never longer.",
      },
    },
  ],
};

export const eqnQuadraticSolvingSiblingQuestions = [q1, q2, q3, q4, q5, q6];
