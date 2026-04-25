import { projects } from '#velite';
import { notFound } from 'next/navigation';
import * as runtime from 'react/jsx-runtime';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = projects.find(
    (p) => p.slug === `projects/${slug}` && p.category === 'Writing'
  );

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.domain[0] || 'Writing')}`;

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
          url: ogImageUrl,
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
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.category === 'Writing')
    .map((p) => ({
      slug: p.slug.replace('projects/', ''),
    }));
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = projects.find(
    (p) => p.slug === `projects/${slug}` && p.category === 'Writing'
  );

  if (!post) notFound();

  return (
    <main className="relative z-10 w-full flex-1 flex flex-col bg-transparent">
      <div className="mx-auto w-full max-w-3xl px-3 pt-3 md:px-6">
        <div className="flex items-center gap-2 rounded-full border border-[#E0DAD0] bg-[#EFEBE3]/72 px-4 py-1.5 text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999] backdrop-blur-sm">
          writing / {post.domain[0]?.toLowerCase() || 'the log'}
        </div>
      </div>

      <article className="bg-[#EFEBE3]/82 backdrop-blur-sm p-8 md:p-12 lg:p-16 max-w-3xl mx-auto w-full rounded-[28px] mt-6">
        <header className="mb-10">
          <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-[#556E74] mb-4 block">
            {post.domain[0]}
          </span>
          <h1 className="font-serif text-[32px] leading-[1.2] text-[#1A1814] mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-[12px] text-[#556E74]">
            <span>{post.shortDate || new Date(post.date).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="h-[0.5px] bg-[#D4C9B8] mt-8" />
        </header>

        <div className="prose prose-neutral max-w-none font-sans text-[#5A5650] prose-headings:font-serif prose-headings:text-[#1A1814] prose-a:text-[#2F6B75] prose-a:underline-offset-4 prose-strong:text-[#1A1814] prose-p:leading-[1.8] prose-p:text-[15px]">
          {renderMDX(post.code)}
        </div>
      </article>
    </main>
  );
}
