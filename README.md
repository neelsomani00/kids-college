# Kids College Indore – Website

React + Vite + Tailwind CSS, multi-page (Home, Admissions, Fee Structure, Contact), responsive, SEO-ready.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist (also creates per-page SEO HTML)
npm run preview    # test the production build
```

## 1. Colours & logo (do this first)
- Brand colours: `src/index.css` → `:root` variables (`--brand`, `--accent`, ...). Match them to the logo; the whole site updates.
- Logo: save your logo as `public/logo.webp`. If missing, the site loads the logo from the school's current website, then falls back to a "KC" mark.
- Favicon / app icons / share image: `public/favicon.svg`, `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.png` are simple "KC" placeholders. Replace them with logo-based versions (same file names).

## 2. Photos
Drop images into `public/images/` with these names; until then a labelled placeholder shows.
`hero.jpg, hero-small.jpg, about.jpg, pool.jpg, sports.jpg, mess.jpg, bus.jpg, medical.jpg, music.jpg, campus-senior.jpg, campus-junior.jpg, gallery-1..4.jpg, admissions.jpg, campus-visit.jpg`
Faculty/alumni photos: put the file name in the sheet's `photo` column (file lives in `public/images/`).

## 3. Google Sheets CMS (Fees, Faculty, Alumni)
1. Create a Google Sheet with 3 tabs named exactly **Fees**, **Faculty**, **Alumni**.
2. Import the CSVs from `public/sheets-templates/` into each tab (File → Import) and edit.
3. Share → "Anyone with the link" → Viewer.
4. Copy the sheet ID (from the URL) into `.env` (copy `.env.example`): `VITE_SHEET_ID=...`
5. Rebuild/redeploy. Edits to the sheet appear on the site without redeploying.
Keep the header row names unchanged. Without a sheet ID, placeholder data is shown.

## 4. Edit school details
`src/data/config.js`: phones, email, addresses, map locations, social links, admission session, footer credit.
**Check:** established year (official site says 2010, some portals 2014), the Kailashpuri branch (not included; only Senior and Junior wings are), and the admission steps / documents list (generic placeholders).

## 5. SEO
- Per-page titles, descriptions, canonical, Open Graph, Twitter cards (`src/components/Seo.jsx`) plus School JSON-LD schema.
- `npm run build` generates real HTML per route (`dist/fees/index.html` etc.) so crawlers see correct metadata.
- `public/robots.txt` and `public/sitemap.xml` included. Set your real domain in `.env` (`VITE_SITE_URL`) before building and it is filled into canonical URLs, sitemap and robots.
- After going live: submit the sitemap in Google Search Console and add the Google Business Profile for both campuses.

## Deploy
Upload `dist/` to Netlify, Vercel, Cloudflare Pages or any static host (`_redirects` handles routing).
