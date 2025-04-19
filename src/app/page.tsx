'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { LatestBlogPosts } from '@/components/LatestBlogPosts';

// Projects data
const projects = [
  { 
    title: "E-commerce Platform", 
    desc: "Next.js, Tailwind CSS, Stripe", 
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Portfolio Website", 
    desc: "React, Framer Motion, Styled Components", 
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Web Application", 
    desc: "TypeScript, Redux, Firebase", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="container border-t border-gray-800 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1 
              className="text-7xl md:text-8xl font-light leading-none mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Priyanshu<br />Patel <span className="text-lime">.</span>
            </motion.h1>
            <motion.p 
              className="text-gray-400 max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Developer and designer focused on creating intuitive, user-friendly digital experiences with modern technologies.dedicated developer with a diverse skill set in Programming, Graphic Design, and Video Editing. With a passion for creating innovative solutions and a commitment to authenticity, I bring both technical expertise and creative vision to every project. While I'm naturally introverted, I thrive in environments that challenge my thinking and encourage growth. My aim is to deliver high-quality work that exceeds expectations, fostering trust and long-term collaboration. Let's build something great together!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <Link 
                href="/contact" 
                className="bg-lime text-black px-6 py-3 rounded-full flex items-center w-fit font-medium hover:bg-opacity-80 transition-all"
              >
                Contact Me <span className="ml-1">→</span>
              </Link>
            </motion.div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <Image 
                  src="/IMG_5576.jpg" 
                  alt="Profile portrait" 
                  width={600} 
                  height={600}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container py-16 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-2xl mb-4">About me</h2>
        </div>
        
        <motion.blockquote 
          className="text-center text-2xl md:text-4xl max-w-5xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white">"With a passion for creating elegant and functional digital experiences, I've dedicated myself to crafting websites that blend aesthetic appeal with technical excellence. My journey began with </span>
          <span className="text-gray-500">a curiosity for both design and development, leading me to create solutions that are visually stunning and intuitively functional."</span>
        </motion.blockquote>
      </section>

      {/* Quote Section */}
      <section className="container py-16 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Coding workspace" 
                width={800} 
                height={1200}
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-end"
          >
            <blockquote className="text-right text-lg leading-relaxed mb-4">
              Design is not just what it looks like and feels like. Design is how it works. Simplicity is about subtracting the obvious and adding the meaningful.
            </blockquote>
            <cite className="text-lime not-italic">— Steve Jobs</cite>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Latest Blog Posts */}
      <LatestBlogPosts />

      {/* Social Media */}
      <div className="fixed right-6 bottom-20 flex flex-col space-y-6">
        <a href="https://github.com/12princ" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/priyanshu-patel-techveda" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        <a href="https://www.instagram.com/__p12.5.__/" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare size={24} />
        </a>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}