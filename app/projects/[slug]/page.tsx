import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';
import SCurveScrollFlow from '@/components/SCurveScrollFlow';
import type { Metadata } from 'next';
import { getProjectBySlug, getProjectPostBySlug, getProjects } from '@/lib/data';
import {
  PERSON_NAME,
  SITE_URL,
  buildMetadata,
  buildOgImageUrl,
  normalizeFlexibleDate,
  toAbsoluteUrl,
} from '@/lib/seo';

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

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const post = getProjectPostBySlug(slug);
  const title = post?.title ?? project.name;
  const description = post?.summary ?? project.oneLiner;
  const ogTag = post?.domain[0] ?? project.stack[0] ?? 'Project';
  const imageUrl =
    post?.coverImage ?? project.media ?? buildOgImageUrl(title, ogTag);

  return buildMetadata({
    title,
    description,
    path: `/projects/${slug}`,
    type: post?.date ? 'article' : 'website',
    image: imageUrl,
    imageAlt: title,
    ogTag,
    category: 'portfolio project',
    keywords: [...project.stack, ...(post?.domain ?? [])],
    publishedTime: post?.date,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const mdxProject = getProjectPostBySlug(slug);
  const title = mdxProject?.title ?? project.name;
  const description = mdxProject?.summary ?? project.oneLiner;
  const ogTag = mdxProject?.domain[0] ?? project.stack[0] ?? 'Project';
  const imageUrl =
    mdxProject?.coverImage ?? project.media ?? buildOgImageUrl(title, ogTag);
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: toAbsoluteUrl(`/projects/${slug}`),
    image: toAbsoluteUrl(imageUrl),
    author: {
      '@type': 'Person',
      name: PERSON_NAME,
      url: SITE_URL,
    },
    dateCreated: normalizeFlexibleDate(project.builtDate),
    datePublished:
      mdxProject?.date ?? normalizeFlexibleDate(project.builtDate),
    genre: 'Portfolio project',
    inLanguage: 'en-AU',
    keywords: [...project.stack, ...(mdxProject?.domain ?? [])].join(', '),
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col bg-transparent">
      <JsonLd data={projectJsonLd} />
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
