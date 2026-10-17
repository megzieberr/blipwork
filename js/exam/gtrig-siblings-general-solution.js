/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill
   "general-solution"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   Five new cards, taking this tile from one to six.

   WHY THIS FILE EXISTS. "General solution" held exactly ONE card —
   trig.gs.t2q2, the trinomial with a dead branch off her September T2
   practice paper. That is her TYPE ⑤ and nothing else, so a learner
   could drill the tile all afternoon and never meet the other five
   types that make up most of the marks on a real paper.

   ONE CARD PER TYPE, and the TYPE IS NAMED IN THE MEMO'S FIRST LINE.
   METHODS-trig.md K1 (p44) is the page the whole skill hangs off, and
   her six type names are law here — they are exactly how she writes
   them, number and name together:
     ① function alone     ② same angles      ③ common factor
     ④ grouping           ⑤ trinomial        ⑥ co-functions
   This file adds ①, ② (twice, plain and with a bracket), ⑤ with a
   masked identity, ⑥, and ① again with a compound angle inside — the
   existing card already carries plain ⑤.

   THREE OF HER RULINGS ARE ENFORCED IN EVERY MEMO BELOW:
     · tan gets ONE quadrant line (K3, p47 — she writes the second one
       out in full, strikes it through, and writes "waste of time!"
       beside it). Because the tan family already repeats every 180°,
       a second line adds nothing. The 180° period is STATED, not
       derived.
     · the reference angle comes from the POSITIVE value (K1 ①, p44 —
       "don't type − into calculator"); the sign is handled by choosing
       the quadrants, never by the calculator.
     · one k ∈ ℤ closes the answer, at the bottom of the last branch
       (Part 0.4). Without it you have written down two angles, not a
       general solution.
   Two more habits she never skips: the whole bracket is treated as the
   unknown and the quadrant line is written for THE BRACKET before
   anything is moved across (K2, "the compound-angle habit"); and when
   the unknown is 2x, EVERY term of the line is divided by 2, the
   divisor written under each piece (K2, "the divide-through habit").

   ARCHETYPES from the paper bank (survey/SURVEY-Topic-Banks.md §2 —
   2025-Q2.4, 2025-Q5.5, 2026-Q2.2, 2026-Q9.4; SURVEY-Nov-P2.md Q4(e))
   and her own Test 3 Q3. Fresh equations throughout.

   NO DIAGRAM ANYWHERE ON THIS TILE. The little quadrant cross with its
   ticks is the object the learner draws on paper — printing it would do
   the one decision the whole routine turns on.

   LEVELS: q1 and q2 level 1-2, q3/q4/q5 level 3. Nothing here is level
   4 (her ruling 5, EXAM-BUILD-DAY.md); the reverse-engineered "given
   the general solution, find the constant" question lives on the gtrig
   level-4 tile.

   lostQuest: gt11 "General solution: the six types" for the four cards
   whose first job is naming the type; gt12 "General solution: last
   steps" for the compound-angle one, where the quadrant cross and the
   reference angle are the whole question.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
const LOST_TYPES = { chapter: CH, quest: "gt11" };   /* the six types    */
const LOST_STEPS = { chapter: CH, quest: "gt12" };   /* cross + ref ∠    */

/* The closer that belongs on every general solution she has ever
   written, worded two ways so a learner working the whole tile does not
   read the same sentence five times. */
const TRAP_K = {
  en: "REMEMBER: k&nbsp;∈&nbsp;ℤ belongs on the end of <i>every</i> general solution, once, at the bottom of the last branch. Without it you have written down two angles, not a general solution — and it is a mark.", af: "ONTHOU: k&nbsp;∈&nbsp;ℤ hoort aan die einde van <i>elke</i> algemene oplossing, een keer, onderaan die laaste tak. Daarsonder het jy twee hoeke neergeskryf, nie 'n algemene oplossing nie, en dit is 'n punt.",
};

/* ---------------------------------------------------------------
   q1 — TYPE ① FUNCTION ALONE, then the interval follow-on.
   The smallest complete general solution there is: isolate, reference
   angle, cross, one line per ticked quadrant.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.gs.q1",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-1-function-alone-then-interval",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 4,
      level: 2,
      prompt: {
        en: "Determine the general solution of &nbsp;2 sin x + 1 = 0", af: "Bepaal die algemene oplossing van &nbsp;2 sin x + 1 = 0",
      },
      hint: {
        en: "One function, one angle, nothing squared — get the ratio on its own first. Then take the reference angle from the SIZE of the number and let the cross decide the signs, not the calculator.", af: "Een funksie, een hoek, niks in die kwadraat nie: kry eers die verhouding alleen. Neem dan die verwysingshoek uit die GROOTTE van die getal en laat die kruis die tekens besluit, nie die sakrekenaar nie.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ①: function alone</b> — get the ratio on its own first.", af: "<b>Tipe ①: funksie alleen</b>. Kry eers die verhouding alleen." } },
        { type: "step", text: { en: "2 sin x = −1 &nbsp;⟹&nbsp; sin x = −1/2", af: "2 sin x = −1 &nbsp;⟹&nbsp; sin x = −1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30° &nbsp;(from the SIZE of the number — don't type the minus into your calculator)", af: "verwysingshoek&nbsp;=&nbsp;30° &nbsp;(uit die GROOTTE van die getal: moenie die minus in jou sakrekenaar intik nie)" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin is negative, so tick the cross at the <b>bottom</b>: III and IV.", af: "sin is negatief, dus merk die kruis <b>onder</b>: III en IV." } },
        { type: "answer", text: { en: "III: &nbsp;x = 180° + 30° + k · 360° = 210° + k · 360°", af: "III: &nbsp;x = 180° + 30° + k · 360° = 210° + k · 360°" }, ticks: ["a"] },
        { type: "answer", text: { en: "IV: &nbsp;x = 360° − 30° + k · 360° = 330° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "IV: &nbsp;x = 360° − 30° + k · 360° = 330° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: TRAP_K },
      ],
      esplain: {
        en: "Name the type before you do anything and the question stops feeling new. One function, one angle, nothing squared — that is type ①, function alone, and the first move is always to get the ratio by itself: sin x = −a half. Now the reference angle. Take it from the size of the number, never from the minus, because a calculator hands back a negative angle and that is not what you want. sin 30° is a half, so ref.&nbsp;∠&nbsp;= 30°. The minus is dealt with somewhere else entirely: on the cross. Sine is negative in the third and fourth quadrants, so tick the bottom two and write one line for each. Third quadrant is 180° plus the reference angle; fourth is 360° minus it. The k · 360° on the end is what turns two angles into every angle, because sine repeats itself every full turn forever, in both directions. One k&nbsp;∈&nbsp;ℤ at the bottom closes the whole thing off.", af: "Benoem die tipe voordat jy enigiets doen, en die vraag voel nie meer nuut nie. Een funksie, een hoek, niks in die kwadraat nie: dit is tipe ①, funksie alleen, en die eerste stap is altyd om die verhouding alleen te kry: sin x = −'n half. Nou die verwysingshoek. Neem dit uit die grootte van die getal, nooit uit die minus nie, want 'n sakrekenaar gee 'n negatiewe hoek terug en dit is nie wat jy wil hê nie. sin 30° is 'n half, dus verwysingshoek&nbsp;=&nbsp;30°. Die minus word heeltemal elders hanteer: op die kruis. sin is negatief in die derde en vierde kwadrante, dus merk die onderste twee en skryf een reël vir elkeen. Die derde kwadrant is 180° plus die verwysingshoek; die vierde is 360° minus dit. Die k · 360° aan die einde is wat twee hoeke in elke hoek verander, want sin herhaal homself elke volle draai, vir altyd, in albei rigtings. Een k&nbsp;∈&nbsp;ℤ onderaan maak die hele ding klaar.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write down the values of &nbsp;x&nbsp;∈&nbsp;[−360°&nbsp;;&nbsp;0°]&nbsp; that satisfy the equation in (a)", af: "Skryf vervolgens die waardes van &nbsp;x&nbsp;∈&nbsp;[−360°&nbsp;;&nbsp;0°]&nbsp; neer wat die vergelyking in (a) bevredig",
      },
      hint: {
        en: "Nothing new gets solved here. The general solution is the machine and k is the handle — take one branch at a time and feed it whole numbers. The interval is entirely below zero, so walk k downwards.", af: "Niks nuuts word hier opgelos nie. Die algemene oplossing is die masjien en k is die slinger: neem een tak op 'n slag en voer heelgetalle daarin. Die interval is heeltemal onder nul, dus stap k afwaarts.",
      },
      memo: [
        { type: "step", text: { en: "Feed whole numbers into each branch and keep whatever lands inside [−360°&nbsp;;&nbsp;0°]:", af: "Voer heelgetalle in elke tak in en hou wat ook al binne [−360°&nbsp;;&nbsp;0°] val:" } },
        { type: "step", text: { en: "x = 210° + k · 360°: &nbsp;k = 0 → 210° (out), &nbsp;k = −1 → −150°", af: "x = 210° + k · 360°: &nbsp;k = 0 → 210° (buite), &nbsp;k = −1 → −150°" } },
        { type: "step", text: { en: "x = 330° + k · 360°: &nbsp;k = 0 → 330° (out), &nbsp;k = −1 → −30°", af: "x = 330° + k · 360°: &nbsp;k = 0 → 330° (buite), &nbsp;k = −1 → −30°" } },
        { type: "answer", text: { en: "x = −150°", af: "x = −150°" }, ticks: ["a"] },
        { type: "answer", text: { en: "and &nbsp;x = −30°", af: "en &nbsp;x = −30°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: k = 0 gives 210° and 330°, and both are OUTSIDE the interval. Do not stop at k = 0 just because it is the easy one to substitute — step k in the direction the interval lies until you overshoot.", af: "PASOP: k = 0 gee 210° en 330°, en albei is BUITE die interval. Moenie by k = 0 stop net omdat dit die maklikste een is om te vervang nie: stap k in die rigting waar die interval lê totdat jy verbyskiet.",
        } },
      ],
      esplain: {
        en: "This is what the general solution is FOR, and it is why it always comes first and the interval is read off it afterwards. You are not hunting for angles any more — you already own a formula that makes every single one of them, so the only decision left is which whole numbers to feed it. One branch at a time. Start at k = 0 and step in the direction the interval lies; here everything is negative, so step downwards. Each substitution either lands inside [−360°&nbsp;;&nbsp;0°], in which case you write it down, or it does not, and the moment you overshoot the far end you are finished with that branch. Two branches, one hit each. Then look at what came out: −150° and −30° are 210° and 330° reached by walking clockwise instead of anticlockwise. Same two arms of the bow tie, same two spots on the circle.", af: "Dit is WAARVOOR die algemene oplossing is, en dit is hoekom dit altyd eerste kom en die interval eers daarna daaruit afgelees word. Jy soek nie meer na hoeke nie: jy het reeds 'n formule wat elkeen van hulle maak, dus is die enigste besluit wat oorbly watter heelgetalle jy daarin voer. Een tak op 'n slag. Begin by k = 0 en stap in die rigting waar die interval lê; hier is alles negatief, dus stap afwaarts. Elke vervanging val óf binne [−360°&nbsp;;&nbsp;0°], en dan skryf jy dit neer, óf nie, en sodra jy by die ander kant verbyskiet, is jy klaar met daardie tak. Twee takke, een treffer elk. Kyk dan wat uitgekom het: −150° en −30° is 210° en 330°, bereik deur kloksgewys te stap in plaas van antikloksgewys. Dieselfde twee arms van die strikdas, dieselfde twee kolle op die sirkel.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — TYPE ② SAME ANGLES, twice: bare, then with a bracket.
   Both parts land on a tan, so both get ONE quadrant line — her K3
   ruling, "waste of time!".
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.gs.q2",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-2-same-angles-divide-by-cos",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Determine the general solution of &nbsp;sin x − cos x = 0", af: "Bepaal die algemene oplossing van &nbsp;sin x − cos x = 0",
      },
      hint: {
        en: "Two different functions, but the SAME angle in both — that is the clue. Divide the whole line by cos x and watch a tan appear. And a tan answer only ever needs one quadrant line.", af: "Twee verskillende funksies, maar DIESELFDE hoek in albei: dit is die leidraad. Deel die hele reël deur cos x en kyk hoe 'n tan verskyn. En 'n tan-antwoord het net een kwadrantreël nodig.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ②: same angles</b> — both angles are x, so divide the whole line by cos x.", af: "<b>Tipe ②: dieselfde hoeke</b>. Albei hoeke is x, dus deel die hele reël deur cos x." } },
        { type: "step", text: { en: "sin x/cos x = cos x/cos x &nbsp;⟹&nbsp; tan x = 1", af: "sin x/cos x = cos x/cos x &nbsp;⟹&nbsp; tan x = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 45°", af: "verwysingshoek&nbsp;=&nbsp;45°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 45° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "x = 45° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: a tan answer gets ONE quadrant line, not two. The tan family already repeats every 180°, so the second line would say exactly the same thing twice — waste of time. That is also why the closer is k · 180° and not k · 360°.", af: "ONTHOU: 'n tan-antwoord kry EEN kwadrantreël, nie twee nie. Die tan-familie herhaal reeds elke 180°, dus sou die tweede reël presies dieselfde ding twee keer sê: 'n mors van tyd. Dit is ook hoekom die afsluiter k · 180° is en nie k · 360° nie.",
        } },
      ],
      esplain: {
        en: "The give-away for type ② is that the two functions are different but the angle is the same in both. When that happens you divide the entire line by cos x — every term of it, both sides — and sin x over cos x turns into tan x while cos x over cos x turns into 1. So the whole equation collapses to tan x = 1, and one function is all that is left. ref.&nbsp;∠&nbsp;= 45°, straight off the square triangle. Now the part worth remembering: a tan answer gets ONE quadrant line. Tan is positive in the first and third quadrants, but those two are exactly 180° apart, so writing both branches would produce the same list of angles twice over. She writes the second one out, strikes it through and puts \"waste of time!\" next to it. So the closer here is k · 180°, not k · 360° — the tan family repeats twice as often as the other two.", af: "Die verklapper vir tipe ② is dat die twee funksies verskil, maar die hoek in albei dieselfde is. As dit gebeur, deel jy die hele reël deur cos x, elke term daarvan, aan albei kante, en sin x oor cos x word tan x terwyl cos x oor cos x 1 word. Dus val die hele vergelyking ineen tot tan x = 1, en net een funksie bly oor. Verwysingshoek&nbsp;=&nbsp;45°, reguit van die vierkant-driehoek af. Nou die deel wat die moeite werd is om te onthou: 'n tan-antwoord kry EEN kwadrantreël. tan is positief in die eerste en derde kwadrante, maar daardie twee lê presies 180° uitmekaar, dus sou albei takke dieselfde lys hoeke twee keer gee. Sy skryf die tweede een uit, trek 'n streep daardeur en skryf \"'n mors van tyd!\" langsaan. Dus is die afsluiter hier k · 180°, nie k · 360° nie: die tan-familie herhaal twee keer so gereeld as die ander twee.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Determine the general solution of &nbsp;4 cos(x − 25°) = 3 sin(x − 25°), &nbsp;correct to two decimal places", af: "Bepaal die algemene oplossing van &nbsp;4 cos(x − 25°) = 3 sin(x − 25°), &nbsp;korrek tot twee desimale plekke",
      },
      hint: {
        en: "Same type as (a) — the angle in both brackets is identical, so divide the line by cos(x − 25°). Treat the whole bracket as the unknown right to the end, and only then move the 25° across.", af: "Dieselfde tipe as (a): die hoek in albei hakies is identies, dus deel die reël deur cos(x − 25°). Hanteer die hele hakie tot heel aan die einde as die onbekende, en bring eers dan die 25° oor.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ②: same angles</b> — both brackets are (x − 25°), so divide the whole line by cos(x − 25°).", af: "<b>Tipe ②: dieselfde hoeke</b>. Albei hakies is (x − 25°), dus deel die hele reël deur cos(x − 25°)." } },
        { type: "step", text: { en: "4 = 3 tan(x − 25°) &nbsp;⟹&nbsp; tan(x − 25°) = 4/3", af: "4 = 3 tan(x − 25°) &nbsp;⟹&nbsp; tan(x − 25°) = 4/3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 53,13°", af: "verwysingshoek&nbsp;=&nbsp;53,13°" }, ticks: ["ca"] },
        { type: "step", text: { en: "One line only, because it is a tan: &nbsp;x − 25° = 53,13° + k · 180°", af: "Net een reël, want dit is 'n tan: &nbsp;x − 25° = 53,13° + k · 180°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = 78,13° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "x = 78,13° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: solve for the BRACKET first and move the 25° across afterwards. A learner who adds 25° to the reference angle before writing the quadrant line gets a right-looking wrong answer, and the 25° must be added to the angle only — never to the k · 180°.", af: "PASOP: los eers vir die HAKIE op en bring die 25° daarna oor. 'n Leerder wat 25° by die verwysingshoek tel voordat die kwadrantreël geskryf is, kry 'n antwoord wat reg lyk maar verkeerd is, en die 25° word net by die hoek getel, nooit by die k · 180° nie.",
        } },
      ],
      esplain: {
        en: "Exactly the same type as (a), just wearing a bracket. The angle inside both functions is (x − 25°) — identical on both sides — so dividing the line by cos(x − 25°) is legal and turns the sine into a tan. That leaves 4 = 3 tan(x − 25°), so tan(x − 25°) is four thirds, and the reference angle is 53,13°. Now the habit that keeps compound angles honest: treat the whole bracket as the unknown and write the quadrant line for THE BRACKET, not for x. So x − 25° = 53,13° + k · 180°. Only when that line is written do you move the 25° across, and it lands on the angle alone — 53,13° + 25° is 78,13° — while the k · 180° is untouched. Because it is a tan, one line is the whole answer, and k&nbsp;∈&nbsp;ℤ closes it.", af: "Presies dieselfde tipe as (a), net met 'n hakie aan. Die hoek binne albei funksies is (x − 25°), identies aan albei kante, dus is dit wettig om die reël deur cos(x − 25°) te deel, en die sin word 'n tan. Dan bly 4 = 3 tan(x − 25°) oor, dus is tan(x − 25°) vier derdes, en die verwysingshoek is 53,13°. Nou die gewoonte wat saamgestelde hoeke eerlik hou: hanteer die hele hakie as die onbekende en skryf die kwadrantreël vir DIE HAKIE, nie vir x nie. Dus x − 25° = 53,13° + k · 180°. Eers wanneer daardie reël geskryf is, bring jy die 25° oor, en dit beland net op die hoek: 53,13° + 25° is 78,13°, terwyl die k · 180° onaangeraak bly. Omdat dit 'n tan is, is een reël die hele antwoord, en k&nbsp;∈&nbsp;ℤ maak dit klaar.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — TYPE ⑤ TRINOMIAL, the harder half: the middle term differs, so
   a MASKED IDENTITY has to fix the equation before the K-method can
   start. One branch turns out to be asking sine for a value it does
   not own — "no solution", her words, never "undefined".
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.gs.q3",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-5-trinomial-masked-identity-one-branch-dead",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;2 cos²x + 5 sin x − 4 = 0", af: "Bepaal die algemene oplossing van &nbsp;2 cos²x + 5 sin x − 4 = 0",
      },
      hint: {
        en: "Three terms, one function squared and the other one not — but they are not the SAME function, and a trinomial needs them to be. A masked identity fixes that in one line, and then it is an ordinary quadratic with a letter you already know.", af: "Drie terme, een funksie in die kwadraat en die ander nie, maar dit is nie DIESELFDE funksie nie, en 'n drieterm het dit nodig. 'n Gemaskerde identiteit maak dit in een reël reg, en dan is dit 'n gewone kwadratiese vergelyking met 'n letter wat jy reeds ken.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ⑤: trinomial</b> — three terms, one function squared. The middle term differs, so rewrite the squared function with a masked identity first.", af: "<b>Tipe ⑤: drieterm</b>. Drie terme, een funksie in die kwadraat. Die middelterm verskil, dus herskryf eers die funksie in die kwadraat met 'n gemaskerde identiteit." } },
        { type: "step", text: { en: "cos²x = 1 − sin²x: &nbsp;2(1 − sin²x) + 5 sin x − 4 = 0", af: "cos²x = 1 − sin²x: &nbsp;2(1 − sin²x) + 5 sin x − 4 = 0" }, ticks: ["s/f"] },
        { type: "step", text: { en: "2 − 2sin²x + 5 sin x − 4 = 0 &nbsp;⟹&nbsp; 2sin²x − 5 sin x + 2 = 0", af: "2 − 2sin²x + 5 sin x − 4 = 0 &nbsp;⟹&nbsp; 2sin²x − 5 sin x + 2 = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "Let K = sin x: &nbsp;2K² − 5K + 2 = 0 &nbsp;⟹&nbsp; (2K − 1)(K − 2) = 0", af: "Stel K = sin x: &nbsp;2K² − 5K + 2 = 0 &nbsp;⟹&nbsp; (2K − 1)(K − 2) = 0" }, ticks: ["ca"] },
        { type: "step", text: { en: "K = 1/2 → sin x = 1/2 &nbsp;&nbsp;or&nbsp;&nbsp; K = 2 → sin x = 2, which has <b>no solution</b>", af: "K = 1/2 → sin x = 1/2 &nbsp;&nbsp;of&nbsp;&nbsp; K = 2 → sin x = 2, wat <b>geen oplossing</b> het nie" }, ticks: ["ca"] },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30°, and sin is positive, so tick the cross at the <b>top</b>: I and II.", af: "verwysingshoek&nbsp;=&nbsp;30°, en sin is positief, dus merk die kruis <b>bo</b>: I en II." } },
        { type: "answer", text: { en: "x = 30° + k · 360°", af: "x = 30° + k · 360°" }, ticks: ["a"] },
        { type: "answer", text: { en: "or &nbsp;x = 180° − 30° + k · 360° = 150° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "of &nbsp;x = 180° − 30° + k · 360° = 150° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: sin x = 2 has <b>no solution</b>. Those are the two words — not \"undefined\", not \"no real solution\". Sine is a side over the hypotenuse, the hypotenuse is the longest side, so sin x lives between −1 and 1 and nowhere else. Writing that line is a mark on its own.", af: "PASOP: sin x = 2 het <b>geen oplossing</b> nie. Dit is die twee woorde: nie \"onbepaald\" nie, nie \"geen reële oplossing\" nie. sin is 'n sy oor die skuinssy, die skuinssy is die langste sy, dus leef sin x tussen −1 en 1 en nêrens anders nie. Om daardie reël te skryf, is op sigself 'n punt.",
        } },
        { type: "trap", text: {
          en: "REMEMBER: put the function BACK. An answer left sitting on K answers a question nobody asked, and every year somebody solves the quadratic perfectly and then stops.", af: "ONTHOU: sit die funksie TERUG. 'n Antwoord wat op K bly staan, beantwoord 'n vraag wat niemand gevra het nie, en elke jaar los iemand die kwadratiese vergelyking perfek op en stop dan.",
        } },
      ],
      esplain: {
        en: "Three terms with one function squared says trinomial, but look again — the squared one is a cosine and the plain one is a sine, and a trinomial needs them to match. That is what a masked identity is for. cos²x is 1 − sin²x, so swap it in and every term becomes a sine. Tidy up and you have 2sin²x − 5 sin x + 2 = 0, which is an ordinary quadratic wearing trig clothes. Let K = sin x, factorise 2K² − 5K + 2 the way you have a hundred times, and put sin x back at the end — that last step is not optional. Two branches. sin x = 2 is asking sine for a value it does not own, because sine never leaves the strip between −1 and 1, so you write no solution and move on: that sentence is a mark. sin x = a half gives ref.&nbsp;∠&nbsp;= 30°, sine is positive so tick I and II, and two lines finish it.", af: "Drie terme met een funksie in die kwadraat sê drieterm, maar kyk weer: die een in die kwadraat is 'n cos en die gewone een is 'n sin, en 'n drieterm het nodig dat hulle ooreenstem. Daarvoor is 'n gemaskerde identiteit. cos²x is 1 − sin²x, dus ruil dit in en elke term word 'n sin. Ruim op en jy het 2sin²x − 5 sin x + 2 = 0, 'n gewone kwadratiese vergelyking in trig-klere. Stel K = sin x, faktoriseer 2K² − 5K + 2 soos jy al honderd keer gedoen het, en sit sin x aan die einde terug: daardie laaste stap is nie opsioneel nie. Twee takke. sin x = 2 vra sin vir 'n waarde wat hy nie het nie, want sin gaan nooit buite −1 tot 1 nie, dus skryf jy geen oplossing en gaan aan: daardie reël is 'n punt werd. sin x = 'n half gee verwysingshoek&nbsp;=&nbsp;30°, sin is positief, dus merk I en II, en twee reëls maak dit klaar.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — TYPE ⑥ CO-FUNCTIONS. sin on one side, cos on the other,
   different angles, NO reference angle. Make both sides the same
   function with the 90° − trick, then match the two brackets.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.gs.q4",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-6-cofunction-two-cases-then-interval",
  paper: PAPER,
  lostQuest: LOST_TYPES,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(x + 30°) = cos 2x", af: "Bepaal die algemene oplossing van &nbsp;sin(x + 30°) = cos 2x",
      },
      hint: {
        en: "A sine on one side and a cosine on the other, with different angles inside — you cannot divide your way out of this one. Turn the cos into a sin with the 90° − trick so both sides are the same function, then match the brackets. There is no reference angle here at all.", af: "Aan die een kant 'n sin en aan die ander kant 'n cos, met verskillende hoeke binne: hier kan jy nie jou pad uit deel nie. Maak die cos 'n sin met die 90° − truuk sodat albei kante dieselfde funksie is, stel dan die hakies gelyk. Hier is glad nie 'n verwysingshoek nie.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ⑥: co-functions</b> — different angles, and <b>no reference angle</b>. Make both sides the same function first.", af: "<b>Tipe ⑥: ko-funksies</b>. Verskillende hoeke, en <b>geen verwysingshoek</b> nie. Maak eers albei kante dieselfde funksie." } },
        { type: "step", text: { en: "cos 2x = sin(90° − 2x), so &nbsp;sin(x + 30°) = sin(90° − 2x)", af: "cos 2x = sin(90° − 2x), dus &nbsp;sin(x + 30°) = sin(90° − 2x)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "sin = sin uses <b>I and II</b>. Match the two brackets, one quadrant at a time.", af: "sin = sin gebruik <b>I en II</b>. Stel die twee hakies gelyk, een kwadrant op 'n slag." } },
        { type: "step", text: { en: "I: &nbsp;x + 30° = 90° − 2x + k · 360°", af: "I: &nbsp;x + 30° = 90° − 2x + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "3x = 60° + k · 360° &nbsp;⟹&nbsp; x = 20° + k · 120°", af: "3x = 60° + k · 360° &nbsp;⟹&nbsp; x = 20° + k · 120°" }, ticks: ["a"] },
        { type: "step", text: { en: "II: &nbsp;x + 30° = 180° − (90° − 2x) + k · 360°", af: "II: &nbsp;x + 30° = 180° − (90° − 2x) + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "x + 30° = 90° + 2x + k · 360° &nbsp;⟹&nbsp; −x = 60° + k · 360°", af: "x + 30° = 90° + 2x + k · 360° &nbsp;⟹&nbsp; −x = 60° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "x = −60° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "x = −60° + k · 360°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the whole right-hand bracket goes inside the 180° − ( … ) in the second quadrant line, brackets and all. 180° − (90° − 2x) is 90° + 2x, not 90° − 2x — dropping those brackets flips a sign and kills the branch.", af: "PASOP: die hele hakie aan die regterkant gaan binne die 180° − ( … ) in die tweede kwadrantreël, hakies en al. 180° − (90° − 2x) is 90° + 2x, nie 90° − 2x nie: as jy daardie hakies weglaat, draai 'n teken om en die tak is dood.",
        } },
      ],
      esplain: {
        en: "This is the one type where dividing gets you nowhere, because the angles inside the two functions are different. So you change the FUNCTION instead. A 90° split is the only split that converts between sin and cos, so cos 2x can be rewritten as sin(90° − 2x), and suddenly both sides are sines. Now you are asking when two sines are equal, and that happens in two places on the circle: the angles are the same (quadrant I), or they are supplementary (quadrant II). Write one line for each, treating each whole bracket as a single thing, and keep the brackets when you subtract — 180° − (90° − 2x) is 90° + 2x, and dropping those brackets is the classic way to lose the second branch. Then divide through where you need to. There is no reference angle anywhere in this question, and there was never meant to be: you matched two brackets instead of measuring an angle.", af: "Dit is die een tipe waar deel jou nêrens bring nie, want die hoeke binne die twee funksies verskil. Dus verander jy eerder die FUNKSIE. 'n 90°-opdeling is die enigste opdeling wat tussen sin en cos omskakel, dus kan cos 2x herskryf word as sin(90° − 2x), en skielik is albei kante 'n sin. Nou vra jy wanneer sin = sin, en dit gebeur op twee plekke op die sirkel: die hoeke is dieselfde (kwadrant I), of hulle is supplementêr (kwadrant II). Skryf een reël vir elkeen, hanteer elke hele hakie as een ding, en hou die hakies wanneer jy aftrek: 180° − (90° − 2x) is 90° + 2x, en om daardie hakies weg te laat, is die klassieke manier om die tweede tak te verloor. Deel dan deur waar jy moet. Daar is nêrens in hierdie vraag 'n verwysingshoek nie, en dit was ook nooit die bedoeling nie: jy het twee hakies gelykgestel in plaas daarvan om 'n hoek te meet.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence determine the values of &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; that satisfy the equation in (a)", af: "Bepaal vervolgens die waardes van &nbsp;x&nbsp;∈&nbsp;[0°&nbsp;;&nbsp;360°]&nbsp; wat die vergelyking in (a) bevredig",
      },
      hint: {
        en: "Two families, two handles. The first repeats every 120°, so it will land inside the interval more than once — keep going until you overshoot.", af: "Twee families, twee slingers. Die eerste herhaal elke 120°, dus sal dit meer as een keer binne die interval val: hou aan totdat jy verbyskiet.",
      },
      memo: [
        { type: "step", text: { en: "Feed whole numbers into each family and keep whatever lands inside [0°&nbsp;;&nbsp;360°]:", af: "Voer heelgetalle in elke familie in en hou wat ook al binne [0°&nbsp;;&nbsp;360°] val:" } },
        { type: "step", text: { en: "x = 20° + k · 120°: &nbsp;k = 0 → 20°, &nbsp;k = 1 → 140°, &nbsp;k = 2 → 260°, &nbsp;k = 3 → 380° (out)", af: "x = 20° + k · 120°: &nbsp;k = 0 → 20°, &nbsp;k = 1 → 140°, &nbsp;k = 2 → 260°, &nbsp;k = 3 → 380° (buite)" } },
        { type: "step", text: { en: "x = −60° + k · 360°: &nbsp;k = 0 → −60° (out), &nbsp;k = 1 → 300°", af: "x = −60° + k · 360°: &nbsp;k = 0 → −60° (buite), &nbsp;k = 1 → 300°" } },
        { type: "answer", text: { en: "From the first family: &nbsp;x = 20°, &nbsp;140° &nbsp;or&nbsp; 260°", af: "Uit die eerste familie: &nbsp;x = 20°, &nbsp;140° &nbsp;of&nbsp; 260°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "From the second: &nbsp;x = 300°", af: "Uit die tweede: &nbsp;x = 300°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the two families do NOT repeat at the same rate — one every 120°, the other every 360°. Three answers come from the first and only one from the second, so a learner who assumes \"one each\" writes down half the list.", af: "PASOP: die twee families herhaal NIE ewe vinnig nie: die een elke 120°, die ander elke 360°. Drie antwoorde kom uit die eerste en net een uit die tweede, dus skryf 'n leerder wat \"een elk\" aanneem net die helfte van die lys neer.",
        } },
      ],
      esplain: {
        en: "Two branches, but they do not behave the same way, and that is the whole point of this part. The first family, x = 20° + k · 120°, repeats every 120°, so it fits into a 360° interval three times over: 20°, 140° and 260°, and the next one, 380°, has overshot. The second family, x = −60° + k · 360°, repeats only once per full turn, so inside [0°&nbsp;;&nbsp;360°] it lands exactly once, at 300°. Four values altogether. The reason the rates differ is the divide-through: the first quadrant line had a 3x in it, so dividing by 3 shrank the k · 360° to k · 120° as well, while the second line finished with a lone x and kept its full 360°. Whenever your two branches close with different multiples of k, expect different numbers of answers — and walk each handle separately until it overshoots.", af: "Twee takke, maar hulle gedra hulle nie dieselfde nie, en dit is die hele punt van hierdie deel. Die eerste familie, x = 20° + k · 120°, herhaal elke 120°, dus pas dit drie keer in 'n interval van 360°: 20°, 140° en 260°, en die volgende een, 380°, het verbygeskiet. Die tweede familie, x = −60° + k · 360°, herhaal net een keer per volle draai, dus val dit presies een keer binne [0°&nbsp;;&nbsp;360°], by 300°. Altesaam vier waardes. Die rede vir die verskil is die deling: die eerste kwadrantreël het 'n 3x gehad, dus het deel deur 3 die k · 360° ook tot k · 120° laat krimp, terwyl die tweede reël op 'n alleen x geëindig en sy volle 360° behou het. Wanneer jou twee takke met verskillende veelvoude van k eindig, verwag 'n verskillende aantal antwoorde, en draai elke slinger apart totdat dit verbyskiet.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — TYPE ① AGAIN, with a COMPOUND ANGLE inside. The two habits that
   decide the marks: write the quadrant line for the BRACKET, then
   divide EVERY term by the coefficient.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.gs.q5",
  chapter: CH,
  topic: "general-solution",
  archetype: "general-solution-type-1-compound-angle-divide-through",
  paper: PAPER,
  lostQuest: LOST_STEPS,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 6,
      level: 3,
      prompt: {
        en: "Determine the general solution of &nbsp;sin(2x − 30°) = −1/2", af: "Bepaal die algemene oplossing van &nbsp;sin(2x − 30°) = −1/2",
      },
      hint: {
        en: "The ratio is already on its own, so this is still type ①. Treat the whole bracket (2x − 30°) as the unknown and write both quadrant lines for IT. The dividing by 2 comes last — and every term of the line gets divided, the k · 360° included.", af: "Die verhouding staan reeds alleen, dus is dit steeds tipe ①. Hanteer die hele hakie (2x − 30°) as die onbekende en skryf albei kwadrantreëls vir DIT. Die deel deur 2 kom laaste, en elke term van die reël word gedeel, die k · 360° ingesluit.",
      },
      memo: [
        { type: "step", text: { en: "<b>Type ①: function alone</b> — the ratio is already on its own. Treat the whole bracket (2x − 30°) as the unknown.", af: "<b>Tipe ①: funksie alleen</b>. Die verhouding staan reeds alleen. Hanteer die hele hakie (2x − 30°) as die onbekende." } },
        { type: "step", text: { en: "ref.&nbsp;∠&nbsp;= 30° &nbsp;(from the size of the number), and sin is negative, so tick the cross at the <b>bottom</b>: III and IV.", af: "verwysingshoek&nbsp;=&nbsp;30° &nbsp;(uit die grootte van die getal), en sin is negatief, dus merk die kruis <b>onder</b>: III en IV." }, ticks: ["s/f"] },
        { type: "step", text: { en: "III: &nbsp;2x − 30° = 180° + 30° + k · 360° = 210° + k · 360°", af: "III: &nbsp;2x − 30° = 180° + 30° + k · 360° = 210° + k · 360°" }, ticks: ["ca"] },
        { type: "step", text: { en: "2x = 240° + k · 360°", af: "2x = 240° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Divide every term by 2: &nbsp;x = 120° + k · 180°", af: "Deel elke term deur 2: &nbsp;x = 120° + k · 180°" }, ticks: ["a"] },
        { type: "step", text: { en: "IV: &nbsp;2x − 30° = 360° − 30° + k · 360° = 330° + k · 360° &nbsp;⟹&nbsp; 2x = 360° + k · 360°", af: "IV: &nbsp;2x − 30° = 360° − 30° + k · 360° = 330° + k · 360° &nbsp;⟹&nbsp; 2x = 360° + k · 360°" }, ticks: ["ca"] },
        { type: "answer", text: { en: "Divide every term by 2: &nbsp;x = 180° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ", af: "Deel elke term deur 2: &nbsp;x = 180° + k · 180°, &nbsp;k&nbsp;∈&nbsp;ℤ" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the k · 360° gets divided by 2 as well, so it becomes k · 180°. Leaving it as k · 360° halves the number of answers you will find later, and the mistake is invisible until an interval question exposes it.", af: "PASOP: die k · 360° word ook deur 2 gedeel, dus word dit k · 180°. As jy dit as k · 360° los, halveer dit die aantal antwoorde wat jy later sal kry, en die fout is onsigbaar totdat 'n intervalvraag dit blootlê.",
        } },
        { type: "trap", text: TRAP_K },
      ],
      esplain: {
        en: "Nothing about the type has changed — one function, on its own, so it is still type ①. What has changed is the bookkeeping, and there are two habits that carry it. First: the unknown is the whole bracket, 2x − 30°, so write both quadrant lines for the bracket and do not touch the x until they are down on paper. Third quadrant is 180° plus the reference angle; fourth is 360° minus it. Second: once the bracket is alone, divide EVERY term of the line by 2 — the angle and the k · 360° alike. She writes the divisor under each piece in a second colour so nothing gets missed. That turns k · 360° into k · 180°, which is what packs the answers twice as close together. Skip that and your general solution will look right and quietly hide half its solutions the moment somebody asks for an interval.", af: "Niks aan die tipe het verander nie: een funksie, alleen, dus is dit steeds tipe ①. Wat verander het, is die boekhouding, en twee gewoontes dra dit. Eerstens: die onbekende is die hele hakie, 2x − 30°, dus skryf albei kwadrantreëls vir die hakie en moenie aan die x raak voordat hulle op papier is nie. Die derde kwadrant is 180° plus die verwysingshoek; die vierde is 360° minus dit. Tweedens: sodra die hakie alleen staan, deel ELKE term van die reël deur 2, die hoek en die k · 360° albei. Sy skryf die deler in 'n tweede kleur onder elke stuk sodat niks gemis word nie. Dit verander k · 360° in k · 180°, en dit is wat die antwoorde twee keer so na aan mekaar pak. Slaan dit oor, en jou algemene oplossing sal reg lyk, maar stilletjies die helfte van sy oplossings wegsteek sodra iemand na 'n interval vra.",
      },
    },
  ],
};

export const gtrigGeneralSolutionSiblingQuestions = [q1, q2, q3, q4, q5];
