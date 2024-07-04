import js from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['coverage/*', 'dist/*', '.prettierrc.js', 'env.d.ts', 'src/serviceWorker.js'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      eslintPluginReact,
      eslintPluginImport,
      eslintPluginJsxA11y,
      tsEslintPlugin,
    },
    rules: {
      'no-console': 1,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        // Tells eslint-plugin-react to automatically detect the version of React to use.
        version: 'detect',
      },
      // Tells eslint how to resolve imports
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];

// module.exports = {
//   extends: [
//     // By extending from a plugin config, we can get recommended rules without having to add them manually.
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:import/recommended',
//     'plugin:jsx-a11y/recommended',
//     'plugin:@typescript-eslint/recommended',
//     // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
//     // Make sure it's always the last config, so it gets the chance to override other configs.
//     'eslint-config-prettier',
//   ],
//   settings: {
//     react: {
//       // Tells eslint-plugin-react to automatically detect the version of React to use.
//       version: 'detect',
//     },
//     // Tells eslint how to resolve imports
//     'import/resolver': {
//       node: {
//         paths: ['src'],
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       },
//     },
//   },
//   env: {
//     browser: true,
//     node: true,
//   },

//   ignorePatterns: ['node_modules/', 'dist/', '.prettierrc.js', '.eslintrc.js', 'env.d.ts', 'src/serviceWorker.js'],
// };
