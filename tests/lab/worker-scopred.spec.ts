import { test as base, expect } from "@playwright/test";

// ----------------------
// Example 1: Worker-scoped fixture
// ----------------------

// Define account type
type Account = {
  username: string;
  password: string;
};

// Extend base test with a worker-scoped fixture
export const test = base.extend<{}, { account: Account }>({
  account: [
    async ({}, use, workerInfo) => {
      const username = "user" + workerInfo.workerIndex;
      const password = "verysecure";

      // Runs only once per worker
      console.log(
        `(Fixture) Worker ${workerInfo.workerIndex} creating account: ${username} : ${password}`
      );

      await use({ username, password });
    },
    { scope: "worker" },
  ],
});

// Tests using the worker-scoped fixture
test("Worker Fixture Test 1", async ({ account }, testInfo) => {
  console.log(
    `Test 1 running on worker ${testInfo.workerIndex} with account ${account.username}`
  );
});

test("Worker Fixture Test 2", async ({ account }, testInfo) => {
  console.log(
    `Test 2 running on worker ${testInfo.workerIndex} with account ${account.username}`
  );
});

test("Worker Fixture Test 3", async ({ account }, testInfo) => {
  console.log(
    `Test 3 running on worker ${testInfo.workerIndex} with account ${account.username}`
  );
});

// ----------------------
// Example 2: No fixture, just workerIndex
// ----------------------

test("WorkerIndex Test 1", async ({}, testInfo) => {
  console.log(`Test 1 running on worker ${testInfo.workerIndex}`);
});

test("WorkerIndex Test 2", async ({}, testInfo) => {
  console.log(`Test 2 running on worker ${testInfo.workerIndex}`);
});

test("WorkerIndex Test 3", async ({}, testInfo) => {
  console.log(`Test 3 running on worker ${testInfo.workerIndex}`);
});

/* 
Running 6 tests using 3 workers
[chrome] › tests\lab\worker-scopred.spec.ts:32:1 › Worker Fixture Test 1
(Fixture) Worker 0 creating account: user0 : verysecure
Test 1 running on worker 0 with account user0
[chrome] › tests\lab\worker-scopred.spec.ts:54:1 › WorkerIndex Test 1
Test 1 running on worker 0
[chrome] › tests\lab\worker-scopred.spec.ts:38:1 › Worker Fixture Test 2
(Fixture) Worker 1 creating account: user1 : verysecure
Test 2 running on worker 1 with account user1
[chrome] › tests\lab\worker-scopred.spec.ts:58:1 › WorkerIndex Test 2
Test 2 running on worker 0
[chrome] › tests\lab\worker-scopred.spec.ts:62:1 › WorkerIndex Test 3
Test 3 running on worker 1
[chrome] › tests\lab\worker-scopred.spec.ts:44:1 › Worker Fixture Test 3
(Fixture) Worker 2 creating account: user2 : verysecure
Test 3 running on worker 2 with account user2                                                                                                                           
  6 passed (1.7s)

  Key observations:

Worker-scoped fixture logs once per worker, then all tests in that worker reuse the same account.

WorkerIndex-only tests don’t create anything; they just show which worker runs them.
*/
