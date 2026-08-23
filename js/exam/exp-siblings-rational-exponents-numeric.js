/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "rational-exponents-numeric" (Rational & negative exponents,
   no calculator).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   A BRAND-NEW TILE. Six cards, none of them cut from an existing
   question: nothing in the three seeded exp modules evaluates a
   NUMBER raised to a rational or negative exponent, which is the
   opening move of every no-calculator block in the bank and the
   single easiest place for a 30%-learner to earn marks.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block"; SURVEY-Her-2025-Assessments.md Test 1 Q1 ("simplify
   negative exponents") and Test 6 Q2 ("simplify a fractional-exponent
   expression"); SURVEY-Nov-P1.md Q1(a)(1) x^(−3/4) = 8 and Q2(a)(1)
   "simplify exponent expression with mixed bases". Fresh numbers
   throughout — her own (2⁻¹ + 5⁻¹)⁻² becomes (3⁻¹ + 6⁻¹)⁻², her
   8^(−2/3) becomes 27^(−2/3), and so on.

   METHOD: METHODS-algebra.md, hers verbatim —
     A1  her law NAMES: depressed exponents, flipped fractions, zero
         exponent, power of a power, power of a quotient;
     A2  "type 1: one term" — prime factors FIRST, always;
     A7  the conversion box, with her memory hook "inside √ = top of
         the fraction, outside √ = bottom", and the negatives box;
     A6  the + inside a bracket that forces LCD and KFC;
     F2 (ruled by her 2026-08-21): √ used for SIMPLIFYING carries no ±
         — the ± belongs to SOLVING an equation. q4's trap card says so
         in as many words.

   LEVELS: 1, 1, 2, 2, 3, 3 — the ramp her tiles are supposed to run
   (js/exam/index.js sorts cards easiest-first anyway). NOTHING here is
   level 4: this is a normal tile, and her ruling 5 keeps the ★ off it.

   NO DIAGRAM (sessions/B-exp.md: "Diagrams: none").
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* Her house style for a rational exponent is a pre-built stacked
   fraction inside the <sup> — js/exam/eqn-k-method.js set that
   precedent, and verify-exam-fractions.mjs proves fracHtml leaves a
   pre-built .sfrac completely alone. These two helpers only build that
   markup; they hold no maths. */
const F = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
const RX = (n, d) => `<sup>${F(n, d)}</sup>`;          //  x^(n/d)
const RXN = (n, d) => `<sup>−${F(n, d)}</sup>`;        //  x^(−n/d)

/* ---------------------------------------------------------------
   q1 — 25^(3/2). The plainest possible rational exponent: prime
   factors, then power of a power. 125.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.ren.q1",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "evaluate-a-positive-rational-exponent-no-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Evaluate: &nbsp;25" + RX(3, 2),
      },
      hint: {
        en: "Prime factors first, as always — what is 25 built out of? Then remember which half of the little fraction is the root and which half is the power.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first — always. &nbsp;25 = 5²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now read the exponent her way: <b>inside the √ is the top of the fraction, outside the √ is the bottom</b>. The bottom is the root, the top is the power." } },
        { type: "answer", text: { en: "25" + RX(3, 2) + " = (5²)" + RX(3, 2) + " = 5³ = 125" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: power of a power <b>multiplies</b> the exponents. 2 × " + F(3, 2) + " = 3, which is where the 5³ comes from — not 5⁵ and not 5" + RX(3, 2) + ".",
        } },
      ],
      esplain: {
        en: "A fraction in the exponent is two instructions squashed into one symbol. The bottom number is a root and the top number is a power, so 25 to the three over two means take the square root of 25 and then cube it. Her memory hook is worth saying out loud every time: inside the root sign is the top of the fraction, outside the root sign is the bottom. The reason you break 25 into 5² first is that it turns the whole thing into one clean power law instead of two separate jobs — raising a power to a power just multiplies the exponents, and 2 times three over two is a plain 3. So the answer is 5³. You can also do it the long way, √25 = 5 and then 5³ = 125, and get exactly the same 125.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — √(36⁻¹). A depressed exponent hiding under a root sign. 1/6.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.ren.q2",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "square-root-of-a-negative-power-no-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>No calculator.</em><br>Evaluate: &nbsp;√(36⁻¹)",
      },
      hint: {
        en: "Deal with the depressed exponent before you touch the root. What does a negative exponent do to a number — does it change its sign, or does it move it?",
      },
      memo: [
        { type: "step", text: { en: "A <b>depressed exponent</b> flips the number and changes the sign of the exponent: &nbsp;36⁻¹ = 1/36" }, ticks: ["s/f"] },
        { type: "step", text: { en: "A root spreads over a quotient — <b>each base gets the exponent</b>: &nbsp;√(1/36) = √1/√36" } },
        { type: "answer", text: { en: "= 1/6" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 36⁻¹ is <b>not</b> −36. A negative exponent has nothing to do with a negative answer — it flips the number to the other side of the fraction bar, and the answer stays perfectly positive.",
        } },
      ],
      esplain: {
        en: "Two little laws, one after the other, and neither of them is difficult once you stop reading the minus sign as a subtraction. A negative exponent is her depressed exponent: it flips the number over the fraction bar and comes back up positive, so 36 to the minus one is one over 36. Then the square root is allowed to spread over a top and a bottom separately, because a root is really just a power and a power of a quotient hands the exponent to each base. Root of one is one, root of 36 is six, and the answer is one sixth. Notice that nothing anywhere in this question is negative — the sign lives in the exponent, and its only job is to say which way up the number goes.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — 27^(−2/3). Depressed exponent AND a rational one. 1/9.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.ren.q3",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "evaluate-a-negative-rational-exponent-no-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Evaluate: &nbsp;27" + RXN(2, 3),
      },
      hint: {
        en: "Get rid of the minus in the exponent first — flip it and change the sign. Only then worry about what two over three is asking you to do.",
      },
      memo: [
        { type: "step", text: { en: "Depressed exponent first: flip it, and the exponent turns positive." } },
        { type: "step", text: { en: "27" + RXN(2, 3) + " = " + F("1", "27" + RX(2, 3)) }, ticks: ["s/f"] },
        { type: "step", text: { en: "Prime factors: &nbsp;27 = 3³, &nbsp;so 27" + RX(2, 3) + " = (3³)" + RX(2, 3) + " = 3² = 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1/9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in the exponent sends the whole thing to the bottom of a fraction — it never makes the answer negative. The answer is 1/9, not −9 and not −1/9.",
        } },
      ],
      esplain: {
        en: "There are two things going on in that exponent, and doing them one at a time is what keeps it easy. The minus is a depressed exponent, so the 27 goes underneath a 1 and the exponent comes back up as two over three. Now only the fraction is left, and the bottom of it is the root: the cube root of 27 is 3, and then the top of it says square that, giving 9. So the whole thing is one over nine. Splitting 27 into 3³ first is what lets you do both steps in a single power law, and it is also the safety net — a number written in prime factors cannot hide a root from you. The most common lost mark on this question is a stray minus in the answer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — 32^(2/5) · 9^(−1/2). Two different bases in one product. 4/3.
   Carries the F2 trap card: √ used for SIMPLIFYING has no ±.
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.sib.ren.q4",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "product-of-two-rational-exponent-powers-no-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Evaluate: &nbsp;32" + RX(2, 5) + " · 9" + RXN(1, 2),
      },
      hint: {
        en: "Two bases, so do them one at a time. Break each number into prime factors and choose the prime that makes the root come out whole — 32 wants a fifth root, 9 wants a square root.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first: &nbsp;32 = 2⁵ &nbsp;and&nbsp; 9 = 3²." }, ticks: ["s/f"] },
        { type: "step", text: { en: "32" + RX(2, 5) + " = (2⁵)" + RX(2, 5) + " = 2² = 4" }, ticks: ["ca"] },
        { type: "step", text: { en: "9" + RXN(1, 2) + " = (3²)" + RXN(1, 2) + " = 3⁻¹ = 1/3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "4 · 1/3 = 4/3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: √9 = 3 here, with no ±. The ± only turns up when you are <b>solving</b> an equation — it comes from the equation having two solutions, not from the √ sign itself. You are <b>simplifying</b>, so one positive value is the whole answer.",
        } },
      ],
      esplain: {
        en: "A product like this is really two separate little questions standing next to each other, so resist the urge to do anything clever across the dot. Take 32 apart: it is 2 multiplied by itself five times, and the five on the bottom of the exponent is asking for exactly that fifth root, so it comes out as a clean 2, and the top says square it, giving 4. Take 9 apart: it is 3², the half asks for a square root and the minus flips it, so it lands on one third. Only now do you multiply, and 4 lots of a third is four thirds. The habit to build is choosing the prime that matches the root — if you had broken 32 into 4 × 8 instead, the fifth root would have had nowhere clean to go.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — (3⁻¹ + 6⁻¹)⁻². Her A6 page, the one built to stop
   "take the 3 and the 6 to the top". LCD, then a flipped fraction. 4.
   --------------------------------------------------------------- */
const q5 = {
  id: "exp.sib.ren.q5",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "sum-of-negative-powers-inside-a-bracket-lcd-then-flip",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Evaluate: &nbsp;(3⁻¹ + 6⁻¹)⁻²",
      },
      hint: {
        en: "The + inside the bracket is the whole difficulty. It stops you moving the 3 and the 6 anywhere, so turn each of them into an ordinary fraction first and add them the way you have always added fractions.",
      },
      memo: [
        { type: "step", text: { en: "The + inside the bracket stops you taking the 3 and the 6 to the top. Break it up first — depressed exponents, then LCD." } },
        { type: "step", text: { en: "= (1/3 + 1/6)⁻²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LCD = 6: &nbsp;1/3 becomes 2/6, &nbsp;so &nbsp;2/6 + 1/6 = 3/6 = 1/2" }, ticks: ["ca"] },
        { type: "step", text: { en: "= (1/2)⁻² &nbsp;&nbsp;— a <b>flipped fraction</b>: &nbsp;(1/2)⁻² = (2/1)²" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 2² = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (3⁻¹ + 6⁻¹)⁻² is <b>not</b> (3 + 6)². A depressed exponent may only be moved when the terms are multiplied — never across a + or a −. That single move is what her whole LCD page exists to stop.",
        } },
      ],
      esplain: {
        en: "This is the question her notes call an exam favourite, and the trap is set in the first half second. Seeing 3 to the minus one plus 6 to the minus one, the hand wants to fling both numbers upstairs and write 3 plus 6. It cannot: flipping is a rule about multiplying and dividing, and there is a plus sign sitting in the way. So do the honest thing instead. Write each one as an ordinary fraction, a third and a sixth, find the lowest common denominator, and add them to get a half. Now the bracket holds one single number, the plus sign is gone, and the outside minus two is free to act: a flipped fraction turns a half upside down into two, and squaring gives four.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — write with positive exponents, then evaluate.
   4⁻¹ + (−4)⁰ − (1/2)⁻³  =  −27/4. Three laws in one line.
   --------------------------------------------------------------- */
const q6 = {
  id: "exp.sib.ren.q6",
  chapter: CH,
  topic: "rational-exponents-numeric",
  archetype: "write-with-positive-exponents-then-evaluate-mixed-laws",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Write each term with a positive exponent and then evaluate: <br>&nbsp;4⁻¹ + (−4)⁰ − (1/2)⁻³",
      },
      hint: {
        en: "Three terms, three different laws — take them one at a time and write each one down before you add anything. Look carefully at what the zero exponent is sitting on.",
      },
      memo: [
        { type: "step", text: { en: "One term at a time, and each one gets its own law." } },
        { type: "step", text: { en: "4⁻¹ = 1/4 &nbsp;&nbsp;— a <b>depressed exponent</b>: flip it" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(−4)⁰ = 1 &nbsp;&nbsp;— <b>anything to the zero is always one</b>" }, ticks: ["ca"] },
        { type: "step", text: { en: "(1/2)⁻³ = (2/1)³ = 8 &nbsp;&nbsp;— a <b>flipped fraction</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "1/4 + 1 − 8 = 1/4 − 7 = −27/4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (−4)⁰ = 1, not −1 and not 0. The bracket is what is being raised to the power zero, minus sign and all — so the minus disappears with everything else.",
        } },
      ],
      esplain: {
        en: "Three terms, three separate laws, and the only real danger is rushing them together. The first term has a depressed exponent, so the 4 flips underneath a 1 and becomes a quarter. The second has a zero exponent, and the rule is beautifully blunt: anything to the power zero is one. Because the minus four is inside the bracket, the whole minus four is what gets flattened to 1 — if the bracket were not there, the minus would survive outside and the term would be minus one instead. The third is a flipped fraction: a half raised to minus three turns upside down into two cubed, which is 8. Then it is ordinary arithmetic — a quarter plus one is five quarters, take away eight, and you land on minus twenty-seven over four.",
      },
    },
  ],
};

export const expRationalExponentsNumericSiblingQuestions = [q1, q2, q3, q4, q5, q6];
