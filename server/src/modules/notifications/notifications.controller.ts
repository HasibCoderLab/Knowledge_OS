import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { notificationsService } from './notifications.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { NotificationsQuery } from './notifications.validation.js';

export const getNotifications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as NotificationsQuery;
  const result = await notificationsService.getNotifications(req.user!.userId, query);
  const { unreadCount } = result;
  sendPaginated(res, result.data, result.total, result.page, result.limit, 'Success', { unreadCount });
});

export const createNotification = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const notification = await notificationsService.createNotification(req.user!.userId, req.body);
  sendSuccess(res, notification, 'Notification created successfully', 201);
});

export const markAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const notification = await notificationsService.markAsRead(req.user!.userId, req.params.id as string);
  sendSuccess(res, notification, 'Notification marked as read');
});

export const markAllAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await notificationsService.markAllAsRead(req.user!.userId);
  sendSuccess(res, null, 'All notifications marked as read');
});

export const deleteNotification = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await notificationsService.deleteNotification(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Notification deleted successfully');
});
