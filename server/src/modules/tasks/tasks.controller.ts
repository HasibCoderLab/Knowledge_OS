import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { tasksService } from './tasks.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { TasksQuery } from './tasks.validation.js';

export const getTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as TasksQuery;
  const result = await tasksService.getTasks(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const task = await tasksService.getTask(req.user!.userId, req.params.id as string);
  sendSuccess(res, task);
});

export const createTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const task = await tasksService.createTask(req.user!.userId, req.body);
  sendSuccess(res, task, 'Task created successfully', 201);
});

export const updateTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const task = await tasksService.updateTask(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, task, 'Task updated successfully');
});

export const deleteTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await tasksService.deleteTask(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Task deleted successfully');
});
