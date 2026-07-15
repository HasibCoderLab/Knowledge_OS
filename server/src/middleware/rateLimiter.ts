import type { Request, Response, NextFunction } from 'express';
import { env } from '../app/config/environment.js';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + env.rateLimitWindow });
    next();
    return;
  }

  if (entry.count >= env.rateLimitMax) {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later',
    });
    return;
  }

  entry.count++;
  next();
}
