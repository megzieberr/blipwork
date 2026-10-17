/* ============================================================
   EXAM FOCUS — Trig Graphs · LEVEL 4 ★ "the brave round"
   (SESSION E, 2026-08-23, EXAM-BUILD-DAY.md ruling 5)
   ------------------------------------------------------------
   Six cards, every one carrying at least one level-4 part, and no
   part below level 3 — the low achievers must never meet a ★ while
   drilling basics, so everything hard about trig graphs lives here
   and nowhere else in the chapter.

   WHAT MAKES A PART LEVEL 4 HERE: it is un-cued (nothing in the
   wording says which fact to use), it takes several linked steps, or
   it runs the ordinary question backwards. The six:

     q1  TWO unknown parameters read off a sketch whose only given
         point carries decimals — intercept spacing gives b, then the
         point gives a
     q2  the general solution of f(x) = g(x) is handed over and the
         CONSTANT has to be shown from it (2026-Q2.4's mould)
     q3  a shifted graph written in two equivalent forms, cosine and
         sine, and then used
     q4  an inequality over a window with a tangent ASYMPTOTE inside
         the answer, so one end is included and the other is not
     q5  the vertical gap between two graphs at a given x, then the
         MAXIMUM such gap — which needs amplitude reasoning, not a
         calculator
     q6  "for which values of k does y = k cut f exactly three times"
         — a counting argument over a window that is one and a half
         periods long

   Two-parameter wall respected on every curve (GR11-IEB-PAPER-BANK.md).
   No compound-angle or double-angle work anywhere: every crossing is
   either a special angle or given in the stem, because those formulae
   are Grade 12 (METHODS-trig.md Part P).
   ============================================================ */

const PAPER = "siblings";
const CH = "tgraph";
const TOPIC = "level-4";

/* ===============================================================
   q1 — two unknowns off one sketch.
   f(x) = a sin bx cuts the x-axis at 0° and 90° and passes through
   A(22,5° ; 1,41)  ⇒  period 180°, b = 2, a = 2.
   =============================================================== */
const Q1_WIN = { xmin: -90, xmax: 180, ymin: -3, ymax: 3 };
const Q1_F = { fn: "sin", a: 2, b: 2, p: 0, q: 0, tone: "a", label: "f", labelAt: 155 };
const Q1_SPEC = {
  type: "trigg", win: Q1_WIN, xstep: 45, ystep: 1, w: 400, h: 300,
  curves: [Q1_F],
  points: [
    { x: 90, y: 0, on: 0, label: "(90° ; 0)", place: "above" },
    { x: 22.5, y: 1.41, on: 0, label: "A(22,5° ; 1,41)", place: "above" },
  ],
};

const q1 = {
  id: "tgraph.l4.q1",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "read-two-unknown-parameters-off-a-sketch-from-an-intercept-and-a-decimal-point",
  lostQuest: { chapter: CH, quest: "tg6" },
  marks: 6,
  diagram: {
    spec: Q1_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          hmeasure: { x0: 0, x1: 180, y: 2, label: "period = 180°" },
          vmeasure: { x: 45, y0: -2, y1: 2 },
        },
      },
      b: { question: {}, reveal: { points: [{ x: 45, y: 2, on: 0, label: "(45° ; 2)", place: "above" }] } },
    },
  },
  parts: [
    {
      id: "a", marks: 4, level: 4,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = a sin bx, &nbsp;where a and b are constants and &nbsp;b &gt; 0. &nbsp;The graph cuts the x-axis at the origin and at (90° ; 0), and passes through the point A(22,5° ; 1,41).<br><br>Determine the value of a and the value of b.", af: "Die skets toon die grafiek van &nbsp;f(x) = a sin bx, &nbsp;waar a en b konstantes is en &nbsp;b &gt; 0. &nbsp;Die grafiek sny die x-as by die oorsprong en by (90° ; 0), en gaan deur die punt A(22,5° ; 1,41).<br><br>Bepaal die waarde van a en die waarde van b." },
      hint: { en: "Two unknowns need two facts, and you have been given three. Start with the pair that does not involve a at all — two x-intercepts in a row tell you about width, and width is b's job.", af: "Twee onbekendes het twee feite nodig, en jy het drie gekry. Begin met die paar wat glad nie a bevat nie: twee opeenvolgende x-afsnitte vertel jou van breedte, en breedte is b se werk." },
      memo: [
        { type: "step", text: { en: "Two x-intercepts in a row are HALF a period apart: &nbsp;90° − 0° = 90° = period ÷ 2", af: "Twee opeenvolgende x-afsnitte is 'n HALWE periode uitmekaar: &nbsp;90° − 0° = 90° = periode ÷ 2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "∴&nbsp; period = 180° &nbsp;and&nbsp; b = 360° ÷ 180° = <b>2</b>", af: "∴&nbsp; periode = 180° &nbsp;en&nbsp; b = 360° ÷ 180° = <b>2</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "Now substitute A(22,5° ; 1,41) into &nbsp;f(x) = a sin 2x: &nbsp;&nbsp;a sin(2 × 22,5°) = 1,41", af: "Vervang nou A(22,5° ; 1,41) in &nbsp;f(x) = a sin 2x: &nbsp;&nbsp;a sin(2 × 22,5°) = 1,41" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "a sin 45° = 1,41 &nbsp;⟹&nbsp; a(0,71) = 1,41 &nbsp;⟹&nbsp; a = <b>2</b> &nbsp;&nbsp;∴&nbsp; f(x) = 2 sin 2x", af: "a sin 45° = 1,41 &nbsp;⟹&nbsp; a(0,71) = 1,41 &nbsp;⟹&nbsp; a = <b>2</b> &nbsp;&nbsp;∴&nbsp; f(x) = 2 sin 2x" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: two x-intercepts NEXT TO EACH OTHER are half a period apart, not a whole one. Treating 90° as the full period gives b = 4 and a graph with twice as many waves as the sketch shows — always check your b against the picture by counting waves.", af: "PASOP: twee x-afsnitte LANGS MEKAAR is 'n halwe periode uitmekaar, nie 'n hele een nie. As jy 90° as die volle periode neem, kry jy b = 4 en 'n grafiek met twee keer soveel golwe as wat die skets wys: kontroleer altyd jou b teen die prentjie deur die golwe te tel." } },
      ],
      esplain: { en: "When a sketch gives you more information than you need, choose the order that keeps the unknowns apart. Here two of the given facts are x-intercepts, and intercepts are about where the graph is, sideways, which makes them a b question with no a in sight. A sine graph crosses the axis twice per wave, so two crossings in a row are exactly half a period apart. Ninety degrees is half, so the period is 180°, and b is 360° divided by that, which is 2. Only now bring in the point A, because with b known it has just one unknown left in it. Put its x into the equation, work out the sine, and divide. The answer 1,41 is really √2, and sin 45° is really √2 over 2 — so the a comes out as exactly 2, and the decimals in the question were only there to hide that.", af: "Wanneer 'n skets jou meer inligting gee as wat jy nodig het, kies die volgorde wat die onbekendes uitmekaar hou. Hier is twee van die gegewe feite x-afsnitte, en afsnitte gaan oor waar die grafiek links of regs lê, wat hulle 'n b-vraag maak met geen a in sig nie. 'n Sin-grafiek kruis die as twee keer per golf, dus is twee opeenvolgende kruisings presies 'n halwe periode uitmekaar. Negentig grade is die helfte, dus is die periode 180°, en b is 360° gedeel daardeur, wat 2 is. Bring eers nou die punt A in, want met b bekend het dit net een onbekende oor. Sit sy x in die vergelyking, werk die sin uit, en deel. Die antwoord 1,41 is eintlik √2, en sin 45° is eintlik √2 oor 2, dus kom a presies uit as 2, en die desimale getalle in die vraag was net daar om dit weg te steek." },
    },
    {
      id: "b", marks: 2, level: 3,
      prompt: { en: "Write down the coordinates of the maximum turning point of f in the given interval.", af: "Skryf die koördinate van die maksimum draaipunt van f in die gegewe interval neer." },
      hint: { en: "A sine graph reaches its maximum a quarter of a period after an upward crossing of the x-axis. You already know the period from (a).", af: "'n Sin-grafiek bereik sy maksimum 'n kwart periode nadat dit die x-as opwaarts kruis. Jy ken reeds die periode uit (a)." },
      memo: [
        { type: "step", text: { en: "A quarter of a period is &nbsp;180° ÷ 4 = 45°, &nbsp;measured on from the upward crossing at the origin.", af: "'n Kwart periode is &nbsp;180° ÷ 4 = 45°, &nbsp;gemeet vanaf die opwaartse kruising by die oorsprong." }, ticks: ["ca"] },
        { type: "answer", text: { en: "The maximum value is a = 2 &nbsp;&nbsp;∴&nbsp; (45° ; 2)", af: "Die maksimum waarde is a = 2 &nbsp;&nbsp;∴&nbsp; (45° ; 2)" }, ticks: ["ca"] },
      ],
      esplain: { en: "Turning points come from the rhythm of the graph, not from a calculator. A sine graph leaves the x-axis going up, reaches its highest point a quarter of a period later, comes back down through the axis at the halfway mark and bottoms out three quarters of the way through. Here the period is 180°, so a quarter is 45°, and the graph goes up through the origin, which puts the maximum at x = 45°. The height of a maximum is the midline plus the amplitude, and with a midline of 0 and an amplitude of 2 that is simply 2. Both ticks on this part are follow-through: if your a or b from part (a) had been slightly off, using them correctly here still earns the marks.", af: "Draaipunte kom uit die ritme van die grafiek, nie uit 'n sakrekenaar nie. 'n Sin-grafiek verlaat die x-as op pad op, bereik sy hoogste punt 'n kwart periode later, kom halfpad terug af deur die as en bereik sy laagste punt op driekwart van die pad. Hier is die periode 180°, dus is 'n kwart 45°, en die grafiek gaan opwaarts deur die oorsprong, wat die maksimum by x = 45° plaas. Die hoogte van 'n maksimum is die middelste lyn plus die amplitude, en met 'n middelste lyn van 0 en 'n amplitude van 2 is dit eenvoudig 2. Albei regmerkies in hierdie deel is ca-punte: as jou a of b uit deel (a) effens verkeerd was, verdien jy steeds die punte as jy dit hier korrek gebruik." },
    },
  ],
};

/* ===============================================================
   q2 — the general solution handed over, the constant shown from it.
   f(x) = a cos x, g(x) = sin x. f(x) = g(x) ⟹ tan x = a, and the
   given general solution x = 60° + k·180° forces a = tan 60° = √3.
   =============================================================== */
const Q2_WIN = { xmin: -180, xmax: 180, ymin: -2.5, ymax: 2.5 };
const Q2_SPEC = {
  type: "trigg", win: Q2_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: Math.sqrt(3), b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 180 },
    { fn: "sin", a: 1, b: 1, p: 0, q: 0, tone: "b", label: "g", labelAt: 120 },
  ],
};

const q2 = {
  id: "tgraph.l4.q2",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "given-the-general-solution-work-backwards-to-the-constant",
  lostQuest: { chapter: CH, quest: "tg7" },
  marks: 6,
  diagram: {
    spec: Q2_SPEC,
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 1.73, label: "y = √3" }] } },
      b: {
        question: {},
        reveal: {
          points: [
            { x: 60, y: 0.87, on: [0, 1], label: "(60° ; 0,87)", place: "above" },
            { x: -120, y: -0.87, on: [0, 1], label: "(−120° ; −0,87)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 4,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = a cos x&nbsp; and &nbsp;g(x) = sin x&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;where a is a constant. &nbsp;The general solution of &nbsp;f(x) = g(x)&nbsp; is &nbsp;x = 60° + k·180°, &nbsp;k ∈ ℤ.<br><br>Show that &nbsp;a = √3.", af: "Die skets toon die grafieke van &nbsp;f(x) = a cos x&nbsp; en &nbsp;g(x) = sin x&nbsp; vir &nbsp;x ∈ [−180° ; 180°], &nbsp;waar a 'n konstante is. &nbsp;Die algemene oplossing van &nbsp;f(x) = g(x)&nbsp; is &nbsp;x = 60° + k·180°, &nbsp;k ∈ ℤ.<br><br>Toon aan dat &nbsp;a = √3." },
      hint: { en: "Start by writing down what &nbsp;f(x) = g(x)&nbsp; actually says, then get all the trig onto one side. A cosine dividing a sine leaves you with something you can look up.", af: "Begin deur neer te skryf wat &nbsp;f(x) = g(x)&nbsp; eintlik sê, en kry dan al die trig aan een kant. As jy 'n sin deur 'n cos deel, kry jy iets wat jy kan naslaan." },
      memo: [
        { type: "step", text: { en: "The graphs cut where &nbsp;f(x) = g(x): &nbsp;&nbsp;a cos x = sin x", af: "Die grafieke sny waar &nbsp;f(x) = g(x): &nbsp;&nbsp;a cos x = sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide both sides by &nbsp;cos x: &nbsp;&nbsp;a = sin x ÷ cos x = tan x", af: "Deel albei kante deur &nbsp;cos x: &nbsp;&nbsp;a = sin x ÷ cos x = tan x" }, ticks: ["a"] },
        { type: "answer", text: { en: "The general solution given is &nbsp;x = 60° + k·180°, &nbsp;so &nbsp;a = tan 60° = <b>√3</b>", af: "Die gegewe algemene oplossing is &nbsp;x = 60° + k·180°, &nbsp;dus &nbsp;a = tan 60° = <b>√3</b>" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER why the general solution has a 180° in it rather than a 360°: it is a TANGENT equation, and a tangent repeats every 180°. That is also your clue that dividing by cos x is the right move — the answer's shape tells you which ratio you are heading for.", af: "ONTHOU hoekom die algemene oplossing 'n 180° in het eerder as 'n 360°: dit is 'n TAN-vergelyking, en tan herhaal elke 180°. Dit is ook jou leidraad dat deel deur cos x die regte stap is: die vorm van die antwoord sê vir jou na watter verhouding jy op pad is." } },
      ],
      esplain: { en: "This is the graphs question asked in reverse, and the trick is to stop looking at the picture and write the algebra down first. Two graphs cut where their equations are equal, so a cos x = sin x. Everything after that is ordinary Grade 11 trig: divide both sides by cos x, and the right-hand side becomes sin over cos, which is tan x. So a equals tan x at every crossing. Now use what you were given. The crossings are at 60° plus multiples of 180°, so putting the simplest one in gives a = tan 60°, which is √3 exactly from the special-angle triangles. Notice that every other crossing gives the same answer, because tan repeats every 180° — which is a good sanity check that the general solution and the equation really do fit together.", af: "Dit is die grafiekvraag omgekeerd gevra, en die truuk is om op te hou na die prentjie kyk en eers die algebra neer te skryf. Twee grafieke sny waar hul vergelykings gelyk is, dus a cos x = sin x. Alles daarna is gewone Graad 11-trig: deel albei kante deur cos x, en die regterkant word sin oor cos, wat tan x is. Dus is a gelyk aan tan x by elke snypunt. Gebruik nou wat jy gekry het. Die snypunte is by 60° plus veelvoude van 180°, dus gee die eenvoudigste een a = tan 60°, wat presies √3 is uit die spesiale-hoek-driehoeke. Let op dat elke ander snypunt dieselfde antwoord gee, want tan herhaal elke 180°: dit is 'n goeie kontrole dat die algemene oplossing en die vergelyking regtig by mekaar pas." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: "Hence determine the coordinates of the points where f and g cut each other for &nbsp;x ∈ [−180° ; 180°]. &nbsp;Give the y-coordinates correct to two decimal places.", af: "Bepaal vervolgens die koördinate van die punte waar f en g mekaar sny vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Gee die y-koördinate korrek tot twee desimale plekke." },
      hint: { en: "Run the general solution through the values of k that land inside the interval, then substitute each answer into the EASIER of the two equations.", af: "Werk die algemene oplossing uit vir die waardes van k wat binne die interval val, en vervang dan elke antwoord in die MAKLIKER een van die twee vergelykings." },
      memo: [
        { type: "step", text: { en: "k = 0: &nbsp;x = 60°. &nbsp;&nbsp;k = −1: &nbsp;x = 60° − 180° = −120°. &nbsp;&nbsp;k = 1 gives 240°, outside the interval.", af: "k = 0: &nbsp;x = 60°. &nbsp;&nbsp;k = −1: &nbsp;x = 60° − 180° = −120°. &nbsp;&nbsp;k = 1 gee 240°, buite die interval." }, ticks: ["a"] },
        { type: "step", text: { en: "Substitute into &nbsp;g(x) = sin x: &nbsp;&nbsp;sin 60° = 0,87&nbsp; and &nbsp;sin(−120°) = −0,87", af: "Vervang in &nbsp;g(x) = sin x: &nbsp;&nbsp;sin 60° = 0,87&nbsp; en &nbsp;sin(−120°) = −0,87" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "(60° ; 0,87) &nbsp;and&nbsp; (−120° ; −0,87)", af: "(60° ; 0,87) &nbsp;en&nbsp; (−120° ; −0,87)" }, ticks: ["a"] },
      ],
      esplain: { en: "A general solution is a recipe with a dial on it, and k is the dial. Turn it to 0, 1, −1, 2, −2 and so on, and each setting gives you one answer; keep the ones that land inside the interval you were asked about and throw away the rest. Here k = 0 gives 60° and k = −1 gives −120°, both inside, while k = 1 gives 240°, which is past the end. Then find the heights by substituting back — and pick the easier equation to substitute into. Here g is just sin x, so it is far less work than a cos x with a surd in it. Both graphs must give the same height at a crossing, so if you have time, checking one of them in the other equation is a free way to catch a slip.", af: "'n Algemene oplossing is 'n resep met 'n draaiknop daarop, en k is die draaiknop. Draai dit na 0, 1, −1, 2, −2 en so aan, en elke posisie gee jou een antwoord; hou die wat binne die gevraagde interval val en gooi die res weg. Hier gee k = 0 die waarde 60° en k = −1 die waarde −120°, albei binne, terwyl k = 1 die waarde 240° gee, wat verby die einde is. Kry dan die hoogtes deur terug te vervang, en kies die maklikste vergelyking om in te vervang. Hier is g net sin x, dus is dit baie minder werk as a cos x met 'n wortelvorm daarin. Albei grafieke moet by 'n snypunt dieselfde hoogte gee, so as jy tyd het, is dit 'n gratis manier om 'n glips te vang as jy een van hulle in die ander vergelyking kontroleer." },
    },
  ],
};

/* ===============================================================
   q3 — one graph, two equivalent equations.
   f(x) = 2 cos x; g is f shifted 90° right, so
   g(x) = 2 cos(x − 90°) = 2 sin x, and f(x) = g(x) at x = 45° and
   x = −135°.
   =============================================================== */
const Q3_WIN = { xmin: -180, xmax: 180, ymin: -3, ymax: 3 };
const Q3_F = { fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: -20 };
const Q3_G = { fn: "cos", a: 2, b: 1, p: 90, q: 0, tone: "b", label: "g(x) = 2 sin x", labelAt: 120 };
const Q3_SPEC = { type: "trigg", win: Q3_WIN, xstep: 45, ystep: 1, w: 400, h: 300, curves: [Q3_F] };

const q3 = {
  id: "tgraph.l4.q3",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "one-shifted-graph-written-in-two-equivalent-forms-then-used",
  lostQuest: { chapter: CH, quest: "tg4" },
  marks: 6,
  diagram: {
    spec: Q3_SPEC,
    parts: {
      a: { question: {}, reveal: { curves: [Q3_G] } },
      b: {
        question: {},
        reveal: {
          curves: [Q3_G],
          points: [
            { x: 45, y: 1.41, on: [0, 1], label: "(45° ; 1,41)", place: "above" },
            { x: -135, y: -1.41, on: [0, 1], label: "(−135° ; −1,41)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 3, level: 4,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 2 cos x&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;The graph of g is obtained by shifting f 90° to the RIGHT.<br><br>Write down the equation of g in the form &nbsp;y = a cos(x − p), &nbsp;and then write the equation of the same graph in the form &nbsp;y = a sin x.", af: "Die skets toon die grafiek van &nbsp;f(x) = 2 cos x&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Die grafiek van g word verkry deur f 90° na REGS te skuif.<br><br>Skryf die vergelyking van g neer in die vorm &nbsp;y = a cos(x − p), &nbsp;en skryf dan die vergelyking van dieselfde grafiek in die vorm &nbsp;y = a sin x." },
      hint: { en: "The first form is a straight shift. For the second, compare the shifted graph with a plain sine: where does each of them reach its maximum?", af: "Die eerste vorm is 'n gewone skuif. Vir die tweede, vergelyk die geskuifde grafiek met 'n gewone sin: waar bereik elkeen sy maksimum?" },
      memo: [
        { type: "step", text: { en: "A shift 90° to the right replaces x by &nbsp;x − 90°:", af: "'n Skuif van 90° na regs vervang x deur &nbsp;x − 90°:" } },
        { type: "answer", text: { en: "g(x) = 2 cos(x − 90°)", af: "g(x) = 2 cos(x − 90°)" }, ticks: ["a"] },
        { type: "step", text: { en: "The maximum of g is where the bracket is 0°, i.e. at &nbsp;x = 90° — and that is exactly where a plain sine graph has ITS maximum.", af: "Die maksimum van g is waar die hakie 0° is, d.w.s. by &nbsp;x = 90°, en dit is presies waar 'n gewone sin-grafiek SY maksimum het." }, ticks: ["a"] },
        { type: "answer", text: { en: "∴&nbsp; g(x) = 2 sin x &nbsp;&nbsp;<i>(the co-function fact &nbsp;cos(θ − 90°) = sin θ)</i>", af: "∴&nbsp; g(x) = 2 sin x &nbsp;&nbsp;<i>(die ko-funksie-feit &nbsp;cos(θ − 90°) = sin θ)</i>" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: two different-looking equations can be the SAME graph. Nothing has gone wrong when 2cos(x − 90°) turns into 2sin x — sine and cosine are the same wave, 90° apart, so every cosine graph can be written as a sine graph and the other way round.", af: "ONTHOU: twee vergelykings wat verskillend lyk, kan DIESELFDE grafiek wees. Niks het verkeerd geloop wanneer 2cos(x − 90°) in 2sin x verander nie: sin en cos is dieselfde golf, 90° uitmekaar, dus kan elke cos-grafiek as 'n sin-grafiek geskryf word, en andersom." } },
      ],
      esplain: { en: "Two things are going on and it is worth separating them. The first is an ordinary shift: moving a graph 90° to the right replaces x with x − 90° inside the bracket, so g is 2cos(x − 90°). The second is a change of name, not a change of graph. A plain cosine has its maximum on the y-axis; shifting it 90° right puts that maximum at x = 90°, which is exactly where a plain sine peaks. Both graphs have the same amplitude and the same period, and they now agree on where their peaks are, so they are the identical curve. That means 2cos(x − 90°) and 2sin x describe the same picture, and you may use whichever is more convenient. This is the graph version of the co-function relationship you already know from reductions.", af: "Twee dinge gebeur hier, en dit is die moeite werd om hulle uitmekaar te hou. Die eerste is 'n gewone skuif: as jy 'n grafiek 90° na regs skuif, vervang jy x met x − 90° binne die hakie, dus is g 2cos(x − 90°). Die tweede is 'n naamsverandering, nie 'n grafiekverandering nie. 'n Gewone cos het sy maksimum op die y-as; as jy dit 90° regs skuif, kom daardie maksimum by x = 90°, en dit is presies waar 'n gewone sin sy piek het. Albei grafieke het dieselfde amplitude en dieselfde periode, en hulle stem nou saam oor waar hul pieke is, dus is hulle presies dieselfde kurwe. Dit beteken 2cos(x − 90°) en 2sin x beskryf dieselfde prentjie, en jy mag gebruik watter een ook al geriefliker is. Dit is die grafiekweergawe van die ko-funksie-verband wat jy reeds van reduksies ken." },
    },
    {
      id: "b", marks: 3, level: 3,
      prompt: { en: "Hence determine the values of x in the interval for which &nbsp;f(x) = g(x).", af: "Bepaal vervolgens die waardes van x in die interval waarvoor &nbsp;f(x) = g(x)." },
      hint: { en: "Use the sine form from (a) — it makes the equation something you can divide. Getting sin over cos gives you a tangent.", af: "Gebruik die sin-vorm uit (a): dit maak die vergelyking iets wat jy kan deel. As jy sin oor cos kry, het jy 'n tan." },
      memo: [
        { type: "step", text: { en: "f(x) = g(x): &nbsp;&nbsp;2 cos x = 2 sin x", af: "f(x) = g(x): &nbsp;&nbsp;2 cos x = 2 sin x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Divide both sides by &nbsp;2 cos x: &nbsp;&nbsp;1 = tan x &nbsp;⟹&nbsp; tan x = 1", af: "Deel albei kante deur &nbsp;2 cos x: &nbsp;&nbsp;1 = tan x &nbsp;⟹&nbsp; tan x = 1" }, ticks: ["a"] },
        { type: "answer", text: { en: "tan 45° = 1, &nbsp;and a tangent repeats every 180° &nbsp;∴&nbsp; x = 45° &nbsp;or&nbsp; x = −135°", af: "tan 45° = 1, &nbsp;en tan herhaal elke 180° &nbsp;∴&nbsp; x = 45° &nbsp;of&nbsp; x = −135°" }, ticks: ["a"] },
      ],
      esplain: { en: "The word hence is telling you that part (a) was the hard bit and this part is meant to be short. Using the sine form, the equation becomes 2cos x = 2sin x, which is something you can actually solve: divide both sides by 2cos x and it collapses to tan x = 1. From your special angles, tan 45° = 1, and because a tangent repeats every 180° the next solution going backwards is 45° − 180° = −135°. Both are inside the interval; the next one forward, 225°, is not. Check them on the sketch — the two curves really do cross once in the first quarter of the picture and once down in the bottom left, exactly where the algebra says.", af: "Die woord vervolgens sê vir jou dat deel (a) die moeilike stuk was en dat hierdie deel kort bedoel is. Met die sin-vorm word die vergelyking 2cos x = 2sin x, en dit kan jy regtig oplos: deel albei kante deur 2cos x en dit word net tan x = 1. Uit jou spesiale hoeke is tan 45° = 1, en omdat tan elke 180° herhaal, is die volgende oplossing terugwaarts 45° − 180° = −135°. Albei is binne die interval; die volgende een vorentoe, 225°, is nie. Kontroleer hulle op die skets: die twee kurwes kruis regtig een keer in die eerste kwart van die prentjie en een keer onder links, presies waar die algebra sê." },
    },
  ],
};

/* ===============================================================
   q4 — an inequality with a tangent asymptote inside the answer.
   f(x) = tan x and the line y = 1 on [−180° ; 180°].
   tan x ≥ 1 on  −135° ≤ x < −90°  and  45° ≤ x < 90°:
   closed where the graphs meet, OPEN at the asymptote.
   =============================================================== */
const Q4_WIN = { xmin: -180, xmax: 180, ymin: -4, ymax: 4 };
const Q4_SPEC = {
  type: "trigg", win: Q4_WIN, xstep: 45, ystep: 1, w: 400, h: 300,
  curves: [{ fn: "tan", a: 1, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 20 }],
  hlines: [{ y: 1, label: "y = 1" }],
  showAsym: true,
};

const q4 = {
  id: "tgraph.l4.q4",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "tangent-inequality-with-an-asymptote-inside-the-solution",
  lostQuest: { chapter: CH, quest: "tg5" },
  marks: 6,
  diagram: {
    spec: Q4_SPEC,
    parts: {
      a: { question: {}, reveal: { vlines: [{ x: -90, label: "x = −90°" }, { x: 90, label: "x = 90°" }] } },
      b: {
        question: {},
        reveal: {
          shades: [{ x0: -135, x1: -90 }, { x0: 45, x1: 90 }],
          vlines: [{ x: -135, label: "x = −135°" }, { x: 45, label: "x = 45°" }],
          points: [{ x: 45, y: 1, on: 0 }, { x: -135, y: 1, on: 0 }],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = tan x&nbsp; for &nbsp;x ∈ [−180° ; 180°], &nbsp;together with the line &nbsp;y = 1&nbsp; (dashed).<br><br>Write down the equations of the asymptotes of f for &nbsp;x ∈ [−180° ; 180°].", af: "Die skets toon die grafiek van &nbsp;f(x) = tan x&nbsp; vir &nbsp;x ∈ [−180° ; 180°], &nbsp;saam met die lyn &nbsp;y = 1&nbsp; (stippellyn).<br><br>Skryf die vergelykings van die asimptote van f vir &nbsp;x ∈ [−180° ; 180°] neer." },
      hint: { en: "A tangent breaks where it is undefined, and that happens every 180° starting from 90°. Keep only the ones inside the interval.", af: "'n Tan-grafiek breek waar dit onbepaald is, en dit gebeur elke 180°, vanaf 90°. Hou net die wat binne die interval is." },
      memo: [
        { type: "step", text: { en: "tan x&nbsp; is undefined at &nbsp;90° + k·180°. &nbsp;Inside this interval that gives 90° and 90° − 180° = −90°.", af: "tan x&nbsp; is onbepaald by &nbsp;90° + k·180°. &nbsp;Binne hierdie interval gee dit 90° en 90° − 180° = −90°." } },
        { type: "answer", text: { en: "x = −90° &nbsp;and&nbsp; x = 90°", af: "x = −90° &nbsp;en&nbsp; x = 90°" }, ticks: ["a", "a"] },
      ],
      esplain: { en: "Finding the asymptotes first is not busywork here — the next part cannot be answered correctly without them. A tangent is undefined wherever the cosine underneath it is zero, and that happens at 90° and then every 180° in both directions. Inside this interval only two of them survive, at −90° and 90°, and they cut the picture into three branches. Write each answer as a vertical line, x equals a value, because a bare number does not describe a line and does not earn the mark.", af: "Om eers die asimptote te kry, is hier nie tydmors nie: die volgende deel kan nie korrek beantwoord word sonder hulle nie. Tan is onbepaald waar die cos daaronder nul is, en dit gebeur by 90° en dan elke 180° in albei rigtings. Binne hierdie interval bly net twee van hulle oor, by −90° en 90°, en hulle sny die prentjie in drie takke. Skryf elke antwoord as 'n vertikale lyn, x is gelyk aan 'n waarde, want 'n kaal getal beskryf nie 'n lyn nie en verdien nie die punt nie." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Use the sketch to determine the values of x in the given interval for which &nbsp;tan x ≥ 1.", af: "Gebruik die skets om die waardes van x in die gegewe interval te bepaal waarvoor &nbsp;tan x ≥ 1." },
      hint: { en: "Find where the tangent graph MEETS the line first, then read which stretches sit above it. Then look very carefully at what happens at each end of every stretch — one kind of end belongs in the answer and the other kind cannot.", af: "Kry eers waar die tan-grafiek die lyn ONTMOET, en lees dan af watter stukke bo dit lê. Kyk dan baie mooi wat by elke kant van elke stuk gebeur: een soort eindpunt hoort in die antwoord en die ander soort kan nie." },
      memo: [
        { type: "step", text: { en: "The graph meets the line where &nbsp;tan x = 1, &nbsp;i.e. at &nbsp;x = 45°&nbsp; and &nbsp;x = 45° − 180° = −135°.", af: "Die grafiek ontmoet die lyn waar &nbsp;tan x = 1, &nbsp;d.w.s. by &nbsp;x = 45°&nbsp; en &nbsp;x = 45° − 180° = −135°." }, ticks: ["a"] },
        { type: "step", text: { en: "On each branch the tangent rises, so it stays at or above the line from that meeting point until the branch runs into its asymptote.", af: "Op elke tak styg die tan-grafiek, dus bly dit op of bo die lyn vanaf daardie ontmoetingspunt totdat die tak teen sy asimptoot vasloop." }, ticks: ["ca"] },
        { type: "answer", text: { en: "45° ≤ x &lt; 90°", af: "45° ≤ x &lt; 90°" }, ticks: ["a"] },
        { type: "answer", text: { en: "−135° ≤ x &lt; −90°", af: "−135° ≤ x &lt; −90°" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT — this is the whole point of the question. The meeting points ARE included, because there &nbsp;tan x = 1&nbsp; and the sign is ≥. The ASYMPTOTES are NOT included, because the graph does not exist at &nbsp;x = ±90°&nbsp; at all. So each piece of the answer has one closed end and one open end. Writing &nbsp;45° ≤ x ≤ 90°&nbsp; claims a value the function does not even have.", af: "PASOP: dit is die hele punt van die vraag. Die ontmoetingspunte IS ingesluit, want daar is &nbsp;tan x = 1&nbsp; en die teken is ≥. Die ASIMPTOTE is NIE ingesluit nie, want die grafiek bestaan glad nie by &nbsp;x = ±90°&nbsp; nie. Elke deel van die antwoord het dus een geslote kant en een oop kant. As jy &nbsp;45° ≤ x ≤ 90°&nbsp; skryf, eis jy 'n waarde wat die funksie nie eens het nie." },
        },
      ],
      esplain: { en: "This is her cut-line-and-paint method with one extra thing to watch. Start as usual: find where the two graphs meet, because those are the places where the answer can switch from true to false. Solving tan x = 1 gives 45°, and since a tangent repeats every 180°, also −135°. But on a tangent graph there is a second kind of boundary that the curves never actually touch: the asymptotes. Between a meeting point and the asymptote to its right, the tangent branch keeps climbing, so it stays above the line the whole way — that is the stretch you want. The subtle part is the brackets. Where the graphs meet, they are equal, and greater-than-or-equal includes equal, so that end is closed. At the asymptote the function has no value at all, so that end must be open. Two stretches, each with one closed and one open end.", af: "Dit is haar snylyn-en-verf-metode met een ekstra ding om dop te hou. Begin soos gewoonlik: kry waar die twee grafieke ontmoet, want dit is die plekke waar die antwoord van waar na onwaar kan verander. As jy tan x = 1 oplos, kry jy 45°, en omdat tan elke 180° herhaal, ook −135°. Maar op 'n tan-grafiek is daar 'n tweede soort grens wat die kurwes nooit regtig raak nie: die asimptote. Tussen 'n ontmoetingspunt en die asimptoot regs daarvan klim die tan-tak aanhoudend, dus bly dit heel pad bo die lyn: dit is die stuk wat jy wil hê. Die fyn deel is die hakies. Waar die grafieke ontmoet, is hulle gelyk, en groter-as-of-gelyk-aan sluit gelyk in, dus is daardie kant geslote. By die asimptoot het die funksie glad nie 'n waarde nie, dus moet daardie kant oop wees. Twee stukke, elk met een geslote en een oop kant." },
    },
  ],
};

/* ===============================================================
   q5 — the vertical gap between two graphs, then its maximum.
   f(x) = 2 cos x and g(x) = cos x − 3 on [−180° ; 180°].
   PQ(x) = f(x) − g(x) = cos x + 3, which is itself a cosine graph:
   amplitude 1 about a midline of 3, so the longest PQ is 4, at x = 0°.
   =============================================================== */
const Q5_WIN = { xmin: -180, xmax: 180, ymin: -5, ymax: 3 };
const Q5_SPEC = {
  type: "trigg", win: Q5_WIN, xstep: 60, ystep: 1, w: 400, h: 300,
  curves: [
    { fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 120 },
    { fn: "cos", a: 1, b: 1, p: 0, q: -3, tone: "b", label: "g", labelAt: 120 },
  ],
};

const q5 = {
  id: "tgraph.l4.q5",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "length-of-the-vertical-segment-between-two-graphs-and-its-maximum",
  lostQuest: { chapter: CH, quest: "tg7" },
  marks: 6,
  diagram: {
    spec: Q5_SPEC,
    parts: {
      a: {
        question: {},
        reveal: {
          vlines: [{ x: 60, label: "x = 60°" }],
          points: [
            { x: 60, y: 1, on: 0, label: "P(60° ; 1)", place: "above" },
            { x: 60, y: -2.5, on: 1, label: "Q(60° ; −2,5)" },
          ],
        },
      },
      b: {
        question: {},
        reveal: {
          points: [
            { x: 0, y: 2, on: 0, label: "(0 ; 2)", place: "above" },
            { x: 0, y: -2, on: 1, label: "(0 ; −2)" },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graphs of &nbsp;f(x) = 2 cos x&nbsp; and &nbsp;g(x) = cos x − 3&nbsp; for &nbsp;x ∈ [−180° ; 180°]. &nbsp;For any value of x in this interval, P is the point on f and Q is the point on g with that same x-value, so PQ is a vertical line segment.<br><br>Determine the length of PQ when &nbsp;x = 60°.", af: "Die skets toon die grafieke van &nbsp;f(x) = 2 cos x&nbsp; en &nbsp;g(x) = cos x − 3&nbsp; vir &nbsp;x ∈ [−180° ; 180°]. &nbsp;Vir enige waarde van x in hierdie interval is P die punt op f en Q die punt op g met dieselfde x-waarde, dus is PQ 'n vertikale lynstuk.<br><br>Bepaal die lengte van PQ wanneer &nbsp;x = 60°." },
      hint: { en: "A vertical length is the top y-value minus the bottom y-value. Work out each graph's height at 60° separately, then subtract.", af: "'n Vertikale lengte is die boonste y-waarde minus die onderste y-waarde. Werk elke grafiek se hoogte by 60° apart uit, en trek dan af." },
      memo: [
        { type: "step", text: { en: "f(60°) = 2 cos 60° = 2(½) = 1 &nbsp;&nbsp;and&nbsp;&nbsp; g(60°) = cos 60° − 3 = ½ − 3 = −2,5", af: "f(60°) = 2 cos 60° = 2(½) = 1 &nbsp;&nbsp;en&nbsp;&nbsp; g(60°) = cos 60° − 3 = ½ − 3 = −2,5" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "PQ = 1 − (−2,5) = <b>3,5 units</b>", af: "PQ = 1 − (−2,5) = <b>3,5 eenhede</b>" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: a LENGTH is never negative. Take the upper graph's height minus the lower one's, or take the size of the difference. Subtracting the other way round gives −3,5, which is not a length.", af: "PASOP: 'n LENGTE is nooit negatief nie. Neem die boonste grafiek se hoogte minus die onderste een s'n, of neem die grootte van die verskil. As jy andersom aftrek, kry jy −3,5, en dit is nie 'n lengte nie." } },
      ],
      esplain: { en: "A vertical segment between two graphs is just a difference in height, so the whole job is finding two heights and subtracting. Do them one at a time and write each one down. At 60°, cos 60° is a half from your special angles, so f is 2 times a half, which is 1, and g is a half minus 3, which is −2,5. The segment runs from −2,5 up to 1, and its length is the top minus the bottom: 1 minus −2,5, which is 3,5. Subtracting a negative is where the slips happen, so say it out loud — taking away minus two and a half is the same as adding two and a half. The picture agrees: P sits just above the x-axis and Q sits a good way below it.", af: "'n Vertikale lynstuk tussen twee grafieke is net 'n verskil in hoogte, dus is die hele werk om twee hoogtes te kry en af te trek. Doen hulle een op 'n slag en skryf elkeen neer. By 60° is cos 60° 'n half uit jou spesiale hoeke, dus is f 2 keer 'n half, wat 1 is, en g is 'n half minus 3, wat −2,5 is. Die lynstuk loop van −2,5 op tot by 1, en sy lengte is bo minus onder: 1 minus −2,5, wat 3,5 is. Om 'n negatief af te trek is waar die glipse gebeur, so sê dit hardop: minus twee en 'n half aftrek is dieselfde as twee en 'n half bytel. Die prentjie stem saam: P sit net bo die x-as en Q sit 'n hele ent daaronder." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Determine the maximum length of PQ in the given interval, and the value of x at which it occurs.", af: "Bepaal die maksimum lengte van PQ in die gegewe interval, en die waarde van x waar dit voorkom." },
      hint: { en: "Do not test values one at a time. Write PQ as a single expression in x — subtract one equation from the other and simplify — and then look at what kind of graph that expression is.", af: "Moenie waardes een vir een toets nie. Skryf PQ as een uitdrukking in x (trek een vergelyking van die ander af en vereenvoudig) en kyk dan watter soort grafiek daardie uitdrukking is." },
      memo: [
        { type: "step", text: { en: "PQ = f(x) − g(x) = 2 cos x − (cos x − 3)", af: "PQ = f(x) − g(x) = 2 cos x − (cos x − 3)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2 cos x − cos x + 3 = <b>cos x + 3</b>", af: "= 2 cos x − cos x + 3 = <b>cos x + 3</b>" }, ticks: ["a"] },
        { type: "step", text: { en: "That is itself a cosine graph: amplitude 1 about a midline of 3, so its biggest value is &nbsp;3 + 1 = 4, &nbsp;reached when &nbsp;cos x = 1.", af: "Dit is self 'n cos-grafiek: amplitude 1 om 'n middelste lyn van 3, dus is sy grootste waarde &nbsp;3 + 1 = 4, &nbsp;wanneer &nbsp;cos x = 1." }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos x = 1&nbsp; at &nbsp;x = 0°&nbsp; in this interval &nbsp;&nbsp;∴&nbsp; maximum PQ = <b>4 units</b>, at &nbsp;x = 0°", af: "cos x = 1&nbsp; by &nbsp;x = 0°&nbsp; in hierdie interval &nbsp;&nbsp;∴&nbsp; maksimum PQ = <b>4 eenhede</b>, by &nbsp;x = 0°" }, ticks: ["a"] },
        { type: "trap", text: { en: "REMEMBER: the maximum of the GAP is not the same as the maximum of either graph. f is highest at x = 0° and g is also highest at x = 0°, which is why they happen to agree here — but on most pairs they do not, and the only safe method is to build the difference expression first and then read its maximum.", af: "ONTHOU: die maksimum van die GAPING is nie dieselfde as die maksimum van enige van die grafieke nie. f is die hoogste by x = 0° en g is ook die hoogste by x = 0°, en dit is hoekom hulle toevallig hier ooreenstem; maar by die meeste pare doen hulle dit nie, en die enigste veilige metode is om eers die verskiluitdrukking te bou en dan sy maksimum af te lees." } },
      ],
      esplain: { en: "The move that turns this from guesswork into two lines of work is writing the gap as one expression. PQ is always the top graph minus the bottom one, so PQ = 2cos x − (cos x − 3). Open the bracket carefully — the minus reaches both terms — and it simplifies to cos x + 3. Now look at what you have: that is a cosine graph in its own right, with an amplitude of 1 and a midline of 3, so the gap itself rocks gently between 2 and 4 as x moves. Its biggest value is one amplitude above the midline, which is 4, and that happens when cos x is at its own maximum of 1, at x = 0°. No calculator, no trial and error, and the same method works for any pair of graphs you are asked to measure between.", af: "Die stap wat dit van raaiwerk in twee reëls werk verander, is om die gaping as een uitdrukking te skryf. PQ is altyd die boonste grafiek minus die onderste een, dus PQ = 2cos x − (cos x − 3). Maak die hakie versigtig oop (die minus raak albei terme) en dit vereenvoudig na cos x + 3. Kyk nou wat jy het: dit is self 'n cos-grafiek, met 'n amplitude van 1 en 'n middelste lyn van 3, dus wieg die gaping saggies tussen 2 en 4 soos x beweeg. Sy grootste waarde is een amplitude bo die middelste lyn, wat 4 is, en dit gebeur wanneer cos x by sy eie maksimum van 1 is, by x = 0°. Geen sakrekenaar, geen probeer-en-tref nie, en dieselfde metode werk vir enige paar grafieke waartussen jy moet meet." },
    },
  ],
};

/* ===============================================================
   q6 — "for which k does y = k cut f exactly three times".
   f(x) = 2 cos x on [0° ; 540°] — one and a half periods, which is
   what makes THREE possible. |k| > 2: no cuts. |k| = 2: two cuts.
   |k| < 2: three cuts.
   =============================================================== */
const Q6_WIN = { xmin: 0, xmax: 540, ymin: -3, ymax: 3 };
const Q6_SPEC = {
  type: "trigg", win: Q6_WIN, xstep: 90, ystep: 1, w: 400, h: 300,
  curves: [{ fn: "cos", a: 2, b: 1, p: 0, q: 0, tone: "a", label: "f", labelAt: 450 }],
};

const q6 = {
  id: "tgraph.l4.q6",
  chapter: CH, topic: TOPIC, paper: PAPER,
  archetype: "for-which-k-does-the-line-y-equals-k-cut-the-graph-exactly-three-times",
  lostQuest: { chapter: CH, quest: "tg3" },
  marks: 6,
  diagram: {
    spec: Q6_SPEC,
    parts: {
      a: { question: {}, reveal: { hlines: [{ y: 2, label: "y = 2" }, { y: -2, label: "y = −2" }] } },
      b: {
        question: {},
        reveal: {
          hlines: [{ y: 2, label: "y = 2" }, { y: -2, label: "y = −2" }, { y: 1, label: "y = 1" }],
          points: [
            { x: 60, y: 1, on: 0 },
            { x: 300, y: 1, on: 0 },
            { x: 420, y: 1, on: 0 },
          ],
        },
      },
    },
  },
  parts: [
    {
      id: "a", marks: 2, level: 3,
      prompt: { en: "The sketch shows the graph of &nbsp;f(x) = 2 cos x&nbsp; for &nbsp;x ∈ [0° ; 540°]. &nbsp;A horizontal line &nbsp;y = k&nbsp; is drawn across the same set of axes.<br><br>Write down the values of k for which the line &nbsp;y = k&nbsp; will NOT cut the graph of f at all.", af: "Die skets toon die grafiek van &nbsp;f(x) = 2 cos x&nbsp; vir &nbsp;x ∈ [0° ; 540°]. &nbsp;'n Horisontale lyn &nbsp;y = k&nbsp; word oor dieselfde assestelsel geteken.<br><br>Skryf die waardes van k neer waarvoor die lyn &nbsp;y = k&nbsp; die grafiek van f glad NIE sal sny nie." },
      hint: { en: "A horizontal line misses the graph when it is drawn at a height the graph never reaches. So start with the range of f.", af: "'n Horisontale lyn mis die grafiek wanneer dit op 'n hoogte geteken is wat die grafiek nooit bereik nie. Begin dus met die waardeversameling van f." },
      memo: [
        { type: "step", text: { en: "The range of f is &nbsp;y ∈ [−2 ; 2], &nbsp;so f never reaches a height above 2 or below −2.", af: "Die waardeversameling van f is &nbsp;y ∈ [−2 ; 2], &nbsp;dus bereik f nooit 'n hoogte bo 2 of onder −2 nie." }, ticks: ["a"] },
        { type: "answer", text: { en: "k &lt; −2 &nbsp;&nbsp;or&nbsp;&nbsp; k &gt; 2", af: "k &lt; −2 &nbsp;&nbsp;of&nbsp;&nbsp; k &gt; 2" }, ticks: ["a"] },
      ],
      esplain: { en: "Turning a picture question into a range question is the move that makes this easy. A horizontal line y = k is drawn at one fixed height, and the graph either reaches that height somewhere or it does not. Since f is a cosine with amplitude 2 about the x-axis, it visits every height from −2 to 2 and no others. So a line drawn higher than 2 or lower than −2 sails past the graph and never touches it. The edge cases matter: at exactly k = 2 or k = −2 the line touches the graph at its turning points, so those values do NOT belong in this answer — that is why the inequality signs are strict.", af: "Om 'n prentjievraag in 'n waardeversamelingvraag te verander, is die stap wat dit maklik maak. 'n Horisontale lyn y = k word op een vaste hoogte geteken, en die grafiek bereik daardie hoogte iewers, of nie. Omdat f 'n cos-grafiek met amplitude 2 om die x-as is, besoek dit elke hoogte van −2 tot 2 en geen ander nie. 'n Lyn wat hoër as 2 of laer as −2 geteken is, seil dus verby die grafiek en raak dit nooit nie. Die randgevalle maak saak: by presies k = 2 of k = −2 raak die lyn die grafiek by sy draaipunte, dus hoort daardie waardes NIE in hierdie antwoord nie: dit is hoekom die ongelykheidstekens streng is." },
    },
    {
      id: "b", marks: 4, level: 4,
      prompt: { en: "Determine the values of k for which the line &nbsp;y = k&nbsp; cuts the graph of f exactly THREE times in the given interval.", af: "Bepaal die waardes van k waarvoor die lyn &nbsp;y = k&nbsp; die grafiek van f presies DRIE keer in die gegewe interval sny." },
      hint: { en: "The interval is 540° wide and the period is 360°, so the picture is one and a HALF waves. Try a line somewhere in the middle and count the crossings, then try one right at the top and count again.", af: "Die interval is 540° wyd en die periode is 360°, dus is die prentjie een en 'n HALWE golf. Probeer 'n lyn iewers in die middel en tel die snypunte, probeer dan een heel bo en tel weer." },
      memo: [
        { type: "step", text: { en: "The interval is 540° wide and the period is 360°, so the sketch shows one and a half waves — a full wave, then half of another.", af: "Die interval is 540° wyd en die periode is 360°, dus wys die skets een en 'n halwe golf: 'n volle golf, en dan die helfte van nog een." }, ticks: ["a"] },
        { type: "step", text: { en: "A horizontal line strictly between the top and the bottom cuts the first full wave TWICE and the extra half-wave ONCE: three cuts.", af: "'n Horisontale lyn streng tussen die bokant en die onderkant sny die eerste volle golf TWEE keer en die ekstra halwe golf EEN keer: drie snypunte." }, ticks: ["ca"] },
        { type: "step", text: { en: "At &nbsp;k = 2&nbsp; the line only touches the two maximum points (x = 0° and x = 360°) — two cuts, not three. At &nbsp;k = −2&nbsp; the same happens at the two minimum points (x = 180° and x = 540°).", af: "By &nbsp;k = 2&nbsp; raak die lyn net die twee maksimum punte (x = 0° en x = 360°): twee snypunte, nie drie nie. By &nbsp;k = −2&nbsp; gebeur dieselfde by die twee minimum punte (x = 180° en x = 540°)." }, ticks: ["ca"] },
        { type: "answer", text: { en: "−2 &lt; k &lt; 2", af: "−2 &lt; k &lt; 2" }, ticks: ["a"] },
        { type: "trap", text: { en: "WATCH OUT: the two ENDS are the whole question. At k = 2 and k = −2 the count drops from three to two, so those values must be excluded — strict inequality signs both sides. Check the ends of any \"how many times\" answer separately; the boundary almost always behaves differently from the inside.", af: "PASOP: die twee EINDPUNTE is die hele vraag. By k = 2 en k = −2 daal die telling van drie na twee, dus moet daardie waardes uitgesluit word: streng ongelykheidstekens aan albei kante. Kontroleer die eindpunte van enige \"hoeveel keer\"-antwoord apart; die grens gedra hom amper altyd anders as die binnekant." },
        },
      ],
      esplain: { en: "The length of the interval is doing the work here, so read it before anything else. The period is 360° and the window is 540° wide, which is one and a half waves. Now imagine sliding a ruler up and down the picture. Held at a height strictly between the top and the bottom, the ruler crosses the first complete wave twice — once going down, once coming back up — and then crosses the leftover half-wave one more time, giving three. Slide it right to the top at k = 2 and the crossings collapse into the two peaks, so you only get two. Slide it right to the bottom at k = −2 and the same thing happens at the two troughs. Above or below those, nothing at all, which was part (a). So exactly three crossings happens for every k strictly between −2 and 2.", af: "Die lengte van die interval doen hier die werk, so lees dit voor enigiets anders. Die periode is 360° en die venster is 540° wyd, wat een en 'n halwe golf is. Stel jou nou voor jy skuif 'n liniaal op en af oor die prentjie. As jy dit op 'n hoogte streng tussen die bokant en die onderkant hou, kruis die liniaal die eerste volledige golf twee keer (een keer op pad af, een keer op pad terug op) en kruis dan die oorblywende halwe golf nog een keer, wat drie gee. Skuif dit heel bo na k = 2 en die kruisings smelt saam in die twee pieke, dus kry jy net twee. Skuif dit heel onder na k = −2 en dieselfde gebeur by die twee laagste punte. Bo of onder daardie waardes, glad niks nie, en dit was deel (a). Presies drie kruisings gebeur dus vir elke k streng tussen −2 en 2." },
    },
  ],
};

export const tgraphLevel4Questions = [q1, q2, q3, q4, q5, q6];
