@echo off
REM Double-click this to open the dressing room.
REM It starts a little web server for this folder and opens the page.
REM A browser will not run the page properly straight off the disk,
REM which is why opening the .html on its own just says "loading".
cd /d "%~dp0"
title Blipwork dressing room - keep this window open
python serve.py 5250 dressing-room.html
echo.
echo   The server has stopped. You can close this window now.
echo.
pause
