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
        answerLabel: `(${C(bb)} ÷ 2)² = ${C(half)}² = ${C(half * half)}. Then x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})².`,
        solution: [
          { s: `Check a first: the coefficient of x² is 1, so the half-and-square rule is allowed` },
          { s: `b/2 = ${C(bb)} ÷ 2 = ${C(half)}`, r: "she writes this in a small boxed working at the top right" },
          { s: `Square it: ${C(half)}² = ${C(half * half)}` },
          { s: `x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})²`, r: "x and b/2 fall into the new bracket; the sign of b comes with them" },
        ] });
  },

  /* the rule only works when a = 1
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (2x² − 7x + 16) — parametrisable"). The second item's
     trinomial now rolls. Guards: gcd(a, b) = 1 so b/a is a REAL fraction
     (the reason you cannot just half-and-square as it stands), and c is a
     multiple of a so the factored line a(x² − b/a·x + c/a) stays whole —
     both exactly as her original 2x² − 7x + 16 → 2(x² − 7/2·x + 8) did.
     The first item has no numbers of its own — untouched. */
  whenRule: () => {
    if (pick([true, false])) {
      return ynQ(PSQ,
        "The rule c = (b/2)² works for ANY quadratic ax² + bx + c, whatever a is. True?",
        false,
        { hint: "Try it on 2x² + 8x + … — does 16 complete that square?",
          answerLabel: "False — c = (b/2)² only works when the coefficient of x² is 1. With a coefficient, factor it out FIRST (or use b² = 4ac).",
          solution: [
            { s: "Test it on 2x² + 8x + 16: half-and-square says the constant should be (8/2)² = 16" },
            { s: "But 2(x + 2)² = 2x² + 8x + 8, so the constant that actually works is 8, not 16", r: "the rule has failed" },
            { s: "∴ false — half-and-square is an a = 1 rule; with a coefficient on x², factor it out first" },
          ] });
    }
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    const a = pick([2, 3, 4, 5]);
    let bb = pick([5, 7, 9, 11, 13]);
    while (gcd(a, bb) !== 1) bb = pick([5, 7, 9, 11, 13]);   // b/a must be a real fraction
    const t = randInt(3, 9), cc = a * t;                     // c ÷ a stays a whole number
    return mc(PSQ,
      `You want to complete the square on <b>${C(a)}x² − ${C(bb)}x + ${C(cc)}</b>. What must happen FIRST?`,
      `Factor the ${C(a)} out of the terms`,
      [`Add (${C(bb)}/2)² straight away`, `Divide only the ${C(cc)} by ${C(a)}`, `Swap the ${C(bb)}x and the ${C(cc)}`],
      { hint: "c = (b/2)² is an a = 1 rule.",
        answerLabel: `With a coefficient on x², factor it out first: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)}) — THEN half-and-square the new middle coefficient inside.`,
        solution: [
          { s: `The coefficient of x² is ${C(a)}, not 1, so half-and-square cannot be used as it stands` },
          { s: `Factor the ${C(a)} out of the WHOLE expression, constant included: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)})`,
            r: "accept the fraction it creates — that is normal here" },
          { s: `Now the inside has a coefficient of 1, so half-and-square the new middle number` },
          { s: `Switch to square brackets once the inner bracket is formed, and multiply the ${C(a)} back in at the very end` },
        ] });
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
        answerLabel: `(x ${sign} ${C(half)})² expands to x² ${sign} ${C(bb)}x + ${C(half * half)} — the bracket's sign is the middle term's sign.`,
        solution: [
          { s: `Work backwards: expand (x ${sign} ${C(half)})² = x² ${sign} ${C(bb)}x + ${C(half * half)}` },
          { s: `The middle term came out as ${sign}${C(bb)}x, matching the question` },
          { s: `So the bracket takes ${sign}`, r: "the sign of b falls into the bracket — the squared constant is positive either way" },
        ] });
  },

  /* x² − 13x + c = (x + k)² — the k sign trap (workbook got it wrong!) */
  findK: () => {
    const odd = pick([5, 7, 9, 11, 13]);
    const prompt = `If <b>x² − ${C(odd)}x + c = (x + k)²</b>, what is k?`;
    const correct = `k = −${frac(odd, 2)}`;
    const wrongs = [`k = ${frac(odd, 2)}`, `k = −${C(odd)}`, `k = ${frac(String(odd * odd), 4)}`];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: "Expand (x + k)² = x² + 2kx + k² and MATCH the middle terms — sign included.",
        answerLabel: `2k = −${C(odd)}, so k = −${frac(odd, 2)} (negative, because the middle term is −${C(odd)}x). And c = k² = ${frac(String(odd * odd), 4)}.`,
        solution: [
          { s: `Expand the right side: (x + k)² = x² + 2kx + k²` },
          { s: `Match the middle terms, sign and all: 2k = −${C(odd)}` },
          { s: `k = −${frac(odd, 2)}`, r: `the bracket is written (x + k), so a middle term of −${C(odd)}x forces k to be NEGATIVE` },
          { s: `And then c = k² = ${frac(String(odd * odd), 4)}`, r: "squaring makes c positive" },
        ] });
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
        answerLabel: `The bracket (${inner}) gives p = ${C(p)} (opposite sign); the constant outside gives q = ${C(q)} (its OWN sign — never flip q). TP(${C(p)} ; ${C(q)}).`,
        solution: [
          { s: `Line it up with y = a(x − p)² + q` },
          { s: `The bracket reads (${inner}), so p = ${C(p)}`, r: "OPPOSITE sign to what you see inside the bracket" },
          { s: `The constant outside the bracket is q = ${C(q)}`, r: "q keeps its own sign — never flip it" },
          { s: `∴ TP(${C(p)} ; ${C(q)})`, r: "coordinates take a semicolon, not a comma" },
        ] });
  },

  /* which sign flips: p, not q
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (y = 2(x + 4)² − 1) — parametrisable"). The yes/no
     item keeps the SHAPE that makes it a trap — a plus inside the bracket
     and a minus outside, with the claimed TP flipping q instead of p —
     and rolls a, h and k. The statement is false for every roll, so the
     teaching point ("the y-value never flips") is untouched. */
  pqRule: () => {
    if (pick([true, false])) {
      const it = { q: "In turning-point form <b>y = a(x − p)² + q</b>, which value is read with the OPPOSITE sign?", correct: "Only p (the x-value of the TP)", wrongs: ["Only q (the y-value of the TP)", "Both p and q", "Neither — read both as written"], ans: "p flips: (x + 4) means p = −4. q keeps its own sign: … − 1 means q = −1. In words: p is WHERE the TP is, q is WHAT it is." };
      return mc(TPF, it.q, it.correct, it.wrongs,
        { hint: "Flip p. Never flip q.", answerLabel: it.ans,
          solution: [
            { s: "The form is y = a(x − p)² + q, and p is written with a MINUS built into it" },
            { s: "So (x + 4) is really (x − (−4)), which is why p reads as −4 — the flip comes from that hidden minus" },
            { s: "q has no hidden minus: it is written + q, so … − 1 simply means q = −1", r: "∴ only p flips" },
          ] });
    }
    const a = pick([2, 3, 4]), h = randInt(2, 6), k = randInt(1, 6);
    return ynQ(TPF,
      `For y = ${C(a)}(x + ${C(h)})² − ${C(k)} the turning point is (${C(-h)} ; ${C(k)}). True?`,
      false,
      { hint: "Which of p and q flips its sign?",
        answerLabel: `False — the y-value never flips. The constant outside is ${C(-k)}, so the TP is (${C(-h)} ; ${C(-k)}). Only p gets the opposite sign.`,
        solution: [
          { s: `The bracket is (x + ${C(h)}), so p = ${C(-h)}`, r: "that part of the claim is right" },
          { s: `The constant outside is − ${C(k)}, so q = ${C(-k)} — it keeps its own sign` },
          { s: `∴ the TP is (${C(-h)} ; ${C(-k)}), not (${C(-h)} ; ${C(k)})`, r: "the y-value never flips" },
        ] });
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
        answerLabel: `a = ${C(a)} is ${up ? "positive → happy parabola, so the TP is a MINIMUM" : "negative → sad parabola, so the TP is a MAXIMUM"}.`,
        solution: [
          { s: `Only a decides the shape. Here a = ${C(a)}` },
          { s: `a is ${up ? "positive, so the arms point up — a happy parabola" : "negative, so the arms point down — a sad parabola"}` },
          { s: `${up ? "A happy parabola sits in its lowest point at the turning point, so it is a MINIMUM" : "A sad parabola reaches its highest point at the turning point, so it is a MAXIMUM"}`,
            r: "the bracket and the constant move the TP around, but they cannot change the shape" },
        ] });
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
