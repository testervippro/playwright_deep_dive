import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import { parse } from "csv-parse/sync"; //small CSV strings

interface CsvRecord {
  test_case: string;
  some_value: string;
  some_other_value: string;
  // add other fields as needed
}

const records: CsvRecord[] = parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "input.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

for (const record of records) {
  test(`foo: ${record.test_case}`, async ({ page }) => {
    console.log(record.test_case, record.some_value, record.some_other_value);
  });
}
