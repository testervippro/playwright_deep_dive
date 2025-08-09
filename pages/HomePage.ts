import { expect, type Page } from "@playwright/test";
import { Steps } from "../utils/decorator";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @Steps("Go to homepage")
  async goto() {
    await this.page.goto("https://playwright.dev/");
  }

  @Steps("Check title contains 'Playwright'")
  async expectTitleToContainPlaywright() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  @Steps("Click on 'Get started' link")
  async clickGetStarted() {
    await this.page.getByRole("link", { name: "Get started" }).click();
  }

  @Steps("Verify 'Installation' heading is visible")
  async expectInstallationHeadingVisible() {
    await expect(
      this.page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  }
}
