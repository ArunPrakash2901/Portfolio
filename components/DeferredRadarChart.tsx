'use client';

import dynamic from 'next/dynamic';

type RadarData = {
  competency: string;
  score: number;
  contributingProjects?: string[];
  [key: string]: unknown;
};

const RadarChart = dynamic(() => import('@/components/RadarChart'), {
  loading: () => (
    <div className="h-[320px] w-full rounded-full border border-[#D4C9B8] bg-[radial-gradient(circle,rgba(239,235,227,0.9)_0%,rgba(239,235,227,0.6)_55%,rgba(224,218,208,0.8)_100%)] md:h-[400px]" />
  ),
});

export default function DeferredRadarChart({ data }: { data: RadarData[] }) {
  return <RadarChart data={data} />;
}
