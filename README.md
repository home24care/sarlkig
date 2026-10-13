# Sarlkig — water heaters, boilers & refrigerants

Next.js 16 (App Router) + Tailwind storefront for sarlkig.com, deployed on Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (≈350 static pages)
```

## Launch checklist

1. **Business details** — set the real phone and address in `lib/site.ts`. They appear in the header, footer,
   product pages, contact page and every policy. Google Merchant verifies them.
2. **Payments** — add `STRIPE_SECRET_KEY` in Vercel → Settings → Environment Variables (see `.env.example`).
   Until it is set, Checkout opens a pre-filled email order instead. Set `STRIPE_AUTOMATIC_TAX=true` after
   activating Stripe Tax.
3. **Domain** — add `sarlkig.com` in Vercel → Settings → Domains.
4. **Google Merchant Center** — add a scheduled-fetch feed pointing at `https://sarlkig.com/feed.xml`.

## Where things live

| What | File |
| --- | --- |
| Product data (297 SKUs, prices, images, specs) | `lib/catalog.json` |
| Collections, derived fields, search | `lib/products.ts` |
| Policies text | `lib/policies.tsx` |
| Store name, contact details | `lib/site.ts` |
| Merchant feed | `app/feed.xml/route.ts` |
| Stripe Checkout | `app/api/checkout/route.ts` |

## Notes

- **Prices** — set per product in `lib/catalog.json`; review them before launch.
- **GTINs** — not published by the source store, so the feed sends `brand` + `mpn` with
  `identifier_exists: no`. Add real GTINs to `catalog.json` when you have them.
- **Images** — original-resolution photos hot-linked from partner stores sentaigas.com and mouchllc.com
  (disclosed in the Terms of service). Consider copying them into `public/` before scaling ads.
