import { site } from '../data/site';
import { menu } from '../data/menu';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function buildOpeningHoursSpecification() {
  const groups = new Map<string, string[]>();

  for (const h of site.hours) {
    if (!h.opens || !h.closes) continue;
    const key = `${h.opens}-${h.closes}`;
    const days = groups.get(key) ?? [];
    days.push(dayNames[h.day]);
    groups.set(key, days);
  }

  return Array.from(groups.entries()).map(([key, days]) => {
    const [opens, closes] = key.split('-');
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}

export function buildRestaurantSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${siteUrl}/#business`,
    name: site.name,
    image: `${siteUrl}${site.seo.ogImage}`,
    url: siteUrl,
    telephone: site.contact.phoneDisplay,
    priceRange: site.priceRange,
    servesCuisine: site.cuisine,
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.streetAddress,
      addressLocality: site.contact.address.addressLocality,
      addressRegion: site.contact.address.addressRegion,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    hasMenu: `${siteUrl}/menu`,
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

export function buildMenuSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${siteUrl}/menu/#menu`,
    name: `${site.name} Menu`,
    url: `${siteUrl}/menu`,
    hasMenuSection: menu.map((category) => ({
      '@type': 'MenuSection',
      name: category.title,
      hasMenuItem: category.items.map((item) => {
        const offers = item.price
          ? { '@type': 'Offer', price: item.price.replace('£', ''), priceCurrency: 'GBP' }
          : item.prices
            ? item.prices.map((p) => ({ '@type': 'Offer', name: p.label, price: p.price.replace('£', ''), priceCurrency: 'GBP' }))
            : undefined;

        return {
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers,
          suitableForDiet: item.badges?.includes('Vegetarian') ? 'https://schema.org/VegetarianDiet' : undefined,
        };
      }),
    })),
  };
}

export interface Breadcrumb {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(siteUrl: string, crumbs: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}
