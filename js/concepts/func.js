/* Concept cards: Functions (chapter id "func"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_FUNC = {
  /* ---------------- Functions ---------------- */
  funcTypes: {
    title: L("The four function families", "Die vier funksiefamilies"),
    body: L(`
      <p>Spot the family from the equation:</p>
      <ul>
        <li><b>Straight line</b> — just an x, no powers, no x on the bottom: y = ax + q.</li>
        <li><b>Parabola</b> — has an <b>x²</b> (or a bracket squared): y = ax² + bx + c. Shape ∪ or ∩, one turning point.</li>
        <li><b>Hyperbola</b> — x in the <b>denominator</b>: y = a/(x − p) + q. Two branches, two asymptotes.</li>
        <li><b>Exponential</b> — x in the <b>exponent</b>: y = a·b<sup>x − p</sup> + q. One horizontal asymptote, no turning point.</li>
      </ul>
      <p>Names for y: f(x), g(x), h(x). f(3) means “substitute x = 3 and read the y-value”.</p>`, `
      <p>Herken die familie aan die vergelyking:</p>
      <ul>
        <li><b>Reguit lyn</b>: net 'n x, geen magte nie, geen x in die noemer nie: y = ax + q.</li>
        <li><b>Parabool</b>: het 'n <b>x²</b> (of 'n hakie in die kwadraat): y = ax² + bx + c. Vorm ∪ of ∩, een draaipunt.</li>
        <li><b>Hiperbool</b>: x in die <b>noemer</b>: y = a/(x − p) + q. Twee vlerkies, twee asimptote.</li>
        <li><b>Eksponensieel</b>: x in die <b>eksponent</b>: y = a·b<sup>x − p</sup> + q. Een horisontale asimptoot, geen draaipunt nie.</li>
      </ul>
      <p>Name vir y: f(x), g(x), h(x). f(3) beteken “vervang x = 3 en lees die y-waarde af”.</p>`),
  },
  domainRange: {
    title: L("Domain & range", "Definisie- & waardeversameling"),
    body: L(`
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
      </ul>`, `
      <p><b>Definisieversameling</b> = al die x-waardes wat die grafiek gebruik. <b>Waardeversameling</b> = al die y-waardes.</p>
      <ul>
        <li><b>Lyn / parabool / eksponensieel:</b> definisieversameling is x ∈ ℝ (elke x werk).</li>
        <li><b>Hiperbool:</b> definisieversameling x ∈ ℝ, x ≠ p (dit slaan die vertikale asimptoot oor).</li>
      </ul>
      <p>Waardeversameling:</p>
      <ul>
        <li><b>Parabool:</b> y ≥ q (happy) of y ≤ q (sad), waar q die draaipunt se y is.</li>
        <li><b>Hiperbool:</b> y ∈ ℝ, y ≠ q (slaan die horisontale asimptoot oor).</li>
        <li><b>Eksponensieel:</b> y &gt; q (a &gt; 0) of y &lt; q (a &lt; 0).</li>
      </ul>`),
  },
  linearGraph: {
    title: L("The straight line y = ax + q", "Die reguit lyn y = ax + q"),
    body: L(`
      <p><b>a</b> is the gradient, <b>q</b> is the y-intercept.</p>
      <ul>
        <li>a &gt; 0 → increasing (slopes up); a &lt; 0 → decreasing (slopes down).</li>
        <li><b>y-intercept:</b> let x = 0 → it is just q, the point (0 ; q).</li>
        <li><b>x-intercept:</b> let y = 0 and solve for x.</li>
      </ul>
      <div class="eg">y = 2x − 6: y-intercept (0 ; −6); x-intercept where 0 = 2x − 6 → x = 3, point (3 ; 0).</div>`, `
      <p><b>a</b> is die gradiënt, <b>q</b> is die y-afsnit.</p>
      <ul>
        <li>a &gt; 0 → stygend (loop op); a &lt; 0 → dalend (loop af).</li>
        <li><b>y-afsnit:</b> stel x = 0 → dit is net q, die punt (0 ; q).</li>
        <li><b>x-afsnit:</b> stel y = 0 en los op vir x.</li>
      </ul>
      <div class="eg">y = 2x − 6: y-afsnit (0 ; −6); x-afsnit waar 0 = 2x − 6 → x = 3, punt (3 ; 0).</div>`),
  },
  parabolaShape: {
    title: L("The parabola — shape & turning point", "Die parabool: vorm & draaipunt"),
    body: L(`
      <p>Standard form y = ax² + bx + c; turning-point form y = a(x − p)² + q with turning point (p ; q).</p>
      <ul>
        <li><b>a &gt; 0</b> → “happy” ∪, opens up, has a <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → “sad” ∩, opens down, has a <b>maximum</b>.</li>
        <li><b>Turning point x</b> = −b/(2a); substitute back for the y.</li>
        <li><b>Axis of symmetry</b> = the vertical line through the turning point, x = p.</li>
      </ul>`, `
      <p>Standaardvorm y = ax² + bx + c; draaipunt-vorm y = a(x − p)² + q met draaipunt (p ; q).</p>
      <ul>
        <li><b>a &gt; 0</b> → “happy” ∪, maak oop na bo, het 'n <b>minimum</b>.</li>
        <li><b>a &lt; 0</b> → “sad” ∩, maak oop na onder, het 'n <b>maksimum</b>.</li>
        <li><b>Draaipunt se x</b> = −b/(2a); vervang dit terug om die y te kry.</li>
        <li><b>Simmetrie-as</b> = die vertikale lyn deur die draaipunt, x = p.</li>
      </ul>`),
  },
  hyperbolaGraph: {
    title: L("The hyperbola y = a/(x − p) + q", "Die hiperbool y = a/(x − p) + q"),
    body: L(`
      <p>Two branches sitting around two asymptotes:</p>
      <ul>
        <li><b>Vertical asymptote:</b> x = p.</li>
        <li><b>Horizontal asymptote:</b> y = q.</li>
        <li><b>a &gt; 0</b> → branches top-right & bottom-left, each <b>decreasing</b>.</li>
        <li><b>a &lt; 0</b> → branches top-left & bottom-right, each <b>increasing</b>.</li>
      </ul>
      <p>The graph never touches its asymptotes — that is why x ≠ p and y ≠ q.</p>`, `
      <p>Twee vlerkies rondom twee asimptote:</p>
      <ul>
        <li><b>Vertikale asimptoot:</b> x = p.</li>
        <li><b>Horisontale asimptoot:</b> y = q.</li>
        <li><b>a &gt; 0</b> → vlerkies regs bo & links onder, elkeen <b>dalend</b>.</li>
        <li><b>a &lt; 0</b> → vlerkies links bo & regs onder, elkeen <b>stygend</b>.</li>
      </ul>
      <p>Die grafiek raak nooit sy asimptote nie: daarom is x ≠ p en y ≠ q.</p>`),
  },
  exponentialGraph: {
    title: L("The exponential y = a·b<sup>x − p</sup> + q", "Die eksponensiële grafiek y = a·b<sup>x − p</sup> + q"),
    body: L(`
      <p>One horizontal asymptote and no turning point.</p>
      <ul>
        <li><b>Asymptote:</b> y = q (the graph flattens towards it).</li>
        <li><b>b &gt; 1</b> → growth (“taking off”, increasing). <b>0 &lt; b &lt; 1</b> → decay (“landing”, decreasing).</li>
        <li><b>a &gt; 0</b> → graph above the asymptote (range y &gt; q). <b>a &lt; 0</b> → below (y &lt; q).</li>
        <li><b>p</b> — the exponent is (x − p), so p has the <b>opposite</b> sign to the number you see: 2<sup>x − 3</sup> has p = 3 and is 3 units to the <b>right</b>, and 2<sup>x + 3</sup> has p = −3 and is 3 units to the <b>left</b>.</li>
      </ul>
      <p>In Grade 10 the exponential was y = a·bˣ + q. Grade 11 adds the p.</p>
      <div class="eg">A fraction base is a negative exponent: (½)ˣ = 2⁻ˣ.</div>`, `
      <p>Een horisontale asimptoot en geen draaipunt nie.</p>
      <ul>
        <li><b>Asimptoot:</b> y = q (die grafiek plat af na hom toe).</li>
        <li><b>b &gt; 1</b> → groei (“styg op”, stygend). <b>0 &lt; b &lt; 1</b> → verval (“land”, dalend).</li>
        <li><b>a &gt; 0</b> → grafiek bo die asimptoot (waardeversameling y &gt; q). <b>a &lt; 0</b> → onder (y &lt; q).</li>
        <li><b>p</b>: die eksponent is (x − p), dus het p die <b>teenoorgestelde</b> teken van die getal wat jy sien: 2<sup>x − 3</sup> het p = 3 en is 3 eenhede na <b>regs</b>, en 2<sup>x + 3</sup> het p = −3 en is 3 eenhede na <b>links</b>.</li>
      </ul>
      <p>In Graad 10 was die eksponensiële grafiek y = a·bˣ + q. Graad 11 voeg die p by.</p>
      <div class="eg">'n Breuk as grondtal is 'n negatiewe eksponent: (½)ˣ = 2⁻ˣ.</div>`),
  },
  readGraph: {
    title: L("Reading features off a graph", "Lees kenmerke van 'n grafiek af"),
    body: L(`
      <ul>
        <li><b>y-intercept:</b> where the graph crosses the y-axis (x = 0).</li>
        <li><b>x-intercept(s):</b> where it crosses the x-axis (y = 0).</li>
        <li><b>Turning point:</b> the lowest/highest point of a parabola — read both coordinates.</li>
        <li><b>Asymptotes:</b> the dashed lines the graph hugs but never touches.</li>
      </ul>
      <p>Follow a point straight down to the x-axis for its x-value, and straight across to the y-axis for its y-value.</p>`, `
      <ul>
        <li><b>y-afsnit:</b> waar die grafiek die y-as sny (x = 0).</li>
        <li><b>x-afsnit(te):</b> waar dit die x-as sny (y = 0).</li>
        <li><b>Draaipunt:</b> die laagste/hoogste punt van 'n parabool; lees albei koördinate af.</li>
        <li><b>Asimptote:</b> die stippellyne waaraan die grafiek klou, maar wat hy nooit raak nie.</li>
      </ul>
      <p>Volg 'n punt reguit af na die x-as vir sy x-waarde, en reguit oor na die y-as vir sy y-waarde.</p>`),
  },
  incDec: {
    title: L("Increasing & decreasing", "Stygend & dalend"),
    body: L(`
      <p>Read the graph <b>left to right</b>: going up = increasing, going down = decreasing.</p>
      <p>A parabola changes direction at its turning point x = p:</p>
      <ul>
        <li><b>Happy (∪):</b> decreasing for x &lt; p, increasing for x &gt; p.</li>
        <li><b>Sad (∩):</b> increasing for x &lt; p, decreasing for x &gt; p.</li>
      </ul>
      <p>A straight line is increasing everywhere (a &gt; 0) or decreasing everywhere (a &lt; 0).</p>`, `
      <p>Lees die grafiek van <b>links na regs</b>: gaan op = stygend, gaan af = dalend.</p>
      <p>'n Parabool verander rigting by sy draaipunt x = p:</p>
      <ul>
        <li><b>Happy (∪):</b> dalend vir x &lt; p, stygend vir x &gt; p.</li>
        <li><b>Sad (∩):</b> stygend vir x &lt; p, dalend vir x &gt; p.</li>
      </ul>
      <p>'n Reguit lyn is oral stygend (a &gt; 0) of oral dalend (a &lt; 0).</p>`),
  },
  posNeg: {
    title: L("Where a graph is positive or negative", "Waar 'n grafiek positief of negatief is"),
    body: L(`
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
      <p>Always write x first, e.g. <i>−2 &lt; x &lt; 3</i>.</p>`, `
      <p>“f(x)” is die <b>y-waarde</b>, dus:</p>
      <ul>
        <li><b>f(x) &gt; 0</b>: die grafiek is <b>bo</b> die x-as.</li>
        <li><b>f(x) &lt; 0</b>: die grafiek is <b>onder</b> die x-as.</li>
      </ul>
      <p>Die x-afsnitte is die grense. Vir 'n parabool met afsnitte a &lt; b:</p>
      <ul>
        <li><b>Happy:</b> bo vir x &lt; a of x &gt; b; onder vir a &lt; x &lt; b.</li>
        <li><b>Sad:</b> bo vir a &lt; x &lt; b; onder vir x &lt; a of x &gt; b.</li>
      </ul>
      <p>Skryf altyd x eerste, bv. <i>−2 &lt; x &lt; 3</i>.</p>`),
  },
  ineqCombined: {
    title: L("Product & quotient inequalities (signs)", "Produk- & kwosiëntongelykhede (tekens)"),
    body: L(`
      <p>It is all about <b>signs</b>:</p>
      <ul>
        <li><b>f(x)·g(x) &gt; 0</b> — same side of the x-axis (both above, or both below).</li>
        <li><b>f(x)·g(x) &lt; 0</b> — different sides (one above, one below).</li>
        <li><b>f(x)/g(x)</b> — same rule, but g(x) ≠ 0.</li>
        <li><b>x·f(x) &gt; 0</b> — x and the y-value have the <b>same</b> sign → quadrants 1 &amp; 3.</li>
        <li><b>x·f(x) &lt; 0</b> — different signs → quadrants 2 &amp; 4.</li>
      </ul>
      <p>When comparing two graphs (f &gt; g), the boundaries are the x-values of the <b>intersection</b> points.</p>`, `
      <p>Dit gaan alles oor <b>tekens</b>:</p>
      <ul>
        <li><b>f(x)·g(x) &gt; 0</b>: dieselfde kant van die x-as (albei bo, of albei onder).</li>
        <li><b>f(x)·g(x) &lt; 0</b>: verskillende kante (een bo, een onder).</li>
        <li><b>f(x)/g(x)</b>: dieselfde reël, maar g(x) ≠ 0.</li>
        <li><b>x·f(x) &gt; 0</b>: x en die y-waarde het <b>dieselfde</b> teken → kwadrante 1 &amp; 3.</li>
        <li><b>x·f(x) &lt; 0</b>: verskillende tekens → kwadrante 2 &amp; 4.</li>
      </ul>
      <p>As jy twee grafieke vergelyk (f &gt; g), is die grense die x-waardes van die <b>snypunte</b>.</p>`),
  },
  transformations: {
    title: L("Transformations", "Transformasies"),
    body: L(`
      <p>Starting from f(x):</p>
      <ul>
        <li><b>Up/down:</b> f(x) + k (up), f(x) − k (down).</li>
        <li><b>Left/right (inside with x):</b> f(x + k) shifts <b>left</b>, f(x − k) shifts <b>right</b>.</li>
        <li><b>Reflection in the x-axis:</b> −f(x) (the y’s change sign).</li>
        <li><b>Reflection in the y-axis:</b> f(−x) (the x’s change sign).</li>
        <li><b>Vertical stretch:</b> k·f(x).</li>
      </ul>
      <p>A vertical shift moves a parabola’s turning point y and an asymptote y = q; x stays the same.</p>`, `
      <p>Begin by f(x):</p>
      <ul>
        <li><b>Op/af:</b> f(x) + k (op), f(x) − k (af).</li>
        <li><b>Links/regs (binne by die x):</b> f(x + k) skuif <b>links</b>, f(x − k) skuif <b>regs</b>.</li>
        <li><b>Refleksie in die x-as:</b> −f(x) (elke y verander van teken).</li>
        <li><b>Refleksie in die y-as:</b> f(−x) (elke x verander van teken).</li>
        <li><b>Vertikale rek:</b> k·f(x).</li>
      </ul>
      <p>'n Vertikale skuif verander die y van 'n parabool se draaipunt en van 'n asimptoot y = q; x bly dieselfde.</p>`),
  },
  intersections: {
    title: L("Where two graphs meet", "Waar twee grafieke mekaar ontmoet"),
    body: L(`
      <p>An <b>intersection</b> point lies on <b>both</b> graphs at once — read its coordinates off both axes.</p>
      <p>To compare graphs:</p>
      <ul>
        <li><b>f(x) &gt; g(x)</b> — where f is <b>above</b> g.</li>
        <li>The graphs swap over at their intersection points, so those x-values are the boundaries.</li>
      </ul>`, `
      <p>'n <b>Snypunt</b> lê op <b>albei</b> grafieke tegelyk: lees sy koördinate van albei asse af.</p>
      <p>Om grafieke te vergelyk:</p>
      <ul>
        <li><b>f(x) &gt; g(x)</b>: waar f <b>bo</b> g is.</li>
        <li>Die grafieke ruil plek by hulle snypunte, dus is daardie x-waardes die grense.</li>
      </ul>`),
  },
  natureRoots: {
    title: L("Nature of the roots", "Aard van die wortels"),
    body: L(`
      <p>The roots (x-intercepts) of a parabola depend on the discriminant Δ = b² − 4ac:</p>
      <ul>
        <li><b>Δ &gt; 0</b> — two real, unequal roots (cuts the x-axis twice).</li>
        <li><b>Δ = 0</b> — two equal roots (touches the x-axis once).</li>
        <li><b>Δ &lt; 0</b> — non-real roots (never reaches the x-axis).</li>
      </ul>
      <p><b>The y = k method:</b> for a happy parabola with turning-point value y₀, the line y = k meets it <b>twice</b> when k &gt; y₀, <b>once</b> when k = y₀, and <b>not at all</b> when k &lt; y₀.</p>`, `
      <p>Die wortels (x-afsnitte) van 'n parabool hang af van die diskriminant Δ = b² − 4ac:</p>
      <ul>
        <li><b>Δ &gt; 0</b>: twee reële, ongelyke wortels (sny die x-as twee keer).</li>
        <li><b>Δ = 0</b>: twee gelyke wortels (raak die x-as een keer).</li>
        <li><b>Δ &lt; 0</b>: nie-reële wortels (bereik nooit die x-as nie).</li>
      </ul>
      <p><b>Die metode met y = k:</b> vir 'n happy parabool met draaipuntwaarde y₀, ontmoet die lyn y = k dit <b>twee keer</b> as k &gt; y₀, <b>een keer</b> as k = y₀, en <b>glad nie</b> as k &lt; y₀.</p>`),
  },
  avgGradient: {
    title: L("Average gradient", "Gemiddelde gradiënt"),
    body: L(`
      <p>The average gradient between two points is the gradient of the straight line joining them.</p>
      <div class="formula">average gradient = (y₂ − y₁) / (x₂ − x₁)</div>
      <p>First substitute each x into the function to get its y-value, then use the formula.</p>
      <div class="eg">f(x) = x² − 4 between x = −1 and x = 3: points (−1 ; −3) and (3 ; 5) → (5 − (−3))/(3 − (−1)) = 2.</div>`, `
      <p>Die gemiddelde gradiënt tussen twee punte is die gradiënt van die reguit lyn wat hulle verbind.</p>
      <div class="formula">gemiddelde gradiënt = (y₂ − y₁) / (x₂ − x₁)</div>
      <p>Vervang eers elke x in die funksie om sy y-waarde te kry, en gebruik dan die formule.</p>
      <div class="eg">f(x) = x² − 4 tussen x = −1 en x = 3: punte (−1 ; −3) en (3 ; 5) → (5 − (−3))/(3 − (−1)) = 2.</div>`),
  },
  maxLength: {
    title: L("Maximum / minimum length between graphs", "Maksimum / minimum lengte tussen grafieke"),
    body: L(`
      <p>For a vertical line between two graphs:</p>
      <div class="formula">length = <span class="nowrap">(graph on top)</span> − <span class="nowrap">(graph below)</span></div>
      <p>If one is a parabola, that difference is itself a parabola. Find where it turns (x = −b/(2a)) and substitute back to get the biggest (or smallest) length.</p>
      <div class="eg">Keep the brackets when subtracting: g − f = −x + 9 − (x² − 2x + 3) = −x² + x + 6.</div>`, `
      <p>Vir 'n vertikale lyn tussen twee grafieke:</p>
      <div class="formula">lengte = <span class="nowrap">(boonste grafiek)</span> − <span class="nowrap">(onderste grafiek)</span></div>
      <p>As een 'n parabool is, is daardie verskil self 'n parabool. Kry waar dit draai (x = −b/(2a)) en vervang terug om die grootste (of kleinste) lengte te kry.</p>
      <div class="eg">Hou die hakies wanneer jy aftrek: g − f = −x + 9 − (x² − 2x + 3) = −x² + x + 6.</div>`),
  },

};
