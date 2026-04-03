import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

  // react — flat config nativo, já registra plugin + rules + parserOptions JSX
  {
    ...reactPlugin.configs.flat.recommended,
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.es2022 },
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // jsx-runtime — desativa react/react-in-jsx-scope e react/prop-types para React 17+
  {
    ...reactPlugin.configs.flat["jsx-runtime"],
    files: ["src/**/*.{ts,tsx}"],
  },

  // react-hooks — flat config nativo
  reactHooks.configs.flat.recommended,

  // typescript
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },

  // prettier sempre por último
  prettier,

  {
    ignores: ["build/", "coverage/", "node_modules/", "src/index.tsx", "**/*.d.ts", "**/*.test.tsx"],
  },
];