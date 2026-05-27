export default function classesToSelector(classes = ''): string {
  return `.${classes
    .trim()
    .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, '\\$1')
    .replace(/ /g, '.')}`;
}
