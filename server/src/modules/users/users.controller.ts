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

export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await usersService.changePassword(req.user!.userId, req.body);
  sendSuccess(res, null, 'Password changed successfully');
});

export const clearData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await usersService.clearData(req.user!.userId);
  sendSuccess(res, null, 'All data cleared successfully');
});

export const deleteAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await usersService.deleteAccount(req.user!.userId);
  sendSuccess(res, null, 'Account deleted successfully');
});
