# Roadmap

## Phase 1 — Foundation (current)

- Project setup (Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion,
  Lucide, brand tokens)
- Docs (`CLAUDE.md`, `docs/*`)
- Sticky navigation + dark footer
- Homepage
- Responsive layout shell

## Phase 2

- Products (categories + detail pages), Services, Industries
- Sanity project setup + schemas (per `DATA.md`), or continue on local
  placeholder data if Sanity credentials aren't available yet
- Product search / category filtering
- Blog (list + post)

## Phase 3

- Quote Form (Next.js route handler + Resend + validation + bot protection)
- Contact page (email form, WhatsApp link, Google Maps embed)
- `sitemap.ts`, `robots.ts`, `manifest.ts`, per-page metadata + JSON-LD
- Privacy Policy / Terms pages

## Phase 4

- Animation pass (Framer Motion, subtle only)
- Performance optimization (image sizing, font loading, bundle size)
- Accessibility audit (WCAG AA — contrast, focus order, screen reader pass)
- Testing (component/unit tests + Playwright smoke tests for nav, forms)
- CI (GitHub Actions: lint, typecheck, build on PR)
- Deployment (target host TBD — Vercel is the default fit for Next.js App
  Router; confirm before setting up)

## Explicitly out of scope for now

Customer portal, inventory portal, admin dashboard (see `FEATURES.md`).
