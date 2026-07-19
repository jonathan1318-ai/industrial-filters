import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Filtration insights and updates from Firuta Tech Services.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Filtration insights" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            Blog posts are coming soon.
          </p>
        </Container>
      </section>
    </>
  );
}
