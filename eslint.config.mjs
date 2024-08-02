import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ['**/node_modules/', '**/dist/', '**/main/']
}, ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'plugin:prettier/recommended',
        'prettier'
), {
    plugins: {
        react,
        '@typescript-eslint': typescriptEslint,
        prettier,
        'simple-import-sort': simpleImportSort
    },

    languageOptions: {
        globals: {
            ...globals.browser
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: 'module',

        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    },

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },

        'import/core-modules': ['electron', 'electron-is-dev']
    },

    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'prettier/prettier': 'error',
        'react/no-unknown-property': ['off'],
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'warn',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        'react/require-default-props': 0,
        'react/button-has-type': 0,
        'react/no-children-prop': 0,
        'react/jsx-props-no-spreading': 0,

        'react/function-component-definition': ['warn', {
            namedComponents: 'function-declaration',
            unnamedComponents: 'function-expression'
        }],

        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }],

        'import/extensions': 0
    }
}, {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],

    rules: {
        'simple-import-sort/imports': ['error', {
            groups: [
                ['^react$', '^next', '^[a-z]'],
                ['^@'],
                ['^~'],
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ['^.+\\.s?css$'],
                ['^\\u0000']
            ]
        }]
    }
}];