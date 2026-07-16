import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { readingService } from './reading.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { ReadingSessionsQuery } from './reading.validation.js';

export const getReadingSessions = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = res.locals.validatedQuery as ReadingSessionsQuery;
  const result = await readingService.getReadingSessions(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getReadingSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const session = await readingService.getReadingSession(req.user!.userId, req.params.id as string);
  sendSuccess(res, session);
});

export const createReadingSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const session = await readingService.createReadingSession(req.user!.userId, req.body);
  sendSuccess(res, session, 'Reading session created successfully', 201);
});

export const updateReadingSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const session = await readingService.updateReadingSession(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, session, 'Reading session updated successfully');
});

export const deleteReadingSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await readingService.deleteReadingSession(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Reading session deleted successfully');
});
