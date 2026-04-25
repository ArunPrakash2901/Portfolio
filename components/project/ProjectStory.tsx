export default function ProjectStory({ project }: { project: any }) {
  const sections = [
    { label: "WHY IT EXISTS", content: project.why, id: "why" },
    { label: "WHAT WAS HARD", content: project.hard, id: "hard" },
    { label: "WHAT I'D DO DIFFERENTLY", content: project.differently, id: "differently" },
  ];

  return (
    <section className="border-b-[0.5px] border-[#E0DAD0] bg-[#EFEBE3] px-8 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {sections.map((section) => (
          <div
            key={section.id}
            className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr] last:mb-0"
          >
            <div className="flex flex-col items-start justify-start">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#556E74]">
                {section.label}
              </span>
            </div>
            <div className="max-w-prose">
              <p className="text-[17px] font-light leading-relaxed text-[#5A5650]">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
