/* Concept cards: Finance (chapter id "finance"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */
import { renderTimeline } from "../engine/timeline-graph.js";
import { JUG_PICTURE, BUILD_TIMELINE_EXAMPLE } from "./_finance-pictures.js";
import { L } from "../lang.js";

export const CONCEPTS_FINANCE = {
  /* ---------------- FINANCE ---------------- */
  finFormulas: {
    title: L("Which finance formula?", "Watter finansiële formule?"),
    body: L(`
      <p>Match the situation to the formula. <b>i</b> is the rate as a fraction (÷100), <b>n</b> the number of periods.</p>
      <ul>
        <li><b>Hire purchase</b> → simple interest: <b>A = P(1 + i·n)</b></li>
        <li><b>Inflation, population growth, savings</b> → compound: <b>A = P(1 + i)ⁿ</b></li>
        <li><b>Straight-line depreciation</b> → <b>A = P(1 − i·n)</b></li>
        <li><b>Reducing-balance depreciation</b> → <b>A = P(1 − i)ⁿ</b></li>
      </ul>
      <p><b>P</b> is the starting amount, <b>A</b> the end amount. Turn a % into i by dividing by 100 (8% → 0,08).</p>`, `
      <p>Pas elke situasie by sy formule. <b>i</b> is die koers as 'n breuk (÷100), <b>n</b> die aantal periodes.</p>
      <ul>
        <li><b>Huurkoop</b> → enkelvoudige rente: <b>A = P(1 + i·n)</b></li>
        <li><b>Inflasie, bevolkingsgroei, spaargeld</b> → saamgesteld: <b>A = P(1 + i)ⁿ</b></li>
        <li><b>Reguitlyn-waardevermindering</b> → <b>A = P(1 − i·n)</b></li>
        <li><b>Verminderde-saldo-waardevermindering</b> → <b>A = P(1 − i)ⁿ</b></li>
      </ul>
      <p><b>P</b> is die beginbedrag, <b>A</b> die eindbedrag. Deel 'n % deur 100 om i te kry (8% → 0,08).</p>`),
  },
  simpleCompound: {
    title: L("Simple vs compound interest", "Enkelvoudige vs saamgestelde rente"),
    body: L(`
      <p><b>Simple interest</b> is worked out on the <b>original P only</b>, so the same amount is added each period.</p>
      <div class="formula">A = P(1 + i·n)</div>
      <p><b>Compound interest</b> is worked out on the <b>growing balance</b>, so each period earns a little more than the last.</p>
      <div class="formula">A = P(1 + i)ⁿ</div>
      <div class="eg">Over time compound always pulls ahead of simple, because it earns "interest on interest".</div>`, `
      <p><b>Enkelvoudige rente</b> word op die <b>oorspronklike P alleen</b> bereken, so dieselfde bedrag word elke periode bygetel.</p>
      <div class="formula">A = P(1 + i·n)</div>
      <p><b>Saamgestelde rente</b> word op die <b>groeiende saldo</b> bereken, so elke periode verdien 'n bietjie meer as die vorige een.</p>
      <div class="formula">A = P(1 + i)ⁿ</div>
      <div class="eg">Mettertyd trek saamgesteld altyd weg van enkelvoudig, want dit verdien "rente op rente".</div>`),
  },
  depreciation: {
    title: L("Depreciation: the two methods", "Waardevermindering: die twee metodes"),
    body: L(`
      <p>Depreciation is when something <b>loses</b> value over time.</p>
      <ul>
        <li><b>Linear (straight-line):</b> <b>A = P(1 − i·n)</b>. Loses the <b>same rand amount</b> each year — its graph is a <b>straight line</b> sloping down.</li>
        <li><b>Reducing-balance:</b> <b>A = P(1 − i)ⁿ</b>. Loses a fixed <b>percentage of its current</b> value each year — its graph is a <b>curve</b> that drops steeply then flattens.</li>
      </ul>`, `
      <p>Waardevermindering is wanneer iets mettertyd waarde <b>verloor</b>.</p>
      <ul>
        <li><b>Lineêr (reguitlyn):</b> <b>A = P(1 − i·n)</b>. Verloor elke jaar <b>dieselfde randbedrag</b>: sy grafiek is 'n <b>reguit lyn</b> wat afwaarts loop.</li>
        <li><b>Verminderde saldo:</b> <b>A = P(1 − i)ⁿ</b>. Verloor elke jaar 'n vaste <b>persentasie van sy huidige</b> waarde: sy grafiek is 'n <b>kurwe</b> wat eers steil daal en dan platter word.</li>
      </ul>`),
  },
  compounding: {
    title: L("Different compounding periods", "Verskillende samestellingsperiodes"),
    body: L(`
      <p>If interest is added more than once a year, split the year up:</p>
      <ul>
        <li><b>rate per period</b> = annual rate ÷ (times per year)</li>
        <li><b>exponent</b> = years × (times per year)</li>
      </ul>
      <div class="formula">A = P(1 + i/k)<sup>n·k</sup></div>
      <p>Times per year k: annually 1 · half‑yearly 2 · quarterly 4 · monthly 12 · weekly 52 · daily 365.</p>
      <div class="eg">12% p.a. compounded quarterly for 5 years → i/k = 0,12/4 = 0,03 and exponent n·k = 5×4 = 20.</div>`, `
      <p>As rente meer as een keer per jaar bygetel word, verdeel die jaar:</p>
      <ul>
        <li><b>koers per periode</b> = jaarlikse koers ÷ (keer per jaar)</li>
        <li><b>eksponent</b> = jare × (keer per jaar)</li>
      </ul>
      <div class="formula">A = P(1 + i/k)<sup>n·k</sup></div>
      <p>Keer per jaar k: jaarliks 1 · halfjaarliks 2 · kwartaalliks 4 · maandeliks 12 · weekliks 52 · daagliks 365.</p>
      <div class="eg">12% p.j. kwartaalliks saamgestel vir 5 jaar → i/k = 0,12/4 = 0,03 en eksponent n·k = 5×4 = 20.</div>`),
  },
  timelineMove: {
    title: L("Moving money along a timeline", "Skuif geld langs 'n tydlyn"),
    body: L(`
      <p>Money has a different value at different times. To re-value an amount, slide it along the timeline:</p>
      <ul>
        <li><b>Forward</b> (to a later date) → <b>multiply</b> by (1 + i) once per period → a <b>positive</b> exponent.</li>
        <li><b>Backward</b> (to an earlier date) → <b>divide</b> by (1 + i) once per period → a <b>negative</b> exponent.</li>
      </ul>
      <div class="formula">value = amount × (1 + i)<sup>±periods</sup></div>
      <p>Count the periods between the two <span class="nowrap">T‑points</span>. Forward T2 → T5 is 3 periods (+3); backward T5 → T2 is 3 periods (−3).</p>`, `
      <p>Geld het 'n ander waarde op verskillende tye. Om 'n bedrag te herwaardeer, skuif dit langs die tydlyn:</p>
      <ul>
        <li><b>Vorentoe</b> (na 'n latere datum) → <b>vermenigvuldig</b> met (1 + i) een keer per periode → 'n <b>positiewe</b> eksponent.</li>
        <li><b>Terug</b> (na 'n vroeëre datum) → <b>deel</b> deur (1 + i) een keer per periode → 'n <b>negatiewe</b> eksponent.</li>
      </ul>
      <div class="formula">waarde = bedrag × (1 + i)<sup>±periodes</sup></div>
      <p>Tel die periodes tussen die twee <span class="nowrap">T‑punte</span>. Vorentoe T2 → T5 is 3 periodes (+3); terug T5 → T2 is 3 periodes (−3).</p>`),
  },
  timelineCount: {
    title: L("Counting periods on a timeline", "Tel periodes op 'n tydlyn"),
    body: L(`
      <p>The number of periods is just how many <b>gaps</b> you jump between the two <span class="nowrap">T‑points</span> — count the spaces, not the dots.</p>
      <ul>
        <li>T0 → T4 is <b>4</b> periods.</li>
        <li>T5 → T2 is <b>3</b> periods (going back).</li>
      </ul>
      <p>The <b>direction</b> tells you × or ÷: <span class="nowrap">later = ×</span>, <span class="nowrap">earlier = ÷</span>.</p>`, `
      <p>Die aantal periodes is net hoeveel <b>gapings</b> jy tussen die twee <span class="nowrap">T‑punte</span> spring: tel die spasies, nie die kolletjies nie.</p>
      <ul>
        <li>T0 → T4 is <b>4</b> periodes.</li>
        <li>T5 → T2 is <b>3</b> periodes (terugwaarts).</li>
      </ul>
      <p>Die <b>rigting</b> sê vir jou × of ÷: <span class="nowrap">later = ×</span>, <span class="nowrap">vroeër = ÷</span>.</p>`),
  },
  rateChange: {
    title: L("When the interest rate changes", "Wanneer die rentekoers verander"),
    body: L(`
      <p>If the rate or compounding frequency changes part-way, split the timeline into segments. For a single amount, use <b>one bracket per segment</b>:</p>
      <div class="formula">A = P(1 + i₁/k₁)<sup>n₁·k₁</sup> (1 + i₂/k₂)<sup>n₂·k₂</sup></div>
      <p>Work out each segment's rate-per-period and number-of-periods separately, then multiply the brackets together.</p>`, `
      <p>As die koers of die samestellingsfrekwensie onderweg verander, verdeel die tydlyn in segmente. Vir 'n enkele bedrag gebruik jy <b>een hakie per segment</b>:</p>
      <div class="formula">A = P(1 + i₁/k₁)<sup>n₁·k₁</sup> (1 + i₂/k₂)<sup>n₂·k₂</sup></div>
      <p>Bereken elke segment se koers per periode en aantal periodes apart, en vermenigvuldig dan die hakies met mekaar.</p>`),
  },
  deposits: {
    title: L("Deposits & hire purchase", "Deposito's & huurkoop"),
    body: L(`
      <p>A <b>deposit</b> is paid upfront and earns no interest.</p>
      <div class="formula">deposit = (% ÷ 100) × price</div>
      <p>The amount still owed (the new P that interest is charged on) is the rest of the price:</p>
      <div class="formula">amount owed = ((100 − %) ÷ 100) × price</div>
      <div class="eg">15% deposit on R8 000 → deposit = R1 200, still owed = R6 800.</div>`, `
      <p>'n <b>Deposito</b> word vooraf betaal en verdien geen rente nie.</p>
      <div class="formula">deposito = (% ÷ 100) × prys</div>
      <p>Die bedrag wat jy nog skuld (die nuwe P waarop rente gehef word) is die res van die prys:</p>
      <div class="formula">uitstaande bedrag = ((100 − %) ÷ 100) × prys</div>
      <div class="eg">15% deposito op R8 000 → deposito = R1 200, nog uitstaande = R6 800.</div>`),
  },
  effNom: {
    title: L("Effective vs nominal rates", "Effektiewe vs nominale rentekoerse"),
    body: L(`
      <p>Both are <b>compound</b> interest, just quoted differently.</p>
      <ul>
        <li><b>Effective</b> rate is always an <b>annual</b> rate (the true yearly growth).</li>
        <li><b>Nominal</b> rate is quoted with a <b>compounding frequency</b> (monthly, quarterly, …).</li>
      </ul>
      <div class="formula">1 + i<sub>eff</sub> = (1 + <span class="sfrac"><span class="sf-n">i<sub>nom</sub></span><span class="sf-d">n</span></span>)ⁿ</div>
      <p>Here n is the number of compounding periods <b>per year</b> (12 for monthly).</p>`, `
      <p>Albei is <b>saamgestelde</b> rente, net anders aangegee.</p>
      <ul>
        <li>'n <b>Effektiewe</b> koers is altyd 'n <b>jaarlikse</b> koers (die ware jaarlikse groei).</li>
        <li>'n <b>Nominale</b> koers word met 'n <b>samestellingsfrekwensie</b> aangegee (maandeliks, kwartaalliks, …).</li>
      </ul>
      <div class="formula">1 + i<sub>eff</sub> = (1 + <span class="sfrac"><span class="sf-n">i<sub>nom</sub></span><span class="sf-d">n</span></span>)ⁿ</div>
      <p>Hier is n die aantal samestellingsperiodes <b>per jaar</b> (12 vir maandeliks).</p>`),
  },
  /* f8 "Which one is the total?" (the jug round, 2026-10-11; the 10 Oct
     tap-the-label card is in briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md).
     The approved mock-up's text (her "absolutely perfect", 11 Oct 12:02),
     the two jugs side by side (JUG_PICTURE above) with their captions as
     drawn. "I'm lost" (and the 📖 library) opens it; the round itself opens
     on the one-jug discovery slide instead (jugDiscover above, 11 Oct
     16:56). The textbook's word is PHASED OUT, not dropped cold (her note,
     11 Oct 16:54): this card and the slide's first frame are the only two
     places that say it, once in brackets and once to say it is the total
     and from now on just "the total". Never anywhere else in f8. */
  theTotal: {
    title: L("Payments are coins. The total is the jug.", "Paaiemente is munte. Die totaal is die beker."),
    body: L(`
      <p>Every payment is <b class="jug-hl">one coin</b> going in or out on its day. The total (the lumpsum) is the <b class="jug-hl">one jug</b> all the coins are worth together. A coin is never the jug. Your textbook says “lump sum”. That is the total we are talking about. From now on we just call it the total.</p>
      ${JUG_PICTURE}
      <p class="jug-after">Interest makes the jug grow (or the debt grow). A withdrawal takes a coin out. The jug can end up smaller than a coin: it is still the jug.</p>`, `
      <p>Elke paaiement is <b class="jug-hl">een munt</b> wat op sy dag in- of uitgaan. Die totaal (die enkelbedrag) is die <b class="jug-hl">een beker</b> wat al die munte saam werd is. 'n Munt is nooit die beker nie. Jou handboek sê “enkelbedrag”. Dit is die totaal waarvan ons praat. Van nou af noem ons dit net die totaal.</p>
      ${JUG_PICTURE}
      <p class="jug-after">Rente laat die beker groei (of die skuld groei). 'n Onttrekking haal 'n munt uit. Die beker kan kleiner as 'n munt eindig: dit is steeds die beker.</p>`),
  },
  /* f9 "Car or no car?" (2026-10-10). This round says only "the total". */
  carOrNoCar: {
    title: L("Car or no car?", "Kar of geen kar?"),
    body: L(`
      <p>Every amount on a timeline is moved to <b>one</b> T, the <b>meeting day</b> (the flag on the line).</p>
      <p>A <b>car</b> is the bracket <b>(1 + i)<sup>n</sup></b> that moves an amount to the meeting day.</p>
      <ul>
        <li><b>Forward gear</b>: the meeting day is later, so <b>multiply (×)</b>: a positive exponent.</li>
        <li><b>Reverse gear</b>: the meeting day is earlier, so <b>divide (÷)</b>: a negative exponent.</li>
        <li>An amount <b>already standing on the meeting day</b> needs <b>no car</b>.</li>
        <li>Each <b>road</b> is one rate, in one colour. Where the road changes colour, the rate changes: an amount that crosses it needs <b>one car per road</b>.</li>
      </ul>
      <div class="formula">exponent = ± years × k</div>
      <p>k is how many times a year the interest is added: <span class="nowrap">annually 1 ·</span> <span class="nowrap">half‑yearly 2 ·</span> <span class="nowrap">quarterly 4 ·</span> <span class="nowrap">monthly 12</span>.</p>
      <div class="eg"><span class="nowrap">8% p.a.</span> compounded quarterly until T4, then <span class="nowrap">10% p.a.</span> compounded monthly. <span class="nowrap">R5 000</span> at T2, meeting day T6: two cars, both forward: <span class="nowrap">5 000(1 + 0,08/4)<sup>2×4</sup></span> <span class="nowrap">(1 + 0,1/12)<sup>2×12</sup></span>.</div>
      <div class="eg">Her last deposit, <span class="nowrap">R2 000</span>, is paid in on the same day as A, and the meeting day is that day: no car, it is just <span class="nowrap">2 000</span>.</div>
      <p>A car only if it has to move. Already there? No car.</p>`, `
      <p>Elke bedrag op 'n tydlyn word na <b>een</b> T geskuif, die <b>ontmoetingsdag</b> (die vlag op die lyn).</p>
      <p>'n <b>Kar</b> is die hakie <b>(1 + i)<sup>n</sup></b> wat 'n bedrag na die ontmoetingsdag skuif.</p>
      <ul>
        <li><b>Vorentoe</b>: die ontmoetingsdag is later, so <b>vermenigvuldig (×)</b>: 'n positiewe eksponent.</li>
        <li><b>Trurat</b>: die ontmoetingsdag is vroeër, so <b>deel (÷)</b>: 'n negatiewe eksponent.</li>
        <li>'n Bedrag wat <b>reeds op die ontmoetingsdag staan</b>, het <b>geen kar</b> nodig nie.</li>
        <li>Elke <b>pad</b> is een koers, in een kleur. Waar die pad van kleur verander, verander die koers: 'n bedrag wat daar oorsteek, het <b>een kar per pad</b> nodig.</li>
      </ul>
      <div class="formula">eksponent = ± jare × k</div>
      <p>k is hoeveel keer per jaar die rente bygetel word: <span class="nowrap">jaarliks 1 ·</span> <span class="nowrap">halfjaarliks 2 ·</span> <span class="nowrap">kwartaalliks 4 ·</span> <span class="nowrap">maandeliks 12</span>.</p>
      <div class="eg"><span class="nowrap">8% p.j.</span> kwartaalliks saamgestel tot T4, dan <span class="nowrap">10% p.j.</span> maandeliks saamgestel. <span class="nowrap">R5 000</span> by T2, ontmoetingsdag T6: twee karre, albei vorentoe: <span class="nowrap">5 000(1 + 0,08/4)<sup>2×4</sup></span> <span class="nowrap">(1 + 0,1/12)<sup>2×12</sup></span>.</div>
      <div class="eg">Haar laaste deposito, <span class="nowrap">R2 000</span>, word op dieselfde dag as A inbetaal, en die ontmoetingsdag is daardie dag: geen kar nie, dit is net <span class="nowrap">2 000</span>.</div>
      <p>'n Kar net as dit moet skuif. Reeds daar? Geen kar nie.</p>`),
  },
  /* f10 "In or out?" (2026-10-10; the TAUGHT form only since 2026-10-11, her
     play-test ruling: the total alone on the left, the payments on the right;
     the one-sided form of the 10 Oct build is parked for 2027 in
     briefs/finance-2/ARCHIVE-f10-jug-form-2027.md). "the total" only. Money
     amounts and "p.a." carry a LITERAL U+00A0 (the entity would be escaped
     and shown as raw text). A single-letter left side rides with the first
     term inside one unit ("A = 14 000(…)"), so "=" never stands alone at a
     line end or start; in prose an operator glues to the word after it.
     No picture for now (f8's jug picture may come back here as a reminder). */
  inOrOut: {
    title: L("In or out?", "In of uit?"),
    body: L(`
      <p>Every amount on the timeline drives to the <b>meeting day</b> in its car (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day). The meeting day is the total's own day, so <b>the total stands alone on the left</b>, with no car. Every other amount goes on the <b>right</b>, with its sign.</p>
      <ul>
        <li><b>Saving:</b> the total is A, at the end. A <b>deposit</b> goes <b>IN</b>: <b>+</b> on the right. A <b>withdrawal</b> comes <b>OUT</b>: <b>−</b> on the right. On a timeline a withdrawal is drawn <span class="nowrap">−R2 000</span>.</li>
        <li><b>A loan:</b> the loan goes in too, but it is the total, P, at T0: it stands alone on the left. Every <b>repayment</b> goes <b>+</b> on the right, driving back to T0 in reverse gear.</li>
        <li>A <b>down payment</b> never enters the account: it is paid straight to the seller, so it has no place in the equation. It comes off the price: <span class="nowrap">loan = price − down payment</span>.</li>
      </ul>
      <div class="eg">Saving with a withdrawal: <span class="nowrap">R14 000</span> in at T0, <span class="nowrap">R2 000</span> out at T3, <span class="nowrap">8% p.a.</span> compounded quarterly, A at T5, the meeting day: <span class="nowrap">A = 14 000(1 + 0,08/4)<sup>20</sup></span> − <span class="nowrap">2 000(1 + 0,08/4)<sup>8</sup></span></div>
      <div class="eg">A loan paid back with <span class="nowrap">R8 000</span> at T1 and <span class="nowrap">R9 000</span> at T3, <span class="nowrap">12% p.a.</span> compounded monthly, meeting day T0: <span class="nowrap">P = 8 000(1 + 0,12/12)<sup>−12</sup></span> + <span class="nowrap">9 000(1 + 0,12/12)<sup>−36</sup></span></div>
      <p>Interest on a loan = paid back − borrowed.</p>
      <p>Saving: deposits plus, withdrawals minus, A alone on the left. A loan: repayments plus on the right, P alone on the left.</p>`, `
      <p>Elke bedrag op die tydlyn ry in sy kar na die <b>ontmoetingsdag</b> ('n kar is die hakie <span class="nowrap">(1 + i)<sup>n</sup></span> wat 'n bedrag na die ontmoetingsdag skuif). Die ontmoetingsdag is die totaal se eie dag, so <b>die totaal staan alleen links</b>, sonder 'n kar. Elke ander bedrag gaan <b>regs</b>, met sy teken.</p>
      <ul>
        <li><b>Spaar:</b> die totaal is A, aan die einde. 'n <b>Deposito</b> gaan <b>IN</b>: <b>+</b> regs. 'n <b>Onttrekking</b> kom <b>UIT</b>: <b>−</b> regs. Op 'n tydlyn word 'n onttrekking as <span class="nowrap">−R2 000</span> geteken.</li>
        <li><b>'n Lening:</b> die lening gaan ook in, maar dit is die totaal, P, by T0: dit staan alleen links. Elke <b>terugbetaling</b> gaan <b>+</b> regs, en ry in trurat terug na T0.</li>
        <li>'n <b>Aanbetaling</b> kom nooit in die rekening nie: dit word reguit aan die verkoper betaal, so dit het geen plek in die vergelyking nie. Dit kom van die prys af: <span class="nowrap">lening = prys − aanbetaling</span>.</li>
      </ul>
      <div class="eg">Spaar met 'n onttrekking: <span class="nowrap">R14 000</span> in by T0, <span class="nowrap">R2 000</span> uit by T3, <span class="nowrap">8% p.j.</span> kwartaalliks saamgestel, A by T5, die ontmoetingsdag: <span class="nowrap">A = 14 000(1 + 0,08/4)<sup>20</sup></span> − <span class="nowrap">2 000(1 + 0,08/4)<sup>8</sup></span></div>
      <div class="eg">'n Lening terugbetaal met <span class="nowrap">R8 000</span> by T1 en <span class="nowrap">R9 000</span> by T3, <span class="nowrap">12% p.j.</span> maandeliks saamgestel, ontmoetingsdag T0: <span class="nowrap">P = 8 000(1 + 0,12/12)<sup>−12</sup></span> + <span class="nowrap">9 000(1 + 0,12/12)<sup>−36</sup></span></div>
      <p>Rente op 'n lening = terugbetaal − geleen.</p>
      <p>Spaar: deposito's plus, onttrekkings minus, A alleen links. 'n Lening: terugbetalings plus regs, P alleen links.</p>`),
  },

  /* f12 "Build the timeline" (2026-10-11, her design 11:39, her order 11:47).
     Words, then the timeline, then the equation: her five taps as a short
     checklist in her order, one line each, then one worked example in words
     and the timeline it builds (BUILD_TIMELINE_EXAMPLE above, f13's own
     drawing of that scene). The jug and coin words are f8's card's. Money,
     "p.a." and "N years" carry a LITERAL U+00A0 inside their .nowrap unit. */
  buildTimeline: {
    title: L("Build the timeline", "Bou die tydlyn"),
    body: L(`
      <p>The exam hands you words. Build the whole timeline from them, tap by tap, before any equation. Every payment is <b class="jug-hl">one coin</b> on its day; the total is the <b class="jug-hl">one jug</b>.</p>
      <ul>
        <li><b>Tap 1: how far does it go?</b> The last day the words name is the last T: “after <span class="nowrap">7 years</span>” is T7.</li>
        <li><b>Tap 2: where does the rate change?</b> “for the first <span class="nowrap">3 years</span>” is T3. One rate all the way: no change.</li>
        <li><b>Tap 3: which rate on which road?</b> The first rate from T0 to the change, the new rate after it, each road in its own colour.</li>
        <li><b>Tap 4: where does the jug go?</b> Savings: at the end, A. A loan: at T0, P.</li>
        <li><b>Tap 5: where does each coin go?</b> “now” is T0, “after <span class="nowrap">5 years</span>” is T5; a coin going out is drawn <span class="nowrap">−R2 000</span>.</li>
      </ul>
      <p>A down payment never enters the account: it goes straight to the shop, so it has no place on the timeline.</p>
      <div class="eg">Brenda opens a savings account. She deposits <span class="nowrap">R5 500</span> now and <span class="nowrap">R4 000</span> after <span class="nowrap">5 years</span>. The interest rate is <span class="nowrap">14% p.a.</span> compounded half‑yearly for the first <span class="nowrap">3 years</span>, then <span class="nowrap">12% p.a.</span> compounded monthly. How much is in the account after <span class="nowrap">7 years</span>?</div>
      <p>The five taps: T7; T3; <span class="nowrap">14% p.a.</span>, then <span class="nowrap">12% p.a.</span>; the jug, A, at T7; <span class="nowrap">R5 500</span> at T0 and <span class="nowrap">R4 000</span> at T5.</p>
      <div class="q-graph">${renderTimeline(BUILD_TIMELINE_EXAMPLE)}<div class="cap">T in years</div></div>
      <p>Words first. Then the timeline. Then the one equation.</p>`, `
      <p>Die eksamen gee jou woorde. Bou die hele tydlyn daaruit, klik vir klik, voor enige vergelyking. Elke paaiement is <b class="jug-hl">een munt</b> op sy dag; die totaal is die <b class="jug-hl">een beker</b>.</p>
      <ul>
        <li><b>Klik 1: hoe ver strek dit?</b> Die laaste dag wat die woorde noem, is die laaste T: “na <span class="nowrap">7 jaar</span>” is T7.</li>
        <li><b>Klik 2: waar verander die koers?</b> “vir die eerste <span class="nowrap">3 jaar</span>” is T3. Een koers heelpad: geen verandering nie.</li>
        <li><b>Klik 3: watter koers op watter pad?</b> Die eerste koers van T0 tot by die verandering, die nuwe koers daarna, elke pad in sy eie kleur.</li>
        <li><b>Klik 4: waar kom die beker?</b> Spaargeld: aan die einde, A. 'n Lening: by T0, P.</li>
        <li><b>Klik 5: waar kom elke munt?</b> “nou” is T0, “na <span class="nowrap">5 jaar</span>” is T5; 'n munt wat uitgaan, word as <span class="nowrap">−R2 000</span> geteken.</li>
      </ul>
      <p>'n Aanbetaling kom nooit in die rekening nie: dit gaan reguit na die winkel, so dit het geen plek op die tydlyn nie.</p>
      <div class="eg">Brenda maak 'n spaarrekening oop. Sy deponeer <span class="nowrap">R5 500</span> nou en <span class="nowrap">R4 000</span> na <span class="nowrap">5 jaar</span>. Die rentekoers is <span class="nowrap">14% p.j.</span> halfjaarliks saamgestel vir die eerste <span class="nowrap">3 jaar</span>, dan <span class="nowrap">12% p.j.</span> maandeliks saamgestel. Hoeveel is na <span class="nowrap">7 jaar</span> in die rekening?</div>
      <p>Die vyf klikke: T7; T3; <span class="nowrap">14% p.j.</span>, dan <span class="nowrap">12% p.j.</span>; die beker, A, by T7; <span class="nowrap">R5 500</span> by T0 en <span class="nowrap">R4 000</span> by T5.</p>
      <div class="q-graph">${renderTimeline(BUILD_TIMELINE_EXAMPLE)}<div class="cap">T in jare</div></div>
      <p>Eers die woorde. Dan die tydlyn. Dan die een vergelyking.</p>`),
  },

  /* f13 "Build the one equation" (2026-10-10; was f12 until 2026-10-11). The exam shape, her method:
     one meeting day, the total alone on the left, every other amount in its
     car, ONE line typed once and rounded once. "the total" only. Money
     amounts and "p.a." carry a LITERAL U+00A0 (f10 review 1: not the thin
     U+202F, never an entity); the "=" glues to the term before it, and in
     prose an operator glues to the word after it. f12 review 1: the
     equations wear .f13-eq (a size smaller), a two-car term is ONE unit,
     a single-letter left side rides with the first term ("A = 5 500(…)"),
     and a number and its unit are one unit ("14% p.a.", "3 years"). */
  oneEquation: {
    title: L("Build the one equation", "Bou die een vergelyking"),
    body: L(`
      <ul>
        <li><b>Step 1: pick the meeting day.</b> Saving: the day of A, at the end. A loan: T0, the day of the loan.</li>
        <li><b>Step 2: give every amount its car</b> (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day). Forward gear to a later day: a positive exponent. Reverse gear to an earlier day: a negative exponent. One car per road. An amount already standing on the meeting day gets <b>no car</b>.</li>
        <li><b>Step 3: write it all in ONE line.</b> The total alone on the left (A for saving, the loan P for a loan). The payments on the right: a deposit or a repayment plus, a withdrawal minus.</li>
        <li><b>Step 4: type it once, round once.</b> Never solve it in stages and never round along the way: the answer to <span class="nowrap">2 decimal places</span>, at the end.</li>
      </ul>
      <div class="eg">Saving: <span class="nowrap">R5 500</span> now and <span class="nowrap">R4 000</span> at T5; <span class="nowrap">14% p.a.</span> compounded half‑yearly for <span class="nowrap">3 years</span>, then <span class="nowrap">12% p.a.</span> compounded monthly; meeting day T7: <span class="f13-eq"><span class="nowrap">A = 5 500(1 + 0,14/2)<sup>6</sup> (1 + 0,12/12)<sup>48</sup></span> + <span class="nowrap">4 000(1 + 0,12/12)<sup>24</sup></span></span>, so <span class="nowrap">A = R18 386,28</span>.</div>
      <div class="eg">A loan paid off with <span class="nowrap">R5 000</span> at T4 and <span class="nowrap">R6 000</span> at T6; <span class="nowrap">16% p.a.</span> compounded quarterly for <span class="nowrap">4 years</span>, then <span class="nowrap">14% p.a.</span> compounded half‑yearly; meeting day T0: <span class="f13-eq"><span class="nowrap">P = 5 000(1 + 0,16/4)<sup>−16</sup></span> + <span class="nowrap">6 000(1 + 0,14/2)<sup>−4</sup> (1 + 0,16/4)<sup>−16</sup></span></span>, so <span class="nowrap">P = R5 113,44</span>.</div>
      <p>The total is known and a payment is the unknown (a deposit P now, or x in the middle)? Write the same one line, the known total alone on the left, and let <b>SHIFT SOLVE</b> find the unknown.</p>
      <p>A down payment never enters the loan: it comes off the price. <span class="nowrap">Price = loan + down payment</span>.</p>
      <p>Build the whole equation first. Type it once. Round once, at the end.</p>`, `
      <ul>
        <li><b>Stap 1: kies die ontmoetingsdag.</b> Spaar: die dag van A, aan die einde. 'n Lening: T0, die dag van die lening.</li>
        <li><b>Stap 2: gee elke bedrag sy kar</b> ('n kar is die hakie <span class="nowrap">(1 + i)<sup>n</sup></span> wat 'n bedrag na die ontmoetingsdag skuif). Vorentoe na 'n latere dag: 'n positiewe eksponent. Trurat na 'n vroeëre dag: 'n negatiewe eksponent. Een kar per pad. 'n Bedrag wat reeds op die ontmoetingsdag staan, kry <b>geen kar</b> nie.</li>
        <li><b>Stap 3: skryf alles in EEN reël.</b> Die totaal alleen links (A vir spaar, die lening P vir 'n lening). Die paaiemente regs: 'n deposito of 'n terugbetaling plus, 'n onttrekking minus.</li>
        <li><b>Stap 4: tik dit een keer in, rond een keer af.</b> Los dit nooit in stappe op nie en rond nooit tussenin af nie: die antwoord tot <span class="nowrap">2 desimale plekke</span>, aan die einde.</li>
      </ul>
      <div class="eg">Spaar: <span class="nowrap">R5 500</span> nou en <span class="nowrap">R4 000</span> by T5; <span class="nowrap">14% p.j.</span> halfjaarliks saamgestel vir <span class="nowrap">3 jaar</span>, dan <span class="nowrap">12% p.j.</span> maandeliks saamgestel; ontmoetingsdag T7: <span class="f13-eq"><span class="nowrap">A = 5 500(1 + 0,14/2)<sup>6</sup> (1 + 0,12/12)<sup>48</sup></span> + <span class="nowrap">4 000(1 + 0,12/12)<sup>24</sup></span></span>, so <span class="nowrap">A = R18 386,28</span>.</div>
      <div class="eg">'n Lening afbetaal met <span class="nowrap">R5 000</span> by T4 en <span class="nowrap">R6 000</span> by T6; <span class="nowrap">16% p.j.</span> kwartaalliks saamgestel vir <span class="nowrap">4 jaar</span>, dan <span class="nowrap">14% p.j.</span> halfjaarliks saamgestel; ontmoetingsdag T0: <span class="f13-eq"><span class="nowrap">P = 5 000(1 + 0,16/4)<sup>−16</sup></span> + <span class="nowrap">6 000(1 + 0,14/2)<sup>−4</sup> (1 + 0,16/4)<sup>−16</sup></span></span>, so <span class="nowrap">P = R5 113,44</span>.</div>
      <p>Is die totaal bekend en 'n paaiement die onbekende ('n deposito P nou, of x in die middel)? Skryf dieselfde een reël, die bekende totaal alleen links, en laat <b>SHIFT SOLVE</b> die onbekende vind.</p>
      <p>'n Aanbetaling kom nooit in die lening nie: dit kom van die prys af. <span class="nowrap">Prys = lening + aanbetaling</span>.</p>
      <p>Bou eers die hele vergelyking. Tik dit een keer in. Rond een keer af, aan die einde.</p>`),
  },

  /* f11 "Pick the meeting day" (2026-10-10). The shortcut round: count the
     cars for a day (the total too), the two rules of thumb, and the answer
     is the same anywhere. "the total" only. Money amounts, "p.a." and "N cars"
     carry a LITERAL U+00A0 inside their .nowrap unit (f10 review 1: not the
     thin U+202F, never an entity); a sum is one unit with its "=" inside. */
  meetingDay: {
    title: L("Pick the meeting day", "Kies die ontmoetingsdag"),
    body: L(`
      <p>Any T can be the <b>meeting day</b>. Every amount drives there in its <b>car</b> (a car is the <span class="nowrap">(1 + i)<sup>n</sup></span> bracket that moves an amount to the meeting day), <b>the total too</b> when it is not already there. Count the cars for a day:</p>
      <ul>
        <li>An amount <b>already standing</b> on the meeting day: <b>no car</b>.</li>
        <li>An amount that stays on <b>one colour</b> of road: <b><span class="nowrap">1 car</span></b>.</li>
        <li>An amount that <b>crosses the colour change</b>: <b><span class="nowrap">2 cars</span></b>, one per road.</li>
      </ul>
      <p><b>Two rules of thumb</b> for the day with the fewest cars:</p>
      <ul>
        <li><b>Meet where someone already stands.</b> That amount needs no car.</li>
        <li><b>Meet where the road changes colour.</b> Then nobody crosses the change, so nobody needs two cars.</li>
      </ul>
      <div class="eg">Saving: <span class="nowrap">R5 000 at T1</span>, <span class="nowrap">R3 000 at T3</span>, <span class="nowrap">A at T6</span>; <span class="nowrap">8% p.a.</span> until T3, then <span class="nowrap">10% p.a.</span>, so the road changes colour at T3. Meet at T6: the <span class="nowrap">R5 000</span> crosses the change (<span class="nowrap">2 cars</span>), the <span class="nowrap">R3 000</span> needs <span class="nowrap">1 car</span>, A is already there: <span class="nowrap">2 + 1 + 0 = 3 cars</span>. Meet at T3: <span class="nowrap">1 + 0 + 1 = 2 cars</span>. T3 does both: an amount stands there, and the road changes colour there.</div>
      <p>The answer is the same wherever you meet; picking the day is only about typing less.</p>`, `
      <p>Enige T kan die <b>ontmoetingsdag</b> wees. Elke bedrag ry daarheen in sy <b>kar</b> ('n kar is die hakie <span class="nowrap">(1 + i)<sup>n</sup></span> wat 'n bedrag na die ontmoetingsdag skuif), <b>die totaal ook</b> as dit nie reeds daar is nie. Tel die karre vir 'n dag:</p>
      <ul>
        <li>'n Bedrag <b>wat reeds op die ontmoetingsdag staan</b>: <b>geen kar</b>.</li>
        <li>'n Bedrag wat op <b>een kleur</b> pad bly: <b><span class="nowrap">1 kar</span></b>.</li>
        <li>'n Bedrag wat <b>oor die kleurverandering gaan</b>: <b><span class="nowrap">2 karre</span></b>, een per pad.</li>
      </ul>
      <p><b>Twee duimreëls</b> vir die dag met die minste karre:</p>
      <ul>
        <li><b>Ontmoet waar iemand reeds staan.</b> Daardie bedrag het geen kar nodig nie.</li>
        <li><b>Ontmoet waar die pad van kleur verander.</b> Dan gaan niemand oor die verandering nie, so niemand het twee karre nodig nie.</li>
      </ul>
      <div class="eg">Spaar: <span class="nowrap">R5 000 by T1</span>, <span class="nowrap">R3 000 by T3</span>, <span class="nowrap">A by T6</span>; <span class="nowrap">8% p.j.</span> tot T3, dan <span class="nowrap">10% p.j.</span>, so die pad verander van kleur by T3. Ontmoet by T6: die <span class="nowrap">R5 000</span> gaan oor die verandering (<span class="nowrap">2 karre</span>), die <span class="nowrap">R3 000</span> het <span class="nowrap">1 kar</span> nodig, A is reeds daar: <span class="nowrap">2 + 1 + 0 = 3 karre</span>. Ontmoet by T3: <span class="nowrap">1 + 0 + 1 = 2 karre</span>. T3 doen albei: 'n bedrag staan daar, en die pad verander daar van kleur.</div>
      <p>Die antwoord is dieselfde waar jy ook al ontmoet; om die dag te kies gaan net oor minder intik.</p>`),
  },

};
