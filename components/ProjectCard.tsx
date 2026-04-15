"use client";

import { motion } from 'framer-motion';

export default function ProjectCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.article 
      className="bg-[#141414] border border-white/5 p-8 relative texture-pattern"
      initial={{ y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  )
}
