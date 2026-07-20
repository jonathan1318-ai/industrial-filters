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
- `app/robots.ts` — allow all, points to the sitemap. Implemented.
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

## Quote/contact form: EmailJS + bot protection

The form (`components/forms/QuoteForm.tsx`) sends via
[EmailJS](https://dashboard.emailjs.com) directly from the browser — no
server route, no server-side secret (see `.env.example`). This was chosen
over a server route + Resend specifically to stay on a free tier with no
domain-verification step (EmailJS free tier: 200 emails/month).

Bot protection is a honeypot field + a minimum-time-to-submit check
(`lib/quote-schema.ts`), run client-side before the `emailjs.send()` call,
rather than an external CAPTCHA — no Turnstile/hCaptcha/reCAPTCHA site
keys were available. This is a reasonable interim measure; EmailJS
supports reCAPTCHA v3 per-template if spam becomes a real problem, and
restricting the EmailJS key to specific origins (dashboard → Account →
Security) is worth doing once the production domain is set.

**EmailJS template setup** (one-time, in the EmailJS dashboard): create an
Email Template under Content → Email Templates with these variables in the
**Subject** field and the body. In the template's Settings tab (not the
content editor), set **To Email** to the recipient inbox and **Reply To**
to `{{email}}` so replying goes straight to the customer, not back to
yourself:

| Variable | Source |
|---|---|
| `{{name}}` | Sender's name |
| `{{email}}` | Sender's email |
| `{{company}}` | Sender's company |
| `{{phone}}` | Sender's phone, or "—" if omitted |
| `{{topic}}` | What the inquiry is about — a product category on `/request-quote`, or a general reason (Partnership, Support, ...) on `/contact`; "—" if omitted |
| `{{message}}` | The inquiry itself |

Suggested Subject: `New inquiry: {{topic}}` — EmailJS renders unmatched
variables as empty, so a Subject line left over from a default template
(e.g. referencing `{{subject}}`/`{{category}}`, which nothing sends) comes
through blank. Double-check the Subject field, not just the body, when
editing a template.

Don't include variables the form doesn't collect (e.g. a default
template's `{{time}}`/`{{category}}`/`{{subject}}`) — EmailJS renders
unmatched placeholders as empty rather than erroring, but it's a cleaner
email without them.

Then put the Service ID, Template ID, and Public Key (Account → API Keys)
into `.env.local` per `.env.example`.
