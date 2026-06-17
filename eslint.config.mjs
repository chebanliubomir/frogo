import globals from 'globals';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import"

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
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.mts', '.cts'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './backend/tsconfig.json',
        },
      },
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
      "semi": ["error", "never"],
      "eqeqeq": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": ["warn"],
      "no-empty-function": ["warn"],
      ...importPlugin.configs.recommended.rules,
      "import/no-cycle": "warn",
      "import/no-unresolved": "error",
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ]
    },
  },
]);
