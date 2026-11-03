# DM Technology: site

Static site for DM Technology (rental and sale of floor-preparation machines, Bucharest).
Direction B · Showroom. Astro 5 builds plain HTML; there is no server code.
The plan is in `../Analiza si plan site.md`.

**Status (2026-11-03):** templates built and tested locally, **not published**.
All company data, prices and photos are placeholders. A launch build refuses to run until they are real.

## Commands

```bash
npm install
npm run dev            # http://localhost:4321, live reload
npm run build          # dist/ with demo data (testing)
npm run build:launch   # the real build: fails while anything fake is left
npm run preview        # serves dist/
npm test               # form function + launch check
```

## Where things live

| What | File |
|---|---|
| Company facts (address, CUI, hours, WhatsApp, TikTok) | `src/data/firma.mjs` |
| Machine types (names, copy, SEO title/description, FAQs) | `src/data/categorii.mjs` |
| Machines (specs, prices, photos) | `src/data/utilaje.mjs` |
| Works DM does (sablare, șlefuire, frezare, decopertare) | `src/data/lucrari.mjs` → one presentation page, `/lucrari/` (a section per work, `#<slug>`) |
| Jobs done (A0, Centura Buftea, airport) | `src/data/proiecte.mjs` |
| TikTok clips on the home page | `src/data/tiktok.mjs` + covers in `src/assets/tiktok/` |
| Photos | `src/assets/foto/` (real) · `src/assets/ref/` (generated reference, mock only) |
| Colours and type | `src/styles/global.css` (`--accent` waits for DM's logo colour) |
| Icons | `src/components/Iconita.astro`: Phosphor (`@phosphor-icons/core`) for all UI icons, the official WhatsApp glyph from Simple Icons |
| Quote form (WhatsApp message) | `src/components/Formular.astro` + `src/lib/mesaj.js` |

### Adding a machine

1. Put its photos in `src/assets/foto/`, e.g. `husqvarna-pg-540-fata.jpg`. Same grey backdrop, light from the upper left, 3/4 view.
2. Add one entry to `src/data/utilaje.mjs`: copy an existing one, set `exemplu: false`, and fill in specs and prices (lei, without VAT).
3. `npm run build` → the page appears at `/utilaje/<categorie>/<slug>/`, in the catalogue, in the type's comparison table and in the sitemap.

## Launch guard

`npm run build:launch` lists and blocks:
- unconfirmed company facts;
- demo machines;
- generated reference images (`ref/`);
- machines without a price (unless `pretLaCerere: true`);
- `[bracketed]` text in machine data.
- works and jobs not yet confirmed by DM (`confirmat: false`).
- any generated image (`src/assets/ref/`) still shown on a built page, including ones placed directly in a page like the home hero.

Generated images may appear on the mock only (decision 2026-11-03); the live site uses DM's photos.

Copy outside the data files that still needs DM's confirmation is highlighted in yellow (`class="todo"`). After building, the launch build also scans every page and blocks if any yellow text is left.

## Quote form

The form has four fields: Nume and Telefon (required), Localitatea șantierului and Mesaj (optional).
On a machine page, the machine's name goes into the message automatically.

**Sending.** "Trimite pe WhatsApp" opens WhatsApp (app on phones, WhatsApp Web on desktop) to `firma.whatsapp`, with the message already written. The visitor taps Send there.
- Nothing passes through a server, so the page never says the request was sent. It says WhatsApp was opened and offers a link to open it again, plus the phone number.
- If `firma.whatsapp` is `null`, the form is replaced by phone and e-mail.

**Accessibility.**
- Visible labels that say "(obligatoriu)" or "(opțional)", and hints linked to their fields.
- Errors are written next to the field (`aria-invalid` + `aria-describedby`) and summed up in a live region; focus moves to the first wrong field.
- Fields are 52 px tall with 17 px text and correct `autocomplete`/`inputmode`.
- Without JavaScript, WhatsApp still opens, with a short opener.

The message is built in `src/lib/mesaj.js` and covered by `npm test`.

## Client preview (GitHub Pages)

`npm run build:preview` builds the site for https://nache5.github.io/dm-technology-preview/.
Every push to `main` in `nache5/dm-technology-preview` publishes it through `.github/workflows/preview.yml`.

What the preview build does:
- serves under the `/dm-technology-preview/` sub-path;
- puts `noindex, nofollow` on every page;
- makes `robots.txt` disallow everything, so the preview never competes with the real site in Google.

It shows the current demo state: generated images, example machines, "Preț la cerere".

## Hosting (planned, not done)

Cloudflare Pages (or any static host): build command `npm run build:launch`, output `dist/`. No functions or secrets needed.

**The domain stays at Hosterion, and so does DM's e-mail.** At launch only the website records (A/CNAME for `dmtechnology.ro` and `www`) change.
**MX and SPF stay exactly as they are**, or DM's e-mail stops working.

## Measured (2026-11-03, Lighthouse mobile, local preview)

All six pages tested score 100 on performance, accessibility, best practices and SEO, with LCP 1.4–1.7 s.
The example machine page scores 69 on SEO only because it is deliberately `noindex`. Details in `LIGHTHOUSE.txt`.
