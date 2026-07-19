import { Resend } from "resend";
import type { QuoteFormValues } from "@/lib/quote-schema";

// Requires RESEND_API_KEY, QUOTE_NOTIFICATION_EMAIL, and QUOTE_FROM_EMAIL —
// see .env.example. Unset in every environment until Resend is configured,
// so callers must check isEmailConfigured() before calling sendQuoteEmail().
export function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.QUOTE_NOTIFICATION_EMAIL &&
      process.env.QUOTE_FROM_EMAIL
  );
}

export async function sendQuoteEmail(
  values: Omit<QuoteFormValues, "website" | "formRenderedAt">
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.QUOTE_FROM_EMAIL!,
    to: process.env.QUOTE_NOTIFICATION_EMAIL!,
    replyTo: values.email,
    subject: `New quote request from ${values.company}`,
    text: [
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Product interest: ${values.productInterest || "—"}`,
      "",
      "Message:",
      values.message,
    ].join("\n"),
  });
}
