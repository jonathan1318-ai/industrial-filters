# SEO

Every page requires:

- **Title** — via the route's `generateMetadata`/`metadata` export, using
  the root template in `app/layout.tsx` (`%s | Firuta Tech Services`).
- **Description** — specific to the page, not a copy-paste of the homepage.
- **Open Graph** — `og:title`, `og:description`, `og:image` (1200×630),
  `og:type`.
- **Canonical URL** — `alternates.canonical` in metadata, using the
  production domain once known (placeholder domain until then — see
  `PROJECT.md`).
- **Structured data (JSON-LD)**:
  - Organization + LocalBusiness on the homepage/contact page (needs real
    address/phone from `PROJECT.md` before going live — do not publish
    placeholder address in structured data).
  - Product schema on product detail pages.
  - BreadcrumbList on category/detail pages.
  - Article schema on blog posts.
- **Alt text** — every `next/image` usage; describe the equipment/scene, not
  "image1.jpg".

## Site-wide

- `app/sitemap.ts` — generates `sitemap.xml` from static routes + Sanity
  content (products, services, industries, posts).
- `app/robots.ts` — allow all, point to the sitemap.
- `app/manifest.ts` — PWA-style manifest for icons/theme color (navy).

## Do not

- Ship placeholder/fabricated business data inside structured data — an
  incorrect `LocalBusiness` address indexed by Google is worse than no
  structured data. Leave `LocalBusiness` schema out until `PROJECT.md`
  placeholders are filled in.
