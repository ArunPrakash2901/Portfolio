"use client";

import { useState, useRef, useEffect } from 'react';

export default function CompassHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-[28px] text-[#1A1814] m-0">The Data Professional Compass</h2>
          <div className="relative" ref={popoverRef}>
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="group flex items-center justify-center w-5 h-5 rounded-full border border-[#556E74] text-[#2F6B75] hover:border-[#1A1814] hover:text-[#1A1814] transition-all"
              aria-label="How to read this chart"
              aria-expanded={isOpen}
            >
              <span className="text-[10px] font-serif italic">i</span>
            </button>

            {isOpen && (
              <div
                id="compass-info"
                role="region"
                aria-label="Chart explanation"
                style={{
                  position: 'absolute',
                  top: '28px',
                  left: '0',
                  width: 'min(320px, 90vw)',
                  background: '#EFEBE3',
                  border: '0.5px solid #D4C9B8',
                  borderRadius: '8px',
                  padding: '16px',
                  zIndex: 100,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <p style={{
                  fontSize: '12px',
                  color: '#5A5650',
                  lineHeight: 1.7,
                  marginBottom: '12px',
                  fontFamily: 'var(--font-dm-sans), sans-serif'
                }}>
                  Self-assessed snapshot, not a performance review. Each axis is a skill area — further from the centre means more confident.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: 0, margin: 0, listStyle: 'none' }}>
                  {[
                    'Scores are honest estimates, not inflated',
                    'Cloud / Infra at 2% is deliberate — not used it yet',
                    'Hover each axis to see contributing evidence',
                    'The shape matters more than any single number'
                  ].map((line, i) => (
                    <li key={i} style={{
                      fontSize: '11px',
                      color: '#5A5650',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start'
                    }}>
                      <span style={{ color: '#556E74', flexShrink: 0 }}>·</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="text-[12px] text-[#556E74] italic mt-1">honest, self-assessed · hover each axis for breakdown</p>
      </div>
    </div>
  );
}
