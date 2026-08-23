/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "delta-in-p" (Δ in terms of p → prove real for all p).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHY THE TILE IS DOWN TO TWO. It held three cards, and her ruling 5
   (2026-08-23) moved every ★ off the normal tiles:
     · eqn.nor.q4 was one four-part card; its (b)(c)(d) chain — complete
       the square on Δ, prove real for all p, then show equal roots can
       never happen — is a level-3/3/4 run, so it moves whole to the
       Level 4 tile and only (a), "write Δ in terms of p", stays here;
     · eqn.nor.q5 keeps (a)(b)(c) and loses its ★ (d);
     · eqn.ineq.t1q3(b), the "show real for ALL p" proof, is level 4 and
       moves whole.
   That takes the complete-the-square-on-Δ method off the tile entirely
   — which is exactly why q3 below rebuilds it at level 3, with its own
   numbers, so a learner drilling this skill still meets her method.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.nor.q4(a)  x² + px + (p − 2) = 0 — write Δ in terms of p;
     · eqn.nor.q5(a–c)  x² + (2m − 1)x − (4m + 2) = 0 — Δ turns out to
       be a PERFECT SQUARE, (2m + 3)², so the roots are never non-real.
   The four below are the four that were missing:
     q1  Δ in terms of p and NOTHING else — a clean level-1 way in, with
       a negative b that has to be bracketed before it is squared;
     q2  every p CANCELS and Δ comes out a constant, 12 — so one line
       answers the question for every real p at once;
     q3  Δ is a quadratic in p with a positive minimum: complete the
       square ON THE DISCRIMINANT (her distinctive B12(b) move), prove
       real for all p, then show equal roots can never happen;
     q4  Δ is a perfect square that really does reach zero, so "for which
       p are the roots equal" has an answer this time — the mirror image
       of q3's "no such p".

   METHOD: METHODS-algebra.md, hers verbatim — B12(b) "prove the roots
   are real for all values of p: complete the square ON the
   discriminant" and read its minimum off the turning point, which she
   marks as a distinctive method of hers; B3 for the completing-the-
   square layout (b/2 boxed first, add and subtract on the same side
   because Δ is an EXPRESSION, not an equation); B11's table and her
   "perfect □" shorthand; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's nature-of-roots ladder
   ("rational-for-all-k" and "never-equal" rungs); SURVEY-Her-2025-
   Assessments.md Test 1 Q4 ("show the equation has two real unequal
   roots — prove via completing the square that the discriminant is
   always positive"); SURVEY-Nov-P1.md Nov 2022 Q1(d). Fresh equations,
   fresh numbers, and a ≠ 1 in q3 so no card here is a re-dress of the
   two that moved.

   LEVELS: 1, 2, 3, 2. NOTHING here is level 4. NO DIAGRAM: the "Δ
   against p" parabola her method sketches is carried in words inside
   the memo, exactly as eqn.ineq.t1q3(b) already does.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq8" };

/* ---------------------------------------------------------------
   q1 — Δ IN TERMS OF p, AND NOTHING ELSE.
   3x² − 2px + (p − 1) = 0 · Δ = (−2p)² − 4(3)(p − 1) = 4p² − 12p + 12.
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.dip.q1",
  chapter: CH,
  topic: "delta-in-p",
  archetype: "write-the-discriminant-in-terms-of-a-parameter",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine Δ, the discriminant of &nbsp;3x² − 2px + (p − 1) = 0, &nbsp;in terms of p. Give your answer in simplified form.",
      },
      hint: {
        en: "Write a, b and c down first — b is the whole of −2p, minus sign included, and c is the whole bracket. Then substitute, keeping every negative inside its own brackets.",
      },
      memo: [
        { type: "step", text: { en: "a = 3 ; &nbsp;b = −2p ; &nbsp;c = p − 1" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (−2p)² − 4(3)(p − 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(−2p)² = 4p², &nbsp;and &nbsp;−12(p − 1) = −12p + 12" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ = 4p² − 12p + 12" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (−2p)² is 4p². The bracket squares the minus AND the 2 AND the p — writing −2p² or −4p² is the classic way to lose this whole question in its first line.",
        } },
      ],
      esplain: {
        en: "There is nothing new to learn on this card; it is the ordinary discriminant substitution with a letter where a number usually sits. What makes it worth practising on its own is that every mistake people make with parameters happens right here, in the substitution line. Write a, b and c on their own line first so you can see that b carries its minus sign and that c is the whole bracket. Then put brackets around anything negative before you square or multiply it, because minus two p squared is four p squared — the squaring reaches the sign and the number as well as the letter. What comes out is not a number but an expression, and later questions on this skill are all about what that expression can and cannot do.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — EVERY p CANCELS: Δ comes out a CONSTANT.
   x² + 2px + (p² − 3) = 0 · Δ = 4p² − 4(p² − 3) = 12, for every p.
   12 &gt; 0 and 12 is not a perfect □ → real, irrational, unequal, always.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.dip.q2",
  chapter: CH,
  topic: "delta-in-p",
  archetype: "the-parameter-cancels-out-of-the-discriminant-entirely",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + 2px + (p² − 3) = 0, &nbsp;where p is a real number.<br><br>Show that &nbsp;Δ = 12, &nbsp;whatever real value p takes.",
      },
      hint: {
        en: "Substitute as usual and then look carefully at the two p² terms. Do they survive?",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 2p ; &nbsp;c = p² − 3" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (2p)² − 4(1)(p² − 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 4p² − 4p² + 12" }, ticks: ["ca"] },
        { type: "answer", text: { en: "the two p² terms cancel &nbsp;&nbsp;∴ Δ = 12, &nbsp;with no p left in it at all" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: −4(p² − 3) is −4p² <b>+</b> 12. The minus reaches the −3 as well and turns it positive — get that sign wrong and Δ comes out as 4p² − 4p² − 12 = −12, which would have you claiming the roots are never real.",
        } },
      ],
      esplain: {
        en: "Most parameter questions leave you with an expression in p and a bit of work still to do. This one is a small surprise: the p squared from squaring two p and the p squared from the four a c term are exactly the same size, so they wipe each other out and what is left is a plain number. That is worth pausing on, because it means the discriminant does not depend on p at all. Whatever p you choose, the equation's roots behave in exactly the same way — the graph slides sideways as p changes, but its shape and how it meets the x-axis never change. The only thing to be careful about is the sign on the minus three, which the minus four flips to plus twelve.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the nature of the roots of the equation for every real value of p. Give a full reason.",
      },
      hint: {
        en: "Run the usual two checks on the number 12 — the sign first, then the perfect-square question. Because Δ has no p in it, one answer covers every p at once.",
      },
      memo: [
        { type: "step", text: { en: "Δ = 12 &gt; 0, so the roots are real and unequal" }, ticks: ["ca"] },
        { type: "step", text: { en: "12 is not a perfect □ (3² = 9 and 4² = 16), so the roots are irrational" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ for <b>every</b> real value of p the roots are real, irrational and unequal" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “for every real value of p” has to be part of the sentence you write down. The marks here are not for saying what kind of roots 12 gives — they are for noticing that Δ carries no p, so the answer can never change.",
        } },
      ],
      esplain: {
        en: "Once the discriminant turns out to be a bare number, the “for all p” part of the question answers itself. There is nothing left to test, no range to find, no boundary to hunt for. Twelve is positive, so the roots are real and different. Twelve is not any whole number squared, so the square root in the formula stays a surd and the roots are irrational. Say both, and then say the sentence that actually earns the last mark: this is true for every real value of p, because p has disappeared from the discriminant. You can see it in the roots too — solving gives x equals minus p plus or minus root three, so the pair of roots simply slides along the axis as p changes, always root three apart.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — COMPLETE THE SQUARE ON Δ (her B12(b) move), with a ≠ 1 so this
   is not a re-dress of the two cards that moved to Level 4.
   2x² + (p + 2)x + (p − 1) = 0 · Δ = p² − 4p + 12 = (p − 2)² + 8 ≥ 8
   → real (and unequal) for every real p, and never equal.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.dip.q3",
  chapter: CH,
  topic: "delta-in-p",
  archetype: "complete-the-square-on-the-discriminant-real-for-all-p",
  paper: PAPER,
  lostQuest: LOST,
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;2x² + (p + 2)x + (p − 1) = 0, &nbsp;where p is a real number.<br><br>Show that &nbsp;Δ = p² − 4p + 12.",
      },
      hint: {
        en: "b is a whole bracket, so squaring it needs its middle term. And a is 2 here, so 4ac is 8 times the c bracket, not 4 times it.",
      },
      memo: [
        { type: "step", text: { en: "a = 2 ; &nbsp;b = p + 2 ; &nbsp;c = p − 1" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (p + 2)² − 4(2)(p − 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= p² + 4p + 4 − 8p + 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ = p² − 4p + 12" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT twice in one line. (p + 2)² is p² + 4p + 4, not p² + 4 — a squared bracket always has a middle term. And a = 2, so −4ac is −8(p − 1) = −8p + 8, not −4p + 4.",
        } },
      ],
      esplain: {
        en: "Two habits are being tested here at once, and both of them are about brackets. Squaring b means multiplying the bracket by itself, which gives three terms, not two: the first squared, twice the product, and the last squared. And the a is two rather than one, so the four a c term is eight times the c bracket. Write a, b and c out before you start, keep every bracket in place while you expand, and collect the p terms last. What comes out is a quadratic in p, and the next part is about squeezing one very specific fact out of it — the smallest value it can ever take.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "By completing the square, write Δ in the form &nbsp;(p − m)² + n, &nbsp;and hence prove that the roots of the equation are real for every real value of p.",
      },
      hint: {
        en: "Δ is itself a quadratic — in p this time — so complete the square on IT. Work out b/2 first, then add and subtract its square on the same line, because Δ is an expression and not an equation. Then ask how small a squared bracket can ever be.",
      },
      memo: [
        { type: "step", text: { en: "Δ is itself a quadratic, in p, so complete the square on it. &nbsp;b/2 = −4/2 = −2:" } },
        { type: "step", text: { en: "Δ = p² − 4p + (−2)² − (−2)² + 12" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (p − 2)² − 4 + 12 &nbsp;=&nbsp; (p − 2)² + 8" }, ticks: ["ca"] },
        { type: "step", text: { en: "(p − 2)² ≥ 0 for every real p — a square is never negative — so &nbsp;Δ ≥ 0 + 8 = 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ ≥ 8, so Δ &gt; 0 for every real value of p &nbsp;⟹&nbsp; the roots are real (and unequal) for all real p" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: Δ is an EXPRESSION here, not an equation, so (b/2)² is <b>added and subtracted</b> on the same side. Adding it to “both sides” is the equation version of the method and would change what Δ is worth.",
        } },
      ],
      esplain: {
        en: "You cannot test every value of p, because there are infinitely many of them, so this question needs a move that covers all of them in one line. Hers is to notice that the discriminant is itself a quadratic, and to complete the square on it. Sketched as a graph of Δ against p, that gives a happy parabola with its turning point at p equals two, Δ equals eight — and the turning point of a happy parabola is its lowest point. So the smallest the discriminant can ever be is eight. Eight is comfortably above zero, so the discriminant is positive no matter what p does, and positive means two real, different roots. One inequality has settled every value of p at once.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence explain why this equation can never have equal roots, whatever real value p takes.",
      },
      hint: {
        en: "Equal roots need Δ to be exactly zero. From (b) you know the smallest Δ can ever be — can it reach zero?",
      },
      memo: [
        { type: "step", text: { en: "Equal roots need &nbsp;Δ = 0&nbsp; exactly, but from (b) the smallest Δ can ever be is 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ can never reach 0, so no real value of p gives equal roots — the equation never has equal roots" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: p = 2 is where Δ is SMALLEST, not where it is zero. At p = 2 the discriminant is 8, which still gives real and UNEQUAL roots. Handing in p = 2 as “the value that gives equal roots” is the trap this part is built to catch.",
        } },
      ],
      esplain: {
        en: "This part is the payoff for the completing-the-square work. Once you know the floor the discriminant sits on, a question like “can Δ ever be zero” becomes a one-line check instead of a fresh calculation. The floor is eight, and eight is not zero, so the answer is no — and “no” with a reason is the whole answer here. The tempting wrong move is to hand in p equals two, because that is the value that makes Δ as small as it can get. But smallest is not the same as zero. At p equals two the discriminant is still eight, and the equation still has two different real roots. Say what the minimum is, and then say that even the minimum is too big.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — A PERFECT SQUARE Δ THAT REALLY DOES REACH ZERO.
   x² + (p + 1)x + p = 0 · Δ = (p + 1)² − 4p = (p − 1)²
   → equal roots at p = 1 only, with equal root x = −1.
   (Check: x² + 2x + 1 = (x + 1)².)
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.dip.q4",
  chapter: CH,
  topic: "delta-in-p",
  archetype: "perfect-square-discriminant-that-does-reach-zero",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + (p + 1)x + p = 0, &nbsp;where p is a real number.<br><br>Show that &nbsp;Δ = (p − 1)².",
      },
      hint: {
        en: "Expand the squared bracket first and collect the p terms. Then look at what you have — the three terms should fold back up into a square.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = p + 1 ; &nbsp;c = p" } },
        { type: "step", text: { en: "Δ = (p + 1)² − 4(1)(p) = p² + 2p + 1 − 4p" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= p² − 2p + 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "which is a perfect □: &nbsp;∴ Δ = (p − 1)²" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the sign inside the final bracket is MINUS, even though the bracket you started with had a plus. Check the middle term before you commit: 2(p)(−1) = −2p ✓, which matches. Writing (p + 1)² here would be right for the b you started with and wrong for the Δ you ended with.",
        } },
      ],
      esplain: {
        en: "Two things are happening in this short piece of work and they are worth separating. The first is ordinary expanding: square the bracket, remembering its middle term, then take away four p. The second is recognising the answer. Three terms where the first and last are both perfect squares and the middle is twice their product is a squared bracket in disguise, and folding it back up is what makes the next part easy. Check the sign by rebuilding it rather than guessing: p minus one, all squared, gives p squared minus two p plus one, which is exactly what you have. That kind of check takes five seconds and catches the most common slip on this question.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence determine the value of p for which the equation has equal roots, and write down that equal root.",
      },
      hint: {
        en: "Equal roots need Δ = 0. A squared bracket is zero only where the bracket itself is zero — and that happens in exactly one place.",
      },
      memo: [
        { type: "step", text: { en: "Equal roots need &nbsp;Δ = 0: &nbsp;&nbsp;(p − 1)² = 0 &nbsp;⟹&nbsp; p − 1 = 0 &nbsp;⟹&nbsp; p = 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "With p = 1 the equation is &nbsp;x² + 2x + 1 = 0, &nbsp;so the equal root is &nbsp;x = −b/(2a) = −2/2 = −1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (p − 1)² = 0 has only ONE answer, p = 1. The ± only turns up when a squared bracket equals a POSITIVE number — zero has just one square root, itself.",
        } },
      ],
      esplain: {
        en: "Put this card next to the last one and the pair covers both possible outcomes of the same question. There the discriminant was a square plus eight, so it never reached zero and equal roots were impossible. Here it is a square with nothing added, so it does reach zero — at the one place where the bracket itself is zero, which is p equal to one. Notice that there is only one answer, not two. A squared bracket equal to a positive number gives a plus-or-minus, but a squared bracket equal to zero gives a single value, because zero has only one square root. Substituting p back in gives x squared plus two x plus one, which is x plus one all squared, so the repeated root is minus one.",
      },
    },
  ],
};

export const eqnDeltaInPSiblingQuestions = [q1, q2, q3, q4];
