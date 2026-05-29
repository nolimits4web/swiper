import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const baselineFile = path.join(repoRoot, 'scripts', 'bundle-size-baseline.json');

const update = process.argv.includes('--update');

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function isTracked(file) {
  const base = path.basename(file);
  if (base.endsWith('.map')) return false;
  return /\.(min\.mjs|min\.js|min\.css)$/.test(base);
}

function gzipSize(buf) {
  return zlib.gzipSync(buf, { level: 9 }).length;
}

function measure() {
  if (!fs.existsSync(distDir)) {
    console.error(`dist/ not found at ${distDir}. Run \`npm run build:prod\` first.`);
    process.exit(1);
  }
  const sizes = {};
  for (const file of walk(distDir)) {
    if (isTracked(file)) {
      const rel = path.relative(distDir, file);
      const buf = fs.readFileSync(file);
      sizes[rel] = { raw: buf.length, gzip: gzipSize(buf) };
    }
  }
  return sizes;
}

function fmt(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(2)} KB`;
}

function fmtDelta(curr, prev) {
  if (prev === undefined) return '(new)';
  const d = curr - prev;
  if (d === 0) return '±0';
  const sign = d > 0 ? '+' : '';
  const pct = prev === 0 ? '' : ` (${sign}${((d / prev) * 100).toFixed(1)}%)`;
  return `${sign}${fmt(d)}${pct}`;
}

const current = measure();

if (update) {
  fs.writeFileSync(baselineFile, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`Baseline updated: ${path.relative(repoRoot, baselineFile)}`);
  process.exit(0);
}

let baseline = {};
if (fs.existsSync(baselineFile)) {
  baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf-8'));
}

const allKeys = new Set([...Object.keys(baseline), ...Object.keys(current)]);
const rows = [...allKeys].sort().map((k) => {
  const c = current[k] || { raw: 0, gzip: 0 };
  const b = baseline[k];
  return {
    file: k,
    raw: c.raw,
    rawDelta: fmtDelta(c.raw, b?.raw),
    gzip: c.gzip,
    gzipDelta: fmtDelta(c.gzip, b?.gzip),
    removed: !current[k],
  };
});

const col = (s, w) => s.padEnd(w);
const w = { file: 44, raw: 12, rawDelta: 18, gzip: 12, gzipDelta: 18 };

console.log(
  col('FILE', w.file) +
    col('RAW', w.raw) +
    col('Δ RAW', w.rawDelta) +
    col('GZIP', w.gzip) +
    col('Δ GZIP', w.gzipDelta),
);
console.log('-'.repeat(w.file + w.raw + w.rawDelta + w.gzip + w.gzipDelta));

let totalRaw = 0;
let totalGzip = 0;
let totalRawBase = 0;
let totalGzipBase = 0;
for (const r of rows) {
  const file = r.removed ? `${r.file} (removed)` : r.file;
  console.log(
    col(file, w.file) +
      col(fmt(r.raw), w.raw) +
      col(r.rawDelta, w.rawDelta) +
      col(fmt(r.gzip), w.gzip) +
      col(r.gzipDelta, w.gzipDelta),
  );
  totalRaw += r.raw;
  totalGzip += r.gzip;
  if (baseline[r.file]) {
    totalRawBase += baseline[r.file].raw;
    totalGzipBase += baseline[r.file].gzip;
  }
}
console.log('-'.repeat(w.file + w.raw + w.rawDelta + w.gzip + w.gzipDelta));
console.log(
  col('TOTAL', w.file) +
    col(fmt(totalRaw), w.raw) +
    col(fmtDelta(totalRaw, totalRawBase), w.rawDelta) +
    col(fmt(totalGzip), w.gzip) +
    col(fmtDelta(totalGzip, totalGzipBase), w.gzipDelta),
);

if (!fs.existsSync(baselineFile)) {
  console.log('\nNo baseline found. Run `npm run bundle-size:update` to write one.');
}
