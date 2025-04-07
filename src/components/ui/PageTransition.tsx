'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black origin-left z-40"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 0 }}
      exit={{ scaleX: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
} 