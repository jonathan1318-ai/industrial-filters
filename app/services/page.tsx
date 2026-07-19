import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Filtration system services from Firuta Tech Services: selection, installation support, and maintenance for industrial filtration equipment.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Filtration services"
        description="Full service details are being finalized. Get in touch and our team can advise on your filtration requirements today."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            This page is in progress. Contact us for service inquiries in
            the meantime.
          </p>
        </Container>
      </section>
    </>
  );
}
