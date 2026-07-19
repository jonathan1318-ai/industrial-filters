import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { productCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Request a quote for industrial filtration products from Firuta Tech Services.",
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request Quote"
        title="Request a filtration quote"
        description="Tell us about your application and we'll recommend the right filtration solution."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <QuoteForm
            productOptions={productCategories.map(({ title, slug }) => ({
              title,
              slug,
            }))}
          />
        </Container>
      </section>
    </>
  );
}
