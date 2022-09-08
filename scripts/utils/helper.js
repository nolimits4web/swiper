export function capitalizeString(str) {
  return str.replace(/(?:^|-)([a-z])/g, (m, char) => char.toUpperCase());
}

/**
 * Parse build modules from env `SWIPER_BUILD_MODULES`.<br>
 * Will return null if env is not set or empty
 * @returns {string[]|null}
 */
export function parseSwiperBuildModulesEnv() {
  if (process.env.SWIPER_BUILD_MODULES) {
    const buildModules = process.env.SWIPER_BUILD_MODULES.split(/[,\s]+/);
    if (buildModules.length) return buildModules;
  }
  return null;
}
