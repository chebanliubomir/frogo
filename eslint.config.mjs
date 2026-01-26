import globals from 'globals';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import js from "@eslint/js";

export default defineConfig([
  //root
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
      "**/*.cjs",
      "**/*.*.cjs",
      "**/*.*.mjs",
      "**/*.*.mjs",
      "!**/eslint.*.mjs",
    ],
  },
  //frontend
  // {
  //   files: ["frontend/**/*.{ts,tsx}"],
  //   ignores: ["node_modules"],
  //   rules: {},
  // },
  //backend
  {
    files: ["backend/**/*.{ts,mts,cts}"],
    ignores: ["./backend/dist/**/*"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./backend/tsconfig.json"],
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      semi: ["error", "always"],
    },
  },
]);
