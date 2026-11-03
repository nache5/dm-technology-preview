// `npm run build:launch` refuses to build while anything fake or unconfirmed
// is left: demo machines, generated reference images, missing company facts,
// missing prices, or [bracketed] placeholder text in the data.
import { firma, lipsa } from '../data/firma.mjs';
import { categorii } from '../data/categorii.mjs';
import { utilaje } from '../data/utilaje.mjs';
import { lucrari } from '../data/lucrari.mjs';
import { proiecte } from '../data/proiecte.mjs';

export function problemeLansare() {
  const p = [];
  for (const k of ['denumireLegala', 'cui', 'regCom', 'sediuSocial', 'adresa', 'program', 'persoaneFizice']) {
    if (lipsa(firma[k])) p.push(`firma.${k} nu e confirmat`);
  }
  if (firma.whatsapp && !firma.whatsappConfirmat) p.push('firma.whatsapp: DM nu a confirmat că numărul are WhatsApp');
  for (const l of lucrari) {
    if (!l.confirmat) p.push(`lucrarea ${l.slug}: detaliile nu sunt confirmate de DM`);
    if (l.imagine.startsWith('ref/')) p.push(`lucrarea ${l.slug} folosește o imagine generată (${l.imagine})`);
  }
  for (const pr of proiecte) if (!pr.confirmat) p.push(`proiectul „${pr.nume}” nu e confirmat de DM`);
  for (const c of categorii) {
    if (c.imagine.startsWith('ref/')) p.push(`categoria ${c.slug} folosește o imagine generată (${c.imagine})`);
  }
  for (const u of utilaje) {
    if (u.exemplu) p.push(`utilajul ${u.slug} e un exemplu`);
    for (const img of u.imagini) if (img.startsWith('ref/')) p.push(`utilajul ${u.slug} folosește o imagine generată (${img})`);
    if (!u.pretLaCerere && u.inchiriere.disponibil && lipsa(u.inchiriere.pretZi)) p.push(`utilajul ${u.slug} nu are preț pe zi`);
    if (!u.pretLaCerere && u.vanzare.disponibil && lipsa(u.vanzare.pret)) p.push(`utilajul ${u.slug} nu are preț de vânzare`);
    if (JSON.stringify(u).includes('[')) p.push(`utilajul ${u.slug} are text între [paranteze]`);
  }
  return p;
}

export default function launchGuard() {
  return {
    name: 'dm-launch-guard',
    hooks: {
      'astro:build:start': ({ logger }) => {
        if (process.env.LAUNCH !== '1') return;
        const p = problemeLansare();
        if (p.length) {
          throw new Error(`Lansarea e blocată, ${p.length} probleme:\n- ${p.join('\n- ')}`);
        }
        logger.info('Verificarea datelor a trecut.');
      },
      // Copy written straight into the pages still marked "de confirmat" (yellow).
      'astro:build:done': async ({ dir, logger }) => {
        if (process.env.LAUNCH !== '1') return;
        const { readdir, readFile } = await import('node:fs/promises');
        const { fileURLToPath } = await import('node:url');
        const radacina = fileURLToPath(dir);
        const fisiere = (await readdir(radacina, { recursive: true })).filter((f) => f.endsWith('.html'));
        // Generated images used straight in a page (e.g. the home hero) are not
        // in the data files, so look for their file names in the output.
        const generate = (await readdir(new URL('../assets/ref/', import.meta.url))).map((f) => f.replace(/\.[a-z]+$/, ''));
        const cu = [];
        const imagini = new Set();
        for (const f of fisiere) {
          const html = await readFile(`${radacina}/${f}`, 'utf8');
          if (html.includes('class="todo"') || html.includes('data-de-confirmat')) cu.push(f);
          for (const g of generate) if (html.includes(`/${g}.`)) imagini.add(`${g} (în ${f})`);
        }
        const probleme = [
          ...cu.map((f) => `text „de confirmat” rămas în ${f}`),
          ...[...imagini].map((g) => `imagine generată afișată: ${g}`),
        ];
        if (probleme.length) throw new Error(`Lansarea e blocată, ${probleme.length} probleme în pagini:\n- ${probleme.join('\n- ')}`);
        logger.info('Verificarea paginilor a trecut.');
      },
    },
  };
}
