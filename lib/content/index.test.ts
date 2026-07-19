import { describe, expect, it } from "vitest";
import {
  getIndustry,
  getIndustryProducts,
  getPost,
  getProduct,
  getProductCategory,
  getProductsByCategory,
  getService,
  industries,
  posts,
  products,
  services,
} from "@/lib/content";

describe("product category lookups", () => {
  it("finds a known category by slug", () => {
    expect(getProductCategory("hepa-filters")?.title).toBe("HEPA Filters");
  });

  it("returns undefined for an unknown category slug", () => {
    expect(getProductCategory("not-a-real-category")).toBeUndefined();
  });

  it("every product belongs to a real category", () => {
    for (const product of products) {
      expect(getProductCategory(product.categorySlug)).toBeDefined();
    }
  });

  it("getProductsByCategory only returns products in that category", () => {
    const result = getProductsByCategory("hepa-filters");
    expect(result.length).toBeGreaterThan(0);
    for (const product of result) {
      expect(product.categorySlug).toBe("hepa-filters");
    }
  });
});

describe("product lookups", () => {
  it("finds a product by category + slug", () => {
    const product = getProduct("hepa-filters", "h13-hepa-filter-panel");
    expect(product?.title).toBe("H13 HEPA Filter Panel");
  });

  it("returns undefined when the slug exists but under the wrong category", () => {
    expect(getProduct("water-filters", "h13-hepa-filter-panel")).toBeUndefined();
  });

  it("every product references at least one real industry", () => {
    for (const product of products) {
      expect(product.industrySlugs.length).toBeGreaterThan(0);
      for (const slug of product.industrySlugs) {
        expect(getIndustry(slug)).toBeDefined();
      }
    }
  });
});

describe("industry lookups", () => {
  it("finds an industry by slug", () => {
    expect(getIndustry("semiconductor")?.title).toBe("Semiconductor");
  });

  it("getIndustryProducts only returns products referencing that industry", () => {
    const result = getIndustryProducts("semiconductor");
    expect(result.length).toBeGreaterThan(0);
    for (const product of result) {
      expect(product.industrySlugs).toContain("semiconductor");
    }
  });

  it("matches the industries list shown in FEATURES.md/CONTENT.md", () => {
    expect(industries.map((i) => i.title)).toEqual([
      "Manufacturing",
      "Semiconductor",
      "Food & Beverage",
      "Chemical",
      "HVAC",
      "Water Treatment",
    ]);
  });
});

describe("service and post lookups", () => {
  it("finds a service by slug", () => {
    expect(getService("installation-support")?.title).toBe("Installation Support");
  });

  it("finds a post by slug", () => {
    expect(getPost("understanding-hepa-filter-efficiency-ratings")?.title).toContain("HEPA");
  });

  it("every service and post has a unique slug", () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });
});
