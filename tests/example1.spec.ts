import { test } from "./fixture2";

test("test A1", async ({ dbUserName }) => {
  console.log(`🔸 Running test A1 with ${dbUserName}`);
});

test("test A2", async ({ dbUserName }) => {
  console.log(`🔸 Running test A2 with ${dbUserName}`);
});
