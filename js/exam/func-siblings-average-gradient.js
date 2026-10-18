/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "average-gradient"
   (SESSION D1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map: `average-gradient` is one of the four
   NEW Functions tiles.)
   ------------------------------------------------------------
   Six new cards on a tile that did not exist before today. Average
   gradient is a SAG Term 2 item and it is the last page of her own
   Functions notes, so it has been examinable all year with nothing in
   the app to drill it.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her p59 — “average gradient between two points on a curve:
   m = Δy/Δx” — with p4 for the turning point, p10 for the hyperbola,
   p14 for “taking off”, and pp40–45 for the habit of working both
   heights out before doing anything else. The types and the method are
   hers; every number here is fresh. None of the digest's four flagged
   slips is mined, and there are NO DERIVATIVES anywhere: average
   gradient is a Grade 11 idea about a straight line joining two points
   on a curve, and every card here stays on that side of the line.

   WHAT THE SIX COVER:
     q1  a parabola — both heights worked out first, then the formula
     q2  a hyperbola, where the answer comes out negative and the sign
         itself is worth a mark
     q3  from the y-INTERCEPT to the TURNING POINT — the two points have
         to be found before the gradient can be
     q4  an exponential, twice over: the average gradient of the same
         graph over two different stretches, which is what “taking off”
         actually means in numbers
     q5  the algebraic one — between x = 1 and x = 1 + h, simplified
     q6  the question backwards: the average gradient is given, and the
         second point has to be found

   THE FIGURE RULE FOR THIS TILE (session brief, 2026-08-23): the
   QUESTION side shows the curve with the two points marked but NO
   chord — the straight line joining them is the thing being measured,
   so it belongs to the reveal. Every reveal draws that chord as a
   dashed line through the two points, captioned with the gradient it
   found. Where the coordinates of the points are what a part is ASKING
   for, the question side marks them as bare dots and only the reveal
   writes the coordinates on (the bare-figure rule).

   LEVELS: two level-1 parts, eight level-2 and three level-3. Nothing
   here is level 4 — the ★ questions live on the chapter's `level-4`
   tile (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — A PARABOLA, THE PLAIN CASE (her p59).
   f(x) = x² − 4, A at x = −1 and B at x = 3.
     A(−1 ; −3), B(3 ; 5)
     m = (5 − (−3))/(3 − (−1)) = 8/4 = 2, chord y = 2x − 1
   The coordinates are (a)'s answer, so the base figure marks the two
   points as BARE dots and only (a)'s reveal writes them on.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: 1, b: 0, c: -4, tone: "a", label: "f", labelAt: -3.4 };
const Q1_A = { x: -1, y: -3, on: 0, label: "A(−1 ; −3)", place: "belowLeft" };
const Q1_B = { x: 3, y: 5, on: 0, label: "B(3 ; 5)", place: "aboveLeft" };
const Q1_CHORD = { kind: "line", a: 2, q: -1, dash: true, tone: "b", label: "m = 2", labelAt: 4.4 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -5, xmax: 6, ymin: -7, ymax: 10 },
    curves: [Q1_F],
    points: [{ x: -1, y: -3, on: 0 }, { x: 3, y: 5, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q1_A, Q1_B] } },
    b: { question: { points: [Q1_A, Q1_B] }, reveal: { points: [Q1_A, Q1_B], curves: [Q1_CHORD] } },
  },
};

const q1 = {
  id: "func.sib.ag.q1",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-two-points-on-a-parabola",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 4. &nbsp;A and B are the two marked points on f, with x-coordinates &nbsp;−1&nbsp; and&nbsp; 3&nbsp; respectively.<br><br>Determine the coordinates of A and B.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 4. &nbsp;A en B is die twee gemerkte punte op f, met x-koördinate &nbsp;−1&nbsp; en&nbsp; 3&nbsp; onderskeidelik.<br><br>Bepaal die koördinate van A en B.",
      },
      hint: {
        en: "Both points sit on f, so their heights come from the equation. Put each x-value into f and work out the y.", af: "Albei punte lê op f, dus kom hulle hoogtes uit die vergelyking. Sit elke x-waarde in f in en bereken die y.",
      },
      memo: [
        { type: "answer", text: { en: "f(−1) = (−1)² − 4 = 1 − 4 = −3 &nbsp;&nbsp;∴&nbsp; A(−1 ; −3)", af: "f(−1) = (−1)² − 4 = 1 − 4 = −3 &nbsp;&nbsp;∴&nbsp; A(−1 ; −3)" }, ticks: ["a"] },
        { type: "answer", text: { en: "f(3) = (3)² − 4 = 9 − 4 = 5 &nbsp;&nbsp;∴&nbsp; B(3 ; 5)", af: "f(3) = (3)² − 4 = 9 − 4 = 5 &nbsp;&nbsp;∴&nbsp; B(3 ; 5)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (−1)² is +1, not −1. The bracket matters — the whole of −1 is being squared, and a negative times a negative is positive.", af: "PASOP: (−1)² is +1, nie −1 nie. Die hakie maak saak: die hele −1 word gekwadreer, en 'n negatief maal 'n negatief is positief.",
        } },
      ],
      esplain: {
        en: "Before you can measure anything between two points you have to know where both of them are, and that is what this part is for. A point sitting on a graph always has its height decided by the equation, so being told the x is the same as being told the whole point — put the x in and out comes the y. The one place marks go missing is the negative x. Squaring −1 means multiplying −1 by −1, which is +1, so the height at x = −1 is 1 − 4 = −3. Writing (−1)² with the bracket, rather than −1², is a small habit that saves that mark every time. Finish by writing each answer as a coordinate pair, because a point is a place and a place needs both numbers.", af: "Voordat jy enigiets tussen twee punte kan meet, moet jy weet waar albei is, en dit is waarvoor hierdie deel is. 'n Punt op 'n grafiek kry sy hoogte altyd uit die vergelyking, so as jy die x kry, kry jy eintlik die hele punt: sit die x in en die y kom uit. Die een plek waar jy punte verloor, is die negatiewe x. Om −1 te kwadreer beteken −1 maal −1, wat +1 is, dus is die hoogte by x = −1 gelyk aan 1 − 4 = −3. Om (−1)² met die hakie te skryf, eerder as −1², is 'n klein gewoonte wat daardie punt elke keer red. Skryf laastens elke antwoord as 'n koördinaatpaar, want 'n punt is 'n plek en 'n plek het albei getalle nodig.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the average gradient of f between A and B.", af: "Bepaal gevolglik die gemiddelde gradiënt van f tussen A en B.",
      },
      hint: {
        en: "Average gradient is just the gradient of the straight line joining the two points — so it is change in y over change in x. Subtract in the SAME order top and bottom.", af: "Gemiddelde gradiënt is net die gradiënt van die reguit lyn wat die twee punte verbind, dus is dit verandering in y oor verandering in x. Trek in DIESELFDE volgorde bo en onder af.",
      },
      memo: [
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁)", af: "gemiddelde gradiënt = (y₂ − y₁)/(x₂ − x₁)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (5 − (−3))/(3 − (−1)) = 8/4", af: "= (5 − (−3))/(3 − (−1)) = 8/4" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 2", af: "= 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: keep the same order top and bottom. Taking B first on top and A first on the bottom flips the sign of the whole answer.", af: "ONTHOU: hou dieselfde volgorde bo en onder. As jy B eerste bo neem en A eerste onder, draai die teken van die hele antwoord om.",
        } },
      ],
      esplain: {
        en: "The word “average” is doing real work here. A curve does not have one gradient — it is steeper in some places than others — so asking “how steep is f?” has no single answer. What you CAN ask is: if I joined A to B with a ruler, how steep would that ruler be? That straight line is called a chord, and its gradient is the average gradient between the two points. Which means you already know how to do this: it is the same rise-over-run you use for any straight line, change in y over change in x. The two cautions are the order of subtraction, which must match top and bottom, and the double negatives — 5 − (−3) is 8, not 2. An answer of 2 says the curve climbs, on average, two units up for every one across between those points.", af: "Die woord “gemiddelde” doen hier regte werk. 'n Kurwe het nie een gradiënt nie: dit is op sommige plekke steiler as op ander, so die vraag “hoe steil is f?” het nie een antwoord nie. Wat jy WEL kan vra, is: as ek A met 'n liniaal aan B verbind, hoe steil sou daardie liniaal wees? Daardie reguit lyn word 'n koord genoem, en sy gradiënt is die gemiddelde gradiënt tussen die twee punte. Dit beteken jy weet al hoe om dit te doen: dit is dieselfde formule wat jy vir enige reguit lyn gebruik, verandering in y oor verandering in x. Die twee waarskuwings is die volgorde van aftrekking, wat bo en onder moet ooreenstem, en die dubbele negatiewe: 5 − (−3) is 8, nie 2 nie. 'n Antwoord van 2 sê dat die kurwe tussen daardie punte gemiddeld twee eenhede op klim vir elke een eenheid oor.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — A HYPERBOLA, WHERE THE ANSWER IS NEGATIVE (her p10 + p59).
   h(x) = 6/(x − 2) + 1, asymptotes x = 2 and y = 1 (GIVEN, captioned).
   A(3 ; 7) and B(5 ; 3) are both GIVEN in the stem, so both are marked
   and labelled on the question side.
     m = (3 − 7)/(5 − 3) = −4/2 = −2, chord y = −2x + 13
   --------------------------------------------------------------- */
const Q2_H = { kind: "hyperbola", a: 6, p: 2, q: 1, tone: "a", label: "h", labelAt: 6.4 };
const Q2_A = { x: 3, y: 7, on: 0, label: "A(3 ; 7)", place: "aboveRight" };
const Q2_B = { x: 5, y: 3, on: 0, label: "B(5 ; 3)", place: "aboveRight" };
const Q2_CHORD = { kind: "line", a: -2, q: 13, dash: true, tone: "b", label: "m = −2", labelAt: 6.6 };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 9, ymin: -6, ymax: 11 },
    curves: [Q2_H],
    asymptotes: [{ x: 2, of: 0, label: "x = 2" }, { y: 1, of: 0, label: "y = 1" }],
    points: [Q2_A, Q2_B],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q2_CHORD] } },
    b: { question: { curves: [Q2_CHORD] }, reveal: { curves: [Q2_CHORD] } },
  },
};

const q2 = {
  id: "func.sib.ag.q2",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-on-a-hyperbola-with-a-negative-answer",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the hyperbola h, defined by &nbsp;h(x) = 6/(x − 2) + 1, &nbsp;with asymptotes &nbsp;x = 2&nbsp; and&nbsp; y = 1. &nbsp;A and B lie on h, with x-coordinates &nbsp;3&nbsp; and&nbsp; 5&nbsp; respectively.<br><br>Determine the average gradient of h between A and B.", af: "Die skets toon die hiperbool h, gedefinieer deur &nbsp;h(x) = 6/(x − 2) + 1, &nbsp;met asimptote &nbsp;x = 2&nbsp; en&nbsp; y = 1. &nbsp;A en B lê op h, met x-koördinate &nbsp;3&nbsp; en&nbsp; 5&nbsp; onderskeidelik.<br><br>Bepaal die gemiddelde gradiënt van h tussen A en B.",
      },
      hint: {
        en: "Work out both heights before you reach for the formula — put x = 3 and then x = 5 into h. After that it is change in y over change in x, exactly as for a parabola.", af: "Bereken albei hoogtes voordat jy na die formule gryp: sit x = 3 en dan x = 5 in h in. Daarna is dit verandering in y oor verandering in x, presies soos vir 'n parabool.",
      },
      memo: [
        { type: "step", text: { en: "h(3) = 6/(3 − 2) + 1 = 6 + 1 = 7 &nbsp;&nbsp;∴&nbsp; A(3 ; 7)", af: "h(3) = 6/(3 − 2) + 1 = 6 + 1 = 7 &nbsp;&nbsp;∴&nbsp; A(3 ; 7)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "h(5) = 6/(5 − 2) + 1 = 2 + 1 = 3 &nbsp;&nbsp;∴&nbsp; B(5 ; 3)", af: "h(5) = 6/(5 − 2) + 1 = 2 + 1 = 3 &nbsp;&nbsp;∴&nbsp; B(5 ; 3)" }, ticks: ["ca"] },
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁) = (3 − 7)/(5 − 3) = −4/2", af: "gemiddelde gradiënt = (y₂ − y₁)/(x₂ − x₁) = (3 − 7)/(5 − 3) = −4/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −2", af: "= −2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "The graph being a hyperbola changes nothing about the method — average gradient is always the steepness of the straight line joining two points, whatever curve they happen to be sitting on. What does change is the arithmetic getting there, because working out a height now means a fraction. Take it one piece at a time: the bottom of the fraction first, then divide, then add the number on the end. Both points are on the same branch here, to the right of the vertical asymptote, which matters more than it looks: joining two points on OPPOSITE branches would draw a line straight across a gap the graph never crosses, and the answer would be meaningless. Once you have the two heights, the formula is the same one as always.", af: "Dat die grafiek 'n hiperbool is, verander niks aan die metode nie: gemiddelde gradiënt is altyd die steilte van die reguit lyn wat twee punte verbind, op watter kurwe hulle ook al lê. Wat wel verander, is die rekenwerk om daar te kom, want om 'n hoogte te bereken beteken nou 'n breuk. Doen dit stuk vir stuk: eers die onderkant van die breuk, dan deel, dan tel die getal aan die einde by. Albei punte is hier op dieselfde vlerkie, regs van die vertikale asimptoot, en dit maak meer saak as wat dit lyk: as jy twee punte op TEENOORGESTELDE vlerkies verbind, teken jy 'n lyn reg oor 'n gaping wat die grafiek nooit oorsteek nie, en die antwoord sou betekenisloos wees. Sodra jy die twee hoogtes het, is die formule dieselfde een as altyd.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "What does the sign of your answer tell you about h between A and B?", af: "Wat sê die teken van jou antwoord vir jou oor h tussen A en B?",
      },
      hint: {
        en: "Think about what a negative gradient looks like on any straight line, and then look at the chord you have just drawn between A and B.", af: "Dink aan hoe 'n negatiewe gradiënt op enige reguit lyn lyk, en kyk dan na die koord wat jy pas tussen A en B geteken het.",
      },
      memo: [
        { type: "answer", text: { en: "The average gradient is negative, so h is <b>decreasing</b> between A and B — it falls as you move from left to right.", af: "Die gemiddelde gradiënt is negatief, dus is h <b>dalend</b> tussen A en B: dit daal soos jy van links na regs beweeg." }, ticks: ["a"] },
      ],
      esplain: {
        en: "A gradient is a direction as well as a size. Positive means going up as you move right; negative means going down. So the answer of −2 is telling you two separate things at once: the chord from A to B falls, and it falls two units for every one unit across. Look at the picture and it agrees — A is up at height 7 and B is down at 3, so of course the line between them slopes down. This is the free sanity check on every average-gradient answer you will ever work out. Decide from the picture whether the answer should be positive or negative BEFORE you do the arithmetic, and if the sign comes out the other way, you have subtracted in the wrong order somewhere.", af: "'n Gradiënt is 'n rigting sowel as 'n grootte. Positief beteken dit gaan op soos jy regs beweeg; negatief beteken dit gaan af. Die antwoord −2 sê dus vir jou twee aparte dinge tegelyk: die koord van A na B daal, en dit daal twee eenhede vir elke een eenheid oor. Kyk na die prentjie en dit stem saam: A is bo op hoogte 7 en B is onder op 3, so natuurlik loop die lyn tussen hulle afwaarts. Dit is die gratis toets vir elke antwoord oor gemiddelde gradiënt wat jy ooit sal uitwerk. Besluit uit die prentjie of die antwoord positief of negatief moet wees VOORDAT jy die rekenwerk doen, en as die teken anders uitkom, het jy iewers in die verkeerde volgorde afgetrek.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — FROM THE y-INTERCEPT TO THE TURNING POINT (her p4 + p59).
   f(x) = x² − 6x + 5.
     y-intercept (0 ; 5); xTP = −b/(2a) = 3, f(3) = −4 ⟹ TP(3 ; −4)
     m = (−4 − 5)/(3 − 0) = −9/3 = −3, chord y = −3x + 5
   Both points are (a)'s answer, so the base figure carries NONE.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: 1, b: -6, c: 5, tone: "a", label: "f", labelAt: 6.6 };
const Q3_YI = { x: 0, y: 5, on: 0, label: "(0 ; 5)", place: "aboveRight" };
const Q3_TP = { x: 3, y: -4, on: 0, label: "TP(3 ; −4)", place: "below" };
const Q3_CHORD = { kind: "line", a: -3, q: 5, dash: true, tone: "b", label: "m = −3", labelAt: -1.6 };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 9, ymin: -7, ymax: 11 },
    curves: [Q3_F],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q3_YI, Q3_TP] } },
    b: { question: { points: [Q3_YI, Q3_TP] }, reveal: { points: [Q3_YI, Q3_TP], curves: [Q3_CHORD] } },
  },
};

const q3 = {
  id: "func.sib.ag.q3",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-the-y-intercept-and-the-turning-point",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Consider the parabola f, defined by &nbsp;f(x) = x² − 6x + 5.<br><br>Determine the coordinates of the turning point of f and of the point where f cuts the y-axis.", af: "Beskou die parabool f, gedefinieer deur &nbsp;f(x) = x² − 6x + 5.<br><br>Bepaal die koördinate van die draaipunt van f en van die punt waar f die y-as sny.",
      },
      hint: {
        en: "The turning point sits on &nbsp;x = −b/(2a); &nbsp;work that out first and then substitute back for its height. The y-intercept is the number on the end of the equation.", af: "Die draaipunt lê op &nbsp;x = −b/(2a); &nbsp;bereken dit eers en vervang dan terug vir sy hoogte. Die y-afsnit is die getal aan die einde van die vergelyking.",
      },
      memo: [
        { type: "step", text: { en: "a = 1, &nbsp;b = −6: &nbsp;x = −b/(2a) = 6/2 = 3", af: "a = 1, &nbsp;b = −6: &nbsp;x = −b/(2a) = 6/2 = 3" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "f(3) = 9 − 18 + 5 = −4 &nbsp;&nbsp;∴&nbsp; TP(3 ; −4)", af: "f(3) = 9 − 18 + 5 = −4 &nbsp;&nbsp;∴&nbsp; DP(3 ; −4)" }, ticks: ["a"] },
        { type: "answer", text: { en: "y-intercept: &nbsp;f(0) = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)", af: "y-afsnit: &nbsp;f(0) = 5 &nbsp;&nbsp;∴&nbsp; (0 ; 5)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two points, two very different amounts of work. The y-intercept is free: put x = 0 and everything with an x in it vanishes, leaving the last number behind. The turning point takes one formula and one substitution — half of b, sign swapped, over a gives its x, and putting that x back into the equation gives its height. Do them in that order and keep them clearly labelled, because the next part is going to subtract one from the other and it matters which is which. A quick check while you are here: the parabola is happy, so the turning point is its lowest point, and −4 being below 5 agrees with that. From (0 ; 5) down to (3 ; −4) the graph is falling, so expect a negative answer next.", af: "Twee punte, twee baie verskillende hoeveelhede werk. Die y-afsnit is gratis: stel x = 0 en alles met 'n x daarin verdwyn, sodat die laaste getal oorbly. Die draaipunt vra een formule en een vervanging: die helfte van b, met die teken omgeruil, oor a gee sy x, en as jy daardie x terugsit in die vergelyking, kry jy sy hoogte. Doen hulle in daardie volgorde en benoem hulle duidelik, want die volgende deel gaan die een van die ander aftrek en dit maak saak watter een watter is. 'n Vinnige toets terwyl jy hier is: die parabool is happy, dus is die draaipunt sy laagste punt, en −4 wat onder 5 lê, stem daarmee saam. Van (0 ; 5) af na (3 ; −4) daal die grafiek, so verwag volgende 'n negatiewe antwoord.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence determine the average gradient of f between the y-intercept and the turning point.", af: "Bepaal gevolglik die gemiddelde gradiënt van f tussen die y-afsnit en die draaipunt.",
      },
      hint: {
        en: "You now have two points, so this is the ordinary formula. Take the y-intercept as your first point and the turning point as your second, and keep that order top and bottom.", af: "Jy het nou twee punte, so dit is die gewone formule. Neem die y-afsnit as jou eerste punt en die draaipunt as jou tweede, en hou daardie volgorde bo en onder.",
      },
      memo: [
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁)", af: "gemiddelde gradiënt = (y₂ − y₁)/(x₂ − x₁)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (−4 − 5)/(3 − 0) = −9/3", af: "= (−4 − 5)/(3 − 0) = −9/3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −3", af: "= −3" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the answer being negative is not a mistake. Over this stretch the graph really is falling, and a distance would never be negative but a gradient certainly can be.", af: "ONTHOU: dat die antwoord negatief is, is nie 'n fout nie. Oor hierdie stuk daal die grafiek regtig, en 'n afstand sou nooit negatief wees nie, maar 'n gradiënt kan heel goed negatief wees.",
        } },
      ],
      esplain: {
        en: "Once you have two points, the graph they came from stops mattering — average gradient is a question about the two points, and the formula is the same one you used for straight lines all last year. What makes this version worth practising is that neither point was handed to you: one had to be read off the end of the equation and the other had to be worked out. That is how a paper usually asks it. The answer, −3, says that over that stretch the curve drops three units for every one unit across, on average. It is not the steepness anywhere in particular — near the y-axis the curve is falling faster than that, and near the turning point it has almost flattened out — it is the steepness of the straight line joining the two ends.", af: "Sodra jy twee punte het, maak die grafiek waaruit hulle kom nie meer saak nie: gemiddelde gradiënt is 'n vraag oor die twee punte, en die formule is dieselfde een wat jy verlede jaar heeltyd vir reguit lyne gebruik het. Wat hierdie weergawe die moeite werd maak om te oefen, is dat nie een van die punte vir jou gegee is nie: een moes van die einde van die vergelyking afgelees word en die ander moes uitgewerk word. Dit is hoe 'n vraestel dit gewoonlik vra. Die antwoord, −3, sê dat die kurwe oor daardie stuk gemiddeld drie eenhede daal vir elke een eenheid oor. Dit is nie die steilte op 'n spesifieke plek nie: naby die y-as daal die kurwe vinniger as dit, en naby die draaipunt het dit amper heeltemal platgeword. Dit is die steilte van die reguit lyn wat die twee ente verbind.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — AN EXPONENTIAL, MEASURED TWICE (her p14 + p59).
   g(x) = 2ˣ + 1, asymptote y = 1 (GIVEN, captioned).
     A(1 ; 3), B(3 ; 9), C(4 ; 17) — marked as bare dots, since their
     coordinates are worked out in the parts.
     x = 1 → 3:  m = (9 − 3)/(3 − 1) = 3,  chord y = 3x
     x = 3 → 4:  m = (17 − 9)/(4 − 3) = 8, chord y = 8x − 15
   The point of the card is that the SAME graph has a much bigger
   average gradient further right — which is what “taking off” means
   once you put numbers on it.
   --------------------------------------------------------------- */
const Q4_G = { kind: "exp", a: 1, b: 2, p: 0, q: 1, tone: "a", label: "g", labelAt: 3.3 };
const Q4_A = { x: 1, y: 3, on: 0, label: "A(1 ; 3)", place: "belowRight" };
const Q4_B = { x: 3, y: 9, on: 0, label: "B(3 ; 9)", place: "left" };
const Q4_C = { x: 4, y: 17, on: 0, label: "C(4 ; 17)", place: "left" };
const Q4_CH1 = { kind: "line", a: 3, q: 0, dash: true, tone: "b", label: "m = 3", labelAt: 5.2 };
const Q4_CH2 = { kind: "line", a: 8, q: -15, dash: true, tone: "c", label: "m = 8", labelAt: 4.3 };
const Q4_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 6, ymin: -4, ymax: 20 },
    curves: [Q4_G],
    asymptotes: [{ y: 1, of: 0, label: "y = 1" }],
    points: [{ x: 1, y: 3, on: 0 }, { x: 3, y: 9, on: 0 }, { x: 4, y: 17, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q4_A, Q4_B], curves: [Q4_CH1] } },
    b: {
      question: { points: [Q4_A, Q4_B], curves: [Q4_CH1] },
      reveal: { points: [Q4_A, Q4_B, Q4_C], curves: [Q4_CH1, Q4_CH2] },
    },
  },
};

const q4 = {
  id: "func.sib.ag.q4",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-of-an-exponential-over-two-different-stretches",
  paper: PAPER,
  diagram: Q4_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the exponential graph g, defined by &nbsp;g(x) = 2ˣ + 1, &nbsp;with asymptote &nbsp;y = 1. &nbsp;A, B and C are the marked points on g, with x-coordinates &nbsp;1, &nbsp;3&nbsp; and&nbsp; 4.<br><br>Determine the average gradient of g between A and B.", af: "Die skets toon die eksponensiële grafiek g, gedefinieer deur &nbsp;g(x) = 2ˣ + 1, &nbsp;met asimptoot &nbsp;y = 1. &nbsp;A, B en C is die gemerkte punte op g, met x-koördinate &nbsp;1, &nbsp;3&nbsp; en&nbsp; 4.<br><br>Bepaal die gemiddelde gradiënt van g tussen A en B.",
      },
      hint: {
        en: "Work out both heights first — put x = 1 and then x = 3 into g. Then it is change in y over change in x.", af: "Bereken eers albei hoogtes: sit x = 1 en dan x = 3 in g in. Dan is dit verandering in y oor verandering in x.",
      },
      memo: [
        { type: "step", text: { en: "g(1) = 2<sup>1</sup> + 1 = 3 &nbsp;&nbsp;∴&nbsp; A(1 ; 3)", af: "g(1) = 2<sup>1</sup> + 1 = 3 &nbsp;&nbsp;∴&nbsp; A(1 ; 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "g(3) = 2<sup>3</sup> + 1 = 9 &nbsp;&nbsp;∴&nbsp; B(3 ; 9)", af: "g(3) = 2<sup>3</sup> + 1 = 9 &nbsp;&nbsp;∴&nbsp; B(3 ; 9)" }, ticks: ["ca"] },
        { type: "step", text: { en: "average gradient = (y₂ − y₁)/(x₂ − x₁) = (9 − 3)/(3 − 1) = 6/2", af: "gemiddelde gradiënt = (y₂ − y₁)/(x₂ − x₁) = (9 − 3)/(3 − 1) = 6/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 3", af: "= 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Heights first, always. On an exponential that means working out a power, and the two places people slip are forgetting that the number added on the end is part of the height, and reading 2 cubed as 6 instead of 8. Once both points are down the rest is the ordinary formula. The answer of 3 says that between x = 1 and x = 3 the graph climbs, on average, three units up for every one across. Hold on to that number, because the next part measures the same graph over a different stretch and gets something very different — and comparing the two is the whole point of the card.", af: "Hoogtes eerste, altyd. Op 'n eksponensiële grafiek beteken dit dat jy 'n mag uitwerk, en die twee plekke waar mense gly, is om te vergeet dat die getal wat aan die einde bygetel word deel van die hoogte is, en om 2 tot die derde mag as 6 in plaas van 8 te lees. Sodra albei punte neergeskryf is, is die res die gewone formule. Die antwoord van 3 sê dat die grafiek tussen x = 1 en x = 3 gemiddeld drie eenhede op klim vir elke een oor. Hou daardie getal vas, want die volgende deel meet dieselfde grafiek oor 'n ander stuk en kry iets heel anders, en om die twee te vergelyk is die hele doel van die kaart.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Determine the average gradient of g between B and C, and explain what your two answers together tell you about how g is growing.", af: "Bepaal die gemiddelde gradiënt van g tussen B en C, en verduidelik wat jou twee antwoorde saam vir jou sê oor hoe g groei.",
      },
      hint: {
        en: "Work out C's height the same way and use the formula again. Then put the two gradients side by side and ask what it means that the second one is so much bigger.", af: "Bereken C se hoogte op dieselfde manier en gebruik die formule weer. Sit dan die twee gradiënte langs mekaar en vra jouself af wat dit beteken dat die tweede een soveel groter is.",
      },
      memo: [
        { type: "step", text: { en: "g(4) = 2<sup>4</sup> + 1 = 17 &nbsp;&nbsp;∴&nbsp; C(4 ; 17)", af: "g(4) = 2<sup>4</sup> + 1 = 17 &nbsp;&nbsp;∴&nbsp; C(4 ; 17)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "average gradient = (17 − 9)/(4 − 3) = 8/1 = 8", af: "gemiddelde gradiënt = (17 − 9)/(4 − 3) = 8/1 = 8" }, ticks: ["a"] },
        { type: "answer", text: { en: "8 is much bigger than 3, so g is getting steeper as x increases — the graph is <b>taking off</b>, climbing faster and faster the further right you go.", af: "8 is baie groter as 3, dus word g steiler soos x toeneem: die grafiek <b>styg op</b>, en klim al hoe vinniger hoe verder regs jy gaan." }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: an average gradient belongs to the two points you measured between, not to the graph as a whole. “The gradient of g is 3” is not a true sentence — it depends entirely on which stretch you measure.", af: "ONTHOU: 'n gemiddelde gradiënt behoort aan die twee punte waartussen jy gemeet het, nie aan die grafiek as geheel nie. “Die gradiënt van g is 3” is nie 'n ware sin nie: dit hang heeltemal af van watter stuk jy meet.",
        } },
      ],
      esplain: {
        en: "This is what “taking off” looks like once you put numbers on it. Between x = 1 and x = 3 the graph climbed at an average of 3 units per step across; between x = 3 and x = 4 it climbed at 8 — nearly three times as steep, over a stretch half as long. A straight line could never do that, because a straight line has one gradient everywhere. A parabola gets steeper too, but an exponential does it faster and keeps doing it forever, doubling every time x goes up by one. On the picture you can see it in the two dashed chords: the first is a gentle slope, the second is nearly a wall. And the same story runs the other way — go far enough left and the average gradient becomes almost nothing, which is the graph flattening out towards its asymptote.", af: "So lyk “opstyg” sodra jy getalle daaraan sit. Tussen x = 1 en x = 3 het die grafiek gemiddeld 3 eenhede per stap oor geklim; tussen x = 3 en x = 4 het dit 8 geklim: amper drie keer so steil, oor 'n stuk wat half so lank is. 'n Reguit lyn kan dit nooit doen nie, want 'n reguit lyn het oral een gradiënt. 'n Parabool word ook steiler, maar 'n eksponensiële grafiek doen dit vinniger en hou vir ewig aan, en verdubbel elke keer as x met een toeneem. Op die prentjie sien jy dit in die twee gestippelde koorde: die eerste is 'n sagte helling, die tweede is amper 'n muur. En dieselfde storie loop die ander kant toe: gaan ver genoeg links en die gemiddelde gradiënt word amper niks, want die grafiek word platter na sy asimptoot toe.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE ALGEBRAIC ONE: BETWEEN x = 1 AND x = 1 + h (her p59).
   f(x) = x² − 3.
     (a) x = 1 → 3:  A(1 ; −2), B(3 ; 6), m = (6 − (−2))/(3 − 1) = 4
     (b) x = 1 → 1 + h:
           f(1 + h) = (1 + h)² − 3 = h² + 2h − 2, f(1) = −2
           m = (h² + 2h)/h = h + 2
     (c) h = 1 ⟹ m = 3, and the point is (2 ; 1); chord y = 3x − 5
   (a)'s chord IS the h = 2 case, so (b)'s reveal captions it as such —
   the general answer checked against the number already found.
   --------------------------------------------------------------- */
const Q5_F = { kind: "parabola", a: 1, b: 0, c: -3, tone: "a", label: "f", labelAt: -2.4 };
const Q5_A = { x: 1, y: -2, on: 0, label: "A(1 ; −2)", place: "belowRight" };
const Q5_B = { x: 3, y: 6, on: 0, label: "B(3 ; 6)", place: "aboveLeft" };
const Q5_P = { x: 2, y: 1, on: 0, label: "(2 ; 1)", place: "belowRight" };
const Q5_CH_AB = { kind: "line", a: 4, q: -6, dash: true, tone: "b", label: "m = 4", labelAt: 3.6 };
const Q5_CH_H1 = { kind: "line", a: 3, q: -5, dash: true, tone: "c", label: "m = 3", labelAt: 4.1 };
const Q5_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -3, xmax: 5, ymin: -5, ymax: 9 },
    curves: [Q5_F],
    points: [{ x: 1, y: -2, on: 0 }, { x: 3, y: 6, on: 0 }],
  },
  parts: {
    a: { question: {}, reveal: { points: [Q5_A, Q5_B], curves: [Q5_CH_AB] } },
    b: { question: { points: [Q5_A, Q5_B] }, reveal: { points: [Q5_A, Q5_B], curves: [Q5_CH_AB] } },
    c: {
      question: { points: [Q5_A, Q5_B] },
      reveal: { points: [Q5_A, Q5_B, Q5_P], curves: [Q5_CH_AB, Q5_CH_H1] },
    },
  },
};

const q5 = {
  id: "func.sib.ag.q5",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-between-x-and-x-plus-h-simplified",
  paper: PAPER,
  diagram: Q5_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 3, &nbsp;with A and B marked on it at &nbsp;x = 1&nbsp; and&nbsp; x = 3.<br><br>Determine the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 3.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 3, &nbsp;met A en B daarop gemerk by &nbsp;x = 1&nbsp; en&nbsp; x = 3.<br><br>Bepaal die gemiddelde gradiënt van f tussen &nbsp;x = 1&nbsp; en&nbsp; x = 3.",
      },
      hint: {
        en: "Work out f(1) and f(3), then use change in y over change in x.", af: "Bereken f(1) en f(3), en gebruik dan verandering in y oor verandering in x.",
      },
      memo: [
        { type: "step", text: { en: "f(1) = 1 − 3 = −2 &nbsp;and&nbsp; f(3) = 9 − 3 = 6, &nbsp;so&nbsp; A(1 ; −2)&nbsp; and&nbsp; B(3 ; 6)", af: "f(1) = 1 − 3 = −2 &nbsp;en&nbsp; f(3) = 9 − 3 = 6, &nbsp;dus&nbsp; A(1 ; −2)&nbsp; en&nbsp; B(3 ; 6)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "average gradient = (6 − (−2))/(3 − 1) = 8/2 = 4", af: "gemiddelde gradiënt = (6 − (−2))/(3 − 1) = 8/2 = 4" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the warm-up, and it is here for a reason: the next part does exactly the same job in letters instead of numbers, and it is much easier to follow if you have just watched it happen with numbers. Two heights, one subtraction on top, one on the bottom, divide. The answer, 4, is the steepness of the dashed line joining A to B. Notice what it is NOT: it is not how steep the curve is at A, and it is not how steep it is at B. The curve is gentler than that at A and steeper than that at B; 4 is the in-between figure you would get by joining the two ends with a ruler.", af: "Dit is die opwarming, en dit is met 'n rede hier: die volgende deel doen presies dieselfde werk met letters in plaas van getalle, en dit is baie makliker om te volg as jy dit pas met getalle sien gebeur het. Twee hoogtes, een aftrekking bo, een onder, deel. Die antwoord, 4, is die steilte van die stippellyn wat A met B verbind. Let op wat dit NIE is nie: dit is nie hoe steil die kurwe by A is nie, en dit is nie hoe steil dit by B is nie. Die kurwe is by A platter as dit en by B steiler as dit; 4 is die tussen-in-getal wat jy sou kry as jy die twee ente met 'n liniaal verbind.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Determine the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 1 + h. &nbsp;Give your answer in its simplest form.", af: "Bepaal die gemiddelde gradiënt van f tussen &nbsp;x = 1&nbsp; en&nbsp; x = 1 + h. &nbsp;Gee jou antwoord in sy eenvoudigste vorm.",
      },
      hint: {
        en: "Do exactly what you did in (a), but with 1 + h in place of 3. Work out f(1 + h) first — expand the square carefully — and remember that the change in x is (1 + h) − 1, which is just h.", af: "Doen presies wat jy in (a) gedoen het, maar met 1 + h in die plek van 3. Bereken eers f(1 + h), brei die kwadraat versigtig uit, en onthou dat die verandering in x gelyk is aan (1 + h) − 1, wat net h is.",
      },
      memo: [
        { type: "step", text: { en: "f(1 + h) = (1 + h)² − 3 = 1 + 2h + h² − 3 = h² + 2h − 2", af: "f(1 + h) = (1 + h)² − 3 = 1 + 2h + h² − 3 = h² + 2h − 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "f(1) = 1 − 3 = −2, &nbsp;so the change in y is &nbsp;(h² + 2h − 2) − (−2) = h² + 2h", af: "f(1) = 1 − 3 = −2, &nbsp;dus is die verandering in y &nbsp;(h² + 2h − 2) − (−2) = h² + 2h" }, ticks: ["ca"] },
        { type: "step", text: { en: "the change in x is &nbsp;(1 + h) − 1 = h, &nbsp;so &nbsp;average gradient = (h² + 2h)/h", af: "die verandering in x is &nbsp;(1 + h) − 1 = h, &nbsp;dus &nbsp;gemiddelde gradiënt = (h² + 2h)/h" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (h(h + 2))/h = h + 2", af: "= (h(h + 2))/h = h + 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (1 + h)² is NOT 1 + h². The square of a bracket has a middle term — 1 + 2h + h² — and losing it is what makes this answer come out as h instead of h + 2.", af: "PASOP: (1 + h)² is NIE 1 + h² nie. Die kwadraat van 'n hakie het 'n middelterm, 1 + 2h + h², en as jy dit verloor, kom hierdie antwoord as h uit in plaas van h + 2.",
        } },
      ],
      esplain: {
        en: "Nothing new is happening; the second x-value simply has a letter in it. Work out the height there the same way you would for a number, being careful with the square of the bracket: (1 + h)² means (1 + h)(1 + h), which gives 1 + 2h + h². Then subtract the two heights, and watch the double negative — taking away −2 adds 2, which is what makes the constants cancel and leaves h² + 2h. The bottom is the easy half: the distance from 1 to 1 + h is h. Now factorise the top so the h can cancel, and you are left with h + 2. Check it against part (a): going from x = 1 to x = 3 means h = 2, and h + 2 gives 4 — exactly the number you already had.", af: "Niks nuuts gebeur nie; die tweede x-waarde het net 'n letter in. Bereken die hoogte daar op dieselfde manier as vir 'n getal, en wees versigtig met die kwadraat van die hakie: (1 + h)² beteken (1 + h)(1 + h), wat 1 + 2h + h² gee. Trek dan die een hoogte van die ander af, en pas op vir die dubbele negatief: om −2 af te trek, tel 2 by, en dit is wat die konstantes laat kanselleer en h² + 2h laat oorbly. Die onderkant is die maklike helfte: die afstand van 1 tot 1 + h is h. Faktoriseer nou die bokant sodat die h kan kanselleer, en jy bly met h + 2 oor. Toets dit teen deel (a): om van x = 1 na x = 3 te gaan, beteken h = 2, en h + 2 gee 4, presies die getal wat jy reeds gehad het.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the average gradient of f between &nbsp;x = 1&nbsp; and&nbsp; x = 2.", af: "Skryf gevolglik die gemiddelde gradiënt van f tussen &nbsp;x = 1&nbsp; en&nbsp; x = 2 neer.",
      },
      hint: {
        en: "Your answer to (b) is a formula that works for any h. Ask yourself what h has to be to get from x = 1 to x = 2, and put that number in.", af: "Jou antwoord op (b) is 'n formule wat vir enige h werk. Vra jouself af wat h moet wees om van x = 1 na x = 2 te kom, en sit daardie getal in.",
      },
      memo: [
        { type: "step", text: { en: "from &nbsp;x = 1&nbsp; to&nbsp; x = 2&nbsp; the step is &nbsp;h = 1", af: "van &nbsp;x = 1&nbsp; na&nbsp; x = 2&nbsp; is die stap &nbsp;h = 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "average gradient = h + 2 = 1 + 2 = 3", af: "gemiddelde gradiënt = h + 2 = 1 + 2 = 3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "This is the reward for doing (b) in letters: you now have a formula that answers the same question for any second point you like, without starting again. Getting from x = 1 to x = 2 is a step of 1, so h = 1, and the average gradient is 3. Compare the three chords on the picture and a pattern shows itself — a step of 2 gave a gradient of 4, a step of 1 gives 3, and a smaller step would give something smaller still, always 2 more than the step. The chords are lying flatter and flatter as the second point slides back towards A. What they are heading towards is how steep the curve is right AT x = 1, which is a Grade 12 conversation; for now, noticing the pattern is enough.", af: "Dit is die beloning omdat jy (b) met letters gedoen het: jy het nou 'n formule wat dieselfde vraag vir enige tweede punt beantwoord, sonder om weer van voor af te begin. Om van x = 1 na x = 2 te kom, is 'n stap van 1, dus h = 1, en die gemiddelde gradiënt is 3. Vergelyk die drie koorde op die prentjie en 'n patroon wys homself: 'n stap van 2 het 'n gradiënt van 4 gegee, 'n stap van 1 gee 3, en 'n kleiner stap sou iets nog kleiner gee, altyd 2 meer as die stap. Die koorde lê al hoe platter soos die tweede punt terug na A toe skuif. Waarheen hulle op pad is, is hoe steil die kurwe presies BY x = 1 is, en dit is 'n Graad 12-gesprek; vir nou is dit genoeg om die patroon raak te sien.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE QUESTION BACKWARDS: THE GRADIENT IS GIVEN, FIND B.
   f(x) = x² − 1, A(1 ; 0) on f, average gradient between A and B is 4.
     m = (f(b) − 0)/(b − 1) = (b² − 1)/(b − 1) = ((b − 1)(b + 1))/(b − 1) = b + 1
     b + 1 = 4 ⟹ b = 3, and f(3) = 8 ⟹ B(3 ; 8)
   The OR route is the one that carries the trap: cross-multiplying
   gives b² − 4b + 3 = 0 ⟹ (b − 1)(b − 3) = 0, and b = 1 has to be
   thrown away because B would then BE A.
   --------------------------------------------------------------- */
const Q6_F = { kind: "parabola", a: 1, b: 0, c: -1, tone: "a", label: "f", labelAt: -2.6 };
const Q6_A = { x: 1, y: 0, on: 0, label: "A(1 ; 0)", place: "belowRight" };
const Q6_B = { x: 3, y: 8, on: 0, label: "B(3 ; 8)", place: "aboveLeft" };
const Q6_CHORD = { kind: "line", a: 4, q: -4, dash: true, tone: "b", label: "m = 4", labelAt: 0.4 };
const Q6_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 6, ymin: -4, ymax: 11 },
    curves: [Q6_F],
    points: [Q6_A],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }] } },
    b: {
      question: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }] },
      reveal: { curves: [Q6_CHORD], vlines: [{ x: 3, label: "x = 3" }], points: [Q6_B] },
    },
  },
};

const q6 = {
  id: "func.sib.ag.q6",
  chapter: CH,
  topic: "average-gradient",
  archetype: "average-gradient-given-find-the-second-point",
  paper: PAPER,
  diagram: Q6_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 1, &nbsp;with the point A(1 ; 0) marked on it. B is another point on f, and the average gradient of f between A and B is 4.<br><br>Determine the x-coordinate of B.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 1, &nbsp;met die punt A(1 ; 0) daarop gemerk. B is nog 'n punt op f, en die gemiddelde gradiënt van f tussen A en B is 4.<br><br>Bepaal die x-koördinaat van B.",
      },
      hint: {
        en: "Call B's x-coordinate b. Its height is then f(b), so write the average gradient formula out in terms of b, put it equal to 4, and solve. There is a factorising shortcut hiding in the top of the fraction.", af: "Noem B se x-koördinaat b. Sy hoogte is dan f(b), so skryf die formule vir gemiddelde gradiënt in terme van b uit, stel dit gelyk aan 4, en los op. Daar skuil 'n faktoriseer-kortpad in die bokant van die breuk.",
      },
      memo: [
        { type: "step", text: { en: "Let B's x-coordinate be b, so B is the point &nbsp;(b ; b² − 1), &nbsp;and A is (1 ; 0):", af: "Laat B se x-koördinaat b wees, dus is B die punt &nbsp;(b ; b² − 1), &nbsp;en A is (1 ; 0):" }, ticks: ["s/f"] },
        { type: "step", text: { en: "average gradient = ((b² − 1) − 0)/(b − 1) = (b² − 1)/(b − 1)", af: "gemiddelde gradiënt = ((b² − 1) − 0)/(b − 1) = (b² − 1)/(b − 1)" }, ticks: ["ca"] },
        { type: "step", text: { en: "the top is a difference of two squares: &nbsp;((b − 1)(b + 1))/(b − 1) = b + 1", af: "die bokant is 'n verskil van twee vierkante: &nbsp;((b − 1)(b + 1))/(b − 1) = b + 1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "b + 1 = 4 &nbsp;&nbsp;∴&nbsp; b = 3", af: "b + 1 = 4 &nbsp;&nbsp;∴&nbsp; b = 3" }, ticks: ["a"] },
        { type: "step", text: { en: "<b>OR</b> — cross-multiply instead of cancelling:", af: "<b>OF</b>, kruisvermenigvuldig in plaas daarvan om te kanselleer:" } },
        { type: "step", text: { en: "b² − 1 = 4(b − 1) &nbsp;⟹&nbsp; b² − 4b + 3 = 0 &nbsp;⟹&nbsp; (b − 1)(b − 3) = 0 &nbsp;⟹&nbsp; b = 1&nbsp; or&nbsp; b = 3, &nbsp;and b = 1 is rejected &nbsp;∴&nbsp; b = 3", af: "b² − 1 = 4(b − 1) &nbsp;⟹&nbsp; b² − 4b + 3 = 0 &nbsp;⟹&nbsp; (b − 1)(b − 3) = 0 &nbsp;⟹&nbsp; b = 1&nbsp; of&nbsp; b = 3, &nbsp;en b = 1 word verwerp &nbsp;∴&nbsp; b = 3" } },
        { type: "trap", text: {
          en: "WATCH OUT on the second road: b = 1 must be thrown away. If b were 1 then B would BE A, there would be no chord at all, and the fraction's bottom would be zero. Say why you are rejecting it — that is where the mark is.", af: "PASOP op die tweede pad: b = 1 moet weggegooi word. As b gelyk aan 1 was, sou B dieselfde punt as A WEES, daar sou glad nie 'n koord wees nie, en die onderkant van die breuk sou nul wees. Sê waarom jy dit verwerp: daar lê die punt.",
        } },
      ],
      esplain: {
        en: "Every “find the missing point” question works the same way: give the thing you do not know a letter, write down what you DO know using that letter, and solve. Here B's x gets called b, and because B is on the graph its height must be b² − 1 — you are never told that, you work it out. Now the average gradient formula can be written entirely in b, set equal to the 4 you were given, and solved. The tidy road spots that b² − 1 is a difference of two squares, so the (b − 1) on the bottom cancels and what is left is a one-line equation. The other road cross-multiplies and ends in a quadratic with two answers, one of which is nonsense — b = 1 would put B on top of A. Both roads earn full marks; the second one just asks you to explain the rejection.", af: "Elke “vind die ontbrekende punt”-vraag werk op dieselfde manier: gee die ding wat jy nie weet nie 'n letter, skryf neer wat jy WEL weet met daardie letter, en los op. Hier word B se x b genoem, en omdat B op die grafiek lê, moet sy hoogte b² − 1 wees: dit word nooit vir jou gegee nie, jy werk dit uit. Nou kan die formule vir gemiddelde gradiënt heeltemal in b geskryf word, gelyk gestel word aan die 4 wat jy gekry het, en opgelos word. Die netjiese pad sien raak dat b² − 1 'n verskil van twee vierkante is, sodat die (b − 1) onder kanselleer en wat oorbly 'n eenreël-vergelyking is. Die ander pad kruisvermenigvuldig en eindig in 'n kwadratiese vergelyking met twee antwoorde, waarvan een onsin is: b = 1 sou B bo-op A sit. Albei paaie verdien volpunte; die tweede vra net dat jy die verwerping verduidelik.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the coordinates of B.", af: "Skryf gevolglik die koördinate van B neer.",
      },
      hint: {
        en: "You have B's x-coordinate, and B sits on f — so put that x into f to get its height.", af: "Jy het B se x-koördinaat, en B lê op f, so sit daardie x in f in om sy hoogte te kry.",
      },
      memo: [
        { type: "step", text: { en: "f(3) = (3)² − 1 = 8", af: "f(3) = (3)² − 1 = 8" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ &nbsp;B(3 ; 8)", af: "∴ &nbsp;B(3 ; 8)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 4 is the average GRADIENT, not B's height. Writing B(3 ; 4) mixes up the steepness of the chord with the position of its far end.", af: "ONTHOU: 4 is die gemiddelde GRADIËNT, nie B se hoogte nie. As jy B(3 ; 4) skryf, verwar jy die steilte van die koord met die posisie van sy verste ent.",
        } },
      ],
      esplain: {
        en: "One substitution finishes the job, but it is worth checking the answer rather than just writing it. From A(1 ; 0) to B(3 ; 8) the change in y is 8 and the change in x is 2, so the chord's gradient is 8 divided by 2, which is 4 — exactly what the question said it should be. That check costs five seconds and catches every arithmetic slip in the part before. The other thing to keep straight is which number is which. The 4 measures how STEEP the line from A to B is; the 8 is how HIGH B sits. They are different kinds of number and they live in different places on the picture, and mixing them up is the most common way this question is lost.", af: "Een vervanging maak die werk klaar, maar dit is die moeite werd om die antwoord te toets eerder as om dit net neer te skryf. Van A(1 ; 0) na B(3 ; 8) is die verandering in y 8 en die verandering in x 2, dus is die koord se gradiënt 8 gedeel deur 2, wat 4 is: presies wat die vraag gesê het dit moet wees. Daardie toets kos vyf sekondes en vang elke rekenfout in die vorige deel. Die ander ding om reg te hou, is watter getal watter is. Die 4 meet hoe STEIL die lyn van A na B is; die 8 is hoe HOOG B sit. Dit is verskillende soorte getalle en hulle woon op verskillende plekke op die prentjie, en om hulle te verwar is die algemeenste manier waarop hierdie vraag verlore gaan.",
      },
    },
  ],
};

export const funcAverageGradientSiblingQuestions = [q1, q2, q3, q4, q5, q6];
