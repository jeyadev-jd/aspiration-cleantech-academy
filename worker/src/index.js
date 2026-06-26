import { json, corsHeaders } from './cors.js';
import { loginAdmin, setupAdmin } from './routes/auth.js';
import { getCourses, getAllCoursesAdmin, createCourse, deleteCourse } from './routes/academy.js';
import { submitRegistration, getRegistrations, deleteAllRegistrations } from './routes/registration.js';
import { submitContactForm, getLeads, deleteAllLeads } from './routes/contact.js';

// Simple per-IP fixed-window limiter for the public form endpoints, backed by D1.
// (Separate from the Cloudflare Rate Limiting binding used on login.)
async function checkFormRateLimit(request, env, limitKey, max, windowMs) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `${limitKey}:${ip}`;
  const now = Date.now();
  const row = await env.DB.prepare('SELECT count, reset_at FROM rate_limits WHERE key = ?').bind(key).first();

  if (!row || row.reset_at < now) {
    await env.DB.prepare('INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?)')
      .bind(key, now + windowMs)
      .run();
    return true;
  }

  if (row.count >= max) return false;

  await env.DB.prepare('UPDATE rate_limits SET count = count + 1 WHERE key = ?').bind(key).run();
  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (pathname.startsWith('/api/')) {
      try {
        // Order matters: /academy/register and /academy/all must be checked before the generic /academy/:id routes.
        if (pathname === '/api/v1/auth/login' && request.method === 'POST') {
          return await loginAdmin(request, env, origin);
        }
        if (pathname === '/api/v1/auth/setup' && request.method === 'POST') {
          return await setupAdmin(request, env, origin);
        }

        if (pathname === '/api/v1/academy/register' && request.method === 'POST') {
          const ok = await checkFormRateLimit(request, env, 'register', 5, 15 * 60 * 1000);
          if (!ok) return json({ error: 'Too many submissions. Please try again after 15 minutes.' }, { status: 429 }, origin, env);
          return await submitRegistration(request, env, origin);
        }
        if (pathname === '/api/v1/academy/register' && request.method === 'GET') {
          return await getRegistrations(request, env, origin);
        }
        if (pathname === '/api/v1/academy/register' && request.method === 'DELETE') {
          return await deleteAllRegistrations(request, env, origin);
        }

        if (pathname === '/api/v1/contact' && request.method === 'POST') {
          const ok = await checkFormRateLimit(request, env, 'contact', 5, 15 * 60 * 1000);
          if (!ok) return json({ error: 'Too many submissions. Please try again after 15 minutes.' }, { status: 429 }, origin, env);
          return await submitContactForm(request, env, origin);
        }
        if (pathname === '/api/v1/contact' && request.method === 'GET') {
          return await getLeads(request, env, origin);
        }
        if (pathname === '/api/v1/contact' && request.method === 'DELETE') {
          return await deleteAllLeads(request, env, origin);
        }

        if (pathname === '/api/v1/academy/all' && request.method === 'GET') {
          return await getAllCoursesAdmin(request, env, origin);
        }
        if (pathname === '/api/v1/academy' && request.method === 'GET') {
          return await getCourses(request, env, origin);
        }
        if (pathname === '/api/v1/academy' && request.method === 'POST') {
          return await createCourse(request, env, origin);
        }
        if (pathname.startsWith('/api/v1/academy/') && request.method === 'DELETE') {
          const id = pathname.split('/').pop();
          return await deleteCourse(request, env, origin, id);
        }

        return json({ error: 'Not found' }, { status: 404 }, origin, env);
      } catch (err) {
        return json({ error: 'Internal server error', detail: err.message }, { status: 500 }, origin, env);
      }
    }

    // Not an API route: serve the static Next.js export.
    return env.ASSETS.fetch(request);
  },
};
