export default function ProjectNotes({ project }: { project: any }) {
  const notes = (project.notes ?? []).map((note: any, index: number) =>
    typeof note === 'string'
      ? {
          title: `Technical Note ${String(index + 1).padStart(2, '0')}`,
          body: note,
        }
      : note
  );

  if (notes.length === 0) return null;

  return (
    <section 
      style={{ borderTop: '2px solid #1A1814' }}
      className="bg-[#EFEBE3] px-8 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-sm uppercase tracking-[0.24em] text-[#9B8B6E]">
            Technical Notes
          </span>
          <div className="h-[0.5px] flex-1 bg-[#E0DAD0]" />
        </div>

        <div className="space-y-16">
          {notes.map((note: any, i: number) => (
            <article key={`${note.title}-${i}`} className="border-t-[0.5px] border-[#E0DAD0] pt-10 first:border-t-0 first:pt-0">
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: '#9B8B6E',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '8px'
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-18px font-medium text-[#1A1814] mb-[8px]" style={{ fontSize: '18px' }}>
                  {note.title}
                </h3>
                <p className="max-w-prose text-[16px] leading-[1.8] text-[#5A5650]">
                  {note.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
