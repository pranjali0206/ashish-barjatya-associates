# Ashish Barjatya Associates — landing page

Premium single-page site for Indore's Omaxe & Godrej Properties channel partner.
React 18 + Vite, Framer Motion (reveals, parallax, tilt), GSAP ScrollTrigger (pinned
horizontal Omaxe gallery), Lenis (smooth scroll).

## Run

```bash
npm install        # once
npm run dev        # http://localhost:5173 — live reload
npm run build      # production build → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Structure

```
public/img/          project photos, founder portraits, Omaxe + Godrej logos
src/data.js          all copy & project data (edit names, sizes, status, phone here)
src/App.jsx          section order
src/components/      one file per section + effects (Preloader, Cursor, Magnetic, SplitText, Reveal)
src/styles/global.css design tokens + all styles
scripts/shoot.mjs    dev helper: full-page desktop + mobile screenshots of the preview build
scripts/overflow.mjs dev helper: lists elements overflowing the viewport
static-version/      the earlier plain-HTML version, kept for reference
```

## Deploy

**Cloudflare Workers (connected to the GitHub repo):** every push to `main` runs
`npm run build` then `npx wrangler deploy`. `wrangler.jsonc` serves `dist/` as
static assets. Requires Vite ≥ 6 (wrangler refuses to deploy older Vite projects).

**Any other static host:** `npm run build`, then upload the contents of `dist/`
(Netlify, Vercel, cPanel public_html, …). The site expects to live at the domain
root (`base: '/'`); for a sub-folder, change `base` in `vite.config.js`.

## Contact details

WhatsApp / phone number lives in `src/data.js` (`PHONE`, `PHONE_RAW`). The enquiry
form opens WhatsApp with a pre-filled message — no backend required.
