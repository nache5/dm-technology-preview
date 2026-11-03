// Maps the image keys used in src/data/ ("ref/cat-aspiratoare") to the files
// under src/assets/, so Astro can resize them and output AVIF/WebP.
const fisiere = import.meta.glob('../assets/{ref,foto,tiktok}/*.{jpg,jpeg,png,webp}', { eager: true });

export function imagine(cheie) {
  const gasit = Object.entries(fisiere).find(([cale]) => cale.replace(/\.[a-z]+$/, '').endsWith(`/assets/${cheie}`));
  if (!gasit) throw new Error(`Imagine lipsă: src/assets/${cheie}.*`);
  return gasit[1].default;
}

