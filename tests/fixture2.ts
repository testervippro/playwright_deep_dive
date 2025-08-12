import { test as base } from "@playwright/test";

export const test = base.extend<{ dbUserName: string }>({
  // @ts-ignore
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
