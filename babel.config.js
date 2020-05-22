const modules = process.env.MODULES || false;
module.exports = {
  presets: [['@babel/preset-env', { modules, loose: true }]],
};
