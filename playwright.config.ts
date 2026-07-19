import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

// This sandboxed dev container ships a pre-fetched Chromium build that
// doesn't always match the exact headless-shell revision @playwright/test
// expects by default, and has no network access to fetch the right one.
// If it's present, use it directly; otherwise fall back to Playwright's
// normal resolution (real CI runs `playwright install` and doesn't need
// this at all).
const localChromium = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const executablePath = existsSync(localChromium) ? localChromium : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          executablePath,
          args: ["--no-sandbox"],
        },
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
