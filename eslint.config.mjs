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
      "**/.yarn/**",
      "!**/eslint.*.mjs",
      "**/dist/**/*",
      "**/node_modules/**/*",
    ],
  },
  //frontend
  // {
  //   files: ["frontend/**/*.{ts,tsx}"],
  //   plugins: {
  //     react: react.configs.recommended,
  //   },
  //   languageOptions: {
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //       }
  //     }
  //   },
  //   rules: {},
  // },
  //backend
  {
    files: ["backend/**/*.{ts,mts,cts}"],
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
        ...globals.node,
        ...globals.es2026,
      },
    },
    rules: {
      "semi": ["error", "always"],
      "eqeqeq": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": ["warn"],
      "no-empty-function": ["error"],
    },
  },
]);
