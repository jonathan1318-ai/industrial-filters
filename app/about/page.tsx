import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CloudinaryImage } from "@/components/marketing/CloudinaryImage";
import { CLOUDINARY_SIZES } from "@/lib/cloudinary";
import { heroImageUrl } from "@/lib/content";

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
        <Container className="grid gap-12 lg:grid-cols-2">
          <CloudinaryImage
            src={heroImageUrl}
            alt="Interior of an industrial manufacturing facility"
            className="aspect-4/3 w-full"
            width={CLOUDINARY_SIZES.hero.width}
            height={CLOUDINARY_SIZES.hero.height}
          />

          <div className="space-y-8">
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
          </div>
        </Container>
      </section>
    </>
  );
}
