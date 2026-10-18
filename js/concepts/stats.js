/* Concept cards: Statistics (chapter id "stats"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_STATS = {
  quartiles: {
    title: L("Quartiles & their positions", "Kwartiele & hulle posisies"),
    body: L(`
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
      <div class="eg">e.g. n = 7, pos Q1 = 8/4 = 2 → Q1 is the 2nd value. pos Q3 = 24/4 = 6 → the 6th value.</div>`, `
      <p>Kwartiele verdeel die <b>gerangskikte</b> data in vier gelyke dele. Sorteer die waardes altyd eers van kleinste na grootste.</p>
      <ul>
        <li><b>Q1</b> (onderste kwartiel): die 25%-punt</li>
        <li><b>Q2</b> (mediaan): die 50%-punt</li>
        <li><b>Q3</b> (boonste kwartiel): die 75%-punt</li>
      </ul>
      <p>Vir ongegroepeerde data, vind eers die <b>posisie</b> in die lys (n = hoeveel waardes):</p>
      <div class="formula">pos Q1 = (n + 1)/4   ·   pos Q2 = (n + 1)/2   ·   pos Q3 = 3(n + 1)/4</div>
      <p>Die desimale deel sê dan hoe om af te rond:</p>
      <ul>
        <li>eindig op <b>,5</b> → neem die waarde in die middel (gemiddelde van die twee weerskante)</li>
        <li>eindig op <b>,25</b> → rond die posisie <b>na onder</b> af</li>
        <li>eindig op <b>,75</b> → rond die posisie <b>na bo</b> af</li>
      </ul>
      <div class="eg">bv. n = 7, pos Q1 = 8/4 = 2 → Q1 is die 2de waarde. pos Q3 = 24/4 = 6 → die 6de waarde.</div>`),
  },
  iqr: {
    title: L("Interquartile range (IQR)", "Interkwartielomvang"),
    body: L(`
      <p>The IQR measures the spread of the <b>middle 50%</b> of the data — it ignores the extremes.</p>
      <div class="formula">IQR = Q3 − Q1</div>
      <p>A small IQR means the middle half is bunched together; a large IQR means it is spread out.</p>
      <div class="eg">e.g. Q1 = 24 and Q3 = 39 → IQR = 39 − 24 = 15.</div>`, `
      <p>Die interkwartielomvang meet die spreiding van die <b>middelste 50%</b> van die data: dit ignoreer die uiterstes.</p>
      <div class="formula">interkwartielomvang = Q3 − Q1</div>
      <p>'n Klein interkwartielomvang beteken die middelste helfte lê dig bymekaar; 'n groot een beteken dit is uitgesprei.</p>
      <div class="eg">bv. Q1 = 24 en Q3 = 39 → interkwartielomvang = 39 − 24 = 15.</div>`),
  },
  outliers: {
    title: L("Outliers & the boundaries", "Uitskieters & die grense"),
    body: L(`
      <p>An outlier is a value that lies <b>outside</b> the fences. First find the IQR, then the boundaries:</p>
      <div class="formula">lower boundary = Q1 − 1,5 × IQR<br>upper boundary = Q3 + 1,5 × IQR</div>
      <p>Any value <b>below</b> the lower boundary or <b>above</b> the upper boundary is an outlier.</p>
      <div class="eg">e.g. Q1 = 20, Q3 = 32 → IQR = 12. Lower = 20 − 18 = 2; upper = 32 + 18 = 50. So 1 is an outlier, 48 is not.</div>`, `
      <p>'n Uitskieter is 'n waarde wat <b>buite</b> die grense lê. Vind eers die interkwartielomvang, dan die grense:</p>
      <div class="formula">ondergrens = Q1 − 1,5 × interkwartielomvang<br>bogrens = Q3 + 1,5 × interkwartielomvang</div>
      <p>Enige waarde <b>onder</b> die ondergrens of <b>bo</b> die bogrens is 'n uitskieter.</p>
      <div class="eg">bv. Q1 = 20, Q3 = 32 → interkwartielomvang = 12. Ondergrens = 20 − 18 = 2; bogrens = 32 + 18 = 50. Dus is 1 'n uitskieter, maar 48 nie.</div>`),
  },
  fivenum: {
    title: L("Five-number summary", "Vyfgetalopsomming"),
    body: L(`
      <p>Five values describe the whole data set and build the box-and-whisker plot:</p>
      <div class="formula">minimum · Q1 · median (Q2) · Q3 · maximum</div>
      <p>They split the data into four parts, each holding about <b>25%</b> of the values.</p>`, `
      <p>Vyf waardes beskryf die hele datastel en bou die mond-en-snor-diagram:</p>
      <div class="formula">minimum · Q1 · mediaan (Q2) · Q3 · maksimum</div>
      <p>Hulle verdeel die data in vier dele, elk met ongeveer <b>25%</b> van die waardes.</p>`),
  },
  boxplot: {
    title: L("Reading a box-and-whisker plot", "Lees 'n mond-en-snor-diagram"),
    body: L(`
      <p>A box plot is drawn straight from the five-number summary on a number line:</p>
      <ul>
        <li>the two <b>whisker ends</b> = minimum and maximum</li>
        <li>the <b>box</b> goes from <b>Q1 to Q3</b> — its width is the <b>IQR</b></li>
        <li>the <b>line inside the box</b> = the median (Q2)</li>
      </ul>
      <p>Each of the four sections (whisker, box-left, box-right, whisker) holds about 25% of the data.</p>`, `
      <p>'n Mond-en-snor-diagram word reguit uit die vyfgetalopsomming op 'n getallelyn geteken:</p>
      <ul>
        <li>die twee <b>punte van die snorre</b> = minimum en maksimum</li>
        <li>die <b>mond</b> loop van <b>Q1 tot Q3</b>: sy breedte is die <b>interkwartielomvang</b></li>
        <li>die <b>lyn binne die mond</b> = die mediaan (Q2)</li>
      </ul>
      <p>Elk van die vier dele (snor, mond-links, mond-regs, snor) bevat ongeveer 25% van die data.</p>`),
  },
  percentile: {
    title: L("Percentiles", "Persentiele"),
    body: L(`
      <p>A percentile is a generalised quartile. The p-th percentile is the value below which about p% of the data falls (so Q1 is the 25th percentile, the median the 50th).</p>
      <div class="formula">position = (n + 1) × p/100</div>
      <p>Find the position, then count to that value in the ordered list.</p>
      <div class="eg">e.g. n = 9, the 30th percentile sits at position 10 × 0,3 = 3 → the 3rd value.</div>`, `
      <p>'n Persentiel is 'n veralgemeende kwartiel. Die p-de persentiel is die waarde waaronder ongeveer p% van die data val (dus is Q1 die 25ste persentiel en die mediaan die 50ste).</p>
      <div class="formula">posisie = (n + 1) × p/100</div>
      <p>Vind die posisie en tel dan tot by daardie waarde in die gerangskikte lys.</p>
      <div class="eg">bv. n = 9, die 30ste persentiel sit by posisie 10 × 0,3 = 3 → die 3de waarde.</div>`),
  },

  calculator: {
    title: L("Using the stats calculator", "Statistiek op die sakrekenaar"),
    body: L(`
      <p>Every stats question starts the same way on a Casio fx-calculator:</p>
      <ul>
        <li><b>Clear it:</b> SHIFT, 9, 3 (All), = (Yes)</li>
        <li><b>Frequency on/off:</b> SHIFT, MODE (SETUP), ↓, 4 (STAT), then 1 (ON) or 2 (OFF)</li>
        <li><b>Enter data:</b> MODE, 3 (STAT), 1 (1-VAR), type the values, AC</li>
      </ul>
      <p>Then read a value: SHIFT, 1 (STAT), 4 (Var) gives <b>1:n  2:x̄  3:σx  4:sx</b>, and 6 (MinMax) gives <b>minX, maxX, Q1, med, Q3</b>.</p>
      <div class="eg">Use σx (option 3) for the standard deviation — not sx.</div>`, `
      <p>Elke statistiekvraag begin op dieselfde manier op 'n Casio fx-sakrekenaar:</p>
      <ul>
        <li><b>Maak dit skoon:</b> SHIFT, 9, 3 (All), = (Yes)</li>
        <li><b>Frekwensie aan/af:</b> SHIFT, MODE (SETUP), ↓, 4 (STAT), dan 1 (ON) of 2 (OFF)</li>
        <li><b>Voer data in:</b> MODE, 3 (STAT), 1 (1-VAR), tik die waardes in, AC</li>
      </ul>
      <p>Lees dan 'n waarde af: SHIFT, 1 (STAT), 4 (Var) gee <b>1:n  2:x̄  3:σx  4:sx</b>, en 6 (MinMax) gee <b>minX, maxX, Q1, med, Q3</b>.</p>
      <div class="eg">Gebruik σx (opsie 3) vir die standaardafwyking, nie sx nie.</div>`),
  },
  mean: {
    title: L("Mean, mode, median & range", "Gemiddelde, modus, mediaan & omvang"),
    body: L(`
      <p><b>Mean</b> x̄ = (sum of the values) ÷ (how many values) = Σx / n.</p>
      <p><b>Mode</b> = the value that appears most often.</p>
      <p><b>Median</b> = the middle value once the data is in order (average the two middle ones if n is even).</p>
      <p><b>Range</b> = maximum − minimum. It is a measure of <b>spread</b>, not centre.</p>
      <div class="eg">3; 5; 5; 8; 9 → mean 6, mode 5, median 5, range 6.</div>`, `
      <p><b>Gemiddelde</b> x̄ = (som van die waardes) ÷ (hoeveel waardes) = Σx / n.</p>
      <p><b>Modus</b> = die waarde wat die meeste voorkom.</p>
      <p><b>Mediaan</b> = die middelste waarde sodra die data in volgorde is (neem die gemiddelde van die twee middelste as n ewe is).</p>
      <p><b>Omvang</b> = maksimum − minimum. Dit is 'n maatstaf van <b>spreiding</b>, nie van sentrum nie.</p>
      <div class="eg">3; 5; 5; 8; 9 → gemiddelde 6, modus 5, mediaan 5, omvang 6.</div>`),
  },
  skewness: {
    title: L("Skewness & shape", "Skeefheid & vorm"),
    body: L(`
      <p>The skew is named for the <b>tail</b> — the long thin end — not for where the bulk of the data sits.</p>
      <ul>
        <li><b>Symmetric / normal:</b> balanced; x̄ = median.</li>
        <li><b>Skewed right (positive):</b> tail points right; a few high values pull the mean up, so x̄ &gt; median.</li>
        <li><b>Skewed left (negative):</b> tail points left; a few low values pull the mean down, so x̄ &lt; median.</li>
      </ul>
      <p>On a box plot, the longer whisker / bigger half shows the tail. On an ogive, the tail is the flat end.</p>`, `
      <p>Die skeefheid word na die <b>stert</b> genoem, die lang dun punt, nie na waar die meeste van die data lê nie.</p>
      <ul>
        <li><b>Simmetries / normaal:</b> gebalanseerd; x̄ = mediaan.</li>
        <li><b>Skeef na regs (positief):</b> die stert wys regs; 'n paar hoë waardes trek die gemiddelde op, dus is x̄ &gt; mediaan.</li>
        <li><b>Skeef na links (negatief):</b> die stert wys links; 'n paar lae waardes trek die gemiddelde af, dus is x̄ &lt; mediaan.</li>
      </ul>
      <p>Op 'n mond-en-snor-diagram wys die langer snor / groter helfte die stert. Op 'n ogief is die stert die plat punt.</p>`),
  },
  groupedMean: {
    title: L("Estimated mean (grouped data)", "Geskatte gemiddelde (gegroepeerde data)"),
    body: L(`
      <p>For grouped data each class is represented by its <b>midpoint</b> x = (lower + upper) ÷ 2.</p>
      <div class="formula">estimated mean x̄ = Σ(f × x) / n</div>
      <p>Multiply each frequency by its midpoint, add those up, then divide by the total frequency n.</p>
      <div class="eg">It is an <i>estimate</i> because we use the midpoint to stand in for every value in the class.</div>`, `
      <p>Vir gegroepeerde data word elke klas deur sy <b>middelpunt</b> voorgestel: x = (ondergrens + bogrens) ÷ 2.</p>
      <div class="formula">geskatte gemiddelde x̄ = Σ(f × x) / n</div>
      <p>Vermenigvuldig elke frekwensie met sy middelpunt, tel dit op en deel dan deur die totale frekwensie n.</p>
      <div class="eg">Dit is 'n <i>skatting</i> omdat ons die middelpunt gebruik in die plek van elke waarde in die klas.</div>`),
  },
  classes: {
    title: L("Modal & median class", "Modale klas & mediaanklas"),
    body: L(`
      <p><b>Modal class</b> = the class interval with the <b>highest frequency</b>.</p>
      <p><b>Median class</b> = the class that contains the middle value. Find position n ÷ 2, build up the cumulative frequency, and see which class that position falls in.</p>`, `
      <p><b>Modale klas</b> = die klasinterval met die <b>hoogste frekwensie</b>.</p>
      <p><b>Mediaanklas</b> = die klas wat die middelste waarde bevat. Vind posisie n ÷ 2, bou die kumulatiewe frekwensie op en kyk in watter klas daardie posisie val.</p>`),
  },
  ogivePlot: {
    title: L("Plotting an ogive", "Stip 'n ogief"),
    body: L(`
      <p>An ogive is the cumulative-frequency curve.</p>
      <ul>
        <li><b>Cumulative frequency</b> = the running total of the frequencies.</li>
        <li><b>Plot</b> each point at (<b>upper</b> boundary of the class ; cumulative frequency).</li>
        <li><b>Anchor</b> the curve at the <b>lower</b> boundary of the first class, at height 0.</li>
      </ul>
      <p>The curve always rises (it never goes down), and the <b>modal class</b> is the steepest part.</p>`, `
      <p>'n Ogief is die kumulatiewe-frekwensiekurwe.</p>
      <ul>
        <li><b>Kumulatiewe frekwensie</b> = die lopende totaal van die frekwensies.</li>
        <li><b>Stip</b> elke punt by (<b>bogrens</b> van die klas ; kumulatiewe frekwensie).</li>
        <li><b>Anker</b> die kurwe by die <b>ondergrens</b> van die eerste klas, op hoogte 0.</li>
      </ul>
      <p>Die kurwe styg altyd (dit daal nooit nie), en die <b>modale klas</b> is die steilste deel.</p>`),
  },
  ogiveRead: {
    title: L("Reading off an ogive", "Lees 'n ogief af"),
    body: L(`
      <p>For grouped data the positions have <b>no “+1”</b>:</p>
      <div class="formula">Q1 at n/4 · median at n/2 · Q3 at 3n/4 · p-th percentile at n × p/100</div>
      <p>Find the position on the cumulative-frequency (vertical) axis, read across to the curve, then straight down to the value. Read “approximately”.</p>`, `
      <p>Vir gegroepeerde data het die posisies <b>geen “+1”</b> nie:</p>
      <div class="formula">Q1 by n/4 · mediaan by n/2 · Q3 by 3n/4 · p-de persentiel by n × p/100</div>
      <p>Vind die posisie op die kumulatiewe-frekwensie-as (vertikaal), lees reguit oor na die kurwe en dan reguit af na die waarde. Lees “ongeveer” af.</p>`),
  },
  stddev: {
    title: L("Standard deviation", "Standaardafwyking"),
    body: L(`
      <p>The standard deviation σ measures how spread out the data is <b>around the mean</b>. A bigger σ means more spread; a smaller σ means the data is more consistent.</p>
      <div class="formula">σ = √[ Σ(x − x̄)² / n ]</div>
      <p>On the calculator use σx (Var → option 3). To compare two data sets’ consistency, the one with the <b>smaller</b> σ is more consistent.</p>`, `
      <p>Die standaardafwyking σ meet hoe uitgesprei die data <b>om die gemiddelde</b> is. 'n Groter σ beteken meer spreiding; 'n kleiner σ beteken die data is meer konsekwent.</p>
      <div class="formula">σ = √[ Σ(x − x̄)² / n ]</div>
      <p>Op die sakrekenaar, gebruik σx (Var → opsie 3). Om twee datastelle se konsekwentheid te vergelyk: die een met die <b>kleiner</b> σ is meer konsekwent.</p>`),
  },
  withinSD: {
    title: L("Values within one σ of the mean", "Waardes binne een σ van die gemiddelde"),
    body: L(`
      <p>“Within one standard deviation of the mean” means between two boundaries:</p>
      <div class="formula">lower = x̄ − σ   ·   upper = x̄ + σ</div>
      <p>Work out those two numbers, then count how many data values fall between them (inclusive).</p>`, `
      <p>“Binne een standaardafwyking van die gemiddelde” beteken tussen twee grense:</p>
      <div class="formula">ondergrens = x̄ − σ   ·   bogrens = x̄ + σ</div>
      <p>Werk daardie twee getalle uit en tel dan hoeveel datawaardes tussen hulle val (grense ingesluit).</p>`),
  },
  variance: {
    title: L("Variance", "Variansie"),
    body: L(`
      <p>Variance is the average of the <b>squared</b> deviations from the mean — it is just the standard deviation squared.</p>
      <div class="formula">variance = σ²   ·   σ = √variance</div>
      <div class="eg">If σ = 4 then variance = 16. If variance = 25 then σ = 5.</div>`, `
      <p>Variansie is die gemiddelde van die <b>gekwadreerde</b> afwykings van die gemiddelde: dit is net die standaardafwyking in die kwadraat.</p>
      <div class="formula">variansie = σ²   ·   σ = √variansie</div>
      <div class="eg">As σ = 4, dan is variansie = 16. As variansie = 25, dan is σ = 5.</div>`),
  },
  effect: {
    title: L("Adding a constant to every value", "Tel 'n konstante by elke waarde"),
    body: L(`
      <p>If you add the same number k to <b>every</b> value in a data set:</p>
      <ul>
        <li>the <b>mean, median, quartiles, min and max</b> all shift up by k;</li>
        <li>the <b>spread</b> stays the same — <b>range, IQR, standard deviation and variance do not change</b>.</li>
      </ul>
      <p>Shifting every value sideways moves the centre but not how spread out the data is.</p>`, `
      <p>As jy dieselfde getal k by <b>elke</b> waarde in 'n datastel tel:</p>
      <ul>
        <li>die <b>gemiddelde, mediaan, kwartiele, min en maks</b> skuif almal met k op;</li>
        <li>die <b>spreiding</b> bly dieselfde: <b>omvang, interkwartielomvang, standaardafwyking en variansie verander nie</b>.</li>
      </ul>
      <p>As jy elke waarde links of regs skuif, beweeg die sentrum, maar nie hoe uitgesprei die data is nie.</p>`),
  },
  compareBox: {
    title: L("Comparing two box plots", "Vergelyk twee mond-en-snor-diagramme"),
    body: L(`
      <p>Line the two plots up on the same scale and compare:</p>
      <ul>
        <li><b>Median</b> — which centre is higher?</li>
        <li><b>IQR</b> (box width) and <b>range</b> (whisker to whisker) — which is more spread out?</li>
        <li><b>Skew</b> — which side has the longer tail?</li>
      </ul>
      <p>A narrower box / shorter whiskers means the data is more consistent.</p>`, `
      <p>Plaas die twee diagramme op dieselfde skaal en vergelyk:</p>
      <ul>
        <li><b>Mediaan</b>: watter sentrum is hoër?</li>
        <li><b>Interkwartielomvang</b> (breedte van die mond) en <b>omvang</b> (snor tot snor): watter is meer uitgesprei?</li>
        <li><b>Skeefheid</b>: watter kant het die langer stert?</li>
      </ul>
      <p>'n Nouer mond / korter snorre beteken die data is meer konsekwent.</p>`),
  },

};
