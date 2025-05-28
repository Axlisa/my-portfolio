#!/bin/bash

echo "🧪 Testing Arcjet Configuration..."

# Check if Bun is available
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first."
    exit 1
fi

# Check if all required files exist
FILES=("index.ts" "package.json" ".env.local" "src/components/Contact.jsx")
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing file: $file"
        exit 1
    fi
done

echo "✅ All required files are present"

# Check if Arcjet key is set
if grep -q "ARCJET_KEY=" .env.local; then
    echo "✅ Arcjet key is configured"
else
    echo "❌ Arcjet key is missing in .env.local"
    exit 1
fi

# Build the React app
echo "🏗️  Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ React app built successfully"
else
    echo "❌ Failed to build React app"
    exit 1
fi

echo "🎉 Configuration test passed! You can now run:"
echo "   npm run start    # Start the full-stack app"
echo "   npm run dev      # Start Vite dev server only"
