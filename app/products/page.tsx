import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductExplorer } from "@/components/marketing/ProductExplorer";
import { productCategories, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Firuta Tech Services' industrial filtration product ranges: filter cartridges, bag filters, hydraulic filters, HEPA filters, water filters, and air filters.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Industrial filtration product ranges"
        description="Engineered filtration solutions for manufacturing, semiconductor, food & beverage, chemical, HVAC, and water treatment applications."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <ProductExplorer
            products={products}
            categories={productCategories.map(
              ({ title, slug, description, imageUrl }) => ({
                title,
                slug,
                description,
                imageUrl,
              })
            )}
          />
        </Container>
      </section>
    </>
  );
}
