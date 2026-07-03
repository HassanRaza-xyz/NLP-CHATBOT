@echo off
echo =========================================
echo    Starting Smart NLP Chatbot...
echo =========================================

echo.
echo Starting Server...
start "Chatbot Server" cmd /c "cd backend && python app.py"

echo Opening Browser...
timeout /t 3 /nobreak >nul
start http://localhost:5000

echo.
echo =========================================
echo    Chatbot is running successfully!
echo =========================================
pause
