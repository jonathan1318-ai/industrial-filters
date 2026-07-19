import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";

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
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            {/* Placeholder contact details — see docs/PROJECT.md. Not
                rendered as tel:/mailto:/wa.me links until real values are
                provided. */}
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
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>[WHATSAPP NUMBER]</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>[EMAIL]</span>
              </li>
            </ul>

            <div
              aria-hidden
              className="mt-8 flex aspect-4/3 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 text-center"
            >
              <MapPin className="size-6 text-muted-foreground" />
              <p className="max-w-xs text-sm text-muted-foreground">
                A Google Maps embed will appear here once the business
                address is confirmed.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary">
              Send us a message
            </h2>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
