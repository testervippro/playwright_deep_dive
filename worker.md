# 🛠 Playwright Worker-Scoped Fixture Demo

This example shows how **worker-scoped fixtures** in Playwright persist across multiple tests within the same worker.

We’ll:

- Create a `dbUserName` fixture with `scope: 'worker'`.
- Log setup/teardown so you can see when it runs.
- Run multiple tests across files to prove that setup happens **once per worker**, not per test.

---

## 📂 Project Structure

```
tests/
  ├── example1.spec.ts
  ├── example2.spec.ts
fixtures.ts
playwright.config.ts
```

---

## **fixtures.ts**

```ts
import { test as base } from "@playwright/test";

export const test = base.extend<{ dbUserName: string }>({
  dbUserName: [
    async ({}, use, testInfo) => {
      console.log(`🔹 [SETUP] Worker ${testInfo.workerIndex} creating user...`);
      const userName = `user-${testInfo.workerIndex}`;

      // Simulate DB creation delay
      await new Promise((res) => setTimeout(res, 200));
      console.log(
        `✅ [READY] Worker ${testInfo.workerIndex} created: ${userName}`
      );

      await use(userName);

      console.log(
        `🧹 [TEARDOWN] Worker ${testInfo.workerIndex} deleting ${userName}`
      );
      await new Promise((res) => setTimeout(res, 200));
    },
    { scope: "worker" },
  ],
});
```

---

## **tests/example1.spec.ts**

```ts
import { test } from "../fixtures";

test("test A1", async ({ dbUserName }) => {
  console.log(`🔸 Running test A1 with ${dbUserName}`);
});

test("test A2", async ({ dbUserName }) => {
  console.log(`🔸 Running test A2 with ${dbUserName}`);
});
```

---

## **tests/example2.spec.ts**

```ts
import { test } from "../fixtures";

test("test B1", async ({ dbUserName }) => {
  console.log(`🔸 Running test B1 with ${dbUserName}`);
});

test("test B2", async ({ dbUserName }) => {
  console.log(`🔸 Running test B2 with ${dbUserName}`);
});
```

---

## **playwright.config.ts**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  workers: 1, // Set >1 to see multiple workers in action
  reporter: "line",
  testDir: "./tests",
});
```

---

## ▶ Running with 1 Worker

```bash
npx playwright test tests/example1.spec.ts tests/example2.spec.ts --workers=1
```

### Expected Output

```plaintext
🔹 [SETUP] Worker 0 creating user...
✅ [READY] Worker 0 created: user-0
🔸 Running test A1 with user-0
🔸 Running test A2 with user-0
🔸 Running test B1 with user-0
🔸 Running test B2 with user-0
🧹 [TEARDOWN] Worker 0 deleting user-0
```

**Key Points:**

- **Setup** runs once before the first test in that worker.
- **Teardown** runs once after the last test in that worker.
- All tests in that worker **share the same fixture value**.

---

## ▶ Running with 2 Workers

```bash
npx playwright test tests/example1.spec.ts tests/example2.spec.ts --workers=2
```

### Expected Output

```plaintext
Running 4 tests using 2 workers
[chrome] › tests\example1.spec.ts:3:5 › test A1
🔹 [SETUP] Worker 0 creating user...
[chrome] › tests\example1.spec.ts:7:5 › test A2
🔹 [SETUP] Worker 1 creating user...
[chrome] › tests\example1.spec.ts:3:5 › test A1
✅ [READY] Worker 0 created: user-0
🔸 Running test A1 with user-0
[chrome] › tests\example2.spec.ts:3:5 › test B1
🔸 Running test B1 with user-0
[chrome] › tests\example2.spec.ts:7:5 › test B2
🔸 Running test B2 with user-0
[chrome] › tests\example1.spec.ts:7:5 › test A2
✅ [READY] Worker 1 created: user-1
🔸 Running test A2 with user-1
🧹 [TEARDOWN] Worker 0 deleting user-0
🧹 [TEARDOWN] Worker 1 deleting user-1
```

---

✅ **Proof:**

- With **1 worker**, setup/teardown happens only once for all tests.
- With **2 workers**, each worker runs its own setup/teardown independently.

---
