'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    try {
      const web3FormData = new FormData();
      web3FormData.append('name', formData.name);
      web3FormData.append('email', formData.email);
      web3FormData.append('subject', formData.subject);
      web3FormData.append('message', formData.message);
      web3FormData.append('access_key', '344d7e67-cc3d-468a-9c2d-2bd33064c8e1');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset form status after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
          <motion.h1 
            className="text-6xl font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Get In <span className="text-lime">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Fill out the form below or reach out using the contact information.
          </motion.p>
          
          {/* Code brackets decoration */}
          <div className="relative inline-block">
            <motion.div 
              className="absolute -left-16 -top-12 text-6xl text-lime/20 font-mono"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              &lt;
            </motion.div>
            <motion.div 
              className="absolute -right-16 -bottom-12 text-6xl text-lime/20 font-mono"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            >
              /&gt;
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-light mb-8">Contact <span className="text-lime">Information</span></h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-lime text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-gray-400">Surat, Gujrat, India</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-lime text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <a href="mailto:priyanshupatel1253@gmail.com" className="text-gray-400 hover:text-lime">
                  priyanshupatel1253@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <FaPhone className="text-lime text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phone</h3>
                  <a href="tel:+91 7046503593" className="text-gray-400 hover:text-lime">
                    +91 7046503593
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-light mb-6">Connect <span className="text-lime">With Me</span></h2>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-lime hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaGithub className="text-xl" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-lime hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaLinkedin className="text-xl" />
                </motion.a>
                <motion.a
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-lime hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaTwitter className="text-xl" />
                </motion.a>
              </div>
            </div>
            
            {/* Availability */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-medium mb-3">Current Availability</h3>
              <p className="text-gray-400 mb-4">
                I'm currently available for freelance work and new projects. My typical response time is within 24 hours.
              </p>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-lime"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">Currently 70% available</span>
                <span className="text-lime">Taking new clients</span>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-light mb-8">Send <span className="text-lime">Message</span></h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Name <span className="text-lime">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full bg-gray-900/30 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg px-4 py-3 focus:outline-none focus:border-lime transition-colors`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email <span className="text-lime">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full bg-gray-900/30 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg px-4 py-3 focus:outline-none focus:border-lime transition-colors`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-gray-900/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-lime transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Message <span className="text-lime">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={6}
                  className={`w-full bg-gray-900/30 border ${
                    errors.message ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg px-4 py-3 focus:outline-none focus:border-lime transition-colors`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <div>
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`py-3 px-8 rounded-full text-black font-medium 
                    ${formStatus === 'submitting' ? 'bg-gray-600' : 'bg-lime hover:bg-opacity-80'}
                    transition-all relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
                
                {/* Success message */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400"
                  >
                    <p className="text-lg font-medium mb-1">Thank you for reaching out!</p>
                    <p>I've received your message and will get back to you as soon as possible.</p>
                  </motion.div>
                )}
                
                {/* Error message */}
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
                  >
                    <p className="text-lg font-medium mb-1">Oops! Something went wrong</p>
                    <p>There was an error sending your message. Please try again later or contact me directly at contact@priyanshupatel.com</p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="border-t border-gray-800 pt-12 md:pt-16 lg:pt-20">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked <span className="text-lime">Questions</span>
        </motion.h2>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-16 grid md:grid-cols-2 gap-8">
          {[
            {
              question: "What is your typical process for a new project?",
              answer: "I start with a discovery phase to understand your requirements, followed by planning, design, development, testing, and deployment. I maintain communication throughout to ensure your vision is realized."
            },
            {
              question: "How long does it typically take to complete a project?",
              answer: "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while complex applications could take several months. I'll provide a detailed timeline during our initial consultation."
            },
            {
              question: "Do you provide ongoing support after project completion?",
              answer: "Yes, I offer maintenance and support packages to ensure your project continues running smoothly. This includes bug fixes, updates, and performance optimizations."
            },
            {
              question: "What are your payment terms?",
              answer: "I typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, I may set up milestone payments to distribute costs throughout the development process."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-lime/30 transition-all duration-300"
            >
              <h3 className="text-xl font-medium mb-4">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="container py-16 border-t border-gray-800">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Find <span className="text-lime">Me</span>
        </motion.h2>
        
        <div className="rounded-xl overflow-hidden h-96 bg-gray-900 relative">
          {/* Google Maps Embed for London, UK */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19801.84420959653!2d-0.1277583!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33316a8d13%3A0x7e09c5b92c8e4d9b!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1695900000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </section>

      {/* Call To Action */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-gradient-to-r from-lime/10 to-transparent p-12 rounded-2xl">
          <div className="max-w-3xl">
            <motion.h2 
              className="text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's Create Something <span className="text-lime">Amazing</span> Together
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to bring your ideas to life? Contact me today to discuss how we can collaborate on your next project.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="mailto:contact@priyanshupatel1253@gmail.com" 
                className="bg-lime text-black px-8 py-4 rounded-full inline-block font-medium hover:bg-opacity-80 transition-all"
              >
                Email Me Directly
              </a>
            </motion.div>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 
