/* Concept cards: 2D Trigonometry (chapter id "trig"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_TRIG = {
  /* ---------- 2D Trigonometry ---------- */
  trigChooseRule: {
    title: L("Which rule do I use?", "Watter reël gebruik ek?"),
    body: L(`
      <p>Match what you are <b>given</b> to the rule:</p>
      <ul>
        <li><b>Sine rule</b> — a side together with the angle <b>opposite</b> it (two angles & a side, or two sides & a non-included angle).</li>
        <li><b>Cosine rule</b> — two sides and the angle <b>between</b> them (find the third side), or <b>all three sides</b> (find an angle).</li>
        <li><b>Area rule</b> — two sides and the <b>included</b> angle (find the area).</li>
      </ul>
      <div class="formula">side+opposite angle → sine · included angle / 3 sides → cosine · 2 sides + included angle → area</div>`, `
      <p>Pas wat <b>gegee</b> is by die reël:</p>
      <ul>
        <li><b>Sinusreël</b>: 'n sy saam met die hoek <b>teenoor</b> die sy (twee hoeke & 'n sy, of twee sye & 'n nie-ingeslote hoek).</li>
        <li><b>Cosinusreël</b>: twee sye en die hoek <b>tussen</b> hulle (vind die derde sy), of <b>al drie sye</b> (vind 'n hoek).</li>
        <li><b>Oppervlakreël</b>: twee sye en die <b>ingeslote</b> hoek (vind die oppervlakte).</li>
      </ul>
      <div class="formula">sy+teenoorstaande hoek → sinus · ingeslote hoek / 3 sye → cosinus · 2 sye + ingeslote hoek → oppervlakte</div>`),
  },
  labelling: {
    title: L("Labelling — sides and their “friends”", "Benoeming: sye en hul “vriende”"),
    body: L(`
      <p>Angles get <b>capital</b> letters (Â, B̂, Ĉ); sides get <b>lower-case</b> letters (a, b, c).</p>
      <p>Each side is named after the angle <b>opposite</b> it — they are “friends” looking across the triangle: side <b>a</b> is opposite <b>Â</b>.</p>
      <ul>
        <li>The <b>biggest</b> angle is opposite the <b>longest</b> side.</li>
        <li>The <b>smallest</b> angle is opposite the <b>shortest</b> side.</li>
      </ul>
      <div class="eg">Never judge sizes by eye — a sketch is not to scale.</div>`, `
      <p>Hoeke kry <b>hoofletters</b> (Â, B̂, Ĉ); sye kry <b>kleinletters</b> (a, b, c).</p>
      <p>Elke sy kry die naam van die hoek <b>teenoor</b> dit. Hulle is “vriende” wat oor die driehoek na mekaar kyk: sy <b>a</b> is teenoor <b>Â</b>.</p>
      <ul>
        <li>Die <b>grootste</b> hoek is teenoor die <b>langste</b> sy.</li>
        <li>Die <b>kleinste</b> hoek is teenoor die <b>kortste</b> sy.</li>
      </ul>
      <div class="eg">Skat nooit groottes op die oog nie: 'n skets is nie op skaal nie.</div>`),
  },
  sineRuleSide: {
    title: L("Sine rule — finding a side", "Sinusreël: vind 'n sy"),
    body: L(`
      <p>Use it when you have a side paired with its opposite angle. Put the <b>sides on top</b>:</p>
      <div class="formula">a/sinÂ = b/sinB̂ = c/sinĈ</div>
      <p>Write only the two ratios you need, then cross-multiply.</p>
      <div class="eg">e.g. x opposite 50°, with 12 opposite 40°:  x/sin50° = 12/sin40°  →  x = 12·sin50°/sin40°.</div>`, `
      <p>Gebruik dit as jy 'n sy en die hoek teenoor dit het. Sit die <b>sye bo</b>:</p>
      <div class="formula">a/sinÂ = b/sinB̂ = c/sinĈ</div>
      <p>Skryf net die twee verhoudings neer wat jy nodig het, en kruisvermenigvuldig dan.</p>
      <div class="eg">bv. x teenoor 50°, met 12 teenoor 40°:  x/sin50° = 12/sin40°  →  x = 12·sin50°/sin40°.</div>`),
  },
  sineRuleAngle: {
    title: L("Sine rule — finding an angle", "Sinusreël: vind 'n hoek"),
    body: L(`
      <p>Flip the rule so the <b>sines are on top</b>:</p>
      <div class="formula">sinÂ/a = sinB̂/b = sinĈ/c</div>
      <p>Solve for the sine, then SHIFT sin that value to get the angle.</p>
      <div class="eg">e.g. sinθ/9 = sin50°/13  →  sinθ = 9·sin50°/13 = 0,5303  →  <span class="nowrap">SHIFT sin (0,5303)</span> → θ = 32,0°.</div>`, `
      <p>Draai die reël om sodat die <b>sinusse bo</b> is:</p>
      <div class="formula">sinÂ/a = sinB̂/b = sinĈ/c</div>
      <p>Los op vir die sinus, en doen dan SHIFT sin op daardie waarde om die hoek te kry.</p>
      <div class="eg">bv. sinθ/9 = sin50°/13  →  sinθ = 9·sin50°/13 = 0,5303  →  <span class="nowrap">SHIFT sin (0,5303)</span> → θ = 32,0°.</div>`),
  },
  ambiguousCase: {
    title: L("The ambiguous case", "Die dubbelsinnige geval"),
    body: L(`
      <p>Only with the <b>sine rule</b>, and only with two sides and a <b>non-included</b> angle (SSA). Sometimes <b>two</b> triangles fit.</p>
      <p>Compare the side <b>a</b> opposite the known angle Â with <b>h = b·sinÂ</b>:</p>
      <ul>
        <li>a &lt; h → <b>no</b> triangle</li>
        <li>a = h → <b>one</b> triangle (right-angled)</li>
        <li>h &lt; a &lt; b → <b>two</b> triangles (acute and obtuse)</li>
        <li>a ≥ b → <b>one</b> triangle</li>
      </ul>
      <div class="formula">obtuse angle = 180° − (acute angle)</div>`, `
      <p>Net met die <b>sinusreël</b>, en net met twee sye en 'n <b>nie-ingeslote</b> hoek (SSH). Soms pas <b>twee</b> driehoeke.</p>
      <p>Vergelyk die sy <b>a</b> teenoor die bekende hoek Â met <b>h = b·sinÂ</b>:</p>
      <ul>
        <li>a &lt; h → <b>geen</b> driehoek</li>
        <li>a = h → <b>een</b> driehoek (reghoekig)</li>
        <li>h &lt; a &lt; b → <b>twee</b> driehoeke (skerp en stomp)</li>
        <li>a ≥ b → <b>een</b> driehoek</li>
      </ul>
      <div class="formula">stomphoek = 180° − (skerphoek)</div>`),
  },
  cosineRuleSide: {
    title: L("Cosine rule — finding a side", "Cosinusreël: vind 'n sy"),
    body: L(`
      <p>Use it with two sides and the <b>included</b> angle (the angle between them).</p>
      <div class="formula">a² = b² + c² − 2bc·cosÂ</div>
      <p>(side you want)² = (sum of the other two squared) − 2 × (those two) × cos(angle between them). Work out the right side, then square-root.</p>`, `
      <p>Gebruik dit met twee sye en die <b>ingeslote</b> hoek (die hoek tussen hulle).</p>
      <div class="formula">a² = b² + c² − 2bc·cosÂ</div>
      <p>(sy wat jy soek)² = (som van die ander twee se kwadrate) − 2 × (daardie twee) × cos(hoek tussen hulle). Werk die regterkant uit, trek dan die vierkantswortel.</p>`),
  },
  cosineRuleAngle: {
    title: L("Cosine rule — finding an angle", "Cosinusreël: vind 'n hoek"),
    body: L(`
      <p>Use it when you know <b>all three sides</b>. Rearranged so the cosine is the subject:</p>
      <div class="formula">cosÂ = (b² + c² − a²) / (2bc)</div>
      <p>The side <b>opposite</b> the angle you want is the one subtracted on top. Work out cos of the angle first, then SHIFT cos that value — and if cos came out <b>negative</b>, the calculator hands you the <b>obtuse</b> angle on its own.</p>
      <div class="eg">This SSS form is <b>not</b> on the formula sheet — memorise it.</div>`, `
      <p>Gebruik dit as jy <b>al drie sye</b> ken. Omgeskryf sodat cos die onderwerp is:</p>
      <div class="formula">cosÂ = (b² + c² − a²) / (2bc)</div>
      <p>Die sy <b>teenoor</b> die hoek wat jy soek, is die een wat bo afgetrek word. Werk eers cos van die hoek uit, doen dan SHIFT cos op daardie waarde. As cos <b>negatief</b> uitkom, gee die sakrekenaar vanself vir jou die <b>stomp</b> hoek.</p>
      <div class="eg">Hierdie SSS-vorm is <b>nie</b> op die formuleblad nie: leer dit uit jou kop.</div>`),
  },
  areaRule: {
    title: L("Area rule", "Oppervlakreël"),
    body: L(`
      <p>Use two sides and the angle <b>included</b> between them:</p>
      <div class="formula">Area = ½·b·c·sinÂ</div>
      <p>If the angle you have is not between the two sides, find the included angle first (sine or cosine rule).</p>`, `
      <p>Gebruik twee sye en die <b>ingeslote</b> hoek tussen hulle:</p>
      <div class="formula">Oppervlakte = ½·b·c·sinÂ</div>
      <p>As die hoek wat jy het nie tussen die twee sye is nie, vind eers die ingeslote hoek (sinus- of cosinusreël).</p>`),
  },
  areaPolygon: {
    title: L("Area of a regular polygon", "Oppervlakte van 'n reëlmatige veelhoek"),
    body: L(`
      <p>Split a regular n-gon into <b>n equal triangles</b> from the centre. Each centre angle is 360°/n.</p>
      <div class="formula">Area = n·s² / (4·tan(180°/n))</div>
      <div class="eg">e.g. a regular octagon (n = 8) with side 10:  Area = 8·10² / (4·tan22,5°).</div>`, `
      <p>Verdeel 'n reëlmatige n-hoek vanaf die middelpunt in <b>n gelyke driehoeke</b>. Elke middelpuntshoek is 360°/n.</p>
      <div class="formula">Oppervlakte = n·s² / (4·tan(180°/n))</div>
      <div class="eg">bv. 'n reëlmatige agthoek (n = 8) met sy 10:  Oppervlakte = 8·10² / (4·tan22,5°).</div>`),
  },
  areaQuad: {
    title: L("Area of a composite shape", "Oppervlakte van 'n saamgestelde figuur"),
    body: L(`
      <p>Break the figure into triangles (and rectangles) whose areas you can find, then <b>add them up</b>.</p>
      <p>If you need a missing length first — like the base shared by two parts — get it from the <b>cosine rule</b>, then apply the area rule or length × breadth.</p>`, `
      <p>Verdeel die figuur in driehoeke (en reghoeke) waarvan jy die oppervlaktes kan vind, en <b>tel hulle dan op</b>.</p>
      <p>As jy eers 'n ontbrekende lengte nodig het, soos die basis wat twee dele gemeen het, kry dit met die <b>cosinusreël</b>, en gebruik dan die oppervlakreël of lengte × breedte.</p>`),
  },
  shortestDistance: {
    title: L("Shortest distance to a line", "Kortste afstand na 'n lyn"),
    body: L(`
      <p>The shortest distance from a point to a side is the <b>perpendicular</b> height to that side.</p>
      <p>Find the triangle's area, then turn the area formula around:</p>
      <div class="formula">Area = ½·base·height<br>→ height = 2·Area / base</div>`, `
      <p>Die kortste afstand van 'n punt na 'n sy is die <b>loodregte</b> hoogte na daardie sy.</p>
      <p>Vind die driehoek se oppervlakte, en draai dan die oppervlakteformule om:</p>
      <div class="formula">Oppervlakte = ½·basis·hoogte<br>→ hoogte = 2·Oppervlakte / basis</div>`),
  },
  mixedStrategy: {
    title: L("Working through a problem", "'n Probleem aanpak"),
    body: L(`
      <p>Three questions, in order:</p>
      <ol>
        <li><b>What am I given?</b> Label the sides and angles (friends).</li>
        <li><b>Which rule fits?</b> Side+opposite angle → sine; included angle or 3 sides → cosine; area from 2 sides + included angle → area rule.</li>
        <li><b>Do I need a stepping stone?</b> Often find one missing angle or side first, then the thing asked.</li>
      </ol>`, `
      <p>Drie vrae, in volgorde:</p>
      <ol>
        <li><b>Wat is gegee?</b> Benoem die sye en hoeke (vriende).</li>
        <li><b>Watter reël pas?</b> Sy+teenoorstaande hoek → sinus; ingeslote hoek of 3 sye → cosinus; oppervlakte uit 2 sye + ingeslote hoek → oppervlakreël.</li>
        <li><b>Het ek 'n tussenstap nodig?</b> Vind dikwels eers een ontbrekende hoek of sy, en dan wat gevra word.</li>
      </ol>`),
  },

};
