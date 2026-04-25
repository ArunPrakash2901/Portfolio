'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface MusicRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  instaUrl: string;
}

export default function MusicRedirectModal({
  isOpen,
  onClose,
  instaUrl,
}: MusicRedirectModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="max-w-md w-full bg-stone-50 border border-stone-200 rounded-2xl p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Music redirect"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              off the clock
            </span>
            <h3 className="font-serif text-2xl text-stone-900 mt-3">
              The other side.
            </h3>
            <p className="text-stone-600 font-light leading-relaxed mt-3">
              This opens Instagram. I post acoustic covers and the occasional
              piano piece there — nothing to do with data, everything to do
              with staying sane.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setTimeout(() => window.open(instaUrl, '_blank'), 300);
                }}
                className="w-full sm:w-auto flex-1 text-center bg-stone-900 text-white py-3 px-6 rounded-xl font-medium transition-transform hover:-translate-y-0.5"
              >
                Listen on Instagram ↗
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto flex-1 text-center bg-white border border-stone-200 text-stone-700 py-3 px-6 rounded-xl font-medium transition-colors hover:bg-stone-100"
              >
                Back to portfolio
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
