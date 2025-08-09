import { test } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('/reset');
  await page.goto('/');
  // You are signed in!
});