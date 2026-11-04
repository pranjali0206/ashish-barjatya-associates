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
public/img/          project photos, founder portraits, Omaxe + Godrej logos, og.jpg (link preview)
src/data.js          ALL copy, project data and client facts — edit here, not in components
src/App.jsx          section order: Hero → PartnerStrip → Projects → CtaBand → Corridors
                     → WhyAbout → Process → Contact → Footer
src/components/      one file per section + effects (Cursor, SplitText, Reveal, Icons)
src/styles/global.css design tokens + all styles
scripts/shoot.mjs    dev helper: full-page desktop + mobile screenshots of the preview build
scripts/overflow.mjs dev helper: lists elements overflowing the viewport
static-version/      the earlier plain-HTML version, kept for reference
```

## Facts to fill in (src/data.js)

These are empty on purpose and their UI stays hidden until set — never guess them:
`RERA_AGENT_NO`, per-project `rera`, `ADDRESS`, `MAPS_URL`, `HOURS`, `GOOGLE` (rating/count/url),
`TESTIMONIALS` (quote, name, locality, project, year), `FOUNDED_YEAR`. `YEARS` drives every
"20 years" mention on the page.

## Deploy

**Cloudflare Workers (connected to the GitHub repo):** every push to `main` runs
`npm run build` then `npx wrangler deploy`. `wrangler.jsonc` tells wrangler to
serve `dist/` as static assets — keep that file: without a wrangler config,
wrangler falls into its zero-config "auto-configure" flow, which rewrites the
project and refuses Vite < 6.

**Any other static host:** `npm run build`, then upload the contents of `dist/`
(Netlify, Vercel, cPanel public_html, …). The site expects to live at the domain
root (`base: '/'`); for a sub-folder, change `base` in `vite.config.js`.

## Contact details

WhatsApp / phone number lives in `src/data.js` (`PHONE`, `PHONE_RAW`). The enquiry
form opens WhatsApp with a pre-filled message — no backend required.
