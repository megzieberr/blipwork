/* ============================================================
   EXAM FOCUS — Functions · Hyperbola & exponential (T2)
   SOURCE: September Test 2 (practice), QUESTION 3 — one hyperbola
   carrying asymptotes, a symmetry axis, a transformation, a painted
   inequality, and a starred discriminant tail.
   (Overnight run #1, stage 3b, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Sept-T2-Practice-QP.tex      Q3 stem + (a)–(e)
     Sept-T2-Practice-Memo.tex    3(a)–3(e), 12 ticks, ★ on 3(e)
     Sept-T2-blueprint.md         §1, §3 "her methods, where they govern"
   Same working, same ticks, same WATCH OUT / REMEMBER cards as print.

   NO DIAGRAM NEEDED FOR THE STEM, unlike the T1 hyperbola — T2's Q3
   gives the EQUATION, f(x) = 4/(x + 1) + 2, and no sketch was printed;
   every part is answered off the equation, and the words-only stem
   stays exactly as printed (nothing added here). The only drawing in
   the print memo is 3(d)'s painted cut line, carried in words inside
   the memo (see below).

   SESSION 1 (2026-08-22) still gives this question a `diagram` — a
   plain sketch of the curve, for the same "here's what this actually
   looks like" reason a textbook shows one even when the working is
   algebraic — but DELIBERATELY WITHOUT its asymptotes drawn or a grid:
   (a) is the one part in this whole chapter that asks the learner to
   DERIVE the asymptotes FROM the equation, and an accurately-plotted
   hyperbola on a gridded, dashed-asymptote figure would let a learner
   read x = −1 / y = 2 straight off the picture instead of doing that
   — the exact "diagram hands over the answer" failure CLAUDE.md's
   gotcha #3 warns about, just visual instead of a table total. The
   curve itself is still real and to-scale (never a fake approximation
   — same rule everywhere else); it is only the coordinate-reading AIDS
   (grid, dashed guide lines) that are withheld until (a) is revealed,
   at which point the centre (−1 ; 2) — the two numbers (a)'s own
   answer already named — is marked and both asymptotes are drawn in,
   captioned x = −1 and y = 2. SESSION 1b (2026-08-22) put those two
   dashed lines on the QUESTION side of (b), (c), (d) and (e) as well:
   every one of them comes after (a), and every skill card cut from one
   of them states f(x) = 4/(x + 1) + 2 in its own intro, so the lines
   can never be ahead of what the learner has been told. (b) also
   carries the centre forward, which its axis of symmetry needs.

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers throughout —
     · the stem reads the form off first (a = 4, p = −1, q = 2) exactly
       as her notes do;
     · 3(b) uses her "two axes of symmetry through (p ; q), gradients
       ±1" framing;
     · 3(c) is a shift read as x → x + 2 inside and −4 outside;
     · 3(d) is her PAINT method — cut the line at the asymptote, paint
       + and − on each section, read it off. NO SIGN TABLE ANYWHERE
       (she moved off the tekentabel after watching learners struggle;
       where her notes and older app code disagree, the notes win);
     · 3(e) is her pp52–58 "for which k does it not intersect" card:
       Δ < 0, with the touching-is-still-meeting warning she makes on
       the board.
   None of the digest's four flagged slips is anywhere near this
   question (blueprint §3 confirms).

   LEVELS: 1:1 with T2's blueprint — (a) 1, (b) 2, (c) 2, (d) 3, (e) 4.
   3(e) is one of T2's two printed ★ parts, so the star the schema
   derives from level === 4 lands exactly where the paper puts it. ✓

   TOPIC: shares `hyperbola-and-exponential` with
   js/exam/func-hyperbola-and-exponential.js (Sept T1 Q4), which takes
   that block to two questions. The two do NOT overlap: T1's asks the
   learner to BUILD the equation from asymptotes and a point and ends on
   a sign question; this one HANDS over the equation and ends on a
   discriminant. Different work, same shelf.

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

const PAPER = "sept-t2";

/* DIAGRAM (SESSION 1, 2026-08-22; asymptote overlay added SESSION 1b).
   f(x) = 4/(x + 1) + 2. The BASE spec draws no asymptotes and no grid
   (see the header note above: (a) has to DERIVE the asymptotes, so the
   figure must not hand them over), and (a)'s question side inherits that
   bare picture. From (a)'s own REVEAL onward the two dashed, captioned
   lines are added — and they are on the question side of (b), (c), (d)
   and (e), every one of which comes after (a). The centre (−1 ; 2) is
   NOT on the curve (it is where the asymptotes cross), so its point omits
   `on` — verifyFunction only checks points that claim to sit ON a
   curve; the asymptote entries DO carry `of: 0`, so verifyFunction proves
   each line matches the curve's own p and q. */
const H2 = { kind: "hyperbola", a: 4, p: -1, q: 2 };
const H2_CENTRE = { x: -1, y: 2, label: "(−1 ; 2)" };
/* The two dashed guide lines, withheld from the BASE spec and from (a)'s
   question side because (a) is the part that has to derive them — but added
   back (SESSION 1b, 2026-08-22) from (a)'s own reveal onward, and on the
   question side of (b)–(e), which all come AFTER (a). Every skill card cut
   from one of those later parts states f(x) = 4/(x + 1) + 2 in its own intro,
   so the lines never say anything the learner has not already been told. */
const H2_ASYM = [{ x: -1, of: 0, label: "x = −1" }, { y: 2, of: 0, label: "y = 2" }];

/* THE REVEAL DRAWS WHAT IT FOUND (SESSION 2a-FIX, 2026-08-22 — the rule now
   written into js/exam/_schema.js's diagram doc comment). Each of (b)–(e)
   answers with a LINE, a GRAPH or an INTERVAL, and each of those is now on
   the picture instead of only in the memo:
     (b) the negative-gradient axis of symmetry, y = −x + 1, dashed and named;
     (c) h itself — the shifted hyperbola — in tone b, with its own two
         captioned asymptotes x = −3 and y = −2 (they are plain dashed lines;
         the engine has no coloured asymptotes and this session did not add
         any, since the caption already says whose they are);
     (d) the answer x < −3, painted as a shaded strip from the left edge of
         the window to the cut at x = −3. (d) is ALSO the one part that is
         entirely about h and not about f, so it gets its OWN spec — h alone,
         centred on its own asymptotes — rather than reading h off a picture
         built around f. The only card that reaches (d) is func.hyp.t2q3.cd,
         which plays (c) first, so h is never a surprise;
     (e) the two boundary lines the memo's k = 5 and k = −3 name,
         y = −x + 5 and y = −x − 3, dashed and named. */
const H2_H = { kind: "hyperbola", a: 4, p: -3, q: -2 };
const H2_H_ASYM = [{ x: -3, label: "x = −3" }, { y: -2, label: "y = −2" }];
const H2_B_LINE = { kind: "line", a: -1, q: 1, dash: true, tone: "b", label: "y = −x + 1", labelAt: -4 };
const H2_E_LINES = [
  { kind: "line", a: -1, q: 5, dash: true, tone: "b", label: "y = −x + 5", labelAt: -2.5 },
  { kind: "line", a: -1, q: -3, dash: true, tone: "c", label: "y = −x − 3", labelAt: 0 },
];
/* (c)'s own widened spec (NIT FIX, 2026-08-23): h's lower-left branch runs
   off to y → −∞ as x → −3 from the left, and at the base spec's ymin = -4 it
   only reached x = -5 — a stub tucked in the bottom-left corner, not a
   readable branch. ymin -8 lets it fall to x ≈ −3,67 before it hits the
   floor, and xmin -7 keeps a comfortable margin on the left; f (curve 0)
   stays exactly as before, just smaller on the wider canvas. */
const H2_C_SPEC = {
  type: "function",
  win: { xmin: -7, xmax: 4, ymin: -8, ymax: 8 },
  curves: [{ ...H2, tone: "a", label: "f", labelAt: 3 }],
};
/* (d)'s own picture: h on its own axes, both asymptotes given and captioned. */
const H2_D_SPEC = {
  type: "function",
  win: { xmin: -8, xmax: 2, ymin: -8, ymax: 4 },
  curves: [{ ...H2_H, tone: "b", label: "h", labelAt: -5 }],
  asymptotes: [{ x: -3, of: 0, label: "x = −3" }, { y: -2, of: 0, label: "y = −2" }],
};
const H2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -6, xmax: 4, ymin: -4, ymax: 8 },
    curves: [{ ...H2, tone: "a", label: "f", labelAt: 3 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [H2_CENTRE], asymptotes: H2_ASYM } },  // the centre IS (a)'s answer, as a pair
    b: {                                                                       // (b)'s axis needs the centre — already given
      question: { points: [H2_CENTRE], asymptotes: H2_ASYM },
      reveal: { points: [H2_CENTRE], asymptotes: H2_ASYM, curves: [H2_B_LINE] },
    },
    c: {
      spec: H2_C_SPEC,
      question: { asymptotes: H2_ASYM },
      reveal: {
        asymptotes: H2_ASYM.concat(H2_H_ASYM.map((a) => ({ ...a, of: 1 }))),
        curves: [{ ...H2_H, tone: "b", label: "h", labelAt: 2 }],
      },
    },
    d: { spec: H2_D_SPEC, question: {}, reveal: { shades: [{ x0: -8, x1: -3 }] } },
    e: {
      question: { asymptotes: H2_ASYM },
      reveal: { asymptotes: H2_ASYM, curves: H2_E_LINES },
    },
  },
};

const t2q3 = {
  id: "func.hyp.t2q3",
  chapter: "func",
  topic: "hyperbola-and-exponential",
  archetype: "hyperbola-from-its-equation-ending-on-a-discriminant",
  paper: PAPER,
  diagram: H2_DIAGRAM,
  // fn3 "Hyperbola & exponential" — asymptotes, branches, domain &
  // range. The question is one hyperbola from end to end; (c) borrows
  // fn6 and (e) borrows fn7, but fn3 is the round that teaches the
  // shape the whole question stands on.
  lostQuest: { chapter: "func", quest: "fn3" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The graph of f is defined by &nbsp;f(x) = 4/(x + 1) + 2.<br><br>Write down the equations of the asymptotes of f.",
      },
      hint: {
        en: "Line the equation up against the standard shape y = a/(x − p) + q and read p and q straight off. Look hard at the sign in the denominator.",
      },
      memo: [
        { type: "step", text: { en: "Read the form off first: &nbsp;f(x) = a/(x − p) + q &nbsp;with&nbsp; a = 4, &nbsp;p = −1, &nbsp;q = 2. The vertical asymptote is x = p and the horizontal asymptote is y = q." } },
        { type: "answer", text: { en: "x = −1 &nbsp;&nbsp;and&nbsp;&nbsp; y = 2" }, ticks: ["a", "a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x + 1) in the denominator means p = −1, not +1 — the bracket always shows the <i>opposite</i> sign. Same trap as the turning point of a parabola.",
        } },
      ],
      esplain: {
        en: "The asymptotes are the two lines the graph creeps towards but never touches, and both are already sitting in the equation once you line it up with the standard shape. The vertical one comes from the denominator: x + 1 is zero at x = −1, and dividing by zero is the one thing the graph cannot do, so it goes around that line forever. The horizontal one is the + 2 on the end. Make the fraction as tiny as you like by pushing x out towards infinity, and what is left is 2 — so the graph settles towards y = 2 without ever arriving. The sign flip on p is the only place marks go missing: the standard form says (x − p), so a bracket reading (x + 1) means p is negative one.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the equation of the axis of symmetry of f that has a <b>negative</b> gradient.",
      },
      hint: {
        en: "Both axes of symmetry go through the point where the asymptotes cross — x = −1 and y = 2, so that point is (−1 ; 2). A negative gradient on a hyperbola means one particular value; put it and the point into y = mx + c.",
      },
      memo: [
        { type: "step", text: { en: "Both axes of symmetry go through the point where the asymptotes cross, (−1 ; 2). The one with a negative gradient is y = −x + c:" } },
        { type: "step", text: { en: "2 = −(−1) + c" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "2 = 1 + c &nbsp;⟹&nbsp; c = 1 &nbsp;&nbsp;∴&nbsp; y = −x + 1" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the centre is (−1 ; 2), not (1 ; 2). Substitute the point you actually read off the asymptotes, and substitute it with its own signs.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: every hyperbola has <b>two</b> axes of symmetry through (p ; q) — y = x + c and y = −x + c. Read which one the question wants before you start.",
        } },
      ],
      esplain: {
        en: "A hyperbola's two mirror lines are the diagonals through the corner where the asymptotes meet — one rising at 45°, one falling at 45°. That is why their gradients are always exactly 1 and −1, whatever a happens to be, and why “the one with a negative gradient” picks one out without any further information. From there it is Grade 9 work: you have a gradient and a point on the line, so put them into y = mx + c and solve for c. The one place to slow down is substituting a negative x into −x, which turns into +1 — write the brackets in rather than doing it in your head.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "The graph of h is obtained by shifting the graph of f two units to the LEFT and four units DOWN.<br>Write down the equation of h.",
      },
      hint: {
        en: "Handle the two shifts separately, and in the right places: a sideways shift happens inside the bracket, a vertical one outside. The sideways direction is the one that feels backwards.",
      },
      memo: [
        { type: "step", text: { en: "Two units to the left replaces x by x + 2:" } },
        { type: "step", text: { en: "4/((x + 2) + 1) + 2 = 4/(x + 3) + 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Four units down subtracts 4 from the whole thing:" } },
        { type: "answer", text: { en: "h(x) = 4/(x + 3) + 2 − 4 = 4/(x + 3) − 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: LEFT is +2 <i>inside</i> the bracket. It feels backwards and it is not: the whole picture slides left, so every x has to be fed a bigger number to land where it used to. Down is −4 <i>outside</i>, where it behaves the way you expect.",
        } },
      ],
      esplain: {
        en: "The reason a horizontal shift looks inside-out is worth getting straight once, because it comes back every year. The graph does not move because x changes; the graph moves because you have changed what the machine does to each x. Slide the picture two units left and the point that used to sit above x = 0 now sits above x = −2 — so to get the old output at the new place, the machine has to add 2 to whatever it is handed first. Hence x + 2 inside. A vertical shift has no such trickery: after the machine has finished, you simply take 4 off the answer, so the −4 sits outside and does exactly what it says. A quick sanity check on your answer: the asymptotes should have moved the same way as the graph, and they have — x = −1 became x = −3, and y = 2 became y = −2.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 3,
      prompt: {
        en: "Determine the values of x for which &nbsp;h(x) &lt; −2.",
      },
      hint: {
        en: "Look at what −2 actually is for h — you worked it out in (c). Get one side to zero rather than multiplying anything across, then cut the line at the asymptote and paint each section.",
      },
      memo: [
        { type: "step", text: { en: "−2 is exactly h's horizontal asymptote, so the question is really “where does h lie <i>below</i> its own asymptote?”" } },
        { type: "step", text: { en: "4/(x + 3) − 2 &lt; −2 &nbsp;⟹&nbsp; 4/(x + 3) &lt; 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "4 is positive, so the fraction can only be negative when the denominator is negative. Cut the line at the asymptote x = −3 and <b>paint</b> each side: left of −3 the fraction is <b>−</b> (h is below y = −2), right of −3 it is <b>+</b> (h is above y = −2)." } },
        { type: "answer", text: { en: "the painted − section is the left one: &nbsp;x + 3 &lt; 0 &nbsp;⟹&nbsp; x &lt; −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never multiply an inequality by (x + 3) — you do not know whether it is positive or negative, so you do not know whether to turn the sign around. Get one side to 0, then paint the sections.",
        } },
      ],
      esplain: {
        en: "Two small ideas do all the work. The first is noticing that −2 is not a random number: it is h's own horizontal asymptote, so subtracting it wipes out the whole tail of the expression and leaves a bare fraction. That is why the inequality collapses to “when is 4/(x + 3) negative?” instead of turning into anything messy. The second is her paint method. A fraction can only change sign where its top is zero or its bottom is zero, so you cut the line at those places — here only at the asymptote x = −3 — and then each section can be painted with a single + or − because nothing inside a section can change. The top is a fixed positive 4, so the sign of the whole fraction is simply the sign of the bottom: negative to the left of −3, positive to the right. Read the painted − section off and you are done. And notice the answer has no closed end — x = −3 is an asymptote, so it can never be included.",
      },
    },
    {
      id: "e",
      marks: 4,
      level: 4,
      prompt: {
        en: "Determine the values of k for which the line &nbsp;y = −x + k&nbsp; will NOT cut the graph of f.",
      },
      hint: {
        en: "“Does not cut” is a statement about how many solutions the two equations have together. Set them equal, clear the fraction to get an ordinary quadratic, and then think about what the discriminant has to do.",
      },
      memo: [
        { type: "step", text: { en: "“Does not cut” means the two equations have <b>no real solution</b> together. So set them equal and force the discriminant negative." } },
        { type: "step", text: { en: "4/(x + 1) + 2 = −x + k &nbsp;&nbsp;— multiply everything by (x + 1), &nbsp;x ≠ −1: &nbsp;&nbsp;4 + 2(x + 1) = (−x + k)(x + 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2x + 6 = −x² − x + kx + k &nbsp;⟹&nbsp; x² + (3 − k)x + (6 − k) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "No real roots means Δ &lt; 0: &nbsp;Δ = (3 − k)² − 4(1)(6 − k) = 9 − 6k + k² − 24 + 4k = k² − 2k − 15 = (k − 5)(k + 3)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "(k − 5)(k + 3) &lt; 0 &nbsp;⟹&nbsp; −3 &lt; k &lt; 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: Δ &lt; 0, not Δ ≤ 0. At k = −3 and at k = 5 the discriminant is zero, which means <i>equal roots</i> — the line touches the graph once. Touching is still meeting, so those two values must be left out.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: “does not cut” = “no real solution” = Δ &lt; 0. It is the same sentence you use on a parabola-and-line question; the only extra step here is clearing the fraction first.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch is that “cutting” and “solving” are the same thing said two ways. Wherever the line meets the curve, both equations are true at once, so setting them equal turns a picture question into an algebra question — and once the fraction is cleared it is an ordinary quadratic. Now the discriminant is doing what it always does: two real roots means two crossings, one repeated root means the line just touches, and no real roots means the line and the curve never meet at all. The question asked for the last case, so Δ has to be strictly negative. Two details decide the marks. The first is the strictness — at Δ = 0 the line grazes the graph, and grazing counts as meeting, so the endpoints are out. The second is what happens after you factorise Δ: (k − 5)(k + 3) &lt; 0 is itself a quadratic inequality, so it is a happy parabola in k and “less than zero” is the inside of the bowl, between −3 and 5. Bank the earlier marks first — (a) to (d) are all straightforward, and this is the one to come back to.",
      },
    },
  ],
};

export const funcHyperbolaAndExponentialT2Questions = [t2q3];
