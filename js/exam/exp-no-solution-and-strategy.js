/* ============================================================
   EXAM FOCUS — Exponents & Surds · No-solution & strategy
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block (… exponential equations …)", plus SURVEY-Nov-P1.md's
   "exponential equations reducing to a common base" (Nov P1 2023
   Q1(c) 2^(3x−6) = √8; Nov P1 2021 Q1(a)(1)) and her own EXP p35 /
   REVMEMO p20 k-substitution pair. Fresh bases, fresh numbers.

   SKELETON DISTANCE — checked against Sept T1 Q1 and Q2 and against
   js/exam/exp-conjugates-and-rationalising.js:
     · T1 2(a) is a RATIONAL-exponent equation (x to a fractional
       power); every part here has the x in the EXPONENT instead.
     · T1 2(c)'s let-K is on √x, a surd; (c) and (d) here let K be an
       exponential, and (d)'s difficulty is recognising 4ˣ = (2ˣ)²,
       which has no counterpart anywhere in T1.
     · No surds and no fractions appear in this question at all, so it
       shares nothing with the other exp top-up.

   METHOD: METHODS-algebra.md hers verbatim — A12 "guns and helmets"
   (bases = guns, exponents = helmets; when the guns are equal they
   shoot each other and the helmets fall to the ground), prime factors
   before equating; A13 the k-substitution, with the two-column
   convert-back and a negative K branch closing on "no solution";
   §0.3 her four "no answer" words, and flag F1's ruling — a positive
   base that cannot reach a negative value is **no solution**, never
   "undefined". Flag F4's broken example (5ˣ = 25 → x = 5) is NOT
   generated anywhere here.

   LEVELS: ramped 1 → 2 → 3 → 4, with the ★ on (d), the only part where
   the needed fact (4ˣ = (2ˣ)²) is not written in the question.

   NO DIAGRAM. ⚠️ UNREGISTERED — same four registration steps as
   js/exam/exp-first-step-and-method.js's header, including the missing
   `exp` scope wall in verify-exam.html Part 6.
   ============================================================ */

const q1 = {
  id: "exp.nss.q1",
  chapter: "exp",
  topic: "no-solution-and-strategy",
  archetype: "exponential-equations-same-base-then-let-k-with-a-dead-branch",
  lostQuest: { chapter: "exp", quest: "es8" },
  marks: 13,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer the WHOLE of this question without a calculator.</em><br>Solve for x: &nbsp;2<sup>x−3</sup> = 16",
      },
      hint: {
        en: "Write the right-hand side as a power of 2 as well. Once both guns are the same, the helmets fall to the ground.",
      },
      memo: [
        { type: "step", text: { en: "2<sup>x−3</sup> = 2⁴ &nbsp;&nbsp;— the <b>guns</b> are now equal, so they shoot each other and the <b>helmets</b> fall to the ground" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x − 3 = 4 &nbsp;&nbsp;∴ x = 7" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential equation is only solvable by hand when both sides can be made into powers of the SAME base — that is the one move the whole topic stands on. 16 is 2⁴, so both sides become powers of 2, and once the bases match the only way the two sides can be equal is if the exponents are equal too. The exponents drop down to become an ordinary little equation, and that is where the x is waiting. Do not skip writing 2⁴ down; that line is a mark on its own, because it is the line that makes the comparison legal.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;9<sup>x+1</sup> = 27<sup>x−1</sup>",
      },
      hint: {
        en: "Neither side is a power of the other, but both are built from the same small prime. Break 9 and 27 down first, and remember that a power raised to a power multiplies the exponents.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first: &nbsp;9 = 3² &nbsp;and&nbsp; 27 = 3³." } },
        { type: "step", text: { en: "(3²)<sup>x+1</sup> = (3³)<sup>x−1</sup> &nbsp;⟹&nbsp; 3<sup>2x+2</sup> = 3<sup>3x−3</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "the guns are equal, so equate the exponents: &nbsp;2x + 2 = 3x − 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (3²)<sup>x+1</sup> is 3<sup>2x+2</sup>, not 3<sup>x+3</sup>. A power raised to a power <b>multiplies</b> the exponents, and the 2 has to reach both terms inside the bracket.",
        } },
      ],
      esplain: {
        en: "Nine and twenty-seven look like different worlds, but they are both made of 3s, and that is what makes this solvable without a calculator. Once each side is written as 3 to something, the equation is only asking when those two somethings are the same number. The one place to slow down is the bracket: raising 3² to the power (x + 1) multiplies the exponents, so the 2 has to be handed to BOTH the x and the 1. Get that expansion right and the rest is a linear equation you could have solved in Grade 9.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;2<sup>2x</sup> − 10 · 2<sup>x</sup> + 16 = 0",
      },
      hint: {
        en: "Look at the shape rather than the numbers. What is 2<sup>2x</sup> the square of? Give that thing a short name and read the equation again.",
      },
      memo: [
        { type: "step", text: { en: "2<sup>2x</sup> is (2<sup>x</sup>)², so this is a quadratic wearing a disguise." } },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;&nbsp;(then K² = 2<sup>2x</sup>) &nbsp;⟹&nbsp; K² − 10K + 16 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(K − 8)(K − 2) = 0 &nbsp;&nbsp;∴ K = 8 &nbsp;or&nbsp; K = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2³ &nbsp;∴ x = 3" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2¹ &nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: K is not the answer. Stopping at K = 8 and K = 2 loses the last two marks — you were asked for x, so every branch has to be walked back through 2<sup>x</sup> = K.",
        } },
      ],
      esplain: {
        en: "The k-method is for equations that are secretly quadratics. Here 2<sup>2x</sup> is (2<sup>x</sup>)², so the equation holds one thing and its square — exactly the shape of ax² + bx + c. Naming the repeated thing K makes that visible, and then it factorises like any other trinomial. The discipline is in the walk back: K stands for 2<sup>x</sup>, so each K-value becomes its own little same-base equation. Both branches survive this time because 8 and 2 are both positive powers of 2 — which is worth noticing, because the next part is built around a branch that does not survive.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;4<sup>x</sup> − 3 · 2<sup>x</sup> − 4 = 0",
      },
      hint: {
        en: "The two bases are not the same yet — but one of them is built out of the other. Rewrite 4<sup>x</sup> as (2<sup>x</sup>)², let K = 2<sup>x</sup>, and an ordinary quadratic in K appears. Then think hard about what a power of 2 is allowed to equal.",
      },
      memo: [
        { type: "step", text: { en: "The fact you have to fetch: &nbsp;4<sup>x</sup> = (2²)<sup>x</sup> = 2<sup>2x</sup> = (2<sup>x</sup>)². Once both bases are 2, the same K trick as (c) works." } },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;⟹&nbsp; K² − 3K − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(K − 4)(K + 1) = 0 &nbsp;&nbsp;∴ K = 4 &nbsp;or&nbsp; K = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2² &nbsp;∴ x = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> ≠ −1 &nbsp;∴ no solution" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a positive base can never reach a negative value, so 2<sup>x</sup> = −1 has <b>no solution</b>. Know which of her four words you need: “no solution” for this; “undefined” only for dividing by zero; “non-real” only for an even root of a negative; “N.A.” only for a surd-equation root that fails the test.",
        } },
      ],
      esplain: {
        en: "Two things make this the starred one. First, nothing in the question tells you the bases are related — you have to notice that 4 is 2², so 4<sup>x</sup> is (2<sup>x</sup>)², and only then does the k-method become available. Second, the second branch dies. K = −1 would need 2<sup>x</sup> to come out negative, and a positive base raised to any power is always positive: it can get enormous, it can get microscopically small, but it never crosses zero. So that branch is not an answer you forgot to find — it is genuinely no solution, and saying so IS the mark. Writing “undefined” there loses it, because undefined is reserved for dividing by zero. Bank the earlier marks first; this part is the one to sit with last.",
      },
    },
  ],
};

export const expNoSolutionAndStrategyQuestions = [q1];
