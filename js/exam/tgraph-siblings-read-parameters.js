/* ============================================================
   EXAM FOCUS — Trig Graphs · SIBLING CARDS for the skill
   "read-parameters"   (SESSION E, 2026-08-23, EXAM-BUILD-DAY.md)
   ------------------------------------------------------------
   The other half of tile 1. There the equation was given and the
   picture withheld; here the PICTURE is given, with the labelled
   points a real paper would print, and the parameters have to be read
   back out of it.

   ARCHETYPES, from the paper bank (survey/SURVEY-Topic-Banks.md §2 —
   2025-Q6 "find a, b, p", 2026-Q6 "find a and b", 2026-Q10 "find a, b
   and p"; SURVEY-Nov-P2.md's closing graph item "equations of both
   graphs"; her own Test 5 Q3 "values of a and b"). Fresh numbers and
   fresh windows throughout — bank archetypes only, never bank text.

   THE TWO-UNKNOWN RULE the brief sets: never more than two unknown
   parameters on one curve, which is also the Grade 11 scope wall
   ("trig graphs … max two parameters varied", GR11-IEB-PAPER-BANK.md).
   Every curve below varies at most two of a, b, p, q.

   THE FIGURES. The question side carries the curve and the given
   labelled points — a peak, a trough, an intercept — captioned, so
   nothing has to be guessed at. Each part's REVEAL draws the thing
   that part found: an amplitude as a trough-to-peak arrow, a period as
   a span arrow, a shift as a captioned dashed vertical, a range as the
   two dashed horizontals it lies between, a turning point as a dot
   carrying its coordinates. q6 uses the bare-figure rule for exactly
   one part: P is on the picture as a plain letter while its
   coordinates are what is being asked for, and only its own reveal
   writes them on.
   ============================================================ */

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "read-parameters";
const LOST = { chapter: CH, quest: "tg6" };

/* ===============================================================
   q1 — the plain read-off opener. f(x) = 3 cos 2x on [−180° ; 180°],
   with the x-intercept (45° ; 0) and the minimum (90° ; −3) marked.
   amplitude 3 · period 180° · range [−3 ; 3].
   =============================================================== */
const Q1_F = { fn: "cos", a: 3, b: 2, p: 0, q: 0 };
const Q1_SPEC = {
  type: "trigg",
  win: { xmin: -180, xmax: 180, ymin: -4, ymax: 4 },
  xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ ...Q1_F, tone: "a", label: "f", labelAt: -135 }],
  points: [
    { x: 45, y: 0, on: 0, label: "(45° ; 0)", place: "above" },
    { x: 90, y: -3, on: 0, label: "(90° ; −3)" },
  ],
};

const q1 = {
  id: "tgraph.sib.rp.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-amplitude-period-range-off-a-cosine-sketch",
  lostQuest: LOST,
  marks: 3,
  diagram: {
    spec: Q1_SPEC,
    parts: {
      a: { question: {}, reveal: { vmeasure: { x: 90, y0: -3, y1: 3 } } },
      b: { question: {}, reveal: { hmeasure: { x0: 0, x1: 180, y: 3, label: "period = 180°" } } },
      c: { question: {}, reveal: { hlines: [{ y: 3, label: "y = 3" }, { y: -3, label: "y = −3" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;f&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph cuts the x-axis at (45° ; 0) and has a minimum turning point at (90° ; −3).<br><br>Write down the amplitude of f." },
      hint: { en: "Amplitude is how far the graph swings away from its middle line. This graph is centred on the x-axis, so measure from there to the turning point." },
      memo: [
        { type: "step", text: { en: "The graph rocks about the x-axis (y = 0) and its lowest point is 3 units below it." } },
        { type: "answer", text: { en: "amplitude = <b>3</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "Reading an amplitude off a picture is a two-step habit. First find the middle line, which is the line the wave rocks about — here the peaks are at 3 and the troughs at −3, so the middle is the x-axis itself. Then measure straight up or straight down from that middle line to a turning point. That distance is the amplitude. Notice you do not need both turning points: one is enough, because a sine or cosine always swings the same distance up as it does down. The other way to do it, which is safer when the middle line is not obvious, is to take the highest y minus the lowest y and halve it. Here that is 3 minus −3, which is 6, and half of 6 is 3." },
    },
    {
      id: "b", marks: 1, level: 1,
      prompt: { en: "Write down the period of f." },
      hint: { en: "The period is the width of ONE complete wave. Start at a peak and read across to the very next peak — or use the fact that a turning point sits a quarter of a period away from a neighbouring x-intercept." },
      memo: [
        { type: "step", text: { en: "The graph has a maximum at x = 0° and its next maximum at x = 180°, so one whole wave is 180° wide." } },
        { type: "answer", text: { en: "period = <b>180°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "A period is a width, so you read it along the x-axis, never up the y-axis. The safest landmarks are two peaks in a row, or two troughs in a row: the gap between them is exactly one period. On this sketch the graph is at its highest on the y-axis and at its highest again at 180°, so the period is 180°. If only one turning point is marked, use the quarter rule instead: the distance from a turning point to the x-intercept next to it is a quarter of a period. Here the x-intercept is at 45° and the minimum is at 90°, a gap of 45°, and four lots of 45° is 180° — the same answer, arrived at from different information." },
    },
    {
      id: "c", marks: 1, level: 1,
      prompt: { en: "Write down the range of f." },
      hint: { en: "The range is the list of heights the graph actually reaches. Read the top of the picture and the bottom of the picture off the y-axis." },
      memo: [
        { type: "step", text: { en: "The graph reaches a highest point of 3 and a lowest point of −3, and it fills in everything in between." } },
        { type: "answer", text: { en: "y ∈ [−3 ; 3]" }, ticks: ["a"] },
      ],
      esplain: { en: "Range answers the question: if you stood on the y-axis, which heights would the graph ever reach? Read the highest point and the lowest point off the y-axis, then say that the graph covers everything between them. Two habits keep the marks. Write the smaller number first, exactly the way you would write any interval. And use square brackets, not round ones, because this graph genuinely touches 3 and genuinely touches −3 — it does not just get close to them. Round brackets are for a value the graph approaches but never reaches, which is what happens at an asymptote on a tangent graph." },
    },
  ],
};

/* ===============================================================
   q2 — a and q off a sine with a lifted midline.
   f(x) = 2 sin x + 1 on [0° ; 360°]; maximum (90° ; 3), minimum
   (270° ; −1)  ⇒  q = 1, a = 2, range [−1 ; 3].
   =============================================================== */
const Q2_F = { fn: "sin", a: 2, b: 1, p: 0, q: 1 };
const Q2_SPEC = {
  type: "trigg",
  win: { xmin: 0, xmax: 360, ymin: -2, ymax: 4 },
  xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ ...Q2_F, tone: "a", label: "f", labelAt: 200 }],
  points: [
    { x: 90, y: 3, on: 0, label: "(90° ; 3)", place: "above" },
    { x: 270, y: -1, on: 0, label: "(270° ; −1)" },
  ],
};

const q2 = {
  id: "tgraph.sib.rp.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-a-and-q-off-a-sine-with-a-lifted-midline",
  lostQuest: LOST,
  marks: 5,
  diagram: {
    spec: Q2_SPEC,
    parts: {
      a: { question: {}, reveal: { hmeasure: { x0: 0, x1: 360, y: 3, label: "period = 360°" } } },
      b: { question: {}, reveal: { midline: { y: 1 }, vmeasure: { x: 90, y0: -1, y1: 3 } } },
      c: { question: {}, reveal: { midline: { y: 1 }, hlines: [{ y: 3, label: "y = 3" }, { y: -1, label: "y = −1" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = a sin x + q&nbsp; for &nbsp;x ∈ [0° ; 360°], &nbsp;with a maximum turning point at (90° ; 3) and a minimum turning point at (270° ; −1).<br><br>Write down the period of f." },
      hint: { en: "Nothing is multiplying the x in &nbsp;a sin x + q, &nbsp;so ask yourself what a plain sine graph's period is." },
      memo: [
        { type: "step", text: { en: "Nothing multiplies the x, so b = 1 and the graph completes exactly one wave across the sketch." } },
        { type: "answer", text: { en: "period = <b>360°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "The period only ever depends on b, the number multiplying the x inside the function. In this equation the x is on its own, so b is 1 and the period is a plain 360°. The picture agrees with the algebra, which is a good check to get into the habit of doing: the graph starts on the y-axis, rises to a maximum, falls through the middle to a minimum and comes back up, and it takes the whole 360° of the sketch to do it once. Neither the a nor the q has anything to do with the period — a stretches the wave taller, q lifts it, and neither of those changes how wide one wave is." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "Determine the value of a and the value of q." },
      hint: { en: "Two turning points give you two facts. The midline sits exactly halfway between them, and the amplitude is exactly half the gap between them." },
      memo: [
        { type: "step", text: { en: "The midline is halfway between the maximum and the minimum: &nbsp;q = (3 + (−1)) ÷ 2 = <b>1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "The amplitude is half the distance between them: &nbsp;a = (3 − (−1)) ÷ 2 = 4 ÷ 2 = <b>2</b>" }, ticks: ["a"] },
        { type: "answer", text: { en: "a = 2 &nbsp;and&nbsp; q = 1" } },
        { type: "trap", text: { en: "WATCH OUT for the sign of a. Here the graph rises first, like a plain sine, so a is positive. If the graph had dipped first — gone DOWN from the y-axis before coming up — a would have been −2 with everything else exactly the same." } },
      ],
      esplain: { en: "Two turning points hand you both unknowns, and the two formulas are worth learning as a pair. The midline is the average of the top and the bottom, because it sits exactly halfway between them: add the two y-values and halve. The amplitude is half the distance between the top and the bottom: subtract the smaller from the larger and halve. Here that gives a middle line at y = 1 and a swing of 2 each way, which you can check straight off the picture — from 1 up to 3 is 2, and from 1 down to −1 is also 2. Then the sign of a is decided by shape, not by arithmetic. Ask which way the graph goes as it leaves the y-axis: up means a plain sine and a positive a, down means a flipped one." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: "Hence write down the equation of f and the range of f." },
      hint: { en: "Put your two values straight into the form you were given. The range then comes from the midline and the amplitude, not from the picture." },
      memo: [
        { type: "step", text: { en: "Substitute a = 2 and q = 1 into &nbsp;f(x) = a sin x + q." } },
        { type: "answer", text: { en: "f(x) = 2 sin x + 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Range: &nbsp;midline 1, amplitude 2 &nbsp;⟹&nbsp; y ∈ [−1 ; 3]" }, ticks: ["ca"] },
      ],
      esplain: { en: "Once a and q are known the equation is just a substitution, so the marks here are for being careful rather than for being clever. Write the given form down first and drop your numbers into it, so nothing gets lost. The range then comes from the same two numbers: start at the midline and step one amplitude up and one amplitude down. Here that is 1 + 2 = 3 and 1 − 2 = −1, so the range runs from −1 to 3. It is worth noticing that both answers are marked with a follow-through tick. If your a or your q from part (b) had been slightly wrong, you would still earn these marks for using them correctly here — which is exactly why you should always carry on rather than stopping." },
    },
  ],
};

/* ===============================================================
   q3 — a and p off a cosine that has slid sideways.
   g(x) = a cos(x + p) on [−180° ; 180°]; maximum (−60° ; 2)
   ⇒ a = 2, p = 60; y-intercept (0 ; 1).
   =============================================================== */
const Q3_G = { fn: "cos", a: 2, b: 1, p: -60, q: 0 };
const Q3_SPEC = {
  type: "trigg",
  win: { xmin: -180, xmax: 180, ymin: -3, ymax: 3 },
  xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [{ ...Q3_G, tone: "a", label: "g", labelAt: 150 }],
  /* place "below": (a)'s reveal captions a dashed vertical at the top
     of the frame, which is exactly where an "above" label would sit. */
  points: [{ x: -60, y: 2, on: 0, label: "(−60° ; 2)", place: "below" }],
};

const q3 = {
  id: "tgraph.sib.rp.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-a-and-p-off-a-shifted-cosine-then-its-y-intercept",
  lostQuest: LOST,
  marks: 4,
  diagram: {
    spec: Q3_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          vmeasure: { x: -60, y0: -2, y1: 2 },
          vlines: [{ x: -60, label: "x = −60°" }],
        },
      },
      b: { question: {}, reveal: { points: [{ x: 0, y: 1, on: 0, label: "(0 ; 1)", place: "above" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graph of &nbsp;g(x) = a cos(x + p)&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;where &nbsp;0° &lt; p &lt; 180°. &nbsp;The maximum turning point of g is at (−60° ; 2).<br><br>Determine the value of a and the value of p." },
      hint: { en: "The height of the maximum gives you one of them. For the other, ask where a PLAIN cosine has its maximum, and how far this one has moved from there." },
      memo: [
        { type: "step", text: { en: "Nothing is added on the end, so the midline is the x-axis. The maximum is 2 above it: &nbsp;a = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "A plain cosine has its maximum at x = 0°. This one peaks at x = −60°, so the graph has slid 60° to the LEFT — and a shift to the left is &nbsp;+ p&nbsp; inside the bracket." } },
        { type: "answer", text: { en: "p = <b>60</b> &nbsp;&nbsp;∴&nbsp; g(x) = 2 cos(x + 60°)" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the sign inside the bracket feels backwards. &nbsp;x + 60°&nbsp; moves the graph 60° to the LEFT, and &nbsp;x − 60°&nbsp; moves it to the RIGHT. Do not trust the feeling — check it on the peak: a plain cosine peaks at 0°, this one peaks at −60°, so it went left." },
        },
      ],
      esplain: { en: "Take the two unknowns one at a time and neither is hard. The a is about height: the graph is centred on the x-axis because nothing was added on the end, and its highest point is 2 above that, so a is 2. The p is about position, and the way to find it is to compare with the graph you already know. A plain cosine always has its maximum on the y-axis, at x = 0. This one has its maximum at x = −60°, which is 60° further left. Then the sign is the part everybody argues with, so settle it with the peak rather than with a rule. If you put x = −60° into cos(x + 60°) the bracket becomes cos(0°), which is the maximum — so x + 60° is right. A shift left is a plus inside the bracket, every time." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Determine the coordinates of the point where g cuts the y-axis." },
      hint: { en: "A graph cuts the y-axis where x = 0. Substitute that into your equation from (a) — and this is a special angle, so no calculator is needed." },
      memo: [
        { type: "step", text: { en: "At the y-axis, x = 0: &nbsp;g(0) = 2 cos(0° + 60°) = 2 cos 60°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 2 × ½ = 1 &nbsp;&nbsp;∴&nbsp; the graph cuts the y-axis at (0 ; 1)" }, ticks: ["ca"] },
      ],
      esplain: { en: "Every graph cuts the y-axis at the point where x is zero, and that is true for trig graphs exactly as it is for straight lines and parabolas. So the whole job is substituting x = 0 into the equation you built in part (a). The bracket then becomes 0° + 60°, which is 60°, and cos 60° is one of the special angles you know without a calculator — it is a half. Two of a half is 1, so the graph passes through (0 ; 1). Two things are worth checking. First, look at the sketch: at x = 0 the curve really is a little way below its peak of 2, which agrees with 1. Second, notice how the shift shows up here — a plain cosine would have cut the y-axis at its maximum, and this one cuts it on the way down." },
    },
  ],
};

/* ===============================================================
   q4 — a and q off a TANGENT.
   h(x) = a tan x + q on [−180° ; 180°]; through (0 ; −1) and
   (45° ; 1)  ⇒  q = −1, a = 2. Asymptotes x = ±90°.
   =============================================================== */
const Q4_H = { fn: "tan", a: 2, b: 1, p: 0, q: -1 };
const Q4_SPEC = {
  type: "trigg",
  win: { xmin: -180, xmax: 180, ymin: -5, ymax: 5 },
  xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ ...Q4_H, tone: "a", label: "h", labelAt: 150 }],
  points: [
    { x: 0, y: -1, on: 0, label: "(0 ; −1)", place: "below" },
    { x: 45, y: 1, on: 0, label: "(45° ; 1)", place: "above" },
  ],
  showAsym: true,
};

const q4 = {
  id: "tgraph.sib.rp.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-a-and-q-off-a-tangent-through-two-given-points",
  lostQuest: LOST,
  marks: 6,
  diagram: {
    spec: Q4_SPEC,
    parts: {
      a: { question: {}, reveal: { hmeasure: { x0: -90, x1: 90, y: 4, label: "period = 180°" } } },
      b: { question: {}, reveal: { vlines: [{ x: -90, label: "x = −90°" }, { x: 90, label: "x = 90°" }] } },
      c: { question: {}, reveal: { midline: { y: -1 } } },
    },
  },
  parts: [
    {
      id: "a", marks: 1, level: 1,
      prompt: { en: "The sketch shows the graph of &nbsp;h(x) = a tan x + q&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph passes through (0 ; −1) and (45° ; 1). &nbsp;The dashed lines are its asymptotes.<br><br>Write down the period of h." },
      hint: { en: "A tangent graph repeats itself sooner than a sine or a cosine does. Read the gap between two asymptotes in a row off the sketch." },
      memo: [
        { type: "step", text: { en: "The asymptotes are 180° apart, and a tangent repeats itself exactly once between one asymptote and the next." } },
        { type: "answer", text: { en: "period = <b>180°</b>" }, ticks: ["a"] },
      ],
      esplain: { en: "The tangent graph is the one that repeats twice as often as the other two. A sine or a cosine needs a full 360° to get back to where it started, but a tangent has already done a complete copy of itself after 180°. On a picture the easiest place to see this is between the asymptotes: one whole branch, running from far below to far above, fills exactly one period. So measuring from one dashed line to the next gives you the period directly. Here they sit at −90° and 90°, which is 180° apart. That also tells you b is 1, because 180° divided by b has to come out as 180°." },
    },
    {
      id: "b", marks: 2, level: 1,
      prompt: { en: "Write down the equations of the asymptotes of h for &nbsp;x ∈ [−180° ; 180°]." },
      hint: { en: "An asymptote here is a vertical line, so its equation looks like &nbsp;x = something. &nbsp;Read the two dashed lines off the x-axis." },
      memo: [
        { type: "step", text: { en: "The dashed lines are vertical, so each one has an equation of the form &nbsp;x = …" } },
        { type: "answer", text: { en: "x = −90° &nbsp;and&nbsp; x = 90°" }, ticks: ["a", "a"] },
      ],
      esplain: { en: "An asymptote is a line the graph gets closer and closer to but never actually touches. On a tangent graph they are vertical, and they sit at the x-values where the tangent is undefined. The thing to be careful about is how you write the answer. A vertical line's equation is x equals a number, not y equals a number, and not just the number on its own. Writing 90° by itself does not describe a line, so it does not earn the mark. Also read the interval you were given before you answer: over a wider interval there would be more asymptotes, spaced one period apart, but between −180° and 180° there are exactly two." },
    },
    {
      id: "c", marks: 3, level: 3,
      prompt: { en: "Determine the value of a and the value of q." },
      hint: { en: "Two given points, two unknowns — so substitute each one in turn. Start with the point on the y-axis, because tan 0° makes one of the unknowns disappear." },
      memo: [
        { type: "step", text: { en: "Substitute (0 ; −1): &nbsp;a tan 0° + q = −1 &nbsp;⟹&nbsp; a(0) + q = −1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴&nbsp; q = <b>−1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Substitute (45° ; 1): &nbsp;a tan 45° + (−1) = 1 &nbsp;⟹&nbsp; a(1) − 1 = 1" } },
        { type: "answer", text: { en: "a = <b>2</b> &nbsp;&nbsp;∴&nbsp; h(x) = 2 tan x − 1" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: choose the EASY point first. Substituting (0 ; −1) kills the a straight away because tan 0° = 0, which leaves you one unknown instead of two. Starting with (45° ; 1) instead gives you a + q = 1 and no way forward on its own." } },
      ],
      esplain: { en: "Two unknowns need two pieces of information, and you have been handed exactly two points. The order you use them in is what makes this quick or slow. Look for a point that makes one unknown vanish, and here the point on the y-axis does it: tan 0° is zero, so the term with a in it disappears completely and the equation collapses to q = −1. Now that q is known, the second point has only one unknown left. Put x = 45° in, remember that tan 45° = 1 from your special angles, and you get a − 1 = 1, so a = 2. Both values check against the picture: the graph really does cross the y-axis at −1, and it really is steeper than a plain tangent." },
    },
  ],
};

/* ===============================================================
   q5 — TWO curves, two different jobs.
   f(x) = a sin bx with a minimum at (45° ; −2)  ⇒  a = −2, b = 2.
   g(x) = cos(x + p) with a maximum at (−90° ; 1)  ⇒  p = 90.
   =============================================================== */
const Q5_F = { fn: "sin", a: -2, b: 2, p: 0, q: 0 };
const Q5_G = { fn: "cos", a: 1, b: 1, p: -90, q: 0 };
const Q5_SPEC = {
  type: "trigg",
  win: { xmin: -180, xmax: 180, ymin: -3, ymax: 3 },
  xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [
    { ...Q5_F, tone: "a", label: "f", labelAt: 135 },
    { ...Q5_G, tone: "b", label: "g", labelAt: -135 },
  ],
  points: [
    { x: 45, y: -2, on: 0, label: "A(45° ; −2)" },
    { x: -90, y: 1, on: 1, label: "B(−90° ; 1)", place: "above" },
  ],
};

const q5 = {
  id: "tgraph.sib.rp.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-parameters-off-two-curves-on-one-set-of-axes",
  lostQuest: LOST,
  marks: 5,
  diagram: {
    spec: Q5_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          vmeasure: { x: 45, y0: -2, y1: 2 },
          hmeasure: { x0: -45, x1: 135, y: 2.5, label: "period = 180°" },
        },
      },
      b: { question: {}, reveal: { vlines: [{ x: -90, label: "x = −90°" }] } },
      c: { question: {}, reveal: { hlines: [{ y: 1, label: "y = 1" }, { y: -1, label: "y = −1" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 3,
      prompt: { en: "The sketch shows &nbsp;f(x) = a sin bx&nbsp; and &nbsp;g(x) = cos(x + p)&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;where &nbsp;0° &lt; p &lt; 180°. &nbsp;A(45° ; −2) is a turning point of f and B(−90° ; 1) is a turning point of g.<br><br>Determine the value of a and the value of b." },
      hint: { en: "A is a turning point, so its height gives you the size of a — and whether it is a MINIMUM tells you the sign. For b, remember that the first turning point of a sine sits a quarter of a period from the origin." },
      memo: [
        { type: "step", text: { en: "The graph is centred on the x-axis and A is 2 units below it, so the amplitude is 2." } },
        { type: "step", text: { en: "A plain sine graph RISES first, so its first turning point is a maximum. Here the first turning point is a MINIMUM, so the graph has been flipped: &nbsp;a = <b>−2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "That first turning point sits a quarter of a period from the origin: &nbsp;45° = period ÷ 4 &nbsp;⟹&nbsp; period = 180°" }, ticks: ["a"] },
        { type: "answer", text: { en: "b = 360° ÷ 180° = <b>2</b> &nbsp;&nbsp;∴&nbsp; f(x) = −2 sin 2x" }, ticks: ["a"] },
      ],
      esplain: { en: "Two unknowns, and each one has its own landmark. The a comes from height and direction together. The distance from the middle line to the turning point is 2, so the size of a is 2 — and because that first turning point is a low one instead of a high one, the graph has been turned upside down, which makes a negative. The b comes from width. A sine graph always reaches its first turning point a quarter of the way through a period, so if that happens at 45°, a whole period must be four times as long, which is 180°. Then b is 360° divided by the period, giving 2. A good check is to count waves on the sketch: from −180° to 180° is 360°, and you should be able to see exactly two complete waves of f in that space." },
    },
    {
      id: "b", marks: 1, level: 2,
      prompt: { en: "Determine the value of p." },
      hint: { en: "Compare g with a plain cosine. Where does a plain cosine have its maximum, and where does this one have its maximum instead?" },
      memo: [
        { type: "step", text: { en: "A plain cosine peaks at x = 0°; g peaks at x = −90°, so g has slid 90° to the left, which is &nbsp;+ p&nbsp; inside the bracket." } },
        { type: "answer", text: { en: "p = <b>90</b> &nbsp;&nbsp;∴&nbsp; g(x) = cos(x + 90°)" }, ticks: ["a"] },
      ],
      esplain: { en: "Finding a horizontal shift is always the same move: pick a landmark you can recognise on the plain graph, find the same landmark on the shifted one, and see how far it has travelled. The easiest landmark on a cosine is its maximum, because a plain cosine peaks right on the y-axis. Here the peak has moved to −90°, which is 90° to the left. A leftward move is a plus inside the bracket, so p is 90. Check it by substituting: cos(−90° + 90°) is cos 0°, which is 1, and that is exactly the height the sketch shows at B. The question also told you that p lies between 0° and 180°, which is the examiner ruling out the other shifts that would give the same picture." },
    },
    {
      id: "c", marks: 1, level: 1,
      prompt: { en: "Write down the range of g." },
      hint: { en: "Sliding a graph sideways does not change which heights it reaches. So what is the range of a plain cosine?" },
      memo: [
        { type: "step", text: { en: "g is a plain cosine slid sideways — its amplitude is still 1 and its midline is still y = 0." } },
        { type: "answer", text: { en: "y ∈ [−1 ; 1]" }, ticks: ["a"] },
      ],
      esplain: { en: "This is a one-line answer as long as you remember what a sideways shift does and does not do. Moving a graph left or right changes when it reaches its high and low points, but not what those high and low points are. Nothing multiplies the cosine, so the amplitude is 1, and nothing is added on the end, so the middle line is still the x-axis. That puts the top at 1 and the bottom at −1. Read it off the sketch as well, as a check: g really does touch 1 at B and touches −1 half a period later. When a question gives you two graphs, be careful to answer about the right one — f reaches from −2 to 2 and g only from −1 to 1." },
    },
  ],
};

/* ===============================================================
   q6 — the turning point marked P (bare-figure rule).
   f(x) = a sin x + q on [0° ; 360°]; y-intercept (0 ; −1), minimum
   (270° ; −5)  ⇒  q = −1, a = 4; P(90° ; 3); range [−5 ; 3].
   P sits on the QUESTION side as a plain dot labelled "P", because
   its coordinates are what part (b) is for; only (b)'s own reveal
   writes them onto the picture.
   =============================================================== */
const Q6_F = { fn: "sin", a: 4, b: 1, p: 0, q: -1 };
const Q6_YI = { x: 0, y: -1, on: 0, label: "(0 ; −1)" };
const Q6_MIN = { x: 270, y: -5, on: 0, label: "(270° ; −5)" };
const Q6_SPEC = {
  type: "trigg",
  win: { xmin: 0, xmax: 360, ymin: -6, ymax: 4 },
  xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ ...Q6_F, tone: "a", label: "f", labelAt: 200 }],
  points: [Q6_YI, Q6_MIN, { x: 90, y: 3, on: 0, label: "P", place: "above" }],
};

const q6 = {
  id: "tgraph.sib.rp.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-a-and-q-then-name-the-marked-turning-point",
  lostQuest: LOST,
  marks: 5,
  diagram: {
    spec: Q6_SPEC,
    parts: {
      a: { question: {}, reveal: { midline: { y: -1 }, vmeasure: { x: 90, y0: -5, y1: 3 } } },
      b: {
        question: {},
        reveal: { bare: true, points: [Q6_YI, Q6_MIN, { x: 90, y: 3, on: 0, label: "P(90° ; 3)", place: "above" }] },
      },
      c: { question: {}, reveal: { hlines: [{ y: 3, label: "y = 3" }, { y: -5, label: "y = −5" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 2,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = a sin x + q&nbsp; for &nbsp;x ∈ [0° ; 360°]. &nbsp;The graph cuts the y-axis at (0 ; −1) and has a minimum turning point at (270° ; −5). &nbsp;P is the maximum turning point of f.<br><br>Determine the value of a and the value of q." },
      hint: { en: "Start with the point on the y-axis, because &nbsp;sin 0° = 0&nbsp; makes the a disappear. Then use the minimum to finish off." },
      memo: [
        { type: "step", text: { en: "Substitute (0 ; −1): &nbsp;a sin 0° + q = −1 &nbsp;⟹&nbsp; a(0) + q = −1 &nbsp;⟹&nbsp; q = <b>−1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "At a minimum &nbsp;sin x = −1, &nbsp;so the lowest value of f is &nbsp;−a + q. &nbsp;Substitute (270° ; −5): &nbsp;−a + (−1) = −5" } },
        { type: "answer", text: { en: "−a = −4 &nbsp;⟹&nbsp; a = <b>4</b> &nbsp;&nbsp;∴&nbsp; f(x) = 4 sin x − 1" }, ticks: ["a"] },
      ],
      esplain: { en: "Pick the point that does the most work for you first. On the y-axis x is zero, and sin 0° is zero, so the whole a-term vanishes and q drops out on its own: q = −1. With q known, the minimum finishes the job. A sine reaches its lowest value when sin x is −1, so the bottom of the graph is at −a + q. Setting that equal to −5 and putting q = −1 in gives −a − 1 = −5, so a = 4. There is a quicker route worth knowing too: the midline is −1 and the minimum is −5, and the distance between them IS the amplitude, which is 4. Both routes are worth full marks; the substitution one is safer when the picture is hard to read." },
    },
    {
      id: "b", marks: 2, level: 2,
      prompt: { en: "Write down the coordinates of the turning point P." },
      hint: { en: "P is the maximum. A plain sine is highest a quarter of the way through its period, and the height of a maximum is the midline plus one amplitude." },
      memo: [
        { type: "step", text: { en: "A sine graph reaches its maximum a quarter of a period along: &nbsp;360° ÷ 4 = 90°" }, ticks: ["a"] },
        { type: "answer", text: { en: "At a maximum &nbsp;sin x = 1, &nbsp;so &nbsp;y = 4(1) − 1 = 3 &nbsp;&nbsp;∴&nbsp; P(90° ; 3)" }, ticks: ["a"] },
      ],
      esplain: { en: "A turning point has two coordinates and they come from two different ideas, so find them separately. The x-coordinate is about position: a plain sine graph is at its highest a quarter of the way through a period, and this graph's period is 360°, so that happens at 90°. The y-coordinate is about height: at a maximum the sine part is at its biggest, which is 1, so the value of the function is a times 1 plus q, or 4 − 1 = 3. There is also a symmetry check, which is quicker in an exam. The maximum and the minimum are always the same distance from the midline. The minimum is 4 below the midline of −1, so the maximum must be 4 above it, at 3." },
    },
    {
      id: "c", marks: 1, level: 1,
      prompt: { en: "Write down the range of f." },
      hint: { en: "You already know the highest point and the lowest point of this graph. Write down everything in between." },
      memo: [
        { type: "step", text: { en: "The lowest value is −5 and the highest value is 3." } },
        { type: "answer", text: { en: "y ∈ [−5 ; 3]" }, ticks: ["ca"] },
      ],
      esplain: { en: "By this stage the range costs nothing, because both ends are already in front of you: the minimum from the question and the maximum from part (b). Write the smaller number first and use square brackets, since the graph really does reach both ends. There is one good check to do every time. The width of the range should always be twice the amplitude, and here 3 minus −5 is 8, which is twice 4. If that check fails, one of your earlier answers is out. Notice too that the tick on this line is a follow-through tick: even if part (a) had gone wrong, a range built correctly out of your own numbers still earns the mark." },
    },
  ],
};

export const tgraphReadParametersQuestions = [q1, q2, q3, q4, q5, q6];
