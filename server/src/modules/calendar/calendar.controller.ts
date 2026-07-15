import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getCalendarEvents = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
  sendSuccess(res, [], 'Calendar events endpoint ready');
});
