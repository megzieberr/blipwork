/* ============================================================
   EXAM FOCUS — Equations & Inequalities · The k-method
   SOURCE: September Test 1 (practice), QUESTION 2 — the three-part
   "Solve for x" block, converted part for part.
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q2(a)–(c)
       Sept-T1-Practice-Memo.tex    2(a)–2(c), 12 ticks
       Sept-T1-blueprint.md         §1, §3 (flag rulings F1, F2, F5)
   Same working, same ticks, same OR routes, same WATCH OUT / REMEMBER
   cards as the print memo. Connective prose is kept as tick-less `step`
   blocks; `hint` and `esplain` are freshly authored per part.

   TOPIC CHOICE: this printed question straddles three eqn rounds —
   2(a) rational exponents (eq2/es7), 2(b) fractions + limits (eq4),
   2(c) let K = √x (eq3). The schema carries ONE topic per question, so
   it is filed under the heaviest and hardest of the three: 2(c), 5 of
   the 12 marks, the k-method. lostQuest follows the same reasoning.

   METHOD: METHODS-algebra.md, hers verbatim — reciprocal power leads and
   raise-then-root rides under OR (A14 + flag F5); ± only where the
   ORIGINAL exponent's numerator is even (flag F2); LCD + limits written
   BEFORE solving (B2); `let K = √x` leads and isolate-and-square rides
   under OR with the substitution test (A15 + flag F5); a square root can
   never be negative, so √x = −1 closes with "no solution", never
   "undefined" (0.3 + flag F1).

   OR ROUTES CARRY NO TICKS (blueprint §5, judgement call 5): the second
   road earns exactly the same marks, but the ticks are printed on the
   leading road only so that ticks-per-part stays countable against the
   allocation. Kept here as tick-less `step` blocks, worded as the print
   memo's grey OR boxes.

   LEVELS: blueprint splits within a sub-part (2(a) = 1·L1 + 2·L2;
   2(b) = 1·L2 + 3·L3; 2(c) = 1·L2 + 4·L3). One level per part in the
   schema → dominant chunk, never 4 unless the print memo stars it. The
   print memo stars 3(b), 5(b), 5(c) only, so no ★ in this question.

   NO DIAGRAM (print question has none; schema has no diagram field).

   ⚠️ UNREGISTERED. Registering (a DAY-session job) needs:
     1. js/exam/index.js — import + append to REGISTRY.eqn.
     2. verify-exam.html Part 2 — the pilot-only assertions break:
        "eqn has exactly 4 seeded questions" (would become more),
        'examTopicsForChapter("eqn") derives exactly one topic,
        "nature-of-roots"' (would gain "k-method"), and 'every eqn
        pilot question points lostQuest at eq8' (this one points at
        eq3). Widen all three.
     3. verify-exam.html Part 6 — "k-method" IS already inside the
        existing eqn scope wall, so no wall change is needed. ✓
     4. verify-exam.html Part 7 — the recompute block is
        nature-of-roots-specific; extend it, or add a sibling block, for
        this question's numbers (they are re-derived in this run's own
        check script instead).
   ============================================================ */

const PAPER = "sept-t1";

const t1q2 = {
  id: "eqn.km.t1q2",
  chapter: "eqn",
  topic: "k-method",
  archetype: "solve-for-x-grab-bag-three-shapes",
  paper: PAPER,
  // eq3 "The k-method" — "A repeated bracket → let k stand for it. What
  // k is, why you're not done at k, and the restriction that rides
  // along." 2(c) is exactly that round's skill, and "why you're not done
  // at k" is the mark 2(c) is built to catch.
  lostQuest: { chapter: "eqn", quest: "eq3" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;2x<sup><span class=\"sfrac\"><span class=\"sf-n\">3</span><span class=\"sf-d\">4</span></span></sup> = 54",
      },
      hint: {
        en: "Get the power standing on its own first — the 2 in front has to go before you touch the exponent. Then think: what do you multiply 3/4 by to leave a plain x behind?",
      },
      memo: [
        { type: "step", text: { en: "Get the power on its own first:" } },
        { type: "step", text: { en: "x<sup><span class=\"sfrac\"><span class=\"sf-n\">3</span><span class=\"sf-d\">4</span></span></sup> = 27" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now multiply the exponent by its <b>reciprocal</b> — 3/4 × 4/3 = 1, so the x is left standing alone. Whatever you do to the left, you do to the right." } },
        { type: "step", text: { en: "(x<sup><span class=\"sfrac\"><span class=\"sf-n\">3</span><span class=\"sf-d\">4</span></span></sup>)<sup><span class=\"sfrac\"><span class=\"sf-n\">4</span><span class=\"sf-d\">3</span></span></sup> = 27<sup><span class=\"sfrac\"><span class=\"sf-n\">4</span><span class=\"sf-d\">3</span></span></sup> = (3³)<sup><span class=\"sfrac\"><span class=\"sf-n\">4</span><span class=\"sf-d\">3</span></span></sup>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 3⁴ = 81" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — raise, then root (same marks): x<sup><span class=\"sfrac\"><span class=\"sf-n\">3</span><span class=\"sf-d\">4</span></span></sup> = 27 &nbsp;⟹&nbsp; (⁴√(x³))⁴ = 27⁴ &nbsp;⟹&nbsp; x³ = 531 441 &nbsp;⟹&nbsp; x = ³√531 441 = 81" } },
        { type: "trap", text: {
          en: "REMEMBER: where does the ± go? Look at the <i>numerator</i> of the original exponent. Here it is 3, which is odd, so there is <b>no</b> ±. A ± only appears when that numerator is even — e.g. x<sup><span class=\"sfrac\"><span class=\"sf-n\">2</span><span class=\"sf-d\">3</span></span></sup> = 9 gives x = ±27.",
        } },
      ],
      esplain: {
        en: "A fractional exponent is doing two jobs at once: the bottom of the fraction is a root and the top is a power. You do not have to unpick them one at a time, though — multiplying the exponent by its upside-down twin cancels it to 1, and 1 is the exponent that leaves a bare x. That is why 3/4 gets hit with 4/3. The other road, raising to the 4 and then taking a cube root, is just as correct and earns exactly the same marks; some of your class prefer it, and it is printed under OR for that reason. The ± question is the one that decides marks: it depends on the NUMERATOR of the exponent you started with, not on the root you happen to take along the way. Odd numerator, one answer. Even numerator, two.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;4/(x − 2) + x/(x + 2) = 23/(x² − 4)",
      },
      hint: {
        en: "Factorise every denominator before anything else — x² − 4 is a difference of squares. The limits line goes down on your page BEFORE you start solving, not after.",
      },
      memo: [
        { type: "step", text: { en: "Factorise every denominator before anything else: &nbsp;x² − 4 = (x − 2)(x + 2)." } },
        { type: "step", text: { en: "LCD = (x − 2)(x + 2) &nbsp;&nbsp;·&nbsp;&nbsp; limits: x ≠ 2 ; x ≠ −2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Multiply each term by what it needs to reach the LCD; the denominators then cancel and only the numerators are left." } },
        { type: "step", text: { en: "4(x + 2) + x(x − 2) = 23" }, ticks: ["ca"] },
        { type: "step", text: { en: "4x + 8 + x² − 2x = 23 &nbsp;⟹&nbsp; x² + 2x − 15 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(x + 5)(x − 3) = 0 &nbsp;∴ x = −5 &nbsp;or&nbsp; x = 3 &nbsp;— neither is a forbidden value, so both stay" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the <b>limits</b> line is a mark of its own, and it is the one learners leave out. Write it down at the top, then check every answer against it at the end — if a root had come out as 2 or −2 here, it would have had to be thrown away.",
        } },
      ],
      esplain: {
        en: "Multiplying an equation by the LCD is legal because you do it to every single term on both sides, so the balance never tips — and it is worth doing because it turns three fractions into an ordinary quadratic you already know how to solve. But there is a price. The moment you multiply the denominators away, the equation forgets that x was never allowed to be 2 or −2, and it will happily hand you one of those back as an “answer”. That is why the limits line is written first, from the factorised denominators, before a single term is multiplied out. Here both roots survive the check, so both stay — but the checking step is a mark whether or not it changes the answer.",
      },
    },
    {
      id: "c",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;x − 3√x − 4 = 0",
      },
      hint: {
        en: "Look at the shape, not the letters: there is an x, a √x and a number. What happens to √x when you square it? Give that thing a name and the equation turns into something familiar.",
      },
      memo: [
        { type: "step", text: { en: "Look at the shape: there is an x, a √x and a number — that is a quadratic wearing a disguise, because (√x)² = x." } },
        { type: "step", text: { en: "let K = √x &nbsp;&nbsp;(then K² = x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "K² − 3K − 4 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(K − 4)(K + 1) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ K = 4 &nbsp;&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;&nbsp; K = −1" } },
        { type: "answer", text: { en: "√x = 4 &nbsp;∴ x = 16" }, ticks: ["a"] },
        { type: "answer", text: { en: "√x ≠ −1 &nbsp;∴ no solution" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — isolate and square (same marks): x − 4 = 3√x &nbsp;⟹&nbsp; (x − 4)² = (3√x)² &nbsp;⟹&nbsp; x² − 8x + 16 = 9x &nbsp;⟹&nbsp; x² − 17x + 16 = 0 &nbsp;⟹&nbsp; (x − 1)(x − 16) = 0 &nbsp;⟹&nbsp; x = 1 or x = 16. Squaring can invent a root, so <b>always test both answers</b> in the <i>original</i> equation: x = 1 gives 1 − 3(1) − 4 = −6 ≠ 0 ⟹ N.A.; x = 16 gives 16 − 3(4) − 4 = 0 ⟹ keep." } },
        { type: "trap", text: {
          en: "REMEMBER: a square root can never be negative, so √x = −1 has <b>no solution</b>. A cube root may be negative — ³√x = −1 would give x = −1, and that branch would count. Know which root you are looking at.",
        } },
      ],
      esplain: {
        en: "This is the k-method, and the reason it works is that √x squared is x — so the two x-shaped things in the equation are really one thing and its square. Call √x by a short name, K, and what is left is K² − 3K − 4 = 0, a quadratic you have factorised a hundred times. The trap is stopping at K. K is not what you were asked for; you were asked for x, so every branch has to be walked back through √x = K. And that walk back is where the second branch dies: K = −1 would need a square root to come out negative, and a square root of a real number never does. That is “no solution” — not “undefined”, which is only for dividing by zero, and not “non-real”, which is for taking an even root of a negative. The other road, isolating the √ and squaring, is equally hers and equally correct, but it invents a fake root along the way, so it must end with both answers tested in the original equation.",
      },
    },
  ],
};

export const eqnKMethodQuestions = [t1q2];
