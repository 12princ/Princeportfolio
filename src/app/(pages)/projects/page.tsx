'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  description?: string;
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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(projectsQuery);
        setProjects((data ?? []).map((p: Project) => ({
          ...p,
          title: p.title ?? '',
          description: p.description ?? '',
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

  // Shared normalization function for consistent category comparison
  // Handles case-insensitive matching, whitespace, and special characters
  const normalizeCategory = (category: string): string => {
    if (!category || typeof category !== 'string') return '';
    // Convert to lowercase, trim, and replace multiple spaces with single space
    return category.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  // Extract unique categories dynamically from Sanity project data
  // Removes duplicates and displays only unique categories from the category field
  const categories = useMemo(() => {
    // Use Set to track normalized categories we've seen (for true deduplication)
    const seenNormalized = new Set<string>();
    // Use Map to store normalized -> original casing mapping
    const uniqueCategoryMap = new Map<string, string>();
    
    // Iterate through all projects and collect unique categories from Sanity
    projects.forEach(p => {
      const category = p.category;
      
      // Skip if category is empty, null, or undefined
      if (!category || typeof category !== 'string') return;
      
      // Normalize the category for comparison
      const normalized = normalizeCategory(category);
      
      // Skip if normalized category is empty
      if (!normalized) return;
      
      // Only add if this normalized category hasn't been seen before
      // This ensures duplicates are completely ignored
      if (!seenNormalized.has(normalized)) {
        seenNormalized.add(normalized);
        // Store first occurrence's original casing for display
        uniqueCategoryMap.set(normalized, category.trim());
      }
    });
    
    // Convert to sorted array of unique categories only
    const uniqueCategories = Array.from(uniqueCategoryMap.values()).sort();
    return ["All", ...uniqueCategories];
  }, [projects]);

  // Filter projects based on active category from Sanity data
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    
    const normalizedActiveCategory = normalizeCategory(activeCategory);
    
    return projects.filter(p => {
      const normalizedProjectCategory = normalizeCategory(p.category ?? '');
      return normalizedProjectCategory === normalizedActiveCategory;
    });
  }, [projects, activeCategory]);

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

      {/* Filter Categories */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
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
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No projects found</p>
              <p className="text-gray-400 mb-8">Try a different category</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {filteredProjects.map((project, index) => {
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

                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

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