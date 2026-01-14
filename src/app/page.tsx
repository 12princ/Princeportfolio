'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagramSquare, FaLinkedin, FaTwitter, FaCode, FaDatabase, FaPalette, FaMobile, FaSearch, FaChartLine } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { LatestBlogPosts } from '@/components/LatestBlogPosts';
import SocialLinksFloating from '@/components/SocialLinksFloating';

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

// Add the services array from the services page for use in the home page services section
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
    icon: FaChartLine,
    title: "Performance Optimization",
    description: "Enhancing the speed and performance of your web applications for better user experience.",
    features: [
      "Core Web Vitals Optimization",
      "Lighthouse Score Improvement",
      "Code Splitting & Lazy Loading",
      "Caching Strategies"
    ]
  }
];

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <main className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="container border-t border-gray-800 pt-16 pb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1 
                className="text-7xl md:text-8xl font-light leading-none mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Priyanshu<br />Patel<span className="text-lime">.</span>
              </motion.h1>
              <motion.p 
                className="text-gray-400 max-w-md mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Developer and designer focused on creating intuitive, user-friendly digital experiences with modern technologies dedicated developer with a diverse skill set in Programming, Graphic Design, and Video Editing. With a passion for creating innovative solutions and a commitment to authenticity, I bring both technical expertise and creative vision to every project. While I'm naturally introverted, I thrive in environments that challenge my thinking and encourage growth. My aim is to deliver high-quality work that exceeds expectations, fostering trust and long-term collaboration. Let's build something great together!
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-4"
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
                <a
                  href="/Priyanshu Patel CV.pdf"
                  download
                  className="px-6 py-3 rounded-full border border-lime text-lime font-medium hover:bg-lime/10 transition-all"
                >
                  Download My Resume
                </a>
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
          <h2 className="text-4xl font-light mb-4">About <span className="text-lime">Me</span></h2>
          </div>
          
          <motion.blockquote 
            className="text-center text-2xl md:text-4xl max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white">
              "Driven by a passion for creating elegant and purposeful digital experiences, I build websites where design meets technical precision"
            </span>
            <span className="text-gray-500">
              {" "}
              What began as a curiosity has evolved into a craft{" "}
              <a href="https://techvedaportfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                developing portfolio sites and high-converting landing pages
              </a>
              {" "}
              that are both visually compelling and seamlessly functional. Whether you’re a creator, brand, or business, I’m here to help you make an unforgettable first impression online.
            </span>
          </motion.blockquote>
        </section>

          {/* Featured Projects */}
        <FeaturedProjects />

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

        {/* Services Section */}
        <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden py-16 border-t border-gray-800 bg-black">
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h2 className="text-4xl font-light mb-4">What I <span className="text-lime">Offer</span></h2>
            {/* Mobile/tablet image */}
            <div className="w-full flex items-center justify-center mb-8 lg:hidden">
              <div className="relative w-96 h-96 md:w-[480px] md:h-[480px]">
                <Image
                  src="/7079651_3509464.svg"
                  alt="Services Illustration"
                  fill
                  className="object-contain object-center w-full h-full opacity-80 md:opacity-90 transition-all duration-700"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 480px, 120vw"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              {/* Service cards and illustration - only on large screens */}
              <div className="hidden lg:flex flex-row w-full max-w-screen-xl mx-auto items-center justify-center gap-8 mt-8">
                {/* Left service cards */}
                <div className="flex flex-col gap-6 w-64">
                  {services.slice(0,2).map((service, idx) => (
                    <Link href="/services" key={service.title} className="group">
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-start group-hover:border-lime/70 group-hover:shadow-lime/10 transition-all duration-300 cursor-pointer w-full"
                      >
                        <div className="text-lime text-2xl mb-3">{React.createElement(service.icon)}</div>
                        <div className="font-semibold mb-1">{service.title}</div>
                        <div className="text-gray-400 text-sm mb-2">{service.description}</div>
                        <ul className="text-xs text-gray-300 list-disc list-inside pl-2">
                          {service.features.slice(0,2).map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                {/* Center illustration */}
                <div className="flex flex-col items-center justify-center px-8 flex-shrink-0">
                  <div className="relative w-72 h-72 md:w-[480px] md:h-[480px] lg:w-[400px] lg:h-[400px] xl:w-[480px] xl:h-[480px]">
                    <Image
                      src="/7079651_3509464.svg"
                      alt="Services Illustration"
                      fill
                      className="object-contain object-center w-full h-full opacity-80 md:opacity-90 transition-all duration-700"
                      priority
                      sizes="(max-width: 768px) 288px, (max-width: 1024px) 480px, 120vw"
                    />
                  </div>
                </div>
                {/* Right service cards */}
                <div className="flex flex-col gap-6 w-64">
                  {services.slice(-2).map((service, idx) => (
                    <Link href="/services" key={service.title} className="group">
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-start group-hover:border-lime/70 group-hover:shadow-lime/10 transition-all duration-300 cursor-pointer w-full"
                      >
                        <div className="text-lime text-2xl mb-3">{React.createElement(service.icon)}</div>
                        <div className="font-semibold mb-1">{service.title}</div>
                        <div className="text-gray-400 text-sm mb-2">{service.description}</div>
                        <ul className="text-xs text-gray-300 list-disc list-inside pl-2">
                          {service.features.slice(0,2).map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Link 
                href="/services" 
                className="bg-lime text-black px-6 py-3 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
              >
                View All Services <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        

        {/* Latest Blog Posts */}
        <LatestBlogPosts />

        {/* Social Media (appears after hero) */}
        <SocialLinksFloating />
      </main>
      <Footer />
    </>
  );
}
