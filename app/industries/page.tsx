import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {industries.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background p-6 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary/15 text-brand-green-text">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
