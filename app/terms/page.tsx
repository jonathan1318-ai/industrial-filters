import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Firuta Tech Services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            This page is a placeholder. Terms of service content is pending
            legal review and must not be treated as final until real terms
            are supplied — see docs/PROJECT.md.
          </p>
        </Container>
      </section>
    </>
  );
}
