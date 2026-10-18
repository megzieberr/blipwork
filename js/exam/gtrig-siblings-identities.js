/* ============================================================
   EXAM FOCUS — General Trig · SIBLING CARDS for the skill "identities"
   (SESSION F2 of the Exam Focus build day, 2026-08-23 —
   EXAM-BUILD-DAY.md's tile map, sessions/F2-gtrig-part2.md.)
   ------------------------------------------------------------
   Six new cards, taking this tile from ZERO to six. Until now the tile
   rendered muted and untappable: "Identities: prove" is on every single
   Grade 11 P2 in the bank, and Exam Focus had not one of them.

   SOURCE OF THE MATHS: METHODS-trig.md Part I (p32-p35) — her heading
   "IDENTITIES — prove that ↳ Show that LHS = RHS", her pro-tip "when in
   doubt, go LEFT", and her FOUR MOVES, which are the only four moves
   any of these six needs:
     · the masked identities — sin²θ + cos²θ = 1, and its two masks
       1 − cos²θ = sin²θ and 1 − sin²θ = cos²θ;
     · tan θ = sin θ/cos θ, whenever a tan is standing in the way;
     · fractions ⟹ find the LCD (she writes the multiplier under each
       fraction);
     · factorise — common factor, or a difference of two squares.
   SHE WORKS ONE SIDE ONLY, top to bottom, and lands on "= RHS". She
   never squeezes both sides toward the middle, and she never
   cross-multiplies — which is the trap card that rides with every one
   of these cards, because cross-multiplying is exactly what a learner
   reaches for when the LCD looks frightening.

   ARCHETYPES from the paper bank (survey/SURVEY-Topic-Banks.md §2 and
   survey/SURVEY-Her-2025-Assessments.md): 2024-Q3's escalating set of
   seven proofs, 2025-Q2.3 and 2025-Q5.4, 2026-Q5.3's conjugate proof,
   SURVEY-Nov-P2.md Q4(d), her own Test 3 Q2, Test 5 Q5 (the
   prove-then-evaluate pair) and Test 7 Q1's two-fraction proof. Every
   expression here is freshly composed on those moulds.

   WHAT THE SIX COVER, and why these six:
     q1  the two smallest proofs in the syllabus — one masked identity,
         one tan turned into sin over cos. A tile has to OPEN on
         something a frightened learner can finish.
     q2  a difference of two squares on top, then the "+ cos x" one
         where the LCD is a single term
     q3  a full LCD proof, then the CONJUGATE route: multiply top and
         bottom by 1 + cos x and watch the difference of squares appear
     q4  two fractions added, expanded, masked, factorised and cancelled
         — all four of her moves inside one proof
     q5  the two-fraction subtraction whose answer has to be REBUILT
         into a tan at the end (her Test 7 shape)
     q6  prove it, then USE it: the same expression evaluated at
         θ = 300° with no calculator, which is only quick if you use the
         proved right-hand side instead of the question's left-hand one

   NO DIAGRAM ANYWHERE ON THIS TILE. An identity proof never carries a
   figure on a real paper, and nothing here needs one to be answerable.

   LEVELS: q1 level 1, q2/q3 level 2, q4/q5/q6 level 3. Nothing here is
   level 4 — the ★ questions live on the gtrig level-4 tile (her ruling
   5, EXAM-BUILD-DAY.md), including the nine-mark "given LHS = m, prove
   …" monster this tile deliberately does NOT carry.

   lostQuest: gt9, "Identities: the next step" — the round that drills
   exactly this decision, spot the move: LCD, masked identity, or
   factorise.
   ============================================================ */

const PAPER = "siblings";
const CH = "gtrig";
const LOST = { chapter: CH, quest: "gt9" };

/* The trap that belongs on every identity proof, worded three ways so a
   learner who works the whole tile does not read the same sentence six
   times. Cross-multiplying assumes the very thing you were asked to
   prove — it is the one move that can turn a correct proof into zero. */
const TRAP_ONE_SIDE = {
  en: "REMEMBER: never cross-multiply an identity. Cross-multiplying assumes the two sides are already equal, which is the exact thing you were asked to prove. Work ONE side, top to bottom, and land on the other — and when in doubt, go LEFT.", af: "ONTHOU: moet nooit 'n identiteit kruisvermenigvuldig nie. Kruisvermenigvuldiging neem aan dat die twee kante reeds gelyk is, en dit is presies wat jy moet bewys. Werk met EEN kant, van bo na onder, en beland by die ander een; en as jy twyfel, begin LINKS.",
};

/* ---------------------------------------------------------------
   q1 — THE TWO SMALLEST PROOFS. One masked identity, one tan.
   --------------------------------------------------------------- */
const q1 = {
  id: "gtrig.sib.id.q1",
  chapter: CH,
  topic: "identities",
  archetype: "identity-single-move-masked-identity-and-tan-substitution",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 2,
      level: 1,
      prompt: {
        en: "Prove that &nbsp;(1 − cos²θ)/sin θ = sin θ", af: "Bewys dat &nbsp;(1 − cos²θ)/sin θ = sin θ",
      },
      hint: {
        en: "Start on the left and only on the left. There is a 1 sitting next to a squared ratio on the top — that is one of the masked identities standing right in front of you.", af: "Begin links en net links. Bo staan 'n 1 langs 'n verhouding in die kwadraat: dit is een van die gemaskerde identiteite, reg voor jou.",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 − cos²θ)/sin θ", af: "LKS = (1 − cos²θ)/sin θ" } },
        { type: "step", text: { en: "1 − cos²θ = sin²θ &nbsp;(masked identity)", af: "1 − cos²θ = sin²θ &nbsp;(gemaskerde identiteit)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "LHS = sin²θ/sin θ = sin θ = RHS", af: "LKS = sin²θ/sin θ = sin θ = RKS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Every identity proof in Grade 11 runs on the same four moves, and this one only needs one of them: a masked identity. sin²θ + cos²θ = 1 is the parent, and it has two children that look different but say the same thing — 1 − cos²θ is sin²θ, and 1 − sin²θ is cos²θ. So the moment you see a 1 sitting next to a squared ratio, one of those three is in front of you. Swap 1 − cos²θ for sin²θ and the top becomes sin²θ over sin θ, which cancels down to a single sin θ. That is the right-hand side, so you write = RHS and stop. Two things to keep: work only the left side, and finish with the words = RHS. The marker wants to see you arrived, not that you met in the middle.", af: "Elke bewys van 'n identiteit in Graad 11 loop op dieselfde vier stappe, en hierdie een het net een daarvan nodig: 'n gemaskerde identiteit. sin²θ + cos²θ = 1 is die ouer, en dit het twee kinders wat anders lyk maar dieselfde sê: 1 − cos²θ is sin²θ, en 1 − sin²θ is cos²θ. Sodra jy dus 'n 1 langs 'n verhouding in die kwadraat sien, staan een van daardie drie voor jou. Ruil 1 − cos²θ vir sin²θ, en jy kry sin²θ oor sin θ, wat kanselleer tot 'n enkele sin θ. Dit is die regterkant, dus skryf jy = RKS en stop. Twee dinge om te onthou: werk net met die linkerkant, en eindig met die woorde = RKS. Die nasiener wil sien dat jy aangekom het, nie dat jy die twee kante in die middel laat ontmoet het nie.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Prove that &nbsp;cos²θ · tan²θ = 1 − cos²θ", af: "Bewys dat &nbsp;cos²θ · tan²θ = 1 − cos²θ",
      },
      hint: {
        en: "A tan standing in the middle of an identity has one job: turn into sin over cos. Do that first and see what cancels.", af: "In 'n identiteit het 'n tan in die middel net een taak: om sin oor cos te word. Doen dit eerste en kyk wat kanselleer.",
      },
      memo: [
        { type: "step", text: { en: "LHS = cos²θ · tan²θ", af: "LKS = cos²θ · tan²θ" } },
        { type: "step", text: { en: "tan θ = sin θ/cos θ, so &nbsp;tan²θ = sin²θ/cos²θ", af: "tan θ = sin θ/cos θ, dus &nbsp;tan²θ = sin²θ/cos²θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LHS = cos²θ · sin²θ/cos²θ = sin²θ", af: "LKS = cos²θ · sin²θ/cos²θ = sin²θ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²θ = 1 − cos²θ = RHS &nbsp;(masked identity)", af: "sin²θ = 1 − cos²θ = RKS &nbsp;(gemaskerde identiteit)" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Two of her four moves, in the order she teaches them. First: a tan inside an identity almost never stays a tan. Rewrite it as sin over cos, and because the whole thing is squared, tan²θ becomes sin²θ over cos²θ. Now the cos²θ that was standing outside cancels the cos²θ underneath, and you are left with sin²θ. Second move: the right-hand side is 1 − cos²θ, which is one of the masked identities and is exactly sin²θ. So write that line, finish with = RHS, and stop. Notice you never touched the right-hand side — you only recognised it. That is what makes the proof honest: you started with the left, changed nothing but its appearance, and arrived where the question said you would.", af: "Twee van haar vier stappe, in die volgorde waarin sy dit leer. Eerstens: 'n tan in 'n identiteit bly amper nooit 'n tan nie. Herskryf dit as sin oor cos, en omdat die hele ding in die kwadraat is, word tan²θ sin²θ oor cos²θ. Nou kanselleer die cos²θ wat buite gestaan het die cos²θ onder, en sin²θ bly oor. Tweede stap: die regterkant is 1 − cos²θ, wat een van die gemaskerde identiteite is en presies sin²θ is. Skryf dus daardie reël, eindig met = RKS, en stop. Let op dat jy nooit aan die regterkant geraak het nie: jy het dit net herken. Dit maak die bewys eerlik: jy het met die linkerkant begin, niks behalwe sy voorkoms verander nie, en aangekom waar die vraag gesê het jy sou.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q2 — DIFFERENCE OF TWO SQUARES, then an LCD with a single term.
   --------------------------------------------------------------- */
const q2 = {
  id: "gtrig.sib.id.q2",
  chapter: CH,
  topic: "identities",
  archetype: "identity-difference-of-squares-then-single-term-lcd",
  paper: PAPER,
  lostQuest: LOST,
  marks: 6,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 1,
      prompt: {
        en: "Prove that &nbsp;(1 − sin²θ)/(1 − sin θ) = 1 + sin θ", af: "Bewys dat &nbsp;(1 − sin²θ)/(1 − sin θ) = 1 + sin θ",
      },
      hint: {
        en: "Do not reach for cos²θ this time. Look at the top as an ordinary algebra expression: something squared subtracted from something squared. What does that always factorise into?", af: "Moenie hierdie keer na cos²θ gryp nie. Kyk na die teller as 'n gewone algebraïese uitdrukking: iets in die kwadraat minus iets anders in die kwadraat. Waarin faktoriseer dit altyd?",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 − sin²θ)/(1 − sin θ)", af: "LKS = (1 − sin²θ)/(1 − sin θ)" } },
        { type: "step", text: { en: "The top is a difference of two squares: &nbsp;1 − sin²θ = (1 − sin θ)(1 + sin θ)", af: "Die teller is 'n verskil van twee vierkante: &nbsp;1 − sin²θ = (1 − sin θ)(1 + sin θ)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LHS = ((1 − sin θ)(1 + sin θ))/(1 − sin θ)", af: "LKS = ((1 − sin θ)(1 + sin θ))/(1 − sin θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1 + sin θ = RHS", af: "= 1 + sin θ = RKS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 1 − sin²θ is also cos²θ, and that is a perfectly correct first line — but cos²θ over 1 − sin θ does not cancel, so it takes you nowhere. The factorised form is the one that moves.", af: "PASOP: 1 − sin²θ is ook cos²θ, en dit is 'n heeltemal korrekte eerste reël, maar cos²θ oor 1 − sin θ kanselleer nie, dus bring dit jou nêrens nie. Die gefaktoriseerde vorm is die een wat beweeg.",
        } },
      ],
      esplain: {
        en: "This one is a trig question wearing an algebra coat. The top, 1 − sin²θ, is a difference of two squares — 1 squared take away (sin θ) squared — and a difference of two squares always splits into two brackets: one with a minus, one with a plus. So it becomes (1 − sin θ)(1 + sin θ). Now look underneath: 1 − sin θ, which is one of the two brackets you just made. Cancel it, and 1 + sin θ is all that is left, which is the right-hand side. The interesting part is what you did NOT do. 1 − sin²θ is also cos²θ, and writing that is not wrong — it just does not help, because cos²θ over 1 − sin θ has nothing to cancel. Choosing between two correct first lines by asking which one moves is most of what makes identity proofs feel easy later on.", af: "Hierdie een is 'n trigvraag met 'n algebrajas aan. Die teller, 1 − sin²θ, is 'n verskil van twee vierkante, 1 in die kwadraat minus (sin θ) in die kwadraat, en 'n verskil van twee vierkante verdeel altyd in twee hakies: een met 'n minus, een met 'n plus. Dit word dus (1 − sin θ)(1 + sin θ). Kyk nou onder: 1 − sin θ, wat een van die twee hakies is wat jy pas gemaak het. Kanselleer dit, en net 1 + sin θ bly oor, wat die regterkant is. Die interessante deel is wat jy NIE gedoen het nie. 1 − sin²θ is ook cos²θ, en om dit te skryf is nie verkeerd nie; dit help net nie, want cos²θ oor 1 − sin θ het niks om te kanselleer nie. Om tussen twee korrekte eerste reëls te kies deur te vra watter een beweeg, is die grootste deel van wat bewyse van identiteite later maklik laat voel.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Prove that &nbsp;sin x · tan x + cos x = 1/cos x", af: "Bewys dat &nbsp;sin x · tan x + cos x = 1/cos x",
      },
      hint: {
        en: "Turn the tan into sin over cos first. That leaves you adding a fraction to something that is not a fraction — so give the second term a denominator and find the LCD.", af: "Skryf eers die tan as sin oor cos. Dan moet jy 'n breuk optel by iets wat nie 'n breuk is nie: gee dus die tweede term 'n noemer en kry die KGV.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin x · tan x + cos x", af: "LKS = sin x · tan x + cos x" } },
        { type: "step", text: { en: "tan x = sin x/cos x, so &nbsp;LHS = sin²x/cos x + cos x", af: "tan x = sin x/cos x, dus &nbsp;LKS = sin²x/cos x + cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The LCD is cos x: &nbsp;LHS = (sin²x + cos²x)/cos x", af: "Die KGV is cos x: &nbsp;LKS = (sin²x + cos²x)/cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1/cos x = RHS &nbsp;(masked identity)", af: "= 1/cos x = RKS &nbsp;(gemaskerde identiteit)" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Three of her four moves, one after the other. Move one: the tan has to go, so write it as sin over cos. Multiplying that by the sin x in front gives sin²x over cos x. Move two: now you are adding a fraction to a lone cos x, and you cannot add those until they share a denominator. The lone term gets a denominator of 1, and the LCD of cos x and 1 is just cos x — so cos x multiplied by cos x gives cos²x on top. Everything is now over the same bottom. Move three: the top reads sin²x + cos²x, and that is the most useful 1 in the whole syllabus. Replace it and you are left with 1 over cos x, which is exactly the right-hand side. The order matters — deal with the tan, then the LCD, then look for the mask.", af: "Drie van haar vier stappe, een na die ander. Stap een: die tan moet weg, skryf dit dus as sin oor cos. Maal dit met die sin x voor, en jy kry sin²x oor cos x. Stap twee: nou tel jy 'n breuk by 'n alleenstaande cos x op, en jy kan hulle nie optel voordat hulle dieselfde noemer het nie. Die alleenstaande term kry 'n noemer van 1, en die KGV van cos x en 1 is net cos x, dus gee cos x maal cos x bo cos²x. Alles staan nou oor dieselfde noemer. Stap drie: bo staan sin²x + cos²x, en dit is die nuttigste 1 in die hele sillabus. Vervang dit, en 1 oor cos x bly oor, presies die regterkant. Die volgorde is belangrik: eers die tan, dan die KGV, dan soek jy die masker.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q3 — A FULL LCD PROOF, then THE CONJUGATE ROUTE (her Test 3 Q3 and
   2026-Q5.3 mould). Multiplying top and bottom by 1 + cos x is the move
   that makes the difference of squares appear out of nowhere.
   --------------------------------------------------------------- */
const q3 = {
  id: "gtrig.sib.id.q3",
  chapter: CH,
  topic: "identities",
  archetype: "identity-lcd-then-conjugate-multiplication",
  paper: PAPER,
  lostQuest: LOST,
  marks: 7,
  parts: [
    {
      id: "a",
      marks: 3,
      level: 2,
      prompt: {
        en: "Prove that &nbsp;(1 + tan²x) · cos²x = 1", af: "Bewys dat &nbsp;(1 + tan²x) · cos²x = 1",
      },
      hint: {
        en: "The tan goes first, as always. Then you are adding 1 to a fraction inside a bracket — give the 1 a denominator so the bracket becomes one single fraction before you multiply.", af: "Eers die tan, soos altyd. Dan tel jy 1 by 'n breuk binne 'n hakie op: gee die 1 'n noemer sodat die hakie een enkele breuk word voordat jy vermenigvuldig.",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 + tan²x) · cos²x", af: "LKS = (1 + tan²x) · cos²x" } },
        { type: "step", text: { en: "tan²x = sin²x/cos²x, so the bracket becomes &nbsp;(cos²x + sin²x)/cos²x", af: "tan²x = sin²x/cos²x, dus word die hakie &nbsp;(cos²x + sin²x)/cos²x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos²x + sin²x = 1, so the bracket is &nbsp;1/cos²x", af: "cos²x + sin²x = 1, dus is die hakie &nbsp;1/cos²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = 1/cos²x · cos²x = 1 = RHS", af: "LKS = 1/cos²x · cos²x = 1 = RKS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "The bracket is where all the work is. Rewrite tan²x as sin²x over cos²x, then remember that the 1 sitting next to it is really 1 over 1 — give it the denominator cos²x so the two terms can be added. The top becomes cos²x + sin²x, which is the masked identity, so the whole bracket collapses to 1 over cos²x. Now the cos²x that was waiting outside cancels it and the answer is 1. There is a shortcut hiding in this result worth knowing: 1 + tan²x is always 1 over cos²x. You are not expected to quote it, but if you notice it in a bigger question it saves you two lines. Either way the honest route is the one above — tan into sin over cos, give the 1 a denominator, spot the mask.", af: "Al die werk is in die hakie. Herskryf tan²x as sin²x oor cos²x, en onthou dan dat die 1 langsaan eintlik 1 oor 1 is: gee dit die noemer cos²x sodat die twee terme opgetel kan word. Bo kry jy cos²x + sin²x, wat die gemaskerde identiteit is, dus krimp die hele hakie tot 1 oor cos²x. Nou kanselleer die cos²x wat buite gewag het dit, en die antwoord is 1. Daar skuil 'n kortpad in hierdie resultaat wat die moeite werd is om te ken: 1 + tan²x is altyd 1 oor cos²x. Daar word nie verwag dat jy dit aanhaal nie, maar as jy dit in 'n groter vraag raaksien, spaar dit jou twee reëls. Hoe ook al, die eerlike roete is die een hierbo: tan word sin oor cos, gee die 1 'n noemer, herken die masker.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Prove that &nbsp;sin x/(1 − cos x) = (1 + cos x)/sin x", af: "Bewys dat &nbsp;sin x/(1 − cos x) = (1 + cos x)/sin x",
      },
      hint: {
        en: "There is nothing to add and nothing to factorise yet, so make something appear. Multiply the top AND the bottom by the conjugate of the denominator — the same bracket with the sign flipped. That is not cheating: multiplying by 1 never changes anything.", af: "Daar is nog niks om op te tel en niks om te faktoriseer nie, laat dus iets verskyn. Vermenigvuldig bo EN onder met die toegevoegde van die noemer: dieselfde hakie met die teken omgedraai. Dit is nie kullery nie: om met 1 te vermenigvuldig, verander nooit iets nie.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin x/(1 − cos x)", af: "LKS = sin x/(1 − cos x)" } },
        { type: "step", text: { en: "Multiply top and bottom by the conjugate of the denominator, 1 + cos x:", af: "Vermenigvuldig bo en onder met die toegevoegde van die noemer, 1 + cos x:" } },
        { type: "step", text: { en: "LHS = (sin x(1 + cos x))/((1 − cos x)(1 + cos x))", af: "LKS = (sin x(1 + cos x))/((1 − cos x)(1 + cos x))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The bottom is a difference of two squares: &nbsp;(1 − cos x)(1 + cos x) = 1 − cos²x", af: "Die noemer is 'n verskil van twee vierkante: &nbsp;(1 − cos x)(1 + cos x) = 1 − cos²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²x = sin²x, so &nbsp;LHS = (sin x(1 + cos x))/sin²x", af: "1 − cos²x = sin²x, dus &nbsp;LKS = (sin x(1 + cos x))/sin²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (1 + cos x)/sin x = RHS", af: "= (1 + cos x)/sin x = RKS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: it is very tempting to cross-multiply here, because the identity is one fraction equal to another. Don't. Cross-multiplying assumes the answer. Multiplying the LEFT side, top and bottom, by the same bracket is a different thing entirely — that is multiplying by 1.", af: "PASOP: dit is baie aanloklik om hier te kruisvermenigvuldig, want die identiteit is een breuk gelyk aan 'n ander. Moenie. Kruisvermenigvuldiging neem die antwoord aan. Om die LINKERKANT, bo en onder, met dieselfde hakie te vermenigvuldig, is iets heeltemal anders: dit is vermenigvuldiging met 1.",
        } },
      ],
      esplain: {
        en: "This shape has one fraction on each side, so cross-multiplying screams at you — and it is exactly the move that loses the marks, because it assumes the two sides are equal before you have proved anything. The legal version is to multiply the left side, top and bottom, by the same bracket. That is multiplying by 1, and 1 never changes a value, only its appearance. Choose the conjugate of the denominator: 1 − cos x becomes 1 + cos x. Multiply them and you get a difference of two squares, 1 − cos²x, which is instantly sin²x. Now the top has a sin x in it and the bottom is sin²x, so one sin x cancels and you land on 1 + cos x over sin x, which is the right-hand side. The conjugate trick is worth memorising as a shape — whenever a 1 − cos or a 1 + sin is stuck in a denominator, that is your move.", af: "Hierdie vorm het een breuk aan elke kant, dus skree kruisvermenigvuldiging na jou, en dit is presies die stap wat die punte kos, want dit neem aan dat die twee kante gelyk is voordat jy enigiets bewys het. Die wettige weergawe is om die linkerkant, bo en onder, met dieselfde hakie te vermenigvuldig. Dit is vermenigvuldiging met 1, en 1 verander nooit 'n waarde nie, net sy voorkoms. Kies die toegevoegde van die noemer: 1 − cos x word 1 + cos x. Vermenigvuldig hulle, en jy kry 'n verskil van twee vierkante, 1 − cos²x, wat dadelik sin²x is. Nou is daar 'n sin x bo en sin²x onder, dus kanselleer een sin x en jy beland by 1 + cos x oor sin x, wat die regterkant is. Die toegevoegde-truuk is die moeite werd om as 'n vorm te memoriseer: wanneer 'n 1 − cos of 'n 1 + sin in 'n noemer vasgekeer sit, is dit jou stap.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q4 — ALL FOUR MOVES INSIDE ONE PROOF: LCD, multiply the bracket out,
   masked identity, common factor, cancel.
   --------------------------------------------------------------- */
const q4 = {
  id: "gtrig.sib.id.q4",
  chapter: CH,
  topic: "identities",
  archetype: "identity-two-fractions-added-lcd-expand-mask-factorise",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Prove that &nbsp;sin θ/(1 + cos θ) + (1 + cos θ)/sin θ = 2/sin θ", af: "Bewys dat &nbsp;sin θ/(1 + cos θ) + (1 + cos θ)/sin θ = 2/sin θ",
      },
      hint: {
        en: "Two fractions being added means one thing: find the LCD. Multiply the brackets out on top, tidy with a masked identity, and then look hard for a common factor before you give up — something on top is going to cancel something underneath.", af: "Twee breuke wat opgetel word, beteken een ding: kry die KGV. Vermenigvuldig die hakies bo uit, maak netjies met 'n gemaskerde identiteit, en soek dan goed na 'n gemene faktor voordat jy opgee: iets bo gaan iets onder kanselleer.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin θ/(1 + cos θ) + (1 + cos θ)/sin θ", af: "LKS = sin θ/(1 + cos θ) + (1 + cos θ)/sin θ" } },
        { type: "step", text: { en: "The LCD is sin θ(1 + cos θ):", af: "Die KGV is sin θ(1 + cos θ):" } },
        { type: "step", text: { en: "LHS = (sin²θ + (1 + cos θ)²)/(sin θ(1 + cos θ))", af: "LKS = (sin²θ + (1 + cos θ)²)/(sin θ(1 + cos θ))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Multiply the bracket out on top: &nbsp;sin²θ + 1 + 2cos θ + cos²θ", af: "Vermenigvuldig die hakie bo uit: &nbsp;sin²θ + 1 + 2cos θ + cos²θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin²θ + cos²θ = 1, so the top is &nbsp;1 + 1 + 2cos θ = 2 + 2cos θ", af: "sin²θ + cos²θ = 1, dus is die teller &nbsp;1 + 1 + 2cos θ = 2 + 2cos θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take out the common factor: &nbsp;2 + 2cos θ = 2(1 + cos θ)", af: "Haal die gemene faktor uit: &nbsp;2 + 2cos θ = 2(1 + cos θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = (2(1 + cos θ))/(sin θ(1 + cos θ)) = 2/sin θ = RHS", af: "LKS = (2(1 + cos θ))/(sin θ(1 + cos θ)) = 2/sin θ = RKS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (1 + cos θ)² is NOT 1 + cos²θ. Multiply the bracket out properly — 1 + 2cos θ + cos²θ — because that middle term is the one that eventually gives you the 2 you are aiming for.", af: "PASOP: (1 + cos θ)² is NIE 1 + cos²θ nie. Vermenigvuldig die hakie behoorlik uit: 1 + 2cos θ + cos²θ. Daardie middelterm is die een wat jou uiteindelik die 2 gee waarna jy mik.",
        } },
      ],
      esplain: {
        en: "This is nearly the full tour: three of her four moves in one proof (no tan this time). Two fractions being added means you need a common denominator, and the LCD here is simply the two denominators multiplied, sin θ(1 + cos θ). Each fraction gets whatever it is missing, which puts sin²θ and (1 + cos θ)² on top. Multiply that second bracket out carefully — it is 1 + 2cos θ + cos²θ, and forgetting the middle term is the usual disaster. Now the top holds sin²θ and cos²θ sitting together, and those two make 1, so the whole top tidies to 2 + 2cos θ. Take out the 2 and it becomes 2(1 + cos θ) — and there, staring back at you, is the same bracket that is underneath. Cancel it and 2 over sin θ is what remains. When a proof looks stuck after the LCD, the next move is nearly always factorise.", af: "Dit is amper die hele toer: drie van haar vier stappe in een bewys (hierdie keer geen tan nie). Twee breuke wat opgetel word, beteken jy het 'n gemene noemer nodig, en die KGV hier is eenvoudig die twee noemers vermenigvuldig, sin θ(1 + cos θ). Elke breuk kry wat hy kortkom, en dit sit sin²θ en (1 + cos θ)² bo. Vermenigvuldig daardie tweede hakie versigtig uit: dit is 1 + 2cos θ + cos²θ, en om die middelterm te vergeet, is die gewone ramp. Nou staan sin²θ en cos²θ saam bo, en daardie twee maak 1, dus word die hele teller netjies 2 + 2cos θ. Haal die 2 uit, en dit word 2(1 + cos θ), en daar staar dieselfde hakie wat onder staan jou aan. Kanselleer dit, en 2 oor sin θ bly oor. As 'n bewys ná die KGV vas lyk, is die volgende stap amper altyd faktoriseer.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q5 — HER TEST 7 SHAPE. Two fractions subtracted; the answer then has
   to be REBUILT into a tan, which is the half most learners leave out.
   --------------------------------------------------------------- */
const q5 = {
  id: "gtrig.sib.id.q5",
  chapter: CH,
  topic: "identities",
  archetype: "identity-two-fractions-subtracted-rebuilt-into-a-tan",
  paper: PAPER,
  lostQuest: LOST,
  marks: 5,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Prove that &nbsp;1/(1 − cos x) − 1/(1 + cos x) = 2/(sin x · tan x)", af: "Bewys dat &nbsp;1/(1 − cos x) − 1/(1 + cos x) = 2/(sin x · tan x)",
      },
      hint: {
        en: "The LCD is the two denominators multiplied — and they are a conjugate pair, so the bottom will turn into a difference of two squares by itself. When your left side stops moving, look at the right side and ask what sin x · tan x actually IS.", af: "Die KGV is die twee noemers vermenigvuldig, en hulle is 'n toegevoegde paar, dus word die noemer vanself 'n verskil van twee vierkante. As jou linkerkant ophou beweeg, kyk na die regterkant en vra wat sin x · tan x eintlik IS.",
      },
      memo: [
        { type: "step", text: { en: "LHS = 1/(1 − cos x) − 1/(1 + cos x)", af: "LKS = 1/(1 − cos x) − 1/(1 + cos x)" } },
        { type: "step", text: { en: "The LCD is (1 − cos x)(1 + cos x):", af: "Die KGV is (1 − cos x)(1 + cos x):" } },
        { type: "step", text: { en: "LHS = ((1 + cos x) − (1 − cos x))/((1 − cos x)(1 + cos x))", af: "LKS = ((1 + cos x) − (1 − cos x))/((1 − cos x)(1 + cos x))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Top: &nbsp;1 + cos x − 1 + cos x = 2cos x. &nbsp;Bottom: a difference of two squares, 1 − cos²x", af: "Teller: &nbsp;1 + cos x − 1 + cos x = 2cos x. &nbsp;Noemer: 'n verskil van twee vierkante, 1 − cos²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²x = sin²x, so &nbsp;LHS = (2cos x)/sin²x", af: "1 − cos²x = sin²x, dus &nbsp;LKS = (2cos x)/sin²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now rebuild the bottom. Since tan x = sin x/cos x, the product &nbsp;sin x · tan x = sin²x/cos x", af: "Bou nou die noemer weer op. Omdat tan x = sin x/cos x, is die produk &nbsp;sin x · tan x = sin²x/cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "So &nbsp;(2cos x)/sin²x = 2/(sin x · tan x) = RHS", af: "Dus &nbsp;(2cos x)/sin²x = 2/(sin x · tan x) = RKS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the second fraction belongs to the WHOLE numerator. −(1 − cos x) is −1 + cos x, not −1 − cos x. Getting that sign wrong turns the top into 0 and the proof dies on the spot.", af: "PASOP: die minus voor die tweede breuk hoort by die HELE teller. −(1 − cos x) is −1 + cos x, nie −1 − cos x nie. As jy daardie teken verkeerd kry, word die teller 0 en die bewys sterf op die plek.",
        } },
      ],
      esplain: {
        en: "The left side is straightforward once you notice the two denominators are a conjugate pair: multiplied together they give a difference of two squares, 1 − cos²x, which is sin²x. The one place it goes wrong is the subtraction. That minus belongs to the entire second numerator, so 1 + cos x take away (1 − cos x) is 1 + cos x − 1 + cos x, which is 2cos x. Write the bracket in and the sign looks after itself. After that the left side has stopped moving at 2cos x over sin²x, and the proof is not finished — you still have to reach the shape the question asked for. So look at the right side and ask what sin x · tan x really is: sin x times sin x over cos x, which is sin²x over cos x. Turn that upside down under the 2 and it is exactly 2cos x over sin²x. Same thing, different clothes.", af: "Die linkerkant is eenvoudig sodra jy raaksien dat die twee noemers 'n toegevoegde paar is: saam vermenigvuldig gee hulle 'n verskil van twee vierkante, 1 − cos²x, wat sin²x is. Die een plek waar dit verkeerd loop, is die aftrekking. Daardie minus hoort by die hele tweede teller, dus is 1 + cos x minus (1 − cos x) gelyk aan 1 + cos x − 1 + cos x, wat 2cos x is. Skryf die hakie in, en die teken sorg vir homself. Daarna het die linkerkant by 2cos x oor sin²x opgehou beweeg, en die bewys is nie klaar nie: jy moet nog die vorm bereik waarvoor die vraag gevra het. Kyk dus na die regterkant en vra wat sin x · tan x regtig is: sin x maal sin x oor cos x, wat sin²x oor cos x is. Draai dit onderstebo onder die 2, en dit is presies 2cos x oor sin²x. Dieselfde ding, ander klere.",
      },
    },
  ],
};

/* ---------------------------------------------------------------
   q6 — PROVE IT, THEN USE IT (her Test 5 Q5 mould). Part (b) is only
   quick if you use the RIGHT-hand side you just proved; substituting
   300° into the left-hand side is legal and slow and loses time.
   --------------------------------------------------------------- */
const q6 = {
  id: "gtrig.sib.id.q6",
  chapter: CH,
  topic: "identities",
  archetype: "identity-prove-then-evaluate-at-a-special-angle",
  paper: PAPER,
  lostQuest: LOST,
  marks: 8,
  parts: [
    {
      id: "a",
      marks: 5,
      level: 3,
      prompt: {
        en: "Prove that &nbsp;cos θ/(1 − sin θ) − tan θ = 1/cos θ", af: "Bewys dat &nbsp;cos θ/(1 − sin θ) − tan θ = 1/cos θ",
      },
      hint: {
        en: "Deal with the tan first, then find the LCD of the two fractions you are left with. When you multiply the top out, keep the bracket — the minus in front of it belongs to everything inside.", af: "Hanteer eers die tan, kry dan die KGV van die twee breuke wat oorbly. As jy die teller uitvermenigvuldig, hou die hakie: die minus voor die hakie hoort by alles binne-in.",
      },
      memo: [
        { type: "step", text: { en: "LHS = cos θ/(1 − sin θ) − tan θ", af: "LKS = cos θ/(1 − sin θ) − tan θ" } },
        { type: "step", text: { en: "tan θ = sin θ/cos θ", af: "tan θ = sin θ/cos θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The LCD is cos θ(1 − sin θ):", af: "Die KGV is cos θ(1 − sin θ):" } },
        { type: "step", text: { en: "LHS = (cos²θ − sin θ(1 − sin θ))/(cos θ(1 − sin θ))", af: "LKS = (cos²θ − sin θ(1 − sin θ))/(cos θ(1 − sin θ))" }, ticks: ["ca"] },
        { type: "step", text: { en: "Top: &nbsp;cos²θ − sin θ + sin²θ", af: "Teller: &nbsp;cos²θ − sin θ + sin²θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin²θ + cos²θ = 1, so the top is &nbsp;1 − sin θ", af: "sin²θ + cos²θ = 1, dus is die teller &nbsp;1 − sin θ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = (1 − sin θ)/(cos θ(1 − sin θ)) = 1/cos θ = RHS", af: "LKS = (1 − sin θ)/(cos θ(1 − sin θ)) = 1/cos θ = RKS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Same four moves, same order. The tan goes first — write it as sin θ over cos θ — and now you have two fractions to subtract, with denominators 1 − sin θ and cos θ. The LCD is those two multiplied. The first fraction is missing a cos θ, so its top becomes cos²θ; the second is missing the bracket, so its top becomes sin θ(1 − sin θ), and that whole thing is being subtracted. Multiply it out and you get −sin θ + sin²θ. Now the top holds cos²θ and sin²θ next to each other, and they make 1, leaving 1 − sin θ. Look underneath: 1 − sin θ is sitting there too. Cancel, and 1 over cos θ is all that survives. The pattern is worth naming: whenever the top tidies into the same bracket as the bottom, the proof is one cancel away from finished.", af: "Dieselfde vier stappe, dieselfde volgorde. Eers die tan: skryf dit as sin θ oor cos θ, en nou het jy twee breuke om af te trek, met noemers 1 − sin θ en cos θ. Die KGV is daardie twee vermenigvuldig. Die eerste breuk kort 'n cos θ, dus word sy teller cos²θ; die tweede kort die hakie, dus word sy teller sin θ(1 − sin θ), en daardie hele ding word afgetrek. Vermenigvuldig dit uit, en jy kry −sin θ + sin²θ. Nou staan cos²θ en sin²θ langs mekaar bo, en hulle maak 1, sodat 1 − sin θ oorbly. Kyk onder: 1 − sin θ sit daar ook. Kanselleer, en net 1 oor cos θ oorleef. Die patroon is die moeite werd om te benoem: wanneer die teller netjies dieselfde hakie as die noemer word, is die bewys een kansellering van klaar af.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence determine, <b>without using a calculator</b>, the value of &nbsp;cos 300°/(1 − sin 300°) − tan 300°", af: "Bepaal vervolgens, <b>sonder om 'n sakrekenaar te gebruik</b>, die waarde van &nbsp;cos 300°/(1 − sin 300°) − tan 300°",
      },
      hint: {
        en: "\"Hence\" means do not start again. You have already proved what this whole expression is equal to — so all you actually need is one cosine, and 300° is a reduction away from a special angle.", af: "\"Vervolgens\" beteken: moenie oor begin nie. Jy het reeds bewys waaraan hierdie hele uitdrukking gelyk is, dus het jy eintlik net een cos-waarde nodig, en 300° is een reduksie weg van 'n spesiale hoek.",
      },
      memo: [
        { type: "step", text: { en: "By (a) the whole expression is simply &nbsp;1/cos θ, &nbsp;with θ = 300°", af: "Volgens (a) is die hele uitdrukking eenvoudig &nbsp;1/cos θ, &nbsp;met θ = 300°" } },
        { type: "step", text: { en: "cos 300° &nbsp;[360° − 60°]&nbsp; = cos 60° &nbsp;— 300° is a C angle, where cosine is positive", af: "cos 300° &nbsp;[360° − 60°]&nbsp; = cos 60°, &nbsp;want 300° is 'n C-hoek, waar cos positief is" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos 60° = 1/2 &nbsp;(off her second special triangle, the one with sides 1, √3 and 2)", af: "cos 60° = 1/2 &nbsp;(van haar tweede spesiale driehoek, die een met sye 1, √3 en 2)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The value = 1/cos 300° = 1/cos 60° = 2", af: "Die waarde = 1/cos 300° = 1/cos 60° = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: substituting 300° into the LEFT-hand side is not wrong, but it is three reductions and a surd fraction instead of one. When a question says \"hence\", the previous answer is the shortcut — use it.", af: "PASOP: om 300° in die LINKERKANT te vervang, is nie verkeerd nie, maar dit is drie reduksies en 'n breuk vol wortelvorme in plaas van een reduksie. As 'n vraag \"vervolgens\" sê, is die vorige antwoord die kortpad: gebruik dit.",
        } },
      ],
      esplain: {
        en: "The word \"hence\" is doing all the work in this question. Part (a) proved that this entire expression, whatever θ is, equals 1 over cos θ. So there is nothing left to simplify — you just need cos 300°. Reduce it: 300° splits as 360° − 60°, which lands in C, the quadrant where cosine is the one that stays positive. So cos 300° is plus cos 60°, and cos 60° is a half, read straight off her second special triangle. One divided by a half is 2, and that is the answer. If you had ignored (a) and substituted 300° everywhere on the left you would have had three separate reductions, a surd on the top and a surd on the bottom, and the same answer ten minutes later. In an exam, \"hence\" is a gift.", af: "Die woord \"vervolgens\" doen al die werk in hierdie vraag. Deel (a) het bewys dat hierdie hele uitdrukking, wat θ ook al is, gelyk is aan 1 oor cos θ. Daar is dus niks meer om te vereenvoudig nie: jy het net cos 300° nodig. Reduseer dit: 300° is 360° − 60°, wat in C beland, die kwadrant waar cos die een is wat positief bly. Dus is cos 300° plus cos 60°, en cos 60° is 'n half, reguit van haar tweede spesiale driehoek afgelees. Een gedeel deur 'n half is 2, en dit is die antwoord. As jy (a) geïgnoreer en 300° oral aan die linkerkant vervang het, sou jy drie aparte reduksies gehad het, 'n wortelvorm bo en 'n wortelvorm onder, en dieselfde antwoord tien minute later. In 'n eksamen is \"vervolgens\" 'n geskenk.",
      },
    },
  ],
};

export const gtrigIdentitiesSiblingQuestions = [q1, q2, q3, q4, q5, q6];
