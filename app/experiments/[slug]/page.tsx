import fs from 'fs';
import path from 'path';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import { notFound } from 'next/navigation';

async function getExperiments() {
  const dir = path.join(process.cwd(), 'content/experiments');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const experiments = await Promise.all(
    files.map(async (file) => {
      const module = await import(`@/content/experiments/${file.replace('.ts', '')}`);
      return module.default;
    })
  );
  return experiments;
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/experiments');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.ts'))
    .map(file => ({
      slug: file.replace('.ts', '')
    }));
}

export default async function ExperimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiments = await getExperiments();
  const currentIndex = experiments.findIndex(e => e.slug === slug);
  
  if (currentIndex === -1) notFound();

  const project = experiments[currentIndex];
  const prev = currentIndex > 0 ? experiments[currentIndex - 1] : null;
  const next = currentIndex < experiments.length - 1 ? experiments[currentIndex + 1] : null;

  return (
    <main className="bg-[#F7F4EF] min-h-screen flex flex-col">
      <ProjectHero project={project} />
      <ProjectStory project={project} />
      <ProjectNotes project={project} />
      <ProjectFooterNav prev={prev} next={next} collection="experiments" />
    </main>
  );
}
