# TODO before launch

Everything below is a placeholder or a decision the site owner needs to make. The site builds, passes accessibility/Lighthouse checks and is fully functional as-is — nothing here is a bug, but none of it should ship to production unreviewed.

## 1. Real photography (highest priority)

Every photo slot currently renders a labelled, correctly-sized placeholder via `FoodImage.astro` (a dashed border + "Photo coming soon" label) so there's no broken image and no layout shift. Replace by dropping files into `public/images/` and passing `src="/images/…"` to the component (see README → "Swapping images"). Shot list:

- **Hero background** (`src/components/Hero.astro`, used on every page) — one warm, wide (16:9) photo of the café/food for the homepage hero and the smaller `compact` hero on inner pages. Consider two different crops (full hero for `/`, a calmer one for inner pages).
- **Signature dishes** (`src/pages/index.astro`, `signatureDishes` array) — 4 photos, 4:3: Turkish Breakfast, Full Scottish, Halloumi & Sucuk Simit, Homemade Pancakes.
- **About page collage** (`src/pages/about.astro`) — 4 photos: Turkish breakfast spread (3:4), Full Scottish breakfast (3:4), gözleme being made (1:1), Turkish coffee & tea (1:1).
- **About teaser image** on the homepage (`src/pages/index.astro`, the "neighbourhood spot" section) — currently an unlabelled decorative placeholder box; needs a real photo of the team/counter.
- Optional: individual dish photos across the full `/menu` page currently show no images at all (text-only rows) — decide whether to add thumbnails per item or keep the menu text-first (common for cafés with large menus).

## 2. Genuine Google review quotes

`src/pages/index.astro` (`reviews` array) has three **placeholder** quotes, each rendered with a visible "Placeholder — owner to replace" tag on the card (`ReviewCard.astro`, `placeholder` prop). Replace with 2–3 real, verifiably genuine quotes copied from actual Google reviews (with permission/attribution as appropriate), and remove the `placeholder` prop once real. Also confirm the "Read our Google reviews" link on the homepage — it currently points to a generic Google search for the business name; swap in the direct Google Business Profile review link once you have it.

## 3. OG share image

`public/og-image.jpg` is a generated placeholder (branded but not real photography — see `scripts/generate-og-image.mjs`). Replace with a real 1200×630 image (ideally real food photography with the logo/wordmark) before launch so link previews on social/messaging apps look intentional.

## 4. Legal copy

Three pages have deliberately generic placeholder copy with an on-page notice:

- `/allergy-guide` — general allergy guidance. The owner must confirm dish-by-dish allergen information in line with UK Food Information Regulations (Natasha's Law) — this is a legal requirement for food businesses, not just nice-to-have.
- `/terms` — generic terms and conditions.
- `/privacy` — generic privacy policy.

None of this is legal advice. Have a solicitor or a proper template service review all three before launch.

## 5. Surcharge wording

`site.surchargeNote` in `src/data/site.ts` currently reads "A small surcharge may apply to online and card orders." Confirm the exact wording, percentage/amount (if fixed), and which payment methods it applies to — this text is shown on the homepage deals band, the menu page, the deals page and the footer, all from this single string.

## 6. Analytics

Analytics is wired up but **switched off** (`site.analytics.enabled = false` in `src/data/site.ts`) and no tracking ID is present anywhere in the repo, by design. To enable:

- Decide Plausible vs GA4, set `provider` accordingly.
- Supply `plausibleDomain` or `ga4Id`.
- Flip `enabled` to `true`.

See README → "Enabling analytics" for how the consent gating works.

## 7. Production domain

`astro.config.mjs` sets `site: 'https://www.cozycafeedinburgh.co.uk'` as a placeholder domain (not confirmed by the owner). This value feeds the sitemap, canonical URLs, OG/Twitter tags and JSON-LD `image`/`url` fields. Update it to the real domain before launch, then rebuild.

## 8. Favicon / logo

The favicon (`public/favicon.svg`, `public/favicon.ico`) is still Astro's default placeholder. Replace with a real Cozy Cafe mark. The header/footer wordmark is set in text (Fraunces), not an image — if the owner has a real logo, consider swapping the text wordmark for it in `Header.astro` and `Footer.astro`.

## 9. Content Security Policy

`netlify.toml` ships the CSP as `Content-Security-Policy-Report-Only` deliberately, so nothing breaks silently. Once live, monitor reports for a couple of weeks, tighten the policy for anything unexpected (e.g. if Mealzo or Google Maps need additional origins), then rename the header to `Content-Security-Policy` to actually enforce it.

Note: the policy starts with `script-src 'self'`, but a few tiny interactive scripts (mobile nav, sticky bar, cookie banner, scroll-reveal) are small enough that Astro inlines them directly into the page `<script>` tags rather than as external files — those will show up as report-only violations. Before enforcing the CSP for real, either add `'unsafe-inline'` to `script-src` (simplest, slightly weaker), or generate per-script SHA-256 hashes at build time and add them as `'sha256-…'` sources (more secure, more setup).

## 10. Facts to double-check

The following were supplied as given facts and are already wired through `src/data/site.ts`, but it's worth a final read-through against the real business before launch: address, phone number, geo-coordinates, opening hours, Mealzo ordering link, Android app link, Instagram/Facebook URLs, and the exact deal prices/terms on `/deals`.
