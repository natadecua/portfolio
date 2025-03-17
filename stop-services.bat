@echo off
setlocal

:: Define ports for the services
set "PYTHON_PORT=8000"
set "NODE_PORT=4000"
set "REACT_PORT=3001"

:: Find and kill the Python HTTP server process
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :%PYTHON_PORT%') do (
    echo Stopping Python HTTP server on port %PYTHON_PORT% (PID: %%i)
    taskkill /PID %%i /F
)

:: Find and kill the Node.js server process
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :%NODE_PORT%') do (
    echo Stopping Node.js server on port %NODE_PORT% (PID: %%i)
    taskkill /PID %%i /F
)

:: Find and kill the React app process
for /f "tokens=5" %%i in ('netstat -aon ^| findstr :%REACT_PORT%') do (
    echo Stopping React app on port %REACT_PORT% (PID: %%i)
    taskkill /PID %%i /F
)

echo All services have been stopped.
pause
