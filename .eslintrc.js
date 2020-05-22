module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prefer-object-spread': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-restricted-globals': ['error', 'window', 'document'],
  },
};
