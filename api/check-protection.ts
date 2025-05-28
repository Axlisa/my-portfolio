import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects against common attacks
    shield({ mode: "LIVE" }),
    // Bot detection - allow search engines
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Rate limiting for contact forms
    tokenBucket({
      mode: "LIVE",
      refillRate: 3, // 3 tokens per interval
      interval: 60, // 60 seconds
      capacity: 5, // Maximum 5 tokens
    }),
  ],
});

export default async function handler(req: NextRequest) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method not allowed', type: 'method_error' },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    // Apply Arcjet protection
    const decision = await aj.protect(req, { requested: 1 });
    
    console.log("🛡️ Arcjet decision:", decision.conclusion);

    if (decision.isDenied()) {
      console.log("🚫 Request blocked by Arcjet:", decision.reason);
      
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { 
            error: "Too many requests. Please wait before sending another message.",
            retryAfter: decision.reason.resetTime,
            type: "rate_limit"
          },
          { status: 429, headers: corsHeaders }
        );
      } else if (decision.reason.isBot()) {
        return NextResponse.json(
          { 
            error: "Bot requests are not allowed",
            type: "bot_detected" 
          },
          { status: 403, headers: corsHeaders }
        );
      } else if (decision.reason.isShield()) {
        return NextResponse.json(
          { 
            error: "Request blocked by security shield",
            type: "shield_blocked" 
          },
          { status: 403, headers: corsHeaders }
        );
      } else {
        return NextResponse.json(
          { 
            error: "Request forbidden",
            type: "forbidden" 
          },
          { status: 403, headers: corsHeaders }
        );
      }
    }

    console.log(`✅ Arcjet protection passed`);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Arcjet protection check passed",
        timestamp: new Date().toISOString(),
        protection: "arcjet"
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('❌ Error in Arcjet protection:', error);
    
    return NextResponse.json(
      { 
        error: "Security check failed",
        type: "server_error" 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const config = {
  runtime: 'nodejs',
  regions: ['iad1'], // Washington DC - closest to your deployment
}
