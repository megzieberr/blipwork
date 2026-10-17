/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill "co-functions"
   (SESSION F1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F1-gtrig-part1.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   WHY THIS FILE EXISTS. "Co-functions" held exactly ONE card —
   trig.rr.t2q1(a), "if sin 34° = t, write cos 56° in terms of t". A
   learner who tapped "Another one!" ran out immediately, and never met
   the one thing this whole topic exists to teach: THE TRAP,
   cos(90° + θ) = −sin θ (METHODS-trig.md D3, the most-named trap in all
   68 pages of her notes).

   SOURCE OF THE MATHS: METHODS-trig.md Part D (p17–p22) — the
   two-labelling triangle (D1), co-functions living INSIDE the All
   Strippers Take Cash wheel (D2: 90° − θ is an A angle, 90° + θ is an S
   angle), the trap (D3), and the negative co-functions sin(θ − 90°) and
   cos(θ − 90°) with her "but why?" let-K derivation (D4).
   ARCHETYPES from the paper bank's trig inventory
   (survey/SURVEY-Topic-Banks.md §2, "ratio-in-terms-of") and
   SURVEY-Nov-P2.md archetype 3 beat (i) — "given ratio X, express Y in
   terms of X, no calculator" — which opens the trig block every year.
   Her own Test 3 Q1.3 ("if tan 50° = t, express cos 230° …") is the
   same mould. Every angle and letter here is fresh; nothing is verbatim.

   WHAT THE FIVE COVER, and why these five:
     q1  THE TRAP and its friendly neighbour, side by side, in variables
         — cos(90° + θ) = −sin θ against sin(90° + θ) = cos θ
     q2  the co-function inside an expression that CANCELS, where the
         whole point is that sin(90° − x) is just cos x wearing a hat
     q3  the "in terms of p" chain a paper actually opens with: one
         co-function into A, one into S, and one 180° reduction, so the
         learner has to tell the two families apart inside one question
     q4  the NEGATIVE co-functions, sin(x − 90°) and cos(x − 90°), built
         her way with let K rather than handed over as a rule
     q5  the two-step item: reduce the angle FIRST, then notice that the
         acute angle it leaves you and 40° add to 90°

   NO DIAGRAM ANYWHERE ON THIS TILE. A co-function question never
   carries a figure on a real paper — the triangle is a thing you SEE in
   your head (or draw twice, once from each acute angle, her p17), never
   a thing the paper prints. Nothing here needs a sketch to be
   answerable, so nothing here gets one.

   LEVELS: q1 and q2 level 1–2, q3 level 1–2, q4 and q5 level 2–3.
   Nothing here is level 4 — the ★ questions live on the gtrig level-4
   tile (session F2), and this is a tile a frightened learner drills
   basics on (her ruling 5, EXAM-BUILD-DAY.md).
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
/* gt4 "Co-functions" — the round that teaches convert-between-sin-and-cos
   and the cos(90° + x) trap (js/config.js CHAPTERS → gtrig). */
const LOST = { chapter: CH, quest: "gt4" };

/* ---------------------------------------------------------------
   q1 — THE TRAP AND ITS NEIGHBOUR (her D2/D3).
   Both parts are the SAME angle, 90° + θ, asked about two different
   ratios, because that is what makes the sign rule visible: the split
   does not decide the sign, the quadrant does.
     (a) cos(90° + θ) = −sin θ      ← the trap
     (b) sin(90° + θ) =  cos θ      ← no minus, same angle
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.cf.q1",
  chapter: CH,
  topic: "co-functions",
  archetype: "cofunction-write-down-both-ratios-of-90-plus-theta",
  paper: PAPER,
  lostQuest: LOST,
  marks: 2,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Write down &nbsp;cos(90° + θ)&nbsp; in terms of &nbsp;sin θ.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Skryf &nbsp;cos(90° + θ)&nbsp; in terme van &nbsp;sin θ neer.",
      },
      hint: {
        en: "Do not touch the ratio yet — ask the quadrant question first. Where on the wheel does 90° + θ land, and which ratio survives there? Only then use the fact that a 90° split is the one split that converts between sin and cos.", af: "Moenie nou al aan die verhouding raak nie: vra eers die kwadrantvraag. Waar op die wiel beland 90° + θ, en watter verhouding oorleef daar? Gebruik eers dan die feit dat 'n 90°-opsplitsing die enigste opsplitsing is wat tussen sin en cos omskakel.",
      },
      memo: [
        { type: "step", text: { en: "90° + θ has crossed the 90° line into the <b>second quadrant</b> — S on All Strippers Take Cash, where <b>only sine</b> is positive.", af: "90° + θ het die 90°-lyn oorgesteek na die <b>tweede kwadrant</b>: S in All Strippers Take Cash, waar <b>net sin</b> positief is." } },
        { type: "step", text: { en: "A 90° ± θ angle is a co-function, so the ratio converts: cos becomes sin. And cosine is not sine, so it collects the minus.", af: "'n Hoek van 90° ± θ is 'n ko-funksie, dus skakel die verhouding om: cos word sin. En cos is nie sin nie, dus kry dit die minus." } },
        { type: "answer", text: { en: "cos(90° + θ) = −sin θ", af: "cos(90° + θ) = −sin θ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: this is THE trap. cos(90° − θ) = +sin θ, but cos(90° + θ) = −sin θ. One plus sign is the whole difference between them — which is why you add the angles and look at the wheel before you write anything down.", af: "ONTHOU: dit is DIE slaggat. cos(90° − θ) = +sin θ, maar cos(90° + θ) = −sin θ. Een plusteken is die hele verskil tussen hulle, en daarom tel jy die hoeke bymekaar en kyk na die wiel voordat jy enigiets neerskryf.",
        } },
      ],
      esplain: {
        en: "Two angles, one wheel. All Strippers Take Cash tells you which ratio survives in each quadrant, and 90° + θ has just crossed the 90° line into S — the quadrant where only sine stays positive. Cosine is not sine, so it has to change sign, and that is where the minus comes from. The rest of the answer is the co-function part: a 90° split is the only split that converts between sin and cos, so cos turns into sin. Put the two halves together and you get −sin θ. Its friendly neighbour, 90° − θ, sits in A where everything is positive, so cos(90° − θ) is simply +sin θ. That is why your first move on a question shaped like this is always the same: add the angles, then look at the wheel.", af: "Twee hoeke, een wiel. All Strippers Take Cash sê vir jou watter verhouding in elke kwadrant oorleef, en 90° + θ het pas die 90°-lyn na S oorgesteek: die kwadrant waar net sin positief bly. Maar cos is nie sin nie, dus moet dit van teken verander, en dit is waar die minus vandaan kom. Die res van die antwoord is die ko-funksie-deel: 'n 90°-opsplitsing is die enigste opsplitsing wat tussen sin en cos omskakel, dus word cos sin. Sit die twee helftes saam en jy kry −sin θ. Sy vriendelike buurman, 90° − θ, lê in A waar alles positief is, dus is cos(90° − θ) eenvoudig +sin θ. Daarom is jou eerste stap by 'n vraag wat so lyk altyd dieselfde: tel die hoeke bymekaar, kyk dan na die wiel.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Write down &nbsp;sin(90° + θ)&nbsp; in terms of &nbsp;cos θ.", af: "Skryf &nbsp;sin(90° + θ)&nbsp; in terme van &nbsp;cos θ neer.",
      },
      hint: {
        en: "Same angle as (a), so the same quadrant. The only new question is whether the ratio you started with is the one that survives there.", af: "Dieselfde hoek as (a), dus dieselfde kwadrant. Die enigste nuwe vraag is of die verhouding waarmee jy begin het, die een is wat daar oorleef.",
      },
      memo: [
        { type: "step", text: { en: "90° + θ is still an S angle, and in S <b>sine</b> is the ratio that stays positive — so nothing turns negative here.", af: "90° + θ is steeds 'n S-hoek, en in S is <b>sin</b> die verhouding wat positief bly, dus word niks hier negatief nie." } },
        { type: "step", text: { en: "The 90° split still converts, so sin becomes cos.", af: "Die 90°-opsplitsing skakel steeds om, dus word sin cos." } },
        { type: "answer", text: { en: "sin(90° + θ) = cos θ", af: "sin(90° + θ) = cos θ" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same angle, different ratio — and this time nothing goes wrong. 90° + θ is still in S, and sine is exactly the ratio S keeps positive, so no minus comes along for the ride. The 90° split still does its one job and converts sine into cosine, which leaves you with a clean cos θ. Putting (a) and (b) next to each other is the fastest way to hold the trap in your head: with the SAME angle, sin(90° + θ) = cos θ but cos(90° + θ) = −sin θ. The sign is not decided by the split — it is decided by the quadrant, and by whether the ratio you started with is the one that survives there. Ask those two questions in that order and the sign looks after itself.", af: "Dieselfde hoek, ander verhouding, en hierdie keer gaan niks verkeerd nie. 90° + θ is steeds in S, en sin is presies die verhouding wat S positief hou, dus kom daar geen minus saam nie. Die 90°-opsplitsing doen steeds sy een werk en skakel sin om na cos, wat jou met 'n skoon cos θ laat. Sit (a) en (b) langs mekaar: dit is die vinnigste manier om die slaggat te onthou. By DIESELFDE hoek is sin(90° + θ) = cos θ, maar cos(90° + θ) = −sin θ. Die opsplitsing besluit nie die teken nie: die kwadrant besluit dit, en ook of die verhouding waarmee jy begin het, die een is wat daar oorleef. Vra daardie twee vrae in daardie volgorde en die teken sorg vir homself.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — THE CO-FUNCTION INSIDE AN EXPRESSION (her p18 eg.1 shape).
     (a) sin(90° − x)/cos x      = cos x/cos x = 1
     (b) sin(90° − x) · tan x    = cos x · sin x/cos x = sin x
   (b) is the pairing she leans on: swap tan for sin over cos and
   suddenly there is something to cancel with.
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.cf.q2",
  chapter: CH,
  topic: "co-functions",
  archetype: "cofunction-simplify-an-expression-to-a-single-ratio",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;sin(90° − x)/cos x", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Vereenvoudig: &nbsp;sin(90° − x)/cos x",
      },
      hint: {
        en: "Deal with the bracket first and leave the bottom of the fraction alone. 90° − x lives in A, where everything is positive, so no minus is coming — the only thing that happens is the conversion.", af: "Werk eers met die hakie en laat die onderkant van die breuk net so. 90° − x woon in A, waar alles positief is, dus kom daar geen minus nie: al wat gebeur, is die omskakeling.",
      },
      memo: [
        { type: "step", text: { en: "90° − x is an <b>A</b> angle (everything positive), and the 90° split converts sin to cos:", af: "90° − x is 'n <b>A</b>-hoek (alles positief), en die 90°-opsplitsing skakel sin om na cos:" } },
        { type: "step", text: { en: "sin(90° − x) = cos x", af: "sin(90° − x) = cos x" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos x/cos x = 1", af: "cos x/cos x = 1" }, ticks: ["a"] },
      ],
      esplain: {
        en: "90° − x sits in A, the quadrant where all three ratios are positive, so nothing here turns negative — the only thing that happens is the conversion. Sine becomes cosine, the expression turns into cos x over cos x, and that is 1. Picture the reason instead of memorising it. In a right-angled triangle the two acute angles add to 90°, so they share the same three sides and only swap the names opposite and adjacent: the side across from one is the side next to the other. That is all a co-function is — a change of name, not a change of value. Once you see that, sin(90° − x) = cos x stops being a rule to remember and starts being obvious.", af: "90° − x lê in A, die kwadrant waar al drie verhoudings positief is, dus word niks hier negatief nie: al wat gebeur, is die omskakeling. Dan word sin cos, die uitdrukking word cos x oor cos x, en dit is 1. Sien die rede in jou kop in plaas daarvan om dit uit te leer. In 'n reghoekige driehoek tel die twee skerp hoeke op tot 90°, dus deel hulle dieselfde drie sye en ruil net die name teenoorstaande en aangrensende om: die sy oorkant die een is die sy langs die ander. Dit is al wat 'n ko-funksie is: 'n ander naam, nie 'n ander waarde nie. Sodra jy dit sien, is sin(90° − x) = cos x nie meer 'n reël wat jy moet onthou nie, maar iets vanselfsprekends.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Simplify: &nbsp;sin(90° − x) · tan x", af: "Vereenvoudig: &nbsp;sin(90° − x) · tan x",
      },
      hint: {
        en: "Two moves. Convert the co-function, then write tan as sin over cos — that swap is what creates something to cancel with.", af: "Twee stappe. Skakel die ko-funksie om, skryf dan tan as sin oor cos: daardie omruiling skep iets om mee te kanselleer.",
      },
      memo: [
        { type: "step", text: { en: "sin(90° − x) = cos x &nbsp;(an A angle, so no minus)", af: "sin(90° − x) = cos x &nbsp;('n A-hoek, dus geen minus)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "tan x = sin x/cos x &nbsp;— one of the identities she wants known by heart", af: "tan x = sin x/cos x &nbsp;(een van die identiteite wat sy wil hê jy moet uit jou kop ken)" }, ticks: ["ca"] },
        { type: "step", text: { en: "So the expression is &nbsp;cos x · sin x/cos x &nbsp;— and the cos x cancels.", af: "Dus is die uitdrukking &nbsp;cos x · sin x/cos x, &nbsp;en die cos x kanselleer." } },
        { type: "answer", text: { en: "= sin x", af: "= sin x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two moves, and doing both matters more than the order. First the co-function: sin(90° − x) is an A angle, everything positive, and the 90° split converts sine to cosine, so it is simply cos x. Second the identity: tan x is not a new animal, it is sin x over cos x. Now the expression reads cos x times sin x over cos x, the cos x on top cancels the cos x underneath, and sin x is left. Notice what did the real work — turning tan into sin over cos is what created something to cancel with. Whenever an expression mixes tan with sin and cos, that swap is almost always the move worth trying first.", af: "Twee stappe, en dat jy albei doen, is belangriker as die volgorde. Eers die ko-funksie: sin(90° − x) is 'n A-hoek, alles positief, en die 90°-opsplitsing skakel sin om na cos, dus is dit eenvoudig cos x. Dan die identiteit: tan x is nie 'n nuwe dier nie, dit is sin x oor cos x. Nou lees die uitdrukking cos x maal sin x oor cos x, die cos x bo kanselleer die cos x onder, en sin x bly oor. Let op wat die eintlike werk gedoen het: om tan in sin oor cos te verander, het iets geskep om mee te kanselleer. Wanneer 'n uitdrukking tan met sin en cos meng, is daardie omruiling amper altyd die stap wat jy eerste moet probeer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — THE "IN TERMS OF p" CHAIN (beat (i) of SURVEY-Nov-P2.md
   archetype 3; her own Test 3 Q1.3 is the same mould).
   cos 18° = p, and three angles that all reduce back to 18°:
     (a) sin 72°  = sin(90° − 18°) =  cos 18° =  p    (A: no minus)
     (b) sin 108° = sin(90° + 18°) =  cos 18° =  p    (S: sine survives)
     (c) cos 162° = cos(180° − 18°) = −cos 18° = −p   (a REDUCTION, not
         a co-function — the ratio does not change, only the sign)
   No triangle and no Pythagoras: nothing here asks for a side that is
   not already given. That is the whole difference between this tile
   and Super Special Sums.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.cf.q3",
  chapter: CH,
  topic: "co-functions",
  archetype: "given-one-ratio-write-three-related-angles-in-terms-of-it",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 1,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 18° = p.<br><br>Write &nbsp;sin 72°&nbsp; in terms of p.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;cos 18° = p.<br><br>Skryf &nbsp;sin 72°&nbsp; in terme van p.",
      },
      hint: {
        en: "Add the two angles. If they make 90°, the question is handing you a co-function — and a co-function does one job only: it converts between sin and cos. 90° − θ lives in A, so nothing here needs a minus.", af: "Tel die twee hoeke bymekaar. As hulle 90° gee, gee die vraag vir jou 'n ko-funksie, en 'n ko-funksie doen net een werk: dit skakel om tussen sin en cos. 90° − θ woon in A, dus het niks hier 'n minus nodig nie.",
      },
      memo: [
        { type: "step", text: { en: "18° and 72° add up to 90°, so this is a co-function: &nbsp;sin 72° = sin(90° − 18°)", af: "18° en 72° tel op tot 90°, dus is dit 'n ko-funksie: &nbsp;sin 72° = sin(90° − 18°)" } },
        { type: "answer", text: { en: "= cos 18° = p", af: "= cos 18° = p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "18° and 72° add up to 90°, and that is the whole clue. Two angles that add to 90° are the two acute angles of the same right-angled triangle, so they share the same three sides — the side opposite one is the side next to the other. That makes the sine of one equal to the cosine of the other, every time. So sin 72° is exactly cos 18°, which you were handed as p. Notice there is no triangle to draw and no Pythagoras to do here: the question never asks for a side you do not already have. When you see in terms of p with two angles adding to 90°, the answer is usually just p or −p, and your only job is deciding which.", af: "18° en 72° tel op tot 90°, en dit is die hele leidraad. Twee hoeke wat optel tot 90°, is die twee skerp hoeke van dieselfde reghoekige driehoek, dus deel hulle dieselfde drie sye: die sy oorkant die een is die sy langs die ander. Dit maak die sin van die een gelyk aan die cos van die ander, elke keer. Dus is sin 72° presies cos 18°, wat vir jou as p gegee is. Let op dat daar hier geen driehoek is om te teken en geen Pythagoras om te doen nie: die vraag vra nooit 'n sy wat jy nie reeds het nie. As jy in terme van p sien, met twee hoeke wat optel tot 90°, is die antwoord gewoonlik net p of −p, en jou enigste werk is om te besluit watter een.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write &nbsp;sin 108°&nbsp; in terms of p.", af: "Skryf &nbsp;sin 108°&nbsp; in terme van p.",
      },
      hint: {
        en: "Split 108° as 90° + 18° and ask the quadrant question first: which quadrant is that, and is sine the ratio that survives there?", af: "Splits 108° op as 90° + 18° en vra eers die kwadrantvraag: watter kwadrant is dit, en is sin die verhouding wat daar oorleef?",
      },
      memo: [
        { type: "step", text: { en: "108° = 90° + 18°, which lands in <b>S</b> — where sine is positive, so no minus appears:", af: "108° = 90° + 18°, wat in <b>S</b> beland, waar sin positief is, dus verskyn daar geen minus nie:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "sin 108° = sin(90° + 18°) = cos 18° = p", af: "sin 108° = sin(90° + 18°) = cos 18° = p" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: sin(90° + θ) = +cos θ, but cos(90° + θ) = −sin θ. Same angle, same quadrant, different sign — because in S only sine survives.", af: "ONTHOU: sin(90° + θ) = +cos θ, maar cos(90° + θ) = −sin θ. Dieselfde hoek, dieselfde kwadrant, ander teken, want in S oorleef net sin.",
        } },
      ],
      esplain: {
        en: "108° is 90° + 18°, so it is the same 18° again, only pushed one quadrant further round. On the wheel that lands in S, and in S sine is the one ratio that stays positive — so no minus appears. The 90° split still converts, so sine turns into cosine and you get cos 18°, which is p. Here is a check you can do in your head: sin 72° and sin 108° both came out as p, and that is not a coincidence. 72° and 108° are mirror images about 90°, so the sine graph is at exactly the same height at both. If your two answers had come out different, one of them would be wrong.", af: "108° is 90° + 18°, dus is dit weer dieselfde 18°, net een kwadrant verder om gedruk. Op die wiel beland dit in S, en in S is sin die een verhouding wat positief bly, dus verskyn daar geen minus nie. Die 90°-opsplitsing skakel steeds om, dus word sin cos en jy kry cos 18°, wat p is. Hier is 'n toets wat jy in jou kop kan doen: sin 72° en sin 108° het albei p gegee, en dit is nie toeval nie. 72° en 108° is gereflekteerde beelde van mekaar om 90°, dus is die sin-grafiek by albei op presies dieselfde hoogte. As jou twee antwoorde verskil het, sou een van hulle verkeerd wees.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Write &nbsp;cos 162°&nbsp; in terms of p.", af: "Skryf &nbsp;cos 162°&nbsp; in terme van p.",
      },
      hint: {
        en: "This one is a 180° split, not a 90° one. Before you worry about the sign, ask whether the ratio changes at all.", af: "Hierdie een is 'n 180°-opsplitsing, nie 'n 90°-opsplitsing nie. Vra eers of die verhouding enigsins verander, voordat jy jou oor die teken kwel.",
      },
      memo: [
        { type: "step", text: { en: "162° = 180° − 18°, which lands in <b>S</b>. A 180° split is a <b>reduction</b>, not a co-function — the ratio stays cosine:", af: "162° = 180° − 18°, wat in <b>S</b> beland. 'n 180°-opsplitsing is 'n <b>reduksie</b>, nie 'n ko-funksie nie, dus bly die verhouding cos:" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 162° = cos(180° − 18°) = −cos 18° = −p", af: "cos 162° = cos(180° − 18°) = −cos 18° = −p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "162° is 180° − 18°, so this one is a reduction, not a co-function — and the two families behave differently on purpose. A 180° split never changes the ratio; all it does is decide a sign. So cosine stays cosine. 180° − 18° lands in S, where only sine is positive, and cosine is not sine, so it takes the minus: cos 162° = −cos 18° = −p. Say the three steps out loud every time and you will not mix the families up — which quadrant, which reduction formula, then plus or minus. Only the 90° splits convert between sin and cos; the 180° and 360° splits leave the ratio exactly as it was.", af: "162° is 180° − 18°, dus is hierdie een 'n reduksie, nie 'n ko-funksie nie, en die twee families gedra hulle doelbewus verskillend. 'n 180°-opsplitsing verander nooit die verhouding nie; al wat dit doen, is om 'n teken te besluit. Dus bly cos cos. 180° − 18° beland in S, waar net sin positief is, en cos is nie sin nie, dus kry dit die minus: cos 162° = −cos 18° = −p. Sê elke keer die drie stappe hardop, en jy sal nie die families deurmekaar maak nie: watter kwadrant, watter reduksieformule, dan plus of minus. Net die 90°-opsplitsings skakel om tussen sin en cos; die 180°- en 360°-opsplitsings laat die verhouding presies soos dit was.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — THE NEGATIVE CO-FUNCTIONS (her p21–p22, p24 ⑤, "but why?").
     (a) sin(x − 90°) = sin[−(90° − x)]; let K = 90° − x, and −K is a
         IV-quadrant angle where only cos survives → −sin K → −cos x
     (b) cos(x − 90°) = sin x by the same route, so the quotient is
         −cos x/sin x = −1/tan x
   The let-K derivation IS the memo here, because it is what she writes
   on p24 when the kids ask why.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.cf.q4",
  chapter: CH,
  topic: "co-functions",
  archetype: "negative-cofunction-derive-then-simplify-the-quotient",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Write &nbsp;sin(x − 90°)&nbsp; in terms of &nbsp;cos x.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Skryf &nbsp;sin(x − 90°)&nbsp; in terme van &nbsp;cos x.",
      },
      hint: {
        en: "Pull the minus out to the front first — x − 90° is the same angle as −(90° − x). Then let K stand for 90° − x and reduce sin(−K) the way you reduce any negative angle.", af: "Haal eers die minus uit na voor: x − 90° is dieselfde hoek as −(90° − x). Laat K dan vir 90° − x staan en reduseer sin(−K) soos jy enige negatiewe hoek reduseer.",
      },
      memo: [
        { type: "step", text: { en: "Take the minus out to the front: &nbsp;sin(x − 90°) = sin[−(90° − x)]", af: "Haal die minus uit na voor: &nbsp;sin(x − 90°) = sin[−(90° − x)]" } },
        { type: "step", text: { en: "Let K = 90° − x. Then −K is a <b>fourth-quadrant</b> (C) angle, where only cosine is positive — so sine takes the minus: &nbsp;sin(−K) = −sin K", af: "Stel K = 90° − x. Dan is −K 'n hoek in die <b>vierde kwadrant</b> (C), waar net cos positief is, dus kry sin die minus: &nbsp;sin(−K) = −sin K" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Put K back: &nbsp;= −sin(90° − x)", af: "Sit K terug: &nbsp;= −sin(90° − x)" } },
        { type: "answer", text: { en: "and sin(90° − x) = cos x, &nbsp;∴&nbsp; sin(x − 90°) = −cos x", af: "en sin(90° − x) = cos x, &nbsp;∴&nbsp; sin(x − 90°) = −cos x" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: sin(x − 90°) and sin(90° − x) are NOT the same thing. Swapping the two angles round flips the sign of the whole answer — one is −cos x, the other is +cos x.", af: "PASOP: sin(x − 90°) en sin(90° − x) is NIE dieselfde ding nie. As jy die twee hoeke omruil, draai die teken van die hele antwoord om: die een is −cos x, die ander is +cos x.",
        } },
      ],
      esplain: {
        en: "x − 90° looks like a new rule, but it is the old one wearing a coat. Take the minus out to the front: x − 90° is the same angle as −(90° − x). Now let K stand for 90° − x, so you are looking at sin(−K). A negative angle turns you clockwise into the fourth quadrant, C, where only cosine survives — so sine flips sign and sin(−K) = −sin K. Put K back and you have −sin(90° − x), and sin(90° − x) is the plain co-function you already know: cos x. So sin(x − 90°) = −cos x. Write that derivation out once yourself. After that you can just remember the result, but you will always be able to rebuild it if the memory goes.", af: "x − 90° lyk soos 'n nuwe reël, maar dit is die ou een met 'n jas aan. Haal die minus uit na voor: x − 90° is dieselfde hoek as −(90° − x). Laat K nou vir 90° − x staan, dan kyk jy na sin(−K). 'n Negatiewe hoek draai jou kloksgewys na die vierde kwadrant, C, waar net cos oorleef, dus draai sin se teken om en sin(−K) = −sin K. Sit K terug en jy het −sin(90° − x), en sin(90° − x) is die gewone ko-funksie wat jy reeds ken: cos x. Dus is sin(x − 90°) = −cos x. Skryf daardie afleiding een keer self uit. Daarna kan jy net die resultaat onthou, maar jy sal dit altyd weer kan opbou as jou geheue jou in die steek laat.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence simplify: &nbsp;sin(x − 90°)/cos(x − 90°)", af: "Vereenvoudig vervolgens: &nbsp;sin(x − 90°)/cos(x − 90°)",
      },
      hint: {
        en: "Run exactly the same route as (a) on the bottom of the fraction, asking each time which ratio survives in the fourth quadrant. Then divide, and see whether the answer tidies into a tan.", af: "Volg presies dieselfde roete as in (a) met die onderkant van die breuk, en vra elke keer watter verhouding in die vierde kwadrant oorleef. Deel dan, en kyk of die antwoord netjies 'n tan word.",
      },
      memo: [
        { type: "step", text: { en: "Same route on the denominator, and this time it is cosine that survives in <b>C</b>, so no minus appears: &nbsp;cos(x − 90°) = cos[−(90° − x)] = cos(90° − x)", af: "Dieselfde roete met die noemer, en hierdie keer is dit cos wat in <b>C</b> oorleef, dus verskyn daar geen minus nie: &nbsp;cos(x − 90°) = cos[−(90° − x)] = cos(90° − x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos(x − 90°) = sin x", af: "cos(x − 90°) = sin x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin(x − 90°)/cos(x − 90°) = −cos x/sin x &nbsp;&nbsp;<b>OR</b>&nbsp;&nbsp; −1/tan x", af: "sin(x − 90°)/cos(x − 90°) = −cos x/sin x &nbsp;&nbsp;<b>OF</b>&nbsp;&nbsp; −1/tan x" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Run the same route on the cosine and the answer comes out with the opposite sign, for one reason: in the fourth quadrant cosine is the ratio that survives. So cos(x − 90°) = cos(90° − x) = sin x, with no minus anywhere. That leaves −cos x on the top and sin x on the bottom. Divide and you have −cos x over sin x, which is the upside-down version of tan, so you may also write it as −1 over tan x. Either form is a correct final answer and a marker takes both. The one place marks go missing is putting the minus on the wrong line — check it by asking which of the two ratios survives in the quadrant you landed in.", af: "Volg dieselfde roete met die cos, en die antwoord kom met die teenoorgestelde teken uit, om een rede: in die vierde kwadrant is cos die verhouding wat oorleef. Dus is cos(x − 90°) = cos(90° − x) = sin x, met nêrens 'n minus nie. Dit laat −cos x bo en sin x onder. Deel en jy het −cos x oor sin x, wat tan onderstebo is, dus mag jy dit ook as −1 oor tan x skryf. Albei vorme is 'n korrekte finale antwoord, en 'n nasiener aanvaar albei. Die een plek waar punte verlore gaan, is as jy die minus op die verkeerde reël sit. Toets dit: watter een van die twee verhoudings oorleef in die kwadrant waar jy beland het?",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TWO STEPS: A REDUCTION, THEN A CO-FUNCTION (her p41 eg.8
   flavour — a numeric expression that only tidies once an angle has
   been reduced AND then converted).
     (a) cos 130° = −cos 50° = −sin 40°,  so cos 130° + sin 40° = 0
     (b) sin 220° = −sin 40°,  cos 320° = cos 40°,  so
         (cos 130° · sin 220°)/(sin 40° · cos 320°)
           = sin²40°/(sin 40° · cos 40°) = tan 40°
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.cf.q5",
  chapter: CH,
  topic: "co-functions",
  archetype: "numeric-simplify-reduction-then-cofunction-to-a-single-ratio",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Simplify: &nbsp;cos 130° + sin 40°", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Vereenvoudig: &nbsp;cos 130° + sin 40°",
      },
      hint: {
        en: "Reduce first, then go looking for a co-function. Once cos 130° is written as a cosine of an acute angle, check whether that acute angle and 40° add to 90°.", af: "Reduseer eers, gaan soek dan na 'n ko-funksie. Sodra cos 130° as die cos van 'n skerp hoek geskryf is, kyk of daardie skerp hoek en 40° optel tot 90°.",
      },
      memo: [
        { type: "step", text: { en: "Write the split above the angle: &nbsp;130° = 180° − 50°, which lands in <b>S</b>, so cosine turns negative:", af: "Skryf die opsplitsing bo die hoek: &nbsp;130° = 180° − 50°, wat in <b>S</b> beland, dus word cos negatief:" } },
        { type: "step", text: { en: "cos 130° = −cos 50°", af: "cos 130° = −cos 50°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "50° and 40° add to 90°, so a co-function converts it: &nbsp;cos 50° = sin 40°, &nbsp;∴&nbsp; cos 130° = −sin 40°", af: "50° en 40° tel op tot 90°, dus skakel 'n ko-funksie dit om: &nbsp;cos 50° = sin 40°, &nbsp;∴&nbsp; cos 130° = −sin 40°" } },
        { type: "answer", text: { en: "cos 130° + sin 40° = −sin 40° + sin 40° = 0", af: "cos 130° + sin 40° = −sin 40° + sin 40° = 0" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two different machines, one answer. cos 130° is a reduction first: 130° is 180° − 50°, which lands in S, and cosine is not sine, so it turns negative and becomes −cos 50°. Now look at 50° and 40° — they add to 90°, so a co-function converts one into the other and cos 50° = sin 40°. Put the two together and cos 130° is exactly −sin 40°, so adding sin 40° gives zero. That is the shape a paper loves: an angle that looks nothing like the other one, until you reduce it and then convert it. Reduce first, co-function second, and always write the split above the angle before you write the next line.", af: "Twee verskillende masjiene, een antwoord. cos 130° is eers 'n reduksie: 130° is 180° − 50°, wat in S beland, en cos is nie sin nie, dus word dit negatief: −cos 50°. Kyk nou na 50° en 40°: hulle tel op tot 90°, dus skakel 'n ko-funksie die een om na die ander en cos 50° = sin 40°. Sit die twee saam en cos 130° is presies −sin 40°, dus gee dit nul as jy sin 40° bytel. Dit is die vorm waarvan 'n vraestel baie hou: 'n hoek wat glad nie soos die ander een lyk nie, totdat jy dit reduseer en dan omskakel. Eers reduseer, dan die ko-funksie, en skryf altyd die opsplitsing bo die hoek voordat jy die volgende reël skryf.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 3,
      prompt: {
        en: "Simplify: &nbsp;(cos 130° · sin 220°)/(sin 40° · cos 320°)", af: "Vereenvoudig: &nbsp;(cos 130° · sin 220°)/(sin 40° · cos 320°)",
      },
      hint: {
        en: "Four separate reductions, four separate lines, and the split written above each angle before you touch it. Do not cancel anything until every factor is a ratio of an acute angle.", af: "Vier aparte reduksies, vier aparte reëls, en skryf die opsplitsing bo elke hoek voordat jy daaraan raak. Moenie enigiets kanselleer voordat elke faktor 'n verhouding van 'n skerp hoek is nie.",
      },
      memo: [
        { type: "step", text: { en: "From (a): &nbsp;cos 130° = −sin 40°", af: "Uit (a): &nbsp;cos 130° = −sin 40°" } },
        { type: "step", text: { en: "220° = 180° + 40°, which lands in <b>T</b> (only tan positive): &nbsp;sin 220° = −sin 40°", af: "220° = 180° + 40°, wat in <b>T</b> beland (net tan positief): &nbsp;sin 220° = −sin 40°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "320° = 360° − 40°, which lands in <b>C</b> (cosine positive): &nbsp;cos 320° = cos 40°", af: "320° = 360° − 40°, wat in <b>C</b> beland (cos positief): &nbsp;cos 320° = cos 40°" }, ticks: ["ca"] },
        { type: "step", text: { en: "The top is (−sin 40°) × (−sin 40°) = sin²40°; the bottom is sin 40° × cos 40°.", af: "Bo is (−sin 40°) × (−sin 40°) = sin²40°; onder is sin 40° × cos 40°." }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²40°/(sin 40° · cos 40°) = sin 40°/cos 40° = tan 40°", af: "sin²40°/(sin 40° · cos 40°) = sin 40°/cos 40° = tan 40°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: two minus signs on the top multiply to a PLUS. A learner who keeps one of them ends up with −tan 40°, which is exactly the right size with the wrong sign — and the sign is a whole mark.", af: "PASOP: twee minustekens bo vermenigvuldig tot 'n PLUS. 'n Leerder wat een van hulle hou, eindig met −tan 40°, wat presies die regte grootte met die verkeerde teken is, en die teken is 'n hele punt werd.",
        } },
      ],
      esplain: {
        en: "Do not try to see the whole thing at once — take one factor at a time and write the split above each angle before anything else. 130° is 180° − 50°, so cos 130° = −cos 50°, and 50° and 40° add to 90°, so that is −sin 40°. 220° is 180° + 40°, which lands in T where only tan is positive, so sin 220° = −sin 40°. 320° is 360° − 40°, which lands in C where cosine is positive, so cos 320° = cos 40°. Now the top is two minuses multiplied together, which makes a plus, giving sin²40° over sin 40° times cos 40°. One sin 40° cancels and you are left with sin over cos — which is tan 40°.", af: "Moenie probeer om alles op een slag te sien nie: neem een faktor op 'n slag en skryf die opsplitsing bo elke hoek voor enigiets anders. 130° is 180° − 50°, dus cos 130° = −cos 50°, en 50° en 40° tel op tot 90°, dus is dit −sin 40°. 220° is 180° + 40°, wat in T beland, waar net tan positief is, dus sin 220° = −sin 40°. 320° is 360° − 40°, wat in C beland, waar cos positief is, dus cos 320° = cos 40°. Bo is nou twee minusse met mekaar vermenigvuldig, wat 'n plus maak, en dit gee sin²40° oor sin 40° maal cos 40°. Een sin 40° kanselleer, en wat oorbly, is sin oor cos, en dit is tan 40°.",
      },
    },
  ],
};

export const gtrigCoFunctionsSiblingQuestions = [q1, q2, q3, q4, q5];
