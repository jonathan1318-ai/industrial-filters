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

## Phase 3 — Forms & SEO infra (current)

- Quote Form: `app/api/quote/route.ts` + Resend, Zod validation, honeypot +
  minimum-submit-time bot checks (no external CAPTCHA service — see
  `SEO.md`/`.env.example`; needs `RESEND_API_KEY` etc. to actually send).
  Used on both `/request-quote` and `/contact`.
- Contact page: form, WhatsApp/address/phone placeholders (not live links —
  see `PROJECT.md`), map placeholder pending a real address.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` — done, using
  `NEXT_PUBLIC_SITE_URL` (placeholder domain until set).
- Still pending: per-page JSON-LD (Product/Organization/Breadcrumb —
  blocked on real company facts per `SEO.md`), Privacy Policy / Terms real
  copy (currently explicit placeholders pending legal review).
- Subtle Framer Motion pass done early (see Phase 4) rather than deferred.

## Phase 4

- ~~Animation pass~~ — done in Phase 3 (`components/motion/FadeIn.tsx`,
  `MotionConfig reducedMotion="user"` in `app/layout.tsx`).
- Performance optimization (image sizing, font loading, bundle size)
- Accessibility audit (WCAG AA — contrast, focus order, screen reader pass)
- Testing (component/unit tests + Playwright smoke tests for nav, forms)
- CI (GitHub Actions: lint, typecheck, build on PR)
- Deployment (target host TBD — Vercel is the default fit for Next.js App
  Router; confirm before setting up)

## Explicitly out of scope for now

Customer portal, inventory portal, admin dashboard (see `FEATURES.md`).
