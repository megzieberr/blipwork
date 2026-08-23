/* ============================================================
   EXAM FOCUS — Algebraic Expressions · THE LEVEL 4 ★ TILE
   ("Level 4 ★ — the brave round".)
   (EXAM-BUILD-DAY.md, 2026-08-23, her ruling 5: "Levels 1–3 on the
   normal tiles; every chapter gets a last tile Level 4 ★ holding mixed
   Level-4 questions for that chapter. The low achievers must never
   meet a ★ while drilling basics." Wave 1, session A.)
   ------------------------------------------------------------
   SEVEN cards. EVERY card carries at least one level-4 part, and no
   part anywhere here is below level 3 — the wall verify-exam.html
   Part 13 enforces. Lead-in parts appear only where the ★ part
   genuinely depends on them, which on this tile is almost always:
   six of the seven are a "hence" pair, where part (a) does the
   algebra and part (b) makes it do something un-cued.

   WHAT LEVEL 4 MEANS HERE: un-cued, multi-step, "show that",
   real-world wrappers, and questions asked backwards. The brief's
   five shapes, all present:
     q1  a "show that" identity, then used to solve
     q2  a fraction simplification whose answer evaluates a huge
         number without a calculator (her Sept P1 2025 archetype —
         the 987654328² − 987654326 × 987654330 flavour, fresh
         numbers)
     q3  a disguised cube: the chain x³ − 8 → x⁶ − 64
     q4  a real-world wrapper, reverse-engineered (area given, find x)
     q5  simplify, then solve
     q6  "for which values of x is the expression undefined / equal to
         zero" — needing BOTH top and bottom factorised, and needing
         the learner to notice that one root is forbidden
     q7  a grouped difference of two squares that needs two ideas at
         once, twice

   METHOD + VOICE: the CAPS Grade 10 method, written to her house
   rules from METHODS-algebra.md Part 0 (the ∴ habit, real minus,
   decimal comma, marks on the written steps), with her own
   vocabulary where it is genuinely hers — **undefined** for a zero
   denominator (Part 0.3), **caged** for a + or − safely inside a
   bracket (Part A3), **limits** for the restrictions (Part B2).
   Every number is fresh.

   NO DIAGRAMS. lostQuest is the documented exam-only placeholder (see
   js/exam/algx-siblings-expand.js's header for the mechanism).
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

/* ---------------------------------------------------------------
   q1 — A "SHOW THAT" IDENTITY, THEN USED.
   (a) (2x − 1)(2x + 1) − (2x − 3)² = 12x − 10
   (b) equal to zero ⟹ x = 5/6
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-show-that-identity-then-solve-for-zero",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 4,
      prompt: {
        en: "Show that &nbsp;(2x − 1)(2x + 1) − (2x − 3)² = 12x − 10&nbsp; for all values of x.",
      },
      hint: {
        en: "A “show that” is a one-way trip: start on the left-hand side and keep going until it turns into the right-hand side. Never start from the answer. Expand both products first and keep the second one caged in a bracket.",
      },
      memo: [
        { type: "step", text: { en: "Work on the LEFT-hand side only and drive it down to what is given." } },
        { type: "step", text: { en: "(2x − 1)(2x + 1) = 4x² − 1&nbsp; (difference of two squares) &nbsp;&nbsp;and&nbsp;&nbsp; (2x − 3)² = 4x² − 12x + 9" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LHS = 4x² − 1 − (4x² − 12x + 9) = 4x² − 1 − 4x² + 12x − 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 12x − 10 = RHS &nbsp;&nbsp;∴&nbsp; shown for all values of x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the second bracket reaches all three terms — the +9 becomes −9. If your x² does not cancel, that minus is where to look. And do not work from both ends towards the middle: a “show that” starts on one side only.",
        } },
      ],
      esplain: {
        en: "Showing that two expressions are always equal is different from solving an equation. You are not looking for a value of x — you are proving that no value of x could ever break it. The way to earn the marks is to pick one side, usually the messier one, and turn it into the other side line by line. Here the left side has two products in it. The first is a pair of twins, so the difference-of-squares shortcut gives four x squared minus one. The second is a square, so it gives three terms. Then the minus in front of that bracket flips all three signs, the x squared terms cancel, and what is left is exactly the right-hand side.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence determine the value of x for which &nbsp;(2x − 1)(2x + 1) − (2x − 3)² = 0.",
      },
      hint: {
        en: "You already know what that whole left-hand side is equal to. Use it — the equation you actually have to solve is a one-line one.",
      },
      memo: [
        { type: "step", text: { en: "By (a) the expression IS 12x − 10, so the equation is &nbsp;12x − 10 = 0 &nbsp;⟹&nbsp; 12x = 10" }, ticks: ["ca"] },
        { type: "answer", text: { en: `∴&nbsp; x = ${sf("10", "12")} = ${sf("5", "6")}` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “hence” means use part (a). Expanding the whole thing again from scratch can still get you there, but it wastes the marks you already earned — and leaving the answer as 10 over 12 instead of 5 over 6 is not fully simplified.",
        } },
      ],
      esplain: {
        en: "This is the payoff for part (a) and it should take one line. You proved that the complicated left-hand side is only ever twelve x minus ten in disguise, so asking when the complicated thing is zero is the same as asking when twelve x minus ten is zero. Add ten to both sides, divide by twelve, and simplify the fraction by dividing top and bottom by two. Notice how much easier this is than trying to solve the original — you would have had to expand everything anyway, so part (a) was doing that work in advance. Whenever a question says hence, look back one part.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — FRACTION SIMPLIFICATION → A HUGE NUMBER, NO CALCULATOR.
   (a) (p² − q²)/(p + q) = p − q
   (b) (4567² − 4557²)/(4567 + 4557) = 4567 − 4557 = 10
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-simplify-a-fraction-then-evaluate-a-large-number-without-a-calculator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: `Simplify: &nbsp;${sf("p² − q²", "p + q")}&nbsp;&nbsp;&nbsp;(p ≠ −q)`,
      },
      hint: {
        en: "The top is two squares with a minus between them. Factorise it and see what the bottom matches.",
      },
      memo: [
        { type: "step", text: { en: `The top is a difference of two squares: &nbsp;= ${sf("(p − q)(p + q)", "p + q")}` }, ticks: ["ca"] },
        { type: "answer", text: { en: "The bracket (p + q) cancels &nbsp;∴&nbsp; p − q" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two letters instead of one changes nothing: a difference of two squares is a difference of two squares. The top factorises into p minus q times p plus q, and the bottom is already one of those two brackets, so it divides out and leaves p minus q behind. That is a startlingly simple answer for a startlingly ugly-looking fraction, and that gap between how it looks and what it is is exactly what the next part is going to exploit. The restriction p not equal to minus q is there because that is the one place the original fraction had a zero on the bottom.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: `<em>You may not use a calculator.</em><br>Hence calculate the value of &nbsp;${sf("4567² − 4557²", "4567 + 4557")}`,
      },
      hint: {
        en: "Do not square anything. Compare the shape of this fraction with the one in (a) and ask what p and q must be.",
      },
      memo: [
        { type: "step", text: { en: "This is exactly the expression in (a), with &nbsp;p = 4567&nbsp; and&nbsp; q = 4557." }, ticks: ["s/f"] },
        { type: "step", text: { en: "So the whole fraction is simply &nbsp;p − q = 4567 − 4557" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; 10" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: squaring 4567 by hand is not the method and earns nothing extra — the marks are for recognising the shape. Also check the bottom carefully: it must be p PLUS q. If it were 4567 − 4557 on the bottom, the answer would be p + q instead.",
        } },
      ],
      esplain: {
        en: "This is the question that shows what algebra is for. Written as numbers it looks like twenty minutes of long multiplication; written as letters it is one subtraction. The clue is always the same shape: two big numbers, one squared minus the other squared on top, and the same two numbers added on the bottom. Name them p and q, notice that part (a) has already done all the thinking, and simply subtract. Four thousand five hundred and sixty seven take away four thousand five hundred and fifty seven is ten. If the sight of big numbers ever makes you reach for a calculator in a no-calculator paper, that is the signal to look for the hidden shape instead.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A DISGUISED CUBE: THE CHAIN x³ − 8 → x⁶ − 64.
   (a) x³ − 8 = (x − 2)(x² + 2x + 4)
   (b) x⁶ − 64 = (x − 2)(x² + 2x + 4)(x + 2)(x² − 2x + 4)
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-difference-of-squares-then-both-cubes-a-sixth-power-chain",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "Factorise: &nbsp;x³ − 8",
      },
      hint: {
        en: "Two terms, both perfect cubes. The short bracket copies the sign; the long bracket goes square, product, square with the opposite sign in the middle.",
      },
      memo: [
        { type: "step", text: { en: "8 = 2³, &nbsp;so&nbsp; a³ − b³ = (a − b)(a² + ab + b²)&nbsp; with a = x and b = 2." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (x − 2)(x² + 2x + 4)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A difference of two cubes always splits into a short bracket and a long one. The short one holds the two cube roots with the same sign as the question, so here it is x minus 2. The long one is built in three pieces: the first root squared, the two roots multiplied, and the second root squared — and the sign in the middle is the opposite of the short bracket's, so it is a plus. That gives x squared plus two x plus four. The long bracket never factorises further at this level, so once you have written it you are finished. Keep this answer where you can see it; the next part needs it.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "Hence factorise &nbsp;x⁶ − 64&nbsp; completely.",
      },
      hint: {
        en: "x⁶ is a square AND a cube, and 64 is both too. One of those two roads leads somewhere you can finish and the other does not — try the squares first, and see where part (a) fits in.",
      },
      memo: [
        { type: "step", text: { en: "Squares FIRST: &nbsp;x⁶ = (x³)²&nbsp; and&nbsp; 64 = 8², &nbsp;so&nbsp; x⁶ − 64 = (x³ − 8)(x³ + 8)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now both brackets are cubes. (a) gives the first one, and the second is a SUM of cubes: &nbsp;x³ + 8 = (x + 2)(x² − 2x + 4)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x − 2)(x² + 2x + 4)(x + 2)(x² − 2x + 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: doing the CUBES first is the road that dies. x⁶ − 64 = (x²)³ − 4³ = (x² − 4)(x⁴ + 4x² + 16), and although x² − 4 splits again, x⁴ + 4x² + 16 cannot be broken with any Grade 10 tool — so you never reach the full four brackets. When a number is both a square and a cube, split the SQUARES first.",
        } },
      ],
      esplain: {
        en: "Sixty four is a square, being eight squared, and also a cube, being four cubed — and x to the sixth is both as well. So there are two ways in, and only one of them finishes. Take the squares road: x to the sixth minus sixty four is x cubed minus eight, times x cubed plus eight. Now look what you have — a difference of cubes, which part (a) already did, and a sum of cubes, which is the same formula with the signs swapped over. Four brackets in total, and none of the long ones can go further. The rule worth remembering is short: when something is both a square and a cube, do the square first.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — REAL-WORLD WRAPPER, ASKED BACKWARDS.
   (a) area = (2x + 5)(2x − 5) = 4x² − 25
   (b) 4x² − 25 = 119 ⟹ x² = 36 ⟹ x = 6 (x > 0)
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-real-world-rectangle-show-the-area-then-reverse-engineer-x",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "A rectangular vegetable patch is &nbsp;(2x + 5) metres long and (2x − 5) metres wide.<br><br>Show that the area of the patch is &nbsp;(4x² − 25) square metres.",
      },
      hint: {
        en: "Area of a rectangle is length times width. Look at the two brackets before you expand them — they are twins with one sign flipped.",
      },
      memo: [
        { type: "step", text: { en: "Area = length × width = (2x + 5)(2x − 5)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "The brackets are a difference of two squares &nbsp;∴&nbsp; area = (2x)² − 5² = 4x² − 25 &nbsp;m², as required" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (2x)² is 4x², not 2x². The 2 gets squared as well as the x — and if you had expanded the long way, the +10x and −10x would have cancelled, which is why there is no middle term.",
        } },
      ],
      esplain: {
        en: "The word problem is doing its best to hide a piece of ordinary algebra. Strip it back: a rectangle's area is length times width, so the area is the two brackets multiplied. Now look at those brackets before you start knocking on doors — they hold the same two things and differ only in the middle sign, which is the signature of a difference of two squares. So you can write the answer straight down: the first term squared minus the last term squared. Two x squared is four x squared, because the coefficient is squared too, and five squared is twenty five. The units are square metres, because two lengths were multiplied.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "The area of the patch is 119 m². Determine the value of x, given that x > 0.",
      },
      hint: {
        en: "Use the tidy form from (a) rather than the brackets — it gives you an equation with only one x in it. Then remember the question told you something about x that rules one answer out.",
      },
      memo: [
        { type: "step", text: { en: "From (a): &nbsp;4x² − 25 = 119 &nbsp;⟹&nbsp; 4x² = 144" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² = 36 &nbsp;⟹&nbsp; x = 6&nbsp; or&nbsp; x = −6" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x > 0 is given &nbsp;∴&nbsp; x = 6&nbsp;&nbsp;&nbsp;(patch is 17 m by 7 m, and 17 × 7 = 119 ✔)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: taking the square root gives TWO answers, plus and minus. Writing only x = 6 without ever showing the ±, or keeping x = −6, both lose a mark — and a patch cannot have a negative width anyway, so the condition x > 0 is the examiner telling you which one to keep.",
        } },
      ],
      esplain: {
        en: "This is the question asked backwards: you are given the answer, the area, and asked to find the ingredient. Part (a) turned the area into a single tidy expression with only one x in it, so put that equal to a hundred and nineteen and unwrap. Add twenty five, divide by four, and you have x squared equal to thirty six. Square-rooting always gives two answers, six and minus six, and you must show both before choosing. The condition x greater than zero is there to let you choose, and it also makes physical sense — a width of two times minus six minus five would be minus seventeen metres, which no vegetable patch has ever managed. Always sanity-check by putting the answer back.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SIMPLIFY, THEN SOLVE.
   (a) (x² − 4)/(x² + 4x + 4) = (x − 2)/(x + 2),  x ≠ −2
   (b) = 3 ⟹ x = −4
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-simplify-an-algebraic-fraction-then-solve-it-equal-to-a-number",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: `Simplify: &nbsp;${sf("x² − 4", "x² + 4x + 4")}, &nbsp;and state the value of x for which the original expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Factorise the top and the bottom before anything else. The bottom is a trinomial, and when you factorise it you may find the same bracket twice.",
      },
      memo: [
        { type: "step", text: { en: `Factorise both: &nbsp;x² − 4 = (x − 2)(x + 2)&nbsp; and&nbsp; x² + 4x + 4 = (x + 2)(x + 2), &nbsp;so&nbsp; = ${sf("(x − 2)(x + 2)", "(x + 2)(x + 2)")}` }, ticks: ["s/f"] },
        { type: "step", text: { en: "The bottom is zero when x + 2 = 0 &nbsp;⟹&nbsp; limits: &nbsp;x ≠ −2" }, ticks: ["ca"] },
        { type: "answer", text: { en: `One (x + 2) cancels &nbsp;∴&nbsp; ${sf("x − 2", "x + 2")}&nbsp;&nbsp;&nbsp;(x ≠ −2)` }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: only ONE of the two (x + 2) brackets on the bottom cancels, because the top only has one. Crossing out both leaves you with x − 2 and no denominator at all.",
        } },
      ],
      esplain: {
        en: "Factorise both floors before you decide anything. The top is a difference of two squares and gives x minus two times x plus two. The bottom is a trinomial whose two numbers are both two, so it is x plus two times x plus two — a perfect square. Write the restriction down now, while the bracket is still visible: x may not be minus two. Then cancel, and cancel carefully. There are two x plus two brackets on the bottom but only one on top, so only one pair goes. One is left downstairs, which is why the answer still has a denominator. The restriction stays attached to the answer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: `Hence determine the value of x for which &nbsp;${sf("x² − 4", "x² + 4x + 4")} = 3.`,
      },
      hint: {
        en: "Use the simplified fraction from (a) — it is far kinder to solve. Multiply both sides by the denominator, then keep the bracket whole while you expand.",
      },
      memo: [
        { type: "step", text: { en: `By (a) the equation becomes &nbsp;${sf("x − 2", "x + 2")} = 3 &nbsp;⟹&nbsp; x − 2 = 3(x + 2)&nbsp;&nbsp;&nbsp;(x ≠ −2)` }, ticks: ["s/f"] },
        { type: "step", text: { en: "x − 2 = 3x + 6 &nbsp;⟹&nbsp; −8 = 2x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = −4&nbsp;&nbsp;&nbsp;(allowed, since x ≠ −2)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this part IS an equation, so the denominator may now be cleared — but only because there is an equals sign. Part (a) had none, which is why the fraction had to stay there. And always check the answer against the limits before you write it down.",
        } },
      ],
      esplain: {
        en: "The difference between part (a) and part (b) is one small symbol, the equals sign, and it changes what you are allowed to do. In (a) there was no equation, so the fraction had to stay a fraction. In (b) there is, so you may multiply both sides by the denominator and clear it away. Use the simplified version, because x minus two over x plus two is much friendlier than the original. Multiply out, remembering that the three reaches both terms in the bracket, collect the x terms on one side and the numbers on the other, and divide. Then the last habit, every time: check the answer is not one of the forbidden values.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — UNDEFINED vs EQUAL TO ZERO (both floors factorised).
   (x² − 5x + 6)/(2x² − 8):  undefined at x = ±2;  zero only at x = 3,
   because x = 2 kills the denominator too.
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-undefined-versus-equal-to-zero-with-a-shared-root",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: `Consider the expression &nbsp;${sf("x² − 5x + 6", "2x² − 8")}<br><br>Determine the value(s) of x for which the expression is <b>undefined</b>.`,
      },
      hint: {
        en: "Undefined is about the bottom only. Take the common factor out of the denominator first — what is left is a difference of two squares.",
      },
      memo: [
        { type: "step", text: { en: "Undefined means the denominator is zero, so factorise it: &nbsp;2x² − 8 = 2(x² − 4) = 2(x − 2)(x + 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Set it equal to zero: &nbsp;2(x − 2)(x + 2) = 0. &nbsp;The 2 can never be zero, so one of the brackets must be." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; x = 2&nbsp; or&nbsp; x = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: take the common factor out FIRST. Jumping straight at 2x² − 8 as a difference of two squares gives (√2x − √8)(√2x + √8), which is not wrong but is not Grade 10 work and hides the two clean answers.",
        } },
      ],
      esplain: {
        en: "Undefined is one of the four things that can go wrong with an expression, and it means one thing only: a zero on the bottom. So look at the denominator alone and ignore the top completely. Take the 2 out first — it makes what is left, x squared minus four, a clean difference of two squares. Now the denominator is a product of three things, a 2 and two brackets, and a product is zero as soon as any one of its factors is zero. The 2 never is, so it comes down to the two brackets, giving x equals two and x equals minus two. Both are forbidden.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine the value(s) of x for which the expression is equal to <b>zero</b>.",
      },
      hint: {
        en: "A fraction is zero when its top is zero — but it also has to still exist. Factorise the numerator, then check every answer you get against part (a).",
      },
      memo: [
        { type: "step", text: { en: "A fraction equals zero when its NUMERATOR is zero (and the denominator is not): &nbsp;x² − 5x + 6 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x − 2)(x − 3) = 0 &nbsp;⟹&nbsp; x = 2&nbsp; or&nbsp; x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "But x = 2 makes the denominator zero as well — from (a) it is <b>undefined</b> there, so it must be thrown out. &nbsp;∴&nbsp; x = 3 only" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this is the whole question. Zero over zero is NOT zero — it is undefined, so a root of the top that is also a root of the bottom does not count. Giving both x = 2 and x = 3 loses the mark that matters.",
        } },
      ],
      esplain: {
        en: "Two different questions live in this card and they are easy to mix up. Undefined asks about the bottom; equal to zero asks about the top. A fraction is zero exactly when the number on top is zero, because zero divided by anything real is zero — but the anything has to be something, not another zero. So factorise the numerator, find its two roots, and then hold them up against the forbidden list from part (a). Two appears on both lists, which means at x equals two the fraction reads zero over zero, and that is undefined rather than zero. Only three survives. Checking the roots against the restrictions is the habit worth taking away.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q7 — GROUPED DIFFERENCE OF TWO SQUARES: two ideas at once, twice.
   (a) x² − y² + 7x + 7y   = (x + y)(x − y + 7)
   (b) 4a² − 9b² + 14a + 21b = (2a + 3b)(2a − 3b + 7)
   --------------------------------------------------------------- */
const q7 = {
  id: "algx.l4.q7",
  chapter: CH,
  topic: "level-4",
  archetype: "gr10-grouping-where-one-pair-is-a-difference-of-two-squares",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 4,
      prompt: {
        en: "Factorise completely: &nbsp;x² − y² + 7x + 7y",
      },
      hint: {
        en: "Four terms, so group them in pairs — but the first pair does not have a common factor. Ask what shape the first two terms make instead, and factorise that pair its own way.",
      },
      memo: [
        { type: "step", text: { en: "Group in pairs, and factorise each pair by whatever method fits it: &nbsp;(x² − y²) + (7x + 7y)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The first pair is a difference of two squares; the second has a common factor: &nbsp;= (x − y)(x + y) + 7(x + y)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The bracket (x + y) is common to both terms &nbsp;∴&nbsp; (x + y)(x − y + 7)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the second bracket has THREE terms in it — (x − y) from the first piece and the 7 from the second. Writing (x + y)(x − y)(7) treats a sum as a product and is a different expression altogether.",
        } },
      ],
      esplain: {
        en: "Grouping in pairs usually means taking a common factor out of each pair, and this question quietly breaks that expectation. The first pair, x squared minus y squared, has no common factor at all — but it does have a shape, and the shape is a difference of two squares, so it factorises into x minus y times x plus y. The second pair has a common factor of seven, leaving x plus y. Now look: the bracket x plus y is standing in both terms, so it comes out to the front. What was left beside it in each term goes into the second bracket, and there were two different things, so that bracket has three terms in it.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "Factorise completely: &nbsp;4a² − 9b² + 14a + 21b",
      },
      hint: {
        en: "The same idea in a heavier disguise. Factorise the first pair as a difference of two squares, then take a common factor out of the last two — and check whether a bracket appears in both.",
      },
      memo: [
        { type: "step", text: { en: "Group in pairs: &nbsp;(4a² − 9b²) + (14a + 21b)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (2a − 3b)(2a + 3b) + 7(2a + 3b) &nbsp;&nbsp;— the difference of two squares, then the common factor 7" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (2a + 3b)(2a − 3b + 7)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the common factor of 14a + 21b is 7, not 7a and not 7b — 7 is the only thing that divides into both. Taking out the wrong one leaves a bracket that does not match the first pair, and then the question looks impossible.",
        } },
      ],
      esplain: {
        en: "Everything that worked in part (a) works here; only the numbers are heavier. The first two terms are both perfect squares with a minus between them, so they split into two a minus three b times two a plus three b. The last two terms share a factor of seven — check it: seven into fourteen is two, seven into twenty one is three — leaving two a plus three b. That bracket now appears in both halves, which is the sign that the grouping was right. Pull it out and collect what is left: the bracket two a minus three b from the first piece and the seven from the second, giving a three-term second bracket.",
      },
    },
  ],
};

export const algxLevel4Questions = [q1, q2, q3, q4, q5, q6, q7];
