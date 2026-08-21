/* ============================================================
   EXAM FOCUS — Exponents & Surds · Conjugates & rationalising
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block (surds …)", plus SURVEY-Nov-P1.md's recurring
   "prove/show a surd identity — rationalising denominators, two memo
   methods (OR) accepted" (Nov P1 2023 Q2(b); Nov P1 2021 Q2(a)(2)'s
   (√7 − √2)(√7 + √2) denominator). Fresh radicands, fresh contexts.

   SKELETON DISTANCE — checked against Sept T1 Q1, the only other
   exp-chapter question composed tonight:
     · T1 1(a) is √48 + √300 − √27, a SQUARE-root add/subtract; (a) here
       is a CUBE root, where a factor needs three of itself for a ticket
       out, and the answer keeps her 1∛2 scaffolding.
     · T1 1(b) rationalises a NUMERIC binomial denominator, 6/(√5 − √2).
       (d) here rationalises an ALGEBRAIC one, (x − 4)/(√x − 2), where
       the conjugate makes the denominator cancel outright rather than
       become a plain number — and where a restriction has to ride along.
     · (b) and (c) are products, not fractions: difference of squares
       and the squared binomial that keeps its middle term. Neither
       appears anywhere in T1.

   METHOD: METHODS-algebra.md hers verbatim — A8 prime factors then
   "tickets out"; A9 the BIG NO-NO (√x + √y ≠ √(x + y)) and her habit of
   keeping the coefficient 1 visible (1∛2 before ∛2); A10 difference of
   squares first, and the squared binomial keeping its middle term;
   A11 conjugate over itself; A16 a "show that" worked from ONE side
   only. Flag F2 is respected — no ± appears anywhere, because nothing
   here is being SOLVED, only simplified.

   NO LEVEL 4 in this question, so no ★ — the block's level-4 weight is
   carried by js/exam/exp-no-solution-and-strategy.js. Block spread is
   reported in the run's return.

   NO DIAGRAM. ⚠️ UNREGISTERED — same four registration steps as
   js/exam/exp-first-step-and-method.js's header, including the missing
   `exp` scope wall in verify-exam.html Part 6.
   ============================================================ */

const q1 = {
  id: "exp.cr.q1",
  chapter: "exp",
  topic: "conjugates-and-rationalising",
  archetype: "surd-products-and-an-algebraic-conjugate-show-that",
  lostQuest: { chapter: "exp", quest: "es6" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer the WHOLE of this question without a calculator.</em><br>Simplify: &nbsp;∛54 − ∛16",
      },
      hint: {
        en: "Prime factors first, as always — but count carefully. Under a cube root a factor needs three of itself before it earns a ticket out, not two.",
      },
      memo: [
        { type: "step", text: { en: "Rewrite every base as a product of prime factors first, then look for the factors with <b>tickets out</b> — under a cube root that means groups of three." } },
        { type: "step", text: { en: "∛54 − ∛16 = ∛(2 · 3³) − ∛(2³ · 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 3∛2 − 2∛2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1∛2 = ∛2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the root index is what decides how many of a factor you need. A square root wants pairs; a cube root wants threes. 2⁴ = 2³ · 2 hands ONE 2 out of a cube root and leaves one behind — it does not hand out two.",
        } },
      ],
      esplain: {
        en: "Two cube roots that look nothing alike turn out to be helpings of the same thing, and prime factors are what show it. Under ∛54 sits 2 · 3³: the three 3s travel together and walk out as a single 3, leaving the lonely 2 behind. Under ∛16 sits 2⁴, which is one complete group of three 2s plus a spare, so a 2 walks out and a 2 stays. Both land on ∛2, and once the roots are identical, subtracting them is counting: three of them take away two of them leaves one of them. Write that 1 in front before you tidy it away — it is the line that shows the marker you were counting, not guessing.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(2√3 − √5)(2√3 + √5)",
      },
      hint: {
        en: "Do not multiply this out term by term — look at the two brackets and notice how they differ. And be careful about what the 2 out front does when you square it.",
      },
      memo: [
        { type: "step", text: { en: "Same two terms, only the middle sign differs — that is a <b>diff in □'s</b>, so it collapses straight to first squared minus second squared:" } },
        { type: "step", text: { en: "= (2√3)² − (√5)²" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 12 − 5 = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2√3)² is 2² × (√3)² = 4 × 3 = 12, not 2 × 3 = 6. Everything inside the bracket gets squared, the coefficient included.",
        } },
      ],
      esplain: {
        en: "This is the reason conjugates work at all, met on its own before you need it in a fraction. When two brackets hold the same two terms and differ only in the middle sign, the cross terms cancel each other out exactly, and all that survives is the square of the first minus the square of the second. Squaring is what kills the surds — √3 squared is just 3 — so a product that looked full of roots lands on a plain whole number. Hold on to that: it is precisely the move that clears a surd out of a denominator in part (d).",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(√7 + √2)²",
      },
      hint: {
        en: "A bracket squared is that bracket times itself — so it keeps a middle term. Write it out in three pieces before you simplify anything.",
      },
      memo: [
        { type: "step", text: { en: "Squaring a binomial <b>keeps the middle term</b> — first squared, plus twice first times second, plus second squared:" } },
        { type: "step", text: { en: "(√7 + √2)² = (√7)² + 2(√7)(√2) + (√2)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 7 + 2√14 + 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 9 + 2√14" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (√7 + √2)² ≠ 7 + 2. That is the BIG NO-NO wearing a different hat — a square never distributes over a + or a −, and the middle term is exactly what it leaves behind when you try.",
        } },
      ],
      esplain: {
        en: "Put this part next to (b) and the pair teaches the whole story. Same-signs-differ gave you a clean whole number, because the two cross terms cancelled. Same-signs-match keeps both cross terms, and 2 lots of √7 × √2 is 2√14 — which cannot be tidied any further, because 14 has no square factors to hand out tickets to. So the answer stays in two pieces, a whole-number part and a surd part, and that is a perfectly finished answer. Notice how √7 × √2 became √14: multiplying two square roots means multiplying what is underneath them, which is one of the surd laws that is genuinely allowed. Adding them is the one that is not.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;(x − 4)/(√x − 2) = √x + 2, &nbsp;for x &gt; 0 and x ≠ 4.",
      },
      hint: {
        en: "Start on the left and drive it down to what you were given. The denominator has two terms, so it has a conjugate — and watch what the denominator turns into once you use it.",
      },
      memo: [
        { type: "step", text: { en: "A “show that” is worked from one side only — start on the left. The denominator is a two-term surd, so multiply by the <b>conjugate over itself</b>:" } },
        { type: "step", text: { en: "= (x − 4)/(√x − 2) &nbsp;×&nbsp; (√x + 2)/(√x + 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (x − 4)(√x + 2) / ((√x)² − 2²)" }, ticks: ["ca"] },
        { type: "step", text: { en: "= (x − 4)(√x + 2) / (x − 4)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= √x + 2 &nbsp;as required" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: x ≠ 4 is not decoration. At x = 4 the denominator √x − 2 is 0 and the whole expression is <b>undefined</b> — division by zero, which is a different word from “no solution”. That is why the question hands you the restriction, and why you may cancel the (x − 4) safely everywhere else.",
        } },
      ],
      esplain: {
        en: "The conjugate trick is not only for numbers. Here the denominator is √x − 2, so its conjugate is √x + 2, and multiplying by that over itself is multiplying by 1 — the expression's value never changes, only its shape. What makes this one satisfying is what the denominator becomes: (√x)² − 2² is x − 4, which is already sitting in the numerator, so the whole thing cancels and the fraction disappears. That is the pattern to recognise, because the difference of two squares turns up constantly in this disguise — x − 4 IS (√x)² − 2² whenever x is positive. And the restriction matters for exactly the reason the cancelling works: you are dividing top and bottom by x − 4, which is only legal while x − 4 is not zero.",
      },
    },
  ],
};

export const expConjugatesAndRationalisingQuestions = [q1];
