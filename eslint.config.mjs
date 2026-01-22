import globals from 'globals';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    files: [],
    languageOptions: {
      globals: globals.browser
    }
  }
]);
