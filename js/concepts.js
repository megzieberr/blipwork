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

  /* ---------------- FINANCE ---------------- */
  finFormulas: {
    title: "Which finance formula?",
    body: `
      <p>Match the situation to the formula. <b>i</b> is the rate as a fraction (÷100), <b>n</b> the number of periods.</p>
      <ul>
        <li><b>Hire purchase</b> → simple interest: <b>A = P(1 + i·n)</b></li>
        <li><b>Inflation, population growth, savings</b> → compound: <b>A = P(1 + i)ⁿ</b></li>
        <li><b>Straight-line depreciation</b> → <b>A = P(1 − i·n)</b></li>
        <li><b>Reducing-balance depreciation</b> → <b>A = P(1 − i)ⁿ</b></li>
      </ul>
      <p><b>P</b> is the starting amount, <b>A</b> the end amount. Turn a % into i by dividing by 100 (8% → 0,08).</p>`,
  },
  simpleCompound: {
    title: "Simple vs compound interest",
    body: `
      <p><b>Simple interest</b> is worked out on the <b>original P only</b>, so the same amount is added each period.</p>
      <div class="formula">A = P(1 + i·n)</div>
      <p><b>Compound interest</b> is worked out on the <b>growing balance</b>, so each period earns a little more than the last.</p>
      <div class="formula">A = P(1 + i)ⁿ</div>
      <div class="eg">Over time compound always pulls ahead of simple, because it earns "interest on interest".</div>`,
  },
  depreciation: {
    title: "Depreciation: the two methods",
    body: `
      <p>Depreciation is when something <b>loses</b> value over time.</p>
      <ul>
        <li><b>Linear (straight-line):</b> <b>A = P(1 − i·n)</b>. Loses the <b>same rand amount</b> each year — its graph is a <b>straight line</b> sloping down.</li>
        <li><b>Reducing-balance:</b> <b>A = P(1 − i)ⁿ</b>. Loses a fixed <b>percentage of its current</b> value each year — its graph is a <b>curve</b> that drops steeply then flattens.</li>
      </ul>`,
  },
  compounding: {
    title: "Different compounding periods",
    body: `
      <p>If interest is added more than once a year, split the year up:</p>
      <ul>
        <li><b>rate per period</b> = annual rate ÷ (times per year)</li>
        <li><b>exponent</b> = years × (times per year)</li>
      </ul>
      <div class="formula">A = P(1 + i/k)^(n·k)</div>
      <p>Times per year k: annually 1 · half-yearly 2 · quarterly 4 · monthly 12 · weekly 52 · daily 365.</p>
      <div class="eg">12% p.a. compounded quarterly for 5 years → i = 0,12/4 = 0,03 and exponent = 5×4 = 20.</div>`,
  },
  timelineMove: {
    title: "Moving money along a timeline",
    body: `
      <p>Money has a different value at different times. To re-value an amount, slide it along the timeline:</p>
      <ul>
        <li><b>Forward</b> (to a later date) → <b>multiply</b> by (1 + i) once per period → a <b>positive</b> exponent.</li>
        <li><b>Backward</b> (to an earlier date) → <b>divide</b> by (1 + i) once per period → a <b>negative</b> exponent.</li>
      </ul>
      <div class="formula">value = amount × (1 + i)^(±periods)</div>
      <p>Count the periods between the two T-points. Forward T2 → T5 is 3 periods (+3); backward T5 → T2 is 3 periods (−3).</p>`,
  },
  timelineCount: {
    title: "Counting periods on a timeline",
    body: `
      <p>The number of periods is just how many <b>gaps</b> you jump between the two T-points — count the spaces, not the dots.</p>
      <ul>
        <li>T0 → T4 is <b>4</b> periods.</li>
        <li>T5 → T2 is <b>3</b> periods (going back).</li>
      </ul>
      <p>The <b>direction</b> tells you × or ÷: later = ×, earlier = ÷.</p>`,
  },
  rateChange: {
    title: "When the interest rate changes",
    body: `
      <p>If the rate or compounding frequency changes part-way, split the timeline into segments. For one lump sum, use <b>one bracket per segment</b>:</p>
      <div class="formula">A = P(1 + i₁/k₁)^(n₁·k₁) (1 + i₂/k₂)^(n₂·k₂)</div>
      <p>Work out each segment's rate-per-period and number-of-periods separately, then multiply the brackets together.</p>`,
  },
  deposits: {
    title: "Deposits & hire purchase",
    body: `
      <p>A <b>deposit</b> is paid upfront and earns no interest.</p>
      <div class="formula">deposit = (% ÷ 100) × price</div>
      <p>The amount still owed (the new P that interest is charged on) is the rest of the price:</p>
      <div class="formula">amount owed = ((100 − %) ÷ 100) × price</div>
      <div class="eg">15% deposit on R8 000 → deposit = R1 200, still owed = R6 800.</div>`,
  },
  effNom: {
    title: "Effective vs nominal rates",
    body: `
      <p>Both are <b>compound</b> interest, just quoted differently.</p>
      <ul>
        <li><b>Effective</b> rate is always an <b>annual</b> rate (the true yearly growth).</li>
        <li><b>Nominal</b> rate is quoted with a <b>compounding frequency</b> (monthly, quarterly, …).</li>
      </ul>
      <div class="formula">1 + i_eff = (1 + i_nom / n)ⁿ</div>
      <p>Here n is the number of compounding periods <b>per year</b> (12 for monthly).</p>`,
  },

  /* ---------- Probability ---------- */
  probBasics: {
    title: "Theoretical probability",
    body: `
      <p>The <b>sample space</b> S is the set of <b>all</b> possible outcomes. <b>n(S)</b> is how many there are.</p>
      <p>An <b>event</b> E is the outcomes you care about. The theoretical probability is worked out <i>before</i> any experiment:</p>
      <div class="formula">P(E) = n(E) / n(S)</div>
      <p>It always sits between <b>0</b> (impossible) and <b>1</b> (certain), and can be written as a fraction, a decimal or a percentage.</p>
      <div class="eg">e.g. one die, "an odd number": E = {1; 3; 5} so n(E) = 3, n(S) = 6 → P = 3/6 = 1/2 = 0,5 = 50%.</div>`,
  },
  relFreq: {
    title: "Relative frequency",
    body: `
      <p>Relative frequency is what <b>actually happened</b> after you collect data — not a prediction.</p>
      <div class="formula">relative frequency = (times the event happened) / (total trials)</div>
      <p>With few trials it can differ from the theoretical probability; with many trials it usually gets closer to it.</p>
      <div class="eg">e.g. a coin flipped 10 times lands heads 6 times → relative frequency = 6/10 = 0,6, even though theory says 0,5.</div>`,
  },
  vennNotation: {
    title: "Venn diagram notation",
    body: `
      <p>The <b>rectangle</b> is the sample space S; each <b>circle</b> is an event.</p>
      <ul>
        <li><b>A ∩ B</b> ("A and B") — the <b>overlap</b>: outcomes in A <i>and</i> B.</li>
        <li><b>A ∪ B</b> ("A or B") — <b>everything</b> in A together with everything in B.</li>
        <li><b>A′</b> ("not A") — everything <b>outside</b> A.</li>
      </ul>
      <p>The four basic regions of two circles are: only A, only B, the overlap (A ∩ B), and outside both.</p>
      <div class="eg">∩ reads "and"; ∪ reads "or"; the little dash A′ means "not".</div>`,
  },
  vennRead: {
    title: "Reading probabilities off a Venn",
    body: `
      <p>Write the <b>count</b> of outcomes in each region. Then every probability is that region's count over n(S).</p>
      <ul>
        <li><b>P(A)</b> = (only A + overlap) / n(S)</li>
        <li><b>P(A ∩ B)</b> = overlap / n(S)</li>
        <li><b>P(A ∪ B)</b> = (only A + overlap + only B) / n(S)</li>
        <li><b>P(A′)</b> = (everything not in A) / n(S)</li>
      </ul>
      <p>All the region probabilities add up to <b>1</b>.</p>
      <div class="eg">e.g. n(S) = 12, only A = 1, overlap = 2, only B = 4 → P(A ∪ B) = (1 + 2 + 4)/12 = 7/12.</div>`,
  },
  addRule: {
    title: "The addition rule",
    body: `
      <p>For any two events:</p>
      <div class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
      <p>You subtract the overlap <b>once</b> because it was counted in both P(A) and P(B) — otherwise it's counted twice.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2 → P(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7.</div>`,
  },
  mutual: {
    title: "Exclusive, inclusive & exhaustive",
    body: `
      <ul>
        <li><b>Mutually exclusive</b> — cannot happen together, no overlap: <b>P(A ∩ B) = 0</b>. The addition rule becomes P(A ∪ B) = P(A) + P(B).</li>
        <li><b>Mutually inclusive</b> — can happen together, there is an overlap: <b>P(A ∩ B) ≠ 0</b>.</li>
        <li><b>Complementary</b> — no overlap <i>and</i> they fill S: P(A) + P(A′) = 1.</li>
        <li><b>Exhaustive</b> — together they cover the whole sample space (nothing left outside).</li>
      </ul>
      <div class="eg">e.g. "even" and "odd" on a die are mutually exclusive AND exhaustive.</div>`,
  },
  independence: {
    title: "Independent events",
    body: `
      <p>Two events are <b>independent</b> when one happening does not change the chance of the other. The test:</p>
      <div class="formula">P(A ∩ B) = P(A) × P(B)</div>
      <p>Work out P(A) × P(B) and compare it with the real P(A ∩ B). <b>Equal → independent</b>; not equal → not independent.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,3, and P(A ∩ B) = 0,15 → 0,5 × 0,3 = 0,15, so they are independent.</div>`,
  },
  contingency: {
    title: "Contingency tables",
    body: `
      <p>A contingency table sorts a group by <b>two</b> features at once. Use the totals to read probabilities:</p>
      <ul>
        <li>P(feature) = a row or column total ÷ the grand total</li>
        <li>P(both) = the single overlap cell ÷ the grand total</li>
      </ul>
      <p>Then test independence: compare P(both) with P(A) × P(B).</p>
      <div class="eg">e.g. 70 males of 150, 80 older of 150, 45 older males → P(M)×P(O) = 70/150 × 80/150 ≈ 0,249 but P(M ∩ O) = 45/150 = 0,3 → not independent.</div>`,
  },
  treeRead: {
    title: "Reading a tree diagram",
    body: `
      <p>Each stage of the experiment is a new set of branches, with the probability written <b>on</b> each branch.</p>
      <ul>
        <li>The branches leaving any one point must add up to <b>1</b>.</li>
        <li><b>Multiply</b> the probabilities <b>along</b> a path to get that full outcome.</li>
        <li><b>Add</b> the path probabilities to combine paths into one event.</li>
      </ul>
      <div class="eg">e.g. two coins: P(H,T) = 0,5 × 0,5 = 0,25; P(exactly one head) = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`,
  },
  atLeastOne: {
    title: "The ‘at least one’ shortcut",
    body: `
      <p>"At least one" is usually quickest as the complement of "none":</p>
      <div class="formula">P(at least one) = 1 − P(none)</div>
      <p>Find P(none) by multiplying the "not it" branch along every stage, then subtract from 1.</p>
      <div class="eg">e.g. P(no red) = 15/20 × 15/20 = 225/400 → P(at least one red) = 1 − 225/400 = 175/400.</div>`,
  },
  replacement: {
    title: "With vs without replacement",
    body: `
      <ul>
        <li><b>With replacement</b> — the item goes back, so the total <b>stays the same</b> and every second-draw branch uses the same denominator.</li>
        <li><b>Without replacement</b> — the item is kept, so the <b>total drops by one</b> and the colour taken first has <b>one fewer</b>.</li>
      </ul>
      <div class="eg">e.g. 20 balls, take a green: with replacement the next draw is still /20; without, it's /19 and greens drop from 7 to 6.</div>`,
  },

  /* ---------- 2D Trigonometry ---------- */
  trigChooseRule: {
    title: "Which rule do I use?",
    body: `
      <p>Match what you are <b>given</b> to the rule:</p>
      <ul>
        <li><b>Sine rule</b> — a side together with the angle <b>opposite</b> it (two angles & a side, or two sides & a non-included angle).</li>
        <li><b>Cosine rule</b> — two sides and the angle <b>between</b> them (find the third side), or <b>all three sides</b> (find an angle).</li>
        <li><b>Area rule</b> — two sides and the <b>included</b> angle (find the area).</li>
      </ul>
      <div class="formula">side+opposite angle → sine · included angle / 3 sides → cosine · 2 sides + included angle → area</div>`,
  },
  labelling: {
    title: "Labelling — sides and their “friends”",
    body: `
      <p>Angles get <b>capital</b> letters (Â, B̂, Ĉ); sides get <b>lower-case</b> letters (a, b, c).</p>
      <p>Each side is named after the angle <b>opposite</b> it — they are “friends” looking across the triangle: side <b>a</b> is opposite <b>Â</b>.</p>
      <ul>
        <li>The <b>biggest</b> angle is opposite the <b>longest</b> side.</li>
        <li>The <b>smallest</b> angle is opposite the <b>shortest</b> side.</li>
      </ul>
      <div class="eg">Never judge sizes by eye — a sketch is not to scale.</div>`,
  },
  sineRuleSide: {
    title: "Sine rule — finding a side",
    body: `
      <p>Use it when you have a side paired with its opposite angle. Put the <b>sides on top</b>:</p>
      <div class="formula">a/sinÂ = b/sinB̂ = c/sinĈ</div>
      <p>Write only the two ratios you need, then cross-multiply.</p>
      <div class="eg">e.g. x opposite 50°, with 12 opposite 40°:  x/sin50° = 12/sin40°  →  x = 12·sin50°/sin40°.</div>`,
  },
  sineRuleAngle: {
    title: "Sine rule — finding an angle",
    body: `
      <p>Flip the rule so the <b>sines are on top</b>:</p>
      <div class="formula">sinÂ/a = sinB̂/b = sinĈ/c</div>
      <p>Solve for the sine, then use inverse sine (sin⁻¹).</p>
      <div class="eg">e.g. sinθ/9 = sin50°/13  →  sinθ = 9·sin50°/13  →  θ = sin⁻¹(…).</div>`,
  },
  ambiguousCase: {
    title: "The ambiguous case",
    body: `
      <p>Only with the <b>sine rule</b>, and only with two sides and a <b>non-included</b> angle (SSA). Sometimes <b>two</b> triangles fit.</p>
      <p>Compare the side <b>a</b> opposite the known angle Â with <b>h = b·sinÂ</b>:</p>
      <ul>
        <li>a &lt; h → <b>no</b> triangle</li>
        <li>a = h → <b>one</b> triangle (right-angled)</li>
        <li>h &lt; a &lt; b → <b>two</b> triangles (acute and obtuse)</li>
        <li>a ≥ b → <b>one</b> triangle</li>
      </ul>
      <div class="formula">obtuse angle = 180° − (acute angle)</div>`,
  },
  cosineRuleSide: {
    title: "Cosine rule — finding a side",
    body: `
      <p>Use it with two sides and the <b>included</b> angle (the angle between them).</p>
      <div class="formula">a² = b² + c² − 2bc·cosÂ</div>
      <p>(side you want)² = (sum of the other two squared) − 2 × (those two) × cos(angle between them). Work out the right side, then square-root.</p>`,
  },
  cosineRuleAngle: {
    title: "Cosine rule — finding an angle",
    body: `
      <p>Use it when you know <b>all three sides</b>. Rearranged so the cosine is the subject:</p>
      <div class="formula">cosÂ = (b² + c² − a²) / (2bc)</div>
      <p>The side <b>opposite</b> the angle you want is the one subtracted on top. Finish with inverse cosine — a <b>negative</b> answer means the angle is <b>obtuse</b>.</p>
      <div class="eg">This SSS form is <b>not</b> on the formula sheet — memorise it.</div>`,
  },
  areaRule: {
    title: "Area rule",
    body: `
      <p>Use two sides and the angle <b>included</b> between them:</p>
      <div class="formula">Area = ½·b·c·sinÂ</div>
      <p>If the angle you have is not between the two sides, find the included angle first (sine or cosine rule).</p>`,
  },
  areaPolygon: {
    title: "Area of a regular polygon",
    body: `
      <p>Split a regular n-gon into <b>n equal triangles</b> from the centre. Each centre angle is 360°/n.</p>
      <div class="formula">Area = n·s² / (4·tan(180°/n))</div>
      <div class="eg">e.g. a regular octagon (n = 8) with side 10:  Area = 8·10² / (4·tan22,5°).</div>`,
  },
  areaQuad: {
    title: "Area of a composite shape",
    body: `
      <p>Break the figure into triangles (and rectangles) whose areas you can find, then <b>add them up</b>.</p>
      <p>If you need a missing length first — like the base shared by two parts — get it from the <b>cosine rule</b>, then apply the area rule or length × breadth.</p>`,
  },
  shortestDistance: {
    title: "Shortest distance to a line",
    body: `
      <p>The shortest distance from a point to a side is the <b>perpendicular</b> height to that side.</p>
      <p>Find the triangle's area, then turn the area formula around:</p>
      <div class="formula">Area = ½ · base · height   →   height = 2·Area / base</div>`,
  },
  mixedStrategy: {
    title: "Working through a problem",
    body: `
      <p>Three questions, in order:</p>
      <ol>
        <li><b>What am I given?</b> Label the sides and angles (friends).</li>
        <li><b>Which rule fits?</b> Side+opposite angle → sine; included angle or 3 sides → cosine; area from 2 sides + included angle → area rule.</li>
        <li><b>Do I need a stepping stone?</b> Often find one missing angle or side first, then the thing asked.</li>
      </ol>`,
  },

  /* ---------------- Measurement ---------------- */
  measNaming: {
    title: "Naming a solid",
    body: `
      <p>Read the solid off its <b>faces</b> and <b>cross-section</b>:</p>
      <ul>
        <li><b>Prism</b> — same flat shape all the way through (rectangular, triangular, …). A <b>cube</b> is a prism with six equal squares.</li>
        <li><b>Pyramid</b> — a flat base rising to a single apex; flat triangular faces.</li>
        <li><b>Cylinder</b> — two circles joined by a curved side.</li>
        <li><b>Cone</b> — one circle rising to an apex (curved side).</li>
        <li><b>Sphere</b> — a ball; <b>hemisphere</b> — half a ball.</li>
      </ul>
      <div class="eg">A curved face means cylinder / cone / sphere / hemisphere; only flat faces means prism / pyramid.</div>`,
  },
  volFormula: {
    title: "Volume — which formula",
    body: `
      <p>Volume is how much space fills the inside (cubic units).</p>
      <ul>
        <li><b>Prism or cylinder:</b> V = (area of base) × height. So a cylinder is πr²·h.</li>
        <li><b>Cone or pyramid:</b> a third of the matching prism/cylinder — V = ⅓ · (base area) · H.</li>
        <li><b>Sphere</b> = 4/3·πr³; <b>hemisphere</b> = ⅔πr³ (half of it).</li>
      </ul>
      <div class="formula">cube ℓ³ · prism ℓbh · cylinder πr²h · cone ⅓πr²H · pyramid ⅓ℓ²H</div>`,
  },
  saFormula: {
    title: "Surface area — which formula",
    body: `
      <p>Surface area adds up <b>every outside face</b> (square units). Unroll the curved bits:</p>
      <ul>
        <li>a cylinder's side opens into a rectangle 2πr wide and h tall → 2πrh;</li>
        <li>each closed circular end is πr².</li>
      </ul>
      <div class="formula">cube 6ℓ² · prism 2(ℓb+ℓh+bh) · closed cylinder 2πr²+2πrh · cone πr²+πrh · square pyramid ℓ²+2ℓh · sphere 4πr²</div>`,
  },
  thirdFamily: {
    title: "The ‘one third’ family",
    body: `
      <p>A <b>cone</b> or <b>pyramid</b> holds exactly <b>⅓</b> of the cylinder or prism with the same base and height.</p>
      <div class="formula">V(cone) = ⅓πr²H   ·   V(pyramid) = ⅓ · (base area) · H</div>
      <p>So whenever you see a point (apex), expect a ⅓ in the volume.</p>`,
  },
  slantPerp: {
    title: "Slant height vs perpendicular height",
    body: `
      <p>A cone or pyramid has <b>two</b> different heights:</p>
      <ul>
        <li><b>H — perpendicular height:</b> straight up the middle, apex to base centre. Used for <b>volume</b>.</li>
        <li><b>h — slant height:</b> along the sloping face, apex to the edge of the base. Used for the <b>slanted surface area</b>.</li>
      </ul>
      <p>They sit in a right-angled triangle with the radius (for a pyramid: with <b>half the base side</b>, ℓ/2):</p>
      <div class="formula">h² = H² + r²   →   the slant h is the hypotenuse, so h &gt; H</div>`,
  },
  saVsVol: {
    title: "Area vs volume (and their units)",
    body: `
      <p><b>Surface area</b> covers the outside skin — two lengths multiplied, so <b>square</b> units (cm²).</p>
      <p><b>Volume</b> fills the inside — three lengths multiplied, so <b>cubic</b> units (cm³).</p>
      <div class="eg">If the question asks how much paint → area. How much it holds → volume.</div>`,
  },
  openSurfaces: {
    title: "Open tops & bottoms",
    body: `
      <p>The curved side of a cylinder is <b>always</b> there: 2πrh. Then add one circle (πr²) for <b>each end that is closed</b>.</p>
      <ul>
        <li><b>Closed</b> both ends: 2πr² + 2πrh</li>
        <li><b>Open top</b> (one lid missing): πr² + 2πrh</li>
        <li><b>Open top &amp; bottom</b> (a pipe): 2πrh only</li>
      </ul>
      <p>Read the picture: a solid lid is counted; an open rim you can see into is not. An open-top box has 5 faces, not 6.</p>`,
  },
  compositeSolids: {
    title: "Composite (joined) solids",
    body: `
      <p>Two solids stuck together (e.g. a cylinder with a cone or dome on top).</p>
      <ul>
        <li><b>Volume:</b> just <b>add</b> the parts' volumes — nothing is hidden.</li>
        <li><b>Surface area:</b> add the <b>outer</b> faces, but <b>leave out the joining face</b> where they meet — it is sealed inside.</li>
      </ul>
      <div class="eg">Silo = cylinder + cone: V = πr²h + ⅓πr²H. The circle where they join is not part of the surface.</div>`,
  },
  findHeight: {
    title: "Finding the perpendicular height (Pythagoras)",
    body: `
      <p>Inside a cone or pyramid hides a <b>right-angled triangle</b>. Its three sides are the perpendicular height <b>H</b>, the slant height <b>h</b>, and a bottom leg. The slant is the <b>hypotenuse</b> (opposite the right angle), so it is the longest side.</p>
      <ul>
        <li><b>Cone:</b> the bottom leg is the <b>full radius r</b> → <span class="formula" style="display:inline">h² = H² + r²</span></li>
        <li><b>Square pyramid:</b> the slant goes to the <b>middle</b> of a base edge, so the bottom leg is <b>HALF the base</b>, ℓ/2 → <span class="formula" style="display:inline">h² = H² + (ℓ/2)²</span></li>
      </ul>
      <p>To find a missing side, rearrange. For the perpendicular height:</p>
      <div class="formula">H = √(h² − r²)   (cone)      H = √(h² − (ℓ/2)²)   (pyramid)</div>
      <div class="eg">e.g. cone r = 5, slant h = 13 → H = √(13² − 5²) = √144 = 12. Pyramid base ℓ = 10, slant h = 13 → ½ℓ = 5, H = √(13² − 5²) = 12.</div>`,
  },
  scaleFactor: {
    title: "Scaling a solid (×k)",
    body: `
      <p>Multiply <b>every</b> length by k and:</p>
      <div class="formula">length ×k   ·   area ×k²   ·   volume ×k³</div>
      <p>Area uses two lengths (so k²); volume uses three (so k³).</p>
      <div class="eg">Double all dimensions (k = 2): surface area ×4, volume ×8.</div>`,
  },

  /* ---------------- Functions ---------------- */
  funcTypes: {
    title: "The four function families",
    body: `
      <p>Spot the family from the equation:</p>
      <ul>
        <li><b>Straight line</b> — just an x, no powers, no x on the bottom: y = ax + q.</li>
        <li><b>Parabola</b> — has an <b>x²</b> (or a bracket squared): y = ax² + bx + c. Shape ∪ or ∩, one turning point.</li>
        <li><b>Hyperbola</b> — x in the <b>denominator</b>: y = a/(x − p) + q. Two branches, two asymptotes.</li>
        <li><b>Exponential</b> — x in the <b>exponent</b>: y = a·bˣ + q. One horizontal asymptote, no turning point.</li>
      </ul>
      <p>Names for y: f(x), g(x), h(x). f(3) means “substitute x = 3 and read the y-value”.</p>`,
  },
  domainRange: {
    title: "Domain & range",
    body: `
      <p><b>Domain</b> = all the x-values the graph uses. <b>Range</b> = all the y-values.</p>
      <ul>
        <li><b>Line / parabola / exponential:</b> domain is x ∈ ℝ (every x works).</li>
        <li><b>Hyperbola:</b> domain x ∈ ℝ, x ≠ p (it skips the vertical asymptote).</li>
      </ul>
      <p>Range:</p>
      <ul>
        <li><b>Parabola:</b> y ≥ q (happy) or y ≤ q (sad), where q is the turning-point y.</li>
        <li><b>Hyperbola:</b> y ∈ ℝ, y ≠ q (skips the horizontal asymptote).</li>
        <li><b>Exponential:</b> y &gt; q (a &gt; 0) or y &lt; q (a &lt; 0).</li>
      </ul>`,
  },
  linearGraph: {
    title: "The straight line y = ax + q",
    body: `
      <p><b>a</b> is the gradient, <b>q</b> is the y-intercept.</p>
      <ul>
        <li>a &gt; 0 → increasing (slopes up); a &lt; 0 → decreasing (slopes down).</li>
        <li><b>y-intercept:</b> let x = 0 → it is just q, the point (0 ; q).</li>
        <li><b>x-intercept:</b> let y = 0 and solve for x.</li>
      </ul>
      <div class="eg">y = 2x − 6: y-intercept (0 ; −6); x-intercept where 0 = 2x − 6 → x = 3, point (3 ; 0).</div>`,
  },
  parabolaShape: {
    title: "The parabola — shape & turning point",
    body: `
      <p>Standard form y = ax² + bx + c; turning-point form y = a(x − p)² + q with turning point (p ; q).</p>
      <ul>
        <li><b>a &gt; 0</b> → “happy” ∪, opens up, has a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → “sad” ∩, opens down, has a <b>maximum</b>.</li>
        <li><b>Turning point x</b> = −b/(2a); substitute back for the y.</li>
        <li><b>Axis of symmetry</b> = the vertical line through the turning point, x = p.</li>
      </ul>`,
  },
  hyperbolaGraph: {
    title: "The hyperbola y = a/(x − p) + q",
    body: `
      <p>Two branches sitting around two asymptotes:</p>
      <ul>
        <li><b>Vertical asymptote:</b> x = p. <b>Horizontal asymptote:</b> y = q.</li>
        <li><b>a &gt; 0</b> → branches top-right & bottom-left, each <b>decreasing</b>.</li>
        <li><b>a &lt; 0</b> → branches top-left & bottom-right, each <b>increasing</b>.</li>
      </ul>
      <p>The graph never touches its asymptotes — that is why x ≠ p and y ≠ q.</p>`,
  },
  exponentialGraph: {
    title: "The exponential y = a·bˣ + q",
    body: `
      <p>One horizontal asymptote and no turning point.</p>
      <ul>
        <li><b>Asymptote:</b> y = q (the graph flattens towards it).</li>
        <li><b>b &gt; 1</b> → growth (“taking off”, increasing). <b>0 &lt; b &lt; 1</b> → decay (“landing”, decreasing).</li>
        <li><b>a &gt; 0</b> → graph above the asymptote (range y &gt; q). <b>a &lt; 0</b> → below (y &lt; q).</li>
      </ul>
      <div class="eg">A fraction base is a negative exponent: (½)ˣ = 2⁻ˣ.</div>`,
  },
  readGraph: {
    title: "Reading features off a graph",
    body: `
      <ul>
        <li><b>y-intercept:</b> where the graph crosses the y-axis (x = 0).</li>
        <li><b>x-intercept(s):</b> where it crosses the x-axis (y = 0).</li>
        <li><b>Turning point:</b> the lowest/highest point of a parabola — read both coordinates.</li>
        <li><b>Asymptotes:</b> the dashed lines the graph hugs but never touches.</li>
      </ul>
      <p>Follow a point straight down to the x-axis for its x-value, and straight across to the y-axis for its y-value.</p>`,
  },
  incDec: {
    title: "Increasing & decreasing",
    body: `
      <p>Read the graph <b>left to right</b>: going up = increasing, going down = decreasing.</p>
      <p>A parabola changes direction at its turning point x = p:</p>
      <ul>
        <li><b>Happy (∪):</b> decreasing for x &lt; p, increasing for x &gt; p.</li>
        <li><b>Sad (∩):</b> increasing for x &lt; p, decreasing for x &gt; p.</li>
      </ul>
      <p>A straight line is increasing everywhere (a &gt; 0) or decreasing everywhere (a &lt; 0).</p>`,
  },
  posNeg: {
    title: "Where a graph is positive or negative",
    body: `
      <p>“f(x)” is the <b>y-value</b>, so:</p>
      <ul>
        <li><b>f(x) &gt; 0</b> — the graph is <b>above</b> the x-axis.</li>
        <li><b>f(x) &lt; 0</b> — the graph is <b>below</b> the x-axis.</li>
      </ul>
      <p>The x-intercepts are the boundaries. For a parabola with intercepts a &lt; b:</p>
      <ul>
        <li><b>Happy:</b> above for x &lt; a or x &gt; b; below for a &lt; x &lt; b.</li>
        <li><b>Sad:</b> above for a &lt; x &lt; b; below for x &lt; a or x &gt; b.</li>
      </ul>
      <p>Always write x first, e.g. <i>−2 &lt; x &lt; 3</i>.</p>`,
  },
  ineqCombined: {
    title: "Product & quotient inequalities (signs)",
    body: `
      <p>It is all about <b>signs</b>:</p>
      <ul>
        <li><b>f(x)·g(x) &gt; 0</b> — same side of the x-axis (both above, or both below).</li>
        <li><b>f(x)·g(x) &lt; 0</b> — different sides (one above, one below).</li>
        <li><b>f(x)/g(x)</b> — same rule, but g(x) ≠ 0.</li>
        <li><b>x·f(x) &gt; 0</b> — x and the y-value have the <b>same</b> sign → quadrants 1 &amp; 3.</li>
        <li><b>x·f(x) &lt; 0</b> — different signs → quadrants 2 &amp; 4.</li>
      </ul>
      <p>When comparing two graphs (f &gt; g), the boundaries are the x-values of the <b>intersection</b> points.</p>`,
  },
  transformations: {
    title: "Transformations",
    body: `
      <p>Starting from f(x):</p>
      <ul>
        <li><b>Up/down:</b> f(x) + k (up), f(x) − k (down).</li>
        <li><b>Left/right (inside with x):</b> f(x + k) shifts <b>left</b>, f(x − k) shifts <b>right</b>.</li>
        <li><b>Reflection in the x-axis:</b> −f(x) (the y’s change sign).</li>
        <li><b>Reflection in the y-axis:</b> f(−x) (the x’s change sign).</li>
        <li><b>Vertical stretch:</b> k·f(x).</li>
      </ul>
      <p>A vertical shift moves a parabola’s turning point y and an asymptote y = q; x stays the same.</p>`,
  },
  intersections: {
    title: "Where two graphs meet",
    body: `
      <p>An <b>intersection</b> point lies on <b>both</b> graphs at once — read its coordinates off both axes.</p>
      <p>To compare graphs:</p>
      <ul>
        <li><b>f(x) &gt; g(x)</b> — where f is <b>above</b> g.</li>
        <li>The graphs swap over at their intersection points, so those x-values are the boundaries.</li>
      </ul>`,
  },
  natureRoots: {
    title: "Nature of the roots",
    body: `
      <p>The roots (x-intercepts) of a parabola depend on the discriminant Δ = b² − 4ac:</p>
      <ul>
        <li><b>Δ &gt; 0</b> — two real, unequal roots (cuts the x-axis twice).</li>
        <li><b>Δ = 0</b> — two equal roots (touches the x-axis once).</li>
        <li><b>Δ &lt; 0</b> — non-real roots (never reaches the x-axis).</li>
      </ul>
      <p><b>The y = k method:</b> for a happy parabola with turning-point value y₀, the line y = k meets it <b>twice</b> when k &gt; y₀, <b>once</b> when k = y₀, and <b>not at all</b> when k &lt; y₀.</p>`,
  },
  avgGradient: {
    title: "Average gradient",
    body: `
      <p>The average gradient between two points is the gradient of the straight line joining them.</p>
      <div class="formula">average gradient = (y₂ − y₁) / (x₂ − x₁)</div>
      <p>First substitute each x into the function to get its y-value, then use the formula.</p>
      <div class="eg">f(x) = x² − 4 between x = −1 and x = 3: points (−1 ; −3) and (3 ; 5) → (5 − (−3))/(3 − (−1)) = 2.</div>`,
  },
  maxLength: {
    title: "Maximum / minimum length between graphs",
    body: `
      <p>For a vertical line between two graphs:</p>
      <div class="formula">length = (graph on top) − (graph below)</div>
      <p>If one is a parabola, that difference is itself a parabola. Find where it turns (x = −b/(2a)) and substitute back to get the biggest (or smallest) length.</p>
      <div class="eg">Keep the brackets when subtracting: g − f = −x + 9 − (x² − 2x + 3) = −x² + x + 6.</div>`,
  },

  /* ---- Trig Graphs (Chapter 6) ---- */
  trigParents: {
    title: "The three parent graphs",
    body: `
      <p>Three shapes to know by heart (for x from 0° to 360°):</p>
      <ul>
        <li><b>y = sin x</b> — starts at 0, peak +1 at 90°, back to 0 at 180°, low −1 at 270°.</li>
        <li><b>y = cos x</b> — starts at its peak +1 at 0°, 0 at 90°, low −1 at 180°. Cosine is sine shifted 90° left.</li>
        <li><b>y = tan x</b> — climbs through 0 at 0°, 180° and 360°, with vertical <b>asymptotes</b> at 90° and 270°.</li>
      </ul>
      <p>Sine and cosine are "identical twins": same amplitude (1), same period (360°), same range [−1 ; 1].</p>`,
  },
  trigParams: {
    title: "What a, b and q do",
    body: `
      <p>Every graph is written as <b>y = a·sin b(x − p) + q</b> (cos and tan use the same form):</p>
      <ul>
        <li><b>a</b> — sets the amplitude: its <b>size</b> |a| is the height from the midline to a peak. A <b>negative a</b> flips the graph upside-down.</li>
        <li><b>b</b> — squashes the graph sideways: a bigger b means more cycles (a shorter graph).</li>
        <li><b>q</b> — slides the whole graph up (q &gt; 0) or down (q &lt; 0). The midline becomes y = q.</li>
      </ul>
      <div class="eg">y = 2sin x is twice as tall as sin x; y = −sin x is sin x flipped; y = sin x + 3 sits 3 units higher.</div>`,
  },
  trigPeriod: {
    title: "Period",
    body: `
      <p>The <b>period</b> is the length of <b>one full cycle</b> (one complete wave).</p>
      <div class="formula">sin &amp; cos: period = 360° ÷ b   ·   tan: period = 180° ÷ b</div>
      <p>A larger b gives a shorter graph (more cycles squeezed into 360°); a smaller b gives a longer graph.</p>
      <div class="eg">y = cos 3x → 360° ÷ 3 = 120°.  y = tan 2x → 180° ÷ 2 = 90°.  y = sin ½x → 360° ÷ ½ = 720°.</div>`,
  },
  trigAmplitude: {
    title: "Amplitude",
    body: `
      <p>The <b>amplitude</b> is the height from the midline up to a peak — always positive.</p>
      <div class="formula">amplitude = |a| = (y max − y min) ÷ 2</div>
      <p>The sign of a only flips the graph; it does not change the amplitude. <b>Tangent has no amplitude</b> (it has no maximum or minimum) — its amplitude is undefined.</p>
      <div class="eg">y = −3cos x → amplitude 3.  y = ½sin x → amplitude ½.  y = tan 2x → undefined.</div>`,
  },
  trigRange: {
    title: "Range",
    body: `
      <p>The <b>range</b> is the set of y-values the graph reaches.</p>
      <div class="formula">sin &amp; cos: from (q − amplitude) up to (q + amplitude)   ·   tan: y ∈ ℝ</div>
      <p>Start with the midline y = q, then go one amplitude down and one amplitude up. Tangent reaches every real value, so its range is always ℝ.</p>
      <div class="eg">y = 2sin x − 1 → midline −1, amplitude 2 → range [−3 ; 1].  y = tan x + 5 → y ∈ ℝ.</div>`,
  },
  trigCycles: {
    title: "How many cycles (curves)",
    body: `
      <p>The number of complete cycles over an interval is the interval length divided by the period.</p>
      <div class="formula">number of cycles = interval length ÷ period</div>
      <p>Over a 360° interval this is just equal to b (since period = 360° ÷ b).</p>
      <div class="eg">y = sin 2x on [0° ; 360°] → 360 ÷ 180 = 2 cycles.  y = cos 3x → 3 cycles.</div>`,
  },
  trigShifts: {
    title: "Horizontal & vertical shifts",
    body: `
      <p><b>Vertical (q):</b> q &gt; 0 shifts up, q &lt; 0 shifts down — the midline moves to y = q.</p>
      <p><b>Horizontal (p):</b> the bracket is (x − p). Read p as the number after the sign, and the graph moves the <b>opposite</b> way:</p>
      <ul>
        <li>sin(x − 30°) → shifts 30° to the <b>right</b>.</li>
        <li>sin(x + 30°) → shifts 30° to the <b>left</b>.</li>
      </ul>
      <p>If b ≠ 1, factor it out first: sin(2x − 60°) = sin 2(x − 30°), so the real shift is 30°, not 60°.</p>`,
  },
  tanGraph: {
    title: "The tangent graph",
    body: `
      <p>tan x = sin x ÷ cos x, so:</p>
      <ul>
        <li><b>x-intercepts</b> where the top is zero: sin x = 0 (at 0°, 180°, 360°, …).</li>
        <li><b>Asymptotes</b> where the bottom is zero: cos x = 0 (at 90°, 270°, …) — the graph is undefined there.</li>
      </ul>
      <div class="formula">period = 180°   ·   asymptotes are 180° apart   ·   range y ∈ ℝ</div>
      <p>It has no amplitude — there is no highest or lowest point.</p>`,
  },
  tanAValue: {
    title: "Finding a for a tan graph",
    body: `
      <p>A tan graph has no max or min, so use two reference points <b>45° on either side</b> of an inflection point (where a branch crosses its midline).</p>
      <div class="formula">a = ("y at +45°" − "y at −45°") ÷ 2</div>
      <p>This works because tan 45° = 1 and tan(−45°) = −1, so 45° from the centre the graph sits one a above (or below) the midline.</p>
      <div class="eg">If the references are 3 and −1, then a = (3 − (−1)) ÷ 2 = 2.</div>`,
  },
  findTrigEquation: {
    title: "Finding the equation from a graph",
    body: `
      <p>Compare the graph with the parent (sin, cos or tan) and read off, in turn:</p>
      <ul>
        <li><b>a</b> — amplitude = (y max − y min) ÷ 2; make it negative if the graph is flipped.</li>
        <li><b>q</b> — the midline: q = (y max + y min) ÷ 2.</li>
        <li><b>b</b> — from the period: b = 360° ÷ period (use 180° for tan).</li>
        <li><b>p</b> — how far it has shifted left or right.</li>
      </ul>
      <p>Then write y = a·sin b(x − p) + q.</p>`,
  },
  trigTogether: {
    title: "Two graphs together",
    body: `
      <p>When two trig graphs share a set of axes:</p>
      <ul>
        <li><b>Intersections</b> are the x-values where f(x) = g(x) — read them where the curves cross.</li>
        <li><b>f(x) &gt; g(x)</b> wherever the f-curve is <b>above</b> the g-curve.</li>
        <li><b>f(x) &gt; 0</b> wherever the curve is above the x-axis (between its x-intercepts).</li>
      </ul>
      <p>Always work within the interval the question gives you.</p>`,
  },

  /* ---------- Analytical Geometry ---------- */
  whichFormula: {
    title: "Which formula — and what its answer looks like",
    body: `
      <p>Three formulas do three different jobs. Ask yourself what you’re after:</p>
      <ul>
        <li><b>Distance</b> → a <b>length</b> (one positive number): AB = √[(x<sub>B</sub>−x<sub>A</sub>)² + (y<sub>B</sub>−y<sub>A</sub>)²]</li>
        <li><b>Midpoint</b> → a <b>coordinate</b> (x ; y): M = ( (x<sub>A</sub>+x<sub>B</sub>)/2 ; (y<sub>A</sub>+y<sub>B</sub>)/2 )</li>
        <li><b>Gradient</b> → a <b>slope number</b>: m = (y<sub>B</sub>−y<sub>A</sub>)/(x<sub>B</sub>−x<sub>A</sub>)</li>
      </ul>
      <p>Small <b>m</b> = gradient. Capital <b>M</b> = midpoint. Keep the points in the SAME order: top and bottom in the gradient formula, and in BOTH brackets of the distance formula.</p>`,
  },
  gradientSign: {
    title: "The sign of a gradient",
    body: `
      <p>Gradient = rise ÷ run. Read the line from <b>left to right</b>:</p>
      <ul>
        <li><b>Positive</b> — the line goes <b>up</b> ↗ (increasing).</li>
        <li><b>Negative</b> — the line goes <b>down</b> ↘ (decreasing).</li>
      </ul>
      <p>Steepness is the <b>size</b> of the gradient (ignore the sign): a gradient of −4 is steeper than one of 2.</p>`,
  },
  specialLines: {
    title: "Horizontal & vertical lines",
    body: `
      <p>The two lines learners mix up:</p>
      <ul>
        <li><b>Horizontal</b> line — no rise, only run → gradient = <b>0</b> (e.g. 0 ÷ 6 = 0).</li>
        <li><b>Vertical</b> line — no run → you’d divide by 0, so the gradient is <b>undefined</b>.</li>
      </ul>
      <div class="eg">Flat = zero. Straight up = undefined.</div>`,
  },
  parallelPerp: {
    title: "Parallel & perpendicular (the gradient rules)",
    body: `
      <p>Compare the gradients:</p>
      <div class="formula">Parallel:  m<sub>1</sub> = m<sub>2</sub><br>Perpendicular:  m<sub>1</sub> × m<sub>2</sub> = −1</div>
      <p>So perpendicular lines have gradients that are <b>negative reciprocals</b> of each other.</p>
      <div class="eg">e.g. m = 2/3 → the perpendicular gradient is −3/2 (flip it over, change the sign). Check: 2/3 × −3/2 = −1. ✓</div>`,
  },
  perpGradient: {
    title: "The negative reciprocal",
    body: `
      <p>To get the gradient <b>perpendicular</b> to a given one: <b>switch</b> the top and bottom of the fraction, then <b>change the sign</b>.</p>
      <ul>
        <li>m = 2/3 → −3/2</li>
        <li>m = −4 = −4/1 → +1/4</li>
      </ul>
      <p>Reading a gradient from <b>ax + by = 0</b>: make y the subject (y = mx + c); the gradient is <b>−a/b</b>.</p>`,
  },
  angleInclination: {
    title: "Angle of inclination",
    body: `
      <p>θ is the angle the line makes with the <b>positive x-axis</b>, measured anti-clockwise, and</p>
      <div class="formula">tan θ = m</div>
      <ul>
        <li><b>Positive</b> gradient → θ is <b>acute</b>: θ = tan⁻¹(m).</li>
        <li><b>Negative</b> gradient → θ is <b>obtuse</b>: θ = 180° − tan⁻¹(|m|).</li>
      </ul>
      <p><b>Do not</b> type the negative gradient into tan⁻¹ — drop the sign, find the acute reference angle, then take 180° − that.</p>
      <div class="eg">e.g. m = −4/5 → ref = tan⁻¹(4/5) = 38,66°, so θ = 180° − 38,66° = 141,34°.</div>`,
  },
  perpBisector: {
    title: "Perpendicular bisector",
    body: `
      <p>The perpendicular bisector of AB does <b>two</b> things at once:</p>
      <ul>
        <li>it passes through the <b>midpoint</b> of AB, and</li>
        <li>it is <b>perpendicular</b> to AB (crosses it at 90°).</li>
      </ul>
      <p>So its gradient is the <b>negative reciprocal</b> of AB’s gradient, and it goes through M, the midpoint. Every point on it is the same distance from A as from B.</p>`,
  },
  triangleArea: {
    title: "Area of a triangle — base & ⊥height",
    body: `
      <div class="formula">Area = ½ × base × ⊥height</div>
      <p>Pick any side as the <b>base</b>. The <b>perpendicular height</b> (the altitude) is then drawn from the <b>opposite vertex</b>, meeting that base at <b>90°</b>.</p>
      <ul>
        <li>An <b>altitude</b> makes a right angle with the base — that’s the height.</li>
        <li>A <b>median</b> goes to the midpoint — that is <b>not</b> the height.</li>
      </ul>
      <p>Except in a right-angled triangle, the height is a NEW segment inside the triangle, not one of the sides.</p>`,
  },
  proofWords: {
    title: "Lines in a triangle & ‘prove that…’",
    body: `
      <ul>
        <li><b>Median</b> — vertex to the <b>midpoint</b> of the opposite side.</li>
        <li><b>Altitude</b> — vertex, <b>perpendicular</b> to the opposite side (the height).</li>
        <li><b>Perpendicular bisector</b> — through a side’s <b>midpoint</b> AND perpendicular to it.</li>
      </ul>
      <p>To prove things, show:</p>
      <div class="formula">∥ : m<sub>AB</sub> = m<sub>CD</sub><br>⊥ : m<sub>AB</sub> × m<sub>CD</sub> = −1<br>collinear : m<sub>AB</sub> = m<sub>BC</sub><br>parallelogram : diagonals share a midpoint</div>`,
  },

  /* ---------------- Number Patterns ---------------- */
  patClassify: {
    title: "Which kind of pattern?",
    body: `
      <p>Build the <b>difference pyramid</b>: write the terms, then the gaps between them (first differences), then the gaps of those (second differences).</p>
      <ul>
        <li><b>First difference constant</b> → <b>arithmetic</b> (linear). You add the same number each time.</li>
        <li><b>Second difference constant</b> → <b>quadratic</b>. The first differences change by the same amount.</li>
        <li><b>Constant ratio</b> (divide a term by the one before it) → <b>geometric</b>. You multiply by the same number each time.</li>
      </ul>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → first diffs +3, +3, +3 → arithmetic. 1 ; 4 ; 11 ; 22 → second diffs 4, 4 → quadratic. 6 ; 12 ; 24 → ×2 each time → geometric.</div>`,
  },
  patArithmetic: {
    title: "Arithmetic (linear) patterns",
    body: `
      <p>An arithmetic pattern has a <b>constant first difference</b> d — the same number added each step.</p>
      <div class="formula">d = T₂ − T₁ = T₃ − T₂ = …</div>
      <p>Find d by subtracting any term from the one after it.</p>
      <div class="eg">e.g. 4 ; 7 ; 10 ; 13 → d = 7 − 4 = 3.</div>`,
  },
  patArithTerm: {
    title: "The general term of an arithmetic pattern",
    body: `
      <p>Two formulas — either works:</p>
      <div class="formula">Tₙ = an + c &nbsp;(a = the common difference, c = T₀)<br>Tₙ = a + (n − 1)d &nbsp;(a = T₁, d = the common difference)</div>
      <p>Watch the letter clash: in <b>an + c</b> the letter a is the <b>difference</b>; in <b>a + (n − 1)d</b> the letter a is the <b>first term</b>. For an + c, find c by stepping back one: c = T₀ = T₁ − d.</p>
      <p>Once you have Tₙ: substitute n for any term; or set Tₙ equal to a value and solve for n to find <b>which</b> term it is.</p>
      <div class="eg">e.g. 4 ; 7 ; 10 → a = 3, c = 4 − 3 = 1, so Tₙ = 3n + 1. Then T₁₀ = 31.</div>`,
  },
  patQuadratic: {
    title: "Quadratic patterns → Tₙ = an² + bn + c",
    body: `
      <p>A quadratic pattern has a <b>constant second difference</b>. Build the pyramid, then work from the <b>bottom up</b> with three relationships:</p>
      <div class="formula">2a = second difference<br>3a + b = T₂ − T₁<br>a + b + c = T₁</div>
      <ol>
        <li>2a = second difference → solve for <b>a</b>.</li>
        <li>3a + b = T₂ − T₁ → put a in, solve for <b>b</b>.</li>
        <li>a + b + c = T₁ → put a, b in, solve for <b>c</b>.</li>
      </ol>
      <div class="eg">e.g. 1 ; 4 ; 11 ; 22 → 2nd diff 4 → a = 2; 3(2)+b = 3 → b = −3; 2−3+c = 1 → c = 2. Tₙ = 2n² − 3n + 2.</div>`,
  },
  patQuadUnknown: {
    title: "Finding a missing term",
    body: `
      <p>In a quadratic pattern the <b>second difference is constant</b> — use that to fill a gap.</p>
      <ol>
        <li>Write the first differences (some contain the unknown x).</li>
        <li>Form the two second differences from them.</li>
        <li>Set the two second differences <b>equal</b> (they must be the same) and solve for x.</li>
      </ol>
      <div class="eg">For T₁ ; T₂ ; x ; T₄ : (x − T₂) − (T₂ − T₁) = (T₄ − x) − (x − T₂), then solve for x.</div>`,
  },
  patMinMax: {
    title: "Minimum & maximum term",
    body: `
      <p>A quadratic pattern lies on a parabola, so it has a turning point — the smallest or largest term.</p>
      <ul>
        <li><b>a &gt; 0</b> → ‘happy’ parabola → the turning point is a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → ‘sad’ parabola → the turning point is a <b>maximum</b>.</li>
      </ul>
      <div class="formula">term number of the extreme: n = −b ÷ (2a)</div>
      <p>That n tells you <b>which</b> term is the extreme (it must be a natural number — round to the nearest if needed). Substitute it back into Tₙ for the extreme <b>value</b>.</p>`,
  },
  patConsecDiff: {
    title: "The gap between consecutive terms",
    body: `
      <p>The first differences of a quadratic pattern form their own <b>arithmetic</b> pattern:</p>
      <ul>
        <li>first term = T₂ − T₁ (the first gap),</li>
        <li>common difference = the constant <b>second difference</b>.</li>
      </ul>
      <p>So a question about a gap becomes a question about a term of that linear gap-pattern:</p>
      <div class="formula">gap between Tₖ and Tₖ₊₁ = the kth term of the gap-pattern = (first gap) + (k − 1)(second difference)</div>
      <div class="eg">−5 ; 0 ; 7 ; 16 ; 27 → gaps 5 ; 7 ; 9 ; 11 (linear, common difference 2).</div>`,
  },
  patGeometric: {
    title: "Geometric patterns → Tₙ = a·rⁿ⁻¹",
    body: `
      <p>A geometric pattern has a <b>constant ratio</b> r — multiply by the same number each step.</p>
      <div class="formula">r = T₂ ÷ T₁ = T₃ ÷ T₂ = …<br>Tₙ = a · rⁿ⁻¹ &nbsp;(a = T₁)</div>
      <div class="eg">e.g. 6 ; 12 ; 24 ; 48 → r = 2, a = 6, so Tₙ = 6·2ⁿ⁻¹. Then T₄ = 6·2³ = 48.</div>`,
  },
  patGeoCare: {
    title: "Two geometric traps",
    body: `
      <ul>
        <li><b>Dividing?</b> Write r as a <b>fraction</b>. If each term is divided by 2, then r = ½ (multiply by one half).</li>
        <li><b>Don’t merge a and r.</b> In a·rⁿ⁻¹ the power applies to <b>r only</b>. Do rⁿ⁻¹ first, then multiply by a — powers before multiplication.</li>
      </ul>
      <div class="eg">2·3ⁿ⁻¹ at n = 3 is 2·3² = 2·9 = 18, NOT (2·3)² = 36.</div>`,
  },

  /* ===================== EXPONENTS & SURDS ===================== */
  expLaws: {
    title: "The exponent laws",
    body: `
      <p>Every law is just bookkeeping on the exponents. They only work when the <b>bases are the same</b>.</p>
      <div class="formula">xᵃ · xᵇ = xᵃ⁺ᵇ &nbsp;(multiply → ADD)<br>
        xᵃ ÷ xᵇ = xᵃ⁻ᵇ &nbsp;(divide → SUBTRACT)<br>
        (xᵃ)ᵇ = xᵃᵇ &nbsp;(power of a power → MULTIPLY)<br>
        (xy)ᵃ = xᵃyᵃ &nbsp;·&nbsp; (x/y)ᵃ = xᵃ/yᵃ</div>
      <ul>
        <li><b>x⁰ = 1</b> (anything non-zero to the zero is 1). So 7x⁰ = 7·1 = 7.</li>
        <li><b>x⁻ᵃ = 1/xᵃ</b> — a negative exponent means “flip it”, not “make it negative”.</li>
        <li><b>(x/y)⁻ᵃ = (y/x)ᵃ</b> — flip the fraction, drop the sign.</li>
      </ul>
      <div class="eg">e.g. (2x³)² = 4x⁶ — the 2 is squared too. And 3⁻² = 1/3² = 1/9 (positive!).</div>`,
  },
  expTraps: {
    title: "The classic exponent traps",
    body: `
      <ul>
        <li><b>The base never changes.</b> 2³ · 2² = 2⁵, NOT 4⁵.</li>
        <li><b>x⁰ = 1, not 0.</b></li>
        <li><b>A negative exponent is not a negative number.</b> x⁻² = 1/x², which is positive.</li>
        <li><b>The exponent hits everything in the bracket.</b> (3x³)² = 9x⁶ — square the 3 too.</li>
        <li><b>You cannot split a power of a sum.</b> (x + y)² ≠ x² + y².</li>
        <li><b>Different bases can’t be combined.</b> xᵃ · yᵇ stays as it is.</li>
      </ul>
      <div class="eg">Check yourself: 5⁶ ÷ 5⁴ = 5² ✓ (same base, subtract). 5⁶ ÷ 4⁴ — can’t simplify, different bases.</div>`,
  },
  simplifySteps: {
    title: "Simplifying: what to do first",
    body: `
      <p>The method depends on whether terms are <b>multiplied/divided</b> or <b>added/subtracted</b>.</p>
      <ol>
        <li><b>Always first:</b> rewrite every base as a <b>product of prime factors</b> (8 = 2³, 9 = 3², 72 = 2³·3²).</li>
        <li><b>Only × and ÷ (one big term):</b> multiply brackets out, then add/subtract the exponents of the same base, then simplify.</li>
        <li><b>A + or − between terms:</b> you may NOT just add exponents — you must <b>factorise</b> (usually take out a common factor) first.</li>
      </ol>
      <p><b>Cancelling rule:</b> you can only cancel a factor that divides the <b>whole</b> top and <b>whole</b> bottom — i.e. it’s caged in brackets as a common factor. Never cancel a single term out of a sum.</p>
      <div class="eg">2ˣ + 2ˣ = 2·2ˣ (just like x + x = 2x) — adding LIKE powers behaves like adding like terms.</div>`,
  },
  divorceTypes: {
    title: "Which factorising (“divorce”) is it?",
    body: `
      <p>When there is a <b>+</b> or <b>−</b> between exponential terms you split (“divorce”) the powers, then factorise. Count the terms and look at the shape:</p>
      <ul>
        <li><b>Common factor</b> — every term shares a power, e.g. 3ˣ⁺² − 3ˣ. Take out the smallest power (3ˣ).</li>
        <li><b>Difference of squares</b> — two terms, a subtraction, both perfect squares, e.g. 2²ˣ − 9. Let k = 2ˣ → k² − 9 = (k−3)(k+3).</li>
        <li><b>Trinomial</b> — three terms, e.g. 3²ˣ − 3ˣ − 6. Let k = 3ˣ → k² − k − 6.</li>
        <li><b>Grouping</b> — four terms in two matching pairs, e.g. a·2ˣ + a + 2ˣ + 1. Group and take out a common bracket.</li>
      </ul>
      <p>The substitution <b>let k = (the base)ˣ</b> turns a difference-of-squares or trinomial into an ordinary quadratic.</p>
      <p>Roots work the same way: for x − √x − 6, <b>let k = √x</b> (the smaller power — the other term is then k²).</p>
      <div class="eg">After factorising, remember (the base)ˣ can never be negative or zero — a root like 2ˣ = −4 is rejected.</div>`,
  },
  surdLaws: {
    title: "Surd laws (and the big no-no)",
    body: `
      <p>A surd is a root written with the radical sign. The index sits on the root; powers inside convert to a fraction.</p>
      <div class="formula">ⁿ√(xᵃ) = x^(a/n) &nbsp;— inside power on TOP, index on the BOTTOM<br>
        √a · √b = √(ab) &nbsp;·&nbsp; √a ÷ √b = √(a/b) &nbsp;(same root; a, b ≥ 0)</div>
      <ul>
        <li><b>Like surds add like terms:</b> 5√x − 2√x = 3√x; √x + √x = 2√x.</li>
        <li><b>BIG NO-NO:</b> √a + √b ≠ √(a+b). You cannot add the insides.</li>
      </ul>
      <div class="eg">√(x⁴) = x^(4/2) = x². And ³√(y⁶) = y^(6/3) = y².</div>`,
  },
  surdSigns: {
    title: "Signs, non-real roots & two answers",
    body: `
      <ul>
        <li><b>(−x)^even = positive</b>; (−x)^odd = negative. So (−5)² = 25 but (−5)³ = −125.</li>
        <li><b>even√(negative) = non-real</b> (e.g. √(−4) has no real value). odd√(negative) is fine and negative (³√(−8) = −2).</li>
        <li><b>Even root of a positive → two answers.</b> Solving x² = 9 gives x = ±3. (The symbol √9 on its own means the positive root, 3; the ± appears when you take the root of both sides of an equation.)</li>
      </ul>
      <div class="eg">x² = 25 → x = ±5. But √(−25) is non-real, so it has no real answer.</div>`,
  },
  conjugates: {
    title: "The conjugate",
    body: `
      <p>The <b>conjugate</b> of a two-term surd is the same two terms with the <b>middle sign flipped</b>.</p>
      <div class="formula">conjugate of (√a + b) is (√a − b)<br>conjugate of (√a − √b) is (√a + √b)</div>
      <p>Why it’s useful: a surd times its conjugate is a <b>difference of squares</b>, so the root disappears:</p>
      <div class="formula">(√a + b)(√a − b) = (√a)² − b² = a − b²</div>
      <div class="eg">(√2 + 1)(√2 − 1) = 2 − 1 = 1. No surd left.</div>`,
  },
  rationalise: {
    title: "Rationalising the denominator",
    body: `
      <p>Rationalising means clearing the surd out of the bottom. Multiply top and bottom by the same thing — that’s just multiplying by <b>1</b>, so the value doesn’t change.</p>
      <ul>
        <li><b>One term on the bottom:</b> multiply by (that surd)/(that surd). e.g. 1/√3 × √3/√3 = √3/3.</li>
        <li><b>Two terms on the bottom:</b> multiply by the <b>conjugate</b> over itself. The bottom becomes a difference of squares with no surd.</li>
      </ul>
      <p>An answer is often written in the form <b>a + b√c</b>, where a and b are the rational and surd parts you read off at the end.</p>
      <div class="eg">2/(1+√3) × (1−√3)/(1−√3) = 2(1−√3)/(1−3) = 2(1−√3)/(−2) = √3 − 1.</div>`,
  },
  ratExpEq: {
    title: "Equations with rational exponents",
    body: `
      <p>To solve x^(p/q) = k, raise <b>both sides</b> to the reciprocal q/p (the exponents then cancel: (p/q)·(q/p) = 1).</p>
      <p>Whether the answer is ±, a single value, or none, depends on the fraction (in lowest terms):</p>
      <ul>
        <li><b>Numerator (top) even, k positive → ± two answers.</b> x^(2/3) = 4 → x = ±8.</li>
        <li><b>Top and bottom both odd → one answer, and a negative is allowed.</b> x^(3/5) = −2 → x = (−2)^(5/3), real and negative.</li>
        <li><b>No real solution</b> when you’d need an <b>even root of a negative</b> (even bottom, k negative) or an <b>even power equal to a negative</b> (even top, k negative). x^(1/2) = −5 and x^(2/5) = −4 both have no solution.</li>
      </ul>`,
  },
  expEqStrategy: {
    title: "Exponential equations: the strategy",
    body: `
      <p><b>One term each side</b> (like 5ˣ = 25): rewrite both as the same base, then “make the bases the same so the guns are equal, shoot each other (the bases fall away), and equate the exponents”.</p>
      <div class="formula">5ˣ = 25 → 5ˣ = 5² → x = 2</div>
      <p><b>A + or − (two or more terms):</b> factorise. Common-factor type: take out the smallest power. Trinomial type: <b>let k = (base)ˣ</b>, solve the quadratic, then go back.</p>
      <p><b>No solution warnings:</b></p>
      <ul>
        <li>A positive base can <b>never</b> give a negative answer: 3ˣ = −9 has no solution.</li>
        <li>If the substitution gives k = a negative number, reject it — (base)ˣ can’t be negative. Only the positive root survives.</li>
      </ul>`,
  },
  surdEq: {
    title: "Surd equations: isolate, square, TEST",
    body: `
      <ol>
        <li><b>Isolate the root</b> — get √(…) alone on one side.</li>
        <li><b>Square both sides</b> (show the step). Squaring undoes the root.</li>
        <li><b>ALWAYS test both answers</b> in the original equation — squaring can create <b>extraneous</b> answers that don’t really work.</li>
      </ol>
      <p>Two quick no-solution checks: a root can never equal a negative (√(x−1) = −3 → no solution), and √x is only defined for x ≥ 0.</p>
      <div class="eg">√(2 − 7x) = −2x → square → 2 − 7x = 4x²; solve, then reject any answer that makes the original root negative.</div>`,
  },

  /* ===================== EQUATIONS & INEQUALITIES ===================== */
  eqStdForm: {
    title: "Standard form & the calculator's EQN mode",
    body: `
      <p>Almost every quadratic starts the same way: take everything to ONE side so the other side is 0.</p>
      <div class="formula">ax² + bx + c = 0</div>
      <p><b>Calculator (EQN mode):</b> MODE → <b>5: EQN</b> → <b>3: aX² + bX + c = 0</b> (option 4 is the CUBIC — wrong one!) → type a, b and c <b>each with its own sign</b> → read the roots X₁ and X₂.</p>
      <p><b>Root → factor:</b> put the OPPOSITE sign in the bracket. A fraction root: the denominator multiplies the x, the numerator crosses over with the opposite sign.</p>
      <div class="eg">X₁ = ½ → (2x − 1). &nbsp; X₂ = −3 → (x + 3). &nbsp; So 2x² + 5x − 3 = (2x − 1)(x + 3).</div>`,
  },
  eqZeroProduct: {
    title: "Brackets = 0: the zero-product rule",
    body: `
      <p>A product is 0 <b>only</b> when at least one of its factors is 0. So when brackets multiply to 0:</p>
      <ul>
        <li>It's already factorised — <b>don't multiply out</b>, and don't divide a factor away (that deletes an answer).</li>
        <li>Set <b>each bracket = 0</b> on its own and solve it.</li>
        <li>A lonely x in front is a factor too: x(x + 5) = 0 gives x = 0 as one of the answers.</li>
      </ul>
      <p><b>Warning:</b> the rule ONLY works against 0. (x − 3)(x + 2) = 6 may NOT be split up — lots of pairs multiply to 6. First rearrange so one side is 0.</p>
      <div class="eg">x(2x − 5)(−x + 2) = 0 → x = 0, or 2x = 5 so x = 5/2, or −x = −2 so x = 2.</div>`,
  },
  eqSpecialCases: {
    title: "The special quadratics: no b, no c, x² = negative",
    body: `
      <ul>
        <li><b>No b (middle) term:</b> difference of squares, or square-root both sides — and KEEP the ±. x² − 4 = 0 → x = ±2.</li>
        <li><b>No c (constant) term:</b> take out the common factor. x² + 5x = 0 → x(x + 5) = 0 → x = 0 or x = −5. <b>Never divide by x</b> — that throws the x = 0 answer away.</li>
        <li><b>x² = a negative number:</b> no real solution — a square is never negative. x² + 5 = 0 → x² = −5 → no real solution.</li>
      </ul>`,
  },
  eqExpBrackets: {
    title: "Exponent brackets: same base, and the impossible ones",
    body: `
      <p>When a bracket in factor form contains an exponent, set it = 0 and solve:</p>
      <ul>
        <li><b>Make the bases the same</b>, then equate the exponents: 3ˣ = √27 = √(3³) = 3^(3/2) → x = 3/2. And 3ˣ = 1 = 3⁰ → x = 0.</li>
        <li><b>A power with a positive base can never be negative:</b> 2ˣ = −4 has NO solution — that bracket contributes nothing.</li>
        <li><b>Rational exponents:</b> raise both sides to the reciprocal — and watch for ±. x^(2/3) = 16 means (∛x)² = 16, so ∛x = ±4, so x = ±64. The EVEN power on top hides the sign; an odd top keeps one answer.</li>
      </ul>
      <div class="eg">(x² − 5)(2ˣ − 16) = 0 → x = ±√5 (two answers) or 2ˣ = 2⁴ → x = 4. Three real solutions.</div>`,
  },
  eqKMethod: {
    title: "The k-method (a stand-in for a repeated bracket)",
    body: `
      <p>Use it when the <b>same expression appears two or more times</b>.</p>
      <ol>
        <li>Let k = the repeated expression (the plain bracket, not its square).</li>
        <li>The equation becomes a simple quadratic in k — solve for k.</li>
        <li><b>You're not done!</b> Replace k with the bracket and solve each little equation for x.</li>
        <li>A restriction on the bracket (from a denominator) rides along on k — reject a k that breaks it (N.A.).</li>
      </ol>
      <p><b>How many answers?</b> The highest power tells you the most to expect: x² → 2, x³ → 3, x⁴ → 4 (equal roots count once).</p>
      <div class="eg">(x² − x)² − 8(x² − x) + 12 = 0 → k² − 8k + 12 = 0 → k = 6 or 2 → x² − x = 6 gives x = 3 or −2; x² − x = 2 gives x = 2 or −1.</div>`,
  },
  eqFractions: {
    title: "Fraction equations: factorise, LCD, clear",
    body: `
      <ol>
        <li><b>Factorise every numerator and denominator</b> first.</li>
        <li>Watch for the <b>negative twin</b>: 9 − x² = −(x² − 9). Take out the −1 so denominators match.</li>
        <li>Build the <b>LCD</b>: each different factor once, at its highest power.</li>
        <li>State the <b>restrictions</b> (denominator ≠ 0) BEFORE solving.</li>
        <li>Multiply <b>EVERY term</b> (both sides, including the lonely numbers) by the LCD — the fractions vanish.</li>
        <li>Solve, then <b>reject</b> any answer that equals a restriction (N.A.).</li>
      </ol>
      <div class="eg">10/x + 3x/(x − 2) = 7 (x ≠ 0; x ≠ 2) → 10(x − 2) + 3x² = 7x(x − 2) → x² − 6x + 5 = 0 → x = 5 or x = 1 (both allowed).</div>`,
  },
  eqRestrictions: {
    title: "Restrictions & N.A.",
    body: `
      <p>Any x that makes a denominator 0 is banned — division by 0 is <b>undefined</b> (the ghost under the bed).</p>
      <ul>
        <li>Find them by setting <b>each denominator = 0</b>.</li>
        <li>State them <b>before</b> you solve — they belong to the original equation.</li>
        <li>An answer that equals a restriction is rejected: mark it <b>N.A.</b> and keep only the valid one(s). The other answers survive — one rejection does not kill the rest.</li>
      </ul>`,
  },
  eqPerfectSquare: {
    title: "Perfect squares & completing the square",
    body: `
      <p>A perfect square trinomial packs into one bracket squared. The sign inside <b>matches the middle term</b>: x² − 6x + 9 = (x − 3)².</p>
      <div class="formula">completing constant: c = (b/2)² &nbsp;… only when the coefficient of x² is 1!</div>
      <p>With a coefficient on x², <b>factor it out first</b>. Matching x² + bx + c = (x + k)²: 2k = b (sign included!) and c = k². For x² − 13x + c: k = −13/2 (negative!), c = 169/4.</p>
      <p><b>Solving by completing the square:</b></p>
      <ol>
        <li>No coefficient (and no negative) in front of x² — divide it away.</li>
        <li>Constant across to the right.</li>
        <li>Add (b/2)² to <b>both</b> sides.</li>
        <li>Pack the left into (x ± …)².</li>
        <li>√ both sides — <b>remember ±</b> — and finish.</li>
      </ol>
      <div class="eg">−x² + 10x − 22 = 0 → x² − 10x = −22 → +25 both sides → (x − 5)² = 3 → x = 5 ± √3.</div>`,
  },
  eqTPForm: {
    title: "Turning-point form: reading TP(p ; q)",
    body: `
      <div class="formula">y = a(x − p)² + q &nbsp;→&nbsp; TP(p ; q)</div>
      <ul>
        <li><b>p flips:</b> read it with the OPPOSITE sign of what's in the bracket. (x + 4) → p = −4.</li>
        <li><b>q keeps its own sign</b> — never flip q. … − 1 → q = −1.</li>
        <li>In words: p is WHERE the turning point is (x-value), q is WHAT it is (y-value).</li>
        <li>a &gt; 0 → happy parabola (opens up) → the TP is a <b>minimum</b>. a &lt; 0 → sad → <b>maximum</b>.</li>
      </ul>
      <div class="eg">y = 2(x + 4)² − 1 → TP(−4 ; −1), a minimum. NOT (−4 ; 1)!</div>`,
  },
  eqFormula: {
    title: "The quadratic formula",
    body: `
      <div class="formula">x = ( −b ± √(b² − 4ac) ) / 2a</div>
      <ul>
        <li>Use it when the trinomial <b>won't factorise</b> (decimals asked = a big hint).</li>
        <li>Always write the <b>formula</b>, then the <b>substitution line</b> — a, b and c in brackets, <b>each with its own sign</b>. For x² − 2x − 1 = 0: a = 1, b = −2, c = −1 (not +1!).</li>
        <li>EQN mode may check the values, but the two written lines earn the marks.</li>
        <li>Round only the FINAL answers: two decimals, decimal comma (e.g. 2,41).</li>
      </ul>`,
  },
  eqSimultaneous: {
    title: "Simultaneous equations (substitution)",
    body: `
      <ol>
        <li>Make one variable the subject of the <b>simpler (linear)</b> equation.</li>
        <li>Substitute that expression into the other equation.</li>
        <li>Solve the one-variable equation (with a quadratic you can get up to TWO x-values).</li>
        <li>Back-substitute each x into the linear subject to find its partner y.</li>
        <li>Write each solution as a <b>coordinate pair</b> (x ; y).</li>
      </ol>
      <div class="eg">3x + 2y = 3 and 2x − y = 9 → y = 2x − 9 → 3x + 2(2x − 9) = 3 → 7x = 21 → x = 3, y = −3 → (3 ; −3).</div>`,
  },
  eqLinIneq: {
    title: "Linear inequalities: when the sign flips",
    body: `
      <p><b>The key rule:</b> multiply or divide both sides by a NEGATIVE → switch the direction of the inequality sign. (Adding/subtracting never flips.)</p>
      <ul>
        <li>−6x &lt; 4 → divide by −6 and flip → x &gt; −2/3.</li>
        <li><b>Compound:</b> do every operation to ALL THREE parts. −5 ≤ 1 − 3x &lt; 10 → subtract 1 → divide by −3, flipping BOTH signs → 2 ≥ x &gt; −3, written naturally: −3 &lt; x ≤ 2.</li>
        <li><b>Number line:</b> open circle = not included (&lt;, &gt;); filled circle = included (≤, ≥).</li>
      </ul>`,
  },
  eqQuadIneq: {
    title: "Quadratic inequalities: CP and the bowl",
    body: `
      <p><b>Set-up:</b> everything to the left (0 right) → NO negative in front of x² (divide by −1 and flip) → factorise → <b>CP</b>: each factor = 0 → sketch the bowl (or calculator INEQ mode).</p>
      <ul>
        <li>Expression <b>&lt; 0</b> → below the axis → <b>inside the bowl</b>: a &lt; x &lt; b.</li>
        <li>Expression <b>&gt; 0</b> → above the axis → <b>to the left / right</b>: x &lt; a or x &gt; b. Two pieces join with <b>or</b>, never "and".</li>
        <li>≤ / ≥ keep the CPs in the answer.</li>
        <li><b>Look out for (4 − x):</b> it hides a −x². Take out −1 and FLIP: (x − 3)(4 − x) ≥ 0 → (x − 3)(x − 4) ≤ 0.</li>
        <li><b>A repeated bracket:</b> (x − 3)² &gt; 0 has one CP only → true everywhere except there → x ∈ ℝ, x ≠ 3.</li>
        <li><b>Brackets with a number on the right,</b> e.g. (x + 1)(x + 2) ≤ 20: the CPs are NOT −1 and −2! Multiply out, bring the 20 across, and factorise again.</li>
      </ul>`,
  },
  eqDiscriminant: {
    title: "Nature of the roots: Δ = b² − 4ac",
    body: `
      <p>Δ (delta) is the part under the root in the formula. Its sign tells you how the parabola meets the x-axis — without solving.</p>
      <ul>
        <li><b>Δ &lt; 0:</b> non-real roots — the graph never cuts the x-axis.</li>
        <li><b>Δ = 0:</b> real, rational, EQUAL roots — it touches once, at the TP.</li>
        <li><b>Δ &gt; 0, perfect square:</b> real, rational, unequal — cuts twice, nicely.</li>
        <li><b>Δ &gt; 0, not a perfect square:</b> real, irrational, unequal — cuts twice with surds.</li>
        <li><b>Δ ≥ 0:</b> real (equal or unequal together).</li>
      </ul>
      <p><b>The 3 question types:</b> ① work out Δ and classify. ② nature GIVEN → write the matching Δ condition and solve for the unknown. ③ PROVE the nature → complete the square on Δ, e.g. (p − 2)² + 4 ≥ 4 &gt; 0 always.</p>
      <p><b>Check parameter answers against the original equation</b> — a k that makes a denominator 0 (or kills the x² term) is rejected.</p>`,
  },
  eqKnowDiff: {
    title: "KNOW THE DIFFERENCE!!",
    body: `
      <ul>
        <li><b>No solution</b> — the statement can NEVER be true. 3ˣ = −1 (a positive base can't go negative).</li>
        <li><b>Undefined</b> — a denominator equals 0 (the ghost under the bed). Find it: denominator = 0.</li>
        <li><b>Non-real</b> — a negative sits under a square root. √(−4). Find it: inside of the root &lt; 0.</li>
        <li><b>Not applicable (N.A.)</b> — a candidate answer is REJECTED: it breaks a restriction or fails the original surd equation.</li>
      </ul>
      <div class="eg">√(x + 3)/(x + 1): undefined at x = −1 (bottom = 0); non-real for x &lt; −3 (inside the root negative). Two different questions!</div>`,
  },
};

export function getConcept(id) { return CONCEPTS[id] || null; }
