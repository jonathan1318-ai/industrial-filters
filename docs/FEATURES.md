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

- Quote form (`components/forms/QuoteForm.tsx`) — submits to
  `app/api/quote/route.ts`, sent via Resend, with server-side Zod
  validation and honeypot + minimum-submit-time bot checks (see `SEO.md`
  for why not an external CAPTCHA). Used on `/request-quote` and
  `/contact`.
- Contact page has the same form plus placeholder address/phone/WhatsApp
  (not live links yet) and a map placeholder — real address needed for
  both the Google Maps embed and a working WhatsApp deep link.
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
