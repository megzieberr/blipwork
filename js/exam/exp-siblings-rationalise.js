/* ============================================================
   EXAM FOCUS — Exponents & Surds · SIBLING CARDS for the skill
   "rationalise" (Rationalise the denominator).
   (SESSION B of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/B-exp.md.)
   ------------------------------------------------------------
   FOUR new cards, taking the tile from two to six.

   WHAT WAS ALREADY THERE, so that nothing here repeats a shape:
     · exp.fsm.t1q1(b) — "show that" 6/(√5 − √2) = 2√5 + 2√2, a
       NUMERIC binomial denominator worked as a proof;
     · exp.cr.q1(d) — "show that" (x − 4)/(√x − 2) = √x + 2, an
       ALGEBRAIC conjugate where the denominator cancels outright.
   Both are proofs, and both have ONE fraction. The four below fill in
   everything her A11 page actually asks for:
     q1  a MONOMIAL denominator (her T23 p06 shape, both roads shown);
     q2  a binomial conjugate finished "in the form a + b√3", with the
         two values read off — the exact Test 1 Q3 ask;
     q3  a denominator with TWO surds and a numerator that is not 1,
         so the top becomes a squared binomial and keeps its middle
         term;
     q4  TWO fractions that each have to be rationalised before they
         can be subtracted — rationalise, THEN simplify.

   METHOD: METHODS-algebra.md, hers verbatim — A11 the conjugate over
   itself written as a separate factor with a × between; the monomial
   case multiplied by the surd over itself; A10 "diff in □'s" first and
   the squared binomial keeping its middle term; A16 a "show that"
   worked from one side; F5 (ruled by her 2026-08-21) — where two roads
   are equally marked, BOTH are shown, the second under OR; F15 — a
   final answer is fully simplified and rationalised.

   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 "no-calculator opening
   block"; SURVEY-Nov-P1.md Q2(b) "prove a surd identity — rationalising
   denominators, two memo methods (OR) accepted" and Q2(a)(2)'s
   (√7 − √2)(√7 + √2) denominator; SURVEY-June.md Q3(c) "rationalise
   3/(√7 − √5)"; SURVEY-Her-2025-Assessments.md Test 1 Q3 ("rationalise
   a denominator to find a + b√3 form"). Fresh radicands throughout.

   LEVELS: 1, 2, 2, 3. NOTHING here is level 4 — this is a normal tile.
   NO DIAGRAM.
   ============================================================ */

const PAPER = "siblings";
const CH = "exp";

/* ---------------------------------------------------------------
   q1 — MONOMIAL denominator: 10/√18 = 5√2/3. Both roads under OR.
   --------------------------------------------------------------- */
const q1 = {
  id: "exp.sib.rat.q1",
  chapter: CH,
  topic: "rationalise",
  archetype: "rationalise-a-monomial-surd-denominator",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es6" },
  marks: 3,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Without the use of a calculator.</em><br>Rationalise the denominator and simplify: &nbsp;10/√18", af: "<em>Sonder die gebruik van 'n sakrekenaar.</em><br>Rasionaliseer die noemer en vereenvoudig: &nbsp;10/√18",
      },
      hint: {
        en: "There is only ONE term underneath, so there is no conjugate to find — multiply top and bottom by that surd itself. Remember that a root multiplied by itself simply undoes the root.", af: "Daar is net EEN term onder, so daar is geen toegevoegde wortelvorm om te soek nie: vermenigvuldig bo en onder met daardie wortelvorm self. Onthou: 'n wortel maal homself maak die wortel net ongedaan.",
      },
      memo: [
        { type: "step", text: { en: "One term underneath, so multiply by <b>that surd over itself</b> — which is multiplying by 1, so the value never changes:", af: "Een term onder, so vermenigvuldig met <b>daardie wortelvorm oor homself</b>, wat vermenigvuldig met 1 is, so die waarde verander nooit:" } },
        { type: "step", text: { en: "10/√18 &nbsp;×&nbsp; √18/√18 = 10√18/18", af: "10/√18 &nbsp;×&nbsp; √18/√18 = 10√18/18" }, ticks: ["s/f"] },
        { type: "step", text: { en: "√18 = √(3² · 2) = 3√2, &nbsp;so &nbsp;= 30√2/18", af: "√18 = √(3² · 2) = 3√2, &nbsp;dus &nbsp;= 30√2/18" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 5√2/3", af: "= 5√2/3" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — simplify the denominator first (same marks): &nbsp;10/√18 = 10/(3√2) &nbsp;×&nbsp; √2/√2 = 10√2/6 = 5√2/3", af: "<b>OF</b>, vereenvoudig eers die noemer (dieselfde punte): &nbsp;10/√18 = 10/(3√2) &nbsp;×&nbsp; √2/√2 = 10√2/6 = 5√2/3" } },
        { type: "trap", text: {
          en: "WATCH OUT: √18 × √18 = 18. It is not √36 and it is not 18√18 — a square root multiplied by itself simply undoes the root, and that is the whole reason this trick clears the bottom.", af: "PASOP: √18 × √18 = 18. Dit is nie √36 nie en ook nie 18√18 nie: 'n vierkantswortel maal homself maak die wortel net ongedaan, en dit is presies hoekom hierdie truuk die noemer skoonmaak.",
        } },
      ],
      esplain: {
        en: "A surd underneath a fraction bar is not wrong, it is just unfinished, and every marker expects it gone. With one term underneath there is nothing clever to do: multiply the top and the bottom by that same root. Because you did the same thing to both, you multiplied the fraction by one, so its value has not moved a millimetre — only its appearance. Root eighteen times root eighteen is a plain 18, so the bottom is clean, and then the top and bottom cancel down. The second road gets there faster and is worth exactly the same: simplify root eighteen into three root two first, so the number you have to multiply by is smaller and the arithmetic is friendlier. Use whichever one you can do without slipping.", af: "'n Wortelvorm onder 'n breukstreep is nie verkeerd nie, net onklaar, en elke nasiener verwag dat dit weg is. Met een term onder is daar niks slims om te doen nie: vermenigvuldig bo en onder met dieselfde wortel. Omdat jy albei dieselfde behandel het, het jy die breuk met een vermenigvuldig, so sy waarde het nie 'n millimeter verander nie, net sy voorkoms. Wortel agtien maal wortel agtien is 'n gewone 18, so die noemer is skoon, en dan vereenvoudig bo en onder. Die tweede pad is vinniger en tel presies dieselfde: vereenvoudig wortel agtien eers na drie wortel twee, so die getal waarmee jy vermenigvuldig is kleiner en die rekenwerk vriendeliker. Gebruik die een wat jy sonder 'n glipsie kan doen.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — binomial conjugate, answer read off as a + b√3.
   6/(√3 + 1) = 3√3 − 3, so a = −3 and b = 3.
   --------------------------------------------------------------- */
const q2 = {
  id: "exp.sib.rat.q2",
  chapter: CH,
  topic: "rationalise",
  archetype: "conjugate-then-state-a-and-b-in-the-form-a-plus-b-root-3",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es6" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Write &nbsp;6/(√3 + 1)&nbsp; in the form &nbsp;a + b√3, &nbsp;where a and b are integers, and write down the values of a and b.", af: "<em>Sonder 'n sakrekenaar.</em><br>Skryf &nbsp;6/(√3 + 1)&nbsp; in die vorm &nbsp;a + b√3, &nbsp;waar a en b heelgetalle is, en skryf die waardes van a en b neer.",
      },
      hint: {
        en: "Two terms underneath, so there IS a conjugate — the same two terms with the middle sign swapped. Multiply top and bottom by it, and at the end line your answer up against the form you were asked for.", af: "Twee terme onder, so daar IS 'n toegevoegde wortelvorm: dieselfde twee terme met die middelste teken omgeruil. Vermenigvuldig bo en onder daarmee, en vergelyk jou antwoord aan die einde met die vorm wat gevra is.",
      },
      memo: [
        { type: "step", text: { en: "Two terms underneath, so multiply by the <b>conjugate over itself</b> — the same two terms with the middle sign swapped:", af: "Twee terme onder, so vermenigvuldig met die <b>toegevoegde wortelvorm oor homself</b>, dieselfde twee terme met die middelste teken omgeruil:" } },
        { type: "step", text: { en: "6/(√3 + 1) &nbsp;×&nbsp; (√3 − 1)/(√3 − 1)", af: "6/(√3 + 1) &nbsp;×&nbsp; (√3 − 1)/(√3 − 1)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The bottom is a <b>diff in □'s</b>: &nbsp;(√3)² − 1² = 3 − 1 = 2, &nbsp;so &nbsp;= (6(√3 − 1))/2", af: "Die noemer is 'n <b>verskil van □'e</b>: &nbsp;(√3)² − 1² = 3 − 1 = 2, &nbsp;dus &nbsp;= (6(√3 − 1))/2" }, ticks: ["ca"] },
        { type: "step", text: { en: "= 3(√3 − 1) = 3√3 − 3", af: "= 3(√3 − 1) = 3√3 − 3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3√3 − 3 = −3 + 3√3 &nbsp;&nbsp;∴ a = −3 &nbsp;and&nbsp; b = 3", af: "3√3 − 3 = −3 + 3√3 &nbsp;&nbsp;∴ a = −3 &nbsp;en&nbsp; b = 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: “in the form a + b√3” puts the plain number FIRST. 3√3 − 3 is the same as −3 + 3√3, so a = −3 and b = 3 — reading them off in the order they happen to be written on the page is how this mark gets lost.", af: "PASOP: “in die vorm a + b√3” sit die gewone getal EERSTE. 3√3 − 3 is dieselfde as −3 + 3√3, dus a = −3 en b = 3: as jy hulle aflees in die volgorde waarin hulle toevallig op die bladsy staan, verloor jy hierdie punt.",
        } },
      ],
      esplain: {
        en: "The conjugate is the same two terms with the middle sign flipped, and it works because of one pattern you already know: when two brackets differ only in that middle sign, the cross terms cancel and you are left with first squared minus second squared. Squaring is what kills a surd, so root three squared becomes a plain 3 and the bottom lands on 2. Then the fraction cancels down to three lots of root three minus one. The last line is not decoration. Being asked for the form a plus b root three means the examiner wants the rational part and the surd part separated and named, so you have to rewrite the answer in that order and say which is which. It is one mark, and it is the easiest one in the question to throw away.", af: "Die toegevoegde wortelvorm is dieselfde twee terme met die middelste teken omgedraai, en dit werk danksy een patroon wat jy reeds ken: as twee hakies net in daardie middelste teken verskil, kanselleer die middelterme en bly eerste kwadraat minus tweede kwadraat oor. Kwadreer is wat 'n wortelvorm doodmaak, so wortel drie kwadraat word 'n gewone 3 en die noemer word 2. Dan vereenvoudig die breuk tot drie keer (wortel drie minus een). Die laaste reël is nie versiering nie. As die vorm a plus b wortel drie gevra word, wil die eksaminator die rasionale deel en die wortelvormdeel apart en benoem sien, so jy moet die antwoord in daardie volgorde herskryf en sê watter is watter. Dit is een punt, en dit is die maklikste een in die vraag om weg te gooi.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TWO surds underneath and a two-surd numerator:
   (√7 + √3)/(√7 − √3) = (5 + √21)/2.
   --------------------------------------------------------------- */
const F = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;

const q3 = {
  id: "exp.sib.rat.q3",
  chapter: CH,
  topic: "rationalise",
  archetype: "rationalise-a-two-surd-denominator-numerator-becomes-a-squared-binomial",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es6" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Rationalise the denominator and simplify: &nbsp;(√7 + √3)/(√7 − √3)", af: "<em>Sonder 'n sakrekenaar.</em><br>Rasionaliseer die noemer en vereenvoudig: &nbsp;(√7 + √3)/(√7 − √3)",
      },
      hint: {
        en: "Find the conjugate of the bottom and multiply top and bottom by it. Watch what happens on TOP: the two brackets there end up identical, so that is a squared bracket, not a difference of squares.", af: "Kry die toegevoegde wortelvorm van die noemer en vermenigvuldig bo en onder daarmee. Kyk wat BO gebeur: die twee hakies daar is identies, so dit is 'n hakie in die kwadraat, nie 'n verskil van twee vierkante nie.",
      },
      memo: [
        { type: "step", text: { en: "The denominator has two terms, so multiply top and bottom by its <b>conjugate</b>, √7 + √3:", af: "Die noemer het twee terme, so vermenigvuldig bo en onder met sy <b>toegevoegde wortelvorm</b>, √7 + √3:" } },
        { type: "step", text: { en: "= " + F("(√7 + √3)(√7 + √3)", "(√7 − √3)(√7 + √3)") + " = " + F("(√7 + √3)²", "7 − 3") }, ticks: ["s/f"] },
        { type: "step", text: { en: "On top the two brackets are the SAME, so it is a squared binomial and it <b>keeps its middle term</b>: &nbsp;(√7 + √3)² = 7 + 2√21 + 3 = 10 + 2√21", af: "Bo is die twee hakies DIESELFDE, so dit is 'n tweeterm in die kwadraat en dit <b>hou sy middelterm</b>: &nbsp;(√7 + √3)² = 7 + 2√21 + 3 = 10 + 2√21" }, ticks: ["ca"] },
        { type: "step", text: { en: "= (10 + 2√21)/4", af: "= (10 + 2√21)/4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (5 + √21)/2", af: "= (5 + √21)/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: only the BOTTOM is a difference of squares. The top gets the same conjugate, which makes it a bracket times itself — so it keeps its middle term 2√21. Writing 7 + 3 on top loses two marks in one stroke.", af: "PASOP: net die NOEMER is 'n verskil van twee vierkante. Die teller kry dieselfde toegevoegde wortelvorm, wat dit 'n hakie maal homself maak, so dit hou sy middelterm 2√21. As jy 7 + 3 bo skryf, verloor jy twee punte in een slag.",
        } },
      ],
      esplain: {
        en: "This is the pair of surd products met together for the first time, and telling them apart is the whole skill. On the bottom the signs differ, so the cross terms cancel and everything collapses to a plain 4. On the top the signs match, because you multiplied by the same conjugate, so the cross terms survive and add together into two lots of root twenty-one. Root seven times root three is root twenty-one, because multiplying two roots of the same kind is allowed and you simply multiply what is underneath. Once the fraction is written out, every term on top and the number underneath share a factor of 2, so it cancels down. Nothing about that last cancel is optional — a marker expects the simplest form.", af: "Hier ontmoet jy die twee wortelvormprodukte vir die eerste keer saam, en om hulle uitmekaar te ken is die hele vaardigheid. Onder verskil die tekens, so die middelterme kanselleer en alles krimp tot 'n gewone 4. Bo is die tekens dieselfde, omdat jy met dieselfde toegevoegde wortelvorm vermenigvuldig het, so die middelterme bly oor en tel saam tot twee keer wortel een-en-twintig. Wortel sewe maal wortel drie is wortel een-en-twintig, want jy mag twee wortels van dieselfde soort vermenigvuldig: jy vermenigvuldig net wat onder die wortel staan. Sodra die breuk uitgeskryf is, het elke term bo en die getal onder 'n gemene faktor 2, so dit vereenvoudig. Daardie laaste stap is nie opsioneel nie: 'n nasiener verwag die eenvoudigste vorm.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — rationalise THEN simplify:
   1/(√5 − √3) − 1/(√5 + √3) = √3.
   --------------------------------------------------------------- */
const q4 = {
  id: "exp.sib.rat.q4",
  chapter: CH,
  topic: "rationalise",
  archetype: "rationalise-two-fractions-then-subtract-them",
  paper: PAPER,
  lostQuest: { chapter: CH, quest: "es6" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;1/(√5 − √3) − 1/(√5 + √3)", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;1/(√5 − √3) − 1/(√5 + √3)",
      },
      hint: {
        en: "Do not look for a common denominator yet. Clean each fraction on its own first — each one has its own conjugate — and notice what both of them end up sitting over.", af: "Moenie nou al 'n gemene noemer soek nie. Maak eers elke breuk op sy eie skoon (elkeen het sy eie toegevoegde wortelvorm) en let op watter noemer albei uiteindelik kry.",
      },
      memo: [
        { type: "step", text: { en: "Two fractions, each with a two-term surd underneath, so rationalise each one separately with its own <b>conjugate over itself</b>.", af: "Twee breuke, elk met 'n wortelvorm van twee terme onder, so rasionaliseer elkeen apart met sy eie <b>toegevoegde wortelvorm oor homself</b>." } },
        { type: "step", text: { en: "1/(√5 − √3) &nbsp;×&nbsp; (√5 + √3)/(√5 + √3) = (√5 + √3)/(5 − 3) = (√5 + √3)/2", af: "1/(√5 − √3) &nbsp;×&nbsp; (√5 + √3)/(√5 + √3) = (√5 + √3)/(5 − 3) = (√5 + √3)/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "1/(√5 + √3) &nbsp;×&nbsp; (√5 − √3)/(√5 − √3) = (√5 − √3)/(5 − 3) = (√5 − √3)/2", af: "1/(√5 + √3) &nbsp;×&nbsp; (√5 − √3)/(√5 − √3) = (√5 − √3)/(5 − 3) = (√5 − √3)/2" }, ticks: ["ca"] },
        { type: "step", text: { en: "Both now sit over 2, so subtract the tops — and mind the bracket:<br>(√5 + √3) − (√5 − √3) = 2√3, &nbsp;so the difference is &nbsp;2√3/2", af: "Albei staan nou oor 2, so trek die tellers af, en pas op vir die hakie:<br>(√5 + √3) − (√5 − √3) = 2√3, &nbsp;dus is die verskil &nbsp;2√3/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= √3", af: "= √3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bracket around the second top is what decides this question. Subtracting (√5 − √3) changes BOTH signs inside it, which is exactly why the √5 terms cancel and the √3 terms double instead of the other way round.", af: "PASOP: die hakie om die tweede teller besluit hierdie vraag. Om (√5 − √3) af te trek, verander AL TWEE tekens daarin, en dit is presies hoekom die √5-terme kanselleer en die √3-terme verdubbel, en nie andersom nie.",
        } },
      ],
      esplain: {
        en: "The instinct is to find a common denominator straight away, and it works, but it makes the arithmetic much heavier than it needs to be. Rationalising each fraction first is quicker and it hands you a present: both denominators turn out to be 5 minus 3, which is 2, so the two fractions already share a denominator without any extra work. After that it is one careful subtraction. The bracket matters more than anything else on the page — taking away root five minus root three means taking away the root five AND adding back the root three, so the root fives wipe each other out and the root threes join up into two of them. Two root three over two cancels to a single root three, which is a surprisingly tidy answer for a question that started with four surds.", af: "Die eerste ingewing is om dadelik 'n gemene noemer te soek, en dit werk, maar dit maak die rekenwerk baie swaarder as nodig. Om eers elke breuk te rasionaliseer is vinniger en gee jou 'n geskenk: albei noemers word 5 minus 3, wat 2 is, so die twee breuke deel reeds 'n noemer sonder ekstra werk. Daarna is dit een versigtige aftrekking. Die hakie tel meer as enigiets anders op die bladsy: om wortel vyf minus wortel drie af te trek, beteken jy trek die wortel vyf af EN tel die wortel drie terug, so die terme met wortel vyf vee mekaar uit en die terme met wortel drie word saam twee wortel drie. Twee wortel drie oor twee vereenvoudig tot een wortel drie, 'n verrassend netjiese antwoord vir 'n vraag wat met vier wortelvorme begin het.",
      },
    },
  ],
};

export const expRationaliseSiblingQuestions = [q1, q2, q3, q4];
