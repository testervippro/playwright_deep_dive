// demo.test.ts
import { test, expect } from "@playwright/test";

test("Interact with embedded iFrame using frameLocator", async ({ page }) => {
  // Navigate to the page
  await page.goto("https://www.w3schools.com/html/html_iframe.asp", {
    waitUntil: "domcontentloaded", // add to avoid flaky tests
  });

  // Use frameLocator to target the iframe by its title attribute
  const frame = page.frameLocator('iframe[title="W3Schools HTML Tutorial"]');

  // Locate the link inside the iframe by role and accessible name
  const cssTutorialLink = frame
    .getByRole("link", { name: "CSS Tutorial" })
    .first();

  // Wait for the link to be visible
  await cssTutorialLink.waitFor({ state: "visible", timeout: 10000 });

  // Click the link
  await cssTutorialLink.click();

  // To get the iframe's page title, get the actual Frame object first:
  const iframeElementHandle = await page.$(
    'iframe[title="W3Schools HTML Tutorial"]'
  );
  if (!iframeElementHandle) {
    throw new Error("iframe not found");
  }

  const iframe = await iframeElementHandle.contentFrame();
  if (!iframe) {
    throw new Error("Could not get contentFrame");
  }

  // Get the iframe's title and print it
  const iframeTitle = await iframe.title();
  console.log("Iframe page title:", iframeTitle);

  // You can also add an assertion if needed
  expect(iframeTitle).toContain("CSS Tutorial");
});
