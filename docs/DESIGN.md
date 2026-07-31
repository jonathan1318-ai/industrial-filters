# Design System

## Color

| Token | Hex | Usage |
|---|---|---|
| Primary (navy) | `#0C355B` | Headings, primary buttons, nav, footer bg |
| Secondary (green) | `#5FAE45` | Accents, highlights, secondary CTAs |
| White | `#FFFFFF` | Backgrounds, primary-on-navy text |
| Gray scale | Tailwind neutral | Body text, borders, muted surfaces |

Implemented as CSS variables in `app/globals.css` (`--primary`, `--secondary`,
etc.) consumed by shadcn/ui tokens (`bg-primary`, `text-secondary-foreground`,
...). **Do not put white text on solid green** — `#FFFFFF` on `#5FAE45` is
~2.76:1 contrast and fails WCAG AA; navy (`#0C355B`) on `#5FAE45` is ~4.55:1
and passes. `--secondary-foreground` is set to navy for this reason — keep it
that way.

The raw brand green (`#5FAE45`) also fails AA **as text on a light
background** (same ~2.76:1). Use `--secondary`/`bg-secondary` for fills,
icons, and borders; use the `text-brand-green-text` utility (a darker green,
~5.2:1 on white) for green labels/eyebrows on light backgrounds. In dark
mode `--brand-green-text` resolves back to the full-brightness green, which
already passes against the dark navy background.

**Green text on the navy `PageHero` panel needs a third, lighter tint —
`text-brand-green-on-primary`.** Nominal #5FAE45-on-navy contrast computes
to ~4.5:1 (barely passing), but axe-core's automated contrast checker
samples actual anti-aliased glyph pixels rather than the raw CSS color
pair, and for small/uppercase/tracked-out text (exactly `PageHero`'s
eyebrow style) that sampling reports well below 4.5:1 in practice —
verified via `e2e/accessibility.spec.ts`. `--brand-green-on-primary`
(`#A3E58C`, ~7:1 nominal) carries enough margin to hold up under that
stricter check. Don't use raw `text-secondary`/`text-brand-green-text` for
eyebrow-style text on a navy background — use this token instead.

## Typography

Inter (`next/font/google`), loaded as the `--font-sans` variable in
`app/layout.tsx`. No secondary display typeface — weight and size carry
hierarchy, not a second font family.

## Spacing & shape

- Large whitespace between sections (`py-16 md:py-24` as a baseline for
  homepage sections).
- 12px corner radius (`--radius: 0.75rem` in `globals.css`, exposed as
  Tailwind's `rounded-lg`).
- Minimal cards: subtle border or soft shadow, never both heavy. No
  glassmorphism (no backdrop-blur-over-image cards), no neon glow, no
  gradient-mesh backgrounds.

## Components

Built on shadcn/ui (`components/ui/*`) — Button, Card, Badge, Separator,
NavigationMenu, Sheet (mobile nav drawer). Compose these into
`components/` (e.g. `components/layout/Navbar.tsx`,
`components/sections/Hero.tsx`) rather than duplicating markup per page.

## Icons

Lucide (`lucide-react`), already wired via shadcn's `iconLibrary` config.

## Imagery

Industrial: factories, clean rooms, HVAC plant rooms, water treatment
facilities, filtration equipment close-ups. No stock photos of generic
office workers, and none featuring identifiable people (could read as
fake "staff" photos — see `CLAUDE.md`). Use placeholder imagery (clearly
sourced from a free stock provider, not fabricated "customer photos")
until real photography is supplied.

**Implementation:** `components/marketing/CloudinaryImage.tsx` renders a
free Unsplash stock photo (source URLs in `lib/content/data.ts` —
`heroImageUrl` and each `imageUrl` on product categories, services,
industries, and posts) through Cloudinary's `fetch` delivery type
(`lib/cloudinary.ts`), which optimizes format/size on the fly with no
upload step. Falls back to the abstract `PlaceholderVisual` graphic
whenever `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` isn't set, so a
missing/misconfigured Cloudinary account never shows a broken image.

Photos appear on: the homepage hero, the About page, product category
cards (homepage + `/products`), product detail pages, service/industry
listing cards, and blog post cards — so visitors see representative
imagery before clicking into a product, service, industry, or article.

**Cache/credit efficiency:** `lib/cloudinary.ts` exports `CLOUDINARY_SIZES`
(`card`, `detail`, `hero`) so every card/hero across the site requests the
same handful of transformations instead of one-off sizes — Cloudinary
caches each unique transformation after its first request. `next.config.ts`
also sets a 30-day `minimumCacheTTL` on `next/image`, since these are
static placeholder photos that only change on redeploy.

**One-time Cloudinary setup** (free tier, no card required):
1. Sign up at [cloudinary.com](https://cloudinary.com) and note your
   **Cloud name**, shown at the top of the Console dashboard.
2. Console → **Settings → Security → Restricted media types** — clear
   (uncheck) **Fetched URL**. New accounts have remote fetch disabled by
   default; it won't work until this is unchecked. Optionally set
   **Allowed fetch domains** to `images.unsplash.com` to limit what your
   account will proxy.
3. Put the cloud name in `.env.local` as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   (see `.env.example`) and restart the dev server.

Swap in real product photography later the same way — upload to
Cloudinary's media library (or keep using `fetch` against any hosted
URL) and update the `imageUrl`/`heroImageUrl` values in
`lib/content/data.ts`.

## Navigation

Sticky top nav, navy background is optional (start with white/blur-on-scroll
if that reads cleaner against a white homepage) — but the mobile drawer
(shadcn `Sheet`) always uses the navy brand color.

## Footer

Dark (navy `#0C355B`) background, white/gray text, professional — company
info, sitemap links, social links, certifications.

## Animation

Subtle but pervasive: fade/slide-in on scroll (Framer Motion, `whileInView`),
staggered card reveals on every listing grid, hover state transitions
(150–500ms), a route-level fade/slide on navigation, and small lift/zoom
micro-interactions on cards, buttons, and nav links. Still no parallax, no
auto-playing carousels, no attention-grabbing looping animation, no
glassmorphism/neon — the brief is "premium and alive," not "flashy."

- `components/motion/FadeIn.tsx` — scroll-triggered fade + slide-up,
  animates once. Used with an index-based `delay` (`i * 0.05–0.06`) to
  stagger every card grid site-wide (homepage, Products/Services/
  Industries/Blog listings, category/industry detail pages,
  `ProductExplorer`'s filtered results).
- `app/template.tsx` — Next.js remounts `template.tsx` on every
  navigation (unlike `layout.tsx`), so wrapping `{children}` in a
  `motion.div` gives each route a brief fade + slide-in on entry.
- Card hover (`ProductCard`/`CategoryCard`/`PostCard`): `-translate-y-1`
  lift + shadow, plus the thumbnail image scales to `1.04` inside the
  card's `overflow-hidden` bounds — plain CSS transitions, not Framer
  Motion, since they're simple enough not to need JS.
- Button hover: `-translate-y-0.5` lift on the filled/outline/secondary
  variants (`components/ui/button.tsx`), pairing with the existing
  `active:translate-y-px` press-down feedback.
- Nav link hover: an animated underline (`scale-x` on a pseudo-bar),
  pure CSS, in `components/layout/Navbar.tsx`.

`app/layout.tsx` wraps the app in `<MotionConfig reducedMotion="user">`,
disabling all Framer Motion animation for users with
`prefers-reduced-motion` set — don't bypass this when adding new motion.
The plain-CSS transitions above (card lift, image zoom, nav underline,
button lift) aren't covered by `MotionConfig`, so `app/globals.css` has a
matching `@media (prefers-reduced-motion: reduce)` rule that collapses all
CSS transition/animation durations to near-zero — keep any new
transform-based CSS transition covered by that rule rather than adding an
un-gated one.

## Accessibility

WCAG AA minimum: 4.5:1 text contrast (3:1 for large text/UI components),
visible focus rings (`--ring` is navy in light mode, light blue in dark mode
— do not remove focus outlines), semantic landmarks (`<nav>`, `<main>`,
`<footer>`), skip-to-content link, all interactive elements reachable by
keyboard.
