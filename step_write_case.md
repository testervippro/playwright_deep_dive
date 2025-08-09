### ✅ 1. How to create a **Page Class** (POM)

### ✅ 2. How to create a **Test Class** using that page

---

## 📄 1. Page Class — `LoginPage.ts`

📁 **Path:** `pages/LoginPage.ts`

```ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login");
  }

  async goto() {
    await this.page.goto("https://example.com/login");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(".error-message");
  }
}
```

> Replace `#username`, `#password`, `#login`, and `.error-message` with the real selectors from your page.

---

## 🧪 2. Test Class — `login.spec.ts`

📁 **Path:** `tests/login.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  test("valid login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("admin", "password123");

    // Example success check
    await expect(page).toHaveURL("https://example.com/dashboard");
  });

  test("invalid login shows error message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("wrongUser", "wrongPass");

    const error = await loginPage.getErrorMessage();
    expect(error).toContain("Invalid credentials");
  });
});
```

---

## 🛠 Run the test:

```bash
npx playwright test tests/login.spec.ts
```

---

can use extendtion to auto coppy to tests/login.spec.ts
if not use on window is tests\login.spec.ts
Copy Relative Path Posix
