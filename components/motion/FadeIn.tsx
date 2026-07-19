"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Subtle fade + slide-up, per docs/DESIGN.md ("subtle only" — no parallax,
 * no looping animation). Animates once, the first time it scrolls into
 * view. Respects prefers-reduced-motion via the app-wide MotionConfig in
 * app/layout.tsx.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
