'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { client } from '@sanity/lib/client';
import { urlForImage } from '@sanity/lib/image';
import { projectBySlugQuery } from '@sanity/lib/queries';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PortableText } from '@portabletext/react';

interface Project {
  _id: string;
  title: string;
  mainImage: any;
  images: any[];
  description: any[]; // changed from string to any[] for PortableText
  category: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  content: any[];
  body: any[]; // Added body field
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(projectBySlugQuery, { slug: params.slug });
        if (!data) {
          setError('Project not found');
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  if (isLoading) {
    return (
      <>
        <CustomCursor />
        <PageTransition />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <CustomCursor />
        <PageTransition />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Project Not Found</h1>
            <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/projects" 
              className="bg-lime text-black px-6 py-3 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
            >
              Back to Projects <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] mb-12">
          <div className="absolute inset-0">
            <Image
              src={urlForImage(project.mainImage)?.url() || ''}
              alt={project.title}
              fill
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>
          <div className="container relative h-full flex flex-col justify-end pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="px-4 py-1 bg-lime/20 text-lime rounded-full text-sm mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-light mb-6">{project.title}</h1>
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900/50 hover:bg-gray-800 text-white px-6 py-3 rounded-full inline-flex items-center font-medium transition-all"
                >
                  <FaGithub className="mr-2" /> View Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-lime text-black px-6 py-3 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
                >
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Content */}
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-medium mb-4">Project Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {project.description}
              </p>
            </motion.div>

            {/* Project Body (Details) */}
            {project.body && project.body.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-medium mb-4">Project Details</h2>
                <PortableText
                  value={project.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-300 text-lg leading-relaxed mb-4">{children}</p>
                      ),
                    },
                  }}
                />
              </motion.div>
            )}

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-medium mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-900/50 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-medium mb-4">Project Screenshots</h2>
                <div className="aspect-video relative rounded-xl overflow-hidden mb-4">
                  <Image
                    src={urlForImage(project.images[activeImage])?.url() || ''}
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                          activeImage === index ? 'ring-2 ring-lime' : ''
                        }`}
                      >
                        <Image
                          src={urlForImage(image)?.url() || ''}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Back to Projects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-center mt-16"
            >
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 text-white hover:text-lime transition-colors duration-300"
              >
                <span>←</span>
                <span>Back to Projects</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 