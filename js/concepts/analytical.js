/* Concept cards: Analytical Geometry (chapter id "analytical"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_ANALYTICAL = {
  /* ---------- Analytical Geometry ---------- */
  whichFormula: {
    title: L("Which formula — and what its answer looks like", "Watter formule, en hoe sy antwoord lyk"),
    body: L(`
      <p>Three formulas do three different jobs. Ask yourself what you’re after:</p>
      <ul>
        <li><b>Distance</b> → a <b>length</b> (one positive number): AB = √[(x<sub>B</sub>−x<sub>A</sub>)² + (y<sub>B</sub>−y<sub>A</sub>)²]</li>
        <li><b>Midpoint</b> → a <b>coordinate</b> (x ; y): M = ( (x<sub>A</sub>+x<sub>B</sub>)/2 ; (y<sub>A</sub>+y<sub>B</sub>)/2 )</li>
        <li><b>Gradient</b> → a <b>slope number</b>: m = (y<sub>B</sub>−y<sub>A</sub>)/(x<sub>B</sub>−x<sub>A</sub>)</li>
      </ul>
      <p>Small <b>m</b> = gradient. Capital <b>M</b> = midpoint. Keep the points in the SAME order: top and bottom in the gradient formula, and in BOTH brackets of the distance formula.</p>`, `
      <p>Drie formules doen drie verskillende take. Vra jouself wat jy soek:</p>
      <ul>
        <li><b>Afstand</b> → 'n <b>lengte</b> (een positiewe getal): AB = √[(x<sub>B</sub>−x<sub>A</sub>)² + (y<sub>B</sub>−y<sub>A</sub>)²]</li>
        <li><b>Middelpunt</b> → 'n <b>koördinaat</b> (x ; y): M = ( (x<sub>A</sub>+x<sub>B</sub>)/2 ; (y<sub>A</sub>+y<sub>B</sub>)/2 )</li>
        <li><b>Gradiënt</b> → 'n <b>hellingsgetal</b>: m = (y<sub>B</sub>−y<sub>A</sub>)/(x<sub>B</sub>−x<sub>A</sub>)</li>
      </ul>
      <p>Klein <b>m</b> = gradiënt. Hoofletter <b>M</b> = middelpunt. Hou die punte in DIESELFDE volgorde: bo en onder in die gradiëntformule, en in BEIDE hakies van die afstandsformule.</p>`),
  },
  gradientSign: {
    title: L("The sign of a gradient", "Die teken van 'n gradiënt"),
    body: L(`
      <p>Gradient = rise ÷ run. Read the line from <b>left to right</b>:</p>
      <ul>
        <li><b>Positive</b> — the line goes <b>up</b> ↗ (increasing).</li>
        <li><b>Negative</b> — the line goes <b>down</b> ↘ (decreasing).</li>
      </ul>
      <p>Steepness is the <b>size</b> of the gradient (ignore the sign): a gradient of −4 is steeper than one of 2.</p>`, `
      <p>Gradiënt = styging ÷ loop. Lees die lyn van <b>links na regs</b>:</p>
      <ul>
        <li><b>Positief</b>: die lyn gaan <b>op</b> ↗ (stygend).</li>
        <li><b>Negatief</b>: die lyn gaan <b>af</b> ↘ (dalend).</li>
      </ul>
      <p>Steilheid is die <b>grootte</b> van die gradiënt (ignoreer die teken): 'n gradiënt van −4 is steiler as een van 2.</p>`),
  },
  specialLines: {
    title: L("Horizontal & vertical lines", "Horisontale & vertikale lyne"),
    body: L(`
      <p>The two lines learners mix up:</p>
      <ul>
        <li><b>Horizontal</b> line — no rise, only run → gradient = <b>0</b> (e.g. 0 ÷ 6 = 0).</li>
        <li><b>Vertical</b> line — no run → you’d divide by 0, so the gradient is <b>undefined</b>.</li>
      </ul>
      <div class="eg">Flat = zero. Straight up = undefined.</div>`, `
      <p>Die twee lyne wat leerders verwar:</p>
      <ul>
        <li><b>Horisontale</b> lyn: geen styging nie, net loop → gradiënt = <b>0</b> (bv. 0 ÷ 6 = 0).</li>
        <li><b>Vertikale</b> lyn: geen loop nie → jy sal deur 0 deel, dus is die gradiënt <b>onbepaald</b>.</li>
      </ul>
      <div class="eg">Plat = nul. Regop = onbepaald.</div>`),
  },
  parallelPerp: {
    title: L("Parallel & perpendicular (the gradient rules)", "Ewewydig & loodreg (die gradiëntreëls)"),
    body: L(`
      <p>Compare the gradients:</p>
      <div class="formula">Parallel:  m<sub>1</sub> = m<sub>2</sub><br>Perpendicular:  m<sub>1</sub> × m<sub>2</sub> = −1</div>
      <p>So perpendicular lines have gradients that are <b>negative reciprocals</b> of each other.</p>
      <div class="eg">e.g. m = 2/3 → the perpendicular gradient is −3/2 (flip it over, change the sign). Check: 2/3 × −3/2 = −1. ✓</div>`, `
      <p>Vergelyk die gradiënte:</p>
      <div class="formula">Ewewydig:  m<sub>1</sub> = m<sub>2</sub><br>Loodreg:  m<sub>1</sub> × m<sub>2</sub> = −1</div>
      <p>Loodregte lyne het dus gradiënte wat <b>negatiewe resiproke</b> van mekaar is.</p>
      <div class="eg">bv. m = 2/3 → die loodregte gradiënt is −3/2 (draai dit om, verander die teken). Toets: 2/3 × −3/2 = −1. ✓</div>`),
  },
  perpGradient: {
    title: L("The negative reciprocal", "Die negatiewe resiprook"),
    body: L(`
      <p>To get the gradient <b>perpendicular</b> to a given one: <b>switch</b> the top and bottom of the fraction, then <b>change the sign</b>.</p>
      <ul>
        <li>m = 2/3 → −3/2</li>
        <li>m = −4 = −4/1 → +1/4</li>
      </ul>
      <p>Reading a gradient from <b>ax + by = 0</b>: make y the subject (y = mx + c); the gradient is <b>−a/b</b>.</p>`, `
      <p>Om die gradiënt <b>loodreg</b> op 'n gegewe een te kry: <b>ruil</b> die teller en noemer om, en <b>verander dan die teken</b>.</p>
      <ul>
        <li>m = 2/3 → −3/2</li>
        <li>m = −4 = −4/1 → +1/4</li>
      </ul>
      <p>Om die gradiënt uit <b>ax + by = 0</b> te lees: maak y die onderwerp (y = mx + c); die gradiënt is <b>−a/b</b>.</p>`),
  },
  angleInclination: {
    title: L("Angle of inclination", "Inklinasiehoek"),
    body: L(`
      <p>θ is the angle the line makes with the <b>positive x-axis</b>, measured anti-clockwise, and</p>
      <div class="formula">tan θ = m</div>
      <ul>
        <li><b>Positive</b> gradient → θ is <b>acute</b>: SHIFT tan the gradient and that IS θ.</li>
        <li><b>Negative</b> gradient → θ is <b>obtuse</b>: SHIFT tan the gradient <b>without</b> its minus, then θ = 180° − that.</li>
      </ul>
      <p><b>Do not</b> put the negative gradient into the calculator with its minus in — drop the sign, get the acute reference angle, then take 180° − that.</p>
      <div class="eg">e.g. m = −4/5 → tan θ = −4/5, and <span class="nowrap">SHIFT tan (4/5)</span> = 38,66°, so θ = 180° − 38,66° = 141,34°.</div>`, `
      <p>θ is die hoek wat die lyn met die <b>positiewe x-as</b> maak, antikloksgewys gemeet, en</p>
      <div class="formula">tan θ = m</div>
      <ul>
        <li><b>Positiewe</b> gradiënt → θ is <b>skerp</b>: SHIFT tan die gradiënt, en dit IS θ.</li>
        <li><b>Negatiewe</b> gradiënt → θ is <b>stomp</b>: SHIFT tan die gradiënt <b>sonder</b> sy minus, dan is θ = 180° − dit.</li>
      </ul>
      <p><b>Moenie</b> die negatiewe gradiënt met sy minus in die sakrekenaar intik nie: los die teken weg, kry die skerp verwysingshoek, en neem dan 180° − dit.</p>
      <div class="eg">bv. m = −4/5 → tan θ = −4/5, en <span class="nowrap">SHIFT tan (4/5)</span> = 38,66°, dus θ = 180° − 38,66° = 141,34°.</div>`),
  },
  perpBisector: {
    title: L("Perpendicular bisector", "Middelloodlyn"),
    body: L(`
      <p>The perpendicular bisector of AB does <b>two</b> things at once:</p>
      <ul>
        <li>it passes through the <b>midpoint</b> of AB, and</li>
        <li>it is <b>perpendicular</b> to AB (crosses it at 90°).</li>
      </ul>
      <p>So its gradient is the <b>negative reciprocal</b> of AB’s gradient, and it goes through M, the midpoint. Every point on it is the same distance from A as from B.</p>`, `
      <p>Die middelloodlyn van AB doen <b>twee</b> dinge tegelyk:</p>
      <ul>
        <li>dit gaan deur die <b>middelpunt</b> van AB, en</li>
        <li>dit is <b>loodreg</b> op AB (sny dit teen 90°).</li>
      </ul>
      <p>Sy gradiënt is dus die <b>negatiewe resiprook</b> van AB se gradiënt, en dit gaan deur M, die middelpunt. Elke punt daarop is ewe ver van A as van B.</p>`),
  },
  triangleArea: {
    title: L("Area of a triangle — base & ⊥height", "Oppervlakte van 'n driehoek: basis & ⊥hoogte"),
    body: L(`
      <div class="formula">Area = ½ × base × ⊥height</div>
      <p>Pick any side as the <b>base</b>. The <b>perpendicular height</b> (the altitude) is then drawn from the <b>opposite vertex</b>, meeting that base at <b>90°</b>.</p>
      <ul>
        <li>An <b>altitude</b> makes a right angle with the base — that’s the height.</li>
        <li>A <b>median</b> goes to the midpoint — that is <b>not</b> the height.</li>
      </ul>
      <p>Except in a right-angled triangle, the height is a NEW segment inside the triangle, not one of the sides.</p>`, `
      <div class="formula">Oppervlakte = ½ × basis × ⊥hoogte</div>
      <p>Kies enige sy as die <b>basis</b>. Die <b>loodregte hoogte</b> (die hoogtelyn) word dan vanaf die <b>teenoorstaande hoekpunt</b> geteken en ontmoet die basis teen <b>90°</b>.</p>
      <ul>
        <li>'n <b>Hoogtelyn</b> maak 'n regte hoek met die basis: dit is die hoogte.</li>
        <li>'n <b>Swaartelyn</b> gaan na die middelpunt: dit is <b>nie</b> die hoogte nie.</li>
      </ul>
      <p>Behalwe in 'n reghoekige driehoek is die hoogte 'n NUWE lynstuk binne die driehoek, nie een van die sye nie.</p>`),
  },
  proofWords: {
    title: L("Lines in a triangle & ‘prove that…’", "Lyne in 'n driehoek & ‘bewys dat…’"),
    body: L(`
      <ul>
        <li><b>Median</b> — vertex to the <b>midpoint</b> of the opposite side.</li>
        <li><b>Altitude</b> — vertex, <b>perpendicular</b> to the opposite side (the height).</li>
        <li><b>Perpendicular bisector</b> — through a side’s <b>midpoint</b> AND perpendicular to it.</li>
      </ul>
      <p>To prove things, show:</p>
      <div class="formula">∥ : m<sub>AB</sub> = m<sub>CD</sub><br>⊥ : m<sub>AB</sub> × m<sub>CD</sub> = −1<br>collinear : m<sub>AB</sub> = m<sub>BC</sub><br>parallelogram : diagonals share a midpoint</div>`, `
      <ul>
        <li><b>Swaartelyn</b>: hoekpunt na die <b>middelpunt</b> van die teenoorstaande sy.</li>
        <li><b>Hoogtelyn</b>: vanaf die hoekpunt, <b>loodreg</b> op die teenoorstaande sy (die hoogte).</li>
        <li><b>Middelloodlyn</b>: deur 'n sy se <b>middelpunt</b> EN loodreg daarop.</li>
      </ul>
      <p>Om iets te bewys, toon aan:</p>
      <div class="formula">∥ : m<sub>AB</sub> = m<sub>CD</sub><br>⊥ : m<sub>AB</sub> × m<sub>CD</sub> = −1<br>saamlynig : m<sub>AB</sub> = m<sub>BC</sub><br>parallelogram : hoeklyne deel 'n middelpunt</div>`),
  },

};
