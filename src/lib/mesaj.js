// Quote request → WhatsApp message. Pure functions, shared by the form's
// browser script and the tests.

export const LIMITE = { nume: 80, telefon: 20, localitate: 80, mesaj: 1000, utilaj: 160, lucrare: 80 };

export function curata(date) {
  const d = {};
  for (const [k, max] of Object.entries(LIMITE)) d[k] = String(date[k] ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  // Message keeps its line breaks.
  d.mesaj = String(date.mesaj ?? '').trim().slice(0, LIMITE.mesaj);
  return d;
}

// Returns { camp: 'text of the error' } for each problem, {} when valid.
export function valideaza(d) {
  const erori = {};
  if (!d.nume) erori.nume = 'Scrie-ți numele.';
  const cifre = d.telefon.replace(/\D/g, '');
  if (!d.telefon) erori.telefon = 'Scrie numărul de telefon.';
  else if (cifre.length < 9 || cifre.length > 13) erori.telefon = 'Numărul pare incomplet. Exemplu: 0722 123 456.';
  return erori;
}

export function textMesaj(d, deschidere) {
  const r = [deschidere, ''];
  if (d.lucrare) r.push(`Lucrare: ${d.lucrare}`);
  if (d.utilaj) r.push(`Utilaj: ${d.utilaj}`);
  r.push(`Nume: ${d.nume}`, `Telefon: ${d.telefon}`);
  if (d.localitate) r.push(`Șantier: ${d.localitate}`);
  if (d.mesaj) r.push('', d.mesaj);
  return r.join('\n');
}

export const linkWa = (numar, text) => `https://wa.me/${numar}?text=${encodeURIComponent(text)}`;
