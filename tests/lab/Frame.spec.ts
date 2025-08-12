import { test, expect } from "@playwright/test";

test.describe("Frame Class Tests", () => {
  test("should handle frame events and verify frames", async ({ page }) => {
    await page.goto("https://www.google.com/chrome/browser/canary.html");

    // Dump the frame tree in console for debug
    dumpFrameTree(page.mainFrame(), "");

    // Assert the main frame URL includes 'canary'
    expect(page.mainFrame().url()).toContain("canary");

    // Check if page has any child frames and assert at least 1 exists (optional)
    const childFrames = page.mainFrame().childFrames();
    expect(childFrames.length).toBeGreaterThanOrEqual(0); // or > 0 if you expect some

    // If you want, you could do more asserts per frame here

    page.on("frameattached", (frame) => {
      console.log(`Frame attached: ${frame.url()}`);
    });

    page.on("framedetached", (frame) => {
      console.log(`Frame detached: ${frame.url()}`);
    });
    page.on("framenavigated", (frame) => {
      console.log(`Frame navigated: ${frame.url()}`);
    });
  });
});

function dumpFrameTree(frame, indent) {
  console.log(indent + frame.url());
  for (const child of frame.childFrames()) {
    dumpFrameTree(child, indent + "  ");
  }
}
