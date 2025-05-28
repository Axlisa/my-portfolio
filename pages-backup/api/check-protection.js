import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
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

export default aj.handler(async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      type: 'method_error' 
    });
  }

  try {
    console.log("🛡️ Arcjet protection check requested");
    
    // Arcjet decision is already made by the wrapper
    const decision = req.arcjet;
    
    if (decision?.isDenied()) {
      console.log("🚫 Request blocked by Arcjet:", decision.reason);
      
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests. Please wait before sending another message.",
          retryAfter: decision.reason.resetTime,
          type: "rate_limit"
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot requests are not allowed",
          type: "bot_detected"
        });
      } else if (decision.reason.isShield()) {
        return res.status(403).json({
          error: "Request blocked by security shield",
          type: "shield_blocked"
        });
      } else {
        return res.status(403).json({
          error: "Request forbidden",
          type: "forbidden"
        });
      }
    }

    console.log("✅ Arcjet protection passed");
    
    return res.status(200).json({
      success: true,
      message: "Arcjet protection check passed",
      timestamp: new Date().toISOString(),
      protection: "arcjet"
    });

  } catch (error) {
    console.error('❌ Error in Arcjet protection:', error);
    
    return res.status(500).json({
      error: "Security check failed",
      type: "server_error"
    });
  }
});
