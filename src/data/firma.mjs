// Company facts. `null` = not confirmed by DM yet: the page shows
// "de confirmat" and a launch build (npm run build:launch) refuses to run.
export const firma = {
  nume: 'DM Technology',
  // Legal identity, from the ANAF public register (checked 2026-11-03) and
  // listafirme.ro. Shown in the footer, contact, privacy and terms pages.
  denumireLegala: 'DM TECHNOLOGY PRODUCTS SRL',
  cui: '24793744',
  cif: 'RO24793744', // VAT payer since 2008-11-28
  platitorTva: true,
  regCom: 'J23/1981/2009',
  euid: 'ROONRC.J23/1981/2009',
  infiintata: 2008,
  sediuSocial: { strada: 'Intr. Ștefănești nr. 13, parter', localitate: 'Voluntari', judet: 'Ilfov', codPostal: '077190' },
  capitalSocial: null, // ex. "200 lei"; not in the public sources, ask DM's accountant
  telefon: '0755 486 351',
  telefonHref: 'tel:+40755486351',
  email: 'd.trasa@dmtechnology.ro',
  // WhatsApp buttons use this number. Andrei asked for them on 2026-11-03;
  // DM still has to confirm the number is on WhatsApp (launch guard checks).
  whatsapp: '40755486351',
  whatsappConfirmat: false,
  whatsappText: 'Bună ziua, vă scriu de pe site-ul DM Technology.',
  // Where customers pick up machines: same as the registered office (Andrei, 2026-11-03).
  adresa: { strada: 'Intr. Ștefănești nr. 13', localitate: 'Voluntari', judet: 'Ilfov', codPostal: '077190' },
  program: 'Luni–Vineri, 09:00–17:00',
  // Same hours for schema.org / Google.
  orar: { zile: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], deschide: '09:00', inchide: '17:00' },
  tiktok: 'https://www.tiktok.com/@dmtechnologyproducts',
  livrare: null, // ex. "Livrăm pe șantier în toată țara."
  // Rents to private people too? Changes VAT display (consumers see prices with VAT).
  persoaneFizice: null,
};

export const lipsa = (v) => v === null || v === undefined || v === '';
