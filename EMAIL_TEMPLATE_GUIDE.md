# EmailJS Template Setup

## Template Variables to Use:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email  
- {{message}} - The message content
- {{to_name}} - Your name (Agathian)
- {{to_email}} - Your email (agathianmathivanan@gmail.com)
- {{reply_to}} - Reply to sender's email

## Recommended Email Template:

**Subject Line:**
```
New Portfolio Contact: {{from_name}}
```

**Email Body:**
```
Hello {{to_name}},

You have received a new message through your portfolio contact form.

FROM: {{from_name}} ({{from_email}})
MESSAGE:
{{message}}

---
Sent from your portfolio website contact form.
Reply directly to this email to respond.
```

This template will create clear, professional emails in your inbox.
