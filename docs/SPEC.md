# Functional Specification

## Required pages

Home, Products, Services, Industries, About, Contact, Request Quote, Blog.

## Every page must

- Be responsive (mobile-first, tested at 375px / 768px / 1280px+).
- Be built from reusable components — no duplicated markup across pages.
- Pass Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO.
- Be SEO-optimized with complete metadata (see `SEO.md`).
- Use semantic HTML and meet WCAG AA.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4.
- shadcn/ui components, Framer Motion for subtle animation, Lucide icons.
- Sanity as the CMS for Products/Services/Industries/Blog (see `DATA.md`).
- Resend for the quote-form email API route, with Zod validation and bot
  protection on the server action / route handler.
- Reusable components; avoid duplicated code.

## Quality gates (run before any change is considered done)

```
npm run lint
npm run typecheck
npm run build
```

Fix all errors one by one — do not suppress, ignore, or work around them.

## Assets

- Never use copyrighted logos (competitors, fake certification badges).
- Use placeholder industrial images until real photography is provided.
- Use the uploaded Firuta logo only; never redesign it (see `BRAND.md`).

## Unknowns

If required information (company facts, copy claims, certifications,
pricing, real imagery) is missing, ask instead of guessing.
