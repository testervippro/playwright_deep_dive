import { test } from "./fixture2";

test("test B1", async ({ dbUserName }) => {
  console.log(`🔸 Running test B1 with ${dbUserName}`);
});

test("test B2", async ({ dbUserName }) => {
  console.log(`🔸 Running test B2 with ${dbUserName}`);
});
// npx playwright test tests/example1.spec.ts tests/example2.spec.ts
