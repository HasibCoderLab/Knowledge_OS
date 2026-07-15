import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { settingsService } from './settings.service.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getSettings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const settings = await settingsService.getSettings(req.user!.userId);
  sendSuccess(res, settings);
});

export const updateSettings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const settings = await settingsService.updateSettings(req.user!.userId, req.body);
  sendSuccess(res, settings, 'Settings updated successfully');
});
