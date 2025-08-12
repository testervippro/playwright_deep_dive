import { test as base } from "@playwright/test";

// Extend the base test to override click
//.extend<T>() → creates a new test object that has extra fixtures or options.
export const test = base.extend({
  page: async ({ page }, use) => {
    const originalClick = page.click.bind(page);

    page.click = async (selector: string, options?: any) => {
      const elements = await page.$$(selector); // Find all matching elements
      //age.$(selector) returns the first matching element, or null if none found.
      console.log(
        `[LOG] Clicking on selector: ${selector} | Found: ${elements.length} element(s)`
      );
      return originalClick(selector, options);
    };

    await use(page);
  },
});

export { expect } from "@playwright/test";

/*
In JavaScript/TypeScript, methods often rely on this to refer to their parent object.

Inside Playwright’s page.click, there’s code that expects:

this === page
so it can access internal state, contexts, etc.

When you do:

const originalClick = page.click;
you’re taking the function out of its object context — now it’s just a standalone function with this being undefined (in strict mode) or the global object (in sloppy mode).
Calling originalClick(selector) without the correct context will throw an error like:

TypeError: Cannot read properties of undefined (reading '_channel')
2️⃣ Why bind(page) fixes it
When we do:

const originalClick = page.click.bind(page);
we create a new function where this is permanently set to page — so even when we call originalClick(...) later, it behaves exactly as if you called page.click(...).

3️⃣ Simple analogy
It’s like borrowing your friend’s house keys:

If you take the keys without the address (context), you can’t open the door because you don’t know where the house is.

bind(page) writes the address on the keychain so the key works anywhere.

If you want, I can give you a step-by-step minimal demo showing exactly how the error happens without bind(page) so you can see the failure in action. That way, the reason becomes crystal clear.

*/
