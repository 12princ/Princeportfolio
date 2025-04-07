import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '../../sanity/lib/image';
import { getFeaturedProjectsQuery } from '../../sanity/lib/queries';
import { client } from '../../sanity/lib/client';

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

export async function FeaturedProjects() {
  const projects = await client.fetch<Project[]>(getFeaturedProjectsQuery);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out some of my recent work that highlights my expertise in web development and design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                {project.mainImage && (
                  <Image
                    src={urlForImage(project.mainImage)?.url() || ''}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(project.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <Link 
                  href={`/projects/${project.slug.current}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
} 