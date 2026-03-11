#!/usr/bin/env bash
set -e

echo "📦 Installing dependencies..."
npm install --silent

echo "🔨 Building..."
npm run build --silent

echo "✅ Build complete!"
echo ""
echo "🚀 Starting preview server..."
echo ""

npx vite preview --open
