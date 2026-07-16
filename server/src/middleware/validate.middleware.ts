import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ValidationError } from '../shared/errors.js';

/**
 * Apply validated + transformed values onto a target object without
 * replacing the reference.  Required because in Express 5 both
 * `req.query` and `req.params` are getter-only properties — the
 * reference itself cannot be reassigned, but the object it returns
 * is still mutable.
 *
 * Also stores the parsed result on `res.locals` so that controllers
 * already migrated to read from `res.locals.validatedQuery` or
 * `res.locals.validatedParams` continue to work.
 */
function assignParsed(target: unknown, source: unknown): void {
  const t = target as Record<string, unknown>;
  const s = source as Record<string, unknown>;
  // Remove stale keys that might linger from a previous request
  for (const key of Object.keys(t)) {
    delete t[key];
  }
  // Apply every validated / coerced / defaulted value
  for (const [key, value] of Object.entries(s)) {
    t[key] = value;
  }
}

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }))
      );
    }

    // req.body is writable in Express 5 — safe to replace.
    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }))
      );
    }

    // 1. Mutate req.query in-place (getter-only in Express 5)
    assignParsed(req.query, result.data);

    // 2. Also store on res.locals for controllers already migrated
    //    to read from res.locals.validatedQuery (library, habits,
    //    goals, journal).
    res.locals.validatedQuery = result.data;

    next();
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }))
      );
    }

    // 1. Mutate req.params in-place (getter-only in Express 5)
    assignParsed(req.params, result.data);

    // 2. Also store on res.locals for backward compatibility
    res.locals.validatedParams = result.data;

    next();
  };
}