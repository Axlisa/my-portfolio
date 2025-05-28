// Simple test server without Arcjet for debugging
import { file } from "bun";

console.log("🚀 Starting simple test server...");

const server = Bun.serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);
    console.log(`📝 Request: ${req.method} ${url.pathname}`);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      console.log("🔌 API route accessed:", url.pathname);
      
      // Add CORS headers
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
      }

      if (url.pathname === '/api/contact' && req.method === 'POST') {
        try {
          const body = await req.json();
          console.log("📧 Contact form data received:", body);
          
          const { name, email, message } = body;

          // Basic validation
          if (!name || !email || !message) {
            return new Response(
              JSON.stringify({ error: "Missing required fields" }), 
              { status: 400, headers }
            );
          }

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return new Response(
              JSON.stringify({ error: "Invalid email format" }), 
              { status: 400, headers }
            );
          }

          // Simulate processing
          console.log("✅ Form processed successfully");
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: "Your message has been sent successfully!",
              timestamp: new Date().toISOString()
            }), 
            { status: 200, headers }
          );

        } catch (error) {
          console.error("❌ Error processing contact form:", error);
          return new Response(
            JSON.stringify({ error: "Internal server error" }), 
            { status: 500, headers }
          );
        }
      }

      return new Response(
        JSON.stringify({ error: "API endpoint not found" }), 
        { status: 404, headers }
      );
    }

    // Serve static files
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
      console.error("❌ Error serving files:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
});

console.log(`✅ Server running at http://localhost:${server.port}`);
console.log("🔧 Test mode - No Arcjet protection");
console.log("📁 Serving React app from ./dist");
console.log("🔌 API endpoints available at /api/*");
