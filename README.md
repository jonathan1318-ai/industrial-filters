# Firuta Tech Services

Marketing website for Firuta Tech Services, a Malaysian industrial
filtration company. See `CLAUDE.md` and `docs/` for project rules,
company facts, design system, roadmap, and content — read those before
making changes.

## Stack

Next.js (App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion,
Lucide icons). Content is a typed local data layer shaped like a future
Sanity schema (see `docs/DATA.md`). Forms send via EmailJS, client-side.

## Development

```bash
npm install
cp .env.example .env.local   # fill in EmailJS keys to test the quote/contact form
npm run dev      # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Without `.env.local`, the site runs fine but the quote/contact form shows
a friendly "not configured yet" error instead of sending — see
`.env.example` and `docs/SEO.md`'s EmailJS template setup section.

Run lint, typecheck, and build (in that order) before considering any
change done — see `CLAUDE.md`.

## Testing

```bash
npm run test        # Vitest unit tests (lib/**/*.test.ts)
npm run test:e2e     # Playwright e2e smoke tests (e2e/*.spec.ts) — nav,
                     # product search/filter, quote form, accessibility.
                     # Builds and boots a production server on :3100 itself.
```

`.github/workflows/ci.yml` runs lint, typecheck, unit tests, build, and
e2e tests on every push to `main` and every PR.

---

## Project History & Decision Log

A running record of what's been built, why, what broke along the way, and
how it got fixed — kept here so decisions don't get re-litigated or
re-debugged from scratch later. Newest work is at the bottom.

### Phase 1 — Foundation

Scaffolded the Next.js 16 project (App Router, TypeScript, Tailwind v4,
Turbopack), installed shadcn/ui (Nova preset, Lucide icons) and Framer
Motion, and set the brand tokens in `app/globals.css` (navy `#0C355B`,
green `#5FAE45`, 12px radius).

Wrote out `CLAUDE.md` and all of `docs/` (`PROJECT.md`, `SPEC.md`,
`DESIGN.md`, `ROADMAP.md`, `FEATURES.md`, `SEO.md`, `CONTENT.md`,
`BRAND.md`, `DATA.md`) as the project's source of truth before writing
any page code.

Built the sticky `Navbar` (with a mobile `Sheet` drawer), the dark navy
`Footer`, and the homepage (hero, product category grid, industries grid,
about/CTA). Added lightweight stub pages for every other nav destination
(Products, Services, Industries, About, Contact, Request Quote, Blog,
Privacy, Terms) specifically so the nav had no dead links even before
those pages had real content.

**Decision — accessible color pairing.** Caught early: white text on the
raw brand green (`#5FAE45`) is ~2.76:1 contrast, failing WCAG AA. Fixed by
setting `--secondary-foreground` to navy (`#0C355B` on `#5FAE45` is
~4.55:1, passing) rather than white. This one decision saved a lot of
rework later — see the Phase 4 accessibility section below for where a
*second*, subtler version of the same problem resurfaced.

Verified in a real headless browser (desktop + mobile nav, a product
category page) before calling it done. Gates: lint, typecheck, build all
clean.

### Phase 2 — Content pages

Built a typed content layer (`lib/content/types.ts`, `data.ts`,
`index.ts`) shaped identically to the Sanity schema documented in
`docs/DATA.md`, so swapping in a real Sanity client later only touches
`data.ts` — not any page or component code. Populated it with 12
illustrative products across the 6 launch categories, 6 industries, 4
services, and 3 blog posts — all explicitly flagged in code comments and
`docs/DATA.md` as placeholder/illustrative data, not confirmed Firuta
specs.

Built out Products (search + category filter, category pages, product
detail pages with a specs table), Services, Industries, and Blog — each
with listing + detail pages.

**Error — Server/Client Component boundary crash.**
```
Error: Functions cannot be passed directly to Client Components
unless you explicitly expose it by marking it with "use server".
```
*Cause:* the `/products` page (a Server Component) was passing the full
`productCategories` array — including Lucide icon *components* — as a
prop into `ProductExplorer`, a Client Component. React can't serialize
functions across that boundary.
*Fix:* stripped the icon out before passing data down — the server page
now maps to `{ title, slug, description }` only, and `ProductExplorer`
doesn't render category icons anyway, so nothing was lost.

44 routes built clean; verified product search/filter and detail pages in
a real browser before moving on.

### Phase 3 — Forms & SEO infra (originally Resend, later replaced — see below)

Built the quote/contact form on **Resend** initially: a Next.js route
handler (`app/api/quote/route.ts`) + `lib/email.ts`, with Zod validation
(`lib/quote-schema.ts`) and honeypot + minimum-submit-time bot protection
(no Turnstile/hCaptcha keys were available, so this was the practical
alternative). `QuoteForm.tsx` was built as one reusable client component
wired into both `/request-quote` and `/contact`.

Added `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, and
`metadataBase`/Open Graph defaults, all driven by a `NEXT_PUBLIC_SITE_URL`
env var (placeholder domain until a real one exists).

Added the subtle Framer Motion pass: `components/motion/FadeIn.tsx`
(scroll-triggered fade + slide, staggered across grids), mount animations
on `Hero`/`PageHero`, and `MotionConfig reducedMotion="user"` in
`app/layout.tsx` so all of it is automatically disabled for anyone with
`prefers-reduced-motion` set.

Verified the form's validation/success/"not configured" states in a real
browser. Gates clean.

### Phase 4 — Quality, accessibility, and CI

**Performance:** added `viewport`/`themeColor` metadata and a branded
`not-found.tsx`. Bundle size was reasonable enough (~1.3MB shared JS, no
real images yet) that no route-level code-splitting was needed.

**Accessibility audit — this is where most of the real bugs turned up.**
Wired up `@axe-core/playwright` to scan every page (WCAG2A + WCAG2AA) plus
a keyboard/focus-trap check on the mobile nav (`e2e/accessibility.spec.ts`).

- **Error — non-semantic card headings.** Product/service/industry/blog
  card titles were rendered via shadcn's `CardTitle`, which is a plain
  `<div>` — invisible to screen readers navigating by heading. *Fix:*
  added `asChild` support to `CardTitle` (via Radix `Slot`, matching the
  pattern already used on `Button`/`Badge`) so callers render real
  `<h3>` elements: `<CardTitle asChild><h3>{title}</h3></CardTitle>`.

- **Error — green-on-navy text failing contrast despite passing the math.**
  The `PageHero` eyebrow text (green on the navy banner) computes to
  ~4.55:1 by raw hex color math — technically AA-passing. But `axe`
  doesn't just compare the two CSS colors; for small, uppercase,
  letter-spaced text it samples actual anti-aliased glyph pixels, which
  blend toward the background at the edges. Measured contrast came back
  as low as ~1.5–2.8:1 depending on exactly which frame was sampled.
  *Fix:* added a dedicated, brighter token — `--brand-green-on-primary`
  (`#A3E58C`, ~7:1 nominal) — used only for text on the navy panel, with
  the reasoning documented in `docs/DESIGN.md` so nobody "fixes" it back
  to the wrong color later.

- **Debugging detour — flaky contrast failures traced to animation timing,
  not real bugs.** The eyebrow-contrast failures above were *also*
  showing up inconsistently — different measured colors on every re-run
  — which pointed to the accessibility scan racing an in-flight Framer
  Motion opacity transition (`PageHero`'s mount animation), not a static
  CSS problem.
  - First attempt: set `reducedMotion: "reduce"` directly in
    `playwright.config.ts`'s `use` block. This broke the TypeScript build
    — `reducedMotion` isn't a recognized property on that particular
    config type in this Playwright version.
  - Working fix: moved it into a per-test fixture instead
    (`e2e/fixtures.ts`), calling `page.emulateMedia({ reducedMotion:
    "reduce" })` on every test's `page` fixture. Every spec now imports
    `test`/`expect` from `./fixtures` rather than `@playwright/test`
    directly.
  - That *still* wasn't fully sufficient — the real fix was that
    `page.goto()`'s default `waitUntil: "load"` doesn't wait for React
    hydration or Framer Motion's effects to settle. Switching the
    accessibility spec's navigations to `waitUntil: "networkidle"` gave
    the animation time to finish (or, with reduced motion active, skip
    straight to its end state) before `axe` ever scanned the page.

**Testing:** added Vitest unit tests (`lib/quote-schema.test.ts`,
`lib/content/index.test.ts` — 19 tests) and Playwright e2e smoke tests
(`e2e/*.spec.ts` — nav incl. mobile menu, product search/filter, quote
form, full accessibility sweep — 22 tests).

- **Bug found by writing a unit test, not by manual testing.** The
  honeypot field's Zod schema was `website: z.string().max(0)...`, which
  *rejects* any non-empty value at the validation layer. That meant a bot
  filling in the honeypot got a 400 validation error instead of the
  intended silent "pretend it succeeded" response — defeating the whole
  point of a honeypot (a bot could tell "rejected" from "accepted" and
  adapt). *Fix:* loosened the schema to `.max(200)` and left the actual
  "is this empty" check where it belongs — in the form-submission logic,
  not the schema.

- **Environment quirk — Playwright's browser revision mismatch in this
  sandboxed dev container.** `@playwright/test` 1.61 expects a specific
  `headless_shell` browser revision by default, but the container only
  had an older, pre-fetched full Chromium build and no network access to
  fetch the expected one. *Fix:* `playwright.config.ts` checks whether
  the known local Chromium path exists (`existsSync`) and, if so, points
  `launchOptions.executablePath` straight at it — falling back to
  Playwright's normal resolution otherwise, so real CI (which runs
  `playwright install` with full network access) is unaffected.

**CI:** `.github/workflows/ci.yml` — lint, typecheck, unit tests, build,
e2e tests on every push to `main` and every PR.

**Deployment — deliberately not done.** Asked before starting (a
deploy/hosting decision needs the user, not something to guess at); the
answer was to hold off until real company facts, the logo file, and a
domain are in hand. Documented as an open item in `docs/ROADMAP.md`
rather than left silently undone.

### Switching the form backend from Resend to EmailJS

Resend needs a server-side API key and, for anything beyond a sandbox, a
verified sending domain — friction not worth taking on before the site
even has a real domain. EmailJS runs entirely client-side (no server
route, no server secret) and its free tier (200 emails/month) was already
available, so it was a better fit for where the project is right now.

- Removed `app/api/quote/route.ts` and `lib/email.ts`. `QuoteForm.tsx` now
  calls `@emailjs/browser`'s `emailjs.send()` directly; the honeypot +
  minimum-submit-time bot check moved client-side with it (unchanged
  logic, different location).
- `.env.example` swapped `RESEND_API_KEY`/`QUOTE_*_EMAIL` for
  `NEXT_PUBLIC_EMAILJS_SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY` — these are
  meant to be public by EmailJS's design (abuse prevention happens via the
  dashboard's "allowed origins" setting, not by hiding the key).
- Added real contact info: the site owner's personal
  `jacobjayenpillai@gmail.com` and `016-612-8291`, now live `tel:`/
  `wa.me:`/`mailto:` links in the footer and Contact page (`lib/
  contact.ts` is the shared source). Documented in `docs/PROJECT.md` as a
  provisional stand-in for the eventual real business contact — not
  presented as more official than it is, and not a fabricated fact since
  it's genuinely the owner's own number/email.
- `e2e/quote-form.spec.ts` now mocks the EmailJS network call
  (`page.route("https://api.emailjs.com/**", ...)`) so the test suite
  never depends on live external state, quota, or credentials.

### Local environment troubleshooting (Windows dev machine)

Two issues came up running the project locally on Windows that were
environment quirks, not code bugs:

**`EBUSY: resource busy or locked, rename '...server-reference-manifest.
json.tmp...' -> '...server-reference-manifest.json'`** — appeared
intermittently on `npm run dev`, always resolved itself on a page refresh.
*Cause:* Turbopack's dev server writes build manifests via a
temp-file-then-rename pattern; on Windows, if another process (antivirus
real-time scanning, a cloud-sync client, or a lingering previous `next
dev` process) has that file handle open for even a moment, the rename
fails with `EBUSY`. Confirmed this project isn't opting into Turbopack's
experimental filesystem cache (which would be a more direct cause) — it's
the plain dev-mode write pattern.
*Fixes, most to least likely to help:*
1. Add the project folder (or at least `.next`) to Windows Defender's
   scan exclusions (Windows Security → Virus & threat protection → Manage
   settings → Exclusions).
2. Check whether the project folder sits inside a Dropbox/OneDrive-synced
   directory — sync clients grab file handles right as Next.js is
   renaming them. Move the project outside the synced folder if so.
3. Fully kill lingering `node.exe` processes (Task Manager, or `taskkill
   /F /IM node.exe`) before restarting `npm run dev`.
*Doesn't affect CI or production* — those run on Ubuntu, and `next
build`/`next start` don't do this same incremental dev-mode file dance.

**`Module not found: Can't resolve '@emailjs/browser'`** after pulling
the EmailJS-switch commit. *Cause:* `git pull` updates `package.json`/
`package-lock.json`, but doesn't install anything — plain stale
`node_modules`. *Fix:* `npm install`, then restart `npm run dev`.

### EmailJS dashboard setup, live test send, and the "product interest" fix

Walked through creating/adjusting an EmailJS Email Template to match what
`QuoteForm.tsx` sends. The account already had a default "Contact Us"
template using `{{name}}`/`{{email}}` rather than the `{{from_name}}`/
`{{from_email}}` the code was originally written against — rather than
fighting the dashboard's rich-text template editor to rename fields,
`QuoteForm.tsx`'s `emailjs.send()` call was adjusted to match the existing
template's variable names.

First real test send succeeded end-to-end — landed in the inbox with all
fields populated. Two things noticed along the way:

- **The email subject rendered blank** (`"New Inquiry: |"`). *Cause:* a
  template has *two* separate places variables live — the Subject field
  (top of the Content tab) and the body — and only the body had been
  edited to match; the Subject field still referenced `{{subject}}`/
  `{{category}}`, which nothing sends, so it rendered empty. Documented in
  `docs/SEO.md` as a "check the Subject field too" callout so this doesn't
  get re-discovered the same way next time.
- A separate Auto-Reply template's message landed in the user's own Spam
  folder — flagged as a minor deliverability note (common with EmailJS +
  a personal Gmail sender with no custom-domain SPF/DKIM), not something
  fixed in code.

**Then:** noticed the Contact page's "Product interest" field always
showed `"—"` in the received email, because the dropdown only renders
when options are passed in, and the Contact page never passed any — it
was just reusing the Request Quote page's field verbatim, but Contact is
meant for *any* reason to get in touch (partnership, support, press),
not only product quotes.

Discussed and decided: keep the two pages' fields conceptually separate
rather than merging them —

- `/request-quote` keeps **"Product interest"** (the 6 filter categories)
  — makes sense there, since anyone on that page already wants a quote.
- `/contact` gets a new **"What's this about?"** dropdown: General
  Inquiry, Request a Quote, Partnership, Support, Media / Press, Other.

Implemented by generalizing `QuoteForm.tsx`'s `productOptions` prop into
`topicLabel`/`topicPlaceholder`/`topicOptions`, so each page supplies its
own contextual label and option list through the same component. Renamed
`lib/quote-schema.ts`'s `productInterest` field to the more general
`topic` (free text either way, so no schema shape change beyond the
rename). Updated `docs/SEO.md`'s EmailJS variable table to `{{topic}}`
and added the Subject-field callout mentioned above. Verified both
dropdowns render with their correct, page-specific options via browser
screenshots before shipping.

### Contact-ease brainstorm, and working through the list

Brainstormed free/low-cost additions to make it easier for visitors to
reach Firuta. Ranked two as top picks — a floating WhatsApp button
(near-zero effort, and WhatsApp is often the primary contact channel for
SMEs in Malaysia) and Cloudinary + free stock photography (the site had
zero real photography at this point, all abstract icon panels via
`PlaceholderVisual`) — plus a longer list of smaller free tools:
free-forever live chat ([Tawk.to](https://www.tawk.to)), an FAQ section,
free analytics (Microsoft Clarity or Google Analytics), Google Search
Console, and free uptime monitoring (UptimeRobot).

**Shipped: floating WhatsApp button.**
`components/layout/WhatsAppButton.tsx`, rendered globally in
`app/layout.tsx`, bottom-right, present on every page. Reuses
`lib/contact.ts`'s existing `whatsappHref()` helper. Self-hides if the
WhatsApp number ever reverts to a `[PLACEHOLDER]`, so it can't ship as a
dead button. Subtle mount animation, respects the site-wide
`reducedMotion="user"` config like everything else. Covered by a new
`e2e/nav.spec.ts` test (presence + correct `wa.me` href) — the existing
accessibility sweep picks it up automatically since it's on every page.
23 e2e tests now, all passing.

**Shipped: Cloudinary + real stock photography.** Asked which sourcing
approach to take (Cloudinary + your own account vs. direct stock photos
with no account vs. skip for now) — went with Cloudinary. Sourced and
verified 7 free Unsplash photos (regular license, no identifiable
people): one general industrial hero shot, one per product category.
Built `lib/cloudinary.ts` (constructs Cloudinary "fetch"-transform URLs —
optimizes any public image URL on the fly, no upload step) and
`components/marketing/CloudinaryImage.tsx` (renders the real photo via
`next/image` when `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set, falls back
to the existing `PlaceholderVisual` graphic otherwise — never requests a
broken URL). Wired into the homepage hero and product detail pages.
`docs/DESIGN.md` documents the one-time account setup, including a
non-obvious step: new Cloudinary accounts have remote `fetch` disabled by
default (Console → Settings → Security → uncheck "Fetched URL" under
Restricted media types) — found by reading Cloudinary's own docs rather
than assuming, after the account-less "demo" cloud predictably returned
401 during a sanity check. Code ships fully ready; only the cloud-name
env var is missing until the account exists. Verified: build, full e2e
suite (23 tests) pass with Cloudinary unconfigured, screenshots confirm
byte-identical fallback rendering (no regression), zero console errors.

**Still open: the rest of the list.** Free live chat (Tawk.to), FAQ
section, analytics (Microsoft Clarity / Google Analytics), Google Search
Console, UptimeRobot — not started, revisit once prioritized.
