# Website Features

## Pages

- Home
- Products (category listing + product detail)
- Services
- Industries
- About
- Contact
- Request Quote
- Blog
- Privacy Policy / Terms (required alongside a data-collecting quote form)

## Core features

- Quote form — submits to a Next.js route handler, sent via Resend, with
  bot protection (Cloudflare Turnstile or equivalent) and basic server-side
  validation (Zod).
- Contact via email form, WhatsApp deep link, and embedded Google Maps.
- Fully responsive.
- SEO: metadata, Open Graph, JSON-LD, sitemap.xml, robots.txt on every page
  (see `SEO.md`).
- Blog (Sanity-backed, same CMS as products/services/industries).
- Product search and product category filtering.
- Dark mode — optional, not required for launch (tokens already support it
  in `globals.css`; revisit after core pages ship).

## Future (not in launch scope)

- Customer portal
- Inventory portal
- Admin dashboard

(These imply auth, a database, and role-based access — out of scope for the
marketing site build in Phases 1–4. Flag before starting if priorities
change.)
