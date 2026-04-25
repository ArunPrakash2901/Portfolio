import ProjectHero from '@/components/project/ProjectHero';
import ProjectStory from '@/components/project/ProjectStory';
import ProjectNotes from '@/components/project/ProjectNotes';
import ProjectFooterNav from '@/components/project/ProjectFooterNav';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';
import type { Metadata } from 'next';
import {
  getExperimentBySlug,
  getExperimentPostBySlug,
  getExperiments,
} from '@/lib/data';
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
  const experiments = await getExperiments();
  return experiments.map((experiment) => ({
    slug: experiment.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = await getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  const post = getExperimentPostBySlug(slug);
  const title = post?.title ?? experiment.name;
  const description = post?.summary ?? experiment.oneLiner;
  const ogTag = experiment.stack[0] ?? 'Experiment';
  const imageUrl = experiment.media ?? buildOgImageUrl(title, ogTag);

  return buildMetadata({
    title,
    description,
    path: `/experiments/${slug}`,
    type: post?.date ? 'article' : 'website',
    image: imageUrl,
    imageAlt: title,
    ogTag,
    category: 'portfolio experiment',
    keywords: experiment.stack,
    publishedTime: post?.date,
  });
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiments = await getExperiments();
  const currentIndex = experiments.findIndex((experiment) => experiment.slug === slug);

  if (currentIndex === -1) notFound();

  const project = experiments[currentIndex];
  const prev = currentIndex > 0 ? experiments[currentIndex - 1] : null;
  const next =
    currentIndex < experiments.length - 1 ? experiments[currentIndex + 1] : null;
  const mdxExperiment = getExperimentPostBySlug(slug);
  const title = mdxExperiment?.title ?? project.name;
  const description = mdxExperiment?.summary ?? project.oneLiner;
  const imageUrl =
    project.media ?? buildOgImageUrl(title, project.stack[0] ?? 'Experiment');
  const experimentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: toAbsoluteUrl(`/experiments/${slug}`),
    image: toAbsoluteUrl(imageUrl),
    author: {
      '@type': 'Person',
      name: PERSON_NAME,
      url: SITE_URL,
    },
    dateCreated: normalizeFlexibleDate(project.builtDate),
    datePublished:
      mdxExperiment?.date ?? normalizeFlexibleDate(project.builtDate),
    genre: 'Portfolio experiment',
    inLanguage: 'en-AU',
    keywords: project.stack.join(', '),
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col bg-transparent">
      <JsonLd data={experimentJsonLd} />
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
