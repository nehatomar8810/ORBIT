Write-Host "Starting ORBIT Agent Frontend and Backend..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting WebSocket Server (Backend)..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "python" -ArgumentList "websocket_server.py"

Write-Host ""
Write-Host "Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Starting Frontend Development Server..." -ForegroundColor Yellow
Set-Location -Path "frontend"
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

Write-Host ""
Write-Host "Both servers are starting up..." -ForegroundColor Green
Write-Host "Backend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
