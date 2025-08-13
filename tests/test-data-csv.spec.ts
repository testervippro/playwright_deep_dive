import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";
import { test } from "@playwright/test";

interface CsvRecord {
  test_case: string;
  some_value: string;
  some_other_value: string;
  // Add other fields as needed
}

let records: CsvRecord[] = [];

test.beforeAll(async () => {
  const filePath = path.join(__dirname, "..", "data", "input.csv");
  const fileContent = await fs.readFile(filePath, "utf-8");

  records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
});
// if not set beforeALL sometime meet issie
//https://github.com/microsoft/playwright/issues/13038
//  browser.newContext: Target page, context or browser has been closed
// const records: CsvRecord[] = parse(
//   fs.readFileSync(path.join(__dirname, "..", "data", "input.csv")),
//   {
//     columns: true,
//     skip_empty_lines: true,
//   }
// );

for (const record of records) {
  test(`foo: ${record.test_case}`, async ({ page }) => {
    console.log(record.test_case, record.some_value, record.some_other_value);
    // Add your test logic here, possibly using `await page.goto(...)` etc.
  });
}
