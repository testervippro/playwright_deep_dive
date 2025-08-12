import { test, expect } from "@playwright/test";

test.use({
  ignoreHTTPSErrors: true, // Accept self-signed SSL certificates
});

test.describe("SSL Tests", () => {
  test("should handle SSL errors", async ({ page }) => {
    // Go to the self-signed SSL site
    await page.goto("https://self-signed.badssl.com/", {
      waitUntil: "domcontentloaded",
    });

    // Print the title
    console.log("The page title is:", await page.title());

    // Optional assertion
    await expect(page).toHaveTitle(/self-signed/);
  });
});
