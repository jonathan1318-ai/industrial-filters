import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { getPost, posts } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <PageHero eyebrow="Blog" title={post.title} />
      <article className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <p className="text-sm text-muted-foreground">
            {post.author} &middot;{" "}
            <time dateTime={post.publishedAt}>{date}</time>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            {post.body}
          </p>
        </Container>
      </article>
    </>
  );
}
