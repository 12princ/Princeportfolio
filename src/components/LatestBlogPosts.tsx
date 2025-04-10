import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlForImage } from '@sanity/lib/image';
import { client } from '@sanity/lib/client';
import { getAllPostsQuery } from '@sanity/lib/queries';

type BlogPost = {
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
};

export function LatestBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch<BlogPost[]>(getAllPostsQuery);
        setPosts(data.slice(0, 3)); // Get only the latest 3 posts
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
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
          <h2 className="text-4xl font-light mb-4">Latest <span className="text-lime">Blog Posts</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with my latest thoughts and insights on web development and design
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
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl mb-4 aspect-video bg-gray-900 relative">
                  <Image
                    src={urlForImage(post.mainImage)?.url() || ''}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <Link 
                          href={`/blog/${post.slug.current}`}
                          className="text-white hover:text-lime transition-colors"
                        >
                          →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

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

                <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <Link 
                  href={`/blog/${post.slug.current}`}
                  className="text-lime text-sm flex items-center hover:underline"
                >
                  Read More <span className="ml-1">→</span>
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
            href="/blog"
            className="bg-lime text-black px-8 py-4 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
          >
            View All Posts <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 