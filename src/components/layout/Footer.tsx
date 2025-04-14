'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaBehance, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold inline-block mb-6">
              Priyanshu<span className="text-lime">Patel</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Creating unique fashion experiences with innovative designs and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/priyanshu-patel-techveda/" className="text-gray-400 hover:text-lime">
                <FaLinkedin size={18} />
              </a>
              <a href="https://x.com/Priyans24482384" className="text-gray-400 hover:text-lime">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.instagram.com/__p12.5.__/" className="text-gray-400 hover:text-lime">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.behance.net/priyanshupatel43" className="text-gray-400 hover:text-lime">
                <FaBehance size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-lime">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-lime">About</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-lime">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-lime">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-lime">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Fashion Design</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Creative Direction</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Photography</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Brand Consulting</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-lime">Styling</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-lime mr-3" />
                <span className="text-gray-400">Surat, Gujarat, India</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-lime mr-3" />
                <span className="text-gray-400">+91 7046503593</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-lime mr-3" />
                <span className="text-gray-400">priyanshupatel1253@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Priyanshu Patel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
