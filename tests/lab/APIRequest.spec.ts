import { test, expect, request } from "@playwright/test";
import { TAG } from "./EnumTag";

//https://playwright.dev/docs/api/class-apirequest
// npx playwright test --grep @smoke
test.describe("API Request Tests", () => {
  let apiContext;
  test.beforeAll(async () => {
    // Creates new instances of [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)
    apiContext = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com",
    });
  });

  test("GET /posts", { tag: TAG.SMOKE }, async () => {
    const response = await apiContext.get("/posts");
    await expect(response.status()).toBe(200);
    const data = await response.json();
    await expect(data).toBeInstanceOf(Array);
    await expect(data.length).toBeGreaterThan(0);
  });
  test("POST /posts", { tag: TAG.SMOKE }, async () => {
    const response = await apiContext.post("/posts", {
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    await expect(response.status()).toBe(201);
    const data = await response.json();
    await expect(data).toHaveProperty("id");
    await expect(data.title).toBe("foo");
    await expect(data.body).toBe("bar");
    await expect(data.userId).toBe(1);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
