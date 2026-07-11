// Simple in-memory IP rate limiter for edge functions.
const buckets = new Map<string, number[]>();

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= maxRequests) {
    buckets.set(key, arr);
    return false;
  }
  arr.push(now);
  buckets.set(key, arr);
  return true;
}

export function rateLimitResponse(corsHeaders: Record<string, string>): Response {
  return new Response(
    JSON.stringify({ ok: false, error: 'Too many requests' }),
    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
