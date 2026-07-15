import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { authService } from './auth.service.js';
import { sendSuccess } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';

export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const result = await authService.register(req.body);
  sendSuccess(res, result, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const result = await authService.login(req.body);
  sendSuccess(res, result, 'Login successful');
});

export const refresh = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { refreshToken } = req.body;
  const result = await authService.refresh(refreshToken);
  sendSuccess(res, result, 'Tokens refreshed successfully');
});

export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await authService.logout(req.user!.userId);
  sendSuccess(res, null, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.userId);
  sendSuccess(res, user);
});
