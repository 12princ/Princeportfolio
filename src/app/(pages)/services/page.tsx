'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaMobile, FaDatabase, FaSearch, FaChartLine, FaRobot } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { IconType } from 'react-icons';

const services = [
  {
    icon: FaCode,
    title: "Frontend Development",
    description: "Creating responsive and performant user interfaces using modern frameworks like React, Next.js and Vue.",
    features: [
      "Responsive Web Design",
      "Interactive UI/UX",
      "Single Page Applications",
      "Progressive Web Apps"
    ]
  },
  {
    icon: FaDatabase,
    title: "Backend Development",
    description: "Building robust, scalable server-side applications and APIs with Node.js, Express, and MongoDB.",
    features: [
      "RESTful API Development",
      "Database Design",
      "Authentication & Authorization",
      "Server Deployment & Maintenance"
    ]
  },
  {
    icon: FaPalette,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful interfaces that enhance user experience and engagement.",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing"
    ]
  },
  {
    icon: FaMobile,
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications using React Native and Flutter.",
    features: [
      "iOS & Android Apps",
      "Responsive Mobile UI",
      "App Store Optimization",
      "Mobile UX Design"
    ]
  },
  {
    icon: FaSearch,
    title: "SEO Optimization",
    description: "Improving your website's visibility in search results to drive more organic traffic.",
    features: [
      "Technical SEO Audits",
      "On-page Optimization",
      "Performance Improvements",
      "Content Strategy"
    ]
  },
  {
    icon: FaRobot,
    title: "Chatbot Development",
    description: "Building intelligent, conversational AI solutions that enhance customer engagement.",
    features: [
      "AI-Powered Chatbots",
      "Natural Language Processing",
      "24/7 Customer Support",
      "Custom Integration"
    ]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Initial consultation to understand your project needs, goals, and target audience."
  },
  {
    number: "02",
    title: "Planning",
    description: "Developing a project roadmap, timeline, and technical specifications."
  },
  {
    number: "03",
    title: "Design",
    description: "Creating wireframes, prototypes, and visual designs for your approval."
  },
  {
    number: "04",
    title: "Development",
    description: "Building your solution with clean, efficient, and maintainable code."
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous testing across different devices and browsers to ensure quality."
  },
  {
    number: "06",
    title: "Deployment",
    description: "Launching your project and providing training on how to use and maintain it."
  }
];

export default function Services() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="container py-16 border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-light mb-6">My <span className="text-lime">Services</span></h1>
          <p className="text-gray-400 text-lg mb-12">
            I offer a comprehensive range of web development and design services to help you establish 
            a strong online presence. From concept to deployment, I'll guide you through every step of the process.
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

      {/* Services Section */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                <service.icon />
              </div>
              <h3 className="text-xl font-medium mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-lime rounded-full mr-3"></span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              {service.title === "Chatbot Development" && (
                <a
                  href="/services/chatbot"
                  className="inline-block bg-lime/10 text-lime border border-lime px-6 py-2 rounded-lg hover:bg-lime/20 transition-all"
                >
                  View More
                </a>
              )}
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
          My Development <span className="text-lime">Process</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {processSteps.map((step, index) => (
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

      {/* Tech Stack Section */}
      <section className="container py-16 border-t border-gray-800">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technology <span className="text-lime">Stack</span>
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React", "Next.js", "TypeScript", "Node.js", 
            "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", 
            "Framer Motion", "GraphQL", "Firebase", "AWS"
          ].map((tech, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(212, 255, 31, 0.1)',
                borderColor: 'rgba(212, 255, 31, 0.3)'
              }}
              className="border border-gray-800 rounded-lg p-4 flex items-center justify-center h-20 text-center font-mono transition-all duration-300"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 border-t border-gray-800">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Client <span className="text-lime">Testimonials</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "Priyanshu delivered our project on time and exceeded our expectations with his attention to detail and problem-solving skills.",
              author: "Sarah Johnson",
              position: "CTO, TechStart Inc."
            },
            {
              quote: "Working with Priyanshu was a great experience. He understood our vision and translated it into a beautiful, functional website.",
              author: "Michael Chen",
              position: "Founder, Design Studio"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl border border-gray-800 relative"
            >
              <div className="text-lime text-6xl absolute -top-5 -left-2 opacity-20 font-serif">"</div>
              <blockquote className="text-gray-300 mb-6 relative z-10">
                {testimonial.quote}
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-lime/20 mr-4"></div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.position}</div>
                </div>
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
              Ready to Start Your <span className="text-lime">Project</span>?
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's discuss how I can help bring your vision to life with custom solutions tailored to your specific needs.
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

      {/* Footer */}
      <Footer />
    </main>
  );
} 