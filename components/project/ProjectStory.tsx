export default function ProjectStory({ project }: { project: any }) {
  return (
    <section className="px-8 py-20 md:px-12 md:py-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 border-b border-[#E0DAD0]">
      <div className="flex flex-col gap-8">
        <div>
          <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9B8B6E] mb-2">Metrics</h4>
          <div className="flex flex-col gap-3">
             <div className="flex justify-between border-b border-[#E0DAD0] pb-2">
               <span className="text-[13px] text-[#5A5650]">Time Spent</span>
               <span className="text-[13px] font-medium text-[#1A1814]">{project.timeSpent}</span>
             </div>
             <div className="flex justify-between border-b border-[#E0DAD0] pb-2">
               <span className="text-[13px] text-[#5A5650]">Difficulty</span>
               <span className="text-[13px] font-medium text-[#1A1814]">{project.difficulty}/10</span>
             </div>
          </div>
        </div>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" className="text-[12px] text-[#1A1814] border-[0.5px] border-[#1A1814] px-4 py-2 rounded-full font-medium hover:bg-[#1A1814] hover:text-[#F7F4EF] transition-colors text-center">
            View Source Code
          </a>
        )}
      </div>

      <div className="flex flex-col gap-12">
        <div>
          <h3 className="font-serif text-[28px] text-[#1A1814] mb-4">Why this project?</h3>
          <p className="text-[17px] text-[#5A5650] leading-[1.7]">{project.why}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9B8B6E] mb-3">The Hardest Part</h4>
            <p className="text-[15px] text-[#5A5650] leading-[1.6]">{project.hard}</p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9B8B6E] mb-3">Next Time</h4>
            <p className="text-[15px] text-[#5A5650] leading-[1.6]">{project.differently}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
