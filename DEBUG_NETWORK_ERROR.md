# Quick Debug Guide

## The Problem
You're getting "Network error" when submitting the contact form because the API endpoint isn't accessible.

## Solution Steps

### Option 1: Test Mode (Easiest)
1. Install concurrently:
   ```bash
   npm install concurrently --save-dev
   ```

2. Build the React app:
   ```bash
   npm run build
   ```

3. Run in test mode:
   ```bash
   npm run test
   ```
   This runs both the test server (port 3000) and Vite dev server (port 5173)

4. Open your browser to `http://localhost:5173` and test the contact form

### Option 2: Full Production Mode
1. Build the React app:
   ```bash
   npm run build
   ```

2. Start the full server:
   ```bash
   npm run start
   ```

3. Open your browser to `http://localhost:3000`

### Option 3: Debug Individual Components
**Test Backend Only:**
```bash
bun run test-server.ts
```
Then test API directly: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","message":"Hello"}'`

**Test Frontend Only:**
```bash
npm run dev:frontend
```

## Current Status Check
- Are you running `npm run dev` (Vite only)?
- Or `npm run start` (Full server)?
- What port is your browser showing? (5173 or 3000?)

The Vite proxy should forward `/api/*` requests from port 5173 to port 3000.
