'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaFileWord, FaDownload, FaFileAlt } from 'react-icons/fa';
import { client } from '@sanity/lib/client';
import { getAllDocumentsQuery } from '@sanity/lib/queries';
import { urlForFile } from '@sanity/lib/file';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Document {
  _id: string;
  title: string;
  description?: string;
  category: string;
  file: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  publishedAt: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await client.fetch(getAllDocumentsQuery);
        setDocuments(data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getFileIcon = (fileRef: string) => {
    if (!fileRef) return <FaFileAlt className="text-gray-400" />;
    if (fileRef.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileRef.includes('word') || fileRef.includes('doc')) return <FaFileWord className="text-blue-500" />;
    return <FaFileAlt className="text-gray-400" />;
  };

  const handleDownload = (document: Document) => {
    const url = urlForFile(document.file);
    if (url) {
      window.open(url, '_blank');
    }
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
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-light mb-6">
              Official <span className="text-lime">Documents</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Download my official documents including resume, experience letters, certificates, and more.
            </p>
          </motion.div>

          {/* Documents Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime"></div>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4">No documents found</p>
              <p className="text-gray-400">Add documents in Sanity Studio</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document, index) => (
                <motion.div
                  key={document._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-900/70 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {getFileIcon(document.file?.asset?._ref || '')}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1">{document.title}</h3>
                        <span className="text-xs text-lime uppercase tracking-wide">
                          {document.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {document.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {document.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">
                      {new Date(document.publishedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDownload(document)}
                      className="flex items-center gap-2 px-4 py-2 bg-lime text-black rounded-full font-medium hover:bg-opacity-80 transition-all group-hover:scale-105"
                    >
                      <FaDownload />
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
