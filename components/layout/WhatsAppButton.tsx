"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contact, whatsappHref } from "@/lib/contact";

export function WhatsAppButton() {
  // Guard against a placeholder value (e.g. "[WHATSAPP NUMBER]") ever
  // shipping a dead floating button if lib/contact.ts reverts to one.
  if (!contact.whatsapp || contact.whatsapp.startsWith("[")) return null;

  return (
    <motion.a
      href={whatsappHref(contact.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
      className="fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden />
    </motion.a>
  );
}
