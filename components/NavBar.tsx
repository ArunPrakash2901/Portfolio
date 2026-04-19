'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MusicRedirectModal from './MusicRedirectModal';

const NAV_SECTIONS = ['hero', 'projects', 'built-for-fun', 'blog'] as const;
type Section = (typeof NAV_SECTIONS)[number];

interface NavBarProps {
  onContactClick: () => void;
}

export default function NavBar({ onContactClick }: NavBarProps) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -60% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const linkClass = (section: Section) =>
    `text-[13px] transition-colors ${
      activeSection === section
        ? 'text-[#1A1814] font-medium underline decoration-[1px] underline-offset-4'
        : 'text-[#5A5650] hover:text-[#1A1814]'
    }`;

  const ctaClass = "text-[12px] text-[#1A1814] border-[0.5px] border-[#1A1814] px-4 py-1.5 rounded-full font-medium hover:bg-[#1A1814] hover:text-[#F7F4EF] transition-colors cursor-pointer";

  return (
    <div className="sticky top-0 z-50 bg-[#F7F4EF] rounded-t-xl">
      <MusicRedirectModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        instaUrl="https://www.instagram.com/requiem_aeternam_2025"
      />
      <header className="flex items-center justify-between px-8 py-4 border-b-[0.5px] border-[#E0DAD0]">
        <Link href="/#hero" className={`font-serif text-base transition-colors ${activeSection === 'hero' ? 'text-[#1A1814] font-bold' : 'text-[#1A1814]'}`}>
          ~/arun-k
        </Link>
        <nav className="flex items-center gap-7">
          <Link href="/#projects" className={linkClass('projects')}>
            Projects
          </Link>
          <Link href="/#built-for-fun" className={linkClass('built-for-fun')}>
            Built for fun
          </Link>
          <Link href="/#blog" className={linkClass('blog')}>
            Blog
          </Link>
          <div className="flex items-center gap-3 ml-2">
            <button
              onClick={() => setIsMusicModalOpen(true)}
              className={ctaClass}
            >
              <span className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </span>
            </button>
            <Link
              href="/arun-krishnasamy-resume.pdf"
              target="_blank"
              className={ctaClass}
            >
              CV
            </Link>
            <button
              onClick={onContactClick}
              className={ctaClass}
            >
              Contact me
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
