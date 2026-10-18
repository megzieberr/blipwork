/* ============================================================
   EXAM FOCUS — Exponents & Surds · Conjugates & rationalising
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block (surds …)", plus SURVEY-Nov-P1.md's recurring
   "prove/show a surd identity — rationalising denominators, two memo
   methods (OR) accepted" (Nov P1 2023 Q2(b); Nov P1 2021 Q2(a)(2)'s
   (√7 − √2)(√7 + √2) denominator). Fresh radicands, fresh contexts.

   SKELETON DISTANCE — checked against Sept T1 Q1, the only other
   exp-chapter question composed tonight:
     · T1 1(a) is √48 + √300 − √27, a SQUARE-root add/subtract; (a) here
       is a CUBE root, where a factor needs three of itself for a ticket
       out, and the answer keeps her 1∛2 scaffolding.
     · T1 1(b) rationalises a NUMERIC binomial denominator, 6/(√5 − √2).
       (d) here rationalises an ALGEBRAIC one, (x − 4)/(√x − 2), where
       the conjugate makes the denominator cancel outright rather than
       become a plain number — and where a restriction has to ride along.
     · (b) and (c) are products, not fractions: difference of squares
       and the squared binomial that keeps its middle term. Neither
       appears anywhere in T1.

   METHOD: METHODS-algebra.md hers verbatim — A8 prime factors then
   "tickets out"; A9 the BIG NO-NO (√x + √y ≠ √(x + y)) and her habit of
   keeping the coefficient 1 visible (1∛2 before ∛2); A10 difference of
   squares first, and the squared binomial keeping its middle term;
   A11 conjugate over itself; A16 a "show that" worked from ONE side
   only. Flag F2 is respected — no ± appears anywhere, because nothing
   here is being SOLVED, only simplified.

   NO LEVEL 4 in this question, so no ★ — the block's level-4 weight is
   carried by js/exam/exp-no-solution-and-strategy.js. Block spread is
   reported in the run's return.

   NO DIAGRAM. ⚠️ UNREGISTERED — same four registration steps as
   js/exam/exp-first-step-and-method.js's header, including the missing
   `exp` scope wall in verify-exam.html Part 6.
   ============================================================ */

const q1 = {
  id: "exp.cr.q1",
  chapter: "exp",
  topic: "conjugates-and-rationalising",
  archetype: "surd-products-and-an-algebraic-conjugate-show-that",
  lostQuest: { chapter: "exp", quest: "es6" },
  marks: 12,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer the WHOLE of this question without a calculator.</em><br>Simplify: &nbsp;∛54 − ∛16", af: "<em>Beantwoord die HELE vraag sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;∛54 − ∛16",
      },
      hint: {
        en: "Prime factors first, as always — but count carefully. Under a cube root a factor needs three of itself before it earns a ticket out, not two.", af: "Priemfaktore eerste, soos altyd, maar tel mooi. Onder 'n derdemagswortel het 'n faktor drie van homself nodig voor dit 'n kaartjie uit verdien, nie twee nie.",
      },
      memo: [
        { type: "step", text: { en: "Rewrite every base as a product of prime factors first, then look for the factors with <b>tickets out</b> — under a cube root that means groups of three.", af: "Skryf eers elke grondtal as 'n produk van priemfaktore, en soek dan die faktore met <b>kaartjies uit</b>: onder 'n derdemagswortel beteken dit groepe van drie." } },
        { type: "step", text: { en: "∛54 − ∛16 = ∛(2 · 3³) − ∛(2³ · 2)", af: "∛54 − ∛16 = ∛(2 · 3³) − ∛(2³ · 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 3∛2 − 2∛2", af: "= 3∛2 − 2∛2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1∛2 = ∛2", af: "= 1∛2 = ∛2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the root index is what decides how many of a factor you need. A square root wants pairs; a cube root wants threes. 2⁴ = 2³ · 2 hands ONE 2 out of a cube root and leaves one behind — it does not hand out two.", af: "ONTHOU: die wortelindeks besluit hoeveel van 'n faktor jy nodig het. 'n Vierkantswortel wil pare hê; 'n derdemagswortel wil drietalle hê. 2⁴ = 2³ · 2 stuur EEN 2 uit 'n derdemagswortel en los een agter: dit stuur nie twee uit nie.",
        } },
      ],
      esplain: {
        en: "Two cube roots that look nothing alike turn out to be helpings of the same thing, and prime factors are what show it. Under ∛54 sits 2 · 3³: the three 3s travel together and walk out as a single 3, leaving the lonely 2 behind. Under ∛16 sits 2⁴, which is one complete group of three 2s plus a spare, so a 2 walks out and a 2 stays. Both land on ∛2, and once the roots are identical, subtracting them is counting: three of them take away two of them leaves one of them. Write that 1 in front before you tidy it away — it is the line that shows the marker you were counting, not guessing.", af: "Twee derdemagswortels wat glad nie na mekaar lyk nie, is eintlik porsies van dieselfde ding, en priemfaktore wys dit. Onder ∛54 sit 2 · 3³: die drie 3's reis saam en stap uit as een enkele 3, en die eensame 2 bly agter. Onder ∛16 sit 2⁴, dit is een volle groep van drie 2's plus 'n ekstra een, so 'n 2 stap uit en 'n 2 bly. Albei beland op ∛2, en sodra die wortels dieselfde is, is aftrek net tel: drie van hulle min twee van hulle laat een van hulle oor. Skryf daardie 1 voor neer voordat jy dit weglaat: dit is die reël wat vir die nasiener wys jy het getel, nie geraai nie.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(2√3 − √5)(2√3 + √5)", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;(2√3 − √5)(2√3 + √5)",
      },
      hint: {
        en: "Do not multiply this out term by term — look at the two brackets and notice how they differ. And be careful about what the 2 out front does when you square it.", af: "Moenie dit term vir term uitvermenigvuldig nie: kyk na die twee hakies en sien hoe hulle verskil. En pas op wat die 2 voor doen as jy dit kwadreer.",
      },
      memo: [
        { type: "step", text: { en: "Same two terms, only the middle sign differs — that is a <b>diff in □'s</b>, so it collapses straight to first squared minus second squared:", af: "Dieselfde twee terme, net die middelste teken verskil: dit is 'n <b>verskil van □'e</b>, dus word dit dadelik die eerste gekwadreer minus die tweede gekwadreer:" } },
        { type: "step", text: { en: "= (2√3)² − (√5)²", af: "= (2√3)² − (√5)²" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= 12 − 5 = 7", af: "= 12 − 5 = 7" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (2√3)² is 2² × (√3)² = 4 × 3 = 12, not 2 × 3 = 6. Everything inside the bracket gets squared, the coefficient included.", af: "PASOP: (2√3)² is 2² × (√3)² = 4 × 3 = 12, nie 2 × 3 = 6 nie. Alles binne die hakie word gekwadreer, die koëffisiënt ook.",
        } },
      ],
      esplain: {
        en: "This is the reason conjugates work at all, met on its own before you need it in a fraction. When two brackets hold the same two terms and differ only in the middle sign, the cross terms cancel each other out exactly, and all that survives is the square of the first minus the square of the second. Squaring is what kills the surds — √3 squared is just 3 — so a product that looked full of roots lands on a plain whole number. Hold on to that: it is precisely the move that clears a surd out of a denominator in part (d).", af: "Dit is die rede waarom toegevoegde wortelvorme werk, hier op sy eie, voordat jy dit in 'n breuk nodig het. As twee hakies dieselfde twee terme het en net in die middelste teken verskil, kanselleer die kruisterme mekaar presies uit, en al wat oorbly, is die kwadraat van die eerste minus die kwadraat van die tweede. Kwadreer is wat die wortelvorme doodmaak (√3 gekwadreer is net 3), so 'n produk vol wortels beland op 'n gewone heelgetal. Hou dit vas: dit is presies die stap wat 'n wortelvorm uit 'n noemer haal in deel (d).",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;(√7 + √2)²", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;(√7 + √2)²",
      },
      hint: {
        en: "A bracket squared is that bracket times itself — so it keeps a middle term. Write it out in three pieces before you simplify anything.", af: "'n Hakie in die kwadraat is daardie hakie maal homself, so dit hou 'n middelterm. Skryf dit in drie stukke uit voordat jy enigiets vereenvoudig.",
      },
      memo: [
        { type: "step", text: { en: "Squaring a binomial <b>keeps the middle term</b> — first squared, plus twice first times second, plus second squared:", af: "As jy 'n tweeterm kwadreer, <b>bly die middelterm</b>: eerste gekwadreer, plus twee keer eerste maal tweede, plus tweede gekwadreer:" } },
        { type: "step", text: { en: "(√7 + √2)² = (√7)² + 2(√7)(√2) + (√2)²", af: "(√7 + √2)² = (√7)² + 2(√7)(√2) + (√2)²" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 7 + 2√14 + 2", af: "= 7 + 2√14 + 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 9 + 2√14", af: "= 9 + 2√14" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: (√7 + √2)² ≠ 7 + 2. That is the BIG NO-NO wearing a different hat — a square never distributes over a + or a −, and the middle term is exactly what it leaves behind when you try.", af: "ONTHOU: (√7 + √2)² ≠ 7 + 2. Dit is die GROOT NEE-NEE met 'n ander hoed op: 'n kwadraat versprei nooit oor 'n + of 'n − nie, en die middelterm is presies wat wegval as jy dit probeer.",
        } },
      ],
      esplain: {
        en: "Put this part next to (b) and the pair teaches the whole story. Same terms, signs differ, gave you a clean whole number, because the two cross terms cancelled. Same terms, signs match, keeps both cross terms, and 2 lots of √7 × √2 is 2√14 — which cannot be tidied any further, because 14 has no square factors to hand out tickets to. So the answer stays in two pieces, a whole-number part and a surd part, and that is a perfectly finished answer. Notice how √7 × √2 became √14: multiplying two square roots means multiplying what is underneath them, which is one of the surd laws that is genuinely allowed. Adding them is the one that is not.", af: "Sit hierdie deel langs (b), en die twee saam vertel die hele storie. Verskillende tekens het vir jou 'n skoon heelgetal gegee, want die twee kruisterme het mekaar uitgekanselleer. Dieselfde tekens hou albei kruisterme, en 2 keer √7 × √2 is 2√14, wat nie verder vereenvoudig kan word nie, want 14 het geen kwadraatfaktore om kaartjies aan uit te deel nie. Die antwoord bly dus in twee stukke, 'n heelgetaldeel en 'n wortelvormdeel, en dit is 'n heeltemal klaar antwoord. Let op hoe √7 × √2 na √14 verander het: as jy twee vierkantswortels vermenigvuldig, vermenigvuldig jy wat onder hulle staan, en dit is een van die wortelvormwette wat regtig mag. Om hulle op te tel, is die een wat nie mag nie.",
      },
    },
    {
      id: "d",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;(x − 4)/(√x − 2) = √x + 2, &nbsp;for x &gt; 0 and x ≠ 4.", af: "<em>Sonder 'n sakrekenaar.</em><br>Toon aan dat &nbsp;(x − 4)/(√x − 2) = √x + 2, &nbsp;vir x &gt; 0 en x ≠ 4.",
      },
      hint: {
        en: "Start on the left and drive it down to what you were given. The denominator has two terms, so it has a conjugate — and watch what the denominator turns into once you use it.", af: "Begin aan die linkerkant en bring dit tot by wat gegee is. Die noemer het twee terme, so dit het 'n toegevoegde wortelvorm, en kyk wat die noemer word sodra jy dit gebruik.",
      },
      memo: [
        { type: "step", text: { en: "A “show that” is worked from one side only — start on the left. The denominator is a two-term surd, so multiply by the <b>conjugate over itself</b>:", af: "'n “Toon aan” word van een kant af gewerk: begin aan die linkerkant. Die noemer is 'n wortelvorm met twee terme, so vermenigvuldig met die <b>toegevoegde wortelvorm oor homself</b>:" } },
        { type: "step", text: { en: "= (x − 4)/(√x − 2) &nbsp;×&nbsp; (√x + 2)/(√x + 2)", af: "= (x − 4)/(√x − 2) &nbsp;×&nbsp; (√x + 2)/(√x + 2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (x − 4)(√x + 2) / ((√x)² − 2²)", af: "= (x − 4)(√x + 2) / ((√x)² − 2²)" }, ticks: ["ca"] },
        { type: "step", text: { en: "= (x − 4)(√x + 2) / (x − 4)", af: "= (x − 4)(√x + 2) / (x − 4)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= √x + 2 &nbsp;as required", af: "= √x + 2 &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: x ≠ 4 is not decoration. At x = 4 the denominator √x − 2 is 0 and the whole expression is <b>undefined</b> — division by zero, which is a different word from “no solution”. That is why the question hands you the restriction, and why you may cancel the (x − 4) safely everywhere else.", af: "PASOP: x ≠ 4 is nie versiering nie. By x = 4 is die noemer √x − 2 gelyk aan 0 en die hele uitdrukking is <b>onbepaald</b>: deling deur nul, en dit is 'n ander woord as “geen oplossing”. Daarom gee die vraag vir jou die beperking, en daarom mag jy die (x − 4) oral elders veilig kanselleer.",
        } },
      ],
      esplain: {
        en: "The conjugate trick is not only for numbers. Here the denominator is √x − 2, so its conjugate is √x + 2, and multiplying by that over itself is multiplying by 1 — the expression's value never changes, only its shape. What makes this one satisfying is what the denominator becomes: (√x)² − 2² is x − 4, which is already sitting in the numerator, so the whole thing cancels and the fraction disappears. That is the pattern to recognise, because the difference of two squares turns up constantly in this disguise — x − 4 IS (√x)² − 2² whenever x is positive. And the restriction matters for exactly the reason the cancelling works: you are dividing top and bottom by x − 4, which is only legal while x − 4 is not zero.", af: "Die truuk met die toegevoegde wortelvorm is nie net vir getalle nie. Hier is die noemer √x − 2, so sy toegevoegde wortelvorm is √x + 2, en om met dit oor homself te vermenigvuldig, is om met 1 te vermenigvuldig: die uitdrukking se waarde verander nooit, net sy vorm. Wat hierdie een so lekker maak, is wat die noemer word: (√x)² − 2² is x − 4, wat reeds in die teller sit, so alles kanselleer en die breuk verdwyn. Dit is die patroon om raak te sien, want die verskil van twee vierkante kom gedurig in hierdie vermomming voor: x − 4 IS (√x)² − 2² wanneer x positief is. En die beperking maak saak om presies dieselfde rede as wat die kansellering werk: jy deel bo en onder deur x − 4, en dit mag net solank x − 4 nie nul is nie.",
      },
    },
  ],
};

export const expConjugatesAndRationalisingQuestions = [q1];
