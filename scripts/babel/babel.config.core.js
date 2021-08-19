module.exports = {
  ignore: [
    '../../src/angular/**/*.js',
    '../../src/react/**/*.js',
    '../../src/*-react.js',
    '../../src/vue/**/*.js',
    '../../src/*-vue.js',
    '../../src/copy/*',
    '../../src/svelte/**/*.js',
    '../../src/*-svelte.js',
  ],
  presets: [['@babel/preset-env', { modules: false, loose: true }]],
};
