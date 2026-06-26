import { json } from '../cors.js';
import { requireAdmin } from '../authGuard.js';

function rowToLead(row) {
  return {
    _id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    sourcePage: row.source_page,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function submitContactForm(request, env, origin) {
  const body = await request.json().catch(() => ({}));
  const { name, email, message, sourcePage } = body;

  if (!name || !email || !message) {
    return json({ message: 'Please provide all required fields' }, { status: 400 }, origin, env);
  }

  const id = crypto.randomUUID();
  await env.DB.prepare('INSERT INTO leads (id, name, email, message, source_page, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(id, name, email, message, sourcePage || '', Date.now())
    .run();

  return json({ message: 'Thank you! Your message has been received.' }, { status: 201 }, origin, env);
}

export async function getLeads(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const { results } = await env.DB.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  return json(results.map(rowToLead), { status: 200 }, origin, env);
}

export async function deleteAllLeads(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const { meta } = await env.DB.prepare('DELETE FROM leads').run();
  return json({ message: `Deleted ${meta.rows_written || 0} leads.` }, { status: 200 }, origin, env);
}
