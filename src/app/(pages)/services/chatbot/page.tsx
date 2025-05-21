'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCode, FaBrain, FaComments } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ChatbotService() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      <Navbar />

      {/* Hero Section */}
      <section className="container py-16 border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-light mb-6">Chatbot <span className="text-lime">Development</span></h1>
          <p className="text-gray-400 text-lg mb-12">
            Transform your business with intelligent, conversational AI solutions that enhance customer engagement 
            and streamline operations.
          </p>
          {/* Code brackets decoration */}
          <div className="relative inline-block">
            <motion.div 
              className="absolute -left-16 -top-12 text-6xl text-lime/20 font-mono"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              &#123;
            </motion.div>
            <motion.div 
              className="absolute -right-16 -bottom-12 text-6xl text-lime/20 font-mono"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            >
              &#125;
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: FaRobot,
              title: "AI-Powered Chatbots",
              description: "Custom-built chatbots leveraging cutting-edge AI and natural language processing."
            },
            {
              icon: FaCode,
              title: "Custom Development",
              description: "Tailored solutions designed to meet your specific business requirements."
            },
            {
              icon: FaBrain,
              title: "Machine Learning",
              description: "Intelligent systems that learn and improve from every interaction."
            },
            {
              icon: FaComments,
              title: "24/7 Support",
              description: "Round-the-clock customer service automation and support."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-lime/50 transition-all duration-300"
            >
              <div className="text-lime text-3xl mb-6">
                <feature.icon />
              </div>
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container py-16 border-t border-gray-800">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Development <span className="text-lime">Process</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Discovery & Planning",
              description: "Understanding your requirements and designing the perfect solution."
            },
            {
              number: "02",
              title: "Development & Testing",
              description: "Building and rigorously testing the chatbot for optimal performance."
            },
            {
              number: "03",
              title: "Deployment & Support",
              description: "Smooth deployment and ongoing maintenance and support."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-4 -top-4 text-6xl font-light text-lime/10">{step.number}</div>
              <div className="bg-gray-900/20 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-lime/30 transition-all duration-300 relative z-10">
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="container py-16 border-t border-gray-800">
        <div className="bg-gradient-to-r from-lime/10 to-transparent p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 text-9xl font-mono text-lime/5 transform rotate-12">
            &lt;/&gt;
          </div>
          
          <div className="max-w-3xl relative z-10">
            <motion.h2 
              className="text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your <span className="text-lime">Business</span>?
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's discuss how our chatbot solutions can enhance your customer experience and streamline your operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="/contact" 
                className="bg-lime text-black px-8 py-4 rounded-full inline-block font-medium hover:bg-opacity-80 transition-all"
              >
                Let's Work Together
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 