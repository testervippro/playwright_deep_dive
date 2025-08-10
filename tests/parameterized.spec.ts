import { test } from "@playwright/test";

test.describe("Parameterized Tests", () => {
  test("Test with parameter", ({}, testInfo) => {
    const param = testInfo.title.replace("Test with parameter: ", "");
    console.log(`Running test with parameter: ${param}`);

    // Add your test logic here
  });
});

const parameters = ["foo", "bar", "baz"];

for (const param of parameters) {
  test(`Test with parameter: ${param}`, async ({ page }) => {
    console.log(`Running test with parameter: ${param}`);
    // Your test logic here
  });
}
