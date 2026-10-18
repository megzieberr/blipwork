/* Concept cards: Probability (chapter id "prob"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

import { L } from "../lang.js";
export const CONCEPTS_PROB = {
  /* ---------- Probability ---------- */
  probBasics: {
    title: L("Theoretical probability", "Teoretiese waarskynlikheid"),
    body: L(`
      <p>The <b>sample space</b> S is the set of <b>all</b> possible outcomes. <b>n(S)</b> is how many there are.</p>
      <p>An <b>event</b> E is the outcomes you care about. The theoretical probability is worked out <i>before</i> any experiment:</p>
      <div class="formula">P(E) = n(E) / n(S)</div>
      <p>It always sits between <b>0</b> (impossible) and <b>1</b> (certain), and can be written as a fraction, a decimal or a percentage.</p>
      <div class="eg">e.g. one die, "an odd number": E = {1; 3; 5} so n(E) = 3, n(S) = 6 → P = 3/6 = 1/2 = 0,5 = 50%.</div>`, `
      <p>Die <b>uitkomsruimte</b> S is die versameling van <b>al</b> die moontlike uitkomste. <b>n(S)</b> is hoeveel daar is.</p>
      <p>'n <b>Gebeurtenis</b> E is die uitkomste waaroor dit gaan. Die teoretiese waarskynlikheid word <i>voor</i> enige eksperiment bereken:</p>
      <div class="formula">P(E) = n(E) / n(S)</div>
      <p>Dit lê altyd tussen <b>0</b> (onmoontlik) en <b>1</b> (seker), en kan as 'n breuk, 'n desimale getal of 'n persentasie geskryf word.</p>
      <div class="eg">bv. een dobbelsteen, "'n onewe getal": E = {1; 3; 5} dus n(E) = 3, n(S) = 6 → P = 3/6 = 1/2 = 0,5 = 50%.</div>`),
  },
  relFreq: {
    title: L("Relative frequency", "Relatiewe frekwensie"),
    body: L(`
      <p>Relative frequency is what <b>actually happened</b> after you collect data — not a prediction.</p>
      <div class="formula">relative frequency = (times the event happened) / (total trials)</div>
      <p>With few trials it can differ from the theoretical probability; with many trials it usually gets closer to it.</p>
      <div class="eg">e.g. a coin flipped 10 times lands heads 6 times → relative frequency = 6/10 = 0,6, even though theory says 0,5.</div>`, `
      <p>Relatiewe frekwensie is wat <b>werklik gebeur het</b> nadat jy data versamel het, nie 'n voorspelling nie.</p>
      <div class="formula">relatiewe frekwensie = (kere wat die gebeurtenis plaasgevind het) / (totale aantal proewe)</div>
      <p>Met min proewe kan dit van die teoretiese waarskynlikheid verskil; met baie proewe kom dit gewoonlik nader daaraan.</p>
      <div class="eg">bv. 'n muntstuk word 10 keer opgegooi en land 6 keer op kop → relatiewe frekwensie = 6/10 = 0,6, al sê die teorie 0,5.</div>`),
  },
  vennNotation: {
    title: L("Venn diagram notation", "Venn-diagramme: notasie"),
    body: L(`
      <p>The <b>rectangle</b> is the sample space S; each <b>circle</b> is an event.</p>
      <ul>
        <li><b>A ∩ B</b> ("A and B") — the <b>overlap</b>: outcomes in A <i>and</i> B.</li>
        <li><b>A ∪ B</b> ("A or B") — <b>everything</b> in A together with everything in B.</li>
        <li><b>A′</b> ("not A") — everything <b>outside</b> A.</li>
      </ul>
      <p>The four basic regions of two circles are: only A, only B, the overlap (A ∩ B), and outside both.</p>
      <div class="eg">∩ reads "and"; ∪ reads "or"; the little dash A′ means "not".</div>`, `
      <p>Die <b>reghoek</b> is die uitkomsruimte S; elke <b>sirkel</b> is 'n gebeurtenis.</p>
      <ul>
        <li><b>A ∩ B</b> ("A en B"): die <b>oorvleueling</b>, uitkomste in A <i>en</i> B.</li>
        <li><b>A ∪ B</b> ("A of B"): <b>alles</b> in A saam met alles in B.</li>
        <li><b>A′</b> ("nie A"): alles <b>buite</b> A.</li>
      </ul>
      <p>Die vier basiese gebiede van twee sirkels is: slegs A, slegs B, die oorvleueling (A ∩ B), en buite albei.</p>
      <div class="eg">∩ lees jy as "en"; ∪ as "of"; die strepie by A′ beteken "nie".</div>`),
  },
  vennRead: {
    title: L("Reading probabilities off a Venn", "Lees waarskynlikhede van die Venn af"),
    body: L(`
      <p>Write the <b>count</b> of outcomes in each region. Then every probability is that region's count over n(S).</p>
      <ul>
        <li><b>P(A)</b> = (only A + overlap) / n(S)</li>
        <li><b>P(A ∩ B)</b> = overlap / n(S)</li>
        <li><b>P(A ∪ B)</b> = (only A + overlap + only B) / n(S)</li>
        <li><b>P(A′)</b> = (everything not in A) / n(S)</li>
      </ul>
      <p>All the region probabilities add up to <b>1</b>.</p>
      <div class="eg">e.g. n(S) = 12, only A = 1, overlap = 2, only B = 4 → P(A ∪ B) = (1 + 2 + 4)/12 = 7/12.</div>`, `
      <p>Skryf die <b>aantal</b> uitkomste in elke gebied. Dan is elke waarskynlikheid daardie gebied se aantal gedeel deur n(S).</p>
      <ul>
        <li><b>P(A)</b> = (slegs A + oorvleueling) / n(S)</li>
        <li><b>P(A ∩ B)</b> = oorvleueling / n(S)</li>
        <li><b>P(A ∪ B)</b> = (slegs A + oorvleueling + slegs B) / n(S)</li>
        <li><b>P(A′)</b> = (alles buite A) / n(S)</li>
      </ul>
      <p>Die waarskynlikhede van al die gebiede tel op tot <b>1</b>.</p>
      <div class="eg">bv. n(S) = 12, slegs A = 1, oorvleueling = 2, slegs B = 4 → P(A ∪ B) = (1 + 2 + 4)/12 = 7/12.</div>`),
  },
  addRule: {
    title: L("The addition rule", "Die optelreël"),
    body: L(`
      <p>For any two events:</p>
      <div class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
      <p>You subtract the overlap <b>once</b> because it was counted in both P(A) and P(B) — otherwise it's counted twice.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2 → P(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7.</div>`, `
      <p>Vir enige twee gebeurtenisse:</p>
      <div class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
      <p>Jy trek die oorvleueling <b>een keer</b> af, want dit is in sowel P(A) as P(B) getel; anders word dit twee keer getel.</p>
      <div class="eg">bv. P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2 → P(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7.</div>`),
  },
  mutual: {
    title: L("Exclusive, inclusive & exhaustive", "Uitsluitend, inklusief & uitputtend"),
    body: L(`
      <ul>
        <li><b>Mutually exclusive</b> — cannot happen together, no overlap: <b>P(A ∩ B) = 0</b>. The addition rule becomes P(A ∪ B) = P(A) + P(B).</li>
        <li><b>Mutually inclusive</b> — can happen together, there is an overlap: <b>P(A ∩ B) ≠ 0</b>.</li>
        <li><b>Complementary</b> — no overlap <i>and</i> they fill S: P(A) + P(A′) = 1.</li>
        <li><b>Exhaustive</b> — together they cover the whole sample space (nothing left outside).</li>
      </ul>
      <div class="eg">e.g. "even" and "odd" on a die are mutually exclusive AND exhaustive.</div>`, `
      <ul>
        <li><b>Onderling uitsluitend</b>: kan nie saam gebeur nie; geen oorvleueling, dus <b>P(A ∩ B) = 0</b>. Die optelreël word P(A ∪ B) = P(A) + P(B).</li>
        <li><b>Onderling inklusief</b>: kan saam gebeur; daar is 'n oorvleueling, dus <b>P(A ∩ B) ≠ 0</b>.</li>
        <li><b>Komplementêr</b>: geen oorvleueling <i>en</i> saam vul hulle S: P(A) + P(A′) = 1.</li>
        <li><b>Uitputtend</b>: saam dek hulle die hele uitkomsruimte (niks bly buite oor nie).</li>
      </ul>
      <div class="eg">bv. "ewe" en "onewe" op 'n dobbelsteen is onderling uitsluitend EN uitputtend.</div>`),
  },
  independence: {
    title: L("Independent events", "Onafhanklike gebeurtenisse"),
    body: L(`
      <p>Two events are <b>independent</b> when one happening does not change the chance of the other. The test:</p>
      <div class="formula">P(A ∩ B) = P(A) × P(B)</div>
      <p>Work out P(A) × P(B) and compare it with the real P(A ∩ B). <b>Equal → independent</b>; not equal → not independent.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,3, and P(A ∩ B) = 0,15 → 0,5 × 0,3 = 0,15, so they are independent.</div>`, `
      <p>Twee gebeurtenisse is <b>onafhanklik</b> as die een gebeurtenis nie die kans op die ander verander nie. Die toets:</p>
      <div class="formula">P(A ∩ B) = P(A) × P(B)</div>
      <p>Bereken P(A) × P(B) en vergelyk dit met die werklike P(A ∩ B). <b>Gelyk → onafhanklik</b>; ongelyk → nie onafhanklik nie.</p>
      <div class="eg">bv. P(A) = 0,5, P(B) = 0,3 en P(A ∩ B) = 0,15 → 0,5 × 0,3 = 0,15, dus is hulle onafhanklik.</div>`),
  },
  contingency: {
    title: L("Contingency tables", "Tweerigtingtabelle"),
    body: L(`
      <p>A contingency table sorts a group by <b>two</b> features at once. Use the totals to read probabilities:</p>
      <ul>
        <li>P(feature) = a row or column total ÷ the grand total</li>
        <li>P(both) = the single overlap cell ÷ the grand total</li>
      </ul>
      <p>Then test independence: compare P(both) with P(A) × P(B).</p>
      <div class="eg">e.g. 70 males of 150, 80 older of 150, 45 older males → P(M)×P(O) = 70/150 × 80/150 ≈ 0,249 but P(M ∩ O) = 45/150 = 0,3 → not independent.</div>`, `
      <p>'n Tweerigtingtabel sorteer 'n groep volgens <b>twee</b> eienskappe tegelyk. Gebruik die totale om waarskynlikhede af te lees:</p>
      <ul>
        <li>P(eienskap) = 'n ry- of kolomtotaal ÷ die groottotaal</li>
        <li>P(albei) = die een sel waar ry en kolom oorvleuel ÷ die groottotaal</li>
      </ul>
      <p>Toets dan vir onafhanklikheid: vergelyk P(albei) met P(A) × P(B).</p>
      <div class="eg">bv. 70 mans uit 150, 80 ouer mense uit 150, 45 ouer mans → P(M)×P(O) = 70/150 × 80/150 ≈ 0,249 maar P(M ∩ O) = 45/150 = 0,3 → nie onafhanklik nie.</div>`),
  },
  treeRead: {
    title: L("Reading a tree diagram", "Lees die boomdiagram"),
    body: L(`
      <p>Each stage of the experiment is a new set of branches, with the probability written <b>on</b> each branch.</p>
      <ul>
        <li>The branches leaving any one point must add up to <b>1</b>.</li>
        <li><b>Multiply</b> the probabilities <b>along</b> a path to get that full outcome.</li>
        <li><b>Add</b> the path probabilities to combine paths into one event.</li>
      </ul>
      <div class="eg">e.g. two coins: P(H,T) = 0,5 × 0,5 = 0,25; <span class="nowrap">P(exactly one head)</span> = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`, `
      <p>Elke stadium van die eksperiment is 'n nuwe stel takke, met die waarskynlikheid <b>op</b> elke tak geskryf.</p>
      <ul>
        <li>Die takke wat uit enige een punt kom, moet saam tot <b>1</b> optel.</li>
        <li><b>Vermenigvuldig</b> die waarskynlikhede <b>langs</b> 'n pad om daardie volle uitkoms te kry.</li>
        <li><b>Tel</b> die padwaarskynlikhede op om paaie tot een gebeurtenis saam te voeg.</li>
      </ul>
      <div class="eg">bv. twee muntstukke: P(H,T) = 0,5 × 0,5 = 0,25; <span class="nowrap">P(presies een kop)</span> = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`),
  },
  atLeastOne: {
    title: L("The ‘at least one’ shortcut", "Die ‘ten minste een’-kortpad"),
    body: L(`
      <p>"At least one" is usually quickest as the complement of "none":</p>
      <div class="formula">P(at least one) = 1 − P(none)</div>
      <p>Find P(none) by multiplying the "not it" branch along every stage, then subtract from 1.</p>
      <div class="eg">e.g. 5 red balls out of 20, two draws with replacement: P(no red) = 15/20 × 15/20 = 225/400 → <span class="nowrap">P(at least one red)</span> = 1 − 225/400 = 175/400.</div>`, `
      <p>"Ten minste een" werk gewoonlik die vinnigste as die komplement van "geen":</p>
      <div class="formula">P(ten minste een) = 1 − P(geen)</div>
      <p>Kry P(geen) deur die "nie dit nie"-tak by elke stadium te vermenigvuldig, en trek dit dan van 1 af.</p>
      <div class="eg">bv. 5 rooi balle uit 20, twee trekkings met terugplasing: P(geen rooi) = 15/20 × 15/20 = 225/400 → <span class="nowrap">P(ten minste een rooi)</span> = 1 − 225/400 = 175/400.</div>`),
  },
  replacement: {
    title: L("With vs without replacement", "Met vs sonder terugplasing"),
    body: L(`
      <ul>
        <li><b>With replacement</b> — the item goes back, so the total <b>stays the same</b> and every second-draw branch uses the same denominator.</li>
        <li><b>Without replacement</b> — the item is kept, so the <b>total drops by one</b> and the colour taken first has <b>one fewer</b>.</li>
      </ul>
      <div class="eg">e.g. 20 balls, take a green: with replacement the next draw is still 7/20; without, it's 6/19 and greens drop from 7 to 6.</div>`, `
      <ul>
        <li><b>Met terugplasing</b>: die item gaan terug, dus <b>bly die totaal dieselfde</b> en elke tak van die tweede trekking gebruik dieselfde noemer.</li>
        <li><b>Sonder terugplasing</b>: die item word gehou, dus <b>daal die totaal met een</b> en die kleur wat eerste getrek is, het <b>een minder</b>.</li>
      </ul>
      <div class="eg">bv. 20 balle, trek 'n groen bal: met terugplasing is die volgende trekking steeds 7/20; sonder is dit 6/19 en die groen balle daal van 7 na 6.</div>`),
  },

};
