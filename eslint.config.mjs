import path from 'path'
import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(__filename)

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    // parser: '@typescript-eslint/parser',
    // files: ['*.ts', '*.tsx'],
    // parserOptions: {
    //   project: [
    //     './frontend/tsconfig.json',
    //     './backend/tsconfig.json',
    //     './tsconfig.json'
    //   ],
    // },
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/no-extraneous-class": "off",
    }
  }
);
