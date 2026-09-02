/* ============================================================
   EQUATIONS & INEQUALITIES · Q3 — The k-method
   ------------------------------------------------------------
   When a bracket repeats, let k stand for it: spot WHEN to
   substitute, WHAT k is, what the equation becomes, why you're
   not finished at k, how many answers to expect, and carrying
   a restriction on k.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";

const CON = "eqKMethod";

/* a repeated bracket like "x² − x" with small random coefficients */
function repBracket() {
  const m = randInt(1, 3), sign = pick(["−", "+"]);
  return `x² ${sign} ${m === 1 ? "" : C(m)}x`;   // never show "1x"
}

const SKILLS = {
  /* when do you reach for k? */
  whenK: () => {
    const items = [
      { q: "When is the <b>k-substitution</b> the right tool?", correct: "When the SAME bracket or expression appears two or more times", wrongs: ["Whenever there is an x²", "Whenever the equation has brackets", "Only when there is a fraction"], ans: "The k-method is for a REPEATED expression — call the repeat k, and the equation collapses to a simple quadratic in k.",
        sol: [{ s: "Scan the equation for the same expression appearing more than once" },
              { s: "If it does, give that repeat one short name: let K = the repeated bracket" },
              { s: "The whole equation shrinks to a plain quadratic in K, which you can factorise", r: "and then always substitute back to x" }] },
      { q: "Which equation is begging for a k-substitution?", correct: "(x² − x)² − 8(x² − x) + 12 = 0", wrongs: ["x² − 8x + 12 = 0", "(x − 2)(x + 3) = 0", "x² − 8 = 0"], ans: "The bracket (x² − x) appears TWICE — let k = x² − x and it becomes k² − 8k + 12 = 0.",
        sol: [{ s: "Look at each option and ask: does one expression appear twice?" },
              { s: "In (x² − x)² − 8(x² − x) + 12 = 0 the bracket (x² − x) shows up in both the squared term and the middle term" },
              { s: "let K = x² − x → K² − 8K + 12 = 0", r: "the others are already ordinary quadratics with nothing repeating" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "Look for the same expression appearing more than once.", answerLabel: it.ans, solution: it.sol });
  },

  /* what exactly is k? — fresh inner bracket */
  whatIsK: () => {
    const inner = repBracket();
    const A = randInt(2, 9), B = randInt(2, 12);
    const prompt = `<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b>.<br>You decide to substitute. What should k be?`;
    const correct = `k = ${inner}`;
    const wrongs = [`k = (${inner})²`, `k = ${C(A)}(${inner})`, "k = x"];
    return mc(CON, prompt, correct, wrongs,
      { hint: "k stands for the repeated expression itself — the plain bracket, not its square.",
        answerLabel: `Let k = ${inner}. Then the equation is k² − ${C(A)}k + ${C(B)} = 0 — an ordinary quadratic in k.`,
        solution: [
          { s: `Find the part that repeats: (${inner}) appears in the squared term AND in the middle term` },
          { s: `Let K be that plain bracket: K = ${inner}`, r: "not its square — the square is already shown by the ² outside" },
          { s: `Then (${inner})² is K², and the equation reads K² − ${C(A)}K + ${C(B)} = 0` },
        ] });
  },

  /* what the equation becomes */
  afterSub: () => {
    const inner = repBracket();
    const A = randInt(2, 9), B = randInt(2, 12);
    const prompt = `<b>(${inner})² − ${C(A)}(${inner}) + ${C(B)} = 0</b> with k = ${inner} becomes…?`;
    const correct = `k² − ${C(A)}k + ${C(B)} = 0`;
    const wrongs = [
      `k² − ${C(A)}k² + ${C(B)} = 0`,
      `k − ${C(A)}k + ${C(B)} = 0`,
      `k² + ${C(A)}k − ${C(B)} = 0`,
    ];
    return mc(CON, prompt, correct, wrongs,
      { hint: "Replace every copy of the bracket with k — signs and numbers stay exactly as they were.",
        answerLabel: `Each (${inner}) becomes a k: k² − ${C(A)}k + ${C(B)} = 0. Solve for k, then go back to x.`,
        solution: [
          { s: `Swap every copy of (${inner}) for K, and change nothing else` },
          { s: `(${inner})² → K², and ${C(A)}(${inner}) → ${C(A)}K`, r: "the ² stays on the bracket, so it lands on the K" },
          { s: `K² − ${C(A)}K + ${C(B)} = 0`, r: "every sign and number is exactly as it was — that is the whole trick" },
        ] });
  },

  /* solving for k is NOT the end */
  notDone: () => {
    const k1 = randInt(2, 6), k2 = k1 + randInt(1, 4);
    const items = [
      ynQ(CON,
        `You substituted k = x² − x and solved: <b>k = ${C(k1)} or k = ${C(k2)}</b>. Are you finished?`,
        false,
        { hint: "The question asked for x, not k.",
          answerLabel: `No! k was YOUR invention. Put the bracket back: x² − x = ${C(k1)} and x² − x = ${C(k2)}, and solve each one for x.`,
          solution: [
            { s: "k was your own invention — the question never asked for it" },
            { s: `Substitute back: x² − x = ${C(k1)}, and separately x² − x = ${C(k2)}` },
            { s: "Each of those is its own quadratic to solve for x", r: "stopping at k is where the marks go missing" },
          ] }),
      { q: `After solving k = ${C(k1)} or k = ${C(k2)}, what is the next step?`, correct: "Replace k with the original bracket and solve each equation for x", wrongs: ["Write the answers down — x = k", "Add the two k values", "Substitute the k values into each other"], ans: "k stood for the repeated bracket, so each k-value becomes its own little equation in x. Solve both.",
        sol: [{ s: "You have solved the quadratic in K, but K is not what was asked for" },
              { s: "Put the bracket back in place of K, once for each K-value" },
              { s: "That gives two separate equations in x — solve both, and you may end up with up to four answers" }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: "k is a stand-in. Swap the bracket back in and keep solving.", answerLabel: it.ans, solution: it.sol });
  },

  /* how many answers to expect */
  howMany: () => {
    const items = [
      { q: "Rule of thumb: the equation's highest power is <b>x⁴</b>. AT MOST how many real solutions?", correct: "4", wrongs: ["2", "3", "8"], ans: "The highest power tells you the maximum: x⁴ → up to 4 real solutions (equal roots count as one value).",
        sol: [{ s: "Fully factorised, an equation splits into one bracket per power" },
              { s: "x⁴ means four brackets, and each one can give at most one x-value" },
              { s: "∴ at most 4 real solutions", r: "fewer if some are non-real or repeat" }] },
      { q: "Rule of thumb: the equation's highest power is <b>x²</b>. AT MOST how many real solutions?", correct: "2", wrongs: ["1", "4", "3"], ans: "A square → up to 2 real solutions.",
        sol: [{ s: "Fully factorised, an equation splits into one bracket per power" },
              { s: "x² means two brackets, so at most two x-values" },
              { s: "∴ at most 2 real solutions", r: "Δ decides whether you get two, one or none" }] },
      { q: "Rule of thumb: the equation's highest power is <b>x³</b>. AT MOST how many real solutions?", correct: "3", wrongs: ["2", "6", "1"], ans: "A cube → up to 3 real solutions.",
        sol: [{ s: "Fully factorised, an equation splits into one bracket per power" },
              { s: "x³ means three brackets, so at most three x-values" },
              { s: "∴ at most 3 real solutions" }] },
      { q: "Solving gives <b>x = 2, x = 2 and x = −1</b>. How many DIFFERENT solutions is that?", correct: "2 — equal roots count as ONE value", wrongs: ["3 — every answer counts", "1 — only the repeated one", "4 — the repeat doubles"], ans: "x = 2 twice is still just the value 2. Different solutions: x = 2 and x = −1 — two of them.",
        sol: [{ s: "List the values you actually got: 2, 2 and −1" },
              { s: "The question asks how many are DIFFERENT, and 2 written twice is still the single value 2" },
              { s: "∴ two different solutions: x = 2 and x = −1", r: "a repeated root counts once — equal roots" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "Highest power = the most real answers you can expect; a repeated answer counts once.", answerLabel: it.ans, solution: it.sol });
  },

  /* the repeat can hide behind a common factor — rearrange to SEE it */
  hiddenRepeat: () => {
    const items = [
      { q: "The equation contains <b>(y² − 2y)²</b> … and later the terms <b>−2y² + 4y</b>. Where is the second copy of the bracket?", correct: "−2y² + 4y = −2(y² − 2y) — factor out −2 and the repeat appears", wrongs: ["There is no second copy — the k-method can't be used", "−2y² + 4y is already (y² − 2y)", "Swap it to 4y − 2y² and it becomes the bracket"], ans: "Take out the common factor −2: −2y² + 4y = −2(y² − 2y). Now (y² − 2y) appears twice, so let k = y² − 2y." },
      { q: "Before deciding an equation has no repeated bracket, what should you try?", correct: "Factor a constant out of the loose terms — the repeat often hides behind a −2 or a 3", wrongs: ["Multiply all the brackets out", "Substitute x = 0", "Take the square root of every term"], ans: "A repeated expression often hides behind a common factor: −2y² + 4y hides (y² − 2y). Factor constants out FIRST, then look again." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "Factor a number out of the loose x-terms and compare with the bracket.", answerLabel: it.ans });
  },

  /* restrictions ride along on k */
  carryK: () => {
    const r = randInt(2, 6);
    const items = [
      ynQ(CON,
        `The original equation had the repeated bracket in a DENOMINATOR, with restriction (bracket) ≠ ${C(r)}. Does the restriction carry over to k?`,
        true,
        { hint: "k IS the bracket.",
          answerLabel: `Yes — k stands for that bracket, so k ≠ ${C(r)} rides along. If solving gives k = ${C(r)}, reject it (N.A.).`,
          solution: [
            { s: "k is not a new quantity — it is just a short name for that bracket" },
            { s: `So anything true of the bracket is true of k, including (bracket) ≠ ${C(r)}` },
            { s: `∴ k ≠ ${C(r)} rides along, and a k-value of ${C(r)} would have to be rejected as N.A.` },
          ] }),
      { q: `While using the k-method you find k = ${C(r)}, but the restriction was k ≠ ${C(r)}. What do you do?`, correct: `Reject k = ${C(r)} (mark it N.A.) and keep only the other k-value`, wrongs: ["Keep it — restrictions are about x, not k", "Change the restriction", "Start over with a different letter"], ans: `A value that breaks a restriction is not applicable — cross it out with N.A. and continue with the surviving k-value.`,
        sol: [{ s: `The restriction says the bracket may not be ${C(r)}, and k IS the bracket` },
              { s: `So k = ${C(r)} would make a denominator 0 — it cannot be used` },
              { s: `Mark it N.A. with a struck equals and carry on with the other k-value only`, r: "the restriction was set before solving, and it still holds afterwards" }] },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: "k inherits everything the bracket had — including its restriction.", answerLabel: it.ans, solution: it.sol });
  },
};

export const questEq3 = {
  id: "eq3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
