'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Experiment {
  slug: string;
  name: string;
  builtDate: string;
  stack: string[];
  oneLiner: string;
  media?: string;
}

export default function BuiltForFunList({ experiments }: { experiments: Experiment[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getYear = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.includes('-') ? dateStr.split('-')[0] : dateStr;
  };

  return (
    <div className="flex flex-col border-t border-[#E0DAD0]">
      {experiments.map((project, index) => (
        <div 
          key={project.slug}
          className="border-b border-[#E0DAD0] group transition-colors hover:bg-black/5"
          onMouseEnter={() => setExpandedIndex(index)}
          onMouseLeave={() => setExpandedIndex(null)}
        >
          {/* Row Header - Always Visible */}
          <Link href={`/experiments/${project.slug}`} className="flex items-center justify-between px-8 py-6 cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1">
              <span className="font-serif text-lg text-[#1A1814] md:w-[240px] shrink-0">
                {project.name}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-[#9B8B6E] w-12 shrink-0">
                  {getYear(project.builtDate)}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="font-mono text-[10px] border border-[#D4C9B8] rounded px-2 py-0.5 text-[#5A5650] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-4">
               <motion.span 
                 animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                 className="text-[#9B8B6E] text-xl inline-block"
               >
                 +
               </motion.span>
            </div>
          </Link>

          {/* Expandable Content */}
          <AnimatePresence initial={false}>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 pt-2 flex flex-col md:flex-row gap-8 items-start">
                  {project.media && (
                    <div className="w-full md:w-[320px] aspect-video relative rounded-lg overflow-hidden bg-[#E8E1D5] border border-[#D4C9B8]">
                      <img 
                        src={project.media} 
                        alt={project.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 max-w-xl">
                    <p className="text-[15px] text-[#5A5650] leading-relaxed">
                      {project.oneLiner}
                    </p>
                    <Link href={`/experiments/${project.slug}`} className="inline-block mt-4 text-[13px] font-medium text-[#1A1814] border-b border-[#1A1814] hover:opacity-70 transition-opacity">
                      Read Project Story →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
