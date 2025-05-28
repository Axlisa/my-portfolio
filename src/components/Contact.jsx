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
      setSubmitStatus('error');
      return false;
    }
    if (!form.email.trim()) {
      setSubmitStatus('error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setSubmitStatus('error');
      return false;
    }
    if (!form.message.trim()) {
      setSubmitStatus('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus(null);

    // Debug: Check if environment variables are loaded
    console.log("EmailJS Public Key:", import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
    
    // Check if public key is available
    if (!import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY) {
      setSubmitStatus('error');
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to send email via EmailJS...");
      
      const result = await emailjs.send(
        "service_q9ggjli", // Your Service ID
        "template_88kl7z5", // Your Template ID
        {
          name: form.name,           // Changed from 'from_name' to 'name'
          email: form.email,         // Changed from 'from_email' to 'email' 
          message: form.message,
          time: new Date().toLocaleString(),
          // Additional fields for better email formatting
          from_name: form.name,
          from_email: form.email,
          to_name: "Agathian",
          to_email: "agathianmathivanan@gmail.com",
          reply_to: form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      
      console.log("EmailJS Success:", result);

      setLoading(false);
      setSubmitStatus('success');

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      setLoading(false);
      setSubmitStatus('error');
      console.error("EmailJS Error Details:", error);
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
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
              submitStatus === 'success' 
                ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {submitStatus === 'success' ? '✅' : '❌'}
                </div>
                <div>
                  <div className="font-semibold text-lg">
                    {submitStatus === 'success' 
                      ? 'Message Sent Successfully!' 
                      : 'Failed to Send Message'}
                  </div>
                  <div className="text-sm mt-1 opacity-90">
                    {submitStatus === 'success' 
                      ? 'Thank you! I will get back to you as soon as possible.' 
                      : 'Please check your internet connection and try again. If the problem persists, contact me directly at agathianmathivanan@gmail.com'}
                  </div>
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
