import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import-x'
import tsPlugin from '@typescript-eslint/eslint-plugin'


export default defineConfig([
  {
    ignores: [
      '**/node_modules/',
      'backend/prisma/',
      'backend/uploads/',
      'backend/prisma.config.ts',
    ],
  },
  {
    files: ['backend/**/*.{js,ts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'import-x': importPlugin,
      '@typescript-eslint': tsPlugin

    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-empty': 'error',
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { 'prefer': 'type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
])
