import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { usersService } from './users.service.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const profile = await usersService.getProfile(req.user!.userId);
  sendSuccess(res, profile);
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const profile = await usersService.updateProfile(req.user!.userId, req.body);
  sendSuccess(res, profile, 'Profile updated successfully');
});
