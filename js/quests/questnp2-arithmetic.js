/* ============================================================
   NUMBER PATTERNS · Q2 — Arithmetic (linear) patterns
   ------------------------------------------------------------
   Constant first difference. General term Tₙ = an + c (a = the
   common difference, c = T₀). Find a term, and find which term has
   a given value.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT, P, ord } from "./_patterns.js";
import {
  randArith, arithSeq, arithTn, whichTermArith, linStr, list, C, pick, randInt,
} from "../patternlib.js";
import { L } from "../lang.js";

const ACC = PAT[1];

const SKILLS = {
  /* common difference */
  commonDiff: () => {
    const { seq, d } = randArith();
    return calcQ("patArithmetic",
      L(`Find the common difference of <b>${list(seq)}</b>.`, `Vind die konstante verskil van <b>${list(seq)}</b>.`),
      d,
      { graph: pyramid(seq, { showFirst: true, blankFirst: true, accent: ACC }),
        hint: L("d = any term minus the term before it.", "d = enige term minus die vorige term."),
        answerLabel: L(`d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.`, `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.`),
        solution: [
          { s: L(`d = T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`, `d = T₂ − T₁ = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`), r: L("next − previous", "volgende − vorige") },
          { s: L(`Check: T₃ − T₂ = ${C(seq[2])} − ${P(seq[1])} = ${C(d)}`, `Kontroleer: T₃ − T₂ = ${C(seq[2])} − ${P(seq[1])} = ${C(d)}`), r: L("same, so d is the common difference", "dieselfde, dus is d die konstante verskil") },
        ] });
  },

  /* next term */
  nextTerm: () => {
    const { seq, d } = randArith();
    const last = seq[seq.length - 1];
    return calcQ("patArithmetic",
      L(`What is the next term of <b>${list(seq)}</b>?`, `Wat is die volgende term van <b>${list(seq)}</b>?`),
      last + d,
      { hint: L(`Add the common difference (${C(d)}) to the last term.`, `Tel die konstante verskil (${C(d)}) by die laaste term.`),
        answerLabel: `${C(last)} + ${P(d)} = ${C(last + d)}.`,
        solution: [
          { s: L(`d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`, `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`), r: L("common difference", "konstante verskil") },
          { s: L(`next = last term + d = ${C(last)} + ${P(d)} = ${C(last + d)}`, `volgende = laaste term + d = ${C(last)} + ${P(d)} = ${C(last + d)}`) },
        ] });
  },

  /* choose the general term Tₙ = an + c */
  generalTerm: () => {
    const { a1, d, seq, a, c } = randArith();
    const correct = linStr(a, c);
    // distinct decoys: used T₁ instead of T₀ for c; wrong sign on a; off-by-one on c
    const wrongs = [linStr(a, a1), linStr(-a, c), linStr(a, c - d)]
      .filter((s) => s !== correct);
    return mc("patArithTerm",
      L(`Find the general term Tₙ of <b>${list(seq)}</b>.`, `Vind die algemene term Tₙ van <b>${list(seq)}</b>.`),
      correct, wrongs,
      { layout: "grid2", graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: L("Tₙ = an + c: a is the constant difference (so start with that many n), and c = T₀ — step BACK one difference from T₁.", "Tₙ = an + c: a is die konstante verskil (begin dus met soveel n), en c = T₀: stap een verskil TERUG van T₁ af."),
        answerLabel: L(`a = ${C(d)} and c = T₀ = ${C(a1)} − ${P(d)} = ${C(c)}, so Tₙ = ${correct}.`, `a = ${C(d)} en c = T₀ = ${C(a1)} − ${P(d)} = ${C(c)}, dus Tₙ = ${correct}.`),
        solution: [
          { s: L(`a = d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`, `a = d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}`), r: L("a is the constant difference", "a is die konstante verskil") },
          { s: L(`c = T₀ = T₁ − d = ${C(a1)} − ${P(d)} = ${C(c)}`, `c = T₀ = T₁ − d = ${C(a1)} − ${P(d)} = ${C(c)}`), r: L("step BACK one difference from T₁", "stap een verskil TERUG van T₁ af") },
          { s: L(`Tₙ = an + c = ${correct}`, `Tₙ = an + c = ${correct}`) },
        ] });
  },

  /* a specific term from the formula */
  nthTerm: () => {
    const { a1, d, seq } = randArith();
    const n = pick([10, 12, 15, 20, 25]);
    const c0 = a1 - d, form = linStr(d, c0);
    return calcQ("patArithTerm",
      L(`For the pattern <b>${list(seq)}</b>, find T${C(n)}.`, `Vir die patroon <b>${list(seq)}</b>: vind T${C(n)}.`),
      arithTn(a1, d)(n),
      { graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: L(`First build Tₙ = an + c: a = the difference (${C(d)}), c = T₀ = ${C(a1)} − ${P(d)} = ${C(a1 - d)}. Then put n = ${C(n)} in.`, `Bou eers Tₙ = an + c: a = die verskil (${C(d)}), c = T₀ = ${C(a1)} − ${P(d)} = ${C(a1 - d)}. Vervang dan n = ${C(n)}.`),
        answerLabel: L(`Tₙ = ${form}, so T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(arithTn(a1, d)(n))}.`, `Tₙ = ${form}, dus T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(arithTn(a1, d)(n))}.`),
        solution: [
          { s: L(`a = ${C(d)} and c = T₀ = ${C(a1)} − ${P(d)} = ${C(c0)}`, `a = ${C(d)} en c = T₀ = ${C(a1)} − ${P(d)} = ${C(c0)}`), r: L("build Tₙ = an + c first", "bou eers Tₙ = an + c") },
          { s: L(`Tₙ = ${form}`, `Tₙ = ${form}`) },
          { s: L(`T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(arithTn(a1, d)(n))}`, `T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(arithTn(a1, d)(n))}`), r: L(`substitute n = ${C(n)}`, `vervang n = ${C(n)}`) },
        ] });
  },

  /* evaluate a given formula */
  fromFormula: () => {
    const a = pick([2, 3, 4, 5, -2, -3]);
    const c = randInt(-5, 6);
    const n = pick([6, 7, 8, 9, 11, 12]);
    const form = linStr(a, c);
    return calcQ("patArithTerm",
      L(`A pattern has Tₙ = <b>${form}</b>. Find T${C(n)}.`, `'n Patroon het Tₙ = <b>${form}</b>. Vind T${C(n)}.`),
      a * n + c,
      { hint: L(`Substitute n = ${C(n)} into the formula.`, `Vervang n = ${C(n)} in die formule.`),
        answerLabel: L(`T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(a * n + c)}.`, `T${C(n)} = ${form.replace("n", `(${C(n)})`)} = ${C(a * n + c)}.`),
        solution: [
          { s: L(`T${C(n)} = ${form.replace("n", `(${C(n)})`)}`, `T${C(n)} = ${form.replace("n", `(${C(n)})`)}`), r: L(`put n = ${C(n)} in`, `vervang n = ${C(n)}`) },
          { s: L(`T${C(n)} = ${C(a * n)} ${c < 0 ? "−" : "+"} ${C(Math.abs(c))} = ${C(a * n + c)}`, `T${C(n)} = ${C(a * n)} ${c < 0 ? "−" : "+"} ${C(Math.abs(c))} = ${C(a * n + c)}`) },
        ] });
  },

  /* which term has a given value? */
  whichTerm: () => {
    const { a1, d } = randArith();
    const n = pick([8, 9, 10, 11, 12, 14]);
    const value = arithTn(a1, d)(n);
    const seq = arithSeq(a1, d, 4);
    const c0 = a1 - d, form = linStr(d, c0);
    return calcQ("patArithTerm",
      L(`In <b>${list(seq)} ; …</b>, which term is equal to ${C(value)}? (Find n.)`, `In <b>${list(seq)} ; …</b>, watter term is gelyk aan ${C(value)}? (Vind n.)`),
      whichTermArith(a1, d, value),
      { allowNeg: false,
        hint: L(`Build Tₙ = an + c first (a = ${C(d)}, c = T₀ = ${C(a1 - d)}), then set it equal to ${C(value)} and solve for n.`, `Bou eers Tₙ = an + c (a = ${C(d)}, c = T₀ = ${C(a1 - d)}), stel dit dan gelyk aan ${C(value)} en los op vir n.`),
        answerLabel: L(`${C(value)} = ${linStr(d, a1 - d)}  →  n = ${C(n)} (the ${ord(n)} term).`, `${C(value)} = ${linStr(d, a1 - d)}  →  n = ${C(n)} (die ${ord(n)} term).`),
        solution: [
          { s: L(`a = ${C(d)}, c = T₀ = ${C(a1)} − ${P(d)} = ${C(c0)}  →  Tₙ = ${form}`, `a = ${C(d)}, c = T₀ = ${C(a1)} − ${P(d)} = ${C(c0)}  →  Tₙ = ${form}`), r: L("build the general term first", "bou eers die algemene term") },
          { s: L(`Set it equal to the value: ${form} = ${C(value)}`, `Stel dit gelyk aan die waarde: ${form} = ${C(value)}`) },
          { s: L(`${C(d)}n = ${C(value - c0)}  →  n = ${C(n)}`, `${C(d)}n = ${C(value - c0)}  →  n = ${C(n)}`), r: L(`the ${ord(n)} term`, `die ${ord(n)} term`) },
        ] });
  },

  /* what does c mean in Tₙ = an + c? */
  meaningOfC: () => {
    return mc("patArithTerm",
      L("In the form Tₙ = an + c, what does <b>c</b> equal?", "In die vorm Tₙ = an + c, waaraan is <b>c</b> gelyk?"),
      L("T₀ — the term that would sit before T₁", "T₀: die term wat voor T₁ sou staan"),
      [L("the first term T₁", "die eerste term T₁"), L("the common difference", "die konstante verskil"), L("the last term", "die laaste term")],
      { hint: L("Put n = 0 into an + c. You get c — the ‘zero-th’ term, one step before T₁.", "Vervang n = 0 in an + c. Jy kry c: die ‘nulde’ term, een stap voor T₁."),
        answerLabel: L("c = T₀ (and a is the common difference).", "c = T₀ (en a is die konstante verskil).") });
  },
};

export const questNp2 = {
  id: "np2",
  skills: [
    { id: "commonDiff", concept: "patArithmetic", gen: SKILLS.commonDiff },
    { id: "nextTerm", concept: "patArithmetic", gen: SKILLS.nextTerm },
    { id: "generalTerm", concept: "patArithTerm", gen: SKILLS.generalTerm },
    { id: "nthTerm", concept: "patArithTerm", gen: SKILLS.nthTerm },
    { id: "fromFormula", concept: "patArithTerm", gen: SKILLS.fromFormula },
    { id: "whichTerm", concept: "patArithTerm", gen: SKILLS.whichTerm },
    { id: "meaningOfC", concept: "patArithTerm", gen: SKILLS.meaningOfC },
  ],
};
