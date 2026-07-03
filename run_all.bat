@echo off
setlocal
echo ============================================================
echo    Smart NLP Chatbot - Diagnostic Startup
echo ============================================================
echo.

:: 1. Check for Frontend Dependencies
if not exist "frontend\node_modules\" (
    echo [!] Frontend node_modules missing. Installing...
    cd frontend && call npm install
    cd ..
)

:: 2. Start the Flask Backend (Using /k to keep window open if it fails)
echo [STEP 1/2] Starting Backend API...
start "Backend Server (Flask)" cmd /k "echo Starting Backend... && cd backend && python app.py"

:: 3. Start the React Frontend (Using /k to keep window open if it fails)
echo [STEP 2/2] Starting Frontend UI...
start "Frontend UI (Vite)" cmd /k "echo Starting Frontend... && cd frontend && npm run dev"

:: 4. Launch Browser
echo.
echo [INFO] Waiting 5 seconds for servers...
timeout /t 5 /nobreak >nul
echo [INFO] Opening Browser: http://localhost:5173
start http://localhost:5173

echo.
echo ============================================================
echo    CHECK THE TWO NEW WINDOWS FOR ERRORS!
echo    If a window says 'command not found', let me know.
echo ============================================================
echo.
pause
