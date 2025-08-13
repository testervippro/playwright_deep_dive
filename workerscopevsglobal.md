## **1️⃣ Worker-Scoped Fixtures Recap**

A **worker-scoped fixture**:

- Is tied to **one Playwright worker process**.
- Runs **once** before any test in that worker.
- Runs teardown **after** all tests in that worker.
- **Runs again** for _each_ worker process if you have multiple.

📌 Example: Database user created per worker:

```ts
export const test = base.extend<{ dbUserName: string }>({
  dbUserName: [
    async ({}, use, testInfo) => {
      console.log(`[SETUP] Worker ${testInfo.workerIndex}`);
      const userName = `user-${testInfo.workerIndex}`;
      await use(userName);
      console.log(`[TEARDOWN] Worker ${testInfo.workerIndex}`);
    },
    { scope: "worker" },
  ],
});
```

---

## **2️⃣ Global Setup / Teardown**

Global setup/teardown:

- Runs **once** before _all_ tests in the entire test run.
- Runs teardown **once** after _all_ tests finish.
- Runs **outside** of worker processes (in a separate Node process).
- Good for expensive, environment-wide operations.

📌 **playwright.config.ts** example:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: require.resolve("./global-setup"),
  globalTeardown: require.resolve("./global-teardown"),
});
```

📌 **global-setup.ts**:

```ts
async function globalSetup() {
  console.log("🌍 Global setup: starting DB server...");
  // Start server, seed DB, etc.
}
export default globalSetup;
```

📌 **global-teardown.ts**:

```ts
async function globalTeardown() {
  console.log("🌍 Global teardown: stopping DB server...");
  // Stop server, cleanup env, etc.
}
export default globalTeardown;
```

---

## **3️⃣ Key Differences**

| Feature                | Worker-Scoped Fixture                                    | Global Setup/Teardown                                     |
| ---------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| **Runs**               | Once per worker process                                  | Once for the entire test run                              |
| **Scope**              | Worker process                                           | Whole test run (all workers)                              |
| **When setup runs**    | Before first test in that worker                         | Before any worker starts                                  |
| **When teardown runs** | After last test in that worker                           | After all workers finish                                  |
| **Where it runs**      | Inside worker process                                    | Separate Node process                                     |
| **Best for**           | Per-worker resources (e.g., unique DB user, temp folder) | Environment-wide setup (e.g., starting/stopping services) |
| **Parallel impact**    | Multiple workers = multiple setups                       | Always only one setup                                     |

---

## **4️⃣ Visual Timeline**

**With 2 workers:**

```
Global Setup
 ├─ Worker 0: Fixture setup → Test A1 → Test A2 → Fixture teardown
 ├─ Worker 1: Fixture setup → Test B1 → Test B2 → Fixture teardown
Global Teardown
```

**Without worker fixtures, only global setup/teardown:**

```
Global Setup
 ├─ Test A1
 ├─ Test A2
 ├─ Test B1
 ├─ Test B2
Global Teardown
```

---

## **5️⃣ When to Use Which**

- **Global setup/teardown** → Use for one-time actions affecting the _whole environment_ (starting a web server, seeding global test data, logging in to a service and caching the token).
- **Worker-scoped fixtures** → Use for _per-worker_ resources that should be isolated between workers (unique DB user, dedicated cache folder, separate browser context with different test accounts).

---
