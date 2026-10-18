/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill
   "identities-undefined"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   A BRAND NEW TILE: six cards, from nothing.

   WHY THIS TILE EXISTS. "For which values of x is the identity
   undefined?" is its own examinable skill on the SAG list, it has its
   own drill round in the app (gt13, "Undefined values"), and it turned
   up in her own Test 3 and Test 7 — but Exam Focus had no home for it,
   so the tile sat muted next to "Identities: prove" with nothing behind
   it.

   SOURCE OF THE MATHS: METHODS-trig.md Part M (p62-p63), which is one
   short routine repeated:
     · UNDEFINED VALUES ↳ DENOMINATOR = 0;
     · list EVERY denominator — including the one hiding inside a tan,
       because tan x is sin x over cos x and dies wherever cos x does
       (her p62 note: "tan x contributes cos x = 0; she does not write
       tan x separately");
     · set each one equal to zero, solve each as an ordinary general
       solution, then read the interval off the list;
     · put the lists together at the end. Three separate conditions can
       collapse into one family when their zeros sit the same distance
       apart (her p63 picture, the green 180° arrow).
   The two questions that ask for something OTHER than "undefined" —
   "for which x is it zero" and "for which x is it real" — run the same
   routine with one extra line, and that extra line is the whole skill:
   a fraction is zero when its TOP is zero AND its bottom is not; a
   square root is real when what is under it is not negative AND the
   expression it sits in is still defined.

   ARCHETYPES: her Test 3 Q3 (the sin 3x / 1 − cos 3x pair, both cases,
   inside a restricted interval) and her Test 7 Q1 ("hence, for which θ
   will the expression be real") from
   survey/SURVEY-Her-2025-Assessments.md, plus the undefined beats of
   2026-Q3 in survey/SURVEY-Topic-Banks.md §2. Fresh expressions
   throughout.

   WHAT THE SIX COVER:
     q1  the two building blocks on their own — tan x, and a lone
         sin x underneath
     q2  a denominator that has to be SOLVED first, then a whole
         identity with three denominators (one of them inside a tan)
     q3  the same expression asked two ways: when is it undefined, and
         when is it ZERO — where the undefined value has to be thrown
         back out of the answer
     q4  a 3x inside the ratio, inside a restricted interval, with BOTH
         denominators of the identity to solve (her Test 3 Q3)
     q5  simplify first, THEN decide when the square root is real — and
         the constraint turns out to come from the original denominator,
         not from the root at all (her Test 7 Q1)
     q6  the two nastiest: dividing BY a tan, where the expression dies
         twice over, and tan 2x, where the answer has to be divided
         through by 2

   NO DIAGRAM ANYWHERE ON THIS TILE. Her own page draws the curves and
   circles the zeros, but that picture is the CHECK, not the method —
   and drawing it is the learner's pen-and-paper job.

   LEVELS: q1 level 1, q2 level 2, q3-q6 level 3. Nothing here is level
   4 (her ruling 5, EXAM-BUILD-DAY.md).

   lostQuest: gt13, "Undefined values" — the round that drills exactly
   this: which terms must be equated to zero.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
const LOST = { chapter: CH, quest: "gt13" };

/* ---------------------------------------------------------------
   q1 — THE TWO BUILDING BLOCKS. Every other card on this tile is these
   two conditions in some combination, so they get a card of their own.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.iu.q1",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-single-condition-tan-and-lone-sine",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;tan x&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;tan x&nbsp; onbepaald?",
      },
      hint: {
        en: "tan is not really a third ratio — it is one ratio divided by another. Write it that way and the question answers itself: what is underneath, and where is that zero?", af: "tan is nie regtig 'n derde verhouding nie: dit is een verhouding gedeel deur 'n ander. Skryf dit so, en die vraag antwoord homself: wat staan onderaan, en waar is dit nul?",
      },
      memo: [
        { type: "step", text: { en: "tan x = sin x/cos x, so tan x is undefined wherever the denominator is zero: &nbsp;cos x = 0", af: "tan x = sin x/cos x, dus is tan x onbepaald waar die noemer nul is: &nbsp;cos x = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 90° &nbsp;or&nbsp; x = 270°", af: "x = 90° &nbsp;of&nbsp; x = 270°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: undefined means division by zero, and nothing else. It is not the same as \"no solution\" (which is what you write when sin or cos is asked for a value outside −1 to 1) and it is not the same as \"non-real\".", af: "ONTHOU: onbepaald beteken deling deur nul, en niks anders nie. Dit is nie dieselfde as \"geen oplossing\" nie (wat jy skryf as sin of cos 'n waarde buite −1 tot 1 moet kry), en dit is nie dieselfde as \"nie-reëel\" nie.",
        } },
      ],
      esplain: {
        en: "tan x looks like a third ratio standing next to sin and cos, but it is really just sin x divided by cos x. Once you write it that way the question stops being about tan at all — it is about a denominator. A fraction dies the moment its bottom is zero, so tan x is undefined exactly where cos x is zero. On the circle, cos is the x-value of the point, and the x-value is zero at the very top and the very bottom: 90° and 270°. Between 0° and 360° those are the only two. It is also why the tan graph has vertical dashed lines standing there — the graph is not jumping over a gap for fun, it is jumping over a division by zero. Every question on this tile is a version of that one sentence: find the bottom, set it to zero, solve.", af: "tan x lyk soos 'n derde verhouding wat langs sin en cos staan, maar dit is eintlik net sin x gedeel deur cos x. Sodra jy dit so skryf, gaan die vraag glad nie meer oor tan nie: dit gaan oor 'n noemer. 'n Breuk sterf die oomblik dat sy onderkant nul is, dus is tan x presies daar onbepaald waar cos x nul is. Op die sirkel is cos die x-waarde van die punt, en die x-waarde is nul heel bo en heel onder: 90° en 270°. Tussen 0° en 360° is dit die enigste twee. Dit is ook hoekom die tan-grafiek vertikale stippellyne daar het: die grafiek spring nie vir die pret oor 'n gaping nie, dit spring oor 'n deling deur nul. Elke vraag op hierdie teël is 'n weergawe van daardie een sin: kry die onderkant, stel dit gelyk aan nul, los op.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;1/sin x&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;1/sin x&nbsp; onbepaald?",
      },
      hint: {
        en: "Same one sentence as (a): find the bottom, set it to zero, solve. Do not forget the two ends of the interval — a closed bracket means the endpoint counts.", af: "Dieselfde een sin as (a): kry die onderkant, stel dit gelyk aan nul, los op. Moenie die twee ente van die interval vergeet nie: 'n geslote hakie beteken die eindpunt tel.",
      },
      memo: [
        { type: "step", text: { en: "The denominator may not be zero: &nbsp;sin x = 0", af: "Die noemer mag nie nul wees nie: &nbsp;sin x = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 0°, &nbsp;x = 180° &nbsp;or&nbsp; x = 360°", af: "x = 0°, &nbsp;x = 180° &nbsp;of&nbsp; x = 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the interval is written with square brackets, [0°&nbsp;;&nbsp;360°], which means both ends are INCLUDED. Leaving out 0° or 360° costs a mark every single time.", af: "PASOP: die interval is met vierkantige hakies geskryf, [0°&nbsp;;&nbsp;360°], wat beteken albei ente is INGESLUIT. As jy 0° of 360° uitlaat, kos dit elke keer 'n punt.",
        } },
      ],
      esplain: {
        en: "Same routine, different ratio. The expression is 1 divided by sin x, so it is undefined wherever sin x is zero. On the circle, sin is the y-value of the point, and the y-value is zero on the horizontal axis — at 0°, at 180°, and again at 360° when you get back to where you started. All three are inside [0°&nbsp;;&nbsp;360°], because square brackets include their ends. That last one is where marks quietly disappear: learners write 0° and 180° and stop, because 360° feels like the same place as 0°. It IS the same place on the circle, but the question asked for values of x in an interval, and 360° is a different value of x from 0°. When the brackets are round instead of square, then you leave the ends out — read them every time.", af: "Dieselfde roetine, 'n ander verhouding. Die uitdrukking is 1 gedeel deur sin x, dus is dit onbepaald waar sin x nul is. Op die sirkel is sin die y-waarde van die punt, en die y-waarde is nul op die horisontale as: by 0°, by 180°, en weer by 360° as jy terug is waar jy begin het. Al drie is binne [0°&nbsp;;&nbsp;360°], want vierkantige hakies sluit hulle ente in. Daardie laaste een is waar punte stilletjies verdwyn: leerders skryf 0° en 180° en stop, want 360° voel soos dieselfde plek as 0°. Dit IS dieselfde plek op die sirkel, maar die vraag vra waardes van x in 'n interval, en 360° is 'n ander waarde van x as 0°. As die hakies rond is in plaas van vierkantig, laat jy die ente uit: lees hulle elke keer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A DENOMINATOR THAT HAS TO BE SOLVED, then a whole identity with
   three denominators, one of them inside a tan. The identity is the one
   proved on the "Identities: prove" tile, deliberately — the same
   expression, asked the other way round.
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.iu.q2",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-solved-denominator-then-full-identity",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;3/(2cos x − 1)&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;3/(2cos x − 1)&nbsp; onbepaald?",
      },
      hint: {
        en: "The bottom is not a bare ratio this time, so you have to solve for it: set the whole denominator equal to zero and get cos x on its own. Then it is an ordinary quadrant-and-reference-angle job.", af: "Die onderkant is dié keer nie 'n kaal verhouding nie, dus moet jy daarvoor oplos: stel die hele noemer gelyk aan nul en kry cos x alleen. Dan is dit 'n gewone werkie met kwadrante en 'n verwysingshoek.",
      },
      memo: [
        { type: "step", text: { en: "Set the denominator equal to zero: &nbsp;2cos x − 1 = 0 &nbsp;⟹&nbsp; cos x = 1/2", af: "Stel die noemer gelyk aan nul: &nbsp;2cos x − 1 = 0 &nbsp;⟹&nbsp; cos x = 1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 60°, and cos is positive in <b>I and IV</b>", af: "verwysingshoek&nbsp;=&nbsp;60°, en cos is positief in <b>I en IV</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 60° &nbsp;or&nbsp; x = 300°", af: "x = 60° &nbsp;of&nbsp; x = 300°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The only new thing here is that the denominator has some algebra in it, so step one is to get the ratio on its own — exactly the same first move as a special sum. 2cos x − 1 = 0 gives cos x = a half. Now it is a small general-solution job inside a fixed interval. The reference angle comes from the size of the number, so cos 60° is a half and ref.&nbsp;∠&nbsp;= 60°. Then the cross: cos is positive down the right-hand side of the bow tie, so tick I and IV. First quadrant gives 60°; fourth quadrant gives 360° − 60°, which is 300°. Both are inside [0°&nbsp;;&nbsp;360°], so both count. Notice you are not solving the fraction — you are solving the thing underneath it, and the answers are the values the expression is NOT allowed to have.", af: "Die enigste nuwe ding hier is dat die noemer 'n bietjie algebra in het, dus is stap een om die verhouding alleen te kry: presies dieselfde eerste stap as 'n spesiale som. 2cos x − 1 = 0 gee cos x = 'n half. Nou is dit 'n klein algemene-oplossing-werkie binne 'n vaste interval. Die verwysingshoek kom uit die grootte van die getal, dus is cos 60° 'n half en verwysingshoek&nbsp;=&nbsp;60°. Dan die kruis: cos is positief aan die regterkant van die strikdas, dus merk I en IV. Die eerste kwadrant gee 60°; die vierde kwadrant gee 360° − 60°, wat 300° is. Albei is binne [0°&nbsp;;&nbsp;360°], dus tel albei. Let op dat jy nie die breuk oplos nie: jy los die ding daaronder op, en die antwoorde is die waardes wat die uitdrukking NIE mag hê nie.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is the identity &nbsp;cos x/(1 − sin x) − tan x = 1/cos x&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is die identiteit &nbsp;cos x/(1 − sin x) − tan x = 1/cos x&nbsp; onbepaald?",
      },
      hint: {
        en: "Make a list of every denominator in the whole line — both sides count. There are three, and one of them is not written down anywhere: it is hiding inside the tan.", af: "Maak 'n lys van elke noemer in die hele reël: albei kante tel. Daar is drie, en een van hulle is nêrens neergeskryf nie: dit kruip in die tan weg.",
      },
      memo: [
        { type: "step", text: { en: "List every denominator: the visible 1 − sin x, the cos x hiding inside tan x, and the cos x on the right.", af: "Lys elke noemer: die sigbare 1 − sin x, die cos x wat in tan x wegkruip, en die cos x aan die regterkant." } },
        { type: "step", text: { en: "1 − sin x = 0 &nbsp;⟹&nbsp; sin x = 1 &nbsp;⟹&nbsp; x = 90°", af: "1 − sin x = 0 &nbsp;⟹&nbsp; sin x = 1 &nbsp;⟹&nbsp; x = 90°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "tan x needs cos x ≠ 0, and so does 1/cos x: &nbsp;cos x = 0", af: "tan x het cos x ≠ 0 nodig, en 1/cos x ook: &nbsp;cos x = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 90° &nbsp;or&nbsp; x = 270°", af: "x = 90° &nbsp;of&nbsp; x = 270°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Both lists together: &nbsp;x = 90° &nbsp;or&nbsp; x = 270°", af: "Albei lyste saam: &nbsp;x = 90° &nbsp;of&nbsp; x = 270°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: tan x has no fraction bar printed anywhere, so it is the condition everybody forgets. tan x is sin x over cos x — the moment a tan appears in a question like this, cos x = 0 goes straight onto your list.", af: "PASOP: tan x het nêrens 'n breukstreep nie, dus is dit die voorwaarde wat almal vergeet. tan x is sin x oor cos x: die oomblik dat 'n tan in so 'n vraag verskyn, gaan cos x = 0 reguit op jou lys.",
        } },
      ],
      esplain: {
        en: "The routine never changes: list every denominator, set each one to zero, solve each one, then put the lists together. What makes this question a real question is that one of the denominators is invisible. tan x has no fraction bar on the page, but it is sin x over cos x, so it carries the condition cos x ≠ 0 with it wherever it goes. That gives you 90° and 270°. The visible denominator, 1 − sin x, is zero when sin x = 1, and sine only reaches 1 at the very top of the circle, so that is 90° again. The two lists overlap, which is normal — you write each value once. The answer is 90° and 270°. And it is worth seeing why 90° turned up twice: at 90° the first fraction and the tan both blow up at the same moment. One value, two reasons, still one value.", af: "Die roetine verander nooit: lys elke noemer, stel elkeen gelyk aan nul, los elkeen op, en voeg dan die lyste saam. Wat hierdie vraag 'n regte vraag maak, is dat een van die noemers onsigbaar is. tan x het geen breukstreep op die bladsy nie, maar dit is sin x oor cos x, dus dra dit die voorwaarde cos x ≠ 0 saam waar dit ook al gaan. Dit gee jou 90° en 270°. Die sigbare noemer, 1 − sin x, is nul wanneer sin x = 1, en sin bereik net 1 heel bo op die sirkel, dus is dit weer 90°. Die twee lyste oorvleuel, wat normaal is: jy skryf elke waarde een keer. Die antwoord is 90° en 270°. En dit is die moeite werd om te sien hoekom 90° twee keer opgedaag het: by 90° blaas die eerste breuk en die tan op dieselfde oomblik op. Een waarde, twee redes, steeds een waarde.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE SAME EXPRESSION, ASKED TWO WAYS. (b) is where the skill
   really lives: a fraction is zero when its TOP is zero AND its bottom
   is not, so (a)'s answer has to be thrown back OUT of (b)'s list.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.iu.q3",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-then-where-the-expression-equals-zero",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;(sin x · cos x)/(1 + cos x)&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;(sin x · cos x)/(1 + cos x)&nbsp; onbepaald?",
      },
      hint: {
        en: "Ignore the top completely for this part. Only the bottom can make an expression undefined.", af: "Ignoreer die bokant heeltemal vir hierdie deel. Net die onderkant kan 'n uitdrukking onbepaald maak.",
      },
      memo: [
        { type: "step", text: { en: "Set the denominator equal to zero: &nbsp;1 + cos x = 0 &nbsp;⟹&nbsp; cos x = −1", af: "Stel die noemer gelyk aan nul: &nbsp;1 + cos x = 0 &nbsp;⟹&nbsp; cos x = −1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 180°", af: "x = 180°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Only the bottom of a fraction can make it undefined, so the top is not your business here at all. Set 1 + cos x equal to zero, which gives cos x = −1. Now, cos is the x-value of the point on the circle, and the furthest left that point ever gets is −1, at exactly 180°. So there is only one answer in the whole interval. Her routine would run it as an ordinary general solution — ref.&nbsp;∠&nbsp;= 0°, second quadrant, x = 180° + k · 360° — and that gives the same single value inside [0°&nbsp;;&nbsp;360°]. Either road is fine; what matters is that you looked underneath and nowhere else. Part (b) is where the top finally matters, and where this answer comes back to bite.", af: "Net die onderkant van 'n breuk kan dit onbepaald maak, dus is die bokant hier glad nie jou saak nie. Stel 1 + cos x gelyk aan nul, wat cos x = −1 gee. cos is die x-waarde van die punt op die sirkel, en die verste links wat daardie punt ooit kom, is −1, presies by 180°. Daar is dus net een antwoord in die hele interval. Haar roetine sou dit as 'n gewone algemene oplossing doen: verwysingshoek&nbsp;=&nbsp;0°, tweede kwadrant, x = 180° + k · 360°, en dit gee dieselfde enkele waarde binne [0°&nbsp;;&nbsp;360°]. Albei paaie is reg; wat saak maak, is dat jy onderaan gekyk het en nêrens anders nie. Deel (b) is waar die bokant uiteindelik saak maak, en waar hierdie antwoord terugkom om jou te byt.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 3,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;(sin x · cos x)/(1 + cos x)&nbsp; equal to zero?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;(sin x · cos x)/(1 + cos x)&nbsp; gelyk aan nul?",
      },
      hint: {
        en: "A fraction is zero when its top is zero — but only if the fraction exists at all. So make the list from the top, then check it against your answer to (a) and throw out anything that appears in both.", af: "'n Breuk is nul wanneer sy bokant nul is, maar net as die breuk wel bestaan. Maak dus die lys uit die bokant, toets dit dan teen jou antwoord in (a) en gooi alles uit wat in albei voorkom.",
      },
      memo: [
        { type: "step", text: { en: "A fraction is zero when its TOP is zero and its bottom is not.", af: "'n Breuk is nul wanneer sy BOKANT nul is en sy onderkant nie." } },
        { type: "step", text: { en: "sin x = 0 &nbsp;⟹&nbsp; x = 0°, 180° or 360°", af: "sin x = 0 &nbsp;⟹&nbsp; x = 0°, 180° of 360°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos x = 0 &nbsp;⟹&nbsp; x = 90° or 270°", af: "cos x = 0 &nbsp;⟹&nbsp; x = 90° of 270°" }, ticks: ["ca"] },
        { type: "step", text: { en: "From (a) the expression is undefined at x = 180°", af: "Uit (a) is die uitdrukking onbepaald by x = 180°" }, ticks: ["ca"] },
        { type: "step", text: { en: "so 180° is thrown out — at 180° the expression has no value at all, never mind a value of zero", af: "dus word 180° uitgegooi: by 180° het die uitdrukking glad geen waarde nie, laat staan nog 'n waarde van nul" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 0°, &nbsp;90°, &nbsp;270° &nbsp;or&nbsp; 360°", af: "x = 0°, &nbsp;90°, &nbsp;270° &nbsp;of&nbsp; 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: at x = 180° the top IS zero and the bottom is zero too. That does not make the fraction zero — it makes it undefined. Zero over zero is not a number, and a value that kills the bottom can never be part of a \"where is it zero\" answer.", af: "PASOP: by x = 180° IS die bokant nul, en die onderkant is ook nul. Dit maak die breuk nie nul nie: dit maak dit onbepaald. Nul oor nul is nie 'n getal nie, en 'n waarde wat die onderkant doodmaak, kan nooit deel van 'n \"waar is dit nul\"-antwoord wees nie.",
        } },
      ],
      esplain: {
        en: "A product is zero when any one of its factors is zero, so the top, sin x · cos x, dies wherever sin x is zero or cos x is zero. That gives 0°, 180° and 360° from the sine, and 90° and 270° from the cosine — five candidates. Now comes the part that separates a level 3 answer from a level 1 one. A fraction is only zero if it is a number in the first place, and part (a) told you the whole thing is undefined at 180°. At 180° the top is zero and the bottom is zero as well, and zero over zero is not zero, it is nothing at all. So 180° gets crossed off. Four values survive. The habit to carry away: whenever a question asks where a fraction is zero, solve the top, then check every answer against the bottom before you write the list down.", af: "'n Produk is nul wanneer enige een van sy faktore nul is, dus sterf die bokant, sin x · cos x, waar sin x nul is of cos x nul is. Dit gee 0°, 180° en 360° van die sin, en 90° en 270° van die cos: vyf kandidate. Nou kom die deel wat 'n vlak 3-antwoord van 'n vlak 1-antwoord skei. 'n Breuk is net nul as dit in die eerste plek 'n getal is, en deel (a) het vir jou gesê die hele ding is onbepaald by 180°. By 180° is die bokant nul en die onderkant ook, en nul oor nul is nie nul nie, dit is glad niks nie. Dus word 180° deurgehaal. Vier waardes bly oor. Die gewoonte om saam te neem: wanneer 'n vraag vra waar 'n breuk nul is, los die bokant op, en toets dan elke antwoord teen die onderkant voordat jy die lys neerskryf.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — HER TEST 3 Q3 SHAPE: a 3x inside the ratios, a restricted
   interval, and BOTH denominators of the identity to solve. The
   divide-through by 3 is the step that catches people.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.iu.q4",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-compound-angle-both-denominators-restricted-interval",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;120°]&nbsp; for which &nbsp;1 − cos 3x = 0", af: "Bepaal die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;120°]&nbsp; waarvoor &nbsp;1 − cos 3x = 0",
      },
      hint: {
        en: "Get cos 3x on its own, then treat the whole 3x as the unknown and write the general solution for IT first. Only divide by 3 at the very end — and divide every term of the line, including the k · 360°.", af: "Kry cos 3x alleen, hanteer dan die hele 3x as die onbekende en skryf EERS die algemene oplossing vir DIT. Deel eers heel aan die einde deur 3, en deel elke term van die reël, die k · 360° ook.",
      },
      memo: [
        { type: "step", text: { en: "1 − cos 3x = 0 &nbsp;⟹&nbsp; cos 3x = 1, &nbsp;so ref.&nbsp;∠&nbsp;= 0°", af: "1 − cos 3x = 0 &nbsp;⟹&nbsp; cos 3x = 1, &nbsp;dus verwysingshoek&nbsp;=&nbsp;0°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "3x = 0° + k · 360° &nbsp;⟹&nbsp; divide every term by 3: &nbsp;x = 0° + k · 120°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "3x = 0° + k · 360° &nbsp;⟹&nbsp; deel elke term deur 3: &nbsp;x = 0° + k · 120°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "In [0°&nbsp;;&nbsp;120°]: &nbsp;x = 0° &nbsp;or&nbsp; x = 120°", af: "In [0°&nbsp;;&nbsp;120°]: &nbsp;x = 0° &nbsp;of&nbsp; x = 120°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the k · 360° gets divided by 3 as well. Writing x = 0° + k · 360° instead of x = 0° + k · 120° loses you 120° entirely, and with it half the answer.", af: "PASOP: die k · 360° word ook deur 3 gedeel. As jy x = 0° + k · 360° skryf in plaas van x = 0° + k · 120°, verloor jy 120° heeltemal, en daarmee die helfte van die antwoord.",
        } },
      ],
      esplain: {
        en: "Treat the whole 3x as one unknown and do not divide anything until the general solution is written out. cos 3x = 1 means the point on the circle is as far right as it goes, which is 0° — so ref.&nbsp;∠&nbsp;= 0°, and the family is 3x = 0° + k · 360°. Now divide the WHOLE line by 3, every term of it, the way she writes it with the divisor under each piece: 3x over 3 is x, 0° over 3 is 0°, and k · 360° over 3 is k · 120°. So x = 0° + k · 120°. Feed in whole numbers: k = 0 gives 0°, k = 1 gives 120°, k = 2 gives 240° which is past the end of the interval. Two answers. The dividing-through step is the whole reason a 3x question is harder than an x question — the solutions are packed three times closer together, and forgetting to shrink the k term hides two thirds of them.", af: "Hanteer die hele 3x as een onbekende en moenie iets deel voordat die algemene oplossing uitgeskryf is nie. cos 3x = 1 beteken die punt op die sirkel is so ver regs as wat dit kan gaan, wat 0° is, dus verwysingshoek&nbsp;=&nbsp;0°, en die familie is 3x = 0° + k · 360°. Deel nou die HELE reël deur 3, elke term daarvan, soos sy dit skryf met die deler onder elke stuk: 3x oor 3 is x, 0° oor 3 is 0°, en k · 360° oor 3 is k · 120°. Dus x = 0° + k · 120°. Voer heelgetalle in: k = 0 gee 0°, k = 1 gee 120°, k = 2 gee 240°, wat verby die einde van die interval is. Twee antwoorde. Die deel-deur-stap is die hele rede waarom 'n 3x-vraag moeiliker is as 'n x-vraag: die oplossings is drie keer nader aan mekaar gepak, en as jy vergeet om die k-term te krimp, steek jy twee derdes van hulle weg.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;120°]&nbsp; for which the identity &nbsp;(sin 3x)/(1 − cos 3x) = (1 + cos 3x)/(sin 3x)&nbsp; is undefined", af: "Bepaal vervolgens die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;120°]&nbsp; waarvoor die identiteit &nbsp;(sin 3x)/(1 − cos 3x) = (1 + cos 3x)/(sin 3x)&nbsp; onbepaald is",
      },
      hint: {
        en: "There are two denominators, one on each side, so there are two conditions. Part (a) has already finished the first one — now do the same job on the other.", af: "Daar is twee noemers, een aan elke kant, dus is daar twee voorwaardes. Deel (a) het die eerste een reeds klaargemaak: doen nou dieselfde werk op die ander een.",
      },
      memo: [
        { type: "step", text: { en: "Two denominators, so two conditions. (a) has already dealt with 1 − cos 3x = 0, giving x = 0° and x = 120°.", af: "Twee noemers, dus twee voorwaardes. (a) het reeds 1 − cos 3x = 0 hanteer, wat x = 0° en x = 120° gee." } },
        { type: "step", text: { en: "The other one: &nbsp;sin 3x = 0, &nbsp;so ref.&nbsp;∠&nbsp;= 0°", af: "Die ander een: &nbsp;sin 3x = 0, &nbsp;dus verwysingshoek&nbsp;=&nbsp;0°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "I: 3x = 0° + k · 360° &nbsp;&nbsp;&nbsp;II: 3x = 180° + k · 360°", af: "I: 3x = 0° + k · 360° &nbsp;&nbsp;&nbsp;II: 3x = 180° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "Divide through by 3: &nbsp;x = 0° + k · 120° &nbsp;or&nbsp; x = 60° + k · 120°, &nbsp;k&nbsp;∈&nbsp;ℤ &nbsp;⟹&nbsp; x = 0°, 60° or 120°", af: "Deel deur 3: &nbsp;x = 0° + k · 120° &nbsp;of&nbsp; x = 60° + k · 120°, &nbsp;k&nbsp;∈&nbsp;ℤ &nbsp;⟹&nbsp; x = 0°, 60° of 120°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Both lists together: &nbsp;x = 0°, &nbsp;60° &nbsp;or&nbsp; 120°", af: "Albei lyste saam: &nbsp;x = 0°, &nbsp;60° &nbsp;of&nbsp; 120°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an identity with a fraction on BOTH sides has a denominator on both sides, and both count. Solving only the left-hand one is the most common way this question loses two marks.", af: "ONTHOU: 'n identiteit met 'n breuk aan ALBEI kante het 'n noemer aan albei kante, en albei tel. Om net die linkse een op te los, is die algemeenste manier waarop hierdie vraag twee punte verloor.",
        } },
      ],
      esplain: {
        en: "An identity is undefined wherever any denominator in the whole line is zero, and this one has a denominator on each side of the equals sign. Part (a) did the left one and found 0° and 120°. The right one is sin 3x = 0, and sine is zero on the horizontal axis, so ref.&nbsp;∠&nbsp;= 0° and the quadrant lines are I and II: 3x = 0° + k · 360° and 3x = 180° + k · 360°. Divide both through by 3 and you get x = 0° + k · 120° and x = 60° + k · 120°. Inside [0°&nbsp;;&nbsp;120°] that produces 0°, 60° and 120°. Now put the two lists together and write each value once: 0°, 60° and 120°. Notice that the sine condition swallowed the cosine one whole — every value from (a) turns up again here. That happens a lot with these pairs, and it is a useful check rather than a mistake.", af: "'n Identiteit is onbepaald waar enige noemer in die hele reël nul is, en hierdie een het 'n noemer aan elke kant van die gelykaanteken. Deel (a) het die linkse een gedoen en 0° en 120° gekry. Die regtse een is sin 3x = 0, en sin is nul op die horisontale as, dus verwysingshoek&nbsp;=&nbsp;0°, en die kwadrantreëls is I en II: 3x = 0° + k · 360° en 3x = 180° + k · 360°. Deel albei deur 3 en jy kry x = 0° + k · 120° en x = 60° + k · 120°. Binne [0°&nbsp;;&nbsp;120°] gee dit 0°, 60° en 120°. Voeg nou die twee lyste saam en skryf elke waarde een keer: 0°, 60° en 120°. Let op dat die sin-voorwaarde die cos-voorwaarde heel ingesluk het: elke waarde uit (a) daag weer hier op. Dit gebeur dikwels met hierdie pare, en dit is 'n nuttige toets eerder as 'n fout.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — HER TEST 7 Q1 SHAPE: simplify, THEN decide when the square root
   is real. The joke of the question is that the root is never the
   problem — the original denominator is.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.iu.q5",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-simplify-then-for-which-x-is-the-root-real",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify &nbsp;E = <span class=\"sfrac\"><span class=\"sf-n\">sin(180° − x) · cos(90° − x)</span><span class=\"sf-d\">1 − cos(−x)</span></span>&nbsp; to a single expression", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Vereenvoudig &nbsp;E = <span class=\"sfrac\"><span class=\"sf-n\">sin(180° − x) · cos(90° − x)</span><span class=\"sf-d\">1 − cos(−x)</span></span>&nbsp; tot 'n enkele uitdrukking",
      },
      hint: {
        en: "Reduce all three angles first — one of them is a co-function and turns into the other ratio. Then look at the top: a squared ratio next to nothing else is usually a masked identity waiting to be factorised.", af: "Reduseer eers al drie hoeke: een van hulle is 'n ko-funksie en word die ander verhouding. Kyk dan na die teller: 'n verhouding in die kwadraat met niks anders langsaan nie, is gewoonlik 'n gemaskerde identiteit wat wag om gefaktoriseer te word.",
      },
      memo: [
        { type: "step", text: { en: "sin(180° − x) = sin x &nbsp;&nbsp;·&nbsp;&nbsp; cos(90° − x) = sin x", af: "sin(180° − x) = sin x &nbsp;&nbsp;·&nbsp;&nbsp; cos(90° − x) = sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(−x) = cos x, so the bottom is &nbsp;1 − cos x", af: "cos(−x) = cos x, dus is die noemer &nbsp;1 − cos x" }, ticks: ["ca"] },
        { type: "step", text: { en: "Top: &nbsp;sin x · sin x = sin²x = 1 − cos²x = (1 − cos x)(1 + cos x)", af: "Teller: &nbsp;sin x · sin x = sin²x = 1 − cos²x = (1 − cos x)(1 + cos x)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "E = ((1 − cos x)(1 + cos x))/(1 − cos x) = 1 + cos x", af: "E = ((1 − cos x)(1 + cos x))/(1 − cos x) = 1 + cos x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: cos(90° − x) = sin x is a <b>co-function</b> — a 90° split is the only split that converts between sin and cos. cos(180° − x) would stay a cosine and only pick up a minus.", af: "ONTHOU: cos(90° − x) = sin x is 'n <b>ko-funksie</b>: 'n 90°-opsplitsing is die enigste opsplitsing wat tussen sin en cos omskakel. cos(180° − x) sou 'n cos bly en net 'n minus kry.",
        } },
      ],
      esplain: {
        en: "Three reductions, then one piece of algebra. sin(180° − x) is a second-quadrant angle where sine is positive, so it stays sin x. cos(90° − x) is a co-function — a 90° split is the only kind that converts between sin and cos — and 90° − x sits in A where everything is positive, so it becomes plus sin x. cos(−x) is a fourth-quadrant form, and cosine is the ratio that survives there, so it is simply cos x. Now the top is sin x times sin x, which is sin²x, and that is one of the masked identities: 1 − cos²x. Written like that it is a difference of two squares, so it splits into (1 − cos x)(1 + cos x). And look what is underneath — 1 − cos x, one of the two brackets you just made. Cancel it, and the whole thing is 1 + cos x.", af: "Drie reduksies, dan een stukkie algebra. sin(180° − x) is 'n hoek in die tweede kwadrant, waar sin positief is, dus bly dit sin x. cos(90° − x) is 'n ko-funksie, want 'n 90°-opsplitsing is die enigste soort wat tussen sin en cos omskakel, en 90° − x lê in A waar alles positief is, dus word dit plus sin x. cos(−x) is 'n vorm in die vierde kwadrant, en cos is die verhouding wat daar oorleef, dus is dit eenvoudig cos x. Nou is die teller sin x keer sin x, wat sin²x is, en dit is een van die gemaskerde identiteite: 1 − cos²x. So geskryf is dit 'n verskil van twee vierkante, dus breek dit op in (1 − cos x)(1 + cos x). En kyk wat onderaan staan: 1 − cos x, een van die twee hakies wat jy pas gemaak het. Kanselleer dit, en die hele ding is 1 + cos x.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; for which &nbsp;√E&nbsp; is real", af: "Bepaal vervolgens die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; waarvoor &nbsp;√E&nbsp; reëel is",
      },
      hint: {
        en: "Two things have to be true, not one. What is under the root may not be negative — and the ORIGINAL expression still has to exist, so its denominator may not be zero. Check both, then put them together.", af: "Twee dinge moet waar wees, nie een nie. Wat onder die wortel staan, mag nie negatief wees nie, en die OORSPRONKLIKE uitdrukking moet steeds bestaan, dus mag sy noemer nie nul wees nie. Toets albei en voeg hulle dan saam.",
      },
      memo: [
        { type: "step", text: { en: "By (a), what sits under the root is simply &nbsp;1 + cos x", af: "Volgens (a) is wat onder die wortel staan eenvoudig &nbsp;1 + cos x" } },
        { type: "step", text: { en: "cos x is never smaller than −1, so 1 + cos x is never negative — the root itself is real for every x", af: "cos x is nooit kleiner as −1 nie, dus is 1 + cos x nooit negatief nie: die wortel self is reëel vir elke x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "But E still has its original denominator: &nbsp;1 − cos x = 0 &nbsp;⟹&nbsp; cos x = 1", af: "Maar E het steeds sy oorspronklike noemer: &nbsp;1 − cos x = 0 &nbsp;⟹&nbsp; cos x = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "x = 0° &nbsp;or&nbsp; x = 360°, and at those two values E does not exist at all", af: "x = 0° &nbsp;of&nbsp; x = 360°, en by daardie twee waardes bestaan E glad nie" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0° &lt; x &lt; 360°", af: "0° &lt; x &lt; 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: simplifying an expression can hide a restriction. 1 + cos x looks perfectly safe everywhere, but the thing it came FROM had 1 − cos x underneath. The restrictions belong to the original, not to the tidy version.", af: "PASOP: as jy 'n uitdrukking vereenvoudig, kan dit 'n beperking wegsteek. 1 + cos x lyk oral heeltemal veilig, maar die ding waarvan dit KOM, het 1 − cos x onderaan gehad. Die beperkings behoort aan die oorspronklike, nie aan die netjiese weergawe nie.",
        } },
      ],
      esplain: {
        en: "There are two separate questions hiding in the word \"real\", and you have to answer both. First: is what sits under the root ever negative? By (a) that is 1 + cos x, and cos x never goes below −1, so 1 + cos x never goes below 0. At x = 180° it is exactly 0, and the square root of 0 is 0, which is perfectly real. So the root is never the problem. Second: does E itself exist? The tidy version, 1 + cos x, looks safe everywhere — but it came from a fraction with 1 − cos x underneath, and that is zero when cos x = 1, which happens at 0° and again at 360°. Those two values were never allowed, and cancelling a bracket does not make them allowed. So the answer is everything strictly between them. The lesson is bigger than this question: restrictions belong to the expression you started with, not the one you tidied it into.", af: "Daar steek twee aparte vrae in die woord \"reëel\", en jy moet albei beantwoord. Eerstens: is wat onder die wortel staan ooit negatief? Volgens (a) is dit 1 + cos x, en cos x gaan nooit onder −1 nie, dus gaan 1 + cos x nooit onder 0 nie. By x = 180° is dit presies 0, en die vierkantswortel van 0 is 0, wat heeltemal reëel is. Die wortel is dus nooit die probleem nie. Tweedens: bestaan E self? Die netjiese weergawe, 1 + cos x, lyk oral veilig, maar dit kom van 'n breuk met 1 − cos x onderaan, en dit is nul wanneer cos x = 1, wat by 0° en weer by 360° gebeur. Daardie twee waardes was nooit toegelaat nie, en om 'n hakie te kanselleer, maak hulle nie toegelaat nie. Die antwoord is dus alles streng tussen hulle. Die les is groter as hierdie vraag: beperkings behoort aan die uitdrukking waarmee jy begin het, nie aan die een waarin jy dit netjies gemaak het nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE TWO NASTIEST. (a) divides BY a tan, so the expression dies
   twice over — once where tan is zero, once where tan does not exist.
   (b) is tan 2x, where the general solution has to be divided through.
   --------------------------------------------------------------- */
const q6 = {
  id: "gtrig.sib.iu.q6",
  chapter: CH,
  topic: "identities-undefined",
  archetype: "undefined-values-dividing-by-a-tan-and-a-compound-tan",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;1/tan x&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;1/tan x&nbsp; onbepaald?",
      },
      hint: {
        en: "Two separate things can go wrong here. You are dividing by tan x, so tan x may not be zero — and tan x has to exist in the first place. Solve both, then put the lists together.", af: "Twee aparte dinge kan hier verkeerd loop. Jy deel deur tan x, dus mag tan x nie nul wees nie, en tan x moet in die eerste plek bestaan. Los albei op en voeg dan die lyste saam.",
      },
      memo: [
        { type: "step", text: { en: "You are dividing BY tan x, so tan x may not be zero: &nbsp;tan x = 0 &nbsp;⟹&nbsp; sin x = 0", af: "Jy deel DEUR tan x, dus mag tan x nie nul wees nie: &nbsp;tan x = 0 &nbsp;⟹&nbsp; sin x = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x = 0°, &nbsp;180° &nbsp;or&nbsp; 360°", af: "x = 0°, &nbsp;180° &nbsp;of&nbsp; 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "And tan x itself has to exist, which needs cos x ≠ 0: &nbsp;cos x = 0 &nbsp;⟹&nbsp; x = 90° or 270°", af: "En tan x self moet bestaan, wat cos x ≠ 0 nodig het: &nbsp;cos x = 0 &nbsp;⟹&nbsp; x = 90° of 270°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 0°, &nbsp;90°, &nbsp;180°, &nbsp;270° &nbsp;or&nbsp; 360°", af: "x = 0°, &nbsp;90°, &nbsp;180°, &nbsp;270° &nbsp;of&nbsp; 360°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this expression fails for TWO different reasons, and most learners find only one of them. tan x = 0 kills the fraction from underneath; cos x = 0 kills the tan itself before the fraction even gets started.", af: "PASOP: hierdie uitdrukking faal om TWEE verskillende redes, en die meeste leerders kry net een daarvan. tan x = 0 maak die breuk van onder af dood; cos x = 0 maak die tan self dood voordat die breuk eers begin.",
        } },
      ],
      esplain: {
        en: "This is the meanest small question on the tile, because it breaks in two different ways and they are easy to confuse. Reason one: the expression is 1 divided by tan x, so tan x is a denominator and may not be zero. tan x is sin x over cos x, and a fraction is zero when its top is zero, so tan x = 0 wherever sin x = 0 — that is 0°, 180° and 360°. Reason two: before you can divide by tan x, tan x has to be a number at all, and tan x does not exist where cos x = 0 — that is 90° and 270°. Both reasons make the expression undefined, so both lists go into the answer: five values in all. If you only ever remember one thing from this card, make it this — when a tan is underneath, check both the tan being zero AND the tan being undefined.", af: "Dit is die gemeenste klein vraag op die teël, want dit breek op twee verskillende maniere, en hulle is maklik om te verwar. Rede een: die uitdrukking is 1 gedeel deur tan x, dus is tan x 'n noemer en mag dit nie nul wees nie. tan x is sin x oor cos x, en 'n breuk is nul wanneer sy bokant nul is, dus is tan x = 0 waar sin x = 0: dit is 0°, 180° en 360°. Rede twee: voordat jy deur tan x kan deel, moet tan x eers 'n getal wees, en tan x bestaan nie waar cos x = 0 nie: dit is 90° en 270°. Albei redes maak die uitdrukking onbepaald, dus gaan albei lyste in die antwoord: altesaam vyf waardes. As jy net een ding van hierdie kaart onthou, laat dit dié een wees: wanneer 'n tan onderaan is, toets of die tan nul is EN of die tan onbepaald is.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "For which values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;tan 2x&nbsp; undefined?", af: "Vir watter waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; is &nbsp;tan 2x&nbsp; onbepaald?",
      },
      hint: {
        en: "Same condition as an ordinary tan — but the angle is 2x, so write the general solution for 2x FIRST and only then divide every term by 2. Remember tan repeats every 180°, not every 360°.", af: "Dieselfde voorwaarde as vir 'n gewone tan, maar die hoek is 2x, dus skryf EERS die algemene oplossing vir 2x en deel eers dan elke term deur 2. Onthou dat tan elke 180° herhaal, nie elke 360° nie.",
      },
      memo: [
        { type: "step", text: { en: "tan 2x = (sin 2x)/(cos 2x), so the condition is &nbsp;cos 2x = 0", af: "tan 2x = (sin 2x)/(cos 2x), dus is die voorwaarde &nbsp;cos 2x = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos is zero at 90°, and the tan family repeats every 180°: &nbsp;2x = 90° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "cos is nul by 90°, en die tan-familie herhaal elke 180°: &nbsp;2x = 90° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["ca"] },
        { type: "step", text: { en: "Divide every term by 2: &nbsp;x = 45° + k · 90°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "Deel elke term deur 2: &nbsp;x = 45° + k · 90°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "In [0°&nbsp;;&nbsp;360°]: &nbsp;x = 45°, &nbsp;135°, &nbsp;225° &nbsp;or&nbsp; 315°", af: "In [0°&nbsp;;&nbsp;360°]: &nbsp;x = 45°, &nbsp;135°, &nbsp;225° &nbsp;of&nbsp; 315°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a 2x inside the ratio packs the answers twice as close together. Four values fit into [0°&nbsp;;&nbsp;360°], not two — walk k up until you overshoot rather than stopping at the first one that looks right.", af: "PASOP: 'n 2x binne die verhouding pak die antwoorde twee keer so naby aan mekaar. Vier waardes pas in [0°&nbsp;;&nbsp;360°], nie twee nie: stap k op totdat jy verbyskiet, eerder as om by die eerste een te stop wat reg lyk.",
        } },
      ],
      esplain: {
        en: "The condition is exactly the same as for an ordinary tan: the bottom, cos 2x, may not be zero. What changes is the bookkeeping. Treat 2x as the unknown and write its general solution first. cos is zero at 90°, and because these values repeat every 180° round the circle, 2x = 90° + k · 180°. Now divide the whole line by 2, every term of it: x = 45° + k · 90°. Then walk k upwards and keep whatever lands inside the interval — k = 0 gives 45°, k = 1 gives 135°, k = 2 gives 225°, k = 3 gives 315°, and k = 4 gives 405°, which has overshot. Four values. The general rule is worth carrying: an angle of 2x doubles how many answers fit into the same interval, and 3x triples them. If you finish with suspiciously few, check whether you divided the k term.", af: "Die voorwaarde is presies dieselfde as vir 'n gewone tan: die onderkant, cos 2x, mag nie nul wees nie. Wat verander, is die boekhouding. Hanteer 2x as die onbekende en skryf eers sy algemene oplossing. cos is nul by 90°, en omdat hierdie waardes elke 180° om die sirkel herhaal, is 2x = 90° + k · 180°. Deel nou die hele reël deur 2, elke term daarvan: x = 45° + k · 90°. Stap dan k op en hou wat binne die interval val: k = 0 gee 45°, k = 1 gee 135°, k = 2 gee 225°, k = 3 gee 315°, en k = 4 gee 405°, wat verbygeskiet het. Vier waardes. Die algemene reël is die moeite werd om saam te neem: 'n hoek van 2x verdubbel hoeveel antwoorde in dieselfde interval pas, en 3x verdriedubbel dit. As jy met verdag min eindig, kyk of jy die k-term gedeel het.",
      },
    },
  ],
};

export const gtrigIdentitiesUndefinedSiblingQuestions = [q1, q2, q3, q4, q5, q6];
