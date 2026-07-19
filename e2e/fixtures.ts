import { test as base, expect } from "@playwright/test";

// The app's MotionConfig(reducedMotion="user") makes Framer Motion honor
// this at runtime, same as a real user with the OS-level setting on. It
// also avoids flaky contrast/visibility assertions racing an in-flight
// fade/slide transition — every spec should import `test` from here
// instead of "@playwright/test" directly.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(page);
  },
});

export { expect };
