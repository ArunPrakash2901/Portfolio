import type { MetadataRoute } from 'next';
import {
  getExperimentPostBySlug,
  getExperiments,
  getLatestContentDate,
  getProjectPostBySlug,
  getProjects,
  getWritingPosts,
} from '@/lib/data';
import { SITE_URL, normalizeFlexibleDate, toAbsoluteUrl } from '@/lib/seo';

function toDate(value?: string) {
  if (!value) return undefined;
  const normalizedValue = normalizeFlexibleDate(value);
  return normalizedValue ? new Date(normalizedValue) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, experiments] = await Promise.all([
    getProjects(),
    getExperiments(),
  ]);
  const writingPosts = getWritingPosts();
  const homeLastModified = getLatestContentDate();

  return [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((project) => {
      const post = getProjectPostBySlug(project.slug);

      return {
        url: toAbsoluteUrl(`/projects/${project.slug}`),
        lastModified: toDate(post?.date ?? project.builtDate),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    }),
    ...writingPosts.map((post) => ({
      url: toAbsoluteUrl(`/writing/${post.slug.replace('projects/', '')}`),
      lastModified: toDate(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...experiments.map((experiment) => {
      const post = getExperimentPostBySlug(experiment.slug);

      return {
        url: toAbsoluteUrl(`/experiments/${experiment.slug}`),
        lastModified: toDate(post?.date ?? experiment.builtDate),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    }),
  ];
}
