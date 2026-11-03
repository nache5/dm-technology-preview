import type { APIRoute } from 'astro';
import { PREVIEW } from '../lib/preview.mjs';
// The client preview blocks every crawler; the real site allows all.
export const GET: APIRoute = ({ site }) =>
  new Response(PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
