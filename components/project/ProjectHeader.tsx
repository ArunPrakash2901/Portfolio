export default function ProjectHeader({ project }: { project: any }) {
  return (
    <div className="flex h-full flex-col justify-center gap-8 bg-[#F7F4EF]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border-[0.5px] border-[#E0DAD0] bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[#9B8B6E]">
          {project.status}
        </span>
        {project.builtDate && (
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#9B8B6E]">
            Built {project.builtDate}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="font-serif text-4xl text-[#1A1814] md:text-5xl">
          {project.name}
        </h1>
        <p className="max-w-xl text-lg italic leading-relaxed text-[#5A5650]">
          {project.oneLiner}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((item: string) => (
          <span
            key={item}
            className="rounded-full border-[0.5px] border-[#E0DAD0] bg-[#EFEBE3] px-3 py-1.5 font-mono text-[11px] text-[#9B8B6E] uppercase tracking-widest"
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
            className="rounded-lg bg-[#1A1814] px-5 py-2.5 text-sm font-medium text-[#F7F4EF] transition-all hover:opacity-90"
          >
            Live App ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border-[0.5px] border-[#E0DAD0] px-5 py-2.5 text-sm font-medium text-[#5A5650] transition-all hover:bg-white"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
