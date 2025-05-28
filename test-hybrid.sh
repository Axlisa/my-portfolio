#!/bin/bash

echo "🧪 Testing Hybrid Arcjet + EmailJS Setup"
echo "========================================"

echo "1. Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

echo ""
echo "2. Starting server..."
echo "   🔗 Open http://localhost:3000 in your browser"
echo "   📝 Try submitting the contact form"
echo "   🛡️ Try submitting multiple times quickly to test rate limiting"
echo ""
echo "Server logs will show:"
echo "   - 🛡️ Arcjet protection decisions"
echo "   - 📧 Email sending attempts"
echo "   - 🚫 Any blocked requests"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

bun run index.ts
