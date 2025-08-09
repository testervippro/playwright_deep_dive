import { test, expect } from "@playwright/test";

test("handle multiple tabs", async ({ browser }) => {
  const context = await browser.newContext();

  // Open the first tab (page)
  const page1 = await context.newPage();
  await page1.goto("https://example.com");
  await expect(page1).toHaveTitle(/Example Domain/);

  // Open a second tab
  const page2 = await context.newPage();
  await page2.goto("https://playwright.dev");
  await expect(page2).toHaveTitle(/Playwright/);

  // Switch back to first tab and do something
  await page1.bringToFront();
  console.log(await page1.title());

  // Now do something on page2
  await page2.bringToFront();
  console.log(await page2.title());

  // Close tabs
  await page1.close();
  await page2.close();
});
