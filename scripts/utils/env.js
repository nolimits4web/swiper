module.exports = () => {
  const argv = process.argv.slice(2).map((v) => v.toLowerCase());
  const isProd = argv.includes('--prod');
  process.env.NODE_ENV = isProd ? 'production' : 'development';
  return {
    env: process.env.NODE_ENV,
    isProd,
  };
};
