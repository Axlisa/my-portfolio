# 🔧 Contact Form Troubleshooting

## Issue: Form Opens Gmail/Outlook Instead of Sending Directly

This means the EmailJS implementation isn't working properly. Here's how to fix it:

## ✅ **Step 1: Restart Your Development Server**

The most common issue is that environment variables aren't loaded:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ **Step 2: Check Browser Console**

1. Open your contact form
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Submit the form
5. Look for any error messages

**What to look for:**
- "EmailJS Public Key: f7TYbUBZM0menDfCp" (should show your key)
- "Attempting to send email via EmailJS..."
- Any red error messages

## ✅ **Step 3: Verify Your .env File**

Your `.env` file should contain:
```env
VITE_APP_EMAILJS_SERVICE_ID=service_q9ggjli
VITE_APP_EMAILJS_TEMPLATE_ID=template_88kl7z5
VITE_APP_EMAILJS_PUBLIC_KEY=f7TYbUBZM0menDfCp
VITE_APP_TO_EMAIL=agathianmathivanan@gmail.com
VITE_APP_TO_NAME=Agathian
```

## ✅ **Step 4: Check EmailJS Template**

Make sure your EmailJS template includes these variables:
- {{from_name}}
- {{from_email}}
- {{message}}
- {{to_name}}
- {{to_email}}
- {{reply_to}}

## 🚨 **If It Still Opens Email Client:**

This means there might be cached code or the server needs a hard refresh:

1. **Hard refresh:** Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Clear cache:** In DevTools → Application → Storage → Clear site data
3. **Restart server:** Stop and start `npm run dev` again

## 📞 **Quick Test Steps:**

1. Open contact form
2. Fill out the form
3. Open browser console (F12)
4. Click "Send Message"
5. **Should see:** "Attempting to send email via EmailJS..."
6. **Should NOT open:** Gmail/Outlook
7. **Should show:** Success message

Let me know what you see in the browser console!
