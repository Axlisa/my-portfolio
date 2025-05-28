// Vercel Serverless Function - Simple Test
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'CORS OK' });
  }

  // Return test response
  return res.status(200).json({
    message: "API is working on Vercel!",
    method: req.method,
    timestamp: new Date().toISOString(),
    path: req.url,
    vercel: true
  });
}
