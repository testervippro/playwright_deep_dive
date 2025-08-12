import { test, expect } from "@playwright/test";
test.describe("Dialog Class Tests", () => {
    
  test("should handle dialog events", async ({ page }) => {
    // Listen for dialog events
    page.on("dialog", async (dialog) => {
      console.log(`Dialog type: ${dialog.type()}`);
      console.log(`Dialog message: ${dialog.message()}`);
      // Accept the dialog
      await dialog.accept();
    });

    // Navigate to a page that triggers a dialog
    await page.goto("https://example.com"); // Replace with a URL that triggers a dialog
    // Trigger a dialog in the page context for demonstration
    await page.evaluate(() => {
      alert("This is a test alert dialog");
      confirm("This is a test confirm dialog");
      prompt("This is a test prompt dialog", "default value");
    });
  });
});
