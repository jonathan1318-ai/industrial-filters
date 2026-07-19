# Content Data Model

CMS: **Sanity**. Products, Services, Industries, and Blog posts are editable
without a code deploy. Everything else (nav labels, static page copy) stays
in code/`CONTENT.md` — don't put one-off page copy in the CMS.

> Sanity project setup (dataset, API tokens, Studio route) happens in a
> later phase once schemas below are agreed and env vars are available —
> see `docs/ROADMAP.md` Phase 2. Until then, product/service/industry/blog
> pages read from `lib/content/data.ts` (typed per `lib/content/types.ts`,
> shaped identically to the schema below, with lookup helpers in
> `lib/content/index.ts`), so swapping in a Sanity client later only means
> changing `data.ts`'s data source — not the page/component code.
>
> Product specs in `data.ts` are illustrative (industry-standard values per
> category), not confirmed Firuta specs — replace with real catalog data
> before launch.

## `product`

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Pleated Filter Cartridge" |
| `slug` | slug | URL segment |
| `category` | reference → `productCategory` | Filter Cartridges, Bag Filters, Hydraulic Filters, HEPA Filters, Water Filters, Air Filters |
| `shortDescription` | text | Used in listing cards |
| `description` | portable text | Full product page body |
| `specs` | array of `{ label, value }` | e.g. Micron Rating, Max Temp, Material |
| `images` | array of image | Alt text required per image |
| `datasheetUrl` | file/url | Optional PDF |
| `industries` | array of reference → `industry` | Which industries this product serves |
| `seo` | object | `{ metaTitle, metaDescription, ogImage }` — falls back to generated defaults if empty |

## `productCategory`

`title`, `slug`, `description`, `icon` (Lucide icon name).

## `service`

`title`, `slug`, `summary`, `body` (portable text), `icon`, `seo`.

## `industry`

`title`, `slug`, `summary`, `body` (portable text), `heroImage`, `relatedProducts` (array of reference → `product`), `seo`.

## `post` (Blog)

`title`, `slug`, `excerpt`, `body` (portable text), `coverImage`, `author`,
`publishedAt`, `seo`.

## Shared `seo` object (reused across types)

`metaTitle`, `metaDescription`, `ogImage`, `noIndex` (boolean, default
false).
