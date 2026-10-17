/* ============================================================
   EXAM FOCUS — General Trig · THE LEVEL 4 ★ TILE, "the brave round"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md ruling 5 + its tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   A BRAND NEW TILE: six cards, from nothing.

   WHY THIS TILE EXISTS (her ruling 5, 2026-08-23): "Levels 1-3 on the
   normal tiles; every chapter gets a last tile Level 4 ★ holding mixed
   Level-4 questions for that chapter. The low achievers must never meet
   a ★ while drilling basics." So every hard trig question in the bank
   is gathered here, and the eight tiles in front of this one stay safe.

   WHAT MAKES A QUESTION LEVEL 4, in this chapter: it is un-cued (the
   question does not say which move to make), it runs several steps that
   each depend on the last, it works BACKWARDS from an answer, or it
   asks about the RANGE of a ratio rather than its value. Every card
   below carries at least one starred part, and every part on every card
   is level 3 or 4 — a Level 4 card may carry the lead-in it genuinely
   depends on, never a warm-up.

   THE SIX, and where each mould comes from
   (survey/SURVEY-Topic-Banks.md §2 — the trig inventory's ⭐ items;
   survey/SURVEY-Her-2025-Assessments.md). Fresh numbers and letters
   throughout; nothing here is verbatim anything:
     q1  2025-Q5.2.1's "for which k is this ratio non-real" — the single
         most conceptually interesting item in the whole trig survey,
         because the only way through is knowing that a sine or cosine
         lives between −1 and 1. It ends as a quadratic inequality.
     q2  2026-Q2.4's reverse-engineered general solution: you are GIVEN
         the answer and have to find the constant that produced it.
     q3  2024-Q5.4's product trick — two factors multiply to −1, and
         neither can leave [−1 ; 1], so one must be 1 and the other −1.
         Two unknowns, four families.
     q4  2024-Q3.7, the hardest identity in the survey: given that one
         expression equals m, prove a second one equals 1 over m².
     q5  a reduction that has to be simplified BEFORE it can be solved,
         and then a "which of these values is the expression actually
         allowed to take" check that most learners skip.
     q6  the two-condition question: a square root over a denominator,
         where "real" needs BOTH what is under the root to be
         non-negative AND the bottom to survive (her Test 7 Q1 mould,
         pushed one step further).

   NO DIAGRAM ANYWHERE ON THIS TILE. Every sketch these questions need —
   the bow tie, the quadrant cross, the little right triangle — is the
   learner's own pen-and-paper work.

   METHOD: the textbook method in every memo, with her story in the hint
   and the esplain (EXAM-FOCUS-PLAN.md, 2026-08-22: "Trig: her method IS
   the textbook method — only the explanation differs"), and her three
   standing trig rulings enforced throughout: ONE quadrant line for a
   tan, the reference angle taken from the positive value, and a single
   k ∈ ℤ closing the last branch.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";

/* ---------------------------------------------------------------
   q1 — THE RANGE OF A RATIO, ending in a quadratic inequality.
   (a) is an ordinary co-function-plus-Pythagoras chain; (b) ★ is the
   part that cannot be done by pattern-matching at all.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-ratio-in-terms-of-a-letter-then-non-real-quadratic-inequality",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt10" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 68° = m − 4.<br><br>Determine &nbsp;cos 22°&nbsp; in terms of m, leaving your answer in surd form.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;cos 68° = m − 4.<br><br>Bepaal &nbsp;cos 22°&nbsp; in terme van m, en laat jou antwoord in wortelvorm.",
      },
      hint: {
        en: "Add the two angles first. If they make 90° you have been handed a co-function, and a co-function converts between sin and cos. After that it is Pythagoras in disguise — the identity that links sin² and cos².", af: "Tel eers die twee hoeke bymekaar. As hulle 90° gee, het jy 'n ko-funksie gekry, en 'n ko-funksie skakel om tussen sin en cos. Daarna is dit Pythagoras in vermomming: die identiteit wat sin² en cos² verbind.",
      },
      memo: [
        { type: "step", text: { en: "68° and 22° add to 90°, so this is a co-function: &nbsp;cos 22° = sin 68°", af: "68° en 22° tel op tot 90°, dus is dit 'n ko-funksie: &nbsp;cos 22° = sin 68°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin²68° + cos²68° = 1 &nbsp;⟹&nbsp; sin²68° = 1 − cos²68°", af: "sin²68° + cos²68° = 1 &nbsp;⟹&nbsp; sin²68° = 1 − cos²68°" }, ticks: ["ca"] },
        { type: "step", text: { en: "= 1 − (m − 4)²", af: "= 1 − (m − 4)²" }, ticks: ["ca"] },
        { type: "answer", text: { en: "68° is a first-quadrant angle, so sin 68° is positive: &nbsp;cos 22° = √(1 − (m − 4)²)", af: "68° is 'n hoek in die eerste kwadrant, dus is sin 68° positief: &nbsp;cos 22° = √(1 − (m − 4)²)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (m − 4)² is not m² − 16, and you do not need to multiply it out here — leaving it as a bracket keeps the next part short. But you DO have to choose the positive square root, and the reason is that 68° sits in the first quadrant where every ratio is positive.", af: "PASOP: (m − 4)² is nie m² − 16 nie, en jy hoef dit nie hier uit te vermenigvuldig nie: as jy dit as 'n hakie los, bly die volgende deel kort. Maar jy MOET die positiewe vierkantswortel kies, en die rede is dat 68° in die eerste kwadrant lê, waar elke verhouding positief is.",
        } },
      ],
      esplain: {
        en: "Two moves, and the first one is spotting that 68° and 22° are partners. Any two angles that add to 90° are co-functions of each other, so the cosine of one is the sine of the other — cos 22° is sin 68°, and now everything is about the same angle. The second move is the identity sin²θ + cos²θ = 1, which is just Pythagoras written in ratios. Rearrange it: sin²68° is 1 − cos²68°, and you were handed cos 68° as m − 4, so drop that straight in. Take the square root and you have your answer in terms of m. The one decision worth thinking about is the plus-or-minus. A square root normally offers both, but 68° lies in the first quadrant, where every ratio is positive, so the negative root is thrown away. That habit — check the quadrant before you choose a sign — is what part (b) is built on.", af: "Twee stappe, en die eerste is om raak te sien dat 68° en 22° 'n paar is. Enige twee hoeke wat optel tot 90° is ko-funksies van mekaar, dus is die cos van die een die sin van die ander: cos 22° is sin 68°, en nou gaan alles oor dieselfde hoek. Die tweede stap is die identiteit sin²θ + cos²θ = 1, wat net Pythagoras in verhoudings geskryf is. Herrangskik dit: sin²68° is 1 − cos²68°, en jy het cos 68° as m − 4 gekry, so sit dit net so in. Neem die vierkantswortel en jy het jou antwoord in terme van m. Die een besluit wat die moeite werd is om oor te dink, is die plus-of-minus. 'n Vierkantswortel bied gewoonlik albei, maar 68° lê in die eerste kwadrant, waar elke verhouding positief is, dus word die negatiewe wortel weggegooi. Daardie gewoonte (kyk na die kwadrant voordat jy 'n teken kies) is waarop deel (b) gebou is.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Determine the values of m for which &nbsp;cos 22°&nbsp; would be <b>non-real</b>", af: "Bepaal die waardes van m waarvoor &nbsp;cos 22°&nbsp; <b>nie-reëel</b> sou wees",
      },
      hint: {
        en: "You already have cos 22° written as a square root. A square root goes non-real for exactly one reason. Turn that reason into an inequality, multiply the bracket out, and factorise — it is an ordinary quadratic inequality wearing trig clothes.", af: "Jy het cos 22° reeds as 'n vierkantswortel geskryf. 'n Vierkantswortel word om presies een rede nie-reëel. Maak van daardie rede 'n ongelykheid, vermenigvuldig die hakie uit, en faktoriseer: dit is 'n gewone kwadratiese ongelykheid in trig-klere.",
      },
      memo: [
        { type: "step", text: { en: "A square root is non-real exactly when what sits under it is negative:", af: "'n Vierkantswortel is nie-reëel presies wanneer wat daaronder staan negatief is:" } },
        { type: "step", text: { en: "1 − (m − 4)² &lt; 0 &nbsp;⟹&nbsp; (m − 4)² &gt; 1", af: "1 − (m − 4)² &lt; 0 &nbsp;⟹&nbsp; (m − 4)² &gt; 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "m² − 8m + 16 &gt; 1 &nbsp;⟹&nbsp; m² − 8m + 15 &gt; 0", af: "m² − 8m + 16 &gt; 1 &nbsp;⟹&nbsp; m² − 8m + 15 &gt; 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(m − 3)(m − 5) &gt; 0, &nbsp;so the critical values are m = 3 and m = 5", af: "(m − 3)(m − 5) &gt; 0, &nbsp;dus is die kritieke waardes m = 3 en m = 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "m &lt; 3 &nbsp;&nbsp;or&nbsp;&nbsp; m &gt; 5", af: "m &lt; 3 &nbsp;&nbsp;of&nbsp;&nbsp; m &gt; 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a quadratic inequality that is GREATER than zero gives you the two OUTSIDE pieces, not the middle. Sketch the happy parabola through 3 and 5 and shade what is above the x-axis — the answer is the two arms, joined by \"or\", never by \"and\".", af: "PASOP: 'n kwadratiese ongelykheid wat GROTER as nul is, gee jou die twee BUITENSTE intervalle, nie die middelste een nie. Skets die happy parabool deur 3 en 5 en kleur in wat bo die x-as is: die antwoord is die twee arms, verbind met \"of\", nooit met \"en\" nie.",
        } },
      ],
      esplain: {
        en: "This question is really asking one thing: do you know that a cosine can never be bigger than 1 or smaller than −1? From (a), cos 22° is the square root of 1 − (m − 4)², and a square root stops being a real number the moment what is under it goes below zero. So write that down as an inequality and the trig disappears — you are left with 1 − (m − 4)² less than 0, which rearranges to (m − 4)² greater than 1. Multiply out, tidy up, and you have m² − 8m + 15 greater than 0, which factorises into (m − 3)(m − 5). Sketch the happy parabola: it cuts the x-axis at 3 and 5 and is above the axis on either side of them, so the answer is the two outer arms. There is a lovely check hiding here. cos 68° = m − 4, and a cosine must sit between −1 and 1, so m must sit between 3 and 5 for the given statement to make sense at all — which is exactly the piece your answer left out.", af: "Hierdie vraag vra eintlik net een ding: weet jy dat cos nooit groter as 1 of kleiner as −1 kan wees nie? Uit (a) is cos 22° die vierkantswortel van 1 − (m − 4)², en 'n vierkantswortel hou op om 'n reële getal te wees die oomblik dat wat daaronder staan onder nul gaan. Skryf dit dus as 'n ongelykheid neer en die trig verdwyn: jy hou 1 − (m − 4)² kleiner as 0 oor, wat herrangskik na (m − 4)² groter as 1. Vermenigvuldig uit, maak netjies, en jy het m² − 8m + 15 groter as 0, wat faktoriseer na (m − 3)(m − 5). Skets die happy parabool: dit sny die x-as by 3 en 5 en is aan albei kante daarvan bo die as, dus is die antwoord die twee buitenste arms. Hier skuil 'n mooi toets. cos 68° = m − 4, en 'n cos moet tussen −1 en 1 lê, dus moet m tussen 3 en 5 lê sodat die gegewe bewering enigsins kan klop, en dit is presies die interval wat jou antwoord uitgelaat het.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 ★ — WORKING BACKWARDS. You are given the general solution and
   have to find the constant that produced it (2026-Q2.4's mould).
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-reverse-engineered-general-solution-find-the-constant",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt11" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 4,
      prompt: {
        en: "The general solution of the equation &nbsp;b sin θ = 5 cos θ&nbsp; is &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ.<br><br>Show that &nbsp;b = 4.", af: "Die algemene oplossing van die vergelyking &nbsp;b sin θ = 5 cos θ&nbsp; is &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ.<br><br>Toon aan dat &nbsp;b = 4.",
      },
      hint: {
        en: "Solve the equation the ordinary way first, as if b were a number you knew — the angle in both functions is the same, so there is only one type it can be. Then read the answer they gave you: what does the k · 180° tell you about which ratio you ended up with, and what does 51,34° have to BE?", af: "Los die vergelyking eers op die gewone manier op, asof b 'n getal is wat jy ken: die hoek in albei funksies is dieselfde, dus is daar net een tipe wat dit kan wees. Lees dan die antwoord wat hulle vir jou gegee het: wat sê die k · 180° vir jou oor watter verhouding jy uiteindelik gekry het, en wat moet 51,34° WEES?",
      },
      memo: [
        { type: "step", text: { en: "Both angles are θ, so it is <b>type ②: same angles</b> — divide the whole line by cos θ.", af: "Albei hoeke is θ, dus is dit <b>tipe ②: dieselfde hoeke</b>, so deel die hele reël deur cos θ." } },
        { type: "step", text: { en: "b tan θ = 5 &nbsp;⟹&nbsp; tan θ = 5/b", af: "b tan θ = 5 &nbsp;⟹&nbsp; tan θ = 5/b" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The given answer closes with k · 180°, which is the tan family, and a tan general solution is &nbsp;θ = ref. ∠ + k · 180°. &nbsp;So the reference angle is 51,34°.", af: "Die gegewe antwoord eindig op k · 180°, wat die tan-familie is, en 'n tan se algemene oplossing is &nbsp;θ = verwysingshoek + k · 180°. &nbsp;Dus is die verwysingshoek 51,34°." }, ticks: ["ca"] },
        { type: "step", text: { en: "tan 51,34° = 5/b &nbsp;⟹&nbsp; 1,25 = 5/b", af: "tan 51,34° = 5/b &nbsp;⟹&nbsp; 1,25 = 5/b" }, ticks: ["ca"] },
        { type: "answer", text: { en: "b = 5/1,25 = 4", af: "b = 5/1,25 = 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 51,34° is the REFERENCE angle, not b and not anything you can substitute directly. The equation you actually build is tan 51,34° = 5/b — one line, and the whole question turns on writing it.", af: "PASOP: 51,34° is die VERWYSINGSHOEK, nie b nie en ook nie iets wat jy direk kan vervang nie. Die vergelyking wat jy eintlik bou, is tan 51,34° = 5/b: een reël, en die hele vraag hang daarvan af dat jy dit neerskryf.",
        } },
      ],
      esplain: {
        en: "Every general solution you have ever written went forwards: equation in, families out. This one runs the film backwards, and the trick is to do the forward journey anyway and then compare. Both functions carry the same angle θ, so it is type ②: divide the whole line by cos θ and the sine turns into a tan, leaving tan θ = 5 over b. Now look at what you were given. The answer closes with k · 180°, and only the tan family repeats every 180°, so that confirms you are on the right road. And a tan general solution is always the reference angle plus k · 180°, which means 51,34° IS the reference angle — the angle whose tan is 5 over b. Put that on a line: tan 51,34° = 5 over b. Your calculator says tan 51,34° is 1,25, so 5 divided by b is 1,25, and b is 4. One equation, built by reading somebody else's answer.", af: "Elke algemene oplossing wat jy al ooit geskryf het, het vorentoe gegaan: vergelyking in, families uit. Hierdie een speel die fliek agteruit, en die truuk is om die vorentoe-reis tog te doen en dan te vergelyk. Albei funksies het dieselfde hoek θ, dus is dit tipe ②: deel die hele reël deur cos θ en die sin word 'n tan, sodat tan θ = 5 oor b oorbly. Kyk nou na wat jy gekry het. Die antwoord eindig op k · 180°, en net die tan-familie herhaal elke 180°, so dit bevestig dat jy op die regte pad is. En 'n tan se algemene oplossing is altyd die verwysingshoek plus k · 180°, wat beteken dat 51,34° DIE verwysingshoek IS: die hoek waarvan die tan 5 oor b is. Sit dit op een reël: tan 51,34° = 5 oor b. Jou sakrekenaar sê tan 51,34° is 1,25, dus is 5 gedeel deur b gelyk aan 1,25, en b is 4. Een vergelyking, gebou deur iemand anders se antwoord te lees.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;θ&nbsp;∈&nbsp;[−180°&nbsp;;&nbsp;180°]&nbsp; for which &nbsp;4 sin θ = 5 cos θ", af: "Bepaal vervolgens die waardes van &nbsp;θ&nbsp;∈&nbsp;[−180°&nbsp;;&nbsp;180°]&nbsp; waarvoor &nbsp;4 sin θ = 5 cos θ",
      },
      hint: {
        en: "Nothing new gets solved. You now own the general solution the question handed you — feed it whole numbers and keep what lands inside the interval, remembering that this family steps 180° at a time, not 360°.", af: "Niks nuuts word opgelos nie. Die algemene oplossing wat die vraag vir jou gegee het, is nou joune: voer heelgetalle daarin, hou wat binne die interval val, en onthou dat hierdie familie 180° op 'n slag stap, nie 360° nie.",
      },
      memo: [
        { type: "step", text: { en: "With b = 4 the general solution is the one given: &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "Met b = 4 is die algemene oplossing die gegewe een: &nbsp;θ = 51,34° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" } },
        { type: "step", text: { en: "k = 0 → 51,34°, &nbsp;&nbsp;k = −1 → −128,66°, &nbsp;&nbsp;k = 1 → 231,34° (out), &nbsp;&nbsp;k = −2 → −308,66° (out)", af: "k = 0 → 51,34°, &nbsp;&nbsp;k = −1 → −128,66°, &nbsp;&nbsp;k = 1 → 231,34° (buite), &nbsp;&nbsp;k = −2 → −308,66° (buite)" } },
        { type: "answer", text: { en: "θ = 51,34°", af: "θ = 51,34°" }, ticks: ["a"] },
        { type: "answer", text: { en: "and &nbsp;θ = −128,66°", af: "en &nbsp;θ = −128,66°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this family steps 180°, not 360°, so an interval 360° wide holds TWO answers rather than one. Walk k both ways until you overshoot at each end.", af: "PASOP: hierdie familie stap 180°, nie 360° nie, dus bevat 'n interval van 360° wyd TWEE antwoorde, nie een nie. Stap k albei kante toe totdat jy aan elke kant verbyskiet.",
        } },
      ],
      esplain: {
        en: "The word \"hence\" means the hard work is behind you. Part (a) confirmed that b is 4, so the general solution printed in the question is the real one, and all that is left is turning the handle. Start at k = 0, which gives 51,34°, comfortably inside the interval. Step downwards: k = −1 gives 51,34° − 180°, which is −128,66°, also inside. Step again and you get −308,66°, which has overshot the left-hand end. Go the other way from zero and k = 1 gives 231,34°, past the right-hand end. So two answers. The thing worth noticing is the step size. A sine or cosine family steps 360°, so a 360°-wide interval usually holds one answer per branch; a tan family steps 180°, so the same interval holds two. If your tan question produces only one answer, you probably stopped one k too early.", af: "Die woord \"vervolgens\" beteken die harde werk is agter die rug. Deel (a) het bevestig dat b 4 is, dus is die algemene oplossing wat in die vraag gedruk is die regte een, en al wat oorbly, is roetine. Begin by k = 0, wat 51,34° gee, gemaklik binne die interval. Stap af: k = −1 gee 51,34° − 180°, wat −128,66° is, ook binne. Stap weer en jy kry −308,66°, wat by die linkerkant verbygeskiet het. Gaan van nul af die ander kant toe en k = 1 gee 231,34°, verby die regterkant. Dus twee antwoorde. Wat die moeite werd is om raak te sien, is die stapgrootte. 'n Sin- of cos-familie stap 360°, dus bevat 'n interval van 360° wyd gewoonlik een antwoord per tak; 'n tan-familie stap 180°, dus bevat dieselfde interval twee. As jou tan-vraag net een antwoord oplewer, het jy waarskynlik een k te vroeg gestop.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 ★ — THE PRODUCT TRICK (2024-Q5.4). Two factors, two unknowns,
   and the only way in is knowing that neither factor can leave the
   strip between −1 and 1.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-product-of-two-ratios-equals-minus-one-both-at-their-limits",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt11" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 4,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(x + 20°) · cos(y − 40°) = −1", af: "Bepaal die algemene oplossing van &nbsp;sin(x + 20°) · cos(y − 40°) = −1",
      },
      hint: {
        en: "You cannot factorise this and you cannot divide your way out of it — there are two different unknowns. So think about SIZE instead. How big can each of those two factors ever get, and what does that force if their product is exactly −1?", af: "Jy kan dit nie faktoriseer nie en jy kan ook nie jou pad hieruit deel nie: daar is twee verskillende onbekendes. Dink dus eerder aan GROOTTE. Hoe groot kan elk van daardie twee faktore ooit word, en wat dwing dit af as hulle produk presies −1 is?",
      },
      memo: [
        { type: "step", text: { en: "Neither factor can leave the strip between −1 and 1: &nbsp;−1 ≤ sin(x + 20°) ≤ 1 &nbsp;and&nbsp; −1 ≤ cos(y − 40°) ≤ 1", af: "Geen van die faktore kan buite −1 tot 1 gaan nie: &nbsp;−1 ≤ sin(x + 20°) ≤ 1 &nbsp;en&nbsp; −1 ≤ cos(y − 40°) ≤ 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "So a product of exactly −1 is only possible if BOTH factors are at their limits — one of them 1 and the other −1. That is two cases.", af: "Dus is 'n produk van presies −1 net moontlik as ALBEI faktore op hulle grense is: die een 1 en die ander −1. Dit is twee gevalle." }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Case 1:</b> &nbsp;sin(x + 20°) = 1 &nbsp;⟹&nbsp; x + 20° = 90° + k · 360° &nbsp;⟹&nbsp; x = 70° + k · 360°", af: "<b>Geval 1:</b> &nbsp;sin(x + 20°) = 1 &nbsp;⟹&nbsp; x + 20° = 90° + k · 360° &nbsp;⟹&nbsp; x = 70° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "&nbsp;&nbsp;&nbsp;&nbsp;with&nbsp; cos(y − 40°) = −1 &nbsp;⟹&nbsp; y − 40° = 180° + k · 360° &nbsp;⟹&nbsp; y = 220° + k · 360°", af: "&nbsp;&nbsp;&nbsp;&nbsp;met&nbsp; cos(y − 40°) = −1 &nbsp;⟹&nbsp; y − 40° = 180° + k · 360° &nbsp;⟹&nbsp; y = 220° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "<b>Case 2:</b> &nbsp;sin(x + 20°) = −1 &nbsp;⟹&nbsp; x + 20° = 270° + k · 360° &nbsp;⟹&nbsp; x = 250° + k · 360°", af: "<b>Geval 2:</b> &nbsp;sin(x + 20°) = −1 &nbsp;⟹&nbsp; x + 20° = 270° + k · 360° &nbsp;⟹&nbsp; x = 250° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "&nbsp;&nbsp;&nbsp;&nbsp;with&nbsp; cos(y − 40°) = 1 &nbsp;⟹&nbsp; y − 40° = 0° + k · 360° &nbsp;⟹&nbsp; y = 40° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "&nbsp;&nbsp;&nbsp;&nbsp;met&nbsp; cos(y − 40°) = 1 &nbsp;⟹&nbsp; y − 40° = 0° + k · 360° &nbsp;⟹&nbsp; y = 40° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two answers in each case belong TOGETHER. x = 70° only works with y = 220°, and x = 250° only works with y = 40°. Mixing one case's x with the other case's y gives a product of +1, not −1 — so write each case as a pair.", af: "PASOP: die twee antwoorde in elke geval hoort SAAM. x = 70° werk net saam met y = 220°, en x = 250° werk net saam met y = 40°. As jy een geval se x met die ander geval se y meng, kry jy 'n produk van +1, nie −1 nie: skryf dus elke geval as 'n paar.",
        } },
      ],
      esplain: {
        en: "There is nothing to factorise, nothing to divide, and two different letters, so the usual roads are all shut. What opens it is a fact you already know: a sine and a cosine both live between −1 and 1, and never step outside. Now think about multiplying two numbers from that strip. The biggest size a product can possibly reach is 1 × 1, so getting exactly −1 is only possible if both factors are sitting right on the edge — one at 1 and the other at −1. There is no other way. That splits the question into two cases, and each case is two small type ① general solutions run side by side. sin(something) = 1 happens at 90°, sin(something) = −1 at 270°, cos(something) = 1 at 0°, cos(something) = −1 at 180°. Keep each case's x and y written as a pair, because they only produce −1 together — swap them around and you get +1.", af: "Daar is niks om te faktoriseer nie, niks om te deel nie, en twee verskillende letters, dus is die gewone paaie almal toe. Wat dit oopmaak, is 'n feit wat jy reeds ken: sin en cos leef albei tussen −1 en 1, en stap nooit daarbuite nie. Dink nou daaraan om twee getalle tussen −1 en 1 te vermenigvuldig. Die grootste wat 'n produk se grootte ooit kan wees, is 1 × 1, dus is presies −1 net moontlik as albei faktore reg op die rand sit: een by 1 en die ander by −1. Daar is geen ander manier nie. Dit verdeel die vraag in twee gevalle, en elke geval is twee klein tipe ① algemene oplossings langs mekaar. sin(iets) = 1 gebeur by 90°, sin(iets) = −1 by 270°, cos(iets) = 1 by 0°, cos(iets) = −1 by 180°. Hou elke geval se x en y as 'n paar geskryf, want hulle gee net saam −1: ruil hulle om en jy kry +1.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE HARDEST IDENTITY IN THE SURVEY (2024-Q3.7's mould, flipped
   from cos-over-1−sin to sin-over-1−cos). Given that one expression is
   m, prove that a different one is 1 over m².
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-identity-given-expression-equals-m-prove-a-second-in-terms-of-m",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt9" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 4,
      prompt: {
        en: "It is given that &nbsp;sin θ/(1 − cos θ) = m.<br><br>Prove that &nbsp;(1 − cos θ)/(1 + cos θ) = 1/m²", af: "Dit is gegee dat &nbsp;sin θ/(1 − cos θ) = m.<br><br>Bewys dat &nbsp;(1 − cos θ)/(1 + cos θ) = 1/m²",
      },
      hint: {
        en: "Look at what you want and at what you were given, and notice the m is SQUARED on one side and not on the other. So square the given statement — you are allowed to, because it is given, not something you are proving. Then the masked identity and a difference of two squares do the rest.", af: "Kyk na wat jy wil hê en na wat jy gekry het, en let op dat die m aan die een kant in die KWADRAAT is en aan die ander kant nie. Kwadreer dus die gegewe bewering: dit mag jy doen, want dit is gegee, nie iets wat jy bewys nie. Dan doen die gemaskerde identiteit en 'n verskil van twee vierkante die res.",
      },
      memo: [
        { type: "step", text: { en: "The m in the answer is squared, so square the GIVEN statement — that is legal, because it is given rather than being proved:", af: "Die m in die antwoord is in die kwadraat, dus kwadreer die GEGEWE bewering: dit is wettig, want dit is gegee eerder as iets wat bewys word:" } },
        { type: "step", text: { en: "m² = <span class=\"sfrac\"><span class=\"sf-n\">sin²θ</span><span class=\"sf-d\">(1 − cos θ)²</span></span>", af: "m² = <span class=\"sfrac\"><span class=\"sf-n\">sin²θ</span><span class=\"sf-d\">(1 − cos θ)²</span></span>" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin²θ = 1 − cos²θ &nbsp;(masked identity)", af: "sin²θ = 1 − cos²θ &nbsp;(gemaskerde identiteit)" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²θ = (1 − cos θ)(1 + cos θ) &nbsp;(difference of two squares)", af: "1 − cos²θ = (1 − cos θ)(1 + cos θ) &nbsp;(verskil van twee vierkante)" }, ticks: ["ca"] },
        { type: "step", text: { en: "m² = <span class=\"sfrac\"><span class=\"sf-n\">(1 − cos θ)(1 + cos θ)</span><span class=\"sf-d\">(1 − cos θ)²</span></span> = (1 + cos θ)/(1 − cos θ)", af: "m² = <span class=\"sfrac\"><span class=\"sf-n\">(1 − cos θ)(1 + cos θ)</span><span class=\"sf-d\">(1 − cos θ)²</span></span> = (1 + cos θ)/(1 − cos θ)" }, ticks: ["ca"] },
        { type: "step", text: { en: "Turn both sides upside down: &nbsp;1/m² = (1 − cos θ)/(1 + cos θ)", af: "Draai albei kante onderstebo: &nbsp;1/m² = (1 − cos θ)/(1 + cos θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ (1 − cos θ)/(1 + cos θ) = 1/m² = RHS", af: "∴ (1 − cos θ)/(1 + cos θ) = 1/m² = RKS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you may square the GIVEN statement as much as you like, because it is handed to you as true. What you may never do is cross-multiply the thing you are being asked to PROVE — that assumes the answer.", af: "ONTHOU: jy mag die GEGEWE bewering soveel kwadreer as wat jy wil, want dit word vir jou as waar gegee. Wat jy nooit mag doen nie, is om die ding wat jy moet BEWYS te kruisvermenigvuldig: dit neem die antwoord aan.",
        } },
      ],
      esplain: {
        en: "The whole question turns on one observation: the m you are given is not squared, but the m in the target is. So square the given statement. That is completely legal — it is given as true, so anything true of it is true of its square, and it is a different thing entirely from cross-multiplying the statement you are trying to prove. Squaring gives m² = sin²θ over (1 − cos θ)². Now the top is a squared sine, which is the masked identity 1 − cos²θ, and that in turn is a difference of two squares: (1 − cos θ)(1 + cos θ). Look at the bottom — (1 − cos θ) twice. One of them cancels, and m² comes out as (1 + cos θ) over (1 − cos θ). Compare that with what you want and you will see it is upside down, so flip both sides. Flipping an equation is fair as long as neither side is zero, and there you are.", af: "Die hele vraag draai om een waarneming: die m wat jy kry, is nie in die kwadraat nie, maar die m in die teiken is. Kwadreer dus die gegewe bewering. Dit is heeltemal wettig: dit is as waar gegee, dus is enigiets wat daarvan waar is ook waar van sy kwadraat, en dit is iets heel anders as om die bewering wat jy probeer bewys te kruisvermenigvuldig. Kwadrering gee m² = sin²θ oor (1 − cos θ)². Nou is die bokant 'n sin in die kwadraat, wat die gemaskerde identiteit 1 − cos²θ is, en dit is op sy beurt 'n verskil van twee vierkante: (1 − cos θ)(1 + cos θ). Kyk na die onderkant: (1 − cos θ) twee keer. Een daarvan kanselleer, en m² kom uit as (1 + cos θ) oor (1 − cos θ). Vergelyk dit met wat jy wil hê en jy sal sien dit is onderstebo, dus draai albei kante om. Om 'n vergelyking om te draai is regverdig solank geen kant nul is nie, en daar is jy.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Determine the values of &nbsp;θ&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; for which the statement in (a) is <b>not valid</b>", af: "Bepaal die waardes van &nbsp;θ&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; waarvoor die bewering in (a) <b>nie geldig</b> is nie",
      },
      hint: {
        en: "Hunt for every denominator in the whole question, including the given statement — and do not forget that m itself sits underneath in the answer, so m may not be zero either.", af: "Soek elke noemer in die hele vraag, die gegewe bewering ingesluit, en moenie vergeet dat m self in die antwoord onder staan nie, dus mag m ook nie nul wees nie.",
      },
      memo: [
        { type: "step", text: { en: "The statement holds only where every denominator survives and where m itself is not zero. List them:", af: "Die bewering geld net waar elke noemer oorleef en waar m self nie nul is nie. Lys hulle:" } },
        { type: "step", text: { en: "1 − cos θ = 0 &nbsp;⟹&nbsp; cos θ = 1 &nbsp;⟹&nbsp; θ = 0° or 360°", af: "1 − cos θ = 0 &nbsp;⟹&nbsp; cos θ = 1 &nbsp;⟹&nbsp; θ = 0° of 360°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "1 + cos θ = 0 &nbsp;⟹&nbsp; cos θ = −1 &nbsp;⟹&nbsp; θ = 180°", af: "1 + cos θ = 0 &nbsp;⟹&nbsp; cos θ = −1 &nbsp;⟹&nbsp; θ = 180°" }, ticks: ["ca"] },
        { type: "step", text: { en: "and m sits underneath in 1/m², so m ≠ 0: &nbsp;sin θ = 0 &nbsp;⟹&nbsp; θ = 0°, 180° or 360° — the same three values again", af: "en m staan onder in 1/m², dus m ≠ 0: &nbsp;sin θ = 0 &nbsp;⟹&nbsp; θ = 0°, 180° of 360°, weer dieselfde drie waardes" } },
        { type: "answer", text: { en: "θ = 0°, &nbsp;180° &nbsp;or&nbsp; 360°", af: "θ = 0°, &nbsp;180° &nbsp;of&nbsp; 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: m appears in the answer as 1 over m², so m = 0 breaks the statement just as surely as a zero denominator does. Checking only the two written-out denominators is an incomplete answer.", af: "PASOP: m verskyn in die antwoord as 1 oor m², dus breek m = 0 die bewering net so seker as wat 'n noemer van nul dit doen. As jy net die twee uitgeskrewe noemers toets, is jou antwoord onvolledig.",
        } },
      ],
      esplain: {
        en: "A proof is only true where everything in it exists, so the job is to hunt down every denominator in the whole question — the given statement counts too. There are three things that can go wrong. The given fraction has 1 − cos θ underneath, which is zero when cos θ = 1, at 0° and again at 360°. The target fraction has 1 + cos θ underneath, which is zero when cos θ = −1, at 180°. And there is a sneaky third one: the answer is 1 over m², so m itself may not be zero, and m is sin θ over something, which is zero wherever sin θ is zero — 0°, 180° and 360°. That third condition happens to hand you exactly the same three values, which is a nice check that you have not missed anything. Three values in all, and each is written once.", af: "'n Bewys geld net waar alles daarin bestaan, dus is die taak om elke noemer in die hele vraag op te spoor: die gegewe bewering tel ook. Daar is drie dinge wat verkeerd kan loop. Die gegewe breuk het 1 − cos θ onder, wat nul is wanneer cos θ = 1, by 0° en weer by 360°. Die teikenbreuk het 1 + cos θ onder, wat nul is wanneer cos θ = −1, by 180°. En daar is 'n slinkse derde een: die antwoord is 1 oor m², dus mag m self nie nul wees nie, en m is sin θ oor iets, wat nul is waar sin θ nul is: 0°, 180° en 360°. Daardie derde voorwaarde gee jou toevallig presies dieselfde drie waardes, wat 'n mooi toets is dat jy niks gemis het nie. Altesaam drie waardes, en elkeen word een keer geskryf.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — SIMPLIFY BEFORE YOU SOLVE, then check the values are allowed.
   (a) is a four-factor reduction; (b) ★ turns the tidy answer into a
   general-solution-in-an-interval AND asks whether the ORIGINAL
   expression is defined at the values it produced.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-reduce-then-solve-then-check-the-original-is-defined",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt7" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin(180° − x) · cos(360° − x)</span><span class=\"sf-d\">cos(180° + x) · sin(x − 90°)</span></span>&nbsp; to a single trigonometric ratio", af: "Vereenvoudig &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">sin(180° − x) · cos(360° − x)</span><span class=\"sf-d\">cos(180° + x) · sin(x − 90°)</span></span>&nbsp; tot 'n enkele trigonometriese verhouding",
      },
      hint: {
        en: "Four factors, four separate lines, and write the split above each angle before anything else. Two of the four are going to come out as the same thing with a minus in front — watch what happens when you multiply those two together.", af: "Vier faktore, vier aparte reëls, en skryf die opdeling bo elke hoek voordat jy enigiets anders doen. Twee van die vier gaan as dieselfde ding met 'n minus voor uitkom: kyk wat gebeur wanneer jy daardie twee met mekaar vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "sin(180° − x) = sin x &nbsp;&nbsp;·&nbsp;&nbsp; cos(360° − x) = cos x", af: "sin(180° − x) = sin x &nbsp;&nbsp;·&nbsp;&nbsp; cos(360° − x) = cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(180° + x) = −cos x", af: "cos(180° + x) = −cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin(x − 90°) = −cos x", af: "sin(x − 90°) = −cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(sin x · cos x)/((−cos x)(−cos x)) = (sin x · cos x)/cos²x = tan x", af: "(sin x · cos x)/((−cos x)(−cos x)) = (sin x · cos x)/cos²x = tan x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: sin(x − 90°) = −cos x, but cos(x − 90°) = +sin x. The two negative co-functions do not behave the same way, and this question quietly depends on getting that one right.", af: "ONTHOU: sin(x − 90°) = −cos x, maar cos(x − 90°) = +sin x. Die twee negatiewe ko-funksies gedra hulle nie dieselfde nie, en hierdie vraag hang stilletjies daarvan af dat jy daardie een reg kry.",
        } },
      ],
      esplain: {
        en: "Four factors, so four lines, one at a time — her three steps on each: which quadrant, which reduction formula, plus or minus. 180° − x is in S where sine is positive, so the first factor stays sin x. 360° − x is in C where cosine is positive, so the second stays cos x. 180° + x is in T, so the cosine there turns negative: −cos x. And sin(x − 90°) is one of the negative co-functions, which converts sine into cosine and collects a minus: −cos x again. Now look at the bottom — two identical brackets, each carrying a minus. Multiplied together the minuses cancel and you get cos²x, positive. One cos x from the bottom cancels the cos x on top, leaving sin x over cos x, which is tan x. When a four-factor fraction is going to give a single clean ratio, this is usually the shape of it: something cancels, and a pair of minus signs quietly kill each other.", af: "Vier faktore, dus vier reëls, een op 'n slag, met haar drie stappe op elkeen: watter kwadrant, watter reduksieformule, plus of minus. 180° − x is in S, waar sin positief is, dus bly die eerste faktor sin x. 360° − x is in C, waar cos positief is, dus bly die tweede cos x. 180° + x is in T, dus word die cos daar negatief: −cos x. En sin(x − 90°) is een van die negatiewe ko-funksies, wat sin in cos omskakel en 'n minus bykry: weer −cos x. Kyk nou na die onderkant: twee identiese hakies, elkeen met 'n minus. Vermenigvuldig met mekaar kanselleer die minusse en jy kry cos²x, positief. Een cos x van onder kanselleer die cos x bo, sodat sin x oor cos x oorbly, wat tan x is. Wanneer 'n breuk met vier faktore 'n enkele netjiese verhouding gaan gee, lyk dit gewoonlik so: iets kanselleer, en 'n paar minustekens kanselleer mekaar stilletjies uit.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; for which the expression in (a) is equal to &nbsp;−√3, &nbsp;and state whether the original expression is defined at each of them", af: "Bepaal vervolgens die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; waarvoor die uitdrukking in (a) gelyk is aan &nbsp;−√3, &nbsp;en sê of die oorspronklike uitdrukking by elkeen daarvan bepaald is",
      },
      hint: {
        en: "The \"hence\" is doing real work — solve the tidy version, not the original. Then remember that tidying an expression does not remove its restrictions: go back to the four factors and ask what is underneath.", af: "Die \"vervolgens\" doen regte werk: los die netjiese weergawe op, nie die oorspronklike nie. Onthou dan dat 'n uitdrukking wat jy netjies maak, nie sy beperkings verloor nie: gaan terug na die vier faktore en vra wat onder staan.",
      },
      memo: [
        { type: "step", text: { en: "By (a) the expression is simply tan x, so: &nbsp;tan x = −√3", af: "Volgens (a) is die uitdrukking eenvoudig tan x, dus: &nbsp;tan x = −√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 60° &nbsp;(from the SIZE of the number, √3, never from the minus)", af: "verwysingshoek&nbsp;=&nbsp;60° &nbsp;(uit die GROOTTE van die getal, √3, nooit uit die minus nie)" }, ticks: ["ca"] },
        { type: "step", text: { en: "tan is negative in <b>II and IV</b>: &nbsp;x = 180° − 60° = 120° &nbsp;&nbsp;or&nbsp;&nbsp; x = 360° − 60° = 300°", af: "tan is negatief in <b>II en IV</b>: &nbsp;x = 180° − 60° = 120° &nbsp;&nbsp;of&nbsp;&nbsp; x = 360° − 60° = 300°" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now check the original. Its denominator is cos(180° + x) · sin(x − 90°), and both of those are −cos x, so the expression only fails where cos x = 0 — at 90° and 270°", af: "Toets nou die oorspronklike. Sy noemer is cos(180° + x) · sin(x − 90°), en albei daarvan is −cos x, dus breek die uitdrukking net waar cos x = 0: by 90° en 270°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 120° &nbsp;and&nbsp; x = 300°, &nbsp;and the original expression is defined at both", af: "x = 120° &nbsp;en&nbsp; x = 300°, &nbsp;en die oorspronklike uitdrukking is by albei bepaald" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: an interval question on a TAN still only has one family, x = 120° + k · 180°, but that family lands TWICE inside [0°&nbsp;;&nbsp;360°]. Finding only 120° means you stopped one step too early.", af: "PASOP: 'n intervalvraag oor 'n TAN het steeds net een familie, x = 120° + k · 180°, maar daardie familie val TWEE keer binne [0°&nbsp;;&nbsp;360°]. As jy net 120° kry, het jy een stap te vroeg gestop.",
        } },
      ],
      esplain: {
        en: "Two jobs, and most people only do the first. Job one: the word \"hence\" tells you to use part (a), so you are solving tan x = −√3 and not wrestling with four reduced factors. Take the reference angle from the size of the number — tan 60° is √3, so ref.&nbsp;∠&nbsp;= 60° — and let the cross handle the minus. Tan is negative in the second and fourth quadrants, which gives 180° − 60° = 120° and 360° − 60° = 300°. Job two is the part that earns the star. Tidying an expression never removes its restrictions, so go back to the original and ask what sits underneath: cos(180° + x) times sin(x − 90°), which is (−cos x)(−cos x). That dies only where cos x = 0, at 90° and 270°. Neither of your two answers is one of those, so both are genuinely allowed — and saying so is part of the answer, not an optional extra.", af: "Twee take, en die meeste mense doen net die eerste. Taak een: die woord \"vervolgens\" sê vir jou om deel (a) te gebruik, dus los jy tan x = −√3 op en sukkel nie met vier gereduseerde faktore nie. Neem die verwysingshoek uit die grootte van die getal (tan 60° is √3, dus verwysingshoek&nbsp;=&nbsp;60°) en laat die kruis die minus hanteer. tan is negatief in die tweede en vierde kwadrante, wat 180° − 60° = 120° en 360° − 60° = 300° gee. Taak twee is die deel wat die ster verdien. Om 'n uitdrukking netjies te maak, verwyder nooit sy beperkings nie, dus gaan terug na die oorspronklike en vra wat onder staan: cos(180° + x) maal sin(x − 90°), wat (−cos x)(−cos x) is. Dit breek net waar cos x = 0, by 90° en 270°. Nie een van jou twee antwoorde is een daarvan nie, dus is albei werklik toegelaat, en om dit te sê is deel van die antwoord, nie 'n opsionele ekstra nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE TWO-CONDITION QUESTION (her Test 7 Q1, pushed further). A
   square root sitting over a denominator: "real" needs BOTH that what
   is under the root is not negative AND that the bottom survives — and
   the two conditions overlap in exactly one place.
   --------------------------------------------------------------- */
const q6 = {
  id: "gtrig.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "level4-square-root-over-a-denominator-two-conditions-for-real",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "gt13" },
  marks: 9,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "It is given that &nbsp;E = <span class=\"sfrac\"><span class=\"sf-n\">√(sin x · cos x)</span><span class=\"sf-d\">2 sin x − 1</span></span>, &nbsp;where&nbsp; x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°].<br><br>Determine the values of x for which E is <b>undefined</b>", af: "Dit is gegee dat &nbsp;E = <span class=\"sfrac\"><span class=\"sf-n\">√(sin x · cos x)</span><span class=\"sf-d\">2 sin x − 1</span></span>, &nbsp;waar&nbsp; x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°].<br><br>Bepaal die waardes van x waarvoor E <b>onbepaald</b> is",
      },
      hint: {
        en: "Undefined means one thing only: division by zero. Ignore the root completely for this part and solve the bottom — it needs the ratio on its own first, then a reference angle and a cross.", af: "Onbepaald beteken net een ding: deling deur nul. Ignoreer die wortel heeltemal vir hierdie deel en los die onderkant op: kry eers die verhouding alleen, dan 'n verwysingshoek en 'n kruis.",
      },
      memo: [
        { type: "step", text: { en: "Set the denominator equal to zero: &nbsp;2 sin x − 1 = 0 &nbsp;⟹&nbsp; sin x = 1/2", af: "Stel die noemer gelyk aan nul: &nbsp;2 sin x − 1 = 0 &nbsp;⟹&nbsp; sin x = 1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30°, and sin is positive, so tick the cross at the <b>top</b>: I and II", af: "verwysingshoek&nbsp;=&nbsp;30°, en sin is positief, dus merk die kruis <b>bo</b>: I en II" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 30° &nbsp;&nbsp;or&nbsp;&nbsp; x = 180° − 30° = 150°, &nbsp;and both lie inside [0°&nbsp;;&nbsp;270°]", af: "x = 30° &nbsp;&nbsp;of&nbsp;&nbsp; x = 180° − 30° = 150°, &nbsp;en albei lê binne [0°&nbsp;;&nbsp;270°]" }, ticks: ["ca"] },
        { type: "answer", text: { en: "E is undefined at &nbsp;x = 30° &nbsp;and&nbsp; x = 150°", af: "E is onbepaald by &nbsp;x = 30° &nbsp;en&nbsp; x = 150°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Undefined has exactly one meaning in this syllabus: the bottom of a fraction is zero. The square root on top cannot make anything undefined — at worst it makes it non-real, which is a different word and part (b)'s problem. So ignore the top completely. Set 2 sin x − 1 equal to zero and get the ratio on its own: sin x is a half. Now it is a small general solution inside a fixed interval. ref.&nbsp;∠&nbsp;= 30° off her second special triangle, sine is positive so tick the top two quadrants, and first quadrant gives 30° while second gives 180° − 30° = 150°. Both are inside [0°&nbsp;;&nbsp;270°], so both count. Hold on to those two values — part (b) needs them, and one of them is going to matter and the other is not.", af: "Onbepaald het in hierdie sillabus presies een betekenis: die onderkant van 'n breuk is nul. Die vierkantswortel bo kan niks onbepaald maak nie: op sy ergste maak dit iets nie-reëel, wat 'n ander woord is en deel (b) se probleem. Ignoreer dus die bokant heeltemal. Stel 2 sin x − 1 gelyk aan nul en kry die verhouding alleen: sin x is 'n half. Nou is dit 'n klein algemene oplossing binne 'n vaste interval. Verwysingshoek&nbsp;=&nbsp;30° uit haar tweede spesiale driehoek, sin is positief, dus merk die boonste twee kwadrante, en die eerste kwadrant gee 30° terwyl die tweede 180° − 30° = 150° gee. Albei is binne [0°&nbsp;;&nbsp;270°], dus tel albei. Hou daardie twee waardes vas: deel (b) het hulle nodig, en een van hulle gaan saak maak en die ander nie.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°]&nbsp; for which E is <b>real</b>", af: "Bepaal die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;270°]&nbsp; waarvoor E <b>reëel</b> is",
      },
      hint: {
        en: "Two things must be true at the same time, not one. What is under the root may not be negative, and the bottom may not be zero. Do the root condition by asking when a product of two ratios is positive — that is a question about SIGNS, so it is a question about quadrants.", af: "Twee dinge moet tegelyk waar wees, nie een nie. Wat onder die wortel staan, mag nie negatief wees nie, en die onderkant mag nie nul wees nie. Doen die wortelvoorwaarde deur te vra wanneer 'n produk van twee verhoudings positief is: dit is 'n vraag oor TEKENS, dus is dit 'n vraag oor kwadrante.",
      },
      memo: [
        { type: "step", text: { en: "Two conditions have to hold together: what is under the root may not be negative, AND the denominator may not be zero.", af: "Twee voorwaardes moet saam geld: wat onder die wortel staan, mag nie negatief wees nie, EN die noemer mag nie nul wees nie." } },
        { type: "step", text: { en: "sin x · cos x ≥ 0 means sin x and cos x must have the <b>same sign</b>, or one of them is zero", af: "sin x · cos x ≥ 0 beteken sin x en cos x moet <b>dieselfde teken</b> hê, of een van hulle is nul" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Both positive is quadrant I; both negative is quadrant III: &nbsp;0° ≤ x ≤ 90° &nbsp;or&nbsp; 180° ≤ x ≤ 270°", af: "Albei positief is kwadrant I; albei negatief is kwadrant III: &nbsp;0° ≤ x ≤ 90° &nbsp;of&nbsp; 180° ≤ x ≤ 270°" }, ticks: ["ca"] },
        { type: "step", text: { en: "At the four boundary values 0°, 90°, 180° and 270° one ratio is zero, so the product is zero — and √0 = 0, which is real, so all four stay IN", af: "By die vier grenswaardes 0°, 90°, 180° en 270° is een verhouding nul, dus is die produk nul, en √0 = 0, wat reëel is, dus bly al vier IN" }, ticks: ["ca"] },
        { type: "step", text: { en: "From (a), 30° and 150° are not allowed. 150° is already outside the set above, so only 30° has to be taken out", af: "Uit (a) word 30° en 150° nie toegelaat nie. 150° is reeds buite die versameling hierbo, dus hoef net 30° uitgehaal te word" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0° ≤ x ≤ 90°, &nbsp;x ≠ 30° &nbsp;&nbsp;or&nbsp;&nbsp; 180° ≤ x ≤ 270°", af: "0° ≤ x ≤ 90°, &nbsp;x ≠ 30° &nbsp;&nbsp;of&nbsp;&nbsp; 180° ≤ x ≤ 270°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: \"real\" and \"defined\" are two different questions and this expression needs both answered. The root decides real; the denominator decides defined. An answer that only shades the quadrants has done half the work.", af: "PASOP: \"reëel\" en \"bepaald\" is twee verskillende vrae, en hierdie uitdrukking moet albei beantwoord hê. Die wortel besluit reëel; die noemer besluit bepaald. 'n Antwoord wat net die kwadrante inkleur, het net die helfte van die werk gedoen.",
        } },
      ],
      esplain: {
        en: "The word \"real\" is asking two questions at once and you have to answer both. First: is what is under the root ever negative? sin x · cos x is a product, and a product is positive only when the two things have the same sign. Both are positive in the first quadrant and both are negative in the third, so the root is happy on 0° to 90° and on 180° to 270°. The four boundary values are fine too — one ratio is zero there, the product is zero, and the square root of zero is zero, which is a perfectly real number. Second: does E exist at all? Part (a) said no at 30° and at 150°. Now compare: 150° sits in the second quadrant, which the root already threw out, so it changes nothing. But 30° is right in the middle of the piece you just kept, so it has to be cut out on its own. That single missing point is the whole difference between a level 3 answer and this one.", af: "Die woord \"reëel\" vra twee vrae tegelyk, en jy moet albei beantwoord. Eerstens: is wat onder die wortel staan ooit negatief? sin x · cos x is 'n produk, en 'n produk is net positief wanneer die twee dele dieselfde teken het. Albei is positief in die eerste kwadrant en albei is negatief in die derde, dus is die wortel tevrede op 0° tot 90° en op 180° tot 270°. Die vier grenswaardes is ook reg: een verhouding is daar nul, die produk is nul, en die vierkantswortel van nul is nul, wat 'n heeltemal reële getal is. Tweedens: bestaan E enigsins? Deel (a) het nee gesê by 30° en by 150°. Vergelyk nou: 150° lê in die tweede kwadrant, wat die wortel reeds uitgegooi het, dus verander dit niks nie. Maar 30° lê reg in die middel van die interval wat jy pas gehou het, dus moet dit op sy eie uitgesny word. Daardie een ontbrekende punt is die hele verskil tussen 'n vlak 3-antwoord en hierdie een.",
      },
    },
  ],
};

export const gtrigLevel4Questions = [q1, q2, q3, q4, q5, q6];
