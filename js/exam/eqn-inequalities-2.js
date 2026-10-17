/* ============================================================
   EXAM FOCUS — Equations & Inequalities · Inequalities (top-up)
   ONE fresh question (topic top-up, belongs to no paper), deepening the
   block that Sept T1's Q3 seeds (js/exam/eqn-inequalities.js).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-IEB-PAPER-BANK.md Paper 1 menu, "no-calculator
   opening block (… inequalities)". SURVEY-Nov-P1.md shows the shape in
   every paper: a short linear one (Nov P1 2023 Q3(b)(1),
   −4x + 5 ≤ −11) followed by a factorable quadratic one (Q3(b)(2),
   2x² − 17x &lt; 30; Nov P1 2021 Q1(a)(3), x² &gt; 3x + 18). Fresh numbers.

   SKELETON DISTANCE — checked against Sept T1 Q3(a):
     · T1 3(a) is the BRACKET-FLIP variant: already factorised, with a
       −x hiding in the second bracket. Nothing here repeats that — (b)
       starts unfactorised with a positive leading coefficient, and the
       only sign flip in this question is (a)'s, from dividing by −3.
     · (c) is a FRACTION inequality (her B9 guaranteed-positive-square
       case) and (d) runs the whole method BACKWARDS from a given
       answer. Neither appears anywhere in T1.

   METHOD: METHODS-algebra.md hers verbatim — B7 (flip the sign on
   × or ÷ by a negative); B8 "TIP Chips" (everything to the left, no
   negative in front of x², factorise, CP must be "=", then read the
   answer off the sketch as inside/outside of the bowl); B9 step 3 (a
   denominator that is a guaranteed-positive square is dropped and the
   restriction rides after a semicolon). NEVER a sign table, never
   interval notation, never the calculator's semicolon form as a final
   answer — "or" and x on the left, per her highlighted EQ p31 ruling.

   LEVELS: ramped 1 → 2 → 3 → 4, ★ on (d).

   NO DIAGRAM: the print memos draw a small hatched parabola for this
   method. The schema has no diagram field, so (b)'s bowl is described
   in words inside the memo and unpacked in the esplain — the mark
   scheme never depends on the sketch being drawn, only on the CP line
   and the correct region. Good future diagram-engine candidate.

   ⚠️ UNREGISTERED. Registering needs the verify-exam.html Part 2
   widenings listed in js/exam/eqn-k-method.js's header (question count,
   topic list, the eq8 lostQuest assertion — this one points at eq7).
   "inequalities" is already inside the eqn scope wall in Part 6. ✓
   ============================================================ */

const q2 = {
  id: "eqn.ineq.q2",
  chapter: "eqn",
  topic: "inequalities",
  archetype: "linear-then-quadratic-then-fraction-then-reverse",
  lostQuest: { chapter: "eqn", quest: "eq7" },
  marks: 11,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Solve for x: &nbsp;−3x + 7 &gt; 19", af: "Los op vir x: &nbsp;−3x + 7 &gt; 19",
      },
      hint: {
        en: "Treat it exactly like an ordinary equation right up to the last step — and then remember what dividing by a negative number does to the sign in the middle.", af: "Hanteer dit presies soos 'n gewone vergelyking tot by die laaste stap, en onthou dan wat deling deur 'n negatiewe getal aan die teken in die middel doen.",
      },
      memo: [
        { type: "step", text: { en: "−3x &gt; 12", af: "−3x &gt; 12" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x &lt; −4 &nbsp;&nbsp;(dividing by a negative flips the sign)", af: "∴ x &lt; −4 &nbsp;&nbsp;(deel deur 'n negatief draai die teken om)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the sign only flips when you multiply or divide by a NEGATIVE. Subtracting 7 from both sides at the start does nothing to it — that step is completely ordinary.", af: "ONTHOU: die teken draai net om as jy met 'n NEGATIEF vermenigvuldig of daardeur deel. Om aan die begin 7 van albei kante af te trek, doen niks daaraan nie: daardie stap is heeltemal gewoon.",
        } },
      ],
      esplain: {
        en: "A linear inequality is solved the same way as a linear equation, with one extra rule at the end. Think about why the rule exists: 2 is less than 5, but multiply both by −1 and −2 is bigger than −5. Multiplying or dividing by a negative reverses the order of every number on the line, so the inequality sign has to reverse with it. Everything else — adding, subtracting, dividing by a positive — leaves the order alone and needs no flip at all.", af: "'n Lineêre ongelykheid word op dieselfde manier as 'n lineêre vergelyking opgelos, met een ekstra reël aan die einde. Dink oor hoekom die reël bestaan: 2 is kleiner as 5, maar vermenigvuldig albei met −1 en −2 is groter as −5. Om met 'n negatief te vermenigvuldig of daardeur te deel, draai die volgorde van elke getal op die getallelyn om, dus moet die ongelykheidsteken saam omdraai. Alles anders laat die volgorde net so en hoef glad nie om te draai nie: optel, aftrek, en deel deur 'n positief.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Solve for x: &nbsp;2x² + 5x &lt; 3", af: "Los op vir x: &nbsp;2x² + 5x &lt; 3",
      },
      hint: {
        en: "Everything to the left first, and check there is no negative in front of the x². Then the critical points come from setting each factor equal to zero — and the sketch tells you which piece to keep.", af: "Eers alles na links, en maak seker daar is geen negatief voor die x² nie. Dan kom die kritieke waardes daaruit dat jy elke faktor gelyk aan nul stel, en die skets sê vir jou watter stuk om te hou.",
      },
      memo: [
        { type: "step", text: { en: "Everything to the left, and there is no negative in front of the x², so no flip is needed:", af: "Alles na links, en daar is geen negatief voor die x² nie, dus hoef die teken nie om te draai nie:" } },
        { type: "step", text: { en: "2x² + 5x − 3 &lt; 0 &nbsp;⟹&nbsp; (2x − 1)(x + 3) &lt; 0", af: "2x² + 5x − 3 &lt; 0 &nbsp;⟹&nbsp; (2x − 1)(x + 3) &lt; 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "CP: &nbsp;2x − 1 = 0 &nbsp;or&nbsp; x + 3 = 0 &nbsp;⟹&nbsp; x = 1/2 &nbsp;or&nbsp; x = −3", af: "Kritieke waardes: &nbsp;2x − 1 = 0 &nbsp;of&nbsp; x + 3 = 0 &nbsp;⟹&nbsp; x = 1/2 &nbsp;of&nbsp; x = −3" }, ticks: ["ca"] },
        { type: "step", text: { en: "It is a <b>happy</b> parabola cutting the x-axis at −3 and at 1/2, and &lt; 0 means below the axis — the <b>inside of the bowl</b>.", af: "Dit is 'n <b>happy</b> parabool wat die x-as by −3 en by 1/2 sny, en &lt; 0 beteken onder die as: <b>binne die bak</b>." } },
        { type: "answer", text: { en: "∴ −3 &lt; x &lt; 1/2", af: "∴ −3 &lt; x &lt; 1/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never write the answer as the calculator gives it — “x &lt; 1/2 ; −3 &lt; x” is not an answer. Rewrite it with x on the left, in one string, and use the word “or” when the answer really is two separate pieces.", af: "PASOP: moet nooit die antwoord skryf soos die sakrekenaar dit gee nie: “x &lt; 1/2 ; −3 &lt; x” is nie 'n antwoord nie. Skryf dit oor met x links, in een stuk, en gebruik die woord “of” as die antwoord regtig twee aparte stukke is.",
        } },
      ],
      esplain: {
        en: "The brackets are not two small inequalities to be solved one at a time — they are one parabola, and the question is which stretch of it lies below the x-axis. The critical points are simply where the curve crosses, so they are the only places the sign can change. Because the leading coefficient is positive the parabola is happy, and a happy parabola dips below the axis only in the dip between its two crossings: the inside of the bowl. Note the direction of the answer, too — the smaller critical point goes on the left, exactly as the numbers sit on a number line.", af: "Die hakies is nie twee klein ongelykhede wat een vir een opgelos moet word nie: hulle is een parabool, en die vraag is watter stuk daarvan onder die x-as lê. Die kritieke waardes is bloot waar die kurwe die as kruis, dus is dit die enigste plekke waar die teken kan verander. Omdat die leidende koëffisiënt positief is, is die parabool happy, en 'n happy parabool sak net onder die as in die duik tussen sy twee snypunte: binne die bak. Let ook op die rigting van die antwoord: die kleiner kritieke waarde kom links, presies soos die getalle op 'n getallelyn sit.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Solve for x: &nbsp;(x − 1)/x² ≤ 0", af: "Los op vir x: &nbsp;(x − 1)/x² ≤ 0",
      },
      hint: {
        en: "Have a good look at the denominator before you do anything. It is a square — what does that tell you about its sign, and which single value does it forbid?", af: "Kyk goed na die noemer voordat jy iets doen. Dit is 'n vierkant: wat sê dit vir jou oor sy teken, en watter enkele waarde verbied dit?",
      },
      memo: [
        { type: "step", text: { en: "The denominator x² is a square, so it is positive for every x except 0 — it can never flip the sign of the fraction.", af: "Die noemer x² is 'n vierkant, dus is dit positief vir elke x behalwe 0: dit kan nooit die teken van die breuk omdraai nie." } },
        { type: "step", text: { en: "x² &gt; 0 for all x ≠ 0, so drop it and carry the restriction: &nbsp;x − 1 ≤ 0 ; x ≠ 0", af: "x² &gt; 0 vir alle x ≠ 0, dus laat dit weg en dra die beperking saam: &nbsp;x − 1 ≤ 0 ; x ≠ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "x ≤ 1", af: "x ≤ 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ x ≤ 1 ; x ≠ 0", af: "∴ x ≤ 1 ; x ≠ 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: never cross-multiply an inequality by a denominator that can change sign — you would have no idea whether to flip. x² is safe precisely because a square is never negative. But the x ≠ 0 has to ride along after a semicolon, or your answer is wrong at exactly one point.", af: "PASOP: moet nooit 'n ongelykheid kruisvermenigvuldig met 'n noemer wat van teken kan verander nie: jy sal geen idee hê of jy moet omdraai nie. x² is veilig juis omdat 'n vierkant nooit negatief is nie. Maar die x ≠ 0 moet ná 'n kommapunt saamry, anders is jou antwoord by presies een punt verkeerd.",
        } },
      ],
      esplain: {
        en: "A fraction's sign is decided by the top and the bottom together, so normally you cannot just ignore the denominator. This one is a special case, and it is worth knowing why: x² is a square, so wherever it exists it is positive, and multiplying an inequality by a positive number changes nothing at all. That lets you lift the denominator out of the way and work with the numerator alone. What the denominator does leave behind is a hole — x = 0 was never allowed, because that is where the fraction is undefined — and that hole has to be written into the answer. Her layout for that is the restriction after a semicolon, which is how you say “everything up to 1, except that one missing point”.", af: "'n Breuk se teken word deur bo en onder saam bepaal, dus kan jy gewoonlik nie die noemer net ignoreer nie. Hierdie een is 'n spesiale geval, en dit is die moeite werd om te weet hoekom: x² is 'n vierkant, dus is dit oral waar dit bestaan positief, en om 'n ongelykheid met 'n positiewe getal te vermenigvuldig, verander glad niks nie. Dit laat jou die noemer uit die pad lig en met die teller alleen werk. Wat die noemer wel agterlaat, is 'n gat: x = 0 was nooit toegelaat nie, want daar is die breuk onbepaald, en daardie gat moet in die antwoord ingeskryf word. Haar uitleg daarvoor is die beperking ná 'n kommapunt, en so sê jy “alles tot by 1, behalwe daardie een ontbrekende punt”.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 4,
      prompt: {
        en: "The solution of &nbsp;x² + bx + c ≤ 0 &nbsp;is &nbsp;−2 ≤ x ≤ 5.<br>Determine the values of b and c.", af: "Die oplossing van &nbsp;x² + bx + c ≤ 0 &nbsp;is &nbsp;−2 ≤ x ≤ 5.<br>Bepaal die waardes van b en c.",
      },
      hint: {
        en: "Run the method backwards. In an ordinary question the two ends of the answer come from somewhere — where exactly? Work out what those two numbers must be for this parabola, and build it back up from there.", af: "Werk die metode agteruit. In 'n gewone vraag kom die twee ente van die antwoord êrens vandaan: waar presies? Werk uit wat daardie twee getalle vir hierdie parabool moet wees, en bou dit van daar af weer op.",
      },
      memo: [
        { type: "step", text: { en: "The two ends of the answer are the CP, so they are the roots of the quadratic: &nbsp;x = −2 &nbsp;and&nbsp; x = 5 &nbsp;⟹&nbsp; (x + 2)(x − 5) ≤ 0", af: "Die twee ente van die antwoord is die kritieke waardes, dus is hulle die wortels van die kwadratiese vergelyking: &nbsp;x = −2 &nbsp;en&nbsp; x = 5 &nbsp;⟹&nbsp; (x + 2)(x − 5) ≤ 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "(x + 2)(x − 5) = x² − 5x + 2x − 10 = x² − 3x − 10", af: "(x + 2)(x − 5) = x² − 5x + 2x − 10 = x² − 3x − 10" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ b = −3 &nbsp;and&nbsp; c = −10", af: "∴ b = −3 &nbsp;en&nbsp; c = −10" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the answer being BETWEEN the two numbers is what tells you the region is the inside of the bowl. If the given solution had read x ≤ −2 or x ≥ 5 — the two arms — the same b and c would go with a ≥ sign instead. The numbers come from the roots; the sign comes from which region was kept.", af: "ONTHOU: dat die antwoord TUSSEN die twee getalle lê, sê vir jou die gebied is binne die bak. As die gegewe oplossing x ≤ −2 of x ≥ 5 was, die twee arms, sou dieselfde b en c eerder by 'n ≥-teken hoort. Die getalle kom van die wortels; die teken kom van watter gebied gehou is.",
        } },
      ],
      esplain: {
        en: "The fact you have to fetch here is that the two numbers in the answer are not decoration — they are the critical points, and the critical points are the roots of the quadratic. Once you see that, the question is no harder than Grade 10: you know the roots, so you know the factors, and multiplying the factors out hands you b and c. Two checks are worth doing before you write the answer down. First, the coefficient of x² is 1 in both the question and your expansion, so nothing needs scaling. Second, the answer runs BETWEEN the roots, which fits a happy parabola with ≤ 0 — and a happy parabola is exactly what x² with a coefficient of 1 gives you. Everything agrees, so the values stand.", af: "Die feit wat jy hier moet gaan haal, is dat die twee getalle in die antwoord nie versiering is nie: hulle is die kritieke waardes, en die kritieke waardes is die wortels van die kwadratiese vergelyking. Sodra jy dit sien, is die vraag nie moeiliker as Graad 10 nie: jy ken die wortels, dus ken jy die faktore, en as jy die faktore uitvermenigvuldig, gee dit jou b en c. Twee toetse is die moeite werd voordat jy die antwoord neerskryf. Eerstens is die koëffisiënt van x² gelyk aan 1 in die vraag sowel as in jou uitbreiding, dus hoef niks geskaal te word nie. Tweedens lê die antwoord TUSSEN die wortels, wat pas by 'n happy parabool met ≤ 0, en 'n happy parabool is presies wat x² met 'n koëffisiënt van 1 jou gee. Alles klop, dus bly die waardes staan.",
      },
    },
  ],
};

export const eqnInequalitiesTopUpQuestions = [q2];
