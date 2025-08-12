import { test, expect } from "@playwright/test";

test.describe("Console Message Tests", () => {
  test("should log console messages", async ({ page }) => {
    // Listen for console messages on the page
    page.on("console", (msg) => {
      console.log(`Console ${msg.type()}: ${msg.text()}`);
    });

    // Navigate to a page that generates console messages
    await page.goto("https://example.com");

    // Trigger some console messages in the page context for demonstration
    await page.evaluate(() => {
      console.log("Hello from the page!");
      console.warn("This is a warning");
      console.error("This is an error");
    });

    // You can add assertions here if needed
  });
});
