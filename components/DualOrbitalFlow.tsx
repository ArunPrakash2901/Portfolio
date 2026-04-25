'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface DualOrbitalFlowProps {
  children: React.ReactNode;
}

export default function DualOrbitalFlow({ children }: DualOrbitalFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Vertical position mapping
  const yPos = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Horizontal "bowing" mapping
  // Left side: bows out to the left (negative x)
  const leftX = useTransform(smoothProgress, [0, 0.5, 1], [0, -60, 0]);
  // Right side: bows out to the right (positive x)
  const rightX = useTransform(smoothProgress, [0, 0.5, 1], [0, 60, 0]);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto overflow-visible px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr_150px] gap-8">
        
        {/* Left Orbital Column */}
        <div className="hidden lg:block sticky top-0 h-screen overflow-visible">
          <div className="relative w-full h-full">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 150 1000" 
              preserveAspectRatio="none"
              className="absolute inset-0 text-[#2F6B75] opacity-20"
            >
              <path
                d="M 150 0 C 50 250, 50 750, 150 1000"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            {/* Left Red Dot */}
            <motion.div
              className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20"
              style={{
                right: 0,
                top: yPos,
                x: leftX,
                translateX: "50%",
                translateY: "-50%",
              }}
            />
          </div>
        </div>

        {/* Center Content Column */}
        <div className="relative z-10 py-24 min-h-[70vh]">
          {children}
        </div>

        {/* Right Orbital Column */}
        <div className="hidden lg:block sticky top-0 h-screen overflow-visible">
          <div className="relative w-full h-full">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 150 1000" 
              preserveAspectRatio="none"
              className="absolute inset-0 text-[#2F6B75] opacity-20"
            >
              <path
                d="M 0 0 C 100 250, 100 750, 0 1000"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            {/* Right Red Dot */}
            <motion.div
              className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20"
              style={{
                left: 0,
                top: yPos,
                x: rightX,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
