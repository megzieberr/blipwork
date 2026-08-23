/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "exponential-equations" (Exponential equations).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   THREE new cards, taking the tile back to six.

   WHY THREE AND NOT TWO. The tile held four cards, all cut from
   exp.nss.q1 — but part (d) of that question is a LEVEL 4 part, and
   her ruling 5 (2026-08-23) keeps ★ parts off the normal tiles. That
   card moves to the chapter's new Level 4 tile (see js/exam/
   cards-exp.js), so this tile starts today at three and needs three.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · exp.nss.q1(a) 2^(x−3) = 16 — one side already a power of the
       other (same base, no work on the left);
     · exp.nss.q1(b) 9^(x+1) = 27^(x−1) — two bases, one prime;
     · exp.nss.q1(c) 2^(2x) − 10·2^x + 16 = 0 — the k-method with two
       surviving branches.
   The three below are the three moves that were missing:
     q1  the LEFT side has to be tidied first (product rule) before
         either side is a single power;
     q2  a FRACTION base — 1/4 is 4⁻¹, so the whole exponent changes
         sign (her "flipped fractions" law inside an equation);
     q3  x in TWO places with a − between them, so a common factor has
         to come out before any guns can be equal.

   METHOD: METHODS-algebra.md, hers verbatim — A12 "guns and helmets"
   (bases = guns, exponents = helmets; equal guns shoot each other and
   the helmets fall to the ground), prime factors before equating; A1
   the product rule and "flipped fractions"; A3 divorce and the common
   factor; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block (… exponential equations …)"; SURVEY-Nov-P1.md Q1(c)
   2^(3x−6) = √8 and Q1(a)(1); SURVEY-Her-2025-Assessments.md Test 1
   Q2 and Test 6 Q1. Fresh bases and fresh numbers throughout.

   LEVELS: 1, 2, 3 — which lands the whole tile on two of each once
   the three existing cards are counted. NOTHING here is level 4.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* ---------------------------------------------------------------
   q1 — tidy the LEFT side first: 2^x · 2^(x+4) = 64  →  x = 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.eqns.q1",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "product-rule-on-one-side-then-equate-exponents",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;2<sup>x</sup> · 2<sup>x+4</sup> = 64",
      },
      hint: {
        en: "The left-hand side is two powers of the same base being multiplied, so it can be written as ONE power first. Then make the right-hand side a power of 2 as well.",
      },
      memo: [
        { type: "step", text: { en: "Same base on the left, so the <b>product rule</b> first — add the exponents, and the base stays the same:" } },
        { type: "step", text: { en: "2<sup>x</sup> · 2<sup>x+4</sup> = 2<sup>2x+4</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now write 64 as a power of 2 as well: &nbsp;2<sup>2x+4</sup> = 2⁶ &nbsp;&nbsp;— the <b>guns</b> are equal, so they shoot each other and the <b>helmets</b> fall to the ground" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2x + 4 = 6 &nbsp;&nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2<sup>x</sup> · 2<sup>x+4</sup> is 2<sup>2x+4</sup>, not 4<sup>2x+4</sup>. Multiplying powers of the same base <b>adds</b> the exponents and leaves the base exactly as it was — the bases only ever get multiplied together when the EXPONENTS are the same.",
        } },
      ],
      esplain: {
        en: "An exponential equation can only be solved by hand once both sides are a single power of the same base, so the first job is always to see whether either side needs tidying. Here the left is two powers of 2 multiplied together, and the product rule squashes them into one: add the exponents, keep the base. That gives 2 to the two x plus four. The right is 64, which is 2 to the sixth. Now both sides are guns of the same kind, so they cancel each other out and the helmets — the exponents — drop to the ground as an ordinary little equation. Two x plus four equals six gives x equals one. Write the 2 to the sixth down; that line is a mark on its own, because it is what makes the comparison legal.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — a FRACTION base: (1/4)^(x−1) = 64  →  x = −2.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.eqns.q2",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "fraction-base-flipped-fraction-then-equate-exponents",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;(1/4)<sup>x−1</sup> = 64",
      },
      hint: {
        en: "A fraction base is a base with a hidden negative exponent — 1/4 is 4 to the power of what? Once the left-hand side is a plain power of 4, both sides can be compared.",
      },
      memo: [
        { type: "step", text: { en: "Get rid of the fraction base first: &nbsp;1/4 = 4⁻¹, &nbsp;so a <b>flipped fraction</b> turns the whole exponent around:" } },
        { type: "step", text: { en: "(1/4)<sup>x−1</sup> = (4⁻¹)<sup>x−1</sup> = 4<sup>−(x−1)</sup> = 4<sup>1−x</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "64 = 4³, &nbsp;so &nbsp;4<sup>1−x</sup> = 4³ &nbsp;&nbsp;— the guns are equal, so equate the helmets: &nbsp;1 − x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus reaches BOTH terms in the bracket, so (1/4)<sup>x−1</sup> is 4<sup>1−x</sup>, not 4<sup>x−1</sup>. Check it on the answer: at x = −2 the left-hand side is (1/4)⁻³, which really is 64.",
        } },
      ],
      esplain: {
        en: "A fraction base looks like a whole new kind of question and it is not — it is the same question wearing a disguise. A quarter is 4 to the minus one, so raising a quarter to the power x minus one is really 4 raised to minus one times x minus one, which is 4 to the one minus x. That single line is where the marks are, and it is also where the mistakes are, because the minus has to reach both terms inside the bracket. After that everything is ordinary: 64 is 4 cubed, the two bases match, so the exponents must match too, and one minus x equals three gives x equals minus two. A negative answer is completely normal here — a fraction base has to be fed a negative exponent before it can grow big.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — x in two places, common factor first:
   3^(x+2) − 3^x = 72  →  x = 2.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.eqns.q3",
  chapter: CH,
  topic: "exponential-equations",
  archetype: "common-factor-out-of-two-exponential-terms-then-same-base",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;3<sup>x+2</sup> − 3<sup>x</sup> = 72",
      },
      hint: {
        en: "There is a − between two terms, so no guns can be equal yet. Divorce the first power so both terms carry 3<sup>x</sup>, then take that out as a common factor and see what is left.",
      },
      memo: [
        { type: "step", text: { en: "A − sits between the two terms, so <b>divorce</b> first: &nbsp;3<sup>x+2</sup> = 3<sup>x</sup> · 3² = 9 · 3<sup>x</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "9 · 3<sup>x</sup> − 3<sup>x</sup> = 72 &nbsp;⟹&nbsp; take out the common factor — always the base with the variable exponent: &nbsp;3<sup>x</sup>(9 − 1) = 72" }, ticks: ["ca"] },
        { type: "step", text: { en: "8 · 3<sup>x</sup> = 72 &nbsp;&nbsp;∴ 3<sup>x</sup> = 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3<sup>x</sup> = 3² &nbsp;&nbsp;∴ x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: you may not drop the exponents while there is still a − in the way. 3<sup>x+2</sup> − 3<sup>x</sup> = 72 is <b>not</b> (x + 2) − x = 72. Guns can only shoot each other when each side is ONE single power.",
        } },
      ],
      esplain: {
        en: "Everything about this question is decided by that minus sign. The helmets-fall trick only works when each side of the equation is one single power, and a subtraction of two powers is not one power. So the plan is to turn the whole left-hand side into one thing being multiplied. Divorce splits 3 to the x plus two into 3 to the x times 9, and now both terms carry a visible 3 to the x, which can be bracketed out. What is left inside the bracket is a plain 9 minus 1, which is 8, so the equation says 8 lots of 3 to the x make 72 — and one lot must therefore be 9. Only now is each side a single power of 3, and only now may the exponents be compared.",
      },
    },
  ],
};

export const expExponentialEquationsSiblingQuestions = [q1, q2, q3];
