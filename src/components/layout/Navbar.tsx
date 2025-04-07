'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="container py-6 flex justify-between items-center">
      {/* <Link href="/" className="text-2xl font-bold z-20">
        Build<span className="text-lime">Style</span>
      </Link> */}
      <nav className="hidden md:flex space-x-8">
        <Link href="/" className="hover:text-lime transition-colors">Home</Link>
        <Link href="/about" className="hover:text-lime transition-colors">About</Link>
        <Link href="/services" className="hover:text-lime transition-colors">Services</Link>
        <Link href="/projects" className="hover:text-lime transition-colors">Projects</Link>
        <div className="relative group">
          <span className="hover:text-lime transition-colors cursor-pointer flex items-center">
            Pages <span className="ml-1">▼</span>
          </span>
          <div className="absolute hidden group-hover:block bg-gray-900 p-2 min-w-40 z-10">
            <Link href="/blog" className="block py-2 px-4 hover:text-lime transition-colors">Blog</Link>
            <Link href="/contact" className="block py-2 px-4 hover:text-lime transition-colors">Contact</Link>
          </div>
        </div>
      </nav>
      <Link 
        href="/contact" 
        className="hidden md:flex bg-lime text-black px-6 py-2 rounded-full items-center font-medium hover:bg-opacity-80 transition-all"
      >
        Get Started <span className="ml-1">→</span>
      </Link>
      <button 
        className="md:hidden z-20 text-2xl" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 bg-black z-10 flex flex-col justify-center items-center md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <nav className="flex flex-col space-y-6 text-center text-xl">
          <Link 
            href="/" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/services" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/projects" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-lime transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/contact" 
            className="bg-lime text-black px-6 py-3 rounded-full mt-4 inline-block"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      </motion.div>
    </header>
  );
} 