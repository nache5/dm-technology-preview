// One entry per machine DM rents or sells. Adding a machine = one entry here
// plus its photos in src/assets/foto/.
//
// `exemplu: true` marks a demo entry: the page gets noindex, stays out of the
// sitemap and shows a warning, and a launch build refuses to run while one exists.
// Prices: lei, without VAT. `null` = not confirmed; set `pretLaCerere: true`
// if DM decides not to publish a price.
export const utilaje = [
  {
    slug: 'exemplu-masina-slefuit-3-discuri',
    exemplu: true,
    categorie: 'masini-slefuit-beton',
    marca: '[Marcă]',
    model: '[Model] 3 discuri',
    stare: 'nou', // 'nou' | 'second-hand'
    inchiriere: { disponibil: true, pretZi: null, pretSaptamana: null },
    vanzare: { disponibil: true, pret: null },
    pretLaCerere: false,
    cheie: { latimeMm: null, tensiuneV: 400, putereKw: null, greutateKg: null },
    pentruCe: 'Șlefuiește și curăță beton, șapă și terrazzo.',
    suprafete: '[Suprafețe medii și mari, la interior.]',
    productivitate: '[Până la ~— m² pe zi, cu aspirator.]',
    specificatii: [
      ['Lățime de lucru', '[— mm]'],
      ['Discuri', '[3 × — mm]'],
      ['Turație', '[— rpm]'],
      ['Alimentare', '400 V, [— A]'],
      ['Greutate', '[— kg]'],
      ['Racord aspirator', '[— mm]'],
    ],
    impreunaCu: ['exemplu-aspirator-industrial'],
    imagini: ['ref/cat-slefuit-beton', 'ref/hero-slefuit-beton'],
    manualPdf: null,
  },
  {
    slug: 'exemplu-aspirator-industrial',
    exemplu: true,
    categorie: 'aspiratoare-industriale',
    marca: '[Marcă]',
    model: '[Model] cu preseparator',
    stare: 'nou',
    inchiriere: { disponibil: true, pretZi: null, pretSaptamana: null },
    vanzare: { disponibil: false, pret: null },
    pretLaCerere: false,
    cheie: { latimeMm: null, tensiuneV: 400, putereKw: null, greutateKg: null },
    pentruCe: 'Prinde praful de la șlefuire, frezare și sablare.',
    suprafete: '[Pentru mașini de până la — mm lățime.]',
    productivitate: '[Debit — m³/h, filtru clasa —.]',
    specificatii: [
      ['Debit aer', '[— m³/h]'],
      ['Filtru', '[clasa —]'],
      ['Colectare', '[sac continuu]'],
      ['Alimentare', '400 V, [— A]'],
      ['Greutate', '[— kg]'],
    ],
    impreunaCu: ['exemplu-masina-slefuit-3-discuri'],
    imagini: ['ref/cat-aspiratoare'],
    manualPdf: null,
  },
];

export const utilaj = (slug) => utilaje.find((u) => u.slug === slug);
export const dinCategorie = (slug) => utilaje.filter((u) => u.categorie === slug);
export const numeComplet = (u) => `${u.marca} ${u.model}`;
