import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/bun";
import { isSpoofedBot } from "@arcjet/inspect";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 3,
      interval: 60,
      capacity: 5,
    }),
  ],
});

async function sendEmailViaEmailJS(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const emailjsData = {
    service_id: process.env.VITE_APP_EMAILJS_SERVICE_ID || "service_q9ggjli",
    template_id: process.env.VITE_APP_EMAILJS_TEMPLATE_ID || "template_88kl7z5",
    user_id: process.env.VITE_APP_EMAILJS_PUBLIC_KEY || "f7TYbUBZM0menDfCp",
    template_params: {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Agathian",
      to_email: "agathianmathivanan@gmail.com",
      reply_to: formData.email,
    }
  };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailjsData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS API error: ${response.status} - ${errorText}`);
  }

  const result = await response.text();
  return { 
    success: true, 
    messageId: result || `emailjs_${Date.now()}`,
    service: "EmailJS" 
  };
}

export default aj.handler(async (req) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: "Method not allowed", type: "method_error" }), 
      { status: 405, headers: corsHeaders }
    );
  }

  const decision = await aj.protect(req, { requested: 1 });
  
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please wait before sending another message.",
          retryAfter: decision.reason.resetTime,
          type: "rate_limit"
        }), 
        { status: 429, headers: corsHeaders }
      );
    }
    return new Response(
      JSON.stringify({ error: "Request forbidden", type: "forbidden" }), 
      { status: 403, headers: corsHeaders }
    );
  }

  if (decision.results.some(isSpoofedBot)) {
    return new Response(
      JSON.stringify({ error: "Spoofed bot detected", type: "spoofed_bot" }), 
      { status: 403, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: "Please fill in all fields",
          type: "validation_error" 
        }), 
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: "Please enter a valid email address",
          type: "validation_error" 
        }), 
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await sendEmailViaEmailJS({ name, email, message });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully! I'll get back to you soon.",
        messageId: result.messageId,
        service: result.service,
        timestamp: new Date().toISOString()
      }), 
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    let errorMessage = "Failed to send message. Please try again.";
    if (error.message.includes("EmailJS")) {
      errorMessage = "Email service temporarily unavailable. Please try again or contact me directly.";
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        type: "server_error"
      }), 
      { status: 500, headers: corsHeaders }
    );
  }
});
