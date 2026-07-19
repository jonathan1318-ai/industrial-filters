import { Container } from "@/components/layout/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-primary">
      <Container className="py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
