# Aspiration Cleantech Academy

Job-oriented technical training platform for Aspiration Cleantech Academy, the training initiative of
[Aspiration Cleantech Ventures](https://aspcv.com). Offers practical, hands-on training in HVAC,
Entrepreneurship, Digital Marketing, and Sales Executive programs.

Runs entirely on Cloudflare: a single Worker serves the static Next.js frontend and the API, backed by
a D1 (SQLite) database. No separate backend host needed.

## Structure

```
frontend/   Next.js 14 (App Router), statically exported - marketing site, courses, registration, admin
worker/     Cloudflare Worker - API routes (auth, courses, registrations, contact leads) + D1 schema
wrangler.toml   Worker config: D1 binding, static assets binding, entrypoint
```

## One-time setup

```bash
npm install -g wrangler   # if you don't have it
wrangler login
```

### 1. Create the D1 database

```bash
wrangler d1 create aspcv-academy-db
```

Copy the `database_id` it prints, paste it into `wrangler.toml` (`database_id = "..."`).

### 2. Run migrations

```bash
npm run install:all
npm run db:migrate          # creates tables + seeds the 5 default courses, on the real (remote) D1 DB
```

### 3. Set secrets

```bash
wrangler secret put JWT_SECRET            # any long random string
wrangler secret put FRONTEND_URL          # e.g. https://aspcvacademy.com
wrangler secret put CLOUD_NAME            # Cloudinary cloud name
wrangler secret put CLOUDINARY_UPLOAD_PRESET   # an *unsigned* upload preset, set up in Cloudinary > Settings > Upload
wrangler secret put TURNSTILE_SECRET_KEY  # optional - admin login captcha, leave unset to skip
```

### 4. Seed an admin user

```bash
SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=yourpassword node worker/seed-admin.js
```

This prints a SQL statement — run it against the remote DB:

```bash
wrangler d1 execute aspcv-academy-db --remote --command "<paste the printed SQL here>"
```

### 5. Deploy

```bash
npm run deploy
```

That builds the frontend and deploys the Worker (static assets + API) in one shot.

## Local development

```bash
npm run dev
```

Runs `wrangler dev`, which serves both the built frontend and the API locally (default
`http://localhost:8787`). Re-run `npm run build` (or `npm run dev` again) after frontend changes —
`wrangler dev` doesn't hot-reload static exports the way `next dev` does.

For fast frontend-only iteration, run `cd frontend && npm run dev` separately (port 3000) and set
`NEXT_PUBLIC_API_URL=http://localhost:8787/api/v1` in `frontend/.env.local`, with `wrangler dev`
running alongside it for the API.

To run migrations against your local D1 instance instead of the real one:

```bash
npm run db:migrate:local
```

## Security

- Admin login: account lockout after 5 failed attempts (15 min), tracked in D1
- Public form endpoints (`/contact`, `/academy/register`) are rate-limited per IP via D1 (5 / 15 min)
- Passwords hashed with PBKDF2 (Web Crypto, 100k iterations) — no native dependencies
- JWTs signed with HMAC-SHA256 via Web Crypto, 12-hour expiry
- Optional Cloudflare Turnstile captcha on admin login (set `TURNSTILE_SECRET_KEY` to enable; the
  frontend widget activates automatically when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set at build time)
- For tighter login throttling, add a Cloudflare Rate Limiting binding named `LOGIN_LIMITER` to the
  Worker (Settings > Bindings) — the code uses it automatically when present
