@echo off
title Deploy Wispr Flow to GitHub
cd /d "%~dp0"
echo ===================================================
echo Pushing Wispr Flow Challenge to GitHub...
echo ===================================================
echo.
"C:\Users\agnel\AppData\Local\Programs\MinGit\cmd\git.exe" push -u origin main
echo.
echo ===================================================
echo DONE!
echo ===================================================
pause
