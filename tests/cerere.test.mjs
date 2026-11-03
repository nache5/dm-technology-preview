import { test } from 'node:test';
import assert from 'node:assert/strict';
import { curata, valideaza, textMesaj, linkWa } from '../src/lib/mesaj.js';
import { problemeLansare } from '../src/lib/launch-guard.mjs';

const deschidere = 'Bună ziua, vă scriu de pe site-ul DM Technology.';

test('numele și telefonul sunt obligatorii, cu mesaje clare', () => {
  assert.deepEqual(Object.keys(valideaza(curata({}))).sort(), ['nume', 'telefon']);
  assert.match(valideaza(curata({ nume: 'Ion', telefon: '123' })).telefon, /incomplet/);
  assert.deepEqual(valideaza(curata({ nume: 'Ion', telefon: '0722 123 456' })), {});
  assert.deepEqual(valideaza(curata({ nume: 'Ion', telefon: '+40 722 123 456' })), {});
});

test('mesajul conține doar câmpurile completate', () => {
  const t = textMesaj(curata({ nume: ' Ion  Pop ', telefon: '0722 123 456' }), deschidere);
  assert.equal(t, `${deschidere}\n\nNume: Ion Pop\nTelefon: 0722 123 456`);
  assert.doesNotMatch(t, /Șantier|Utilaj/);
});

test('utilajul, localitatea și mesajul pe mai multe rânduri intră în text', () => {
  const t = textMesaj(curata({ nume: 'Ion', telefon: '0722123456', localitate: 'Otopeni', mesaj: 'Rândul 1\nRândul 2', utilaj: 'X 3 discuri' }), deschidere);
  assert.match(t, /Utilaj: X 3 discuri\nNume: Ion/);
  assert.match(t, /Șantier: Otopeni/);
  assert.match(t, /\n\nRândul 1\nRândul 2$/);
});

test('pe pagina unei lucrări, mesajul începe cu lucrarea cerută', () => {
  const t = textMesaj(curata({ nume: 'Ion', telefon: '0722123456', lucrare: 'Sablare beton' }), deschidere);
  assert.match(t, /\n\nLucrare: Sablare beton\nNume: Ion/);
});

test('linkul WhatsApp codifică diacriticele și rândurile noi', () => {
  const u = linkWa('40755486351', 'Bună\nziua & mulțumesc');
  assert.equal(u, 'https://wa.me/40755486351?text=Bun%C4%83%0Aziua%20%26%20mul%C8%9Bumesc');
});

test('verificarea de lansare prinde exemplele, imaginile generate și WhatsApp neconfirmat', () => {
  const p = problemeLansare();
  assert.ok(p.some((x) => x.includes('e un exemplu')));
  assert.ok(p.some((x) => x.includes('imagine generată')));
  assert.ok(p.some((x) => x.startsWith('firma.persoaneFizice')));
  assert.ok(!p.some((x) => x.startsWith('firma.adresa') || x.startsWith('firma.program')));
  assert.ok(p.some((x) => x.includes('WhatsApp')));
});
