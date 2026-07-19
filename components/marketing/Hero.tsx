"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PlaceholderVisual } from "@/components/marketing/PlaceholderVisual";

export function Hero() {
  return (
    <div className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green-text">
            Industrial Filtration Solutions
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Industrial Filtration Solutions You Can Trust
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Helping manufacturers improve reliability through high-quality
            industrial filtration.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/request-quote">
                Request Quote
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <PlaceholderVisual className="aspect-4/3 w-full" />
        </motion.div>
      </Container>
    </div>
  );
}
