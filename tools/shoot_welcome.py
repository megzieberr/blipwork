"""Build 2 proof shot (2026-09-05): the gentle-return line in Blip's room.

Drives the real app at 375 x 812 in ?local=1 mode, stages a 14-day absence with
__BLIP_DEV__.lapse(), reloads (the reload's getState is the call that heals him)
and photographs the room. Also prints the before/after state so the picture is
not the only evidence.

    python -m http.server 5191      # from the repo root
    python tools/shoot_welcome.py

Writes tools/_out/build2-hub-375.png (git-ignored).
"""
import os, json, asyncio
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "_out"); os.makedirs(OUT, exist_ok=True)
USER, PW = "lerato_test", "demo1234"


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2)
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)))
        page.on("console", lambda m: errs.append("console." + m.type + ": " + m.text) if m.type == "error" else None)

        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.evaluate("async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k)}")
        # clean slate, then ONE load on the name picker so seed() writes the
        # demo roster back (getState never seeds — it only reads).
        await page.evaluate("()=>localStorage.clear()")
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.wait_for_timeout(400)
        # log in as the demo learner, and mark the room tour as already seen so
        # its overlay is not what the proof shot photographs
        await page.evaluate("(s)=>{localStorage.setItem('mhq.session', JSON.stringify(s));localStorage.setItem('mhq.tourSeen','99');}", {"username": USER, "password": PW})
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.wait_for_timeout(600)

        # the ordinary render: cookie hint up, no welcome line (the guard on
        # the cookie hint is `canFeedToday && !welcomeBack`, so this is the
        # regression that matters)
        normal = await page.evaluate("""() => ({
            cookieHint: (document.querySelector('.cookie-hint') || {}).textContent || null,
            welcomeLine: (document.querySelector('.welcome-hint') || {}).textContent || null })""")
        print("ordinary render     ", json.dumps(normal))

        healthy = await page.evaluate(
            """async ([u,p]) => { const { api } = await import('/js/api.js');
                 const s = await api.getState(u,p);
                 return { welcomeBack: s.welcomeBack, stage: s.health.stage, canFeedToday: s.canFeedToday }; }""",
            [USER, PW])
        print("day 0, just played  ", json.dumps(healthy))

        staged = await page.evaluate("(u)=>globalThis.__BLIP_DEV__.lapse(14, u)", USER)
        print("after lapse(14)     ", json.dumps(staged))

        # the reload's own getState is the healing call
        await page.goto("http://localhost:5191/?local=1", wait_until="networkidle")
        await page.wait_for_timeout(900)

        shown = await page.evaluate("""() => {
            const wb = document.querySelector('.welcome-hint');
            const ck = document.querySelector('.cookie-hint');
            const card = document.querySelector('.room-card');
            const r = wb && wb.getBoundingClientRect();
            return { welcomeLine: wb ? wb.textContent : null,
                     cookieHintAlsoShowing: !!ck,
                     lineBox: r ? { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) } : null,
                     cardScrollW: card ? card.scrollWidth : null,
                     bodyScrollW: document.body.scrollWidth,
                     hearts: document.querySelectorAll('.mood-heart').length,
                     heartsBox: (() => { const h = document.querySelector('.mood-hearts');
                        if (!h) return null; const b = h.getBoundingClientRect();
                        return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width) }; })(),
                     nickname: (document.querySelector('.room-name-btn') || {}).textContent || null,
                     stage: (window.__state && window.__state.health && window.__state.health.stage) };
        }""")
        print("after the reload    ", json.dumps(shown))

        await page.screenshot(path=os.path.join(OUT, "build2-hub-375.png"), full_page=True)

        # a SECOND state load in the same session: the flag must be gone
        again = await page.evaluate(
            """async ([u,p]) => { const { api } = await import('/js/api.js');
                 const s = await api.getState(u,p);
                 return { welcomeBack: s.welcomeBack, stage: s.health.stage, canFeedToday: s.canFeedToday }; }""",
            [USER, PW])
        print("second state load   ", json.dumps(again))
        print("page errors         ", errs[:5])
        await b.close()

asyncio.run(main())
