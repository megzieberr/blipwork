/* ============================================================
   EXAM FOCUS — Trig Graphs · SIBLING CARDS for the skill
   "shift-reflect"   (SESSION E, 2026-08-23)
   ------------------------------------------------------------
   The transformation half of the graphs question: a graph is given,
   something is done to it in WORDS, and the new equation (or its
   range, or its asymptotes) has to be written down — plus the same
   question asked backwards, where two graphs are given and the MOVE
   is what has to be described.

   ARCHETYPES from the bank (survey/SURVEY-Topic-Banks.md §2 —
   2025-Q4's "shifted equation of f", 2025-Q6's "g shifted 45° right
   and 2 up → show h(x) = sinx + 2" and its "range of 2f(x) − 2",
   2025-Q9's "h = f reflected and shifted 45° left, written in cos
   form", 2026-Q3's "equation of f shifted 15° right"; her Test 5 Q3's
   "reflect and shift to define h"). Fresh graphs and fresh moves.

   HER RULE FOR THE FIGURES ON THIS TILE: the question side shows the
   ORIGINAL only; the new graph appears on the REVEAL, drawn in tone
   "b" and labelled with its name, together with any asymptote or
   boundary line it brought with it. q3 is the deliberate exception —
   both graphs are given in its stem because the MOVE is what is being
   asked for, so both are drawn from the start.

   Two-parameter wall respected on every curve (GR11-IEB-PAPER-BANK.md:
   trig graphs, max two parameters varied).
   ============================================================ */

import { L } from "../lang.js";

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "shift-reflect";

/* ===============================================================
   q1 — a sideways slide.  f(x) = 2 sin x  →  g(x) = 2 sin(x + 30°)
   (30° to the LEFT). Its maximum moves from 90° to 60°; its period
   does not move at all.
   =============================================================== */
const Q1_WIN = { xmin: -180, xmax: 180, ymin: -3, ymax: 3 };
const Q1_F = { fn: "sin", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 };
const Q1_G = { fn: "sin", a: 2, b: 1, p: -30, q: 0, tone: "b", dash: true, label: "g", labelAt: -120 };
const Q1_SPEC = { type: "trigg", win: Q1_WIN, xstep: 90, ystep: 1, w: 400, h: 300, curves: [Q1_F] };

const q1 = {
  id: "tgraph.sib.sr.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "horizontal-shift-write-the-new-equation",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 3,
  diagram: {
    spec: Q1_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q1_G] } },
      b: {
        question: {},
        reveal: { curves: [Q1_G], hmeasure: { x0: -180, x1: 180, y: 2, label: L("period = 360°, unchanged", "periode = 360°, onveranderd") } },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 2 sin x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph of g is the graph of f shifted 30° to the LEFT.<br><br>Write down the equation of g.", af: "Die skets toon die grafiek van &nbsp;f(x) = 2 sin x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Die grafiek van g is die grafiek van f, 30° na LINKS geskuif.<br><br>Skryf die vergelyking van g neer." },
      hint: { en: "A sideways move happens INSIDE the bracket, with the x. Moving LEFT is the one that feels backwards — check it on the maximum if you are not sure.", af: "'n Skuif links of regs gebeur BINNE die hakie, by die x. Die skuif na LINKS is die een wat agterstevoor voel: toets dit op die maksimum as jy nie seker is nie." },
      memo: [
        { type: "step", text: { en: "A shift to the left goes inside the bracket as &nbsp;+ 30°:&nbsp; every x becomes &nbsp;x + 30°.", af: "'n Skuif na links gaan binne die hakie in as &nbsp;+ 30°:&nbsp; elke x word &nbsp;x + 30°." }, ticks: ["a"] },
        { type: "answer", text: { en: "g(x) = 2 sin(x + 30°)", af: "g(x) = 2 sin(x + 30°)" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: LEFT is a PLUS inside the bracket and RIGHT is a minus. It feels the wrong way round, so check it on a landmark: f peaks at 90°, and g must peak 30° earlier at 60°. Put x = 60° into &nbsp;2 sin(x + 30°)&nbsp; and you get &nbsp;2 sin 90° = 2, &nbsp;the maximum. Correct.", af: "PASOP: LINKS is 'n PLUS binne die hakie en REGS is 'n minus. Dit voel verkeerd om, so toets dit op 'n herkenbare punt: f se piek is by 90°, en g se piek moet 30° vroeër wees, by 60°. Vervang x = 60° in &nbsp;2 sin(x + 30°)&nbsp; en jy kry &nbsp;2 sin 90° = 2, &nbsp;die maksimum. Korrek." },
        },
      ],
      esplain: { en: "There is one idea behind every horizontal shift, and it is worth saying properly once. The graph g has to give at x = 60° the answer f used to give at 90°. So before g uses the sine machine, it must turn the 60° it was handed into a 90°, which means adding 30° to it — and that is why a shift to the LEFT shows up as a PLUS inside the bracket. Everything outside the bracket is untouched, so the 2 in front stays exactly where it is: sliding a graph sideways does not stretch it. The safest way to check your sign, every time, is to test one landmark. Take the peak, work out where it should have moved to, and substitute. If the bracket comes out at 90° for a sine, you have it right.", af: "Daar is een idee agter elke horisontale skuif, en dit is die moeite werd om dit een keer behoorlik te sê. Die grafiek g moet by x = 60° die antwoord gee wat f vroeër by 90° gegee het. Voordat g die sin-masjien gebruik, moet dit dus die 60° wat dit kry in 'n 90° verander, en dit beteken jy tel 30° daarby: dit is hoekom 'n skuif na LINKS as 'n PLUS binne die hakie verskyn. Alles buite die hakie bly onaangeraak, so die 2 voor bly presies waar dit is: as jy 'n grafiek links of regs skuif, rek dit nie. Die veiligste manier om jou teken elke keer te toets, is om een herkenbare punt te toets. Neem die piek, werk uit waarheen dit moes skuif, en vervang. As die hakie by 'n sin op 90° uitkom, is jy reg." },
    },
    {
      id: "b", marks: 1, level: 1,
      prompt: { en: "Write down the period of g.", af: "Skryf die periode van g neer." },
      hint: { en: "Ask what a sideways slide actually changes about a graph. Does it make one wave any wider?", af: "Vra jouself wat 'n skuif links of regs werklik aan 'n grafiek verander. Maak dit een golf enigsins wyer?" },
      memo: [
        { type: "step", text: { en: "A horizontal shift moves the graph along; it does not squash or stretch it, so the period is unchanged.", af: "'n Horisontale skuif beweeg die grafiek net aan; dit druk dit nie saam nie en rek dit nie, dus bly die periode dieselfde." } },
        { type: "answer", text: { en: "period of g = <b>360°</b>", af: "periode van g = <b>360°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "Only b changes a period, and a shift does not touch b. Picture the wave drawn on a strip of paper: sliding the strip 30° to the left moves everything along, but the wave printed on it is exactly as wide as it always was. So g completes one whole wave in 360°, just like f. This is one of those facts examiners like to ask straight after a shift question, precisely because it tempts you into doing work that is not needed. Nothing has to be calculated — the answer is the same as f's period, and saying so in one line is a full answer.", af: "Net b verander 'n periode, en 'n skuif raak nie aan b nie. Stel jou voor die golf is op 'n repie papier geteken: as jy die repie 30° na links skuif, beweeg alles saam, maar die golf daarop is presies so wyd soos altyd. Dus voltooi g een hele golf in 360°, net soos f. Dit is een van daardie feite wat eksaminatore graag direk ná 'n skuifvraag vra, juis omdat dit jou versoek om werk te doen wat nie nodig is nie. Niks hoef bereken te word nie: die antwoord is dieselfde as f se periode, en om dit in een reël te sê, is 'n volledige antwoord." },
    },
  ],
};

/* ===============================================================
   q2 — reflect in the x-axis, then lift.
   f(x) = cos x  →  h(x) = −cos x + 1, range [0 ; 2].
   =============================================================== */
const Q2_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 3 };
const Q2_F = { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: -60 };
const Q2_H = { fn: "cos", a: -1, b: 1, p: 0, q: 1, tone: "b", label: "h", labelAt: 90 };
const Q2_SPEC = { type: "trigg", win: Q2_WIN, xstep: 90, ystep: 1, w: 400, h: 300, curves: [Q2_F] };

const q2 = {
  id: "tgraph.sib.sr.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "reflect-in-the-x-axis-then-shift-up-and-give-the-range",
  lostQuest: { chapter: CH, quest: "tg2" },
  marks: 4,
  diagram: {
    spec: Q2_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q2_H] } },
      b: {
        question: {},
        reveal: { curves: [Q2_H], hlines: [{ y: 2, label: "y = 2" }] },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph of h is obtained by reflecting f in the x-axis and then shifting the result 1 unit upwards.<br><br>Write down the equation of h.", af: "Die skets toon die grafiek van &nbsp;f(x) = cos x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Die grafiek van h word verkry deur f in die x-as te reflekteer en die resultaat dan 1 eenheid op te skuif.<br><br>Skryf die vergelyking van h neer." },
      hint: { en: "Do the two moves in the order the question gives them. A reflection in the x-axis multiplies the whole thing by −1; a shift up adds to the whole thing.", af: "Doen die twee stappe in die volgorde wat die vraag gee. 'n Refleksie in die x-as vermenigvuldig die hele ding met −1; 'n skuif op tel iets by die hele ding." },
      memo: [
        { type: "step", text: { en: "Reflect in the x-axis: every height changes sign, so &nbsp;cos x&nbsp; becomes &nbsp;−cos x.", af: "Reflekteer in die x-as: elke hoogte verander van teken, so &nbsp;cos x&nbsp; word &nbsp;−cos x." }, ticks: ["a"] },
        { type: "answer", text: { en: "Then shift 1 unit up: &nbsp;h(x) = −cos x + 1", af: "Skuif dan 1 eenheid op: &nbsp;h(x) = −cos x + 1" }, ticks: ["a"] },
      ],
      esplain: { en: "Two moves, done in order, and both of them live OUTSIDE the cos. Reflecting in the x-axis means every point swaps to the same distance on the other side of the axis, which is the same as multiplying every height by −1 — so cos x becomes −cos x. Shifting up 1 then adds 1 to every one of those new heights, giving −cos x + 1. The order matters here, so follow the words. If you had lifted first and then reflected, every height would have been −(cos x + 1) = −cos x − 1, which is a graph 2 units lower than the right answer. When a question describes two moves, do them literally, one at a time, writing the equation down after each step.", af: "Twee stappe, in volgorde gedoen, en albei woon BUITE die cos. Om in die x-as te reflekteer, beteken elke punt spring na dieselfde afstand aan die ander kant van die as, wat dieselfde is as om elke hoogte met −1 te vermenigvuldig: so cos x word −cos x. Die skuif 1 op tel dan 1 by elkeen van daardie nuwe hoogtes, en dit gee −cos x + 1. Die volgorde maak hier saak, so volg die woorde. As jy eers opgeskuif en dan gereflekteer het, sou elke hoogte −(cos x + 1) = −cos x − 1 gewees het, en dit is 'n grafiek 2 eenhede laer as die regte antwoord. As 'n vraag twee stappe beskryf, doen hulle letterlik, een op 'n slag, en skryf die vergelyking ná elke stap neer." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "Write down the range of h.", af: "Skryf die waardeversameling van h neer." },
      hint: { en: "Find the midline of h first — it is the number on the end — then step one amplitude up and one amplitude down from it.", af: "Vind eers die middelste lyn van h (dit is die getal aan die einde), en gaan dan een amplitude op en een amplitude af daarvandaan." },
      memo: [
        { type: "step", text: { en: "For &nbsp;h(x) = −cos x + 1: &nbsp;amplitude = |−1| = 1 and the midline is &nbsp;y = 1.", af: "Vir &nbsp;h(x) = −cos x + 1: &nbsp;amplitude = |−1| = 1 en die middelste lyn is &nbsp;y = 1." }, ticks: ["a"] },
        { type: "answer", text: { en: "1 + 1 = 2 and 1 − 1 = 0 &nbsp;&nbsp;∴&nbsp; y ∈ [0 ; 2]", af: "1 + 1 = 2 en 1 − 1 = 0 &nbsp;&nbsp;∴&nbsp; y ∈ [0 ; 2]" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: reflecting a graph does NOT change its range, but lifting it does. f ran from −1 to 1; the reflection still ran from −1 to 1; only the lift moved it, up to 0 and 2.", af: "ONTHOU: 'n refleksie verander NIE die waardeversameling van 'n grafiek nie, maar 'n skuif op wel. f het van −1 tot 1 geloop; die refleksie het steeds van −1 tot 1 geloop; net die skuif op het dit verander, op na 0 en 2." } },
      ],
      esplain: { en: "A range question after a transformation is easiest if you handle the two moves separately. The reflection turns the graph upside down, which swaps which x-values give the high points and which give the low ones — but the actual set of heights is unchanged, still everything from −1 to 1. The lift is the move that matters: adding 1 pushes every one of those heights up by 1, so the range becomes everything from 0 to 2. Doing it through the equation gives the same answer with less thinking: the midline is the number on the end, the amplitude is the size of the number in front, and the range is one amplitude either side of the midline. Notice h just touches the x-axis at its lowest point, which is why 0 belongs in the range.", af: "'n Vraag oor die waardeversameling ná 'n transformasie is die maklikste as jy die twee stappe apart hanteer. Die refleksie draai die grafiek onderstebo, wat omruil watter x-waardes die hoë punte gee en watter die lae punte, maar die versameling hoogtes self bly dieselfde, steeds alles van −1 tot 1. Die skuif op is die stap wat saak maak: as jy 1 bytel, stoot dit elkeen van daardie hoogtes 1 op, so die waardeversameling word alles van 0 tot 2. Deur die vergelyking kry jy dieselfde antwoord met minder dinkwerk: die middelste lyn is die getal aan die einde, die amplitude is die grootte van die getal voor, en die waardeversameling is een amplitude aan weerskante van die middelste lyn. Let op dat h die x-as net raak by sy laagste punt, en daarom behoort 0 in die waardeversameling." },
    },
  ],
};

/* ===============================================================
   q3 — the question asked BACKWARDS. Both graphs are given, so both
   are drawn from the start. f(x) = sin x and g(x) = sin(x − 45°):
   the move is 45° to the RIGHT, and g's x-intercepts are at −135°
   and 45°.
   =============================================================== */
const Q3_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 2 };
const Q3_F = { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 60 };
const Q3_G = { fn: "sin", a: 1, b: 1, p: 45, q: 0, tone: "b", label: "g", labelAt: -60 };
const Q3_SPEC = { type: "trigg", win: Q3_WIN, xstep: 45, ystep: 1, w: 400, h: 300, curves: [Q3_F, Q3_G] };

const q3 = {
  id: "tgraph.sib.sr.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "describe-the-transformation-that-maps-f-onto-g-then-use-it",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 4,
  diagram: {
    spec: Q3_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          points: [
            { x: 90, y: 1, on: 0, label: "(90° ; 1)", place: "above" },
            { x: 135, y: 1, on: 1, label: "(135° ; 1)" },
          ],
        },
      },
      b: {
        question: {},
        reveal: {
          points: [
            { x: 45, y: 0, on: 1, label: "(45° ; 0)", place: "above" },
            { x: -135, y: 0, on: 1, label: "(−135° ; 0)", place: "above" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = sin x&nbsp; and &nbsp;g(x) = sin(x − 45°)&nbsp; for &nbsp;x ∈ [−180° ; 180°].<br><br>Describe fully the transformation that maps the graph of f onto the graph of g.", af: "Die skets toon die grafieke van &nbsp;f(x) = sin x&nbsp; en &nbsp;g(x) = sin(x − 45°)&nbsp; vir &nbsp;x ∈ [−180° ; 180°].<br><br>Beskryf volledig die transformasie wat die grafiek van f op die grafiek van g afbeeld." },
      hint: { en: "Pick one landmark you can find on both graphs — the maximum is the easiest — and say how far it moved and in which direction.", af: "Kies een herkenbare punt wat jy op albei grafieke kan vind (die maksimum is die maklikste), en sê hoe ver dit geskuif het en in watter rigting." },
      memo: [
        { type: "step", text: { en: "f has its maximum at (90° ; 1); g has its maximum at (135° ; 1).", af: "f het sy maksimum by (90° ; 1); g het sy maksimum by (135° ; 1)." }, ticks: ["a"] },
        { type: "answer", text: { en: "The graph of f is shifted 45° to the RIGHT to give g.", af: "Die grafiek van f word 45° na REGS geskuif om g te gee." }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: \"describe FULLY\" wants both a direction and an amount. \"It has been shifted\" earns nothing; \"45° to the right\" earns the marks. And check the direction against the picture rather than against the minus sign in the bracket — the minus means right, which feels backwards.", af: "PASOP: \"beskryf VOLLEDIG\" vra 'n rigting én 'n hoeveelheid. \"Dit is geskuif\" verdien niks; \"45° na regs\" verdien die punte. En toets die rigting teen die prent eerder as teen die minusteken in die hakie: die minus beteken regs, wat agterstevoor voel." } },
      ],
      esplain: { en: "Reading a transformation backwards is the same job as doing it forwards, just started from the other end. Do not try to compare the whole curves; pick one landmark you can spot on both. A maximum is the easiest, because it stands out and there is only one of it in a period. On f the maximum sits at 90°, on g it sits at 135°, so the whole picture has travelled 45° to the right. Nothing else changed: both graphs reach the same heights, so no stretch and no reflection have happened, and there is no lift because both still rock about the x-axis. Say the amount and the direction, and you have described it fully.", af: "Om 'n transformasie terug te lees, is dieselfde werk as om dit vorentoe te doen, net van die ander kant af begin. Moenie die hele kurwes probeer vergelyk nie; kies een herkenbare punt wat jy op albei kan raaksien. 'n Maksimum is die maklikste, want dit staan uit en daar is net een in 'n periode. Op f lê die maksimum by 90°, op g lê dit by 135°, so die hele prent het 45° na regs geskuif. Niks anders het verander nie: albei grafieke bereik dieselfde hoogtes, so daar was geen rek en geen refleksie nie, en geen skuif op of af nie, want albei wieg steeds om die x-as. Sê die hoeveelheid en die rigting, en jy het dit volledig beskryf." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "Write down the coordinates of the x-intercepts of g for &nbsp;x ∈ [−180° ; 180°].", af: "Skryf die koördinate van die x-afsnitte van g neer vir &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "The plain sine graph is zero at −180°, 0° and 180°. Move each of those along by the shift you found in (a), and then throw away any that have left the interval.", af: "Die gewone sin-grafiek is nul by −180°, 0° en 180°. Skuif elkeen van hulle met die skuif wat jy in (a) gevind het, en gooi dan enige weg wat die interval verlaat het." },
      memo: [
        { type: "step", text: { en: "f is zero at &nbsp;x = −180°, 0° and 180°. &nbsp;Shift each one 45° to the right: &nbsp;−135°, 45° and 225°.", af: "f is nul by &nbsp;x = −180°, 0° en 180°. &nbsp;Skuif elkeen 45° na regs: &nbsp;−135°, 45° en 225°." }, ticks: ["ca"] },
        { type: "answer", text: { en: "225° is outside the interval &nbsp;∴&nbsp; the x-intercepts are (−135° ; 0) and (45° ; 0)", af: "225° lê buite die interval &nbsp;∴&nbsp; die x-afsnitte is (−135° ; 0) en (45° ; 0)" }, ticks: ["a"] },
      ],
      esplain: { en: "Once you know the move, every feature of the new graph comes from the matching feature of the old one, shifted by the same amount. So instead of solving sin(x − 45°) = 0 from scratch, take the places where the plain sine is zero — at −180°, 0° and 180° — and slide each one 45° to the right. That gives −135°, 45° and 225°. The last step is the one people forget: check every answer against the interval you were given. The interval stops at 180°, so 225° does not belong in the answer, and the graph only crosses the axis twice inside the picture. Look at the sketch and count: two crossings for g, exactly as expected.", af: "Sodra jy die skuif ken, kom elke kenmerk van die nuwe grafiek van die ooreenstemmende kenmerk van die ou een, met dieselfde hoeveelheid geskuif. Moet dus nie sin(x − 45°) = 0 van voor af oplos nie: neem die plekke waar die gewone sin nul is, by −180°, 0° en 180°, en skuif elkeen 45° na regs. Dit gee −135°, 45° en 225°. Die laaste stap is die een wat mense vergeet: toets elke antwoord teen die interval wat jy gekry het. Die interval stop by 180°, so 225° hoort nie in die antwoord nie, en die grafiek sny die as net twee keer binne die prent. Kyk na die skets en tel: twee snypunte vir g, presies soos verwag." },
    },
  ],
};

/* ===============================================================
   q4 — the cosine graph written as a sine graph (the 90° shift).
   cos x = sin(x + 90°), and then cos(x − 30°) = sin(x + 60°).
   Both come straight from the co-function fact sin(90° + θ) = cos θ.
   =============================================================== */
const Q4_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 2 };
const Q4_F = { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 30 };
const Q4_F_AS_SIN = { fn: "sin", a: 1, b: 1, p: -90, q: 0, tone: "b", dash: true, label: "y = sin(x + 90°)", labelAt: -140 };
const Q4_G = { fn: "cos", a: 1, b: 1, p: 30, q: 0, tone: "b", dash: true, label: "g(x) = sin(x + 60°)", labelAt: -120 };
const Q4_SPEC = { type: "trigg", win: Q4_WIN, xstep: 90, ystep: 1, w: 400, h: 300, curves: [Q4_F] };

const q4 = {
  id: "tgraph.sib.sr.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "write-a-cosine-graph-as-a-sine-graph-the-ninety-degree-shift",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 4,
  diagram: {
    spec: Q4_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q4_F_AS_SIN] } },
      b: { question: {}, reveal: { curves: [Q4_G] } },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°].<br><br>Write down the equation of f in the form &nbsp;y = sin(x + p), &nbsp;where &nbsp;0° &lt; p &lt; 180°.", af: "Die skets toon die grafiek van &nbsp;f(x) = cos x&nbsp; vir &nbsp;x ∈ [−180° ; 180°].<br><br>Skryf die vergelyking van f neer in die vorm &nbsp;y = sin(x + p), &nbsp;waar &nbsp;0° &lt; p &lt; 180°." },
      hint: { en: "A cosine graph and a sine graph are the same shape; one is just the other one moved sideways. Compare the maxima: where does each of them peak?", af: "'n Cos-grafiek en 'n sin-grafiek het dieselfde vorm; die een is net die ander een, links of regs geskuif. Vergelyk die pieke: waar is elkeen se piek?" },
      memo: [
        { type: "step", text: { en: "A plain sine peaks at 90°; a plain cosine peaks at 0°. So the cosine is the sine graph shifted 90° to the LEFT, which is &nbsp;+ 90°&nbsp; inside the bracket.", af: "'n Gewone sin-grafiek se piek is by 90°; 'n gewone cos-grafiek se piek is by 0°. Die cos-grafiek is dus die sin-grafiek 90° na LINKS geskuif, en dit is &nbsp;+ 90°&nbsp; binne die hakie." }, ticks: ["a"] },
        { type: "answer", text: { en: "f(x) = sin(x + 90°) &nbsp;&nbsp;<i>(the co-function fact &nbsp;sin(90° + θ) = cos θ)</i>", af: "f(x) = sin(x + 90°) &nbsp;&nbsp;<i>(die ko-funksie-feit &nbsp;sin(90° + θ) = cos θ)</i>" }, ticks: ["a"] },
      ],
      esplain: { en: "Sine and cosine are the same wave; the only difference is where each one starts. A sine graph begins on the midline and climbs to its maximum at 90°, while a cosine graph is already at its maximum when x is zero. So the cosine is the sine graph with a 90° head start — in other words the sine graph slid 90° to the left, which is a plus 90° inside the bracket. You have also met this as a co-function fact, that sin(90° + θ) is cos θ, and it is the same statement written in a different language: the graph version and the reduction version are two ways of saying one thing. The question restricted p to between 0° and 180° so that only one answer is possible; without that, adding any whole turn of 360° would work too.", af: "Sin en cos is dieselfde golf; die enigste verskil is waar elkeen begin. 'n Sin-grafiek begin op die middelste lyn en klim tot by sy maksimum by 90°, terwyl 'n cos-grafiek reeds by sy maksimum is wanneer x nul is. Die cos-grafiek is dus die sin-grafiek met 'n voorsprong van 90°, met ander woorde die sin-grafiek 90° na links geskuif, en dit is 'n plus 90° binne die hakie. Jy het dit ook al as 'n ko-funksie-feit teëgekom, dat sin(90° + θ) gelyk is aan cos θ, en dit is dieselfde bewering in 'n ander taal: die grafiekweergawe en die reduksieweergawe is twee maniere om een ding te sê. Die vraag het p tussen 0° en 180° beperk sodat net een antwoord moontlik is; daarsonder sou enige hele draai van 360° wat jy bytel ook werk." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Hence write down the equation of &nbsp;g(x) = cos(x − 30°)&nbsp; in the form &nbsp;y = sin(x + p).", af: "Skryf vervolgens die vergelyking van &nbsp;g(x) = cos(x − 30°)&nbsp; neer in die vorm &nbsp;y = sin(x + p)." },
      hint: { en: "Use your answer to (a) with the WHOLE of &nbsp;x − 30°&nbsp; in place of the x, and then tidy the bracket up.", af: "Gebruik jou antwoord van (a) met die HELE &nbsp;x − 30°&nbsp; in die plek van die x, en maak dan die hakie netjies." },
      memo: [
        { type: "step", text: { en: "From (a), &nbsp;cos(anything) = sin(anything + 90°). &nbsp;Here the \"anything\" is &nbsp;x − 30°:", af: "Uit (a): &nbsp;cos(enigiets) = sin(enigiets + 90°). &nbsp;Hier is die \"enigiets\" &nbsp;x − 30°:" } },
        { type: "step", text: { en: "g(x) = cos(x − 30°) = sin((x − 30°) + 90°)", af: "g(x) = cos(x − 30°) = sin((x − 30°) + 90°)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= sin(x + 60°)", af: "= sin(x + 60°)" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: put the WHOLE bracket in, brackets and all, before you simplify. Writing sin(x − 30° + 90°) straight down works, but only if you keep the − 30° attached to the x. Adding 90° to the 30° instead of to the whole angle gives sin(x − 120°), which is a different graph.", af: "PASOP: sit die HELE hakie in, hakies en al, voordat jy vereenvoudig. Om sin(x − 30° + 90°) dadelik neer te skryf, werk, maar net as jy die − 30° by die x hou. As jy 90° by die 30° tel in plaas van by die hele hoek, kry jy sin(x − 120°), en dit is 'n ander grafiek." } },
      ],
      esplain: { en: "The word hence is an instruction: use what you just proved rather than starting again. Part (a) said that a cosine of something equals the sine of that same something plus 90°. That rule does not care what the something is — it can be an x, or a whole bracket like x − 30°. So substitute the bracket in exactly as it stands, keeping it inside its own brackets while you do it, and only then collect the numbers: −30° plus 90° is 60°. The check is quick and worth doing. Both graphs must peak at the same place. The cosine g peaks where its bracket is 0°, which is at x = 30°; the sine form peaks where its bracket is 90°, which is also at x = 30°. Same graph, two names.", af: "Die woord vervolgens is 'n opdrag: gebruik wat jy pas bewys het, eerder as om weer van voor af te begin. Deel (a) het gesê dat die cos van iets gelyk is aan die sin van daardie selfde iets plus 90°. Vir daardie reël maak dit nie saak wat die iets is nie: dit kan 'n x wees, of 'n hele hakie soos x − 30°. Vervang dus die hakie presies soos dit staan, hou dit binne sy eie hakies terwyl jy dit doen, en tel eers daarna die getalle saam: −30° plus 90° is 60°. Die toets is vinnig en die moeite werd. Albei grafieke moet hul piek op dieselfde plek hê. Die cos-grafiek g se piek is waar sy hakie 0° is, en dit is by x = 30°; die sin-vorm se piek is waar sy hakie 90° is, en dit is ook by x = 30°. Dieselfde grafiek, twee name." },
    },
  ],
};

/* ===============================================================
   q5 — the "range of 2f(x) − 1" archetype.
   f(x) = 3 cos x, range [−3 ; 3];  h(x) = 2f(x) − 1 = 6 cos x − 1,
   range [−7 ; 5].
   =============================================================== */
const Q5_WIN = { xmin: -180, xmax: 180, ymin: -8, ymax: 6 };
const Q5_F = { fn: "cos", a: 3, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: -60 };
const Q5_H = { fn: "cos", a: 6, b: 1, p: 0, q: -1, tone: "b", label: "h", labelAt: 60 };
const Q5_SPEC = { type: "trigg", win: Q5_WIN, xstep: 90, ystep: 2, w: 400, h: 300, curves: [Q5_F] };

const q5 = {
  id: "tgraph.sib.sr.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "range-of-a-stretched-and-shifted-version-of-a-given-graph",
  lostQuest: { chapter: CH, quest: "tg2" },
  marks: 5,
  diagram: {
    spec: Q5_SPEC,
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 3, label: "y = 3" }, { y: -3, label: "y = −3" }] } },
      b: { question: {}, reveal: { curves: [Q5_H] } },
      c: {
        question: {},
        reveal: { curves: [Q5_H], hlines: [{ y: 5, label: "y = 5" }, { y: -7, label: "y = −7" }] },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 3 cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;A new function h is defined by &nbsp;h(x) = 2f(x) − 1.<br><br>Write down the range of f.", af: "Die skets toon die grafiek van &nbsp;f(x) = 3 cos x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;'n Nuwe funksie h word gedefinieer deur &nbsp;h(x) = 2f(x) − 1.<br><br>Skryf die waardeversameling van f neer." },
      hint: { en: "The midline is the x-axis and the amplitude is the number in front. Step one amplitude each way.", af: "Die middelste lyn is die x-as en die amplitude is die getal voor. Gaan een amplitude elke kant toe." },
      memo: [
        { type: "step", text: { en: "Amplitude 3, midline &nbsp;y = 0.", af: "Amplitude 3, middelste lyn &nbsp;y = 0." } },
        { type: "answer", text: { en: "y ∈ [−3 ; 3]", af: "y ∈ [−3 ; 3]" }, ticks: ["a"] },
      ],
      esplain: { en: "This is the setting-up step for the rest of the card, so do it properly even though it is one mark. The number in front of the cos is 3, so the graph swings 3 units either side of its middle line, and nothing was added on the end, so that middle line is the x-axis. That puts the range from −3 to 3. Writing it down now matters because part (c) is going to take this range and transform it, and it is much easier to transform two numbers than to think about a whole curve.", af: "Dit is die opstelstap vir die res van die kaart, so doen dit behoorlik al is dit net een punt. Die getal voor die cos is 3, so die grafiek swaai 3 eenhede aan weerskante van sy middelste lyn, en niks is aan die einde bygetel nie, so daardie middelste lyn is die x-as. Die waardeversameling loop dus van −3 tot 3. Dit is belangrik om dit nou neer te skryf, want deel (c) gaan hierdie waardeversameling neem en transformeer, en dit is baie makliker om twee getalle te transformeer as om oor 'n hele kurwe te dink." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "Write down the equation of h in the form &nbsp;y = a cos x + q.", af: "Skryf die vergelyking van h neer in die vorm &nbsp;y = a cos x + q." },
      hint: { en: "h(x) = 2f(x) − 1&nbsp; is an instruction: take f's whole equation, double it, then take 1 off.", af: "h(x) = 2f(x) − 1&nbsp; is 'n opdrag: neem f se hele vergelyking, verdubbel dit, en trek dan 1 af." },
      memo: [
        { type: "step", text: { en: "h(x) = 2f(x) − 1 = 2(3 cos x) − 1", af: "h(x) = 2f(x) − 1 = 2(3 cos x) − 1" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "h(x) = 6 cos x − 1", af: "h(x) = 6 cos x − 1" }, ticks: ["a"] },
      ],
      esplain: { en: "Function notation is an instruction sheet, so read it left to right and do exactly what it says. Take f, which is 3 cos x, multiply the whole of it by 2, and then subtract 1 from the result. Doubling 3 cos x gives 6 cos x, and taking 1 off gives 6 cos x − 1. Both of those changes happened outside the cos, which tells you what they did to the picture: the doubling stretched the graph vertically to twice its height, and the subtraction dropped the whole thing 1 unit. Nothing at all happened sideways, so h has exactly the same period as f and its turning points sit at exactly the same x-values.", af: "Funksienotasie is 'n instruksieblad, so lees dit van links na regs en doen presies wat dit sê. Neem f, wat 3 cos x is, vermenigvuldig die hele ding met 2, en trek dan 1 van die resultaat af. As jy 3 cos x verdubbel, kry jy 6 cos x, en as jy 1 aftrek, kry jy 6 cos x − 1. Albei hierdie veranderinge het buite die cos gebeur, en dit sê vir jou wat hulle aan die prent gedoen het: die verdubbeling het die grafiek vertikaal tot twee keer sy hoogte gerek, en die aftrekking het die hele ding 1 eenheid laat sak. Niks het links of regs gebeur nie, so h het presies dieselfde periode as f, en sy draaipunte lê by presies dieselfde x-waardes." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: "Write down the range of h.", af: "Skryf die waardeversameling van h neer." },
      hint: { en: "Either use your equation from (b) — midline and amplitude — or take your range from (a) and do the same two things to both ends of it.", af: "Gebruik jou vergelyking van (b), met die middelste lyn en amplitude, of neem jou waardeversameling van (a) en doen dieselfde twee dinge aan albei eindpunte daarvan." },
      memo: [
        { type: "step", text: { en: "From &nbsp;h(x) = 6 cos x − 1: &nbsp;amplitude = 6, midline &nbsp;y = −1.", af: "Uit &nbsp;h(x) = 6 cos x − 1: &nbsp;amplitude = 6, middelste lyn &nbsp;y = −1." }, ticks: ["ca"] },
        { type: "answer", text: { en: "−1 + 6 = 5 and −1 − 6 = −7 &nbsp;&nbsp;∴&nbsp; y ∈ [−7 ; 5]", af: "−1 + 6 = 5 en −1 − 6 = −7 &nbsp;&nbsp;∴&nbsp; y ∈ [−7 ; 5]" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> &nbsp;take f's range and do the same to both ends: &nbsp;−3 ≤ f(x) ≤ 3 &nbsp;⟹&nbsp; −6 ≤ 2f(x) ≤ 6 &nbsp;⟹&nbsp; −7 ≤ 2f(x) − 1 ≤ 5", af: "<b>OF</b> &nbsp;neem f se waardeversameling en doen dieselfde aan albei eindpunte: &nbsp;−3 ≤ f(x) ≤ 3 &nbsp;⟹&nbsp; −6 ≤ 2f(x) ≤ 6 &nbsp;⟹&nbsp; −7 ≤ 2f(x) − 1 ≤ 5" } },
      ],
      esplain: { en: "There are two honest roads here and both earn full marks. The first is to use the equation you built in part (b): the amplitude is 6, the midline is −1, so the range runs from −1 − 6 = −7 up to −1 + 6 = 5. The second is to transform the range itself, which is often quicker and is the one exam memos usually print. Start from what you know: f is trapped between −3 and 3. Doubling every part of that inequality gives 2f trapped between −6 and 6. Taking 1 off every part gives 2f − 1 trapped between −7 and 5. The rule for the second road is that whatever you do to the function, do to BOTH ends of its range — and if you ever multiply by a negative, remember the two ends swap over.", af: "Daar is hier twee eerlike paaie, en albei verdien volpunte. Die eerste is om die vergelyking te gebruik wat jy in deel (b) gebou het: die amplitude is 6, die middelste lyn is −1, so die waardeversameling loop van −1 − 6 = −7 tot by −1 + 6 = 5. Die tweede is om die waardeversameling self te transformeer, wat dikwels vinniger is en wat eksamenmemo's gewoonlik druk. Begin by wat jy weet: f is vasgevang tussen −3 en 3. As jy elke deel van daardie ongelykheid verdubbel, is 2f vasgevang tussen −6 en 6. As jy 1 van elke deel aftrek, is 2f − 1 vasgevang tussen −7 en 5. Die reël vir die tweede pad is: wat jy ook al aan die funksie doen, doen aan ALBEI eindpunte van sy waardeversameling, en as jy ooit met 'n negatiewe getal vermenigvuldig, onthou dat die twee eindpunte omruil." },
    },
  ],
};

/* ===============================================================
   q6 — reflect a tangent, then slide it.
   f(x) = tan x  →  g(x) = −tan x (asymptotes unchanged at ±90°)
   →  h(x) = −tan(x + 45°), asymptotes x = −135° and x = 45°.
   =============================================================== */
const Q6_WIN = { xmin: -180, xmax: 180, ymin: -4, ymax: 4 };
const Q6_F = { fn: "tan", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 30 };
const Q6_G = { fn: "tan", a: -1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: -30 };
const Q6_H = { fn: "tan", a: -1, b: 1, p: -45, q: 0, tone: "a", dash: true, label: "h", labelAt: -15 };
const Q6_SPEC = { type: "trigg", win: Q6_WIN, xstep: 45, ystep: 1, w: 400, h: 300, curves: [Q6_F], showAsym: true };
const Q6_G_ONLY = { ...Q6_SPEC, curves: [Q6_G] };

const q6 = {
  id: "tgraph.sib.sr.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "reflect-a-tangent-then-shift-it-and-track-the-asymptotes",
  lostQuest: { chapter: CH, quest: "tg5" },
  marks: 5,
  diagram: {
    spec: Q6_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q6_G] } },
      b: {
        question: {},
        reveal: { curves: [Q6_G], vlines: [{ x: -90, label: "x = −90°" }, { x: 90, label: "x = 90°" }] },
      },
      c: {
        spec: Q6_G_ONLY,
        question: {},
        reveal: { curves: [Q6_H], vlines: [{ x: -135, label: "x = −135°" }, { x: 45, label: "x = 45°" }] },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 2,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = tan x&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;with its asymptotes shown as dashed lines. &nbsp;g is the graph of f reflected in the x-axis, and h is the graph of g shifted 45° to the LEFT.<br><br>Write down the equation of g.", af: "Die skets toon die grafiek van &nbsp;f(x) = tan x&nbsp; vir &nbsp;x ∈ [−180° ; 180°], &nbsp;met sy asimptote as stippellyne getoon. &nbsp;g is die grafiek van f gereflekteer in die x-as, en h is die grafiek van g 45° na LINKS geskuif.<br><br>Skryf die vergelyking van g neer." },
      hint: { en: "A reflection in the x-axis turns every height upside down. That is a minus in front of the whole thing.", af: "'n Refleksie in die x-as draai elke hoogte onderstebo. Dit is 'n minus voor die hele ding." },
      memo: [
        { type: "step", text: { en: "Reflecting in the x-axis multiplies every value by −1.", af: "'n Refleksie in die x-as vermenigvuldig elke waarde met −1." } },
        { type: "answer", text: { en: "g(x) = −tan x", af: "g(x) = −tan x" }, ticks: ["a"] },
      ],
      esplain: { en: "A reflection in the x-axis is the simplest transformation to write down, because it only ever means one thing: put a minus in front of the whole function. On a tangent graph the effect is easy to picture. Each branch of a plain tangent climbs from bottom left to top right; flip it and each branch now falls from top left to bottom right. Where the graph used to shoot upwards towards an asymptote, it now plunges downwards. What has not changed is where those asymptotes are, and that is the next part.", af: "'n Refleksie in die x-as is die maklikste transformasie om neer te skryf, want dit beteken altyd net een ding: sit 'n minus voor die hele funksie. Op 'n tan-grafiek is die effek maklik om voor te stel. Elke tak van 'n gewone tan-grafiek klim van links onder na regs bo; reflekteer dit en elke tak val nou van links bo na regs onder. Waar die grafiek vroeër opwaarts na 'n asimptoot geskiet het, duik dit nou afwaarts. Wat nie verander het nie, is waar daardie asimptote is, en dit is die volgende deel." },
    },
    {
      id: "b", marks: 2, level: 1,
      prompt: { en: "Write down the equations of the asymptotes of g for &nbsp;x ∈ [−180° ; 180°].", af: "Skryf die vergelykings van die asimptote van g neer vir &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "Ask whether turning a graph upside down can move a vertical line sideways.", af: "Vra jouself of om 'n grafiek onderstebo te draai 'n vertikale lyn links of regs kan skuif." },
      memo: [
        { type: "step", text: { en: "A reflection in the x-axis moves points up and down only, so it cannot move a vertical asymptote sideways — g breaks exactly where f broke.", af: "'n Refleksie in die x-as beweeg punte net op en af, so dit kan nie 'n vertikale asimptoot links of regs skuif nie: g breek presies waar f gebreek het." } },
        { type: "answer", text: { en: "x = −90° &nbsp;and&nbsp; x = 90°", af: "x = −90° &nbsp;en&nbsp; x = 90°" }, ticks: ["a", "a"] },
      ],
      esplain: { en: "The useful question to ask about any transformation is: which direction did it move things in? A reflection in the x-axis moves every point straight up or straight down to the mirror position, and never sideways. An asymptote of a tangent graph is a vertical line, defined entirely by its x-value, so a purely vertical movement cannot shift it. The graph is undefined at exactly the same x-values as before, and the asymptotes stay at −90° and 90°. Compare that with the next part, where the move IS sideways and the asymptotes travel with the graph.", af: "Die nuttige vraag om oor enige transformasie te vra, is: in watter rigting het dit dinge beweeg? 'n Refleksie in die x-as beweeg elke punt reguit op of reguit af na die gereflekteerde posisie, en nooit links of regs nie. 'n Asimptoot van 'n tan-grafiek is 'n vertikale lyn, heeltemal deur sy x-waarde bepaal, so 'n suiwer vertikale beweging kan dit nie skuif nie. Die grafiek is by presies dieselfde x-waardes onbepaald as voorheen, en die asimptote bly by −90° en 90°. Vergelyk dit met die volgende deel, waar die skuif WEL links of regs is en die asimptote saam met die grafiek beweeg." },
    },
    {
      id: "c", marks: 2, level: 3,
      prompt: { en: "Write down the equation of h and the equations of its asymptotes for &nbsp;x ∈ [−180° ; 180°].", af: "Skryf die vergelyking van h en die vergelykings van sy asimptote neer vir &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "A shift to the left goes inside the bracket as a plus. Then move each of g's asymptotes by the same 45°, and check which ones are still inside the interval.", af: "'n Skuif na links gaan binne die hakie in as 'n plus. Skuif dan elkeen van g se asimptote met dieselfde 45°, en toets watter een nog binne die interval is." },
      memo: [
        { type: "step", text: { en: "A shift 45° to the left replaces x by &nbsp;x + 45°: &nbsp;h(x) = −tan(x + 45°)", af: "'n Skuif van 45° na links vervang x met &nbsp;x + 45°: &nbsp;h(x) = −tan(x + 45°)" }, ticks: ["a"] },
        { type: "step", text: { en: "The asymptotes travel with the graph: &nbsp;−90° − 45° = −135°&nbsp; and &nbsp;90° − 45° = 45°.", af: "Die asimptote beweeg saam met die grafiek: &nbsp;−90° − 45° = −135°&nbsp; en &nbsp;90° − 45° = 45°." } },
        { type: "answer", text: { en: "x = −135° &nbsp;and&nbsp; x = 45°", af: "x = −135° &nbsp;en&nbsp; x = 45°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT for the two different signs in one question. Inside the equation a shift LEFT is a PLUS (x + 45°); on the picture the asymptotes move LEFT, so you SUBTRACT 45° from their x-values. Both are correct at the same time — the plus is about the input, the subtraction is about where things end up.", af: "PASOP vir die twee verskillende tekens in een vraag. Binne die vergelyking is 'n skuif na LINKS 'n PLUS (x + 45°); op die prent skuif die asimptote na LINKS, so jy TREK 45° van hul x-waardes AF. Albei is terselfdertyd korrek: die plus gaan oor die invoer, die aftrekking gaan oor waar dinge eindig." } },
      ],
      esplain: { en: "This part puts the two ideas next to each other on purpose. In the equation, a shift to the left is a plus inside the bracket, because the machine has to be handed a number 45° bigger before it does its work. On the drawing, the same shift moves every feature 45° further left, so each asymptote's x-value goes DOWN by 45. Those two facts look contradictory until you notice they are about different things: one is about what goes into the function, the other is about where the picture ends up. Work the asymptotes from the picture, not from the sign in the bracket, and you will not get confused. Last, check the interval: −135° and 45° both sit inside it, and the next one along at 225° does not.", af: "Hierdie deel sit die twee idees doelbewus langs mekaar. In die vergelyking is 'n skuif na links 'n plus binne die hakie, want die masjien moet 'n getal kry wat 45° groter is voordat dit sy werk doen. Op die tekening beweeg dieselfde skuif elke kenmerk 45° verder na links, so elke asimptoot se x-waarde gaan 45 AF. Daardie twee feite lyk teenstrydig totdat jy agterkom dat hulle oor verskillende dinge gaan: die een gaan oor wat in die funksie ingaan, die ander oor waar die prent eindig. Werk die asimptote uit die prent uit, nie uit die teken in die hakie nie, en jy sal nie deurmekaar raak nie. Laastens, toets die interval: −135° en 45° lê albei daarbinne, en die volgende een by 225° lê nie daarbinne nie." },
    },
  ],
};

export const tgraphShiftReflectQuestions = [q1, q2, q3, q4, q5, q6];
