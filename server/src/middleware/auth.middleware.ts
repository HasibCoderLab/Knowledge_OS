import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/index.js';
import { verifyAccessToken } from '../utils/token.js';
import { UnauthorizedError } from '../shared/errors.js';
import { asyncHandler } from '../shared/asyncHandler.js';

export const authenticate = asyncHandler(async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = { userId: decoded.userId };
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
});
