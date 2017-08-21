const pkg = require('../package.json');

const releaseDate = {
  day: new Date().getDate(),
  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
  year: new Date().getFullYear(),
};

module.exports = `${`
/**
 * Swiper ${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2014-${releaseDate.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${releaseDate.month} ${releaseDate.day}, ${releaseDate.year}
 */
`.trim()}\n`;
