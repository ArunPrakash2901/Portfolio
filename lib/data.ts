import fs from 'fs';
import path from 'path';

export async function getProjects() {
  const dir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const projects = await Promise.all(
    files.map(async (file) => {
      const module = await import(
        /* webpackExclude: /\.mdx$/ */
        `@/content/projects/${file.replace('.ts', '')}`
      );
      return module.default;
    })
  );
  return projects;
}

export async function getExperiments() {
  const dir = path.join(process.cwd(), 'content/experiments');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const experiments = await Promise.all(
    files.map(async (file) => {
      const module = await import(`@/content/experiments/${file.replace('.ts', '')}`);
      return module.default;
    })
  );
  return experiments;
}
