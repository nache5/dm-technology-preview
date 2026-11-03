// sitemap.xml: indexable pages only. Demo machines and noindex pages stay out.
import type { APIRoute } from 'astro';
import { categorii } from '../data/categorii.mjs';
import { utilaje } from '../data/utilaje.mjs';

export const GET: APIRoute = ({ site }) => {
  const cai = [
    '/', '/utilaje/', '/lucrari/', '/inchiriere/', '/vanzare/', '/contact/', '/despre/',
    ...categorii.map((c) => `/utilaje/${c.slug}/`),
    ...utilaje.filter((u) => !u.exemplu).map((u) => `/utilaje/${u.categorie}/${u.slug}/`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${cai
    .map((c) => `  <url><loc>${new URL(c, site).href}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
