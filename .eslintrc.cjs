const rules = {
  'no-nested-ternary': 'off',
  'no-lonely-if': 'off',
  'no-param-reassign': 'off',
  'no-underscore-dangle': 'off',
  'prefer-object-spread': 'off',
  'prefer-destructuring': 'off',
  'default-param-last': 'off',
  'import/prefer-default-export': 'off',
  'guard-for-in': 'off',
  'no-restricted-syntax': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-console': 'off',
  'no-restricted-globals': 'off',
  'max-classes-per-file': 'off',
  'react/jsx-filename-extension': 'off',
  'jsx-a11y/label-has-associated-control': 'off',
  'react/no-array-index-key': 'off',
  'react/prop-types': 'off',
  'react/jsx-props-no-spreading': 'off',
  'import/no-unresolved': [2, { ignore: ['ssr-window', 'dom7', 'swiper'] }],
};
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },

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

  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
      rules,
    },
    {
      files: ['**/*.jsx', 'src/react/*.js'],
      plugins: ['react'],
      rules,
    },

    {
      files: ['src/**/*.*'],
      rules: {
        ...rules,
        'import/extensions': [2, 'ignorePackages', { js: 'always' }],
      },
    },
    {
      files: ['scripts/**/*.*'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        ...rules,
        'import/extensions': [2, 'ignorePackages', { js: 'always' }],
      },
    },
  ],
};
