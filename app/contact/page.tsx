import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Firuta Tech Services for industrial filtration inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Have a filtration question or need a quote? Reach out and our team will respond promptly."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          {/* Placeholder contact details — see docs/PROJECT.md. Not rendered
              as tel:/mailto: links until real values are provided. */}
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>[ADDRESS, MALAYSIA]</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>[PHONE]</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>[EMAIL]</span>
            </li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            A contact form, WhatsApp link, and map are coming once contact
            details and a form backend are configured (see docs/ROADMAP.md
            Phase 3).
          </p>
        </Container>
      </section>
    </>
  );
}
