import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { activityService } from './activities.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { ActivitiesQuery } from './activities.validation.js';

export const getActivities = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as ActivitiesQuery;
  const result = await activityService.getActivities(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getRecentActivities = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const activities = await activityService.getRecentActivities(req.user!.userId);
  sendSuccess(res, activities);
});

export const createActivity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const activity = await activityService.logActivity(req.user!.userId, req.body);
  sendSuccess(res, activity, 'Activity logged successfully', 201);
});
