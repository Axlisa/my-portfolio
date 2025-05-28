# Vercel Deployment Debug Guide

## Current Issue: 
Deployment failing - likely due to API function configuration

## Step-by-Step Fix:

### 1. First Deploy (Simple Version)
- Using `/api/check-protection-simple` (no Arcjet)
- Just basic protection + EmailJS
- Should deploy successfully

### 2. Environment Variables in Vercel:
```
VITE_APP_EMAILJS_SERVICE_ID=service_q9ggjli
VITE_APP_EMAILJS_TEMPLATE_ID=template_88kl7z5
VITE_APP_EMAILJS_PUBLIC_KEY=f7TYbUBZM0menDfCp
```

### 3. Test Deployment:
```bash
git add .
git commit -m "Fix: Simplify Vercel deployment structure"
git push origin main
```

### 4. Once Working, Add Arcjet:
- Add ARCJET_KEY to Vercel env vars
- Switch to `/api/check-protection` (with Arcjet)
- Redeploy

## Common Issues:
- ❌ Conflicting API directory structures
- ❌ Wrong Next.js API function format
- ❌ Missing environment variables
- ❌ TypeScript vs JavaScript in API functions

## Debug Commands:
```bash
# Check what files are being deployed
npx vercel --debug

# Local Vercel dev server
npx vercel dev
```

## File Structure:
```
pages/
  api/
    check-protection-simple.js  ← Working version
    check-protection.js         ← With Arcjet (after simple works)
src/
  components/
    Contact.jsx                 ← Uses simple version first
```
