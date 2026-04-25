import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { ComponentType } from 'react';

type ProjectArtifactData = Record<string, unknown> & {
  customComponent?: string;
  liveUrl?: string;
  media?: string;
  name: string;
};

const customArtifactComponents: Record<string, ComponentType> = {
  YinYangCanvas: dynamic(() => import('@/components/experiments/YinYangCanvas')),
};

export default function ProjectArtifact({ project }: { project: ProjectArtifactData }) {
  const CustomComponent = project.customComponent
    ? customArtifactComponents[project.customComponent]
    : null;

  return (
    <div className="rounded-2xl bg-stone-100 p-2">
      <div className="relative min-h-[320px] overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white md:min-h-[420px]">
        {CustomComponent ? (
          <div className="h-full w-full">
            <CustomComponent />
          </div>
        ) : project.liveUrl ? (
          <iframe
            src={project.liveUrl}
            className="h-full w-full border-none"
            title={project.name}
          />
        ) : project.media ? (
          <div className="relative h-full w-full">
            <Image
              src={project.media}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-stone-400">
            Preview unavailable
          </div>
        )}
      </div>
    </div>
  );
}
