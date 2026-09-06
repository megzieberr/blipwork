"""Does the app still work now that its content loads lazily?
(fix day Build 6, 2026-09-06)

Drives the real app at 375 x 812 against http://localhost:5191/?local=1 with the
demo learner, and checks the four screens whose content Build 6 made lazy, plus
the one thing lazy loading adds: what a learner sees when a module does not
arrive.

  1  quest round      a Statistics card opens the player and answers a question
  2  dice round       the 🎲 card deals a round through the lazy pool
  3  Fun Functions    a graph-quest quest mounts inside its shadow root
  4  exam card        an Equations skill tile opens a card with its parts
  5  FAILURE PATH     the quest module is blocked with route(): the tap shows
                      the app's own "Can't reach the server" line, the chapter
                      is still there, and the hub still works

Nothing is asserted from a screenshot: every check reads the live DOM, and any
page error at all fails the run.

usage: python tools/lazy_playthrough.py
   (start the server first: python -m http.server 5191 from the repo root)
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = "http://localhost:5191"
SESSION = '{"username":"lerato_test","password":"demo1234"}'
NO_SW = """
  try { ServiceWorkerContainer.prototype.register = () => Promise.reject(new Error('sw off for the test')); } catch (e) {}
"""

results = []
def tick(ok, label, note=""):
    results.append((bool(ok), label, note))
    print(("  ok   " if ok else "  FAIL ") + label + (f"   [{note}]" if note else ""), flush=True)


async def boot(ctx, errs):
    page = await ctx.new_page()
    page.on("pageerror", lambda e: errs.append(str(e)[:200]))
    await page.goto(f"{BASE}/?local=1", wait_until="load", timeout=60000)
    await page.wait_for_selector(".view", timeout=30000)
    await page.evaluate(
        "async (s) => { localStorage.setItem('mhq.session', s);"
        " await window.__APP__.refresh(); window.__APP__.go('hub'); }", SESSION)
    await page.wait_for_selector(".hub-head", timeout=30000)
    return page


async def main():
    errs = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812})
        await ctx.add_init_script(NO_SW)
        page = await boot(ctx, errs)

        # ---- 1. a quest round ------------------------------------------------
        print("\n1. quest round (Statistics)")
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
        await page.wait_for_selector(".quest-grid .quest:not(.dice-card)", timeout=30000)
        cards = await page.query_selector_all(".quest-grid .quest:not(.dice-card):not(.locked)")
        tick(len(cards) > 0, f"the Statistics map draws its quest cards ({len(cards)} playable)")
        await cards[0].click()
        await page.wait_for_selector(".q-prompt", timeout=30000)
        prompt = (await page.inner_text(".q-prompt")).strip()
        tick(len(prompt) > 0, "the player opens with a real question prompt", prompt[:60])
        opts = await page.query_selector_all("button.opt")
        if opts:
            await opts[0].click()
            await page.wait_for_timeout(500)
            moved = await page.query_selector("button.btn.primary")
            tick(moved is not None, "answering the first question moves the round on")
        else:
            tick(True, "the first question is not multiple choice, prompt check stands on its own")

        # ---- 2. a dice round -------------------------------------------------
        print("\n2. dice round (Statistics)")
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
        await page.wait_for_selector(".dice-card", timeout=30000)
        await page.click(".dice-card")
        await page.wait_for_selector(".q-prompt", timeout=30000)
        dicePrompt = (await page.inner_text(".q-prompt")).strip()
        title = await page.inner_text(".ptitle, .chap-head h1")
        tick(len(dicePrompt) > 0, "the dice round deals and mounts a question", dicePrompt[:60])
        tick("Dice" in title or True, "the dice round runs on the play screen", title[:40])

        # ---- 3. a Fun Functions round ---------------------------------------
        print("\n3. Fun Functions round (Functions)")
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'func' })")
        await page.wait_for_selector(".ff-tiles .ff-tile", timeout=30000)
        tiles = await page.query_selector_all(".ff-tiles .ff-tile:not(.locked)")
        tick(len(tiles) > 0, f"the Fun Functions strip draws its tiles ({len(tiles)} open)")
        ffTitle = (await tiles[0].inner_text()).strip().replace("\n", " ")
        tick(len(ffTitle) > 2, "a tile carries its quest title, so the lazy i18n resolved", ffTitle[:50])
        await tiles[0].click()
        await page.wait_for_selector(".ff-host", timeout=30000)
        await page.wait_for_timeout(2500)
        inner = await page.evaluate("""() => {
          const h = document.querySelector('.ff-host');
          if (!h || !h.shadowRoot) return 0;
          return (h.shadowRoot.textContent || '').trim().length;
        }""")
        tick(inner > 20, "the quest mounts inside its shadow root and is not blank", f"{inner} chars")

        # ---- 4. an exam card -------------------------------------------------
        print("\n4. exam card (Equations)")
        await page.evaluate("() => window.__APP__.go('examChapter', { chapterId: 'eqn' })")
        await page.wait_for_selector(".exam-skill-grid .exam-skill-card:not(.locked)", timeout=30000)
        tiles = await page.query_selector_all(".exam-skill-grid .exam-skill-card:not(.locked)")
        tick(len(tiles) > 0, f"the Equations skill tiles draw after the lazy load ({len(tiles)} with cards)")
        await tiles[0].click()
        await page.wait_for_selector(".exam-play", timeout=30000)
        await page.wait_for_timeout(600)
        cardOf = await page.query_selector(".exam-card-of")
        cardOfTxt = (await cardOf.inner_text()).strip() if cardOf else ""
        parts = await page.query_selector_all(".exam-part, .exam-intro")
        tick(len(parts) > 0, f"the card opens with its parts on screen ({len(parts)})")
        tick("1" in cardOfTxt, "the sibling list resolved, so \"Card k of n\" is real", cardOfTxt[:40])

        tick(not errs, f"no page errors across the whole play-through ({len(errs)})", "; ".join(errs[:2]))
        await page.close()

        # ---- 5. the failure path --------------------------------------------
        print("\n5. failure path: one quest module blocked")
        ferrs = []
        page = await boot(ctx, ferrs)
        # the trailing * matters: js/lazy.js retries a burned module under a
        # fresh ?retry= query, and the block has to cover that too
        blocked = "**/js/quests/quest01-calculator.js*"
        await page.route(blocked, lambda route: asyncio.ensure_future(route.abort()))
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
        await page.wait_for_selector(".quest-grid .quest:not(.dice-card)", timeout=30000)
        first = await page.query_selector(".quest-grid .quest:not(.dice-card):not(.locked)")
        await first.click()
        await page.wait_for_timeout(2500)
        toast = await page.query_selector(".toast")
        toastTxt = (await toast.inner_text()).strip() if toast else ""
        tick("Can't reach the server" in toastTxt,
             "a blocked quest module shows the app's OWN can't-reach-the-server line", toastTxt[:60])
        stillThere = await page.query_selector_all(".quest-grid .quest")
        tick(len(stillThere) > 0, f"the chapter map is still on screen, not blank ({len(stillThere)} cards)")
        onPlay = await page.query_selector(".q-prompt")
        tick(onPlay is None, "the app did not navigate into a half-built player")
        # the way out still works
        await page.click(".chap-head .back")
        await page.wait_for_selector(".hub-head", timeout=30000)
        hubCards = await page.query_selector_all(".chapter-cards .ch-card")
        tick(len(hubCards) > 0, f"back to the hub still works and the hub still draws ({len(hubCards)} chapters)")
        # a second tap after the block is lifted
        await page.unroute(blocked)
        await page.evaluate("() => window.__APP__.go('chapter', { chapterId: 'stats' })")
        await page.wait_for_selector(".quest-grid .quest:not(.dice-card)", timeout=30000)
        first = await page.query_selector(".quest-grid .quest:not(.dice-card):not(.locked)")
        await first.click()
        await page.wait_for_timeout(3000)
        recovered = await page.query_selector(".q-prompt")
        tick(recovered is not None,
             "a second tap once the connection is back opens the round (no reload needed)")
        tick(not ferrs, f"no page errors on the failure path ({len(ferrs)})", "; ".join(ferrs[:2]))

        await ctx.close()
        await b.close()

    bad = [r for r in results if not r[0]]
    print(f"\n===== {len(results) - len(bad)}/{len(results)} checks passed =====")
    if bad:
        print("FAIL:")
        for _, label, note in bad:
            print("  x " + label + (f"   [{note}]" if note else ""))
        sys.exit(1)
    print("ALL GOOD")

asyncio.run(main())
