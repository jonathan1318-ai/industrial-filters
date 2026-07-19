import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}) {
  return (
    <Card className="ring-border transition-shadow hover:shadow-md">
      <CardContent>
        <Link
          href={href}
          className="group flex flex-col gap-3 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden />
          </span>
          <CardTitle className="text-base group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </Link>
      </CardContent>
    </Card>
  );
}
