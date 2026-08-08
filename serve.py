"""Serve this folder to the browser, and open a page in it.

WHY: the dressing room (and verify-store) cannot be opened by
double-clicking the .html file. A browser refuses to let a page opened
straight off the disk read image data or load the app's modules, so the
page just sits there saying "loading". It has to be SERVED.

Nobody should have to remember a command line for that, hence this file
and the dressing-room.bat next to it. Double-click the .bat.

    python serve.py                      -> dressing room on port 5250
    python serve.py 5251                 -> different port, if 5250 is busy
    python serve.py 5250 verify-store.html

Same idea as circle-geometry-game/serve.py.
"""
import http.server
import os
import sys
import threading
import webbrowser

args = [a for a in sys.argv[1:] if a != "--no-open"]
OPEN_BROWSER = "--no-open" not in sys.argv   # skip when a tab is already open
PORT = int(args[0]) if len(args) > 0 else 5250
PAGE = args[1] if len(args) > 1 else "dressing-room.html"

# Serve the folder this file lives in, whatever directory it was launched
# from — double-clicking a .bat can start you somewhere else entirely.
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Quiet(http.server.SimpleHTTPRequestHandler):
    """Same as the default, minus a log line for every image."""

    def log_message(self, *args):
        pass


class Server(http.server.ThreadingHTTPServer):
    """THREADING matters. A plain single-threaded server answers the first
    request and then stalls: a browser opens several connections at once for
    a page's scripts and images, and it holds them open. Tested — the .html
    arrived and every module and PNG after it timed out. `python -m
    http.server` threads for this exact reason."""

    allow_reuse_address = True  # so a restart right after a stop isn't refused
    daemon_threads = True       # closing the window doesn't leave threads behind


def main():
    url = f"http://localhost:{PORT}/{PAGE}"
    try:
        httpd = Server(("", PORT), Quiet)
    except OSError:
        print(f"\n  Port {PORT} is already busy.")
        print(f"  Either something is already serving here — try opening")
        print(f"      {url}")
        print(f"  — or run this again with a different number, e.g.")
        print(f"      python serve.py {PORT + 1}\n")
        input("  Press Enter to close. ")
        return

    with httpd:
        if OPEN_BROWSER:
            threading.Timer(0.4, lambda: webbrowser.open(url)).start()
        print(f"\n  Serving  {os.getcwd()}")
        print(f"  {'Opening ' if OPEN_BROWSER else 'Visit   '} {url}")
        print("\n  KEEP THIS WINDOW OPEN while you use the page.")
        print("  Press Ctrl+C, or just close the window, when you are done.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Stopped.\n")


if __name__ == "__main__":
    main()
