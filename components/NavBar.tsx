'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_SECTIONS = ['hero', 'projects', 'built-for-fun', 'blog'] as const;
type Section = (typeof NAV_SECTIONS)[number];

const MusicRedirectModal = dynamic(() => import('./MusicRedirectModal'));

interface NavBarProps {
  onContactClick: () => void;
}

export default function NavBar({ onContactClick }: NavBarProps) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const terminalLabel = '~/arun-k';

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
    `text-[13px] ${prefersReducedMotion ? '' : 'transition-colors'} ${
      activeSection === section
        ? 'text-[#1A1814] font-medium underline decoration-[1px] underline-offset-4'
        : 'text-[#5A5650] hover:text-[#1A1814]'
    }`;

  const ctaClass = `text-[12px] text-[#1A1814] border-[0.5px] border-[#556E74] px-4 py-1.5 rounded-full font-medium hover:bg-[#2F6B75] hover:text-[#F7F4EF] ${prefersReducedMotion ? '' : 'transition-all duration-300'} cursor-pointer`;

  return (
    <div className="sticky top-0 z-50 bg-[#F7F4EF] rounded-t-xl">
      {isMusicModalOpen ? (
        <MusicRedirectModal
          isOpen={isMusicModalOpen}
          onClose={() => setIsMusicModalOpen(false)}
          instaUrl="https://www.instagram.com/arun_prakash_007"
        />
      ) : null}
      <header className="flex items-center justify-between px-8 py-4 border-b-[0.5px] border-[#E0DAD0]">
        <Link
          href="/#hero"
          aria-label={terminalLabel}
          className={`inline-flex min-w-[10ch] items-center font-mono text-base ${prefersReducedMotion ? '' : 'transition-all duration-300'} ${activeSection === 'hero' ? 'text-[#1A1814] font-bold' : 'text-[#1A1814]'}`}
        >
          <span className={prefersReducedMotion ? '' : 'terminal-label'}>{terminalLabel}</span>
          <span className={`ml-0.5 inline-block h-[1em] w-[1.5px] ${prefersReducedMotion ? '' : 'animate-pulse'} bg-current`} aria-hidden="true" />
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-7">
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
            <a
              href="/arun-krishnasamy-resume.pdf"
              target="_blank"
              className={ctaClass}
            >
              CV
            </a>
            <button
              onClick={onContactClick}
              className={ctaClass}
            >
              Contact me
            </button>
          </div>
        </nav>

        {/* Hamburger button — visible only on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] rounded-md hover:bg-[#E8E1D5] transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-5 h-[1.5px] bg-[#1A1814] transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#1A1814] transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#1A1814] transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#F7F4EF] border-b-[0.5px] border-[#E0DAD0] ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-b-0'
        }`}
      >
        <nav className="flex flex-col px-8 py-5 gap-4">
          <Link
            href="/#projects"
            className={linkClass('projects')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/#built-for-fun"
            className={linkClass('built-for-fun')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Built for fun
          </Link>
          <Link
            href="/#blog"
            className={linkClass('blog')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <div className="h-[0.5px] bg-[#E0DAD0] my-1" />
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setIsMusicModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className={ctaClass}
            >
              <span className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </span>
            </button>
            <a
              href="/arun-krishnasamy-resume.pdf"
              target="_blank"
              className={ctaClass}
            >
              CV
            </a>
            <button
              onClick={() => {
                onContactClick();
                setIsMobileMenuOpen(false);
              }}
              className={ctaClass}
            >
              Contact me
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
