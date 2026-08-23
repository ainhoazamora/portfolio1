import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    type: z.enum(['Master paper', 'Bachelor paper', 'Bachelor thesis', 'Master thesis']),
    module: z.string().optional(),
    programme: z.string(),
    institution: z.string(),
    /** Programme period taken from the education record, not a stated publication year. */
    period: z.string(),
    status: z.string(),
    order: z.number(),
    topics: z.array(z.string()).default([]),
    /** Only list methods that are stated in the source material. */
    methods: z.array(z.string()).default([]),
    pdf: z.string().optional(),
    /** Left null on purpose: no abstracts are published on the source site. */
    abstract: z.string().nullable().default(null),
  }),
});

export const collections = { papers };
