/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "axis-of-symmetry"
   (SESSION 2a of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Four new cards, taking this tile from two to six.

   SOURCE OF THE MATHS: GR11-FUNCTIONS-NOTES-DIGEST.md — her own Gr11
   notes. Her p4 and p8 ("axis of symmetry = x of TP", and it is always
   written x = …), p9 (what a shift does to the axis of symmetry), p10
   (hyperbola: the two symmetry lines y = ±x + c through (p ; q), both
   gradients) and pp19–24 (transformations in function notation, inside
   versus outside the bracket). Types and methods hers; numbers fresh.

   WHAT THE FOUR COVER, in the order the brief asks for:
     q1  parabola in TURNING-POINT form — the axis straight off p, the
         opposite-sign trap, then a shift written in words
     q2  parabola in STANDARD form — the axis from x = −b/(2a), then
         the pair of shifts that matter: a vertical one (which does
         NOTHING to the axis) and a horizontal one (which moves it)
     q3  hyperbola — BOTH symmetry lines, both gradients, through the
         point where the asymptotes cross
     q4  hyperbola — what a shift does to both symmetry lines at once

   NO-LEAK RULE. An axis of symmetry is a LINE, and the function engine
   can draw one as a `vlines` entry, so every parabola card here keeps
   its answer line off the question side and adds it on the reveal —
   which is also what makes the reveal worth looking at. SESSION 2a-FIX
   (2026-08-22) finished the job: every one of those lines now carries
   its own equation as a caption, and the hyperbola cards' DIAGONAL
   mirror lines — which used to stay in the memo because a highlight
   could not add a curve — are drawn too, as dashed named lines, now
   that a highlight set takes `curves`. Where the answer is a shifted
   graph (q1(c), q2(b), q2(c)) the reveal draws that graph as well.

   Q3 AND Q4(b) DO draw the asymptotes, deliberately: on those two cards
   the asymptotes are given by the equation in the stem and are not the
   answer to anything — they are the crosshairs the symmetry lines are
   built on, exactly as the "axis of symmetry" card cut from Sept T1 Q4
   hands them over in its own intro. Q4(a)'s figure draws none, because
   f(x) = 6/x has the axes themselves as asymptotes.

   LEVELS: mostly 1–2, exactly one level 3 (q4(b) — a shift described
   and both lines rebuilt from it, in one part).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — PARABOLA IN TURNING-POINT FORM.
     g(x) = 2(x − 3)² − 5   axis x = 3
     h(x) = −(x + 4)² + 1   axis x = −4   (the opposite-sign trap)
     k = g shifted 2 left and 6 up ⟹ k(x) = 2(x − 1)² + 1, axis x = 1
   (b) is a different parabola, so it carries its own per-part spec.
   --------------------------------------------------------------- */
/* win widened (NIT FIX, 2026-08-23): g(0) = 13 was rising into the y-axis
   arrow tip at the old ymax = 14, and k = 2(x − 1)² + 1 (drawn on (c)'s
   reveal) was clipped top-left at the old xmin = -3 — ymax raised to 18 and
   xmin pulled out to -4 give both arms room above and to the left. */
const Q1_G_SPEC = {
  type: "function",
  win: { xmin: -4, xmax: 9, ymin: -7, ymax: 18 },
  curves: [{ kind: "parabola", a: 2, p: 3, q: -5, tone: "a", label: "g", labelAt: 5.2 }],
};
const Q1_H_SPEC = {
  type: "function",
  win: { xmin: -10, xmax: 2, ymin: -12, ymax: 4 },
  curves: [{ kind: "parabola", a: -1, p: -4, q: 1, tone: "b", label: "h", labelAt: -6.5 }],
};
/* k = g shifted 2 left and 6 up = 2(x − 1)² + 1 — (c)'s own answer, so it is
   DRAWN on (c)'s reveal (tone b, named) beside its new mirror line
   (session 2a-FIX). Every mirror line on this card, given or found, carries
   its equation as a caption. */
const Q1_K = { kind: "parabola", a: 2, p: 1, q: 1, tone: "b", label: "k", labelAt: 3.3 };
const Q1_DIAGRAM = {
  spec: Q1_G_SPEC,
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 3, label: "x = 3" }] } },
    b: { spec: Q1_H_SPEC, question: {}, reveal: { vlines: [{ x: -4, label: "x = −4" }] } },
    c: {
      question: { vlines: [{ x: 3, label: "x = 3" }] },
      reveal: { vlines: [{ x: 3, label: "x = 3" }, { x: 1, label: "x = 1" }], curves: [Q1_K] },
    },
  },
};

const q1 = {
  id: "func.sib.aos.q1",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "axis-of-symmetry-off-turning-point-form-then-a-shift",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola g, defined by &nbsp;g(x) = 2(x − 3)² − 5.<br><br>Write down the equation of the axis of symmetry of g.", af: "Die skets toon die parabool g, gedefinieer deur &nbsp;g(x) = 2(x − 3)² − 5.<br><br>Skryf die vergelyking van die simmetrie-as van g neer.",
      },
      hint: {
        en: "In turning-point form the turning point is sitting right there in the equation. The axis of symmetry is the vertical line straight through it — so you only need its x.", af: "In draaipunt-vorm staan die draaipunt reg daar in die vergelyking. Die simmetrie-as is die vertikale lyn reg daardeur, dus het jy net sy x nodig.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and the axis of symmetry is the vertical line through it, &nbsp;x = p. Here (x − 3)² gives p = 3:", af: "In &nbsp;y = a(x − p)² + q&nbsp; is die draaipunt (p ; q), en die simmetrie-as is die vertikale lyn daardeur, &nbsp;x = p. Hier gee (x − 3)² jou p = 3:" } },
        { type: "answer", text: { en: "x = 3", af: "x = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A parabola is a perfect mirror image of itself about one vertical line, and that line passes through the turning point — so “axis of symmetry” and “the x of the turning point” are two names for the same number. Turning-point form hands it to you without any work, because p IS that x. Notice what the answer looks like: an axis of symmetry is a LINE, so it has to be written as an equation, x = 3. Writing just 3, or writing y = 3, both lose the mark — and y = 3 would be a horizontal line, which a parabola's mirror line never is.", af: "'n Parabool is 'n perfekte gereflekteerde beeld van homself oor een vertikale lyn, en daardie lyn gaan deur die draaipunt, dus is “simmetrie-as” en “die x van die draaipunt” twee name vir dieselfde getal. Draaipunt-vorm gee dit vir jou sonder enige werk, want p IS daardie x. Let op hoe die antwoord lyk: 'n simmetrie-as is 'n LYN, dus moet dit as 'n vergelyking geskryf word, x = 3. As jy net 3 skryf, of y = 3, verloor jy die punt, en y = 3 sou 'n horisontale lyn wees, wat 'n parabool se simmetrie-as nooit is nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "A second parabola h is defined by &nbsp;h(x) = −(x + 4)² + 1, and is shown in the sketch.<br><br>Write down the equation of the axis of symmetry of h.", af: "'n Tweede parabool h word gedefinieer deur &nbsp;h(x) = −(x + 4)² + 1, en word in die skets getoon.<br><br>Skryf die vergelyking van die simmetrie-as van h neer.",
      },
      hint: {
        en: "Same idea as (a), but read the bracket carefully — the number inside it is not the answer as it stands.", af: "Dieselfde idee as (a), maar lees die hakie mooi: die getal daarin is nie die antwoord soos dit staan nie.",
      },
      memo: [
        { type: "step", text: { en: "(x + 4)² gives p = −4 — the OPPOSITE sign to the number written in the bracket:", af: "(x + 4)² gee p = −4, die TEENOORGESTELDE teken van die getal in die hakie:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −4", af: "x = −4" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p is the opposite sign of the number in the bracket, so (x + 4)² gives −4, not 4. And the answer must be an EQUATION — x = −4, never just −4.", af: "PASOP: p het die teenoorgestelde teken van die getal in die hakie, dus gee (x + 4)² −4, nie 4 nie. En die antwoord moet 'n VERGELYKING wees: x = −4, nooit net −4 nie.",
        } },
      ],
      esplain: {
        en: "The sign flip catches almost everybody at least once, so it helps to know why it happens rather than just to remember it. The bracket is squared, and a square is at its smallest when whatever is inside it is zero. So the turning point sits at the x that makes (x + 4) equal zero, and that x is −4. Ask yourself that question every single time — “which x makes the bracket zero?” — and you will never have to remember which way the sign goes. Notice too that the minus in front of the bracket makes this parabola sad, arms opening downwards; that changes where the graph goes, but it changes nothing at all about where the mirror line is.", af: "Die teken wat omdraai, vang byna almal minstens een keer, dus help dit om te weet hoekom dit gebeur, eerder as om dit net te onthou. Die hakie word gekwadreer, en 'n kwadraat is die kleinste wanneer dit wat binne-in is, nul is. Dus sit die draaipunt by die x wat (x + 4) gelyk aan nul maak, en daardie x is −4. Vra jouself elke keer daardie vraag, “watter x maak die hakie nul?”, en jy hoef nooit te onthou watter kant toe die teken gaan nie. Let ook op dat die minus voor die hakie hierdie parabool sad maak, met die arms wat afwaarts oopmaak; dit verander waarheen die grafiek gaan, maar dit verander niks aan waar die simmetrie-as is nie.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "The graph of g is shifted 2 units to the LEFT and 6 units UP to give k.<br><br>Write down the equation of k in the form &nbsp;y = a(x − p)² + q, and the equation of the axis of symmetry of k.", af: "Die grafiek van g word 2 eenhede na LINKS en 6 eenhede OP geskuif om k te gee.<br><br>Skryf die vergelyking van k in die vorm &nbsp;y = a(x − p)² + q neer, en die vergelyking van die simmetrie-as van k.",
      },
      hint: {
        en: "A shift carries the graph without bending it, so a does not change. Move the turning point instead — and then the new mirror line goes through the new turning point.", af: "'n Skuif dra die grafiek sonder om dit te buig, dus verander a nie. Skuif eerder die draaipunt, en dan gaan die nuwe simmetrie-as deur die nuwe draaipunt.",
      },
      memo: [
        { type: "step", text: { en: "A shift never changes the shape, so a stays 2. Only the turning point moves: from (3 ; −5), two units left is &nbsp;x = 3 − 2 = 1, six units up is &nbsp;y = −5 + 6 = 1", af: "'n Skuif verander nooit die vorm nie, dus bly a 2. Net die draaipunt skuif: vanaf (3 ; −5) is twee eenhede links &nbsp;x = 3 − 2 = 1, ses eenhede op is &nbsp;y = −5 + 6 = 1" }, ticks: ["ca"] },
        { type: "step", text: { en: "k(x) = 2(x − 1)² + 1", af: "k(x) = 2(x − 1)² + 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the axis of symmetry is the vertical line through the new turning point: &nbsp;x = 1", af: "die simmetrie-as is die vertikale lyn deur die nuwe draaipunt: &nbsp;x = 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER the sign flip again on the way back IN: a turning point at x = 1 is written (x − 1)², not (x + 1)². Check it the same way — which x makes the bracket zero?", af: "ONTHOU, die teken draai weer om op pad TERUG IN: 'n draaipunt by x = 1 word (x − 1)², nie (x + 1)² nie. Toets dit op dieselfde manier: watter x maak die hakie nul?",
        } },
      ],
      esplain: {
        en: "Turning-point form is the natural place to do a shift, because p and q ARE the turning point's coordinates — so moving the graph is nothing more than moving two numbers. Two units left takes 2 off the x-coordinate; six up adds 6 to the y-coordinate; a is untouched because a controls the width and the direction, and a shift changes neither. Once the new turning point is in, the axis of symmetry follows automatically, since it is always the vertical line through it. The reveal sketch shows both lines together, the old one at x = 3 and the new one at x = 1 — the mirror line slid exactly as far as the graph did, which is the whole idea worth taking away from this card.", af: "Draaipunt-vorm is die natuurlike plek om 'n skuif te doen, want p en q IS die draaipunt se koördinate, dus is om die grafiek te skuif niks meer as om twee getalle te skuif nie. Twee eenhede links trek 2 van die x-koördinaat af; ses op tel 6 by die y-koördinaat; a bly onaangeraak, want a beheer die breedte en die rigting, en 'n skuif verander geen van die twee nie. Sodra die nuwe draaipunt ingevul is, volg die simmetrie-as vanself, want dit is altyd die vertikale lyn daardeur. Die skets by die antwoord wys albei lyne saam, die ou een by x = 3 en die nuwe een by x = 1: die simmetrie-as het presies so ver geskuif soos die grafiek, en dit is die hele idee om van hierdie kaart af saam te neem.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — PARABOLA IN STANDARD FORM, and the two kinds of shift.
   f(x) = −2x² + 8x − 3 ⟹ axis x = −8/(2(−2)) = 2 (turning point
   (2 ; 5), sad).
     m(x) = f(x) − 4     vertical shift   ⟹ axis UNCHANGED, x = 2
     k(x) = f(x + 5)     horizontal shift ⟹ axis x = 2 − 5 = −3
   The whole point of the card is that (b) looks like it should change
   and does not, and (c) looks like it should go right and goes left.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: -2, b: 8, c: -3 };
/* m = f − 4 = −2x² + 8x − 7  (TP (2 ; 1) — same x, so the mirror line does not
   move); k = f(x + 5) = −2x² − 12x − 13  (TP (−3 ; 5), which is inside the
   window already, so no widening was needed). */
const Q2_M = { kind: "parabola", a: -2, b: 8, c: -7, tone: "b", label: "m", labelAt: 3.8 };
const Q2_K = { kind: "parabola", a: -2, b: -12, c: -13, tone: "b", label: "k", labelAt: -4.5 };
const Q2_BASE_SPEC = {
  type: "function",
  win: { xmin: -5, xmax: 6, ymin: -12, ymax: 8 },
  curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 3.6 }],
};
/* (c)'s own widened spec (NIT FIX, 2026-08-23): k's TP is (−3 ; 5) with
   x-intercepts at −3 ± √2,5 ≈ −4,58 and −1,42, and its left arm doesn't
   reach the window's bottom edge (y = −12) until x ≈ −5,92 — past the base
   spec's xmin = -5, so the arch was cut off sideways before it got there.
   xmin -8 clears that with margin to spare. */
const Q2_C_SPEC = {
  type: "function",
  win: { xmin: -8, xmax: 6, ymin: -12, ymax: 8 },
  curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 3.6 }],
};
const Q2_DIAGRAM = {
  spec: Q2_BASE_SPEC,
  parts: {
    a: { question: {}, reveal: { vlines: [{ x: 2, label: "x = 2" }] } },
    /* (b)'s and (c)'s answers are the SHIFTED graphs, so each reveal draws its
       own graph (tone b, named) next to f — which is what makes (b)'s "nothing
       moved sideways" and (c)'s "it went LEFT, not right" visible rather than
       just asserted (session 2a-FIX). */
    b: {
      question: { vlines: [{ x: 2, label: "x = 2" }] },
      reveal: { vlines: [{ x: 2, label: "x = 2" }], curves: [Q2_M] },
    },
    c: {
      spec: Q2_C_SPEC,
      question: { vlines: [{ x: 2, label: "x = 2" }] },
      reveal: { vlines: [{ x: 2, label: "x = 2" }, { x: -3, label: "x = −3" }], curves: [Q2_K] },
    },
  },
};

const q2 = {
  id: "func.sib.aos.q2",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "axis-of-symmetry-off-standard-form-then-vertical-vs-horizontal-shift",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −2x² + 8x − 3.<br><br>Determine the equation of the axis of symmetry of f.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = −2x² + 8x − 3.<br><br>Bepaal die vergelyking van die simmetrie-as van f.",
      },
      hint: {
        en: "This one is not in turning-point form, so use the formula that finds the turning point's x directly. Take care with the signs — both a and b bring one along.", af: "Hierdie een is nie in draaipunt-vorm nie, dus gebruik die formule wat die draaipunt se x direk vind. Pas op vir die tekens: a en b bring albei een saam.",
      },
      memo: [
        { type: "step", text: { en: "For &nbsp;y = ax² + bx + c&nbsp; the axis of symmetry is &nbsp;x = −b/(2a). Here a = −2 and b = 8:", af: "Vir &nbsp;y = ax² + bx + c&nbsp; is die simmetrie-as &nbsp;x = −b/(2a). Hier is a = −2 en b = 8:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = −8/(2(−2)) = −8/(−4) = 2 &nbsp;&nbsp;∴&nbsp; x = 2", af: "x = −8/(2(−2)) = −8/(−4) = 2 &nbsp;&nbsp;∴&nbsp; x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: two minus signs are in play at once — the minus in the formula and the negative a underneath. Work the top and the bottom out separately before you divide.", af: "PASOP: twee minustekens werk tegelyk, die minus in die formule en die negatiewe a onder. Werk die teller en die noemer apart uit voordat jy deel.",
        } },
      ],
      esplain: {
        en: "In standard form nothing is handed over: the equation tells you the shape and the y-intercept, but not where the graph turns. The formula x = −b/(2a) is the shortcut that finds that x without having to complete the square first — and because the axis of symmetry is the vertical line through the turning point, the same formula answers this question directly. You do not need the y here at all, which is why this is a two-mark question and not a three-mark one. Write the answer as an equation of a line, x = 2, and keep it as x = something; a parabola's mirror line is always vertical.", af: "In standaardvorm word niks vir jou gegee nie: die vergelyking vertel jou die vorm en die y-afsnit, maar nie waar die grafiek draai nie. Die formule x = −b/(2a) is die kortpad wat daardie x vind sonder om eers die vierkant te voltooi, en omdat die simmetrie-as die vertikale lyn deur die draaipunt is, beantwoord dieselfde formule hierdie vraag direk. Jy het glad nie die y hier nodig nie, en dis hoekom dit 'n vraag van twee punte is en nie van drie nie. Skryf die antwoord as die vergelyking van 'n lyn, x = 2, en hou dit as x = iets; 'n parabool se simmetrie-as is altyd vertikaal.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of m is given by &nbsp;m(x) = f(x) − 4.<br><br>Write down the equation of the axis of symmetry of m.", af: "Die grafiek van m word gegee deur &nbsp;m(x) = f(x) − 4.<br><br>Skryf die vergelyking van die simmetrie-as van m neer.",
      },
      hint: {
        en: "Work out which direction this shift moves the graph before you touch the answer. Then ask whether moving a graph in that direction could possibly move a vertical line sideways.", af: "Werk uit in watter rigting hierdie skuif die grafiek beweeg voordat jy aan die antwoord raak. Vra dan of 'n grafiek wat in daardie rigting skuif, ooit 'n vertikale lyn links of regs kan skuif.",
      },
      memo: [
        { type: "step", text: { en: "The &nbsp;− 4&nbsp; sits OUTSIDE the function, so it slides the whole graph 4 units DOWN. Sliding a parabola straight down does not move it sideways at all, so the mirror line stays exactly where it was:", af: "Die &nbsp;− 4&nbsp; staan BUITE die funksie, dus skuif dit die hele grafiek 4 eenhede AF. As 'n parabool reguit af skuif, beweeg dit glad nie links of regs nie, dus bly die simmetrie-as presies waar dit was:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2", af: "x = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this one is built to look as if it changes. A VERTICAL shift never moves the axis of symmetry, and a vertical shift is any number added or subtracted OUTSIDE the function. Only a HORIZONTAL shift moves it.", af: "PASOP: hierdie een is gebou om te lyk asof dit verander. 'n VERTIKALE skuif beweeg nooit die simmetrie-as nie, en 'n vertikale skuif is enige getal wat BUITE die funksie bygetel of afgetrek word. Net 'n HORISONTALE skuif beweeg dit.",
        } },
      ],
      esplain: {
        en: "The useful habit here is to picture the movement before you write anything. Subtracting 4 outside lowers every single point of the graph by 4 — the turning point drops from (2 ; 5) to (2 ; 1), the y-intercept drops, the whole curve drops. But every one of those points keeps its own x. The axis of symmetry is a statement about x only, so it cannot notice a purely up-and-down move. That is the real content of this part: not arithmetic, but knowing which transformations your answer is sensitive to. A question worth two marks that many learners answer with a changed number, purely because a change appeared in the equation and they assumed it had to show up somewhere.", af: "Die nuttige gewoonte hier is om die beweging in jou kop te sien voordat jy iets skryf. Om 4 buite af te trek, laat elke punt van die grafiek 4 sak: die draaipunt sak van (2 ; 5) na (2 ; 1), die y-afsnit sak, die hele kurwe sak. Maar elkeen van daardie punte hou sy eie x. Die simmetrie-as sê net iets oor x, dus kan dit 'n suiwer op-en-af-beweging nie raaksien nie. Dit is die regte inhoud van hierdie deel: nie rekenwerk nie, maar om te weet vir watter transformasies jou antwoord gevoelig is. 'n Vraag van twee punte wat baie leerders met 'n veranderde getal beantwoord, net omdat 'n verandering in die vergelyking verskyn het en hulle aangeneem het dit moet êrens wys.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of k is given by &nbsp;k(x) = f(x + 5).<br><br>Write down the equation of the axis of symmetry of k.", af: "Die grafiek van k word gegee deur &nbsp;k(x) = f(x + 5).<br><br>Skryf die vergelyking van die simmetrie-as van k neer.",
      },
      hint: {
        en: "This time the change is inside, sitting next to the x. Decide which way that moves the graph — it is the opposite of what it looks like — and move your answer from (a) the same way.", af: "Hierdie keer is die verandering binne, langs die x. Besluit watter kant toe dit die grafiek skuif (die teenoorgestelde van hoe dit lyk), en skuif jou antwoord van (a) dieselfde kant toe.",
      },
      memo: [
        { type: "step", text: { en: "The &nbsp;+ 5&nbsp; is INSIDE, next to the x, so it slides the graph 5 units LEFT — anything inside does the opposite of what it looks like:", af: "Die &nbsp;+ 5&nbsp; is BINNE, langs die x, dus skuif dit die grafiek 5 eenhede LINKS; enigiets binne doen die teenoorgestelde van hoe dit lyk:" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 2 − 5 = −3", af: "x = 2 − 5 = −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: f(x + 5) moves the graph LEFT, not right. If you are unsure, test one value: k(−3) = f(2), so whatever f was doing at x = 2, k is doing at x = −3 — the picture has slid 5 to the left.", af: "PASOP: f(x + 5) skuif die grafiek LINKS, nie regs nie. As jy onseker is, toets een waarde: k(−3) = f(2), dus wat f ook al by x = 2 gedoen het, doen k by x = −3: die prent het 5 na links geskuif.",
        } },
      ],
      esplain: {
        en: "Inside-the-bracket changes are the ones everybody gets backwards, and the cure is to stop trying to remember the rule and start testing a number instead. k(−3) means f(−3 + 5), which is f(2) — so the height that f had at x = 2 now appears at x = −3 on k. The graph has moved 5 units to the LEFT, even though the equation says plus. Once you have settled the direction, the axis of symmetry travels with everything else, so you simply move your x = 2 the same 5 units left and land on x = −3. Put this part next to (b) and you have the whole story of shifts and mirror lines: outside changes leave the axis alone, inside changes move it, and inside changes go the opposite way from what they look like.", af: "Veranderinge binne die hakie is dié wat almal agterstevoor kry, en die raat is om op te hou om die reël te probeer onthou en eerder 'n getal te toets. k(−3) beteken f(−3 + 5), wat f(2) is, dus verskyn die hoogte wat f by x = 2 gehad het nou by x = −3 op k. Die grafiek het 5 eenhede na LINKS geskuif, al sê die vergelyking plus. Sodra jy die rigting vasgestel het, skuif die simmetrie-as saam met alles anders, dus skuif jy eenvoudig jou x = 2 dieselfde 5 eenhede links en beland op x = −3. Sit hierdie deel langs (b) en jy het die hele storie van skuiwe en simmetrie-asse: veranderinge buite laat die as met rus, veranderinge binne skuif dit, en veranderinge binne gaan die teenoorgestelde kant toe van hoe hulle lyk.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — HYPERBOLA: BOTH symmetry lines, both gradients.
   h(x) = 8/(x − 2) − 3. Asymptotes x = 2 and y = −3, so both lines
   run through (2 ; −3):  m = −1 gives y = −x − 1;  m = 1 gives
   y = x − 5.  Asymptotes ARE drawn — on this card they are given, not
   asked for.
   --------------------------------------------------------------- */
const Q3_H = { kind: "hyperbola", a: 8, p: 2, q: -3 };
const Q3_CENTRE = { x: 2, y: -3, label: "(2 ; −3)" };   // not ON the curve — no `on`
const Q3_NEG = { kind: "line", a: -1, q: -1, dash: true, tone: "b", label: "y = −x − 1", labelAt: -4 };
const Q3_POS = { kind: "line", a: 1, q: -5, dash: true, tone: "c", label: "y = x − 5", labelAt: 8 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 10, ymin: -11, ymax: 5 },
    curves: [{ ...Q3_H, tone: "a", label: "h", labelAt: 6 }],
    // GIVEN asymptotes, so they are captioned on the question side (session 2a-FIX)
    asymptotes: [{ x: 2, of: 0, label: "x = 2" }, { y: -3, of: 0, label: "y = −3" }],
  },
  parts: {
    // each reveal DRAWS the mirror line it just found, dashed and named
    a: { question: {}, reveal: { points: [Q3_CENTRE], curves: [Q3_NEG] } },
    b: { question: { points: [Q3_CENTRE] }, reveal: { points: [Q3_CENTRE], curves: [Q3_POS] } },
  },
};

const q3 = {
  id: "func.sib.aos.q3",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "hyperbola-both-axes-of-symmetry-both-gradients",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 8/(x − 2) − 3, with its asymptotes drawn as dashed lines.<br><br>Determine the equation of the axis of symmetry of h that has a NEGATIVE gradient.", af: "Die skets toon die hiperbool h, gedefinieer deur &nbsp;h(x) = 8/(x − 2) − 3, met sy asimptote as stippellyne geteken.<br><br>Bepaal die vergelyking van die simmetrie-as van h wat 'n NEGATIEWE gradiënt het.",
      },
      hint: {
        en: "Both axes of symmetry go through the one point where the asymptotes cross — find that point first. A hyperbola's mirror lines only ever have two possible gradients, and you have been told which one you want.", af: "Albei simmetrie-asse gaan deur die een punt waar die asimptote mekaar sny: vind eers daardie punt. 'n Hiperbool se simmetrie-asse het net twee moontlike gradiënte, en jy is al vertel watter een jy wil hê.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry pass through the point where the asymptotes cross, which is (p ; q) = (2 ; −3)", af: "Albei simmetrie-asse gaan deur die punt waar die asimptote mekaar sny, en dit is (p ; q) = (2 ; −3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "a negative gradient means m = −1, so the line is &nbsp;y = −x + c&nbsp; through (2 ; −3):", af: "'n negatiewe gradiënt beteken m = −1, dus is die lyn &nbsp;y = −x + c&nbsp; deur (2 ; −3):" }, ticks: ["ca"] },
        { type: "answer", text: { en: "−3 = −(2) + c &nbsp;⟹&nbsp; c = −1 &nbsp;&nbsp;∴&nbsp; y = −x − 1", af: "−3 = −(2) + c &nbsp;⟹&nbsp; c = −1 &nbsp;&nbsp;∴&nbsp; y = −x − 1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A hyperbola has two mirror lines, and they are the two diagonals through the corner where the asymptotes meet — one running up at 45°, one running down at 45°. That is why their gradients are always exactly 1 and −1, no matter how big a is: a decides how far the branches sit from the corner, not which way the diagonals lean. So “the one with a negative gradient” is enough information to pin down m completely. From there it is an ordinary Grade 9 job you have done a hundred times: you have a gradient and a point, so put them into y = mx + c and solve for c. The only place to slip is the substitution — with m = −1 the term is −(2), not 2.", af: "'n Hiperbool het twee simmetrie-asse, en hulle is die twee diagonale deur die hoek waar die asimptote mekaar ontmoet: een loop op teen 45°, een loop af teen 45°. Dis hoekom hulle gradiënte altyd presies 1 en −1 is, maak nie saak hoe groot a is nie: a besluit hoe ver die vlerkies van die hoek af sit, nie watter kant toe die diagonale leun nie. Dus is “die een met 'n negatiewe gradiënt” genoeg inligting om m heeltemal vas te pen. Van daar af is dit 'n gewone Graad 9-taak wat jy al honderd keer gedoen het: jy het 'n gradiënt en 'n punt, dus sit hulle in y = mx + c en los op vir c. Die enigste plek om te gly, is die vervanging: met m = −1 is die term −(2), nie 2 nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the equation of the other axis of symmetry of h.", af: "Bepaal die vergelyking van die ander simmetrie-as van h.",
      },
      hint: {
        en: "The other one runs through exactly the same point. Only its gradient is different — and for a hyperbola there is only one other gradient it could have.", af: "Die ander een gaan deur presies dieselfde punt. Net sy gradiënt is anders, en vir 'n hiperbool is daar net een ander gradiënt wat dit kan hê.",
      },
      memo: [
        { type: "step", text: { en: "The other one has m = 1 and goes through the same point (2 ; −3): &nbsp;y = x + c", af: "Die ander een het m = 1 en gaan deur dieselfde punt (2 ; −3): &nbsp;y = x + c" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "−3 = 2 + c &nbsp;⟹&nbsp; c = −5 &nbsp;&nbsp;∴&nbsp; y = x − 5", af: "−3 = 2 + c &nbsp;⟹&nbsp; c = −5 &nbsp;&nbsp;∴&nbsp; y = x − 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: both lines go through (p ; q), and their gradients are always 1 and −1. Only the c changes between them — so if your two answers have the same c, one of them is wrong.", af: "ONTHOU: albei lyne gaan deur (p ; q), en hulle gradiënte is altyd 1 en −1. Net die c verskil tussen hulle, dus as jou twee antwoorde dieselfde c het, is een van hulle verkeerd.",
        } },
      ],
      esplain: {
        en: "This part costs almost nothing once (a) is done, and that is the point of asking it: the two mirror lines are twins. They share the same point, they differ only in which way they lean, and both leans are fixed at 45°. So the only new work is one substitution with m = 1 instead of m = −1. It is worth a quick sanity check on the sketch when you have both: the two lines should cross exactly where the two dashed asymptotes cross, and each branch of the hyperbola should sit neatly folded across one of them. If your two c values come out the same, you have almost certainly substituted the same gradient twice.", af: "Hierdie deel kos byna niks sodra (a) klaar is, en dit is die rede waarom dit gevra word: die twee simmetrie-asse is tweelinge. Hulle deel dieselfde punt, hulle verskil net in watter kant toe hulle leun, en albei leun vas teen 45°. Dus is die enigste nuwe werk een vervanging met m = 1 in plaas van m = −1. Toets dit vinnig op die skets wanneer jy albei het: die twee lyne moet mekaar presies sny waar die twee stippel-asimptote mekaar sny, en elke vlerkie van die hiperbool moet netjies oor een van hulle gevou lê. As jou twee c-waardes dieselfde uitkom, het jy byna seker dieselfde gradiënt twee keer vervang.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — WHAT A SHIFT DOES TO BOTH SYMMETRY LINES.
     f(x) = 6/x            centre (0 ; 0)  ⟹ y = x and y = −x
     g(x) = 6/(x − 4) − 1  centre (4 ; −1) ⟹ y = x − 5 and y = −x + 3
   (b) has its own spec — showing f and g on one pair of axes would
   hand over the shift that (b) is asked to describe.
   LEVEL 3 lands on (b).
   --------------------------------------------------------------- */
const Q4_F_SPEC = {
  type: "function",
  win: { xmin: -7, xmax: 7, ymin: -7, ymax: 7 },
  curves: [{ kind: "hyperbola", a: 6, p: 0, q: 0, tone: "a", label: "f", labelAt: 4 }],
};
const Q4_G_SPEC = {
  type: "function",
  win: { xmin: -3, xmax: 11, ymin: -8, ymax: 6 },
  curves: [{ kind: "hyperbola", a: 6, p: 4, q: -1, tone: "b", label: "g", labelAt: 8 }],
  // GIVEN asymptotes ⟹ captioned on the question side (session 2a-FIX)
  asymptotes: [{ x: 4, of: 0, label: "x = 4" }, { y: -1, of: 0, label: "y = −1" }],
};
const Q4_G_CENTRE = { x: 4, y: -1, label: "(4 ; −1)" };   // not ON the curve — no `on`
/* Both reveals DRAW the two mirror lines they found, dashed and named. */
const Q4_F_LINES = [
  { kind: "line", a: 1, q: 0, dash: true, tone: "b", label: "y = x", labelAt: 5 },
  { kind: "line", a: -1, q: 0, dash: true, tone: "c", label: "y = −x", labelAt: -5 },
];
const Q4_G_LINES = [
  { kind: "line", a: 1, q: -5, dash: true, tone: "a", label: "y = x − 5", labelAt: 9 },
  { kind: "line", a: -1, q: 3, dash: true, tone: "c", label: "y = −x + 3", labelAt: 8 },
];
const Q4_DIAGRAM = {
  spec: Q4_F_SPEC,
  parts: {
    a: { question: {}, reveal: { curves: Q4_F_LINES } },
    b: {
      spec: Q4_G_SPEC,
      question: {},
      reveal: { points: [Q4_G_CENTRE], curves: Q4_G_LINES },
    },
  },
};

const q4 = {
  id: "func.sib.aos.q4",
  chapter: CH,
  topic: "axis-of-symmetry",
  archetype: "hyperbola-shift-and-what-it-does-to-both-symmetry-lines",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the hyperbola f, defined by &nbsp;f(x) = 6/x.<br><br>Write down the equations of the two axes of symmetry of f.", af: "Die skets toon die hiperbool f, gedefinieer deur &nbsp;f(x) = 6/x.<br><br>Skryf die vergelykings van die twee simmetrie-asse van f neer.",
      },
      hint: {
        en: "Compare 6/x with y = a/(x − p) + q. There is nothing next to the x and nothing added on the end — so where do the asymptotes cross? Both mirror lines go through that point.", af: "Vergelyk 6/x met y = a/(x − p) + q. Daar is niks langs die x nie en niks aan die einde bygetel nie, so waar sny die asimptote mekaar? Albei simmetrie-asse gaan deur daardie punt.",
      },
      memo: [
        { type: "step", text: { en: "f(x) = 6/x&nbsp; is &nbsp;y = a/(x − p) + q&nbsp; with p = 0 and q = 0, so the asymptotes cross at the origin (0 ; 0). Both axes of symmetry are the 45° diagonals through that point, with gradients 1 and −1:", af: "f(x) = 6/x&nbsp; is &nbsp;y = a/(x − p) + q&nbsp; met p = 0 en q = 0, dus sny die asimptote mekaar by die oorsprong (0 ; 0). Albei simmetrie-asse is die 45°-diagonale deur daardie punt, met gradiënte 1 en −1:" } },
        { type: "answer", text: { en: "y = x &nbsp;&nbsp;and&nbsp;&nbsp; y = −x", af: "y = x &nbsp;&nbsp;en&nbsp;&nbsp; y = −x" }, ticks: ["a", "a"] },
      ],
      esplain: {
        en: "y = 6/x is the plainest hyperbola there is — the one every other hyperbola is a moved copy of. Nothing has been added inside the bracket and nothing on the end, so p and q are both zero and the crosshairs sit right at the origin. That makes the two mirror lines as simple as they ever get: the two 45° diagonals through the origin, which are y = x and y = −x, with no c to work out at all. Worth fixing in your memory as the baseline picture, because the next part is nothing more than this same picture picked up and put down somewhere else.", af: "y = 6/x is die eenvoudigste hiperbool wat daar is: die een waarvan elke ander hiperbool 'n geskuifde kopie is. Niks is binne die hakie bygetel nie en niks aan die einde nie, dus is p en q albei nul en die kruis van die asimptote sit reg by die oorsprong. Dit maak die twee simmetrie-asse so eenvoudig as wat hulle ooit kan wees: die twee 45°-diagonale deur die oorsprong, wat y = x en y = −x is, met glad geen c om uit te werk nie. Dis die moeite werd om dit as die basisprent te onthou, want die volgende deel is niks meer as dieselfde prent wat opgetel en êrens anders neergesit word nie.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "A second hyperbola g is defined by &nbsp;g(x) = 6/(x − 4) − 1, and is shown in the sketch with its asymptotes dashed.<br><br>Describe the shift that moves f onto g, and determine the equations of the two axes of symmetry of g.", af: "'n Tweede hiperbool g word gedefinieer deur &nbsp;g(x) = 6/(x − 4) − 1, en word in die skets getoon met sy asimptote as stippellyne.<br><br>Beskryf die skuif wat f op g plaas, en bepaal die vergelykings van die twee simmetrie-asse van g.",
      },
      hint: {
        en: "Compare g with f piece by piece — one change is inside the bracket and one is on the end, and they move the graph in different directions. Once you know where the crosshairs have landed, both lines follow from the same two gradients as before.", af: "Vergelyk g stukkie vir stukkie met f: een verandering is binne die hakie en een aan die einde, en hulle skuif die grafiek in verskillende rigtings. Sodra jy weet waar die kruis van die asimptote beland het, volg albei lyne uit dieselfde twee gradiënte as voorheen.",
      },
      memo: [
        { type: "step", text: { en: "Compare g with f: &nbsp;the (x − 4) slides the graph 4 units RIGHT, and the &nbsp;− 1&nbsp; on the end slides it 1 unit DOWN", af: "Vergelyk g met f: &nbsp;die (x − 4) skuif die grafiek 4 eenhede REGS, en die &nbsp;− 1&nbsp; aan die einde skuif dit 1 eenheid AF" }, ticks: ["ca"] },
        { type: "step", text: { en: "so the asymptotes now cross at (4 ; −1), and both axes of symmetry pass through that point. The gradients are still 1 and −1:", af: "dus sny die asimptote mekaar nou by (4 ; −1), en albei simmetrie-asse gaan deur daardie punt. Die gradiënte is steeds 1 en −1:" }, ticks: ["ca"] },
        { type: "step", text: { en: "m = 1: &nbsp;&nbsp;−1 = 4 + c &nbsp;⟹&nbsp; c = −5 &nbsp;⟹&nbsp; y = x − 5", af: "m = 1: &nbsp;&nbsp;−1 = 4 + c &nbsp;⟹&nbsp; c = −5 &nbsp;⟹&nbsp; y = x − 5" }, ticks: ["a"] },
        { type: "answer", text: { en: "m = −1: &nbsp;&nbsp;−1 = −(4) + c &nbsp;⟹&nbsp; c = 3 &nbsp;⟹&nbsp; y = −x + 3", af: "m = −1: &nbsp;&nbsp;−1 = −(4) + c &nbsp;⟹&nbsp; c = 3 &nbsp;⟹&nbsp; y = −x + 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a shift MOVES the mirror lines but never TILTS them. The gradients stay 1 and −1 — only c changes, and it changes only because the point the lines run through has moved.", af: "PASOP: 'n skuif BEWEEG die simmetrie-asse, maar KANTEL hulle nooit nie. Die gradiënte bly 1 en −1: net c verander, en dit verander net omdat die punt waardeur die lyne gaan, geskuif het.",
        } },
      ],
      esplain: {
        en: "Everything on this card hangs on one idea: a shift carries the entire picture, crosshairs and mirror lines included, without changing its shape. So you never have to rebuild g from scratch — you work out where the corner went and everything else follows. The (x − 4) is inside the bracket, and inside changes go the opposite way to how they read, so that is 4 units to the right; the − 1 is outside and behaves normally, 1 unit down. The corner therefore travels from (0 ; 0) to (4 ; −1). The mirror lines started as y = x and y = −x, and they are still leaning at exactly 45°, because tilting is not something a shift can do — so all that is left is to find the new c for each by substituting the new corner. This is the part that carries the extra thinking on this tile: two lines, one shift, and the discipline not to let the sign on the shift or the sign on the gradient trip you at the last step.", af: "Alles op hierdie kaart hang aan een idee: 'n skuif dra die hele prent, die asimptote se kruis en die simmetrie-asse ingesluit, sonder om sy vorm te verander. Dus hoef jy g nooit van voor af te bou nie: jy werk uit waarheen die hoek gegaan het, en alles anders volg. Die (x − 4) is binne die hakie, en veranderinge binne gaan die teenoorgestelde kant toe van hoe hulle lees, dus is dit 4 eenhede na regs; die − 1 is buite en gedra hom normaal, 1 eenheid af. Die hoek beweeg dus van (0 ; 0) na (4 ; −1). Die simmetrie-asse het as y = x en y = −x begin, en hulle leun steeds teen presies 45°, want kantel is nie iets wat 'n skuif kan doen nie, dus is al wat oorbly om die nuwe c vir elkeen te vind deur die nuwe hoek te vervang. Dit is die deel wat die ekstra dinkwerk op hierdie teël dra: twee lyne, een skuif, en die dissipline om nie die teken van die skuif of die teken van die gradiënt jou by die laaste stap te laat struikel nie.",
      },
    },
  ],
};

export const funcAxisOfSymmetrySiblingQuestions = [q1, q2, q3, q4];
