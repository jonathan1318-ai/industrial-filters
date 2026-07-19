import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Firuta Tech Services.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-muted-foreground">
            This page is a placeholder. Privacy policy content is pending
            legal review and must not be treated as final until real policy
            text is supplied — see docs/PROJECT.md.
          </p>
        </Container>
      </section>
    </>
  );
}
