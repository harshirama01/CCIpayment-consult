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
Google Analytics 4 and the Meta Pixel are wired in `components/Analytics.tsx` and stay off until you set IDs.
Copy `.env.example` to `.env.local` locally, or add `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` in Vercel
(Settings → Environment Variables), then redeploy. Never commit real `.env*.local` files.
