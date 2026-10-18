/* Concept cards: Measurement (chapter id "meas"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_MEAS = {
  /* ---------------- Measurement ---------------- */
  measNaming: {
    title: L("Naming a solid", "Benoem 'n liggaam"),
    body: L(`
      <p>Read the solid off its <b>faces</b> and <b>cross-section</b>:</p>
      <ul>
        <li><b>Prism</b> — same flat shape all the way through (rectangular, triangular, …). A <b>cube</b> is a prism with six equal squares.</li>
        <li><b>Pyramid</b> — a flat base rising to a single apex; flat triangular faces.</li>
        <li><b>Cylinder</b> — two circles joined by a curved side.</li>
        <li><b>Cone</b> — one circle rising to an apex (curved side).</li>
        <li><b>Sphere</b> — a ball; <b>hemisphere</b> — half a ball.</li>
      </ul>
      <div class="eg">A curved face means cylinder / cone / sphere / hemisphere; only flat faces means prism / pyramid.</div>`, `
      <p>Lees die liggaam uit sy <b>vlakke</b> en <b>dwarssnit</b> af:</p>
      <ul>
        <li><b>Prisma</b>: dieselfde plat vorm reg deur (reghoekig, driehoekig, …). 'n <b>Kubus</b> is 'n prisma met ses gelyke vierkante.</li>
        <li><b>Piramide</b>: 'n plat basis wat tot by een toppunt oploop; plat driehoekige vlakke.</li>
        <li><b>Silinder</b>: twee sirkels verbind deur 'n geboë sy.</li>
        <li><b>Keël</b>: een sirkel wat tot by 'n toppunt oploop (geboë sy).</li>
        <li><b>Sfeer</b>: 'n bal; <b>halfsfeer</b>: 'n halwe bal.</li>
      </ul>
      <div class="eg">'n Geboë vlak beteken silinder / keël / sfeer / halfsfeer; net plat vlakke beteken prisma / piramide.</div>`),
  },
  volFormula: {
    title: L("Volume — which formula", "Volume: watter formule"),
    body: L(`
      <p>Volume is how much space fills the inside (cubic units).</p>
      <ul>
        <li><b>Prism or cylinder:</b> V = (area of base) × height. So a cylinder is πr²·h.</li>
        <li><b>Cone or pyramid:</b> a third of the matching prism/cylinder — V = ⅓ · (base area) · H.</li>
        <li><b>Sphere</b> = 4/3·πr³; <b>hemisphere</b> = ⅔πr³ (half of it).</li>
      </ul>
      <div class="formula">cube ℓ³ · rectangular prism ℓbh · cylinder πr²h · cone ⅓πr²H · square pyramid ⅓ℓ²H</div>`, `
      <p>Volume is hoeveel ruimte daar binne-in is (kubieke eenhede).</p>
      <ul>
        <li><b>Prisma of silinder:</b> V = (oppervlakte van die basis) × hoogte. Dus is 'n silinder πr²·h.</li>
        <li><b>Keël of piramide:</b> 'n derde van die passende prisma/silinder: V = ⅓ · (basisoppervlakte) · H.</li>
        <li><b>Sfeer</b> = 4/3·πr³; <b>halfsfeer</b> = ⅔πr³ (die helfte daarvan).</li>
      </ul>
      <div class="formula">kubus ℓ³ · reghoekige prisma ℓbh · silinder πr²h · keël ⅓πr²H · vierkantige piramide ⅓ℓ²H</div>`),
  },
  saFormula: {
    title: L("Surface area — which formula", "Buite-oppervlakte: watter formule"),
    body: L(`
      <p>Surface area adds up <b>every outside face</b> (square units). Unroll the curved bits:</p>
      <ul>
        <li>a cylinder's side opens into a rectangle 2πr wide and h tall → 2πrh;</li>
        <li>each closed circular end is πr².</li>
      </ul>
      <div class="formula">cube 6ℓ² · prism 2(ℓb+ℓh+bh) · closed cylinder 2πr²+2πrh · cone πr²+πrh · square pyramid ℓ²+2ℓh · sphere 4πr²</div>`, `
      <p>Buite-oppervlakte tel <b>elke buitevlak</b> op (vierkante eenhede). Rol die geboë dele oop:</p>
      <ul>
        <li>'n silinder se sy rol oop tot 'n reghoek 2πr breed en h hoog → 2πrh;</li>
        <li>elke geslote ronde ent is πr².</li>
      </ul>
      <div class="formula">kubus 6ℓ² · prisma 2(ℓb+ℓh+bh) · geslote silinder 2πr²+2πrh · keël πr²+πrh · vierkantige piramide ℓ²+2ℓh · sfeer 4πr²</div>`),
  },
  thirdFamily: {
    title: L("The ‘one third’ family", "Die ‘een derde’-familie"),
    body: L(`
      <p>A <b>cone</b> or <b>pyramid</b> holds exactly <b>⅓</b> of the cylinder or prism with the same base and height.</p>
      <div class="formula">V(cone) = ⅓πr²H   ·   V(pyramid) = ⅓·(base area)·H</div>
      <p>So whenever you see a point (apex), expect a ⅓ in the volume.</p>`, `
      <p>'n <b>Keël</b> of <b>piramide</b> hou presies <b>⅓</b> van die silinder of prisma met dieselfde basis en hoogte.</p>
      <div class="formula">V(keël) = ⅓πr²H   ·   V(piramide) = ⅓·(basisoppervlakte)·H</div>
      <p>Sien jy 'n punt (toppunt), verwag dus 'n ⅓ in die volume.</p>`),
  },
  slantPerp: {
    title: L("Slant height vs perpendicular height", "Skuinshoogte vs loodregte hoogte"),
    body: L(`
      <p>A cone or pyramid has <b>two</b> different heights:</p>
      <ul>
        <li><b>H — perpendicular height:</b> straight up the middle, apex to base centre. Used for <b>volume</b>.</li>
        <li><b>h — slant height:</b> along the sloping face, apex to the edge of the base. Used for the <b>slanted surface area</b>.</li>
      </ul>
      <p>They sit in a right-angled triangle with the radius (for a pyramid: with <b>half the base side</b>, ℓ/2):</p>
      <div class="formula">h² = H² + r²   →   the slant h is the hypotenuse, so h &gt; H</div>`, `
      <p>'n Keël of piramide het <b>twee</b> verskillende hoogtes:</p>
      <ul>
        <li><b>H (loodregte hoogte):</b> reguit op deur die middel, van toppunt tot middelpunt van die basis. Vir <b>volume</b>.</li>
        <li><b>h (skuinshoogte):</b> langs die skuins vlak, van toppunt tot die rand van die basis. Vir die <b>skuins buite-oppervlakte</b>.</li>
      </ul>
      <p>Hulle vorm 'n reghoekige driehoek saam met die radius (by 'n piramide: met <b>die helfte van die basissy</b>, ℓ/2):</p>
      <div class="formula">h² = H² + r²   →   die skuinshoogte h is die skuinssy, dus h &gt; H</div>`),
  },
  saVsVol: {
    title: L("Area vs volume (and their units)", "Oppervlakte vs volume (en hul eenhede)"),
    body: L(`
      <p><b>Surface area</b> covers the outside skin — two lengths multiplied, so <b>square</b> units (cm²).</p>
      <p><b>Volume</b> fills the inside — three lengths multiplied, so <b>cubic</b> units (cm³).</p>
      <div class="eg">If the question asks how much paint → area. How much it holds → volume.</div>`, `
      <p><b>Buite-oppervlakte</b> bedek die buitenste vel: twee lengtes vermenigvuldig, dus <b>vierkante</b> eenhede (cm²).</p>
      <p><b>Volume</b> vul die binnekant: drie lengtes vermenigvuldig, dus <b>kubieke</b> eenhede (cm³).</p>
      <div class="eg">Vra die vraag hoeveel verf → oppervlakte. Hoeveel dit hou → volume.</div>`),
  },
  openSurfaces: {
    title: L("Open tops & bottoms", "Oop bokante & onderkante"),
    body: L(`
      <p>The curved side of a cylinder is <b>always</b> there: 2πrh. Then add one circle (πr²) for <b>each end that is closed</b>.</p>
      <ul>
        <li><b>Closed</b> both ends: 2πr² + 2πrh</li>
        <li><b>Open top</b> (one lid missing): πr² + 2πrh</li>
        <li><b>Open top &amp; bottom</b> (a pipe): 2πrh only</li>
      </ul>
      <p>Read the picture: a solid lid is counted; an open rim you can see into is not. An open-top box has 5 faces, not 6.</p>`, `
      <p>Die geboë sy van 'n silinder is <b>altyd</b> daar: 2πrh. Tel dan een sirkel (πr²) by vir <b>elke ent wat geslote is</b>.</p>
      <ul>
        <li><b>Geslote</b> aan albei ente: 2πr² + 2πrh</li>
        <li><b>Oop bo</b> (een deksel ontbreek): πr² + 2πrh</li>
        <li><b>Oop bo &amp; onder</b> ('n pyp): net 2πrh</li>
      </ul>
      <p>Lees die prent: 'n geslote deksel tel; 'n oop rand waar jy kan inkyk, tel nie. 'n Boks sonder deksel het 5 vlakke, nie 6 nie.</p>`),
  },
  compositeSolids: {
    title: L("Composite (joined) solids", "Saamgestelde (saamgevoegde) liggame"),
    body: L(`
      <p>Two solids stuck together (e.g. a cylinder with a cone or dome on top).</p>
      <ul>
        <li><b>Volume:</b> just <b>add</b> the parts' volumes — nothing is hidden.</li>
        <li><b>Surface area:</b> add the <b>outer</b> faces, but <b>leave out the joining face</b> where they meet — it is sealed inside.</li>
      </ul>
      <div class="eg">Silo = cylinder + cone: V = πr²h + ⅓πr²H. The circle where they join is not part of the surface.</div>`, `
      <p>Twee liggame aanmekaar (bv. 'n silinder met 'n keël of koepel bo-op).</p>
      <ul>
        <li><b>Volume:</b> <b>tel</b> net die dele se volumes op; niks is versteek nie.</li>
        <li><b>Buite-oppervlakte:</b> tel die <b>buitenste</b> vlakke op, maar <b>los die raakvlak uit</b> waar hulle bymekaarkom; dit is binne-in verseël.</li>
      </ul>
      <div class="eg">Silo = silinder + keël: V = πr²h + ⅓πr²H. Die sirkel waar hulle aanmekaar is, is nie deel van die oppervlak nie.</div>`),
  },
  findHeight: {
    title: L("Finding the perpendicular height (Pythagoras)", "Vind die loodregte hoogte (Pythagoras)"),
    body: L(`
      <p>Inside a cone or pyramid hides a <b>right-angled triangle</b>. Its three sides are the perpendicular height <b>H</b>, the slant height <b>h</b>, and a bottom leg. The slant is the <b>hypotenuse</b> (opposite the right angle), so it is the longest side.</p>
      <ul>
        <li><b>Cone:</b> the bottom leg is the <b>full radius r</b> → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + r²</span></span></li>
        <li><b>Square pyramid:</b> the slant goes to the <b>middle</b> of a base edge, so the bottom leg is <b>HALF the base</b>, ℓ/2 → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + (ℓ/2)²</span></span></li>
      </ul>
      <p>To find a missing side, rearrange. For the perpendicular height:</p>
      <div class="formula">H = √(h² − r²)   (cone)      H = √(h² − (ℓ/2)²)   (pyramid)</div>
      <div class="eg">e.g. cone r = 5, slant h = 13 → H = √(13² − 5²) = √144 = 12. Pyramid base ℓ = 10, slant h = 13 → ½ℓ = 5, H = √(13² − 5²) = 12.</div>`, `
      <p>Binne-in 'n keël of piramide skuil 'n <b>reghoekige driehoek</b>. Sy drie sye is die loodregte hoogte <b>H</b>, die skuinshoogte <b>h</b>, en 'n onderste sy. Die skuinshoogte is die <b>skuinssy</b> (teenoor die regte hoek), dus is dit die langste sy.</p>
      <ul>
        <li><b>Keël:</b> die onderste sy is die <b>hele radius r</b> → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + r²</span></span></li>
        <li><b>Vierkantige piramide:</b> die skuinshoogte loop na die <b>middel</b> van 'n basisrand, dus is die onderste sy <b>die HELFTE van die basis</b>, ℓ/2 → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + (ℓ/2)²</span></span></li>
      </ul>
      <p>Herrangskik om 'n ontbrekende sy te kry. Vir die loodregte hoogte:</p>
      <div class="formula">H = √(h² − r²)   (keël)      H = √(h² − (ℓ/2)²)   (piramide)</div>
      <div class="eg">bv. keël r = 5, skuins h = 13 → H = √(13² − 5²) = √144 = 12. Piramide basis ℓ = 10, skuins h = 13 → ½ℓ = 5, H = √(13² − 5²) = 12.</div>`),
  },
  scaleFactor: {
    title: L("Scaling a solid (×k)", "Skalering van 'n liggaam (×k)"),
    body: L(`
      <p>Multiply <b>every</b> length by k and:</p>
      <div class="formula">length ×k   ·   area ×k²   ·   volume ×k³</div>
      <p>Area uses two lengths (so k²); volume uses three (so k³).</p>
      <div class="eg">Double all dimensions (k = 2): surface area ×4, volume ×8.</div>`, `
      <p>Vermenigvuldig <b>elke</b> lengte met k, en:</p>
      <div class="formula">lengte ×k   ·   oppervlakte ×k²   ·   volume ×k³</div>
      <p>Oppervlakte gebruik twee lengtes (dus k²); volume gebruik drie (dus k³).</p>
      <div class="eg">Verdubbel al die afmetings (k = 2): buite-oppervlakte ×4, volume ×8.</div>`),
  },

};
