import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CategoryCard } from "@/components/marketing/CategoryCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { services } from "@/lib/content";

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
        description="Beyond supplying filtration products, we support the full lifecycle of your filtration systems."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 0.06}>
                <CategoryCard
                  title={service.title}
                  description={service.summary}
                  icon={service.icon}
                  href={`/services/${service.slug}`}
                  imageUrl={service.imageUrl}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
