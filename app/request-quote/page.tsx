import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/button";

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
        description="Our quote form is being finalized."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            In the meantime, reach out via the{" "}
            <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
              Contact page
            </Link>{" "}
            and our team will follow up about your filtration requirements.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/contact">Go to Contact</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
