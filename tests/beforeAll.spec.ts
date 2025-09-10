import { test, expect } from '@playwright/test';
import { globalCache } from '@vitalets/global-cache';

let userId = '';
// Add two line in playwright.config.ts
//  globalSetup: globalCache.setup, 
// globalTeardown: globalCache.teardown,
async function createUserInDB() {
  console.log('>>> Creating user in DB...'); 
  await new Promise(r => setTimeout(r, 300));
  return { id: `user-${Math.floor(Math.random() * 10000)}` };
}

test.beforeAll(async () => {
  userId = await globalCache.get('user-id', async () => {
    const user = await createUserInDB();
    return user.id;
  });
  console.log('>>> beforeAll set userId =', userId);
});

for (let i = 1; i <= 10; i++) {
  test(`test ${i} should reuse same userId`, async () => {
    console.log(`Test ${i} sees userId =`, userId);
    expect(userId).toMatch(/^user-\d+$/);
  });
}
