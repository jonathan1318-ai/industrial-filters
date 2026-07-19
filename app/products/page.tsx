import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CategoryCard } from "@/components/marketing/CategoryCard";
import { productCategories } from "@/lib/content";

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                description={category.description}
                icon={category.icon}
                href={`/products/${category.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
