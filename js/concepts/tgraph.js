/* Concept cards: Trig Graphs (chapter id "tgraph"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_TGRAPH = {
  /* ---- Trig Graphs (Chapter 6) ---- */
  trigParents: {
    title: L("The three parent graphs", "Die drie basisgrafieke"),
    body: L(`
      <p>Three shapes to know by heart (for x from 0° to 360°):</p>
      <ul>
        <li><b>y = sin x</b> — starts at 0, peak +1 at 90°, back to 0 at 180°, low −1 at 270°.</li>
        <li><b>y = cos x</b> — starts at its peak +1 at 0°, 0 at 90°, low −1 at 180°. Cosine is sine shifted 90° left.</li>
        <li><b>y = tan x</b> — climbs through 0 at 0°, 180° and 360°, with vertical <b>asymptotes</b> at 90° and 270°.</li>
      </ul>
      <p>Sine and cosine are "identical twins": same amplitude (1), same period (360°), same range [−1 ; 1].</p>`, `
      <p>Drie vorms om uit die kop te ken (vir x van 0° tot 360°):</p>
      <ul>
        <li><b>y = sin x</b>: begin by 0, piek +1 by 90°, terug na 0 by 180°, laagste punt −1 by 270°.</li>
        <li><b>y = cos x</b>: begin by sy piek +1 by 0°, 0 by 90°, laagste punt −1 by 180°. Cos is sin, 90° na links geskuif.</li>
        <li><b>y = tan x</b>: klim deur 0 by 0°, 180° en 360°, met vertikale <b>asimptote</b> by 90° en 270°.</li>
      </ul>
      <p>Sin en cos is "identiese tweelinge": dieselfde amplitude (1), dieselfde periode (360°), dieselfde waardeversameling [−1 ; 1].</p>`),
  },
  trigParams: {
    title: L("What a, b and q do", "Wat a, b en q doen"),
    body: L(`
      <p>Every graph is written as <b>y = a·sin b(x − p) + q</b> — cos and tan use the same form:</p>
      <ul>
        <li><b>a</b> — sets the amplitude: its <b>size</b> |a| is the height from the midline to a peak. A <b>negative a</b> flips the graph upside-down.</li>
        <li><b>b</b> — squashes the graph sideways: a bigger b means more cycles (a shorter graph).</li>
        <li><b>q</b> — slides the whole graph up (q &gt; 0) or down (q &lt; 0). The midline becomes y = q.</li>
      </ul>
      <div class="eg">y = 2sin x is twice as tall as sin x; y = −sin x is sin x flipped; y = sin x + 3 sits 3 units higher.</div>`, `
      <p>Elke grafiek word geskryf as <b>y = a·sin b(x − p) + q</b>; cos en tan gebruik dieselfde vorm:</p>
      <ul>
        <li><b>a</b>: bepaal die amplitude; sy <b>grootte</b> |a| is die hoogte van die middelste lyn tot by 'n piek. 'n <b>Negatiewe a</b> draai die grafiek onderstebo.</li>
        <li><b>b</b>: druk die grafiek horisontaal saam; 'n groter b gee meer siklusse ('n korter grafiek).</li>
        <li><b>q</b>: skuif die hele grafiek op (q &gt; 0) of af (q &lt; 0). Die middelste lyn word y = q.</li>
      </ul>
      <div class="eg">y = 2sin x is twee keer so hoog soos sin x; y = −sin x is sin x onderstebo; y = sin x + 3 lê 3 eenhede hoër.</div>`),
  },
  trigPeriod: {
    title: L("Period", "Periode"),
    body: L(`
      <p>The <b>period</b> is the length of <b>one full cycle</b> (one complete wave).</p>
      <div class="formula">sin &amp; cos: period = 360° ÷ b   ·   tan: period = 180° ÷ b</div>
      <p>A larger b gives a shorter graph (more cycles squeezed into 360°); a smaller b gives a longer graph.</p>
      <div class="eg">y = cos 3x → 360° ÷ 3 = 120°.  y = tan 2x → 180° ÷ 2 = 90°.  y = sin ½x → 360° ÷ ½ = 720°.</div>`, `
      <p>Die <b>periode</b> is die lengte van <b>een volle siklus</b> (een volledige golf).</p>
      <div class="formula">sin &amp; cos: periode = 360° ÷ b   ·   tan: periode = 180° ÷ b</div>
      <p>'n Groter b gee 'n korter grafiek (meer siklusse in 360° ingedruk); 'n kleiner b gee 'n langer grafiek.</p>
      <div class="eg">y = cos 3x → 360° ÷ 3 = 120°.  y = tan 2x → 180° ÷ 2 = 90°.  y = sin ½x → 360° ÷ ½ = 720°.</div>`),
  },
  trigAmplitude: {
    title: L("Amplitude", "Amplitude"),
    body: L(`
      <p>The <b>amplitude</b> is the height from the midline up to a peak — always positive.</p>
      <div class="formula">amplitude = |a| = (y max − y min) ÷ 2</div>
      <p>The sign of a only flips the graph; it does not change the amplitude. <b>Tangent has no amplitude</b> (it has no maximum or minimum) — its amplitude is undefined.</p>
      <div class="eg">y = −3cos x → amplitude 3.  y = ½sin x → amplitude ½.  y = tan 2x → undefined.</div>`, `
      <p>Die <b>amplitude</b> is die hoogte van die middelste lyn op tot by 'n piek: altyd positief.</p>
      <div class="formula">amplitude = |a| = (y maks − y min) ÷ 2</div>
      <p>Die teken van a draai net die grafiek onderstebo; dit verander nie die amplitude nie. <b>Tan het geen amplitude nie</b> (dit het geen maksimum of minimum nie): sy amplitude is onbepaald.</p>
      <div class="eg">y = −3cos x → amplitude 3.  y = ½sin x → amplitude ½.  y = tan 2x → onbepaald.</div>`),
  },
  trigRange: {
    title: L("Range", "Waardeversameling"),
    body: L(`
      <p>The <b>range</b> is the set of y-values the graph reaches.</p>
      <div class="formula">sin &amp; cos: from (q − amplitude) up to (q + amplitude)   ·   tan: y ∈ ℝ</div>
      <p>Start with the midline y = q, then go one amplitude down and one amplitude up. Tangent reaches every real value, so its range is always ℝ.</p>
      <div class="eg">y = 2sin x − 1 → midline −1, amplitude 2 → range [−3 ; 1].  y = tan x + 5 → y ∈ ℝ.</div>`, `
      <p>Die <b>waardeversameling</b> is die versameling y-waardes wat die grafiek bereik.</p>
      <div class="formula">sin &amp; cos: van (q − amplitude) tot (q + amplitude)   ·   tan: y ∈ ℝ</div>
      <p>Begin by die middelste lyn y = q, gaan dan een amplitude af en een amplitude op. Tan bereik elke reële waarde, dus is sy waardeversameling altyd ℝ.</p>
      <div class="eg">y = 2sin x − 1 → middelste lyn −1, amplitude 2 → waardeversameling [−3 ; 1].  y = tan x + 5 → y ∈ ℝ.</div>`),
  },
  trigCycles: {
    title: L("How many cycles (curves)", "Hoeveel siklusse (kurwes)"),
    body: L(`
      <p>The number of complete cycles over an interval is the interval length divided by the period.</p>
      <div class="formula">number of cycles = interval length ÷ period</div>
      <p>Over a 360° interval this is just equal to b (since period = 360° ÷ b).</p>
      <div class="eg">y = sin 2x on [0° ; 360°] → 360 ÷ 180 = 2 cycles.  y = cos 3x → 3 cycles.</div>`, `
      <p>Die aantal volledige siklusse oor 'n interval is die lengte van die interval gedeel deur die periode.</p>
      <div class="formula">aantal siklusse = intervallengte ÷ periode</div>
      <p>Oor 'n interval van 360° is dit net gelyk aan b (want periode = 360° ÷ b).</p>
      <div class="eg">y = sin 2x op [0° ; 360°] → 360 ÷ 180 = 2 siklusse.  y = cos 3x → 3 siklusse.</div>`),
  },
  trigShifts: {
    title: L("Horizontal & vertical shifts", "Horisontale & vertikale skuiwe"),
    body: L(`
      <p><b>Vertical (q):</b> q &gt; 0 shifts up, q &lt; 0 shifts down — the midline moves to y = q.</p>
      <p><b>Horizontal (p):</b> the bracket is (x − p). Read p as the number after the sign, and the graph moves the <b>opposite</b> way:</p>
      <ul>
        <li>sin(x − 30°) → shifts 30° to the <b>right</b>.</li>
        <li>sin(x + 30°) → shifts 30° to the <b>left</b>.</li>
      </ul>
      <p>If b ≠ 1, factor it out first: sin(2x − 60°) = sin 2(x − 30°), so the real shift is 30°, not 60°.</p>`, `
      <p><b>Vertikaal (q):</b> q &gt; 0 skuif op, q &lt; 0 skuif af; die middelste lyn skuif na y = q.</p>
      <p><b>Horisontaal (p):</b> die hakie is (x − p). Lees p as die getal ná die teken, en die grafiek skuif die <b>teenoorgestelde</b> kant toe:</p>
      <ul>
        <li>sin(x − 30°) → skuif 30° na <b>regs</b>.</li>
        <li>sin(x + 30°) → skuif 30° na <b>links</b>.</li>
      </ul>
      <p>As b ≠ 1, haal dit eers as faktor uit: sin(2x − 60°) = sin 2(x − 30°), dus is die werklike skuif 30°, nie 60° nie.</p>`),
  },
  tanGraph: {
    title: L("The tangent graph", "Die tan-grafiek"),
    body: L(`
      <p>tan x = sin x ÷ cos x, so:</p>
      <ul>
        <li><b>x-intercepts</b> where the top is zero: sin x = 0 (at 0°, 180°, 360°, …).</li>
        <li><b>Asymptotes</b> where the bottom is zero: cos x = 0 (at 90°, 270°, …) — the graph is undefined there.</li>
      </ul>
      <div class="formula">period = 180°   ·   asymptotes are 180° apart   ·   range y ∈ ℝ</div>
      <p>It has no amplitude — there is no highest or lowest point.</p>`, `
      <p>tan x = sin x ÷ cos x, dus:</p>
      <ul>
        <li><b>x-afsnitte</b> waar die teller nul is: sin x = 0 (by 0°, 180°, 360°, …).</li>
        <li><b>Asimptote</b> waar die noemer nul is: cos x = 0 (by 90°, 270°, …); die grafiek is daar onbepaald.</li>
      </ul>
      <div class="formula">periode = 180°   ·   asimptote is 180° uitmekaar   ·   waardeversameling y ∈ ℝ</div>
      <p>Dit het geen amplitude nie: daar is geen hoogste of laagste punt nie.</p>`),
  },
  tanAValue: {
    title: L("Finding a for a tan graph", "Vind a vir 'n tan-grafiek"),
    body: L(`
      <p>A tan graph has no max or min, so use two reference points <b>45° on either side</b> of an inflection point (where a branch crosses its midline).</p>
      <div class="formula">a = ("y at +45°" − "y at −45°") ÷ 2</div>
      <p>This works because tan 45° = 1 and tan(−45°) = −1, so 45° from the centre the graph sits one a above (or below) the midline.</p>
      <div class="eg">If the references are 3 and −1, then a = (3 − (−1)) ÷ 2 = 2.</div>`, `
      <p>'n Tan-grafiek het geen maks of min nie, so gebruik twee verwysingspunte <b>45° aan weerskante</b> van 'n buigpunt (waar die kurwe sy middelste lyn sny).</p>
      <div class="formula">a = ("y by +45°" − "y by −45°") ÷ 2</div>
      <p>Dit werk omdat tan 45° = 1 en tan(−45°) = −1, dus lê die grafiek 45° van die middel af een a bo (of onder) die middelste lyn.</p>
      <div class="eg">As die verwysingswaardes 3 en −1 is, dan is a = (3 − (−1)) ÷ 2 = 2.</div>`),
  },
  findTrigEquation: {
    title: L("Finding the equation from a graph", "Vind die vergelyking uit 'n grafiek"),
    body: L(`
      <p>Compare the graph with the parent (sin, cos or tan) and read off, in turn:</p>
      <ul>
        <li><b>a</b> — amplitude = (y max − y min) ÷ 2; make it negative if the graph is flipped.</li>
        <li><b>q</b> — the midline: q = (y max + y min) ÷ 2.</li>
        <li><b>b</b> — from the period: b = 360° ÷ period (use 180° for tan).</li>
        <li><b>p</b> — how far it has shifted left or right.</li>
      </ul>
      <p>Then write y = a·sin b(x − p) + q.</p>`, `
      <p>Vergelyk die grafiek met die basisgrafiek (sin, cos of tan) en lees een vir een af:</p>
      <ul>
        <li><b>a</b>: amplitude = (y maks − y min) ÷ 2; maak dit negatief as die grafiek onderstebo is.</li>
        <li><b>q</b>: die middelste lyn, q = (y maks + y min) ÷ 2.</li>
        <li><b>b</b>: uit die periode, b = 360° ÷ periode (gebruik 180° vir tan).</li>
        <li><b>p</b>: hoe ver dit links of regs geskuif het.</li>
      </ul>
      <p>Skryf dan y = a·sin b(x − p) + q.</p>`),
  },
  trigTogether: {
    title: L("Two graphs together", "Twee grafieke saam"),
    body: L(`
      <p>When two trig graphs share a set of axes:</p>
      <ul>
        <li><b>Intersections</b> are the x-values where f(x) = g(x) — read them where the curves cross.</li>
        <li><b>f(x) &gt; g(x)</b> wherever the f-curve is <b>above</b> the g-curve.</li>
        <li><b>f(x) &gt; 0</b> wherever the curve is above the x-axis (between its x-intercepts).</li>
      </ul>
      <p>Always work within the interval the question gives you.</p>`, `
      <p>As twee trig-grafieke dieselfde asse deel:</p>
      <ul>
        <li><b>Snypunte</b> is die x-waardes waar f(x) = g(x): lees hulle af waar die kurwes mekaar sny.</li>
        <li><b>f(x) &gt; g(x)</b> waar die f-kurwe <b>bo</b> die g-kurwe is.</li>
        <li><b>f(x) &gt; 0</b> waar die kurwe bo die x-as is (tussen sy x-afsnitte).</li>
      </ul>
      <p>Werk altyd binne die interval wat die vraag gee.</p>`),
  },

};
