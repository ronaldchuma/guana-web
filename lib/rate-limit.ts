/**
 * Simple in-memory rate limiter using a sliding window.
 * Works for single-instance deployments (Vercel serverless, etc.).
 * For multi-instance production, replace with Upstash Redis or similar.
 */

interface RateLimitOptions {
  /** Window size in milliseconds */
  interval: number;
  /** Max requests per window */
  limit: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
}

export function rateLimit({ interval, limit }: RateLimitOptions) {
  const timestamps = new Map<string, number[]>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const windowStart = now - interval;

      const hits = (timestamps.get(key) ?? []).filter((t) => t > windowStart);
      const remaining = Math.max(0, limit - hits.length);

      if (hits.length >= limit) {
        timestamps.set(key, hits);
        return { success: false, remaining: 0 };
      }

      hits.push(now);
      timestamps.set(key, hits);

      // Periodically prune stale keys to prevent memory leaks
      if (timestamps.size > 10_000) {
        const keys = Array.from(timestamps.keys());
        for (const k of keys) {
          const v = timestamps.get(k)!;
          if (v.every((t: number) => t <= windowStart)) timestamps.delete(k);
        }
      }

      return { success: true, remaining: remaining - 1 };
    },
  };
}
