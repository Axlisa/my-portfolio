// Vercel Serverless Function - Protection Check
export default function handler(req, res) {
  console.log("🔍 Protection API called");
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log("🔍 Handling OPTIONS");
    return res.status(200).json({ message: 'CORS OK' });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    console.log("🔍 Method not allowed:", req.method);
    return res.status(405).json({ 
      error: 'Method not allowed',
      method: req.method 
    });
  }

  try {
    console.log("🔍 Processing protection check");
    
    // Get user info
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    
    console.log("🔍 User Agent:", userAgent.substring(0, 50));
    console.log("🔍 IP:", ip);
    
    // Simple bot detection
    const suspiciousBots = ['bot', 'curl', 'wget', 'python', 'scrapy'];
    const isBot = suspiciousBots.some(bot => 
      userAgent.toLowerCase().includes(bot)
    );
    
    if (isBot) {
      console.log("🚫 Bot detected");
      return res.status(403).json({
        error: "Bot requests are not allowed",
        type: "bot_detected"
      });
    }

    console.log("✅ Protection check passed");
    
    return res.status(200).json({
      success: true,
      message: "Protection check passed",
      timestamp: new Date().toISOString(),
      protection: "basic",
      vercel: true
    });

  } catch (error) {
    console.error("❌ Error in protection API:", error);
    return res.status(500).json({
      error: "Internal server error",
      type: "server_error",
      details: error.message
    });
  }
}
