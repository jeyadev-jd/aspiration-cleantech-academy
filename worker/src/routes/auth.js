import { hashPassword, verifyPassword, signJwt } from '../crypto.js';
import { json } from '../cors.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

async function verifyTurnstile(token, ip, env) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function loginAdmin(request, env, origin) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Rate limit: requires a "LOGIN_LIMITER" Rate Limiting binding on the Worker.
  if (env.LOGIN_LIMITER) {
    const { success } = await env.LOGIN_LIMITER.limit({ key: ip });
    if (!success) {
      return json({ error: 'Too many login attempts. Please try again after 15 minutes.' }, { status: 429 }, origin, env);
    }
  }

  const body = await request.json().catch(() => ({}));
  const { email, password, turnstileToken } = body;

  if (!email || !password) {
    return json({ error: 'Email and password are required' }, { status: 400 }, origin, env);
  }

  const captchaOk = await verifyTurnstile(turnstileToken, ip, env);
  if (!captchaOk) {
    return json({ error: 'Captcha verification failed. Please try again.' }, { status: 400 }, origin, env);
  }

  const admin = await env.DB.prepare('SELECT * FROM admins WHERE email = ?').bind(email).first();

  if (!admin) {
    return json({ error: 'Invalid email or password' }, { status: 401 }, origin, env);
  }

  if (admin.lock_until && admin.lock_until > Date.now()) {
    const minutesLeft = Math.ceil((admin.lock_until - Date.now()) / 60000);
    return json(
      { error: `Account locked due to repeated failed logins. Try again in ${minutesLeft} minute(s).` },
      { status: 423 },
      origin,
      env
    );
  }

  const isMatch = await verifyPassword(password, admin.password_hash);

  if (!isMatch) {
    let failedAttempts = admin.failed_login_attempts + 1;
    let lockUntil = admin.lock_until;
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      lockUntil = Date.now() + LOCK_DURATION_MS;
      failedAttempts = 0;
    }
    await env.DB.prepare('UPDATE admins SET failed_login_attempts = ?, lock_until = ? WHERE id = ?')
      .bind(failedAttempts, lockUntil, admin.id)
      .run();
    return json({ error: 'Invalid email or password' }, { status: 401 }, origin, env);
  }

  await env.DB.prepare('UPDATE admins SET failed_login_attempts = 0, lock_until = NULL WHERE id = ?').bind(admin.id).run();

  const token = await signJwt({ id: admin.id }, env.JWT_SECRET, 12 * 60 * 60);

  return json({ _id: admin.id, email: admin.email, role: admin.role, token }, { status: 200 }, origin, env);
}

// One-time bootstrap: only works while the admins table is empty. Self-disables after first use,
// so it can stay deployed without becoming an open "create admin" endpoint.
export async function setupAdmin(request, env, origin) {
  const existing = await env.DB.prepare('SELECT COUNT(*) as count FROM admins').first();
  if (existing.count > 0) {
    return json({ error: 'Setup already completed. An admin account already exists.' }, { status: 403 }, origin, env);
  }

  const body = await request.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password || password.length < 8) {
    return json({ error: 'Email and a password of at least 8 characters are required.' }, { status: 400 }, origin, env);
  }

  const id = crypto.randomUUID();
  const passwordHash = await hashPassword(password);

  await env.DB.prepare(
    'INSERT INTO admins (id, email, password_hash, role, failed_login_attempts, lock_until, created_at) VALUES (?, ?, ?, ?, 0, NULL, ?)'
  )
    .bind(id, email, passwordHash, 'admin', Date.now())
    .run();

  return json({ message: 'Admin account created. You can now log in.' }, { status: 201 }, origin, env);
}

export { hashPassword };
