// Run with: node worker/seed-admin.js
// Prints SQL you paste into `wrangler d1 execute` (D1 has no direct Node driver from outside the Worker).
import { webcrypto as crypto } from 'node:crypto';

if (!globalThis.crypto) globalThis.crypto = crypto;

const PBKDF2_ITERATIONS = 100_000;

function toBase64Url(bytes) {
  return Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(derived)}`;
}

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars before running this script.');
  process.exit(1);
}

const hash = await hashPassword(password);
const id = crypto.randomUUID();

console.log(`-- Run this with: npx wrangler d1 execute <DB_NAME> --remote --command "..."`);
console.log(
  `DELETE FROM admins; INSERT INTO admins (id, email, password_hash, role, failed_login_attempts, lock_until, created_at) VALUES ('${id}', '${email}', '${hash}', 'admin', 0, NULL, ${Date.now()});`
);
