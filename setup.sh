#!/bin/bash

echo "==============================================="
echo "ASP.NET Core + React SPA - Setup Script"
echo "==============================================="
echo

echo "[1/5] Checking prerequisites..."

# Check .NET
if ! command -v dotnet &> /dev/null; then
    echo "ERROR: .NET SDK not found. Please install .NET 8 SDK first."
    echo "Download from: https://dotnet.microsoft.com/download/dotnet/8.0"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ .NET SDK found"
echo "✓ Node.js found"
echo

echo "[2/5] Restoring .NET packages..."
dotnet restore
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to restore .NET packages"
    exit 1
fi
echo "✓ .NET packages restored"
echo

echo "[3/5] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install npm packages"
    exit 1
fi
cd ..
echo "✓ Frontend dependencies installed"
echo

echo "[4/5] Building frontend for production..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build frontend"
    exit 1
fi
cd ..
echo "✓ Frontend built successfully"
echo

echo "[5/5] Setting up database..."
echo "IMPORTANT: Make sure MySQL is running and credentials are configured in appsettings.json"
echo
read -p "Would you like to run database migrations now? [y/N]: " choice
case "$choice" in 
  y|Y ) 
    dotnet ef database update
    if [ $? -ne 0 ]; then
        echo "WARNING: Database update failed. Please check your MySQL connection."
    else
        echo "✓ Database updated successfully"
    fi
    ;;
  * ) 
    echo "Skipping database setup. Run 'dotnet ef database update' manually when ready."
    ;;
esac

echo
echo "==============================================="
echo "Setup completed successfully! 🎉"
echo "==============================================="
echo
echo "To run the application:"
echo "  dotnet run"
echo
echo "Or for development with hot reload:"
echo "  dotnet watch run"
echo
echo "The application will be available at:"
echo "  - https://localhost:5001"
echo "  - http://localhost:5000"
echo