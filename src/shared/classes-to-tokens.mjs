export default function classesToTokens(classes = '') {
  return classes
    .trim()
    .split(' ')
    .filter((c) => !!c.trim());
}
