/* ============================================================
   EXAM FOCUS — HARNESS-ONLY stub question. NOT a real seeded question.
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21.)
   ------------------------------------------------------------
   Proves the exam-focus infrastructure loop (part-by-part reveal, the
   colour-memo renderer, ★ level-4 handling, EN/AF, the local-backend
   round-trip, XP/gold pay-once) end to end before a real paper-build
   session seeds real content (js/quests/dice-stub.js is the same idea
   for the 🎲 dice — see its header).

   ⚠️ DELIBERATELY NOT REGISTERED in js/exam/index.js's REGISTRY — a
   stub must stay unreachable through normal navigation even once a
   chapter's real questions land. Only verify-exam.html imports this
   file, and it drives js/exam-play.js's renderExamPlay() directly with
   these objects (mirrors verify-dice.html's makeHarness(), which drives
   the real renderPlay() with a fake `dice` object rather than going
   through app routing). THE SAME RULE APPLIES to the two DIAGRAM stubs
   added 2026-08-23 (stubTrigQuestion / stubQuadTriQuestion, at the foot
   of this file) — three exports now, none of them registered, ever.

   Freshly composed content (public repo — never verbatim IEB/vendor
   text), Grade 11 Statistics, no Euclidean geometry. Exercises every
   memo block type (step/answer/trap), all four levels (so the ★ badge
   is checkable on exactly one part), and a chain where (b)/(c)/(d) each
   read an earlier part's revealed answer — the "sub-answers later parts
   reuse" chain-visibility rule.
   ============================================================ */
export const stubQuestion = {
  id: "harness.stub.q1",
  chapter: "stats",
  topic: "harness-stub",
  archetype: "HARNESS_ONLY_FIXTURE",
  // structural fixture only (schema requires lostQuest — session E,
  // 2026-08-21); q2 "Centre & spread" is real and DEFAULT_OPEN in local
  // mode, so a harness driving this stub can exercise the "I'm lost"
  // link's routing without needing a real seeded-content match.
  lostQuest: { chapter: "stats", quest: "q2" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: `The five reaction times below (in seconds) were recorded for one learner:<br><span class="num">0,42 ; 0,38 ; 0,51 ; 0,45 ; 0,39</span><br>Write down the number of data values, n.`,
        af: `Die vyf reaksietye hieronder (in sekondes) is vir een leerder aangeteken:<br><span class="num">0,42 ; 0,38 ; 0,51 ; 0,45 ; 0,39</span><br>Skryf die aantal datawaardes, n, neer.`,
      },
      hint: {
        en: "Count every value in the list — that count IS n.",
        af: "Tel elke waarde in die lys — daardie telling IS n.",
      },
      memo: [
        { type: "step", text: { en: "n = the number of values in the list", af: "n = die aantal waardes in die lys" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "n = 5", af: "n = 5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "n just means 'how many'. You're not calculating anything here — you're counting the values you were given, once each.",
        af: "n beteken net 'hoeveel'. Jy bereken niks hier nie — jy tel net die waardes wat jy gekry het, elkeen een keer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Calculate the mean reaction time, correct to 2 decimal places.",
        af: "Bereken die gemiddelde reaksietyd, korrek tot 2 desimale plekke.",
      },
      hint: {
        en: "Add every value, then divide by n from (a).",
        af: "Tel elke waarde bymekaar, en deel dan deur n van (a).",
      },
      memo: [
        { type: "step", text: { en: "sum = 0,42 + 0,38 + 0,51 + 0,45 + 0,39 = 2,15", af: "som = 0,42 + 0,38 + 0,51 + 0,45 + 0,39 = 2,15" }, ticks: ["s/f"] },
        { type: "step", text: { en: "mean = 2,15 ÷ n = 2,15 ÷ 5", af: "gemiddeld = 2,15 ÷ n = 2,15 ÷ 5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "mean = 0,43 s", af: "gemiddeld = 0,43 s" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Mean = add everything up, then share it out evenly over how many values there were. That's literally what ÷ n does — it's the 'if everyone got the same time' number.",
        af: "Gemiddeld = tel alles bymekaar, en deel dit dan gelyk uit oor hoeveel waardes daar was. Dit is letterlik wat ÷ n doen — dit is die 'as elkeen dieselfde tyd gekry het' getal.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "One more time, 0,90 s, is added to the data set. State, without further calculation, whether the mean from (b) will increase, decrease or stay the same, and explain why.",
        af: "Nog een tyd, 0,90 s, word by die datastel gevoeg. Sê, sonder verdere berekening, of die gemiddeld van (b) sal toeneem, afneem of dieselfde bly, en verduidelik hoekom.",
      },
      hint: {
        en: "Compare the new value to the mean you already found — is it bigger or smaller?",
        af: "Vergelyk die nuwe waarde met die gemiddeld wat jy reeds gekry het — is dit groter of kleiner?",
      },
      memo: [
        { type: "step", text: { en: "compare 0,90 s to the mean from (b), 0,43 s", af: "vergelyk 0,90 s met die gemiddeld van (b), 0,43 s" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0,90 s is bigger than the mean, so adding it will INCREASE the mean", af: "0,90 s is groter as die gemiddeld, dus sal dit die gemiddeld LAAT TOENEEM" }, ticks: ["a", "ca"] },
        { type: "trap", text: {
          en: "REMEMBER: a new value only pulls the mean UP if it's bigger than the CURRENT mean — check that first, ten seconds, and the direction of your answer is safe.",
          af: "ONTHOU: 'n nuwe waarde trek die gemiddeld net OP as dit groter is as die HUIDIGE gemiddeld — kyk eers daarna, tien sekondes, en die rigting van jou antwoord is veilig.",
        } },
      ],
      esplain: {
        en: "You never need to redo the whole sum for this kind of question. One new value either pulls the average toward itself or away from it — just ask 'is the new one above or below where the average already sits?'",
        af: "Jy hoef nooit die hele som oor te doen vir hierdie tipe vraag nie. Een nuwe waarde trek die gemiddeld óf na homself toe óf weg daarvan — vra net 'is die nuwe een bo of onder waar die gemiddeld reeds is?'",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 4,
      prompt: {
        en: "The standard deviation of the ORIGINAL 5 values (before (c)'s extra time was added) is 0,053 s. Using your answers to (a) and (b), determine how many of the original 5 values lie within one standard deviation of the mean. Show your reasoning.",
        af: "Die standaardafwyking van die OORSPRONKLIKE 5 waardes (voor (c) se ekstra tyd bygevoeg is) is 0,053 s. Gebruik jou antwoorde vir (a) en (b) om te bepaal hoeveel van die oorspronklike 5 waardes binne een standaardafwyking van die gemiddeld lê. Toon jou redenasie.",
      },
      hint: {
        en: "Find the interval [mean − sd ; mean + sd] first, then count how many of the 5 original values fall inside it.",
        af: "Vind eers die interval [gemiddeld − sa ; gemiddeld + sa], en tel dan hoeveel van die 5 oorspronklike waardes daarbinne val.",
      },
      memo: [
        { type: "step", text: { en: "interval = 0,43 − 0,053 to 0,43 + 0,053", af: "interval = 0,43 − 0,053 tot 0,43 + 0,053" }, ticks: ["s/f", "ca"] },
        { type: "step", text: { en: "interval ≈ 0,377 s to 0,483 s", af: "interval ≈ 0,377 s tot 0,483 s" }, ticks: ["ca"] },
        { type: "answer", text: { en: "0,38 ; 0,39 ; 0,42 and 0,45 fall inside it — 4 of the 5 values", af: "0,38 ; 0,39 ; 0,42 en 0,45 val daarbinne — 4 van die 5 waardes" }, ticks: ["a"] },
      ],
      esplain: {
        en: "'Within one standard deviation' just means inside a window centred on the mean, one sd wide on each side. Build the window first (mean ± sd), THEN go back to the original list and count who's inside it.",
        af: "'Binne een standaardafwyking' beteken net binne 'n venster wat op die gemiddeld gesentreer is, een sa breed aan elke kant. Bou eers die venster (gemiddeld ± sa), gaan dán terug na die oorspronklike lys en tel wie daarbinne is.",
      },
    },
  ],
};

/* ============================================================
   DIAGRAM STUBS (EXAM-BUILD-DAY.md, session 0 plumbing, 2026-08-23).
   ------------------------------------------------------------
   The exam diagram slot learned two more engines on the build day —
   js/engine/trig-graph.js ("trigg") and js/engine/quadrant-triangle.js
   ("quadtri") — through the glue modules js/exam/trig-diagram.js and
   js/exam/quadtri-diagram.js. These two stub cards exercise BOTH ends of
   each: the validator (js/exam/_schema.js runs every highlighted variant
   back through the engine that drew it) and the player
   (js/exam-play.js's partDiagram routes on spec.type).

   Same rule as stubQuestion above: NEVER registered, never reachable.
   verify-exam.html Part 14 is the only thing that imports them.
   ============================================================ */

/* ---- 1. TRIG GRAPH ----------------------------------------------
   f(x) = 2 sin x  and  g(x) = cos(x − 30°) on [−180°; 180°].
   The two really do cross at (−150°; −1) and (30°; 1) — check for
   yourself: 2 sin x = cos x cos 30° + sin x sin 30° gives
   1,5 sin x = (√3/2) cos x, i.e. tan x = 1/√3, i.e. x = 30° or −150°.
   So f < g strictly between those two, which is the strip part (b)'s
   reveal paints.

   What each highlight is here to prove:
     (a) question `bare: true`  — the base spec's own marked point A is
         stripped, because (a)'s whole job is FINDING it;
         reveal        — the point comes back, labelled with its
                         coordinates: the reveal draws what it found.
     (b) question `{}`          — A is a given now, so it shows;
         reveal        — the shaded strip plus BOTH captioned dashed
                         boundary lines, her cut-line-and-paint method.
   ------------------------------------------------------------------ */
const TRIG_SPEC = {
  type: "trigg",
  win: { xmin: -180, xmax: 180, ymin: -2.5, ymax: 2.5 },
  xstep: 30, ystep: 1, grid: true,
  curves: [
    { fn: "sin", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 },
    /* labelAt 0, not −60: at −60 the g label sat right on the x-axis and
       collided with the "−60°" tick label (seen on the rendered crop).
       At 0 the curve is 0,87 up, in clear air. Worth knowing when you
       compose a real trigg card: this engine has NO label placer — you
       choose labelAt yourself and then LOOK at the crop. */
    { fn: "cos", a: 1, b: 1, p: 30, q: 0, tone: "b", label: "g", labelAt: 0 },
  ],
  points: [{ x: 30, y: 1, label: "A", on: [0, 1], place: "above" }],
  w: 400, h: 300,
};

export const stubTrigQuestion = {
  id: "harness.stub.trigg",
  chapter: "tgraph",
  topic: "harness-stub-trigg",
  archetype: "HARNESS_ONLY_FIXTURE",
  lostQuest: { chapter: "tgraph", quest: "tg7" },
  marks: 5,
  diagram: {
    spec: TRIG_SPEC,
    parts: {
      a: {
        question: { bare: true },
        reveal: { bare: true, points: [{ x: 30, y: 1, label: "A(30° ; 1)", on: [0, 1], place: "above" }] },
      },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: -150, x1: 30 }],
          vlines: [{ x: -150, label: "x = −150°" }, { x: 30, label: "x = 30°" }],
        },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows &nbsp;f(x) = 2 sin x&nbsp; and &nbsp;g(x) = cos(x − 30°)&nbsp; for &nbsp;x ∈ [−180° ; 180°].<br><br>The graphs cut each other at a point A with a positive x-value. Determine the coordinates of A.",
      },
      hint: {
        en: "Where the graphs cut, f(x) = g(x). Expand cos(x − 30°) with the compound-angle form, gather the sin x terms on one side and the cos x terms on the other, and you are left with a tan x you can read off.",
      },
      memo: [
        { type: "step", text: { en: "2 sin x = cos x cos 30° + sin x sin 30° &nbsp;&nbsp;<i>(the graphs cut where f = g)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "tan x = 1/√3 &nbsp;∴&nbsp; x = 30° &nbsp;and&nbsp; y = 2 sin 30° = 1 &nbsp;∴&nbsp; A(30° ; 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two graphs cut where their y-values are the same, so the whole job is solving f(x) = g(x). Everything after that is ordinary trig: open the bracket, collect the sines on one side and the cosines on the other, divide, and you have a tangent. Read the angle off, then put it back into EITHER graph to get the height — both must give you the same answer, which is a free check.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence use the sketch to write down the values of x for which &nbsp;f(x) &lt; g(x)&nbsp; in the given interval.",
      },
      hint: {
        en: "Cut the picture at every crossing point first, then look at each strip in turn and ask which graph is on top there.",
      },
      memo: [
        { type: "step", text: { en: "The graphs cut at &nbsp;x = −150°&nbsp; and &nbsp;x = 30°&nbsp; — cut lines there." }, ticks: ["ca"] },
        { type: "step", text: { en: "Between those cuts the g graph is the higher one." }, ticks: ["ca"] },
        { type: "answer", text: { en: "−150° &lt; x &lt; 30°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the question asks where f is BELOW g, so read the strip where the f curve sits underneath. Reading the wrong graph gives you the two outside strips instead — the exact opposite answer.",
        } },
      ],
      esplain: {
        en: "This is her cut-line-and-paint method on a trig picture. Draw a light vertical line through every crossing point, which chops the interval into strips, then walk the strips one at a time and ask a single question in each: which curve is on top here? You never calculate anything — you read. The answer is the strip (or strips) where the one you were asked about is the lower curve, written as an inequality in x.",
      },
    },
  ],
};

/* ---- 2. QUADRANT TRIANGLE ---------------------------------------
   The 3-4-5 triangle in the third quadrant: x = −3, y = −4, θ marked
   from the positive x-axis anticlockwise round to OT.

   (a) reveal turns ON the acute reference-angle arc (a switch, not an
       array — the one highlight set in the tab that OVERRIDES fields);
   (b) reveal REPLACES the labels wholesale so r = 5 appears on the
       hypotenuse. verifyQuadTri then proves that 5 really is the length
       drawn, so the reveal cannot label a hypotenuse it did not draw.
   ------------------------------------------------------------------ */
const QUADTRI_SPEC = {
  type: "quadtri",
  x: -3, y: -4,
  labels: { x: "−3", y: "−4" },
  letters: { r: "r" },
  theta: true, thetaLabel: "θ",
  w: 300, h: 300,
};

export const stubQuadTriQuestion = {
  id: "harness.stub.quadtri",
  chapter: "gtrig",
  topic: "harness-stub-quadtri",
  archetype: "HARNESS_ONLY_FIXTURE",
  lostQuest: { chapter: "gtrig", quest: "gt8" },
  marks: 3,
  diagram: {
    spec: QUADTRI_SPEC,
    parts: {
      a: {
        question: {},
        reveal: { refAngle: true, refLabel: "β" },
      },
      b: {
        question: {},
        reveal: { labels: { x: "−3", y: "−4", r: "5" } },
      },
    },
  },
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "P(−3 ; −4) is a point on the terminal arm of θ, as shown.<br><br>Write down the quadrant in which θ lies.",
      },
      hint: {
        en: "Look at the two signs. A negative x sends you left of the y-axis, a negative y sends you down below the x-axis — then count the quadrants round anticlockwise from the positive x-axis.",
      },
      memo: [
        { type: "answer", text: { en: "Both x and y are negative, so P lies in the <b>third quadrant</b>." }, ticks: ["a"] },
      ],
      esplain: {
        en: "The quadrants are numbered anticlockwise starting from the top right, so the third one is bottom left — the corner where both coordinates are negative. That is all this part asks, and it is worth doing first every time, because the quadrant is what decides the sign of every ratio you are about to work out.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Calculate the length of OP.",
      },
      hint: {
        en: "OP is the hypotenuse of the right-angled triangle in the sketch, and you know both legs. Lengths are never negative.",
      },
      memo: [
        { type: "step", text: { en: "r² = x² + y² = (−3)² + (−4)² = 9 + 16 = 25 &nbsp;&nbsp;<i>(Pythagoras)</i>" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "r = 5 &nbsp;&nbsp;∴&nbsp; OP = 5 units" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: r is a LENGTH, so it is always positive — even when both legs are negative. Squaring wipes the signs out before you ever take the root.",
        } },
      ],
      esplain: {
        en: "The sketch is just Pythagoras wearing a trig hat. The two legs are the x and y you were handed, the hypotenuse is the line from the origin out to the point, and squaring both legs removes their signs before you add. That is why r never comes out negative no matter which quadrant the point sits in — and it is the number every one of sin θ, cos θ and tan θ is about to be built from.",
      },
    },
  ],
};
