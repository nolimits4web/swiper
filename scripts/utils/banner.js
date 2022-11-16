import fs from 'fs-extra';

const pkg = JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url)));
const date = {
  day: new Date().getDate(),
  month:
    'January February March April May June July August September October November December'.split(
      ' ',
    )[new Date().getMonth()],
  year: new Date().getFullYear(),
};
function banner(name = null) {
  return `${`
/**
 * Swiper ${name ? `${name} ` : ''}${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2014-${date.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim()}\n`;
}
async function addBannerToFile(file, name) {
  const content = await fs.readFile(file, 'utf-8');
  await fs.writeFile(file, `${banner(name)}\n${content}`);
}
export { banner };
export { addBannerToFile };
export default {
  banner,
  addBannerToFile,
};
