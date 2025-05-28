# Vercel + Arcjet Deployment Guide

## Environment Variables Setup

### In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables for all environments (Production, Preview, Development):

```
ARCJET_KEY=ajkey_01jwaxbyqdf9xbcdtbmg6vwcah
VITE_APP_EMAILJS_SERVICE_ID=service_q9ggjli
VITE_APP_EMAILJS_TEMPLATE_ID=template_88kl7z5
VITE_APP_EMAILJS_PUBLIC_KEY=f7TYbUBZM0menDfCp
```

## Arcjet Integration Steps:

### 1. Add Arcjet Integration in Vercel:
- Go to Vercel Dashboard → Integrations
- Find and add "Arcjet" integration
- Connect it to your `my-portfolio` project
- This will automatically set up the ARCJET_KEY environment variable

### 2. Arcjet Configuration:
- Site: `my-portfolio`
- Environment: `personal`
- Key: `ajkey_01jwaxbyqdf9xbcdtbmg6vwcah` (already configured)

### 3. Protection Features:
- **Shield**: Protects against common attacks (SQL injection, XSS, etc.)
- **Bot Detection**: Blocks bots while allowing search engines
- **Rate Limiting**: 3 requests per minute per IP for contact form
- **Real-time Protection**: Runs on Vercel Edge Network

## Deploy Process:
1. Set environment variables in Vercel
2. Push code to GitHub
3. Vercel auto-deploys with Arcjet protection
4. Test contact form functionality

## What You Get:
✅ Full Arcjet protection on Vercel
✅ EmailJS for reliable email delivery  
✅ Hybrid architecture (security + functionality)
✅ Real-time bot and attack protection
✅ Rate limiting per IP address
