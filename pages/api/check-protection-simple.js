// Simple protection check without Arcjet for testing
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple rate limiting simulation
  const now = Date.now();
  const userAgent = req.headers['user-agent'] || '';
  
  // Basic bot detection
  if (userAgent.includes('bot') || userAgent.includes('curl')) {
    return res.status(403).json({
      error: "Bot requests are not allowed",
      type: "bot_detected"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Protection check passed",
    timestamp: new Date().toISOString(),
    protection: "basic"
  });
}
