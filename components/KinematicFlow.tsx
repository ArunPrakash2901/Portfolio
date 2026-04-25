'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface KinematicFlowProps {
  children: React.ReactNode;
}

export default function KinematicFlow({ children }: KinematicFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific container
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

  // Path definitions
  // Mobile: Subtler curve
  // Desktop: Elegant S-curve
  const desktopPath = "M 500 0 C 800 400, 200 600, 500 1000";
  const mobilePath = "M 50 0 C 80 400, 20 600, 50 1000";

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-24 md:py-32 overflow-visible">
      {/* SVG Background Layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-visible">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          className="hidden md:block opacity-20"
        >
          {/* Base Light Path */}
          <path
            d={desktopPath}
            fill="none"
            stroke="#5BC0CD"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          {/* Animated Trace Path */}
          <motion.path
            d={desktopPath}
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            style={{ pathLength: smoothProgress }}
          />
        </svg>

        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 1000" 
          preserveAspectRatio="none"
          className="block md:hidden opacity-15"
        >
          <path
            d={mobilePath}
            fill="none"
            stroke="#5BC0CD"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <motion.path
            d={mobilePath}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            style={{ pathLength: smoothProgress }}
          />
        </svg>

        {/* The Kinematic Ball (Desktop) */}
        <motion.div
          className="hidden md:block absolute w-5 h-5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20"
          style={{
            left: useTransform(smoothProgress, [0, 1], ["50%", "50%"]),
            top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            x: useTransform(smoothProgress, 
              [0, 0.4, 0.6, 1], 
              [0, 300, -300, 0] // Matches the C points roughly
            ),
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* The Kinematic Ball (Mobile) */}
        <motion.div
          className="block md:hidden absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)] z-20"
          style={{
            left: useTransform(smoothProgress, [0, 1], ["50%", "50%"]),
            top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            x: useTransform(smoothProgress, 
              [0, 0.4, 0.6, 1], 
              [0, 30, -30, 0]
            ),
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 px-8">
        {children}
      </div>
    </div>
  );
}
