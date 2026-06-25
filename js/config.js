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

export const CHAPTERS = [
  {
    id: "stats", name: "Statistics", paper: "Paper 2", icon: "📊",
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
  // future chapters appear as locked "coming soon" blocks on the hub
  { id: "trig", name: "Trigonometry", paper: "Paper 2", icon: "📐", signature: "#38bdf8", open: false, comingSoon: true },
  { id: "analytical", name: "Analytical Geometry", paper: "Paper 2", icon: "📈", signature: "#34d399", open: false, comingSoon: true },
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
