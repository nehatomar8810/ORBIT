@echo off
echo Starting ORBIT Agent Frontend and Backend...
echo.

echo Starting WebSocket Server (Backend)...
start "WebSocket Server" python websocket_server.py

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
cd frontend
start "Frontend Dev Server" npm run dev

echo.
echo Both servers are starting up...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
