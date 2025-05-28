import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus(null);

    try {
      console.log("🚀 Sending form data to protected API...");
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Form submitted successfully:", data);
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Your message has been sent successfully!',
          details: `Email sent via ${data.service} at ${new Date(data.timestamp).toLocaleTimeString()}`
        });

        // Reset form
        setForm({
          name: "",
          email: "",
          message: "",
        });

        // Auto-hide success message after 7 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 7000);

      } else {
        console.error("❌ API Error:", data);
        
        // Handle specific error types
        let userMessage = data.error || 'Failed to send message. Please try again.';
        let autoHideDelay = 8000;
        
        if (data.type === 'rate_limit') {
          userMessage = "You're sending messages too quickly. Please wait a moment before trying again.";
          autoHideDelay = 10000;
        } else if (data.type === 'bot_detected') {
          userMessage = "Security check failed. Please try again or contact me directly.";
        } else if (data.type === 'validation_error') {
          autoHideDelay = 5000;
        }
        
        setSubmitStatus({ 
          type: 'error', 
          message: userMessage,
          details: data.type ? `Error type: ${data.type}` : undefined
        });

        // Auto-hide error message
        setTimeout(() => {
          setSubmitStatus(null);
        }, autoHideDelay);
      }

    } catch (error) {
      console.error("❌ Network Error:", error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.',
        details: 'If the problem persists, you can reach me at agathianmathivanan@gmail.com'
      });

      // Auto-hide error message after 10 seconds
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
