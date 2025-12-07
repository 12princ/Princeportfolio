'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@sanity/lib/client';
import { getAllPostsQuery } from '@sanity/lib/queries';
import { urlForImage } from '@sanity/lib/image';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  author: {
    name: string;
    image: any;
  };
  publishedAt: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(getAllPostsQuery);
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Define allowed categories
  const allowedCategories = [
    'Career Growth & Development',
    'Freelancing & Business',
    'Mindset & Productivity',
    'Life, Thoughts & Opinions'
  ];

  // Extract unique tags from posts and filter to only allowed categories
  const allPostTags = new Set(posts.flatMap(post => post.tags || []));
  const filteredPostTags = Array.from(allPostTags).filter(tag => {
    const normalizedTag = tag.toLowerCase();
    return allowedCategories.some(cat => cat.toLowerCase() === normalizedTag);
  });

  // Always include 'all' as the first option
  const tags = ['all', ...filteredPostTags];

  const filteredPosts = selectedTag === 'all'
    ? posts
    : posts.filter(post => post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-light mb-4">Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Insights, trends, and stories from the world of fashion
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              <p className="font-bold">Error loading blog posts</p>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Tag Filter */}
          {!error && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {tag === 'all' ? 'ALL' : tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">Unable to load blog posts</p>
              <p className="text-gray-400 mb-8">Please try again later</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No blog posts found</p>
              <p className="text-gray-400 mb-8">Check back later for new content</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {filteredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <motion.article
                    className="bg-gray-900 rounded-xl overflow-hidden h-full flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlForImage(post.mainImage)?.url() || ''}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={urlForImage(post.author.image)?.url() || ''}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-lime transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 