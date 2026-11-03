import { firma } from '../data/firma.mjs';
// wa.me link with a short opening message.
export const linkWhatsapp = () =>
  firma.whatsapp ? `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(firma.whatsappText)}` : null;
