# Contact Form Setup Guide

## Problem Identified
Your contact form was not working because it's missing the required EmailJS configuration. The form was trying to send emails but couldn't connect to the email service.

## What I've Fixed

### 1. Updated Contact Component
- ✅ Added proper form validation
- ✅ Improved error handling with specific error messages
- ✅ Added loading states and visual feedback
- ✅ Better email template parameters
- ✅ Added status indicators for success/error states

### 2. Created Configuration Files
- ✅ Added `.env.example` file with required environment variables
- ✅ Enhanced security by checking for missing configuration

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Configure EmailJS Service
1. **Create Email Service:**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note down your **Service ID**

2. **Create Email Template:**
   - Go to Email Templates → Create New Template
   - Use this template content:
   ```
   Subject: New Portfolio Contact Message from {{from_name}}
   
   You have received a new message from your portfolio contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   This message was sent from your portfolio contact form.
   Reply to: {{reply_to}}
   ```
   - Note down your **Template ID**

3. **Get Public Key:**
   - Go to Account → General
   - Copy your **Public Key**

### Step 3: Set Up Environment Variables
1. Create a `.env` file in your project root:
   ```bash
   touch .env
   ```

2. Add your EmailJS credentials to `.env`:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_APP_TO_EMAIL=agathianmathivanan@gmail.com
   VITE_APP_TO_NAME=Agathian
   ```

### Step 4: Test the Contact Form
1. Run your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section
3. Fill out and submit a test message
4. Check your email inbox (and spam folder)

## Important Notes

### Security
- ✅ Never commit your `.env` file to Git
- ✅ The `.env` file is already in your `.gitignore`
- ✅ For production deployment on Vercel, add environment variables in your Vercel dashboard

### Deployment on Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each environment variable from your `.env` file
4. Redeploy your project

### Troubleshooting

**If emails still don't arrive:**
1. Check your spam/junk folder
2. Verify all environment variables are correct
3. Check the browser console for errors
4. Ensure your EmailJS service is properly configured
5. Test with a different email address

**Common Issues:**
- Wrong Service ID, Template ID, or Public Key
- Email service not properly authenticated
- Template variables don't match the code
- Environment variables not loaded in production

## Testing Checklist
- [ ] EmailJS account created and verified
- [ ] Email service configured
- [ ] Email template created with correct variables
- [ ] Environment variables added to `.env` file
- [ ] Contact form submits without errors
- [ ] Email received in inbox
- [ ] Environment variables added to Vercel (for production)

## Support
If you continue to have issues:
1. Check the browser console for error messages
2. Verify your EmailJS dashboard shows successful sends
3. Test with a simple email template first
4. Contact EmailJS support if service issues persist

---
Your contact form should now work properly! 🎉
