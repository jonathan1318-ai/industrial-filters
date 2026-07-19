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
office workers. Use placeholder imagery (clearly sourced from a free stock
provider, not fabricated "customer photos") until real photography is
supplied — see `CLAUDE.md`.

## Navigation

Sticky top nav, navy background is optional (start with white/blur-on-scroll
if that reads cleaner against a white homepage) — but the mobile drawer
(shadcn `Sheet`) always uses the navy brand color.

## Footer

Dark (navy `#0C355B`) background, white/gray text, professional — company
info, sitemap links, social links, certifications.

## Animation

Subtle only: fade/slide-in on scroll (Framer Motion, `whileInView`), hover
state transitions (150–200ms). No parallax, no auto-playing carousels, no
attention-grabbing looping animation.

Implemented via `components/motion/FadeIn.tsx` (scroll-triggered, animates
once) and direct `motion.div` mount animations on `Hero` and `PageHero`.
`app/layout.tsx` wraps the app in `<MotionConfig reducedMotion="user">`, so
all of the above is automatically disabled for users with
`prefers-reduced-motion` set — don't bypass this when adding new motion.

## Accessibility

WCAG AA minimum: 4.5:1 text contrast (3:1 for large text/UI components),
visible focus rings (`--ring` is navy in light mode, light blue in dark mode
— do not remove focus outlines), semantic landmarks (`<nav>`, `<main>`,
`<footer>`), skip-to-content link, all interactive elements reachable by
keyboard.
