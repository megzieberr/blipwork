/* ============================================================
   EXAM FOCUS — Functions · THE LEVEL 4 ★ TILE
   (BUILD DAY, SESSION D2, 2026-08-23 — her ruling 5 in
   EXAM-BUILD-DAY.md: "Levels 1–3 on the normal tiles; every chapter
   gets a last tile Level 4 ★ holding mixed Level-4 questions for that
   chapter. The low achievers must never meet a ★ while drilling
   basics.")
   ------------------------------------------------------------
   SIX fresh questions. The tile ALSO holds four cards that were
   already written and merely MOVED here by this session — the four ★
   parts that used to sit inside normal Functions cards:

     func.lp.q1(e)      k for NO real roots            ← nature-of-roots
     func.gt.t1q5(c)    t for two positive roots       ← nature-of-roots
     func.hyp.t2q3(e)   k for a line that misses       ← nature-of-roots
     func.gt.t1q5(b)    the maximum length of PQ       ← distances

   Those four are NOT re-composed here: their source modules are
   untouched, and js/exam/cards-func.js simply cuts them onto this tile
   instead of the tile they used to live on (with an `intro` carrying
   whatever their old card's stem used to give them). So this file holds
   only the six NEW ones, and the tile runs to ten cards — which the
   brief expects and her "6–8 per Level 4 tile" target treats as fine
   for the chapter the kids struggle with most.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   — pp40–45 (vertical segments and max/min length via the difference
   parabola), pp52–58 (Δ rules against the number of intersections,
   f(x) = k as a sliding horizontal line, tangent = equal roots),
   p10 (the hyperbola's centre and its two symmetry lines, gradients
   ±1), pp29–32 (x = −b/(2a), substitute back). Her p58 derivative is
   NOT mined anywhere — every maximum here is found the Grade 11 way.

   ARCHETYPE SOURCES, all shapes only and every number fresh:
     · GR11-IEB-PAPER-BANK.md, Paper 1 menu — "real-world parabola
       wrappers (projectile, archway, tunnel) as section capstones";
     · SURVEY-June.md Q4(e) and Q9(c) — max vertical distance between a
       parabola and a line, asked without a PQ set up for you;
     · SURVEY-Her-2025-Assessments.md, her Test 4 Q4 (a real-world
       flight-path capstone ending in "is your friend's claim
       correct?") and her Test 6 Q5 (the closing "values of k such that
       the line does not intersect" tangency item).

   WHAT THE SIX ARE, in the order cards-func.js lists them (all six are
   level-4 cards, so the level sort leaves that order alone):
     q1  the REAL-WORLD parabola wrapper — an archway: maximum height,
         then whether a van of a given size gets through and by how much
     q2  the MAXIMUM VERTICAL DISTANCE between two graphs, un-cued: no
         PQ, no "write down the difference", just the gap
     q3  for which k does y = k cut f twice with BOTH x-values positive
     q4  the TANGENT y = mx + c that touches f at x = 2, by Δ = 0 —
         Grade 11 legal, no calculus anywhere
     q5  a hyperbola and a line, PQ = 5 units: find the x-value(s) of P
     q6  the hyperbola's positive-gradient axis of symmetry, and where
         it cuts a parabola — a two-graph fetch

   THE ★ AND THE "BANK THE EARLIER MARKS FIRST" LINE ARE DERIVED by the
   player from `level === 4` (js/exam/_schema.js) — nothing is added by
   hand in this file.

   EVERY CARD CARRIES A TO-SCALE FIGURE, and the two standing rules
   hold: the question side never draws the answer, the reveal always
   does. Lead-in parts appear only where the starred part genuinely
   leans on them (q2 and q5 have none at all).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — THE ARCHWAY (the bank's real-world parabola wrapper).
   h(x) = −0,25x² + 2x, x metres from A, h metres high.
     feet:  −0,25x(x − 8) = 0  ⟹  A at x = 0 and B at x = 8
     (a) x = −b/(2a) = 4, h(4) = 4  ⟹  4 m high, 4 m from A
     (b) a 2 m wide van kept central has its top corners at x = 3 and
         x = 5; h(3) = h(5) = 3,75, so a 3 m high van clears by 0,75 m.
         OR: at a height of 3 m the arch is 4 m wide (x = 2 and x = 6),
         which is wider than the van.
   The base figure shows only what the stem gives: the arch and its two
   feet. The maximum is (a)'s answer, so it lives on (a)'s reveal; the
   van's two corner points and the dashed roof line y = 3 live on (b)'s.
   --------------------------------------------------------------- */
const Q1_H = { kind: "parabola", a: -0.25, b: 2, c: 0 };
const Q1_TP = { x: 4, y: 4, on: 0, label: "(4 ; 4)", place: "above" };
const Q1_ROOF = { kind: "line", a: 0, q: 3, dash: true, tone: "c", label: "y = 3", labelAt: 8.7 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -1.5, xmax: 9.5, ymin: -1.5, ymax: 6 },
    curves: [{ ...Q1_H, tone: "a", label: "h", labelAt: 6.5 }],
    points: [
      { x: 0, y: 0, on: 0, label: "A" },
      { x: 8, y: 0, on: 0, label: "B" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_TP] } },
    b: {
      question: { points: [Q1_TP] },
      reveal: {
        points: [Q1_TP, { x: 3, y: 3.75, on: 0, label: "(3 ; 3,75)" }, { x: 5, y: 3.75, on: 0, label: "(5 ; 3,75)" }],
        curves: [Q1_ROOF],
      },
    },
  },
};

const q1 = {
  id: "func.l4.q1",
  chapter: CH,
  topic: "level-4",
  archetype: "real-world-parabola-wrapper-archway-max-height-then-clearance",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn2" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "A stone archway over a farm road is modelled by &nbsp;h(x) = −0,25x² + 2x, &nbsp;where x is the horizontal distance in metres measured along the ground from A, the left foot of the arch, and h(x) is the height of the arch above the ground in metres. The arch meets the ground again at B.<br><br>Determine the maximum height of the archway, and how far from A it occurs.", af: "'n Klipboog oor 'n plaaspad word gemodelleer deur &nbsp;h(x) = −0,25x² + 2x, &nbsp;waar x die horisontale afstand in meter is, langs die grond gemeet vanaf A, die linkervoet van die boog, en h(x) die hoogte van die boog bo die grond in meter is. Die boog raak die grond weer by B.<br><br>Bepaal die maksimum hoogte van die boog, en hoe ver van A af dit voorkom.",
      },
      hint: {
        en: "The arch is a parabola, so its highest point is its turning point. Find the x of the turning point first, then put that x back into the equation to get the height.", af: "Die boog is 'n parabool, dus is sy hoogste punt sy draaipunt. Vind eers die x van die draaipunt, en sit dan daardie x terug in die vergelyking om die hoogte te kry.",
      },
      memo: [
        { type: "step", text: { en: "a = −0,25 &lt; 0, so the arch is a <b>sad</b> parabola — its turning point is the highest it ever gets.", af: "a = −0,25 &lt; 0, dus is die boog 'n <b>sad</b> parabool: sy draaipunt is die hoogste punt wat dit ooit bereik." } },
        { type: "step", text: { en: "x = −b/(2a) = −2/(2(−0,25)) = −2/(−0,5) = 4", af: "x = −b/(2a) = −2/(2(−0,25)) = −2/(−0,5) = 4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "h(4) = −0,25(4)² + 2(4) = −4 + 8 = 4", af: "h(4) = −0,25(4)² + 2(4) = −4 + 8 = 4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "the archway is 4 m high at its highest, and that happens 4 m from A", af: "die boog is op sy hoogste 4 m hoog, en dit gebeur 4 m van A af" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the question asks for TWO things, and they are not the same number here by anything other than luck. x = 4 is the DISTANCE from A; h(4) = 4 is the HEIGHT. Say which is which in your answer.", af: "PASOP: die vraag vra TWEE dinge, en dat hulle hier dieselfde getal is, is net toeval. x = 4 is die AFSTAND van A af; h(4) = 4 is die HOOGTE. Sê in jou antwoord watter een is watter.",
        } },
      ],
      esplain: {
        en: "A real-world question is an ordinary one wearing a hat. Strip the hat off first and ask what the letters mean: x is how far along the ground you have walked from the left foot, and h(x) is how high the stone is above your head at that point. So \"the maximum height\" is just \"the y-value of the turning point\", which is a thing you have found all year. Two habits keep it clean. First, decide happy or sad before you calculate anything — a is negative here, so the arch curves downwards and the turning point is a maximum, which is what an arch obviously should be. Second, do the two steps in order and label them: −b over 2a gives you WHERE, and substituting that back gives you HOW HIGH. Both numbers come out as 4 in this arch, which is a coincidence, so be careful to say which one answers which half of the question.", af: "'n Vraag uit die regte wêreld is 'n gewone vraag met 'n hoed op. Haal eers die hoed af en vra wat die letters beteken: x is hoe ver jy langs die grond van die linkervoet af geloop het, en h(x) is hoe hoog die klip op daardie punt bo jou kop is. Dus is “die maksimum hoogte” bloot “die y-waarde van die draaipunt”, iets wat jy die hele jaar al vind. Twee gewoontes hou dit netjies. Eerstens, besluit happy of sad voordat jy enigiets bereken: a is hier negatief, dus buig die boog afwaarts en die draaipunt is 'n maksimum, wat 'n boog natuurlik moet wees. Tweedens, doen die twee stappe in volgorde en benoem hulle: −b oor 2a gee jou WAAR, en as jy dit terug vervang, kry jy HOE HOOG. Albei getalle kom by hierdie boog op 4 uit, wat toeval is, so sê versigtig watter een watter helfte van die vraag beantwoord.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "A delivery van is 2 m wide and 3 m high. The driver keeps the van exactly in the middle of the archway.<br><br>Determine whether the van will fit through the archway, and by how much its roof clears the arch.", af: "'n Bestelwa is 2 m breed en 3 m hoog. Die bestuurder hou die bestelwa presies in die middel van die boog.<br><br>Bepaal of die bestelwa deur die boog sal pas, en hoeveel ruimte daar tussen sy dak en die boog oorbly.",
      },
      hint: {
        en: "The roof does not have to clear the arch in the middle — it has to clear it at the van's top CORNERS, which are the tightest place. Work out where those corners sit along the road first.", af: "Die dak hoef nie in die middel onder die boog deur te kom nie: dit moet by die bestelwa se boonste HOEKE deurkom, want daar is dit die nouste. Werk eers uit waar daardie hoeke langs die pad lê.",
      },
      memo: [
        { type: "step", text: { en: "The tightest place is at the van's top corners, not in the middle. The van is centred at the highest point, x = 4, and it is 2 m wide, so its sides are 1 m either side:", af: "Die nouste plek is by die bestelwa se boonste hoeke, nie in die middel nie. Die bestelwa is gesentreer by die hoogste punt, x = 4, en dit is 2 m breed, dus is sy kante elk 1 m van die middel af:" } },
        { type: "step", text: { en: "corners at &nbsp;x = 4 − 1 = 3&nbsp; and&nbsp; x = 4 + 1 = 5", af: "hoeke by &nbsp;x = 4 − 1 = 3&nbsp; en&nbsp; x = 4 + 1 = 5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "h(3) = −0,25(3)² + 2(3) = −2,25 + 6 = 3,75 &nbsp;&nbsp;(and h(5) = −6,25 + 10 = 3,75, the same by symmetry)", af: "h(3) = −0,25(3)² + 2(3) = −2,25 + 6 = 3,75 &nbsp;&nbsp;(en h(5) = −6,25 + 10 = 3,75, dieselfde weens simmetrie)" }, ticks: ["ca"] },
        { type: "step", text: { en: "3,75 &gt; 3, so the arch is higher than the van right where the van is widest", af: "3,75 &gt; 3, dus is die boog hoër as die bestelwa net daar waar die bestelwa die breedste is" }, ticks: ["ca"] },
        { type: "answer", text: { en: "yes, the van fits — the roof clears the arch by &nbsp;3,75 − 3 = 0,75 m", af: "ja, die bestelwa pas: die dak het &nbsp;3,75 − 3 = 0,75 m ruimte onder die boog" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — work out how wide the arch is at the van's height instead:", af: "<b>OF</b>, werk eerder uit hoe wyd die boog op die bestelwa se hoogte is:" } },
        { type: "step", text: { en: "−0,25x² + 2x = 3 &nbsp;⟹&nbsp; x² − 8x + 12 = 0 &nbsp;⟹&nbsp; (x − 2)(x − 6) = 0 &nbsp;⟹&nbsp; x = 2 or x = 6, so the arch is 4 m wide at a height of 3 m — wider than the 2 m van, so it fits", af: "−0,25x² + 2x = 3 &nbsp;⟹&nbsp; x² − 8x + 12 = 0 &nbsp;⟹&nbsp; (x − 2)(x − 6) = 0 &nbsp;⟹&nbsp; x = 2 of x = 6, dus is die boog 4 m wyd op 'n hoogte van 3 m: wyer as die bestelwa van 2 m, dus pas dit" } },
        { type: "trap", text: {
          en: "WATCH OUT: \"the arch is 4 m high and the van is 3 m high, so it fits\" scores almost nothing. The arch is only 4 m high at ONE point. A van has width, so its corners meet the arch where it is lower — that is the whole reason this question is worth 4 marks.", af: "PASOP: “die boog is 4 m hoog en die bestelwa 3 m hoog, dus pas dit” kry amper geen punte nie. Die boog is net by EEN punt 4 m hoog. 'n Bestelwa het breedte, dus kom sy hoeke by die boog waar dit laer is: dit is juis hoekom hierdie vraag 4 punte werd is.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that an arch is not a doorway. A doorway is the same height everywhere, so a comparison of two numbers settles it; an arch is only at its full height along one thin line down the middle, and a van is not thin. So the real question is: how high is the arch at the two places where the van's roof corners actually are? Once you ask it that way the work is easy — the van is centred on x = 4 and is 2 m wide, so it occupies from x = 3 to x = 5, and the corners are at those two x-values. Substituting either one into the model gives 3,75 m, and 3,75 is comfortably more than 3, so the van gets through with 75 cm to spare. There is a second road, equally good for marks: find how wide the arch is at exactly 3 m up by solving h(x) = 3, get 4 m of opening, and compare that to the van's 2 m width. Bank the earlier marks first — finish (a) and everything before it, then come back and give this one the time it deserves.", af: "Die feit wat jy hier moet gaan haal, is dat 'n boog nie 'n deur is nie. 'n Deur is oral ewe hoog, dus is dit genoeg om twee getalle te vergelyk; 'n boog is net langs een dun lyn in die middel op sy volle hoogte, en 'n bestelwa is nie dun nie. Die regte vraag is dus: hoe hoog is die boog by die twee plekke waar die bestelwa se dakhoeke werklik is? Sodra jy dit so vra, is die werk maklik: die bestelwa is gesentreer op x = 4 en is 2 m breed, dus strek dit van x = 3 tot x = 5, en die hoeke is by daardie twee x-waardes. Vervang enigeen in die model en jy kry 3,75 m, en 3,75 is gemaklik meer as 3, dus kom die bestelwa deur met 75 cm ruimte oor. Daar is 'n tweede pad, ewe goed vir punte: vind hoe wyd die boog presies 3 m hoog is deur h(x) = 3 op te los, kry 'n opening van 4 m, en vergelyk dit met die bestelwa se breedte van 2 m. Kry eers die vroeëre punte in die sak: maak (a) en alles daarvoor klaar, kom dan terug en gee hierdie een die tyd wat dit verdien.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE MAXIMUM VERTICAL DISTANCE, UN-CUED (her pp40–45).
   f(x) = −x² + 3x + 12 and g(x) = x − 3, meeting at A(−3 ; −6) and
   B(5 ; 2). No PQ is set up and nothing tells the learner to build a
   difference function — that is the whole level-4 move.
     f − g = −x² + 2x + 15, turning at x = −2/(2(−1)) = 1
     largest gap = −1 + 2 + 15 = 16 units, at x = 1
   The trap is real: f's OWN turning point is at x = 1,5, not 1.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: -1, b: 3, c: 12 };
const Q2_G = { kind: "line", a: 1, q: -3 };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 8, ymin: -10, ymax: 16 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: 5.5 },
      { ...Q2_G, tone: "b", label: "g", labelAt: 7 },
    ],
    points: [
      { x: -3, y: -6, on: [0, 1], label: "A(−3 ; −6)" },
      { x: 5, y: 2, on: [0, 1], label: "B(5 ; 2)" },
    ],
  },
  parts: {
    a: {
      question: {},
      reveal: { segment: { x: 1, fromCurve: 0, toCurve: 1, label: "16 units" } },
    },
  },
};

const q2 = {
  id: "func.l4.q2",
  chapter: CH,
  topic: "level-4",
  archetype: "maximum-vertical-distance-between-two-graphs-un-cued",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −x² + 3x + 12, &nbsp;and the straight line g, defined by &nbsp;g(x) = x − 3. &nbsp;They cut each other at A(−3 ; −6) and B(5 ; 2).<br><br>Determine the maximum vertical distance between f and g for values of x between A and B.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = −x² + 3x + 12, &nbsp;en die reguit lyn g, gedefinieer deur &nbsp;g(x) = x − 3. &nbsp;Hulle sny mekaar by A(−3 ; −6) en B(5 ; 2).<br><br>Bepaal die maksimum vertikale afstand tussen f en g vir waardes van x tussen A en B.",
      },
      hint: {
        en: "A vertical distance is one height minus the other, and here it changes as you move along. So write that distance down as an expression in x instead of a number, and then look hard at what kind of graph that expression is.", af: "'n Vertikale afstand is die een hoogte minus die ander, en hier verander dit soos jy aanbeweeg. Skryf daardie afstand dus as 'n uitdrukking in x neer in plaas van 'n getal, en kyk dan goed watter soort grafiek daardie uitdrukking is.",
      },
      memo: [
        { type: "step", text: { en: "Between A and B the parabola is above the line, so the vertical gap at any x is <b>top minus bottom</b>:", af: "Tussen A en B is die parabool bo die lyn, dus is die vertikale gaping by enige x <b>bo minus onder</b>:" } },
        { type: "step", text: { en: "gap = f(x) − g(x)", af: "gaping = f(x) − g(x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (−x² + 3x + 12) − (x − 3) = −x² + 2x + 15", af: "= (−x² + 3x + 12) − (x − 3) = −x² + 2x + 15" }, ticks: ["ca"] },
        { type: "step", text: { en: "That is a brand-new sad parabola, so the widest gap sits at <i>its</i> turning point:", af: "Dit is 'n splinternuwe sad parabool, dus lê die wydste gaping by <i>sy</i> draaipunt:" } },
        { type: "step", text: { en: "x = −b/(2a) = −2/(2(−1)) = 1", af: "x = −b/(2a) = −2/(2(−1)) = 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "gap = −(1)² + 2(1) + 15 = 16 &nbsp;&nbsp;∴&nbsp; the maximum vertical distance is 16 units", af: "gaping = −(1)² + 2(1) + 15 = 16 &nbsp;&nbsp;∴&nbsp; die maksimum vertikale afstand is 16 eenhede" }, ticks: ["ca", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the widest gap is NOT at f's own turning point. f turns at x = 1,5, but the difference graph turns at x = 1 — they are close enough here to look the same on a sketch, which is exactly why this catches people. Use the DIFFERENCE parabola.", af: "PASOP: die wydste gaping is NIE by f se eie draaipunt nie. f draai by x = 1,5, maar die verskilgrafiek draai by x = 1: hulle is hier naby genoeg om op 'n skets dieselfde te lyk, en dis presies hoekom mense hierin trap. Gebruik die VERSKIL-parabool.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: a distance is never negative. Subtracting the wrong way round gives x² − 2x − 15 and a minimum of −16 — the minus sign is the warning that the two graphs were taken in the wrong order.", af: "ONTHOU: 'n afstand is nooit negatief nie. As jy verkeerd om aftrek, kry jy x² − 2x − 15 en 'n minimum van −16: die minusteken waarsku jou dat die twee grafieke in die verkeerde volgorde geneem is.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that the gap between two graphs is itself a graph. Nothing in the question mentions a difference function, and there is no PQ drawn to lean on — you have to invent the tool. Start by noticing that the gap is not one number: at A and B it is zero, and somewhere in the middle it is at its widest, so it depends on x. Write it as f(x) minus g(x) and you are suddenly holding a brand-new parabola whose height at every x IS the gap there. Finding the biggest gap is then the same x = −b/(2a) move you have used all year, followed by substituting back. Two cautions and one temptation. Subtract top minus bottom, or your distance comes out negative. Do not reach for a Grade 12 derivative — the difference parabola gives the same answer and is the method you are being marked on. And resist using f's own turning point: it is at 1,5 while the answer is at 1, close enough to look right and wrong enough to cost every mark. Bank the earlier marks first, then come back to this one.", af: "Die feit wat jy hier moet gaan haal, is dat die gaping tussen twee grafieke self 'n grafiek is. Niks in die vraag noem 'n verskilfunksie nie, en daar is geen PQ geteken om op te steun nie: jy moet self die gereedskap uitdink. Begin deur raak te sien dat die gaping nie een getal is nie: by A en B is dit nul, en iewers in die middel is dit op sy wydste, dus hang dit van x af. Skryf dit as f(x) minus g(x) en skielik hou jy 'n splinternuwe parabool vas wie se hoogte by elke x die gaping daar IS. Om die grootste gaping te vind, is dan dieselfde stap, x = −b/(2a), wat jy die hele jaar al gebruik, gevolg deur terugvervanging. Twee waarskuwings en een versoeking. Trek bo minus onder af, anders kom jou afstand negatief uit. Moenie na 'n Graad 12-afgeleide gryp nie: die verskilparabool gee dieselfde antwoord en is die metode waarop jy gemerk word. En weerstaan die versoeking om f se eie draaipunt te gebruik: dit is by 1,5 terwyl die antwoord by 1 is, naby genoeg om reg te lyk en verkeerd genoeg om elke punt te kos. Kry eers die vroeëre punte in die sak, kom dan terug na hierdie een.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — y = k CUTTING f TWICE, BOTH x-VALUES POSITIVE (her pp52–58).
   f(x) = x² − 8x + 12 — a HAPPY parabola, so the reasoning runs the
   opposite way round to func.gt.t1q5(c) on the same tile (a sad one).
     (a) TP: x = 8/2 = 4, f(4) = −4; y-intercept 12
     (b) two cuts ⟹ k > −4;  both cuts right of the y-axis ⟹ k < 12
         ∴ −4 < k < 12
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: 1, b: -8, c: 12 };
const Q3_TP = { x: 4, y: -4, on: 0, label: "TP(4 ; −4)", place: "below" };
const Q3_YI = { x: 0, y: 12, on: 0, label: "(0 ; 12)" };
const Q3_BOUNDS = [
  { kind: "line", a: 0, q: 12, dash: true, tone: "b", label: "y = 12", labelAt: 8 },
  { kind: "line", a: 0, q: -4, dash: true, tone: "c", label: "y = −4", labelAt: 8 },
];
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -2, xmax: 9, ymin: -6, ymax: 16 },
    curves: [{ ...Q3_F, tone: "a", label: "f", labelAt: 7.5 }],
    points: [
      { x: 2, y: 0, on: 0, label: "(2 ; 0)" },
      { x: 6, y: 0, on: 0, label: "(6 ; 0)" },
    ],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q3_TP, Q3_YI] } },
    b: { question: { points: [Q3_TP, Q3_YI] }, reveal: { points: [Q3_TP, Q3_YI], curves: Q3_BOUNDS } },
  },
};

const q3 = {
  id: "func.l4.q3",
  chapter: CH,
  topic: "level-4",
  archetype: "sliding-horizontal-line-two-roots-both-positive-on-a-happy-parabola",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 8x + 12, &nbsp;cutting the x-axis at (2 ; 0) and (6 ; 0).<br><br>Determine the coordinates of the turning point of f, and write down the coordinates of the point where f cuts the y-axis.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 8x + 12, &nbsp;wat die x-as by (2 ; 0) en (6 ; 0) sny.<br><br>Bepaal die koördinate van die draaipunt van f, en skryf die koördinate neer van die punt waar f die y-as sny.",
      },
      hint: {
        en: "The turning point sits exactly halfway between the two x-intercepts, so you can find its x either that way or with the formula. The y-intercept needs no work at all — put x = 0 in.", af: "Die draaipunt lê presies halfpad tussen die twee x-afsnitte, dus kan jy sy x op dié manier of met die formule vind. Die y-afsnit vra glad geen werk nie: sit x = 0 in.",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = 8/(2(1)) = 4 &nbsp;&nbsp;(or read it as the midpoint of 2 and 6)", af: "x = −b/(2a) = 8/(2(1)) = 4 &nbsp;&nbsp;(of lees dit af as die middelpunt van 2 en 6)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "f(4) = 16 − 32 + 12 = −4 &nbsp;&nbsp;∴&nbsp; TP(4 ; −4)", af: "f(4) = 16 − 32 + 12 = −4 &nbsp;&nbsp;∴&nbsp; DP(4 ; −4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "f(0) = 12 &nbsp;&nbsp;∴&nbsp; f cuts the y-axis at (0 ; 12)", af: "f(0) = 12 &nbsp;&nbsp;∴&nbsp; f sny die y-as by (0 ; 12)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two quick facts, both of which the next part cannot do without. The turning point of a parabola always sits on the axis of symmetry, and the axis of symmetry always sits exactly halfway between the two x-intercepts — so with roots at 2 and 6 you can write x = 4 down without a formula, and use −b over 2a only as a check. Then substitute to get the height. The y-intercept is even quicker: it is the value the graph has when x is zero, which is simply the constant term c, so it is 12 and always was. Do not skip past that: the c in a quadratic is the y-intercept every single time, and spotting it saves a substitution. Both of these numbers are about to matter, because they are the floor and the ceiling of the next part's answer.", af: "Twee vinnige feite, en die volgende deel het albei nodig. Die draaipunt van 'n parabool lê altyd op die simmetrie-as, en die simmetrie-as lê altyd presies halfpad tussen die twee x-afsnitte: met wortels by 2 en 6 kan jy dus x = 4 sonder 'n formule neerskryf, en −b oor 2a net as kontrole gebruik. Vervang dan om die hoogte te kry. Die y-afsnit is selfs vinniger: dit is die waarde van die grafiek wanneer x nul is, en dit is bloot die konstante term c, dus is dit 12 en was dit nog altyd. Moenie daar verbyhardloop nie: die c in 'n kwadratiese funksie is elke keer die y-afsnit, en as jy dit raaksien, spaar jy 'n vervanging. Albei hierdie getalle gaan nou saak maak, want hulle is die vloer en die plafon van die volgende deel se antwoord.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Determine the values of k for which the line &nbsp;y = k&nbsp; will cut f at two points whose x-coordinates are both <b>positive</b>.", af: "Bepaal die waardes van k waarvoor die lyn &nbsp;y = k&nbsp; f sal sny by twee punte waarvan die x-koördinate albei <b>positief</b> is.",
      },
      hint: {
        en: "y = k is a horizontal line sliding up and down across f. Ask the question twice: how low may it go before it stops cutting twice, and how high may it rise before one of the two cuts crosses to the left of the y-axis?", af: "y = k is 'n horisontale lyn wat op en af oor f skuif. Vra die vraag twee keer: hoe laag mag dit gaan voordat dit ophou om twee keer te sny, en hoe hoog mag dit styg voordat een van die twee snypunte na links van die y-as oorsteek?",
      },
      memo: [
        { type: "step", text: { en: "y = k is a horizontal line sliding up and down across f, and the two cutting points are the roots. Two conditions, one at a time.", af: "y = k is 'n horisontale lyn wat op en af oor f skuif, en die twee snypunte is die wortels. Twee voorwaardes, een op 'n slag." } },
        { type: "step", text: { en: "<b>Two cuts.</b> f is happy with a minimum of −4, so the line must sit above that floor: &nbsp;k &gt; −4", af: "<b>Twee snypunte.</b> f is 'n happy parabool met 'n minimum van −4, dus moet die lyn bo daardie vloer lê: &nbsp;k &gt; −4" }, ticks: ["s/f"] },
        { type: "step", text: { en: "<b>Both cuts to the right of the y-axis.</b> f cuts the y-axis at 12. Any line above that height crosses the left arm on the far side of the y-axis, so the line must stay below it: &nbsp;k &lt; 12", af: "<b>Albei snypunte regs van die y-as.</b> f sny die y-as by 12. Enige lyn bo daardie hoogte sny die linkerarm aan die ander kant van die y-as, dus moet die lyn daaronder bly: &nbsp;k &lt; 12" }, ticks: ["ca"] },
        { type: "step", text: { en: "At k = 12 exactly, one cut lands on x = 0 — and zero is not positive, so 12 itself is out.", af: "By presies k = 12 val een snypunt op x = 0, en nul is nie positief nie, dus is 12 self uit." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ −4 &lt; k &lt; 12", af: "∴ −4 &lt; k &lt; 12" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: at k = −4 the line rests on the turning point — that is ONE (equal) root, not two, so the lower end is strictly open too. Both ends of this answer are strict.", af: "PASOP: by k = −4 rus die lyn op die draaipunt: dit is EEN (gelyke) wortel, nie twee nie, dus is die onderste kant ook streng oop. Albei kante van hierdie antwoord is streng.",
        } },
      ],
      esplain: {
        en: "Do not solve x² − 8x + 12 = k for x here; picture the line instead. Every horizontal line either cuts this parabola twice, touches it once at the bottom, or misses it underneath, and which of the three happens depends only on where k sits against the turning point's height of −4. So the first condition writes itself: the line has to be above −4, and strictly above, because sitting exactly on the turning point gives one repeated root rather than two different ones. The second condition is the one this part is starred for. Slide the line upwards and watch the LEFT cutting point travel left; the moment the line passes through the y-intercept at height 12, that left cut lands exactly on x = 0, and above 12 it has crossed into negative x. Zero is not positive, so 12 is out and anything higher is worse. Squeeze the two conditions together and the line has to live strictly between them. Notice that both deciding numbers, −4 and 12, had to be worked out in (a) — the question itself hands you neither.", af: "Moenie hier x² − 8x + 12 = k vir x oplos nie; sien eerder die lyn in jou kop. Elke horisontale lyn sny hierdie parabool óf twee keer, raak dit een keer onder aan, óf mis dit onderdeur, en watter een van die drie gebeur, hang net af van waar k lê teenoor die draaipunt se hoogte van −4. Die eerste voorwaarde skryf homself dus: die lyn moet bo −4 wees, en streng bo, want presies op die draaipunt kry jy een herhaalde wortel eerder as twee verskillende. Die tweede voorwaarde is die een waarvoor hierdie deel 'n ster kry. Skuif die lyn op en kyk hoe die LINKER snypunt na links beweeg; die oomblik wat die lyn deur die y-afsnit op hoogte 12 gaan, val daardie linker snypunt presies op x = 0, en bo 12 het dit al na negatiewe x oorgesteek. Nul is nie positief nie, dus is 12 uit en enigiets hoër is erger. Druk die twee voorwaardes saam en die lyn moet streng tussen hulle bly. Let op dat albei sleutelgetalle, −4 en 12, in (a) uitgewerk moes word: die vraag self gee jou nie een van hulle nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE TANGENT BY Δ = 0 (her pp52–58, "tangent = equal roots").
   f(x) = x² − 2x + 3, touched at x = 2.
     (a) T(2 ; 3)
     (b) x² − 2x + 3 = mx + c ⟹ x² − (2 + m)x + (3 − c) = 0 with a
         repeated root x = 2, so the roots sum to 4 and multiply to 4:
         2 + m = 4 ⟹ m = 2, and 3 − c = 4 ⟹ c = −1, giving y = 2x − 1.
     OR: T on the line gives c = 3 − 2m, and Δ = 0 collapses to
         (m − 2)² = 0. No calculus on either road.
   --------------------------------------------------------------- */
const Q4_F = { kind: "parabola", a: 1, b: -2, c: 3 };
const Q4_T = { x: 2, y: 3, on: 0, label: "T(2 ; 3)" };
const Q4_TAN = { kind: "line", a: 2, q: -1, dash: true, tone: "b", label: "y = 2x − 1", labelAt: 4.2 };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -2, xmax: 5, ymin: -4, ymax: 12 },
    curves: [{ ...Q4_F, tone: "a", label: "f", labelAt: -1.5 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_T] } },
    b: { question: { points: [Q4_T] }, reveal: { points: [Q4_T], curves: [Q4_TAN] } },
  },
};

const q4 = {
  id: "func.l4.q4",
  chapter: CH,
  topic: "level-4",
  archetype: "tangent-to-a-parabola-at-a-given-x-by-equal-roots",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 2x + 3. &nbsp;T is the point on f where &nbsp;x = 2.<br><br>Determine the coordinates of T.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 2x + 3. &nbsp;T is die punt op f waar &nbsp;x = 2.<br><br>Bepaal die koördinate van T.",
      },
      hint: {
        en: "T is on f, so its height is whatever f gives at that x. One substitution.", af: "T lê op f, dus is sy hoogte net wat f by daardie x gee. Een vervanging.",
      },
      memo: [
        { type: "step", text: { en: "T lies on f, so put x = 2 into f:", af: "T lê op f, dus sit x = 2 in f in:" } },
        { type: "step", text: { en: "f(2) = (2)² − 2(2) + 3 = 4 − 4 + 3 = 3", af: "f(2) = (2)² − 2(2) + 3 = 4 − 4 + 3 = 3" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "T(2 ; 3)", af: "T(2 ; 3)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Short, but it is the peg the whole card hangs on. A point being \"on\" a graph means one thing only: its two coordinates satisfy the equation, so once you know the x you get the y by substituting. Nothing else about T is known yet — it is not the turning point, and there is nothing special about it apart from the fact that the next part is going to lay a line against the curve exactly there. Write the coordinates as a pair rather than as a loose number, because in the next part you will need both: the x tells you where the repeated root has to be, and the y tells you a point the tangent must pass through.", af: "Kort, maar dit is die kapstok waaraan die hele kaart hang. Dat 'n punt “op” 'n grafiek lê, beteken net een ding: sy twee koördinate voldoen aan die vergelyking, dus kry jy die y deur te vervang sodra jy die x ken. Niks anders oor T is nog bekend nie: dit is nie die draaipunt nie, en daar is niks spesiaals aan nie, behalwe dat die volgende deel presies daar 'n lyn teen die kurwe gaan lê. Skryf die koördinate as 'n paar eerder as 'n los getal, want in die volgende deel het jy albei nodig: die x sê vir jou waar die herhaalde wortel moet wees, en die y gee jou 'n punt waardeur die raaklyn moet gaan.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "The line &nbsp;y = mx + c&nbsp; is a tangent to f at T. Determine the values of m and c. &nbsp;<b>Do not use a calculator's graph.</b>", af: "Die lyn &nbsp;y = mx + c&nbsp; is 'n raaklyn aan f by T. Bepaal die waardes van m en c. &nbsp;<b>Moenie 'n sakrekenaar se grafiek gebruik nie.</b>",
      },
      hint: {
        en: "A tangent TOUCHES the curve — it meets it at one point instead of two. Set the two equations equal and think about what \"one repeated root\" does to the quadratic you get, remembering that the repeated root has to be the x-value of T.", af: "'n Raaklyn RAAK die kurwe: dit ontmoet dit by een punt in plaas van twee. Stel die twee vergelykings gelyk en dink na oor wat “een herhaalde wortel” beteken vir die kwadratiese vergelyking wat jy kry; onthou dat die herhaalde wortel die x-waarde van T moet wees.",
      },
      memo: [
        { type: "step", text: { en: "A tangent <b>touches</b>, so f(x) = mx + c has <b>equal roots</b>, and the repeated root must be x = 2.", af: "'n Raaklyn <b>raak</b>, dus het f(x) = mx + c <b>gelyke wortels</b>, en die herhaalde wortel moet x = 2 wees." } },
        { type: "step", text: { en: "x² − 2x + 3 = mx + c", af: "x² − 2x + 3 = mx + c" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − (2 + m)x + (3 − c) = 0", af: "x² − (2 + m)x + (3 − c) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "the two roots are both 2, so they <b>add</b> to 4: &nbsp;2 + m = 4 &nbsp;⟹&nbsp; m = 2", af: "die twee wortels is albei 2, dus is hul <b>som</b> 4: &nbsp;2 + m = 4 &nbsp;⟹&nbsp; m = 2" }, ticks: ["ca"] },
        { type: "step", text: { en: "and they <b>multiply</b> to 4: &nbsp;3 − c = 4 &nbsp;⟹&nbsp; c = −1", af: "en hul <b>produk</b> is 4: &nbsp;3 − c = 4 &nbsp;⟹&nbsp; c = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "m = 2 &nbsp;and&nbsp; c = −1, &nbsp;so the tangent is &nbsp;y = 2x − 1", af: "m = 2 &nbsp;en&nbsp; c = −1, &nbsp;dus is die raaklyn &nbsp;y = 2x − 1" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — use the point first, then the discriminant:", af: "<b>OF</b>, gebruik eers die punt, dan die diskriminant:" } },
        { type: "step", text: { en: "T(2 ; 3) is on the line, so 3 = 2m + c ⟹ c = 3 − 2m. Equal roots means Δ = 0: &nbsp;(2 + m)² − 4(3 − c) = 0 ⟹ (2 + m)² − 8m = 0 ⟹ m² − 4m + 4 = 0 ⟹ (m − 2)² = 0 ⟹ m = 2, and then c = −1. Same five marks either way.", af: "T(2 ; 3) lê op die lyn, dus 3 = 2m + c ⟹ c = 3 − 2m. Gelyke wortels beteken Δ = 0: &nbsp;(2 + m)² − 4(3 − c) = 0 ⟹ (2 + m)² − 8m = 0 ⟹ m² − 4m + 4 = 0 ⟹ (m − 2)² = 0 ⟹ m = 2, en dan c = −1. Dieselfde vyf punte op albei maniere." } },
        { type: "trap", text: {
          en: "WATCH OUT: Δ = 0 on its own is not enough — it says the line touches SOMEWHERE. It is the extra fact that the touching point is x = 2 that pins m and c down to one answer each.", af: "PASOP: Δ = 0 op sy eie is nie genoeg nie: dit sê net die lyn raak IEWERS. Dit is die ekstra feit dat die raakpunt by x = 2 is wat m en c elk op een antwoord vasspeld.",
        } },
      ],
      esplain: {
        en: "There is no calculus in Grade 11, and none is needed: a tangent is simply a line that meets the curve exactly once, and \"exactly once\" is a discriminant statement you already know. Set the curve equal to the line, bring everything to one side, and you have a quadratic whose roots are the x-values where the two graphs meet. A tangent touches, so those roots collapse into one repeated root — and you have been told which one it is, because T sits at x = 2. From there the fastest road uses the two things a quadratic's roots always do: they add to −b over a and multiply to c over a. Both roots are 2, so they add to 4 and multiply to 4, and each of those gives you one unknown in one line. The other road is just as good for marks: put T into the line to get c in terms of m, then force Δ = 0 and watch it factorise into a perfect square, which is the algebra's own way of saying \"one repeated root\". Bank the earlier marks first, then take this one slowly.", af: "Daar is geen differensiaalrekening in Graad 11 nie, en jy het dit nie nodig nie: 'n raaklyn is bloot 'n lyn wat die kurwe presies een keer ontmoet, en “presies een keer” is iets wat die diskriminant jou sê, en dit ken jy reeds. Stel die kurwe gelyk aan die lyn, bring alles na een kant, en jy het 'n kwadratiese vergelyking waarvan die wortels die x-waardes is waar die twee grafieke ontmoet. 'n Raaklyn raak, dus smelt daardie wortels saam tot een herhaalde wortel, en jy is reeds vertel watter een dit is, want T lê by x = 2. Van daar af gebruik die vinnigste pad die twee dinge wat 'n kwadratiese vergelyking se wortels altyd doen: hul som is −b oor a en hul produk is c oor a. Albei wortels is 2, dus is hul som 4 en hul produk 4, en elkeen daarvan gee jou een onbekende in een reël. Die ander pad is net so goed vir punte: sit T in die lyn om c in terme van m te kry, dwing dan Δ = 0 af en kyk hoe dit as 'n volkome vierkant faktoriseer, wat die algebra se eie manier is om “een herhaalde wortel” te sê. Kry eers die vroeëre punte in die sak, en vat hierdie een dan stadig.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — PQ = 5 UNITS ON A HYPERBOLA AND A LINE (her pp40–45, run
   backwards: the length is given and the position is wanted).
   f(x) = 6/x and g(x) = x − 6, with P on f, Q on g, P above Q.
     6/x − (x − 6) = 5 ⟹ 6/x − x + 1 = 0 ⟹ x² − x − 6 = 0
     ⟹ (x − 3)(x + 2) = 0 ⟹ x = 3 or x = −2 — one on each branch,
     and BOTH are genuine (f(3) − g(3) = 2 + 3 = 5, and
     f(−2) − g(−2) = −3 + 8 = 5).
   The question side draws PQ at an ILLUSTRATIVE x = 5 — the same
   discipline js/exam/func-graphs-together.js uses — so the learner can
   see what PQ is without being shown where the answer lies.
   --------------------------------------------------------------- */
const Q5_F = { kind: "hyperbola", a: 6, p: 0, q: 0 };
const Q5_G = { kind: "line", a: 1, q: -6 };
const Q5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -7, xmax: 9, ymin: -11, ymax: 8 },
    curves: [
      { ...Q5_F, tone: "a", label: "f", labelAt: 6 },
      { ...Q5_G, tone: "b", label: "g", labelAt: -3 },
    ],
    segment: { x: 5, fromCurve: 0, toCurve: 1, label: "PQ" },
  },
  parts: {
    a: {
      question: {},
      /* THE REVEAL SEGMENT IS DRAWN AT x = −2, NOT x = 3 (crop review,
         2026-08-23). Both are answers, so either is honest — but the
         segment CAPTION is placed level with the segment's midpoint,
         and at x = 3 that midpoint is y = −0,5, which put "PQ = 5"
         straight through the x-axis. At x = −2 the midpoint is y = −5,5
         and the caption has clear air. Both P positions are marked
         either way, so neither answer is hidden. */
      reveal: {
        segment: { x: -2, fromCurve: 0, toCurve: 1, label: "PQ = 5" },
        points: [
          { x: 3, y: 2, on: 0, label: "P₁(3 ; 2)" },
          { x: -2, y: -3, on: 0, label: "P₂(−2 ; −3)" },
        ],
      },
    },
  },
};

const q5 = {
  id: "func.l4.q5",
  chapter: CH,
  topic: "level-4",
  archetype: "vertical-segment-of-a-given-length-between-a-hyperbola-and-a-line",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 4,
      prompt: {
        en: "The sketch shows the hyperbola f, defined by &nbsp;f(x) = 6/x, &nbsp;and the straight line g, defined by &nbsp;g(x) = x − 6. &nbsp;PQ is a line segment parallel to the y-axis, with P on f and Q on g, and with P lying above Q.<br><br>Determine the x-coordinate(s) of P for which &nbsp;PQ = 5 units.", af: "Die skets toon die hiperbool f, gedefinieer deur &nbsp;f(x) = 6/x, &nbsp;en die reguit lyn g, gedefinieer deur &nbsp;g(x) = x − 6. &nbsp;PQ is 'n lynstuk ewewydig aan die y-as, met P op f en Q op g, en met P bo Q.<br><br>Bepaal die x-koördinaat (of x-koördinate) van P waarvoor &nbsp;PQ = 5 eenhede.",
      },
      hint: {
        en: "PQ is vertical, so its length is the top height minus the bottom one. Write that difference, set it equal to 5, and then clear the fraction by multiplying every term by x — remembering that x cannot be zero.", af: "PQ is vertikaal, dus is sy lengte die boonste hoogte minus die onderste. Skryf daardie verskil neer, stel dit gelyk aan 5, en werk dan die breuk weg deur elke term met x te vermenigvuldig; onthou dat x nie nul kan wees nie.",
      },
      memo: [
        { type: "step", text: { en: "PQ is vertical, so its length is <b>top minus bottom</b>, and P is on top:", af: "PQ is vertikaal, dus is sy lengte <b>bo minus onder</b>, en P is bo:" } },
        { type: "step", text: { en: "f(x) − g(x) = 5 &nbsp;⟹&nbsp; 6/x − (x − 6) = 5", af: "f(x) − g(x) = 5 &nbsp;⟹&nbsp; 6/x − (x − 6) = 5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "6/x − x + 6 = 5 &nbsp;⟹&nbsp; 6/x − x + 1 = 0", af: "6/x − x + 6 = 5 &nbsp;⟹&nbsp; 6/x − x + 1 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "multiply every term by x, &nbsp;x ≠ 0: &nbsp;6 − x² + x = 0 &nbsp;⟹&nbsp; x² − x − 6 = 0", af: "vermenigvuldig elke term met x, &nbsp;x ≠ 0: &nbsp;6 − x² + x = 0 &nbsp;⟹&nbsp; x² − x − 6 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 3)(x + 2) = 0", af: "(x − 3)(x + 2) = 0" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 3 &nbsp;or&nbsp; x = −2", af: "x = 3 &nbsp;of&nbsp; x = −2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: there are TWO answers, one on each branch, and neither may be thrown away. Check them: at x = 3, &nbsp;2 − (−3) = 5 ✓; &nbsp;at x = −2, &nbsp;−3 − (−8) = 5 ✓. Dropping the negative one because it \"looks wrong\" costs a mark.", af: "PASOP: daar is TWEE antwoorde, een op elke vlerkie, en jy mag nie een weggooi nie. Kontroleer hulle: by x = 3, &nbsp;2 − (−3) = 5 ✓; &nbsp;by x = −2, &nbsp;−3 − (−8) = 5 ✓. As jy die negatiewe een laat val omdat dit “verkeerd lyk”, kos dit 'n punt.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: write x ≠ 0 down the moment you multiply through by x. It is the one value the hyperbola has no height at, so it can never be an answer.", af: "ONTHOU: skryf x ≠ 0 neer die oomblik wat jy elke term met x vermenigvuldig. Dit is die een waarde waar die hiperbool geen hoogte het nie, dus kan dit nooit 'n antwoord wees nie.",
        } },
      ],
      esplain: {
        en: "This is a length question asked backwards, and the trick is to write the length as an expression before you do anything else. PQ has both ends at the same x, so the horizontal part of the distance is zero and the length is nothing more than the difference of two heights: f's height minus g's, because you are told P is on top. Setting that equal to 5 gives an equation with an x in a denominator, and the standard move is to clear it — multiply every term by x, note x ≠ 0 as you go, and an ordinary quadratic falls out. Factorise and you get two answers, and both are real: one sits on the branch in the first quadrant, one on the branch in the third. That is the part worth slowing down for, because a sketch drawn in your head usually shows only the friendly right-hand branch, and the left one is just as valid. Always feed both answers back into the original heights to check — it takes ten seconds and it is the difference between four marks and five.", af: "Dit is 'n lengtevraag wat agterstevoor gevra word, en die truuk is om die lengte as 'n uitdrukking te skryf voordat jy enigiets anders doen. PQ het albei punte by dieselfde x, dus is die horisontale deel van die afstand nul en is die lengte niks meer as die verskil tussen twee hoogtes nie: f se hoogte minus g s'n, want jy word vertel dat P bo is. Stel dit gelyk aan 5 en jy kry 'n vergelyking met 'n x in die noemer, en die gewone stap is om die breuk weg te werk: vermenigvuldig elke term met x, skryf x ≠ 0 neer terwyl jy werk, en 'n gewone kwadratiese vergelyking val uit. Faktoriseer en jy kry twee antwoorde, en albei is geldig: een lê op die vlerkie in die eerste kwadrant, een op die vlerkie in die derde. Dit is die deel om voor stadiger te gaan, want 'n skets in jou kop wys gewoonlik net die vriendelike regterkantste vlerkie, en die linker een tel net soveel. Sit altyd albei antwoorde terug in die oorspronklike hoogtes om te kontroleer: dit vat tien sekondes en dit is die verskil tussen vier punte en vyf.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE HYPERBOLA'S SYMMETRY AXIS CUTTING A PARABOLA (her p10 for
   the symmetry lines, pp52–58 for solving two graphs together).
   h(x) = 4/(x − 1) + 2, centre (1 ; 2); the positive-gradient axis is
   y = x + 1. Against f(x) = x² − x − 7:
     x² − x − 7 = x + 1 ⟹ x² − 2x − 8 = 0 ⟹ (x − 4)(x + 2) = 0
     ⟹ (4 ; 5) and (−2 ; −1).
   The base figure draws NO asymptotes: (a) has to find the centre from
   the equation, and dashed guide lines would hand it over. They appear
   from (a)'s reveal onward, together with the axis line itself.

   f WAS x² − 2x − 3 IN THE FIRST DRAFT (crop review, 2026-08-23): with
   that parabola the second answer landed at (−1 ; 0), which is on the
   x-axis AND on f's own root AND on the dashed axis of symmetry — four
   strokes through one point, and the coordinate label had nowhere to
   sit that was not ruled through. f(x) = x² − x − 7 keeps the same
   clean factorisation, (x − 4)(x + 2), and puts both answers in clear
   space instead.
   --------------------------------------------------------------- */
const Q6_H = { kind: "hyperbola", a: 4, p: 1, q: 2 };
const Q6_F = { kind: "parabola", a: 1, b: -1, c: -7 };
const Q6_ASYM = [{ x: 1, of: 0, label: "x = 1" }, { y: 2, of: 0, label: "y = 2" }];
const Q6_AXIS = { kind: "line", a: 1, q: 1, dash: true, tone: "c", label: "y = x + 1", labelAt: 6.5 };
const Q6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 8, ymin: -9, ymax: 14 },
    curves: [
      { ...Q6_H, tone: "a", label: "h", labelAt: 5 },
      { ...Q6_F, tone: "b", label: "f", labelAt: -3 },
    ],
  },
  parts: {
    a: {
      question: {},
      reveal: { asymptotes: Q6_ASYM, points: [{ x: 1, y: 2, label: "(1 ; 2)" }], curves: [Q6_AXIS] },
    },
    b: {
      question: { asymptotes: Q6_ASYM, curves: [Q6_AXIS] },
      reveal: {
        asymptotes: Q6_ASYM, curves: [Q6_AXIS],
        points: [
          { x: 4, y: 5, on: 1, label: "(4 ; 5)" },
          { x: -2, y: -1, on: 1, label: "(−2 ; −1)" },
        ],
      },
    },
  },
};

const q6 = {
  id: "func.l4.q6",
  chapter: CH,
  topic: "level-4",
  archetype: "hyperbola-symmetry-axis-solved-against-a-parabola",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 4/(x − 1) + 2, &nbsp;together with the parabola f, defined by &nbsp;f(x) = x² − x − 7.<br><br>Determine the equation of the axis of symmetry of h that has a <b>positive</b> gradient.", af: "Die skets toon die hiperbool h, gedefinieer deur &nbsp;h(x) = 4/(x − 1) + 2, &nbsp;saam met die parabool f, gedefinieer deur &nbsp;f(x) = x² − x − 7.<br><br>Bepaal die vergelyking van die simmetrie-as van h wat 'n <b>positiewe</b> gradiënt het.",
      },
      hint: {
        en: "Both of a hyperbola's symmetry lines run through the point where its two asymptotes cross, and their gradients are 1 and −1. So find that crossing point first, then build the line with gradient 1 through it.", af: "Albei simmetrie-asse van 'n hiperbool gaan deur die punt waar sy twee asimptote kruis, en hul gradiënte is 1 en −1. Vind dus eers daardie kruispunt, en bou dan die lyn met gradiënt 1 daardeur.",
      },
      memo: [
        { type: "step", text: { en: "A hyperbola's two axes of symmetry both pass through the point where its asymptotes cross, with gradients +1 and −1.", af: "'n Hiperbool se twee simmetrie-asse gaan albei deur die punt waar sy asimptote kruis, met gradiënte +1 en −1." } },
        { type: "step", text: { en: "the asymptotes are x = 1 and y = 2, so they cross at (1 ; 2)", af: "die asimptote is x = 1 en y = 2, dus kruis hulle by (1 ; 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "positive gradient means m = 1: &nbsp;y − 2 = 1(x − 1)", af: "positiewe gradiënt beteken m = 1: &nbsp;y − 2 = 1(x − 1)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "y = x + 1", af: "y = x + 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: read the p out of the bracket with the OPPOSITE sign. The denominator x − 1 puts the vertical asymptote at x = +1, not at x = −1 — and getting that wrong moves the whole line.", af: "ONTHOU: lees die p uit die hakie met die TEENOORGESTELDE teken. Die noemer x − 1 sit die vertikale asimptoot by x = +1, nie by x = −1 nie, en as jy dit verkeerd kry, skuif die hele lyn.",
        } },
      ],
      esplain: {
        en: "A hyperbola looks lopsided, but it is beautifully symmetrical about the point where its two asymptotes cross — turn the page a half-turn about that point and it lands on itself. Two straight lines through that centre are mirror lines for it, and because the two branches sit at 45° between the asymptotes, those lines always have gradients of exactly 1 and −1. So a question like this is really two small questions. Where is the centre? Read it straight out of the standard form: the denominator tells you the vertical asymptote and the number on the end tells you the horizontal one, so the centre is (1 ; 2). Which of the two lines is wanted? The one with the positive gradient, so m = 1. Then use the point-gradient form and tidy. The only place marks go missing is the sign inside the bracket — x − 1 means the asymptote is at plus one, and a slip there shifts the answer by two whole units.", af: "'n Hiperbool lyk skeef, maar dit is pragtig simmetries rondom die punt waar sy twee asimptote kruis: draai die bladsy 'n halwe draai om daardie punt en dit val presies op homself. Twee reguit lyne deur daardie middelpunt is simmetrie-asse daarvan, en omdat die twee vlerkies op 45° tussen die asimptote lê, het daardie lyne altyd gradiënte van presies 1 en −1. 'n Vraag soos hierdie is dus eintlik twee klein vragies. Waar is die middelpunt? Lees dit reguit uit die standaardvorm af: die noemer gee jou die vertikale asimptoot en die getal aan die einde die horisontale een, dus is die middelpunt (1 ; 2). Watter een van die twee lyne word gevra? Die een met die positiewe gradiënt, dus m = 1. Gebruik dan die punt en die gradiënt om die vergelyking te skryf, en vereenvoudig. Die enigste plek waar jy punte verloor, is die teken binne die hakie: x − 1 beteken die asimptoot is by plus een, en 'n glips daar skuif die antwoord twee hele eenhede.",
      },
    },
    {
      id: "b",
      marks: 5,
      level: 4,
      prompt: {
        en: "Hence determine the coordinates of the points where this axis of symmetry cuts the parabola f.", af: "Bepaal vervolgens die koördinate van die punte waar hierdie simmetrie-as die parabool f sny.",
      },
      hint: {
        en: "Where two graphs cut, their y-values are equal at the same x — so set the two expressions equal to one another. You will get an ordinary quadratic; solve it, then find the matching heights.", af: "Waar twee grafieke sny, is hul y-waardes gelyk by dieselfde x: stel dus die twee uitdrukkings aan mekaar gelyk. Jy kry 'n gewone kwadratiese vergelyking; los dit op, en vind dan die ooreenstemmende hoogtes.",
      },
      memo: [
        { type: "step", text: { en: "At a cutting point both graphs have the same height at the same x, so set them equal:", af: "By 'n snypunt het albei grafieke dieselfde hoogte by dieselfde x, dus stel hulle gelyk:" } },
        { type: "step", text: { en: "x² − x − 7 = x + 1", af: "x² − x − 7 = x + 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x² − 2x − 8 = 0", af: "x² − 2x − 8 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "(x − 4)(x + 2) = 0 &nbsp;⟹&nbsp; x = 4 &nbsp;or&nbsp; x = −2", af: "(x − 4)(x + 2) = 0 &nbsp;⟹&nbsp; x = 4 &nbsp;of&nbsp; x = −2" }, ticks: ["ca"] },
        { type: "step", text: { en: "put each x back into the LINE (it is the easier of the two): &nbsp;y = 4 + 1 = 5&nbsp; and&nbsp; y = −2 + 1 = −1", af: "sit elke x terug in die LYN (dit is die makliker een van die twee): &nbsp;y = 4 + 1 = 5&nbsp; en&nbsp; y = −2 + 1 = −1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(4 ; 5) &nbsp;and&nbsp; (−2 ; −1)", af: "(4 ; 5) &nbsp;en&nbsp; (−2 ; −1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: substitute back into the LINE or into f — never into h. The line belongs to h, but the points you are asked for are on the PARABOLA, and h has nothing to do with where they are.", af: "PASOP: vervang terug in die LYN of in f, nooit in h nie. Die lyn behoort aan h, maar die punte wat gevra word, lê op die PARABOOL, en h het niks te doen met waar hulle is nie.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: a coordinate question wants pairs. Stopping at x = 4 and x = −2 leaves the answer mark on the table — go the last step and find both heights.", af: "ONTHOU: 'n koördinaatvraag wil pare hê. As jy by x = 4 en x = −2 stop, laat jy die antwoordpunt op die tafel lê: gaan die laaste tree en vind albei hoogtes.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that the line you built in (a) has finished its job of describing h and is now just a line — and a line meeting a parabola is the most ordinary simultaneous-equations question there is. Where two graphs cut, both equations are true at the same time, so you put one expression equal to the other and solve. Bring everything to one side, factorise, and you have the two x-values. Then finish properly: the question asks for coordinates, so each x needs its partner y, and you get it by substituting into whichever of the two equations is easier — here the line, obviously. One thing worth doing as a check: put x = 4 into the parabola as well and see that it also gives 5, because a cutting point has to satisfy both equations at once. And one thing worth avoiding: h itself. It was the reason the line exists, but it plays no part in this calculation at all. Bank the earlier marks first, then come back to this one.", af: "Die feit wat jy hier moet gaan haal, is dat die lyn wat jy in (a) gebou het, klaar is met sy werk om h te beskryf en nou net 'n lyn is, en 'n lyn wat 'n parabool ontmoet, is die gewoonste vraag oor gelyktydige vergelykings wat daar is. Waar twee grafieke sny, is albei vergelykings terselfdertyd waar, dus stel jy die een uitdrukking gelyk aan die ander en los op. Bring alles na een kant, faktoriseer, en jy het die twee x-waardes. Maak dan behoorlik klaar: die vraag vra koördinate, dus het elke x sy maat y nodig, en jy kry dit deur te vervang in watter een van die twee vergelykings ook al die maklikste is: hier natuurlik die lyn. Een ding wat die moeite werd is as kontrole: sit x = 4 ook in die parabool en sien dat dit ook 5 gee, want 'n snypunt moet albei vergelykings tegelyk bevredig. En een ding om te vermy: h self. Dit is die rede waarom die lyn bestaan, maar dit speel glad geen rol in hierdie berekening nie. Kry eers die vroeëre punte in die sak, kom dan terug na hierdie een.",
      },
    },
  ],
};

export const funcLevel4Questions = [q1, q2, q3, q4, q5, q6];
