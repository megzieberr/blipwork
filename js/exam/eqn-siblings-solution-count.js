/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "solution-count" (Two, one or no solution?).
   (SESSION H of the Exam Focus build day, 2026-08-23 —
   sessions/H-eq9-solution-count.md, her afternoon extension.)
   ------------------------------------------------------------
   SIX new cards for a brand-new tile, and a brand-new drill round to
   go with them: eq9 "Two, one or no solution?", which teaches her
   handwritten "Important Notes" box and then drills it.

   THE METHOD IS HERS, from the two pages she photographed on
   2026-08-23 (the same box as METHODS-algebra.md A14):
     · multiply with the RECIPROCAL of the exponent — switch numerator
       and denominator, so 3/4 × 4/3 = 1 and it cancels out;
     · EVEN NUMERATOR → ± answer;
     · ONLY ODD NUMBERS in numerator and denominator → a negative
       answer is fine;
     · an EVEN NUMBER in the numerator OR the denominator, with a
       negative on the right → it cannot happen, NO SOLUTION;
   and her four worked examples, whose layout every memo below copies:
   raise both sides to the power of the denominator, take the
   numerator-th root, then read the answer (or say it cannot happen).

   THE SIX, and what each one is for:
     q1  the plainest "how many, and why" — an EVEN numerator with a
       negative right-hand side, which is the one her Grade 11 learner
       keeps getting wrong;
     q2  three quick classifications on one card, one for each of the
       three answers, so the whole table is walked in three marks;
     q3  SOLVE, and the ± really appears: an even numerator with a
       positive right-hand side;
     q4  SOLVE, and the answer is NEGATIVE: only odd numbers, so it is
       allowed — her "odd numbers can be ⊖" example;
     q5  SOLVE, and there is nothing to find: an even DENOMINATOR with
       a negative right-hand side, which is her fourth worked example
       and the subtlest of the three no-solution cases;
     q6  HER CONTRAST: the same exponent twice, and only the sign on
       the right is different. One dies, one gives a ± pair.

   q1 and q6(a) are both "even numerator with a negative" on purpose.
   q1 asks for it cold; q6 puts it beside its twin so the learner can
   see that the sign alone decided it. That is the shape her own notes
   are built around.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's no-calculator opening
   block (solve-for-x items, 2–5 marks) and its "state, with a reason"
   one-markers. Fresh exponents, fresh numbers.

   LEVELS: 1, 1·1·1, 2, 3, 2, 2·3. NOTHING here is level 4. NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
/* eq9 "Two, one or no solution?" — the round built alongside these
   cards, which teaches her box and then drills exactly this decision. */
const LOST = { chapter: CH, quest: "eq9" };

/* A pre-built stacked fraction. fracHtml (js/ui.js) leaves a ready-made
   .sfrac completely alone, which is the escape hatch for a fraction
   living inside a <sup> — the same one js/exam/eqn-k-method.js and
   js/exam/eqn-siblings-rational-exponents-k.js already use. */
const f = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
/* x to a rational power, written the way she writes it */
const xp = (n, d) => `x<sup>${f(n, d)}</sup>`;

/* ---------------------------------------------------------------
   q1 — HOW MANY, AND WHY. x^(2/5) = −9: the numerator is even, so the
   left-hand side is an even power and can never be negative.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.sc.q1",
  chapter: CH,
  topic: "solution-count",
  archetype: "state-how-many-solutions-with-a-reason-even-numerator-negative-side",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `<em>Without solving the equation:</em><br>How many real solutions does &nbsp;${xp(2, 5)} = −9 &nbsp;have? Give a reason for your answer.`,
      },
      hint: {
        en: "You are not being asked to solve it. Look at the number on TOP of the exponent, and then at the sign on the right — those two things decide it on their own.",
      },
      memo: [
        { type: "step", text: { en: `The numerator of the exponent is <b>2</b>, an <b>even</b> number, so ${xp(2, 5)} is an even power: &nbsp;${xp(2, 5)} = (<sup>5</sup>√x)²` }, ticks: ["ca"] },
        { type: "answer", text: { en: "An even power is never negative &nbsp;∴ <b>no solution</b>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER which of her four words this is. It is <b>no solution</b> — something that can never be negative has been asked to be negative. It is not “undefined”, which is only for dividing by zero, and it is not “non-real”, which is for taking an even root OF a negative number.",
        } },
      ],
      esplain: {
        en: "There is a shortcut here and it is the whole point of the question. A fractional exponent is a root and a power stacked together: the bottom number is the root, the top number is the power. Here the top number is two, so whatever the fifth root of x turns out to be, it gets squared before it is compared with the right-hand side. Squaring anything real gives something that is zero or positive, never negative. So the left-hand side simply cannot reach minus nine, no matter what x is, and there is nothing to solve. Her rule says it faster: an even number on top, with a negative on the right, means no solution.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THREE QUICK ONES, one for each answer.
   (a) x^(4/7) = 5   → even numerator, positive side → TWO
   (b) x^(5/3) = −7  → only odd numbers → ONE, and it is negative
   (c) x^(1/4) = −6  → even denominator, negative side → NONE
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.sc.q2",
  chapter: CH,
  topic: "solution-count",
  archetype: "three-equations-state-two-one-or-no-solutions-with-reasons",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(4, 7)} = 5` },
      hint: { en: "Top number first: odd or even? Then the sign on the right." },
      memo: [
        { type: "answer", text: { en: "<b>Two solutions.</b> The numerator 4 is EVEN and the right-hand side is positive, so the answer carries a ± &nbsp;(even numerator → ± answer)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The bottom of the exponent is seven, which is an odd root, and an odd root is happy with any real number — so nothing is ruled out before you start. The top is four, which is an even power. Undoing an even power is where a plus-or-minus comes from, in exactly the same way that solving x squared equals nine gives both three and minus three. The right-hand side is positive, so both branches survive and there really are two answers. Her rule is the short version: an even numerator gives a ± answer.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(5, 3)} = −7` },
      hint: { en: "Are BOTH numbers in the exponent odd? If they are, a negative answer is allowed." },
      memo: [
        { type: "answer", text: { en: "<b>One solution.</b> Only odd numbers in the exponent (5 and 3), so a negative answer is allowed &nbsp;— there is exactly one real value, and it is negative" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Both numbers in this exponent are odd, and that is the friendly case. The bottom is a cube root, which keeps the sign of whatever is inside it, and the top is an odd power, which also keeps the sign. Nothing anywhere in the chain forces the left-hand side to be positive, so it can reach minus seven — and because odd powers and odd roots each give exactly one answer, there is no plus-or-minus to worry about either. One value of x, and it is a negative one. This is the case her notes cheer about: found one that works.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: { en: `${xp(1, 4)} = −6` },
      hint: { en: "The bottom number is the ROOT. What kind of root is a fourth root, and may it come out negative?" },
      memo: [
        { type: "answer", text: { en: "<b>No solution.</b> The denominator 4 is EVEN, so the left-hand side is <sup>4</sup>√x, and an even root of a real number is never negative" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The bottom of the exponent is four, so this equation is really the fourth root of x, and the top is a one, so nothing is done to it afterwards. An even root of a real number is never negative, for the same reason a square root never is: raising anything real to an even power gives something positive, so the root has to come back positive too. It can never equal minus six. Notice this is a different reason from the even-numerator case, even though the answer word is the same — here it is the ROOT that refuses, not the power.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — SOLVE, and the ± really appears.
   x^(2/3) = 9 → (∛(x²))³ = 9³ = 729 → √(x²) = √729 = 27 → x = ±27
   check: (−27)^(2/3) = ((−27)^(1/3))² = (−3)² = 9  ✓
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.sc.q3",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-even-numerator-two-answers",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;${xp(2, 3)} = 9`,
      },
      hint: {
        en: "Raise both sides to the power of the DENOMINATOR first, then take the numerator-th root. And before you write the last line, check the numerator: is it odd or even?",
      },
      memo: [
        { type: "step", text: { en: `(<sup>3</sup>√(x²))³ = (9)³` }, ticks: ["s/f"] },
        { type: "step", text: { en: "√(x²) = √729 &nbsp;&nbsp;— the numerator is <b>2</b>, an EVEN number, so the answer carries a <b>±</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = ±27" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;multiply the exponent by ${f("3", "2")}, so &nbsp;x = 9<sup>${f("3", "2")}</sup> = (√9)³ = 3³ = 27, &nbsp;and the even numerator gives &nbsp;x = ±27` } },
        { type: "trap", text: {
          en: "WATCH OUT: the ± is not decoration and it is not optional. Test the negative one and it works — the cube root of −27 is −3, and (−3)² = 9. Losing it costs the accuracy mark every time.",
        } },
      ],
      esplain: {
        en: "Her method is to undo the exponent in one move by multiplying it by its upside-down twin, because two thirds times three halves is one, and an exponent of one leaves a bare x. Whatever you do to the left you do to the right, so the nine gets the same treatment: nine to the three halves is the square root of nine, cubed, which is twenty-seven. Then comes the part people forget. The exponent you started with had a two on top, an even number, and undoing an even power always opens two doors. So the answer is plus or minus twenty-seven, not just the positive one, and the negative really does check out.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — SOLVE, and the answer is NEGATIVE.
   x^(3/5) = −8 → (⁵√(x³))⁵ = (−8)⁵ = −32 768 → ³√(x³) = ³√(−32 768) = −32
   check: (−32)^(3/5) = ((−32)^(1/5))³ = (−2)³ = −8  ✓
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.sc.q4",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-odd-over-odd-negative-answer",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: `<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;${xp(3, 5)} = −8`,
      },
      hint: {
        en: "Do not throw this one out because of the minus. Check BOTH numbers in the exponent first — if they are both odd, a negative answer is allowed, and then it is an ordinary reciprocal question.",
      },
      memo: [
        { type: "step", text: { en: "Both numbers in the exponent are ODD (3 and 5), so a negative answer is allowed here" }, ticks: ["ca"] },
        { type: "step", text: { en: `(<sup>5</sup>√(x³))<sup>5</sup> = (−8)<sup>5</sup> = −32&nbsp;768` }, ticks: ["s/f"] },
        { type: "answer", text: { en: "<sup>3</sup>√(x³) = <sup>3</sup>√(−32&nbsp;768) &nbsp;&nbsp;∴ x = −32" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;x = (−8)<sup>${f("5", "3")}</sup> = (<sup>3</sup>√(−8))<sup>5</sup> = (−2)<sup>5</sup> = −32` } },
        { type: "trap", text: {
          en: "WATCH OUT: there is <b>no ±</b> here. The ± comes from an EVEN numerator, and this numerator is 3. Writing x = ±32 hands in an answer that fails: 32<sup>3/5</sup> = 2³ = 8, not −8.",
        } },
      ],
      esplain: {
        en: "The minus sign is the whole test in this question, and it is allowed to stay. The bottom of the exponent is five, an odd root, and odd roots keep the sign of whatever is inside them. The top is three, an odd power, which also keeps the sign. So nothing in the chain forces the left-hand side to be positive, and a negative x is exactly what is needed. The tidiest route is her reciprocal: raise both sides to five thirds, take the cube root of minus eight to get minus two, then raise that to the fifth power to get minus thirty-two. Check it backwards if you like — the fifth root of minus thirty-two is minus two, and minus two cubed is minus eight.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SOLVE, and there is nothing to find. Her fourth worked example.
   x^(3/2) = −27: the denominator is even, so the left side is (√x)³,
   which is never negative.
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.sc.q5",
  chapter: CH,
  topic: "solution-count",
  archetype: "solve-rational-exponent-even-denominator-no-solution",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: `Solve for x: &nbsp;${xp(3, 2)} = −27, &nbsp;or show that the equation has no solution.`,
      },
      hint: {
        en: "The bottom number is the root. Write the left-hand side out as a root and a power and ask whether the root itself is ever allowed to be negative.",
      },
      memo: [
        { type: "step", text: { en: `The denominator is <b>2</b>, an EVEN number, so &nbsp;${xp(3, 2)} = (√x)³, &nbsp;and √x is never negative` }, ticks: ["ca"] },
        { type: "answer", text: { en: "(√x)³ can never equal −27 &nbsp;&nbsp;∴ <b>no solution</b>" }, ticks: ["a"] },
        { type: "trap", text: {
          en: `WATCH OUT: raising both sides to ${f("2", "3")} anyway hands you x = 9, and 9 does not work — 9<sup>${f("3", "2")}</sup> = (√9)³ = 27, which is <b>+</b>27. The reciprocal move hides the minus, exactly the way squaring both sides of a surd equation does. Her rule catches it before you start: an EVEN number anywhere in the exponent, with a negative on the right, means no solution.`,
        } },
      ],
      esplain: {
        en: "This one looks solvable and is not, which is why it is worth two marks rather than three. The bottom of the exponent is two, so the left-hand side starts with a square root, and a square root of a real number is never negative. Cubing something that is never negative still never gives a negative, so the left-hand side can never reach minus twenty-seven. There is no x that works. The dangerous move is to raise both sides to two thirds without thinking — that produces nine, which looks like an answer until you put it back and get plus twenty-seven. Checking your answer in the original equation catches it; her rule catches it sooner.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — HER CONTRAST. Same exponent, opposite signs.
   A: x^(4/3) = −16 → even numerator, negative side → no solution
   B: x^(4/3) = 16  → (∛(x⁴))³ = 16³ = 4096 → ⁴√(x⁴) = ⁴√4096 = 8 → x = ±8
   check: (±8)^(4/3) = ((±8)^(1/3))⁴ = (±2)⁴ = 16  ✓
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.sc.q6",
  chapter: CH,
  topic: "solution-count",
  archetype: "identify-the-impossible-equation-then-solve-its-twin",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "One of the two equations has no real solution. State which one, and give a reason.",
      },
      hint: {
        en: "The exponent is the same in both, so the exponent alone cannot decide it. What is different is the sign on the right — pair that with the number on TOP of the exponent.",
      },
      memo: [
        { type: "step", text: { en: `The numerator of the exponent is <b>4</b>, an EVEN number, so &nbsp;${xp(4, 3)} = (<sup>3</sup>√x)<sup>4</sup>, &nbsp;an even power` }, ticks: ["ca"] },
        { type: "answer", text: { en: "An even power is never negative &nbsp;∴ <b>A has no solution</b>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Putting the two equations side by side is the fastest way to see what her rule is really saying. The exponent has a four on top, which means the last thing that happens on the left-hand side is a fourth power, and a fourth power of any real number is zero or positive. Equation A asks that positive thing to equal minus sixteen, which nothing can do, so A is finished before you touch it. Equation B asks it to equal plus sixteen, which is perfectly reasonable. Nothing about the exponent changed between them — only the sign on the right, and that sign was enough to decide the whole question.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence solve the other equation.",
      },
      hint: {
        en: "Raise both sides to the power of the denominator, then take the fourth root. The same even numerator that killed A does a different job here — watch what it does to the final line.",
      },
      memo: [
        { type: "step", text: { en: `<b>B:</b> &nbsp;(<sup>3</sup>√(x<sup>4</sup>))³ = (16)³` }, ticks: ["s/f"] },
        { type: "step", text: { en: "<sup>4</sup>√(x<sup>4</sup>) = <sup>4</sup>√4096 = 8 &nbsp;&nbsp;— the numerator is <b>4</b>, an EVEN number, so the answer carries a <b>±</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = ±8" }, ticks: ["a"] },
        { type: "step", text: { en: `<b>OR</b> — the reciprocal route (same marks): &nbsp;x = 16<sup>${f("3", "4")}</sup> = (<sup>4</sup>√16)³ = 2³ = 8, &nbsp;and the even numerator gives &nbsp;x = ±8` } },
        { type: "trap", text: {
          en: "REMEMBER: the even numerator did BOTH jobs on this card. In (a) it made a negative right-hand side impossible; here, with a positive right-hand side, the very same 4 is what puts the ± on the answer. One rule, two outcomes, and the sign on the right is what chooses between them.",
        } },
      ],
      esplain: {
        en: "Equation B is an ordinary rational-exponent solve, and the neat part is that the number which ruled A out is the number that gives B two answers. Raise both sides to the power three to clear the cube root, and sixteen cubed is four thousand and ninety-six. Now take the fourth root of both sides: the fourth root of four thousand and ninety-six is eight. Because the power you are undoing is even, both plus eight and minus eight work, and you can check that — the cube root of minus eight is minus two, and minus two to the fourth is plus sixteen. So B has two solutions while A has none, and only the sign on the right side ever changed.",
      },
    },
  ],
};

/* THE TWO INTROS. `intro` belongs to the CARD, not to the question
   (js/exam/_cards.js makeCard takes it as its own argument), so they are
   exported here and handed to makeCard in js/exam/cards-eqn.js. q2's is
   the instruction that governs all three of its parts; q6's is the pair
   of equations both of its parts talk about. */
export const eqnSolutionCountIntros = {
  "eqn.sib.sc.q2": {
    en: "For each of the equations below, state whether it has <b>two</b> solutions, <b>one</b> solution or <b>no</b> solutions. Give a reason in each case. Do not solve them.",
  },
  "eqn.sib.sc.q6": {
    en: `Two equations, with the same exponent and only the sign on the right changed:<br><b>A:</b> &nbsp;${xp(4, 3)} = −16 &nbsp;&nbsp;&nbsp;<b>B:</b> &nbsp;${xp(4, 3)} = 16`,
  },
};

export const eqnSolutionCountSiblingQuestions = [q1, q2, q3, q4, q5, q6];
