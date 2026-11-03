// The four clips on the home page, from https://www.tiktok.com/@dmtechnologyproducts
// (picked 2026-11-03). Covers are DM's own frames, saved in src/assets/tiktok/
// because TikTok's cover links expire. To swap a clip: new id, title, cover.
import { firma } from './firma.mjs';
export const clipuri = [
  { id: '7660140659315117334', titlu: 'Sablare pe pista aeroportului' },
  { id: '7701059059868257558', titlu: 'Înainte și după sablare' },
  { id: '7701686941099543830', titlu: 'Șlefuire adeziv și resturi de mochetă' },
  { id: '7702101593302338838', titlu: 'Degroșare beton 1–20 mm pe trecere' },
].map((c) => ({ ...c, url: `${firma.tiktok}/video/${c.id}`, imagine: `tiktok/${c.id}` }));
