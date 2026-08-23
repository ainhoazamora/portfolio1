// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://ainhoazamora.github.io/portfolio/
export default defineConfig({
  site: 'https://ainhoazamora.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
});
