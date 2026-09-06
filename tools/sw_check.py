"""Has anything under js/ or css/ changed since the last CACHE bump?
(fix day Build 6, 2026-09-06)

WHY THIS EXISTS. Since Build 6 the service worker serves app code CACHE-FIRST
for up to 7 days. That makes the `const CACHE = "mhq-vNN"` line in sw.js
load-bearing: activate deletes every cache that is not the current one, so the
bump is the thing that makes a deploy land. Push new code without bumping and
learners keep running the old code until the 7-day age limit expires it, file
by file, which is exactly the "the deploy is live but she still sees
yesterday's app" bug the old network-first strategy was written to kill.

WHAT IT CHECKS. It finds the commit that last changed the CACHE line in sw.js,
then diffs js/ and css/ from that commit to the WORKING TREE (so uncommitted
edits count too). Nothing changed: prints OK, exits 0. Something changed:
lists the files and exits 1, meaning bump CACHE before pushing.

usage: python tools/sw_check.py
   (run it from anywhere; it works out the repo root itself)

Exit codes: 0 = safe to push, 1 = bump CACHE first (or the check could not run).
"""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SW = os.path.join(ROOT, "sw.js")
CACHE_LINE = r"^const CACHE = "
WATCHED = ["js", "css"]


def git(*args):
    """Run a git command in the repo root and return its stdout, stripped."""
    out = subprocess.run(["git", "-C", ROOT] + list(args),
                         capture_output=True, text=True, encoding="utf-8", errors="replace")
    if out.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {(out.stderr or '').strip()[:200]}")
    return (out.stdout or "").strip()


def main():
    # what the file says right now
    try:
        with open(SW, encoding="utf-8") as f:
            here = re.search(r'^const CACHE = "([^"]+)";', f.read(), re.M)
    except OSError as e:
        print(f"CANNOT CHECK: {e}")
        return 1
    if not here:
        print("CANNOT CHECK: no `const CACHE = \"...\";` line in sw.js")
        return 1
    cache = here.group(1)

    # the commit that last touched that line. -G matches a commit whose diff of
    # sw.js added or removed a line matching the regex, which is exactly what a
    # bump does (one line out, one line in).
    try:
        sha = git("log", "-1", "--format=%H", "-G", CACHE_LINE, "--", "sw.js")
    except RuntimeError as e:
        print(f"CANNOT CHECK: {e}")
        return 1
    if not sha:
        print("CANNOT CHECK: no commit in history changes the CACHE line in sw.js")
        return 1
    when = git("log", "-1", "--format=%h %ad %s", "--date=short", sha)

    # everything under js/ and css/ that differs between that commit and the
    # working tree: committed changes since, plus anything not committed yet
    changed = [p for p in git("diff", "--name-only", sha, "--", *WATCHED).splitlines() if p.strip()]
    untracked = [p for p in git("ls-files", "--others", "--exclude-standard", "--", *WATCHED).splitlines() if p.strip()]

    print(f"CACHE = {cache}")
    print(f"last bumped by  {when}")

    if not changed and not untracked:
        print(f"OK  nothing under {'/ or '.join(WATCHED)}/ has changed since that bump: safe to push")
        return 0

    total = len(changed) + len(untracked)
    print(f"BUMP CACHE FIRST  {total} file(s) under js/ or css/ changed since that bump:")
    for p in changed:
        print("  changed    " + p)
    for p in untracked:
        print("  new file   " + p)
    print("\nEdit the `const CACHE` line in sw.js (mhq-vNN -> mhq-v[NN+1]) and run this again.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
