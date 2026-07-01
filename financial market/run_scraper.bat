@echo off
echo ===================================================
echo   LAUNCHING ZSE AUTOMATED MARKET DATA SCRAPER
echo ===================================================
echo Date: %date% | Time: %time%

:: 1. Navigate to your project directory
cd /d "C:\Users\PC\Desktop\projects\Python\financial market"

:: 2. Execute the scraper using your system's Python installation
python scraper.py

echo ===================================================
echo   EXECUTION COMPLETE. CLOSING WINDOW...
echo ===================================================
timeout /t 5