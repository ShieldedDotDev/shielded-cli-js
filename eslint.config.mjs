import js from '@eslint/js';
import tsEslintParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs['recommended-type-checked'].rules,
    },
  },
];
