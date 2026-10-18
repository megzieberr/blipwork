/* ============================================================
   EXAM FOCUS — General Trig · the NEW skill tile "special-angles"
   (SESSION F1 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F1-gtrig-part1.md.)
   ------------------------------------------------------------
   Six new cards. The tile did not exist before today: General Trig had
   no no-calculator special-angle drill at all in Exam Focus, even
   though every Grade 11 trig paper opens or closes with one.

   SOURCE OF THE MATHS: METHODS-trig.md Part C (p06, p25, p39–p43) —
   her definition ("special angles are the RATIO of the sides in
   specific right-angled triangles"), THE TWO TRIANGLES first (45–45
   with 1, 1, √2; 30–60 with 1, √3, 2), then the O · A · H table read
   with **Oats Are Healthy**, then SOHCAHTOA to pick which two letters
   you need. Her worked shapes on p39–p43 are the mould for q4 and q6:
   reduce → block-bracket any square → read the values off O-A-H → tidy.

   🚫 NO 9-VALUE GRID, ANYWHERE. She hates the sin30 = ½, sin45 = …
   grid and says so (METHODS-trig.md C3, a standing preference). Every
   memo here reads its values off the two triangles through O/A/H, and
   every esplain says which triangle it came from. If a future session
   is tempted to "just print the table", do not.

   HER OTHER TWO HABITS THAT LIVE IN THESE MEMOS:
     · special-angle values stay UNRATIONALISED — tan 30° = 1/√3 and
       sin 45° = 1/√2, never √3/3 or √2/2 (her Part 0.10). The one
       exception is q6, where rationalising IS the method: you cannot
       compare two numbers until they are written the same way, and
       that is exactly what makes the comparison calculator-free.
     · tan 45° is written 1/1 and tan 60° is written √3/1 — as
       FRACTIONS off the table, not as bare numbers (her p43 note).
       That is not fussiness: writing tan 60° as √3/1 is what makes
       "divide by a fraction" in q3 obvious.

   ARCHETYPES from the paper bank: survey/SURVEY-Topic-Banks.md §2
   ("special angles" sub-skill — 2024-Q2.4/2.5, 2025-Q2.2, 2025-Q5.3),
   and its ⭐ flag on 2024-Q2.2/2.3, the "disguised special angle"
   application where a right triangle's SIDES are given as trig
   expressions and the learner has to prove an area and an angle. q5 is
   that archetype, freshly composed. Nothing here is verbatim.

   NO DIAGRAM ON THIS TILE, INCLUDING q5. Drawing the two triangles is
   the learner's job — that is the entire skill being drilled (her C2),
   and a printed triangle would do the recall for them. q5's figure is
   carried in words instead: △PQR with Q̂ = 90° and both legs stated,
   which is everything a learner needs to draw it themselves.

   ⚠️ ANGLES ARE WRITTEN HER WAY — Q̂ AND R̂, NOT ∠Q AND ∠R — and that
   is a RENDERING decision as much as a house-style one. formulaHtml
   wraps every maths unit in a `.fml` span, and `.fml` is
   `display:inline-block` (css/styles.css), which is a break
   opportunity no amount of nbsp or word-joiner can close. So "tan ∠R =
   …" came out at 375 px as "tan ∠" at the end of one line and "R = " at
   the start of the next (seen on the shot sheet, F1 review 2026-08-23;
   writing the joiner as `&#8288;` was tried first and is worse —
   formulaHtml reads "8288;R" as a maths token and the entity prints
   literally). "tan R̂" has no symbol for the tokeniser to split on, so
   it lands inside ONE `.nowrap` span and can never break. Use the hat
   for any angle added here. A chapter that writes ∠ANGLE names inside
   formulas (euclid) has the same exposure — worth a look at its crops.

   LEVELS: q1 and q2 are level 1 (read the value, substitute), q3 and
   q4 level 2 (divide by a fraction; reduce before you can read), q5
   and q6 level 3 (the application, and the compare-without-a-
   calculator item). Nothing here is level 4 — the ★ questions live on
   the gtrig level-4 tile (session F2).
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
/* gt3 "Special angles & identities" — the round that teaches the two
   triangles, Oats Are Healthy and the masked identities. */
const LOST = { chapter: CH, quest: "gt3" };

/* ---------------------------------------------------------------
   q1 — READ A VALUE, SUBSTITUTE IT (her p06 eg.1–3, p39 eg.1–2).
     (a) sin 30° · cos 60° + tan 45° = (1/2)(1/2) + 1 = 5/4
     (b) tan 30° · sin 60° = (1/√3)(√3/2) = 1/2
   (b) is the one where the surds are put there to cancel.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.sa.q1",
  chapter: CH,
  topic: "special-angles",
  archetype: "special-angles-numeric-evaluate-product-and-sum",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;sin 30° · cos 60° + tan 45°", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Bepaal die waarde van &nbsp;sin 30° · cos 60° + tan 45°",
      },
      hint: {
        en: "Draw the two triangles in the margin before you write anything else — the 45–45 one and the 30–60 one. Then Oats Are Healthy gives you the rows, and SOHCAHTOA tells you which two letters to pick for each ratio.", af: "Teken die twee driehoeke in die kantlyn voordat jy enigiets anders skryf: die 45–45-driehoek en die 30–60-driehoek. Dan gee Oats Are Healthy jou die rye, en SOHCAHTOA sê vir jou watter twee letters jy vir elke verhouding kies.",
      },
      memo: [
        { type: "step", text: { en: "Draw the two triangles, then read each value off <b>Oats Are Healthy</b>: &nbsp;sin 30° = O/H = 1/2, &nbsp;cos 60° = A/H = 1/2, &nbsp;tan 45° = O/A = 1/1", af: "Teken die twee driehoeke, en lees dan elke waarde af met <b>Oats Are Healthy</b>: &nbsp;sin 30° = O/H = 1/2, &nbsp;cos 60° = A/H = 1/2, &nbsp;tan 45° = O/A = 1/1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (1/2)(1/2) + 1 &nbsp;=&nbsp; 1/4 + 1", af: "= (1/2)(1/2) + 1 &nbsp;=&nbsp; 1/4 + 1" } },
        { type: "answer", text: { en: "= 5/4", af: "= 5/4" }, ticks: ["a"] },
      ],
      esplain: {
        en: "There is no grid to memorise here, and she does not want you making one. Two triangles do the whole job. Draw the 45–45 one — bottom 1, upright 1, hypotenuse √2 — and the 30–60 one, with 60° at the bottom left, bottom 1, upright √3, hypotenuse 2. Then Oats Are Healthy gives you the rows: O on top, A in the middle, H at the bottom. SOHCAHTOA tells you which two letters to pick, and you read the value straight off. sin 30° is O over H, which is 1 over 2. cos 60° is A over H, also 1 over 2. tan 45° is O over A, which is 1 over 1. Multiply the first two, add the third, and you have five quarters, with no calculator anywhere near it.", af: "Hier is geen rooster om uit te leer nie, en sy wil nie hê jy moet een maak nie. Twee driehoeke doen die hele werk. Teken die 45–45-driehoek: basis 1, regop sy 1, skuinssy √2. Teken ook die 30–60-driehoek, met 60° links onder: basis 1, regop sy √3, skuinssy 2. Dan gee Oats Are Healthy jou die rye: O bo, A in die middel, H onder. SOHCAHTOA sê vir jou watter twee letters jy kies, en jy lees die waarde reguit af. sin 30° is O oor H, dus 1 oor 2. cos 60° is A oor H, ook 1 oor 2. tan 45° is O oor A, dus 1 oor 1. Vermenigvuldig die eerste twee, tel die derde by, en jy het vyf kwarte, sonder dat 'n sakrekenaar naby kom.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Determine the value of &nbsp;tan 30° · sin 60°", af: "Bepaal die waarde van &nbsp;tan 30° · sin 60°",
      },
      hint: {
        en: "Both of these come off the SAME triangle, the 30–60 one. Write each as a fraction from the table and look for something that cancels before you multiply anything out.", af: "Albei kom van DIESELFDE driehoek af, die 30–60-driehoek. Skryf elkeen as 'n breuk uit die tabel en soek iets wat kanselleer voordat jy enigiets uitvermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "Both values come off the 30–60 triangle: &nbsp;tan 30° = O/A = 1/√3 &nbsp;and&nbsp; sin 60° = O/H = √3/2", af: "Albei waardes kom van die 30–60-driehoek af: &nbsp;tan 30° = O/A = 1/√3 &nbsp;en&nbsp; sin 60° = O/H = √3/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (1/√3)(√3/2) = √3/(2√3) &nbsp;— the √3 on the top cancels the √3 underneath", af: "= (1/√3)(√3/2) = √3/(2√3) &nbsp;(die √3 bo kanselleer die √3 onder)" } },
        { type: "answer", text: { en: "= 1/2", af: "= 1/2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "tan 30° is O over A on the 30–60 triangle, which is 1 over √3, and she leaves it exactly like that — not tidied into √3 over 3. sin 60° is O over H on the same triangle, which is √3 over 2. Multiply them and the √3 on the top cancels the √3 underneath, leaving one half. That cancelling is the reason these questions are calculator-free: the surds are put there to disappear. If your answer still has a √ in it and the numbers looked friendly, go back and hunt for a cancel you missed. And notice both values came off the SAME triangle — once you have drawn it, it answers every 30° and 60° question on the page.", af: "tan 30° is O oor A op die 30–60-driehoek, dus 1 oor √3, en sy los dit presies so, nie netjies gemaak as √3 oor 3 nie. sin 60° is O oor H op dieselfde driehoek, dus √3 oor 2. Vermenigvuldig hulle en die √3 bo kanselleer die √3 onder, en 'n half bly oor. Daardie kansellering is die rede waarom hierdie vrae sonder 'n sakrekenaar is: die wortelvorme is daar gesit om te verdwyn. As jou antwoord nog 'n √ in het en die getalle het vriendelik gelyk, gaan terug en soek 'n kansellering wat jy gemis het. En let op dat albei waardes van DIESELFDE driehoek af gekom het: sodra jy dit geteken het, beantwoord dit elke 30°- en 60°-vraag op die bladsy.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — SQUARES, AND THE BLOCK BRACKETS (her p24, p43 eg.11).
     (a) sin²60° − cos²30° = [√3/2]² − [√3/2]² = 0   ← a co-function
         hiding in plain sight: 30° + 60° = 90°
     (b) 2tan²45° − cos²60° = 2[1]² − [1/2]² = 7/4
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.sa.q2",
  chapter: CH,
  topic: "special-angles",
  archetype: "special-angles-numeric-evaluate-squares",
  paper: PAPER,
  lostQuest: LOST,
  marks: 4,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;sin²60° − cos²30°", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Bepaal die waarde van &nbsp;sin²60° − cos²30°",
      },
      hint: {
        en: "Read the two values off the 30–60 triangle first, and check them against each other before you square anything. Do 60° and 30° add to 90°?", af: "Lees eers die twee waardes van die 30–60-driehoek af, en vergelyk hulle met mekaar voordat jy enigiets kwadreer. Tel 60° en 30° op tot 90°?",
      },
      memo: [
        { type: "step", text: { en: "Read both off the 30–60 triangle, and put each into <b>block brackets</b> before squaring: &nbsp;sin 60° = O/H = √3/2 &nbsp;and&nbsp; cos 30° = A/H = √3/2", af: "Lees albei van die 30–60-driehoek af, en sit elkeen in <b>blokhakies</b> voordat jy kwadreer: &nbsp;sin 60° = O/H = √3/2 &nbsp;en&nbsp; cos 30° = A/H = √3/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= [√3/2]² − [√3/2]² = 3/4 − 3/4", af: "= [√3/2]² − [√3/2]² = 3/4 − 3/4" } },
        { type: "answer", text: { en: "= 0", af: "= 0" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: 60° and 30° add to 90°, so sin 60° and cos 30° are the same number — a co-function hiding in plain sight. Spotting that first saves you the whole calculation.", af: "ONTHOU: 60° en 30° tel op tot 90°, dus is sin 60° en cos 30° dieselfde getal: 'n ko-funksie reg voor jou neus. As jy dit eerste raaksien, spaar dit jou die hele berekening.",
        } },
      ],
      esplain: {
        en: "Two values, and they turn out to be the same value. sin 60° is O over H on the 30–60 triangle, √3 over 2. cos 30° is A over H on that same triangle — and the side next to 30° is the side opposite 60°, so it is also √3 over 2. That is a co-function hiding in plain sight: 30° and 60° add to 90°, so the sine of one is the cosine of the other. Square two equal things and subtract, and you get zero. Before you reach for the values, always check whether the two angles in front of you add to 90°. If they do, the answer often collapses long before you have done any arithmetic at all.", af: "Twee waardes, en dit blyk dieselfde waarde te wees. sin 60° is O oor H op die 30–60-driehoek, √3 oor 2. cos 30° is A oor H op dieselfde driehoek, en die sy langs 30° is die sy teenoor 60°, dus is dit ook √3 oor 2. Dis 'n ko-funksie reg voor jou neus: 30° en 60° tel op tot 90°, dus is die sin van die een die cos van die ander. Kwadreer twee gelyke dinge en trek af, en jy kry nul. Voordat jy na die waardes gryp, kyk altyd of die twee hoeke voor jou optel tot 90°. As hulle dit doen, val die antwoord dikwels inmekaar lank voordat jy enige rekenwerk gedoen het.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 1,
      prompt: {
        en: "Determine the value of &nbsp;2tan²45° − cos²60°", af: "Bepaal die waarde van &nbsp;2tan²45° − cos²60°",
      },
      hint: {
        en: "Block brackets first: put the whole value inside [ ] before you square it, so the bottom of the fraction gets squared too. And the 2 in front multiplies the squared value, not the value before squaring.", af: "Blokhakies eerste: sit die hele waarde binne [ ] voordat jy dit kwadreer, sodat die noemer ook gekwadreer word. En die 2 voor vermenigvuldig die gekwadreerde waarde, nie die waarde voor die kwadrering nie.",
      },
      memo: [
        { type: "step", text: { en: "tan 45° = O/A = 1/1 = 1 &nbsp;and&nbsp; cos 60° = A/H = 1/2", af: "tan 45° = O/A = 1/1 = 1 &nbsp;en&nbsp; cos 60° = A/H = 1/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= 2[1]² − [1/2]² = 2 − 1/4", af: "= 2[1]² − [1/2]² = 2 − 1/4" } },
        { type: "answer", text: { en: "= 7/4", af: "= 7/4" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Anything you are about to square goes into block brackets first — her habit, and it saves marks all year. tan 45° is O over A on the 45–45 triangle, which is 1 over 1, so the bracket squared is 1, and twice that is 2. cos 60° is A over H on the 30–60 triangle, which is 1 over 2, so that bracket squared is 1 over 4. Take the second from the first and you have seven quarters. Two things usually go wrong here. One is squaring only the top of a fraction — the bottom gets squared as well. The other is the 2 out in front: it multiplies the value AFTER it has been squared, not before.", af: "Enigiets wat jy gaan kwadreer, gaan eers in blokhakies: haar gewoonte, en dit spaar die hele jaar punte. tan 45° is O oor A op die 45–45-driehoek, dus 1 oor 1, so die hakie gekwadreer is 1, en twee keer dit is 2. cos 60° is A oor H op die 30–60-driehoek, dus 1 oor 2, so daardie hakie gekwadreer is 1 oor 4. Trek die tweede van die eerste af en jy het sewe kwarte. Twee dinge gaan gewoonlik hier verkeerd. Een is om net die teller van 'n breuk te kwadreer: die noemer word ook gekwadreer. Die ander is die 2 voor: dit vermenigvuldig die waarde NADAT dit gekwadreer is, nie voor nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — DIVIDING TWO SPECIAL VALUES (her p43 note that tan 60° is
   written √3/1, which is what makes "flip and multiply" obvious).
     (a) tan 60°/sin 60° = (√3/1) ÷ (√3/2) = 2
     (b) cos 30°/tan 30° = (√3/2) ÷ (1/√3) = 3/2
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.sa.q3",
  chapter: CH,
  topic: "special-angles",
  archetype: "special-angles-numeric-divide-two-ratios",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;tan 60°/sin 60°", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Bepaal die waarde van &nbsp;tan 60°/sin 60°",
      },
      hint: {
        en: "Write both values as fractions from the table — she writes tan 60° as √3 over 1, not as a bare √3. Then dividing by a fraction means flipping it and multiplying.", af: "Skryf albei waardes as breuke uit die tabel: sy skryf tan 60° as √3 oor 1, nie as 'n kaal √3 nie. Om deur 'n breuk te deel, keer jy dit om en vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "Write both as fractions from the table: &nbsp;tan 60° = O/A = √3/1 &nbsp;and&nbsp; sin 60° = O/H = √3/2", af: "Skryf albei as breuke uit die tabel: &nbsp;tan 60° = O/A = √3/1 &nbsp;en&nbsp; sin 60° = O/H = √3/2" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Dividing by a fraction means flipping it and multiplying: &nbsp;√3/1 × 2/√3", af: "Om deur 'n breuk te deel, keer jy dit om en vermenigvuldig: &nbsp;√3/1 × 2/√3" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (√3 × 2)/(1 × √3) = 2", af: "= (√3 × 2)/(1 × √3) = 2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Dividing by a fraction is where these questions catch people, so write both values as fractions before you do anything else. She writes tan 60° as √3 over 1, not as a bare √3, and that is not fussiness — it is what makes the next step obvious. Now you have √3 over 1 divided by √3 over 2. Flip the second one and multiply: √3 over 1 times 2 over √3. The √3 on the top cancels the √3 underneath and 2 is left. Again the surds were put there to cancel. If you keep both values as O-A-H fractions and never turn them into decimals, the whole thing stays exact and your calculator stays in your bag.", af: "Deel deur 'n breuk is waar hierdie vrae mense vang, so skryf albei waardes as breuke voordat jy enigiets anders doen. Sy skryf tan 60° as √3 oor 1, nie as 'n kaal √3 nie, en dis nie puntenerigheid nie: dit maak die volgende stap duidelik. Nou het jy √3 oor 1 gedeel deur √3 oor 2. Keer die tweede een om en vermenigvuldig: √3 oor 1 maal 2 oor √3. Die √3 bo kanselleer die √3 onder en 2 bly oor. Weer is die wortelvorme daar gesit om te kanselleer. As jy albei waardes as O-A-H-breuke hou en hulle nooit in desimale verander nie, bly die hele ding presies en bly jou sakrekenaar in jou tas.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the value of &nbsp;cos 30°/tan 30°", af: "Bepaal die waarde van &nbsp;cos 30°/tan 30°",
      },
      hint: {
        en: "Flip and multiply, then remember what √3 × √3 comes to. It is not √9 left as it stands, and it is not 3√3.", af: "Keer om en vermenigvuldig, en onthou dan wat √3 × √3 is. Dit is nie √9 wat so bly staan nie, en dit is nie 3√3 nie.",
      },
      memo: [
        { type: "step", text: { en: "cos 30° = A/H = √3/2 &nbsp;and&nbsp; tan 30° = O/A = 1/√3 &nbsp;(left unrationalised, the way she writes it)", af: "cos 30° = A/H = √3/2 &nbsp;en&nbsp; tan 30° = O/A = 1/√3 &nbsp;(nie gerasionaliseer nie, soos sy dit skryf)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Flip and multiply: &nbsp;√3/2 × √3/1", af: "Keer om en vermenigvuldig: &nbsp;√3/2 × √3/1" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (√3 × √3)/2 = 3/2", af: "= (√3 × √3)/2 = 3/2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: √3 × √3 = 3. Not √9 left as it stands, and definitely not 3√3. A square root undoes a square, so multiplying a root by itself gives you the number back.", af: "PASOP: √3 × √3 = 3. Nie √9 wat so bly staan nie, en glad nie 3√3 nie. 'n Vierkantswortel maak 'n kwadraat ongedaan, dus gee 'n wortel maal homself die getal terug.",
        } },
      ],
      esplain: {
        en: "Same move as (a), with one more surd. cos 30° is A over H on the 30–60 triangle, √3 over 2, and tan 30° is O over A on that same triangle, 1 over √3 — left unrationalised, the way she writes it. Dividing means flipping the second fraction, so it becomes √3 over 2 times √3 over 1. Now √3 times √3 is 3, because a square root undoes a square, and the answer is 3 over 2. That step is worth saying out loud every time: √3 × √3 = 3. It is the single most common slip in a no-calculator trig question, and it costs the final mark rather than a method mark, which makes it an expensive one.", af: "Dieselfde stap as (a), met nog een wortelvorm. cos 30° is A oor H op die 30–60-driehoek, √3 oor 2, en tan 30° is O oor A op dieselfde driehoek, 1 oor √3, nie gerasionaliseer nie, soos sy dit skryf. Deel beteken jy keer die tweede breuk om, dus word dit √3 oor 2 maal √3 oor 1. Nou is √3 maal √3 gelyk aan 3, want 'n vierkantswortel maak 'n kwadraat ongedaan, en die antwoord is 3 oor 2. Daardie stap is elke keer die moeite werd om hardop te sê: √3 × √3 = 3. Dit is die algemeenste fout in 'n trig-vraag sonder sakrekenaar, en dit kos die finale punt eerder as 'n metodepunt, wat dit 'n duur een maak.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — REDUCE FIRST, THEN READ THE TRIANGLE (her p39–p43 shape, and
   the negative-angle wheel on p13).
     (a) cos 150° + sin 240° = −cos 30° − sin 60° = −√3
     (b) tan 225° · cos(−60°) = tan 45° · cos 60° = 1/2
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.sa.q4",
  chapter: CH,
  topic: "special-angles",
  archetype: "special-angles-reduce-first-then-read-the-triangle",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine the value of &nbsp;cos 150° + sin 240°", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Bepaal die waarde van &nbsp;cos 150° + sin 240°",
      },
      hint: {
        en: "Neither angle is on your triangles, so nothing can be read off yet. Write the split above each angle first, reduce to an acute angle, and only then go to Oats Are Healthy.", af: "Nie een van die hoeke is op jou driehoeke nie, so niks kan al afgelees word nie. Skryf eers die opsplitsing bo elke hoek, reduseer na 'n skerp hoek, en gaan dan eers na Oats Are Healthy.",
      },
      memo: [
        { type: "step", text: { en: "Neither angle is on the triangles, so reduce first. Write the split above each one: &nbsp;150° = 180° − 30° &nbsp;(<b>S</b>) &nbsp;and&nbsp; 240° = 180° + 60° &nbsp;(<b>T</b>).", af: "Nie een van die hoeke is op die driehoeke nie, so reduseer eers. Skryf die opsplitsing bo elkeen: &nbsp;150° = 180° − 30° &nbsp;(<b>S</b>) &nbsp;en&nbsp; 240° = 180° + 60° &nbsp;(<b>T</b>)." } },
        { type: "step", text: { en: "In S only sine is positive, so cosine turns negative; in T only tan is positive, so sine turns negative: &nbsp;cos 150° = −cos 30° &nbsp;and&nbsp; sin 240° = −sin 60°", af: "In S is net sin positief, dus word cos negatief; in T is net tan positief, dus word sin negatief: &nbsp;cos 150° = −cos 30° &nbsp;en&nbsp; sin 240° = −sin 60°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Now the 30–60 triangle can speak: &nbsp;cos 30° = A/H = √3/2 &nbsp;and&nbsp; sin 60° = O/H = √3/2", af: "Nou kan die 30–60-driehoek praat: &nbsp;cos 30° = A/H = √3/2 &nbsp;en&nbsp; sin 60° = O/H = √3/2" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= −√3/2 − √3/2 = −√3", af: "= −√3/2 − √3/2 = −√3" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Two jobs, in this order: reduce, then read. 150° is not on the special-angle triangles, so it has to come down to an acute angle first. Write the split above it — 180° − 30° — which lands in S, where only sine is positive, so cosine turns negative and you have −cos 30°. Do the same to 240°: the split is 180° + 60°, which lands in T, where only tan is positive, so sine turns negative and you have −sin 60°. NOW the triangle can speak. cos 30° is A over H, √3 over 2; sin 60° is O over H, also √3 over 2. Two negative halves of √3 add up to −√3. Reduce first, read second, never the other way round.", af: "Twee take, in hierdie volgorde: reduseer, dan lees. 150° is nie op die driehoeke van die spesiale hoeke nie, so dit moet eers na 'n skerp hoek toe kom. Skryf die opsplitsing daarbo, 180° − 30°, wat in S beland, waar net sin positief is, dus word cos negatief en jy het −cos 30°. Doen dieselfde met 240°: die opsplitsing is 180° + 60°, wat in T beland, waar net tan positief is, dus word sin negatief en jy het −sin 60°. NOU kan die driehoek praat. cos 30° is A oor H, √3 oor 2; sin 60° is O oor H, ook √3 oor 2. Twee negatiewe helftes van √3 tel op tot −√3. Reduseer eerste, lees tweede, nooit andersom nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Determine the value of &nbsp;tan 225° · cos(−60°)", af: "Bepaal die waarde van &nbsp;tan 225° · cos(−60°)",
      },
      hint: {
        en: "One angle is past 180° and one is negative. Both are ordinary wheel angles — check which quadrant each one lands in, and whether that ratio survives there.", af: "Een hoek is verby 180° en een is negatief. Albei is gewone hoeke op die wiel: kyk in watter kwadrant elkeen beland, en of daardie verhouding daar oorleef.",
      },
      memo: [
        { type: "step", text: { en: "225° = 180° + 45°, which lands in <b>T</b> where tan is positive: &nbsp;tan 225° = tan 45°", af: "225° = 180° + 45°, wat in <b>T</b> beland, waar tan positief is: &nbsp;tan 225° = tan 45°" }, ticks: ["s/f"] },
        { type: "step", text: { en: "−60° is a <b>C</b> angle on the wheel, where cosine is positive: &nbsp;cos(−60°) = cos 60°", af: "−60° is 'n <b>C</b>-hoek op die wiel, waar cos positief is: &nbsp;cos(−60°) = cos 60°" }, ticks: ["ca"] },
        { type: "step", text: { en: "Read both off the triangles: &nbsp;tan 45° = O/A = 1/1 &nbsp;and&nbsp; cos 60° = A/H = 1/2", af: "Lees albei van die driehoeke af: &nbsp;tan 45° = O/A = 1/1 &nbsp;en&nbsp; cos 60° = A/H = 1/2" } },
        { type: "answer", text: { en: "= 1 × 1/2 = 1/2", af: "= 1 × 1/2 = 1/2" }, ticks: ["a"] },
      ],
      esplain: {
        en: "A negative angle is not a problem, it is just a turn the other way. On her wheel, −θ is a C-quadrant form, and in C only cosine is positive — so cos(−60°) is simply cos 60°, with no sign change at all. 225° is 180° + 45°, which lands in T where tan is positive, so tan 225° is plain tan 45°. Now read both off the triangles: tan 45° is O over A, 1 over 1, and cos 60° is A over H, 1 over 2. Multiply and you get a half. The rule worth hanging on to is the one about turning: an angle below −90° gets 360° added to it first, but −60° is already inside the wheel, so it needs nothing done to it.", af: "'n Negatiewe hoek is nie 'n probleem nie, dis net 'n draai die ander kant toe. Op haar wiel is −θ 'n C-kwadrantvorm, en in C is net cos positief, so cos(−60°) is eenvoudig cos 60°, sonder enige tekenverandering. 225° is 180° + 45°, wat in T beland waar tan positief is, so tan 225° is gewoon tan 45°. Lees nou albei van die driehoeke af: tan 45° is O oor A, 1 oor 1, en cos 60° is A oor H, 1 oor 2. Vermenigvuldig en jy kry 'n half. Die reël om te onthou gaan oor draai: 'n hoek onder −90° kry eers 360° bygetel, maar −60° is reeds binne die wiel, so niks hoef daaraan gedoen te word nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — THE DISGUISED SPECIAL ANGLE (survey/SURVEY-Topic-Banks.md §2's
   ⭐ 2024-Q2.2/2.3 archetype, freshly composed).
   △PQR, Q̂ = 90°, PQ = 12 sin 60° = 6√3, QR = 12 cos 60° = 6.
     (a) area = ½ · 6 · 6√3 = 18√3   ← "show that"
     (b) PR² = 108 + 36 = 144, PR = 12
     (c) tan R̂ = 6√3/6 = √3, so R̂ = 60°
   The hidden structure — 6, 6√3, 12 is the 30–60–90 triangle scaled by
   6 — is deliberately NOT in the prompt and IS in (c)'s trap card.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.sa.q5",
  chapter: CH,
  topic: "special-angles",
  archetype: "right-triangle-with-sides-given-as-special-angle-expressions",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>In △PQR, &nbsp;Q̂ = 90°, &nbsp;PQ = 12 sin 60° units&nbsp; and&nbsp; QR = 12 cos 60° units.<br><br>Show that the area of △PQR = 18√3 square units.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>In △PQR is &nbsp;Q̂ = 90°, &nbsp;PQ = 12 sin 60° eenhede&nbsp; en&nbsp; QR = 12 cos 60° eenhede.<br><br>Toon aan dat die oppervlakte van △PQR = 18√3 vierkante eenhede.",
      },
      hint: {
        en: "Turn the two side lengths into ordinary numbers first — they are only special-angle values in disguise. Once you know PQ and QR, the area of a right-angled triangle is half the product of the two sides that make the right angle.", af: "Verander eers die twee sylengtes in gewone getalle: hulle is net waardes van spesiale hoeke in vermomming. Sodra jy PQ en QR ken, is die oppervlakte van 'n reghoekige driehoek die helfte van die produk van die twee sye wat die regte hoek vorm.",
      },
      memo: [
        { type: "step", text: { en: "Turn the sides into numbers first: &nbsp;sin 60° = O/H = √3/2, &nbsp;so&nbsp; PQ = 12 × √3/2 = 6√3", af: "Verander eers die sye in getalle: &nbsp;sin 60° = O/H = √3/2, &nbsp;dus&nbsp; PQ = 12 × √3/2 = 6√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos 60° = A/H = 1/2, &nbsp;so&nbsp; QR = 12 × 1/2 = 6", af: "cos 60° = A/H = 1/2, &nbsp;dus&nbsp; QR = 12 × 1/2 = 6" }, ticks: ["ca"] },
        { type: "step", text: { en: "Q̂ = 90°, so PQ and QR are the two sides that make the right angle: &nbsp;area = ½ · QR · PQ", af: "Q̂ = 90°, dus is PQ en QR die twee sye wat die regte hoek vorm: &nbsp;oppervlakte = ½ · QR · PQ" } },
        { type: "answer", text: { en: "= ½ · 6 · 6√3 = 18√3 square units", af: "= ½ · 6 · 6√3 = 18√3 vierkante eenhede" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: on a “show that” the answer is printed for you, so every mark sits in the working. Write down each special-angle value you used and never skip the substitution line — a bare 18√3 with nothing above it earns nothing.", af: "ONTHOU: by 'n “toon aan dat” is die antwoord vir jou gedruk, so elke punt lê in die bewerking. Skryf elke waarde van 'n spesiale hoek neer wat jy gebruik het en slaan nooit die lyn oor waar jy vervang nie: 'n kaal 18√3 met niks daarbo verdien niks.",
        } },
      ],
      esplain: {
        en: "The sides look frightening because they are written as trig expressions, but they are only numbers in disguise. sin 60° is √3 over 2, so PQ is 12 times √3 over 2, which is 6√3. cos 60° is a half, so QR is 12 times a half, which is 6. Now it is an ordinary right-angled triangle with the right angle at Q, and the area of a right-angled triangle is half the product of the two sides that make that right angle — no area rule needed, no perpendicular height to hunt for, because the two legs already are the base and the height. Half of 6 times 6√3 is 18√3. On a show-that question the answer is handed to you, so the marks are entirely in the lines that get you there.", af: "Die sye lyk skrikwekkend omdat hulle as trig-uitdrukkings geskryf is, maar hulle is net getalle in vermomming. sin 60° is √3 oor 2, dus is PQ 12 maal √3 oor 2, wat 6√3 is. cos 60° is 'n half, dus is QR 12 maal 'n half, wat 6 is. Nou is dit 'n gewone reghoekige driehoek met die regte hoek by Q, en die oppervlakte van 'n reghoekige driehoek is die helfte van die produk van die twee sye wat daardie regte hoek vorm: geen oppervlakreël nodig nie, geen loodregte hoogte om na te soek nie, want die twee sye langs die regte hoek is klaar die basis en die hoogte. Die helfte van 6 maal 6√3 is 18√3. By 'n toon-aan-dat-vraag word die antwoord vir jou gegee, so die punte lê heeltemal in die lyne wat jou daar uitbring.",
      },
    },
    {
      id: "b",
      marks: 2,
      level: 2,
      prompt: {
        en: "Determine the length of PR, leaving your answer in simplest form.", af: "Bepaal die lengte van PR, en laat jou antwoord in die eenvoudigste vorm.",
      },
      hint: {
        en: "PR sits opposite the right angle, so it is the hypotenuse. Watch the squaring — (6√3)² squares the 6 AND the √3.", af: "PR lê teenoor die regte hoek, dus is dit die skuinssy. Pas op met die kwadrering: (6√3)² kwadreer die 6 EN die √3.",
      },
      memo: [
        { type: "step", text: { en: "PR is opposite the right angle, so it is the hypotenuse: &nbsp;PR² = PQ² + QR² &nbsp;(pyth)", af: "PR is teenoor die regte hoek, dus is dit die skuinssy: &nbsp;PR² = PQ² + QR² &nbsp;(pyth)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "= (6√3)² + 6² = 36 × 3 + 36 = 108 + 36 = 144", af: "= (6√3)² + 6² = 36 × 3 + 36 = 108 + 36 = 144" } },
        { type: "answer", text: { en: "PR = √144 = 12 units", af: "PR = √144 = 12 eenhede" }, ticks: ["a"] },
      ],
      esplain: {
        en: "Pythagoras only needs the two sides you already have. PR is the hypotenuse because it sits opposite the right angle at Q, so PR² = PQ² + QR². Squaring 6√3 catches people: square the 6 and square the √3 separately, giving 36 times 3, which is 108. Add 36 and you get 144, and √144 is 12. A length is always positive, so there is no ± line to sort out here. It is worth noticing what has just happened — the three sides came out 6, 6√3 and 12, which is the 30–60–90 triangle from the O-A-H table with every side multiplied by 6. The question was that triangle in a costume all along.", af: "Pythagoras het net die twee sye nodig wat jy reeds het. PR is die skuinssy, want dit lê teenoor die regte hoek by Q, dus PR² = PQ² + QR². Om 6√3 te kwadreer vang mense: kwadreer die 6 en kwadreer die √3 apart, wat 36 maal 3 gee, en dit is 108. Tel 36 by en jy kry 144, en √144 is 12. 'n Lengte is altyd positief, so hier is geen ±-lyn om uit te sorteer nie. Dis die moeite werd om raak te sien wat pas gebeur het: die drie sye het uitgekom as 6, 6√3 en 12, en dit is die 30–60–90-driehoek uit die O-A-H-tabel met elke sy maal 6. Die vraag was heeltyd daardie driehoek in 'n kostuum.",
      },
    },
    {
      id: "c",
      marks: 2,
      level: 2,
      prompt: {
        en: "Hence determine the size of &nbsp;R̂.", af: "Bepaal vervolgens die grootte van &nbsp;R̂.",
      },
      hint: {
        en: "You now know all three sides, so pick whichever ratio is easiest and read the O-A-H table backwards — which angle gives that value?", af: "Jy ken nou al drie sye, so kies die maklikste verhouding en lees die O-A-H-tabel agteruit: watter hoek gee daardie waarde?",
      },
      memo: [
        { type: "step", text: { en: "Opposite R̂ is PQ = 6√3, and next to it is QR = 6: &nbsp;tan R̂ = opposite/adjacent = 6√3/6 = √3", af: "Teenoor R̂ is PQ = 6√3, en langsaan is QR = 6: &nbsp;tan R̂ = teenoorstaande/aangrensende = 6√3/6 = √3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "<b>OR</b>&nbsp; cos R̂ = adjacent/hypotenuse = 6/12 = 1/2 — the same answer, worth the same marks.", af: "<b>OF</b>&nbsp; cos R̂ = aangrensende/skuinssy = 6/12 = 1/2: dieselfde antwoord, dieselfde punte." } },
        { type: "answer", text: { en: "Reading the 30–60 triangle backwards, O/A = √3/1 at 60° &nbsp;∴&nbsp; R̂ = 60°", af: "As jy die 30–60-driehoek agteruit lees, is O/A = √3/1 by 60° &nbsp;∴&nbsp; R̂ = 60°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "REMEMBER: the three sides came out 6, 6√3 and 12 — the 30–60–90 triangle with every side multiplied by 6. Whenever a right triangle's sides are in the ratio 1 : √3 : 2, the angles are 30°, 60° and 90°, whatever the units.", af: "ONTHOU: die drie sye het uitgekom as 6, 6√3 en 12: die 30–60–90-driehoek met elke sy maal 6. Wanneer die sye van 'n reghoekige driehoek in die verhouding 1 : √3 : 2 is, is die hoeke 30°, 60° en 90°, ongeag die eenhede.",
        } },
      ],
      esplain: {
        en: "Once the three sides are known, any of the ratios finds the angle. Opposite R̂ is PQ = 6√3 and next to it is QR = 6, so tan R̂ is 6√3 over 6, which is √3. Now read the table backwards: which angle has O over A equal to √3 over 1? That is 60°, off the 30–60 triangle. You could equally use cos R̂ = 6 over 12 = a half, which is also 60°, and both roads are worth the same marks. This is what she means when she says the special angles are ratios of sides, not numbers to memorise. If the sides of a right triangle are in the ratio 1 : √3 : 2, the angles are 30°, 60° and 90°, no matter what the sides are measured in.", af: "Sodra die drie sye bekend is, vind enige van die verhoudings die hoek. Teenoor R̂ is PQ = 6√3 en langsaan is QR = 6, dus is tan R̂ gelyk aan 6√3 oor 6, wat √3 is. Lees nou die tabel agteruit: watter hoek het O oor A gelyk aan √3 oor 1? Dis 60°, van die 30–60-driehoek af. Jy kan net so goed cos R̂ = 6 oor 12 = 'n half gebruik, wat ook 60° is, en albei paaie is ewe veel punte werd. Dit is wat sy bedoel as sy sê die spesiale hoeke is verhoudings van sye, nie getalle om uit te leer nie. As die sye van 'n reghoekige driehoek in die verhouding 1 : √3 : 2 is, is die hoeke 30°, 60° en 90°, maak nie saak waarin die sye gemeet word nie.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — WHICH IS BIGGER, WITHOUT A CALCULATOR.
     (a) sin 60° = √3/2 against tan 30° = 1/√3 = √3/3 → sin 60° larger
     (b) cos 30° = √3/2, sin 45° = 1/√2 = √2/2, tan 45° = 1 = 2/2
         → √2 < √3 < √4, so sin 45° < cos 30° < tan 45°
   THE ONE PLACE ON THIS TILE WHERE RATIONALISING IS THE METHOD (see
   this file's header): you cannot compare two numbers until they are
   written the same way.
   --------------------------------------------------------------- */
const q6 = {
  id: "gtrig.sib.sa.q6",
  chapter: CH,
  topic: "special-angles",
  archetype: "special-angles-compare-without-a-calculator",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 3,
      prompt: {
        en: "<em>Answer this ENTIRE question WITHOUT using a calculator.</em><br>Determine which of &nbsp;sin 60°&nbsp; and &nbsp;tan 30°&nbsp; is the larger. Show all your working.", af: "<em>Beantwoord hierdie HELE vraag SONDER om 'n sakrekenaar te gebruik.</em><br>Bepaal watter een van &nbsp;sin 60°&nbsp; en &nbsp;tan 30°&nbsp; die grootste is. Toon al jou bewerkings.",
      },
      hint: {
        en: "You cannot compare them while one has a surd on top and the other has a surd underneath. Rationalise the one with the surd in the denominator, then see what the two suddenly have in common.", af: "Jy kan hulle nie vergelyk terwyl een 'n wortelvorm bo het en die ander 'n wortelvorm onder nie. Rasionaliseer die een met die wortelvorm in die noemer, en kyk dan wat die twee skielik gemeen het.",
      },
      memo: [
        { type: "step", text: { en: "Read both off the 30–60 triangle: &nbsp;sin 60° = O/H = √3/2 &nbsp;and&nbsp; tan 30° = O/A = 1/√3", af: "Lees albei van die 30–60-driehoek af: &nbsp;sin 60° = O/H = √3/2 &nbsp;en&nbsp; tan 30° = O/A = 1/√3" }, ticks: ["s/f"] },
        { type: "step", text: { en: "They cannot be compared yet, so rationalise the second one: &nbsp;1/√3 = (1 × √3)/(√3 × √3) = √3/3", af: "Hulle kan nog nie vergelyk word nie, so rasionaliseer die tweede een: &nbsp;1/√3 = (1 × √3)/(√3 × √3) = √3/3" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now both have √3 on top. Cutting something into 2 pieces gives bigger pieces than cutting it into 3, so &nbsp;√3/2 is bigger than √3/3.", af: "Nou het albei √3 bo. As jy iets in 2 stukke sny, kry jy groter stukke as wanneer jy dit in 3 sny, dus is &nbsp;√3/2 groter as √3/3." } },
        { type: "answer", text: { en: "sin 60° is the larger of the two.", af: "sin 60° is die grootste van die twee." }, ticks: ["a"] },
      ],
      esplain: {
        en: "You cannot compare two things until they look alike, and that is the whole method here. sin 60° comes off the 30–60 triangle as √3 over 2. tan 30° comes off the same triangle as 1 over √3, and she normally leaves special-angle values unrationalised — but here rationalising is the point, because it is what makes the two comparable. Multiply top and bottom by √3 and 1 over √3 becomes √3 over 3. Now both numbers have the same top: √3 over 2 against √3 over 3. Cutting something into 2 pieces gives bigger pieces than cutting it into 3, so √3 over 2 wins. sin 60° is larger, and not a single decimal was needed.", af: "Jy kan nie twee dinge vergelyk voordat hulle eenders lyk nie, en dit is hier die hele metode. sin 60° kom van die 30–60-driehoek af as √3 oor 2. tan 30° kom van dieselfde driehoek af as 1 oor √3, en sy laat waardes van spesiale hoeke gewoonlik ongerasionaliseer, maar hier is rasionalisering juis die doel, want dit maak die twee vergelykbaar. Vermenigvuldig bo en onder met √3 en 1 oor √3 word √3 oor 3. Nou het albei getalle dieselfde teller: √3 oor 2 teen √3 oor 3. As jy iets in 2 stukke sny, kry jy groter stukke as wanneer jy dit in 3 sny, dus wen √3 oor 2. sin 60° is groter, en nie 'n enkele desimaal was nodig nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Write &nbsp;cos 30°, &nbsp;sin 45°&nbsp; and &nbsp;tan 45°&nbsp; in ascending order. Show all your working.", af: "Skryf &nbsp;cos 30°, &nbsp;sin 45°&nbsp; en &nbsp;tan 45°&nbsp; in stygende volgorde. Toon al jou bewerkings.",
      },
      hint: {
        en: "Write all three over the same bottom number. Then you only have to compare the tops — and remember that 1 can be written as 2 over 2.", af: "Skryf al drie oor dieselfde noemer. Dan hoef jy net die tellers te vergelyk, en onthou dat 1 as 2 oor 2 geskryf kan word.",
      },
      memo: [
        { type: "step", text: { en: "Read all three off the triangles: &nbsp;cos 30° = A/H = √3/2, &nbsp;sin 45° = O/H = 1/√2, &nbsp;tan 45° = O/A = 1/1 = 1", af: "Lees al drie van die driehoeke af: &nbsp;cos 30° = A/H = √3/2, &nbsp;sin 45° = O/H = 1/√2, &nbsp;tan 45° = O/A = 1/1 = 1" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Write every one of them over 2: &nbsp;cos 30° = √3/2, &nbsp;sin 45° = √2/2, &nbsp;tan 45° = 2/2", af: "Skryf elkeen oor 2: &nbsp;cos 30° = √3/2, &nbsp;sin 45° = √2/2, &nbsp;tan 45° = 2/2" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now only the tops matter. Since 2 is the same as √4 you are really comparing √2 with √3 with √4 — and a bigger number inside a square root always gives a bigger root.", af: "Nou tel net die tellers. Omdat 2 dieselfde as √4 is, vergelyk jy eintlik √2 met √3 met √4, en 'n groter getal binne 'n vierkantswortel gee altyd 'n groter wortel." } },
        { type: "answer", text: { en: "sin 45° &lt; cos 30° &lt; tan 45°", af: "sin 45° &lt; cos 30° &lt; tan 45°" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: ascending order means SMALLEST first. Writing the three correct values in the wrong direction loses the answer mark even though every value was right.", af: "PASOP: stygende volgorde beteken KLEINSTE eerste. As jy die drie korrekte waardes in die verkeerde rigting skryf, verloor jy die antwoordpunt, al was elke waarde reg.",
        } },
      ],
      esplain: {
        en: "Same trick as (a), three numbers instead of two. Write every value with the same bottom and the comparison does itself. cos 30° is √3 over 2 already. sin 45° is 1 over √2, and rationalising turns it into √2 over 2. tan 45° is 1, which is 2 over 2. So you are comparing √2, √3 and 2, each sitting on top of a 2. Since 2 is the same as √4, the three tops are √2, √3 and √4, and square roots keep their order — the bigger the number inside, the bigger the root. So sin 45° is the smallest, then cos 30°, then tan 45°. Ascending order means smallest first, so that is the order to write them in.", af: "Dieselfde truuk as (a), drie getalle in plaas van twee. Skryf elke waarde oor dieselfde noemer, dan vergelyk jy maklik. cos 30° is reeds √3 oor 2. sin 45° is 1 oor √2, en rasionalisering maak dit √2 oor 2. tan 45° is 1, wat 2 oor 2 is. Jy vergelyk dus √2, √3 en 2, almal oor dieselfde noemer. Omdat 2 dieselfde as √4 is, is die drie tellers √2, √3 en √4, en vierkantswortels hou hul volgorde: hoe groter die getal binne, hoe groter die wortel. Dus is sin 45° die kleinste, dan cos 30°, dan tan 45°. Stygende volgorde beteken kleinste eerste, so dis die volgorde waarin jy hulle skryf.",
      },
    },
  ],
};

export const gtrigSpecialAnglesSiblingQuestions = [q1, q2, q3, q4, q5, q6];
