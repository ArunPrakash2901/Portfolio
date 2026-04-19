export default function ProjectHeader({ project }: { project: any }) {
  return (
    <header className="px-8 py-16 md:px-12 md:py-24 max-w-5xl mx-auto border-b border-[#E0DAD0]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-[#9B8B6E]">
          <span>{project.builtDate}</span>
          <span className="w-1 h-1 rounded-full bg-[#D4C9B8]"></span>
          <span>{project.status}</span>
        </div>
        <h1 className="font-serif text-[48px] md:text-[72px] leading-[1.1] text-[#1A1814] -ml-1">
          {project.name}
        </h1>
        <p className="text-[20px] md:text-[24px] text-[#5A5650] leading-[1.5] max-w-2xl font-light italic">
          {project.oneLiner}
        </p>
        <div className="flex gap-2 flex-wrap mt-4">
          {project.stack.map((tech: string) => (
            <span key={tech} className="font-mono text-[10px] border border-[#D4C9B8] rounded px-2.5 py-1 text-[#5A5650] uppercase tracking-wider bg-[#F7F4EF]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
