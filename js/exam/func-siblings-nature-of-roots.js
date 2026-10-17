/* ============================================================
   EXAM FOCUS — Functions · SIBLING CARDS for the skill
   "nature-of-roots"
   (SESSION 2b of the four-session function-diagram build, 2026-08-22.)
   ------------------------------------------------------------
   Three new cards, taking this tile from three to six.

   SOURCE OF THE MATHS: Megan's own Gr11 Functions notes, digested at
     C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\
       GR11-FUNCTIONS-NOTES-DIGEST.md
   Her pp52–58: the Δ rules read against the number of intersections;
   f(x) = k as a horizontal line sliding up and down; g + k as a line
   sliding while it keeps its gradient; tangent = equal roots; and the
   "for which k does it not intersect" card. Types and methods hers,
   every number fresh. Her p54 f) — the digest's flagged slip #1, the
   sign error on "two real positive roots" — is NOT mined anywhere in
   this file, and neither is her p58 derivative.

   WHAT THE THREE COVER, and how each one stays clear of the three
   cards already on this tile:
     · func.lp.q1(e)     a HAPPY parabola, f(x) = k, NO real roots
     · func.hyp.t2q3(e)  a HYPERBOLA and y = −x + k, does not cut
     · func.gt.t1q5(c)   f(x) = t, two unequal POSITIVE roots

     q1  the same horizontal slide as lp.q1(e), but on a SAD parabola,
         and asked the other way round — the ceiling instead of the
         floor, equal roots first and then "no real roots" above it.
         The mirror image of a card she already has, on purpose.
     q2  the TWO-SIDED −c < k < c case, which the brief asks for, but
         built out of a ROTATING line y = kx through the origin rather
         than a sliding one — see the judgement call below.
     q3  tangent = equal roots on a parabola and a sliding line
         y = x + k, then Δ read backwards: cuts, touches or misses.

   ONE JUDGEMENT CALL, recorded for review. The brief asks for one
   two-sided −c < k < c answer. With a SLIDING line the discriminant is
   always LINEAR in k, so the answer can only ever be one-sided; the
   two-sided version needs either a hyperbola with a slanted line —
   which is exactly func.hyp.t2q3(e), the card the brief says not to
   repeat — or a line whose GRADIENT is the k. q2 takes the second
   road: y = kx through the origin against f(x) = x² + 1 gives
   Δ = k² − 4 and the clean symmetric answer −2 < k < 2. It is still
   her method end to end — set them equal, force Δ < 0, read the
   quadratic inequality — but the line rotates instead of sliding.

   THE SLIDING LINE IS ON THE QUESTION SIDE. Every base figure here
   draws the family's line dashed, at one illustrative position, named
   with its own letter still in it — "y = k", "y = kx", "y = x + k" —
   so the learner can see what is sliding or turning before being asked
   where it may sit. The ANSWER's boundary lines are dashed, captioned
   with their real equations, and appear only on the reveal, together
   with the point of contact where there is one
   (js/exam/_schema.js, "the reveal draws what it found").

   LEVELS: mostly 1–2, exactly one level 3 — q2(a), the only part that
   has to clear a quadratic in k and then solve a quadratic INEQUALITY
   in k on top of it. Nothing here is level 4.
   ============================================================ */

const PAPER = "siblings";
const CH = "func";

/* ---------------------------------------------------------------
   q1 — f(x) = k ON A SAD PARABOLA (her pp52–58).
   f(x) = −x² + 4x + 5, x-intercepts −1 and 5, TP(2 ; 9) — a maximum,
   so the turning y-value is a CEILING.
     (a) equal roots   ⟹ k = 9   the line rests on the turning point
     (b) no real roots ⟹ k > 9   every line above the ceiling misses
   The turning point is what the learner has to FETCH — it is nowhere
   in the stem — so it never appears on a question side.
   --------------------------------------------------------------- */
const Q1_F = { kind: "parabola", a: -1, b: 4, c: 5 };
const Q1_XA = { x: -1, y: 0, on: 0, label: "(−1 ; 0)" };
const Q1_XB = { x: 5, y: 0, on: 0, label: "(5 ; 0)" };
const Q1_TP = { x: 2, y: 9, on: 0, label: "TP(2 ; 9)", place: "above" };
/* the boundary line: the one height at which y = k just rests on f */
const Q1_BOUND = { kind: "line", a: 0, q: 9, dash: true, tone: "b", label: "y = 9", labelAt: -3 };
/* one line ABOVE the ceiling, to show what "no real roots" looks like */
const Q1_MISS = { kind: "line", a: 0, q: 11, dash: true, tone: "c", label: "y = 11", labelAt: 5 };
const Q1_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -8, ymax: 13 },
    curves: [
      { ...Q1_F, tone: "a", label: "f", labelAt: 5.5 },
      // the sliding line, drawn at one illustrative height — NOT the answer
      { kind: "line", a: 0, q: 3, dash: true, tone: "c", label: "y = k", labelAt: 6.3 },
    ],
    points: [Q1_XA, Q1_XB],
  },
  parts: {
    // the two x-intercepts are already on the BASE spec, so a highlight
    // only ever ADDS the turning point — a repeat would draw them twice.
    a: { question: {}, reveal: { points: [Q1_TP], curves: [Q1_BOUND] } },
    b: { question: {}, reveal: { points: [Q1_TP], curves: [Q1_BOUND, Q1_MISS] } },
  },
};

const q1 = {
  id: "func.sib.nor.q1",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "horizontal-line-sliding-across-a-sad-parabola-equal-then-no-roots",
  paper: PAPER,
  diagram: Q1_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = −x² + 4x + 5, &nbsp;cutting the x-axis at (−1 ; 0) and (5 ; 0). The dashed line is &nbsp;y = k, &nbsp;drawn at one possible height — it may slide up and down.<br><br>Determine the value of k for which the equation &nbsp;f(x) = k&nbsp; will have equal roots.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = −x² + 4x + 5, &nbsp;wat die x-as by (−1 ; 0) en (5 ; 0) sny. Die stippellyn is &nbsp;y = k, &nbsp;geteken op een moontlike hoogte: dit mag op en af skuif.<br><br>Bepaal die waarde van k waarvoor die vergelyking &nbsp;f(x) = k&nbsp; gelyke wortels sal hê.",
      },
      hint: {
        en: "The roots of f(x) = k are the places where the sliding line cuts the parabola. Picture it sliding upwards — there is exactly one height where two cuts become one.", af: "Die wortels van f(x) = k is die plekke waar die skuiwende lyn die parabool sny. Stel jou voor hoe dit opskuif: daar is presies een hoogte waar twee snypunte een word.",
      },
      memo: [
        { type: "step", text: { en: "f(x) = k is the horizontal line y = k sliding across f, and the roots are where it cuts. Equal roots means the line touches f at exactly ONE point, which happens only at the turning point — so find it.", af: "f(x) = k is die horisontale lyn y = k wat oor f skuif, en die wortels is waar dit sny. Gelyke wortels beteken die lyn raak f by presies EEN punt, en dit gebeur net by die draaipunt: vind dit dus." } },
        { type: "step", text: { en: "x = −b/(2a) = −4/(2(−1)) = 2 &nbsp;&nbsp;⟹&nbsp;&nbsp; y = −(2)² + 4(2) + 5 = −4 + 8 + 5 = 9 &nbsp;&nbsp;TP(2 ; 9)", af: "x = −b/(2a) = −4/(2(−1)) = 2 &nbsp;&nbsp;⟹&nbsp;&nbsp; y = −(2)² + 4(2) + 5 = −4 + 8 + 5 = 9 &nbsp;&nbsp;DP(2 ; 9)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "∴ k = 9", af: "∴ k = 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k is a HEIGHT, so it is the y of the turning point, not the x. Answering k = 2 is the standard slip — 2 is where the touching happens, 9 is how high up it happens.", af: "PASOP: k is 'n HOOGTE, dus is dit die y van die draaipunt, nie die x nie. Om k = 2 te antwoord is die bekende glips: 2 is waar dit raak, 9 is hoe hoog dit raak.",
        } },
      ],
      esplain: {
        en: "Do not solve −x² + 4x + 5 = k for x. Picture the line instead. Every horizontal line either cuts this parabola twice, touches it once, or misses it altogether, and which of the three happens depends on nothing but the height. Because a is negative, f is sad — it climbs to a peak and falls away — so the peak is a ceiling. Slide the line up from the bottom and it keeps cutting twice, until the moment it arrives at the peak and the two cutting points squash into one. That single moment is what “equal roots” means on a picture. So the whole question is really “how high is the peak”, and the answer is the y of the turning point. The x you find on the way there is only the road; the height is the answer. If you would rather do it with algebra, the same 9 comes out of Δ = 0 for x² − 4x + k − 5 = 0, and both roads earn full marks.", af: "Moenie −x² + 4x + 5 = k vir x oplos nie. Stel jou eerder die lyn voor. Elke horisontale lyn sny hierdie parabool twee keer, raak dit een keer, of mis dit heeltemal, en watter een van die drie gebeur, hang van niks anders as die hoogte af nie. Omdat a negatief is, is f sad: dit klim na 'n piek en val weer weg, dus is die piek 'n plafon. Skuif die lyn van onder af op en dit bly twee keer sny, tot die oomblik dat dit by die piek aankom en die twee snypunte saamgedruk word tot een. Daardie enkele oomblik is wat “gelyke wortels” op 'n prentjie beteken. Die hele vraag is dus eintlik “hoe hoog is die piek”, en die antwoord is die y van die draaipunt. Die x wat jy op pad daarheen kry, is net die pad; die hoogte is die antwoord. As jy dit liewer met algebra doen, kom dieselfde 9 uit Δ = 0 vir x² − 4x + k − 5 = 0, en albei paaie verdien volpunte.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Hence write down the values of k for which the equation &nbsp;f(x) = k&nbsp; will have NO real roots.", af: "Skryf gevolglik die waardes van k neer waarvoor die vergelyking &nbsp;f(x) = k&nbsp; GEEN reële wortels sal hê nie.",
      },
      hint: {
        en: "You have just found the one height where the line touches. Keep sliding it in the direction where the parabola is not there any more.", af: "Jy het pas die een hoogte gevind waar die lyn raak. Skuif dit verder in die rigting waar die parabool nie meer is nie.",
      },
      memo: [
        { type: "step", text: { en: "f is <b>sad</b>, so 9 is its maximum — a ceiling. Any line drawn ABOVE that ceiling passes over the whole graph and never meets it.", af: "f is <b>sad</b>, dus is 9 sy maksimum: 'n plafon. Enige lyn BO daardie plafon gaan oor die hele grafiek en ontmoet dit nooit nie." }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ k &gt; 9", af: "∴ k &gt; 9" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: at k = 9 exactly the line still touches f, and touching counts as meeting — that is one real root, not none. So the answer is strictly greater than 9, with no equals sign.", af: "ONTHOU: by presies k = 9 raak die lyn f nog, en raak tel as ontmoet: dit is een reële wortel, nie geen nie. Die antwoord is dus streng groter as 9, sonder 'n gelykteken.",
        } },
      ],
      esplain: {
        en: "Once the boundary is found, the rest of the sliding-line family sorts itself into three groups and you only have to say which side you want. Below 9 the line cuts twice, so there are two real roots. At exactly 9 it rests on the peak, so there is one repeated root. Above 9 there is simply no parabola left to meet, so there are no real roots at all. The one decision worth slowing down for is the boundary itself: an equal root is still a root, so 9 belongs to the touching case and not to this one, which is why the bracket stays open. Worth noticing too that on a HAPPY parabola the same question has the answer the other way round — the turning value is a floor, and the misses are the lines below it. The sign of a is what decides which.", af: "Sodra die grens gevind is, sorteer die res van die skuiflyn-familie homself in drie groepe, en jy hoef net te sê watter kant jy wil hê. Onder 9 sny die lyn twee keer, dus is daar twee reële wortels. By presies 9 rus dit op die piek, dus is daar een herhaalde wortel. Bo 9 is daar eenvoudig geen parabool oor om te ontmoet nie, dus is daar glad geen reële wortels nie. Die een plek om stadig te dink, is die grens self: 'n gelyke wortel is steeds 'n wortel, dus behoort 9 aan die raak-geval en nie aan hierdie een nie, en daarom bly die hakie oop. Let ook op dat dieselfde vraag op 'n HAPPY parabool die antwoord andersom het: die draaipunt se hoogte is 'n vloer, en die lyne wat mis, lê onder dit. Die teken van a besluit watter een.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE TWO-SIDED CASE, from a ROTATING line (see the header's
   judgement call). f(x) = x² + 1 and the line y = kx through the
   origin: x² − kx + 1 = 0, Δ = k² − 4.
     (a) does not cut ⟹ Δ < 0 ⟹ (k − 2)(k + 2) < 0 ⟹ −2 < k < 2
     (b) tangent      ⟹ Δ = 0 ⟹ k = 2 or k = −2, touching at (1 ; 2)
                          and (−1 ; 2)
   LEVEL 3 lives on (a): a quadratic in k, then a quadratic INEQUALITY
   in k on top of it.
   --------------------------------------------------------------- */
const Q2_F = { kind: "parabola", a: 1, b: 0, c: 1 };
const Q2_T_POS = { kind: "line", a: 2, q: 0, dash: true, tone: "b", label: "y = 2x", labelAt: 3.2 };
const Q2_T_NEG = { kind: "line", a: -2, q: 0, dash: true, tone: "b", label: "y = −2x", labelAt: -3 };
const Q2_TOUCH_A = { x: 1, y: 2, on: [0, 2], label: "(1 ; 2)" };
const Q2_TOUCH_B = { x: -1, y: 2, on: [0, 3], label: "(−1 ; 2)" };
const Q2_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 4, ymin: -3, ymax: 10 },
    curves: [
      { ...Q2_F, tone: "a", label: "f", labelAt: -2.6 },
      // the rotating line, drawn at one illustrative gradient — NOT the answer
      { kind: "line", a: 3, q: 0, dash: true, tone: "c", label: "y = kx", labelAt: -0.7 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q2_T_POS, Q2_T_NEG] } },
    b: { question: {}, reveal: { curves: [Q2_T_POS, Q2_T_NEG], points: [Q2_TOUCH_A, Q2_TOUCH_B] } },
  },
};

const q2 = {
  id: "func.sib.nor.q2",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "rotating-line-through-the-origin-against-a-parabola-two-sided-k",
  paper: PAPER,
  diagram: Q2_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 3,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² + 1, &nbsp;together with the line &nbsp;y = kx, &nbsp;drawn dashed at one possible gradient. The line always passes through the origin, but k may change.<br><br>Determine the values of k for which the line will NOT cut f.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² + 1, &nbsp;saam met die lyn &nbsp;y = kx, &nbsp;as stippellyn geteken by een moontlike gradiënt. Die lyn gaan altyd deur die oorsprong, maar k mag verander.<br><br>Bepaal die waardes van k waarvoor die lyn f NIE sal sny nie.",
      },
      hint: {
        en: "“Does not cut” means the two equations have no solution together. Set them equal, bring everything to one side so you have an ordinary quadratic in x, and then ask what the discriminant must do. Watch out at the end — you will be left with a quadratic in k.", af: "“Sny nie” beteken die twee vergelykings het saam geen oplossing nie. Stel hulle gelyk, bring alles na een kant sodat jy 'n gewone kwadratiese vergelyking in x het, en vra dan wat die diskriminant moet doen. Pasop aan die einde: jy sal met 'n kwadratiese uitdrukking in k sit.",
      },
      memo: [
        { type: "step", text: { en: "“Does not cut” means the two equations have <b>no real solution</b> together. Set them equal:", af: "“Sny nie” beteken die twee vergelykings het saam <b>geen reële oplossing</b> nie. Stel hulle gelyk:" } },
        { type: "step", text: { en: "x² + 1 = kx &nbsp;⟹&nbsp; x² − kx + 1 = 0", af: "x² + 1 = kx &nbsp;⟹&nbsp; x² − kx + 1 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "No real roots means Δ &lt; 0, with a = 1, b = −k, c = 1:", af: "Geen reële wortels beteken Δ &lt; 0, met a = 1, b = −k, c = 1:" } },
        { type: "step", text: { en: "Δ = (−k)² − 4(1)(1) = k² − 4 = (k − 2)(k + 2)", af: "Δ = (−k)² − 4(1)(1) = k² − 4 = (k − 2)(k + 2)" }, ticks: ["ca"] },
        { type: "step", text: { en: "(k − 2)(k + 2) &lt; 0 &nbsp;&nbsp;— a happy parabola in k, and “less than zero” is the inside of the bowl", af: "(k − 2)(k + 2) &lt; 0 &nbsp;&nbsp;('n happy parabool in k, en “kleiner as nul” is die binnekant van die bak)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "∴ −2 &lt; k &lt; 2", af: "∴ −2 &lt; k &lt; 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k² &lt; 4 does NOT give k &lt; 2 on its own. It gives −2 &lt; k &lt; 2 — a two-sided answer — because a steep NEGATIVE gradient misses the graph just as a steep positive one cuts it.", af: "PASOP: k² &lt; 4 gee NIE k &lt; 2 op sy eie nie. Dit gee −2 &lt; k &lt; 2, 'n tweekantige antwoord, omdat 'n steil NEGATIEWE gradiënt die grafiek mis net soos 'n steil positiewe een dit sny.",
        } },
      ],
      esplain: {
        en: "Two ideas are stacked in this question, which is what makes it the hard one on this tile. The first is the usual translation: “cutting” and “solving together” are the same thing said two ways, so setting the equations equal turns a picture question into an ordinary quadratic, and the discriminant then reports how many crossings there are. Δ negative means none, which is what was asked. The second idea is the twist. Because the k lives in the GRADIENT rather than being added on, it ends up squared inside Δ — and that means the last line is not a plain inequality but a quadratic one. Factorise it, treat it as its own happy parabola in k, and remember that “less than zero” is the piece between the two roots. Picture the line turning about the origin and it makes sense: lie it almost flat and it passes under the whole parabola, tilt it steeply either way and it eventually catches the arm. So the misses are the shallow gradients in the middle, positive and negative alike.", af: "Twee idees is in hierdie vraag op mekaar gestapel, en dit maak dit die moeilike een op hierdie teël. Die eerste is die gewone vertaling: “sny” en “saam oplos” is dieselfde ding op twee maniere gesê, dus word 'n prentjievraag 'n gewone kwadratiese vergelyking sodra jy die vergelykings gelykstel, en die diskriminant rapporteer dan hoeveel snypunte daar is. 'n Negatiewe Δ beteken geen, en dit is wat gevra is. Die tweede idee is die draai. Omdat die k in die GRADIËNT woon eerder as om bygetel te word, beland dit gekwadreer binne Δ, en dit beteken die laaste stap is nie 'n gewone ongelykheid nie, maar 'n kwadratiese een. Faktoriseer dit, behandel dit as sy eie happy parabool in k, en onthou dat “kleiner as nul” die stuk tussen die twee wortels is. Stel jou voor die lyn draai om die oorsprong, en dit maak sin: lê dit amper plat en dit gaan onder die hele parabool deur, kantel dit steil na enige kant en dit vang uiteindelik die arm. Die lyne wat mis, is dus die plat gradiënte in die middel, positief sowel as negatief.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the values of k for which the line will be a tangent to f, and determine the coordinates of the point of contact for the positive value of k.", af: "Skryf die waardes van k neer waarvoor die lyn 'n raaklyn aan f sal wees, en bepaal die koördinate van die raakpunt vir die positiewe waarde van k.",
      },
      hint: {
        en: "A tangent touches once, which is equal roots — so use the same discriminant, but set it to zero this time. Then put that k back into your quadratic and solve it.", af: "'n Raaklyn raak een keer, en dit is gelyke wortels: gebruik dus dieselfde diskriminant, maar stel dit hierdie keer gelyk aan nul. Sit dan daardie k terug in jou kwadratiese vergelyking en los dit op.",
      },
      memo: [
        { type: "step", text: { en: "A tangent touches f exactly once, so the roots are equal and Δ = 0: &nbsp;k² − 4 = 0 &nbsp;⟹&nbsp; k = 2 &nbsp;or&nbsp; k = −2", af: "'n Raaklyn raak f presies een keer, dus is die wortels gelyk en Δ = 0: &nbsp;k² − 4 = 0 &nbsp;⟹&nbsp; k = 2 &nbsp;of&nbsp; k = −2" }, ticks: ["a"] },
        { type: "answer", text: { en: "for k = 2: &nbsp;x² − 2x + 1 = 0 &nbsp;⟹&nbsp; (x − 1)² = 0 &nbsp;⟹&nbsp; x = 1, &nbsp;and&nbsp; y = (1)² + 1 = 2 &nbsp;&nbsp;∴&nbsp; (1 ; 2)", af: "vir k = 2: &nbsp;x² − 2x + 1 = 0 &nbsp;⟹&nbsp; (x − 1)² = 0 &nbsp;⟹&nbsp; x = 1, &nbsp;en&nbsp; y = (1)² + 1 = 2 &nbsp;&nbsp;∴&nbsp; (1 ; 2)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: k² = 4 has TWO answers, 2 and −2. Taking only the positive square root throws away the tangent on the left-hand side of the graph — and here nothing rules it out, unlike the base of an exponential.", af: "ONTHOU: k² = 4 het TWEE antwoorde, 2 en −2. As jy net die positiewe vierkantswortel neem, gooi jy die raaklyn aan die linkerkant van die grafiek weg, en hier sluit niks dit uit nie, anders as die grondtal van 'n eksponensiële funksie.",
        } },
      ],
      esplain: {
        en: "The tangent case is the boundary between the two cases in part (a), so it costs almost no new work — the same discriminant, set to zero instead of pushed below it. What is worth practising is the second half. Once k is known the quadratic stops having a letter in it, and because Δ is zero it collapses into a perfect square, which is the algebraic fingerprint of touching: one repeated solution instead of two different ones. That solution is the x where the touching happens, and substituting it into either equation gives the height. Doing it in f is usually safer, because the line's equation still has the k in it. And notice how the picture confirms the pair: the two tangents are mirror images of each other in the y-axis, touching at (1 ; 2) and (−1 ; 2), which is exactly what you would expect from a parabola that is itself symmetrical about that axis.", af: "Die raaklyn-geval is die grens tussen die twee gevalle in deel (a), dus kos dit amper geen nuwe werk nie: dieselfde diskriminant, gelyk aan nul gestel in plaas van onder nul gedruk. Wat die moeite werd is om te oefen, is die tweede helfte. Sodra k bekend is, bevat die kwadratiese vergelyking nie meer 'n letter nie, en omdat Δ nul is, val dit ineen tot 'n volkome vierkant, wat die algebraïese vingerafdruk van raak is: een herhaalde oplossing in plaas van twee verskillende. Daardie oplossing is die x waar die raak gebeur, en as jy dit in enige van die twee vergelykings vervang, kry jy die hoogte. Om dit in f te doen is gewoonlik veiliger, omdat die lyn se vergelyking nog die k bevat. En let op hoe die prentjie die paar bevestig: die twee raaklyne is gereflekteerde beelde van mekaar in die y-as, en raak by (1 ; 2) en (−1 ; 2), presies wat jy sou verwag van 'n parabool wat self simmetries om daardie as is.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TANGENT = EQUAL ROOTS, WITH A SLIDING LINE (her pp52–58).
   f(x) = x² − 3x + 6 and the line y = x + k:
     x² − 4x + (6 − k) = 0,  Δ = 16 − 4(6 − k) = 4k − 8
     (a) tangent ⟹ Δ = 0 ⟹ k = 2, touching at (2 ; 4)
     (b) cuts twice ⟹ Δ > 0 ⟹ k > 2, so y = x + 6 cuts — at (0 ; 6)
         and (4 ; 10), both drawn on (b)'s reveal
   The illustrative dashed line on the question side is drawn at k = 0,
   a position where it MISSES — so nothing on the question side is
   either answer.
   --------------------------------------------------------------- */
const Q3_F = { kind: "parabola", a: 1, b: -3, c: 6 };
const Q3_TANGENT = { kind: "line", a: 1, q: 2, dash: true, tone: "b", label: "y = x + 2", labelAt: 5.5 };
/* the contact point sits exactly where the tangent grazes f, so the
   placer's default slots all cross one line or the other — "above" puts
   it inside the parabola's own cup, which is the one clear space */
const Q3_TOUCH = { x: 2, y: 4, on: [0, 2], label: "(2 ; 4)", place: "above" };
const Q3_CUTTER = { kind: "line", a: 1, q: 6, dash: true, tone: "c", label: "y = x + 6", labelAt: 5.5 };
const Q3_CUT_A = { x: 0, y: 6, on: [0, 3], label: "(0 ; 6)" };
const Q3_CUT_B = { x: 4, y: 10, on: [0, 3], label: "(4 ; 10)" };
const Q3_DIAGRAM = {
  spec: {
    type: "function",
    win: { xmin: -4, xmax: 7, ymin: -3, ymax: 16 },
    curves: [
      { ...Q3_F, tone: "a", label: "f", labelAt: -1.5 },
      // the sliding line at one illustrative position — here it misses
      { kind: "line", a: 1, q: 0, dash: true, tone: "c", label: "y = x + k", labelAt: 5.5 },
    ],
  },
  parts: {
    a: { question: {}, reveal: { curves: [Q3_TANGENT], points: [Q3_TOUCH] } },
    b: {
      question: { curves: [Q3_TANGENT], points: [Q3_TOUCH] },
      reveal: { curves: [Q3_TANGENT, Q3_CUTTER], points: [Q3_TOUCH, Q3_CUT_A, Q3_CUT_B] },
    },
  },
};

const q3 = {
  id: "func.sib.nor.q3",
  chapter: CH,
  topic: "nature-of-roots",
  archetype: "sliding-line-tangent-to-a-parabola-then-delta-read-backwards",
  paper: PAPER,
  diagram: Q3_DIAGRAM,
  lostQuest: { chapter: CH, quest: "fn7" },
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "The sketch shows the parabola f, defined by &nbsp;f(x) = x² − 3x + 6, &nbsp;and the line &nbsp;y = x + k, &nbsp;drawn dashed at one possible position. The line keeps its gradient of 1 but slides up and down as k changes.<br><br>Determine the value of k for which the line will be a tangent to f, and the coordinates of the point of contact.", af: "Die skets toon die parabool f, gedefinieer deur &nbsp;f(x) = x² − 3x + 6, &nbsp;en die lyn &nbsp;y = x + k, &nbsp;as stippellyn geteken in een moontlike posisie. Die lyn hou sy gradiënt van 1, maar skuif op en af soos k verander.<br><br>Bepaal die waarde van k waarvoor die lyn 'n raaklyn aan f sal wees, en die koördinate van die raakpunt.",
      },
      hint: {
        en: "A tangent touches the graph exactly once, so the two equations must have equal roots. Set them equal, tidy into a quadratic in x, then force the discriminant to be zero.", af: "'n Raaklyn raak die grafiek presies een keer, dus moet die twee vergelykings gelyke wortels hê. Stel hulle gelyk, maak netjies tot 'n kwadratiese vergelyking in x, en dwing dan die diskriminant om nul te wees.",
      },
      memo: [
        { type: "step", text: { en: "Where the line meets f, both equations hold at once. Set them equal:", af: "Waar die lyn f ontmoet, geld albei vergelykings tegelyk. Stel hulle gelyk:" } },
        { type: "step", text: { en: "x² − 3x + 6 = x + k &nbsp;⟹&nbsp; x² − 4x + (6 − k) = 0", af: "x² − 3x + 6 = x + k &nbsp;⟹&nbsp; x² − 4x + (6 − k) = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "A tangent touches once, so the roots are equal and Δ = 0:", af: "'n Raaklyn raak een keer, dus is die wortels gelyk en Δ = 0:" } },
        { type: "step", text: { en: "Δ = (−4)² − 4(1)(6 − k) = 16 − 24 + 4k = 4k − 8 = 0", af: "Δ = (−4)² − 4(1)(6 − k) = 16 − 24 + 4k = 4k − 8 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "∴ k = 2", af: "∴ k = 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "put k = 2 back: &nbsp;x² − 4x + 4 = 0 &nbsp;⟹&nbsp; (x − 2)² = 0 &nbsp;⟹&nbsp; x = 2, &nbsp;and&nbsp; y = (2)² − 3(2) + 6 = 4 &nbsp;&nbsp;∴&nbsp; (2 ; 4)", af: "sit k = 2 terug in: &nbsp;x² − 4x + 4 = 0 &nbsp;⟹&nbsp; (x − 2)² = 0 &nbsp;⟹&nbsp; x = 2, &nbsp;en&nbsp; y = (2)² − 3(2) + 6 = 4 &nbsp;&nbsp;∴&nbsp; (2 ; 4)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: Δ = 0, not Δ &gt; 0. A tangent meets the graph once, and once means the two roots have collapsed into one — that is exactly what a zero discriminant says.", af: "PASOP: Δ = 0, nie Δ &gt; 0 nie. 'n Raaklyn ontmoet die grafiek een keer, en een keer beteken die twee wortels het ineengeval tot een: dit is presies wat 'n diskriminant van nul sê.",
        } },
      ],
      esplain: {
        en: "Every question of this kind runs on one sentence: where the graphs meet, both equations are true, so setting them equal turns a picture into a quadratic whose solutions are the x-values of the meeting points. From there the discriminant does all the reporting. Two different roots means the line cuts through; one repeated root means it just grazes; no real roots means it sails past. A tangent is the middle case, so Δ = 0 is the condition, and solving that gives the one height at which this particular gradient can rest on the curve. The second half of the answer is the part people forget. The question asked WHERE it touches, so substitute the k you found back into the quadratic — it will factorise into a perfect square, which is the algebra confirming the graph — and take that x into f for the height. A perfect square appearing at that point is a free check that k is right.", af: "Elke vraag van hierdie soort draai om een sin: waar die grafieke ontmoet, is albei vergelykings waar, dus word 'n prentjie 'n kwadratiese vergelyking as jy hulle gelykstel, en die oplossings is die x-waardes van die snypunte. Van daar af doen die diskriminant al die rapportering. Twee verskillende wortels beteken die lyn sny deur; een herhaalde wortel beteken dit skuur net; geen reële wortels beteken dit seil verby. 'n Raaklyn is die middelste geval, dus is Δ = 0 die voorwaarde, en as jy dit oplos, kry jy die een hoogte waarop hierdie spesifieke gradiënt op die kurwe kan rus. Die tweede helfte van die antwoord is die deel wat mense vergeet. Die vraag vra WAAR dit raak, dus vervang die k wat jy gevind het in die kwadratiese vergelyking (dit sal faktoriseer tot 'n volkome vierkant, die algebra wat die grafiek bevestig) en neem daardie x na f vir die hoogte. 'n Volkome vierkant wat op daardie punt verskyn, is 'n gratis kontrole dat k reg is.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write down the values of k for which the line will cut f at two different points, and hence state whether the line &nbsp;y = x + 6&nbsp; cuts f, touches f, or misses it completely.", af: "Skryf die waardes van k neer waarvoor die lyn f by twee verskillende punte sal sny, en noem gevolglik of die lyn &nbsp;y = x + 6&nbsp; f sny, f raak, of dit heeltemal mis.",
      },
      hint: {
        en: "Two different cutting points means two different roots. You already have Δ in terms of k, so ask what it has to be — then compare 6 with the boundary you found in (a).", af: "Twee verskillende snypunte beteken twee verskillende wortels. Jy het reeds Δ in terme van k, dus vra wat dit moet wees, en vergelyk dan 6 met die grens wat jy in (a) gevind het.",
      },
      memo: [
        { type: "step", text: { en: "Two different cutting points means two unequal real roots, so Δ &gt; 0: &nbsp;4k − 8 &gt; 0 &nbsp;⟹&nbsp; k &gt; 2", af: "Twee verskillende snypunte beteken twee ongelyke reële wortels, dus Δ &gt; 0: &nbsp;4k − 8 &gt; 0 &nbsp;⟹&nbsp; k &gt; 2" }, ticks: ["a"] },
        { type: "answer", text: { en: "6 &gt; 2, so the line y = x + 6 <b>cuts</b> f at two different points — and indeed it does, at (0 ; 6) and (4 ; 10).", af: "6 &gt; 2, dus <b>sny</b> die lyn y = x + 6 f by twee verskillende punte, en dit gebeur inderdaad, by (0 ; 6) en (4 ; 10)." }, ticks: ["a"] },
      ],
      esplain: {
        en: "The discriminant you built in (a) is not used up — it is a machine that answers every version of the question at once, and all that changes is what you make it do. Force it to zero and you get the tangent. Push it above zero and you get the lines that cut twice, which here is everything above the tangent, k greater than 2. Push it below and you get the misses, k less than 2 — which is why the dashed line drawn on the sketch at k = 0 passes underneath the parabola without touching it. So the last part is just a comparison: 6 sits above the boundary, so that particular line must cut. If you want to see it, solve x² − 4x + 6 − 6 = 0, which factorises to x(x − 4) and gives the two crossings at x = 0 and x = 4. That check is quick and it is the honest way to be sure you have the inequality the right way round.", af: "Die diskriminant wat jy in (a) gebou het, is nie opgebruik nie: dit is 'n masjien wat elke weergawe van die vraag gelyk beantwoord, en al wat verander, is wat jy dit laat doen. Dwing dit na nul en jy kry die raaklyn. Druk dit bo nul en jy kry die lyne wat twee keer sny, wat hier alles bo die raaklyn is, k groter as 2. Druk dit onder nul en jy kry die lyne wat mis, k kleiner as 2, en daarom gaan die stippellyn wat op die skets by k = 0 geteken is, onder die parabool deur sonder om dit te raak. Die laaste deel vra dus net dat jy vergelyk: 6 lê bo die grens, dus moet daardie spesifieke lyn sny. As jy dit wil sien, los x² − 4x + 6 − 6 = 0 op, wat faktoriseer tot x(x − 4) en die twee snypunte by x = 0 en x = 4 gee. Daardie kontrole is vinnig, en dit is die eerlike manier om seker te maak jy het die ongelykheid die regte kant toe.",
      },
    },
  ],
};

export const funcNatureOfRootsSiblingQuestions = [q1, q2, q3];
