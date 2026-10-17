/* ============================================================
   EXAM FOCUS — Exponents & Surds · THE LEVEL 4 TILE
   "Level 4 ★ — the brave round".
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map and her ruling 5, sessions/B-exp.md.)
   ------------------------------------------------------------
   HER RULING 5, in one sentence: levels 1–3 live on the normal tiles,
   and every chapter's last tile holds the ★ questions, so a learner
   drilling basics never turns a card and finds one. Every card here
   therefore carries at least one level-4 part, and no part below
   level 3 — a lead-in part is only allowed when the ★ part genuinely
   depends on it (q2, q5 and q6 are the three that do).

   A SEVENTH card lives on this tile without living in this file:
   exp.nss.q1(d) — 4ˣ − 3·2ˣ − 4 = 0, the ★ part that used to sit on
   the exponential-equations tile. It MOVES here (see js/exam/
   cards-exp.js), which is what let "exp" come off verify-exam.html
   Part 13's L4_MOVE_PENDING list.

   THE SIX BUILT HERE, and what makes each one level 4 — in every case
   the needed fact is NOT written in the question:
     q1  4^(x+1) − 9·2ˣ + 2 = 0 — divorce the 4^(x+1) AND spot that
         4ˣ = (2ˣ)², then the k-method, and BOTH branches survive
         (one of them a fraction, giving a negative x);
     q2  reading √(x − 2)/(x − 5) for undefined / zero / real — two
         conditions that have to hold at once, and the excluded value
         sits INSIDE the allowed interval, so it must be thrown out
         by hand;
     q3  √(2ˣ + 5) = 2ˣ − 1 — a surd equation and an exponential
         equation in the same question, with a dead branch and a
         compulsory test in the original;
     q4  "show that 2^(n+2) + 2ⁿ is divisible by 5 for every natural
         n" — a proof, where the last sentence is a mark on its own;
     q5  a root inside a root, then the same expression with a
         NEGATIVE base — even root non-real, odd root fine;
     q6  x^(2/3) = 25 — the ± that comes from an even numerator, both
         roots checked, and then the same equation with a negative
         right-hand side, which has no solution.

   METHOD: METHODS-algebra.md, hers verbatim — A3 divorce, A4 the
   common factor, A13 the k-method and its two-column walk back, A12
   "a positive base cannot have a negative answer", A14 the reciprocal
   power and her "Important Notes" box on where the ± goes, A15 "ALWAYS
   test both answers!!", A16 a "show that" from one side, A7's
   negatives box, B10 undefined / zero / real, and §0.3 her four
   "no answer" words. F1 (her ruling): 2ˣ = −1 is NO SOLUTION, never
   "undefined". F5 (her ruling): both roads shown, the second under OR.

   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* A pre-built stacked fraction — the only safe way to write a rational
   exponent (fracHtml leaves a pre-built .sfrac alone). */
const F = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
const RX = (n, d) => `<sup>${F(n, d)}</sup>`;

/* ---------------------------------------------------------------
   q1 — 4^(x+1) − 9·2ˣ + 2 = 0.  x = −2 or x = 1.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "exponential-quadratic-needing-a-divorce-before-the-k-method",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Solve for x: &nbsp;4<sup>x+1</sup> − 9 · 2<sup>x</sup> + 2 = 0", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Los op vir x: &nbsp;4<sup>x+1</sup> − 9 · 2<sup>x</sup> + 2 = 0",
      },
      hint: {
        en: "Nothing in the question says the two bases are related — that is the bit you have to fetch. Split the first term so the exponent is a plain x, write it in base 2, and then look for the quadratic hiding underneath.", af: "Die vraag sê nêrens dat die twee grondtalle verband hou nie: dit is die stukkie wat jy self moet gaan haal. Skei die eerste term sodat die eksponent net x is, skryf dit met grondtal 2, en soek dan die kwadratiese vergelyking wat daaronder wegkruip.",
      },
      memo: [
        { type: "step", text: { en: "<b>Divorce</b> the first term so its exponent is a plain x, then write it in base 2: &nbsp;4<sup>x+1</sup> = 4 · 4<sup>x</sup> = 4 · (2²)<sup>x</sup> = 4 · (2<sup>x</sup>)²", af: "<b>Skei</b> die eerste term sodat sy eksponent net x is, en skryf dit dan met grondtal 2: &nbsp;4<sup>x+1</sup> = 4 · 4<sup>x</sup> = 4 · (2²)<sup>x</sup> = 4 · (2<sup>x</sup>)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "let K = 2<sup>x</sup> &nbsp;&nbsp;(then K² = (2<sup>x</sup>)²) &nbsp;⟹&nbsp; 4K² − 9K + 2 = 0", af: "stel K = 2<sup>x</sup> &nbsp;&nbsp;(dan is K² = (2<sup>x</sup>)²) &nbsp;⟹&nbsp; 4K² − 9K + 2 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(4K − 1)(K − 2) = 0 &nbsp;&nbsp;∴ K = 1/4 &nbsp;or&nbsp; K = 2", af: "(4K − 1)(K − 2) = 0 &nbsp;&nbsp;∴ K = 1/4 &nbsp;of&nbsp; K = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 1/4 = 2⁻² &nbsp;&nbsp;∴ x = −2", af: "2<sup>x</sup> = 1/4 = 2⁻² &nbsp;&nbsp;∴ x = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 2¹ &nbsp;&nbsp;∴ x = 1", af: "2<sup>x</sup> = 2¹ &nbsp;&nbsp;∴ x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: K is not the answer. <b>Both</b> branches survive here — a positive base reaches 1/4 quite happily, because a fraction is still positive — so both have to be walked back through 2<sup>x</sup> = K. Stopping at K = 1/4 and K = 2 throws away two marks.", af: "ONTHOU: K is nie die antwoord nie. <b>Albei</b> gevalle oorleef hier ('n positiewe grondtal bereik 1/4 sonder moeite, want 'n breuk is steeds positief), dus moet jy albei terugvervang in 2<sup>x</sup> = K. As jy by K = 1/4 en K = 2 stop, gooi jy twee punte weg.",
        } },
      ],
      esplain: {
        en: "Two hidden facts have to be fetched before this looks like anything you have solved before, and neither is written down for you. The first is that the exponent on the 4 is not a plain x, so the term has to be divorced: 4 to the x plus one is 4 times 4 to the x. The second is that 4 is 2 squared, so 4 to the x is 2 to the x, squared. Once both of those are in place the equation holds one thing and its square, which is the shape of a quadratic, and naming that thing K makes it visible. Factorise, and then walk every branch back — that is where the marks live. This time neither branch dies, because a quarter is a perfectly reachable value for a power of 2: you just have to feed it a negative exponent.", af: "Jy moet twee versteekte feite self gaan haal voordat dit soos iets lyk wat jy al voorheen opgelos het, en nie een word vir jou neergeskryf nie. Die eerste is dat die eksponent op die 4 nie net x is nie, dus moet die term geskei word: 4 tot die mag x plus een is 4 maal 4 tot die mag x. Die tweede is dat 4 gelyk is aan 2 kwadraat, dus is 4 tot die mag x gelyk aan 2 tot die mag x, gekwadreer. Sodra albei op hul plek is, bevat die vergelyking een ding en sy kwadraat, wat die vorm van 'n kwadratiese vergelyking is, en as jy daardie ding K noem, sien jy dit raak. Faktoriseer, en vervang dan elke geval terug: dit is waar die punte lê. Hierdie keer sterf geen geval nie, want 'n kwart is 'n heeltemal bereikbare waarde vir 'n mag van 2: jy moet dit net 'n negatiewe eksponent gee.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — reading an expression: undefined / zero / real.
   √(x − 2)/(x − 5). Her B10 layout.
   Part (a) carries the expression, like every other stem in the bank;
   (b) and (c) refer back to it, so nothing is said twice and the card
   needs no intro (verify-exam.html Part 12 rule 6: a card whose first
   part carries the stem must NOT have one).
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "undefined-zero-and-real-for-a-surd-over-a-linear-denominator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Consider the expression &nbsp;√(x − 2)/(x − 5).<br><br>For which value(s) of x is the expression <b>undefined</b>?", af: "<em>Sonder 'n sakrekenaar.</em><br>Beskou die uitdrukking &nbsp;√(x − 2)/(x − 5).<br><br>Vir watter waarde(s) van x is die uitdrukking <b>onbepaald</b>?",
      },
      hint: {
        en: "Undefined has one meaning and one meaning only in this chapter. Ask what a fraction is never allowed to have underneath it.", af: "Onbepaald het in hierdie hoofstuk net een betekenis, en net een. Vra jouself af wat 'n breuk nooit onder mag hê nie.",
      },
      memo: [
        { type: "step", text: { en: "<b>Undefined</b> means a denominator of zero — nothing else.", af: "<b>Onbepaald</b> beteken 'n noemer van nul, niks anders nie." } },
        { type: "step", text: { en: "x − 5 = 0", af: "x − 5 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ x = 5", af: "∴ x = 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Her four no-answer words each have exactly one job, and undefined is the one reserved for dividing by zero. So this part is not asking you to look at the root at all — it is asking which value of x makes the bottom of the fraction disappear. Set the denominator equal to zero and solve, and x equals five falls straight out. Writing non-real here would be wrong even though there is a root in the question, because non-real belongs to a negative under an even root, which is a different failure altogether. Getting the word right is half of what this kind of question is testing.", af: "Haar vier geen-antwoord-woorde het elk presies een taak, en onbepaald is die een wat vir deling deur nul gereserveer is. Hierdie deel vra jou dus glad nie om na die wortel te kyk nie: dit vra watter waarde van x die onderste deel van die breuk laat verdwyn. Stel die noemer gelyk aan nul en los op, en x is gelyk aan vyf val dadelik uit. Om nie-reëel hier te skryf, sou verkeerd wees, al is daar 'n wortel in die vraag, want nie-reëel hoort by 'n negatief onder 'n ewe wortel, en dit is heeltemal 'n ander soort mislukking. Om die regte woord te kies, is die helfte van wat hierdie soort vraag toets.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "For which value(s) of x is the expression equal to <b>zero</b>?", af: "Vir watter waarde(s) van x is die uitdrukking gelyk aan <b>nul</b>?",
      },
      hint: {
        en: "A fraction is zero exactly when its top is zero — the bottom can never make it zero, only break it. So set the numerator to zero, then check the value you get is actually allowed.", af: "'n Breuk is presies nul wanneer die boonste deel nul is: die onderste deel kan dit nooit nul maak nie, net breek. Stel dus die teller gelyk aan nul, en kyk dan of die waarde wat jy kry wel toegelaat word.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is zero when its <b>numerator</b> is zero (and the denominator is not).", af: "'n Breuk is nul wanneer sy <b>teller</b> nul is (en die noemer nie)." } },
        { type: "step", text: { en: "√(x − 2) = 0 &nbsp;⟹&nbsp; x − 2 = 0", af: "√(x − 2) = 0 &nbsp;⟹&nbsp; x − 2 = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ x = 2 &nbsp;&nbsp;— and x = 2 does not make the denominator zero, so it is allowed.", af: "∴ x = 2 &nbsp;&nbsp;en x = 2 maak nie die noemer nul nie, dus word dit toegelaat." }, ticks: ["a"] },
      ],
      esplain: {
        en: "Think about what a fraction is: a top divided by a bottom. The only way that can come out as zero is if the top itself is zero, because dividing zero by anything at all still gives zero. So the whole part is about the numerator, and a square root is zero exactly when what is underneath it is zero. That gives x equals two. The last sentence is not optional though — you always check that the value you found does not also break the denominator, because a value that makes the top AND the bottom zero gives you nothing at all. Here two and five are different numbers, so it is safe.", af: "Dink oor wat 'n breuk is: iets bo, gedeel deur iets onder. Die enigste manier waarop dit nul kan wees, is as die boonste deel self nul is, want nul gedeel deur enigiets gee steeds nul. Hierdie hele deel gaan dus oor die teller, en 'n vierkantswortel is presies nul wanneer dit wat onder die wortel staan, nul is. Dit gee x is gelyk aan twee. Die laaste sin is egter nie opsioneel nie: kyk altyd of die waarde wat jy gekry het nie ook die noemer breek nie, want 'n waarde wat bo EN onder nul maak, gee jou glad niks nie. Hier is twee en vyf verskillende getalle, dus is dit veilig.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 4,
      prompt: {
        en: "For which values of x is the expression <b>real</b>?", af: "Vir watter waardes van x is die uitdrukking <b>reëel</b>?",
      },
      hint: {
        en: "Two separate things have to be true at the same time here, and each one comes from a different part of the expression. Write both down before you write an answer — and then check whether they overlap.", af: "Twee aparte dinge moet hier gelyktydig waar wees, en elkeen kom uit 'n ander deel van die uitdrukking. Skryf albei neer voordat jy 'n antwoord skryf, en kyk dan of hulle oorvleuel.",
      },
      memo: [
        { type: "step", text: { en: "Two conditions must hold <b>at the same time</b>, and missing either one is what makes this the ★ part.", af: "Twee voorwaardes moet <b>gelyktydig</b> geld, en om een van hulle te mis, is wat dit die ★-deel maak." } },
        { type: "step", text: { en: "You may not have a negative under an even root: &nbsp;x − 2 ≥ 0 &nbsp;&nbsp;∴ x ≥ 2", af: "Jy mag nie 'n negatief onder 'n ewe wortel hê nie: &nbsp;x − 2 ≥ 0 &nbsp;&nbsp;∴ x ≥ 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "And it must still be defined, so the denominator may not be zero: &nbsp;x ≠ 5 &nbsp;— and 5 IS inside x ≥ 2, so it has to be thrown out by hand.", af: "En dit moet steeds bepaald wees, dus mag die noemer nie nul wees nie: &nbsp;x ≠ 5. &nbsp;En 5 LÊ binne x ≥ 2, dus moet jy dit self uitgooi." }, ticks: ["ca"] },
        { type: "answer", text: { en: "x ≥ 2 ; &nbsp;x ≠ 5", af: "x ≥ 2 ; &nbsp;x ≠ 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: know which word does which job. <b>Non-real</b> is an even root of a negative; <b>undefined</b> is dividing by zero. This part needs BOTH handled at once, and the excluded value rides after a semicolon — x ≥ 2 ; x ≠ 5, never just x ≥ 2.", af: "PASOP: weet watter woord watter taak het. <b>Nie-reëel</b> is 'n ewe wortel van 'n negatief; <b>onbepaald</b> is deling deur nul. Hierdie deel moet ALBEI gelyktydig hanteer, en die uitgesluite waarde kom ná 'n kommapunt: x ≥ 2 ; x ≠ 5, nooit net x ≥ 2 nie.",
        } },
      ],
      esplain: {
        en: "The word real is doing two jobs at once, and that is exactly why this one is starred. For the expression to be a real number, the root has to be real, which needs whatever is under it to be zero or positive, giving x greater than or equal to two. But it also has to exist at all, which needs the bottom not to be zero, giving x not equal to five. Now look carefully at how those two sit together. Five is bigger than two, so it is sitting right inside the interval you just found — the second condition does not come free, it has to be written down separately and punched out of the answer. Her house style puts that restriction after a semicolon, and a marker looks for it.", af: "Die woord reëel doen twee take tegelyk, en dit is presies hoekom hierdie een 'n ster het. Sodat die uitdrukking 'n reële getal kan wees, moet die wortel reëel wees, en daarvoor moet dit wat onder die wortel staan, nul of positief wees: dit gee x groter as of gelyk aan twee. Maar dit moet ook in die eerste plek bestaan, en daarvoor mag die onderste deel nie nul wees nie: dit gee x nie gelyk aan vyf nie. Kyk nou mooi hoe daardie twee saam sit. Vyf is groter as twee, dus lê dit reg binne die interval wat jy pas gevind het: die tweede voorwaarde kom nie verniet nie, dit moet apart neergeskryf en uit die antwoord gehaal word. Haar huisstyl sit daardie beperking ná 'n kommapunt, en 'n nasiener soek daarna.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — a surd equation wrapped around an exponential:
   √(2ˣ + 5) = 2ˣ − 1.  x = 2.
   --------------------------------------------------------------- */
const q3 = {
  id: "exp.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "surd-equation-in-disguise-with-an-exponential-inside",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es8" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;√(2<sup>x</sup> + 5) = 2<sup>x</sup> − 1", af: "<em>Sonder 'n sakrekenaar.</em><br>Los op vir x: &nbsp;√(2<sup>x</sup> + 5) = 2<sup>x</sup> − 1",
      },
      hint: {
        en: "The x is stuck in an exponent AND under a root, which is two problems at once — so get rid of one of them. Give 2<sup>x</sup> a short name and read the equation again; you will recognise what is left.", af: "Die x sit vas in 'n eksponent EN onder 'n wortel, en dit is twee probleme tegelyk: raak dus van een ontslae. Gee 2<sup>x</sup> 'n kort naam en lees die vergelyking weer; jy sal herken wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "The x is in an exponent and under a root, so name the exponential first: &nbsp;let K = 2<sup>x</sup>. &nbsp;⟹&nbsp; √(K + 5) = K − 1", af: "Die x is in 'n eksponent en onder 'n wortel, dus gee eers die eksponensiële term 'n naam: &nbsp;stel K = 2<sup>x</sup>. &nbsp;⟹&nbsp; √(K + 5) = K − 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The root is already alone on one side, so square both sides — brackets on both: &nbsp;(√(K + 5))² = (K − 1)²", af: "Die wortel staan reeds alleen aan een kant, dus kwadreer albei kante, met hakies om albei: &nbsp;(√(K + 5))² = (K − 1)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "K + 5 = K² − 2K + 1 &nbsp;⟹&nbsp; 0 = K² − 3K − 4 = (K − 4)(K + 1)", af: "K + 5 = K² − 2K + 1 &nbsp;⟹&nbsp; 0 = K² − 3K − 4 = (K − 4)(K + 1)" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ K = 4 &nbsp;or&nbsp; K = −1. &nbsp;&nbsp;2<sup>x</sup> ≠ −1, because a positive base can never reach a negative value &nbsp;∴ <b>no solution</b> on that branch.", af: "∴ K = 4 &nbsp;of&nbsp; K = −1. &nbsp;&nbsp;2<sup>x</sup> ≠ −1, want 'n positiewe grondtal kan nooit 'n negatiewe waarde bereik nie &nbsp;∴ <b>geen oplossing</b> in daardie geval nie." }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>x</sup> = 4 = 2² &nbsp;∴ x = 2. &nbsp;&nbsp;TEST in the original: &nbsp;√(2² + 5) = √9 = 3 &nbsp;and&nbsp; 2² − 1 = 3, &nbsp;and 3 = 3 ✓", af: "2<sup>x</sup> = 4 = 2² &nbsp;∴ x = 2. &nbsp;&nbsp;TOETS in die oorspronklike: &nbsp;√(2² + 5) = √9 = 3 &nbsp;en&nbsp; 2² − 1 = 3, &nbsp;en 3 = 3 ✓" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: squaring both sides can invent roots that were never there, so ALWAYS test in the ORIGINAL equation. And pick the right word for the dead branch — it is <b>no solution</b> (a positive base cannot be negative), not “undefined”, which is only ever for dividing by zero.", af: "ONTHOU: as jy albei kante kwadreer, kan jy wortels skep wat nooit daar was nie, dus toets ALTYD in die OORSPRONKLIKE vergelyking. En kies die regte woord vir die dooie geval: dit is <b>geen oplossing</b> ('n positiewe grondtal kan nie negatief wees nie), nie “onbepaald” nie, wat net vir deling deur nul is.",
        } },
      ],
      esplain: {
        en: "Two whole topics are folded into one line here, and the way through is to deal with them one at a time rather than both at once. Naming 2 to the x as K removes the exponent problem completely: what is left is an ordinary surd equation, root of K plus five equals K minus one. From there it is her usual routine — the root is already by itself, so square both sides with brackets on both, tidy up into a quadratic and factorise. Then the walk back. K equals four is fine and gives x equals two. K equals minus one is not: a positive base raised to any power stays positive, so that branch is no solution, not a forgotten answer. And because squaring can create false roots, the surviving answer still has to be tested in the equation you started with.", af: "Twee hele onderwerpe is hier in een reël saamgevou, en die manier om deur te kom, is om hulle een op 'n slag te hanteer eerder as albei tegelyk. As jy 2 tot die mag x K noem, verdwyn die eksponentprobleem heeltemal: wat oorbly, is 'n gewone wortelvormvergelyking, wortel van K plus vyf is gelyk aan K minus een. Van daar af is dit haar gewone roetine: die wortel staan reeds alleen, dus kwadreer albei kante met hakies om albei, vereenvoudig tot 'n kwadratiese vergelyking en faktoriseer. Vervang dan terug. K is gelyk aan vier is reg en gee x is gelyk aan twee. K is gelyk aan minus een is nie: 'n positiewe grondtal tot enige mag bly positief, dus is daardie geval geen oplossing nie, en nie 'n antwoord wat jy vergeet het nie. En omdat kwadrering vals wortels kan skep, moet die antwoord wat oorleef steeds getoets word in die vergelyking waarmee jy begin het.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — proof: 2^(n+2) + 2ⁿ is divisible by 5 for every n ∈ ℕ.
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "show-an-exponential-expression-is-divisible-by-a-given-number",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es4" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;2<sup>n+2</sup> + 2<sup>n</sup>&nbsp; is divisible by 5 for every natural number n.", af: "<em>Sonder 'n sakrekenaar.</em><br>Toon aan dat &nbsp;2<sup>n+2</sup> + 2<sup>n</sup>&nbsp; deelbaar is deur 5 vir elke natuurlike getal n.",
      },
      hint: {
        en: "Divisible by 5 means it can be written as 5 times a whole number — so aim for that shape. Divorce the first term so both terms carry the same power of 2, and see what comes out as a common factor.", af: "Deelbaar deur 5 beteken dit kan geskryf word as 5 maal 'n heelgetal: mik dus vir daardie vorm. Skei die eerste term sodat albei terme dieselfde mag van 2 dra, en kyk wat as gemene faktor uitkom.",
      },
      memo: [
        { type: "step", text: { en: "Work one side only. <b>Divorce</b> the first term so both terms carry the same power of 2:", af: "Werk net met een kant. <b>Skei</b> die eerste term sodat albei terme dieselfde mag van 2 dra:" } },
        { type: "step", text: { en: "2<sup>n+2</sup> = 2<sup>n</sup> · 2² = 4 · 2<sup>n</sup>", af: "2<sup>n+2</sup> = 2<sup>n</sup> · 2² = 4 · 2<sup>n</sup>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2<sup>n+2</sup> + 2<sup>n</sup> = 4 · 2<sup>n</sup> + 2<sup>n</sup>", af: "2<sup>n+2</sup> + 2<sup>n</sup> = 4 · 2<sup>n</sup> + 2<sup>n</sup>" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take out the common factor — always the base with the variable exponent:<br>= 2<sup>n</sup>(4 + 1) = 5 · 2<sup>n</sup>", af: "Haal die gemene faktor uit, altyd die grondtal met die veranderlike eksponent:<br>= 2<sup>n</sup>(4 + 1) = 5 · 2<sup>n</sup>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "2<sup>n</sup> is a whole number for every n ∈ ℕ, so 5 · 2<sup>n</sup> is 5 × a whole number &nbsp;&nbsp;∴ the expression is divisible by 5 for every natural number n.", af: "2<sup>n</sup> is 'n heelgetal vir elke n ∈ ℕ, dus is 5 · 2<sup>n</sup> gelyk aan 5 × 'n heelgetal &nbsp;&nbsp;∴ die uitdrukking is deelbaar deur 5 vir elke natuurlike getal n." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the last line is a mark on its own. Reaching 5 · 2<sup>n</sup> is not yet a proof — you have to SAY that 2<sup>n</sup> is a whole number, because that is what turns “5 times something” into “a multiple of 5”.", af: "PASOP: die laaste reël is op sy eie 'n punt werd. Om by 5 · 2<sup>n</sup> uit te kom, is nog nie 'n bewys nie: jy moet SÊ dat 2<sup>n</sup> 'n heelgetal is, want dit is wat “5 maal iets” in “'n veelvoud van 5” verander.",
        } },
      ],
      esplain: {
        en: "Divisible by five means the expression can be written as five multiplied by a whole number, so that is the shape to aim at from the very first line. The two terms are not the same power of 2, so divorce the bigger one: 2 to the n plus two is 2 to the n times four. Now both terms carry 2 to the n, and it can be taken out as a common factor, leaving four plus one inside the bracket. That bracket is where the five comes from, and it is the same five whatever n happens to be. The final sentence is what makes it a proof rather than a rearrangement: because n is a natural number, 2 to the n is a whole number, so the whole expression really is five times a whole number.", af: "Deelbaar deur vyf beteken die uitdrukking kan geskryf word as vyf vermenigvuldig met 'n heelgetal, dus is dit die vorm waarvoor jy van die heel eerste reël af mik. Die twee terme is nie dieselfde mag van 2 nie, dus skei die groter een: 2 tot die mag n plus twee is 2 tot die mag n maal vier. Nou dra albei terme 2 tot die mag n, en dit kan as gemene faktor uitgehaal word, sodat vier plus een binne die hakie oorbly. Uit daardie hakie kom die vyf, en dit is dieselfde vyf wat n ook al is. Die laaste sin is wat dit 'n bewys maak eerder as net 'n herrangskikking: omdat n 'n natuurlike getal is, is 2 tot die mag n 'n heelgetal, dus is die hele uitdrukking regtig vyf maal 'n heelgetal.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — a root inside a root, then the same with a NEGATIVE base.
   ∛(√64) = 2; (−64)^(1/6) non-real; (−64)^(1/3) = −4.
   --------------------------------------------------------------- */
const q5 = {
  id: "exp.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "nested-root-as-a-single-rational-exponent-then-the-negative-base-trap",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Write &nbsp;∛(√64)&nbsp; as a single power of 64, and evaluate it.", af: "<em>Sonder 'n sakrekenaar.</em><br>Skryf &nbsp;∛(√64)&nbsp; as 'n enkele mag van 64, en bereken dit.",
      },
      hint: {
        en: "A root inside a root is still just one root — the two indexes multiply together. Then remember that the bottom of a fractional exponent is the root.", af: "'n Wortel binne 'n wortel is steeds net een wortel: die twee indekse word met mekaar vermenigvuldig. Onthou dan dat die onderste getal van 'n breukeksponent die wortel is.",
      },
      memo: [
        { type: "step", text: { en: "A root inside a root <b>multiplies</b> the two indexes.", af: "'n Wortel binne 'n wortel <b>vermenigvuldig</b> die twee indekse." } },
        { type: "step", text: { en: "∛(√64) = <sup>6</sup>√64 = 64" + RX(1, 6) }, ticks: ["s/f"] },
        { type: "answer", text: { en: "64 = 2⁶ &nbsp;&nbsp;∴ 64" + RX(1, 6) + " = (2⁶)" + RX(1, 6) + " = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Taking a square root and then a cube root sounds like two separate jobs, and it is really one: the indexes multiply, so a cube root of a square root is a sixth root. Written as an exponent that is 64 to the power one sixth, because the bottom number of a fractional exponent is always the root. From there, prime factors do the rest of the work — 64 is 2 to the sixth, and taking the sixth root of 2 to the sixth simply cancels the six against the sixth, leaving 2. It is also worth noticing that the order does not matter: the square root of the cube root of 64 gives exactly the same 2, which is one of the surd laws written on her page.", af: "Om eers 'n vierkantswortel en dan 'n derdemagswortel te trek, klink na twee aparte take, maar dit is eintlik een: die indekse word vermenigvuldig, dus is 'n derdemagswortel van 'n vierkantswortel 'n sesdemagswortel. As eksponent geskryf, is dit 64 tot die mag een sesde, want die onderste getal van 'n breukeksponent is altyd die wortel. Van daar af doen priemfaktore die res van die werk: 64 is 2 tot die mag ses, en die sesdemagswortel van 2 tot die mag ses kanselleer eenvoudig die ses teen die sesde, sodat 2 oorbly. Let ook op dat die volgorde nie saak maak nie: die vierkantswortel van die derdemagswortel van 64 gee presies dieselfde 2, en dit is een van die wortelvormwette op haar bladsy.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine, with a reason in each case, whether &nbsp;(−64)" + RX(1, 6) + "&nbsp; and &nbsp;(−64)" + RX(1, 3) + "&nbsp; are real numbers, and give the value of each one that is.",
      },
      hint: {
        en: "Turn each exponent back into a root and look only at the bottom number — is that root even or odd? A negative sitting under those two kinds of root behaves completely differently.", af: "Maak van elke eksponent weer 'n wortel en kyk net na die onderste getal: is daardie wortel ewe of onewe? 'n Negatief onder daardie twee soorte wortels gedra hom heeltemal anders.",
      },
      memo: [
        { type: "step", text: { en: "Turn each exponent back into a root: the bottom of the fraction is the root, and the question is whether that root is <b>even</b> or <b>odd</b>.", af: "Maak van elke eksponent weer 'n wortel: die onderste getal van die breuk is die wortel, en die vraag is of daardie wortel <b>ewe</b> of <b>onewe</b> is." } },
        { type: "step", text: { en: "(−64)" + RX(1, 6) + " = <sup>6</sup>√(−64) — an <b>even</b> root of a negative, and no real number multiplied by itself six times can come out negative &nbsp;∴ <b>non-real</b>." }, ticks: ["s/f"] },
        { type: "step", text: { en: "(−64)" + RX(1, 3) + " = ∛(−64) — an <b>odd</b> root of a negative, which is allowed, and the answer comes out negative." }, ticks: ["ca"] },
        { type: "answer", text: { en: "(−64)" + RX(1, 6) + " is <b>non-real</b>; &nbsp;&nbsp;(−64)" + RX(1, 3) + " = −4, &nbsp;because (−4)³ = −64." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: <b>non-real</b> is the word for an even root of a negative — not “no solution” and not “undefined”. And a minus inside the bracket is never something you may quietly drop: (−64)" + RX(1, 3) + " is −4, while 64" + RX(1, 3) + " is 4.",
        } },
      ],
      esplain: {
        en: "Part (a) worked because everything in sight was positive. Put a minus in front of the 64 and the two roots part company completely. A sixth root asks for a number that, multiplied by itself six times, gives minus sixty-four — and six is even, so whatever that number was, positive or negative, the answer would come out positive. No real number can do it, so the expression is non-real. A cube root asks for a number multiplied by itself three times, and three is odd, so a negative stays negative: minus four times minus four times minus four really is minus sixty-four. That is the whole of her negatives box in two lines, and the deciding factor is only ever whether the root is even or odd.", af: "Deel (a) het gewerk omdat alles in sig positief was. Sit 'n minus voor die 64, en die twee wortels gaan heeltemal hul eie paaie. 'n Sesdemagswortel vra vir 'n getal wat, ses keer met homself vermenigvuldig, minus vier-en-sestig gee, en ses is ewe, dus sou die antwoord positief uitkom, of daardie getal nou positief of negatief was. Geen reële getal kan dit doen nie, dus is die uitdrukking nie-reëel. 'n Derdemagswortel vra vir 'n getal wat drie keer met homself vermenigvuldig word, en drie is onewe, dus bly 'n negatief negatief: minus vier maal minus vier maal minus vier is regtig minus vier-en-sestig. Dit is haar hele blokkie oor negatiewe getalle in twee reëls, en al wat ooit saak maak, is of die wortel ewe of onewe is.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — x^(2/3) = 25 (the ± from an even numerator, both roots
   checked), then x^(2/3) = −25 (no solution).
   --------------------------------------------------------------- */
const q6 = {
  id: "exp.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "rational-exponent-equation-with-an-even-numerator-and-its-impossible-twin",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "<em>No calculator.</em><br>Solve for x: &nbsp;x" + RX(2, 3) + " = 25",
      },
      hint: {
        en: "Multiply the exponent by its reciprocal to strip it off the x — and do exactly the same to the other side. Then look hard at the TOP of the original exponent before you decide how many answers there are.", af: "Vermenigvuldig die eksponent met sy resiprook om dit van die x af te stroop, en doen presies dieselfde aan die ander kant. Kyk dan mooi na die BOONSTE getal van die oorspronklike eksponent voordat jy besluit hoeveel antwoorde daar is.",
      },
      memo: [
        { type: "step", text: { en: "Multiply the exponent by its <b>reciprocal</b> — switch numerator and denominator — and do the same to the other side:", af: "Vermenigvuldig die eksponent met sy <b>resiprook</b> (ruil die teller en noemer om), en doen dieselfde aan die ander kant:" } },
        { type: "step", text: { en: "(x" + RX(2, 3) + ")" + RX(3, 2) + " = 25" + RX(3, 2) }, ticks: ["s/f"] },
        { type: "step", text: { en: "The original exponent has an <b>even numerator</b> (the 2), so the answer carries a ±:<br>x = ±25" + RX(3, 2) + " = ±(√25)³ = ±5³ = ±125" }, ticks: ["ca"] },
        { type: "step", text: { en: "CHECK both: &nbsp;125" + RX(2, 3) + " = (∛125)² = 5² = 25 ✓ &nbsp;&nbsp;and&nbsp;&nbsp; (−125)" + RX(2, 3) + " = (∛(−125))² = (−5)² = 25 ✓" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x = 125 &nbsp;or&nbsp; x = −125", af: "∴ x = 125 &nbsp;of&nbsp; x = −125" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — raise, then root (same marks): &nbsp;x" + RX(2, 3) + " = 25 &nbsp;⟹&nbsp; (∛(x²))³ = 25³ &nbsp;⟹&nbsp; x² = <span class=\"nowrap\">15&nbsp;625</span> &nbsp;⟹&nbsp; x = ±125" } },
        { type: "trap", text: {
          en: "REMEMBER: the ± is decided by the NUMERATOR of the original exponent. Here it is 2, which is even, so BOTH signs work and dropping the −125 throws away half the answer. If that numerator had been odd there would be no ± at all.", af: "ONTHOU: die TELLER van die oorspronklike eksponent besluit oor die ±. Hier is dit 2, wat ewe is, dus werk ALBEI tekens, en as jy die −125 weglaat, gooi jy die helfte van die antwoord weg. As daardie teller onewe was, sou daar glad geen ± wees nie.",
        } },
      ],
      esplain: {
        en: "The exponent two over three is a cube root and then a square, and the neatest way to peel it off is to raise both sides to its upside-down version, three over two, because two thirds times three halves is exactly one. That leaves a bare x on the left. The right-hand side becomes 25 to the three over two, which is the square root of 25, cubed, so 125. Now the part that is easy to miss. Because the top of the original exponent is even, the left-hand side squares something at the end, and squaring hides a sign — so a negative x works just as well as a positive one. Her rule is to look at that numerator and nothing else: even numerator, put a ±. The check confirms it, and it is worth writing down.", af: "Die eksponent twee oor drie is 'n derdemagswortel en dan 'n kwadraat, en die netjiesste manier om dit af te skil, is om albei kante te verhef tot sy onderstebo weergawe, drie oor twee, want twee derdes maal drie halwes is presies een. Dan bly net x aan die linkerkant oor. Die regterkant word 25 tot die mag drie oor twee, wat die vierkantswortel van 25 is, en dan tot die mag drie, dus 125. Nou die deel wat maklik gemis word. Omdat die boonste getal van die oorspronklike eksponent ewe is, kwadreer die linkerkant aan die einde iets, en kwadrering verberg 'n teken: 'n negatiewe x werk dus net so goed as 'n positiewe een. Haar reël is om na daardie teller te kyk en na niks anders nie: ewe teller, sit 'n ±. Die kontrole bevestig dit, en dit is die moeite werd om neer te skryf.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence explain why &nbsp;x" + RX(2, 3) + " = −25&nbsp; has no solution.",
      },
      hint: {
        en: "Read the exponent as two instructions in order: cube root first, then square. Ask what the last of those two can possibly produce.", af: "Lees die eksponent as twee opdragte in volgorde: eers die derdemagswortel, dan kwadreer. Vra wat die laaste van die twee moontlik kan oplewer.",
      },
      memo: [
        { type: "step", text: { en: "Read the exponent in order: &nbsp;x" + RX(2, 3) + "&nbsp; is the cube root of x, and then that answer <b>squared</b>." } },
        { type: "step", text: { en: "Whatever ∛x comes to — positive, negative or zero — squaring it can never give a negative answer.", af: "Wat ∛x ook al is (positief, negatief of nul), die kwadraat daarvan kan nooit negatief wees nie." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x" + RX(2, 3) + " ≠ −25 &nbsp;&nbsp;∴ <b>no solution</b>." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an EVEN number in the numerator means the left-hand side can never come out negative, so a negative right-hand side gives <b>no solution</b>. Not “undefined”, which is only for dividing by zero, and not “non-real”, which is only for an even root of a negative.", af: "ONTHOU: 'n EWE getal in die teller beteken die linkerkant kan nooit negatief wees nie, dus is daar by 'n negatiewe regterkant <b>geen oplossing</b> nie. Nie “onbepaald” nie, wat net vir deling deur nul is, en nie “nie-reëel” nie, wat net vir 'n ewe wortel van 'n negatief is.",
        } },
      ],
      esplain: {
        en: "Part (a) is the reason this one is easy, if you read the exponent the same way. Two over three means take the cube root first, then square the result. The cube root is perfectly happy with a negative x, so nothing goes wrong there — but the squaring at the end is a one-way door: squares are never negative. So the left-hand side can be zero or positive and nothing else, and asking it to equal minus twenty-five is asking for something impossible. That is her third no-answer word: no solution. Notice how differently the same equation behaves with an odd numerator — x to the one third equals minus twenty-five has a perfectly ordinary answer, because nothing gets squared on the way.", af: "Deel (a) is die rede waarom hierdie een maklik is, as jy die eksponent op dieselfde manier lees. Twee oor drie beteken: trek eers die derdemagswortel, en kwadreer dan die antwoord. Die derdemagswortel is heeltemal tevrede met 'n negatiewe x, dus gaan niks daar verkeerd nie, maar die kwadrering aan die einde is 'n eenrigtingdeur: kwadrate is nooit negatief nie. Die linkerkant kan dus nul of positief wees en niks anders nie, en om te vra dat dit gelyk is aan minus vyf-en-twintig, is om iets onmoontliks te vra. Dit is haar derde geen-antwoord-woord: geen oplossing. Let op hoe anders dieselfde vergelyking hom gedra met 'n onewe teller: x tot die mag een derde is gelyk aan minus vyf-en-twintig het 'n heel gewone antwoord, want niks word op pad gekwadreer nie.",
      },
    },
  ],
};

export const expLevel4Questions = [q1, q2, q3, q4, q5, q6];
