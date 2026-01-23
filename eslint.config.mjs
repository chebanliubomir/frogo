import globals from 'globals';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    files: [],
    ignores: [],
    languageOptions: {
      globals: globals.browser
    }
  }
]);
