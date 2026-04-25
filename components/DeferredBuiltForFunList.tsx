'use client';

import dynamic from 'next/dynamic';

type Experiment = {
  slug: string;
  name: string;
  builtDate: string;
  stack: string[];
  oneLiner: string;
  media?: string;
};

const BuiltForFunList = dynamic(() => import('@/components/BuiltForFunList'), {
  loading: () => (
    <div className="flex flex-col border-t border-[#E0DAD0]">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-[#E0DAD0] px-8 py-6"
        >
          <div className="flex flex-1 flex-col gap-3">
            <div className="h-5 w-40 rounded bg-[#E8E1D5]" />
            <div className="h-3 w-56 rounded bg-[#E8E1D5]" />
          </div>
          <div className="ml-4 h-6 w-6 rounded-full bg-[#E8E1D5]" />
        </div>
      ))}
    </div>
  ),
});

export default function DeferredBuiltForFunList({
  experiments,
}: {
  experiments: Experiment[];
}) {
  return <BuiltForFunList experiments={experiments} />;
}
