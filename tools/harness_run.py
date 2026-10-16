import asyncio, re, sys
from playwright.async_api import async_playwright
pages=sys.argv[1:]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for name in pages:
            ctx=await b.new_context(viewport={"width":375,"height":812}); pg=await ctx.new_page()
            errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:100]))
            try:
                base,_,query=name.partition("?")   # "verify-exam?lang=af": .html goes before the ?
                await pg.goto(f"http://localhost:5191/{base}.html"+(f"?{query}" if query else ""), wait_until="load", timeout=120000)
                prev=None
                for _ in range(400):
                    txt=await pg.evaluate("document.body.innerText")
                    # the final banner ends the wait at once; the older markers only once the page
                    # text has stopped changing (verify-exam prints "n/n passed" sub-lines long before
                    # its banner, and the old loop left on the first of them: S1 review, 2026-10-16)
                    if re.search(r'ALL GOOD|check\(s\) failed|checks FAILED', txt): break
                    if re.search(r'checks passed|\d+/\d+ passed|✗|FAIL', txt) and txt==prev: break
                    prev=txt
                    await pg.wait_for_timeout(3000)
                txt=await pg.evaluate("document.body.innerText")
                allm=[l for l in txt.split('\n') if re.search(r'passed|FAIL', l)]
                # the page's own banner first (ALL GOOD / n check(s) failed / n of m checks FAILED):
                # verify-exam's LAST 'passed' line is prose and once hid a red run (S1 review, 2026-10-16)
                ban=[l for l in txt.split('\n') if re.search(r'ALL GOOD|check\(s\) failed|checks FAILED|FAILED', l)]
                lines=ban[:1] if ban else allm
                print(f"{name:20} {(lines[0] if ban else lines[-1])[:100] if lines else txt[:100]!r}  errs={errs[:1]}", flush=True)
            except Exception as e: print(name, 'ERR', str(e)[:80], flush=True)
            await ctx.close()
        await b.close()
asyncio.run(main())
