/* ============================================================
   CONFIG — chapters, the per-chapter colour family, XP rules.
   ------------------------------------------------------------
   Colour system (locked decision): each CHAPTER owns one hue
   family; its quests are shades of that hue, light → deep, so a
   quest map reads as one cohesive "world" while still letting
   each quest be told apart. Statistics owns violet.
   ============================================================ */

/* eight violet shades, light → deep (quest 1 → quest 8) */
const STATS_SHADES = [
  "#b9a8ff", "#a78bfa", "#9a78f6", "#8b5cf6",
  "#7c54f0", "#7044e6", "#6a3bd6", "#5a2fbe",
];

/* seven amber/gold shades, light → deep (Finance quests 1 → 7) */
const FIN_SHADES = [
  "#fcd34d", "#fbbf24", "#f59e0b", "#ea9a0a",
  "#e08708", "#cf7506", "#b8650a",
];

/* seven fuchsia/pink shades, light → deep (Probability quests 1 → 7) */
const PROB_SHADES = [
  "#f9a8d4", "#f472b6", "#ec4899", "#e22a86",
  "#db2777", "#be185d", "#9d174d",
];

/* seven sky-blue shades, light → deep (Trigonometry quests 1 → 7) */
const TRIG_SHADES = [
  "#7dd3fc", "#38bdf8", "#0ea5e9", "#0d8fce",
  "#0284c7", "#0369a1", "#075985",
];

/* six lime shades, light → deep (Measurement quests 1 → 6) */
const MEAS_SHADES = [
  "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212",
];

/* seven teal shades, light → deep (Functions quests 1 → 7) */
const FUNC_SHADES = [
  "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a",
];

/* seven indigo shades, light → deep (Trig Graphs quests 1 → 7) */
const TGRAPH_SHADES = [
  "#a5b4fc", "#818cf8", "#6366f1", "#5b54e0", "#4f46e5", "#4338ca", "#3730a3",
];

/* seven orange shades, light → deep (Analytical Geometry quests 1 → 7) */
const AG_SHADES = [
  "#fdba74", "#fb923c", "#f97316", "#ea6a0c", "#dd5c0a", "#c2480a", "#9a3412",
];

/* seven slate/steel shades, light → deep (Number Patterns quests 1 → 7) */
const PAT_SHADES = [
  "#94a3b8", "#8493a8", "#73849b", "#64748b", "#556074", "#475569", "#334155",
];

/* eight rose/red shades, light → deep (Exponents & Surds quests 1 → 8) */
const EXP_SHADES = [
  "#fda4af", "#fb7185", "#f43f5e", "#e11d48",
  "#c81e3a", "#be123c", "#9f1239", "#881337",
];

export const CHAPTERS = [
  {
    id: "stats", name: "Statistics", paper: "Paper 2", icon: "📊", term: "term3",
    hue: STATS_SHADES, signature: "#8b5cf6", open: true,
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
    hue: FIN_SHADES, signature: "#f59e0b", open: true,
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
    hue: PROB_SHADES, signature: "#ec4899", open: true,
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
    hue: TRIG_SHADES, signature: "#0ea5e9", open: true,
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
    hue: MEAS_SHADES, signature: "#84cc16", open: true,
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
    hue: FUNC_SHADES, signature: "#14b8a6", open: true,
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
    hue: TGRAPH_SHADES, signature: "#6366f1", open: true,
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
    hue: AG_SHADES, signature: "#f97316", open: true,
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
    hue: PAT_SHADES, signature: "#64748b", open: true,
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
    hue: EXP_SHADES, signature: "#e11d48", open: true,
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
];

export function chapterById(id) { return CHAPTERS.find(c => c.id === id) || null; }
export function questAccent(chapter, questN) {
  const arr = chapter.hue || [];
  return arr[(questN - 1) % arr.length] || chapter.signature || "#8b5cf6";
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
