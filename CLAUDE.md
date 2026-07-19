# Firuta Tech Services — Project Rules

Permanent rules for this codebase. Read `docs/` before starting work — it is the
source of truth for company facts, scope, design system, roadmap, content, SEO,
brand, and data schema.

- `docs/PROJECT.md` — company, mission, customers, competitors
- `docs/SPEC.md` — functional spec and quality gates
- `docs/DESIGN.md` — UI/UX system (colors, type, spacing, components)
- `docs/ROADMAP.md` — development phases
- `docs/FEATURES.md` — feature list (current + future)
- `docs/SEO.md` — per-page SEO requirements
- `docs/CONTENT.md` — copy (hero, product names, about, mission/vision)
- `docs/BRAND.md` — logo, color, tone rules
- `docs/DATA.md` — content model for products/services/industries (Sanity)

This is a Next.js 16 project (App Router, Turbopack by default). Next 16 has
breaking changes vs. older training data — check `node_modules/next/dist/docs/`
(especially `01-app/02-guides/upgrading/version-16.md`) before relying on
memory for App Router APIs: params/searchParams/cookies/headers are async,
`middleware.ts` is renamed `proxy.ts`, `next lint` is removed (use `eslint`
directly, already wired as `npm run lint`).

## Tech stack

Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion,
Lucide icons. Sanity as the CMS for products/services/industries content.
Resend for the quote-form email API route.

## Non-negotiable rules

- **Logo**: use the uploaded logo asset only. Never redesign, re-color, or
  regenerate it. Until the real logo file is provided, use a text-based
  placeholder wordmark clearly distinct from a finished logo — do not
  fabricate a logo graphic.
- **No copyrighted/third-party logos** anywhere (competitors, stock icon
  packs pretending to be certifications, etc).
- **No fabricated company facts.** Address, phone, email, business
  registration number, certifications, and client names must come from the
  user. Until provided, use obvious placeholders (e.g. `[ADDRESS]`,
  `[PHONE]`) — never invent plausible-looking ones.
- **Images**: use placeholder industrial imagery (factories, clean rooms,
  HVAC, water treatment) until real photography is supplied. No stock people
  photos pretending to be staff.
- **Design constraints**: minimal, large whitespace, 12px radius, subtle
  animations only, no glassmorphism, no neon, no cartoon graphics.
- **Accessibility**: WCAG AA minimum on every page (color contrast, focus
  states, semantic HTML, keyboard navigation).

## Every page must

- Be responsive and built from reusable components (no duplicated markup).
- Use semantic HTML and pass Lighthouse ≥ 90 (Performance, Accessibility,
  Best Practices, SEO).
- Have complete metadata: title, description, canonical URL, Open Graph
  tags, and (where applicable) JSON-LD structured data. See `docs/SEO.md`.
- Use `next/image` with meaningful `alt` text — no bare `<img>`.

## Before calling any change done

Run, in order, and fix errors one by one (do not suppress or skip):

```
npm run lint
npm run typecheck
npm run build
```

## When information is missing

Ask instead of guessing — this applies to company facts, copy claims,
certifications, pricing, and anything that would misrepresent the business.
