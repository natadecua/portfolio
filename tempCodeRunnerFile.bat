@echo off
setlocal

:: Define directories
set "PYTHON_SERVER_DIR=.\python-server"
set "NODE_SERVER_DIR=.\server"
set "REACT_APP_DIR=.\react"

:: Start the Python HTTP server
echo Starting Python HTTP server...
cd /d "%PYTHON_SERVER_DIR%"
start /b python -m http.server 5000
set "PYTHON_PID="
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :5000') do set "PYTHON_PID=%%i"
echo Python HTTP server started on port 5000 (PID: %PYTHON_PID%)

:: Start the Node.js server
echo Starting Node.js server...
cd /d "%NODE_SERVER_DIR%"
start /b npm start
set "NODE_PID="
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :4000') do set "NODE_PID=%%i"
echo Node.js server started on port 4000 (PID: %NODE_PID%)

:: Start the React app
echo Starting React app...
cd /d "%REACT_APP_DIR%"
start /b npm start
set "REACT_PID="
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :3000') do set "REACT_PID=%%i"
echo React app started on port 3000 (PID: %REACT_PID%)

:: Keep the batch file open
echo Services started. Press Ctrl+C to stop.
pause
