import { test, expect } from "./fixtures";

test("product search filters the grid", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("heading", { name: "H13 HEPA Filter Panel" })).toBeVisible();

  await page.getByLabel("Search products").fill("HEPA");
  await expect(page.getByRole("heading", { name: "H13 HEPA Filter Panel" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "5 Micron Pleated Cartridge Filter" })).toBeHidden();
});

test("category filter narrows the grid and a product detail page renders specs", async ({
  page,
}) => {
  await page.goto("/products");
  await page.getByRole("button", { name: "Hydraulic Filters" }).click();
  await expect(page.getByRole("heading", { name: "High-Pressure Hydraulic Inline Filter" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "H13 HEPA Filter Panel" })).toBeHidden();

  await page.getByRole("link", { name: /High-Pressure Hydraulic Inline Filter/ }).click();
  await expect(page.getByText("Specifications")).toBeVisible();
  await expect(page.getByText("Micron Rating")).toBeVisible();
  await expect(
    page.locator("main").getByRole("link", { name: "Request Quote" })
  ).toBeVisible();
});

test("a product category page 404s cleanly for an unknown slug", async ({ page }) => {
  const response = await page.goto("/products/not-a-real-category");
  expect(response?.status()).toBe(404);
});
