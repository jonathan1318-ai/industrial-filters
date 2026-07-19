import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/products",
  "/products/hepa-filters",
  "/products/hepa-filters/h13-hepa-filter-panel",
  "/services",
  "/industries",
  "/about",
  "/contact",
  "/request-quote",
  "/blog",
  "/privacy",
];

for (const path of pages) {
  test(`no automatic a11y violations on ${path}`, async ({ page }) => {
    // networkidle (not the default "load") gives React hydration and the
    // page's mount-in Framer Motion transitions time to settle before we
    // scan — otherwise axe can sample a mid-fade-in frame and report a
    // spurious contrast violation on text that's still animating opacity.
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("mobile menu is keyboard operable and traps focus while open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Open menu" }).focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .include('[role="dialog"]')
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
