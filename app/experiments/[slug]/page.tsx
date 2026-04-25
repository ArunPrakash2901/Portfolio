import fs from 'fs';
import path from 'path';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import { notFound } from 'next/navigation';
import { experiments as veliteExperiments } from '#velite';
import * as runtime from 'react/jsx-runtime';

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

function renderMDX(code: string) {
  const Content = getMDXComponent(code);
  return <Content />;
}

async function getExperiments() {
  const dir = path.join(process.cwd(), 'content/experiments');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const experiments = await Promise.all(
    files.map(async (file) => {
      const contentModule = await import(
        /* webpackExclude: /\.mdx$/ */
        `@/content/experiments/${file.replace('.ts', '')}`
      );
      return contentModule.default;
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

  // Check if there is an MDX version from Velite
  const mdxExperiment = veliteExperiments.find(e => e.slug === `experiments/${slug}`);

  return (
    <main className="relative z-10 min-h-screen flex flex-col bg-transparent">
      <ProjectHero project={project} />

      {mdxExperiment && (
        <article className="mx-auto mb-32 max-w-prose rounded-[28px] bg-[#EFEBE3]/82 px-8 pt-16 pb-10 font-light backdrop-blur-sm">
          <div className="prose prose-stone prose-lg max-w-none">
            {renderMDX(mdxExperiment.code)}
          </div>
        </article>
      )}

      <ProjectStory project={project} />
      <ProjectNotes project={project} />
      <ProjectFooterNav prev={prev} next={next} collection="experiments" />
    </main>
  );
}

