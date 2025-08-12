import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const runLocalHost = "node locator.js";

exec(runLocalHost);

test("Download test.txt from local server", async ({ page }) => {
  // Go to your local page with the download link
  await page.goto("http://localhost:4000");

  // Start waiting for the download before clicking (don't await yet)
  const downloadPromise = page.waitForEvent("download");

  const button = page.locator('[onclick="downloadTextFile()"]');

  // Scroll the element into view
  await button.scrollIntoViewIfNeeded();

  // Then click it
  await button.click();

  // Wait for the download event to be triggered
  const download = await downloadPromise;

  // Define where to save the downloaded file (in this example, downloads folder)
  const downloadPath = path.join(
    __dirname,
    "downloads",
    download.suggestedFilename()
  );

  // Ensure the downloads directory exists
  fs.mkdirSync(path.dirname(downloadPath), { recursive: true });

  // Save the downloaded file to disk
  await download.saveAs(downloadPath);

  console.log(`File downloaded and saved at: ${downloadPath}`);

  // Optional: Verify the file exists and is not empty
  const fileExists = fs.existsSync(downloadPath);
  expect(fileExists).toBe(true);

  const stats = fs.statSync(downloadPath);
  expect(stats.size).toBeGreaterThan(0);
});
