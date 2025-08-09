import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("User navigates and verifies Playwright site content", async ({
  page,
}) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.expectTitleToContainPlaywright();
  await homePage.clickGetStarted();
  await homePage.expectInstallationHeadingVisible();
});
