/* ============================================================
   EXAM FOCUS — Functions · Line & parabola
   ONE fresh question (topic top-up, belongs to no paper).
   (Overnight run #1, 2026-08-21.)
   ------------------------------------------------------------
   ARCHETYPE: GR11-FUNCTIONS-NOTES-DIGEST.md's candidate list, the two
   biggest gaps between her 59 pages of notes and what the app already
   trains — "finding equations from sketches" (her pp25–28, route 1:
   x-intercepts + a point) and "k-value / nature-of-roots questions"
   (her pp52–58, f(x) = k slides a horizontal line). Transformations
   (her pp19–24) carry the middle. Fresh intercepts, fresh point.

   ORIGINALLY DIAGRAM-LIGHT ON PURPOSE (overnight run #1): the schema
   had no diagram field yet, so this question was composed in the
   "equation from a DESCRIPTION" form — every fact a sketch would have
   carried is stated in the stem as words and coordinates instead.
   SESSION 1 (2026-08-22, function-graph engine wired in) added the
   `diagram` block below without touching a single word of the stem or
   memo, exactly as planned: the sketch only ever shows what the words
   already say (or what an earlier part's own memo already revealed),
   never the turning point or the k-range ahead of the part that finds
   them — see the `diagram.parts` comments inline.

   SKELETON DISTANCE — checked against Sept T1 Q4 and Q5:
     · T1 Q4 is a HYPERBOLA (equation from asymptotes + a point).
     · T1 Q5 is a SAD parabola meeting a line, and its level-4 tail is
       a max-vertical-segment plus a two-condition t-range. This one is
       a HAPPY parabola, alone; its equation comes from x-intercepts
       rather than from a turning point; and its k-tail is the opposite
       question — for which k does the sliding line MISS the graph
       entirely. Nothing overlaps.
     · The transformation part (d) has no counterpart anywhere in T1
       (blueprint §6 lists "transformations in function notation" as a
       skill T1 does not test).

   METHOD: GR11-FUNCTIONS-NOTES-DIGEST.md, hers — happy/sad; equation
   of a parabola from two x-intercepts and a point, y = a(x − x₁)(x − x₂);
   x = −b/(2a) then substitute back; turning-point form y = a(x − p)² + q
   with TP(p ; q) "opposite sign"; shifts read off the turning point;
   f(x) = k as a horizontal line sliding across the graph, with Δ rules
   ↔ number of intersections. None of the digest's four flagged slips is
   mined — in particular slip #1 (her p54 f, the sign error on "two real
   positive roots") is avoided entirely, because (e) asks about NO real
   roots and is derived from the minimum, not from her p54 line.

   LEVELS: 2, 2, 1, 3, 4 — ★ on (e), the only part whose deciding fact
   (the minimum value) is not written anywhere in the question.

   REGISTERED via js/exam/cards-func.js (imported there, folded into
   funcCards), which js/exam/index.js's REGISTRY.func picks up; func is
   in js/config.js's EXAM_CHAPTERS. (This note used to say ⚠️
   UNREGISTERED — that was true before cards-func.js wired it in;
   corrected session 3, 2026-08-23.)
   ============================================================ */

/* DIAGRAM (SESSION 1, 2026-08-22). f(x) = 2x² − 6x − 8 = 2(x + 1)(x − 4),
   TP(1,5 ; −12,5) — every number here is read straight off the memo
   above, never invented. The base spec shows only what the STEM itself
   states in words: the two x-intercepts and the y-intercept (0 ; −8) —
   exactly the three given facts (a) works from. The turning point is
   what (b) is ASKED to find, so it is never on the base spec; it is
   added by (b)'s OWN reveal, and then carried (as an ALREADY-GIVEN
   fact) into (c), (d) and (e)'s question side — every card that cuts
   one of those three parts on its own gives the same fact through its
   `intro` (js/exam/cards-func.js's PARABOLA string), so showing it
   there is never ahead of what the learner has already been told. */
const F1 = { kind: "parabola", a: 2, b: -6, c: -8 };
const F1_TP = { x: 1.5, y: -12.5, label: "TP(1,5 ; −12,5)", on: 0, place: "above" };
/* (e)'s answer is k < −12,5 — a FAMILY of horizontal lines with one boundary,
   the line that just grazes the turning point. SESSION 2a-FIX draws that
   boundary on (e)'s reveal (dashed, named), so "below the minimum" is
   something the learner can see rather than only read: any line lower than
   this one passes underneath the whole parabola. */
const F1_K_BOUND = { kind: "line", a: 0, q: -12.5, dash: true, tone: "b", label: "y = −12,5", labelAt: -1.5 };
/* (d)'s answer IS a graph — g = f shifted 2 left and 5 up — so (d)'s reveal
   draws it (tone b, named) beside f, the same rule the axis-of-symmetry shift
   cards follow. */
const G1 = { kind: "parabola", a: 2, p: -0.5, q: -7.5, tone: "b", label: "g", labelAt: -2.2 };
const F1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 6, ymin: -15, ymax: 3 },
    curves: [{ ...F1, tone: "a", label: "f", labelAt: -1.2 }],
    points: [
      { x: -1, y: 0, on: 0, label: "(−1 ; 0)" },
      { x: 4, y: 0, on: 0, label: "(4 ; 0)" },
      { x: 0, y: -8, on: 0, label: "(0 ; −8)" },
    ],
  },
  parts: {
    a: { question: {} },                                       // just the three given facts
    b: { question: {}, reveal: { points: [F1_TP] } },           // TP is the answer — reveal only
    c: { question: { points: [F1_TP] } },                       // TP already given (intro / chain)
    d: { question: { points: [F1_TP] }, reveal: { points: [F1_TP], curves: [G1] } },
    e: { question: { points: [F1_TP] }, reveal: { points: [F1_TP], curves: [F1_K_BOUND] } },
  },
};

const q1 = {
  id: "func.lp.q1",
  chapter: "func",
  topic: "line-and-parabola",
  archetype: "parabola-equation-from-intercepts-then-shift-then-k-value",
  lostQuest: { chapter: "func", quest: "fn2" },
  marks: 13,
  diagram: F1_DIAGRAM,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "A parabola f cuts the x-axis at (−1 ; 0) and at (4 ; 0), and passes through the point (0 ; −8).<br><br>Determine the equation of f in the form y = ax² + bx + c.", af: "'n Parabool f sny die x-as by (−1 ; 0) en by (4 ; 0), en gaan deur die punt (0 ; −8).<br><br>Bepaal die vergelyking van f in die vorm y = ax² + bx + c.",
      },
      hint: {
        en: "When you are handed both x-intercepts, start from the factorised shape y = a(x − x₁)(x − x₂) — the brackets are already decided. The third point is there to pin down the only letter still missing.", af: "As jy albei x-afsnitte kry, begin by die gefaktoriseerde vorm y = a(x − x₁)(x − x₂): die hakies staan reeds vas. Die derde punt is daar om die enigste letter wat nog ontbreek, vas te pen.",
      },
      memo: [
        { type: "step", text: { en: "Two x-intercepts are given, so start from &nbsp;y = a(x − x₁)(x − x₂):", af: "Twee x-afsnitte is gegee, dus begin by &nbsp;y = a(x − x₁)(x − x₂):" } },
        { type: "step", text: { en: "y = a(x + 1)(x − 4)", af: "y = a(x + 1)(x − 4)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "substitute the third point (0 ; −8): &nbsp;−8 = a(0 + 1)(0 − 4) = −4a &nbsp;⟹&nbsp; a = 2", af: "vervang die derde punt (0 ; −8): &nbsp;−8 = a(0 + 1)(0 − 4) = −4a &nbsp;⟹&nbsp; a = 2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "f(x) = 2(x + 1)(x − 4) = 2x² − 6x − 8", af: "f(x) = 2(x + 1)(x − 4) = 2x² − 6x − 8" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the bracket takes the OPPOSITE sign of the intercept. An x-intercept at −1 gives (x + 1), not (x − 1) — check it by asking what x would make the bracket zero.", af: "PASOP: die hakie kry die TEENOORGESTELDE teken van die afsnit. 'n x-afsnit by −1 gee (x + 1), nie (x − 1) nie: kontroleer dit deur te vra watter x die hakie nul sal maak.",
        } },
      ],
      esplain: {
        en: "Two x-intercepts tell you where the graph is zero, and a product is zero exactly when one of its factors is zero — so the two brackets write themselves. What they cannot tell you is how steep or how flat the curve is, because a whole family of parabolas passes through the same two points, some narrow, some wide, some upside down. That is what a is for, and that is why the question gives you a third point: put its x and y into the equation and the only unknown left is a. Once you have it, expand into the form you were asked for — the question said y = ax² + bx + c, so the factorised version is working, not the answer.", af: "Twee x-afsnitte sê vir jou waar die grafiek nul is, en 'n produk is presies nul wanneer een van sy faktore nul is, dus skryf die twee hakies hulself. Wat hulle nie vir jou kan sê nie, is hoe steil of hoe plat die kurwe is, want 'n hele familie parabole gaan deur dieselfde twee punte: party nou, party wyd, party onderstebo. Dit is waarvoor a daar is, en dit is hoekom die vraag vir jou 'n derde punt gee: sit sy x en y in die vergelyking, en die enigste onbekende wat oorbly, is a. Sodra jy dit het, brei uit na die vorm waarvoor gevra is: die vraag het y = ax² + bx + c gesê, dus is die gefaktoriseerde weergawe bewerking, nie die antwoord nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the coordinates of the turning point of f.", af: "Bepaal die koördinate van die draaipunt van f.",
      },
      hint: {
        en: "Find the x of the turning point first with x = −b/(2a), then substitute it back into f to get the y. (There is a quick check available: the turning point always sits exactly midway between the two x-intercepts.)", af: "Kry eers die x van die draaipunt met x = −b/(2a), en vervang dit dan terug in f om die y te kry. (Daar is 'n vinnige kontrole: die draaipunt lê altyd presies halfpad tussen die twee x-afsnitte.)",
      },
      memo: [
        { type: "step", text: { en: "x = −b/(2a) = −(−6)/(2(2)) = 6/4 = 1,5", af: "x = −b/(2a) = −(−6)/(2(2)) = 6/4 = 1,5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "y = 2(1,5)² − 6(1,5) − 8 = 4,5 − 9 − 8 = −12,5", af: "y = 2(1,5)² − 6(1,5) − 8 = 4,5 − 9 − 8 = −12,5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "TP(1,5 ; −12,5)", af: "DP(1,5 ; −12,5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: −b/(2a) gives you only the x of the turning point. Stopping there and writing TP(1,5) throws away the second half of the answer — you still have to substitute back to find the y.", af: "PASOP: −b/(2a) gee jou net die x van die draaipunt. As jy daar stop en DP(1,5) skryf, gooi jy die tweede helfte van die antwoord weg: jy moet nog terugvervang om die y te kry.",
        } },
      ],
      esplain: {
        en: "A parabola is perfectly symmetrical, so its turning point sits on the mirror line, exactly halfway between the two crossings — and −b/(2a) is the formula that finds that halfway x for you. You can check it here without any algebra: the intercepts are at −1 and 4, and halfway between them is 1,5. The y is a separate job. The formula only ever hands you an x, so put that x back into f and work out the height there. Write the answer as a coordinate, with the semicolon; the comma is doing decimal duty in both numbers.", af: "'n Parabool is perfek simmetries, dus lê sy draaipunt op die simmetrie-as, presies halfpad tussen die twee x-afsnitte, en −b/(2a) is die formule wat daardie halfpad-x vir jou vind. Jy kan dit hier sonder enige algebra kontroleer: die afsnitte is by −1 en 4, en halfpad tussen hulle is 1,5. Die y is 'n aparte taak. Die formule gee jou altyd net 'n x, dus sit daardie x terug in f en bereken die hoogte daar. Skryf die antwoord as 'n koördinaat, met die kommapunt; die komma doen in albei getalle diens as desimale komma.",
      },
    },
    {
      id: "c",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down the range of f.", af: "Skryf die waardeversameling van f neer.",
      },
      hint: {
        en: "Range is about y. Which way up is this parabola — and does that make the turning y-value a floor or a ceiling?", af: "Waardeversameling gaan oor y. Watter kant toe wys hierdie parabool, en maak dit die draaipunt se y-waarde 'n vloer of 'n plafon?",
      },
      memo: [
        { type: "answer", text: { en: "a = 2 &gt; 0, so f is <b>happy</b> and −12,5 is its minimum &nbsp;∴ y ≥ −12,5", af: "a = 2 &gt; 0, dus is f <b>happy</b> en −12,5 is sy minimum &nbsp;∴ y ≥ −12,5" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The sign of a decides everything here. It is positive, so the arms point upwards: the graph falls to the turning point, then climbs forever, which makes that turning y-value the lowest the graph ever gets and everything above it reachable. So the range runs upward from it. Had a been negative the parabola would be sad and the same number would have been a ceiling instead, with the range running downwards. One mark, one decision — but it is the decision the whole answer hangs on.", af: "Die teken van a besluit hier alles. Dit is positief, dus wys die arms opwaarts: die grafiek daal tot by die draaipunt en klim dan vir altyd, en dit maak die draaipunt se y-waarde die laagste wat die grafiek ooit kom, en alles daarbo bereikbaar. Die waardeversameling loop dus opwaarts daarvandaan. As a negatief was, sou die parabool sad wees en sou dieselfde getal eerder 'n plafon gewees het, met die waardeversameling wat afwaarts loop. Een punt, een besluit, maar dit is die besluit waaraan die hele antwoord hang.",
      },
    },
    {
      id: "d",
      marks: 3,
      level: 3,
      prompt: {
        en: "The graph of g is obtained by shifting f two units to the LEFT and five units UP.<br>Write down the equation of g in the form y = a(x − p)² + q.", af: "Die grafiek van g word verkry deur f twee eenhede na LINKS en vyf eenhede OP te skuif.<br>Skryf die vergelyking van g in die vorm y = a(x − p)² + q neer.",
      },
      hint: {
        en: "The answer is asked for in turning-point form, so write f in turning-point form first — you already have its turning point. Then move that point, and leave a exactly as it is.", af: "Die antwoord word in draaipunt-vorm gevra, dus skryf f eers in draaipunt-vorm: jy het reeds sy draaipunt. Skuif dan daardie punt, en los a presies soos dit is.",
      },
      memo: [
        { type: "step", text: { en: "Write f in turning-point form first, using TP(1,5 ; −12,5): &nbsp;f(x) = 2(x − 1,5)² − 12,5", af: "Skryf f eers in draaipunt-vorm, met DP(1,5 ; −12,5): &nbsp;f(x) = 2(x − 1,5)² − 12,5" }, ticks: ["s/f"] },
        { type: "step", text: { en: "two units left moves the turning point to x = 1,5 − 2 = −0,5 &nbsp;·&nbsp; five units up moves it to y = −12,5 + 5 = −7,5", af: "twee eenhede links skuif die draaipunt na x = 1,5 − 2 = −0,5 &nbsp;·&nbsp; vyf eenhede op skuif dit na y = −12,5 + 5 = −7,5" }, ticks: ["ca"] },
        { type: "answer", text: { en: "g(x) = 2(x + 0,5)² − 7,5", af: "g(x) = 2(x + 0,5)² − 7,5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: in y = a(x − p)² + q the p sits inside the bracket with the OPPOSITE sign. A turning point at x = −0,5 gives (x + 0,5)², not (x − 0,5)². The q, outside the bracket, keeps its own sign.", af: "ONTHOU: in y = a(x − p)² + q staan die p binne die hakie met die TEENOORGESTELDE teken. 'n Draaipunt by x = −0,5 gee (x + 0,5)², nie (x − 0,5)² nie. Die q, buite die hakie, behou sy eie teken.",
        } },
      ],
      esplain: {
        en: "A shift does not bend a graph, it only carries it — so a never changes, and the width and direction stay exactly as they were. All that moves is the turning point, which makes turning-point form the natural place to work: p and q ARE the turning point's coordinates, so shifting the graph is just shifting two numbers. Two left takes 2 off the x-coordinate; five up adds 5 to the y-coordinate. The only place people lose the mark is the sign flip inside the bracket, and the safe check is to ask what value of x makes the bracket zero — it should be your new turning-point x.", af: "'n Skuif buig nie 'n grafiek nie, dit dra dit net: dus verander a nooit, en die wydte en rigting bly presies soos dit was. Al wat skuif, is die draaipunt, en dit maak draaipunt-vorm die natuurlike plek om te werk: p en q IS die draaipunt se koördinate, dus is om die grafiek te skuif net om twee getalle te skuif. Twee links trek 2 van die x-koördinaat af; vyf op tel 5 by die y-koördinaat. Die enigste plek waar mense die punt verloor, is die tekenomruiling binne die hakie, en die veilige kontrole is om te vra watter waarde van x die hakie nul maak: dit moet jou nuwe draaipunt-x wees.",
      },
    },
    {
      id: "e",
      marks: 3,
      level: 4,
      prompt: {
        en: "Determine the value(s) of k for which the equation f(x) = k will have NO real roots.", af: "Bepaal die waarde(s) van k waarvoor die vergelyking f(x) = k GEEN reële wortels sal hê nie.",
      },
      hint: {
        en: "f(x) = k is a horizontal line y = k sliding up and down across f, and the roots are wherever it cuts. Picture it sliding downwards — at what height does it stop cutting the graph altogether?", af: "f(x) = k is 'n horisontale lyn y = k wat op en af oor f skuif, en die wortels is oral waar dit sny. Sien dit in jou kop afwaarts skuif: op watter hoogte hou dit heeltemal op om die grafiek te sny?",
      },
      memo: [
        { type: "step", text: { en: "f(x) = k is the horizontal line y = k sliding up and down across f. Its roots are the points where the line cuts the parabola, so the question is: where must the line sit to miss it completely?", af: "f(x) = k is die horisontale lyn y = k wat op en af oor f skuif. Sy wortels is die punte waar die lyn die parabool sny, dus is die vraag: waar moet die lyn lê om dit heeltemal te mis?" }, ticks: ["ca"] },
        { type: "step", text: { en: "f is <b>happy</b> with a minimum of −12,5 at TP(1,5 ; −12,5), so a line below that minimum never reaches the graph at all", af: "f is <b>happy</b> met 'n minimum van −12,5 by DP(1,5 ; −12,5), dus bereik 'n lyn onder daardie minimum die grafiek glad nie" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &lt; −12,5", af: "∴ k &lt; −12,5" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: at k = −12,5 exactly, the line touches the turning point — that is ONE real (equal) root, not none. “No real roots” has to be strictly below the minimum: k &lt; −12,5, with no equals sign.", af: "ONTHOU: by presies k = −12,5 raak die lyn die draaipunt: dit is EEN reële (gelyke) wortel, nie geen nie. “Geen reële wortels” moet streng onder die minimum wees: k &lt; −12,5, sonder 'n gelykaanteken.",
        } },
      ],
      esplain: {
        en: "Do not solve 2x² − 6x − 8 = k for x — picture the line instead. Every horizontal line y = k either cuts the parabola twice, touches it once, or misses it, and which of the three happens depends only on where k sits relative to the turning point. This parabola is happy, so it has a floor at −12,5: any line above that floor cuts both arms, a line exactly on it touches at one point, and any line below it passes underneath the whole graph and never meets it. That last case is the one asked for. The fact that decides it, the minimum −12,5, is not something you calculate here — it's a leftover from earlier work, sitting quietly above as given information while this part asks something new of it, which is exactly why this part carries the star. If you would rather do it with algebra, the same answer comes out of Δ &lt; 0 for 2x² − 6x − 8 − k = 0, and both roads earn full marks.", af: "Moenie 2x² − 6x − 8 = k vir x oplos nie; sien eerder die lyn in jou kop. Elke horisontale lyn y = k sny die parabool óf twee keer, raak dit een keer, óf mis dit, en watter een van die drie gebeur, hang net af van waar k lê teenoor die draaipunt. Hierdie parabool is happy, dus het dit 'n vloer by −12,5: enige lyn bo daardie vloer sny albei arms, 'n lyn presies daarop raak by een punt, en enige lyn daaronder gaan onder die hele grafiek verby en ontmoet dit nooit. Daardie laaste geval is die een waarvoor gevra word. Die feit wat dit besluit, die minimum −12,5, is nie iets wat jy hier bereken nie: dit het oorgebly van vroeër werk en staan stil hierbo as gegewe inligting, terwyl hierdie deel iets nuuts daarmee vra. Dit is presies hoekom hierdie deel die ster dra. As jy dit eerder met algebra wil doen, kom dieselfde antwoord uit Δ &lt; 0 vir 2x² − 6x − 8 − k = 0, en albei paaie kry volpunte.",
      },
    },
  ],
};

export const funcLineAndParabolaQuestions = [q1];
