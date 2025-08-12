import { test as base, expect, chromium } from "@playwright/test";

/*  Past to powerShell to run mitmproxy
@'
from mitmproxy import http

def request(flow: http.HTTPFlow):
    print(f"[MITMPROXY] Request: {flow.request.method} {flow.request.url}")

def response(flow: http.HTTPFlow):
    print(f"[MITMPROXY] Response: {flow.response.status_code} {flow.request.url}")
'@ | Out-File -Encoding utf8 log_requests.py

mitmproxy --listen-port 8080 -s log_requests.py

*/
// Extend the base test to launch Chromium with mitmproxy
const test = base.extend({
  context: async ({}, use) => {
    const browser = await chromium.launch({
      headless: false,
      proxy: {
        server: "http://127.0.0.1:8080", // mitmproxy
      },
    });

    const context = await browser.newContext({
      ignoreHTTPSErrors: true, // mitmproxy uses self-signed cert
    });

    await use(context);
    await browser.close();
  },
});

test("Use mitmproxy in Playwright Test", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://playwright.dev/docs/api/class-testoptions");
  console.log("Page title:", await page.title());
});
