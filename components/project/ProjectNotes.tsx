export default function ProjectNotes({ project }: { project: any }) {
  if (!project.notes || project.notes.length === 0) return null;

  return (
    <section className="bg-[#F7F4EF] py-20 px-8 border-b border-[#E0DAD0]">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9B8B6E] mb-8">Technical Logs & Observations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {project.notes.map((note: string, i: number) => (
            <div key={i} className="flex gap-4 items-start group">
              <span className="font-mono text-[11px] text-[#D4C9B8] mt-1 group-hover:text-[#9B8B6E] transition-colors">0{i+1}</span>
              <p className="text-[14px] text-[#5A5650] leading-[1.6]">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
