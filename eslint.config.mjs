import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,

  {

    rules: {
      // 'import/order': ['error', {
      //   groups: [
      //     'builtin',
      //     'external',
      //     'internal',
      //     'parent',
      //     'sibling',
      //     'index',
      //     'object',
      //     'type'
      //   ]
      // }],
    }
  }
);
