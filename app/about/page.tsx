import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Firuta Tech Services is a Malaysian engineering company specializing in industrial filtration systems for manufacturing and industrial facilities.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="About Firuta Tech Services" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl space-y-8">
          <p className="text-muted-foreground">
            Firuta Tech Services supplies industrial filtration systems for
            manufacturing and industrial facilities throughout Malaysia.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-primary">Mission</h2>
            <p className="mt-2 text-muted-foreground">
              Deliver reliable filtration solutions.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">Vision</h2>
            <p className="mt-2 text-muted-foreground">
              Become Malaysia&apos;s trusted industrial filtration partner.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
