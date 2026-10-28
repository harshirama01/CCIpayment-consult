# CCI Payments — Next.js

Next.js 16 (App Router, TypeScript, Turbopack) recreation of the single-file CCI Payments site.

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/` — routes: `/`, `/about`, `/services`, `/contact` (the old `#hash` pages), `layout.tsx`, `globals.css` (original CSS, unchanged apart from font variables)
- `lib/content.ts` — all copy and config. **Edit `CONFIG` here** (WhatsApp number, email, hours, payment types, currency list). Confirm supported services/currencies/destinations before launch.
- `components/` — `Header` (menu + focus trap), `AudienceHero` (rotating hero), `ContactSection` (quote form + live WhatsApp preview), `Faq`, `RouteEffects` (scroll-reveal, h1 focus on navigation), plus server components for the rest.
- `public/cci-logo.png` — logo extracted from the original file.

## Notes
- Fonts are self-hosted via `@fontsource` (Unbounded, Open Sans), so builds don't need Google Fonts access.
- The form never posts anywhere: it validates, then opens `wa.me` with the prepared message, as before.
- One deliberate change from the original: header links and the quote button no longer wrap onto two lines at desktop widths.

## Analytics (optional)
Google Analytics 4 and the Meta Pixel are wired in `components/Analytics.tsx`.
- GA4 is on by default using the CCI Payments Measurement ID in that file. Set `NEXT_PUBLIC_GA_ID` to override it.
- The Meta Pixel stays off until you set `NEXT_PUBLIC_META_PIXEL_ID`.

Set variables in Vercel (Settings → Environment Variables) and redeploy, or copy `.env.example` to `.env.local` locally. Never commit real `.env*.local` files.
