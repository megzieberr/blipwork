/* Concept cards: Measurement (chapter id "meas"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_MEAS = {
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
      <div class="formula">V(cone) = ⅓πr²H   ·   V(pyramid) = ⅓·(base area)·H</div>
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
        <li><b>Cone:</b> the bottom leg is the <b>full radius r</b> → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + r²</span></span></li>
        <li><b>Square pyramid:</b> the slant goes to the <b>middle</b> of a base edge, so the bottom leg is <b>HALF the base</b>, ℓ/2 → <span class="formula" style="display:inline"><span class="nowrap">h² = H² + (ℓ/2)²</span></span></li>
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

};
