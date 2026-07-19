import { NextResponse } from "next/server";
import { isEmailConfigured, sendQuoteEmail } from "@/lib/email";
import {
  MIN_SUBMIT_TIME_MS,
  quoteFormSchema,
} from "@/lib/quote-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { website, formRenderedAt, ...values } = parsed.data;

  // Honeypot filled in => bot. Submitted faster than a human could type =>
  // bot. Fail both silently as "success" so the bot doesn't learn anything.
  const tooFast = Date.now() - formRenderedAt < MIN_SUBMIT_TIME_MS;
  if (website || tooFast) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    console.error(
      "Quote form submitted but email is not configured — set RESEND_API_KEY, QUOTE_NOTIFICATION_EMAIL, and QUOTE_FROM_EMAIL (see .env.example)."
    );
    return NextResponse.json(
      {
        error:
          "The quote form isn't fully set up yet. Please contact us directly in the meantime.",
      },
      { status: 500 }
    );
  }

  try {
    await sendQuoteEmail(values);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send quote email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 502 }
    );
  }
}
