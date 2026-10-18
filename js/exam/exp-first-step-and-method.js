/* ============================================================
   EXAM FOCUS — Exponents & Surds · First step & which method
   SOURCE: September Test 1 (practice), QUESTION 1 — the whole
   no-calculator exponents-and-surds question, converted part for part.
   (Overnight run #1, 2026-08-21. EXAM-FOCUS-PLAN.md "one engine, two
   outputs": the print QP/memo pair and this module are the same
   question.)
   ------------------------------------------------------------
   PRINT SOURCE (do not diverge from these without re-deriving):
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q1(a)–(d)
       Sept-T1-Practice-Memo.tex    1(a)–1(d), 11 ticks
       Sept-T1-blueprint.md         §1 blueprint table, §3 whose methods
   Every worked line, every tick and every WATCH OUT / REMEMBER card
   below carries the SAME content as the print memo. The connective
   teaching prose that sits between the print memo's display-maths lines
   is kept here as tick-less `step` blocks (it is method, not decoration)
   and is expanded in each part's `esplain`. `hint` is freshly authored
   per part — a nudge for a learner mid-attempt, never the answer.

   METHOD: METHODS-algebra.md, hers verbatim — prime factors first (A8),
   "tickets out" (A8, her word, required in hint text), conjugate over
   itself (A11), "show that" worked from ONE side (A16), divorce → common
   factor → caged → KFC (A3/A4/A6), power-of-a-power read backwards.

   LEVELS: the blueprint splits a sub-part's marks ACROSS two cognitive
   levels (1(c) = 2·L2 + 2·L3; 1(d) = 1·L3 + 1·L4). The schema stores ONE
   level per part and derives the amber ★ from level === 4, so the rule
   used here (and in every T1 module) is: level = the dominant mark
   chunk, and NEVER 4 unless the print memo actually stars that part.
   The print memo stars exactly 3(b), 5(b) and 5(c) — so nothing in this
   question is level 4, and 1(d) sits at 3.

   NO DIAGRAM: the print question has none, and the schema has no diagram
   field (the pilot, js/exam/eqn-nature-of-roots.js, sets no precedent).

   ⚠️ UNREGISTERED. Not imported by js/exam/index.js. Registering it (a
   DAY-session job) needs all of:
     1. js/exam/index.js — import + set REGISTRY.exp = [...].
     2. js/config.js — EXAM_CHAPTERS must include "exp" for the chapter
        to be learner-reachable at all (examChapterEligible()).
     3. verify-exam.html Part 6 — SCOPE_WALLS has an `eqn` key ONLY.
        A seeded exp question with no wall defined FAILS that check by
        design ("HAS n seeded question(s) but NO scope wall defined").
        Proposed exp wall, mirroring the es1–es8 quest breakdown:
        exponent-laws · spot-the-trap · first-step-and-method ·
        which-divorce · surd-laws-and-traps · conjugates-and-rationalising ·
        rational-exponent-equations · no-solution-and-strategy
     4. verify-exam.html Part 2 — six assertions hard-code the pilot-only
        state (EXAM_CHAPTERS === ["eqn"]; every non-eqn chapter empty;
        eqn === 4 questions; eqn topics === exactly ["nature-of-roots"];
        every eqn lostQuest === "eq8"). All of those must be widened
        before anything here is registered.
   ============================================================ */

/* Paper membership. The schema has no `paper` field and this file does
   NOT invent one in the validated shape — `paper` is a plain meta
   property, ignored by validateQuestion(), carried so a future
   practice-paper-mode manifest (EXAM-FOCUS-PLAN.md: "a paper is an
   ordered list of question ids + metadata") can be built from the
   modules themselves rather than from a hand-typed list. */
const PAPER = "sept-t1";

const t1q1 = {
  id: "exp.fsm.t1q1",
  chapter: "exp",
  topic: "first-step-and-method",
  archetype: "no-calculator-surds-and-exponents-block",
  paper: PAPER,
  // es3 "First step & which method" — prime factors first (1a, 1d) and
  // the cancelling rule / one-term-vs-factorise split (1c): 3 of the 4
  // parts and 9 of the 11 marks. es5/es6 cover 1(a)/1(b) more narrowly;
  // es3 is the round that teaches the question's shared first move.
  lostQuest: { chapter: "exp", quest: "es3" },
  marks: 11,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "<em>Answer the WHOLE of this question without a calculator.</em><br>Simplify: &nbsp;√48 + √300 − √27", af: "<em>Beantwoord die HELE vraag sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;√48 + √300 − √27",
      },
      hint: {
        en: "Break every number under the root into its prime factors first. Then hunt for factors that come in pairs — those are the ones with tickets out.", af: "Breek elke getal onder die wortel eers in sy priemfaktore op. Soek dan faktore wat in pare kom: dit is die faktore met kaartjies uit.",
      },
      memo: [
        { type: "step", text: { en: "Rewrite every base as a product of prime factors first — that is the only way to see which factors have <b>tickets out</b>.", af: "Skryf eers elke grondtal as 'n produk van priemfaktore: dit is die enigste manier om te sien watter faktore <b>kaartjies uit</b> het." } },
        { type: "step", text: { en: "√48 + √300 − √27 = √(2⁴ · 3) + √(2² · 3 · 5²) − √(3³)", af: "√48 + √300 − √27 = √(2⁴ · 3) + √(2² · 3 · 5²) − √(3³)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "A factor leaves the root once for every complete group the root index asks for: here, every pair.", af: "'n Faktor verlaat die wortel een keer vir elke volle groep wat die wortelindeks vra: hier, elke paar." } },
        { type: "step", text: { en: "= 4√3 + 10√3 − 3√3", af: "= 4√3 + 10√3 − 3√3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 11√3", af: "= 11√3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: √x + √y ≠ √(x + y). You may only add or subtract surds once every one of them is the <i>same</i> √ — and then it is nothing more than 4x + 10x − 3x = 11x.", af: "ONTHOU: √x + √y ≠ √(x + y). Jy mag wortelvorme net optel of aftrek sodra elkeen <i>dieselfde</i> √ is, en dan is dit niks meer as 4x + 10x − 3x = 11x nie.",
        } },
      ],
      esplain: {
        en: "Three surds that look completely unrelated turn out to be three helpings of the same thing, and prime factors are what show you that. Under √48 there is a 2⁴, which is two pairs of 2s, so a 4 walks out and a 3 stays behind. Under √300 there is a 2² and a 5², so a 2 and a 5 walk out as 10, and again a 3 stays behind. Under √27 there is 3³, which is one pair of 3s and a spare, so a 3 walks out and a 3 stays. Every single one lands on √3 — and once they are the same √, adding them is just counting: 4 of them plus 10 of them minus 3 of them. A factor earns its ticket out once for every complete group the root index asks for, which for a square root means every pair; that is the whole rule, and it is why you factorise before you do anything else.", af: "Drie wortelvorme wat glad nie verwant lyk nie, is eintlik drie porsies van dieselfde ding, en priemfaktore wys jou dit. Onder √48 is daar 'n 2⁴, dit is twee pare 2's, so 'n 4 stap uit en 'n 3 bly agter. Onder √300 is daar 'n 2² en 'n 5², so 'n 2 en 'n 5 stap uit as 10, en weer bly 'n 3 agter. Onder √27 is daar 3³, dit is een paar 3's en 'n ekstra een, so 'n 3 stap uit en 'n 3 bly. Elkeen beland op √3, en sodra hulle dieselfde √ is, is optel net tel: 4 van hulle plus 10 van hulle min 3 van hulle. 'n Faktor verdien sy kaartjie uit een keer vir elke volle groep wat die wortelindeks vra, en vir 'n vierkantswortel beteken dit elke paar; dit is die hele reël, en dit is hoekom jy faktoriseer voordat jy enigiets anders doen.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>No calculator.</em><br>Show that &nbsp;6 / (√5 − √2) = 2√5 + 2√2", af: "<em>Sonder 'n sakrekenaar.</em><br>Toon aan dat &nbsp;6 / (√5 − √2) = 2√5 + 2√2",
      },
      hint: {
        en: "Start on the left-hand side and drive it down to what you were given. Multiply top and bottom by the conjugate of the denominator — the same two surds with the middle sign swapped.", af: "Begin aan die linkerkant en bring dit tot by wat gegee is. Vermenigvuldig bo en onder met die toegevoegde wortelvorm van die noemer: dieselfde twee wortelvorme met die middelste teken omgedraai.",
      },
      memo: [
        { type: "step", text: { en: "Work on the left-hand side only and drive it down to what is given.", af: "Werk net met die linkerkant en bring dit tot by wat gegee is." } },
        { type: "step", text: { en: "= 6 / (√5 − √2) &nbsp;×&nbsp; (√5 + √2) / (√5 + √2)", af: "= 6 / (√5 − √2) &nbsp;×&nbsp; (√5 + √2) / (√5 + √2)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Multiplying by the <b>conjugate over itself</b> is multiplying by 1, so nothing changes — but the denominator turns into a difference of squares and the surd disappears.", af: "Om met die <b>toegevoegde wortelvorm oor homself</b> te vermenigvuldig, is om met 1 te vermenigvuldig, so niks verander nie, maar die noemer word 'n verskil van vierkante en die wortelvorm verdwyn." } },
        { type: "step", text: { en: "= (6(√5 + √2))/(5 − 2) = (6(√5 + √2))/3", af: "= (6(√5 + √2))/(5 − 2) = (6(√5 + √2))/3" } },
        { type: "answer", text: { en: "= 2(√5 + √2) = 2√5 + 2√2 &nbsp;as required", af: "= 2(√5 + √2) = 2√5 + 2√2 &nbsp;soos vereis" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the conjugate changes <i>only</i> the sign in the middle — the conjugate of √5 − √2 is √5 + √2, not −√5 + √2. And do not start from the right-hand side: a “show that” is worked from one side only.", af: "PASOP: die toegevoegde wortelvorm verander <i>net</i> die teken in die middel: die toegevoegde van √5 − √2 is √5 + √2, nie −√5 + √2 nie. En moenie aan die regterkant begin nie: 'n “toon aan” word van een kant af gewerk.",
        } },
      ],
      esplain: {
        en: "A “show that” is a one-way trip. You are handed the destination, so the marks are for the journey — start on the side you were given and keep going until it turns into the other side. Never start from the answer and work backwards; that proves nothing, because you would be assuming the very thing you were asked to show. The engine here is the conjugate: (√5 − √2)(√5 + √2) is a difference of squares, so it collapses to 5 − 2 = 3, a plain number with no root left in it. And because you multiplied the top by the same thing you multiplied the bottom by, you multiplied the whole fraction by 1 — its value never moved, only its appearance.", af: "'n “Toon aan” is 'n eenrigtingrit. Jy kry die bestemming, so die punte is vir die reis: begin aan die kant wat gegee is en hou aan tot dit die ander kant word. Begin nooit by die antwoord om terug te werk nie; dit bewys niks, want dan neem jy aan juis wat jy moes aantoon. Die enjin hier is die toegevoegde wortelvorm: (√5 − √2)(√5 + √2) is 'n verskil van vierkante, so dit word 5 − 2 = 3, 'n gewone getal met geen wortel meer daarin nie. En omdat jy die teller met dieselfde ding vermenigvuldig het as die noemer, het jy die hele breuk met 1 vermenigvuldig: sy waarde het nooit verander nie, net sy voorkoms.",
      },
    },
    {
      id: "c",
      marks: 4,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Simplify: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">3<sup>x+1</sup> + 3<sup>x−1</sup></span><span class=\"sf-d\">3<sup>x</sup> + 3<sup>x−2</sup></span></span>", af: "<em>Sonder 'n sakrekenaar.</em><br>Vereenvoudig: &nbsp;<span class=\"sfrac\"><span class=\"sf-n\">3<sup>x+1</sup> + 3<sup>x−1</sup></span><span class=\"sf-d\">3<sup>x</sup> + 3<sup>x−2</sup></span></span>",
      },
      hint: {
        en: "There is a + between the terms, so nothing may cancel yet. Divorce every power into 3ˣ times a small number first, then look for the common factor.", af: "Daar is 'n + tussen die terme, so niks mag nog kanselleer nie. Skei eers elke mag in 3ˣ maal 'n klein getal, en soek dan die gemene faktor.",
      },
      memo: [
        { type: "step", text: { en: "There is a + between the terms, so every power gets <b>divorced</b> first: 3<sup>x+1</sup> = 3ˣ · 3 &nbsp;and&nbsp; 3<sup>x−1</sup> = 3ˣ · 3⁻¹.", af: "Daar is 'n + tussen die terme, so elke mag word eers <b>geskei</b>: 3<sup>x+1</sup> = 3ˣ · 3 &nbsp;en&nbsp; 3<sup>x−1</sup> = 3ˣ · 3⁻¹." } },
        { type: "step", text: { en: "= (3ˣ · 3 + 3ˣ · 3⁻¹) / (3ˣ + 3ˣ · 3⁻²)", af: "= (3ˣ · 3 + 3ˣ · 3⁻¹) / (3ˣ + 3ˣ · 3⁻²)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now take out the common factor — always the base carrying the variable exponent.", af: "Haal nou die gemene faktor uit: altyd die grondtal met die veranderlike eksponent." } },
        { type: "step", text: { en: "= 3ˣ(3 + 1/3) / 3ˣ(1 + 1/9) &nbsp;&nbsp;— the + signs are now <b>caged</b>, so 3ˣ may cancel", af: "= 3ˣ(3 + 1/3) / 3ˣ(1 + 1/9) &nbsp;&nbsp;(die + tekens is nou <b>vasgekeer</b>, dus mag 3ˣ kanselleer)" }, ticks: ["ca"] },
        { type: "step", text: { en: "= 10/3 ÷ 10/9", af: "= 10/3 ÷ 10/9" }, ticks: ["ca"] },
        { type: "step", text: { en: "Dividing by a fraction is <b>KFC</b> — keep, flip, change.", af: "Deel deur 'n breuk is <b>KFC</b>: keep, flip, change." } },
        { type: "answer", text: { en: "= 10/3 × 9/10 = 3", af: "= 10/3 × 9/10 = 3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never cancel 3ˣ across a + or a − before it is caged inside a bracket. That one move is exactly what the “caged” rule exists to stop.", af: "PASOP: kanselleer nooit 3ˣ oor 'n + of 'n − voordat dit in 'n hakie vasgekeer is nie. Die “vasgekeer”-reël bestaan juis om daardie een stap te verhoed.",
        } },
      ],
      esplain: {
        en: "The + sign is the whole difficulty here. Cancelling is division, and you may only divide a whole top by a whole bottom — so while the top is a sum of two separate things, 3ˣ is not a factor of it and may not be crossed out. Divorcing is what fixes that: 3<sup>x+1</sup> is nothing more mysterious than 3ˣ multiplied by 3, and 3<sup>x−1</sup> is 3ˣ multiplied by 1/3. Once every term has a visible 3ˣ in it, you can bracket the rest out and the 3ˣ becomes a genuine factor of the whole top and the whole bottom — caged — and only then is it allowed to cancel. What is left is two ordinary fractions divided by each other, and the x has vanished completely: the answer is the plain number 3, whatever x happens to be.", af: "Die + teken is hier die hele probleem. Kanselleer is deel, en jy mag net 'n hele teller deur 'n hele noemer deel, so solank die teller 'n som van twee aparte dinge is, is 3ˣ nie 'n faktor daarvan nie en mag jy dit nie doodtrek nie. Skei is wat dit regmaak: 3<sup>x+1</sup> is niks geheimsinniger as 3ˣ vermenigvuldig met 3 nie, en 3<sup>x−1</sup> is 3ˣ vermenigvuldig met 1/3. Sodra elke term 'n sigbare 3ˣ het, kan jy dit uithaal en die res in 'n hakie sit, en dan is 3ˣ 'n regte faktor van die hele teller en die hele noemer (vasgekeer), en eers dan mag dit kanselleer. Wat oorbly, is twee gewone breuke gedeel deur mekaar, en die x het heeltemal verdwyn: die antwoord is die gewone getal 3, wat x ook al is.",
      },
    },
    {
      id: "d",
      marks: 2,
      level: 3,
      prompt: {
        en: "<em>No calculator.</em><br>Given that 2<sup>x</sup> = a and 3<sup>x</sup> = b, write 72<sup>x</sup> in terms of a and b.", af: "<em>Sonder 'n sakrekenaar.</em><br>Gegee dat 2<sup>x</sup> = a en 3<sup>x</sup> = b, skryf 72<sup>x</sup> in terme van a en b.",
      },
      hint: {
        en: "Prime factors first — always. Split 72 into powers of 2 and 3, and then read the power-of-a-power law backwards.", af: "Priemfaktore eerste, altyd. Breek 72 op in magte van 2 en 3, en lees dan die wet vir 'n mag van 'n mag agteruit.",
      },
      memo: [
        { type: "step", text: { en: "Prime factors first — always.", af: "Priemfaktore eerste, altyd." } },
        { type: "step", text: { en: "72 = 8 × 9 = 2³ · 3²", af: "72 = 8 × 9 = 2³ · 3²" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "72<sup>x</sup> = (2³ · 3²)<sup>x</sup> = 2<sup>3x</sup> · 3<sup>2x</sup> = (2<sup>x</sup>)³ · (3<sup>x</sup>)² = a³b²", af: "72<sup>x</sup> = (2³ · 3²)<sup>x</sup> = 2<sup>3x</sup> · 3<sup>2x</sup> = (2<sup>x</sup>)³ · (3<sup>x</sup>)² = a³b²" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 2<sup>3x</sup> = (2<sup>x</sup>)³ — power of a power works in <i>both</i> directions, and reading it backwards is what turns the question into a and b.", af: "ONTHOU: 2<sup>3x</sup> = (2<sup>x</sup>)³. 'n Mag van 'n mag werk in <i>albei</i> rigtings, en om dit agteruit te lees, is wat die vraag in a en b omskakel.",
        } },
      ],
      esplain: {
        en: "You are given 2<sup>x</sup> and 3<sup>x</sup>, so the only useful shape for 72<sup>x</sup> is one built out of 2<sup>x</sup> and 3<sup>x</sup> — which means 72 has to be pulled apart into 2s and 3s before anything else happens. That gives 2³ · 3², and raising a product to the power x hands the x to both factors: 2<sup>3x</sup> · 3<sup>2x</sup>. The last move is the one people miss. You already know the law (2<sup>x</sup>)³ = 2<sup>3x</sup> going left to right; here you need it going right to left, regrouping 2<sup>3x</sup> as (2<sup>x</sup>)³ so that the a you were handed can be slotted straight in. Same law, read the other way round.", af: "Jy kry 2<sup>x</sup> en 3<sup>x</sup>, so die enigste nuttige vorm vir 72<sup>x</sup> is een wat uit 2<sup>x</sup> en 3<sup>x</sup> gebou is, en dit beteken 72 moet eers in 2's en 3's opgebreek word voordat enigiets anders gebeur. Dit gee 2³ · 3², en as jy 'n produk tot die mag x verhef, kry albei faktore die x: 2<sup>3x</sup> · 3<sup>2x</sup>. Die laaste stap is die een wat mense mis. Jy ken reeds die wet (2<sup>x</sup>)³ = 2<sup>3x</sup> van links na regs; hier het jy dit van regs na links nodig, en groepeer jy 2<sup>3x</sup> weer as (2<sup>x</sup>)³ sodat jy die a wat jy gekry het, reguit kan inprop. Dieselfde wet, net andersom gelees.",
      },
    },
  ],
};

export const expFirstStepAndMethodQuestions = [t1q1];
