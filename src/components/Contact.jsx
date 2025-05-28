import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your name' });
      return false;
    }
    if (!form.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your email' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    if (!form.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please enter your message' });
      return false;
    }
    return true;
  };

  const testAPI = async () => {
    try {
      console.log("🧪 Testing API...");
      const response = await fetch('/api/test');
      console.log("🧪 Test Response Status:", response.status);
      
      const text = await response.text();
      console.log("🧪 Test Response Text:", text);
      
      const data = JSON.parse(text);
      console.log("🧪 Test Response JSON:", data);
      
      setSubmitStatus({
        type: 'success',
        message: 'API Test Successful!',
        details: `Response: ${JSON.stringify(data, null, 2)}`
      });
    } catch (error) {
      console.error("🧪 API Test Failed:", error);
      setSubmitStatus({
        type: 'error',
        message: 'API Test Failed',
        details: error.message
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus(null);

    try {
      // Step 1: Check with Arcjet protection first
      console.log("🛡️ Checking Arcjet protection...");
      
      const protectionResponse = await fetch('/api/check-protection-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'contact_form_submit'
        }),
      });

      console.log("🔍 Protection Response Status:", protectionResponse.status);
      console.log("🔍 Protection Response Headers:", Object.fromEntries(protectionResponse.headers.entries()));
      
      const responseText = await protectionResponse.text();
      console.log("🔍 Raw Response:", responseText);

      if (!protectionResponse.ok) {
        let protectionData;
        try {
          protectionData = JSON.parse(responseText);
        } catch (e) {
          console.error("❌ Failed to parse error response as JSON:", responseText);
          setSubmitStatus({ 
            type: 'error', 
            message: 'API returned invalid response. Please try again.',
            details: `Status: ${protectionResponse.status}, Response: ${responseText.substring(0, 100)}...`
          });
          return;
        }
        console.log("🚫 API blocked the request:", protectionData);
        
        let userMessage = protectionData.error || 'Request blocked by security system';
        if (protectionData.type === 'rate_limit') {
          userMessage = "You're sending messages too quickly. Please wait a moment before trying again.";
        }
        
        setSubmitStatus({ 
          type: 'error', 
          message: userMessage,
          details: `Security check: ${protectionData.type}`
        });
        return;
      }

      // Parse successful response
      let protectionData;
      try {
        protectionData = JSON.parse(responseText);
        console.log("✅ Protection API response:", protectionData);
      } catch (e) {
        console.error("❌ Failed to parse success response as JSON:", responseText);
        setSubmitStatus({ 
          type: 'error', 
          message: 'API returned invalid response format.',
          details: `Response: ${responseText.substring(0, 100)}...`
        });
        return;
      }

      console.log("✅ API protection passed, sending email...");

      // Step 2: Send email using client-side EmailJS (original working method)
      const result = await emailjs.send(
        "service_q9ggjli",
        "template_88kl7z5",
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
          from_name: form.name,
          from_email: form.email,
          to_name: "Agathian",
          to_email: "agathianmathivanan@gmail.com",
          reply_to: form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      console.log("✅ EmailJS Success:", result);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Your message has been sent successfully! I\'ll get back to you soon.',
        details: `Email sent via EmailJS at ${new Date().toLocaleTimeString()}`
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 7000);

    } catch (error) {
      console.error("❌ Error:", error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      if (error.text) {
        errorMessage = `EmailJS Error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage,
        details: 'If the problem persists, you can reach me at agathianmathivanan@gmail.com'
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p className="text-secondary text-[14px] mt-4">
          🛡️ Protected by Arcjet • 📧 Powered by EmailJS
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className={`py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition-all duration-200 ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-tertiary hover:bg-tertiary/80'
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Test API Button */}
          <button
            type='button'
            onClick={testAPI}
            className="py-2 px-6 rounded-lg outline-none w-fit text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            🧪 Test API
          </button>

          {/* Enhanced Status Messages */}
          {submitStatus && (
            <div className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
              submitStatus.type === 'success' 
                ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20'
            }`}>
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0 mt-1">
                  {submitStatus.type === 'success' ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">
                    {submitStatus.type === 'success' 
                      ? 'Message Sent Successfully!' 
                      : 'Failed to Send Message'}
                  </div>
                  <div className="text-sm mt-1 opacity-90">
                    {submitStatus.message}
                  </div>
                  {submitStatus.details && (
                    <div className="text-xs mt-2 opacity-75 font-mono">
                      {submitStatus.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
