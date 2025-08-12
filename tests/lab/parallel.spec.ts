import { test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

// Running 2 tests using 1 worker
test("runs in parallel 1", async ({ page }, testInfo) => {
  console.log(`workerIndex: ${testInfo.workerIndex}`);
  console.log(`parallelIndex: ${testInfo.parallelIndex}`);
  console.log("Running test 1");
});
test("runs in parallel 2", async ({ page }) => {
  console.log("Running test 2");
});

test("runs in parallel 3", async ({ page }) => {
  console.log("Running test 3");
});

test("runs in parallel 4", async ({ page }) => {
  console.log("Running test 4");
});

test("runs in parallel 5", async ({ page }) => {
  console.log("Running test 5");
});
// limit workers to 2 or 1 to dispatch tests in parallel
// npx playwright test tests/classes/parallel.spec.ts --workers 2
