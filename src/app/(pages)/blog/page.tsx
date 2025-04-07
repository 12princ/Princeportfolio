'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client, blogQuery, urlFor } from '@/lib/sanity/client';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';

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
  readingTime: number;
  tags: string[];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await client.fetch(blogQuery);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const tags = ['all', ...new Set(posts.flatMap(post => post.tags || []))];

  const filteredPosts = selectedTag === 'all'
    ? posts
    : posts.filter(post => post.tags?.includes(selectedTag));

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <div className="min-h-screen py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="section-title">Blog</h1>
            <p className="section-subtitle">
              Insights, trends, and stories from the world of fashion
            </p>
          </motion.div>

          {/* Tag Filter */}
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
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
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
                    className="bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {post.author?.image && (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={urlFor(post.author.image).url()}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span className="text-sm text-gray-300">
                            {post.author?.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
} 