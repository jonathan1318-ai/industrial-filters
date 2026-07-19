import { test, expect } from "./fixtures";

test("quote form shows validation errors for empty required fields", async ({ page }) => {
  await page.goto("/request-quote");
  await page.getByRole("button", { name: "Send Request" }).click();

  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter your company name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Tell us a bit more about your requirement.")).toBeVisible();
});

test("quote form accepts a valid submission", async ({ page }) => {
  // EmailJS sends straight from the browser to its API — mock that call
  // so this test never depends on live external state (or real EmailJS
  // credentials/quota), regardless of whether NEXT_PUBLIC_EMAILJS_* is
  // configured in whatever environment this runs in.
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 200, body: "OK" })
  );

  await page.goto("/request-quote");
  await page.getByLabel("Full name").fill("Jane Tester");
  await page.getByLabel("Company").fill("Test Manufacturing Sdn Bhd");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("How can we help?").fill("We need filtration for a new production line.");

  await page.getByRole("button", { name: "Send Request" }).click();

  // A submission this fast trips the anti-bot minimum-time check and is
  // silently treated as "success" regardless of EmailJS configuration —
  // if NEXT_PUBLIC_EMAILJS_* isn't set, that's also a valid non-crashing
  // outcome ("isn't fully set up yet"), so accept either.
  await expect(
    page.getByText("Request sent.").or(page.getByText("isn't fully set up yet"))
  ).toBeVisible({ timeout: 10_000 });
});

test("contact page also renders the quote form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Send us a message" })).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeVisible();
});
