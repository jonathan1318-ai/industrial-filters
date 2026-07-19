import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} description={service.summary} />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">{service.body}</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/request-quote">
              Request Quote
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
