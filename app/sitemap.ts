import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { industries, posts, productCategories, products, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/industries",
    "/about",
    "/contact",
    "/request-quote",
    "/blog",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = productCategories.map((category) => ({
    url: `${siteUrl}/products/${category.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/products/${product.categorySlug}/${product.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...postRoutes,
  ];
}
