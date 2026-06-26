import { json } from '../cors.js';
import { requireAdmin } from '../authGuard.js';

function rowToCourse(row) {
  return {
    _id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    imageUrl: row.image_url,
    category: row.category,
    isPublished: !!row.is_published,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getCourses(request, env, origin) {
  const { results } = await env.DB.prepare('SELECT * FROM courses WHERE is_published = 1 ORDER BY created_at DESC').all();
  return json(results.map(rowToCourse), { status: 200, headers: { 'Cache-Control': 'public, max-age=300' } }, origin, env);
}

export async function getAllCoursesAdmin(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const { results } = await env.DB.prepare('SELECT * FROM courses ORDER BY created_at DESC').all();
  return json(results.map(rowToCourse), { status: 200 }, origin, env);
}

async function uploadImageToCloudinary(file, env) {
  if (!file) return '';
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET || '');
  if (!env.CLOUDINARY_UPLOAD_PRESET) {
    // Signed upload fallback would require server-side signature generation; unsigned preset is simplest for Workers.
    throw new Error('CLOUDINARY_UPLOAD_PRESET is not configured');
  }
  const res = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Image upload failed');
  const data = await res.json();
  return data.secure_url;
}

export async function createCourse(request, env, origin) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const form = await request.formData();
  const title = form.get('title');
  const description = form.get('description');
  const price = parseInt(form.get('price') || '0', 10);
  const category = form.get('category');
  const isPublished = form.get('isPublished') !== 'false';
  const file = form.get('image');

  if (!title || !description || !category) {
    return json({ message: 'Invalid create data' }, { status: 400 }, origin, env);
  }

  let imageUrl = '';
  try {
    imageUrl = await uploadImageToCloudinary(file instanceof File ? file : null, env);
  } catch (err) {
    return json({ message: err.message }, { status: 400 }, origin, env);
  }

  const id = crypto.randomUUID();
  const createdAt = Date.now();

  await env.DB.prepare(
    'INSERT INTO courses (id, title, description, price, image_url, category, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  )
    .bind(id, title, description, price, imageUrl, category, isPublished ? 1 : 0, createdAt)
    .run();

  const row = await env.DB.prepare('SELECT * FROM courses WHERE id = ?').bind(id).first();
  return json(rowToCourse(row), { status: 201 }, origin, env);
}

export async function deleteCourse(request, env, origin, id) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return json({ error: auth.error }, { status: auth.status }, origin, env);

  const existing = await env.DB.prepare('SELECT id FROM courses WHERE id = ?').bind(id).first();
  if (!existing) return json({ message: 'Course not found' }, { status: 404 }, origin, env);

  await env.DB.prepare('DELETE FROM courses WHERE id = ?').bind(id).run();
  return json({ message: 'Course removed' }, { status: 200 }, origin, env);
}
