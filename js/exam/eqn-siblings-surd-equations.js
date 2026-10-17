/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the NEW
   tile "surd-equations" ("Surd equations (check the false root)").
   (EXAM-BUILD-DAY.md, 2026-08-23, the eqn tile map; wave 2, session C2.)
   ------------------------------------------------------------
   SIX cards, born from nothing. The paper bank is blunt about why this
   tile has to exist: GR11-IEB-PAPER-BANK.md archetype 2 —
   "the surd equation with a built-in extraneous root — in EVERY
   surveyed paper, 4–5 marks, always calculator-free". Her own 2025
   Test 1 has one too. Blipwork had exactly zero.

   HER METHOD IS METHODS-algebra.md A15 (her `EQ p41` summary box):
     1. isolate the √ on one side
     2. square both sides — brackets on BOTH sides
     3. watch the middle term: (x + 3)² = x² + 6x + 9
     4. solve what is left
     5. "ALWAYS test both answers!!" — her capitals, her two
        exclamation marks
     6. mark the failing root N.A. and write it with a struck equals,
        x ≠ 3
   The substitution test is a MARKED STEP, not an optional check
   (METHODS-algebra Part C, "credited steps a generator should always
   show"), so every memo here spends ticks on it — usually two of its
   four or five.

   WHAT THE SIX COVER, and why these six:
     q1  the shape at its simplest, then the classic with ONE false
         root — the archetype the bank says is in every paper
     q2  the one where BOTH roots survive, so "reject one" never
         becomes a reflex
     q3  the one where NEITHER survives: the answer is "no solution"
     q4  the one that must be ISOLATED first (√(x + 5) + x = 7)
     q5  a quadratic in √x — her k-method leads, isolate-and-square
         rides under OR (METHODS-algebra Flag F5, ruled by her
         2026-08-21: "ALWAYS show both")
     q6  a restriction stated up front, then "hence" — where a root
         obeys the restriction and STILL fails the check

   THE TRAP CARD RIDES ON EVERY CARD (the brief): squaring an equation
   can invent a root, so both answers go back into the ORIGINAL.

   lostQuest is exp/es8 — "No-solution & strategy", the Blipwork round
   whose own blurb reads "Exponential & surd equations: same base,
   common factor, let k, isolate-square-TEST, and every no-solution
   trap". It is the round that teaches this tile, and it lives in the
   Exponents & Surds chapter rather than this one; the schema allows a
   cross-chapter lostQuest and js/exam-play.js resolves it the same way.
   Every number here is fresh.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
/* The round that actually reteaches this skill — es8, in the Exponents
   & Surds chapter. See the header note above. */
const LOST = { chapter: "exp", quest: "es8" };

/* ---------------------------------------------------------------
   q1 — THE SHAPE, THEN THE CLASSIC.
   (a) √(x − 3) = 4 → x = 19
   (b) √(3x + 4) = x − 2 → x² − 7x = 0 → x = 0 (N.A.) or x = 7
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.se.q1",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-with-one-extraneous-root",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;√(x − 3) = 4", af: "Los op vir x: &nbsp;√(x − 3) = 4",
      },
      hint: {
        en: "A square root is undone by squaring. Square BOTH sides — the whole of each side, brackets and all — and see what is left.", af: "'n Vierkantswortel word ongedaan gemaak deur te kwadreer. Kwadreer ALBEI kante, elke kant in sy geheel, hakies en al, en kyk wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "The √ is already alone, so square both sides, brackets on both sides:", af: "Die √ staan reeds alleen, so kwadreer albei kante, met hakies aan albei kante:" } },
        { type: "step", text: { en: "(√(x − 3))² = 4² &nbsp;&nbsp;⟹&nbsp;&nbsp; x − 3 = 16", af: "(√(x − 3))² = 4² &nbsp;&nbsp;⟹&nbsp;&nbsp; x − 3 = 16" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴&nbsp; x = 19", af: "∴&nbsp; x = 19" }, ticks: ["a"] },
        { type: "step", text: { en: "Test it in the ORIGINAL equation: &nbsp;√(19 − 3) = √16 = 4, and the right-hand side is 4. It works.", af: "Toets dit in die OORSPRONKLIKE vergelyking: &nbsp;√(19 − 3) = √16 = 4, en die regterkant is 4. Dit werk." } },
        { type: "trap", text: {
          en: "REMEMBER: squaring both sides can invent an answer that was never really there, so the test is never optional — not even on an easy one like this. Get into the habit here, where it costs you nothing, so it is automatic when it matters.", af: "ONTHOU: om albei kante te kwadreer, kan 'n antwoord versin wat nooit regtig daar was nie, so die toets is nooit opsioneel nie, selfs nie op 'n maklike een soos hierdie nie. Kweek die gewoonte hier, waar dit jou niks kos nie, sodat dit outomaties is wanneer dit saak maak.",
        } },
      ],
      esplain: {
        en: "Squaring is the move that gets the x out from under the root. The root sign and the square undo each other, so the left side collapses to just what was inside, and the right side becomes sixteen. From there it is a one-step equation. The habit worth building is the last line: put your answer back into the equation you were given and check that both sides really do come out the same. Here nineteen minus three is sixteen, whose root is four, which matches. It feels unnecessary on a question this size, and that is exactly why it is the right place to practise it — on the harder ones the test is where the marks live.", af: "Kwadrering is die stap wat die x onder die wortel uitkry. Die wortelteken en die kwadraat maak mekaar ongedaan, so die linkerkant krimp tot net wat binne-in was, en die regterkant word sestien. Van daar af is dit 'n eenstap-vergelyking. Die gewoonte wat die moeite werd is om te kweek, is die laaste reël: sit jou antwoord terug in die vergelyking wat jy gekry het, en kyk of albei kante regtig dieselfde uitkom. Hier is negentien minus drie sestien, waarvan die wortel vier is, en dit klop. Dit voel onnodig op 'n vraag van hierdie grootte, en presies daarom is dit die regte plek om dit te oefen: op die moeiliker vrae is die toets waar die punte lê.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(3x + 4) = x − 2", af: "Los op vir x: &nbsp;√(3x + 4) = x − 2",
      },
      hint: {
        en: "Square both sides, but remember what happens to the right-hand side: squaring &nbsp;x − 2&nbsp; is not &nbsp;x² − 4. There is a middle term. Then test BOTH answers in the original equation.", af: "Kwadreer albei kante, maar onthou wat met die regterkant gebeur: &nbsp;x − 2&nbsp; gekwadreer is nie &nbsp;x² − 4 nie. Daar is 'n middelterm. Toets dan ALBEI antwoorde in die oorspronklike vergelyking.",
      },
      memo: [
        { type: "step", text: { en: "The √ is alone, so square both sides — brackets on both sides:", af: "Die √ staan alleen, so kwadreer albei kante, met hakies aan albei kante:" } },
        { type: "step", text: { en: "3x + 4 = (x − 2)² = x² − 4x + 4", af: "3x + 4 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "collect everything on the side that keeps x² positive: &nbsp;&nbsp;0 = x² − 7x", af: "bring alles na die kant wat x² positief hou: &nbsp;&nbsp;0 = x² − 7x" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = x(x − 7) &nbsp;&nbsp;∴&nbsp; x = 0 &nbsp;or&nbsp; x = 7", af: "0 = x(x − 7) &nbsp;&nbsp;∴&nbsp; x = 0 &nbsp;of&nbsp; x = 7" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Now test both</b>, in the ORIGINAL equation:", af: "<b>Toets nou albei</b>, in die OORSPRONKLIKE vergelyking:" } },
        { type: "answer", text: { en: "x = 0: &nbsp;√(3(0) + 4) = √4 = 2, &nbsp;but&nbsp; x − 2 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 0 &nbsp;&nbsp;N.A.", af: "x = 0: &nbsp;√(3(0) + 4) = √4 = 2, &nbsp;maar&nbsp; x − 2 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 0 &nbsp;&nbsp;n.v.t." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 7: &nbsp;√(3(7) + 4) = √25 = 5, &nbsp;and&nbsp; x − 2 = 5. &nbsp;&nbsp;5 = 5 &nbsp;&nbsp;∴&nbsp; x = 7", af: "x = 7: &nbsp;√(3(7) + 4) = √25 = 5, &nbsp;en&nbsp; x − 2 = 5. &nbsp;&nbsp;5 = 5 &nbsp;&nbsp;∴&nbsp; x = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a squared equation can INVENT a root — check BOTH answers in the original. Squaring cannot tell +2 apart from −2, so it happily accepts an answer that makes the two sides opposite instead of equal. That is what happened to &nbsp;x = 0&nbsp; here, and it is why the rejected root is marked N.A. rather than crossed out in silence.", af: "PASOP: 'n gekwadreerde vergelyking kan 'n wortel VERSIN: toets ALBEI antwoorde in die oorspronklike. Kwadrering kan nie +2 en −2 uitmekaar ken nie, so dit aanvaar sonder kla 'n antwoord wat die twee kante teenoorgesteld maak in plaas van gelyk. Dit is wat hier met &nbsp;x = 0&nbsp; gebeur het, en daarom word die verwerpte wortel as n.v.t. gemerk eerder as om dit stil-stil deur te haal.",
        } },
      ],
      esplain: {
        en: "The left side of this equation is a square root, so it can never come out negative. The right side is x minus two, which is negative whenever x is smaller than two. So before any algebra you already know that any answer below two is going to be trouble. Squaring both sides is still the way forward, but squaring is careless: it treats two and negative two as the same thing, so it can let through an answer that makes the sides opposite rather than equal. That is exactly what zero does here — the root gives two, the other side gives negative two. Seven passes cleanly. Writing N.A. next to the failed one, with the struck equals, is how her memos show that you tested it and rejected it on purpose.", af: "Die linkerkant van hierdie vergelyking is 'n vierkantswortel, so dit kan nooit negatief uitkom nie. Die regterkant is x minus twee, wat negatief is wanneer x kleiner as twee is. Nog voor enige algebra weet jy dus al dat enige antwoord onder twee moeilikheid gaan gee. Om albei kante te kwadreer, is steeds die pad vorentoe, maar kwadrering is slordig: dit behandel twee en negatief twee as dieselfde ding, so dit kan 'n antwoord deurlaat wat die kante teenoorgesteld maak eerder as gelyk. Dit is presies wat nul hier doen: die wortel gee twee, die ander kant gee negatief twee. Sewe slaag skoon. Om n.v.t. langs die een wat misluk te skryf, met die deurgestreepte gelykaanteken, is hoe haar memo's wys dat jy dit getoets en doelbewus verwerp het.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — BOTH ROOTS SURVIVE.
   √(7x − 20) = x − 2 → x² − 11x + 24 = 0 → x = 3 and x = 8, both keep.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.se.q2",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-where-both-roots-survive-the-test",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(7x − 20) = x − 2", af: "Los op vir x: &nbsp;√(7x − 20) = x − 2",
      },
      hint: {
        en: "Same routine: square both sides, collect everything on one side, factorise. Then test both answers — and do not assume one of them has to fail.", af: "Dieselfde roetine: kwadreer albei kante, bring alles na een kant, faktoriseer. Toets dan albei antwoorde, en moenie aanneem een van hulle moet misluk nie.",
      },
      memo: [
        { type: "step", text: { en: "The √ is alone, so square both sides:", af: "Die √ staan alleen, so kwadreer albei kante:" } },
        { type: "step", text: { en: "7x − 20 = (x − 2)² = x² − 4x + 4", af: "7x − 20 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 11x + 24", af: "0 = x² − 11x + 24" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = (x − 3)(x − 8) &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;or&nbsp; x = 8", af: "0 = (x − 3)(x − 8) &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;of&nbsp; x = 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 3: &nbsp;√(21 − 20) = √1 = 1, &nbsp;and&nbsp; x − 2 = 1. &nbsp;&nbsp;1 = 1 — it works.", af: "x = 3: &nbsp;√(21 − 20) = √1 = 1, &nbsp;en&nbsp; x − 2 = 1. &nbsp;&nbsp;1 = 1, dit werk." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 8: &nbsp;√(56 − 20) = √36 = 6, &nbsp;and&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6 — it works too. &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;or&nbsp; x = 8", af: "x = 8: &nbsp;√(56 − 20) = √36 = 6, &nbsp;en&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6, dit werk ook. &nbsp;&nbsp;∴&nbsp; x = 3 &nbsp;of&nbsp; x = 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: two surviving answers is NOT a mistake. Squaring only <i>sometimes</i> invents a root, and there is no rule that says one answer must be thrown away. Test both, keep whatever passes — throwing away a perfectly good answer because “there is always a false one” costs the same mark as keeping a bad one.", af: "ONTHOU: twee antwoorde wat oorleef, is NIE 'n fout nie. Kwadrering versin net <i>soms</i> 'n wortel, en daar is geen reël wat sê een antwoord moet weggegooi word nie. Toets albei, hou wat ook al slaag: as jy 'n heeltemal goeie antwoord weggooi omdat “daar altyd 'n vals een is”, kos dit dieselfde punt as om 'n slegte een te hou.",
        } },
      ],
      esplain: {
        en: "Everything here runs exactly as it did on the question with a false root, right up to the last two lines. Square both sides, watch the middle term when x minus two is squared, bring everything over so the quadratic reads equals zero, and factorise. What is different is the outcome of the test. Both three and eight make the right-hand side positive, and a positive right-hand side is what a square root can actually match, so neither one is a fake. The reason to test anyway is that you cannot know which case you are in until you look. Some learners start rejecting the smaller root automatically because that is what happened last time; here that habit would throw away half the marks.", af: "Alles hier loop presies soos by die vraag met 'n vals wortel, tot by die laaste twee reëls. Kwadreer albei kante, pas op vir die middelterm wanneer x minus twee gekwadreer word, bring alles oor sodat die kwadratiese vergelyking gelyk aan nul is, en faktoriseer. Wat verskil, is die uitslag van die toets. Beide drie en agt maak die regterkant positief, en 'n positiewe regterkant is wat 'n vierkantswortel werklik kan ewenaar, so nie een van hulle is vals nie. Die rede om tog te toets, is dat jy nie kan weet in watter geval jy is voordat jy kyk nie. Party leerders begin outomaties die kleiner wortel verwerp omdat dit die vorige keer gebeur het; hier sou daardie gewoonte die helfte van die punte weggooi.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — NEITHER ROOT SURVIVES → NO SOLUTION.
   √(19 − 5x) = x − 5 → x² − 5x + 6 = 0 → x = 2 and x = 3, both N.A.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.se.q3",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-where-every-root-fails-the-test",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;√(19 − 5x) = x − 5", af: "Los op vir x: &nbsp;√(19 − 5x) = x − 5",
      },
      hint: {
        en: "Work it the usual way. When you get to the test, look carefully at the sign of the right-hand side at each answer before you decide what to write.", af: "Werk dit op die gewone manier uit. Wanneer jy by die toets kom, kyk mooi na die teken van die regterkant by elke antwoord voordat jy besluit wat om te skryf.",
      },
      memo: [
        { type: "step", text: { en: "Square both sides:", af: "Kwadreer albei kante:" } },
        { type: "step", text: { en: "19 − 5x = (x − 5)² = x² − 10x + 25", af: "19 − 5x = (x − 5)² = x² − 10x + 25" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 5x + 6", af: "0 = x² − 5x + 6" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = (x − 2)(x − 3) &nbsp;&nbsp;∴&nbsp; x = 2 &nbsp;or&nbsp; x = 3", af: "0 = (x − 2)(x − 3) &nbsp;&nbsp;∴&nbsp; x = 2 &nbsp;of&nbsp; x = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2: &nbsp;√(19 − 10) = √9 = 3, &nbsp;but&nbsp; x − 5 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ 2 &nbsp;&nbsp;N.A.", af: "x = 2: &nbsp;√(19 − 10) = √9 = 3, &nbsp;maar&nbsp; x − 5 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ 2 &nbsp;&nbsp;n.v.t." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 3: &nbsp;√(19 − 15) = √4 = 2, &nbsp;but&nbsp; x − 5 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 3 &nbsp;&nbsp;N.A. &nbsp;&nbsp;Both fail &nbsp;∴&nbsp; the equation has <b>no solution</b>.", af: "x = 3: &nbsp;√(19 − 15) = √4 = 2, &nbsp;maar&nbsp; x − 5 = −2. &nbsp;&nbsp;2 ≠ −2 &nbsp;&nbsp;∴&nbsp; x ≠ 3 &nbsp;&nbsp;n.v.t. &nbsp;&nbsp;Albei misluk &nbsp;∴&nbsp; die vergelyking het <b>geen oplossing</b> nie." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “no solution” is a real, complete, full-mark answer here — it is not a sign that you went wrong. What you must NOT do is hand in &nbsp;x = 2 or x = 3&nbsp; because the algebra produced them. Those two are what the SQUARED equation says; the original equation says neither of them works.", af: "PASOP: “geen oplossing” is hier 'n regte, volledige antwoord wat volpunte kry: dit is nie 'n teken dat jy iewers verkeerd gegaan het nie. Wat jy NIE moet doen nie, is om &nbsp;x = 2 of x = 3&nbsp; in te gee omdat die algebra hulle opgelewer het. Daardie twee is wat die GEKWADREERDE vergelyking sê; die oorspronklike vergelyking sê nie een van hulle werk nie.",
        } },
      ],
      esplain: {
        en: "Look at the two sides before you start. The left is a square root, so it is never negative. The right is x minus five, which is negative for every x below five. So the only x that could possibly work has to be at least five — and the squaring produces two answers, two and three, both well under five. Neither can be right, and the tests confirm it: each time the root gives a positive number and the other side gives its negative. So both are marked N.A. and the equation has no solution. This is the case that teaches what the check is really for. Without it you would hand in two answers that the original equation flatly rejects.", af: "Kyk na die twee kante voordat jy begin. Die linkerkant is 'n vierkantswortel, so dit is nooit negatief nie. Die regterkant is x minus vyf, wat negatief is vir elke x onder vyf. Die enigste x wat moontlik kan werk, moet dus minstens vyf wees, en die kwadrering gee twee antwoorde, twee en drie, albei ver onder vyf. Nie een kan reg wees nie, en die toetse bevestig dit: elke keer gee die wortel 'n positiewe getal en die ander kant sy negatief. Albei word dus as n.v.t. gemerk en die vergelyking het geen oplossing nie. Dit is die geval wat jou leer waarvoor die toets eintlik is. Daarsonder sou jy twee antwoorde ingee wat die oorspronklike vergelyking reguit verwerp.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — ISOLATE THE √ FIRST (A15 step 1).
   √(x + 5) + x = 7 → √(x + 5) = 7 − x → x² − 15x + 44 = 0
   → x = 4 (keep) or x = 11 (N.A.)
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.se.q4",
  chapter: CH,
  topic: "surd-equations",
  archetype: "surd-equation-that-must-be-isolated-before-squaring",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;√(x + 5) + x = 7", af: "Los op vir x: &nbsp;√(x + 5) + x = 7",
      },
      hint: {
        en: "Do not square yet. Nothing may sit beside the root when you square — get the √ completely on its own first, then square.", af: "Moenie nou al kwadreer nie. Niks mag langs die wortel staan wanneer jy kwadreer nie: kry die √ eers heeltemal alleen, en kwadreer dan.",
      },
      memo: [
        { type: "step", text: { en: "Isolate the √ first — nothing may be standing next to it when you square:", af: "Isoleer eers die √, want niks mag langsaan staan wanneer jy kwadreer nie:" } },
        { type: "step", text: { en: "√(x + 5) = 7 − x", af: "√(x + 5) = 7 − x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "square both sides: &nbsp;&nbsp;x + 5 = (7 − x)² = 49 − 14x + x²", af: "kwadreer albei kante: &nbsp;&nbsp;x + 5 = (7 − x)² = 49 − 14x + x²" }, ticks: ["ca"] },
        { type: "step", text: { en: "0 = x² − 15x + 44 = (x − 4)(x − 11) &nbsp;&nbsp;∴&nbsp; x = 4 &nbsp;or&nbsp; x = 11", af: "0 = x² − 15x + 44 = (x − 4)(x − 11) &nbsp;&nbsp;∴&nbsp; x = 4 &nbsp;of&nbsp; x = 11" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 4: &nbsp;√9 + 4 = 3 + 4 = 7 — it works.", af: "x = 4: &nbsp;√9 + 4 = 3 + 4 = 7, dit werk." }, ticks: ["a"] },
        { type: "answer", text: { en: "x = 11: &nbsp;√16 + 11 = 4 + 11 = 15, &nbsp;and&nbsp; 15 ≠ 7 &nbsp;&nbsp;∴&nbsp; x ≠ 11 &nbsp;&nbsp;N.A. &nbsp;&nbsp;∴&nbsp; x = 4", af: "x = 11: &nbsp;√16 + 11 = 4 + 11 = 15, &nbsp;en&nbsp; 15 ≠ 7 &nbsp;&nbsp;∴&nbsp; x ≠ 11 &nbsp;&nbsp;n.v.t. &nbsp;&nbsp;∴&nbsp; x = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: &nbsp;(√(x + 5) + x)²&nbsp; is NOT &nbsp;(x + 5) + x². Squaring a SUM always produces a middle term, and squaring here without isolating first leaves you with a root still in the equation and a bigger mess than you started with. Isolate, then square.", af: "PASOP: &nbsp;(√(x + 5) + x)²&nbsp; is NIE &nbsp;(x + 5) + x² nie. As jy 'n SOM kwadreer, kry jy altyd 'n middelterm, en as jy hier kwadreer sonder om eers te isoleer, sit jy steeds met 'n wortel in die vergelyking en 'n groter gemors as waarmee jy begin het. Isoleer, kwadreer dan.",
        } },
      ],
      esplain: {
        en: "The reason for isolating first is simple: squaring only cleans up a root when the root is the whole of that side. If the x is still sitting next to it, squaring gives you the square of a sum, which has three terms and still contains a root in the middle. So move the x across first. After that it is the usual routine — square, mind the middle term of seven minus x squared, collect everything into a quadratic, factorise, and test both answers in the equation you were given. Eleven is the invented one: it makes the left-hand side fifteen instead of seven, which happened because seven minus eleven is negative and squaring hid that. Four passes and is the answer.", af: "Die rede om eers te isoleer, is eenvoudig: kwadrering ruim 'n wortel net op wanneer die wortel die hele kant is. As die x nog langsaan sit, gee kwadrering jou die kwadraat van 'n som, wat drie terme het en steeds 'n wortel in die middel bevat. Bring dus eers die x oor. Daarna is dit die gewone roetine: kwadreer, pas op vir die middelterm van sewe minus x gekwadreer, bring alles in 'n kwadratiese vergelyking bymekaar, faktoriseer, en toets albei antwoorde in die vergelyking wat jy gekry het. Elf is die versinde een: dit maak die linkerkant vyftien in plaas van sewe, en dit het gebeur omdat sewe minus elf negatief is en kwadrering dit weggesteek het. Vier slaag en is die antwoord.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A QUADRATIC IN √x (her k-method leads; isolate-and-square
   rides under OR — METHODS-algebra Flag F5, her ruling 2026-08-21).
   2x − 5√x − 3 = 0 → 2K² − 5K − 3 = 0 → K = 3 (x = 9) or K = −1/2 (out)
   --------------------------------------------------------------- */
const q5 = {
  id: "eqn.sib.se.q5",
  chapter: CH,
  topic: "surd-equations",
  archetype: "quadratic-in-root-x-with-an-impossible-k-branch",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;2x − 5√x − 3 = 0", af: "Los op vir x: &nbsp;2x − 5√x − 3 = 0",
      },
      hint: {
        en: "Look at the shape rather than the letters: there is an x, a √x and a number. What do you get when you square √x? Give that thing a short name and the equation turns into one you have solved a hundred times.", af: "Kyk na die vorm eerder as na die letters: daar is 'n x, 'n √x en 'n getal. Wat kry jy as jy √x kwadreer? Gee daardie ding 'n kort naam, en die vergelyking word een wat jy al honderd keer opgelos het.",
      },
      memo: [
        { type: "step", text: { en: "An x, a √x and a number — that is a quadratic in disguise, because (√x)² = x.", af: "'n x, 'n √x en 'n getal: dit is 'n vermomde kwadratiese vergelyking, want (√x)² = x." } },
        { type: "step", text: { en: "let K = √x &nbsp;&nbsp;(then K² = x)", af: "stel K = √x &nbsp;&nbsp;(dan is K² = x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2K² − 5K − 3 = 0", af: "2K² − 5K − 3 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(2K + 1)(K − 3) = 0 &nbsp;&nbsp;∴&nbsp; K = −1/2 &nbsp;or&nbsp; K = 3", af: "(2K + 1)(K − 3) = 0 &nbsp;&nbsp;∴&nbsp; K = −1/2 &nbsp;of&nbsp; K = 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "K = 3: &nbsp;√x = 3 &nbsp;&nbsp;∴&nbsp; x = 9", af: "K = 3: &nbsp;√x = 3 &nbsp;&nbsp;∴&nbsp; x = 9" }, ticks: ["a"] },
        { type: "answer", text: { en: "K = −1/2: &nbsp;√x = −1/2 &nbsp;is impossible — a square root of a real number is never negative &nbsp;∴&nbsp; no solution from that branch", af: "K = −1/2: &nbsp;√x = −1/2 &nbsp;is onmoontlik: 'n vierkantswortel van 'n reële getal is nooit negatief nie &nbsp;∴&nbsp; geen oplossing uit daardie tak nie" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — isolate and square (same marks): &nbsp;2x − 3 = 5√x &nbsp;⟹&nbsp; (2x − 3)² = (5√x)² &nbsp;⟹&nbsp; 4x² − 12x + 9 = 25x &nbsp;⟹&nbsp; 4x² − 37x + 9 = 0 &nbsp;⟹&nbsp; (4x − 1)(x − 9) = 0 &nbsp;⟹&nbsp; x = 1/4 or x = 9. Squaring can invent a root, so test both in the original: &nbsp;x = 1/4 gives 2(1/4) − 5(1/2) − 3 = −5, not 0 &nbsp;⟹&nbsp; N.A.; &nbsp;x = 9 gives 18 − 15 − 3 = 0 &nbsp;⟹&nbsp; keep.", af: "<b>OF</b>, isoleer en kwadreer (dieselfde punte): &nbsp;2x − 3 = 5√x &nbsp;⟹&nbsp; (2x − 3)² = (5√x)² &nbsp;⟹&nbsp; 4x² − 12x + 9 = 25x &nbsp;⟹&nbsp; 4x² − 37x + 9 = 0 &nbsp;⟹&nbsp; (4x − 1)(x − 9) = 0 &nbsp;⟹&nbsp; x = 1/4 of x = 9. Kwadrering kan 'n wortel versin, so toets albei in die oorspronklike: &nbsp;x = 1/4 gee 2(1/4) − 5(1/2) − 3 = −5, nie 0 nie &nbsp;⟹&nbsp; n.v.t.; &nbsp;x = 9 gee 18 − 15 − 3 = 0 &nbsp;⟹&nbsp; hou." } },
        { type: "trap", text: {
          en: "REMEMBER: K is not the answer. You were asked for x, so every branch has to be walked back through &nbsp;√x = K. That walk back is where the second branch dies — and it dies with the words “<b>no solution</b>”, not “undefined” (that is for dividing by zero) and not “non-real” (that is for an even root of a negative).", af: "ONTHOU: K is nie die antwoord nie. Die vraag het x gevra, so elke tak moet teruggeloop word deur &nbsp;√x = K. Op daardie terugpad sterf die tweede tak, en dit sterf met die woorde “<b>geen oplossing</b>”, nie “onbepaald” nie (dit is vir deling deur nul) en nie “nie-reëel” nie (dit is vir 'n ewe wortel van 'n negatief).",
        } },
      ],
      esplain: {
        en: "The k-method works here because root x squared is just x, so the two x-shaped things in the equation are really one thing and its square. Call root x by the short name K and what is left is an ordinary trinomial you can factorise. Then comes the part that costs marks: K is not what the question asked for. Each K has to be turned back into an x through root x equals K. Three works and gives nine. Negative a half does not, because a square root never comes out negative, so that branch simply has no answer. Her other road — moving the root across and squaring — is equally correct and equally marked; it invents a fake root along the way, so it must finish with both answers tested.", af: "Die k-metode werk hier omdat wortel x gekwadreer net x is, so die twee x-agtige dinge in die vergelyking is eintlik een ding en sy kwadraat. Noem wortel x kortweg K, en wat oorbly, is 'n gewone drieterm wat jy kan faktoriseer. Dan kom die deel wat punte kos: K is nie wat die vraag gevra het nie. Elke K moet terug na 'n x verander word deur wortel x is gelyk aan K. Drie werk en gee nege. Negatief 'n half werk nie, want 'n vierkantswortel kom nooit negatief uit nie, so daardie tak het eenvoudig geen antwoord nie. Haar ander pad, om die wortel oor te bring en te kwadreer, is net so korrek en kry dieselfde punte; dit versin langs die pad 'n vals wortel, so dit moet eindig met albei antwoorde getoets.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — RESTRICTION UP FRONT, THEN "HENCE".
   (a) √(3x + 12) real ⟺ x ≥ −4
   (b) √(3x + 12) = x − 2 → x² − 7x − 8 = 0 → x = 8 (keep),
       x = −1 (obeys the restriction and STILL fails the check)
   --------------------------------------------------------------- */
const q6 = {
  id: "eqn.sib.se.q6",
  chapter: CH,
  topic: "surd-equations",
  archetype: "restriction-first-then-a-root-that-obeys-it-but-still-fails",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;√(3x + 12)&nbsp; real?<br>Give your answer in the form &nbsp;x ≥ …", af: "Vir watter waardes van x is &nbsp;√(3x + 12)&nbsp; reëel?<br>Gee jou antwoord in die vorm &nbsp;x ≥ …",
      },
      hint: {
        en: "An even root of a negative number is non-real. So whatever is sitting under that root sign is not allowed to be negative — write that down as an inequality and solve it.", af: "'n Ewe wortel van 'n negatiewe getal is nie-reëel. Wat ook al onder daardie wortelteken sit, mag dus nie negatief wees nie: skryf dit as 'n ongelykheid neer en los dit op.",
      },
      memo: [
        { type: "step", text: { en: "A square root is only real when what is under it is not negative:", af: "'n Vierkantswortel is net reëel wanneer wat onder dit staan nie negatief is nie:" } },
        { type: "step", text: { en: "3x + 12 ≥ 0", af: "3x + 12 ≥ 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "3x ≥ −12 &nbsp;&nbsp;∴&nbsp; x ≥ −4", af: "3x ≥ −12 &nbsp;&nbsp;∴&nbsp; x ≥ −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: it is &nbsp;≥ 0, not &nbsp;&gt; 0. Zero is allowed under a root — √0 is 0, which is perfectly real. Only a NEGATIVE is out of bounds.", af: "ONTHOU: dit is &nbsp;≥ 0, nie &nbsp;&gt; 0 nie. Nul is onder 'n wortel toegelaat: √0 is 0, wat heeltemal reëel is. Net 'n NEGATIEF is buite perke.",
        } },
      ],
      esplain: {
        en: "Nothing real, multiplied by itself, gives a negative answer, so a square root of a negative number does not exist among the numbers we work with — she calls that non-real. That means the expression under the root sign has to be zero or more, and writing that down gives an ordinary linear inequality. Solve it exactly like an equation: take the twelve across and divide by three. Since three is positive the inequality sign does not flip; it would only flip if you multiplied or divided by a negative. The answer, x is greater than or equal to negative four, describes every x for which this expression is even allowed to exist.", af: "Niks reëels wat met homself vermenigvuldig word, gee 'n negatiewe antwoord nie, so 'n vierkantswortel van 'n negatiewe getal bestaan nie tussen die getalle waarmee ons werk nie: sy noem dit nie-reëel. Dit beteken die uitdrukking onder die wortelteken moet nul of meer wees, en as jy dit neerskryf, kry jy 'n gewone lineêre ongelykheid. Los dit presies soos 'n vergelyking op: bring die twaalf oor en deel deur drie. Omdat drie positief is, draai die ongelykheidsteken nie om nie; dit sou net omdraai as jy met 'n negatief vermenigvuldig of daardeur deel. Die antwoord, x is groter as of gelyk aan negatief vier, beskryf elke x waarvoor hierdie uitdrukking selfs mag bestaan.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence solve for x: &nbsp;√(3x + 12) = x − 2", af: "Los gevolglik op vir x: &nbsp;√(3x + 12) = x − 2",
      },
      hint: {
        en: "Square and solve as usual. When you test your two answers, check each one against BOTH things: the restriction from (a), and whether it really makes the two sides equal.", af: "Kwadreer en los op soos gewoonlik. Wanneer jy jou twee antwoorde toets, toets elkeen teen BEIDE dinge: die beperking uit (a), en of dit die twee kante regtig gelyk maak.",
      },
      memo: [
        { type: "step", text: { en: "Square both sides: &nbsp;&nbsp;3x + 12 = (x − 2)² = x² − 4x + 4", af: "Kwadreer albei kante: &nbsp;&nbsp;3x + 12 = (x − 2)² = x² − 4x + 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "0 = x² − 7x − 8 = (x − 8)(x + 1) &nbsp;&nbsp;∴&nbsp; x = 8 &nbsp;or&nbsp; x = −1", af: "0 = x² − 7x − 8 = (x − 8)(x + 1) &nbsp;&nbsp;∴&nbsp; x = 8 &nbsp;of&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 8: &nbsp;8 ≥ −4, and &nbsp;√(24 + 12) = √36 = 6 &nbsp;while&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6 &nbsp;&nbsp;∴&nbsp; x = 8", af: "x = 8: &nbsp;8 ≥ −4, en &nbsp;√(24 + 12) = √36 = 6 &nbsp;terwyl&nbsp; x − 2 = 6. &nbsp;&nbsp;6 = 6 &nbsp;&nbsp;∴&nbsp; x = 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "x = −1: &nbsp;−1 ≥ −4, so it obeys (a) — but &nbsp;√(−3 + 12) = √9 = 3 &nbsp;while&nbsp; x − 2 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ −1 &nbsp;&nbsp;N.A.", af: "x = −1: &nbsp;−1 ≥ −4, so dit voldoen aan (a), maar &nbsp;√(−3 + 12) = √9 = 3 &nbsp;terwyl&nbsp; x − 2 = −3. &nbsp;&nbsp;3 ≠ −3 &nbsp;&nbsp;∴&nbsp; x ≠ −1 &nbsp;&nbsp;n.v.t." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: obeying the restriction is NOT the same as being a solution. The restriction from (a) only says the root exists at that x; it says nothing about whether the two sides are equal there. &nbsp;x = −1&nbsp; passes the first test and fails the second — which is exactly why the substitution check can never be skipped.", af: "ONTHOU: om aan die beperking te voldoen, is NIE dieselfde as om 'n oplossing te wees nie. Die beperking uit (a) sê net dat die wortel by daardie x bestaan; dit sê niks oor of die twee kante daar gelyk is nie. &nbsp;x = −1&nbsp; slaag die eerste toets en druip die tweede: dit is presies hoekom die vervangingstoets nooit oorgeslaan mag word nie.",
        } },
      ],
      esplain: {
        en: "Part (a) told you where the left-hand side even exists: from negative four upwards. That is useful, but it is only half the story, because the right-hand side has its own demand. A square root is never negative, so x minus two has to be zero or more, meaning x must be at least two. Negative one clears the first hurdle and trips over the second. Eight clears both. This is worth noticing because a lot of learners treat the restriction as the check and stop there. The restriction rules out the impossible; the substitution test is what proves an answer is genuine. On this question you need both, and both carry marks.", af: "Deel (a) het jou gesê waar die linkerkant selfs bestaan: van negatief vier af opwaarts. Dit is nuttig, maar dit is net die helfte van die storie, want die regterkant het sy eie eis. 'n Vierkantswortel is nooit negatief nie, so x minus twee moet nul of meer wees, wat beteken x moet minstens twee wees. Negatief een kom oor die eerste hekkie en struikel oor die tweede. Agt kom oor albei. Dit is die moeite werd om raak te sien, want baie leerders behandel die beperking as die toets en stop daar. Die beperking sluit die onmoontlike uit; die vervangingstoets is wat bewys dat 'n antwoord eg is. Op hierdie vraag het jy albei nodig, en albei dra punte.",
      },
    },
  ],
};

export const eqnSurdEquationsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
