# Vercel Deployment Guide

## What Changed for Vercel:
- ❌ Removed Arcjet (Bun-specific, not Vercel compatible)
- ✅ Added custom rate limiting (3 requests/minute)
- ✅ Added basic bot detection
- ✅ Kept EmailJS (client-side, works perfectly)
- ✅ Edge function for protection checks

## Deploy Steps:

### 1. Environment Variables (IMPORTANT!)
In Vercel Dashboard → Project → Settings → Environment Variables:
```
VITE_APP_EMAILJS_SERVICE_ID = service_q9ggjli
VITE_APP_EMAILJS_TEMPLATE_ID = template_88kl7z5  
VITE_APP_EMAILJS_PUBLIC_KEY = f7TYbUBZM0menDfCp
```

### 2. Deploy
```bash
git add .
git commit -m "Fix Vercel deployment - replace Arcjet with custom protection"
git push origin main
```

### 3. Verify
- Contact form works ✅
- Rate limiting works (try 4+ rapid submissions) ✅
- Emails are delivered ✅

## Protection Features:
- **Rate Limiting**: 3 requests per minute per IP
- **Bot Detection**: Blocks common bot user agents
- **Input Validation**: Server-side validation
- **CORS Protection**: Proper headers

## Local vs Production:
- **Local**: Use `npm run test` (with full Arcjet)
- **Production**: Vercel Edge Functions (custom protection)
