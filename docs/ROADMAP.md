# Roadmap

## Phase 1 — Foundation (done)

- Project setup (Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion,
  Lucide, brand tokens)
- Docs (`CLAUDE.md`, `docs/*`)
- Sticky navigation + dark footer
- Homepage
- Responsive layout shell

## Phase 2 — Content pages (done)

- Products (categories + detail pages), Services, Industries — built on
  `lib/content/` typed placeholder data shaped like `DATA.md`'s Sanity
  schema. Sanity project setup itself (dataset, API tokens, Studio route,
  swapping `lib/content/data.ts` for a real client) is still pending —
  needs Sanity credentials.
- Product search / category filtering (client-side, `/products`)
- Blog (list + post)

## Phase 3 — Forms & SEO infra (done)

- Quote Form: sends client-side via EmailJS (free tier, no server route or
  secret — switched from an initial Resend/server-route design once a free
  EmailJS account was available), Zod validation, honeypot +
  minimum-submit-time bot checks (see `SEO.md`/`.env.example`; needs
  `NEXT_PUBLIC_EMAILJS_*` vars + a dashboard template to actually send).
  Used on both `/request-quote` and `/contact`.
- Contact page: form, real email/phone/WhatsApp (the site owner's personal
  contact, standing in for official business contact info — see
  `PROJECT.md`), map placeholder pending a real business address.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` — done, using
  `NEXT_PUBLIC_SITE_URL` (placeholder domain until set).
- Still pending: per-page JSON-LD (Product/Organization/Breadcrumb —
  blocked on real company facts per `SEO.md`), Privacy Policy / Terms real
  copy (currently explicit placeholders pending legal review).
- Subtle Framer Motion pass done early (see Phase 4) rather than deferred.

## Phase 4 — Quality & CI (done, except deployment)

- ~~Animation pass~~ — done in Phase 3 (`components/motion/FadeIn.tsx`,
  `MotionConfig reducedMotion="user"` in `app/layout.tsx`).
- Performance: `viewport`/`themeColor` metadata, branded `not-found.tsx`;
  bundle stayed small enough (~1.3MB shared JS, no real images yet) that
  no route-level code-splitting was needed. Revisit once real product
  photography is added (`next/image` + remote patterns).
- Accessibility audit — `@axe-core/playwright` scans every page in
  `e2e/accessibility.spec.ts` (WCAG2A + WCAG2AA), plus a keyboard/focus-trap
  check on the mobile nav. Found and fixed real issues: card titles were
  non-semantic `<div>`s (now real `<h3>`s via `CardTitle asChild`), and
  green-on-navy eyebrow text needed a dedicated lighter token — see
  `DESIGN.md`'s `text-brand-green-on-primary` note.
- Testing: Vitest unit tests (`lib/quote-schema.test.ts`,
  `lib/content/index.test.ts` — 19 tests) + Playwright e2e smoke tests
  (`e2e/*.spec.ts` — nav incl. mobile menu, product search/filter, quote
  form validation/submit, a11y — 22 tests). `npm run test` /
  `npm run test:e2e`. Writing the honeypot unit test surfaced a real bug:
  the Zod schema rejected a *filled* honeypot before the route's silent
  bot-handling logic ever ran — fixed in `lib/quote-schema.ts`.
- CI: `.github/workflows/ci.yml` — lint, typecheck, unit tests, build,
  e2e tests on every push to `main` and every PR.
- Deployment — **not done**: needs a hosting decision (Vercel is the
  default fit) and an account/credentials, which weren't available in
  this session. See "Deployment" below.

### Deployment (not started)

Confirm target host before starting (Vercel is the default fit for Next.js
App Router). Needs, at minimum: a hosting account, the production domain
for `NEXT_PUBLIC_SITE_URL`, and the EmailJS env vars from `.env.example`
(plus the dashboard template — see `SEO.md`) if the quote form should
work at launch.

## Explicitly out of scope for now

Customer portal, inventory portal, admin dashboard (see `FEATURES.md`).
