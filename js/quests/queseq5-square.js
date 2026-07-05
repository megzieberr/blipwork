/* ============================================================
   EQUATIONS & INEQUALITIES · Q5 — Perfect squares & the turning point
   ------------------------------------------------------------
   c = (b/2)² (only when a = 1!), the sign inside the bracket,
   x² − 13x + c = (x + k)² sign traps, reading TP(p ; q) — p flips,
   q does NOT — and the steps for solving by completing the square.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, frac } from "./_eq.js";

const PSQ = "eqPerfectSquare";
const TPF = "eqTPForm";

const SKILLS = {
  /* complete the constant: x² + bx + □ — fresh even b */
  completeC: () => {
    const half = randInt(2, 6), bb = 2 * half, sign = pick(["+", "−"]);
    const prompt = `Which constant completes the square?<br><b>x² ${sign} ${C(bb)}x + □</b>`;
    const correct = `${C(half * half)}`;
    /* decoys: squared without halving; halved without squaring; squared THEN
       halved (b²/2) — always distinct from (b/2)², unlike 2b which collides at b = 8 */
    const wrongs = [`${C(bb * bb)}`, `${C(half)}`, `${C(bb * bb / 2)}`];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: "Half the middle coefficient, then square it: (b/2)².",
        answerLabel: `(${C(bb)} ÷ 2)² = ${C(half)}² = ${C(half * half)}. Then x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})².` });
  },

  /* the rule only works when a = 1 */
  whenRule: () => {
    const items = [
      ynQ(PSQ,
        "The rule c = (b/2)² works for ANY quadratic ax² + bx + c, whatever a is. True?",
        false,
        { hint: "Try it on 2x² + 8x + … — does 16 complete that square?",
          answerLabel: "False — c = (b/2)² only works when the coefficient of x² is 1. With a coefficient, factor it out FIRST (or use b² = 4ac)." }),
      { q: "You want to complete the square on <b>2x² − 7x + 16</b>. What must happen FIRST?", correct: "Factor the 2 out of the terms", wrongs: ["Add (7/2)² straight away", "Divide only the 16 by 2", "Swap the 7x and the 16"], ans: "With a coefficient on x², factor it out first: 2(x² − 7/2·x + 8) — THEN half-and-square the new middle coefficient inside." },
    ];
    const it = pick(items);
    return it.type ? it : mc(PSQ, it.q, it.correct, it.wrongs,
      { hint: "c = (b/2)² is an a = 1 rule.", answerLabel: it.ans });
  },

  /* the sign inside the bracket matches the middle term — fresh */
  signInside: () => {
    const half = randInt(2, 6), bb = 2 * half, sign = pick(["+", "−"]);
    const prompt = `<b>x² ${sign} ${C(bb)}x + ${C(half * half)} = (x □ ${C(half)})²</b>. Which sign goes in the bracket?`;
    const correct = sign === "+" ? `+, because the middle term is +${C(bb)}x` : `−, because the middle term is −${C(bb)}x`;
    const wrongs = [
      sign === "+" ? `−, because squares make things negative` : `+, because squares are always positive`,
      "Either sign works",
      `±, both brackets at once`,
    ];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: "The sign inside the bracket MATCHES the sign of the middle term.",
        answerLabel: `(x ${sign} ${C(half)})² expands to x² ${sign} ${C(bb)}x + ${C(half * half)} — the bracket's sign is the middle term's sign.` });
  },

  /* x² − 13x + c = (x + k)² — the k sign trap (workbook got it wrong!) */
  findK: () => {
    const odd = pick([5, 7, 9, 11, 13]);
    const prompt = `If <b>x² − ${C(odd)}x + c = (x + k)²</b>, what is k?`;
    const correct = `k = −${frac(odd, 2)}`;
    const wrongs = [`k = ${frac(odd, 2)}`, `k = −${C(odd)}`, `k = ${frac(String(odd * odd), 4)}`];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: "Expand (x + k)² = x² + 2kx + k² and MATCH the middle terms — sign included.",
        answerLabel: `2k = −${C(odd)}, so k = −${frac(odd, 2)} (negative, because the middle term is −${C(odd)}x). And c = k² = ${frac(String(odd * odd), 4)}.` });
  },

  /* read the TP off turning-point form — fresh, with the workbook's q-trap */
  readTP: () => {
    const a = pick([1, 2, 3, -1, -2]);
    const p = randInt(1, 5) * pick([1, -1]);
    const q = randInt(1, 6) * pick([1, -1]);
    const inner = p >= 0 ? `x − ${C(p)}` : `x + ${C(-p)}`;   // y = a(x − p)² + q
    const aStr = a === 1 ? "" : a === -1 ? "−" : C(a);
    const prompt = `Read the turning point of <b>y = ${aStr}(${inner})² ${q >= 0 ? "+" : "−"} ${C(Math.abs(q))}</b>.`;
    const correct = `TP(${C(p)} ; ${C(q)})`;
    const wrongs = [
      `TP(${C(p)} ; ${C(-q)})`,      // flipped q — the workbook's own error
      `TP(${C(-p)} ; ${C(q)})`,      // forgot to flip p
      `TP(${C(-p)} ; ${C(-q)})`,     // flipped both
    ];
    return mc(TPF, prompt, correct, wrongs,
      { hint: "p is read with the OPPOSITE sign of what's in the bracket; q keeps its own sign.",
        answerLabel: `The bracket (${inner}) gives p = ${C(p)} (opposite sign); the constant outside gives q = ${C(q)} (its OWN sign — never flip q). TP(${C(p)} ; ${C(q)}).` });
  },

  /* which sign flips: p, not q */
  pqRule: () => {
    const items = [
      { q: "In turning-point form <b>y = a(x − p)² + q</b>, which value is read with the OPPOSITE sign?", correct: "Only p (the x-value of the TP)", wrongs: ["Only q (the y-value of the TP)", "Both p and q", "Neither — read both as written"], ans: "p flips: (x + 4) means p = −4. q keeps its own sign: … − 1 means q = −1. In words: p is WHERE the TP is, q is WHAT it is." },
      ynQ(TPF,
        "For y = 2(x + 4)² − 1 the turning point is (−4 ; 1). True?",
        false,
        { hint: "Which of p and q flips its sign?",
          answerLabel: "False — the y-value never flips. The constant outside is −1, so the TP is (−4 ; −1). Only p gets the opposite sign." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(TPF, it.q, it.correct, it.wrongs,
      { hint: "Flip p. Never flip q.", answerLabel: it.ans });
  },

  /* happy / sad → min / max */
  happySad: () => {
    const a = randInt(1, 4) * pick([1, -1]);
    const up = a > 0;
    const aStr = a === 1 ? "" : a === -1 ? "−" : C(a);
    const prompt = `In <b>y = ${aStr}(x − 1)² + 3</b>, is the turning point a minimum or a maximum?`;
    const correct = up ? "A minimum — a > 0 makes a happy parabola (opens up)" : "A maximum — a < 0 makes a sad parabola (opens down)";
    const wrongs = [
      up ? "A maximum — a > 0 makes a sad parabola" : "A minimum — a < 0 makes a happy parabola",
      "Neither — turning points are only for graphs of lines",
      "You cannot tell without the roots",
    ];
    return mc(TPF, prompt, correct, wrongs,
      { hint: "a > 0 → happy bowl → the TP is the LOWEST point. a < 0 → sad → highest.",
        answerLabel: `a = ${C(a)} is ${up ? "positive → happy parabola, so the TP is a MINIMUM" : "negative → sad parabola, so the TP is a MAXIMUM"}.` });
  },

  /* the steps for SOLVING by completing the square */
  solveSteps: () => {
    const items = [
      { q: "Solving <b>−x² + 10x − 22 = 0</b> by completing the square. FIRST step?", correct: "Divide every term by −1 (no negative may sit in front of x²)", wrongs: ["Add (10/2)² to both sides immediately", "Take the 22 across first, keep the −x²", "Square-root both sides"], ans: "Kill the negative first: x² − 10x + 22 = 0. Only then take the constant across and add (b/2)² to both sides." },
      { q: "You've reached <b>x² − 10x = −22</b>. What is the next step?", correct: "Add (10/2)² = 25 to BOTH sides", wrongs: ["Add 25 to the left side only", "Square-root both sides now", "Factor out x"], ans: "Add (b/2)² to BOTH sides: x² − 10x + 25 = 3, which packs into (x − 5)² = 3." },
      { q: "You've reached <b>(x − 5)² = 3</b>. What is the next step?", correct: "Square-root both sides and keep the ±: x − 5 = ±√3", wrongs: ["Square both sides", "x − 5 = √3 only", "Expand the bracket again"], ans: "√ both sides (remember ±): x − 5 = ±√3, so x = 5 ± √3." },
      { q: "You rewrote <b>x² − 8x</b> as <b>(x − 4)² − 16</b>. How do you CHECK the rewrite?", correct: "Multiply the bracket back out — it must return exactly x² − 8x", wrongs: ["Substitute x = 4 and see if you get 0", "No check is possible", "Square-root both sides"], ans: "(x − 4)² − 16 = x² − 8x + 16 − 16 = x² − 8x ✓. Completing the square only REWRITES the expression — expanding back must give the original, or something was changed." },
    ];
    const it = pick(items);
    return mc(PSQ, it.q, it.correct, it.wrongs,
      { hint: "No negative on x² → constant across → +(b/2)² both sides → perfect square → √ with ±.", answerLabel: it.ans });
  },
};

export const questEq5 = {
  id: "eq5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["readTP", "pqRule", "happySad"].includes(id) ? TPF : PSQ,
    gen,
  })),
};
