import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CategoryCard } from "@/components/marketing/CategoryCard";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Firuta Tech Services supports manufacturing, semiconductor, food & beverage, chemical, HVAC, and water treatment industries across Malaysia.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industries we serve"
        description="Filtration solutions tailored to the demands of each sector we work with."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <CategoryCard
                key={industry.slug}
                title={industry.title}
                description={industry.summary}
                icon={industry.icon}
                href={`/industries/${industry.slug}`}
                imageUrl={industry.imageUrl}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
