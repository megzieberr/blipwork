/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill "sketch"
   (SESSION D1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map: `sketch` is one of the four NEW
   Functions tiles.)
   ------------------------------------------------------------
   Six new cards on a tile that did not exist before today. Every one is
   the question a Grade 11 paper actually asks: "Sketch the graph of …,
   showing all the intercepts with the axes and the coordinates of the
   turning point / the asymptotes."

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her p4 (happy/sad, xTP = −b/2a, c = the y-intercept, turning-point
   form and its "opposite sign" p), pp5–7 (the worked "characteristics"
   pages, in HER order: shape → intercepts → turning point → sketch),
   p10 (asymptotes FIRST on a hyperbola, then the intercepts), p14
   ("taking off" for b > 1, "landing" for 0 &lt; b &lt; 1; a decides
   above or below the asymptote) and pp29–32 (completing the square
   beside the xTP = −b/2a shortcut — both roads under OR). The question
   TYPES and the METHOD ORDER are hers; every number here is fresh.
   None of the digest's four flagged slips is mined.

   WHAT THE SIX COVER, and why these six:
     q1  a parabola in TURNING-POINT form — read the TP off, then work
         the intercepts, then draw it (the gentlest way in)
     q2  the same job from STANDARD form — factorise for the
         x-intercepts, and the turning point by BOTH roads under OR
     q3  an exponential a·b^(x − p) + q — asymptote first, then both
         intercepts, in her "taking off" language
     q4  a hyperbola a/(x + p) + q — asymptotes FIRST, her p10 order,
         then the intercepts, then the sketch
     q5  a straight line AND a parabola on ONE set of axes
     q6  the bank's rough sketch FROM SIGN CONDITIONS ONLY (archetype
         5b: "sketch given a &lt; 0, p &gt; 0, q &gt; 0" — no numbers at
         all), which tests the concept and nothing else

   THE DIAGRAM RULE FOR THIS WHOLE TILE (session brief, 2026-08-23).
   The sketch IS the task, so the QUESTION side shows only a blank set
   of axes with a light integer grid — the exam's own answer grid. The
   base spec is therefore a `{ type:"function", grid:true, win:{…} }`
   with NO curves and NO points; `verifyFunction` measures a curveless
   spec perfectly happily (there is simply nothing to measure but the
   window). Every part's `question` highlight is `{}`, and its `reveal`
   highlight carries EVERYTHING it found: the curve(s), the intercepts,
   the turning point, the asymptotes with captions. Because the base
   spec draws no curves of its own, a reveal's first curve is index 0 —
   that is what every `on:` and `of:` below counts from.

   q6 IS THE ONE THAT NEEDS SAYING OUT LOUD: it has no numbers, so its
   reveal draws a REPRESENTATIVE curve with the right features and its
   memo says so in as many words ("any curve with these features earns
   the marks"). Its point label is written symbolically, TP(−p ; q),
   even though the dot sits at the representative curve's own turning
   point — which is exactly what a marker draws on the board.

   LEVELS: five level-1 parts, nine level-2 and three level-3. Nothing
   here is level 4 — the ★ questions live on the chapter's `level-4`
   tile (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* the blank answer grid every card on this tile hands the learner */
const AXES = (win) => ({ type: "function", grid: true, win });

/* ---------------------------------------------------------------
   q1 — PARABOLA IN TURNING-POINT FORM (her p4, "opposite sign").
   g(x) = −2(x − 1)² + 8 — sad, TP(1 ; 8), a maximum.
     x-intercepts: (x − 1)² = 4 ⟹ x = −1 or x = 3
     y-intercept:  g(0) = −2(1) + 8 = 6
   The gentlest card on the tile: the turning point is READ, not
   worked, so all the working goes into the intercepts.
   --------------------------------------------------------------- */
const Q1_G = { kind: "parabola", a: -2, p: 1, q: 8, tone: "a", label: "g", labelAt: 3.2 };
const Q1_TP = { x: 1, y: 8, on: 0, label: "TP(1 ; 8)", place: "above" };
const Q1_X1 = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "belowLeft" };
const Q1_X2 = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "belowRight" };
const Q1_YI = { x: 0, y: 6, on: 0, label: "(0 ; 6)", place: "left" };
const Q1_DIAGRAM = {
  spec: AXES({ xmin: -4, xmax: 6, ymin: -8, ymax: 11 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q1_G], points: [Q1_TP] } },
    b: { question: {}, reveal: { curves: [Q1_G], points: [Q1_X1, Q1_X2, Q1_YI] } },
    c: { question: {}, reveal: { curves: [Q1_G], points: [Q1_TP, Q1_X1, Q1_X2, Q1_YI] } },
  },
};

const q1 = {
  id: "func.sib.sk.q1",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-parabola-given-in-turning-point-form",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the parabola g, defined by &nbsp;g(x) = −2(x − 1)² + 8.<br><br>Write down the coordinates of the turning point of g, and state whether it is a maximum or a minimum.", af: "Beskou die parabool g, gedefinieer deur &nbsp;g(x) = −2(x − 1)² + 8.<br><br>Skryf die koördinate van die draaipunt van g neer, en meld of dit 'n maksimum of 'n minimum is.",
      },
      hint: {
        en: "The equation is already in turning-point form &nbsp;y = a(x − p)² + q, so the turning point is (p ; q) — sitting right there in the equation. Read the sign in front of the bracket to decide happy or sad.", af: "Die vergelyking is reeds in draaipunt-vorm &nbsp;y = a(x − p)² + q, dus is die draaipunt (p ; q): dit staan reg daar in die vergelyking. Lees die teken voor die hakie om te besluit of dit happy of sad is.",
      },
      memo: [
        { type: "step", text: { en: "In &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and p is the OPPOSITE sign of the number inside the bracket.", af: "In &nbsp;y = a(x − p)² + q&nbsp; is die draaipunt (p ; q), en p het die TEENOORGESTELDE teken van die getal binne die hakie." } },
        { type: "answer", text: { en: "(x − 1)² gives p = 1, and q = 8 &nbsp;&nbsp;∴&nbsp; TP(1 ; 8)", af: "(x − 1)² gee p = 1, en q = 8 &nbsp;&nbsp;∴&nbsp; DP(1 ; 8)" }, ticks: ["a"] },
        { type: "answer", text: { en: "a = −2, and a &lt; 0 means the graph is <b>sad</b> &nbsp;∴&nbsp; the turning point is a MAXIMUM", af: "a = −2, en a &lt; 0 beteken die grafiek is <b>sad</b> &nbsp;∴&nbsp; die draaipunt is 'n MAKSIMUM" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Turning-point form hands you the answer, so the only skill is reading it properly. The two letters p and q are not mystery constants — they ARE the turning point's own coordinates. The bracket is the place to slow down, because the form says x − p: a bracket reading x − 1 means p = 1, and a bracket reading x + 1 would mean p = −1. If that ever feels slippery, use the zero test — whatever value of x makes the bracket equal zero is the turning point's x. The a in front does a completely different job: its sign decides happy or sad, so a negative a means the arms point down and the turning point is the highest the graph ever gets. That is the whole of a maximum.", af: "Draaipunt-vorm gee jou die antwoord, dus is die enigste vaardigheid om dit reg te lees. Die twee letters p en q is nie geheimsinnige konstantes nie: hulle IS die draaipunt se eie koördinate. By die hakie moet jy stadiger gaan, want die vorm sê x − p: 'n hakie met x − 1 beteken p = 1, en 'n hakie met x + 1 sou p = −1 beteken. As dit ooit glibberig voel, gebruik die nultoets: die waarde van x wat die hakie gelyk aan nul maak, is die draaipunt se x. Die a voor doen 'n heel ander werk: sy teken besluit happy of sad, dus beteken 'n negatiewe a dat die arms afwys en die draaipunt die hoogste is wat die grafiek ooit kom. Dit is al wat 'n maksimum is.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine the coordinates of the points where g cuts the x-axis and the y-axis.", af: "Bepaal die koördinate van die punte waar g die x-as en die y-as sny.",
      },
      hint: {
        en: "A graph cuts the x-axis where y = 0, and the y-axis where x = 0. Put y = 0 into the equation, get the bracket on its own, and remember that a square root has TWO answers.", af: "'n Grafiek sny die x-as waar y = 0, en die y-as waar x = 0. Stel y = 0 in die vergelyking, kry die hakie alleen, en onthou dat 'n vierkantswortel TWEE antwoorde het.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and get the bracket alone:", af: "x-afsnitte: stel &nbsp;y = 0&nbsp; en kry die hakie alleen:" } },
        { type: "step", text: { en: "−2(x − 1)² + 8 = 0 &nbsp;⟹&nbsp; (x − 1)² = 4", af: "−2(x − 1)² + 8 = 0 &nbsp;⟹&nbsp; (x − 1)² = 4" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x − 1 = ±2 &nbsp;⟹&nbsp; x = 3&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (3 ; 0) and (−1 ; 0)", af: "x − 1 = ±2 &nbsp;⟹&nbsp; x = 3&nbsp; of&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (3 ; 0) en (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;g(0) = −2(0 − 1)² + 8 = −2 + 8 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)", af: "y-afsnit: stel &nbsp;x = 0: &nbsp;g(0) = −2(0 − 1)² + 8 = −2 + 8 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x − 1)² = 4 has TWO answers, because both 2 and −2 square to 4. Writing only x − 1 = 2 loses a whole intercept — and loses the shape of the sketch with it.", af: "PASOP: (x − 1)² = 4 het TWEE antwoorde, want 2 en −2 gee albei 4 as jy hulle kwadreer. As jy net x − 1 = 2 skryf, verloor jy 'n hele afsnit, en die vorm van die skets saam daarmee.",
        } },
      ],
      esplain: {
        en: "Intercepts are always the same two questions, whatever the graph. Where does it cross the x-axis? That is where the height is zero, so put y = 0. Where does it cross the y-axis? That is where you are standing on the y-axis, so put x = 0. From turning-point form the x-intercepts come out fastest by getting the bracket on its own and square-rooting, and the ± is not optional: a sad parabola with its peak above the axis has to come down through the axis on both sides, so two answers are exactly what the picture demands. The y-intercept needs no thinking at all — substitute zero and work it out. Notice the answers land the same distance either side of x = 1, the turning point's x — two units out each way. That symmetry is a free check on both of them.", af: "Afsnitte is altyd dieselfde twee vrae, watter grafiek ook al. Waar sny dit die x-as? Daar is die hoogte nul, dus stel y = 0. Waar sny dit die y-as? Daar staan jy op die y-as, dus stel x = 0. Uit draaipunt-vorm kom die x-afsnitte die vinnigste uit as jy die hakie alleen kry en die vierkantswortel trek, en die ± is nie opsioneel nie: 'n sad parabool met sy piek bo die as moet aan albei kante deur die as afkom, dus is twee antwoorde presies wat die prentjie vra. Die y-afsnit vra glad nie dink nie: vervang nul en werk dit uit. Let op dat die antwoorde ewe ver aan weerskante van x = 1 lê, die draaipunt se x: twee eenhede uit na elke kant. Daardie simmetrie is 'n gratis toets vir albei.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of g on the set of axes provided. Show clearly the coordinates of the turning point and of all the intercepts with the axes.", af: "Skets vervolgens die grafiek van g op die assestelsel wat voorsien is. Toon duidelik die koördinate van die draaipunt en van al die afsnitte met die asse.",
      },
      hint: {
        en: "You already have every number you need. Plot the turning point first, then the two x-intercepts and the y-intercept, and only then join them — the shape follows the sign of a, not the other way round.", af: "Jy het reeds elke getal wat jy nodig het. Stip eers die draaipunt, dan die twee x-afsnitte en die y-afsnit, en verbind hulle eers dan: die vorm volg die teken van a, nie andersom nie.",
      },
      memo: [
        { type: "step", text: { en: "Mark the four points you have found, then join them into a SAD parabola (a = −2 &lt; 0):", af: "Merk die vier punte wat jy gevind het, en verbind hulle dan tot 'n SAD parabool (a = −2 &lt; 0):" } },
        { type: "step", text: { en: "shape: sad, symmetrical about the line through the turning point", af: "vorm: sad, simmetries om die lyn deur die draaipunt" }, ticks: ["ca"] },
        { type: "step", text: { en: "intercepts labelled: &nbsp;(−1 ; 0), &nbsp;(3 ; 0)&nbsp; and&nbsp; (0 ; 6)", af: "afsnitte benoem: &nbsp;(−1 ; 0), &nbsp;(3 ; 0)&nbsp; en&nbsp; (0 ; 6)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "turning point labelled: &nbsp;TP(1 ; 8)", af: "draaipunt benoem: &nbsp;DP(1 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a sketch mark is only earned if the point is LABELLED. A beautiful curve with bare dots on it scores the shape mark and nothing else — write the coordinates next to every point you plot.", af: "ONTHOU: jy kry net 'n punt vir die skets as die punt BENOEM is. 'n Pragtige kurwe met kaal kolletjies daarop kry die punt vir die vorm en niks meer nie: skryf die koördinate langs elke punt wat jy stip.",
        } },
      ],
      esplain: {
        en: "A sketch is not a drawing competition; it is a report. The marker is looking for four things and each one is worth a mark: the right shape, the x-intercepts, the y-intercept, and the turning point — each with its coordinates written beside it. So do the maths first and the drawing last. Plot the turning point, plot the intercepts, then join them with one smooth curve that keeps its arms going the right way. Two habits save marks every single time. Label everything, even the points you think are obvious. And keep the curve symmetrical about the vertical line through the turning point — a lopsided parabola tells the marker you have not understood what a turning point is.", af: "'n Skets is nie 'n tekenkompetisie nie; dit is 'n verslag. Die nasiener soek vier dinge, en elkeen is 'n punt werd: die regte vorm, die x-afsnitte, die y-afsnit en die draaipunt, elkeen met sy koördinate langsaan geskryf. Doen dus eers die wiskunde en laaste die tekening. Stip die draaipunt, stip die afsnitte, en verbind hulle dan met een gladde kurwe wat sy arms die regte kant toe laat loop. Twee gewoontes red elke keer punte. Benoem alles, selfs die punte wat jy dink voor die hand liggend is. En hou die kurwe simmetries om die vertikale lyn deur die draaipunt: 'n skewe parabool vertel die nasiener dat jy nie verstaan wat 'n draaipunt is nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — PARABOLA IN STANDARD FORM (her pp5–7 route, plus pp29–32).
   f(x) = x² − 4x − 5 = (x − 5)(x + 1) — happy.
     x-intercepts: −1 and 5   ·   y-intercept: (0 ; −5)
     turning point BOTH WAYS, under OR:
       xTP = −b/(2a) = 4/2 = 2, then f(2) = −9
       completing the square: (x − 2)² − 9 ⟹ TP(2 ; −9)
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: -4, c: -5, tone: "a", label: "f", labelAt: 5.6 };
const Q2_X1 = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "aboveLeft" };
const Q2_X2 = { x: 5, y: 0, on: 0, label: "(5 ; 0)", place: "aboveRight" };
const Q2_YI = { x: 0, y: -5, on: 0, label: "(0 ; −5)", place: "left" };
const Q2_TP = { x: 2, y: -9, on: 0, label: "TP(2 ; −9)", place: "below" };
const Q2_DIAGRAM = {
  spec: AXES({ xmin: -4, xmax: 8, ymin: -11, ymax: 8 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q2_F], points: [Q2_X1, Q2_X2, Q2_YI] } },
    b: { question: {}, reveal: { curves: [Q2_F], points: [Q2_TP], vlines: [{ x: 2, label: "x = 2" }] } },
    c: { question: {}, reveal: { curves: [Q2_F], points: [Q2_X1, Q2_X2, Q2_YI, Q2_TP] } },
  },
};

const q2 = {
  id: "func.sib.sk.q2",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-parabola-given-in-standard-form-intercepts-then-turning-point",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Consider the parabola f, defined by &nbsp;f(x) = x² − 4x − 5.<br><br>Determine the coordinates of the points where f cuts the x-axis and the y-axis.", af: "Beskou die parabool f, gedefinieer deur &nbsp;f(x) = x² − 4x − 5.<br><br>Bepaal die koördinate van die punte waar f die x-as en die y-as sny.",
      },
      hint: {
        en: "For the x-intercepts put y = 0 and factorise the trinomial — two numbers that multiply to −5 and add to −4. The y-intercept needs no working at all: it is the number on the end.", af: "Vir die x-afsnitte: stel y = 0 en faktoriseer die drieterm, twee getalle wat vermenigvuldig tot −5 en optel tot −4. Die y-afsnit vra glad geen bewerking nie: dit is die getal aan die einde.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and factorise:", af: "x-afsnitte: stel &nbsp;y = 0&nbsp; en faktoriseer:" } },
        { type: "step", text: { en: "x² − 4x − 5 = 0 &nbsp;⟹&nbsp; (x − 5)(x + 1) = 0", af: "x² − 4x − 5 = 0 &nbsp;⟹&nbsp; (x − 5)(x + 1) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 5&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) and (−1 ; 0)", af: "x = 5&nbsp; of&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) en (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;f(0) = −5 &nbsp;&nbsp;∴&nbsp; (0 ; −5)", af: "y-afsnit: stel &nbsp;x = 0: &nbsp;f(0) = −5 &nbsp;&nbsp;∴&nbsp; (0 ; −5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "In standard form &nbsp;y = ax² + bx + c&nbsp; the very last number, c, IS the y-intercept — put x = 0 and everything with an x in it disappears, leaving c behind. So that mark is free every time. The x-intercepts cost a little more: they are the values of x that make the height zero, which is a quadratic equation, which means factorising. Look for the pair of numbers that multiply to give −5 and add to give −4: that is −5 and +1. Once the brackets are there, each one is set equal to zero on its own, because the only way a product can be zero is if one of the pieces is zero. Write the answers as POINTS, not just as x-values — the question asked where the graph cuts, and a place needs both coordinates.", af: "In standaardvorm &nbsp;y = ax² + bx + c&nbsp; IS die heel laaste getal, c, die y-afsnit: stel x = 0 en alles met 'n x daarin verdwyn, sodat c oorbly. Daardie punt is dus elke keer gratis. Die x-afsnitte kos 'n bietjie meer: hulle is die waardes van x wat die hoogte nul maak, en dit is 'n kwadratiese vergelyking, wat faktorisering beteken. Soek die paar getalle wat vermenigvuldig tot −5 en optel tot −4: dit is −5 en +1. Sodra die hakies daar is, word elkeen op sy eie gelyk aan nul gestel, want 'n produk kan net nul wees as een van die stukke nul is. Skryf die antwoorde as PUNTE, nie net as x-waardes nie: die vraag vra waar die grafiek sny, en 'n plek het albei koördinate nodig.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the turning point of f.", af: "Bepaal die koördinate van die draaipunt van f.",
      },
      hint: {
        en: "Two roads, both worth full marks: the formula &nbsp;x = −b/(2a)&nbsp; and then substitute back, or complete the square to force the equation into turning-point form. Pick the one you trust.", af: "Twee paaie, albei vol punte werd: die formule &nbsp;x = −b/(2a)&nbsp; en dan terugvervang, of voltooi die vierkant om die vergelyking in draaipunt-vorm te dwing. Kies die een wat jy vertrou.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = −4, &nbsp;so the turning point sits on &nbsp;x = −b/(2a):", af: "a = 1, &nbsp;b = −4, &nbsp;dus lê die draaipunt op &nbsp;x = −b/(2a):" } },
        { type: "step", text: { en: "x = −(−4)/(2(1)) = 2, &nbsp;then&nbsp; f(2) = (2)² − 4(2) − 5 = 4 − 8 − 5 = −9", af: "x = −(−4)/(2(1)) = 2, &nbsp;dan&nbsp; f(2) = (2)² − 4(2) − 5 = 4 − 8 − 5 = −9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;TP(2 ; −9)", af: "∴ &nbsp;DP(2 ; −9)" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — complete the square:", af: "<b>OF</b>, voltooi die vierkant:" } },
        { type: "step", text: { en: "x² − 4x − 5 = (x² − 4x + 4) − 4 − 5 = (x − 2)² − 9 &nbsp;&nbsp;∴&nbsp; TP(2 ; −9)", af: "x² − 4x − 5 = (x² − 4x + 4) − 4 − 5 = (x − 2)² − 9 &nbsp;&nbsp;∴&nbsp; DP(2 ; −9)" } },
      ],
      esplain: {
        en: "Both roads end in the same place, so use the one your hand remembers. The formula road is quicker: half of b, sign swapped, divided by a, gives the x of the turning point; then put that x back into the equation to get its height. The completing-the-square road takes longer but gives you something extra — the whole equation rewritten in turning-point form, which you can then read like q1's. Take half of −4, which is −2, square it to get 4, add it inside and take it away again outside so nothing changes. Whichever road you walk, do the same free check at the end: the turning point's x must sit exactly halfway between the two x-intercepts. Halfway between −1 and 5 is 2, so it agrees.", af: "Albei paaie eindig op dieselfde plek, dus gebruik die een wat jou hand onthou. Die formulepad is vinniger: die helfte van b, teken omgeruil, gedeel deur a, gee die x van die draaipunt; sit dan daardie x terug in die vergelyking om sy hoogte te kry. Die pad waar jy die vierkant voltooi, vat langer, maar gee jou iets ekstra: die hele vergelyking oorgeskryf in draaipunt-vorm, wat jy dan kan lees soos dié in q1. Neem die helfte van −4, wat −2 is, kwadreer dit om 4 te kry, tel dit binne by en trek dit weer buite af sodat niks verander nie. Watter pad jy ook al loop, doen aan die einde dieselfde gratis toets: die draaipunt se x moet presies halfpad tussen die twee x-afsnitte lê. Halfpad tussen −1 en 5 is 2, dus klop dit.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of f, showing clearly the intercepts with the axes and the coordinates of the turning point.", af: "Skets vervolgens die grafiek van f, en toon duidelik die afsnitte met die asse en die koördinate van die draaipunt.",
      },
      hint: {
        en: "Plot the turning point and the three intercepts first, then join them. Check the sign of a before you draw a single line — that is what decides which way the arms point.", af: "Stip eers die draaipunt en die drie afsnitte, en verbind hulle dan. Kyk na die teken van a voordat jy 'n enkele lyn teken: dit besluit watter kant toe die arms wys.",
      },
      memo: [
        { type: "step", text: { en: "a = 1 &gt; 0, so the parabola is <b>happy</b> — the arms point up and the turning point is the lowest point:", af: "a = 1 &gt; 0, dus is die parabool <b>happy</b>: die arms wys op en die draaipunt is die laagste punt:" } },
        { type: "step", text: { en: "shape: happy, symmetrical about &nbsp;x = 2", af: "vorm: happy, simmetries om &nbsp;x = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "intercepts labelled: &nbsp;(−1 ; 0), &nbsp;(5 ; 0)&nbsp; and&nbsp; (0 ; −5)", af: "afsnitte benoem: &nbsp;(−1 ; 0), &nbsp;(5 ; 0)&nbsp; en&nbsp; (0 ; −5)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "turning point labelled: &nbsp;TP(2 ; −9)", af: "draaipunt benoem: &nbsp;DP(2 ; −9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the turning point is BELOW the y-intercept here, at −9 against −5. Sketches often get squashed so that the lowest point of the curve sits level with the y-intercept — draw the turning point clearly lower, or the picture contradicts your own answers.", af: "PASOP: die draaipunt lê hier ONDER die y-afsnit, by −9 teenoor −5. Sketse word dikwels so platgedruk dat die laagste punt van die kurwe gelyk met die y-afsnit sit: teken die draaipunt duidelik laer, anders weerspreek die prentjie jou eie antwoorde.",
        } },
      ],
      esplain: {
        en: "The order she teaches is the order that works: shape, then intercepts, then turning point, then draw. By the time you pick up your pencil you should be plotting, not thinking. The one thing a sketch has to get right beyond the labels is the relative positions — a marker will not measure, but the picture must not disagree with your own numbers. Here the graph passes through −5 on the y-axis and bottoms out at −9, so the lowest point of your curve must sit visibly lower than the y-intercept. Keep the two arms the same height either side of x = 2, put an arrow on each one to say it keeps going, and write every coordinate down. Four marks, four things: shape, x-intercepts, y-intercept, turning point.", af: "Die volgorde wat sy leer, is die volgorde wat werk: vorm, dan afsnitte, dan draaipunt, dan teken. Teen die tyd dat jy jou potlood optel, moet jy stip, nie dink nie. Die een ding wat 'n skets behalwe die benoemings moet regkry, is die posisies teenoor mekaar: 'n nasiener gaan nie meet nie, maar die prentjie mag nie met jou eie getalle verskil nie. Hier gaan die grafiek deur −5 op die y-as en sy bodem is by −9, dus moet die laagste punt van jou kurwe sigbaar laer as die y-afsnit sit. Hou die twee arms ewe hoog aan weerskante van x = 2, sit 'n pyltjie op elkeen om te sê dit gaan aan, en skryf elke koördinaat neer. Vier punte, vier dinge: vorm, x-afsnitte, y-afsnit, draaipunt.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — EXPONENTIAL a·b^(x − p) + q (her p14).
   k(x) = 2^(x − 1) − 4, asymptote y = −4, a = 1 &gt; 0 so ABOVE the
   asymptote, b = 2 &gt; 1 so TAKING OFF.
     y-intercept: k(0) = 2^(−1) − 4 = 0,5 − 4 = −3,5
     x-intercept: 2^(x − 1) = 4 = 2² ⟹ x − 1 = 2 ⟹ x = 3
   --------------------------------------------------------------- */
const Q3_K = { kind: "exp", a: 1, b: 2, p: 1, q: -4, tone: "a", label: "k", labelAt: 4.2 };
const Q3_YI = { x: 0, y: -3.5, on: 0, label: "(0 ; −3,5)", place: "left" };
const Q3_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "belowRight" };
const Q3_ASYM = { y: -4, of: 0, label: "y = −4" };
const Q3_DIAGRAM = {
  spec: AXES({ xmin: -5, xmax: 6, ymin: -6, ymax: 10 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM] } },
    b: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM], points: [Q3_YI, Q3_XI] } },
    c: { question: {}, reveal: { curves: [Q3_K], asymptotes: [Q3_ASYM], points: [Q3_YI, Q3_XI] } },
  },
};

const q3 = {
  id: "func.sib.sk.q3",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-an-exponential-asymptote-then-both-intercepts",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the exponential graph k, defined by &nbsp;k(x) = 2<sup>x − 1</sup> − 4.<br><br>Write down the equation of the asymptote of k, and state whether the graph is taking off or landing.", af: "Beskou die eksponensiële grafiek k, gedefinieer deur &nbsp;k(x) = 2<sup>x − 1</sup> − 4.<br><br>Skryf die vergelyking van die asimptoot van k neer, en meld of die grafiek opstyg of land.",
      },
      hint: {
        en: "The asymptote of an exponential graph is the number sitting on the very end of the equation. Then look at the base: bigger than 1 climbs away, between 0 and 1 settles down.", af: "Die asimptoot van 'n eksponensiële grafiek is die getal heel aan die einde van die vergelyking. Kyk dan na die grondtal: groter as 1 klim weg, tussen 0 en 1 kom tot rus.",
      },
      memo: [
        { type: "answer", text: { en: "the number on the end is −4 &nbsp;&nbsp;∴&nbsp; the asymptote is &nbsp;y = −4", af: "die getal aan die einde is −4 &nbsp;&nbsp;∴&nbsp; die asimptoot is &nbsp;y = −4" }, ticks: ["a"] },
        { type: "answer", text: { en: "the base is 2, and 2 &gt; 1 &nbsp;∴&nbsp; k is <b>taking off</b>", af: "die grondtal is 2, en 2 &gt; 1 &nbsp;∴&nbsp; k <b>styg op</b>" }, ticks: ["a"] },
      ],
      esplain: {
        en: "An exponential graph flattens out towards one horizontal line and never quite reaches it, and that line is the number added on the end. Nothing else in the equation can move it, so reading the asymptote is a one-second job. Two more things live in the equation and they are worth naming while you are there. The base decides which way the graph runs: a base bigger than 1 is taking off, so the curve climbs steeply on the right and flattens on the left; a base between 0 and 1 is landing, the mirror image. And the number in front — here an invisible 1, which is positive — decides which SIDE of the asymptote the whole curve sits on. Positive means above. So before you plot a single point you already know the shape and where it lives.", af: "'n Eksponensiële grafiek plat af na een horisontale lyn toe en bereik dit nooit heeltemal nie, en daardie lyn is die getal wat aan die einde bygetel word. Niks anders in die vergelyking kan dit skuif nie, dus is dit 'n werkie van een sekonde om die asimptoot te lees. Nog twee dinge woon in die vergelyking, en dit is die moeite werd om hulle te noem terwyl jy daar is. Die grondtal besluit watter kant toe die grafiek loop: 'n grondtal groter as 1 styg op, dus klim die kurwe steil aan die regterkant en plat af aan die linkerkant; 'n grondtal tussen 0 en 1 land, die gereflekteerde beeld. En die getal voor, hier 'n onsigbare 1, wat positief is, besluit aan watter KANT van die asimptoot die hele kurwe lê. Positief beteken bo. Voordat jy 'n enkele punt stip, weet jy dus al wat die vorm is en waar dit woon.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where k cuts the y-axis and the x-axis.", af: "Bepaal die koördinate van die punte waar k die y-as en die x-as sny.",
      },
      hint: {
        en: "The y-intercept is a plain substitution — but watch the negative exponent it gives you. For the x-intercept, get the power on its own and then write both sides as a power of the same base.", af: "Die y-afsnit is 'n gewone vervanging, maar pasop vir die negatiewe eksponent wat dit jou gee. Vir die x-afsnit: kry die mag alleen en skryf dan albei kante as 'n mag van dieselfde grondtal.",
      },
      memo: [
        { type: "answer", text: { en: "y-intercept: &nbsp;k(0) = 2<sup>0 − 1</sup> − 4 = 0,5 − 4 = −3,5 &nbsp;&nbsp;∴&nbsp; (0 ; −3,5)", af: "y-afsnit: &nbsp;k(0) = 2<sup>0 − 1</sup> − 4 = 0,5 − 4 = −3,5 &nbsp;&nbsp;∴&nbsp; (0 ; −3,5)" }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercept: put &nbsp;y = 0&nbsp; and get the power alone:", af: "x-afsnit: stel &nbsp;y = 0&nbsp; en kry die mag alleen:" } },
        { type: "step", text: { en: "2<sup>x − 1</sup> − 4 = 0 &nbsp;⟹&nbsp; 2<sup>x − 1</sup> = 4 = 2<sup>2</sup>", af: "2<sup>x − 1</sup> − 4 = 0 &nbsp;⟹&nbsp; 2<sup>x − 1</sup> = 4 = 2<sup>2</sup>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "same base, so the powers are equal: &nbsp;x − 1 = 2 &nbsp;⟹&nbsp; x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)", af: "dieselfde grondtal, dus is die eksponente gelyk: &nbsp;x − 1 = 2 &nbsp;⟹&nbsp; x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2 to the power −1 is a half, NOT −2. A negative exponent means one over the thing; it never makes the answer negative.", af: "ONTHOU: 2 tot die mag −1 is 'n half, NIE −2 nie. 'n Negatiewe eksponent beteken een oor die ding; dit maak die antwoord nooit negatief nie.",
        } },
      ],
      esplain: {
        en: "The y-intercept comes from putting x = 0, which here leaves 2 to the power −1. That is the step people lose, because a minus in an exponent looks like it should make the answer negative. It does not — a negative exponent means one over, so it makes the answer small and positive, and a half minus 4 is −3,5. The x-intercept is a different game. Get the power on its own first, so that the equation reads “2 to the something equals 4”, and then turn the 4 into a power of 2 as well. Once both sides are powers of the SAME base, the powers themselves must be equal, and the whole exponential problem collapses into a one-line linear equation. Not every exponential graph has an x-intercept — this one does only because its asymptote sits below the x-axis, so the curve has to climb up through zero on its way.", af: "Die y-afsnit kom daarvan dat jy x = 0 stel, wat hier 2 tot die mag −1 oorlaat. Dit is die stap wat mense verloor, want 'n minus in 'n eksponent lyk asof dit die antwoord negatief behoort te maak. Dit doen dit nie: 'n negatiewe eksponent beteken een oor, dus maak dit die antwoord klein en positief, en 'n half minus 4 is −3,5. Die x-afsnit is 'n ander speletjie. Kry eers die mag alleen, sodat die vergelyking lees “2 tot die mag iets is gelyk aan 4”, en maak dan die 4 ook 'n mag van 2. Sodra albei kante magte van DIESELFDE grondtal is, moet die eksponente self gelyk wees, en die hele eksponensiële probleem val inmekaar tot 'n lineêre vergelyking van een reël. Nie elke eksponensiële grafiek het 'n x-afsnit nie: hierdie een het net een omdat sy asimptoot onder die x-as lê, dus moet die kurwe op pad boontoe deur nul klim.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence sketch the graph of k, showing the asymptote and both intercepts with the axes.", af: "Skets vervolgens die grafiek van k, en toon die asimptoot en albei afsnitte met die asse.",
      },
      hint: {
        en: "Draw the asymptote as a dashed line FIRST and label it — the curve is built around it. Then plot your two intercepts and let the curve hug the dashed line on the left.", af: "Teken EERSTE die asimptoot as 'n stippellyn en benoem dit: die kurwe word daarom gebou. Stip dan jou twee afsnitte en laat die kurwe aan die linkerkant al hoe nader aan die stippellyn kruip.",
      },
      memo: [
        { type: "step", text: { en: "asymptote drawn as a dashed line and labelled &nbsp;y = −4", af: "asimptoot as 'n stippellyn geteken en benoem &nbsp;y = −4" }, ticks: ["ca"] },
        { type: "step", text: { en: "both intercepts plotted and labelled: &nbsp;(0 ; −3,5)&nbsp; and&nbsp; (3 ; 0)", af: "albei afsnitte gestip en benoem: &nbsp;(0 ; −3,5)&nbsp; en&nbsp; (3 ; 0)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "shape: taking off — flattening towards &nbsp;y = −4&nbsp; on the left, climbing steeply on the right, always ABOVE the dashed line", af: "vorm: styg op, plat af na &nbsp;y = −4&nbsp; aan die linkerkant, klim steil aan die regterkant, altyd BO die stippellyn" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the curve must never touch or cross its asymptote. A sketch that flattens out ONTO the dashed line, or dips under it, throws away the shape mark no matter how good the intercepts are.", af: "PASOP: die kurwe mag nooit sy asimptoot raak of kruis nie. 'n Skets wat OP die stippellyn platloop, of daaronder insak, gooi die punt vir die vorm weg, maak nie saak hoe goed die afsnitte is nie.",
        } },
      ],
      esplain: {
        en: "With an exponential the asymptote is the skeleton, so draw it before the curve — dashed, and labelled with its equation. Everything else hangs off it. On the left the curve gets closer and closer to the dashed line but always stays above it, because the number in front is positive; on the right it lifts away faster and faster, because the base is bigger than 1. In between it passes through the two points you worked out. The commonest lost mark is drawing the tail flat ALONG the asymptote, which says the curve reaches it — it never does, and a marker looks for that gap. The second commonest is forgetting to label the dashed line at all, which turns a correct picture into an unfinished one.", af: "By 'n eksponensiële grafiek is die asimptoot die geraamte, dus teken dit voor die kurwe: as 'n stippellyn, en benoem met sy vergelyking. Alles anders hang daaraan. Aan die linkerkant kom die kurwe al hoe nader aan die stippellyn maar bly altyd daarbo, want die getal voor is positief; aan die regterkant lig dit al hoe vinniger weg, want die grondtal is groter as 1. Tussenin gaan dit deur die twee punte wat jy uitgewerk het. Die punt wat die meeste verloor word, is om die stert plat LANGS die asimptoot te teken, wat sê dat die kurwe dit bereik: dit gebeur nooit nie, en 'n nasiener soek daardie gaping. Die tweede algemeenste is om glad te vergeet om die stippellyn te benoem, wat 'n korrekte prentjie in 'n onvoltooide een verander.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — HYPERBOLA a/(x + p) + q, ASYMPTOTES FIRST (her p10 order).
   h(x) = 8/(x + 1) − 2, asymptotes x = −1 and y = −2, a &gt; 0.
     x-intercept: 8/(x + 1) = 2 ⟹ x + 1 = 4 ⟹ x = 3
     y-intercept: h(0) = 8 − 2 = 6
   The one level-3 part on this card is the sketch itself: a hyperbola
   is the graph a learner is most likely to draw as one curve instead
   of two branches.
   --------------------------------------------------------------- */
const Q4_H = { kind: "hyperbola", a: 8, p: -1, q: -2, tone: "a", label: "h", labelAt: -4 };
const Q4_AV = { x: -1, of: 0, label: "x = −1" };
const Q4_AH = { y: -2, of: 0, label: "y = −2" };
const Q4_XI = { x: 3, y: 0, on: 0, label: "(3 ; 0)", place: "aboveRight" };
const Q4_YI = { x: 0, y: 6, on: 0, label: "(0 ; 6)", place: "right" };
const Q4_DIAGRAM = {
  spec: AXES({ xmin: -9, xmax: 8, ymin: -10, ymax: 10 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH] } },
    b: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH], points: [Q4_XI, Q4_YI] } },
    c: { question: {}, reveal: { curves: [Q4_H], asymptotes: [Q4_AV, Q4_AH], points: [Q4_XI, Q4_YI] } },
  },
};

const q4 = {
  id: "func.sib.sk.q4",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-hyperbola-asymptotes-first-then-intercepts",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn3" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Consider the hyperbola h, defined by &nbsp;h(x) = 8/(x + 1) − 2.<br><br>Write down the equations of the two asymptotes of h.", af: "Beskou die hiperbool h, gedefinieer deur &nbsp;h(x) = 8/(x + 1) − 2.<br><br>Skryf die vergelykings van die twee asimptote van h neer.",
      },
      hint: {
        en: "Line the equation up against &nbsp;y = a/(x − p) + q. The vertical asymptote is the x-value that would make the bottom of the fraction zero; the horizontal one is the number on the end.", af: "Sit die vergelyking langs &nbsp;y = a/(x − p) + q. Die vertikale asimptoot is die x-waarde wat die onderkant van die breuk nul sou maak; die horisontale een is die getal aan die einde.",
      },
      memo: [
        { type: "answer", text: { en: "the bottom of the fraction is zero when &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; the vertical asymptote is &nbsp;x = −1", af: "die onderkant van die breuk is nul as &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; die vertikale asimptoot is &nbsp;x = −1" }, ticks: ["a"] },
        { type: "answer", text: { en: "the number on the end is −2 &nbsp;⟹&nbsp; the horizontal asymptote is &nbsp;y = −2", af: "die getal aan die einde is −2 &nbsp;⟹&nbsp; die horisontale asimptoot is &nbsp;y = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bracket reads x + 1, so the asymptote is x = −1, not x = 1. Ask which x breaks the fraction rather than copying the number you can see.", af: "PASOP: die hakie lees x + 1, dus is die asimptoot x = −1, nie x = 1 nie. Vra watter x die breuk breek, eerder as om die getal wat jy sien oor te skryf.",
        } },
      ],
      esplain: {
        en: "A hyperbola is easier to picture as a CORNER than as a curve: the two asymptotes cross at one point, and both branches are built around that crossing. So the asymptotes come first, always. The vertical one is the x-value the graph is not allowed to have, because dividing by zero is not a thing — set the bottom of the fraction equal to zero and solve. The horizontal one is the height the branches flatten out towards but never reach, and that is simply the number added on the end. Together they give you the corner: here it sits at (−1 ; −2). Get those two lines down and the rest of the sketch is mostly a matter of deciding which two of the four regions around the corner the branches live in.", af: "'n Hiperbool is makliker om jou voor te stel as 'n HOEK eerder as 'n kurwe: die twee asimptote kruis by een punt, en albei vlerkies word om daardie kruising gebou. Dus kom die asimptote eerste, altyd. Die vertikale een is die x-waarde wat die grafiek nie mag hê nie, want deel deur nul bestaan nie: stel die onderkant van die breuk gelyk aan nul en los op. Die horisontale een is die hoogte waarna die vlerkies afplat maar wat hulle nooit bereik nie, en dit is eenvoudig die getal wat aan die einde bygetel word. Saam gee hulle jou die hoek: hier sit dit by (−1 ; −2). Kry daardie twee lyne neer, en die res van die skets is meestal 'n kwessie van besluit in watter twee van die vier gebiede om die hoek die vlerkies woon.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where h cuts the axes.", af: "Bepaal die koördinate van die punte waar h die asse sny.",
      },
      hint: {
        en: "Same two questions as always: y = 0 for the x-intercept, x = 0 for the y-intercept. For the x-intercept, move the −2 across first so the fraction stands alone.", af: "Dieselfde twee vrae as altyd: y = 0 vir die x-afsnit, x = 0 vir die y-afsnit. Vir die x-afsnit: bring eers die −2 oor sodat die breuk alleen staan.",
      },
      memo: [
        { type: "step", text: { en: "x-intercept: put &nbsp;y = 0&nbsp; and get the fraction alone:", af: "x-afsnit: stel &nbsp;y = 0&nbsp; en kry die breuk alleen:" } },
        { type: "step", text: { en: "8/(x + 1) − 2 = 0 &nbsp;⟹&nbsp; 8/(x + 1) = 2 &nbsp;⟹&nbsp; x + 1 = 4", af: "8/(x + 1) − 2 = 0 &nbsp;⟹&nbsp; 8/(x + 1) = 2 &nbsp;⟹&nbsp; x + 1 = 4" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)", af: "x = 3 &nbsp;&nbsp;∴&nbsp; (3 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: put &nbsp;x = 0: &nbsp;h(0) = 8/(0 + 1) − 2 = 8 − 2 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)", af: "y-afsnit: stel &nbsp;x = 0: &nbsp;h(0) = 8/(0 + 1) − 2 = 8 − 2 = 6 &nbsp;&nbsp;∴&nbsp; (0 ; 6)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The x-intercept of a hyperbola is the one place a fraction equation shows up in a graphs question, and the tidy way through is to get the fraction on its own before doing anything else. Once you have “8 over something equals 2”, you can flip your thinking: if 8 divided by that bracket gives 2, the bracket must be 4. No cross-multiplying, no panic. Then solve the little linear equation that is left. The y-intercept is the easy one — put x = 0 and work it out — but do check that x = 0 is actually allowed. Here the graph is only forbidden from x = −1, so the y-axis is fine. A hyperbola whose vertical asymptote sat ON the y-axis would have no y-intercept at all, and saying so is worth the mark.", af: "Die x-afsnit van 'n hiperbool is die een plek waar 'n breukvergelyking in 'n grafiekvraag opduik, en die netjiese pad deur is om die breuk alleen te kry voordat jy enigiets anders doen. Sodra jy “8 oor iets is gelyk aan 2” het, kan jy jou denke omdraai: as 8 gedeel deur daardie hakie 2 gee, moet die hakie 4 wees. Geen kruisvermenigvuldiging nie, geen paniek nie. Los dan die klein lineêre vergelyking op wat oorbly. Die y-afsnit is die maklike een: stel x = 0 en werk dit uit, maar maak wel seker dat x = 0 werklik toegelaat is. Hier is net x = −1 vir die grafiek verbode, dus is die y-as reg. 'n Hiperbool waarvan die vertikale asimptoot OP die y-as lê, sou glad geen y-afsnit hê nie, en om dit te sê, is die punt werd.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence sketch the graph of h, showing both asymptotes and both intercepts with the axes.", af: "Skets vervolgens die grafiek van h, en toon albei asimptote en albei afsnitte met die asse.",
      },
      hint: {
        en: "Draw the two dashed asymptotes first and label them — they cut the page into four regions. Your two intercepts show you which region one branch lives in, and the sign of a puts the other branch in the opposite corner; then each branch hugs both dashed lines.", af: "Teken eers die twee asimptote as stippellyne en benoem hulle: hulle sny die bladsy in vier gebiede. Jou twee afsnitte wys in watter gebied een vlerkie woon, en die teken van a sit die ander vlerkie in die teenoorgestelde hoek; dan bly elke vlerkie naby albei stippellyne.",
      },
      memo: [
        { type: "step", text: { en: "both asymptotes drawn dashed and labelled: &nbsp;x = −1&nbsp; and&nbsp; y = −2", af: "albei asimptote as stippellyne geteken en benoem: &nbsp;x = −1&nbsp; en&nbsp; y = −2" }, ticks: ["ca"] },
        { type: "step", text: { en: "both intercepts plotted and labelled: &nbsp;(3 ; 0)&nbsp; and&nbsp; (0 ; 6)", af: "albei afsnitte gestip en benoem: &nbsp;(3 ; 0)&nbsp; en&nbsp; (0 ; 6)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "shape: TWO separate branches, a &gt; 0, so one branch above-right of the corner (−1 ; −2) through (0 ; 6) and (3 ; 0), and the other below-left — each one hugging both dashed lines without touching them", af: "vorm: TWEE aparte vlerkies, a &gt; 0, dus een vlerkie regs bo die hoek (−1 ; −2) deur (0 ; 6) en (3 ; 0), en die ander links onder: elkeen bly naby albei stippellyne sonder om hulle te raak" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: a hyperbola is TWO branches, never one continuous curve. Joining them across the vertical asymptote is the single most expensive mistake on this question — it says the graph has a value at x = −1, which is exactly what the asymptote forbids.", af: "PASOP: 'n hiperbool is TWEE vlerkies, nooit een aaneenlopende kurwe nie. Om hulle oor die vertikale asimptoot te verbind, is die heel duurste fout in hierdie vraag: dit sê die grafiek het 'n waarde by x = −1, en dit is presies wat die asimptoot verbied.",
        } },
      ],
      esplain: {
        en: "Build the picture in the order she teaches it. First the two dashed lines, labelled — they cross at the corner and cut the page into four regions. Next your intercepts: both of them, (0 ; 6) and (3 ; 0), sit up and to the right of the corner, so that region definitely holds a branch. Because a is positive, the other branch sits diagonally opposite, down and to the left. Now draw each branch so that it comes in close to one dashed line, sweeps round, and runs away close to the other — never touching either. Two things a marker checks first: that there really are two separate pieces with a clean gap at the vertical asymptote, and that the branches are on opposite corners rather than side by side. Then the labels.", af: "Bou die prentjie in die volgorde wat sy dit leer. Eers die twee stippellyne, benoem: hulle kruis by die hoek en sny die bladsy in vier gebiede. Dan jou afsnitte: albei, (0 ; 6) en (3 ; 0), sit regs bo die hoek, dus is daar beslis 'n vlerkie in daardie gebied. Omdat a positief is, sit die ander vlerkie diagonaal oorkant, links onder. Teken nou elke vlerkie so dat dit naby een stippellyn inkom, omswaai en naby die ander een wegloop, en raak nooit een van hulle nie. Twee dinge wat 'n nasiener eerste nagaan: dat daar regtig twee aparte stukke is met 'n skoon gaping by die vertikale asimptoot, en dat die vlerkies in teenoorgestelde hoeke lê eerder as langs mekaar. Dan die benoemings.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — A LINE AND A PARABOLA ON ONE SET OF AXES (paper-bank
   archetype 5's picture, built rather than read).
   f(x) = −x² + 4x + 5 = −(x − 5)(x + 1) — sad, TP(2 ; 9), y-int 5.
   g(x) = x + 1 — x-intercept −1 (the SAME point f cuts), y-int 1.
   --------------------------------------------------------------- */
const Q5_F = { kind: "parabola", a: -1, b: 4, c: 5, tone: "a", label: "f", labelAt: 5.6 };
const Q5_G = { kind: "line", a: 1, q: 1, tone: "b", label: "g", labelAt: 6.2 };
/* (−1 ; 0) is on BOTH graphs, but (a)'s reveal draws f alone — so it
   gets its own single-curve copy there; every later reveal draws both
   curves and can claim both. */
const Q5_FX1_F = { x: -1, y: 0, on: 0, label: "(−1 ; 0)", place: "belowLeft" };
const Q5_FX1 = { x: -1, y: 0, on: [0, 1], label: "(−1 ; 0)", place: "belowLeft" };
const Q5_FX2 = { x: 5, y: 0, on: 0, label: "(5 ; 0)", place: "belowRight" };
const Q5_FYI = { x: 0, y: 5, on: 0, label: "(0 ; 5)", place: "left" };
const Q5_FTP = { x: 2, y: 9, on: 0, label: "TP(2 ; 9)", place: "above" };
const Q5_GYI = { x: 0, y: 1, on: 1, label: "(0 ; 1)", place: "belowLeft" };
const Q5_DIAGRAM = {
  spec: AXES({ xmin: -5, xmax: 7, ymin: -6, ymax: 12 }),
  parts: {
    a: { question: {}, reveal: { curves: [Q5_F], points: [Q5_FX1_F, Q5_FX2, Q5_FTP] } },
    b: { question: {}, reveal: { curves: [Q5_F, Q5_G], points: [Q5_FX1, Q5_GYI] } },
    c: { question: {}, reveal: { curves: [Q5_F, Q5_G], points: [Q5_FX1, Q5_FX2, Q5_FYI, Q5_FTP, Q5_GYI] } },
  },
};

const q5 = {
  id: "func.sib.sk.q5",
  chapter: CH,
  topic: "sketch",
  archetype: "sketch-a-line-and-a-parabola-on-the-same-set-of-axes",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 10,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Consider &nbsp;f(x) = −x² + 4x + 5&nbsp; and&nbsp; g(x) = x + 1.<br><br>Determine the coordinates of the x-intercepts and of the turning point of f.", af: "Beskou &nbsp;f(x) = −x² + 4x + 5&nbsp; en&nbsp; g(x) = x + 1.<br><br>Bepaal die koördinate van die x-afsnitte en van die draaipunt van f.",
      },
      hint: {
        en: "Take the minus out in front before you factorise — it makes the trinomial an ordinary one. Then the turning point sits exactly halfway between the two x-intercepts.", af: "Haal die minus voor uit voordat jy faktoriseer: dit maak die drieterm 'n gewone een. Dan lê die draaipunt presies halfpad tussen die twee x-afsnitte.",
      },
      memo: [
        { type: "step", text: { en: "x-intercepts: put &nbsp;y = 0&nbsp; and take out the −1 first:", af: "x-afsnitte: stel &nbsp;y = 0&nbsp; en haal eers die −1 uit:" } },
        { type: "step", text: { en: "−x² + 4x + 5 = 0 &nbsp;⟹&nbsp; −(x² − 4x − 5) = 0 &nbsp;⟹&nbsp; −(x − 5)(x + 1) = 0", af: "−x² + 4x + 5 = 0 &nbsp;⟹&nbsp; −(x² − 4x − 5) = 0 &nbsp;⟹&nbsp; −(x − 5)(x + 1) = 0" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "x = 5&nbsp; or&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) and (−1 ; 0)", af: "x = 5&nbsp; of&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (5 ; 0) en (−1 ; 0)" }, ticks: ["a"] },
        { type: "step", text: { en: "turning point: &nbsp;x = −b/(2a) = −4/(2(−1)) = 2, &nbsp;then&nbsp; f(2) = −4 + 8 + 5 = 9", af: "draaipunt: &nbsp;x = −b/(2a) = −4/(2(−1)) = 2, &nbsp;dan&nbsp; f(2) = −4 + 8 + 5 = 9" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;TP(2 ; 9)", af: "∴ &nbsp;DP(2 ; 9)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the turning point of a parabola always sits halfway between its two x-intercepts. Halfway between −1 and 5 is 2 — a five-second check that catches a sign slip in the formula.", af: "ONTHOU: die draaipunt van 'n parabool lê altyd halfpad tussen sy twee x-afsnitte. Halfpad tussen −1 en 5 is 2: 'n toets van vyf sekondes wat 'n tekenfout in die formule vang.",
        } },
      ],
      esplain: {
        en: "A leading minus makes a trinomial look much worse than it is, so take it out first and factorise the friendly version that is left. Doing that also makes the shape obvious: a negative in front means the arms point down, so this graph rises to a peak and comes back. Once the x-intercepts are found there are two ways to the turning point, and the halfway shortcut is the fastest — the parabola is symmetrical, so its highest point sits above the midpoint of its two roots. Use the formula as the main working and the halfway idea as the check, or the other way round; either way you should end up agreeing with yourself. Then substitute back into f to get the height, and write the answer as a POINT.", af: "'n Minus voor laat 'n drieterm baie erger lyk as wat dit is, dus haal dit eers uit en faktoriseer die vriendelike weergawe wat oorbly. Dit maak ook die vorm duidelik: 'n negatief voor beteken die arms wys af, dus styg hierdie grafiek tot 'n piek en kom terug. Sodra die x-afsnitte gevind is, is daar twee paaie na die draaipunt, en die halfpad-kortpad is die vinnigste: die parabool is simmetries, dus lê sy hoogste punt bo die middelpunt van sy twee wortels. Gebruik die formule as die hoofbewerking en die halfpad-idee as die toets, of andersom; hoe ook al, jy moet met jouself saamstem. Vervang dan terug in f om die hoogte te kry, en skryf die antwoord as 'n PUNT.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the points where g cuts the axes.", af: "Bepaal die koördinate van die punte waar g die asse sny.",
      },
      hint: {
        en: "A straight line cuts each axis once. Put y = 0 for one and x = 0 for the other — both are one-line calculations.", af: "'n Reguit lyn sny elke as een keer. Stel y = 0 vir die een en x = 0 vir die ander: albei is berekenings van een reël.",
      },
      memo: [
        { type: "answer", text: { en: "x-intercept: &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (−1 ; 0)", af: "x-afsnit: &nbsp;x + 1 = 0 &nbsp;⟹&nbsp; x = −1 &nbsp;&nbsp;∴&nbsp; (−1 ; 0)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: &nbsp;g(0) = 1 &nbsp;&nbsp;∴&nbsp; (0 ; 1)", af: "y-afsnit: &nbsp;g(0) = 1 &nbsp;&nbsp;∴&nbsp; (0 ; 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "For a straight line written as y = mx + c, the y-intercept is c — no working needed — and the x-intercept comes from setting y to zero and solving one small equation. What is worth noticing here is that g cuts the x-axis at −1, which is exactly where f cuts it too. That is not a coincidence you have to prove; it is a gift for the sketch, because it tells you one place where the two graphs definitely meet. When two graphs share a point, plot it once, label it once, and make sure both curves are drawn passing through it — a sketch where the line misses the parabola's root by a few millimetres is a sketch that contradicts your own working.", af: "Vir 'n reguit lyn geskryf as y = mx + c, is die y-afsnit c, geen bewerking nodig nie, en die x-afsnit kom daarvan dat jy y nul stel en een klein vergelyking oplos. Wat hier die moeite werd is om op te let, is dat g die x-as by −1 sny, presies waar f dit ook sny. Dit is nie 'n toeval wat jy moet bewys nie; dit is 'n geskenk vir die skets, want dit sê vir jou een plek waar die twee grafieke mekaar beslis ontmoet. As twee grafieke 'n punt deel, stip dit een keer, benoem dit een keer, en maak seker albei kurwes gaan daardeur: 'n skets waar die lyn die parabool se wortel met 'n paar millimeter mis, is 'n skets wat jou eie bewerking weerspreek.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "Hence sketch f and g on the same set of axes. Show clearly all the intercepts with the axes and the coordinates of the turning point of f.", af: "Skets vervolgens f en g op dieselfde assestelsel. Toon duidelik al die afsnitte met die asse en die koördinate van die draaipunt van f.",
      },
      hint: {
        en: "Do the parabola first, because it needs the most room, and choose your scale so the turning point at height 9 still fits. Then rule the line through its two intercepts and check it really passes through the point they share.", af: "Doen eers die parabool, want dit het die meeste plek nodig, en kies jou skaal sodat die draaipunt op hoogte 9 steeds pas. Teken dan die lyn met 'n liniaal deur sy twee afsnitte, en kyk of dit regtig deur die punt gaan wat hulle deel.",
      },
      memo: [
        { type: "step", text: { en: "shape of f: sad, symmetrical about &nbsp;x = 2", af: "vorm van f: sad, simmetries om &nbsp;x = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "f labelled at &nbsp;(−1 ; 0), &nbsp;(5 ; 0), &nbsp;(0 ; 5)&nbsp; and&nbsp; TP(2 ; 9)", af: "f benoem by &nbsp;(−1 ; 0), &nbsp;(5 ; 0), &nbsp;(0 ; 5)&nbsp; en&nbsp; DP(2 ; 9)" }, ticks: ["ca"] },
        { type: "step", text: { en: "g drawn as a straight line through &nbsp;(−1 ; 0)&nbsp; and&nbsp; (0 ; 1)", af: "g geteken as 'n reguit lyn deur &nbsp;(−1 ; 0)&nbsp; en&nbsp; (0 ; 1)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "both graphs named on the sketch, and the shared point &nbsp;(−1 ; 0)&nbsp; shown with the line passing through the parabola's own x-intercept", af: "albei grafieke op die skets benoem, en die gedeelde punt &nbsp;(−1 ; 0)&nbsp; getoon met die lyn wat deur die parabool se eie x-afsnit gaan" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: name both graphs. When two graphs share a page, a marker cannot award the line's marks unless the sketch says which curve is f and which is g.", af: "PASOP: benoem albei grafieke. As twee grafieke 'n bladsy deel, kan 'n nasiener nie die lyn se punte toeken nie, tensy die skets sê watter kurwe f is en watter g is.",
        } },
      ],
      esplain: {
        en: "Two graphs on one page is mostly a planning problem. Look at your numbers before you draw anything: the highest point you need is 9 and the lowest is 0, so choose a vertical scale that fits 9 comfortably, or the peak ends up jammed against the top of the page. Sketch the parabola first for the same reason — it is the fussy one. The line is easy: two points and a ruler. Then check the join. Both graphs pass through (−1 ; 0), so your line must actually meet the parabola there rather than near there. Finish by writing f and g next to their own curves. Four marks here, and one of them is purely for making the page readable: shape, parabola's points, the line, and the labelling that lets a marker tell them apart.", af: "Twee grafieke op een bladsy is meestal 'n beplanningsprobleem. Kyk na jou getalle voordat jy enigiets teken: die hoogste punt wat jy nodig het, is 9 en die laagste is 0, dus kies 'n vertikale skaal waarin 9 maklik pas, anders sit die piek vasgedruk teen die bokant van die bladsy. Skets die parabool eerste om dieselfde rede: dit is die puntenerige een. Die lyn is maklik: twee punte en 'n liniaal. Kyk dan na die aansluiting. Albei grafieke gaan deur (−1 ; 0), dus moet jou lyn die parabool regtig daar ontmoet, nie net naby daar nie. Sluit af deur f en g langs hul eie kurwes te skryf. Vier punte hier, en een daarvan is suiwer daarvoor dat die bladsy leesbaar is: vorm, die parabool se punte, die lyn, en die benoeming wat 'n nasiener laat sien watter een watter is.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE ROUGH SKETCH FROM SIGN CONDITIONS ONLY
   (GR11-IEB-PAPER-BANK.md archetype 5b — "sketch given a &lt; 0,
   p &gt; 0, q &gt; 0", no numbers anywhere; her p4 for the meaning of
   each letter).
     f(x) = a(x + p)² + q, a &lt; 0, p &gt; 0, q &gt; 0
     ⟹ sad; turning point (−p ; q) with −p &lt; 0 and q &gt; 0, so the
       SECOND quadrant; the maximum is above the x-axis, so TWO
       x-intercepts.
     The y-intercept is ap² + q and its sign is NOT determined — that
     is the trap card, and it is why the reveal's curve is only ever
     REPRESENTATIVE.
   THE REVEAL'S CURVE: f(x) = −(x + 1)² + 4, TP(−1 ; 4), x-intercepts
   1 and −3. Chosen only because it has every required feature; the
   memo says in as many words that any curve with those features earns
   the marks.
   --------------------------------------------------------------- */
const Q6_REP = { kind: "parabola", a: -1, p: -1, q: 4, tone: "a", label: "f", labelAt: 1.9 };
const Q6_TP_ONLY = { x: -1, y: 4, label: "TP(−p ; q)", place: "above" };
const Q6_TP_ON = { x: -1, y: 4, on: 0, label: "TP(−p ; q)", place: "above" };
const Q6_R1 = { x: -3, y: 0, on: 0 };
const Q6_R2 = { x: 1, y: 0, on: 0 };
const Q6_DIAGRAM = {
  spec: AXES({ xmin: -6, xmax: 5, ymin: -6, ymax: 7 }),
  parts: {
    // (a) finds WHERE the turning point is, so its reveal marks that and
    // nothing else — the curve itself is (b)'s answer.
    a: { question: {}, reveal: { points: [Q6_TP_ONLY] } },
    b: { question: { points: [Q6_TP_ONLY] }, reveal: { curves: [Q6_REP], points: [Q6_TP_ON, Q6_R1, Q6_R2] } },
  },
};

const q6 = {
  id: "func.sib.sk.q6",
  chapter: CH,
  topic: "sketch",
  archetype: "rough-sketch-of-a-parabola-from-sign-conditions-only",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn1" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "The parabola f is defined by &nbsp;f(x) = a(x + p)² + q, &nbsp;where&nbsp; a &lt; 0, &nbsp;p &gt; 0&nbsp; and&nbsp; q &gt; 0. &nbsp;No values are given.<br><br>State, with a reason, whether f has a maximum or a minimum value, and write down in which quadrant its turning point lies.", af: "Die parabool f word gedefinieer deur &nbsp;f(x) = a(x + p)² + q, &nbsp;waar&nbsp; a &lt; 0, &nbsp;p &gt; 0&nbsp; en&nbsp; q &gt; 0. &nbsp;Geen waardes word gegee nie.<br><br>Meld, met 'n rede, of f 'n maksimum- of 'n minimumwaarde het, en skryf neer in watter kwadrant sy draaipunt lê.",
      },
      hint: {
        en: "Work in letters, not numbers. The sign of a decides happy or sad on its own. For the turning point, first write down its coordinates in terms of p and q — then ask whether each one is positive or negative.", af: "Werk met letters, nie getalle nie. Die teken van a besluit op sy eie happy of sad. Vir die draaipunt: skryf eers sy koördinate neer in terme van p en q, en vra dan of elkeen positief of negatief is.",
      },
      memo: [
        { type: "answer", text: { en: "a &lt; 0, so the graph is <b>sad</b> &nbsp;∴&nbsp; f has a MAXIMUM value", af: "a &lt; 0, dus is die grafiek <b>sad</b> &nbsp;∴&nbsp; f het 'n MAKSIMUM-waarde" }, ticks: ["a"] },
        { type: "step", text: { en: "in &nbsp;y = a(x − p)² + q&nbsp; the turning point is (p ; q), and the bracket here reads x + p, so the turning point is &nbsp;(−p ; q)", af: "in &nbsp;y = a(x − p)² + q&nbsp; is die draaipunt (p ; q), en die hakie hier lees x + p, dus is die draaipunt &nbsp;(−p ; q)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "p &gt; 0 makes −p &lt; 0 (left of the y-axis), and q &gt; 0 is above the x-axis &nbsp;&nbsp;∴&nbsp; the turning point lies in the SECOND quadrant", af: "p &gt; 0 maak −p &lt; 0 (links van die y-as), en q &gt; 0 is bo die x-as &nbsp;&nbsp;∴&nbsp; die draaipunt lê in die TWEEDE kwadrant" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: p &gt; 0 does NOT put the turning point on the right. The bracket reads x + p, so the turning point's x is −p, which is negative. Write the coordinates down in letters before you decide anything.", af: "PASOP: p &gt; 0 sit NIE die draaipunt aan die regterkant nie. Die hakie lees x + p, dus is die draaipunt se x gelyk aan −p, wat negatief is. Skryf die koördinate in letters neer voordat jy enigiets besluit.",
        } },
      ],
      esplain: {
        en: "A question with no numbers in it is asking whether you know what each letter DOES, so answer it letter by letter. The a in front controls the shape and nothing else: negative means the arms point down, which makes the turning point the highest the graph ever gets, and that is what a maximum means. The other two letters control position. Written properly the form is y = a(x − p)² + q, so a bracket reading x + p has its turning point at x = −p, and being told that p is positive therefore puts the turning point to the LEFT of the y-axis. The q is honest: it is the turning point's height, and being positive puts it above the x-axis. Left and above is the second quadrant.", af: "'n Vraag sonder getalle vra of jy weet wat elke letter DOEN, dus antwoord letter vir letter. Die a voor beheer die vorm en niks anders nie: negatief beteken die arms wys af, wat die draaipunt die hoogste maak wat die grafiek ooit kom, en dit is wat 'n maksimum beteken. Die ander twee letters beheer die posisie. Reg geskryf is die vorm y = a(x − p)² + q, dus het 'n hakie met x + p sy draaipunt by x = −p, en omdat p positief is, sit dit die draaipunt LINKS van die y-as. Die q is eerlik: dit is die draaipunt se hoogte, en omdat dit positief is, lê dit bo die x-as. Links en bo is die tweede kwadrant.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence draw a rough sketch of f. Show the turning point and the number of times the graph cuts the x-axis. No values are needed.", af: "Teken vervolgens 'n rowwe skets van f. Toon die draaipunt en die aantal kere wat die grafiek die x-as sny. Geen waardes is nodig nie.",
      },
      hint: {
        en: "You know the shape and where the peak sits. Now ask one more question before drawing: if the highest point of a sad parabola is ABOVE the x-axis, how many times must the curve cross that axis on its way down?", af: "Jy ken die vorm en weet waar die piek sit. Vra nou nog een vraag voordat jy teken: as die hoogste punt van 'n sad parabool BO die x-as is, hoeveel keer moet die kurwe op pad af daardie as kruis?",
      },
      memo: [
        { type: "step", text: { en: "shape: sad, arms pointing down", af: "vorm: sad, arms wys af" }, ticks: ["ca"] },
        { type: "step", text: { en: "turning point drawn in the second quadrant and labelled &nbsp;(−p ; q)", af: "draaipunt in die tweede kwadrant geteken en benoem &nbsp;(−p ; q)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "the maximum is ABOVE the x-axis and both arms run down forever &nbsp;∴&nbsp; the graph cuts the x-axis TWICE — two x-intercepts shown", af: "die maksimum is BO die x-as en albei arms loop vir altyd af &nbsp;∴&nbsp; die grafiek sny die x-as TWEE keer: twee x-afsnitte getoon" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you cannot decide where the graph cuts the y-axis. That height is ap² + q — a negative plus a positive — so it may come out above OR below the origin. Any rough sketch with the right shape, the turning point in the second quadrant and two x-intercepts earns the marks.", af: "ONTHOU: jy kan nie besluit waar die grafiek die y-as sny nie. Daardie hoogte is ap² + q, 'n negatief plus 'n positief, dus kan dit BO OF onder die oorsprong uitkom. Enige rowwe skets met die regte vorm, die draaipunt in die tweede kwadrant en twee x-afsnitte verdien die punte.",
        } },
      ],
      esplain: {
        en: "A rough sketch is marked on FEATURES, not on accuracy, so decide the features one at a time and then draw whatever curve shows them. Sad shape, from the sign of a. Peak up and to the left, from the signs of p and q. And then the piece that is really being tested: a sad parabola whose highest point is above the x-axis has to come back down through that axis on both sides, so it must cut it exactly twice. That is the same fact the discriminant would tell you, read straight off the picture instead. The one thing you must NOT pretend to know is the y-intercept, because it depends on how big a, p and q are, and you were told only their signs. Leave it unmarked and say why — that honesty is part of the answer.", af: "'n Rowwe skets word op KENMERKE nagesien, nie op akkuraatheid nie, dus besluit die kenmerke een vir een en teken dan enige kurwe wat hulle wys. Sad vorm, uit die teken van a. Piek bo en links, uit die tekens van p en q. En dan die stuk wat regtig getoets word: 'n sad parabool waarvan die hoogste punt bo die x-as is, moet aan albei kante weer deur daardie as afkom, dus moet dit die as presies twee keer sny. Dit is dieselfde feit wat die diskriminant jou sou vertel, net reguit van die prentjie af gelees. Die een ding wat jy NIE moet voorgee om te weet nie, is die y-afsnit, want dit hang af van hoe groot a, p en q is, en jy het net hul tekens gekry. Laat dit onbenoem en sê hoekom: daardie eerlikheid is deel van die antwoord.",
      },
    },
  ],
};

export const funcSketchSiblingQuestions = [q1, q2, q3, q4, q5, q6];
