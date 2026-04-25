'use client';

import dynamic from 'next/dynamic';

const ProcessSection = dynamic(() => import('@/components/ProcessSection'), {
  ssr: false,
  loading: () => (
    <section className="bg-[#F7F4EF]">
      <div className="p-8 md:p-12 md:pb-8">
        <h2 className="font-serif text-[28px] md:text-[36px] text-[#1A1814] m-0">
          How I deal with data problems
        </h2>
        <p className="text-[12px] md:text-[14px] italic mt-1 text-[#556E74]">
          my approach to thinking, modeling, and delivering
        </p>
      </div>
      <div className="min-h-[220vh] md:min-h-[380vh] bg-[linear-gradient(180deg,rgba(247,244,239,1)_0%,rgba(232,225,213,0.65)_100%)]" />
    </section>
  ),
});

export default function DeferredProcessSection() {
  return <ProcessSection />;
}
