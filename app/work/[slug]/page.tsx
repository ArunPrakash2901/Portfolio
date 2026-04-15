import { projects } from '#velite';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';
import type { Metadata } from 'next';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.slug === `projects/${slug}` && p.category === 'Work'
  );

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(project.title)}&tag=${encodeURIComponent(project.domain[0] || project.category)}`;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      publishedTime: project.date,
      tags: project.domain,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.category === 'Work')
    .map((p) => ({
      slug: p.slug.replace('projects/', ''),
    }));
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.slug === `projects/${slug}` && p.category === 'Work'
  );

  if (!project) notFound();

  const MDXContent = useMDXComponent(project.code);

  return (
    <main className="w-full flex-1 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EFEBE3] border-b-[0.5px] border-[#E0DAD0] text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999]">
        work / {project.domain[0]?.toLowerCase() || 'project'}
      </div>

      <article className="bg-[#F7F4EF] p-8 md:p-12 lg:p-16 max-w-4xl mx-auto w-full">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#9B8B6E] border-[0.5px] border-[#D4C9B8] px-3 py-1 rounded-full bg-[#EFEBE3]">
              {project.category}
            </span>
            {project.domain.map((d) => (
              <span
                key={d}
                className="text-[10px] tracking-[0.08em] uppercase text-[#5A5650]"
              >
                {d}
              </span>
            ))}
            {project.isLive && (
              <div className="inline-flex items-center gap-[5px] bg-[#1A1814] text-[#D4C9B8] text-[10px] font-medium px-2.5 py-1 rounded-full">
                <div className="w-[5px] h-[5px] rounded-full bg-[#4CAF7E] animate-pulse" />
                Live
              </div>
            )}
          </div>
          <h1 className="font-serif text-[36px] leading-[1.15] text-[#1A1814] mb-4">
            {project.title}
          </h1>
          <p className="text-[15px] text-[#5A5650] leading-[1.7] max-w-2xl">
            {project.summary}
          </p>
          <div className="h-[0.5px] bg-[#E0DAD0] mt-8" />
        </header>

        <div className="prose prose-neutral max-w-none font-sans text-[#5A5650] prose-headings:font-serif prose-headings:text-[#1A1814] prose-a:text-[#9B8B6E] prose-a:underline-offset-4 prose-strong:text-[#1A1814]">
          <MDXContent />
        </div>
      </article>
    </main>
  );
}
