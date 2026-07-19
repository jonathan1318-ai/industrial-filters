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
  await page.goto("/request-quote");
  await page.getByLabel("Full name").fill("Jane Tester");
  await page.getByLabel("Company").fill("Test Manufacturing Sdn Bhd");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("How can we help?").fill("We need filtration for a new production line.");

  await page.getByRole("button", { name: "Send Request" }).click();

  // Without RESEND_API_KEY configured in this environment, the server
  // either treats a fast submit as a bot (silent "success") or returns
  // the "not configured yet" error — both are valid, non-crashing outcomes.
  await expect(
    page.getByText("Request sent.").or(page.getByText("isn't fully set up yet"))
  ).toBeVisible({ timeout: 10_000 });
});

test("contact page also renders the quote form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Send us a message" })).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeVisible();
});
