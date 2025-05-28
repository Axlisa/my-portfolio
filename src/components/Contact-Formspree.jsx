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
      alert("Please enter your name");
      return false;
    }
    if (!form.email.trim()) {
      alert("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (!form.message.trim()) {
      alert("Please enter your message");
      return false;
    }
    return true;
  };

  // Method 1: Using Formspree (completely free, no signup needed initially)
  const handleSubmitFormspree = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setLoading(false);
        setSubmitStatus('success');
        alert("Thank you! Your message has been sent successfully. I will get back to you as soon as possible.");
        
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setLoading(false);
      setSubmitStatus('error');
      console.error("Error:", error);
      alert("Something went wrong. Please try again or contact me directly at agathianmathivanan@gmail.com");
    }
  };
