/* ============================================================
   EXAM FOCUS — Trig Graphs · LEVEL 4 ★ "the brave round"
   (SESSION E, 2026-08-23, EXAM-BUILD-DAY.md ruling 5)
   ------------------------------------------------------------
   Six cards, every one carrying at least one level-4 part, and no
   part below level 3 — the low achievers must never meet a ★ while
   drilling basics, so everything hard about trig graphs lives here
   and nowhere else in the chapter.

   WHAT MAKES A PART LEVEL 4 HERE: it is un-cued (nothing in the
   wording says which fact to use), it takes several linked steps, or
   it runs the ordinary question backwards. The six:

     q1  TWO unknown parameters read off a sketch whose only given
         point carries decimals — intercept spacing gives b, then the
         point gives a
     q2  the general solution of f(x) = g(x) is handed over and the
         CONSTANT has to be shown from it (2026-Q2.4's mould)
     q3  a shifted graph written in two equivalent forms, cosine and
         sine, and then used
     q4  an inequality over a window with a tangent ASYMPTOTE inside
         the answer, so one end is included and the other is not
     q5  the vertical gap between two graphs at a given x, then the
         MAXIMUM such gap — which needs amplitude reasoning, not a
         calculator
     q6  "for which values of k does y = k cut f exactly three times"
         — a counting argument over a window that is one and a half
         periods long

   Two-parameter wall respected on every curve (GR11-IEB-PAPER-BANK.md).
   No compound-angle or double-angle work anywhere: every crossing is
   either a special angle or given in the stem, because those formulae
   are Grade 12 (METHODS-trig.md Part P).
   ============================================================ */

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "level-4";

/* ===============================================================
   q1 — two unknowns off one sketch.
   f(x) = a sin bx cuts the x-axis at 0° and 90° and passes through
   A(22,5° ; 1,41)  ⇒  period 180°, b = 2, a = 2.
   =============================================================== */
const Q1_WIN = { xmin: -90, xmax: 180, ymin: -3, ymax: 3 };
const Q1_F = { fn: "sin", a: 2, b: 2, p: 0, q: 0, tone: "a", label: "f", labelAt: 155 };
const Q1_SPEC = {
  type: "trigg", win: Q1_WIN, xstep: 45, ystep: 1, w: 400, h: 300,
  curves: [Q1_F],
  points: [
    { x: 90, y: 0, on: 0, label: "(90° ; 0)", place: "above" },
    { x: 22.5, y: 1.41, on: 0, label: "A(22,5° ; 1,41)", place: "above" },
  ],
};

const q1 = {
  id: "tgraph.l4.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-two-unknown-parameters-off-a-sketch-from-an-intercept-and-a-decimal-point",
  lostQuest: { chapter: CH, quest: "tg6" },
  marks: 6,
  diagram: {
    spec: Q1_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          hmeasure: { x0: 0, x1: 180, y: 2, label: "period = 180°" },
          vmeasure: { x: 45, y0: -2, y1: 2 },
        },
      },
      b: { question: {}, reveal: { points: [{ x: 45, y: 2, on: 0, label: "(45° ; 2)", place: "above" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 4, level: 4,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = a sin bx, &nbsp;where a and b are constants and &nbsp;b &gt; 0. &nbsp;The graph cuts the x-axis at the origin and at (90° ; 0), and passes through the point A(22,5° ; 1,41).<br><br>Determine the value of a and the value of b." },
      hint: { en: "Two unknowns need two facts, and you have been given three. Start with the pair that does not involve a at all — two x-intercepts in a row tell you about width, and width is b's job." },
      memo: [
        { type: "step", text: { en: "Two x-intercepts in a row are HALF a period apart: &nbsp;90° − 0° = 90° = period ÷ 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴&nbsp; period = 180° &nbsp;and&nbsp; b = 360° ÷ 180° = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Now substitute A(22,5° ; 1,41) into &nbsp;f(x) = a sin 2x: &nbsp;&nbsp;a sin(2 × 22,5°) = 1,41" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a sin 45° = 1,41 &nbsp;⟹&nbsp; a(0,71) = 1,41 &nbsp;⟹&nbsp; a = <b>2</b> &nbsp;&nbsp;∴&nbsp; f(x) = 2 sin 2x" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: two x-intercepts NEXT TO EACH OTHER are half a period apart, not a whole one. Treating 90° as the full period gives b = 4 and a graph with twice as many waves as the sketch shows — always check your b against the picture by counting waves." } },
      ],
      esplain: { en: "When a sketch gives you more information than you need, choose the order that keeps the unknowns apart. Here two of the given facts are x-intercepts, and intercepts are about where the graph is, sideways, which makes them a b question with no a in sight. A sine graph crosses the axis twice per wave, so two crossings in a row are exactly half a period apart. Ninety degrees is half, so the period is 180°, and b is 360° divided by that, which is 2. Only now bring in the point A, because with b known it has just one unknown left in it. Put its x into the equation, work out the sine, and divide. The answer 1,41 is really √2, and sin 45° is really √2 over 2 — so the a comes out as exactly 2, and the decimals in the question were only there to hide that." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Write down the coordinates of the maximum turning point of f in the given interval." },
      hint: { en: "A sine graph reaches its maximum a quarter of a period after an upward crossing of the x-axis. You already know the period from (a)." },
      memo: [
        { type: "step", text: { en: "A quarter of a period is &nbsp;180° ÷ 4 = 45°, &nbsp;measured on from the upward crossing at the origin." }, ticks: ["ca"] },
        { type: "answer", text: { en: "The maximum value is a = 2 &nbsp;&nbsp;∴&nbsp; (45° ; 2)" }, ticks: ["ca"] },
      ],
      esplain: { en: "Turning points come from the rhythm of the graph, not from a calculator. A sine graph leaves the x-axis going up, reaches its highest point a quarter of a period later, comes back down through the axis at the halfway mark and bottoms out three quarters of the way through. Here the period is 180°, so a quarter is 45°, and the graph goes up through the origin, which puts the maximum at x = 45°. The height of a maximum is the midline plus the amplitude, and with a midline of 0 and an amplitude of 2 that is simply 2. Both ticks on this part are follow-through: if your a or b from part (a) had been slightly off, using them correctly here still earns the marks." },
    },
  ],
};

/* ===============================================================
   q2 — the general solution handed over, the constant shown from it.
   f(x) = a cos x, g(x) = sin x. f(x) = g(x) ⟹ tan x = a, and the
   given general solution x = 60° + k·180° forces a = tan 60° = √3.
   =============================================================== */
const Q2_WIN = { xmin: -180, xmax: 180, ymin: -2.5, ymax: 2.5 };
const Q2_SPEC = {
  type: "trigg", win: Q2_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: Math.sqrt(3), b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 180 },
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: 120 },
  ],
};

const q2 = {
  id: "tgraph.l4.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "given-the-general-solution-work-backwards-to-the-constant",
  lostQuest: { chapter: CH, quest: "tg7" },
  marks: 6,
  diagram: {
    spec: Q2_SPEC,
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 1.73, label: "y = √3" }] } },
      b: {
        question: {},
        reveal: {
          points: [
            { x: 60, y: 0.87, on: [0, 1], label: "(60° ; 0,87)", place: "above" },
            { x: -120, y: -0.87, on: [0, 1], label: "(−120° ; −0,87)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 4,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = a cos x&nbsp; and &nbsp;g(x) = sin x&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;where a is a constant. &nbsp;The general solution of &nbsp;f(x) = g(x)&nbsp; is &nbsp;x = 60° + k·180°, &nbsp;k ∈ ℤ.<br><br>Show that &nbsp;a = √3." },
      hint: { en: "Start by writing down what &nbsp;f(x) = g(x)&nbsp; actually says, then get all the trig onto one side. A cosine dividing a sine leaves you with something you can look up." },
      memo: [
        { type: "step", text: { en: "The graphs cut where &nbsp;f(x) = g(x): &nbsp;&nbsp;a cos x = sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide both sides by &nbsp;cos x: &nbsp;&nbsp;a = sin x ÷ cos x = tan x" }, ticks: ["a"] },
        { type: "answer", text: { en: "The general solution given is &nbsp;x = 60° + k·180°, &nbsp;so &nbsp;a = tan 60° = <b>√3</b>" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER why the general solution has a 180° in it rather than a 360°: it is a TANGENT equation, and a tangent repeats every 180°. That is also your clue that dividing by cos x is the right move — the answer's shape tells you which ratio you are heading for." } },
      ],
      esplain: { en: "This is the graphs question asked in reverse, and the trick is to stop looking at the picture and write the algebra down first. Two graphs cut where their equations are equal, so a cos x = sin x. Everything after that is ordinary Grade 11 trig: divide both sides by cos x, and the right-hand side becomes sin over cos, which is tan x. So a equals tan x at every crossing. Now use what you were given. The crossings are at 60° plus multiples of 180°, so putting the simplest one in gives a = tan 60°, which is √3 exactly from the special-angle triangles. Notice that every other crossing gives the same answer, because tan repeats every 180° — which is a good sanity check that the general solution and the equation really do fit together." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: "Hence determine the coordinates of the points where f and g cut each other for &nbsp;x ∈ [−180° ; 180°]. &nbsp;Give the y-coordinates correct to two decimal places." },
      hint: { en: "Run the general solution through the values of k that land inside the interval, then substitute each answer into the EASIER of the two equations." },
      memo: [
        { type: "step", text: { en: "k = 0: &nbsp;x = 60°. &nbsp;&nbsp;k = −1: &nbsp;x = 60° − 180° = −120°. &nbsp;&nbsp;k = 1 gives 240°, outside the interval." }, ticks: ["a"] },
        { type: "step", text: { en: "Substitute into &nbsp;g(x) = sin x: &nbsp;&nbsp;sin 60° = 0,87&nbsp; and &nbsp;sin(−120°) = −0,87" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "(60° ; 0,87) &nbsp;and&nbsp; (−120° ; −0,87)" }, ticks: ["a"] },
      ],
      esplain: { en: "A general solution is a recipe with a dial on it, and k is the dial. Turn it to 0, 1, −1, 2, −2 and so on, and each setting gives you one answer; keep the ones that land inside the interval you were asked about and throw away the rest. Here k = 0 gives 60° and k = −1 gives −120°, both inside, while k = 1 gives 240°, which is past the end. Then find the heights by substituting back — and pick the easier equation to substitute into. Here g is just sin x, so it is far less work than a cos x with a surd in it. Both graphs must give the same height at a crossing, so if you have time, checking one of them in the other equation is a free way to catch a slip." },
    },
  ],
};

/* ===============================================================
   q3 — one graph, two equivalent equations.
   f(x) = 2 cos x; g is f shifted 90° right, so
   g(x) = 2 cos(x − 90°) = 2 sin x, and f(x) = g(x) at x = 45° and
   x = −135°.
   =============================================================== */
const Q3_WIN = { xmin: -180, xmax: 180, ymin: -3, ymax: 3 };
const Q3_F = { fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: -20 };
const Q3_G = { fn: "cos", a: 2, b: 1, p: 90, q: 0, tone: "b", label: "g(x) = 2 sin x", labelAt: 120 };
const Q3_SPEC = { type: "trigg", win: Q3_WIN, xstep: 45, ystep: 1, w: 400, h: 300, curves: [Q3_F] };

const q3 = {
  id: "tgraph.l4.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "one-shifted-graph-written-in-two-equivalent-forms-then-used",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 6,
  diagram: {
    spec: Q3_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q3_G] } },
      b: {
        question: {},
        reveal: {
          curves: [Q3_G],
          points: [
            { x: 45, y: 1.41, on: [0, 1], label: "(45° ; 1,41)", place: "above" },
            { x: -135, y: -1.41, on: [0, 1], label: "(−135° ; −1,41)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 4,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 2 cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph of g is obtained by shifting f 90° to the RIGHT.<br><br>Write down the equation of g in the form &nbsp;y = a cos(x − p), &nbsp;and then write the equation of the same graph in the form &nbsp;y = a sin x." },
      hint: { en: "The first form is a straight shift. For the second, compare the shifted graph with a plain sine: where does each of them reach its maximum?" },
      memo: [
        { type: "step", text: { en: "A shift 90° to the right replaces x by &nbsp;x − 90°:" } },
        { type: "answer", text: { en: "g(x) = 2 cos(x − 90°)" }, ticks: ["a"] },
        { type: "step", text: { en: "The maximum of g is where the bracket is 0°, i.e. at &nbsp;x = 90° — and that is exactly where a plain sine graph has ITS maximum." }, ticks: ["a"] },
        { type: "answer", text: { en: "∴&nbsp; g(x) = 2 sin x &nbsp;&nbsp;<i>(the co-function fact &nbsp;cos(θ − 90°) = sin θ)</i>" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: two different-looking equations can be the SAME graph. Nothing has gone wrong when 2cos(x − 90°) turns into 2sin x — sine and cosine are the same wave, 90° apart, so every cosine graph can be written as a sine graph and the other way round." } },
      ],
      esplain: { en: "Two things are going on and it is worth separating them. The first is an ordinary shift: moving a graph 90° to the right replaces x with x − 90° inside the bracket, so g is 2cos(x − 90°). The second is a change of name, not a change of graph. A plain cosine has its maximum on the y-axis; shifting it 90° right puts that maximum at x = 90°, which is exactly where a plain sine peaks. Both graphs have the same amplitude and the same period, and they now agree on where their peaks are, so they are the identical curve. That means 2cos(x − 90°) and 2sin x describe the same picture, and you may use whichever is more convenient. This is the graph version of the co-function relationship you already know from reductions." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: "Hence determine the values of x in the interval for which &nbsp;f(x) = g(x)." },
      hint: { en: "Use the sine form from (a) — it makes the equation something you can divide. Getting sin over cos gives you a tangent." },
      memo: [
        { type: "step", text: { en: "f(x) = g(x): &nbsp;&nbsp;2 cos x = 2 sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide both sides by &nbsp;2 cos x: &nbsp;&nbsp;1 = tan x &nbsp;⟹&nbsp; tan x = 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "tan 45° = 1, &nbsp;and a tangent repeats every 180° &nbsp;∴&nbsp; x = 45° &nbsp;or&nbsp; x = −135°" }, ticks: ["a"] },
      ],
      esplain: { en: "The word hence is telling you that part (a) was the hard bit and this part is meant to be short. Using the sine form, the equation becomes 2cos x = 2sin x, which is something you can actually solve: divide both sides by 2cos x and it collapses to tan x = 1. From your special angles, tan 45° = 1, and because a tangent repeats every 180° the next solution going backwards is 45° − 180° = −135°. Both are inside the interval; the next one forward, 225°, is not. Check them on the sketch — the two curves really do cross once in the first quarter of the picture and once down in the bottom left, exactly where the algebra says." },
    },
  ],
};

/* ===============================================================
   q4 — an inequality with a tangent asymptote inside the answer.
   f(x) = tan x and the line y = 1 on [−180° ; 180°].
   tan x ≥ 1 on  −135° ≤ x < −90°  and  45° ≤ x < 90°:
   closed where the graphs meet, OPEN at the asymptote.
   =============================================================== */
const Q4_WIN = { xmin: -180, xmax: 180, ymin: -4, ymax: 4 };
const Q4_SPEC = {
  type: "trigg", win: Q4_WIN, xstep: 45, ystep: 1, w: 400, h: 300,
  curves: [{ fn: "tan", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 20 }],
  hlines: [{ y: 1, label: "y = 1" }],
  showAsym: true,
};

const q4 = {
  id: "tgraph.l4.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "tangent-inequality-with-an-asymptote-inside-the-solution",
  lostQuest: { chapter: CH, quest: "tg5" },
  marks: 6,
  diagram: {
    spec: Q4_SPEC,
    parts: {
      a: { question: {}, reveal: { vlines: [{ x: -90, label: "x = −90°" }, { x: 90, label: "x = 90°" }] } },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: -135, x1: -90 }, { x0: 45, x1: 90 }],
          vlines: [{ x: -135, label: "x = −135°" }, { x: 45, label: "x = 45°" }],
          points: [{ x: 45, y: 1, on: 0 }, { x: -135, y: 1, on: 0 }],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = tan x&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;together with the line &nbsp;y = 1&nbsp; (dashed).<br><br>Write down the equations of the asymptotes of f for &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "A tangent breaks where it is undefined, and that happens every 180° starting from 90°. Keep only the ones inside the interval." },
      memo: [
        { type: "step", text: { en: "tan x&nbsp; is undefined at &nbsp;90° + k·180°. &nbsp;Inside this interval that gives 90° and 90° − 180° = −90°." } },
        { type: "answer", text: { en: "x = −90° &nbsp;and&nbsp; x = 90°" }, ticks: ["a", "a"] },
      ],
      esplain: { en: "Finding the asymptotes first is not busywork here — the next part cannot be answered correctly without them. A tangent is undefined wherever the cosine underneath it is zero, and that happens at 90° and then every 180° in both directions. Inside this interval only two of them survive, at −90° and 90°, and they cut the picture into three branches. Write each answer as a vertical line, x equals a value, because a bare number does not describe a line and does not earn the mark." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Use the sketch to determine the values of x in the given interval for which &nbsp;tan x ≥ 1." },
      hint: { en: "Find where the tangent graph MEETS the line first, then read which stretches sit above it. Then look very carefully at what happens at each end of every stretch — one kind of end belongs in the answer and the other kind cannot." },
      memo: [
        { type: "step", text: { en: "The graph meets the line where &nbsp;tan x = 1, &nbsp;i.e. at &nbsp;x = 45°&nbsp; and &nbsp;x = 45° − 180° = −135°." }, ticks: ["a"] },
        { type: "step", text: { en: "On each branch the tangent rises, so it stays at or above the line from that meeting point until the branch runs into its asymptote." }, ticks: ["ca"] },
        { type: "answer", text: { en: "45° ≤ x &lt; 90°" }, ticks: ["a"] },
        { type: "answer", text: { en: "−135° ≤ x &lt; −90°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT — this is the whole point of the question. The meeting points ARE included, because there &nbsp;tan x = 1&nbsp; and the sign is ≥. The ASYMPTOTES are NOT included, because the graph does not exist at &nbsp;x = ±90°&nbsp; at all. So each piece of the answer has one closed end and one open end. Writing &nbsp;45° ≤ x ≤ 90°&nbsp; claims a value the function does not even have." },
        },
      ],
      esplain: { en: "This is her cut-line-and-paint method with one extra thing to watch. Start as usual: find where the two graphs meet, because those are the places where the answer can switch from true to false. Solving tan x = 1 gives 45°, and since a tangent repeats every 180°, also −135°. But on a tangent graph there is a second kind of boundary that the curves never actually touch: the asymptotes. Between a meeting point and the asymptote to its right, the tangent branch keeps climbing, so it stays above the line the whole way — that is the stretch you want. The subtle part is the brackets. Where the graphs meet, they are equal, and greater-than-or-equal includes equal, so that end is closed. At the asymptote the function has no value at all, so that end must be open. Two stretches, each with one closed and one open end." },
    },
  ],
};

/* ===============================================================
   q5 — the vertical gap between two graphs, then its maximum.
   f(x) = 2 cos x and g(x) = cos x − 3 on [−180° ; 180°].
   PQ(x) = f(x) − g(x) = cos x + 3, which is itself a cosine graph:
   amplitude 1 about a midline of 3, so the longest PQ is 4, at x = 0°.
   =============================================================== */
const Q5_WIN = { xmin: -180, xmax: 180, ymin: -5, ymax: 3 };
const Q5_SPEC = {
  type: "trigg", win: Q5_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 },
    { fn: "cos", a: 1, b: 1, p: 0, q: -3, tone: "b", label: "g", labelAt: 120 },
  ],
};

const q5 = {
  id: "tgraph.l4.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "length-of-the-vertical-segment-between-two-graphs-and-its-maximum",
  lostQuest: { chapter: CH, quest: "tg7" },
  marks: 6,
  diagram: {
    spec: Q5_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          vlines: [{ x: 60, label: "x = 60°" }],
          points: [
            { x: 60, y: 1, on: 0, label: "P(60° ; 1)", place: "above" },
            { x: 60, y: -2.5, on: 1, label: "Q(60° ; −2,5)" },
          ],
        },
      },
      b: {
        question: {},
        reveal: {
          points: [
            { x: 0, y: 2, on: 0, label: "(0 ; 2)", place: "above" },
            { x: 0, y: -2, on: 1, label: "(0 ; −2)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = 2 cos x&nbsp; and &nbsp;g(x) = cos x − 3&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;For any value of x in this interval, P is the point on f and Q is the point on g with that same x-value, so PQ is a vertical line segment.<br><br>Determine the length of PQ when &nbsp;x = 60°." },
      hint: { en: "A vertical length is the top y-value minus the bottom y-value. Work out each graph's height at 60° separately, then subtract." },
      memo: [
        { type: "step", text: { en: "f(60°) = 2 cos 60° = 2(½) = 1 &nbsp;&nbsp;and&nbsp;&nbsp; g(60°) = cos 60° − 3 = ½ − 3 = −2,5" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "PQ = 1 − (−2,5) = <b>3,5 units</b>" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: a LENGTH is never negative. Take the upper graph's height minus the lower one's, or take the size of the difference. Subtracting the other way round gives −3,5, which is not a length." } },
      ],
      esplain: { en: "A vertical segment between two graphs is just a difference in height, so the whole job is finding two heights and subtracting. Do them one at a time and write each one down. At 60°, cos 60° is a half from your special angles, so f is 2 times a half, which is 1, and g is a half minus 3, which is −2,5. The segment runs from −2,5 up to 1, and its length is the top minus the bottom: 1 minus −2,5, which is 3,5. Subtracting a negative is where the slips happen, so say it out loud — taking away minus two and a half is the same as adding two and a half. The picture agrees: P sits just above the x-axis and Q sits a good way below it." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Determine the maximum length of PQ in the given interval, and the value of x at which it occurs." },
      hint: { en: "Do not test values one at a time. Write PQ as a single expression in x — subtract one equation from the other and simplify — and then look at what kind of graph that expression is." },
      memo: [
        { type: "step", text: { en: "PQ = f(x) − g(x) = 2 cos x − (cos x − 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2 cos x − cos x + 3 = <b>cos x + 3</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "That is itself a cosine graph: amplitude 1 about a midline of 3, so its biggest value is &nbsp;3 + 1 = 4, &nbsp;reached when &nbsp;cos x = 1." }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos x = 1&nbsp; at &nbsp;x = 0°&nbsp; in this interval &nbsp;&nbsp;∴&nbsp; maximum PQ = <b>4 units</b>, at &nbsp;x = 0°" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: the maximum of the GAP is not the same as the maximum of either graph. f is highest at x = 0° and g is also highest at x = 0°, which is why they happen to agree here — but on most pairs they do not, and the only safe method is to build the difference expression first and then read its maximum." } },
      ],
      esplain: { en: "The move that turns this from guesswork into two lines of work is writing the gap as one expression. PQ is always the top graph minus the bottom one, so PQ = 2cos x − (cos x − 3). Open the bracket carefully — the minus reaches both terms — and it simplifies to cos x + 3. Now look at what you have: that is a cosine graph in its own right, with an amplitude of 1 and a midline of 3, so the gap itself rocks gently between 2 and 4 as x moves. Its biggest value is one amplitude above the midline, which is 4, and that happens when cos x is at its own maximum of 1, at x = 0°. No calculator, no trial and error, and the same method works for any pair of graphs you are asked to measure between." },
    },
  ],
};

/* ===============================================================
   q6 — "for which k does y = k cut f exactly three times".
   f(x) = 2 cos x on [0° ; 540°] — one and a half periods, which is
   what makes THREE possible. |k| > 2: no cuts. |k| = 2: two cuts.
   |k| < 2: three cuts.
   =============================================================== */
const Q6_WIN = { xmin: 0, xmax: 540, ymin: -3, ymax: 3 };
const Q6_SPEC = {
  type: "trigg", win: Q6_WIN, xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 450 }],
};

const q6 = {
  id: "tgraph.l4.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "for-which-k-does-the-line-y-equals-k-cut-the-graph-exactly-three-times",
  lostQuest: { chapter: CH, quest: "tg3" },
  marks: 6,
  diagram: {
    spec: Q6_SPEC,
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 2, label: "y = 2" }, { y: -2, label: "y = −2" }] } },
      b: {
        question: {},
        reveal: {
          hlines: [{ y: 2, label: "y = 2" }, { y: -2, label: "y = −2" }, { y: 1, label: "y = 1" }],
          points: [
            { x: 60, y: 1, on: 0 },
            { x: 300, y: 1, on: 0 },
            { x: 420, y: 1, on: 0 },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 2 cos x&nbsp; for &nbsp;x ∈ [0° ; 540°]. &nbsp;A horizontal line &nbsp;y = k&nbsp; is drawn across the same set of axes.<br><br>Write down the values of k for which the line &nbsp;y = k&nbsp; will NOT cut the graph of f at all." },
      hint: { en: "A horizontal line misses the graph when it is drawn at a height the graph never reaches. So start with the range of f." },
      memo: [
        { type: "step", text: { en: "The range of f is &nbsp;y ∈ [−2 ; 2], &nbsp;so f never reaches a height above 2 or below −2." }, ticks: ["a"] },
        { type: "answer", text: { en: "k &lt; −2 &nbsp;&nbsp;or&nbsp;&nbsp; k &gt; 2" }, ticks: ["a"] },
      ],
      esplain: { en: "Turning a picture question into a range question is the move that makes this easy. A horizontal line y = k is drawn at one fixed height, and the graph either reaches that height somewhere or it does not. Since f is a cosine with amplitude 2 about the x-axis, it visits every height from −2 to 2 and no others. So a line drawn higher than 2 or lower than −2 sails past the graph and never touches it. The edge cases matter: at exactly k = 2 or k = −2 the line touches the graph at its turning points, so those values do NOT belong in this answer — that is why the inequality signs are strict." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Determine the values of k for which the line &nbsp;y = k&nbsp; cuts the graph of f exactly THREE times in the given interval." },
      hint: { en: "The interval is 540° wide and the period is 360°, so the picture is one and a HALF waves. Try a line somewhere in the middle and count the crossings, then try one right at the top and count again." },
      memo: [
        { type: "step", text: { en: "The interval is 540° wide and the period is 360°, so the sketch shows one and a half waves — a full wave, then half of another." }, ticks: ["a"] },
        { type: "step", text: { en: "A horizontal line strictly between the top and the bottom cuts the first full wave TWICE and the extra half-wave ONCE: three cuts." }, ticks: ["ca"] },
        { type: "step", text: { en: "At &nbsp;k = 2&nbsp; the line only touches the two maximum points (x = 0° and x = 360°) — two cuts, not three. At &nbsp;k = −2&nbsp; the same happens at the two minimum points (x = 180° and x = 540°)." }, ticks: ["ca"] },
        { type: "answer", text: { en: "−2 &lt; k &lt; 2" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the two ENDS are the whole question. At k = 2 and k = −2 the count drops from three to two, so those values must be excluded — strict inequality signs both sides. Check the ends of any \"how many times\" answer separately; the boundary almost always behaves differently from the inside." },
        },
      ],
      esplain: { en: "The length of the interval is doing the work here, so read it before anything else. The period is 360° and the window is 540° wide, which is one and a half waves. Now imagine sliding a ruler up and down the picture. Held at a height strictly between the top and the bottom, the ruler crosses the first complete wave twice — once going down, once coming back up — and then crosses the leftover half-wave one more time, giving three. Slide it right to the top at k = 2 and the crossings collapse into the two peaks, so you only get two. Slide it right to the bottom at k = −2 and the same thing happens at the two troughs. Above or below those, nothing at all, which was part (a). So exactly three crossings happens for every k strictly between −2 and 2." },
    },
  ],
};

export const tgraphLevel4Questions = [q1, q2, q3, q4, q5, q6];
