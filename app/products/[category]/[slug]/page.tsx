import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CloudinaryImage } from "@/components/marketing/CloudinaryImage";
import { CLOUDINARY_SIZES } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getIndustry,
  getProduct,
  getProductCategory,
  getProductsByCategory,
  productCategories,
} from "@/lib/content";

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  return productCategories.flatMap((category) =>
    getProductsByCategory(category.slug).map((product) => ({
      category: category.slug,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return {};

  return {
    title: product.seo?.metaTitle ?? product.title,
    description: product.seo?.metaDescription ?? product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: categorySlug, slug } = await params;
  const category = getProductCategory(categorySlug);
  const product = getProduct(categorySlug, slug);
  if (!category || !product) notFound();

  return (
    <>
      <PageHero eyebrow={category.title} title={product.title} />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <CloudinaryImage
            src={category.imageUrl}
            alt={`${category.title} — representative product photography`}
            className="aspect-square w-full"
            width={CLOUDINARY_SIZES.detail.width}
            height={CLOUDINARY_SIZES.detail.height}
          />

          <div>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Specifications
            </h2>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between gap-4 py-3 text-sm"
                >
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {product.industrySlugs.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Used in:
                </span>
                {product.industrySlugs.map((industrySlug) => {
                  const industry = getIndustry(industrySlug);
                  if (!industry) return null;
                  return (
                    <Badge variant="outline" key={industrySlug}>
                      {industry.title}
                    </Badge>
                  );
                })}
              </div>
            )}

            <Button size="lg" className="mt-8" asChild>
              <Link href="/request-quote">
                Request Quote
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
