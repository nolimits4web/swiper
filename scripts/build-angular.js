import execSh from 'exec-sh';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = execSh.promise;
export default async function buildAngular() {
  return exec(`ng build swiper --configuration production`);
}
