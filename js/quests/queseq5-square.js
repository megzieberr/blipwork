/* ============================================================
   EQUATIONS & INEQUALITIES · Q5 — Perfect squares & the turning point
   ------------------------------------------------------------
   c = (b/2)² (only when a = 1!), the sign inside the bracket,
   x² − 13x + c = (x + k)² sign traps, reading TP(p ; q) — p flips,
   q does NOT — and the steps for solving by completing the square.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, frac } from "./_eq.js";
import { L } from "../lang.js";

const PSQ = "eqPerfectSquare";
const TPF = "eqTPForm";

const SKILLS = {
  /* complete the constant: x² + bx + □ — fresh even b */
  completeC: () => {
    const half = randInt(2, 6), bb = 2 * half, sign = pick(["+", "−"]);
    const prompt = L(`Which constant completes the square?<br><b>x² ${sign} ${C(bb)}x + □</b>`, `Watter konstante voltooi die vierkant?<br><b>x² ${sign} ${C(bb)}x + □</b>`);
    const correct = `${C(half * half)}`;
    /* decoys: squared without halving; halved without squaring; squared THEN
       halved (b²/2) — always distinct from (b/2)², unlike 2b which collides at b = 8 */
    const wrongs = [`${C(bb * bb)}`, `${C(half)}`, `${C(bb * bb / 2)}`];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: L("Half the middle coefficient, then square it: (b/2)².", "Halveer die middelste koëffisiënt en kwadreer dit dan: (b/2)²."),
        answerLabel: L(`(${C(bb)} ÷ 2)² = ${C(half)}² = ${C(half * half)}. Then x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})².`, `(${C(bb)} ÷ 2)² = ${C(half)}² = ${C(half * half)}. Dan is x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})².`),
        solution: [
          { s: L(`Check a first: the coefficient of x² is 1, so the half-and-square rule is allowed`, `Kyk eers na a: die koëffisiënt van x² is 1, dus mag die halveer-en-kwadreer-reël gebruik word`) },
          { s: L(`b/2 = ${C(bb)} ÷ 2 = ${C(half)}`, `b/2 = ${C(bb)} ÷ 2 = ${C(half)}`), r: L("she writes this in a small boxed working at the top right", "sy skryf dit in 'n klein blokkie regs bo") },
          { s: L(`Square it: ${C(half)}² = ${C(half * half)}`, `Kwadreer dit: ${C(half)}² = ${C(half * half)}`) },
          { s: L(`x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})²`, `x² ${sign} ${C(bb)}x + ${C(half * half)} = (x ${sign} ${C(half)})²`), r: L("x and b/2 fall into the new bracket; the sign of b comes with them", "x en b/2 val in die nuwe hakie; die teken van b kom saam") },
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
        L("The rule c = (b/2)² works for ANY quadratic ax² + bx + c, whatever a is. True?", "Die reël c = (b/2)² werk vir ENIGE kwadratiese uitdrukking ax² + bx + c, wat a ook al is. Waar?"),
        false,
        { hint: L("Try it on 2x² + 8x + … — does 16 complete that square?", "Probeer dit op 2x² + 8x + …: voltooi 16 daardie vierkant?"),
          answerLabel: L("False — c = (b/2)² only works when the coefficient of x² is 1. With a coefficient, factor it out FIRST (or use b² = 4ac).", "Onwaar: c = (b/2)² werk net as die koëffisiënt van x² 1 is. Met 'n koëffisiënt, haal dit EERS as faktor uit (of gebruik b² = 4ac)."),
          solution: [
            { s: L("Test it on 2x² + 8x + 16: half-and-square says the constant should be (8/2)² = 16", "Toets dit op 2x² + 8x + 16: halveer-en-kwadreer sê die konstante moet (8/2)² = 16 wees") },
            { s: L("But 2(x + 2)² = 2x² + 8x + 8, so the constant that actually works is 8, not 16", "Maar 2(x + 2)² = 2x² + 8x + 8, dus is die konstante wat werklik werk 8, nie 16 nie"), r: L("the rule has failed", "die reël het misluk") },
            { s: L("∴ false — half-and-square is an a = 1 rule; with a coefficient on x², factor it out first", "∴ onwaar: halveer-en-kwadreer is 'n a = 1-reël; met 'n koëffisiënt by x², haal dit eers as faktor uit") },
          ] });
    }
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    const a = pick([2, 3, 4, 5]);
    let bb = pick([5, 7, 9, 11, 13]);
    while (gcd(a, bb) !== 1) bb = pick([5, 7, 9, 11, 13]);   // b/a must be a real fraction
    const t = randInt(3, 9), cc = a * t;                     // c ÷ a stays a whole number
    return mc(PSQ,
      L(`You want to complete the square on <b>${C(a)}x² − ${C(bb)}x + ${C(cc)}</b>. What must happen FIRST?`, `Jy voltooi die vierkant op <b>${C(a)}x² − ${C(bb)}x + ${C(cc)}</b>. Wat moet EERS gebeur?`),
      L(`Factor the ${C(a)} out of the terms`, `Haal die ${C(a)} as faktor uit die terme`),
      [L(`Add (${C(bb)}/2)² straight away`, `Tel dadelik (${C(bb)}/2)² by`), L(`Divide only the ${C(cc)} by ${C(a)}`, `Deel net die ${C(cc)} deur ${C(a)}`), L(`Swap the ${C(bb)}x and the ${C(cc)}`, `Ruil die ${C(bb)}x en die ${C(cc)} om`)],
      { hint: L("c = (b/2)² is an a = 1 rule.", "c = (b/2)² is 'n a = 1-reël."),
        answerLabel: L(`With a coefficient on x², factor it out first: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)}) — THEN half-and-square the new middle coefficient inside.`, `Met 'n koëffisiënt by x², haal dit eers as faktor uit: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)}), halveer en kwadreer DAN die nuwe middelste koëffisiënt binne.`),
        solution: [
          { s: L(`The coefficient of x² is ${C(a)}, not 1, so half-and-square cannot be used as it stands`, `Die koëffisiënt van x² is ${C(a)}, nie 1 nie, dus kan halveer-en-kwadreer nie so gebruik word nie`) },
          { s: L(`Factor the ${C(a)} out of the WHOLE expression, constant included: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)})`, `Haal die ${C(a)} as faktor uit die HELE uitdrukking, konstante ingesluit: ${C(a)}(x² − ${C(bb)}/${C(a)}·x + ${C(t)})`),
            r: L("accept the fraction it creates — that is normal here", "aanvaar die breuk wat dit skep: dis hier normaal") },
          { s: L(`Now the inside has a coefficient of 1, so half-and-square the new middle number`, `Nou het die binnekant 'n koëffisiënt van 1, dus halveer en kwadreer die nuwe middelste getal`) },
          { s: L(`Switch to square brackets once the inner bracket is formed, and multiply the ${C(a)} back in at the very end`, `Skakel oor na vierkanthakies sodra die binneste hakie gevorm is, en vermenigvuldig die ${C(a)} heel aan die einde terug in`) },
        ] });
  },

  /* the sign inside the bracket matches the middle term — fresh */
  signInside: () => {
    const half = randInt(2, 6), bb = 2 * half, sign = pick(["+", "−"]);
    const prompt = L(`<b>x² ${sign} ${C(bb)}x + ${C(half * half)} = (x □ ${C(half)})²</b>. Which sign goes in the bracket?`, `<b>x² ${sign} ${C(bb)}x + ${C(half * half)} = (x □ ${C(half)})²</b>. Watter teken kom in die hakie?`);
    const correct = sign === "+" ? L(`+, because the middle term is +${C(bb)}x`, `+, want die middelste term is +${C(bb)}x`) : L(`−, because the middle term is −${C(bb)}x`, `−, want die middelste term is −${C(bb)}x`);
    const wrongs = [
      sign === "+" ? L(`−, because squares make things negative`, `−, want kwadrate maak dinge negatief`) : L(`+, because squares are always positive`, `+, want kwadrate is altyd positief`),
      L("Either sign works", "Enige teken werk"),
      L(`±, both brackets at once`, `±, albei hakies tegelyk`),
    ];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: L("The sign inside the bracket MATCHES the sign of the middle term.", "Die teken binne die hakie is DIESELFDE as die teken van die middelste term."),
        answerLabel: L(`(x ${sign} ${C(half)})² expands to x² ${sign} ${C(bb)}x + ${C(half * half)} — the bracket's sign is the middle term's sign.`, `(x ${sign} ${C(half)})² brei uit tot x² ${sign} ${C(bb)}x + ${C(half * half)}: die hakie se teken is die middelste term se teken.`),
        solution: [
          { s: L(`Work backwards: expand (x ${sign} ${C(half)})² = x² ${sign} ${C(bb)}x + ${C(half * half)}`, `Werk terugwaarts: brei uit, (x ${sign} ${C(half)})² = x² ${sign} ${C(bb)}x + ${C(half * half)}`) },
          { s: L(`The middle term came out as ${sign}${C(bb)}x, matching the question`, `Die middelste term is ${sign}${C(bb)}x, net soos in die vraag`) },
          { s: L(`So the bracket takes ${sign}`, `Dus kry die hakie ${sign}`), r: L("the sign of b falls into the bracket — the squared constant is positive either way", "die teken van b val in die hakie: die gekwadreerde konstante is in elk geval positief") },
        ] });
  },

  /* x² − 13x + c = (x + k)² — the k sign trap (workbook got it wrong!) */
  findK: () => {
    const odd = pick([5, 7, 9, 11, 13]);
    const prompt = L(`If <b>x² − ${C(odd)}x + c = (x + k)²</b>, what is k?`, `As <b>x² − ${C(odd)}x + c = (x + k)²</b>, wat is k?`);
    const correct = L(`k = −${frac(odd, 2)}`, `k = −${frac(odd, 2)}`);
    const wrongs = [L(`k = ${frac(odd, 2)}`, `k = ${frac(odd, 2)}`), L(`k = −${C(odd)}`, `k = −${C(odd)}`), L(`k = ${frac(String(odd * odd), 4)}`, `k = ${frac(String(odd * odd), 4)}`)];
    return mc(PSQ, prompt, correct, wrongs,
      { hint: L("Expand (x + k)² = x² + 2kx + k² and MATCH the middle terms — sign included.", "Brei (x + k)² = x² + 2kx + k² uit en VERGELYK die middelste terme, teken ingesluit."),
        answerLabel: L(`2k = −${C(odd)}, so k = −${frac(odd, 2)} (negative, because the middle term is −${C(odd)}x). And c = k² = ${frac(String(odd * odd), 4)}.`, `2k = −${C(odd)}, dus k = −${frac(odd, 2)} (negatief, want die middelste term is −${C(odd)}x). En c = k² = ${frac(String(odd * odd), 4)}.`),
        solution: [
          { s: L(`Expand the right side: (x + k)² = x² + 2kx + k²`, `Brei die regterkant uit: (x + k)² = x² + 2kx + k²`) },
          { s: L(`Match the middle terms, sign and all: 2k = −${C(odd)}`, `Vergelyk die middelste terme, teken en al: 2k = −${C(odd)}`) },
          { s: L(`k = −${frac(odd, 2)}`, `k = −${frac(odd, 2)}`), r: L(`the bracket is written (x + k), so a middle term of −${C(odd)}x forces k to be NEGATIVE`, `die hakie is (x + k), dus moet k NEGATIEF wees as die middelste term −${C(odd)}x is`) },
          { s: L(`And then c = k² = ${frac(String(odd * odd), 4)}`, `En dan is c = k² = ${frac(String(odd * odd), 4)}`), r: L("squaring makes c positive", "kwadreer maak c positief") },
        ] });
  },

  /* read the TP off turning-point form — fresh, with the workbook's q-trap */
  readTP: () => {
    const a = pick([1, 2, 3, -1, -2]);
    const p = randInt(1, 5) * pick([1, -1]);
    const q = randInt(1, 6) * pick([1, -1]);
    const inner = p >= 0 ? L(`x − ${C(p)}`, `x − ${C(p)}`) : L(`x + ${C(-p)}`, `x + ${C(-p)}`);   // y = a(x − p)² + q
    const aStr = a === 1 ? "" : a === -1 ? "−" : C(a);
    const prompt = L(`Read the turning point of <b>y = ${aStr}(${inner})² ${q >= 0 ? "+" : "−"} ${C(Math.abs(q))}</b>.`, `Lees die draaipunt van <b>y = ${aStr}(${inner})² ${q >= 0 ? "+" : "−"} ${C(Math.abs(q))}</b> af.`);
    const correct = L(`TP(${C(p)} ; ${C(q)})`, `DP(${C(p)} ; ${C(q)})`);
    const wrongs = [
      L(`TP(${C(p)} ; ${C(-q)})`, `DP(${C(p)} ; ${C(-q)})`),      // flipped q — the workbook's own error
      L(`TP(${C(-p)} ; ${C(q)})`, `DP(${C(-p)} ; ${C(q)})`),      // forgot to flip p
      L(`TP(${C(-p)} ; ${C(-q)})`, `DP(${C(-p)} ; ${C(-q)})`),     // flipped both
    ];
    return mc(TPF, prompt, correct, wrongs,
      { hint: L("p is read with the OPPOSITE sign of what's in the bracket; q keeps its own sign.", "p kry die TEENOORGESTELDE teken van wat in die hakie staan; q hou sy eie teken."),
        answerLabel: L(`The bracket (${inner}) gives p = ${C(p)} (opposite sign); the constant outside gives q = ${C(q)} (its OWN sign — never flip q). TP(${C(p)} ; ${C(q)}).`, `Die hakie (${inner}) gee p = ${C(p)} (teenoorgestelde teken); die konstante buite gee q = ${C(q)} (sy EIE teken: draai q nooit om nie). DP(${C(p)} ; ${C(q)}).`),
        solution: [
          { s: L(`Line it up with y = a(x − p)² + q`, `Vergelyk dit met y = a(x − p)² + q`) },
          { s: L(`The bracket reads (${inner}), so p = ${C(p)}`, `Die hakie is (${inner}), dus p = ${C(p)}`), r: L("OPPOSITE sign to what you see inside the bracket", "TEENOORGESTELDE teken van wat jy in die hakie sien") },
          { s: L(`The constant outside the bracket is q = ${C(q)}`, `Die konstante buite die hakie is q = ${C(q)}`), r: L("q keeps its own sign — never flip it", "q hou sy eie teken: draai dit nooit om nie") },
          { s: L(`∴ TP(${C(p)} ; ${C(q)})`, `∴ DP(${C(p)} ; ${C(q)})`), r: L("coordinates take a semicolon, not a comma", "koördinate kry 'n kommapunt, nie 'n komma nie") },
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
      const it = { q: L("In turning-point form <b>y = a(x − p)² + q</b>, which value is read with the OPPOSITE sign?", "In draaipunt-vorm <b>y = a(x − p)² + q</b>, watter waarde lees jy met die TEENOORGESTELDE teken?"), correct: L("Only p (the x-value of the TP)", "Net p (die x-waarde van die DP)"), wrongs: [L("Only q (the y-value of the TP)", "Net q (die y-waarde van die DP)"), L("Both p and q", "Beide p en q"), L("Neither — read both as written", "Geeneen: lees albei soos dit staan")], ans: L("p flips: (x + 4) means p = −4. q keeps its own sign: … − 1 means q = −1. In words: p is WHERE the TP is, q is WHAT it is.", "p draai om: (x + 4) beteken p = −4. q hou sy eie teken: … − 1 beteken q = −1. In woorde: p is WAAR die DP is, q is WAT dit is.") };
      return mc(TPF, it.q, it.correct, it.wrongs,
        { hint: L("Flip p. Never flip q.", "Draai p om. Draai q nooit om nie."), answerLabel: it.ans,
          solution: [
            { s: L("The form is y = a(x − p)² + q, and p is written with a MINUS built into it", "Die vorm is y = a(x − p)² + q, en p het 'n ingeboude MINUS") },
            { s: L("So (x + 4) is really (x − (−4)), which is why p reads as −4 — the flip comes from that hidden minus", "Dus is (x + 4) eintlik (x − (−4)), en daarom lees p as −4: die omdraai kom van daardie versteekte minus") },
            { s: L("q has no hidden minus: it is written + q, so … − 1 simply means q = −1", "q het geen versteekte minus nie: dit staan as + q, dus beteken … − 1 eenvoudig q = −1"), r: L("∴ only p flips", "∴ net p draai om") },
          ] });
    }
    const a = pick([2, 3, 4]), h = randInt(2, 6), k = randInt(1, 6);
    return ynQ(TPF,
      L(`For y = ${C(a)}(x + ${C(h)})² − ${C(k)} the turning point is (${C(-h)} ; ${C(k)}). True?`, `Vir y = ${C(a)}(x + ${C(h)})² − ${C(k)} is die draaipunt (${C(-h)} ; ${C(k)}). Waar?`),
      false,
      { hint: L("Which of p and q flips its sign?", "Watter een van p en q draai sy teken om?"),
        answerLabel: L(`False — the y-value never flips. The constant outside is ${C(-k)}, so the TP is (${C(-h)} ; ${C(-k)}). Only p gets the opposite sign.`, `Onwaar: die y-waarde draai nooit om nie. Die konstante buite is ${C(-k)}, dus is die DP (${C(-h)} ; ${C(-k)}). Net p kry die teenoorgestelde teken.`),
        solution: [
          { s: L(`The bracket is (x + ${C(h)}), so p = ${C(-h)}`, `Die hakie is (x + ${C(h)}), dus p = ${C(-h)}`), r: L("that part of the claim is right", "daardie deel van die bewering is reg") },
          { s: L(`The constant outside is − ${C(k)}, so q = ${C(-k)} — it keeps its own sign`, `Die konstante buite is − ${C(k)}, dus q = ${C(-k)}: dit hou sy eie teken`) },
          { s: L(`∴ the TP is (${C(-h)} ; ${C(-k)}), not (${C(-h)} ; ${C(k)})`, `∴ die DP is (${C(-h)} ; ${C(-k)}), nie (${C(-h)} ; ${C(k)}) nie`), r: L("the y-value never flips", "die y-waarde draai nooit om nie") },
        ] });
  },

  /* happy / sad → min / max */
  happySad: () => {
    const a = randInt(1, 4) * pick([1, -1]);
    const up = a > 0;
    const aStr = a === 1 ? "" : a === -1 ? "−" : C(a);
    const prompt = L(`In <b>y = ${aStr}(x − 1)² + 3</b>, is the turning point a minimum or a maximum?`, `Is die draaipunt van <b>y = ${aStr}(x − 1)² + 3</b> 'n minimum of 'n maksimum?`);
    const correct = up ? L("A minimum — a > 0 makes a happy parabola (opens up)", "'n Minimum: a > 0 maak 'n happy parabool (oop na bo)") : L("A maximum — a < 0 makes a sad parabola (opens down)", "'n Maksimum: a < 0 maak 'n sad parabool (oop na onder)");
    const wrongs = [
      up ? L("A maximum — a > 0 makes a sad parabola", "'n Maksimum: a > 0 maak 'n sad parabool") : L("A minimum — a < 0 makes a happy parabola", "'n Minimum: a < 0 maak 'n happy parabool"),
      L("Neither — turning points are only for graphs of lines", "Geeneen: draaipunte is net vir grafieke van lyne"),
      L("You cannot tell without the roots", "Jy kan nie sê sonder die wortels nie"),
    ];
    return mc(TPF, prompt, correct, wrongs,
      { hint: L("a > 0 → happy bowl → the TP is the LOWEST point. a < 0 → sad → highest.", "a > 0 → happy bak → die DP is die LAAGSTE punt. a < 0 → sad → hoogste."),
        answerLabel: L(`a = ${C(a)} is ${up ? "positive → happy parabola, so the TP is a MINIMUM" : "negative → sad parabola, so the TP is a MAXIMUM"}.`, `a = ${C(a)} is ${up ? "positief → happy parabool, dus is die DP 'n MINIMUM" : "negatief → sad parabool, dus is die DP 'n MAKSIMUM"}.`),
        solution: [
          { s: L(`Only a decides the shape. Here a = ${C(a)}`, `Net a bepaal die vorm. Hier is a = ${C(a)}`) },
          { s: L(`a is ${up ? "positive, so the arms point up — a happy parabola" : "negative, so the arms point down — a sad parabola"}`, `a is ${up ? "positief, dus wys die arms op: 'n happy parabool" : "negatief, dus wys die arms af: 'n sad parabool"}`) },
          { s: `${up ? L("A happy parabola sits in its lowest point at the turning point, so it is a MINIMUM", "'n Happy parabool is by die draaipunt op sy laagste punt, dus is dit 'n MINIMUM") : L("A sad parabola reaches its highest point at the turning point, so it is a MAXIMUM", "'n Sad parabool bereik sy hoogste punt by die draaipunt, dus is dit 'n MAKSIMUM")}`,
            r: L("the bracket and the constant move the TP around, but they cannot change the shape", "die hakie en die konstante skuif die DP rond, maar hulle kan nie die vorm verander nie") },
        ] });
  },

  /* the steps for SOLVING by completing the square */
  solveSteps: () => {
    const items = [
      { q: L("Solving <b>−x² + 10x − 22 = 0</b> by completing the square. FIRST step?", "Los <b>−x² + 10x − 22 = 0</b> op deur die vierkant te voltooi. EERSTE stap?"), correct: L("Divide every term by −1 (no negative may sit in front of x²)", "Deel elke term deur −1 (geen negatief mag voor x² staan nie)"), wrongs: [L("Add (10/2)² to both sides immediately", "Tel dadelik (10/2)² by albei kante"), L("Take the 22 across first, keep the −x²", "Bring eers die 22 oor, hou die −x²"), L("Square-root both sides", "Neem die wortel van albei kante")], ans: L("Kill the negative first: x² − 10x + 22 = 0. Only then take the constant across and add (b/2)² to both sides.", "Kry eers die negatief weg: x² − 10x + 22 = 0. Bring dan eers die konstante oor en tel (b/2)² by albei kante.") },
      { q: L("You've reached <b>x² − 10x = −22</b>. What is the next step?", "Jy is by <b>x² − 10x = −22</b>. Wat is die volgende stap?"), correct: L("Add (10/2)² = 25 to BOTH sides", "Tel (10/2)² = 25 by ALBEI kante"), wrongs: [L("Add 25 to the left side only", "Tel 25 net by die linkerkant"), L("Square-root both sides now", "Neem nou die wortel van albei kante"), L("Factor out x", "Haal x as faktor uit")], ans: L("Add (b/2)² to BOTH sides: x² − 10x + 25 = 3, which packs into (x − 5)² = 3.", "Tel (b/2)² by ALBEI kante: x² − 10x + 25 = 3, en dit word (x − 5)² = 3.") },
      { q: L("You've reached <b>(x − 5)² = 3</b>. What is the next step?", "Jy is by <b>(x − 5)² = 3</b>. Wat is die volgende stap?"), correct: L("Square-root both sides and keep the ±: x − 5 = ±√3", "Neem die wortel van albei kante en hou die ±: x − 5 = ±√3"), wrongs: [L("Square both sides", "Kwadreer albei kante"), L("x − 5 = √3 only", "Net x − 5 = √3"), L("Expand the bracket again", "Brei die hakie weer uit")], ans: L("√ both sides (remember ±): x − 5 = ±√3, so x = 5 ± √3.", "√ albei kante (onthou ±): x − 5 = ±√3, dus x = 5 ± √3.") },
      { q: L("You rewrote <b>x² − 8x</b> as <b>(x − 4)² − 16</b>. How do you CHECK the rewrite?", "Jy het <b>x² − 8x</b> herskryf as <b>(x − 4)² − 16</b>. Hoe TOETS jy dit?"), correct: L("Multiply the bracket back out — it must return exactly x² − 8x", "Vermenigvuldig die hakie weer uit: dit moet presies x² − 8x gee"), wrongs: [L("Substitute x = 4 and see if you get 0", "Vervang x = 4 en kyk of jy 0 kry"), L("No check is possible", "Jy kan dit nie toets nie"), L("Square-root both sides", "Neem die wortel van albei kante")], ans: L("(x − 4)² − 16 = x² − 8x + 16 − 16 = x² − 8x ✓. Completing the square only REWRITES the expression — expanding back must give the original, or something was changed.", "(x − 4)² − 16 = x² − 8x + 16 − 16 = x² − 8x ✓. Voltooiing van die vierkant HERSKRYF net die uitdrukking: as jy terug uitbrei, moet jy die oorspronklike kry, anders is iets verander.") },
    ];
    const it = pick(items);
    return mc(PSQ, it.q, it.correct, it.wrongs,
      { hint: L("No negative on x² → constant across → +(b/2)² both sides → perfect square → √ with ±.", "Geen negatief by x² → konstante oor → +(b/2)² albei kante → volkome vierkant → √ met ±."), answerLabel: it.ans });
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
