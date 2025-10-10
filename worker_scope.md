# 📘 Playwright Worker-Scoped Fixture Example

This example demonstrates how to use a **worker-scoped fixture** in Playwright to share state across tests within the same worker.

## 📁 File: `tests/api/chat/testworker.spec.ts`

```ts
import { test as base } from '@playwright/test';

// Extend the test with a worker-scoped fixture
const test = base.extend<{ workerStartTime: number }>({
  workerStartTime: [
    async ({}, use) => {
      // This is initialized once per worker
      const startTime = Date.now();
      await use(startTime);
    },
    { scope: 'worker' },
  ],
});

// Worker-scope variable
let counter = 0;

test('admin test 1', async ({ workerStartTime }, testInfo) => {
  counter++;
  console.log(
    `[ADMIN 1] workerIndex=${testInfo.workerIndex}, counter=${counter}, workerStartTime=${workerStartTime}`
  );
});

test('dashboard test 1', async ({ workerStartTime }, testInfo) => {
  counter++;
  console.log(
    `[DASHBOARD 1] workerIndex=${testInfo.workerIndex}, counter=${counter}, workerStartTime=${workerStartTime}`
  );
});

test('dashboard test 2', async ({ workerStartTime }, testInfo) => {
  counter++;
  console.log(
    `[DASHBOARD 2] workerIndex=${testInfo.workerIndex}, counter=${counter}, workerStartTime=${workerStartTime}`
  );
});

test('dashboard test 3', async ({ workerStartTime }, testInfo) => {
  counter++;
  console.log(
    `[DASHBOARD 3] workerIndex=${testInfo.workerIndex}, counter=${counter}, workerStartTime=${workerStartTime}`
  );
});
```

---

## 🧪 Command to Run with 2 Workers

```bash
npx playwright test tests/api/chat/testworker.spec.ts --workers=2
```

---

## 📤 Example Output (with 2 workers)

```txt
Running 4 tests using 2 workers

[Api] › tests/api/chat/testworker.spec.ts:65:1 › admin test 1
[ADMIN 1] workerIndex=0, counter=1, workerStartTime=1760068429935

[Api] › tests/api/chat/testworker.spec.ts:72:1 › dashboard test 1
[DASHBOARD 1] workerIndex=1, counter=1, workerStartTime=1760068429941

[Api] › tests/api/chat/testworker.spec.ts:79:1 › dashboard test 2
[DASHBOARD 2] workerIndex=0, counter=2, workerStartTime=1760068429935

[Api] › tests/api/chat/testworker.spec.ts:86:1 › dashboard test 3
[DASHBOARD 3] workerIndex=0, counter=3, workerStartTime=1760068429935
```

---

## 🔍 Observation

* You are using **`--workers=2`**, so Playwright runs tests using two isolated worker processes.
* The `workerStartTime` values indicate the start time of each worker:

  * `workerIndex=0` is reused for **3 tests**, sharing the same `workerStartTime`.
  * `workerIndex=1` ran **1 test**, with a different `workerStartTime`.

### ❗ Why do multiple tests share the same `workerStartTime`?

* Because they run in the **same worker process**, the worker-scoped fixture only initializes once per worker.
* You can confirm this by watching the `workerIndex` and the counter variable:

  * `counter` increases within a worker but **does not share state** across workers.

---

## ✅ Summary

| Test Name        | Worker Index | Counter | Worker Start Time |
| ---------------- | ------------ | ------- | ----------------- |
| admin test 1     | 0            | 1       | 1760068429935     |
| dashboard test 1 | 1            | 1       | 1760068429941     |
| dashboard test 2 | 0            | 2       | 1760068429935     |
| dashboard test 3 | 0            | 3       | 1760068429935     |

---


