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
  en: "REMEMBER: never cross-multiply an identity. Cross-multiplying assumes the two sides are already equal, which is the exact thing you were asked to prove. Work ONE side, top to bottom, and land on the other — and when in doubt, go LEFT.",
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
        en: "Prove that &nbsp;(1 − cos²θ)/sin θ = sin θ",
      },
      hint: {
        en: "Start on the left and only on the left. There is a 1 sitting next to a squared ratio on the top — that is one of the masked identities standing right in front of you.",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 − cos²θ)/sin θ" } },
        { type: "step", text: { en: "1 − cos²θ = sin²θ &nbsp;(masked identity)" }, ticks: ["s/f"] },
        { type: "answer", text: { en: "LHS = sin²θ/sin θ = sin θ = RHS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Every identity proof in Grade 11 runs on the same four moves, and this one only needs the first: a masked identity. sin²θ + cos²θ = 1 is the parent, and it has two children that look different but say the same thing — 1 − cos²θ is sin²θ, and 1 − sin²θ is cos²θ. So the moment you see a 1 sitting next to a squared ratio, one of those three is in front of you. Swap 1 − cos²θ for sin²θ and the top becomes sin²θ over sin θ, which cancels down to a single sin θ. That is the right-hand side, so you write = RHS and stop. Two things to keep: work only the left side, and finish with the words = RHS. The marker wants to see you arrived, not that you met in the middle.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 1,
      prompt: {
        en: "Prove that &nbsp;cos²θ · tan²θ = 1 − cos²θ",
      },
      hint: {
        en: "A tan standing in the middle of an identity has one job: turn into sin over cos. Do that first and see what cancels.",
      },
      memo: [
        { type: "step", text: { en: "LHS = cos²θ · tan²θ" } },
        { type: "step", text: { en: "tan θ = sin θ/cos θ, so &nbsp;tan²θ = sin²θ/cos²θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LHS = cos²θ · sin²θ/cos²θ = sin²θ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "sin²θ = 1 − cos²θ = RHS &nbsp;(masked identity)" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Two of her four moves, in the order she teaches them. First: a tan inside an identity almost never stays a tan. Rewrite it as sin over cos, and because the whole thing is squared, tan²θ becomes sin²θ over cos²θ. Now the cos²θ that was standing outside cancels the cos²θ underneath, and you are left with sin²θ. Second move: the right-hand side is 1 − cos²θ, which is one of the masked identities and is exactly sin²θ. So write that line, finish with = RHS, and stop. Notice you never touched the right-hand side — you only recognised it. That is what makes the proof honest: you started with the left, changed nothing but its appearance, and arrived where the question said you would.",
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
        en: "Prove that &nbsp;(1 − sin²θ)/(1 − sin θ) = 1 + sin θ",
      },
      hint: {
        en: "Do not reach for cos²θ this time. Look at the top as an ordinary algebra expression: something squared subtracted from something squared. What does that always factorise into?",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 − sin²θ)/(1 − sin θ)" } },
        { type: "step", text: { en: "The top is a difference of two squares: &nbsp;1 − sin²θ = (1 − sin θ)(1 + sin θ)" }, ticks: ["s/f"] },
        { type: "step", text: { en: "LHS = ((1 − sin θ)(1 + sin θ))/(1 − sin θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1 + sin θ = RHS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: 1 − sin²θ is also cos²θ, and that is a perfectly correct first line — but cos²θ over 1 − sin θ does not cancel, so it takes you nowhere. The factorised form is the one that moves.",
        } },
      ],
      esplain: {
        en: "This one is a trig question wearing an algebra coat. The top, 1 − sin²θ, is a difference of two squares — 1 squared take away (sin θ) squared — and a difference of two squares always splits into two brackets: one with a minus, one with a plus. So it becomes (1 − sin θ)(1 + sin θ). Now look underneath: 1 − sin θ, which is one of the two brackets you just made. Cancel it, and 1 + sin θ is all that is left, which is the right-hand side. The interesting part is what you did NOT do. 1 − sin²θ is also cos²θ, and writing that is not wrong — it just does not help, because cos²θ over 1 − sin θ has nothing to cancel. Choosing between two correct first lines by asking which one moves is most of what makes identity proofs feel easy later on.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 2,
      prompt: {
        en: "Prove that &nbsp;sin x · tan x + cos x = 1/cos x",
      },
      hint: {
        en: "Turn the tan into sin over cos first. That leaves you adding a fraction to something that is not a fraction — so give the second term a denominator and find the LCD.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin x · tan x + cos x" } },
        { type: "step", text: { en: "tan x = sin x/cos x, so &nbsp;LHS = sin²x/cos x + cos x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The LCD is cos x: &nbsp;LHS = (sin²x + cos²x)/cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= 1/cos x = RHS &nbsp;(masked identity)" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Three of her four moves, one after the other. Move one: the tan has to go, so write it as sin over cos. Multiplying that by the sin x in front gives sin²x over cos x. Move two: now you are adding a fraction to a lone cos x, and you cannot add those until they share a denominator. The lone term gets a denominator of 1, and the LCD of cos x and 1 is just cos x — so cos x multiplied by cos x gives cos²x on top. Everything is now over the same bottom. Move three: the top reads sin²x + cos²x, and that is the most useful 1 in the whole syllabus. Replace it and you are left with 1 over cos x, which is exactly the right-hand side. The order matters — deal with the tan, then the LCD, then look for the mask.",
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
        en: "Prove that &nbsp;(1 + tan²x) · cos²x = 1",
      },
      hint: {
        en: "The tan goes first, as always. Then you are adding 1 to a fraction inside a bracket — give the 1 a denominator so the bracket becomes one single fraction before you multiply.",
      },
      memo: [
        { type: "step", text: { en: "LHS = (1 + tan²x) · cos²x" } },
        { type: "step", text: { en: "tan²x = sin²x/cos²x, so the bracket becomes &nbsp;(cos²x + sin²x)/cos²x" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos²x + sin²x = 1, so the bracket is &nbsp;1/cos²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = 1/cos²x · cos²x = 1 = RHS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "The bracket is where all the work is. Rewrite tan²x as sin²x over cos²x, then remember that the 1 sitting next to it is really 1 over 1 — give it the denominator cos²x so the two terms can be added. The top becomes cos²x + sin²x, which is the masked identity, so the whole bracket collapses to 1 over cos²x. Now the cos²x that was waiting outside cancels it and the answer is 1. There is a shortcut hiding in this result worth knowing: 1 + tan²x is always 1 over cos²x. You are not expected to quote it, but if you notice it in a bigger question it saves you two lines. Either way the honest route is the one above — tan into sin over cos, give the 1 a denominator, spot the mask.",
      },
    },
    {
      id: "b",
      marks: 4,
      level: 2,
      prompt: {
        en: "Prove that &nbsp;sin x/(1 − cos x) = (1 + cos x)/sin x",
      },
      hint: {
        en: "There is nothing to add and nothing to factorise yet, so make something appear. Multiply the top AND the bottom by the conjugate of the denominator — the same bracket with the sign flipped. That is not cheating: multiplying by 1 never changes anything.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin x/(1 − cos x)" } },
        { type: "step", text: { en: "Multiply top and bottom by the conjugate of the denominator, 1 + cos x:" } },
        { type: "step", text: { en: "LHS = (sin x(1 + cos x))/((1 − cos x)(1 + cos x))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The bottom is a difference of two squares: &nbsp;(1 − cos x)(1 + cos x) = 1 − cos²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²x = sin²x, so &nbsp;LHS = (sin x(1 + cos x))/sin²x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "= (1 + cos x)/sin x = RHS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: it is very tempting to cross-multiply here, because the identity is one fraction equal to another. Don't. Cross-multiplying assumes the answer. Multiplying the LEFT side, top and bottom, by the same bracket is a different thing entirely — that is multiplying by 1.",
        } },
      ],
      esplain: {
        en: "This shape has one fraction on each side, so cross-multiplying screams at you — and it is exactly the move that loses the marks, because it assumes the two sides are equal before you have proved anything. The legal version is to multiply the left side, top and bottom, by the same bracket. That is multiplying by 1, and 1 never changes a value, only its appearance. Choose the conjugate of the denominator: 1 − cos x becomes 1 + cos x. Multiply them and you get a difference of two squares, 1 − cos²x, which is instantly sin²x. Now the top has a sin x in it and the bottom is sin²x, so one sin x cancels and you land on 1 + cos x over sin x, which is the right-hand side. The conjugate trick is worth memorising as a shape — whenever a 1 − cos or a 1 + sin is stuck in a denominator, that is your move.",
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
        en: "Prove that &nbsp;sin θ/(1 + cos θ) + (1 + cos θ)/sin θ = 2/sin θ",
      },
      hint: {
        en: "Two fractions being added means one thing: find the LCD. Multiply the brackets out on top, tidy with a masked identity, and then look hard for a common factor before you give up — something on top is going to cancel something underneath.",
      },
      memo: [
        { type: "step", text: { en: "LHS = sin θ/(1 + cos θ) + (1 + cos θ)/sin θ" } },
        { type: "step", text: { en: "The LCD is sin θ(1 + cos θ):" } },
        { type: "step", text: { en: "LHS = (sin²θ + (1 + cos θ)²)/(sin θ(1 + cos θ))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Multiply the bracket out on top: &nbsp;sin²θ + 1 + 2cos θ + cos²θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin²θ + cos²θ = 1, so the top is &nbsp;1 + 1 + 2cos θ = 2 + 2cos θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "Take out the common factor: &nbsp;2 + 2cos θ = 2(1 + cos θ)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = (2(1 + cos θ))/(sin θ(1 + cos θ)) = 2/sin θ = RHS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: (1 + cos θ)² is NOT 1 + cos²θ. Multiply the bracket out properly — 1 + 2cos θ + cos²θ — because that middle term is the one that eventually gives you the 2 you are aiming for.",
        } },
      ],
      esplain: {
        en: "This is the full tour: all four of her moves in one proof. Two fractions being added means you need a common denominator, and the LCD here is simply the two denominators multiplied, sin θ(1 + cos θ). Each fraction gets whatever it is missing, which puts sin²θ and (1 + cos θ)² on top. Multiply that second bracket out carefully — it is 1 + 2cos θ + cos²θ, and forgetting the middle term is the usual disaster. Now the top holds sin²θ and cos²θ sitting together, and those two make 1, so the whole top tidies to 2 + 2cos θ. Take out the 2 and it becomes 2(1 + cos θ) — and there, staring back at you, is the same bracket that is underneath. Cancel it and 2 over sin θ is what remains. When a proof looks stuck after the LCD, the next move is nearly always factorise.",
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
        en: "Prove that &nbsp;1/(1 − cos x) − 1/(1 + cos x) = 2/(sin x · tan x)",
      },
      hint: {
        en: "The LCD is the two denominators multiplied — and they are a conjugate pair, so the bottom will turn into a difference of two squares by itself. When your left side stops moving, look at the right side and ask what sin x · tan x actually IS.",
      },
      memo: [
        { type: "step", text: { en: "LHS = 1/(1 − cos x) − 1/(1 + cos x)" } },
        { type: "step", text: { en: "The LCD is (1 − cos x)(1 + cos x):" } },
        { type: "step", text: { en: "LHS = ((1 + cos x) − (1 − cos x))/((1 − cos x)(1 + cos x))" }, ticks: ["s/f"] },
        { type: "step", text: { en: "Top: &nbsp;1 + cos x − 1 + cos x = 2cos x. &nbsp;Bottom: a difference of two squares, 1 − cos²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "1 − cos²x = sin²x, so &nbsp;LHS = (2cos x)/sin²x" }, ticks: ["ca"] },
        { type: "step", text: { en: "Now rebuild the bottom. Since tan x = sin x/cos x, the product &nbsp;sin x · tan x = sin²x/cos x" }, ticks: ["ca"] },
        { type: "answer", text: { en: "So &nbsp;(2cos x)/sin²x = 2/(sin x · tan x) = RHS" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: the minus in front of the second fraction belongs to the WHOLE numerator. −(1 − cos x) is −1 + cos x, not −1 − cos x. Getting that sign wrong turns the top into 0 and the proof dies on the spot.",
        } },
      ],
      esplain: {
        en: "The left side is straightforward once you notice the two denominators are a conjugate pair: multiplied together they give a difference of two squares, 1 − cos²x, which is sin²x. The one place it goes wrong is the subtraction. That minus belongs to the entire second numerator, so 1 + cos x take away (1 − cos x) is 1 + cos x − 1 + cos x, which is 2cos x. Write the bracket in and the sign looks after itself. After that the left side has stopped moving at 2cos x over sin²x, and the proof is not finished — you still have to reach the shape the question asked for. So look at the right side and ask what sin x · tan x really is: sin x times sin x over cos x, which is sin²x over cos x. Turn that upside down under the 2 and it is exactly 2cos x over sin²x. Same thing, different clothes.",
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
        en: "Prove that &nbsp;cos θ/(1 − sin θ) − tan θ = 1/cos θ",
      },
      hint: {
        en: "Deal with the tan first, then find the LCD of the two fractions you are left with. When you multiply the top out, keep the bracket — the minus in front of it belongs to everything inside.",
      },
      memo: [
        { type: "step", text: { en: "LHS = cos θ/(1 − sin θ) − tan θ" } },
        { type: "step", text: { en: "tan θ = sin θ/cos θ" }, ticks: ["s/f"] },
        { type: "step", text: { en: "The LCD is cos θ(1 − sin θ):" } },
        { type: "step", text: { en: "LHS = (cos²θ − sin θ(1 − sin θ))/(cos θ(1 − sin θ))" }, ticks: ["ca"] },
        { type: "step", text: { en: "Top: &nbsp;cos²θ − sin θ + sin²θ" }, ticks: ["ca"] },
        { type: "step", text: { en: "sin²θ + cos²θ = 1, so the top is &nbsp;1 − sin θ" }, ticks: ["ca"] },
        { type: "answer", text: { en: "LHS = (1 − sin θ)/(cos θ(1 − sin θ)) = 1/cos θ = RHS" }, ticks: ["a"] },
        { type: "trap", text: TRAP_ONE_SIDE },
      ],
      esplain: {
        en: "Same four moves, same order. The tan goes first — write it as sin θ over cos θ — and now you have two fractions to subtract, with denominators 1 − sin θ and cos θ. The LCD is those two multiplied. The first fraction is missing a cos θ, so its top becomes cos²θ; the second is missing the bracket, so its top becomes sin θ(1 − sin θ), and that whole thing is being subtracted. Multiply it out and you get −sin θ + sin²θ. Now the top holds cos²θ and sin²θ next to each other, and they make 1, leaving 1 − sin θ. Look underneath: 1 − sin θ is sitting there too. Cancel, and 1 over cos θ is all that survives. The pattern is worth naming: whenever the top tidies into the same bracket as the bottom, the proof is one cancel away from finished.",
      },
    },
    {
      id: "b",
      marks: 3,
      level: 3,
      prompt: {
        en: "Hence determine, <b>without using a calculator</b>, the value of &nbsp;cos 300°/(1 − sin 300°) − tan 300°",
      },
      hint: {
        en: "\"Hence\" means do not start again. You have already proved what this whole expression is equal to — so all you actually need is one cosine, and 300° is a reduction away from a special angle.",
      },
      memo: [
        { type: "step", text: { en: "By (a) the whole expression is simply &nbsp;1/cos θ, &nbsp;with θ = 300°" } },
        { type: "step", text: { en: "cos 300° &nbsp;[360° − 60°]&nbsp; = cos 60° &nbsp;— 300° is a C angle, where cosine is positive" }, ticks: ["s/f"] },
        { type: "step", text: { en: "cos 60° = 1/2 &nbsp;(off her second special triangle, the one with sides 1, √3 and 2)" }, ticks: ["ca"] },
        { type: "answer", text: { en: "The value = 1/cos 300° = 1/cos 60° = 2" }, ticks: ["a"] },
        { type: "trap", text: {
          en: "WATCH OUT: substituting 300° into the LEFT-hand side is not wrong, but it is three reductions and a surd fraction instead of one. When a question says \"hence\", the previous answer is the shortcut — use it.",
        } },
      ],
      esplain: {
        en: "The word \"hence\" is doing all the work in this question. Part (a) proved that this entire expression, whatever θ is, equals 1 over cos θ. So there is nothing left to simplify — you just need cos 300°. Reduce it: 300° splits as 360° − 60°, which lands in C, the quadrant where cosine is the one that stays positive. So cos 300° is plus cos 60°, and cos 60° is a half, read straight off her second special triangle. One divided by a half is 2, and that is the answer. If you had ignored (a) and substituted 300° everywhere on the left you would have had three separate reductions, a surd on the top and a surd on the bottom, and the same answer ten minutes later. In an exam, \"hence\" is a gift.",
      },
    },
  ],
};

export const gtrigIdentitiesSiblingQuestions = [q1, q2, q3, q4, q5, q6];
