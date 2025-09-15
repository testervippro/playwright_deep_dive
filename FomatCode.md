# ✅ ESLint + Prettier + Playwright + TypeScript + Git Hooks Setup

---

## 🧩 1. Install Dependencies

```bash
npm install --save-dev \
  eslint \
  @eslint/js \
  prettier \
  eslint-plugin-prettier \
  eslint-config-prettier \
  eslint-plugin-playwright \
  typescript \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  husky \
  lint-staged
```

---

## 📁 2. `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 130,
  "tabWidth": 4,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

---

## ⚙️ 3. `eslint.config.js` or  `eslint.config.mjs`

```js
// eslint.config.js
import js from '@eslint/js';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import playwright from 'eslint-plugin-playwright';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // ESLint recommended JS rules
  js.configs.recommended,

  // Playwright rules for test files
  {
    files: ['**/tests/**/*.js', '**/*.spec.js', '**/*.test.js'],
    plugins: { playwright },
    languageOptions: { ecmaVersion: 2021 },
    rules: { ...playwright.configs.recommended.rules },
  },

  // TypeScript recommended rules
  tseslint.configs.recommended,

  // TS-specific settings
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Custom global rules
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },

  // Prettier plugin (must be last)
  pluginPrettierRecommended,
];
```

---

## 📦 4. `package.json` scripts

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "prepare": "husky install"
}
```

---

## 🐶 5. Husky & lint-staged Setup

1. **Initialize Husky**

```bash
npx husky init
```

2. **Add `lint-staged` config to `package.json`**

```json
"lint-staged": {
  "**/*.{js,ts,jsx,tsx}": [
    "eslint",           // check only, no auto-fix
    "prettier --write"  // auto-format with Prettier
  ],
  "**/*.{json,css,md}": [
    "prettier --write"
  ]
}
```

3. **Edit `.husky/pre-commit` hook**

```bash
npx lint-staged
```

4. **Run prepare script if needed**

```bash
npm run prepare
```

---

## 🛠️ VS Code Settings (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

# 🚀 You’re all set!
