import { chromium, test } from "playwright/test";

test("Browser Class Tests", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.com");
  const title = await page.title();
  console.log(`Page title: ${title}`);
  await page.screenshot({ path: "screenshot.png" });
});
