import { chromium, expect, type FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseURL!);
  await page.locator("#username").fill(""); // clear first
  await page.locator("#username").fill("user");
  // then fill
  await page.locator("#password").fill(""); // clear first
  await page.locator("#password").fill("password");

  await page.locator("#submit-btn").click();
  await page.context().storageState({ path: storageState as string });

  expect(await page.locator("h1").textContent()).toBe("Welcome, user");
  await browser.close();
}

export default globalSetup;
