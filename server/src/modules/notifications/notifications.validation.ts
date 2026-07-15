import { z } from 'zod/v4';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  message: z.string().min(1, 'Message is required').max(1000),
  type: z.enum(['info', 'success', 'warning', 'error']).optional(),
});

export const notificationsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  type: z.enum(['info', 'success', 'warning', 'error']).optional(),
  read: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type NotificationsQuery = z.infer<typeof notificationsQuerySchema>;
