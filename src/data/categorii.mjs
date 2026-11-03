// Machine types. The real list comes from DM's inventory; these five are the
// working assumption from the plan. `imagine` is a key under src/assets/:
// "ref/..." = generated reference image (mock only), "foto/..." = DM's photo.
export const categorii = [
  {
    slug: 'masini-slefuit-beton',
    nume: 'Mașini de șlefuit beton',
    singular: 'Mașină de șlefuit beton',
    folosire: 'Șlefuire, curățare și polișare pentru beton, șapă, terrazzo.',
    title: 'Mașini de șlefuit beton: închiriere și vânzare | DM Technology',
    description:
      'Mașini de șlefuit beton de închiriat sau de cumpărat în București, cu discurile și aspiratorul potrivite. Vezi modelele, lățimea de lucru și prețurile.',
    intro: [
      'Pentru șlefuirea și curățarea betonului, a șapei și a terrazzo-ului, înainte de epoxy sau pentru polișare.',
      'Alegi după suprafață: mașini compacte pentru camere, mașini mari pentru hale.',
    ],
    imagine: 'ref/cat-slefuit-beton',
    mare: true,
    intrebari: [
      { q: 'Șlefuiesc uscat sau cu apă?', a: 'Uscat, cu aspirator industrial, pentru aproape orice lucrare de interior. Cu apă doar la polișare fină sau unde praful nu e permis deloc.' },
      { q: 'Îmi trebuie aspirator?', a: 'Da, la șlefuirea uscată. Pe pagina fiecărei mașini scrie ce aspirator i se potrivește.' },
    ],
  },
  {
    slug: 'masini-sablat-pardoseli',
    nume: 'Mașini de sablat pardoseli',
    singular: 'Mașină de sablat pardoseli',
    folosire: 'Curăță și deschide porul betonului înainte de epoxy.',
    title: 'Mașini de sablat pardoseli de închiriat | DM Technology',
    description:
      'Mașini de sablat beton cu alice (shot blasting) de închiriat sau de cumpărat în București. Pregătesc pardoseala pentru epoxy, fără praf, cu aspirator.',
    intro: [
      'Mașina aruncă alice de oțel pe beton: scoate laptele de ciment, vopseaua veche și murdăria și lasă o suprafață aspră, bună pentru epoxy.',
      'Lucrează mereu cu un aspirator industrial potrivit.',
    ],
    imagine: 'ref/cat-sablat-pardoseli',
    mare: true,
    intrebari: [
      { q: 'Care e diferența față de șlefuire?', a: 'Sablarea face suprafața aspră dintr-o singură trecere și e mai rapidă pe suprafețe mari. Șlefuirea face suprafața netedă.' },
    ],
  },
  {
    slug: 'freze-scarificatoare-beton',
    nume: 'Freze și scarificatoare',
    singular: 'Freză de beton',
    folosire: 'Scot vopsea, marcaje și straturi groase.',
    title: 'Freze și scarificatoare beton de închiriat | DM Technology',
    description:
      'Freze și scarificatoare de beton de închiriat sau de cumpărat în București. Scot straturi groase, vopsea, marcaje și denivelări.',
    intro: [
      'Un tambur cu cuțite scoate straturi de câțiva milimetri: vopsea groasă, marcaje, adeziv, denivelări.',
      'Pentru straturi subțiri, șlefuirea e mai potrivită.',
    ],
    imagine: 'ref/cat-freze-scarificatoare',
    intrebari: [],
  },
  {
    slug: 'aspiratoare-industriale',
    nume: 'Aspiratoare industriale',
    singular: 'Aspirator industrial',
    folosire: 'Fără praf la șlefuire și sablare.',
    title: 'Aspiratoare industriale de închiriat | DM Technology',
    description:
      'Aspiratoare industriale de închiriat sau de cumpărat în București, pentru mașini de șlefuit beton, freze și mașini de sablat.',
    intro: [
      'Fiecare mașină de șlefuit, sablat sau frezat lucrează cu un aspirator potrivit ca debit și racord.',
      'Pe pagina fiecărui utilaj scrie ce aspirator îi trebuie.',
    ],
    imagine: 'ref/cat-aspiratoare',
    intrebari: [],
  },
  {
    slug: 'masini-decopertat-pardoseli',
    nume: 'Mașini de decopertat',
    singular: 'Mașină de decopertat',
    folosire: 'Scot gresie, PVC, mochetă și adeziv.',
    title: 'Mașini de decopertat pardoseli de închiriat | DM Technology',
    description:
      'Mașini de decopertat (stripper) de închiriat sau de cumpărat în București. Scot gresie, PVC, linoleum, mochetă și adeziv.',
    intro: [
      'O lamă lată împinsă cu forță desprinde gresia, PVC-ul, mocheta și adezivul de pe suport.',
      'Mult mai rapid decât cu dalta, mai ales pe suprafețe mari.',
    ],
    imagine: 'ref/cat-decopertat',
    intrebari: [],
  },
];

export const categorie = (slug) => categorii.find((c) => c.slug === slug);
