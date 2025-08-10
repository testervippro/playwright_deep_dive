import { test, expect } from "@playwright/test";

/*
Web Worker 101: Introduction & Basics
What is a Web Worker?
Web Workers are a browser feature that allows you to run JavaScript code in the background, on a separate thread from the main UI thread.

This means long-running or heavy computations won’t block your webpage’s interface — the UI stays smooth and responsive.

They are part of the HTML5 standard and supported by all modern browsers.

Run node server.js to start the server before running this test.
user worker.postMessage to send messages to the worker
  on worker.js 
  self.onmessage = function (event) {
  const n = event.data;
  const result = calculateFibonacci(n);
  self.postMessage(result); //send result back to main thread

What is worker.onmessage?
It’s an event handler property on a Web Worker instance.
It listens for messages sent from the worker thread to the main thread.
Whenever the worker calls postMessage(...), this event handler in the main thread receives the message.
};

*/

test("should log worker creation and destruction", async ({ page }) => {
  // Navigate to the page that spawns a web worker
  await page.goto("http://localhost:3000/worker.html"); // Adjust the URL as needed

  // Listen for workers created by the page
  page.on("worker", async (worker) => {
    console.log(`Worker created: ${worker.url()}`);

    // Listen for the worker's close event
    worker.on("close", () => {
      console.log(`Worker destroyed: ${worker.url()}`);
    });

    const response = await worker.evaluate(() => {
      // some work here
      return 123;
    });
    console.log("Worker response:", response);
    await expect(response).toBe(123);

    // Create a non-serializable object with evaluateHandle
    const numbers = [1, 2, 3, 4, 5];
    const handle = await worker.evaluateHandle(
      (args) => ({
        numbers: args,
        sum() {
          return this.numbers.reduce((sum, num) => sum + num, 0);
        },
      }),
      numbers
    );

    // Use JSHandle to get the sum
    const sum = await handle.evaluate((obj) => obj.sum());
    console.log("Sum from JSHandle:", sum); // Expected: 15

    // Get the numbers property
    const numbersHandle = await handle.getProperty("numbers");
    const numbersValue = await numbersHandle.jsonValue();
    console.log("Numbers from JSHandle:", numbersValue); // Expected: [1, 2, 3, 4, 5]
  });
});
