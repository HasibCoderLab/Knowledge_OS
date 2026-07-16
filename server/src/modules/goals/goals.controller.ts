import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { goalsService } from './goals.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { GoalsQuery } from './goals.validation.js';

export const getGoals = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = res.locals.validatedQuery as GoalsQuery;
  const result = await goalsService.getGoals(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getGoal = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const goal = await goalsService.getGoal(req.user!.userId, req.params.id as string);
  sendSuccess(res, goal);
});

export const createGoal = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const goal = await goalsService.createGoal(req.user!.userId, req.body);
  sendSuccess(res, goal, 'Goal created successfully', 201);
});

export const updateGoal = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const goal = await goalsService.updateGoal(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, goal, 'Goal updated successfully');
});

export const deleteGoal = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await goalsService.deleteGoal(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Goal deleted successfully');
});
