import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/marketing/Hero";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { CategoryCard } from "@/components/marketing/CategoryCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { productCategories, industries } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 sm:py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Products"
              title="Filtration built for demanding environments"
              description="From hydraulic systems to cleanroom air handling, our filtration ranges are engineered for reliability."
            />
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((category, i) => (
              <FadeIn key={category.slug} delay={i * 0.06}>
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  href={`/products/${category.slug}`}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/40 py-16 sm:py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Industries"
              title="Trusted across Malaysia's industrial sector"
              align="center"
            />
          </FadeIn>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
            {industries.map(({ title, icon: Icon }, i) => (
              <FadeIn key={title} delay={i * 0.05}>
                <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background p-6 text-center">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-secondary/15 text-brand-green-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {title}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green-text">
              About Firuta
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Malaysia&apos;s trusted industrial filtration partner
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Firuta Tech Services supplies industrial filtration systems for
              manufacturing and industrial facilities throughout Malaysia.
              Our mission is to deliver reliable filtration solutions that
              keep critical processes running.
            </p>
            <Button variant="link" className="mt-4 px-0" asChild>
              <Link href="/about">
                Learn more about Firuta
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-lg bg-primary p-10 text-center">
              <h3 className="text-2xl font-bold text-white">
                Need a filtration quote?
              </h3>
              <p className="mt-2 text-primary-foreground/80">
                Tell us about your application and we&apos;ll recommend the
                right filtration solution.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                asChild
              >
                <Link href="/request-quote">Request Quote</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
