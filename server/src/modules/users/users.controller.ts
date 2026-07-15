import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  sendSuccess(res, { userId: req.user!.userId }, 'Profile endpoint ready');
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  sendSuccess(res, { userId: req.user!.userId }, 'Profile update endpoint ready');
});
