export default function classesToSelector(classes = '') {
  // Escape all CSS selector special characters
  return `.${classes
    .trim()
    .replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, '\\$1') // eslint-disable-line
    .replace(/ /g, '.')}`;
}
