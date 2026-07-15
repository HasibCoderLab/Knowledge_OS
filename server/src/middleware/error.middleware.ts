import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors.js';
import { logger } from '../utils/logger.js';
import { env } from '../app/config/environment.js';

interface ZodErrorResponse {
  issues?: Array<{ path: string; message: string }>;
}

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: (err as AppError & { errors?: unknown[] }).errors || undefined,
    });
    return;
  }

  const zodError = err as ZodErrorResponse;
  if (zodError.issues) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: zodError.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
    return;
  }

  logger.error('Unhandled error', {
    message: err.message,
    stack: env.nodeEnv === 'development' ? err.stack : undefined,
  });

  res.status(500).json({
    success: false,
    message: env.nodeEnv === 'production' ? 'Internal server error' : err.message,
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}
