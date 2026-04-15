import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'

// Monochromatic high-contrast dark theme inspired by minimal Vim environments
const monochromeTheme: any = {
  name: "monochrome",
  type: "dark",
  colors: {
    "editor.background": "#111111",
    "editor.foreground": "#d4d4d4",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#666666", fontStyle: "italic" }
    },
    {
      scope: ["keyword", "storage.type", "storage.modifier", "variable.language", "support.type.primitive"],
      settings: { foreground: "#ffffff", fontStyle: "bold" }
    },
    {
      scope: ["string", "punctuation.definition.string", "constant.numeric", "constant.language"],
      settings: { foreground: "#999999" }
    },
    {
      scope: ["entity.name.function", "entity.name.class", "support.class", "entity.name.type", "meta.function-call"],
      settings: { foreground: "#e5e5e5" }
    },
    {
      scope: ["variable", "parameter", "property", "object.property", "meta.object-literal.key"],
      settings: { foreground: "#b3b3b3" }
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#777777" }
    }
  ]
};

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: monochromeTheme }]
    ]
  },
  collections: {
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.path(), 
        category: s.enum(["Work", "Sandbox", "Writing"]),
        date: s.isodate(),
        shortDate: s.string().optional(),
        isLive: s.boolean().optional(),
        domain: s.array(s.string()),
        techStack: s.array(s.string()),
        competencyScores: s.object({
          analytics_eda: s.number(),
          statistical_reasoning: s.number(),
          machine_learning: s.number(),
          data_engineering: s.number(),
          cloud_infrastructure: s.number(),
          visualisation_bi: s.number(),
          communication: s.number(),
        }),
        coverImage: s.string().optional(),
        summary: s.string(),
        code: s.mdx()
      })
    }
  }
})
