"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Next.js remounts template.tsx on every navigation (unlike layout.tsx),
 * so this gives each route a subtle fade + slide-in on entry. Respects
 * prefers-reduced-motion via the app-wide MotionConfig in app/layout.tsx.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
