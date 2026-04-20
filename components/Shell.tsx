'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ContactModal from '@/components/ContactModal';
import Link from 'next/link';

export default function Shell({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-[#F7F4EF] rounded-xl border-[0.5px] border-[#E0DAD0] flex flex-col overflow-visible max-w-[1400px] w-full mx-auto shadow-sm relative">
      <NavBar onContactClick={() => setIsContactOpen(true)} />

      {children}

      <footer className="bg-[#0F0D0A] px-8 py-9 flex items-center justify-between">
        <span className="font-serif text-lg text-[#F7F4EF]">Arun Krishnasamy</span>
        <div className="flex gap-6">
          <Link href="https://www.linkedin.com/in/apkrishnasamy/" target="_blank" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">LinkedIn</Link>
          <Link href="https://github.com/ArunPrakash2901" target="_blank" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">GitHub</Link>
          <Link href="https://www.kaggle.com/lethargicmaster" target="_blank" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Kaggle</Link>
          <Link href="https://www.instagram.com/arun_prakash_007" target="_blank" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Instagram</Link>
        </div>
        <button 
          onClick={() => setIsContactOpen(true)}
          className="text-[13px] text-[#F7F4EF] border-[0.5px] border-[#5A5650] px-5 py-2 rounded-full hover:bg-white/10 transition-colors"
        >
          Get in touch →
        </button>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
