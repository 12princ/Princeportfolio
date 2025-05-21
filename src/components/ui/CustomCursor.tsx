'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed z-50 w-8 h-8 pointer-events-none"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.3,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-lime" />
      <div className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
    </motion.div>
  );
} 