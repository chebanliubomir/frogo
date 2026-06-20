import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    basePath: 'backend',
    files: ['**/*.{js,ts}'],
    ignores: [
      'node_modules/',
      'prisma/',
      'uploads/',
      'prisma.config.ts',
    ],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      semi: ['warn', 'never']
    }
  }
])
