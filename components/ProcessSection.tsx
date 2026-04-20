'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Understand before touching',
    desc: 'Frame the question. Challenge the brief.',
    highlight: 'A wrong question answered perfectly is still wrong.',
    bgColor: '#F7F4EF',
    textColor: '#1A1814',
    accentColor: '#9B8B6E',
    img: '/images/process-01.png' 
  },
  {
    num: '02',
    title: 'Let the data speak first',
    desc: 'EDA before assumptions.',
    highlight: "The data usually knows something you don't.",
    bgColor: '#E2E8F0',
    textColor: '#0F172A',
    accentColor: '#64748B',
    img: '/images/process-02.png'
  },
  {
    num: '03',
    title: 'Model with intent',
    desc: 'Right tool, not flashiest.',
    highlight: 'Interpretability often matters more than accuracy.',
    bgColor: '#2D3748', // Mid-Tone Slate
    textColor: '#F8FAFC',
    accentColor: '#4A5568', // Darker Slate Accent
    img: '/images/process-03.png'
  },
  {
    num: '04',
    title: 'Make it land',
    desc: "Speak to people who don't think in p-values.",
    highlight: "Insight that isn't understood isn't insight.",
    bgColor: '#FAF7ED',
    textColor: '#1A1814',
    accentColor: '#B45309',
    img: '/images/process-04.png'
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const n = STEPS.length;
      const deadzone = 0.15; // 15% width threshold

      // Calculate which panel the scroll is "in"
      const currentRawStep = Math.floor(latest * n);
      const clampedRawStep = Math.min(Math.max(currentRawStep, 0), n - 1);
      
      // Calculate progress WITHIN that current step range (0 to 1)
      const stepProgress = (latest - clampedRawStep / n) * n;

      // Hysteresis / Deadzone Logic
      // Only switch to the NEXT step if we are > 15% into it
      // Only switch to the PREVIOUS step if we are < 85% into the current step
      if (clampedRawStep > activeStep && stepProgress > deadzone) {
        setActiveStep(clampedRawStep);
      } else if (clampedRawStep < activeStep && stepProgress < (1 - deadzone)) {
        setActiveStep(clampedRawStep);
      }
    });
  }, [scrollYProgress, activeStep]);

  return (
    <motion.section 
      className="relative transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: STEPS[activeStep].bgColor }}
    >
      <div className="p-8 md:p-12 md:pb-8">
        <h2 
          className="font-serif text-[28px] md:text-[36px] m-0 transition-colors duration-700"
          style={{ color: STEPS[activeStep].textColor }}
        >
          How I deal with data problems
        </h2>
        <p 
          className="text-[12px] md:text-[14px] italic mt-1 transition-colors duration-700"
          style={{ color: STEPS[activeStep].textColor, opacity: 0.7 }}
        >
          my approach to thinking, modeling, and delivering
        </p>
      </div>

      <div ref={containerRef} className="flex flex-col md:flex-row min-h-screen">
        
        {/* Visual Side: Sticky Images with Asymmetric Masking */}
        <div className="md:w-1/2 h-[35vh] md:h-screen sticky top-0 flex items-center justify-center overflow-hidden order-1 md:order-2 z-10">
           <div className="mask-scrolly relative w-full h-full">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                 animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
                 transition={{ duration: 0.25, ease: "easeOut" }}
                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                 style={{ 
                    backgroundImage: `url(${STEPS[activeStep].img})`,
                 }}
               />
             </AnimatePresence>
           </div>
        </div>

        {/* Text Side: Scrollable Narrative */}
        <div className="md:w-1/2 flex flex-col order-2 md:order-1">
          {STEPS.map((step, i) => (
            <div 
              key={i} 
              className="min-h-[60vh] md:min-h-screen flex flex-col justify-center p-8 md:p-24 py-12 md:py-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="font-serif text-[80px] md:text-[120px] leading-none mb-2 md:mb-4 transition-colors duration-700"
                  style={{ color: step.accentColor, opacity: 0.15 }}
                >
                  {step.num}
                </div>
                <h3 
                  className="font-serif text-[32px] md:text-[42px] mb-6 md:mb-8 leading-[1.1] transition-colors duration-700"
                  style={{ color: step.textColor }}
                >
                  {step.title}
                </h3>
                <div 
                  className="text-[18px] md:text-[20px] leading-[1.6] max-w-[440px] transition-colors duration-700"
                  style={{ color: step.textColor, opacity: 0.8 }}
                >
                  {step.desc} 
                  <span 
                    className="block mt-6 md:mt-8 border-l-2 pl-6 md:pl-8 italic font-medium text-[16px] md:text-[18px]"
                    style={{ borderColor: step.accentColor, color: step.accentColor }}
                  >
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
