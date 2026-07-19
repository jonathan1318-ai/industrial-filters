import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="ring-border transition-shadow hover:shadow-md">
      <CardContent>
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col gap-2 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <time
            dateTime={post.publishedAt}
            className="text-xs font-medium text-muted-foreground"
          >
            {date}
          </time>
          <CardTitle className="text-base group-hover:text-primary">
            {post.title}
          </CardTitle>
          <CardDescription>{post.excerpt}</CardDescription>
        </Link>
      </CardContent>
    </Card>
  );
}
