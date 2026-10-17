/* ============================================================
   EXAM FOCUS — Equations & Inequalities · Inequalities
   SOURCE: September Test 1 (practice), QUESTION 3 — the quadratic
   inequality plus the starred "real for ALL p" nature-of-roots proof.
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   PRINT SOURCE:
     Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\
       Sept-T1-Practice-QP.tex      Q3(a)–(b)
       Sept-T1-Practice-Memo.tex    3(a)–3(b), 7 ticks, ★ on 3(b)
       Sept-T1-blueprint.md         §1, §5 judgement call 7
   Same working, same ticks, same WATCH OUT / REMEMBER cards as print.

   TOPIC CHOICE (judgement call, flagged to the foreman): the printed
   question is titled "Inequalities and the nature of the roots" and
   straddles eq7 and eq8. It is filed under `inequalities` — 3(a) leads
   the question, and filing it there keeps eqn/nature-of-roots at
   EXACTLY the plan's "starting depth: 5 questions per topic block"
   (4 live pilot questions + the one fresh top-up composed tonight in
   js/exam/eqn-nature-of-roots-2.js) instead of overshooting to 6, while
   seeding the inequalities block with its first question. lostQuest
   follows the topic: eq7, the round that teaches the flip/CP/bowl
   method 3(a) runs on. A learner lost on 3(b) still has eq8 one tap
   away through the nature-of-roots block itself.

   METHOD: METHODS-algebra.md hers verbatim — B8 "TIP Chips": everything
   to the left, no negative in front of x², bracket-flip turns the
   inequality sign around, CP must be "=", then read the answer off the
   sketch as inside/outside of the bowl (NEVER a sign table, never
   interval notation). B12(b) for 3(b): complete the square ON the
   discriminant and read its minimum off the turning point — her own
   distinctive move (EQ p48).

   SKETCHES: the print memo draws two small TikZ pictures — the hatched
   happy parabola for 3(a) and the Δ-vs-p parabola with TP(3;4) for
   3(b). The schema has no diagram field, so both are carried IN WORDS
   inside the memo steps and unpacked further in `esplain`; nothing in
   the mark scheme depends on the picture being drawn. When the diagram
   engine lands (EXAM-FOCUS-PLAN.md build order step 3), these two are
   good first non-circle candidates.

   LEVELS: blueprint splits (3(a) = 1·L1 + 2·L2; 3(b) = 1·L3 + 3·L4).
   Dominant chunk per part → 3(a) level 2, 3(b) level 4. 3(b) is one of
   the print memo's three ★ parts, so the amber star the schema derives
   from level === 4 lands exactly where the printed paper puts it. ✓

   ⚠️ UNREGISTERED. Registering needs the same three verify-exam.html
   Part 2 widenings listed in js/exam/eqn-k-method.js's header (question
   count, topic list, the "every eqn lostQuest is eq8" assertion — this
   one points at eq7). "inequalities" IS already inside the existing eqn
   scope wall in Part 6. ✓
   ============================================================ */

const PAPER = "sept-t1";

const t1q3 = {
  id: "eqn.ineq.t1q3",
  chapter: "eqn",
  topic: "inequalities",
  archetype: "bracket-flip-inequality-plus-real-for-all-p",
  paper: PAPER,
  lostQuest: { chapter: "eqn", quest: "eq7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;(x + 1)(5 − x) ≥ 0", af: "Los op vir x: &nbsp;(x + 1)(5 − x) ≥ 0",
      },
      hint: {
        en: "It looks factorised already — but look at the second bracket. A −x in there means a −x² is hiding, and her rule is no negative in front of x². Fix that, and remember what it does to the sign.", af: "Dit lyk reeds gefaktoriseer, maar kyk na die tweede hakie. 'n −x daarin beteken 'n −x² skuil daar, en haar reël is: geen negatief voor x² nie. Maak dit reg, en onthou wat dit aan die teken doen.",
      },
      memo: [
        { type: "step", text: { en: "It is already factorised, but the second bracket has a −x in it, which means a −x² is hiding in there. Multiply that bracket by −1 and <b>turn the inequality sign around</b>:", af: "Dit is reeds gefaktoriseer, maar die tweede hakie het 'n −x daarin, wat beteken 'n −x² skuil daar. Vermenigvuldig daardie hakie met −1 en <b>draai die ongelykheidsteken om</b>:" } },
        { type: "step", text: { en: "(x + 1)(5 − x) ≥ 0 &nbsp;⟹&nbsp; (x + 1)(x − 5) ≤ 0", af: "(x + 1)(5 − x) ≥ 0 &nbsp;⟹&nbsp; (x + 1)(x − 5) ≤ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "CP: &nbsp;x + 1 = 0 &nbsp;or&nbsp; x − 5 = 0 &nbsp;⟹&nbsp; x = −1 &nbsp;or&nbsp; x = 5", af: "Kritieke waardes: &nbsp;x + 1 = 0 &nbsp;of&nbsp; x − 5 = 0 &nbsp;⟹&nbsp; x = −1 &nbsp;of&nbsp; x = 5" }, ticks: ["ca"] },
        { type: "step", text: { en: "It is now a <b>happy</b> parabola cutting the x-axis at −1 and at 5, and ≤ 0 means below the axis — the <b>inside of the bowl</b>.", af: "Dit is nou 'n <b>happy</b> parabool wat die x-as by −1 en by 5 sny, en ≤ 0 beteken onder die as: <b>binne die bak</b>." } },
        { type: "answer", text: { en: "∴ −1 ≤ x ≤ 5", af: "∴ −1 ≤ x ≤ 5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (x + 1)(5 − x) ≥ 0 does <b>not</b> mean x + 1 ≥ 0 <i>and</i> 5 − x ≥ 0. Two numbers whose product is positive do not each have to be positive. Take everything to the left, make sure there is no negative in front of the x², find the CP, then read the answer off the sketch.", af: "PASOP: (x + 1)(5 − x) ≥ 0 beteken <b>nie</b> x + 1 ≥ 0 <i>en</i> 5 − x ≥ 0 nie. Twee getalle met 'n positiewe produk hoef nie elkeen positief te wees nie. Bring alles na links, maak seker daar is geen negatief voor die x² nie, vind die kritieke waardes, en lees dan die antwoord van die skets af.",
        } },
      ],
      esplain: {
        en: "The two brackets are not two little inequalities to be solved separately — they are one parabola, and the question is which stretch of it sits on the right side of the x-axis. That is why the sketch does all the work. First get the parabola the right way up: with a −x hiding in a bracket the curve is sad, so multiply that bracket by −1, and because you multiplied by a negative the inequality sign turns around. Now the critical points, where each bracket is zero, are just the two places the curve crosses the axis. A happy parabola dips below the axis only between its two crossings, so “≤ 0” is the piece between them — inside of the bowl. If the sign had been the other way round you would want the two arms instead, and the answer would read as two pieces joined by “or”.", af: "Die twee hakies is nie twee klein ongelykhede wat apart opgelos moet word nie: hulle is een parabool, en die vraag is watter stuk daarvan aan die korrekte kant van die x-as lê. Daarom doen die skets al die werk. Kry eers die parabool die regte kant op: met 'n −x wat in 'n hakie skuil, is die kurwe sad, dus vermenigvuldig jy daardie hakie met −1, en omdat jy met 'n negatief vermenigvuldig het, draai die ongelykheidsteken om. Nou is die kritieke waardes, waar elke hakie nul is, net die twee plekke waar die kurwe die as kruis. 'n Happy parabool sak net tussen sy twee snypunte onder die as, dus is “≤ 0” die stuk tussen hulle: binne die bak. As die teken andersom was, sou jy eerder die twee arms wou hê, en die antwoord sou twee stukke wees wat met “of” verbind is.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 4,
      prompt: {
        en: "Given: &nbsp;x² + (p − 1)x + (p − 3) = 0, where p is a real number.<br>Show that the roots of this equation are real for ALL real values of p.", af: "Gegee: &nbsp;x² + (p − 1)x + (p − 3) = 0, waar p 'n reële getal is.<br>Toon aan dat die wortels van hierdie vergelyking reëel is vir ALLE reële waardes van p.",
      },
      hint: {
        en: "“Real roots” is a statement about Δ, so write Δ down and see what it turns into. You will get a quadratic in p — and there is one move she uses on a quadratic when she wants to know how small it can possibly get.", af: "“Reële wortels” is 'n uitspraak oor Δ, dus skryf Δ neer en kyk waarin dit verander. Jy kry 'n kwadratiese uitdrukking in p, en daar is een stap wat sy op 'n kwadratiese uitdrukking gebruik as sy wil weet hoe klein dit ooit kan word.",
      },
      memo: [
        { type: "step", text: { en: "“Real roots” is a statement about Δ, so write Δ down and see what it turns into. Here a = 1, &nbsp;b = p − 1, &nbsp;c = p − 3.", af: "“Reële wortels” is 'n uitspraak oor Δ, dus skryf Δ neer en kyk waarin dit verander. Hier is a = 1, &nbsp;b = p − 1, &nbsp;c = p − 3." } },
        { type: "step", text: { en: "Δ = b² − 4ac = (p − 1)² − 4(1)(p − 3)", af: "Δ = b² − 4ac = (p − 1)² − 4(1)(p − 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= p² − 2p + 1 − 4p + 12 = p² − 6p + 13", af: "= p² − 2p + 1 − 4p + 12 = p² − 6p + 13" }, ticks: ["ca"] },
        { type: "step", text: { en: "Δ is itself a quadratic — in p this time — so <b>complete the square on it</b> and the answer falls out. &nbsp;b/2 = 6/2 = 3:", af: "Δ is self 'n kwadratiese uitdrukking, dié keer in p, dus <b>voltooi die vierkant daarop</b> en die antwoord val uit. &nbsp;b/2 = 6/2 = 3:" } },
        { type: "step", text: { en: "Δ = p² − 6p + 3² − 3² + 13 = (p − 3)² + 4", af: "Δ = p² − 6p + 3² − 3² + 13 = (p − 3)² + 4" }, ticks: ["ca"] },
        { type: "step", text: { en: "Sketched as a graph of Δ against p, that is a happy parabola with its turning point at (3 ; 4). A square is never negative, so (p − 3)² ≥ 0, which makes Δ ≥ 4. The smallest Δ can ever be is 4 — and 4 > 0.", af: "As 'n grafiek van Δ teenoor p geskets, is dit 'n happy parabool met sy draaipunt by (3 ; 4). 'n Vierkant is nooit negatief nie, dus is (p − 3)² ≥ 0, wat Δ ≥ 4 maak. Die kleinste wat Δ ooit kan wees, is 4, en 4 > 0." } },
        { type: "answer", text: { en: "∴ Δ > 0 for every real p &nbsp;⟹&nbsp; the roots are real (and unequal) for all real values of p", af: "∴ Δ > 0 vir elke reële p &nbsp;⟹&nbsp; die wortels is reëel (en ongelyk) vir alle reële waardes van p" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: Δ > 0 = real and unequal &nbsp;·&nbsp; Δ = 0 = real, rational and equal &nbsp;·&nbsp; Δ &lt; 0 = non-real. Naming the nature in <i>those</i> words is what earns the last mark — “it works” does not.", af: "ONTHOU: Δ > 0 = reëel en ongelyk &nbsp;·&nbsp; Δ = 0 = reëel, rasionaal en gelyk &nbsp;·&nbsp; Δ &lt; 0 = nie-reëel. Om die aard in <i>daardie</i> woorde te noem, verdien die laaste punt: “dit werk” doen dit nie.",
        } },
      ],
      esplain: {
        en: "You cannot test every value of p — there are infinitely many — so this question needs a move that covers them all in one line. Her move is to notice that Δ, once you multiply it out, is itself a quadratic in p, and completing the square on it tells you the one thing you actually need: the smallest value it can ever take. In (p − 3)² + 4 the bracket is a square, so it can be 0 but never less; that makes 4 the floor. Δ can be huge, Δ can be exactly 4 when p = 3, but Δ can never be zero and never negative — and Δ > 0 is exactly the condition for real, unequal roots. Bank the earlier marks first: 3(a) and the whole of Questions 1 and 2 are ordinary method work, and this one is the part to sit with once the rest of the paper is safely done.", af: "Jy kan nie elke waarde van p toets nie, daar is oneindig baie, dus het hierdie vraag 'n stap nodig wat hulle almal in een reël dek. Haar stap is om raak te sien dat Δ, sodra jy dit uitvermenigvuldig, self 'n kwadratiese uitdrukking in p is, en as jy die vierkant daarop voltooi, sê dit vir jou die een ding wat jy regtig nodig het: die kleinste waarde wat dit ooit kan aanneem. In (p − 3)² + 4 is die hakie 'n vierkant, dus kan dit 0 wees maar nooit minder nie; dit maak 4 die vloer. Δ kan groot wees, Δ kan presies 4 wees as p = 3, maar Δ kan nooit nul of negatief wees nie, en Δ > 0 is presies die voorwaarde vir reële, ongelyke wortels. Kry eers die vroeër punte in die sak: 3(a) en Vrae 1 en 2 in hul geheel is gewone metodewerk, en hierdie een is die deel om mee te sit sodra die res van die vraestel veilig klaar is.",
      },
    },
  ],
};

export const eqnInequalitiesQuestions = [t1q3];
