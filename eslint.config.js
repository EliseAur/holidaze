import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jest from "eslint-plugin-jest"; // Import Jest plugin

export default [
  { ignores: ["dist", "setupTests.js"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Include browser globals like localStorage, fetch, and console
        ...globals.jest, // Include Jest globals for test files
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jest, // Add Jest plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jest.configs.recommended.rules, // Add Jest recommended rules
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": ["error", { varsIgnorePattern: "React" }], // Ignore unused React imports
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "setupTests.js"], // Apply Jest-specific rules only to test files
    languageOptions: {
      globals: {
        ...globals.jest, // Include Jest globals like global, test, expect
      },
    },
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];
