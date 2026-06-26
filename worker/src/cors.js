export function corsHeaders(origin, env) {
  const allowed = [
    env.FRONTEND_URL,
    'https://aspcvacademy.com',
    'https://www.aspcvacademy.com',
    'http://localhost:3000',
  ].filter(Boolean);

  const isAllowed = allowed.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0] || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin',
  };
}

export function json(data, init, origin, env) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, env),
      ...(init && init.headers ? init.headers : {}),
    },
  });
}
