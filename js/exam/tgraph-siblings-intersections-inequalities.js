/* ============================================================
   EXAM FOCUS — Trig Graphs · SIBLING CARDS for the skill
   "intersections-inequalities"   (SESSION E, 2026-08-23)
   ------------------------------------------------------------
   The question that closes the trig block in almost every Paper 2:
   two graphs on one set of axes, one intersection given, and then a
   battery of read-offs — the other intersection by symmetry, an
   inequality, a product-of-signs question, a "while one rises the
   other falls", and a count of solutions over a wider interval.

   ARCHETYPES from the bank (survey/SURVEY-Topic-Banks.md §2 —
   2025-Q4 "coords of B, interval where g ≥ f", 2025-Q6 "interval
   where g increases as f increases", 2025-Q9 "where f ≥ 0, where
   f·g ≤ 0", 2026-Q7 "read off f ≥ g and f·g ≤ 0", 2026-Q10 "where
   f − g ≥ 0, where f·g ≤ 0"; SURVEY-Nov-P2.md's own closing graph
   item; her Test 7 Q2 "intersections A and B, then f(x) − g(x) ≥ 0").
   Fresh pairs, fresh windows, fresh numbers.

   EVERY ANSWER IS READ, NOT SOLVED. Each pair below crosses at angles
   a Grade 11 learner can find honestly — special angles, or points
   given in the stem — because the algebra that would find them
   otherwise (the double-angle and compound-angle formulae) is Grade 12
   work. Where a y-value is not a whole number it is printed to two
   decimal places, exactly as the papers do.

   THE REVEALS are her cut-line-and-paint method made visible: an
   inequality answer comes back as a shaded strip between captioned
   dashed cut lines. Two-parameter wall respected on every curve.
   ============================================================ */

import { L } from "../lang.js";

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "intersections-inequalities";
const LOST = { chapter: CH, quest: "tg7" };

/* ===============================================================
   q1 — the opener: two facts off the equations, one count off the
   picture. f(x) = 2 sin x and g(x) = 2 cos x on [−180° ; 180°],
   crossing at A(45° ; 1,41) and once more at (−135° ; −1,41).
   =============================================================== */
const Q1_WIN = { xmin: -180, xmax: 180, ymin: -3, ymax: 3 };
const Q1_SPEC = {
  type: "trigg", win: Q1_WIN, xstep: 45, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "sin", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 160 },
    { fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: -140 },
  ],
  points: [{ x: 45, y: 1.41, on: [0, 1], label: "A(45° ; 1,41)", place: "above" }],
};

const q1 = {
  id: "tgraph.sib.ii.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "two-curves-read-period-amplitude-and-count-the-crossings",
  lostQuest: LOST,
  marks: 3,
  diagram: {
    spec: Q1_SPEC,
    parts: {
      a: { question: {}, reveal: { hmeasure: { x0: -180, x1: 180, y: 2, label: L("period of f = 360°", "periode van f = 360°") } } },
      b: { question: {}, reveal: { hlines: [{ y: 2, label: "y = 2" }, { y: -2, label: "y = −2" }] } },
      c: { question: {}, reveal: { points: [{ x: -135, y: -1.41, on: [0, 1], label: "(−135° ; −1,41)" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = 2 sin x&nbsp; and &nbsp;g(x) = 2 cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graphs cut each other at A(45° ; 1,41) and at one other point.<br><br>Write down the period of f.", af: "Die skets toon die grafieke van &nbsp;f(x) = 2 sin x&nbsp; en &nbsp;g(x) = 2 cos x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Die grafieke sny mekaar by A(45° ; 1,41) en by een ander punt.<br><br>Skryf die periode van f neer." },
      hint: { en: "Nothing is multiplying the x, so this is a plain sine graph as far as its width goes.", af: "Niks vermenigvuldig die x nie, so wat sy breedte betref, is dit 'n gewone sin-grafiek." },
      memo: [
        { type: "step", text: { en: "b = 1, so the period is &nbsp;360° ÷ 1.", af: "b = 1, so die periode is &nbsp;360° ÷ 1." } },
        { type: "answer", text: { en: "period = <b>360°</b>", af: "periode = <b>360°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "When a question hands you two graphs at once, the first thing to do is read each equation on its own and note what is different about it. Here f has a 2 in front, which is about height, and nothing at all with the x, which means its width is untouched. So its period is the plain 360°, and the sketch agrees: exactly one complete wave of f fits across the whole interval. The 2 in front is a decoy for this particular question, and being able to say confidently that it does not affect the period is what the mark is really for.", af: "As 'n vraag jou twee grafieke tegelyk gee, lees eers elke vergelyking op sy eie en let op wat anders daaraan is. Hier het f 'n 2 voor, wat oor hoogte gaan, en niks by die x nie, wat beteken sy breedte is onaangeraak. Dus is sy periode die gewone 360°, en die skets stem saam: presies een volledige golf van f pas oor die hele interval. Die 2 voor is vir hierdie vraag 'n lokval, en die punt is eintlik daarvoor dat jy met selfvertroue kan sê dit beïnvloed nie die periode nie." },
    },
    {
      id: "b", marks: 1, level: 1,
      prompt: { en: "Write down the amplitude of g.", af: "Skryf die amplitude van g neer." },
      hint: { en: "Careful which graph you are answering about. Amplitude is the size of the number in front of the cos.", af: "Pas op oor watter grafiek jy antwoord. Amplitude is die grootte van die getal voor die cos." },
      memo: [
        { type: "step", text: { en: "For &nbsp;g(x) = 2 cos x, &nbsp;amplitude = |a| = |2|.", af: "Vir &nbsp;g(x) = 2 cos x, &nbsp;amplitude = |a| = |2|." } },
        { type: "answer", text: { en: "amplitude = <b>2</b>", af: "amplitude = <b>2</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "The commonest way to lose this mark is to answer about the wrong graph, so check the letter in the question before you look at anything else. Here it is g, and g is the cosine. Its amplitude is the size of the number in front, which is 2, and the picture backs that up — g reaches up to 2 and down to −2. The two graphs on this sketch happen to have the same amplitude, which makes them the same height as each other; that is a coincidence of this question, not a rule, and on most exam sketches the two curves have different amplitudes on purpose.", af: "Die algemeenste manier om hierdie punt te verloor, is om oor die verkeerde grafiek te antwoord, so kyk na die letter in die vraag voordat jy na enigiets anders kyk. Hier is dit g, en g is die cos-grafiek. Sy amplitude is die grootte van die getal voor, wat 2 is, en die prentjie bevestig dit: g gaan op tot 2 en af tot −2. Die twee grafieke op hierdie skets het toevallig dieselfde amplitude, wat hulle ewe hoog maak; dit is toeval in hierdie vraag, nie 'n reël nie, en op die meeste eksamensketse het die twee kurwes doelbewus verskillende amplitudes." },
    },
    {
      id: "c", marks: 1, level: 1,
      prompt: { en: "For how many values of x in the given interval is &nbsp;f(x) = g(x)?", af: "Vir hoeveel waardes van x in die gegewe interval is &nbsp;f(x) = g(x)?" },
      hint: { en: "Two graphs are equal exactly where they cut each other. Count the crossing points on the sketch — do not solve anything.", af: "Twee grafieke is presies gelyk waar hulle mekaar sny. Tel die snypunte op die skets: moenie iets oplos nie." },
      memo: [
        { type: "step", text: { en: "f(x) = g(x)&nbsp; happens where the two curves cut each other.", af: "f(x) = g(x)&nbsp; gebeur waar die twee kurwes mekaar sny." } },
        { type: "answer", text: { en: "They cut twice in the interval &nbsp;∴&nbsp; <b>2</b> values of x", af: "Hulle sny twee keer in die interval &nbsp;∴&nbsp; <b>2</b> waardes van x" }, ticks: ["a"] },
      ],
      esplain: { en: "The whole idea behind reading a graph is that a picture answers some questions faster than algebra ever could, and this is one of them. Asking where f equals g is asking where the two curves have the same height at the same x, which is exactly where they cross. So you count crossings. The question gave you one of them, A, and the sketch shows a second down in the bottom left. There are no others inside this interval. Get into the habit of tracing across the whole interval with a finger rather than glancing — a crossing hiding near the edge of the picture is easy to miss, and it changes the answer.", af: "Die hele idee agter grafieklees is dat 'n prentjie sommige vrae vinniger beantwoord as wat algebra ooit kan, en dit is een daarvan. Om te vra waar f gelyk is aan g, is om te vra waar die twee kurwes by dieselfde x dieselfde hoogte het, en dit is presies waar hulle mekaar sny. Dus tel jy snypunte. Die vraag het jou een gegee, A, en die skets wys 'n tweede links onder. Daar is geen ander binne hierdie interval nie. Kry die gewoonte om met 'n vinger oor die hele interval te volg eerder as om net vinnig te kyk: 'n snypunt wat naby die rand van die prentjie wegkruip, is maklik om mis te kyk, en dit verander die antwoord." },
    },
  ],
};

/* ===============================================================
   q2 — the mirror-image crossing and an inequality.
   f(x) = cos x and g(x) = cos 2x on [−180° ; 180°]; they meet at
   x = −120°, 0° and 120°. A(120° ; −0,5) is given; B(−120° ; −0,5)
   is its mirror image. f ≥ g on −120° ≤ x ≤ 120°.
   =============================================================== */
const Q2_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 2 };
const Q2_SPEC = {
  type: "trigg", win: Q2_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 180 },
    { fn: "cos", a: 1, b: 2, p: 0, q: 0, tone: "b", label: "g", labelAt: -150 },
  ],
  points: [{ x: 120, y: -0.5, on: [0, 1], label: "A(120° ; −0,5)", place: "below" }],
};

const q2 = {
  id: "tgraph.sib.ii.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "mirror-image-intersection-then-an-f-greater-than-g-interval",
  lostQuest: LOST,
  marks: 5,
  diagram: {
    spec: Q2_SPEC,
    parts: {
      a: { question: {}, reveal: { points: [{ x: -120, y: -0.5, on: [0, 1], label: "B(−120° ; −0,5)", place: "below" }] } },
      b: {
        question: {},
        reveal: {
          points: [
            { x: -120, y: -0.5, on: [0, 1], label: "B(−120° ; −0,5)", place: "below" },
            { x: 0, y: 1, on: [0, 1], label: "(0 ; 1)", place: "above" },
          ],
        },
      },
      c: {
        question: {},
        reveal: {
          shades: [{ x0: -120, x1: 120 }],
          vlines: [{ x: -120, label: "x = −120°" }, { x: 120, label: "x = 120°" }],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = cos x&nbsp; and &nbsp;g(x) = cos 2x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;A(120° ; −0,5) is one of the points where the graphs cut each other, and B is another.<br><br>Write down the coordinates of B.", af: "Die skets toon die grafieke van &nbsp;f(x) = cos x&nbsp; en &nbsp;g(x) = cos 2x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;A(120° ; −0,5) is een van die punte waar die grafieke mekaar sny, en B is nog een.<br><br>Skryf die koördinate van B neer." },
      hint: { en: "Both of these graphs are mirror images of themselves in the y-axis. So if they cut each other at 120°, where else must they cut each other?", af: "Albei hierdie grafieke is hul eie gereflekteerde beeld in die y-as. As hulle mekaar by 120° sny, waar anders moet hulle mekaar sny?" },
      memo: [
        { type: "step", text: { en: "Both f and g are cosine graphs, and every cosine graph is symmetrical about the y-axis.", af: "f en g is albei cos-grafieke, en elke cos-grafiek is simmetries om die y-as." }, ticks: ["a"] },
        { type: "answer", text: { en: "So B is the mirror image of A: &nbsp;B(−120° ; −0,5)", af: "Dus is B die gereflekteerde beeld van A: &nbsp;B(−120° ; −0,5)" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: only the x-coordinate changes sign. The mirror is the y-AXIS, so a point reflects sideways and keeps its height. Writing B(−120° ; 0,5) flips the wrong coordinate.", af: "PASOP: net die x-koördinaat verander van teken. Die refleksie is in die y-AS, so 'n punt beweeg links of regs en behou sy hoogte. As jy B(−120° ; 0,5) skryf, draai jy die teken van die verkeerde koördinaat om." } },
      ],
      esplain: { en: "Symmetry is the fastest tool on a graph-reading question, and here both curves have the same one: a cosine graph always looks the same on the left of the y-axis as it does on the right. If you folded the page along the y-axis, f would land on itself and so would g. That means every crossing point also lands on another crossing point. A is 120° to the right of the fold, so its partner is 120° to the left, at −120°. The height does not change, because folding sideways does not move anything up or down, so B keeps A's y-value of −0,5. Say the reason out loud when you write it: the mark is for knowing WHY, not just for the coordinates.", af: "Simmetrie is die vinnigste hulpmiddel by 'n grafiekleesvraag, en hier het albei kurwes dieselfde simmetrie: 'n cos-grafiek lyk altyd links van die y-as dieselfde as regs daarvan. As jy die bladsy langs die y-as vou, sal f op homself val en g ook. Dit beteken elke snypunt val ook op 'n ander snypunt. A is 120° regs van die vou, so sy maat is 120° links daarvan, by −120°. Die hoogte verander nie, want 'n vou om die y-as skuif niks op of af nie, so B behou A se y-waarde van −0,5. Sê die rede hardop as jy dit skryf: die punt is daarvoor dat jy weet WAAROM, nie net vir die koördinate nie." },
    },
    {
      id: "b", marks: 1, level: 1,
      prompt: { en: "Write down the values of x for which &nbsp;f(x) = g(x)&nbsp; in the given interval.", af: "Skryf die waardes van x neer waarvoor &nbsp;f(x) = g(x)&nbsp; in die gegewe interval." },
      hint: { en: "You already have two of them. Look carefully at the y-axis — do the two graphs meet there as well?", af: "Jy het reeds twee daarvan. Kyk mooi na die y-as: ontmoet die twee grafieke mekaar daar ook?" },
      memo: [
        { type: "step", text: { en: "The curves meet at A, at B, and once more on the y-axis, where both graphs are at their maximum of 1.", af: "Die kurwes ontmoet mekaar by A, by B, en nog een keer op die y-as, waar albei grafieke by hul maksimum van 1 is." } },
        { type: "answer", text: { en: "x = −120°, &nbsp;x = 0° &nbsp;and&nbsp; x = 120°", af: "x = −120°, &nbsp;x = 0° &nbsp;en&nbsp; x = 120°" }, ticks: ["a"] },
      ],
      esplain: { en: "The crossing on the y-axis is the one people miss, because it does not look like a crossing — the two curves touch there and separate again rather than passing through each other. It counts all the same. Both f and g are at their highest point when x is zero: cos 0° is 1 and cos 0° is also 1, so both graphs are at a height of 1 at the same moment, which is exactly what f(x) = g(x) means. The lesson is to read a graph for equal heights rather than for dramatic crossings. Anywhere the two curves touch, meet or cross, they are equal there.", af: "Die snypunt op die y-as is die een wat mense mis, want dit lyk nie soos 'n snypunt nie: die twee kurwes raak mekaar daar en skei weer, eerder as om deur mekaar te gaan. Dit tel nogtans. f en g is albei by hul hoogste punt wanneer x nul is: cos 0° is 1 en cos 0° is ook 1, so albei grafieke is op dieselfde oomblik op 'n hoogte van 1, en dit is presies wat f(x) = g(x) beteken. Die les is om 'n grafiek vir gelyke hoogtes te lees eerder as vir dramatiese snypunte. Oral waar die twee kurwes raak, ontmoet of sny, is hulle daar gelyk." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: "For which values of x is &nbsp;f(x) ≥ g(x)?", af: "Vir watter waardes van x is &nbsp;f(x) ≥ g(x)?" },
      hint: { en: "Draw a light vertical cut line through every point where the graphs meet. Then look at each strip in turn and ask one question: which curve is on top here?", af: "Teken 'n ligte vertikale snylyn deur elke punt waar die grafieke ontmoet. Kyk dan na elke interval op sy beurt en vra een vraag: watter kurwe is hier bo?" },
      memo: [
        { type: "step", text: { en: "Cut the interval at the meeting points: &nbsp;x = −120°, 0° and 120°.", af: "Sny die interval by die ontmoetingspunte: &nbsp;x = −120°, 0° en 120°." } },
        { type: "step", text: { en: "In the strips between −120° and 120° the f curve is on top (or level with g at the meeting points). Outside them, g is on top.", af: "In die intervalle tussen −120° en 120° is die f-kurwe bo (of gelyk met g by die ontmoetingspunte). Buite hulle is g bo." }, ticks: ["ca"] },
        { type: "answer", text: { en: "−120° ≤ x ≤ 120°", af: "−120° ≤ x ≤ 120°" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: the sign is ≥, not >, so the meeting points themselves are INCLUDED — at −120° and 120° the two graphs are equal, which still satisfies \"f is greater than or equal to g\". Use ≤ signs in your answer, not < signs.", af: "ONTHOU: die teken is ≥ en nie > nie, so die ontmoetingspunte self is INGESLUIT: by −120° en 120° is die twee grafieke gelyk, wat steeds aan \"f is groter as of gelyk aan g\" voldoen. Gebruik ≤-tekens in jou antwoord, nie <-tekens nie." } },
      ],
      esplain: { en: "This is her cut-line-and-paint method, and it works on trig graphs exactly as it does on parabolas. First find every place the two graphs meet, and rule a light vertical line through each one — those are the only places where the answer can change from true to false. Here that gives cut lines at −120°, 0° and 120°, which chop the interval into four strips. Then walk the strips one at a time and ask which curve is higher. Nothing has to be calculated; you are reading. Between −120° and 120°, f sits at or above g the whole way, including at the touching point on the y-axis, so those two strips join into one answer. Outside them g is higher. Last, match your brackets to the sign in the question.", af: "Dit is haar snylyn-en-verf-metode, en dit werk op trig-grafieke presies soos op parabole. Kry eers elke plek waar die twee grafieke ontmoet, en teken 'n ligte vertikale lyn deur elkeen: dit is die enigste plekke waar die antwoord van waar na onwaar kan verander. Hier gee dit snylyne by −120°, 0° en 120°, wat die interval in vier intervalle opkap. Gaan dan die intervalle een vir een deur en vra watter kurwe hoër is. Niks hoef bereken te word nie; jy lees. Tussen −120° en 120° lê f die hele pad op of bo g, ook by die raakpunt op die y-as, so daardie twee intervalle word een antwoord. Buite hulle is g hoër. Laastens: pas jou hakies by die teken in die vraag aan." },
    },
  ],
};

/* ===============================================================
   q3 — the product-of-signs question.
   f(x) = cos x and g(x) = sin x on [0° ; 360°].
   f·g < 0 where the two have opposite signs: 90° < x < 180° and
   270° < x < 360°.
   =============================================================== */
const Q3_WIN = { xmin: 0, xmax: 360, ymin: -2, ymax: 2 };
const Q3_SPEC = {
  type: "trigg", win: Q3_WIN, xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 30 },
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: 120 },
  ],
};

const q3 = {
  id: "tgraph.sib.ii.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "where-is-the-product-of-two-trig-graphs-negative",
  lostQuest: LOST,
  marks: 4,
  diagram: {
    spec: Q3_SPEC,
    parts: {
      a: {
        question: {},
        reveal: { points: [{ x: 90, y: 0, on: 0, label: "(90° ; 0)", place: "above" }, { x: 270, y: 0, on: 0, label: "(270° ; 0)", place: "above" }] },
      },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: 90, x1: 180 }, { x0: 270, x1: 360 }],
          vlines: [{ x: 90, label: "x = 90°" }, { x: 180, label: "x = 180°" }, { x: 270, label: "x = 270°" }],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = cos x&nbsp; and &nbsp;g(x) = sin x&nbsp; for &nbsp;x ∈ [0° ; 360°].<br><br>Write down the coordinates of the x-intercepts of f in the given interval.", af: "Die skets toon die grafieke van &nbsp;f(x) = cos x&nbsp; en &nbsp;g(x) = sin x&nbsp; vir &nbsp;x ∈ [0° ; 360°].<br><br>Skryf die koördinate van die x-afsnitte van f in die gegewe interval neer." },
      hint: { en: "An x-intercept is where the graph is at height zero. Read them straight off the sketch — a cosine crosses the axis a quarter of a period in, and every half period after that.", af: "'n x-afsnit is waar die grafiek op hoogte nul is. Lees hulle reguit van die skets af: 'n cos-grafiek sny die as 'n kwart periode in, en daarna elke halwe periode." },
      memo: [
        { type: "step", text: { en: "cos x = 0&nbsp; at a quarter of a period and again three quarters of the way through.", af: "cos x = 0&nbsp; by 'n kwart periode en weer driekwart van die pad deur." } },
        { type: "answer", text: { en: "(90° ; 0) &nbsp;and&nbsp; (270° ; 0)", af: "(90° ; 0) &nbsp;en&nbsp; (270° ; 0)" }, ticks: ["a"] },
      ],
      esplain: { en: "Finding where each graph crosses the x-axis is the setting-up step for every product question, so it is worth doing carefully even when it looks trivial. A cosine starts at its maximum and first reaches zero a quarter of a period later, which here is 90°. After that it crosses every half period, so the next one is at 270°. The question asked for coordinates, not just x-values, so write them as ordered pairs with the zero included. It is also worth noting g's intercepts while you are here — sin x is zero at 0°, 180° and 360° — because part (b) needs both lists.", af: "Om te kry waar elke grafiek die x-as sny, is die opstelstap vir elke produkvraag, so dit is die moeite werd om dit versigtig te doen, selfs as dit triviaal lyk. Die cos-grafiek begin by sy maksimum en bereik nul vir die eerste keer 'n kwart periode later, wat hier 90° is. Daarna sny dit elke halwe periode, so die volgende een is by 270°. Die vraag het koördinate gevra, nie net x-waardes nie, so skryf hulle as geordende pare met die nul ingesluit. Let sommer ook nou op g se afsnitte (sin x is nul by 0°, 180° en 360°), want deel (b) het albei lyste nodig." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: "For which values of x is &nbsp;f(x)·g(x) &lt; 0?", af: "Vir watter waardes van x is &nbsp;f(x)·g(x) &lt; 0?" },
      hint: { en: "A product is negative when the two things being multiplied have OPPOSITE signs. So look for the stretches where one curve is above the x-axis while the other is below it.", af: "'n Produk is negatief wanneer die twee dinge wat vermenigvuldig word TEENOORGESTELDE tekens het. Soek dus die stukke waar een kurwe bo die x-as is terwyl die ander onder dit is." },
      memo: [
        { type: "step", text: { en: "A product is negative when one factor is positive and the other is negative — so look for where one curve is ABOVE the x-axis and the other is BELOW it.", af: "'n Produk is negatief wanneer een faktor positief en die ander negatief is: soek dus waar een kurwe BO die x-as is en die ander ONDER dit." } },
        { type: "step", text: { en: "Cut the interval at every x-intercept of either graph: &nbsp;x = 0°, 90°, 180°, 270°, 360°.", af: "Sny die interval by elke x-afsnit van enige van die grafieke: &nbsp;x = 0°, 90°, 180°, 270°, 360°." }, ticks: ["ca"] },
        { type: "step", text: { en: "90° to 180°: &nbsp;g is above, f is below &nbsp;⟹&nbsp; product negative ✔<br>270° to 360°: &nbsp;f is above, g is below &nbsp;⟹&nbsp; product negative ✔<br>the other two strips have both curves on the same side ⟹ product positive", af: "90° tot 180°: &nbsp;g is bo, f is onder &nbsp;⟹&nbsp; produk negatief ✔<br>270° tot 360°: &nbsp;f is bo, g is onder &nbsp;⟹&nbsp; produk negatief ✔<br>in die ander twee intervalle is albei kurwes aan dieselfde kant ⟹ produk positief" }, ticks: ["ca"] },
        { type: "answer", text: { en: "90° &lt; x &lt; 180° &nbsp;&nbsp;or&nbsp;&nbsp; 270° &lt; x &lt; 360°", af: "90° &lt; x &lt; 180° &nbsp;&nbsp;of&nbsp;&nbsp; 270° &lt; x &lt; 360°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the sign is &lt;, so the ends are NOT included. At x = 90°, 180° and 270° one of the graphs is exactly zero, which makes the product zero — and zero is not less than zero. Use round brackets or strict inequality signs.", af: "PASOP: die teken is &lt;, so die eindpunte is NIE ingesluit nie. By x = 90°, 180° en 270° is een van die grafieke presies nul, wat die produk nul maak, en nul is nie kleiner as nul nie. Gebruik ronde hakies of streng ongelykheidstekens." } },
      ],
      esplain: { en: "A product question is a signs question, so stop thinking about heights and think only about above or below. The rule is the one you already know from multiplying numbers: two positives give a positive, two negatives give a positive, and one of each gives a negative. So you are hunting for the stretches where one curve is above the axis while the other is below it. The setting up is what makes it manageable. Rule a cut line at every x-intercept of EITHER graph, because those are the only places a sign can change, and then walk the strips one at a time writing a plus or a minus for each curve. Multiply the two signs in each strip and collect the strips that came out negative. Finally check the ends: where either graph is zero the product is zero, so a strict inequality leaves those points out.", af: "'n Produkvraag is 'n tekensvraag, so hou op om aan hoogtes te dink en dink net aan bo of onder. Die reël is die een wat jy reeds ken van getalle vermenigvuldig: twee positiewes gee 'n positief, twee negatiewes gee 'n positief, en een van elk gee 'n negatief. Jy soek dus die stukke waar een kurwe bo die as is terwyl die ander onder dit is. Die opstelwerk maak dit hanteerbaar. Teken 'n snylyn by elke x-afsnit van ENIGE van die grafieke, want dit is die enigste plekke waar 'n teken kan verander, en gaan dan die intervalle een vir een deur en skryf 'n plus of 'n minus vir elke kurwe. Vermenigvuldig die twee tekens in elke interval en versamel die intervalle wat negatief uitkom. Kontroleer laastens die eindpunte: waar enige van die grafieke nul is, is die produk nul, so 'n streng ongelykheid laat daardie punte uit." },
    },
  ],
};

/* ===============================================================
   q4 — the f ≥ g inequality with a squashed graph.
   f(x) = sin x and g(x) = sin 2x on [−90° ; 180°]. They meet at
   x = −60°, 0°, 60° and 180°, and f ≥ g on [−60° ; 0°] and
   [60° ; 180°].
   =============================================================== */
const Q4_WIN = { xmin: -90, xmax: 180, ymin: -2, ymax: 2 };
const Q4_SPEC = {
  type: "trigg", win: Q4_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  /* g is curve 0 on purpose: js/engine/trig-graph.js's period arrow is
     always measured against curve 0, and part (a) is about g's period. */
  curves: [
    { fn: "sin", a: 1, b: 2, p: 0, q: 0, tone: "b", label: "g", labelAt: 140 },
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 100 },
  ],
  points: [
    { x: -60, y: -0.87, on: [0, 1] },
    { x: 0, y: 0, on: [0, 1] },
    { x: 60, y: 0.87, on: [0, 1] },
  ],
};

const q4 = {
  id: "tgraph.sib.ii.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "f-greater-or-equal-g-across-several-strips",
  lostQuest: LOST,
  marks: 4,
  diagram: {
    spec: Q4_SPEC,
    parts: {
      a: { question: {}, reveal: { hmeasure: { x0: 0, x1: 180, y: 1.5, label: L("period of g = 180°", "periode van g = 180°") } } },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: -60, x1: 0 }, { x0: 60, x1: 180 }],
          vlines: [{ x: -60, label: "x = −60°" }, { x: 0, label: "x = 0°" }, { x: 60, label: "x = 60°" }],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = sin x&nbsp; and &nbsp;g(x) = sin 2x&nbsp; for &nbsp;x ∈ [−90° ; 180°]. &nbsp;The dots mark three of the points where the graphs meet; they also meet at &nbsp;x = 180°.<br><br>Write down the period of g.", af: "Die skets toon die grafieke van &nbsp;f(x) = sin x&nbsp; en &nbsp;g(x) = sin 2x&nbsp; vir &nbsp;x ∈ [−90° ; 180°]. &nbsp;Die kolletjies wys drie van die punte waar die grafieke ontmoet; hulle ontmoet ook by &nbsp;x = 180°.<br><br>Skryf die periode van g neer." },
      hint: { en: "The 2 is with the x, so it squashes the graph. Divide 360° by it.", af: "Die 2 is by die x, so dit druk die grafiek saam. Deel 360° daardeur." },
      memo: [
        { type: "step", text: { en: "Period of g = 360° ÷ 2", af: "Periode van g = 360° ÷ 2" } },
        { type: "answer", text: { en: "period of g = <b>180°</b>", af: "periode van g = <b>180°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "Note that this part is about g, the squashed one, not about f. Its b is 2, so its period is 180° — half of f's. On the sketch that shows up as g completing a whole wave in the space f only gets halfway through, which is what makes the two curves cross each other several times instead of once or twice. Working out both periods before you start an inequality question is worth the ten seconds: the ratio between them tells you roughly how many crossings to expect, so you know whether you have found them all.", af: "Let op dat hierdie deel oor g gaan, die saamgedrukte een, nie oor f nie. Sy b is 2, so sy periode is 180°: die helfte van f s'n. Op die skets wys dit as g wat 'n hele golf voltooi in die ruimte waar f net halfpad kom, en dit is waarom die twee kurwes mekaar 'n paar keer sny in plaas van een of twee keer. Om albei periodes uit te werk voordat jy 'n ongelykheidsvraag begin, is die tien sekondes werd: die verhouding tussen hulle sê vir jou rofweg hoeveel snypunte om te verwag, so jy weet of jy hulle almal gekry het." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: "For which values of x is &nbsp;f(x) ≥ g(x)?", af: "Vir watter waardes van x is &nbsp;f(x) ≥ g(x)?" },
      hint: { en: "Cut the picture at every point where the graphs meet — there are four of them in this interval — and then walk the strips asking which curve is on top.", af: "Sny die prentjie by elke punt waar die grafieke ontmoet (daar is vier in hierdie interval) en gaan dan die intervalle deur en vra watter kurwe bo is." },
      memo: [
        { type: "step", text: { en: "Cut lines at every meeting point: &nbsp;x = −60°, 0°, 60° and 180°.", af: "Snylyne by elke ontmoetingspunt: &nbsp;x = −60°, 0°, 60° en 180°." }, ticks: ["ca"] },
        { type: "step", text: { en: "−90° to −60°: g on top ✘ &nbsp;&nbsp;|&nbsp;&nbsp; −60° to 0°: f on top ✔<br>0° to 60°: g on top ✘ &nbsp;&nbsp;|&nbsp;&nbsp; 60° to 180°: f on top ✔", af: "−90° tot −60°: g bo ✘ &nbsp;&nbsp;|&nbsp;&nbsp; −60° tot 0°: f bo ✔<br>0° tot 60°: g bo ✘ &nbsp;&nbsp;|&nbsp;&nbsp; 60° tot 180°: f bo ✔" }, ticks: ["ca"] },
        { type: "answer", text: { en: "−60° ≤ x ≤ 0° &nbsp;&nbsp;or&nbsp;&nbsp; 60° ≤ x ≤ 180°", af: "−60° ≤ x ≤ 0° &nbsp;&nbsp;of&nbsp;&nbsp; 60° ≤ x ≤ 180°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: two separate strips means two separate pieces in your answer, joined by the word OR. Writing −60° ≤ x ≤ 180° would claim the middle strip as well, where g is actually the higher graph.", af: "PASOP: twee aparte intervalle beteken twee aparte stukke in jou antwoord, verbind deur die woord OF. As jy −60° ≤ x ≤ 180° skryf, eis jy ook die middelste interval op, waar g eintlik die hoër grafiek is." } },
      ],
      esplain: { en: "The more often two graphs cross, the more the cut-line habit earns its keep. Start by marking every place the curves meet, because between two meetings the same curve stays on top the whole way — it cannot overtake without crossing. Here there are four meetings, which cut the interval into four strips, and you only need to check one point in each strip to know which curve wins there. Then collect the winning strips. Two of them are not next to each other, so the answer has two separate pieces and needs the word or between them, not a single long inequality. Last, look at the sign in the question: it is greater-than-or-equal, so the meeting points themselves belong in the answer and the brackets are the closed kind.", af: "Hoe meer twee grafieke mekaar sny, hoe meer betaal die snylyn-gewoonte. Begin deur elke plek te merk waar die kurwes ontmoet, want tussen twee ontmoetings bly dieselfde kurwe die hele pad bo: dit kan nie verbygaan sonder om te sny nie. Hier is daar vier ontmoetings, wat die interval in vier intervalle opkap, en jy hoef net een punt in elke interval te toets om te weet watter kurwe daar wen. Versamel dan die wen-intervalle. Twee daarvan lê nie langs mekaar nie, so die antwoord het twee aparte stukke en het die woord of tussen hulle nodig, nie een lang ongelykheid nie. Kyk laastens na die teken in die vraag: dit is groter-as-of-gelyk-aan, so die ontmoetingspunte self hoort in die antwoord en die hakies is die geslote soort." },
    },
  ],
};

/* ===============================================================
   q5 — one graph rising while the other falls.
   f(x) = sin x and g(x) = cos 2x on [0° ; 360°].
   f increases on (0° ; 90°) and (270° ; 360°); g decreases on
   (0° ; 90°) and (180° ; 270°); both together only on (0° ; 90°).
   =============================================================== */
const Q5_WIN = { xmin: 0, xmax: 360, ymin: -2, ymax: 2 };
const Q5_SPEC = {
  type: "trigg", win: Q5_WIN, xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 },
    { fn: "cos", a: 1, b: 2, p: 0, q: 0, tone: "b", label: "g", labelAt: 225 },
  ],
};

const q5 = {
  id: "tgraph.sib.ii.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "where-does-one-graph-increase-while-the-other-decreases",
  lostQuest: LOST,
  marks: 6,
  diagram: {
    spec: Q5_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          shades: [{ x0: 0, x1: 90 }, { x0: 270, x1: 360 }],
          vlines: [{ x: 90, label: "x = 90°" }, { x: 270, label: "x = 270°" }],
        },
      },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: 0, x1: 90 }, { x0: 180, x1: 270 }],
          vlines: [{ x: 90, label: "x = 90°" }, { x: 180, label: "x = 180°" }, { x: 270, label: "x = 270°" }],
        },
      },
      c: {
        question: {},
        reveal: { shades: [{ x0: 0, x1: 90 }], vlines: [{ x: 90, label: "x = 90°" }] },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = sin x&nbsp; and &nbsp;g(x) = cos 2x&nbsp; for &nbsp;x ∈ [0° ; 360°].<br><br>For which values of x is f increasing?", af: "Die skets toon die grafieke van &nbsp;f(x) = sin x&nbsp; en &nbsp;g(x) = cos 2x&nbsp; vir &nbsp;x ∈ [0° ; 360°].<br><br>Vir watter waardes van x is f stygend?" },
      hint: { en: "\"Increasing\" means the curve is going UP as you read from left to right. Trace f with your finger and mark where it climbs.", af: "\"Stygend\" beteken die kurwe gaan OP as jy van links na regs lees. Volg f met jou vinger en merk waar dit klim." },
      memo: [
        { type: "step", text: { en: "f climbs from the origin up to its maximum, then falls to its minimum, then climbs again to the end of the interval.", af: "f klim van die oorsprong op tot by sy maksimum, val dan tot by sy minimum, en klim dan weer tot aan die einde van die interval." }, ticks: ["ca"] },
        { type: "answer", text: { en: "0° &lt; x &lt; 90° &nbsp;&nbsp;or&nbsp;&nbsp; 270° &lt; x &lt; 360°", af: "0° &lt; x &lt; 90° &nbsp;&nbsp;of&nbsp;&nbsp; 270° &lt; x &lt; 360°" }, ticks: ["a"] },
      ],
      esplain: { en: "Increasing and decreasing are read left to right, exactly like reading a sentence. Put your finger at the left-hand end of the graph and drag it along the curve: wherever your finger rises, the graph is increasing, and wherever it drops, the graph is decreasing. The change always happens at a turning point, which is why turning points are the natural cut lines for this kind of question. Here f rises out of the origin to its maximum at 90°, then falls all the way to its minimum at 270°, then rises again to the end. So there are two separate rising stretches. Turning points themselves are neither rising nor falling, which is why the ends are left out with strict inequality signs.", af: "Stygend en dalend word van links na regs gelees, net soos jy 'n sin lees. Sit jou vinger by die linkerkant van die grafiek en skuif dit langs die kurwe: oral waar jou vinger styg, is die grafiek stygend, en oral waar dit daal, is die grafiek dalend. Die verandering gebeur altyd by 'n draaipunt, en daarom is draaipunte die natuurlike snylyne vir hierdie soort vraag. Hier styg f uit die oorsprong tot by sy maksimum by 90°, val dan die hele pad tot by sy minimum by 270°, en styg dan weer tot aan die einde. Daar is dus twee aparte stygende stukke. Draaipunte self is nie stygend of dalend nie, en daarom word die eindpunte met streng ongelykheidstekens uitgelaat." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "For which values of x is g decreasing?", af: "Vir watter waardes van x is g dalend?" },
      hint: { en: "g completes two whole waves in this interval, so it falls twice. Find its turning points first — they are the places where falling turns into rising.", af: "g voltooi twee hele golwe in hierdie interval, so dit val twee keer. Kry eers sy draaipunte: dit is die plekke waar dalend oorgaan in stygend." },
      memo: [
        { type: "step", text: { en: "g has period 360° ÷ 2 = 180°, so it makes two complete waves. Its turning points are at &nbsp;x = 0°, 90°, 180°, 270° and 360°.", af: "g het periode 360° ÷ 2 = 180°, so dit maak twee volledige golwe. Sy draaipunte is by &nbsp;x = 0°, 90°, 180°, 270° en 360°." } },
        { type: "step", text: { en: "It falls from each maximum to the next minimum.", af: "Dit val van elke maksimum tot by die volgende minimum." }, ticks: ["ca"] },
        { type: "answer", text: { en: "0° &lt; x &lt; 90° &nbsp;&nbsp;or&nbsp;&nbsp; 180° &lt; x &lt; 270°", af: "0° &lt; x &lt; 90° &nbsp;&nbsp;of&nbsp;&nbsp; 180° &lt; x &lt; 270°" }, ticks: ["a"] },
      ],
      esplain: { en: "The squashed graph is the one that catches people out, because it turns twice as often as they expect. Work out its period first: 180°, so it fits two whole waves into the interval and therefore has twice as many turning points as f does. A cosine starts at a maximum, so g starts high, falls to a minimum at 90°, rises back to a maximum at 180°, falls again to a minimum at 270°, and finishes back at the top. The falling stretches are therefore from 0° to 90° and from 180° to 270°. Reading it off the picture is fine, but knowing the period first tells you how many falling stretches to expect, so you know when to stop looking.", af: "Die saamgedrukte grafiek is die een wat mense vang, want dit draai twee keer so gereeld as wat hulle verwag. Werk eers sy periode uit: 180°, so dit pas twee hele golwe in die interval en het dus twee keer soveel draaipunte as f. Die cos-grafiek begin by 'n maksimum, so g begin hoog, val tot by 'n minimum by 90°, styg terug na 'n maksimum by 180°, val weer tot by 'n minimum by 270°, en eindig weer bo. Die dalende stukke is dus van 0° tot 90° en van 180° tot 270°. Om dit van die prentjie af te lees is goed, maar as jy eers die periode ken, weet jy hoeveel dalende stukke om te verwag, so jy weet wanneer om op te hou soek." },
    },
    {
      id: "c", marks: 2, level: 3,
      prompt: { en: "Hence write down the values of x for which f is increasing while g is decreasing.", af: "Skryf gevolglik die waardes van x neer waarvoor f stygend is terwyl g dalend is." },
      hint: { en: "You want the x-values that appear in BOTH of your previous answers. Sketch the two answers as strips on a number line and look for the overlap.", af: "Jy soek die x-waardes wat in ALBEI jou vorige antwoorde voorkom. Skets die twee antwoorde as intervalle op 'n getallelyn en soek die oorvleueling." },
      memo: [
        { type: "step", text: { en: "f increasing: &nbsp;0° &lt; x &lt; 90°&nbsp; or &nbsp;270° &lt; x &lt; 360°<br>g decreasing: &nbsp;0° &lt; x &lt; 90°&nbsp; or &nbsp;180° &lt; x &lt; 270°", af: "f stygend: &nbsp;0° &lt; x &lt; 90°&nbsp; of &nbsp;270° &lt; x &lt; 360°<br>g dalend: &nbsp;0° &lt; x &lt; 90°&nbsp; of &nbsp;180° &lt; x &lt; 270°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The only stretch that appears in both lists: &nbsp;0° &lt; x &lt; 90°", af: "Die enigste stuk wat in albei lyste voorkom: &nbsp;0° &lt; x &lt; 90°" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: the word \"while\" means BOTH things are happening at once, so you want the OVERLAP of your two answers, not both of them put together. Adding the strips up instead of overlapping them is the standard mistake here.", af: "ONTHOU: die woord \"terwyl\" beteken ALBEI dinge gebeur tegelyk, so jy soek die OORVLEUELING van jou twee antwoorde, nie albei saamgegooi nie. Om die intervalle bymekaar te tel in plaas van te oorvleuel, is die standaardfout hier." } },
      ],
      esplain: { en: "The word while is doing all the work in this question. It means both conditions have to be true at the same x, so you want the part the two answers share, not everything they cover between them. The safest way to find it is to draw a short number line from 0° to 360°, mark your f answer above the line and your g answer below it, and look for where the two markings sit over each other. Here f rises on two stretches and g falls on two stretches, and only one stretch is common to both, from 0° to 90°. This overlap-versus-add distinction comes up in every subject that uses intervals, and getting into the number-line habit now saves marks later in inequalities and in domain questions.", af: "Die woord terwyl doen al die werk in hierdie vraag. Dit beteken albei voorwaardes moet by dieselfde x waar wees, so jy soek die stuk wat die twee antwoorde gemeen het, nie alles wat hulle saam dek nie. Die veiligste manier om dit te kry, is om 'n kort getallelyn van 0° tot 360° te teken, jou f-antwoord bo die lyn en jou g-antwoord onder die lyn te merk, en te kyk waar die twee merke oor mekaar lê. Hier styg f op twee stukke en val g op twee stukke, en net een stuk is gemeen aan albei, van 0° tot 90°. Hierdie verskil tussen oorvleuel en bymekaartel kom voor in elke vak wat intervalle gebruik, en as jy nou die getallelyn-gewoonte aanleer, spaar dit later punte by ongelykhede en by vrae oor die definisieversameling." },
    },
  ],
};

/* ===============================================================
   q6 — the classic sine-and-cosine pair.
   f(x) = sin x and g(x) = cos x on [0° ; 360°]; A(45° ; 0,71) given,
   B(225° ; −0,71) half a turn later. f > g on 45° < x < 225°.
   Over [−360° ; 360°] the equation has FOUR solutions.
   =============================================================== */
const Q6_WIN = { xmin: 0, xmax: 360, ymin: -2, ymax: 2 };
const Q6_SPEC = {
  type: "trigg", win: Q6_WIN, xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 },
    { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: 330 },
  ],
  points: [{ x: 45, y: 0.71, on: [0, 1], label: "A(45° ; 0,71)", place: "above" }],
};

const q6 = {
  id: "tgraph.sib.ii.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sine-and-cosine-crossings-inequality-and-a-wider-interval-count",
  lostQuest: LOST,
  marks: 6,
  diagram: {
    spec: Q6_SPEC,
    parts: {
      a: { question: {}, reveal: { points: [{ x: 225, y: -0.71, on: [0, 1], label: "B(225° ; −0,71)" }] } },
      b: {
        question: {},
        reveal: {
          points: [{ x: 225, y: -0.71, on: [0, 1], label: "B(225° ; −0,71)" }],
          shades: [{ x0: 45, x1: 225 }],
          vlines: [{ x: 45, label: "x = 45°" }, { x: 225, label: "x = 225°" }],
        },
      },
      c: {
        question: {},
        reveal: {
          points: [{ x: 225, y: -0.71, on: [0, 1], label: "B(225° ; −0,71)" }],
          hmeasure: { x0: 0, x1: 360, y: 1.5, label: L("one turn: 2 crossings", "een volle draai: 2 snypunte") },
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = sin x&nbsp; and &nbsp;g(x) = cos x&nbsp; for &nbsp;x ∈ [0° ; 360°]. &nbsp;The graphs cut each other at A(45° ; 0,71) and at B.<br><br>Determine the coordinates of B.", af: "Die skets toon die grafieke van &nbsp;f(x) = sin x&nbsp; en &nbsp;g(x) = cos x&nbsp; vir &nbsp;x ∈ [0° ; 360°]. &nbsp;Die grafieke sny mekaar by A(45° ; 0,71) en by B.<br><br>Bepaal die koördinate van B." },
      hint: { en: "The graphs are equal where &nbsp;sin x = cos x, &nbsp;which is where &nbsp;tan x = 1. &nbsp;That happens once every 180°, so B is half a turn along from A.", af: "Die grafieke is gelyk waar &nbsp;sin x = cos x, &nbsp;dit is waar &nbsp;tan x = 1. &nbsp;Dit gebeur een keer elke 180°, so B is 'n halwe draai verder as A." },
      memo: [
        { type: "step", text: { en: "sin x = cos x &nbsp;⟹&nbsp; tan x = 1, &nbsp;which repeats every 180°: &nbsp;x = 45° + 180° = 225°", af: "sin x = cos x &nbsp;⟹&nbsp; tan x = 1, &nbsp;wat elke 180° herhaal: &nbsp;x = 45° + 180° = 225°" }, ticks: ["a"] },
        { type: "answer", text: { en: "y = sin 225° = −0,71 &nbsp;&nbsp;∴&nbsp; B(225° ; −0,71)", af: "y = sin 225° = −0,71 &nbsp;&nbsp;∴&nbsp; B(225° ; −0,71)" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: B is NOT the mirror image of A in the y-axis. A sine graph and a cosine graph are not symmetrical about the y-axis in the same way, so the mirror trick that works on two cosines does not work here. Use the tangent repeat of 180° instead — or just read the second crossing off the sketch.", af: "ONTHOU: B is NIE die gereflekteerde beeld van A in die y-as nie. Die sin-grafiek en die cos-grafiek is nie op dieselfde manier simmetries om die y-as nie, so die refleksie-truuk wat by twee cos-grafieke werk, werk nie hier nie. Gebruik eerder die tan-herhaling van 180°, of lees net die tweede snypunt van die skets af." } },
      ],
      esplain: { en: "The two curves are equal where their heights match, so start from sin x = cos x. Dividing both sides by cos x turns that into tan x = 1, and a tangent repeats itself every 180°. So once you know one solution at 45°, the next is 180° later at 225°, and that is B's x-coordinate. For the height, put 225° back into either graph — both must give the same answer, which is a free check — and sin 225° is −0,71 to two decimal places. Reading it off the sketch is also allowed and gives the same answer: the second crossing is clearly down in the negative part of the picture, roughly two-thirds of a unit below the axis.", af: "Die twee kurwes is gelyk waar hul hoogtes ooreenstem, so begin by sin x = cos x. As jy albei kante deur cos x deel, word dit tan x = 1, en tan herhaal elke 180°. Sodra jy dus een oplossing by 45° het, is die volgende een 180° later by 225°, en dit is B se x-koördinaat. Vir die hoogte, vervang 225° terug in enige van die grafieke (albei moet dieselfde antwoord gee, wat 'n gratis kontrole is), en sin 225° is −0,71 tot twee desimale plekke. Om dit van die skets af te lees, is ook toegelaat en gee dieselfde antwoord: die tweede snypunt is duidelik onder in die negatiewe deel van die prentjie, sowat twee derdes van 'n eenheid onder die as." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "For which values of x is &nbsp;f(x) &gt; g(x)?", af: "Vir watter waardes van x is &nbsp;f(x) &gt; g(x)?" },
      hint: { en: "Cut the picture at the two crossings, then look at each strip and ask which curve is on top.", af: "Sny die prentjie by die twee snypunte, kyk dan na elke interval en vra watter kurwe bo is." },
      memo: [
        { type: "step", text: { en: "Cut lines at &nbsp;x = 45°&nbsp; and &nbsp;x = 225°. &nbsp;Between them the sine graph is the higher one.", af: "Snylyne by &nbsp;x = 45°&nbsp; en &nbsp;x = 225°. &nbsp;Tussen hulle is die sin-grafiek die hoër een." }, ticks: ["ca"] },
        { type: "answer", text: { en: "45° &lt; x &lt; 225°", af: "45° &lt; x &lt; 225°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the sign is strictly greater than, so the crossing points are left out — at 45° and 225° the graphs are EQUAL, not one above the other.", af: "PASOP: die teken is streng groter as, so die snypunte word uitgelaat: by 45° en 225° is die grafieke GELYK, nie een bo die ander nie." } },
      ],
      esplain: { en: "Two crossings cut the interval into three strips, and only one of them is the answer. Check one easy point in each strip rather than trying to picture the whole thing. At 0° the cosine is at its maximum and the sine is at zero, so g is on top and that strip fails. At 90° the sine is at its maximum and the cosine is at zero, so f is on top and that strip is in. At 360° the cosine is back at its maximum and the sine is at zero, so g wins again. That gives a single stretch, from 45° to 225°, with the ends excluded because the question asks for strictly greater. One tidy answer, one strip, no or needed.", af: "Twee snypunte kap die interval in drie intervalle op, en net een daarvan is die antwoord. Toets een maklike punt in elke interval eerder as om die hele ding te probeer voorstel. By 0° is die cos-grafiek by sy maksimum en die sin-grafiek by nul, so g is bo en daardie interval faal. By 90° is die sin-grafiek by sy maksimum en die cos-grafiek by nul, so f is bo en daardie interval is in. By 360° is die cos-grafiek terug by sy maksimum en die sin-grafiek by nul, so g wen weer. Dit gee een enkele stuk, van 45° tot 225°, met die eindpunte uitgesluit omdat die vraag streng groter as vra. Een netjiese antwoord, een interval, geen of nodig nie." },
    },
    {
      id: "c", marks: 2, level: 3,
      prompt: { en: "How many solutions does the equation &nbsp;sin x = cos x&nbsp; have for &nbsp;x ∈ [−360° ; 360°]?", af: "Hoeveel oplossings het die vergelyking &nbsp;sin x = cos x&nbsp; vir &nbsp;x ∈ [−360° ; 360°]?" },
      hint: { en: "The sketch only shows one turn. Ask how many crossings there are per 360°, and then how many 360° stretches fit into the new interval.", af: "Die skets wys net een draai. Vra hoeveel snypunte daar per 360° is, en dan hoeveel stukke van 360° in die nuwe interval pas." },
      memo: [
        { type: "step", text: { en: "Both graphs repeat every 360°, and the sketch shows <b>2</b> crossings in one 360° stretch.", af: "Albei grafieke herhaal elke 360°, en die skets wys <b>2</b> snypunte in een stuk van 360°." }, ticks: ["ca"] },
        { type: "step", text: { en: "The interval &nbsp;[−360° ; 360°]&nbsp; is 720° wide, which is TWO of those stretches.", af: "Die interval &nbsp;[−360° ; 360°]&nbsp; is 720° wyd, wat TWEE sulke stukke is." } },
        { type: "answer", text: { en: "2 × 2 = <b>4</b> solutions &nbsp;&nbsp;<i>(at −315°, −135°, 45° and 225°)</i>", af: "2 × 2 = <b>4</b> oplossings &nbsp;&nbsp;<i>(by −315°, −135°, 45° en 225°)</i>" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: count in whole periods, not by doubling whatever you can see. This works cleanly here because the crossings sit 180° apart and none of them lands exactly on −360° or 360°. Always check the two ends of a widened interval before you multiply.", af: "PASOP: tel in hele periodes, nie deur net te verdubbel wat jy kan sien nie. Dit werk hier netjies omdat die snypunte 180° uitmekaar lê en nie een presies op −360° of 360° val nie. Kontroleer altyd die twee eindpunte van 'n wyer interval voordat jy vermenigvuldig." } },
      ],
      esplain: { en: "When a question widens the interval past what the sketch shows, use the repeating nature of the graphs instead of drawing more picture. Both sine and cosine repeat exactly every 360°, so whatever happens in one 360° stretch happens again in the next one. The sketch shows two crossings in the stretch from 0° to 360°. The new interval runs from −360° to 360°, which is 720° wide, or two such stretches, so there are two lots of two crossings — four in all. The one thing to check before multiplying is the ends: if a crossing happened to sit exactly on −360° or 360° it would be shared between stretches and the count would be off by one. Here the crossings are at 45° plus multiples of 180°, so none of them lands on the ends.", af: "As 'n vraag die interval wyer maak as wat die skets wys, gebruik die herhalende aard van die grafieke eerder as om meer prentjie te teken. Die sin- en cos-grafiek herhaal albei presies elke 360°, so wat ook al in een stuk van 360° gebeur, gebeur weer in die volgende een. Die skets wys twee snypunte in die stuk van 0° tot 360°. Die nuwe interval loop van −360° tot 360°, wat 720° wyd is, of twee sulke stukke, so daar is twee keer twee snypunte: altesaam vier. Die een ding om te kontroleer voordat jy vermenigvuldig, is die eindpunte: as 'n snypunt presies op −360° of 360° sou lê, sou dit tussen twee stukke gedeel word en sou die telling een uit wees. Hier lê die snypunte by 45° plus veelvoude van 180°, so nie een van hulle val op die eindpunte nie." },
    },
  ],
};

export const tgraphIntersectionsInequalitiesQuestions = [q1, q2, q3, q4, q5, q6];
