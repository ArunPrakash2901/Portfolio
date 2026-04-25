import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { experiments as veliteExperiments, projects as veliteProjects } from '#velite';

export type PortfolioNote = string | { title: string; body: string };

export type PortfolioEntry = {
  slug: string;
  name: string;
  oneLiner: string;
  status: string;
  builtDate: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  linkedInPostUrl?: string;
  media?: string;
  mediaMode?: string;
  why: string;
  hard: string;
  differently: string;
  notes: PortfolioNote[];
};

export const getProjects = cache(async (): Promise<PortfolioEntry[]> => {
  const dir = path.join(process.cwd(), 'content/projects');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.ts'));
  const projects = await Promise.all(
    files.map(async (file) => {
      const contentModule = await import(
        /* webpackInclude: /\.ts$/ */
        `@/content/projects/${file}`
      );
      return contentModule.default as PortfolioEntry;
    })
  );

  return projects;
});

export const getExperiments = cache(async (): Promise<PortfolioEntry[]> => {
  const dir = path.join(process.cwd(), 'content/experiments');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.ts'));
  const experiments = await Promise.all(
    files.map(async (file) => {
      const contentModule = await import(
        /* webpackInclude: /\.ts$/ */
        `@/content/experiments/${file}`
      );
      return contentModule.default as PortfolioEntry;
    })
  );

  return experiments;
});

export const getProjectBySlug = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
});

export const getExperimentBySlug = cache(async (slug: string) => {
  const experiments = await getExperiments();
  return experiments.find((experiment) => experiment.slug === slug);
});

export function getProjectPostBySlug(slug: string) {
  return veliteProjects.find(
    (post) => post.slug === `projects/${slug}` && post.category !== 'Writing'
  );
}

export function getWritingPostBySlug(slug: string) {
  return veliteProjects.find(
    (post) => post.slug === `projects/${slug}` && post.category === 'Writing'
  );
}

export function getWritingPosts() {
  return veliteProjects.filter((post) => post.category === 'Writing');
}

export function getExperimentPostBySlug(slug: string) {
  return veliteExperiments.find(
    (experiment) => experiment.slug === `experiments/${slug}`
  );
}

export function getLatestContentDate() {
  const timestamps = [...veliteProjects, ...veliteExperiments]
    .map((entry) => Date.parse(entry.date))
    .filter((value): value is number => Number.isFinite(value));

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();
}
