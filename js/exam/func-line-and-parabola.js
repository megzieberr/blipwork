/* ============================================================
   EXAM FOCUS — Functions · Line & parabola
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-FUNCTIONS-NOTES-DIGEST.md's candidate list, the two
   biggest gaps between her 59 pages of notes and what the app already
   trains — "finding equations from sketches" (her pp25–28, route 1:
   x-intercepts + a point) and "k-value / nature-of-roots questions"
   (her pp52–58, f(x) = k slides a horizontal line). Transformations
   (her pp19–24) carry the middle. Fresh intercepts, fresh point.

   ORIGINALLY DIAGRAM-LIGHT ON PURPOSE (overnight run #1): the schema
   had no diagram field yet, so this question was composed in the
   "equation from a DESCRIPTION" form — every fact a sketch would have
   carried is stated in the stem as words and coordinates instead.
   SESSION 1 (2026-08-22, function-graph engine wired in) added the
   `diagram` block below without touching a single word of the stem or
   memo, exactly as planned: the sketch only ever shows what the words
   already say (or what an earlier part's own memo already revealed),
   never the turning point or the k-range ahead of the part that finds
   them — see the `diagram.parts` comments inline.

   SKELETON DISTANCE — checked against Sept T1 Q4 and Q5:
     · T1 Q4 is a HYPERBOLA (equation from asymptotes + a point).
     · T1 Q5 is a SAD parabola meeting a line, and its level-4 tail is
       a max-vertical-segment plus a two-condition t-range. This one is
       a HAPPY parabola, alone; its equation comes from x-intercepts
       rather than from a turning point; and its k-tail is the opposite
       question — for which k does the sliding line MISS the graph
       entirely. Nothing overlaps.
     · The transformation part (d) has no counterpart anywhere in T1
       (blueprint §6 lists "transformations in function notation" as a
       skill T1 does not test).

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers — happy/sad; equation
   of a parabola from two x-intercepts and a point, y = a(x − x₁)(x − x₂);
   x = −b/(2a) then substitute back; turning-point form y = a(x − p)² + q
   with TP(p ; q) "opposite sign"; shifts read off the turning point;
   f(x) = k as a horizontal line sliding across the graph, with Δ rules
   ↔ number of intersections. None of the digest's four flagged slips is
   mined — in particular slip #1 (her p54 f, the sign error on "two real
   positive roots") is avoided entirely, because (e) asks about NO real
   roots and is derived from the minimum, not from her p54 line.

   LEVELS: 2, 2, 1, 3, 4 — ★ on (e), the only part whose deciding fact
   (the minimum value) is not written anywhere in the question.

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

/* DIAGRAM (SESSION 1, 2026-08-22). f(x) = 2x² − 6x − 8 = 2(x + 1)(x − 4),
   TP(1,5 ; −12,5) — every number here is read straight off the memo
   above, never invented. The base spec shows only what the STEM itself
   states in words: the two x-intercepts and the y-intercept (0 ; −8) —
   exactly the three given facts (a) works from. The turning point is
   what (b) is ASKED to find, so it is never on the base spec; it is
   added by (b)'s OWN reveal, and then carried (as an ALREADY-GIVEN
   fact) into (c), (d) and (e)'s question side — every card that cuts
   one of those three parts on its own gives the same fact through its
   `intro` (js/exam/cards-func.js's PARABOLA string), so showing it
   there is never ahead of what the learner has already been told. */
const F1 = { kind: "parabola", a: 2, b: -6, c: -8 };
const F1_TP = { x: 1.5, y: -12.5, label: "TP(1,5 ; −12,5)", on: 0, place: "above" };
/* (e)'s answer is k < −12,5 — a FAMILY of horizontal lines with one boundary,
   the line that just grazes the turning point. SESSION 2a-FIX draws that
   boundary on (e)'s reveal (dashed, named), so "below the minimum" is
   something the learner can see rather than only read: any line lower than
   this one passes underneath the whole parabola. */
const F1_K_BOUND = { kind: "line", a: 0, q: -12.5, dash: true, tone: "b", label: "y = −12,5", labelAt: -1.5 };
/* (d)'s answer IS a graph — g = f shifted 2 left and 5 up — so (d)'s reveal
   draws it (tone b, named) beside f, the same rule the axis-of-symmetry shift
   cards follow. */
const G1 = { kind: "parabola", a: 2, p: -0.5, q: -7.5, tone: "b", label: "g", labelAt: -2.2 };
const F1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 6, ymin: -15, ymax: 3 },
    curves: [{ ...F1, tone: "a", label: "f", labelAt: -1.2 }],
    points: [
      { x: -1, y: 0, on: 0, label: "(−1 ; 0)" },
      { x: 4, y: 0, on: 0, label: "(4 ; 0)" },
      { x: 0, y: -8, on: 0, label: "(0 ; −8)" },
    ],
  },
  parts: {
    a: { question: {} },                                       // just the three given facts
    b: { question: {}, reveal: { points: [F1_TP] } },           // TP is the answer — reveal only
    c: { question: { points: [F1_TP] } },                       // TP already given (intro / chain)
    d: { question: { points: [F1_TP] }, reveal: { points: [F1_TP], curves: [G1] } },
    e: { question: { points: [F1_TP] }, reveal: { points: [F1_TP], curves: [F1_K_BOUND] } },
  },
};

const q1 = {
  id: "func.lp.q1",
  chapter: "func",
  topic: "line-and-parabola",
  archetype: "parabola-equation-from-intercepts-then-shift-then-k-value",
  lostQuest: { chapter: "func", quest: "fn2" },
  marks: 13,
  diagram: F1_DIAGRAM,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "A parabola f cuts the x-axis at (−1 ; 0) and at (4 ; 0), and passes through the point (0 ; −8).<br><br>Determine the equation of f in the form y = ax² + bx + c.",
      },
      hint: {
        en: "When you are handed both x-intercepts, start from the factorised shape y = a(x − x₁)(x − x₂) — the brackets are already decided. The third point is there to pin down the only letter still missing.",
      },
      memo: [
        { type: "step", text: { en: "Two x-intercepts are given, so start from &nbsp;y = a(x − x₁)(x − x₂):" } },
        { type: "step", text: { en: "y = a(x + 1)(x − 4)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute the third point (0 ; −8): &nbsp;−8 = a(0 + 1)(0 − 4) = −4a &nbsp;⟹&nbsp; a = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f(x) = 2(x + 1)(x − 4) = 2x² − 6x − 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bracket takes the OPPOSITE sign of the intercept. An x-intercept at −1 gives (x + 1), not (x − 1) — check it by asking what x would make the bracket zero.",
        } },
      ],
      esplain: {
        en: "Two x-intercepts tell you where the graph is zero, and a product is zero exactly when one of its factors is zero — so the two brackets write themselves. What they cannot tell you is how steep or how flat the curve is, because a whole family of parabolas passes through the same two points, some narrow, some wide, some upside down. That is what a is for, and that is why the question gives you a third point: put its x and y into the equation and the only unknown left is a. Once you have it, expand into the form you were asked for — the question said y = ax² + bx + c, so the factorised version is working, not the answer.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the turning point of f.",
      },
      hint: {
        en: "Find the x of the turning point first with x = −b/(2a), then substitute it back into f to get the y. (There is a quick check available: the turning point always sits exactly midway between the two x-intercepts.)",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = −(−6)/(2(2)) = 6/4 = 1,5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "y = 2(1,5)² − 6(1,5) − 8 = 4,5 − 9 − 8 = −12,5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "TP(1,5 ; −12,5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: −b/(2a) gives you only the x of the turning point. Stopping there and writing TP(1,5) throws away the second half of the answer — you still have to substitute back to find the y.",
        } },
      ],
      esplain: {
        en: "A parabola is perfectly symmetrical, so its turning point sits on the mirror line, exactly halfway between the two crossings — and −b/(2a) is the formula that finds that halfway x for you. You can check it here without any algebra: the intercepts are at −1 and 4, and halfway between them is 1,5. The y is a separate job. The formula only ever hands you an x, so put that x back into f and work out the height there. Write the answer as a coordinate, with the semicolon; the comma is doing decimal duty in both numbers.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the range of f.",
      },
      hint: {
        en: "Range is about y. Which way up is this parabola — and does that make the turning y-value a floor or a ceiling?",
      },
      memo: [
        { type: "answer", text: { en: "a = 2 &gt; 0, so f is <b>happy</b> and −12,5 is its minimum &nbsp;∴ y ≥ −12,5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The sign of a decides everything here. It is positive, so the arms point upwards: the graph falls to the turning point, then climbs forever, which makes that turning y-value the lowest the graph ever gets and everything above it reachable. So the range runs upward from it. Had a been negative the parabola would be sad and the same number would have been a ceiling instead, with the range running downwards. One mark, one decision — but it is the decision the whole answer hangs on.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 3,
      prompt: {
        en: "The graph of g is obtained by shifting f two units to the LEFT and five units UP.<br>Write down the equation of g in the form y = a(x − p)² + q.",
      },
      hint: {
        en: "The answer is asked for in turning-point form, so write f in turning-point form first — you already have its turning point. Then move that point, and leave a exactly as it is.",
      },
      memo: [
        { type: "step", text: { en: "Write f in turning-point form first, using TP(1,5 ; −12,5): &nbsp;f(x) = 2(x − 1,5)² − 12,5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "two units left moves the turning point to x = 1,5 − 2 = −0,5 &nbsp;·&nbsp; five units up moves it to y = −12,5 + 5 = −7,5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = 2(x + 0,5)² − 7,5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: in y = a(x − p)² + q the p sits inside the bracket with the OPPOSITE sign. A turning point at x = −0,5 gives (x + 0,5)², not (x − 0,5)². The q, outside the bracket, keeps its own sign.",
        } },
      ],
      esplain: {
        en: "A shift does not bend a graph, it only carries it — so a never changes, and the width and direction stay exactly as they were. All that moves is the turning point, which makes turning-point form the natural place to work: p and q ARE the turning point's coordinates, so shifting the graph is just shifting two numbers. Two left takes 2 off the x-coordinate; five up adds 5 to the y-coordinate. The only place people lose the mark is the sign flip inside the bracket, and the safe check is to ask what value of x makes the bracket zero — it should be your new turning-point x.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine the value(s) of k for which the equation f(x) = k will have NO real roots.",
      },
      hint: {
        en: "f(x) = k is a horizontal line y = k sliding up and down across f, and the roots are wherever it cuts. Picture it sliding downwards — at what height does it stop cutting the graph altogether?",
      },
      memo: [
        { type: "step", text: { en: "f(x) = k is the horizontal line y = k sliding up and down across f. Its roots are the points where the line cuts the parabola, so the question is: where must the line sit to miss it completely?" }, ticks: ["ca"] },
        { type: "step", text: { en: "f is <b>happy</b> with a minimum of −12,5 at TP(1,5 ; −12,5), so a line below that minimum never reaches the graph at all" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &lt; −12,5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: at k = −12,5 exactly, the line touches the turning point — that is ONE real (equal) root, not none. “No real roots” has to be strictly below the minimum: k &lt; −12,5, with no equals sign.",
        } },
      ],
      esplain: {
        en: "Do not solve 2x² − 6x − 8 = k for x — picture the line instead. Every horizontal line y = k either cuts the parabola twice, touches it once, or misses it, and which of the three happens depends only on where k sits relative to the turning point. This parabola is happy, so it has a floor at −12,5: any line above that floor cuts both arms, a line exactly on it touches at one point, and any line below it passes underneath the whole graph and never meets it. That last case is the one asked for. The fact that decides it, the minimum −12,5, is not something you calculate here — it's a leftover from earlier work, sitting quietly above as given information while this part asks something new of it, which is exactly why this part carries the star. If you would rather do it with algebra, the same answer comes out of Δ &lt; 0 for 2x² − 6x − 8 − k = 0, and both roads earn full marks.",
      },
    },
  ],
};

export const funcLineAndParabolaQuestions = [q1];
