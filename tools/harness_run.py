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
                await pg.goto(f"http://localhost:5191/{name}.html", wait_until="load", timeout=120000)
                for _ in range(400):
                    txt=await pg.evaluate("document.body.innerText")
                    if re.search(r'ALL GOOD|checks passed|\d+/\d+ passed|✗|FAIL', txt): break
                    await pg.wait_for_timeout(3000)
                txt=await pg.evaluate("document.body.innerText")
                lines=[l for l in txt.split('\n') if re.search(r'passed|FAIL', l)]
                print(f"{name:20} {lines[-1][:100] if lines else txt[:100]!r}  errs={errs[:1]}", flush=True)
            except Exception as e: print(name, 'ERR', str(e)[:80], flush=True)
            await ctx.close()
        await b.close()
asyncio.run(main())
