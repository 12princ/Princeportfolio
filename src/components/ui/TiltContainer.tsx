'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltContainerProps {
  children: ReactNode;
  className?: string;
}

export default function TiltContainer({ children, className = '' }: TiltContainerProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateXFactor = 10; // Adjust for more or less tilt
    const rotateYFactor = 10;
    
    setRotateX((mouseY - centerY) / rotateXFactor);
    setRotateY(-(mouseX - centerX) / rotateYFactor);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
} 