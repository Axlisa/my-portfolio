#!/bin/bash

echo "🧪 Testing Arcjet + EmailJS Configuration..."

# Check if required files exist
echo "📁 Checking files..."
if [ ! -f "index.ts" ]; then
    echo "❌ Missing index.ts"
    exit 1
fi

if [ ! -f ".env.local" ]; then
    echo "❌ Missing .env.local"
    exit 1
fi

# Check environment variables
echo "🔧 Checking environment variables..."
if ! grep -q "ARCJET_KEY=" .env.local; then
    echo "❌ Missing ARCJET_KEY in .env.local"
    exit 1
fi

if ! grep -q "VITE_APP_EMAILJS_PUBLIC_KEY=" .env.local; then
    echo "❌ Missing EmailJS configuration in .env.local"
    exit 1
fi

echo "✅ Environment variables configured"

# Build React app
echo "🏗️  Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build React app"
    exit 1
fi

echo "✅ Build successful"

# Test API endpoint
echo "🧪 Starting server for testing..."
bun run index.ts &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test API endpoint
echo "🔌 Testing API endpoint..."
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}' \
  | python3 -m json.tool

# Clean up
kill $SERVER_PID

echo "🎉 Test completed! Check the output above for results."
