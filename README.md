# Firuta Tech Services

Marketing website for Firuta Tech Services, a Malaysian industrial
filtration company. See `CLAUDE.md` and `docs/` for project rules,
company facts, design system, roadmap, and content — read those before
making changes.

## Stack

Next.js (App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion,
Lucide icons).

## Development

```bash
npm install
cp .env.example .env.local   # fill in Resend keys to test the quote form
npm run dev      # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Without `.env.local`, the site runs fine but `/api/quote` returns a
"not configured yet" error instead of sending email — see `.env.example`.

Run lint, typecheck, and build (in that order) before considering any
change done — see `CLAUDE.md`.
