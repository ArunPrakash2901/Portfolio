'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GLOSSARY = {
  "Minimax AI": "An algorithm that looks ahead in a game and chooses moves by assuming the opponent will always respond in the best possible way."
};

function TechnicalText({ text }: { text: string }) {
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  // Simple replacement logic for glossary terms
  const parts = text.split(/(Minimax AI)/g);

  return (
    <span className="relative">
      {parts.map((part, i) => {
        if (part === "Minimax AI") {
          return (
            <span 
              key={i} 
              className="relative inline-block cursor-help group"
              onMouseEnter={() => setHoveredTerm(part)}
              onMouseLeave={() => setHoveredTerm(null)}
            >
              <span className="border-b border-dotted border-[#9B8B6E] text-[#1A1814] font-medium">
                {part}
              </span>
              
              <AnimatePresence>
                {hoveredTerm === part && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-50 pointer-events-none"
                  >
                    <div className="bg-[#1A1814] text-[#F7F4EF] p-4 rounded-xl shadow-xl border border-[#2E2A25]">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B8B6E] block mb-2">
                        Definition
                      </span>
                      <span className="text-[12px] leading-relaxed font-normal block">
                        {GLOSSARY[part as keyof typeof GLOSSARY]}
                      </span>
                      {/* Triangle Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1A1814]"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export default function ProjectNotes({ project }: { project: any }) {
  const notes = (project.notes ?? []).map((note: any, index: number) =>
    typeof note === 'string'
      ? {
          title: `Technical Note ${String(index + 1).padStart(2, '0')}`,
          body: note,
        }
      : note
  );

  if (notes.length === 0) return null;

  return (
    <section 
      style={{ borderTop: '2px solid #1A1814' }}
      className="bg-[#EFEBE3] px-8 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-sm uppercase tracking-[0.24em] text-[#9B8B6E]">
            Technical Notes
          </span>
          <div className="h-[0.5px] flex-1 bg-[#E0DAD0]" />
        </div>

        <div className="space-y-16">
          {notes.map((note: any, i: number) => (
            <article key={`${note.title}-${i}`} className="border-t-[0.5px] border-[#E0DAD0] pt-10 first:border-t-0 first:pt-0">
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: '#9B8B6E',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '8px'
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[18px] font-medium text-[#1A1814] mb-[8px]">
                  {note.title}
                </h3>
                <div className="max-w-prose text-[16px] leading-[1.8] text-[#5A5650]">
                  <TechnicalText text={note.body} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
