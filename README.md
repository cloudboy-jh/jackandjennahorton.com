# Jack & Jenna — Wedding Site

Astro + Cloudflare Pages. April 2028, Santa Barbara.

## Dev

```bash
npm install
npm run dev
```

## First-time D1 setup

```bash
# Create the database
wrangler d1 create jack-and-jenna-rsvp

# Copy the database_id it prints into wrangler.toml

# Apply schema
wrangler d1 execute jack-and-jenna-rsvp --file=schema.sql

# For local dev against a local DB
wrangler d1 execute jack-and-jenna-rsvp --local --file=schema.sql
```

Then start dev with the Cloudflare proxy active:

```bash
npm run dev
```

The `platformProxy: { enabled: true }` setting in `astro.config.mjs` makes the `DB` binding available locally via `wrangler`.

## Deploy

```bash
npm run build
wrangler pages deploy dist/
```

Or connect the repo to Cloudflare Pages and it deploys on push.

## Content still needed

See `spec.md` for the full checklist. Short version:
- Venue confirmed (ceremony + reception)
- Exact date locked
- Our Story copy written
- Engagement photos → drop into `public/photos/`
- Hotel block info
- Registry links (update `src/pages/registry.astro`)
- Point-person contact info (update `details.astro`, `faq.astro`, `travel.astro`)
- RSVP deadline date (update `src/pages/rsvp.astro` → `DEADLINE` const)
