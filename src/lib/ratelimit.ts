import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export function createRateLimiter(requests: number, duration: Duration, path?: string) {
  const prefix = path ? `@ratelimit${path}` : undefined;
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(requests, duration),
    analytics: true,
    prefix,
  });
}
