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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 57° = t.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of t.",
      },
      hint: {
        en: "Stand the t on a 1 — the flamingo. Once cos 57° reads as t over 1, you know which side is which, and (pyth) does the rest.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the t on a 1</b> — the <b>flamingo</b>: &nbsp;cos 57° = t/1 = A/H. &nbsp;So the side next to 57° is t and the hypotenuse is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;y² = 1² − t² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − t²) &nbsp;⟹&nbsp; y = ±√(1 − t²)" } },
        { type: "answer", text: { en: "57° is acute, so the triangle sits in the first quadrant where every side is positive &nbsp;∴&nbsp; the side opposite 57° is √(1 − t²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A bare number cannot be read as a ratio, so the first move is to give it a bottom. She calls it the flamingo: stand the t on a 1. cos 57° = t becomes cos 57° = t over 1, and now it reads as adjacent over hypotenuse — so the side next to 57° is t and the hypotenuse is 1. Draw that triangle in the first quadrant with the 57° at the origin, and the only side left is the opposite one, which Pythagoras hands you: y² = 1² − t², so y = √(1 − t²). Because the triangle is in the first quadrant every side is positive, so there is no sign to argue about. Fill that third side in on your sketch — from here on, every part of the question is read off this one picture.",
      },
    },
    {
      id: "b",
      marks: 1,
      level: 1,
      prompt: {
        en: "Hence write &nbsp;sin 57°&nbsp; in terms of t.",
      },
      hint: {
        en: "Everything you need is on the sketch already. sin is opposite over hypotenuse — which two sides is that?",
      },
      memo: [
        { type: "answer", text: { en: "sin 57° = O/H = √(1 − t²)/1 = √(1 − t²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new to work out — the sketch already carries all three sides. sin 57° is opposite over hypotenuse, and on this triangle that is √(1 − t²) over 1, which is just √(1 − t²). That is the whole point of drawing the triangle first: one sketch answers every part of the question. It also explains why she calls these super special sums rather than something harder sounding. The maths is the same maths as an ordinary special sum — draw, Pythagoras, read off — the only difference is that the sides are letters instead of numbers, so nothing ever turns into a decimal.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 1,
      prompt: {
        en: "Hence write &nbsp;sin 33°&nbsp; in terms of t.",
      },
      hint: {
        en: "Add the two angles. 33° is the other corner of the very triangle you have just drawn.",
      },
      memo: [
        { type: "step", text: { en: "57° and 33° add to 90°, so this is a co-function: &nbsp;sin 33° = sin(90° − 57°)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "= cos 57° = t" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: you can also read this one straight off the sketch. From the 33° corner the opposite side is t and the hypotenuse is 1, so sin 33° = t. Same answer, and a marker takes either route.",
        } },
      ],
      esplain: {
        en: "57° and 33° add up to 90°, which means they are the two acute angles of the very triangle you have just drawn. So sin 33° is asking about the same picture from the other corner: what is opposite 33° is the side next to 57°, and the hypotenuse does not move. That is a co-function — sin 33° = sin(90° − 57°) = cos 57° — and cos 57° is what you were given, namely t. You could also read it straight off the sketch: from the 33° corner the opposite side is t and the hypotenuse is 1. Both routes give t, and a marker takes either one.",
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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;sin 41° = p.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of p.",
      },
      hint: {
        en: "Flamingo first, but watch which side the p lands on — sine is opposite over hypotenuse, not adjacent over hypotenuse.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the p on a 1</b> — the <b>flamingo</b>: &nbsp;sin 41° = p/1 = O/H. &nbsp;So the side <b>opposite</b> 41° is p and the hypotenuse is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;x² = 1² − p² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − p²) &nbsp;⟹&nbsp; x = ±√(1 − p²)" } },
        { type: "answer", text: { en: "The triangle is in the first quadrant, so every side is positive &nbsp;∴&nbsp; the side next to 41° is √(1 − p²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same flamingo, different side. sin 41° = p becomes p over 1, and sine is opposite over hypotenuse, so this time it is the side OPPOSITE 41° that is p, with the hypotenuse still 1. That is the one thing to be careful about with these: which side the letter lands on depends entirely on which ratio you were given. Then Pythagoras finds the side next to 41°: x² = 1² − p², so x = √(1 − p²). Notice it is 1 − p² again and not p² − 1. That happens whenever the letter sits on a short side and the 1 is the hypotenuse, because the hypotenuse is the biggest side, so you are always taking the smaller square away from the bigger one.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 401°&nbsp; in terms of p.",
      },
      hint: {
        en: "401° is more than a full turn. Deal with that before anything else, then read the sketch.",
      },
      memo: [
        { type: "step", text: { en: "401° is past a full turn, so <b>rotate</b> first — write the −360° above the angle: &nbsp;cos 401° = cos 41°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 41° = A/H = √(1 − p²)/1 = √(1 − p²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "401° is more than a full turn, so the first job is a rotation: take 360° off and you are back at 41°, the very angle your triangle is built on. She writes the subtraction above the angle, once per 360°, so the counting stays visible. cos 41° is then adjacent over hypotenuse, which on this sketch is √(1 − p²) over 1, or simply √(1 − p²). Two habits are doing the work here. One is dealing with the rotation before anything else — an angle bigger than 360°, or smaller than −90°, gets fixed first. The other is never rushing at the answer before the triangle has been drawn, because once it is drawn a question like this takes one line.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;tan 49°&nbsp; in terms of p.",
      },
      hint: {
        en: "49° is the other corner of the same triangle. Relabel the picture from that corner — the hypotenuse does not move, but opposite and adjacent swap.",
      },
      memo: [
        { type: "step", text: { en: "41° and 49° add to 90°, so 49° is the <b>other acute angle of the same triangle</b> — and the two acute angles share the sides." }, ticks: ["s/f"] },
        { type: "step", text: { en: "Label it from the 49° corner: the side <b>opposite</b> 49° is √(1 − p²) and the side <b>next to</b> 49° is p." }, ticks: ["ca"] },
        { type: "answer", text: { en: "tan 49° = O/A = √(1 − p²)/p" }, ticks: ["a"] },
      ],
      esplain: {
        en: "49° is not a new angle at all — it is the other corner of the same triangle, because 41° and 49° add to 90°. Turn the picture round in your head and label it from the 49° corner: what was opposite 41° is now the side next to 49°, and what was next to 41° is now the side opposite 49°. The hypotenuse never moves. So from the 49° corner the opposite side is √(1 − p²) and the adjacent side is p, and tan is opposite over adjacent, giving √(1 − p²) over p. If you prefer the formal route, tan 49° is sin 49° over cos 49°, and each of those converts by a co-function to cos 41° and sin 41°. Same answer, more writing.",
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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;tan 38° = 1/m.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the hypotenuse in terms of m.",
      },
      hint: {
        en: "No flamingo needed here — 1 over m already reads as a ratio. Decide which side is 1 and which is m, then ask which side is missing before you write the (pyth) line.",
      },
      memo: [
        { type: "step", text: { en: "① &nbsp;tan 38° = 1/m = O/A, &nbsp;so the side <b>opposite</b> 38° is 1 and the side <b>next to</b> it is m." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② The missing side is the hypotenuse, so Pythagoras <b>adds</b>: &nbsp;h² = 1² + m² &nbsp;(pyth) &nbsp;⟹&nbsp; √h² = √(m² + 1)" } },
        { type: "answer", text: { en: "h = √(m² + 1) &nbsp;— always positive, because it is a length" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: this template ADDS. When the two legs are known and the hypotenuse is missing you add the squares; when the hypotenuse is known and a leg is missing you subtract. Ask which side is missing BEFORE you write the (pyth) line.",
        } },
      ],
      esplain: {
        en: "This one is given the other way up, and that is deliberate. tan 38° = 1 over m already looks like a ratio, so no flamingo is needed — the 1 is on top and the m is underneath. tan is opposite over adjacent, so the side opposite 38° is 1 and the side next to it is m. Now the missing side is the hypotenuse, and this time Pythagoras ADDS: h² = 1² + m², so h = √(m² + 1). That plus is the whole difference between this template and the last two. When the letter sits on a leg and the hypotenuse is the unknown, you add; when the hypotenuse is known and a leg is unknown, you subtract. Ask which side is missing before you write the Pythagoras line.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;sin 38°&nbsp; in terms of m.",
      },
      hint: {
        en: "Read it straight off the sketch — sin is opposite over hypotenuse.",
      },
      memo: [
        { type: "step", text: { en: "From the sketch: the side opposite 38° is 1 and the hypotenuse is √(m² + 1)." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "sin 38° = O/H = 1/√(m² + 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "With the triangle drawn there is nothing left to think about. sin 38° is opposite over hypotenuse, and on this sketch the opposite side is 1 and the hypotenuse is √(m² + 1), so sin 38° is 1 over √(m² + 1). It is worth noticing that the answer is allowed to keep a surd underneath here — this is an in-terms-of answer, not a special-sums value, so nothing needs rationalising unless the question asks for it. If a later part of a paper does ask for a rationalised form, multiply top and bottom by √(m² + 1) and the surd moves upstairs.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 218°&nbsp; in terms of m.",
      },
      hint: {
        en: "Write the split above 218° first and decide the sign. Only then go to the triangle.",
      },
      memo: [
        { type: "step", text: { en: "218° = 180° + 38°, which lands in <b>T</b>, where only tan is positive — so cosine takes the minus: &nbsp;cos 218° = −cos 38°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now read cos 38° off the sketch: &nbsp;cos 38° = A/H = m/√(m² + 1)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "cos 218° = −m/√(m² + 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two jobs again, in the usual order. First reduce: 218° is 180° + 38°, which lands in T, where only tan is positive — so cosine picks up a minus and cos 218° = −cos 38°. Only then go to the sketch. cos 38° is adjacent over hypotenuse, which is m over √(m² + 1). Put the minus back and you have −m over √(m² + 1). The order matters more than it looks. If you read the sketch first, you are reading a picture of an acute angle to answer a question about an angle in the third quadrant, and the sign goes missing. Write the split above the angle, reduce, then read.",
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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 65° = 1/k.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of k.",
      },
      hint: {
        en: "Careful with this one: cos = 1 over k puts the letter on the HYPOTENUSE. That changes which way round the Pythagoras subtraction goes.",
      },
      memo: [
        { type: "step", text: { en: "① &nbsp;cos 65° = 1/k = A/H, &nbsp;so the side <b>next to</b> 65° is 1 and the <b>hypotenuse</b> is k." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② The hypotenuse is the known side now, so Pythagoras <b>subtracts</b> the other way round: &nbsp;y² = k² − 1² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(k² − 1) &nbsp;⟹&nbsp; y = ±√(k² − 1)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side opposite 65° is √(k² − 1)" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √(k² − 1), NOT √(1 − k²). The hypotenuse is always the longest side, so the bigger square goes first. Getting this the wrong way round is the most common slip on the whole tile.",
        } },
      ],
      esplain: {
        en: "This is her third template, and it is the one that catches people. cos 65° = 1 over k means adjacent over hypotenuse is 1 over k, so the side next to 65° is 1 and the HYPOTENUSE is k. That is the difference: here the letter sits on the hypotenuse, not on a leg. So Pythagoras takes the small square away from the big one in the other order: y² = k² − 1², giving y = √(k² − 1), not √(1 − k²). Getting that the wrong way round is the single most common mistake on this tile, and there is an easy check — the hypotenuse is always the longest side, so whatever sits under the square root has to be the bigger square minus the smaller one.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;tan 65°&nbsp; in terms of k.",
      },
      hint: {
        en: "Opposite over adjacent — and tidy the answer if a 1 ends up underneath.",
      },
      memo: [
        { type: "step", text: { en: "From the sketch: the side opposite 65° is √(k² − 1) and the side next to it is 1." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "tan 65° = O/A = √(k² − 1)/1 = √(k² − 1)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Read it straight off the sketch. tan 65° is opposite over adjacent, the opposite side is √(k² − 1) and the adjacent side is 1, so tan 65° is √(k² − 1) over 1 — and dividing by 1 changes nothing, so it is simply √(k² − 1). Answers that come out with a 1 underneath are worth tidying, because a marker wants the simplest form. This is also a good moment to sanity check the triangle: k is the hypotenuse, so k has to be bigger than 1, which means k² − 1 is positive and the square root is a real number. If your k had come out smaller than 1, the triangle could not exist.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;sin 245°&nbsp; in terms of k.",
      },
      hint: {
        en: "Reduce 245° first, then read the sketch. The reduction's only job is the sign.",
      },
      memo: [
        { type: "step", text: { en: "245° = 180° + 65°, which lands in <b>T</b>, where only tan is positive — so sine takes the minus: &nbsp;sin 245° = −sin 65°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now read sin 65° off the sketch: &nbsp;sin 65° = O/H = √(k² − 1)/k" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin 245° = −√(k² − 1)/k" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Reduce first, then read the sketch. 245° is 180° + 65°, which lands in T, where only tan is positive — so sine picks up a minus and sin 245° = −sin 65°. Now go to the picture: sin 65° is opposite over hypotenuse, which is √(k² − 1) over k. Put the minus back on and you have that whole thing negative. Notice how little of the work was actually about 245°. Every question on this tile ends up back at the same acute-angle triangle; the reduction is only there to decide which sign the answer wears. Draw the triangle once, carefully, and the rest of the question is a sign and a read-off.",
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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;sin 47° = d.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of d.",
      },
      hint: {
        en: "Stand the d on a 1. Sine is opposite over hypotenuse, so decide which side the d belongs to before you draw anything.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the d on a 1</b> — the <b>flamingo</b>: &nbsp;sin 47° = d/1 = O/H. &nbsp;So the side opposite 47° is d and the hypotenuse is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;x² = 1² − d² &nbsp;(pyth) &nbsp;⟹&nbsp; √x² = √(1 − d²) &nbsp;⟹&nbsp; x = ±√(1 − d²)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side next to 47° is √(1 − d²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Flamingo again: sin 47° = d becomes d over 1, and sine is opposite over hypotenuse, so the side opposite 47° is d and the hypotenuse is 1. Pythagoras then gives the side next to 47°: x² = 1² − d², so x = √(1 − d²). Draw it, fill it in, and stop — every part that follows is read off this one picture. It really is worth taking the extra thirty seconds to draw it properly and label all three sides, because otherwise each later part sends you back to first principles. Her own instruction on the page is exactly that: re-draw with the third side filled in, then use the sketch to answer the questions.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence write &nbsp;cos 227°&nbsp; in terms of d.",
      },
      hint: {
        en: "Split 227° first and decide the sign, then read cos 47° off your triangle.",
      },
      memo: [
        { type: "step", text: { en: "227° = 180° + 47°, which lands in <b>T</b>, where only tan is positive — so cosine takes the minus: &nbsp;cos 227° = −cos 47°" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "cos 47° = A/H = √(1 − d²)/1 &nbsp;∴&nbsp; cos 227° = −√(1 − d²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "227° is 180° + 47°, which lands in T, where only tan is positive — so cosine turns negative and cos 227° = −cos 47°. Now read cos 47° off the sketch: adjacent over hypotenuse, which is √(1 − d²) over 1, or just √(1 − d²). Put the minus back and the answer is that whole root, negative. One small thing to watch: the minus belongs to the whole square root, not to what is inside it. Writing the root of d² − 1 instead would be a completely different number, and for most values of d it would not even be a real one.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;sin²137°&nbsp; in terms of d.",
      },
      hint: {
        en: "Do the angle before the square. Which quadrant is 90° + 47° in, and does sine survive there?",
      },
      memo: [
        { type: "step", text: { en: "137° = 90° + 47°, which lands in <b>S</b>, where sine is positive — and a 90° split converts sin to cos: &nbsp;sin 137° = cos 47°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Read cos 47° off the sketch: &nbsp;cos 47° = A/H = √(1 − d²)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²137° = [√(1 − d²)]² = 1 − d²" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: reduce inside <b>block brackets</b> first, then square. And the square undoes the square root completely — if a √ survives your squaring, you squared only part of the expression.",
        } },
      ],
      esplain: {
        en: "Do the angle first, then the square. 137° is 90° + 47°, which lands in S, where sine is positive — so sin 137° = sin(90° + 47°) = cos 47°, with no minus. From the sketch, cos 47° is √(1 − d²). Now square it, in block brackets: the square and the square root undo each other, so you are left with 1 − d². That is a satisfying answer because the surd disappears completely, which is a good sign you have done it right. If a square root survives a squaring, go back and check whether you squared the whole expression or only part of it.",
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
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>It is given that &nbsp;cos 58° = k.<br><br>Draw a right-angled triangle in the first quadrant to represent this, and write down the length of the third side in terms of k.",
      },
      hint: {
        en: "Same flamingo as always — stand the k on a 1 and use (pyth). Label all three sides carefully; you are about to read this picture backwards.",
      },
      memo: [
        { type: "step", text: { en: "① <b>Stand the k on a 1</b> — the <b>flamingo</b>: &nbsp;cos 58° = k/1 = A/H. &nbsp;So the side next to 58° is k and the hypotenuse is 1." }, ticks: ["s/f"] },
        { type: "step", text: { en: "② &nbsp;y² = 1² − k² &nbsp;(pyth) &nbsp;⟹&nbsp; √y² = √(1 − k²) &nbsp;⟹&nbsp; y = ±√(1 − k²)" } },
        { type: "answer", text: { en: "First quadrant, so every side is positive &nbsp;∴&nbsp; the side opposite 58° is √(1 − k²)" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Nothing new here — cos 58° = k stands on a 1, so the side next to 58° is k, the hypotenuse is 1, and Pythagoras gives the opposite side as √(1 − k²). Draw it and label all three sides. What makes this card different is what comes next: instead of asking you to write a ratio in terms of k, it is going to hand you an expression in k and ask WHICH ratio it is. Same triangle, read backwards. So take extra care with the labelling here, because the picture is the dictionary the rest of the question gets translated with.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;√(1 − k²)&nbsp; as a single trigonometric ratio of 58°.",
      },
      hint: {
        en: "This one is asked backwards. Find √(1 − k²) on your sketch — which side is it? Then SOHCAHTOA names the ratio.",
      },
      memo: [
        { type: "step", text: { en: "Find the expression on the sketch: &nbsp;√(1 − k²) is the side <b>opposite</b> 58°, and the hypotenuse is 1." }, ticks: ["s/f"] },
        { type: "answer", text: { en: "O/H = √(1 − k²)/1 &nbsp;∴&nbsp; √(1 − k²) = sin 58°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Read the sketch the other way round. Instead of asking what sin 58° is, the question shows you √(1 − k²) and asks which ratio that is. Look at the triangle: √(1 − k²) is the side opposite 58°, and the hypotenuse is 1. Opposite over hypotenuse is sine, and dividing by 1 changes nothing, so √(1 − k²) is exactly sin 58°. Questions asked backwards feel harder than they are, and the cure is always the same — draw the picture first, then hunt for the expression on it. Once you can see which sides the expression is built from, SOHCAHTOA names the ratio for you.",
      },
    },
    {
      id: "c",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence write &nbsp;√(1 − k²)/k&nbsp; as a single trigonometric ratio of 58°.",
      },
      hint: {
        en: "Find both parts of the expression on your sketch, top and bottom. Opposite over adjacent has a name.",
      },
      memo: [
        { type: "step", text: { en: "On the sketch, √(1 − k²) is the side <b>opposite</b> 58°." }, ticks: ["s/f"] },
        { type: "step", text: { en: "and k is the side <b>next to</b> 58°, so the expression is opposite over adjacent." }, ticks: ["ca"] },
        { type: "answer", text: { en: "O/A &nbsp;∴&nbsp; √(1 − k²)/k = tan 58°" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Same trick as (b), one step further. √(1 − k²) is the side opposite 58° and k is the side next to it, so the expression is opposite over adjacent — which SOHCAHTOA calls tan. So the whole thing is tan 58°. It is worth pausing on why a question like this is asked at all: it is checking that you understand a trig ratio IS a ratio of sides, not a button on a calculator. Once the triangle is in front of you, an expression in k and a ratio of an angle are two ways of saying the same thing, and you can translate freely in either direction.",
      },
    },
  ],
};

export const gtrigSuperSpecialSumsSiblingQuestions = [q1, q2, q3, q4, q5, q6];
