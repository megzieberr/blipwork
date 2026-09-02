/* ============================================================
   EXPONENTS & SURDS · Q5 — Surd laws & traps
   ------------------------------------------------------------
   Same-root × and ÷, the BIG NO-NO (√a + √b ≠ √(a+b)), like
   surds, the inside/outside fraction rule, and the sign rules
   (non-real even roots, ± two answers).

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule):
   the three CARE skills of DICE-AUDIT §11 (likeSurds, insideOutside,
   twoAnswers) now roll their numbers instead of picking between two
   or three fixed instances. Wording, mechanic and every decoy FAMILY
   are unchanged — each wrong option is still the same misconception,
   recomputed from the same roll (added the insides, multiplied the
   coefficients, added the root indices, forgot the ±, …).
   multiplyDivide / bigNoNo / signRules were CLEAN (fully symbolic)
   and are untouched.
   ============================================================ */
import { mc, ynQ, pick, shuffled, randInt, usup, upw } from "./_exp.js";

const LAW = "surdLaws";
const SIGN = "surdSigns";
const VARS = ["x", "y", "a", "m"];

const SKILLS = {
  /* multiply / divide same root */
  multiplyDivide: () => {
    const items = [
      { q: "Simplify <b>√a · √b</b> (same root; a, b ≥ 0).", correct: "√(ab)", wrongs: ["√(a+b)", "ab", "√a + √b"], ans: "Same root: multiply the insides — √a·√b = √(ab).",
        sol: [{ s: "Surd law ①: × and ÷ may go under the SAME root" },
              { s: "√a · √b = √(a × b) = √(ab)" },
              { s: "Check it on numbers: √4 · √9 = 2 × 3 = 6, and √36 = 6", r: "the root sign does not disappear — the answer is still a surd" }] },
      { q: "Simplify <b>√a ÷ √b</b> (same root; a ≥ 0, b &gt; 0).", correct: "√(a/b)", wrongs: ["√(a−b)", "a/b", "√a − √b"], ans: "Same root: divide the insides — √a ÷ √b = √(a/b).",
        sol: [{ s: "Surd law ①: × and ÷ may go under the SAME root" },
              { s: "√a ÷ √b = √(a ÷ b) = √(a/b)" },
              { s: "Check it on numbers: √36 ÷ √4 = 6 ÷ 2 = 3, and √9 = 3", r: "the root stays — this is not a/b" }] },
    ];
    const it = pick(items);
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Same root → you may combine the insides under one root for × and ÷.", answerLabel: it.ans, solution: it.sol });
  },

  /* the BIG NO-NO */
  bigNoNo: () => ynQ(LAW,
    "Is this correct?<br><b>√a + √b = √(a + b)</b>",
    false,
    { hint: "Try numbers: √9 + √16 = 3 + 4 = 7, but √25 = 5.",
      answerLabel: "No — the BIG NO-NO. You can never add the insides of two surds. √a + √b stays as it is.",
      solution: [
        { s: "Test it with numbers you can work out: let a = 9 and b = 16" },
        { s: "√9 + √16 = 3 + 4 = 7, but √(9 + 16) = √25 = 5", r: "7 ≠ 5, so the statement is false" },
        { s: "Surds combine under one root for × and ÷ only, never for + or −", r: "her BIG NO-NO — √a + √b just stays as it is" },
      ] }),

  /* like surds add */
  likeSurds: () => {
    const items = [
      /* a√v − b√v.  Guards: b ≥ 2 so the QUESTION never reads "1√v", and
         a − b ≥ 2 so the ANSWER never does either (PNG review, 2026-08-23:
         a roll of 8√a − 1√a is bad maths writing even though it is true). */
      () => {
        const v = pick(VARS);
        let a, b;
        do { a = randInt(4, 9); b = randInt(2, 6); } while (a - b < 2);
        return {
          q: `Simplify <b>${a}√${v} − ${b}√${v}</b>.`, correct: `${a - b}√${v}`,
          wrongs: [`${a - b}√(2${v})`, `${a + b}√${v}`, `${a - b}${v}`],
          ans: `Like surds add like terms: ${a}√${v} − ${b}√${v} = ${a - b}√${v}.`,
          sol: [
            { s: `Both terms carry the same surd, √${v}`, r: "surd law ②: + and − need the same root AND the same inside" },
            { s: `So only the numbers in front change: ${a} − ${b} = ${a - b}` },
            { s: `∴ ${a - b}√${v}`, r: `the √${v} is carried through untouched — it never becomes ${v} or √(2${v})` },
          ],
        };
      },
      /* √v + √v — the "just like x + x = 2x" case, so the coefficients
         stay 1 (that IS the teaching point); only the letter rolls. */
      () => {
        const v = pick(VARS);
        return {
          q: `Simplify <b>√${v} + √${v}</b>.`, correct: `2√${v}`,
          wrongs: [`√(2${v})`, `2${v}`, `√${v}²`],
          ans: `Two of the same surd: √${v} + √${v} = 2√${v} (just like ${v} + ${v} = 2${v}).`,
          sol: [
            { s: `Write the invisible coefficients in: 1√${v} + 1√${v}`, r: "keeping the 1 visible is the scaffold" },
            { s: `Same root and same inside, so only the front numbers add: 1 + 1 = 2` },
            { s: `∴ 2√${v}`, r: `exactly like ${v} + ${v} = 2${v} — the inside never doubles` },
          ],
        };
      },
      /* a·ⁿ√r + b·ⁿ√r.  Guard a·b ≠ a+b so the "multiplied the
         coefficients" decoy can never equal the correct answer. */
      () => {
        let a, b;
        do { a = randInt(2, 6); b = randInt(2, 6); } while (a * b === a + b);
        const n = pick([3, 4]), r = randInt(2, 7);
        return {
          q: `Simplify <b>${a}·${usup(n)}√${r} + ${b}·${usup(n)}√${r}</b>.`, correct: `${a + b}·${usup(n)}√${r}`,
          wrongs: [`${a + b}·${usup(n)}√${2 * r}`, `${a * b}·${usup(n)}√${r}`, `${a + b}·${usup(2 * n)}√${r}`],
          ans: `Same surd (${usup(n)}√${r}), so add the coefficients: ${a} + ${b} = ${a + b} → ${a + b}·${usup(n)}√${r}.`,
          sol: [
            { s: `Both terms are the same surd, ${usup(n)}√${r} — same root index ${n}, same inside ${r}`, r: "so they are like terms" },
            { s: `Add only the numbers in front: ${a} + ${b} = ${a + b}` },
            { s: `∴ ${a + b}·${usup(n)}√${r}`, r: `the inside stays ${r} and the root stays ${n} — neither of them adds` },
          ],
        };
      },
    ];
    const it = pick(items)();
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Only surds with the SAME root and SAME inside can be added — combine the numbers in front.", answerLabel: it.ans, solution: it.sol });
  },

  /* inside power → top, root → bottom */
  insideOutside: () => {
    /* the generic (rule-recall) item — unchanged, it was already CLEAN */
    const generic = () => ({
      q: "Where does the <b>inside power</b> go when you write ⁿ√(xᵃ) = x^(?/?)?", correct: "On the top (numerator)",
      wrongs: ["On the bottom (denominator)", "It disappears", "It stays inside"],
      ans: "Inside power → top; root index → bottom: ⁿ√(xᵃ) = x^(a/n).",
      sol: [
        { s: "Her conversion hook: inside √ = top of the fraction; outside √ = bottom of the fraction" },
        { s: "The a is written inside the root, so it goes on top" },
        { s: "∴ ⁿ√(xᵃ) = x^(a/n)", r: "check it on √(x²) = x^(2/2) = x" },
      ],
    });
    /* ONE template now covers both concrete items (√(x⁴) and ³√(y⁶)):
       index n ∈ {2,3}, inside power a = n·k so the answer is exact.
       Decoys are the three mistakes the fixed items used — forgot the
       root (xᵃ), multiplied instead of divided (x^(a·n)), added (x^(a+n)).
       k ≥ 2 and n ≥ 2 keep all four labels distinct. */
    const powerItem = () => {
      const v = pick(VARS), n = pick([2, 3]), k = randInt(2, 4), a = n * k;
      const idx = n === 2 ? "" : usup(n);
      return {
        q: `Simplify <b>${idx}√(${upw(v, a)})</b>.`, correct: upw(v, k),
        wrongs: [upw(v, a), upw(v, a * n), upw(v, a + n)],
        ans: `${idx}√(${upw(v, a)}) = ${v}^(${a}/${n}) = ${upw(v, k)}.`,
        sol: [
          { s: `Turn the root into a fractional exponent: inside power on top, root index underneath` },
          { s: `${idx}√(${upw(v, a)}) = ${v}^(${a}/${n})`, r: `the root here is ${n}` },
          { s: `${a} ÷ ${n} = ${k}, so the answer is ${upw(v, k)}`, r: "divide the exponents — never multiply or add them" },
        ],
      };
    };
    /* the generic item stays 1-in-3, exactly as in the fixed 3-item bank */
    const it = pick([generic, powerItem, powerItem])();
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Inside the root → on top of the fraction; the root index → on the bottom.", answerLabel: it.ans, solution: it.sol });
  },

  /* sign / non-real */
  signRules: () => {
    const items = [
      { q: "A <b>negative</b> number is raised to an <b>even</b> power (e.g. (−5)²). The result is:", correct: "Positive", wrongs: ["Negative", "Zero", "Non-real"], ans: "An even power of a negative is positive: (−5)² = 25.",
        sol: [{ s: "Write it out: (−5)² = (−5)(−5)" },
              { s: "The two minuses pair up and cancel, giving +25", r: "an even power means every minus finds a partner" },
              { s: "∴ positive" }] },
      { q: "A <b>negative</b> number is raised to an <b>odd</b> power (e.g. (−5)³). The result is:", correct: "Negative", wrongs: ["Positive", "Zero", "Non-real"], ans: "An odd power of a negative is negative: (−5)³ = −125.",
        sol: [{ s: "Write it out: (−5)³ = (−5)(−5)(−5)" },
              { s: "The first two minuses cancel to +25, and the last one is left over: 25 × (−5) = −125", r: "an odd power always leaves one minus without a partner" },
              { s: "∴ negative" }] },
      { q: "What kind of value is <b>√(−4)</b> (an even root of a negative)?", correct: "Non-real", wrongs: ["Positive", "Negative", "Zero"], ans: "An even root of a negative number is non-real.",
        sol: [{ s: "√(−4) asks: what number, squared, gives −4?" },
              { s: "2² = 4 and (−2)² = 4 — squaring kills the minus every time, so nothing real squares to a negative" },
              { s: "∴ non-real", r: "her word for this one: non-real, not “no solution”" }] },
      { q: "What is <b>³√(−8)</b> (an odd root of a negative)?", correct: "−2 (real and negative)", wrongs: ["Non-real", "+2", "±2"], ans: "An odd root of a negative is real and negative: ³√(−8) = −2.",
        sol: [{ s: "³√(−8) asks: what number, cubed, gives −8?" },
              { s: "(−2)³ = (−2)(−2)(−2) = −8", r: "an odd power keeps the minus, so an odd root is allowed to be negative" },
              { s: "∴ −2, which is real", r: "this is where an odd root differs from an even one" }] },
    ];
    const it = pick(items);
    return mc(SIGN, it.q, it.correct, it.wrongs, { hint: "Even power/root behaves differently from odd; even root of a negative is non-real.", answerLabel: it.ans, solution: it.sol });
  },

  /* two answers from an even root of a positive (in an equation).
     r ≥ 2 keeps the "√r" decoy from collapsing to r (√1 = 1). The four
     misconceptions are exactly the ones the two fixed items used —
     three are dealt per roll, so both original option sets occur. */
  twoAnswers: () => {
    const r = randInt(2, 12), k = r * r;
    const wrongs = shuffled([`x = ${r} only`, `x = −${r} only`, `x = ±√${r}`, "no real solution"]).slice(0, 3);
    const ans = pick([
      `Taking the square root of both sides gives x = ±${r} (two answers).`,
      `x = ±${r} — an even root of a positive gives two answers.`,
    ]);
    return mc(SIGN, `Solve <b>x² = ${k}</b>.`, `x = ±${r}`, wrongs,
      { hint: "When you square-root both sides of an equation, remember the ± (both signs work).", answerLabel: ans,
        solution: [
          { s: `x² = ${k}, so take the square root of BOTH sides` },
          { s: `x = ±√${k} = ±${r}`, r: "the ± appears the moment an even root is taken" },
          { s: `Both really work: (${r})² = ${k} and (−${r})² = ${k}`, r: "this is an equation, so it has two solutions" },
        ] });
  },
};

export const questEs5 = {
  id: "es5",
  skills: [
    { id: "multiplyDivide", concept: LAW, gen: SKILLS.multiplyDivide },
    { id: "bigNoNo", concept: LAW, gen: SKILLS.bigNoNo },
    { id: "likeSurds", concept: LAW, gen: SKILLS.likeSurds },
    { id: "insideOutside", concept: LAW, gen: SKILLS.insideOutside },
    { id: "signRules", concept: SIGN, gen: SKILLS.signRules },
    { id: "twoAnswers", concept: SIGN, gen: SKILLS.twoAnswers },
  ],
};
