import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Separator } from "@/components/ui/separator";
import { mainNav } from "@/lib/nav";

const industries = [
  "Manufacturing",
  "Semiconductor",
  "Food & Beverage",
  "Chemical",
  "HVAC",
  "Water Treatment",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
              Industrial filtration systems for manufacturing and industrial
              facilities throughout Malaysia.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
              Sitemap
            </h2>
            <ul className="mt-4 space-y-2">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
              Industries Served
            </h2>
            <ul className="mt-4 space-y-2">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="text-sm text-primary-foreground/80"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/60">
              Contact
            </h2>
            {/* Placeholder contact details — not rendered as links until
                real values replace PROJECT.md's [PLACEHOLDER]s, so we never
                ship a dead tel:/mailto: link. */}
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>[ADDRESS, MALAYSIA]</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>[PHONE]</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>[EMAIL]</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/15" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-foreground/60 sm:flex-row">
          <p>&copy; {year} Firuta Tech Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
