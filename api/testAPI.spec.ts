import { test, expect, APIRequestContext } from "@playwright/test";

test.use({ headless: false } );
test.describe("Login + Mix UI and API", () => {


  test("login via UI, then create issue", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin");
    await page.click("button[type=submit]");

    await page.fill('input[name="title"]', "UI logged-in issue");
    await page.click("button[type=submit]");

    await expect(page.locator("#issue-list")).toContainText("UI logged-in issue");

    await page.waitForTimeout(20000);
  });

  test.only("login via API, reuse cookies in UI", async ({ browser, playwright }) => {
    // Login via API
    const request = await playwright.request.newContext({ baseURL: "http://localhost:3000" });
    const loginRes = await request.post("/api/login", {
      data: { username: "admin", password: "admin" },
    });
    expect(loginRes.ok()).toBeTruthy();

    // Save API session state
    const state = await request.storageState();

    // Reuse in BrowserContext
    const context = await browser.newContext({ storageState: state });
    const page = await context.newPage();

    // Already logged in
    await page.goto("http://localhost:3000");
    await page.fill('input[name="title"]', "API login reused in UI");
    await page.click("button[type=submit]");
    await expect(page.locator("#issue-list")).toContainText("API login reused in UI");
     await page.waitForTimeout(20000);
  });

  test("create via UI, verify via API", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin");
    await page.click("button[type=submit]");

    await page.fill('input[name="title"]', "Check via API");
    await page.click("button[type=submit]");

    const res = await page.request.get("http://localhost:3000/api/issues");
    const data = await res.json();
    expect(data.map((i: any) => i.title)).toContain("Check via API");
  });
});
