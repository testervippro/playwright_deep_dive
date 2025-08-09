import playwright from "eslint-plugin-playwright";

export default [
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,

      "playwright/consistent-test-it": [
        "error",
        { fn: "test", withinDescribe: "it" },
      ],
      "playwright/max-expects": ["warn", { max: 5 }],
      "playwright/no-conditional-in-test": "error",
      "playwright/prefer-strict-equal": "warn",
    },
  },
];
