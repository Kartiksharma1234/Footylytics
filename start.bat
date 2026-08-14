@echo off
REM Start script for World Cup Explorer

echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm run dev

pause
