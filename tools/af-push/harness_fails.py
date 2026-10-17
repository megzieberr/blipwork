"""Like tools/harness_run.py, but prints the page's banner AND every failing line (FAIL / ✗), trimmed.
Usage: PYTHONUTF8=1 python harness_fails.py verify-exam "verify-exam?lang=af"
"""
import asyncio, re, sys
from playwright.async_api import async_playwright
sys.stdout.reconfigure(encoding="utf-8")
pages = sys.argv[1:]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name in pages:
            ctx = await b.new_context(viewport={"width": 375, "height": 812}); pg = await ctx.new_page()
            errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:100]))
            try:
                base, _, query = name.partition("?")
                await pg.goto(f"http://localhost:5191/{base}.html" + (f"?{query}" if query else ""), wait_until="load", timeout=120000)
                prev = None
                for _ in range(400):
                    txt = await pg.evaluate("document.body.innerText")
                    if re.search(r'ALL GOOD|check\(s\) failed|checks FAILED', txt): break
                    if re.search(r'checks passed|\d+/\d+ passed|✗|FAIL', txt) and txt == prev: break
                    prev = txt
                    await pg.wait_for_timeout(3000)
                txt = await pg.evaluate("document.body.innerText")
                ban = [l for l in txt.split('\n') if re.search(r'ALL GOOD|check\(s\) failed|checks FAILED|FAILED', l)]
                print(f"== {name}: {(ban[0] if ban else txt[:100])[:120]}  errs={errs[:1]}")
                lines = txt.split('\n')
                shown = 0
                if "FAILS:" in [l.strip() for l in lines]:
                    i = [l.strip() for l in lines].index("FAILS:") + 1
                    while i < len(lines) and lines[i].strip() and not lines[i].strip().startswith("Part ") and shown < 40:
                        print("   " + lines[i].strip()[:220]); i += 1; shown += 1
                if not shown:
                    for l in lines:
                        if re.search(r'FAIL|✗', l) and not re.search(r'check\(s\) failed|checks FAILED', l):
                            print("   " + l.strip()[:220])
            except Exception as e:
                print(name, 'ERR', str(e)[:80])
            await ctx.close()
        await b.close()
asyncio.run(main())
