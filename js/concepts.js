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
      <p>The <b>direction</b> tells you ×　or ÷: later = ×, earlier = ÷.</p>`,
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
      <div class="eg">e.g. two coins: P(H,T) = 0,5 × 0,5 = 0,25; P(one head) = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`,
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
        <li>h ≤ a &lt; b → <b>two</b> triangles (acute and obtuse)</li>
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
      <div class="eg">A curved face means cylinder / cone / sphere; only flat faces means prism / pyramid.</div>`,
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
      <div class="formula">cube 6ℓ² · prism 2(ℓb+ℓh+bh) · closed cylinder 2πr²+2πrh · cone πr²+πrh · sphere 4πr²</div>`,
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
      <p>They sit in a right-angled triangle with the radius:</p>
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
};

export function getConcept(id) { return CONCEPTS[id] || null; }
