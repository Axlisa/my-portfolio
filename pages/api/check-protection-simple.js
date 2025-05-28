// Debug version of protection check
export default function handler(req, res) {
  console.log("🔍 API called with method:", req.method);
  console.log("🔍 Headers:", req.headers);
  
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      console.log("🔍 Handling OPTIONS request");
      return res.status(200).json({ message: "CORS preflight" });
    }

    if (req.method !== 'POST') {
      console.log("🔍 Method not allowed:", req.method);
      return res.status(405).json({ 
        error: 'Method not allowed',
        method: req.method,
        type: 'method_error'
      });
    }

    console.log("🔍 Processing POST request");
    
    // Get request body
    const body = req.body;
    console.log("🔍 Request body:", body);

    // Simple rate limiting simulation
    const now = Date.now();
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    
    console.log("🔍 User Agent:", userAgent);
    console.log("🔍 IP:", ip);
    
    // Basic bot detection
    if (userAgent.toLowerCase().includes('bot') || userAgent.toLowerCase().includes('curl')) {
      console.log("🚫 Bot detected");
      return res.status(403).json({
        error: "Bot requests are not allowed",
        type: "bot_detected",
        userAgent: userAgent
      });
    }

    console.log("✅ Protection check passed");
    
    return res.status(200).json({
      success: true,
      message: "Protection check passed",
      timestamp: new Date().toISOString(),
      protection: "basic",
      debug: {
        method: req.method,
        userAgent: userAgent.substring(0, 50),
        ip: ip
      }
    });

  } catch (error) {
    console.error("❌ Error in API:", error);
    return res.status(500).json({
      error: "Internal server error",
      type: "server_error",
      details: error.message
    });
  }
}
