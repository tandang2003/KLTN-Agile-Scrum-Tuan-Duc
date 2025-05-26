import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'vite.config.ts',
      'src/components/ui/**',
      'src/components/sidebar/**'
    ]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
      ],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 80,
          jsxSingleQuote: true,
          plugins: ['prettier-plugin-tailwindcss']
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            String: false,
            Boolean: false,
            Number: false,
            Symbol: false,
            '{}': false,
            Object: false,
            object: false,
            Function: false
          },
          extendDefaults: true
        }
      ]
    }
  }
)
