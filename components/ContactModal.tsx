'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, FileText } from 'lucide-react';
import { type SVGProps, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10.1H5.9V18h2.44v-7.9ZM7.12 6.2a1.41 1.41 0 1 0 0 2.82 1.41 1.41 0 0 0 0-2.82ZM18.1 13.2c0-2.38-1.27-3.49-2.97-3.49a2.56 2.56 0 0 0-2.33 1.28v-1.1h-2.44c.03.73 0 7.9 0 7.9h2.44v-4.4c0-.24.02-.48.09-.65.19-.48.62-.98 1.35-.98.95 0 1.33.73 1.33 1.8V18H18.1v-4.8Z" />
    </svg>
  );
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-4xl bg-stone-50 border border-stone-200 rounded-[2rem] shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Contact Arun"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200/50 transition-colors z-20 text-stone-500"
              aria-label="Close contact modal"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Column 1: The Pitch */}
              <div className="p-8 md:p-12 bg-stone-100/50 border-b md:border-b-0 md:border-r border-stone-200">
                <div className="aspect-video w-full bg-stone-200 rounded-2xl overflow-hidden mb-8 shadow-inner relative group">
                  <p className="flex h-full items-center justify-center px-6 text-center text-sm font-light text-stone-500">
                    Introduction video placeholder
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-stone-900">Let&apos;s talk.</h3>
                  <p className="text-stone-600 leading-relaxed font-light">
                    I&apos;m looking for a data role, whether that&apos;s in analytics, engineering, or somewhere in the middle. I may be at the start of my career, but I build relentlessly, I ask the right questions, and I stay at the keyboard until the it makes sense.
                  </p>
                  <p className="text-stone-600 leading-relaxed font-light">
                    If something in this portfolio made you curious, I&apos;d genuinely love to hear from you.
                  </p>
                </div>
              </div>

              {/* Column 2: Actions */}
              <div className="p-8 md:p-12 flex flex-col justify-center gap-4">
                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-400">Direct Channels</span>
                </div>
                
                <div className="bg-stone-900 text-stone-50 rounded-2xl overflow-hidden border border-stone-800">
                  <div className="p-6 border-b border-stone-800 flex items-center gap-4">
                    <Mail size={22} className="text-stone-400" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Send an Email</span>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider">Fastest Response</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-stone-800">
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=abi62994@gmail.com"
                      target="_blank"
                      className="py-3 text-[10px] font-bold text-center hover:bg-stone-800 transition-colors uppercase tracking-[0.1em] text-stone-400 hover:text-stone-50"
                    >
                      Gmail
                    </a>
                    <a 
                      href="https://outlook.office.com/mail/deeplink/compose?to=abi62994@gmail.com"
                      target="_blank"
                      className="py-3 text-[10px] font-bold text-center hover:bg-stone-800 transition-colors uppercase tracking-[0.1em] text-stone-400 hover:text-stone-50"
                    >
                      Outlook
                    </a>
                    <a 
                      href="mailto:abi62994@gmail.com"
                      className="py-3 text-[10px] font-bold text-center hover:bg-stone-800 transition-colors uppercase tracking-[0.1em] text-stone-400 hover:text-stone-50"
                    >
                      Default
                    </a>
                  </div>
                </div>

                <a
                  href="/arun-krishnasamy-resume.pdf"
                  target="_blank"
                  className="group flex items-center justify-between p-6 bg-white border border-stone-200 text-stone-900 rounded-2xl hover:border-stone-400 transition-all transform hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <FileText size={22} className="text-stone-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Download Resume</span>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider">PDF · 120kb</span>
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400">→</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/apkrishnasamy/"
                  target="_blank"
                  className="group flex items-center justify-between p-6 bg-white border border-stone-200 text-stone-900 rounded-2xl hover:border-stone-400 transition-all transform hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <LinkedInIcon className="size-[22px] text-[#0A66C2]" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Connect on LinkedIn</span>
                      <span className="text-[11px] text-stone-400 uppercase tracking-wider">Professional Network</span>
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
