import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { PostCard } from "@/components/marketing/PostCard";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Filtration insights and updates from Firuta Tech Services.",
};

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  return (
    <>
      <PageHero eyebrow="Blog" title="Filtration insights" />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
