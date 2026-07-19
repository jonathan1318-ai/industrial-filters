import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductCard } from "@/components/marketing/ProductCard";
import {
  getProductCategory,
  getProductsByCategory,
  productCategories,
} from "@/lib/content";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getProductCategory(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={category.title}
        description={category.description}
      />
      <section className="py-16 sm:py-24">
        <Container>
          {categoryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Products in this category are being added. Contact us for
              current availability.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
