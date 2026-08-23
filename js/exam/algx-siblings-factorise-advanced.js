/* ============================================================
   EXAM FOCUS — Algebraic Expressions · SIBLING CARDS for the tile
   "factorise-advanced" (Factorise: grouping & cubes).
   (EXAM-BUILD-DAY.md, 2026-08-23, wave 1, session A.)
   ------------------------------------------------------------
   SIX cards, easiest first, levels 1 → 3. No level-4 part anywhere.

   WHAT THE SIX COVER (the brief's list):
     q1  grouping in pairs, the plain version
     q2  sum and difference of two cubes, the plain version
     q3  grouping in pairs where the second pair needs a −1 taken out
     q4  cubes in disguise — 27x³ + 1 and x⁶ − 8
     q5  a trinomial disguised as a quadratic in x², and one disguised
         as a quadratic in (x + 2) — her `let K = …` substitution
     q6  a “factorise completely” chain: common factor first, then a
         difference of two squares, then another one

   METHOD. Grade 10 factorising is not in her own notes
   (METHODS-algebra.md, Part E), so the method is the ordinary CAPS
   textbook one written to her house rules from Part 0 of that file.
   ONE thing here IS hers and is used verbatim: the substitution
   notation from Part A4 — **`let K = …`** in capital K, and ALWAYS
   substituted back at the end ("a generated solution that leaves the
   answer in K is wrong"). q5(b) is built on it.

   SCOPE. The SAG's Grade 10 Term 1 list (Appendix H, curriculum
   statement 5) names exactly these two extra types on top of the
   Grade 9 ones: grouping in pairs, and sum and difference of two
   cubes. Nothing here goes past that wall — the cubic factor that
   comes out of a sum of cubes is left alone, and x² − 2 is as far as
   a rational factorisation goes.

   NO DIAGRAMS. lostQuest is the documented exam-only placeholder (see
   js/exam/algx-siblings-expand.js's header for the mechanism).
   ============================================================ */

const PAPER = "siblings";
const CH = "algx";
const LOST = { chapter: CH, quest: "PENDING-algx-is-exam-only-no-drill-round" };

/* ---------------------------------------------------------------
   q1 — GROUPING IN PAIRS, plain.
   (a) 3x + 3y + ax + ay   = (x + y)(3 + a)
   (b) x² − xy + 4x − 4y   = (x − y)(x + 4)
   --------------------------------------------------------------- */
const q1 = {
  id: "algx.sib.fa.q1",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-grouping-in-pairs",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>3x + 3y + ax + ay",
      },
      hint: {
        en: "Four terms and nothing common to all four — so split them into two pairs and factorise each pair on its own. If you have done it right, the same bracket will appear twice.",
      },
      memo: [
        { type: "step", text: { en: "Four terms, nothing common to all four &nbsp;⟹&nbsp; group them in pairs: &nbsp;(3x + 3y) + (ax + ay)" } },
        { type: "step", text: { en: "= 3(x + y) + a(x + y) &nbsp;&nbsp;— the same bracket came out of both pairs" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x + y)(3 + a)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the matching bracket is the SIGN that you grouped correctly. If the two pairs leave different brackets behind, do not force it — swap the middle two terms round and try the pairs the other way.",
        } },
      ],
      esplain: {
        en: "Four terms is the signal for grouping. You look for a common factor in all four, find none, and so you split the job in half instead. Take the first two terms and factorise them, then take the last two and factorise those. If the grouping is right, both halves leave the same bracket standing, and that bracket is then a common factor of the whole thing — exactly like a number or a letter would be. Pull it out to the front and collect what was left in front of each pair into the second bracket. The order of the two final brackets does not matter, so (3 + a)(x + y) is equally correct.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "x² − xy + 4x − 4y",
      },
      hint: {
        en: "Group the first two and the last two. The first pair shares an x; the second pair shares a 4. Check that both leave the same bracket.",
      },
      memo: [
        { type: "step", text: { en: "= x(x − y) + 4(x − y)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x − y)(x + 4)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The two pairs here are not obviously related, which is why the method feels like a leap of faith until it lands. Out of the first pair comes an x, leaving x minus y behind. Out of the second pair comes a 4, leaving x minus y behind as well. The moment the two brackets match, the rest is automatic. Watch the sign inside the first pair: x² minus xy has a minus, so the bracket is x minus y and not x plus y — and that minus has to carry through to the second pair too, which is why it is +4 and not −4 out front. Multiply back if you want to be sure.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — SUM AND DIFFERENCE OF TWO CUBES, plain.
   (a) x³ + 8    = (x + 2)(x² − 2x + 4)
   (b) 27a³ − 64 = (3a − 4)(9a² + 12a + 16)
   --------------------------------------------------------------- */
const q2 = {
  id: "algx.sib.fa.q2",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-sum-and-difference-of-two-cubes",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Factorise the following fully.<br><br>x³ + 8",
      },
      hint: {
        en: "Two terms, both perfect cubes. The short bracket carries the same sign as the question; the long bracket goes square, minus product, plus square — and the middle sign is always the opposite one.",
      },
      memo: [
        { type: "step", text: { en: "Both terms are cubes: &nbsp;x³&nbsp; and&nbsp; 8 = 2³, &nbsp;so &nbsp;a³ + b³ = (a + b)(a² − ab + b²)&nbsp; with a = x and b = 2." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (x + 2)(x² − 2x + 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the last term of the long bracket is +4, not +2 — it is b SQUARED. And the middle term has no 2 in front of it: it is −ab, not −2ab. That is what makes it different from (x + 2)².",
        } },
      ],
      esplain: {
        en: "Cubes come with a formula you simply learn, and there is a rhythm that makes it stick. The short bracket copies the sign in the question, so a plus stays a plus. The long bracket always goes first thing squared, then the two things multiplied, then the second thing squared — and the sign in the middle is the opposite of the one in the short bracket. Here that gives x squared, minus 2x, plus 4. The long bracket never factorises further in Grade 10, so once you have written it you are finished. If you doubt the formula, expand it once slowly: everything cancels except x³ and 8.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "27a³ − 64",
      },
      hint: {
        en: "Both terms are cubes again — ask what cubes to give 27a³ and what cubes to give 64. This time the short bracket carries a minus, so the middle of the long bracket carries a plus.",
      },
      memo: [
        { type: "step", text: { en: "27a³ = (3a)³&nbsp; and&nbsp; 64 = 4³, &nbsp;so &nbsp;a³ − b³ = (a − b)(a² + ab + b²)&nbsp; with the two cube roots 3a and 4." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (3a − 4)(9a² + 12a + 16)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The only extra work here is finding the two cube roots. The cube root of 27a³ is 3a, because 3 times 3 times 3 is 27 and a times a times a is a³. The cube root of 64 is 4. After that the formula does everything. Short bracket: 3a minus 4, copying the minus in the question. Long bracket: 3a squared is 9a², then 3a times 4 is 12a with a plus because the short bracket had a minus, then 4 squared is 16. Learn the cubes of 1, 2, 3, 4 and 5 — that is 1, 8, 27, 64 and 125 — and you will spot these on sight.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — GROUPING WHERE A PAIR NEEDS A −1 TAKEN OUT.
   (a) 2m³ − 6m² + 5m − 15 = (m − 3)(2m² + 5)
   (b) ab − 3a − b + 3     = (b − 3)(a − 1)
   --------------------------------------------------------------- */
const q3 = {
  id: "algx.sib.fa.q3",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-grouping-in-pairs-with-a-negative-second-pair",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Factorise the following fully.<br><br>2m³ − 6m² + 5m − 15",
      },
      hint: {
        en: "Group the first two and the last two. Take out the biggest thing you can from each pair and make sure the leftover brackets are identical before you go on.",
      },
      memo: [
        { type: "step", text: { en: "Group in pairs: &nbsp;(2m³ − 6m²) + (5m − 15)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2m²(m − 3) + 5(m − 3) &nbsp;&nbsp;— both pairs left the same bracket behind" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (m − 3)(2m² + 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2m² + 5 does not factorise further. A sum of two terms with no common factor and no minus between them is finished — do not go hunting for brackets that are not there.",
        } },
      ],
      esplain: {
        en: "Grouping works whatever the powers are, and here the first pair carries an m² between them while the second pair carries nothing but a 5. Take 2m² out of the first pair and you are left with m minus 3. Take 5 out of the second pair and you are left with m minus 3 again. That match is the whole method paying off. Now the bracket m minus 3 is common, so out it comes, and the two leftovers — 2m² and +5 — go into the second bracket together. Look at that second bracket once more before you stop: 2m² + 5 has no common factor and is not a difference of squares, so it stays as it is.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "ab − 3a − b + 3",
      },
      hint: {
        en: "The second pair starts with a minus. Take out −1 rather than +1, so that the bracket it leaves matches the first one.",
      },
      memo: [
        { type: "step", text: { en: "= a(b − 3) − 1(b − 3) &nbsp;&nbsp;— taking out −1 from the second pair flips both its signs and makes the brackets match" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (b − 3)(a − 1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: taking out +1 gives a(b − 3) + 1(−b + 3), and the two brackets no longer match. When the third term is negative, take out −1 — and remember there IS a −1 there, so the second bracket is (a − 1), not (a).",
        } },
      ],
      esplain: {
        en: "This is the grouping question with the one sign trap in it. The first pair gives a times b minus 3 without any trouble. The second pair is minus b plus 3, and if you take out a plain 1 you get a bracket reading minus b plus 3, which is the reverse of the first one. Take out minus 1 instead: minus b divided by minus 1 is b, and plus 3 divided by minus 1 is minus 3, so the bracket becomes b minus 3 and the two now match. Because the thing you took out was minus 1, that is what goes into the second bracket alongside the a. Never leave the 1 off — an empty space is not the same as a one.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — CUBES IN DISGUISE.
   (a) 27x³ + 1 = (3x + 1)(9x² − 3x + 1)
   (b) x⁶ − 8   = (x² − 2)(x⁴ + 2x² + 4)
   --------------------------------------------------------------- */
const q4 = {
  id: "algx.sib.fa.q4",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-cubes-in-disguise-including-a-sixth-power",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Factorise the following fully.<br><br>27x³ + 1",
      },
      hint: {
        en: "A 1 is a perfect cube as well — it is one cubed. Find the two cube roots first and then let the formula do the rest.",
      },
      memo: [
        { type: "step", text: { en: "27x³ = (3x)³&nbsp; and&nbsp; 1 = 1³, &nbsp;so &nbsp;a³ + b³ = (a + b)(a² − ab + b²)&nbsp; with a = 3x and b = 1." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; (3x + 1)(9x² − 3x + 1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (3x)² is 9x², not 3x². The whole term gets squared, coefficient and all — this is the single most common slip in the long bracket.",
        } },
      ],
      esplain: {
        en: "The 1 is what makes this one feel unfamiliar, and it should not. One is a perfect cube, a perfect square and a perfect anything, because one multiplied by itself any number of times is still one. So the two cube roots are 3x and 1, and after that you are running the same formula as before. Short bracket copies the plus: 3x plus 1. Long bracket: 3x squared, which is nine x squared; then 3x times 1 with the opposite sign, which is minus 3x; then 1 squared, which is 1. If you are ever unsure whether you have the right long bracket, expand it — the cross terms must cancel and leave only the two cubes.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "x⁶ − 8",
      },
      hint: {
        en: "Ask which power of x is a perfect cube. x⁶ is something cubed — you only have to work out what that something is.",
      },
      memo: [
        { type: "step", text: { en: "x⁶ = (x²)³, &nbsp;because you multiply the exponents: &nbsp;x² cubed is x⁶. &nbsp;And 8 = 2³." }, ticks: ["s/f"] },
        { type: "step", text: { en: "So &nbsp;a³ − b³ = (a − b)(a² + ab + b²)&nbsp; with a = x² and b = 2." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴&nbsp; (x² − 2)(x⁴ + 2x² + 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x²)² is x⁴, not x⁶ — a power raised to a power MULTIPLIES the exponents, so 2 × 2 = 4. And stop at x² − 2: 2 is not a perfect square, so that bracket is finished in Grade 10.",
        } },
      ],
      esplain: {
        en: "The whole question is one act of noticing: a sixth power is a cube, because six is three twos. So x⁶ is x squared, cubed. Once you have said that out loud, everything else is the difference-of-cubes formula with a equal to x squared instead of a single letter. Short bracket: x squared minus 2. Long bracket: x squared squared is x to the fourth, then x squared times 2 is 2x squared with a plus, then 2 squared is 4. Two things people try that do not work: treating it as a difference of squares first, which needs both terms to be squares and 8 is not one, and trying to factorise x² − 2, which cannot be done with whole numbers.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TRINOMIALS IN DISGUISE (her `let K = …`, Part A4).
   (a) x⁴ − 13x² + 36        = (x − 2)(x + 2)(x − 3)(x + 3)
   (b) (x + 2)² − 5(x + 2) − 24 = (x − 6)(x + 5)
   --------------------------------------------------------------- */
const q5 = {
  id: "algx.sib.fa.q5",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-trinomial-disguised-as-a-quadratic-in-x-squared-or-in-a-bracket",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "Factorise the following fully.<br><br>x⁴ − 13x² + 36",
      },
      hint: {
        en: "Cover the x² with your hand and it is an ordinary trinomial. Factorise it that way first — and then look hard at both brackets you get, because neither of them is finished.",
      },
      memo: [
        { type: "step", text: { en: "Let K = x², &nbsp;so&nbsp; K² = x⁴&nbsp; and the expression is &nbsp;K² − 13K + 36." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Two numbers with product +36 and sum −13: &nbsp;−4 and −9 &nbsp;⟹&nbsp; (K − 4)(K − 9) = (x² − 4)(x² − 9)" }, ticks: ["ca"] },
        { type: "step", text: { en: "Both brackets are now a difference of two squares, so keep going." } },
        { type: "answer", text: { en: "∴&nbsp; (x − 2)(x + 2)(x − 3)(x + 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: stopping at (x² − 4)(x² − 9) is the trap. “Fully” means keep factorising until nothing left can be broken down — and here that is FOUR brackets, not two. Always substitute K back before you look for the next step.",
        } },
      ],
      esplain: {
        en: "Two ideas stacked on top of each other, and the way through is to do them one at a time. First, notice that x to the fourth is x squared, squared. So if you let K stand for x squared, the whole thing reads K squared minus thirteen K plus thirty six, which is an ordinary trinomial you can factorise in your sleep: product thirty six, sum minus thirteen, so minus four and minus nine. Now swap x squared back in — never leave an answer in K. Second, look at what you have: x squared minus four and x squared minus nine are both a difference of two squares, so each splits again. Four brackets is the finished answer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "(x + 2)² − 5(x + 2) − 24",
      },
      hint: {
        en: "Something is repeating. Give the repeated bracket a short name, factorise the easy trinomial that appears, and only then swap the bracket back in.",
      },
      memo: [
        { type: "step", text: { en: "Let K = (x + 2), &nbsp;so the expression is &nbsp;K² − 5K − 24." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Two numbers with product −24 and sum −5: &nbsp;−8 and +3 &nbsp;⟹&nbsp; (K − 8)(K + 3)" }, ticks: ["ca"] },
        { type: "step", text: { en: "Substitute back: &nbsp;(x + 2 − 8)(x + 2 + 3)" } },
        { type: "answer", text: { en: "∴&nbsp; (x − 6)(x + 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an answer left in K earns nothing. Always swap the bracket back in AND tidy each bracket — (x + 2 − 8) is not a finished answer, (x − 6) is.",
        } },
      ],
      esplain: {
        en: "When the same bracket keeps appearing, give it a name and the question shrinks. Call x plus 2 by the name K, and what is left is K squared minus five K minus twenty four — a plain trinomial. The product is negative, so the two numbers have opposite signs; the sum is minus five, so the bigger one is negative: minus eight and plus three. Then comes the step that carries the last mark. Swap K back for x plus 2 in both brackets and simplify each one: x plus 2 minus 8 is x minus 6, and x plus 2 plus 3 is x plus 5. Expanding the original from scratch works too and gives x² − x − 30, the same answer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — “FACTORISE COMPLETELY”: common factor, then a difference of
   two squares, then another one.
   (a) 5x³ − 45x = 5x(x − 3)(x + 3)
   (b) 2x⁴ − 32  = 2(x − 2)(x + 2)(x² + 4)
   --------------------------------------------------------------- */
const q6 = {
  id: "algx.sib.fa.q6",
  chapter: CH,
  topic: "factorise-advanced",
  archetype: "gr10-factorise-completely-common-factor-then-difference-of-squares-chain",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "Factorise the following completely.<br><br>5x³ − 45x",
      },
      hint: {
        en: "Common factor first, always. Once it is out, look at what is left inside the bracket and ask whether it can still be broken down.",
      },
      memo: [
        { type: "step", text: { en: "Common factor first: &nbsp;5x&nbsp; goes into both terms &nbsp;⟹&nbsp; 5x(x² − 9)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x² − 9 is a difference of two squares &nbsp;∴&nbsp; 5x(x − 3)(x + 3)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 5x(x² − 9) is not the end. The word “completely” is the examiner telling you there is another step — and there always is when a bracket is a difference of two squares.",
        } },
      ],
      esplain: {
        en: "There is an order to factorising and it never changes: common factor first, then look at the shape of what is left. Here 5 goes into both numbers and x goes into both terms, so 5x comes out. What remains is x squared minus 9, which is two perfect squares with a minus between them, so it splits into two brackets. Notice how much easier the second step became because you did the first one — trying to break 5x³ − 45x apart without taking the 5x out is far messier. The word completely, or fully, is a signal to keep checking every bracket until none of them can move.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "2x⁴ − 32",
      },
      hint: {
        en: "Take the number out first — it is bigger than it looks. Then it is a difference of two squares, and one of the two brackets you get can go again.",
      },
      memo: [
        { type: "step", text: { en: "Common factor 2: &nbsp;= 2(x⁴ − 16)" }, ticks: ["ca"] },
        { type: "step", text: { en: "x⁴ = (x²)²&nbsp; and&nbsp; 16 = 4², &nbsp;so&nbsp; = 2(x² − 4)(x² + 4)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x² − 4 splits again &nbsp;∴&nbsp; 2(x − 2)(x + 2)(x² + 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: x² + 4 is a SUM of two squares and does not factorise. Only the minus bracket splits again — chasing the plus one is wasted time and cannot earn a mark.",
        } },
      ],
      esplain: {
        en: "Three steps, and each one only becomes visible once the step before it is done. Take out the 2 and you are looking at x to the fourth minus sixteen. Both of those are perfect squares — x to the fourth is x squared squared, and sixteen is four squared — so it splits into x squared minus four times x squared plus four. Now check both new brackets. The minus one is another difference of two squares and splits into x minus 2 and x plus 2. The plus one is a sum of squares, and sums of squares never factorise, so it stays exactly as it is. Four factors altogether, counting the 2 out front, which is part of the answer.",
      },
    },
  ],
};

export const algxFactoriseAdvancedSiblingQuestions = [q1, q2, q3, q4, q5, q6];
