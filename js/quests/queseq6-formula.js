/* ============================================================
   EQUATIONS & INEQUALITIES · Q6 — Quadratic formula & simultaneous
   ------------------------------------------------------------
   When to use the formula, the formula itself (sign traps),
   what MUST be shown, entering a, b and c WITH their signs,
   the sum & product of roots (build the factors!), and the
   substitution method for simultaneous equations.
   ============================================================ */
import { mc, ynQ, pick, randInt, C } from "./_eq.js";
/* forced-decimal-places formatter (comma decimal + a real minus) — the
   rounding skill needs "2,41" and "2,4" side by side, which C()'s
   trailing-zero-trimming form cannot give. */
import { fmtComma } from "../check.js";
import { L } from "../lang.js";

const FOR = "eqFormula";
const SIM = "eqSimultaneous";

const SKILLS = {
  /* when the formula is the tool */
  whenFormula: () => {
    const items = [
      { q: L("When do you reach for the <b>quadratic formula</b>?", "Wanneer gryp jy na die <b>kwadratiese formule</b>?"), correct: L("When the trinomial cannot be factorised", "As die drieterm nie gefaktoriseer kan word nie"), wrongs: [L("For every quadratic — factorising is never allowed", "Vir elke kwadratiese vergelyking: faktoriseer is nooit toegelaat nie"), L("Only when the equation has fractions", "Net as die vergelyking breuke het"), L("Only when a = 1", "Net as a = 1")], ans: L("Try to factorise first. If it won't factorise (or the question says 'correct to two decimals'), use the formula. Completing the square only if the question asks for it.", "Probeer eers faktoriseer. As dit nie wil faktoriseer nie (of die vraag sê 'korrek tot twee desimale'), gebruik die formule. Voltooi die vierkant net as die vraag daarvoor vra."),
        sol: [{ s: L("Standard form first, then try to factorise — that is always the quickest road when it works", "Eers standaardvorm, probeer dan faktoriseer: as dit werk, is dit altyd die vinnigste pad") },
              { s: L("If no pair of numbers fits, the roots are not rational and factorising cannot reach them", "As geen paar getalle pas nie, is die wortels nie rasionaal nie en kan faktorisering hulle nie bereik nie") },
              { s: L("That is what the formula is for", "Daarvoor is die formule"), r: L("complete the square only when the question actually asks for it", "voltooi die vierkant net as die vraag werklik daarvoor vra") }] },
      { q: L("The question says 'give your answers correct to TWO DECIMALS'. What is that hinting?", "Die vraag sê 'gee jou antwoorde korrek tot TWEE DESIMALE'. Waarna wys dit?"), correct: L("The trinomial probably won't factorise — use the quadratic formula", "Die drieterm sal waarskynlik nie faktoriseer nie: gebruik die kwadratiese formule"), wrongs: [L("The answers must be whole numbers", "Die antwoorde moet heelgetalle wees"), L("You must complete the square", "Jy moet die vierkant voltooi"), L("You must round every step", "Jy moet elke stap afrond")], ans: L("Decimal answers signal irrational roots — the formula (or EQN mode) is the tool. Round only the FINAL answers, with a decimal comma.", "Desimale antwoorde wys op irrasionale wortels: die formule (of EQN-modus) is die gereedskap. Rond net die FINALE antwoorde af, met 'n desimale komma."),
        sol: [{ s: L("A factorising answer comes out exact, so it would never need rounding", "'n Antwoord uit faktorisering is eksak, dus sou dit nooit afronding nodig hê nie") },
              { s: L("Asking for decimals is a hint that the roots are irrational — something like 1 ± √2", "'n Vraag na desimale is 'n wenk dat die wortels irrasionaal is, iets soos 1 ± √2") },
              { s: L("So go straight for the formula, and round only the final line, to two decimals with a decimal comma", "Gaan dus reguit na die formule, en rond net die finale reël af, tot twee desimale met 'n desimale komma") }] },
    ];
    const it = pick(items);
    return mc(FOR, it.q, it.correct, it.wrongs,
      { hint: L("Factorise if you can; formula when you can't (or when decimals are asked).", "Faktoriseer as jy kan; formule as jy nie kan nie (of as desimale gevra word)."), answerLabel: it.ans, solution: it.sol });
  },

  /* the formula, with sign-trap decoys */
  theFormula: () => {
    const correct = L("x = ( −b ± √(b² − 4ac) ) / 2a", "x = ( −b ± √(b² − 4ac) ) / 2a");
    const wrongs = [
      L("x = ( b ± √(b² − 4ac) ) / 2a", "x = ( b ± √(b² − 4ac) ) / 2a"),
      L("x = ( −b ± √(b² + 4ac) ) / 2a", "x = ( −b ± √(b² + 4ac) ) / 2a"),
      L("x = −b ± √(b² − 4ac) / 2", "x = −b ± √(b² − 4ac) / 2"),
    ];
    return mc(FOR, L("Pick the CORRECT quadratic formula.", "Kies die KORREKTE kwadratiese formule."), correct, wrongs,
      { hint: L("Minus b, plus-minus, root of b² MINUS 4ac, ALL over 2a.", "Minus b, plus-minus, wortel van b² MINUS 4ac, ALLES oor 2a."),
        answerLabel: L("x = (−b ± √(b² − 4ac)) / 2a — the whole top is divided by 2a, and it's minus 4ac under the root.", "x = (−b ± √(b² − 4ac)) / 2a: die hele teller word deur 2a gedeel, en dis minus 4ac onder die wortel."),
        solution: [
          { s: L("Check it piece by piece. It opens with −b, not b", "Toets dit stuk vir stuk. Dit begin met −b, nie b nie"), r: L("so a positive b gives a negative start", "dus gee 'n positiewe b 'n negatiewe begin") },
          { s: L("Under the root sits b² − 4ac, with a MINUS", "Onder die wortel staan b² − 4ac, met 'n MINUS"), r: L("that expression is Δ, and a plus there would never give non-real roots", "daardie uitdrukking is Δ, en 'n plus daar sou nooit nie-reële wortels gee nie") },
          { s: L("And the WHOLE top is divided by 2a, so the top needs its own bracket when you type it", "En die HELE teller word deur 2a gedeel, dus het die teller sy eie hakie nodig as jy dit intik") },
        ] });
  },

  /* what must be written down */
  showSteps: () => {
    const items = [
      { q: L("Using the quadratic formula, which TWO lines must always be shown?", "Watter TWEE reëls moet jy altyd wys as jy die kwadratiese formule gebruik?"), correct: L("The formula itself, then the substitution of a, b and c", "Die formule self, dan die vervanging van a, b en c"), wrongs: [L("Only the final answers", "Net die finale antwoorde"), L("The factorising attempt and the answer", "Die faktoriseerpoging en die antwoord"), L("The formula only — substitution is optional", "Net die formule: vervanging is opsioneel")], ans: L("Always: write the formula, then show the substitution line with a, b and c in brackets — THEN the answers (calculator allowed for the values).", "Altyd: skryf die formule, wys dan die vervangingsreël met a, b en c tussen hakies, DAN die antwoorde (sakrekenaar mag vir die waardes)."),
        sol: [{ s: L("Marks are given for the written steps, not for the final number", "Punte word vir die geskrewe stappe gegee, nie vir die finale getal nie") },
              { s: L("So write the formula out first, exactly as it stands", "Skryf dus eers die formule uit, presies soos dit is") },
              { s: L("Then the substitution line, with every negative in its own brackets, before you work anything out", "Dan die vervangingsreël, met elke negatief in sy eie hakies, voordat jy enigiets uitwerk") }] },
      ynQ(FOR,
        L("You may use EQN mode on the calculator to get the values — as long as the formula and substitution are written down. True?", "Jy mag EQN-modus op die sakrekenaar gebruik om die waardes te kry, solank die formule en vervanging neergeskryf is. Waar?"),
        true,
        { hint: L("Marks are for the working; the calculator just checks the arithmetic.", "Punte is vir die bewerking; die sakrekenaar toets net die rekenwerk."),
          answerLabel: L("True — write formula + substitution for the marks, then let EQN mode confirm X₁ and X₂.", "Waar: skryf formule + vervanging vir die punte, en laat EQN-modus dan X₁ en X₂ bevestig."),
          solution: [
            { s: L("Her notes teach the EQN route themselves, so the calculator is allowed here", "Haar notas leer self die EQN-roete, dus mag die sakrekenaar hier") },
            { s: L("But the marks sit on the formula line and the substitution line, which the calculator does not write for you", "Maar die punte lê op die formule-reël en die vervangingsreël, en dié skryf die sakrekenaar nie vir jou nie") },
            { s: L("∴ true — write both lines, then let EQN check X₁ and X₂", "∴ waar: skryf albei reëls, en laat EQN dan X₁ en X₂ toets"), r: L("answers alone score almost nothing", "net antwoorde kry amper geen punte nie") },
          ] }),
    ];
    const it = pick(items);
    return it.type ? it : mc(FOR, it.q, it.correct, it.wrongs,
      { hint: L("Formula line + substitution line, every time.", "Formule-reël + vervangingsreël, elke keer."), answerLabel: it.ans, solution: it.sol });
  },

  /* a, b, c with their signs — fresh, with the workbook's c-trap */
  signsIn: () => {
    const bb = randInt(2, 6), cc = randInt(1, 8);   // bb ≥ 2: never show "1x"
    const prompt = L(`For <b>x² − ${C(bb)}x − ${C(cc)} = 0</b>, what are a, b and c?`, `Wat is a, b en c vir <b>x² − ${C(bb)}x − ${C(cc)} = 0</b>?`);
    const correct = L(`a = 1, b = −${C(bb)}, c = −${C(cc)}`, `a = 1, b = −${C(bb)}, c = −${C(cc)}`);
    const wrongs = [
      L(`a = 1, b = −${C(bb)}, c = ${C(cc)}`, `a = 1, b = −${C(bb)}, c = ${C(cc)}`),
      L(`a = 1, b = ${C(bb)}, c = −${C(cc)}`, `a = 1, b = ${C(bb)}, c = −${C(cc)}`),
      L(`a = 0, b = −${C(bb)}, c = −${C(cc)}`, `a = 0, b = −${C(bb)}, c = −${C(cc)}`),
    ];
    return mc(FOR, prompt, correct, wrongs,
      { hint: L("Every coefficient keeps the sign sitting in front of it.", "Elke koëffisiënt hou die teken wat voor hom staan."),
        answerLabel: L(`b and c BOTH carry their minus signs: b = −${C(bb)}, c = −${C(cc)}. (Typing c = ${C(cc)} into the calculator solves a different equation!)`, `b en c dra ALBEI hul minustekens: b = −${C(bb)}, c = −${C(cc)}. (Tik jy c = ${C(cc)} op die sakrekenaar in, los jy 'n ander vergelyking op!)`),
        solution: [
          { s: L(`Standard form is ax² + bx + c = 0, with PLUS signs written between the terms`, `Standaardvorm is ax² + bx + c = 0, met PLUS-tekens tussen die terme`) },
          { s: L(`So read x² − ${C(bb)}x − ${C(cc)} = 0 as x² + (−${C(bb)})x + (−${C(cc)}) = 0`, `Lees dus x² − ${C(bb)}x − ${C(cc)} = 0 as x² + (−${C(bb)})x + (−${C(cc)}) = 0`) },
          { s: L(`a = 1, b = −${C(bb)}, c = −${C(cc)}`, `a = 1, b = −${C(bb)}, c = −${C(cc)}`), r: L("each coefficient keeps the sign standing in front of it", "elke koëffisiënt hou die teken wat voor hom staan") },
        ] });
  },

  /* rounding convention
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (x = 1 ± √2) — parametrisable"). The surd answer now
     rolls: m ± √r with r a NON-square, so the roots stay irrational and
     rounding is genuinely needed. Both values are computed exactly and
     rounded ONCE at the end (DICE-PLAN's number-pad law / her Finance
     one-equation rule), and the three decoys are built from those same
     two values — decimal point, one decimal, and "leave the surd". */
  rounding: () => {
    const items = [
      null,   // the rolled surd item, built below
      ynQ(FOR,
        L("You should round every in-between step to two decimals as you go. True?", "Jy moet elke tussenstap tot twee desimale afrond terwyl jy werk. Waar?"),
        false,
        { hint: L("Early rounding snowballs.", "Vroeë afronding groei soos 'n sneeubal."),
          answerLabel: L("False — round only at the END. Rounding along the way builds up error; carry the exact values (or full calculator display) until the final line.", "Onwaar: rond net aan die EINDE af. Afronding langs die pad bou foute op; hou die eksakte waardes (of die volle sakrekenaarskerm) tot by die finale reël."),
          solution: [
            { s: L("Every rounding throws a little bit away, and the next step multiplies whatever is left", "Elke afronding gooi 'n bietjie weg, en die volgende stap vermenigvuldig wat oorbly") },
            { s: L("Two or three rounded steps and the last decimal is already wrong", "Twee of drie afgeronde stappe, en die laaste desimaal is reeds verkeerd") },
            { s: L("∴ false — carry the exact value or the full calculator display, and round ONCE at the end", "∴ onwaar: hou die eksakte waarde of die volle sakrekenaarskerm, en rond EEN keer aan die einde af") },
          ] }),
    ];
    const it = pick(items);
    if (it) return it;
    const m = randInt(1, 5), r = pick([2, 3, 5, 6, 7, 8, 10, 11, 12]);   // never a perfect square
    const hi = m + Math.sqrt(r), lo = m - Math.sqrt(r);                  // exact, rounded once below
    const d2 = (v) => fmtComma(v, 2), d1 = (v) => fmtComma(v, 1);
    const dot = (s) => s.replace(/,/g, ".");
    const surd = `${C(m)} ± √${C(r)}`;
    return mc(FOR,
      L(`The formula gives x = ${surd}. The question wants decimals. How do you write the answers?`, `Die formule gee x = ${surd}. Die vraag wil desimale hê. Hoe skryf jy die antwoorde?`),
      L(`x ≈ ${d2(hi)} or x ≈ ${d2(lo)} — two decimals, decimal comma`, `x ≈ ${d2(hi)} of x ≈ ${d2(lo)}: twee desimale, desimale komma`),
      [L(`x ≈ ${dot(d2(hi))} or x ≈ ${dot(d2(lo))} — decimal point`, `x ≈ ${dot(d2(hi))} of x ≈ ${dot(d2(lo))}: desimale punt`),
        L(`x ≈ ${d1(hi)} or x ≈ ${d1(lo)} — one decimal`, `x ≈ ${d1(hi)} of x ≈ ${d1(lo)}: een desimaal`),
        L(`Leave them as ${surd} always`, `Los hulle altyd as ${surd}`)],
      { hint: L("Two decimals, decimal comma, final answers only.", "Twee desimale, desimale komma, net finale antwoorde."),
        answerLabel: L(`Round FINAL answers to two decimals with the decimal comma (SA style): ${d2(hi)} and ${d2(lo)}. Keep the surd form only if the question asks for it.`, `Rond FINALE antwoorde af tot twee desimale met die desimale komma (SA-styl): ${d2(hi)} en ${d2(lo)}. Hou die wortelvorm net as die vraag daarvoor vra.`),
        solution: [
          { s: L(`Split the ± into its two answers first: x = ${C(m)} + √${C(r)} or x = ${C(m)} − √${C(r)}`, `Verdeel eers die ± in sy twee antwoorde: x = ${C(m)} + √${C(r)} of x = ${C(m)} − √${C(r)}`) },
          { s: L(`Work each one out and round ONCE, at the end, to two decimals: ${d2(hi)} and ${d2(lo)}`, `Bereken elkeen en rond EEN keer af, aan die einde, tot twee desimale: ${d2(hi)} en ${d2(lo)}`) },
          { s: L(`Write the decimals with a COMMA, and join each to its surd line with ≈`, `Skryf die desimale met 'n KOMMA, en koppel elkeen met ≈ aan sy wortelvorm-reël`), r: L("exact line with =, rounded line with ≈", "eksakte reël met =, afgeronde reël met ≈") },
        ] });
  },

  /* sum & product of roots — build the factors! (workbook's −42 trap) */
  sumProduct: () => {
    const m = randInt(2, 8), n = randInt(3, 9);       // roots: −m and n (n ≥ 3 keeps every option value distinct)
    const cVal = -m * n, bVal = -(-m + n);
    const prompt = L(`The roots of <b>x² + bx + c = 0</b> are <b>−${C(m)}</b> and <b>${C(n)}</b>. What is c?`, `Die wortels van <b>x² + bx + c = 0</b> is <b>−${C(m)}</b> en <b>${C(n)}</b>. Wat is c?`);
    const correct = L(`c = (${C(m)})(−${C(n)}) = ${C(cVal)}`, `c = (${C(m)})(−${C(n)}) = ${C(cVal)}`);
    const wrongs = [
      L(`c = ${C(m)} × ${C(n)} = ${C(m * n)}`, `c = ${C(m)} × ${C(n)} = ${C(m * n)}`),
      L(`c = −${C(m)} + ${C(n)} = ${C(-m + n)}`, `c = −${C(m)} + ${C(n)} = ${C(-m + n)}`),
      L(`c = −${C(m)} − ${C(n)} = ${C(-m - n)}`, `c = −${C(m)} − ${C(n)} = ${C(-m - n)}`),
    ];
    return mc(FOR, prompt, correct, wrongs,
      { hint: L(`Build the factors from the roots first: (x + ${C(m)})(x − ${C(n)}), then expand.`, `Bou eers die faktore uit die wortels: (x + ${C(m)})(x − ${C(n)}), brei dan uit.`),
        answerLabel: L(`Roots −${C(m)} and ${C(n)} → factors (x + ${C(m)})(x − ${C(n)}). The constant is the product of the FACTOR constants: (${C(m)})(−${C(n)}) = ${C(cVal)}. (And b = ${C(bVal)}, the sum of roots with opposite sign.)`, `Wortels −${C(m)} en ${C(n)} → faktore (x + ${C(m)})(x − ${C(n)}). Die konstante is die produk van die FAKTOR-konstantes: (${C(m)})(−${C(n)}) = ${C(cVal)}. (En b = ${C(bVal)}, die som van die wortels met die teenoorgestelde teken.)`),
        solution: [
          { s: L(`Turn each root into its factor, opposite sign: −${C(m)} gives (x + ${C(m)}), and ${C(n)} gives (x − ${C(n)})`, `Maak van elke wortel sy faktor, teenoorgestelde teken: −${C(m)} gee (x + ${C(m)}), en ${C(n)} gee (x − ${C(n)})`) },
          { s: L(`So the equation is (x + ${C(m)})(x − ${C(n)}) = 0`, `Dus is die vergelyking (x + ${C(m)})(x − ${C(n)}) = 0`) },
          { s: L(`Multiply out and read off c: (${C(m)})(−${C(n)}) = ${C(cVal)}`, `Vermenigvuldig uit en lees c af: (${C(m)})(−${C(n)}) = ${C(cVal)}`), r: L("c is the product of the numbers INSIDE the brackets, signs and all", "c is die produk van die getalle BINNE die hakies, tekens en al") },
          { s: L(`The same expansion gives b = ${C(bVal)}`, `Dieselfde uitbreiding gee b = ${C(bVal)}`), r: L("build the brackets — do not try to remember a sum-and-product formula", "bou die hakies: moenie probeer om 'n som-en-produk-formule te onthou nie") },
        ] });
  },

  /* simultaneous: who becomes the subject
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (2x − y = 9) — parametrisable"). The linear equation
     rolls; the correct rearrangement y = ax − c and all three decoys
     (take x instead · sign not carried across · "already finished") are
     built from the same two rolled numbers. */
  simulSubject: () => {
    if (pick([true, false])) {
      const it = { q: L("Simultaneous equations (substitution method). Which equation do you make a variable the subject of?", "Gelyktydige vergelykings (vervangingsmetode). Van watter vergelyking maak jy 'n veranderlike die onderwerp?"), correct: L("The simpler one — usually the LINEAR equation", "Die eenvoudigste een: gewoonlik die LINEÊRE vergelyking"), wrongs: [L("The quadratic one — it has more information", "Die kwadratiese een: dit het meer inligting"), L("Always the first one written", "Altyd die een wat eerste geskryf is"), L("Either — it makes no difference to the work", "Enige een: dit maak geen verskil aan die werk nie")], ans: L("Rearrange the LINEAR equation (least work, no squares), then substitute that expression into the other equation.", "Herrangskik die LINEÊRE vergelyking (minste werk, geen kwadrate nie), en vervang dan daardie uitdrukking in die ander vergelyking.") };
      return mc(SIM, it.q, it.correct, it.wrongs,
        { hint: L("Pick the easy (linear) equation and make one variable the subject.", "Kies die maklike (lineêre) vergelyking en maak een veranderlike die onderwerp."), answerLabel: it.ans,
          solution: [
            { s: L("Making a variable the subject means getting it alone on one side", "Om 'n veranderlike die onderwerp te maak, beteken om dit alleen aan een kant te kry") },
            { s: L("In the linear equation nothing is squared, so it comes out in one or two moves", "In die lineêre vergelyking is niks gekwadreer nie, dus kom dit in een of twee stappe uit") },
            { s: L("Rearranging the quadratic would leave a root sign in your expression — much messier", "As jy die kwadratiese een herrangskik, kry jy 'n wortelteken in jou uitdrukking: baie morsiger"),
              r: L("so rearrange the LINEAR one and substitute it into the other", "herrangskik dus die LINEÊRE een en vervang dit in die ander") },
          ] });
    }
    const a = randInt(2, 6), c = randInt(2, 12);
    return mc(SIM,
      L(`From <b>${C(a)}x − y = ${C(c)}</b>, the tidy subject to take is…`, `Uit <b>${C(a)}x − y = ${C(c)}</b> is die netjiese onderwerp om te kies…`),
      L(`y = ${C(a)}x − ${C(c)}`, `y = ${C(a)}x − ${C(c)}`),
      [L(`x = (${C(c)} + y)/${C(a)} — always take x`, `x = (${C(c)} + y)/${C(a)}: kies altyd x`), L(`y = ${C(c)} − ${C(a)}x`, `y = ${C(c)} − ${C(a)}x`), L(`${C(a)}x = y + ${C(c)} is already finished`, `${C(a)}x = y + ${C(c)} is reeds klaar`)],
      { hint: L("Pick the easy (linear) equation and make one variable the subject.", "Kies die maklike (lineêre) vergelyking en maak een veranderlike die onderwerp."),
        answerLabel: L(`y = ${C(a)}x − ${C(c)} (watch the signs as it crosses). Substituting this into the other equation leaves one variable.`, `y = ${C(a)}x − ${C(c)} (pas op vir die tekens as dit oorkant toe gaan). Vervang dit in die ander vergelyking, dan bly een veranderlike oor.`),
        solution: [
          { s: L(`Choose the variable with nothing attached to it — here that is the y`, `Kies die veranderlike met niks daaraan vas nie: hier is dit die y`) },
          { s: L(`${C(a)}x − y = ${C(c)}  →  ${C(a)}x − ${C(c)} = y`, `${C(a)}x − y = ${C(c)}  →  ${C(a)}x − ${C(c)} = y`), r: L("move the y across, move the number across", "bring die y oor, bring die getal oor") },
          { s: L(`y = ${C(a)}x − ${C(c)}`, `y = ${C(a)}x − ${C(c)}`), r: L(`taking x instead would drag in a division by ${C(a)} for no reason`, `as jy eerder x kies, kry jy verniet 'n deling deur ${C(a)}`) },
        ] });
  },

  /* what you get and how to finish
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "one fixed
     concrete example (x = 3 → y) mixed with generic items"). The
     back-substitution item rolls its x-value and its linear equation, and
     the partner y is computed from them (y = a·x₀ − c), so the worked
     line and the coordinate pair can never disagree. Coordinate pairs
     keep her SEMICOLON (METHODS-algebra 0.1). The two generic items are
     untouched. */
  simulFinish: () => {
    const shape = randInt(1, 3);
    if (shape === 1) {
      const it = { q: L("Linear + quadratic simultaneous equations: how many solution PAIRS can there be?", "Lineêre + kwadratiese gelyktydige vergelykings: hoeveel PARE oplossings kan daar wees?"), correct: L("Up to two — and each answer must be paired with its partner value", "Tot twee, en elke antwoord moet met sy maatwaarde gepaar word"), wrongs: [L("Exactly one, always", "Presies een, altyd"), L("Up to four", "Tot vier"), L("None — a line and a parabola can't be solved together", "Geen: 'n lyn en 'n parabool kan nie saam opgelos word nie")], ans: L("Substituting the line into the quadratic gives a quadratic → up to two x-values, each with its own y. Write each as a coordinate pair (x ; y).", "As jy die lyn in die kwadratiese vergelyking vervang, kry jy 'n kwadratiese vergelyking → tot twee x-waardes, elkeen met sy eie y. Skryf elkeen as 'n koördinaatpaar (x ; y).") };
      return mc(SIM, it.q, it.correct, it.wrongs,
        { hint: L("Substitute, solve the quadratic, back-substitute, pair up.", "Vervang, los die kwadratiese vergelyking op, vervang terug, maak pare."), answerLabel: it.ans,
          solution: [
            { s: L("Substituting the line into the quadratic leaves one variable, in a quadratic equation", "As jy die lyn in die kwadratiese vergelyking vervang, bly een veranderlike oor, in 'n kwadratiese vergelyking") },
            { s: L("A quadratic gives at most two answers, so there are at most two x-values", "'n Kwadratiese vergelyking gee hoogstens twee antwoorde, dus is daar hoogstens twee x-waardes") },
            { s: L("Each x has its own y, so the answers come out as up to two pairs (x ; y)", "Elke x het sy eie y, dus kom die antwoorde uit as tot twee pare (x ; y)"),
              r: L("picture it: a line can cut a parabola twice, touch it once, or miss it", "sien dit in jou kop: 'n lyn kan 'n parabool twee keer sny, een keer raak, of mis") },
          ] });
    }
    if (shape === 2) {
      return ynQ(SIM,
        L("Final answers to simultaneous equations should be written as coordinate pairs, e.g. (3 ; −3). True?", "Finale antwoorde van gelyktydige vergelykings moet as koördinaatpare geskryf word, bv. (3 ; −3). Waar?"),
        true,
        { hint: L("Each x belongs to a specific y.", "Elke x behoort aan 'n spesifieke y."),
          answerLabel: L("True — each solution is a PAIR that works in both equations, so write them together: (3 ; −3).", "Waar: elke oplossing is 'n PAAR wat in albei vergelykings werk, so skryf hulle saam: (3 ; −3)."),
          solution: [
            { s: L("A solution has to satisfy BOTH equations, which takes an x and its own matching y", "'n Oplossing moet ALBEI vergelykings bevredig, en daarvoor het jy 'n x en sy eie y nodig") },
            { s: L("Listing the x-values alone loses which y belongs to which x", "As jy net die x-waardes lys, verloor jy watter y by watter x hoort") },
            { s: L("∴ true — write each solution as a pair, with a SEMICOLON: (3 ; −3)", "∴ waar: skryf elke oplossing as 'n paar, met 'n KOMMAPUNT: (3 ; −3)"), r: L("the comma is the decimal separator", "die komma is die desimale skeidingsteken") },
          ] });
    }
    const x0 = randInt(2, 7), a = randInt(2, 5), c = randInt(2, 12);
    const y0 = a * x0 - c;
    return mc(SIM,
      L(`You solved x = ${C(x0)}. How do you find the matching y?`, `Jy het x = ${C(x0)} gekry. Hoe kry jy die y wat daarby pas?`),
      L(`Substitute x = ${C(x0)} back into the SUBJECT expression (the linear equation)`, `Vervang x = ${C(x0)} terug in die ONDERWERP-uitdrukking (die lineêre vergelyking)`),
      [L("y is always 0", "y is altyd 0"), L("Substitute into the discriminant", "Vervang in die diskriminant"), L("Guess and check", "Raai en toets")],
      { hint: L("Substitute, solve the quadratic, back-substitute, pair up.", "Vervang, los die kwadratiese vergelyking op, vervang terug, maak pare."),
        answerLabel: L(`Back-substitute into the linear equation (the easy one): e.g. y = ${C(a)}(${C(x0)}) − ${C(c)} = ${C(y0)}, giving the pair (${C(x0)} ; ${C(y0)}).`, `Vervang terug in die lineêre vergelyking (die maklike een): bv. y = ${C(a)}(${C(x0)}) − ${C(c)} = ${C(y0)}, wat die paar (${C(x0)} ; ${C(y0)}) gee.`),
        solution: [
          { s: L(`Go back to the LINEAR equation — it is the easy one, and it is already y = …`, `Gaan terug na die LINEÊRE vergelyking: dit is die maklike een, en dit is reeds y = …`) },
          { s: L(`Put the x in, bracketed: y = ${C(a)}(${C(x0)}) − ${C(c)}`, `Sit die x in, tussen hakies: y = ${C(a)}(${C(x0)}) − ${C(c)}`) },
          { s: L(`y = ${C(y0)}, so the pair is (${C(x0)} ; ${C(y0)})`, `y = ${C(y0)}, dus is die paar (${C(x0)} ; ${C(y0)})`), r: L("do this fresh for each x-value you found", "doen dit van voor af vir elke x-waarde wat jy gekry het") },
        ] });
  },
};

export const questEq6 = {
  id: "eq6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["simulSubject", "simulFinish"].includes(id) ? SIM : FOR,
    gen,
  })),
};
