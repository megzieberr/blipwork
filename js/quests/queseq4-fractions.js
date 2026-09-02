/* ============================================================
   EQUATIONS & INEQUALITIES · Q4 — Fractions & restrictions
   ------------------------------------------------------------
   Factorise the denominators first, the negative-twin trick
   (9 − x² = −(x² − 9)), the LCD, restrictions BEFORE solving,
   the ghost under the bed, and rejecting N.A. answers.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";

const FRA = "eqFractions";
const RES = "eqRestrictions";

const SKILLS = {
  /* the method's first move */
  firstMove: () => {
    const items = [
      { q: "An equation full of algebraic fractions. What is the FIRST move?", correct: "Factorise every numerator and denominator", wrongs: ["Multiply everything out", "Guess a value of x and test it", "Flip every fraction upside down"], ans: "Factorise top and bottom FIRST — only then can you see matching denominators, the LCD, and the restrictions.",
        sol: [{ s: "Nothing about a fraction equation can be decided while the denominators are still lumps" },
              { s: "Factorise every top and every bottom — turn 3 + 2x into 2x + 3, and 4x² − 9 into (2x + 3)(2x − 3)" },
              { s: "Only now can you see which denominators share factors, what the LCD is, and which x-values are banned" }] },
      { q: "Why factorise the denominators before anything else?", correct: "To find the LCD and to read off the restrictions", wrongs: ["Because it makes the numbers smaller", "So the fractions cancel to 1", "It's optional — the LCD works either way"], ans: "The factors show which denominators match, what the LCD is, and which x-values are forbidden.",
        sol: [{ s: "A factorised denominator is a list of the things that could each be 0" },
              { s: "That list gives you the limits straight away, one x ≠ … per factor" },
              { s: "And the LCD is built from those same factors, each taken once at its highest power", r: "so factorising does two jobs at once" }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: "Factorise first — tops AND bottoms.", answerLabel: it.ans, solution: it.sol });
  },

  /* the negative twin: 9 − x² = −(x² − 9) */
  negTwin: () => {
    const m = randInt(2, 6);
    const items = [
      { q: `One denominator is <b>${C(m * m)} − x²</b> and another is <b>x² − ${C(m * m)}</b>. What is the trick?`, correct: `${C(m * m)} − x² = −(x² − ${C(m * m)}) — take out the negative so the denominators match`, wrongs: ["They are the same thing, no change needed", "Cancel them against each other immediately", `Replace both with x − ${C(m)}`], ans: `${C(m * m)} − x² is the NEGATIVE of x² − ${C(m * m)}. Take out −1, then both denominators share the factors (x + ${C(m)})(x − ${C(m)}).`,
        sol: [{ s: `Compare the two: ${C(m * m)} − x² is the same terms as x² − ${C(m * m)} with both signs flipped` },
              { s: `So ${C(m * m)} − x² = −(x² − ${C(m * m)})`, r: "take the −1 out in front" },
              { s: `Now both denominators are built from (x + ${C(m)})(x − ${C(m)}), and the −1 rides up into the numerator`,
                r: "this is where learners lose the sign, so write the −1 down" }] },
      { q: `One denominator is <b>${C(m)} − x</b> and another is <b>x − ${C(m)}</b>. What is the trick?`, correct: `${C(m)} − x = −(x − ${C(m)}) — take out −1 so they match`, wrongs: ["Multiply both denominators together", "They can never match — use the formula", "Swap the two fractions around"], ans: `${C(m)} − x = −(x − ${C(m)}). Taking the −1 out (it can hop up to the numerator or out front) makes the denominators identical.`,
        sol: [{ s: `${C(m)} − x and x − ${C(m)} are the same two terms with the signs swapped` },
              { s: `So ${C(m)} − x = −(x − ${C(m)})` },
              { s: `Take that −1 out and the two denominators become identical`, r: "the minus hops up to the numerator — it does not vanish" }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: "A denominator that is the NEGATIVE of another: take out −1 and they match.", answerLabel: it.ans, solution: it.sol });
  },

  /* choose the LCD */
  whichLCD: () => {
    const m = randInt(1, 6);
    const items = [
      { q: `Denominators are <b>x</b> and <b>(x − ${C(m)})</b>. What is the LCD?`, correct: `x(x − ${C(m)})`, wrongs: [`x − ${C(m)}`, "x", `x + (x − ${C(m)})`], ans: `They share no factor, so the LCD is their product: x(x − ${C(m)}).`,
        sol: [{ s: `List the factors: one denominator is x, the other is (x − ${C(m)})` },
              { s: "They have nothing in common, so nothing can be shared" },
              { s: `LCD = x(x − ${C(m)})`, r: "each different factor once, at its highest power" }] },
      { q: `Denominators are <b>(x + ${C(m)})</b>, <b>(x − ${C(m)})</b> and <b>x² − ${C(m * m)}</b>. What is the LCD?`, correct: `(x + ${C(m)})(x − ${C(m)})`, wrongs: [`(x + ${C(m)})(x − ${C(m)})(x² − ${C(m * m)})`, `x² + ${C(m * m)}`, `(x + ${C(m)})² (x − ${C(m)})²`], ans: `x² − ${C(m * m)} already IS (x + ${C(m)})(x − ${C(m)}), so the LCD is just (x + ${C(m)})(x − ${C(m)}) — don't double-count factors.`,
        sol: [{ s: `Factorise the third denominator first: x² − ${C(m * m)} = (x + ${C(m)})(x − ${C(m)})`, r: "diff in □'s" },
              { s: `So the whole list of factors is just (x + ${C(m)}) and (x − ${C(m)})` },
              { s: `LCD = (x + ${C(m)})(x − ${C(m)})`, r: "multiplying all three denominators would count the same factors twice" }] },
      { q: `Denominators are <b>x</b> and <b>x²</b>. What is the LCD?`, correct: "x²", wrongs: ["x³", "x", "2x"], ans: "x² already contains x, so the LCD is x² — take each factor at its HIGHEST power, don't multiply blindly.",
        sol: [{ s: "There is only one different factor here, and that is x" },
              { s: "It appears once in the first denominator and twice in the second" },
              { s: "Take it at its highest power: LCD = x²", r: "x² already divides by x, so x³ would be doing extra work for nothing" }] },
    ];
    const it = pick(items);
    return mc(FRA, it.q, it.correct, it.wrongs,
      { hint: "Each different factor once, at its highest power.", answerLabel: it.ans, solution: it.sol });
  },

  /* multiply EVERY term by the LCD
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     worked example — trivially parametrisable"). The yes/no item's
     equation 10/x + 3x/(x − 2) = 7 now rolls its four numbers; the LCD is
     always x(x − m) and the cleared line A(x − m) + Bx·x = Kx(x − m) is
     exact for every roll, so her "the lonely K gets multiplied too" point
     is unchanged. The first item has no numbers at all — untouched. */
  clearFractions: () => {
    if (pick([true, false])) {
      const it = { q: "You've found the LCD. How do you clear the fractions?", correct: "Multiply EVERY term on both sides by the LCD", wrongs: ["Multiply only the fraction terms by the LCD", "Add the LCD to both sides", "Divide both sides by the LCD"], ans: "Every single term gets multiplied by the LCD — including the lonely whole-number terms. Then the denominators cancel and it's an ordinary equation." };
      return mc(FRA, it.q, it.correct, it.wrongs,
        { hint: "The LCD hits every term, fractions and non-fractions alike.", answerLabel: it.ans,
          solution: [
            { s: "Give every term a denominator first — a whole number gets a denominator of 1" },
            { s: "Under each term write the multiplier it needs to reach the LCD, and a ✓ where it already has it" },
            { s: "Multiplying EVERY term keeps the equation balanced, and the denominators then cancel",
              r: "multiply only some of them and the equation is no longer the same equation" },
          ] });
    }
    const A = pick([6, 8, 9, 10, 12]), B = randInt(2, 5), m = randInt(2, 6), K = randInt(4, 9);
    return ynQ(FRA,
      `In ${C(A)}/x + ${C(B)}x/(x − ${C(m)}) = ${C(K)}, the ${C(K)} also gets multiplied by the LCD x(x − ${C(m)}). True?`,
      true,
      { hint: "EVERY term…",
        answerLabel: `True — ${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)}). Forgetting to multiply the ${C(K)} is the classic slip.`,
        solution: [
          { s: `Write the ${C(K)} over 1 so it looks like the others: ${C(K)}/1` },
          { s: `Now every term is multiplied by the LCD x(x − ${C(m)}) — the ${C(K)} included` },
          { s: `${C(A)}(x − ${C(m)}) + ${C(B)}x·x = ${C(K)}x(x − ${C(m)})`, r: "∴ true — skipping the lonely term unbalances the equation" },
        ] });
  },

  /* restrictions come FIRST */
  stateWhen: () => {
    const items = [
      { q: "WHEN do you state the restrictions of a fraction equation?", correct: "Before you start solving", wrongs: ["After solving, only if an answer looks odd", "Only if the question asks for them", "Never — restrictions are for inequalities"], ans: "Restrictions come FIRST: any x that makes a denominator 0 is banned from the start, and you check your answers against them at the end.",
        sol: [{ s: "The banned x-values belong to the ORIGINAL equation — they are true before you do anything" },
              { s: "So the limits line goes down right next to the LCD line, before any solving starts" },
              { s: "Then at the end you check each answer against that line and reject any that breaks it", r: "her memos mark the limits line" }] },
      ynQ(RES,
        "You may write the restrictions at the end, once you've seen the answers. True?",
        false,
        { hint: "The restriction exists before you solve anything.",
          answerLabel: "False — the restriction is part of the original equation. State it up front, then use it to reject any N.A. answer at the end.",
          solution: [
            { s: "The forbidden x-values come from the denominators, which exist before any solving happens" },
            { s: "Written up front, the limits line is there to catch a bad answer at the end" },
            { s: "∴ false — write LCD = … and limits: x ≠ … on the same line, at the start", r: "it carries its own mark" },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(RES, it.q, it.correct, it.wrongs,
      { hint: "Restrictions first, solve second, check last.", answerLabel: it.ans, solution: it.sol });
  },

  /* read the restrictions off an equation — fresh numbers */
  findRestrictions: () => {
    const m = randInt(1, 8);
    const prompt = `What are the restrictions for <b>${frameFrac("10", "x")} + ${frameFrac("3x", `x − ${C(m)}`)} = 7</b>?`;
    const correct = `x ≠ 0 and x ≠ ${C(m)}`;
    const wrongs = [
      `x ≠ ${C(m)} only`,
      `x ≠ 0 only`,
      `x ≠ −${C(m)} and x ≠ 0`,
    ];
    return mc(RES, prompt, correct, wrongs,
      { hint: "Set EACH denominator equal to 0 — those x-values are banned.",
        answerLabel: `Denominators are x and (x − ${C(m)}): x ≠ 0 and x ≠ ${C(m)}.`,
        solution: [
          { s: `List the denominators: x, and (x − ${C(m)})`, r: "the 7 on the right has denominator 1, which can never be 0" },
          { s: `Set each one to 0: x = 0, and x − ${C(m)} = 0 → x = ${C(m)}` },
          { s: `Those are the banned values: x ≠ 0 and x ≠ ${C(m)}`, r: "both of them — one restriction per denominator" },
        ] });
  },

  /* why a denominator can't be 0 */
  whyRestrict: () => {
    const items = [
      { q: "WHY is an x that makes a denominator 0 not allowed?", correct: "Division by 0 is undefined", wrongs: ["It makes the answer negative", "It makes the fraction equal to 0", "Because the LCD would be too big"], ans: "a/0 is undefined — the ghost under the bed. Any x that turns a denominator into 0 breaks the whole expression.",
        sol: [{ s: "Dividing asks “how many of these fit into that?” — and 0 fits in no times at all" },
              { s: "So a/0 has no value: it is undefined, the ghost under the bed" },
              { s: "An x that turns a denominator into 0 breaks the expression, so it is banned from the start" }] },
      { q: "To find where an expression is UNDEFINED, what do you solve?", correct: "Denominator = 0", wrongs: ["Numerator = 0", "The whole expression = 0", "Denominator < 0"], ans: "Undefined = ghost under the bed = denominator equals 0. Set the bottom equal to 0 and solve.",
        sol: [{ s: "Undefined happens in exactly one place: when you are asked to divide by 0" },
              { s: "So look at the BOTTOM of the fraction and set it equal to 0" },
              { s: "Solving that gives the x-values where the expression is undefined",
                r: "the numerator = 0 answers a different question — that is where the expression equals 0" }] },
    ];
    const it = pick(items);
    return mc(RES, it.q, it.correct, it.wrongs,
      { hint: "Undefined means dividing by 0 — look at the bottom.", answerLabel: it.ans, solution: it.sol });
  },

  /* rejecting an N.A. answer — fresh numbers */
  rejectNA: () => {
    const m = randInt(1, 6), other = m + randInt(1, 5);
    const prompt = `A fraction equation has restrictions <b>x ≠ 0 and x ≠ ${C(m)}</b>. Solving gives x = ${C(m)} or x = ${C(other)}. What is the final answer?`;
    const correct = `Only x = ${C(other)} — mark x = ${C(m)} as N.A.`;
    const wrongs = [
      `x = ${C(m)} or x = ${C(other)} — both count`,
      `No solution — one answer broke a restriction, so both die`,
      `x = ${C(m)} only`,
    ];
    return mc(RES, prompt, correct, wrongs,
      { hint: "An answer that equals a restriction is rejected; the other survives.",
        answerLabel: `x = ${C(m)} makes a denominator 0 → not applicable (N.A.). The valid answer is x = ${C(other)}.`,
        solution: [
          { s: `Check each answer against the limits line: x ≠ 0 and x ≠ ${C(m)}` },
          { s: `x = ${C(m)} is on the banned list — it makes a denominator 0, so it is N.A.`, r: "write it with a struck equals" },
          { s: `x = ${C(other)} breaks nothing, so it stands`, r: "one bad answer never kills the other one" },
        ] });
  },
};

/* tiny stacked-fraction display for the prompts */
function frameFrac(top, bot) {
  return `<span class="frac"><span class="fr-n">${top}</span><span class="fr-d">${bot}</span></span>`;
}

export const questEq4 = {
  id: "eq4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["firstMove", "negTwin", "whichLCD", "clearFractions"].includes(id) ? FRA : RES,
    gen,
  })),
};
