/* ============================================================
   EXAM FOCUS — General Trig · the NEW skill tile "super-special-sums"
   (SESSION F1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F1-gtrig-part1.md.)
   ------------------------------------------------------------
   Six new cards. The tile existed on the chapter screen but held NO
   cards at all — it rendered "coming soon" (js/exam/skills.js). It is
   also the archetype that opens the trig block in almost every edition
   of the paper bank, so it was the single biggest hole in the chapter.

   SOURCE OF THE MATHS: METHODS-trig.md Part J (p36–p38).
     · J1 THE FLAMINGO — her word, written in green on the page, for
       STANDING A BARE VALUE ON A 1 so it reads as a ratio:
       cos 20° = t becomes t/1 = A/H. That word is used in every memo
       below, because it is the move the whole tile turns on.
     · J2 THE SHORT-CUT — her three template triangles, all in the
       first quadrant with θ at the origin:
           tan θ = t   →  adj 1,          opp t,          hyp √(t² + 1)
           sin θ = t   →  adj √(1 − t²),  opp t,          hyp 1
           cos θ = 1/t →  adj 1,          opp √(t² − 1),  hyp t
       The √(1 − t²) versus √(t² − 1) choice is exactly the pick her
       round 10 asks a learner to make, so all three templates appear
       here: q1/q5/q6 are the sin/cos-on-a-1 family, q3 is the tan
       family, q4 is the one where the letter sits on the HYPOTENUSE.
     · J3 the worked shapes — reduce or convert the angle, then read
       the answer off the one triangle you drew at the start.

   ⚠️ SCOPE WALL: NO DOUBLE ANGLES. "cos 20° = t, find cos 40°" is a
   Grade 12 question and is deliberately absent (sessions/F1-gtrig-part1.md).
   Every angle here reaches its answer through a co-function, a
   reduction or a rotation on the SAME acute angle.

   ARCHETYPES from the paper bank: survey/SURVEY-Topic-Banks.md §2's
   "ratio-in-terms-of" opener — 2025-Q1 (cos 15° = 1/(2p) → tan 15°,
   cos(−375°), sin 255°), 2026-Q1.3 (tan 54° = 1/p → cos(−684°),
   sin²126°·tan 234°), 2026-Q5.1 (sin 22° = d → tan(−22°), sin²112°),
   2024-Q4.1 (cos 12° = a). Same moulds, every angle and letter fresh.

   THE (a)/(b) STRUCTURE — the same rule as the special-sums tile, and
   for the same reason: DRAWING THE TRIANGLE IS THE LEARNER'S JOB.
     (a) "draw the triangle and write the third side in terms of …"
         — NO `diagram.parts` entry, so nothing is drawn on either
         state. Choosing where the 1 goes IS the skill.
     (b), (c)  the evaluations — each carries an entry of the form
         { spec: FLAMINGO } with NO highlight sets, so the labelled
         triangle sits beside the part on BOTH states, exactly like her
         p36 step ③: "re-draw with the third side filled in → use
         sketch to answer questions".

   THE FIGURE ITSELF: js/engine/quadrant-triangle.js drives it, and it
   is drawn at the question's TRUE acute angle in the first quadrant
   (x = cos θ, y = sin θ), so the shape a learner sees really is the
   shape of the triangle they were asked to draw. Only `letters` are
   set — never `labels` — because every side here is an algebraic
   expression, not a measured number. The engine prints letters exactly
   as given; verifyQuadTri still proves the quadrant, the one uniform
   scale, the right angle at the foot and the θ arc.

   TWO THINGS THE RENDERED CROPS DECIDED, and neither is visible to
   verifyQuadTri — both were found by reading the shot sheet at 375 px
   (F1 review, 2026-08-23):

   1. THE ANGLE IS CHOSEN SO THE LONG LABEL FITS. The engine places a
      side label by pushing it away from the triangle, and it knows
      nothing about the axes or the frame edge. A nine-character
      expression like √(1−t²) therefore needs the triangle to be the
      right SHAPE, and which shape depends on which side carries it:
        · long label on the OPPOSITE side (the vertical leg) → the leg
          must not sit near the right-hand edge, so the angle has to be
          STEEP: 51°–67°. (q1 57°, q4 65°, q6 58°.)
        · long label on the ADJACENT side (the horizontal leg) → almost
          any angle works: 37°–67°. (q2 41°, q5 47°.)
        · long label on the HYPOTENUSE → the tightest of the three,
          38° or thereabouts, and only with the compact form below.
          (q3 38°.)
      Below about 37° the θ-arc label itself gets pinched between the
      x-axis and the hypotenuse, which is why nothing here is shallower.
   2. FIGURE LABELS ARE WRITTEN COMPACT — √(1−t²), not √(1 − t²). The
      two spaces are worth about 15 px on a 300-unit figure, which is
      the difference between the tan template fitting and not. The
      PROSE (prompts, memos, esplains) keeps her spaced form; only the
      three `letters` strings are compressed, because that is where the
      room ran out.

   LEVELS: q1 level 1, q2 and q3 level 2, q4–q6 reach level 3 (the
   hypotenuse template, the squared co-function, and the reverse item).
   Nothing here is level 4 — the ★ questions live on the gtrig level-4
   tile (session F2).
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
/* gt10 "Super special sums" — where 1 and k (or t) go on the triangle.
   Exactly this skill (js/config.js CHAPTERS → gtrig). */
const LOST = { chapter: CH, quest: "gt10" };

/* THE FLAMINGO TRIANGLE, drawn at its true acute angle in quadrant I.
   x = cos θ and y = sin θ, so the drawn shape is the real shape; the
   three sides are named with `letters` because they are algebra, not
   measurements. A quadtri spec needs REAL signed legs — that is what
   lets verifyQuadTri prove the picture cannot lie. */
const flamingo = (deg, letters) => ({
  type: "quadtri",
  x: Math.cos(deg * Math.PI / 180),
  y: Math.sin(deg * Math.PI / 180),
  letters,
  theta: true,
  thetaLabel: deg + "°",
  w: 300, h: 300,
});

/* ---------------------------------------------------------------
   q1 — cos 57° = t  (her p36/p37 template: adj t, hyp 1, opp √(1 − t²))
     (a) third side = √(1 − t²)            [no figure]
     (b) sin 57° = √(1 − t²)               [figure]
     (c) sin 33° = cos 57° = t             [figure]  ← co-function, the
         other corner of the very triangle just drawn
   --------------------------------------------------------------- */
const Q1_TRI = flamingo(57, { x: "t", y: "√(1−t²)", r: "1" });

const q1 = {
  id: "gtrig.sib.sss.q1",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-cos-given-as-t-then-cofunction",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  diagram: { parts: { b: { spec: Q1_TRI }, c: { spec: Q1_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 57° = t.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of t.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;cos 57° = t.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die derde sy in terme van t neer.",
      },
      hint: {
        en: "Stand the t on a 1 — the flamingo. Once cos 57° reads as t over 1, you know which side is which, and (pyth) does the rest.", af: "Laat die t op 'n 1 staan: die flamingo. Sodra cos 57° as t oor 1 lees, weet jy watter sy is watter, en (pyth) doen die res.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the t on a 1</b> — the <b>flamingo</b>: &nbsp;cos 57° = t/1 = A/H. &nbsp;So the side next to 57° is t and the hypotenuse is 1.", af: "① <b>Laat die t op 'n 1 staan</b> (die <b>flamingo</b>): &nbsp;cos 57° = t/1 = A/H. &nbsp;Die sy langs 57° is dus t en die skuinssy is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;y² = 1² − t² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − t²) &nbsp;⟹&nbsp; y = ±√(1 − t²)", af: "② &nbsp;y² = 1² − t² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − t²) &nbsp;⟹&nbsp; y = ±√(1 − t²)" } },
        { type: "answer", text: { en: "57° is acute, so the triangle sits in the first quadrant where every side is positive &nbsp;∴&nbsp; the side opposite 57° is √(1 − t²)", af: "57° is skerp, dus lê die driehoek in die eerste kwadrant waar elke sy positief is &nbsp;∴&nbsp; die sy teenoor 57° is √(1 − t²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A bare number cannot be read as a ratio, so the first move is to give it a bottom. She calls it the flamingo: stand the t on a 1. cos 57° = t becomes cos 57° = t over 1, and now it reads as adjacent over hypotenuse — so the side next to 57° is t and the hypotenuse is 1. Draw that triangle in the first quadrant with the 57° at the origin, and the only side left is the opposite one, which Pythagoras hands you: y² = 1² − t², so y = √(1 − t²). Because the triangle is in the first quadrant every side is positive, so there is no sign to argue about. Fill that third side in on your sketch — from here on, every part of the question is read off this one picture.", af: "'n Kaal getal kan jy nie as 'n verhouding lees nie, dus is die eerste stap om dit 'n onderkant te gee. Sy noem dit die flamingo: laat die t op 'n 1 staan. cos 57° = t word cos 57° = t oor 1, en nou lees dit as aangrensend oor skuinssy, dus is t die sy langs 57° en 1 die skuinssy. Teken daardie driehoek in die eerste kwadrant met die 57° by die oorsprong, en die enigste sy wat oorbly, is die teenoorstaande een, wat Pythagoras vir jou gee: y² = 1² − t², dus y = √(1 − t²). Omdat die driehoek in die eerste kwadrant is, is elke sy positief, so daar is geen teken om oor te stry nie. Vul daardie derde sy op jou skets in: van hier af word elke deel van die vraag van hierdie een prent afgelees.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Hence write &nbsp;sin 57°&nbsp; in terms of t.", af: "Skryf vervolgens &nbsp;sin 57°&nbsp; in terme van t.",
      },
      hint: {
        en: "Everything you need is on the sketch already. sin is opposite over hypotenuse — which two sides is that?", af: "Alles wat jy nodig het, is reeds op die skets. sin is teenoorstaande oor skuinssy: watter twee sye is dit?",
      },
      memo: [
        { type: "answer", text: { en: "sin 57° = O/H = √(1 − t²)/1 = √(1 − t²)", af: "sin 57° = O/H = √(1 − t²)/1 = √(1 − t²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new to work out — the sketch already carries all three sides. sin 57° is opposite over hypotenuse, and on this triangle that is √(1 − t²) over 1, which is just √(1 − t²). That is the whole point of drawing the triangle first: one sketch answers every part of the question. It also explains why she calls these super special sums rather than something harder sounding. The maths is the same maths as an ordinary special sum — draw, Pythagoras, read off — the only difference is that the sides are letters instead of numbers, so nothing ever turns into a decimal.", af: "Niks nuuts om uit te werk nie: die skets dra reeds al drie sye. sin 57° is teenoorstaande oor skuinssy, en op hierdie driehoek is dit √(1 − t²) oor 1, wat net √(1 − t²) is. Dit is die hele punt daarvan om die driehoek eerste te teken: een skets beantwoord elke deel van die vraag. Dit verklaar ook hoekom sy dit superspesiale somme noem eerder as iets wat moeiliker klink. Die wiskunde is dieselfde as by 'n gewone spesiale som (teken, Pythagoras, lees af); die enigste verskil is dat die sye letters is in plaas van getalle, dus word niks ooit 'n desimaal nie.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 1,
      prompt: {
        en: "Hence write &nbsp;sin 33°&nbsp; in terms of t.", af: "Skryf vervolgens &nbsp;sin 33°&nbsp; in terme van t.",
      },
      hint: {
        en: "Add the two angles. 33° is the other corner of the very triangle you have just drawn.", af: "Tel die twee hoeke op. 33° is die ander hoek van presies die driehoek wat jy pas geteken het.",
      },
      memo: [
        { type: "step", text: { en: "57° and 33° add to 90°, so this is a co-function: &nbsp;sin 33° = sin(90° − 57°)", af: "57° en 33° tel op tot 90°, dus is dit 'n ko-funksie: &nbsp;sin 33° = sin(90° − 57°)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= cos 57° = t", af: "= cos 57° = t" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you can also read this one straight off the sketch. From the 33° corner the opposite side is t and the hypotenuse is 1, so sin 33° = t. Same answer, and a marker takes either route.", af: "ONTHOU: jy kan hierdie een ook reguit van die skets aflees. Van die 33°-hoek af is die teenoorstaande sy t en die skuinssy 1, dus sin 33° = t. Dieselfde antwoord, en 'n nasiener aanvaar albei roetes.",
        } },
      ],
      esplain: {
        en: "57° and 33° add up to 90°, which means they are the two acute angles of the very triangle you have just drawn. So sin 33° is asking about the same picture from the other corner: what is opposite 33° is the side next to 57°, and the hypotenuse does not move. That is a co-function — sin 33° = sin(90° − 57°) = cos 57° — and cos 57° is what you were given, namely t. You could also read it straight off the sketch: from the 33° corner the opposite side is t and the hypotenuse is 1. Both routes give t, and a marker takes either one.", af: "57° en 33° tel op tot 90°, wat beteken dat hulle die twee skerp hoeke van presies die driehoek is wat jy pas geteken het. sin 33° vra dus oor dieselfde prent, van die ander hoek af: wat teenoor 33° lê, is die sy langs 57°, en die skuinssy beweeg nie. Dit is 'n ko-funksie (sin 33° = sin(90° − 57°) = cos 57°), en cos 57° is wat jy gekry het, naamlik t. Jy kan dit ook reguit van die skets aflees: van die 33°-hoek af is die teenoorstaande sy t en die skuinssy 1. Albei roetes gee t, en 'n nasiener aanvaar enigeen.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — sin 41° = p  (opp p, hyp 1, adj √(1 − p²))
     (a) third side = √(1 − p²)                    [no figure]
     (b) cos 401° = cos 41° = √(1 − p²)            [figure]  ← a ROTATION
     (c) tan 49° = √(1 − p²)/p                     [figure]  ← the other
         corner of the same triangle (her p38 f) shape)
   --------------------------------------------------------------- */
const Q2_TRI = flamingo(41, { x: "√(1−p²)", y: "p", r: "1" });

const q2 = {
  id: "gtrig.sib.sss.q2",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-sin-given-as-p-rotation-and-the-other-corner",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  diagram: { parts: { b: { spec: Q2_TRI }, c: { spec: Q2_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;sin 41° = p.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of p.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;sin 41° = p.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die derde sy in terme van p neer.",
      },
      hint: {
        en: "Flamingo first, but watch which side the p lands on — sine is opposite over hypotenuse, not adjacent over hypotenuse.", af: "Flamingo eerste, maar kyk op watter sy die p beland: sin is teenoorstaande oor skuinssy, nie aangrensend oor skuinssy nie.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the p on a 1</b> — the <b>flamingo</b>: &nbsp;sin 41° = p/1 = O/H. &nbsp;So the side <b>opposite</b> 41° is p and the hypotenuse is 1.", af: "① <b>Laat die p op 'n 1 staan</b> (die <b>flamingo</b>): &nbsp;sin 41° = p/1 = O/H. &nbsp;Die sy <b>teenoor</b> 41° is dus p en die skuinssy is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;x² = 1² − p² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − p²) &nbsp;⟹&nbsp; x = ±√(1 − p²)", af: "② &nbsp;x² = 1² − p² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − p²) &nbsp;⟹&nbsp; x = ±√(1 − p²)" } },
        { type: "answer", text: { en: "The triangle is in the first quadrant, so every side is positive &nbsp;∴&nbsp; the side next to 41° is √(1 − p²)", af: "Die driehoek is in die eerste kwadrant, dus is elke sy positief &nbsp;∴&nbsp; die sy langs 41° is √(1 − p²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same flamingo, different side. sin 41° = p becomes p over 1, and sine is opposite over hypotenuse, so this time it is the side OPPOSITE 41° that is p, with the hypotenuse still 1. That is the one thing to be careful about with these: which side the letter lands on depends entirely on which ratio you were given. Then Pythagoras finds the side next to 41°: x² = 1² − p², so x = √(1 − p²). Notice it is 1 − p² again and not p² − 1. That happens whenever the letter sits on a short side and the 1 is the hypotenuse, because the hypotenuse is the biggest side, so you are always taking the smaller square away from the bigger one.", af: "Dieselfde flamingo, ander sy. sin 41° = p word p oor 1, en sin is teenoorstaande oor skuinssy, dus is dit hierdie keer die sy TEENOOR 41° wat p is, met die skuinssy steeds 1. Dit is die een ding om mee op te pas by hierdie somme: op watter sy die letter beland, hang heeltemal af van watter verhouding jy gekry het. Dan vind Pythagoras die sy langs 41°: x² = 1² − p², dus x = √(1 − p²). Let op dit is weer 1 − p² en nie p² − 1 nie. Dit gebeur elke keer as die letter op 'n kort sy sit en die 1 die skuinssy is, want die skuinssy is die grootste sy, dus trek jy altyd die kleiner kwadraat van die groter een af.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 401°&nbsp; in terms of p.", af: "Skryf vervolgens &nbsp;cos 401°&nbsp; in terme van p.",
      },
      hint: {
        en: "401° is more than a full turn. Deal with that before anything else, then read the sketch.", af: "401° is meer as 'n volle draai. Hanteer dit voor enigiets anders, lees dan die skets.",
      },
      memo: [
        { type: "step", text: { en: "401° is past a full turn, so <b>rotate</b> first — write the −360° above the angle: &nbsp;cos 401° = cos 41°", af: "401° is verby 'n volle draai, dus <b>draai</b> eers en skryf die −360° bo die hoek: &nbsp;cos 401° = cos 41°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 41° = A/H = √(1 − p²)/1 = √(1 − p²)", af: "cos 41° = A/H = √(1 − p²)/1 = √(1 − p²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "401° is more than a full turn, so the first job is a rotation: take 360° off and you are back at 41°, the very angle your triangle is built on. She writes the subtraction above the angle, once per 360°, so the counting stays visible. cos 41° is then adjacent over hypotenuse, which on this sketch is √(1 − p²) over 1, or simply √(1 − p²). Two habits are doing the work here. One is dealing with the rotation before anything else — an angle bigger than 360°, or smaller than −90°, gets fixed first. The other is never rushing at the answer before the triangle has been drawn, because once it is drawn a question like this takes one line.", af: "401° is meer as 'n volle draai, dus is die eerste werk 'n draai: trek 360° af en jy is terug by 41°, presies die hoek waarop jou driehoek gebou is. Sy skryf die aftrekking bo die hoek, een keer per 360°, sodat die tel sigbaar bly. cos 41° is dan aangrensend oor skuinssy, wat op hierdie skets √(1 − p²) oor 1 is, of net √(1 − p²). Twee gewoontes doen hier die werk. Die een is om die draai voor enigiets anders te hanteer: 'n hoek groter as 360°, of kleiner as −90°, word eerste reggemaak. Die ander is om nooit na die antwoord te jaag voordat die driehoek geteken is nie, want sodra dit geteken is, kos 'n vraag soos hierdie net een reël.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;tan 49°&nbsp; in terms of p.", af: "Skryf vervolgens &nbsp;tan 49°&nbsp; in terme van p.",
      },
      hint: {
        en: "49° is the other corner of the same triangle. Relabel the picture from that corner — the hypotenuse does not move, but opposite and adjacent swap.", af: "49° is die ander hoek van dieselfde driehoek. Benoem die prent weer van daardie hoek af: die skuinssy beweeg nie, maar teenoorstaande en aangrensend ruil om.",
      },
      memo: [
        { type: "step", text: { en: "41° and 49° add to 90°, so 49° is the <b>other acute angle of the same triangle</b> — and the two acute angles share the sides.", af: "41° en 49° tel op tot 90°, dus is 49° die <b>ander skerp hoek van dieselfde driehoek</b>, en die twee skerp hoeke deel die sye." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Label it from the 49° corner: the side <b>opposite</b> 49° is √(1 − p²) and the side <b>next to</b> 49° is p.", af: "Benoem dit van die 49°-hoek af: die sy <b>teenoor</b> 49° is √(1 − p²) en die sy <b>langs</b> 49° is p." }, ticks: ["ca"] },
        { type: "answer", text: { en: "tan 49° = O/A = √(1 − p²)/p", af: "tan 49° = O/A = √(1 − p²)/p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "49° is not a new angle at all — it is the other corner of the same triangle, because 41° and 49° add to 90°. Turn the picture round in your head and label it from the 49° corner: what was opposite 41° is now the side next to 49°, and what was next to 41° is now the side opposite 49°. The hypotenuse never moves. So from the 49° corner the opposite side is √(1 − p²) and the adjacent side is p, and tan is opposite over adjacent, giving √(1 − p²) over p. If you prefer the formal route, tan 49° is sin 49° over cos 49°, and each of those converts by a co-function to cos 41° and sin 41°. Same answer, more writing.", af: "49° is glad nie 'n nuwe hoek nie: dit is die ander hoek van dieselfde driehoek, want 41° en 49° tel op tot 90°. Draai die prent in jou kop om en benoem dit van die 49°-hoek af: wat teenoor 41° was, is nou die sy langs 49°, en wat langs 41° was, is nou die sy teenoor 49°. Die skuinssy beweeg nooit nie. Van die 49°-hoek af is die teenoorstaande sy dus √(1 − p²) en die aangrensende sy p, en tan is teenoorstaande oor aangrensend, wat √(1 − p²) oor p gee. As jy die formele roete verkies: tan 49° is sin 49° oor cos 49°, en elkeen van hulle skakel met 'n ko-funksie om na cos 41° en sin 41°. Dieselfde antwoord, meer skryfwerk.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — tan 38° = 1/m  (her Short-cut row 1, upside down: opp 1,
   adj m, hyp √(m² + 1) — the template where Pythagoras ADDS)
     (a) hypotenuse = √(m² + 1)          [no figure]
     (b) sin 38° = 1/√(m² + 1)           [figure]
     (c) cos 218° = −m/√(m² + 1)         [figure]  ← reduce, then read
   --------------------------------------------------------------- */
const Q3_TRI = flamingo(38, { x: "m", y: "1", r: "√(m²+1)" });

const q3 = {
  id: "gtrig.sib.sss.q3",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-tan-given-as-one-over-m-hypotenuse-template",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  diagram: { parts: { b: { spec: Q3_TRI }, c: { spec: Q3_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;tan 38° = 1/m.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the hypotenuse in terms of m.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;tan 38° = 1/m.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die skuinssy in terme van m neer.",
      },
      hint: {
        en: "No flamingo needed here — 1 over m already reads as a ratio. Decide which side is 1 and which is m, then ask which side is missing before you write the (pyth) line.", af: "Hier is geen flamingo nodig nie: 1 oor m lees reeds as 'n verhouding. Besluit watter sy 1 is en watter m is, en vra dan watter sy ontbreek voordat jy die (pyth)-reël skryf.",
      },
      memo: [
        { type: "step", text: { en: "① &nbsp;tan 38° = 1/m = O/A, &nbsp;so the side <b>opposite</b> 38° is 1 and the side <b>next to</b> it is m.", af: "① &nbsp;tan 38° = 1/m = O/A, &nbsp;dus is 1 die sy <b>teenoor</b> 38° en m die sy <b>langs</b> die hoek." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② The missing side is the hypotenuse, so Pythagoras <b>adds</b>: &nbsp;h² = 1² + m² &nbsp;(pyth) &nbsp;⟹&nbsp; √h² = √(m² + 1)", af: "② Die ontbrekende sy is die skuinssy, dus moet Pythagoras <b>optel</b>: &nbsp;h² = 1² + m² &nbsp;(pyth) &nbsp;⟹&nbsp; √h² = √(m² + 1)" } },
        { type: "answer", text: { en: "h = √(m² + 1) &nbsp;— always positive, because it is a length", af: "h = √(m² + 1) &nbsp;(altyd positief, want dit is 'n lengte)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this template ADDS. When the two legs are known and the hypotenuse is missing you add the squares; when the hypotenuse is known and a leg is missing you subtract. Ask which side is missing BEFORE you write the (pyth) line.", af: "PASOP: hierdie templaat TEL OP. As die twee kort sye bekend is en die skuinssy ontbreek, tel jy die kwadrate op; as die skuinssy bekend is en 'n kort sy ontbreek, trek jy af. Vra watter sy ontbreek VOORDAT jy die (pyth)-reël skryf.",
        } },
      ],
      esplain: {
        en: "This one is given the other way up, and that is deliberate. tan 38° = 1 over m already looks like a ratio, so no flamingo is needed — the 1 is on top and the m is underneath. tan is opposite over adjacent, so the side opposite 38° is 1 and the side next to it is m. Now the missing side is the hypotenuse, and this time Pythagoras ADDS: h² = 1² + m², so h = √(m² + 1). That plus is the whole difference between this template and the last two. When the letter sits on a leg and the hypotenuse is the unknown, you add; when the hypotenuse is known and a leg is unknown, you subtract. Ask which side is missing before you write the Pythagoras line.", af: "Hierdie een word andersom gegee, en dit is doelbewus. tan 38° = 1 oor m lyk reeds soos 'n verhouding, dus is geen flamingo nodig nie: die 1 is bo en die m is onder. tan is teenoorstaande oor aangrensend, dus is 1 die sy teenoor 38° en m die sy langs die hoek. Nou is die ontbrekende sy die skuinssy, en hierdie keer TEL Pythagoras OP: h² = 1² + m², dus h = √(m² + 1). Daardie plus is die hele verskil tussen hierdie templaat en die vorige twee. As die letter op 'n kort sy sit en die skuinssy die onbekende is, tel jy op; as die skuinssy bekend is en 'n kort sy onbekend, trek jy af. Vra watter sy ontbreek voordat jy die Pythagoras-reël skryf.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;sin 38°&nbsp; in terms of m.", af: "Skryf vervolgens &nbsp;sin 38°&nbsp; in terme van m.",
      },
      hint: {
        en: "Read it straight off the sketch — sin is opposite over hypotenuse.", af: "Lees dit reguit van die skets af: sin is teenoorstaande oor skuinssy.",
      },
      memo: [
        { type: "step", text: { en: "From the sketch: the side opposite 38° is 1 and the hypotenuse is √(m² + 1).", af: "Van die skets af: die sy teenoor 38° is 1 en die skuinssy is √(m² + 1)." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "sin 38° = O/H = 1/√(m² + 1)", af: "sin 38° = O/H = 1/√(m² + 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "With the triangle drawn there is nothing left to think about. sin 38° is opposite over hypotenuse, and on this sketch the opposite side is 1 and the hypotenuse is √(m² + 1), so sin 38° is 1 over √(m² + 1). It is worth noticing that the answer is allowed to keep a surd underneath here — this is an in-terms-of answer, not a special-sums value, so nothing needs rationalising unless the question asks for it. If a later part of a paper does ask for a rationalised form, multiply top and bottom by √(m² + 1) and the surd moves upstairs.", af: "Met die driehoek geteken, is daar niks oor om oor te dink nie. sin 38° is teenoorstaande oor skuinssy, en op hierdie skets is die teenoorstaande sy 1 en die skuinssy √(m² + 1), dus is sin 38° gelyk aan 1 oor √(m² + 1). Let op dat die antwoord hier 'n wortelvorm onder mag hou: dit is 'n antwoord in terme van m, nie 'n waarde uit 'n spesiale som nie, dus hoef niks gerasionaliseer te word nie, tensy die vraag daarvoor vra. As 'n latere deel van 'n vraestel wel 'n gerasionaliseerde vorm vra, vermenigvuldig bo en onder met √(m² + 1) en die wortelvorm skuif na bo.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 218°&nbsp; in terms of m.", af: "Skryf vervolgens &nbsp;cos 218°&nbsp; in terme van m.",
      },
      hint: {
        en: "Write the split above 218° first and decide the sign. Only then go to the triangle.", af: "Skryf eers die opsplitsing bo 218° en besluit oor die teken. Gaan eers dan na die driehoek.",
      },
      memo: [
        { type: "step", text: { en: "218° = 180° + 38°, which lands in <b>T</b>, where only tan is positive — so cosine takes the minus: &nbsp;cos 218° = −cos 38°", af: "218° = 180° + 38°, wat in <b>T</b> beland, waar net tan positief is, dus kry cos die minus: &nbsp;cos 218° = −cos 38°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now read cos 38° off the sketch: &nbsp;cos 38° = A/H = m/√(m² + 1)", af: "Lees nou cos 38° van die skets af: &nbsp;cos 38° = A/H = m/√(m² + 1)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos 218° = −m/√(m² + 1)", af: "cos 218° = −m/√(m² + 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two jobs again, in the usual order. First reduce: 218° is 180° + 38°, which lands in T, where only tan is positive — so cosine picks up a minus and cos 218° = −cos 38°. Only then go to the sketch. cos 38° is adjacent over hypotenuse, which is m over √(m² + 1). Put the minus back and you have −m over √(m² + 1). The order matters more than it looks. If you read the sketch first, you are reading a picture of an acute angle to answer a question about an angle in the third quadrant, and the sign goes missing. Write the split above the angle, reduce, then read.", af: "Weer twee take, in die gewone volgorde. Reduseer eers: 218° is 180° + 38°, wat in T beland, waar net tan positief is, dus kry cos 'n minus en cos 218° = −cos 38°. Gaan eers dan na die skets. cos 38° is aangrensend oor skuinssy, wat m oor √(m² + 1) is. Sit die minus terug en jy het −m oor √(m² + 1). Die volgorde maak meer saak as wat dit lyk. As jy eers die skets lees, lees jy 'n prent van 'n skerp hoek om 'n vraag oor 'n hoek in die derde kwadrant te beantwoord, en die teken raak weg. Skryf die opsplitsing bo die hoek, reduseer, lees dan af.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — cos 65° = 1/k  (her Short-cut row 3: adj 1, hyp k,
   opp √(k² − 1) — the template where the LETTER IS THE HYPOTENUSE,
   which is what flips the Pythagoras subtraction round)
     (a) third side = √(k² − 1)          [no figure]
     (b) tan 65° = √(k² − 1)             [figure]
     (c) sin 245° = −√(k² − 1)/k         [figure]
   --------------------------------------------------------------- */
const Q4_TRI = flamingo(65, { x: "1", y: "√(k²−1)", r: "k" });

const q4 = {
  id: "gtrig.sib.sss.q4",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-cos-given-as-one-over-k-hypotenuse-is-the-letter",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  diagram: { parts: { b: { spec: Q4_TRI }, c: { spec: Q4_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 65° = 1/k.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of k.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;cos 65° = 1/k.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die derde sy in terme van k neer.",
      },
      hint: {
        en: "Careful with this one: cos = 1 over k puts the letter on the HYPOTENUSE. That changes which way round the Pythagoras subtraction goes.", af: "Pas op met hierdie een: cos = 1 oor k sit die letter op die SKUINSSY. Dit verander in watter volgorde die Pythagoras-aftrekking gaan.",
      },
      memo: [
        { type: "step", text: { en: "① &nbsp;cos 65° = 1/k = A/H, &nbsp;so the side <b>next to</b> 65° is 1 and the <b>hypotenuse</b> is k.", af: "① &nbsp;cos 65° = 1/k = A/H, &nbsp;dus is 1 die sy <b>langs</b> 65° en k die <b>skuinssy</b>." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② The hypotenuse is the known side now, so Pythagoras <b>subtracts</b> the other way round: &nbsp;y² = k² − 1² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(k² − 1) &nbsp;⟹&nbsp; y = ±√(k² − 1)", af: "② Die skuinssy is nou die bekende sy, dus moet Pythagoras andersom <b>aftrek</b>: &nbsp;y² = k² − 1² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(k² − 1) &nbsp;⟹&nbsp; y = ±√(k² − 1)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side opposite 65° is √(k² − 1)", af: "Eerste kwadrant, dus is elke sy positief &nbsp;∴&nbsp; die sy teenoor 65° is √(k² − 1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √(k² − 1), NOT √(1 − k²). The hypotenuse is always the longest side, so the bigger square goes first. Getting this the wrong way round is the most common slip on the whole tile.", af: "PASOP: √(k² − 1), NIE √(1 − k²) nie. Die skuinssy is altyd die langste sy, dus kom die groter kwadraat eerste. Om dit verkeerd om te kry, is die algemeenste glips op die hele teël.",
        } },
      ],
      esplain: {
        en: "This is her third template, and it is the one that catches people. cos 65° = 1 over k means adjacent over hypotenuse is 1 over k, so the side next to 65° is 1 and the HYPOTENUSE is k. That is the difference: here the letter sits on the hypotenuse, not on a leg. So Pythagoras takes the small square away from the big one in the other order: y² = k² − 1², giving y = √(k² − 1), not √(1 − k²). Getting that the wrong way round is the single most common mistake on this tile, and there is an easy check — the hypotenuse is always the longest side, so whatever sits under the square root has to be the bigger square minus the smaller one.", af: "Dit is haar derde templaat, en dis die een wat mense vang. cos 65° = 1 oor k beteken aangrensend oor skuinssy is 1 oor k, dus is 1 die sy langs 65° en k die SKUINSSY. Dit is die verskil: hier sit die letter op die skuinssy, nie op 'n kort sy nie. Dus trek Pythagoras die klein kwadraat in die ander volgorde van die groot een af: y² = k² − 1², wat y = √(k² − 1) gee, nie √(1 − k²) nie. Om dit verkeerd om te kry, is die heel algemeenste fout op hierdie teël, en daar is 'n maklike toets: die skuinssy is altyd die langste sy, dus moet wat ook al onder die vierkantswortel staan, die groter kwadraat min die kleiner een wees.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;tan 65°&nbsp; in terms of k.", af: "Skryf vervolgens &nbsp;tan 65°&nbsp; in terme van k.",
      },
      hint: {
        en: "Opposite over adjacent — and tidy the answer if a 1 ends up underneath.", af: "Teenoorstaande oor aangrensend, en maak die antwoord netjies as daar 'n 1 onder beland.",
      },
      memo: [
        { type: "step", text: { en: "From the sketch: the side opposite 65° is √(k² − 1) and the side next to it is 1.", af: "Van die skets af: die sy teenoor 65° is √(k² − 1) en die sy langs die hoek is 1." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "tan 65° = O/A = √(k² − 1)/1 = √(k² − 1)", af: "tan 65° = O/A = √(k² − 1)/1 = √(k² − 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Read it straight off the sketch. tan 65° is opposite over adjacent, the opposite side is √(k² − 1) and the adjacent side is 1, so tan 65° is √(k² − 1) over 1 — and dividing by 1 changes nothing, so it is simply √(k² − 1). Answers that come out with a 1 underneath are worth tidying, because a marker wants the simplest form. This is also a good moment to sanity check the triangle: k is the hypotenuse, so k has to be bigger than 1, which means k² − 1 is positive and the square root is a real number. If your k had come out smaller than 1, the triangle could not exist.", af: "Lees dit reguit van die skets af. tan 65° is teenoorstaande oor aangrensend, die teenoorstaande sy is √(k² − 1) en die aangrensende sy is 1, dus is tan 65° gelyk aan √(k² − 1) oor 1, en om deur 1 te deel, verander niks, dus is dit net √(k² − 1). Antwoorde wat met 'n 1 onder uitkom, is die moeite werd om netjies te maak, want 'n nasiener wil die eenvoudigste vorm hê. Dit is ook 'n goeie oomblik om die driehoek vinnig te toets: k is die skuinssy, dus moet k groter as 1 wees, wat beteken k² − 1 is positief en die vierkantswortel is 'n reële getal. As jou k kleiner as 1 uitgekom het, kon die driehoek nie bestaan nie.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;sin 245°&nbsp; in terms of k.", af: "Skryf vervolgens &nbsp;sin 245°&nbsp; in terme van k.",
      },
      hint: {
        en: "Reduce 245° first, then read the sketch. The reduction's only job is the sign.", af: "Reduseer eers 245°, lees dan die skets. Die reduksie se enigste werk is die teken.",
      },
      memo: [
        { type: "step", text: { en: "245° = 180° + 65°, which lands in <b>T</b>, where only tan is positive — so sine takes the minus: &nbsp;sin 245° = −sin 65°", af: "245° = 180° + 65°, wat in <b>T</b> beland, waar net tan positief is, dus kry sin die minus: &nbsp;sin 245° = −sin 65°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now read sin 65° off the sketch: &nbsp;sin 65° = O/H = √(k² − 1)/k", af: "Lees nou sin 65° van die skets af: &nbsp;sin 65° = O/H = √(k² − 1)/k" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin 245° = −√(k² − 1)/k", af: "sin 245° = −√(k² − 1)/k" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Reduce first, then read the sketch. 245° is 180° + 65°, which lands in T, where only tan is positive — so sine picks up a minus and sin 245° = −sin 65°. Now go to the picture: sin 65° is opposite over hypotenuse, which is √(k² − 1) over k. Put the minus back on and you have that whole thing negative. Notice how little of the work was actually about 245°. Every question on this tile ends up back at the same acute-angle triangle; the reduction is only there to decide which sign the answer wears. Draw the triangle once, carefully, and the rest of the question is a sign and a read-off.", af: "Reduseer eers, lees dan die skets. 245° is 180° + 65°, wat in T beland, waar net tan positief is, dus kry sin 'n minus en sin 245° = −sin 65°. Gaan nou na die prent: sin 65° is teenoorstaande oor skuinssy, wat √(k² − 1) oor k is. Sit die minus terug en die hele ding is negatief. Let op hoe min van die werk eintlik oor 245° gegaan het. Elke vraag op hierdie teël kom terug by dieselfde driehoek met 'n skerp hoek; die reduksie is net daar om te besluit watter teken die antwoord dra. Teken die driehoek een keer, versigtig, en die res van die vraag is 'n teken en 'n aflees.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — sin 47° = d  (opp d, hyp 1, adj √(1 − d²)), with a SQUARE
   (2026-Q5.1's sin²112° mould, fresh angle).
     (a) third side = √(1 − d²)          [no figure]
     (b) cos 227° = −√(1 − d²)           [figure]
     (c) sin²137° = 1 − d²               [figure]  ← co-function into S,
         then square: the surd disappears entirely
   --------------------------------------------------------------- */
const Q5_TRI = flamingo(47, { x: "√(1−d²)", y: "d", r: "1" });

const q5 = {
  id: "gtrig.sib.sss.q5",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-square-of-a-cofunction-in-terms-of-d",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  diagram: { parts: { b: { spec: Q5_TRI }, c: { spec: Q5_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;sin 47° = d.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of d.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;sin 47° = d.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die derde sy in terme van d neer.",
      },
      hint: {
        en: "Stand the d on a 1. Sine is opposite over hypotenuse, so decide which side the d belongs to before you draw anything.", af: "Laat die d op 'n 1 staan. sin is teenoorstaande oor skuinssy, dus besluit by watter sy die d hoort voordat jy iets teken.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the d on a 1</b> — the <b>flamingo</b>: &nbsp;sin 47° = d/1 = O/H. &nbsp;So the side opposite 47° is d and the hypotenuse is 1.", af: "① <b>Laat die d op 'n 1 staan</b> (die <b>flamingo</b>): &nbsp;sin 47° = d/1 = O/H. &nbsp;Die sy teenoor 47° is dus d en die skuinssy is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;x² = 1² − d² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − d²) &nbsp;⟹&nbsp; x = ±√(1 − d²)", af: "② &nbsp;x² = 1² − d² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − d²) &nbsp;⟹&nbsp; x = ±√(1 − d²)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side next to 47° is √(1 − d²)", af: "Eerste kwadrant, dus is elke sy positief &nbsp;∴&nbsp; die sy langs 47° is √(1 − d²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Flamingo again: sin 47° = d becomes d over 1, and sine is opposite over hypotenuse, so the side opposite 47° is d and the hypotenuse is 1. Pythagoras then gives the side next to 47°: x² = 1² − d², so x = √(1 − d²). Draw it, fill it in, and stop — every part that follows is read off this one picture. It really is worth taking the extra thirty seconds to draw it properly and label all three sides, because otherwise each later part sends you back to first principles. Her own instruction on the page is exactly that: re-draw with the third side filled in, then use the sketch to answer the questions.", af: "Weer die flamingo: sin 47° = d word d oor 1, en sin is teenoorstaande oor skuinssy, dus is d die sy teenoor 47° en 1 die skuinssy. Pythagoras gee dan die sy langs 47°: x² = 1² − d², dus x = √(1 − d²). Teken dit, vul dit in, en stop: elke deel wat volg, word van hierdie een prent afgelees. Dit is regtig die ekstra dertig sekondes werd om dit behoorlik te teken en al drie sye te benoem, want anders stuur elke latere deel jou terug na die begin. Haar eie opdrag op die bladsy is presies dit: teken weer met die derde sy ingevul, en gebruik dan die skets om die vrae te beantwoord.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 227°&nbsp; in terms of d.", af: "Skryf vervolgens &nbsp;cos 227°&nbsp; in terme van d.",
      },
      hint: {
        en: "Split 227° first and decide the sign, then read cos 47° off your triangle.", af: "Splits eers 227° op en besluit oor die teken, lees dan cos 47° van jou driehoek af.",
      },
      memo: [
        { type: "step", text: { en: "227° = 180° + 47°, which lands in <b>T</b>, where only tan is positive — so cosine takes the minus: &nbsp;cos 227° = −cos 47°", af: "227° = 180° + 47°, wat in <b>T</b> beland, waar net tan positief is, dus kry cos die minus: &nbsp;cos 227° = −cos 47°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 47° = A/H = √(1 − d²)/1 &nbsp;∴&nbsp; cos 227° = −√(1 − d²)", af: "cos 47° = A/H = √(1 − d²)/1 &nbsp;∴&nbsp; cos 227° = −√(1 − d²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "227° is 180° + 47°, which lands in T, where only tan is positive — so cosine turns negative and cos 227° = −cos 47°. Now read cos 47° off the sketch: adjacent over hypotenuse, which is √(1 − d²) over 1, or just √(1 − d²). Put the minus back and the answer is that whole root, negative. One small thing to watch: the minus belongs to the whole square root, not to what is inside it. Writing the root of d² − 1 instead would be a completely different number, and for most values of d it would not even be a real one.", af: "227° is 180° + 47°, wat in T beland, waar net tan positief is, dus word cos negatief en cos 227° = −cos 47°. Lees nou cos 47° van die skets af: aangrensend oor skuinssy, wat √(1 − d²) oor 1 is, of net √(1 − d²). Sit die minus terug en die antwoord is daardie hele wortel, negatief. Een klein dingetjie om dop te hou: die minus behoort aan die hele vierkantswortel, nie aan wat binne-in is nie. As jy eerder die wortel van d² − 1 skryf, is dit 'n heeltemal ander getal, en vir die meeste waardes van d sou dit nie eers reëel wees nie.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;sin²137°&nbsp; in terms of d.", af: "Skryf vervolgens &nbsp;sin²137°&nbsp; in terme van d.",
      },
      hint: {
        en: "Do the angle before the square. Which quadrant is 90° + 47° in, and does sine survive there?", af: "Doen die hoek voor die kwadraat. In watter kwadrant is 90° + 47°, en oorleef sin daar?",
      },
      memo: [
        { type: "step", text: { en: "137° = 90° + 47°, which lands in <b>S</b>, where sine is positive — and a 90° split converts sin to cos: &nbsp;sin 137° = cos 47°", af: "137° = 90° + 47°, wat in <b>S</b> beland, waar sin positief is, en 'n 90°-opsplitsing skakel sin om na cos: &nbsp;sin 137° = cos 47°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Read cos 47° off the sketch: &nbsp;cos 47° = A/H = √(1 − d²)", af: "Lees cos 47° van die skets af: &nbsp;cos 47° = A/H = √(1 − d²)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²137° = [√(1 − d²)]² = 1 − d²", af: "sin²137° = [√(1 − d²)]² = 1 − d²" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: reduce inside <b>block brackets</b> first, then square. And the square undoes the square root completely — if a √ survives your squaring, you squared only part of the expression.", af: "ONTHOU: reduseer eers binne <b>blokhakies</b>, kwadreer dan. En die kwadraat maak die vierkantswortel heeltemal ongedaan: as 'n √ jou kwadrering oorleef, het jy net 'n deel van die uitdrukking gekwadreer.",
        } },
      ],
      esplain: {
        en: "Do the angle first, then the square. 137° is 90° + 47°, which lands in S, where sine is positive — so sin 137° = sin(90° + 47°) = cos 47°, with no minus. From the sketch, cos 47° is √(1 − d²). Now square it, in block brackets: the square and the square root undo each other, so you are left with 1 − d². That is a satisfying answer because the surd disappears completely, which is a good sign you have done it right. If a square root survives a squaring, go back and check whether you squared the whole expression or only part of it.", af: "Doen eers die hoek, dan die kwadraat. 137° is 90° + 47°, wat in S beland, waar sin positief is, dus sin 137° = sin(90° + 47°) = cos 47°, sonder 'n minus. Van die skets af is cos 47° gelyk aan √(1 − d²). Kwadreer dit nou, in blokhakies: die kwadraat en die vierkantswortel maak mekaar ongedaan, dus bly 1 − d² oor. Dit is 'n lekker antwoord, want die wortelvorm verdwyn heeltemal, en dit is 'n goeie teken dat jy dit reg gedoen het. As 'n vierkantswortel 'n kwadrering oorleef, gaan terug en kyk of jy die hele uitdrukking gekwadreer het of net 'n deel daarvan.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — THE REVERSE ITEM: cos 58° = k, then name the ratio an
   expression in k really is (adj k, hyp 1, opp √(1 − k²)).
     (a) third side = √(1 − k²)          [no figure]
     (b) √(1 − k²)      = sin 58°        [figure]
     (c) √(1 − k²)/k    = tan 58°        [figure]
   Same triangle, read BACKWARDS — the check that a learner knows a
   trig ratio IS a ratio of sides, not a calculator button.
   --------------------------------------------------------------- */
const Q6_TRI = flamingo(58, { x: "k", y: "√(1−k²)", r: "1" });

const q6 = {
  id: "gtrig.sib.sss.q6",
  chapter: CH,
  topic: "super-special-sums",
  archetype: "super-special-sums-reverse-name-the-ratio-from-an-expression-in-k",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  diagram: { parts: { b: { spec: Q6_TRI }, c: { spec: Q6_TRI } } },
  parts: [
    {
      id: "a",
      marks: 2,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 58° = k.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of k.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Dit is gegee dat &nbsp;cos 58° = k.<br><br>Teken 'n reghoekige driehoek in die eerste kwadrant om dit voor te stel, en skryf die lengte van die derde sy in terme van k neer.",
      },
      hint: {
        en: "Same flamingo as always — stand the k on a 1 and use (pyth). Label all three sides carefully; you are about to read this picture backwards.", af: "Dieselfde flamingo as altyd: laat die k op 'n 1 staan en gebruik (pyth). Benoem al drie sye versigtig; jy gaan hierdie prent netnou agteruit lees.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the k on a 1</b> — the <b>flamingo</b>: &nbsp;cos 58° = k/1 = A/H. &nbsp;So the side next to 58° is k and the hypotenuse is 1.", af: "① <b>Laat die k op 'n 1 staan</b> (die <b>flamingo</b>): &nbsp;cos 58° = k/1 = A/H. &nbsp;Die sy langs 58° is dus k en die skuinssy is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;y² = 1² − k² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − k²) &nbsp;⟹&nbsp; y = ±√(1 − k²)", af: "② &nbsp;y² = 1² − k² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − k²) &nbsp;⟹&nbsp; y = ±√(1 − k²)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side opposite 58° is √(1 − k²)", af: "Eerste kwadrant, dus is elke sy positief &nbsp;∴&nbsp; die sy teenoor 58° is √(1 − k²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new here — cos 58° = k stands on a 1, so the side next to 58° is k, the hypotenuse is 1, and Pythagoras gives the opposite side as √(1 − k²). Draw it and label all three sides. What makes this card different is what comes next: instead of asking you to write a ratio in terms of k, it is going to hand you an expression in k and ask WHICH ratio it is. Same triangle, read backwards. So take extra care with the labelling here, because the picture is the dictionary the rest of the question gets translated with.", af: "Niks nuuts hier nie: cos 58° = k staan op 'n 1, dus is k die sy langs 58°, die skuinssy is 1, en Pythagoras gee die teenoorstaande sy as √(1 − k²). Teken dit en benoem al drie sye. Wat hierdie kaart anders maak, is wat volg: in plaas daarvan om jou te vra om 'n verhouding in terme van k te skryf, gaan dit jou 'n uitdrukking in k gee en vra WATTER verhouding dit is. Dieselfde driehoek, agteruit gelees. Wees dus ekstra versigtig met die benoeming hier, want die prent is die woordeboek waarmee die res van die vraag vertaal word.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;√(1 − k²)&nbsp; as a single trigonometric ratio of 58°.", af: "Skryf vervolgens &nbsp;√(1 − k²)&nbsp; as 'n enkele trigonometriese verhouding van 58°.",
      },
      hint: {
        en: "This one is asked backwards. Find √(1 − k²) on your sketch — which side is it? Then SOHCAHTOA names the ratio.", af: "Hierdie een word agteruit gevra. Soek √(1 − k²) op jou skets: watter sy is dit? Dan gee SOHCAHTOA die verhouding se naam.",
      },
      memo: [
        { type: "step", text: { en: "Find the expression on the sketch: &nbsp;√(1 − k²) is the side <b>opposite</b> 58°, and the hypotenuse is 1.", af: "Soek die uitdrukking op die skets: &nbsp;√(1 − k²) is die sy <b>teenoor</b> 58°, en die skuinssy is 1." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "O/H = √(1 − k²)/1 &nbsp;∴&nbsp; √(1 − k²) = sin 58°", af: "O/H = √(1 − k²)/1 &nbsp;∴&nbsp; √(1 − k²) = sin 58°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Read the sketch the other way round. Instead of asking what sin 58° is, the question shows you √(1 − k²) and asks which ratio that is. Look at the triangle: √(1 − k²) is the side opposite 58°, and the hypotenuse is 1. Opposite over hypotenuse is sine, and dividing by 1 changes nothing, so √(1 − k²) is exactly sin 58°. Questions asked backwards feel harder than they are, and the cure is always the same — draw the picture first, then hunt for the expression on it. Once you can see which sides the expression is built from, SOHCAHTOA names the ratio for you.", af: "Lees die skets andersom. In plaas daarvan om te vra wat sin 58° is, wys die vraag jou √(1 − k²) en vra watter verhouding dit is. Kyk na die driehoek: √(1 − k²) is die sy teenoor 58°, en die skuinssy is 1. Teenoorstaande oor skuinssy is sin, en om deur 1 te deel, verander niks, dus is √(1 − k²) presies sin 58°. Vrae wat agteruit gevra word, voel moeiliker as wat hulle is, en die raat is altyd dieselfde: teken eers die prent, soek dan die uitdrukking daarop. Sodra jy kan sien uit watter sye die uitdrukking gebou is, gee SOHCAHTOA vir jou die verhouding se naam.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;√(1 − k²)/k&nbsp; as a single trigonometric ratio of 58°.", af: "Skryf vervolgens &nbsp;√(1 − k²)/k&nbsp; as 'n enkele trigonometriese verhouding van 58°.",
      },
      hint: {
        en: "Find both parts of the expression on your sketch, top and bottom. Opposite over adjacent has a name.", af: "Soek albei dele van die uitdrukking op jou skets, bo en onder. Teenoorstaande oor aangrensend het 'n naam.",
      },
      memo: [
        { type: "step", text: { en: "On the sketch, √(1 − k²) is the side <b>opposite</b> 58°.", af: "Op die skets is √(1 − k²) die sy <b>teenoor</b> 58°." }, ticks: ["s/f"] },
        { type: "step", text: { en: "and k is the side <b>next to</b> 58°, so the expression is opposite over adjacent.", af: "en k is die sy <b>langs</b> 58°, dus is die uitdrukking teenoorstaande oor aangrensend." }, ticks: ["ca"] },
        { type: "answer", text: { en: "O/A &nbsp;∴&nbsp; √(1 − k²)/k = tan 58°", af: "O/A &nbsp;∴&nbsp; √(1 − k²)/k = tan 58°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same trick as (b), one step further. √(1 − k²) is the side opposite 58° and k is the side next to it, so the expression is opposite over adjacent — which SOHCAHTOA calls tan. So the whole thing is tan 58°. It is worth pausing on why a question like this is asked at all: it is checking that you understand a trig ratio IS a ratio of sides, not a button on a calculator. Once the triangle is in front of you, an expression in k and a ratio of an angle are two ways of saying the same thing, and you can translate freely in either direction.", af: "Dieselfde truuk as (b), een stap verder. √(1 − k²) is die sy teenoor 58° en k is die sy langs die hoek, dus is die uitdrukking teenoorstaande oor aangrensend, wat SOHCAHTOA tan noem. Die hele ding is dus tan 58°. Dit is die moeite werd om stil te staan by hoekom so 'n vraag ooit gevra word: dit toets of jy verstaan dat 'n trig-verhouding 'n verhouding van sye IS, nie 'n knoppie op 'n sakrekenaar nie. Sodra die driehoek voor jou is, is 'n uitdrukking in k en 'n verhouding van 'n hoek twee maniere om dieselfde ding te sê, en jy kan vrylik in albei rigtings vertaal.",
      },
    },
  ],
};

export const gtrigSuperSpecialSumsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
