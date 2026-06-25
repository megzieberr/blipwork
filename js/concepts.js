/* ============================================================
   CONCEPT CARDS  ("I'm lost" — re-teach the idea from scratch)
   ------------------------------------------------------------
   Opened from any question via the "I'm lost" button. Re-teaches
   the underlying idea, then the learner returns to a FRESH sibling
   question on the same skill. Wording follows CAPS conventions;
   example numbers are original (never from the planning PDFs).
   ============================================================ */
export const CONCEPTS = {
  quartiles: {
    title: "Quartiles & their positions",
    body: `
      <p>Quartiles cut the <b>ordered</b> data into four equal parts. Always sort the values from smallest to largest first.</p>
      <ul>
        <li><b>Q1</b> (lower quartile) — the 25% point</li>
        <li><b>Q2</b> (median) — the 50% point</li>
        <li><b>Q3</b> (upper quartile) — the 75% point</li>
      </ul>
      <p>For ungrouped data, first find the <b>position</b> in the list (n = how many values):</p>
      <div class="formula">pos Q1 = (n + 1)/4   ·   pos Q2 = (n + 1)/2   ·   pos Q3 = 3(n + 1)/4</div>
      <p>Then read the rounding off the decimal:</p>
      <ul>
        <li>ends in <b>,5</b> → take the middle value (average the two either side)</li>
        <li>ends in <b>,25</b> → round the position <b>down</b></li>
        <li>ends in <b>,75</b> → round the position <b>up</b></li>
      </ul>
      <div class="eg">e.g. n = 7, pos Q1 = 8/4 = 2 → Q1 is the 2nd value. pos Q3 = 24/4 = 6 → the 6th value.</div>`,
  },
  iqr: {
    title: "Interquartile range (IQR)",
    body: `
      <p>The IQR measures the spread of the <b>middle 50%</b> of the data — it ignores the extremes.</p>
      <div class="formula">IQR = Q3 − Q1</div>
      <p>A small IQR means the middle half is bunched together; a large IQR means it is spread out.</p>
      <div class="eg">e.g. Q1 = 24 and Q3 = 39 → IQR = 39 − 24 = 15.</div>`,
  },
  outliers: {
    title: "Outliers & the boundaries",
    body: `
      <p>An outlier is a value that lies <b>outside</b> the fences. First find the IQR, then the boundaries:</p>
      <div class="formula">lower boundary = Q1 − 1,5 × IQR<br>upper boundary = Q3 + 1,5 × IQR</div>
      <p>Any value <b>below</b> the lower boundary or <b>above</b> the upper boundary is an outlier.</p>
      <div class="eg">e.g. Q1 = 20, Q3 = 32 → IQR = 12. Lower = 20 − 18 = 2; upper = 32 + 18 = 50. So 1 is an outlier, 48 is not.</div>`,
  },
  fivenum: {
    title: "Five-number summary",
    body: `
      <p>Five values describe the whole data set and build the box-and-whisker plot:</p>
      <div class="formula">minimum · Q1 · median (Q2) · Q3 · maximum</div>
      <p>They split the data into four parts, each holding about <b>25%</b> of the values.</p>`,
  },
  boxplot: {
    title: "Reading a box-and-whisker plot",
    body: `
      <p>A box plot is drawn straight from the five-number summary on a number line:</p>
      <ul>
        <li>the two <b>whisker ends</b> = minimum and maximum</li>
        <li>the <b>box</b> goes from <b>Q1 to Q3</b> — its width is the <b>IQR</b></li>
        <li>the <b>line inside the box</b> = the median (Q2)</li>
      </ul>
      <p>Each of the four sections (whisker, box-left, box-right, whisker) holds about 25% of the data.</p>`,
  },
  percentile: {
    title: "Percentiles",
    body: `
      <p>A percentile is a generalised quartile. The p-th percentile is the value below which about p% of the data falls (so Q1 is the 25th percentile, the median the 50th).</p>
      <div class="formula">position = (n + 1) × p/100</div>
      <p>Find the position, then count to that value in the ordered list.</p>
      <div class="eg">e.g. n = 9, the 30th percentile sits at position 10 × 0,3 = 3 → the 3rd value.</div>`,
  },

  calculator: {
    title: "Using the stats calculator",
    body: `
      <p>Every stats question starts the same way on a Casio fx-calculator:</p>
      <ul>
        <li><b>Clear it:</b> SHIFT, 9, 3 (All), = (Yes)</li>
        <li><b>Frequency on/off:</b> SHIFT, MODE (SETUP), ↓, 4 (STAT), then 1 (ON) or 2 (OFF)</li>
        <li><b>Enter data:</b> MODE, 3 (STAT), 1 (1-VAR), type the values, AC</li>
      </ul>
      <p>Then read a value: SHIFT, 1 (STAT), 4 (Var) gives <b>1:n  2:x̄  3:σx  4:sx</b>, and 6 (MinMax) gives <b>minX, maxX, Q1, med, Q3</b>.</p>
      <div class="eg">Use σx (option 3) for the standard deviation — not sx.</div>`,
  },
  mean: {
    title: "Mean, mode, median & range",
    body: `
      <p><b>Mean</b> x̄ = (sum of the values) ÷ (how many values) = Σx / n.</p>
      <p><b>Mode</b> = the value that appears most often.</p>
      <p><b>Median</b> = the middle value once the data is in order (average the two middle ones if n is even).</p>
      <p><b>Range</b> = maximum − minimum. It is a measure of <b>spread</b>, not centre.</p>
      <div class="eg">3; 5; 5; 8; 9 → mean 6, mode 5, median 5, range 6.</div>`,
  },
  skewness: {
    title: "Skewness & shape",
    body: `
      <p>The skew is named for the <b>tail</b> — the long thin end — not for where the bulk of the data sits.</p>
      <ul>
        <li><b>Symmetric / normal:</b> balanced; x̄ = median.</li>
        <li><b>Skewed right (positive):</b> tail points right; a few high values pull the mean up, so x̄ &gt; median.</li>
        <li><b>Skewed left (negative):</b> tail points left; a few low values pull the mean down, so x̄ &lt; median.</li>
      </ul>
      <p>On a box plot, the longer whisker / bigger half shows the tail. On an ogive, the tail is the flat end.</p>`,
  },
  groupedMean: {
    title: "Estimated mean (grouped data)",
    body: `
      <p>For grouped data each class is represented by its <b>midpoint</b> x = (lower + upper) ÷ 2.</p>
      <div class="formula">estimated mean x̄ = Σ(f × x) / n</div>
      <p>Multiply each frequency by its midpoint, add those up, then divide by the total frequency n.</p>
      <div class="eg">It is an <i>estimate</i> because we use the midpoint to stand in for every value in the class.</div>`,
  },
  classes: {
    title: "Modal & median class",
    body: `
      <p><b>Modal class</b> = the class interval with the <b>highest frequency</b>.</p>
      <p><b>Median class</b> = the class that contains the middle value. Find position n ÷ 2, build up the cumulative frequency, and see which class that position falls in.</p>`,
  },
  ogivePlot: {
    title: "Plotting an ogive",
    body: `
      <p>An ogive is the cumulative-frequency curve.</p>
      <ul>
        <li><b>Cumulative frequency</b> = the running total of the frequencies.</li>
        <li><b>Plot</b> each point at (<b>upper</b> boundary of the class ; cumulative frequency).</li>
        <li><b>Anchor</b> the curve at the <b>lower</b> boundary of the first class, at height 0.</li>
      </ul>
      <p>The curve is always S-shaped, and the <b>modal class</b> is the steepest part.</p>`,
  },
  ogiveRead: {
    title: "Reading off an ogive",
    body: `
      <p>For grouped data the positions have <b>no “+1”</b>:</p>
      <div class="formula">Q1 at n/4 · median at n/2 · Q3 at 3n/4 · p-th percentile at n × p/100</div>
      <p>Find the position on the cumulative-frequency (vertical) axis, read across to the curve, then straight down to the value. Read “approximately”.</p>`,
  },
  stddev: {
    title: "Standard deviation",
    body: `
      <p>The standard deviation σ measures how spread out the data is <b>around the mean</b>. A bigger σ means more spread; a smaller σ means the data is more consistent.</p>
      <div class="formula">σ = √[ Σ(x − x̄)² / n ]</div>
      <p>On the calculator use σx (Var → option 3). To compare two data sets’ consistency, the one with the <b>smaller</b> σ is more consistent.</p>`,
  },
  withinSD: {
    title: "Values within one σ of the mean",
    body: `
      <p>“Within one standard deviation of the mean” means between two boundaries:</p>
      <div class="formula">lower = x̄ − σ   ·   upper = x̄ + σ</div>
      <p>Work out those two numbers, then count how many data values fall between them (inclusive).</p>`,
  },
  variance: {
    title: "Variance",
    body: `
      <p>Variance is the average of the <b>squared</b> deviations from the mean — it is just the standard deviation squared.</p>
      <div class="formula">variance = σ²   ·   σ = √variance</div>
      <div class="eg">If σ = 4 then variance = 16. If variance = 25 then σ = 5.</div>`,
  },
  effect: {
    title: "Adding a constant to every value",
    body: `
      <p>If you add the same number k to <b>every</b> value in a data set:</p>
      <ul>
        <li>the <b>mean, median, quartiles, min and max</b> all shift up by k;</li>
        <li>the <b>spread</b> stays the same — <b>range, IQR, standard deviation and variance do not change</b>.</li>
      </ul>
      <p>Shifting every value sideways moves the centre but not how spread out the data is.</p>`,
  },
  compareBox: {
    title: "Comparing two box plots",
    body: `
      <p>Line the two plots up on the same scale and compare:</p>
      <ul>
        <li><b>Median</b> — which centre is higher?</li>
        <li><b>IQR</b> (box width) and <b>range</b> (whisker to whisker) — which is more spread out?</li>
        <li><b>Skew</b> — which side has the longer tail?</li>
      </ul>
      <p>A narrower box / shorter whiskers means the data is more consistent.</p>`,
  },
};

export function getConcept(id) { return CONCEPTS[id] || null; }
