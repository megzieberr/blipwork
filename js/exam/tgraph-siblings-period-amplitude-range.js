/* ============================================================
   EXAM FOCUS — Trig Graphs · SIBLING CARDS for the skill
   "period-amplitude-range"   (SESSION E, 2026-08-23, EXAM-BUILD-DAY.md)
   ------------------------------------------------------------
   HER OWN ASK, ruling 8 on the build day, in her words: "one round
   where it only asks for the period, amplitude and range for different
   trig equations — just the equations, no sketch. The kids really
   struggle with that."

   So every card here is THREE equations, one per part, and every part
   asks for exactly the same three facts. Nothing is read off a picture;
   everything is worked from the equation. Her own worksheet's mix of
   shapes is covered — b inside, a in front, q on the end, a horizontal
   shift, a negative a, a fraction, and the tangent family — with FRESH
   numbers throughout.

   THE TWO-PARAMETER WALL (GR11-IEB-PAPER-BANK.md, Grade 11 scope
   walls: "trig graphs are assessed in Paper 2 only, max two parameters
   varied"). Every one of the eighteen equations below varies AT MOST
   two of a, b, p, q. Her own worksheet's last line, r = 2tan3x + 3,
   varies three, so its shape is kept but trimmed to two (q6(c) keeps
   the "tangent with two things going on" feel as 3tan(x − 30°)).

   THE METHOD is the one the app already teaches in round tg3
   (js/quests/questtg3-period-amp-range.js), word for word:
       period    = 360° ÷ b   (tangent: 180° ÷ b)
       amplitude = |a|, always positive — the sign of a only FLIPS it
       range     = [q − amplitude ; q + amplitude], tangent: y ∈ ℝ
   METHODS-trig.md Part P records that her handwritten trig notes stop
   before trig graphs, so there is no story of hers to follow here and
   none is invented; the wording above is the app's own established
   voice, which is hers already.

   NO FIGURES ANYWHERE ON THIS TILE — her ruling 8, taken literally.

   The session brief asked for a reveal-side graph here (period arrow,
   dashed midline, the max and min lines). It was built, rendered and
   READ at 375 px, and then removed, because js/exam-play.js draws a
   part's BASE spec on the question side whenever that part carries a
   diagram entry at all: there is no "nothing now, a graph later" state.
   A reveal-side graph therefore costs an empty pair of degree axes
   sitting above every prompt while the learner is still working — a
   third of a phone screen of white box that reads as "draw here", which
   is exactly what "just the equations, no sketch" rules out.

   So this tile is text only, and the three facts are carried by the
   memo. Restoring the reveals is a one-file change if she wants them
   (the figure builders are in this file's git history, and every other
   tgraph tile shows the pattern).
   ============================================================ */

import { L } from "../lang.js";

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "period-amplitude-range";
const LOST = { chapter: CH, quest: "tg3" };

/* ---------------------------------------------------------------
   MEMO BUILDERS — the same three lines every time, because that is
   the drill. Three ticks on a sin/cos part (one per fact), two on a
   tangent part (period and range; "no amplitude" is a reason, not a
   mark).
   --------------------------------------------------------------- */
const tw = (x) => (typeof x === "string" ? { en: x } : x);   /* a line is { en, af } or plain English */
const scMemo = (periodLine, ampLine, rangeReason, answerLine) => [
  { type: "step", text: tw(periodLine), ticks: ["a"] },
  { type: "step", text: tw(ampLine), ticks: ["a"] },
  { type: "step", text: tw(rangeReason) },
  { type: "answer", text: tw(answerLine), ticks: ["a"] },
];
const tanMemo = (periodLine, answerLine) => [
  { type: "step", text: tw(periodLine), ticks: ["a"] },
  { type: "step", text: { en: "A tangent graph climbs forever between its asymptotes — it has no highest point and no lowest point, so it has <b>no amplitude</b> at all.", af: "'n Tan-grafiek klim eindeloos tussen sy asimptote: dit het geen hoogste punt en geen laagste punt nie, dus het dit glad <b>geen amplitude</b> nie." } },
  { type: "answer", text: tw(answerLine), ticks: ["a"] },
];

const NEG_A_TRAP = {
  type: "trap",
  text: { en: "WATCH OUT: a negative a flips the graph upside down, but the amplitude stays POSITIVE. Amplitude is a distance — how far the graph swings away from its midline — and a distance is never negative. Write the size of a, not a with its sign.", af: "PASOP: 'n negatiewe a draai die grafiek onderstebo, maar die amplitude bly POSITIEF. Amplitude is 'n afstand, hoe ver die grafiek van sy middelste lyn af wegswaai, en 'n afstand is nooit negatief nie. Skryf die grootte van a, nie a met sy teken nie." },
};
const P_TRAP = {
  type: "trap",
  text: { en: "REMEMBER: a number inside the bracket with the x only slides the graph left or right. Sliding a graph sideways changes none of these three answers — same period, same amplitude, same range. Only b changes the period, only a changes the amplitude, and only a and q change the range.", af: "ONTHOU: 'n getal binne die hakie by die x skuif die grafiek net links of regs. 'n Skuif links of regs verander nie een van hierdie drie antwoorde nie: dieselfde periode, dieselfde amplitude, dieselfde waardeversameling. Net b verander die periode, net a verander die amplitude, en net a en q verander die waardeversameling." },
};
/* the stem every part shares; L() picks the device language once, at load
   (as js/exam/skills.js does), so both sides of each prompt keep ${ASK} */
const ASK = L("Write down the <b>period</b>, the <b>amplitude</b> and the <b>range</b> of", "Skryf die <b>periode</b>, die <b>amplitude</b> en die <b>waardeversameling</b> neer vir");

/* ===============================================================
   q1 — the plainest three: one thing changed in each equation.
   (a) y = sin 4x        P = 360 ÷ 4 = 90°,  A = 1,  range [−1 ; 1]
   (b) y = cos x − 3     P = 360°,           A = 1,  range [−4 ; −2]
   (c) y = tan 2x        P = 180 ÷ 2 = 90°,  no amplitude, y ∈ ℝ
   =============================================================== */
const q1 = {
  id: "tgraph.sib.par.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-from-the-equation-one-parameter",
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = sin 4x.`, af: `${ASK} &nbsp;y = sin 4x.` },
      hint: { en: "Three separate questions in one. The 4 sits with the x, so it belongs to the period. Nothing is in front of the sin and nothing is added on the end — so what does that make the amplitude, and where is the midline?", af: "Drie aparte vrae in een. Die 4 staan by die x, dus behoort dit aan die periode. Niks staan voor die sin nie en niks word aan die einde bygetel nie: wat is die amplitude dan, en waar is die middelste lyn?" },
      memo: scMemo(
        { en: "Period = 360° ÷ 4 = <b>90°</b>", af: "Periode = 360° ÷ 4 = <b>90°</b>" },
        { en: "Amplitude = |a| = |1| = <b>1</b>", af: "Amplitude = |a| = |1| = <b>1</b>" },
        { en: "Range: the midline is y = 0, so go one amplitude up and one amplitude down from there.", af: "Waardeversameling: die middelste lyn is y = 0, dus gaan van daar af een amplitude op en een amplitude af." },
        { en: "<span class=\"nowrap\">Period = 90°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−1 ; 1]</span>", af: "<span class=\"nowrap\">Periode = 90°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−1 ; 1]</span>" },
      ),
      esplain: { en: "These three words describe three completely different things about the same wave, so it helps to say what each one means before you hunt for it. The period is how wide one whole wave is before the picture starts repeating — a plain sine takes 360°, and the 4 squashes four whole waves into that same space, so each one is only 90° wide. The amplitude is how far the wave swings away from its middle line, up or down. There is no number in front of the sin, so that swing is just 1. The range is the list of heights the graph actually reaches. The middle is at zero and the swing is 1, so the graph lives between −1 and 1 and never leaves. Notice that the 4 changed the period and left the other two alone — each letter has its own job.", af: "Hierdie drie woorde beskryf drie heel verskillende dinge van dieselfde golf, so dit help om te sê wat elkeen beteken voordat jy daarna soek. Die periode is hoe wyd een hele golf is voordat die prent begin herhaal: 'n gewone sin-grafiek neem 360°, en die 4 druk vier hele golwe in daardie selfde ruimte saam, dus is elkeen net 90° wyd. Die amplitude is hoe ver die golf van sy middelste lyn af wegswaai, op of af. Daar is geen getal voor die sin nie, dus is daardie swaai net 1. Die waardeversameling is die lys hoogtes wat die grafiek werklik bereik. Die middel is by nul en die swaai is 1, dus bly die grafiek tussen −1 en 1 en gaan nooit daar uit nie. Let op dat die 4 die periode verander het en die ander twee uitgelos het: elke letter het sy eie taak." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = cos x − 3.`, af: `${ASK} &nbsp;y = cos x − 3.` },
      hint: { en: "The − 3 is on the end, outside everything, so it does not touch the x at all. Ask yourself what it DOES move, and then build the range from the new middle line.", af: "Die − 3 staan aan die einde, buite alles, dus raak dit glad nie aan die x nie. Vra jouself wat dit WEL skuif, en bou dan die waardeversameling vanaf die nuwe middelste lyn." },
      memo: scMemo(
        { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" },
        { en: "Amplitude = |a| = |1| = <b>1</b>", af: "Amplitude = |a| = |1| = <b>1</b>" },
        { en: "Range: the − 3 drags the whole graph down, so the midline is y = −3. One amplitude each way gives −3 − 1 = −4 and −3 + 1 = −2.", af: "Waardeversameling: die − 3 skuif die hele grafiek af, dus is die middelste lyn y = −3. Een amplitude na elke kant gee −3 − 1 = −4 en −3 + 1 = −2." },
        { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−4 ; −2]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−4 ; −2]</span>" },
      ),
      esplain: { en: "A number added or subtracted on the end lifts or drops the whole picture without changing its shape. Think of the graph as a wave painted on a sheet of glass: sliding the glass down by 3 does not make the wave wider and does not make it swing further, it just puts the whole thing lower. So the period stays 360° and the amplitude stays 1, and the only thing that moves is the middle line, from y = 0 down to y = −3. Build the range from that new middle: one amplitude up is −2, one amplitude down is −4. The most common slip is to write the range as [−1 ; 1] − 3 in your head and then subtract only once. Write the midline down first, then step up and down from it.", af: "'n Getal wat aan die einde bygetel of afgetrek word, skuif die hele prent op of af sonder om sy vorm te verander. Dink aan die grafiek as 'n golf wat op 'n glasplaat geverf is: as jy die glas 3 af skuif, word die golf nie wyer nie en swaai dit nie verder nie, dit sit net die hele ding laer. Dus bly die periode 360° en die amplitude 1, en die enigste ding wat skuif, is die middelste lyn, van y = 0 af na y = −3. Bou die waardeversameling vanaf daardie nuwe middel: een amplitude op is −2, een amplitude af is −4. Die algemeenste fout is om die waardeversameling in jou kop as [−1 ; 1] − 3 te skryf en dan net een keer af te trek. Skryf eers die middelste lyn neer, en stap dan daarvandaan op en af." },
    },
    {
      id: "c", marks: 2, level: 1,
      prompt: { en: `${ASK} &nbsp;y = tan 2x. &nbsp;(A tangent graph has no amplitude — say why.)`, af: `${ASK} &nbsp;y = tan 2x. &nbsp;('n Tan-grafiek het geen amplitude nie: sê hoekom.)` },
      hint: { en: "A tangent graph is not a wave between a top and a bottom, so start by asking yourself what it does instead. And its plain period is not 360° — a tangent repeats itself in half that.", af: "'n Tan-grafiek is nie 'n golf tussen 'n top en 'n bodem nie, so vra jouself eers wat dit eerder doen. En sy gewone periode is nie 360° nie: 'n tan-grafiek herhaal homself in die helfte daarvan." },
      memo: tanMemo(
        { en: "Period = 180° ÷ 2 = <b>90°</b> &nbsp;&nbsp;<i>(a tangent's plain period is 180°, not 360°)</i>", af: "Periode = 180° ÷ 2 = <b>90°</b> &nbsp;&nbsp;<i>('n tan-grafiek se gewone periode is 180°, nie 360° nie)</i>" },
        { en: "<span class=\"nowrap\">Period = 90°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: none</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ ℝ</span>", af: "<span class=\"nowrap\">Periode = 90°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: geen</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ ℝ</span>" },
      ),
      esplain: { en: "The tangent graph is the odd one out of the three and it is worth knowing exactly how. A sine or cosine is trapped between a highest point and a lowest point, and the amplitude measures that trap. A tangent has no trap: between one asymptote and the next it comes up from very far below and shoots off very far above, so there is no maximum and no minimum to measure. That is why the honest answer is not zero and not one — it is that a tangent has no amplitude, and the range is every real number. The period is the other difference: a tangent has already repeated itself after 180°, so you divide 180° by b instead of 360°. Here that gives 90°.", af: "Die tan-grafiek is die uitsondering van die drie, en dit is die moeite werd om presies te weet hoe. 'n Sin- of cos-grafiek is vasgevang tussen 'n hoogste punt en 'n laagste punt, en die amplitude meet daardie hok. 'n Tan-grafiek het geen hok nie: tussen een asimptoot en die volgende kom dit van baie ver onder af op en skiet baie ver bo uit, dus is daar geen maksimum en geen minimum om te meet nie. Daarom is die eerlike antwoord nie nul nie en ook nie een nie: 'n tan-grafiek het geen amplitude nie, en die waardeversameling is elke reële getal. Die periode is die ander verskil: 'n tan-grafiek het homself reeds ná 180° herhaal, dus deel jy 180° deur b in plaas van 360°. Hier gee dit 90°." },
    },
  ],
};

/* ===============================================================
   q2 — the other three one-parameter shapes: a in front, a sideways
   slide, and q on a tangent.
   (a) y = 3 sin x           P = 360°, A = 3, range [−3 ; 3]
   (b) y = cos(x + 120°)     P = 360°, A = 1, range [−1 ; 1]
   (c) y = tan x + 4         P = 180°, no amplitude, y ∈ ℝ
   =============================================================== */
const q2 = {
  id: "tgraph.sib.par.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-from-the-equation-shift-does-nothing",
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = 3 sin x.`, af: `${ASK} &nbsp;y = 3 sin x.` },
      hint: { en: "Only one thing has changed, and it is sitting in FRONT of the sin. Decide which of the three answers that number belongs to, then write the other two down without doing any work.", af: "Net een ding het verander, en dit staan VOOR die sin. Besluit aan watter van die drie antwoorde daardie getal behoort, en skryf dan die ander twee neer sonder om enige werk te doen." },
      memo: scMemo(
        { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" },
        { en: "Amplitude = |a| = |3| = <b>3</b>", af: "Amplitude = |a| = |3| = <b>3</b>" },
        { en: "Range: the midline is still y = 0, so go 3 up and 3 down.", af: "Waardeversameling: die middelste lyn is steeds y = 0, dus gaan 3 op en 3 af." },
        { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 3</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−3 ; 3]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 3</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−3 ; 3]</span>" },
      ),
      esplain: { en: "The number in front stretches the wave taller without making it wider. Picture the plain sine graph drawn on a rubber sheet and then pulled straight upwards: every height gets multiplied by 3, so the peak that was at 1 is now at 3 and the trough that was at −1 is now at −3. Sideways, nothing at all has happened, so one whole wave still takes 360°. That is the useful habit here — before you calculate anything, ask which direction each number pulls. A number in front pulls vertically, a number with the x pulls horizontally, and a number on the end slides the whole thing up or down. Once you can name the direction, two of the three answers usually need no working at all.", af: "Die getal voor rek die golf hoër sonder om dit wyer te maak. Stel jou die gewone sin-grafiek voor, geteken op 'n rubbervel en dan reguit opwaarts gerek: elke hoogte word met 3 vermenigvuldig, dus is die hoogste punt wat by 1 was nou by 3, en die laagste punt wat by −1 was, is nou by −3. Horisontaal het glad niks gebeur nie, dus neem een hele golf steeds 360°. Dit is die nuttige gewoonte hier: voordat jy enigiets bereken, vra in watter rigting elke getal trek. 'n Getal voor trek vertikaal, 'n getal by die x trek horisontaal, en 'n getal aan die einde skuif die hele ding op of af. Sodra jy die rigting kan noem, het twee van die drie antwoorde gewoonlik glad geen werk nodig nie." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = cos(x + 120°).`, af: `${ASK} &nbsp;y = cos(x + 120°).` },
      hint: { en: "The 120° is inside the bracket, joined to the x, so it moves the graph sideways. Now ask the important question: does moving a graph sideways change how wide one wave is, how far it swings, or which heights it reaches?", af: "Die 120° is binne die hakie, saam met die x, dus skuif dit die grafiek links of regs. Vra nou die belangrike vraag: verander 'n skuif links of regs hoe wyd een golf is, hoe ver dit swaai, of watter hoogtes dit bereik?" },
      memo: scMemo(
        { en: "Period = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(the 120° slides the graph, it does not squash it)</i>", af: "Periode = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(die 120° skuif die grafiek, dit druk dit nie saam nie)</i>" },
        { en: "Amplitude = |a| = |1| = <b>1</b>", af: "Amplitude = |a| = |1| = <b>1</b>" },
        { en: "Range: the midline is still y = 0, so one up and one down.", af: "Waardeversameling: die middelste lyn is steeds y = 0, dus een op en een af." },
        { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−1 ; 1]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−1 ; 1]</span>" },
      ),
      esplain: { en: "This one is a trap dressed up as work. A number added to the x inside the bracket shifts the whole graph left or right, and a sideways shift is the one move that changes none of these three answers. The wave is still exactly as wide as it was, it still swings exactly as far, and it still reaches exactly the same heights — it just arrives at them earlier. So all three answers are the plain-cosine answers. Learners lose marks here by feeling that a question with a number in it must need a calculation, and then dividing 360° by 120° or adding 120° to something. Read where the number lives first. Inside the bracket next to the x, on its own, means slide, and slide means nothing changes.", af: "Hierdie een is 'n strik wat soos werk lyk. 'n Getal wat binne die hakie by die x getel word, skuif die hele grafiek links of regs, en 'n skuif links of regs is die een beweging wat nie een van hierdie drie antwoorde verander nie. Die golf is steeds presies so wyd soos voorheen, dit swaai steeds presies so ver, en dit bereik steeds presies dieselfde hoogtes: dit kom net vroeër daar aan. Dus is al drie antwoorde dieselfde as vir die gewone cos-grafiek. Leerders verloor hier punte omdat hulle voel 'n vraag met 'n getal in moet 'n berekening nodig hê, en dan deel hulle 360° deur 120° of tel 120° by iets. Lees eers waar die getal woon. Binne die hakie langs die x, op sy eie, beteken skuif, en skuif beteken niks verander nie." },
    },
    {
      id: "c", marks: 2, level: 1,
      prompt: { en: `${ASK} &nbsp;y = tan x + 4.`, af: `${ASK} &nbsp;y = tan x + 4.` },
      hint: { en: "Two things to notice. It is a tangent, so its plain period is not 360°. And the + 4 lifts the whole graph — but think carefully about whether lifting a graph that already reaches every height changes the range.", af: "Let op twee dinge. Dit is 'n tan-grafiek, dus is sy gewone periode nie 360° nie. En die + 4 skuif die hele grafiek op, maar dink mooi: verander die waardeversameling as jy 'n grafiek wat reeds elke hoogte bereik, opskuif?" },
      memo: tanMemo(
        { en: "Period = 180° ÷ 1 = <b>180°</b>", af: "Periode = 180° ÷ 1 = <b>180°</b>" },
        { en: "<span class=\"nowrap\">Period = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: none</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ ℝ</span>", af: "<span class=\"nowrap\">Periode = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: geen</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ ℝ</span>" },
      ),
      esplain: { en: "Lifting a tangent graph by 4 does move it — every point on the picture goes up by 4, and the place where it crosses the y-axis moves from 0 to 4. But the range does not change, and that surprises people. The reason is that a tangent already reaches every single real height before you lift it. Push all those heights up by 4 and you still have every real height, just handed out at different x-values. So the range is still y ∈ ℝ. The period is untouched too, because + 4 is outside and never touches the x. The one thing you should be able to say out loud: it still has no amplitude, because it still has no highest or lowest point to measure between.", af: "As jy 'n tan-grafiek 4 opskuif, skuif dit wel: elke punt op die prent gaan 4 op, en die plek waar dit die y-as sny, skuif van 0 na 4. Maar die waardeversameling verander nie, en dit verras mense. Die rede is dat 'n tan-grafiek reeds elke enkele reële hoogte bereik voordat jy dit opskuif. Druk al daardie hoogtes 4 op en jy het steeds elke reële hoogte, net by ander x-waardes uitgedeel. Dus is die waardeversameling steeds y ∈ ℝ. Die periode bly ook onaangeraak, want + 4 staan buite en raak nooit aan die x nie. Die een ding wat jy hardop moet kan sê: dit het steeds geen amplitude nie, want dit het steeds geen hoogste of laagste punt om tussen te meet nie." },
    },
  ],
};

/* ===============================================================
   q3 — negatives and two parameters at once.
   (a) y = −2 cos x     P = 360°,          A = 2,  range [−2 ; 2]
   (b) y = 5 sin 3x     P = 360 ÷ 3 = 120°, A = 5, range [−5 ; 5]
   (c) y = −½ sin 2x    P = 360 ÷ 2 = 180°, A = ½, range [−½ ; ½]
   =============================================================== */
const q3 = {
  id: "tgraph.sib.par.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-negative-a-and-two-parameters",
  lostQuest: LOST,
  marks: 9,
  parts: [
    {
      id: "a", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −2 cos x.`, af: `${ASK} &nbsp;y = −2 cos x.` },
      hint: { en: "Amplitude is a distance, and a distance is never negative. Work out how far the graph swings from its midline, and let the minus sign do its own separate job.", af: "Amplitude is 'n afstand, en 'n afstand is nooit negatief nie. Werk uit hoe ver die grafiek van sy middelste lyn af swaai, en laat die minusteken sy eie aparte taak doen." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−2| = <b>2</b>", af: "Amplitude = |a| = |−2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is 2, so the graph runs from −2 up to 2. The minus only turns the picture upside down; it does not change WHICH heights are reached.", af: "Waardeversameling: die middelste lyn is y = 0 en die swaai is 2, dus loop die grafiek van −2 tot by 2. Die minus draai net die prent onderstebo; dit verander nie WATTER hoogtes bereik word nie." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−2 ; 2]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−2 ; 2]</span>" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "The minus sign has exactly one job: it turns the graph upside down in the x-axis. A plain cosine starts at the top on the y-axis, so −2 cos x starts at the bottom instead. What the minus does NOT do is make the amplitude negative, because amplitude means how far the graph swings away from the middle, and a how-far is always a positive number. Write it as |a| every single time and the sign takes care of itself. The range is the other place people go wrong: because the graph is flipped, they expect a flipped range, but the same set of heights is still visited — the graph just visits them in the opposite order. Top is still 2, bottom is still −2, so the range is unchanged.", af: "Die minusteken het presies een taak: dit reflekteer die grafiek in die x-as. 'n Gewone cos-grafiek begin bo op die y-as, dus begin −2 cos x eerder onder. Wat die minus NIE doen nie, is om die amplitude negatief te maak, want amplitude beteken hoe ver die grafiek van die middel af wegswaai, en 'n hoe-ver is altyd 'n positiewe getal. Skryf dit elke keer as |a| en die teken sorg vir homself. Die waardeversameling is die ander plek waar mense foute maak: omdat die grafiek gereflekteer is, verwag hulle 'n omgekeerde waardeversameling, maar dieselfde hoogtes word steeds besoek, die grafiek besoek hulle net in die omgekeerde volgorde. Bo is steeds 2, onder is steeds −2, dus bly die waardeversameling dieselfde." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = 5 sin 3x.`, af: `${ASK} &nbsp;y = 5 sin 3x.` },
      hint: { en: "Two numbers, two different jobs. One of them is in front and one of them is with the x. Sort out which is which before you write anything down.", af: "Twee getalle, twee verskillende take. Een staan voor en een staan by die x. Sorteer uit watter een watter is voordat jy iets neerskryf." },
      memo: scMemo(
        { en: "Period = 360° ÷ 3 = <b>120°</b>", af: "Periode = 360° ÷ 3 = <b>120°</b>" },
        { en: "Amplitude = |a| = |5| = <b>5</b>", af: "Amplitude = |a| = |5| = <b>5</b>" },
        { en: "Range: the midline is y = 0, so 5 up and 5 down.", af: "Waardeversameling: die middelste lyn is y = 0, dus 5 op en 5 af." },
        { en: "<span class=\"nowrap\">Period = 120°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 5</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−5 ; 5]</span>", af: "<span class=\"nowrap\">Periode = 120°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 5</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−5 ; 5]</span>" },
      ),
      esplain: { en: "When two numbers appear at once, name each one's direction before you calculate. The 5 is in front of the sin, so it works vertically — it stretches the wave to five times its height. The 3 is with the x, so it works horizontally — it squashes three whole waves into the space one used to take, which makes each wave 120° wide instead of 360°. Because the two numbers pull in different directions they never interfere with each other, and that is the good news: you can answer the period without even looking at the 5, and the amplitude without even looking at the 3. The range then comes free, because the midline has not moved: five above zero and five below.", af: "As twee getalle saam verskyn, noem elkeen se rigting voordat jy bereken. Die 5 staan voor die sin, dus werk dit vertikaal: dit rek die golf tot vyf keer sy hoogte. Die 3 staan by die x, dus werk dit horisontaal: dit druk drie hele golwe saam in die ruimte wat een vroeër gevat het, wat elke golf 120° wyd maak in plaas van 360°. Omdat die twee getalle in verskillende rigtings trek, steur hulle mekaar nooit nie, en dit is die goeie nuus: jy kan die periode beantwoord sonder om eers na die 5 te kyk, en die amplitude sonder om eers na die 3 te kyk. Die waardeversameling kom dan verniet, want die middelste lyn het nie geskuif nie: vyf bo nul en vyf onder." },
    },
    {
      id: "c", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −½ sin 2x.`, af: `${ASK} &nbsp;y = −½ sin 2x.` },
      hint: { en: "A fraction in front is still just an amplitude — it makes the wave shorter instead of taller. Take the size of it and leave the minus out of the amplitude.", af: "'n Breuk voor is steeds net 'n amplitude: dit maak die golf laer in plaas van hoër. Neem die grootte daarvan en laat die minus uit die amplitude uit." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 2 = <b>180°</b>", af: "Periode = 360° ÷ 2 = <b>180°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−½| = <b>½</b>", af: "Amplitude = |a| = |−½| = <b>½</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is ½ each way.", af: "Waardeversameling: die middelste lyn is y = 0 en die swaai is ½ na elke kant." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = ½</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−½ ; ½]</span>", af: "<span class=\"nowrap\">Periode = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = ½</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−½ ; ½]</span>" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "A fraction in front of the sin does the same job as a whole number, only the other way round. Multiplying every height by a half squashes the wave flat instead of stretching it tall, so the peak drops from 1 to a half and the trough rises from −1 to minus a half. The minus in front then flips that flattened wave upside down, which changes where the peaks and troughs sit along the x-axis but not how high or low they go. So the amplitude is a half and the range runs from minus a half to a half. Meanwhile the 2 is doing its own separate horizontal job, fitting two whole waves into 360° so that each one is 180° wide. Two numbers, two directions, no interference.", af: "'n Breuk voor die sin doen dieselfde taak as 'n heelgetal, net andersom. As jy elke hoogte met 'n half vermenigvuldig, druk dit die golf plat in plaas van om dit hoog te rek, dus sak die hoogste punt van 1 na 'n half en die laagste punt styg van −1 na minus 'n half. Die minus voor draai daardie plat golf dan onderstebo, wat verander waar die hoogste en laagste punte langs die x-as lê, maar nie hoe hoog of laag hulle gaan nie. Dus is die amplitude 'n half en loop die waardeversameling van minus 'n half tot 'n half. Intussen doen die 2 sy eie aparte horisontale taak: dit pas twee hele golwe in 360°, sodat elkeen 180° wyd is. Twee getalle, twee rigtings, geen steuring nie." },
    },
  ],
};

/* ===============================================================
   q4 — a shifted midline, a fractional b, and a flipped tangent.
   (a) y = 3 sin x + 2   P = 360°,           A = 3, range [−1 ; 5]
   (b) y = −2 cos ½x     P = 360 ÷ ½ = 720°, A = 2, range [−2 ; 2]
   (c) y = −tan 3x       P = 180 ÷ 3 = 60°,  no amplitude, y ∈ ℝ
   =============================================================== */
const q4 = {
  id: "tgraph.sib.par.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-shifted-midline-and-fractional-b",
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = 3 sin x + 2.`, af: `${ASK} &nbsp;y = 3 sin x + 2.` },
      hint: { en: "Find the midline first — it is the number on the end. Then step one amplitude up from it and one amplitude down from it, and you have the range without guessing.", af: "Vind eers die middelste lyn: dit is die getal aan die einde. Stap dan een amplitude op en een amplitude af daarvandaan, en jy het die waardeversameling sonder om te raai." },
      memo: scMemo(
        { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" },
        { en: "Amplitude = |a| = |3| = <b>3</b>", af: "Amplitude = |a| = |3| = <b>3</b>" },
        { en: "Range: the + 2 lifts the midline to y = 2. One amplitude up is 2 + 3 = 5; one amplitude down is 2 − 3 = −1.", af: "Waardeversameling: die + 2 lig die middelste lyn na y = 2. Een amplitude op is 2 + 3 = 5; een amplitude af is 2 − 3 = −1." },
        { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 3</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−1 ; 5]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 3</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−1 ; 5]</span>" },
      ),
      esplain: { en: "This is the shape most range mistakes happen on, so it is worth a fixed routine: write the midline, then step. The midline is the number on the end, here y = 2 — that is the line the wave rocks about. The amplitude is how far it rocks, here 3. So the top of the wave is 2 + 3 = 5 and the bottom is 2 − 3 = −1, and the range is everything in between. Two slips to avoid. The first is writing the range as [−3 ; 3] and forgetting the lift altogether. The second is adding the 2 to only one end, which gives an answer that is not the right width. If you check nothing else, check that the distance between your two range numbers is twice the amplitude — here 5 − (−1) = 6, which is 2 × 3.", af: "Op hierdie vorm gebeur die meeste foute met die waardeversameling, dus is 'n vaste roetine die moeite werd: skryf die middelste lyn, en stap dan. Die middelste lyn is die getal aan die einde, hier y = 2: dit is die lyn waaroor die golf wieg. Die amplitude is hoe ver dit wieg, hier 3. Dus is die top van die golf 2 + 3 = 5 en die bodem 2 − 3 = −1, en die waardeversameling is alles tussenin. Twee foute om te vermy. Die eerste is om die waardeversameling as [−3 ; 3] te skryf en die skuif op heeltemal te vergeet. Die tweede is om die 2 by net een kant te tel, wat 'n antwoord gee wat nie die regte wydte het nie. As jy niks anders kontroleer nie, kontroleer dat die afstand tussen die twee getalle van jou waardeversameling twee keer die amplitude is: hier 5 − (−1) = 6, en dit is 2 × 3." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −2 cos ½x.`, af: `${ASK} &nbsp;y = −2 cos ½x.` },
      hint: { en: "Dividing by a half is the same as multiplying by 2 — so this graph is going to be wider than a plain cosine, not narrower. Do that division carefully and remember the amplitude is a size.", af: "Om deur 'n half te deel, is dieselfde as om met 2 te vermenigvuldig: dus gaan hierdie grafiek wyer as 'n gewone cos-grafiek wees, nie nouer nie. Doen daardie deling versigtig en onthou die amplitude is 'n grootte." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ ½ = 360° × 2 = <b>720°</b>", af: "Periode = 360° ÷ ½ = 360° × 2 = <b>720°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−2| = <b>2</b>", af: "Amplitude = |a| = |−2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is 2 each way.", af: "Waardeversameling: die middelste lyn is y = 0 en die swaai is 2 na elke kant." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 720°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−2 ; 2]</span>", af: "<span class=\"nowrap\">Periode = 720°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−2 ; 2]</span>" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "A b smaller than 1 stretches the graph sideways instead of squashing it, and the arithmetic is the part to slow down on. Dividing by a half means asking how many halves fit into 360°, and the answer is 720 — twice as many, not half as many. So this cosine takes 720° to complete one single wave, which means on an ordinary 0° to 360° set of axes you would only see half of one wave. That is a genuinely useful thing to be able to picture. The minus in front does its usual flip, so instead of starting at its highest point on the y-axis this graph starts at its lowest, but the amplitude is still the positive number 2 and the heights it reaches are still everything from −2 to 2.", af: "'n b kleiner as 1 rek die grafiek horisontaal in plaas van om dit saam te druk, en die rekenwerk is die deel waar jy stadiger moet gaan. Om deur 'n half te deel, beteken om te vra hoeveel helftes in 360° pas, en die antwoord is 720: twee keer soveel, nie die helfte nie. Dus neem hierdie cos-grafiek 720° om een enkele golf te voltooi, wat beteken dat jy op gewone asse van 0° tot 360° net die helfte van een golf sal sien. Dit is regtig nuttig om dit te kan voorstel. Die minus voor doen sy gewone refleksie, dus begin hierdie grafiek op die y-as by sy laagste punt in plaas van by sy hoogste, maar die amplitude is steeds die positiewe getal 2 en die hoogtes wat dit bereik, is steeds alles van −2 tot 2." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −tan 3x.`, af: `${ASK} &nbsp;y = −tan 3x.` },
      hint: { en: "The minus flips it, and the 3 squashes it. Only one of those two changes an answer here — and remember which number a tangent's period starts from.", af: "Die minus draai dit onderstebo, en die 3 druk dit saam. Net een van die twee verander hier 'n antwoord, en onthou van watter getal 'n tan-grafiek se periode begin." },
      memo: tanMemo(
        { en: "Period = 180° ÷ 3 = <b>60°</b> &nbsp;&nbsp;<i>(tangent, so start from 180°)</i>", af: "Periode = 180° ÷ 3 = <b>60°</b> &nbsp;&nbsp;<i>(tan-grafiek, dus begin by 180°)</i>" },
        { en: "<span class=\"nowrap\">Period = 60°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: none</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ ℝ</span>", af: "<span class=\"nowrap\">Periode = 60°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: geen</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ ℝ</span>" },
      ),
      esplain: { en: "Two numbers, and only one of them earns a mark. The 3 is with the x, so it squashes the graph sideways: a tangent already repeats every 180°, and three of them now fit into that space, so the period is 60°. The minus in front flips the picture upside down, which turns a branch that was climbing into a branch that is falling. That is a real change to the drawing, but it changes nothing you have been asked for. The amplitude is still nothing at all, because flipping a graph with no top and no bottom leaves it with no top and no bottom, and the range is still every real number, because flipping every height gives you back the same collection of heights.", af: "Twee getalle, en net een van hulle verdien 'n punt. Die 3 staan by die x, dus druk dit die grafiek horisontaal saam: 'n tan-grafiek herhaal reeds elke 180°, en drie daarvan pas nou in daardie ruimte, dus is die periode 60°. Die minus voor draai die prent onderstebo, wat 'n tak wat geklim het, verander in 'n tak wat daal. Dit is 'n regte verandering aan die skets, maar dit verander niks wat gevra word nie. Daar is steeds glad geen amplitude nie, want as jy 'n grafiek sonder top en bodem reflekteer, het dit steeds geen top en bodem nie, en die waardeversameling is steeds elke reële getal, want as jy elke hoogte reflekteer, kry jy dieselfde versameling hoogtes terug." },
    },
  ],
};

/* ===============================================================
   q5 — the reasoning ones: a flip that lifts, a slide that does
   nothing, and a fraction on a tangent.
   (a) y = −sin x + 3       P = 360°,          A = 1,  range [2 ; 4]
   (b) y = 2 cos(x + 135°)  P = 360°,          A = 2,  range [−2 ; 2]
   (c) y = ½ tan 4x         P = 180 ÷ 4 = 45°, no amplitude, y ∈ ℝ
   =============================================================== */
const q5 = {
  id: "tgraph.sib.par.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-flip-with-a-lift-and-a-decoy-shift",
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = −sin x + 3.`, af: `${ASK} &nbsp;y = −sin x + 3.` },
      hint: { en: "Two things are happening at once: a flip and a lift. Only one of them touches the range. Find the midline, then step one amplitude each way from it.", af: "Twee dinge gebeur tegelyk: 'n refleksie en 'n skuif op. Net een van hulle raak aan die waardeversameling. Vind die middelste lyn, en stap dan een amplitude na elke kant daarvandaan." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−1| = <b>1</b>", af: "Amplitude = |a| = |−1| = <b>1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the + 3 puts the midline at y = 3. One amplitude up is 3 + 1 = 4; one amplitude down is 3 − 1 = 2. The flip changes where the graph is high and where it is low, not how high and how low.", af: "Waardeversameling: die + 3 sit die middelste lyn by y = 3. Een amplitude op is 3 + 1 = 4; een amplitude af is 3 − 1 = 2. Die refleksie verander waar die grafiek hoog en waar dit laag is, nie hoe hoog en hoe laag nie." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [2 ; 4]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [2 ; 4]</span>" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "Take the two changes one at a time and neither is hard. The minus flips the sine upside down, so it dips first instead of rising first. The + 3 then lifts the whole flipped wave three units, which drags the midline from y = 0 up to y = 3. Now build the range the same way you always do: midline 3, amplitude 1, so the top is 4 and the bottom is 2. Something worth noticing here is that this graph never touches the x-axis at all — its lowest point is 2, which is still above zero. A graph that sits entirely above the x-axis has no x-intercepts, and questions love asking about that. The flip contributes nothing to any of the three answers; it only decides which way round the wave runs.", af: "Vat die twee veranderinge een op 'n slag, en nie een is moeilik nie. Die minus draai die sin-grafiek onderstebo, dus daal dit eers in plaas van om eers te styg. Die + 3 skuif dan die hele gereflekteerde golf drie eenhede op, wat die middelste lyn van y = 0 na y = 3 opskuif. Bou nou die waardeversameling soos altyd: middelste lyn 3, amplitude 1, dus is die top 4 en die bodem 2. Iets wat die moeite werd is om op te let: hierdie grafiek raak glad nooit aan die x-as nie, want sy laagste punt is 2, wat steeds bo nul is. 'n Grafiek wat heeltemal bo die x-as lê, het geen x-afsnitte nie, en vrae vra graag daaroor. Die refleksie dra niks by tot enige van die drie antwoorde nie; dit besluit net in watter rigting die golf loop." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = 2 cos(x + 135°).`, af: `${ASK} &nbsp;y = 2 cos(x + 135°).` },
      hint: { en: "One of these two numbers changes an answer and the other one is a decoy. Decide what each one does to the picture before you write a single thing down.", af: "Een van hierdie twee getalle verander 'n antwoord en die ander een is 'n lokvoël. Besluit wat elkeen aan die prent doen voordat jy een enkele ding neerskryf." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(b = 1; the 135° is a sideways slide, not a squash)</i>", af: "Periode = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(b = 1; die 135° skuif, dit druk nie saam nie)</i>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |2| = <b>2</b>", af: "Amplitude = |a| = |2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: nothing was added on the end, so the midline is still y = 0. Two up and two down.", af: "Waardeversameling: niks is aan die einde bygetel nie, dus is die middelste lyn steeds y = 0. Twee op en twee af." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−2 ; 2]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 2</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−2 ; 2]</span>" }, ticks: ["a"] },
        P_TRAP,
      ],
      esplain: { en: "Everything here turns on where each number is standing. The 2 is in front, so it stretches the graph vertically and it owns the amplitude. The 135° is inside the bracket, added to the x, so it slides the graph sideways — and a sideways slide is the one transformation that leaves the period, the amplitude and the range all untouched. Learners lose this mark by treating the 135° as though it were a b and dividing 360° by it, which gives a period of about 2,67°, nothing like this graph's real period. A quick sanity check that always works: b is whatever is MULTIPLYING the x. Here nothing is multiplying the x, so b is 1 and the period is a plain 360°. The 135° only decides where the first peak lands.", af: "Alles hier hang af van waar elke getal staan. Die 2 staan voor, dus rek dit die grafiek vertikaal en dit besit die amplitude. Die 135° is binne die hakie, by die x getel, dus skuif dit die grafiek links of regs, en 'n skuif links of regs is die een transformasie wat die periode, die amplitude en die waardeversameling almal onaangeraak laat. Leerders verloor hierdie punt deur die 135° te behandel asof dit 'n b is en 360° daardeur te deel, wat 'n periode van sowat 2,67° gee, niks soos hierdie grafiek se werklike periode nie. 'n Vinnige kontrole wat altyd werk: b is wat ook al die x VERMENIGVULDIG. Hier vermenigvuldig niks die x nie, dus is b gelyk aan 1 en die periode 'n gewone 360°. Die 135° besluit net waar die eerste piek land." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: `${ASK} &nbsp;y = ½ tan 4x.`, af: `${ASK} &nbsp;y = ½ tan 4x.` },
      hint: { en: "The half in front is tempting to call an amplitude — but ask yourself first whether this graph has a highest and a lowest point for an amplitude to measure between.", af: "Dit is aanloklik om die half voor 'n amplitude te noem, maar vra jouself eers of hierdie grafiek 'n hoogste en 'n laagste punt het waartussen 'n amplitude kan meet." },
      memo: tanMemo(
        { en: "Period = 180° ÷ 4 = <b>45°</b>", af: "Periode = 180° ÷ 4 = <b>45°</b>" },
        { en: "<span class=\"nowrap\">Period = 45°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: none</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ ℝ</span>", af: "<span class=\"nowrap\">Periode = 45°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: geen</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ ℝ</span>" },
      ),
      esplain: { en: "This is the tangent question written to catch you, and the bait is the half in front. On a sine or a cosine that half would be the amplitude, and writing a half here feels completely reasonable. But amplitude is defined as the distance from the midline to the highest point, and a tangent graph has no highest point, so there is no such distance to report — the honest answer stays no amplitude, not a half. What the half actually does is squash the branches closer to the vertical, which changes the picture but not the range: the graph still climbs to every possible height between one asymptote and the next. The 4 does the only work that earns a mark, cutting the tangent's 180° period down to 45°.", af: "Dit is die tan-vraag wat geskryf is om jou te vang, en die lokaas is die half voor. Op 'n sin- of cos-grafiek sou daardie half die amplitude wees, en om hier 'n half te skryf, voel heeltemal redelik. Maar amplitude is gedefinieer as die afstand van die middelste lyn tot by die hoogste punt, en 'n tan-grafiek het geen hoogste punt nie, dus is daar geen sodanige afstand om te gee nie: die eerlike antwoord bly geen amplitude nie, nie 'n half nie. Wat die half eintlik doen, is om die takke nader aan die vertikaal saam te druk, wat die prent verander maar nie die waardeversameling nie: die grafiek klim steeds tot elke moontlike hoogte tussen een asimptoot en die volgende. Die 4 doen die enigste werk wat 'n punt verdien: dit sny die tan-grafiek se periode van 180° af na 45°." },
    },
  ],
};

/* ===============================================================
   q6 — the hardest three: a very wide graph, a flip that drops, and
   a shifted tangent.
   (a) y = 6 sin ½x         P = 360 ÷ ½ = 720°, A = 6, range [−6 ; 6]
   (b) y = −cos x − 2       P = 360°,           A = 1, range [−3 ; −1]
   (c) y = 3 tan(x − 30°)   P = 180°,           no amplitude, y ∈ ℝ
   =============================================================== */
const q6 = {
  id: "tgraph.sib.par.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "period-amplitude-range-wide-graph-negative-midline-shifted-tangent",
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = 6 sin ½x.`, af: `${ASK} &nbsp;y = 6 sin ½x.` },
      hint: { en: "Ask how many halves fit into 360° — that is the division you actually need. Then check your answer feels right: does a b below 1 make the graph wider or narrower?", af: "Vra hoeveel helftes in 360° pas: dit is die deling wat jy eintlik nodig het. Kontroleer dan of jou antwoord reg voel: maak 'n b onder 1 die grafiek wyer of nouer?" },
      memo: scMemo(
        { en: "Period = 360° ÷ ½ = 360° × 2 = <b>720°</b>", af: "Periode = 360° ÷ ½ = 360° × 2 = <b>720°</b>" },
        { en: "Amplitude = |a| = |6| = <b>6</b>", af: "Amplitude = |a| = |6| = <b>6</b>" },
        { en: "Range: the midline is y = 0, so 6 up and 6 down.", af: "Waardeversameling: die middelste lyn is y = 0, dus 6 op en 6 af." },
        { en: "<span class=\"nowrap\">Period = 720°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 6</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−6 ; 6]</span>", af: "<span class=\"nowrap\">Periode = 720°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 6</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−6 ; 6]</span>" },
      ),
      esplain: { en: "The two numbers here pull as hard as they can in opposite directions, which makes this a good one to picture rather than only calculate. The 6 stretches the wave up and down until it reaches from −6 to 6, so it is a tall graph. The half stretches it sideways, doubling how long one wave takes, so it is also a very wide graph — one single wave now takes a full 720°, which is two turns of the circle. The division is the part to be careful with. Dividing by a half never makes a number smaller: 360° ÷ ½ is the same as 360° × 2, which is 720°. If your period comes out at 180° you have divided the wrong way round, and a quick picture of one long slow wave is enough to catch it.", af: "Die twee getalle hier trek so hard as wat hulle kan in heel verskillende rigtings, so dit is 'n goeie een om voor te stel eerder as net te bereken. Die 6 rek die golf op en af totdat dit van −6 tot 6 strek, dus is dit 'n hoë grafiek. Die half rek dit horisontaal en verdubbel hoe lank een golf neem, dus is dit ook 'n baie wye grafiek: een enkele golf neem nou 'n volle 720°, wat twee keer om die sirkel is. Die deling is die deel waarmee jy versigtig moet wees. Om deur 'n half te deel, maak 'n getal nooit kleiner nie: 360° ÷ ½ is dieselfde as 360° × 2, en dit is 720°. As jou periode 180° uitkom, het jy verkeerd om gedeel, en 'n vinnige prentjie van een lang, stadige golf is genoeg om dit te vang." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = −cos x − 2.`, af: `${ASK} &nbsp;y = −cos x − 2.` },
      hint: { en: "Two minus signs, and they are doing two completely different jobs. One flips the graph and one drops it. Find the midline first, then step one amplitude each way from there.", af: "Twee minustekens, en hulle doen twee heel verskillende take. Een draai die grafiek onderstebo en een skuif dit af. Vind eers die middelste lyn, en stap dan een amplitude na elke kant daarvandaan." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>", af: "Periode = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−1| = <b>1</b>", af: "Amplitude = |a| = |−1| = <b>1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the − 2 on the end puts the midline at y = −2. One amplitude up is −2 + 1 = −1; one amplitude down is −2 − 1 = −3.", af: "Waardeversameling: die − 2 aan die einde sit die middelste lyn by y = −2. Een amplitude op is −2 + 1 = −1; een amplitude af is −2 − 1 = −3." } },
        { type: "answer", text: { en: "<span class=\"nowrap\">Period = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ [−3 ; −1]</span>", af: "<span class=\"nowrap\">Periode = 360°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude = 1</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ [−3 ; −1]</span>" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "Two minus signs in one equation, and they never mean the same thing. The first one sits in front of the cos and flips the graph upside down. The second one sits on the end and drops the whole picture two units. Sort them by position, not by feel. The amplitude comes from the first: the size of −1 is 1. The midline comes from the second: y = −2. Then step, and be careful with the signs on the way — one up from −2 is −1, one down from −2 is −3, so the range is from −3 to −1. Write the smaller number first, always. This graph lives entirely below the x-axis, which is another way to check your answer: if either end of your range came out positive, something has gone wrong.", af: "Twee minustekens in een vergelyking, en hulle beteken nooit dieselfde ding nie. Die eerste een staan voor die cos en draai die grafiek onderstebo. Die tweede een staan aan die einde en skuif die hele prent twee eenhede af. Sorteer hulle volgens posisie, nie volgens gevoel nie. Die amplitude kom van die eerste: die grootte van −1 is 1. Die middelste lyn kom van die tweede: y = −2. Stap dan, en wees versigtig met die tekens op pad: een op van −2 is −1, een af van −2 is −3, dus is die waardeversameling van −3 tot −1. Skryf altyd die kleiner getal eerste. Hierdie grafiek lê heeltemal onder die x-as, wat nog 'n manier is om jou antwoord te kontroleer: as enige kant van jou waardeversameling positief uitgekom het, het iets verkeerd geloop." },
    },
    {
      id: "c", marks: 2, level: 3,
      prompt: { en: `${ASK} &nbsp;y = 3 tan(x − 30°).`, af: `${ASK} &nbsp;y = 3 tan(x − 30°).` },
      hint: { en: "Two numbers, and neither of them is a b. Work out what is actually multiplying the x, and remember what a sideways slide does to a range.", af: "Twee getalle, en nie een van hulle is 'n b nie. Werk uit wat die x eintlik vermenigvuldig, en onthou wat 'n skuif links of regs aan 'n waardeversameling doen." },
      memo: tanMemo(
        { en: "Period = 180° ÷ 1 = <b>180°</b> &nbsp;&nbsp;<i>(nothing is multiplying the x, so b = 1; the 30° only slides the graph)</i>", af: "Periode = 180° ÷ 1 = <b>180°</b> &nbsp;&nbsp;<i>(niks vermenigvuldig die x nie, dus b = 1; die 30° skuif net die grafiek)</i>" },
        { en: "<span class=\"nowrap\">Period = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: none</span> &nbsp;·&nbsp; <span class=\"nowrap\">Range: y ∈ ℝ</span>", af: "<span class=\"nowrap\">Periode = 180°</span> &nbsp;·&nbsp; <span class=\"nowrap\">Amplitude: geen</span> &nbsp;·&nbsp; <span class=\"nowrap\">Waardeversameling: y ∈ ℝ</span>" },
      ),
      esplain: { en: "This is the hardest-looking one on the card and the shortest to answer, which is exactly why it is here. There are two numbers, and neither of them changes a single thing you have been asked for. The 3 in front would be an amplitude on a sine or cosine, but a tangent has no highest or lowest point, so there is nothing for it to measure. The 30° inside the bracket slides the whole graph 30° to the right, and a sideways slide never changes a period, an amplitude or a range. The only number that matters is the invisible 1 multiplying the x, which gives a period of 180°. If you can look at an equation and say confidently which numbers are decoys, you are reading the form properly rather than pattern-matching.", af: "Hierdie een lyk die moeilikste op die kaart en is die vinnigste om te beantwoord, en dit is presies hoekom dit hier is. Daar is twee getalle, en nie een van hulle verander iets wat gevra word nie. Die 3 voor sou op 'n sin- of cos-grafiek 'n amplitude wees, maar 'n tan-grafiek het geen hoogste of laagste punt nie, dus is daar niks vir dit om te meet nie. Die 30° binne die hakie skuif die hele grafiek 30° na regs, en 'n skuif links of regs verander nooit 'n periode, 'n amplitude of 'n waardeversameling nie. Die enigste getal wat saak maak, is die onsigbare 1 wat die x vermenigvuldig, en dit gee 'n periode van 180°. As jy na 'n vergelyking kan kyk en met selfvertroue kan sê watter getalle lokvoëls is, lees jy die vorm reg in plaas van om net patrone na te boots." },
    },
  ],
};

export const tgraphPeriodAmplitudeRangeQuestions = [q1, q2, q3, q4, q5, q6];
