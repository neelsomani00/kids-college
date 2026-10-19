// Runs after `vite build`. Creates a real HTML file per route (dist/fees/index.html, ...)
// with that page's own <title>, description and canonical URL baked in, so crawlers and
// social-share previews see correct metadata without running JavaScript. Also writes
// dist/404.html and fills the domain into sitemap.xml / robots.txt.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.kidscollegeindore.in').replace(/\/$/, '');
const dist = join(process.cwd(), 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const pages = [
  { path: '/fees', title: 'Fee Structure | Kids College Indore', desc: 'Class-wise fee structure at Kids College Indore: admission, tuition, annual charges and transport.' },
  { path: '/admissions', title: 'Admissions | Kids College Indore', desc: 'How to apply to Kids College Indore: admission steps, documents required and parent FAQs.' },
  { path: '/contact', title: 'Contact | Kids College Indore', desc: 'Phone, email, addresses and maps for the Dhar Road and Airport Road campuses of Kids College Indore.' },
];

const swap = (html, p) =>
  html
    .replace(/<title>.*?<\/title>/s, `<title>${p.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/s, `$1${p.desc}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/s, `$1${p.title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/s, `$1${p.desc}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_URL}${p.path}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE_URL}${p.path}$2`);

// Home: just point at the configured domain.
const home = template
  .replaceAll('https://www.kidscollegeindore.in', SITE_URL);
writeFileSync(join(dist, 'index.html'), home);

for (const p of pages) {
  const dir = join(dist, p.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), swap(home.replaceAll(SITE_URL + '/', SITE_URL + '/'), p));
}

// 404 fallback (hosts like GitHub Pages / Netlify serve this for unknown URLs; the React app shows its 404 view).
writeFileSync(join(dist, '404.html'), home);

// Domain into sitemap + robots
for (const f of ['sitemap.xml', 'robots.txt']) {
  const fp = join(dist, f);
  if (existsSync(fp)) writeFileSync(fp, readFileSync(fp, 'utf8').replaceAll('https://www.kidscollegeindore.in', SITE_URL));
}

console.log(`Prerendered metadata for ${pages.length + 1} routes using ${SITE_URL}`);
