import fs from 'fs';
import path from 'path';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectArtifact from '@/components/project/ProjectArtifact';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/projects');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.ts'))
    .map(file => ({
      slug: file.replace('.ts', '')
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const projectModule = await import(`@/content/projects/${slug}`);
    const project = projectModule.default;

    return (
      <main className="bg-[#F7F4EF] min-h-screen">
        <ProjectHeader project={project} />
        <ProjectArtifact project={project} />
        <ProjectStory project={project} />
        <ProjectNotes project={project} />
        <ProjectFooterNav />
      </main>
    );
  } catch (error) {
    console.error(`Failed to load project: ${slug}`, error);
    notFound();
  }
}
