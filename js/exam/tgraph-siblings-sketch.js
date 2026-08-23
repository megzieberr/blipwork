/* ============================================================
   EXAM FOCUS — Trig Graphs · SIBLING CARDS for the skill "sketch"
   (SESSION E, 2026-08-23, EXAM-BUILD-DAY.md)
   ------------------------------------------------------------
   "Sketch f(x) = … for x ∈ [−180° ; 180°], showing the intercepts
   with the axes, the turning points and the asymptotes." The archetype
   is in the bank twice over (survey/SURVEY-Topic-Banks.md §2 —
   2026-Q7's "draw both graphs on the grid provided", 2026-Q3's "sketch
   h"; her own Test 5 Q3's closing "sketch 2sinx + 1 and ½tan2x with all
   features labelled"). Fresh graphs, fresh windows.

   HOW THE FIGURE WORKS ON THIS TILE, and it is deliberate:

     · the SKETCH part's base spec is a CURVELESS pair of degree axes
       with a light grid — a blank sheet, exactly what the printed
       paper hands a learner — and its REVEAL draws the finished graph
       with every feature marked. Nothing is on the question side that
       the learner is being asked to produce;
     · a part that comes AFTER the sketch gets its OWN spec carrying
       the curve, because once the graph has been drawn the learner is
       entitled to work off it (js/exam/_schema.js: an entry's `spec`
       overrides the question's default);
     · a lead-in part that finds a feature BEFORE the sketch reveals
       only that feature, on the blank axes — the period as a span
       arrow, the asymptotes as captioned dashed verticals, the range
       as two captioned dashed horizontals. It never draws the curve,
       because the curve is the next part's answer.

   Two-parameter wall respected on every curve (GR11-IEB-PAPER-BANK.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "sketch";

/* a blank set of degree axes with a light grid — the "graph paper" a
   sketch question is answered on. */
const blank = (win, xstep, ystep) => ({
  type: "trigg", win, xstep, ystep, grid: true, curves: [], w: 400, h: 300,
});
/* the same axes with the curve(s) already drawn, for the parts that
   come after the sketch. */
const drawn = (win, xstep, ystep, curves) => ({
  type: "trigg", win, xstep, ystep, grid: true, curves, showAsym: true, w: 400, h: 300,
});

/* ===============================================================
   q1 — f(x) = 2 sin x on [−180° ; 180°].
   turning points (−90° ; −2) and (90° ; 2); x-intercepts at −180°,
   0° and 180°; y-intercept the origin.
   =============================================================== */
const Q1_WIN = { xmin: -180, xmax: 180, ymin: -3, ymax: 3 };
const Q1_F = { fn: "sin", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 135 };
const Q1_TPS = [
  { x: 90, y: 2, label: "(90° ; 2)", place: "above" },
  { x: -90, y: -2, label: "(−90° ; −2)" },
];

const q1 = {
  id: "tgraph.sib.sk.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-a-stretched-sine-showing-intercepts-and-turning-points",
  lostQuest: { chapter: CH, quest: "tg2" },
  marks: 5,
  diagram: {
    spec: blank(Q1_WIN, 90, 1),
    parts: {
      a: { question: {}, reveal: { points: Q1_TPS } },
      b: {
        question: {},
        reveal: {
          curves: [Q1_F],
          points: [
            { x: 0, y: 0, on: 0 },
            { x: 90, y: 2, on: 0, label: "(90° ; 2)", place: "above" },
            { x: -90, y: -2, on: 0, label: "(−90° ; −2)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 1,
      prompt: { en: "Consider the function &nbsp;f(x) = 2 sin x.<br><br>Write down the coordinates of the turning points of f for &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "A sine graph turns a quarter of a period after it starts, and again three quarters of the way through. The height of a turning point is the midline plus or minus the amplitude." },
      memo: [
        { type: "step", text: { en: "The period is 360°, so the turning points sit a quarter of a period either side of the origin: at x = 90° and x = −90°." } },
        { type: "answer", text: { en: "maximum (90° ; 2)" }, ticks: ["a"] },
        { type: "answer", text: { en: "minimum (−90° ; −2)" }, ticks: ["a"] },
      ],
      esplain: { en: "Turning points are the easiest features to place because a sine graph always turns in the same rhythm: it starts at the midline, reaches its highest point a quarter of a period later, comes back through the midline at the halfway mark, and reaches its lowest point three quarters of the way through. Here a quarter of 360° is 90°, so the maximum is at x = 90°. The interval also runs backwards from the origin, and the same rhythm applies going left, which puts a minimum at x = −90°. The heights are the amplitude above and below the midline, and with a midline of 0 and an amplitude of 2 that is 2 and −2. Working the x and the y separately like this is much safer than trying to picture the whole graph at once." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: "Sketch the graph of f for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the intercepts with the axes and the turning points." },
      hint: { en: "Plot the five landmarks first — the three x-intercepts and the two turning points — and only then join them with a smooth wave. Never join them with straight lines." },
      memo: [
        { type: "step", text: { en: "x-intercepts: the graph is on the midline at &nbsp;x = −180°, 0° and 180°." }, ticks: ["a"] },
        { type: "step", text: { en: "Turning points: maximum (90° ; 2) and minimum (−90° ; −2)." }, ticks: ["a"] },
        { type: "answer", text: { en: "Join them with one smooth wave, drawn to scale, with the endpoints of the interval reached and the axes labelled in degrees." }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: a sketch mark is a mark for the SHAPE, not for artistry. Stop the graph exactly at −180° and 180° — carrying it past the interval you were given loses the mark just as surely as leaving out a turning point does." } },
      ],
      esplain: { en: "A sketch question is a plotting question wearing a friendlier name, so do it in the same order every time. First mark the interval on the x-axis and put the ticks where the landmarks will be. Then plot the landmarks themselves: the places where the graph crosses the x-axis, and the turning points. Only then draw the curve through them, smoothly, with rounded tops rather than pointed ones. Two things earn the marks and both are easy to forget. Label the turning points with their coordinates rather than leaving bare dots, and stop at the ends of the interval you were given. If the amplitude is 2, make sure the top of your wave really is level with 2 on the y-axis — a sketch still has to be roughly to scale." },
    },
  ],
};

/* ===============================================================
   q2 — g(x) = cos 2x on [−180° ; 180°].
   period 180°; x-intercepts −135°, −45°, 45°, 135°; maxima at
   −180°, 0° and 180°; minima at −90° and 90°.
   =============================================================== */
const Q2_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 2 };
const Q2_G = { fn: "cos", a: 1, b: 2, p: 0, q: 0, tone: "a", label: "g", labelAt: -160 };

const q2 = {
  id: "tgraph.sib.sk.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-a-squashed-cosine-two-periods-in-the-window",
  lostQuest: { chapter: CH, quest: "tg2" },
  marks: 5,
  diagram: {
    spec: blank(Q2_WIN, 45, 1),
    parts: {
      a: { question: {}, reveal: { hmeasure: { x0: 0, x1: 180, y: 1, label: "period = 180°" } } },
      b: {
        question: {},
        reveal: {
          curves: [Q2_G],
          points: [
            { x: 0, y: 1, on: 0, label: "(0 ; 1)", place: "above" },
            { x: 45, y: 0, on: 0, label: "(45° ; 0)", place: "above" },
            { x: 90, y: -1, on: 0, label: "(90° ; −1)", place: "below" },
            { x: 135, y: 0, on: 0 },
            { x: -45, y: 0, on: 0 },
            { x: -90, y: -1, on: 0 },
            { x: -135, y: 0, on: 0 },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "Consider the function &nbsp;g(x) = cos 2x.<br><br>Write down the period of g." },
      hint: { en: "The 2 is multiplying the x, so it belongs to the period. Divide, do not multiply." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 2" } },
        { type: "answer", text: { en: "period = <b>180°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "Working the period out before you sketch is the single best habit on this tile, because the period tells you how many waves have to fit into the window. Here the period is 180°, and the window is 360° wide, so exactly two complete waves have to appear in your sketch. That is a check you can do with your eyes the moment you have drawn it: if you only see one wave, the 2 has been ignored, and if you see four, you have divided the wrong way round. It also spaces the landmarks for you — the turning points come every half period, which is 90°, and the x-intercepts come halfway between them." },
    },
    {
      id: "b", marks: 4, level: 2,
      prompt: { en: "Sketch the graph of g for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the intercepts with the axes and the turning points." },
      hint: { en: "Two complete waves have to fit. Start at the y-axis — a plain cosine begins at its maximum — then step across in quarter periods of 45° each: maximum, intercept, minimum, intercept, maximum." },
      memo: [
        { type: "step", text: { en: "The period is 180°, so a quarter period is 45° and the landmarks repeat every 45°." } },
        { type: "step", text: { en: "y-intercept (0 ; 1) — a cosine starts at its maximum." }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercepts: &nbsp;x = −135°, −45°, 45°, 135°" }, ticks: ["a"] },
        { type: "step", text: { en: "Minima at (−90° ; −1) and (90° ; −1); maxima at (−180° ; 1), (0 ; 1) and (180° ; 1)." }, ticks: ["a"] },
        { type: "answer", text: { en: "Two complete smooth waves across the interval, amplitude 1, drawn to scale." }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the 2 squashes the graph, it does not stretch it. If your sketch shows one long wave instead of two short ones, you have used 360° × 2 instead of 360° ÷ 2." } },
      ],
      esplain: { en: "The quarter-period walk is what makes a squashed graph easy to draw. Work out the period, quarter it, and then step across the axis marking one landmark at a time in the order a cosine always visits them: maximum, x-intercept, minimum, x-intercept, maximum. Here a quarter of 180° is 45°, so the landmarks land on 0°, 45°, 90°, 135°, 180° going right, and mirror onto the negative side going left. Because a cosine is symmetrical about the y-axis, the left half of your sketch is the mirror image of the right half, which halves the work and gives you a free check. The amplitude is untouched by the 2, so the wave still reaches only as high as 1 and as low as −1." },
    },
  ],
};

/* ===============================================================
   q3 — h(x) = tan x − 1 on [−180° ; 180°].
   asymptotes x = ±90°; y-intercept (0 ; −1); x-intercepts where
   tan x = 1, i.e. x = −135° and x = 45°.
   =============================================================== */
const Q3_WIN = { xmin: -180, xmax: 180, ymin: -5, ymax: 3 };
const Q3_H = { fn: "tan", a: 1, b: 1, p: 0, q: -1, tone: "a", label: "h", labelAt: 135 };
const Q3_ASYM = [{ x: -90, label: "x = −90°" }, { x: 90, label: "x = 90°" }];

const q3 = {
  id: "tgraph.sib.sk.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-a-shifted-tangent-showing-asymptotes-and-intercepts",
  lostQuest: { chapter: CH, quest: "tg5" },
  marks: 5,
  diagram: {
    spec: blank(Q3_WIN, 45, 1),
    parts: {
      a: { question: {}, reveal: { vlines: Q3_ASYM } },
      b: {
        question: {},
        reveal: {
          curves: [Q3_H],
          vlines: Q3_ASYM,
          points: [
            { x: 0, y: -1, on: 0 },
            { x: 45, y: 0, on: 0, label: "(45° ; 0)", place: "above" },
            { x: -135, y: 0, on: 0, label: "(−135° ; 0)", place: "above" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 1,
      prompt: { en: "Consider the function &nbsp;h(x) = tan x − 1.<br><br>Write down the equations of the asymptotes of h for &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "A tangent graph breaks where the plain tangent is undefined, and the − 1 does not move those places at all. Write each answer as a vertical line." },
      memo: [
        { type: "step", text: { en: "A tangent is undefined at 90° and at every 180° from there. The &nbsp;− 1&nbsp; only slides the graph down, so it does not move the asymptotes." } },
        { type: "answer", text: { en: "x = −90° &nbsp;and&nbsp; x = 90°" }, ticks: ["a", "a"] },
      ],
      esplain: { en: "The asymptotes of a tangent graph are decided entirely by what is inside the function. A plain tangent breaks at 90°, and then again every 180° after that, which puts breaks at −90° and 90° inside this interval. The − 1 is outside the tangent, so it moves every point of the graph one unit down — but sliding a picture downwards cannot move a vertical line sideways, so the asymptotes stay exactly where they were. That is the useful distinction: a number added or subtracted OUTSIDE never touches a vertical asymptote, while a number inside the bracket with the x slides it. Write each answer as x equals a value; a bare number does not describe a line." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: "Sketch the graph of h for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the asymptotes, the y-intercept and the x-intercepts." },
      hint: { en: "Draw the two dashed asymptotes first — they are the fence posts. Then plot where the graph cuts the y-axis, and where it cuts the x-axis (that is where tan x = 1)." },
      memo: [
        { type: "step", text: { en: "Draw the asymptotes &nbsp;x = −90°&nbsp; and &nbsp;x = 90°&nbsp; as dashed vertical lines." }, ticks: ["a"] },
        { type: "step", text: { en: "y-intercept: &nbsp;h(0) = tan 0° − 1 = −1 &nbsp;⟹&nbsp; (0 ; −1)" }, ticks: ["a"] },
        { type: "answer", text: { en: "x-intercepts: &nbsp;tan x − 1 = 0 &nbsp;⟹&nbsp; tan x = 1 &nbsp;⟹&nbsp; x = 45° &nbsp;and&nbsp; x = −135°. &nbsp;Three branches, each rising from its left asymptote to its right one." }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: a tangent graph never touches an asymptote and never crosses one. Each branch must be drawn as a separate piece of curve — joining them across an asymptote turns a tangent graph into something that does not exist." } },
      ],
      esplain: { en: "Sketching a tangent is a different job from sketching a sine, so use a different order. The asymptotes come first, dashed, because they divide the interval into the separate branches you are going to draw. Between −180° and 180° the two asymptotes at −90° and 90° cut the interval into three pieces, so your sketch will have three branches. Then plot the two kinds of intercept. The y-intercept is a straight substitution: put x = 0 in and get −1. The x-intercepts need you to solve tan x = 1, which is 45° from the special angles, and then 45° − 180° = −135° for the branch on the left. Every branch climbs from bottom left to top right, and none of them touches a dashed line." },
    },
  ],
};

/* ===============================================================
   q4 — f(x) = −3 cos x on [−180° ; 180°].
   amplitude 3; minimum (0 ; −3); maxima (−180° ; 3) and (180° ; 3);
   x-intercepts (−90° ; 0) and (90° ; 0).
   =============================================================== */
const Q4_WIN = { xmin: -180, xmax: 180, ymin: -4, ymax: 4 };
const Q4_F = { fn: "cos", a: -3, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 45 };

const q4 = {
  id: "tgraph.sib.sk.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-a-reflected-cosine-showing-intercepts-and-turning-points",
  lostQuest: { chapter: CH, quest: "tg2" },
  marks: 5,
  diagram: {
    spec: blank(Q4_WIN, 90, 1),
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 3, label: "y = 3" }, { y: -3, label: "y = −3" }] } },
      b: {
        question: {},
        reveal: {
          curves: [Q4_F],
          points: [
            { x: 0, y: -3, on: 0, label: "(0 ; −3)" },
            { x: 90, y: 0, on: 0, label: "(90° ; 0)", place: "above" },
            { x: -90, y: 0, on: 0, label: "(−90° ; 0)", place: "above" },
            { x: 180, y: 3, on: 0 },
            { x: -180, y: 3, on: 0 },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "Consider the function &nbsp;f(x) = −3 cos x.<br><br>Write down the amplitude of f." },
      hint: { en: "Amplitude is a distance, so it is never negative. Take the size of the number in front." },
      memo: [
        { type: "step", text: { en: "Amplitude = |a| = |−3|" } },
        { type: "answer", text: { en: "amplitude = <b>3</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "The number in front of the cos does two separate jobs, and only one of them is the amplitude. Its SIZE is the amplitude, so the graph swings 3 units above and 3 units below the midline. Its SIGN flips the graph upside down, which changes where the graph is high and where it is low but not how far it goes. So the answer here is 3, not −3. Getting this straight before you sketch matters, because it tells you two useful things at once: your wave has to reach 3 and −3 on the y-axis, and it has to start at the BOTTOM on the y-axis rather than the top, which is the opposite of a plain cosine." },
    },
    {
      id: "b", marks: 4, level: 2,
      prompt: { en: "Sketch the graph of f for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the intercepts with the axes and the turning points." },
      hint: { en: "A plain cosine starts at the top on the y-axis. The minus flips it, so this one starts at the bottom. Everything else about the rhythm stays the same." },
      memo: [
        { type: "step", text: { en: "The minus flips the cosine, so the y-axis value is a MINIMUM: &nbsp;f(0) = −3(1) = −3 &nbsp;⟹&nbsp; (0 ; −3)" }, ticks: ["a"] },
        { type: "step", text: { en: "x-intercepts: &nbsp;cos x = 0 &nbsp;⟹&nbsp; x = −90° and x = 90°" }, ticks: ["a"] },
        { type: "step", text: { en: "Maxima at the ends of the interval: &nbsp;(−180° ; 3) and (180° ; 3)" }, ticks: ["a"] },
        { type: "answer", text: { en: "One smooth wave, amplitude 3, starting and ending at the top and dipping to −3 on the y-axis." }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the minus does not move the x-intercepts. Wherever the plain cosine crossed the x-axis, the flipped one crosses it too — the graph passes through the same points, it just arrives at them going the other way." } },
      ],
      esplain: { en: "The quickest way to sketch a reflected graph is to sketch the plain one in your head first and then turn it over. A plain cosine starts at its maximum on the y-axis, falls to zero at 90°, drops to its minimum at 180° and comes back. Turning that upside down means this graph starts at its MINIMUM on the y-axis, rises to zero at 90° and reaches its maximum at 180°. The x-intercepts do not move at all, because a value of zero stays zero when you multiply it by −3. What does change is the height everywhere else, stretched to three times as far from the midline. Check your finished sketch against the y-axis: it should dip to −3 exactly where a plain cosine would have peaked." },
    },
  ],
};

/* ===============================================================
   q5 — f(x) = sin x + 2 on [−180° ; 180°]: the graph with NO
   x-intercepts. y-intercept (0 ; 2), maximum (90° ; 3), minimum
   (−90° ; 1).
   =============================================================== */
const Q5_WIN = { xmin: -180, xmax: 180, ymin: -1, ymax: 4 };
const Q5_F = { fn: "sin", a: 1, b: 1, p: 0, q: 2, tone: "a", label: "f", labelAt: 135 };

const q5 = {
  id: "tgraph.sib.sk.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-a-lifted-sine-and-explain-why-it-misses-the-x-axis",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 5,
  diagram: {
    spec: blank(Q5_WIN, 90, 1),
    parts: {
      a: {
        question: {},
        reveal: {
          curves: [Q5_F],
          midline: { y: 2 },
          points: [
            { x: 0, y: 2, on: 0, label: "(0 ; 2)" },
            { x: 90, y: 3, on: 0, label: "(90° ; 3)", place: "above" },
            { x: -90, y: 1, on: 0, label: "(−90° ; 1)" },
          ],
        },
      },
      b: {
        spec: { ...drawn(Q5_WIN, 90, 1, [Q5_F]), midline: { y: 2 } },
        question: {},
        reveal: { hlines: [{ y: 1, label: "lowest value y = 1" }] },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 2,
      prompt: { en: "Consider the function &nbsp;f(x) = sin x + 2.<br><br>Sketch the graph of f for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the turning points and the intercept with the y-axis." },
      hint: { en: "Draw the midline first — the + 2 tells you where it is — and then build the wave one amplitude above and below it." },
      memo: [
        { type: "step", text: { en: "The &nbsp;+ 2&nbsp; lifts the whole graph, so the midline is &nbsp;y = 2&nbsp; and the amplitude is 1." } },
        { type: "step", text: { en: "y-intercept: &nbsp;f(0) = sin 0° + 2 = 2 &nbsp;⟹&nbsp; (0 ; 2)" }, ticks: ["a"] },
        { type: "step", text: { en: "Maximum (90° ; 3) &nbsp;and&nbsp; minimum (−90° ; 1)." }, ticks: ["a"] },
        { type: "answer", text: { en: "One smooth wave rocking about &nbsp;y = 2, &nbsp;from 1 up to 3, across the whole interval." }, ticks: ["a"] },
      ],
      esplain: { en: "Whenever a number is added on the end, draw the midline before you draw anything else. It is a faint horizontal line at y = 2 here, and once it is on the page the rest of the sketch is exactly the plain sine graph you already know, just measured from that line instead of from the x-axis. Start on the midline at the y-axis, rise one amplitude to a maximum at 90°, come back to the midline at 180°, and mirror the same rhythm going left to a minimum at −90°. The amplitude is 1, so the top of the wave is at 3 and the bottom is at 1. Learners who skip the midline usually end up drawing the wave about the x-axis and then trying to shift it afterwards, which is where the mistakes creep in." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Explain why the graph of f has no x-intercepts." },
      hint: { en: "An x-intercept happens where y = 0. Ask yourself what the smallest value f can ever take is, and compare it with 0." },
      memo: [
        { type: "step", text: { en: "The smallest value of &nbsp;sin x&nbsp; is −1, so the smallest value of f is &nbsp;−1 + 2 = 1." }, ticks: ["a"] },
        { type: "answer", text: { en: "The range is &nbsp;y ∈ [1 ; 3], &nbsp;so f never reaches 0 — the whole graph lies above the x-axis, and therefore it has no x-intercepts." }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: \"explain\" wants a REASON, not a drawing. Saying \"because the graph does not touch the x-axis\" just repeats the question. The reason is that the lowest value the function can take is 1, and 1 is above 0." } },
      ],
      esplain: { en: "An x-intercept is a place where the output of the function is zero, so the question is really asking whether f can ever equal 0. The largest and smallest values of sin x are 1 and −1, and that never changes no matter what x you feed it. Adding 2 pushes those two extremes up to 3 and 1, so the whole function is trapped between 1 and 3. Zero is not in that interval, so there is no x that makes f equal zero, and the graph never crosses the axis. Writing the range down is the cleanest way to say all of that in one line. This kind of argument comes up again and again in trig — the fact that sine and cosine are locked between −1 and 1 is what makes equations like sin x = 2 impossible." },
    },
  ],
};

/* ===============================================================
   q6 — TWO graphs on one set of axes: f(x) = sin 2x and g(x) = cos x
   on [−180° ; 180°]. They cut each other at x = −90°, 30°, 90° and
   150°, so the equation sin 2x = cos x has FOUR solutions there —
   counted off the sketch, which is the only Grade 11 route (the
   double-angle formula is Grade 12).
   =============================================================== */
const Q6_WIN = { xmin: -180, xmax: 180, ymin: -2, ymax: 2 };
const Q6_F = { fn: "sin", a: 1, b: 2, p: 0, q: 0, tone: "a", label: "f", labelAt: -135 };
const Q6_G = { fn: "cos", a: 1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: -160 };
const Q6_CUTS = [
  { x: -90, y: 0, on: [0, 1] },
  { x: 30, y: 0.87, on: [0, 1] },
  { x: 90, y: 0, on: [0, 1] },
  { x: 150, y: -0.87, on: [0, 1] },
];

const q6 = {
  id: "tgraph.sib.sk.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "sketch-two-trig-graphs-together-then-count-the-crossings",
  lostQuest: { chapter: CH, quest: "tg7" },
  marks: 6,
  diagram: {
    spec: blank(Q6_WIN, 90, 1),
    parts: {
      a: {
        question: {},
        reveal: {
          curves: [Q6_F, Q6_G],
          points: [
            { x: 45, y: 1, on: 0, label: "(45° ; 1)", place: "above" },
            { x: 135, y: -1, on: 0, label: "(135° ; −1)" },
            { x: 0, y: 1, on: 1, label: "(0 ; 1)", place: "below" },
            { x: 90, y: 0, on: [0, 1] },
            { x: -90, y: 0, on: [0, 1] },
          ],
        },
      },
      b: {
        spec: drawn(Q6_WIN, 90, 1, [Q6_F, Q6_G]),
        question: {},
        reveal: { points: Q6_CUTS },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 4, level: 3,
      prompt: { en: "Consider the functions &nbsp;f(x) = sin 2x&nbsp; and &nbsp;g(x) = cos x.<br><br>On the same set of axes, sketch the graphs of f and g for &nbsp;x ∈ [−180° ; 180°], &nbsp;clearly showing the intercepts with the axes and the turning points of each graph. Label each graph." },
      hint: { en: "Work out each graph's period first, so you know how many waves of each have to fit. Then draw them one at a time, and label them — an unlabelled pair of curves cannot be marked." },
      memo: [
        { type: "step", text: { en: "f: &nbsp;period = 360° ÷ 2 = 180°, &nbsp;so TWO complete waves fit the interval. x-intercepts at −180°, −90°, 0°, 90°, 180°; maximum (45° ; 1); minimum (135° ; −1) — and their mirror images on the left." }, ticks: ["a", "a"] },
        { type: "step", text: { en: "g: &nbsp;period = 360°, &nbsp;so ONE complete wave fits. Maximum (0 ; 1); minima at (−180° ; −1) and (180° ; −1); x-intercepts at −90° and 90°." }, ticks: ["a"] },
        { type: "answer", text: { en: "Both curves drawn to the same scale on one set of axes, each one labelled f or g." }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the two graphs must be to the SAME scale on the SAME axes. Drawing f small and g large, or forgetting the labels, throws away marks even when both shapes are right — and it makes the next part impossible to answer." } },
      ],
      esplain: { en: "Two graphs on one set of axes is really two separate sketching jobs plus one piece of care. Do the jobs one at a time. Work out f's period, which is 180°, so two waves fit; find its landmarks by quartering that period; draw it and label it. Then do the same for g, whose period is the plain 360°, so only one wave fits. The piece of care is the scale: both curves must be measured against the same y-axis, otherwise the picture stops telling the truth about where they cross, and crossings are almost always what the next part asks about. Labelling matters for the same reason — a question about f is unanswerable if the marker cannot tell which curve you meant. Notice both graphs happen to pass through the x-axis at −90° and 90°, which is a real feature and not a drawing error." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Use your sketch to write down the number of solutions of &nbsp;sin 2x = cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "Two graphs are equal exactly where they cut each other. You do not have to solve anything — count the crossings on your own sketch." },
      memo: [
        { type: "step", text: { en: "sin 2x = cos x&nbsp; means &nbsp;f(x) = g(x), &nbsp;which happens wherever the two curves cut each other." }, ticks: ["a"] },
        { type: "answer", text: { en: "The curves cut at four places in the interval &nbsp;∴&nbsp; there are <b>4</b> solutions." }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: a point where the two graphs merely touch the x-axis at the same moment still counts as a crossing — at x = −90° and x = 90° both graphs are at zero, so they really are equal there. Count every place the curves meet, not only the obvious ones." } },
      ],
      esplain: { en: "Whenever a question asks how many solutions an equation has and you have both graphs in front of you, the answer is a counting job rather than an algebra job. Two functions are equal exactly where their graphs meet, so every crossing point is one solution and there are no others. On this pair there are four: two of them are the places where both curves pass through zero together, at −90° and 90°, and the other two are ordinary crossings, one on each side of 90°. Do not try to solve this equation algebraically — turning sin 2x into something you can work with needs the double-angle formula, which is Grade 12 work. Reading the answer off an honest, to-scale sketch is the intended method here." },
    },
  ],
};

export const tgraphSketchQuestions = [q1, q2, q3, q4, q5, q6];
