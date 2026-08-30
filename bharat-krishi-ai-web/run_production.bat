@echo off
echo ===================================================
echo 🌾 Starting Bharat Krishi AI in Production Mode 🌾
echo ===================================================
echo.

echo [1/3] Building frontend static assets...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Frontend build failed. Please check for syntax errors.
    pause
    exit /b %errorlevel%
)
cd ..

echo.
echo [2/3] Verifying backend directory...
cd backend

echo.
echo [3/3] Launching FastAPI standalone server...
echo Access the application at http://localhost:8000
echo.
set PYTHONIOENCODING=utf-8
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Server failed to start.
    pause
)
cd ..
