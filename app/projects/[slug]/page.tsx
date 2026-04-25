import fs from 'fs';
import path from 'path';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import { notFound } from 'next/navigation';
import { projects as veliteProjects } from '#velite';
import * as runtime from 'react/jsx-runtime';
import SCurveScrollFlow from '@/components/SCurveScrollFlow';
import type { Metadata } from 'next';

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

function renderMDX(code: string) {
  const Content = getMDXComponent(code);
  return <Content />;
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProjects() {
  const dir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const projects = await Promise.all(
    files.map(async (file) => {
      const contentModule = await import(`@/content/projects/${file}`);
      return contentModule.default;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = veliteProjects.find((p) => p.slug === `projects/${slug}`);

  if (!post) {
    return { title: 'Project Not Found' };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.domain[0] || 'Work')}`;
  const imageUrl = post.coverImage || ogImageUrl;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.domain,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const currentIndex = projects.findIndex(p => p.slug === slug);
  
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Check if there is an MDX version from Velite
  const mdxProject = veliteProjects.find(p => p.slug === `projects/${slug}`);

  return (
    <main className="relative z-10 min-h-screen flex flex-col bg-transparent">
      <ProjectHero project={project} />
      
      {mdxProject && (
        <SCurveScrollFlow>
          {renderMDX(mdxProject.code)}
        </SCurveScrollFlow>
      )}

      <ProjectStory project={project} />
      <ProjectNotes project={project} />
      <ProjectFooterNav prev={prev} next={next} collection="projects" />
    </main>
  );
}
