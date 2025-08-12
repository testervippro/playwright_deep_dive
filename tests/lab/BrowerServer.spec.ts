import { chromium, test } from "playwright/test";
import { exec } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";
import { TAG } from "./EnumTag";

test("Browser Class Tests wsEndPoint", { tag: TAG.IGNORE }, async () => {
  const cmdLaunchChromeInDebugModeWindow = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\\temp\\chrome-debug"`;

  exec(cmdLaunchChromeInDebugModeWindow, (error, stdout) => {
    if (error) {
      console.log("Execute error: " + error);
      return;
    }
    //console.log(stdout);
  });

  const browerServer = await chromium.launchServer({
    headless: false,
    args: ["--no-sandbox"],
  });

  console.log(`Browser server launched at: ${browerServer.wsEndpoint()}`);

  const browser = await chromium.connect({
    wsEndpoint: browerServer.wsEndpoint(),
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.com");
  const title = await page.title();
  console.log(`Page title: ${title}`);
  await page.screenshot({ path: "screenshot.png" });
});

test(
  "Browser Class Tests with CDP session",
  { tag: TAG.IGNORE },
  async ({ playwright }) => {
    // @ts-ignore
    // Make sure you launch Chromium with remote debugging flag, e.g.:
    // on window "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\temp\chrome-debug"

    const browser = await playwright.chromium.connectOverCDP(
      "http://localhost:9222"
    );
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];
    await page.goto("https://example.com");
  }
);
