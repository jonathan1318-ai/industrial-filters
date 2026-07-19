import type { LucideIcon } from "lucide-react";

// Shapes mirror docs/DATA.md's Sanity schema so swapping the data source
// later (lib/content/data.ts -> a Sanity client) doesn't change component
// code — components consume these types, not where the data comes from.

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
};

export type ProductCategory = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  title: string;
  slug: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  industrySlugs: string[];
  seo?: Seo;
};

export type Service = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  icon: LucideIcon;
  seo?: Seo;
};

export type Industry = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  icon: LucideIcon;
  seo?: Seo;
};

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  publishedAt: string;
  seo?: Seo;
};
