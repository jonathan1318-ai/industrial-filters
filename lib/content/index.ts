export * from "@/lib/content/types";
export {
  industries,
  posts,
  productCategories,
  products,
  services,
} from "@/lib/content/data";

import {
  industries,
  posts,
  productCategories,
  products,
  services,
} from "@/lib/content/data";

export function getProductCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProduct(categorySlug: string, slug: string) {
  return products.find(
    (product) =>
      product.categorySlug === categorySlug && product.slug === slug
  );
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getIndustryProducts(industrySlug: string) {
  return products.filter((product) =>
    product.industrySlugs.includes(industrySlug)
  );
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
