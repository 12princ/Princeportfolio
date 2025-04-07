'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Define project type
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
}

// Project data
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    category: "Web Development",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A responsive portfolio website designed for a photographer showcasing their work in a modern, minimalist layout with smooth transitions and gallery features.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Web Design",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity application that helps users organize their tasks, set priorities, and track progress. Includes features like drag-and-drop, notifications, and team collaboration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    category: "Web App",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "A secure and user-friendly mobile banking application designed for iOS and Android platforms. Features include transaction history, bill payments, and account management.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "Node.js", "PostgreSQL", "Redux"],
    category: "Mobile App",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A real-time weather dashboard that provides users with current conditions, forecasts, and historical weather data for locations worldwide. Features interactive maps and charts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Chart.js", "API Integration", "CSS3"],
    category: "Web App",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 6,
    title: "Blog Platform",
    description: "A custom blog platform with content management system, user authentication, and analytics. Features responsive design, SEO optimization, and social media integration.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "GraphQL", "Apollo", "MongoDB"],
    category: "Web Development",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

// Categories for filtering
const categories = [
  "All",
  "Web Development",
  "Web Design",
  "Web App",
  "Mobile App",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

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
          <h1 className="text-6xl font-light mb-6">My <span className="text-lime">Projects</span></h1>
          <p className="text-gray-400 text-lg mb-12">
            Explore my featured work, showcasing a blend of design aesthetic and technical implementation.
            Each project represents my dedication to creating engaging, user-focused digital experiences.
          </p>
        </motion.div>
      </section>

      {/* Filter Categories */}
      <section className="container pb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-lime text-black"
                  : "bg-gray-900/50 text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl mb-4 aspect-video bg-gray-900 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{project.title}</h3>
                      <div className="flex space-x-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-lime transition-colors"
                        >
                          <FaGithub size={18} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-lime transition-colors"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 bg-gray-900/50 rounded-full text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => setSelectedProject(project)}
                className="text-lime text-sm flex items-center hover:underline"
              >
                View Details <span className="ml-1">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl p-6 md:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Project Overview</h3>
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 bg-black/50 rounded-full text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-300">Responsive design across all devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-300">User authentication and authorization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-300">Interactive UI with smooth animations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-300">Data persistence and real-time updates</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Technologies Used</h3>
                  <ul className="space-y-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-lime rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-300">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors flex items-center"
              >
                <FaGithub size={16} className="mr-2" /> View Code
              </a>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-lime text-black rounded-full text-sm font-medium hover:bg-opacity-80 transition-colors flex items-center"
              >
                <FaExternalLinkAlt size={14} className="mr-2" /> Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* More Projects Section */}
      <section className="container py-16 border-t border-gray-800">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Interested in My <span className="text-lime">Work</span>?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Check out my GitHub profile for more projects and code samples. I'm always working on new ideas and experiments!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <FaGithub size={20} className="mr-3" /> View GitHub Profile
            </a>
            <Link 
              href="/contact" 
              className="bg-lime text-black px-8 py-4 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
            >
              Discuss a Project <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
} 