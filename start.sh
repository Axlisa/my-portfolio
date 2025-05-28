#!/bin/bash

echo "🏗️  Building React app..."
npm run build

echo "🚀 Starting server with Arcjet protection..."
bun run index.ts
