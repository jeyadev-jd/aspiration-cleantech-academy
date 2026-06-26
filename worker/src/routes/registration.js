import { json } from '../cors.js';
import { requireAdmin } from '../authGuard.js';

function rowToRegistration(row) {
  return {
    _id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    courseName: row.course_name,
    message: row.message,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function submitRegistration(request, env, origin) {
  const body = await request.json().catch(() => ({}));
  const { name, email, phone, courseName, message } = body;

  if (!name || !email || !phone || !courseName) {
    return json({ message: 'Please provide all required fields (name, email, phone, courseName)' }, { status: 400 }, origin, env);
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO registrations (id, name, email, phone, course_name, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )
    .bind(id, name, email, phone, courseName, message || '', 'pending', Date.now())
    .run();

  return json({ message: 'Registration successful! We will contact you soon.' }, { status: 201 }, origin, env);
}

export async function getRegistrations(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const { results } = await env.DB.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  return json(results.map(rowToRegistration), { status: 200 }, origin, env);
}

export async function deleteAllRegistrations(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const { meta } = await env.DB.prepare('DELETE FROM registrations').run();
  return json({ message: `Deleted ${meta.rows_written || 0} registrations.` }, { status: 200 }, origin, env);
}
