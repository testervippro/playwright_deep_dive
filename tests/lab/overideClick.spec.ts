import { test, expect } from "./fixture"; // the overridden version

test("Override click log", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.click('a[href="/docs/intro"]'); // Will log automatically
});
