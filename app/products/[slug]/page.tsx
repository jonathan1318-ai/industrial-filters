import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/content";

type Params = { slug: string };

function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function generateStaticParams(): Params[] {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
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
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageHero eyebrow="Products" title={category.title} description={category.description} />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            Full specifications and the product catalog for this category
            are coming soon. In the meantime, tell us about your application
            and we&apos;ll recommend the right {category.title.toLowerCase()}
            {" "}for it.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/request-quote">Request Quote</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
