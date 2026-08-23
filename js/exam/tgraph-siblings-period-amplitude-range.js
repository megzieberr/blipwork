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
const scMemo = (periodLine, ampLine, rangeReason, answerLine) => [
  { type: "step", text: { en: periodLine }, ticks: ["a"] },
  { type: "step", text: { en: ampLine }, ticks: ["a"] },
  { type: "step", text: { en: rangeReason } },
  { type: "answer", text: { en: answerLine }, ticks: ["a"] },
];
const tanMemo = (periodLine, answerLine) => [
  { type: "step", text: { en: periodLine }, ticks: ["a"] },
  { type: "step", text: { en: "A tangent graph climbs forever between its asymptotes — it has no highest point and no lowest point, so it has <b>no amplitude</b> at all." } },
  { type: "answer", text: { en: answerLine }, ticks: ["a"] },
];

const NEG_A_TRAP = {
  type: "trap",
  text: { en: "WATCH OUT: a negative a flips the graph upside down, but the amplitude stays POSITIVE. Amplitude is a distance — how far the graph swings away from its midline — and a distance is never negative. Write the size of a, not a with its sign." },
};
const P_TRAP = {
  type: "trap",
  text: { en: "REMEMBER: a number inside the bracket with the x only slides the graph left or right. Sliding a graph sideways changes none of these three answers — same period, same amplitude, same range. Only b changes the period, only a changes the amplitude, and only a and q change the range." },
};
const ASK = "Write down the <b>period</b>, the <b>amplitude</b> and the <b>range</b> of";

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
      prompt: { en: `${ASK} &nbsp;y = sin 4x.` },
      hint: { en: "Three separate questions in one. The 4 sits with the x, so it belongs to the period. Nothing is in front of the sin and nothing is added on the end — so what does that make the amplitude, and where is the midline?" },
      memo: scMemo(
        "Period = 360° ÷ 4 = <b>90°</b>",
        "Amplitude = |a| = |1| = <b>1</b>",
        "Range: the midline is y = 0, so go one amplitude up and one amplitude down from there.",
        "Period = 90° &nbsp;·&nbsp; Amplitude = 1 &nbsp;·&nbsp; Range: y ∈ [−1 ; 1]",
      ),
      esplain: { en: "These three words describe three completely different things about the same wave, so it helps to say what each one means before you hunt for it. The period is how wide one whole wave is before the picture starts repeating — a plain sine takes 360°, and the 4 squashes four whole waves into that same space, so each one is only 90° wide. The amplitude is how far the wave swings away from its middle line, up or down. There is no number in front of the sin, so that swing is just 1. The range is the list of heights the graph actually reaches. The middle is at zero and the swing is 1, so the graph lives between −1 and 1 and never leaves. Notice that the 4 changed the period and left the other two alone — each letter has its own job." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = cos x − 3.` },
      hint: { en: "The − 3 is on the end, outside everything, so it does not touch the x at all. Ask yourself what it DOES move, and then build the range from the new middle line." },
      memo: scMemo(
        "Period = 360° ÷ 1 = <b>360°</b>",
        "Amplitude = |a| = |1| = <b>1</b>",
        "Range: the − 3 drags the whole graph down, so the midline is y = −3. One amplitude each way gives −3 − 1 = −4 and −3 + 1 = −2.",
        "Period = 360° &nbsp;·&nbsp; Amplitude = 1 &nbsp;·&nbsp; Range: y ∈ [−4 ; −2]",
      ),
      esplain: { en: "A number added or subtracted on the end lifts or drops the whole picture without changing its shape. Think of the graph as a wave painted on a sheet of glass: sliding the glass down by 3 does not make the wave wider and does not make it swing further, it just puts the whole thing lower. So the period stays 360° and the amplitude stays 1, and the only thing that moves is the middle line, from y = 0 down to y = −3. Build the range from that new middle: one amplitude up is −2, one amplitude down is −4. The most common slip is to write the range as [−1 ; 1] − 3 in your head and then subtract only once. Write the midline down first, then step up and down from it." },
    },
    {
      id: "c", marks: 2, level: 1,
      prompt: { en: `${ASK} &nbsp;y = tan 2x. &nbsp;(A tangent graph has no amplitude — say why.)` },
      hint: { en: "A tangent graph is not a wave between a top and a bottom, so start by asking yourself what it does instead. And its plain period is not 360° — a tangent repeats itself in half that." },
      memo: tanMemo(
        "Period = 180° ÷ 2 = <b>90°</b> &nbsp;&nbsp;<i>(a tangent's plain period is 180°, not 360°)</i>",
        "Period = 90° &nbsp;·&nbsp; Amplitude: none &nbsp;·&nbsp; Range: y ∈ ℝ",
      ),
      esplain: { en: "The tangent graph is the odd one out of the three and it is worth knowing exactly how. A sine or cosine is trapped between a highest point and a lowest point, and the amplitude measures that trap. A tangent has no trap: between one asymptote and the next it comes up from very far below and shoots off very far above, so there is no maximum and no minimum to measure. That is why the honest answer is not zero and not one — it is that a tangent has no amplitude, and the range is every real number. The period is the other difference: a tangent has already repeated itself after 180°, so you divide 180° by b instead of 360°. Here that gives 90°." },
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
      prompt: { en: `${ASK} &nbsp;y = 3 sin x.` },
      hint: { en: "Only one thing has changed, and it is sitting in FRONT of the sin. Decide which of the three answers that number belongs to, then write the other two down without doing any work." },
      memo: scMemo(
        "Period = 360° ÷ 1 = <b>360°</b>",
        "Amplitude = |a| = |3| = <b>3</b>",
        "Range: the midline is still y = 0, so go 3 up and 3 down.",
        "Period = 360° &nbsp;·&nbsp; Amplitude = 3 &nbsp;·&nbsp; Range: y ∈ [−3 ; 3]",
      ),
      esplain: { en: "The number in front stretches the wave taller without making it wider. Picture the plain sine graph drawn on a rubber sheet and then pulled straight upwards: every height gets multiplied by 3, so the peak that was at 1 is now at 3 and the trough that was at −1 is now at −3. Sideways, nothing at all has happened, so one whole wave still takes 360°. That is the useful habit here — before you calculate anything, ask which direction each number pulls. A number in front pulls vertically, a number with the x pulls horizontally, and a number on the end slides the whole thing up or down. Once you can name the direction, two of the three answers usually need no working at all." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = cos(x + 120°).` },
      hint: { en: "The 120° is inside the bracket, joined to the x, so it moves the graph sideways. Now ask the important question: does moving a graph sideways change how wide one wave is, how far it swings, or which heights it reaches?" },
      memo: scMemo(
        "Period = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(the 120° slides the graph, it does not squash it)</i>",
        "Amplitude = |a| = |1| = <b>1</b>",
        "Range: the midline is still y = 0, so one up and one down.",
        "Period = 360° &nbsp;·&nbsp; Amplitude = 1 &nbsp;·&nbsp; Range: y ∈ [−1 ; 1]",
      ),
      esplain: { en: "This one is a trap dressed up as work. A number added to the x inside the bracket shifts the whole graph left or right, and a sideways shift is the one move that changes none of these three answers. The wave is still exactly as wide as it was, it still swings exactly as far, and it still reaches exactly the same heights — it just arrives at them earlier. So all three answers are the plain-cosine answers. Learners lose marks here by feeling that a question with a number in it must need a calculation, and then dividing 360° by 120° or adding 120° to something. Read where the number lives first. Inside the bracket next to the x, on its own, means slide, and slide means nothing changes." },
    },
    {
      id: "c", marks: 2, level: 1,
      prompt: { en: `${ASK} &nbsp;y = tan x + 4.` },
      hint: { en: "Two things to notice. It is a tangent, so its plain period is not 360°. And the + 4 lifts the whole graph — but think carefully about whether lifting a graph that already reaches every height changes the range." },
      memo: tanMemo(
        "Period = 180° ÷ 1 = <b>180°</b>",
        "Period = 180° &nbsp;·&nbsp; Amplitude: none &nbsp;·&nbsp; Range: y ∈ ℝ",
      ),
      esplain: { en: "Lifting a tangent graph by 4 does move it — every point on the picture goes up by 4, and the place where it crosses the y-axis moves from 0 to 4. But the range does not change, and that surprises people. The reason is that a tangent already reaches every single real height before you lift it. Push all those heights up by 4 and you still have every real height, just handed out at different x-values. So the range is still y ∈ ℝ. The period is untouched too, because + 4 is outside and never touches the x. The one thing you should be able to say out loud: it still has no amplitude, because it still has no highest or lowest point to measure between." },
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
      prompt: { en: `${ASK} &nbsp;y = −2 cos x.` },
      hint: { en: "Amplitude is a distance, and a distance is never negative. Work out how far the graph swings from its midline, and let the minus sign do its own separate job." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is 2, so the graph runs from −2 up to 2. The minus only turns the picture upside down; it does not change WHICH heights are reached." } },
        { type: "answer", text: { en: "Period = 360° &nbsp;·&nbsp; Amplitude = 2 &nbsp;·&nbsp; Range: y ∈ [−2 ; 2]" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "The minus sign has exactly one job: it turns the graph upside down in the x-axis. A plain cosine starts at the top on the y-axis, so −2 cos x starts at the bottom instead. What the minus does NOT do is make the amplitude negative, because amplitude means how far the graph swings away from the middle, and a how-far is always a positive number. Write it as |a| every single time and the sign takes care of itself. The range is the other place people go wrong: because the graph is flipped, they expect a flipped range, but the same set of heights is still visited — the graph just visits them in the opposite order. Top is still 2, bottom is still −2, so the range is unchanged." },
    },
    {
      id: "b", marks: 3, level: 1,
      prompt: { en: `${ASK} &nbsp;y = 5 sin 3x.` },
      hint: { en: "Two numbers, two different jobs. One of them is in front and one of them is with the x. Sort out which is which before you write anything down." },
      memo: scMemo(
        "Period = 360° ÷ 3 = <b>120°</b>",
        "Amplitude = |a| = |5| = <b>5</b>",
        "Range: the midline is y = 0, so 5 up and 5 down.",
        "Period = 120° &nbsp;·&nbsp; Amplitude = 5 &nbsp;·&nbsp; Range: y ∈ [−5 ; 5]",
      ),
      esplain: { en: "When two numbers appear at once, name each one's direction before you calculate. The 5 is in front of the sin, so it works vertically — it stretches the wave to five times its height. The 3 is with the x, so it works horizontally — it squashes three whole waves into the space one used to take, which makes each wave 120° wide instead of 360°. Because the two numbers pull in different directions they never interfere with each other, and that is the good news: you can answer the period without even looking at the 5, and the amplitude without even looking at the 3. The range then comes free, because the midline has not moved: five above zero and five below." },
    },
    {
      id: "c", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −½ sin 2x.` },
      hint: { en: "A fraction in front is still just an amplitude — it makes the wave shorter instead of taller. Take the size of it and leave the minus out of the amplitude." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 2 = <b>180°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−½| = <b>½</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is ½ each way." } },
        { type: "answer", text: { en: "Period = 180° &nbsp;·&nbsp; Amplitude = ½ &nbsp;·&nbsp; Range: y ∈ [−½ ; ½]" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "A fraction in front of the sin does the same job as a whole number, only the other way round. Multiplying every height by a half squashes the wave flat instead of stretching it tall, so the peak drops from 1 to a half and the trough rises from −1 to minus a half. The minus in front then flips that flattened wave upside down, which changes where the peaks and troughs sit along the x-axis but not how high or low they go. So the amplitude is a half and the range runs from minus a half to a half. Meanwhile the 2 is doing its own separate horizontal job, fitting two whole waves into 360° so that each one is 180° wide. Two numbers, two directions, no interference." },
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
      prompt: { en: `${ASK} &nbsp;y = 3 sin x + 2.` },
      hint: { en: "Find the midline first — it is the number on the end. Then step one amplitude up from it and one amplitude down from it, and you have the range without guessing." },
      memo: scMemo(
        "Period = 360° ÷ 1 = <b>360°</b>",
        "Amplitude = |a| = |3| = <b>3</b>",
        "Range: the + 2 lifts the midline to y = 2. One amplitude up is 2 + 3 = 5; one amplitude down is 2 − 3 = −1.",
        "Period = 360° &nbsp;·&nbsp; Amplitude = 3 &nbsp;·&nbsp; Range: y ∈ [−1 ; 5]",
      ),
      esplain: { en: "This is the shape most range mistakes happen on, so it is worth a fixed routine: write the midline, then step. The midline is the number on the end, here y = 2 — that is the line the wave rocks about. The amplitude is how far it rocks, here 3. So the top of the wave is 2 + 3 = 5 and the bottom is 2 − 3 = −1, and the range is everything in between. Two slips to avoid. The first is writing the range as [−3 ; 3] and forgetting the lift altogether. The second is adding the 2 to only one end, which gives an answer that is not the right width. If you check nothing else, check that the distance between your two range numbers is twice the amplitude — here 5 − (−1) = 6, which is 2 × 3." },
    },
    {
      id: "b", marks: 3, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −2 cos ½x.` },
      hint: { en: "Dividing by a half is the same as multiplying by 2 — so this graph is going to be wider than a plain cosine, not narrower. Do that division carefully and remember the amplitude is a size." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ ½ = 360° × 2 = <b>720°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the midline is y = 0 and the swing is 2 each way." } },
        { type: "answer", text: { en: "Period = 720° &nbsp;·&nbsp; Amplitude = 2 &nbsp;·&nbsp; Range: y ∈ [−2 ; 2]" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "A b smaller than 1 stretches the graph sideways instead of squashing it, and the arithmetic is the part to slow down on. Dividing by a half means asking how many halves fit into 360°, and the answer is 720 — twice as many, not half as many. So this cosine takes 720° to complete one single wave, which means on an ordinary 0° to 360° set of axes you would only see half of one wave. That is a genuinely useful thing to be able to picture. The minus in front does its usual flip, so instead of starting at its highest point on the y-axis this graph starts at its lowest, but the amplitude is still the positive number 2 and the heights it reaches are still everything from −2 to 2." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: `${ASK} &nbsp;y = −tan 3x.` },
      hint: { en: "The minus flips it, and the 3 squashes it. Only one of those two changes an answer here — and remember which number a tangent's period starts from." },
      memo: tanMemo(
        "Period = 180° ÷ 3 = <b>60°</b> &nbsp;&nbsp;<i>(tangent, so start from 180°)</i>",
        "Period = 60° &nbsp;·&nbsp; Amplitude: none &nbsp;·&nbsp; Range: y ∈ ℝ",
      ),
      esplain: { en: "Two numbers, and only one of them earns a mark. The 3 is with the x, so it squashes the graph sideways: a tangent already repeats every 180°, and three of them now fit into that space, so the period is 60°. The minus in front flips the picture upside down, which turns a branch that was climbing into a branch that is falling. That is a real change to the drawing, but it changes nothing you have been asked for. The amplitude is still nothing at all, because flipping a graph with no top and no bottom leaves it with no top and no bottom, and the range is still every real number, because flipping every height gives you back the same collection of heights." },
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
      prompt: { en: `${ASK} &nbsp;y = −sin x + 3.` },
      hint: { en: "Two things are happening at once: a flip and a lift. Only one of them touches the range. Find the midline, then step one amplitude each way from it." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−1| = <b>1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the + 3 puts the midline at y = 3. One amplitude up is 3 + 1 = 4; one amplitude down is 3 − 1 = 2. The flip changes where the graph is high and where it is low, not how high and how low." } },
        { type: "answer", text: { en: "Period = 360° &nbsp;·&nbsp; Amplitude = 1 &nbsp;·&nbsp; Range: y ∈ [2 ; 4]" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "Take the two changes one at a time and neither is hard. The minus flips the sine upside down, so it dips first instead of rising first. The + 3 then lifts the whole flipped wave three units, which drags the midline from y = 0 up to y = 3. Now build the range the same way you always do: midline 3, amplitude 1, so the top is 4 and the bottom is 2. Something worth noticing here is that this graph never touches the x-axis at all — its lowest point is 2, which is still above zero. A graph that sits entirely above the x-axis has no x-intercepts, and questions love asking about that. The flip contributes nothing to any of the three answers; it only decides which way round the wave runs." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = 2 cos(x + 135°).` },
      hint: { en: "One of these two numbers changes an answer and the other one is a decoy. Decide what each one does to the picture before you write a single thing down." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b> &nbsp;&nbsp;<i>(b = 1; the 135° is a sideways slide, not a squash)</i>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |2| = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: nothing was added on the end, so the midline is still y = 0. Two up and two down." } },
        { type: "answer", text: { en: "Period = 360° &nbsp;·&nbsp; Amplitude = 2 &nbsp;·&nbsp; Range: y ∈ [−2 ; 2]" }, ticks: ["a"] },
        P_TRAP,
      ],
      esplain: { en: "Everything here turns on where each number is standing. The 2 is in front, so it stretches the graph vertically and it owns the amplitude. The 135° is inside the bracket, added to the x, so it slides the graph sideways — and a sideways slide is the one transformation that leaves the period, the amplitude and the range all untouched. Learners lose this mark by treating the 135° as though it were a b and dividing 360° by it, which gives a period no cosine graph has ever had. A quick sanity check that always works: b is whatever is MULTIPLYING the x. Here nothing is multiplying the x, so b is 1 and the period is a plain 360°. The 135° only decides where the first peak lands." },
    },
    {
      id: "c", marks: 2, level: 2,
      prompt: { en: `${ASK} &nbsp;y = ½ tan 4x.` },
      hint: { en: "The half in front is tempting to call an amplitude — but ask yourself first whether this graph has a highest and a lowest point for an amplitude to measure between." },
      memo: tanMemo(
        "Period = 180° ÷ 4 = <b>45°</b>",
        "Period = 45° &nbsp;·&nbsp; Amplitude: none &nbsp;·&nbsp; Range: y ∈ ℝ",
      ),
      esplain: { en: "This is the tangent question written to catch you, and the bait is the half in front. On a sine or a cosine that half would be the amplitude, and writing a half here feels completely reasonable. But amplitude is defined as the distance from the midline to the highest point, and a tangent graph has no highest point, so there is no such distance to report — the honest answer stays no amplitude, not a half. What the half actually does is squash the branches closer to the vertical, which changes the picture but not the range: the graph still climbs to every possible height between one asymptote and the next. The 4 does the only work that earns a mark, cutting the tangent's 180° period down to 45°." },
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
      prompt: { en: `${ASK} &nbsp;y = 6 sin ½x.` },
      hint: { en: "Ask how many halves fit into 360° — that is the division you actually need. Then check your answer feels right: does a b below 1 make the graph wider or narrower?" },
      memo: scMemo(
        "Period = 360° ÷ ½ = 360° × 2 = <b>720°</b>",
        "Amplitude = |a| = |6| = <b>6</b>",
        "Range: the midline is y = 0, so 6 up and 6 down.",
        "Period = 720° &nbsp;·&nbsp; Amplitude = 6 &nbsp;·&nbsp; Range: y ∈ [−6 ; 6]",
      ),
      esplain: { en: "The two numbers here pull as hard as they can in opposite directions, which makes this a good one to picture rather than only calculate. The 6 stretches the wave up and down until it reaches from −6 to 6, so it is a tall graph. The half stretches it sideways, doubling how long one wave takes, so it is also a very wide graph — one single wave now takes a full 720°, which is two turns of the circle. The division is the part to be careful with. Dividing by a half never makes a number smaller: 360° ÷ ½ is the same as 360° × 2, which is 720°. If your period comes out at 180° you have divided the wrong way round, and a quick picture of one long slow wave is enough to catch it." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: `${ASK} &nbsp;y = −cos x − 2.` },
      hint: { en: "Two minus signs, and they are doing two completely different jobs. One flips the graph and one drops it. Find the midline first, then step one amplitude each way from there." },
      memo: [
        { type: "step", text: { en: "Period = 360° ÷ 1 = <b>360°</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Amplitude = |a| = |−1| = <b>1</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Range: the − 2 on the end puts the midline at y = −2. One amplitude up is −2 + 1 = −1; one amplitude down is −2 − 1 = −3." } },
        { type: "answer", text: { en: "Period = 360° &nbsp;·&nbsp; Amplitude = 1 &nbsp;·&nbsp; Range: y ∈ [−3 ; −1]" }, ticks: ["a"] },
        NEG_A_TRAP,
      ],
      esplain: { en: "Two minus signs in one equation, and they never mean the same thing. The first one sits in front of the cos and flips the graph upside down. The second one sits on the end and drops the whole picture two units. Sort them by position, not by feel. The amplitude comes from the first: the size of −1 is 1. The midline comes from the second: y = −2. Then step, and be careful with the signs on the way — one up from −2 is −1, one down from −2 is −3, so the range is from −3 to −1. Write the smaller number first, always. This graph lives entirely below the x-axis, which is another way to check your answer: if either end of your range came out positive, something has gone wrong." },
    },
    {
      id: "c", marks: 2, level: 3,
      prompt: { en: `${ASK} &nbsp;y = 3 tan(x − 30°).` },
      hint: { en: "Two numbers, and neither of them is a b. Work out what is actually multiplying the x, and remember what a sideways slide does to a range." },
      memo: tanMemo(
        "Period = 180° ÷ 1 = <b>180°</b> &nbsp;&nbsp;<i>(nothing is multiplying the x, so b = 1; the 30° only slides the graph)</i>",
        "Period = 180° &nbsp;·&nbsp; Amplitude: none &nbsp;·&nbsp; Range: y ∈ ℝ",
      ),
      esplain: { en: "This is the hardest-looking one on the card and the shortest to answer, which is exactly why it is here. There are two numbers, and neither of them changes a single thing you have been asked for. The 3 in front would be an amplitude on a sine or cosine, but a tangent has no highest or lowest point, so there is nothing for it to measure. The 30° inside the bracket slides the whole graph 30° to the right, and a sideways slide never changes a period, an amplitude or a range. The only number that matters is the invisible 1 multiplying the x, which gives a period of 180°. If you can look at an equation and say confidently which numbers are decoys, you are reading the form properly rather than pattern-matching." },
    },
  ],
};

export const tgraphPeriodAmplitudeRangeQuestions = [q1, q2, q3, q4, q5, q6];
