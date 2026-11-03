// Client preview on GitHub Pages: `npm run build:preview`.
// The site is served under https://nache5.github.io/dm-technology-preview/,
// hidden from search engines, and never used for the real launch.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const PREVIEW = process.env.PREVIEW === '1';
export const BAZA_PREVIEW = '/dm-technology-preview';

// Pages link with root paths ("/utilaje/"). Under a sub-path they need the
// prefix, so the preview build rewrites them once the HTML is written.
export default function preview() {
  return {
    name: 'dm-preview',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!PREVIEW) return;
        const radacina = fileURLToPath(dir);
        const fisiere = (await readdir(radacina, { recursive: true })).filter((f) => /\.(html|xml|txt)$/.test(f));
        const b = BAZA_PREVIEW;
        for (const f of fisiere) {
          const cale = `${radacina}/${f}`;
          let t = await readFile(cale, 'utf8');
          t = t.replace(/((?:href|src|action|poster)=")\/(?!\/)/g, (m, a) => `${a}${b}/`);
          t = t.replace(/(srcset=")([^"]+)"/g, (m, a, v) => `${a}${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${b}/`)}"`);
          t = t.split(`${b}${b}/`).join(`${b}/`);
          await writeFile(cale, t);
        }
        logger.info(`Previzualizare: ${fisiere.length} fișiere cu prefixul ${b}/`);
      },
    },
  };
}
