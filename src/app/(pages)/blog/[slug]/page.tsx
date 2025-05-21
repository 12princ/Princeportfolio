'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@sanity/lib/client';
import { urlForImage } from '@sanity/lib/image';
import { postBySlugQuery } from '@sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface BlogPost {
  _id: string;
  title: string;
  mainImage: any;
  author: {
    name: string;
    image: any;
    bio: string;
  };
  publishedAt: string;
  readingTime: number;
  tags: string[];
  body: any[];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await client.fetch(postBySlugQuery, { slug: params.slug });
        if (!data) {
          setError('Post not found');
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
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

  if (error || !post) {
    return (
      <>
        <CustomCursor />
        <PageTransition />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/blog" 
              className="bg-lime text-black px-6 py-3 rounded-full inline-flex items-center font-medium hover:bg-opacity-80 transition-all"
            >
              Back to Blog <span className="ml-2">→</span>
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
        <section className="relative h-[60vh] mb-12">
          <div className="absolute inset-0">
            <Image
              src={urlForImage(post.mainImage)?.url() || ''}
              alt={post.title}
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
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 bg-lime/20 text-lime rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-6">{post.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={urlForImage(post.author.image)?.url() || ''}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString()} •{' '}
                    {post.readingTime} min read
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <PortableText value={post.body} />
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl"
            >
              <div className="flex items-center space-x-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={urlForImage(post.author.image)?.url() || ''}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{post.author.name}</h3>
                  <p className="text-gray-300">{post.author.bio}</p>
                </div>
              </div>
            </motion.div>

            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-center mt-16"
            >
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-white hover:text-lime transition-colors duration-300"
              >
                <span>←</span>
                <span>Back to Blog</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 