/* ============================================================
   EXAM FOCUS — Equations & Inequalities · Nature of roots (top-up)
   ONE fresh question, composed to bring the pilot topic block from 4 to
   the plan's "starting depth: 5 questions per topic block".
   (Overnight run #1, 2026-08-21 — topic top-up, belongs to no paper.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md's Paper 1 menu item "a
   nature-of-roots 'show that' (equal → rational-for-all-k →
   non-real-range → never-equal, in rising difficulty)", specifically the
   **rational-for-all-k** rung, which none of the four live pilot
   questions uses. Echo: Nov P1 2022 Q1(d) "rational for all k". Fresh
   numbers, fresh letters, fresh equation — public repo, her standing
   "freshly composed only" ruling.

   SKELETON DISTANCE — checked against all four live questions in
   js/exam/eqn-nature-of-roots.js AND against Sept T1's Q3(b):
     · q1  standard form → numeric Δ → name the nature → solve.
     · q2  standard form → numeric Δ → name the nature → find k for
           EQUAL roots + the equal root.
     · q3  equal-k → real-unequal-k range → non-real by leftover →
           largest integer k for rational roots (trial and check).
     · q4  Δ in terms of p → complete the square → real for ALL p →
           never equal (Δ ≥ 4).
     · T1 3(b)  complete the square on Δ → real for all p.
   This one is the only member of the block whose Δ turns out to be a
   PERFECT SQUARE in the unknown, and the only one that ends by solving
   with the formula in terms of the unknown to show both roots are
   rational. It does not complete the square anywhere (q4 and T1 3(b)
   own that move); it factorises a perfect-square trinomial instead —
   her "perfect □" language, EQ p43. Nothing here overlaps q3's
   trial-and-check, and the equal-roots part is a two-line consequence
   of the perfect square rather than q2's stand-alone Δ = 0 exercise.

   METHOD: METHODS-algebra.md B11 (her four outcome phrases, her
   bracket-every-negative substitution habit, her ∴ habit) and B12(a).
   The distinction her B11 table exists to enforce — Δ > 0 says REAL,
   only "Δ is a perfect □" says RATIONAL — is the whole point of the
   question and is what the ★ part and the REMEMBER card carry.

   NO DIAGRAM (the topic is honestly a Δ-and-words one; the pilot spends
   none either, and the schema has no diagram field).

   ⚠️ UNREGISTERED. Registering (a DAY-session job) needs:
     1. js/exam/index.js — import + append to REGISTRY.eqn (this one is
        a genuine sibling of the pilot file, so appending it to the
        existing eqnNatureOfRootsQuestions array at the registry level
        is the natural shape).
     2. verify-exam.html Part 2 — "eqn has exactly 4 seeded questions"
        becomes 5. Topic list and the eq8 lostQuest assertion are BOTH
        still satisfied by this file (same topic, same reteach round). ✓
     3. verify-exam.html Part 6 — "nature-of-roots" is already in the
        eqn scope wall. ✓
     4. verify-exam.html Part 7 — extend the independent recompute with
        this question's numbers (Δ = 4m² + 12m + 9 = (2m + 3)²,
        m = −3/2 for equal roots, roots x = 2 and x = −2m − 1). Every
        one of them was re-derived twice in this run's own check script.
   ============================================================ */

const q5 = {
  id: "eqn.nor.q5",
  chapter: "eqn",
  topic: "nature-of-roots",
  archetype: "nor-perfect-square-delta-rational-for-all-m",
  lostQuest: { chapter: "eqn", quest: "eq8" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + (2m − 1)x − (4m + 2) = 0, &nbsp;where m is a real number.<br><br>Show that Δ, the discriminant of this equation, simplifies to 4m² + 12m + 9.",
      },
      hint: {
        en: "Write a, b and c down before you touch the formula, and take the whole of −(4m + 2) as c — minus sign and all. Then bracket every negative before you square or multiply it.",
      },
      memo: [
        { type: "step", text: { en: "Read a, b and c off the equation first: &nbsp;a = 1, &nbsp;b = 2m − 1, &nbsp;c = −(4m + 2) = −4m − 2." } },
        { type: "step", text: { en: "Δ = b² − 4ac = (2m − 1)² − 4(1)(−4m − 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 4m² − 4m + 1 + 16m + 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Δ = 4m² + 12m + 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: c is the <b>whole</b> of −(4m + 2), minus sign included. Drop that minus and −4ac turns into −16m − 8 instead of +16m + 8, and every part after this one goes down with it.",
        } },
      ],
      esplain: {
        en: "Nothing new is happening here — it is the same Δ = b² − 4ac you have substituted into all year, except b and c are little expressions instead of plain numbers. Two habits keep it safe. First, write a, b and c down on their own line before you go near the formula, so you can see that c carries a minus in front of a whole bracket. Second, put every negative inside its own brackets before squaring or multiplying, because −4 times a negative c flips to a plus and that is exactly where a rushed substitution loses three marks at once. What you end up with is a quadratic EXPRESSION in m — and the rest of the question is about what that expression can and cannot do.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence write Δ as a perfect square, and determine the value of m for which the equation has equal roots.",
      },
      hint: {
        en: "Look at 4m² and 9 — what would each of them be the square of? Check whether the middle term matches, and then remember what Δ has to equal for roots to be equal.",
      },
      memo: [
        { type: "step", text: { en: "4m² + 12m + 9 = (2m + 3)² &nbsp;&nbsp;— a perfect □: (2m)² and 3², with a middle term of 2(2m)(3) = 12m ✓" }, ticks: ["ca"] },
        { type: "step", text: { en: "for equal roots, Δ = 0: &nbsp;(2m + 3)² = 0 &nbsp;⟹&nbsp; 2m + 3 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ m = −3/2 = −1,5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two different things are going on in this part and it is worth keeping them apart. Writing Δ as a perfect square is bookkeeping — the same trinomial, wearing a bracket — but it is bookkeeping that changes what you can SEE, because a squared bracket obviously can never go negative, while 4m² + 12m + 9 does not obviously do anything. Then the equal-roots question is the ordinary rule: equal roots mean Δ is exactly zero, no more and no less. A squared bracket is zero in exactly one place, where the bracket itself is zero, so there is precisely one value of m — and that single value is the clue that the rest of the m-line must be doing something else entirely.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "Explain why this equation can never have non-real roots, whatever real value m takes.",
      },
      hint: {
        en: "You are being asked about the sign of Δ, not its value. What is the smallest a squared real number is ever allowed to be?",
      },
      memo: [
        { type: "step", text: { en: "(2m + 3)² ≥ 0 for every real m — a squared real number is never negative" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ ≥ 0 for every real m, and non-real roots need Δ &lt; 0, so the roots are real for every real value of m" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “Δ ≥ 0” is not the same claim as “Δ &gt; 0”. Here Δ really does reach 0, at m = −1,5 — so the roots are always real, but at that one value they are real, rational and <b>equal</b>, not unequal.",
        } },
      ],
      esplain: {
        en: "Non-real roots happen only when Δ is negative, so the question is really asking: can this Δ ever be negative? Once Δ is written as a square the answer is immediate — squaring a real number always lands on zero or above, never below. That one line covers every m at once, which is the whole reason (b) was worth writing the perfect square down for. Be careful with the wording of your conclusion, though. You have shown Δ is never negative, which rules out non-real. You have NOT shown Δ is never zero — it is zero at m = −1,5, and there the roots are equal. “Always real” is the honest claim here.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "Show that, apart from the one value of m found in (b), the roots of the equation are rational and unequal for every rational value of m.",
      },
      hint: {
        en: "Solve the equation with the quadratic formula, leaving m in. The √Δ step is the one to watch — you already know Δ is a perfect square, so what happens to the root sign?",
      },
      memo: [
        { type: "step", text: { en: "x = (−b ± √Δ)/(2a) = (−(2m − 1) ± √((2m + 3)²))/2 = (1 − 2m ± (2m + 3))/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "taking + : &nbsp;x = (1 − 2m + 2m + 3)/2 = 4/2 = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "taking − : &nbsp;x = (1 − 2m − 2m − 3)/2 = (−4m − 2)/2 = −2m − 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "both roots are rational whenever m is rational, and they are equal only when −2m − 1 = 2, i.e. m = −3/2 &nbsp;∴ for every other rational m the roots are rational and unequal" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: Δ &gt; 0 on its own only promises REAL and unequal — it says nothing about rational. What makes a root rational is √Δ coming out with no surd left in it, and that is exactly what “Δ is a perfect □” buys you. Skip that check and you have answered half the question.",
        } },
      ],
      esplain: {
        en: "This is the payoff for spotting the perfect square. Normally the quadratic formula leaves a √ in your answer and you cannot say much about it — but here √Δ is the square root of something already squared, so the root sign simply falls away and leaves an ordinary expression in m. Once that happens the two roots are just additions and divisions of rational numbers, which is why they are rational for every rational m. There is a lovely check hiding in the answer too: one root comes out as 2 no matter what m is, and the other is −2m − 1, which only equals 2 at m = −1,5 — precisely the value (b) found for equal roots. The parts agree with each other, and that agreement is how you know nothing slipped. Bank the earlier marks first: (a), (b) and (c) are ordinary Δ work, and this is the reward round at the end.",
      },
    },
  ],
};

export const eqnNatureOfRootsTopUpQuestions = [q5];
