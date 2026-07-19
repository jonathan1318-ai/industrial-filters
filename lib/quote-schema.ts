import { z } from "zod";

// Minimum time (ms) between the form rendering and being submitted.
// Bots that fill and submit instantly get rejected; real users take longer.
export const MIN_SUBMIT_TIME_MS = 2000;

export const quoteFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  company: z.string().trim().min(2, "Enter your company name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  productInterest: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your requirement.")
    .max(2000),
  // Honeypot: hidden from real users via CSS, not `display:none`, so
  // unsophisticated bots that skip hidden fields still fill it in.
  website: z.string().max(0).optional().or(z.literal("")),
  formRenderedAt: z.number(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
