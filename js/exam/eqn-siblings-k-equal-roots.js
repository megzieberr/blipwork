/* ============================================================
   EXAM FOCUS — Equations & Inequalities · SIBLING CARDS for the skill
   "k-equal-roots" (Find k for equal roots).
   (SESSION C1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/C1-eqn-siblings.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHY FOUR AND NOT THREE. The tile held three cards, but one of them —
   eqn.fr.q1(d), the fraction equation that turns into an equal-roots
   question in k — is a LEVEL 4 part, and her ruling 5 (2026-08-23)
   keeps ★ parts off the normal tiles. That card moves to the chapter's
   Level 4 tile (see js/exam/cards-eqn.js), so this tile starts today at
   two and needs four.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · eqn.nor.q2(d)  x(x − 4) = k — k stands where the CONSTANT was,
       Δ = 16 + 4k, one value of k and its equal root;
     · eqn.nor.q3(a)  2x² − 4x + k = 0 — k is the plain constant again,
       Δ = 16 − 8k.
   Both are "k is the c, set Δ = 0, solve a LINEAR equation in k". The
   four below are the four moves that were missing:
     q1  the same easy shape but ending on the EQUAL ROOT itself, so
         the tile has a genuine level-1 way in;
     q2  k in TWO coefficients at once, so Δ = 0 is a QUADRATIC in k and
         there are TWO answers, each with its own equal root;
     q3  the equal-roots question in disguise — "for which k does the
         LINE touch the PARABOLA", where nothing in the wording says
         equal roots at all;
     q4  k inside b, so Δ = 0 gives k² = 144 and the answer carries a ±.

   METHOD: METHODS-algebra.md, hers verbatim — B12(a) (build Δ in terms
   of k, then set it to zero; equal roots is Δ = 0 EXACTLY, one value or
   a few, never a range); B11's table; B1 for factorising the quadratic
   in k; F2's ruling that ± appears when you SOLVE, never when you
   simplify; §0.2 the ∴ habit.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1's nature-of-roots ladder;
   SURVEY-Nov-P1.md Nov 2023 Q1(b) "find k so the roots are equal, where
   the ± carries its own mark" and Nov 2022 Q1(d); SURVEY-Her-2025-
   Assessments.md Test 1 Q4 and Test 6 Q5's tangency-condition question.
   Fresh equations and fresh numbers throughout.

   LEVELS: 1, 3, 3, 2. NOTHING here is level 4. NO DIAGRAM — q3 talks
   about a line and a parabola, but it is solved entirely by algebra and
   the mark scheme never depends on a picture; the sketch is described
   in words in the memo instead.
   ============================================================ */

const PAPER = "siblings";
const CH = "eqn";
const LOST = { chapter: CH, quest: "eq8" };

/* ---------------------------------------------------------------
   q1 — THE WAY IN.  x² + 8x + k = 0 has equal roots when Δ = 0:
   64 − 4k = 0 → k = 16, and the equal root is x = −b/(2a) = −4.
   (Check: x² + 8x + 16 = (x + 4)².)
   --------------------------------------------------------------- */
const q1 = {
  id: "eqn.sib.ker.q1",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "delta-zero-for-k-in-the-constant-then-the-equal-root",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Given: &nbsp;x² + 8x + k = 0, &nbsp;where k is a real number.<br><br>Determine the value of k for which this equation has equal roots.", af: "Gegee: &nbsp;x² + 8x + k = 0, &nbsp;waar k 'n reële getal is.<br><br>Bepaal die waarde van k waarvoor hierdie vergelyking gelyke wortels het.",
      },
      hint: {
        en: "Equal roots always mean one thing about the discriminant. Write Δ down with k standing in the c slot, then set that expression equal to exactly zero and solve for k.", af: "Gelyke wortels beteken altyd een ding oor die diskriminant. Skryf Δ neer met k op die plek van c, stel dan daardie uitdrukking gelyk aan presies nul en los op vir k.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 8 ; &nbsp;c = k &nbsp;&nbsp;∴&nbsp; Δ = b² − 4ac = 8² − 4(1)(k) = 64 − 4k", af: "a = 1 ; &nbsp;b = 8 ; &nbsp;c = k &nbsp;&nbsp;∴&nbsp; Δ = b² − 4ac = 8² − 4(1)(k) = 64 − 4k" }, ticks: ["s/f"] },
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;64 − 4k = 0", af: "Vir gelyke wortels, &nbsp;Δ = 0: &nbsp;&nbsp;64 − 4k = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 16", af: "∴ k = 16" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Swapping a number for a letter does not change the method at all — Δ is still b squared minus four a c, it just comes out as a small expression instead of a single number. The one thing you have to hold on to is what “equal roots” means. It means the two roots have landed on top of each other, which happens only when the plus-or-minus in the formula has nothing to add or subtract, which happens only when Δ is exactly zero. Not nearly zero, not less than zero — exactly. So you set the expression equal to zero and solve an ordinary little equation for k. Sixty-four take away four k is zero, so four k is sixty-four, so k is sixteen.", af: "As jy 'n getal vir 'n letter omruil, verander die metode glad nie: Δ is steeds b kwadraat min vier a c, dit kom net uit as 'n klein uitdrukking in plaas van 'n enkele getal. Die een ding waaraan jy moet vashou, is wat “gelyke wortels” beteken. Dit beteken die twee wortels het bo-op mekaar beland, en dit gebeur net as die plus-of-min in die formule niks het om by te tel of af te trek nie, en dit gebeur net as Δ presies nul is. Nie amper nul nie, nie kleiner as nul nie: presies. Dus stel jy die uitdrukking gelyk aan nul en los 'n gewone klein vergelyking vir k op. Vier-en-sestig min vier k is nul, so vier k is vier-en-sestig, so k is sestien.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Write down the equal root of the equation.", af: "Skryf die gelyke wortel van die vergelyking neer.",
      },
      hint: {
        en: "With Δ = 0 the ± part of the quadratic formula disappears, because there is nothing left to add or take away. What is left of the formula?", af: "As Δ = 0 is, verdwyn die ±-deel van die kwadratiese formule, want daar is niks oor om by te tel of af te trek nie. Wat bly van die formule oor?",
      },
      memo: [
        { type: "step", text: { en: "With Δ = 0 the ± disappears, so the one root left standing is &nbsp;x = −b/(2a)", af: "As Δ = 0 is, verdwyn die ±, so die een wortel wat oorbly, is &nbsp;x = −b/(2a)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −8/2 = −4 &nbsp;&nbsp;∴ the equal root is x = −4", af: "x = −8/2 = −4 &nbsp;&nbsp;∴ die gelyke wortel is x = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: k = 16 is NOT the root — it is the number that makes the equation have equal roots. The root is the x-value. Check it if you like: with k = 16 the equation is x² + 8x + 16 = 0, which factorises to (x + 4)², so x = −4, twice.", af: "ONTHOU: k = 16 is NIE die wortel nie: dit is die getal wat die vergelyking gelyke wortels gee. Die wortel is die x-waarde. Toets dit as jy wil: met k = 16 is die vergelyking x² + 8x + 16 = 0, wat faktoriseer na (x + 4)², so x = −4, twee keer.",
        } },
      ],
      esplain: {
        en: "The quadratic formula has two halves: minus b over two a, and then plus or minus the root of Δ over two a. When Δ is zero the second half vanishes completely, so only the first half survives — and that is why an equal root is always just minus b over two a. It is also the x-value of the turning point, which makes sense: equal roots mean the parabola is resting on the x-axis at exactly one point, and the only point where a parabola touches without crossing is its turning point. Two things to keep apart in your answer: k is the value that makes it happen, and x is where it happens. The question here asks for x.", af: "Die kwadratiese formule het twee helftes: min b oor twee a, en dan plus of min die wortel van Δ oor twee a. As Δ nul is, verdwyn die tweede helfte heeltemal, so net die eerste helfte bly oor, en daarom is 'n gelyke wortel altyd net min b oor twee a. Dit is ook die x-waarde van die draaipunt, en dit maak sin: gelyke wortels beteken die parabool rus op presies een punt op die x-as, en die enigste punt waar 'n parabool raak sonder om te sny, is sy draaipunt. Hou twee dinge in jou antwoord uitmekaar: k is die waarde wat dit laat gebeur, en x is waar dit gebeur. Die vraag hier vra x.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — k IN TWO COEFFICIENTS: Δ = 0 becomes a QUADRATIC in k.
   x² + 2kx + (3k + 4) = 0 · Δ = 4k² − 12k − 16 = 4(k − 4)(k + 1)
   → k = 4 or k = −1, with equal roots x = −k = −4 and x = 1.
   --------------------------------------------------------------- */
const q2 = {
  id: "eqn.sib.ker.q2",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "k-in-two-coefficients-quadratic-in-k-two-answers",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Given: &nbsp;x² + 2kx + (3k + 4) = 0, &nbsp;where k is a real number.<br><br>Show that &nbsp;Δ = 4k² − 12k − 16.", af: "Gegee: &nbsp;x² + 2kx + (3k + 4) = 0, &nbsp;waar k 'n reële getal is.<br><br>Toon aan dat &nbsp;Δ = 4k² − 12k − 16.",
      },
      hint: {
        en: "Write a, b and c down before you touch the formula, and take the WHOLE of 3k + 4 as c, bracket and all. Then square the b carefully — the 2 gets squared too.", af: "Skryf a, b en c neer voordat jy aan die formule raak, en neem die HELE 3k + 4 as c, hakie en al. Kwadreer dan die b versigtig: die 2 word ook gekwadreer.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 ; &nbsp;b = 2k ; &nbsp;c = 3k + 4", af: "a = 1 ; &nbsp;b = 2k ; &nbsp;c = 3k + 4" } },
        { type: "step", text: { en: "Δ = b² − 4ac = (2k)² − 4(1)(3k + 4)", af: "Δ = b² − 4ac = (2k)² − 4(1)(3k + 4)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(2k)² = 4k², &nbsp;and &nbsp;−4(3k + 4) = −12k − 16", af: "(2k)² = 4k², &nbsp;en &nbsp;−4(3k + 4) = −12k − 16" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ Δ = 4k² − 12k − 16", af: "∴ Δ = 4k² − 12k − 16" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2k)² is 4k², not 2k². The bracket means the 2 is squared as well as the k. And the −4 has to reach BOTH terms of 3k + 4, so it is −12k − 16, not −12k + 4.", af: "PASOP: (2k)² is 4k², nie 2k² nie. Die hakie beteken die 2 word ook gekwadreer, nie net die k nie. En die −4 moet ALBEI terme van 3k + 4 bereik, so dit is −12k − 16, nie −12k + 4 nie.",
        } },
      ],
      esplain: {
        en: "Nothing new is happening here — it is the same substitution you have done all year, except b and c are little expressions instead of plain numbers. Two habits keep it safe. First, write a, b and c on their own line before going near the formula, so you can see that c is the whole bracket rather than just the 3k. Second, keep the brackets on while you square and while you multiply, because that is where the marks quietly leak away. Squaring 2k means squaring both the 2 and the k, and multiplying minus four into a two-term bracket means both terms change. What you end up with is a quadratic expression in k, and the shape of that expression is the whole point of the next part.", af: "Hier gebeur niks nuuts nie: dit is dieselfde vervanging wat jy die hele jaar al doen, net is b en c klein uitdrukkings in plaas van gewone getalle. Twee gewoontes hou dit veilig. Eerstens, skryf a, b en c op hul eie reël neer voordat jy naby die formule kom, sodat jy kan sien dat c die hele hakie is en nie net die 3k nie. Tweedens, hou die hakies aan terwyl jy kwadreer en terwyl jy vermenigvuldig, want dit is waar die punte stilletjies wegsyfer. Om 2k te kwadreer, beteken jy kwadreer die 2 en die k, en as jy min vier in 'n hakie met twee terme in vermenigvuldig, verander albei terme. Wat jy uiteindelik kry, is 'n kwadratiese uitdrukking in k, en die vorm van daardie uitdrukking is die hele punt van die volgende deel.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the equation has equal roots.", af: "Bepaal gevolglik die waardes van k waarvoor die vergelyking gelyke wortels het.",
      },
      hint: {
        en: "Equal roots still means Δ = 0 — but this time setting it to zero gives you a quadratic in k, not a linear one. Look for a common factor first, then factorise what is left.", af: "Gelyke wortels beteken steeds Δ = 0, maar hierdie keer gee dit jou 'n kwadratiese vergelyking in k as jy dit aan nul gelykstel, nie 'n lineêre een nie. Soek eers 'n gemene faktor, en faktoriseer dan wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;4k² − 12k − 16 = 0", af: "Vir gelyke wortels, &nbsp;Δ = 0: &nbsp;&nbsp;4k² − 12k − 16 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide right through by 4: &nbsp;k² − 3k − 4 = 0 &nbsp;⟹&nbsp; (k − 4)(k + 1) = 0", af: "Deel alles deur 4: &nbsp;k² − 3k − 4 = 0 &nbsp;⟹&nbsp; (k − 4)(k + 1) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 4 &nbsp;&nbsp;or&nbsp;&nbsp; k = −1", af: "∴ k = 4 &nbsp;&nbsp;of&nbsp;&nbsp; k = −1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: “equal roots” is still Δ = 0 EXACTLY — but Δ = 0 is only a single-answer question when Δ is linear in k. Here Δ is quadratic in k, so there are TWO values of k that do the job, and both of them are part of the answer.", af: "ONTHOU: “gelyke wortels” is steeds PRESIES Δ = 0, maar Δ = 0 het net een antwoord as Δ lineêr in k is. Hier is Δ kwadraties in k, so daar is TWEE waardes van k wat werk, en albei is deel van die antwoord.",
        } },
      ],
      esplain: {
        en: "This is the card where the equal-roots rule stops being a recipe and starts being a real question. The rule itself has not moved: equal roots still means the discriminant is exactly zero. What has changed is what that sentence gives you. Because k appeared in two places in the original equation, Δ came out with a k squared in it — so setting it to zero is solving an ordinary quadratic, and an ordinary quadratic has two solutions. Take the common factor of four out first; it makes the trinomial small and friendly. Then two numbers that multiply to minus four and add to minus three are minus four and plus one. Both answers count, and each one produces a completely different equation with its own equal root.", af: "Dit is die kaart waar die gelyke-wortels-reël ophou om 'n resep te wees en 'n regte vraag word. Die reël self bly dieselfde: gelyke wortels beteken steeds die diskriminant is presies nul. Wat verander het, is wat daardie sin jou gee. Omdat k op twee plekke in die oorspronklike vergelyking voorgekom het, het Δ met 'n k kwadraat daarin uitgekom, so om dit aan nul gelyk te stel, is om 'n gewone kwadratiese vergelyking op te los, en 'n gewone kwadratiese vergelyking het twee oplossings. Haal eers die gemene faktor vier uit; dit maak die drieterm klein en vriendelik. Dan is die twee getalle wat vermenigvuldig tot min vier en optel tot min drie, min vier en plus een. Albei antwoorde tel, en elkeen gee 'n heeltemal ander vergelyking met sy eie gelyke wortel.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "For each of your values of k, write down the equal root of the equation.", af: "Skryf vir elkeen van jou waardes van k die gelyke wortel van die vergelyking neer.",
      },
      hint: {
        en: "Use x = −b/(2a) again, but leave k in it first — that gives you one short expression you can use twice.", af: "Gebruik weer x = −b/(2a), maar los eers k daarin: dit gee jou een kort uitdrukking wat jy twee keer kan gebruik.",
      },
      memo: [
        { type: "step", text: { en: "The equal root is &nbsp;x = −b/(2a) = −2k/2 = −k", af: "Die gelyke wortel is &nbsp;x = −b/(2a) = −2k/2 = −k" }, ticks: ["ca"] },
        { type: "answer", text: { en: "k = 4 &nbsp;gives&nbsp; x = −4 &nbsp;&nbsp;(x² + 8x + 16 = 0)&nbsp;&nbsp;·&nbsp;&nbsp; k = −1 &nbsp;gives&nbsp; x = 1 &nbsp;&nbsp;(x² − 2x + 1 = 0)", af: "k = 4 &nbsp;gee&nbsp; x = −4 &nbsp;&nbsp;(x² + 8x + 16 = 0)&nbsp;&nbsp;·&nbsp;&nbsp; k = −1 &nbsp;gee&nbsp; x = 1 &nbsp;&nbsp;(x² − 2x + 1 = 0)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Because b is 2k, minus b over two a tidies up beautifully: minus two k over two is just minus k. So the equal root is always the opposite of whatever k turns out to be, and one line of work covers both answers instead of two separate calculations. It is worth writing the two finished equations out beside the roots, as the answer line does. With k equal to four the equation becomes x squared plus eight x plus sixteen, which is x plus four all squared. With k equal to minus one it becomes x squared minus two x plus one, which is x minus one all squared. Both are perfect squares, and a perfect square is exactly what equal roots look like when you factorise them.", af: "Omdat b gelyk is aan 2k, werk min b oor twee a pragtig uit: min twee k oor twee is net min k. Die gelyke wortel is dus altyd die teenoorgestelde van wat k ook al is, en een reël werk dek albei antwoorde in plaas van twee aparte berekeninge. Dit is die moeite werd om die twee klaar vergelykings langs die wortels uit te skryf, soos die antwoordreël doen. As k gelyk is aan vier, word die vergelyking x kwadraat plus agt x plus sestien, wat x plus vier, alles in die kwadraat, is. As k gelyk is aan min een, word dit x kwadraat min twee x plus een, wat x min een, alles in die kwadraat, is. Albei is volkome vierkante, en 'n volkome vierkant is presies hoe gelyke wortels lyk as jy hulle faktoriseer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EQUAL ROOTS IN DISGUISE: the line that TOUCHES the parabola.
   y = kx + 1 and y = x² + 3x + 5 meet where x² + (3 − k)x + 4 = 0.
   Tangent ⟹ one point ⟹ Δ = 0: (3 − k)² = 16 → k = −1 or k = 7.
   --------------------------------------------------------------- */
const q3 = {
  id: "eqn.sib.ker.q3",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "line-tangent-to-parabola-hidden-equal-roots-condition",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The line &nbsp;y = kx + 1&nbsp; and the parabola &nbsp;y = x² + 3x + 5&nbsp; are drawn on the same set of axes.<br><br>Show that the x-coordinate of any point where they meet satisfies &nbsp;x² + (3 − k)x + 4 = 0.", af: "Die lyn &nbsp;y = kx + 1&nbsp; en die parabool &nbsp;y = x² + 3x + 5&nbsp; is op dieselfde assestelsel geteken.<br><br>Toon aan dat die x-koördinaat van enige punt waar hulle mekaar ontmoet, voldoen aan &nbsp;x² + (3 − k)x + 4 = 0.",
      },
      hint: {
        en: "At a point where two graphs meet, they share the same x AND the same y. So put the two right-hand sides equal to each other and bring everything to one side.", af: "Waar twee grafieke mekaar ontmoet, deel hulle dieselfde x EN dieselfde y. Stel dus die twee regterkante gelyk aan mekaar en bring alles na een kant.",
      },
      memo: [
        { type: "step", text: { en: "Where the graphs meet, the two y-values are the same, so put the two expressions equal:", af: "Waar die grafieke mekaar ontmoet, is die twee y-waardes dieselfde, so stel die twee uitdrukkings gelyk:" } },
        { type: "step", text: { en: "x² + 3x + 5 = kx + 1", af: "x² + 3x + 5 = kx + 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Everything to the left: &nbsp;x² + 3x − kx + 5 − 1 = 0", af: "Alles na links: &nbsp;x² + 3x − kx + 5 − 1 = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The two x terms share an x, so take it out: &nbsp;x² + (3 − k)x + 4 = 0", af: "Die twee x-terme deel 'n x, so haal dit uit: &nbsp;x² + (3 − k)x + 4 = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two graphs meeting is not a new idea dressed up as one — it is the ordinary “solve them together” move. A point that is on both graphs has one x and one y, so whatever the line says y is must equal whatever the parabola says y is. Setting the two expressions equal turns a picture question into an equation question in a single line. After that it is bookkeeping: take everything to the left so the equation reads equals zero, and notice that 3x and −kx are both x terms, so they collect into one bracket. What you are left with looks like an ordinary quadratic with a slightly odd b — and that odd b is where all the information about the line is hiding.", af: "Twee grafieke wat mekaar ontmoet, is nie 'n nuwe idee in 'n vermomming nie: dit is die gewone “los hulle saam op”-stap. 'n Punt wat op albei grafieke lê, het een x en een y, so wat die lyn sê y is, moet gelyk wees aan wat die parabool sê y is. As jy die twee uitdrukkings gelykstel, word 'n prentjievraag in een reël 'n vergelykingvraag. Daarna is dit boekhouding: bring alles na links sodat die vergelyking gelyk aan nul is, en let op dat 3x en −kx albei x-terme is, so hulle kom saam in een hakie. Wat oorbly, lyk soos 'n gewone kwadratiese vergelyking met 'n effens vreemde b, en in daardie vreemde b skuil al die inligting oor die lyn.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence determine the values of k for which the line is a <b>tangent</b> to the parabola.", af: "Bepaal gevolglik die waardes van k waarvoor die lyn 'n <b>raaklyn</b> aan die parabool is.",
      },
      hint: {
        en: "A tangent touches a curve at exactly ONE point. How many solutions does that mean the equation in (a) has — and what does that say about its discriminant?", af: "'n Raaklyn raak 'n kurwe by presies EEN punt. Hoeveel oplossings het die vergelyking in (a) dan, en wat sê dit oor sy diskriminant?",
      },
      memo: [
        { type: "step", text: { en: "A tangent touches the parabola at exactly <b>one</b> point, so the equation in (a) has <b>equal roots</b> &nbsp;⟹&nbsp; Δ = 0", af: "'n Raaklyn raak die parabool by presies <b>een</b> punt, so die vergelyking in (a) het <b>gelyke wortels</b> &nbsp;⟹&nbsp; Δ = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Δ = (3 − k)² − 4(1)(4) = 0 &nbsp;⟹&nbsp; (3 − k)² = 16", af: "Δ = (3 − k)² − 4(1)(4) = 0 &nbsp;⟹&nbsp; (3 − k)² = 16" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take the square root of both sides — and because you are <b>solving</b>, the ± appears: &nbsp;3 − k = ±4", af: "Neem die vierkantswortel van albei kante, en omdat jy <b>oplos</b>, verskyn die ±: &nbsp;3 − k = ±4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3 − k = 4 &nbsp;gives&nbsp; k = −1, &nbsp;and&nbsp; 3 − k = −4 &nbsp;gives&nbsp; k = 7 &nbsp;&nbsp;∴ k = −1 &nbsp;or&nbsp; k = 7", af: "3 − k = 4 &nbsp;gee&nbsp; k = −1, &nbsp;en&nbsp; 3 − k = −4 &nbsp;gee&nbsp; k = 7 &nbsp;&nbsp;∴ k = −1 &nbsp;of&nbsp; k = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the word “equal roots” never appears in this question — “tangent” and “touches at one point” are how a paper says it. And the ± is worth its own mark, so both values of k have to be handed in. Losing the negative branch here loses half the answer.", af: "ONTHOU: die woorde “gelyke wortels” kom nooit in hierdie vraag voor nie: “raaklyn” en “raak by een punt” is hoe 'n vraestel dit sê. En die ± is sy eie punt werd, so albei waardes van k moet ingehandig word. As jy die negatiewe tak hier verloor, verloor jy die helfte van die antwoord.",
        } },
      ],
      esplain: {
        en: "The whole difficulty of this question is spotting what is being asked, and once you see it there is no new maths at all. A line can miss a parabola, cut through it twice, or touch it once. Those three pictures are exactly the three discriminant cases of the equation you built in part (a): no real roots, two real roots, or equal roots. Touching once is the middle case, so Δ has to be zero. From there it is arithmetic. The bracket squared equals sixteen, and when you take the square root of both sides to SOLVE, both the plus and the minus branch count — four squared is sixteen and so is minus four squared. That hands you two lines, one sloping down and one sloping up, each resting against the parabola at a single point.", af: "Die hele moeilikheid van hierdie vraag is om raak te sien wat gevra word, en sodra jy dit sien, is daar glad geen nuwe wiskunde nie. 'n Lyn kan 'n parabool mis, dit twee keer sny, of dit een keer raak. Daardie drie prentjies is presies die drie diskriminantgevalle van die vergelyking wat jy in deel (a) gebou het: geen reële wortels nie, twee reële wortels, of gelyke wortels. Een keer raak is die middelste geval, so Δ moet nul wees. Van daar af is dit rekenwerk. Die hakie in die kwadraat is gelyk aan sestien, en as jy die vierkantswortel van albei kante neem om OP TE LOS, tel die plus-tak en die min-tak albei: vier in die kwadraat is sestien, en min vier in die kwadraat ook. Dit gee jou twee lyne, een wat afwaarts loop en een wat opwaarts loop, en elkeen rus by 'n enkele punt teen die parabool.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — k INSIDE b, so Δ = 0 gives k² = 144 and the answer carries ±.
   3x² − kx + 12 = 0 · Δ = k² − 144 = 0 → k = ±12.
   --------------------------------------------------------------- */
const q4 = {
  id: "eqn.sib.ker.q4",
  chapter: CH,
  topic: "k-equal-roots",
  archetype: "k-inside-b-delta-zero-gives-plus-minus-answer",
  paper: PAPER,
  lostQuest: LOST,
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the value(s) of k for which &nbsp;3x² − kx + 12 = 0&nbsp; has two equal roots.", af: "Bepaal die waarde(s) van k waarvoor &nbsp;3x² − kx + 12 = 0&nbsp; twee gelyke wortels het.",
      },
      hint: {
        en: "This time k sits where b usually is, so it gets squared. Set Δ = 0 and remember that a square root taken while SOLVING has two branches.", af: "Hierdie keer sit k waar b gewoonlik is, so dit word gekwadreer. Stel Δ = 0 en onthou dat 'n vierkantswortel wat jy neem terwyl jy OPLOS, twee takke het.",
      },
      memo: [
        { type: "step", text: { en: "a = 3 ; &nbsp;b = −k ; &nbsp;c = 12 &nbsp;&nbsp;∴&nbsp; Δ = (−k)² − 4(3)(12) = k² − 144", af: "a = 3 ; &nbsp;b = −k ; &nbsp;c = 12 &nbsp;&nbsp;∴&nbsp; Δ = (−k)² − 4(3)(12) = k² − 144" }, ticks: ["s/f"] },
        { type: "step", text: { en: "For equal roots, &nbsp;Δ = 0: &nbsp;&nbsp;k² − 144 = 0 &nbsp;⟹&nbsp; k² = 144", af: "Vir gelyke wortels, &nbsp;Δ = 0: &nbsp;&nbsp;k² − 144 = 0 &nbsp;⟹&nbsp; k² = 144" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k = 12 &nbsp;&nbsp;or&nbsp;&nbsp; k = −12", af: "∴ k = 12 &nbsp;&nbsp;of&nbsp;&nbsp; k = −12" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (−k)² is k², not −k². Squaring kills the minus sign. And k² = 144 has TWO answers — a ± appears whenever you SOLVE by taking an even root, even though √144 on its own is simply 12.", af: "ONTHOU: (−k)² is k², nie −k² nie. Kwadreer maak die minusteken dood. En k² = 144 het TWEE antwoorde: 'n ± verskyn elke keer as jy OPLOS deur 'n ewe wortel te trek, al is √144 op sy eie net 12.",
        } },
      ],
      esplain: {
        en: "When k lands in the b slot it gets squared, and that changes the shape of the answer. Everything up to the last line is the usual routine: substitute, keeping the minus k inside its own brackets, and notice that squaring it makes the minus disappear. Setting Δ to zero then leaves k squared equal to one hundred and forty-four. Here is the moment worth being careful about. Twelve squared is one hundred and forty-four, and so is minus twelve squared, so both are genuine answers. That is the difference her notes draw between simplifying and solving: the root sign on its own means the positive one, but an equation with a squared unknown has two solutions and both belong in your answer. Two different equations, each with its own equal root.", af: "As k op die plek van b beland, word dit gekwadreer, en dit verander die vorm van die antwoord. Alles tot by die laaste reël is die gewone roetine: vervang, hou die min k binne sy eie hakies, en let op dat die minus verdwyn as jy dit kwadreer. As jy Δ aan nul gelykstel, bly k kwadraat gelyk aan honderd vier-en-veertig oor. Dit is die oomblik waar jy versigtig moet wees. Twaalf in die kwadraat is honderd vier-en-veertig, en min twaalf in die kwadraat ook, so albei is egte antwoorde. Dit is die verskil wat haar notas tussen vereenvoudig en oplos tref: die wortelteken op sy eie beteken die positiewe een, maar 'n vergelyking met 'n onbekende in die kwadraat het twee oplossings, en albei hoort in jou antwoord. Twee verskillende vergelykings, elkeen met sy eie gelyke wortel.",
      },
    },
  ],
};

export const eqnKEqualRootsSiblingQuestions = [q1, q2, q3, q4];
