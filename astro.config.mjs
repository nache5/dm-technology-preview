import { defineConfig } from 'astro/config';
import launchGuard from './src/lib/launch-guard.mjs';
import preview, { PREVIEW, BAZA_PREVIEW } from './src/lib/preview.mjs';

// Static output only: every page is plain HTML on the CDN.
export default defineConfig({
  site: PREVIEW ? 'https://nache5.github.io' : 'https://dmtechnology.ro',
  ...(PREVIEW ? { base: BAZA_PREVIEW } : {}),
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [launchGuard(), preview()],
});
