# Jack & Jenna — Wedding Site Plan

**Stack:** Astro · Cloudflare Pages  
**Domain:** TBD (e.g. `jackandjenna.com`)  
**Date:** April 2028 · Santa Barbara / Camarillo area  
**~80 guests**

---

## Palette (from Jenna's Pinterest board)

| Name | Hex | Use |
|---|---|---|
| Blush | `#F2C4AE` | Accents, section dividers |
| Sage | `#A8B89A` | Secondary text, borders |
| Terracotta | `#C97B52` | Headings, hover states |
| Marigold | `#E8B84B` | Highlights, small details |
| Cream | `#FAF6F0` | Page background |
| Charcoal | `#2E2C29` | Body text |

---

## Pages

### `/` — Home
- Hero: names + date + location (short, atmospheric)
- Brief "save the date" note if invites haven't gone out
- Nav to all other pages

### `/our-story`
- How you met, the proposal (Haskell's Beach — on the bridge heading back from lunch at the Bacara), etc.
- 2–3 photos (engagement photos when ready)
- Keep it short and warm — not a memoir

### `/details`
- Ceremony time + location (with map embed or link)
- Reception time + location
- Dress code
- Kids / no kids
- Whether there's an open bar (yes — important to guests)

### `/travel`
- For out-of-towners
- Nearest airports (LAX, SBA)
- Hotel block info (if/when secured)
- Parking notes

### `/rsvp`
- RSVP form: name, attending Y/N, +1 handling, meal pref if needed
- Backend: Cloudflare Worker → D1 table (simple)
- Deadline date shown clearly
- Confirmation message on submit

### `/registry`
- Linked list only — no iframe embeds
- 2–3 registries max with short descriptions

### `/faq`
- When do RSVPs close?
- What's the dress code?
- Is there parking?
- Are kids welcome?
- Is it indoors / outdoors?
- Who do I contact with questions? (not you two — pick a point person)

---

## Content still needed before launch

- [ ] Venue confirmed (ceremony + reception)
- [ ] Exact date (April 2028 TBD)
- [ ] Domain registered
- [ ] Our Story blurb written
- [ ] Engagement photos (nice to have for launch, not required)
- [ ] Hotel block info (can add later)
- [ ] Registry decided

---

## Build checklist

### Setup
- [ ] `npm create astro@latest` — minimal template
- [ ] Cloudflare Pages project created, repo connected
- [ ] Domain pointed at Cloudflare
- [ ] Password protection (Cloudflare Access rule — gate everything pre-invites)

### Layout / Design
- [ ] Global CSS tokens (palette above, 2 fonts)
- [ ] `BaseLayout.astro` — nav, footer
- [ ] Mobile-first nav (hamburger or simple inline links)
- [ ] Favicon + Open Graph meta (photo or monogram)

### Pages
- [ ] `/` index
- [ ] `/our-story`
- [ ] `/details`
- [ ] `/travel`
- [ ] `/rsvp`
- [ ] `/registry`
- [ ] `/faq`

### RSVP backend
- [ ] D1 table: `rsvps(id, name, attending, plus_one, meal_pref, submitted_at)`
- [ ] Cloudflare Worker endpoint: `POST /api/rsvp`
- [ ] Form validation (client-side, minimal)
- [ ] Success / error states on form

### Pre-launch
- [ ] Test on mobile
- [ ] Test RSVP flow end to end
- [ ] Check all links
- [ ] Remove password gate when invites go out

---

## Typography (suggestion)

| Role | Font | Notes |
|---|---|---|
| Display (names, hero) | Cormorant Garamond | Elegant, editorial, free on Google Fonts |
| Body | DM Sans | Clean and readable, pairs well |

---

## Notes

- Keep JS to near-zero — Astro islands only where needed (RSVP form)
- No analytics unless you want them (Cloudflare Web Analytics is free + privacy-friendly)
- Password-protect the whole site via Cloudflare Access until formal invites go out
- Engagement photos → drop into `/public/photos/` and use in story + hero when ready
- RSVP backend can be a Cloudflare Worker or an Astro API route hitting D1 — either works, stays fully in the Cloudflare ecosystem
