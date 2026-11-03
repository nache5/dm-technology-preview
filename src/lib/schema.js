// schema.org builders shared by the pages.
export function caleSchema(pasi, site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pasi.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.nume,
      item: new URL(p.href, site).href,
    })),
  };
}

// Product markup only for real machines with a confirmed price: marking up a
// demo entry would put invented data into Google.
export function produsSchema(u, url, imgUrl, site) {
  if (u.exemplu) return null;
  const oferte = [];
  if (u.inchiriere.disponibil && u.inchiriere.pretZi) {
    oferte.push({
      '@type': 'Offer',
      priceCurrency: 'RON',
      price: u.inchiriere.pretZi,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: u.inchiriere.pretZi, priceCurrency: 'RON', unitText: 'zi', valueAddedTaxIncluded: false },
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
      seller: { '@id': new URL('/#firma', site).href },
    });
  }
  if (u.vanzare.disponibil && u.vanzare.pret) {
    oferte.push({
      '@type': 'Offer',
      priceCurrency: 'RON',
      price: u.vanzare.pret,
      itemCondition: u.stare === 'nou' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      seller: { '@id': new URL('/#firma', site).href },
    });
  }
  if (!oferte.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${u.marca} ${u.model}`,
    brand: { '@type': 'Brand', name: u.marca },
    url,
    image: imgUrl,
    offers: oferte,
  };
}
