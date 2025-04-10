const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const path = require('path');

const off = "off"; // Turns off the eslint config error
const warn = "warn"; // Warning for eslint config
const error = "error"; // Error for eslint config
const always = "always"; // Timing identifier for eslint config

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = [
  {
    files: ["**/*.{ts,tsx}"], // Match all TS and JS files
    ignores: ["node_modules/"], // Optionally ignore node_modules
    languageOptions: {
      parser: tsParser,
      globals: {
        $: 'readonly',
        jQuery: 'readonly',
        ...globals.browser, // Merge browser globals
      },
    },
    rules: {
      "func-style": [warn, "declaration", { allowArrowFunctions: true }],
      "prefer-arrow-callback": [warn, { allowNamedFunctions: true }],
      "semi": [error, always],
      "camelcase": warn,
      "eqeqeq": error,
      "no-useless-catch": warn,
      "no-useless-escape": warn,
      "no-useless-constructor": warn,
      "no-var": error,
      "prefer-const": warn,
      "prefer-exponentiation-operator": warn,
      "require-await": error,
      "require-yield": error,
      "getter-return": error,
      "no-compare-neg-zero": error,
      "no-constant-condition": warn,
      "no-dupe-else-if": error,
      "no-self-assign": error,
      "no-setter-return": error,
      "no-unreachable": error,
      "use-isnan": warn,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"], // Apply a separate config for JS files
    ignores: ["node_modules/"],
    languageOptions: {
      globals: {
        $: 'readonly',
        jQuery: 'readonly',
        ...globals.browser,
      },
      parserOptions: {
        createDefaultProgram: true,
      },
    },
    rules: {
      "func-style": [warn, "declaration", { allowArrowFunctions: true }],
      "prefer-arrow-callback": [warn, { allowNamedFunctions: true }],
      "semi": [error, always],
      "camelcase": warn,
      "eqeqeq": error,
      "no-useless-catch": warn,
      "no-useless-escape": warn,
      "no-useless-constructor": warn,
      "no-var": error,
      "prefer-const": warn,
      "prefer-exponentiation-operator": warn,
      "require-await": error,
      "require-yield": error,
      "getter-return": error,
      "no-compare-neg-zero": error,
      "no-constant-condition": warn,
      "no-dupe-else-if": error,
      "no-self-assign": error,
      "no-setter-return": error,
      "no-unreachable": error,
      "use-isnan": warn,
    },
  },
  {
    files: ["**/*.d.ts"], // Separate config for declaration files
    ignores: ["node_modules/"],
    languageOptions: {
      parser: tsParser,
      globals: {
        $: "readonly",
        jQuery: "readonly",
        ...globals.browser,
      },
    },
  },
];
