import fs from 'fs';
import path from 'path';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import { notFound } from 'next/navigation';

async function getProjects() {
  const dir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const projects = await Promise.all(
    files.map(async (file) => {
      const module = await import(`@/content/projects/${file.replace('.ts', '')}`);
      return module.default;
    })
  );
  return projects;
}

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
  const projects = await getProjects();
  const currentIndex = projects.findIndex(p => p.slug === slug);
  
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="bg-[#F7F4EF] min-h-screen flex flex-col">
      <ProjectHero project={project} />
      <ProjectStory project={project} />
      <ProjectNotes project={project} />
      <ProjectFooterNav prev={prev} next={next} collection="projects" />
    </main>
  );
}
