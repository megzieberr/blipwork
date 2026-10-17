/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "inequalities"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   WHY THIS FILE EXISTS. "Inequalities" held two cards, both about a
   single hyperbola — func.hyp.t1q4(e) asking where h ≤ 0, and
   func.hyp.t2q3(c,d) asking where h < −2. A learner who tapped
   "Another one!" twice ran out, and never met the product, the
   quotient, the x·f(x) variant, or f against g at all.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp46–51: the meaning table for f > 0, f < 0, f·g ≷ 0, f/g ≷ 0
   with g ≠ 0, and x·f(x) ≷ 0 by quadrant signs; her p8's "ALWAYS write
   x first"; and the METHOD that governs everything in this file —

     CUT A LINE THROUGH EVERY x-INTERCEPT, EVERY ASYMPTOTE AND (for
     f against g) EVERY INTERSECTION, THEN PAINT + OR − ON EACH PIECE
     AND READ THE ANSWER OFF.

   That is her current board method. THE SIGN TABLE — the tekentabel —
   appears nowhere in this file and must never be added to it: she moved
   off it after watching learners struggle, and the digest records that
   where her notes and older app code disagree, the notes win.
   Question TYPES and METHODS hers; every number here is fresh, and none
   of the digest's four flagged slips is mined.

   WHAT THE FOUR COVER:
     q1  the plain pair off one sad parabola — f(x) > 0 and f(x) ≤ 0,
         and the difference the equals sign makes at the ends
     q2  f·g ≥ 0 and f/g < 0 on the same parabola-and-line picture, so
         the learner sees that the SIGNS are identical and only the
         END POINTS differ
     q3  a hyperbola: h(x) ≥ 0 — the ≥ at an asymptote, one end closed
         and one end that can never close — then x·h(x) ≤ 0, her
         quadrant-sign variant, whose extra cut line IS the y-axis
     q4  f against g — find the intersections first, then cut a line
         through each of them

   THE PAINT SHOWS UP ON THE REVEAL. The question side carries only the
   cut points the learner is GIVEN — the intercepts and, once found, the
   intersections — and the REVEAL paints the answer as a shaded strip
   bounded by the cut lines it used (js/exam/_schema.js's "the reveal
   draws what it found"). An asymptote is already a dashed line on the
   question side, so it is never re-drawn as a cut line; and in q3(b)
   the cut at x = 0 is the y-axis itself, which is exactly the point
   the memo makes.

   LEVELS: mostly 1–2, exactly one level 3 — q3(b), the only part that
   has to combine a quadrant-sign cut with an asymptote. Nothing here
   is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — THE PLAIN PAIR OFF ONE SKETCH (her pp46–51, p8).
   f(x) = −x² + 2x + 8, a sad parabola cutting the x-axis at −2 and 4.
     (a) f(x) > 0   ⟹  −2 < x < 4
     (b) f(x) ≤ 0   ⟹  x ≤ −2 or x ≥ 4
   Both x-intercepts are GIVEN in the stem, so both sit on the figure
   from the start; only the painted strips belong to the reveals.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: -1, b: 2, c: 8 };
const Q1_XA = { x: -2, y: 0, on: 0, label: "(−2 ; 0)" };
const Q1_XB = { x: 4, y: 0, on: 0, label: "(4 ; 0)" };
const Q1_CUTS = [{ x: -2 }, { x: 4 }];
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 7, ymin: -8, ymax: 11 },
    curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: 3.5 }],
    points: [Q1_XA, Q1_XB],
  },
  parts: {
    a: { question: {}, reveal: { vlines: Q1_CUTS, shades: [{ x0: -2, x1: 4 }] } },
    b: { question: {}, reveal: { vlines: Q1_CUTS, shades: [{ x0: -5, x1: -2 }, { x0: 4, x1: 7 }] } },
  },
};

const q1 = {
  id: "func.sib.ineq.q1",
  chapter: CH,
  topic: "inequalities",
  archetype: "f-positive-and-f-negative-off-a-parabola-sketch",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −x² + 2x + 8. &nbsp;It cuts the x-axis at (−2 ; 0) and (4 ; 0).<br><br>For which values of x is &nbsp;f(x) &gt; 0?", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = −x² + 2x + 8. &nbsp;Dit sny die x-as by (−2 ; 0) en (4 ; 0).<br><br>Vir watter waardes van x is &nbsp;f(x) &gt; 0?",
      },
      hint: {
        en: "f(x) is the HEIGHT of the graph, so f(x) &gt; 0 is asking where the curve is above the x-axis. Cut a line through each x-intercept and look at the piece in the middle.", af: "f(x) is die HOOGTE van die grafiek, dus vra f(x) &gt; 0 waar die kurwe bo die x-as is. Sny met 'n vertikale lyn deur elke x-afsnit en kyk na die interval in die middel.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept</b> — here x = −2 and x = 4 — then <b>paint</b> the sign of f on each piece:", af: "Sny met 'n vertikale lyn deur <b>elke x-afsnit</b>, hier x = −2 en x = 4, en <b>verf</b> dan die teken van f op elke interval:" } },
        { type: "step", text: { en: "left of −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; between −2 and 4: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of 4: &nbsp;<b>−</b>", af: "links van −2: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; tussen −2 en 4: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; regs van 4: &nbsp;<b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f(x) &gt; 0 is the painted + piece &nbsp;&nbsp;∴&nbsp; −2 &lt; x &lt; 4", af: "f(x) &gt; 0 is die geverfde + interval &nbsp;&nbsp;∴&nbsp; −2 &lt; x &lt; 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the answer is about x, so write x. Answering “y &gt; 0” or just “above the axis” earns nothing — and because the sign is a strict &gt;, both ends stay open.", af: "PASOP: die antwoord gaan oor x, dus skryf x. As jy “y &gt; 0” of net “bo die as” antwoord, kry jy niks, en omdat die teken 'n streng &gt; is, bly albei eindpunte oop.",
        } },
      ],
      esplain: {
        en: "f(x) is not a mysterious symbol here — it is the height of the curve above or below the x-axis at that x. So asking where f(x) is positive is asking where the curve is drawn above the axis, which you can see. The reason the cut lines work is that a graph can only change from + to − by passing through the axis, so once you know where the crossings are, the sign cannot change anywhere in between. That is why one glance settles a whole piece. This parabola is sad, so it climbs above the axis between its two crossings and drops below on both sides — the + piece is the middle one. Two habits she marks: write the answer in x, and read the inequality sign before you close any bracket. Strictly greater than zero means the crossings themselves are out, because at −2 and at 4 the height is exactly zero, not more than zero.", af: "f(x) is hier nie 'n geheimsinnige simbool nie: dit is die hoogte van die kurwe bo of onder die x-as by daardie x. Om te vra waar f(x) positief is, is dus om te vra waar die kurwe bo die as geteken is, en dit kan jy sien. Die snylyne werk omdat 'n grafiek net van + na − kan verander deur die as te kruis, dus sodra jy weet waar die snypunte is, kan die teken nêrens tussenin verander nie. Daarom is een kyk genoeg vir 'n hele interval. Hierdie parabool is sad, dus klim dit tussen sy twee snypunte bo die as uit en sak dit aan albei kante onder die as: die + interval is die middelste een. Twee gewoontes waarvoor sy punte gee: skryf die antwoord in x, en lees die ongelykheidsteken voordat jy enige hakie toemaak. Streng groter as nul beteken die snypunte self is uit, want by −2 en by 4 is die hoogte presies nul, nie meer as nul nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x) ≤ 0?", af: "Vir watter waardes van x is &nbsp;f(x) ≤ 0?",
      },
      hint: {
        en: "Same cut lines, same painted signs — you want the other pieces this time. Then look hard at the equals half of the ≤ and decide whether the two crossings are in or out.", af: "Dieselfde snylyne, dieselfde geverfde tekens: hierdie keer wil jy die ander intervalle hê. Kyk dan mooi na die gelyk-aan-deel van die ≤ en besluit of die twee snypunte in of uit is.",
      },
      memo: [
        { type: "step", text: { en: "The painted − pieces are the two outside ones. And because the sign is ≤, the values where f is exactly 0 are included as well — that is both crossings.", af: "Die intervalle wat − geverf is, is die twee buitenste. En omdat die teken ≤ is, is die waardes waar f presies 0 is ook ingesluit: dit is albei snypunte." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x ≤ −2 &nbsp;&nbsp;or&nbsp;&nbsp; x ≥ 4", af: "∴ x ≤ −2 &nbsp;&nbsp;of&nbsp;&nbsp; x ≥ 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this answer is two separate pieces, joined by the word <b>or</b>. Writing −2 ≥ x ≥ 4 says nothing at all — no number is both smaller than −2 and bigger than 4 at the same time.", af: "PASOP: hierdie antwoord is twee aparte intervalle, verbind deur die woord <b>of</b>. As jy −2 ≥ x ≥ 4 skryf, sê dit glad niks nie: geen getal is terselfdertyd kleiner as −2 en groter as 4 nie.",
        } },
      ],
      esplain: {
        en: "Nothing new has to be worked out here: the cut lines and the painted signs from (a) do the whole job, and all that changes is which pieces you hand in and whether the ends are closed. The ≤ is doing two things at once — less than zero, which is the two outside pieces, and equal to zero, which happens at exactly the two crossings. So both crossings come inside the answer and the brackets close. The other half of the marks is in how you write it. An answer made of two separate pieces cannot be squeezed into one chain of inequalities; it needs the word or, because a number qualifies by being in one piece or the other, never both. Say it out loud as “x is at most −2, or x is at least 4” and the shape of the written answer follows.", af: "Niks nuuts hoef hier uitgewerk te word nie: die snylyne en die geverfde tekens van (a) doen al die werk, en al wat verander, is watter intervalle jy inhandig en of die eindpunte geslote is. Die ≤ doen twee dinge tegelyk: kleiner as nul, wat die twee buitenste intervalle is, en gelyk aan nul, wat presies by die twee snypunte gebeur. Albei snypunte kom dus binne die antwoord en die hakies maak toe. Die ander helfte van die punte lê in hoe jy dit skryf. 'n Antwoord wat uit twee aparte intervalle bestaan, kan nie in een ketting van ongelykhede ingedruk word nie; dit het die woord “of” nodig, want 'n getal tel deur in die een interval of die ander te wees, nooit in albei nie. Sê dit hardop as “x is hoogstens −2, of x is minstens 4”, en die vorm van die geskrewe antwoord volg vanself.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — f·g AND f/g ON ONE PICTURE (her pp46–51 meaning table).
   f(x) = x² − 9, cutting at −3 and 3; g(x) = x + 1, cutting at −1.
   Cut lines at −3, −1 and 3 for BOTH parts.
     (a) f(x)·g(x) ≥ 0  ⟹  −3 ≤ x ≤ −1  or  x ≥ 3
     (b) f(x)/g(x) < 0  ⟹  x < −3  or  −1 < x < 3
   The pair is deliberate: the painted signs are IDENTICAL, and only
   the end points differ — g = 0 can be included in a product but never
   in a quotient.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: 0, c: -9 };
const Q2_G = { kind: "line", a: 1, q: 1 };
/* NO `place` on these three, deliberately — checked at 375 px both ways
   on 2026-08-22. Three cut points sit on one x-axis here, and the
   placer's own most-constrained-first pass staggers them nicely, each
   label just left of its own dot and alternating above/below the axis.
   Forcing "above"/"below" makes it WORSE: two of them end up side by
   side under the axis with one drawn through g. */
const Q2_FA = { x: -3, y: 0, on: 0, label: "(−3 ; 0)" };
const Q2_FB = { x: 3, y: 0, on: 0, label: "(3 ; 0)" };
const Q2_GA = { x: -1, y: 0, on: 1, label: "(−1 ; 0)" };
const Q2_CUTS = [{ x: -3 }, { x: -1 }, { x: 3 }];
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 6, ymin: -11, ymax: 8 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: -3.6 },
      { ...Q2_G, tone: "b", label: "g", labelAt: 4.5 },
    ],
    points: [Q2_FA, Q2_FB, Q2_GA],
  },
  parts: {
    a: { question: {}, reveal: { vlines: Q2_CUTS, shades: [{ x0: -3, x1: -1 }, { x0: 3, x1: 6 }] } },
    b: { question: {}, reveal: { vlines: Q2_CUTS, shades: [{ x0: -6, x1: -3 }, { x0: -1, x1: 3 }] } },
  },
};

const q2 = {
  id: "func.sib.ineq.q2",
  chapter: CH,
  topic: "inequalities",
  archetype: "product-and-quotient-sign-inequalities-off-one-sketch",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = x² − 9&nbsp; and&nbsp; g(x) = x + 1. &nbsp;f cuts the x-axis at (−3 ; 0) and (3 ; 0), and g cuts it at (−1 ; 0).<br><br>For which values of x is &nbsp;f(x)·g(x) ≥ 0?", af: "Die skets toon &nbsp;f(x) = x² − 9&nbsp; en&nbsp; g(x) = x + 1. &nbsp;f sny die x-as by (−3 ; 0) en (3 ; 0), en g sny dit by (−1 ; 0).<br><br>Vir watter waardes van x is &nbsp;f(x)·g(x) ≥ 0?",
      },
      hint: {
        en: "A product is positive when the two graphs have the SAME sign and negative when they have opposite signs. So cut a line through every x-intercept of both graphs — that is three cut lines — and paint f and g separately on each piece.", af: "'n Produk is positief wanneer die twee grafieke DIESELFDE teken het, en negatief wanneer hulle teenoorgestelde tekens het. Sny dus met 'n vertikale lyn deur elke x-afsnit van albei grafieke (dit is drie snylyne) en verf f en g apart op elke interval.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept of both graphs</b>: &nbsp;x = −3, &nbsp;x = −1&nbsp; and&nbsp; x = 3.", af: "Sny met 'n vertikale lyn deur <b>elke x-afsnit van albei grafieke</b>: &nbsp;x = −3, &nbsp;x = −1&nbsp; en&nbsp; x = 3." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Paint f and g on each piece, then multiply the two signs:", af: "Verf f en g op elke interval, en vermenigvuldig dan die twee tekens:" } },
        { type: "step", text: { en: "x &lt; −3: &nbsp;f <b>+</b>, g <b>−</b> → <b>−</b> &nbsp;·&nbsp; −3 to −1: &nbsp;f <b>−</b>, g <b>−</b> → <b>+</b> &nbsp;·&nbsp; −1 to 3: &nbsp;f <b>−</b>, g <b>+</b> → <b>−</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;f <b>+</b>, g <b>+</b> → <b>+</b>", af: "x &lt; −3: &nbsp;f <b>+</b>, g <b>−</b> → <b>−</b> &nbsp;·&nbsp; −3 tot −1: &nbsp;f <b>−</b>, g <b>−</b> → <b>+</b> &nbsp;·&nbsp; −1 tot 3: &nbsp;f <b>−</b>, g <b>+</b> → <b>−</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;f <b>+</b>, g <b>+</b> → <b>+</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "≥ 0 takes the painted + pieces AND the places where the product is exactly 0, which is all three cut points &nbsp;&nbsp;∴&nbsp; −3 ≤ x ≤ −1 &nbsp;or&nbsp; x ≥ 3", af: "≥ 0 neem die geverfde + intervalle EN die plekke waar die produk presies 0 is, en dit is by al drie snylyne &nbsp;&nbsp;∴&nbsp; −3 ≤ x ≤ −1 &nbsp;of&nbsp; x ≥ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: g's x-intercept is a cut line too, even though the question never mentions g on its own. Miss the cut at −1 and the middle piece comes out as one long stretch with the wrong sign in half of it.", af: "ONTHOU: g se x-afsnit is ook 'n snylyn, al noem die vraag g nooit op sy eie nie. Mis die snylyn by −1, en die middelste interval kom uit as een lang stuk met die verkeerde teken in die helfte daarvan.",
        } },
      ],
      esplain: {
        en: "The only new idea in a product question is that you are painting two graphs instead of one, and then multiplying the two colours. Everything else is the method you already have. The cut lines go wherever EITHER graph crosses the x-axis, because those are the only places where either sign can flip — so three crossings means three cuts and four pieces. On each piece, ask twice: is f above or below the axis here, and is g above or below? Two minuses make a plus, which is why the piece between −3 and −1 comes out positive even though both graphs are underneath the axis there. The ends are the last decision. The question says greater than OR EQUAL TO zero, and a product is zero the moment either factor is zero — so all three cut points get closed brackets, including the one that came from g.", af: "Die enigste nuwe idee in 'n produkvraag is dat jy twee grafieke verf in plaas van een, en dan die twee kleure vermenigvuldig. Alles anders is die metode wat jy reeds het. Die snylyne kom waar ENIGE van die twee grafieke die x-as sny, want dit is die enigste plekke waar enige teken kan omswaai: drie snypunte beteken dus drie snylyne en vier intervalle. Vra twee keer op elke interval: is f hier bo of onder die as, en is g bo of onder? Twee minusse maak 'n plus, en daarom kom die interval tussen −3 en −1 positief uit, al lê albei grafieke daar onder die as. Die eindpunte is die laaste besluit. Die vraag sê groter as OF GELYK AAN nul, en 'n produk is nul sodra enige faktor nul is: al drie snylyne kry dus geslote hakies, ook die een wat van g kom.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x)/g(x) &lt; 0?", af: "Vir watter waardes van x is &nbsp;f(x)/g(x) &lt; 0?",
      },
      hint: {
        en: "Dividing two numbers and multiplying them give exactly the same sign, so you do not have to paint anything again — the pieces you found in (a) still hold. What DOES change is the ends: think about what g is allowed to be.", af: "As jy twee getalle deel of vermenigvuldig, kry jy presies dieselfde teken, dus hoef jy niks weer te verf nie: die intervalle wat jy in (a) gekry het, geld steeds. Wat WEL verander, is die eindpunte: dink na oor wat g mag wees.",
      },
      memo: [
        { type: "step", text: { en: "A quotient has the same sign as the product, so the painted pieces are the ones from (a):", af: "'n Kwosiënt het dieselfde teken as die produk, dus is die geverfde intervalle dié van (a):" } },
        { type: "step", text: { en: "x &lt; −3: <b>−</b> &nbsp;·&nbsp; −3 to −1: <b>+</b> &nbsp;·&nbsp; −1 to 3: <b>−</b> &nbsp;·&nbsp; x &gt; 3: <b>+</b>", af: "x &lt; −3: <b>−</b> &nbsp;·&nbsp; −3 tot −1: <b>+</b> &nbsp;·&nbsp; −1 tot 3: <b>−</b> &nbsp;·&nbsp; x &gt; 3: <b>+</b>" }, ticks: ["ca"] },
        { type: "step", text: { en: "&lt; 0 takes the painted − pieces. Now the ends: &nbsp;x = −3 and x = 3 make the top zero, and 0 is not less than 0, so they are out. &nbsp;x = −1 makes the BOTTOM zero, so it can never be in.", af: "&lt; 0 neem die geverfde − intervalle. Nou die eindpunte: &nbsp;x = −3 en x = 3 maak die teller nul, en 0 is nie kleiner as 0 nie, dus is hulle uit. &nbsp;x = −1 maak die NOEMER nul, dus kan dit nooit in wees nie." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x &lt; −3 &nbsp;&nbsp;or&nbsp;&nbsp; −1 &lt; x &lt; 3", af: "∴ x &lt; −3 &nbsp;&nbsp;of&nbsp;&nbsp; −1 &lt; x &lt; 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never multiply both sides by g(x) to “get rid of” the fraction. You do not know whether g is positive or negative, so you do not know whether to turn the inequality sign around. Paint the pieces instead.", af: "PASOP: moet nooit albei kante met g(x) vermenigvuldig om “ontslae te raak” van die breuk nie. Jy weet nie of g positief of negatief is nie, dus weet jy nie of jy die ongelykheidsteken moet omdraai nie. Verf eerder die intervalle.",
        } },
      ],
      esplain: {
        en: "Put the two parts side by side and the lesson lands: a product and a quotient of the same two graphs have exactly the same sign everywhere, because dividing by a negative and multiplying by a negative both flip you to the other side of zero. So the painting work in (a) is not repeated — it is reused. What genuinely differs is the ends, and for one reason only: a fraction is allowed to have a zero on top but never on the bottom. So the crossing that belongs to g, at x = −1, is excluded no matter what inequality sign the question uses — even a ≤ or a ≥ would leave it out. Here the sign is a strict less-than anyway, so all three ends are open, but it is worth knowing WHY each one is open, because the version of this question with a ≥ is the one that catches people. And the warning in the trap card is the biggest one in the whole topic: clearing a fraction in an inequality is only safe when you know the sign of what you multiplied by, and here you do not.", af: "Sit die twee dele langs mekaar, en die les is duidelik: 'n produk en 'n kwosiënt van dieselfde twee grafieke het oral presies dieselfde teken, want deel deur 'n negatiewe getal en vermenigvuldig met 'n negatiewe getal swaai jou albei na die ander kant van nul. Die verfwerk in (a) word dus nie herhaal nie, dit word hergebruik. Wat werklik verskil, is die eindpunte, en net om een rede: 'n breuk mag 'n nul in die teller hê, maar nooit in die noemer nie. Die snypunt wat aan g behoort, by x = −1, is dus uitgesluit, maak nie saak watter ongelykheidsteken die vraag gebruik nie: selfs 'n ≤ of 'n ≥ sou dit uitlaat. Hier is die teken in elk geval 'n streng kleiner-as, dus is al drie eindpunte oop, maar dit is die moeite werd om te weet HOEKOM elkeen oop is, want die weergawe van hierdie vraag met 'n ≥ is die een wat mense vang. En die waarskuwing op die PASOP-kaart is die grootste een in die hele onderwerp: om in 'n ongelykheid van 'n breuk ontslae te raak, is net veilig as jy die teken ken van dit waarmee jy vermenigvuldig het, en hier ken jy dit nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A HYPERBOLA, THE ≥ AT AN ASYMPTOTE, THEN x·h(x)
   (her pp46–51, including the quadrant-sign variant).
   h(x) = 4/(x − 1) − 2, asymptotes x = 1 and y = −2, cutting the axes
   at (3 ; 0) and (0 ; −6).
     (a) h(x) ≥ 0    ⟹  1 < x ≤ 3      one end closed, one that never can be
     (b) x·h(x) ≤ 0  ⟹  0 ≤ x < 1  or  x ≥ 3
   (b) is the level-3 part: it needs a THIRD cut line, at x = 0, and
   that line is the y-axis itself.
   --------------------------------------------------------------- */
const Q3_H = { kind: "hyperbola", a: 4, p: 1, q: -2 };
const Q3_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)" };
const Q3_YI = { x: 0, y: -6, on: 0, label: "(0 ; −6)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 8, ymin: -9, ymax: 5 },
    // the name goes on the LEFT branch: the right one carries the
    // x-intercept dot and every painted strip, and at 375 px "h" landed
    // on top of "(3 ; 0)" there
    curves: [{ ...Q3_H, tone: "a", label: "h", labelAt: -2 }],
    asymptotes: [{ x: 1, of: 0, label: "x = 1" }, { y: -2, of: 0, label: "y = −2" }],
    points: [Q3_XI, Q3_YI],
  },
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 3 }], shades: [{ x0: 1, x1: 3 }] } },
    b: { question: {}, reveal: { vlines: [{ x: 3 }], shades: [{ x0: 0, x1: 1 }, { x0: 3, x1: 8 }] } },
  },
};

const q3 = {
  id: "func.sib.ineq.q3",
  chapter: CH,
  topic: "inequalities",
  archetype: "hyperbola-sign-inequality-then-x-times-f-quadrant-signs",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 4/(x − 1) − 2. &nbsp;Its asymptotes x = 1 and y = −2 are the dashed lines, and h cuts the axes at (3 ; 0) and (0 ; −6).<br><br>For which values of x is &nbsp;h(x) ≥ 0?", af: "Die skets toon die hiperbool h, gedefinieer deur &nbsp;h(x) = 4/(x − 1) − 2. &nbsp;Sy asimptote x = 1 en y = −2 is die stippellyne, en h sny die asse by (3 ; 0) en (0 ; −6).<br><br>Vir watter waardes van x is &nbsp;h(x) ≥ 0?",
      },
      hint: {
        en: "Cut a line through the x-intercept AND through the asymptote — those are the only two places the sign can change. Then decide separately about each end, because the two cut points are not the same kind of thing at all.", af: "Sny met 'n vertikale lyn deur die x-afsnit EN deur die asimptoot: dit is die enigste twee plekke waar die teken kan verander. Besluit dan apart oor elke eindpunt, want die twee snylyne is glad nie dieselfde soort ding nie.",
      },
      memo: [
        { type: "step", text: { en: "Cut a line through <b>every x-intercept and every asymptote</b> — here x = 1 and x = 3 — then <b>paint</b> the sign of h on each piece:", af: "Sny met 'n vertikale lyn deur <b>elke x-afsnit en elke asimptoot</b>, hier x = 1 en x = 3, en <b>verf</b> dan die teken van h op elke interval:" } },
        { type: "step", text: { en: "left of 1: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; between 1 and 3: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; right of 3: &nbsp;<b>−</b>", af: "links van 1: &nbsp;<b>−</b> &nbsp;&nbsp;·&nbsp;&nbsp; tussen 1 en 3: &nbsp;<b>+</b> &nbsp;&nbsp;·&nbsp;&nbsp; regs van 3: &nbsp;<b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "h(x) ≥ 0 is the painted + piece. &nbsp;x = 3 <i>is</i> included, because h(3) = 0. &nbsp;x = 1 is <b>never</b> included — h does not exist there. &nbsp;&nbsp;∴&nbsp; 1 &lt; x ≤ 3", af: "h(x) ≥ 0 is die geverfde + interval. &nbsp;x = 3 <i>is</i> ingesluit, want h(3) = 0. &nbsp;x = 1 is <b>nooit</b> ingesluit nie: h bestaan nie daar nie. &nbsp;&nbsp;∴&nbsp; 1 &lt; x ≤ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never close the bracket on an asymptote. Writing 1 ≤ x ≤ 3 loses the mark, because h(1) does not exist — no inequality sign can change that.", af: "PASOP: maak nooit die hakie by 'n asimptoot toe nie. As jy 1 ≤ x ≤ 3 skryf, verloor jy die punt, want h(1) bestaan nie: geen ongelykheidsteken kan dit verander nie.",
        } },
      ],
      esplain: {
        en: "A graph can only swap from positive to negative in two ways: by crossing the x-axis, or by jumping across a vertical asymptote. Both happen here, so both get a cut line, and between two cuts nothing can change — one glance per piece is enough. The interesting part is the ends, because the two cut points behave completely differently. At x = 3 the graph genuinely touches down on the axis, so its height really is 0 there; the question said greater than OR EQUAL TO zero, so 3 comes inside and the bracket closes. At x = 1 there is no graph at all — the fraction would be dividing by zero — so nothing can be true about h there, and that end stays open however the inequality is written. One end closed and one end open in the same answer is exactly what this question is built to test.", af: "'n Grafiek kan net op twee maniere van positief na negatief omswaai: deur die x-as te kruis, of deur oor 'n vertikale asimptoot te spring. Albei gebeur hier, dus kry albei 'n snylyn, en tussen twee snylyne kan niks verander nie: een kyk per interval is genoeg. Die interessante deel is die eindpunte, want die twee snylyne gedra hulle heeltemal verskillend. By x = 3 raak die grafiek werklik die as, dus is sy hoogte daar regtig 0; die vraag sê groter as OF GELYK AAN nul, dus kom 3 binne en die hakie maak toe. By x = 1 is daar glad nie 'n grafiek nie (die breuk sou deur nul deel), dus kan niks oor h daar waar wees nie, en daardie eindpunt bly oop, hoe die ongelykheid ook al geskryf is. Een eindpunt geslote en een oop in dieselfde antwoord: dit is presies wat hierdie vraag wil toets.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "For which values of x is &nbsp;x·h(x) ≤ 0?", af: "Vir watter waardes van x is &nbsp;x·h(x) ≤ 0?",
      },
      hint: {
        en: "This is a product, so the same rule applies: same signs give +, opposite signs give −. But one of the two things being multiplied is just x, and x changes sign at the y-axis — so you have a third cut line to add.", af: "Dit is 'n produk, dus geld dieselfde reël: dieselfde tekens gee +, teenoorgestelde tekens gee −. Maar een van die twee dinge wat vermenigvuldig word, is net x, en x verander van teken by die y-as: jy moet dus 'n derde snylyn byvoeg.",
      },
      memo: [
        { type: "step", text: { en: "x·h(x) is a product, so paint the sign of <b>x</b> and the sign of <b>h</b> separately. x changes sign at x = 0, so the cut lines are now x = 0, x = 1 and x = 3.", af: "x·h(x) is 'n produk, dus verf die teken van <b>x</b> en die teken van <b>h</b> apart. x verander van teken by x = 0, dus is die snylyne nou x = 0, x = 1 en x = 3." }, ticks: ["s/f"] },
        { type: "step", text: { en: "x &lt; 0: &nbsp;x <b>−</b>, h <b>−</b> → <b>+</b> &nbsp;·&nbsp; 0 to 1: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b> &nbsp;·&nbsp; 1 to 3: &nbsp;x <b>+</b>, h <b>+</b> → <b>+</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b>", af: "x &lt; 0: &nbsp;x <b>−</b>, h <b>−</b> → <b>+</b> &nbsp;·&nbsp; 0 tot 1: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b> &nbsp;·&nbsp; 1 tot 3: &nbsp;x <b>+</b>, h <b>+</b> → <b>+</b> &nbsp;·&nbsp; x &gt; 3: &nbsp;x <b>+</b>, h <b>−</b> → <b>−</b>" }, ticks: ["ca"] },
        { type: "answer", text: { en: "≤ 0 takes the painted − pieces plus wherever the product is exactly 0 — that is x = 0 and x = 3, but never x = 1 &nbsp;&nbsp;∴&nbsp; 0 ≤ x &lt; 1 &nbsp;or&nbsp; x ≥ 3", af: "≤ 0 neem die geverfde − intervalle plus waar die produk presies 0 is: dit is x = 0 en x = 3, maar nooit x = 1 nie &nbsp;&nbsp;∴&nbsp; 0 ≤ x &lt; 1 &nbsp;of&nbsp; x ≥ 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the extra cut line at x = 0 is the y-axis itself. Forgetting it is the standard slip on this question — the pieces on either side of the y-axis get painted the same colour and half the answer disappears.", af: "ONTHOU: die ekstra snylyn by x = 0 is die y-as self. Om dit te vergeet, is die gewone fout by hierdie vraag: die intervalle aan weerskante van die y-as kry dieselfde kleur, en die helfte van die antwoord verdwyn.",
        } },
      ],
      esplain: {
        en: "The extra factor here is the plainest graph there is: the line y = x, negative on the left of the y-axis and positive on the right. So x·h(x) is a product like any other, and her quadrant idea says it neatly — the product is positive where x and h agree in sign, in the first and third quadrants' sense, and negative where they disagree. What makes this the harder version is that one of the cut lines does not come from the picture of h at all; it comes from the other factor, and it sits on the y-axis. Add it and you have four pieces instead of three. The ends then need three separate decisions, one per cut point. At x = 0 the product is 0 times something, which is 0, and ≤ 0 accepts 0, so it closes. At x = 3 the product is something times 0, also 0, so that closes too. At x = 1 there is no h to multiply by, so it can never be included — the same rule as in part (a), and the same one that catches people every year.", af: "Die ekstra faktor hier is die eenvoudigste grafiek wat daar is: die lyn y = x, negatief links van die y-as en positief regs daarvan. x·h(x) is dus 'n produk soos enige ander, en haar kwadrant-idee sê dit netjies: die produk is positief waar x en h dieselfde teken het, soos in die eerste en derde kwadrant, en negatief waar hulle verskil. Wat dit die moeiliker weergawe maak, is dat een van die snylyne glad nie uit die prentjie van h kom nie; dit kom van die ander faktor, en dit lê op die y-as. Voeg dit by, en jy het vier intervalle in plaas van drie. Die eindpunte vra dan drie aparte besluite, een per snylyn. By x = 0 is die produk 0 maal iets, wat 0 is, en ≤ 0 aanvaar 0, dus maak dit toe. By x = 3 is die produk iets maal 0, ook 0, dus maak dit ook toe. By x = 1 is daar geen h om mee te vermenigvuldig nie, dus kan dit nooit ingesluit word nie: dieselfde reël as in deel (a), en dieselfde een wat mense elke jaar vang.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — f AGAINST g: A CUT LINE THROUGH EVERY INTERSECTION
   (her pp46–51, the second half of the method).
   f(x) = x² − 2x − 3 and g(x) = x + 1 meet at (−1 ; 0) and (4 ; 5).
     (a) the two intersections
     (b) f(x) ≥ g(x)  ⟹  x ≤ −1 or x ≥ 4
   The intersections are (a)'s ANSWER, so the base figure carries no
   marked points at all; (a)'s reveal marks them, (b)'s question side
   carries them forward, and (b)'s reveal paints the two strips.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: -2, c: -3 };
const Q4_G = { kind: "line", a: 1, q: 1 };
const Q4_PA = { x: -1, y: 0, on: [0, 1], label: "(−1 ; 0)" };
const Q4_PB = { x: 4, y: 5, on: [0, 1], label: "(4 ; 5)" };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -6, ymax: 9 },
    curves: [
      { ...Q4_F, tone: "a", label: "f", labelAt: -2.2 },
      { ...Q4_G, tone: "b", label: "g", labelAt: 6 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_PA, Q4_PB] } },
    b: {
      question: { points: [Q4_PA, Q4_PB] },
      reveal: { points: [Q4_PA, Q4_PB], vlines: [{ x: -1 }, { x: 4 }], shades: [{ x0: -4, x1: -1 }, { x0: 4, x1: 7 }] },
    },
  },
};

const q4 = {
  id: "func.sib.ineq.q4",
  chapter: CH,
  topic: "inequalities",
  archetype: "f-against-g-intersections-then-the-cut-lines-through-them",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn5" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = x² − 2x − 3&nbsp; and&nbsp; g(x) = x + 1.<br><br>Determine the coordinates of the two points where f and g cut each other.", af: "Die skets toon &nbsp;f(x) = x² − 2x − 3&nbsp; en&nbsp; g(x) = x + 1.<br><br>Bepaal die koördinate van die twee punte waar f en g mekaar sny.",
      },
      hint: {
        en: "Where the graphs cut, both equations are true at the same x — so set the two expressions equal to each other. Bring everything to one side and factorise what is left.", af: "Waar die grafieke mekaar sny, is albei vergelykings by dieselfde x waar: stel dus die twee uitdrukkings gelyk aan mekaar. Bring alles na een kant en faktoriseer wat oorbly.",
      },
      memo: [
        { type: "step", text: { en: "At a point of intersection both graphs have the same y, so set them equal:", af: "By 'n snypunt het albei grafieke dieselfde y, dus stel hulle gelyk:" } },
        { type: "step", text: { en: "x² − 2x − 3 = x + 1 &nbsp;⟹&nbsp; x² − 3x − 4 = 0", af: "x² − 2x − 3 = x + 1 &nbsp;⟹&nbsp; x² − 3x − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x − 4)(x + 1) = 0 &nbsp;⟹&nbsp; x = 4 &nbsp;or&nbsp; x = −1", af: "(x − 4)(x + 1) = 0 &nbsp;⟹&nbsp; x = 4 &nbsp;of&nbsp; x = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "put each x back into the easier equation, g: &nbsp;g(4) = 5 &nbsp;and&nbsp; g(−1) = 0 &nbsp;&nbsp;∴&nbsp; (4 ; 5) &nbsp;and&nbsp; (−1 ; 0)", af: "vervang elke x terug in die makliker vergelyking, g: &nbsp;g(4) = 5 &nbsp;en&nbsp; g(−1) = 0 &nbsp;&nbsp;∴&nbsp; (4 ; 5) &nbsp;en&nbsp; (−1 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: solving gives you the x-values only. The question asked for COORDINATES, so each x still has to be substituted back to find its y — and the line is the cheaper of the two to substitute into.", af: "PASOP: as jy oplos, kry jy net die x-waardes. Die vraag het KOÖRDINATE gevra, dus moet jy elke x nog terugvervang om sy y te kry, en die lyn is die goedkoopste van die twee om in te vervang.",
        } },
      ],
      esplain: {
        en: "An intersection is the one place where the two graphs agree about the height, so writing f(x) = g(x) is not a trick, it is the definition. Once everything is on one side you are holding an ordinary quadratic, and its solutions are the x-coordinates of the crossings — nothing more. That is why the last step is not optional: a crossing is a place on the page, and a place needs both numbers. Substitute back into whichever equation is less work, which is almost always the line, and check the pair looks right against the picture. Here −1 lands on the x-axis and 4 lands high up on the right, which is exactly what the sketch shows.", af: "'n Snypunt is die een plek waar die twee grafieke saamstem oor die hoogte, dus is f(x) = g(x) nie 'n truuk nie, dit is die definisie. Sodra alles aan een kant is, hou jy 'n gewone kwadratiese vergelyking vas, en sy oplossings is die x-koördinate van die snypunte, niks meer nie. Daarom is die laaste stap nie opsioneel nie: 'n snypunt is 'n plek op die bladsy, en 'n plek het albei getalle nodig. Vervang terug in die vergelyking wat die minste werk is, amper altyd die lyn, en kyk of die paar reg lyk teen die prentjie. Hier land −1 op die x-as en 4 hoog op aan die regterkant, en dit is presies wat die skets wys.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "For which values of x is &nbsp;f(x) ≥ g(x)?", af: "Vir watter waardes van x is &nbsp;f(x) ≥ g(x)?",
      },
      hint: {
        en: "f(x) ≥ g(x) asks where the parabola is ON TOP of the line, so cut a line through each intersection and look at which graph is higher on each piece.", af: "f(x) ≥ g(x) vra waar die parabool BO die lyn is, dus sny met 'n vertikale lyn deur elke snypunt en kyk watter grafiek op elke interval hoër is.",
      },
      memo: [
        { type: "step", text: { en: "For f against g, cut a line through <b>every intersection</b> — here x = −1 and x = 4 — then read off which graph is on top on each piece:", af: "Vir f teenoor g sny jy met 'n vertikale lyn deur <b>elke snypunt</b>, hier x = −1 en x = 4, en lees dan af watter grafiek op elke interval bo is:" } },
        { type: "step", text: { en: "left of −1: &nbsp;f on top &nbsp;&nbsp;·&nbsp;&nbsp; between −1 and 4: &nbsp;g on top &nbsp;&nbsp;·&nbsp;&nbsp; right of 4: &nbsp;f on top", af: "links van −1: &nbsp;f bo &nbsp;&nbsp;·&nbsp;&nbsp; tussen −1 en 4: &nbsp;g bo &nbsp;&nbsp;·&nbsp;&nbsp; regs van 4: &nbsp;f bo" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f is on top on the two outside pieces, and ≥ lets the two crossings in, where the graphs are level &nbsp;&nbsp;∴&nbsp; x ≤ −1 &nbsp;or&nbsp; x ≥ 4", af: "f is bo op die twee buitenste intervalle, en ≥ laat die twee snypunte in, waar die grafieke ewe hoog is &nbsp;&nbsp;∴&nbsp; x ≤ −1 &nbsp;of&nbsp; x ≥ 4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: for f against g the cut lines go through the INTERSECTIONS, not through the x-intercepts. The x-axis has nothing to do with this question — the line g is the new baseline.", af: "ONTHOU: vir f teenoor g gaan die snylyne deur die SNYPUNTE, nie deur die x-afsnitte nie. Die x-as het niks met hierdie vraag te doen nie: die lyn g is die nuwe basislyn.",
        } },
      ],
      esplain: {
        en: "The method has not changed at all, only what counts as “zero”. In part (a) of the earlier cards the baseline was the x-axis, and the cut lines went through the crossings with it. Here the baseline is the graph g, so the cut lines go through the crossings with g instead — and between two crossings the graphs cannot swap over, so one look per piece settles it. If you would rather do it with algebra, subtract: f(x) − g(x) = x² − 3x − 4, and asking where f is on top is asking where that difference is positive, which brings you straight back to the cut lines at −1 and 4. Same answer, same picture, and it is a good check when the sketch is hard to read. The ends are closed because ≥ allows the graphs to be exactly level, which is precisely what happens at an intersection.", af: "Die metode het glad nie verander nie, net wat as “nul” tel. In deel (a) van die vorige kaarte was die basislyn die x-as, en die snylyne het deur die snypunte daarmee gegaan. Hier is die basislyn die grafiek g, dus gaan die snylyne eerder deur die snypunte met g, en tussen twee snypunte kan die grafieke nie plek ruil nie, dus is een kyk per interval genoeg. As jy dit eerder met algebra wil doen, trek af: f(x) − g(x) = x² − 3x − 4, en om te vra waar f bo is, is om te vra waar daardie verskil positief is, wat jou reguit terugbring na die snylyne by −1 en 4. Dieselfde antwoord, dieselfde prentjie, en dit is 'n goeie toets as die skets moeilik is om te lees. Die eindpunte is geslote omdat ≥ toelaat dat die grafieke presies ewe hoog is, en dit is juis wat by 'n snypunt gebeur.",
      },
    },
  ],
};

export const funcInequalitiesSiblingQuestions = [q1, q2, q3, q4];
