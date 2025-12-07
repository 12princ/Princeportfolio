import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlForImage } from '@sanity/lib/image';
import { getFeaturedProjectsQuery } from '@sanity/lib/queries';
import { client } from '@sanity/lib/client';

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  description: string;
  category: string;
  technologies: string[];
  publishedAt: string;
};

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch<Project[]>(getFeaturedProjectsQuery);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-16 border-t border-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-light mb-4">Featured <span className="text-lime">Projects</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out some of my recent work that highlights my expertise in web development and design
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
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
                </div>

                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs px-3 py-1 bg-gray-900/50 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-3 py-1 bg-gray-900/50 rounded-full text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <Link 
                  href={`/projects/${project.slug.current}`}
                  className="text-lime text-sm flex items-center hover:underline"
                >
                  View Project <span className="ml-1">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link 
            href="/projects"
            className="bg-lime text-black px-8 py-4 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
          >
            View All Projects <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 