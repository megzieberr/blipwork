/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "exponent-expressions" (Simplify exponent expressions).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHAT WAS ALREADY THERE, and why nothing here repeats it:
     · exp.fsm.t1q1(c) — a fraction with a SUM on top AND on the
       bottom, one base, answer a plain 3 (divorce → common factor →
       caged → KFC);
     · exp.fsm.t1q1(d) — "in terms of a and b", 72ˣ from 2ˣ = a and
       3ˣ = b.
   So the brief's "express in terms of a and b" idea is deliberately
   NOT built here: t1q1(d) already owns that shape on this tile, and
   the standing rule is one shape per tile. What the four below add
   instead are the four moves the tile was missing —

     q1  the plain exponent LAWS on algebraic bases, answer written
         with positive exponents (the way in for a learner who cannot
         yet do t1q1(c));
     q2  divorce + common factor with a SINGLE power underneath, so
         the answer is a fraction rather than a whole number;
     q3  her A6 "exam favourite": a + between two depressed exponents
         in a denominator → break it up with ÷ → LCD → KFC;
     q4  her A2 "type 1: one term" at full size — four different bases
         to prime-factor, the exponent arithmetic written out in the
         exponent, and everything cancels down to a plain fraction.

   METHOD: METHODS-algebra.md, hers verbatim — A1 her law names
   (product, quotient, power of a power, power of a product, depressed
   exponents), A2 "type 1: one term" and its four steps, A3 "divorce"
   and "caged", A4 common factor, A6 LCD and KFC.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block"; SURVEY-Nov-P1.md Q2(a)(1) "simplify exponent expression with
   mixed bases (3, 15, 27, 5)", Q2(a)(2) (2^(x+3) + 2^x)/√(2^(2x)) and
   Q2(b) (3·2^m − 4·2^(m+2))/(2^m − 2^(m−1)); SURVEY-Her-2025-
   Assessments.md Test 1 Q1 ("simplify exponential fraction with a
   variable exponent m") and Test 6 Q2. Fresh bases and fresh numbers.

   LEVELS: 1, 2, 2, 3. Nothing here is level 4 — this is a normal tile.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* A pre-built stacked fraction. Anything whose numerator or denominator
   carries <sup> tags or a bracketed power has to be built this way —
   fracHtml (js/ui.js) only stacks the plain `a/b` shapes its regex
   knows, and verify-exam-fractions.mjs proves it leaves a pre-built
   .sfrac completely alone. */
const F = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — the plain laws on algebraic bases.
   (2a³b⁻²)⁴ ÷ (8a⁵b⁻³) = 2a⁷/b⁵.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.expr.q1",
  chapter: CH,
  topic: "exponent-expressions",
  archetype: "power-of-a-product-then-quotient-rule-positive-exponents",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es3" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Simplify, and leave your answer with positive exponents only: <br>&nbsp;" + F("(2a³b⁻²)⁴", "8a⁵b⁻³"),
      },
      hint: {
        en: "Deal with the bracket first — every base inside it gets the outside exponent, the 2 included. Only then take the top away from the bottom, base by base.",
      },
      memo: [
        { type: "step", text: { en: "Multiply the bracket out first — <b>each base gets the exponent</b>, and that includes the 2:" } },
        { type: "step", text: { en: "(2a³b⁻²)⁴ = 2⁴ · a¹² · b⁻⁸ = 16a¹²b⁻⁸" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now the quotient rule — <b>subtract exponents</b>, one base at a time:<br>16 ÷ 8 = 2, &nbsp;a<sup>12 − 5</sup> = a⁷, &nbsp;b<sup>−8 − (−3)</sup> = b⁻⁵" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 2a⁷b⁻⁵ = 2a⁷/b⁵" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2a³b⁻²)⁴ is 16a¹²b⁻⁸, not 2a¹²b⁻⁸. The coefficient is a base like any other and it gets the exponent too — that missing 2⁴ is the most common lost mark on this question.",
        } },
      ],
      esplain: {
        en: "Nothing here is clever; it is four laws applied in a sensible order. The bracket goes first because a power of a product hands the outside exponent to every single thing inside — the 2, the a and the b — so 2 becomes 16 and the two exponents get multiplied by 4. Then the fraction bar means subtract, base by base, and the only fiddly one is the b: minus eight take away minus three is minus five, because subtracting a negative turns into adding. Finally the question asks for positive exponents, so the b to the minus five flips downstairs and the answer sits as two a to the seventh over b to the fifth. Doing the bracket before the division is what keeps the arithmetic small enough to trust.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — divorce + common factor, single power underneath.
   (5^(m+1) − 5^(m−1)) / 5^m = 24/5.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.expr.q2",
  chapter: CH,
  topic: "exponent-expressions",
  archetype: "divorce-then-common-factor-over-a-single-power",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es4" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;" + F("5<sup>m+1</sup> − 5<sup>m−1</sup>", "5<sup>m</sup>"),
      },
      hint: {
        en: "There is a − between the two terms on top, so nothing may cancel yet. Divorce each power into 5<sup>m</sup> times a small number first, and then look for what they have in common.",
      },
      memo: [
        { type: "step", text: { en: "There is a − between the terms, so every power gets <b>divorced</b> first: &nbsp;5<sup>m+1</sup> = 5<sup>m</sup> · 5 &nbsp;and&nbsp; 5<sup>m−1</sup> = 5<sup>m</sup> · 5⁻¹." }, ticks: ["s/f"] },
        { type: "step", text: { en: "= " + F("5<sup>m</sup> · 5 − 5<sup>m</sup> · 5⁻¹", "5<sup>m</sup>") } },
        { type: "step", text: { en: "Take out the common factor — always the base carrying the variable exponent. The − is now <b>caged</b>, so 5<sup>m</sup> may cancel: &nbsp;= " + F("5<sup>m</sup>(5 − 1/5)", "5<sup>m</sup>") }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 5 − 1/5 = 25/5 − 1/5 = 24/5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 5<sup>m−1</sup> means 5<sup>m</sup> <i>divided</i> by 5, not 5<sup>m</sup> <i>minus</i> 5. Divorcing splits a power into a product — a plus or minus in the exponent becomes a multiply or a divide outside it.",
        } },
      ],
      esplain: {
        en: "Cancelling is division, and you may only divide a whole top by a whole bottom. While the top is two separate things with a minus between them, the 5 to the m is not a factor of it and crossing it out would be cheating. Divorcing fixes that in one line: 5 to the m plus one is nothing more mysterious than 5 to the m times 5, and 5 to the m minus one is 5 to the m times a fifth. Now every term on top has a visible 5 to the m, so it can be bracketed out — caged, in her word — and only then is it a genuine factor of the whole top and the whole bottom. What is left is 5 take away a fifth, and the m has vanished completely: the answer is the same twenty-four fifths whatever m happens to be.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — her A6 exam favourite: a + between two depressed exponents in
   the denominator. 2 ÷ (4⁻¹ + 12⁻¹) = 6.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.expr.q3",
  chapter: CH,
  topic: "exponent-expressions",
  archetype: "depressed-exponents-summed-in-a-denominator-lcd-then-kfc",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es3" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;2/(4⁻¹ + 12⁻¹)",
      },
      hint: {
        en: "The + underneath is what stops you moving the 4 and the 12 upstairs. Break the fraction up into a division instead, add the two little fractions properly, and finish with keep–flip–change.",
      },
      memo: [
        { type: "step", text: { en: "The + in the denominator stops you taking the 4 and the 12 to the top. Break it up with ÷ instead:" } },
        { type: "step", text: { en: "= 2 ÷ (1/4 + 1/12)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LCD = 12: &nbsp;1/4 becomes 3/12, &nbsp;so &nbsp;3/12 + 1/12 = 4/12 = 1/3" }, ticks: ["ca"] },
        { type: "step", text: { en: "Dividing by a fraction is <b>KFC</b> — keep, flip, change:" } },
        { type: "answer", text: { en: "= 2 × 3/1 = 6" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is <b>not</b> 2(4 + 12) = 32. Sending a depressed exponent to the other side of the bar is a rule about multiplying and dividing; the + between the two terms blocks it completely, which is exactly why the ÷ and the LCD have to come first.",
        } },
      ],
      esplain: {
        en: "Her notes call this an exam favourite, and the whole page exists to stop one reflex. Seeing 4 to the minus one plus 12 to the minus one underneath, the hand wants to fling both numbers to the top and write 4 plus 12. It cannot: flipping is a multiply-and-divide rule, and a plus sign is standing in the way. So rewrite the fraction as a division — 2 divided by whatever that bracket comes to — turn each depressed exponent into an honest fraction, and add them with a lowest common denominator. A quarter plus a twelfth is a third. Then dividing by a third is keep, flip, change: keep the 2, flip the third into three over one, change the divide into a times. Two times three is six.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — her A2 "type 1: one term", full size.
   (9^(n+1) · 8^n) / (6^n · 12^(n+1)) = 3/4.
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.sib.expr.q4",
  chapter: CH,
  topic: "exponent-expressions",
  archetype: "one-term-mixed-base-simplification-prime-factors-first",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es3" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;" + F("9<sup>n+1</sup> · 8<sup>n</sup>", "6<sup>n</sup> · 12<sup>n+1</sup>"),
      },
      hint: {
        en: "Four different bases, but only two primes hiding behind them. Break every base into 2s and 3s first, then hand each bracket its outside exponent before you go anywhere near the subtraction.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first — always: &nbsp;9 = 3², &nbsp;8 = 2³, &nbsp;6 = 2 · 3, &nbsp;12 = 2² · 3." }, ticks: ["s/f"] },
        { type: "step", text: { en: "= " + F("(3²)<sup>n+1</sup> · (2³)<sup>n</sup>", "(2 · 3)<sup>n</sup> · (2² · 3)<sup>n+1</sup>") } },
        { type: "step", text: { en: "Multiply the brackets out — power of a power <b>multiplies</b> the exponents, and every base inside gets its share:" } },
        { type: "step", text: { en: "= " + F("3<sup>2n+2</sup> · 2<sup>3n</sup>", "2<sup>n</sup> · 3<sup>n</sup> · 2<sup>2n+2</sup> · 3<sup>n+1</sup>") }, ticks: ["ca"] },
        { type: "step", text: { en: "Now subtract exponents with the same base, and write the arithmetic out <i>in the exponent</i> on its own line before simplifying it:" } },
        { type: "step", text: { en: "= 2<sup>3n − n − (2n+2)</sup> · 3<sup>2n+2 − n − (n+1)</sup><br>= 2<sup>−2</sup> · 3<sup>1</sup>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 3/2² = 3/4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 12<sup>n+1</sup> is (2² · 3)<sup>n+1</sup>, so <b>both</b> the 2² and the 3 take the whole exponent — 2<sup>2n+2</sup> · 3<sup>n+1</sup>. Giving the exponent to only the first factor is the single most expensive slip on this question.",
        } },
      ],
      esplain: {
        en: "Nine, eight, six and twelve look like four different worlds, but they are all built out of twos and threes, and that is the only reason this can be done without a calculator. Prime factors are step one, every time. Once each base is a power of 2 or a power of 3, the brackets can be opened by multiplying exponents, and the whole expression becomes a pile of 2s over a pile of 2s and a pile of 3s over a pile of 3s. Then it is subtraction, and her layout is worth copying exactly: write the exponent arithmetic out on its own line inside the exponent before you work it out, because that is where sign mistakes get caught. The n disappears completely, and what survives is 2 to the minus two times 3, which flips into three quarters.",
      },
    },
  ],
};

export const expExponentExpressionsSiblingQuestions = [q1, q2, q3, q4];
