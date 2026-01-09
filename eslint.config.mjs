import { defineConfig } from 'eslint/config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['@typescript-eslint/recommended', 'prettier'],
  rules: {
    semi: ['error', 'always'],
  }
});
