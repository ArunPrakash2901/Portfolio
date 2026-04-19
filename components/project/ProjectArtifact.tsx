import Image from 'next/image';

export default function ProjectArtifact({ project }: { project: any }) {
  const hasMedia = project.media || project.liveUrl;
  
  if (!hasMedia && !project.customComponent) return null;

  return (
    <section className="bg-[#EFEBE3] py-20 px-8 border-b border-[#E0DAD0]">
      <div className="max-w-5xl mx-auto">
        <div className="aspect-video w-full bg-[#E8E1D5] rounded-3xl overflow-hidden border border-[#D4C9B8] shadow-2xl relative">
          {project.media ? (
            <Image 
              src={project.media} 
              alt={project.name} 
              fill 
              className="object-cover"
            />
          ) : project.liveUrl ? (
            <iframe src={project.liveUrl} className="w-full h-full border-none" />
          ) : (
            <div className="flex items-center justify-center h-full text-[#9B8B6E] italic">
              Custom Component: {project.customComponent}
            </div>
          )}
        </div>
        {(project.media && project.liveUrl) && (
          <div className="mt-8 flex justify-end">
            <a href={project.liveUrl} target="_blank" className="text-[13px] font-medium text-[#1A1814] border-b border-[#1A1814] hover:opacity-70 transition-opacity">
              Visit Live Site ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
