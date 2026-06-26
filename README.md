# Aspiration Cleantech Academy

Job-oriented technical training platform for Aspiration Cleantech Academy, the training initiative of
[Aspiration Cleantech Ventures](https://aspcv.com). Offers practical, hands-on training in HVAC,
Entrepreneurship, Digital Marketing, and Sales Executive programs.

## Structure

```
frontend/   Next.js 14 (App Router) marketing site, course catalog, registration, and admin dashboard
backend/    Express + MongoDB API powering registrations, contact leads, and course data
```

## Quick start (both apps)

```bash
npm run install:all   # installs root, backend, and frontend deps
npm run dev           # runs backend (:5000) and frontend (:3000) together
```

Requires `backend/.env` to exist first (see Backend section below).

## Frontend

Static-exported Next.js app. Pages: Home, Courses, Register, About, Contact, plus an admin section
(`/admin`) for managing course registrations, contact leads, and course listings.

```bash
cd frontend
npm install
npm run dev
```

Environment variable (optional, defaults to `http://localhost:5000/api/v1`):

```
NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
```

### Deploying to Cloudflare Pages

This repo includes `wrangler.toml` at the root with the build command and output directory already
configured. Connect the repo in the Cloudflare Pages dashboard and deploy — no manual build
configuration needed beyond setting `NEXT_PUBLIC_API_URL` to your deployed backend URL as an
environment variable in the Pages project settings.

## Backend

Express API with MongoDB (Mongoose), JWT-based admin auth (with login rate limiting and account
lockout), and Cloudinary for course image uploads.

```bash
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, Cloudinary credentials
npm install
npm run dev
```

Seed an admin user and sample courses:

```bash
node seedAdmin.js
node seedAcademy.js
```

### Deploying the backend

Cloudflare Pages/Workers cannot run this backend as-is — it's a persistent Express server using a
native MongoDB TCP connection (Mongoose), which the Workers runtime doesn't support. This repo
includes a `render.yaml` Blueprint for one-click deployment on [Render](https://render.com):

1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and copy its connection string.
2. On Render, choose "New Blueprint" and point it at this repo — it reads `render.yaml` automatically.
3. Fill in the required environment variables it prompts for (`MONGO_URI`, `FRONTEND_URL`, Cloudinary
   credentials). `JWT_SECRET` is auto-generated.
4. Once deployed, set `NEXT_PUBLIC_API_URL` on the Cloudflare Pages project to your Render service URL.

## Security

- Admin login: rate-limited (10 attempts/15 min per IP) with account lockout after 5 failed attempts
- Helmet, mongo-sanitize, and xss-clean on all API routes
- Optional Cloudflare Turnstile captcha on admin login (set `TURNSTILE_SECRET_KEY` on the backend and
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` on the frontend to enable; no-op when unset)
