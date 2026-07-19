import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductCard } from "@/components/marketing/ProductCard";
import { Button } from "@/components/ui/button";
import {
  getIndustry,
  getIndustryProducts,
  getProductCategory,
  industries,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.seo?.metaTitle ?? industry.title,
    description: industry.seo?.metaDescription ?? industry.summary,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedProducts = getIndustryProducts(slug);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={industry.title}
        description={industry.summary}
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">{industry.body}</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/request-quote">
              Request Quote
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16 sm:py-24">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Relevant products
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  category={getProductCategory(product.categorySlug)}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
