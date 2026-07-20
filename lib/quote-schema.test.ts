import { describe, expect, it } from "vitest";
import { quoteFormSchema } from "@/lib/quote-schema";

const validSubmission = {
  name: "Jane Tester",
  company: "Test Manufacturing Sdn Bhd",
  email: "jane@example.com",
  phone: "",
  topic: "",
  message: "We need filtration for a new production line.",
  website: "",
  formRenderedAt: Date.now(),
};

describe("quoteFormSchema", () => {
  it("accepts a valid submission with an empty honeypot", () => {
    const result = quoteFormSchema.safeParse(validSubmission);
    expect(result.success).toBe(true);
  });

  it("rejects a name that's too short", () => {
    const result = quoteFormSchema.safeParse({ ...validSubmission, name: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = quoteFormSchema.safeParse({ ...validSubmission, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that's too short", () => {
    const result = quoteFormSchema.safeParse({ ...validSubmission, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("still validates when the honeypot is filled in (bot case) — QuoteForm, not the schema, decides what happens next", () => {
    const result = quoteFormSchema.safeParse({
      ...validSubmission,
      website: "http://spammer.example",
    });
    expect(result.success).toBe(true);
  });

  it("allows phone and topic to be omitted", () => {
    const result = quoteFormSchema.safeParse({
      name: validSubmission.name,
      company: validSubmission.company,
      email: validSubmission.email,
      message: validSubmission.message,
      website: validSubmission.website,
      formRenderedAt: validSubmission.formRenderedAt,
    });
    expect(result.success).toBe(true);
  });
});
