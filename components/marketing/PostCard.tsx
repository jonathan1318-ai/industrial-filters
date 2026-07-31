import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CloudinaryImage } from "@/components/marketing/CloudinaryImage";
import { CLOUDINARY_SIZES } from "@/lib/cloudinary";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      size="sm"
      className="overflow-hidden py-0 ring-border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CloudinaryImage
          src={post.imageUrl}
          alt={`${post.title} — cover image`}
          className="aspect-[4/3] w-full rounded-none"
          width={CLOUDINARY_SIZES.card.width}
          height={CLOUDINARY_SIZES.card.height}
        />
        <CardContent className="flex flex-1 flex-col gap-2 py-4">
          <time
            dateTime={post.publishedAt}
            className="text-xs font-medium text-muted-foreground"
          >
            {date}
          </time>
          <CardTitle asChild className="text-base group-hover:text-primary">
            <h3>{post.title}</h3>
          </CardTitle>
          <CardDescription>{post.excerpt}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
