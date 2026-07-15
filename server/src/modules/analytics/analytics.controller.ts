import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { analyticsService } from './analytics.service.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getDashboard = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await analyticsService.getDashboard(req.user!.userId);
  sendSuccess(res, data);
});

export const getReadingStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await analyticsService.getReadingStats(req.user!.userId);
  sendSuccess(res, data);
});

export const getGoalsStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await analyticsService.getGoalsStats(req.user!.userId);
  sendSuccess(res, data);
});

export const getTasksStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await analyticsService.getTasksStats(req.user!.userId);
  sendSuccess(res, data);
});

export const getHabitsStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await analyticsService.getHabitsStats(req.user!.userId);
  sendSuccess(res, data);
});
