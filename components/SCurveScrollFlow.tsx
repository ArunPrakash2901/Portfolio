'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SCurveScrollFlowProps {
  children: React.ReactNode;
}

export default function SCurveScrollFlow({ children }: SCurveScrollFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Triple S-Curve: Swoops wide to margins (10% and 90%) to frame content from the outside.
  // 4 distinct swoops to match a ~6 section narrative structure.
  const pathD = "M 50 0 C 10 12, 10 12, 50 25 C 90 37, 90 37, 50 50 C 10 62, 10 62, 50 75 C 90 87, 90 87, 50 100";

  // Map progress to the wide 10% -> 90% horizontal range
  const ballX = useTransform(
    smoothProgress,
    [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    ["50%", "10%", "50%", "90%", "50%", "10%", "50%", "90%", "50%"]
  );
  
  const ballY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-stone-950 text-stone-200 w-full overflow-hidden">
      <div ref={containerRef} className="relative max-w-6xl mx-auto py-48 px-6 overflow-visible">
        
        {/* SVG Animation Layer - Framing the Content */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="text-stone-800 overflow-visible"
          >
            {/* Dotted Base Path - Ultra Fine Technical Line */}
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="0 4"
              strokeLinecap="round"
              opacity="0.2"
            />
            {/* Active Drawing Path - Thin Dashed Trace (Metallic Silver) */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#A8A29E"
              strokeWidth="0.15"
              strokeDasharray="1 3"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
              opacity="0.4"
            />
          </svg>

          {/* The Glowing Kinematic Ball - Metallic Pointer */}
          <motion.div
            className="absolute w-2 h-2 bg-[#A8A29E] rounded-full shadow-[0_0_10px_rgba(168,162,158,0.3)] z-0"
            style={{
              left: ballX,
              top: ballY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        </div>

        {/* Content Layer: Elevated Z-Index to stay above animation */}
        <div className="relative z-10">
          <div className="prose prose-invert prose-stone max-w-none prose-headings:!text-[#F7F4EF]
            [&>hr]:hidden
            
            /* Section Spacing & Refined Branding Colors */
            [&>h1]:!text-[#F7F4EF] [&>h1]:font-serif [&>h1]:font-bold
            [&>h2]:!text-[#F7F4EF] [&>h2]:w-full md:[&>h2]:w-[45%] [&>h2]:mb-8 md:[&>h2]:mb-12 [&>h2]:font-serif [&>h2]:text-4xl [&>h2]:font-bold [&>h2]:tracking-tight
            [&>h3]:!text-[#F7F4EF] [&>h3]:w-full md:[&>h3]:w-[45%] [&>h3]:mb-8 md:[&>h3]:mb-12 [&>h3]:font-serif [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:tracking-tight
            [&>p]:w-full md:[&>p]:w-[45%] [&>p]:mb-32 md:[&>p]:mb-[35vh] [&>p]:text-lg [&>p]:font-light [&>p]:leading-relaxed [&>p]:text-stone-400
            [&>ul]:w-full md:[&>ul]:w-[45%] [&>ul]:mb-32 md:[&>ul]:mb-[35vh]
            
            /* Meandering Alignment: Grouped Pairs */
            /* Heading + Para 1 -> Left (frames with 10% path) */
            /* Heading + Para 2 -> Right (frames with 90% path) */
            md:[&>*:nth-child(4n+1)]:mr-auto md:[&>*:nth-child(4n+1)]:text-left
            md:[&>*:nth-child(4n+2)]:mr-auto md:[&>*:nth-child(4n+2)]:text-left
            
            md:[&>*:nth-child(4n+3)]:ml-auto md:[&>*:nth-child(4n+3)]:text-left
            md:[&>*:nth-child(4n)]:ml-auto md:[&>*:nth-child(4n)]:text-left
            
            [&>h2]:mt-0
          ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
