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
  description?: string | any[]; // Can be string or Portable Text array
  mainImage: any;
  images?: any[];
  technologies?: string[];
  category?: string;
  githubUrl?: string;
  liveUrl?: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(projectsQuery);
        // Helper to process description
        const processDescription = (desc: any): string => {
          if (!desc) return '';
          if (typeof desc === 'string') return desc;
          if (Array.isArray(desc)) {
            return desc
              .map((block: any) => {
                if (block?._type === 'block' && block.children) {
                  return block.children
                    .map((child: any) => child?.text || '')
                    .join('');
                }
                return '';
              })
              .filter(Boolean)
              .join(' ')
              .trim();
          }
          return String(desc);
        };
        
        setProjects((data ?? []).map((p: any) => ({
          ...p,
          title: p.title ?? '',
          description: processDescription(p.description),
          category: p.category ?? '',
          technologies: p.technologies ?? [],
          images: p.images ?? [],
          githubUrl: p.githubUrl ?? '',
          liveUrl: p.liveUrl ?? '',
        })));
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to extract plain text from Portable Text or string
  const getPlainText = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      // Portable Text array - extract text from blocks
      return content
        .map((block: any) => {
          if (!block) return '';
          if (block._type === 'block' && block.children) {
            return block.children
              .map((child: any) => {
                if (typeof child === 'string') return child;
                if (child && typeof child === 'object' && child.text) return child.text;
                return '';
              })
              .join('');
          }
          return '';
        })
        .filter(Boolean)
        .join(' ')
        .trim();
    }
    if (typeof content === 'object') {
      // Handle object case - try to extract text
      if (content.text) return String(content.text);
      if (content.children && Array.isArray(content.children)) {
        return content.children.map((c: any) => c.text || '').join('');
      }
    }
    return String(content);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <PageTransition />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
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
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">Unable to load projects</p>
              <p className="text-gray-400 mb-8">Please try again later</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No projects found</p>
              <p className="text-gray-400 mb-8">Add projects in Sanity Studio</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {projects.map((project, index) => {
                const imgUrl = urlForImage(project.mainImage)?.url();
                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-transparent"
                  >
                    <div className="overflow-hidden rounded-xl mb-4 aspect-video bg-gray-900 relative">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900" />
                      )}
                    </div>

                    <h3 className="text-xl font-medium mb-2">{project.title || ''}</h3>
                    {project.description && (
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {typeof project.description === 'string' 
                          ? project.description 
                          : getPlainText(project.description)}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies ?? []).map((tag, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-gray-900/50 rounded-full text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="text-lime text-sm inline-flex items-center hover:underline ml-auto"
                      >
                        View Details <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* More Projects Section */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 text-center max-w-4xl">
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