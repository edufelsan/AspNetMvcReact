@echo off
echo ===============================================
echo ASP.NET Core + React SPA - Setup Script
echo ===============================================
echo.

echo [1/5] Checking prerequisites...
where dotnet >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: .NET SDK not found. Please install .NET 8 SDK first.
    echo Download from: https://dotnet.microsoft.com/download/dotnet/8.0
    pause
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ .NET SDK found
echo ✓ Node.js found
echo.

echo [2/5] Restoring .NET packages...
dotnet restore
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to restore .NET packages
    pause
    exit /b 1
)
echo ✓ .NET packages restored
echo.

echo [3/5] Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to install npm packages
    pause
    exit /b 1
)
cd ..
echo ✓ Frontend dependencies installed
echo.

echo [4/5] Building frontend for production...
cd frontend
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)
cd ..
echo ✓ Frontend built successfully
echo.

echo [5/5] Setting up database...
echo IMPORTANT: Make sure MySQL is running and credentials are configured in appsettings.json
echo.
echo Would you like to run database migrations now? [Y/N]
set /p choice=
if /i "%choice%"=="Y" (
    dotnet ef database update
    if %ERRORLEVEL% neq 0 (
        echo WARNING: Database update failed. Please check your MySQL connection.
    ) else (
        echo ✓ Database updated successfully
    )
)

echo.
echo ===============================================
echo Setup completed successfully! 🎉
echo ===============================================
echo.
echo To run the application:
echo   dotnet run
echo.
echo Or for development with hot reload:
echo   dotnet watch run
echo.
echo The application will be available at:
echo   - https://localhost:5001
echo   - http://localhost:5000
echo.
pause