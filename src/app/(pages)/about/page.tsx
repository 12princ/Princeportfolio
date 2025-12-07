'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { client } from '@sanity/lib/client';
import { getTimelineQuery } from '@sanity/lib/queries';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const skills = [
  { name: "JavaScript/TypeScript", level: 90 },
  { name: "React/Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "UI/UX Design", level: 75 },
  { name: "CSS/Tailwind", level: 85 },
  { name: "Python", level: 70 },
];

interface TimelineEntry {
  _id: string;
  year: string;
  title: string;
  company: string;
  description: string;
}

export default function About() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await client.fetch(getTimelineQuery);
        setTimeline(data || []);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-light mb-6">About <span className="text-lime">Me</span></h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I'm Priyanshu Patel, a full-stack developer with a passion for creating beautiful, 
              functional, and user-centered digital experiences. With a background in both design and 
              development, I bring a unique perspective to every project.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through technical writing and mentorship.
            </p>
            <div className="flex space-x-4">
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-xl flex flex-col items-center"
                whileHover={{ y: -10, backgroundColor: 'rgba(212, 255, 31, 0.1)' }}
              >
                <FaCode className="text-lime text-3xl mb-2" />
                <span className="text-sm text-gray-400">Clean Code</span>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-xl flex flex-col items-center"
                whileHover={{ y: -10, backgroundColor: 'rgba(212, 255, 31, 0.1)' }}
              >
                <FaLaptopCode className="text-lime text-3xl mb-2" />
                <span className="text-sm text-gray-400">Modern Tech</span>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-xl flex flex-col items-center"
                whileHover={{ y: -10, backgroundColor: 'rgba(212, 255, 31, 0.1)' }}
              >
                <FaMobileAlt className="text-lime text-3xl mb-2" />
                <span className="text-sm text-gray-400">Responsive</span>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-900/50 rounded-xl flex flex-col items-center"
                whileHover={{ y: -10, backgroundColor: 'rgba(212, 255, 31, 0.1)' }}
              >
                <FaServer className="text-lime text-3xl mb-2" />
                <span className="text-sm text-gray-400">Full Stack</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square">
              <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl overflow-hidden relative">
                <div className="absolute inset-4 border border-lime/20 rounded-lg z-10"></div>
                <Image 
                  src="/IMG_5576.jpg" 
                  alt="Priyanshu Patel" 
                  width={600} 
                  height={600}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent h-1/3"></div>
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm py-2 px-4 rounded-full">
                  <span className="text-lime font-medium">Developer & Designer</span>
                </div>
              </div>
            </div>
            {/* Code floating elements */}
            <motion.div 
              className="absolute -top-5 -right-5 bg-gray-900 text-lime p-3 rounded-lg font-mono text-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              &lt;code&gt;
            </motion.div>
            <motion.div 
              className="absolute -bottom-5 -left-5 bg-gray-900 text-lime p-3 rounded-lg font-mono text-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
            >
              &lt;/code&gt;
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical <span className="text-lime">Skills</span>
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-lime">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-lime"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional <span className="text-lime">Journey</span>
        </motion.h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:translate-x-px"></div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
            </div>
          ) : timeline.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No timeline entries found</p>
              <p className="text-gray-400 mb-8">Add your professional journey in Sanity Studio</p>
            </div>
          ) : (
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-lime rounded-full transform -translate-x-2 md:-translate-x-2.5 mt-1.5"></div>
                  
                  {/* Date column */}
                  <div className={`md:w-1/2 md:text-right ${index % 2 === 0 ? 'md:text-left' : ''} pl-8 md:pl-0`}>
                    <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-900/50 transition duration-300">
                      <span className="text-lime font-mono">{item.year}</span>
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <div className="text-gray-400 mb-2">{item.company}</div>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty column for alignment */}
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let's Create Something <span className="text-lime">Amazing</span> Together
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
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
              Get In Touch
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