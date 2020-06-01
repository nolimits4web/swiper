module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'prefer-object-spread': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-restricted-globals': ['error', 'window', 'document'],
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
