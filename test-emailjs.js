// Simple EmailJS test without Arcjet
console.log("🧪 Testing EmailJS directly...");

const testEmail = async () => {
  const emailjsData = {
    service_id: "service_q9ggjli",
    template_id: "template_88kl7z5", 
    user_id: "f7TYbUBZM0menDfCp",
    template_params: {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message",
      time: new Date().toLocaleString(),
      from_name: "Test User",
      from_email: "test@example.com",
      to_name: "Agathian",
      to_email: "agathianmathivanan@gmail.com",
      reply_to: "test@example.com",
    }
  };

  try {
    console.log("📧 Sending test email...");
    console.log("Data:", JSON.stringify(emailjsData, null, 2));
    
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailjsData),
    });

    console.log("Response status:", response.status);
    const responseText = await response.text();
    console.log("Response:", responseText);

    if (response.ok) {
      console.log("✅ EmailJS test successful!");
    } else {
      console.log("❌ EmailJS test failed!");
    }
  } catch (error) {
    console.error("❌ Test error:", error);
  }
};

testEmail();
