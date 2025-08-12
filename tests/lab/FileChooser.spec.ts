import { test, expect } from "@playwright/test";

test.describe("Test FileChooser Class", () => {
  test("should handle file chooser events", async ({ page }) => {
    // Listen for file chooser events
    page.on("filechooser", async (fileChooser) => {
      console.log(`File chooser opened: ${fileChooser}`);
      // Accept the file chooser with a file path

      await fileChooser.setFiles("test.txt"); // Replace with the actual file path
      console.log("File chosen successfully");
    });
    // Navigate to a page that triggers a file chooser
    await page.goto("https://example.com"); // Replace with a URL that triggers a file chooser

    // Trigger a file chooser in the page context for demonstration
    await page.evaluate(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.style.display = "none"; // Hide the input

      document.body.appendChild(input);
      input.click(); // Simulate a click to open the file chooser
      // Clean up
      document.body.removeChild(input);
    });

    // Wait for a short time to allow the file chooser to open
    await page.waitForTimeout(1000); // Adjust the timeout as needed
  });
});
