import { verifyJwt } from './crypto.js';

export async function requireAdmin(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { error: 'Not authorized, no token', status: 401 };
  }
  const token = authHeader.slice(7);
  try {
    const payload = await verifyJwt(token, env.JWT_SECRET);
    const admin = await env.DB.prepare('SELECT id, email, role FROM admins WHERE id = ?').bind(payload.id).first();
    if (!admin) return { error: 'Not authorized, user not found', status: 401 };
    if (admin.role !== 'admin') return { error: 'Access denied: Requires admin role', status: 403 };
    return { admin };
  } catch {
    return { error: 'Not authorized, token failed', status: 401 };
  }
}
