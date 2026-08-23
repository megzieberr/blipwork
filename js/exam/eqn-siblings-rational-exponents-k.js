/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "rational-exponents-k" (Rational exponents & the k-method).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.km.t1q2(a)  2x^(3/4) = 54 — a coefficient in front of the
       power, then the reciprocal-power move; odd numerator, so no ±;
     · eqn.km.t1q2(c)  x − 3√x − 4 = 0 — let K = √x, and the K = −1
       branch dies because a square root can never be negative.
   The four below are the four moves the tile was missing:
     q1  the CONTRAST PAIR her own notes are built around — an odd/odd
       exponent, where a negative answer really is allowed, set beside an
       even root, where it is not. Her handwritten "ah! found one that
       works!!" sits beside exactly this comparison;
     q2  a NEGATIVE rational exponent, where the reciprocal power is
       negative too and the original numerator is EVEN, so the answer
       carries a ±; then the same method with a BRACKET in the base;
     q3  a REPEATED BRACKET squared — let K stand for the bracket, and
       the two K-branches each open into their own quadratic, so the
       question has FOUR roots;
     q4  the k-method on an EXPONENTIAL: 2^(2x) is (2^x)², so K = 2^x
       turns it into a trinomial, and both branches survive.

   METHOD: METHODS-algebra.md, hers verbatim — A14 (multiply by the
   reciprocal of the exponent; her "Important Notes" box decides where
   the ± goes — an EVEN numerator in the original exponent gives ±, an
   even number anywhere with a negative right-hand side gives NO
   SOLUTION, and an odd/odd exponent allows a negative answer); A13 (let
   K = base^x, factorise, then convert every branch back); A5/eq3's
   "let k stand for the repeated bracket, and you are not done at k";
   F5's ruling that BOTH roads are hers, so the reciprocal-power route
   leads and raise-then-root rides under OR; F1's ruling that a positive
   thing that cannot reach a negative value closes with "no solution",
   never "undefined"; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's no-calculator opening
   block; SURVEY-Nov-P1.md Nov 2023 Q1(a)(1) (solve x^(−3/4) = 8) and
   Nov 2022 Q2(b); SURVEY-Her-2025-Assessments.md Test 1 Q2 (an
   exponential equation factorised as a quadratic in 2^x). Fresh
   exponents, fresh bases, fresh numbers.

   ⚠️ ONE BRIEF ITEM IS ALREADY ON THE TILE. The brief also asked for a
   card "where a k-root is rejected". That is eqn.km.t1q2(c), which is
   still here and is exactly that question (√x ≠ −1 ∴ no solution), so
   nothing below repeats it; q1(b) carries the same idea in the
   rational-exponent world instead.

   LEVELS: 1, 2, 3, 2. NOTHING here is level 4. NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
/* eq3 "The k-method" — "a repeated bracket → let k stand for it; what k
   is, why you're not done at k, and the restriction that rides along".
   es7 teaches the rational-exponent half, but lostQuest.chapter has to
   match the question's own chapter, so eq3 is the round that renders. */
const LOST = { chapter: CH, quest: "eq3" };

/* A pre-built stacked fraction. fracHtml (js/ui.js) leaves a ready-made
   .sfrac completely alone, which is the escape hatch for a fraction
   living inside a <sup> — exactly what js/exam/eqn-k-method.js already
   does for 2x^(3/4). */
const f = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — HER CONTRAST PAIR.
   (a) x^(1/3) = −5 → cube both sides → x = −125 (odd/odd: allowed).
   (b) x^(1/2) = −3 → a square root is never negative → no solution.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.rek.q1",
  chapter: CH,
  topic: "rational-exponents-k",
  archetype: "odd-root-allows-a-negative-answer-even-root-does-not",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;x<sup>${f("1", "3")}</sup> = −5`,
      },
      hint: {
        en: "The exponent is one third, so the reciprocal you need is three. Raise BOTH sides to that power — and before you panic about the minus, ask yourself what kind of root a third really is.",
      },
      memo: [
        { type: "step", text: { en: `The exponent is undone by multiplying it by its <b>reciprocal</b>: &nbsp;${f("1", "3")} × 3 = 1, &nbsp;which leaves a plain x. Whatever you do to the left, you do to the right.` } },
        { type: "step", text: { en: `(x<sup>${f("1", "3")}</sup>)³ = (−5)³` }, ticks: ["s/f"] },
        { type: "step", text: { en: "The exponent has only ODD numbers in it, so a negative answer is allowed here — a cube root of a negative number really is negative" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = −125" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A fractional exponent is doing two jobs at once: the number on the bottom is a root and the number on top is a power. You do not have to unpick them one at a time, though — multiplying the exponent by its upside-down twin cancels it to one, and one is the exponent that leaves a bare x standing. So a third gets hit with three, which means cubing both sides. The part that feels wrong is the minus, and it is fine. An exponent of one third is a cube root, and a cube root is happy to be negative, because minus five times minus five times minus five really is minus one hundred and twenty-five. Her note beside this exact case reads: found one that works.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: `Now solve for x: &nbsp;x<sup>${f("1", "2")}</sup> = −3, &nbsp;and explain why the answer is not like the one in (a).`,
      },
      hint: {
        en: "One half means a square root. Ask the same question you asked in (a): is a root of this kind ever allowed to come out negative?",
      },
      memo: [
        { type: "step", text: { en: `x<sup>${f("1", "2")}</sup> means √x, &nbsp;and the 2 on the bottom is an EVEN number — a square root of a real number can never be negative` }, ticks: ["ca"] },
        { type: "answer", text: { en: "√x ≠ −3 &nbsp;&nbsp;∴ no solution" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER which of her four words this is. It is <b>no solution</b> — a thing that can never be negative has been asked to be negative. It is not “undefined”, which is only for dividing by zero, and it is not “non-real”, which is for taking an even root OF a negative number. Squaring both sides here would hand you x = 9, and 9 does not work: √9 is 3, not −3.",
        } },
      ],
      esplain: {
        en: "Put this next to part (a) and you have the whole rule in two lines. In (a) the root was a cube root, an odd one, and odd roots keep the sign of whatever is inside them — so a negative answer was allowed. Here the root is a square root, an even one, and an even root of a real number is never negative, because squaring anything real gives something positive. So there is nothing x could be. The dangerous move is squaring both sides, because squaring hides the minus and produces nine, which fails the moment you test it in the original equation. Her rule is quicker: look at whether the exponent contains an even number, and if it does, a negative right-hand side kills the question straight away.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A NEGATIVE RATIONAL EXPONENT, then the same move with a BRACKET.
   (a) x^(−2/3) = 4 → x = ±1/8   (even numerator ⟹ ±)
   (b) (x + 1)^(3/2) = 8 → x + 1 = 4 → x = 3   (odd numerator ⟹ no ±)
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.rek.q2",
  chapter: CH,
  topic: "rational-exponents-k",
  archetype: "negative-rational-exponent-then-the-same-move-on-a-bracket",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;x<sup>${f("−2", "3")}</sup> = 4`,
      },
      hint: {
        en: "Multiply the exponent by its reciprocal — the reciprocal of a negative fraction is negative too. Then work the right-hand side out as an exact fraction, and check the numerator of the exponent you STARTED with to see whether a ± is needed.",
      },
      memo: [
        { type: "step", text: { en: `Multiply the exponent by its <b>reciprocal</b>: &nbsp;${f("−2", "3")} × ${f("−3", "2")} = 1, &nbsp;which leaves a plain x. Do the same to the right.` } },
        { type: "step", text: { en: `(x<sup>${f("−2", "3")}</sup>)<sup>${f("−3", "2")}</sup> = 4<sup>${f("−3", "2")}</sup>` }, ticks: ["s/f"] },
        { type: "step", text: { en: `A negative exponent means “one over”, so &nbsp;4<sup>${f("−3", "2")}</sup> = 1 ÷ 4<sup>${f("3", "2")}</sup> = 1 ÷ (√4)³ = 1 ÷ 2³ = 1/8` }, ticks: ["ca"] },
        { type: "step", text: { en: "The numerator of the <b>original</b> exponent is 2, an EVEN number, so the answer carries a ±" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = ±1/8" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — raise, then root (same marks): &nbsp;x<sup>${f("−2", "3")}</sup> = 4 &nbsp;⟹&nbsp; 1 ÷ x<sup>${f("2", "3")}</sup> = 4 &nbsp;⟹&nbsp; x<sup>${f("2", "3")}</sup> = 1/4 &nbsp;⟹&nbsp; (∛(x²))³ = (1/4)³ &nbsp;⟹&nbsp; x² = 1/64 &nbsp;⟹&nbsp; x = ±1/8` } },
        { type: "trap", text: {
          en: "REMEMBER where the ± comes from: the <i>numerator</i> of the exponent you started with. Here it is 2, which is even, so there are two answers. In eqn.km.t1q2(a) the numerator was 3, odd, and there was only one. The minus sign in the exponent decides nothing about the ± — it only turns the answer upside down.",
        } },
      ],
      esplain: {
        en: "A negative fractional exponent is two ideas stacked together and neither of them is new. The minus means one over the thing, and the fraction means a root and a power. The tidiest way through is still the reciprocal: multiply minus two thirds by minus three halves, get one, and the x is standing alone. Do the same to the right and you have four to the power minus three halves, which is one over four to the three halves, which is one over two cubed, which is one eighth. Then the ± question, and it is decided by the numerator of the exponent you were given — a two, which is even, so both plus and minus an eighth work. Test the negative one if you doubt it: the cube root of minus an eighth is minus a half, squared is a quarter, upside down is four.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: `Hence solve for x: &nbsp;(x + 1)<sup>${f("3", "2")}</sup> = 8`,
      },
      hint: {
        en: "The whole bracket is now doing the job x did in (a), so treat it as one thing. Multiply the exponent by its reciprocal, work the right-hand side out, and only solve for x at the very end.",
      },
      memo: [
        { type: "step", text: { en: `The bracket (x + 1) is doing the job x did in (a). Multiply the exponent by its reciprocal, &nbsp;${f("2", "3")}:` } },
        { type: "step", text: { en: `((x + 1)<sup>${f("3", "2")}</sup>)<sup>${f("2", "3")}</sup> = 8<sup>${f("2", "3")}</sup>` }, ticks: ["s/f"] },
        { type: "step", text: { en: `8<sup>${f("2", "3")}</sup> = (∛8)² = 2² = 4, &nbsp;and the numerator of the original exponent is 3, an ODD number, so there is no ±` }, ticks: ["ca"] },
        { type: "answer", text: { en: "x + 1 = 4 &nbsp;&nbsp;∴ x = 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: `WATCH OUT: the bracket only disappears at the LAST step. Writing x + 1 = 8<sup>${f("2", "3")}</sup> and then solving is right; taking the exponent apart term by term inside the bracket is not — (x + 1)<sup>${f("3", "2")}</sup> is not x<sup>${f("3", "2")}</sup> + 1.`,
        } },
      ],
      esplain: {
        en: "Everything you did in part (a) works here, and the only change is what the exponent is sitting on. A bracket is a single object as far as the exponent laws are concerned, so raising the whole thing to two thirds cancels the three halves and leaves the bracket standing alone. The right-hand side is eight to the two thirds: take the cube root first, because that keeps the numbers small, then square it, giving four. The numerator of the original exponent is three, an odd number, so there is no plus-or-minus this time. Only now does the bracket come apart, and it comes apart by ordinary subtraction. Check it: four to the three halves is two cubed, which is eight.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A REPEATED BRACKET, and FOUR roots.
   (x² − x)² − 8(x² − x) + 12 = 0, K = x² − x
   K² − 8K + 12 = 0 → K = 2 or K = 6
   K = 2: x² − x − 2 = 0 → x = 2 or x = −1
   K = 6: x² − x − 6 = 0 → x = 3 or x = −2
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.rek.q3",
  chapter: CH,
  topic: "rational-exponents-k",
  archetype: "repeated-bracket-k-substitution-with-four-roots",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Given: &nbsp;(x² − x)² − 8(x² − x) + 12 = 0<br><br>Let &nbsp;K = x² − x. &nbsp;Write the equation as a quadratic in K, and solve for K.",
      },
      hint: {
        en: "The same bracket appears twice — once squared and once on its own. Give it a short name and read what is left.",
      },
      memo: [
        { type: "step", text: { en: "The bracket x² − x appears twice: once squared, once on its own. &nbsp;let K = x² − x &nbsp;&nbsp;(then (x² − x)² = K²)" } },
        { type: "step", text: { en: "K² − 8K + 12 = 0 &nbsp;⟹&nbsp; (K − 2)(K − 6) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ K = 2 &nbsp;&nbsp;or&nbsp;&nbsp; K = 6" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The k-method is really a naming trick, and its rule is short: if the same lump of algebra appears twice, once squared and once plain, give the lump a name. Here the lump is x squared minus x. Call it K, and what is left on the page is K squared minus eight K plus twelve — a trinomial you have factorised a hundred times. Two numbers that multiply to twelve and add to minus eight are minus two and minus six, so the brackets are K minus two and K minus six. The whole point of the substitution is that it makes a frightening-looking fourth-degree equation into an ordinary quadratic, and nothing has been lost — the lump is still waiting to be unpacked.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "Hence solve for x.",
      },
      hint: {
        en: "K is not what the question asked for. Put x² − x back in place of K — once for each of your two answers — and solve the two quadratics you get.",
      },
      memo: [
        { type: "step", text: { en: "K is not what you were asked for, so <b>every</b> branch has to be walked back to x:" } },
        { type: "step", text: { en: "K = 2: &nbsp;x² − x = 2 &nbsp;⟹&nbsp; x² − x − 2 = 0 &nbsp;⟹&nbsp; (x − 2)(x + 1) = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴ x = 2 &nbsp;&nbsp;or&nbsp;&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "step", text: { en: "K = 6: &nbsp;x² − x = 6 &nbsp;⟹&nbsp; x² − x − 6 = 0 &nbsp;⟹&nbsp; (x − 3)(x + 2) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ x = 3 &nbsp;&nbsp;or&nbsp;&nbsp; x = −2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = −2 &nbsp;or&nbsp; x = −1 &nbsp;or&nbsp; x = 2 &nbsp;or&nbsp; x = 3 &nbsp;&nbsp;— four solutions in all" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: stopping at K = 2 and K = 6 is the classic way to lose most of this question — K was never the unknown. And do not expect two answers just because the first equation was a quadratic: each K branch opens into its own quadratic, so there are FOUR roots here, and all four have to be handed in.",
        } },
      ],
      esplain: {
        en: "This is the part the k-method exists for, and the trap it exists to catch. K was a nickname, not an answer, so both values of K have to be put back where the nickname came from. Each substitution gives an ordinary quadratic: x squared minus x equals two, and x squared minus x equals six. Take each one to zero and factorise, and each hands you two roots. That is four altogether, which is exactly what you should expect — the original equation had a squared bracket in it, so it is really a fourth-degree equation, and a fourth-degree equation can have up to four solutions. Check any one of them by working the bracket out first: at x equals three the bracket is six, and six squared minus eight sixes plus twelve is zero.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE k-METHOD ON AN EXPONENTIAL.
   2^(2x) − 6·2^x + 8 = 0, K = 2^x → K² − 6K + 8 = 0
   → K = 2 (x = 1) or K = 4 (x = 2). Both branches survive.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.rek.q4",
  chapter: CH,
  topic: "rational-exponents-k",
  archetype: "exponential-quadratic-in-k-with-both-branches-surviving",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;2<sup>2x</sup> − 6·2<sup>x</sup> + 8 = 0",
      },
      hint: {
        en: "Look at the shape rather than the letters: there is a squared thing, that same thing on its own, and a number. What is 2 to the power 2x, written in terms of 2 to the power x?",
      },
      memo: [
        { type: "step", text: { en: "2<sup>2x</sup> = (2<sup>x</sup>)², so this is a quadratic wearing a disguise." } },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;&nbsp;(then K² = 2<sup>2x</sup>)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "K² − 6K + 8 = 0 &nbsp;⟹&nbsp; (K − 2)(K − 4) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ K = 2 &nbsp;&nbsp;or&nbsp;&nbsp; K = 4" }, ticks: ["ca"] },
        { type: "step", text: { en: "K = 2: &nbsp;2<sup>x</sup> = 2¹ &nbsp;— the guns are equal, so the helmets fall to the ground &nbsp;⟹&nbsp; x = 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "K = 4: &nbsp;2<sup>x</sup> = 2² &nbsp;⟹&nbsp; x = 2 &nbsp;&nbsp;∴ x = 1 &nbsp;or&nbsp; x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 2<sup>2x</sup> is (2<sup>x</sup>)², not 2·2<sup>x</sup>. The 2x is an exponent, so it means 2 multiplied by itself 2x times — which is 2<sup>x</sup> multiplied by itself. Reading it as 2 lots of 2<sup>x</sup> turns the whole equation into a linear one and loses every mark.",
        } },
      ],
      esplain: {
        en: "The k-method does not belong to any one topic — it is a way of seeing. Whenever an equation has a thing, that same thing squared, and a number, it is a quadratic in disguise, whatever the thing happens to be. Here the thing is 2 to the power x, because 2 to the power 2x is exactly 2 to the power x multiplied by itself. Name it K and the page turns into K squared minus six K plus eight, which factorises straight away. Then every branch has to be walked back, because K was never the unknown. Two to the power x equals two gives x equal to one, and two to the power x equals four gives x equal to two. Both branches survive here, because 2 and 4 are both positive — a negative branch would have died on the spot.",
      },
    },
  ],
};

export const eqnRationalExponentsKSiblingQuestions = [q1, q2, q3, q4];
