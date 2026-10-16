/* Concept cards: Probability (chapter id "prob"), the "I'm lost" re-teach cards.
   Split from js/concepts.js on 2026-10-17 (AF row S4); js/concepts.js assembles
   every chapter back into the one CONCEPTS object, in the old chapter order.
   English text verbatim; Afrikaans twins come row by row through QUEUE.md. */

export const CONCEPTS_PROB = {
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
      <div class="eg">e.g. two coins: P(H,T) = 0,5 × 0,5 = 0,25; <span class="nowrap">P(exactly one head)</span> = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`,
  },
  atLeastOne: {
    title: "The ‘at least one’ shortcut",
    body: `
      <p>"At least one" is usually quickest as the complement of "none":</p>
      <div class="formula">P(at least one) = 1 − P(none)</div>
      <p>Find P(none) by multiplying the "not it" branch along every stage, then subtract from 1.</p>
      <div class="eg">e.g. P(no red) = 15/20 × 15/20 = 225/400 → <span class="nowrap">P(at least one red)</span> = 1 − 225/400 = 175/400.</div>`,
  },
  replacement: {
    title: "With vs without replacement",
    body: `
      <ul>
        <li><b>With replacement</b> — the item goes back, so the total <b>stays the same</b> and every second-draw branch uses the same denominator.</li>
        <li><b>Without replacement</b> — the item is kept, so the <b>total drops by one</b> and the colour taken first has <b>one fewer</b>.</li>
      </ul>
      <div class="eg">e.g. 20 balls, take a green: with replacement the next draw is still 7/20; without, it's 6/19 and greens drop from 7 to 6.</div>`,
  },

};
