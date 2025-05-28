// Simple test endpoint
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: "OPTIONS OK" });
  }
  
  return res.status(200).json({
    message: "API is working!",
    method: req.method,
    timestamp: new Date().toISOString(),
    path: req.url
  });
}
