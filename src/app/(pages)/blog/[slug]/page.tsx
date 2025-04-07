'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity/client';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import { PortableText } from '@portabletext/react';

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
  content: any[];
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          mainImage,
          author->{
            name,
            image,
            bio
          },
          publishedAt,
          readingTime,
          tags,
          content
        }`;
        const data = await client.fetch(query, { slug: params.slug });
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Post not found</p>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <PageTransition />
      <article className="min-h-screen py-20">
        <div className="container">
          {/* Hero Section */}
          <motion.div
            className="relative h-[60vh] mb-12 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Post Header */}
          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image).url()}
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
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="max-w-3xl mx-auto prose prose-invert prose-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PortableText value={post.content} />
          </motion.div>

          {/* Author Bio */}
          <motion.div
            className="max-w-3xl mx-auto mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.author.name}</h3>
                <p className="text-gray-300">{post.author.bio}</p>
              </div>
            </div>
          </motion.div>

          {/* Back to Blog */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </motion.div>
        </div>
      </article>
    </>
  );
} 