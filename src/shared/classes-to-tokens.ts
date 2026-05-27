export default function classesToTokens(classes = ''): string[] {
  return classes
    .trim()
    .split(' ')
    .filter((c) => !!c.trim());
}
