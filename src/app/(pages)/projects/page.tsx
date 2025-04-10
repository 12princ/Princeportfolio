'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { client } from '@sanity/lib/client';
import { projectsQuery } from '@sanity/lib/queries';
import { urlForImage } from '@sanity/lib/image';

// Define project type
interface Project {
  _id: string;
  title: string;
  description: string;
  mainImage: any;
  images: any[];
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by category
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl mb-4 aspect-video bg-gray-900 relative">
                  <Image
                    src={urlForImage(project.mainImage)?.url() || ''}
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
                  {project.technologies.map((tag, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-gray-900/50 rounded-full text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="text-lime text-sm flex items-center hover:underline"
                >
                  View Details <span className="ml-1">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

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