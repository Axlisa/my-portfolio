import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/bun";
import { isSpoofedBot } from "@arcjet/inspect";
import { env } from "bun";
import { file } from "bun";

const aj = arcjet({
  key: env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 3, // Reduced to 3 requests per minute for contact forms
      interval: 60,
      capacity: 5, // Reduced capacity for stricter rate limiting
    }),
  ],
});

// EmailJS configuration - server-side email sending
async function sendEmailViaEmailJS(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const emailjsData = {
    service_id: "service_q9ggjli",
    template_id: "template_88kl7z5",
    user_id: env.VITE_APP_EMAILJS_PUBLIC_KEY || "f7TYbUBZM0menDfCp",
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

  try {
    console.log("📧 Sending email via EmailJS...");
    
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
    console.log("✅ EmailJS Success:", result);
    
    return { 
      success: true, 
      messageId: result || `emailjs_${Date.now()}`,
      service: "EmailJS" 
    };

  } catch (error) {
    console.error("❌ EmailJS Error:", error);
    throw error;
  }
}

const server = Bun.serve({
  port: 3000,
  fetch: aj.handler(async (req) => {
    const url = new URL(req.url);
    
    // API Routes - Protected by Arcjet
    if (url.pathname.startsWith('/api/')) {
      const decision = await aj.protect(req, { requested: 1 });
      console.log("🛡️ Arcjet decision for API:", decision.conclusion);

      // Add CORS headers for all API responses
      const corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
      }

      if (decision.isDenied()) {
        console.log("🚫 Request blocked:", decision.reason);
        
        if (decision.reason.isRateLimit()) {
          return new Response(
            JSON.stringify({ 
              error: "Too many requests. Please wait before sending another message.",
              retryAfter: decision.reason.resetTime,
              type: "rate_limit"
            }), 
            { status: 429, headers: corsHeaders }
          );
        } else if (decision.reason.isBot()) {
          return new Response(
            JSON.stringify({ 
              error: "Bot requests are not allowed",
              type: "bot_detected" 
            }), 
            { status: 403, headers: corsHeaders }
          );
        } else {
          return new Response(
            JSON.stringify({ 
              error: "Request forbidden",
              type: "forbidden" 
            }), 
            { status: 403, headers: corsHeaders }
          );
        }
      }

      // Check for spoofed bots
      if (decision.results.some(isSpoofedBot)) {
        return new Response(
          JSON.stringify({ 
            error: "Spoofed bot detected",
            type: "spoofed_bot" 
          }), 
          { status: 403, headers: corsHeaders }
        );
      }

      // Handle protection check (for hybrid approach)
      if (url.pathname === '/api/check-protection' && req.method === 'POST') {
        console.log("🛡️ Protection check requested");
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Protection check passed",
            timestamp: new Date().toISOString()
          }), 
          { status: 200, headers: corsHeaders }
        );
      }

      // Handle contact form API
      if (url.pathname === '/api/contact' && req.method === 'POST') {
        try {
          const body = await req.json();
          const { name, email, message } = body;

          // Validation
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

          // Send email via EmailJS
          const result = await sendEmailViaEmailJS({ name, email, message });
          
          console.log("✅ Contact form processed successfully");
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
          console.error("❌ Error processing contact form:", error);
          
          // Specific error handling for EmailJS
          let errorMessage = "Failed to send message. Please try again.";
          if (error.message.includes("EmailJS")) {
            errorMessage = "Email service temporarily unavailable. Please try again or contact me directly.";
          }
          
          return new Response(
            JSON.stringify({ 
              error: errorMessage,
              type: "server_error",
              details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }), 
            { status: 500, headers: corsHeaders }
          );
        }
      }

      return new Response(
        JSON.stringify({ 
          error: "API endpoint not found",
          type: "not_found" 
        }), 
        { status: 404, headers: corsHeaders }
      );
    }

    // Serve static files for React app
    try {
      if (url.pathname === '/') {
        const indexFile = file("./dist/index.html");
        if (await indexFile.exists()) {
          return new Response(indexFile);
        }
      }

      const filePath = `./dist${url.pathname}`;
      const staticFile = file(filePath);
      
      if (await staticFile.exists()) {
        return new Response(staticFile);
      }

      // SPA fallback
      const indexFile = file("./dist/index.html");
      if (await indexFile.exists()) {
        return new Response(indexFile);
      }

      return new Response("File not found", { status: 404 });
      
    } catch (error) {
      console.error("❌ Error serving static files:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }),
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log("🛡️ Protected by Arcjet (Rate Limiting + Bot Detection)");
console.log("📧 Email service: EmailJS");
console.log("📁 Serving React app from ./dist");
console.log("🔌 API endpoints available at /api/*");
