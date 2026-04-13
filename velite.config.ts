import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.path(), // generated from file path
        date: s.isodate(),
        domain: s.array(s.string()),
        techStack: s.array(s.string()),
        competencyScores: s.object({
          architecture: s.number(),
          algorithms: s.number(),
          data_engineering: s.number(),
          mlops: s.number(),
          ui_ux: s.number()
        }),
        coverImage: s.string().optional(),
        summary: s.string(),
        code: s.mdx() // compiled MDX output
      })
    }
  }
})
