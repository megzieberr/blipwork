/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "surd-proofs" (Surd "show that" & number tricks).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   A BRAND-NEW TILE. Six cards, none cut from an existing question.

   WHY THIS TILE EXISTS. Every surveyed Paper 1 has a surd item where
   the ANSWER is printed in the question and the marks are for the
   journey — "show that", "prove that", or a huge-number arithmetic
   trick that a calculator cannot help with. Two such items already
   live in the chapter (exp.fsm.t1q1(b) and exp.cr.q1(d)) but both sit
   on the rationalise tile, because rationalising is what they are
   really about. Nothing anywhere teaches the OTHER kinds: recognising
   a squared bracket hidden under a root, a difference of squares
   hidden inside eighteen-digit numbers, a proof in letters, comparing
   two surds without a calculator, or deciding whether a finished
   answer is rational.

   THE SIX:
     q1  the plain "show that" over a monomial surd, with both roads
         under OR;
     q2  √(11 + 6√2) = 3 + √2 — the middle term is what names the two
         pieces; the square-both-sides road rides under OR;
     q3  the big-number difference-of-squares trick (fresh numbers);
     q4  a proof in letters: (√a + √b)² − (√a − √b)² = 4√(ab);
     q5  which is bigger, 2√6 or 5 — compare the squares, with a
         reason;
     q6  simplify, then say whether the answer is rational, with a
         reason.

   METHOD: METHODS-algebra.md, hers verbatim — A16 a "show that" is
   worked from ONE side and never from the answer backwards; A8 prime
   factors and "tickets out"; A9 the surd laws and the BIG NO-NO;
   A10 difference of squares first, and a squared binomial keeping its
   middle term; F2 (her ruling) — √ used for simplifying carries no ±;
   F5 — where two roads are equally marked, both are shown, the second
   under OR.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block" and its "show that" items; SURVEY-Her-2025-Assessments.md
   Test 6 Q2 (the huge-number difference-of-squares trick) and Test 4
   Q1 ("show that … can be written as 2 + √2"); SURVEY-Nov-P1.md Q2(b)
   "prove a surd identity, two memo methods (OR) accepted". Every
   number here is fresh.

   LEVELS: parts run 1, 3, 3, 2, 2, 1 + 2 — two level 1, three level 2,
   two level 3. NOTHING here is level 4: this is a normal tile.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* A nine-digit number written with her thin-space thousands has to be
   ONE atom, or js/ui.js's formula line-breaker turns each group into its
   own inline-block and the phone splits the number across two lines
   (seen at 375 px on the first shoot, 2026-08-23). A pre-built
   .nowrap span is swallowed whole by the breaker — that is exactly the
   escape hatch its header documents. */
const N = s => `<span class="nowrap">${s}</span>`;
const A   = N("86&nbsp;420&nbsp;865");
const A3M = N("86&nbsp;420&nbsp;862");
const A3P = N("86&nbsp;420&nbsp;868");

/* ---------------------------------------------------------------
   q1 — show that (√18 + √2)/√2 = 4. Two roads, both hers.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.sp.q1",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "show-that-a-surd-fraction-equals-a-whole-number",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Show that &nbsp;(√18 + √2)/√2 = 4", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Toon aan dat &nbsp;(√18 + √2)/√2 = 4",
      },
      hint: {
        en: "Start on the left-hand side and drive it down to the 4 — never the other way round. Simplify √18 first and see how many lots of √2 you are really holding.", af: "Begin by die linkerkant en werk dit af tot by die 4, nooit andersom nie. Vereenvoudig eers √18 en kyk hoeveel keer √2 jy eintlik het.",
      },
      memo: [
        { type: "step", text: { en: "A “show that” is worked from ONE side only — start on the left and drive it down to what you were given.", af: "'n “Toon aan dat” word van net EEN kant af gewerk: begin links en werk dit af tot by wat gegee is." } },
        { type: "step", text: { en: "√18 = √(3² · 2) = 3√2 &nbsp;&nbsp;— the pair of 3s has a <b>ticket out</b>", af: "√18 = √(3² · 2) = 3√2 &nbsp;&nbsp;(die paar 3's het 'n <b>kaartjie uit</b>)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (3√2 + √2)/√2 = 4√2/√2 &nbsp;&nbsp;— three of them plus one of them is four of them", af: "= (3√2 + √2)/√2 = 4√2/√2 &nbsp;&nbsp;(drie van hulle plus een van hulle is vier van hulle)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 4 &nbsp;as required", af: "= 4 &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — split the fraction first (same marks): &nbsp;(√18 + √2)/√2 = √18/√2 + √2/√2 = √(18/2) + 1 = √9 + 1 = 3 + 1 = 4", af: "<b>OF</b>, breek die breuk eers op (dieselfde punte): &nbsp;(√18 + √2)/√2 = √18/√2 + √2/√2 = √(18/2) + 1 = √9 + 1 = 3 + 1 = 4" } },
        { type: "trap", text: {
          en: "WATCH OUT: do not start from the 4 and work backwards. A “show that” hands you the destination, so every mark is for the journey — starting at the answer assumes the very thing you were asked to prove.", af: "PASOP: moenie by die 4 begin en terugwerk nie. 'n “Toon aan dat” gee jou die bestemming, so elke punt is vir die reis: as jy by die antwoord begin, aanvaar jy juis wat jy moes bewys.",
        } },
      ],
      esplain: {
        en: "The reason this comes out so cleanly is that root eighteen and root two are helpings of the same thing. Eighteen is nine times two, the nine is a pair of threes, so a 3 walks out of the root and leaves a root two behind. Now the top reads three root two plus one root two, which is four root two, and dividing by root two leaves a plain 4. Keeping that invisible 1 in front of the second root two is her habit and it is worth copying — it turns the addition into ordinary counting instead of guesswork. The second road is just as good: a root divided by a root is the root of the division, so root eighteen over root two is root nine, which is 3. Same destination, different scenery.", af: "Dit kom so skoon uit omdat wortel agtien en wortel twee porsies van dieselfde ding is. Agtien is nege maal twee, die nege is 'n paar drieë, so 'n 3 stap uit die wortel en los 'n wortel twee agter. Nou staan daar bo drie wortel twee plus een wortel twee, wat vier wortel twee is, en deel deur wortel twee laat 'n gewone 4. Om daardie onsigbare 1 voor die tweede wortel twee te hou, is haar gewoonte en die moeite werd om na te doen: dit maak van die optelling gewone tel in plaas van raaiwerk. Die tweede pad is net so goed: 'n wortel gedeel deur 'n wortel is die wortel van die deling, so wortel agtien oor wortel twee is wortel nege, wat 3 is. Dieselfde bestemming, ander uitsig.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — show that √(11 + 6√2) = 3 + √2. The middle term names the
   pieces; squaring both sides rides under OR.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.sp.q2",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "show-that-a-nested-surd-is-a-simple-binomial",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;√(11 + 6√2) = 3 + √2", af: "<em>Sonder 'n sakrekenaar.</em><br>Toon aan dat &nbsp;√(11 + 6√2) = 3 + √2",
      },
      hint: {
        en: "The only way a root sign disappears is if what is underneath is a perfect square. Try to write 11 + 6√2 as a bracket squared — and let the middle term tell you what the two pieces inside that bracket are.", af: "'n Wortelteken verdwyn net as wat onder hom staan 'n volkome vierkant is. Probeer om 11 + 6√2 as 'n hakie in die kwadraat te skryf, en laat die middelterm vir jou sê wat die twee stukke in daardie hakie is.",
      },
      memo: [
        { type: "step", text: { en: "Work the left-hand side only. A root only cancels if what is underneath is something <b>squared</b>, so the job is to find that bracket.", af: "Werk net met die linkerkant. 'n Wortel kanselleer net as wat onder hom staan iets <b>in die kwadraat</b> is, so die taak is om daardie hakie te vind." } },
        { type: "step", text: { en: "In (p + q)² the middle term is 2pq. Here the middle term is 6√2 = 2 × 3 × √2, &nbsp;so the two pieces are 3 and √2.", af: "In (p + q)² is die middelterm 2pq. Hier is die middelterm 6√2 = 2 × 3 × √2, &nbsp;dus is die twee stukke 3 en √2." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Check the outside terms:<br>(3 + √2)² = 3² + 2(3)(√2) + (√2)² = 9 + 6√2 + 2 = 11 + 6√2", af: "Toets die buitenste terme:<br>(3 + √2)² = 3² + 2(3)(√2) + (√2)² = 9 + 6√2 + 2 = 11 + 6√2" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ √(11 + 6√2) = √((3 + √2)²)", af: "∴ √(11 + 6√2) = √((3 + √2)²)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 3 + √2 &nbsp;as required", af: "= 3 + √2 &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — square both sides (same marks): &nbsp;(3 + √2)² = 9 + 6√2 + 2 = 11 + 6√2, &nbsp;and both √(11 + 6√2) and 3 + √2 are positive, so the two must be equal.", af: "<b>OF</b>, kwadreer albei kante (dieselfde punte): &nbsp;(3 + √2)² = 9 + 6√2 + 2 = 11 + 6√2, &nbsp;en albei √(11 + 6√2) en 3 + √2 is positief, so die twee moet gelyk wees." } },
        { type: "trap", text: {
          en: "WATCH OUT: the MIDDLE term is what identifies the two pieces. In (p + q)² it is 2pq, so 6√2 must be 2 × p × q — with p = 3 and q = √2 it fits exactly. Guessing a bracket without checking the middle term is how this question goes wrong.", af: "PASOP: die MIDDELTERM wys vir jou die twee stukke. In (p + q)² is dit 2pq, so 6√2 moet 2 × p × q wees: met p = 3 en q = √2 pas dit presies. As jy 'n hakie raai sonder om die middelterm te toets, gaan hierdie vraag verkeerd.",
        } },
      ],
      esplain: {
        en: "A root inside a root looks frightening and it is really a puzzle with one clue. The only way a square root sign can vanish is if what sits underneath is a perfect square, so the question is secretly asking: what bracket, when squared, gives eleven plus six root two? Squaring a bracket gives three pieces — first squared, twice first times second, second squared — and the middle piece is the giveaway. Six root two has to be two times something times something, and the only sensible split is 2 times 3 times root two. Test it: 3 squared is 9, root two squared is 2, and 9 plus 2 is the 11 you needed. The bracket fits, the root cancels it, and the proof is finished. Note there is no plus-or-minus anywhere: you are simplifying, not solving.", af: "'n Wortel binne 'n wortel lyk skrikwekkend, maar dit is eintlik 'n raaisel met een leidraad. 'n Vierkantswortelteken kan net verdwyn as wat onder hom staan 'n volkome vierkant is, so die vraag vra eintlik: watter hakie gee, as jy dit kwadreer, elf plus ses wortel twee? 'n Hakie in die kwadraat gee drie stukke (eerste kwadraat, twee keer eerste maal tweede, tweede kwadraat) en die middelste stuk verklap alles. Ses wortel twee moet twee maal iets maal iets wees, en die enigste sinvolle verdeling is 2 maal 3 maal wortel twee. Toets dit: 3 kwadraat is 9, wortel twee kwadraat is 2, en 9 plus 2 is die 11 wat jy nodig gehad het. Die hakie pas, die wortel kanselleer dit, en die bewys is klaar. Let op, daar is nêrens 'n plus-of-minus nie: jy vereenvoudig, jy los nie op nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — the big-number difference-of-squares trick. Fresh numbers.
   a = 86 420 865; a² − (a − 3)(a + 3) = 9.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.sib.sp.q3",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "huge-number-difference-of-squares-shortcut",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;" + N("86&nbsp;420&nbsp;865²") + " − " + A3M + " × " + A3P + " = 9", af: `<em>Sonder 'n sakrekenaar.</em><br>Toon aan dat &nbsp;${N("86&nbsp;420&nbsp;865²")} − ${A3M} × ${A3P} = 9`,
      },
      hint: {
        en: "Nobody is expected to multiply those out. Look at how far the second and third numbers sit from the first one, give the first one a letter, and write the other two in terms of it.", af: "Niemand verwag dat jy dit uitvermenigvuldig nie. Kyk hoe ver die tweede en derde getalle van die eerste een af is, gee die eerste een 'n letter, en skryf die ander twee in terme daarvan.",
      },
      memo: [
        { type: "step", text: { en: "Never multiply these out. Give the middle-sized number a name: &nbsp;let a = " + A + ".", af: `Moet dit nooit uitvermenigvuldig nie. Gee die middelste getal (in grootte) 'n naam: &nbsp;stel a = ${A}.` }, ticks: ["s/f"] },
        { type: "step", text: { en: "Each of the other two sits 3 away from it:<br>a − 3 = " + A3M + " &nbsp;and&nbsp; a + 3 = " + A3P, af: `Elk van die ander twee lê 3 daarvandaan:<br>a − 3 = ${A3M} &nbsp;en&nbsp; a + 3 = ${A3P}` }, ticks: ["ca"] },
        { type: "step", text: { en: "So the expression is &nbsp;a² − (a − 3)(a + 3), &nbsp;and (a − 3)(a + 3) is a <b>diff in □'s</b> = a² − 9.", af: "Die uitdrukking is dus &nbsp;a² − (a − 3)(a + 3), &nbsp;en (a − 3)(a + 3) is 'n <b>verskil van □'e</b> = a² − 9." }, ticks: ["ca"] },
        { type: "answer", text: { en: "= a² − (a² − 9) = a² − a² + 9 = 9 &nbsp;as required", af: "= a² − (a² − 9) = a² − a² + 9 = 9 &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the bracket reaches BOTH terms — a² − (a² − 9) is a² − a² + 9, not a² − a² − 9. And if any of those huge numbers is still on your page at the end, something has gone wrong: every one of them is supposed to cancel.", af: "PASOP: die minus voor die hakie raak AL TWEE terme: a² − (a² − 9) is a² − a² + 9, nie a² − a² − 9 nie. En as enige van daardie groot getalle aan die einde nog op jou bladsy staan, het iets verkeerd geloop: elkeen moet kanselleer.",
        } },
      ],
      esplain: {
        en: "This is a question about noticing, not about arithmetic. The three numbers are almost the same, and the moment you spot that the second is three less and the third is three more than the first, the whole thing turns into a piece of algebra you already know. Call the middle one a. Then you are asked for a squared take away a minus three times a plus three — and that product is the difference of two squares, so it is a squared minus nine. Subtracting it means subtracting a squared and adding nine back, the two a squareds annihilate each other, and a plain 9 is all that survives. The 9 is not a coincidence either: it is the gap of 3 squared, so the same trick with a gap of 1 would leave 1, and a gap of 2 would leave 4.", af: "Hierdie vraag gaan oor raaksien, nie oor rekenwerk nie. Die drie getalle is amper dieselfde, en sodra jy sien dat die tweede drie minder en die derde drie meer as die eerste is, word die hele ding 'n stukkie algebra wat jy reeds ken. Noem die middelste een a. Dan word a kwadraat min a minus drie maal a plus drie gevra, en daardie produk is die verskil van twee vierkante, dus a kwadraat minus nege. Om dit af te trek, beteken jy trek a kwadraat af en tel nege terug, die twee a-kwadrate vee mekaar uit, en net 'n gewone 9 bly oor. Die 9 is ook nie toevallig nie: dit is die gaping van 3 in die kwadraat, so dieselfde truuk met 'n gaping van 1 laat 1 oor, en 'n gaping van 2 laat 4 oor.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — a proof in letters:
   (√a + √b)² − (√a − √b)² = 4√(ab).
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.sib.sp.q4",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "prove-a-surd-identity-in-letters-two-squared-binomials",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Prove that, for a ≥ 0 and b ≥ 0: &nbsp;(√a + √b)² − (√a − √b)² = 4√(ab)", af: "<em>Sonder 'n sakrekenaar.</em><br>Bewys dat, vir a ≥ 0 en b ≥ 0: &nbsp;(√a + √b)² − (√a − √b)² = 4√(ab)",
      },
      hint: {
        en: "Work the left-hand side only. Both brackets are squared, so both keep a middle term — write each one out in three pieces before you subtract anything.", af: "Werk net met die linkerkant. Albei hakies is in die kwadraat, so albei hou 'n middelterm: skryf elkeen in drie stukke uit voor jy iets aftrek.",
      },
      memo: [
        { type: "step", text: { en: "Work the left-hand side only. Each bracket is a squared binomial, so each one <b>keeps its middle term</b>.", af: "Werk net met die linkerkant. Elke hakie is 'n tweeterm in die kwadraat, so elkeen <b>hou sy middelterm</b>." } },
        { type: "step", text: { en: "(√a + √b)² = a + 2√(ab) + b", af: "(√a + √b)² = a + 2√(ab) + b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(√a − √b)² = a − 2√(ab) + b", af: "(√a − √b)² = a − 2√(ab) + b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Subtract, and mind the bracket: &nbsp;(a + 2√(ab) + b) − (a − 2√(ab) + b) = a + 2√(ab) + b − a + 2√(ab) − b", af: "Trek af, en pas op vir die hakie: &nbsp;(a + 2√(ab) + b) − (a − 2√(ab) + b) = a + 2√(ab) + b − a + 2√(ab) − b" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 4√(ab) &nbsp;as required", af: "= 4√(ab) &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: √a × √b = √(ab) — multiplying two roots of the same kind IS allowed, and it is where the √(ab) comes from. Adding them is the BIG NO-NO: √a + √b is never √(a + b).", af: "ONTHOU: √a × √b = √(ab). Jy MAG twee wortels van dieselfde soort vermenigvuldig, en dit is waar die √(ab) vandaan kom. Om hulle op te tel is die GROOT NEE-NEE: √a + √b is nooit √(a + b) nie.",
        } },
      ],
      esplain: {
        en: "A proof in letters feels harder than one in numbers and it is usually easier, because there is nothing to work out — only to expand carefully. Both brackets are squared, so both give three pieces, and the outside pieces are identical: a and b in each. Only the middle piece differs, plus two root ab in the first and minus two root ab in the second. Subtracting the second bracket flips every sign inside it, so the a and the b cancel out and the two middle terms, instead of cancelling, add together into four root ab. The one law doing real work is that a root times a root is the root of the product. And notice why the question says a and b must not be negative: without that, the roots would not be real numbers at all.", af: "'n Bewys met letters voel moeiliker as een met getalle, maar is gewoonlik makliker, want daar is niks om uit te werk nie, net versigtig uit te brei. Albei hakies is in die kwadraat, so albei gee drie stukke, en die buitenste stukke is identies: a en b in elkeen. Net die middelste stuk verskil, plus twee wortel ab in die eerste en minus twee wortel ab in die tweede. Om die tweede hakie af te trek, draai elke teken daarin om, so die a en die b kanselleer, en die twee middelterme kanselleer nie, maar tel saam tot vier wortel ab. Die een wet wat die regte werk doen, is dat 'n wortel maal 'n wortel die wortel van die produk is. En let op hoekom die vraag sê a en b mag nie negatief wees nie: daarsonder sou die wortels glad nie reële getalle wees nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — which is bigger, 2√6 or 5? Compare the squares, with a reason.
   --------------------------------------------------------------- */
const q5 = {
  id: "exp.sib.sp.q5",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "compare-a-surd-with-a-whole-number-without-a-calculator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Decide which of &nbsp;2√6&nbsp; and &nbsp;5&nbsp; is the bigger number, and give a full reason for your answer.", af: "<em>Sonder 'n sakrekenaar.</em><br>Besluit watter van &nbsp;2√6&nbsp; en &nbsp;5&nbsp; die groter getal is, en gee 'n volledige rede vir jou antwoord.",
      },
      hint: {
        en: "You cannot compare a surd with a whole number by looking at them. Both of these are positive, so squaring them will not change which one is bigger — and squares are easy to compare.", af: "Jy kan nie 'n wortelvorm en 'n heelgetal vergelyk deur net na hulle te kyk nie. Albei is positief, so om hulle te kwadreer verander nie watter een groter is nie, en kwadrate is maklik om te vergelyk.",
      },
      memo: [
        { type: "step", text: { en: "Both numbers are positive, so comparing them is the same as comparing their <b>squares</b>.", af: "Albei getalle is positief, so om hulle te vergelyk is dieselfde as om hul <b>kwadrate</b> te vergelyk." }, ticks: ["s/f"] },
        { type: "step", text: { en: "(2√6)² = 2² × (√6)² = 4 × 6 = 24 &nbsp;&nbsp;and&nbsp;&nbsp; 5² = 25", af: "(2√6)² = 2² × (√6)² = 4 × 6 = 24 &nbsp;&nbsp;en&nbsp;&nbsp; 5² = 25" }, ticks: ["ca"] },
        { type: "answer", text: { en: "24 &lt; 25 &nbsp;&nbsp;∴ 2√6 &lt; 5, &nbsp;so <b>5 is the bigger number</b>.", af: "24 &lt; 25 &nbsp;&nbsp;∴ 2√6 &lt; 5, &nbsp;dus is <b>5 die groter getal</b>." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2√6)² is 4 × 6 = 24, not 2 × 6 = 12 — the coefficient gets squared too. And the squaring shortcut only works <i>because</i> both numbers are positive: squaring would swap the order round if one of them were negative.", af: "PASOP: (2√6)² is 4 × 6 = 24, nie 2 × 6 = 12 nie: die koëffisiënt word ook gekwadreer. En die kwadreer-kortpad werk net <i>omdat</i> albei getalle positief is: as een van hulle negatief was, sou kwadreer die volgorde omruil.",
        } },
      ],
      esplain: {
        en: "Two root six is somewhere around four point nine, but you are not allowed a calculator and estimating is not a reason. The proper move is to square both numbers. Squaring keeps positive numbers in the same order — if one positive number is bigger than another, its square is bigger too — so whichever square is bigger belongs to the bigger number. Two root six squared means squaring the 2 as well as the root, giving four times six, which is twenty-four. Five squared is twenty-five. Twenty-five wins by a single unit, so five is the bigger number, and the two are astonishingly close. The full reason has three parts and a marker wants all three: both are positive, so compare squares; here are the squares; therefore this one is bigger.", af: "Twee wortel ses is iewers rondom vier komma nege, maar jy mag nie 'n sakrekenaar gebruik nie, en 'n skatting is nie 'n rede nie. Die regte stap is om albei getalle te kwadreer. Kwadreer hou positiewe getalle in dieselfde volgorde (as een positiewe getal groter as 'n ander is, is sy kwadraat ook groter), so die groter kwadraat behoort aan die groter getal. Twee wortel ses kwadraat beteken jy kwadreer die 2 sowel as die wortel, wat vier maal ses gee, en dit is vier-en-twintig. Vyf kwadraat is vyf-en-twintig. Vyf-en-twintig wen met net een eenheid, so vyf is die groter getal, en die twee is verbasend naby aan mekaar. Die volledige rede het drie dele en 'n nasiener wil al drie hê: albei is positief, so vergelyk kwadrate; hier is die kwadrate; dus is hierdie een groter.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — simplify, then rational or irrational, with a reason.
   (√12 + √27)/√3 = 5, and 5 is rational.
   Two DEPENDENT parts, so they stay on one card.
   --------------------------------------------------------------- */
const q6 = {
  id: "exp.sib.sp.q6",
  chapter: CH,
  topic: "surd-proofs",
  archetype: "simplify-a-surd-expression-then-classify-the-answer",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(√12 + √27)/√3", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;(√12 + √27)/√3",
      },
      hint: {
        en: "Prime factors first for both roots on top. Once they are lots of the same √, add them the way you would add 2x and 3x — and then see what the bottom does.", af: "Eers priemfaktore vir albei wortels bo. Sodra hulle veelvoude van dieselfde √ is, tel hulle op soos jy 2x en 3x sou optel, en kyk dan wat die noemer doen.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first, then look for the factors with <b>tickets out</b>.", af: "Eers priemfaktore, soek dan die faktore met <b>kaartjies uit</b>." } },
        { type: "step", text: { en: "√12 = √(2² · 3) = 2√3 &nbsp;&nbsp;and&nbsp;&nbsp; √27 = √(3³) = 3√3", af: "√12 = √(2² · 3) = 2√3 &nbsp;&nbsp;en&nbsp;&nbsp; √27 = √(3³) = 3√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (2√3 + 3√3)/√3 = 5√3/√3 &nbsp;&nbsp;— two of them plus three of them is five of them", af: "= (2√3 + 3√3)/√3 = 5√3/√3 &nbsp;&nbsp;(twee van hulle plus drie van hulle is vyf van hulle)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 5", af: "= 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Twelve and twenty-seven look unrelated until you take them apart. Twelve is four times three, and the four is a pair of 2s, so a 2 walks out and a root three stays. Twenty-seven is three cubed, which is a pair of 3s and a spare, so a 3 walks out and again a root three stays. Both terms are now lots of root three, so adding them is counting — two plus three is five. Then five root three divided by root three leaves a plain 5, because the roots cancel each other exactly. That vanishing act is the whole point of the question: an expression can be stuffed with surds and still have a perfectly ordinary number as its answer.", af: "Twaalf en sewe-en-twintig lyk onverwant totdat jy hulle uitmekaar haal. Twaalf is vier maal drie, en die vier is 'n paar 2's, so 'n 2 stap uit en 'n wortel drie bly. Sewe-en-twintig is drie tot die derde mag, wat 'n paar 3's en 'n ekstra een is, so 'n 3 stap uit en weer bly 'n wortel drie. Albei terme is nou veelvoude van wortel drie, so optel is net tel: twee plus drie is vyf. Dan laat vyf wortel drie gedeel deur wortel drie 'n gewone 5, want die wortels kanselleer mekaar presies. Daardie verdwyntoer is die hele punt van die vraag: 'n uitdrukking kan vol wortelvorme wees en tog 'n heel gewone getal as antwoord hê.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 2,
      prompt: {
        en: "Is your answer to (a) rational or irrational? Give a reason.", af: "Is jou antwoord op (a) rasionaal of irrasionaal? Gee 'n rede.",
      },
      hint: {
        en: "A number is rational if it can be written as one whole number over another. Look at what you actually ended up with, not at what the question started with.", af: "'n Getal is rasionaal as dit as een heelgetal oor 'n ander geskryf kan word. Kyk na wat jy uiteindelik gekry het, nie na waarmee die vraag begin het nie.",
      },
      memo: [
        { type: "answer", text: { en: "<b>Rational</b>, because it can be written as one whole number over another: &nbsp;5 = 5/1.", af: "<b>Rasionaal</b>, want dit kan as een heelgetal oor 'n ander geskryf word: &nbsp;5 = 5/1." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: surds in the working do not make the answer irrational. Here the √3 cancelled out completely, so what is left is an ordinary whole number — and every whole number is rational.", af: "ONTHOU: wortelvorme in die bewerking maak nie die antwoord irrasionaal nie. Hier het die √3 heeltemal gekanselleer, so wat oorbly is 'n gewone heelgetal, en elke heelgetal is rasionaal.",
        } },
      ],
      esplain: {
        en: "Rational means ratio: a number you can write as one whole number divided by another. Five is five over one, so it qualifies, and so does every whole number, every fraction and every decimal that stops or repeats. Irrational means you cannot do that, and root three is the classic example — its decimal runs on forever without ever repeating. The trap in this part is judging the answer by the question. The expression you started with was full of surds, but they cancelled out completely, and what matters is the number you finished with. Always look at the final line before you decide.", af: "Rasionaal kom van ratio, 'n verhouding: 'n getal wat jy as een heelgetal gedeel deur 'n ander kan skryf. Vyf is vyf oor een, so dit kwalifiseer, en so ook elke heelgetal, elke breuk en elke desimale getal wat ophou of herhaal. Irrasionaal beteken jy kan dit nie doen nie, en wortel drie is die klassieke voorbeeld: sy desimale loop vir altyd aan sonder om ooit te herhaal. Die slaggat in hierdie deel is om die antwoord aan die vraag te meet. Die uitdrukking waarmee jy begin het, was vol wortelvorme, maar hulle het heeltemal gekanselleer, en wat tel, is die getal waarmee jy klaargemaak het. Kyk altyd na die laaste reël voor jy besluit.",
      },
    },
  ],
};

export const expSurdProofsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
