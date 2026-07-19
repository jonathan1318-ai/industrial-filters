"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { quoteFormSchema } from "@/lib/quote-schema";

type ProductOption = { title: string; slug: string };

type FieldErrors = Partial<
  Record<"name" | "company" | "email" | "phone" | "message", string>
>;

export function QuoteForm({
  productOptions = [],
}: {
  productOptions?: ProductOption[];
}) {
  const [renderedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      productInterest: String(formData.get("productInterest") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      formRenderedAt: renderedAt,
    };

    const parsed = quoteFormSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: flat.name?.[0],
        company: flat.company?.[0],
        email: flat.email?.[0],
        phone: flat.phone?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-secondary/30 bg-secondary/10 p-6">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-green-text" aria-hidden />
        <div>
          <p className="font-medium text-foreground">Request sent.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks for reaching out — our team will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" autoComplete="name" required />
          {fieldErrors.name && (
            <p className="text-sm text-destructive">{fieldErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" autoComplete="organization" required />
          {fieldErrors.company && (
            <p className="text-sm text-destructive">{fieldErrors.company}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      {productOptions.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="productInterest">Product interest (optional)</Label>
          <Select name="productInterest">
            <SelectTrigger id="productInterest" className="w-full">
              <SelectValue placeholder="Select a product category" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map((option) => (
                <SelectItem key={option.slug} value={option.title}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" name="message" rows={5} required />
        {fieldErrors.message && (
          <p className="text-sm text-destructive">{fieldErrors.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from sighted users and screen readers, left
          visible to simple bots that don't respect display:none. */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" && (
          <Loader2 className="animate-spin" data-icon="inline-start" />
        )}
        {status === "submitting" ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}
