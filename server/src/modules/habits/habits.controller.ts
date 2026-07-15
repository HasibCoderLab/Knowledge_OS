import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { habitsService } from './habits.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { HabitsQuery } from './habits.validation.js';

export const getHabits = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as HabitsQuery;
  const result = await habitsService.getHabits(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getHabit = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const habit = await habitsService.getHabit(req.user!.userId, req.params.id as string);
  sendSuccess(res, habit);
});

export const createHabit = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const habit = await habitsService.createHabit(req.user!.userId, req.body);
  sendSuccess(res, habit, 'Habit created successfully', 201);
});

export const updateHabit = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const habit = await habitsService.updateHabit(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, habit, 'Habit updated successfully');
});

export const deleteHabit = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await habitsService.deleteHabit(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Habit deleted successfully');
});

export const getHabitLogs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const logs = await habitsService.getHabitLogs(req.user!.userId, req.params.id as string);
  sendSuccess(res, logs);
});

export const createHabitLog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const log = await habitsService.createHabitLog(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, log, 'Habit log created successfully', 201);
});
