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

- `app/sitemap.ts` — generates `sitemap.xml` from static routes + content
  (products, services, industries, posts) via `lib/content`. Implemented.
- `app/robots.ts` — allow all except `/api/`, points to the sitemap.
  Implemented.
- `app/manifest.ts` — PWA-style manifest for icons/theme color (navy).
  Implemented; icon is currently just `favicon.ico` — add proper
  192/512px PNG icons once the real logo is supplied.
- Both `sitemap.ts` and `robots.ts`, plus `metadataBase` in
  `app/layout.tsx`, read `NEXT_PUBLIC_SITE_URL` (see `.env.example`) —
  it's a placeholder domain until set to production.

## Do not

- Ship placeholder/fabricated business data inside structured data — an
  incorrect `LocalBusiness` address indexed by Google is worse than no
  structured data. Leave `LocalBusiness` schema out until `PROJECT.md`
  placeholders are filled in. (JSON-LD itself isn't implemented yet — see
  `ROADMAP.md` Phase 3.)

## Quote/contact form bot protection

`app/api/quote/route.ts` uses a honeypot field + a minimum-time-to-submit
check (`lib/quote-schema.ts`) rather than an external CAPTCHA — no
Turnstile/hCaptcha site keys were available. This is a reasonable interim
measure; swap in Cloudflare Turnstile (or similar) once keys are available
if spam becomes an issue.
