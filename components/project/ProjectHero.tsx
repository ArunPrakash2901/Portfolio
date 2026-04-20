'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const customArtifactComponents = {
} as const;

export default function ProjectHero({ project }: { project: any }) {
  const CustomComponent = project.customComponent
    ? customArtifactComponents[project.customComponent as keyof typeof customArtifactComponents]
    : null;

  return (
    <section className="border-b border-stone-200 bg-[#F7F4EF]">
      <div className="mx-auto max-w-7xl px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-full border border-stone-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] ${project.status.toLowerCase() === 'live' ? 'bg-[#1A1814] text-[#D4C9B8] border-none' : 'bg-white text-stone-500'}`}>
                {project.status.toLowerCase() === 'live' && (
                  <span className="mr-2 flex h-1.5 w-1.5 items-center justify-center">
                    <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-[#4CAF7E] opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4CAF7E]"></span>
                  </span>
                )}
                {project.status}
              </span>
              {project.builtDate && (
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-stone-400">
                  Built {project.builtDate}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl text-stone-900 md:text-6xl leading-[1.1]">
                {project.name}
              </h1>
              <p className="max-w-xl text-lg italic leading-relaxed text-stone-600">
                {project.oneLiner}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 font-mono text-[11px] text-stone-500 uppercase tracking-widest"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 transition-all hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Live App ↗
                </a>
              )}
              {project.linkedInPostUrl && (
                <a
                  href={project.linkedInPostUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[#0A66C2] px-5 py-2.5 text-sm font-medium text-[#0A66C2] transition-all hover:bg-[#0A66C2]/5 hover:-translate-y-0.5 active:translate-y-0"
                >
                  LinkedIn Post ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition-all hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Artifact */}
          <div className="rounded-2xl bg-stone-100 p-2">
            <div className="relative aspect-square md:aspect-video overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white">
              {CustomComponent ? (
                <div className="h-full w-full">
                  <CustomComponent />
                </div>
              ) : project.media ? (
                <div className="relative h-full w-full">
                  <Image
                    src={project.media}
                    alt={project.name}
                    fill
                    className="object-cover"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent, black 20%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)'
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-stone-400">
                  Preview unavailable
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
