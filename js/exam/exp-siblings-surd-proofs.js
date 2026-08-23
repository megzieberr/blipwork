/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "surd-proofs" (Surd "show that" & number tricks).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   A BRAND-NEW TILE. Six cards, none cut from an existing question.

   WHY THIS TILE EXISTS. Every surveyed Paper 1 has a surd item where
   the ANSWER is printed in the question and the marks are for the
   journey — "show that", "prove that", or a huge-number arithmetic
   trick that a calculator cannot help with. Two such items already
   live in the chapter (exp.fsm.t1q1(b) and exp.cr.q1(d)) but both sit
   on the rationalise tile, because rationalising is what they are
   really about. Nothing anywhere teaches the OTHER kinds: recognising
   a squared bracket hidden under a root, a difference of squares
   hidden inside eighteen-digit numbers, a proof in letters, comparing
   two surds without a calculator, or deciding whether a finished
   answer is rational.

   THE SIX:
     q1  the plain "show that" over a monomial surd, with both roads
         under OR;
     q2  √(11 + 6√2) = 3 + √2 — the middle term is what names the two
         pieces; the square-both-sides road rides under OR;
     q3  the big-number difference-of-squares trick (fresh numbers);
     q4  a proof in letters: (√a + √b)² − (√a − √b)² = 4√(ab);
     q5  which is bigger, 2√6 or 5 — compare the squares, with a
         reason;
     q6  simplify, then say whether the answer is rational, with a
         reason.

   METHOD: METHODS-algebra.md, hers verbatim — A16 a "show that" is
   worked from ONE side and never from the answer backwards; A8 prime
   factors and "tickets out"; A9 the surd laws and the BIG NO-NO;
   A10 difference of squares first, and a squared binomial keeping its
   middle term; F2 (her ruling) — √ used for simplifying carries no ±;
   F5 — where two roads are equally marked, both are shown, the second
   under OR.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block" and its "show that" items; SURVEY-Her-2025-Assessments.md
   Test 6 Q2 (the huge-number difference-of-squares trick) and Test 4
   Q1 ("show that … can be written as 2 + √2"); SURVEY-Nov-P1.md Q2(b)
   "prove a surd identity, two memo methods (OR) accepted". Every
   number here is fresh.

   LEVELS: parts run 1, 3, 3, 2, 2, 1 + 2 — two level 1, three level 2,
   two level 3. NOTHING here is level 4: this is a normal tile.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* A nine-digit number written with her thin-space thousands has to be
   ONE atom, or js/ui.js's formula line-breaker turns each group into its
   own inline-block and the phone splits the number across two lines
   (seen at 375 px on the first shoot, 2026-08-23). A pre-built
   .nowrap span is swallowed whole by the breaker — that is exactly the
   escape hatch its header documents. */
const N = s => `<span class="nowrap">${s}</span>`;
const A   = N("86&nbsp;420&nbsp;865");
const A3M = N("86&nbsp;420&nbsp;862");
const A3P = N("86&nbsp;420&nbsp;868");

/* ---------------------------------------------------------------
   q1 — show that (√18 + √2)/√2 = 4. Two roads, both hers.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.sp.q1",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "show-that-a-surd-fraction-equals-a-whole-number",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Show that &nbsp;(√18 + √2)/√2 = 4",
      },
      hint: {
        en: "Start on the left-hand side and drive it down to the 4 — never the other way round. Simplify √18 first and see how many lots of √2 you are really holding.",
      },
      memo: [
        { type: "step", text: { en: "A “show that” is worked from ONE side only — start on the left and drive it down to what you were given." } },
        { type: "step", text: { en: "√18 = √(3² · 2) = 3√2 &nbsp;&nbsp;— the pair of 3s has a <b>ticket out</b>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (3√2 + √2)/√2 = 4√2/√2 &nbsp;&nbsp;— three of them plus one of them is four of them" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 4 &nbsp;as required" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — split the fraction first (same marks): &nbsp;(√18 + √2)/√2 = √18/√2 + √2/√2 = √(18/2) + 1 = √9 + 1 = 3 + 1 = 4" } },
        { type: "trap", text: {
          en: "WATCH OUT: do not start from the 4 and work backwards. A “show that” hands you the destination, so every mark is for the journey — starting at the answer assumes the very thing you were asked to prove.",
        } },
      ],
      esplain: {
        en: "The reason this comes out so cleanly is that root eighteen and root two are helpings of the same thing. Eighteen is nine times two, the nine is a pair of threes, so a 3 walks out of the root and leaves a root two behind. Now the top reads three root two plus one root two, which is four root two, and dividing by root two leaves a plain 4. Keeping that invisible 1 in front of the second root two is her habit and it is worth copying — it turns the addition into ordinary counting instead of guesswork. The second road is just as good: a root divided by a root is the root of the division, so root eighteen over root two is root nine, which is 3. Same destination, different scenery.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — show that √(11 + 6√2) = 3 + √2. The middle term names the
   pieces; squaring both sides rides under OR.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.sp.q2",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "show-that-a-nested-surd-is-a-simple-binomial",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;√(11 + 6√2) = 3 + √2",
      },
      hint: {
        en: "The only way a root sign disappears is if what is underneath is a perfect square. Try to write 11 + 6√2 as a bracket squared — and let the middle term tell you what the two pieces inside that bracket are.",
      },
      memo: [
        { type: "step", text: { en: "Work the left-hand side only. A root only cancels if what is underneath is something <b>squared</b>, so the job is to find that bracket." } },
        { type: "step", text: { en: "In (p + q)² the middle term is 2pq. Here the middle term is 6√2 = 2 × 3 × √2, &nbsp;so the two pieces are 3 and √2." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Check the outside terms:<br>(3 + √2)² = 3² + 2(3)(√2) + (√2)² = 9 + 6√2 + 2 = 11 + 6√2" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ √(11 + 6√2) = √((3 + √2)²)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 3 + √2 &nbsp;as required" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — square both sides (same marks): &nbsp;(3 + √2)² = 9 + 6√2 + 2 = 11 + 6√2, &nbsp;and both √(11 + 6√2) and 3 + √2 are positive, so the two must be equal." } },
        { type: "trap", text: {
          en: "WATCH OUT: the MIDDLE term is what identifies the two pieces. In (p + q)² it is 2pq, so 6√2 must be 2 × p × q — with p = 3 and q = √2 it fits exactly. Guessing a bracket without checking the middle term is how this question goes wrong.",
        } },
      ],
      esplain: {
        en: "A root inside a root looks frightening and it is really a puzzle with one clue. The only way a square root sign can vanish is if what sits underneath is a perfect square, so the question is secretly asking: what bracket, when squared, gives eleven plus six root two? Squaring a bracket gives three pieces — first squared, twice first times second, second squared — and the middle piece is the giveaway. Six root two has to be two times something times something, and the only sensible split is 2 times 3 times root two. Test it: 3 squared is 9, root two squared is 2, and 9 plus 2 is the 11 you needed. The bracket fits, the root cancels it, and the proof is finished. Note there is no plus-or-minus anywhere: you are simplifying, not solving.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — the big-number difference-of-squares trick. Fresh numbers.
   a = 86 420 865; a² − (a − 3)(a + 3) = 9.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.sp.q3",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "huge-number-difference-of-squares-shortcut",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;" + N("86&nbsp;420&nbsp;865²") + " − " + A3M + " × " + A3P + " = 9",
      },
      hint: {
        en: "Nobody is expected to multiply those out. Look at how far the second and third numbers sit from the first one, give the first one a letter, and write the other two in terms of it.",
      },
      memo: [
        { type: "step", text: { en: "Never multiply these out. Give the middle-sized number a name: &nbsp;let a = " + A + "." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Each of the other two sits 3 away from it:<br>a − 3 = " + A3M + " &nbsp;and&nbsp; a + 3 = " + A3P }, ticks: ["ca"] },
        { type: "step", text: { en: "So the expression is &nbsp;a² − (a − 3)(a + 3), &nbsp;and (a − 3)(a + 3) is a <b>diff in □'s</b> = a² − 9." }, ticks: ["ca"] },
        { type: "answer", text: { en: "= a² − (a² − 9) = a² − a² + 9 = 9 &nbsp;as required" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the bracket reaches BOTH terms — a² − (a² − 9) is a² − a² + 9, not a² − a² − 9. And if any of those huge numbers is still on your page at the end, something has gone wrong: every one of them is supposed to cancel.",
        } },
      ],
      esplain: {
        en: "This is a question about noticing, not about arithmetic. The three numbers are almost the same, and the moment you spot that the second is three less and the third is three more than the first, the whole thing turns into a piece of algebra you already know. Call the middle one a. Then you are asked for a squared take away a minus three times a plus three — and that product is the difference of two squares, so it is a squared minus nine. Subtracting it means subtracting a squared and adding nine back, the two a squareds annihilate each other, and a plain 9 is all that survives. The 9 is not a coincidence either: it is the gap of 3 squared, so the same trick with a gap of 1 would leave 1, and a gap of 2 would leave 4.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — a proof in letters:
   (√a + √b)² − (√a − √b)² = 4√(ab).
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.sib.sp.q4",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "prove-a-surd-identity-in-letters-two-squared-binomials",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Prove that, for a ≥ 0 and b ≥ 0: &nbsp;(√a + √b)² − (√a − √b)² = 4√(ab)",
      },
      hint: {
        en: "Work the left-hand side only. Both brackets are squared, so both keep a middle term — write each one out in three pieces before you subtract anything.",
      },
      memo: [
        { type: "step", text: { en: "Work the left-hand side only. Each bracket is a squared binomial, so each one <b>keeps its middle term</b>." } },
        { type: "step", text: { en: "(√a + √b)² = a + 2√(ab) + b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(√a − √b)² = a − 2√(ab) + b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Subtract, and mind the bracket: &nbsp;(a + 2√(ab) + b) − (a − 2√(ab) + b) = a + 2√(ab) + b − a + 2√(ab) − b" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 4√(ab) &nbsp;as required" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: √a × √b = √(ab) — multiplying two roots of the same kind IS allowed, and it is where the √(ab) comes from. Adding them is the BIG NO-NO: √a + √b is never √(a + b).",
        } },
      ],
      esplain: {
        en: "A proof in letters feels harder than one in numbers and it is usually easier, because there is nothing to work out — only to expand carefully. Both brackets are squared, so both give three pieces, and the outside pieces are identical: a and b in each. Only the middle piece differs, plus two root ab in the first and minus two root ab in the second. Subtracting the second bracket flips every sign inside it, so the a and the b cancel out and the two middle terms, instead of cancelling, add together into four root ab. The one law doing real work is that a root times a root is the root of the product. And notice why the question says a and b must not be negative: without that, the roots would not be real numbers at all.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — which is bigger, 2√6 or 5? Compare the squares, with a reason.
   --------------------------------------------------------------- */
const q5 = {
  id: "exp.sib.sp.q5",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "compare-a-surd-with-a-whole-number-without-a-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Decide which of &nbsp;2√6&nbsp; and &nbsp;5&nbsp; is the bigger number, and give a full reason for your answer.",
      },
      hint: {
        en: "You cannot compare a surd with a whole number by looking at them. Both of these are positive, so squaring them will not change which one is bigger — and squares are easy to compare.",
      },
      memo: [
        { type: "step", text: { en: "Both numbers are positive, so comparing them is the same as comparing their <b>squares</b>." }, ticks: ["s/f"] },
        { type: "step", text: { en: "(2√6)² = 2² × (√6)² = 4 × 6 = 24 &nbsp;&nbsp;and&nbsp;&nbsp; 5² = 25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "24 &lt; 25 &nbsp;&nbsp;∴ 2√6 &lt; 5, &nbsp;so <b>5 is the bigger number</b>." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2√6)² is 4 × 6 = 24, not 2 × 6 = 12 — the coefficient gets squared too. And the squaring shortcut only works <i>because</i> both numbers are positive: squaring would swap the order round if one of them were negative.",
        } },
      ],
      esplain: {
        en: "Two root six is somewhere around four point nine, but you are not allowed a calculator and estimating is not a reason. The proper move is to square both numbers. Squaring keeps positive numbers in the same order — if one positive number is bigger than another, its square is bigger too — so whichever square is bigger belongs to the bigger number. Two root six squared means squaring the 2 as well as the root, giving four times six, which is twenty-four. Five squared is twenty-five. Twenty-five wins by a single unit, so five is the bigger number, and the two are astonishingly close. The full reason has three parts and a marker wants all three: both are positive, so compare squares; here are the squares; therefore this one is bigger.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — simplify, then rational or irrational, with a reason.
   (√12 + √27)/√3 = 5, and 5 is rational.
   Two DEPENDENT parts, so they stay on one card.
   --------------------------------------------------------------- */
const q6 = {
  id: "exp.sib.sp.q6",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "simplify-a-surd-expression-then-classify-the-answer",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(√12 + √27)/√3",
      },
      hint: {
        en: "Prime factors first for both roots on top. Once they are lots of the same √, add them the way you would add 2x and 3x — and then see what the bottom does.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first, then look for the factors with <b>tickets out</b>." } },
        { type: "step", text: { en: "√12 = √(2² · 3) = 2√3 &nbsp;&nbsp;and&nbsp;&nbsp; √27 = √(3³) = 3√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (2√3 + 3√3)/√3 = 5√3/√3 &nbsp;&nbsp;— two of them plus three of them is five of them" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Twelve and twenty-seven look unrelated until you take them apart. Twelve is four times three, and the four is a pair of 2s, so a 2 walks out and a root three stays. Twenty-seven is three cubed, which is a pair of 3s and a spare, so a 3 walks out and again a root three stays. Both terms are now lots of root three, so adding them is counting — two plus three is five. Then five root three divided by root three leaves a plain 5, because the roots cancel each other exactly. That vanishing act is the whole point of the question: an expression can be stuffed with surds and still have a perfectly ordinary number as its answer.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 2,
      prompt: {
        en: "Is your answer to (a) rational or irrational? Give a reason.",
      },
      hint: {
        en: "A number is rational if it can be written as one whole number over another. Look at what you actually ended up with, not at what the question started with.",
      },
      memo: [
        { type: "answer", text: { en: "<b>Rational</b>, because it can be written as one whole number over another: &nbsp;5 = 5/1." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: surds in the working do not make the answer irrational. Here the √3 cancelled out completely, so what is left is an ordinary whole number — and every whole number is rational.",
        } },
      ],
      esplain: {
        en: "Rational means ratio: a number you can write as one whole number divided by another. Five is five over one, so it qualifies, and so does every whole number, every fraction and every decimal that stops or repeats. Irrational means you cannot do that, and root three is the classic example — its decimal runs on forever without ever repeating. The trap in this part is judging the answer by the question. The expression you started with was full of surds, but they cancelled out completely, and what matters is the number you finished with. Always look at the final line before you decide.",
      },
    },
  ],
};

export const expSurdProofsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
