import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  testMatch: "**.spec.ts",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? "blob" : "html",

  //globalSetup: require.resolve('./global-setup'),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    //baseURL: "http://localhost:3000/",
    //storageState: "state.json",
  },

  /* Configure projects for major browsers */
  projects: [
    // run by order declare in the array
    {
      name: "setup db",
      testMatch: /global\.setup\.ts/,
      teardown: "cleanup db",
    },
    {
      name: "cleanup db",
      testMatch: /global\.teardown\.ts/,
    },

    /* Test against branded browsers. */
    // https://dev.to/muhendiskedibey/how-to-full-screen-a-browser-in-playwright-1np1
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        screenshot: "only-on-failure",
        viewport: null,
        deviceScaleFactor: undefined,
        // headless = true on CI, false locally
        //// This always returns a boolean value
        //https://stackoverflow.com/questions/784929/what-does-the-double-exclamation-mark-operator-do-in-javascript
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
        headless: !!process.env.CI,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //     viewport: null,
    //     deviceScaleFactor: undefined,
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //     },
    //   },
    // }, // or "msedge-beta" or 'msedge-dev'

    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
