'use client';

import { motion } from 'framer-motion';

export default function YinYangCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F7F4EF] p-6">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="relative w-full aspect-square max-w-[280px] rounded-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(to right, #1A1814 50%, #EFEBE3 50%)'
        }}
      >
        {/* Top half circle (Black dot on White half) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full bg-[#1A1814] flex items-center justify-center">
          <div className="w-1/4 h-1/4 rounded-full bg-[#EFEBE3]" />
        </div>
        
        {/* Bottom half circle (White dot on Black half) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full bg-[#EFEBE3] flex items-center justify-center">
          <div className="w-1/4 h-1/4 rounded-full bg-[#1A1814]" />
        </div>
      </motion.div>
    </div>
  );
}
