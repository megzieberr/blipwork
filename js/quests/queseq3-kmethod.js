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
      { q: "When is the <b>k-substitution</b> the right tool?", correct: "When the SAME bracket or expression appears two or more times", wrongs: ["Whenever there is an x²", "Whenever the equation has brackets", "Only when there is a fraction"], ans: "The k-method is for a REPEATED expression — call the repeat k, and the equation collapses to a simple quadratic in k." },
      { q: "Which equation is begging for a k-substitution?", correct: "(x² − x)² − 8(x² − x) + 12 = 0", wrongs: ["x² − 8x + 12 = 0", "(x − 2)(x + 3) = 0", "x² − 8 = 0"], ans: "The bracket (x² − x) appears TWICE — let k = x² − x and it becomes k² − 8k + 12 = 0." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "Look for the same expression appearing more than once.", answerLabel: it.ans });
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
        answerLabel: `Let k = ${inner}. Then the equation is k² − ${C(A)}k + ${C(B)} = 0 — an ordinary quadratic in k.` });
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
        answerLabel: `Each (${inner}) becomes a k: k² − ${C(A)}k + ${C(B)} = 0. Solve for k, then go back to x.` });
  },

  /* solving for k is NOT the end */
  notDone: () => {
    const k1 = randInt(2, 6), k2 = k1 + randInt(1, 4);
    const items = [
      ynQ(CON,
        `You substituted k = x² − x and solved: <b>k = ${C(k1)} or k = ${C(k2)}</b>. Are you finished?`,
        false,
        { hint: "The question asked for x, not k.",
          answerLabel: `No! k was YOUR invention. Put the bracket back: x² − x = ${C(k1)} and x² − x = ${C(k2)}, and solve each one for x.` }),
      { q: `After solving k = ${C(k1)} or k = ${C(k2)}, what is the next step?`, correct: "Replace k with the original bracket and solve each equation for x", wrongs: ["Write the answers down — x = k", "Add the two k values", "Substitute the k values into each other"], ans: "k stood for the repeated bracket, so each k-value becomes its own little equation in x. Solve both." },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: "k is a stand-in. Swap the bracket back in and keep solving.", answerLabel: it.ans });
  },

  /* how many answers to expect */
  howMany: () => {
    const items = [
      { q: "Rule of thumb: the equation's highest power is <b>x⁴</b>. AT MOST how many real solutions?", correct: "4", wrongs: ["2", "3", "8"], ans: "The highest power tells you the maximum: x⁴ → up to 4 real solutions (equal roots count as one value)." },
      { q: "Rule of thumb: the equation's highest power is <b>x²</b>. AT MOST how many real solutions?", correct: "2", wrongs: ["1", "4", "3"], ans: "A square → up to 2 real solutions." },
      { q: "Rule of thumb: the equation's highest power is <b>x³</b>. AT MOST how many real solutions?", correct: "3", wrongs: ["2", "6", "1"], ans: "A cube → up to 3 real solutions." },
      { q: "Solving gives <b>x = 2, x = 2 and x = −1</b>. How many DIFFERENT solutions is that?", correct: "2 — equal roots count as ONE value", wrongs: ["3 — every answer counts", "1 — only the repeated one", "4 — the repeat doubles"], ans: "x = 2 twice is still just the value 2. Different solutions: x = 2 and x = −1 — two of them." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "Highest power = the most real answers you can expect; a repeated answer counts once.", answerLabel: it.ans });
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
          answerLabel: `Yes — k stands for that bracket, so k ≠ ${C(r)} rides along. If solving gives k = ${C(r)}, reject it (N.A.).` }),
      { q: `While using the k-method you find k = ${C(r)}, but the restriction was k ≠ ${C(r)}. What do you do?`, correct: `Reject k = ${C(r)} (mark it N.A.) and keep only the other k-value`, wrongs: ["Keep it — restrictions are about x, not k", "Change the restriction", "Start over with a different letter"], ans: `A value that breaks a restriction is not applicable — cross it out with N.A. and continue with the surviving k-value.` },
    ];
    const it = pick(items);
    return it.type ? it : mc(CON, it.q, it.correct, it.wrongs,
      { hint: "k inherits everything the bracket had — including its restriction.", answerLabel: it.ans });
  },
};

export const questEq3 = {
  id: "eq3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
