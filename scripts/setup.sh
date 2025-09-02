#!/bin/bash

# Contest App Setup Script
# This script sets up the development environment for the Sacavia Contest App

echo "🎯 Setting up Sacavia Contest App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp env.example .env.local
    echo "⚠️  Please edit .env.local with your configuration values"
else
    echo "✅ .env.local already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p public/images
mkdir -p public/icons
mkdir -p logs

# Set up git hooks (if git is available)
if command -v git &> /dev/null; then
    echo "🔗 Setting up git hooks..."
    npm run prepare 2>/dev/null || echo "⚠️  Git hooks setup skipped"
fi

# Check if the main app is accessible
echo "🔍 Checking main app connectivity..."
MAIN_APP_URL=$(grep "NEXT_PUBLIC_MAIN_APP_URL" .env.local | cut -d'=' -f2)
if [ -n "$MAIN_APP_URL" ]; then
    echo "✅ Main app URL configured: $MAIN_APP_URL"
else
    echo "⚠️  Main app URL not configured in .env.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3001 in your browser"
echo ""
echo "Happy coding! 🚀"
