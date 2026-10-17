/* ============================================================
   EXPONENTS & SURDS · Q6 — Conjugates & rationalising
   ------------------------------------------------------------
   What the conjugate is, why it works (difference of squares),
   how to rationalise one- and two-term denominators, and the
   a + b√c form.

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule).
   DICE-AUDIT §11 marked five of the seven skills CARE (findConjugate,
   conjugateProduct, rationaliseSingle, rationaliseTwo, abForm): each
   was 2–3 concrete surds with a clearly parametrisable pattern. Each
   is now a small set of SHAPES — the same shapes the fixed items had
   (√a ± b, √a ± √b, b ± √a, a two-term denominator either way round)
   — with rolled numbers and honestly recomputed answers and decoys.
   Every surd draws from NONSQ (non-square radicands), so a rolled
   root never quietly becomes an integer. whyConjugate / equalsOne
   were CLEAN and are untouched.
   ============================================================ */
import { mc, ynQ, pick, randInt, NONSQ, gcd, sgn } from "./_exp.js";
import { L } from "../lang.js";

const CONJ = "conjugates";
const RAT = "rationalise";
const VARS = [L("x", "x"), L("y", "y"), L("a", "a"), L("m", "m")];

const SKILLS = {
  /* what is the conjugate — three shapes, one per fixed item that was
     here before. The third decoy is always the conjugate PRODUCT (the
     misconception the vetted answer text calls out by name). */
  findConjugate: () => {
    const shapes = [
      /* √a + b  →  √a − b   (product a − b², never 0: a is non-square) */
      () => {
        const a = pick(NONSQ), b = randInt(1, 5), p = a - b * b;
        return {
          q: L(`What is the <b>conjugate</b> of √${a} + ${b}?`, `Wat is die <b>toegevoegde wortelvorm</b> van √${a} + ${b}?`), correct: `√${a} − ${b}`,
          wrongs: [`√${a} + ${b}`, `−√${a} − ${b}`, sgn(p)],
          ans: L(`Flip the middle sign: the conjugate of √${a} + ${b} is √${a} − ${b}. (The ${sgn(p)} is the conjugate PRODUCT (√${a}+${b})(√${a}−${b}), not the conjugate itself.)`, `Draai die middelste teken om: die toegevoegde van √${a} + ${b} is √${a} − ${b}. (Die ${sgn(p)} is die toegevoegde PRODUK (√${a}+${b})(√${a}−${b}), nie die toegevoegde self nie.)`),
          sol: [
            { s: L(`The conjugate keeps BOTH terms exactly as they are — only the middle sign flips`, `Die toegevoegde hou ALBEI terme presies soos hulle is: net die middelste teken draai om`) },
            { s: `√${a} + ${b} → √${a} − ${b}` },
            { s: L(`Multiplying the two together is what kills the surd: (√${a})² − ${b}² = ${sgn(p)}`, `As jy die twee met mekaar vermenigvuldig, verdwyn die wortelvorm: (√${a})² − ${b}² = ${sgn(p)}`), r: L(`${sgn(p)} is the PRODUCT, not the conjugate`, `${sgn(p)} is die PRODUK, nie die toegevoegde nie`) },
          ],
        };
      },
      /* √a − √b  →  √a + √b   (product a − b; a ≠ b keeps it non-zero) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = pick(NONSQ); } while (a === b);
        const p = a - b;
        return {
          q: L(`What is the <b>conjugate</b> of √${a} − √${b}?`, `Wat is die <b>toegevoegde wortelvorm</b> van √${a} − √${b}?`), correct: `√${a} + √${b}`,
          wrongs: [`√${b} − √${a}`, `√${a} − √${b}`, sgn(p)],
          ans: L(`Flip the middle sign: √${a} − √${b} → √${a} + √${b}. (${sgn(p)} is the conjugate PRODUCT (√${a})² − (√${b})², not the conjugate.)`, `Draai die middelste teken om: √${a} − √${b} → √${a} + √${b}. (${sgn(p)} is die toegevoegde PRODUK (√${a})² − (√${b})², nie die toegevoegde nie.)`),
          sol: [
            { s: L(`Both terms stay where they are — the order does not change and neither term gains a minus`, `Albei terme bly waar hulle is: die volgorde verander nie en geen term kry 'n minus nie`) },
            { s: L(`Only the middle sign flips: √${a} − √${b} → √${a} + √${b}`, `Net die middelste teken draai om: √${a} − √${b} → √${a} + √${b}`) },
            { s: L(`Their product is (√${a})² − (√${b})² = ${a} − ${b} = ${sgn(p)}`, `Hulle produk is (√${a})² − (√${b})² = ${a} − ${b} = ${sgn(p)}`), r: L("that is the point of the conjugate — both roots die", "dis die doel van die toegevoegde: albei wortels gaan dood") },
          ],
        };
      },
      /* b + √a  →  b − √a   (product b² − a) */
      () => {
        const a = pick(NONSQ), b = randInt(1, 5), p = b * b - a;
        return {
          q: L(`What is the <b>conjugate</b> of ${b} + √${a}?`, `Wat is die <b>toegevoegde wortelvorm</b> van ${b} + √${a}?`), correct: `${b} − √${a}`,
          wrongs: [`−${b} − √${a}`, `${b} + √${a}`, sgn(p)],
          ans: L(`Same two terms, opposite middle sign: ${b} − √${a}. (${sgn(p)} is the conjugate PRODUCT ${b}² − (√${a})², not the conjugate.)`, `Dieselfde twee terme, teenoorgestelde middelste teken: ${b} − √${a}. (${sgn(p)} is die toegevoegde PRODUK ${b}² − (√${a})², nie die toegevoegde nie.)`),
          sol: [
            { s: L(`The conjugate keeps both terms and only flips the middle sign`, `Die toegevoegde hou albei terme en draai net die middelste teken om`) },
            { s: `${b} + √${a} → ${b} − √${a}`, r: L(`the minus goes in the MIDDLE, not in front of the ${b}`, `die minus kom in die MIDDEL, nie voor die ${b} nie`) },
            { s: L(`Their product is ${b}² − (√${a})² = ${sgn(p)}`, `Hulle produk is ${b}² − (√${a})² = ${sgn(p)}`), r: L("no surd left — which is why we use it", "geen wortelvorm oor nie: dis hoekom ons dit gebruik") },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: L("Keep both terms exactly the same; just change the + to − (or − to +).", "Hou albei terme presies dieselfde; verander net die + na − (of − na +)."), answerLabel: it.ans, solution: it.sol });
  },

  /* why use the conjugate */
  whyConjugate: () => mc(CONJ,
    L("Why do we multiply by the conjugate when rationalising a two-term denominator?", "Hoekom vermenigvuldig ons met die toegevoegde as ons 'n noemer met twee terme rasionaliseer?"),
    L("The denominator becomes a difference of squares, so the surd disappears", "Die noemer word 'n verskil van twee vierkante, so die wortelvorm verdwyn"),
    [L("It makes the numerator a perfect square", "Dit maak die teller 'n volkome vierkant"), L("It cancels the whole fraction", "Dit kanselleer die hele breuk"), L("It changes the value to a whole number", "Dit verander die waarde na 'n heelgetal")],
    { hint: L("(√a + b)(√a − b) = (√a)² − b² — what happens to the root?", "(√a + b)(√a − b) = (√a)² − b²: wat gebeur met die wortel?"),
      answerLabel: L("(√a + b)(√a − b) = a − b², a difference of squares with NO surd left on the bottom.", "(√a + b)(√a − b) = a − b², 'n verskil van twee vierkante met GEEN wortelvorm onder oor nie."),
      solution: [
        { s: L("Multiply the two brackets out: (√a + b)(√a − b) = a − b√a + b√a − b²", "Vermenigvuldig die twee hakies uit: (√a + b)(√a − b) = a − b√a + b√a − b²") },
        { s: L("The two middle terms are opposites, so they cancel", "Die twee middelste terme is teenoorgesteldes, dus kanselleer hulle"), r: L("that only happens because the signs are opposite", "dit gebeur net omdat die tekens teenoorgesteld is") },
        { s: L("What is left is a − b² — a plain number with no root in it", "Wat oorbly, is a − b²: 'n gewone getal sonder 'n wortel daarin"), r: L("so the denominator is rationalised", "so die noemer is gerasionaliseer") },
      ] }),

  /* conjugate product — the same three shapes, decoys recomputed:
     dropped the second square, ADDED instead of subtracted, kept the
     cross terms / left the root on. */
  conjugateProduct: () => {
    const shapes = [
      /* (√a + b)(√a − b) = a − b²  (guard a − b² ≥ 1: a positive answer,
         and it can never collide with the a + b² decoy) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = randInt(1, 3); } while (a - b * b < 1);
        return {
          q: L(`Simplify <b>(√${a} + ${b})(√${a} − ${b})</b>.`, `Vereenvoudig <b>(√${a} + ${b})(√${a} − ${b})</b>.`), correct: `${a - b * b}`,
          wrongs: [`√${a}`, `${a + b * b}`, `2√${a}`],
          ans: L(`Difference of squares: (√${a})² − ${b}² = ${a} − ${b * b} = ${a - b * b}.`, `Verskil van twee vierkante: (√${a})² − ${b}² = ${a} − ${b * b} = ${a - b * b}.`),
          sol: [
            { s: L(`Same two terms with opposite middle signs, so the cross terms cancel`, `Dieselfde twee terme met teenoorgestelde middelste tekens, dus kanselleer die middelste terme`), r: L("diff in □'s", "verskil van □'e") },
            { s: `(√${a})² − ${b}² = ${a} − ${b * b}` },
            { s: `= ${a - b * b}`, r: L("squaring a root undoes it, so no surd survives", "kwadrering maak 'n wortel ongedaan, so geen wortelvorm bly oor nie") },
          ],
        };
      },
      /* (√a + √b)(√a − √b) = a − b  (guard a > b) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = pick(NONSQ); } while (a - b < 1);
        return {
          q: L(`Simplify <b>(√${a} + √${b})(√${a} − √${b})</b>.`, `Vereenvoudig <b>(√${a} + √${b})(√${a} − √${b})</b>.`), correct: `${a - b}`,
          wrongs: [`√${a + b}`, `${a + b}`, `√${a - b}`],
          ans: `(√${a})² − (√${b})² = ${a} − ${b} = ${a - b}.`,
          sol: [
            { s: L(`Opposite middle signs, so the two cross terms cancel`, `Teenoorgestelde middelste tekens, dus kanselleer die twee middelste terme`), r: L("diff in □'s", "verskil van □'e") },
            { s: `(√${a})² − (√${b})² = ${a} − ${b}` },
            { s: `= ${a - b}`, r: L("both roots are squared away — the answer is a plain number", "albei wortels word weggekwadreer: die antwoord is 'n gewone getal") },
          ],
        };
      },
      /* (√v + c)(√v − c) = v − c²  (c ≥ 2 so c² ≠ c) */
      () => {
        const v = pick(VARS), c = randInt(2, 6);
        return {
          q: L(`Simplify <b>(√${v} + ${c})(√${v} − ${c})</b>.`, `Vereenvoudig <b>(√${v} + ${c})(√${v} − ${c})</b>.`), correct: `${v} − ${c * c}`,
          wrongs: [`${v} + ${c * c}`, `√${v} − ${c * c}`, `${v} − ${c}`],
          ans: `(√${v})² − ${c}² = ${v} − ${c * c}.`,
          sol: [
            { s: L(`Opposite middle signs, so the cross terms cancel`, `Teenoorgestelde middelste tekens, dus kanselleer die middelste terme`), r: L("diff in □'s", "verskil van □'e") },
            { s: `(√${v})² − ${c}² = ${v} − ${c * c}` },
            { s: L(`The √${v} squared gives just ${v}`, `√${v} gekwadreer gee net ${v}`), r: L(`and ${c}² = ${c * c}`, `en ${c}² = ${c * c}`) },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: L("(first)² − (second)² — the cross terms cancel.", "(eerste)² − (tweede)²: die middelste terme kanselleer."), answerLabel: it.ans, solution: it.sol });
  },

  /* rationalise single term.  gcd(c, a) = 1 keeps the worked answer
     c√a/a in lowest terms (her "simplify once, at the end" habit);
     c ≠ a keeps every option label distinct. */
  rationaliseSingle: () => {
    let c, a;
    do { c = randInt(1, 6); a = pick(NONSQ); } while (gcd(c, a) !== 1 || c === a);
    return mc(RAT, L(`To rationalise <b>${c}/√${a}</b>, multiply top and bottom by:`, `Om <b>${c}/√${a}</b> te rasionaliseer, vermenigvuldig bo en onder met:`),
      `√${a} / √${a}`, [`${a} / ${a}`, `${c} / √${a}`, `√${a} / ${c}`],
      { hint: L("Multiply by the surd over itself — that’s multiplying by 1.", "Vermenigvuldig met die wortelvorm oor homself: dis vermenigvuldig met 1."),
        answerLabel: L(`Multiply by √${a}/√${a} (= 1): ${c}/√${a} × √${a}/√${a} = ${c === 1 ? "" : c}√${a}/${a}.`, `Vermenigvuldig met √${a}/√${a} (= 1): ${c}/√${a} × √${a}/√${a} = ${c === 1 ? "" : c}√${a}/${a}.`),
        solution: [
          { s: L(`The bottom is a single surd, √${a}, so multiply top and bottom by that same surd`, `Onder is 'n enkele wortelvorm, √${a}, dus vermenigvuldig bo en onder met daardie selfde wortelvorm`) },
          { s: L(`√${a}/√${a} is just 1, so the VALUE does not change — only the form does`, `√${a}/√${a} is net 1, dus verander die WAARDE nie: net die vorm verander`) },
          { s: `${c}/√${a} × √${a}/√${a} = ${c === 1 ? "" : c}√${a}/${a}`, r: L(`√${a} × √${a} = ${a}, so the bottom is rational`, `√${a} × √${a} = ${a}, dus is die noemer rasionaal`) },
        ] });
  },

  /* rationalise two terms — both orders of the denominator, same three
     decoys: no flip at all, the single surd, and a top/bottom mismatch. */
  rationaliseTwo: () => {
    const shapes = [
      () => {
        const c = randInt(2, 7), p = randInt(1, 5), a = pick(NONSQ);
        return {
          q: L(`To rationalise <b>${c}/(${p} + √${a})</b>, multiply top and bottom by:`, `Om <b>${c}/(${p} + √${a})</b> te rasionaliseer, vermenigvuldig bo en onder met:`),
          correct: `(${p} − √${a})/(${p} − √${a})`,
          wrongs: [`(${p} + √${a})/(${p} + √${a})`, `√${a}/√${a}`, `(${p} − √${a})/(${p} + √${a})`],
          ans: L(`Multiply by the conjugate over itself: (${p} − √${a})/(${p} − √${a}). It must be the SAME thing top and bottom (×1), or the value changes.`, `Vermenigvuldig met die toegevoegde oor homself: (${p} − √${a})/(${p} − √${a}). Dit moet DIESELFDE ding bo en onder wees (×1), anders verander die waarde.`),
          sol: [
            { s: L(`The bottom has TWO terms, so a single surd will not clear it — use the conjugate`, `Die noemer het TWEE terme, dus sal 'n enkele wortelvorm dit nie skoonmaak nie: gebruik die toegevoegde`) },
            { s: L(`Conjugate of ${p} + √${a} is ${p} − √${a}`, `Toegevoegde van ${p} + √${a} is ${p} − √${a}`), r: L("flip the middle sign only", "draai net die middelste teken om") },
            { s: L(`Put it top AND bottom: (${p} − √${a})/(${p} − √${a}) = 1`, `Sit dit bo EN onder: (${p} − √${a})/(${p} − √${a}) = 1`), r: L(`the bottom becomes ${p}² − ${a}, with no surd`, `die noemer word ${p}² − ${a}, sonder 'n wortelvorm`) },
          ],
        };
      },
      () => {
        const c = randInt(2, 7), p = randInt(1, 5), a = pick(NONSQ);
        return {
          q: L(`To rationalise <b>${c}/(√${a} − ${p})</b>, multiply top and bottom by:`, `Om <b>${c}/(√${a} − ${p})</b> te rasionaliseer, vermenigvuldig bo en onder met:`),
          correct: `(√${a} + ${p})/(√${a} + ${p})`,
          wrongs: [`(√${a} − ${p})/(√${a} − ${p})`, `√${a}/√${a}`, `(${p} − √${a})/(${p} − √${a})`],
          ans: L(`Use the conjugate of √${a} − ${p}, which is √${a} + ${p}.`, `Gebruik die toegevoegde van √${a} − ${p}, wat √${a} + ${p} is.`),
          sol: [
            { s: L(`Two terms on the bottom, so the conjugate is the tool`, `Twee terme onder, dus gebruik jy die toegevoegde`) },
            { s: L(`Conjugate of √${a} − ${p} is √${a} + ${p}`, `Toegevoegde van √${a} − ${p} is √${a} + ${p}`), r: L("same terms, middle sign flipped", "dieselfde terme, middelste teken omgedraai") },
            { s: L(`Multiply top AND bottom by it, so you are multiplying by 1`, `Vermenigvuldig bo EN onder daarmee, so vermenigvuldig jy met 1`), r: L(`the bottom becomes ${a} − ${p * p}, with no surd`, `die noemer word ${a} − ${p * p}, sonder 'n wortelvorm`) },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(RAT, it.q, it.correct, it.wrongs, { hint: L("Two terms on the bottom → use the conjugate (flip the middle sign) over itself.", "Twee terme onder → gebruik die toegevoegde (draai die middelste teken om) oor homself."), answerLabel: it.ans, solution: it.sol });
  },

  /* multiplying by denom/denom = ×1 */
  equalsOne: () => ynQ(RAT,
    L("Multiplying the numerator and denominator by the <b>same</b> surd changes the <b>value</b> of the fraction. True or false?", "As jy die teller en noemer met <b>dieselfde</b> wortelvorm vermenigvuldig, verander die <b>waarde</b> van die breuk. Waar of onwaar?"),
    false,
    { hint: L("Anything over itself is 1.", "Enigiets oor homself is 1."), answerLabel: L("False — it’s the same as multiplying by 1, so the value is unchanged; only the form changes.", "Onwaar: dit is dieselfde as vermenigvuldig met 1, so die waarde bly dieselfde; net die vorm verander."),
      solution: [
        { s: L("Anything over itself equals 1 — √7/√7 = 1, just like 5/5 = 1", "Enigiets oor homself is gelyk aan 1: √7/√7 = 1, net soos 5/5 = 1") },
        { s: L("Multiplying by 1 cannot change what a number is worth", "Vermenigvuldig met 1 kan nie verander wat 'n getal werd is nie") },
        { s: L("∴ false — only the FORM changes, which is exactly why rationalising is allowed", "∴ onwaar: net die VORM verander, en dis presies hoekom rasionalisering toegelaat word") },
      ] }),

  /* a + b√c form.  m = the rational part, n = the surd's coefficient.
     Guards: m ≠ 0 (else the flipped-a decoy collides) and |n| ≠ r (else
     the "b is the radicand" decoy collides). When the rational part is
     negative and the surd positive the expression is written surd-first
     (√5 − 1), exactly like the second fixed item. */
  abForm: () => {
    let m, n, r;
    do { m = randInt(-5, 5); n = pick([-2, -1, 1, 2]); r = pick(NONSQ); } while (m === 0 || Math.abs(n) === r);
    const coef = Math.abs(n) === 1 ? "" : String(Math.abs(n));
    const expr = (m < 0 && n > 0)
      ? `${coef}√${r} − ${Math.abs(m)}`
      : `${sgn(m)} ${n < 0 ? "−" : "+"} ${coef}√${r}`;
    const lab = (A, B) => L(`a = ${sgn(A)}, b = ${sgn(B)}`, `a = ${sgn(A)}, b = ${sgn(B)}`);
    const bTerm = n < 0 ? `(${sgn(n)})` : `${n}`;
    return mc(RAT, L(`A rationalised answer is <b>${expr}</b>. Written as a + b√c, what are a and b?`, `'n Gerasionaliseerde antwoord is <b>${expr}</b>. Geskryf as a + b√c, wat is a en b?`),
      lab(m, n), [lab(m, -n), lab(-m, -n), lab(m, Math.sign(n) * r)],
      { hint: L("a is the plain (rational) part; b is the number in front of the surd — keep its sign.", "a is die gewone (rasionale) deel; b is die getal voor die wortelvorm: hou sy teken."),
        answerLabel: L(`${expr} = ${sgn(m)} + ${bTerm}·√${r}, so a = ${sgn(m)} and b = ${sgn(n)}.`, `${expr} = ${sgn(m)} + ${bTerm}·√${r}, dus a = ${sgn(m)} en b = ${sgn(n)}.`),
        solution: [
          { s: L(`Line the answer up with the pattern a + b√c: ${expr} = ${sgn(m)} + ${bTerm}·√${r}`, `Pas die antwoord by die patroon a + b√c: ${expr} = ${sgn(m)} + ${bTerm}·√${r}`) },
          { s: L(`a is the plain part with no root on it, so a = ${sgn(m)}`, `a is die gewone deel sonder 'n wortel, dus a = ${sgn(m)}`) },
          { s: L(`b is the number sitting in front of the root, sign and all, so b = ${sgn(n)}`, `b is die getal wat voor die wortel sit, teken en al, dus b = ${sgn(n)}`), r: L(`c is ${r}, the number INSIDE the root`, `c is ${r}, die getal BINNE-IN die wortel`) },
        ] });
  },
};

export const questEs6 = {
  id: "es6",
  skills: [
    { id: "findConjugate", concept: CONJ, gen: SKILLS.findConjugate },
    { id: "whyConjugate", concept: CONJ, gen: SKILLS.whyConjugate },
    { id: "conjugateProduct", concept: CONJ, gen: SKILLS.conjugateProduct },
    { id: "rationaliseSingle", concept: RAT, gen: SKILLS.rationaliseSingle },
    { id: "rationaliseTwo", concept: RAT, gen: SKILLS.rationaliseTwo },
    { id: "equalsOne", concept: RAT, gen: SKILLS.equalsOne },
    { id: "abForm", concept: RAT, gen: SKILLS.abForm },
  ],
};
