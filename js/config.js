/* ============================================================
   CONFIG — chapters, the shared colour palette, XP rules.
   ------------------------------------------------------------
   Colour system (revised again — Solo Leveling "system" style): a
   small curated set of luminous game-rarity accents on the near-black
   navy shell (see css/styles.css tokens). Same structure as before —
   no per-chapter hue families, the 5 accents cycle down the chapter
   list so neighbouring chapters read as visually distinct; every
   quest in a chapter shares its chapter's one accent. Values chosen
   to glow cleanly on #070b16 next to the electric-blue chrome.
   ============================================================ */
const PALETTE = {
  blue:    "#3aa0ff",   // primary — the system's own electric blue
  violet:  "#8b5cf6",   // arcane violet (matches --accent2 family)
  cyan:    "#22d3ee",   // ice cyan
  gold:    "#fbbf24",   // legendary gold
  fuchsia: "#e879f9",   // rare-drop fuchsia
  /* SIXTH ACCENT, added 2026-08-23 for the new exam-only "algx" chapter
     (EXAM-BUILD-DAY.md). The brief asked for "a PALETTE colour no chapter
     uses" — there wasn't one left: blue is on stats/func/eqn, violet on
     finance/tgraph/gtrig/euclid, cyan on prob/analytical, gold on
     trig/pat, fuchsia on meas/exp. Rather than hand Algebraic
     Expressions a colour already worn by three other chapters, the
     curated set grows by one. Mint reads clean on #070b16 and is far
     enough from cyan to be told apart at a glance; it also stays clear
     of the amber ★ used by the Level 4 tiles. Nothing else uses it. */
  mint:    "#34d399",   // fresh-start mint (algx only)
};
const CYCLE = [PALETTE.blue, PALETTE.violet, PALETTE.cyan, PALETTE.gold, PALETTE.fuchsia];

export const CHAPTERS = [
  {
    id: "stats", name: "Statistics", paper: "Paper 2", icon: "📊", term: "term3",
    signature: PALETTE.blue, open: true,
    blurb: "Data, spread, graphs and the shape of a distribution.",
    quests: [
      { id: "q1", n: 1, title: "Calculator skills", blurb: "Clear it, frequency on/off, read values back.", built: true },
      { id: "q2", n: 2, title: "Centre & spread", blurb: "Mean, mode, median, range from a list.", built: true },
      { id: "q3", n: 3, title: "Quartiles & box plots", blurb: "Quartile positions, IQR, outliers, box-and-whisker.", built: true },
      { id: "q4", n: 4, title: "Skewness & shape", blurb: "Normal vs skewed, the mean–median rule.", built: true },
      { id: "q5", n: 5, title: "Grouped data", blurb: "Estimated mean, modal & median class.", built: true },
      { id: "q6", n: 6, title: "Ogives", blurb: "Plot points, read median, quartiles, percentiles.", built: true },
      { id: "q7", n: 7, title: "Standard deviation", blurb: "σ, variance, values within one σ.", built: true },
      { id: "q8", n: 8, title: "Mixed exam favourites", blurb: "Compare plots, effect of changes, the tough ones.", built: true },
    ],
  },
  {
    id: "finance", name: "Finance", paper: "Paper 1", icon: "💰", term: "term3",
    signature: PALETTE.violet, open: true,
    blurb: "Interest, growth and the time value of money.",
    quests: [
      { id: "f1", n: 1, title: "Words & formulas", blurb: "P, A, i, n and which formula fits.", built: true },
      { id: "f2", n: 2, title: "Simple, compound & depreciation", blurb: "Interest on the original vs the growing balance; the two depreciation graphs.", built: true },
      { id: "f3", n: 3, title: "Compounding periods", blurb: "Rate per period and the exponent — monthly, quarterly, …", built: true },
      { id: "f4", n: 4, title: "Timelines: counting moves", blurb: "How many periods, forward or backward.", built: true },
      { id: "f5", n: 5, title: "Timelines: building the move", blurb: "× or ÷, the exponent's sign, and rate changes.", built: true },
      { id: "f6", n: 6, title: "Deposits & hire purchase", blurb: "The deposit and what's still owed.", built: true },
      { id: "f7", n: 7, title: "Effective vs nominal", blurb: "Annual vs a frequency, and the conversion formula.", built: true },
    ],
  },
  {
    id: "prob", name: "Probability", paper: "Paper 1", icon: "🎲", term: "term3",
    signature: PALETTE.cyan, open: true,
    blurb: "Chance, Venn diagrams, tree diagrams and the rules that tie them together.",
    quests: [
      { id: "p1", n: 1, title: "Chance & the scale", blurb: "Sample space, theoretical probability, relative frequency.", built: true },
      { id: "p2", n: 2, title: "Venn diagrams: regions", blurb: "∩, ∪, complement and the regions of a Venn diagram.", built: true },
      { id: "p3", n: 3, title: "Venn diagrams: probabilities", blurb: "Sort outcomes into regions and read probabilities off.", built: true },
      { id: "p4", n: 4, title: "The probability rules", blurb: "Addition rule, complement, mutually exclusive vs inclusive.", built: true },
      { id: "p5", n: 5, title: "Independent events", blurb: "The product rule, the test, and contingency tables.", built: true },
      { id: "p6", n: 6, title: "Tree diagrams", blurb: "Multiply along a path, add paths, ‘at least one’.", built: true },
      { id: "p7", n: 7, title: "With & without replacement", blurb: "When the denominators stay the same — and when they drop.", built: true },
    ],
  },
  {
    id: "trig", name: "2D Trigonometry", paper: "Paper 2", icon: "📐", term: "term3",
    signature: PALETTE.gold, open: true,
    blurb: "Sine, cosine and area rules — solving any triangle, drawn to scale.",
    quests: [
      { id: "t1", n: 1, title: "Which rule fits?", blurb: "Label the friends; choose sine, cosine or area for the given case.", built: true },
      { id: "t2", n: 2, title: "Sine rule: sides", blurb: "Two angles and a side → find a missing side.", built: true },
      { id: "t3", n: 3, title: "Sine rule: angles & the ambiguous case", blurb: "Find an angle, and when two triangles are possible.", built: true },
      { id: "t4", n: 4, title: "Cosine rule: sides", blurb: "Two sides and the included angle → the third side.", built: true },
      { id: "t5", n: 5, title: "Cosine rule: angles", blurb: "All three sides → any angle, acute or obtuse.", built: true },
      { id: "t6", n: 6, title: "Area rule", blurb: "Triangles, quadrilaterals and regular polygons.", built: true },
      { id: "t7", n: 7, title: "Mixed problems", blurb: "Pick the rule, combine steps, shortest-distance and area.", built: true },
    ],
  },
  {
    id: "meas", name: "Measurement", paper: "Paper 2", icon: "📦", term: "term3",
    signature: PALETTE.fuchsia, open: true,
    blurb: "Surface area and volume — read the solid, then choose the right formula.",
    quests: [
      { id: "m1", n: 1, title: "Name it & its formula", blurb: "Recognise each solid and match its volume / surface-area formula.", built: true },
      { id: "m2", n: 2, title: "Slant vs perpendicular height", blurb: "Which height goes where — volume uses H, the slanted face uses h.", built: true },
      { id: "m3", n: 3, title: "Open tops & bottoms", blurb: "Closed, open-top, or a pipe — add a circle only for each closed end.", built: true },
      { id: "m4", n: 4, title: "Composite solids", blurb: "Join two solids: add volumes, but leave out the hidden joining face.", built: true },
      { id: "m6", n: 5, title: "Find the perpendicular height", blurb: "Slant vs perpendicular — find H with the hidden right-angled triangle (cone & pyramid).", built: true },
      { id: "m5", n: 6, title: "Mixed: read it & pick the formula", blurb: "All of it, plus scaling: ×k → area ×k², volume ×k³.", built: true },
    ],
  },
  // ---- REVISION tab: chapters already taught this year, open for revision ----
  {
    id: "func", name: "Functions", paper: "Paper 1", icon: "📈", term: "revision",
    signature: PALETTE.blue, open: true,
    blurb: "The four graphs — read them, transform them, and solve inequalities off them.",
    quests: [
      { id: "fn1", n: 1, title: "The four families", blurb: "Line, parabola, hyperbola, exponential — from the equation and the graph.", built: true },
      { id: "fn2", n: 2, title: "Line & parabola", blurb: "Gradient, intercepts, happy/sad, turning point, axis of symmetry, range.", built: true },
      { id: "fn3", n: 3, title: "Hyperbola & exponential", blurb: "Asymptotes, branches, growth vs decay, domain & range.", built: true },
      { id: "fn4", n: 4, title: "Reading a graph", blurb: "Read intercepts, turning point, asymptotes, domain & range straight off the graph.", built: true },
      { id: "fn5", n: 5, title: "Inequalities off a graph", blurb: "Increasing/decreasing, f(x) > 0 or < 0, and the f·g and x·f sign rules.", built: true },
      { id: "fn6", n: 6, title: "Transformations", blurb: "Shifts, reflections and stretches — the rule and what it does.", built: true },
      { id: "fn7", n: 7, title: "Graphs together", blurb: "Intersections, f vs g, nature of roots, average gradient, max length.", built: true },
    ],
  },
  {
    id: "tgraph", name: "Trig Graphs", paper: "Paper 2", icon: "〰️", term: "revision",
    signature: PALETTE.violet, open: true,
    blurb: "Sine, cosine and tangent graphs — period, amplitude, range, shifts, drawn to scale.",
    quests: [
      { id: "tg1", n: 1, title: "The three parent graphs", blurb: "Recognise sin, cos & tan and their key features.", built: true },
      { id: "tg2", n: 2, title: "What a, b and q do", blurb: "Reflect, stretch, squash and slide the graph.", built: true },
      { id: "tg3", n: 3, title: "Period, amplitude & range", blurb: "Find all three — from the equation and off the graph.", built: true },
      { id: "tg4", n: 4, title: "Horizontal & vertical shifts", blurb: "Which way and how far — and factoring b out first.", built: true },
      { id: "tg5", n: 5, title: "The tangent graph", blurb: "Asymptotes, intercepts, period 180° and finding a.", built: true },
      { id: "tg6", n: 6, title: "Find the equation", blurb: "Read a, b and q off a graph and write the equation.", built: true },
      { id: "tg7", n: 7, title: "Putting it together", blurb: "Two graphs at once: higher/lower, positive, intersections.", built: true },
    ],
  },
  {
    id: "analytical", name: "Analytical Geometry", paper: "Paper 2", icon: "📍", term: "revision",
    signature: PALETTE.cyan, open: true,
    blurb: "Points, lines and gradients on the grid — the right formula, drawn to scale.",
    quests: [
      { id: "ag1", n: 1, title: "Which formula, and what it tells you", blurb: "Gradient, distance or midpoint — and what each answer looks like.", built: true },
      { id: "ag2", n: 2, title: "Gradient: sign & special lines", blurb: "Positive, negative, zero or undefined — and the horizontal/vertical traps.", built: true },
      { id: "ag3", n: 3, title: "Parallel & perpendicular", blurb: "Equal gradients vs the −1 product, and the negative reciprocal.", built: true },
      { id: "ag4", n: 4, title: "Angle of inclination", blurb: "Acute or obtuse? When to use 180° − tan⁻¹, and don’t type the negative in.", built: true },
      { id: "ag5", n: 5, title: "Perpendicular bisector", blurb: "Through the midpoint AND at right angles — spot it and tap it.", built: true },
      { id: "ag6", n: 6, title: "Area of a triangle", blurb: "Read the base and the ⊥height — altitude vs median.", built: true },
      { id: "ag7", n: 7, title: "Putting it together", blurb: "Median/altitude/bisector, and the ‘to prove…, show…’ table.", built: true },
    ],
  },
  {
    id: "pat", name: "Number Patterns", paper: "Paper 1", icon: "🔢", term: "revision",
    signature: PALETTE.gold, open: true,
    blurb: "Linear, quadratic and geometric patterns — the difference pyramid and the general term.",
    quests: [
      { id: "np1", n: 1, title: "Spot the pattern", blurb: "First & second differences, constant ratio — arithmetic, quadratic or geometric?", built: true },
      { id: "np2", n: 2, title: "Arithmetic patterns", blurb: "Constant difference, Tₙ = an + c, find a term and which term.", built: true },
      { id: "np3", n: 3, title: "Quadratic patterns", blurb: "The difference pyramid → a, b, c and Tₙ = an² + bn + c.", built: true },
      { id: "np4", n: 4, title: "Find a missing term", blurb: "The second difference is constant — use it to fill the gap.", built: true },
      { id: "np5", n: 5, title: "Minimum & maximum", blurb: "The turning point of the pattern: which term, and its value.", built: true },
      { id: "np6", n: 6, title: "Gaps between terms", blurb: "The first differences are their own linear pattern.", built: true },
      { id: "np7", n: 7, title: "Geometric patterns", blurb: "Constant ratio, Tₙ = a·rⁿ⁻¹, and the r-as-a-fraction traps.", built: true },
    ],
  },
  {
    id: "exp", name: "Exponents & Surds", paper: "Paper 1", icon: "ⁿ√", term: "revision",
    signature: PALETTE.fuchsia, open: true,
    blurb: "The laws, the traps, and the theory — which rule, which factorising, the conjugate, and when there's no solution.",
    quests: [
      { id: "es1", n: 1, title: "The exponent laws", blurb: "Name the law and say what happens to the exponents — zero, negative, fractional, brackets.", built: true },
      { id: "es2", n: 2, title: "Spot the trap", blurb: "Is this step legal? The base that mustn't change, x⁰, negative ≠ negative, (x+y)² ≠ x²+y².", built: true },
      { id: "es3", n: 3, title: "First step & which method", blurb: "Prime factors first; one-term simplify vs factorise when there's a + or −; the cancelling rule.", built: true },
      { id: "es4", n: 4, title: "Which “divorce”?", blurb: "Classify the factorising: common factor, difference of squares, trinomial or grouping — and let k = baseˣ.", built: true },
      { id: "es5", n: 5, title: "Surd laws & traps", blurb: "Same-root × and ÷, the BIG NO-NO, like surds, inside/outside, non-real roots and ± answers.", built: true },
      { id: "es6", n: 6, title: "Conjugates & rationalising", blurb: "What the conjugate is, why it works, rationalising one- and two-term denominators, the a + b√c form.", built: true },
      { id: "es7", n: 7, title: "Rational-exponent equations", blurb: "Raise to the reciprocal; when the answer is ±, a single (negative) value, or no real solution.", built: true },
      { id: "es8", n: 8, title: "No-solution & strategy", blurb: "Exponential & surd equations: same base, common factor, let k, isolate-square-TEST, and every no-solution trap.", built: true },
    ],
  },
  {
    id: "eqn", name: "Equations & Inequalities", paper: "Paper 1", icon: "±", term: "revision",
    signature: PALETTE.blue, open: true,
    blurb: "Which method, which move — brackets = 0, the k-method, restrictions, the bowl, and Δ. Theory and traps, no crunching.",
    quests: [
      { id: "eq1", n: 1, title: "Standard form & brackets = 0", blurb: "Everything to one side; each bracket = 0 (don't multiply out!); roots ↔ factors; EQN mode.", built: true },
      { id: "eq2", n: 2, title: "The special cases", blurb: "No b, no c, x² = negative; same-base exponents, 2ˣ = −4, and where x^(2/3) = 16 gets its ±.", built: true },
      { id: "eq3", n: 3, title: "The k-method", blurb: "A repeated bracket → let k stand for it. What k is, why you're not done at k, and the restriction that rides along.", built: true },
      { id: "eq4", n: 4, title: "Fractions & restrictions", blurb: "Factorise the denominators, the negative twin, the LCD — and restrictions BEFORE you solve.", built: true },
      { id: "eq5", n: 5, title: "Perfect squares & the turning point", blurb: "c = (b/2)² (only when a = 1!), the k sign trap, and reading TP(p ; q) — p flips, q doesn't.", built: true },
      { id: "eq6", n: 6, title: "The formula & simultaneous", blurb: "When to use it, the two lines you must show, signs into the calculator, and the substitution method.", built: true },
      { id: "eq7", n: 7, title: "Inequalities: flip & the bowl", blurb: "Switch the sign on × or ÷ negative; CP; inside the bowl vs left/right — read it off the sketch.", built: true },
      { id: "eq8", n: 8, title: "Nature of roots & know the difference", blurb: "Δ = b² − 4ac, the three pictures, the three question types — and no solution vs undefined vs non-real vs N.A.", built: true },
      /* eq9 (2026-08-23) — her own two handwritten pages on equations with
         rational exponents, added because her Grade 11 learner kept confusing
         herself. Teaches first (reveal frames), then ten pick-the-outcome
         questions. Seeded CLOSED on live — supabase/migration-eq9-solution-count.sql. */
      { id: "eq9", n: 9, title: "Two, one or no solution?", blurb: "Rational-exponent equations: even numerator → ±, odd-only → a negative is fine, even anywhere with a negative → no solution.", built: true },
    ],
  },
  /* GENERAL TRIG (id gtrig) — her 13 drill rounds, GENERAL-TRIG-BUILD-PLAN.md.
     Stage 2 (2026-08-22) built gt1–gt3 (discovery, XP-once); stage 3
     (same day) adds gt4–gt7 (co-functions, reductions ×2, TIP Chips).
     gt8–gt13 are listed here so the chapter map is complete, but stay
     `built: false` ("Coming soon") until their own stage lands.
     Colour note: the design plan said "gold is free" — it is NOT (2D
     Trigonometry and Number Patterns both already use PALETTE.gold). The
     5-colour CYCLE just keeps rolling: eqn took blue, so gtrig — the next
     chapter added — takes the next colour in the cycle, violet. */
  {
    id: "gtrig", name: "General Trig", paper: "Paper 2", icon: "🔄", term: "revision",
    signature: PALETTE.violet, open: true,
    blurb: "Reductions, co-functions, special angles, general solutions — the angle is the whole story.",
    quests: [
      { id: "gt1", n: 1, title: "Introduction", blurb: "What trig means, and where the ratios come from.", built: true },
      { id: "gt2", n: 2, title: "The Cartesian plane", blurb: "All Strippers Take Cash — why each ratio is + or −.", built: true },
      { id: "gt3", n: 3, title: "Special angles & identities", blurb: "The two triangles, Oats Are Healthy, and the masked identities.", built: true },
      { id: "gt4", n: 4, title: "Co-functions", blurb: "Convert between sin and cos — and the cos(90°+x) trap.", built: true },
      /* her reorder, 2026-08-22 evening: TIP Chips → variables → numbers ("it will
         flow better"). Ids stay (exam lostQuest → gt5, progress rows); only n and
         the live `sort` change (migration-gtrig-reorder.sql). */
      { id: "gt6", n: 5, title: "Reductions TIP Chips", blurb: "The five TIP Chips, revised.", built: true },
      { id: "gt7", n: 6, title: "Reductions: variables", blurb: "Reductions with x or θ instead of a number.", built: true },
      { id: "gt5", n: 7, title: "Reductions: numbers", blurb: "Quadrant, formula, sign, ratio — the reduction routine, step by step.", built: true },
      { id: "gt8", n: 8, title: "Special sums", blurb: "Pick the quadrant, the app draws the triangle, evaluate.", built: true },
      { id: "gt9", n: 9, title: "Identities: the next step", blurb: "Spot the move — LCD, masked identity, what simplifies.", built: true },
      { id: "gt10", n: 10, title: "Super special sums", blurb: "Where 1 and k (or t) go on the triangle.", built: true },
      { id: "gt11", n: 11, title: "General solution: the six types", blurb: "Name the type, pick the method.", built: true },
      { id: "gt12", n: 12, title: "General solution: last steps", blurb: "The quadrant cross, then the reference angle.", built: true },
      { id: "gt13", n: 13, title: "Undefined values", blurb: "Which terms must be equated to zero.", built: true },
    ],
  },
];

/* ============================================================
   EXAM-FOCUS-ONLY CHAPTERS (her ruling, morning of 2026-08-22 —
   EXAM-FOCUS-PLAN.md, "Her rulings, morning of 2026-08-22"):
   "Euclidean gets ITS OWN CHAPTER inside Blipwork — an EXAM-FOCUS-ONLY
   chapter. No drill quests (Circle Quest still owns those), so it
   appears in the Exam Focus tab only, never as a hub quest chapter."

   THIS IS A SEPARATE LIST ON PURPOSE, and that separation IS the
   mechanism. Everything that draws the rest of the app — the hub's
   Term 3 / Revision quest cards, the 🎲 dice, the admin quest
   open/close grid, assigned homework, the dashboard chips — iterates
   CHAPTERS and only CHAPTERS, so a chapter listed here is structurally
   invisible to all of them; there is no flag to forget to set. Only the
   Exam Focus screens (js/screens.js) look at both lists, through
   examChapters() / examChapterById() below.

   An entry mirrors a CHAPTERS entry's shape so the exam tab can render
   it with the identical card code, with two differences: `quests` is
   empty (it owns none, by design) and `examOnly: true` marks it for
   examChapterEligible()'s documented exception in js/screens.js.

   Icon: 🧭 rather than ⭕ — the hub already has an "⭕ Circle Geo" tab
   pointing at Circle Quest, and two circles side by side in the same
   hub would read as the same destination. Flag it if she'd rather have
   a different one; nothing else depends on the choice.
   ============================================================ */
export const EXAM_ONLY_CHAPTERS = [
  {
    id: "euclid", name: "Euclidean Geometry", paper: "Paper 2", icon: "🧭", term: "exam-only",
    signature: PALETTE.violet, open: true, examOnly: true,
    blurb: "Circle theorems, tangents and cyclic quads — real exam questions, one part at a time.",
    quests: [],
  },
  /* ALGEBRAIC EXPRESSIONS (her ruling, 2026-08-23 morning —
     EXAM-BUILD-DAY.md ruling 2): "Algebraic expressions (Gr10 revision)
     gets its own exam-only chapter — that is where the 30%-learners will
     earn their marks." The SECOND exam-focus-only chapter, and it works
     exactly like euclid above: no drill quests of its own (Blipwork has
     no Grade-10 expanding/factorising rounds, and none are planned), so
     it is structurally invisible to the hub's Term 3 / Revision tabs,
     the 🎲 dice, the admin open/close grid, assignments and the
     dashboard — all of which iterate CHAPTERS and only CHAPTERS. Its
     examOnly:true flag is what lets examChapterEligible() reach it on
     the build flag alone, since the "at least one open quest" half of
     the gate can never be satisfied for a chapter that owns none.
     Icon 🧩 — the pieces-fitting-together one, and unused elsewhere in
     the app. Colour: PALETTE.mint, added above for it. */
  {
    id: "algx", name: "Algebraic Expressions", paper: "Paper 1", icon: "🧩", term: "exam-only",
    signature: PALETTE.mint, open: true, examOnly: true,
    blurb: "Expanding, factorising and algebraic fractions — the Grade 10 skills the exam still expects.",
    quests: [],
  },
];

export function chapterById(id) { return CHAPTERS.find(c => c.id === id) || null; }

/* THE EXAM FOCUS TAB'S DISPLAY ORDER (session A of the exam build day,
   2026-08-23). Plain English: this is the order the chapter cards appear
   in when a learner opens the 📝 Exam Focus tab — BASICS FIRST.

   It exists because the natural order was wrong for the learners this
   tab was widened for. examChapters() used to hand back CHAPTERS in
   their hub order and then the exam-only ones on the end, which put
   Algebraic Expressions LAST, after Euclidean geometry — the Grade 10
   revision chapter that her weakest learners have to meet FIRST was the
   one they had to scroll furthest to reach (EXAM-BUILD-DAY.md ruling 2:
   "that is where the 30%-learners will earn their marks").

   "trig" is deliberately absent: 2D Trig is hidden from Exam Focus for
   now (her ruling 9), so it never renders. Nothing can vanish by being
   left off this list either — a flagged chapter whose id is missing
   simply falls to the END, in its existing order, which is what the
   stable sort below guarantees. */
export const EXAM_TAB_ORDER = ["algx", "exp", "eqn", "func", "tgraph", "gtrig", "euclid"];

/* Every chapter the EXAM FOCUS tab may show — quest chapters and
   exam-only ones together, in EXAM_TAB_ORDER. Exam-focus screens use
   this and examChapterById() instead of CHAPTERS / chapterById; nothing
   else does. The sort is STABLE and total: anything not named in
   EXAM_TAB_ORDER keeps its relative position at the back rather than
   disappearing. */
export function examChapters() {
  const all = CHAPTERS.concat(EXAM_ONLY_CHAPTERS);
  const rank = id => { const i = EXAM_TAB_ORDER.indexOf(id); return i === -1 ? EXAM_TAB_ORDER.length : i; };
  return all
    .map((c, i) => ({ c, i }))
    .sort((a, b) => (rank(a.c.id) - rank(b.c.id)) || (a.i - b.i))
    .map(x => x.c);
}
export function examChapterById(id) { return chapterById(id) || EXAM_ONLY_CHAPTERS.find(c => c.id === id) || null; }
/* every quest in a chapter shares its chapter's one flat accent —
   no per-quest shade ramp in the solid-colour palette. */
export function questAccent(chapter) {
  return (chapter && chapter.signature) || PALETTE.blue;
}

/* XP economy — small, understanding-first. Streak multiplier caps low (×1–×3)
   so grinding the same skill never out-earns genuine progress. No leaderboard. */
export const XP = {
  perCorrect: 10,
  firstTryBonus: 5,
  streakCap: 3,          // streak multiplier on the base, capped at ×3
};

/* answer tolerances. Calc answers match to the question's stated decimal
   places within a tiny epsilon (so a legit rounding step never fails). Values
   read off a graph are inherently approximate — accept a small band. */
export const TOL = {
  calcEps: 0.001,        // numeric equality slack at the stated dp
  graphRead: 2,          // ±2 on a value read off an ogive / box plot
};

export const PASS = 0.8;           // 80% (first-try) to pass a quest and earn its badge
export const INACTIVE_DAYS = 7;    // admin inactivity flag (used later)

/* DICE-PLAN.md — chapters where the 🎲 dice (generative practice rounds)
   shows on the chapter screen. A chapter id only ever belongs here once
   it has BOTH a real recipe pool wired into js/quests/dice-pools.js AND
   Megan's phone-test green light (her rhythm, one chapter at a time —
   see DICE-PLAN's build order). Session 0b (2026-08-21) built the
   infrastructure only. Session 1 (2026-08-21) wires the real Statistics
   pool and flips it on here — the STATISTICS PILOT going live at the
   next ship; Megan phone-tests on live before any other chapter lights
   up (DICE-PLAN's rhythm — this is not a green light for chapter 2).
   2026-08-23 (her brief for the day: "dice rounds for other chapters"):
   Finance, Number Patterns ("pat") and 2D Trigonometry pools built by
   three parallel sessions from the Stats recipe, each harnessed and
   PNG-reviewed; all three lit here at the same ship, her phone-test
   per chapter follows on live. */
export const DICE_CHAPTERS = ["stats", "finance", "pat", "trig"];

/* FUNFUN-PART2-BRIEF.md — the 📈 Fun Functions strip on the Functions
   chapter screen. Fun Functions is its own app (the graph-quest repo,
   also live standalone at megzieberr.github.io/graph-quest); blipwork
   mounts one of its 15 quests at a time inside a shadow root and pays out
   its own XP. This one switch gates the strip, and the strip renders only
   when it is true AND the chapter is "func".

   The server side (supabase/migration-funfun.sql) is safe to apply before
   any of this ships — nothing calls those RPCs until the client does, so
   this flag is the seeded-closed equivalent. Session 1 (2026-08-23) built
   the plumbing; the strip and the play screen are session 2's, and the
   flag only earns its `true` once Megan has phone-tested the whole loop
   at 375px (her one-chapter-at-a-time rhythm, same as the dice). */
export const FUNFUN_ENABLED = true;

/* Circle Geo tab (CQ-BRIDGE-PLAN.md Part 2, 2026-08-21). Circle Quest stays
   its own app, reached by a plain out-link — never merged, never iframed. */
export const CQ_URL = "https://megzieberr.github.io/circle-geo-quest/";

/* ============================================================
   BLIP — Phase 2 feeding/growth/sickness constants (2026-07-19).
   THESE ARE A DISPLAY MIRROR ONLY. The server (supabase/schema.sql +
   migration-phase2-blip-care.sql) is the single source of truth for
   health, growth, prices, and every guard — the same relationship
   level.js has with _mhq_level. local-backend.js imports these so the
   offline (?local=1) mirror computes the identical numbers; never let
   the UI trust a client-side recompute over a backend reply.
   ============================================================ */
export const BLIP = {
  // cumulative free-cookie feedings needed for growth stage 1 / 2 / 3
  // (stage 0 = tiny). growthStage = count of thresholds <= feedCount.
  growthThresholds: [10, 25, 45],
  // days_unfed (qualifying weekdays) at which each sickness stage begins:
  // 0 healthy 0–2 · 1 tired 3–4 · 2 bedridden 5–6 · 3 critical 7+.
  sickThresholds: { tired: 3, bedridden: 5, critical: 7 },
  // pharmacy / grocery prices — MIRROR of the server shop_items rows.
  food: { soup: 15, medicine: 20, treat: 8 },
  /* Level milestone that unlocks the 2nd blip. HER CALL 2026-08-12: 10 -> 20.
     Level 10 arrived too soon once the curve capped at 40 and the milestone
     boxes landed at 10/20/30/40 — a second Blip at 20 is a milestone reward
     rather than something that turns up while the first one is still new.
     ⚠️ THIS CONSTANT IS NOT THE ENFORCED ONE. mhq_claim_second_blip's own
     `lvl < 20` is what actually refuses, and js/local-backend.js mirrors it
     by reading this value. Change one, change both — and js/blip.js must
     READ this rather than hard-code a number, which it used to do (it said
     `level >= 10` outright, so the card could appear at a level the server
     would refuse). */
  secondBlipLevel: 20,
  careDaysToHeal: 3,               // consecutive qualifying care days to fully heal
};

/* ============================================================
   MOOD METER + CRAVINGS (build day 2026-08-21, session B).
   THIS IS A DISPLAY MIRROR ONLY — the server (supabase/migration-mood-
   cravings.sql, WRITTEN NOT RUN as of this session; supabase/schema.sql
   mirrors it) is the single source of truth. Same relationship BLIP
   above has with the real health/growth RPCs: never let the UI trust a
   client-side recompute over a backend reply.

   Design (her ruling, 2026-08-21): buying food changed nothing visible
   — growth stays cookie-only (can never be bought, standing rule) — so
   food needed its own job. That job is MOOD: 0-5 hearts, per blip.
   Effective mood decays `dailyDecay` per day since it was last topped
   up (never below 0), computed at READ time, never stored. Gains are
   applied server-side at eat time: any bought food is `foodGain`, the
   day's ONE deterministic CRAVED food (js/local-backend.js /
   _mhq_craving in the SQL) is `cravingGain`, the free daily cookie is
   `cookieGain`. Capped at `max`. */
export const MOOD = {
  max: 5,
  dailyDecay: 2,
  foodGain: 1,
  cravingGain: 2,
  cookieGain: 1,
};

/* ============================================================
   EXAM FOCUS — infrastructure build (EXAM-FOCUS-PLAN.md, session 0,
   2026-08-21). THIS FLAG IS THE SWITCH, exactly like DICE_CHAPTERS above:
   a chapter id only ever belongs here once BOTH real seeded questions
   exist for it (js/exam/index.js's registry) AND — same relationship as
   examChapterEligible() in js/screens.js adds on top — at least one of
   its quests is open, which the flag alone does not control.

   PILOT SEEDED (session D, 2026-08-21): eqn / nature-of-roots, four
   questions. WIDENED (day session, 2026-08-22, registering overnight
   run #1 — OVERNIGHT-1-REPORT.md): exp, func and trig now carry real
   seeded questions too (js/exam/index.js), so all four flip on here.
   EUCLIDEAN ADDED (day session, 2026-08-22): the Circle Quest engine
   port landed, its two composed modules are registered, and her
   morning ruling gave Euclidean its own EXAM-FOCUS-ONLY chapter
   (EXAM_ONLY_CHAPTERS above). It is the first id here that owns no
   quests at all, which is why examChapterEligible() in js/screens.js
   carries a documented exception for exam-only chapters — for them
   this flag is the whole gate. The class
   still is not invited to the app at all (a separate, earlier gate), so
   nothing here is learner-visible on live regardless — this flag only
   controls what's REACHABLE once she opens the app up.

   GENERAL TRIG ADDED (stage 4 of the gtrig build, 2026-08-22): her
   ruling that morning — "I see the exam focus listed the reductions,
   ratios and general solutions under 2D Trig. Once you're done with the
   General Trig Rounds, you can just list these exam focus questions
   under the General Trig tab and connect it to the correct rounds." The
   two questions moved chapter in js/exam/index.js; this flag is what
   makes the gtrig exam tab reachable at all. It still shows only once
   she has opened at least one gtrig round — examChapterEligible() in
   js/screens.js adds that half of the gate on top, exactly as it does
   for every non-exam-only chapter.

   THE EXAM BUILD DAY LIST (2026-08-23, EXAM-BUILD-DAY.md). Seven
   chapters, and two changes from yesterday's six:

     · "algx" JOINS — Algebraic Expressions, the second EXAM-FOCUS-ONLY
       chapter (EXAM_ONLY_CHAPTERS above). Like euclid it owns no
       quests, so this flag is its whole gate.
     · "tgraph" JOINS — Trig Graphs. An ORDINARY quest chapter (rounds
       tg1–tg7 in CHAPTERS above), so the open-quest half of the gate
       applies to it exactly as it does to func: its Exam Focus screens
       only appear once she has opened at least one of tg1–tg7.
     · "trig" LEAVES — her ruling this morning (EXAM-BUILD-DAY.md ruling
       9): "2D Trig is HIDDEN from Exam Focus for now." Nothing was
       deleted — the chapter's one card (js/exam/cards-trig.js) and its
       skills.js entry both stay exactly where they are, so putting it
       back later is a one-word edit here. It simply stops being
       reachable in the tab.
   */
export const EXAM_CHAPTERS = ["algx", "eqn", "exp", "func", "tgraph", "gtrig", "euclid"];

/* Pay-per-completed-question, her kickoff ruling (2026-08-21), re-rated
   2026-08-23 to 50 XP + 5 gold (see the block at the end of this comment):
   flat pay, ONCE per question ever (re-opening an already-completed
   question pays nothing — the served RPC's `completed` flag is the
   dedupe). THIS IS A DISPLAY MIRROR ONLY, same relationship BLIP/MOOD
   above have with their RPCs — supabase/migration-exam-focus.sql
   (WRITTEN NOT RUN) carries the real, server-side literal amounts;
   js/local-backend.js's offline mirror and verify-exam.html's SQL↔config
   literal cross-check both read THIS block, never a hardcoded number of
   their own. "Completed" = every part's memo has been revealed (the
   client reports each part-reveal as it happens; the server derives
   completion and pays once — there is no correctness signal, by design:
   the app never marks the learner's own work).

   PAY CHANGED 2026-08-23 (her ruling, EXAM-BUILD-DAY.md ruling 7):
   75 XP + 10 💎 → 50 XP + 5 💎 per completed card. The exam bank is
   about to go from ~50 cards to several hundred, and the old rate would
   have made Exam Focus by far the fastest way to earn in the whole app.
   THE SERVER LITERAL LIVES IN THE NEW MIGRATION —
   supabase/migration-exam-xp-50.sql (WRITTEN, NOT RUN as of this
   session): it re-creates mhq_exam_open_part with 50 / 5 in place of
   75 / 10 and changes nothing else. verify-exam.html Part 5 cross-checks
   THIS block against THAT file. The original
   supabase/migration-exam-focus.sql keeps its 75 / 10 on purpose — it is
   the applied history of what ran on 2026-08-21, not a live mirror. */
export const EXAM = {
  xpPerQuestion: 50,
  goldPerQuestion: 5,
};
