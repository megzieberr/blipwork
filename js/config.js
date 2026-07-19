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
    ],
  },
];

export function chapterById(id) { return CHAPTERS.find(c => c.id === id) || null; }
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
  // (stage 0 = baby). growthStage = count of thresholds <= feedCount.
  growthThresholds: [10, 25, 45],
  // days_unfed (qualifying weekdays) at which each sickness stage begins:
  // 0 healthy 0–2 · 1 tired 3–4 · 2 bedridden 5–6 · 3 critical 7+.
  sickThresholds: { tired: 3, bedridden: 5, critical: 7 },
  // pharmacy / grocery prices — MIRROR of the server shop_items rows.
  food: { soup: 15, medicine: 20, treat: 8 },
  secondBlipLevel: 10,             // level milestone that unlocks the 2nd blip
  careDaysToHeal: 3,               // consecutive qualifying care days to fully heal
};
