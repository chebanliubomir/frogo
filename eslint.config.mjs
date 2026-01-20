import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    // name: 'recommended rules',
    eslint: eslint.configs.recommended,
    stylistic: tseslint.configs.stylistic,
    strict: tseslint.configs.strict,

  },
  {
    name: 'file filtering',
    ignores: ['node_modules', 'dist'],
  },
  {
    name: 'language options',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      parser: '@typescript-eslint/parser',
    }
  }
]);
