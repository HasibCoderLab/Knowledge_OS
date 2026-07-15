import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const getSettings = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
  sendSuccess(res, {}, 'Settings endpoint ready');
});
