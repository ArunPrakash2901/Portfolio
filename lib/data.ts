import { experiments as veliteExperiments, projects as veliteProjects, type Project } from '#velite';
import bouncingBall from '@/content/experiments/bouncing-ball';
import chess from '@/content/experiments/chess';
import yinYang from '@/content/experiments/yinyang';

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

type ExperimentSource = {
  slug: string;
  name: string;
  oneLiner: string;
  title?: string;
  summary?: string;
  status?: string;
  builtDate: string;
  date?: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  linkedInPostUrl?: string;
  media?: string;
  why?: string;
  hard?: string;
  differently?: string;
  notes?: PortfolioNote[];
  code?: string;
};

function mapProjectToEntry(project: Project): PortfolioEntry {
  return {
    slug: project.slug.replace('projects/', ''),
    name: project.title,
    oneLiner: project.oneLiner || project.summary,
    status: project.status || 'Completed',
    builtDate: project.builtDate || project.date.split('-').slice(0, 2).join('-'),
    stack: project.techStack,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    blogUrl: project.blogUrl,
    linkedInPostUrl: project.linkedInPostUrl,
    media: project.coverImage,
    why: project.why || '',
    hard: project.hard || '',
    differently: project.differently || '',
    notes: (project.notes as PortfolioNote[]) || [],
  };
}

const experimentSources: ExperimentSource[] = [bouncingBall, yinYang, chess];
const experimentEntries = experimentSources.map(mapExperimentToEntry);

function mapExperimentToEntry(experiment: ExperimentSource): PortfolioEntry {
  return {
    slug: experiment.slug,
    name: experiment.name,
    oneLiner: experiment.oneLiner,
    status: experiment.status || 'Experimental',
    builtDate: experiment.builtDate,
    stack: experiment.stack,
    githubUrl: experiment.githubUrl,
    liveUrl: experiment.liveUrl,
    linkedInPostUrl: experiment.linkedInPostUrl,
    media: experiment.media,
    why: experiment.why || '',
    hard: experiment.hard || '',
    differently: experiment.differently || '',
    notes: experiment.notes || [],
  };
}

export async function getProjects(): Promise<PortfolioEntry[]> {
  return veliteProjects
    .filter((p) => p.category !== 'Writing')
    .map(mapProjectToEntry);
}

export async function getExperiments(): Promise<PortfolioEntry[]> {
  return experimentEntries;
}

export async function getProjectBySlug(slug: string) {
  const project = veliteProjects.find((p) => p.slug === `projects/${slug}`);
  return project ? mapProjectToEntry(project) : undefined;
}

export async function getExperimentBySlug(slug: string) {
  return experimentEntries.find((experiment) => experiment.slug === slug);
}

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
  const timestamps = [
    ...veliteProjects.map((entry) => entry.date),
    ...experimentSources.map((entry) => entry.date ?? entry.builtDate),
  ]
    .map((value) => Date.parse(value))
    .filter((value): value is number => Number.isFinite(value));

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();
}
