/**
 * Single source of truth for every business fact on the site.
 * Reference these values everywhere — never hardcode a duplicate in markup.
 */

export interface DayHours {
  /** 0 = Sunday … 6 = Saturday (JS Date#getDay convention) */
  day: number;
  label: string;
  opens: string | null;
  closes: string | null;
}

export interface Offer {
  slug: string;
  title: string;
  description: string;
  terms: string;
  badge?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Cozy Cafe',
  legalName: 'Cozy Cafe',
  tagline: "Edinburgh's Best Breakfast Takeaway",
  shortDescription: 'Turkish & British café serving breakfast, brunch and Turkish street food in Leith, Edinburgh.',
  cuisine: ['Turkish', 'British', 'Breakfast'] as const,

  rating: {
    value: 5.0,
    count: 79,
  },

  priceRange: '£',
  priceDescription: 'Around £1–£10 per person',

  services: ['Dine-in', 'Takeaway', 'No-contact delivery', 'Order online'] as const,

  contact: {
    address: {
      streetAddress: '36 Ferry Rd',
      addressLocality: 'Edinburgh',
      addressRegion: 'Scotland',
      postalCode: 'EH6 4AE',
      addressCountry: 'GB',
    },
    addressFull: '36 Ferry Rd, Edinburgh EH6 4AE, Scotland',
    phoneDisplay: '0131 554 4323',
    phoneHref: 'tel:+441315544323',
    geo: {
      lat: 55.9752938,
      lng: -3.1806905,
    },
  },

  social: {
    instagram: 'https://www.instagram.com/cozycafe.edinburgh/',
    facebook: 'https://www.facebook.com/CozyCafeEdinburgh/',
  },

  links: {
    order: 'https://mealzo.co.uk/cozy-cafe/menu?sm=delivery',
    androidApp: 'https://play.google.com/store/apps/details?id=com.cozycafemealzo',
  },

  surchargeNote: 'A small surcharge may apply to online and card orders.',

  /** Europe/London local time, 24h "HH:MM" strings. Null means closed all day. */
  hours: [
    { day: 0, label: 'Sunday', opens: '10:00', closes: '16:00' },
    { day: 1, label: 'Monday', opens: '08:30', closes: '16:30' },
    { day: 2, label: 'Tuesday', opens: '08:30', closes: '16:30' },
    { day: 3, label: 'Wednesday', opens: '08:30', closes: '16:30' },
    { day: 4, label: 'Thursday', opens: '08:30', closes: '16:30' },
    { day: 5, label: 'Friday', opens: '08:30', closes: '16:30' },
    { day: 6, label: 'Saturday', opens: '08:30', closes: '16:30' },
  ] satisfies DayHours[],

  timezone: 'Europe/London',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Deals', href: '/deals' },
    { label: 'About', href: '/about' },
    { label: 'Visit', href: '/visit' },
  ] satisfies NavLink[],

  footerLegalLinks: [
    { label: 'Allergy Guide', href: '/allergy-guide' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
  ] satisfies NavLink[],

  offers: [
    {
      slug: 'collection-20',
      title: '20% Off Online Collection',
      description: '20% off online collection orders over £20.',
      terms: 'Valid on collection orders placed via Mealzo over £20. Cannot be combined with other offers. A small surcharge may apply to online orders.',
      badge: 'Save 20%',
    },
    {
      slug: 'full-brekkie-deal',
      title: 'Full Brekkie Deal',
      description: 'A Full English or Full Scottish breakfast plus a can of drink.',
      terms: 'Choice of Full English or Full Scottish breakfast with a can of drink included. Dine-in, takeaway or online.',
      badge: '£12.50',
    },
    {
      slug: 'brunch-deal',
      title: 'Brunch Deal',
      description: 'Any panini or wrap served with chips, salad and a can of drink.',
      terms: 'Choose any panini or wrap from the menu, served with chips, salad and a can of drink.',
      badge: '£8.95',
    },
    {
      slug: 'cozy-duo-deal',
      title: 'Cozy Duo Deal',
      description: 'Two burgers with sides and drinks — made for sharing.',
      terms: 'Two burgers of your choice, served with sides and two drinks.',
      badge: '£23.00',
    },
  ] satisfies Offer[],

  analytics: {
    /** Set to true only after the owner supplies a real, consented analytics ID. */
    enabled: false,
    provider: 'plausible' as 'plausible' | 'ga4',
    plausibleDomain: 'cozycafeedinburgh.co.uk',
    ga4Id: '',
  },

  seo: {
    titleSuffix: ' | Cozy Cafe – Edinburgh’s Best Breakfast Takeaway',
    defaultDescription:
      "Cozy Cafe on Ferry Road, Leith — Edinburgh's best breakfast takeaway. Turkish breakfast, Full Scottish, burek, gözleme and homemade pancakes. Order online or visit us today.",
    ogImage: '/og-image.jpg',
  },
} as const;

export type Site = typeof site;
