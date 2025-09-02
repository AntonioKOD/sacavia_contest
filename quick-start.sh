#!/bin/bash

# Quick Start Script for Sacavia Contest App
# This script quickly sets up and runs the contest app

echo "🚀 Quick starting Sacavia Contest App..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the contest-app directory"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  IMPORTANT: Please edit .env.local with your configuration before continuing"
    echo "   - Set NEXT_PUBLIC_MAIN_APP_URL to your main Sacavia app URL"
    echo "   - Set NEXT_PUBLIC_API_BASE_URL to your main app's API URL"
    echo ""
    read -p "Press Enter after editing .env.local to continue..."
fi

# Start the development server
echo "🎯 Starting development server..."
echo "📍 The app will be available at: http://localhost:3001"
echo "🔗 Main app API: $(grep 'NEXT_PUBLIC_API_BASE_URL' .env.local | cut -d'=' -f2)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
