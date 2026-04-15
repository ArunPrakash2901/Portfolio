'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_SECTIONS = ['hero', 'work', 'sandbox', 'writing'] as const;
type Section = (typeof NAV_SECTIONS)[number];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

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
          // Trigger when the section occupies at least 30% of the viewport
          threshold: 0.3,
          // Shrink the detection zone slightly from the top so the active link
          // updates just before the section fully enters view
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

  return (
    <div className="sticky top-0 z-50 bg-[#F7F4EF] rounded-t-xl">
      {/* pf-label strip */}
      <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999] px-3 py-1.5 bg-[#EFEBE3] border-b-[0.5px] border-[#E0DAD0] flex items-center gap-2 rounded-t-xl">
        nav
      </div>

      <header className="flex items-center justify-between px-8 py-4 border-b-[0.5px] border-[#E0DAD0]">
        <Link href="/#hero" className={`font-serif text-base transition-colors ${activeSection === 'hero' ? 'text-[#1A1814] font-bold' : 'text-[#1A1814]'}`}>
          ~/arun-k
        </Link>
        <nav className="flex items-center gap-7">
          <Link href="/#work" className={linkClass('work')}>
            Work
          </Link>
          <Link href="/#sandbox" className={linkClass('sandbox')}>
            Sandbox
          </Link>
          <Link href="/#writing" className={linkClass('writing')}>
            Writing
          </Link>
          <Link
            href="/resume.pdf"
            className="text-[13px] text-[#5A5650] hover:text-[#1A1814] transition-colors"
          >
            Resume
          </Link>
          <Link
            href="mailto:contact@arun.dev"
            className="text-[12px] text-[#1A1814] border-[0.5px] border-[#1A1814] px-4 py-1.5 rounded-full font-medium hover:bg-[#1A1814] hover:text-white transition-colors"
          >
            Contact me
          </Link>
        </nav>
      </header>
    </div>
  );
}
