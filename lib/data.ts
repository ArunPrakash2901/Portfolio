import { experiments as veliteExperiments, projects as veliteProjects, type Project } from '#velite';

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

export async function getProjects(): Promise<PortfolioEntry[]> {
  return veliteProjects
    .filter((p) => p.category !== 'Writing')
    .map(mapProjectToEntry);
}

export async function getExperiments(): Promise<PortfolioEntry[]> {
  // Experiments are still primarily .ts files for now, or we can migrate them too.
  // Given the performance goal, let's keep them as is or use velite if available.
  return veliteExperiments.map((e) => ({
    slug: e.slug.replace('experiments/', ''),
    name: e.title,
    oneLiner: e.summary,
    status: 'Experimental',
    builtDate: e.date.split('-').slice(0, 2).join('-'),
    stack: [],
    why: '',
    hard: '',
    differently: '',
    notes: [],
    media: '',
  }));
}

export async function getProjectBySlug(slug: string) {
  const project = veliteProjects.find((p) => p.slug === `projects/${slug}`);
  return project ? mapProjectToEntry(project) : undefined;
}

export async function getExperimentBySlug(slug: string) {
  const experiments = await getExperiments();
  return experiments.find((experiment) => experiment.slug === slug);
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
  const timestamps = [...veliteProjects, ...veliteExperiments]
    .map((entry) => Date.parse(entry.date))
    .filter((value): value is number => Number.isFinite(value));

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();
}
