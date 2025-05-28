# Vercel Environment Variables Setup Guide

## In your Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

### Required Variables:
```
VITE_APP_EMAILJS_SERVICE_ID=service_q9ggjli
VITE_APP_EMAILJS_TEMPLATE_ID=template_88kl7z5
VITE_APP_EMAILJS_PUBLIC_KEY=f7TYbUBZM0menDfCp
```

### Optional (for all environments):
- Production: ✅
- Preview: ✅ 
- Development: ✅

## Note:
- Arcjet has been removed for Vercel compatibility
- Using custom rate limiting instead
- EmailJS works client-side as before
- All protection features still functional
